const { connectToDatabase } = require("../config/db");

async function mgr_name() {
  try {
    const connection = await connectToDatabase();
    // ทำตามคำสั่ง SQL ที่ต้องการ
    const query = "SELECT DEPT_ID,DEPT_NAME, DEPARTMENT.MGR_ID,fname, lname FROM EMPLOYEE, DEPARTMENT WHERE (DEPARTMENT.MGR_ID=EMPLOYEE.EMP_ID)";
    const result = await connection.execute(query);

    //json file
    const data = result.rows.map((row) => {
      var data = {};
      for (let i = 0; i < result.metaData.length; i++) {
        data[result.metaData[i].name] = row[i];
      }
      return data;
      
      
    });

    await connection.close();
    // console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};

// mgr_name()

module.exports = { mgr_name };
