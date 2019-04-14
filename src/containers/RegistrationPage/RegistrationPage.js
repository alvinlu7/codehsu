import React,{Component} from 'react';
import RegistrationCard from '../../components/RegistrationCard/RegistrationCard';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {auth, db} from '../../backend/Firebase';
import './RegistrationPage.css'

class RegistrationForm extends Component{
    state = {
        firstName: null,
        lastName: null,
        locAddress: null,
        city: null,
        theState: "California",
        zipCode: null,
        phone: null,
        email: null,
        bio: null,
        business: null,
        password: null,
        passwordMatch: null,
        submitting: false,
        errors: {}
    }

    

    firstNameChangedHandler = (event) => {
        const oldState = {...this.state};
        this.setState({
            ...oldState,
            firstName: event.target.value
        });
    }
    lastNameChangedHandler = (event) => {
        const oldState = {...this.state};
        this.setState({
            ...oldState,
            lastName: event.target.value
        });
    }

    locAddressChangedHandler = (event) => {
        const oldState = {...this.state};
        this.setState({
            ...oldState,
            locAddress: event.target.value
        });
    }

    cityChangedHandler = (event) => {
        const oldState = {...this.state};
        this.setState({
            ...oldState,
            city: event.target.value
        });
    }

    theStateChangedHandler = (event) => {
        const oldState = {...this.state};
        this.setState({
            ...oldState,
            theState: event.target.value
        });
    }

    zipCodeChangedHandler = (event) => {
        const oldState = {...this.state};
        this.setState({
            ...oldState,
            zipCode: event.target.value
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
       
        let errors = {};
        let properInput = true;
        let matchedPassword = true;

        if(!this.state.firstName || !this.state.lastName)
        {
            console.log("first name and last name")
            //alert('Name required')
            errors['name'] = true;
            properInput= false;
        }

        if(!this.state.city)
        {
            console.log("city")
            //alert('City Required')
            errors.city = true;
            properInput = false;
        }

        if(!/^[0-9]{5}$/i.test(this.state.zipCode))
        {
            console.log("zip code")
            errors.zipCode = true;
            properInput = false;

        }

        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email))
        {
            console.log("email")
            errors.email = true;
            //alert(errors.email)
            properInput = false;
        }

        if(!/^[0-9]{3}\-[0-9]{3}\-[0-9]{4}$/i.test(this.state.phone))
        {
            console.log("phone")
            errors.phone = true;
            //alert(errors.phone)
            properInput = false;
        }

        if(!/^\w{8,}$/i.test(this.state.password))
        {
            console.log("password short")
            errors.password = true;
            //alert(errors.password)
            properInput = false;
            
        }
        if(this.state.password !== this.state.passwordMatch)
        {
            console.log("password")
            errors.password = true;
            //alert(errors.password);
            matchedPassword = false;
            properInput = false;
        }

        if((this.state.business && this.state.locAddress) ||
            this.state.business === false){
            businessAddress = true; 
        }
        else{
            //errors.accountType = true;
            alert("Select an account type or fill out address");
        }
        console.log("Business: " + this.state.business);
        console.log("Address:" + this.state.locAddress);
        console.log("Proper input: " +properInput);
        console.log("Business Address: " + businessAddress);
        console.log(errors);

        if(businessAddress && properInput){

            const name = this.state.firstName + " " + this.state.lastName;

            const address = this.state.locAddress + " " + this.state.city
                            + ", " + this.state.theState + " " + this.state.zipCode;

            auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(()=>{
                auth.signInWithEmailAndPassword(this.state.email, this.state.password)
                    .then(()=>{
                        const userID = auth.currentUser.uid;
                        db.collection("users").doc(userID).set({
                            name: name,
                            address: address,
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
            .catch((error) => {
                alert("Account already exists");
                this.setState({...oldState, submitting: false});
            });

        }
        else{

            const oldState = {...this.state};
            this.setState({...oldState, submitting: false, errors: errors});
            window.scrollTo(0, 0)
            //var errorString = "Please check the following fields: ";
            /*if(this.state.business === null){
                errorString += '- account type'
            }
            if(errors.name)
            {
               errorString += "- name ";
            }
                
            if(errors.phone)
            {
                errorString += "- phone ";
            }
                
            if(errors.email)
            {
                errorString += "- email ";
            } 
            
            if(errors.address || errors.city || errors.zipCode)
            {
                errorString += "- address ";
            }

            if(errors.password)
            {
                errorString += "- password ";
            }
            
            if(errors.bio)
            {
                errorString += "- bio ";
            }
            
            alert(errorString);
            */
            
        }
    }

   render() {
    return(
        <Grid container justify = "center">
            
            <RegistrationCard
            firstNameChangedHandler={this.firstNameChangedHandler}
            lastNameChangedHandler={this.lastNameChangedHandler}
            locAddressChangedHandler={this.locAddressChangedHandler}
            cityChangedHandler={this.cityChangedHandler}
            theStateChangedHandler={this.theStateChangedHandler}
            zipCodeChangedHandler={this.zipCodeChangedHandler}
            phoneChangedHandler={this.phoneChangedHandler}
            emailChangedHandler={this.emailChangedHandler}
            bioChangedHandler={this.bioChangedHandler}
            studentChangedHandler={this.studentChangedHandler}
            businessChangedHandler={this.businessChangedHandler}
            passwordChangedHandler={this.passwordChangedHandler}
            passwordMatchChangedHandler={this.passwordMatchChangedHandler}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            locAddress={this.state.locAddress}
            city={this.state.city}
            theState={this.state.theState}
            zipCode={this.state.zipCode}
            phone={this.state.phone}
            email={this.state.email}
            bio={this.state.bio}
            business={this.state.business}
            student={this.state.student}
            submit={this.submitHandler}
            password={this.state.password}
            passwordMatch={this.state.passwordMatch}
            submitting={this.state.submitting}
            errors={this.state.errors}
        />
        </Grid>
        
    );
    }
}

export default RegistrationForm;