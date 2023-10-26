const { connectToDatabase } = require("../config/db");
const oracledb = require("oracledb");

async function creatINTER(newInterdata) {
  try {
    const connection = await connectToDatabase();
    const sql = `
    INSERT INTO interview (INTER_ID,INTER_DETAIL,DAY1ST,DAY2ND,T1,T2,EMP_ID1,EMP_ID2,EMP_ID3,APPL_ID)
    VALUES (:INTER_ID, :INTER_DETAIL, :DAY1ST, :DAY2ND, :T1, :T2,:EMP_ID1,:EMP_ID2,:EMP_ID3,:APPL_ID)
  `;

    const options = {
      autoCommit: true,
      bindDefs: {
        INTER_ID: { type: oracledb.STRING },
        INTER_DETAIL: { type: oracledb.STRING },
        DAY1ST: { type: oracledb.DATE },
        DAY2ND: { type: oracledb.DATE },
        T1: { type: oracledb.STRING },
        T2: { type: oracledb.STRING },
        EMP_ID1: { type: oracledb.STRING },
        EMP_ID2: { type: oracledb.STRING },
        EMP_ID3: { type: oracledb.STRING },
        APPL_ID: { type: oracledb.STRING },
      },
    };
    const result = await connection.execute(sql, newInterdata, options);
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

module.exports = { creatINTER };
