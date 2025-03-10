import Card from './Card';

interface CardGrid {
    items: any[]
    cardOnClick: (bookmark: any, isAddBookmark: boolean) => void
    cardActions: object
}


const CardGrid = ({ items, cardOnClick, cardActions }: CardGrid) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
            {items.map((bookmark: any, index: number) => (
                <li key={index} className='list-none'>
                    <Card
                        key={index}
                        bookmark={bookmark}
                        cardOnClick={() => cardOnClick(bookmark, false)}
                        cardActions={cardActions}
                    />
                </li>
            ))}
        </div>
    );
}

export default CardGrid