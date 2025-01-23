// Replace YOUR_ACCESS_KEY with your Unsplash API Access Key
const ACCESS_KEY = "iIu8Eh9ZprgVqRmvEFryUhFUP4zWVPdEuOMdaQw3buY";
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const imageGrid = document.getElementById("imageContainer");

// Function to fetch images from Unsplash API
async function fetchImages(query) {
  const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${ACCESS_KEY}&per_page=30`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }

    const data = await response.json();
    displayImages(data.results);
  } catch (error) {
    console.error(error);
    alert("Something went wrong. Please try again!");
  }
}

// Function to display images in the grid
function displayImages(images) {
  // Clear previous images
  imageGrid.innerHTML = "";

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

  return img;
}

// Event listener for the search button
searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchImages(query);
  }
});

// Event listener for the Enter key on the search input
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) {
      fetchImages(query);
    }
  }
});
