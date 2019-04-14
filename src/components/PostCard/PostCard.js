import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {auth, db} from '../../backend/Firebase';
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
        pendingComment: null
    }

    componentDidMount(){
        let comments = [];
        db.collection("posts").doc(this.props.post.id).collection('comments').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                comments.push({...doc.data(), id: doc.id});
            });
            this.setState({comments: comments})
        });
    }

    onComment = (event) =>{
        var oldState = {...this.state};
        this.setState({...oldState, pendingComment: event.target.value})
    }

    submitComment = () =>{
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
                this.componentDidMount();
            })
            .catch(function(error) {
                alert("Error writing document: ", error);
            });
        });
        
        
    }
    render(){
        const { classes } = this.props;
        let comments = null;
        if(this.state.comments){
            comments = this.state.comments.map((comment, index) => {
                return (
                    <Card>
                        <CardContent>
                            <Typography variant="body1">
                                {comment.name}
                            </Typography>
                            <Typography variant="body2"
                                color="textSecondary">
                                {comment.comment}
                            </Typography>
                        </CardContent>
                    </Card>
                )
            })
        }
        console.log(this.state);
        return (
            <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Grid direction="column">
                        <Typography className={classes.heading}>{this.props.post.title}</Typography>
                        <Typography className={classes.caption}>{this.props.post.pitch}</Typography>
                    </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid direction="column"
                            width="80%">
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
                        <Grid direction ="row">
                        <TextField
                            label="Add a comment"
                            multiline
                            rows='3'
                            onChange={this.onComment}/>
                        <Button variant="contained"
                        color="secondary"
                        onClick={this.submitComment}>Add Comment</Button>
                        </Grid>
                        
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