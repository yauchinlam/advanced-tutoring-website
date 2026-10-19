import { BookingLink } from '@/components/booking-link';
import { BookingRedirect } from '@/components/booking-redirect';
import { Header } from '@/components/header';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('book');

export default function Page() {
  return (
    <>
      <Header current="book" />
      <main id="main">
        <section className="section" aria-labelledby="booking-title">
          <div className="container">
            <p className="eyebrow">Book with Calendly</p>
            <h1 id="booking-title">Continue to booking.</h1>
            <p className="intro">
              Scheduling and payment take place on Calendly. Before booking an
              in-person session, confirm DMV service-area coverage and the
              meeting location with the tutor.
            </p>
            <BookingRedirect />
            <p>
              <BookingLink className="btn btn-primary button">
                {'Continue to Calendly '}
                <span aria-hidden="true">↗</span>
              </BookingLink>
            </p>
            <p>
              <a href="/rates-faq.html">Review rates and booking policies</a>
            </p>
            <noscript>
              <p>Use the button above to continue to Calendly.</p>
            </noscript>
          </div>
        </section>
      </main>
    </>
  );
}
