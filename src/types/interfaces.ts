// SPDX-License-Identifier: Apache-2.0

// Auto-generated , DO NOT EDIT

export interface Price {

    key: string;

    value: bigint;

}


export interface PriceByCurrency {

    currency: string;

    prices: Price[];

    additional_prices: Price[];

}


export interface CertificationInfo {

    title: string;

    issuer: string;

    month: string;

    year: string;

    description: string;

}


