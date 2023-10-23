const { connectToDatabase } = require("../config/db");
const oracledb = require("oracledb");

const inter_status = {
  INTER_ID: "inter014",
  INTERVIEW_STATUS: "1",
};

async function update_inter_status(inter_status) {
  try {
    const connection = await connectToDatabase();
    const sql = `
    UPDATE interview
    SET INTERVIEW_STATUS=:INTERVIEW_STATUS    
    WHERE INTER_ID=:INTER_ID`;

    const options = {
      autoCommit: true,
      bindDefs: {
        INTER_ID: { type: oracledb.STRING },
        INTERVIEW_STATUS: { type: oracledb.STRING },
      },
    };
    const result = await connection.execute(sql, inter_status, options);
    await connection.close();
    return result;
  } catch (error) {
    throw error;
  }
}

update_inter_status(inter_status)
  .then((result) => {
    console.log("Data Update successfully:", result);
  })
  .catch((error) => {
    console.error("Error Update data:", error);
  });

module.exports = { update_inter_status };