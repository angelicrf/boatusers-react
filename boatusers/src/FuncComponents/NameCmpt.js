import { Name } from '../HooksComponents/BUItems';

export default function NameCmpt() {

    return (
        <div>
            <Name.Consumer>
                {(fname) => {
                    return <h1>My Name is {fname}</h1>;
                }}
            </Name.Consumer>
        </div>
    );
}