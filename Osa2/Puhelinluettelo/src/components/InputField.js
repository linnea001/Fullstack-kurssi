//teht 2.6-2.10
import React from 'react'

const InputField = (props) => {
    return (
        <div>
            {props.name}: <input
            value={props.value}
            onChange={props.onChange}
        />
        </div>
    )
}
export default InputField