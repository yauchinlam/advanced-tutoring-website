import { onlineBooking, tutoringLocations } from '@/lib/booking-config';
import { getBookingUrl } from '@/lib/links';

export const dynamic = 'force-static';

export function GET() {
  const sessions = [onlineBooking, ...tutoringLocations].map((option) => {
    const bookingUrl = getBookingUrl(option.calendlyUrl);
    return [
      option.displayName,
      `Meeting location: ${option.address}`,
      `Regular rate: $${option.regularRate}/hour`,
      `Promotional rate: $${option.promotionalRate}/hour`,
      `Calendly coupon: ${option.coupon}`,
      bookingUrl ? `Book on Calendly: ${bookingUrl}` : 'Booking unavailable',
    ].join('\n');
  });

  const introduction = [
    'Elite Lambda Tutoring: rates by location',
    'Sessions are 60 minutes. All prices are in USD.',
    'Enter the listed coupon at Calendly checkout for the promotional rate.',
  ].join('\n');

  return new Response(`${[introduction, ...sessions].join('\n\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
