// Sample dataset
const sampleData = [
    { id: 1, name: "Local Alice","type": "localData", age: 25 },
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
    fetch("https://my-json-server.typicode.com/PaulLai1022/cse-134b-hw3/users")
        .then(response => response.json())
        .then(data => displayData(data))
        .catch(error => console.error("Error fetching data:", error));
});