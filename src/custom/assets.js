import {
    localTab,
    libraryTab
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
            console.log('Assets loaded successfully');
        }
        const clbErr = (err) => {
            console.error("Failed to load assets because ", err);
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
        document.getElementById(libraryTab.id).addEventListener('click', () => this.assetTabs());
        document.getElementById(libraryTab.id + '-tab').style.display = "none";
        editor.on('asset:upload:response', res => {
            const url = this.base + res.file;
            const as = editor.AssetManager;
            as.add(url);
            const assets = assetManager.getAll();
            const tab = document.getElementById(localTab.id + '-tab');
            tab.innerHTML = "";
            tab.appendChild(this.buildAssets(assets));
            console.log("Asset upload success");
        });
        editor.on('asset:upload:error', err => {
            console.error("Failed to upload because ", err);
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
        cont.className += "gjs-am-asset gjs-am-asset-image";

        const previewCont = document.createElement('div');
        previewCont.className += "left gjs-am-preview-cont";

        const preview = document.createElement('img');
        preview.alt = name;
        preview.style.width = "100%";
        preview.style.height = "100%";
        preview.style.objectFit = "contain";
        preview.style.backgroundColor = "#352b38ce";
        preview.src = url;

        //let previewBg = document.createElement('div');
        //previewBg.className += "gjs-am-preview-bg gjs-checker-bg";
        //previewBg.style.width = "0%";

        previewCont.appendChild(preview);
        //previewCont.appendChild(previewBg);

        const meta = document.createElement('div');
        meta.className += "left gjs-am-meta";

        const nameImg = document.createElement('div');
        nameImg.className += "gjs-am-name";
        nameImg.title = name;
        nameImg.innerHTML = name;

        const dimensions = document.createElement('div');
        dimensions.className += "gjs-am-dimensions";
        //dimensions.style.width = "30%";
        dimensions.innerHTML = dim;

        meta.appendChild(nameImg);
        meta.appendChild(dimensions);

        cont.appendChild(previewCont);
        cont.appendChild(meta);

        return cont;
    }

    /**
     * Takes in the gjs assets object and returns a DOM object
     * @param {Object} assets gjs assets object
     */
    buildAssets(assets) {
        const cont = document.createElement('div');
        cont.className += "gjs-am-assets";
        cont.style.overflow = "visible";
        for (let i = 0; i < assets.length; i++) {
            //console.log(assets.models[i].attributes);
            let url = assets.models[i].attributes.src;
            let s = url.split("/");
            let name = s[s.length - 1];
            let dim = assets.models[i].attributes.width + "x" + assets.models[i].attributes.height + assets.models[i].attributes.unitDim;
            cont.appendChild(this.buildAsset(url, name, dim));
        }
        return cont;
    }
}

export default Assets