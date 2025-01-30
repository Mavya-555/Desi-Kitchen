// ---- description data ----
const logo = document.getElementById("logo");
        const description = document.getElementById("description");
        const closeBtn = document.getElementById("closeBtn");

        // Show description when logo is clicked
        logo.addEventListener("click", function () {
            description.style.display = "block";
        });

        // Hide description when close button is clicked
        closeBtn.addEventListener("click", function () {
            description.style.display = "none";
        });

        // Hide description when clicking outside of it
        document.addEventListener("click", function (event) {
            if (!description.contains(event.target) && event.target !== logo) {
                description.style.display = "none";
            }
        });


document.addEventListener("DOMContentLoaded", () => {
    const profileButton = document.getElementById("wishlist");
    const profileContainer = document.getElementById("profile-container");
    const wishlistContainer = document.getElementById("wish-list");

    // Show profile when the button is clicked
    if (profileButton) {
        profileButton.addEventListener("click", () => {
            if (profileContainer) {
                profileContainer.style.display = "flex";
            } else {
                console.error("Profile container not found!");
            }
        });
    }

    // Close profile container
    const closeProfileButton = document.getElementById("close-profile");
    if (closeProfileButton) {
        closeProfileButton.addEventListener("click", () => {
            if (profileContainer) {
                profileContainer.style.display = "none";
            } else {
                console.error("Profile container not found!");
            }
        });
    }

    // Fetch wishlist and display
    wishlistContainer.innerHTML = "";
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (wishlist.length > 0) {
        wishlist.forEach((item) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <img src="${item.itemimg}" alt="${item.itemname}" width="50" height="50" />
                <p>${item.itemname}</p>
            `;
            li.addEventListener("click", () => {
                localStorage.setItem("item", JSON.stringify(item));
                window.open("./item.html", "_self");
            });
            wishlistContainer.appendChild(li);
        });
    } else {
        wishlistContainer.innerHTML = "<p>No items in your wishlist.</p>";
    }
});
    // Redirect to homepage
    const homeButton = document.getElementById("homeButton");
    if (homeButton) {
        homeButton.addEventListener("click", () => {
            window.location.href = "./JSProject.html";
        });
    }

let food = document.getElementsByClassName("food")[0];

// VEG DATA
let btn_veg = document.getElementsByClassName("veg")[0];
let veg_container = document.getElementById("veg_container");

btn_veg.addEventListener("click", ele => {
    food.style.display = "none";
    veg_container.style.display = "block";
    vegData();
})

document.querySelectorAll(".fetchButton").forEach(button => {
    button.addEventListener("click", () => {
        const value1 = button.id;
        let data1 = JSON.parse(localStorage.getItem("data1")) || [];
        if (value1 === "back") {
            food.style.display = "block";
            veg_container.style.display = "none";
        }
        else {
            if (data1.length === 0) {
                alert("Data is not Available");
            }
            else if (value1 === "all") {
                displayVegData(data1);
            }
            else {
                let result1 = data1.filter(obj => obj["category"] === value1);
                displayVegData(result1);
            }
        }
    });
});

async function vegData() {
    try {
        let res1 = await fetch("https://desi-kitchen-e8760-default-rtdb.firebaseio.com/veg.json");
        if (!res1.ok) {
            throw new Error(`HTTP error! Status: ${res1.status}`);
        }
        let data1 = await res1.json();
        localStorage.setItem("data1", JSON.stringify(data1));
        displayVegData(data1);
    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
}

let veg_box = document.querySelector(".veg_box");

function displayVegData(data1) {
    if (!veg_box) {
        console.error("Error: Container with class 'veg_box' not found.");
        return;
    }
    veg_box.innerHTML = "";

    if (data1.length === 0) {
        alert("Data is not Available");
    } else {
        data1.forEach((obj1) => {
            let div = document.createElement("div");
            div.className = "item";
            div.innerHTML = `
                <img src="${obj1["itemimg"]}" alt="${obj1["itemname"]}" />
                <p>${obj1["itemname"]}</p>
            `;

            div.addEventListener("click", () => {
                localStorage.setItem("item",JSON.stringify(obj1))
                window.open("./item.html","_self")
            });
            veg_box.appendChild(div);
        });
    }
}


// NON-VEG DATA
let btn_non_veg = document.getElementsByClassName("non_veg")[0];
let non_veg_container = document.getElementById("non_veg_container");

btn_non_veg.addEventListener("click", ele => {
    food.style.display = "none";
    non_veg_container.style.display = "block";
    nonVegData();
})

document.querySelectorAll(".fetchButton").forEach(button => {
    button.addEventListener("click", () => {
        const value2 = button.id;
        let data2 = JSON.parse(localStorage.getItem("data2")) || [];
        if (value2 === "back") {
            food.style.display = "block";
            non_veg_container.style.display = "none";
        }
        else {
            if (data2.length === 0) {
                alert("Data is not Available");
            }
            else if (value2 === "all") {
                displayNonVegData(data2);
            }
            else {
                let result2 = data2.filter(obj => obj["category"] === value2);
                displayNonVegData(result2);
            }
        }
    });
});

async function nonVegData() {
    try {
        let res2 = await fetch("https://desi-kitchen-e8760-default-rtdb.firebaseio.com/nonveg.json");
        if (!res2.ok) {
            throw new Error(`HTTP error! Status: ${res2.status}`);
        }
        let data2 = await res2.json();
        localStorage.setItem("data2", JSON.stringify(data2));
        displayNonVegData(data2);
    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
}

let non_veg_box = document.querySelector(".non_veg_box");

function displayNonVegData(data2) {
    if (!non_veg_box) {
        console.error("Error: Container with class 'non_veg_box' not found.");
        return;
    }
    non_veg_box.innerHTML = "";

    if (data2.length === 0) {
        alert("Data is not Available");
    } else {
        data2.forEach((obj2) => {
            let div = document.createElement("div");
            div.className = "item";
            div.innerHTML = `
                <img src="${obj2["itemimg"]}" alt="${obj2["itemname"]}" />
                <p>${obj2["itemname"]}</p>
            `;

            div.addEventListener("click", () => {
                localStorage.setItem("item",JSON.stringify(obj2))
                window.open("./item.html","_self")
            });
            non_veg_box.appendChild(div);
        });
    }
}



// DESSERTS DATA

let btn_desserts = document.getElementsByClassName("desserts")[0];
let desserts_container = document.getElementById("desserts_container");

btn_desserts.addEventListener("click", ele => {
    food.style.display = "none";
    desserts_container.style.display = "block";
    dessertsData();
})

document.querySelectorAll(".fetchButton").forEach(button => {
    button.addEventListener("click", () => {
        const value3 = button.id;
        let data3 = JSON.parse(localStorage.getItem("data3")) || [];
        if (value3 === "back") {
            food.style.display = "block";
            desserts_container.style.display = "none";
        }
        else {
            // if (data3.length === 0) {
            //     alert("Data is not Available");
            // }
            // else if (value3 === "all") {
            //     displayDessertsData(data3);
            // }
            // else {
            let result3 = data3.filter(obj => obj["category"] === value3);
            displayDessertsData(result3);
            // }
        }
    });
});

async function dessertsData() {
    try {
        let res3 = await fetch("https://desi-kitchen-e8760-default-rtdb.firebaseio.com/desserts.json");
        if (!res3.ok) {
            throw new Error(`HTTP error! Status: ${res3.status}`);
        }
        let data3 = await res3.json();
        localStorage.setItem("data3", JSON.stringify(data3));
        displayDessertsData(data3);
    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
}

let desserts_box = document.querySelector(".desserts_box");

function displayDessertsData(data3) {
    if (!desserts_box) {
        console.error("Error: Container with class 'desserts_box' not found.");
        return;
    }
    desserts_box.innerHTML = "";

    if (data3.length === 0) {
        // alert("Data is not Available");
    } else {
        data3.forEach((obj3) => {
            let div = document.createElement("div");
            div.className = "item";
            div.innerHTML = `
                <img src="${obj3["itemimg"]}" alt="${obj3["itemname"]}" />
                <p>${obj3["itemname"]}</p>
            `;

            div.addEventListener("click", () => {
                localStorage.setItem("item",JSON.stringify(obj3))
                window.open("./item.html","_self");
            });
            desserts_box.appendChild(div);
        });
    }
}
