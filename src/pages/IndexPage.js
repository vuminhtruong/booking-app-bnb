import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:4000/places')
      .then(response => {
        setPlaces(response.data);
      })
  }, [])

  return (
    <div className="mt-10 grid grid-cols-4 gap-4 text-center grid-rows-2 max-h-screen">
      {places.length > 0 && places.map((place, index) => (
        <Link to={'/place/' + place._id} key={index} className="bg-gray-100 rounded-2xl">
          <div className="h-2/3">
            <img className="h-full w-full rounded-2xl object-cover" src={'http://localhost:4000/uploads/' + place.photos[0]} alt='image' />
          </div>
          <div className="w-full flex flex-col gap-2 mt-7">
            <div className="text-lg font-bold">{place.address}</div>
            <div className="text-sm text-gray-400 ">{place.title}</div>
            <div className="text-lg"><span className="font-bold">{place.price}$</span> per night</div>
          </div>
        </Link>
      ))}
    </div>
  );
}