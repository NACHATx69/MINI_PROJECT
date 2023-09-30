const { connectToDatabase } = require("../config/db");

async function countUser() {
  try {
    const connection = await connectToDatabase();
    // ทำตามคำสั่ง SQL ที่ต้องการ
    const query = "SELECT COUNT(*) FROM employee";
    const result = await connection.execute(query);
    const count = result.rows[0][0];
    const data= Number(count);

    const numberUser = Number(data) + 1;
    const currentDate = new Date();
    const currentYear = (Number(currentDate.getFullYear())+543).toString();
    const currentMonth = (currentDate.getMonth() + 1 < 10 ? '0' : '') + (currentDate.getMonth() + 1).toString();
    const paddedSequence = numberUser.toString().padStart(3, '0');
    const employeeID = currentYear + currentMonth + paddedSequence;
    // console.log(currentDate, currentYear, currentMonth,paddedSequence, employeeID);
    


    await connection.close();
    return employeeID;
  } catch (error) {
    throw error;
  }
};

countUser()

module.exports = { countUser };
