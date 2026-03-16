// Select chart elements
const vmChartCanvas = document.getElementById("vmChart").getContext("2d");
const providerChartCanvas = document.getElementById("providerChart").getContext("2d");

// Initialize charts with empty data
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
    options: { responsive: true, plugins: { legend: { display: true } } }
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

// Fetch VM data from backend
async function fetchVMData() {
    try {
        const response = await fetch("http://localhost:5000/api/vm-data");
        const data = await response.json();

        // Update VM chart
        vmChart.data.labels = data.map(vm => vm.name);
        vmChart.data.datasets[0].data = data.map(vm => vm.cost);
        vmChart.update();
    } catch (error) {
        console.error("Error fetching VM data:", error);
    }
}

// Fetch provider cost data from backend
async function fetchProviderData() {
    try {
        const response = await fetch("http://localhost:5000/api/provider-cost");
        const data = await response.json();

        // Update provider chart
        providerChart.data.labels = data.map(p => p.name);
        providerChart.data.datasets[0].data = data.map(p => p.cost);
        providerChart.update();
    } catch (error) {
        console.error("Error fetching provider data:", error);
    }
}

// Auto-update charts every 5 seconds
setInterval(() => {
    fetchVMData();
    fetchProviderData();
}, 5000);

// Initial fetch
fetchVMData();
fetchProviderData();