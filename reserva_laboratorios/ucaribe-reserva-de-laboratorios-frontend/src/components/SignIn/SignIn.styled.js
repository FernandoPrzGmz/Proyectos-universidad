import  styled from 'styled-components';

export const SignInContainer = styled.div`
  background: url(${({urlImage}) => urlImage || 'assets/img/2018/cover-ucaribe.jpeg'}) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  overflow: hidden;
  position: fixed;
`;

export const FormContainer = styled.div`
  margin-top: 100px;

  color: #5d5d5d;
  background: #f2f2f2;
  padding: 26px;
  border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
`;

export const FormTitle = styled.h4`
  text-align: center;
`;

export const InfoContainer = styled.div`
  text-align: center;
	margin-top: 1em;
	margin-bottom: 50px;
`;

export const InfoLinks = styled.a`
  color: white;
  font-size: 18px;
  :hover {
    color: white;
  }
`;

export const Button =  styled.a`
  -moz-box-shadow: inset 0px -3px 7px 0px #2BACB5;
  -webkit-box-shadow: inset 0px -3px 7px 0px #2BACB5;
  box-shadow: inset 0px -3px 7px 0px #2BACB5;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  background-color: #2BACB5;
  border-radius: 4px;
  display: inline-block;
  color: white;
  font-family: Arial;
  font-size: 15px;
  padding: 10px 75px;
  width: 100%;
  text-align: center;

  :hover {
    background-color: rgb(51, 194, 204);
    color: white;
  }
  :active {
    position: relative;
    top: 1px;
  }
`;