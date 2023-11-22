const Pool = require("pg").Pool;
const pool = new Pool({
  user: 'postgres',
  host: '10.136.6.177',
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
  
  const getIdeaById = async (ideaId) => {
    try {
      return await new Promise(function (resolve, reject) {
        const query = `SELECT * FROM idea_list WHERE id = $1`;
        pool.query(query, [ideaId], (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows && results.rows.length > 0) {
            console.log(results.rows[0]);
            resolve(results.rows[0]);
          } else {
            reject(new Error("Idea not found"));
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
      const { title, description , status, employeeid } = body;
      pool.query(
        "INSERT INTO idea_list (idea_name, idea_description,status,employee_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [title, description, status, employeeid],
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
  const deleteIdea = (id) => {
    return new Promise(function (resolve, reject) {
      pool.query(
        "DELETE FROM idea_list WHERE id = $1",
        [id],
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(`Idea deleted with ID: ${id}`);
        }
      );
    });
  };
  //update a merchant record
  const updateIdea = (id, body) => {
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
            resolve(`Idea updated: ${JSON.stringify(results.rows[0])}`);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  };
  module.exports = {getIdeas , getIdeaById, createIdea , deleteIdea , updateIdea};
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