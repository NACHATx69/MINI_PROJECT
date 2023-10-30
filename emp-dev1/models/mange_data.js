const { connectToDatabase } = require("../config/db");
const oracledb = require("oracledb");

async function updatePosition(position, createReq, approveCreateReq, postReq, applSelect, sumReport, managePer) {
  try {
    const connection = await connectToDatabase();
    const sql = `
      UPDATE POSITION
      SET
        CREATE_REQ = :createReq,
        APPROVE_CREATE_REQ = :approveCreateReq,
        POST_REQ = :postReq,
        APPL_SELECT = :applSelect,
        SUM_REPORT = :sumReport,
        MANAGE_PER = :managePer
      WHERE POS_ID = :position
    `;
    const bindData = {
      createReq: createReq,
      approveCreateReq: approveCreateReq,
      postReq: postReq,
      applSelect: applSelect,
      sumReport: sumReport,
      managePer: managePer,
      position: position
    };

    console.log(sql,bindData)

    await connection.execute(sql, bindData, { autoCommit: true });
    await connection.close();
  } catch (error) {
    console.error("Error updating position: ", error);
    throw error;
  }
}

module.exports = {
  updatePosition
};
