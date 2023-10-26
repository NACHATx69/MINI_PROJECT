const { connectToDatabase } = require("../config/db");
const oracledb = require("oracledb");

async function applicant_add(agm) {
  try {
    const connection = await connectToDatabase();
    const sql = `
    INSERT INTO APPLICANT (
      APPL_ID, CARREER_ID,
      FNAME, LNAME, EMAIL, TELL, SALARY, ADDRESS,
      SKILL_EX1, SKILL_EX2, SKILL_EX3, SKILL_EX4,
      EXP, STUDY,
      LINK_FOLIO, DATE_FORM
    ) VALUES (
      :APPL_ID, :REQUEST_ID,
      :FNAME, :LNAME, :EMAIL, :TELL, :SALARY, :ADDRESS,
      :SKILL_EX1, :SKILL_EX2, :SKILL_EX3, :SKILL_EX4,
      :EXP, :STUDY,
      :LINK_FOLIO, :DATE_FORM
    )`;

    const options = {
      autoCommit: true,
      bindDefs: {
        APPL_ID: { type: oracledb.STRING },
        REQUEST_ID: { type: oracledb.STRING },
        FNAME: { type: oracledb.STRING },
        LNAME: { type: oracledb.STRING },
        EMAIL: { type: oracledb.STRING },
        TELL: { type: oracledb.STRING },
        SALARY: { type: oracledb.STRING },
        ADDRESS: { type: oracledb.STRING },
        SKILL_EX1: { type: oracledb.STRING },
        SKILL_EX2: { type: oracledb.STRING },
        SKILL_EX3: { type: oracledb.STRING },
        SKILL_EX4: { type: oracledb.STRING },
        EXP: { type: oracledb.STRING },
        STUDY: { type: oracledb.STRING },
        LINK_FOLIO: { type: oracledb.STRING },
        DATE_FORM: { type: oracledb.DATE },
      },
    };

    const result = await connection.execute(sql, agm, options);
    await connection.close();
    return result;
  } catch (error) {
    throw error;
  }
}

const newApplicantData = {
  APPL_ID: 'A25661025005',
  REQUEST_ID: 'C25661025008',
  FNAME: 'John',
  LNAME: 'Doe',
  EMAIL: 'johndoe@example.com',
  TELL: '1234567890',
  SALARY: '50000',
  ADDRESS: '123 Main St, City',
  SKILL_EX1: 's001',
  SKILL_EX2: 's001',
  SKILL_EX3: 's001',
  SKILL_EX4: 's001',
  EXP: '2 years',
  STUDY: '1',
  LINK_FOLIO: 'https://example.com',
  DATE_FORM: '',
};

applicant_add(newApplicantData)
  .then((result) => {
    console.log("Data inserted successfully:", result);
  })
  .catch((error) => {
    console.error("Error inserting data:", error);
  });

module.exports = { applicant_add };