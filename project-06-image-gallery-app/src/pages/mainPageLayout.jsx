// react
import { useEffect, useRef, useState } from "react";

// local
import InputSearch from "../components/input/inputSearch";
import ImagePopup from "../components/image/imageInfo";

// toast
import toast from "react-hot-toast";
import fetchAllData from "../services/fetchAllGallery";

// react icons
import { FaCloudDownloadAlt } from "react-icons/fa";
import { BsFillInfoCircleFill } from "react-icons/bs";
import DownloadImage from "../services/downloadImage";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMdArrowRoundForward } from "react-icons/io";

function MainPage() {
    const [inputValue, setInputValue] = useState("");
    const [query, setQuery] = useState("");
    const [allGallery, setAllGallery] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);
    const [imageInfo, setImageInfo] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const boxRef = useRef()

    /*========================================================================================
                                        handle submit search value
    ========================================================================================*/
    function handleSubmitValue(e) {
        e.preventDefault();
        if (inputValue) {
            setQuery(inputValue);
            setInputValue("");
        } else {
            toast.error("please enter your search value!", {
                id: "gallery-toast",
            });
        }
    }

    /*========================================================================================
                                    fetch all data when query changed
    ========================================================================================*/
    useEffect(() => {
        if (!query) return;
        async function fetchData() {
            setLoading(true);
            const data = await fetchAllData(query, pageNumber);
            setLoading(false);
            setAllGallery(data.results || []);
        }
        fetchData();
    }, [query, pageNumber]);

    /*========================================================================================
                                    filter images info
    ========================================================================================*/
    function handleFilterInfo(id) {
        setOpenInfo(true);
        const filteredInfo = allGallery.filter((img) => {
            return img.id === id;
        });
        setImageInfo(filteredInfo.at(0));
    }

    /*========================================================================================
                                    handel handle Decrement page number
    ========================================================================================*/
    function handleDecrement() {
        if (pageNumber <= 1) {
            return;
        } else {
            setPageNumber((prev) => prev - 1);
        }
    }

    /*========================================================================================
                                    handel handle Increment page number
    ========================================================================================*/
    function handleIncrement() {
        setPageNumber((prev) => prev + 1);
    }

    /*========================================================================================
                                    gallery list
    ========================================================================================*/
    const galleryList = allGallery?.map((img) => (
        <div key={img.id} className="gallery-item">
            <img
                src={img.urls.small}
                alt={img.alt_description || "Gallery image"}
            />
            <div className="details">
                <button
                    className="info"
                    onClick={() => handleFilterInfo(img.id)}>
                    <BsFillInfoCircleFill />
                </button>
                <button
                    className="download"
                    onClick={() => DownloadImage(img.links.download_location)}>
                    <FaCloudDownloadAlt />
                </button>
            </div>
        </div>
    ));

    /*========================================================================================
                                    stop scrolling after opening the image info
    ========================================================================================*/
    useEffect(() => {
        if (openInfo) {
            boxRef.current.style.position = "fixed"
            boxRef.current.style.width = "100%"
        } else {
            boxRef.current.style.position = "relative";
        }
    },[openInfo])
    return (
        <>
            <div className="mainPage" ref={boxRef}>
                <div className="header">
                    <p>Find your favorite photos in one place</p>
                </div>
                <div className="form">
                    <form onSubmit={(e) => handleSubmitValue(e)}>
                        <InputSearch
                            inpValue={inputValue}
                            setInputValue={setInputValue}
                        />
                        <button type="submit" title="search">
                            Search
                        </button>
                    </form>
                </div>
                <div className="gallery">
                    {loading ? (
                        <p className="loading">Loading...</p>
                    ) : allGallery.length > 0 ? (
                        galleryList
                    ) : (
                        <div className="empty">
                            <p>
                                There is no images,start search to your best
                                images
                            </p>
                        </div>
                    )}
                </div>
                {allGallery.length > 0 && (
                    <div className="scroll">
                        <button
                            className="back-btn"
                            onClick={() => handleDecrement()}>
                            <IoMdArrowRoundBack />
                        </button>
                        <span>{pageNumber}</span>
                        <button
                            className="Forward-btn"
                            onClick={() => handleIncrement()}>
                            <IoMdArrowRoundForward />
                        </button>
                    </div>
                )}
            </div>
            {openInfo && (
                <ImagePopup
                    img={imageInfo}
                    closePopup={() => setOpenInfo(false)}
                />
            )}
        </>
    );
}

export default MainPage;
