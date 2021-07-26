// Auto-generated , DO NOT EDIT
import {Entity} from "@subql/types";
import assert from 'assert';

import {
    CertificationInfo,
} from '../interfaces'


export class Certification implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public owner_id: string;

    public ownerId?: string;

    public info: CertificationInfo;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Certification entity without an ID");
        await store.set('Certification', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Certification entity without an ID");
        await store.remove('Certification', id.toString());
    }

    static async get(id:string): Promise<Certification | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Certification entity without an ID");
        const record = await store.get('Certification', id.toString());
        if (record){
            return Certification.create(record);
        }else{
            return;
        }
    }



    static create(record){
        let entity = new Certification(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
