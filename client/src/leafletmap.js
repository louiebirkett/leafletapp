import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';




const url = process.env.API_URL // url for REST API

const popupImage = "https://www.jdogjunkremoval.com/wp-content/uploads/2020/01/scrap-metal.jpg"; // Example image for the popup


 

const LeafletMap = () => {
    const mapRef = useRef(null)
    const latitude = 50.83106;
    const longitude = -0.13352; // Brighton lat and long

    const [markers, setMarkers] = useState([]); //React Hook for getting markers

    useEffect(() => {
      const fetchMarkers = async () => {  //Fetch call for markers
        try {
          const response = await fetch(url);
          const data = await response.json();
          setMarkers(data);
          console.log(data);
        }
        catch(error){
          console.log("Error fetching markers:, error");
        }
      };

      fetchMarkers();
    }, []);


    const position = [50.83106, -0.13352];
    return ( 
        // Make sure you set the height and width of the map container otherwise the map won't show
          <MapContainer center={[latitude, longitude]} zoom={15} ref={mapRef} style={{height: "100vh", width: "100vw"}}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

              {/* Example Marker to experiment with  */} 
              {/* REMIND ME TO REMOVE THIS WHEN FINISHED */}
            <Marker position={position}> 
                <Popup>
                    This is a Popup
                </Popup>
            </Marker>

            {markers.map((marker, index) => ( // Marker Constructors
              <Marker key={index} position={[marker.latitude, marker.longitude]}>
                <Popup> 
                  <div className="popupImgWrapper">
                    <img className="popupImg" src= {marker.imagePath}></img>
                  </div>
                  <br></br> 
                  <div className="popupTextWraper">
                    <h1 className="popupTitle">{marker.name}</h1>
                    <br></br>
                    <p className="popupComment">{marker.comment}</p>
                  </div>
                  
                  </Popup>
              </Marker>
            ))}
          </MapContainer> 
      );
    };
    
    export default LeafletMap;

