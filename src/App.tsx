import * as React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import { InsertEventForm } from "./components/InsertEventForm";
import { UpdateEventForm } from "./components/UpdateEventForm";

class App extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  render() {
    return (
      <>
        
        <Switch>
          <Route exact path="/insert_event">
		  	<InsertEventForm />
          </Route>
          <Route path="/update_event/:eventId">
            <UpdateEventForm />
          </Route>
          {/* <Route path="/dashboard">
            <Dashboard />
          </Route> */}
        </Switch>
      </>
    );
  }
}

export default App;
