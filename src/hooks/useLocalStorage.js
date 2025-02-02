import { useEffect, useState } from "react";

const useLocalStorage = (key, intialValue) => {
    const [value, setValue] = useState(JSON.parse(localStorage.getItem(key)) || intialValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
};

export default useLocalStorage;
