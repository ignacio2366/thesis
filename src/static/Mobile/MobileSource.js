import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import styles from "../../components/styles";
import { Logo } from "../../image/image";
import * as List from "../Mobile/MobileList";
import { Link, useNavigate } from "react-router-dom";
import { SourcesData, RecentData } from "../../api/mockNews";
import SearchIcon from "@mui/icons-material/Search";
import $ from "jquery";
import HelperUtils from "../../service/helper";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

const MobileSource = () => {
  const [search, setSearch] = useState("");
  const [News, setNews] = useState([]);
  const [language, setLanguage] = useState("EN");
  const [width] = useState(window.innerWidth);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    initLatestNews();
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

  function handleToggle() {
    setIsOpen(!isOpen);
  }

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
                            <List.ContainerRow>
                              <List.Category>
                                {news.topic.toUpperCase()}
                              </List.Category>
                              <List.Date>
                                Date:{" "}
                                {HelperUtils.convertDatetoDateTme(
                                  news.published_date
                                )}
                              </List.Date>
                            </List.ContainerRow>
                            <List.Content>
                              {HelperUtils.shortHundredWords(news.summary)} ...
                              view more
                            </List.Content>
                            <List.Image
                              src={news.media}
                              alt="The Images is Forbidden to Display. The server may have detected suspicious or malicious activity from the requester's IP address and is blocking access to prevent further damage. "
                            />
                            <List.ContainerRow>
                              <List.Cite>
                                Author: <b>{news.author}</b>
                                &nbsp;&nbsp;&nbsp;&nbsp; Copyright: &nbsp;
                                <b>{news.rights.slice(0, 20)}</b>
                              </List.Cite>

                              <Visit onClick={() => window.open(news.link)}>
                                Visit
                              </Visit>
                            </List.ContainerRow>
                          </List.Wrapper>
                        )
                    )}
                </article>
              );
            })
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

            <AsideH1 style={{ textAlign: "center" }}>Category</AsideH1>
            <ul>
              {RecentData.map((recent, index) => (
                <AsideList
                  onClick={() => setCategory(recent.categories)}
                  key={index}
                >
                  {recent.categories.toUpperCase()}
                </AsideList>
              ))}
            </ul>
            <br />
            {language === "EN" && (
              <Suggest onClick={(e) => setLanguage("TL")}>
                News in Filipino language, Click Here
              </Suggest>
            )}
            {language === "TL" && (
              <Suggest onClick={(e) => setLanguage("EN")}>
                News in English language, Click Here
              </Suggest>
            )}
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
export const Visit = styled.button`
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
  border: none;
`;

export const Suggest = styled(Link)`
  color: ${styles.Cherry};
  text-decoration: none;
`;
export default MobileSource;
