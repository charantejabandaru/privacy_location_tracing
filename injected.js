function requestLocationAccess() {
    const event = new CustomEvent("locationRequest", {
        detail: { action: "location_request" },
    });
    document.dispatchEvent(event);
}

navigator.geolocation.getCurrentPosition = function (successCallback, errorCallback, options) {
    console.log("Intercepted location request: getCurrentPosition");

    requestLocationAccess();

    document.addEventListener("locationResponse", (event) => {
        const response = event.detail;
        let latitude = 17.524741, longitude = 78.39631;
        
        switch(response.mode){
            case 'customize': 
                latitude = response.latitude;
                longitude = response.longitude;
                break;
            case 'offset':
                latitude = latitude+response.offset;
                longitude = longitude+response.offset;
                break;
            default:
                break;
        }
        if (response) {
            const fakePosition = {
                coords: {
                    latitude: latitude,
                    longitude: longitude,
                    accuracy: 10,
                },
                timestamp: Date.now(),
            };
            successCallback(fakePosition);
        } else {
            errorCallback(new Error("User denied location access"));
        }
    });
};

navigator.geolocation.watchPosition = function (successCallback, errorCallback, options) {
    console.log("Intercepted location request: watchPosition");

    requestLocationAccess();

    let fakePosition;
    let watchId;

    const handleResponse = (event) => {
        const response = event.detail;
        let latitude = 17.524741, longitude = 78.39631;
        switch(response.mode){
            case 'customize': 
                latitude = response.latitude;
                longitude = response.longitude;
                break;
            case 'offset':
                latitude = latitude+response.offset;
                longitude = longitude+response.offset;
                break;
            default:
                break;
        }
        if (response) {
            fakePosition = {
                coords: {
                    latitude: latitude,
                    longitude: longitude,
                    accuracy: 10,
                },
                timestamp: Date.now(),
            };

            watchId = setInterval(() => {
                fakePosition.timestamp = Date.now(); 
                successCallback(fakePosition);
            }, 1000);
        } else {
            errorCallback(new Error("User denied location access"));
        }

        document.removeEventListener("locationResponse", handleResponse);
    };

    document.addEventListener("locationResponse", handleResponse);

    return Date.now();
};

