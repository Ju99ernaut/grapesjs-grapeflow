export default (editor, config) => {
    const generateQuerySelector = el => {
        let str = el.tagName.toLowerCase();
        str += (el.id != "") ? "#" + el.id : "";
        if (el.className) {
            let classes = el.className.split(/\s/);
            for (let i = 0; i < classes.length; i++) {
                str += (classes[i] != "gjs-selected") ? "." + classes[i] : "";
            }
        }
        return generateTree(el.parentNode) + `<li><a><span>${str}</span></a></li>`;
    };

    const generateTree = el => {
        if (el.tagName.toLowerCase() == "html")
            return `<li><a><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;html</span></a></li>`; //?link href to components
        return generateTree(el.parentNode) + `<li><a><span>${el.tagName.toLowerCase()}</span></a></li>`;
    }

    editor.on('component:selected', model => {
        const iframe = document.getElementsByTagName("iframe");
        const $ = iframe[0].contentDocument;
        const el = $.getElementById(model.attributes.attributes.id);
        document.getElementById("breadcrumbs").innerHTML = (el != null) ? generateQuerySelector(el) :
            `<li><a><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;html</span></a></li>
            <li><a><span>body</span></a></li>
            <li><a><span>no id</span></a></li>`;
    });
}