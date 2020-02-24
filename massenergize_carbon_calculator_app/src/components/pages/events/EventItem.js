// React and Redux Component
import React from 'react'

// Styling Components
import { makeStyles } from '@material-ui/core/styles'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
  Paper,
} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Station from './stations'
import Score from '../../score'
import { fetchEvent } from '../../../actions/AxiosRequests'
import { useSelectedState } from '../../context/SelectedContext'

// Styling information
const useStyles = makeStyles({
  logoImg: {
    maxWidth: '100%',
  },
  root: {
    marginTop: '2vh',
    marginRight: '1vh',
    marginLeft: '1vh',
    padding: '1vh 1vh',
    '& a': {
      textDecoration: 'none',
      color: '#000000',
    },
  },
  eventDetails: {
    textAlign: 'center',
  },
  host_sponsor: {
    padding: '2vh 2vh',
  },
  title: {
    fontWeight: 'bold',
    color: '#fa4a21',
  },
})

const EventItem = props => {
  const classes = useStyles()
  const { selected, setSelected } = useSelectedState()

  React.useEffect(() => {
    const getEvent = async () => {
      const { eventInfo } = await fetchEvent(selected.name)
      setSelected({ ...selected, ...eventInfo })
    }
    getEvent()
  }, [])
  // Reformat phone number to +1(XXX) XXX XXXX for display
  const reformattedPhone = phone => {
    const cleaned = `${phone}`.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return `+1${match[1]}${match[2]}${match[3]}`
    }
    return null
  }

  const renderHost = () => {
    if (!selected.host_url) return <CircularProgress />
    return (
      // Host rendering
      <Grid item>
        <Grid item container>
          <Typography
            className={classes.title}
            style={{ color: '#8dc63f' }}
            variant="h5"
          >
            About the Host
          </Typography>
        </Grid>
        <Grid item container direction="column">
          <Grid item container direction="row">
            <Card>
              <CardActionArea>
                <CardMedia title={selected.host_org}>
                  <a href={selected.host_url}>
                    <img
                      className={classes.logoImg}
                      src={selected.host_logo}
                      alt={selected.host_org}
                    />
                  </a>
                </CardMedia>
              </CardActionArea>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {selected.host_contact}
                </Typography>
                <IconButton className={classes.actionButton}>
                  <a href={`mailto:${selected.host_email}`}>
                    <EmailIcon />
                  </a>
                </IconButton>
                <IconButton className={classes.actionButton}>
                  <a href={`tel:${reformattedPhone(selected.host_phone)}`}>
                    <PhoneIcon />
                  </a>
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  const renderSponsor = () => {
    if (!selected.sponsor_url) return <CircularProgress />
    return (
      // Render Sponsor Info
      <Grid item>
        <Grid item container>
          <Typography
            className={classes.title}
            style={{ color: '#8dc63f' }}
            variant="h5"
          >
            Sponsors
          </Typography>
        </Grid>
        <Grid item container direction="column">
          <Grid item container direction="row">
            <Card>
              <CardActionArea>
                <a href={selected.sponsor_url}>
                  <CardMedia title={selected.sponsor_org}>
                    <img
                      className={classes.logoImg}
                      src={selected.sponsor_logo}
                      alt={selected.sponsor_org}
                    />
                  </CardMedia>
                </a>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  // Check if the information from backend has been received
  if (!selected) {
    return (
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12}>
          <CircularProgress />
        </Grid>
      </Grid>
    )
  }
  // Upon information received, render the stations with information of host and sponsor
  return (
    <Paper className={classes.root}>
      <Grid container spacing={2}>
        <Grid item container xs={12} spacing={2}>
          <Grid item container xs={12} xl={8} direction="column">
            <Grid container item>
              <Station event={selected} stations={selected.stations} />
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            xl={4}
            direction="column"
            spacing={2}
            className={classes.host_sponsor}
          >
            {renderHost()}
            {renderSponsor()}
          </Grid>
          <Grid item xs={12}>
            <Score />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default EventItem
