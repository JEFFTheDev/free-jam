import * as React from 'react';
import { useEffect, useState } from 'react';
import { Song, SongService } from '../api/song.service';

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

    return <div className='w-full'>
        <div className="grid grid-flow-row-dense grid-cols-8">
            {songs.map((song: any, i: number) => {
                return <div key={i} className="col-span-2 p-1"><SongCard
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
        <div onClick={() => { onSongSelected(title, artist); }} className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer">
            <img className="w-full" src={videoId ? youtubeThumbnailFromVideoId(videoId) : ""} alt="Sunset in the mountains" />
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