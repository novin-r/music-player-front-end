import React, { useState } from 'react';
import Player from './Player';
import './style.css';

function Footer({Song, songs, setSong, PlayNow, CurrentSong, player, isPlay, setIsPlay}) {
    const [isActive, setIsActive] = useState(true);

    const toggleClass = () => {
      setIsActive(!isActive);
    };
  
    return (
        <div className={isActive ? "home-footer-mobile" : "home-footer-browser"} onClick={toggleClass}>
            <Player Song={Song} songs={songs} setSong={setSong} PlayNow={PlayNow} CurrentSong={CurrentSong} player={player} isPlay={isPlay} setIsPlay={setIsPlay} isActive={isActive} />
        
        </div>
    );
  }
  
 
  
  export default Footer;