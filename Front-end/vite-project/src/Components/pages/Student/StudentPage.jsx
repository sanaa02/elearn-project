
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom'; 
import StudentSideBar from '../../StudentSideBar';
function StudentPage() {
  return (
    <Box sx={{ display: 'flex', marginTop: '80px' }}> 
    <StudentSideBar />
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, width: '100%', marginLeft:'50px' }}>
     
      <Outlet /> 

      
    </Box>
  </Box>
  )
}

export default StudentPage