import React, { useState } from 'react';
import { VinylLibrary } from './components/VinylLibrary';
import { SongProfilePlayer } from './components/SongProfilePlayer';
import { VinylPlayer } from './components/VinylPlayer';
import { Album } from './api/song.service';

function App() {

  const [currentView, setCurrentView] = useState<string>("VinylLibrary");
  const [currentAlbum, setCurrentAlbum] = useState<Album>();

  function view() {
    switch (currentView) {
      case "VinylLibrary":
        return withNavigation(<VinylLibrary onVinylSelected={(album : Album) => {
          setCurrentAlbum(album);
          setCurrentView("VinylPlayer");
        }} />)
      case "VinylPlayer":
        if (!currentAlbum) {
          return <p>no album selected</p>
        }
        return withNavigation(<VinylPlayer album={currentAlbum!} />)
      case "SongProfilePlayer":
        if (!currentAlbum) {
          return <p>no song</p>
        }
        return <SongProfilePlayer artist={currentAlbum.artist} title={currentAlbum.title} />
    }
  }

  function withNavigation(el: JSX.Element): JSX.Element {
    return el
  }

  return (
    <div style={{ backgroundColor: "#eaeaea" }} className="App w-full h-full p-6">
      {/* <p>Hello there</p>
      <div className='flex justify-center'>
        <div className='w-1/12'>
          <img src='logo.png' />
        </div>
      </div> */}
      {view()}
    </div>
  );
}

export default App;
