import styled from "styled-components";
import styles from "../components/styles";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { imgCover, Logo } from "../image/image";

import TextField from '@mui/material/TextField';
const Login = () => {
    return (

        <Container>
            <Coverimg src={imgCover} alt="coverImage" />
            <Navigation />

            <LoginBox>
                <LoginPanel><LoginH1>News.AI</LoginH1>
                    <LoginH3>Under Graduate Thesis In Partial Fulfillment of</LoginH3> <br />
                    <LoginH3>A News Editor with Plagiarism Checker and Insight Analysis Natural Language Process API</LoginH3>
                    <LoginH3 >Exclusive Web Application For <br/> <b>Digital Marketing Philippines</b> </LoginH3>
                </LoginPanel>
                <LoginPanel style={{ zIndex: "100", marginLeft: "-58px", height: "487px", backgroundColor: `${styles.White}`, color: `${styles.Dark}` }}>
                    <LoginH1 style={{ color: `${styles.Cherry}` }}><img src={Logo} alt="Logo" style={{ height: "55px" }} />&nbsp;Login</LoginH1>
                    <br />
                    <form >
                        <label>Username</label>
                        <TextField id="standard-basic" label="" variant="outlined" style={{ width: "100%" }} color="error" required="hey" margin="normal" size="small" />
                        <label>Username</label>
                        <TextField id="standard-basic" label="*****" variant="outlined" type="password" style={{ width: "100%", height: "31px", backgroundColor: "F6F6F6" }} color="error" margin="normal" size="small" required="hey" />
                        <br /> <br />
                        <Loginbtn type="submit">Login</Loginbtn>
                    </form>
                </LoginPanel>
            </LoginBox>
            <Footer />
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    height: auto;
    width: 100%;
    background-color: rgba(236, 133, 158, 0.15);

`
const Coverimg = styled.img`
    height: 90vh;
    width: 300px;
    background-size: contain;
    float: right;
    z-index: 0;
    position: static;
`

const LoginBox = styled.div`
    height:auto;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    margin-top:80px;
    z-index:9999;
    color: white;
    text-align: left;

`
const LoginPanel = styled.div`
    height: 558px;
    width:408px;
    border-radius: 5px;
    align-self:flex-end;
    padding:5%;
    background-color:${styles.Cherry};
`
const LoginH1 = styled.h1`
    font-size: 2.125rem;
    font-family: ${styles.Bold};
    letter-spacing:1.5px;
`

const LoginH3 = styled.h3`
    font-size: 0.9rem;
    font-family: ${styles.Medium};
    text-align: left;
    letter-spacing: 0.5px;
    line-height: 1.2rem;
`

const Loginbtn = styled.button`

    padding: 7.6px 42.2px;
    background-color: ${styles.Cherry};
    float:right;
    border:none;
    color: ${styles.White};
    border-radius:5px;
`

export default Login