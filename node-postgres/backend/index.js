const express = require('express')
const app = express()
const port = 3001

const Pool = require("pg").Pool;
const pool = new Pool({
  user: 'postgres',
  host: '10.136.6.177',
  database: 'zelis-ideathon',
  password: 'postgres',
  port: 5432,
});

const ideas_model = require('./IdeaModel')
const emp_model = require('./EmployeeModel')
const status_model = require('./StatusModel')

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

app.get('/idea_list/:id', async (req, res) => {
  const ideaId = req.params.id;
  ideas_model.getIdeaById(ideaId)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.get('/myidea_list/:id', async (req, res) => {
  const Empid = req.params.id;
  ideas_model.getIdeaByEmpid(Empid)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

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

app.get('/employee_list', (req, res) => {
  emp_model.getEmployeeList()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/login', async (req, res) => {
  const { username,  password, rememberMe } = req.body;
  console.log(username, password,rememberMe)
  try {
    console.log('going to login');
    console.log('Username: ' + username + ' , password: ' + password);
    
    const { status, message } = await emp_model.loginUser(username,password,rememberMe);
   console.log(status,message)
   //debugger;
    if (status === 200) {
      console.log(message); 
      res.status(status).send(message); 
    } else {
      console.error('Error:', message); 
      res.status(status).send(message); 
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal server error');
  }
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

app.get('/graphs', async (req, res) => {
  try {
    const query = "SELECT SUM(CASE WHEN status_id = '1' THEN 1 ELSE 0 END) AS s1, SUM(CASE WHEN status_id = '2' THEN 1 ELSE 0 END) AS s2, SUM(CASE WHEN status_id = '3' THEN 1 ELSE 0 END) AS s3, SUM(CASE WHEN status_id = '4' THEN 1 ELSE 0 END) AS s4, SUM(CASE WHEN status_id = '5' THEN 1 ELSE 0 END) AS s5, SUM(CASE WHEN status_id = '6' THEN 1 ELSE 0 END) AS s6, SUM(CASE WHEN status_id = '7' THEN 1 ELSE 0 END) AS s7 FROM idea_list"; 
    const result = await pool.query(query);
    const data = [
      { name: 'Submitted', count: result.rows[0].s1 },
      { name: 'In Review', count: result.rows[0].s2 },
      { name: 'Manager Approval', count: result.rows[0].s3 },
      { name: 'Director Approval', count: result.rows[0].s4 },
      { name: 'In Progress', count: result.rows[0].s5 },
      { name: 'Deployed', count: result.rows[0].s6 },
      { name: 'Rejected', count: result.rows[0].s7 }
    ];
    res.json(data);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/employee_mapping', async (req, res) => {
  emp_model.setEmployeeMaping(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});
 
app.get('/employee_mapping/:employee_id', async (req, res) => {
  const id = req.params.employee_id;
  emp_model.getRole(id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
