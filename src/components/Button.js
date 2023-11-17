import React from 'react'

const Button = ({ onClick,type, children, className, name }) => {
    return (
        <button onClick={onClick} type={type} name={name} className={className}>{children}</button>
    )
}

export default Button