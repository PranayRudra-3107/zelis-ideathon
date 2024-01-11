const IdeaORM = require("./ORM");

const getIdeas = (req , res) => {
    IdeaORM.findAll({
        attributes: ["id" ,"idea_name" ,"idea_description" ,"status_id","employee_id" ],
     })
        .then((result) => {
           return res.json(result);
        })
        .catch((error) => {
           console.log(error);
           return res.json({
              message: "Unable to fetch records!",
           });
        });
}

module.exports = {getIdeas}     