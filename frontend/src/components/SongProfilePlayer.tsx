import * as React from 'react';
import { useEffect, useState } from 'react';
import { ChordChange, Song, SongProfile, SongService } from '../api/song.service';
import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube';
import { ChordFeed } from './ChordFeed';
import { PlayPauseIcon } from '@heroicons/react/24/solid'

interface songProfilePlayerProps {
    artist: string;
    title: string;
}
export function SongProfilePlayer({ artist, title }: songProfilePlayerProps) {
    const [profile, setSongProfile] = useState<SongProfile>();
    const [paused, setPaused] = useState<boolean>(true);
    const [videoPlayer, setVideoPlayer] = useState<YouTubePlayer>();
    const [currentChordIndex, setCurrentChordIndex] = useState<number>(-1);
    let currentSongTime = 0;
    let interval: any;

    useEffect(() => {
        if (!videoPlayer) {
            return;
        }
        if (paused === true) {
            videoPlayer.pauseVideo();
        }

        if (paused === false) {
            videoPlayer.playVideo();
        }
    }, [paused]);

    function evaluateSongProgression() {
        if (!profile) {
            return;
        }

        const next = nextChord();
        if (!next) {
            return;
        }

        if (currentSongTime >= (next.atMilliseconds / 1000)) {
            // song has reached the point where the next chord needs to be rendered
            setCurrentChordIndex(currentChordIndex + 1);
            clearInterval(interval);
        }
    }

    function nextChord(): ChordChange | undefined {
        if (currentChordIndex == profile!.changes.length) {
            // already at last chord
            return undefined;
        }
        return profile?.changes[currentChordIndex + 1];
    }

    function startChordCheck(player: YouTubePlayer) {
        interval = setInterval(() => {
            const newTime = player.getCurrentTime();
            if (newTime != currentSongTime) {
                currentSongTime = newTime;
                evaluateSongProgression();
            }
        }, 10);
    }

    function onReady(event: YouTubeEvent<any>) {
        setVideoPlayer(event.target);
        startChordCheck(event.target);
    }

    useEffect(() => {
        SongService.songProfileByArtistAndTitle(artist, title).then((profile) => {
            setSongProfile(profile);
        });
    }, []);

    useEffect(() => {
        if (!videoPlayer) {
            return;
        }
        console.log("next chord!", currentChordIndex, currentSongTime, profile?.changes[currentChordIndex]);

        // wait for the next chord
        startChordCheck(videoPlayer);
    }, [currentChordIndex]);

    return <div className='h-full w-full'>
        {/* Background video */}
        {profile && profile.song.videoId && <div className="relative h-full w-full">
            <div className="w-full h-full">
                <YouTube videoId={profile.song.videoId} opts={{
                    height: window.innerHeight,
                    width: window.innerWidth,
                    playerVars: {
                        mute: 1,
                        controls: 0,
                        autoplay: 0,
                    },
                }} onReady={onReady} />
            </div>
            <div className="absolute top-0 left-0 w-full h-full z-10"></div>
            {/* Chord feed */}
            <div className='absolute flex justify-center bg-gradient-to-t from-black to-transparent bottom-0 w-full h-2/4 z-15'>
                <div className='absolute flex justify-center bg-gradient-to-t from-black to-transparent bottom-10 w-full h-3/4' >
                    {currentChordIndex >= 0 && <ChordFeed paused={paused} currentChordIndex={currentChordIndex} changes={profile.changes} />}
                </div>
                <PlayPauseIcon onClick={() => {
                    setPaused(!paused);
                }} className="h-1/4 w-14 text-stone-300 z-20 cursor-pointer bottom-0 absolute" />
            </div>
        </div>}
    </div>
}