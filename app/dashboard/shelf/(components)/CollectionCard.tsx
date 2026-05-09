import React from 'react'

interface CollectionCardProps {
    collectionName: string;
    viewMode?: 'grid' | 'list';
}

const CollectionCard = ({ collectionName, viewMode = 'grid' }: CollectionCardProps) => {
    const isList = viewMode === 'list';

    return (
        <div
            className={`w-full bg-green-200 rounded-xl shadow-book hover:shadow-book-hover relative overflow-hidden transition-shadow ${isList ? 'h-24' : 'aspect-video'}`}
        >
            <div className="bg-blue-200 w-full h-full rounded-xl">
                <div
                    className={`flex bg-linear-to-t from-paper/20 via-transparent via-30% to-transparent justify-start h-full rounded-xl ${isList ? 'pb-0 items-center' : 'items-end'}`}
                >
                    <div
                        className={`flex flex-col items-start justify-center ${isList ? 'px-4' : 'px-5 pb-2'}`}
                    >
                        <p
                            className="text-dark-grey font-medium text-lg"
                        >
                            {collectionName}
                        </p>
                        <span
                            className='pb-2 text-sm opacity-90'
                        >
                            0 books
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollectionCard