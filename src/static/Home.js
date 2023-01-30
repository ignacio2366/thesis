import { useState, useEffect } from "react";
import styled from "styled-components";
import styles from "../components/styles";
import * as List from "../components/NewsList";
import Navigation from "../components/Navigation";
import Button from "@mui/material/Button";
import { NewsData, RecentData } from "../api/mockNews";
import { Link,useNavigate } from "react-router-dom";

const News = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    getLogged();
  });

  const getLogged = () => {
    !localStorage.getItem("id")
      ? navigate("/login")
      : console.log(localStorage.getItem("id"));
  };
  return (
    <>
      <Navigation logged={localStorage.getItem("id") ? true : false} />
      <Container>
        <SearchBar>
          <h6>Social News</h6>
          <h5>
            <i>{Object.keys(NewsData).length} Total News</i>
          </h5>
          <SearchInput
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </SearchBar>
        <LeftPanel>
          <LftHeader>
            <LftH1>Just News!!</LftH1>
          </LftHeader>
          <Box>
            <AsideH1>New Published</AsideH1>
            {RecentData.map((recent) => (
              <>
                <Asidelbl>{recent.categories} </Asidelbl>
                <br />
                <AsideLink>{recent.title}</AsideLink> <br />
              </>
            ))}
          </Box>
        </LeftPanel>
        <Main>
          {NewsData.map((news) => (
            <List.Wrapper>
              <List.Headline>
                <List.Title>{news.title}</List.Title>
              </List.Headline>
              <List.Side>
                <List.Category>{news.categories}</List.Category> <br />
                <i style={{ fontSize: "14px" }}>Published: {news.date} </i>
              </List.Side>
              <List.Content>{news.story.slice(0, 650)} ...</List.Content>
              <List.Image src={news.image} alt="testing" />
              <List.Cite>
                Author: <b>{news.author}</b>
              </List.Cite>
              <List.Options>
                <Button
                  style={{ float: "right", backgroundColor: `${styles.Dark}` }}
                  size="large"
                  variant="contained"
                  color="info"
                >
                  More
                </Button>
              </List.Options>
            </List.Wrapper>
          ))}
          <button href="">next</button>
        </Main>
        <RightPanel>
          <Box>
            <AsideH1 style={{ textAlign: "center" }}>Category</AsideH1>
            {RecentData.map((recent) => (
              <>
                <ul>
                  <AsideList onClick={() => console.log(recent.categories)}>
                    {recent.categories}
                  </AsideList>
                  <br />
                </ul>
              </>
            ))}
            <Visit>Want More News? Click Here</Visit>
          </Box>
        </RightPanel>
      </Container>
    </>
  );
};

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  background-color: ${styles.WhiteSmoke};
  background-size: cover;
  display: flex;
  flex-direction: column;
`;

export const SearchBar = styled.div`
    height 64px;
    width:919px;
    border-radius: 5px;
    background-color: ${styles.White};
    margin: 88px auto 0px ;
    padding: 0px 29px;
    display:flex;
    justify-content: space-between;
    align-items: center;

`;
export const SearchInput = styled.input`
  height: 30px;
  width: 211px;
  background-color: #f2f2f2;
  border: 0px;
  color: ${styles.Dark};
  padding-left: 10px;
  border: 0 solid ${styles.LightGray};
`;
export const LeftPanel = styled.aside`
  width: 256px;
  height: auto;
  margin-left: 28px;
  margin-top: 88px;
  position: fixed;
  left: 0;
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
export const Box = styled.div`
  width: 100%;
  height: 550px;
  background-color: ${styles.White};
  border-radius: 10px;
  padding: 21px 41px;
  text-align: left;
`;
export const Visit = styled(Link)`
  color: ${styles.Cherry};
  text-decoration: none;
`;
export const LftH1 = styled.h1`
  font-size: 18px;
  font-family: ${styles.Bold};
  letter-spacing: 0px;
  text-transform: uppercase;
  font-weight: bold;
`;
export const Main = styled.main`
  position: relative;
  width: 919px;
  height: auto;
  margin: 17px auto;
  z-index: 1;
`;
export const RightPanel = styled.article`
  width: 256px;
  height: 100vh;
  margin-top: 88px;
  margin-right: 28px;
  position: fixed;
  right: 0;
  z-index: 999;
`;
export const AsideH1 = styled.h1`
  font-size: 1.25rem;
  font-family: ${styles.Bold};
  text-align: left;
  color: ${styles.Dark};
  letter-spacing: 1px; 
  padding-bottom: 23px;
`;
export const Asidelbl = styled.label`
  margin-top: 20px;
  font-size: 0.9rem;
  font-family: ${styles.Medium};
  color: ${styles.Cherry};
`;
export const AsideLink = styled.a`
  font-size: 1.2rem;
  text-decoration: none;
  font-family: ${styles.Medium};
  color: ${styles.LightGray};
  line-height: 0px;
  cursor: pointer;
`;

export const AsideList = styled.li`
  list-style: none;
  font-size: 1rem;
  font-family: ${styles.Medium};
  color: ${styles.LightGray};
  cursor: pointer;
  line-height: 12px;
`;

export default News;
