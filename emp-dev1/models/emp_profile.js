const { connectToDatabase } = require("../config/db");

async function emp_profile(id) {
  try {
    const connection = await connectToDatabase();
    // คำสั่ง SQL เก็บไว้ที่ query
    const query = `
    SELECT 
      EMPLOYEE.EMP_ID, 
      EMPLOYEE.FNAME, 
      EMPLOYEE.LNAME,
      EMPLOYEE.MGR_ID,
      DEPARTMENT.DEPT_NAME,
      POSITION.POS_NAME,
      EMPLOYEE.DEPARTMENT,
      MGRF.FNAME AS MGR_FNAME,
      MGRF.LNAME AS MGR_LNAME
    FROM EMPLOYEE, EMPLOYEE MGRF, DEPARTMENT, POSITION
    WHERE EMPLOYEE.EMP_ID = :id AND
        DEPARTMENT.DEPT_ID = EMPLOYEE.DEPARTMENT AND
        POSITION.POS_ID = EMPLOYEE.POSITIONS AND
        EMPLOYEE.MGR_ID = MGRF.EMP_ID
    `;
    const result = await connection.execute(query, id);
    const data = result.rows.map((row) => {
      var data = {};
      for (let i = 0; i < result.metaData.length; i++) {
        data[result.metaData[i].name] = row[i];
      }
      return data;
    });

    return data;
  } catch (error) {
    throw error;
  }
}

var application = { id: '256610016' };
// emp_profile(application)
//   .then((result) => {
//     console.log("Found:", result);
//   })
//   .catch((error) => {
//     console.error("Not Found:", error);
//   });

module.exports = { emp_profile };
