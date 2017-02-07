class Dictionary<T> {
    private _map: DictionaryMap<T>;
    private length : number;


    constructor() {
        this.length = 0;
        this._map = new DictionaryMap<T>();
    }

    public put(key: string, value: T): void {
        if(!this.hasKey(key)) {
            this.length++;
        }
        this.map[key] = value;
    }

    public get(key: string) : T {

        if (this.hasKey(key)) {
            return this.map[key];
        }

        return null;
    }

    public getKeys() : string[] {
        let output : string[] = [];

        for(let key in this._map) {
            if(this._map.hasOwnProperty(key)) {
                continue;
            }

            output.push(key);
        }

        return output;
    }

    public remove(key: string): T {
        if (this.hasKey(key)) {
            let value = this.map[key];
            delete this.map[key];
            this.length--;

            return value;
        }

        return null;
    }

    public hasKey(key: string): boolean {
        return typeof this.map[key] !== 'undefined';
    }


    private get map(): DictionaryMap<T> {
        return this._map;
    }
}

class DictionaryMap<T> {
    [key: string]: T;
}