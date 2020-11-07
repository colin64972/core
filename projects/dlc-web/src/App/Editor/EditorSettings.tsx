import clsx from 'clsx'
import {
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  ButtonGroup,
  Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles(theme => ({
  subSectionContainer: {
    marginTop: theme.custom.setSpace('sm')
  },
  textWhite: {
    color: theme.palette.grey[50]
  },
  settingsPanel: {
    borderSize: 1,
    padding: theme.custom.setSpace()
  },
  scopeRangePanel: {
    background: `linear-gradient(top, ${theme.palette.grey[100]}, white)`
  },
  underLimitPanel: {
    background: `linear-gradient(top, ${theme.palette.primary[100]}, white)`
  },
  overLimitPanel: {
    background: `linear-gradient(top, ${theme.palette.secondary[100]}, white)`
  },
  topMargin: {
    marginTop: theme.custom.setSpace()
  },
  fieldSetMargin: {
    marginTop: theme.custom.setSpace() * 1.5
  },
  radioGroupLabel: {
    ...theme.typography.bold,
    marginBottom: theme.custom.setSpace() / 2
  },
  fontSize: {
    fontSize: theme.typography.fontSize
  },
  noMargin: {
    margin: 0
  }
}))

export const EditorSettings: React.FC = ({}): JSX.Element => {
  const classes = useStyles()

  return (
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={12} className={classes.textWhite}>
          <Typography variant="h3">Editor Settings</Typography>
          <Typography variant="body1">
            Tempor dolor amet at dolor no tempor ipsum tempor et diam. Justo
            sanctus lorem voluptua vero sit. Erat vero sed et duo elitr diam,
            clita et rebum amet magna. Amet ut takimata vero aliquyam dolores ea
            ea, justo eirmod vero kasd labore justo consetetur, ea accusam elitr
            elitr sit gubergren.
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.subSectionContainer}>
        <Grid
          item
          xs={12}
          sm={4}
          className={clsx(classes.settingsPanel, classes.scopeRangePanel)}>
          <Typography variant="h5">Editor Scope</Typography>
          <TextField
            fullWidth
            label="Range Start"
            id="range-start"
            variant="outlined"
            size="small"
            className={classes.topMargin}
            placeholder="C5"
            InputProps={{
              classes: {
                input: classes.fontSize
              }
            }}
          />
          <TextField
            fullWidth
            label="Range End"
            id="range-end"
            variant="outlined"
            size="small"
            className={classes.topMargin}
            placeholder="S63"
            InputProps={{
              classes: {
                input: classes.fontSize
              }
            }}
          />
          <Typography variant="body1">
            All cells will be checked if unset
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          className={clsx(classes.settingsPanel, classes.underLimitPanel)}>
          <Typography variant="h5">Under Limit</Typography>
          <TextField
            fullWidth
            required
            label="Trigger Character"
            id="ul-trigger-char"
            variant="outlined"
            size="small"
            className={classes.topMargin}
            placeholder="<, -, other"
            defaultValue="<"
            InputProps={{
              classes: {
                input: classes.fontSize
              }
            }}
          />
          <TextField
            fullWidth
            label="Zero Trigger"
            id="ul-zero-trigger"
            variant="outlined"
            size="small"
            className={classes.topMargin}
            placeholder="null, n/a, void, etc."
            InputProps={{
              classes: {
                input: classes.fontSize
              }
            }}
          />
          <FormControl
            component="fieldset"
            className={classes.fieldSetMargin}
            required>
            <FormLabel
              component="legend"
              className={clsx(classes.radioGroupLabel, classes.fontSize)}>
              Function Select
            </FormLabel>
            <RadioGroup aria-label="ul-function-select" name="ul-function">
              <FormControlLabel
                classes={{
                  root: classes.noMargin,
                  label: classes.noMargin
                }}
                value="leave"
                control={<Radio size="small" color="primary" />}
                label="Leave Value"
              />
              <FormControlLabel
                classes={{
                  root: classes.noMargin,
                  label: classes.noMargin
                }}
                value="halve"
                control={<Radio size="small" color="primary" />}
                label="Halve Value"
              />
              <FormControlLabel
                classes={{
                  root: classes.noMargin,
                  label: classes.noMargin
                }}
                value="zero"
                control={<Radio size="small" color="primary" />}
                label="Zero Value"
              />
              <FormControlLabel
                classes={{
                  root: classes.noMargin,
                  label: classes.noMargin
                }}
                disabled
                value="custom-value"
                control={<Radio size="small" color="primary" />}
                label="Custom Function"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          className={clsx(classes.settingsPanel, classes.overLimitPanel)}>
          <Typography variant="h5">Over Limit</Typography>
          <TextField
            fullWidth
            required
            label="Trigger Character"
            id="ol-trigger-char"
            variant="outlined"
            size="small"
            color="secondary"
            className={classes.topMargin}
            placeholder=">, +, other"
            defaultValue=">"
            InputProps={{
              classes: {
                input: classes.fontSize
              }
            }}
          />
          <TextField
            fullWidth
            label="Over Trigger"
            id="ol-over-trigger"
            variant="outlined"
            size="small"
            className={classes.topMargin}
            color="secondary"
            placeholder="over, high, exceeded etc."
            InputProps={{
              classes: {
                input: classes.fontSize
              }
            }}
          />
          <FormControl
            component="fieldset"
            className={classes.fieldSetMargin}
            required>
            <FormLabel
              component="legend"
              color="secondary"
              className={clsx(classes.radioGroupLabel, classes.fontSize)}>
              Function Select
            </FormLabel>
            <RadioGroup aria-label="ol-function-select" name="ol-function">
              <FormControlLabel
                classes={{
                  root: classes.noMargin,
                  label: classes.noMargin
                }}
                value="leave"
                control={<Radio size="small" />}
                label="Leave Value"
              />
              <FormControlLabel
                classes={{
                  root: classes.noMargin,
                  label: classes.noMargin
                }}
                value="halve"
                control={<Radio size="small" />}
                label="Halve Value"
              />
              <FormControlLabel
                classes={{
                  root: classes.noMargin,
                  label: classes.noMargin
                }}
                value="zero"
                control={<Radio size="small" />}
                label="Zero Value"
              />
              <FormControlLabel
                classes={{
                  root: classes.noMargin,
                  label: classes.noMargin
                }}
                disabled
                value="custom-value"
                control={<Radio size="small" />}
                label="Custom Function"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container className={classes.subSectionContainer}>
        <Grid item xs={6}>
          <Grid container direction="column">
            <Typography
              variant="h5"
              align="center"
              className={classes.textWhite}>
              Sheet Selection
            </Typography>
            <ButtonGroup
              className={classes.topMargin}
              orientation="vertical"
              color="primary"
              aria-label="vertical outlined primary button group">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center">
            <Typography
              variant="h5"
              align="center"
              className={classes.textWhite}>
              Next Actions
            </Typography>
            <ButtonGroup
              variant="outlined"
              color="secondary"
              className={classes.topMargin}
              aria-label="contained primary button group">
              <Button>Submit</Button>
              <Button>Reset</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
