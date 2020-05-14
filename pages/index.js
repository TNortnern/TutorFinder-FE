import React from "react";
import Head from "next/head";

import { useQuery } from "@apollo/react-hooks";
import PROJECTS_QUERY from "../queries";
import AppLayout from "../components/Layout/AppLayout";

const Home = ({ data }) => {
  const testRender = () => {
    if (data.products) {
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
      <AppLayout>Landing</AppLayout>
      {testRender()}
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
    </div>
  );
};

Home.getInitialProps = async (ctx) => {
  const apolloClient = ctx.apolloClient;
  const { data, error, loading } = await apolloClient.query({
    query: PROJECTS_QUERY,
  });
  if (error) return <div>error</div>;
  return { data, error, loading };
};

export default Home;
