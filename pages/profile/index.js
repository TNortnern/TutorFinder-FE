import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import { AuthWrapper } from "../../util/checkAuth";
import Router from "next/router";

const index = (props) => {
  return (
    <AuthWrapper privateRoute>
      <AppLayout>
        <div>Hello</div>
      </AppLayout>
    </AuthWrapper>
  );
};

export default index;
