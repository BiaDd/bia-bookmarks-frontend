// fetch the pictures from the bucket
const api_link = import.meta.env.VITE_APP_BACKEND_API || "http://localhost:8000";


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
        console.log(response);

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

export const deleteBookmark = async (user_id: string) => {
    try {
        const res = await fetch(`${api_link}/${user_id}/bookmarks/getBookmarks`, {
            "method": "GET",
            "headers": {
                'Content-Type': 'application/json',
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

export const fetchBookmarks = async (user_id: string) => {
    try {
        const res = await fetch(`${api_link}/${user_id}/bookmarks/getBookmarks`, {
            "method": "GET",
            "headers": {
                'Content-Type': 'application/json',
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