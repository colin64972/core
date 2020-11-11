import {
  Grid,
  Button,
  LinearProgress,
  Typography,
  Chip,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
  TableCell
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  isProcessingSelector,
  transformResultSelector
} from '../../store/selectors'
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow'
import { collectChanges } from '@cjo3/shared/logic/dlc'
import { transformResult as transformResultMock } from '@cjo3/shared/react/mocks/dlc'
import { TransformSummary as ITransformSummary } from '@cjo3/dlc-web/src/store/editor/interfaces'

const useStyles = makeStyles(theme => ({
  TransformSummary_panel: {
    'padding': theme.custom.setSpace('sm'),
    'marginTop': theme.custom.setSpace('sm'),
    ...theme.custom.borderRadius,
    'background': theme.custom.setLinearGradient(
      180,
      theme.palette.grey[100],
      theme.palette.grey[50]
    ),
    '&:first-of-type': {
      marginTop: 0
    }
  },
  TransformSummary_panel_left: {
    ...theme.custom.borderRadius,
    backgroundColor: theme.palette.primary[100],
    padding: theme.custom.setSpace('sm'),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.custom.setSpace('sm')
    }
  },
  doubleArrow: {
    fontSize: theme.typography.fontSize * 10,
    color: theme.palette.primary[50],
    opacity: 0.25
  },
  noPadding: {
    padding: 0
  },
  marginTop: {
    marginTop: theme.custom.setSpace('sm')
  },
  heading: {
    position: 'relative',
    zIndex: 5
  },
  chip: {
    ...theme.typography.bold,
    fontSize: theme.typography.fontSize * 1.5,
    padding: theme.custom.setSpace(),
    color: 'white',
    marginTop: theme.custom.setSpace()
  }
}))

interface Props {
  title: string
  caseData: ITransformSummary
  buttonName: string
  openDrawerHandler: (event: React.MouseEvent) => void
}
export const TransformSummary: React.FC<Props> = ({
  buttonName,
  title,
  caseData,
  openDrawerHandler
}): JSX.Element => {
  const classes = useStyles()
  return (
    <Grid
      container
      justify="flex-start"
      alignItems="center"
      className={classes.TransformSummary_panel}>
      <Grid item xs={12} sm={6}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Typography variant="h5">{title}</Typography>
          <Typography
            variant="body1"
            align="center"
            className={classes.marginTop}>
            Instances Transformed&emsp;
          </Typography>
          <Chip
            label={caseData.count}
            color="primary"
            className={classes.chip}
          />
          <Typography variant="body1" align="center">
            Unique Instance Count&emsp;
          </Typography>
          <Chip
            label={caseData.originalValues.length}
            color="secondary"
            className={classes.chip}
          />
          <ButtonGroup className={classes.marginTop}>
            <Button
              name={buttonName}
              type="button"
              variant="outlined"
              color="primary"
              onClick={openDrawerHandler}>
              View Cell Addresses
            </Button>
            <Button type="button">Inspect Sheet</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.TransformSummary_panel_left}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={5}>
            <Typography variant="h6" align="center" className={classes.heading}>
              Original
            </Typography>
            <List dense>
              {caseData.originalValues.map(value => (
                <ListItem key={`list-item-${value}`} alignItems="center" dense>
                  <ListItemText
                    primary={value}
                    primaryTypographyProps={{
                      align: 'center'
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={2}>
            <Grid container justify="center" alignItems="center">
              <DoubleArrowIcon className={classes.doubleArrow} />
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h6" align="center" className={classes.heading}>
              Transform
            </Typography>
            <List dense>
              {caseData.changedValues.map(value => (
                <ListItem
                  key={`list-item-${value}`}
                  alignItems="center"
                  dense
                  disableGutters>
                  <ListItemText
                    primary={value}
                    primaryTypographyProps={{
                      align: 'center'
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
