import React, { useState } from 'react'
import PropType from 'prop-types'
import _ from 'lodash'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import ScheduleIcon from '@material-ui/icons/Schedule'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import Paper from '@material-ui/core/Paper'
import { CircularProgress } from '@material-ui/core'
import ActionItems from '../actions/actionItems'

const useStyles = makeStyles(theme => ({
  rootHorizontal: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    width: '100%',
    height: 'auto',
  },
  stationIcon: {
    width: '10vh',
  },
  tabs: {
    backgroundColor: '#8dc63f',
    color: '#fff',
  },
  rootVertical: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexGrow: 1,
    width: '100%',
  },
  station: {
    width: '800px',
  },
  indicator: {
    backgroundColor: 'red',
  },
  title: {
    fontWeight: 'bold',
    color: '#fa4a21',
  },
  eventDetails: {
    textAlign: 'center',
  },
}))

const TabPanel = props => {
  // eslint-disable-next-line react/prop-types
  const { children, value, index, ...other } = props

  return (
    value === index && (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...other}
      >
        <Box>{children}</Box>
      </Typography>
    )
  )
}

function tabProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  }
}

const Stations = props => {
  const [value, setValue] = useState(0)
  const [answered, setAnswered] = useState(new Set())
  const { stations, event } = props
  const theme = useTheme()
  const phone = useMediaQuery(theme.breakpoints.up('sm'))
  const tablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const eventDate = new Date(event.datetime)
  const classes = useStyles()

  if (!stations) return <CircularProgress />

  const onChangeHandler = (e, newValue) => setValue(newValue)

  const onAnswered = question => setAnswered(new Set([...answered, question]))

  const renderStationTabs = () => {
    let idx = 0
    return _.tail(stations).map(station => {
      idx += 1
      return (
        <Tab
          key={`${station.name}tab`}
          icon={
            <img className={classes.stationIcon} src={station.icon} alt="" />
          }
          label={station.displayname}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...tabProps(idx)}
        />
      )
    })
  }

  const renderActionList = (actions, station) =>
    actions.map(action => (
      <ActionItems
        key={`${action.name}${station}`}
        action={action}
        answered={answered}
        onAnswered={onAnswered}
      />
    ))

  const renderStationItemList = () => {
    let idx = 0
    return _.tail(stations).map(station => {
      idx += 1
      return (
        <TabPanel
          className={tablet ? classes.station : null}
          key={station.name}
          value={value}
          index={idx}
        >
          <Paper style={{ padding: '16px 16px' }}>
            <Typography variant="h4">{station.displayname}</Typography>
            <Typography variant="h6">{station.description}</Typography>
            {renderActionList(station.actions, station.name)}
          </Paper>
        </TabPanel>
      )
    })
  }
  return (
    <div className={phone ? classes.rootVertical : classes.rootHorizontal}>
      <Tabs
        style={phone ? { height: '100%' } : null}
        className={classes.tabs}
        orientation={phone ? 'vertical' : 'horizontal'}
        variant="scrollable"
        value={value}
        classes={{ indicator: classes.indicator }}
        scrollButtons="auto"
        onChange={onChangeHandler}
        aria-label="vertical tab"
      >
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Tab key="Welcome_1tab" label="Welcome" {...tabProps(0)} />
        {renderStationTabs()}
      </Tabs>
      <TabPanel
        className={tablet ? classes.station : null}
        key={stations[0].name}
        value={value}
        index={0}
      >
        <Paper style={{ padding: '16px 16px' }}>
          <Grid container direction="column" className={classes.eventDetails}>
            <Grid item>
              <Typography
                variant="h4"
                className={classes.title}
              >{`WELCOME TO ${event.displayname.toUpperCase()}`}</Typography>
            </Grid>
            <Grid
              item
              container
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Grid
                item
                container
                direction="column"
                style={{ width: '300px' }}
                justify="flex-start"
                alignItems="flex-start"
              >
                <Grid
                  item
                  container
                  xs={12}
                  justify="center"
                  alignItems="center"
                >
                  <Grid item>
                    <LocationOnIcon style={{ color: '#8dc63f' }} />
                  </Grid>
                  <Grid item>
                    <Typography>{event.location}</Typography>
                  </Grid>
                  <Grid
                    item
                    container
                    xs={12}
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item>
                      <ScheduleIcon style={{ color: '#8dc63f' }} />
                    </Grid>
                    <Grid item>
                      <Typography>{`${week[eventDate.getDay()]}, ${
                        months[eventDate.getMonth()]
                      } ${eventDate.getDate()}, ${eventDate.getHours() % 12} ${
                        eventDate.getHours() > 12 ? 'PM' : 'AM'
                      }`}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Typography>{stations[0].description}</Typography>
          {renderActionList(stations[0].actions, stations[0].name)}
        </Paper>
      </TabPanel>
      {renderStationItemList()}
    </div>
  )
}

Stations.propTypes = {
  stations: PropType.arrayOf(
    PropType.shape({
      actions: PropType.array,
      name: PropType.string,
      description: PropType.string,
    })
  ),
  event: PropType.shape({
    location: PropType.string,
    displayname: PropType.string,
    datetime: PropType.string,
  }),
}

export default Stations
