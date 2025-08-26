import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { type GeoJSONProps } from '../interfaces/GeoJSON.ts'

interface MapProps {
    geoJsonData: GeoJSONProps | null;
    isLoading: boolean;
}

export default function Map({ geoJsonData, isLoading }: MapProps) {
    const style = (feature: any) => {
        return {
            fillColor: feature.properties.color_hex || '#288ab5ff',
            weight: 1,
            opacity: 1,
            color: '#286ab5ff',
            fillOpacity: 0.7
        };
    };

    return (
        <div className="map-container" style={{ height: '600px', width: '100%' }}>
            <MapContainer
                center={[23.6345, -102.5528]} // Mexico center coordinates
                zoom={5}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {isLoading && (
                    <div className="loading-overlay">
                        <div className="spinner"></div>
                    </div>
                )}
                {geoJsonData && (
                    <GeoJSON
                        data={geoJsonData}
                        style={style}
                    />
                )}
            </MapContainer>
        </div>
    )
}
