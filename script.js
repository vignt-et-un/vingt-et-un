const track = document.querySelector("[data-slider-track]");
const prevButton = document.querySelector("[data-slider-prev]");
const nextButton = document.querySelector("[data-slider-next]");
const dots = Array.from(document.querySelectorAll("[data-slider-dot]"));
const lightbox = document.querySelector("[data-lightbox]");
const lightboxPreview = document.querySelector("[data-lightbox-preview]");
const lightboxClose = document.querySelector("[data-lightbox-close]");

if (track && prevButton && nextButton && dots.length) {
  let currentIndex = 0;
  const slideCount = dots.length;

  const showSlide = (index) => {
    currentIndex = (index + slideCount) % slideCount;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === currentIndex);
      dot.setAttribute("aria-current", dotIndex === currentIndex ? "true" : "false");
    });
  };

  prevButton.addEventListener("click", () => showSlide(currentIndex - 1));
  nextButton.addEventListener("click", () => showSlide(currentIndex + 1));

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => showSlide(dotIndex));
  });

  showSlide(0);
}

if (lightbox && lightboxPreview && lightboxClose) {
  const openLightbox = (image) => {
    lightboxPreview.src = image.currentSrc || image.src;
    lightboxPreview.alt = image.alt;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxPreview.src = "";
    lightboxPreview.alt = "";
  };

  document.querySelectorAll("[data-lightbox-image]").forEach((image) => {
    image.addEventListener("click", () => openLightbox(image));
  });

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
}
