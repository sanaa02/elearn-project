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
          width: '100%', 
          marginLeft:'145px',
          display: 'flex', // Utiliser flexbox
          alignItems: 'flex-start', // Centrer verticalement le contenu
          justifyContent: 'center' // Centrer horizontalement le contenu
        }}
      >
        <Outlet /> 
      </Box>
    </Box>
  )
}

export default AdminPage;
