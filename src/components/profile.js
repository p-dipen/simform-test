import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  ButtonToolbar,
  ToggleButton,
  ToggleButtonGroup
} from "react-bootstrap";
import Skills from "./skills";
import withAuthorization from "./withAuthorization";
import SignOutButton from "./signOut";
const ProfilePage = ({ history }) => (
  <Container>
    <Row className="justify-content-center">
      <h1>Profile</h1>
    </Row>
    <Row className="justify-content-end">
      <SignOutButton />
    </Row>
    <ProfileForm history={history} />
  </Container>
);

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      INITIAL_STATE: {
        name: "",
        age: "",
        gender: "1",
        skills: [
          { id: 1, skill: "Javascript" },
          { id: 2, skill: "Python" },
          { id: 3, skill: "PHP" },
          { id: 4, skill: "Java" },
          { id: 5, skill: "C++" }
        ],
        error: null
      }
    };
  }
  componentWillMount() {
    if (localStorage.getItem("state") !== null) {
      let states = JSON.parse(localStorage.getItem("state"));
      this.setState({ INITIAL_STATE: states });
    }
  }
  onChange = e => {
    this.setState({
      INITIAL_STATE: {
        ...this.state.INITIAL_STATE,
        [e.target.name]: e.target.value
      }
    });
  };
  onChangeSkill = e => {
    let newskills = JSON.parse(JSON.stringify(this.state.INITIAL_STATE.skills));
    newskills[e.target.name].skill = e.target.value;
    this.setState(() => ({
      INITIAL_STATE: {
        ...this.state.INITIAL_STATE,
        skills: newskills
      }
    }));
  };
  onChangeSkills = newskills => {
    this.setState(() => ({
      INITIAL_STATE: {
        ...this.state.INITIAL_STATE,
        skills: newskills
      }
    }));
  };
  onDestorySkill = i => {
    let newskills = JSON.parse(JSON.stringify(this.state.INITIAL_STATE.skills));
    console.log(newskills[i].skill);
    newskills[i].skill = "";
    this.setState(() => ({
      INITIAL_STATE: {
        ...this.state.INITIAL_STATE,
        skills: newskills
      }
    }));
  };
  onSubmit = event => {
    event.preventDefault();
  };
  setupBeforeUnloadListener = () => {
    window.addEventListener("beforeunload", ev => {
      let state = this.state.INITIAL_STATE;
      localStorage.setItem("state", JSON.stringify(state));
      ev.preventDefault();
      return alert(localStorage.getItem("state"));
    });
  };
  componentDidMount() {
    this.setupBeforeUnloadListener();
  }
  componentWillUnmount() {
    let state = this.state.INITIAL_STATE;
    localStorage.setItem("state", JSON.stringify(state));
  }
  render() {
    const { name, age, gender, skills, error } = this.state.INITIAL_STATE;

    return (
      <Container>
        <Row className="show-grid justify-content-center">
          <Col md={6}>
            <form>
              <Form.Group>
                <Form.Control
                  type="text"
                  value={name}
                  placeholder="Full Name"
                  name="name"
                  onChange={this.onChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  value={age}
                  name="age"
                  onChange={this.onChange}
                  type="number"
                  placeholder="Age"
                  required
                />
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={4}>
                  Gender
                </Form.Label>
                <ButtonToolbar sm={8}>
                  <ToggleButtonGroup
                    type="radio"
                    name="gender"
                    defaultValue={gender}
                  >
                    <ToggleButton onChange={this.onChange} value={"1"}>
                      Male
                    </ToggleButton>
                    <ToggleButton onChange={this.onChange} value={"2"}>
                      Female
                    </ToggleButton>
                  </ToggleButtonGroup>
                </ButtonToolbar>
              </Form.Group>
              <Form.Group>
                <Form.Label>Skills</Form.Label>
                <Skills
                  skills={skills}
                  onchnageskill={this.onChangeSkill}
                  onchangeskills={this.onChangeSkills}
                  ondestoryskill={this.onDestorySkill}
                />
              </Form.Group>
              <Form.Group>{error && <p>{error.message}</p>}</Form.Group>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withAuthorization(ProfilePage);

export { ProfileForm };
