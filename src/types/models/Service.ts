// Auto-generated , DO NOT EDIT
import {Entity} from "@subql/types";
import assert from 'assert';

import {
    PriceByCurrency,
} from '../interfaces'


export class Service implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public owner_id: string;

    public ownerId?: string;

    public name?: string;

    public prices_by_currency?: PriceByCurrency[];

    public category?: string;

    public description?: string;

    public long_description?: string;

    public image?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Service entity without an ID");
        await store.set('Service', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Service entity without an ID");
        await store.remove('Service', id.toString());
    }

    static async get(id:string): Promise<Service | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Service entity without an ID");
        const record = await store.get('Service', id.toString());
        if (record){
            return Service.create(record);
        }else{
            return;
        }
    }



    static create(record){
        let entity = new Service(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
