
import { connect } from "react-redux";
import CartProduct from "./CartProduct";
import NavBar from "./NavBar";
import { Typography } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';

function Cart({ cart }) {

  // Code to checkout from cart
  // Date is class which returns the current date in milliseconds. toUTCString() returns the readable string format of the date and time(GMT)


  return (
    <div>
      <NavBar />
      <div style={{ marginTop: 30 }}></div>
      <Typography variant="h3">
        <FavoriteIcon fontSize="large" />
        &nbsp; Mylist
      </Typography>
      &nbsp;
      {cart.length === 0 ? (
        <Typography variant="h5">Mylist is empty</Typography>
      ) : (
        cart.map((item, id) => {
          return <CartProduct item={item} key={id} />;
        })
      )}
      <div style={{ marginTop: 30 }}></div>

      <div style={{ marginTop: 30 }}></div>
    </div>
  );
}

// Mapping username, cart from state to Component
const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.cart,
    user: state.loginReducer.user.username,
  };
};

export default connect(mapStateToProps)(Cart);
