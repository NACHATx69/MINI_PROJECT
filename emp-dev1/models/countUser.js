const { connectToDatabase } = require("../config/db");


const currentDate = new Date();
const currentYear = (Number(currentDate.getFullYear())+543).toString();
const currentMonth = (currentDate.getMonth() + 1 < 10 ? '0' : '') + (currentDate.getMonth() + 1).toString();
const currentDay = currentDate.getDate().toString().padStart(2, '0');
const countId = currentYear+currentMonth+currentDay

async function countUser() {
  try {
    const connection = await connectToDatabase();
    // ทำตามคำสั่ง SQL ที่ต้องการ
    const query = `SELECT COUNT(*) AS emp_count FROM EMPLOYEE WHERE SUBSTR(EMP_ID, 1, 8) = :countId`;
    const result = await connection.execute(query, { countId });
    const empCount = result.rows[0][0];
    
    const numberUser = Number(empCount) + 1;
    const paddedSequence = numberUser.toString().padStart(3, '0');
    const employeeID = currentYear + currentMonth + currentDay + paddedSequence;

    await connection.close();
    return employeeID;
  } catch (error) {
    throw error;
  }
};

// countUser();

module.exports = { countUser };
