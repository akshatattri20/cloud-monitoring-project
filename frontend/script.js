const BASE_URL = "http://localhost:5000";

// Select chart elements
const vmChartCanvas = document.getElementById("vmChart").getContext("2d");
const providerChartCanvas = document.getElementById("providerChart").getContext("2d");
const statusText = document.getElementById("status");

// Initialize charts
const vmChart = new Chart(vmChartCanvas, {
    type: "bar",
    data: {
        labels: [],
        datasets: [{
            label: "Cost ($)",
            data: [],
            backgroundColor: "rgba(54, 162, 235, 0.6)"
        }]
    },
    options: { responsive: true }
});

const providerChart = new Chart(providerChartCanvas, {
    type: "pie",
    data: {
        labels: [],
        datasets: [{
            label: "Provider Cost ($)",
            data: [],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }]
    },
    options: { responsive: true }
});

// Reusable fetch function
async function fetchData(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        if (!response.ok) throw new Error("Network response was not ok");
        return await response.json();
    } catch (error) {
        statusText.innerText = "Error fetching data!";
        console.error(error);
        return null;
    }
}

// Update VM chart
async function updateVMChart() {
    const data = await fetchData("/api/vm-data");
    if (!data) return;

    vmChart.data.labels = data.map(vm => vm.name);
    vmChart.data.datasets[0].data = data.map(vm => vm.cost);
    vmChart.update();
}

// Update Provider chart
async function updateProviderChart() {
    const data = await fetchData("/api/provider-cost");
    if (!data) return;

    providerChart.data.labels = data.map(p => p.name);
    providerChart.data.datasets[0].data = data.map(p => p.cost);
    providerChart.update();
}

// Refresh all data
async function refreshData() {
    statusText.innerText = "Updating data...";
    await updateVMChart();
    await updateProviderChart();
    statusText.innerText = "Data updated (auto-refresh every 5s)";
}

// Auto-update
setInterval(refreshData, 5000);

// Initial load
refreshData();