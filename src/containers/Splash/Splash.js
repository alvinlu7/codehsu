import React, {Component} from 'react';
import splashImage from '../../assets/images/splash_background.jpg'
import './Splash.css';
import LoginCard from '../../components/LoginCard/LoginCard';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {auth} from '../../backend/Firebase';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
  } from "react-device-detect";

  var sectionStyle = {
    width: "100%",
    backgroundImage: `url(${splashImage})`
  };

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
            <div className="mobile-wrapper">
                <BrowserView>
                
                <div className="main-page bg">
                    <img id="splash-image" src={splashImage}/>
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
                </BrowserView>
                <MobileView >
                    <img className='bg' src={splashImage}/>
                    <Grid direction="column">
                        <div id="main-card-mobile">
                        <Typography id="main-typo" variant='h2' color='primary'>
                            CodeHSU
                        </Typography>
                        <hr/>
                        <Typography id="main-typo" variant='body1' color='primary'>
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
                    </Grid>
                </MobileView>
            </div>
        );
    }
}

export default Splash;