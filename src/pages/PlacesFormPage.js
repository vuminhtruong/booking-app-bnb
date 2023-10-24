import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";

export default function PlacesFormPage() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState([]);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('http://localhost:4000/places/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    }, [id])

    function preInput(header, description) {
        return (
            <div>
                <h1 className="text-3xl font-bold">{header}</h1>
                <p className="text-gray-500 my-1">{description}</p>
            </div>
        );
    }

    async function savePlace(e) {
        e.preventDefault();
        const placeData = { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests,price }
        if (id) {
            //update place
            await axios.put('http://localhost:4000/places', { id, ...placeData });
        } else {
            // new place
            await axios.post('http://localhost:4000/places', placeData);
        }
        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <div >
            <AccountNav />
            <form onSubmit={savePlace}>
                {preInput('Title', 'Title for your place,should be short and catchy as in advertisement')}
                <input type='text' placeholder="My love apt" value={title} onChange={e => setTitle(e.target.value)} />
                {preInput('Address', 'Address for this place')}
                <input type='text' placeholder="Futbol'naya Alleya 1, Saint Petersburg, Russia" value={address} onChange={e => setAddress(e.target.value)} />
                {preInput('Photos', 'More = better')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                {preInput('Description', 'Description of the place')}
                <textarea value={description} onChange={e => setDescription(e.target.value)} className="border rounded-xl w-full px-2 pt-2 pb-20 text-sm" />
                {preInput('Perks', 'Select all the perks of your place')}
                <div className="grid grid-cols-6 gap-4 ">
                    <Perks selected={perks} onChange={setPerks} />
                </div>
                {preInput('Extra Info', 'House rules,etc')}
                <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} className="border rounded-xl w-full px-2 pt-2 pb-10 text-sm" />
                {preInput('Check in&out times', 'Add check in and out times,remember to have some time window for cleaning the room between guests')}
                <div className="grid grid-cols-4 gap-2">
                    <div>
                        <h2>Check&nbsp;in&nbsp;time</h2>
                        <input value={checkIn} onChange={e => setCheckIn(e.target.value)} type='text' placeholder="14:00" />
                    </div>
                    <div>
                        <h2>Check&nbsp;out&nbsp;time</h2>
                        <input value={checkOut} onChange={e => setCheckOut(e.target.value)} type='text' placeholder="12:00" />
                    </div>
                    <div>
                        <h2>Maximum&nbsp;number&nbsp;of&nbsp;guests</h2>
                        <input value={maxGuests} onChange={e => setMaxGuests(e.target.value)} type='number' placeholder="2" />
                    </div>
                    <div>
                        <h2>Price&nbsp;per&nbsp;night</h2>
                        <input value={price} onChange={e => setPrice(e.target.value)} type='number' placeholder="100" />
                    </div>
                </div>
                <button className="bg-rose rounded-xl mt-1 w-full text-white py-2 text-xl">Save</button>
            </form>
        </div>
    );
}