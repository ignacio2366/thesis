import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import styles from "../../components/styles";
import { useParams, Link } from "react-router-dom";
import * as List from "./MobileList";
import NewsModule from "../../service/newsApi";
import { FacebookIC, MessengerIc } from "../../image/image";
import { FacebookShareButton, FacebookMessengerShareButton } from "react-share";
import { Avatar } from "@mui/material";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import axios from "axios";
import { Logo } from "../../image/image";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const MobileStory = () => {
  const { cite } = useParams();
  const [suggestion, setSuggestion] = useState([]);
  const [news, setNews] = useState(null);
  const [comment, setComment] = useState([]);
  const [profile, setProfile] = useState([]);
  const [user, setUser] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [sentimentlbl, setSentimentlbl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  var Sentiment = require("sentiment");
  var sentimentAnalysis = new Sentiment();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      sessionStorage.access_token = codeResponse.access_token;
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  var date = new Date();
  var dateString = date.toLocaleString("en-us", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${sessionStorage.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => console.log(err));
  }, [user.access_token]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
    sessionStorage.clear();
  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const sentimentScore = sentimentAnalysis.analyze(userComment);

      if (sentimentScore.comparative >= 0) {
        setSentimentlbl(true);
      } else {
        setSentimentlbl(false);
      }

      try {
        const response = await NewsModule.getStoryNews(cite);
        const result = response;
        if (result.message !== null) {
          setNews(result);
        } else {
          setNews(null);
        }

        const suggest = await NewsModule.getNewsLeftPanel();
        setSuggestion(suggest);
        initComment();
      } catch (error) {
        console.log(error);
      }
    }, 400);

    return () => {
      clearInterval(intervalId);
    };
  });

  const initComment = async () => {
    try {
      const comments = await NewsModule.getComments(cite);
      const result = comments;
      setComment(result);

      if (result.message === null) {
        setComment(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function MaskedName(name) {
    const maskedName = `${name.substring(0, 4)}${"*".repeat(name.length - 4)}`;
    return maskedName;
  }
  function MaskEmails(emails) {
    const [localPart, domainPart] = emails.split("@");
    const maskedLocalPart = `${localPart.substring(0, 4)}${"*".repeat(
      localPart.length - 4
    )}`;
    const maskedEmail = `${maskedLocalPart}@${domainPart}`;
    return maskedEmail;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const sentiment = sentimentAnalysis.analyze(userComment);
    if (userComment !== "") {
      if (sentiment.comparative !== 0) {
        if (sentiment.comparative >= 0) {
          setSentimentlbl(true);
        } else {
          setSentimentlbl(false);
        }

        const data = new FormData();
        data.append("name", MaskedName(profile.name));
        data.append("email", MaskEmails(profile.email));
        data.append("comment", userComment);
        data.append("date", dateString);
        data.append("newsId", news[0].id);
        data.append("newsCite", cite);
        data.append("sentiment", sentimentlbl);
        data.append("img", profile.picture);

        try {
          const response = await NewsModule.addComment(data);
          if (response.message === "success") {
            alert("You thought submitted successfully");
            setUserComment("");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("Sentiment analysis cannot determine your thought");
      }
    } else {
      alert("No Comment Inserted");
    }
  };
  function handleToggle() {
    setIsOpen(!isOpen);
  }
  useEffect(() => {
    const addVisitor = async () => {
      try {
        await NewsModule.addVisitor(cite);
      } catch (error) {
        console.error(error);
      }
    };

    addVisitor();
  }, [cite]);

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
        <div>
          {news !== null ? (
            news.map((cite, index) => (
              <Main key={index}>
                <List.ContainerColumn>
                  <List.Headline>
                    <List.Title>{cite.headline}</List.Title>
                  </List.Headline>
                  <List.ContainerRow>
                    <List.Category>{cite.category}</List.Category>
                    <List.Date>{cite.date}</List.Date>
                  </List.ContainerRow>
                  <List.Image
                    src={cite.image.replace(
                      "newsnlp.online",
                      process.env.REACT_APP_PHP_URL
                    )}
                    alt="newsImage"
                    style={{ width: "100%", height: "auto" }}
                  />
                  <List.ContainerRow style={{marginTop:"10px"}}>
                    <List.Cite>
                      Author: <b>{cite.author}</b> <br />
                    </List.Cite>
                    <List.Cite>
                      Share to:
                    </List.Cite>
                    <FacebookShareButton url={cite.url} quote={cite.headline}>
                      <Icon src={FacebookIC} alt="facebook icon" />
                    </FacebookShareButton>
                    <FacebookMessengerShareButton
                      title={cite.headline}
                      url={cite.url}
                      appId="1233720077537218"
                    >
                      <Icon src={MessengerIc} alt="messenger icon" />
                    </FacebookMessengerShareButton>
                  </List.ContainerRow>
                  <List.Content
                    dangerouslySetInnerHTML={{ __html: `${cite.contenttag}` }}
                  />
                </List.ContainerColumn>
              </Main>
            ))
          ) : (
            <Main></Main>
          )}
          <GmailBox>
            {profile && profile.name ? (
              <>
                <CommentName>{profile.name}</CommentName>
                <CommentEmail>{profile.email}</CommentEmail>
                <CommentBtn style={{ float: "left" }} onClick={logOut}>
                  Log out
                </CommentBtn>
              </>
            ) : (
              <>
                <h5 style={{ fontFamily: `${styles.Regular}` }}>
                  Login to your Google
                </h5>
                <CommentBtn
                  style={{ width: "320px", float: "right" }}
                  onClick={() => login()}
                >
                  Sign in with Google 🚀
                </CommentBtn>
              </>
            )}
          </GmailBox>
          <CommentBox>
            {profile && (
              <Avatar
                src={profile.picture}
                alt="user"
                sx={{ width: 32, height: 32 }}
              />
            )}
            <section>
              <label style={{ fontFamily: `${styles.Regular}` }}>
                Write your thought
              </label>
              <br />
              <CommentInput
                placeholder="Write Comment"
                value={userComment}
                onChange={(event) => setUserComment(event.target.value)}
              />
            </section>
            <CommentBtn type="submit" onClick={handleSubmit}>
              Post
            </CommentBtn>
            <CommentSentiment
              style={{ marginLeft: "60px" }}
              postive={sentimentlbl}
            >
              {sentimentlbl ? "Positive" : "Negative"}
            </CommentSentiment>
          </CommentBox>
          {comment !== null ? (
            comment.map((comment, index) => (
              <CommentContainer key={index}>
                <Avatar
                  alt={comment.name}
                  src={comment.img}
                  sx={{ width: 32, height: 32 }}
                  style={{ marginTop: "-50px" }}
                />
                <CommentSection>
                  <CommentName>{comment.name}</CommentName>
                  <CommentEmail>{comment.email}</CommentEmail>
                  <CommentEmail>
                    <i>{comment.date}</i>
                  </CommentEmail>
                  <Comment>{comment.comment}</Comment>
                  <CommentSentiment
                    postive={comment.sentiment === "true" ? true : false}
                  >
                    {comment.sentiment === "true" ? "Positive" : "Negative"}
                  </CommentSentiment>
                </CommentSection>
              </CommentContainer>
            ))
          ) : (
            <CommentContainer> Be the First to Comment</CommentContainer>
          )}
        </div>
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
  width: auto;
  position: relative;
  height: auto;
  background-color: ${styles.White};
  padding: 29px;
  text-align: left;
  border-radius: 10px;
  margin: 20px 21px 0px 20px;
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

export const Icon = styled.img`
  height: 24px;
  width: auto;
  cursor: pointer;
`;

const GmailBox = styled.section`
  width: auto;
  height: 120px;
  background-color: ${styles.White};
  padding: 29px;
  border-radius: 10px;
  margin: 12px 21px 0px 20px;
`;

const CommentBox = styled.section`
  width: auto;
  position: relative;
  height: auto;
  background-color: ${styles.White};
  padding: 10px;
  text-align: left;
  border-radius: 10px;
  margin: 12px 21px 10px 20px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const CommentSection = styled.section`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 22px;
`;
export const CommentInput = styled.input`
  height: 50px;
  width: 100%;
  font-family: ${styles.Regular};
  font-size: 14px;
  padding-left: 8px;
  border: 0.5px solid ${styles.LightGray};
`;

export const CommentBtn = styled.button`
  width: 85px;
  height: 38px;
  background-color: ${styles.Dark};
  color: ${styles.White};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CommentName = styled.h6`
  font-family: ${styles.Medium};
  font-size: 1rem;
  margin: 0px;
`;

export const CommentEmail = styled.p`
  font-family: ${styles.Regular};
  color: ${styles.Gray};
  font-weight: 100px;
  font-size: 12px;
  letter-spacing: 1px;
  margin: 0px;
`;

export const CommentSentiment = styled.label`
  width: 140px;
  height: 36px;
  color: white;
  position: relative;
  background-color: ${(props) =>
    props.postive ? styles.Positive : styles.Negative};
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-family: ${styles.Regular};
`;

export const Comment = styled.p`
  font-family: ${styles.Regular};
  color: ${styles.Dark};
  font-weight: 100px;
  font-size: 12px;
  letter-spacing: 1px;
  margin: 10px;
  word-break: break-all;
  text-align: justify;
`;
const CommentContainer = styled.main`
  width: auto;
  height: auto;
  position: relative;
  background-color: ${styles.White};
  padding: 22px 23px;
  text-align: left;
  border-radius: 10px;
  margin: 25px 21px 25px 20px;

  display: flex;
  flexdirection: column;
  justify-content: flex-start;
  flex-wrap: flex;
  align-items: center;
`;
export default MobileStory;
