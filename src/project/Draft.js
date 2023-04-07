
import { useState, useEffect } from "react";
import * as T from "../components/Tables";
import styled from "styled-components";
import styles from "../components/styles";
import Navigation from "../components/Navigation";
import SideNav from "./layout/SideNav";
import { useNavigate, Link } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import DraftModule from "../service/draftApi";
import { Draftmodal } from "./layout/Draftmodal";

function Draft() {
  const navigate = useNavigate();
  const [Draftnews, setDraftnews] = useState([]);
  var date = new Date();

  useEffect(() => {
    const intervalId = setInterval(() => {
      getLogged();
      getDraft();
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const getLogged = () => {
    if (
      !localStorage.getItem("id") ||
      localStorage.getItem("type") !== "user"
    ) {
      navigate("/login");
    }
  };

  const getDraft = async () => {
    const response = await DraftModule.getDraft();
    const result = JSON.parse(response);

    if (result.message !== null) {
      setDraftnews(JSON.parse(response));
    } else {
      setDraftnews(null);
    }
  };

  const convertDate = (date) => {
    const newDate = new Date(date);
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour12: true,
    });

    return formatter.format(newDate);
  };

  var dateString = date.toLocaleString("en-us", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <Navigation logged={localStorage.getItem("id") ? true : false} />
      <Container>
        <SideNav />
        <Main>
          <h3 style={{ fontFamily: `${styles.Regular}` }}>Drafted News</h3>
          <T.TableBox>
            <T.Table>
              <thead>
                <T.TableRow>
                  <T.TableHead>News No</T.TableHead>
                  <T.TableHead>Title</T.TableHead>
                  <T.TableHead>Date</T.TableHead>
                  <T.TableHead>Source</T.TableHead>
                  <T.TableHead>Write</T.TableHead>
                  <T.TableHead>View</T.TableHead>
                </T.TableRow>
              </thead>
              <tbody>
                {Draftnews !== null ? (
                  Draftnews.map((data, index) => {
                    return (
                      <T.TableRow key={index}>
                        <T.TableData>{data.id}</T.TableData>
                        <T.TableData>
                          {data.title ? data.title : data.headline}
                        </T.TableData>

                        <T.TableData>{convertDate(data.datestart) === dateString? "Today": data.datestart}</T.TableData>
                        <T.TableData>
                          {data.count > 0 ? data.count : "Main"} Sources
                        </T.TableData>
                        <T.TableData>
                          <WriteLink to={`/writer/${data.title}`}>
                            <CreateIcon />
                          </WriteLink>
                        </T.TableData>
                        <T.TableData>
                          <Draftmodal title={data.title} />
                        </T.TableData>
                      </T.TableRow>
                    );
                  })
                ) : (
                  <T.TableRow>
                    <T.TableData></T.TableData>
                    <T.TableData> </T.TableData>
                    <T.TableData> No News Drafted</T.TableData>
                    <T.TableData></T.TableData>
                    <T.TableData></T.TableData>
                  </T.TableRow>
                )}
              </tbody>
            </T.Table>
          </T.TableBox>
        </Main>
        <RightPanel></RightPanel>
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

const WriteLink = styled(Link)`
  color: ${styles.Dark};
`;
const RemoveBtn = styled.button`
  color: ${styles.Cherry};
  background-color: transparent;
  border: none;
`;

export default Draft;
