function addSection(section_title)
{
    var element = document.importNode(
        document.querySelector("#section-template").content, true
    );

    // Set up element
    element.querySelector(".section-title").textContent = section_title.toUpperCase();
    for (let i = 0; i < 10; i++)
    {
        element.querySelector(".section").appendChild(addEntry("Title " + i, "Subtitle " + i));
    }

    return element;
}

function addEntry(title, subtitle)
{
    var element = document.importNode(
        document.querySelector("#entry-template").content, true
    );

    // Set up element
    element.querySelector(".entry-title").textContent = title.toUpperCase();
    element.querySelector(".entry-subtitle").textContent = subtitle.toUpperCase();

    return element;
}

for (let i = 0; i < 10; i++){
document.querySelector("#sections").appendChild(
    addSection("Section")
);
}