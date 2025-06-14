import React from 'react'
import classNames from 'classnames';
import './Button.css'

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    disabled = false,
    className = '',
}) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classNames("button", variant, className)} >
        {children}
    </button>
  )
}

export default Button