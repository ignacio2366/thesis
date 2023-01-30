import styled from "styled-components";
import styles from "../components/styles";
import Navigation from "../components/Navigation";
import SideNav from "./layout/SideNav";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import * as T from "../components/Tables";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import $ from 'jquery';

// Add Modal
function AddUser() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    type: '',
    image: null,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });

  }
  const handleImageChange = e => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });

  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('username', formData.username);
    data.append('type', formData.type);
    data.append('image', formData.image, formData.image.name);


    console.log(formData);

    try {
      const response = await fetch('http://localhost/thesis/src/api/addAccount.php', {
        method: 'POST',
        body: data
      });
      const result = await response.json();
      console.log(result);

      if (result[0].message === 'success') {
        handleClose()
        setError(false)
      }
      else {
        setError(true);
      }

    } catch (error) {
      console.error(error);
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
          border: "none",
          margin: "15px 0px",
          float: "right",
        }}
      >
        <AddBoxIcon /> Add Users
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit} encType="multipart/form-data">

          <DialogTitle>Add Credentials </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add a new credential to access the system {error && <h6 style={{ color: `${styles.Negative}`, backgroundColor: `#ffdada`, padding: "5px", textAlign: "center" }}>The Credential is Existing</h6>}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Full Name"
              type="text"
              fullWidth
              variant="outlined"

              name="name"
              onChange={handleChange}
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Username"
              type="text"
              fullWidth
              variant="outlined"

              name="username"

              onChange={handleChange}
              required
            />

            <input accept="image/*" style={{ marginTop: "14px" }} type="file" name="file" onChange={handleImageChange} required />
            <CategorySelect id="category" name="type" onChange={handleChange} required>
              <CategotyOption value="">Select User</CategotyOption>
              <CategotyOption value="admin">Editor-in-Chief</CategotyOption>
              <CategotyOption value="user">News Writer</CategotyOption>
            </CategorySelect>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>

      </Dialog>
    </div >
  );
}

// EditModal
function EditUser() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="text"
        style={{
          margin: "15px 0px",
        }}
      >
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
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
          <Button variant="text" color="error" style={{ float: "left" }}>
            InActive
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const Admin = () => {
  const [account, setAccount] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      getLogged();
      getUser()
    }, 0)
  });

  const getLogged = () => {
    if (!localStorage.getItem("id") != null && localStorage.getItem("type") !== "admin") {
      navigate("/login")
    }
  }

  const getUser = () => {
    $.get('http://localhost/thesis/src/api/getUser.php', function (data) {
      if (data !== null) {
        setAccount(JSON.parse(data))
      }
    })
  }
  return (
    <>
      <Navigation logged={localStorage.getItem("id") ? true : false} />
      <Container>
        <SideNav />
        <Main>
          <h3 style={{ fontFamily: `${styles.SemiBold}` }}>
            Administrator Panel
          </h3>
          <AddUser />
          <T.Table>
            <thead>
              <tr>
                <T.TableHead>User ID</T.TableHead>
                <T.TableHead>Profile</T.TableHead>
                <T.TableHead>Name</T.TableHead>
                <T.TableHead>User Type</T.TableHead>
                <T.TableHead>Username</T.TableHead>
                <T.TableHead>Status</T.TableHead>
                <T.TableHead>Action</T.TableHead>
              </tr>
            </thead>
            <T.TableBody>
              {account.map((user, id) => {
                return (
                  <>
                    <tr>
                      <T.TableData key={id}>PDM {user.id}</T.TableData>
                      <T.TableData>
                        <Avatar
                          alt=""
                          src={user.image.replace("C:/xampp/htdocs", "http://localhost")}

                          variant="rounded"
                          sx={{ width: 32, height: 32 }}
                          style={{ margin: "auto" }}
                        />
                      </T.TableData>
                      <T.TableData>{user.fullname}</T.TableData>
                      <T.TableData>{user.type === 'admin' ? "Editor in Chief" : "News Writer"}</T.TableData>
                      <T.TableData>{user.username}</T.TableData>
                      <T.TableData>{user.status}</T.TableData>
                      <T.TableData>
                        <EditUser />
                      </T.TableData>
                    </tr>
                  </>
                )
              })}

            </T.TableBody>
          </T.Table>
        </Main>
        <RightPanel>

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
  height: 584px;
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
  float: right;
  width: 175px;
  height: 29px;
  border: 0.5px solid #a5a5a5;
  font-family: ${styles.Regular};
  margin-top: 14px;
`;

const CategotyOption = styled.option`
  text-align: center;
  font-family: ${styles.Regular};
`;


export default Admin;
