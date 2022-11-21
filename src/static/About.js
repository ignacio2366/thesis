import React from "react";
import styled from "styled-components";
import styles from "../components/styles";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { AboutImage } from "../image/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

function Cards() {
    return (
        <CardGroup style={{ maxWidth: "80%", margin: "auto" }}>
            <Card >
                <Card.Img variant="top" src={AboutImage} />
                <Card.Body>
                    <Card.Title>Mark Angelo F. Ignacio</Card.Title>
                    <Card.Text >
                        This is a wider card with supporting text below as a natural lead-in
                        to additional content. This content is a little bit longer.
                    </Card.Text>
                </Card.Body>

            </Card>
            <Card>
                <Card.Img variant="top" src={AboutImage} />
                <Card.Body>
                    <Card.Title>Arvin B. Fugado</Card.Title>
                    <Card.Text>
                        This card has supporting text below as a natural lead-in to
                        additional content.
                    </Card.Text>
                </Card.Body>

            </Card>
            <Card>
                <Card.Img variant="top" src={AboutImage} />
                <Card.Body>
                    <Card.Title>Mathew B. Salenga</Card.Title>
                    <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in
                        to additional content. This card has even longer content than the
                        first to show that equal height action.
                    </Card.Text>
                </Card.Body>

            </Card>
        </CardGroup>
    );
}



const About = () => {

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
                <Footer />

            </Container>

        </>
    )
}

const Container = styled.div`
    position: relative;
    height: 100vh;
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

export default About;