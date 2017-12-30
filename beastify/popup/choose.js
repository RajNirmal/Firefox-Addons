const hidePage = 'body >: not(.beastify-image){display : none;}';
console.log("The value of hidepage is " + hidePage);

function listenForClicks() {

    document.addEventListener("click", (e) => {
        function beastSelector(beastName) {
            switch (beastName) {
                case 'Img 1':
                    return browser.extension.getURL("./beasts/1.jpg");
                case 'Img 2':
                    return browser.extension.getURL("beasts/2.jpg");
                case 'Img 3':
                    return browser.extension.getURL("beasts/3.jpg");
                case 'Img 4':
                    return browser.extension.getURL("beasts/4.jpg");
                default:
                    console.log("Bugger off");
            }
        }

        function beastify(tabs) {
            browser.tabs.insertCSS({ code: hidePage }).then(() => {
                let url = beastSelector(e.target.textContent);
                browser.tabs.sendMessage(tabs[0].id, {
                    command: "beastify",
                    beastURL: url
                })
            });
        }

        function resetTabs(tabs) {
            browser.tabs.removeCSS({ code: hidePage }).then(() => {
                browser.tabs.sendMessage(tabs[0].id, {
                    command: "reset"
                });
            });
        }

        function reportError(error) {
            alert("The page cannot be beastified sucka");
            console.error("Cannot beastify the page");
            console.error(error);
        }

        if (e.target.classList.contains("beast")) {
            browser.tabs.query({ active: true, currentWindow: true }).then(beastify).catch(reportError);
        } else if (e.target.classList.contains("Reset")) {
            browser.tabs.query({ active: true, currentWindow: true }).then(resetTabs).catch(reportError);
        }
    });
}

function reportExecuteScriptError(error) {
    console.log("Shit happened");
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error("Failed to execute beastify content script: ${error.message}");
}

var result = browser.tabs.executeScript({ file: "/content_scripts/beastify.js" }).then(listenForClicks).catch(reportExecuteScriptError);