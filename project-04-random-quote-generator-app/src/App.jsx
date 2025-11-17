
const qotd_date = "2025-11-18";
const url ="https://favqs.com/quotes/michelangelo/1999-the-best-artis-"; const
          body = "The best artist has that thought alone Which is contained within the marble shell The sculptor's hand can only break the spellTo free the figures slumbering in the stone."
          const author = "Michelangelo";
function App() {
          return (
              <div className="page">
                  <p className="date">Quote of the day • {qotd_date}</p>

                  <div className="card">
                      <p className="body">{body}</p>
                      <p className="author">— {author}</p>

                      <div className="buttons">
                          <a href={url} target="_blank" className="icon-btn">
                              🔗
                          </a>

                          <button className="next-btn">Next →</button>
                      </div>
                  </div>
              </div>
          );
}

export default App