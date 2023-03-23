import store from "./store";
import { actionTypes } from "./reducers/CompletedReducer";
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookIcon from '@material-ui/icons/Book';
import { connect } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { DeleteRounded } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const CompletedProduct = ({ item, user }) => {
  // Code to delete an item from cart
  // Code to add a book to the cart
  const addToCart = (item) => {
    store.dispatch({ type: "ADD_TO_CART", payload: { item: item } });
    console.log("book id :" + item.id + " is added to cart");

  };
  const addtoStatus = (item) => {
    axios
      .get(`http://localhost:3000/users?username=${user.username}`)
      .then((res) => {
        console.log("retrived");
        const user = res.data[0];
        if (!user.read.includes(item)) { // Check if item already exists in fav array
          const data = {
            ...user,
            read: [...user.read, item],
          };
          axios
            .patch(`http://localhost:3000/users/${user.id}`, data)
            .then((res) => {
              console.log("Reading updated");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("Item already exists in Reading array");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    store.dispatch({ type: "ADD_TO_STATUS", payload: { item: item } });
    console.log("book id :" + item.id + " is added to status");
    console.log(item.content)
    navigate('/Reading', { state: item });
  };
  const deleteFromComp = () => {
    const action = {
      type: actionTypes.DELETE_FROM_COMP,
      payload: {
        item: item,
      },
    };
    axios.get(`http://localhost:3000/users?username=${user.username}`)
      .then((res) => {
        console.log("retrived");
        const user = res.data[0];
        const data = {
          ...user,
          completed: user.fav.filter((compItem) => compItem.id !== item.id),
        };
        axios
          .patch(`http://localhost:3000/users/${user.id}`, data)
          .then((res) => {
            console.log("comp updated");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    // Deleting an item from cart in state
    store.dispatch(action);
    console.log("deleted a book in cart");
  };
  const navigate = useNavigate();
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "10px 10px 10px 10px",
          marginLeft: "250px",
          marginRight: "50px",
        }}
      >
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={10} md={10} lg={10}>
            <Card>
              <CardHeader
                action={
                  <IconButton onClick={deleteFromComp} color="secondary">
                    <DeleteRounded fontSize="large" />
                  </IconButton>
                }
                title={"Your Product ID -  " + item.id}
              />
              <CardContent>
                <Box display="flex" flexDirection="row">
                  <Box
                    sx={{
                      marginLeft: "75px",
                      marginBottom: "50px",
                    }}
                  >
                    <img
                      src={item.link}
                      style={{ width: 200, height: 300 }}
                      alt="bookImage"
                    />
                  </Box>
                  <Box
                    sx={{
                      marginTop: "30px",
                      marginLeft: "100px",
                      marginRight: "60px",
                    }}
                  >
                    <Typography variant="h6" align="left">
                      Book Title - {item.title}
                    </Typography>
                    &nbsp;
                    <Typography variant="h6" align="left">
                      Book ISBN - {item.ISBN}
                    </Typography>
                    &nbsp;
                    <Typography variant="h6" align="left">
                      Book Publication - {item.publication}
                    </Typography>
                    &nbsp;
                    <Typography variant="h6" align="left">
                      Book Author - {item.author}
                    </Typography>
                    <Box sx={{ marginTop: "30px", marginRight: "100px" }}>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => addToCart(item)}
                      //startIcon={<AddOutlined fontSize="large" />}
                      >
                        <FavoriteIcon />

                      </Button>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => addtoStatus(item)}
                      >
                        <BookIcon />

                      </Button>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.user,
  };
};

export default connect(mapStateToProps)(CompletedProduct);
