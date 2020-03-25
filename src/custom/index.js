import Manager from './manager';
import Assets from './assets';
import Templates from './templates';
import CMS from './cms';
import Settings from './settings';

class CustomMenu {
    constructor() {
        this.event = null;
        this.trnSet = false;
        this.abSet = false;
        this.init = true;
        this.buildCustomMenu();
    }

    buildMenuModules() {
        let managerModule = new Manager([], []);
        let assetsModule = new Assets();
        let templatesModule = new Templates([]);
        let cmsModule = new CMS();
        let settingsModule = new Settings();
    }

    buildCustomMenu() {
        let cMenu = document.createElement('div');
        //Add hover target
        let hover = this.buildHoverTarget();
        //Add left bar
        let leftBar = this.buildLeftBar();
        //Add menus
        let blocks = this.buildSimpleMenu("blocks", "Add");
        let layers = this.buildSimpleMenu("layers", "Layout");
        let pageTab = {
            id: "workspace",
            name: "pages",
            labelText: "Workspace",
        };
        let projectTab = {
            id: "projects",
            name: "pages",
            labelText: "Projects",
        }
        let pages = this.buildTabMenu("pages", "Pages", [pageTab, projectTab]);
        let cms = this.buildSimpleMenu("cms", "CMS");
        let localTab = {
            id: "local",
            name: "assets",
            labelText: "Local",
        };
        let pixabayTab = {
            id: "pixabay",
            name: "assets",
            labelText: "Pixabay",
        }
        let assets = this.buildTabMenu("assets", "Assets", [localTab, pixabayTab]);
        let templates = this.buildSimpleMenu("templates", "Templates");
        let settings = this.buildSimpleMenu("settings", "Editor Settings");
        //Append to container
        cMenu.appendChild(blocks);
        cMenu.appendChild(layers);
        cMenu.appendChild(pages);
        cMenu.appendChild(cms);
        cMenu.appendChild(assets);
        cMenu.appendChild(templates);
        cMenu.appendChild(settings);
        cMenu.appendChild(leftBar);
        cMenu.appendChild(hover);
        document.body.appendChild(cMenu);
        this.buildMenuModules();
        document.getElementById('gjs').addEventListener("click", () => this.closeLeftMenu());
        editor.on('block:drag:start', () => this.closeLeftMenu())
    }

    buildHoverTarget() {
        let cont = document.createElement('div');
        cont.id = "target";
        cont.addEventListener('mouseover', this.openLeftMenu);
        return cont;
    }

    buildLeftBar() {
        let cont = document.createElement('div');
        //cont.addEventListener("click", () => this.closeLeftMenu());
        cont.id = "left-menu";
        //Add Items
        let blocks = this.buildLeftBarItems("", "fa-th-large ", "Blocks", (e) => this.slideIn(e));
        cont.appendChild(blocks);
        let layers = this.buildLeftBarItems("", "fa-bars ", "Layers", (e) => this.slideIn(e));
        cont.appendChild(layers);
        let pages = this.buildLeftBarItems("", "fa-file-o ", "Pages", (e) => this.slideIn(e));
        cont.appendChild(pages);
        let cms = this.buildLeftBarItems("", "fa-database ", "CMS", (e) => this.slideIn(e));
        cont.appendChild(cms);
        let assets = this.buildLeftBarItems("", "fa-picture-o ", "Assets", (e) => this.slideIn(e));
        cont.appendChild(assets);
        let templates = this.buildLeftBarItems("", "fa-shopping-cart ", "Templates", (e) => this.slideIn(e));
        cont.appendChild(templates);
        let settings = this.buildLeftBarItems("", "fa-cogs ", "Settings", (e) => this.slideIn(e));
        cont.appendChild(settings);
        let translate = this.buildLeftBarItems("left-menu-trans", "fa-hand-rock-o ", "Translate mode", this.setDragMode);
        cont.appendChild(translate);
        let absolute = this.buildLeftBarItems("left-menu-abs", "fa-arrows ", "Absolute mode", this.setDragMode);
        cont.appendChild(absolute);
        let cls = this.buildLeftBarItems("left-menu-cls", "fa-arrows-h ", "Collapse", () => this.closeLeftMenu());
        cont.appendChild(cls);
        return cont;
    }

