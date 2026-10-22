import { BookingLink } from '@/components/booking-link';
import { ContactLink } from '@/components/contact-link';
import { Header } from '@/components/header';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('support');

export default function Page() {
  return (
    <>
      <Header current="support" />
      <main id="main">
        <section className="section page-intro" aria-labelledby="page-title">
          <div className="container">
            <p className="eyebrow">Support</p>
            <h1 id="page-title">How can we help?</h1>
            <p className="intro">
              Get help with booking, preparing for a session, payment questions,
              or accessing your online meeting.
            </p>
            <div className="actions">
              <a className="button secondary" href="/rates-faq.html#faq">
                Browse the FAQ
              </a>
              <a className="button secondary" href="#email-support">
                Email support
              </a>
            </div>
          </div>
        </section>
        <section className="section" aria-labelledby="support-options-title">
          <div className="container">
            <h2 id="support-options-title">Find the right next step.</h2>
            <div className="row row-cols-1 row-cols-md-2 g-4">
              <div className="col">
                <article className="subject h-100">
                  <h3>Book or change a session</h3>
                  <p>
                    Book a new session through Calendly. To cancel or
                    reschedule, use the links in your booking confirmation. If
                    you cannot find them or run into a problem, email support.
                  </p>
                  <p>
                    <BookingLink>View available sessions</BookingLink>
                  </p>
                  <a href="/rates-faq.html#booking-payment">
                    Review rates and booking policies
                  </a>
                </article>
              </div>
              <div className="col">
                <article className="subject h-100">
                  <h3>Ask about tutoring</h3>
                  <p>
                    For course questions, recurring sessions, or in-person
                    availability, include the subject, course level, goals, and
                    preferred times. For in-person tutoring, include your city
                    or ZIP code so we can confirm coverage before booking.
                  </p>
                  <a href="#email-support">Contact support about tutoring</a>
                </article>
              </div>
              <div className="col">
                <article className="subject h-100">
                  <h3>Prepare for your session</h3>
                  <p>
                    Email relevant problem sets, class notes, topics, and
                    attempted solutions before your session when possible.
                    Include the session date and any upcoming exam topics.
                  </p>
                  <a href="/rates-faq.html#session-preparation">
                    Read the preparation FAQ
                  </a>
                </article>
              </div>
              <div className="col">
                <article className="subject h-100">
                  <h3>Payment or meeting access</h3>
                  <p>
                    Check your Calendly confirmation for booking and online
                    meeting details. If you cannot find the meeting link or have
                    a payment question, email support with the session date and
                    a brief description of the issue.
                  </p>
                  <a href="#email-support">Get help with an existing booking</a>
                </article>
              </div>
            </div>
          </div>
        </section>
        <section
          className="section support-email"
          id="email-support"
          aria-labelledby="email-support-title"
        >
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-6">
                <p className="eyebrow">Get in touch</p>
                <h2 id="email-support-title">Email support.</h2>
                <p className="intro">
                  For questions before booking or help with an existing session,
                  contact us at:
                </p>
                <p className="support-address">
                  <ContactLink kind="email" />
                </p>
              </div>
              <div className="col-lg-6">
                <h3>What to include</h3>
                <ul className="support-details">
                  <li>
                    Your name and the email address used for booking, if
                    applicable.
                  </li>
                  <li>
                    The session date, time, and time zone for an existing
                    booking.
                  </li>
                  <li>
                    A brief description of your question or the issue you
                    encountered.
                  </li>
                  <li>For a tutoring inquiry, the subject and course level.</li>
                </ul>
                <p>
                  Please do not email passwords or full payment card details.
                </p>
                <p>
                  Occasional short academic questions are welcome. Substantive
                  instruction should generally wait until your tutoring session.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
