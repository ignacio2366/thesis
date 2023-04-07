import { useState, useEffect } from "react";
import styles from "../components/styles";
import styled from "styled-components";
import Navigation from "../components/Navigation";
import SideNav from "./layout/SideNav";

function Insight() {
  return (
    <>
      <Navigation logged={localStorage.getItem("id") ? true : false} />
      <Container>
        <SideNav />
        <Main></Main>
        <RightPanel>
          <Box></Box>
          <LowerBox>sad</LowerBox>
        </RightPanel>
      </Container>
    </>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  background-size: cover;
  flex-direction: row;
  display: flex;
  justify-content: center;
`;
const Main = styled.main`
  width: 919px;
  height: 584px;
  background-color: ${styles.White};
  padding: 29px;
  text-align: left;
  border-radius: 10px;
  margin: 88px 21px 0px 20px;
  overflow: auto;
`;
export const RightPanel = styled.article`
  position: relative;
  width: 256px;
  height: 85vh;
  margin-top: 88px;
  margin-right: 28px;
  position: relative;
  right: 0;
`;

export const Box = styled.div`
  width: 100%;
  height: 370px;
  background-color: ${styles.White};
  border-radius: 10px;
  padding: 18px 16px;
  text-align: left;
`;

export const LowerBox = styled.div`
  width: 100%;
  height: 205px;
  background-color: ${styles.White};
  border-radius: 10px;
  padding: 18px 19px;
  margin-top: 8px;
  flex-direction: column;
  flex-wrap: wrap;
`;

export default Insight;
