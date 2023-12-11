import React from "react";
import { useEffect , useState} from "react";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import configData from "./config.json";

const EmployeeDeatils = () =>{
    const [EmployeeList , setEmployeeList] = useState([]);
    useEffect(() => {
        fetch(`${configData.SERVER_URL}/employee_list`)
          .then(response => response.json())
          .then(data => {        
            setEmployeeList(data.map((employeelist) => ({ ...employeelist})));
          })
          .catch(error => {
            console.error('Error fetching ideas:', error);
          });
      }, []);

      const columns = [
        { field: 'firstname', headerName: 'First Name',headerClassName: 'custom-header', flex :0.2},
        { field: 'lastname', headerName: 'Last Name',headerClassName: 'custom-header' , flex :0.2},
        { field: 'phone_no', headerName: 'Phone Number',headerClassName: 'custom-header', flex :0.2},      
        { field: 'role_name', headerName: 'Role',headerClassName: 'custom-header', flex :0.1},
        { field: 'employee_id', headerName: 'Employee ID',headerClassName: 'custom-header', flex :0.1},         
        { field: 'email', headerName: 'Email',headerClassName: 'custom-header', flex :0.3},
        { field: 'department_name', headerName: 'Department',headerClassName: 'custom-header', flex :0.1},
      ];
    return(
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <h1>Employee's List</h1>
        <div style={{ height: '80%', width: '90%' }}>
        <DataGrid 
          rows={EmployeeList} 
          columns={columns} 
          pageSize={5} 
          sx={{
            '& .custom-header': {
              backgroundColor: '#063970',
              color: 'white',
              fontWeight: 'bold'
            },
          }}
        />
        </div>
      </Box>
    )
}

export default EmployeeDeatils;

