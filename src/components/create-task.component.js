import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
// streamlines the selection of dates within this application
import "react-datepicker/dist/react-datepicker.css"

export default class CreateTask extends Component {
    // The constructor for our component, remember that you always
    // have to start one of these components with a call to the superclass, props
    constructor(props) {
        super(props);

        // When we refer to "this", in the methods below, we want to be sure we are 
        // referring to this class. In order to be sure, we have to make the bind 
        // statements below.

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            description: "",
            duration: 0,
            date: new Date(),
            users:[]
        }
    }

    // An example of a react life cycle method. This method is called before anything is
    // displayed on the screen

    componentDidMount() {
      axios.get('http://localhost:5000/users/')
        .then(response => {
          if (response.data.length > 0) {
            this.setState({
              users: response.data.map(user => user.username),
              username: response.data[0].username

            })
          }
        })
        .catch((error) => {
          console.log(error);
        })
      }

    // Each of these classes update the state, remember to never directly update the
    // state with statements like this.state.username = , always use the setState
    // method

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const task = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(task);

        axios.post('http://localhost:5000/tasks/add', task)
          .then(res => console.log(res.data));

        window.location = "/";
    }

    // An example of a standard HTML form, which can take user input about a task
    // and submit the information when the user clicks submit (note that the Javascript
    // is enclosed in a pair of curly braces, it signifies that this method is called
    // when the submit button is clicked)

    // Another thing to note is the code in curly braces immediately following 
    // the onChange function, this deals with the dropdown menu, essentially it is
    // communicating with the MongoDB database to map each user from an array


    render() {
        return (
        <div>
            <h3>Create New Tasks Log</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Username: </label>
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}>
                    {
                      this.state.users.map(function(user) {
                        return <option 
                          key={user}
                          value={user}>{user}
                          </option>;
                      })
                    }
                </select>
              </div>
              <div className="form-group"> 
                <label>Description: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    />
              </div>
              <div className="form-group">
                <label>Duration (in minutes): </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.duration}
                    onChange={this.onChangeDuration}
                    />
              </div>
              <div className="form-group">
                <label>Date: </label>
                <div>
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                  />
                </div>
              </div>
      
              <div className="form-group">
                <input type="submit" value="Create Tasks Log" className="btn btn-primary" />
              </div>
            </form>
          </div>
            
        )
    }
}