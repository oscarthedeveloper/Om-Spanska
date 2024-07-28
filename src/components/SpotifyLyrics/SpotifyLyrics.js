import React from 'react';
import styles from './SpotifyLyrics.module.css';

const SpotifyLyrics = ({ songTitle, artistName, lyrics }) => {
  return (
    <div className={styles.spotifyLyricsContainer}>
      <div className={styles.playerInterface}>
        <div className={styles.controls}>
          <div className={styles.close}></div>
          <div className={styles.minimize}></div>
          <div className={styles.maximize}></div>
        </div>
        <div className={styles.songInfo}>
          <div className={styles.songTitle}>{songTitle}</div>
          <div className={styles.artistName}>{artistName}</div>
        </div>
      </div>
      <div className={styles.lyricsContainer}>
        {lyrics.map((line, index) => (
          <p key={index} className={styles.lyricLine}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SpotifyLyrics;
