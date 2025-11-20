async function DownloadImage(downloadLocationUrl) {
    try {
        const res = await fetch(`${downloadLocationUrl}&client_id=YOUR_ACCESS_KEY`);
        const data = await res.json();

        const realImageUrl = data.url;

        const imgRes = await fetch(realImageUrl);
        const blob = await imgRes.blob();

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "unsplash-image.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (err) {
        console.error("Download error:", err);
    }
}


export default DownloadImage;