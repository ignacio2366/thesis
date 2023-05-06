import styled from "styled-components";
import styles from "../../components/styles";
import { Link } from "react-router-dom";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import TocOutlinedIcon from "@mui/icons-material/TocOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import Avatar from "@mui/material/Avatar";
import Password from "./PasswordModal";

const SideNav = () => {
  return (
    <>
      <LeftPanel>
        <LftHeader>
          <LftH1>
            {localStorage.getItem("type") === "admin"
              ? " Admin Dashboard"
              : " Writer Dashboard"}
          </LftH1>
        </LftHeader>
        <Box>
          <ContainerRow>
            <Avatar
              alt="Remy Sharp"
              src={localStorage.getItem("image")}
              sx={{ width: 32, height: 32 }}
            />
            <ContainerCol>
              <Username>{localStorage.getItem("name")}</Username>
              <Role>
                {localStorage.getItem("type") === "admin"
                  ? "Editor-in-Chief"
                  : " News Writer"}
              </Role>
              {localStorage.getItem("name") !== "Administrator" && <Password />}
            </ContainerCol>
          </ContainerRow>

          <MenuList>
            {localStorage.getItem("type") === "admin" && (
              <>
                <ul style={{ padding: "0px" }}>
                  <MenuLink>
                    <List to="/insight">
                      <DashboardRoundedIcon />
                      &nbsp; Insight Analysis
                    </List>
                  </MenuLink>

                  <MenuLink>
                    <List to="/category">
                      <TocOutlinedIcon />
                      &nbsp; Categories
                    </List>
                  </MenuLink>
                  <MenuLink>
                    <List to="/publish">
                      <NewspaperOutlinedIcon />
                      &nbsp; For Publication
                    </List>
                  </MenuLink>

                  <MenuLink>
                    <List to="/admin">
                      <Groups2OutlinedIcon />
                      &nbsp; Administrator
                    </List>
                  </MenuLink>
                  <MenuLink>
                    <List to="/writer">
                      <ArticleOutlinedIcon />
                      &nbsp; Write News
                    </List>
                  </MenuLink>
                  <MenuLink>
                    <List to="/search">
                      <TravelExploreOutlinedIcon />
                      &nbsp; Find Sources
                    </List>
                  </MenuLink>
                  <MenuLink>
                    <List to="/draft">
                      <SaveAsOutlinedIcon />
                      &nbsp; Drafted News
                    </List>
                  </MenuLink>
                  <MenuLink>
                  <List to="/publishUser">
                    <NewspaperOutlinedIcon />
                    &nbsp; Published Table
                  </List>
                </MenuLink>
                </ul>
              </>
            )}

            {localStorage.getItem("type") === "user" && (
              <>
                <MenuLink>
                  <List to="/writer">
                    <ArticleOutlinedIcon />
                    &nbsp; Write News
                  </List>
                </MenuLink>
                <MenuLink>
                  <List to="/search">
                    <TravelExploreOutlinedIcon />
                    &nbsp; Find Sources
                  </List>
                </MenuLink>
                <MenuLink>
                  <List to="/draft">
                    <SaveAsOutlinedIcon />
                    &nbsp; Drafted News
                  </List>
                </MenuLink>
                <MenuLink>
                  <List to="/publishUser">
                    <NewspaperOutlinedIcon />
                    &nbsp; Published Table
                  </List>
                </MenuLink>
              </>
            )}
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
  text-align: left;
`;

const MenuList = styled.div`
  height: auto;
  width: 100%;
  margin-top: 30px;
  text-align: left;
  padding-left: 10px;
`;
const List = styled(Link)`
  color: ${styles.LightGray};
  text-decoration: none;
  font-size: 1rem;
  font-family: ${styles.Medium};
`;

const MenuLink = styled.li`
  list-style-type: none;
  padding-bottom: 20px;
`;

const ContainerCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;
const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;

export default SideNav;
