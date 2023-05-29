import styled from "styled-components";
import styles from "./styles";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <FooterContainer>
        <div style={{ paddingLeft: "122px" }}>
          <FooterH1>Powered By</FooterH1>
          <Footerlist>News API </Footerlist>
          <Footerlist>Google API</Footerlist>
          <Footerlist>Hostinger</Footerlist>
          <Footerlist>Plaraphy</Footerlist>
        </div>
        <div>
          <FooterH1>Other Links</FooterH1>
          <Links to="/">
            <Footerlist>Daily News</Footerlist>
          </Links>
          <Links to="/source">
            <Footerlist>Other Sources of News</Footerlist>
          </Links>
          <Links to="/about">
            <Footerlist>About Us</Footerlist>
          </Links>
          <Links to="/howtouse">
            <Footerlist>How to Use</Footerlist>
          </Links>
        </div>
        <div>
          <FooterH1>Exclusive Use For</FooterH1>
          <Footerlist>News </Footerlist>
          <Footerlist>Public News</Footerlist>
          <Footerlist>Philippines</Footerlist>
          <Footerlist> &nbsp;</Footerlist>
        </div>

        <div style={{ paddingRight: "122px" }}>
          <FooterH1>Developed By;</FooterH1>
          <Footerlist>Fugado</Footerlist>
          <Footerlist>Ignacio</Footerlist>
          <Footerlist>Salenga</Footerlist>
          <Footerlist> &nbsp;</Footerlist>
        </div>
      </FooterContainer>
    </>
  );
};

const FooterContainer = styled.div`
  position: relative;
  bottom: 0px;
  height: 308px;
  width: 100%;
  background-color: ${styles.Dark};
  color: ${styles.White};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px 5px 0px 0px;

`;
const FooterH1 = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: left;
`;
const Footerlist = styled.li`
  list-style: none;
  text-align: left;
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: 0.5px;
  padding: 1.1px 0px;
`;
const Links = styled(Link)`
  text-decoration: none;
  color: ${styles.White};
`;

export default Footer;
