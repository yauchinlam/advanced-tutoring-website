import type { BookingOption } from '@/lib/booking-config';
import { getBookingUrl } from '@/lib/links';

export function BookingDetails({ option }: { option: BookingOption }) {
  const url = getBookingUrl(option.calendlyUrl);
  const label = option.coordinates ? 'Book This Location' : 'Book Online';
  return (
    <article
      className="booking-details"
      aria-label="Selected booking option"
      aria-live="polite"
    >
      <p className="eyebrow">{option.hub}</p>
      <h2>{option.displayName}</h2>
      <p>
        {option.coordinates && 'Public location: '}
        {option.address}
      </p>
      <p>60-minute session</p>
      <p>
        Regular rate: ${option.regularRate}/hour
        <br />
        <strong>Promotional rate: ${option.promotionalRate}/hour</strong>
      </p>
      <p>
        Enter <strong>{option.coupon}</strong> during Calendly checkout to
        receive the promotional rate. The discount is not applied automatically.
      </p>
      {url ? (
        <a className="btn btn-primary button" href={url}>
          {label}
        </a>
      ) : (
        <>
          <button
            className="btn btn-primary button"
            type="button"
            disabled
            aria-describedby="booking-unavailable"
          >
            {label}
          </button>
          <p id="booking-unavailable" className="mt-3">
            Booking for this option is not available yet. Please{' '}
            <a href="/support.html#email-support">email support</a> for help.
          </p>
        </>
      )}
    </article>
  );
}
