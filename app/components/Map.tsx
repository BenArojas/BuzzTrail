import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

// const INITIAL_CENTER: [number, number] = [-74.0242, 40.6941];
const INITIAL_ZOOM = 10.12;

type MapProps = {
  mapApiKey: string;
  initialCenter: [number, number]
};

const MapboxExample = ({ mapApiKey, initialCenter }: MapProps) => {
  const mapRef = useRef<mapboxgl.Map | undefined>(undefined); // Proper typing for mapRef
  const mapContainerRef = useRef<HTMLDivElement | null>(null); // Typing for map container ref

  const [center, setCenter] = useState<[number, number]>(initialCenter);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  useEffect(() => {
    if (!mapContainerRef.current) return; // Ensure the container is available

    mapboxgl.accessToken = mapApiKey;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center,
      zoom: zoom,
    });

    mapRef.current.on('move', () => {
      // Get the current center coordinates and zoom level from the map
      const mapCenter = mapRef.current!.getCenter();
      const mapZoom = mapRef.current!.getZoom();

      // Update state
      setCenter([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);
    });

    return () => {
      mapRef.current?.remove(); // Cleanup the map instance
    };
  }, [mapApiKey]);

  const handleButtonClick = () => {
    mapRef.current?.flyTo({
      center: initialCenter,
      zoom: INITIAL_ZOOM,
    });
  };

  return (
    <>
      <div
        id="map-container"
        ref={mapContainerRef}
        className="w-full h-full rounded-lg"
      />
      <div
        id="info-box"
        className="absolute top-0 left-0 z-10 flex flex-col p-4 space-y-2"
      >
        <div
          id="sidebar"
          className="bg-blue-950 bg-opacity-60 text-white p-2 font-mono rounded"
        >
          Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom: {zoom.toFixed(2)}
        </div>
        <button
          id="reset-button"
          onClick={handleButtonClick}
          className="bg-blue-100 px-4 py-2 rounde text-black cursor-pointer w-20"
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default MapboxExample;
