import { UserAuth } from '../context/AuthContext';
import { createBookmark, getBookmarks } from '../api/BiaBookmarksAPI';
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

  useEffect(() => {
    handleGetBookmarks();
  }, [])

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

  const searchManga = async () => {
    if (!mangaName.trim()) return;
    const url = `https://api.mangadex.org/manga?title=${encodeURIComponent(mangaName)}&includes[]=cover_art`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.data) {
        setMangaResults(data.data.map((manga: any) => {
          const cover = manga.relationships.find((rel: any) => rel.type === "cover_art");
          const coverFileName = cover?.attributes?.fileName;
          const coverUrl = coverFileName
            ? `https://uploads.mangadex.org/covers/${manga.id}/${coverFileName}`
            : null;

          const mangaUrl = `https://mangadex.org/title/${manga.id}`;

          return {
            id: manga.id,
            title: manga.attributes.title.en || "No English Title",
            description: manga.attributes.description.en || "No English Description Available",
            image_url: coverUrl,
            url: mangaUrl
          }
        }))
      }

    } catch (error) {
      console.error("Error fetching manga:", error);
      return [];
    }
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

  return (
    <div>
      <div>
        <Header />
        <label htmlFor="search" className="block text-sm/6 font-medium text-gray-900">Search: </label>
        <input id='search' name='search' type='text' value={mangaName} onChange={(e) => setMangaName(e.target.value)} className='border p-2 flex-1 rounded' />
        <button onClick={searchManga} className='bg-blue-500 text-white px-4 py-2 rounded'>Search</button>
        <div id="manga-list" className="flex justify-center w-full max-h-69 overflow-y-auto border rounded-lg shadow p-2 mt-5">
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
        </div>
        {userBookmarks?.length ? <CardGrid items={userBookmarks} cardOnClick={loadMangaInfo} /> : <p>Nothing added yet!</p>}
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