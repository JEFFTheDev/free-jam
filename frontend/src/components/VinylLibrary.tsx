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
        SongService.listALbums().then((albums) => {
            setAlbums(albums);
        });
    }, []);

    return <div className='w-full'>
        <div className="grid grid-cols-4 gap-6 content-center">
            {albums.map((album: any, i: number) => {
                return <div key={i} className="col-span-1 flex justify-center"><VinylCard
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
                <div className="text-lg">{album.title}</div>
                <div className="text-sm font-thin">{album.artist}</div>
            </div>
        </div>
    );
}

// function vinylBackground() {
//     return "http://127.0.0.1:9000/utilities/vinyl.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=BHCU40EIUNILEZLHW43X%2F20231009%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231009T093742Z&X-Amz-Expires=604800&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJCSENVNDBFSVVOSUxFWkxIVzQzWCIsImV4cCI6MTY5Njg4NjAwOSwicGFyZW50Ijoicm9vdCJ9.JaGEjI8GTanxRARUvcqDydc2v1VbARsbi3ltCpa9MnniHrzWq2ioUo2-KG328-YrAvZ--7Bzd-vw3ivv3onjeA&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=e7059e65bb392f9235eefb5f444909d82207e9652e247ed5a28dc94e9b1bcb14"
// }

// // TODO: add bucket url to env
// function albumCover(albumCoverId?: string) {
//     return "http://localhost:9000/album-covers/" + albumCoverId;
// }

// function genericVinylImage() {
//     return "http://localhost:9000/utilities/generic.jpg"
// }

// // function youtubeThumbnailFromVideoId(videoId: string) {
// //     return "https://img.youtube.com/vi/" + videoId + "/mqdefault.jpg";
// // }