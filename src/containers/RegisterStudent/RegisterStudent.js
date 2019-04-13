import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';


class StudentRegistration extends Component{
    state = {
        name: null,
        address: null,
        phone: null,
        email: null,
        courses: null,
        bio: null,
    }

    nameChangedHandler = (event) => {
        const oldState = this.state;
        this.setState({
            ...oldState,
            name: event.target.value
        });
    }

    phoneChangedHandler = (event) => {
        const oldState = this.state;
        this.setState({
            ...oldState,
            phone: event.target.value
        });
    }

    emailChangedHandler = (event) => {
        const oldState = this.state;
        this.setState({
            ...oldState,
            email: event.target.value
        });
    }

    coursesChangedHandler = (event) => {
        const oldState = this.state;
        this.setState({
            ...oldState,
            courses: event.target.value
        });
    }

    bioChangedHandler = (event) => {
        const oldState = this.state;
        this.setState({
            ...oldState,
            bio: event.target.value
        });
    }



   render() {
    return(
  
        <div>
        <TextField
            id = "regName"
            label = "Name"
            value = {this.state.name}
            onChange = {this.nameChangedHandler}
        />

        <TextField
        id = "stuEmail"
        label = "HSU Email"
        onChange = {this.emailChangedHandler}
        />

        <TextField
        id = "stuPhone"
        label = "Phone"
        value = {this.state.phone}
        onChange = {this.phoneChangedHandler}
        />

        <TextField
        id = "stuCourses"
        label = "Courses Taken"
        value = {this.state.courses}
        onChange = {this.coursesChangedHandler}
        />

  

        <TextField
        id = "stuBio"
        label = "Bio"
        value = {this.state.bio}
        onChange = {this.bioChangedHandler}
        />
 


        />
        </div>
    );
}
}

export default StudentRegistration

