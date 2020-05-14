import React from "react";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import Button from '@material-ui/core/Button'
import {
  decrement,
  increment,
} from "../redux/actions/testActions";
import PRODUCTS_QUERY from "../queries";
import AppLayout from "../components/Layout/AppLayout";

const Home = ({ data}) => {
  const dispatch = useDispatch();
  const testing = useSelector(state => state.testing.value)
  const testRender = () => {
    if (data.products) {
      // limit how many get rendered
      data.products = data.products.slice(0, 5)
      return (
        <div>
          {data.products.map(({ id, name, image, category }) => (
            <div key={id}>
              <h1>{name}</h1>
              <span>{category.name}</span>
            </div>
          ))}
        </div>
      );
    }
  };
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
        {testRender()}
      </AppLayout>
    </div>
  );
};

Home.getInitialProps = async (ctx) => {
  const apolloClient = ctx.apolloClient;
  const { data, error, loading } = await apolloClient.query({
    query: PRODUCTS_QUERY,
  });
  if (error) return <div>error</div>;
  return { data, error, loading };
};

export default Home;