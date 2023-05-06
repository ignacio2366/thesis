import { useState } from "react";
import styled from "styled-components";
import styles from "../components/styles";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { imgCover, Logo } from "../image/image";
import TextField from "@mui/material/TextField";
import React from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";

const Login = () => {
  const [error, setError] = useState(false);
  const [active, setActive] = useState(false);
  const [, setUserId] = useState("");
  const [login, setLogin] = useState([
    {
      name: "",
      password: "",
    },
  ]);

  const navigate = useNavigate();
  const handleChange = (event) => {
    const username = event.target.name;
    const value = event.target.value;
    setLogin({ ...login, [username]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    $.post(
      process.env.REACT_APP_PHP_URL + "/thesis/src/api/getLogin.php",
      login,
      function (data) {
        if (data !== null) {
          var result = JSON.parse(data);
          if (result[0].message === "success") {
            if (result[0].status === "Active") {
              setUserId(result[0].id);
              localStorage.setItem("id", result[0].id);
              localStorage.setItem("type", result[0].type);
              localStorage.setItem("name", result[0].fullname);
              localStorage.setItem(
                "image",
                result[0].image.replace(
                  "C:/xampp/htdocs",
                  process.env.REACT_APP_PHP_URL
                )
              );
              setError(false);
              if (result[0].type === "user") {
                navigate("/writer");
              } else {
                navigate("/insight");
              }
            } else {
              setActive(true);
              setError(false);
            }
          } else {
            setActive(false);
            setError(true);
          }
        }
      }
    );
  };
  return (
    <Container>
      <Coverimg src={imgCover} alt="coverImage" />
      <Navigation logged={localStorage.getItem("id") ? true : false} />

      <LoginBox>
        <LoginPanel>
          <LoginH1>News.NLP</LoginH1>
          <LoginH3>Under Graduate Thesis In Partial Fulfillment of</LoginH3>
          <br />
          <LoginH3>
            A News Editor with Plagiarism Checker and Insight Analysis Natural
            Language Process API
          </LoginH3>
          <LoginH3>
            Exclusive News Portal For <br />
            <b>Digital Marketing Philippines</b>
          </LoginH3>
        </LoginPanel>
        <LoginPanel
          style={{
            zIndex: "100",
            marginLeft: "-58px",
            height: "487px",
            backgroundColor: `${styles.White}`,
            color: `${styles.Dark}`,
          }}
        >
          <LoginH1 style={{ color: `${styles.Cherry}` }}>
            <img src={Logo} alt="Logo" style={{ height: "55px" }} />
            &nbsp;Login
          </LoginH1>
          <br />
          {error && (
            <h6
              style={{
                color: `${styles.Negative}`,
                backgroundColor: `#ffdada`,
                padding: "5px",
                textAlign: "center",
              }}
            >
              Invalid Credential.
            </h6>
          )}
          {active && (
            <h6
              style={{
                color: "#ffffff",
                backgroundColor: `#FFD400`,
                padding: "5px",
                textAlign: "center",
              }}
            >
              The Credential is inactive status.
            </h6>
          )}

          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <TextField
              id="id-username"
              label=""
              variant="outlined"
              type="text"
              style={{ width: "100%" }}
              color="error"
              required
              margin="normal"
              size="small"
              name="name"
              onChange={handleChange}
            />
            <label>Password</label>
            <TextField
              id="id-password"
              label=""
              variant="outlined"
              type="password"
              style={{
                width: "100%",
                height: "31px",
                backgroundColor: "F6F6F6",
              }}
              color="error"
              margin="normal"
              size="small"
              required
              name="password"
              onChange={handleChange}
            />
            <br /> <br />
            <Loginbtn type="submit">Login</Loginbtn>
          </form>
        </LoginPanel>
      </LoginBox>
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: auto;
  width: 100%;
  background-color: rgba(236, 133, 158, 0.15);
  margin: auto;
`;
const Coverimg = styled.img`
  height: 90vh;
  width: 300px;
  background-size: contain;
  float: right;
  z-index: 0;
  position: static;
`;

const LoginBox = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin-top: 80px;
  z-index: 9999;
  color: white;
  text-align: left;
`;
const LoginPanel = styled.div`
  height: 558px;
  width: 408px;
  border-radius: 5px;
  align-self: flex-end;
  padding: 60px;
  background-color: ${styles.Cherry};
`;
const LoginH1 = styled.h1`
  font-size: 2.125rem;
  font-family: ${styles.Bold};
  letter-spacing: 1.5px;
`;

const LoginH3 = styled.h3`
  font-size: 0.9rem;
  font-family: ${styles.Medium};
  text-align: left;
  letter-spacing: 0.5px;
  line-height: 1.2rem;
`;

const Loginbtn = styled.button`
  padding: 7.6px 42.2px;
  background-color: ${styles.Cherry};
  float: right;
  border: none;
  color: ${styles.White};
  border-radius: 5px;
`;

export default Login;
