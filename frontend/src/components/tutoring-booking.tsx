'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { onlineBooking, tutoringLocations } from '@/lib/booking-config';
import { BookingDetails } from './booking-details';

const TutoringMap = dynamic(() => import('./tutoring-map'), {
  ssr: false,
  loading: () => <p role="status">Loading map...</p>,
});

export function TutoringBooking() {
  const [mode, setMode] = useState('online');
  const [locationId, setLocationId] = useState<string>(tutoringLocations[0].id);
  const selected = tutoringLocations.find(
    (location) => location.id === locationId,
  )!;
  return (
    <div className="tutoring-booking">
      <fieldset className="booking-modes">
        <legend>Choose your session format</legend>
        {['online', 'in-person'].map((value) => (
          <label key={value}>
            <input
              type="radio"
              name="session-format"
              value={value}
              checked={mode === value}
              onChange={() => setMode(value)}
            />{' '}
            {value === 'online' ? 'Online' : 'In Person'}
          </label>
        ))}
      </fieldset>
      {mode === 'in-person' && (
        <>
          <p>
            Sessions meet at the listed public locations. Airport names identify
            nearby areas; sessions do not take place at airports.
          </p>
          <TutoringMap selectedId={locationId} onSelect={setLocationId} />
          <label htmlFor="tutoring-location">Choose a public location</label>
          <select
            id="tutoring-location"
            className="form-select mb-4"
            value={locationId}
            onChange={(event) => setLocationId(event.target.value)}
          >
            {tutoringLocations.map((location, index) => (
              <option key={location.id} value={location.id}>
                {index + 1}. {location.displayName}: {location.address}
              </option>
            ))}
          </select>
        </>
      )}
      <BookingDetails option={mode === 'online' ? onlineBooking : selected} />
    </div>
  );
}
