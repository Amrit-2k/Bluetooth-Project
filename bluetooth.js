document.addEventListener("DOMContentLoaded", () => {
    const scanButton = document.getElementById("scanButton");
    const deviceList = document.getElementById("deviceList");
    const connectedDeviceDiv = document.getElementById("connectedDevice");
    const deviceDataDiv = document.getElementById("deviceData");
    const lineGraphCanvas = document.getElementById("lineGraph");

    // Placeholder for real-time line graph (you can use a charting library like Chart.js)
    const lineGraphContext = lineGraphCanvas.getContext("2d");

    // Function to add a device to the connectedDevices array and update the UI
    function addConnectedDevice(device) {
        // Code for connecting to the device and retrieving data goes here

        // Simulated data (replace with actual data from your device)
        const deviceInfo = `${device.name || "Unknown Device"} - ${device.id}`;
        const deviceData = "Simulated ECG Data: 75, 78, 80, 82, 85, 88, 90, 92, 94, 96, 98, 100";

        // Update the connected device info and device data
        connectedDeviceDiv.textContent = deviceInfo;
        deviceDataDiv.textContent = deviceData;

        // Update the line graph (placeholder code)
        updateLineGraph([75, 78, 80, 82, 85, 88, 90, 92, 94, 96, 98, 100]);
    }

    // Placeholder function to update the line graph (replace with actual graphing library)
    function updateLineGraph(data) {
        // Clear the canvas
        lineGraphContext.clearRect(0, 0, lineGraphCanvas.width, lineGraphCanvas.height);

        // Placeholder line graph drawing (replace with actual graphing library)
        lineGraphContext.beginPath();
        lineGraphContext.moveTo(0, 0);

        const stepX = lineGraphCanvas.width / (data.length - 1);
        const maxY = Math.max(...data);
        const stepY = lineGraphCanvas.height / maxY;

        for (let i = 0; i < data.length; i++) {
            const x = i * stepX;
            const y = lineGraphCanvas.height - data[i] * stepY;
            lineGraphContext.lineTo(x, y);
        }

        lineGraphContext.stroke();
    }

    // Event listener for the Scan button
    scanButton.addEventListener("click", async () => {
        try {
            const devices = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
            });

            devices.forEach(device => {
                addConnectedDevice(device);
            });

        } catch (error) {
            console.error("Bluetooth error:", error);
        }
    });
});
``
