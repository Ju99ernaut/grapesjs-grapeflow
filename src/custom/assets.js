import {
    localTab,
    libraryTab,
    pfx,
    $
} from './../consts';

class Assets {
    constructor() {
        this.base = 'http://127.0.0.1:8000'; //todo add this to config 
        const as = editor.AssetManager;
        const rs = editor.StorageManager.get('remote');
        const clb = (res) => {
            for (let a in res) {
                const url = this.base + res[a].file;
                as.add(url);
            }
            this.buildAssetsPanel();
            console.log('Assets loaded', res);
        }
        const clbErr = (err) => {
            console.error("Failed to load assets...", err);
            //console.error(err);
        }
        rs.request(editor.Config.assetManager.upload, {
            method: 'get'
        }, clb, clbErr);
    }

    //copyAssetsPanel() {
    //    editor.on('run:open-assets', () => {
    //        const modal = editor.Modal;
    //        //const assetBody = modal.querySelector('.' + pfx + 'am-assets-cont')
    //        const modalBody = modal.getContentEl();
    //        const assetBody = modalBody.querySelector('.gjs-am-assets-cont');
    //        assetBody.style.width = '100%';
    //        let copyBody = assetBody.cloneNode(true);
    //        document.querySelector('#local-tab').appendChild(copyBody);
    //        document.getElementById('local').checked = true;
    //        document.getElementById('local').addEventListener('click', () => this.assetTabs());
    //        document.getElementById('pixabay').addEventListener('click', () => this.assetTabs());
    //    });
    //    editor.on('asset:upload:response', res => {
    //        const url = this.base + res.file;
    //        const as = editor.AssetManager;
    //        as.add(url);
    //    });
    //    editor.on('asset:upload:error', err => {
    //        console.error(err);
    //    });
    //}

    buildAssetsPanel() {
        const assetManager = editor.AssetManager;
        const assets = assetManager.getAll();

        document.getElementById(localTab.id + '-tab').appendChild(this.buildAssets(assets));
        const local = document.getElementById(localTab.id);
        local.checked = true;
        local.addEventListener('click', () => this.assetTabs());
        const remoteTab = document.getElementById(libraryTab.id + '-tab');
        remoteTab.innerHTML = this.buildLibrary(); //?Template
        document.getElementById(libraryTab.id).addEventListener('click', () => this.assetTabs());
        remoteTab.style.display = "none";
        editor.on('asset:upload:response', res => { //todo may need optimization
            const url = this.base + res.file;
            const as = editor.AssetManager;
            as.add(url);
            const assets = assetManager.getAll();
            const tab = document.getElementById(localTab.id + '-tab');
            tab.innerHTML = "";
            tab.appendChild(this.buildAssets(assets));
            console.log("Asset upload success", res);
        });
        editor.on('asset:upload:error', err => {
            console.error("Failed to upload...", err);
            //console.error(err);
        });
        $("assets-search").addEventListener('input', e => {
            this.filterAssets(e);
        });
    }

    assetTabs() {
        if (document.getElementById(localTab.id).checked) {
            document.getElementById(localTab.id + '-tab').style.display = "block";
            document.getElementById(libraryTab.id + '-tab').style.display = "none";
        } else {
            document.getElementById(localTab.id + '-tab').style.display = "none";
            document.getElementById(libraryTab.id + '-tab').style.display = "block";
        }
    }

    /**
     * Returns an asset object that can be rendered in the panels
     * @param {String} url Image url
     * @param {String} name Displayed to id the asset
     * @param {String} dim Displays the dimensions of the image
     */
    buildAsset(url, name, dim) {
        const cont = document.createElement('div');
        cont.className += pfx + "am-asset " + pfx + "am-asset-image";
        const image = `
            <div class="left ${pfx}am-preview-cont">
                <img alt=${name} src=${url} class="asset-menu-image">
            </div>
            <div class="left ${pfx}am-meta">
                <div class="${pfx}am-name" title=${name}>${name}</div>
                <div class="${pfx}am-dimensions">${dim}</div>
            </div>`
        cont.innerHTML = image;
        return cont;
    }

    /**
     * Takes in the gjs assets object and returns a DOM object
     * @param {Object} assets gjs assets object
     */
    buildAssets(assets) {
        const cont = document.createElement('div');
        cont.className += pfx + "am-assets";
        cont.style.overflow = "visible";
        for (let i = 0; i < assets.length; i++) {
            //console.log(assets.models[i].attributes);
            let url = assets.models[i].attributes.src;
            let name = url.split("/").pop();
            let dim = assets.models[i].attributes.width + "x" + assets.models[i].attributes.height + assets.models[i].attributes.unitDim;
            cont.appendChild(this.buildAsset(url, name, dim));
        }
        return cont;
    }

    buildAssetsFromFilter(assets) {
        const cont = document.createElement('div');
        cont.className += pfx + "am-assets";
        cont.style.overflow = "visible";
        for (let i = 0; i < assets.length; i++) {
            //console.log(assets.models[i].attributes);
            let url = assets[i].attributes.src;
            let name = url.split("/").pop();
            let dim = assets[i].attributes.width + "x" + assets[i].attributes.height + assets[i].attributes.unitDim;
            cont.appendChild(this.buildAsset(url, name, dim));
        }
        return cont;
    }

    filterAssets(e) {
        const tab = document.getElementById(localTab.id + '-tab');
        const am = editor.AssetManager
        const all = am.getAll();
        //const filter = all.filter(block => categories.includes(block.attributes.id));
        tab.innerHTML = "";
        const filter = all.filter(asset => asset.id.split("/").pop().match(e.target.value) !== null);
        tab.appendChild(this.buildAssetsFromFilter(filter));
        am.render(filter);
    }

    buildLibrary() {
        return `
        <div class="gjs-blocks-c">
        <div class="gjs-block gjs-one-bg gjs-four-color-h gjs-image-block">
        <img alt="background3.jpg" src="http://127.0.0.1:8000/media/background3.jpg" >
        <div class="gjs-block-label">by person1</div>
        </div>
        <div class="gjs-block gjs-one-bg gjs-four-color-h gjs-image-block">
        <img alt="background2.jpg" src="http://127.0.0.1:8000/media/background2.jpg">
        <div class="gjs-block-label">by person2</div>
        </div>
        <div class="gjs-block gjs-one-bg gjs-four-color-h gjs-image-block">
        <img alt="background1.jpg" src="http://127.0.0.1:8000/media/background1.jpg">
        <div class="gjs-block-label">by person3</div>
        </div>
        </div>
        `
    }
}

export default Assets