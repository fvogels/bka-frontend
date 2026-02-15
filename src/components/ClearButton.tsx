import { ActionIcon, Tooltip } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

interface Props
{
    onClick?: () => void;
}

export default function ClearButton(props: Props): React.ReactNode
{
    return (
        <Tooltip label="Verwijder filter">
            <ActionIcon onClick={props.onClick} size='lg' tabIndex={-1}>
                <IconX />
            </ActionIcon>
        </Tooltip>
    )
}