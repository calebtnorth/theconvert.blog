
function addParagraph(content)
{
    var element = document.importNode(
        document.querySelector("#article-content-paragraphs-template").content, true
    );

    // Set up element
    element.querySelector("p").innerHTML = content;
    return element;
}


// Load article
const params = new URLSearchParams(window.location.search);

let section = params.get('section');
let title = params.get('title');

console.log(section);
console.log(title);

fetchArticleXML(`data/${section}/${title}`).then(dom => 
{
    // Set title and subtitle
    document.getElementById("article-title").innerHTML = dom.getElementsByTagName("title")[0].innerHTML;
    document.getElementById("article-subtitle").innerHTML = dom.getElementsByTagName("date")[0].innerHTML;


    // Fill paragraphs out
    for (paragraph of dom.getElementsByTagName("paragraph"))
    {
        document.getElementById("article-content").appendChild(
            addParagraph(paragraph.innerHTML)
        );
    }
}).catch(err => {
    console.error(err);
    window.location.href = "index.html";
})