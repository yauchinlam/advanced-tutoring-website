import { Closing } from '@/components/closing';
import { BookingLink } from '@/components/booking-link';
import { FaqGroup, FaqItem } from '@/components/faq';
import { siteConfig } from '@/lib/site-config';
import { Header } from '@/components/header';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('rates-faq');

export default function Page() {
  return (
    <>
      <Header current="rates-faq" />
      <main id="main">
        <section className="section page-intro" aria-labelledby="page-title">
          <div className="container">
            <p className="eyebrow">Sessions &amp; policies</p>
            <h1 id="page-title">Rates &amp; common questions.</h1>
            <p className="intro">
              Know what to expect before you book, from the session format and
              rates to payment and cancellation policies.
            </p>
          </div>
        </section>
        <section className="section" aria-labelledby="session-title">
          <div className="container">
            <p className="eyebrow">The session experience</p>
            <h2 id="session-title">A focused space to work things out.</h2>
            <p className="intro">
              A focused 60-minute session, online nationwide or in person
              throughout selected areas of the DMV, with sessions available at
              the student’s home or at a mutually agreed public location.
            </p>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 mt-3">
              <div className="col">
                <article className="session-item h-100">
                  <span className="session-icon" aria-hidden="true">
                    [ ↗ ]
                  </span>
                  <h3>A shared workspace</h3>
                  <p>
                    Online sessions use a digital whiteboard and screen sharing.
                    In-person sessions take place at the student’s home within
                    selected DMV service areas, with public meeting locations
                    available by agreement.
                  </p>
                </article>
              </div>
              <div className="col">
                <article className="session-item h-100">
                  <span className="session-icon" aria-hidden="true">
                    ƒ(x)
                  </span>
                  <h3>Reasoning made visible</h3>
                  <p>
                    Problem walkthroughs and conceptual explanations that
                    connect the method to the underlying idea.
                  </p>
                </article>
              </div>
              <div className="col">
                <article className="session-item h-100">
                  <span className="session-icon" aria-hidden="true">
                    ? → ✓
                  </span>
                  <h3>Course-focused support</h3>
                  <p>
                    Exam review and homework clarification, with an emphasis on
                    doing and understanding your own work.
                  </p>
                </article>
              </div>
              <div className="col">
                <article className="session-item h-100">
                  <span className="session-icon" aria-hidden="true">
                    01 / 02
                  </span>
                  <h3>A plan for practice</h3>
                  <p>
                    Optional study planning, notes, or practice may be provided
                    when useful. Recurring sessions are available; follow-up
                    materials are not guaranteed after every session.
                  </p>
                </article>
              </div>
            </div>

            <aside
              className="rates d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-4"
              aria-label="Session rates"
            >
              <div>
                <h3>Session rates</h3>
                <p data-business="rateText">{siteConfig.rateText}</p>
                <p>
                  The same rate applies online and in person. Minimum booking:
                  one 60-minute session.
                </p>
              </div>
              <BookingLink>
                {'View booking details '}
                <span aria-hidden="true">↗</span>
              </BookingLink>
            </aside>
          </div>
        </section>
        <section className="section" id="faq" aria-labelledby="faq-title">
          <div className="container">
            <p className="eyebrow">Common questions</p>
            <h2 id="faq-title">Before we begin.</h2>
            <p className="intro">
              Find answers about getting started, preparing for a session, and
              managing your booking.
            </p>
            <nav className="actions mb-5" aria-label="FAQ topics">
              <a href="#getting-started">Getting started</a>
              <a href="#session-preparation">Preparing for your session</a>
              <a href="#booking-payment">Booking and payment</a>
            </nav>
            <section className="faq-group" aria-labelledby="getting-started">
              <h3 id="getting-started">Getting started</h3>
              <FaqGroup id="getting-started-accordion">
                <FaqItem id="faq-answer-1" question={'Who do you tutor?'}>
                  <p>
                    Primarily high-school students (including standard, honors,
                    and AP courses) and college students. Mathematics, physics,
                    engineering, and other majors taking quantitative courses
                    are welcome. Graduate students are considered case-by-case.
                  </p>
                </FaqItem>
                <FaqItem
                  id="faq-answer-2"
                  question={'What subjects do you tutor?'}
                >
                  <p>
                    Algebra, Geometry, Trigonometry, Precalculus, Calculus,
                    Statistics, and Physics. Calculus coverage extends through
                    Calculus III / Multivariable Calculus and Differential
                    Equations. Advanced college mathematics requests can be
                    discussed individually.
                  </p>
                </FaqItem>
                <FaqItem
                  id="faq-answer-3"
                  question={
                    'What if I’m falling behind or don’t know what I don’t understand?'
                  }
                >
                  <p>
                    You do not need to already be good at math to work with me.
                    Students who are struggling, failing, or missing
                    prerequisites are welcome. We can work backward from what
                    you understand to find and repair the foundational gap.
                    Sometimes a different explanation or pace is what is needed.
                  </p>
                </FaqItem>
                <FaqItem
                  id="faq-answer-4"
                  question={'Do you offer online and in-person tutoring?'}
                >
                  <p>
                    {
                      'Online tutoring is available nationwide using screen sharing and a digital whiteboard. In-person tutoring is offered at the student’s home within selected DMV (Washington, D.C., Maryland, and Virginia) service areas. Public meeting locations are also available by agreement. '
                    }
                    <a href="/support.html">Contact support</a>
                    {
                      ' to confirm service-area availability and agree on the meeting location before booking. Online meeting details are provided through Calendly.'
                    }
                  </p>
                </FaqItem>
              </FaqGroup>
            </section>
            <section
              className="faq-group"
              aria-labelledby="session-preparation"
            >
              <h3 id="session-preparation">Preparing for your session</h3>
              <FaqGroup id="session-preparation-accordion">
                <FaqItem
                  id="faq-answer-6"
                  question={'What should I send before the session?'}
                >
                  <p>
                    {'Whenever possible, '}
                    <a href="/support.html#email-support">email</a>
                    {
                      ' homework or problem sets, class notes, current topics, and the material causing difficulty. Include your attempted solutions and any upcoming exam topics so we can focus the session.'
                    }
                  </p>
                </FaqItem>
                <FaqItem
                  id="faq-answer-7"
                  question={'Can you help with homework or exam preparation?'}
                >
                  <p>
                    Yes. We can clarify concepts, identify errors, work through
                    analogous problems, and prepare with permitted practice
                    materials. You remain responsible for your own work. I do
                    not complete graded assignments, provide answers to active
                    graded examinations, or take quizzes or tests for students.
                  </p>
                </FaqItem>
                <FaqItem
                  id="faq-answer-12"
                  question={'Are follow-up notes and questions included?'}
                >
                  <p>
                    Notes or practice may be provided when useful, but are not
                    guaranteed after every session. Occasional short questions
                    by email are welcome; substantive instruction should
                    generally wait until the tutoring session.
                  </p>
                </FaqItem>
              </FaqGroup>
            </section>
            <section className="faq-group" aria-labelledby="booking-payment">
              <h3 id="booking-payment">Booking and payment</h3>
              <FaqGroup id="booking-payment-accordion">
                <FaqItem
                  id="faq-answer-5"
                  question={'How long are sessions, and what do they cost?'}
                >
                  <p>
                    {'Sessions are 60 minutes. '}
                    <span data-business="rateText">{siteConfig.rateText}</span>
                    {
                      ' The same rate applies online and in person, with a minimum booking of one session. There are no packages, recurring-session discounts, group rates, or separate exam-preparation premiums at launch.'
                    }
                  </p>
                </FaqItem>
                <FaqItem
                  id="faq-answer-8"
                  question={'What is the cancellation or rescheduling policy?'}
                >
                  <p>
                    Please give at least 24 hours’ notice to cancel or
                    reschedule. Late cancellations and no-shows incur a charge
                    of 50% of the session price. If I must cancel, you will not
                    be charged; we can reschedule, and if a reasonable
                    replacement time cannot be arranged, a full refund or credit
                    will be provided.
                  </p>
                </FaqItem>
                <FaqItem
                  id="faq-answer-9"
                  question={'What happens if I arrive late?'}
                >
                  <p>
                    I will generally provide the full 60 minutes when
                    circumstances allow. The session may need to end at the
                    originally scheduled time if another student is booked
                    immediately afterward or an agreed public meeting location
                    is closing.
                  </p>
                </FaqItem>
                <FaqItem id="faq-answer-10" question={'How does payment work?'}>
                  <p>
                    Payment is due at booking and is collected through Calendly.
                    Follow the payment steps in the booking calendar to complete
                    your reservation.
                  </p>
                </FaqItem>
                <FaqItem
                  id="faq-answer-11"
                  question={'Can I schedule recurring sessions?'}
                >
                  <p>
                    {'Yes, recurring sessions are available. '}
                    <a href="/support.html#email-support">Email support</a>
                    {
                      ' to discuss a regular time. Availability, in-home service-area coverage, and any agreed public meeting location must be confirmed.'
                    }
                  </p>
                </FaqItem>
              </FaqGroup>
            </section>
            <aside className="rates" aria-labelledby="faq-help-title">
              <div>
                <h3 id="faq-help-title">Still need help?</h3>
                <p>
                  Questions about booking, session preparation, payment, or
                  joining your meeting? Get in touch through our support page.
                </p>
              </div>
              <a href="/support.html">Contact support</a>
            </aside>
          </div>
        </section>
        <Closing />
      </main>
    </>
  );
}
