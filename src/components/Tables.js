import styled from "styled-components";
import styles from "../components/styles";

export const Table = styled.table`
  width: 100%;
  height: 500px;
  text-align: center;
`;
export const TableHead = styled.th`
  font-size: 0.9rem;
  font-family: ${styles.Regular};
  color: ${styles.Dark};
  text-align: center;
  border-bottom: 0.5px solid ${styles.LightGray};
`;

export const TableData = styled.td`
  font-size: 14px;
  max-height:15px;
  font-family: ${styles.Regular};
  border-bottom: 0.5px solid ${styles.LightGray};
  padding: 5px;
`;
export const TableBody = styled.tbody`
  max-height: 100px;
  color: ${styles.LightGray};
`;
