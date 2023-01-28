import styled from "styled-components";
import styles from "../components/styles";
import Navigation from "../components/Navigation";
import SideNav from "./layout/SideNav";
import * as React from "react";
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

// Add Modal
function AddUser() {
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
        <AddBoxIcon /> Add Users
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Users</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Categories must consist eight to twelve categories
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Full Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
          />
          <input accept="image/*" multiple type="file" style={{ marginTop: "14px" }} />
          <CategorySelect id="category" name="category">
            <CategotyOption value="">Select User</CategotyOption>
            <CategotyOption value="admin">Editor-in-Chief</CategotyOption>
            <CategotyOption value="user">News Writer</CategotyOption>
          </CategorySelect>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
// EditModal
function EditUser() {
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
              <tr>
                <T.TableData>201811636</T.TableData>
                <T.TableData>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://images.gmanews.tv/webpics/2021/08/Representative_Joey_Salceda_2021_08_05_13_45_46.jpg"
                    variant="rounded"
                    sx={{ width: 32, height: 32 }}
                    style={{ margin: "auto" }}
                  />
                </T.TableData>
                <T.TableData>Mark Angelo F Ignacio</T.TableData>
                <T.TableData>admin</T.TableData>
                <T.TableData>angeloignacio@pdm.com</T.TableData>
                <T.TableData>Active</T.TableData>
                <T.TableData>
                  <EditUser />
                </T.TableData>
              </tr>
              <tr>
                <T.TableData sx={{ width: 32, height: 32 }}>
                  201811636
                </T.TableData>
                <T.TableData>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://images.gmanews.tv/webpics/2021/08/Representative_Joey_Salceda_2021_08_05_13_45_46.jpg"
                    sx={{ width: 32, height: 32 }}
                    variant="rounded"
                    style={{ margin: "auto" }}
                  />
                </T.TableData>
                <T.TableData>Mark Angelo F Ignacio</T.TableData>
                <T.TableData>admin</T.TableData>
                <T.TableData>angeloignacio@pdm.com</T.TableData>
                <T.TableData>Active</T.TableData>
                <T.TableData>
                  <EditUser />
                </T.TableData>
              </tr>
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
