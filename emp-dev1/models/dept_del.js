const { connectToDatabase } = require("../config/db");
const oracledb = require("oracledb");

const delete_dept = {
  DEPT_ID: "d06",
};

async function delete_dep(delete_dept) {
  try {
    const connection = await connectToDatabase();
    const sql = `DELETE FROM DEPARTMENT WHERE DEPT_ID = :DEPT_ID`;

    const options = {
      autoCommit: true,
      bindDefs: {
        DEPT_ID: { type: oracledb.STRING },
      },
    };
    const result = await connection.execute(sql, delete_dept, options);
    await connection.close();
    return result;
  } catch (error) {
    throw error;
  }
}

delete_dep(delete_dept)
  .then((result) => {
    console.log("Data deleted successfully:", result);
  })
  .catch((error) => {
    console.error("Error deleting data:", error);
  });

module.exports = { delete_dep };