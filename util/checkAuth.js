import React from "react";
import Router from "next/router";
import UserContext from "../components/UserContext";
import nookies from "nookies";
import { USER_BY_TOKEN } from "../graphql/queries/users";
import { getUser } from "../redux/actions/auth";
import AppLayout from "../components/layout/AppLayout";
import Nav from "../components/layout/Nav";

export const checkAuth = (Component = React.Component) => {
  return class AuthComponent extends React.Component {
    state = {
      user: null,
      resolved: false,
    };
    static async getInitialProps(ctx) {
      const redirect = () => {
        if (ctx.res) {
          const redirect = "/?redirected=true";
          ctx.res.writeHead(302, {
            Location: redirect,
          });
          ctx.res.end();
        } else {
          Router.push("/");
        }
      };
      const reduxUser = ctx.store.getState().auth.user;
      console.log("reduxUser", reduxUser);
      let pageProps = {test: 'test'}
       if (Component.getInitialProps) {
         pageProps = await Component.getInitialProps(ctx);
       }
      // if (reduxUser) {
      //  return { ssrUser: reduxUser, pageProps }
      // }
      // console.log('got past')
      const token = nookies.get(ctx).token;
      let qry = null;

      if (token) {
        const apolloClient = ctx.apolloClient;
        let user = null;
        const qry = await apolloClient
          .query({
            query: USER_BY_TOKEN,
            variables: {
              token,
            },
          })
          .then(({ data }) => {
            user = data.userByToken;
          })
          .catch((err) => {
            console.log(err);
            console.log(ctx);
            user = null;
            redirect();
          });
        if (user) ctx.store.dispatch(getUser(user));
        return { ssrUser: user, pageProps };
      }
      redirect();
      return { ssrUser: null };
    }
    componentDidMount() {
      // setting local state to the user fetched from ssr if it exists
      if (this.props.props.pageProps.ssrUser) {
        this.setState({ user: this.props.props.pageProps.ssrUser });
      }
      // this will notify wrappers that the app is on client side so client side actions can take place.
      this.setState({ resolved: true });
      console.log(this.state);
    }
    logout = () => {
      this.setState({ user: null });
    };
    signin = (user) => {
      this.setState({ user });
    };
    render() {
      console.log("checkauth", this.props);
      return <Component testuser={this.props.props.pageProps.ssrUser} />;
    }
  };
};

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
