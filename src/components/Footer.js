import styled from "styled-components";
import styles from "./styles";


const Footer = () => {
    return (
        <>
            <FooterContainer>
                <div style={{ paddingLeft: "122px" }}><FooterH1>Powered By;</FooterH1>
                    <Footerlist>News API </Footerlist>
                    <Footerlist>Google API</Footerlist>
                    <Footerlist>Hostinger</Footerlist>
                    <Footerlist>Plaraphy</Footerlist>
                </div>
                <div></div>
                <div><FooterH1>Exclusive Use For</FooterH1>
                    <Footerlist>Digital </Footerlist>
                    <Footerlist>Marketing</Footerlist>
                    <Footerlist>Philippines</Footerlist></div>

                <div style={{ paddingRight: "122px" }}><FooterH1>Powered By;</FooterH1>
                    <Footerlist>Fugado</Footerlist>
                    <Footerlist>Ignacio</Footerlist>
                    <Footerlist>Salenga</Footerlist>

                </div>

            </FooterContainer>
        </>
    )

}

const FooterContainer = styled.div`
    position: relative;
    bottom: 0px;
    height: 308px;
    width:100%;
    background-color:${styles.Dark};
    color: ${styles.White};
    display:flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px 5px 0px 0px;
`
const FooterH1 = styled.h1`
    font-size: 24px;
    font-weight: bold;
`
const Footerlist = styled.li`
    list-style: none;
    text-align: left;
    font-weight: 500;
    font-size:16px;
    letter-spacing:1.5;
    padding: 1.1px 0px;

`


export default Footer;