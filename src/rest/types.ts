import { z } from 'zod';

export const Date = z.object({
    year: z.number(),
    month: z.number(),
    day: z.number(),
})

export type Date = z.infer<typeof Date>;

export const Time = z.object({
    hour: z.number(),
    minute: z.number(),
    second: z.number(),
})

export type Time = z.infer<typeof Time>;
