import { StoreValue } from '../Store/StoreValue';
import { useContext } from 'react';

export default function NameCmpt() {

    let { appName, setAppName } = useContext(StoreValue)
    return (
        <div>
            <div>name from UseContext {appName()}</div>
            {
                setAppName("thisapp")
            }
        </div>
    );
}