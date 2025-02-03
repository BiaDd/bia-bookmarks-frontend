
/**
 * Component properties
 */
interface CardComponentProps {
    key: number,
    imageUrl: string,
    contentTitle: string,
    contentDescription: string
    contentUrl: string
}


const Card = ({ contentTitle, contentDescription, imageUrl, contentUrl }: CardComponentProps) => {
    return (
        <div className="max-w-lg rounded-lg overflow-hidden shadow-lg sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-white p-6">
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

        </div>
    );
};

export default Card