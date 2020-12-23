import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabPanel from '../components/tabPanel'
import { selectMyHistory, selectMyOpenOrders } from '../../store/selectors'
import BalancesTable from './balancesTable'
import Deposit from './deposit'
import Withdraw from './withdraw'

const useStyles = makeStyles(theme => ({}))

export default ({ ...props }) => {
  const classes = useStyles()
  const [tab, setTab] = useState(0)
  const changeHandler = (event, newTab) => setTab(newTab)
  return (
    <Grid>
      <BalancesTable />
      <AppBar position="static" color="default">
        <Tabs
          value={tab}
          onChange={changeHandler}
          indicatorColor="primary"
          textColor="inherit">
          <Tab label="Deposit" />
          <Tab label="Withdraw" />
        </Tabs>
      </AppBar>
      <TabPanel
        tab={tab}
        index={0}
        style={classes.fullWidth}
        child={<Deposit />}
      />
      <TabPanel
        tab={tab}
        index={1}
        style={classes.fullWidth}
        child={<Withdraw />}
      />
    </Grid>
  )
}
