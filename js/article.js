// Create div object to place the XML content in
function generateParagraph(content) {

    let div = document.createElement("div");
    
    div.classList.add("article-paragraph");
    div.innerHTML = content;

    return div;
}


// Load article
const params = new URLSearchParams(window.location.search);

let section = params.get('section');
let title = params.get('title');

fetchArticleXML(`data/${section}/${title}`).then(dom => {

    // Set title and subtitle
    document.getElementById("article-title").innerHTML = dom.getElementsByTagName("title")[0].innerHTML;
    document.getElementById("article-subtitle").innerHTML = dom.getElementsByTagName("date")[0].innerHTML;
    console.log(dom);
    // Fill paragraphs out
    for (paragraph of dom.getElementsByTagName("p"))
    {
        document.getElementById("article-content").appendChild(
            generateParagraph(paragraph.outerHTML)
        );
    }

}).catch(err => {
    console.error(err);
    window.location.href = "/";
})