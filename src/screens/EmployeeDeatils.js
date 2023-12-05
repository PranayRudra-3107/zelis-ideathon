import React from "react";
import { useEffect , useState} from "react";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";

const EmployeeDeatils = () =>{
    const [EmployeeList , setEmployeeList] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3001/employee_list')
          .then(response => response.json())
          .then(data => {        
            setEmployeeList(data.map((employeelist) => ({ ...employeelist})));
          })
          .catch(error => {
            console.error('Error fetching ideas:', error);
          });
      }, []);

      const columns = [
        { field: 'firstname', headerName: 'First Name',headerClassName: 'custom-header', width: 200},
        { field: 'lastname', headerName: 'Last Name',headerClassName: 'custom-header' , width: 200},
        { field: 'phone_no', headerName: 'Phone Number',headerClassName: 'custom-header', width: 200},      
        { field: 'role_name', headerName: 'Role',headerClassName: 'custom-header', width: 100},
        { field: 'employee_id', headerName: 'Employee ID',headerClassName: 'custom-header', width: 100},         
        { field: 'email', headerName: 'Email',headerClassName: 'custom-header', width: 300},
        { field: 'department_name', headerName: 'Department',headerClassName: 'custom-header', width: 100},
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
        <div style={{ height: 400, width: '90%' }}>
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

