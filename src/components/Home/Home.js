import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Container,
  Grid,
  CardActionArea,
  Card,
  CardMedia,
  CardActions,
  Typography,
  Button,
  CardContent,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop: 20,
  },
  media: {
    height: 300,
  },
  btn: {
    justifyContent: "space-between",
  },
});

const Home = () => {
  const classes = useStyles();
  let history = useHistory();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://anayras-shoe-rack-server.herokuapp.com/allProducts")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
        document.title = "Anayra's Shoe Rack";
      });
  }, [products]);
  const handleBuyNow = (productId) => {
    history.push(`/products/${productId}`);
  };
  return (
    <Container fixed>
      <Grid
        container
        spacing={4}
        direction="row"
        justify="center"
        alignItems="center"
      >
        {loading ? (
          <CircularProgress style={{ marginTop: "30%" }} />
        ) : (
          products.map((pd) => (
            <Grid item lg={4} xs={9} md={3}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={pd.imageURL}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {pd.name}
                    </Typography>
                  </CardContent>

                  <CardActions className={classes.btn}>
                    <Typography gutterBottom variant="h5" component="h2">
                      ${pd.price}
                    </Typography>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => handleBuyNow(pd._id)}
                    >
                      Buy Now
                    </Button>
                  </CardActions>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Home;
