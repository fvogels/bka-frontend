import { TextInput, type TextInputProps } from "@mantine/core";
import { forwardRef } from "react";
import classes from './BedrijfsnummerInput.module.css';


interface Props extends Omit<TextInputProps, 'value' | 'onChange' | 'label'>
{
    value: string;
    onChange: (value: string) => void;
}

export const BedrijfsnummerInput = forwardRef<HTMLInputElement, Props>(({value, onChange, className, ...remainingProps}, ref) => {
    className = `${className} ${determineClassName(value)}`;

    return (
        <TextInput ref={ref} label="Bedrijfsnummer" value={value || ''} onChange={e => onChange(e.currentTarget.value)} className={className} {...remainingProps} />
    );
});

function isValidBedrijfsnummer(bedrijfsnummer: string): boolean
{
    const length = bedrijfsnummer.length;

    return length == 4;
}

function determineClassName(value: string): string
{
    if ( value.length === 0 )
    {
        return classes.inactive;
    }
    else if ( isValidBedrijfsnummer(value) )
    {
        return classes.valid;
    }
    else
    {
        return classes.invalid;
    }
}

export default BedrijfsnummerInput;
