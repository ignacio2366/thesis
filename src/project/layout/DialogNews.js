import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import * as News from "../..//components/NewsList";
import * as M from "../layout/WriterModal";
import styled, { css } from "styled-components";
import styles from "../../components/styles";
import PublishedModule from "../../service/publishedApi";
import HelperUtils from "../../service/helper";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

export default function DialogNews({
  id,
  headline,
  content,
  sentiment,
  sentimentrate,
  plagiarizerate,
  categories,
  date,
  status,
  author,
  oversentiment,
  source,
  url,
  admin,
  citename,
  image,
}) {
  const [open, setOpen] = useState(false);
  const [remark, setRemark] = useState("");
  const [actions, setActions] = useState("");
  var dateString = HelperUtils.getDateTime();
  const [sources, setSource] = useState([]);
  const [cite, setCite] = useState("");

  useEffect(() => {
    setCite(citename);
    getDraftSources(cite);
  }, [cite, citename]);
  const handleToggle = async () => {
    setOpen(!open);
  };
  const getDraftSources = async (cite) => {
    try {
      var response = await PublishedModule.getDraftSources(cite);
      var result = response;
      if (result.message !== null) {
        setSource(result);
      } else {
        setSource(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await PublishedModule.updatePublished(
        id,
        remark,
        actions,
        dateString,
        localStorage.getItem("name")
      );
      const result = await response;
      if (result[0].message === "success") {
        setRemark("");
        handleToggle(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button onClick={handleToggle}>Review</Button>
      <MenuOverlay open={open}>
        <CloseIcon
          style={{
            float: "right",
            color: `${styles.White}`,
            height: "50px",
            width: "50px",
            position: "absolute",
            right: "1%",
            top: "1%",
          }}
          onClick={handleToggle}
        />
        <MenuContent>
          <Main>
            <div
              id="scroll-dialog-title"
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                backgroundColor: `${styles.WhiteSmoke}`,
                fontSize: "14px",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "5px 40px",
              }}
            >
              <i>News No: {id}</i>
              <span>
                {oversentiment === "true" && (
                  <b style={{ color: "red" }}>
                    Note: Mark as Oversentiment {oversentiment}{" "}
                  </b>
                )}
              </span>
              <h5 style={{ float: "right" }}>{status}</h5>
            </div>
            <News.Wrapper>
              <News.Headline>
                <News.Title>{headline}</News.Title>
              </News.Headline>
              <News.Side>
                <News.Category>{categories}</News.Category> <br />
                <News.Date>Date: {date} </News.Date>
              </News.Side>
              <News.Content
                dangerouslySetInnerHTML={{ __html: `${content}` }}
              ></News.Content>
              <News.Image src={image} alt={headline} />
              <News.Cite style={{ gap: "10px" }}>
                Author: <b>{author}</b>
                <span style={{ marginLeft: "50px" }}>
                  Source: <b>{source}</b>
                </span>
              </News.Cite>
            </News.Wrapper>
            <form onSubmit={handleSubmit}>
              <DialogActions
                sx={{
                  justifyContent: "space-between",
                  borderTop: "0.5px solid gray",
                }}
              >
                <Button
                  type="submit"
                  color="error"
                  size="small"
                  onClick={() => setActions("Rejected")}
                >
                  Reject
                </Button>
                <input
                  type="text"
                  placeholder="Remark"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  required
                />
                <span>
                  Sentiment Level:
                  {sentiment === "positive" ? (
                    <i style={{ color: "green" }}> {sentiment} </i>
                  ) : (
                    <i style={{ color: "red" }}> {sentiment}</i>
                  )}
                  &nbsp; Rate: {sentimentrate} %
                </span>
                <span>Plagiarism Rate: {plagiarizerate}%</span>

                <Button
                  size="small"
                  type="submit"
                  variant="outlined"
                  color="success"
                  onClick={() => [
                    setActions("Approved"),
                    setRemark("Approved"),
                  ]}
                >
                  Approved
                </Button>
              </DialogActions>
            </form>
          </Main>
          {sources && (
            <Box>
              <SourceH1>Source</SourceH1>
              {sources && Object.keys(sources).length !== 0 && (
                <M.CardUL>
                  {sources &&
                    sources.map((cite, index) => {
                      return (
                        <M.CardList key={index}>
                          <M.CardH4 style={{ fontSize: "13px" }}>
                            {cite.headline}
                          </M.CardH4>
                          <M.CardH4
                            style={{
                              fontSize: "13px",
                              color: `${styles.LightGray}`,
                              fontWeight: "400",
                              textAlign: "left",
                            }}
                          >
                            {cite.summary.slice(0, 50)}
                          </M.CardH4>
                          <M.CardP
                            style={{ cursor: "pointer" }}
                            onClick={() => window.open(cite.url)}
                          >
                            {cite.url.replace("https://", "").slice(0, 25)}...
                          </M.CardP>
                          <M.SubHead
                            style={{
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "start",
                              gap: "0px",
                            }}
                          >
                            <M.CardP>Author: {cite.author}</M.CardP>
                            <M.CardP>
                              Copyright: {cite.rights.slice(0, 15)}
                            </M.CardP>
                          </M.SubHead>
                        </M.CardList>
                      );
                    })}
                </M.CardUL>
              )}
            </Box>
          )}
        </MenuContent>
      </MenuOverlay>
    </>
  );
}

const Main = styled.main`
  position: relative;
  width: 919px;
  height: 680px;
  margin: 0px 0px;
  z-index: 1;
  background-color: ${styles.White};

  display: flex;
  flex-direction: column;
`;
const MenuOverlay = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;
export const Box = styled.div`
  width: 250px;
  height: auto;
  min-height: 680px;
  background-color: ${styles.White};
  border-radius: 10px;
  padding: 18px 16px;
  text-align: left;
  overflow-y: auto;
`;
const SourceH1 = styled.h1`
  font-size: 1rem;
  color: ${styles.Dark};
  font-family: ${styles.Bold};
  margin-bottom: 20px;
`;
const AsideLink = styled(Link)`
  font-size: 0.875rem;
  text-decoration: none;
  font-family: ${styles.Medium};
  color: ${styles.Cherry};
  line-height: 0px;
  cursor: pointer;
`;
