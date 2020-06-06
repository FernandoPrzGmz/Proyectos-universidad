import styled from 'styled-components';
import { Row } from 'react-bootstrap';

export const HeaderContainer = styled.div`
  height: 600px;
  background-image: url(${({urlImage}) => urlImage || 'assets/img/2018/cover-ucaribe.jpeg'});
  -webkit-background-size: auto;
  -moz-background-size: auto;
  -o-background-size: auto;
  background-size: cover;
`;

export const HeaderTop = styled.div`
  position: relative;
  display: block;
  height: 100px;
`;

export const HeaderTopH1 = styled.h1`
  color: white;
  font-size: 20px;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 250px;
  margin: 20px;
`;

export const HeaderTopImg = styled.img`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 100px;
    
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export const HeaderCardContent = styled.div`
  color: white;
  margin: auto;
  width: 50%;
  height: 50%;
  text-align: center;
`;

export const HeaderCardContentImg =  styled.img`
  width: 20%;
  margin: 20px;
`;
export const HeaderCardContentButton =  styled.a`
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
  margin-top: 50px;
  padding: 10px 75px;

  :hover {
    background-color: rgb(51, 194, 204);
    color: white;
  }
  :active {
    position: relative;
    top: 1px;
  }
`;

/*  */
export const StyledRow = styled(Row)`
  margin-bottom: 50px; 
`;

export const SectionContainer = styled.section`
  width: 100%;
  padding: 50px 15%;
  margin-right: auto;
  margin-left: auto;
`;

export const SectionContainerImg = styled.img`
  width: 50%;
  margin:auto;
  display:block;
`;

export const SectionContainerH3 = styled.h3`
  color: #2ECFC9;
  font-weight: normal;
  margin-bottom: 20px;
  text-align: left;
`;

export const SectionCover = styled.section`
  height: 300px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${({urlImage}) => urlImage || 'assets/img/2018/cover-ucaribe.jpeg'});
`;