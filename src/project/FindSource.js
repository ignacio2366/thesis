import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import styles from "../components/styles";
import * as List from "../components/NewsList";
import Navigation from "../components/Navigation";
import * as Wrapper from "../static/Home";
import { SourcesData } from "../api/mockNews";
import Button from "@mui/material/Button";
import SideNav from "./layout/SideNav";
import Select from "react-select";
import { Copyrights, catList } from "../api/mockSources";
import $ from "jquery";
import PushPinIcon from "@mui/icons-material/PushPin";
import ClearIcon from "@mui/icons-material/Clear";
import DraftModule from "../service/draftApi";
import { useNavigate } from "react-router-dom";
import HelperUtils from "../service/helper";
const FindSource = () => {
  const [News, setNews] = useState([SourcesData]);
  const [selectedOptions, setSelectedOptions] = useState();
  const [selectedBlock, setselectedBlock] = useState();
  const [selectTopic, setselectTopic] = useState();
  const [total, setTotal] = useState(0);
  const [checkbox, setcheckbox] = useState(false);

  // Save Cite
  const [selectedSources, setSelectedSources] = useState([]);
  const [Cited, setCited] = useState("");
  const [setChecked] = useState(false);

  // Forms of Search
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("");
  const [block, setBlock] = useState();
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("EN");
  const [datefrom, setDatefrom] = useState();
  const [dateto, setDateto] = useState();

  const today = new Date().toISOString().split("T")[0];
  const optionList = Copyrights.map((website) => {
    return { value: website, label: website };
  });
  const navigate = useNavigate();

  useEffect(() => {
    initLatestNews();
  }, []);

  const getLogged = useCallback(() => {
    if (
      !localStorage.getItem("id") ||
      localStorage.getItem("type") !== "user"
    ) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    getLogged();
  }, [getLogged]);
  const initLatestNews = () => {
    setNews([SourcesData]);

    $.ajax({
      url: `https://api.newscatcherapi.com/v2/latest_headlines`,
      data: {
        countries: "PH",
        lang: "EN",
        page: 1,
      },
      method: "GET",
      dataType: "json",
      headers: {
        "x-api-key": "dr4SSsT166NqpieYC8lEy9mzuQP6m_KvOiWQ0dCnQhg",
      },
      success: (data) => {
        setNews([data]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  // Function triggered on selection for Selection
  function handleSelect(data) {
    setSelectedOptions(data);
    const selectedOptions = data.map((options) => options.value).join(",");
    setSource(selectedOptions);
  }
  // Blocker
  function handleBlock(data) {
    setselectedBlock(data);
    const selectedOptions = data.map((options) => options.value).join(",");

    setBlock(selectedOptions);
  }
  // Topic
  function handleTopic(data) {
    setselectTopic(data);

    const selectedOptions = data["value"];
    setCategory(selectedOptions);
  }

  // Date From
  function handleDateFromChange(e) {
    const selectedDate = new Date(e.target.value);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}/${month}/${day}`;

    setDatefrom(formattedDate);
  }

  // Date to
  function handleDateTOChange(e) {
    const selectedDate = new Date(e.target.value);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}/${month}/${day}`;
    setDateto(formattedDate);
  }

  function Submit(event) {
    event.preventDefault();
    const data = {};
    data.lang = language;

    if (search !== "") {
      data.q = search;
      if (source !== "") {
        data.sources = source;
      }
      if (category !== "") {
        data.topic = category;
      }
      if (block !== undefined) {
        data.not_sources = block;
      }
      if (dateto !== undefined) {
        data.to = dateto;
      }
      if (datefrom !== undefined) {
        data.from = datefrom;
      }

      $.ajax({
        url: `https://api.newscatcherapi.com/v2/search?`,
        data: data,
        method: "GET",
        dataType: "json",
        headers: {
          "x-api-key": "dr4SSsT166NqpieYC8lEy9mzuQP6m_KvOiWQ0dCnQhg",
        },
        success: (data) => {
          if (data.status === "ok") {
            setNews([data]);
            setTotal(Object.keys(data.articles).length);
            setcheckbox(true);
          } else {
            setNews(null);
            setTotal(0);
            setcheckbox(false);
            setSelectedSources(null);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      if (source !== "") {
        data.sources = source;
      }
      if (block !== undefined) {
        data.not_sources = block;
      }
      if (category !== "") {
        data.topic = category;
      }
      data.countries = "PH";
      $.ajax({
        url: `https://api.newscatcherapi.com/v2/latest_headlines`,
        data: data,
        method: "GET",
        dataType: "json",
        headers: {
          "x-api-key": "dr4SSsT166NqpieYC8lEy9mzuQP6m_KvOiWQ0dCnQhg",
        },
        success: (data) => {
          setNews([data]);
          setTotal(Object.keys(data.articles).length);
          setcheckbox(false);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  const convertDate = (date) => {
    const newDate = new Date(date);
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return formatter.format(newDate);
  };

  const saveCites = async (event) => {
    event.preventDefault();

    try {
      await DraftModule.addDraftNews(Cited, localStorage.getItem("id"));
    } catch (e) {
      console.error(e);
    }

    selectedSources.forEach(async (news) => {
      const data = new FormData();
      data.append("cite", Cited);
      data.append("rights", news.rights);
      data.append("url", news.url);
      data.append("headline", news.title);
      data.append("date", news.date);
      data.append("author", news.author);
      data.append("summary", news.summary);
      data.append("authorId", localStorage.getItem("id"));

      try {
        await DraftModule.addSources(data);
      } catch (error) {
        console.log(error);
      }
    });

    alert("The sources have been added successfully");
    window.location.reload();
  };

  const resetCites = () => {
    setCited("");
    setSelectedSources([]);
    setTotal(0);
    setChecked(false);
  };
  return (
    <>
      <Navigation logged={localStorage.getItem("id") ? true : false} />
      <Container>
        <Wrapper.SearchBar>
          <h5 style={{ fontFamily: `${styles.Regular}` }}>
            {total || ""} Sources Collected
          </h5>
          <LowerBox>
            <CiteLabel>
              Save &nbsp;
              <b>
                {selectedSources ? Object.keys(selectedSources).length : 0}
                cited Selected as
              </b>
            </CiteLabel>
            <form onSubmit={saveCites}>
              <CiteTitle
                type="text"
                value={Cited}
                onChange={(e) => setCited(e.target.value)}
                placeholder="Write the Cite Title"
                required
              />
              <SaveBtn
                type="submit"
                disabled={
                  !selectedSources || Object.keys(selectedSources).length < 2
                    ? true
                    : false
                }
                isGray={
                  !selectedSources || Object.keys(selectedSources).length < 2
                    ? true
                    : false
                }
              >
                <PushPinIcon />
              </SaveBtn>
              <ClearBtn type="reset" onClick={resetCites}>
                <ClearIcon />
              </ClearBtn>
            </form>
          </LowerBox>
        </Wrapper.SearchBar>
        <LeftPanel>
          <SideNav />
        </LeftPanel>
        <Wrapper.Main>
          {News !== null ? (
            News.map((data, index) => {
              return (
                <div key={index}>
                  {data &&
                    data?.articles.map(
                      (news, id) =>
                        news.rights &&
                        news.topic &&
                        news.author &&
                        news.summary && (
                          <List.Wrapper key={id}>
                            {checkbox && (
                              <>
                                <SelectBox
                                  type="checkbox"
                                  value={news.rights}
                                  checked={selectedSources.some(
                                    (source) => source.url === news.link
                                  )}
                                  onChange={(e) => {
                                    const source = {
                                      title: news.title,
                                      summary: news.summary,
                                      url: news.link,
                                      rights: news.rights,
                                      author: news.author,
                                      date: convertDate(news.published_date),
                                    };
                                    if (e.target.checked) {
                                      setSelectedSources([
                                        ...selectedSources,
                                        source,
                                      ]);
                                    } else {
                                      setSelectedSources(
                                        selectedSources.filter(
                                          (s) => s.url !== source.url
                                        )
                                      );
                                    }
                                  }}
                                />
                                <p
                                  style={{ float: "right", margin: "8px 0px" }}
                                >
                                  Add source
                                </p>
                              </>
                            )}
                            <List.Headline>
                              <List.Title>
                                {" "}
                                {id}) {news.title}
                              </List.Title>
                            </List.Headline>
                            <List.Side>
                              <List.Category>
                                {news.topic.toUpperCase()}
                              </List.Category>
                              <br />
                              <List.Date>
                                Date {convertDate(news.published_date)}
                              </List.Date>
                            </List.Side>
                            <List.Content>
                              {HelperUtils.shortHundredWords(news.summary)} ...
                              view more
                            </List.Content>
                            <List.Image
                              src={news.media}
                              alt="The Images is Forbidden to Display. The server may have detected suspicious or malicious activity from the requester's IP address and is blocking access to prevent further damage. "
                            />
                            <List.Cite>
                              Author: <b>{news.author}</b>
                              &nbsp;&nbsp;&nbsp;&nbsp; Copyright & Source:
                              &nbsp;
                              <b>{news.rights.slice(0, 20)}</b>
                            </List.Cite>
                            <List.Options>
                              <Button
                                style={{
                                  float: "right",
                                  backgroundColor: `${styles.Dark}`,
                                }}
                                size="large"
                                variant="contained"
                                color="info"
                                onClick={() => window.open(news.link)}
                              >
                                Visit
                              </Button>
                            </List.Options>
                          </List.Wrapper>
                        )
                    )}
                </div>
              );
            })
          ) : (
            <>
              <List.Wrapper>
                <h4
                  style={{
                    color: `${styles.Gray}`,
                    textAlign: "center",
                    fontFamily: `${styles.Regular}`,
                  }}
                >
                  No News Collected
                </h4>
              </List.Wrapper>
            </>
          )}
        </Wrapper.Main>

        <Wrapper.RightPanel>
          <Box>
            <OptionLabel>Select Sources</OptionLabel>
            <form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={Submit}
            >
              <Select
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: "#ffdddd",
                    primary: "#616B7D",
                  },
                })}
                className="my-select"
                options={optionList}
                placeholder="Sources List"
                value={selectedOptions}
                onChange={handleSelect}
                isSearchable={true}
                isMulti
              />
              <OptionLabel>Exclude Source</OptionLabel>
              <Select
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: "#ffdddd",
                    primary: "#616B7D",
                  },
                })}
                className="my-select"
                options={optionList}
                placeholder="Sources List"
                value={selectedBlock}
                onChange={handleBlock}
                isSearchable={true}
                isMulti
              />
              <OptionLabel>Select Topic</OptionLabel>

              <Select
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: "#ffdddd",
                    primary: "#616B7D",
                  },
                })}
                className="my-select"
                options={catList}
                placeholder="Sources Topic"
                value={selectTopic}
                onChange={handleTopic}
                isSearchable={true}
              />
              <OptionLabel>Date From</OptionLabel>
              <input
                className="datePicker"
                type="date"
                id="date"
                name="date"
                onChange={handleDateFromChange}
                max={today}
                min="2022-12-21"
              />
              <OptionLabel>Date To</OptionLabel>
              <input
                className="datePicker"
                type="date"
                id="date"
                name="date"
                onChange={handleDateTOChange}
                min="2022-12-21"
                max={today}
              />
              <br />
              <OptionLabel>Search</OptionLabel>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <OptionLabel>Language</OptionLabel>
              <div style={{ display: "flex" }}>
                <input
                  className="radioButton"
                  type="radio"
                  id="english"
                  name="language"
                  value="EN"
                  onChange={(e) => setLanguage(e.target.value)}
                />
                <label htmlFor="english">English</label>

                <input
                  className="radioButton"
                  type="radio"
                  id="tagalog"
                  name="language"
                  value="TL"
                  onChange={(e) => setLanguage(e.target.value)}
                />
                <label htmlFor="tagalog">Tagalog</label>
              </div>
              <SearchBtn type="submit">Search</SearchBtn>
            </form>
          </Box>
        </Wrapper.RightPanel>
      </Container>
    </>
  );
};

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  background-color: ${styles.WhiteSmoke};
  background-size: cover;
  display: flex;
  flex-direction: column;
  min-width: 1524px;
  margin: auto;
