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
  
  module.exports = {getIdeas};
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