export class Media {
    private _isPlaying: boolean;
    private _name: string;
    private _path: string;
    private _type: string;
    private _id: number;

    constructor(_path: string, _name: string, _type: string, _id:number) {
        this._isPlaying = false;
        this._path = _path;
        this._name = _name;
        this._type = _type;
        this._id = _id;
    }

    public get isPlaying(): boolean {
        return this._isPlaying;
    }
    public setIsPlaying(value: boolean) {
        this._isPlaying = value;
    }

    public get path(): string {
        return this._path;
    }
    public set path(value: string) {
        this._path = value;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get type(): string {
        return this._type;
    }
    public set type(value: string) {
        this._type = value;
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
}