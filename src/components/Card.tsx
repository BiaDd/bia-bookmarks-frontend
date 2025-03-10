
/**
 * Component properties
 */
interface CardComponentProps {
    key: number,
    bookmark: any,
    cardOnClick: () => void,
    cardActions: any
}


const Card = ({ bookmark, cardOnClick, cardActions }: CardComponentProps) => {
    return (

        <div className="max-w-lg rounded-lg overflow-hidden shadow-lg sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-white p-6" onClick={cardOnClick}>
            {cardActions.deleteBookmark ??
                <button onClick={cardActions.deleteBookmark}>Delete</button>
            }
            {/* Image */}
            {bookmark.image_url && (
                <img src={bookmark.image_url} alt={bookmark.title} className="w-full h-48 object-cover mb-4 rounded-md" />
            )}

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{bookmark.title}</h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 truncate">
                {bookmark.description}
            </p>


        </div>
    );
};

export default Card