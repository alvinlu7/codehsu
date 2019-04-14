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
import { ImagePicker } from 'react-file-picker'


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
  console.log(props.errors)
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
            required
            value = {props.firstName}
            onChange = {props.firstNameChangedHandler}
            error = {props.errors.name}
        />

        <TextField
            id = "regLastName"
            label = "Last Name"
            required
            value = {props.lastName}
            onChange = {props.lastNameChangedHandler}
            error = {props.errors.name}
        />
        
      </Grid>
      
      <Grid container direction = "row">
      {props.business ?
        <div>
        <TextField
        id = "regLocAddress"
        label = "Address"
        required
        value = {props.locAddress}
        onChange = {props.locAddressChangedHandler}
        fullWidth
        />

        <TextField
        id = "regCity"
        label = "City"
        value = {props.city}
        required
        onChange = {props.cityChangedHandler}
        error = {props.errors.city}
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
        required
        value = {props.zipCode}
        onChange = {props.zipCodeChangedHandler}
        error = {props.errors.zipCode}
         />  
        
        
        </div>
        
        : null}
      </Grid>
        <br/>
       

        <TextField
        id = "regPhone"
        label = "Phone (###-###-####)"
        type="phone"
        required
        value = {props.phone}
        onChange = {props.phoneChangedHandler}
        fullWidth
        error = {props.errors.phone}
        />
        <br/>
        <TextField
        id = "regEmail"
        label = "Email (example@gmail.com)"
        type="email"
        required
        value = {props.email}
        onChange = {props.emailChangedHandler}
        error = {props.errors.email}
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
        required
        error = {props.errors.password}
        />
        <br/>
        <TextField
            id = "regPasswordMatch"
            label = "Re-enter Password"
            type="password"
            required
            value = {props.passwordMatch}
            onChange = {props.passwordMatchChangedHandler}
            minLength = "8"
            fullWidth
            error = {props.errors.password}
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
        <ImagePicker
          extensions={['jpg', 'jpeg', 'png']}
          dims={{minWidth: 100, maxWidth: 600, minHeight: 100, maxHeight: 600}}
          onChange={base64 => props.handleImage(base64)}
          onError={(error) => alert("Error uploading image")}
        >
          <Button variant="contained" color="secondary">
            Upload Profile Picture
          </Button>
        </ImagePicker>
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