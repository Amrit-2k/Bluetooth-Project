document.addEventListener("DOMContentLoaded", () => {
    const scanButton = document.getElementById("scanButton");
    const deviceList = document.getElementById("deviceList");
    const connectedDeviceDiv = document.getElementById("connectedDevice");

    // Initialize an array to store connected devices
    const connectedDevices = [];

    // Function to add a device to the connectedDevices array and update the UI
    function addConnectedDevice(device) {
        connectedDevices.push(device);
        const listItem = document.createElement("li");
        listItem.textContent = `${device.name || "Unknown Device"} - ${device.id}`;
        deviceList.appendChild(listItem);
    }

    // Function to display connected devices on page load
    function displayConnectedDevices() {
        // Sort devices based on whether they have a name or not
        connectedDevices.sort((a, b) => {
            const nameA = a.name || "Unknown Device";
            const nameB = b.name || "Unknown Device";

            // Devices with names other than "Unknown Device" come first
            if (nameA !== "Unknown Device" && nameB === "Unknown Device") {
                return -1;
            } else if (nameA === "Unknown Device" && nameB !== "Unknown Device") {
                return 1;
            } else {
                // If both have names or both are "Unknown Device", sort alphabetically
                return nameA.localeCompare(nameB);
            }
        });

        // Clear the device list
        deviceList.innerHTML = "";

        // Add sorted devices to the UI
        connectedDevices.forEach(device => {
            addConnectedDevice(device);
        });
    }

        // Event listener for the Scan button
    scanButton.addEventListener("click", async () => {
        try {
            const device = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
            });

            // Wrap the device object in an array or convert it to an array
            const devices = Array.isArray(device) ? device : [device];

            devices.forEach(device => {
                addConnectedDevice(device);
            });

            // Display connected devices with sorting
            displayConnectedDevices();

        } catch (error) {
            console.error("Bluetooth error:", error);
        }
    });
    // Event listener for the Scan button
 

    // Function to display connected device information
    function displayConnectedDevice(device) {
        const deviceInfo = document.createElement("p");
        deviceInfo.textContent = `Connected to: ${device.name || "Unknown Device"} - ${device.id}`;
        connectedDeviceDiv.innerHTML = "";
        connectedDeviceDiv.appendChild(deviceInfo);
    }

    // Handle device connection
    async function connectToDevice(device) {
        try {
            const server = await device.gatt.connect();
            // Perform further actions with the connected device here
            displayConnectedDevice(device);
        } catch (error) {
            console.error("Bluetooth connection error:", error);
        }
    }

    // Display connected devices on page load
    displayConnectedDevices();
});
