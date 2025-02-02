import { useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";


const useCharacters = (query) => {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        // if (query.length < 3) {
        //     setCharacters([]);
        //     return;
        // }

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get(`https://rickandmortyapi.com/api/character?name=${query}`);
                setCharacters(data.results.slice(0, 5));
            } catch (error) {
                toast.error(error.response.data.error);
                setCharacters([]);
            } finally {
                setIsLoading(false);
            }
        };

        const timer = setTimeout(() => {
            fetchData();
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    return {isLoading,characters}
}

export default useCharacters;