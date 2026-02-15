import { NumberInput, type NumberInputProps } from "@mantine/core";
import { forwardRef } from "react";

interface Props extends Omit<NumberInputProps, 'value' | 'onChange' | 'label'>
{
    value: number | null;
    onChange: (value: number | null) => void;
}

export const BoekjaarInput = forwardRef<HTMLInputElement, Props>(({value, onChange, ...remainingProps}, ref) => {
    return (
        <NumberInput ref={ref} label="Boekjaar" value={value || ''} onChange={onChangeBoekjaar} min={1425} max={2425} decimalScale={0} {...remainingProps} />
    );


    function onChangeBoekjaar(value: string | number): void
    {
        if ( typeof(value) === 'string' )
        {
            onChange(null);
        }
        else
        {
            onChange(value);
        }
    }
});

export default BoekjaarInput;