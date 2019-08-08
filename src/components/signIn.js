import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import * as routes from "../routes";

const SignInPage = ({ history }) => (
  <div className="align-items-center">
    <Container>
      <Row className="justify-content-center">
        <h1>SignIn</h1>
      </Row>
      <SignInForm history={history} />
    </Container>
  </div>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    const { history } = this.props;
    if (email === "admin@admin.com" && password === "admin@123") {
      localStorage.setItem("user", true);
      history.push(routes.PROFILE);
    } else {
      console.log("error");
      this.setState(byPropKey("error", "email and password is invalid."));
    }
    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <Container>
        <Row className="justify-content-center">
          <Col md={4}>
            <form onSubmit={this.onSubmit}>
              <Form.Group>
                <Form.Control
                  value={email}
                  onChange={event =>
                    this.setState(
                      byPropKey("email", event.target.value),
                      byPropKey("error", null)
                    )
                  }
                  type="email"
                  placeholder="Email Address"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  value={password}
                  onChange={event =>
                    this.setState(
                      byPropKey("password", event.target.value),
                      byPropKey("error", null)
                    )
                  }
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group>
                <Row className="justify-content-center">
                  <Button disabled={isInvalid} type="submit">
                    Sign In
                  </Button>
                </Row>
              </Form.Group>
              <Form.Group>
                {error != null && (
                  <Alert variant="danger" className="text-center">
                    {error}
                  </Alert>
                )}
              </Form.Group>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(SignInPage);

export { SignInForm };
