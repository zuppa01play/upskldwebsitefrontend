import React from "react";
import "./PrivacyPolicy.css";
import { Helmet } from "react-helmet-async";

const CONTACT_EMAIL = "growth@impactree.ai";
const LAST_UPDATED = "24 November 2026";
const WEBSITE = "https://upskldai.com";


const sections = [
  {
    title: "Introduction",
    blocks: [
      {
        p: `UPSKLD is a brand of Impactree Data Technologies ("UPSKLD", "we", "us", "our"). We provide practical Artificial Intelligence learning and training for small businesses, working professionals, students and individuals.`,
      },
      {
        p: `This Privacy Policy is a complete statement of what personal information we collect, why we collect it, how we use, store, share and protect it, how long we keep it, and what rights you have. Everything you need to know about your information is written in this document itself. By using the UPSKLD website, creating an account, submitting a form, booking a session or enrolling in a course, you confirm that you have read and agree to this Privacy Policy.`,
      },
      {
        p: `This policy is written in line with the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000 of India.`,
      },
    ],
  },
  {
    title: "Scope of this policy",
    blocks: [
      { p: `This policy applies to personal information collected through:` },
      {
        ul: [
          `The UPSKLD website (${WEBSITE}) and its sub-pages.`,
          `Enquiry, contact and career counselling booking forms.`,
          `Free introductory session booking forms.`,
          `AI Bootcamp registration forms.`,
          `Account registration and login.`,
          `Online course enrolment and the learning platform (course videos, modules and quizzes).`,
          `Emails and other communication between you and UPSKLD.`,
        ],
      },
    ],
  },
  {
    title: "Information we collect",
    blocks: [
      { h: `A. Personal information you submit through forms` },
      {
        ul: [
          `Full name.`,
          `Email address.`,
          `Phone number (including WhatsApp number, if the same).`,
          `City or location.`,
          `Your category (for example student, working professional or business owner) and the course, session or bootcamp you are interested in, where the form asks for it.`,
          `Any message or query you type into the form.`,
        ],
      },
      { h: `B. Account information` },
      {
        ul: [
          `Name, email address and phone number used for registration.`,
          `Your password, which is stored only in encrypted (hashed) form. UPSKLD staff cannot see your password.`,
          `A login token that keeps you signed in.`,
        ],
      },
      { h: `C. Learning information` },
      {
        ul: [
          `Courses and modules you are enrolled in.`,
          `Video viewing progress and milestones reached in each module.`,
          `Quiz (MCQ) answers, scores and completion status.`,
          `Course progress and completion records.`,
        ],
      },
      { h: `D. Payment information` },
      {
        p: `For paid courses we record the course purchased, the amount, the date, the payment status and the transaction reference number. Your card, UPI, net-banking or wallet details are entered directly on the payment provider's secure page. UPSKLD does not see or store your full card number, CVV, UPI PIN or net-banking password.`,
      },
      { h: `E. Communication information` },
      {
        p: `The emails, messages and other details you send us when you contact us, and our replies, are retained so we can respond and manage your request.`,
      },
      { h: `F. Technical and usage information` },
      {
        ul: [
          `Browser type and version, device type and operating system.`,
          `IP address.`,
          `Pages visited and the date and time of visit.`,
          `Technical logs required to keep the platform working and secure.`,
        ],
      },
      {
        p: `We do not collect sensitive personal data such as Aadhaar number, PAN, bank account numbers, health information, religion, caste or biometric data. Please do not submit such information through our forms or emails.`,
      },
    ],
  },
  {
    title: "How we collect your information",
    blocks: [
      {
        ul: [
          `**Website forms:** when you submit an enquiry, contact, career counselling, session booking or bootcamp registration form.`,
          `**Account registration:** when you create an account.`,
          `**Course enrolment and payment:** when you enrol in or purchase a course.`,
          `**Learning activity:** automatically, when you watch course videos or take quizzes.`,
          `**Direct communication:** when you email or message us.`,
          `**Automatically:** through basic technical and usage information generated when you visit the website.`,
        ],
      },
    ],
  },
  {
    title: "Why we use your information",
    blocks: [
      {
        ul: [
          `To respond to your enquiries and bookings.`,
          `To register your account and let you log in.`,
          `To enrol you in courses, give you access to course content and save your learning progress and quiz results.`,
          `To register you for sessions and bootcamps and send you the joining details (for example the Zoom link, date and time).`,
          `To send confirmation emails and important service messages such as account, payment, schedule or policy updates.`,
          `To process payments and issue payment confirmations or receipts.`,
          `To provide customer support.`,
          `To improve the website, courses and user experience.`,
          `To protect the website and users from unauthorised access, fraud and misuse.`,
          `To meet legal, tax and regulatory obligations.`,
        ],
      },
      {
        p: `We use your information only for these purposes. We will not use it for any unrelated purpose without your consent.`,
      },
    ],
  },
  {
    title: "Legal basis and consent",
    blocks: [
      {
        p: `We process your personal information based on your consent (given when you submit a form, create an account or enrol), to perform the service you requested, and to comply with the law. When you tick a consent box or click a submit button on a UPSKLD form, you agree to our using the information you entered for the purposes listed above.`,
      },
    ],
  },
  {
    title: "Contacting you",
    blocks: [
      {
        p: `If you submit your details, we may contact you by email, telephone call, SMS or WhatsApp to respond to your enquiry, confirm your booking, give course or session details, and share information about UPSKLD courses, bootcamps and offers.`,
      },
      {
        p: `You can stop promotional messages at any time by emailing ${CONTACT_EMAIL} with the subject "Unsubscribe", or by replying "STOP" to a WhatsApp or SMS message. We will stop promotional contact within 7 days of your request. Service messages that are necessary to deliver a course or booking you have already made (for example a payment confirmation or a session link) will continue.`,
      },
    ],
  },
  {
    title: "Learning activity and course information",
    blocks: [
      {
        p: `When you use our learning platform we record the courses you enrol in, how far you have watched each video, your quiz answers and scores, and your completion status. We use this to show your progress, let you resume where you left off, evaluate quiz results, support you, and improve our course content. Your learning records are visible only to you and to authorised UPSKLD staff. We do not publish them or share them with any other person without your permission, except where the law requires.`,
      },
    ],
  },
  {
    title: "Cookies and login technologies",
    blocks: [
      {
        p: `UPSKLD uses only essential browser storage that is needed for the website to work:`,
      },
      {
        ul: [
          `**Login token:** stored in your browser after you log in so that you stay signed in. It is removed when you log out.`,
          `**Session and progress data:** small items stored in your browser to remember things such as your course progress while you are using the platform.`,
        ],
      },
      {
        p: `We do not use advertising cookies and we do not use your information for targeted advertising. You can delete this stored data at any time from your browser settings. Doing so will sign you out and you will need to log in again.`,
      },
    ],
  },
  {
    title: "Who we share your information with",
    blocks: [
      {
        p: `**UPSKLD does not sell, rent or trade your personal information.** We share information only in the following cases:`,
      },
      { h: `A. Service providers who work for us` },
      {
        ul: [
          `**Database and hosting providers:** to store your account, form and learning data (our application data is stored in a MongoDB database).`,
          `**Email delivery services:** to send confirmation, thank-you and notification emails.`,
          `**Video and media hosting providers:** to deliver course videos and learning content.`,
          `**Payment gateways:** to process payments for paid courses. They receive only the details needed to complete the payment.`,
          `**Zoom (or similar meeting platform):** to conduct live sessions and bootcamps. Your name and email may be used to send the joining link.`,
        ],
      },
      {
        p: `These providers may use your information only to provide their service to UPSKLD and are not permitted to use it for their own marketing.`,
      },
      { h: `B. Internal access` },
      {
        p: `Your information may be seen by authorised UPSKLD and Impactree Data Technologies staff and mentors who need it to run your course, session or support request.`,
      },
      { h: `C. Legal and protective reasons` },
      {
        ul: [
          `Where required by law, court order or a valid request from a government authority.`,
          `To protect the security, rights or property of UPSKLD and its users.`,
          `To investigate fraud, misuse or a security incident.`,
        ],
      },
      { h: `D. Business transfer` },
      {
        p: `If UPSKLD or Impactree Data Technologies is merged with or acquired by another organisation, your information may be transferred to the new owner, who must continue to protect it under this policy or a policy at least as protective.`,
      },
    ],
  },
  {
    title: "Third-party websites and AI tools",
    blocks: [
      {
        p: `Our courses introduce and demonstrate external AI tools, software and websites. These are run independently by other companies and have their own privacy practices that UPSKLD does not control. When you use such a tool, the information you type into it is handled by that company and not by UPSKLD.`,
      },
      { p: `**Safe-use rules for AI tools:**` },
      {
        ul: [
          `Do not enter passwords, bank or card details, Aadhaar or PAN numbers, or other sensitive personal data into any AI tool.`,
          `Do not enter confidential business information, client data or company secrets unless you are authorised to do so and have confirmed how that tool stores and uses your data.`,
          `Check whether the tool uses your inputs to train its AI models and turn that option off where the tool allows it.`,
          `Verify AI-generated answers before relying on them.`,
        ],
      },
      {
        p: `UPSKLD does not collect, access or store what you type into third-party AI tools.`,
      },
    ],
  },
  {
    title: "Data storage and security",
    blocks: [
      { p: `We protect your information with the following measures:` },
      {
        ul: [
          `Passwords are stored in encrypted (hashed) form and never in plain text.`,
          `Login uses a secure token and access is limited to your own account.`,
          `The website uses HTTPS encryption for data sent between your browser and our servers.`,
          `Only authorised UPSKLD staff can access personal data, and only as much as their work requires.`,
          `Our servers accept form submissions only from the official UPSKLD website.`,
          `Course videos have access protection to reduce unauthorised copying.`,
          `We take regular backups and review our systems for security problems.`,
        ],
      },
      {
        p: `No internet system is completely secure, and we cannot guarantee absolute security. You are responsible for keeping your password confidential, using a strong and unique password, logging out on shared devices and not sharing your account. If you suspect unauthorised access to your account, email ${CONTACT_EMAIL} immediately.`,
      },
    ],
  },
  {
    title: "How long we keep your information",
    blocks: [
      {
        p: `We keep personal information only as long as needed for the purpose it was collected, as follows:`,
      },
      {
        ul: [
          `**Enquiry, contact, counselling and session booking form data:** up to 24 months from the date of submission.`,
          `**Bootcamp registration data:** up to 24 months from the bootcamp date.`,
          `**Account information:** for as long as your account is active, and for up to 12 months after you close it or after your last login, after which it is deleted or anonymised.`,
          `**Learning progress, quiz results and completion records:** for as long as your account is active, and for up to 36 months after your course completion or account closure so that we can verify your completion if you ask.`,
          `**Payment and transaction records:** 8 years, because Indian tax and accounting laws require us to keep them.`,
          `**Emails and support communication:** up to 36 months.`,
          `**Technical and usage logs:** up to 12 months.`,
        ],
      },
      {
        p: `When the retention period ends, we permanently delete your information or remove all details that identify you. Information we are legally required to keep will be kept for the period the law requires, and then deleted.`,
      },
    ],
  },
  {
    title: "Your rights",
    blocks: [
      {
        p: `Under applicable Indian data protection law you have the right to:`,
      },
      {
        ul: [
          `**Access:** get a summary of the personal information we hold about you and how it is used.`,
          `**Correction:** correct inaccurate or incomplete information.`,
          `**Erasure:** ask us to delete your personal information, except where we must keep it by law (for example payment records).`,
          `**Withdraw consent:** withdraw your consent at any time. This does not affect processing already done, and we may not be able to continue a service that needs that information.`,
          `**Grievance redressal:** raise a complaint about how your information is handled.`,
          `**Nominate:** nominate another person to exercise your rights in the event of your death or incapacity.`,
        ],
      },
      {
        p: `**How to make a request:** send an email to ${CONTACT_EMAIL} from the email address registered with us, with the subject "Privacy Request", stating your full name, the registered email or phone number and what you want us to do. We may ask for proof of identity to protect your information. We will acknowledge your request within 3 working days and complete it within 30 days. There is no charge for making a request.`,
      },
    ],
  },
  {
    title: "Children's privacy",
    blocks: [
      {
        p: `A person under 18 years of age must use UPSKLD only with the consent and supervision of a parent or legal guardian. We do not knowingly collect personal information of a person under 18 without verifiable consent of the parent or legal guardian. We do not track, profile or show targeted advertising to children.`,
      },
      {
        p: `If you are a parent or guardian and believe that your child has given us information without your consent, email ${CONTACT_EMAIL} and we will delete the information within 30 days after verifying your identity.`,
      },
    ],
  },
  {
    title: "Data breach",
    blocks: [
      {
        p: `If a personal data breach affects your information, we will investigate and contain it immediately, notify the Data Protection Board of India and the affected users as required by law, without undue delay, tell you what information was involved and what steps you should take, and take corrective measures to prevent a repeat.`,
      },
    ],
  },
  {
    title: "International data processing",
    blocks: [
      {
        p: `Some of our service providers (for example cloud hosting, email and meeting platforms) may store or process data on servers outside India. We transfer information only to countries and providers permitted under Indian law, and we require our providers to protect your information with appropriate safeguards. By using UPSKLD you agree to this processing.`,
      },
    ],
  },
  {
    title: "Changes to this policy",
    blocks: [
      {
        p: `We may update this policy when our services, technology or the law change. The updated policy will be published on ${WEBSITE} with a new "Last Updated" date and takes effect from that date. For material changes (for example a new type of data collected or a new purpose), we will also email registered users at least 7 days before the change takes effect, and ask for fresh consent where the law requires. Continued use of UPSKLD after the effective date means you accept the updated policy.`,
      },
    ],
  },
  {
    title: "Grievance officer",
    blocks: [
      {
        p: `For any complaint or concern about your personal information, contact our Grievance Officer:`,
      },
      {
        kv: [
          ["Name", "Rajashree"],
          ["Designation", "Grievance Officer"],
          ["Organisation", "Impactree Data Technologies (UPSKLD)"],
          ["Email", CONTACT_EMAIL],
          [
            "Address",
            "8th Floor, Eastern Wing, Polyhose Towers, 86, Anna Salai, Guindy, Chennai, Tamil Nadu – 600032, India.",
          ],
          ["Working hours", "Monday to Friday, 10:00 AM to 6:00 PM IST."],
        ],
      },
      {
        p: `We will acknowledge your complaint within 3 working days and resolve it within 30 days of receiving it.`,
      },
    ],
  },
  {
    title: "Contact information",
    blocks: [
      {
        kv: [
          ["Brand", "UPSKLD"],
          ["Operating Entity", "Impactree Data Technologies"],
          ["Website", WEBSITE],
          ["Email", CONTACT_EMAIL],
          [
            "Business Address",
            "8th Floor, Eastern Wing, Polyhose Towers, 86, Anna Salai, Guindy, Chennai, Tamil Nadu – 600032, India.",
          ],
        ],
      },
      {
        p: `We value your trust and are committed to handling your personal information responsibly.`,
      },
    ],
  },
];

