import styled from "styled-components";
import styles from "../../components/styles";
import { css } from "styled-components";

export const Modal = styled.div`
  height: 429px;
  width: 569px;
  background-color: ${styles.WhiteSmoke};
  text-align: left;
`;
export const Head = styled.div`
  height: 80px;
  width: 100%;
  background-color: ${styles.Cherry};
`;
export const Header = styled.h1`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  font-size: 24px;
  color: ${styles.White};
  font-family: ${styles.Bold};
`;
export const Body = styled.div`
  width: 100%;
  height: 320px;
  padding: 5px 60px;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
`;

export const Message = styled.p`
  font-size: 18px;
  font-family: ${styles.Regular};
  text-align: justify;
  color: ${styles.LightGray};
`;
export const Error = styled.p`
  font-size: 18px;
  font-family: ${styles.Bold};
  text-align: center;
  color: ${styles.Negative};
`;

export const BtnDraft = styled.button`
  position: absolute;
  height: 32px;
  width: 115px;
  bottom: 30px;
  left: 59px;
  border-radius: 3px;
  border: none;
  border-radius: 4px;
  background-color: ${styles.Gray};
  color: ${styles.White};
  font-family: ${styles.Regular};
`;

export const BtnSubmit = styled.button`
  position: absolute;
  right: 59px;
  float: right;
  bottom: 30px;
  height: 32px;
  width: 115px;
  border-radius: 3px;
  border: none;
  border-radius: 4px;
  background-color: #5cb85c;
  color: ${styles.White};
  font-family: ${styles.Regular};
  font-size: 0.875rem;

  /* Conditional styling to change background color when button is disabled */
  ${({ disabled }) =>
    disabled &&
    css`
      background-color: #ccc;
      cursor: not-allowed;
    `}
`;
