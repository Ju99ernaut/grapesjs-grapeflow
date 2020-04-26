import Manager from './manager';
import Assets from './assets';
import Templates from './templates';
import CMS from './cms';
import Settings from './settings';
import {
    pageTab,
    propertiesTab,
    basicBlocksTab,
    bs4BlocksTab,
    extraBlocksTab,
    localTab,
    libraryTab,
    customBlocksTab,
    marketBlocksTab
} from './../consts';

class CustomMenu {
    constructor() {
        this.event = null;
        this.trnSet = false;
        this.abSet = false;
        this.init = true;
        this.buildCustomMenu();
    }

    buildMenuModules() {
        let managerModule = new Manager([]);
        let assetsModule = new Assets();
        let templatesModule = new Templates();
        let cmsModule = new CMS();
        let settingsModule = new Settings();
    }

    buildCustomMenu() {
        const cMenu = document.createElement('div');
        //Add hover target
        //Add left bar
        //Add menus
        //Append to container
        cMenu.appendChild(this.buildTabMenu("blocks", "Add", [basicBlocksTab, bs4BlocksTab, extraBlocksTab], true));
        cMenu.appendChild(this.buildSimpleMenu("layers", "Layout"));
        cMenu.appendChild(this.buildTabMenu("pages", "Pages", [pageTab, propertiesTab]));
        cMenu.appendChild(this.buildSimpleMenu("cms", "CMS"));
        cMenu.appendChild(this.buildTabMenu("assets", "Assets", [localTab, libraryTab], true));
        cMenu.appendChild(this.buildTabMenu("templates", "Templates", [customBlocksTab, marketBlocksTab], true));
        cMenu.appendChild(this.buildSimpleMenu("logic", "Logic", true));
        cMenu.appendChild(this.buildSimpleMenu("settings", "Project Settings", true));
        cMenu.appendChild(this.buildLeftBar());
        cMenu.appendChild(this.buildHoverTarget());
        document.body.appendChild(cMenu);
        this.buildMenuModules();
        //?document.getElementById('gjs').addEventListener("click", () => this.closeLeftMenu());
        editor.on('block:drag:start', () => this.closeLeftMenu());
        editor.on('run:preview', () => this.closeLeftMenu());
    }

    buildHoverTarget() {
        const cont = document.createElement('div');
        cont.id = "target";
        cont.addEventListener('mouseover', this.openLeftMenu);
        return cont;
    }

    buildLeftBar() {
        const cont = document.createElement('div');
        cont.id = "left-menu";
        //Add Items
        cont.appendChild(this.buildLeftBarItems("", "fa-th-large ", "Blocks", (e) => this.slideIn(e)));
        cont.appendChild(this.buildLeftBarItems("", "fa-bars ", "Layers", (e) => this.slideIn(e)));
        cont.appendChild(this.buildLeftBarItems("", "fa-file ", "Pages", (e) => this.slideIn(e)));
        cont.appendChild(this.buildLeftBarItems("", "fa-database ", "CMS", (e) => this.slideIn(e)));
        cont.appendChild(this.buildLeftBarItems("", "fa-picture-o ", "Assets", (e) => this.slideIn(e)));
        cont.appendChild(this.buildLeftBarItems("", "fa-shopping-cart ", "Templates", (e) => this.slideIn(e)));
        cont.appendChild(this.buildLeftBarItems("", "fa-microchip ", "Logic", (e) => this.slideIn(e)));
        cont.appendChild(this.buildLeftBarItems("", "fa-cogs ", "Settings", (e) => this.slideIn(e)));
        cont.appendChild(this.buildLeftBarItems("left-menu-trans", "fa-hand-rock-o ", "Translate mode", (e) => this.setDragMode(e)));
        cont.appendChild(this.buildLeftBarItems("left-menu-abs", "fa-arrows ", "Absolute mode", (e) => this.setDragMode(e)));
        cont.appendChild(this.buildLeftBarItems("left-menu-cls", "fa-arrows-h ", "Collapse", () => this.closeLeftMenu()));
        return cont;
    }

