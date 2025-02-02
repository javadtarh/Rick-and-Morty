import { useState } from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Favourites, Search, SearchResult } from "./components/Navbar";
import useCharacters from "./hooks/useCharacters";
import useLocalStorage from "./hooks/useLocalStorage";

const App = () => {
    
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [favourites, setFavourites] = useLocalStorage("favourites",[])

    const {isLoading,characters} = useCharacters(query)
    

    // const [timer, setTimer] = useState(null)

    // const handelSearchCharacter = (e) => {
    //     const value = e.target.value
    //     setQuery(value)

    //     clearTimeout(timer)

    //     const typingTimer = setTimeout(async() => {

    //         try {
    //             const { data } = await axios.get(`https://rickandmortyapi.com/api/character?name=${value}`);
    //             setCharacters(data.results.slice(0, 5));
    //         } catch (error) {
    //             setCharacters([])
    //         }
    //     },800)

    //     setTimer(typingTimer)

    // }

    const handelSelectCharacter = (id) => {
        setSelectedId((prev) => (id === prev ? null : id));
    };

    const handelAddFavourites = (character) => {
        setFavourites((prevchar) => [...prevchar, character]);
    };

    const handelRemoveFavourites = (id) => {
        setFavourites((prev) => prev.filter((item) => item.id !== id));
    };




    const isAddedToFavourite = favourites.map((fav) => fav.id).includes(selectedId);

    return (
        <div className="app">
            <Toaster />

            <Navbar>
                <Search value={query} onSearch={setQuery} />
                <SearchResult numOfResult={characters.length} />
                <Favourites favourites={favourites} onDelete={handelRemoveFavourites} />
            </Navbar>
            <Main>
                <CharacterList isLoading={isLoading} character={characters} onSelectCharacter={handelSelectCharacter} selectedId={selectedId} />
                <CharacterDetail selectedId={selectedId} onAddFavourite={handelAddFavourites} isAddedToFavourite={isAddedToFavourite} />
            </Main>

        </div>
    );
};

export default App;

const Main = ({ children }) => {
    return <div className="main">{children}</div>;
};
