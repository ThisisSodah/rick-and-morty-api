// Common post method which stringifies body and returns data in json format
// const _post = async (url = "", options = {}, data = {}) => {
//     if (!url) {
//         throw new Error("Invalid params");
//     }
// 	const res = await fetch(url, { method: "POST", ...options, body: JSON.stringify(data) });
// 	return await res.json();
// };

// Common get method which uses fetch to get data and returns data in json format
const _get = async (url = "", options = {}) => {
    if (!url) {
        throw new Error("Invalid params");
    }
	const res = await fetch(url, { method: "GET", ...options});
	return await res.json();
};

export const getCharactersPage = async (page) => {
    const url = `https://rickandmortyapi.com/api/character/?page=${page}`;
	const res = await _get(url);
	const { results } = res;
	if (results?.length) {
		return results;
	} return [];
};

export const getSingleCharacter = async (charId = "") => {
	const url = `https://rickandmortyapi.com/api/character/${charId}`;
	return await _get(url);
}

export const getLocationDetails = async (id) => {
	const url = `https://rickandmortyapi.com/api/location/${id}`;
	const {name, type, residents, dimension} =  await _get(url);
	const data  = {
		name,
		type,
		dimension,
	}
	if(residents?.length){
		data.residentsCount = residents.length;
	}
	return data;
}
