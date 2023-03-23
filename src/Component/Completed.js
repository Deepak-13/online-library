import { connect } from "react-redux";
import CompletedProduct from "./CompletedProduct";
import NavBar from "./NavBar";
import { Typography } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';

function Completed({ comp }) {

  // Code to checkout from cart
  // Date is class which returns the current date in milliseconds. toUTCString() returns the readable string format of the date and time(GMT)


  return (
    <div>
      <NavBar />
      <div style={{ marginTop: 30 }}></div>
      <Typography variant="h3">
        &nbsp; Completed List
      </Typography>
      &nbsp;
      {comp.length === 0 ? (
        <Typography variant="h5">List is empty</Typography>
      ) : (
        comp.map((item, id) => {
          return <CompletedProduct item={item} key={id} />;
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
    comp: state.completedReducer.comp,
    user: state.loginReducer.user.username,
  };
};

export default connect(mapStateToProps)(Completed);
