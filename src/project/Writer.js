import styled from "styled-components";
import styles from "../components/styles";
import SideNav from "./layout/SideNav";
import CloseIcon from '@mui/icons-material/Close';
import Navigation from "../components/Navigation";
import { Grammarly, GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";
import DeviationSlider from "./layout/DeviationSlider";
import WriterModule from "../service/writerApi";
import $ from 'jquery';

const Writer = () => {
  const [operate, setOperate] = useState("");
  const [category, setCategory] = useState([])
  const [words, setWords] = useState(0)

  //Data
  const [image, setImage] = useState(null); // image to display
  const [file, setFile] = useState(null); // image file
  const [headline, setHeadline] = useState('')
  const [categories, setCategories] = useState('');
  const [story, setStory] = useState('');
  const [storyTag, setstoryTag] = useState('');

  //Sentiment
  const [sentiment, setSentiment] = useState('');
  const [sentimentRate, setSentimentRate] = useState(0);
  const [sentimentLists, setSentimentLists] = useState({});

  //Plagiarism
  const [plagiarism, setPlagiarism] = useState('');
  const [plagiarismRate, setPlagiarismRate] = useState(0);
  const [plagiarismLists, setPlagiarismLists] = useState({});


  // Here will create the opearation for the plagiarism and sentiment
  var date = new Date()
  var dateString = date.toLocaleString("en-us", { weekday: "short", month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric" });
  useEffect(() => {
    getCategory();

  }, []);


  const handleImageChange = e => {
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    }
    setFile(file);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const getCategory = async () => {
    const response = await WriterModule.getCategories()
    setCategory(JSON.parse(response));

  }

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
      quill.on("text-change", () => {
        setStory(quill.getText())
        setstoryTag(quill.root.innerHTML)
        const word = quill.getText().split(/\s+/).filter(word => word.length > 0);
        setWords(word.length)
      });
      // seeting the text with tags
      quill.clipboard.dangerouslyPasteHTML(``);
    }
  }, [quill]);

  const display = () => {
    console.log(headline)
    console.log(categories)
    console.log(story)
    console.log(storyTag)
    console.log(file);
  }

  const handAltQ = (event) => {
    if (event.altKey && event.keyCode === 81) {
      initPlagiarism()
    }
    if (event.altKey && event.keyCode === 87) {
      initSentiment()
    }
  }
  const initSentiment = () => {
    setOperate("Sentiment");

    const response = {
      "sentiments_detected": [
        {
          "neg": 0.0,
          "neu": 0.0,
          "pos": 0,
          "compound": 0,
          "sentence": ""
        },

      ],
      "sentiment": "negative",
      "success": true
    }


    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://app.plaraphy.com/api/sentiment",
      "method": "POST",
      "headers": {
        "accept": "application/json",
        "content-type": "application/x-www-form-urlencoded",
        "authorization": "Bearer 3184|1EsvlC57lKxJCSvLKdOzTUiw16Fz27VaTI41um3f",
        "cache-control": "no-cache"
      },
      "data": {
        //url must be urlencoded 
        "text": `${story.slice(0, 999)}`
      }
    }

    // $.ajax(settings).done(function (response) {
    //   console.log(response);
    //   const totalCompound = response.sentiments_detected.reduce((sum, sentiment) => sum + sentiment.compound, 0);
    //   const length = Object.keys(response.sentiments_detected).length
    //   const sentimentRate = totalCompound / length * 100
    //   setSentimentRate(Math.round(sentimentRate));
    //   setSentiment(response.sentiment)
    //   setSentimentLists(response.sentiments_detected)
    //   console.log(sentimentRate)
    // });


    console.log(response);
    const totalCompound = response.sentiments_detected.reduce((sum, sentiment) => sum + sentiment.compound, 0);
    const length = Object.keys(response.sentiments_detected).length
    const sentimentRate = totalCompound / length * 100
    setSentimentRate(Math.round(sentimentRate));
    setSentiment(response.sentiment)
    setSentimentLists(response.sentiments_detected)
    console.log(sentimentRate)

  };

  const initPlagiarism = () => {
    console.log("Plagiarism");
    setOperate("Plagiarism");

    const response = {
      "plagiarism_rate": 13.456620106236475,
      "plagiarism_links": [
        {
          "url": "https://www.sciencedirect.com/science/article/pii/S0268401220308082",
          "percentage": 13.456620106236475
        },
        {
          "url": "https://www.chegg.com/flashcards/test-3-7d6e5cdc-6d4c-4443-81fe-73007f8c4195/deck",
          "percentage": 3.6344695873603796
        },
        {
          "url": "https://technologyadvice.com/blog/information-technology/how-to-use-an-api/",
          "percentage": 10.444214876033058
        }
      ],
      "success": true,
      "job_id": null

    }

    console.log(response);
    setPlagiarismRate((response.plagiarism_rate).toFixed(2));
    setPlagiarismLists(response.plagiarism_links)

  }
  return (
    <>
      <Navigation logged={localStorage.getItem("id") ? true : false} />
      <Container onKeyDown={handAltQ} tabIndex={0}>
        <SideNav />
        <Main>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Grammarly clientId="client_C16r1uyjZx5bxd956cMhxU">
              <GrammarlyEditorPlugin>
                <Headline spellCheck="true" placeholder="Headline" value={headline} onChange={(e) => setHeadline(e.target.value)} />
              </GrammarlyEditorPlugin>

              <CategorySelect id="category" value={categories} onChange={(e) => setCategories(e.target.value)} name="category">
                <CategotyOption>Select Categories</CategotyOption>
                {category.map((category, index) => {
                  return (
                    <CategotyOption key={index} value={category.name} >{category.name}</CategotyOption>
                  )
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
                    onKeyDown={handAltQ} tabIndex={0}
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
                    <i>Word Counts: {words} </i>
                  </div>
                </>
                {/* WritePanel */}

              </GrammarlyEditorPlugin>
              <ImagePanel>
                <ImageFIle src={image} />
                <input type="file" accept="image/*" name="image" onChange={handleImageChange} />
                <input type="reset" onClick={(event) => setImage(null)} />
                <BtnSubmit onClick={() => display()} >Submit</BtnSubmit>
              </ImagePanel>
            </Grammarly>

            <SubMain>
              <Subtitle>Author: <b>{localStorage.getItem('name')}</b> </Subtitle>
              <Subtitle>Copyright: <b>NEWS.AI</b></Subtitle>
              <Subtitle>Source: <b>Main Source</b></Subtitle>
            </SubMain>
          </form>
        </Main>
        <RightPanel>
          <Box style={{ overflow: "auto" }}>
            <CloseIcon style={{ float: "right" }} onClick={() => setOperate("Source")}>X</CloseIcon>
            {operate === "Source" && <div> Source  </div>}
            {operate === "Sentiment" && <div> <SentiH1>Sentiment</SentiH1>
              <SentiLabel>Sentiment Label is <b>{sentiment.toUpperCase()}</b></SentiLabel>
              <SentiLabel>Sentiment Range</SentiLabel>
              <DeviationSlider
                value={sentimentRate}
                onChange={setSentimentRate}
                units="%"
                disabled
                positve={56}
                negative={-20.1}
              />
              <SentiBold>Sentiment Analysis Report</SentiBold>
              {
                sentimentLists.map((sentiment, index) => {
                  return (<ul key={index}>
                    {sentiment.compound ? sentiment.compound * 100 > 1 ? <Positive key={index} >
                      {sentiment.sentence} <br /> ({(sentiment.compound * 100).toFixed(2)} %)
                    </Positive> :
                      <Negative key={index} >
                        {sentiment.sentence} <br /> ({(sentiment.compound * 100).toFixed(2)} %)
                      </Negative> : <></>
                    }
                  </ul>
                  )
                })
              }

            </div>}
            {operate === "Plagiarism" &&
              <div>
                <SentiH1>Plagiarism</SentiH1>
                <SentiLabel>Plagirism Rate  is</SentiLabel>
                <h1> <b>{plagiarismRate}%</b></h1>
                <ul>
                  {
                    plagiarismLists.map((plagiarism, i) => {
                      return (
                        <li onClick={() => window.open(plagiarism.url)}>
                          {plagiarism.url} ({(plagiarism.percentage).toFixed(2)}%)
                        </li>
                      )
                    })
                  }
                </ul>
              </div>}

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
                initSentiment()
              }}
            >
              Sentiment
            </BtnSentiment>
            <HotLabel>Alt + W</HotLabel>
          </LowerBox>
        </RightPanel>
      </Container >
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
`

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

const Subtitle = styled.p`
  font-size: 0.875rem;
  font-family: ${styles.Regular}

`

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
`
const SentiLabel = styled.p`
 font-size: 0.875rem;
 color: ${styles.LightGray};
 font-family: ${styles.Medium};
`
const SentiH1 = styled.h1`
  font-size: 1.2rem;
  color: ${styles.Dark};
  font-family: ${styles.Medium};
  letter-spacing: 1px;
  margin-bottom: 20px;
`

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
  height:auto;
  width:auto;
  background-color:#EEFFEE;
  border: 1px solid #5CB85C;
  margin: 4px 0px;
  padding: 5px;

`

const Negative = styled.li`
  list-style: none;
  height:auto;
  width:auto;
  background-color:#FFF0F0;
  border: 1px solid #FF2323;
  margin: 4px 0px;
  padding: 5px;

`



export default Writer;
