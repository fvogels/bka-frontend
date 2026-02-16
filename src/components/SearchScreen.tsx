import { countDocuments } from '@/rest';
import { Button, Center, Fieldset, Group, Stack, Text, TextInput, Title } from '@mantine/core';
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import ClearButton from './ClearButton';
import BoekjaarInput from './BoekjaarInput';
import BedrijfsnummerInput from './BedrijfsnummerInput';
import { BedrijfsnummerFilter, BoekjaarFilter, DocumentnummerFilter } from '@/rest/filters';
import type { Filters as CountDocumentFilters } from '@/rest/count-documents';


type NoSearchResults = {
    tag: 'noResults',
}

type CountSearchResults = {
    tag: 'count',
    count: number;
}

type SearchResults = NoSearchResults | CountSearchResults;


export default function SearchScreen(): React.ReactNode
{
    const [searchResults, setSearchResults] = useState<SearchResults>({tag: 'noResults'});
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
                {renderSearchResults()}
            </Stack>
        </Center>
    );


    function renderSearchResults(): React.ReactNode
    {
        switch ( searchResults.tag )
        {
            case 'noResults':
                return renderNoSearchResults();

            case 'count':
                return renderCountSearchResults(searchResults);
        }
    }

    function renderNoSearchResults(): React.ReactNode
    {
        return <></>;
    }

    function renderCountSearchResults(searchResult: CountSearchResults): React.ReactNode
    {
        return (
            <Fieldset legend="Zoekresultaat" mt='xl'>
                <Stack>
                    <Center>
                        <Text>{searchResult.count} documenten gevonden</Text>
                    </Center>
                    <Button>
                        Toon details
                    </Button>
                </Stack>
            </Fieldset>
        );
    }

    async function onRefresh(): Promise<void> {
        const result = await countDocuments(buildFilters());

        if ( result.success )
        {
            setSearchResults({
                tag: 'count',
                count: result.value,
            });
        }
        else
        {
            notifications.show({
                message: 'Fout opgetreden',
                color: 'red',
            });
        }
    }

    function buildFilters(): CountDocumentFilters
    {
        const filters: CountDocumentFilters = {};

        if ( boekjaar !== null )
        {
            filters.boekjaar = new BoekjaarFilter(boekjaar);
        }

        if ( bedrijfsnummer !== "" )
        {
            filters.bedrijfsnummer = new BedrijfsnummerFilter(bedrijfsnummer);
        }

        if ( minimumDocumentnummer !== "" && maximumDocumentnummer !== "" )
        {
            filters.documentnummer = new DocumentnummerFilter(minimumDocumentnummer, maximumDocumentnummer);
        }

        return filters;
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
