const { connectToDatabase } = require("../config/db");

async function generateHRReport() {
  try {
    const connection = await connectToDatabase();
    
    // Employee Count by Department
    const query1 = `
    SELECT department, COUNT(*) AS employee_count
    FROM employees
    GROUP BY department;
    `;

    // Average Salary by Department
    const query2 = `
    SELECT department, AVG(salary) AS average_salary
    FROM employee_salary
    GROUP BY department;
    `;

    // Employee Turnover Rate
    const query3 = `
    SELECT department,
           SUM(CASE WHEN employment_status = 'Terminated' THEN 1 ELSE 0 END) AS terminated_count,
           COUNT(*) AS total_employees,
           (SUM(CASE WHEN employment_status = 'Terminated' THEN 1 ELSE 0 END) / COUNT(*)) * 100 AS turnover_rate
    FROM employees
    GROUP BY department;
    `;

    // Top Performers by Department
    const query4 = `
    WITH ranked_employees AS (
      SELECT emp_id, emp_name, department, performance_rating,
             ROW_NUMBER() OVER (PARTITION BY department ORDER BY performance_rating DESC) AS ranking
      FROM performance_reviews
    )
    SELECT emp_id, emp_name, department, performance_rating
    FROM ranked_employees
    WHERE ranking = 1;
    `;

    // Training Investment by Department
    const query5 = `
    SELECT department, SUM(training_cost) AS total_training_investment
    FROM employee_training
    GROUP BY department;
    `;

    const result1 = await connection.execute(query1);
    const result2 = await connection.execute(query2);
    const result3 = await connection.execute(query3);
    const result4 = await connection.execute(query4);
    const result5 = await connection.execute(query5);

    // You can process and print the results as needed.

    await connection.close();
  } catch (error) {
    throw error;
  }
}

generateHRReport();
module.exports = { generateHRReport };
