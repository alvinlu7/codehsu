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
          elevation={3}
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

      <Grid container direction="row">
      <TextField
            id = "regFirstName"
            label = "First Name"
            value = {props.firstName}
            onChange = {props.firstNameChangedHandler}
  
        />

        <TextField
            id = "regLastName"
            label = "Last Name"
            value = {props.lastName}
            onChange = {props.lastNameChangedHandler}
            
        />
        
      </Grid>
      
      <Grid container direction = "row">
      {props.business ?
        <div>
        <TextField
        id = "regLocAddress"
        label = "Address"
        value = {props.locAddress}
        onChange = {props.locAddressChangedHandler}
        fullWidth
        />

        <TextField
        id = "regCity"
        label = "City"
        value = {props.city}
        onChange = {props.cityChangedHandler}
        />

        <TextField
        id = "regState"
        label = "State"
        value = {props.theState}
        />

        <TextField
        id = "regzipCode"
        label = "Postal Code"
        type = "number"
        value = {props.zipCode}
        onChange = {props.zipCodeChangedHandler}
         />  
        
        
        </div>
        
        : null}
      </Grid>
        <br/>
       

        <TextField
        id = "regPhone"
        label = "Phone (###-###-####)"
        type="phone"
        value = {props.phone}
        onChange = {props.phoneChangedHandler}
        fullWidth
        />
        <br/>
        <TextField
        id = "regEmail"
        label = "Email (example@gmail.com)"
        type="email"
        value = {props.email}
        onChange = {props.emailChangedHandler}
        fullWidth
        />
        <br/>
        <TextField
        id = "regPassword"
        label = "Password (min. 8 characters)"
        type="password"
        value = {props.password}
        onChange = {props.passwordChangedHandler}
        minLength = "8"
        fullWidth
        />
        <br/>
        <TextField
            id = "regPasswordMatch"
            label = "Re-enter Password"
            type="password"
            value = {props.passwordMatch}
            onChange = {props.passwordMatchChangedHandler}
            minLength = "8"
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