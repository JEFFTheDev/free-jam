import React, { useState } from 'react';
import { VinylLibrary } from './components/VinylLibrary';
import { SongProfilePlayer } from './components/SongProfilePlayer';
import { VinylPlayer } from './components/VinylPlayer';
import { Album, Song } from './api/song.service';
import BeakerIcon from '@heroicons/react/24/solid/BeakerIcon';
import { Cog6ToothIcon, GlobeAltIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { SongProfileEditor } from './components/SongProfileEditor';
import { SongTimeline } from './components/SongTimeline';

function App() {

  const [currentView, setCurrentView] = useState<string>("VinylLibrary");
  const [currentAlbum, setCurrentAlbum] = useState<Album>();
  const [currentSong, setCurrentSong] = useState<Song>();

  function view() {
  //   return withNavigation( <SongTimeline
  //     videoDurationSeconds={30}
  //     album={{
  //     artist: "Pixies",
  //     imageUrl: "",
  //     releaseDate: "",
  //     songs: [],
  //     title: "Doolittle"
  // }} song={{
  //     title: "Debaser",
  // }} />); 
    switch (currentView) {
      case "VinylLibrary":
        return withNavigation(<VinylLibrary onVinylSelected={(album: Album) => {
          setCurrentAlbum(album);
          setCurrentView("VinylPlayer");
        }} />)
      case "VinylPlayer":
        if (!currentAlbum) {
          return <p>no album selected</p>
        }
        return withNavigation(<VinylPlayer onSongSelected={(song: Song) => {
          setCurrentSong(song);
          setCurrentView("SongProfilePlayer");
        }} album={currentAlbum!} />)
      case "SongProfileEditor":
        return withNavigation(<SongProfileEditor />)
      case "SongProfilePlayer":
        if (!currentSong || !currentAlbum) {
          return <p>no song or album</p>
        }
        return <SongProfilePlayer onLoaded={(e) => {}} className='h-screen w-screen' album={currentAlbum} song={currentSong} />
    }
  }

  function withNavigation(el: JSX.Element): JSX.Element {
    return <div className='bg-primary w-screen h-screen flex justify-start'>
      <div className="top-0 left-0 z-40 h-screen w-60" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-primary">
          <ul className="space-y-2 font-medium">
            <li>
              <img className='w-full' src='logo.png' />
            </li>
            <li>
              <a onClick={() => { setCurrentView("VinylLibrary") }} className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <GlobeAltIcon className="h-6 w-6 text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">Discover</span>
              </a>
            </li>
            <li>
              <a onClick={() => { setCurrentView("SongProfileEditor") }} className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <PencilSquareIcon className="h-6 w-6 text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">Editor</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <Cog6ToothIcon className="h-6 w-6 text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">Settings</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className='w-px bg-secondary'></div>
      {/* <p>Hello there</p>
    <div className='flex justify-center'>
      <div className='w-1/12'>
        <img src='logo.png' />
      </div>
    </div> */}
      <div className='p-6'>
        <div className='text-white lg:text-6xl md:text-4xl sm:text-2xl uppercase font-bold mb-6'>{currentView}</div>
        {el}
      </div>
    </div>
  }

  return (
    <div className="App">
      {view()}
    </div>
  );
}

export default App;
