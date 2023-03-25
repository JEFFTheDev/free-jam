import React from 'react'
import ReactDOM from 'react-dom'

import Chord from '@tombatossals/react-chords/lib/Chord'


function TsChord(chord) {
    const instrument = {
        strings: 6,
        fretsOnChord: 4,
        name: 'Guitar',
        keys: [],
        tunings: {
            standard: ['E', 'A', 'D', 'G', 'B', 'E']
        }
    }
    const lite = false // defaults to false if omitted
    return (
        <Chord
            chord={chord}
            instrument={instrument}
            lite={lite}
        />
    )
}

export default TsChord;