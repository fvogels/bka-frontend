export interface Filter
{
    toQueryParameter(): string
}

export type FilterCollection = Record<string, Filter>;

export class BoekjaarFilter implements Filter
{
    #boekjaar: number;

    constructor(boekjaar: number)
    {
        this.#boekjaar = boekjaar;
    }

    toQueryParameter(): string
    {
        return `boekjaar=${this.#boekjaar}`;
    }
}

export function buildQueryParameters(filters: FilterCollection): string
{
    return Object.values(filters).map(filter => filter?.toQueryParameter()).filter(x => x).join("&");
}
