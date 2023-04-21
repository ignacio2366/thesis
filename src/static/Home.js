import { useState, useEffect } from "react";
import styled from "styled-components";
import styles from "../components/styles";
import * as List from "../components/NewsList";
import Navigation from "../components/Navigation";
import { Link, useNavigate } from "react-router-dom";
import NewsModule from "../service/newsApi";
import SearchIcon from "@mui/icons-material/Search";
import HelperUtils from "../service/helper";

const News = () => {
  const [search, setSearch] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [category, setCategory] = useState([]);
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    initNews();
  }, [search]);

  const initNews = async () => {
    const suggest = await NewsModule.getNewsLeftPanel();
    setSuggestion(JSON.parse(suggest));
    const category = await NewsModule.getCategories();
    setCategory(JSON.parse(category));
    const response = await NewsModule.getLatestNews();
    setNews(JSON.parse(response));
  };

  function truncateString(sentence) {
    const words = sentence.split(" ");
    const truncated = words.slice(0, 4).join(" ");
    return truncated;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await NewsModule.searchNews(search);
    const result = JSON.parse(response);
    if (result[0].message !== null) {
      setNews(result);
    } else {
      setNews(null);
    }
  };

  const categoriesNews = async (category) => {
    const response = await NewsModule.categoriesNews(category);
    const result = JSON.parse(response);
    if (result[0].message !== null) {
      setNews(result);
    } else {
      setNews(null);
    }
  };

  return (
    <>
      <Navigation logged={localStorage.getItem("id") ? true : false} />
      <Container>
        <SearchBar>
          <h5 style={{ fontFamily: `${styles.Regular}` }}>Social News</h5>

          <form onSubmit={handleSubmit}>
            <SearchInput
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
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
        </SearchBar>
        <LeftPanel>
          <LftHeader>
            <LftH1>Just News!!</LftH1>
          </LftHeader>
          <Box>
            {suggestion.map((recent, index) => (
              <div key={index}>
                <Asidelbl>{recent.category} </Asidelbl>
                <br />
                <AsideLink to={`/story/${recent.headline}`}>
                  {recent.headline
                    ? truncateString(recent.headline)
                    : "No Latest News"}
                </AsideLink>
              </div>
            ))}
          </Box>
        </LeftPanel>
        <Main>
          {news !== null ? (
            news.map((news, index) => (
              <List.Wrapper key={index}>
                <List.Headline>
                  <List.Title>{news.headline}</List.Title>
                </List.Headline>
                <List.Side>
                  <List.Category>{news.category}</List.Category> <br />
                  <List.Date>Date: {news.date}</List.Date>
                </List.Side>
                <List.Content>
                  {HelperUtils.shortHundredWords(news.content)} ...
                </List.Content>
                <List.Image
                  src={news.image.replace(
                    "C:/xampp/htdocs",
                    process.env.REACT_APP_PHP_URL
                  )}
                  alt={news.headline}
                />
                <List.Cite>
                  Author: <b>{news.author}</b>
                  <span style={{ marginLeft: "50px" }}>
                    Source: <b>{news.source}</b>
                  </span>
                  <span style={{ marginLeft: "50px" }}>
                    Sentiment: <b>{news.sentiment}</b>
                  </span>
                </List.Cite>
                <List.Options>
                  <More to={`/story/${news.headline}`}>More</More>
                </List.Options>
              </List.Wrapper>
            ))
          ) : (
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
          )}
          {/* <button href="">next</button> */}
        </Main>
        <RightPanel>
          <Box>
            <AsideH1 style={{ textAlign: "center" }}>Category</AsideH1>
            <ul style={{ margin: "0px", padding: "0px" }}>
              {category.map((recent, index) => (
                <AsideList
                  key={index}
                  onClick={() => categoriesNews(recent.name)}
                >
                  {recent.name.toUpperCase()}
                </AsideList>
              ))}
            </ul>

            <Visit to="/source">Want More News? Click Here</Visit>
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
  min-height: 100vh;
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
  min-height: 550px;
  height: auto;
  max-height: 570px;
  overflow-y: auto;
  background-color: ${styles.White};
  border-radius: 10px;
  padding: 21px 41px;
  text-align: left;
`;
export const Visit = styled(Link)`
  color: ${styles.Cherry};
  text-decoration: none;
`;

export const More = styled(Link)`
  height: 40px;
  width: 75px;
  float: right;
  background-color: ${styles.Dark};
  color: ${styles.White};
  text-decoration: none;
  font-size: 16px;
  display: flex;
  align-items: center;
  font-family: ${styles.Regular};
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
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
`;
export const AsideH1 = styled.h1`
  font-size: 1.25rem;
  font-family: ${styles.Bold};
  text-align: center;
  color: ${styles.Dark};
  letter-spacing: 1px;
  padding-bottom: 2px;
`;
export const Asidelbl = styled.label`
  margin-top: 12px;
  font-size: 0.9rem;
  font-family: ${styles.Medium};
  color: ${styles.Cherry};
`;
export const AsideLink = styled(Link)`
  font-size: 0.875rem;
  text-decoration: none;
  font-family: ${styles.Medium};
  color: ${styles.LightGray};
  line-height: 0px;
  cursor: pointer;
`;

export const AsideList = styled.li`
  display: inline-block;
  list-style: none;
  font-size: 0.9rem;
  font-family: ${styles.Medium};
  color: ${styles.LightGray};
  cursor: pointer;
  padding: 5px 5px;
  text-align: left;
`;

export default News;
