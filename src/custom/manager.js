//*Page and project manager
//Pages Manager
import {
    pageTab,
    propertiesTab,
    pfx,
    loader,
    $
} from './../consts';
import htmlToImage from 'html-to-image';

const properties = [{
        name: 'name',
        label: 'Name',
        placeholder: 'eg. name',
        url: false,
        radio: false
    },
    {
        name: 'thumbnail',
        label: 'Thumbnail <i class="fa fa-link"></i>',
        placeholder: 'example.com', //todo later introduce auto generation or file field
        before: 'http://',
        after: '<i class="fa fa-camera"></i>',
        url: true,
        radio: false
    },
    {
        name: 'favicon',
        label: 'Favicon <i class="fa fa-link"></i>',
        placeholder: 'example.com', //todo introduce file field
        before: 'http://',
        after: '<i class="fa fa-upload"></i>',
        url: true,
        radio: false
    },
    {
        name: 'webclip',
        label: 'Webclip <i class="fa fa-link"></i>',
        placeholder: 'example.com', //todo introduce file field
        before: 'http://',
        after: '<i class="fa fa-upload"></i>',
        url: true,
        radio: false
    },
    {
        name: 'metaTitle',
        label: 'Meta Title',
        placeholder: 'eg. title',
        url: false,
        radio: false
    },
    {
        name: 'metaDesc',
        label: 'Meta Description', // <i class="fa fa-info"></i>
        placeholder: 'eg. description',
        url: false,
        radio: false
    },
    {
        name: 'slug',
        label: 'Slug',
        placeholder: 'eg. slug',
        url: false,
        radio: false
    },
];

