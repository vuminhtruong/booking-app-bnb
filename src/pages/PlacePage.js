import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";

export default function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('http://localhost:4000/places/' + id).then(response => {
            setPlace(response.data);
        })
    }, [id]);

    if (!place)
        return;

    

    return (
        <div className="mt-10 bg-gray-100 p-5 min-h-screen">
            <div className="text-xl font-bold">
                {place.title}
            </div>
            <div className="underline underline-offset-1 my-4">
                <FontAwesomeIcon className="mr-1" icon={faLocationDot} />
                <a href={'https://maps.google.com/?q='+ place.address}>{place.address}</a>
            </div>
            <PlaceGallery place={place} />
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
                <div>
                    <div className="my-6">
                        <h2 className="text-xl font-bold mb-1">Description</h2>
                        {place.description}
                    </div>
                    <span className="font-bold">Check-in:</span> {place.checkIn} <br />
                    <span className="font-bold">Check-out:</span> {place.checkOut} <br />
                    <span className="font-bold">Max number of guests:</span> {place.maxGuests}<br />
                    <div className="mt-6">
                        <span className="text-xl font-bold">Extra Info</span>
                        <div>{place.extraInfo}</div>
                    </div>
                </div>
                <BookingWidget place={place} />
            </div>
        </div>
    );
}

