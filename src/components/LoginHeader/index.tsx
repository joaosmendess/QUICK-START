import { Typography, Box } from '@mui/material';
import logo from '../../assets/local-na-rede-internet.png';

const LoginHeader = () => {
  return (
    <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
      <img src={logo} alt="Logo" loading="lazy" style={{ height: '50px' }} />
      <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#3f51b5', marginTop: '10px' }}>
        OFM Backoffice
      </Typography>
    </Box>
  );
};

export default LoginHeader;
