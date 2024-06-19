const apiUrl = 'https://skypro-music-api.skyeng.tech/catalog/track/all/'
const playlistUrl ='	https://skypro-music-api.skyeng.tech/catalog/selection/'

export async function getTracks() {
  const res = await fetch(apiUrl);

  if (!res.ok) {
    throw new Error('Ошибка при получении данных');
  }

  return res.json();
}

export async function getPlaylist(id: string) {
  const res = await fetch(playlistUrl + id);

  if (!res.ok) {
    throw new Error('Ошибка при получении данных');
  }

  const data = await res.json()

  return data.items;
}
