import { useEffect, useState } from 'react';
import { BucketService } from '../api/buckets.service';
import { Album, GuitarChord, Song } from '../api/song.service';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { ChordService } from '../api/chord.service';
import { Chord } from './Chord';
import { shapeToFrets } from '../utils/utils';
import { VinylCard } from './VinylCard';
import { SongProfilePlayer } from './SongProfilePlayer';
import { SongTimeline } from './SongTimeline';

interface songProfileEditorProps {

}

export function SongProfileEditor({ }: songProfileEditorProps) {

    const album = {
        title: "something",
        artist: "Nirvana",
        releaseDate: "17-10-2023",
        imageUrl: "non-exist",
        songs: []
    };

    const song = {
        title: "About a Girl",
        videoId: "t_U5ZIo77UM",
    };

    const triggerRefreshChordsAfterMs = 250;
    const [chordsFiltered, setChordsFiltered] = useState<GuitarChord[]>([]);
    const [refreshChordsTimer, setRefreshChordsTimer] = useState<NodeJS.Timeout>();
    const [videoDurationSeconds, setVideoDurationSeconds] = useState<number>(0);

    function onFilterChange(newFilter: string) {
        if (refreshChordsTimer) {
            clearTimeout(refreshChordsTimer);
        }

        setRefreshChordsTimer(setTimeout(() => {
            console.log(triggerRefreshChordsAfterMs, 'passed, refreshing with filter', newFilter);
            ChordService.listChords(newFilter).then(setChordsFiltered);
        }, triggerRefreshChordsAfterMs));
    }

    return <div className='grid grid-cols-4'>
        <div className='col-span-2'>
            <VinylCard onVinylSelected={() => { }} album={album} />
        </div>
        <div className='col-span-2'>
            <SongProfilePlayer onLoaded={(e) => { setVideoDurationSeconds(e.target.getDuration()) }} className='w-full h-full' album={album} song={song} />
        </div>
        <div className='col-span4'>
            <SongTimeline
                videoDurationSeconds={videoDurationSeconds}
            album={{
                artist: "Nirvana",
                imageUrl: "",
                releaseDate: "",
                songs: [],
                title: "Bleach"
            }} song={{
                title: "About a Girl",
            }} />
        </div>
        <div className='col-span-4'>
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input onChange={(evt) => { onFilterChange(evt.target.value) }} type="search" id="default-search" className="block w-48 rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="Search Chords..." required />
            </div>
        </div>
        <div className='col-span-4'>
            <div className='flex w-full overflow-x-auto'>
                {chordsFiltered.map((c) =>
                    <div className='flex-none w-48'>
                        <p className="text-center text-white">{c.name}</p>
                        <Chord barres={[]} capo={false} fingers={[0, 0, 0, 0, 0, 0]} frets={shapeToFrets(c.shape)} />
                    </div>)}
            </div>
        </div>
    </div>
}