import L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import { useRef, useState, useEffect } from 'react';

const MapDisplay = ({ map }) => {
   const mapRef = useRef(null)
   const imageUrl = `http://127.0.0.1:8000/${map.image}`
   const [bounds, setBounds] = useState(null)

   useEffect(() => {
      if (!imageUrl) return
      const sourceImg = new Image()
      sourceImg.src = imageUrl
      sourceImg.onload = () => {
         const imgWidth = sourceImg.width
         const imgHeight = sourceImg.height

         setBounds([[0,0], [imgHeight, imgWidth]])
      }

      sourceImg.onerror = () => {
         console.error(`Failed to load image: ${map.image}`);
         setBounds(null);
      };
   }, [])

   useEffect(() => {
      if (bounds) {
         const map = L.map(mapRef.current, {
            crs: L.CRS.Simple,
            minZoom: -5,
            attributionControl: false,
         })

         const mapWidth = bounds[1][1]
         const mapHeight = bounds[1][0]
         const mapBounds = [[0,0], [mapHeight, mapWidth]]

         map.fitBounds(mapBounds);
         L.imageOverlay(imageUrl, mapBounds).addTo(map)

         return () => {
            map.remove();
          };
      }
   }, [imageUrl, bounds])
   
   return (
     <div>
       <div
         ref={mapRef}
         style={{ height: '460px', width: '100%' }}
       />
     </div>
   );
 };
 

export default MapDisplay; 