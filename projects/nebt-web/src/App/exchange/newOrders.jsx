import React, { createElement, useState } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabPanel from '../components/tabPanel'
import { parseValidationRules } from '../helpers'
import { buyOrder, sellOrder } from './fields'
import formMap from './formMap'

const useStyles = makeStyles(theme => ({}))

export default ({ ...props }) => {
  const classes = useStyles()
  const [tab, setTab] = useState(0)
  const changeHandler = (event, newTab) => setTab(newTab)
  return (
    <Grid container>
      <Grid item xs={12}>
        <AppBar position="static" color="default">
          <Tabs
            value={tab}
            onChange={changeHandler}
            indicatorColor="primary"
            textColor="inherit">
            <Tab label="Buy" />
            <Tab label="Sell" />
          </Tabs>
        </AppBar>
        <TabPanel
          tab={tab}
          index={0}
          style={classes.fullWidth}
          child={createElement(formMap[buyOrder.name], {
            key: buyOrder.key,
            name: buyOrder.name,
            validationRules: parseValidationRules(buyOrder.fields),
            fields: buyOrder.fields,
            currency: buyOrder.currency
          })}
        />
        <TabPanel
          tab={tab}
          index={1}
          style={classes.fullWidth}
          child={createElement(formMap[sellOrder.name], {
            key: sellOrder.key,
            name: sellOrder.name,
            validationRules: parseValidationRules(sellOrder.fields),
            fields: sellOrder.fields,
            currency: sellOrder.currency
          })}
        />
      </Grid>
    </Grid>
  )
}
