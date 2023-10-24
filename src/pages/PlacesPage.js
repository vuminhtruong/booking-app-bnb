import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlacesPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:4000/user-places')
            .then(({ data }) => {
                setPlaces(data);
            });
    }, [])

    return (
        <div>
            <AccountNav />
            <div className="text-center mt-10">
                <Link to={'/account/places/new'} className="bg-rose py-2 rounded-full px-20 text-white">
                    <FontAwesomeIcon className="mr-2" icon={faPlus} />
                    Add new place
                </Link>
            </div>
            <div>
                {places.length > 0 && places.map((place,index) => (
                    <Link key={index} to={'/account/places/' + place._id} className="mt-8 flex bg-gray-100 rounded-xl p-2">
                        <div className="h-48 w-80">
                            <img className="rounded-3xl h-full w-full object-cover" src={'http://localhost:4000/uploads/' + place.photos[0]} alt='image' />
                        </div>
                        <div className="w-full m-4">
                            <div className="font-bold text-xl">{place.title}</div>
                            <div className="mt-2">{place.description}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}