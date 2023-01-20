import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle"
import DialogContentText from "@mui/material/DialogContentText";
import * as News from "../..//components/NewsList";
import styled from "styled-components";
import styles from "../../components/styles";
export default function DialogNews({ id, headline, content, sentiment, sentimentrate, plagiarizerate, categories, date, status, remark, action, author, oversentiment, source, image }) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("body");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
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
        <DialogTitle id="scroll-dialog-title" style={{ color: `${styles.LightGray}`, fontSize: "14px" }} ><i>{id}</i> <h5 style={{ float: "right" }}>{status}</h5></DialogTitle>
        <DialogContent dividers={scroll === "body"} style={{ overflow: "hidden" }}
        >
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Main >
              <News.Wrapper>
                <News.Headline>
                  <News.Title>{headline}</News.Title>
                </News.Headline>
                <News.Side>
                  <News.Category>{categories}</News.Category> <br />
                  <i style={{ fontSize: "14px" }}>Date: {date} </i>
                </News.Side>
                <News.Content>{content}</News.Content>
                <News.Image
                  src={image}
                  alt={headline}
                />
                <News.Cite style={{ gap: "10px" }}>
                  Author: <b>{author}</b>
                  <span style={{ marginLeft: "50px" }}>Source: <b>{source}</b></span>
                </News.Cite>
              </News.Wrapper>
            </Main>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between", borderTop: "0.5px solid gray" }}>
          <Button onClick={handleClose} color="error" size="small">
            Reject
          </Button>
          <span>Sentiment Level: {sentiment === "positive" ? <i style={{ color: "green" }}>{sentiment} </i> : <i style={{ color: "red" }}>{sentiment}</i>} &nbsp; Rate: {sentimentrate}</span>
          <span>Plagiarism Rate: {plagiarizerate}</span>
          <span>{oversentiment ? <i style={{ color: "red" }}>Note: Mark as Oversentiment  </i> : <i></i>}</span>
          <Button onClick={handleClose} size="small" variant="outlined" color="success">
            Approved
          </Button>
        </DialogActions>
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
