import styled from "styled-components";
import styles from "./../components/styles";
import Navigation from "../components/Navigation";

const News = () => {
    return (
        <Container>
            <Navigation />
            <h1>SAd</h1>
        </Container>
    )


}


const Container = styled.div`
    position: relative;
    height: 100vh;
    width: 100%;
    background-color:${styles.WhiteSmoke};

`
export default News