import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import ReceiptIcon from "@material-ui/icons/Receipt";
import AddBoxIcon from "@material-ui/icons/AddBox";
import "./Admin.css";
import AddProducts from "../Add Products/AddProducts";
import ManageProducts from "../Manage Products/ManageProducts";
import logo from "../../images/Logo3.png";

const useStyles = makeStyles((theme) => ({
  drawerPaper: { width: "inherit" },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

const Admin = () => {
  const classes = useStyles();
  let history = useHistory();
  const handleClick = () => {
    history.push("/");
  };
  document.title = "Admin-Anayra's Shoe Rack";

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Drawer
          style={{ width: "220px" }}
          variant="persistent"
          anchor="left"
          open={true}
          classes={{ paper: classes.drawerPaper }}
        >
          <List>
            <img
              style={{ width: "100%", cursor: "pointer" }}
              onClick={handleClick}
              src={logo}
              alt=""
            />

            <Link to="/admin/manageProduct" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={"Manage Product"} />
              </ListItem>
            </Link>
            <Link to="/admin/addProduct" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <AddBoxIcon />
                </ListItemIcon>
                <ListItemText primary={"Add Product"} />
              </ListItem>
            </Link>
          </List>
        </Drawer>
        <Switch>
          <Route path="/admin/manageProduct" component={ManageProducts} />

          <Route path="/admin/addProduct" component={AddProducts} />
          <Redirect from="/admin" to="/admin/manageProduct" />
        </Switch>
      </div>
    </div>
  );
};

export default Admin;
