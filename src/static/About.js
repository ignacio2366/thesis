import React from "react";
import styled from "styled-components";
import styles from "../components/styles";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { AboutImage, Ignacio, Fugado, Salenga } from "../image/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

function Cards() {
    return (
        <CardGroup style={{ maxWidth: "75%", maxHeight: "auto", margin: "auto" }}>
            <Card >
                <Card.Img variant="red" src={Ignacio} />
                <Card.Body>
                    <Card.Title>Mark Angelo F. Ignacio</Card.Title>
                    <Card.Text >
                        Team Leader & Developer
                    </Card.Text>
                </Card.Body>

            </Card>
            <Card>
                <Card.Img variant="top" src={Fugado} />
                <Card.Body>
                    <Card.Title>Arvin B. Fugado</Card.Title>
                    <Card.Text>
                        Documentation & Developer
                    </Card.Text>
                </Card.Body>

            </Card>
            <Card>
                <Card.Img variant="top" src={Salenga} />
                <Card.Body>
                    <Card.Title>Mathew B. Salenga</Card.Title>
                    <Card.Text>
                        Statistic & Developer
                    </Card.Text>
                </Card.Body>

            </Card>
        </CardGroup>
    );
}



const About = () => {
    localStorage.setItem("lastname", "Mark");

    return (
        <>
            <Navigation />
            <Container>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Header>
                        <Headerh1>
                            About <br />
                            Technologies <br />
                            and <span style={{ color: '#FD5353' }}>Developers</span>
                        </Headerh1>
                    </Header>
                    <Header>
                        <Aboutimg src={AboutImage} alt="testing" />
                    </Header>
                </div>
                <Developers>
                    <h2 style={{ color: `${styles.White}` }} className="">The Developers</h2>

                    <Cards />
                </Developers>
                <div style={{ display: "flex", justifyContent: "center", color: `${styles.White}`, marginTop: "42px", marginBottom:"5%" }}>

                    <Technology style={{
                        backgroundColor: `${styles.Dark}`, letterSpacing: "1.5px",
                    }}>
                        <Headerh1 style={{ fontSize: "24px", fontWeight:"bold"}}>Technologies Used:</Headerh1>
                    </Technology>
                    <Technology style={{
                        backgroundColor: `${styles.Cherry}`, marginLeft: "-56px", letterSpacing: "1.5px"
                    }}>
                        <Headerh1 style={{ fontSize: "24px" }}>Application Programming <br /> Interface used For <br /> Internet of Things </Headerh1>
                    </Technology>
                </div>
                <Footer />

            </Container>

        </>
    )
}

const Container = styled.div`
    position: relative;
    height: auto;
    width: 100%;
    background-color: rgba(236, 133, 158, 0.15);

`
export const Header = styled.header`
    display: flex;
    padding: 5% 2%;
    width: auto;
    height:auto;
    justify-content: center;
    flex-direction: row;
    border-radius:10px;
`
export const Headerh1 = styled.h1`
    font-size: 48px;
    font-family:${styles.black};
    text-align: left;
`
export const Aboutimg = styled.img`
    border-radius:34px;
    height:358px;
    width:auto;
`
export const Developers = styled.section`
    padding:5%;
    height:auto;
    width:100%;
    background-color:${styles.Cherry};


`
export const Technology = styled.section`
display: flex;
padding: 56px 65px;
height: 450px;
width: 553px;
justify-content: center;
flex-direction: row;
border-radius:10px;
`

export default About;