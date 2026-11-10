// JavaScript shared between all pages of the website

// ************ //
// Mobile Check //
// ************ //

if (navigator.maxTouchPoints > 0)
{
    document.documentElement.dataset.platform = "mobile";
}


// *************** //
// File Management //
// *************** //


function fetchArticleManifest(path)
{
    return fetch(path)
        .then(response => { return response.text() })
        .then(text => {
            return text;
        });
}


function fetchArticleXML(path)
{
    return fetch(path)
        .then(response => { return response.text() })
        .then(text => {
            return new DOMParser().parseFromString(text, "application/xml");
        });
}

fetchArticleManifest("data/manifest.json").then(x=>{console.log(x);});