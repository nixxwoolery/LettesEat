async function populateDropdowns() {
  const response = await fetch("/get_unique_values_for_all_columns");
  const data = await response.json();

  const locationDropdown = document.getElementById("location");
  data.locations.forEach((location) => {
    const option = document.createElement("option");
    option.value = location;
    option.textContent = location;
    locationDropdown.appendChild(option);
  });

  const mealTypeDropdown = document.getElementById("mealType");
  data.mealTypes.forEach((mealType) => {
    const option = document.createElement("option");
    option.value = mealType;
    option.textContent = mealType;
    mealTypeDropdown.appendChild(option);
  });

  const dineOrDashDropdown = document.getElementById("dineOrDash");
  data.dineOrDash.forEach((dine) => {
    const option = document.createElement("option");
    option.value = dine;
    option.textContent = dine;
    dineOrDashDropdown.appendChild(option);
  });

  const foodCategoryDropdown = document.getElementById("foodCategory");
  data.foodCategories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    foodCategoryDropdown.appendChild(option);
  });
}

async function generateRestaurants() {
  const form = document.getElementById("restaurantForm");
  const formData = new FormData(form);
  const searchParams = new URLSearchParams();

  for (const pair of formData) {
    searchParams.append(pair[0], pair[1]);
  }

  try {
    const response = await fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(searchParams)),
    });

    const data = await response.json();
    const restaurantList = document.getElementById("restaurant-list");
    const restaurantItems = data.map((restaurant) => {
      return `<div>
                          <h3>${restaurant["Restaurant Name"]}</h3>
                          <p>Meal Type: ${restaurant["Meal Type"]}</p>
                          <!-- Display other columns similarly -->
                      </div>`;
    });
    restaurantList.innerHTML = restaurantItems.join("");
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the populateDropdowns function when the page loads
window.onload = populateDropdowns;
