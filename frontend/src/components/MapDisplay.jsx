import React, { useState, useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import NotePinSelectDialog from './dialogs/PinNoteSelectDialog';
import PinNoteDialog from './dialogs/PinNoteDialog';
import PinRemoveDialog from './dialogs/PinRemoveDialog';
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const MapDisplay = ({ mapItem, projectItems }) => {
    const mapRef = useRef(null);
    const imageUrl = `http://127.0.0.1:8000/${mapItem.image}`;
    const [bounds, setBounds] = useState(null);
    const [mapInstance, setMapInstance] = useState(null);
    const [isPinPlacementMode, setPinPlacementMode] = useState(false);
    const [markers, setMarkers] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedPinCoords, setSelectedPinCoords] = useState(null);
    const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

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

                    marker.on('click', () => {
                        if (note) {
                            setSelectedNoteId(note);
                            setIsNoteDialogOpen(true);
                        }
                    });

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
    const createMarker = (x, y, note) => {
        const marker = L.marker([y, x]).addTo(mapInstance);

        marker.on('click', () => {
            if (note) {
                setSelectedNoteId(note.id);
                setIsNoteDialogOpen(true);
            }
        });

        return marker;
    };

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

                const newMarker = createMarker(x, y, selectedNote);
                setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
            })
            .catch((error) => {
                console.error('Error: ', error);
            });

        setIsDialogOpen(false);
        setSelectedPinCoords(null);
        setPinPlacementMode(false);
    };

    const handleRemovePin = (pinId) => {
        setMarkers((prevMarkers) => {
            const markerToRemove = prevMarkers.find(marker => marker.options.id === pinId);
            if (markerToRemove) {
                markerToRemove.remove();
            }
            return prevMarkers.filter(marker => marker.options.id !== pinId);
        });
    };

    useEffect(() => {
        if (mapInstance && isPinPlacementMode) {
            mapInstance.on('click', handleMapClick);
            return () => mapInstance.off('click', handleMapClick);
        }
    }, [mapInstance, isPinPlacementMode]);

    return (
        <div>
            <Fab
                aria-label="add"
                onClick={() => setPinPlacementMode(true)}
                disabled={!mapInstance || isPinPlacementMode}
                sx={{
                    position: 'absolute',
                    right: 22,
                    bottom: 16,
                    backgroundColor: '#3c493f',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#8fd1b0',
                    },
                }}
            >
                <AddIcon />
            </Fab>
            <Fab
                aria-label="remove"
                onClick={() => setIsRemoveDialogOpen(true)}
                disabled={!mapInstance}
                sx={{
                    position: 'absolute',
                    right: 22,
                    bottom: 80,
                    backgroundColor: '#3c493f',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#8fd1b0',
                    },
                }}
            >
                <RemoveIcon />
            </Fab>
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
            <PinNoteDialog
                open={isNoteDialogOpen}
                noteId={selectedNoteId}
                onClose={() => {
                    setSelectedNoteId(null);
                    setIsNoteDialogOpen(false);
                }}
            />
            <PinRemoveDialog
                open={isRemoveDialogOpen}
                onClose={() => setIsRemoveDialogOpen(false)}
                pins={mapItem.pins}
                onRemove={handleRemovePin}
            />
        </div>
    );
};

export default MapDisplay;