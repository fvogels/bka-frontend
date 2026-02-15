import { failure, success, type Result } from "@/result";
import { z } from 'zod';
import axios from "axios";
import { buildQueryParameters, type BoekjaarFilter } from "./filters";


const SuccessResponse = z.object({
    'count': z.number(),
});

export type SuccessResponse = z.infer<typeof SuccessResponse>;

export type Filters = Partial<{
    boekjaar: BoekjaarFilter;
}>;

export async function countDocuments(filters: Filters): Promise<Result<number, string>>
{
    const url = buildUrl(filters);
    console.log(url);

    try
    {
        const response = await axios.get<unknown>(url);
        const data = SuccessResponse.parse(response.data);

        return success(data.count);
    }
    catch ( exception: unknown )
    {
        console.error(exception);
        return failure('Fout bij het ophalen van de gegevens')
    }
}

function buildUrl(filters: Filters): string
{
    const queryParameters = buildQueryParameters(filters);

    return `/api/v1/documents?${queryParameters}`
}
