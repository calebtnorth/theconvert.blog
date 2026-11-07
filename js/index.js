function addSection(section_title)
{
    var element = document.importNode(
        document.querySelector("#section-template").content, true
    );

    // Set up element
    element.querySelector(".section-title").textContent = section_title.toUpperCase();
    element.querySelector(".section").appendChild(
        addEntry("Windw", navigator.maxTouchPoints.toString())
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

// Mobile Check
if (navigator.maxTouchPoints > 0)
{
    document.documentElement.dataset.platform = "mobile";
    document.querySelector("#sections").appendChild(
        addSection("Mobile")
    );
}
console.log(navigator.userAgent);
console.log(window);