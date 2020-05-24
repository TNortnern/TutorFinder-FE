/**
 * Description. logs user in
 * @param {login} [function] pass the redux action here
 * @param {refetch} [function] handles dispatching the apollo query
 * @param {dispatch} [function] react-redux hook to dispatch redux actions
 * @url https://test.com
 * @return {boolean} Redux will react differently depending on boolean
 */

export const loginHandler = async (login, refetch, dispatch, appLogin) => {
  let success = false;
  // call the login query
  await refetch()
    .then(({ data }) => {
      success = data.login.token;
      appLogin(data.login)
    })
    .catch((err) => {
      success = false;
      // using redux action to dispatch gain error feedback
      if (err.graphQLErrors) {
        dispatch(
          login({
            errors: err.graphQLErrors.map((item) => item.message),
          })
        );
      }
      dispatch(
        login({
          errors: err.message,
        })
      );
    });
  return success;
};
