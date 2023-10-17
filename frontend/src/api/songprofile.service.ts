import axios, { AxiosInstance } from "axios";
import { plainToInstance, Type } from "class-transformer";
import { ChordChange, GuitarChord } from "./song.service";
import { PutChordChange } from "./models";

class _SongProfileService {
    private readonly r: AxiosInstance;

    constructor(baseURL: string) {
        this.r = axios.create({
            baseURL: baseURL,
        });
    }

    async putChordChange(change : PutChordChange): Promise<ChordChange> {
        const res = await this.r.put<ChordChange>("/songprofile", change);
        return plainToInstance(ChordChange, res.data); 
    }
}



export const SongProfileService = new _SongProfileService("http://localhost:5074");