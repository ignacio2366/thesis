import { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import * as News from "../..//components/NewsList";
import styled from "styled-components";
import styles from "../../components/styles";
import PublishedModule from "../../service/publishedApi";

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
  image,
}) {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("body");
  const [remark, setRemark] = useState("");
  const [actions, setActions] = useState("");
  var today = new Date();
  var dateString = today.toLocaleString("en-us", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await PublishedModule.updatePublished(
      id,
      remark,
      actions,
      dateString
    );
    const result = await JSON.parse(response);
    if (result[0].message === "success") {
      setRemark("");
      setOpen(false);
    }
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button onClick={handleClickOpen("paper")} sx={{ textAlign: "left" }}>
        Review
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="auto"
        style={{ height: "auto" }}
      >
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
            {oversentiment && (
              <b style={{ color: "red" }}>Note: Mark as Oversentiment </b>
            )}
          </span>
          <h5 style={{ float: "right" }}>{status}</h5>
        </div>

        <DialogContent
          dividers={scroll === "body"}
          style={{ overflow: "hidden" }}
        >
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          ></DialogContentText>
          <Main>
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
          </Main>
        </DialogContent>
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
              &nbsp; Rate: {sentimentrate} &
            </span>
            <span>Plagiarism Rate: {plagiarizerate}%</span>

            <Button
              size="small"
              type="submit"
              variant="outlined"
              color="success"
              onClick={() => setActions("Approved")}
            >
              Approved
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

const Main = styled.main`
  position: relative;
  width: 919px;
  height: auto;
  margin: 0px 0px;
  z-index: 1;
`;
