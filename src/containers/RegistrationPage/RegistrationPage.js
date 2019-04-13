import React,{Component} from 'react';


class RegistrationForm extends Component{
    state = {
        name: null,
        address: null,
        phone: null,
        email: null,
        bio: null,
        business: null
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

    businessChangeHandler = (event) => {
        const oldState = this.state;
        this.setState({
            ...oldState,
            business: event.target.value
        });
    }


   render() {
    return(
        // Name 
        <div>
        <TextField
            id = "regName"
            label = "Name"
            value = {this.state.name}
            onChange = {this.nameChangedHandler}
        />

        // Address
        <TextField
        id = "regAddress"
        label = "Address"
        value = {this.state.address}
        onChange = {this.addressChangedHandler}
        />

        //Phone
        <TextField
        id = "regPhone"
        label = "Phone"
        value = {this.state.phone}
        onChange = {this.phoneChangedHandler}
        />

        //Email
        <TextField
        id = "regEmail"
        label = "Email"
        onChange = {this.emailChangedHandler}
        />

        // Bio
        <TextField
        id = "regBio"
        label = "Bio"
        value = {this.state.bio}
        onChange = {this.bioChangedHandler}
        />

        // Business
        <TextField
        id = "regBusiness"
        label = "Business"
        value = {this.state.business}
        onChange = {this.businessChangeHandler}
        />
        </div>
    );
}
}