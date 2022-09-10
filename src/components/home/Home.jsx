import React from "react";
import { getCharactersPage } from "../../api";

export const Home = () => {
	const [characters, setCharacters] = React.useState([]);
	const loadData = async (page = 1) => {
		try {
			const data = await getCharactersPage(page);
			console.log(data);
			setCharacters(data);
		} catch (error) {
			console.error(error);
		}
	}
    React.useEffect(() => {
        loadData();
    }, []);
    return <div>Home</div>;
};
