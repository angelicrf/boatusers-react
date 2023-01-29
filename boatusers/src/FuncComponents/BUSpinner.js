import Spinner from 'react-bootstrap/Spinner';

export default function BUSpinner() {

    return (
        <Spinner animation="border" role="status">
            <span>Loading...</span>
        </Spinner>
    );
}
