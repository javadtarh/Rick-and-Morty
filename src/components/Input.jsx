import { forwardRef } from "react";


const Input = forwardRef(({name},ref) => {
    return (
        <label>
            <span>{name}:</span>
            <input type="text" name="" id="" ref={ref} />
        </label>
    );
})

export default Input;