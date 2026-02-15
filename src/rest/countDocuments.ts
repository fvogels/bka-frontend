import { success, type Result } from "@/result";
import { z } from 'zod';
import { Date, Time } from "./types";

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


export async function countDocuments(): Promise<Result<number, string>>
{
    return success(100);
}