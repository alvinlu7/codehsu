import React, {Component} from 'react';
//import {auth} from '../../backend/Firebase';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../../components/Layout/Layout';
import {db} from '../../backend/Firebase';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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

class Home extends Component {
    state = {
        posts: null
    }

    componentDidMount = () => {
        let posts = [];
        db.collection("posts").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                posts.push({...doc.data(), id: doc.id});
            });
            this.setState({posts: posts})
        });
    }
    render(){
        const { classes } = this.props;
        let Posts = null;
        if(this.state.posts){
            Posts = this.state.posts.map((post, index) => {
                return (
                    <Card height="10%" className={classes.card}>
                            <CardContent>
                                <Typography variant="h4">
                                    {post.title}
                                </Typography>
                                <Typography varian="body">
                                    {post.pitch}
                                </Typography>
                            </CardContent>
                        
                    </Card>
                )
            });
        }
        console.log(this.state);

        return (
            <Layout isHome>
                <Grid container 
                    justify = "center"
                    alignItems = "center"
                    direction="column">
                    {Posts}
                </Grid>
                
            </Layout>
        );
    }
}

export default withStyles(styles)(Home);