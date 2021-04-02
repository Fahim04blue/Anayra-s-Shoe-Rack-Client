import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";
import { useContext, useState } from "react";
import { LoginContext } from "../../context/LoginContextProvider";
import { useHistory, useLocation } from "react-router";
import logo from "../../images/Logo3.png";
import wallpaper from "../../images/LoginPage.jpg";
import "./Login.css";
import { Container, makeStyles } from "@material-ui/core";
import { Drawer } from "@material-ui/core";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  drawerPaper: { width: "inherit" },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
function Login() {
  const classes = useStyles();
  const [loggedInUser, setLoggedInUser] = useContext(LoginContext);
  let history = useHistory();
  let location = useLocation();
  document.title = "Login-Anayra's Shoe Rack";
  let { from } = location.state || { from: { pathname: "/" } };
  const gmailProvider = new firebase.auth.GoogleAuthProvider();

  const handleGmailSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(gmailProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photoURL: photoURL,
        };
        setLoggedInUser(signedInUser);
        history.replace(from);
        console.log(displayName, email);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
      });
  };

  return (
    <div style={{ display: "flex" }}>
      <Drawer
        style={{ width: "380px" }}
        variant="persistent"
        anchor="left"
        open={true}
        classes={{ paper: classes.drawerPaper }}
      >
        <Container>
          <List>
            <ListItem>
              <img src={logo} style={{ width: "100%" }} alt="" />
            </ListItem>

            <ListItem>
              <Typography variant="h5" style={{ fontWeight: 700 }}>
                Log in to your account
              </Typography>
            </ListItem>
            <ListItem>
              <div onClick={handleGmailSignIn} class="google-btn">
                <div class="google-icon-wrapper">
                  <img
                    class="google-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt=""
                  />
                </div>
                <p class="btn-text">
                  <b>Google</b>
                </p>
              </div>
            </ListItem>
          </List>
        </Container>
      </Drawer>
      <img src={wallpaper} style={{ height: "100vh", width: "100%" }} alt="" />
    </div>
  );
}
export default Login;
