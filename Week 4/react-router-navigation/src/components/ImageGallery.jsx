import { useEffect, useRef, useState } from "react";

function ImageGallery() {
  const images = [
    "https://picsum.photos/id/1015/600/400",
    "https://picsum.photos/id/1016/600/400",
    "https://picsum.photos/id/1018/600/400",
    "https://picsum.photos/id/1025/600/400",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const galleryRef = useRef(null);

  // =========================
  // KEYBOARD EVENTS
  // =========================
  useEffect(() => {
    const handleKeyDown = (e) => {
      console.log("Key pressed:", e.key);

      // LEFT ARROW
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => {
          if (prev === 0) {
            return images.length - 1;
          }

          return prev - 1;
        });
      }

      // RIGHT ARROW
      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => {
          if (prev === images.length - 1) {
            return 0;
          }

          return prev + 1;
        });
      }

      // SPACEBAR
      if (e.code === "Space") {
        e.preventDefault();

        if (!document.fullscreenElement) {
          galleryRef.current.requestFullscreen();
          setIsFullscreen(true);
        } else {
          document.exitFullscreen();
          setIsFullscreen(false);
        }
      }

      // ESCAPE
      if (e.key === "Escape") {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }

        setIsFullscreen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // =========================
  // CLICK IMAGE
  // =========================
  const handleImageClick = () => {
    setSelectedImage(currentIndex);
  };

  // =========================
  // FULLSCREEN CHANGE
  // =========================
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <div
      ref={galleryRef}
      style={{
        textAlign: "center",
        padding: "30px",
        backgroundColor: isFullscreen ? "black" : "white",
        color: isFullscreen ? "white" : "black",
        minHeight: isFullscreen ? "100vh" : "auto",
      }}
    >
      <h2>Image Gallery</h2>

      {/* IMAGE */}
      <img
        src={images[currentIndex]}
        alt={`Gallery ${currentIndex + 1}`}
        onClick={handleImageClick}
        style={{
          width: isFullscreen ? "100vw" : "600px",
          height: isFullscreen ? "80vh" : "400px",
          objectFit: "contain",
          cursor: "pointer",
        }}
      />

      <p>
        Image {currentIndex + 1} of {images.length}
      </p>

      {/* SELECTED IMAGE */}
      {selectedImage !== null && (
        <p>
          Selected Image: {selectedImage + 1}
        </p>
      )}

      {/* INSTRUCTIONS */}
      <div>
        <p>← Left Arrow = Previous Image</p>
        <p>→ Right Arrow = Next Image</p>
        <p>Space = Toggle Fullscreen</p>
        <p>Escape = Close Fullscreen</p>
        <p>Click Image = Select Image</p>
      </div>
    </div>
  );
}

export default ImageGallery;