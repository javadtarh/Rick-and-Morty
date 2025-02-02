import React, { useEffect, useState } from "react";
// import { character } from "../../data/data";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Loader from "./Loader";
import toast from "react-hot-toast";

const CharacterDetail = ({ selectedId, onAddFavourite, isAddedToFavourite }) => {
    const [character, setCharacter] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setCharacter(null);
                const { data } = await axios.get(`https://rickandmortyapi.com/api/character/${selectedId}`);
                data && setCharacter(data);

                const episodesId = data.episode.map((e) => e.split("episode/")[1]);

                const { data: episodeData } = await axios.get(`https://rickandmortyapi.com/api/episode/${episodesId}`);

                setEpisodes([episodeData].flat().slice(0, 6));
            } catch (error) {
                toast.error(error.response.data.error);
            } finally {
                setIsLoading(false);
            }
        };

        selectedId && fetchData();
    }, [selectedId]);

    if (isLoading)
        return (
            <div style={{ flex: 1 }}>
                <Loader />
            </div>
        );

    if (!selectedId || !character) return <div style={{ flex: 1, color: "var(--slate-300)" }}>Please select a character</div>;

    return (
        <div style={{ flex: 1 }}>
            <CharacterSubInfo character={character} isAddedToFavourite={isAddedToFavourite} onAddFavourite={onAddFavourite}  />
            <EpisodeList episodes={episodes} />
        </div>
    );
};

export default CharacterDetail;

const CharacterSubInfo = ({ character, isAddedToFavourite,onAddFavourite }) => {
    return (
        <div className="character-detail">
            <img src={character.image} alt={character.name} className="character-detail__img" />
            <div className="character-detail__info">
                <h3 className="name">
                    <span>{character.gender === "Male" ? "🙍‍♂️" : "🙍‍♀️"}</span>
                    <span>&nbsp;{character.name}</span>
                </h3>
                <div className="info">
                    <span className={`status ${character.status === "Dead" ? "red" : ""}`}></span>
                    <span>&nbsp;{character.status}</span>
                    <span> -&nbsp;{character.species}</span>
                </div>
                <div className="location">
                    <p>Last Know Location: </p>
                    <p>{character.location.name}</p>
                </div>
                <div className="actions">
                    {isAddedToFavourite ? (
                        <p>Already Added To Favourites ✅</p>
                    ) : (
                        <button onClick={() => onAddFavourite(character)} className="btn btn--primary">
                            Add To Favourite
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const EpisodeList = ({episodes}) => {
    const [sortBy, setSortBy] = useState(true)

    let sortedEpisodes

    if(sortBy) {
        sortedEpisodes = [...episodes].sort((a,b) => new Date(a.created) - new Date(b.created))
    } else {
        sortedEpisodes = [...episodes].sort((a,b) => new Date(b.created) - new Date(a.created))
    }
    return (
        <div className="character-episodes">
            <div className="title">
                <h2>List of Episodes</h2>
                <button onClick={() => setSortBy(is => !is)}>
                    <ArrowUpCircleIcon className="icon" style={{rotate: sortBy ? "0deg" : "180deg"}}  />
                </button>
            </div>

            <ul>
                {sortedEpisodes.map((item, index) => (
                    <li key={item.id}>
                        <div>
                            {String(index + 1).padStart(2, "0")} {item.episode} : <strong>{item.name}</strong>
                        </div>
                        <div className="badge badge--secondary">{item.air_date}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
