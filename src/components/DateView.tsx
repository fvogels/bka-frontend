interface Props
{
    year: number;
    month: number;
    day: number;
}

export default function DateView(props: Props): React.ReactElement
{
    return (
        <>
            {padNumber(props.day, 2)}/{padNumber(props.month, 2)}/{padNumber(props.year, 4)}
        </>
    );


    function padNumber(n: number, padding: number): string
    {
        return `${n}`.padStart(padding, '0');
    }
}