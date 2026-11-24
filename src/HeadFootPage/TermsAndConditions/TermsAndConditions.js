import React from "react";
import "./TermsAndConditions.css";
import { Helmet } from "react-helmet-async";

const CONTACT_EMAIL = "growth@impactree.ai";
const LAST_UPDATED = "24 November 2026";
const WEBSITE = "https://upskldai.com";
const ADDRESS =
  "8th Floor, Eastern Wing, Polyhose Towers, 86, Anna Salai, Guindy, Chennai, Tamil Nadu – 600032, India.";

/*
  Block types used in `sections`:
  { p: "text" }                  -> paragraph
  { h: "text" }                  -> sub heading
  { ul: ["a", "b"] }             -> bullet list
  { kv: [["Label", "Value"]] }   -> label / value lines
  **bold** works inside any text. The contact email becomes a mailto link.
*/

const sections = [
  {
    title: "Introduction and acceptance of terms",
    blocks: [
      {
        p: `These Terms and Conditions ("Terms") govern your access to and use of the UPSKLD website, online courses, bootcamps, live sessions, digital learning resources, AI training programmes and related services. UPSKLD is a brand of Impactree Data Technologies ("UPSKLD", "we", "us", "our"), providing practical Artificial Intelligence learning and training for small businesses, working professionals, students and individuals.`,
      },
      {
        p: `These Terms are a complete agreement. Everything that applies to your use of UPSKLD, including fees, refunds, privacy and complaints, is written in this document itself. By accessing our website, creating an account, enrolling in a course, registering for a bootcamp or session, making a payment or using any of our services, you confirm that you have read, understood and agreed to these Terms. If you do not agree, please do not use our website or services.`,
      },
    ],
  },
  {
    title: "About UPSKLD and its services",
    blocks: [
      {
        p: `UPSKLD makes Artificial Intelligence accessible and practically useful for individuals and businesses. Our services include:`,
      },
      {
        ul: [
          `Online AI and Generative AI courses with videos, modules and MCQ assessments.`,
          `AI for small businesses, sales and business development, marketing and content creation, finance and business operations, and workplace productivity.`,
          `AI knowledge and career development for students and working professionals.`,
          `Live bootcamps and sessions conducted online (for example on Zoom).`,
          `Free introductory sessions and career counselling bookings.`,
        ],
      },
      {
        p: `Courses may include instructional videos, digital modules, presentations, demonstrations, practical examples, exercises and quizzes. Duration, content, format and price differ from course to course. The price, duration and access period of a course are shown at the time of purchase and are the terms that apply to that purchase.`,
      },
    ],
  },
  {
    title: "Eligibility",
    blocks: [
      {
        p: `UPSKLD services are intended for students, working professionals, business owners, entrepreneurs and other individuals interested in learning AI. By using the platform you confirm that:`,
      },
      {
        ul: [
          `You are at least 18 years old, or you are using the platform with the consent and supervision of your parent or legal guardian.`,
          `You have the legal capacity to enter into these Terms.`,
          `The information you give us is true, accurate and complete.`,
          `You will use the platform only for lawful purposes and in compliance with applicable law.`,
        ],
      },
    ],
  },
  {
    title: "User registration and account responsibilities",
    blocks: [
      {
        p: `Some courses and features require an account. When you register you agree to:`,
      },
      {
        ul: [
          `Provide accurate and current name, email address and phone number.`,
          `Keep your password confidential and not share your account with anyone.`,
          `Use your account only for your own learning. One account is for one person only.`,
          `Tell us immediately at ${CONTACT_EMAIL} if you suspect unauthorised use of your account.`,
        ],
      },
      {
        p: `You are responsible for all activity carried out through your account. We may restrict or suspend an account involved in fraudulent, unauthorised or prohibited activity.`,
      },
    ],
  },
  {
    title: "Course enrolment",
    blocks: [
      {
        p: `To enrol in a course you must: (1) select the course; (2) provide the required registration details; (3) read the course description, price and access period shown; (4) complete payment, if the course is paid; and (5) receive an enrolment confirmation by email or on screen. Enrolment is confirmed only after payment is successfully received and confirmation is given. Please check the course details and price carefully before paying.`,
      },
    ],
  },
  {
    title: "Course access and learning materials",
    blocks: [
      {
        p: `Learning materials may include instructional videos, digital modules, presentations and documents, practical demonstrations, AI tool examples, exercises and quizzes. Course access is for the access period stated at the time of purchase and is personal, limited, non-exclusive and non-transferable. You need a working internet connection and a compatible device. We do not guarantee uninterrupted access because maintenance, technical faults and third-party service problems may occur. Where a paid course becomes unavailable to you for more than 7 continuous days because of a fault on our side, we will extend your access period by the number of days lost.`,
      },
      { h: `Video and quiz rules` },
      {
        ul: [
          `Course videos and quizzes track your progress; your progress is saved as you complete milestones.`,
          `You must not try to download, screen-record, copy or bypass the protection on course videos.`,
          `Quizzes must be attempted by you alone, without outside help or automated tools.`,
        ],
      },
    ],
  },
  {
    title: "Course content and learning responsibilities",
    blocks: [
      {
        p: `We aim to provide relevant, practical and accurate content. You are responsible for completing the learning activities yourself, following the course instructions, behaving appropriately on the platform and in live sessions, and applying your own judgement to the knowledge you gain. We may update or improve course content from time to time to reflect changes in AI technology, tools and industry practice.`,
      },
    ],
  },
  {
    title: "Live sessions and bootcamps",
    blocks: [
      {
        ul: [
          `Live sessions and bootcamps are conducted online on the date and time announced at registration. The joining link is sent to the email address you register with.`,
          `Registration is on a first-come basis and closes on the closing date announced for that session. If registration has closed or all seats are filled, a later registration is recorded but does not guarantee a seat.`,
          `Do not share the joining link. Do not record, photograph or live-stream a session without written permission.`,
          `We may reschedule a session because of mentor unavailability or technical reasons. If we reschedule, we will inform you by email at least 24 hours before the new time wherever possible. If you cannot attend the new date, you may request a refund under the Cancellation and Refund Policy in Section 10.`,
          `Free introductory sessions and counselling bookings are free of charge and do not create any obligation to buy a course.`,
        ],
      },
    ],
  },
  {
    title: "Course fees, payments and billing",
    blocks: [
      {
        p: `Some UPSKLD courses and services are free and others are paid. For paid courses:`,
      },
      {
        ul: [
          `The price is shown in Indian Rupees (INR) before you pay. Unless stated otherwise, the price includes applicable GST.`,
          `Payment must be made through the payment methods shown at checkout (such as UPI, debit or credit card, or net banking) via our authorised third-party payment gateway.`,
          `Your card, UPI and net-banking details are entered on the payment gateway's secure page. UPSKLD does not see or store them.`,
          `You must give accurate billing details. A payment confirmation or receipt will be emailed after a successful payment.`,
          `If money is deducted but your enrolment is not confirmed, email ${CONTACT_EMAIL} with the transaction reference number within 7 days. We will either confirm your enrolment or refund the amount within 7 working days after verifying the payment.`,
          `We may change course prices at any time. A price change does not affect a course you have already paid for.`,
        ],
      },
    ],
  },
  {
    title: "Cancellation and refund policy",
    blocks: [
      { h: `A. Free courses, sessions and counselling` },
      { p: `No payment is taken, so no refund applies.` },
      { h: `B. Paid online (self-paced) courses` },
      {
        ul: [
          `You may request a full refund within 7 days of the purchase date, provided you have not accessed more than 20% of the course content (measured by video progress recorded on the platform).`,
          `After 7 days from purchase, or after more than 20% of the course content has been accessed, the fee is not refundable.`,
          `Refunds are not given for change of mind after the above limits, lack of time, or dissatisfaction caused by expectations of job, salary or business results (see Section 14).`,
          `If your account is suspended or terminated for violating these Terms, no refund is given.`,
        ],
      },
      { h: `C. Paid bootcamps and live programmes` },
      {
        ul: [
          `You may cancel and receive a full refund if you inform us at least 72 hours before the start of the bootcamp.`,
          `Within 72 hours of the start, or after the bootcamp has started, no refund is given. If you cannot attend, we may, at our discretion, move your registration to the next batch if you ask before the start.`,
          `If UPSKLD cancels a bootcamp or programme, you will receive a full refund or, if you prefer, a transfer to the next batch.`,
        ],
      },
      { h: `D. How to request and how refunds are paid` },
      {
        ul: [
          `Email ${CONTACT_EMAIL} from your registered email address with the subject "Refund Request", giving your name, registered phone number, course name and transaction reference number.`,
          `We will acknowledge your request within 3 working days and tell you the decision within 7 working days.`,
          `An approved refund is paid to the original payment method within 7 to 10 working days after approval. The time taken for the amount to show in your account depends on your bank or payment provider. Payment gateway charges that are not returned to us by the provider may be deducted from the refund.`,
        ],
      },
      {
        p: `Nothing in this section removes any consumer right that cannot be excluded under Indian law.`,
      },
    ],
  },
  {
    title: "Intellectual property rights",
    blocks: [
      {
        p: `All original content on UPSKLD, including website design, logos, branding, course materials, videos, presentations, written content, graphics, quizzes and digital learning resources, is owned by or licensed to UPSKLD, Impactree Data Technologies or the relevant content owners, and is protected by Indian copyright and trademark law. You receive a limited permission to use course materials for your own learning only. Without prior written permission you must not:`,
      },
      {
        ul: [
          `Copy, reproduce or distribute course materials.`,
          `Record, download or redistribute course videos or live sessions.`,
          `Share your account or paid course content with another person.`,
          `Resell, rent or commercially use any learning resource.`,
          `Modify, republish or create copies or derivative works.`,
          `Remove copyright, trademark or ownership notices.`,
          `Use the UPSKLD name, logo or branding.`,
        ],
      },
      {
        p: `Misuse may lead to immediate suspension of access without refund and to legal action.`,
      },
    ],
  },
  {
    title: "Acceptable use of the platform",
    blocks: [
      { p: `You must not:` },
      {
        ul: [
          `Use the platform for any unlawful, fraudulent or abusive activity.`,
          `Try to gain unauthorised access to the website, servers, databases or other users' accounts.`,
          `Interfere with the security or working of the website, including by automated scraping, bots or overloading it.`,
          `Upload viruses, malware or harmful files.`,
          `Impersonate another person or organisation.`,
          `Upload or send unlawful, abusive, defamatory, obscene or infringing content.`,
          `Send spam or unauthorised advertisements.`,
          `Violate the privacy or intellectual property rights of others.`,
        ],
      },
      {
        p: `We may investigate suspected violations and take action, including suspension, termination and reporting to the authorities.`,
      },
    ],
  },
  {
    title: "Artificial intelligence and third-party tools",
    blocks: [
      {
        p: `UPSKLD courses introduce and demonstrate third-party AI tools, software and websites that are operated independently by other companies. Their features, availability, pricing, usage limits and terms can change without notice to UPSKLD. AI-generated information can be inaccurate, incomplete, biased or outdated, so you must verify AI output yourself before relying on it for any professional, academic, financial, business, legal or other important decision. You are responsible for reading the terms and privacy policies of any third-party tool before you use it and for the information you enter into it. Do not enter confidential, personal or sensitive information into AI tools unless you are authorised to do so and understand how the tool uses your data.`,
      },
    ],
  },
  {
    title: "Educational and professional disclaimer",
    blocks: [
      {
        p: `UPSKLD provides education and professional development. Joining or completing a course does not guarantee:`,
      },
      {
        ul: [
          `A job or placement.`,
          `A salary, hike or promotion.`,
          `Business growth or revenue.`,
          `Financial returns.`,
          `Any particular professional or academic result.`,
        ],
      },
      {
        p: `Results depend on your prior knowledge, effort, experience and how you apply what you learn. A certificate, where offered, is a certificate of course completion issued by UPSKLD. It is not a university degree or a government-recognised qualification, unless expressly stated for that course.`,
      },
    ],
  },
  {
    title: "Privacy and personal information",
    blocks: [
      {
        p: `Your privacy matters to us. The full rules on how we handle your personal information are set out below and apply as part of these Terms.`,
      },
      { h: `A. What we collect` },
      {
        ul: [
          `**Contact details:** full name, email address, phone number and city.`,
          `**Account details:** registration details, a login token, and your password in encrypted form only.`,
          `**Learning details:** courses enrolled, video progress, quiz answers, scores and completion status.`,
          `**Payment details:** course purchased, amount, date, status and transaction reference. We do not store your card, UPI PIN or net-banking details.`,
          `**Communication details:** your enquiries, emails and our replies.`,
          `**Technical details:** browser, device, IP address, pages visited and technical logs.`,
        ],
      },
      { h: `B. Why we use it` },
      {
        p: `To create and manage your account, enrol you in courses, give you access to course content, save your progress and quiz results, register you for sessions and bootcamps, process payments, respond to enquiries, send service messages and (with your consent) information about our courses, provide support, improve our services, keep the platform secure and meet legal obligations.`,
      },
      { h: `C. Who we share it with` },
      {
        p: `We never sell your personal information. We share it only with service providers who help us run UPSKLD (database and hosting, email delivery, video hosting, payment gateway and meeting platform such as Zoom), with authorised UPSKLD staff and mentors who need it for your course, and with authorities when the law requires. Some providers may process data on servers outside India.`,
      },
      { h: `D. How we protect it` },
      {
        p: `Passwords are stored encrypted, the website uses HTTPS, access is limited to authorised staff and our servers accept form submissions only from the official UPSKLD website. No system is completely secure, so you must also keep your password confidential.`,
      },
      { h: `E. How long we keep it` },
      {
        p: `Form and enquiry data up to 24 months; account data while your account is active and up to 12 months afterwards; learning records up to 36 months after course completion or account closure; payment records 8 years as required by Indian tax law; emails and support communication up to 36 months; technical logs up to 12 months. After that the data is deleted or anonymised.`,
      },
      { h: `F. Your rights` },
      {
        p: `You may ask to access, correct or delete your personal information, withdraw your consent, nominate another person to act for you, or make a complaint. Email ${CONTACT_EMAIL} from your registered email address with the subject "Privacy Request". We acknowledge within 3 working days and complete the request within 30 days. Payment records that the law requires us to keep cannot be deleted before the legal period ends.`,
      },
      { h: `G. Cookies` },
      {
        p: `We use only essential browser storage, such as a login token that keeps you signed in. We do not use advertising or tracking cookies. Clearing your browser data will sign you out.`,
      },
      { h: `H. Children` },
      {
        p: `A person under 18 may use UPSKLD only with the consent and supervision of a parent or legal guardian. We do not knowingly collect a child's information without verifiable parental consent.`,
      },
      { h: `I. Data breach` },
      {
        p: `If a breach affects your data we will act immediately, notify the Data Protection Board of India and affected users as required by law, and take corrective steps.`,
      },
    ],
  },
  {
    title: "Website availability and technical issues",
    blocks: [
      {
        p: `We make reasonable efforts to keep the website and learning platform available, but we cannot guarantee uninterrupted service. Interruptions may be caused by maintenance and updates, internet connectivity problems, hosting or infrastructure failure, technical errors, third-party service failures, security incidents or events beyond our control. We will make reasonable efforts to fix problems and restore service as soon as possible and, where planned maintenance is expected to take more than 4 hours, to give advance notice on the website or by email.`,
      },
    ],
  },
  {
    title: "Limitation of liability",
    blocks: [
      {
        p: `To the maximum extent permitted by law, UPSKLD is not liable for any indirect, incidental, special or consequential loss (including loss of income, business, profit or opportunity) arising from the use of or inability to use the website, courses or third-party tools. Our total liability to you for any claim relating to a course is limited to the amount you paid for that course. You remain responsible for how you use the knowledge gained. Nothing in these Terms excludes or limits liability that cannot be excluded or limited under Indian law.`,
      },
    ],
  },
  {
    title: "Suspension and termination of access",
    blocks: [
      {
        p: `We may restrict, suspend or terminate your account or course access if you:`,
      },
      {
        ul: [
          `Violate these Terms.`,
          `Share your account or restricted course materials.`,
          `Engage in fraudulent or unlawful activity.`,
          `Attempt to compromise the security of the website or platform.`,
          `Misuse the website or learning services.`,
        ],
      },
      {
        p: `Where reasonable, we will give you notice by email and 7 days to respond before termination; for serious violations we may suspend access immediately. You may close your account at any time by emailing ${CONTACT_EMAIL} from your registered email address. On termination, your right to access courses ends, and payment obligations, intellectual property restrictions and other terms that by their nature continue will remain in force.`,
      },
    ],
  },
  {
    title: "Changes to services and terms",
    blocks: [
      {
        p: `We may modify, update or discontinue any course, feature or service. We may revise these Terms to reflect changes in our services, technology, business or the law. The updated Terms will be published on ${WEBSITE} with a new "Last Updated" date and take effect from that date. For material changes we will also email registered users at least 7 days in advance. Continued use after the effective date means you accept the revised Terms. If you do not agree with a change, you may stop using the services and close your account.`,
      },
    ],
  },
  {
    title: "Force majeure",
    blocks: [
      {
        p: `UPSKLD is not responsible for any delay or failure to provide services caused by events beyond its reasonable control, including natural disasters, fire, floods, government orders or restrictions, power failures, internet or telecom failures, cyberattacks, infrastructure or third-party platform failures, strikes, pandemics, war or other unforeseen events. We will make reasonable efforts to reduce the disruption and restore services as soon as practicable.`,
      },
    ],
  },
  {
    title: "Governing law and jurisdiction",
    blocks: [
      {
        p: `These Terms are governed by the laws of India, including the Information Technology Act, 2000 and the Consumer Protection Act, 2019. Subject to the rights of consumers to approach the competent Consumer Forum, any dispute arising out of these Terms shall be subject to the exclusive jurisdiction of the courts at Chennai, Tamil Nadu, India. We encourage you to first raise any dispute with our Grievance Officer so that we can try to resolve it informally within 30 days.`,
      },
    ],
  },

  {
    title: "General",
    blocks: [
      {
        ul: [
          `**Entire agreement:** these Terms are the complete agreement between you and UPSKLD for the use of the website and services and replace any earlier understanding. A particular course may have its own price, duration and access period, which are stated at the time of purchase; these do not change the refund, privacy or other rules in these Terms.`,
          `**Severability:** if any part of these Terms is held invalid, the rest remains in force.`,
          `**No waiver:** if we do not enforce a right, it does not mean we have given it up.`,
          `**Assignment:** you may not transfer your rights under these Terms to anyone else. UPSKLD may transfer its rights to a successor of its business.`,
        ],
      },
    ],
  },
  {
    title: "Final acceptance",
    blocks: [
      {
        p: `By accessing the UPSKLD website, creating an account, enrolling in a course, registering for a session or bootcamp, making a purchase or using our services, you confirm that you have read, understood and agreed to these Terms and Conditions.`,
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
                className="upskld_terms_pg_link"
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
    return <h3 className="upskld_terms_pg_subheading">{block.h}</h3>;
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
      <dl className="upskld_terms_pg_details">
        {block.kv.map(([label, value]) => (
          <div className="upskld_terms_pg_detail_row" key={label}>
            <dt>{label}</dt>
            <dd>
              {label === "Website" ? (
                <a
                  className="upskld_terms_pg_link"
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

const TermsAndConditions = () => {
  return (
    <div className="upskld_terms_pg_wrapper">


      <Helmet>
  <title>Terms and Conditions | Upskld AI</title>
  <link rel="canonical" href="https://upskldai.com/termsandconditions" />
</Helmet>
      <section className="upskld_terms_pg_hero">
        <div className="upskld_terms_pg_container">
          <span className="upskld_terms_pg_badge">Legal</span>
          <h1 className="upskld_terms_pg_title">Terms and Conditions</h1>
          <p className="upskld_terms_pg_tagline">
            UPSKLD – AI Learning and Professional Development Platform
          </p>
          <p className="upskld_terms_pg_updated">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="upskld_terms_pg_content">
        <div className="upskld_terms_pg_container upskld_terms_pg_narrow">
          <article className="upskld_terms_pg_article">
            {sections.map((s, index) => (
              <div key={s.title} className="upskld_terms_pg_section">
                <h2 className="upskld_terms_pg_heading">
                  {index + 1}. {s.title}
                </h2>
                {s.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            ))}
            <p className="upskld_terms_pg_thanks">
              Thank you for choosing UPSKLD.
            </p>
            <p className="upskld_terms_pg_closing">
              UPSKLD – Learn Without Limits. Grow Without Boundaries.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;