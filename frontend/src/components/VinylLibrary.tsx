import * as React from 'react';
import { useEffect, useState } from 'react';
import { Album, Song, SongService } from '../api/song.service';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { BucketService } from '../api/buckets.service';
import { VinylCard } from './VinylCard';

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