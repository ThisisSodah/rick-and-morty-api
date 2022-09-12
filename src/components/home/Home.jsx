import { Typography } from "@mui/material";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getCharactersPage, getLocationDetails } from "../../api";
import { CharacterCard } from "./CharacterCard";

const getIdFromURL = (url) => {
    let urlParams = url.split("/");
    const id = urlParams[urlParams.length-1];
    return id;
}
let infiPage = 1;
let locationData = {};

export const Home = () => {
    const [characters, setCharacters] = React.useState([]);
    const [initialLoading, setInitialLoading] = React.useState(false);

    // Accepts data as argument passed, adds relevant location and origin data and returns the same modified data
    const getMoreDetails = async (data = []) => {
        for(const char of data){
            if(char.origin?.url){
                const id = getIdFromURL(char.origin?.url)
                if(!locationData[id]){
                    locationData[id] = await getLocationDetails(id);
                } 
            char.originData = locationData[id];
            }
            if(char.location?.url){
                const id = getIdFromURL(char.location?.url)
                if(!locationData[id]){
                    locationData[id] = await getLocationDetails(id);
                } 
            char.locationData = locationData[id];
            }
        }
        return data;
    }

    // Loads characters pagewise
	const loadData = async (page = 1) => {
        if (page === 1) {
            setInitialLoading(true);
		} else {
			infiPage = page;
        }
        try {
			let data = await getCharactersPage(page);
            data = await getMoreDetails(data);
			let newChars = [...characters,];
			if (newChars.length) {
                // if length is true (>0), concat latest data to current array
				newChars = newChars.concat(data);
			} else {
                //If length is false (0), this happens on initial load
				newChars = [...data];
			}
            setCharacters(newChars);
        } catch (error) {
            console.error(error);
        }
        setInitialLoading(false);
    };

    React.useEffect(() => {
        loadData();
    }, []);

    const renderLoader = () => {
        return <h4 style={{color:"white", alignSelf: "center"}}>Loading...</h4>;
    };

    const renderCharacters = () => {
		return (
			<InfiniteScroll
				className="charactersList"
                dataLength={characters.length}
                next={() => loadData(infiPage + 1)}
				hasMore={true}
				loader={<h4 style={{color:"white", alignSelf: "center"}}>Loading...</h4>}
			>
                {characters.map((char, index) => {
                    return (
                        <div className="flexBasis pl2 pr2"  style={{color: "white"}} key={index}>
                            <CharacterCard data={char} />
                        </div>
                    );
                })}
            </InfiniteScroll>
        );
    };

    return (
        <div>
            <Typography variant="h5" style={{ color: "white", paddingBottom: "2rem"}}>List of characters:</Typography>
            {initialLoading ? renderLoader() : renderCharacters()}
        </div>
    );
};
