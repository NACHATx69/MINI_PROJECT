const { connectToDatabase } = require("../config/db");

async function getPosittonCounts() { // Corrected function name
  try {
    const connection = await connectToDatabase();
    
    const query = `
    SELECT position_category, COUNT(*) AS request_count
    FROM (
      SELECT 
        CASE
          WHEN position.pos_id = 'p01' THEN 'Staff'
          WHEN position.pos_id = 'p02' THEN 'Leader'
          WHEN position.pos_id = 'p03' THEN 'Senior'
          WHEN position.pos_id = 'p04' THEN 'Manager'
          WHEN position.pos_id = 'p00' THEN 'Admin'
        END AS position_category
      FROM request
      INNER JOIN req_list ON request.req_list = req_list.req_list_id
      INNER JOIN req_status ON request.status = req_status.id
      INNER JOIN req_list_pos ON req_list_pos.req_list_id = req_list.req_list_id
      INNER JOIN position ON req_list_pos.position = position.pos_id
      INNER JOIN department ON req_list_pos.dept_id = department.dept_id
      INNER JOIN study ON req_list.study = study.id
    ) subquery
    GROUP BY position_category;
    `;
    
    const result = await connection.execute(query);

    const data = result.rows.map((row) => {
      return {
        position_category: row[0], // Use position_category here
        request_count: row[1]
      };
    });
    
    console.log(data);
    await connection.close();
    return data;
  } catch (error) {
    throw error;
  }
}

getgetPosittonCounts(); // Corrected function call
module.exports = { getPosittonCounts }; // Corrected export
