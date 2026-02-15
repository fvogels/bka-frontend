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

export class BedrijfsnummerFilter implements Filter
{
    #bedrijfsnummer: string;

    constructor(bedrijfsnummer: string)
    {
        this.#bedrijfsnummer = bedrijfsnummer;
    }

    toQueryParameter(): string
    {
        return `bedrijf=${this.#bedrijfsnummer}`;
    }
}

export class DocumentnummerFilter implements Filter
{
    #minimum: string;
    #maximum: string;

    constructor(minimum: string, maximum: string)
    {
        this.#minimum = minimum;
        this.#maximum = maximum;
    }

    toQueryParameter(): string
    {
        return `nr=${this.#minimum}-${this.#maximum}`;
    }
}