const params = new URLSearchParams(window.location.search);
let section = params.get('section');
let article = params.get('article');


// Link Copying Function
function copyLink()
{
    // Copy the text inside the text field
    navigator.clipboard.writeText(`https://theconvert.blog?shared&s=${section}&a=${article}`);
    alert("Copied to clipboard");
}

// Downloading function
function downloadPDF()
{

}


// Create div object to place the XML content in
function generateParagraph(content) {
    let div = document.createElement("div");
    
    div.classList.add("article-paragraph");
    div.innerHTML = content;

    return div;
}


// Load article
fetchArticleXML(`data/${section}/${article}/article.xml`)
    .then(dom => {

        // Set title and subtitle
        let title = dom.getElementsByTagName("title")[0].innerHTML

        document.getElementById("article-title").innerHTML = title;
        document.getElementsByTagName("title")[0].innerHTML = "The Convert / " + title;

        document.getElementById("article-subtitle").innerHTML = dom.getElementsByTagName("date")[0].innerHTML;

        // Set the download button
        let downloadButton = document.getElementById("article-download");
        downloadButton.href = `data/${section}/${article}/pdf_download.pdf`;
        downloadButton.download = `${title}`;

        // Fill paragraphs out
        for (paragraph of dom.getElementsByTagName("p"))
        {
            document.getElementById("article-content").appendChild(
                generateParagraph(paragraph.outerHTML)
            );
        }

    }).catch(err => {
        console.error(err);
        // window.location.href = "/";
    })