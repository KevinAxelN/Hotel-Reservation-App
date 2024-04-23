import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";

export default function PlacesPage() {
    const {action} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuest, setMaxGuest] = useState(1);

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }

    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }

    function preInput(header, description) {
        return (
            <div>
                {inputHeader(header)}
                {inputDescription(description)}
            </div>
        );
    }

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link', {link: photoLink});
        setAddedPhotos (prev => {
            return [...prev, filename];
        });
        setPhotoLink('');
    }

    // bisa pake async (di func) await (di axios post), bisa juga pake then
    function uploadPhoto(ev) {
        const files = ev.target.files;
        console.log({files});
        // const data = new FormData();
        // for (let i = 0; i < files.length; i++) {
        //     data.append('photos', files[i]);
        // }
        // axios.post('/upload', data, {
        //     headers: {'Content-type':'multipart/form-data'}
        // }).then(response => {
        //     const {data:filenames} = response;
        //     setAddedPhotos (prev => {
        //         return [...prev, ...filenames];
        //     });
        // });
    }

    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        {preInput('Title', 'Title for your Hotel\'s name')}
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, example: King's Hotel" />

                        {preInput('Address', 'Address to this place')}
                        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address"/>

                        {preInput('Photos', 'More photos = better')}
                        <div className="flex gap-2">
                            <input  value={photoLink}
                                    onChange={ev => setPhotoLink(ev.target.value)} 
                                    type="text" placeholder={'add using a link .... jpg'}/>
                            <button onClick={addPhotoByLink} className="text-lg text-white bg-gray-400 px-4 rounded-2xl">Add&nbsp;Photo</button>
                        </div>


                        <div className="gap-2 mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {addedPhotos.length > 0 && addedPhotos.map(link => 
                                <div>
                                    <img className="rounded-2xl" src={'http://localhost:4000/uploads/' + link} alt="" />
                                </div>
                                // http://localhost:4000/uploads/photo1713268124229.jpg
                            )}
                            <label className="cursor-pointer flex items-center justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                                <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                                
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-1 w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                </svg>      
                                Upload    
                            </label>    
                        </div>

                        {preInput('Description', 'Description for the hotel')}
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)}/>

                        {preInput('Perks', 'All the perks of your hotel')}
                        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                            <Perks selected={perks} onChange={ev => setPerks(ev.target.value)}/>
                        </div>

                        {preInput('Extra info', 'rules, etc.')}
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>

                        {preInput('Check-in & Check-out times', 'add check-in and check-out times, remember to have some time window for cleaning the room before the next guest')}
                        <div className="grid gap-2 sm:grid-cols-3">
                            <div className="mt-2 -mb-1">
                                <h3>Check in time</h3>
                                <input  type="text"  
                                        value={checkIn} 
                                        onChange={ev => setCheckIn(ev.target.value)} placeholder="example: 12.00"/>
                            </div>
                            <div className="mt-2 -mb-1">
                                <h3>Check out time</h3>
                                <input  type="text"  
                                        value={checkOut}
                                        onChange={ev => setCheckOut(ev.target.value)} placeholder="example: 14.00"/>
                            </div>
                            <div className="mt-2 -mb-1">
                                <h3>Max number of guests</h3>
                                <input  type="number"  
                                        value={maxGuest}
                                        onChange={ev => setMaxGuest(ev.target.value)} placeholder="example: 6 people"/>
                            </div>
                        </div>
                        <button className="primary my-4">Save</button>

                    </form>
                </div>
            )}
        </div>
    );
}