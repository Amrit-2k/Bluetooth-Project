document.addEventListener("DOMContentLoaded", () => {
    const scanButton = document.getElementById("scanButton");
    const deviceList = document.getElementById("deviceList");

    scanButton.addEventListener("click", async () => {
        try {
            const devices = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
            });

            devices.forEach(device => {
                const listItem = document.createElement("li");
                listItem.textContent = `${device.name || "Unknown Device"} - ${device.id}`;
                deviceList.appendChild(listItem);
            });

        } catch (error) {
            console.error("Bluetooth error:", error);
        }
    });
});
