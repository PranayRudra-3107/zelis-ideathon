const express = require('express')
const app = express()
const port = 3001

const ideas_model = require('./Idea_model')
const emp_model = require('./employee_model')
const status_model = require('./Status_model')

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

app.use(express.json());

app.get('/idea_list', (req, res) => {
  ideas_model.getIdeas()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/employee_details', (req, res) => {
  emp_model.getUser()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/idea_list', (req, res) => {
  ideas_model.createIdea(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})
app.post('/employee_details', (req, res) => {
  emp_model.createUser(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/idea_list/:id', (req, res) => {
  ideas_model.deleteIdea(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})
app.put("/idea_list/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  ideas_model
    .updateIdea(id, body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
app.put("/employee_details/:employee_id", (req, res) => {
  const id = req.params.employee_id;
  const body = req.body;
  emp_model
    .updateUser(id, body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get('/idea_status', (req, res) => {
  status_model.getStatus()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})