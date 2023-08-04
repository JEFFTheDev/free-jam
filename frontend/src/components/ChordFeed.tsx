import { useEffect, useState } from "react";
import { ChordChange } from "../api/song.service";
import { Chord } from "./Chord";


interface feedProps {
    paused: boolean;
    changes: ChordChange[];
    currentChordIndex: number;
}

export function ChordFeed({ changes, paused, currentChordIndex }: feedProps) {
    const positions = [
        "-translate-x-[0]",
        "-translate-x-[0]",
        "-translate-x-[0]",
        "translate-x-[0]",
        "translate-x-[0]"
    ];

    useEffect(() => {
        console.log('changed paused', paused);
    }, [paused]);

    function chordsToDisplay() {
        return [...getLeftAdjacentChords(), changes[currentChordIndex], ...getRightAdjacentChords()];

    }

    function getLeftAdjacentChords() {
        const adjacent = Math.round(positions.length / 2) - 1;
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
        const adjacent = Math.round(positions.length / 2) - 1;
        if (currentChordIndex + adjacent > changes.length - 1) {
            if (currentChordIndex + adjacent == changes.length) {
                // There is only one element that doesn't exist
                return [...changes.slice(currentChordIndex + 1, currentChordIndex + adjacent), 'filler'];
            }
            return ['filler', 'filler'];
        }
        return changes.slice(currentChordIndex + 1, currentChordIndex + 1 + adjacent);
    }

    function shapeToFrets(shape: string): number[] {
        // The API returns a chord shape as a string, example: 3X0003
        const asArray = shape.split('');
        let frets: number[] = [];
        asArray.forEach((char) => {
            if (char == "X") {
                frets.push(-1);
                return;
            }
            frets.push(+char);
        });
        return frets;
    }

    return <div className="w-full flex justify-between">
        {chordsToDisplay().map((change, index) => {
            console.log(change, change == "filler");
            if (change == 'filler') {
                return <p key={index} className="text-yellow-400 w-1/5"></p>;
            }
            const chord = change as ChordChange;

            const isMiddle = index == Math.round(positions.length / 2) - 1;
            const width = isMiddle ? "w-3/4" : "w-2/6";

            // TODO:
            // - add fingers to API
            // - using chord name + change id doesn't seem like a good idea
            return <div key={chord.chord.name + chord.id} className={"w-1/5 flex justify-center duration-500 " + positions[index]}>
                <div className={width + " duration-500"}>
                    <p className="text-center text-white">{chord.chord.name}</p>
                    <Chord barres={[]} capo={false} fingers={[0, 0, 0, 0, 0, 0]} frets={shapeToFrets(chord.chord.shape)} />
                    {isMiddle && <div className="relative w-full h-4 bg-gray-900 rounded-full overflow-hidden">
                        <div
                            className="absolute inset-0 bg-stone-50 animate-progress"
                            style={{ animation: "progressAnimation " + chord.duration + "ms linear forwards", animationPlayState: paused ? "paused" : "running" }}></div>
                    </div>}
                </div>
            </div>
        })}
    </div>
}