import * as React from 'react';
import { BucketService } from '../api/buckets.service';
import { Album } from '../api/song.service';

interface cardProps {
    onVinylSelected(album: Album): void
    album: Album;
}

export function VinylCard({ onVinylSelected: onVinylSelected, album }: cardProps) {
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