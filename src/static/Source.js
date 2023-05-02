import { useEffect, useState } from "react";
import styled from "styled-components";
import styles from "../components/styles";
import { Link, useNavigate } from "react-router-dom";
import * as List from "../components/NewsList";
import Navigation from "../components/Navigation";
import * as Wrapper from "../static/Home";
import { RecentData, SourcesData, Copyrights } from "../api/mockNews";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import $ from "jquery";
import HelperUtils from "../service/helper";

const Sources = () => {
  const [search, setSearch] = useState("");
  const [News, setNews] = useState([]);
  const [language, setLanguage] = useState("EN");
  const [width] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    initLatestNews();
    width <= 520 && navigate("/mobile/news");
  }, [language]);

  const initLatestNews = () => {
    setNews([SourcesData]);

    $.ajax({
      url: `https://api.newscatcherapi.com/v2/latest_headlines`,
      data: {
        countries: "PH",
        lang: language,
        page: 1,
      },
      method: "GET",
      dataType: "json",
      headers: {
        "x-api-key": "dr4SSsT166NqpieYC8lEy9mzuQP6m_KvOiWQ0dCnQhg",
      },
      success: (data) => {
        setNews([data]);
      },
      error: (err) => {
        console.log(err);
      },
    });

    setNews([SourcesData]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    $.ajax({
      url: `https://api.newscatcherapi.com/v2/search?`,
      data: {
        q: search,
        lang: language,
        countries: "PH",
        page: 1,
        not_sources: "newsbreak.com",
      },
      method: "GET",
      dataType: "json",
      headers: {
        "x-api-key": "dr4SSsT166NqpieYC8lEy9mzuQP6m_KvOiWQ0dCnQhg",
      },
      success: (data) => {
        if (data.status === "ok") {
          setNews([data]);
        } else {
          setNews(null);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  const setCategory = (category) => {
    $.ajax({
      url: `https://api.newscatcherapi.com/v2/latest_headlines`,
      data: {
        countries: "PH",
        lang: language,
        topic: category,
        not_sources: "newsbreak.com",

        page: 1,
      },
      method: "GET",
      dataType: "json",
      headers: {
        "x-api-key": "dr4SSsT166NqpieYC8lEy9mzuQP6m_KvOiWQ0dCnQhg",
      },
      success: (data) => {
        setNews([data]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <>
      <Navigation logged={localStorage.getItem("id") ? true : false} />
      <Container>
        <Wrapper.SearchBar>
          <h5 style={{ fontFamily: `${styles.Regular}` }}>Social News</h5>
          <form onSubmit={handleSubmit}>
            <Wrapper.SearchInput
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              name="search"
            />
            <button
              type="submit"
              style={{
                color: `${styles.Cherry}`,
                backgroundColor: "#ffffff",
                border: "none",
                height: "30px",
              }}
            >
              <SearchIcon /> Search
            </button>
          </form>
        </Wrapper.SearchBar>
        <Wrapper.LeftPanel>
          <Wrapper.LftHeader>
            <Wrapper.LftH1>Just News!!</Wrapper.LftH1>
          </Wrapper.LftHeader>
          <Box>
            <Wrapper.AsideH1>Copyrights</Wrapper.AsideH1>
            <ul>
              {Copyrights.map((search, index) => {
                return (
                  <Wrapper.AsideList key={index}>{search} </Wrapper.AsideList>
                );
              })}
              <Wrapper.AsideList>and 100 more </Wrapper.AsideList>
            </ul>
          </Box>
        </Wrapper.LeftPanel>
        <Wrapper.Main>
          {News !== null ? (
            News.map((data, index) => {
              return (
                <article key={index}>
                  {data &&
                    data?.articles.map(
                      (news, id) =>
                        news.rights &&
                        news.author &&
                        news.topic &&
                        news.summary && (
                          <List.Wrapper key={id}>
                            <List.Headline key={id}>
                              <List.Title>{news.title}</List.Title>
                            </List.Headline>
                            <List.Side>
                              <List.Category>
                                {news.topic.toUpperCase()}
                              </List.Category>
                              <br />
                              <List.Date>
                                Date: {HelperUtils.convertDatetoDateTme(news.published_date)}
                              </List.Date>
                            </List.Side>
                            <List.Content>
                              {HelperUtils.shortHundredWords(news.summary)} ...
                              view more
                            </List.Content>
                            <List.Image
                              src={news.media}
                              alt="The Images is Forbidden to Display. The server may have detected suspicious or malicious activity from the requester's IP address and is blocking access to prevent further damage. "
                            />
                            <List.Cite>
                              Author: <b>{news.author}</b>
                              &nbsp;&nbsp;&nbsp;&nbsp; Copyright: &nbsp;
                              <b>{news.rights.slice(0, 20)}</b>
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
                        )
                    )}
                </article>
              );
            })
          ) : (
            <>
              <List.Wrapper>
                <h4
                  style={{
                    color: `${styles.Gray}`,
                    textAlign: "center",
                    fontFamily: `${styles.Regular}`,
                  }}
                >
                  No News Sources Collected
                </h4>
              </List.Wrapper>
            </>
          )}
        </Wrapper.Main>
        <Wrapper.RightPanel>
          <Box>
            <Wrapper.AsideH1 style={{ textAlign: "center" }}>
              Category
            </Wrapper.AsideH1>
            <ul>
              {RecentData.map((recent, index) => (
                <Wrapper.AsideList
                  onClick={() => setCategory(recent.categories)}
                  key={index}
                >
                  {recent.categories.toUpperCase()}
                </Wrapper.AsideList>
              ))}
            </ul>
            <br />
            {language === "EN" && (
              <Wrapper.Visit onClick={(e) => setLanguage("TL")}>
                News in Filipino language, Click Here
              </Wrapper.Visit>
            )}
            {language === "TL" && (
              <Wrapper.Visit onClick={(e) => setLanguage("EN")}>
                News in English language, Click Here
              </Wrapper.Visit>
            )}
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
  min-height: 100vh;
  background-color: ${styles.WhiteSmoke};
  background-size: cover;
  display: flex;
  flex-direction: column;

  min-width: 1524px;
  margin: auto;
`;
export const Box = styled.div`
  width: 100%;
  height: 550px;
  background-color: ${styles.White};
  border-radius: 10px;
  padding: 21px 20px;
  text-align: left;
`;
export default Sources;
