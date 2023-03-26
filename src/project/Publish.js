import { useEffect, useState } from "react";
import * as T from "../components/Tables";
import styled from "styled-components";
import styles from "../components/styles";
import Navigation from "../components/Navigation";
import SideNav from "./layout/SideNav";
import DialogNews from "../project/layout/DialogNews";
import { useNavigate } from "react-router-dom";
import PublishedModule from "../service/publishedApi";

const Publish = () => {
  const [publish, setPublish] = useState([]);
  const [filter, setFilter] = useState("For Review");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      getLogged();
      search === "" ? getPublished(filter) : initSearch(search);
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, [search, filter]);

  const getLogged = () => {
    if (
      !localStorage.getItem("id") ||
      localStorage.getItem("type") !== "admin"
    ) {
      navigate("/login");
    }
  };

  const getPublished = async (filter) => {
    try {
      const response = await PublishedModule.getPublished(filter);
      const result = JSON.parse(response);

      if (result[0].message !== null) {
        setPublish(result);
      } else {
        setPublish(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initSearch = async (search) => {
    const response = await PublishedModule.getSearch(search);
    const result = JSON.parse(response);

    if (result[0].message !== null) {
      setPublish(result);
    } else {
      setPublish(null);
    }
  };
  return (
    <>
      <Navigation logged={localStorage.getItem("id") ? true : false} />
      <Container>
        <SideNav />
        <Main>
          <h3 style={{ fontFamily: `${styles.Regular}` }}>
            Publication News Table
          </h3>

          <SearchInput
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            name="search"
            placeholder="Search Headline"
          />
          <OverLabel>Filter By:</OverLabel>
          <CategorySelect
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <CategotyOption value="all"> All</CategotyOption>
            <CategotyOption value="For Review">For Review</CategotyOption>
            <CategotyOption value="Approved">Approved</CategotyOption>
            <CategotyOption value="Rejected">Rejected</CategotyOption>
          </CategorySelect>
          <T.TableBox>
            <T.Table>
              <thead>
                <T.TableRow>
                  <T.TableHead>News ID</T.TableHead>
                  <T.TableHead>Categories</T.TableHead>
                  <T.TableHead>Headline</T.TableHead>
                  <T.TableHead>Date</T.TableHead>
                  <T.TableHead>Status</T.TableHead>
                  <T.TableHead>Review</T.TableHead>
                </T.TableRow>
              </thead>
              <T.TableBody>
                {publish !== null ? (
                  publish.map((data, index) => {
                    return (
                      <T.TableRow key={index}>
                        <T.TableData>{data.id}</T.TableData>
                        <T.TableData>{data.category}</T.TableData>
                        {data.headline && (
                          <T.TableData>
                            {data.headline.slice(0, 40)}...
                          </T.TableData>
                        )}

                        <T.TableData>{data.datestart}</T.TableData>
                        <T.TableData>{data.status}</T.TableData>

                        {data.image && (
                          <T.TableData>
                            <DialogNews
                              id={data.id}
                              content={data.contenttag}
                              headline={data.headline}
                              sentiment={data.sentiment}
                              sentimentrate={data.sentimentrate}
                              plagiarizerate={data.plagiarismrate}
                              categories={data.category}
                              date={data.datestart}
                              status={data.status}
                              remarks={data.remarks}
                              action={data.action}
                              author={data.author}
                              oversentiment={data.oversentiment}
                              source={data.source}
                              image={data.image.replace(
                                "C:/xampp/htdocs",
                                "http://localhost"
                              )}
                            />
                          </T.TableData>
                        )}
                      </T.TableRow>
                    );
                  })
                ) : (
                  <T.TableRow>
                    <T.TableData></T.TableData>

                    <T.TableData> </T.TableData>
                    <T.TableData> No News Result: {filter}</T.TableData>
                    <T.TableData></T.TableData>
                    <T.TableData></T.TableData>
                  </T.TableRow>
                )}
              </T.TableBody>
            </T.Table>
          </T.TableBox>
        </Main>
        <RightPanel></RightPanel>
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
  max-height: 584px;
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
  height: 85vh;
  margin-top: 88px;
  margin-right: 28px;
  position: relative;
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

const CategorySelect = styled.select`
  float: left;
  width: 175px;
  height: 29px;
  border: 0.5px solid #a5a5a5;
  font-family: ${styles.Regular};
  margin-top: 14px;
  margin-bottom: 10px;
`;

const CategotyOption = styled.option`
  text-align: center;
  font-family: ${styles.Regular};
`;

export const SearchInput = styled.input`
  margin-top: 14px;
  font-family: ${styles.Regular};
  height: 30px;
  width: 211px;
  background-color: #f2f2f2;
  color: ${styles.Dark};
  border: 0 solid ${styles.LightGray};
  float: right;
  padding-left: 10px;
`;

const OverLabel = styled.h5`
  color: ${styles.LightGray};
  font-family: ${styles.Regular};
  line-height: auto;
  float:left;
  margin-top: 14px;
 margin-right 10px;
`;
export default Publish;
