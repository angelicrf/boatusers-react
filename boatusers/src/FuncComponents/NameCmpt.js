import { BUStoreData } from '../HooksComponents/BUItems';
import { useContext } from 'react';

export default function NameCmpt() {

    let thisContext = useContext(BUStoreData)

    return (
        <div>
            <div>name from UseContext {thisContext.appName} and info {thisContext.appInfo}</div>
        </div>
    );
}