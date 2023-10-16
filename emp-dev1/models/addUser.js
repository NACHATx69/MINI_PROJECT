
const { connectToDatabase } = require("../config/db");
const oracledb = require('oracledb');


async function creatUser(employeeData) {
  try {
    const connection = await connectToDatabase();
    // ทำตามคำสั่ง SQL ที่ต้องการ
    const sql = `
    INSERT INTO employee (EMP_ID, FNAME, LNAME, DEPARTMENT, POSITIONS, MGR_ID,STATUS, PASS, HIREDATE)
    VALUES (:EMP_ID, :FNAME, :LNAME, :DEPARTMENT, :POSITIONS, :MGR_ID,0, :PASS, :HIREDATE)
  `;

  
  const options = {
    autoCommit: true, // ให้บันทึกอัตโนมัติ
    bindDefs: {
      EMP_ID: { type: oracledb.STRING },
      FNAME: { type: oracledb.STRING },
      LNAME: { type: oracledb.STRING },
      DEPARTMENT: { type: oracledb.STRING },
      POSITIONS: { type: oracledb.STRING },
      MGR_ID: { type: oracledb.STRING },
      PASS: { type: oracledb.STRING },
      HIREDATE: { type: oracledb.DATE },
    }
  };
  const result = await connection.execute(sql, employeeData, options); 
  await connection.close();
  return result;
} catch (error) {
  throw error;
}
};


//------------------------------------ชุดข้อมูลสำหรับทดสอบ
const newEmployeeData = {
    EMP_ID: '123456',
    FNAME: 'John',
    LNAME: 'Doe',
    DEPARTMENT: 'd05',
    POSITIONS: 'p01',
    MGR_ID: 'e003',
    USERNAME: 'johndoe',
    PASS: 'password123',
    HIREDATE: null,
  };
//------------------------------------ทดสอบรันโค้ด
  creatUser(newEmployeeData)
  .then(result => {
    console.log('Data inserted successfully:', result);
  })
  .catch(error => {
    console.error('Error inserting data:', error);
  });

module.exports = { creatUser };
