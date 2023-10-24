const { connectToDatabase } = require("../config/db");

async function career_listRequest() {
  try {
    const connection = await connectToDatabase();
    // คำสั่ง SQL เก็บไว้ที่ query
    const query = `
    SELECT REQ_LIST_ID, FNAME, LNAME, DEPT_NAME,POS_NAME, REQ_LIST.DETAIL, REQ_LIST.STATUS
    from REQ_LIST,EMPLOYEE,POSITION,DEPARTMENT
    where (REQ_LIST.REQ_BY=EMPLOYEE.EMP_ID) AND 
      (POSITION.POS_ID=REQ_LIST.JOB_POSITTION) AND
      DEPARTMENT.DEPT_ID=REQ_LIST.JOB
    `;
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
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};

career_listRequest()

module.exports = { career_listRequest };
