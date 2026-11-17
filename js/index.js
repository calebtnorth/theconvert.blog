// Redirect Function
function redirectIfNeeded() {
    const params = new URLSearchParams(window.location.search);
    if (params.has("shared"))
    {
        let section = params.get("s");
        let article = params.get("a");

        window.location.href = `${window.location.origin}/article.html?section=${section}&article=${article}`;
    }
}


// Creation Functions
function addSection(section_json) {
    var element = document.importNode(
        document.querySelector("#section-template").content, true
    );

    element.querySelector(".section-title").textContent = section_json['title'].toUpperCase();

    return element;
}


function addEntry(url, title, subtitle, author) {
    var element = document.importNode(
        document.querySelector("#entry-template").content, true
    );

    // Set up element
    element.querySelector(".section-entry-wrapper").href = url;
    element.querySelector(".entry-title").textContent = title.toUpperCase();

    element.querySelector(".entry-date").textContent = subtitle.toUpperCase();
    element.querySelector(".entry-author-name").textContent = author.toUpperCase();

    return element;
}


// Process all articles
async function fetchArticles() {
    const json      = await fetchArticleManifest();
    const sections  = document.getElementById("sections");

    // For each section ...
    for (const sectionJSON of json.sections) {
        // ... create the node and set the title ...
        sections.appendChild(
            addSection(sectionJSON)
        );
    }

    // This is split because if this was nested in the above loop, the DOM freaks out
    // and doesn't add the children in the order needed for the CSS to function

    let section_index = 2;
    for (const sectionJSON of json.sections) {

        // ... and add the children.
        for (const articlePath of sectionJSON.articles) {

            const dom = await fetchArticleXML(`data/${sectionJSON.title}/${articlePath}/article.xml`);
            sections.children[section_index].appendChild(addEntry(
                `article.html?section=${sectionJSON.title}&article=${articlePath}`,
                dom.getElementsByTagName("title")[0].textContent,
                dom.getElementsByTagName("date")[0].textContent,
                dom.getElementsByTagName("author")[0].textContent
            ));
        }
        section_index++;
     
    }
}

redirectIfNeeded();
fetchArticles().catch(err => console.error(err));

