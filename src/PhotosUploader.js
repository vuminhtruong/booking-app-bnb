import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTrash, faStar } from "@fortawesome/free-solid-svg-icons";

export default function PhotosUploader({ addedPhotos, onChange }) {
    const [photoLink, setPhotoLink] = useState('');

    async function addPhotoByLink(e) {
        e.preventDefault();
        const { data } = await axios.post('http://localhost:4000/upload-by-link', { link: photoLink });
        onChange(prev => {
            return [...prev, data];
        });

        setPhotoLink('');
    }

    function uploadPhoto(e) {
        const files = e.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        axios.post('http://localhost:4000/upload', data, {
            headers: { 'Content-type': 'multipart/form-data' }
        }).then(response => {
            const { data: filesnames } = response;
            onChange(prev => {
                return [...prev, ...filesnames];
            });
        });
    }

    function removePhoto(e,fileName) {
        e.preventDefault();
        onChange([...addedPhotos.filter(photo => photo !== fileName)])
    }

    function selectMainPhoto(e,fileName) {
        e.preventDefault();
        const photoNotMain = addedPhotos.filter(photo => photo !== fileName);
        const newAddedPhoto = [fileName,...photoNotMain];
        onChange(newAddedPhoto);
    }

    return (
        <>
            <div className="flex gap-2">
                <input type="text" placeholder="Add using a link .jpg" value={photoLink} onChange={e => setPhotoLink(e.target.value)} />
                <button onClick={addPhotoByLink} className="bg-gray-200 rounded-xl px-2">Add&nbsp;photo</button>
            </div>
            <div className="mt-3 gap-2 grid grid-cols-9 ">
                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div key={link} className='relative'>
                        <img className="h-48 w-48 rounded-xl object-cover" src={'http://localhost:4000/uploads/' + link} alt={link} />
                        <FontAwesomeIcon onClick={(e) => removePhoto(e,link)} icon={faTrash} className='absolute hover:bg-slate-50 bottom-4 right-4 bg-slate-50/50 p-1 rounded-full' />
                        {link === addedPhotos[0] && <FontAwesomeIcon onClick={(e) => selectMainPhoto(e,link)} icon={faStar} className='absolute bottom-4 left-4 bg-red-400 p-1 rounded-full' />}
                        {link !== addedPhotos[0] && <FontAwesomeIcon onClick={(e) => selectMainPhoto(e,link)} icon={faStar} className='absolute hover:bg-slate-50 bottom-4 left-4 bg-slate-50/50 p-1 rounded-full' />}
                    </div>
                ))}
                <label className="flex justify-center items-center border rounded-xl h-48 w-48 text-xl md:text-3xl">
                    <input type='file' multiple className="hidden" onChange={uploadPhoto} />
                    <FontAwesomeIcon className="mr-2" icon={faUpload} />Upload
                </label>
            </div>
        </>
    );
}