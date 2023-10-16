import { useEffect, useState } from 'react';
import { BucketService } from '../api/buckets.service';
import { Album, GuitarChord, Song } from '../api/song.service';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { ChordService } from '../api/chord.service';
import { Chord } from './Chord';
import { shapeToFrets } from '../utils/utils';

interface songProfileEditorProps {

}

export function SongProfileEditor({ }: songProfileEditorProps) {

    const [chordsFiltered, setChordsFiltered] = useState<GuitarChord[]>([]);

    function onFilterChange(newFilter : string) {
        console.log(newFilter);
        ChordService.listChords(newFilter).then(setChordsFiltered);
    }

    return <div className='grid grid-rows-3'>
        <div className='col-span-3'>
        </div>
        <div className='col-span-3'>
        </div>
        <div className='col-span-3'>
            <div className="relative text-gray-600 focus-within:text-gray-400">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon />
                </span>
                <input onChange={(evt) => onFilterChange(evt.target.value)} className="py-2 pl-10 pr-4 rounded-full w-full border-2 border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:outline-none" type="text" placeholder="Search..." />
            </div>
            <div>
                {chordsFiltered.map((c) => <Chord barres={[]} capo={false} fingers={[0, 0, 0, 0, 0, 0]} frets={shapeToFrets(c.shape)} />)}
            </div>

        </div>
    </div>
}