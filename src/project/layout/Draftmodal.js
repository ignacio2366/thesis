import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import styles from "../../components/styles";
import Dialog from "@mui/material/Dialog";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import * as M from "../layout/WriterModal";
import DraftModule from "../../service/draftApi";
export function Draftmodal({ title }) {
  const [draftOpen, setDraftOpen] = useState(false);
  const [source, setSource] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getDraftSources();
    }, 500);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const getDraftSources = async () => {
    var response = await DraftModule.getDraftSources(title);
    setSource(JSON.parse(response));
  };
  const draftClickOpen = () => {
    setDraftOpen(true);
  };

  const drafthandleClose = () => {
    setDraftOpen(false);
  };

  const deleteDraft = async (cite) => {
    await DraftModule.deleteSource(cite, localStorage.getItem("id"));
  };
  return (
    <>
      <BtnDraft type="submit" onClick={draftClickOpen}>
        <MoreHorizIcon />
      </BtnDraft>

      <Dialog open={draftOpen} onClose={drafthandleClose}>
        <M.Modal>
          <M.Head style={{ backgroundColor: `${styles.LightGray}` }}>
            <M.Header>List of Sources Save</M.Header>
          </M.Head>
          <M.Body
            style={{
              height: "300px",
              maxheight: "250px",
              overflowY: "auto",
            }}
          >
            <M.CardUL>
              {source.map((cite, index) => {
                return (
                  <M.CardList key={index}>
                    <M.CardH4>{cite.headline}</M.CardH4>
                    <M.CardP
                      style={{ cursor: "pointer" }}
                      onClick={() => window.open(cite.url)}
                    >
                      {cite.url.slice(0, 60)}...
                    </M.CardP>
                    <M.SubHead>
                      <M.CardP>Author: {cite.author}</M.CardP>
                      <M.CardP>Copyright: {cite.rights.slice(0, 15)}</M.CardP>
                      <M.CardP>Remove this</M.CardP>
                    </M.SubHead>
                  </M.CardList>
                );
              })}
            </M.CardUL>
            <BtnClose onClick={() => deleteDraft(title)}>Delete</BtnClose>
          </M.Body>
        </M.Modal>
      </Dialog>
    </>
  );
}
const BtnDraft = styled.button`
  color: ${styles.LightGray};
  background-color: transparent;
  border: none;
  position: relative;
  bottom: 0px;
`;
const BtnClose = styled.button`
  position: absolute;
  height: 32px;
  width: 115px;
  bottom: 10px;
  left: 25px;
  border-radius: 3px;
  border: none;
  border-radius: 4px;
  background-color: ${styles.Gray};
  color: ${styles.White};
  font-family: ${styles.Regular};
`;
