async function DownloadImage(downloadLocationUrl) {
    try {
        const res = await fetch(`${downloadLocationUrl}?client_id=p4WUHez9nyI3I1lPg8WbZOS2x85gc15dhwBq5NfmdHE`);
        const data = await res.json();

        const realImageUrl = data.url;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = realImageUrl;

        await img.decode();

        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "image.jpg";
            link.click();
        }, "image/jpeg", 0.95);

    } catch (err) {
        console.error(err);
    }
}

export default DownloadImage