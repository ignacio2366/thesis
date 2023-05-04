import { useState, useEffect } from "react";
import * as M from "./Modal";
import AdminModule from "../../service/adminApi";
import styled, { css } from "styled-components";
import styles from "../../components/styles";

const Password = ({ open, id }) => {
  const [isOpen, setIsOpen] = useState(open);
  const [account, setAccount] = useState({});
  const [password, setpassword] = useState("");

  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = async () => {
    const response = await AdminModule.getAccount();
    const result = JSON.parse(response);
    setAccount(result);
    setpassword(result.password);
  };
  const handleToggle = async () => {
    setIsOpen(!isOpen);
  };

  const submitPasswords = async () => {
    await AdminModule.setPassword(password);

    handleToggle();
  };
  return (
    <>
      <EditAccount onClick={handleToggle}>Change Password</EditAccount>

      <MenuOverlay open={isOpen}>
        <MenuContent>
          <ContainerCol>
            <M.Header>
              <M.Heading>Your Information</M.Heading>
            </M.Header>
            <Profile src={localStorage.getItem("image")} />
          </ContainerCol>

          <ModalRow>
            <M.FormLabel>ID:</M.FormLabel>
            <M.TextInfo>PDM {account.id}</M.TextInfo>
            <M.FormLabel>Role:</M.FormLabel>
            <M.TextInfo>
              {account.type === "admin" ? "Editor-in-Chief" : " News Writer"}
            </M.TextInfo>
            {account.type === "user" && (
              <>
                <M.FormLabel>Topic:</M.FormLabel>
                <M.TextInfo>Technologies</M.TextInfo>
              </>
            )}
          </ModalRow>
          <ModalRow>
            <M.FormLabel>Fullname:</M.FormLabel>
            <M.TextInfo>{account.name}</M.TextInfo>
          </ModalRow>
          <ModalRow>
            <M.FormLabel>Username:</M.FormLabel>
            <M.TextInfo>{account.username}</M.TextInfo>
          </ModalRow>
          <ModalRow>
            <M.FormLabel>Password</M.FormLabel>
            <M.TextField
              text="text"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <M.BtnReset onClick={handleToggle}>Close</M.BtnReset>
            <M.BtnAdd type="submit" onClick={submitPasswords}>
              Add Account
            </M.BtnAdd>
          </ModalRow>
        </MenuContent>
      </MenuOverlay>
    </>
  );
};
const EditAccount = styled.button`
  width: 120px;
  height: 10px;
  font-size: 0.775rem;
  font-family: ${styles.Medium};
  color: ${styles.Cherry};
  cursor: pointer;
  border: none;
  text-align: left;
  background-color: transparent;
  padding: 0px;
`;

const ContainerCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;
const ModalRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  padding: 5px 20px;
`;

const MenuOverlay = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
  transform: translateX(100%);

  ${({ open }) =>
    open &&
    css`
      opacity: 1;
      pointer-events: auto;
      transform: translateX(0);
    `}
`;

const MenuContent = styled.div`
  position: absolute;
  width: 550px;
  height: 550px;
  background-color: white;
  border-radius: 10px;
`;

export const Profile = styled.img`
  height: 175px;
  width: 175px;
  margin: 10px auto;
  border-style: 10px solid ${styles.LightGray};
  background-color: ${styles.Cherry};
  border-radius: 10px;
`;
export default Password;
