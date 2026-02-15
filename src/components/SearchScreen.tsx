import { countDocuments } from '@/rest';
import { Button, Center, Fieldset, Group, NumberInput, Stack, Text, TextInput, Title } from '@mantine/core';
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import ClearButton from './ClearButton';
import BoekjaarInput from './BoekjaarInput';
import BedrijfsnummerInput from './BedrijfsnummerInput';

export default function SearchScreen(): React.ReactNode
{
    const [documentCount, setDocumentCount] = useState<number>(0);
    const [boekjaar, setBoekjaar] = useState<number | null>(null);
    const [bedrijfsnummer, setBedrijfsnummer] = useState<string>('');
    const [minimumDocumentnummer, setMinimumdocumentnummer] = useState<string>('');
    const [maximumDocumentnummer, setMaximumdocumentnummer] = useState<string>('');

    return (
        <Center m='xl'>
            <Stack w='500px'>
                <Title mb='xl'>
                    iBoekhoudingAssistent
                </Title>
                <Group align='flex-end'>
                    <BoekjaarInput value={boekjaar} onChange={onChangeBoekjaar} style={{ flex: 1 }} />
                    <ClearButton onClick={onClearBoekjaar} />
                </Group>
                <Group align='flex-end'>
                    <BedrijfsnummerInput value={bedrijfsnummer} style={{ flex: 1 }} onChange={onChangeBedrijfsnummer} />
                    <ClearButton onClick={onClearBedrijfsnummer} />
                </Group>
                <Fieldset legend="Documentnummer">
                    <Group justify='center' align='flex-end'>
                        <TextInput value={minimumDocumentnummer} label="Minimum" onChange={e => onChangeMinimumDocumentNummer(e.currentTarget.value)} />
                        <TextInput value={maximumDocumentnummer} label="Maximum" onChange={e => onChangeMaximumDocumentNummer(e.currentTarget.value)} />
                        <ClearButton onClick={onClearDocumentnummer} />
                    </Group>
                </Fieldset>

                <Button onClick={onRefresh}>Zoek</Button>
                <Text>{documentCount} gevonden</Text>
            </Stack>
        </Center>
    );


    async function onRefresh(): Promise<void> {
        const result = await countDocuments();

        if ( result.success )
        {
            setDocumentCount(result.value);
        }
        else
        {
            notifications.show({
                message: 'Fout opgetreden',
                color: 'red',
            });
        }
    }

    function onChangeBoekjaar(value : number | null): void
    {
        setBoekjaar(value);
    }

    function onClearBoekjaar(): void
    {
        setBoekjaar(null);
    }

    function onClearBedrijfsnummer(): void
    {
        setBedrijfsnummer('');
    }

    function onClearDocumentnummer(): void
    {
        setMinimumdocumentnummer('');
        setMaximumdocumentnummer('');
    }

    function onChangeBedrijfsnummer(bedrijfsnummer: string): void
    {
        setBedrijfsnummer(bedrijfsnummer);
    }

    function onChangeMinimumDocumentNummer(bedrijfsnummer: string): void
    {
        setMinimumdocumentnummer(bedrijfsnummer);
    }

    function onChangeMaximumDocumentNummer(bedrijfsnummer: string): void
    {
        setMaximumdocumentnummer(bedrijfsnummer);
    }
}
