import * as React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import { InsertEventForm } from "./components/InsertEventForm";
import { UpdateEventForm } from "./components/UpdateEventForm";
import { Events } from "./components/Events";
import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap";

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
              <Nav.Link href="/events">Events</Nav.Link>
              <Nav.Link href="/insert_event">Add Event</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/insert_event">
            <InsertEventForm />
          </Route>
          <Route path="/update_event/:eventId">
            <UpdateEventForm />
          </Route>
          <Route path="/events">
            <Events />
          </Route>
        </Switch>
      </>
    );
  }
}

export default App;
