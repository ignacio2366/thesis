import styled from "styled-components";
import styles from "../../components/styles";
import { Link } from "react-router-dom";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import TocOutlinedIcon from "@mui/icons-material/TocOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
const SideNav = () => {
  return (
    <>
      <LeftPanel>
        <LftHeader>
          <Stack direction="row" spacing={2}>
            <LftH1>Admin Panel</LftH1>
          </Stack>
        </LftHeader>
        <Box>
          <Stack direction="row" spacing={2}>
            <Avatar
              alt="Remy Sharp"
              src="https://images.gmanews.tv/webpics/2021/08/Representative_Joey_Salceda_2021_08_05_13_45_46.jpg"
              sx={{ width: 32, height: 32 }}
            />
            <Username>Mark Angelo F. Ignacio</Username>
          </Stack>
          <Role>News Writer</Role>

          <MenuList>
            <ul style={{ padding: "0px" }}>
              <MenuLink>
                <List>
                  <DashboardRoundedIcon />
                  &nbsp; Dashboard
                </List>
              </MenuLink>
              <MenuLink>
                <List to="/writer">
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
                <List to="/category">
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
                <List to="/admin">
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
  height: 500px;
  background-color: ${styles.White};
  border-radius: 10px;
  padding: 21px 20px;
  text-align: center;
`;

const Username = styled.h2`
  font-size: 1rem;
  font-family: ${styles.Regular};
  text-align: left;
`;
const Role = styled.h2`
  font-size: 1rem;
  font-family: ${styles.Medium};
  text-align: center;
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
