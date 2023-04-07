import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import styles from "../components/styles";
import SideNav from "./layout/SideNav";
import CloseIcon from "@mui/icons-material/Close";
import Navigation from "../components/Navigation";
import { Grammarly, GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";
import DeviationSlider from "./layout/DeviationSlider";
import WriterModule from "../service/writerApi";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { css } from "styled-components";
import * as M from "../project/layout/WriterModal";
import $ from "jquery";
import DraftModule from "../service/draftApi";

function Writer() {
  const { cite } = useParams();
  const [operate, setOperate] = useState("Source");
  const [category, setCategory] = useState([]);
  const [words, setWords] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [source, setSource] = useState([]);
  const [tempStory, setTempStory] = useState("");

  //Data
  const [id, setId] = useState(0);
  const [image, setImage] = useState(null); // image to display
  const [file, setFile] = useState(null); // image file
  const [headline, setHeadline] = useState("");
  const [categories, setCategories] = useState("");
  const [story, setStory] = useState("");
  const [storyTag, setstoryTag] = useState("");

  //Sentiment
  const [sentiment, setSentiment] = useState("");
  const [sentimentRate, setSentimentRate] = useState(0);
  const [sentimentLists, setSentimentLists] = useState({});

  //Plagiarism
  const [plagiarism, setPlagiarism] = useState("");
  const [plagiarismRate, setPlagiarismRate] = useState(0);
  const [plagiarismLists, setPlagiarismLists] = useState([]);

  // Modal
  //Submit
  const [subOpen, setSubOpen] = useState(false);
  const [subDisable, setDisable] = useState(true);

  //Draft
  const [draftOpen, setDraftOpen] = useState(false);
  const [subDraftDisable, setSubDraftDisable] = useState(true);

  // Here will create the opearation for the plagiarism and sentiment
  var date = new Date();
  const navigate = useNavigate();

  var dateString = date.toLocaleString("en-us", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  useEffect(() => {
    getLogged();
    const fetchDraftedNews = async () => {
      try {
        const draftSources = await WriterModule.getDraftedNews(cite);
        const response = JSON.parse(draftSources);
        setId(parseInt(response[0].id));
        setHeadline(response[0].headline);
        setStory(response[0].content);
        setTempStory(response[0].contenttag);

        setImage(
          response[0].image.replace(
            "C:/xampp/htdocs",
            process.env.REACT_APP_PHP_URL
          )
        );
        setCategories(response[0].category);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDraftedNews();
  }, []);

  useEffect(() => {
    getCategory();
    cite && getDraftSources();
    if (headline && categories && story && file) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [headline, categories, story, file]);

  const getLogged = () => {
    if (
      !localStorage.getItem("id") ||
      localStorage.getItem("type") !== "user"
    ) {
      navigate("/login");
    }
  };

  const getDraftSources = async () => {
    var result = await DraftModule.getDraftSources(cite);
    setSource(JSON.parse(result));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
    setFile(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const getCategory = async () => {
    const response = await WriterModule.getCategories();
    setCategory(JSON.parse(response));
  };

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

  const { quill, quillRef, editor } = useQuill({
    theme,
    modules,
    formats,
    placeholder,
  });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setStory(quill.getText());
        setstoryTag(quill.root.innerHTML);

        // Word Count
        const word = quill
          .getText()
          .split(/\s+/)
          .filter((word) => word.length > 0);
        setWords(word.length);
      });
    }
  });

  useEffect(() => {
    if (tempStory) {
      quill.clipboard.dangerouslyPasteHTML(tempStory);
    } else {
    }
  }, [tempStory]);

  const handAltQ = (event) => {
    if (event.altKey && event.keyCode === 81) {
      initPlagiarism();
    }
    if (event.altKey && event.keyCode === 87) {
      initSentiment();
    }
  };
  const initSentiment = () => {
    setOperate("Sentiment");
    runSentiment();
  };

  const runSentiment = () => {
    const response = {
      sentiments_detected: [
        {
          neg: 0,
          neu: 0,
          pos: 0,
          compound: 0.9,
          sentence: "",
        },
      ],
      sentiment: "positive",
      success: true,
    };
    const totalCompound = response.sentiments_detected.reduce(
      (sum, sentiment) => sum + sentiment.compound,
      0
    );
    const length = Object.keys(response.sentiments_detected).length;
    const sentimentRate = (totalCompound / length) * 100;
    setSentimentRate(sentimentRate);
    setSentiment(response.sentiment);
    setSentimentLists(response.sentiments_detected);

    var settings = {
      async: true,
      crossDomain: true,
      url: "https://app.plaraphy.com/api/sentiment",
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/x-www-form-urlencoded",
        authorization: "Bearer 24563|HmmIeWVaXSeJkaJMyrofy99TyC4w4tm92h3HGy40",
        "cache-control": "no-cache",
      },
      data: {
        //url must be urlencoded
        text: `${story.slice(0, 999)}`,
      },
    };

    $.ajax(settings).done(function (response) {
      const totalCompound = response.sentiments_detected.reduce(
        (sum, sentiment) => sum + sentiment.compound,
        0
      );
      const length = Object.keys(response.sentiments_detected).length;
      const sentimentRate = (totalCompound / length) * 100;
      setSentimentRate(sentimentRate);
      setSentiment(response.sentiment);
      setSentimentLists(response.sentiments_detected);
    });
  };

  const initPlagiarism = () => {
    setOperate("Plagiarism");
    runPlagiarism();
  };

  const runPlagiarism = () => {
    setPlagiarismRate(0);
    setPlagiarismLists(null);
    setDisable(true);
    setSubDraftDisable(true);
    setPlagiarism("");
    setIsLoading(true);

    $.ajax({
      url: "https://www.prepostseo.com/apis/checkPlag",
      type: "POST",
      data: {
        key: "f18cd1a7745ce007ad7bea6f7906fee5",
        data: `${story}`,
      },
      success: function (response) {
        setIsLoading(false);
        setPlagiarismRate(response.plagPercent);
        setPlagiarismLists(response.sources);
        if (response.plagPercent <= 15.0) {
          setDisable(false);
          setSubDraftDisable(false);
          setPlagiarism("Not Plagiarized");
        } else {
          setDisable(true);
          setSubDraftDisable(true);
          setPlagiarism("Plagiarized");
        }
        // Handle response from server
      },
      error: function (error) {
        console.log(error);
        // Handle error
      },
    });
  };

  const runValidation = () => {
    runPlagiarism();
    runSentiment();
  };

  const subClickOpen = () => {
    setSubOpen(true);
    runValidation();
  };

  const subhandleClose = () => {
    setSubOpen(false);
  };

  const draftClickOpen = () => {
    setDraftOpen(true);
    runValidation();
  };

  const drafthandleClose = () => {
    setDraftOpen(false);
    setDisable(false);
  };

  const display = async (
    action,
    plagiarismrateDate,
    sentimentRateData,
    sentimentData
  ) => {
    const data = new FormData();
    if (cite) {
      data.append("id", id);
    }

    data.append("headline", headline);
    data.append("category", categories);
    data.append("content", story);
    data.append("contenttag", storyTag);
    data.append("datestart", dateString);
    data.append("status", action === "draft" ? "draft" : "For Review");
    data.append("action", action);
    data.append("author", localStorage.getItem("name"));
    data.append("authorId", localStorage.getItem("id"));
    data.append("source", source ? "Sources" : "Main Source");
    data.append("sentimentrate", sentimentRateData);
    data.append("sentiment", sentiment);

    if (sentimentRateData >= -70 && sentimentRateData <= 70) {
      data.append("oversentimentrate", "true");
    } else {
      data.append("oversentimentrate", "false");
    }
    data.append("plagiarismrate", plagiarismrateDate);
    data.append("plagiarism", plagiarism);
    data.append("image", file);

    try {
      const response = cite
        ? await WriterModule.updateNews(data)
        : await WriterModule.addNews(data);

      if (response[0].message === "success") {
        alert("News Submitted successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setHeadline("");
    setCategories("");
    setStory("");
    setFile(null);
    setImage(null);
    setstoryTag("");
    editor.setText("");
  };
  return (
    <>
      <Navigation logged={localStorage.getItem("id") ? true : false} />
      <Container onKeyDown={handAltQ} tabIndex={0}>
        <SideNav />
        <Main>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Grammarly clientId="client_C16r1uyjZx5bxd956cMhxU">
              <GrammarlyEditorPlugin>
                <Headline
                  spellCheck="true"
                  placeholder="Headline"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                />
              </GrammarlyEditorPlugin>

              <CategorySelect
                id="category"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                name="category"
                required
              >
                <CategotyOption value="">Select Categories</CategotyOption>
                {category.map((category, index) => {
                  return (
                    <CategotyOption key={index} value={category.name}>
                      {category.name}
                    </CategotyOption>
                  );
                })}
              </CategorySelect>
              <GrayLine />
              <i style={{ fontSize: "14px", marginTop: "4px", float: "right" }}>
                For Publication: {dateString}
              </i>
              <GrammarlyEditorPlugin>
                {/* WritePanel */}
                <>
                  <div
                    onKeyDown={handAltQ}
                    tabIndex={0}
                    style={{
                      background: "#ffff",
                      color: `${styles.Dark}`,
                      height: "350.54px",
                      width: "472.08px",
                      textAlign: "justify",
                      wordBreak: "break-word",
                      float: "left",
                      letterSpacing: "0.2px",
                      fontFamily: `${styles.Regular}`,
                    }}
                  >
                    <div ref={quillRef} />
                    <i>Word Counts: {words} </i>
                  </div>
                </>
                {/* WritePanel */}
              </GrammarlyEditorPlugin>
              <ImagePanel>
                <ImageFIle src={image} />
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleImageChange}
                  required
                />
                <input type="reset" onClick={() => resetForm()} />
                <BtnDraft type="submit" onClick={draftClickOpen}>
                  Draft
                </BtnDraft>
                <BtnSubmit
                  type="submit"
                  onClick={subClickOpen}
                  disabled={subDisable ? true : false}
                >
                  Submit
                </BtnSubmit>
              </ImagePanel>
            </Grammarly>
            <SubMain>
              <Subtitle>
                Author: <b>{localStorage.getItem("name")}</b>
              </Subtitle>
              <Subtitle>
                Copyright: <b>NEWS.AI</b>
              </Subtitle>
              <Subtitle>
                Source: <b>{source ? "Sources" : "Main Source"}</b>
              </Subtitle>
            </SubMain>

            {/* Submit Modal */}

            <Dialog open={subOpen} onClose={subhandleClose}>
              <M.Modal>
                <M.Head>
                  <M.Header>Confirm to submit the news?</M.Header>
                </M.Head>
                <M.Body>
                  {plagiarism === "Plagiarized" && (
                    <M.Error>Not able to submit the news</M.Error>
                  )}

                  {isLoading ? (
                    <div
                      style={{
                        margin: "auto",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <M.Message>Running Plagiarism Checking </M.Message> <br />
                      <CircularProgress />
                    </div>
                  ) : (
                    <>
                      <M.Message>
                        The news contents is consist of the following:
                      </M.Message>
                      <M.Message>
                        <b>Plagriaze Rate is : {plagiarismRate?.toFixed(2)}%</b>
                      </M.Message>
                      <M.Message>
                        <b>Plagriaze Label : {plagiarism || ""} </b>
                      </M.Message>
                      <M.Message>
                        <b>Sentiment Rate is : {sentimentRate?.toFixed(2)}% </b>
                      </M.Message>
                      {sentimentRate <= 70 ||
                        (sentimentRate >= -70 && (
                          <M.Error>
                            <b>The news recognized as high sentiment news </b>
                          </M.Error>
                        ))}
                    </>
                  )}

                  <DialogActions>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="space-between"
                      pl={2}
                      pr={2}
                    >
                      <M.BtnDraft
                        onClick={subhandleClose}
                        variant="contained"
                        color="primary"
                      >
                        Return
                      </M.BtnDraft>

                      <M.BtnSubmit
                        onClick={() =>
                          display(
                            "approval",
                            plagiarismRate?.toFixed(2),
                            sentimentRate?.toFixed(2),
                            sentimentRate
                          )
                        }
                        variant="contained"
                        color="success"
                        disabled={subDisable ? true : false}
                      >
                        Submit
                      </M.BtnSubmit>
                    </Grid>
                  </DialogActions>
                </M.Body>
              </M.Modal>
            </Dialog>

            {/* Draft Modal */}

            <Dialog open={draftOpen} onClose={drafthandleClose}>
              <M.Modal>
                <M.Head style={{ backgroundColor: `${styles.Dark}` }}>
                  <M.Header>Confirm to save to draft the news?</M.Header>
                </M.Head>
                <M.Body>
                  {plagiarism === "Plagiarized" && (
                    <M.Error>Not able to draft the news</M.Error>
                  )}

                  {isLoading ? (
                    <div
                      style={{
                        margin: "auto",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <M.Message>Running Plagiarism Checking </M.Message> <br />
                      <CircularProgress />
                    </div>
                  ) : (
                    <>
                      <M.Message>
                        The news contents is consist of the following:
                      </M.Message>
                      <M.Message>
                        <b>Plagriaze Rate is : {plagiarismRate?.toFixed(2)}%</b>
                      </M.Message>
                      <M.Message>
                        <b>Plagriaze Label : {plagiarism || ""} </b>
                      </M.Message>
                      <M.Message>
                        <b>Sentiment Rate is : {sentimentRate?.toFixed(2)}% </b>
                      </M.Message>
                      {sentimentRate <= 70 ||
                        (sentimentRate >= -70 && (
                          <M.Error>
                            <b>The news recognized as high sentiment news </b>
                          </M.Error>
                        ))}
                    </>
                  )}
                  <DialogActions>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="space-between"
                      pl={2}
                      pr={2}
                    >
                      <M.BtnDraft
                        onClick={drafthandleClose}
                        variant="contained"
                        color="primary"
                      >
                        Return
                      </M.BtnDraft>
                      <M.BtnSubmit
                        onClick={() => display("draft")}
                        variant="contained"
                        color="success"
                        autoFocus
                        disabled={subDisable ? true : false}
                      >
                        Save
                      </M.BtnSubmit>
                    </Grid>
                  </DialogActions>
                </M.Body>
              </M.Modal>
            </Dialog>
          </form>
        </Main>
        <RightPanel>
          <Box style={{ overflow: "auto" }}>
            <CloseIcon
              style={{ float: "right" }}
              onClick={() => setOperate("Source")}
            >
              X
            </CloseIcon>
            {operate === "Source" && (
              <>
                <SentiH1>Sources</SentiH1>
                <M.CardUL>
                  {source.map((cite, index) => {
                    return (
                      <M.CardList key={index}>
                        <M.CardH4 style={{ fontSize: "13px" }}>
                          {cite.headline}
                        </M.CardH4>
                        <M.CardP
                          style={{ cursor: "pointer" }}
                          onClick={() => window.open(cite.url)}
                        >
                          {cite.url.slice(0, 30)}...
                        </M.CardP>
                        <M.SubHead style={{ flexDirection: "column" }}>
                          <M.CardP>Author: {cite.author}</M.CardP>
                          <M.CardP>
                            Copyright: {cite.rights.slice(0, 15)}
                          </M.CardP>
                        </M.SubHead>
                      </M.CardList>
                    );
                  })}
                </M.CardUL>
              </>
            )}

            {operate === "Sentiment" && (
              <div>
                <SentiH1>Sentiment</SentiH1>
                <SentiLabel>
                  Sentiment Label is <b>{sentiment?.toUpperCase()}</b>
                </SentiLabel>
                <SentiLabel />
                Overall Score: <b>{sentimentRate?.toFixed(2) || 0}%</b>
                <SentiLabel />
                <SentiBold>Sentiment Analysis Report</SentiBold>
                {sentimentLists?.map((sentiment, index) => {
                  return (
                    <PlagUL key={index}>
                      {sentiment.compound ? (
                        sentiment.compound * 100 >= 1 ? (
                          <Positive key={index}>
                            {sentiment.sentence} <br /> (
                            {(sentiment.compound * 100).toFixed(2)} %)
                          </Positive>
                        ) : (
                          <Negative key={index}>
                            {sentiment.sentence} <br /> (
                            {(sentiment.compound * 100).toFixed(2)} %)
                          </Negative>
                        )
                      ) : (
                        <></>
                      )}
                    </PlagUL>
                  );
                })}
                <SentiLabel>Sentiment Range</SentiLabel>
                <DeviationSlider
                  value={Math.round(sentimentRate)}
                  onChange={setSentimentRate}
                  units="%"
                  disabled
                  positve={90}
                  negative={-90}
                />
              </div>
            )}
            {operate === "Plagiarism" && (
              <div>
                <SentiH1>Plagiarism</SentiH1>
                <SentiLabel>Plagiarism Rate is:</SentiLabel>
                <PlagiarismHeader>
                  {isLoading ? (
                    <CircularProgress />
                  ) : (
                    <b>{plagiarismRate || 0.0}%</b>
                  )}
                </PlagiarismHeader>
                <SentiLabel>
                  Plagiarism Rate must not exceed to: <b>15%</b>
                </SentiLabel>

                <SentiLabel>
                  Result: <b> {plagiarism}</b>
                </SentiLabel>
                <br />
                {plagiarismLists && (
                  <>
                    <SentiH1>Similarity Details:</SentiH1>
                    <PlagUL>
                      {plagiarismLists &&
                        plagiarismLists.map((plagiarism, i) => {
                          return (
                            <PlagList
                              key={i}
                              onClick={() => window.open(plagiarism.link)}
                            >
                              {plagiarism.link.replace("https://", "")}
                              <br />
                              <b> ({plagiarism.percent}%)</b>
                            </PlagList>
                          );
                        })}
                    </PlagUL>
                  </>
                )}
              </div>
            )}
          </Box>
          <LowerBox>
            <HotkeyH6>Hotkey Buttons</HotkeyH6>
            <HotkeyP>Click | Press the Shortcut key</HotkeyP>
            <BtnPlagiarsism onClick={() => initPlagiarism()}>
              Plagiarism
            </BtnPlagiarsism>
            <HotLabel>Alt + Q</HotLabel>
            <BtnSentiment
              onClick={() => {
                initSentiment();
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
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: ${styles.WhiteSmoke};
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
const SubMain = styled.section`
  width: 100%;
  height: 30px;
  position: relative;
  float: left;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
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
  overflow-y: auto;
`;

// Inputs

const Subtitle = styled.p`
  font-size: 0.875rem;
  font-family: ${styles.Regular};
`;

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
  width: 68%;
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
  background-size: cover;
  border-radius: 10px;
`;

const SentiBold = styled.h6`
  font-size: 0.875rem;
  color: ${styles.LightGray};
  font-family: ${styles.Bold};
`;
const SentiLabel = styled.p`
  font-size: 0.875rem;
  color: ${styles.LightGray};
  font-family: ${styles.Regular};
  line-height: auto;
`;
const SentiH1 = styled.h1`
  font-size: 1rem;
  color: ${styles.Dark};
  font-family: ${styles.Bold};
  letter-spacing: 1px;
  margin-bottom: 20px;
`;
const PlagUL = styled.ul`
  margin: 0px;
  padding: 0px;
`;
const PlagList = styled.li`
  list-style: none;
  height: auto;
  width: auto;
  background-color: #fffff;
  border: 1px solid #4285f4;
  margin: 4px 0px;
  padding: 5px;
  justify-content: left;
  word-break: break-all;
  cursor: pointer;
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

  /* Conditional styling to change background color when button is disabled */
  ${({ disabled }) =>
    disabled &&
    css`
      background-color: #ccc;
      cursor: not-allowed;
    `}
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
  font-family: ${styles.Medium};
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

const Positive = styled.li`
  list-style: none;
  height: auto;
  width: auto;
  background-color: #eeffee;
  border: 1px solid #5cb85c;
  margin: 4px 0px;
  padding: 5px;
`;

const Negative = styled.li`
  list-style: none;
  height: auto;
  width: auto;
  background-color: #fff0f0;
  border: 1px solid #ff2323;
  margin: 4px 0px;
  padding: 5px;
`;

const PlagiarismHeader = styled.h1`
  font-size: 36px;
  text-align: center;
  font-family: ${styles.Regular};
  color: ${styles.Dark};
`;

export default Writer;
