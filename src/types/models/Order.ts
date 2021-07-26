// Auto-generated , DO NOT EDIT
import {Entity} from "@subql/types";
import assert from 'assert';

import {
    Price,
} from '../interfaces'


export class Order implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public service_id: string;

    public customer_id: string;

    public customer_box_public_key: string;

    public seller_id: string;

    public dna_sample_tracking_id: string;

    public currency: string;

    public prices: Price[];

    public additional_prices: Price[];

    public status: string;

    public created_at: string;

    public updated_at: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Order entity without an ID");
        await store.set('Order', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Order entity without an ID");
        await store.remove('Order', id.toString());
    }

    static async get(id:string): Promise<Order | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Order entity without an ID");
        const record = await store.get('Order', id.toString());
        if (record){
            return Order.create(record);
        }else{
            return;
        }
    }



    static create(record){
        let entity = new Order(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
