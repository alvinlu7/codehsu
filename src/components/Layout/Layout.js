import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/AddBox';
import ExitIcon from '@material-ui/icons/ExitToApp';
import {auth, db} from '../../backend/Firebase';
import logo from '../../assets/images/logo.png';
import { withRouter } from "react-router-dom";

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class PrimarySearchAppBar extends React.Component {

  state = {
    business: null
  }

  componentDidMount(){
    
    if(auth.currentUser){
        const userID = auth.currentUser.uid;
        db.collection('users').doc(userID).get()
        .then((doc) => {
          if (doc.exists) {
              this.setState({business: doc.data().business});
          } else {
              this.props.history.push('/');
          }
        })
        .catch(function(error) {
          alert("Error getting document:", error);
        });
    }
    else{
      this.props.history.push('/');
    }
  }

    logout = () =>{
        auth.signOut()
        .then(()=>{
            this.props.history.push('/');
        })
        .catch(error => {
            alert(error);
        })
    }
    
    goToProfile = () =>{
      const userID = auth.currentUser.uid;
      this.props.history.push('/'+userID);
    }

    goToAddPost = () => {
      this.props.history.push('/createpost');
    }

    goToHome = () => {
      this.props.history.push('/home');
    }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <img src={logo} height="64px" onClick={this.goToHome}/>
            <Typography className={classes.title} 
            variant="h5" 
            color="inherit" 
            onClick={this.goToHome}
            noWrap>
              CodeHSU
            </Typography>

            {this.props.isHome ? <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
              : null}
            
            <div className={classes.grow} />
                {this.state.business ? <IconButton 
                color="inherit"
                onClick={this.goToAddPost}>
                  <AddIcon />
              </IconButton> :null}
              
              <IconButton
                onClick={this.goToProfile}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <IconButton 
              color="inherit"
              onClick={this.logout}>
                  <ExitIcon />
              </IconButton>
              

          </Toolbar>
        </AppBar>
        {this.props.children}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(PrimarySearchAppBar));