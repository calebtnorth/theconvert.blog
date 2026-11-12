
function addParagraph(content)
{
    var element = document.importNode(
        document.querySelector("#article-content-paragraphs-template").content, true
    );

    // Set up element
    element.querySelector("p").innerHTML = content;
    return element;
}

fetchArticleXML("data/articles/dummy.xml").then(dom => 
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
})