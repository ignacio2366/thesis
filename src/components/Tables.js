import styled from "styled-components";
import styles from "../components/styles";

export const TableBox = styled.div`
  max-height: 450px;
  width: 100%;
  overflow: auto;
`;

export const Table = styled.table`
  width: 100%;
`;
export const TableHead = styled.th`
  font-size: 0.9rem;
  padding: 8px;

  font-family: ${styles.Regular};
  color: ${styles.White};
  text-align: center;
  background-color: ${styles.Cherry};
`;
export const TableRow = styled.tr`
  height: 0px;
`;
export const TableData = styled.td`
  font-size: 14px;
  border: 1px solid #ddd;
  padding: 8px;
  font-family: ${styles.Regular};
  text-align: center;
`;
export const TableBody = styled.tbody``;
