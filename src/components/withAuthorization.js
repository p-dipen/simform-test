import React from "react";
import { withRouter } from "react-router-dom";

import * as routes from "../routes";

const withAuthorization = Component => {
  class WithAuthorization extends React.Component {
    componentWillMount() {
      if (!localStorage.getItem("user")) {
        this.props.history.push(routes.SIGN_IN);
      }
    }

    render() {
      return <Component />;
    }
  }

  return withRouter(WithAuthorization);
};

export default withAuthorization;
