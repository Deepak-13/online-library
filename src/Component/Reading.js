import React from "react";
import NavBar from "./NavBar";
import { useState } from "react";
import Iframe from 'react-iframe'
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import store from "./store";
import axios from "axios";


//PDFjs worker from an external cdn
import { useLocation } from 'react-router-dom';
function Reading({ user }) {
  const book = useLocation().state

  const addtoCompleted = (item) => {
    axios
      .get(`http://localhost:3000/users?username=${user.username}`)
      .then((res) => {
        console.log("retrived");
        const user = res.data[0];
        if (!user.completed.includes(item)) { // Check if item already exists in fav array
          const data = {
            ...user,
            read: user.read.filter((readItem) => readItem.id !== item.id),
            completed: [...user.completed, item],
          };
          axios
            .patch(`http://localhost:3000/users/${user.id}`, data)
            .then((res) => {
              console.log("completed list updated");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("Item already exists in completed array");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    store.dispatch({ type: "ADD_TO_COMP", payload: { item: item } });
    console.log("book id :" + item.id + " is added to completed");
    store.dispatch({ type: "DELETE_FROM_STATUS", payload: { item: item } });
    console.log(item.content)
    navigate('/Home');
  };
  const navigate = useNavigate();
  return (
    <div>
      <NavBar></NavBar>
      <Iframe url={useLocation().state.content}
        width="1500px"
        height="750px"
        id=""
        className=""
        display="block"
        position="relative" />
      <Button
        color="primary"
        variant="contained"
        onClick={() => addtoCompleted(book)}
      >
        COMPLETED

      </Button>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.user,
  };
};

export default connect(mapStateToProps)(Reading);