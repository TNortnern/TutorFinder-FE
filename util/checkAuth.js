import React from "react";
import Router from "next/router";
import UserContext from "../components/UserContext";

export const AuthWrapper = (props) => {
  const { privateRoute } = props;
  console.log(props);
  // handles securing private routes
  const context = React.useContext(UserContext);
  let { user, resolved } = context;
  let render = <></>;
  const isAuthed = () => {
    if (!user) {
      Router.push("/test");
    } else {
      render = <>{props.children}</>;
    }
  };
  if (resolved) {
    if (privateRoute) isAuthed();
  }
  return render;
};
