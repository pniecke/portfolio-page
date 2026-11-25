const projectGrid = document.querySelector(".project-grid");
const currentYear = document.querySelector(".current-year");

const categoryLabels = {
    study: "Studium",
    private: "Privat"
};

function createTechList(techs) {
    const list = document.createElement("ul");
    list.classList.add("project-tech");

    for (const tech of techs) {
        const item = document.createElement("li");
        item.textContent = tech;
        list.append(item);
    }

    return list;
}

function createProjectCard(project) {
    const card = document.createElement("article");
    card.classList.add("project-card");

    const category = document.createElement("p");
    category.classList.add("project-category");
    category.textContent = categoryLabels[project.category];

    const title = document.createElement("h3");
    title.classList.add("project-title");
    title.textContent = project.title;

    const description = document.createElement("p");
    description.textContent = project.description;

    card.append(category, title, description);

    if (project.tech) {
        card.append(createTechList(project.tech));
    }

    return card;
}

async function loadProjects() {
    try {
        const response = await fetch("data/projects.json");
        const projects = await response.json();

        for (const project of projects) {
            projectGrid.append(createProjectCard(project));
        }
    } catch (error) {
        projectGrid.textContent = "Die Projekte konnten nicht geladen werden.";
    }
}

function showCurrentYear() {
    currentYear.textContent = new Date().getFullYear();
}

loadProjects();
showCurrentYear();
