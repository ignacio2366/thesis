import { useEffect, useState } from "react";
import * as T from "../components/Tables";
import styled from "styled-components";
import styles from "../components/styles";
import Navigation from "../components/Navigation";
import SideNav from "./layout/SideNav";
import DialogNews from "../project/layout/DialogNews";
import { dataPublish } from "../api/mockPublished";
import { useNavigate } from "react-router-dom";


const Publish = () => {
  const navigate = useNavigate();
  useEffect(() => {
    getLogged();
  });

  const getLogged = () => {
    !localStorage.getItem("id")
      ? navigate("/login")
      : console.log(localStorage.getItem("id"));
  };
  return (
    <>
      <Navigation logged={localStorage.getItem("id") ? true : false} />
      <Container>
        <SideNav />
        <Main>
          <h3 style={{ fontFamily: `${styles.SemiBold}` }}>
            Published News Table
          </h3>
          <T.Table>
            <thead>
              <tr>
                <T.TableHead>News ID</T.TableHead>
                <T.TableHead>Categories</T.TableHead>
                <T.TableHead>Headline</T.TableHead>
                <T.TableHead>Date</T.TableHead>
                <T.TableHead>Status</T.TableHead>
                {localStorage.getItem('type') === 'admin' && <>
                  <T.TableHead>Review</T.TableHead>
                </>}
                {localStorage.getItem('type') === 'user' && <>
                  <T.TableHead>Remarks</T.TableHead>
                </>}

              </tr>
            </thead>
            <T.TableBody>
              {dataPublish.map((data) => {
                return (
                  <>
                    <tr>
                      <T.TableData>{data.id}</T.TableData>
                      <T.TableData>{data.categories}</T.TableData>
                      <T.TableData>{data.headline.slice(0, 40)}...</T.TableData>
                      <T.TableData>{data.date}</T.TableData>
                      <T.TableData>{data.status}</T.TableData>
                      {localStorage.getItem('type') === 'admin' && <>
                        <T.TableData>
                          <DialogNews
                            id={data.id}
                            content={data.content}
                            headline={data.headline}
                            sentiment={data.sentiment}
                            sentimentrate={data.sentimentrate}
                            plagiarizerate={data.plagiarizerate}
                            categories={data.categories}
                            date={data.date}
                            status={data.status}
                            remarks={data.remarks}
                            action={data.action}
                            author={data.author}
                            oversentiment={data.oversentiment}
                            source={data.source}
                            image={data.image}
                          />
                        </T.TableData></>}

                      {localStorage.getItem('type') === 'user' && <>
                        <T.TableData>{data.remarks}</T.TableData>

                      </>}

                    </tr>
                  </>
                );
              })}
            </T.TableBody>
          </T.Table>
        </Main>
        <RightPanel>
          <Box>aw</Box>
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

export default Publish;
