import { connect } from "react-redux";
import StatusProduct from "./StatusProduct";
import NavBar from "./NavBar";
import { Typography } from "@material-ui/core";
import MenuBookRounded from '@material-ui/icons/MenuBookRounded';

function Status({ status }) {

  // Code to checkout from cart
  // Date is class which returns the current date in milliseconds. toUTCString() returns the readable string format of the date and time(GMT)


  return (
    <div>
      <NavBar />
      <div style={{ marginTop: 30 }}></div>
      <Typography variant="h3">
        <MenuBookRounded fontSize="large" />
        &nbsp; Reading
      </Typography>
      &nbsp;
      {status.length === 0 ? (
        <Typography variant="h5">Reading is empty</Typography>
      ) : (
        status.map((item, id) => {
          return <StatusProduct item={item} key={id} />;
        })
      )}
      <div style={{ marginTop: 30 }}></div>

      <div style={{ marginTop: 30 }}></div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    status: state.statusReducer.status,
    user: state.loginReducer.user.username,
  };
};

export default connect(mapStateToProps)(Status);
