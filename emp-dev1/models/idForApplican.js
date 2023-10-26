const { connectToDatabase } = require("../config/db");


const currentDate = new Date();
const currentYear = (Number(currentDate.getFullYear())+543).toString();
const currentMonth = (currentDate.getMonth() + 1 < 10 ? '0' : '') + (currentDate.getMonth() + 1).toString();
const currentDay = currentDate.getDate().toString().padStart(2, '0');
const countId = 'A' +(currentYear+currentMonth+currentDay)

async function genIDapplican() {
  try {
    const connection = await connectToDatabase();
    // ทำตามคำสั่ง SQL ที่ต้องการ
    const query = `SELECT COUNT(*) AS user_count FROM APPLICANT WHERE SUBSTR(APPL_ID, 1, 9) = :countId`;
    const result = await connection.execute(query, { countId });
    const empCount = result.rows[0][0];
    
    const numberUser = Number(empCount) + 1;
    const paddedSequence = numberUser.toString().padStart(3, '0');
    const id_app = 'A' +(currentYear + currentMonth + currentDay + paddedSequence);

    await connection.close();
    return id_app;
  } catch (error) {
    throw error;
  }
};

genIDapplican()
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error('Error inserting data:', error);
  })

module.exports = { genIDapplican };
