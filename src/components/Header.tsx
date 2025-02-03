import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Header() {
    const { signOutUser } = UserAuth();
    const navigate = useNavigate();

    const handleSignout = async (e: any) => {
        e.preventDefault();
        try {
            await signOutUser();
            navigate("/");
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    }
    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="text-lg font-bold">
                Bia 💩 Bookmarks
            </div>
            <button
                className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={handleSignout}
            >
                Sign Out
            </button>
        </header>
    )
}

export default Header