
export default function MarkerInfo({ LocName, locId, locCenter }) {

    return (

        (LocName) ?
            <div>
                <div>{LocName}</div>
                <div>{locId}</div>
                <div>{locCenter}</div>
            </div>
            : <div>No Data</div>

    )
}