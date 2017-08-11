import { Province } from './province.model';

export class Department{
    private _code: number;
    private _name: string;
    private provinces: Map<number, Province>;

    public get code():number{
        return this._code;
    }

    public set code(newCode: number){
        this._code = newCode;
    }

    get name():string{
        return this._name;
    }

    set name(name: string){
        this._name = name;
    }

    addProvince(province: Province): void{

    }
}