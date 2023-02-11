import styled from "styled-components";
import styles from "../components/styles";
import SideNav from "./layout/SideNav";
import Navigation from "../components/Navigation";
import { Grammarly, GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import "react-quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";
import DeviationSlider from "./layout/DeviationSlider";
import { useNavigate } from "react-router-dom";

//Draft
export function DraftModal() {
  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    getLogged();
  });

  const getLogged = () => {
    !localStorage.getItem("id")
      ? navigate("/login")
      : console.log(localStorage.getItem("id"));
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BtnDraft onClick={handleClickOpen}>Draft</BtnDraft>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{
          maxHeight: "429px",
          maxWidth: "569px",
          borderRadius: "34px",
          margin: "auto",
        }}
      >
        <DialogTitle id="alert-dialog-title">
          Confirm to draft the news?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Were not able to publish the news The news contents is consist of
            the following: Plagiarize Level is : 45% Insight Level is : 74%
            which is too exaggerated content Change the following to proceed and
            follow the procedure of writing a news
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid
            container
            justifyContent="space-between"
            alignItems="space-between"
            pl={2}
            pr={2}
          >
            <Button onClick={handleClose} variant="contained" color="primary">
              Return
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              color="success"
              disabled={disable ? true : false}
              autoFocus
            >
              Submit
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export function SubmitModal() {
  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BtnSubmit onClick={handleClickOpen}>Submit</BtnSubmit>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{
          maxHeight: "429px",
          maxWidth: "569px",
          borderRadius: "34px",
          margin: "auto",
        }}
      >
        <DialogTitle id="alert-dialog-title">
          Confirm to publish the news?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Were not able to publish the news The news contents is consist of
            the following: Plagiarize Level is : 45% Insight Level is : 74%
            which is too exaggerated content Change the following to proceed and
            follow the procedure of writing a news
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid
            container
            justifyContent="space-between"
            alignItems="space-between"
            pl={2}
            pr={2}
          >
            <Button onClick={handleClose} variant="contained" color="primary">
              Return
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              color="success"
              disabled={disable ? true : false}
              autoFocus
            >
              Submit
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const WriterPanel = () => {
  const theme = "snow";
  // const theme = 'bubble';

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ header: [1, 2, false] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const placeholder = "Write the Story here";

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "list",
    "indent",
    "size",
    "header",
    "link",
    "image",
    "video",
    "background",
    "clean",
    "font",
  ];

  const { quill, quillRef } = useQuill({
    theme,
    modules,
    formats,
    placeholder,
  });
  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        console.log(quill.getText()); // Get text only
        console.log(quill.root.innerHTML); // Get innerHTML using quill
      });
      // seeting the text with tags
      quill.clipboard.dangerouslyPasteHTML(`'<h1><strong>dadadada
       </strong></h1><p>Testing</p>'`);
    }
  }, [quill]);
  return (
    <>
      <div
        style={{
          background: "#ffff",
          color: `${styles.Dark}`,
          height: "350.54px",
          width: "472.08px",
          textAlign: "justify",
          wordBreak: "break-all",
          float: "left",
          letterSpacing: "0.2px",
          fontFamily: `${styles.Regular}`,
        }}
      >
        <div ref={quillRef} />
      </div>
    </>
  );
};

const Plagiarism = () => {
  return (
    <>
      <span>Plagiarism</span>
    </>
  );
};

