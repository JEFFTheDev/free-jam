import * as React from 'react';
import { useEffect, useState } from 'react';
import { Album, Song, SongService } from '../api/song.service';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { BucketService } from '../api/buckets.service';

interface vinylOverviewProps {
    onVinylSelected(album: Album): void;
}
export function VinylLibrary({ onVinylSelected: onVinylSelected }: vinylOverviewProps) {
    const [albums, setAlbums] = useState<Album[]>([]);

    useEffect(() => {
        SongService.listAlbums().then((albums) => {
            setAlbums(albums);
        });
    }, []);

    return <div className='w-full'>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 content-center">
            {albums.map((album: any, i: number) => {
                return <div key={i} className="col-span-1"><VinylCard
                    onVinylSelected={onVinylSelected}
                    album={album} />
                </div>
            })}
        </div>

    </div>
}

interface cardProps {
    onVinylSelected(album: Album): void
    album: Album;
}

function VinylCard({ onVinylSelected: onVinylSelected, album }: cardProps) {
    return (
        <div onClick={() => { onVinylSelected(album); }} className="cursor-pointer w-2/4">
            <div className='relative transform transition-transform duration-300 ease-in-out group hover:rotate-3 hover:scale-110 aspect-square rounded'>
                <img className="w-full h-full absolute inset-0 flex justify-center items-center z-10"
                    src={BucketService.getAlbumCoverUrl(album.imageUrl)}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "generic-vinyl.jpg";
                    }} />
                <img className='w-full h-full transform transition-transform duration-300 ease-in-out group-hover:translate-x-24 translate-x-6 z-0' src="vinyl.png" />
            </div>
            <div className="text-center font-sans truncate mt-3">
                <div className="text-lg text-white">{album.title}</div>
                <div className="text-sm font-thin text-quaternary">{album.artist}</div>
            </div>
        </div>
    );
}