import { useState, useEffect } from "react";
import styled from "styled-components";
import styles from "../components/styles";
import { useParams, Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import NewsModule from "../service/newsApi";
import * as News from "../components/NewsList";
import { FacebookIC } from "../image/image";
import { ShareButton } from "react-facebook-sdk";
import { Avatar } from "@mui/material";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import axios from "axios";

function Story() {
  const { cite } = useParams();
  const [suggestion, setSuggestion] = useState([]);
  const [news, setNews] = useState([]);
  const [comment, setComment] = useState([]);
  const [profile, setProfile] = useState([]);
  const [user, setUser] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [sentimentlbl, setSentimentlbl] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      sessionStorage.access_token = codeResponse.access_token;
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  var sentimentAnalysis = require("sentiment-analysis");
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
      if (sentimentAnalysis(userComment) >= 0) {
        setSentimentlbl(true);
      } else {
        setSentimentlbl(false);
      }
      const response = await NewsModule.getStoryNews(cite);
      setNews(JSON.parse(response));

      const suggest = await NewsModule.getNewsLeftPanel();
      setSuggestion(JSON.parse(suggest));
      initComment();
    }, 400);

    return () => {
      clearInterval(intervalId);
    };
  });

  const initComment = async () => {
    const comments = await NewsModule.getComments(cite);
    const result = JSON.parse(comments);
    setComment(result);

    if (result.message === null) {
      setComment(null);
    }
  };

  function truncateString(sentence) {
    const words = sentence.split(" ");
    const truncated = words.slice(0, 4).join(" ");
    return truncated;
  }
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

    console.log(sentimentAnalysis(userComment));

    const sentiment = sentimentAnalysis(userComment);
    if (userComment !== "") {
      if (sentiment !== 0) {
        if (sentiment >= 0) {
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

        const response = await NewsModule.addComment(data);
        if (response[0].message === "success") {
          alert("You thought submitted successfully");
          setUserComment("");
        }
      } else {
        alert("Sentiment analysis cannot determine your thought");
      }
    } else {
      alert("No Comment Inserted");
    }
  };

  useEffect(() => {
    const addVisitor = async () => {
      try {
        const response = await NewsModule.addVisitor(cite);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
  
    addVisitor();
  }, [cite]);
  return (
    <>
      <Navigation
        logged={localStorage.getItem("id") ? true : false}
      ></Navigation>
      <Container>
        <LeftPanel>
          <LftHeader>
            <LftH1>Just News !</LftH1>
          </LftHeader>
          <Box>
            <AsideH1>New Published</AsideH1>
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

        <div>
          {news.map((cite, index) => (
            <Main key={index}>
              <News.Headline>
                <News.Title>{cite.headline}</News.Title>
              </News.Headline>
              <News.Side>
                <News.Category>{cite.category}</News.Category>
                <News.Date>{cite.date}</News.Date>
              </News.Side>
              <Image
                src={cite.image.replace(
                  "C:/xampp/htdocs",
                  process.env.REACT_APP_PHP_URL
                )}
                alt="newsImage"
              />
              <News.Under>
                <Cite>
                  Author: &nbsp; <b>{cite.author}</b>
                </Cite>
                <News.List>
                  Copyright: <b>PDM News</b>
                </News.List>

                <News.List>
                  <News.Links>Share to</News.Links>
                  <News.Links>
                    <ShareButton href="https://ignacio2366.github.io/PersonalWebsite/About/About.html?fbclid=IwAR0Ka2OX1XtN3JdfbJIk6g0owqecxdkrXOuuKP-MrpG4M5Vf_22fFWjlcXA">
                      <Icon src={FacebookIC} alt="facebook icon" />
                    </ShareButton>
                  </News.Links>
                </News.List>
              </News.Under>

              <Content
                dangerouslySetInnerHTML={{ __html: `${cite.contenttag}` }}
              />
            </Main>
          ))}
          <GmailBox>
            <CommentSection>
              {profile && profile.name ? (
                <>
                  <CommentName>{profile.name}</CommentName>
                  <CommentEmail>{profile.email}</CommentEmail>
                  <CommentBtn style={{ float: "right" }} onClick={logOut}>
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
            </CommentSection>
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
            <CommentSentiment postive={sentimentlbl}>
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
                </CommentSection>
                <CommentSentiment
                  style={{ position: "absolute", top: "17px", right: "30px" }}
                  postive={comment.sentiment === "true" ? true : false}
                >
                  {comment.sentiment === "true" ? "Positive" : "Negative"}
                </CommentSentiment>
              </CommentContainer>
            ))
          ) : (
            <CommentContainer> Be the First to Comment</CommentContainer>
          )}
        </div>
        <RightPanel>
          <Box></Box>
        </RightPanel>
      </Container>
    </>
  );
}
const Container = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  min-height:100vh;
  background-color: ${styles.WhiteSmoke};
  background-size: cover;
  flex-direction: row;
  display: flex;
  justify-content: center;
`;

const LeftPanel = styled.aside`
  width: 256px;
  height: 550px;
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

export const Icon = styled.img`
  height: 28px;
  width: auto;
  cursor: pointer;
`;

const Main = styled.main`
  width: 919px;
  position: relative;
  height: auto;
  background-color: ${styles.White};
  padding: 29px;
  text-align: left;
  border-radius: 10px;
  margin: 88px 21px 0px 20px;
`;

export const RightPanel = styled.article`
  position: relative;
  width: 256px;
  height: 631px;
  margin-top: 88px;
  margin-right: 28px;
  right: 0;
`;

export const Box = styled.div`
  width: 100%;
  min-height: 550px;
  height: auto;
  overflow-y: auto;
  background-color: ${styles.White};
  border-radius: 10px;
  padding: 21px 41px;
  text-align: left;
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
  margin-top: 20px;
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

// News List
export const Image = styled.img`
  width: 100%;
  height: auto;
  margin-top: 16px;
  margin: auto;
  border-radius: 4px;
  background-color: ${styles.Dark};
`;

export const Content = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  margin-top: 48px;
  text-align: justify;
  word-break: break-word;
  overflow: auto;
  padding: 10px;
  letter-spacing: 0.1px;
  color: ${styles.Gray};
  font-family: ${styles.Regular};
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const CommentContainer = styled.main`
  width: 919px;
  height: auto;
  position: relative;
  background-color: ${styles.White};
  padding: 22px 23px;
  text-align: left;
  border-radius: 10px;
  margin: 25px 21px 25px 20px;

  display: flex;
  flexdirection: row;
  justify-content: flex-start;
  align-items: center;
`;
const GmailBox = styled.section`
  height: 100px;
  width: 450px;
  background-color: ${styles.White};
  margin: 25px 21px 25px 20px;
`;
const CommentBox = styled.section`
  width: 919px;
  position: relative;
  height: 72px;
  background-color: ${styles.White};
  padding: 29px;
  text-align: left;
  border-radius: 10px;
  margin: 35px 21px 10px 20px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CommentSection = styled.section`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 22px;
  margin-left: 11px;
`;
export const CommentInput = styled.input`
  height: 32px;
  width: 504px;
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
  width: 110px;
  height: 38px;
  color: white;
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
  word-break: break-word;
  text-align: justify;
`;
export const Cite = styled.h6`
  position: relative;
  color: ${styles.Dark};
  font-family: ${styles.Regular};
  width: auto;
  display: flex;
  flex-direction: row;
  margin-left: 15px;
`;

export default Story;
