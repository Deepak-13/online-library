import store from "./store";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { actionTypes as Cartaction } from "./reducers/CartReducer";
import { actionTypes as Statusaction } from "./reducers/StatusReducer";
import { actionTypes } from "./reducers/CompletedReducer";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import { MenuBookRounded } from "@material-ui/icons";

function NavBar({ user }, { status }) {
  // Code for logout

  const logOut = () => {
    store.dispatch({ type: Cartaction.RESET_CART });
    store.dispatch({ type: Statusaction.RESET_STATUS });
    store.dispatch({type: actionTypes.RESET_COMP});
    store.dispatch({ type: "logOut" });
    console.log("Successfully logged out");
  };

  // special features only for admin
  let manage = <></>;
  let update = <></>;
  if (user.isAdmin) {
    update = (
      <Link
        to="/books"
        style={{ fontSize: "1.17em", textDecoration: "none", color: "white" }}
      >
        Manage Books
      </Link>
    );
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: "5px 0px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "7%",
            }}
          >
            <IconButton>
              <Link
                to="/home"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <MenuBookRounded fontSize="large" />
              </Link>
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "60%",
            }}
          >
            <Typography variant="h4">Library</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "15%",
            }}
          >
            {update}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "10%",
            }}
          >
            <Link
              to="/status"
              style={{
                fontSize: "1.17em",
                textDecoration: "none",
                color: "white",
              }}
            >
              Reading
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "12%",
            }}
          >
            <Link
              to="/Completed"
              style={{
                fontSize: "1.17em",
                textDecoration: "none",
                color: "white",
              }}
            >

              Completed            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "10%",
              padding: "5px 0px",
            }}
          >
            <Link
              to="/profile"
              style={{
                fontSize: "1.17em",
                textDecoration: "none",
                color: "white",
              }}
            >
              Hi {user.username}
            </Link>
          </Box>
          <Box>
            <Button variant="contained">
              <Link
                to="/"
                onClick={logOut}
                style={{ textDecoration: "none", color: "black" }}
              >
                LogOut
              </Link>
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

// Mapping username from state to Component  
const mapStateToProps = (state) => {
  return {
    status: state.statusReducer.status,
    user: state.loginReducer.user,
  };
};

export default connect(mapStateToProps)(NavBar);
