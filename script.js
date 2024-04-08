// Get the navigation links
const navLinks = document.querySelectorAll('nav a');
var map2;

// Add click event listeners to the navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = document.querySelector(e.target.getAttribute('href'));
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Get the contact form
const contactForm = document.querySelector('.contact form');

// Add submit event listener to the contact form
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Simulate form submission (replace with actual API call)
    console.log('Form data:', formData);
    alert('Thank you for contacting us! We will get back to you shortly.');

    // Clear the form fields
    contactForm.reset();
});

// Get the pricing plan buttons
const pricingButtons = document.querySelectorAll('.plan a.cta');

// Add click event listeners to the pricing plan buttons
pricingButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        alert(`You selected the "${e.target.parentNode.querySelector('h3').textContent}" plan.`);
    });
});

function openOpenStreetMapModal() {
    //document.querySelectorAll('[data-longitude]')
}

function openOpenStreetMapModal2() {
    if (map2) return;
    //modal-1
    const m = document.querySelector('.modal-2');

    if (m) {
        m.style.display = 'block';
    }

    // Initialize the map
    map2 = L.map('map2').locate({setView: true, maxZoom: 13});

    // Add the OpenStreetMap tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map2);

    // Add a marker
    L.marker([51.505, -0.09]).addTo(map2)
        .bindPopup('A pretty CSS-styled popup.<br> Easily customizable.')
        .openPopup();
}
function openOpenStreetMapModal() {
    // Create the modal element
    // const modal = document.createElement('div');
    // modal.classList.add('modal');
    const m = document.querySelector('.modal-1');
    if (m) {
        m.style.display = 'block';
    }
    return false;
    // Create the modal content
    // const modalContent = document.createElement('div');
    // modalContent.classList.add('modal-content');
    //
    // // Create the map container
    // const mapContainer = document.createElement('div');
    // mapContainer.classList.add('map-container');
    //
    // // Create the close button
    // const closeButton = document.createElement('span');
    // closeButton.classList.add('close-button');
    // closeButton.textContent = '&times;';
    //
    // // Append the elements to the modal
    // modalContent.appendChild(mapContainer);
    // modalContent.appendChild(closeButton);
    // modal.appendChild(modalContent);
    //
    // // Append the modal to the body
    // document.body.appendChild(modal);
    //
    // // Initialize the map
    // const map = L.map(mapContainer).setView([51.505, -0.09], 13);
    //
    // // Add the OpenStreetMap tile layer
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(map);
    //
    // // Add a marker
    // L.marker([51.505, -0.09]).addTo(map)
    //     .bindPopup('A pretty CSS-styled popup.<br> Easily customizable.')
    //     .openPopup();
    //
    // // Show the modal
    // modal.style.display = 'block';
    //
    // // Add a click event listener to the close button
    // closeButton.addEventListener('click', () => {
    //     modal.style.display = 'none';
    // });
    //
    // // Add a click event listener to the modal to close it when clicked outside the content
    // window.addEventListener('click', (event) => {
    //     if (event.target === modal) {
    //         modal.style.display = 'none';
    //     }
    // });
}
const openMapButton = document.getElementById('open-map-button');
const closeButton = document.querySelector('.close-button');
const closeButton2 = document.querySelector('.close-button-2');
openMapButton.addEventListener('click', openOpenStreetMapModal);
closeButton.addEventListener('click', () => {
    const m = document.querySelector('.modal-1');
    if (m) {
        m.style.display = 'none';
    }
});
closeButton2.addEventListener('click', () => {
    const m = document.querySelector('.modal-2');
    if (m) {
        m.style.display = 'none';
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // Get the modal and button elements
    const modal = document.querySelector('.modal-1');
    const openMapButton = document.querySelector('.open-map-modal');
    const closeButton = document.querySelector('.close-button');

    // Initialize the Mapbox map
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWxiZXJ0aW5jeCIsImEiOiJjbHVwOHB3b28yMzVzMmtsaTNkbW5qb2JyIn0.vjqAUMrerzDx9PXgj_kBsA';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-0.09, 51.505],
        zoom: 13
    });

    // Add a marker
    new mapboxgl.Marker()
        .setLngLat([-0.09, 51.505])
        .setPopup(new mapboxgl.Popup().setHTML('A pretty CSS-styled popup.<br> Easily customizable.'))
        .addTo(map);

    // Show the modal when the button is clicked
    openMapButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Close the modal when the close button or outside the modal is clicked
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // return false;
    // let mapOptions = {
    //     center:[51.958, 9.141],
    //     zoom:10
    // }
    //
    //
    // let map = new L.map('map' , mapOptions);
    //
    // let layer = new L.TileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png');
    // map.addLayer(layer);
    //
    // let marker = new L.Marker([51.958, 9.141]);
    // marker.addTo(map);
});
