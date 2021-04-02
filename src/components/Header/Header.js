import React, { useContext, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { LoginContext } from "../../context/LoginContextProvider";
import "./Header.css";
import logo from "../../images/Logo3.png";
import { Button, Container, makeStyles, MenuItem } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    width: 300,
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    [theme.breakpoints.down("sm")]: {
      width: 180,
    },
  },

  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";

  const history = useHistory();
  const [loggedInUser, setLoggedInUser] = useContext(LoginContext);
  const handleLogin = () => {
    history.push("/login");
  };
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Link style={{ color: "black", textDecoration: "none" }} to="/">
          <p>Home</p>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link style={{ color: "black" }} to="/orders">
          <p>Orders</p>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link style={{ color: "black" }} to="/admin">
          <p>Admin</p>
        </Link>
      </MenuItem>
      <MenuItem>
        <p style={{ color: "black" }}> {loggedInUser.name} </p>
      </MenuItem>
      <MenuItem>
        {loggedInUser.email ? (
          <p onClick={() => setLoggedInUser({})}>Sign Out</p>
        ) : (
          <p onClick={handleLogin}>Sign In</p>
        )}
      </MenuItem>
    </Menu>
  );
  if (
    props.location.pathname === "/admin" ||
    props.location.pathname === "/login" ||
    props.location.pathname === "/admin/manageProduct" ||
    props.location.pathname === "/admin/addProduct"
  ) {
    return false;
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ backgroundColor: "white" }}>
        <Container>
          <Toolbar>
            <img src={logo} className={classes.title} alt="" />

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Link style={{ color: "black" }} to="/">
                <Button color="inherit">Home</Button>
              </Link>
              <Link style={{ color: "black" }} to="/orders">
                <Button color="inherit">Orders</Button>
              </Link>
              <Link style={{ color: "black" }} to="/admin">
                <Button color="inherit">Admin</Button>
              </Link>
              <Button style={{ color: "black" }}> {loggedInUser.name} </Button>
              {loggedInUser.email ? (
                <Button onClick={() => setLoggedInUser({})}>Sign Out</Button>
              ) : (
                <Button onClick={handleLogin}>Sign In</Button>
              )}
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon style={{ fill: "black" }} />
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
};

export default withRouter(Header);
