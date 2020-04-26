import {
    customBlocksTab,
    marketBlocksTab
} from './../consts';

class Templates {
    constructor() {
        this.templates = null;
        const clb = (res) => {
            this.templates = res;
            this.buildTemplatesPanel(res);
            console.log("Blocks loaded...");
        }
        const clbErr = (err) => {
            console.error(err);
        }
        const fs = editor.StorageManager.get('flow-storage');
        fs.loadBlock(clb, clbErr);
    }

    /**
     * Templates are basically blocks with more complete functionality...ie. mini apps
     * @param {Object} templates block object
     */
    buildTemplatesPanel(templates) {
        document.getElementById(customBlocksTab.id + '-tab').appendChild(this.buildFromBlockManager(templates));
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

    buildFromBlockManager(templates) {
        const bm = editor.BlockManager;
        const categories = [];
        for (let template in templates) {
            //todo customize labels if preview avalable and place decriptions
            bm.add(templates.name + '-' + templates[template].id, {
                label: templates[template].name,
                content: templates[template].html + '<style>' + templates[template].css + '</style>',
                //? '<script>'+templates[template].js+'</script>'
                category: templates[template].category,
                attributes: {
                    class: 'fa fa-cube'
                }
            });
            categories.push(templates[template].category);
        }
        const all = bm.getAll(); //! find method for checking equality with any string in the array.
        const custom = all.filter(block => block.attributes.category.id == categories);
        return bm.render(custom, {
            external: true
        });
    }
}

export default Templates