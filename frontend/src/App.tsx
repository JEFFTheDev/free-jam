import React, { useState } from 'react';
import { SongLibrary } from './components/SongLibrary';
import { SongProfilePlayer } from './components/SongProfilePlayer';

function App() {

  interface selectedSong {
    artist: string;
    title: string;
  }

  const [currentView, setCurrentView] = useState<string>("SongLibrary");
  const [currentSong, setCurrentSong] = useState<selectedSong>();

  function view() {
    switch (currentView) {
      case "SongLibrary":
        return <SongLibrary onSongSelected={(title: string, artist: string) => {
          setCurrentSong({
            artist: artist,
            title: title
          });
          setCurrentView("SongProfilePlayer");
        }} />
      case "SongProfilePlayer":
        if (!currentSong) {
          return <p>no song</p>
        }
        return <SongProfilePlayer artist={currentSong.artist} title={currentSong.title} />
    }
  }

  return (
    <div className="App w-full h-full">
      {view()}
    </div>
  );
}

export default App;
