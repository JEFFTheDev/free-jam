import { useEffect, useState } from 'react';
import { BucketService } from '../api/buckets.service';
import { Album } from '../api/song.service';

interface vinylPlayerProps {
    album: Album;
}

const songs = [
    "song1",
    "song2",
    "song3",
    "song4",
    "song5",
    "song6",
    "song7",
    "song8",
    "song9",
    "song10",
    "song11",
    "song12"
]

export function VinylPlayer({ album }: vinylPlayerProps) {

    const [wheelOffset, setWheelOffset] = useState(0);

    function wheelForward() {
        if (wheelOffset + 1 >= songs.length) {
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
        const x = Math.cos((Math.PI / songs.length) * (songIndex - wheelOffset)) * 15;
        const y = Math.sin((Math.PI / songs.length) * (songIndex - wheelOffset)) * 15;
        return `translate(${x}em, ${y}em)`;
    }

    return <div className='grid grid-cols-4 gap-4 grid-rows-2'>
        <div className='col-span-4'>
            <div className='w-fit mx-auto'>
                <div className="text-xl font-bold">Now Playing</div>
                <img className='aspect-square' src={BucketService.getAlbumCoverUrl(album.imageUrl)} />
                <div className="text-lg">{album.title}</div>
                <div className="text-sm font-thin">{album.artist}</div>
            </div>
        </div>
        <div className={'col-span-2 row-span-1'}>
            <button onClick={() => { wheelForward() }}>forward</button>
                <button onClick={() => { wheelBackward() }}>backward</button>
            {/* <img className='aspect-square w-2/4' /> */}
        </div>
        <div className='col-span-2 row-span-1 overflow-hidden'>
            <div className='mb-0'>
            <div className='relative'>
                {songs.map((song, i) => {
                    return <div key={song + i}
                        style={{ transform: songItemTranslation(i) }}
                        className={'text-white cursor-pointer absolute bg-red-400 p-4 rounded-md transform transition-transform duration-300 ease-in-out'}>{song}</div>
                })}
            </div>
            </div>
        </div>
    </div>
}