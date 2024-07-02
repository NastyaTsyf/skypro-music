const apiUrl = 'https://skypro-music-api.skyeng.tech/catalog/'


type likeTrackFetchType ={
  access: string | null,
  id: string
}

export async function getTracks() {
  const res = await fetch(apiUrl + "track/all/");

  if (!res.ok) {
    throw new Error('Ошибка при получении данных');
  }

  return res.json();
}

export async function getPlaylist(id: string) {
  const res = await fetch(apiUrl + "selection/" + id);

  if (!res.ok) {
    throw new Error('Ошибка при получении данных');
  }

  const data = await res.json()

  return data.items;
}

export async function fetchFavoriteTracks(access: string) {
  const response = await fetch(apiUrl + "track/favorite/all/",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
  if (!response.ok) {
    throw new Error("ошибка при получении данных")  
  }
  return response.json()
}

export async function likeTrackFetch({access, id}: likeTrackFetchType) {
  const response = await fetch(apiUrl + `track/${id}/favorite/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
  if (!response.ok) {
    throw new Error("ошибка при отправке данных")  
  }
  return response.json()
}

export async function dislikeTrackFetch({access, id}: likeTrackFetchType) {
  const response = await fetch(apiUrl + `track/${id}/favorite/`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
  if (!response.ok) {
    throw new Error("ошибка при отправке данных")  
  }
  return response.json()
}


