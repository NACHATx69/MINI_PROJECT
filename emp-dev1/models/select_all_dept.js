const { connectToDatabase } = require("../config/db");

async function getall() {
  try {
    const connection = await connectToDatabase();
    // ทำตามคำสั่ง SQL ที่ต้องการ
    const query = `select emp_id,fname,lname
    from employee,department
    WHERE (employee.department=department.dept_id)`;
    const result = await connection.execute(query);

    //json file
    const data = result.rows.map((row) => {
      var data = {};
      for (let i = 0; i < result.metaData.length; i++) {
        data[result.metaData[i].name] = row[i];
      }
      return data;
    });
    console.log(data);
    await connection.close();
    return data;
  } catch (error) {
    throw error;
  }
}

module.exports = { getall };
