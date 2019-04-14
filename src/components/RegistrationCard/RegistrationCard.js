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
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 8,
    paddingLeft: theme.spacing.unit * 8,
    paddingRight: theme.spacing.unit * 8,
    minWidth: '50%',
    align: 'center'
  },
  button: {
    align: 'center'
  }
});

function SimpleCard(props) {
  const { classes } = props;
  let businessButton = "disabled";
  let studentButton = "disabled";
  if(props.business){
    businessButton = "secondary";
  }
  if(props.business === false){
    studentButton = "secondary";
  }
  return (
    <Paper className={classes.root} 
          elevation={1}
          >
      <Grid container 
      justify = "center"
      alignItems = "center"
      direction="column">
      <Typography variant="h3" align="center">
        Registration
      </Typography>
      <br/>
      <Typography variant="h6" align="center">
        Select type of account:
      </Typography>
      <br/>
      <Button color={businessButton}
        variant="contained"
        onClick={props.businessChangedHandler}
        fullWidth
        >
        Business
        </Button>
        <Button color={studentButton}
        variant="contained"
        onClick={props.studentChangedHandler}
        fullWidth
        >
        Student
        
        </Button>
      <br/>
      <TextField
            id = "regName"
            label = "Name"
            value = {props.name}
            onChange = {props.nameChangedHandler}
            fullWidth
        />
        
        <br/>
        {props.business ?
        <div><TextField
        id = "regAddress"
        label = "Address"
        value = {props.address}
        onChange = {props.addressChangedHandler}
        fullWidth
        /><br/></div>
        : null}

        <TextField
        id = "regPhone"
        label = "Phone (###-###-####)"
        value = {props.phone}
        onChange = {props.phoneChangedHandler}
        fullWidth
        />
        <br/>
        <TextField
        id = "regEmail"
        label = "Email (example@gmail.com)"
        value = {props.email}
        onChange = {props.emailChangedHandler}
        fullWidth
        />
        <br/>
        <TextField
        id = "regPassword"
        label = "Password"
        type="password"
        value = {props.password}
        onChange = {props.passwordChangedHandler}
        fullWidth
        />
        <br/>
        <TextField
            id = "regPasswordMatch"
            label = "Re-enter Password"
            value = {props.passwordMatch}
            onChange = {props.passwordMatchChangedHandler}
            fullWidth
        />
        <br/>
        <TextField
        id = "regBio"
        label = "Bio"
        multiline
        rows="4"
        value = {props.bio}
        onChange = {props.bioChangedHandler}
        fullWidth
        />
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

        {props.submitting ?
        <CircularProgress align="center"/>
        :
        <Button 
        className={classes.button}
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        onClick={props.submit}>
          Submit
        </Button>
      }
        
        </Grid>
    </Paper>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);