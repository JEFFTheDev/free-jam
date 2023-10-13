import { useEffect, useState } from 'react';
import { BucketService } from '../api/buckets.service';
import { Album, Song } from '../api/song.service';

interface vinylPlayerProps {
    onSongSelected(song: Song): void;
    album: Album;
}

export function VinylPlayer({ onSongSelected, album }: vinylPlayerProps) {

    const [wheelOffset, setWheelOffset] = useState(0);

    function wheelForward() {
        if (wheelOffset + 1 >= album.songs.length) {
            return;
        }
        console.log(wheelOffset + 1);
        setWheelOffset(wheelOffset + 1);
    }

    function wheelBackward() {
        if (wheelOffset - 1 < 0) {
            return;
        }
        console.log(wheelOffset - 1);
        setWheelOffset(wheelOffset - 1);
    }

    function songItemTranslation(songIndex: number) {
        const x = Math.cos((Math.PI / album.songs.length) * (songIndex - wheelOffset)) * 15;
        const y = Math.sin((Math.PI / album.songs.length) * (songIndex - wheelOffset)) * 15;
        return `translate(${x}em, ${y}em)`;
    }

    return <div className='grid grid-cols-3 m-auto w-3/4 h-2/4'>
        <div className='col-span-3'>
            <span className="uppercase text-2xl font-bold block">
                {album.title}
            </span>
            <span className="text-xl block">
                {album.artist}
            </span>
            <span className="text-sm block">
                {new Date(album.releaseDate).getFullYear()}
            </span>
        </div>
        <div className='col-span-2'>
            <div className='relative aspect-square rounded'>
                <img className="w-2/4 h-2/4 absolute inset-0 z-10"
                    src={BucketService.getAlbumCoverUrl(album.imageUrl)}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "generic-vinyl.jpg";
                    }} />
                <img className='w-2/4 h-2/4 absolute inset-0 z-0 translate-x-36' src="vinyl.png" />
            </div>
        </div>
        <div className='col-span-1'>
                <div className='m-auto text-center h-2/4 overflow-y-scroll'>
                    {album.songs.map((song, i) => {
                        return <div key={song.title}
                            // style={{ transform: songItemTranslation(i) }}
                            className={'text-white m-3 bg-gradient-to-r w-96 uppercase font-bold from-pink-500 to-yellow-500 p-4 rounded-md transform transition-transform duration-300 ease-in-out flex justify-between'}>
                            <span>{song.title}</span>
                            <button onClick={() => { onSongSelected(song) }}>Play</button>
                        </div>
                    })}
                </div>
        </div>
    </div>
}