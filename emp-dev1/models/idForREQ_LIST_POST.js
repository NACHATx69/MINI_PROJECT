const { connectToDatabase } = require("../config/db");


const currentDate = new Date(); //เลือกวันที่ปัจจุบัน
//เอาวันที่มีย่อยเป็นส่วน กำหนดปีเป็น พศ
const currentYear = (Number(currentDate.getFullYear())+543).toString();
const currentMonth = (currentDate.getMonth() + 1 < 10 ? '0' : '') + (currentDate.getMonth() + 1).toString();
const currentDay = currentDate.getDate().toString().padStart(2, '0');
//รวมรูปแบบรหัสเริ่มดต้นด้วย CYYYYMMDD
const countId = 'RLP' +(currentYear+currentMonth+currentDay)

async function genIDrpl() {
  try {
    const connection = await connectToDatabase();
    // นับรหัสของวันนี้ว่ามีในระบบหรือไม่อ้างอิงจาก countId
    const query = `SELECT COUNT(*) AS RLP_ID FROM REQ_LIST_POS WHERE SUBSTR(RLP_ID, 1, 11) = :countId`;
    const result = await connection.execute(query, { countId });
    const empCount = result.rows[0][0];
    //นำจำนวนนับมา+1
    const numberUser = Number(empCount) + 1;
    //รวมรูปแบบรหัสเริ่มดต้นด้วย CYYYYMMDDXXX
    const paddedSequence = numberUser.toString().padStart(3, '0');
    const id_app = 'RLP' +(currentYear + currentMonth + currentDay + paddedSequence);

    await connection.close();
    return id_app;
  } catch (error) {
    throw error;
  }
};

// genIDrpl()
//   .then(result => {
//     console.log(result);
//   })
//   .catch(error => {
//     console.error('Error inserting data:', error);
//   })

module.exports = { genIDrpl };
