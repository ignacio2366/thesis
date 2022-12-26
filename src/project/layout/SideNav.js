import styled from "styled-components";
import styles from "../../components/styles";
import { Link } from "react-router-dom";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import TocOutlinedIcon from "@mui/icons-material/TocOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
const SideNav = () => {
  return (
    <>
      <LeftPanel>
        <LftHeader>
          <LftH1>Admin Panel</LftH1>
        </LftHeader>
        <Box>
          <Username>Mark Angelo F. Ignacio</Username>
          <Role>News Writer</Role>
          <MenuList>
            <ul style={{padding:"0px"}}>
              <MenuLink>
                <List>
                  <ArticleOutlinedIcon />
                  &nbsp; Write News
                </List>
              </MenuLink>
              <MenuLink>
                <List>
                  <TravelExploreOutlinedIcon />
                  &nbsp; Find Sources
                </List>
              </MenuLink>
              <MenuLink>
                <List to='/categories'>
                  <TocOutlinedIcon />
                  &nbsp; Categories
                </List>
              </MenuLink>
              <MenuLink>
                <List>
                  <NewspaperOutlinedIcon />
                  &nbsp; News Table
                </List>
              </MenuLink>
              <MenuLink>
                <List>
                  <Groups2OutlinedIcon />
                  &nbsp; Administrator
                </List>
              </MenuLink>
            </ul>
          </MenuList>
        </Box>
      </LeftPanel>
    </>
  );
};

const LeftPanel = styled.aside`
  width: 256px;
  height: auto;
  margin-left: 28px;
  margin-top: 88px;
  position: relative;
  z-index: 999;

`;

export const LftHeader = styled.div`
  width: 100%;
  height: 64px;
  background-color: ${styles.Cherry};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${styles.White};
  margin-bottom: 17px;
`;
export const LftH1 = styled.h1`
  font-size: 18px;
  font-family: ${styles.Bold};
  letter-spacing: 0px;
  text-transform: uppercase;
  font-weight: bold;
`;
export const Box = styled.div`
  width: 100%;
  height: 550px;
  background-color: ${styles.White};
  border-radius: 10px;
  padding: 21px 20px;
  text-align: left;
`;

const Username = styled.h2`
  font-size: 1.2rem;
  font-family: ${styles.Regular};
`;
const Role = styled.h2`
  font-size: 1rem;
  font-family: ${styles.Medium};
`;

const MenuList = styled.div`
  height: auto;
  width: 100%;
  margin-top: 50px;
  text-align: left;
`;
const List = styled(Link)`
  color: ${styles.LightGray};
  text-decoration: none;
  font-size: 1rem;
  font-family: ${styles.Medium};
`;

const MenuLink = styled.li`
  list-style-type: none;
  padding-bottom: 36px;
  
`;
export default SideNav;
