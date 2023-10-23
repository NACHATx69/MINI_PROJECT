const { connectToDatabase } = require("../config/db");

async function getPositionApplicantCounts() {
  try {
    const connection = await connectToDatabase();

    const query = `
      SELECT position.pos_name, COUNT(*) AS applicant_count
      FROM req_list_pos
      INNER JOIN position ON req_list_pos.position = position.pos_id
      GROUP BY position.pos_name;
    `;

    const result = await connection.execute(query);

    const data = result.rows.map((row) => {
      return {
        position: row[0],
        applicant_count: row[1]
      };
    });

    console.log(data);
    await connection.close();
    return data;
  } catch (error) {
    throw error;
  }
}

getPositionApplicantCounts();
module.exports = { getPositionApplicantCounts };