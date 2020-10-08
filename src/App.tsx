import * as React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const AnonymousComments = React.lazy(() => import("./components/AnoComments"));
const RegisterNows = React.lazy(() => import("./components/RegisterNows"));
const UpdateEventForm = React.lazy(() => import("./components/UpdateEventForm"));
const InsertEventForm = React.lazy(() => import("./components/InsertEventForm"));
const Events = React.lazy(() => import("./components/Events"));
const Features = React.lazy(() => import("./components/Features"));

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
                  <Link to="/registers">Registers</Link>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Comment" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/ano_comments">Comments</Link>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Feature" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/features">Feature</Link>
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
            <React.Suspense fallback={<div>Loading</div>}>
              <Events />
            </React.Suspense>
          </Route>
          <Route path="/insert_event">
            <React.Suspense fallback={<div>Loading</div>}>
              <InsertEventForm />
            </React.Suspense>
          </Route>
          <Route path="/update_event/:eventId">
            <React.Suspense fallback={<div>Loading</div>}>
              <UpdateEventForm />
            </React.Suspense>
          </Route>
          <Route path="/events">
            <React.Suspense fallback={<div>Loading</div>}>
              <Events />
            </React.Suspense>
          </Route>
          <Route path="/ano_comments">
            <React.Suspense fallback={<div>Loading</div>}>
              <AnonymousComments />
            </React.Suspense>
          </Route>
          <Route path="/registers">
            <React.Suspense fallback={<div>Loading</div>}>
              <RegisterNows />
            </React.Suspense>
          </Route>
          <Route path="/features">
            <React.Suspense fallback={<div>Loading</div>}>
              <Features />
            </React.Suspense>
          </Route>
          
        </Switch>
      </>
    );
  }
}

export default App;
