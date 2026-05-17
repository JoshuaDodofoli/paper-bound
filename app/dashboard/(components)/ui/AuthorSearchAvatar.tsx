'use client'

import { useState } from 'react';
import Image from 'next/image';

interface AuthorSearchAvatarProps {
    name: string;
    olid: string;
    className?: string;
    size?: number;
}

export default function AuthorSearchAvatar({ name, olid, className = "", size = 48 }: AuthorSearchAvatarProps) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className={`relative w-12 h-12 rounded-full bg-dark-grey/5 border border-stone/50 flex items-center justify-center font-serif text-dark-grey font-bold text-base shadow-xs overflow-hidden shrink-0 ${className}`}>
            {!imgError && olid ? (
                <Image
                    src={`https://covers.openlibrary.org/a/olid/${olid}-M.jpg`}
                    alt={name}
                    fill
                    sizes={`${size}px`}
                    className="object-cover object-center"
                    onError={() => setImgError(true)}
                />
            ) : (
                <span>{name.charAt(0)}</span>
            )}
        </div>
    );
}
