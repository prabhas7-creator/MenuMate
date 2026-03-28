const chefs = [
    { id: 1, name: "Chef Satyanarayana Murthy", type: "non-veg", cuisine: "Raju Gari Pulao Special", price: 450, rating: 4.9, location: "Bhimavaram Town", img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=60&w=500" },
    { id: 2, name: "Chef Lakshmi Devi", type: "veg", cuisine: "Authentic Brahmin Bhojanam", price: 250, rating: 4.8, location: "Palakollu", img: "images/chef4.jpg" },
    { id: 3, name: "Chef Subba Raju", type: "non-veg", cuisine: "Bhimavaram Royyala Iguru", price: 600, rating: 5.0, location: "Akividu", img: "images/chef1.jpg" },
    { id: 4, name: "Chef Koteswara Rao", type: "non-veg", cuisine: "Natukodi Pulusu & Garelu", price: 500, rating: 4.7, location: "Tanuku", img: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&q=60&w=500" },
    { id: 5, name: "Chef Anitha Reddy", type: "veg", cuisine: "Godavari Pindi Vantalu", price: 200, rating: 4.6, location: "Undi", img: "images/chef7.jpg" },
    { id: 6, name: "Chef Srinivasa Varma", type: "non-veg", cuisine: "Gongura Mutton Special", price: 550, rating: 4.9, location: "Jeevaka", img: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?auto=format&fit=crop&q=60&w=500" },
    { id: 7, name: "Chef Durga Prasad", type: "non-veg", cuisine: "Nellore Chepala Pulusu", price: 400, rating: 4.5, location: "Vissakoderu", img: "images/chef3.jpg" },
    { id: 8, name: "Chef Vijaya Lakshmi", type: "veg", cuisine: "Traditional Ariselu & Sweets", price: 300, rating: 4.8, location: "Kalla", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=60&w=500" },
    { id: 9, name: "Chef Rambabu", type: "non-veg", cuisine: "Seafood Platter (Fish/Prawns)", price: 750, rating: 4.7, location: "Narsapuram", img: "images/chef5.jpg" },
    { id: 10, name: "Chef Naga Raju", type: "non-veg", cuisine: "Spicy Guntur Mirchi Style", price: 350, rating: 4.9, location: "Bhimavaram Bypass", img: "images/chef6.jpg" }
];

const chefGrid = document.getElementById('chefGrid');
const searchInput = document.getElementById('searchInput');

function renderChefs(data) {
    if (data.length === 0) {
        chefGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #777;">No chefs found near Bhimavaram.</p>`;
        return;
    }
    chefGrid.innerHTML = data.map(chef => `
        <div class="chef-card">
            <img src="${chef.img}" alt="${chef.name}" class="chef-img" onerror="this.src='https://via.placeholder.com/400x250?text=Chef+Profile'">
            <div class="chef-details">
                <span class="chef-tag">${chef.type} • ${chef.cuisine}</span>
                <h3>${chef.name}</h3>
                <p>📍 ${chef.location} | ⭐ ${chef.rating}</p>
                <div class="price-tag">₹${chef.price} <span>/ plate</span></div>
                <button class="book-btn" onclick="openBooking('${chef.name}')">Book Now</button>
            </div>
        </div>
    `).join('');
}

// Search Logic
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = chefs.filter(c => 
        c.name.toLowerCase().includes(term) || 
        c.cuisine.toLowerCase().includes(term) ||
        c.location.toLowerCase().includes(term)
    );
    renderChefs(filtered);
});

// Filter by Type
function filterByType(type) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    if (type === 'all') { renderChefs(chefs); } 
    else { renderChefs(chefs.filter(c => c.type === type)); }
}

// Modal Logic
const modal = document.getElementById('bookingModal');
function openBooking(name) {
    document.getElementById('modalChefName').innerText = name;
    modal.style.display = 'flex';
}
document.querySelector('.close-btn').onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; }

document.getElementById('bookingForm').onsubmit = (e) => {
    e.preventDefault();
    alert("Request Sent! " + document.getElementById('modalChefName').innerText + " will contact you soon.");
    modal.style.display = 'none';
};

renderChefs(chefs);