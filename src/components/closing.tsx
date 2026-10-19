import { BookingLink } from './booking-link';
import { siteConfig } from '@/lib/site-config';

export function Closing() {
  return (
    <section
      className="container closing d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between gap-4"
      aria-labelledby="closing-title"
    >
      <div>
        <h2 id="closing-title">
          Have a difficult course
          <br />
          or exam coming up?
        </h2>
        <p>
          Whether you’re seeking help for yourself or your student, bring your
          questions. We’ll start with what makes sense and build from there.
        </p>
      </div>
      <BookingLink className="btn btn-primary button">
        {siteConfig.primaryCta} <span aria-hidden="true">↗</span>
      </BookingLink>
    </section>
  );
}
