import * as React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { InsertEventForm } from "./components/InsertEventForm";
import { UpdateEventForm } from "./components/UpdateEventForm";
import { Events } from "./components/Events";
import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { AnonymousComments } from "./components/AnoComments";

class App extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  render() {
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">WINFUN Administrators Page</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Event" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/events">Events</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to="/insert_event">Add Event</Link>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Register Now" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/events">Registers</Link>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Comment" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/ano_comments">Comments</Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/">
            <Events />
          </Route>
          <Route path="/insert_event">
            <InsertEventForm />
          </Route>
          <Route path="/update_event/:eventId">
            <UpdateEventForm />
          </Route>
          <Route path="/events">
            <Events />
          </Route>
          <Route path="/ano_comments">
            <AnonymousComments />
          </Route>
        </Switch>
      </>
    );
  }
}

export default App;
