document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll("img");

    images.forEach((img) => {
        img.addEventListener("click", () => {
            const overlay = document.createElement("div");
            overlay.className = "image-overlay";

            const largeImg = document.createElement("img");
            largeImg.src = img.src;
            largeImg.className = "large-image";

            overlay.appendChild(largeImg);
            document.body.appendChild(overlay);

            overlay.addEventListener("click", () => {
                document.body.removeChild(overlay);
            });
        });
    });
});