const Sentiment = (sentiment) => {
  const [value, setValue] = useState(parseInt(sentiment));

  return (
    <>
      <span>Sentiment</span>
      <DeviationSlider
        label="Slider with base value example"
        value={value}
        onChange={setValue}
        units="%"
        disabled
      />
    </>
  );
};
const Writer = () => {
  const [operate, setOperate] = useState(0);
  const [sentiLevel, setSentiLevel] = useState(0);

  // Here will create the opearation for the plagiarism and sentiment

  const sentimentLevel = () => {
    setOperate(4);
    setSentiLevel(-100);
    console.log("click");
  };

  const UpperPanel = () => {
    switch (operate) {
      case 0:
        return <>Reference</>;
      case 1:
        return Plagiarism(10);
      case 4:
        return Sentiment(sentiLevel);
      default:
        return <span>Error Initialize</span>;
    }
  };

  return (
    <>
      <Navigation logged={localStorage.getItem("id") ? true : false} />
      <Container>
        <SideNav />
        <Main>
          <Grammarly clientId="client_C16r1uyjZx5bxd956cMhxU">
            <GrammarlyEditorPlugin>
              <Headline spellCheck="true" placeholder="Headline" />
            </GrammarlyEditorPlugin>
            <CategorySelect id="category" name="category">
              <CategotyOption value="volvo">Volvo</CategotyOption>
              <CategotyOption value="saab">Saab</CategotyOption>
              <CategotyOption value="fiat">Fiat</CategotyOption>
              <CategotyOption value="audi">Audi</CategotyOption>
            </CategorySelect>
            <GrayLine />
            <i style={{ fontSize: "14px", marginTop: "4px", float: "right" }}>
              Published: {"Fri Mar 25 2022 08:00:00"}
            </i>
            <GrammarlyEditorPlugin>
              <WriterPanel />
            </GrammarlyEditorPlugin>
            <ImagePanel>
              <ImageFIle />
              <input type="file" />
              <DraftModal />
              <SubmitModal />
            </ImagePanel>
          </Grammarly>
        </Main>
        <RightPanel>
          <Box>
            <UpperPanel />
          </Box>
          <LowerBox>
            <HotkeyH6>Hotkey Buttons</HotkeyH6>
            <HotkeyP>Click | Press the Shortcut key</HotkeyP>
            <BtnPlagiarsism onClick={() => setOperate(1)}>
              Plagiarism
            </BtnPlagiarsism>
            <HotLabel>Alt + Q</HotLabel>
            <BtnSentiment
              onClick={() => {
                sentimentLevel();
              }}
            >
              Sentiment
            </BtnSentiment>
            <HotLabel>Alt + W</HotLabel>
          </LowerBox>
        </RightPanel>
      </Container>
    </>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  background-size: cover;
  flex-direction: row;
  display: flex;
  justify-content: center;
`;

const Main = styled.main`
  width: 919px;
  position: relative;
  height: 584px;
  background-color: ${styles.White};
  padding: 29px;
  text-align: left;
  border-radius: 10px;
  margin: 88px 21px 0px 20px;
`;

export const RightPanel = styled.article`
  position: relative;
  width: 270px;
  height: 85vh;
  margin-top: 88px;
  margin-right: 28px;
  right: 0;
`;

export const Box = styled.div`
  width: 100%;
  height: 370px;
  background-color: ${styles.White};
  border-radius: 10px;
  padding: 18px 16px;
  text-align: left;
`;

// Inputs

const Headline = styled.textarea`
  width: 653px;
  height: 65px;
  border: 0.5px solid #a5a5a5;
  resize: none;
  float: left;
  font-size: 20px;
  font-family: ${styles.Bold};
  text-transform: uppercase;
  word-break: break-all;
  padding-left: 10px;
`;

const GrayLine = styled.hr`
  background-color: ${styles.Gray};
  margin-top: 16px;
  height: 2px;
  width: 70%;
  float: left;
`;

const CategorySelect = styled.select`
  float: right;
  width: 175px;
  height: 29px;
  border: 0.5px solid #a5a5a5;
  font-family: ${styles.Regular};
  margin-top: 14px;
`;

const CategotyOption = styled.option`
  text-align: center;
  font-family: ${styles.Regular};
`;

const ImagePanel = styled.div`
  float: right;
  margin-top: 13px;
  height: 407.54px;
  width: 370px;
`;

const ImageFIle = styled.img`
  height: 303px;
  width: 100%;
  background-color: ${styles.Dark};
  border-radius: 10px;
`;

const BtnDraft = styled.button`
  position: relative;
  float: left;
  height: 32px;
  width: 115px;
  bottom: -30px;
  border-radius: 3px;
  border: none;
  border-radius: 4px;
  background-color: ${styles.Gray};
  color: ${styles.White};
  font-family: ${styles.Regular};
`;

const BtnSubmit = styled.button`
  position: relative;
  right: 0px;
  float: right;
  bottom: -30px;
  height: 32px;
  width: 115px;
  border-radius: 3px;
  border: none;
  border-radius: 4px;
  background-color: #5cb85c;
  color: ${styles.White};
  font-family: ${styles.Regular};
  font-size: 0.875rem;
`;

export const LowerBox = styled.div`
  width: 100%;
  height: 205px;
  background-color: ${styles.White};
  border-radius: 10px;
  padding: 18px 19px;
  margin-top: 8px;
  flex-direction: column;
  flex-wrap: wrap;
`;
// Shortcut Keys
const HotkeyH6 = styled.h6`
  color: ${styles.Dark};
  font-size: 14px;
  font-family: ${styles.Bold};
  text-align: left;
`;
const HotkeyP = styled.p`
  color: ${styles.LightGray};
  font-size: 12px;
  text-align: left;
`;
const HotLabel = styled.label`
  height: 20px;
  width: 100%;
  text-align: left;
  font-size: 12px;
  font-family: ${styles.Italic};
  color: ${styles.LightGray};
`;
const BtnPlagiarsism = styled.button`
  background-color: #4285f4;
  height: 32px;
  width: 100%;
  color: #fff;
  font-size: 12px;
  font-family: ${styles.Regular};
  border: none;
  border-radius: 5px;
  margin-right: 1px;
`;

const BtnSentiment = styled.button`
  background-color: #ff4444;
  height: 32px;
  width: 100%;
  color: #fff;
  font-size: 12px;
  font-family: ${styles.Regular};
  border: none;
  border-radius: 5px;
  margin-left: 1px;
`;

// const BtnRewriter = styled.button`
//   background-color: #ff4444;
//   height: 32px;
//   width: 110px;
//   color: #fff;
//   font-size: 12px;
//   font-family: ${styles.Regular};
//   border: none;
//   border-radius: 5px;
//   margin-left: 1px;
// `;

// const BtnSources = styled.button`
//   background-color: #631ecb;
//   height: 32px;
//   width: 110px;
//   color: #fff;
//   font-size: 12px;
//   font-family: ${styles.Regular};
//   border: none;
//   border-radius: 5px;
//   margin-right: 1px;
// `;
export default Writer;
