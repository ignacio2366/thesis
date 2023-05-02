import styled from "styled-components";
import styles from "./../../components/styles";

// News Parts

export const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
`;

export const ContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
`;

export const Wrapper = styled.div`
  width: 100%;
  min-height: 482px;
  height: auto;
  background-color: ${styles.White};
  padding: 29px;
  border-radius: 10px;
  margin-bottom: 12px;
  border: 0.5px solid #e4e0e0;
`;
export const Headline = styled.div`
  width: 100%;
  height: auto;
  text-align: left;
  float: left;
  border-bottom: 0.5px solid ${styles.LightGray};
`;
export const Date = styled.i`
  font-size: 12px;
  font-family: ${styles.Italic};
  color: ${styles.Gray};
  text-align: left;
`;
export const Title = styled.h1`
  font-size: 16px;
  font-family: ${styles.Bold};
  text-transform: uppercase;
  color: ${styles.Dark};
  text-align: left;
  word-wrap: break-all;
  line-height: 20px;
`;

export const Category = styled.p`
  height: 32px;
  width: 100px;
  background-color: ${styles.Cherry};
  color: ${styles.White};
  font-size: 0.75rem;
  border-radius: 4px;
  text-align: center;
  font-family: ${styles.Regular};
  margin-top: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Content = styled.div`
  width: 100%;
  height: auto;
  margin-top: 0px;
  text-align: justify;
  word-break: break-all;
  overflow: auto;
  font-size: 0.875rem;
  text-align: justify;
  letter-spacing: 0.1px;
  color: ${styles.Dark};
  font-family: ${styles.Regular};
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 226px;
  margin-top: 16px;
  border-radius: 4px;
  background-color: ${styles.Dark};
`;
export const Under = styled.section`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  float: left;
  margin-top: 18px;
`;
export const Cite = styled.p`
  color: ${styles.Dark};
  font-family: ${styles.Regular};
  position: relative;
  font-size: 10px;
  text-align: left;
  margin: 0px;
  padding: 0px;
  `;

export const Options = styled.div`
  float: right;
  width: 50%;
  height: 50px;
  position: relative;
`;

export const List = styled.ul`
  padding::0px;
  margin: 0px;
`;

export const Links = styled.li`
  padding: 8px;
  font-family: ${styles.Regular};
  border-radius: 10px;
  float: right;
`;
export const AsideH1 = styled.h1`
  font-size: 1.25rem;
  font-family: ${styles.Bold};
  text-align: center;
  color: ${styles.Dark};
  letter-spacing: 1px;
  margin-top: 20px;
`;
export const Asidelbl = styled.label`
  margin-top: 12px;
  font-size: 0.9rem;
  font-family: ${styles.Medium};
  color: ${styles.Cherry};
`;