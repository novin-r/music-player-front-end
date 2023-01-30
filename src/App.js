import React, { useState,useRef } from "react";
import "./assets/App.css";
import {BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Components/views/Login"
import Register from "./Components/views/Register"
import Home from "./Components/views/Home"
import AddSong from "./Components/views/AddSong"
import UpdateMusic from "./Components/views/UpdateMusic"

import axios from 'axios'
import Songs from "./Components/Songs";
import MainPlayer from "./Components/MainPlayer";
import Player from "./Components/Player";

axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
});

const player = new Audio();

function App() {
    const PlaylistSongs = useRef({});

    //index of music    
    const [Song, setSong] = useState(0);
    const [isPlay,setIsPlay] = useState(false);
    //Array of all music
    const [songs, setSongs] = useState([]);

    const [CurrentSong, setCurrentSong] = useState({
        name: '',
        id: '',
        hash_key: '',
        album: '',
        album_artist: '',
        length: '',
        current_length: '',
        image: '',
        size: '',
        playedTime: 0,
        song: '',
    });


    const PlayNow = (index) => {
        let songData = PlaylistSongs.current[index].dataset;

        let allList = document.querySelectorAll('.playlist-list-content li');
        for (let x = 0; x < allList.length; x++)
            allList[x].style.backgroundColor = "transparent";

        PlaylistSongs.current[index].style.background = '#4b4b8963'

        setCurrentSong({
            ...CurrentSong,
            name: document.querySelectorAll('.playlist-list-content li')[index].childNodes[1].childNodes[0].textContent,
            album_artist: document.querySelectorAll('.playlist-list-content li')[index].childNodes[1].childNodes[1].textContent,
            length: document.querySelectorAll('.playlist-list-content li')[index].childNodes[2].textContent,
            image: songData.image,
        });
        setSong(index);
        //Add music src  
        player.src="http://localhost:8000"+songs[index].hash_key;
        player.play();
        setIsPlay(true);
    }


    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route exact path="/songs" element={<MainPlayer PlaylistSongs={PlaylistSongs} songs={songs} setSongs={setSongs} PlayNow={PlayNow} setCurrentSong={setCurrentSong} />}/>

                        <Route path="/login" element={localStorage.getItem('auth_token') ? <Navigate to='/'/>  : <Login/> }/>
                        <Route path="/register" element={localStorage.getItem('auth_token') ? <Navigate to='/'/>  : <Register/> }/>
                        <Route path="/song/create" element={localStorage.getItem('auth_token') ? <AddSong/> : <Navigate to='login'/>  }/>
                    </Routes>
                <Footer Song={Song} songs={songs} setSong={setSong} PlayNow={PlayNow} CurrentSong={CurrentSong} player={player} isPlay={isPlay} setIsPlay={setIsPlay}/>
            </BrowserRouter>

        </div>
    );
}

export default App;
