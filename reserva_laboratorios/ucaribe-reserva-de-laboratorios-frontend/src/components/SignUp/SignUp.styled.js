import  styled from 'styled-components';

/* Preview */
export const PreviewImg = styled.img`
  padding: 0;
  width: 50px;
  height: 50px;    

  border-radius: 50% ;
  background-size: 50% auto;
  border: 2px solid #2BACB5;
`;

export const TextOverflow = styled.p`
  white-space: nowrap; 
  width: 100%; 
  overflow: hidden;
  text-overflow: ellipsis; 
`;

/* Form */
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