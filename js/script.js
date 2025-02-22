document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-bar input");
    const searchIcon = document.querySelector(".search-icon");
    const productModal = document.getElementById("product-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalProductList = document.getElementById("modal-product-list");
    const closeBtn = document.getElementById("close-btn");

    // Hide modal on page load
    productModal.style.display = "none";

    // Load products data from data.json
    let productsData = {};

    fetch('https://raw.githubusercontent.com/priyankaboddoju/liquor-store/main/data.json')
        .then(response => response.json())
        .then(data => {
            productsData = data;
        })
        .catch(error => {
            console.error('Error loading products data:', error);
        });

    // Event listener for the search input
    searchInput.addEventListener("input", function () {
        if (searchInput.value.trim() !== "") {
            searchIcon.style.fontWeight = "bold"; // Make icon bold
            searchIcon.style.color = "#000"; // Optional: Change color to black
        } else {
            searchIcon.style.fontWeight = "normal"; // Revert to normal weight
            searchIcon.style.color = "#ccc"; // Restore default color
        }
    });

    // When the search icon is clicked, display the modal with a result
    searchIcon.addEventListener("click", function () {
        const query = searchInput.value.trim().toLowerCase();

        if (query === "") {
            alert("Please enter a product name.");
            return;
        }

        // Clear the previous results in the modal
        modalProductList.innerHTML = "";
        let found = false;

        // Loop through series (A, B, C, D, etc.) in the products data
        for (const series in productsData) {
            for (const aisle in productsData[series]) {
                // Get the products from this aisle
                const products = productsData[series][aisle];

                // Check if any product name contains the query word (case-insensitive)
                products.forEach(product => {
                    if (product.toLowerCase().includes(query)) {
                        // If a match is found, add it to the list in the modal
                        const productItem = document.createElement("li");
                        productItem.textContent = `${product} - Location:  ${aisle}`;
                        modalProductList.appendChild(productItem);
                        found = true;
                    }
                });
            }
        }

        if (found) {
            modalTitle.textContent = `Search Results for "${query.charAt(0).toUpperCase() + query.slice(1)}"`;
            productModal.style.display = "flex"; // Show modal
        } else {
            // If no product is found, show an alert or message
            alert("No products found matching your search.");
        }
    });

    // Close the modal when the close button is clicked
    closeBtn.addEventListener("click", function () {
        productModal.style.display = "none";
    });

    // Close the modal when the overlay (background) is clicked
    productModal.addEventListener("click", function (e) {
        if (e.target === productModal) {
            productModal.style.display = "none";
        }
    });
});
