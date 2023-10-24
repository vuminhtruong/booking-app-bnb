import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(() => {
        if(user) {
            setName(user.name);
        }
    },[user])

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function bookThisPlace() {
        const response = await axios.post('http://localhost:4000/bookings', {
            checkIn, checkOut, name, phone,
            place: place._id,
            price: numberOfNights * place.price,
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <div className="bg-white rounded-3xl mt-4 h-full grid content-around ">
                <div className="pt-2 text-xl text-center ">
                    Price: {place.price}$ / per night
                </div>
                <div className="m-2 border rounded-2xl">
                    <div className="flex gap-2 p-2">
                        <div className="flex-1">
                            <span>Check in: </span><br />
                            <input value={checkIn} onChange={e => setCheckIn(e.target.value)} className="border p-1 w-full rounded-xl" type='date' />
                        </div>
                        <div className="flex-1">
                            <span>Check out: </span><br />
                            <input value={checkOut} onChange={e => setCheckOut(e.target.value)} className="border p-1 w-full rounded-xl" type='date' />
                        </div>
                    </div>
                    <div className="p-2">
                        <span>Number of guests:</span>
                        <input value={numberOfGuests} onChange={e => setNumberOfGuests(e.target.value)} placeholder="1" type='number' />
                    </div>
                    {numberOfNights > 0 && (
                        <div>
                            <div className="p-2">
                                <span>Your full name:</span>
                                <input type='text' value={name} onChange={e => setName(e.target.value)} placeholder="Truong Vu" />
                            </div>
                            <div className="p-2">
                                <span>Phone number:</span>
                                <input type='text' value={phone} onChange={e => setPhone(e.target.value)} placeholder="0123456789" />
                            </div>
                            <div className="p-2">
                                <span>Email:</span>
                                <input type='text' value={email} onChange={e => setEmail(e.target.value)} placeholder="airbnb@gmail.com" />
                            </div>
                        </div>
                    )}
                </div>
                <div className="m-2">
                    <button onClick={bookThisPlace} className="rounded-full text-xl w-full p-2 text-white bg-rose mb-4">Book this place
                        {numberOfNights > 0 && (
                            <span> ${numberOfNights * place.price}</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}