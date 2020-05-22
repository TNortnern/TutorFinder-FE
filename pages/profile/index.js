import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import { checkAuth } from "../../util/checkAuth";

const index = (props) => {
  return (
    <AppLayout>
        <div>Hello</div>
    </AppLayout>
  );
};

export default checkAuth(index);
