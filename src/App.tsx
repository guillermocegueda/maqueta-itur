import { MapContainer, TileLayer } from 'react-leaflet'
import Select from './components/Select.tsx';

export default function App() {

  const estados = {
    for: 'estado',
    name: 'estado',
    values: [
      { value: "01", text: 'Aguascalientes' },
      { value: "02", text: 'Baja California' },
      { value: "03", text: 'Baja California Sur' },
      { value: "04", text: 'Campeche' },
      { value: "05", text: 'Coahuila de Zaragoza' },
      { value: "06", text: 'Colima' },
      { value: "07", text: 'Chiapas' },
      { value: "08", text: 'Chihuahua' },
      { value: "09", text: 'Ciudad de México' },
      { value: "10", text: 'Durango' },
      { value: "11", text: 'Guanajuato' },
      { value: "12", text: 'Guerrero' },
      { value: "13", text: 'Hidalgo' },
      { value: "14", text: 'Jalisco' },
      { value: "15", text: 'México' },
      { value: "16", text: 'Michoacán de Ocampo' },
      { value: "17", text: 'Morelos' },
      { value: "18", text: 'Nayarit' },
      { value: "19", text: 'Nuevo León' },
      { value: "20", text: 'Oaxaca' },
      { value: "21", text: 'Puebla' },
      { value: "22", text: 'Querétaro' },
      { value: "23", text: 'Quintana Roo' },
      { value: "24", text: 'San Luis Potosí' },
      { value: "25", text: 'Sinaloa' },
      { value: "26", text: 'Sonora' },
      { value: "27", text: 'Tabasco' },
      { value: "28", text: 'Tamaulipas' },
      { value: "29", text: 'Tlaxcala' },
      { value: "30", text: 'Veracruz de Ignacio de la Llave' },
      { value: "31", text: 'Yucatán' },
      { value: "32", text: 'Zacatecas' },
    ]
  }

  const proyecto = {
    for: 'proyecto',
    name: 'proyecto',
    values: [
      {value: 'itur', text: 'Itur'},
      {value: 'degurba', text: 'Degurba'},
    ]
  }

  return (
    <>
      <div id='menu'>
        <h1>Visualizador del grado de urbanización nacional</h1>
        <div id='filtros'>
          <Select values={estados} />
          <Select values={proyecto} />
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

      </MapContainer>

    </>
  )
}