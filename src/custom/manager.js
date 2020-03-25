//*Page and project manager
//Pages Manager

class Manager {
    constructor(pages, projects) {
        this.currentProject = 0;
        this.currentIndex = 0;
        this.buildMangerPanel(pages, projects);
    }

    buildMangerPanel(pages, projects) {
        let iField = document.createElement('div');
        iField.className += "gjs-field";
        iField.style.margin = "10px 5px 10px 5px";
        let label = document.createElement('div');
        label.innerHTML = 'Add Project <i class="fa fa-plus-square"></i>';
        label.style.marginLeft = "8px";
        label.style.fontSize = "14px";
        let input = document.createElement('input');
        input.placeholder = "Enter project name then enter";

        iField.appendChild(input);
        document.querySelector('#projects-tab').appendChild(label);
        document.querySelector('#projects-tab').appendChild(iField);
        let projectsMenu = this.buildProjectsSection(projects);
        document.querySelector('#projects-tab').appendChild(projectsMenu);
        let pagesMenu = this.buildPagesSection(pages);
        document.querySelector('#workspace-tab').appendChild(pagesMenu);
        document.getElementById('workspace').checked = true;
        document.getElementById('projects-tab').style.display = "none";
        document.getElementById('workspace').addEventListener('click', () => this.pageTabs());
        document.getElementById('projects').addEventListener('click', () => this.pageTabs());
    }

    pageTabs() {
        if (document.getElementById('workspace').checked) {
            document.getElementById('workspace-tab').style.display = "block";
            document.getElementById('projects-tab').style.display = "none";
        } else {
            document.getElementById('workspace-tab').style.display = "none";
            document.getElementById('projects-tab').style.display = "block";
        }
    }

    buildPagesSection(project) {
        let cont = document.createElement('div');
        cont.className += "gjs-block-categories";
        let iField = document.createElement('div');
        iField.className += "gjs-field";
        iField.style.margin = "10px 5px 10px 5px";
        let label = document.createElement('div');
        label.innerHTML = 'Add Page <i class="fa fa-plus-square"></i>';
        label.style.marginLeft = "8px";
        label.style.fontSize = "14px";
        let input = document.createElement('input');
        input.placeholder = "Enter page name then enter";

        iField.appendChild(input);
        cont.appendChild(label);
        cont.appendChild(iField);

        const pages = project.pages;
        let group = document.createElement('div');
        let pjTitle = document.createElement('div');
        let iconC = document.createElement('i');
        group.className += "gjs-block-category gjs-open";
        iconC.className += "gjs-caret-icon fa fa-caret-down";
        pjTitle.className += "gjs-title";
        pjTitle.addEventListener('click', function (e) {
            if (e.currentTarget.parentNode.className == "gjs-block-category gjs-open") {
                e.currentTarget.firstChild.className = e.currentTarget.firstChild.className.replace("fa-caret-down",
                    "fa-caret-right");
                e.currentTarget.parentNode.className = e.currentTarget.parentNode.className.replace("gjs-open", "");
                e = e.currentTarget.parentNode;
                e = e.childNodes;
                for (let i = 1; i < e.length; i++) {
                    e[i].style.display = "none";
                }
            } else {
                e.currentTarget.firstChild.className = e.currentTarget.firstChild.className.replace("fa-caret-right",
                    "fa-caret-down");
                e.currentTarget.parentNode.className += "gjs-open";
                e = e.currentTarget.parentNode;
                e = e.childNodes;
                for (let i = 1; i < e.length; i++) {
                    e[i].style.display = "block";
                }
            }
        });
        pjTitle.appendChild(iconC);
        pjTitle.innerHTML += project.name;
        group.appendChild(pjTitle);
        if (pages) {
            for (let i = 0; i < pages.length; i++) {
                //const element = pages[j];
                let pgTitle = document.createElement('div');
                let iconP = document.createElement('i');
                iconP.className += "page-icon fa fa-file";
                pgTitle.dataset.index = i;
                if (i == 0)
                    pgTitle.className += "page gjs-title page-open";
                else
                    pgTitle.className += "page gjs-title ";
                let iconX = document.createElement('i');
                iconX.className += "close fa fa-trash";
                iconX.title = "delete";
                iconX.addEventListener('click', function (e) {
                    let p = e.currentTarget.parentNode
                    p.style.display = "none";
                    this.destroy(project.pages[p.dataset.index]);
                    //switchPage()
                })
                //console.log(i, j);
                pgTitle.addEventListener('click', function (e) {
                    if (e.currentTarget.title != "delete") {
                        this.savePage(project.pages[this.currentIndex].name, project.pages[this.currentIndex]);
                        this.switchPage(project.pages[e.currentTarget.dataset.index]);
                        this.currentIndex = e.currentTarget.dataset.index;
                        let p = e.currentTarget.parentNode;
                        let c = p.childNodes;
                        for (let i = 1; i < c.length; i++) {
                            c[i].className = c[i].className.replace("page-open", "");
                        }
                        e.currentTarget.className += "page-open";
                    }
                });
                pgTitle.appendChild(iconP);
                pgTitle.innerHTML += pages[i].name;
                pgTitle.appendChild(iconX);
                group.appendChild(pgTitle);
            }
        }
        cont.appendChild(group);
        return cont;
    }

