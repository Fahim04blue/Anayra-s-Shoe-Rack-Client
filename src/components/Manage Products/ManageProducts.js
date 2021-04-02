import React from "react";
import { AppBar, Container, Typography } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ManageProducts = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  document.title = "Manage Products-Anayra's Shoe Rack";
  useEffect(() => {
    fetch("https://anayras-shoe-rack-server.herokuapp.com/allProducts")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [products]);

  const handleDeleteProduct = (id) => {
    fetch(`https://anayras-shoe-rack-server.herokuapp.com/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        const newData = products.filter((pd) => {
          return pd._id !== data._id;
        });
        setProducts(newData);
      });
  };
  return (
    <Container>
      <Typography style={{ marginTop: 20 }} variant="h3" gutterBottom>
        Manage Products
      </Typography>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 700 }}>Product Name</TableCell>
              <TableCell style={{ fontWeight: 700 }} align="right">
                Manufacturer
              </TableCell>
              <TableCell style={{ fontWeight: 700 }} align="right">
                Price
              </TableCell>
              <TableCell style={{ fontWeight: 700 }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((pd) => (
              <TableRow key={pd.name}>
                <TableCell component="th" scope="row">
                  <img src={pd.imageURL} style={{ height: 100 }} alt="" />{" "}
                  {pd.name}
                </TableCell>
                <TableCell align="right">{pd.manufacturer}</TableCell>
                <TableCell align="right">${pd.price}</TableCell>
                <TableCell align="right">
                  <DeleteForeverIcon
                    style={{ fill: "red", cursor: "pointer" }}
                    onClick={() => handleDeleteProduct(pd._id)}
                  ></DeleteForeverIcon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ManageProducts;
