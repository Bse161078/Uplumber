import L from "leaflet";
import marker from "../images/mark.png";

export const VenueLocationIcon = L.icon({
  iconUrl: marker,
  iconRetinaUrl: marker,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: "leaflet-venue-icon",
});
