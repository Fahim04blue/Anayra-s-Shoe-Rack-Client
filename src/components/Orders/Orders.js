import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/LoginContextProvider";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container, Typography } from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.action.hover,
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const Orders = () => {
  const classes = useStyles();

  const [orders, setOrders] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(LoginContext);
  document.title = "Orders-Anayra's Shoe Rack";
  useEffect(() => {
    fetch(
      "https://anayras-shoe-rack-server.herokuapp.com/orders?email=" +
        loggedInUser.email
    )
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);
  return (
    <div>
      {/* <h3>You have : {orders.length} orders </h3>
      {orders.map((order) => (
        <li>
          Name : {order.name}
          Price : {order.price}
          Time : {order.orderTime}
        </li>
      ))} */}

      <Container>
        <Typography style={{ marginTop: 20 }} variant="h3" gutterBottom>
          Order History of {loggedInUser.name}
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Product Name</StyledTableCell>
                <StyledTableCell align="right">Manufacturer</StyledTableCell>
                <StyledTableCell align="right">Date</StyledTableCell>
                <StyledTableCell align="right">Amount</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <StyledTableRow key={order.name}>
                  <StyledTableCell component="th" scope="row">
                    <img src={order.imageURL} style={{ height: 100 }} alt="" />{" "}
                    {order.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {order.manufacturer}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {new Date(order.orderTime).toDateString("dd-MM-yyy")}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    ${order.price}
                  </StyledTableCell>
                  <StyledTableCell align="right">Pending</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default Orders;
