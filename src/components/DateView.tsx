import { Text, type TextProps } from "@mantine/core";
import { forwardRef } from "react";


interface Props extends TextProps
{
    year: number;
    month: number;
    day: number;
}

export const DateView = forwardRef<HTMLInputElement, Props>(({year, month, day, ...remainingProps}, ref) => {
    return (
        <Text ref={ref} {...remainingProps}>
            {padNumber(day, 2)}/{padNumber(month, 2)}/{padNumber(year, 4)}
        </Text>
    );


    function padNumber(n: number, padding: number): string
    {
        return `${n}`.padStart(padding, '0');
    }
});

export default DateView;