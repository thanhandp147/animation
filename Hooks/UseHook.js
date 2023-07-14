import { useCallback, useEffect, useRef, useState } from "react"

export const useToggle = (initState = false) => {


    const [state, setState] = useState(initState);

    // use UseCallBack to avoid Re-render Component, cache data function
    const toggle = useCallback(() => {
        setState(_state => !_state)
    }, [])
    return [state, toggle]

}

export const usePrevious = (value) => {


    const ref = useRef();
    useEffect(() => {
        ref.current = value; //assign the value of ref to the argument
    }, [value]); //this code will run when the value of 'value' changes
    return ref.current;
}