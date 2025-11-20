// local
import DownloadImage from "../../services/downloadImage";
import "./imageInfo.css";

// react icons
import { FaCloudDownloadAlt, FaTimes } from "react-icons/fa";

export default function ImagePopup({ img, closePopup }) {
    if (img === null) return null;

    const bestImg = img.urls.raw || img.urls.full;

    return (
        <div className="popup-overlay">
            <div className="popup-box">
                <div className="popup-image">
                    <img src={bestImg} alt={img.alt_description} />
                </div>

                <div className="popup-info">
                    <h2>{img.alt_description || "No Title"}</h2>

                    <p className="image-id">
                        <strong>ID:</strong> {img.id}
                    </p>
                    <div className="img-details">
                        <div>
                            <p>
                                <strong>Likes:</strong> {img.likes || 0}
                            </p>
                            <p>
                                <strong>Created:</strong>{" "}
                                {new Date(img.created_at)
                                    .toISOString()
                                    .split("T")
                                    .at(0)}
                            </p>
                        </div>

                        <div>
                            <p>
                                <strong>Color:</strong>
                                <span
                                    style={{
                                        display: "inline-block",
                                        width: "20px",
                                        height: "20px",
                                        background: img.color,
                                        marginLeft: "10px",
                                        borderRadius: "4px",
                                    }}></span>
                            </p>

                            <p>
                                <strong>Photographer:</strong> {img.user.name}
                            </p>
                        </div>
                    </div>
                    <div className="actions">
                        <button
                            className="download"
                            onClick={() =>
                                DownloadImage(img.links.download_location)
                            }>
                            <FaCloudDownloadAlt />
                        </button>

                        <button
                            className="close-btn"
                            onClick={() => closePopup()}>
                            <span>
                                <FaTimes />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
