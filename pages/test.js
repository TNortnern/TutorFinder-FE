import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import { CREATE_USER } from "../graphql/mutations/users";
import AppLayout from "../components/Layout/AppLayout";
import withApollo from "../util/with-apollo";
import { Grid, InputLabel, Select, MenuItem } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ROLES_QUERY } from "../graphql/queries/roles";
import { CATEGORIES_QUERY } from "../graphql/queries/categories";
import { USERS_QUERY } from "../graphql/queries/users";

const test = ({ data }) => {
  const [createUser, result] = useMutation(CREATE_USER);
  const getRoles = useQuery(ROLES_QUERY);
  const getCategories = useQuery(CATEGORIES_QUERY);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [avatar, setAvatar] = useState("");
  const [role, setRole] = useState("student");
  const [categories, setCategories] = useState("");
  const [age, setAge] = useState("");
  const gridValues = { xs: 12, sm: 3 };
  useEffect(() => {
    // intialize selects
    if (getRoles.data) setRole(getRoles.data.roles[0].id);

    //   if (getCategories.data)
    //     setRole(getCategories.data.publicCategories[0].id);
  }, [getRoles, getCategories]);
  return (
    <AppLayout>
      <form noValidate>
        {result && result.loading ? <p>Loading...</p> : ""}
        {result && result.error ? (
          <p style={{ color: "red" }}>{result.error.message.split(":")[1]}</p>
        ) : (
          ""
        )}
        <Grid container direction="row" justify="center">
          <Grid item xs={gridValues.xs} sm={gridValues.sm}>
            <TextField
              required
              label="Name"
              onChange={({ target }) => setName(target.value)}
            />
          </Grid>
          <Grid item xs={gridValues.xs} sm={gridValues.sm}>
            <TextField
              required
              label="E-mail"
              onChange={({ target }) => setEmail(target.value)}
            />
          </Grid>
          <Grid item xs={gridValues.xs} sm={gridValues.sm}>
            <TextField
              required
              label="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </Grid>
          <Grid item xs={gridValues.xs} sm={gridValues.sm}>
            <TextField
              required
              label="Location"
              onChange={({ target }) => setLocation(target.value)}
            />
          </Grid>
          <Grid item xs={gridValues.xs} sm={gridValues.sm}>
            <TextField
              required
              label="Avatar"
              onChange={({ target }) => setAvatar(target.value)}
            />
          </Grid>
          <Grid item xs={gridValues.xs} sm={gridValues.sm}>
            <InputLabel>Role</InputLabel>
            {getRoles && getRoles.data ? (
              <Select
                value={role}
                onChange={({ target }) => setRole(target.value)}
              >
                {getRoles.data.roles.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              "Getting roles.."
            )}
          </Grid>
          <Grid item xs={gridValues.xs} sm={gridValues.sm}>
            <TextField
              required
              label="Categories"
              onChange={({ target }) => setCategories(target.value)}
            />
            {getCategories.data ? (
                <>
                {JSON.stringify(getCategories.data.publicCategories)}
              <Autocomplete
                options={getCategories.data.publicCategories}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField value={categories} onChange={(e) => setCategories(e.target.value)} label="Categories" variant="outlined" />
                )}
              />
              </>
            ) : (
              "loading"
            )}
          </Grid>
          <Grid item xs={gridValues.xs} sm={gridValues.sm}>
            <TextField
              required
              label="Age"
              onChange={({ target }) => setAge(target.value)}
            />
          </Grid>
        </Grid>
        <Button
          style={{ margin: "20px 0" }}
          variant="contained"
          color="primary"
          onClick={() => {
            createUser({
              variables: {
                name: "cheese",
                email: "auth@auth.saufddfdtfh",
                password: "12345",
                location: "testLocation",
                avatar: "prettyPicture",
                role: "5ebf44978284563cf064ad88",
                categories: [
                  "5ec28e24df65822b544343e0",
                  "5ec28f49a8c4cf47cc645685",
                ],
                age: 15,
              },
            });
          }}
        >
          Add new user
        </Button>
      </form>
    </AppLayout>
  );
};

test.getInitialProps = async (ctx) => {
  // get users initially, probably something to move to _app.js
  const apolloClient = ctx.apolloClient;
  const { data, error, loading } = await apolloClient.query({
    query: USERS_QUERY,
  });
  if (error) return <div>error</div>;
  return { data, error, loading };
};

export default withApollo()(test);
