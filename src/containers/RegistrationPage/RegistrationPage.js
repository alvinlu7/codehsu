import React,{Component} from 'react';
import RegistrationCard from '../../components/RegistrationCard/RegistrationCard';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {auth, db} from '../../backend/Firebase';

import './RegistrationPage.css'

class RegistrationForm extends Component{
    state = {
        name: null,
        address: null,
        phone: null,
        email: null,
        bio: null,
        business: null,
        password: null
    }

    nameChangedHandler = (event) => {
        const oldState = this.state;
        this.setState({
            ...oldState,
            name: event.target.value
        });
    }

    addressChangedHandler = (event) => {
        const oldState = this.state;
        this.setState({
            ...oldState,
            address: event.target.value
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

    bioChangedHandler = (event) => {
        const oldState = this.state;
        this.setState({
            ...oldState,
            bio: event.target.value
        });
    }

    passwordChangedHandler = (event) => {
        const oldState = this.state;
        this.setState({
            ...oldState,
            password: event.target.value
        });
    }

    studentChangedHandler = (event) => {
        const oldState = this.state;
        this.setState({
            ...oldState,
            business: false
        });
    }

    businessChangedHandler = (event) => {
        const oldState = this.state;
        this.setState({
            ...oldState,
            business: true
        });
    }

    submitHandler = () => {
        let businessAddress = false;

        if((this.state.business && this.state.address) ||
            this.state.business === false){
            businessAddress = true; 
        }

        if(this.state.name &&
            businessAddress &&
            this.state.phone &&
            this.state.email &&
            this.state.bio &&
            this.state.business !== null){

            auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(()=>{
                auth.signInWithEmailAndPassword(this.state.email, this.state.password)
                    .then(()=>{
                        const userID = auth.currentUser.uid;
                        db.collection("users").doc(userID).set({
                            name: this.state.name,
                            address: this.state.address,
                            phone: this.state.phone,
                            email: this.state.email,
                            bio: this.state.bio,
                            business: this.state.business
                        })
                        .then(()=> {
                            this.props.history.push('/home');
                        })
                        .catch(function(error) {
                            console.error("Error writing document: ", error);
                        });
                    })
                    .catch(function(error) {
                        console.log(error.code + ": " + error.message);
                        this.onFailedHandler();
                    });

            })
            .catch(function(error) {
                alert("Check your email and password");
            });

        }
        else{
            alert("Please fill out all forms");
        }
    }

   render() {

    console.log(this.state);
    return(
        <Grid container justify = "center">
            
            <RegistrationCard
            nameChangedHandler={this.nameChangedHandler}
            addressChangedHandler={this.addressChangedHandler}
            phoneChangedHandler={this.phoneChangedHandler}
            emailChangedHandler={this.emailChangedHandler}
            bioChangedHandler={this.bioChangedHandler}
            studentChangedHandler={this.studentChangedHandler}
            businessChangedHandler={this.businessChangedHandler}
            passwordChangedHandler={this.passwordChangedHandler}
            name={this.state.name}
            address={this.state.address}
            phone={this.state.phone}
            email={this.state.email}
            bio={this.state.bio}
            business={this.state.business}
            student={this.state.student}
            submit={this.submitHandler}
            password={this.state.password}
        />
        </Grid>
        
    );
    }
}

export default RegistrationForm;