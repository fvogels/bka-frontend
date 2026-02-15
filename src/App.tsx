import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from "@mantine/notifications";
import SearchScreen from './components/SearchScreen';

function App()
{
    return (
        <MantineProvider defaultColorScheme='dark'>
            <Notifications />
            <SearchScreen />
        </MantineProvider>
    );
}

export default App;