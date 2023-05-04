import styled from "styled-components";
import styles from "../../components/styles";

export const Modal = styled.div`
  height: 600px;
  width: 505px;
  background-color: ${styles.White};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Header = styled.div`
  height: 80px;
  width: 100%;
  background-color: ${styles.Cherry};
  padding: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Heading = styled.h1`
  font-size: 1.25rem;
  font-family: ${styles.Medium};
  color: ${styles.White};
  border-radius: 10px;
`;
export const Avatar = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 70px;
  border-style: 0.5px solid ${styles.LightGray};
  margin-top: -75px;
`;
export const FormField = styled.form`
  width: 100%;
  height: auto;
  padding: 5px 45px;
`;
export const FormLabel = styled.label`
  font-size: 1rem;
  color: ${styles.LightGray};
  font-family: ${styles.Regular};
`;

export const TextField = styled.input`
  width: 100%;
  height: 42px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 5px;
  padding-left: 8px;
  font-family: ${styles.Regular};
`;

export const TextInfo = styled.p`
  background-color: #ffffff;
  border: none;
  font-family: ${styles.Medium};
  display: flex;
  margin: 0px
`;
export const SelectField = styled.select`
  width: 100%;
  height: 45px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 5px;
  border: 0.5px solid ${styles.LightGray};
  padding-left: 8px;
  font-family: ${styles.Regular};
  overflow-y: scroll;
`;

export const SelectOption = styled.option`
  text-align: left;
  padding-left: 15px;
  font-family: ${styles.Regular};
`;

export const BtnReset = styled.button`
  position: absolute;
  bottom: 20px;
  left: 45px;
  height: 38px;
  width: 100px;
  border: none;
  border-radius: 4px;
  background-color: ${styles.LightGray};
  font-size: 16px;
  margin-top: 25px;
  color: ${styles.White};
  font-family: ${styles.Regular};
`;
export const InActive = styled.button`
  position: absolute;
  bottom: 75px;
  left: 45px;
  width: 150px;
  border: none;
  border-radius: 4px;
  background-color: transparent;
  font-size: 16px;
  margin-top: 25px;
  text-align: left;
  color: ${styles.Negative};
  font-family: ${styles.Regular};
`;
export const BtnAdd = styled.button`
  position: absolute;
  bottom: 20px;
  right: 45px;
  height: 38px;
  width: 150px;
  border: none;
  border-radius: 4px;
  background-color: ${styles.Cherry};
  font-size: 16px;
  margin-top: 25px;
  float: right;
  font-family: ${styles.Regular};
  color: ${styles.White};
`;
