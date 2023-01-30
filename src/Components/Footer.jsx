import React from 'react';
import Player from './Player';
import './style.css';

function Footer({Song, songs, setSong, PlayNow, CurrentSong, player, isPlay, setIsPlay}) {

  
    return (
        <div className="home-footer">
            <Player Song={Song} songs={songs} setSong={setSong} PlayNow={PlayNow} CurrentSong={CurrentSong} player={player} isPlay={isPlay} setIsPlay={setIsPlay} />
        
        </div>
    );
  }
  
 
  
  export default Footer;