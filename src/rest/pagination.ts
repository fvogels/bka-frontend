export class Pagination
{
    #limit: number;
    #offset: number;

    public constructor(limit: number, offset: number)
    {
        this.#limit = limit;
        this.#offset = offset;
    }

    toQueryParameters(): string[]
    {
        return [`limit=${this.#limit}`, `offset=${this.#offset}`];
    }
}
