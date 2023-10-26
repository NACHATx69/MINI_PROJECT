const { connectToDatabase } = require("../config/db");

async function countrecinter() {
  try {
    const connection = await connectToDatabase();
    // ทำตามคำสั่ง SQL ที่ต้องการ
    const query = "SELECT COUNT(*) FROM RECORD_INTERVIEW";
    const result = await connection.execute(query);
    const count = result.rows[0][0];
    const data = Number(count);

    const numberUser = Number(data) + 1;

    const paddedSequence = numberUser.toString().padStart(3, "0");
    const ID = paddedSequence;

    await connection.close();
    return ID;
  } catch (error) {
    throw error;
  }
}

countrecinter();

module.exports = { countrecinter };
