import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { serverPath } from "@utils/urls";

export default function PostCarousel({ images }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };
  return (
    <>
      <Carousel
        autoPlay={false}
        navButtonsAlwaysInvisible
        sx={{ mt: "1rem" }}
        indicators={images.length > 1 ? true : false}
      >
        {images?.map((image, i) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "400px",
              overflow: "hidden",
              cursor: "pointer",
            }}
            key={i}
            onClick={() => handleImageClick(image)}
          >
            <img src={serverPath + image} style={{ width: "100%" }} />
          </div>
        ))}
      </Carousel>
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            overflow:"auto"
          }}
          onClick={() => setModalOpen(false)} // Close modal when clicked outside
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "50%",
              maxHeight: "80%",
            }}
            onClick={(e) => e.stopPropagation()} // Prevent modal close when clicked inside
          >
            <img
              src={serverPath + selectedImage}
              style={{ width: "100%", maxHeight: "600px" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
