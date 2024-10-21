// Wait for the SVG to load and inject it into the map container
fetch('assets/map.svg')
.then(response => response.text())
.then(svgText => {
  const container = document.getElementById('map-container'); // Container for the SVG
  container.insertAdjacentHTML('afterbegin', svgText); // Inject SVG

  const points = container.querySelectorAll('.map-point'); // Select points with class 'map-point'
  const popup = document.getElementById('popup'); // Reference to the popup element

  // Add event listeners to each point
  points.forEach(point => {
    point.addEventListener('mouseenter', (event) => {
      const pointId = event.target.id; // Get the point's ID
      const placeName = pointId.replace('label-', ''); // Extract the place name

      // Set the popup content with the image
      popup.innerHTML = `<img src="assets/${placeName}.svg" class="popup-image" alt="${placeName}">`; 
      popup.style.display = 'block'; // Show popup
      updatePopupPosition(event); // Update popup position
    });

    point.addEventListener('mousemove', (event) => {
      updatePopupPosition(event); // Update popup position
    });

    // Keep the popup visible when hovering over it
    popup.addEventListener('mouseenter', () => {
      popup.style.display = 'block'; // Keep popup visible
    });

    
    // Hide popup when the cursor leaves the point and the popup
    point.addEventListener('mouseleave', () => {
      popup.style.display = 'none'; // Hide popup when the cursor leaves
    });
    popup.addEventListener('mouseleave', () => {
      popup.style.display = 'none'; // Hide popup when the cursor leaves
    });
  });

  function updatePopupPosition(event) {
    // Position the popup near the cursor
    const popupWidth = popup.offsetWidth;
    const popupHeight = popup.offsetHeight;
    let left = event.pageX + 10; // Position to the right of the cursor
    let top = event.pageY + 10; // Position below the cursor

    // Adjust position if the popup goes out of the viewport
    if (left + popupWidth > window.innerWidth) {
      left = window.innerWidth - popupWidth - 10; // Align left
    }
    if (top + popupHeight > window.innerHeight) {
      top = window.innerHeight - popupHeight - 10; // Align to top
    }

    popup.style.left = `${left}px`;
    popup.style.top = `${top}px`;
  }
})
.catch(error => console.error('Error loading SVG:', error)); // Error handling