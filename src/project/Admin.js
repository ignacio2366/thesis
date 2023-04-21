import styled from "styled-components";
import styles from "../components/styles";
import Navigation from "../components/Navigation";
import SideNav from "./layout/SideNav";
import { useState, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AddBoxIcon from "@mui/icons-material/AddBox";
import * as T from "../components/Tables";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import EditAccount from "./layout/EditAccount";
import * as M from "./layout/Modal";
import AdminModule from "../service/adminApi";

// Add Modal
function AddUser() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [image, setImage] = useState(
    process.env.REACT_APP_PHP_URL + "/thesis/src/image/user.png"
  );
  const [user, setUser] = useState(false);
  const [category, setCategory] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    type: "",
    role: "",
    image: null,
  });

  useEffect(() => {
    getCategory();
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });

    if (event.target.value.toString() === "user") {
      setUser(true);
    }

    if (event.target.value.toString() === "admin") {
      setUser(false);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
    setFormData({
      ...formData,
      image: file,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("username", formData.username);
    data.append("type", formData.type);
    data.append("role", formData.role);
    data.append("image", formData.image, formData.image.name);

    try {
      const response = await AdminModule.addAccount(data);
      const result = await response.json();
      if (result[0].message === "success") {
        handleClose();
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const getCategory = async () => {
    const response = await AdminModule.getCategories();
    setCategory(JSON.parse(response));
  };

  const handleClose = () => {
    setOpen(false);
    setImage(process.env.REACT_APP_PHP_URL + "/thesis/src/image/user.png");
    setError(false);
    setUser(false);
  };
  function resetForm() {
    setImage(process.env.REACT_APP_PHP_URL + "/thesis/src/image/user.png");
    setError(false);
    setUser(false);
  }

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
          float: "right",
        }}
      >
        <AddBoxIcon /> Add Users
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <M.Modal>
          <M.Header>
            <M.Heading>Add Credentials</M.Heading>
          </M.Header>
          <M.Avatar src={image} />
          <M.FormField onSubmit={handleSubmit} encType="multipart/form-data">
            {error && (
              <p
                style={{
                  color: `${styles.Negative}`,
                  backgroundColor: `#ffdada`,
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                The Credential is exists.
              </p>
            )}
            <M.FormLabel>Upload Profile Picture</M.FormLabel>
            <M.TextField
              accept="image/*"
              type="file"
              name="file"
              onChange={handleImageChange}
              required
            />
            <M.FormLabel>Fullname</M.FormLabel>
            <M.TextField
              type="text"
              name="name"
              onChange={handleChange}
              required
            />
            <M.FormLabel>Username</M.FormLabel>
            <M.TextField
              text="text"
              name="username"
              onChange={handleChange}
              required
            />
            <M.FormLabel>Accessibility</M.FormLabel>
            <M.SelectField name="type" onChange={handleChange} required>
              <M.SelectOption value="">Select type of User</M.SelectOption>
              <M.SelectOption value="admin">Editor-in-Chief</M.SelectOption>
              <M.SelectOption value="user">News Writer</M.SelectOption>
            </M.SelectField>
            {user && (
              <>
                <M.FormLabel>News Writer</M.FormLabel>
                <M.SelectField name="role" onChange={handleChange} required>
                  <M.SelectOption value=" ">Select Topic</M.SelectOption>
                  {category.map((category, index) => {
                    return (
                      <M.SelectOption key={index} value={category.name}>
                        {category.name}
                      </M.SelectOption>
                    );
                  })}
                </M.SelectField>
              </>
            )}
            <M.BtnReset type="reset" onClick={resetForm}>
              Reset
            </M.BtnReset>
            <M.BtnAdd type="submit">Add Account</M.BtnAdd>
          </M.FormField>
        </M.Modal>
      </Dialog>
    </div>
  );
}

const Admin = () => {
  const [account, setAccount] = useState([]);
  const [filter, setFilter] = useState("Active");
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      getUser(filter);
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, [filter]);

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

  const getUser = async (filter) => {
    const response = await AdminModule.getUser(filter);
    setAccount(JSON.parse(response));
  };
  return (
    <>
      <Navigation logged={localStorage.getItem("id") ? true : false} />
      <Container>
        <SideNav />
        <Main>
          <h3 style={{ fontFamily: `${styles.Regular}` }}>
            Administrator Panel
          </h3>
          <OverLabel>Filter Status</OverLabel>
          <CategorySelect
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <CategotyOption value="Active">Active</CategotyOption>
            <CategotyOption value="InActive">InActive</CategotyOption>
          </CategorySelect>
          <AddUser />
          <T.Table>
            <thead>
              <tr>
                <T.TableHead>User ID</T.TableHead>
                <T.TableHead>Profile</T.TableHead>
                <T.TableHead>Name</T.TableHead>
                <T.TableHead>User Type</T.TableHead>
                <T.TableHead>Role</T.TableHead>
                <T.TableHead>Status</T.TableHead>
                <T.TableHead>Action</T.TableHead>
              </tr>
            </thead>
            <T.TableBody>
              {account.map((user, index) => {
                return (
                  <tr key={index}>
                    <T.TableData>PDM {user.id}</T.TableData>
                    <T.TableData>
                      <Avatar
                        alt=""
                        src={user.image.replace(
                          "C:/xampp/htdocs",
                          process.env.REACT_APP_PHP_URL
                        )}
                        variant="rounded"
                        sx={{ width: 32, height: 32 }}
                        style={{ margin: "auto" }}
                      />
                    </T.TableData>
                    <T.TableData>{user.fullname}</T.TableData>
                    <T.TableData>
                      {user.type === "admin"
                        ? "Editor in Chief"
                        : "News Writer"}
                    </T.TableData>
                    <T.TableData>{user.role}</T.TableData>
                    <T.TableData>{user.status}</T.TableData>
                    <T.TableData>
                      <EditAccount
                        id={user.id}
                        status={user.status}
                        name={user.fullname}
                        username={user.username}
                        type={user.type}
                        role={user.role}
                        images={user.image.replace(
                          "C:/xampp/htdocs",
                          process.env.REACT_APP_PHP_URL
                        )}
                      />
                    </T.TableData>
                  </tr>
                );
              })}
            </T.TableBody>
          </T.Table>
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
  width: 100%;
  height: 370px;
  background-color: ${styles.White};
  border-radius: 10px;
  padding: 18px 16px;
  text-align: left;
`;

const OverLabel = styled.h5`
  color: ${styles.LightGray};
  font-family: ${styles.Regular};
  line-height: auto;
  float:left;
  margin-top: 14px;
 margin-right 10px;
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

export default Admin;
