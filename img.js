const ACCESS_KEY = "BtU7MdmfY_pRlGEd1AUzyuSRxVcM0MVoq7J6SOmpTtg";
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const imageGrid = document.getElementById("imageContainer");
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeModal = document.getElementsByClassName("close")[0];
const shareFacebook = document.getElementById("shareFacebook");
const shareTwitter = document.getElementById("shareTwitter");
const shareInstagram = document.getElementById("shareInstagram");
const shareWhatsApp = document.getElementById("shareWhatsApp");
const shareIcon = document.getElementById("shareIcon");
const shareButtons = document.getElementById("shareButtons");
const loadingIcon = document.getElementById("loadingIcon");
const themeSwitch = document.querySelector(".theme-switch__checkbox");

let currentQuery = '';
let currentPage = 1;
let isLoading = false;

// Function to fetch images from Unsplash API
async function fetchImages(query, page = 1) {
  const url = query
    ? `https://api.unsplash.com/search/photos?query=${query}&client_id=${ACCESS_KEY}&per_page=30&page=${page}`
    : `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=30`;

  try {
    isLoading = true;
    loadingIcon.style.display = "block"; // Show loading icon
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }

    const data = await response.json();
    displayImages(query ? data.results : data);
  } catch (error) {
    console.error(error);
    alert("Something went wrong. Please try again!");
  } finally {
    isLoading = false;
    loadingIcon.style.display = "none"; // Hide loading icon
  }
}

// Function to display images in the grid
function displayImages(images) {
  images.forEach((image) => {
    const imgElement = createImageElement(image);
    imageGrid.appendChild(imgElement);
  });
}

// Function to create an image element with proper styling
function createImageElement(image) {
  const img = document.createElement("img");
  img.src = image.urls.small; // Use small image size for faster loading
  img.alt = image.alt_description || "Unsplash Image";

  // Add click event to open modal
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = image.urls.regular; // Use regular image size for modal

    // Hide share buttons when a new image is selected
    shareButtons.style.display = "none";

    // Update share links
    const imageUrl = encodeURIComponent(image.urls.regular);
    shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${imageUrl}`;
    shareTwitter.href = `https://twitter.com/intent/tweet?url=${imageUrl}`;
    shareInstagram.href = `https://www.instagram.com/?url=${imageUrl}`;
    shareWhatsApp.href = `https://api.whatsapp.com/send?text=${imageUrl}`;
  });

  return img;
}

// Function to toggle share buttons visibility
shareIcon.addEventListener("click", () => {
  if (shareButtons.style.display === "none" || shareButtons.style.display === "") {
    shareButtons.style.display = "block";
  } else {
    shareButtons.style.display = "none";
  }
});

// Event listener for the search button
searchButton.addEventListener("click", () => {
  currentQuery = searchInput.value.trim();
  currentPage = 1;
  imageGrid.innerHTML = ""; // Clear previous images
  if (currentQuery) {
    fetchImages(currentQuery, currentPage);
  }
});

// Event listener for the Enter key on the search input
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    currentQuery = searchInput.value.trim();
    currentPage = 1;
    imageGrid.innerHTML = ""; // Clear previous images
    if (currentQuery) {
      fetchImages(currentQuery, currentPage);
    }
  }
});

// Event listener to close the modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Event listener to close the modal when clicking outside of the image
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Fetch random images on page load
window.addEventListener("load", () => {
  fetchImages();
});

// Implement infinite scroll to load more images as the user scrolls down
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
    isLoading = true;
    currentPage++;
    fetchImages(currentQuery, currentPage);
  }
});

// Toggle dark mode
themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
});
