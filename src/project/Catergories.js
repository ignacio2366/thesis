import * as React from "react";

import styled from "styled-components";
import styles from "../components/styles";
import Navigation from "../components/Navigation";
import SideNav from "./layout/SideNav";
import FormDialog from "../components/FormDialog";
import Button from "@mui/material/Button";

import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const Categories = () => {
  ChartJS.defaults.font.size = "16px";
  ChartJS.defaults.set("plugins.datalabels", {
    color: "#FFFFFF",
  });

  const data = {
    labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Navigation logged={true} />
      <Container>
        <SideNav />
        <Main>
          <h3 style={{ fontFamily: `${styles.SemiBold}` }}>Category Table</h3>
          <FormDialog />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <DataBox>
              <CategorieTbl>
                <thead>
                  <tr>
                    <CatHeader>#</CatHeader>
                    <CatHeader>Category Name</CatHeader>
                    <CatHeader>Published Counts</CatHeader>
                    <CatHeader>Status</CatHeader>
                  </tr>
                </thead>

                <CatBody>
                  <tr>
                    <td>1</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>
                      <Button variant="outlined">Edit</Button>
                      <Button variant="outlined" color="error">
                        InActive
                      </Button>
                    </td>
                  </tr>
                </CatBody>
              </CategorieTbl>
            </DataBox>

            <DataBox>
              <Pie
                data={data}
                plugins={[ChartDataLabels]}
                style={{
                  margin: "auto",
                  height: "100%",
                  width: "100%",
                }}
              />
            </DataBox>
          </div>
        </Main>
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
  justify-content: space-between;
`;

const Main = styled.main`
  width: 100%;
  height: 620px;
  background-color: ${styles.White};
  padding: 29px;
  text-align: left;
  border-radius: 10px;
  margin: 88px 41px 0px 20px;
`;

const CategorieTbl = styled.table`
  width: 100%;
  height: auto;
  overflow: auto;
  text-align: center;
`;
const CatHeader = styled.th`
  font-size: 1rem;
  font-family: ${styles.Bold};
  color: ${styles.LightGray};
`;
const CatBody = styled.tbody`
  margin: 0;
  height: auto;
  letter-spacing: center;
  color: ${styles.Dark};
`;

const DataBox = styled.div`
  height: 420px;
  width: 100%;
  border: 0.1px solid #d8d8d8;
`;

export default Categories;
