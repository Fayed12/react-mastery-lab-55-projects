// react
import { useState, useEffect } from "react";

// local
import fetchQuote from "./services/fetchQuote";

function App() {
    const [quote, setQuote] = useState({});
    const [loading, setLoading] = useState(false);

    /*========================================================================================
                            function change quote
    ========================================================================================*/
    async function handleChangeQuote() {
        setLoading(true);
        const data = await fetchQuote();
        setLoading(false);
        setQuote(data);
    }

    /*========================================================================================
                            get random quote in first render
    ========================================================================================*/
    useEffect(() => {
        async function firstFetch() {
            setLoading(true);
            const data = await fetchQuote();
            setLoading(false);
            setQuote(data);
        }
        firstFetch();
    }, []);
    return (
        <div className="page">
            <div className="card">
                <p className="date">• {quote?.dateAdded}</p>
                {loading ? (
                    <div className="spinner-container">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <>
                        <p className="body"> “ {quote?.content} ”</p>
                        <p className="author">— {quote?.author}</p>
                    </>
                )}

                <div className="buttons">
                    <a
                        href="#"
                        target="_blank"
                        className="icon-btn"
                        title="source">
                        🔗
                    </a>

                    <button
                        className="next-btn"
                        onClick={() => handleChangeQuote()}>
                        Next →
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
