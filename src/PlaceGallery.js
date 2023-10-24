import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function PlaceGallery({ place }) {
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-white min-h-screen">
                <div className="grid p-8 relative">
                    <div className="fixed">
                        <button onClick={() => setShowAllPhotos(false)} className="rounded-xl py-1 px-2 bg-black text-white opacity-80 hover:opacity-100">
                            <FontAwesomeIcon className="text-md mr-1" icon={faXmark} />
                            Close photos
                        </button>
                    </div>

                    {
                        place?.photos?.length > 0 && place.photos.map((photo, index) => (
                            <div key={index} className="h-110 mt-10">
                                <img class="h-full mx-auto object-fit" src={'http://localhost:4000/uploads/' + photo} alt={'image ' + index} />
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 relative">
            <div className="h-131">
                <img onClick={() => setShowAllPhotos(true)} className="h-full rounded-3xl w-full object-cover" src={'http://localhost:4000/uploads/' + place.photos[0]} alt="Image 1" />
            </div>
            <div className="grid grid-cols-1 gap-4">
                <div className="h-65">
                    <img onClick={() => setShowAllPhotos(true)} className="h-full rounded-xl w-full object-cover" src={'http://localhost:4000/uploads/' + place.photos[1]} alt="Image 2" />
                </div>
                <div className="h-65">
                    <img onClick={() => setShowAllPhotos(true)} className="h-full rounded-xl w-full object-cover" src={'http://localhost:4000/uploads/' + place.photos[2]} alt="Image 3" />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
                <div className="h-65">
                    <img onClick={() => setShowAllPhotos(true)} className="h-full rounded-xl w-full object-cover" src={'http://localhost:4000/uploads/' + place.photos[3]} alt="Image 4" />
                </div>
                <div className="h-65">
                    <img onClick={() => setShowAllPhotos(true)} className="h-full rounded-xl w-full object-cover" src={'http://localhost:4000/uploads/' + place.photos[4]} alt="Image 5" />
                </div>
            </div>
            <button onClick={() => setShowAllPhotos(true)} className="absolute bottom-2 right-2 flex items-center bg-white rounded-xl p-1 opacity-80 hover:opacity-100">
                <span class="material-symbols-outlined text-md mx-0.5">
                    format_list_bulleted
                </span>
                <span className="text-sm">
                    Show more photos
                </span>
            </button>
        </div>
    );
}