class Manager {
    constructor(projects) {
        this.urlLoad = editor.Config.pluginsOpts["grapesjs-grapeflow"].urlLoadPages;
        this.urlStore = editor.Config.pluginsOpts["grapesjs-grapeflow"].urlStorePages;
        const fs = editor.StorageManager.get('flow-storage');
        this.name = "Placeholder"
        this.project = null;
        //todo implement checking if IDB is still available, debug indexedDB and upload icon to upload after working offline
        this.disableIDB = true;
        this.useIndexedDB = false;
        this.db = null;
        this.currentIndex = '';
        this.currentProject = '';
        this.properties = {
            name: '',
            thumbnail: '',
            favicon: '',
            webclip: '',
            metaTitle: '',
            metaDesc: '',
            slug: '',
        };
        const clbErr = err => {
            console.warn("Error while loading project...", err);
            //console.error(err);
        }
        fs.viewProject(res => {
            //todo init settings, store projects in memory to prevent multiple server calls
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
                this.properties.slug = this.project[0].slug;
                editor.setComponents(JSON.parse(this.project[0].components.replace(/^"|"$/g, "")));
                editor.setStyle(JSON.parse(this.project[0].styles.replace(/^"|"$/g, "")));
                editor.Config.pluginsOpts["grapesjs-grapeflow"].urlLoadPages = this.urlLoad + this.currentIndex;
                editor.Config.pluginsOpts["grapesjs-grapeflow"].urlStorePages = this.urlStore + this.currentIndex + "/";
                if (typeof (indexedDB) !== undefined && !this.disableIDB) {
                    this.useIndexedDB = true;
                    this.createIndexedDB(this.project,
                        db => console.log("DB built successfully"),
                        err => console.log("An error occured building database"))
                }
                this.layerIconMap();
                this.buildMangerPanel(this.name, projects); //todo Get project name
                console.info("Project loaded", result);
            });
        }, clbErr);
    }

    createIndexedDB(pages, clb, clbErr) {
        //window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        //window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        //window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
        const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

        const request = indexedDB.open("pagesDB", 3);
        request.onerror = e => clbErr(e);
        request.onsuccess = e => {
            this.db = request.result;
            clb(this.db);
        };
        request.onupgradeneeded = e => {
            let db = e.target.result;
            const objStore = db.createObjectStore("page", {
                keyPath: "uuid"
            });

            for (let page in pages) {
                objStore.add(pages[page]);
            }
        }
    }

    indexedDBLoad(uuid, clb, clbErr) {
        const transaction = this.db.transaction(["page"]);
        const objStore = transaction.objectStore("page");
        const request = objStore.get(uuid);

        request.onerror = e => clbErr(e);
        request.onsuccess = e => {
            if (request.result)
                clb(request.result);
            else
                console.log("Record not found:", uuid);
        }
    }

    indexedDBStore(data, clb, clbErr) {
        const request = this.db.transaction(["page"], "readwrite")
            .objectStore("page")
            .add(data);
        request.onsuccess = e => clb(e);
        request.onerror = e => clbErr(e);
    }

    indexedDBUpdate(data, clb, clbErr) {
        const request = this.db.transaction(["page"], "readwrite")
            .objectStore("page")
            .get(data.uuid);
        request.onsuccess = e => {
            const requestUpdate = this.db.transaction(["page"], "readwrite")
                .objectStore("page")
                .put(data);
            requestUpdate.onerror = e => clbErr(e);
            requestUpdate.onsuccess = e => clb(e);
            clb(e);
        }
        request.onerror = e => clbErr(e);
    }

    indexedDBRemove(uuid, clb, clbErr) {
        const request = this.db.transaction(["page"], "readwrite")
            .objectStore("page")
            .delete(uuid);
        request.onsuccess = e => clb(e);
        request.onerror = e => clbErr(e);
    }

    layerIconMap() {
        const layerNames = document.getElementsByClassName('gjs-layer-name');
        for (let layer in layerNames) {
            let regexQuery = /^<i/;
            if (regexQuery.exec(layerNames[layer].innerHTML) == null && layerNames[layer].innerHTML != undefined) {
                switch (layerNames[layer].innerHTML) {
                    case 'Body':
                        layerNames[layer].innerHTML = '<i class="fa fa-cubes"></i> Body';
                        break;
                    case 'Text':
                        layerNames[layer].innerHTML = '<i class="fa fa-i-cursor"></i> Text';
                        break;
                    case 'Header':
                        layerNames[layer].innerHTML = '<i class="fa fa-header"></i> Header';
                        break;
                    case 'Box':
                        layerNames[layer].innerHTML = '<i class="fa fa-square-o"></i> Box';
                        break;
                    case 'Section':
                        layerNames[layer].innerHTML = '<i class="fa fa-object-group"></i> Section';
                        break;
                    case 'Link':
                        layerNames[layer].innerHTML = '<i class="fa fa-link"></i> Link';
                        break;
                    case 'Menu link':
                        layerNames[layer].innerHTML = '<i class="fa fa-link"></i> Menu link';
                        break;
                    case 'Footer':
                        layerNames[layer].innerHTML = '<i class="fa fa-long-arrow-down"></i> Footer'; //!icon
                        break;
                    case 'Input':
                        layerNames[layer].innerHTML = '<i class="fa fa-keyboard-o"></i> Input';
                        break;
                    case 'Button':
                        layerNames[layer].innerHTML = '<i class="fa fa-square"></i> Button'; //!icon
                        break;
                    case 'Image':
                        layerNames[layer].innerHTML = '<i class="fa fa-file-image-o"></i> Image';
                        break;
                    case 'Video':
                        layerNames[layer].innerHTML = '<i class="fa fa-file-video-o"></i> Video';
                        break;
                    case 'Row':
                        layerNames[layer].innerHTML = '<i class="fa fa-ellipsis-h"></i> Row';
                        break;
                    case 'Cell':
                        layerNames[layer].innerHTML = '<i class="fa fa-ellipsis-v"></i> Cell';
                        break;
                    case 'Column':
                        layerNames[layer].innerHTML = '<i class="fa fa-ellipsis-v"></i> Column';
                        break;
                    case 'Map':
                        layerNames[layer].innerHTML = '<i class="fa fa-map-o"></i> Map';
                        break;
                    case 'Label':
                        layerNames[layer].innerHTML = '<i class="fa fa-tag"></i> Label';
                        break;
                    case 'Checkbox':
                        layerNames[layer].innerHTML = '<i class="fa fa-check-square-o"></i> Checkbox';
                        break;
                    case 'Textarea':
                        layerNames[layer].innerHTML = '<i class="fa fa-align-left"></i> Textarea';
                        break;
                    case 'Select':
                        layerNames[layer].innerHTML = '<i class="fa fa-caret-square-o-down"></i> Select';
                        break;
                    case 'Radio':
                        layerNames[layer].innerHTML = '<i class="fa fa-dot-circle-o"></i> Radio';
                        break;
                    case 'Form':
                        layerNames[layer].innerHTML = '<i class="fa fa-address-card-o"></i> Form'; //!icon
                        break;
                    case 'Svg':
                        layerNames[layer].innerHTML = '<i class="fa fa-diamond"></i> Svg';
                        break;
                    case 'Nav':
                        layerNames[layer].innerHTML = '<i class="fa fa-location-arrow"></i> Nav';
                        break;
                    case 'Navbar':
                        layerNames[layer].innerHTML = '<i class="fa fa-map-signs"></i> Navbar';
                        break;
                    case 'Navbar Container':
                        layerNames[layer].innerHTML = '<i class="fa fa-object-group"></i> Navbar Container';
                        break;
                    case 'Navbar Menu':
                        layerNames[layer].innerHTML = '<i class="fa fa-bars"></i> Navbar Menu';
                        break;
                    case 'Burger':
                        layerNames[layer].innerHTML = '<i class="fa fa-bars"></i> Burger';
                        break;
                    case 'Burger Line':
                        layerNames[layer].innerHTML = '<i class="fa fa-window-minimize"></i> Burger Line';
                        break;
                    case 'Span':
                        layerNames[layer].innerHTML = '<i class="fa fa-columns"></i> Span';
                        break;
                    case 'Countdown':
                        layerNames[layer].innerHTML = '<i class="fa fa-clock-o"></i> Countdown';
                        break;
                    case 'Tooltip':
                        layerNames[layer].innerHTML = '<i class="fa fa-commenting-o"></i> Tooltip';
                        break;
                    case 'Tabs':
                        layerNames[layer].innerHTML = '<i class="fa fa-list-alt"></i> Tabs';
                        break;
                    case 'Tab':
                        layerNames[layer].innerHTML = '<i class="fa fa-long-arrow-right"></i> Tabs';
                        break;
                    case 'Tab Container':
                        layerNames[layer].innerHTML = '<i class="fa fa-object-group"></i> Tab Container';
                        break;
                    case 'Tab Content':
                        layerNames[layer].innerHTML = '<i class="fa fa-align-center"></i> Tab Content';
                        break;
                    case 'Slider':
                        layerNames[layer].innerHTML = '<i class="fa fa-sliders"></i> Slider';
                        break;
                    case 'Slider Frame':
                        layerNames[layer].innerHTML = '<i class="fa fa-window-maximize"></i> Slide Frame';
                        break;
                    case 'Slides':
                        layerNames[layer].innerHTML = '<i class="fa fa-file-powerpoint-o"></i> Slides';
                        break;
                    case 'Slide':
                        layerNames[layer].innerHTML = '<i class="fa fa-play-circle-o"></i> Slide';
                        break;
                    case 'Nav Previous':
                        layerNames[layer].innerHTML = '<i class="fa fa-caret-square-o-left"></i> Nav Previous';
                        break;
                    case 'Nav Next':
                        layerNames[layer].innerHTML = '<i class="fa fa-caret-square-o-right"></i> Nav Next';
                        break;
                    case 'Typed':
                        layerNames[layer].innerHTML = '<i class="fa fa-text-height"></i> Typed';
                        break;
                    default:
                        layerNames[layer].innerHTML = '<i class="fa fa-cube"></i> ' + layerNames[layer].innerHTML;
                }
            }
        }
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
        const pt = document.getElementById(propertiesTab.id + '-tab');
        pt.appendChild(this.buildPropertiesSection());
        const wt = document.getElementById(pageTab.id + '-tab');
        wt.appendChild(this.buildPagesSection(name));
        const w = document.getElementById(pageTab.id);
        w.checked = true;
        pt.style.display = "none";
        w.addEventListener('click', () => this.pageTabs());
        document.getElementById(propertiesTab.id).addEventListener('click', () => this.pageTabs());
        //?way to map newly added components
        editor.on('block:drag:stop', () => this.layerIconMap());
        editor.on('component:drag:end', () => this.layerIconMap());
        editor.on('component:add', () => this.layerIconMap());
        editor.on('undo', () => this.layerIconMap());
        editor.on('redo', () => this.layerIconMap());
        //editor.on('component:clone', () => layerIconMap());
    }

    pageTabs() {
        if (document.getElementById(pageTab.id).checked) {
            document.getElementById(pageTab.id + '-tab').style.display = "block";
            document.getElementById(propertiesTab.id + '-tab').style.display = "none";
        } else {
            document.getElementById(pageTab.id + '-tab').style.display = "none";
            document.getElementById(propertiesTab.id + '-tab').style.display = "block";
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
        const cont = document.createElement('div');
        cont.className += pfx + "block-categories";
        const create = this.buildCreateInput();
        cont.appendChild(create.label);
        cont.appendChild(create.iField);
        cont.appendChild(this.buildGroup(name));
        this.project = null; //?Destroy the object
        return cont;
    }

    buildGroup(name) {
        const group = document.createElement('div');
        const pjTitle = document.createElement('div');
        const iconC = document.createElement('i');
        const iconF = document.createElement('i');
        group.id = "project-pages";
        group.className += pfx + "block-category gjs-open";
        iconC.className += pfx + "caret-icon fa fa-caret-down";
        iconF.className += pfx + "caret-icon fa fa-folder-open-o";
        pjTitle.className += pfx + "title";
        pjTitle.addEventListener('click', e => this.onCollapse(e));
        pjTitle.appendChild(iconC);
        pjTitle.appendChild(iconF);
        pjTitle.innerHTML += name; //? project.name; name no longer included 
        group.appendChild(pjTitle);
        if (this.project.length > 0) {
            for (let page in this.project) {
                group.appendChild(this.buildPage(this.project[page]));
            }
        }
        return group;
    }

    buildCreateInput() {
        const iField = document.createElement('div');
        iField.className += pfx + "field left-menu-input";
        const label = document.createElement('div');
        label.innerHTML = 'Add Page <i class="fa fa-plus-square-o"></i>';
        label.className += "left-menu-label";
        //? use modal to give options for new page creation
        const input = document.createElement('input');
        input.placeholder = "Enter page name then unfocus";
        input.addEventListener('change', (e) => {
            if (e.target.value !== "") {
                this.name = e.target.value;
                this.buildPagesModal();
            }
        });

        iField.appendChild(input);
        return {
            label,
            iField
        };
    }

    onCollapse(e) {
        if (e.currentTarget.parentNode.className == pfx + "block-category " + pfx + "open") {
            e.currentTarget.firstChild.className = e.currentTarget.firstChild.className.replace("fa-caret-down",
                "fa-caret-right");
            e.currentTarget.parentNode.className = e.currentTarget.parentNode.className.replace(pfx + "open", "");
            e = e.currentTarget.parentNode;
            e = e.childNodes;
            for (let i = 1; i < e.length; i++) {
                e[i].style.display = "none";
            }
        } else {
            e.currentTarget.firstChild.className = e.currentTarget.firstChild.className.replace("fa-caret-right",
                "fa-caret-down");
            e.currentTarget.parentNode.className += pfx + "open";
            e = e.currentTarget.parentNode;
            e = e.childNodes;
            for (let i = 1; i < e.length; i++) {
                e[i].style.display = "block";
            }
        }
    }

    /**
     * Build a single page with given data
     * @param {Object} page page data e.g {name:"", assets:"", components:"", style:"", html:"", css:""} 
     */
    buildPage(page) {
        const pgTitle = document.createElement('div');
        const iconP = document.createElement('i');
        iconP.className += "page-icon fa fa-file-o";
        pgTitle.dataset.index = page.uuid; //todo not index but uuid
        if (page.uuid == this.currentIndex)
            pgTitle.className += pfx + "title page page-open ";
        else
            pgTitle.className += pfx + "title page ";
        const iconX = document.createElement('i');
        iconX.className += "close fa fa-trash-o";
        iconX.title = "delete";
        iconX.addEventListener('click', e => this.onPageDelete(e));
        pgTitle.addEventListener('click', e => this.onPageSwitch(e));
        pgTitle.appendChild(iconP);
        pgTitle.innerHTML += page.name;
        pgTitle.appendChild(iconX);
        return pgTitle;
    }

    onPageDelete(e) {
        //todo fix this function so that it does not conflict with the switch page function
        //*let p = e.currentTarget.parentNode
        //?p.style.display = "none";
        //!this.deletePage();
        console.warn("Delete here");
    }

    onPageSwitch(e) {
        if (e.currentTarget.title != "delete") {
            //todo check if event is equal to the current open page
            if (e.currentTarget.dataset.index != this.currentIndex) {
                const p = e.currentTarget.parentNode;
                const c = p.childNodes;
                for (let i = 1; i < c.length; i++) {
                    c[i].className = c[i].className.replace("page-open", "");
                }
                e.currentTarget.className += "page-open";
                this.storePage(e.currentTarget.dataset.index);
                editor.setComponents(loader);
                //? change the load url
                editor.Config.pluginsOpts["grapesjs-grapeflow"].urlLoadPages = this.urlLoad + e.currentTarget.dataset.index;
                this.loadPage(e.currentTarget.dataset.index);
                //? change the storage url -> load url
                editor.Config.pluginsOpts["grapesjs-grapeflow"].urlStorePages = this.urlStore + e.currentTarget.dataset.index + "/";
                this.currentIndex = e.currentTarget.dataset.index;
            }
        }
    }

    buildPagesModal() {
        const modal = editor.Modal;
        const mdlClass = 'gjs-mdl-dialog-sm';
        var mdlDialog = document.querySelector('.gjs-mdl-dialog');
        mdlDialog.className += ' ' + mdlClass;
        //infoContainer.style.display = 'block';
        modal.setTitle('<div>Create Page</div>');
        modal.setContent(`
            <div style="font-size:14px">Select page template to create...</div>
            <div class="gjs-blocks-c">
            <div id="create-blank" class="fa fa-square-o gjs-block gjs-one-bg gjs-four-color-h" title="default" style="cursor: pointer;">
            <div class="gjs-block-label">blank</div>
            </div>
            <div class="fa fa-home gjs-block gjs-one-bg gjs-four-color-h" title="landing1" style="cursor: pointer;">
            <div class="gjs-block-label">home</div>
            </div>
            <div class="fa fa-info-circle gjs-block gjs-one-bg gjs-four-color-h" title="default" style="cursor: pointer;">
            <div class="gjs-block-label">about</div>
            </div>
            <div class="fa fa-credit-card gjs-block gjs-one-bg gjs-four-color-h" title="default" style="cursor: pointer;">
            <div class="gjs-block-label">pricing</div>
            </div>
            <div class="fa fa-th gjs-block gjs-one-bg gjs-four-color-h" title="default" style="cursor: pointer;">
            <div class="gjs-block-label">blog</div>
            </div>
            <div class="fa fa-shopping-bag gjs-block gjs-one-bg gjs-four-color-h" title="default" style="cursor: pointer;">
            <div class="gjs-block-label">products</div>
            </div>
            </div>
            `);
        $('create-blank').addEventListener('click', () => {
            this.createPage({
                name: this.name,
                assets: "[]",
                components: "[]",
                style: "[]",
                html: "",
                css: ""
            });
            modal.close();
        });
        document.getElementById('info-panel').style.display = "none";
        modal.open();
        modal.getModel().once('change:open', function () {
            mdlDialog.className = mdlDialog.className.replace(mdlClass, '');
            document.getElementById('info-panel').style.display = "none";
        });
    }

    buildUrlFields(before, name, type, placeholder, after) {
        const div = document.createElement('div');
        div.className += "blc-form-group";

        if (before) {
            const beforeSpan = document.createElement('span');
            beforeSpan.innerHTML = before;
            div.appendChild(beforeSpan);
        }

        const input = document.createElement('input');
        input.className += "blc-form-field";
        //input.type = type ? type : 'text';
        input.placeholder = placeholder ? placeholder : '';
        input.name = name ? name : '';
        input.value = this.properties[name] !== '' ?
            this.properties[name].split('://').pop() : this.properties[name];
        input.addEventListener('change', e => this.checkUrl(e));
        div.appendChild(input);

        if (after) {
            const afterSpan = document.createElement('span');
            afterSpan.id = name;
            afterSpan.style.cursor = "pointer";
            afterSpan.innerHTML = after;
            if (name == "thumbnail")
                afterSpan.addEventListener('click', e => this.captureThumbnail(name));
            else
                afterSpan.addEventListener('click', e => this.openImageUpload(name));
            div.appendChild(afterSpan);
        }

        return div;
    }

    buildNormalFields(name, type, radio, placeholder) {
        const iField = document.createElement('div');
        iField.className = pfx + "field left-menu-input";
        const input = name == 'metaDesc' ? document.createElement('textarea') : document.createElement('input');
        input.placeholder = placeholder;
        //input.type = type ? type : 'text';
        input.name = name;
        if (radio) {
            iField.className = "left-menu-input";
            input.type = "checkbox";
            input.className += "colored switch"
            input.checked = this.properties[name];
        } else
            input.value = this.properties[name];
        iField.appendChild(input);
        return iField;
    }

    buildPropertiesSection() {
        //? replace projects section with this section
        const cont = document.createElement('div');
        for (let prop in properties) {
            const label = document.createElement('div');
            label.innerHTML = properties[prop].label;
            label.className += "left-menu-label";
            cont.appendChild(label);
            if (properties[prop].name == 'thumbnail' || properties[prop].name == 'favicon' ||
                properties[prop].name == 'webclip') {
                const thumb = this.buildThumbnail(properties[prop].name, this.properties[properties[prop].name]);
                cont.appendChild(thumb);
            }
            const iField = properties[prop].url ? this.buildUrlFields(properties[prop].before, properties[prop].name, 'text', properties[prop].placeholder, properties[prop].after) :
                this.buildNormalFields(properties[prop].name, 'text', properties[prop].radio, properties[prop].placeholder);
            cont.appendChild(iField);
        }
        cont.appendChild(this.updateButton());
        return cont
    }

    updateButton() {
        const b = document.createElement('button');
        b.id = "save-properties";
        b.style = "margin:0;margin-left:5px";
        b.innerHTML = '<i class="fa fa-link-cloud-upload"></i>Save Properties';
        b.className += pfx + "btn-prim left-menu-input";
        //todo ensure request is called if there are changes
        b.addEventListener('click', (e) => this.updateProperties(e));
        return b;
    }

    updateProperties(e) {
        const clb = (res) => {
            console.info("Properties updated", res);
            this.updateThumbnail(document.querySelector('#thumbnail-thumb'), res.thumbnail);
            this.updateThumbnail(document.querySelector('#favicon-thumb'), res.favicon);
            this.updateThumbnail(document.querySelector('#webclip-thumb'), res.webclip);
        }
        const clbErr = (err) => {
            console.warn("Error updating properties", err);
        }
        const fs = editor.StorageManager.get('flow-storage');
        fs.storeProperties(this.properties, clb, clbErr);
    }

    buildThumbnail(name, src) {
        const div = document.createElement('div');
        div.id = name + '-thumb';
        div.style = 'height:50px;width:94%;margin:2px 5px;font-size:45px;text-align:center;border-radius:2px;border:1px solid rgba(252,252,252,0.05);background-color: rgba(255,255,255,0.055);';
        if (!src) {
            div.className += "fa fa-image ";
            //div.innerHTML = "no thumbnail";
            return div;
        }
        const template = `
        <div class="gjs-sm-show" style="display: block;">
            <div style="
                background-image: url(&quot;${src}&quot;);
                width: 100%;
                background-position: center;
                height: 49px;
                background-size: contain;
                background-repeat: no-repeat;">
            </div>
        </div>`;
        div.innerHTML = template;
        return div;
    }

    //?Run when capture is clicked
    captureThumbnail(name) {
        const am = editor.AssetManager;
        const thumbnail = document.querySelector('#' + name + '-thumb');
        const iframe = document.getElementsByTagName("iframe");
        const iframeDoc = iframe[0].contentDocument;
        htmlToImage.toJpeg(iframeDoc.body, {
            quality: 0.5
            //width: 1080,
            //height: 780
        }).then(dataUrl => {
            //?upload
            this.uploadImage(dataUrl, name, thumbnail, am);
        }).catch(err => {
            console.warn("Error taking snapshot", err); //!
        });
    }

    //?Run when upload is clicked
    openImageUpload(name) {
        editor.runCommand('open-assets', {
            target: null,
            types: ['image'],
            accept: 'image/*',
            onSelect: e => {
                this.applyToThumbnail(name, document.querySelector('#' + name + '-thumb'), e.get('src'));
                editor.Modal.close();
                editor.AssetManager.setTarget(null);
            }
        });
    }

    //?run onSave forEach property
    updateThumbnail(target, result) {
        target.innerHTML = `
        <div class="gjs-sm-show" style="display: block;">
            <div style="
                background-image: url(&quot;${result}&quot;);
                width: 100%;
                background-position: center;
                height: 49px;
                background-size: contain;
                background-repeat: no-repeat;
                ">
            </div>
        </div>`;
    }

    uploadImage(dataURL, name, target, am, upload = true) {
        if (upload) {
            const file = this.dataUrlToBlob(dataURL);
            am.FileUploader().uploadFile({
                dataTransfer: {
                    files: [file]
                }
            }, res => {
                //const obj = res && res.data && res.data[0];
                const src = res.file ? editor.Config.mediaBase + res.file : '';
                src && this.applyToThumbnail(name, target, src);
            });
        } else {
            addToAssets && am.add({
                src: dataURL,
                name: (target.get('src') || '').split('/').pop(),
            });
            this.applyToThumbnail(name, target, dataURL);
        }
    }

    applyToThumbnail(name, target, result) {
        //apply url to set data in properties->input->set to thumbnail
        //let t = target.set({ src: result });
        target.className = "";
        target.innerHTML = `<div class="gjs-sm-show" style="display: block;">
            <div style="
                background-image: url(&quot;${result}&quot;);
                width: 100%;
                background-position: center;
                height: 49px;
                background-size: contain;
                background-repeat: no-repeat;">
            </div>
        </div>`;
        this.properties[name] = result;
        document.getElementsByName(name)[0].value = result.split('://').pop() //.split('.')[0]
    }

    dataUrlToBlob(dataURL) {
        const data = dataURL.split(',');
        const byteStr = window.atob(data[1]);
        const type = data[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteStr.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteStr.length; i++) {
            ia[i] = byteStr.charCodeAt(i);
        }

        return new Blob([ab], {
            type
        });
    }

    checkUrl(e) {
        const regexQuery = "^(https?|ftp)://[^\s/$.?#.[^\s*$@iS]";
        const regUrl = new RegExp(regexQuery, "i");
        const url = 'http://' + e.target.value;
        if (url.match(regUrl) !== null)
            this.properties[e.target.name] = url;
        else {
            console.info("Invalid url");
            e.target.value = this.properties[e.target.name].split('://').pop();
        }
    }

    storePage(uuid) {
        //? run regularly
        editor.store(res => {
            console.info('Saving to remote storage before switching');
            if (this.useIndexedDB) {
                res.uuid = uuid;
                this.indexedDBUpdate(res, e => console.log(e), e => console.log(e));
            }
        });
        //todo loop through keys in res and reassign them to page
        //todo On error i.e user offline use indexedDB alone then...upload when user presses button
    }

    loadPage(uuid) {
        const clb = res => {
            editor.setComponents(JSON.parse(res.components.replace(/^"|"$/g, "")));
            editor.setStyle(JSON.parse(res.styles.replace(/^"|"$/g, "")));
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
            console.info("Loaded " + res.name + " page");
        }
        const clbErr = err => {
            console.warn("Error loading page ", err);
        }
        if (this.useIndexedDB) {
            this.indexedDBLoad(uuid, clb, clbErr);
        } else {
            const fs = editor.StorageManager.get('flow-storage');
            fs.load(clb, clbErr);
        }
    }

    /**
     * Called when creating a new page
     * @param {Object} data page data e.g {name:"", assets:"", components:"", style:"", html:"", css:""}
     */
    createPage(data) {
        const fs = editor.StorageManager.get('flow-storage');
        const clb = (res) => {
            //? build and append page to the panel
            const pages = document.getElementById("project-pages");
            pages.appendChild(this.buildPage(res));
            if (this.useIndexedDB)
                this.indexedDBStore(res, e => console.log(e), e => console.log(e));
            console.log("Page created...", res);
        }
        const clbErr = (err) => {
            console.warn("Error creating page", err);
        }
        fs.create(data, clb, clbErr);
    }

    deletePage() {
        const fs = editor.StorageManager.get('flow-storage');
        fs.delete(res => console.info('Page deleted'));
        if (this.useIndexedDB)
            this.indexedDBRemove(res, e => console.log(e), e => console.log(e));
    }

    /****************************************************************
     * !This projects section might be deprecated inside the editor *
     ****************************************************************/
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