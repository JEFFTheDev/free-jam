import * as React from 'react';
import { useEffect, useState } from 'react';
import { ChordConfig, songTest } from '../models/chord';
import { Chord } from './Chord';

export const ChordFeed = () => {
    const [positions, setPositions] = useState<string[]>([
        "translate-x-[40em]",
        "translate-x-[20em]",
        "translate-x-[0em]",
        "-translate-x-[20em]",
        "-translate-x-[40em]"
    ]);
    const [songTimestamp, setSongTimestamp] = useState<number>(0)

    useEffect(() => {
    }, [])

    function chordFromSongByName(chordName: string): ChordConfig {
        return songTest.chords[0];
    }
    function next() {
        const i = positions[0]
        positions.shift();
        setPositions([...positions, i]);
    }
    return <div className='w-full'>
        <button onClick={next}>Next</button>
        <p>Song progress {songTimestamp}</p>
        <div className="relative z-0">
            {songTest.chordTimestamps.map((chordTimestamp, i) => {
                const chord = chordFromSongByName(chordTimestamp.chordName)
                return <div key={chord.name} className="absolute inset-0 flex justify-center items-center z-10">
                    <div className={'w-64 h-64 duration-100 ' + positions[i]}>
                        <Chord barres={chord.barres} capo={chord.capo} fingers={chord.fingers} frets={chord.frets} />
                    </div>
                </div>
            })}
        </div>
    </div>
}