import { Header } from '../Header'
import { Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { GuideBg } from '../../assets'

const useStyles = makeStyles(
  theme => ({
    Guide_section: {
      'color': theme.palette.bodyColor,
      'padding': theme.custom.setSpace('sm'),
      'marginBottom': theme.custom.setSpace('sm'),
      'boxShadow': theme.custom.boxShadow,
      '&:last-of-type': {
        marginBottom: 0
      }
    },
    Guide_sectionTitle: {
      marginBottom: theme.custom.setSpace()
    },
    Guide_accordionDetails: {
      ...theme.custom.setFlex('column', 'flex-start', 'flex-start')
    },
    Guide_accordionDetails_firstChild: {
      marginTop: 0
    },
    Guide_sectionSubTitle: {
      marginTop: theme.custom.setSpace()
    },
    Guide_functionList: {
      margin: `${theme.custom.setSpace('sm')}px 0`,
      paddingLeft: theme.custom.setSpace('sm')
    },
    Guide_functionListItem: {
      'marginBottom': theme.custom.setSpace(),
      '&:last-child': {
        marginBottom: 0
      }
    },
    Guide_accordion: {
      marginBottom: theme.custom.setSpace('sm')
    },
    Guide_contentSectionBg: {
      ...theme.custom.setFlex(),
      background: theme.custom.setLinearGradient(
        180,
        theme.palette.grey[700],
        theme.palette.grey[900]
      )
    },
    Guide_contentContainer: {
      padding: theme.custom.setSpace('sm'),
      ...theme.custom.contentContainer
    }
  }),
  {
    name: 'Guide'
  }
)

export const Guide: React.FC = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Grid container justify="center">
      <Header
        title="Converter Guide"
        subTitle="How to Use this App"
        bgColor="theme.palette.primary.main"
        bgUrls={GuideBg.paths}
        buttonHref="/converter"
        buttonLabel="Start"
      />
      <Grid item xs={12} className={classes.Guide_contentSectionBg}>
        <Grid container className={classes.Guide_contentContainer}>
          <Paper className={classes.Guide_section}>
            <Typography
              variant="h4"
              color="primary"
              className={classes.Guide_sectionTitle}>
              Loading a File
            </Typography>
            <Typography
              variant="body1"
              className={classes.Guide_accordionDetails_firstChild}>
              There are two methods for loading a file, selecting a file using
              the browser dialog, or dragging &amp; dropping.
            </Typography>
            <Typography variant="h6" className={classes.Guide_sectionSubTitle}>
              Selecting a File
            </Typography>
            <Typography variant="body1">
              To select a file using your browser&apos;s dialog menu, click the
              outlined button that reads &quot;Select File&quot;. Accepted files
              will be shown in a browser dialog. Navigate to the file you wish
              to use, and click &quot;Open&quot; or similar.
            </Typography>
            <Typography variant="h6" className={classes.Guide_sectionSubTitle}>
              Drag and Drop
            </Typography>
            <Typography variant="body1">
              To drag and drop a file, navigate to the file you wish to use from
              your file browser, and then drag the selected file over to the
              large, blue drop zone. When a file is dragged over the drop zone,
              it will darken in color and a light shadow will appear. Drop the
              file by releasing the mouse drag.
            </Typography>
            <Typography variant="h6" className={classes.Guide_sectionSubTitle}>
              Accepted Files
            </Typography>
            <Typography variant="body1">
              Regardless of which method you choose to select a file, once a
              file is selected, its file name will appear next to the
              &quot;Select File&quot; button. If this label reads, &quot;No File
              Selected&quot;, no file has been selected, or the file you chose
              was of an unaccepted file type.
            </Typography>
            <Typography variant="body1">
              Currently, only Microsoft Excel files are accepted. Specifically,
              files of the <strong>Excel 2007&#43; XML Format .xlsx</strong> and
              the older&nbsp;
              <strong>Excel 97 &ndash; 2004 Workbook Format .xls</strong> file
              types are supported.
            </Typography>
            <Typography variant="body1">
              When an accepted file has been selected, the &quot;Load&quot; and
              &quot;Reset&quot; buttons will become enabled as noted by a change
              in appearance. Clicking &quot;Reset&quot; will clear any selected
              file, and clicking &quot;Load&quot; will load the selected file
              into the app.
            </Typography>
            <Typography variant="body1">
              To change files once one is already selected, simply repeat file
              selection process until your desired file&apos;s name is
              displayed.
            </Typography>
          </Paper>

          <Paper className={classes.Guide_section}>
            <Typography
              variant="h4"
              color="primary"
              className={classes.Guide_sectionTitle}>
              Selecting a Worksheet
            </Typography>
            <Typography
              variant="body1"
              className={classes.Guide_accordionDetails_firstChild}>
              Once a file has been loaded into the app, it&apos;s time to select
              a worksheet. If your file has more than one sheet, these sheets
              will be listed in the drop down labelled &quot;Sheet
              Selection&quot;. Choose the sheet you wish to edit using this drop
              down. If your file only has one sheet, you still need to select it
              here before continuing.
            </Typography>
            <Typography variant="body1">
              Also, when a file is loaded, the &quot;Unload File&quot; button
              appears which allows you to unload the current file, all of its
              sheets, and any edits you have previously made. If you have not
              exported your sheet and click this button, you will lose any
              processed sheets you have made and have to start over. We do not
              keep copies of processed sheets, or any client data at all.
            </Typography>
            <Typography variant="body1">
              Likewise, changing the sheet after any sheet processes have been
              made, will clear out any current settings and results. Since
              changing sheets will clear any current settings and processed
              sheets, make sure to export any processed sheets to save them.
              Again, we do not keep copies of processed sheets, or any client
              data at all.
            </Typography>
          </Paper>

          <Paper className={classes.Guide_section}>
            <Typography
              variant="h4"
              color="primary"
              className={classes.Guide_sectionTitle}>
              Converter Settings
            </Typography>
            <Typography
              variant="body1"
              className={classes.Guide_accordionDetails_firstChild}>
              When a sheet is selected from the &quot;Sheet Selection&quot; drop
              down, its data is read and the converter settings panels will be
              displayed. Here you can select how you wish to process and
              transform your sheet data. There are three categories of options
              to set parameters for.
            </Typography>
            <Typography variant="h6" className={classes.Guide_sectionSubTitle}>
              Scope Range
            </Typography>
            <Typography variant="body1">
              These settings are optional, but allow you to specify a range of
              cells that you want the app to check and process. Setting this
              range will ensure that only cells within this scope range are
              allowed to be processed. You may choose to use a scope range if
              there are some cells in the sheet that may not need to be
              processed, for example, detection limit specifications that sit in
              a certain area of the sheet.
            </Typography>
            <Typography variant="body1">
              To enter a scope range, you must set the starting and ending cell
              addresses for a continuous cell range. You can input start and end
              addresses as standard cell addresses but in lowercase such as
              &quot;a3&quot; or &quot;d13&quot;. Note that column addresses are
              limited up to column &quot;zz&quot; while there is no limit for
              row number. If you enter an invalid cell range, you can still
              process the sheet, but no transformations will be found or made.
            </Typography>
            <Typography variant="body1">
              If left unset, the app will check and process all cells within the
              sheet.
            </Typography>
            <Typography variant="h6" className={classes.Guide_sectionSubTitle}>
              Under Limit Settings
            </Typography>
            <Typography variant="body1">
              Under limit settings are used to define which cells will be
              treated as an under limit case and how to transform such cells.
              Required settings are the &quot;Trigger Character&quot; and
              &quot;Transform Function&quot; settings.
            </Typography>
            <Typography variant="body1">
              The &quot;Trigger Character&quot; setting allows you to input a
              character or line of text that matches the detection limit
              notation in your data cells. Most labs will use a &quot;&lt;&quot;
              character to denote that a value is less than a minimum detection
              limit, while others are known to use a &quot;&minus;&quot;
              character. In addtion to these characters, this setting allows you
              to enter a custom string of text in case your lab results use
              differing notation.
            </Typography>
            <Typography variant="body1">
              To input your trigger character or text string, simply enter it
              into the setting input. This setting allows all standard
              punctuation and alpha characters without spaces.
            </Typography>
            <Typography variant="body1">
              The &quot;Transform Function&quot; setting is where you set how
              you want to transform any instances of under limit values that the
              app finds. There are four options to choose from&#58;
              <ol className={classes.Guide_functionList}>
                <li className={classes.Guide_functionListItem}>
                  <strong>Leave&#58;</strong> leaves behind the detection limit
                  value by removing the trigger character&#40;s&#41;.
                </li>
                <li className={classes.Guide_functionListItem}>
                  <strong>Halve&#58;</strong> divides the detection limit value
                  by 2 and keeps significant figures intact.
                </li>
                <li className={classes.Guide_functionListItem}>
                  <strong>Zero&#58;</strong> changes any detection limit value
                  into a 0 number value.
                </li>
                <li className={classes.Guide_functionListItem}>
                  <strong>No transform&#58;</strong> does nothing to a detectin
                  limit value once found.
                </li>
              </ol>
            </Typography>
            <Typography variant="body1">
              Lastly, in the special case where your lab has included entires
              like &quot;null&quot;, &quot;void&quot;, &quot;zero&quot;, or
              other text values to represent a zero value, the &quot;Zero
              Trigger&quot; setting is included as an optional method to set
              these values to a true 0 number value. This setting will accept
              any alpha text value and is case&ndash;sensitive. Cell values
              equal this trigger value will be transformed to a 0 number value.
              This is an optional setting, and will still respect any specificed
              Scope Range settings applied.
            </Typography>
            <Typography variant="h6" className={classes.Guide_sectionSubTitle}>
              Over Limit Settings
            </Typography>
            <Typography variant="body1">
              Sometimes sample values will be over the maximum detection limit
              of the instrumentation threshold, and results will be returned
              with a text value signifying over limit.
            </Typography>
            <Typography variant="body1">
              For the Over Limit settings, the &quot;Trigger Character&quot;
              provides the same functionality as the Under Limit setting but
              will be used to search out over limit values. Again, this setting
              accepts standard punctuation and letters in a case&ndash;sensitive
              fashion. Spaces and numbers are not allowed. This is a required
              setting.
            </Typography>
            <Typography variant="body1">
              Over Limit &quot;Tranform Function&quot; provides the same options
              as the Under Limit settings, so you can process over limits how
              you like. This is a required setting.
            </Typography>
            <Typography variant="h6" className={classes.Guide_sectionSubTitle}>
              Converter Settings Actions
            </Typography>
            <Typography variant="body1">
              Upon entering your desired settings, the panels will validate and
              show any errors on your input settings. Once settings are valid,
              the &quot;Process&quot; button will enable and you can click it to
              process your sheet!
            </Typography>
            <Typography variant="body1">
              On the other hand, the &quot;Reset&quot; button will enable after
              you have started to input any settings at all. If you make too
              many mistakes, you can click it to reset the form back to its
              initial settings. However, if you have results from a previous
              process displayed below, hitting the reset button will also clear
              out those previous results, as only one result per sheet process
              are displayed.
            </Typography>
            <Typography variant="body1">
              If you have not exported your current result as a sheet, then you
              will lose that result upon reseting the settings. Transformed
              sheets will be lost, unless you exported the sheet for download.
              As we do not keep any client sheets or data, we cannot retreive
              any previous processed sheets.
            </Typography>
          </Paper>

          <Paper className={classes.Guide_section}>
            <Typography
              variant="h4"
              color="primary"
              className={classes.Guide_sectionTitle}>
              Transform Results
            </Typography>
            <Typography
              variant="body1"
              className={classes.Guide_accordionDetails_firstChild}>
              After processing your sheet, the &quot;Transform Results&quot;
              section will open below the Converter Settings. In this section,
              any &quot;Under Limit&quot;, &quot;Over Limit&quot; or &quot;Zero
              Trigger&quot; case results that were found will be displayed. If
              no instances of a particular case were found, then no
              transformations were made, and the summary panel for that case
              will not be included.
            </Typography>
            <Typography variant="h6" className={classes.Guide_sectionSubTitle}>
              Case Summaries
            </Typography>
            <Typography variant="body1">
              For each case where instances were found and transformations were
              made, the summary panel allows you to see how many of such
              instances were transformed, how many unique transformations there
              were, the list of each unique transformation, and the original
              value that was transformed. To view each instance by cell address,
              you can click the &quot;Inspect&quot; button. This will open a
              side bar list of each cell that was transformed, along with the
              original and transformed values.
            </Typography>
            <Typography variant="h6" className={classes.Guide_sectionSubTitle}>
              Viewing a Preview
            </Typography>
            <Typography variant="body1">
              To view a preview of your transformed sheet, click the blue
              &quot;View Preview&quot; button. A preview of your whole sheet
              will be generated and you can scroll around to view each
              transformation as part of the whole sheet. Note that if a Scope
              Range was set, the preview does not reflect this Scope Range, and
              the entire sheet is rendered.
            </Typography>
            <Typography variant="body1">
              Transformation cases are highlighted by different colors; blue for
              Under Limit, pink for Over Limit, and grey for Zero Trigger cases.
              Sheet previews can be used to inspect the transformed data before
              purchasing an export for download. Sheet previews provide both the
              transformed and original data of the sheet.
            </Typography>
            <Typography variant="body1">
              By default, new, transformed values are displayed, however, you
              can view the original values by hovering over a transformed cell.
              Upon mouse hover, the original value will be shown with a green
              background, and the cell address is called out in case the sheet
              header rows and columns are out of view. This way, you can easily
              inspect if the sheet was processed correctly, and your data is
              ready for export.
            </Typography>
          </Paper>

          <Paper className={classes.Guide_section}>
            <Typography
              variant="h4"
              color="primary"
              className={classes.Guide_sectionTitle}>
              Exporting a Processed Sheet
            </Typography>
            <Typography
              variant="body1"
              className={classes.Guide_accordionDetails_firstChild}>
              Once your sheet has been transformed to your liking, and
              you&apos;d like to save a copy to work with, you can export the
              sheet. To start the export process, simply click on the file type
              that you&apos;d like to receive. From here, the &quot;Secure
              Payment&quot; form will open and you can complete the purchase
              process. If for some reason your file export cannot be generated,
              you will be notified after clicking the export button and the
              payment form will not open.
            </Typography>
            <Typography variant="h6" className={classes.Guide_sectionSubTitle}>
              Export Filetypes
            </Typography>
            <Typography variant="body1">
              Currenly, you can export the sheet as a new Microsoft Excel
              workbook file in either{' '}
              <strong>Excel 2007&#43; XML Format .xlsx</strong> and &nbsp;
              <strong>Excel 97 &ndash; 2004 Workbook Format .xls</strong>{' '}
              formats.
            </Typography>
            <Typography variant="h6" className={classes.Guide_sectionSubTitle}>
              Payment
            </Typography>
            <Typography variant="body1">
              Payment for your sheet is secured and processed by Stripe. Stripe
              is an industry&ndash;leading payment processing platform, who
              handles your credit card details and payment info on our behalf.
              Your card details and payment info are secure with them and never
              touch our servers or system. Simply enter your card details, an
              email address if you&apos;d like to receive a receipt, and accept
              our Terms &amp; Conditions and you&apos;re good to go.
            </Typography>
            <Typography variant="body1">
              Please note that if you choose <strong>not</strong> to provide an
              email address, we cannot provide any after&ndash;sale customer
              support as we have no way of tracking down your order or purchase
              without an email. In addition, even if you provide an email
              address, we cannot retreive or resend any lost files since we do
              not save any of our clients&apos; processed sheets or data. If you
              have purchased and downloaded a file export, please save it
              carefully, for if you need a new copy, we cannot provide a backup.
            </Typography>
            <Typography variant="h6" className={classes.Guide_sectionSubTitle}>
              File Downloads
            </Typography>
            <Typography variant="body1">
              After your payment has been confirmed, your file export will be
              downloaded by your browser, and probably saved in your
              &quot;Downloads&quot; location. The file name for your file export
              is the original file name, in addtion to an
              &quot;&ndash;edited&quot; suffix added by the app so you can keep
              your original and transformed files separate. Likewise, the file
              export will include a single sheet suffixed with the same
              &quot;&ndash;edited&quot; tag to denote it has been edited by our
              app.
            </Typography>
            <Typography variant="body1">
              Exported files of{' '}
              <strong>Excel 2007&#43; XML Format .xlsx</strong> type include
              comments containing the original cell data for easy comparison. If
              you open up your sheet and see a swath of open comments, you can
              quickly turn hide them by toggling the &quot;Show All
              Comments&quot; button in the Excel &quot;Ribbon&quot; under the
              &quot;Review&quot; tab.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}
