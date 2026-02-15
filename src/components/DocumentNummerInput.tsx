import { TextInput, type TextInputProps } from "@mantine/core";
import { forwardRef } from "react";


interface Props extends Omit<TextInputProps, 'value' | 'onChange' | 'label'>
{
    value: string;
    onChange: (value: string) => void;
}

export const DocumentnummerInput = forwardRef<HTMLInputElement, Props>(({value, onChange, ...remainingProps}, ref) => {
    return (
        <TextInput ref={ref} label="Bedrijfsnummer" value={value || ''} onChange={e => onChange(e.currentTarget.value)} {...remainingProps} />
    );
});

export default DocumentnummerInput;