`;
export const Box = styled.div`
  width: 100%;
  max-height: 600px;
  background-color: ${styles.White};
  border-radius: 10px;
  padding: 18px 16px;
  text-align: left;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: auto;

  // styles.css
  .my-select {
    border-radius: 5px;
    min-width: auto;
    font-family: ${styles.Regular};
  }

  .datePicker {
    padding: 2px 8px;
    height: 42px;
    border: 0.5px solid hsl(0, 0%, 80%);
    color: ${styles.Gray};
  }

  .radioButton {
    height: 18px;
    width: 18px;
    margin: 4px 12px;
  }

  /* Conditional styling to change background color when button is disabled */
`;

export const LeftPanel = styled.aside`
  width: 256px;
  height: auto;
  position: fixed;
  left: 0;
  z-index: 999;
`;

const SelectBox = styled.input`
  height: 24px;
  width: 24px;
  float: right;
  margin: 8px;
`;

const OptionLabel = styled.p`
  color: ${styles.LightGray};
  font-family: ${styles.Regular};
  line-height: auto;
  float: left;
  padding: 0px 0px;
  margin-bottom: 8px;
`;

const SearchBtn = styled.button`
  position: relative;
  bottom: 0px;
  float: right;
  height: 32px;
  width: 115px;
  border-radius: 3px;
  border: none;
  border-radius: 4px;
  background-color: #5cb85c;
  color: ${styles.White};
  font-family: ${styles.Regular};
  margin-top: 18px;
  font-size: 0.875rem;
