import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import * as routes from "../routes";

class SignOutButton extends Component {
  onSignOut = () => {
    localStorage.removeItem("user");
    this.props.history.push(routes.SIGN_IN);
  };
  render() {
    return (
      <Button type="button" onClick={this.onSignOut}>
        Sign Out
      </Button>
    );
  }
}

export default withRouter(SignOutButton);
