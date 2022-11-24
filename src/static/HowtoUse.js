import styled from "styled-components";
import styles from "./../components/styles";
import { imgHowtoUse } from "../image/image";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import * as S from "./About"
const HowtoUse = () => {
    return (
        <>
            <Navigation logged={true} />
            <S.Container>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <S.Header>
                        <S.Headerh1>
                            How to Use? <br /> The News Editor <br />
                            with  <span style={{ color: '#FD5353' }}>Artificial <br />Intelligence</span>
                        </S.Headerh1>
                    </S.Header>
                    <S.Header><S.Aboutimg src={imgHowtoUse} style={{ width: "85%", height: "auto" }} alt="howTOuse" /></S.Header>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <Sections >
                        <SectionH1>Write A News with Sources and Bases</SectionH1>
                        <SectionP>  Proceed to the Write News Pages. <br /> &nbsp;&nbsp; Write the Headline as title for the news, make sure the news must be inline to the report and with bases.
                            For the writing a news with sources make sure the media and news are well citated and the media company must be accredited.
                            You may run the grammar checker with help of <b>Grammarly </b> the Artificial Intelligence for grammar correction and suggestions. and also run the
                            summarizer to generate a main idea of the news. Lastly is to upload an image to the Writer Editor.
                        </SectionP>
                    </Sections>
                    <Sections style={{ backgroundColor: `${styles.Dark}` }}><SectionH1>Run the Plagiarism and Sentiment Checker</SectionH1>
                        <SectionP> &nbsp;&nbsp; The Plagiarism checker feature is to check if your headline and contents are have similar or Plagiarized using the plaraphy API to search for the unique. The use of Rewriter is to rephrase it for you to make it sound more fluent and Plagiarism-free. </SectionP>
                    </Sections>
                    <Sections>
                        <SectionH1>Draft or Publish without any Problem</SectionH1>
                        <SectionP>&nbsp;&nbsp; Once everything is alright the Writer can draft the News or to Publish the News with caution; the writer editor will run the Plagiarism checker and Sentiment Analysis. If the reult from it contains a Plagiarized and
                            the Sentiment Analysis level is too exaggerated the Submit bottom will be disabled. If the result from checking is clear will now able to submit the work to be reviewed by Editor-in-chief. </SectionP>
                    </Sections>
                </div>

            </S.Container>
            <Footer />
        </>
    )


}

export const Sections = styled.section`

padding:5%;
margin: auto auto 40px auto;
height:411px;
width:70%;
border-radius: 5px;
background-color:${styles.Cherry};
color:${styles.White};
text-align:justify;
`

export const SectionH1 = styled.h1`
font-family: ${styles.black};
font-size: 2rem;
padding-bottom: 15px;
`
export const SectionP = styled.p`
font-size: 1.2rem;
font-family: ${styles.Medium};
`
export default HowtoUse