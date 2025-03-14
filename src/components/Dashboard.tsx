import { UserAuth } from '../context/AuthContext';
import { createBookmark, deleteBookmark, getBookmarks, searchMangaApi } from '../api/BiaBookmarksAPI';
import { useEffect, useState } from 'react';
import FormModal from './FormModal';

import CardGrid from './CardGrid';
import Header from './Header';
// import Navbar from './Navbar';

const Dashboard = () => {
  const { session } = UserAuth();
  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
  const [userBookmarks, setUserBookmarks] = useState([]);
  const [mangaName, setMangaName] = useState("");
  const [mangaResults, setMangaResults] = useState([]);
  const [bookmarkInfo, setBookmarkInfo] = useState(null);
  const [isAddBookmarkModal, setIsAddBookmarkModal] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  // const [IsConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  useEffect(() => {
    handleGetBookmarks();
  }, [])

  const handleAddBookmark = async (properties: any) => {
    try {
      const result = await createBookmark(session?.user?.id, session?.access_token, properties);

      // close modal and show success
      if (result) {
        setIsBookmarkModalOpen(false);
      }

    } catch (error) {
      console.error("Error adding bookmark: ", error);
    }
  }

  const handleDeleteBookmark = async (bookmarkInfo: any) => {
    try {
      const result = await deleteBookmark(session?.user?.id, bookmarkInfo.id, session?.access_token)

      if (result) {
        // setIsConfirmationModalOpen(false);
        handleGetBookmarks();
      }
    }
    catch (ex) {
      console.error("Error deleting bookmark: ", ex)
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

  const searchManga = async () => {
    if (!mangaName.trim()) return;
    try {
      const result = await searchMangaApi(session?.user?.id, mangaName, session?.access_token);
      console.log("manga search results", result);
      setMangaResults(result);
    }
    catch (error) {
      console.error("Error finding manga: ", error);
    }
    setHasSearched(true);
  }

  const loadMangaInfo = (manga: any, isAddBookmark: boolean) => {
    setIsAddBookmarkModal(isAddBookmark)
    setBookmarkInfo(manga)
    setIsBookmarkModalOpen(true);
  }

  const handleCloseModal = () => {
    handleGetBookmarks();
    setIsBookmarkModalOpen(false);
  }

  // Group actions in an object
  const cardActions = { deleteBookmark: handleDeleteBookmark };

  return (
    <div>
      <div>
        <Header />
        <label htmlFor="search" className="block text-sm/6 font-medium text-gray-900">Search: </label>
        <input id='search' name='search' type='text' value={mangaName} onChange={(e) => setMangaName(e.target.value)} className='border p-2 flex-1 rounded' />
        <button onClick={searchManga} className='bg-blue-500 text-white px-4 py-2 rounded'>Search</button>
        {hasSearched ? <div id="manga-list" className="flex justify-center w-full max-h-69 overflow-y-auto border rounded-lg shadow p-2 mt-5">
          <ul className='w-full max-h-69 pl-10 pr-10'>
            {mangaResults?.length > 0 ? mangaResults.map((manga: any) => (
              <li onClick={() => loadMangaInfo(manga, true)} key={manga.id} className="border-b py-2 flex flex-row trunc items-center">
                <h3 className="font-bold flex whitespace-nowrap">{manga.title}</h3>
                <p className="text-sm ml-3 truncate">{manga.description}</p>
              </li>
            )) :
              <li>
                No results found
              </li>}
          </ul>
        </div> : <></>}
        {userBookmarks?.length ? <CardGrid items={userBookmarks} cardOnClick={loadMangaInfo} cardActions={cardActions} /> : <p>Nothing added yet!</p>}
      </div>
      {isBookmarkModalOpen &&
        <FormModal bookmarkInfo={bookmarkInfo}
          isOpen={isBookmarkModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleAddBookmark}
          isAddBookmarkModal={isAddBookmarkModal} />}
    </div>
  )
}

export default Dashboard