import styled from "styled-components";
import styles from "./../components/styles";

// News Parts

export const Wrapper = styled.div`
  width: 100%;
  height: 585px;
  background-color: ${styles.White};
  padding: 29px;
  text-align: left;
  border-radius: 10px;
  margin-bottom: 40px;
`;

export const Ribbon = styled.span`
position: relative;
float: left;
width: 150px;
height:40px;
margin-top:-50px;
margin-bottom: 10px;
margin: -50px 0px 10px -10px;
background-color: ${styles.Dark};
padding: 8px; 10px;
color: ${styles.White};
font-size: 18px;
font-family:${styles.Bold};
border-radius: 14px 14px 4px 4px;
text-align: center;
text-transform: uppercase;
`;
export const Headline = styled.div`
  width: 620px;
  height: 100px;
  float: left;
  border-bottom: 0.5px solid ${styles.LightGray};
  padding-right: 10px;
`;
export const Date = styled.i`
  font-size: 12px;
  font-family: ${styles.Regular};
  color: ${styles.Dark};
  margin-top: 0px;
`;
export const Title = styled.h1`
  font-size: 24px;
  font-family: ${styles.Bold};
  text-transform: uppercase;
  color: ${styles.Dark};
  text-align: justify;
  word-wrap: break-word;
`;

export const Side = styled.div`
  height: 74px;
  width: 206px;
  float: right;
  display: flex;
  justify-content: right;
  flex-direction: column;
  text-align: center;
`;
export const Category = styled.p`
  padding: 8px 16px;
  background-color: ${styles.Cherry};
  color: ${styles.White};
  font-size: 1.1rem;
  border-radius: 14px 14px 4px 4px;
  text-align: center;
  font-family: ${styles.Regular};
`;
export const Content = styled.div`
  width: 435px;
  height: 320px;
  float: left;
  margin-top: 17px;
  text-align: justify;
  word-break: break-all;
  overflow: auto;
  padding: 10px;
  letter-spacing: 0.1px;
  color: ${styles.Gray};
  font-family: ${styles.Regular};
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

export const Image = styled.img`
  float: right;
  width: 375px;
  height: 303px;
  margin-top: 16px;
  border-radius: 4px;
  background-color: ${styles.Dark};
`;
export const Under = styled.section`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  float: left;
  margin-top: 18px;
`;
export const Cite = styled.h6`
  color: ${styles.Dark};
  font-family: ${styles.Regular};
  float: left;
  width: 100%;
  height: 30px;
  position: relative;
  top: 50px;
`;

export const Options = styled.div`
  float: right;
  width: 50%;
  height: 50px;
  position: relative;
`;

export const List = styled.ul`
  padding::0px;
  margin: 0px;
`;

export const Links = styled.li`
  display: inline-block;
  padding: 8px;
  font-family: ${styles.Regular};
  border-radius: 10px;
`;
