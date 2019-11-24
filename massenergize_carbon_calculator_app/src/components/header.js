import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import { withFirebase } from 'react-redux-firebase';
import Logo from '../style/images/Logo.jpg';

import { AppBar, Typography, Toolbar, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = (theme => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: '#fff'
    },
    button: {
        backgroundColor: 'inherit',
        marginRight: theme.spacing(2),
        '&:hover': {
            backgroundColor: '#7aab37',
            borderColor: '#6d9931',
            boxShadow: 'none',
            '& a': {
                color: '#fff',
            }
        },

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    logo: {
        flexGrow: 1,
        '& img': {
            maxWidth: 100,
        },
        '& img::hover': {
            opacity: 0.1,
        }
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    link: {
        textDecoration: 'none',
        color: '#8dc63f',
        fontWeight: 'bold'
    },
}))

const MyButton = withStyles({
    root: {
        color: '#fff',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#8dc63f',
        borderColor: '#8dc63f',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            backgroundColor: '#7aab37',
            borderColor: '#6d9931',
            boxShadow: 'none',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(141, 198, 63, .5)',
        },
    },
})(Button);

class Header extends React.Component {
    state = { left: false, isSignedIn: false };
    componentDidMount() {
        if (this.props.firebase) {
            this.props.firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.setState({ isSignedIn: true });
                    this.props.signIn(user);
                } else {
                    this.setState({ isSignedIn: false });
                }
            })
        }
    }

    toggleDrawer = (open) => (e) => {
        if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
            return;
        }
        this.setState({ left: open });
    };

    sideList() {
        const { classes } = this.props;
        return (
            <div
                className={classes.list}
                role="presentation"
                onClick={this.toggleDrawer(false)}
                onKeyDown={this.toggleDrawer(false)}
            >
                <List >
                    <ListItem button className={classes.button}><a className={classes.link} href="#"><ListItemText primary={'Home'} /></a></ListItem>
                    <ListItem button className={classes.button}><a className={classes.link} href="#"><ListItemText primary={'About Us'} /></a></ListItem>
                    <ListItem button className={classes.button}><a className={classes.link} href="#"><ListItemText primary={'Communities'} /></a></ListItem>
                    <ListItem button className={classes.button}><a className={classes.link} href="#"><ListItemText primary={'Contact Us'} /></a></ListItem>
                </List>
            </div>
        );
    }

    onSignOutClick = () => {
        this.props.firebase.auth().signOut().then(() => {
            this.props.signOut();
        })
    };

    render() {
        const { classes, auth } = this.props;
        return (
            <div className={classes.root} >
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" onClick={this.toggleDrawer(true)} className={classes.menuButton} stlye={{ color: '#8dc63f' }} aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Drawer open={this.state.left} onClose={this.toggleDrawer(false)}>
                            {this.sideList()}
                        </Drawer>
                        <Typography variant="h6" className={classes.logo}><Link to="/"><img src={Logo} alt="MassEnergize banner" /></Link></Typography>
                        {!this.state.isSignedIn ? <Link className={classes.link} to="/signin" ><MyButton >Sign In</MyButton></Link> : <MyButton onClick={this.onSignOutClick}>Sign Out</MyButton>}
                    </Toolbar>
                </AppBar>
            </div >

        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { signIn, signOut })(withFirebase(withStyles(useStyles)(Header)));