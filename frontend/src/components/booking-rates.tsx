import { onlineBooking, tutoringLocations } from '@/lib/booking-config';
import { getBookingUrl } from '@/lib/links';

export function BookingRates() {
  return (
    <section
      className="section"
      id="booking-rates"
      aria-labelledby="booking-rates-title"
    >
      <div className="container">
        <h2 id="booking-rates-title">Tutoring rates by location</h2>
        <p>
          Each session lasts 60 minutes. Enter the listed coupon at Calendly
          checkout to receive the promotional rate.
        </p>
        <ul className="list-unstyled row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          {[onlineBooking, ...tutoringLocations].map((option) => {
            const url = getBookingUrl(option.calendlyUrl);
            return (
              <li className="col" key={option.id}>
                <div className="booking-details h-100">
                  <h3>{option.displayName}</h3>
                  <p>{option.address}</p>
                  <p>
                    {`Regular rate: $${option.regularRate}/hour`}
                    <br />
                    <strong>
                      {`Promotional rate: $${option.promotionalRate}/hour`}
                    </strong>
                    <br />
                    Coupon: {option.coupon}
                  </p>
                  {url ? (
                    <a href={url}>
                      {option.coordinates
                        ? `Book in ${option.displayName}`
                        : 'Book online tutoring'}
                    </a>
                  ) : (
                    <a href="/support.html#email-support">Contact support to book</a>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
