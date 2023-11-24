const Pool = require("pg").Pool;
const pool = new Pool({
  user: 'postgres',
  host: '10.136.6.177',
  database: 'zelis-ideathon',
  password: 'postgres',
  port: 5432,
});

const bcrypt = require('bcrypt');
const saltRounds = 10;

const getUser = async () => {
    try {
      return await new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM employee_details", (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            console.log(results.rows);
            resolve(results.rows);
          } else {
            reject(new Error("No results found"));
          }
        });
      });
    } catch (error_1) {
      console.error(error_1);
      throw new Error("Internal server error");
    }
  };
  
  const createUser = (body) => {
    return new Promise(async function (resolve, reject) {
      const { firstname, lastname, employee_id, phone_no, email, created_date, updated_date, password } = body;
       // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds);
   debugger;
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);

    
      pool.query(
        "INSERT INTO employee_details (firstname, lastname, employee_id, phone_no, email, created_date, updated_date, encrypted_password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [firstname, lastname, employee_id, phone_no, email, created_date, updated_date, hashedPassword],
        (error, results) => {
          if (error) {
            reject(error);
          }
          else if (results && results.rows) {
            resolve(
              `Registration successful ${JSON.stringify(results.rows[0])}`
            );
          } else {
            reject(new Error("Unable to register"));
          }
        }
      );
    
    });
  };

  
  const updateUser = (employee_id, body) => {
    return new Promise(async function (resolve, reject) {
      const { firstname, lastname, phone_no, updated_date, password } = body;
       // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);
      pool.query(
        "UPDATE employee_details SET firstname=$1, lastname=$2, phone_no=$3, updated_date=$4, encrypted_password=$5 WHERE employee_id = $6 RETURNING *",
        [firstname, lastname, phone_no, updated_date, hashedPassword, employee_id],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(`Details updated: ${JSON.stringify(results.rows[0])}`);
          } else {
            reject(new Error("Error while updating"));
          }
        }
      );
    });
  };
  
  const loginUser = async (username, password, rememberMe) => {
    try {
      console.log('retrieving data');
      const user = await pool.query('SELECT * FROM employee_details WHERE employee_id = $1 OR email = $2 OR phone_no = $3', [parseInt(username), username, parseInt(username)]);
      console.log('retrieved data');
      console.log(username);
      console.log(password);
      console.log(rememberMe);
  
      if (user.rows.length === 0) {
        return { status: 401, error: 'Invalid credentials' };
      }
  
      const retrievedUser = user.rows[0];
      const passwordMatch = await bcrypt.compare(password, retrievedUser.password);
  
      if (passwordMatch) {
        return { status: 200, message: 'Login successful', user: retrievedUser };
      } else {
        return { status: 401, error: 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Error during login:', error);
      return { status: 500, error: 'Internal server error' };
    }
  };
  
  module.exports = {getUser , createUser , updateUser, loginUser};