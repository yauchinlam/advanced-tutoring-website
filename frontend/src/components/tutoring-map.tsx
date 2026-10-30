'use client';

import { useEffect, useRef, useState } from 'react';
import type { Map, Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { tutoringLocations } from '@/lib/booking-config';

const geoapifyKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY?.trim() ?? '';

export default function TutoringMap({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const selected = tutoringLocations.find(
    (location) => location.id === selectedId,
  );
  const container = useRef<HTMLDivElement>(null);
  const markers = useRef<Marker[]>([]);
  const selection = useRef(selectedId);
  const [status, setStatus] = useState(
    geoapifyKey
      ? 'Loading map...'
      : 'Map unavailable. Please use the location selector below.',
  );

  useEffect(() => {
    selection.current = selectedId;
    markers.current.forEach((marker, index) =>
      marker
        .getElement()
        .setAttribute(
          'aria-pressed',
          String(tutoringLocations[index].id === selectedId),
        ),
    );
  }, [selectedId]);

  useEffect(() => {
    if (!geoapifyKey || !container.current) return;
    let disposed = false;
    let map: Map | undefined;
    let resize: ResizeObserver | undefined;
    const failed = () => {
      if (!disposed)
        setStatus('Map unavailable. Please use the location selector below.');
    };
    const timeout = window.setTimeout(failed, 15000);
    import('maplibre-gl')
      .then((lib) => {
        if (disposed || !container.current) return;
        lib.setWorkerUrl(
          new URL(
            'maplibre-gl/dist/maplibre-gl-worker.mjs',
            import.meta.url,
          ).toString(),
        );
        map = new lib.Map({
          container: container.current,
          style: `https://maps.geoapify.com/v1/styles/positron/style.json?apiKey=${encodeURIComponent(geoapifyKey)}`,
          attributionControl: false,
          renderWorldCopies: false,
          cooperativeGestures: true,
        });
        map.addControl(new lib.AttributionControl({ compact: false }));
        map.addControl(new lib.NavigationControl({ showCompass: false }));
        map.on('error', failed);
        map.on('load', () => {
          window.clearTimeout(timeout);
          if (!disposed)
            setStatus('Select a marker or use the location selector below.');
        });
        const bounds = new lib.LngLatBounds();
        markers.current = tutoringLocations.map((location, index) => {
          bounds.extend(location.coordinates);
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'tutoring-marker';
          button.textContent = String(index + 1);
          button.setAttribute('aria-label', `Select ${location.displayName}`);
          button.setAttribute(
            'aria-pressed',
            String(location.id === selection.current),
          );
          button.addEventListener('click', () => onSelect(location.id));
          return new lib.Marker({ element: button })
            .setLngLat(location.coordinates)
            .addTo(map!);
        });
        map.fitBounds(bounds, { padding: 50, duration: 0, maxZoom: 10 });
        resize = new ResizeObserver(() => map?.resize());
        resize.observe(container.current);
      })
      .catch(failed);
    return () => {
      disposed = true;
      window.clearTimeout(timeout);
      resize?.disconnect();
      markers.current.forEach((marker) => marker.remove());
      markers.current = [];
      map?.remove();
    };
  }, [onSelect]);

  return (
    <div className="tutoring-map-wrap">
      {geoapifyKey && (
        <div
          className="tutoring-map"
          ref={container}
          role="region"
          aria-label="Tutoring locations map"
        />
      )}
      <p role="status">{status}</p>
      {selected && (!geoapifyKey || status.startsWith('Map unavailable.')) && (
        <p>
          Public location: {selected.address}{' '}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selected.address)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View {selected.displayName} on Google Maps (opens in a new tab)
          </a>
        </p>
      )}
      {geoapifyKey && (
        <p className="map-credits">
          <a href="https://www.geoapify.com/">Powered by Geoapify</a>
          {' | '}
          <a href="https://www.openstreetmap.org/copyright">
            © OpenStreetMap contributors
          </a>
          {' | '}
          <a href="https://openmaptiles.org/">© OpenMapTiles</a>
        </p>
      )}
    </div>
  );
}
