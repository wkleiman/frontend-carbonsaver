// Functional component imports
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useFirebase } from 'react-redux-firebase'
// Styling Component imports
import {
  AppBar,
  Typography,
  Toolbar,
  Button,
  CircularProgress,
} from '@material-ui/core'
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
      maxWidth: 120,
    },
    '& img::hover': {
      opacity: 0.1,
    },
    margin: '1vh',
    
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
    width: '100%',
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
  const [loading, setLoading] = React.useState(true)

  const { authState, setAuthState } = useAuthState()
  const firebase = useFirebase()
  const auth = firebase.auth()

  // Used to create animation on opening navigation tab
  const toggleDrawer = open => e => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return
    }
    setLeft(open)
  }
  const getUser = async user => {
    const apiUser = await fetchUser(user)
    setAuthState(apiUser)
    setLoading(false)
  }

  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (!user) {
        setAuthState(auth.currentUser)
        setLoading(false)
      } else {
        getUser(auth.currentUser)
      }
    })
  }, [loading])

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
          <Link to="/" className={classes.link}>
            <ListItemText primary="Home" />
          </Link>
        </ListItem>
        <ListItem button className={classes.button}>
          <Link to="/summary" className={classes.link}>
            <ListItemText primary="Summary" />
          </Link>
        </ListItem>
        <ListItem button className={classes.button}>
          <Link to="/scoreboard" className={classes.link}>
            <ListItemText primary="Scoreboard" />
          </Link>
        </ListItem>
        <ListItem button className={classes.button}>
          <Link to="/about" className={classes.link}>
            <ListItemText primary="About" />
          </Link>
        </ListItem>
      </List>
    </div>
  )
  if (loading) return <CircularProgress />
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar} styles={{width:"100px"}}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={toggleDrawer(true)}
            className={classes.menuButton}
            stlye={{ color: '#8dc63f'}}
            aria-label="menu"
          >
            <MenuIcon style={{width: "5vw", height: "5vh", margin: "0"}}/>
          </IconButton>
          <Drawer open={left} onClose={toggleDrawer(false)}>
            {sideList()}
          </Drawer>
          <Typography variant="h6" className={classes.logo}>
            <Link to="/about">
              <img style={{width: "80px"}}
                src={`${process.env.PUBLIC_URL}/favicon.ico`}
                alt="Cooler Communities banner"
              />
            </Link>
          </Typography>
          <p>Carbon Saver - Learn about the impact of actions you can take.</p>
          {authState && <MyButton onClick={onSignOutClick}>Sign Out</MyButton>}
        </Toolbar>
      </AppBar>
    </div>
  )
}
// Connect actions to component and export it
export default withRouter(Header)
