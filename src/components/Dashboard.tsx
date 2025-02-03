import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createBookmark, getBookmarks } from '../api/BiaBookmarksAPI';
import { useEffect, useState } from 'react';
import FormModal from './FormModal';

import CardGrid from './CardGrid';
import Header from './Header';
// import Navbar from './Navbar';

const Dashboard = () => {
  const { session, signOutUser } = UserAuth();
  const [isCreateBookmarkModalOpen, setIsCreateBookmarkModalOpen] = useState(false);
  const [userBookmarks, setUserBookmarks] = useState([]);

  useEffect(() => {
    handleGetBookmarks();
  }, [])

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

  const handleAddBookmark = async (properties: any) => {
    try {
      const result = await createBookmark(session?.user?.id, session?.access_token, properties);

      // close modal and show success

    } catch (error) {
      console.error("Error adding bookmark: ", error);
    }
  }

  const handleGetBookmarks = async () => {
    try {
      const result = await getBookmarks(session?.user?.id, session?.access_token);

      setUserBookmarks(result.bookmarks);
    } catch (error) {
      console.error("Error getting bookmarks: ", error);
    }
  }

  return (
    <div>
      <div>
        <Header />
        <button onClick={() => { setIsCreateBookmarkModalOpen(true) }} className='rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Add Bookmark+</button>
        <CardGrid items={userBookmarks} />
      </div>
      {isCreateBookmarkModalOpen &&
        <FormModal modalTitle="Create Bookmark"
          isOpen={isCreateBookmarkModalOpen}
          onClose={() => { setIsCreateBookmarkModalOpen(false) }}
          onSubmit={handleAddBookmark} />}
    </div>
  )
}

export default Dashboard