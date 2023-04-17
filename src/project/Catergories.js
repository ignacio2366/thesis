import { useState, useEffect } from "react";
import CategoryModule from "../service/categoryApi";
import Button from "@mui/material/Button";
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
import EditCategory from "./layout/EditCategory";
import * as T from "../components/Tables";
import { useNavigate } from "react-router-dom";
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
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [addCategory, setAddCategory] = useState({
    name: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAddCategory({ [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("name", addCategory.name);

    try {
      const response = await CategoryModule.addCategory(addCategory.name);

      const result = JSON.parse(response);
      if (result[0].message === "success") {
        setOpen(false);
        setError(false);
      } else {
        setError(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

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
          border: "0px",
          margin: "15px 0px",
        }}
      >
        <AddBoxIcon /> Add Category
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <DialogTitle>Add Categories</DialogTitle>
          <DialogContent>
            {error && (
              <h6
                style={{
                  color: `${styles.Negative}`,
                  backgroundColor: `#ffdada`,
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                The Category is Existing
              </h6>
            )}
            <DialogContentText>
              Categories must consist eight to twelve categories
            </DialogContentText>
            <CategoriesField
              label="Category Name"
              type="text"
              max={12}
              name="name"
              onChange={handleChange}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

// PIE
// const data = {
//   labels: ['Red', 'Green', 'Yellow'],
//   datasets: [{
//     data: [300, 50, 100],
//     backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
//     hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
//   }]
// };

// const options = {
//   plugins: {
//     datalabels: {
//       formatter: (value, ctx) => {
//         let sum = 0;
//         let dataArr = ctx.chart.data.datasets[0].data;
//         dataArr.map(data => {
//           sum += data;
//         });
//         let percentage = (value*100 / sum).toFixed(2)+"%";
//         return percentage;
//       },
//       color: 'white',
//       labels: {
//         title: {
//           font: {
//             size: '16'
//           }
//         }
//       }
//     }
//   }
// };

// Chart Js
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
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
  const [category, setCategory] = useState([]);
  var datacounts = [];
  var datalabels = [];

  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      getLogged();
      getCategory();
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, [category]);

  const getLogged = () => {
    if (
      !localStorage.getItem("id") ||
      localStorage.getItem("type") !== "admin"
    ) {
      navigate("/login");
    }
  };

  const getCategory = async () => {
    const response = await CategoryModule.getCategoriesRecord();
    setCategory(JSON.parse(response));
  };

  ChartJS.defaults.color = "black";
  const options = {
    legend: {
      display: false,
    },
    scale: {
      ticks: {
        beginAtZero: true,
      },
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var label = data.labels[tooltipItem.index];
          var value =
            data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          return label + ": " + value;
        },
      },
    },
    plugins: {
      labels: {
        render: function (args) {
          return args.value + "\n" + args.label;
        },
        fontColor: "#000",
        position: "end",
        overlap: true,
      },
    },
  };
  var addData = category;
  for (let i = 0; i < addData.length; i++) {
    datacounts.push(parseInt(addData[i].visitor));
    datalabels.push(addData[i].name);
  }

  const data = {
    labels: datalabels,
    datasets: [
      {
        label: "Total News Engagement",
        data: datacounts,
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
          "rgba(122, 255, 64)",
        ],
        borderWidth: 0.5,
      },
    ],
  };

  return (
    <>
      <Navigation logged={localStorage.getItem("id") ? true : false} />
      <Container>
        <SideNav />
        <Main>
          <h3 style={{ fontFamily: `${styles.Regular}` }}>Category Table</h3>
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
                    <T.TableHead>Category Name</T.TableHead>
                    <T.TableHead>Published</T.TableHead>
                    <T.TableHead>Status</T.TableHead>
                    <T.TableHead>Action</T.TableHead>
                  </tr>
                </thead>
                <T.TableBody>
                  {category.map((category, index) => {
                    return (
                      <tr key={index}>
                        <T.TableData>{category.name}</T.TableData>
                        <T.TableData>{category.count}</T.TableData>
                        <T.TableData>{category.status}</T.TableData>
                        <T.TableData>
                          <EditCategory id={category.no} name={category.name} />
                        </T.TableData>
                      </tr>
                    );
                  })}
                </T.TableBody>
              </T.Table>
            </DataBox>
            <DataBox>
              <PolarArea
                data={data}
                options={options}
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
const CategoriesField = styled.input`
  width: 100%;
  height: 42px;
  margin-top: 10px;
  background-color: #fffff;
  border: 1px solid #000000;
  border-radius: 5px;
  padding-left: 8px;
  font-family: ${styles.Regular};
`;

const DataBox = styled.div`
  height: 420px;
  width: 100%;
  border: 0.1px solid #d8d8d8;
  overflow-y: auto;
`;
const RightPanel = styled.article`
  position: relative;
  width: 256px;
  height: 85vh;
  margin-top: 88px;
  margin-right: 0px;
  position: relative;
  right: 0;
`;

export default Categories;
