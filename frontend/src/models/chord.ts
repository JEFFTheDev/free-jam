// TODO: create database of chords
export interface ChordConfig {
  name: string;
  frets: number[];
  fingers: number[];
  barres: number[];
  capo: boolean;
}

export interface SongProfile {
  song: Song;
  url: string;
  chordTimestamps: ChordTimestamp[];
  chords: ChordConfig[];
}

export interface ChordTimestamp {
  chordName: string;
  appearsAt: number;
}

export interface Song {
  name: string;
  artist: string;
  album: string;
  durationInMs: number;
}

export const songTest : SongProfile = {
  song: {
    artist: "A really cool artist",
    durationInMs: 30000, // 30 s
    name: "my incredible song",
    album: "Really awesome album"
  },
  url: "some spotify url?",
  chords: [
    {
      name: "Am",
      barres: [],
      capo: false,
      fingers: [0, 0, 2, 3, 1, 0],
      frets: [-1, 0, 2, 2, 1, 0],
    }
  ],
  chordTimestamps: [
    {
      chordName: "Am",
      appearsAt: 2000,
    },
    {
      chordName: "B",
      appearsAt: 10000,
    },
    {
      chordName: "C",
      appearsAt: 15000,
    },
    {
      chordName: "D",
      appearsAt: 16000,
    },
    {
      chordName: "Cadd9",
      appearsAt: 27000,
    },
  ],
}

