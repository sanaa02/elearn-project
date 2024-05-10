import SideBar from '../../SideBar';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom'; 

function AdminPage() {
  return (
    <Box sx={{ display: 'flex', marginTop: '150px' }}> 
      <SideBar />
      <Box
        component="main"
        sx={{ 
          
          p: 3, 
          
          marginLeft:'80px',
          // Centrer horizontalement le contenu
        }}
      >
        <Outlet /> 
      </Box>
    </Box>
  )
}

export default AdminPage;
