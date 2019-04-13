import React, {Component} from 'react';
import splashImage from '../../assets/images/splash_background.jpg'
import './Splash.css';
import LoginCard from '../../components/LoginCard/LoginCard';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';



class Splash extends Component {

    state = {
        email: null,
        password: null
    }
    onSignUp = () =>{

    }

    onEmailChange = () => {

    }

    onPasswordChange = () =>{

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
                        Connecting local businesses in the community to <br/>Humboldt State University Computer 
                        Science students
                    </Typography>
                    <br/>
                    <Button variant="contained" color="primary" size="large" onClick={this.onSignUp}>Sign Up Now!</Button>
                    </div>
                    <LoginCard
                        email={this.state.email}
                        emailChange={this.onEmailChange}
                        password={this.state.password}
                        passwordChange={this.onPasswordChange}
                    />
                </div>
            </div>
        );
    }
}

export default Splash;