class Assets {
    constructor() {
        this.buildAssetsPanel();
    }

    buildAssetsPanel() {
        const assetManager = editor.AssetManager;
        let assets = assetManager.getAll();

        let assetsMenu = this.buildAssets(assets);
        document.querySelector('#local-tab').appendChild(assetsMenu);
        document.getElementById('local').checked = true;
        document.getElementById('local').addEventListener('click', () => this.assetTabs());
        document.getElementById('pixabay').addEventListener('click', () => this.assetTabs());
    }

    assetTabs() {
        if (document.getElementById('local').checked) {
            document.getElementById('local-tab').style.display = "block";
            document.getElementById('pixabay-tab').style.display = "none";
        } else {
            document.getElementById('local-tab').style.display = "none";
            document.getElementById('pixabay-tab').style.display = "block";
        }
    }

    buildAsset(url, name, dim) {
        let cont = document.createElement('div');
        cont.className += "gjs-am-asset gjs-am-asset-image";

        let previewCont = document.createElement('div');
        previewCont.className += "left gjs-am-preview-cont";

        let preview = document.createElement('img');
        preview.className += "gjs-am-preview";
        //preview.style.width = "100%";
        preview.src = url;

        let previewBg = document.createElement('div');
        previewBg.className += "gjs-am-preview-bg gjs-checker-bg";
        //previewBg.style.width = "0%";

        previewCont.appendChild(preview);
        previewCont.appendChild(previewBg);

        let meta = document.createElement('div');
        meta.className += "left gjs-am-meta";

        //let nameImg = document.createElement('div');
        //nameImg.className += "gjs-am-name";
        //nameImg.innerHTML = name;

        let dimensions = document.createElement('div');
        dimensions.className += "gjs-am-dimensions";
        //dimensions.style.width = "30%";
        dimensions.innerHTML = dim;

        //meta.appendChild(nameImg);
        meta.appendChild(dimensions);

        cont.appendChild(previewCont);
        cont.appendChild(meta);

        return cont;
    }

    buildAssets(assets) {
        let cont = document.createElement('div');
        cont.className += "gjs-am-assets";
        cont.style.overflow = "visible";
        for (let i = 0; i < assets.length; i++) {
            //console.log(assets.models[i].attributes);
            let url = assets.models[i].attributes.src;
            let name = assets.models[i].attributes.src;
            let dim = assets.models[i].attributes.width + "x" + assets.models[i].attributes.height + assets.models[i].attributes.unitDim;
            cont.appendChild(this.buildAsset(url, name, dim));
        }
        return cont;
    }
}

export default Assets