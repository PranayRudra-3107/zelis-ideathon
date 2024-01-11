const {Sequelize , DataTypes} = require("sequelize");

const sequelize = new Sequelize(
   'zelis-ideathon',
   'postgres',
   'postgres',
    {
      host: '10.136.6.177',
      dialect: 'postgres'
    }
  ); 

const IdeaHistory = sequelize.define("idea_history", {
    idea_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.literal('nextval(\'idea_history_idea_id_seq\'::regclass)')
    },
    employee_id: {
      type: DataTypes.INTEGER,
    },
    idea_title: { 
      type: DataTypes.STRING(255),
    },
    idea_description: {
      type: DataTypes.TEXT,
    },
    submit_date: {
      type: DataTypes.DATE,
    },
    modified_date: {
      type: DataTypes.DATE,
    },
    status_id: {
      type: DataTypes.INTEGER,
    }
 });
 
 const Department = sequelize.define("departments", {
  department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.literal('nextval(\'departments_department_id_seq\'::regclass)')
  },
  department_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
  },
}, {
  tableName: 'departments',
  timestamps: false,
});

const EmployeeDetails = sequelize.define("employee_details", {
  firstname: {
      type: DataTypes.STRING(255),
  },
  lastname: {
      type: DataTypes.STRING(255),
  },
  employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
  },
  phone_no: {
      type: DataTypes.STRING(20),
  },
  email: {
      type: DataTypes.STRING(255),
  },
  created_date: {
      type: DataTypes.DATE,
  },
  updated_date: {
      type: DataTypes.DATE,
  },
  password: {
      type: DataTypes.STRING(255),
  },
}, {
  tableName: 'employee_details',
  timestamps: false,
});

const EmployeeMapping = sequelize.define("employee_mapping", {
  employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.literal('nextval(\'employee_mapping_employee_id_seq\'::regclass)')
  },
  department_id: {
      type: DataTypes.INTEGER,
  },
  role_id: {
      type: DataTypes.INTEGER,
  },
}, {
  tableName: 'employee_mapping',
  timestamps: false,
});

const IdeaList = sequelize.define("idea_list", {
  id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.literal('nextval(\'idea_list_id_seq\'::regclass)')
  },
  idea_name: {
      type: DataTypes.TEXT,
      allowNull: false,
  },
  idea_description: {
      type: DataTypes.TEXT,
      allowNull: false,
  },
  status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
}, {
  tableName: 'idea_list',
  timestamps: false,
});

const IdeaStatus = sequelize.define("idea_status", {
  status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.literal('nextval(\'idea_status_status_id_seq\'::regclass)')
  },
  status_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
  },
}, {
  tableName: 'idea_status',
  timestamps: false,
});

const Role = sequelize.define("roles", {
  role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.literal('nextval(\'roles_role_id_seq\'::regclass)')
  },
  role_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
  },
}, {
  tableName: 'roles',
  timestamps: false,
});

//  IdeaHistory.create({
//     idea_id: 2,
//     employee_id: 123446,
//     idea_title: 'Sample Trial',
//     idea_description: 'This is Trial.',
//     submit_date: new Date(),
//     modified_date: new Date(),
//     status_id: 1
//  }).then(ideaHistory => {
//     console.log('Created: ', ideaHistory);
//  }).catch(error => {
//     console.error('Error: ', error);
//  });

 sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

module.exports = {Sequelize, Role , IdeaStatus , IdeaHistory , IdeaList , EmployeeMapping , EmployeeDetails , Department};