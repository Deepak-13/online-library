import store from "./store";
import { Card, CardContent, Typography, Box, Button } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookIcon from '@material-ui/icons/Book';
import axios from "axios";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Product(props) {
  const book = props.book;
  const user = props.user;
  // Code to add a book to the cart
  const addToCart = (item) => {
    axios
      .get(`http://localhost:3000/users?username=${user.username}`)
      .then((res) => {
        console.log("retrived");
        const user = res.data[0];
        if (!user.fav.includes(item)) { // Check if item already exists in fav array
          const data = {
            ...user,
            fav: [...user.fav, item],
          };
          axios
            .patch(`http://localhost:3000/users/${user.id}`, data)
            .then((res) => {
              console.log("fav updated");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("Item already exists in fav array");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
    navigate('/Reading',{state:item});
  };
  
  const updateCart = () => {
    axios
      .get(`http://localhost:3000/users?username=${user.username}`)
      .then((res) => {
        console.log("retrived");
        const user = res.data[0];
        const cartItems = [...user.fav]; // Create a new array with the items in fav array
        cartItems.forEach((cartItem) => {
          store.dispatch({ type: "ADD_TO_CART", payload: { item: cartItem } }); // Dispatch action for each item
          console.log("book id :" + cartItem.id + " is added to cart");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateStatus = () => {
    axios
      .get(`http://localhost:3000/users?username=${user.username}`)
      .then((res) => {
        console.log("retrived");
        const user = res.data[0];
        const statusItems = [...user.read]; // Create a new array with the items in fav array
        statusItems.forEach((statusItem) => {
          store.dispatch({ type: "ADD_TO_STATUS", payload: { item: statusItem } }); // Dispatch action for each item
          console.log("book id :" + statusItem.id + " is added to status");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateCompleted = () => {
    axios
      .get(`http://localhost:3000/users?username=${user.username}`)
      .then((res) => {
        console.log("retrived");
        const user = res.data[0];
        const completedItems = [...user.completed]; // Create a new array with the items in fav array
        completedItems.forEach((completedItem) => {
          store.dispatch({ type: "ADD_TO_COMP", payload: { item: completedItem } }); // Dispatch action for each item
          console.log("book id :" + completedItem.id + " is added to status");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    updateCart();
    updateStatus();
    updateCompleted();
  }, []);
  const navigate = useNavigate();

  return (
    <div>
      <Card elevation={4} style={{ border: "solid", borderColor: "blue", borderWidth: "2px" }}>
        <CardContent>
          <Box display="flex" flexDirection="row">
            <Box
              sx={{
                marginTop: "30px",
                marginLeft: "60px",
                marginBottom: "30px",
              }}
            >
              <img
                src={book.link}
                style={{ width: 150, height: 250 }}
                alt="bookImage"
              />
            </Box>
            <Box
              sx={{
                marginTop: "50px",
                marginLeft: "50px",
                marginRight: "50px",
                marginBottom: "50px",
              }}
            >
              <Typography variant="h6" align="left">
                Title - {book.title}
              </Typography>
              &nbsp;
              <Typography variant="h6" align="left">
                Author - {book.author}
              </Typography>
              &nbsp;
              <Typography variant="h6" align="left">
                ISBN - {book.ISBN}
              </Typography>
              &nbsp;
              <Typography variant="h6" align="left">
                Publication - {book.publication}
              </Typography>
              <Box sx={{ marginTop: "30px", marginRight: "100px" }}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => addToCart(book)}
                //startIcon={<AddOutlined fontSize="large" />}
                >
                  <FavoriteIcon />

                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => addtoStatus(book)}
                >
                  <BookIcon />

                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.user,
  };
};

export default connect(mapStateToProps)(Product);
//export default Product;
