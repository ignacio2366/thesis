import { useEffect, useState } from "react";
import styled from "styled-components";
import styles from "../components/styles";
import * as List from "../components/NewsList";
import Navigation from "../components/Navigation";
import * as Wrapper from "../static/Home";
import { RecentData, SourcesData } from "../api/mockNews";
import Button from "@mui/material/Button";
import $ from 'jquery';

const Sources = () => {
  const [search, setSearch] = useState("");
  const [News, setNews] = useState([]);


  useEffect(() => {
    initLatestNews()
  }, [])

  const initLatestNews = () => {
    $.ajax({
      // url: `https://api.newscatcherapi.com/v2/latest_headlines?countries=PH`,
      method: "GET",
      dataType: 'json',
      headers: {
        'x-api-key': 'nrVXDRxII8n2F0JC7_-QRMtnKU3uWXtOqCEtLTOMuGo',
      },
      success: (data) => {
        console.log(data);
        //  setNews([data]);

      },
      error: (err) => {
        console.log(err);
      }
    })
    setNews([SourcesData])
  }

  const searchNews = (data) => {
  }

  return (
    <>
      <Navigation logged={localStorage.getItem("id") ? true : false} />
      <Container>
        <Wrapper.SearchBar>
          <h6>Social News</h6>
          <h5>

            <i>{Object.keys(News).length} Total Collected</i>

          </h5>
          <Wrapper.SearchInput
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </Wrapper.SearchBar>
        <Wrapper.LeftPanel>
          <Wrapper.LftHeader>
            <Wrapper.LftH1>Just News!!</Wrapper.LftH1>
          </Wrapper.LftHeader>
          <Box>
            <Wrapper.AsideH1>New Published</Wrapper.AsideH1>
            {RecentData.map((recent) => (
              <>
                <Wrapper.Asidelbl>{recent.categories} </Wrapper.Asidelbl>
                <br />
                <Wrapper.AsideLink>{recent.title}</Wrapper.AsideLink> <br />
              </>
            ))}
          </Box>
        </Wrapper.LeftPanel>
        <Wrapper.Main>
          {News.map((data) => {
            return (
              <>
                {data.articles.map((news, id) => (
                  news.rights &&
                  <List.Wrapper >
                    <List.Headline key={id}>
                      <List.Title>{news.title}</List.Title>
                    </List.Headline>
                    <List.Side>
                      <List.Category>{news.topic.toUpperCase()}</List.Category>
                      <br />

                      <i style={{ fontSize: "14px" }}>{news.published_date} </i>
                    </List.Side>
                    <List.Content>{news.summary}</List.Content>
                    <List.Image src={news.media} alt="testing" />
                    <List.Cite>
                      Author: <b>{news.author}</b> &nbsp;&nbsp;&nbsp;&nbsp;
                      Sources <b>{news.rights.slice(0, 20)}</b>
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
            )
          })}
        </Wrapper.Main>

        <Wrapper.RightPanel>
          <Box>
            <Wrapper.AsideH1 style={{ textAlign: "center" }}>
              Category
            </Wrapper.AsideH1>
            {RecentData.map((recent) => (
              <>
                <ul>
                  <Wrapper.AsideList
                    onClick={() => console.log(recent.categories)}
                  >
                    {recent.categories}
                  </Wrapper.AsideList>
                  <br />
                </ul>
              </>
            ))}
          </Box>
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
export default Sources;
