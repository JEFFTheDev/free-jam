import { useEffect, useState } from "react";
import { ChordChange, GuitarChord } from "../api/song.service";
import { Chord } from "./Chord";
import { shapeToFrets } from "../utils/utils";


interface feedProps {
    paused: boolean;
    changes: ChordChange[];
    chords: GuitarChord[];
    currentChordIndex: number;
}

export function ChordFeed({ changes, chords, paused, currentChordIndex }: feedProps) {

    const positions = 5;

    function chordsToDisplay() {
        return [...getLeftAdjacentChords(), changes[currentChordIndex], ...getRightAdjacentChords()];
    }

    function getLeftAdjacentChords() {
        const adjacent = Math.round(positions / 2) - 1;
        if (currentChordIndex - adjacent < 0) {
            if (currentChordIndex - adjacent == -1) {
                // There is only one element that doesn't exist
                return ['filler', ...changes.slice(currentChordIndex - (adjacent - 1), currentChordIndex)];
            }
            return ['filler', 'filler'];
        }
        return changes.slice(currentChordIndex - adjacent, currentChordIndex);
    }

    function getRightAdjacentChords() {
        const adjacent = Math.round(positions / 2) - 1;
        if (currentChordIndex + adjacent > changes.length - 1) {
            if (currentChordIndex + adjacent == changes.length) {
                // There is only one element that doesn't exist
                return [...changes.slice(currentChordIndex + 1, currentChordIndex + adjacent), 'filler'];
            }
            return ['filler', 'filler'];
        }
        return changes.slice(currentChordIndex + 1, currentChordIndex + 1 + adjacent);
    }

    return <div key={currentChordIndex} className="w-full flex justify-between overflow-hidden">
        {chordsToDisplay().map((change, index) => {
            console.log(change, change == "filler");
            if (change == 'filler') {
                return <p key={index} className="text-yellow-400 w-1/5"></p>;
            }
            const chordChange = change as ChordChange;
            const chord = chords[chordChange.chordIndex];

            const isMiddle = index == Math.round(positions / 2) - 1;
            let width = isMiddle ? "w-3/4" : "w-2/6";
            width = "w-2/6";

            // TODO:
            // - add fingers to API
            // - using chord name + change id doesn't seem like a good idea
            return <div key={chord.name + index} className={"w-1/5 flex justify-center"} style={{ animation: "slide 200ms linear forwards", animationPlayState: paused ? "paused" : "running" }}>
                <div className={width + " duration-500"} style={{ animation: isMiddle ? "scale 200ms linear forwards" : "", animationPlayState: paused ? "paused" : "running" }}>
                    <p className="text-center text-white">{chord.name}</p>
                    <Chord barres={[]} capo={false} fingers={[0, 0, 0, 0, 0, 0]} frets={shapeToFrets(chord.shape)} />
                    {isMiddle && <div className="relative w-full h-4 bg-gray-900 rounded-full overflow-hidden">
                        <div
                            className="absolute inset-0 bg-stone-50 animate-progress"
                            style={{ animation: "progressAnimation " + chordChange.duration + "ms linear forwards", animationPlayState: paused ? "paused" : "running" }}></div>
                    </div>}
                </div>
            </div>
        })}
    </div>
}