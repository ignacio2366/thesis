import styled from "styled-components";
import styles from "../../components/styles";
import { useState, useEffect, Fragment } from "react";
import Dialog from "@mui/material/Dialog";
import * as M from "./Modal";
import AdminModule from "../../service/adminApi";
// EditModal
function EditAccount({ id, status, name, username, type, role, images }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [category, setCategory] = useState([]);

  const [user, setUser] = useState(type === "user" ? true : false);

  const [infoName, setName] = useState(name);
  const [infoUsername, setUsername] = useState(username);
  const [image, setImage] = useState(images || "");

  const [formData, setFormData] = useState({
    type: type,
    role: role,
    image: null,
  });

  useEffect(() => {
    getCategory();
  }, []);

  const handleChange = (event) => {
    const type = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [type]: value });

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
    data.append("id", id);
    data.append("name", infoName);
    data.append("username", infoUsername);
    data.append("type", formData.type);
    data.append("role", formData.role);

    if (formData.image) {
      data.append("image", formData.image, formData.image.name);
    } else {
      data.append("image", "default_image");
    }
    try {
      await AdminModule.editAccount(data);
    } catch (error) {
      console.error(error);
    }
    handleClose();
    setError(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getCategory = async () => {
    try {
      const response = await AdminModule.getCategories();
      setCategory(response);
    } catch (error) {
      console.log(error);
    }
  };

  const setInactive = async (id, status) => {
    try {
      await AdminModule.setInActive(id, status);
    } catch (error) {
      console.error(error);
    }
  };

  const resetPassword = async (id) => {
    try {
      const response = await AdminModule.resetPassword(id);
      if (response) {
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <EditButton
        onClick={handleClickOpen}
        variant="text"
        style={{
          margin: "15px 0px",
        }}
      >
        Edit
      </EditButton>
      <Dialog open={open} onClose={handleClose}>
        <M.Modal>
          <M.Header style={{ backgroundColor: `${styles.Dark}` }}>
            <M.Heading>Edit Credentials</M.Heading>
            <M.Heading>PDM {id}</M.Heading>
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
            <M.FormLabel>Change Profile Picture?</M.FormLabel>
            <M.TextField
              accept="image/*"
              type="file"
              name="file"
              value=""
              onChange={handleImageChange}
            />
            <M.FormLabel>Fullname</M.FormLabel>
            <M.TextField
              type="text"
              name="name"
              value={infoName}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <M.FormLabel>Username</M.FormLabel>
            <M.TextField
              type="text"
              name="username"
              value={infoUsername}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <M.FormLabel>Accessibility</M.FormLabel>
            <M.SelectField name="type" onChange={handleChange} required>
              <M.SelectOption value={type}>
                {type === "admin" ? "Editor in Chief" : "News Writer"}
              </M.SelectOption>
              <M.SelectOption value="admin">Editor-in-Chief</M.SelectOption>
              <M.SelectOption value="user">News Writer</M.SelectOption>
            </M.SelectField>
            {user && (
              <>
                <M.FormLabel>News Writer</M.FormLabel>
                <M.SelectField name="role" onChange={handleChange} required>
                  <M.SelectOption value={role}>{role}</M.SelectOption>
                  {category.map((category, index) => {
                    return (
                      <Fragment key={category.name}>
                        {role !== category.name && (
                          <M.SelectOption value={category.name}>
                            {category.name}
                          </M.SelectOption>
                        )}
                      </Fragment>
                    );
                  })}
                </M.SelectField>
              </>
            )}
            {status === "Active" ? (
              <M.InActive onClick={() => setInactive(id, "InActive")}>
                Set InActive?
              </M.InActive>
            ) : (
              <M.InActive
                style={{
                  color: `${styles.Positive}`,
                  fontFamily: `${styles.Regular}`,
                }}
                onClick={() => setInactive(id, "Active")}
              >
                Set Active?
              </M.InActive>
            )}
            <ResetBtn onClick={() => resetPassword(id)}>
              Reset Password
            </ResetBtn>
            <M.BtnReset onClick={() => setOpen(false)}> Cancel</M.BtnReset>
            <M.BtnAdd type="submit">Update</M.BtnAdd>
          </M.FormField>
        </M.Modal>
      </Dialog>
    </div>
  );
}

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
const EditButton = styled.button`
  border: none;
  color: ${styles.Cherry};
  font-family: ${styles.Regular};
  background-color: transparent;
`;

const ResetBtn = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  bottom: 75px;
  right: 50px;
  font-family: ${styles.Regular};
`;

export default EditAccount;
