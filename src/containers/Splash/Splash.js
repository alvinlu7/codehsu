import React, {Component} from 'react';
import splashImage from '../../assets/images/splash_background.jpg'
import './Splash.css';
import LoginCard from '../../components/LoginCard/LoginCard';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {auth} from '../../backend/Firebase';



class Splash extends Component {

    state = {
        email: null,
        password: null
    }

    onLogin = () =>{
        if(this.state.email && this.state.password){
            auth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(()=>{
                this.props.history.push('/home');
            })
            .catch((error) => {
                console.log(error.code + ": " + error.message);
                this.onFailedHandler();
            });
        }
        else{
            this.onFailedHandler();
        }
        
    }

    onFailedHandler = () => {
        alert('Incorrect username or password');
    }

    onSignUp = () =>{
        this.props.history.push('/registration');
    }

    onEmailChange = (event) => {
        const oldState = this.state;
        this.setState({...oldState, email: event.target.value});
    }

    onPasswordChange = (event) =>{
        const oldState = this.state;
        this.setState({...oldState, password: event.target.value});
    }

    render(){
        return (
            <div>
                <img id="splash-image" src={splashImage}/>
                <div className="main-page">
                    <div id="main-card">
                    <Typography id="main-typo" variant='h1' color='primary'>
                        CodeHSU
                    </Typography>
                    <hr/>
                    <Typography id="main-typo" variant='h5' color='primary'>
                        Connecting local businesses in the community to Humboldt State University Computer 
                        Science students
                    </Typography>
                    <br/>
                    <Button variant="contained" color="secondary" size="large" onClick={this.onSignUp}>Sign Up Now!</Button>
                    </div>
                    <LoginCard
                        email={this.state.email}
                        emailChange={this.onEmailChange}
                        password={this.state.password}
                        passwordChange={this.onPasswordChange}
                        login={this.onLogin}
                    />
                </div>
            </div>
        );
    }
}

export default Splash;