`;

const LowerBox = styled.div`
  position: fixed;
  right: 300px;
  width: auto;
  z-index: 999;
  background-color: ${styles.White};
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CiteLabel = styled.p`
  color: ${styles.LightGray};
  font-family: ${styles.Regular};
  line-height: auto;
  float: left;
  padding: 0px 16px;
  margin-bottom: 8px;
`;

const SaveBtn = styled.button`
  border-radius: 3px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => (props.isGray ? "gray" : styles.Cherry)};
  color: ${styles.White};
  font-family: ${styles.Regular};
  padding: 5px;
  margin: 10px;
  cursor: ${(props) => (props.isGray ? "not-allowed" : "pointer")};
  font-size: 0.875rem;
`;

const ClearBtn = styled.button`
  border-radius: 3px;
  border: none;
  border-radius: 4px;
  background-color: ${styles.Dark};
  color: ${styles.White};
  font-family: ${styles.Regular};
  padding: 5px;
  margin: 5px 25px 5px 5px;
  font-size: 0.875rem;
`;

const CiteTitle = styled.input`
  font-family: ${styles.Regular};
  font-size: 0.875rem;
  width: 150px;
  padding: 5px 10px;
  border-radius: 4px;
  border: 0.5px solid ${styles.LightGray};
`;

export default FindSource;
