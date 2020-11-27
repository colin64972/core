import clsx from 'clsx'
import { Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles(
  theme => ({
    GuideContent_section: {
      'color': theme.palette.bodyColor,
      'padding': theme.custom.setSpace('sm'),
      'marginBottom': theme.custom.setSpace('sm'),
      'boxShadow': theme.custom.boxShadow,
      '&:last-of-type': {
        marginBottom: 0
      }
    },
    GuideContent_sectionTitle: {
      marginBottom: theme.custom.setSpace()
    },
    GuideContent_secondaryColor: {
      color: theme.palette.secondary.main
    },
    GuideContent_accordionDetails: {
      ...theme.custom.setFlex('column', 'flex-start', 'flex-start')
    },
    GuideContent_accordionDetails_firstChild: {
      marginTop: 0
    },
    GuideContent_sectionSubTitle: {
      marginTop: theme.custom.setSpace()
    },
    GuideContent_functionList: {
      margin: `${theme.custom.setSpace('sm')}px 0`,
      paddingLeft: theme.custom.setSpace('sm')
    },
    GuideContent_functionListItem: {
      'marginBottom': theme.custom.setSpace(),
      '&:last-child': {
        marginBottom: 0
      }
    },
    GuideContent_accordion: {
      marginBottom: theme.custom.setSpace('sm')
    },
    GuideContent_contentSectionBg: {
      ...theme.custom.setFlex(),
      background: theme.custom.setLinearGradient(
        180,
        theme.palette.grey[700],
        theme.palette.grey[900]
      )
    },
    GuideContent_italicText: {
      ...theme.typography.italic
    },
    GuideContent_contentContainer: {
      padding: theme.custom.setSpace('sm'),
      ...theme.custom.contentContainer
    },
    GuideContent_lineThrough: {
      textDecoration: 'line-through'
    },
    GuideContent_freeUntil: {
      ...theme.custom.setRotation(15),
      float: 'right',
      textTransform: 'uppercase',
      position: 'relative',
      top: 100,
      right: 100,
      padding: theme.custom.setSpace() / 2,
      backgroundColor: theme.palette.secondary[50],
      border: `2px solid ${theme.palette.secondary.main}`,
      boxShadow: theme.custom.boxShadow,
      [theme.breakpoints.down('xs')]: {
        top: 150,
        right: 25
      }
    }
  }),
  {
    name: 'Guide'
  }
)

export const GuideContent: React.FC = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Grid item xs={12} className={classes.GuideContent_contentSectionBg}>
      <Grid container className={classes.GuideContent_contentContainer}>
        <Paper className={classes.GuideContent_section}>
          <Typography
            variant="h4"
            color="primary"
            className={classes.GuideContent_sectionTitle}>
            Loading a File
          </Typography>
          <Typography
            variant="body1"
            className={classes.GuideContent_accordionDetails_firstChild}>
            There are two methods for loading a file, selecting a file using the
            browser dialog or dragging &amp; dropping.
          </Typography>
          <Typography
            variant="h6"
            className={classes.GuideContent_sectionSubTitle}>
            Selecting a File
          </Typography>
          <Typography variant="body1">
            To select a file using your browser&apos;s dialog menu, click the
            outlined button that reads &quot;Select File&quot;. Accepted files
            will be shown in a browser dialog. Navigate to the file you wish to
            use and click &quot;Open&quot;.
          </Typography>
          <Typography
            variant="h6"
            className={classes.GuideContent_sectionSubTitle}>
            Drag and Drop
          </Typography>
          <Typography variant="body1">
            To drag and drop a file, navigate to the file you wish to use from
            your file browser and then drag the selected file over to the large,
            blue drop zone. When a file is dragged over the drop zone, a light
            shadow will appear. Drop the file by releasing the mouse drag.
          </Typography>
          <Typography
            variant="h6"
            className={classes.GuideContent_sectionSubTitle}>
            Accepted Files
          </Typography>
          <Typography variant="body1">
            Regardless of which method you choose to select a file, once a file
            is selected, its file name will appear next to the &quot;Select
            File&quot; button. If this label reads, &quot;No File
            Selected&quot;, no file has been selected or the file you chose was
            of an unaccepted file type.
          </Typography>
          <Typography variant="body1">
            Currently, only&nbsp;
            <strong>
              Excel 2007&#43; XML Format&nbsp;
              <span className={classes.GuideContent_secondaryColor}>.xlsx</span>
            </strong>
            &nbsp;and&nbsp;
            <strong>
              Excel 97 &ndash; 2004 Workbook Format&nbsp;
              <span className={classes.GuideContent_secondaryColor}>.xls</span>
            </strong>
            &nbsp;file types are supported.
          </Typography>
          <Typography variant="body1">
            When an accepted file has been selected, the &quot;Load&quot; and
            &quot;Reset&quot; buttons will become enabled as noted by a change
            in appearance. Clicking &quot;Reset&quot; will clear any selected
            file, and clicking &quot;Load&quot; will load the selected file into
            the app.
          </Typography>
          <Typography variant="body1">
            To change files once one is already selected, simply repeat the file
            selection process until your desired file&apos;s name is displayed.
          </Typography>
        </Paper>

        <Paper className={classes.GuideContent_section}>
          <Typography
            variant="h4"
            color="primary"
            className={classes.GuideContent_sectionTitle}>
            Selecting a Worksheet
          </Typography>
          <Typography
            variant="body1"
            className={classes.GuideContent_accordionDetails_firstChild}>
            Once a file has been loaded into the app, it&apos;s time to select a
            worksheet. If your file has more than one sheet, these sheets will
            be listed in the dropdown labelled &quot;Sheet Selection&quot;.
            Choose the sheet you wish to edit using this dropdown. If your file
            only has one sheet, you still need to select it before continuing.
          </Typography>
          <Typography variant="body1">
            When a file is loaded, the &quot;Unload File&quot; button appears
            which allows you to unload the current file, all of its sheets and
            any transformations you have previously made. If you have not
            exported your sheet and click this button, you will lose any
            processed sheets you have made and will have to start over. We do
            not keep copies of processed sheets or any client data.
          </Typography>
          <Typography variant="body1">
            Likewise, changing the sheet after any sheet transformations have
            been made will clear out any current settings and results. Make sure
            to export any processed sheets to save them. Again, we do not keep
            copies of processed sheets, or any client data.
          </Typography>
        </Paper>

        <Paper className={classes.GuideContent_section}>
          <Typography
            variant="h4"
            color="primary"
            className={classes.GuideContent_sectionTitle}>
            Converter Settings
          </Typography>
          <Typography
            variant="body1"
            className={classes.GuideContent_accordionDetails_firstChild}>
            When a sheet is selected from the &quot;Sheet Selection&quot;
            dropdown, its data is read and the converter settings panels will be
            displayed. Here you can select how you wish to process and transform
            your sheet data. There are three categories of options to set
            parameters.
          </Typography>
          <Typography
            variant="h6"
            className={classes.GuideContent_sectionSubTitle}>
            Scope Range
          </Typography>
          <Typography variant="body1">
            These settings are optional but allow you to specify a range of
            cells that you want the app to check and process. Setting this range
            will ensure that only cells within this scope range are allowed to
            be processed. You may choose to use a scope range if there are some
            cells in the sheet that may not need to be processed, for example,
            detection limit specifications that sit in a certain area of the
            sheet.
          </Typography>
          <Typography variant="body1">
            To enter a scope range, you must set the starting and ending cell
            addresses for a continuous cell range. You can input start and end
            addresses as standard cell addresses but in lowercase such as
            &quot;a3&quot; or &quot;d13&quot;. Note that column addresses are
            limited up to column &quot;zz&quot; while there is no limit for row
            numbers. If you enter an invalid cell range, you can still process
            the sheet, but no transformations will be found or made.
          </Typography>
          <Typography
            variant="body1"
            className={classes.GuideContent_italicText}>
            If left unset, the app will check and process all cells within the
            sheet.
          </Typography>
          <Typography
            variant="h6"
            className={classes.GuideContent_sectionSubTitle}>
            Under Limit Settings
          </Typography>
          <Typography variant="body1">
            The Under Limit settings are used to define which cells will be
            treated as an Under Limit case and how to transform such cells.
            Required settings are the &quot;Trigger Character&quot; and
            &quot;Transform Function&quot; settings.
          </Typography>
          <Typography variant="body1">
            The &quot;Trigger Character&quot; setting allows you to input a
            character or line of text that matches the detection limit notation
            in your data sheet. Most labs will use a &quot;&lt;&quot; character
            to denote that a value is less than a minimum detection limit, while
            others are known to use a &quot;&minus;&quot; character. In addition
            to these characters, this setting allows you to enter a custom
            string of text in case your lab results use differing notation.
          </Typography>
          <Typography variant="body1">
            To input your trigger character or text string, enter your
            case&ndash;sensitive text into the setting input. To allow
            flexibility, this setting accepts all standard punctuation and
            letter characters without spaces.
          </Typography>
          <Typography variant="body1">
            The &quot;Transform Function&quot; setting is where you set how you
            want to transform any instances of Under Limit values that the app
            finds. There are four options to choose from&#58;
          </Typography>
          <ol className={classes.GuideContent_functionList}>
            <li className={classes.GuideContent_functionListItem}>
              <strong>Leave&#58;</strong> leaves behind the detection limit
              value by removing the trigger character&#40;s&#41;.
            </li>
            <li className={classes.GuideContent_functionListItem}>
              <strong>Halve&#58;</strong> divides the detection limit value by 2
              while keeping significant figures intact.
            </li>
            <li className={classes.GuideContent_functionListItem}>
              <strong>Zero&#58;</strong> changes any detection limit value into
              a 0&ndash;number value.
            </li>
            <li className={classes.GuideContent_functionListItem}>
              <strong>No transform&#58;</strong> does nothing to a detection
              limit value once found.
            </li>
          </ol>
          <Typography variant="body1">
            Lastly, in the special case where your lab has included entries like
            &quot;null&quot;, &quot;void&quot;, &quot;zero&quot;,
            &quot;N/A&quot;, or other text values to represent a zero value, the
            &quot;Zero Trigger&quot; setting is included as a method to convert
            these values. This setting will accept any alpha text value and is
            case&ndash;sensitive. Cell values that match this trigger will be
            transformed to a 0&ndash;number value. This is an optional setting
            and will respect any specified Scope Range settings applied.
          </Typography>
          <Typography
            variant="h6"
            className={classes.GuideContent_sectionSubTitle}>
            Over Limit Settings
          </Typography>
          <Typography variant="body1">
            Sometimes sample values will be over the maximum detection limit of
            the instrumentation threshold and results will be returned with a
            text value signifying Over Limit.
          </Typography>
          <Typography variant="body1">
            For the Over Limit settings, the &quot;Trigger Character&quot;
            provides the same functionality as the Under Limit setting but will
            be used to search out Over Limit values. Again, this setting accepts
            standard punctuation and letters in a case&ndash;sensitive fashion.
            Spaces and numbers are not allowed. This is a required setting.
          </Typography>
          <Typography variant="body1">
            The Over Limit &quot;Tranform Function&quot; provides the same
            options as the Under Limit settings, so you can process Over Limits
            however you like; although the &quot;Leave&quot; function is
            probably most appropriate. This is a required setting.
          </Typography>
          <Typography
            variant="h6"
            className={classes.GuideContent_sectionSubTitle}>
            Converter Settings Actions
          </Typography>
          <Typography variant="body1">
            Upon entering your desired settings, the panels will validate and
            show any errors in your input settings. Once settings are valid, the
            &quot;Process&quot; button will enable and you can click it to
            process your sheet!
          </Typography>
          <Typography variant="body1">
            On the other hand, the &quot;Reset&quot; button will enable after
            you have started to input&nbsp;
            <span className={classes.GuideContent_italicText}>any</span>{' '}
            settings. If you make a mistake, you can click it to reset the form
            to its initial settings.&nbsp;
            <span className={classes.GuideContent_italicText}>
              But be careful!
            </span>
            &nbsp;If you have transform results from a previous process
            displayed below, clicking the reset button will also clear out those
            previous results, as only one set of results per sheet process can
            be displayed.
          </Typography>
          <Typography variant="body1">
            If you have not exported your current result as a sheet, you will
            lose that result upon resetting the settings. Transformed sheets
            will be lost unless you exported the sheet for download. As we do
            not keep any client sheets or data, we cannot retrieve any previous
            processed sheets.
          </Typography>
        </Paper>

        <Paper className={classes.GuideContent_section}>
          <Typography
            variant="h4"
            color="primary"
            className={classes.GuideContent_sectionTitle}>
            Transform Results
          </Typography>
          <Typography
            variant="body1"
            className={classes.GuideContent_accordionDetails_firstChild}>
            After processing your sheet, the &quot;Transform Results&quot;
            section will open below the Converter Settings. In this section, any
            Under Limit, Over Limit or &quot;Zero Trigger&quot; case results
            that were found will be displayed. If no instances of a particular
            case were found&mdash;which means no transformations were
            made&mdash;a summary panel for that case will not be included.
          </Typography>
          <Typography
            variant="h6"
            className={classes.GuideContent_sectionSubTitle}>
            Case Summaries
          </Typography>
          <Typography variant="body1">
            For each case where instances were found and transformations were
            made, the summary panel allows you to see how many of such instances
            were transformed, how many unique transformations there were, the
            list of each unique transformation, and the original value that was
            transformed. To view each instance by cell address, you can click
            the &quot;Inspect&quot; button. This will open a side bar containing
            a scrollable list of each cell that was transformed, along with the
            original and transformed values.
          </Typography>
          <Typography
            variant="h6"
            className={classes.GuideContent_sectionSubTitle}>
            Viewing a Preview
          </Typography>
          <Typography variant="body1">
            To preview of your transformed sheet, click the blue
            &quot;Preview&quot; button. A preview of your whole sheet will be
            generated, and you can scroll around to view each transformation as
            part of the whole sheet. Note that if a Scope Range was set, the
            preview does not reflect this Scope Range and the entire sheet is
            rendered.
          </Typography>
          <Typography variant="body1">
            If your sheet was particularly large, please be patient while the
            app renders your preview. Previews may contain 1000s of images which
            take time to render!
          </Typography>
          <Typography variant="body1">
            Transformation cases are highlighted by different colors: blue for
            Under Limit, pink for Over Limit, and grey for &quot;Zero
            Trigger&quot; cases. Sheet previews can be used to inspect the
            transformed data before purchasing an export for download. Sheet
            previews provide both the transformed and original data of the
            sheet.
          </Typography>
          <Typography variant="body1">
            By default, new transformed values are displayed, however, you can
            view the original values by hovering over a transformed cell. Upon
            mouse hover, the original value will be shown with a green
            background, and the cell address is called out in case the sheet
            header rows and columns are out of view. This way, you can easily
            inspect if the sheet was processed correctly and your data is ready
            for export.
          </Typography>
        </Paper>

        <Paper className={classes.GuideContent_section}>
          <Typography
            variant="h4"
            color="primary"
            className={classes.GuideContent_sectionTitle}>
            Exporting a Processed Sheet
          </Typography>
          <Typography
            variant="body1"
            className={classes.GuideContent_accordionDetails_firstChild}>
            Once your sheet has been transformed to your liking, and you&apos;d
            like to save a copy to work with, you can export the sheet. To start
            the export process, simply click on the file type that you&apos;d
            like to receive.{' '}
            <span
              className={clsx({
                [classes.GuideContent_lineThrough]: process.env.PAYMENT_DISABLED
              })}>
              From here, the &quot;Secure Payment&quot; form will open, and you
              can complete the purchase process.
            </span>
            &nbsp; If for some reason your file export cannot be generated, you
            will be notified after clicking the export button and the payment
            form will not open.
          </Typography>
          <Typography
            variant="h6"
            className={classes.GuideContent_sectionSubTitle}>
            Export Filetypes
          </Typography>
          <Typography variant="body1">
            Currently, you can export the sheet as a new Microsoft Excel
            workbook file in either&nbsp;
            <strong>
              Excel 2007&#43; XML Format&nbsp;
              <span className={classes.GuideContent_secondaryColor}>.xlsx</span>
            </strong>
            &nbsp;and&nbsp;
            <strong>
              Excel 97 &ndash; 2004 Workbook Format&nbsp;
              <span className={classes.GuideContent_secondaryColor}>.xls</span>
            </strong>
            &nbsp;format. Exported files of&nbsp;
            <strong>
              <span className={classes.GuideContent_secondaryColor}>.xlsx</span>
            </strong>
            &nbsp;type include comments containing the original cell data for
            easy comparison. If you open up your sheet and see a swath of open
            comments, you can quickly hide them by toggling the &quot;Show All
            Comments&quot; button in the Excel &quot;Ribbon&quot; under the
            &quot;Review&quot; tab.
          </Typography>
          {process.env.PAYMENT_DISABLED && (
            <Typography
              variant="h2"
              color="secondary"
              align="center"
              className={classes.GuideContent_freeUntil}>
              Free until 2021
            </Typography>
          )}
          <Typography
            variant="h6"
            className={clsx(classes.GuideContent_sectionSubTitle, {
              [classes.GuideContent_lineThrough]: process.env.PAYMENT_DISABLED
            })}>
            Payment
          </Typography>
          <Typography
            variant="body1"
            className={clsx({
              [classes.GuideContent_lineThrough]: process.env.PAYMENT_DISABLED
            })}>
            Payment for your sheet is secured and processed by Stripe. Stripe is
            an industry&ndash;leading payment processing platform who handles
            your credit card details and payment info on our behalf. Your card
            details and payment info are secure with them and never touch our
            servers or system. Simply enter your card details, an email address
            if you&apos;d like to receive a receipt, accept our Terms &amp;
            Conditions, and you&apos;re good to go.
          </Typography>
          <Typography
            variant="body1"
            className={clsx({
              [classes.GuideContent_lineThrough]: process.env.PAYMENT_DISABLED
            })}>
            Please note that if you choose <strong>not</strong> to provide an
            email address, we cannot provide any after&ndash;sale customer
            support as we have no way of tracking down your order or purchase
            without an email. In addition, even if you provide an email address,
            we cannot retrieve or resend any lost files since we do not save any
            of our clients&apos; processed sheets or data. If you have purchased
            and downloaded a file export, please save it carefully, for if you
            need a new copy, we cannot provide a backup.
          </Typography>
          <Typography
            variant="h6"
            className={classes.GuideContent_sectionSubTitle}>
            File Downloads
          </Typography>
          <Typography variant="body1">
            During the test period where file exports are free of charge, you
            can export as many files as you like! However, we cannot retrieve or
            resend any lost files since we do not save any of our clients&apos;
            processed sheets or data. If you have downloaded a file export,
            please save it carefully, for if you need a new copy, we cannot
            provide a backup.
          </Typography>
          <Typography variant="body1">
            <span
              className={clsx({
                [classes.GuideContent_lineThrough]: process.env.PAYMENT_DISABLED
              })}>
              After your payment has been confirmed,
            </span>
            &nbsp; your file export will be downloaded by your browser and saved
            in your &quot;Downloads&quot; location. The file name for your file
            export is the original file name in addition to an
            &quot;&ndash;edited&quot; suffix added by the app so you can keep
            your original and transformed files separate. Likewise, the file
            export will include a single sheet suffixed with the same
            &quot;&ndash;edited&quot; tag to denote it has been edited by this
            app. In a second sheet, you will find our support email address
            where you can email any feedback or feature requests.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}
