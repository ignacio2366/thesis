import styled from "styled-components";
import styles from "../../components/styles";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import * as M from './Modal';
import $ from 'jquery';

// EditModal
function EditAccount({ id, name, username, type, role, images }) {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [image, setImage] = useState(images);
    const [user, setUser] = useState(type === "user" ? true : false);

    const [formData, setFormData] = useState({
        id: id,
        name: name,
        username: username,
        type: type,
        role: role,
        image: null,
    });

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
    }
    const handleImageChange = e => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result);
        }
        setFormData({
            ...formData,
            image: file
        });

    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData();
        data.append('id', formData.id);
        data.append('name', formData.name);
        data.append('username', formData.username);
        data.append('type', formData.type);
        data.append('role', formData.role);

        if (formData.image) {
            data.append('image', formData.image, formData.image.name);
        } else {
            data.append('image', "default_image");
        }
        try {
            const response = await fetch('http://localhost/thesis/src/api/editAccount.php', {
                method: 'POST',
                body: data
            });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
        handleClose()
        setError(false)
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const setInactive = (id) => {
        console.log(id);
        try {
            $.post('http://localhost/thesis/src/api/setInActive.php',{id:id}, function (data) {
                if(data !== null){
                    console.log(data);
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

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
                <M.Modal>
                    <M.Header style={{ backgroundColor: `${styles.Dark}` }}>
                        <M.Heading>
                            Edit Credentials
                        </M.Heading>
                        <M.Heading >
                            PDM {id}
                        </M.Heading>
                    </M.Header>
                    <M.Avatar src={image} />
                    <M.FormField onSubmit={handleSubmit} encType="multipart/form-data">
                        {error && <p style={{ color: `${styles.Negative}`, backgroundColor: `#ffdada`, padding: "5px", textAlign: "center" }}>The Credential is exists.</p>}
                        <M.FormLabel>Change Profile Picture?</M.FormLabel>
                        <M.TextField accept="image/*" type="file" name="file" value="" onChange={handleImageChange} />
                        <M.FormLabel>Fullname</M.FormLabel>
                        <M.TextField type="text" name="name" value={formData.name} onChange={handleChange} required />
                        <M.FormLabel>Username</M.FormLabel>
                        <M.TextField text="text" name="username" value={formData.username} onChange={handleChange} required />
                        <M.FormLabel>Accessibility</M.FormLabel>
                        <M.SelectField name="type" onChange={handleChange} required >
                            <M.SelectOption value={type}>{type === 'admin' ? "Editor in Chief" : "News Writer"}</M.SelectOption>
                            <M.SelectOption value="admin">Editor-in-Chief</M.SelectOption>
                            <M.SelectOption value="user">News Writer</M.SelectOption>
                        </M.SelectField>
                        {user && (<>
                            <M.FormLabel>News Writer</M.FormLabel>
                            <M.SelectField name="role" onChange={handleChange} required>
                                <M.SelectOption value={role}>{role}</M.SelectOption>

                                <M.SelectOption value="Sports Writer">Sports Writer</M.SelectOption>

                            </M.SelectField></>)}

                        <M.InActive onClick={() => setInactive(id)}>Set InActive?</M.InActive>

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


export default EditAccount