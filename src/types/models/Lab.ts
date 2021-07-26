// Auto-generated , DO NOT EDIT
import {Entity} from "@subql/types";
import assert from 'assert';


export class Lab implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public account_id: string;

    public box_public_key?: string;

    public name?: string;

    public email?: string;

    public country?: string;

    public region?: string;

    public city?: string;

    public address?: string;

    public latitude?: string;

    public longitude?: string;

    public profile_image?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Lab entity without an ID");
        await store.set('Lab', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Lab entity without an ID");
        await store.remove('Lab', id.toString());
    }

    static async get(id:string): Promise<Lab | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Lab entity without an ID");
        const record = await store.get('Lab', id.toString());
        if (record){
            return Lab.create(record);
        }else{
            return;
        }
    }



    static create(record){
        let entity = new Lab(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
