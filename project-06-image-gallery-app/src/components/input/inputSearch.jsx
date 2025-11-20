// local
import "./inputSearch.css"

function InputSearch({ inpValue, setInputValue }) {
    return (
        <>
            <input type="text" placeholder="search..." value={inpValue} onChange={(e)=>setInputValue(e.target.value)}/>
        </>
    );
}

export default InputSearch;