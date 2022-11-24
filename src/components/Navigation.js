import styled from "styled-components";
import styles from "./styles";
import { Logo } from "./../image/image"
import { Link } from "react-router-dom";
const Navigation = ({logged}) => {

    return (
        <>
            <NavContainer >
                <div style={{ display: "flex" }}>
                    <ImgLogo src={Logo} /> <br></br> <LogoNav>News.ai</LogoNav>
                </div>
                <div>
                    <Navlist><NavLink>Daily News</NavLink></Navlist>
                    <Navlist><NavLink>Sources</NavLink></Navlist>
                    <Navlist><NavLink>About Us</NavLink></Navlist>
                    <Navlist><NavLink>How to Use</NavLink></Navlist>

                </div>
                <div>
                    <NavLogin>{logged? "Logout": "Login"}</NavLogin>
                </div>
            </NavContainer>
        </>
    )
}

const NavContainer = styled.div`

    margin: 0;
    padding:  0px 28px 0px 28px;
    box-sizing: border-box;
    display: flex;
    height: 56px;
    width: 100%;
    flex-direction: row;
   justify-content: space-between;
   align-items: center;
    background-color: ${styles.White}

`
const LogoNav = styled.span`
    font-size: 18px;
    font-family:${styles.BoldItalic};
    line-height: 1.5;
    color: ${styles.LightGray};
    text-transform: uppercase;
    margin-top:5px;
    margin-left:8px;

`
const ImgLogo = styled.img`
    height: 38px;
    width: 38px;


`

const Navlist = styled.li`
    display: inline-block; 
    padding: 24px;

`
const NavLink = styled(Link)`
    text-decoration: none;
    font-family:${styles.Regular};
    color: ${styles.LightGray};
    line-height:58;
`
const NavLogin = styled(Link)`
    text-decoration: none;
    font-family:${styles.Regular};
    color: ${styles.White};
    font-size: 14px;
    padding: 8px 15px;
    background-color: ${styles.Cherry};
    border-radius:5px;
`

export default Navigation;