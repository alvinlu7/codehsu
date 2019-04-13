import React, {Component} from 'react';
import splashImage from '../../assets/images/splash_background.jpg'
import './Splash.css';
import Card from '../../components/Card/Card';
import Typography from '@material-ui/core/Typography';


class Splash extends Component {
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
                    </div>

                    <Card>
                        Testing
                    </Card>
                </div>
            </div>
        );
    }
}

export default Splash;