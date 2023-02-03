import React, { useEffect, useState } from "react";
import DefaultImg from "../assets/img/default.jpg";
import LinearProgress from "@material-ui/core/LinearProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import styles from "./Progress.module.css";

import {
  faStop,
  faStepForward,
  faVolumeDown,
  faStepBackward,
  faVolumeOff,
  faVolumeMute,
  faVolumeUp,
  faPause,
  faPlay
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";

library.add(
  faStop,
  faStepForward,
  faVolumeDown,
  faStepBackward,
  faVolumeOff,
  faVolumeMute,
  faVolumeUp,
  faPause,
  faPlay
);

export default function Player({Song, songs, setSong, PlayNow, CurrentSong, player, isPlay, setIsPlay, isActive, setIsActive}) {
  const [loading, setLoading] = useState(true);
  const [PlayerSettings, setPlayer] = useState({
    playing: true,
    volume: 0.5,
    current_length: 0,
    duration: 0,
    volume_bar: true,
  });
  const [playerCurrentTime, setPlayerCurrentTime] = useState(
    player.currentTime
  );
  const [progressBar, setProgressBar] = useState(0);

  useEffect(() => {
    const updateProgressBar = setInterval(() => {
      setProgressBar((player.currentTime / player.duration) * 100);
    }, 1000);
  
    return () => clearInterval(updateProgressBar);
  }, [player]);

  function playSong() {
    setIsPlay(true);
    var playPromise = player.play();

    if (playPromise !== undefined) {
      playPromise
        .then(function () {})
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const toggleClass = () => {
    setIsActive(!isActive);
  };

  function spolaMusic(e) {
    // player.currentTime = parseInt(e.target.value);
    // setPlayerCurrentTime(parseInt(e.target.value));
    // player.oncanplay = function() {
    // player.currentTime = parseInt(e.target.value);
    // };
  }

  function pauseSong() {
    player.pause();
    setIsPlay(false);
  }

  function prevSong() {
    setSong(Song--);
    PlayNow(Song);
  }

  function nextSong() {
    setSong(Song++);
    PlayNow(Song);
  }

  function reSong() {
    // player.currentTime = 0
  }

  function toggleVolume() {
    if (PlayerSettings.volume === 1) {
      player.muted = true;
      setPlayer({ ...PlayerSettings, volume: 0 });
      // console.log("FIRST CONDITION" + player.volume)
    } else {
      player.muted = false;
      setPlayer({ ...PlayerSettings, volume: 1 });
      // console.log("SECOND CONDITION" + player.volume)
    }
  }

  function convertTime(time) {
    var mins = Math.floor(time / 60);
    if (mins < 10) {
      mins = "0" + String(mins);
    }
    var secs = Math.floor(time % 60);
    if (secs < 10) {
      secs = "0" + String(secs);
    }

    return mins + ":" + secs;
  }

  function handleVolume(e) {
    setPlayer({ ...PlayerSettings, volume: e.target.value / 100 });
    player.volume = PlayerSettings.volume;
  }

  let playAndPauseButton = () => {
    return (
      <span className={isActive ?styles.playAndPause_1:styles.playAndPause_2 } onClick={event =>{ event.stopPropagation();}}  >
        {" "}
        {isPlay ? (
          <FontAwesomeIcon onClick={pauseSong} icon="pause" />
        ) : (
          <FontAwesomeIcon onClick={playSong} icon="play" />
        )}{" "}
      </span>
    );
  };

  useEffect(() => {
    setLoading(false);
  }, []);

    useEffect(() => {
      setPlayerCurrentTime(player.currentTime);
    }, [player.currentTime]);

  if (loading) {
    return (
      <div className="col-6 p-0">
        <div className="main-player p-2 ">
          <LinearProgress />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.main_player}  >
        <div className={isActive ?styles.whiteLine_1:styles.whiteLine_2} onClick={event =>{ event.stopPropagation(); setIsActive(!isActive);}} ></div>
        <section className={isActive ? styles.music_info_sec_1:styles.music_info_sec_2}>
          <div className={isActive ?styles.music_image_1:styles.music_image_2}>
            <img
              src={
                CurrentSong.image
                  ? `http://localhost:8000` + CurrentSong.image
                  : DefaultImg
              }
              alt=""
            />
          </div>
          <div className={isActive ? styles.music_info_1: styles.music_info_2 }>
            <h6 className="m-0">{CurrentSong.name.replace(/\.[^/.]+$/, "")}</h6>
            <p>{CurrentSong.album_artist}</p>
          </div>
        </section>
        <section className={styles.music_progress_bar}>
          <div className="music-progress">
            <span className={isActive ? styles.playerCurrentTime_1:styles.playerCurrentTime_2} >{convertTime(playerCurrentTime)}</span>
            <span className={styles.rangeSection}>
              <div className={styles.range}>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progressBar}
                  className={isActive ? styles.slider_1 : styles.slider_2 }
                  id="myRange"
                  onClick={event =>{ event.stopPropagation();}}
                  onChange={(e) => {
                    spolaMusic(e);
                    setProgressBar(e.target.value);
                  }}
                />
              </div>
            </span>
            <span className={isActive ?styles.currentSong_length_1:styles.currentSong_length_2} >{CurrentSong.length.replace(/\.[^/.]+$/, "")}</span>
          </div>
          <div className={isActive ?"":styles.player_buttons}>
            {isActive?"":
              <span>
                <FontAwesomeIcon icon="step-backward" onClick={prevSong} />
              </span>
            }
            {playAndPauseButton()}
            {isActive?"":
              <span>
                <FontAwesomeIcon icon="step-forward" onClick={nextSong} />
              </span>
            }
            <span className={`${styles.VRange} ${styles.range} ${isActive?"":styles.VRange_1} `}>
              <input
                type="range"
                min="1"
                max="100"
                value={PlayerSettings.volume * 100}
                className={styles.volymRange}
                onChange={handleVolume}
                onClick={event =>{ event.stopPropagation();}}
              />
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
