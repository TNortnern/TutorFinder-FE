import React from "react";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { decrement, increment } from "../redux/actions/testActions";
// import PRODUCTS_QUERY from "../queries";
import AppLayout from "../components/layout/AppLayout";

const Home = props => {
  const dispatch = useDispatch();
  const testing = useSelector((state) => state.testing.value);
  return (
    <div className="home">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <AppLayout>
        <h1 align="center">Landing Page</h1>
        <Button
          onClick={() => dispatch(increment())}
          variant="contained"
          color="primary"
        >
          Increment
        </Button>
        <Button
          onClick={() => dispatch(decrement())}
          variant="contained"
          color="primary"
        >
          Decrement
        </Button>
        <h1>{testing}</h1>
        {/* {testRender()} */}
      </AppLayout>
    </div>
  );
};



export default Home;
