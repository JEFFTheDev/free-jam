import { useEffect, useState } from "react";
import { Album, ChordChange, Song, SongProfile, SongService } from "../api/song.service";
import { SongProfileService } from "../api/songprofile.service";

interface timelineProps {
    album: Album;
    song: Song;
    videoDurationSeconds: number;
}
export function SongTimeline({ album, song, videoDurationSeconds }: timelineProps) {

    const [songProfile, setSongProfile] = useState<SongProfile>();
    const [currentDragTarget, setCurrentDragTarget] = useState<EventTarget>();

    useEffect(() => {
        SongService.songProfileByArtistAndTitle(album.artist, song.title).then((profile) => {
            setSongProfile(profile);
        });
    }, []);

    function getChordChangePositionOnGrid(change: ChordChange) {
        const timeline = document.getElementById('timeline');
        const timelineRect = timeline!.getBoundingClientRect();

        return timelineRect.width / ((videoDurationSeconds * 1000) / change.atMilliseconds);
    }

    return <div className="relative w-full rounded-lg bg-white p-4 shadow-md mt-12">
        <div
            className="relative h-4">
            {songProfile?.changes.map((change, i) => {
                if (i > 0) {
                    return
                }
                return <div style={{ left: getChordChangePositionOnGrid(change) }} className="group origin-center absolute -top-12 h-16 w-6"
                    onMouseDown={(e) => {
                        setCurrentDragTarget(e.currentTarget);
                    }}
                    onMouseUp={(e) => {
                        if (e.currentTarget != currentDragTarget) {
                            return;
                        }

                        const timeline = document.getElementById('timeline');
                        const timelineRect = timeline!.getBoundingClientRect();
                        const pos = currentDragTarget.style.left;
                        const p = pos.substring(pos.length, -2);
                        const ratio = p / timelineRect.width;
                        const millisecondPoint = Math.floor(videoDurationSeconds * ratio);

                        SongProfileService.putChordChange({
                            id: change.id,
                            duration: 500, // TODO
                            atMilliseconds: millisecondPoint,
                            songArtist: album.artist,
                            songTitle: song.title,
                            chord: songProfile.chords[change.chordIndex],
                        });

                        setCurrentDragTarget(undefined);
                    }}
                    onMouseMove={(e) => {
                        if (currentDragTarget != e.currentTarget) {
                            return;
                        }

                        const timeline = document.getElementById('timeline');
                        const timelineRect = timeline!.getBoundingClientRect();
                        const mouseX = e.clientX;
                        const minX = timelineRect.left;
                        const maxX = timelineRect.right;
                        const newPosition = Math.min(maxX, Math.max(minX, mouseX)) - minX;
                        currentDragTarget.style.left = newPosition + 'px';

                        // const dur = 30000;
                        // const atMs = 5000;
                        // const pos = timelineRect.width / (dur / atMs);
                        // currentDragTarget.style.left = pos + 'px';

                        // Calculate the millisecond point
                        // const ratio = newPosition / timelineRect.width;
                        // const millisecondPoint = Math.floor(30000 * ratio);
                        // console.log('Millisecond point:', millisecondPoint);
                    }}>
                    <div className="absolute z-10 h-6 w-6 transform cursor-pointer rounded-full bg-blue-500 transition-transform duration-100 ease-in-out group-hover:scale-150">
                        <p className="absolute truncate z-10 hidden select-none text-center text-sm font-bold text-white group-hover:block">{songProfile.chords[change.chordIndex].name}</p>
                    </div>
                    <div className="absolute bottom-0 left-1/2 z-0 h-10 w-1 -translate-x-1/2 transform bg-blue-500"></div>
                </div>
            })}
        </div>
        <div id="timeline" className="h-4 w-full bg-gray-300 flex">
        </div>
    </div>
}