/* Renders **bold** text and turns the contact email into a mailto link */
const Rich = ({ text }) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    const pieces = part.split(CONTACT_EMAIL);
    return (
      <React.Fragment key={i}>
        {pieces.map((piece, j) => (
          <React.Fragment key={j}>
            {piece}
            {j < pieces.length - 1 && (
              <a
                className="upskld_privacy_pg_link"
                href={`mailto:${CONTACT_EMAIL}`}
              >
                {CONTACT_EMAIL}
              </a>
            )}
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  });
};

const Block = ({ block }) => {
  if (block.p) {
    return (
      <p>
        <Rich text={block.p} />
      </p>
    );
  }
  if (block.h) {
    return <h3 className="upskld_privacy_pg_subheading">{block.h}</h3>;
  }
  if (block.ul) {
    return (
      <ul>
        {block.ul.map((item, i) => (
          <li key={i}>
            <Rich text={item} />
          </li>
        ))}
      </ul>
    );
  }
  if (block.kv) {
    return (
      <dl className="upskld_privacy_pg_details">
        {block.kv.map(([label, value]) => (
          <div className="upskld_privacy_pg_detail_row" key={label}>
            <dt>{label}</dt>
            <dd>
              {label === "Website" ? (
                <a
                  className="upskld_privacy_pg_link"
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {value}
                </a>
              ) : (
                <Rich text={value} />
              )}
            </dd>
          </div>
        ))}
      </dl>
    );
  }
  return null;
};

const PrivacyPolicy = () => {
  return (
    <div className="upskld_privacy_pg_wrapper">

<Helmet>
  <title>Privacy Policy | Upskld AI</title>
  <link rel="canonical" href="https://upskldai.com/privacypolicy" />
</Helmet>





      <section className="upskld_privacy_pg_hero">
        <div className="upskld_privacy_pg_container">
          <span className="upskld_privacy_pg_badge">Legal</span>
          <h1 className="upskld_privacy_pg_title">Privacy Policy</h1>
          <p className="upskld_privacy_pg_tagline">
            UPSKLD – AI Learning and Professional Development Platform
          </p>
          <p className="upskld_privacy_pg_updated">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <section className="upskld_privacy_pg_content">
        <div className="upskld_privacy_pg_container upskld_privacy_pg_narrow">
          <article className="upskld_privacy_pg_article">
            {sections.map((s, index) => (
              <div key={s.title} className="upskld_privacy_pg_section">
                <h2 className="upskld_privacy_pg_heading">
                  {index + 1}. {s.title}
                </h2>
                {s.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            ))}
            <p className="upskld_privacy_pg_closing">
              UPSKLD – Learn Without Limits. Grow Without Boundaries.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;