function loadScript(url, callback) {
    // Create a new script element
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Add an event listener for when the script has finished loading
    script.onload = function () {
        // Call the callback function when the script has finished loading
        callback();
    };

    // Append the script to the document's head
    document.head.appendChild(script);
}

// Get the navigation links
const navLinks = document.querySelectorAll('nav a');
var map2;

// Add click event listeners to the navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = document.querySelector(e.target.getAttribute('href'));
        targetSection.scrollIntoView({behavior: 'smooth'});
    });
});

// Get the contact form
const contactForm = document.querySelector('.contact form');

window.__arsfChatIdg='4174303520';
window.__arsfChatUrl = 'api.cafechat.app';
function getSuccess () {
    const div = document.createElement('div');
    div.innerText = 'Thank you for contacting us! We will get back to you shortly.'
    return div.innerHTML;
}
// Add submit event listener to the contact form
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    contactForm.innerHTML = document.querySelector('.loader').outerHTML;
    // Simulate form submission (replace with actual API call)
    // console.log('Form data:', formData);
    // alert('Thank you for contacting us! We will get back to you shortly.');
    const cb = () => {
        // console.log('Script has finished loading!');
        const message = { g: '', uid: '', message: JSON.stringify(formData) }
        message.g = window.__arsfChatIdg || '';
        if (window.__arsfChat) {
            window.__arsfChat.send(JSON.stringify(message));
            contactForm.innerHTML = getSuccess();
        } else {
            const cc = new WebSocket(`wss://${window.__arsfChatUrl}/`);
            cc.onopen = () => {
                window.__arsfChat = cc;
                window.__arsfChat.send(JSON.stringify(message));
                contactForm.innerHTML = getSuccess();
            }
        }
        // Add any additional code you want to run after the script has loaded
    }
    if (window.__arsfChat) {
        // loaded
        cb();
    } else {
        // Example usage
        loadScript('//cafechat.app/start.js', cb);
    }
    // Clear the form fields
    contactForm.reset();
});

// Get the pricing plan buttons
const pricingButtons = document.querySelectorAll('.plan a.cta');

// Add click event listeners to the pricing plan buttons
pricingButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        // alert(`You selected the "${e.target.parentNode.querySelector('h3').textContent}" plan.`);
    });
});

function openOpenStreetMapModal() {
    //modal-1
    const m = document.querySelector('.modal-2');

    if (m) {
        m.style.display = 'block';
    }
    if (map2) return;

    // Initialize the map
    map2 = L.map('map2').locate({setView: true, maxZoom: 13});

    // Add the OpenStreetMap tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map2);
// latlng
    navigator.geolocation.getCurrentPosition(function (location) {
        var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
        //alert(latlng);
        // var mymap = L.map('mapid').setView(latlng, 13)
        // L.marker().addTo(map2)


        L.marker(latlng)
            .addTo(map2)
            .bindPopup('A pretty CSS-styled popup.<br> Easily customizable.')
            .openPopup();
    });
    // Add a marker
    // L.marker([51.505, -0.09]).addTo(map2)
    //     .bindPopup('A pretty CSS-styled popup.<br> Easily customizable.')
    //     .openPopup();
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
