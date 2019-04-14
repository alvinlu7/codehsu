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
        password: null,
        passwordMatch: null,
        submitting: false
    }

    

    nameChangedHandler = (event) => {
        const oldState = {...this.state};
        this.setState({
            ...oldState,
            name: event.target.value
        });
    }

    addressChangedHandler = (event) => {
        const oldState = {...this.state};
        this.setState({
            ...oldState,
            address: event.target.value
        });
    }

    phoneChangedHandler = (event) => {
        const oldState = {...this.state};
        this.setState({
            ...oldState,
            phone: event.target.value
        });
    }

    emailChangedHandler = (event) => {
        const oldState = {...this.state};
        this.setState({
            ...oldState,
            email: event.target.value
        });
    }

    bioChangedHandler = (event) => {
        const oldState = {...this.state};
        this.setState({
            ...oldState,
            bio: event.target.value
        });
    }

    passwordChangedHandler = (event) => {
        const oldState = {...this.state};
        this.setState({
            ...oldState,
            password: event.target.value
        });
    }

    passwordMatchChangedHandler = (event) => {
        const oldState = {...this.state};
        this.setState({
            ...oldState,
            passwordMatch: event.target.value
        });
    }

    studentChangedHandler = (event) => {
        const oldState = {...this.state};
        this.setState({
            ...oldState,
            business: false
        });
    }

    businessChangedHandler = (event) => {
        const oldState = {...this.state};
        this.setState({
            ...oldState,
            business: true
        });
    }

    submitHandler = () => {
        let businessAddress = false;
        const oldState = {...this.state};
        this.setState({...oldState, submitting: true});
       
        const errors = {};
        let properInput = true;
        let matchedPassword = true;

        if(!!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email))
        {
            errors.email = alert('Invalid email address')
            properInput = false;
        }

        if(!!/^[0-9]{3}\-[0-9]{3}\-[0-9]{4}\-$/i.test(this.state.phone))
        {
            errors.phone = 'Invalid phone number'
            properInput = false;
        }

        if(this.state.password !== this.state.passwordMatch)
        {
            errors.password = 'Passwords do not match'
            matchedPassword = false;
            properInput = false;
        }

        if((this.state.business && this.state.address) ||
            this.state.business === false){
            businessAddress = true; 
        }

        if(businessAddress && properInput){

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
                    .catch((error) => {
                        console.log(error.code + ": " + error.message);
                        alert("Account already exists");
                    });

            })
            .catch(function(error) {
                alert("Check your email and password");
            });

        }
        else{

            var errorString = "Please check the following fields: ";
            if(errors.name || properInput != "true")
            {
               errorString += "- name ";
            }
                
            if(errors.phone || properInput != "true")
            {
                errorString += "- phone ";
            }
                
            if(errors.email || properInput != "true")
            {
                errorString += "- email ";
            } 
            
            if(errors.address || properInput != "true")
            {
                errorString += "- address ";
            }

            if(errors.password || properInput != "true")
            {
                errorString += "- password ";
            }
            
            if(errors.bio || properInput != "true")
            {
                errorString += "- bio ";
            }
            
            alert(errorString);
            const oldState = {...this.state};
            this.setState({...oldState, submitting: false})
        }
    }

   render() {
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
            passwordMatchChangedHandler={this.passwordMatchChangedHandler}
            name={this.state.name}
            address={this.state.address}
            phone={this.state.phone}
            email={this.state.email}
            bio={this.state.bio}
            business={this.state.business}
            student={this.state.student}
            submit={this.submitHandler}
            password={this.state.password}
            passwordMatch={this.state.passwordMatch}
            submitting={this.state.submitting}
        />
        </Grid>
        
    );
    }
}

export default RegistrationForm;