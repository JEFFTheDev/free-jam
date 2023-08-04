import * as React from 'react';
import { useEffect, useState } from 'react';
import { Song, SongService } from '../api/song.service';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

interface songOverviewProps {
    onSongSelected(title: string, artist: string): void;
}
export function SongLibrary({ onSongSelected }: songOverviewProps) {
    const [songs, setSongs] = useState<Song[]>([]);

    useEffect(() => {
        SongService.listSongs().then((songs) => {
            setSongs(songs);
        });
    }, []);

    function filterResults(s : string) {
    }

    return <div className='w-full'>
        <div className="p-5 m-auto w-full md:w-1/2 px-3">
            <input onInput={(ev) => {
                filterResults((ev.target as HTMLInputElement).value);
            }} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Song" />
        </div>
        <div className="grid grid-cols-4 content-center">
            {songs.map((song: any, i: number) => {
                return <div key={i} className="col-span-1 p-1"><SongCard
                    onSongSelected={onSongSelected}
                    artist={song.artist}
                    title={song.title}
                    videoId={song.videoId} />
                </div>
            })}
        </div>

    </div>
}

interface cardProps {
    onSongSelected(title: string, artist: string): void
    artist: string
    title: string
    videoId?: string
}

function SongCard({ onSongSelected, artist, title, videoId }: cardProps) {
    return (
        <div onClick={() => { onSongSelected(title, artist); }} className="h-full w-full rounded overflow-hidden shadow-lg cursor-pointer">
            <img className="w-full h-2/4" src={videoId ? youtubeThumbnailFromVideoId(videoId) : ""} alt="Music Video" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">
                    Song by: {artist}
                </p>
            </div>
        </div>
    );
}

function youtubeThumbnailFromVideoId(videoId: string) {
    return "https://img.youtube.com/vi/" + videoId + "/mqdefault.jpg";
}