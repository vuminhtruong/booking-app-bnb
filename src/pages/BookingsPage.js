import { useEffect, useState } from "react";
import { differenceInCalendarDays, format } from "date-fns";
import AccountNav from "../AccountNav";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/bookings');
                setBookings(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <AccountNav />
            <div>
                {bookings?.length > 0 && bookings.map((booking, index) => (
                    <Link key={index} to={'/account/bookings/' + booking._id} className="mt-8 flex bg-gray-100 rounded-xl p-2">
                        <div className="h-48 w-80">
                            <img className="rounded-3xl h-full w-full object-cover" src={'http://localhost:4000/uploads/' + booking.place.photos[0]} alt='image' />
                        </div>
                        <div className="grid grid-cols-1 content-around  w-full m-4">
                            <div className="font-bold text-xl">{booking.place.title}</div>
                            <div className="text-gray-500"><FontAwesomeIcon className="mr-3" icon={faMoon} />{differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights</div>
                            <div className="text-gray-500"><FontAwesomeIcon className="mr-2.5" icon={faCalendarDays} />{format(new Date(booking.checkIn), 'yyyy-MM-dd')} <FontAwesomeIcon icon={faArrowRight} /> <FontAwesomeIcon className="mr-2.5" icon={faCalendarDays} />{format(new Date(booking.checkOut), 'yyyy-MM-dd')}</div>
                            <div><FontAwesomeIcon className="mr-1" icon={faMoneyCheckDollar} />Total price: {booking.price}$</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}