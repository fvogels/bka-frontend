import { success, type Result } from "@/result";
import { z } from 'zod';
import { Date, Time } from "./types";
import axios from "axios";


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
	"boekjaar": z.date(),
	"soort": z.string(),
	"documentdatum": Date,
	"boekingsdatum": Date,
	"boekmaand": z.string(),
	"invoerdatum": Date,
	"invoertijd": Time,
	"segmenten": z.array(Segment),
})

export type Document = z.infer<typeof Document>;

const SuccessResponse = z.array(Document);

export type SuccessResponse = z.infer<typeof SuccessResponse>;


// export async function listDocuments(): Promise<Result<number, string>>
// {
//     const url = `/api/v1/documents`

//     try
//     {
//         const response = await axios.get<unknown>(url);
//         const data = SuccessResponse.parse(response.data);

//         return success(data);
//     }
//     catch ( exception: unknown )
//     {
//         console.error(exception);
//         return convertExceptionToFailure(exception);
//     }


//     function buildUrl(): URL
//     {
//         let url = paths.items;

//         if ( options.rowRange )
//         {
//             url = url.withRowRange(options.rowRange.start, options.rowRange.count);
//         }

//         if ( options.descriptionFilter )
//         {
//             url = url.withDescriptionFilter(options.descriptionFilter);
//         }

//         return url;
//     }
// }