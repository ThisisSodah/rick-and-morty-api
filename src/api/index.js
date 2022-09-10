// Common post which stringifies body and returns data in json format
const _post = async (url = "", options = {}, data = {}) => {
    if (!url) {
        throw new Error("Invalid params");
    }
	const res = await fetch(url, { ...options, body: JSON.stringify(data) });
	return await res.json();
};

// Common get which uses fetch to get data and returns data in json format
const _get = async (url = "", options = {}) => {
    if (!url) {
        throw new Error("Invalid params");
    }
	const res = await fetch(url, { ...options});
	return await res.json();
};

export const getCharactersPage = async (page) => {
    const url = `https://rickandmortyapi.com/api/character/?page=${page}`;
	const res = await _get(url, { method: "GET", });
	const { results } = res;
	if (results?.length) {
		return results;
	} return [];
};

export const getSingleCharacter = async (charId = "") => {
	const url = `https://rickandmortyapi.com/api/character/${charId}`;
	return await _get(url, { method: "GET" });
}

