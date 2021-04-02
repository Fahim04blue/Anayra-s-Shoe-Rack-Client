import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, makeStyles, Snackbar, Typography } from "@material-ui/core";
import axios from "axios";
import "../Admin/Admin.css";
import { Alert } from "@material-ui/lab";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const AddProducts = () => {
  const classes = useStyles();
  const { register, handleSubmit, watch, errors } = useForm();

  const [imageURL, setImageURL] = useState(null);
  const [open, setOpen] = useState(false);
  document.title = "Add Products-Anayra's Shoe Rack";
  const onSubmit = (data) => {
    const productData = {
      name: data.name,
      manufacturer: data.manufacturer,
      price: data.price,
      imageURL: imageURL,
    };
    const url = `https://anayras-shoe-rack-server.herokuapp.com/addProducts`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productData),
    }).then((response) => console.log("server side response"));

    console.log(data);
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleImageUpload = (e) => {
    console.log(e.target.files[0]);
    const imageData = new FormData();
    imageData.set("key", "bb13f870642bf772bdf63d807a488e65");
    imageData.append("image", e.target.files[0]);
    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then((res) => setImageURL(res.data.data.display_url))
      .catch((err) => console.log(err));
  };
  return (
    <div className="shipment-form">
      <h1> Add Product </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            Product is added to the database!
          </Alert>
        </Snackbar>
        <input
          name="name"
          ref={register({ required: true })}
          placeholder="Product Name"
        />
        {errors.name && <p>Product Name is required</p>}
        <input
          name="manufacturer"
          ref={register({ required: true })}
          placeholder="Product Manufacturer"
        />
        {errors.name && <p>Product Manufacturer is required</p>}
        <input
          name="price"
          ref={register({ required: true })}
          placeholder="Price"
        />
        {errors.price && <p>Price is required</p>}
        <input
          name="image"
          type="file"
          ref={register({ required: true })}
          onChange={handleImageUpload}
          onSubmit
        />
        {errors.image && <p>Image is required</p>}
        <input type="submit" />
      </form>
    </div>
  );
};

export default AddProducts;
