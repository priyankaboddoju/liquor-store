document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-bar input");
    const searchIcon = document.querySelector(".search-icon");
    const productModal = document.getElementById("product-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalLocation = document.getElementById("modal-location");
    const closeBtn = document.getElementById("close-btn");

    // Hide modal on page load
    productModal.style.display = "none";

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

        // Example: Check if product exists (this is a simple check, you can replace it with your own logic)
        const products = {
            "wine": "Location: Aisle 1",
            "beer": "Location: Aisle 2",
            "vodka": "Location: Aisle 3",
            "whisky": "Location: Aisle 4",
            "champagne": "Location: Aisle 5"
        };

        if (products[query]) {
            // If product is found, display modal
            modalTitle.textContent = `Product: ${query.charAt(0).toUpperCase() + query.slice(1)}`;
            modalLocation.textContent = products[query];
            productModal.style.display = "flex"; // Show modal
        } else {
            // If no product is found, you can show an alert or message
            alert("Product not found.");
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
