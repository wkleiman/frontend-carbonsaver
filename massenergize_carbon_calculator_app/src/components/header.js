import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../style/images/Logo.jpg';
import { AppBar, Typography, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: '#fff'
    },
    button: {
        marginRight: theme.spacing(2),
        '& a:visited': {
            textDecorationLine: 'none'
        },
        '& a:link': {
            textDecorationLine: 'none'
        }

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
}))
export default function Header() {
    const classes = useStyles();
    return (
        <div className={classes.root} >
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.logo}><Link to="/"><img src={Logo} alt="MassEnergize banner" /></Link></Typography>
                    <Button className={classes.button}><a href="#">Home</a></Button>
                    <Button className={classes.button}><a href="#">About Us</a></Button>
                    <Button className={classes.button}><a href="#">Communities</a></Button>
                    <Button className={classes.button}><a href="#">Contact Us</a></Button>
                </Toolbar>
            </AppBar>
        </div >

    );
}