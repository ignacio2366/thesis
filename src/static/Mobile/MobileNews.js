import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import styles from "../../components/styles";
import { Link, useNavigate } from "react-router-dom";
import NewsModule from "../../service/newsApi";
import SearchIcon from "@mui/icons-material/Search";
import HelperUtils from "../../service/helper";
import MenuIcon from "@mui/icons-material/Menu";
import * as List from "./MobileList";
import { Logo } from "../../image/image";
import CloseIcon from "@mui/icons-material/Close";
const MobileNews = () => {
  const [search, setSearch] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [category, setCategory] = useState([]);
  const [news, setNews] = useState([]);
  const [width] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen(!isOpen);
  }
  useEffect(() => {
    initNews();
  }, [search, width,]);

  const initNews = async () => {
    try {
      const suggest = await NewsModule.getNewsLeftPanel();
      if (suggest[0].message === "success") {
        setSuggestion(suggest);
      } else {
        setSuggestion(null);
      }
      const response = await NewsModule.getLatestNews();
      setNews(response);
      const category = await NewsModule.getCategories();
      setCategory(category);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await NewsModule.searchNews(search);
      const result = response;
      if (result[0].message !== null) {
        setNews(result);
        console.log(result);
      } else {
        setNews(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const categoriesNews = async (category) => {
    try {
      const response = await NewsModule.categoriesNews(category);
      const result = response;
      if (result.message !== null) {
        setNews(result);
      } else {
        setNews(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function truncateString(sentence) {
    const words = sentence.split(" ");
    const truncated = words.slice(0, 4).join(" ");
    return truncated;
  }
  return (
    <>
      <Container>
        <SearchBar>
          <div>
            <ImgLogo src={Logo} /> <LogoNav>News.NLP</LogoNav>
          </div>

          <form onSubmit={handleSubmit}>
            <SearchInput
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Search Headline"
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
              <SearchIcon />
            </button>
          </form>
          <MenuIcon
            style={{
              height: "36px",
              width: "36px",
              color: `${styles.LightGray}`,
            }}
            onClick={handleToggle}
          />
        </SearchBar>
        <NavigationBar>
          <NavLink to="/mobile/news">Daily News</NavLink>
          <NavLink to="/mobile/source">Public News</NavLink>
        </NavigationBar>
        <Main>
          {news !== null ? (
            news.map((news, index) => (
              <List.Wrapper key={index}>
                <List.ContainerColumn>
                  <List.Headline>
                    <List.Title>{news.headline}</List.Title>
                  </List.Headline>
                  <List.ContainerRow>
                    <List.Category>{news.category}</List.Category>
                    <List.Date>{news.dateapproved}</List.Date>
                  </List.ContainerRow>
                  <List.Content>
                    {news.content &&
                      HelperUtils.shortHundredWords(news.content)}{" "}
                    ...{" "}
                  </List.Content>
                  <List.Image
                    src={news.image.replace(
                      "newsnlp.online",
                      process.env.REACT_APP_PHP_URL
                    )}
                    alt={news.headline}
                  />
                  <List.ContainerRow>
                    <List.Cite>
                      Author: <b>{news.author}</b> <br />
                    </List.Cite>{" "}
                    <br />
                    <List.Cite>
                      Sentiment:<b>{news.sentiment}</b>
                    </List.Cite>
                    <More to={`/mobile/story/${news.headline}`}>More</More>
                  </List.ContainerRow>
                </List.ContainerColumn>
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
        </Main>
        <MenuOverlay open={isOpen}>
          <MenuContent>
            <CloseIcon
              style={{ float: "right", color: `${styles.Cherry}` }}
              onClick={handleToggle}
            />
            <List.ContainerColumn>
              <div style={{ display: "flex" }}>
                <ImgLogo src={Logo} style={{ width: "38px", height: "38px" }} />
                <LogoNav style={{ fontSize: "1.125rem" }}>News.NLP</LogoNav>
              </div>
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
              <div>
                <AsideH1 style={{ textAlign: "center" }}>
                  Last News Published
                </AsideH1>

                {suggestion.map(
                  (recent, index) =>
                    recent.category && (
                      <div key={index}>
                        <Asidelbl>{recent.category} </Asidelbl>
                        <br />
                        <AsideLink to={`/story/${recent.headline}`}>
                          {recent.headline
                            ? truncateString(recent.headline)
                            : "No Latest News"}
                        </AsideLink>
                      </div>
                    )
                )}
              </div>
            </List.ContainerColumn>
          </MenuContent>
        </MenuOverlay>
      </Container>
    </>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-color: ${styles.WhiteSmoke};
  background-size: cover;
  display: flex;
  flex-direction: column;
  font-family: ${styles.Regular};

  min-width: 412px;
  max-width: 512px;
  margin: auto;
`;
const SearchBar = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${styles.White};
  border-radius: 10px;
  padding: 0px 11px;
  z-index: 10;
`;

const SearchInput = styled.input`
  height: 34px;
  width: 170px;
  padding-left: 10px;
  font-family: ${styles.Regular};
`;

const NavigationBar = styled.nav`
  width: 100%;
  height: 56px;
  background-color: ${styles.Cherry};
  z-index: 0;
  margin-top: -10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const NavLink = styled(Link)`
  font-size: 1rem;
  color: ${styles.White};
  margin: 10px 14px;
  text-decoration: none;
`;

const Main = styled.main`
  position: relative;
  min-height: 100px;
  height: auto;
  width: 95%;
  margin: 17px 10px;
`;
export const More = styled(Link)`
  height: 30px;
  width: 75px;
  float: right;
  background-color: ${styles.Dark};
  color: ${styles.White};
  text-decoration: none;
  font-size: 12px;
  display: flex;
  align-items: center;
  font-family: ${styles.Regular};
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 8px;
`;

const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
  transform: translateX(100%);

  ${({ open }) =>
    open &&
    css`
      opacity: 1;
      pointer-events: auto;
      transform: translateX(0);
    `}
`;

const MenuContent = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 350px;
  padding: 55px 25px;
  background-color: white;
  border-radius: 10px 0px 0px 10px;
`;
const LogoNav = styled.span`
  font-size: 1rem;
  font-family: ${styles.BoldItalic};
  line-height: 1.5;
  color: ${styles.LightGray};
  text-transform: uppercase;
  margin-top: 5px;
  margin-left: 8px;
`;
const ImgLogo = styled.img`
  height: 24px;
  width: 24px;
`;

export const AsideH1 = styled.h1`
  font-size: 1.25rem;
  font-family: ${styles.Bold};
  text-align: center;
  color: ${styles.Dark};
  letter-spacing: 1px;
  margin-top: 20px;
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
export const Visit = styled(Link)`
  color: ${styles.Cherry};
  text-decoration: none;
`;
export default MobileNews;
