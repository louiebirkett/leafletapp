import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';

const url = "http://localhost:8080/objects"; // URL for REST API

const LeafletMap = () => {
    const mapRef = useRef(null);
    const latitude = 50.83106;
    const longitude = -0.13352; // Brighton lat and long

    const [markers, setMarkers] = useState([]); // React Hook for getting markers

    useEffect(() => {
        const fetchMarkers = async () => {  // Fetch call for markers
            try {
                const response = await fetch(url);
                const data = await response.json();
                setMarkers(data);
                console.log(data);
            } catch (error) {
                console.log("Error fetching markers:", error);
            }
        };

        fetchMarkers();
    }, []);

    const position = [50.83106, -0.13352];

    return ( 
        // Make sure you set the height and width of the map container otherwise the map won't show
        <MapContainer center={[latitude, longitude]} zoom={15} ref={mapRef} style={{ height: "100vh", width: "100vw" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Example Marker to experiment with */}
            <Marker position={position}> 
                <Popup>
                    This is a Popup
                </Popup>
            </Marker>

            {markers.map((marker, index) => ( // Marker Constructors
                <Marker key={index} position={[marker.latitude, marker.longitude]}>
                    <Popup> 
                        <div className="popupImgWrapper">
                            {/* Make sure to prepend the base URL to the relative image path */}
                            <img 
                                className="popupImg" 
                                src={`http://localhost:8080/${marker.imagePath}`}
                                alt="Uploaded Item" 
                                onError={(e) => e.target.src = 'http://localhost:8080/uploads/missing.jpeg'} // Fallback image
                            />
                        </div>
                        <br />
                        <div className="popupTextWrapper">
                            <h1 className="popupTitle">{marker.name}</h1>
                            <br />
                            <p className="popupComment">{marker.comment}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default LeafletMap;
