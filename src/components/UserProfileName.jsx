import { Avatar } from "@mui/material";

const UserProfileImage = () => {
    const { data: session, status } = useSession();

    if (!session?.user) {
        return <div>Not logged in</div>;
    }

    const { username, image } = session.user;

    return (
        <div>
            
            <Avatar alt={username} src={image} />
            
        </div>
    );
};

export default UserProfileImage;