    buildLeftBarItems(id, icon, title, click) {
        let item = document.createElement('span');
        if (id !== "")
            item.id = id;
        item.className += "left-menu-icons gjs-pn-btn fa " + icon;
        item.title = title;
        item.addEventListener('click', click);
        return item;
    }

    buildSimpleMenu(id, header) {
        let cont = document.createElement('div');
        cont.id = id;
        cont.className += "left-menu-expanded";
        let div = document.createElement('div');
        let p = document.createElement('p');
        let heading = document.createElement('span');
        heading.className += "menu-header";
        heading.innerHTML = header;
        let x = document.createElement('span');
        x.className += "close fa fa-times";
        x.addEventListener('click', () => this.slideOut(id));
        p.appendChild(heading);
        p.appendChild(x);
        div.appendChild(p);
        cont.appendChild(div);
        return cont;
    }

    buildTabMenu(id, header, tabs) {
        let cont = this.buildSimpleMenu(id, header);
        let tbs = this.buildTabs(tabs);
        cont.firstChild.appendChild(tbs);
        return cont;
    }

    buildTabs(tabs) {
        let _cont = document.createElement('div');
        let div = document.createElement('div');
        let cont = document.createElement('div');
        cont.className += "gjs-fields";
        let cont1 = document.createElement('div');
        cont1.className += "gjs-field gjs-field-radio";
        let cont2 = document.createElement('div');
        cont2.className += "gjs-radio-items";
        for (let i = 0; i < tabs.length; i++) {
            let tabItemC = document.createElement('div');
            tabItemC.className += "gjs-radio-item";
            let tab = document.createElement('div');
            tab.id = tabs[i].id + "-tab";
            tab.style.marginTop = "10px";
            div.appendChild(tab);
            let input = document.createElement('input');
            input.type = "radio";
            input.id = tabs[i].id;
            input.value = tabs[i].id;
            input.name = tabs[i].name;
            input.className += "gjs-sm-radio";
            let label = document.createElement('label');
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

    setDragMode(evt) {
        let mode = (evt.currentTarget.id == 'left-menu-trans') ? 'translate' : 'absolute';
        if (mode == 'absolute' && !this.abSet) {
            editor.getModel().set('dmode', mode);
            document.getElementById('left-menu-abs').className += "gjs-pn-active";
            document.getElementById('left-menu-trans').className = document.getElementById('left-menu-trans').className
                .replace("gjs-pn-active", "");
            this.abSet = !this.abSet;
        } else if (mode == 'translate' && !this.trnSet) {
            editor.getModel().set('dmode', mode);
            document.getElementById('left-menu-trans').className += "gjs-pn-active";
            document.getElementById('left-menu-abs').className = document.getElementById('left-menu-abs').className
                .replace("gjs-pn-active", "");
            this.trnSet = !this.trnSet;
        } else {
            editor.getModel().set('dmode', 'default');
            document.getElementById('left-menu-abs').className = document.getElementById('left-menu-abs').className
                .replace("gjs-pn-active", "");
            document.getElementById('left-menu-trans').className = document.getElementById('left-menu-trans').className
                .replace("gjs-pn-active", "");
            this.abSet = false;
            this.trnSet = false;
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
        let menuBtns = document.getElementsByClassName('left-menu-icons');
        for (var i = 0; i < menuBtns.length; i++) {
            menuBtns[i].className = menuBtns[i].className.replace("gjs-pn-active", "");
        }
    }

    slideIn(evt) {
        let menu = evt.currentTarget.title.toLowerCase();
        var _menu = document.getElementById(menu).style;
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

    slideOut(menu) {
        var _menu = document.getElementById(menu).style;
        this.close(_menu);
    }

    open(_menu) {
        this.closeAll();
        _menu.left = "40px";
    }

    close(_menu) {
        this.event = null;
        this.deactivateAll();
        _menu.left = "-200px";
    }

    closeAll() {
        let menus = document.getElementsByClassName('left-menu-expanded');
        for (var i = 0; i < menus.length; i++) {
            let _menu = menus[i].style;
            this.close(_menu);
        }
    }

    listenOut(evt) {
        let menu = evt.currentTarget.title.toLowerCase();
        var _menu = document.getElementById(menu).style;
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