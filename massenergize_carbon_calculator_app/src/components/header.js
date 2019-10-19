import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../style/images/Logo.jpg';
import { AppBar, Typography, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: '#fff'
    },
    button: {
        marginRight: theme.spacing(2),
        '& a:visited & a:link & a': {
            textDecoration: 'none'
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
    },
}))
export default function Header() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ left: open });
    };

    const sideList = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem button className={classes.button}><a href="#"><ListItemText primary={'Home'} /></a></ListItem>
                <ListItem button className={classes.button}><a href="#"><ListItemText primary={'About Us'} /></a></ListItem>
                <ListItem button className={classes.button}><a href="#"><ListItemText primary={'Communities'} /></a></ListItem>
                <ListItem button className={classes.button}><a href="#"><ListItemText primary={'Contact Us'} /></a></ListItem>
            </List>
        </div>
    );


    return (
        <div className={classes.root} >
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" onClick={toggleDrawer(true)} className={classes.menuButton} color="primary" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Drawer open={state.left} onClose={toggleDrawer(false)}>
                        {sideList()}
                    </Drawer>
                    <Typography variant="h6" className={classes.logo}><Link to="/"><img src={Logo} alt="MassEnergize banner" /></Link></Typography>
                    <Link className={classes.link} to="/login" ><Button color="primary" >Sign In</Button></Link>
                </Toolbar>
            </AppBar>
        </div >

    );
}