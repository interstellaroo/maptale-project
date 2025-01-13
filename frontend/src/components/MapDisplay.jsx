import React, { useState, useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Button from '@mui/material/Button';
import axios from 'axios';
import NotePinSelectDialog from './dialogs/PinNoteSelectDialog';

const MapDisplay = ({ mapItem, projectItems }) => {
    const mapRef = useRef(null);
    const imageUrl = `http://127.0.0.1:8000/${mapItem.image}`;
    const [bounds, setBounds] = useState(null);
    const [mapInstance, setMapInstance] = useState(null);
    const [isPinPlacementMode, setPinPlacementMode] = useState(false);
    const [markers, setMarkers] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedPinCoords, setSelectedPinCoords] = useState(null);

    const flattenNotesStructure = (children) => {
        let result = [];
        for (const child of children) {
            if (child.resourcetype === 'Note') {
                result.push(child);
            }
            if (child.children && child.children.length > 0) {
                result = result.concat(flattenNotesStructure(child.children));
            }
        }
        return result;
    };
    const projectNotes = flattenNotesStructure(projectItems);

    useEffect(() => {
        if (!imageUrl) return;
        const sourceImg = new Image();
        sourceImg.src = imageUrl;
        sourceImg.onload = () => {
            const imgWidth = sourceImg.width;
            const imgHeight = sourceImg.height;

            setBounds([[0, 0], [imgHeight, imgWidth]]);
        };
        sourceImg.onerror = () => {
            console.error(`Failed to load image: ${mapItem.image}`);
            setBounds(null);
        };
    }, [imageUrl, mapItem.image]);

    useEffect(() => {
        if (bounds) {
            const map = L.map(mapRef.current, {
                crs: L.CRS.Simple,
                minZoom: -5,
                attributionControl: false,
            });

            const mapBounds = [[0, 0], [bounds[1][0], bounds[1][1]]];

            map.fitBounds(mapBounds);
            L.imageOverlay(imageUrl, mapBounds).addTo(map);

            if (mapItem.pins && mapItem.pins.length > 0) {
                const initialMarkers = mapItem.pins.map((pin) => {
                  const { x, y, note } = pin;
                  const marker = L.marker([y, x]).addTo(map);
                  marker.bindPopup(`Note ID: ${note || 'None'}`);
                  return marker;
                });
                setMarkers(initialMarkers);
            }

            setMapInstance(map);

            return () => {
                markers.forEach((marker) => marker.remove());
                map.remove();
            };
        }
    }, [imageUrl, bounds, mapItem.pins]);

    const handleMapClick = (e) => {
        const { lat, lng } = e.latlng;
        setSelectedPinCoords({ x: lng, y: lat });
        setIsDialogOpen(true);
    };

    const handleDialogSelect = (selectedNote) => {
      if (!selectedPinCoords || !selectedNote) return;
  
      const { x, y } = selectedPinCoords;
  
      axios
          .post(`http://127.0.0.1:8000/api/item/pin`, {
              map: mapItem.id,
              note: selectedNote.id,
              x,
              y,
          })
          .then((response) => {
              console.log(response);
  
              const newMarker = L.marker([y, x])
                  .addTo(mapInstance)
                  .bindPopup(`Note ID: ${selectedNote.id}`);
  
              setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
          })
          .catch((error) => {
              console.error('Error: ', error);
          });
  
      setIsDialogOpen(false);
      setSelectedPinCoords(null);
      setPinPlacementMode(false)
  };

    useEffect(() => {
        if (mapInstance && isPinPlacementMode) {
            mapInstance.on('click', handleMapClick);
            return () => mapInstance.off('click', handleMapClick);
        }
    }, [mapInstance, isPinPlacementMode]);

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setPinPlacementMode(true)}
                disabled={!mapInstance || isPinPlacementMode}
            >
                Add Pin
            </Button>
            <div
                ref={mapRef}
                style={{ height: '520px', width: '100%', marginTop: '10px' }}
            />
            <NotePinSelectDialog
                notes={projectNotes}
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSelect={handleDialogSelect}
            />
        </div>
    );
};

export default MapDisplay;
