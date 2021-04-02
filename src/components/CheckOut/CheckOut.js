import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoginContext } from "../../context/LoginContextProvider";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container, Snackbar } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { lightGreen } from "@material-ui/core/colors";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
const theme = createMuiTheme({
  palette: {
    primary: lightGreen,
  },
});

const CheckOut = () => {
  const classes = useStyles();
  const { productId } = useParams();
  const [checkOut, setCheckOut] = useState({});
  const [loggedInUser, setLoggedInUser] = useContext(LoginContext);
  const [open, setOpen] = useState(false);
  document.title = "Checkout-Anayra's Shoe Rack";
  useEffect(() => {
    const url = `https://anayras-shoe-rack-server.herokuapp.com/product/${productId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setCheckOut(data));
  }, []);
  const handleCheckOut = () => {
    const newOrders = { ...loggedInUser, ...checkOut, orderTime: new Date() };
    fetch("https://anayras-shoe-rack-server.herokuapp.com/addOrders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrders),
    })
      .then((res) => res.json)
      .then((data) => console.log(data));
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div>
      <Container>
        <TableContainer component={Paper} style={{ marginTop: "20%" }}>
          <Table className={classes.table} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 700 }}>Product Name</TableCell>
                <TableCell style={{ fontWeight: 700 }} align="right">
                  Quantity
                </TableCell>

                <TableCell style={{ fontWeight: 700 }} align="right">
                  Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell>{checkOut.name}</TableCell>
              <TableCell align="right">1</TableCell>
              <TableCell align="right">${checkOut.price}</TableCell>
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={1}>Total</TableCell>
                <TableCell align="right">${checkOut.price} </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={1}></TableCell>
                <TableCell align="right">
                  {" "}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCheckOut}
                  >
                    CheckOut
                  </Button>{" "}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Snackbar
          className={classes.root}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            style={{ maxWidth: 500 }}
            onClose={handleClose}
            severity="success"
          >
            Congratulations! Order Placed
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default CheckOut;
