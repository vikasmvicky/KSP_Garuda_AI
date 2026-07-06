// This is the real KSP Data formatted for the map
const mapData = [
    { city: "Bengaluru City", lat: 12.9716, lng: 77.5946, crimes: 56472 },
    { city: "Tumakuru", lat: 13.3389, lng: 77.1219, crimes: 8470 },
    { city: "Mangaluru City", lat: 12.9141, lng: 74.8560, crimes: 3483 },
    { city: "Mysuru City", lat: 12.2958, lng: 76.6394, crimes: 3264 },
    { city: "Kalaburagi City", lat: 17.3297, lng: 76.8343, crimes: 2740 },
    { city: "Hubballi Dharwad City", lat: 15.3647, lng: 75.1240, crimes: 2648 },
    { city: "Belagavi City", lat: 15.8522, lng: 74.4984, crimes: 2307 }
];

// Zoho Catalyst AdvancedIO function handler
export default async function (context, basicIO) {
    try {
        // Send the data to the frontend as JSON
        context.response.json(mapData);
    } catch (error) {
        // If something breaks, send an error message
        context.response.json({ error: "Failed to load map data" }).status(500);
    }
}