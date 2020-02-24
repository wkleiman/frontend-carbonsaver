// Functional component imports
import React from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { useFirebase } from 'react-redux-firebase'
// Styling Component imports
import { AppBar, Typography, Toolbar, Button } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { fetchUser } from '../../actions'
import { useAuthState } from '../context/AuthContext'
// Styling classes definition
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#fff',
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
      },
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
    },
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
    fontWeight: 'bold',
  },
}))
// Styled Button
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
})(Button)
// Header Component
function Header() {
  const classes = useStyles()
  const [left, setLeft] = React.useState(false)

  const { authState, setAuthState } = useAuthState()
  const firebase = useFirebase()

  // Used to create animation on opening navigation tab
  const toggleDrawer = open => e => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return
    }
    setLeft(open)
  }

  // Left navigation tab
  // TODO: Add pages as instructed in Google feedback sheets

  // Handling user sign out
  const onSignOutClick = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setAuthState()
      })
  }

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button className={classes.button}>
          <a className={classes.link} href="/">
            <ListItemText primary="Home" />
          </a>
        </ListItem>
        <ListItem button className={classes.button}>
          <a className={classes.link} href="/about">
            <ListItemText primary="About Us" />
          </a>
        </ListItem>
        <ListItem button className={classes.button}>
          <a className={classes.link} href="/">
            <ListItemText primary="Communities" />
          </a>
        </ListItem>
        <ListItem button className={classes.button}>
          <a className={classes.link} href="/">
            <ListItemText primary="Contact Us" />
          </a>
        </ListItem>
      </List>
    </div>
  )
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={toggleDrawer(true)}
            className={classes.menuButton}
            stlye={{ color: '#8dc63f' }}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={left} onClose={toggleDrawer(false)}>
            {sideList()}
          </Drawer>
          <Typography variant="h6" className={classes.logo}>
            <Link to="/about">
              <img
                src={`${process.env.PUBLIC_URL}/images/CoolerCommunities512.jpg`}
                alt="Cooler Communities banner"
              />
            </Link>
          </Typography>
          <p>Carbon Saver - Learn about the impact of actions you can take.</p>

          {// If user is signed in display sign out and sign in otherwise
          // TODO: May don't need to display sign in since prompt user sign in upon accessing a specific event.
          authState && <MyButton onClick={onSignOutClick}>Sign Out</MyButton>}
        </Toolbar>
      </AppBar>
    </div>
  )
}
// Connect actions to component and export it
export default withRouter(Header)
