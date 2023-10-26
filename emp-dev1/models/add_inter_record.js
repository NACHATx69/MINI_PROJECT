const { connectToDatabase } = require("../config/db");
const oracledb = require("oracledb");

async function creatrecordinter(newrecdata) {
  try {
    const connection = await connectToDatabase();
    const sql = `
    INSERT INTO record_interview (ID,INTER_ID,DATE_SELECTED,RANGE_TIME_SELECTED,EMP_ID)
    VALUES (:ID, :INTER_ID, :DATE_SELECTED, :RANGE_TIME_SELECTED, :EMP_ID)
  `;

    const options = {
      autoCommit: true,
      bindDefs: {
        ID: { type: oracledb.STRING },
        INTER_ID: { type: oracledb.STRING },
        DATE_SELECTED: { type: oracledb.DATE },
        RANGE_TIME_SELECTED: { type: oracledb.DATE },
        EMP_ID: { type: oracledb.STRING },
      },
    };
    const result = await connection.execute(sql, newrecdata, options);
    await connection.close();
    return result;
  } catch (error) {
    throw error;
  }
}

// const newInterdata = {
//   INTER_ID: "inter016",
//   INTER_DETAIL: "ห้องประชุมเล็ก ชั้น1อาคารC",
//   DAY1ST: null,
//   DAY2ND: null,
//   T1: "1",
//   T2: "0",
//   INTERVIEW_STATUS: "1",
//   EMP_ID1: "e006",
//   EMP_ID2: "e002",
//   EMP_ID3: "e009",
//   APPL_ID: "a010",
// };

// creatINTER(newInterdata)
//   .then((result) => {
//     console.log("Data inserted successfully:", result);
//   })
//   .catch((error) => {
//     console.error("Error inserting data:", error);
//   });

module.exports = { creatrecordinter };
