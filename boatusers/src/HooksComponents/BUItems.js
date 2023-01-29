import { useState } from 'react'
import APPName from '../FuncComponents/AppName'

export default function BUItems() {

    const [isClicked, setIsclicked] = useState(false)

    const onSendData = () => {
        return setIsclicked(true)
    }
    const onSetData = (thisName) => {
        return thisName
    }
    return (
        <>
            <button type="button" className={"btn btn-primary " + (!isClicked ? 'd-block' : 'd-none')} onClick={onSendData}>Send Data</button>
            {
                (isClicked) ?

                    <APPName changeSetName={onSetData('BUNAMESET')} />
                    :
                    <div>Not Clicked</div>
            }
        </>
    )
}
