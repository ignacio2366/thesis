import styled from "styled-components";
import styles from "../components/styles";

export const Table = styled.table`
  width: 100%;
  height: auto;
  overflow: auto;
  text-align: center;
`;
export const TableHead = styled.th`
  font-size: 0.9rem;
  font-family: ${styles.Regular};
  color: ${styles.Dark};
  border-bottom: 0.5px solid ${styles.LightGray};
`;

export const TableData = styled.td`
  font-size: 14px;
  font-family: ${styles.Regular};
  border-bottom: 0.5px solid ${styles.LightGray};
  padding: 5px;
`;
export const TableBody = styled.tbody`
  margin: 0;
  height: auto;
  color: ${styles.LightGray};
`;
