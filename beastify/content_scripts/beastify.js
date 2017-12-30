(function() {

    if (window.hasRun) {
        console.log("The js has already run");
        return;
    }
    window.hasRun = true;
    console.log("Running the js for the first time");

    function removeExistingBeasts() {
        let existingBeasts = document.querySelectorAll(".beastify-image");
        for (let beast of existingBeasts) {
            console.log("The exisiting beast is " + beast);
            beast.remove();
        }
    }

    function insertBeast(beastURL) {
        removeExistingBeasts();
        let beastImage = document.createElement("img");
        beastImage.setAttribute("src", beastURL);
        beastImage.style.height = "100vh";
        beastImage.className = "beastify-image";
        document.body.appendChild(beastImage);
        console.log("Beast appended");
    }

    browser.runtime.onMessage.addListener(messageConfirmed);

    function messageConfirmed(message) {
        console.log("Message confirmed " + message.beastURL);
        if (message.command === "beastify") {
            insertBeast(message.beastURL);
        } else if (message.command === "reset") {
            console.log("Reset command received");
            removeExistingBeasts();
        }
        return Promise.resolve({ response: "message Confirmed" });
    }
})();