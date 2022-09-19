import React, {useEffect, useState} from "react";
import DefaultImg from '../assets/img/default.jpg'
import Box from '@mui/material/Box';
import LinearProgress from "@material-ui/core/LinearProgress";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import styles from "./Progress.module.css";

import {
    faList,
    faStop,
    faStepForward,
    faStepBackward,
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faUndoAlt,
    faVolumeOff,
    faVolumeMute,
    faVolumeDown,
    faVolumeUp,
    faCompactDisc,
    faPause,
    faPlay
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import './style.css';

library.add(faList, faStop, faAngleDoubleLeft, faAngleDoubleRight, faStepForward, faVolumeDown, faStepBackward, faUndoAlt, faVolumeOff, faVolumeMute, faVolumeUp, faCompactDisc, faPause, faPlay);

export default function Player({Song,songs, setSong, CurrentSong,player, isPlay, setIsPlay}) {
    const [loading, setLoading] = useState(true);
    const [PlayerSettings, setPlayer] = useState({
        playing: true,
        volume: 0.5,
        current_length: 0,
        duration: 0,
        volume_bar: true
    });
    const [playerCurrentTime, setPlayerCurrentTime] = useState();
    const [progressBar, setProgressBar] = useState(0);

    const skipTrackHandler = async (direction) => {
        await console.log("Ok");
    };

    function playSong() {
        setIsPlay(true);
        var playPromise = player.play();

        if (playPromise !== undefined) {
            playPromise.then(function () {
            }).catch(function (error) {
                console.log(error)
            });
        }
    }

    function stopSong() {
        // player.pause()
        // player.currentTime = 0
    }

    function spolaMusic(e) {
        player.currentTime = parseInt(e.target.value);
        // setPlayerCurrentTime(parseInt(e.target.value));
        // player.oncanplay = function() {
            // player.currentTime = parseInt(e.target.value);
        // };
    }

    function pauseSong() {
        player.pause()
        setIsPlay(false);
    }

    function prevSong() {
        setSong(Song--);  
        player.src="http://localhost:8000"+songs[Song].hash_key;
        var playPromise = player.play()
        if (playPromise !== undefined) {
            playPromise.then(function () {
            }).catch(function (error) {
                console.log(error)
            });
        }
    }
    
    function nextSong() {
        setSong(Song++);
        player.src="http://localhost:8000"+songs[Song].hash_key;
        var playPromise = player.play()
        if (playPromise !== undefined) {
            playPromise.then(function () {
            }).catch(function (error) {
                console.log(error)
            });
        }
    }

    function AddSeconds() {
        player.currentTime += 10;
    }

    function RemoveSeconds() {
        player.currentTime -= 10
    }

    function reSong() {
        // player.currentTime = 0
    }

    function toggleVolume() {
        if (PlayerSettings.volume === 1) {
            player.muted = true;
            setPlayer({...PlayerSettings, volume: 0});
            // console.log("FIRST CONDITION" + player.volume)
        } else {
            player.muted = false;
            setPlayer({...PlayerSettings, volume: 1});
            // console.log("SECOND CONDITION" + player.volume)
        }
    }

    function convertTime(time) {
        var mins = Math.floor(time / 60);
        if (mins < 10) {
            mins = '0' + String(mins);
        }
        var secs = Math.floor(time % 60);
        if (secs < 10) {
            secs = '0' + String(secs);
        }

        return mins + ':' + secs;
    }

    // function showVolume() {
    //     if (PlayerSettings.volume_bar) {
    //         setPlayer({...PlayerSettings, volume_bar: false})
    //     } else {
    //         setPlayer({...PlayerSettings, volume_bar: true})
    //     }
    // }

    function handleVolume(e) {
        setPlayer({...PlayerSettings, volume: e.target.value / 100})
        player.volume = PlayerSettings.volume
    }

    let playAndPauseButton = () =>{
        return(
            <span> {isPlay?<FontAwesomeIcon onClick={pauseSong} icon="pause"/>:<FontAwesomeIcon onClick={playSong} icon="play"/>} </span>
        )
    }

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return (<div className="col-6 p-0">
            <div className="main-player p-2 ">
                    <LinearProgress/>
            </div>
        </div>)
    }

    return (
        <div>
            <div className="main-player p-2">
                <section className={styles.music_info_sec}>
                    <div className={styles.music_image}>
                        <img src={CurrentSong.image ? `http://localhost:8000` + CurrentSong.image : DefaultImg} alt="" />
                    </div>
                    <div className={styles.music_info}>
                        <h5 className="m-0">{CurrentSong.name.replace(/\.[^/.]+$/, "")}</h5>
                        <p>{CurrentSong.album_artist}</p>
                    </div>
                </section>
                <section>
                    <div className="music-progress">
                        <span>
                            {convertTime(PlayerSettings.current_length)}
                        </span>
                    <span style={{width: "65%"}}>
                    <div className={styles.range}>
                        <input type="range" min="1" max="100" value={progressBar}  className={styles.slider} id="myRange" 
                            onChange={(e)=>{ spolaMusic(e);}}
                            // onMouseUp={props.onMouseUp}
                            // onTouchEnd={props.onTouchEnd}
                        />
                    </div>

                   
                        {/* <div className="track-progress">
                       
                            <div className="track-child"
                                 style={{width: CurrentSong.length.replace(/\.[^/.]+$/, "").split(':').reduce((acc,time) => (60 * acc) + +time) / PlayerSettings.duration * 100 + '%'}}></div>
                        </div> */}
                    </span>
                    <span>
                            {CurrentSong.length.replace(/\.[^/.]+$/, "")}
                        </span>
                    </div>
                    <div className="player-buttons">
                        <span><FontAwesomeIcon icon="step-backward" onClick={prevSong} /></span>
                        {playAndPauseButton()}
                        <span><FontAwesomeIcon icon="step-forward" onClick={nextSong} /></span>
                        <span  className={`VRange ${styles.range}`}>
                                <input type="range" min="1" max="100" value={PlayerSettings.volume * 100} 
                                className={styles.volymRange}
                                onChange={handleVolume}
                                />
                        </span>
                    </div>
                </section>
           
              
            </div>
        </div>
);
}