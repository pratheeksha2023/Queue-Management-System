document.addEventListener("DOMContentLoaded", fetchQueue);

function fetchQueue() {
    document.getElementById("loading").style.display = "block"; 
    fetch("queue.php")
        .then(response => response.json())
        .then(data => {
            document.getElementById("loading").style.display = "none";
            const queueTableBody = document.getElementById("queueTableBody");
            queueTableBody.innerHTML = "";

            if (data.length === 0) {
                queueTableBody.innerHTML = "<tr><td colspan='4'>No customers in queue</td></tr>";
                return;
            }

            let firstCustomerTime = new Date(data[0].timestamp);

            data.forEach((customer, index) => {
                let estimatedTime = new Date(firstCustomerTime.getTime() + index * 8 * 60000); // 8 min per customer
                let formattedTime = estimatedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let row = `<tr>
                    <td>${index + 1}</td>
                    <td>${customer.name}</td>
                    <td>${customer.phone}</td>
                    <td>${formattedTime}</td>
                </tr>`;

                queueTableBody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error("Error fetching queue:", error);
            showMessage("Error fetching queue", "red");
        });
}

document.getElementById("addCustomerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!name || !phone) {
        showMessage("Please enter both name and phone", "red");
        return;
    }

    fetch("queue.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone })
    })
    .then(response => response.json())
    .then(data => {
        showMessage(data.message || data.error, data.error ? "red" : "green");
        fetchQueue();
        document.getElementById("addCustomerForm").reset();
    })
    .catch(error => {
        console.error("Error adding customer:", error);
        showMessage("Error adding customer", "red");
    });
});

document.getElementById("serveCustomer").addEventListener("click", () => {
    fetch("queue.php", { method: "DELETE" })
        .then(response => response.json())
        .then(data => {
            showMessage(data.message || data.error, data.error ? "red" : "green");
            fetchQueue();
        })
        .catch(error => {
            console.error("Error serving customer:", error);
            showMessage("Error serving customer", "red");
        });
});

// Displays a notification message
function showMessage(message, color) {
    const msgBox = document.getElementById("messageBox");
    msgBox.textContent = message;
    msgBox.style.background = color;
    msgBox.style.display = "block";
    setTimeout(() => { msgBox.style.display = "none"; }, 3000);
}