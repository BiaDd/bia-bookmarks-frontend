// fetch the pictures from the bucket
const api_link = import.meta.env.VITE_APP_BACKEND_API || "http://localhost:8000";

/**
 * Add bookmark
 * @param user_id 
 * @param token 
 * @param properties 
 * @returns 
 */
export const createBookmark = async (user_id: string, token: string | null = "", properties: any) => {
    try {
        const response = await fetch(`${api_link}/${user_id}/bookmarks/addBookmark`, {
            "method": "POST",
            "body": JSON.stringify(properties),
            "headers": {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${token}`,  // Pass JWT token in the Authorization header
            }
        });

        if (response) {
            return response;
        }

        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
}

/**
 * Delete bookmark
 * @param user_id 
 * @param bookmark_id 
 * @param token 
 * @returns 
 */
export const deleteBookmark = async (user_id: string, bookmark_id: string, token: string) => {
    try {
        const res = await fetch(`${api_link}/${user_id}/${bookmark_id}/bookmarks/getBookmarks`, {
            "method": "POST",
            "headers": {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${token}`,  // Pass JWT token in the Authorization header
            }
        });
        if (res.status === 200) {
            return await res.json();
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
}

/**
 * Get all bookmarks associated with user
 * @param user_id 
 * @param token 
 * @returns 
 */
export const getBookmarks = async (user_id: string, token: string) => {
    try {
        const res = await fetch(`${api_link}/${user_id}/bookmarks/getBookmarks`, {
            "method": "GET",
            "headers": {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${token}`,  // Pass JWT token in the Authorization header
            }
        });
        if (res.status === 200) {
            return await res.json();
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
}