    buildProjectsSection(projects) {
        let cont = document.createElement('div');
        cont.className += "gjs-block-category";

        for (let i = 0; i < projects.length; i++) {
            //const pages = projects[i].pages;
            let pjTitle = document.createElement('div');
            let iconC = document.createElement('i');
            let iconX = document.createElement('i');
            iconX.className += "close fa fa-times";
            iconX.title = "unload";
            iconX.addEventListener('click', function (e) {
                let p = e.currentTarget.parentNode
                p.style.display = "none";
                this.destroy(projects[p.dataset.index]);
            })
            let iconD = document.createElement('i');
            iconD.className += "close fa fa-download";
            iconD.title = "download";
            if (i == 0) {
                pjTitle.style.color = "rgba(250, 201, 201, 0.9)";
                iconC.className += "gjs-caret-icon fa fa-folder-open ";
            } else
                iconC.className += "gjs-caret-icon fa fa-folder ";
            pjTitle.className += "project gjs-title";
            pjTitle.dataset.index = i;
            pjTitle.addEventListener('click', function (e) {
                if (e.currentTarget.title != "unload") {
                    let p = e.currentTarget.parentNode;
                    let c = p.childNodes;
                    for (let j = 0; j < c.length; j++) {
                        c[j].style.color = "cornsilk";
                        c[j].firstChild.className = c[j].firstChild.className.replace("fa-folder-open ", "fa-folder ");
                    }
                    this.switchProject(projects[e.currentTarget.dataset.index]);
                    this.currentProject = e.currentTarget.dataset.index;
                    e.currentTarget.style.color = "rgba(250, 201, 201, 0.9)";
                    e.currentTarget.firstChild.className = e.currentTarget.firstChild.className.replace("fa-folder ", "fa-folder-open ");
                }
            });
            pjTitle.appendChild(iconC);
            pjTitle.innerHTML += projects[i].name;
            pjTitle.appendChild(iconX);
            pjTitle.appendChild(iconD);
            cont.appendChild(pjTitle);
        }
        return cont;
    }

    savePage(name, page) {
        page.name = name;
        page.components = editor.getHtml(); //editor.getComponents
        page.style = editor.getCss(); //editor.getStyle.....Initial methods exeeding call stack
    }

    switchPage(page) {
        editor.setComponents(page.components);
        editor.setStyle(page.style);
    }

    destroy(object) {
        object = null;
    }

    switchProject(project) {
        this.savePage(_projects[this.currentProject].pages[this.currentIndex].name, _projects[this.currentProject].pages[this.currentIndex]);
        this.switchPage(project.pages[0]);
        this.currentIndex = 0;
        let pagesMenu = this.buildPagesSection(project);
        document.querySelector('#workspace-tab').innerHTML = "";
        document.querySelector('#workspace-tab').appendChild(pagesMenu);
    }
}

export default Manager