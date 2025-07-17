import { Avatar, AvatarFallback, AvatarImage } from "../UI/Avtar";

interface AvatarProfileProps {
    src?: string;
    alt?: string;
    width?: string;
    height?: string;
    className?: string;
    fallbackText?: string;
}

const AvatarProfile = ({ src, alt, width, height,className, fallbackText }: AvatarProfileProps) => {
    return (
            <Avatar 
                className={`relative flex size-8 shrink-0 overflow-hidden rounded-full ${width} ${height} ${className}`}
                data-slot="avatar"
            >
                            <AvatarImage src={
                                src || "https://www.gravatar.com/avatar/" + encodeURIComponent(alt || "User")
                            } />
                            <AvatarFallback>
                                <span className="text-sm">{fallbackText || "User"}</span>
                            </AvatarFallback>
                        </Avatar>
    )
}

export default AvatarProfile;