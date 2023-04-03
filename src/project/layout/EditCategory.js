import { useState } from "react";
import CategoryModule from "../../service/categoryApi";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import styles from "../../components/styles";

// Modal
function EditCategory({ id, name }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [editCategory, seteditCategory] = useState({
    id: id,
    name: name,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    seteditCategory({ [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(name);
    try {
      const response = await CategoryModule.editCategory(
        id,
        editCategory.name,
        name
      );
      console.log(JSON.parse(response));
      const result = JSON.parse(response);
      console.log(result[0].message);
      if (result[0].message === "success") {
        setOpen(false);
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

  const setInactive = async (id) => {
    try {
      const response = await CategoryModule.inactiveCategory(id);
      setOpen(false);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <EditButton variant="outlined" onClick={handleClickOpen}>
        Edit
      </EditButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Categories</DialogTitle>
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
            The changes will affect the news with the category specified.
          </DialogContentText>
          <CategoriesField
            label="Category Name"
            type="text"
            max={12}
            value={editCategory.name}
            name="name"
            onChange={handleChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <InActive onClick={() => setInactive(id)}>Set InActive</InActive>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Change</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

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

const EditButton = styled.button`
  border: none;
  color: ${styles.Cherry};
  font-family: ${styles.Regular};
  background-color: transparent;
`;

const InActive = styled.button`
  position: absolute;
  left: 16px;
  width: 150px;
  border: none;
  border-radius: 4px;
  background-color: transparent;
  font-size: 17px;
  text-align: left;
  color: ${styles.Negative};
`;
export default EditCategory;
