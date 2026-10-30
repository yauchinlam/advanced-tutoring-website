// Set each calendlyUrl below when its real event URL is available.
// Empty URLs fail configuration checks but keep booking disabled at runtime. No Calendly environment variables are used.
// Public configuration only. Coordinates are [longitude, latitude].
// Storefront verification sources and setup instructions: docs/booking.md.
export const CALENDLY_ACCOUNT = 'elitelambdatutoring';

export type BookingId =
  'online' | 'winchester' | 'chantilly' | 'arlington' | 'hanover';

export interface BookingOption {
  id: BookingId;
  displayName: string;
  hub: string;
  address: string;
  coordinates: [number, number] | null;
  // Rates, promotional rates, and coupon codes must match Calendly settings.
  // They are not synced automatically.
  regularRate: number;
  promotionalRate: number;
  coupon: string;
  calendlyUrl: string;
}

type BookingOptions = {
  [Id in BookingId]: BookingOption & {
    id: Id;
    coordinates: Id extends 'online' ? null : [number, number];
  };
};

export const bookingOptions = {
  online: {
    id: 'online',
    displayName: 'Online tutoring',
    hub: 'Nationwide',
    address: 'Google Meet through Calendly',
    coordinates: null,
    regularRate: 50,
    promotionalRate: 35,
    coupon: 'ELTONLINE15',
    calendlyUrl: `https://calendly.com/${CALENDLY_ACCOUNT}/private-tutoring`,
  },
  winchester: {
    id: 'winchester',
    displayName: 'Winchester, VA',
    hub: 'Winchester / Local',
    address: '1690 S Pleasant Valley Rd, Winchester, VA 22601',
    coordinates: [-78.164368117, 39.165808081],
    regularRate: 60,
    promotionalRate: 45,
    coupon: 'ELTWIN15',
    calendlyUrl: `https://calendly.com/${CALENDLY_ACCOUNT}/in-person-tutoring-winchester-va`,
  },
  chantilly: {
    id: 'chantilly',
    displayName: 'Chantilly, VA',
    hub: 'IAD / Dulles Area',
    address: '4412 Chantilly Lace Ct, Chantilly, VA 20151',
    coordinates: [-77.44484, 38.88658],
    regularRate: 105,
    promotionalRate: 90,
    coupon: 'ELTCHANT15',
    calendlyUrl: `https://calendly.com/${CALENDLY_ACCOUNT}/in-person-tutoring-chantilly-va`,
  },
  arlington: {
    id: 'arlington',
    displayName: 'Arlington, VA',
    hub: 'DCA / Reagan National Area',
    address: '2413 Columbia Pike, Arlington, VA 22204',
    coordinates: [-77.08402, 38.86347],
    regularRate: 130,
    promotionalRate: 115,
    coupon: 'ELTARL15',
    calendlyUrl: `https://calendly.com/${CALENDLY_ACCOUNT}/in-person-tutoring-arlington-va`,
  },
  hanover: {
    id: 'hanover',
    displayName: 'Hanover, MD',
    hub: 'BWI / Baltimore Area',
    address: '7680 Arundel Mills Blvd, Hanover, MD 21076',
    coordinates: [-76.728378294, 39.153183718],
    regularRate: 140,
    promotionalRate: 125,
    coupon: 'ELTBWI15',
    calendlyUrl: `https://calendly.com/${CALENDLY_ACCOUNT}/in-person-tutoring-hanover-md`,
  },
} satisfies BookingOptions;

export const onlineBooking = bookingOptions.online;
export const tutoringLocations = Object.values(bookingOptions).filter(
  (option) => option.id !== 'online',
);
