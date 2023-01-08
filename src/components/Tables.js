import styled from "styled-components";
import styles from "../components/styles";

export const Table = styled.table`
  width: 100%;
  height: auto;
  overflow: auto;
  text-align: center;
`;
export const TableHead = styled.th`
  font-size: 1rem;
  font-family: ${styles.Bold};
  color: ${styles.LightGray};
  border-bottom: 0.5px solid ${styles.LightGray};
`;

export const TableData = styled.td`
  font-size: 1rem;
  border-bottom: 0.5px solid ${styles.LightGray};
`;
export const TableBody = styled.tbody`
  margin: 0;
  height: auto;
  color: ${styles.Gray};
`;
