import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PlaceGallery from "../PlaceGallery";
import { differenceInCalendarDays, format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function BookingPage() {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    useEffect(() => {
        if (id) {
            axios.get('http://localhost:4000/bookings')
                .then(response => {
                    const foundBooking = response.data.find(({ _id }) => _id === id);
                    if (foundBooking) {
                        setBooking(foundBooking);
                    }
                })
        }
    }, [id]);

    if (!booking) {
        return;
    }

    return (
        <div className="mt-10 bg-gray-100 p-5 min-h-screen">
            <div className="text-xl font-bold">
                {booking.place.title}
            </div>
            <div className="underline underline-offset-1 my-4">
                <FontAwesomeIcon className="mr-1" icon={faLocationDot} />
                <a href={'https://maps.google.com/?q=' + booking.place.address}>{booking.place.address}</a>
            </div>
            <div className="bg-gray-400 mb-4 p-4 rounded-2xl flex justify-between">
                <div>
                    <h2 className="text-white text-2xl">Your booking information:</h2>
                    <div className="flex gap-8">
                        <div className="text-gray-500 text-xl"><FontAwesomeIcon className="mr-1" icon={faMoon} />{differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights</div>
                        <div className="text-gray-500 text-xl"><FontAwesomeIcon className="mr-1" icon={faCalendarDays} />{format(new Date(booking.checkIn), 'yyyy-MM-dd')} <FontAwesomeIcon icon={faArrowRight} /> <FontAwesomeIcon className="mr-1" icon={faCalendarDays} />{format(new Date(booking.checkOut), 'yyyy-MM-dd')}</div>
                    </div>
                </div>
                <div className="bg-rose text-center rounded-2xl px-2 py-1">
                    <h2>Total price</h2>
                    <span className="font-bold text-xl">{booking.place.price * differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))}$</span>
                </div>
            </div>
            <PlaceGallery place={booking.place} />
            <div className="grid gap-4">
                <div>
                    <div className="my-6">
                        <h2 className="text-xl font-bold mb-1">Description</h2>
                        {booking.place.description}
                    </div>
                    <span className="font-bold">Check-in:</span> {booking.place.checkIn} <br />
                    <span className="font-bold">Check-out:</span> {booking.place.checkOut} <br />
                    <span className="font-bold">Max number of guests:</span> {booking.place.maxGuests}<br />
                    <div className="mt-6">
                        <span className="text-xl font-bold">Extra Info</span>
                        <div>{booking.place.extraInfo}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}