    /**
     * Left nav bar elements builder
     * @param {String} id id attribute of the element
     * @param {String} icon fontawesome icon class
     * @param {String} title title attribute of the element
     * @param {Function} click function for on click events
     */
    buildLeftBarItems(id, icon, title, click) {
        const item = document.createElement('span');
        if (id !== "") {
            item.id = id;
            item.className += "gjs-pn-btn fa " + icon;
        } else
            item.className += "left-menu-icons gjs-pn-btn fa " + icon;
        item.title = title;
        item.addEventListener('click', click);
        return item;
    }

    /**
     * Left menu panel builder
     * @param {String} id id attribute of the element
     * @param {String} header heading displayed on the panel
     * @param {Boolean} search whether or not to include search bar
     */
    buildSimpleMenu(id, header, search = false) {
        const cont = document.createElement('div');
        cont.id = id;
        cont.className += "left-menu-expanded";
        const div = document.createElement('div');
        const p = document.createElement('p');
        const heading = document.createElement('span');
        heading.className += "menu-header";
        heading.innerHTML = header;
        const x = document.createElement('span');
        x.className += "close fa fa-times";
        x.addEventListener('click', () => this.slideOut(id));
        p.appendChild(heading);
        p.appendChild(x);
        div.appendChild(p);
        if (search)
            div.appendChild(this.buildSearch());
        cont.appendChild(div);
        return cont;
    }

    /**
     * Left menu tabbed panel builder
     * @param {String} id id attribute of the element
     * @param {String} header heading displayed on the panel
     * @param {Object} tabs object containing data to build tab eg.{id: "bootstrap",name: "blocks",labelText: "Bootstrap"}
     * @param {Boolean} search whether or not to include search bar
     */
    buildTabMenu(id, header, tabs, search = false) {
        const cont = this.buildSimpleMenu(id, header, search);
        const tbs = this.buildTabs(tabs);
        cont.firstChild.appendChild(tbs);
        return cont;
    }

    /**
     * Build menu tabs
     * @param {Object} tabs object containing data to build tab eg.{id: "bootstrap",name: "blocks",labelText: "Bootstrap"}
     */
    buildTabs(tabs) {
        const _cont = document.createElement('div');
        _cont.style.width = "100%";
        _cont.style.float = "left";
        const div = document.createElement('div');
        const cont = document.createElement('div');
        cont.className += "gjs-fields";
        const cont1 = document.createElement('div');
        cont1.className += "gjs-field gjs-field-radio";
        const cont2 = document.createElement('div');
        cont2.className += "gjs-radio-items";
        for (let i = 0; i < tabs.length; i++) {
            const tabItemC = document.createElement('div');
            tabItemC.className += "gjs-radio-item";
            const tab = document.createElement('div');
            tab.id = tabs[i].id + "-tab";
            tab.style.marginTop = "10px";
            div.appendChild(tab);
            const input = document.createElement('input');
            input.type = "radio";
            input.id = tabs[i].id;
            input.value = tabs[i].id;
            input.name = tabs[i].name;
            input.className += "gjs-sm-radio";
            const label = document.createElement('label');
            label.className += "gjs-radio-item-label";
            label.htmlFor = tabs[i].id;
            label.innerHTML = tabs[i].labelText;
            tabItemC.appendChild(input);
            tabItemC.appendChild(label);
            cont2.appendChild(tabItemC);
        }
        cont1.appendChild(cont2);
        cont.appendChild(cont1);
        _cont.appendChild(cont);
        _cont.appendChild(div);
        return _cont;
    }

