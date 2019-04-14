import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
  card: {
    minWidth: 275,
    maxWidth: 500,
    margin: '5%',
    padding: '2%'
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
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
    button: {
      position: "absolute",
      bottom: 0
    }
});

function SimpleCard(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h4" align="center">
        Already a member?
        </Typography>
        <TextField
          id="email"
          label="Email"
          value={props.email}
          onChange={props.emailChange}
          margin="normal"
          fullWidth
        />
        <TextField
          id="pass"
          label="Password"
          value={props.password}
          onChange={props.passwordChange}
          margin="normal"
          type="password"
          onKeyPress = {props.loginEnter}
          fullWidth
        />
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          onClick={props.login}
          fullWidth
          id="login-button">
            Login
          </Button>
      </CardContent>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);