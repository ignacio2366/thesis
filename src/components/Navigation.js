import styled from "styled-components";
import styles from "./styles";
import { Logo } from "./../image/image";
import { Link } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
const Navigation = ({ logged }) => {
  const initLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <NavContainer>
      <div style={{ display: "flex" }}>
        <ImgLogo src={Logo} /> <br></br> <LogoNav>News.NLP</LogoNav>
      </div>
      <div>
        <Navlist>
          <NavLink to="/">Daily News</NavLink>
        </Navlist>
        <Navlist>
          <NavLink to="/source">Public News</NavLink>
        </Navlist>
        <Navlist>
          <NavLink to="/about">About Us</NavLink>
        </Navlist>
        <Navlist>
          <NavLink to="/howtouse">How to Use</NavLink>
        </Navlist>
      </div>
      <div>
        {!logged ? (
          <NavLogin to="/login">Login</NavLogin>
        ) : (
          <>
            <Navlist>
              {localStorage.getItem("type") === "admin" ? (
                <NavLink to="/admin">
                  <GridViewIcon />
                </NavLink>
              ) : (
                <NavLink to="/writer">
                  <GridViewIcon />
                </NavLink>
              )}
            </Navlist>
            <Logout onClick={() => initLogout()}> Logout</Logout>
          </>
        )}
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  position: absolute;
  margin: 0;
  padding: 0px 28px 0px 28px;
  box-sizing: border-box;
  display: flex;
  height: 56px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
  background-color: ${styles.White};
`;
const LogoNav = styled.span`
  font-size: 1.125rem;
  font-family: ${styles.BoldItalic};
  line-height: 1.5;
  color: ${styles.LightGray};
  text-transform: uppercase;
  margin-top: 5px;
  margin-left: 8px;
`;
const ImgLogo = styled.img`
  height: 38px;
  width: 38px;
`;

const Navlist = styled.li`
  display: inline;
  padding: 0px 24px;
  height: 100px;
  margin: 0px;
`;
const NavLink = styled(Link)`
  text-decoration: none;
  font-family: ${styles.Regular};
  color: ${styles.LightGray};
  line-height: 0;
`;
const NavLogin = styled(Link)`
  text-decoration: none;
  font-family: ${styles.Regular};
  color: ${styles.White};
  font-size: 0.875rem;
  padding: 8px 15px;
  background-color: ${styles.Cherry};
  border-radius: 5px;
`;
const Logout = styled.button`
  text-decoration: none;
  font-family: ${styles.Regular};
  color: ${styles.White};
  font-size: 0.875rem;
  padding: 8px 15px;
  background-color: ${styles.Cherry};
  border-radius: 5px;
  border: none;
`;
export default Navigation;
