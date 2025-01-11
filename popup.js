const customizeInputs = document.getElementById("customize-inputs");
const offsetInput = document.getElementById("offset-input");

// Handle radio button changes
const modeRadios = document.getElementsByName("mode");
modeRadios.forEach(radio => {
    radio.addEventListener("change", () => {
        if (radio.value === "customize") {
            customizeInputs.classList.remove("hidden");
            offsetInput.classList.add("hidden");
        } else if (radio.value === "offset") {
            offsetInput.classList.remove("hidden");
            customizeInputs.classList.add("hidden");
        } else if (radio.value === "precise") {
            customizeInputs.classList.add("hidden");
            offsetInput.classList.add("hidden");
        }
    });
});

// Handle form submission
document.getElementById("submit").addEventListener("click", () => {
    const selectedMode = Array.from(modeRadios).find(radio => radio.checked)?.value;
    const latitude = parseFloat(document.getElementById("latitude")?.value || 0);
    const longitude = parseFloat(document.getElementById("longitude")?.value || 0);
    const offset = parseFloat(document.getElementById("offset")?.value || 0);

    chrome.runtime.sendMessage({
        action: "popup_response",
        data: { mode: selectedMode, latitude, longitude, offset },
    });

    window.close();
});