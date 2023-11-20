const Pool = require("pg").Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'zelis-ideathon',
  password: 'postgres',
  port: 5432,
});

const getIdeas = async () => {
    try {
      return await new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM idea_list", (error, results) => {
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
  
  const createIdea = (body) => {
    return new Promise(function (resolve, reject) {
      const { name, description , status, employeeid } = body;
      pool.query(
        "INSERT INTO merchants (idea_name, idea_description,status,employee_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, description, status, employeeid],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(
              `A new idea has been added: ${JSON.stringify(results.rows[0])}`
            );
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  };
  //delete a merchant
  const deleteIdeas = (id) => {
    return new Promise(function (resolve, reject) {
      pool.query(
        "DELETE FROM merchants WHERE id = $1",
        [id],
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(`Merchant deleted with ID: ${id}`);
        }
      );
    });
  };
  //update a merchant record
  const updateIdeas = (id, body) => {
    return new Promise(function (resolve, reject) {
      const { name, description, status } = body;
      pool.query(
        "UPDATE idea_list SET name = $1, description = $2, status = $3 WHERE id = $4 RETURNING *",
        [name, description, status, id],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(`Merchant updated: ${JSON.stringify(results.rows[0])}`);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  };
  module.exports = {getIdeas , createIdea , deleteIdeas};
// pool.connect();

// pool.query (`Select * from idea_list`,(err,res)=>{
//     if(!err){
//         console.log(res.rows);
//     }
//     else{
//         console.log(err.message);
//     }
//     pool.end;
// })