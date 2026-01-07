import Link from 'next/link';
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonBaseProps {
    variant?: ButtonVariant;
    className?: string;
    children: React.ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
    ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: never;
    };

type ButtonAsLink = ButtonBaseProps &
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
        href: string;
    };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-brand text-white hover:bg-red-700',
    secondary: 'border border-white text-white hover:bg-white hover:text-black',
    outline: 'border border-foreground rounded-full hover:bg-brand hover:border-brand',
};

export default function Button({
    variant = 'primary',
    className = '',
    children,
    ...props
}: ButtonProps) {
    const baseStyles = 'px-8 py-4 font-sans font-bold uppercase tracking-widest text-xs transition-colors';
    const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

    if ('href' in props && props.href) {
        return (
            <Link href={props.href} className={styles}>
                {children}
            </Link>
        );
    }

    return (
        <button className={styles} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
            {children}
        </button>
    );
}
