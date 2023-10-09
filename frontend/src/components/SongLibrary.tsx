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

    return <div className='w-full'>
        <div className="grid grid-cols-4 gap-6 content-center">
            {songs.map((song: any, i: number) => {
                return <div key={i} className="col-span-1 flex justify-center"><SongCard
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
        <div onClick={() => { onSongSelected(title, artist); }} className="cursor-pointer w-2/4">
            <div className='transform transition-transform duration-300 ease-in-out group hover:rotate-3 hover:scale-110 aspect-square rounded shadow-lg '>
                <div className='relative w-full h-full'>
                    <img className="absolute inset-0 flex justify-center items-center z-10" src={videoId ? albumCover() : ""} alt="Music Video" />
                    <img className='transform transition-transform duration-300 ease-in-out group-hover:translate-x-24 translate-x-6 z-0' src={vinylBackground()} />
                </div>
            </div>
            <div className="text-center font-sans truncate mt-3">
                <div className="text-lg">{title}</div>
                <div className="text-sm font-thin">{artist}</div>
            </div>
        </div>
    );
}

function vinylBackground() {
    return "http://127.0.0.1:9000/utilities/vinyl.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=BHCU40EIUNILEZLHW43X%2F20231009%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231009T093742Z&X-Amz-Expires=604800&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJCSENVNDBFSVVOSUxFWkxIVzQzWCIsImV4cCI6MTY5Njg4NjAwOSwicGFyZW50Ijoicm9vdCJ9.JaGEjI8GTanxRARUvcqDydc2v1VbARsbi3ltCpa9MnniHrzWq2ioUo2-KG328-YrAvZ--7Bzd-vw3ivv3onjeA&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=e7059e65bb392f9235eefb5f444909d82207e9652e247ed5a28dc94e9b1bcb14"
}

function albumCover() {
    return "http://127.0.0.1:9000/album-covers/61ZFtaZZXyL._UF1000%2C1000_QL80_.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=BHCU40EIUNILEZLHW43X%2F20231009%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231009T091440Z&X-Amz-Expires=604800&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJCSENVNDBFSVVOSUxFWkxIVzQzWCIsImV4cCI6MTY5Njg4NjAwOSwicGFyZW50Ijoicm9vdCJ9.JaGEjI8GTanxRARUvcqDydc2v1VbARsbi3ltCpa9MnniHrzWq2ioUo2-KG328-YrAvZ--7Bzd-vw3ivv3onjeA&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=ef33cac2d04d0fd4a05a515f83079f61b31be5cb95f4ad35ac8d9fb71e5eac42";
}

function youtubeThumbnailFromVideoId(videoId: string) {
    return "https://img.youtube.com/vi/" + videoId + "/mqdefault.jpg";
}