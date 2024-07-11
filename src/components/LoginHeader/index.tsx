
import { styled } from '../../stitches.config';
import logo from '../../assets/trava-de-seguranca.webp'





const Logo = styled('img', {
  height: '50px',
});

const LoginHeader = () => {


  return (
    <>
      <Logo src={logo} alt="Logo" loading='lazy'   />
      
      
    </>
  );
};

export default LoginHeader;
