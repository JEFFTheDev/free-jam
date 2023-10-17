import { GuitarChord } from "./song.service";

export class PutChordChange {
    id?: number;
    songTitle!: string;
    songArtist!: string;
    chord!: GuitarChord;
    atMilliseconds!: number;
    duration!: number;
}