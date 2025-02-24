(function injectMapCode() {
    function createInjectableScript() {
        const script = `
            (function() {
                // Global variable for address selector
                const ADDRESS_SELECTOR = '.address';

                async function loadResources() {
                    // Load Leaflet CSS
                    const leafletCSS = document.createElement('link');
                    leafletCSS.rel = 'stylesheet';
                    leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
                    document.head.appendChild(leafletCSS);

                    // Load Leaflet JS
                    return new Promise((resolve, reject) => {
                        const leafletScript = document.createElement('script');
                        leafletScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
                        leafletScript.onload = () => resolve();
                        leafletScript.onerror = () => reject(new Error('Failed to load Leaflet'));
                        document.head.appendChild(leafletScript);
                    });
                }

                function createMapModal() {
                    const modalHTML = \`
                        <div id="mapModal" class="modal">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h2>Location Map</h2>
                                    <button class="close-button">&times;</button>
                                </div>
                                <div class="modal-body">
                                    <div id="map"></div>
                                    <div class="map-controls">
                                        <button id="zoomToPoints" class="map-button">
                                            <span class="button-icon">🌍</span>
                                            Show All
                                        </button>
                                        <button id="nextPoint" class="map-button">
                                            <span class="button-icon">➡️</span>
                                            Next Point
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    \`;
                    document.body.insertAdjacentHTML('beforeend', modalHTML);
                }

                function initializeLeafletMap(containerId, addresses) {
                    if (typeof L === 'undefined') {
                        console.error('Leaflet is not loaded');
                        return null;
                    }

                    const map = L.map(containerId).setView([51.505, -0.09], 2);
                    map.invalidateSize();

                    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                        subdomains: 'abcd',
                        maxZoom: 20
                    }).addTo(map);

                    const markers = [];
                    let currentMarkerIndex = -1;
                    let processed = 0;

                    addresses.forEach(address => {
                        fetch(\`https://nominatim.openstreetmap.org/search?format=json&q=\${encodeURIComponent(address)}\`)
                            .then(response => response.json())
                            .then(data => {
                                processed++;
                                if (data && data[0]) {
                                    const { lat, lon } = data[0];
                                    const marker = L.marker([lat, lon]).addTo(map)
                                        .bindPopup(address);
                                    markers.push(marker);
                                }

                                if (processed === addresses.length && markers.length > 0) {
                                    const group = new L.featureGroup(markers);
                                    map.fitBounds(group.getBounds());
                                    currentMarkerIndex = 0;
                                    map.invalidateSize();
                                }
                            })
                            .catch(error => {
                                console.error('Error geocoding address:', address, error);
                                processed++;
                            });
                    });

                    const zoomButton = document.getElementById('zoomToPoints');
                    zoomButton.onclick = () => {
                        if (markers.length > 0) {
                            const group = new L.featureGroup(markers);
                            map.invalidateSize();
                            map.fitBounds(group.getBounds(), { padding: [50, 50] });
                        }
                    };

                    const nextButton = document.getElementById('nextPoint');
                    nextButton.onclick = () => {
                        if (markers.length === 0) return;
                        
                        currentMarkerIndex = (currentMarkerIndex + 1) % markers.length;
                        const marker = markers[currentMarkerIndex];
                        
                        map.invalidateSize();
                        map.setView(marker.getLatLng(), 14, {
                            animate: true,
                            duration: 1
                        });
                        
                        marker.openPopup();
                    };

                    return map;
                }

                function showAddressesOnMap() {
                    const addresses = Array.from(document.querySelectorAll(ADDRESS_SELECTOR))
                        .map(el => el.textContent.trim())
                        .filter(Boolean);

                    let button = document.querySelector('#showMapButton');
                    if (!button) {
                        button = document.createElement('button');
                        button.id = 'showMapButton';
                        button.textContent = '📍 Show on Map';
                        document.body.appendChild(button);
                    }

                    button.onclick = async () => {
                        if (addresses.length === 0) {
                            alert('No addresses found on the page');
                            return;
                        }

                        try {
                            await loadResources();

                            if (!document.getElementById('mapModal')) {
                                createMapModal();
                            }

                            const modal = document.getElementById('mapModal');
                            const modalContent = modal.querySelector('.modal-content');
                            modal.style.display = 'block';

                            let mapInstance = null;

                            setTimeout(() => {
                                mapInstance = initializeLeafletMap('map', addresses);
                                if (!mapInstance) {
                                    throw new Error('Failed to initialize map');
                                }
                            }, 50);

                            const closeModal = () => {
                                modal.style.display = 'none';
                                if (mapInstance) {
                                    mapInstance.remove();
                                }
                            };

                            document.querySelector('.close-button').onclick = closeModal;
                            
                            modal.onclick = (event) => {
                                if (!modalContent.contains(event.target)) {
                                    closeModal();
                                }
                            };

                        } catch (error) {
                            console.error('Error loading map:', error);
                            alert('Failed to load map. Please try again later.');
                        }
                    };
                }

                // Initialize the map functionality
                showAddressesOnMap();
            })();
        `;

        const scriptElement = document.createElement('script');
        scriptElement.textContent = script;
        return scriptElement;
    }

    // Inject CSS
    const mapStyles = `
        #showMapButton {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 12px 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            transition: all 0.2s ease;
            z-index: 999;
        }

        #showMapButton:hover {
            background-color: #45a049;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        #showMapButton:active {
            transform: translateY(0);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(3px);
            padding: 40px;
            box-sizing: border-box;
        }

        .modal-content {
            position: relative;
            background-color: #fefefe;
            margin: 2vh auto;
            border-radius: 8px;
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
            width: 90%;
            max-width: 1200px;
            height: 94vh;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 24px;
            background-color: #f8f9fa;
            border-bottom: 1px solid #dee2e6;
        }

        .modal-header h2 {
            margin: 0;
            font-size: 1.25rem;
            color: #212529;
        }

        .close-button {
            background: none;
            border: none;
            font-size: 28px;
            font-weight: bold;
            color: #666;
            cursor: pointer;
            padding: 0 8px;
            line-height: 1;
            transition: color 0.2s ease;
        }

        .close-button:hover {
            color: #000;
        }

        .modal-body {
            position: relative;
            flex-grow: 1;
            min-height: 0;
        }

        #map {
            width: 100%;
            height: 100%;
        }

        .map-controls {
            position: absolute;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 12px;
            z-index: 1000;
        }

        .map-button {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px 16px;
            background-color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            color: #2c3e50;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            transition: all 0.2s ease;
        }

        .map-button:hover {
            background-color: #f8f9fa;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .map-button:active {
            transform: translateY(0);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }

        .button-icon {
            font-size: 16px;
        }

        @media (max-width: 768px) {
            .modal-content {
                margin: 0;
                width: 100%;
                height: 100vh;
                border-radius: 0;
            }

            .map-controls {
                bottom: 16px;
            }

            .map-button {
                padding: 8px 12px;
            }
        }
    `;

    const styleElement = document.createElement('style');
    styleElement.textContent = mapStyles;
    document.head.appendChild(styleElement);

    // Inject script
    document.head.appendChild(createInjectableScript());
})(); 