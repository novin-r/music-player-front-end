import React, { useState } from 'react';
import { PassThrough } from 'stream';
import Player from './Player';
import './style.css';

function Footer({Song, songs, setSong, PlayNow, CurrentSong, player, isPlay, setIsPlay}) {
    const [isActive, setIsActive] = useState(true);

    const toggleClass = () => {
      setIsActive(!isActive);
    };
    const toggleClass_1 = () => {
      
    };
  
    return (
        <div className={isActive ? "home-footer-1" : "home-footer-2"} onClick={isActive ? toggleClass:toggleClass_1}>
            <Player Song={Song} songs={songs} setSong={setSong} PlayNow={PlayNow} CurrentSong={CurrentSong} player={player} isPlay={isPlay} setIsPlay={setIsPlay} isActive={isActive} setIsActive={setIsActive} />
        
        </div>
    );
  }
  
 
  
  export default Footer;