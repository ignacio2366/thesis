import { useState, useEffect, useCallback } from "react";
import styles from "../components/styles";
import styled from "styled-components";
import Navigation from "../components/Navigation";
import SideNav from "./layout/SideNav";
import { useNavigate } from "react-router-dom";
import ChartDataLabels from "chartjs-plugin-datalabels";
import InsightModule from "../service/insightApi";
import MyPDF from "./layout/PDFReport";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

function Insight() {
  var date = new Date();
  var dateString = date.toLocaleString("en-us", {
    month: "long",
  });
  const navigate = useNavigate();

  const [month, setMonth] = useState(dateString);
  const [monthly, setMonthly] = useState([]);
  const [media, setMedia] = useState({});
  const [line, setLine] = useState([]);
  const [headline, setHeadline] = useState([]);
  const [opinion, setOpinion] = useState([]);
  const [dataPie, setDataPie] = useState([]);
  const [plagiarism, setPlagiarism] = useState(0.0);
  const [positve, setPositive] = useState(0.0);
  const [negative, setNegative] = useState(0.0);
  const [word, setWord] = useState(0);
  var lineDay = [];
  var lineTotal = [];
  var pieData = [];

  useEffect(() => {
    MediaData(month);
  }, [month]);

  const getLogged = useCallback(() => {
    if (
      !localStorage.getItem("id") ||
      localStorage.getItem("type") !== "admin"
    ) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    getLogged();
  }, [getLogged]);

  const MediaData = async (month) => {
    try {
      const _settings = await InsightModule.setting();
      const settings = _settings;
      setPlagiarism(settings.plagiarism);
      setPositive(settings.positive);
      setNegative(settings.negative);
      setWord(settings.word);

      const monthly = await InsightModule.getMonth();
      setMonthly(monthly);
      const response = await InsightModule.getMediaMonth(month);
      const result = response;
      setMedia(result);

      const line = await InsightModule.getLineGraph(month);
      setLine(line);

      const pie = await InsightModule.getDataGraph(month);
      setDataPie(pie);

      const headlines = await InsightModule.getHeadline(month);
      setHeadline(headlines);
      if (headlines.message !== null) {
        setHeadline(headlines);
      } else {
        setHeadline(null);
      }

      const opinions = await InsightModule.getOpinion(month);
      if (opinions.message !== null) {
        setOpinion(opinions);
      } else {
        setOpinion(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeSettings = async () => {
    try {
      const response = await InsightModule.setSetting(
        plagiarism,
        positve,
        negative,
        word
      );

      if (response.message === "success") {
        alert("Settings Changed Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  var addData = line;
  for (let data = 0; data < addData.length; data++) {
    lineDay.push(parseInt(addData[data].day));
    lineTotal.push(parseInt(addData[data].count));
  }
  lineTotal.push(20);

  const labels = lineDay;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Daily News Engagement",
        fill: true,
        data: lineTotal,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        text: "Chart.js Line Chart",
      },
    },
  };
  var addPie = dataPie;
  for (let data = 0; data < 1; data++) {
    pieData.push(parseInt(addPie.positve));
    pieData.push(parseInt(addPie.negative));
    pieData.push(parseInt(addPie.neutral));
  }
  const Piedata = {
    labels: ["Positive", "Negative", "Neutral"],

    datasets: [
      {
        data: pieData,
        backgroundColor: ["#4BC0C0", "#FF6384", "rgb(255, 205, 86)"],
      },
    ],
  };

  const Pieoptions = {
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            return (sum += data);
          });
          let percentage = ((value * 100) / sum).toFixed(2) + "%";
          return percentage;
        },
        color: "white",
        labels: {
          title: {
            font: {
              size: "12",
            },
          },
        },
      },
    },
  };

  return (
    <>
      <Navigation logged={localStorage.getItem("id") ? true : false} />
      <Container>
        <SideNav />
        <div id="pdf">
          <Main>
            <ContainerCol>
              <ContainerRow>
                <h3 style={{ fontFamily: `${styles.Regular}` }}>
                  Media Monitoring Analysis
                </h3>
                <ContainerRow>
                  <TableP>Analysis Report of Month: {month} </TableP>
                  <MonthlySelect
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    {monthly.map((monthly, index) => {
                      return (
                        <MonthlyOption key={index} value={monthly.month}>
                          {monthly.month}
                        </MonthlyOption>
                      );
                    })}
                  </MonthlySelect>
                </ContainerRow>
              </ContainerRow>
              <ContainerRow>
                <Card>
                  News Published <b>{media.approvedcount}</b>
                </Card>
                <Card>
                  For Publication <b>{media.reviewcount}</b>
                </Card>
                <Card style={{ backgroundColor: `${styles.LightGray}` }}>
                  Overall News <b>{media.totalnews}</b>
                </Card>
                <Card style={{ backgroundColor: `${styles.LightGray}` }}>
                  Monthly Visitors <b>{media.totalvisited}</b>
                </Card>
              </ContainerRow>
              <br />
              <ContainerCol>
                <ContainerRow>
                  <InsightHead>
                    Daily News Engagement: <b>{month}</b>{" "}
                  </InsightHead>
                  <ContainerRow>
                    <span>Download Monthly &nbsp;</span>
                    <MyPDF
                      month={month}
                      newspublished={media.approvedcount}
                      forpublication={media.reviewcount}
                      totalnews={media.totalnews}
                      totalvisited={media.totalvisited}
                      line={line}
                      positve={dataPie.positve}
                      negative={dataPie.negative}
                      neutral={dataPie.neutral}
                      headline={headline}
                    />
                  </ContainerRow>
                </ContainerRow>

                <DataBox>
                  <Line
                    data={data}
                    options={options}
                    style={{
                      margin: "auto",
                      height: "auto",
                      width: "100%",
                    }}
                  />
                </DataBox>
              </ContainerCol>
              <br />
              <InsightHead>Most Headline Engaged</InsightHead>
              <DataBox>
                <Table>
                  <thead>
                    <TableRow>
                      <TableHead>Headline</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Author</TableHead>

                      <TableHead>Date</TableHead>
                      <TableHead>Visitor</TableHead>
                      <TableHead>Visit</TableHead>
                    </TableRow>
                  </thead>
                  <tbody>
                    {headline !== null ? (
                      headline &&
                      headline.map((news, index) => {
                        return (
                          <TableRow key={index}>
                            <TableData style={{ textAlign: "left" }}>
                              {news.headline}
                            </TableData>
                            <TableData>{news.category}</TableData>
                            <TableData>{news.author}</TableData>
                            <TableData>{news.date}</TableData>
                            <TableData>{news.visitor}</TableData>
                            <TableData
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                navigate(`/story/${news.headline}`)
                              }
                            >
                              Visit
                            </TableData>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableData>No data Collected</TableData>
                      </TableRow>
                    )}
                  </tbody>
                </Table>
                <br />
              </DataBox>

              <ContainerRow>
                <h3 style={{ fontFamily: `${styles.Regular}` }}>
                  Insight Analysis
                </h3>

                <TableP>
                  Positive:
                  {opinion
                    ? Object.keys(
                        opinion.filter(
                          (insight) => insight.sentiment === "true"
                        )
                      ).length
                    : 0}
                  comment/s Collected
                </TableP>

                <TableP>
                  Negative:
                  {opinion
                    ? Object.keys(
                        opinion.filter(
                          (insight) => insight.sentiment === "false"
                        )
                      ).length
                    : 0}
                  comment/s Collected
                </TableP>
              </ContainerRow>

              <InsighTable>
                <Table>
                  <thead>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Comment</TableHead>
                      <TableHead>Sentiment</TableHead>
                      <TableHead>Headline</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>View</TableHead>
                    </TableRow>
                  </thead>
                  <tbody>
                    {opinion !== null ? (
                      opinion.map((insight, index) => {
                        return (
                          <TableRow key={index}>
                            <TableData style={{ textAlign: "left" }}>
                              {insight.name}
                            </TableData>
                            <TableData style={{ textAlign: "left" }}>
                              {insight.comment}
                            </TableData>
                            <TableData>
                              {insight.sentiment === "true"
                                ? "Positive"
                                : "Negative"}
                            </TableData>
                            <TableData style={{ textAlign: "left" }}>
                              {insight.headline}
                            </TableData>
                            <TableData>{insight.date}</TableData>
                            <TableData
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                navigate(`/story/${insight.headline}`)
                              }
                            >
                              Visit
                            </TableData>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableData>No data Collected</TableData>
                      </TableRow>
                    )}
                  </tbody>
                </Table>
              </InsighTable>
            </ContainerCol>
          </Main>
        </div>
        <RightPanel>
          <Box>
            <DataH6>Sentiment Analysis Graph of News</DataH6>
            <Doughnut
              options={Pieoptions}
              data={Piedata}
              style={{
                height: "auto",
                width: "100%",
                boxSizing: "content-box",
              }}
              plugins={[ChartDataLabels]}
            />
          </Box>
          <LowerBox>
            <DataH6>Plagiarism and Sentiment Rate</DataH6>
            <RateSection>
              <TableP>Plagiarism:</TableP>
              <InputNumber
                value={plagiarism}
                type="number"
                max={15.0}
                min={0}
                onChange={(e) => setPlagiarism(e.target.value)}
                required
              />
            </RateSection>
            <RateSection>
              <TableP>Positive:</TableP>
              <InputNumber
                type="number"
                min="0"
                max="100"
                pattern="\d*"
                value={positve}
                onChange={(e) => {
                  const inputValue = parseInt(e.target.value);
                  if (!isNaN(inputValue)) {
                    setPositive(Math.max(inputValue, 0));
                  }
                }}
                required
              />
              <TableP>Negative:</TableP>
              <InputNumber
                type="number"
                pattern="-\d*"
                max={0}
                min={-100}
                value={negative}
                onChange={(e) => {
                  const inputValue = parseInt(e.target.value);
                  if (!isNaN(inputValue)) {
                    setNegative(Math.min(inputValue, 0));
                  }
                }}
                required
              />
            </RateSection>
            <RateSection>
              <TableP>Word Limit:</TableP>
              <InputNumber
                type="number"
                pattern="-\d*"
                min={50}
                value={word}
                onChange={(e) => {
                  setWord(e.target.value);
                }}
              />
            </RateSection>
            <BtnSave onClick={changeSettings}>Change</BtnSave>
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
  background-color: #f5f5f5;
  background-size: cover;
  flex-direction: row;
  display: flex;
  justify-content: center;
  min-width: 1524px;
  margin: auto;
`;

const RateSection = styled.section`
  display: flex;
  flex-direction: row;
`;

const ContainerCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
`;
const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Main = styled.main`
  width: 919px;
  height: 624px;
  background-color: ${styles.White};
  padding: 29px;
  text-align: left;
  border-radius: 10px;
  margin: 88px 21px 0px 20px;
  overflow: auto;
`;
export const RightPanel = styled.article`
  position: relative;
  width: 256px;
  height: 85vh;
  margin-top: 88px;
  margin-right: 28px;
  position: relative;
  right: 0;
`;

export const Box = styled.div`
  position: relative;
  width: 100%;
  height: 370px;
  background-color: ${styles.White};
  border-radius: 10px;
  padding: 18px 16px;
  text-align: left;
`;
export const InputNumber = styled.input`
  width: 50px;
  height: 25px;
  font-family: ${styles.Regular};
  margin-left: 5px;
`;
export const LowerBox = styled.div`
  width: 100%;
  height: 205px;
  background-color: ${styles.White};
  border-radius: 10px;
  padding: 18px 19px;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
`;

const Card = styled.section`
  width: 214px;
  height: 64px;
  background-color: ${styles.Dark};
  margin: 0px 3px;
  border-radius: 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  color: ${styles.White};
  font-family: ${styles.Medium};
  font-size: 14px;
`;
const DataBox = styled.div`
  height: auto;
  min-height: 300px;
  width: 100%;
  border: 0.1px solid #d8d8d8;
  margin: 4px 2px;
  overflow: auto;
`;
const InsighTable = styled.div`
  height: 228px;
  max-height: 228px;
  overflow: auto !important;
  width: 100%;
  border: 0.1px solid #d8d8d8;
`;

const TableP = styled.p`
  font-size: 14px;
  font-family: ${styles.Regular};
`;

const InsightHead = styled.h5`
  font-size: 24px;
  font-family: ${styles.Regular};
`;

const DataH6 = styled.h6`
  color: ${styles.Dark};
  font-size: 12px;
  font-family: ${styles.Medium};
  text-align: left;
  line-height: 18px;
`;

const MonthlySelect = styled.select`
  width: 120px;
  height: 28px;
  border-bottom: 0.5px solid ${styles.LightGray};
  font-family: ${styles.Regular};
  margin-bottom: 14px;
  margin-left: 10px;
  font-size: 14px;
`;
const MonthlyOption = styled.option`
  text-align: center;
  font-family: ${styles.Regular};
  font-size: 14px;
`;
export const Table = styled.table`
  width: 100%;
`;
export const TableHead = styled.th`
  font-size: 14px;
  padding: 8px;
  font-family: ${styles.Regular};
  color: ${styles.Dark};
  text-align: center;
`;
export const TableRow = styled.tr`
  height: 0px;
`;
export const TableData = styled.td`
  font-size: 14px;
  padding: 4px;
  text-align: center;
  break-word: break-word;
  font-family: ${styles.Regular};
  color: ${styles.Dark};
  border-left: 0.1px solid ${styles.LightGray};
`;

const BtnSave = styled.button`
  position: relative;
  height: 54px;
  width: 115px;
  border-radius: 3px;
  border: none;
  border-radius: 4px;
  background-color: ${styles.Dark};
  color: ${styles.White};
  font-size: 12px;
  font-family: ${styles.Regular};
`;

export default Insight;
