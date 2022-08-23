import React from "react";
import axios from "../axios/axios";
import ReactPolling from "react-polling";

const Chatting = () => {
  const test = () => {
    return axios.get(process.env.REACT_APP_ENDPOINT + "/chat");
  };
  return (
    <ReactPolling
      url={process.env.REACT_APP_ENDPOINT + "/chat"}
      interval={3000}
      onSuccess={(res) => console.log(res)}
      onFailure={(err) => console.log(err)} // opt
      retryCount={2} // opt
      promise={test} // opt
      render={({ startPolling, stopPolling, isPolling }) => {
        if (stopPolling) {
          return <div> Hello I am start polling</div>;
        }
        if (isPolling) {
          return <div> Hello I am polling</div>;
        } else {
          return <div> Hello I stopped polling</div>;
        }
      }}
    />
  );
};

export default Chatting;
