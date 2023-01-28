import { useState } from "react";
import styled from "styled-components";
import styles from "../components/styles";
import * as List from "../components/NewsList";
import Navigation from "../components/Navigation";
import * as Wrapper from "../static/Home";
import { NewsData, SourcesData } from "../api/mockNews";
import Button from "@mui/material/Button";
import SideNav from "./layout/SideNav";
import Save from "./layout/Save";
const Sources = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <Navigation logged={localStorage.getItem("id") ? true : false} />
      <Container>
        <Wrapper.SearchBar>
          <h6>Social News</h6>{" "}
          <h5>
            <i>{Object.keys(NewsData).length} Total News</i>
          </h5>
          <Wrapper.SearchInput
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </Wrapper.SearchBar>
        <LeftPanel>
          <SideNav />
        </LeftPanel>
        <Wrapper.Main>
          {SourcesData.map((data) => {
            return (
              <>
                {data.articles.map((news) => (
                  <List.Wrapper>
                    <Save />
                    <List.Headline>
                      <List.Title>{news.title}</List.Title>
                    </List.Headline>
                    <List.Side>
                      <List.Category>{news.topic.toUpperCase()}</List.Category>
                      <i style={{ fontSize: "14px" }}>{news.published_date} </i>
                    </List.Side>
                    <List.Content>{news.summary}</List.Content>
                    <List.Image src={news.media} alt="testing" />
                    <List.Cite>
                      Author: <b>{news.author}</b> &nbsp;&nbsp;&nbsp;&nbsp;
                      Source <b>{news.rights}</b>
                    </List.Cite>

                    <List.Options>
                      <Button
                        style={{
                          float: "right",
                          backgroundColor: `${styles.Gray}`,
                        }}
                        size="large"
                        variant="contained"
                        color="info"
                        onClick={() => window.open(news.link)}
                      >
                        Visit
                      </Button>
                    </List.Options>
                  </List.Wrapper>
                ))}
              </>
            );
          })}
        </Wrapper.Main>

        <Wrapper.RightPanel>
          <Box></Box>
        </Wrapper.RightPanel>
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
export const Box = styled.div`
  width: 100%;
  height: 550px;
  background-color: ${styles.White};
  border-radius: 10px;
  padding: 21px 41px;
  text-align: left;
`;

export const LeftPanel = styled.aside`
  width: 256px;
  height: auto;
  position: fixed;
  left: 0;
  z-index: 999;
`;
export default Sources;
