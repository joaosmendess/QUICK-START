import { Box, Button, Paper, TextField, styled } from "@mui/material";

// Usando o styled do Material-UI para estilizar componentes do Material-UI
export const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  borderRadius: '15px',
  width: '100%',
  maxWidth: '900px',
  margin: '150px auto',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
  backgroundColor: "#FFFFFF",
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    padding: '1rem',
    maxWidth: '90%',
  },
  [theme.breakpoints.down('sm')]: {
    margin: '100px auto',
  },
}));

export const LeftContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '50%',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const RightContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '50%',
  padding: '2rem',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    padding: '1rem',
  },
}));

export const ImageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: 'auto',
  },
}));

export const HeaderContainer = styled(Box)({
  alignSelf: 'center',
  marginBottom: '20px',
});

export const ButtonContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  marginTop: '1rem',
  gap: '15px',
});

export const LoginButton = styled(Button)({
  width: '80%',
  '&:hover': {
    backgroundColor: '#388e3c',
  },
});

export const SSOButton = styled(Button)({
  whiteSpace: 'nowrap',
  width: '100%',
  height: '3rem',
});

export const InputField = styled(TextField)({
  width: '80%',
});

export const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

export const DividerStyled = styled(Box)(({ theme }) => ({
  width: '1px',
  height: '400px',
  backgroundColor: theme.palette.divider,
  margin: '0 2rem',
  border: 'none',
  [theme.breakpoints.down('md')]: {
    height: '1px',
    width: '80%',
    margin: '1rem 0',
  },
}));

export const Wrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url('/mnt/data/A_modern_background_with_a_smooth_gradient_from_da.png') no-repeat center center;
  background-size: cover;
`;

export const StyledPaper = styled(Paper)`
  padding: 2rem;
  text-align: center;
  max-width: 400px;
  margin: auto;
  margin-top: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  ${props => props.theme.breakpoints.down('md')} {
    padding: 1rem;
    margin-top: 10vh;
  }
`;
