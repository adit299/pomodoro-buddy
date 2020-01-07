import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import TasksList from "./components/tasks-list.component";
import EditTask from "./components/edit-task.component";
import CreateTask from "./components/create-task.component";
import CreateUser from "./components/create-user.component";

// Each of our path components has a path parameter, which takes in  
// what the path addition is from the root path, and what component
// is called for each of the cases
function App() {
    return (
        <Router>
            <div className="container">
                <Navbar />
                <br/>
                <Route path="/" exact component={TasksList} />
                <Route path="/edit/:id" component={EditTask} />
                <Route path="/create" component={CreateTask} />
                <Route path="/user" component={CreateUser} />
            </div>
        </Router>
    );
}

export default App;