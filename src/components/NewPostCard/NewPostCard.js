import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

//TODO: Hovering on hard button after selected will highlight in grey
//Find a better solution than the current workaround

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 8,
    paddingLeft: theme.spacing.unit * 8,
    paddingRight: theme.spacing.unit * 8,
    minWidth: '50%',
  },
  button: {
    align: 'center'
  },
  hardButtonColor: {
      background: "#c62828"
  }
});

function SimpleCard(props) {
  const { classes } = props;
  let easyButton = "disabled";
  let mediumButton = "disabled";
  let hardButton = null
  if(props.difficulty === 'hard'){
    hardButton = classes.hardButtonColor ;
  }
  if(props.difficulty === 'medium'){
    mediumButton = "secondary"
  }
  if(props.difficulty === 'easy'){
    easyButton = "primary"
  }

  let Tags = null;
  
  if(props.tags){
        Tags = props.tags.map((text, index)=> {
            return <Chip
                label = {text}
                key = {index}
                onDelete = {() => props.handleDeleteTag(index)}
            />
        });
    }
  return (
    <Paper className={classes.root} 
          elevation={1}
          >
      <Grid container 
      alignContent = "center"
      direction="column"
      wrap="wrap">
      <Typography variant="h3" align="center">
        Add New Code Project
      </Typography>
      <TextField
        id= "postTitle"
        label = "Title of Project"
        value = {props.title}
        onChange = {props.titleChangedHandler}
        error = {props.errors.title}
    />

    <TextField
        id= "pitch"
        label = "Pitch (Less than 500 characters)"
        type = "text"
        inputProps = {{maxLength:"500"}}
        multiline
        rows = "5"
        value = {props.pitch}
        onChange = {props.pitchChangedHandler}
        error = {props.errors.pitch}
    />
    <br/>
    <TextField
        id= "description"
        label = "Description (Full description of project)"
        multiline
        rows="4"
        value = {props.description}
        onChange = {props.descriptionChangedHandler}
        error = {props.errors.description}
    />
    <br/>

    <Grid 
        alignContent="center"
      direction="row">
        <Typography variant="h6" alignItems="center">
            Difficulty of Project:
            <Button 
                variant="contained"
                color={easyButton}
                onClick={(event) => props.difficultyChangedHandler(event, 'easy')}
                style={{marginLeft: "10%"}}>
                    Easy
            </Button>
            <Button 
                variant="contained"
                color={mediumButton}
                onClick={(event) => props.difficultyChangedHandler(event, 'medium')}>
                    Medium
            </Button>
            <Button 
                variant="contained"
                color="inherit"
                className={hardButton} 
                onClick={(event) => props.difficultyChangedHandler(event, 'hard')}>
                    Hard
            </Button>
        </Typography>
          
    </Grid>
    
    <br/>
    <TextField
        id= "tags"
        label = "Keywords (Press Enter after each tag)"
        value = {props.tagsValue}
        onKeyDown = {props.tagsAddHandler}
        onChange = {props.tagsChangedHandler}
        error = {props.errors.tags}
    />
    <Grid  
      alignContent = "center"
      direction="row"
      wrap="wrap">{Tags}</Grid>
    
    <br/>
    <TextField
        id= "compensation"
        label = "Compensation for completion of project (ex: letters of recommendation, monetary)"
        value = {props.compensation}
        multiline
        rows = "3"
        onChange = {props.compensationChangedHandler}
        error = {props.errors.compensation}
    />
    <br/>
    <br/>
    <br/>
    <br/>
        <Button 
        className={classes.button}
        color="primary"
        variant="contained"
        size="large"
        onClick={props.submit}>
          Submit
        </Button>
        </Grid>
        
    </Paper>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);