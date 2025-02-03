import React from 'react'
import Card from './Card';

interface CardGrid {
    items: BookmarkProps[]
}

interface BookmarkProps {
    url: string,
    title: string,
    description: string,
    image_url: string,
    tags: string[]
}


const CardGrid = ({ items }: CardGrid) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
            {items.map((item: BookmarkProps, index: number) => (
                <li key={index} className='list-none'>
                    <Card
                        key={index}
                        contentUrl={item.url}
                        contentTitle={item.title}
                        contentDescription={item.description}
                        imageUrl={item.image_url}
                    />
                </li>
            ))}
        </div>
    );
}

export default CardGrid