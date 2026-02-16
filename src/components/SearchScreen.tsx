import { countDocuments } from '@/rest';
import { Button, Center, Fieldset, Group, Pagination, Stack, Text, TextInput, Title } from '@mantine/core';
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import ClearButton from './ClearButton';
import BoekjaarInput from './BoekjaarInput';
import BedrijfsnummerInput from './BedrijfsnummerInput';
import { BedrijfsnummerFilter, BoekjaarFilter, DocumentnummerFilter } from '@/rest/filters';
import type { Filters as CountDocumentFilters } from '@/rest/count-documents';
import { listDocuments, type Document } from '@/rest/list-documents';
import { Pagination as PaginationData } from '@/rest/pagination';
import { DataTable } from 'mantine-datatable';
import DateView from './DateView';


type NoSearchResults = {
    tag: 'noResults',
}

type CountSearchResults = {
    tag: 'count',
    count: number;
}

type ListSearchResults = {
    tag: 'list',
    count: number,
    page: number,
    documentsPerPage: number,
    documentsOnPage: Document[],
}

type SearchResults = NoSearchResults | CountSearchResults | ListSearchResults;


export default function SearchScreen(): React.ReactNode
{
    const [searchResults, setSearchResults] = useState<SearchResults>({tag: 'noResults'});
    const [boekjaar, setBoekjaar] = useState<number | null>(null);
    const [bedrijfsnummer, setBedrijfsnummer] = useState<string>('');
    const [minimumDocumentnummer, setMinimumdocumentnummer] = useState<string>('');
    const [maximumDocumentnummer, setMaximumdocumentnummer] = useState<string>('');

    return (
        <Center m='xl'>
            <Stack align='center'>
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
                    <Button onClick={onFetchCount}>Zoek</Button>
                </Stack>
                {renderSearchResults()}
            </Stack>
        </Center>
    );


    // ReactElement disallows undefined, forcing the switch to be exhaustive
    function renderSearchResults(): React.ReactElement
    {
        switch ( searchResults.tag )
        {
            case 'noResults':
                return renderNoSearchResults();

            case 'count':
                return renderCountSearchResults(searchResults);

            case 'list':
                return renderListSearchResults(searchResults);
        }
    }

    function renderNoSearchResults(): React.ReactElement
    {
        return <></>;
    }

    function renderCountSearchResults(searchResults: CountSearchResults): React.ReactElement
    {
        return (
            <Fieldset legend="Zoekresultaten" mt='xl'>
                <Stack>
                    <Center>
                        <Text>{searchResults.count} documenten gevonden</Text>
                    </Center>
                    <Button onClick={async () => onFetchDetails(searchResults.count)}>
                        Toon details
                    </Button>
                </Stack>
            </Fieldset>
        );
    }

    function renderListSearchResults(searchResults: ListSearchResults): React.ReactElement
    {
        const totalPages = Math.ceil(searchResults.count / searchResults.documentsPerPage);

        return (
            <Fieldset legend="Zoekresultaten" mt='xl' w='800px'>
                <Stack w='100%'>
                    <Center>
                        <Pagination total={totalPages} value={searchResults.page + 1} onChange={setPage} />
                    </Center>
                    <DataTable
                        records={searchResults.documentsOnPage}
                        columns={[
                        {
                            accessor: 'bedrijfsnummer',
                            title: 'Bedrijf',
                        },
                        {
                            accessor: 'boekjaar',
                            title: 'Boekjaar',
                        },
                        {
                            accessor: 'documentnummer',
                            title: 'Nummer',
                        },
                        {
                            accessor: 'soort',
                            title: 'Soort',
                        },
                        {
                            accessor: 'documentdatum',
                            title: 'Datum',
                            render: (row) => (
                                <DateView year={row.documentdatum.year} month={row.documentdatum.month} day={row.documentdatum.day} />
                            ),
                        },
                    ]} />
                </Stack>
            </Fieldset>
        );


        function setPage(oneBasedIndexedPage: number): void
        {
            setSearchResults(
                {
                    ...searchResults,
                    page: oneBasedIndexedPage - 1,
                }
            );
        }
    }

    async function onFetchCount(): Promise<void> {
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

    async function onFetchDetails(count: number): Promise<void> {
        const pagination = new PaginationData(10, 0);
        const result = await listDocuments(buildFilters(), pagination);

        if ( result.success )
        {
            setSearchResults({
                tag: 'list',
                count,
                page: 0,
                documentsPerPage: 10,
                documentsOnPage: result.value,
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
