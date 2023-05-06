import React from "react";
import styled from "styled-components";
import styles from "../components/styles";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Ignacio, Fugado, Salenga, Datascience } from "../image/image";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

function Cards() {
  return (
    <CardGroup style={{ maxWidth: "75%", maxHeight: "auto", margin: "auto", fontFamily:`${styles.Regular}` }}>
      <Card>
        <Card.Img variant="red" src={Ignacio} />
        <Card.Body>
          <Card.Title>Mark Angelo F. Ignacio</Card.Title>
          <Card.Text>Team Leader & Developer</Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img variant="top" src={Fugado} />
        <Card.Body>
          <Card.Title>Arvin B. Fugado</Card.Title>
          <Card.Text>Documentation</Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img variant="top" src={Salenga} />
        <Card.Body>
          <Card.Title>Mathew B. Salenga</Card.Title>
          <Card.Text>Statistician</Card.Text>
        </Card.Body>
      </Card>
    </CardGroup>
  );
}

const About = () => {
  return (
    <>
      <Container>
        <Navigation logged={localStorage.getItem("id") ? true : false} />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Header>
            <Headerh1>
              About <br />
              Technologies <br />
              and <span style={{ color: "#FD5353" }}>Developers</span>
            </Headerh1>
          </Header>
          <Header>
            <Aboutimg src={Datascience} alt="testing" />
          </Header>
        </div>
        <Developers>
          <h2 style={{ color: `${styles.White}` }} className="">
            The Developers
          </h2>

          <Cards />
        </Developers>
        <br />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            color: `${styles.White}`,
            marginTop: "42px",
            marginBottom: "5%",
          }}
        >
          <Technology
            style={{
              backgroundColor: `${styles.Dark}`,
              letterSpacing: "1.5px",
              display: "inline-block",
            }}
          >
            <Headerh1 style={{ fontSize: "24px", fontWeight: "bold" }}>
              Technologies Used:
            </Headerh1>

            <ul>
              <List>React Libary</List>
              <List>Node Package Manager</List>
              <List>- Sentiment Analysis</List>
              <List>- Bootstrap</List>
              <List>- Material UI </List>
              <List>- Axios API</List>
              <List>- AJAX </List>
              <List>- Grammarly</List>
              <List>PHP</List>
              <List>MySql</List>
              <List>Hostinger</List>
            </ul>
          </Technology>
          <Technology
            style={{
              backgroundColor: `${styles.Cherry}`,
              marginLeft: "-56px",
              letterSpacing: "1.5px",
              display: "inline-block",
            }}
          >
            <Headerh1 style={{ fontSize: "24px" }}>
              Application Programming <br /> Interface used For <br /> Internet
              of Things
            </Headerh1>
            <ul>
              <List>News Catcher API</List>
              <List style={{ fontSize: "14px" }}>
                - To get a news from the different sources of news that are
                accredited media news agency
              </List>
              <List>News API</List>
              <List style={{ fontSize: "14px" }}>
                - To get a news from the different sources of news that are
                accredited media news agency from different countries
              </List>
              <List>Plaraphy API</List>
              <List style={{ fontSize: "14px" }}>
                - A Natural Language for the sentiment Analysis and Plagiarism,
                Rewriter to provide an efficiency and unqiue written works
              </List>
            </ul>
          </Technology>
        </div>
        <Footer />
      </Container>
    </>
  );
};

export const Container = styled.div`
  position: relative;
  height: auto;
  width: 100%;
  background-color: rgba(236, 133, 158, 0.15);
  `;
export const Header = styled.header`
  display: flex;
  padding: 5% 2%;
  width: auto;
  height: auto;
  justify-content: center;
  flex-direction: row;
  border-radius: 10px;
`;
export const Headerh1 = styled.h1`
  font-size: 3rem;
  font-family: ${styles.black};
  text-align: left;
`;
export const Aboutimg = styled.img`
  border-radius: 34px;
  height: 450px;
  width: auto;
`;
export const Developers = styled.section`
  padding: 5%;
  height: auto;
  width: 100%;
  background-color: ${styles.Cherry};
`;
export const Technology = styled.section`
  display: flex;
  padding: 56px 65px;
  height: 450px;
  width: 553px;
  justify-content: center;
  flex-direction: row;
  border-radius: 10px;
`;
export const List = styled.li`
  text-align: left;
  list-style: none;
  font-size: 18px;
  font-family: ${styles.Medium};
`;

export default About;
