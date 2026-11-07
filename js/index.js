function addSection(section_title)
{
    var element = document.importNode(
        document.querySelector("#section-template").content, true
    );

    // Set up element
    element.querySelector(".section-title").textContent = section_title.toUpperCase();
    element.querySelector(".section").appendChild(
        addEntry("Entry Title", "January 01 1970")
    );

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

document.querySelector("#sections").appendChild(
    addSection("Section")
);