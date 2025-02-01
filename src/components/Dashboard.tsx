import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createBookmark } from '../api/BiaBookmarksAPI';
import { useState } from 'react';
import FormModal from './FormModal';
import Card from './Card';
// import Navbar from './Navbar';

const Dashboard = () => {
  const { session, signOutUser } = UserAuth();
  const [isCreateBookmarkModalOpen, setIsCreateBookmarkModalOpen] = useState(false);

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
      const result = await createBookmark(session?.user?.id, sessionStorage.getItem("jwt_token"), properties);
      
      console.log(result);
    } catch (error) {
      console.error("Error adding bookmark: ", error);
    }
  }

  return (
    <div>
      <div>
        {/* <Navbar signOut={handleSignout} /> */}
        <h2>Welcome {session?.user?.email}</h2>
        <p onClick={handleSignout} className='hover:cursor-pointer border inline-block px-4 py-3 mt-4'>Sign out</p>
        <h3>Here are your bookmarks <button onClick={() => { setIsCreateBookmarkModalOpen(true) }} className='rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Add Bookmark+</button></h3>
        <Card imageUrl="" contentTitle='hello' contentDescription='hi' />
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