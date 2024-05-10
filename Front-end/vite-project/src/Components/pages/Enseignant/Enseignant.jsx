
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom'; 
import TeacherSideBar from '../../TeacherSideBar';
import './Modules.css'
function Enseignant() {
  return (
    <Box sx={{ display: 'flex', marginTop: '80px' }}> 
    <TeacherSideBar />
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, width: '100%', marginLeft:'50px' }}>
     
      <Outlet /> 

      
    </Box>
  </Box>
  )
}

export default Enseignant