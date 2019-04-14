import React, {Component} from 'react';
//import {auth} from '../../backend/Firebase';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../../components/Layout/Layout';
import {db} from '../../backend/Firebase';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PostCard from '../../components/PostCard/PostCard'

const styles = {
    card: {
      width: "80%",
      marginTop: "1%",
      marginBottom:"1%"
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  };

class Profile extends Component {
    state = {
        user: null
    }

    componentDidMount = () => {
        const userID = this.props.match.params.id;
        db.collection('users').doc(userID).get()
        .then((doc) => {
            if (doc.exists) {
                this.setState({user: doc.data()});
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            alert("Error getting document:", error);
        });
    }

    render(){
        const { classes } = this.props;
        console.log(this.state);

        return (
            <Layout isHome>
            {this.state.user ?
            <Grid 
                container
                justify = "center"
                alignItems = "center"
                direction="column">
            <Card className={classes.card}>
            <CardContent>
                <Grid 
                    justify = "center"
                    alignItems = "center"
                    direction="column">
                    <br/>
                    <Typography variant="h4">
                        {this.state.user.name}
                    </Typography>
                    <br/>
                    <Typography variant="subtitle2">
                        Address: {this.state.user.address}
                    </Typography>
                    <Typography variant="subtitle2">
                        Email: {this.state.user.email}
                    </Typography>
                    <Typography variant="subtitle2">
                        Phone: {this.state.user.phone}
                    </Typography>
                    <br/>
                    <br/>
                    <br/>
                    <Typography variant="body">
                        {this.state.user.bio}
                    </Typography>
                    
                </Grid>
            </CardContent>
            </Card>
            </Grid>
            
            : null}
            
            </Layout>
        );
    }
}

export default withStyles(styles)(Profile);