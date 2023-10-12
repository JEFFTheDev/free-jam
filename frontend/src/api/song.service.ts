import axios, { AxiosInstance } from "axios";
import { plainToInstance, Type } from "class-transformer";

export class Album {
    title!: string;
    artist!: string;
    imageUrl!: string;
}

export class Song {
    title!: string;
    artist!: string;
    album?: Album;
    videoId?: string;
}

export class SongProfile {
    song!: Song;
    changes!: ChordChange[];
}

export class ChordChange {
    id!: number;
    atMilliseconds!: number;
    duration!: number;
    chord!: GuitarChord;
}

export class GuitarChord {
    name!: string;
    shape!: string;
}

class _SongService {
    private readonly r: AxiosInstance;

    constructor(baseURL: string) {
        this.r = axios.create({
            baseURL: baseURL,
        });
    }

    async listALbums(): Promise<Album[]> {
        const res = await this.r.get<any[]>("/album");
        const data = res.data.map((album) => plainToInstance(Album, album));
        return data;
    }

    async listSongs(): Promise<Song[]> {
        const res = await this.r.get<any[]>("/song");
        const data = res.data.map((song) => plainToInstance(Song, song));
        return data;
    }

    async songProfileByArtistAndTitle(artist: string, title: string): Promise<SongProfile> {
        const res = await this.r.get<any>("/songprofile", {
            params: {
                artist: artist,
                title: title
            },
        });
        const data = plainToInstance(SongProfile, res.data);
        return data;
    }
}

export const SongService = new _SongService("http://localhost:5074/");