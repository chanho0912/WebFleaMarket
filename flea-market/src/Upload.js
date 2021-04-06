import React, { useState } from 'react';
import './Upload.css';
import Logo from './images/logo.jpg';
import { Link, useHistory } from 'react-router-dom';
import {firebaseApp} from "./firebase";
import results from "./result"

function Upload() {

    const history = useHistory();
    const storage= firebaseApp.storage();
    const realtimedb = firebaseApp.database();

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [title, setTitle] = useState(null);
    const [price, setPrice] = useState(null);
    const [start_price, setStartPrice] = useState(null);
    const [info, setInfo] = useState(null);
    const [trading_place, setTradingPlace] = useState(null);
    const [phone_number, setPhoneNumber] = useState(null);

    const handleChange = e => {
        e.preventDefault();
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = e => {
        e.preventDefault();
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    console.log("download url success");
                    setUrl(url)
                    var newPostKey = realtimedb.ref().child('posts').push().key;

                    var postData = {
                        postKey: newPostKey, 
                        u_id: firebaseApp.auth().currentUser.email,
                        title: title,
                        info: info,
                        price: price,
                        auction_price: start_price,
                        trading_place: trading_place,
                        image: url,
                        phone_number: phone_number,
                        highest_user: firebaseApp.auth().currentUser.email,
                        count: 0
                    }

                    var updates = {};
                    updates['/posts/' + newPostKey] = postData;
                    realtimedb.ref().update(updates).then(console.log("download url success"));

                    
                    history.push("/");
                });
            }
        )
        
    };

    return (
        <div className="upload">
            <Link to='/'>
                <img
                className="upload__logo" 
                src={Logo}/>
            </Link>
            <div className='upload__container'>
                <form>
                    <center><h1>Upload Product</h1></center>
                    
                    <h5>Title</h5>
                    <input type='text' value={title} onChange={e => setTitle(e.target.value)}/>

                    <h5>Info</h5>
                    <input type='textarea' value={info} onChange={e => setInfo(e.target.value)}/>
                    
                    <h5>Image</h5>
                    <input type='file' onChange={handleChange} accept="images/*" />
                    
                    <h5>Hope Price</h5>
                    <input type='text' value={price} onChange={e => setPrice(e.target.value)}/>
                    
                    <h5>Start Price</h5>
                    <input type='text' value={start_price} onChange={e => setStartPrice(e.target.value)}/>
                
                    <h5>Trading Place</h5>
                    <input type='text' value={trading_place} onChange={e => setTradingPlace(e.target.value)}/>
                    
                    <h5>Phone Number</h5>
                    <input type='text' value={phone_number} onChange={e => setPhoneNumber(e.target.value)}/>
                    
                    <button type='submit' 
                    className='upload__Button' onClick={handleUpload}>Upload</button>
                </form>
            </div>
        </div>
    )
}

export default Upload
