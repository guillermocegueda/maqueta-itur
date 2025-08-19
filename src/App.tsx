import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import Select from './components/Select.tsx';
import { useEffect, useState, type ChangeEvent } from 'react';
import { estados, proyectos } from './data/selects.ts'

export default function App() {

  const [estado, setEstado] = useState('')
  const [proyecto, setProyecto] = useState('')
  const [geojsonData, setGeojsonData] = useState<GeoJSON.GeoJsonObject | null>(null);

  const onChangeEstado = (e: ChangeEvent<HTMLSelectElement>) => setEstado(e.target.value);
  const onChangeProy = (e: ChangeEvent<HTMLSelectElement>) => setProyecto(e.target.value);

  useEffect(() => {
    // https://nominatim.openstreetmap.org/search?county=Aguascalientes&state=Aguascalientes&country=Mexico&format=geojson

    const fetchGeojson = async () => {
      try {
        const response = await fetch(
          'https://nominatim.openstreetmap.org/search?county=Aguascalientes&state=Aguascalientes&country=Mexico&polygon_geojson=1&format=geojson'
        );
        const data = await response.json();
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
          <Select values={estados} change={onChangeEstado}/>
          <Select values={proyectos} change={onChangeProy}/>
        </div>
      </div>
      <MapContainer
        center={[23.6345, -102.5528]} // Centro de México
        zoom={6}
        style={{ height: '80vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {geojsonData && <GeoJSON data={geojsonData} />}

      </MapContainer>

    </>
  )
}