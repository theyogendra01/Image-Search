const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const imageContainer = document.getElementById('imageContainer');

// Function to fetch and display images
async function fetchImages(query) {
  const apiKey = 'iIu8Eh9ZprgVqRmvEFryUhFUP4zWVPdEuOMdaQw3buY'; // Replace with your API key
  const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&per_page=20&client_id=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    // Clear existing images
    imageContainer.innerHTML = '';

    // Display fetched images
    data.results.forEach(image => {
      const img = document.createElement('img');
      img.src = image.urls.small;
      img.alt = image.alt_description || 'Image';
      imageContainer.appendChild(img);
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    imageContainer.innerHTML = '<p>Failed to load images. Please try again later.</p>';
  }
}

// Function to handle search
function handleSearch() {
  const query = searchInput.value.trim();
  if (query) {
    fetchImages(query);
  }
}

// Event listener for the search button
searchButton.addEventListener('click', handleSearch);

// Event listener for the Enter key on the search input
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});
