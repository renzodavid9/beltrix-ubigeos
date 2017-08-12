/**
 * Clase que representa una aentidad de Ubigeo básica con sus datos básicos
 * Se crea abstracta para que no pueda ser instanciada directamente
 */
export abstract class BaseLocation{
    //Código único del ubigeo
    protected _code: string;
    //Nombre único del ubigeo
    protected _name: string;
    //Ubigeo que representa el papá de este
    protected _father: BaseLocation;

    public get code():string{
        return this._code;
    }

    public set code(newCode: string){
        this._code = newCode;
    }

    public get name():string{
        return this._name;
    }

    public set name(name: string){
        this._name = name;
    }

    public get father(): BaseLocation{
        return this._father;
    }

    public set father(father: BaseLocation){
        this._father = father;
    }
}