import React from 'react'

const InputBox = ({ onChange, type, className, id, name, value, placeholder, disabled, checked, onKeyUp }) => {
    return (
        disabled
            ?
            <input onChange={onChange} onKeyUp={onKeyUp} type={type} className={className} id={id} name={name} value={value} placeholder={placeholder} checked={checked} disabled={disabled} />
            :
            <input onChange={onChange} onKeyUp={onKeyUp} type={type} className={className} id={id} name={name} value={value} placeholder={placeholder} checked={checked} />

    )
}

export default InputBox