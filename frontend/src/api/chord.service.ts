import axios, { AxiosInstance } from "axios";
import { plainToInstance, Type } from "class-transformer";
import { GuitarChord } from "./song.service";

class _ChordService {
    private readonly r: AxiosInstance;

    constructor(baseURL: string) {
        this.r = axios.create({
            baseURL: baseURL,
        });
    }

    async listChords(filter : string): Promise<GuitarChord[]> {
        const res = await this.r.get<any[]>("/chord", {
            params: {
                filter: filter,
            }
        });
        const data = res.data.map((chord) => plainToInstance(GuitarChord, chord));
        return data;
    }
}

export const ChordService = new _ChordService("http://localhost:5074");