    buildSearch() {
        const cont = document.createElement('div');
        cont.style.justifyContent = "center";
        const icon = document.createElement('span');
        icon.style.float = "left";
        icon.style.margin = "5px 5px 5px 5px";
        icon.innerHTML = '<i class="fa fa-search"></i>';
        const span = document.createElement('span');
        span.style.float = "left";
        span.style.width = "88%"
        const iField = document.createElement('div');
        iField.className += "gjs-field";
        iField.style.margin = "0px 5px 5px 0px";
        const input = document.createElement('input');
        input.placeholder = "Filter by name...";
        input.name = "search";
        input.addEventListener('change', e => {
            console.log("Searching");
        });

        cont.appendChild(icon);
        iField.appendChild(input);
        span.appendChild(iField);
        cont.appendChild(span);

        return cont
    }

    setDragMode(evt) {
        let mode = (evt.currentTarget.id == 'left-menu-trans') ? 'translate' : 'absolute';
        if (mode == 'absolute' && !this.abSet) {
            editor.getModel().set('dmode', mode);
            document.getElementById('left-menu-abs').className += "gjs-pn-active";
            document.getElementById('left-menu-trans').className = document.getElementById('left-menu-trans').className
                .replace("gjs-pn-active", "");
            this.abSet = !this.abSet;
            console.warn("More design freedom at the cost of responsiveness");
        } else if (mode == 'translate' && !this.trnSet) {
            editor.getModel().set('dmode', mode);
            document.getElementById('left-menu-trans').className += "gjs-pn-active";
            document.getElementById('left-menu-abs').className = document.getElementById('left-menu-abs').className
                .replace("gjs-pn-active", "");
            this.trnSet = !this.trnSet;
            console.warn("You may have to cycle all device modes and fix alignment issues");
        } else {
            editor.getModel().set('dmode', 'default');
            document.getElementById('left-menu-abs').className = document.getElementById('left-menu-abs').className
                .replace("gjs-pn-active", "");
            document.getElementById('left-menu-trans').className = document.getElementById('left-menu-trans').className
                .replace("gjs-pn-active", "");
            this.abSet = false;
            this.trnSet = false;
            console.log("Default drag mode set");
        }
    }

    activate(evt) {
        this.deactivateAll();
        evt.currentTarget.className += "gjs-pn-active";
    }

    deactivate(evt) {
        evt.currentTarget.className = evt.currentTarget.className.replace("gjs-pn-active", "");
    }

    deactivateAll() {
        const menuBtns = document.getElementsByClassName('left-menu-icons');
        for (var i = 0; i < menuBtns.length; i++) {
            menuBtns[i].className = menuBtns[i].className.replace("gjs-pn-active", "");
        }
    }

    slideIn(evt) {
        const menu = evt.currentTarget.title.toLowerCase();
        const _menu = document.getElementById(menu).style;
        if (event != null) {
            if (evt.currentTarget.title != this.event) {
                this.open(_menu);
                this.activate(evt);
                this.event = evt.currentTarget.title;
            } else {
                this.close(_menu);
            }
        } else {
            this.open(_menu);
            this.activate(evt);
            this.event = evt.currentTarget.title;
        }
    }

    /**
     * @param {Object} menu left menu element
     */
    slideOut(menu) {
        const _menu = document.getElementById(menu).style;
        this.close(_menu);
    }

    /**
     * @param {Object} _menu style of left menu element
     */
    open(_menu) {
        this.closeAll();
        _menu.left = "40px";
    }

    /**
     * @param {Object} _menu style of left menu element
     */
    close(_menu) {
        this.event = null;
        this.deactivateAll();
        _menu.left = "-200px";
    }

    closeAll() {
        const menus = document.getElementsByClassName('left-menu-expanded');
        for (let i = 0; i < menus.length; i++) {
            let _menu = menus[i].style;
            this.close(_menu);
        }
    }

    listenOut(evt) {
        const menu = evt.currentTarget.title.toLowerCase();
        const _menu = document.getElementById(menu).style;
        menu.onmouseout = this.slideOut(_menu);
    }

    openLeftMenu() {
        document.getElementById('left-menu').style.left = "0px";
    }

    closeLeftMenu() {
        document.getElementById('left-menu').style.left = "-40px";
        this.closeAll();
    }
}

export default CustomMenu