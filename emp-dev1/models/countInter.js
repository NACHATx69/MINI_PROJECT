const { connectToDatabase } = require("../config/db");

async function countInter() {
  try {
    const connection = await connectToDatabase();
    // ทำตามคำสั่ง SQL ที่ต้องการ
    const query = "SELECT COUNT(*) FROM INTERVIEW";
    const result = await connection.execute(query);
    const count = result.rows[0][0];
    const data = Number(count);

    const numberUser = Number(data) + 1;

    const paddedSequence = numberUser.toString().padStart(3, "0");
    const interID = "inter" + paddedSequence;
    console.log(interID);
    await connection.close();
    return interID;
  } catch (error) {
    throw error;
  }
}

countInter();

module.exports = { countInter };
