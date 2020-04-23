class Templates {
    constructor(templates) {
        this.buildTemplatesPanel(templates);
    }

    /**
     * Templates are basically blocks with more complete functionality...ie. mini apps
     * @param {Object} templates block object
     */
    buildTemplatesPanel(templates) {
        let templatesMenu = this.buildTemplates(templates);
        document.querySelector('#templates').appendChild(templatesMenu);
        //editor.on('component:selected', () => this.openAddModal());
    }

    buildTemplates(templates) {
        let cont = document.createElement('div');
        cont.className += "gjs-blocks-c";
        for (let i = 0; i < templates.length; i++) {
            let template = document.createElement('div');
            template.className += "fa fa-cube gjs-block gjs-one-bg gjs-four-color-h"; //todo either background image or popper showing image preview
            template.title = templates[i].name;
            template.style.cursor = "pointer";
            template.innerHTML = '<div class="gjs-block-label">' + templates[i].name + '</div>';
            template.addEventListener('click', function () {
                //todo use drag event to handle block being dragged onto canvas
            });
            cont.appendChild(template);
        }
        return cont;
    }
}

export default Templates