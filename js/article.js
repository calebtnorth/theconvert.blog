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
let article = params.get('article');

fetchArticleXML(`data/${section}/${article}/article.xml`).then(dom => {

    // Set title and subtitle
    let title = dom.getElementsByTagName("title")[0].innerHTML

    document.getElementById("article-title").innerHTML = title;
    document.getElementsByTagName("title")[0].innerHTML = "The Convert / " + title;

    document.getElementById("article-subtitle").innerHTML = dom.getElementsByTagName("date")[0].innerHTML;

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