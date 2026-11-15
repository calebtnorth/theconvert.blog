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
function addSection(section_title) {
    var element = document.importNode(
        document.querySelector("#section-template").content, true
    );

    element.querySelector(".section-title").textContent = section_title.toUpperCase();
    return element;
}


function addEntry(url, title, subtitle) {
    var element = document.importNode(
        document.querySelector("#entry-template").content, true
    );

    // Set up element
    element.querySelector(".section-entry").href = url;
    element.querySelector(".entry-title").textContent = title.toUpperCase();
    element.querySelector(".entry-subtitle").textContent = subtitle.toUpperCase();

    return element;
}


// Process all articles
async function fetchArticles() {
    const json      = await fetchArticleManifest();
    const sections  = document.getElementById("sections");

    // For each section ...
    for (const section of json.sections) {

        // ... create the node and set the title ...
        const newSection = addSection(section.title);
        
        // ... and add the children.
        for (const articlePath of section.articles) {

            const dom = await fetchArticleXML(`data/${section.title}/${articlePath}/article.xml`);

            newSection.appendChild(addEntry(
                `article.html?section=${section.title}&article=${articlePath}`,
                dom.getElementsByTagName("title")[0].textContent,
                dom.getElementsByTagName("date")[0].textContent
            ));
        }

        sections.appendChild(newSection);
    }
}

redirectIfNeeded();
fetchArticles().catch(err => console.error(err));

