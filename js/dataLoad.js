// Sample dataset
const sampleData = [
    { id: 1, name: "Local Alice","type": "localData", age: 2777 },
    { id: 2, name: "Local Bob","type": "localData", age: 30 },
    { id: 3, name: "Local Charlie","type": "localData", age: 22 }
];

// Store sample data in localStorage if not already stored
if (!localStorage.getItem("userData")) {
    localStorage.setItem("userData", JSON.stringify(sampleData));
}


function displayData(data) {
    const container = document.getElementById("dataContainer");
    container.innerHTML = ""; // Clear previous content

    data.forEach(user => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<h3>${user.name}</h3><p>Age: ${user.age}</p>`;
        container.appendChild(card);
    });
}

document.getElementById("loadLocal").addEventListener("click", () => {
    const data = JSON.parse(localStorage.getItem("userData")) || [];
    displayData(data);
});

document.getElementById("loadRemote").addEventListener("click", () => {
    fetch("https://api.jsonbin.io/v3/b/67d4cc2b8960c979a571c6e8", {
        headers: { 
            "X-Master-Key": "$2a$10$6crwpQuaNMYRIewNqo40heZv924VxWF.VpiyqTtgw5pdcN9ZfKrnS"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Fetched Data:", data); // Debugging output
        if (data && data.record) {
            displayData(data.record);
        } else {
            throw new Error("Invalid API response format");
        }
    })
    .catch(error => console.error("Error fetching data:", error));
});