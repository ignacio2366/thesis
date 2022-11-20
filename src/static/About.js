import React from "react";
import styled from "styled-components";
import styles from "../components/styles";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const About = () => {

    return (
        <>
            <Container>
                <Navigation />
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

export default About;