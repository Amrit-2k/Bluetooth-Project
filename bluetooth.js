document.addEventListener("DOMContentLoaded", () => {
    const scanButton = document.getElementById("scanButton");
    const connectedDeviceDiv = document.getElementById("connectedDevice");
    const deviceDataDiv = document.getElementById("deviceData");
    const dataSpeedSlider = document.getElementById("dataSpeedSlider");
    const gridIntervalInput = document.getElementById("gridInterval");

    let connectedDevice = null;
    let startTime = null;
    let chart = null;
    let dataUpdateSpeed = 300;
    let gridInterval = 1000;

    // Placeholder for simulated data
    const simulatedData = [];

    // Flag to track whether the chart has been initialized
    let isChartInitialized = false;

    // Function to add a device and update the UI
    async function addConnectedDevice(device) {
        try {
            // Connect to the device (replace with actual connection code)
            // You might need to use device.gatt.connect() or similar depending on the device.
            // Once connected, you can start receiving data.

            // Simulated data (replace with actual data from your device)
            connectedDevice = device;
            const deviceInfo = `${device.name || "Unknown Device"} - ${device.id}`;
            connectedDeviceDiv.textContent = deviceInfo;

            // Set the start time when connected
            startTime = Date.now();

            // Initialize the chart if it hasn't been initialized yet
            if (!isChartInitialized) {
                initializeChart();
                isChartInitialized = true;
            }

            // Start data updates (replace with actual data retrieval code)
            updateChart();

            console.log("Connected device:", device);
        } catch (error) {
            console.error("Error connecting to device:", error);
        }
    }

    // Simulated function to receive data from the connected device
    function receiveData() {
        // Simulated data (replace with actual data from your device)
        return Math.random() * 10 + 80; // Simulated ECG data between 80 and 90
    }

    // Function to initialize the chart
    function initializeChart() {
        chart = new Chart("lineGraph", {
            type: "line",
            data: {
                datasets: [{
                    label: "Voltage",
                    data: simulatedData,
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 2,
                    pointRadius: 0, // Hide data points
                    fill: false,
                }],
            },
            options: {
                scales: {
                    x: {
                        type: "linear",
                        position: "bottom",
                        title: {
                            display: true,
                            text: "Time (s)",
                        },
                        ticks: {
                            stepSize: gridInterval / 1000, // Convert grid interval to seconds
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Voltage",
                        },
                    },
                },
            },
        });
    }

    // Function to update the chart with real-time data
    function updateChart() {
        const currentTime = (Date.now() - startTime) / 1000; // Convert to seconds
        const newDataPoint = receiveData();

        // Add the new data point to the simulated data array
        simulatedData.push({ x: currentTime, y: newDataPoint });

        // Remove old data points to keep the chart visually appealing
        if (simulatedData.length > 100) {
            simulatedData.shift();
        }

        // Update the chart data
        chart.data.datasets[0].data = simulatedData;
        chart.update();

        // Schedule the next chart update
        setTimeout(updateChart, dataUpdateSpeed);
    }

    // Event listener for the Scan button
    scanButton.addEventListener("click", async () => {
        try {
            const device = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
            });

            addConnectedDevice(device);
        } catch (error) {
            console.error("Bluetooth error:", error);
        }
    });

    // Event listener for data speed slider change
    dataSpeedSlider.addEventListener("input", (event) => {
        const value = parseInt(event.target.value);
        // Update the data update speed based on the slider value
        // Adjust this value as needed for your application
        dataUpdateSpeed = 1000 / value;
    });

    // Event listener for grid interval input change
    gridIntervalInput.addEventListener("input", (event) => {
        const inputValue = parseInt(event.target.value);
        if (inputValue >= 100 && inputValue <= 1000) {
            gridInterval = inputValue;
            updateGridInterval(inputValue);
        }
    });

    // Function to update the grid interval
    function updateGridInterval(interval) {
        chart.options.scales.x.ticks.stepSize = interval / 1000;
        chart.update();
    }
});
