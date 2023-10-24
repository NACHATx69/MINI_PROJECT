const { connectToDatabase } = require("../config/db");


const currentDate = new Date();
const currentYear = (Number(currentDate.getFullYear())+543).toString();
const currentMonth = (currentDate.getMonth() + 1 < 10 ? '0' : '') + (currentDate.getMonth() + 1).toString();
const currentDay = currentDate.getDate().toString().padStart(2, '0');
const countId = 'C' +(currentYear+currentMonth+currentDay)

async function genIDapp() {
  try {
    const connection = await connectToDatabase();
    // ทำตามคำสั่ง SQL ที่ต้องการ
    const query = `SELECT COUNT(*) AS emp_count FROM REQ_LIST WHERE SUBSTR(REQ_LIST_ID, 1, 9) = :countId`;
    const result = await connection.execute(query, { countId });
    const empCount = result.rows[0][0];
    
    const numberUser = Number(empCount) + 1;
    const paddedSequence = numberUser.toString().padStart(3, '0');
    const id_app = 'C' +(currentYear + currentMonth + currentDay + paddedSequence);

    await connection.close();
    // console.log(id_app);
    return id_app;
  } catch (error) {
    throw error;
  }
};

genIDapp()
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error('Error inserting data:', error);
  })

module.exports = { genIDapp };
