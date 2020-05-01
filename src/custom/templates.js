import {
    customBlocksTab,
    marketBlocksTab,
    extraBlocksTab,
    pfx
} from './../consts';

class Templates {
    constructor() {
        this.templates = null;
        this.categories = [];
        const clb = (res) => {
            this.templates = res;
            this.buildFromBlockManager(res);
            this.migrate();
            console.log("Blocks loaded...", res);
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
        //document.getElementById(customBlocksTab.id + '-tab').appendChild(this.buildFromBlockManager(templates));
        this.buildFromBlockManager(templates);
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
        for (let template in templates) {
            //todo customize labels if preview avalable and place decriptions
            bm.add(templates.name + '-' + templates[template].id, {
                label: `
                <div class="${pfx}four-color-h gjs-thumb">
                <img alt=${templates[template].description} src=${templates[template].preview} >
                <div class="${pfx}block-label">${templates[template].name}</div>
                </div>
                `,
                content: templates[template].html + '<style>' + templates[template].css + '</style>',
                //? '<script>'+templates[template].js+'</script>'
                category: templates[template].category,
                //*attributes: {class: 'fa fa-cube'}
            });
            this.categories.push(templates[template].category);
        }
        //const custom = all.filter(block => categories.includes(block.attributes.category.id));
    }


    migrate() {
        const layersC = document.getElementById('layers-c');
        layersC.style.display = "block";
        const layersM = document.getElementById('layers');
        this.blockCategories();
        layersM.appendChild(layersC);
        const basic = document.getElementById('basic');
        basic.checked = true;
        basic.addEventListener('click', () => this.blockTabs());
        document.getElementById('bootstrap-tab').style.display = "none";
        document.getElementById('extra-tab').style.display = "none";
        const bootstrap = document.getElementById('bootstrap');
        bootstrap.addEventListener('click', () => this.blockTabs());
        const extra = document.getElementById('extra');
        extra.addEventListener('click', () => this.blockTabs());
    }

    blockCategories() {
        const blockCategories = document.getElementsByClassName('gjs-block-category');
        const basicTab = document.getElementById('basic-tab');
        const bs4Tab = document.getElementById('bootstrap-tab');
        const extraTab = document.getElementById('extra-tab');
        const blockArray = Array.from(blockCategories);
        blockArray.forEach(category => {
            if (category.innerText !== undefined) { //!improvement needed
                if (/(Basic|Extra|Form)/.test(category.innerText))
                    basicTab.appendChild(category);
                else if (/(Typography|Layout|Components|Media)/.test(category.innerText))
                    bs4Tab.appendChild(category);
                else
                    extraTab.appendChild(category);
            }
        });
    }

    blockTabs() {
        if (document.getElementById('basic').checked) {
            document.getElementById('basic-tab').style.display = "block";
            document.getElementById('bootstrap-tab').style.display = "none";
            document.getElementById('extra-tab').style.display = "none";
        } else if (document.getElementById('bootstrap').checked) {
            document.getElementById('basic-tab').style.display = "none";
            document.getElementById('bootstrap-tab').style.display = "block";
            document.getElementById('extra-tab').style.display = "none";
        } else {
            document.getElementById('basic-tab').style.display = "none";
            document.getElementById('bootstrap-tab').style.display = "none";
            document.getElementById('extra-tab').style.display = "block";
        }
    }
}

export default Templates