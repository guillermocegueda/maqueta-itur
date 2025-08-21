import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet'
import Select from './components/Select.tsx';
import { useEffect, useState, type ChangeEvent } from 'react';
import { estados, proyectos } from './data/selects.ts'
import { geoJSON, type LatLngExpression } from 'leaflet';

export default function App() {

  const center: LatLngExpression = [21, -102]
  const [estado, setEstado] = useState('')
  const [proyecto, setProyecto] = useState('')
  const [geojsonData, setGeojsonData] = useState<GeoJSON.GeoJsonObject | null>(null);

  const onChangeEstado = (e: ChangeEvent<HTMLSelectElement>) => setEstado(e.target.value);
  const onChangeProy = (e: ChangeEvent<HTMLSelectElement>) => setProyecto(e.target.value);

  const FitBoundsToGeoJSON: React.FC<{ data: GeoJSON.GeoJsonObject }> = ({ data }) => {
    const map = useMap();

    useEffect(() => {
      if (data) {
        const bounds = geoJSON(data).getBounds();
        console.log(bounds)
        map.fitBounds(bounds);
      }
    }, [data, map]);

    return null; // Este componente no renderiza nada visible
  };

  useEffect(() => {
    // https://nominatim.openstreetmap.org/search?county=Aguascalientes&state=Aguascalientes&country=Mexico&format=geojson

    const fetchGeojson = async () => {
      try {
        const response = await fetch(
          'http://127.0.0.1:3000/api/ejemplo'
        );
        const data = await response.json();
        console.log(data)
        setGeojsonData(data);
      } catch (error) {
        console.error('Error al cargar el GeoJSON:', error);
      }
    };

    fetchGeojson();

  }, [estado, proyecto]);

  return (
    <>
      <div id='menu'>
        <h1>Visualizador del grado de urbanización nacional</h1>
        <div id='filtros'>
          <Select values={proyectos} change={onChangeProy} />
          <Select values={estados} change={onChangeEstado} />
        </div>
      </div>
      <MapContainer

        center={center} // Centro de México
        zoom={6}
        style={{ height: '80vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {geojsonData && (
          <>
            <GeoJSON data={geojsonData} />
            <FitBoundsToGeoJSON data={geojsonData} />
          </>
        )}

      </MapContainer>

    </>
  )
}
