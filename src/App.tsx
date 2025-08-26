import MapView from './components/Map';
import Select from './components/Select';
import { useState, useCallback, type ChangeEvent } from 'react';
import { estados, proyectos } from './data/selects.ts';
import axios from 'axios';
import type { GeoJSONProps } from './interfaces/GeoJSON';

import './App.css';

export default function App() {
  const [estado, setEstado] = useState('');
  const [proyecto, setProyecto] = useState('');
  const [geojsonData, setGeojsonData] = useState<GeoJSONProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cache] = useState(() => new Map<string, GeoJSONProps>());

  const fetchGeojson = useCallback(async (stateId: string) => {
    if (!stateId) return;

    const cacheKey = stateId;
    if (cache.has(cacheKey)) {
      setGeojsonData(cache.get(cacheKey)!);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get<GeoJSONProps>(`${import.meta.env.VITE_URL_BACKEND}/api/itur`, {
        params: {
          estado: stateId
        }
      });

      cache.set(cacheKey, response.data);
      setGeojsonData(response.data);
    } catch (error) {
      console.error('Error loading GeoJSON:', error instanceof Error ? error.message : 'Unknown error');
      setGeojsonData(null);
    } finally {
      setIsLoading(false);
    }
  }, [cache]);

  const onChangeEstado = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setEstado(newValue);
    setGeojsonData(null); // Clear current layer
    if (newValue !== '00') { // Only fetch if a valid state is selected
      fetchGeojson(newValue);
    }
  }, [fetchGeojson]);

  const onChangeProy = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setProyecto(e.target.value);
  }, []);

  return (
    <div>
      <h1 className="page-title">Geovisor de la urbanización de México (ITUR-Degurba)</h1>
      <div className='flex flex-col'>
        <div className="select-container">
          <Select
            values={{
              for: "Estado",
              name: "estado",
              values: estados.values
            }}
            change={onChangeEstado}
          />
          <Select
            values={{
              for: "Proyecto",
              name: "proyecto",
              values: proyectos.values
            }}
            change={onChangeProy}
          />
        </div>
        <MapView
          geoJsonData={geojsonData}
          isLoading={isLoading}
        />
        <div style={{ padding: '1rem' }}>
          <h2>Ciudad de México</h2>
          <p>Número de celdas: <b>8,816</b></p>

          <table>
            <thead>
              <tr>
                <th>Celdas</th>
                <th>Clasificación ITUR</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2,555</td>
                <td>Rural</td>
              </tr>
              <tr>
                <td>234</td>
                <td>Rural transitorio</td>
              </tr>
              <tr>
                <td>401</td>
                <td>Transición</td>
              </tr>
              <tr>
                <td>3,199</td>
                <td>Urbano</td>
              </tr>
              <tr>
                <td>427</td>
                <td>Urbano transitorio</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

}