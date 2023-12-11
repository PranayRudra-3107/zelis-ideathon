const pool = require('./index');

const getStatus = async () => {
    try {
      return await new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM idea_status", (error, results) => {
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
  
 
  module.exports = {getStatus};
