import Manager from './manager';

class Templates {
    constructor(templates) {
        this.buildTemplatesPanel(templates);
    }

    buildTemplatesPanel(templates) {
        let templatesMenu = this.buildTemplates(templates);
        document.querySelector('#templates').appendChild(templatesMenu);
    }

    buildTemplates(templates) {
        let cont = document.createElement('div');
        cont.className += "gjs-blocks-c";
        for (let i = 0; i < templates.length; i++) {
            let template = document.createElement('div');
            template.className += "fa fa-picture-o gjs-block gjs-one-bg gjs-four-color-h";
            template.title = templates[i].name;
            template.style.cursor = "pointer";
            template.innerHTML = '<div class="gjs-block-label">' + templates[i].name + '</div>';
            template.addEventListener('click', function () {
                let yes = confirm("This will overwrite the current canvas!...Continue?");
                if (yes)
                    Manager.switchPage(templates[i]);
            });
            cont.appendChild(template);
        }
        return cont;
    }
}

export default Templates