//*Page and project manager
//Pages Manager

class Manager {
    constructor(projects) {
        //TODO SET PROJECT URL DYNAMICALLY;
        this.urlLoadProject = editor.Config.pluginsOpts["grapesjs-grapeflow"].urlLoadProjects
        this.urlStoreProject = editor.Config.pluginsOpts["grapesjs-grapeflow"].urlStoreProjects
        editor.Config.pluginsOpts["grapesjs-grapeflow"].urlLoadProjects = this.urlLoadProject + "38791566-b8c1-449a-aae4-9870df8d3d24"
        editor.Config.pluginsOpts["grapesjs-grapeflow"].urlStoreProjects = this.urlStoreProject + "38791566-b8c1-449a-aae4-9870df8d3d24/"
        this.urlLoad = editor.Config.pluginsOpts["grapesjs-grapeflow"].urlLoadPages;
        this.urlStore = editor.Config.pluginsOpts["grapesjs-grapeflow"].urlStorePages;
        const fs = editor.StorageManager.get('flow-storage');
        this.name = 'Placeholder'
        this.project = null;
        this.currentIndex = '';
        this.currentProject = '';
        this.properties = {
            name: '',
            thumbnail: '',
            favicon: '',
            webclip: '',
            metaTitle: '',
            metaDesc: ''
        };
        fs.viewProject(res => {
            this.name = res.name;
            fs.loadProject(result => {
                this.project = result;
                this.currentIndex = this.project[0].uuid; //todo Init to the uuid
                this.properties.name = this.project[0].name;
                this.properties.thumbnail = this.project[0].thumbnail;
                this.properties.favicon = this.project[0].favicon;
                this.properties.webclip = this.project[0].webclip;
                this.properties.metaTitle = this.project[0].metaTitle;
                this.properties.metaDesc = this.project[0].metaDesc;
                editor.Config.pluginsOpts["grapesjs-grapeflow"].urlLoadPages = this.urlLoad + this.currentIndex;
                editor.Config.pluginsOpts["grapesjs-grapeflow"].urlStorePages = this.urlStore + this.currentIndex + "/";
                this.buildMangerPanel(this.name, projects); //todo Get project name
                console.log("Project loaded");
            });
        })
    }

    /**
     * Project manager panel
     * @param {String} name project name
     * @param {Object} projects object containing projects
     */
    buildMangerPanel(name, projects) {
        //let iField = document.createElement('div');
        //iField.className += "gjs-field";
        //iField.style.margin = "10px 5px 10px 5px";
        //let label = document.createElement('div');
        //label.innerHTML = 'Add Project <i class="fa fa-plus-square"></i>';
        //label.style.marginLeft = "8px";
        //label.style.fontSize = "14px";
        //let input = document.createElement('input');
        //input.placeholder = "Enter project name then enter";

        //iField.appendChild(input);
        //document.querySelector('#properties-tab').appendChild(label);
        //document.querySelector('#properties-tab').appendChild(iField);
        //let projectsMenu = this.buildProjectsSection(projects); //? Projects no longer supported
        //todo putting appending projects to a modal...or start menu
        let propertiesMenu = this.buildPropertiesSection();
        document.querySelector('#properties-tab').appendChild(propertiesMenu);
        let pagesMenu = this.buildPagesSection(name);
        document.querySelector('#workspace-tab').appendChild(pagesMenu);
        document.getElementById('workspace').checked = true;
        document.getElementById('properties-tab').style.display = "none";
        document.getElementById('workspace').addEventListener('click', () => this.pageTabs());
        document.getElementById('properties').addEventListener('click', () => this.pageTabs());
    }

    pageTabs() {
        if (document.getElementById('workspace').checked) {
            document.getElementById('workspace-tab').style.display = "block";
            document.getElementById('properties-tab').style.display = "none";
        } else {
            document.getElementById('workspace-tab').style.display = "none";
            document.getElementById('properties-tab').style.display = "block";
        }
    }

    buildProjectModal(projects) {
        const modal = editor.modal;
        const container = document.createElement('div');
        return {
            run(editor) {
                modal.setTitle("Projects");
                modal.setContent(container);
                modal.open().getModel()
                    .once('change:open', () => editor.stopCommand(this.id));
                viewerEditor.refresh();
            },

            stop() {
                modal.close();
            }
        }
    }

