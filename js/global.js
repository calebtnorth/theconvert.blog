// JavaScript shared between all pages of the website

// ************ //
// Mobile Check //
// ************ //

if (navigator.maxTouchPoints > 0) {
    document.documentElement.dataset.platform = "mobile";
}


// *************** //
// File Management //
// *************** //


function fetchFile(path) {
    return fetch(path)
        .then(response => { return response.text() })
        .then(text => {
            return text;
        });
}

function fetchArticleXML(path) {
    return fetchFile(path).then(text => {
        return new DOMParser().parseFromString(text, "application/xml");
    });
}

function fetchArticleManifest() {  
    return fetchFile("data/manifest.json").then(text => {
        return JSON.parse(text);
    });
}