import { failure, success, type Result } from "@/result";
import { z } from 'zod';
import { Date, Time } from "./types";
import axios from "axios";
import { buildQueryParameters as buildFilterQueryParameters, type BedrijfsnummerFilter, type BoekjaarFilter, type DocumentnummerFilter } from "./filters";
import type { Pagination } from "./pagination";


export const Segment = z.object({
    "regelnummer": z.number(),
	"regelidentificatie": z.string(),
	"vereffeningsdatum": Date,
	"vereffeningsinvoerdatum": Date,
	"vereffeningsdocumentnummer": z.string(),
	"boekingssleutel": z.string(),
});

export type Segment = z.infer<typeof Segment>;

export const Document = z.object({
    "bedrijfsnummer": z.string(),
	"documentnummer": z.string(),
	"boekjaar": z.string(),
	"soort": z.string(),
	"documentdatum": Date,
	"boekingsdatum": Date,
	"boekmaand": z.string(),
	"invoerdatum": Date,
	"invoertijd": Time,
	"segmenten": z.array(Segment),
})

export type Document = z.infer<typeof Document>;

export type Filters = Partial<{
	boekjaar: BoekjaarFilter;
	bedrijfsnummer: BedrijfsnummerFilter;
	documentnummer: DocumentnummerFilter;
}>;

const SuccessResponse = z.object({
	"documents": z.array(Document),
})

export type SuccessResponse = z.infer<typeof SuccessResponse>;

export async function listDocuments(filters: Filters, pagination: Pagination): Promise<Result<Document[], string>>
{
    const url = buildUrl(filters, pagination);
    console.log(url);

    try
    {
        const response = await axios.get<unknown>(url);
		console.log(response.data);
        const data = SuccessResponse.parse(response.data);

        return success(data.documents);
    }
    catch ( exception: unknown )
    {
        console.error(exception);
        return failure('Fout bij het ophalen van de gegevens')
    }
}

function buildUrl(filters: Filters, pagination: Pagination): string
{
    const filterQueryParameters = buildFilterQueryParameters(filters);
	const paginationQueryParameters = pagination.toQueryParameters();

	const queryParameters = [...filterQueryParameters, ...paginationQueryParameters].join("&");

    return `/api/v1/documents?${queryParameters}`
}
