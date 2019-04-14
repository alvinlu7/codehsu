import React, {Component} from 'react';
//import {auth} from '../../backend/Firebase';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../../components/Layout/Layout';
import {db, storage, auth} from '../../backend/Firebase';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PostCard from '../../components/PostCard/PostCard';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';


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
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
  };

class Profile extends Component {
    state = {
        user: null,
        image: null
    }

    componentDidMount = () => {
        const userID = this.props.match.params.id;
        let currentUser = null;
        if(auth.currentUser){
            currentUser = auth.currentUser.uid;
        }
        storage.ref('users/'+userID).getDownloadURL().then((url) => {
            const oldState = this.state;
            this.setState({...oldState, image: url});
        })
        .catch(error=>{

        });
        db.collection('users').doc(userID).get()
        .then((doc) => {
            if (doc.exists) {
                const oldState = this.state;
                this.setState({...oldState, user: doc.data()});
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            alert("Error getting document:", error);
        });

        if(userID == currentUser){
            const oldState = {...oldState};
            let posts = [];
            db.collection("posts").where("auth_id", "==", userID).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    posts.push({...doc.data(), id: doc.id});
                });
                this.setState({...oldState, posts: posts})
            });
        }
    }

    deletePost = (event, index) => {
        var toDelete = this.state.posts[index].id;
        db.collection('posts').doc(toDelete).delete().then(()=>{
            this.componentDidMount();
        })
    }

    render(){
        const { classes } = this.props;
        console.log(this.state);
        
        let Posts = this.state.posts;
        if(Posts){
            Posts = Posts.map((post, index) => {
            return (
                <Card
                    key = {index}
                >   
                    <CardContent>
                    <Grid
                        justify="space-between" // Add it here :)
                        container 
                    >
                        <Typography variant="h6">{post.title}</Typography>
                        <Button variant="contained" 
                                color="secondary"
                                onClick={(event) => this.deletePost(event, index)}>
                            Delete
                        </Button>
                    </Grid>
                    </CardContent>
                </Card>
                )
            });
        }
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

                    {this.state.image ? 
                        <Avatar src={this.state.image} className={classes.bigAvatar} />
                    :null}
                    
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
                    <br/>
                    {Posts}
                    
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