const projects = [
    { name: "Ase AI", link: "#" },
    { name: "Move Show Recreate", link: "#" },
    { name: "Quick Wrap", link: "#" },
    { name: "Gift Idea Genius", link: "#" },
    { name: "Story to Vid", link: "#" }
];

const projectContainer = document.getElementById("projectContainer");

projects.forEach(project => {
    const projectElement = document.createElement("div");
    projectElement.classList.add("project");
    projectElement.innerHTML = `<a href="${project.link}" target="_blank">${project.name}</a>`;
    projectContainer.appendChild(projectElement);
});
