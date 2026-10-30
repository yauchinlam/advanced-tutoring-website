import { TutoringBooking } from '@/components/tutoring-booking';
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
              Choose online tutoring nationwide or a public location for an
              in-person session. Scheduling and payment take place on Calendly.
            </p>
            <TutoringBooking />
            <p>
              <a href="/rates-faq.html">Review rates and booking policies</a>
            </p>
            <noscript>
              <p>
                Enable JavaScript to choose an in-person location, or email
                support for booking help.
              </p>
            </noscript>
          </div>
        </section>
      </main>
    </>
  );
}
