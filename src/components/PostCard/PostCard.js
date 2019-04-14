import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import {auth, db, storage} from '../../backend/Firebase';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';



const styles = theme => ({
  root: {
    width: "80%",
      marginTop: "1%",
      marginBottom:"1%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(24),
    fontWeight: theme.typography.fontWeightRegular,
  },
  caption: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class SimpleExpansionPanel extends Component {

    state = {
        comments: null,
        pendingComment: null,
        submitting: false
    }

    componentDidMount(){
        let comments = [];
        db.collection("posts").doc(this.props.post.id).collection('comments').orderBy("timestamp", "desc").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                comments.push({...doc.data(), id: doc.id});
            });
            let oldState = this.state;
            //this.loadImages(comments);
            this.setState({...oldState, comments: comments});
        });
    }

    //TODO: Load avatar images ... one day
    /*
    loadImages = (comments) =>{
        var comments = comments.map(comment => {
            storage.ref('users/'+comment.user_id).getDownloadURL()
                .then((url) => {
                    return {...comment, image: url};
                })
                .catch(error=>{
                    return {...comment, image: null};
                });
        });
        console.log(comments);

        var oldState = {...this.state};
        this.setState({...oldState, comments: comments});
    }*/
    /*storage.ref('users/'+doc.data().user_id).getDownloadURL()
                .then((url) => {
                    console.log(url)
                    comments.push({...doc.data(), id: doc.id, image: url});
                })
                .catch(error=>{
                    console.log("Did not fetch images")
                    
                });*/

    onComment = (event) =>{
        var oldState = {...this.state};
        this.setState({...oldState, pendingComment: event.target.value})
    }

    submitComment = () =>{
        const oldState = {...this.state};
        if(this.state.pendingComment){
            this.setState({...oldState, submitting: true})
            const userID = auth.currentUser.uid;
            db.collection("users").doc(userID).get()
            .then((doc) => {
                let name = doc.data().name;
                db.collection("posts").doc(this.props.post.id).collection('comments').doc().set({
                    user_id: userID,
                    comment: this.state.pendingComment,
                    name: name,
                    timestamp: new Date().getTime()
                })
                .then(() => {
                    this.setState({...oldState, pendingComment: "", submitting: false})
                    this.componentDidMount();
                })
                .catch(function(error) {
                    alert("Error writing document: ", error);
                });
            });
        }   
        
        
    }
    render(){
        const { classes } = this.props;
        let comments = null;
        if(this.state.comments){
            comments = this.state.comments.map((comment, index) => {
                return (
                    <Card>
                        <CardContent>
                            <Link to={'/'+comment.user_id}>
                            {comment.image ? 
                            <Avatar src={comment.image}/>
                            :null}
                            <Typography variant="body1">
                                {comment.name}
                            </Typography>
                            </Link>
                            <Typography variant="body2"
                                color="textSecondary">
                                {comment.comment}
                            </Typography>
                        </CardContent>
                    </Card>
                )
            })
        }
        return (
            <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Grid container direction="column">
                    <Typography className={classes.heading}>{this.props.post.title}</Typography>
                    <Typography className={classes.caption}><p>{this.props.post.pitch}</p></Typography>
                    </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container direction="column">
                        <Typography variant="caption">
                            {new Date(this.props.post.timestamp).toDateString()}
                        </Typography>
                        <Typography variant="caption">
                            Keywords: {this.props.post.tags.join(", ")}
                        </Typography>
                        <br/>
                        <Typography>
                            Description: {this.props.post.description}
                        </Typography>
                        <Typography>
                            Difficulty: {this.props.post.difficulty}
                        </Typography>
                        <Typography>
                            Compensation: {this.props.post.compensation}
                        </Typography>
                        <br/>
                            <Button variant ="contained" 
                                    color="primary"
                                    onClick={event => this.props.goToBusiness(event, this.props.post.auth_id)}
                                    >
                                Contact       
                            </Button>
                        <hr/>
                        <Grid direction ="row" justify="center">
                        <TextField
                            label="Add a comment"
                            multiline
                            rows='3'
                            fullWidth
                            value={this.state.pendingComment}
                            onChange={this.onComment}/>
                        </Grid>
                        <br/>
                        {this.state.submitting ? <CircularProgress/> :
                            <Button variant="contained"
                            color="secondary"
                            onClick={this.submitComment}>Add Comment</Button>
                        }
                        <br/>
                        {comments}
                    
                    </Grid>
                </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
  
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};
//
export default withStyles(styles)(SimpleExpansionPanel);