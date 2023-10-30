const { connectToDatabase } = require("../config/db");
const oracledb = require('oracledb');
async function career_approve(A) {
  try {
    const connection = await connectToDatabase();

    const query = `
    UPDATE REQ_LIST 
    SET 
        STATUS = :status,
        REQ_COMMENT = :cemment_approve
    WHERE REQ_LIST_ID = :req_id

    `;

    const options = {
      autoCommit: true,
      bindDefs: {
        STATUS: { type: oracledb.STRING },
        COMMENT: { type: oracledb.STRING },
        REQ_LIST_ID: { type: oracledb.STRING },
      }
    };

    const result = await connection.execute(query,A,options);

    await connection.close();
    return result;
  } catch (error) {
    throw error;
  }
};
module.exports = { career_approve };

// const test = {
//   status: '2',
//   cemment_approve: '', 
//   req_id: 'REQ01499',
// };

// career_approve(test)
//  .then((result) => {
//     console.log("Data inserted successfully:", result);
//   })
//   .catch((error) => {
//     console.error("Error inserting data:", error);
//   });