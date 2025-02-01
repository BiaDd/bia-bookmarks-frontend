
/**
 * Component properties
 */
interface CardComponentProps {
    imageUrl: string,
    contentTitle: string,
    contentDescription: string
}


const Card = ({ contentTitle, contentDescription, imageUrl }: CardComponentProps) => {
    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-6">
            {/* Image */}
            {imageUrl && (
                <img src={imageUrl} alt={contentTitle} className="w-full h-48 object-cover mb-4 rounded-md" />
            )}

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{contentTitle}</h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4">
                {contentDescription.length > 100 ? `${contentDescription.slice(0, 100)}...` : contentDescription}
            </p>

            {/* Tags
            {tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.split(',').map((tag, index) => (
                        <span key={index} className="text-xs text-white bg-blue-500 rounded-full px-2 py-1">
                            {tag.trim()}
                        </span>
                    ))}
                </div>
            )} */}

            {/* View Button */}
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full mt-4">
                View Bookmark
            </button>
        </div>
    );
};

export default Card