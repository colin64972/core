import React from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles(theme => {
  const baseFont = {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.custom.setSpace() * 1.5,
    color: theme.palette.bodyColor,
    lineHeight: 1.5,
    margin: 0,
    padding: 0
  }
  return {
    mainHeading: {
      ...baseFont,
      ...theme.typography.bold,
      fontSize: theme.custom.setSpace('sm'),
      color: theme.palette.primary.main
    },
    subHeading: {
      ...baseFont
    },
    section: {
      'marginTop': theme.custom.setSpace('sm'),
      '&:first-child': {
        marginTop: theme.custom.setSpace()
      }
    },
    sectionHeading: {
      ...baseFont,
      ...theme.typography.bold,
      textTransform: 'uppercase'
    },
    copy: {
      ...baseFont,
      marginTop: theme.custom.setSpace(),
      textIndent: theme.custom.setSpace()
    },
    listItem: {
      ...baseFont
    },
    siteLink: {
      ...baseFont,
      'color': theme.palette.primary[600],
      'textDecoration': 'none',
      'transition': 'all 250ms ease-out',
      '&:hover': {
        color: theme.palette.primary[400],
        cursor: 'pointer'
      }
    }
  }
})

export const TermsAndConditions = ({
  open,
  closeHandler,
  siteName,
  siteUrl,
  siteContactEmail
}) => {
  const classes = useStyles()

  const setSiteLink = () => (
    <a
      href={siteUrl}
      _target="blank"
      rel="nofollow"
      className={classes.siteLink}>
      {siteName}
    </a>
  )

  return (
    <Dialog open={open} onClose={closeHandler}>
      <DialogTitle>
        <Typography className={classes.mainHeading}>
          Terms &amp; Conditions
        </Typography>
        <Typography className={classes.subHeading}>
          Updated on October 13th, 2020
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>
            General Terms
          </Typography>
          <Typography className={classes.copy}>
            By accessing and placing an order with&nbsp;
            {setSiteLink()}, you confirm that you are in agreement with and
            bound by the terms of service contained in the Terms &amp;
            Conditions outlined below. These terms apply to the entire website
            and any email or other type of communication between you and&nbsp;
            {setSiteLink()}
          </Typography>
          <Typography className={classes.copy}>
            Under no circumstances shall the&nbsp;
            {setSiteLink()}
            &nbsp;team be liable for any direct, indirect, special, incidental
            or consequential damages, including, but not limited to, loss of
            data or profit, arising out of the use, or the inability to use, the
            materials on this site, even if the&nbsp;
            {setSiteLink()}
            &nbsp;team or an authorized representative has been advised of the
            possibility of such damages. If your use of materials from this site
            results in the need for servicing, repair or correction of equipment
            or data, you assume any costs thereof.
          </Typography>
          <Typography className={classes.copy}>
            {setSiteLink()}
            &nbsp;will not be responsible for any outcome that may occur during
            the course of usage of our resources. We reserve the rights to
            change prices and revise the resources usage policy in any moment.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>License</Typography>
          <Typography className={classes.copy}>
            {setSiteLink()}&nbsp;grants you a revocable, non&ndash;exclusive,
            non&ndash;transferable, limited license to download, install and use
            the website strictly in accordance with the terms of this Agreement.
            These Terms &amp; Conditions are a contract between you and&nbsp;
            {setSiteLink()}
            &nbsp;where &#40;&quot;we&quot;, &quot;our&quot;, or
            &quot;us&quot;&#41; grants you a revocable, non&ndash;exclusive,
            non&ndash;transferable, limited license to download, install and use
            the website strictly in accordance with the terms of this Agreement.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>
            Definitions and key terms
          </Typography>
          <Typography className={classes.copy}>
            For this Terms &amp; Conditions:
          </Typography>
          <ul>
            <li className={classes.listItem}>
              <strong>Cookie&#58;</strong> small amount of data generated by a
              website and saved by your web browser. It is used to identify your
              browser, provide analytics, remember information about you such as
              your language preference or login information.
            </li>
            <li className={classes.listItem}>
              <strong>Company&#58;</strong> when this policy mentions
              &quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or
              &quot;our&quot;, it refers to&nbsp;
              {setSiteLink()}
              &nbsp;that is responsible for your information under this Privacy
              Policy.
            </li>
            <li className={classes.listItem}>
              <strong>Country&#58;</strong> where&nbsp;
              {setSiteLink()}
              &nbsp;or the owners&frasl;founders of&nbsp;
              {setSiteLink()}
              &nbsp;are based, in this case is <a>Canada</a>.
            </li>
            <li className={classes.listItem}>
              <strong>Customer&#58;</strong> refers to the company, organization
              or person that signs up to use the&nbsp;
              {setSiteLink()}
              &nbsp;Service to manage the relationships with your consumers or
              service users.
            </li>
            <li className={classes.listItem}>
              <strong>Device&#58;</strong> any internet connected device such as
              a phone, tablet, computer or any other device that can be used to
              visit&nbsp;
              {setSiteLink()}
              &nbsp;and use the services.
            </li>
            <li className={classes.listItem}>
              <strong>IP address&#58;</strong> Every device connected to the
              Internet is assigned a number known as an Internet protocol
              &#40;IP&#41; address. These numbers are usually assigned in
              geographic blocks. An IP address can often be used to identify the
              location from which a device is connecting to the Internet.
            </li>
            <li className={classes.listItem}>
              <strong>Personnel&#58;</strong> refers to those individuals who
              are employed by&nbsp;
              {setSiteLink()}
              &nbsp;or are under contract to perform a service on behalf of one
              of the parties.
            </li>
            <li className={classes.listItem}>
              <strong>Personal Data&#58;</strong> any information that directly,
              indirectly, or in connection with other
              information&mdash;including a personal identification
              number&mdash;allows for the identification or identifiability of a
              natural person.
            </li>
            <li className={classes.listItem}>
              <strong>Service&#58;</strong> refers to the service provided
              by&nbsp;
              {setSiteLink()}
              &nbsp;as described in the relative terms &#40;if available&#41;
              and on this platform.
            </li>
            <li className={classes.listItem}>
              <strong>Third&ndash;Party Service&#58;</strong> refers to
              advertisers, contest sponsors, promotional and marketing partners,
              and others who provide our content or whose products or services
              we think may interest you.
            </li>
            <li className={classes.listItem}>
              <strong>Website&#58;</strong>&nbsp;{setSiteLink()}&apos;s site,
              which can be accessed via this URL:&nbsp;
              <a href={siteUrl} className={classes.siteLink}>
                {siteUrl}
              </a>
            </li>
            <li className={classes.listItem}>
              <strong>You&#58;</strong> a person or entity that is registered
              with&nbsp;
              {setSiteLink()}
              &nbsp;to use the Services.
            </li>
          </ul>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>
            Restrictions
          </Typography>
          <Typography className={classes.copy}>
            You agree not to, and you will not permit others to:
          </Typography>
          <ul>
            <li className={classes.listItem}>
              License, sell, rent, lease, assign, distribute, transmit, host,
              outsource, disclose or otherwise commercially exploit the service
              or make the platform available to any Third&ndash;Party.
            </li>
            <li className={classes.listItem}>
              Modify, make derivative works of, disassemble, decrypt, reverse
              compile or reverse engineer any part of the service.
            </li>
            <li className={classes.listItem}>
              Remove, alter or obscure any proprietary notice (including any
              notice of copyright or trademark) of or its affiliates, partners,
              suppliers or the licensors of the service.
            </li>
          </ul>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>Payment</Typography>
          <Typography className={classes.copy}>
            If you pay for any of our one&ndash;time payment plans, you agree to
            pay all fees or charges to your account for the Service in
            accordance with the fees, charges and billing terms in effect at the
            time that each fee or charge is due and payable. Your Payment
            Provider agreement governs your use of the designated credit card
            account, and you must refer to that agreement and not these Terms to
            determine your rights and liabilities with respect to your Payment
            Provider. By providing us with your credit card number and
            associated payment information, you agree that we are authorized to
            verify information immediately, and subsequently invoice your
            account for all fees and charges due and payable to us hereunder and
            that no additional notice or consent is required. You agree to
            immediately notify us of any change in your billing address or the
            credit card used for payment hereunder. We reserve the right at any
            time to change its prices and billing methods, either immediately
            upon posting on our Site or by e&ndash;mail delivery to your
            organization&apos;s administrator&#40;s&#41;. Any attorney fees,
            court costs, or other costs incurred in collection of delinquent
            undisputed amounts shall be the responsibility of and paid for by
            you. No contract will exist between you and us for the Service until
            we accept your order by a confirmatory e&ndash;mail, SMS&frasl;MMS
            message, or other appropriate means of communication. You are
            responsible for any Third&ndash;Party fees that you may incur when
            using the Service.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>
            Return and Refund Policy
          </Typography>
          <Typography className={classes.copy}>
            Thanks for shopping with us. We appreciate the fact that you like to
            buy the stuff we build. We also want to make sure you have a
            rewarding experience while you&apos;re exploring, evaluating, and
            purchasing our products.
          </Typography>
          <Typography className={classes.copy}>
            As with any shopping experience, there are Terms &amp; Conditions
            that apply to transactions at our company. We&apos;ll be as brief as
            our attorneys will allow. The main thing to remember is that by
            placing an order or making a purchase from us, you agree to the
            terms along with our Privacy Policy.
          </Typography>
          <Typography className={classes.copy}>
            If, for any reason, You are not completely satisfied with any good
            or service that we provide, don&apos;t hesitate to contact us and we
            will discuss any of the issues you are going through with our
            product.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>
            Your Suggestions
          </Typography>
          <Typography className={classes.copy}>
            Any feedback, comments, ideas, improvements or suggestions
            &#40;collectively, &quot;Suggestions&quot;&#41; provided by you to
            us with respect to the service shall remain the sole and exclusive
            property of us. We shall be free to use, copy, modify, publish, or
            redistribute the Suggestions for any purpose and in any way without
            any credit or any compensation to you.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>
            Your Consent
          </Typography>
          <Typography className={classes.copy}>
            We&apos;ve updated our Terms &amp; Conditions to provide you with
            complete transparency into what is being set when you visit our site
            and how it&apos;s being used. By using our service, registering an
            account, or making a purchase, you hereby consent to our Terms &amp;
            Conditions.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>
            Links to Other Websites
          </Typography>
          <Typography className={classes.copy}>
            Our service may contain links to other websites that are not
            operated by Us. If You click on a Third&ndash;Party link, You will
            be directed to that Third&ndash;Party&apos;s site. We strongly
            advise You to review the terms and conditions of every site You
            visit. We have no control over and assume no responsibility for the
            content, terms and conditions or practices of any Third&ndash;Party
            sites or services.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>Cookies</Typography>
          <Typography className={classes.copy}>
            We use &quot;Cookies&quot; to identify the areas of our website that
            you have visited. A Cookie is a small piece of data stored on your
            computer or mobile device by your web browser. We use Cookies to
            enhance the performance and functionality of our service but are
            non&ndash;essential to their use. However, without these cookies,
            certain functionality like videos may become unavailable or you
            would be required to enter your login details every time you visit
            our platform as we would not be able to remember that you had logged
            in previously. Most web browsers can be set to disable the use of
            Cookies. However, if you disable Cookies, you may not be able to
            access functionality on our website correctly or at all. We never
            place Personally Identifiable Information in Cookies.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>
            Changes To Our Terms &amp; Conditions
          </Typography>
          <Typography className={classes.copy}>
            You acknowledge and agree that we may stop &#40;permanently or
            temporarily&#41; providing the Service &#40;or any features within
            the Service&#41; to you or to users generally at our sole
            discretion, without prior notice to you. You may stop using the
            Service at any time. You do not need to specifically inform us when
            you stop using the Service. You acknowledge and agree that if we
            disable access to your account, you may be prevented from accessing
            the Service, your account details or any files or other materials
            which is contained in your account. If we decide to change our Terms
            &amp; Conditions, we will post those changes on this page,
            and&frasl;or update the Terms &amp; Conditions modification date
            below.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>
            Modifications to Our service
          </Typography>
          <Typography className={classes.copy}>
            We reserve the right to modify, suspend or discontinue, temporarily
            or permanently, the service or any service to which it connects,
            with or without notice and without liability to you.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>
            Updates to Our service
          </Typography>
          <Typography className={classes.copy}>
            We may from time to time provide enhancements or improvements to the
            features&frasl;functionality of the service, which may include
            patches, bug fixes, updates, upgrades and other modifications
            &#40;&quot;Updates&quot;&#41;. Updates may modify or delete certain
            features and&frasl;or functionalities of the service. You agree that
            we have no obligation to &#40;i&#41; provide any Updates, or
            &#40;ii&#41; continue to provide or enable any particular features
            and&frasl;or functionalities of the service to you. You further
            agree that all Updates will be &#40;i&#41; deemed to constitute an
            integral part of the service, and &#40;ii&#41; subject to the terms
            and conditions of this Agreement.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>
            Third&ndash;Party Services
          </Typography>
          <Typography className={classes.copy}>
            We may display, include or make available Third&ndash;Party content
            &#40;including data, information, applications and other products
            services&#41; or provide links to Third&ndash;Party websites or
            services &#40;&quot;Third&ndash;Party Services&quot;&#41;. You
            acknowledge and agree that we shall not be responsible for any
            Third&ndash;Party Services, including their accuracy, completeness,
            timeliness, validity, copyright compliance, legality, decency,
            quality or any other aspect thereof. We do not assume and shall not
            have any liability or responsibility to you or any other person or
            entity for any Third&ndash;Party Services. Third&ndash;Party
            Services and links thereto are provided solely as a convenience to
            you and you access and use them entirely at your own risk and
            subject to such Third&ndash;Party&apos;s terms and conditions.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>
            Term and Termination
          </Typography>
          <Typography className={classes.copy}>
            This Agreement shall remain in effect until terminated by you or us.
            We may, in its sole discretion, at any time and for any or no
            reason, suspend or terminate this Agreement with or without prior
            notice. This Agreement will terminate immediately, without prior
            notice from us, in the event that you fail to comply with any
            provision of this Agreement. You may also terminate this Agreement
            by deleting the service and all copies thereof from your computer.
            Upon termination of this Agreement, you shall cease all use of the
            service and delete all copies of the service from your computer.
            Termination of this Agreement will not limit any of our rights or
            remedies at law or in equity in case of breach by you &#40;during
            the term of this Agreement&#41; of any of your obligations under the
            present Agreement.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>
            Term and Termination
          </Typography>
          <Typography className={classes.copy}>
            If you are a copyright owner or such owner&apos;s agent and believe
            any material from us constitutes an infringement on your copyright,
            please contact us setting forth the following information:
            &#40;a&#41; a physical or electronic signature of the copyright
            owner or a person authorized to act on his behalf; &#40;b&#41;
            identification of the material that is claimed to be infringing;
            &#40;c&#41; your contact information, including your address,
            telephone number, and an email; &#40;d&#41; a statement by you that
            you have a good faith belief that use of the material is not
            authorized by the copyright owners; and &#40;e&#41; the a statement
            that the information in the notification is accurate, and, under
            penalty of perjury you are authorized to act on behalf of the owner.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>
            Indemnification
          </Typography>
          <Typography className={classes.copy}>
            You agree to indemnify and hold us and our parents, subsidiaries,
            affiliates, officers, employees, agents, partners and licensors
            &#40;if any&#41; harmless from any claim or demand, including
            reasonable attorneys&apos; fees, due to or arising out of your:
            &#40;a&#41; use of the service; &#40;b&#41; violation of this
            Agreement or any law or regulation; or &#40;c&#41; violation of any
            right of a Third&ndash;Party.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>
            No Warranties
          </Typography>
          <Typography className={classes.copy}>
            The service is provided to you &quot;AS IS&quot; and &quot;AS
            AVAILABLE&quot; and with all faults and defects without warranty of
            any kind. To the maximum extent permitted under applicable law, we,
            on our own behalf and on behalf of our affiliates and our respective
            licensors and service providers, expressly disclaims all warranties,
            whether express, implied, statutory or otherwise, with respect to
            the service, including all implied warranties of merchantability,
            fitness for a particular purpose, title and non&ndash;infringement,
            and warranties that may arise out of course of dealing, course of
            performance, usage or trade practice. Without limitation to the
            foregoing, we provide no warranty or undertaking, and makes no
            representation of any kind that the service will meet your
            requirements, achieve any intended results, be compatible or work
            with any other software, websites, systems or services, operate
            without interruption, meet any performance or reliability standards
            or be error free or that any errors or defects can or will be
            corrected.
          </Typography>
          <Typography className={classes.copy}>
            Without limiting the foregoing, neither us nor any provider makes
            any representation or warranty of any kind, express or implied:
            &#40;i&#41; as to the operation or availability of the service, or
            the information, content, and materials or products included
            thereon; &#40;ii&#41; that the service will be uninterrupted or
            error&ndash;free; &#40;iii&#41; as to the accuracy, reliability, or
            currency of any information or content provided through the service;
            or &#40;iv&#41; that the service, its servers, the content, or
            e&ndash;mails sent from or on behalf of us are free of viruses,
            scripts, trojan horses, worms, malware, timebombs or other harmful
            components. Some jurisdictions do not allow the exclusion of or
            limitations on implied warranties or the limitations on the
            applicable statutory rights of a consumer, so some or all of the
            above exclusions and limitations may not apply to you.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>
            Limitation of Liability
          </Typography>
          <Typography className={classes.copy}>
            Notwithstanding any damages that you might incur, the entire
            liability of us and any of our suppliers under any provision of this
            Agreement and your exclusive remedy for all of the foregoing shall
            be limited to the amount actually paid by you for the service. To
            the maximum extent permitted by applicable law, in no event shall we
            or our suppliers be liable for any special, incidental, indirect, or
            consequential damages whatsoever &#40;including, but not limited to,
            damages for loss of profits, for loss of data or other information,
            for business interruption, for personal injury, for loss of privacy
            arising out of or in any way related to the use of or inability to
            use the service, Third&ndash;Party software and&frasl;or
            Third&ndash;Party hardware used with the service, or otherwise in
            connection with any provision of this Agreement&#41;, even if we or
            any supplier has been advised of the possibility of such damages and
            even if the remedy fails of its essential purpose. Some
            states&frasl;jurisdictions do not allow the exclusion or limitation
            of incidental or consequential damages, so the above limitation or
            exclusion may not apply to you.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>
            Severability
          </Typography>
          <Typography className={classes.copy}>
            If any provision of this Agreement is held to be unenforceable or
            invalid, such provision will be changed and interpreted to
            accomplish the objectives of such provision to the greatest extent
            possible under applicable law and the remaining provisions will
            continue in full force and effect.
          </Typography>
          <Typography className={classes.copy}>
            This Agreement, together with the Privacy Policy and any other legal
            notices published by us on the Services, shall constitute the entire
            agreement between you and us concerning the Services. If any
            provision of this Agreement is deemed invalid by a court of
            competent jurisdiction, the invalidity of such provision shall not
            affect the validity of the remaining provisions of this Agreement,
            which shall remain in full force and effect. No waiver of any term
            of this Agreement shall be deemed a further or continuing waiver of
            such term or any other term, and our failure to assert any right or
            provision under this Agreement shall not constitute a waiver of such
            right or provision. YOU AND US AGREE THAT ANY CAUSE OF ACTION
            ARISING OUT OF OR RELATED TO THE SERVICES MUST COMMENCE WITHIN ONE
            &#40;1&#41; YEAR AFTER THE CAUSE OF ACTION ACCRUES. OTHERWISE, SUCH
            CAUSE OF ACTION IS PERMANENTLY BARRED.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>Waiver</Typography>
          <Typography className={classes.copy}>
            Except as provided herein, the failure to exercise a right or to
            require performance of an obligation under this Agreement shall not
            effect a party&apos;s ability to exercise such right or require such
            performance at any time thereafter nor shall be the waiver of a
            breach constitute waiver of any subsequent breach.
          </Typography>
          <Typography className={classes.copy}>
            No failure to exercise, and no delay in exercising, on the part of
            either party, any right or any power under this Agreement shall
            operate as a waiver of that right or power. Nor shall any single or
            partial exercise of any right or power under this Agreement preclude
            further exercise of that or any other right granted herein. In the
            event of a conflict between this Agreement and any applicable
            purchase or other terms, the terms of this Agreement shall govern.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>
            Amendments to this Agreement
          </Typography>
          <Typography className={classes.copy}>
            We reserve the right, at its sole discretion, to modify or replace
            this Agreement at any time. If a revision is material we will
            provide at least 30 days&apos; notice prior to any new terms taking
            effect. What constitutes a material change will be determined at our
            sole discretion. By continuing to access or use our service after
            any revisions become effective, you agree to be bound by the revised
            terms. If you do not agree to the new terms, you are no longer
            authorized to use our service.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>
            Entire Agreement
          </Typography>
          <Typography className={classes.copy}>
            The Agreement constitutes the entire agreement between you and us
            regarding your use of the service and supersedes all prior and
            contemporaneous written or oral agreements between you and us. You
            may be subject to additional Terms &amp; Conditions that apply when
            you use or purchase other services from us, which we will provide to
            you at the time of such use or purchase.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>
            Updates to Our Terms
          </Typography>
          <Typography className={classes.copy}>
            We may change our Service and policies, and we may need to make
            changes to these Terms so that they accurately reflect our Service
            and policies. Unless otherwise required by law, we will notify you
            &#40;for example, through our Service&#41; before we make changes to
            these Terms and give you an opportunity to review them before they
            go into effect. Then, if you continue to use the Service, you will
            be bound by the updated Terms. If you do not want to agree to these
            or any updated Terms, you can delete your account.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>
            Intellectual Property
          </Typography>
          <Typography className={classes.copy}>
            Our platform and its entire contents, features and functionality
            &#40;including but not limited to all information, software, text,
            displays, images, video and audio, and the design, selection and
            arrangement thereof&#41;, are owned by us, its licensors or other
            providers of such material and are protected by Canada and
            international copyright, trademark, patent, trade secret and other
            intellectual property or proprietary rights laws. The material may
            not be copied, modified, reproduced, downloaded or distributed in
            any way, in whole or in part, without the express prior written
            permission of us, unless and except as is expressly provided in
            these Terms &amp; Conditions. Any unauthorized use of the material
            is prohibited.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>
            Agreement to Arbitrate
          </Typography>
          <Typography className={classes.copy}>
            This section applies to any dispute EXCEPT IT DOESN&apos;T INCLUDE A
            DISPUTE RELATING TO CLAIMS FOR INJUNCTIVE OR EQUITABLE RELIEF
            REGARDING THE ENFORCEMENT OR VALIDITY OF YOUR OR YOUR&apos;s
            INTELLECTUAL PROPERTY RIGHTS. The term &quot;dispute&quot; means any
            dispute, action, or other controversy between you and us concerning
            the Services or this agreement, whether in contract, warranty, tort,
            statute, regulation, ordinance, or any other legal or equitable
            basis. &quot;Dispute&quot; will be given the broadest possible
            meaning allowable under law.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>
            Notice of Dispute
          </Typography>
          <Typography className={classes.copy}>
            In the event of a dispute, you or us must give the other a Notice of
            Dispute, which is a written statement that sets forth the name,
            address, and contact information of the party giving it, the facts
            giving rise to the dispute, and the relief requested. You must send
            any Notice of Dispute via email to: {siteContactEmail}. We will send
            any Notice of Dispute to you by mail to your address if we have it,
            or otherwise to your email address. You and us will attempt to
            resolve any dispute through informal negotiation within sixty
            &#40;60&#41; days from the date the Notice of Dispute is sent. After
            sixty &#40;60&#41; days, you or us may commence arbitration.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>
            Binding Arbitration
          </Typography>
          <Typography className={classes.copy}>
            If you and us don’t resolve any dispute by informal negotiation, any
            other effort to resolve the dispute will be conducted exclusively by
            binding arbitration as described in this section. You are giving up
            the right to litigate &#40;or participate in as a party or class
            member&#41; all disputes in court before a judge or jury. The
            dispute shall be settled by binding arbitration in accordance with
            the commercial arbitration rules of the American Arbitration
            Association. Either party may seek any interim or preliminary
            injunctive relief from any court of competent jurisdiction, as
            necessary to protect the party’s rights or property pending the
            completion of arbitration. Any and all legal, accounting, and other
            costs, fees, and expenses incurred by the prevailing party shall be
            borne by the non&ndash;prevailing party.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>
            Submissions and Privacy
          </Typography>
          <Typography className={classes.copy}>
            In the event that you submit or post any ideas, creative
            suggestions, designs, photographs, information, advertisements, data
            or proposals, including ideas for new or improved products,
            services, features, technologies or promotions, you expressly agree
            that such submissions will automatically be treated as
            non&ndash;confidential and non&ndash;proprietary and will become the
            sole property of us without any compensation or credit to you
            whatsoever. We and our affiliates shall have no obligations with
            respect to such submissions or posts and may use the ideas contained
            in such submissions or posts for any purposes in any medium in
            perpetuity, including, but not limited to, developing,
            manufacturing, and marketing products and services using such ideas.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>Promotions</Typography>
          <Typography className={classes.copy}>
            We may, from time to time, include contests, promotions,
            sweepstakes, or other activities &#40;&quot;Promotions&quot;&#41;
            that require you to submit material or information concerning
            yourself. Please note that all Promotions may be governed by
            separate rules that may contain certain eligibility requirements,
            such as restrictions as to age and geographic location. You are
            responsible to read all Promotions rules to determine whether or not
            you are eligible to participate. If you enter any Promotion, you
            agree to abide by and to comply with all Promotions Rules.
            Additional Terms &amp; Conditions may apply to purchases of goods or
            services on or through the Services, which Terms &amp; Conditions
            are made a part of this Agreement by this reference.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>
            Typographical Errors
          </Typography>
          <Typography className={classes.copy}>
            In the event a product and&frasl;or service is listed at an
            incorrect price or with incorrect information due to typographical
            error, we shall have the right to refuse or cancel any orders placed
            for the product and&frasl;or service listed at the incorrect price.
            We shall have the right to refuse or cancel any such order whether
            or not the order has been confirmed and your credit card charged. If
            your credit card has already been charged for the purchase and your
            order is canceled, we shall immediately issue a credit to your
            credit card account or other payment account in the amount of the
            charge.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>
            Miscellaneous
          </Typography>
          <Typography className={classes.copy}>
            If for any reason a court of competent jurisdiction finds any
            provision or portion of these Terms &amp; Conditions to be
            unenforceable, the remainder of these Terms &amp; Conditions will
            continue in full force and effect. Any waiver of any provision of
            these Terms &amp; Conditions will be effective only if in writing
            and signed by an authorized representative of us. We will be
            entitled to injunctive or other equitable relief &#40;without the
            obligations of posting any bond or surety&#41; in the event of any
            breach or anticipatory breach by you. We operate and control our
            Service from our offices in Canada. The Service is not intended for
            distribution to or use by any person or entity in any jurisdiction
            or country where such distribution or use would be contrary to law
            or regulation. Accordingly, those persons who choose to access our
            Service from other locations do so on their own initiative and are
            solely responsible for compliance with local laws, if and to the
            extent local laws are applicable. These Terms &amp; Conditions
            &#40;which include and incorporate our Privacy Policy&#41; contains
            the entire understanding, and supersedes all prior understandings,
            between you and us concerning its subject matter, and cannot be
            changed or modified by you. The section headings used in this
            Agreement are for convenience only and will not be given any legal
            import.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>Disclaimer</Typography>
          <Typography className={classes.copy}>
            We are not responsible for any content, code or any other
            imprecision. We do not provide warranties or guarantees. In no event
            shall we be liable for any special, direct, indirect, consequential,
            or incidental damages or any damages whatsoever, whether in an
            action of contract, negligence or other tort, arising out of or in
            connection with the use of the Service or the contents of the
            Service. We reserve the right to make additions, deletions, or
            modifications to the contents on the Service at any time without
            prior notice.
          </Typography>
          <Typography className={classes.copy}>
            Our Service and its contents are provided &quot;as is&quot; and
            &quot;as available&quot; without any warranty or representations of
            any kind, whether express or implied. We are a distributor and not a
            publisher of the content supplied by Third&ndash;Parties; as such,
            our exercises no editorial control over such content and makes no
            warranty or representation as to the accuracy, reliability or
            currency of any information, content, service or merchandise
            provided through or accessible via our Service. Without limiting the
            foregoing, We specifically disclaim all warranties and
            representations in any content transmitted on or in connection with
            our Service or on sites that may appear as links on our Service, or
            in the products provided as a part of, or otherwise in connection
            with, our Service, including without limitation any warranties of
            merchantability, fitness for a particular purpose or
            non&ndash;infringement of Third&ndash;Party rights. No oral advice
            or written information given by us or any of its affiliates,
            employees, officers, directors, agents, or the like will create a
            warranty. Price and availability information is subject to change
            without notice. Without limiting the foregoing, we do not warrant
            that our Service will be uninterrupted, uncorrupted, timely, or
            error&ndash;free.
          </Typography>
        </section>

        <section className={classes.section}>
          <Typography className={classes.sectionHeading}>Contact Us</Typography>
          <Typography className={classes.copy}>
            Don&apos;t hesitate to contact us if you have any questions.
          </Typography>
          <ul>
            <li className={classes.listItem}>
              <strong>Via Email&#58;</strong>
              &nbsp;{siteContactEmail}
            </li>
          </ul>
        </section>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={closeHandler} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
