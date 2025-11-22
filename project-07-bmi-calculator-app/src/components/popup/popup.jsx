// local
import "./popup.css";

function Popup({ result, onClose, emoji, text }) {
    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-card" onClick={(e) => e.stopPropagation()}>
                <h2 className="popup-title">BMI Result</h2>

                <div className="popup-emoji">
                    <img src={emoji} alt="emoji" />
                </div>

                <p className="popup-value">{result}</p>
                <p className="popup-text">{text}</p>

                <button className="popup-close" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default Popup