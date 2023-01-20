import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import styled from "styled-components";
import styles from "../components/styles";
import Navigation from "../components/Navigation";
import SideNav from "./layout/SideNav";
import * as T from "../components/Tables";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { PolarArea } from "react-chartjs-2";

// Modal
function AddCategory() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{
          backgroundColor: "#FD5353",
          color: "white",
          border: "none",
          margin: "15px 0px",
        }}
      >
        <AddBoxIcon /> Add Categories
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Categories</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Categories must consist eight to twelve categories
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// Chart Js
ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels
);
ChartJS.defaults.set("plugins.datalabels", {
  color: "white",
  display: true,
  anchor: "center",
  labels: {
    title: {
      font: {
        weight: "600",
        size: "15px",
      },
    },
  },
});
const Categories = () => {
  ChartJS.defaults.color = "black";
  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "start",
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          font: {
            size: 14,
          },
        },
      },
    },
  };

  const data = {
    labels: [
      "Red",
      "Blue",
      "Yellow",
      "Green",
      "Purple",
      "Orange",
      "Yellow",
      "Pink",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 13, 15, 12, 13, 19, 25],
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
        ],
        borderWidth: 0.5,
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
          <AddCategory />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <DataBox>
              <T.Table>
                <thead>
                  <tr>
                    <T.TableHead>#</T.TableHead>
                    <T.TableHead>Category Name</T.TableHead>
                    <T.TableHead>Counts</T.TableHead>
                    <T.TableHead>Status</T.TableHead>
                    <T.TableHead>Action</T.TableHead>
                  </tr>
                </thead>

                <T.TableBody>
                  <tr>
                    <T.TableData>1</T.TableData>
                    <T.TableData>Sports</T.TableData>
                    <T.TableData>20</T.TableData>
                    <T.TableData>Active</T.TableData>
                    <T.TableData>
                      <Button variant="text">Edit</Button>
                    </T.TableData>
                  </tr>
                </T.TableBody>
              </T.Table>
            </DataBox>

            <DataBox>
              <PolarArea
                data={data}
                options={options}
                style={{
                  margin: "auto",
                  height: "100%",
                  width: "100%",
                }}
              />
            </DataBox>
          </div>
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
  height: 584px;
  background-color: ${styles.White};
  padding: 29px;
  text-align: left;
  border-radius: 10px;
  margin: 88px 21px 0px 20px;
`;

const DataBox = styled.div`
  height: 420px;
  width: 100%;
  border: 0.1px solid #d8d8d8;
`;
export const RightPanel = styled.article`
  position: relative;
  width: 256px;
  height: 85vh;
  margin-top: 88px;
  margin-right: 0px;
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
export default Categories;
