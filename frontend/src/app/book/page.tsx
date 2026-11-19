import { BookingRates } from '@/components/booking-rates';
import { Header } from '@/components/header';
import { TutoringBooking } from '@/components/tutoring-booking';
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
              Choose online tutoring nationwide or a public location for an
              in-person session. Scheduling and payment take place on Calendly.
            </p>
            <p>
              <a href="#booking-rates">Compare all tutoring rates</a>
            </p>
            <noscript>
              <p>Use the booking links in the rates list below.</p>
            </noscript>
            <TutoringBooking />
            <p>
              <a href="/rates-faq.html">Review rates and booking policies</a>
            </p>
          </div>
        </section>
        <BookingRates />
      </main>
    </>
  );
}