    buildPagesSection(name) {
        let cont = document.createElement('div');
        cont.className += "gjs-block-categories";
        let iField = document.createElement('div');
        iField.className += "gjs-field";
        iField.style.margin = "10px 5px 10px 5px";
        let label = document.createElement('div');
        label.innerHTML = 'Add Page <i class="fa fa-plus-square"></i>';
        label.style.marginLeft = "8px";
        label.style.fontSize = "14px";
        //todo use modal to give options for new page creation
        let input = document.createElement('input');
        input.placeholder = "Enter page name then enter";

        iField.appendChild(input);
        cont.appendChild(label);
        cont.appendChild(iField);

        //*const pages = project.pages;
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
        pjTitle.innerHTML += name; //? project.name; name no longer included 
        group.appendChild(pjTitle);
        if (this.project.length > 0) {
            for (let page in this.project) {
                //const element = pages[j];
                let pgTitle = document.createElement('div');
                let iconP = document.createElement('i');
                iconP.className += "page-icon fa fa-file-o";
                pgTitle.dataset.index = this.project[page].uuid; //todo not index but uuid
                if (page.uuid == this.currentIndex)
                    pgTitle.className += "page gjs-title page-open";
                else
                    pgTitle.className += "page gjs-title ";
                let iconX = document.createElement('i');
                iconX.className += "close fa fa-trash";
                iconX.title = "delete";
                //todo rewrite the destroy function so that it sends delete request to the server
                iconX.addEventListener('click', e => {
                    //todo fix this function so that it does not conflict with the switch page function
                    //*let p = e.currentTarget.parentNode
                    //?p.style.display = "none";
                    //!this.deletePage();
                })
                //console.log(i, j);
                //todo rewrite save function so that it sends a save request to the server
                //todo rewrite switchPage function so that it fetches the required page from server
                pgTitle.addEventListener('click', e => {
                    if (e.currentTarget.title != "delete") {
                        //todo check if event is equal to the current open page
                        if (e.currentTarget.dataset.index != this.currentIndex) {
                            this.storePage();
                            //todo change the load url
                            editor.Config.pluginsOpts["grapesjs-grapeflow"].urlLoadPages = this.urlLoad + e.currentTarget.dataset.index;
                            this.loadPage();
                            //todo change the storage url -> load url
                            editor.Config.pluginsOpts["grapesjs-grapeflow"].urlStorePages = this.urlStore + e.currentTarget.dataset.index + "/";
                            this.currentIndex = e.currentTarget.dataset.index;
                            let p = e.currentTarget.parentNode;
                            let c = p.childNodes;
                            for (let i = 1; i < c.length; i++) {
                                c[i].className = c[i].className.replace("page-open", "");
                            }
                            e.currentTarget.className += "page-open";
                        }
                    }
                });
                //todo add double click event for editting the page names
                pgTitle.appendChild(iconP);
                pgTitle.innerHTML += this.project[page].name;
                pgTitle.appendChild(iconX);
                group.appendChild(pgTitle);
            }
        }
        cont.appendChild(group);
        this.project = null; //?Destroy the object
        return cont;
    }

    buildPropertiesSection() {
        //todo replace projects section with this section
        let cont = document.createElement('div');
        const properties = [{
                name: 'name',
                label: 'Name <i class="fa fa-info-circle"></i>',
                placeholder: 'eg. name'
            },
            {
                name: 'thumbnail',
                label: 'Thumbnail <i class="fa fa-link"></i>',
                placeholder: 'eg. http://example.com'
            },
            {
                name: 'favicon',
                label: 'Favicon <i class="fa fa-link"></i>',
                placeholder: 'eg. http://example.com'
            },
            {
                name: 'webclip',
                label: 'Webclip <i class="fa fa-link"></i>',
                placeholder: 'eg. http://example.com'
            },
            {
                name: 'metaTitle',
                label: 'Meta Title <i class="fa fa-info-circle"></i>',
                placeholder: 'eg. title'
            },
            {
                name: 'metaDesc',
                label: 'Meta Description <i class="fa fa-info-circle"></i>',
                placeholder: 'eg. description'
            },
        ];
        for (let prop in properties) {
            let iField = document.createElement('div');
            iField.className += "gjs-field";
            iField.style.margin = "5px 5px 10px 5px";
            let label = document.createElement('div');
            label.innerHTML = properties[prop].label;
            label.style.marginLeft = "8px";
            label.style.fontSize = "14px";
            let input = document.createElement('input');
            input.placeholder = properties[prop].placeholder;
            input.name = properties[prop].name;
            input.value = this.properties[properties[prop].name];
            input.addEventListener('change', e => {
                this.properties[e.target.name] = e.target.value;
            });

            iField.appendChild(input);
            cont.appendChild(label);
            cont.appendChild(iField);
        }
        let b = document.createElement('button');
        b.id = "save-properties";
        b.innerHTML = '<i class="fa fa-link-cloud-upload"></i>Save Properties';
        b.style.margin = "10px 5px 10px 5px";
        b.className += "gjs-btn-prim";
        b.addEventListener('click', (e) => {
            const clb = (res) => {
                console.log("Properties updated...")
            }
            const clbErr = (err) => {
                console.error(err);
            }
            const rs = editor.StorageManager.get('remote');
            const url = this.urlStore + this.currentIndex + "/";
            rs.request(url, {
                body: this.properties,
            }, clb, clbErr);
        });
        cont.appendChild(b)
        return cont
    }

    storePage() {
        //? run regularly
        editor.store(res => console.log('Store page'));
    }

    loadPage() {
        return editor.load(res => {
            editor.setComponents(res.components);
            editor.setStyle(res.style);
            this.properties.name = res.name;
            this.properties.thumbnail = res.thumbnail;
            this.properties.favicon = res.favicon;
            this.properties.webclip = res.webclip;
            this.properties.metaTitle = res.metaTitle;
            this.properties.metaDesc = res.metaDesc;
            let propertiesMenu = this.buildPropertiesSection();
            const tab = document.querySelector('#properties-tab');
            tab.innerHTML = "";
            tab.appendChild(propertiesMenu);
        });
    }

    createPage() {
        const fs = editor.StorageManager.get('flow-storage');
        fs.create(res => console.log('Create page'));
    }

    deletePage() {
        const fs = editor.StorageManager.get('flow-storage');
        fs.delete(res => console.log('Delete page'));
    }

    /*******************************************************
     * !This section might be deprecated inside the editor *
     *******************************************************/
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
            pjTitle.addEventListener('click', e => {
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

    //!All utitility functions must be rewritten to use storage manager
    savePage(name, page) {
        page.name = name;
        page.components = editor.getHtml(); //editor.getComponents
        page.style = editor.getCss(); //editor.getStyle.....Initial methods exeeding call stack
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