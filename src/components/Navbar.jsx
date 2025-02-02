import { HeartIcon,TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import { Character } from "./CharacterList";

const Navbar = ({ children }) => {
    return (
        <nav className="navbar">
            <Logo />

            {children}
        </nav>
    );
};

export default Navbar;

const Logo = () => {
    return <div className="navbar__logo">Logo ☀️</div>;
};
export const Search = ({ value, onSearch }) => {
    return <input type="text" className="text-field" placeholder="Search ..." value={value} onChange={(e) => onSearch(e.target.value)} />;
};
export const SearchResult = ({ numOfResult }) => {
    return <div className="navbar__result"> Found {numOfResult} characters </div>;
};
export const Favourites = ({ favourites,onDelete }) => {
    const [open, setOpen] = useState(false);
    const onClose = () => setOpen(false);
    return (
        <>
            <Modal open={open} onClose={onClose} title="List of Favourites">
                {favourites.map((item) => (
                    <Character key={item.id} item={item}>
                        <button className="icon red" onClick={() => onDelete(item.id)} >
                            <TrashIcon />
                        </button>
                    </Character>
                ))}
            </Modal>
            <button className="heart" onClick={() => setOpen(true)}>
                <HeartIcon className="icon" />
                <span className="badge">{favourites.length}</span>
            </button>
        </>
    );
};
