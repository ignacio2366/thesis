import styled from "styled-components";
import styles from "../../components/styles";
import { css } from "styled-components";

export const Modal = styled.div`
  height: 429px;
  width: 569px;
  background-color: ${styles.WhiteSmoke};
  text-align: left;
  position: relative;
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
  font-family: ${styles.Medium};
`;
export const Body = styled.div`
  width: 100%;
  height: 320px;
  padding: 5px 20px;
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

export const CardUL = styled.ul`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0px;
  padding: 0px;
`;

export const CardList = styled.li`
  list-style-type: none;
  color: ${styles.LightGray};
  margin: 0px;
  padding: 10px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-family: ${styles.Regular};
  border: 0.5px solid ${styles.LightGray};
  margin: 4px;
  padding: 8px;
  border-radius: 5px;
  overflow-wrap: break-word;
  word-break: break-all;
  text-align: justify;
`;

export const CardH4 = styled.h4`
  font-size: 16px;
  font-weight: bold;
  font-family:${styles.Bold};
  letter-spacing: 0.2px;
  color: ${styles.Dark};
`;
export const CardP = styled.p`
  font-size: 12px;
  cursor: pointer;
`;

export const SubHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
