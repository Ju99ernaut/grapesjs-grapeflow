export function assetTabs() {
    if (document.getElementById('local').checked) {
        document.getElementById('local-tab').style.display = "block";
        document.getElementById('pixabay-tab').style.display = "none";
    } else {
        document.getElementById('local-tab').style.display = "none";
        document.getElementById('pixabay-tab').style.display = "block";
    }
}

export function pageTabs() {
    if (document.getElementById('workspace').checked) {
        document.getElementById('workspace-tab').style.display = "block";
        document.getElementById('projects-tab').style.display = "none";
    } else {
        document.getElementById('workspace-tab').style.display = "none";
        document.getElementById('projects-tab').style.display = "block";
    }
}

export function savePage(name, page) {
    page.name = name;
    page.components = editor.getHtml(); //editor.getComponents
    page.style = editor.getCss(); //editor.getStyle.....Initial methods exeeding call stack
}

export function switchPage(page) {
    editor.setComponents(page.components);
    editor.setStyle(page.style);
}

export function destroy(object) {
    object = null;
}

export function switchProject(project) {
    this.savePage(_projects[this.currentProject].pages[this.currentIndex].name, _projects[this.currentProject].pages[this.currentIndex]);
    this.switchPage(project.pages[0]);
    this.currentIndex = 0;
    let pagesMenu = this.buildPagesSection(project);
    document.querySelector('#workspace-tab').innerHTML = "";
    document.querySelector('#workspace-tab').appendChild(pagesMenu);
}

export function activate(evt) {
    this.deactivateAll();
    evt.currentTarget.className += "gjs-pn-active";
}

export function deactivate(evt) {
    evt.currentTarget.className = evt.currentTarget.className.replace("gjs-pn-active", "");
}

export function deactivateAll() {
    let menuBtns = document.getElementsByClassName('left-menu-icons');
    for (var i = 0; i < menuBtns.length; i++) {
        menuBtns[i].className = menuBtns[i].className.replace("gjs-pn-active", "");
    }
}

export function slideIn(evt) {
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

export function slideOut(evt) {
    let menu = evt.currentTarget.title.toLowerCase();
    var _menu = document.getElementById(menu).style;
    this.close(_menu);
}

export function open(_menu) {
    this.closeAll();
    _menu.left = "40px";
}

export function close(_menu) {
    this.event = null;
    this.deactivateAll();
    _menu.left = "-200px";
}

export function closeAll() {
    let menus = document.getElementsByClassName('left-menu-expanded');
    for (var i = 0; i < menus.length; i++) {
        _menu = menus[i].style;
        this.close(_menu);
    }
}

export function listenOut(evt) {
    let menu = evt.currentTarget.title.toLowerCase();
    var _menu = document.getElementById(menu).style;
    menu.onmouseout = this.slideOut(_menu);
}

export function openLeftMenu() {
    document.getElementById('left-menu').style.left = "0px";
}

export function closeLeftMenu() {
    document.getElementById('left-menu').style.left = "-40px";
    this.closeAll();
}