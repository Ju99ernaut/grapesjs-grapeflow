const properties = [{
        name: 'name',
        label: 'Name',
        placeholder: 'eg. title',
        url: false,
        radio: false
    },
    {
        name: 'description',
        label: 'Description',
        placeholder: 'eg. description',
        url: false,
        radio: false
    },
    {
        name: 'preview',
        label: 'Preview <i class="fa fa-link"></i>',
        placeholder: 'example.com', //todo autogen or file field
        before: 'https://',
        after: false,
        url: true,
        radio: false
    },
    {
        name: 'multipage',
        label: 'Multipage <i class="fa fa-question-circle-o"></i>',
        placeholder: 'eg. True',
        url: false,
        radio: true
    },
    {
        name: 'customDomain',
        label: 'Custom Domain <i class="fa fa-question-circle-o"></i>',
        placeholder: 'eg. True',
        url: false,
        radio: true
    },
    {
        name: 'customDomainUrl',
        label: 'Custom Domain Url <i class="fa fa-link"></i>',
        placeholder: 'example.com',
        before: 'https://',
        after: false,
        url: true,
        radio: false
    },
    {
        name: 'domain',
        label: 'Domain Name',
        placeholder: 'domain',
        before: 'https://',
        after: '.sub.com',
        url: true,
        radio: false
    },
    {
        name: 'public',
        label: 'Public <i class="fa fa-question-circle-o"></i>',
        placeholder: 'eg. True',
        url: false,
        radio: true
    },
    {
        name: 'market',
        label: 'Market <i class="fa fa-question-circle-o"></i>',
        placeholder: 'eg. True',
        url: false,
        radio: true
    },
    {
        name: 'branding',
        label: 'Branding <i class="fa fa-question-circle-o"></i>',
        placeholder: 'eg. True',
        url: false,
        radio: true
    },
];

class Settings {
    constructor() {
        const fs = editor.StorageManager.get('flow-storage');
        this.settings = {
            name: '',
            description: '',
            preview: '',
            multipage: false,
            customDomain: false,
            customDomainUrl: '',
            domain: '',
            public: false,
            market: false,
            branding: true
        };
        const clbErr = err => {
            console.warn("Failed to load settings...", err);
            //console.error(err);
        };
        fs.viewProject(res => {
            //todo init settings
            this.settings.name = res.name;
            this.settings.description = res.description;
            this.settings.preview = res.preview;
            this.settings.multipage = res.multipage;
            this.settings.customDomain = res.customDomain;
            this.settings.customDomainUrl = res.customDomainUrl;
            this.settings.domain = res.domain;
            this.settings.public = res.public;
            this.settings.market = res.market;
            this.settings.branding = res.branding;
            this.buildSettings();
            console.info("Settings loaded");
        }, clbErr);
    }

    buildUrlFields(before, name, type, placeholder, after) {
        const div = document.createElement('div');
        div.className += "blc-form-group";

        if (before) {
            const beforeSpan = document.createElement('span');
            beforeSpan.innerHTML = before;
            div.appendChild(beforeSpan);
        }

        const input = document.createElement('input');
        input.className += "blc-form-field";
        //input.type = type ? type : 'text';
        input.placeholder = placeholder ? placeholder : '';
        input.name = name ? name : '';
        input.value = this.settings[name] !== '' ?
            this.settings[name].split('://').pop().split('.')[0] : this.settings[name];
        input.addEventListener('change', e => this.checkUrl(e));
        div.appendChild(input);

        if (after) {
            const afterSpan = document.createElement('span');
            afterSpan.innerHTML = after;
            div.appendChild(afterSpan);
        }

        return div;
    }

    buildNormalFields(name, type, radio, placeholder) {
        const iField = document.createElement('div');
        iField.className = "gjs-field left-menu-input";
        const input = name == 'description' ? document.createElement('textarea') : document.createElement('input');
        input.placeholder = placeholder;
        //input.type = type ? type : 'text';
        input.name = name;
        if (radio) {
            iField.className = "left-menu-input";
            input.type = "checkbox";
            input.className += "colored switch"
            input.checked = this.settings[name];
        } else
            input.value = this.settings[name];
        iField.appendChild(input);
        return iField;
    }

    buildSettings() {
        let cont = document.createElement('div');
        for (let prop in properties) {
            const label = document.createElement('div');
            label.innerHTML = properties[prop].label;
            label.className += "left-menu-label";
            cont.appendChild(label);
            const iField = properties[prop].url ? this.buildUrlFields(properties[prop].before, properties[prop].name, 'text', properties[prop].placeholder, properties[prop].after) :
                this.buildNormalFields(properties[prop].name, 'text', properties[prop].radio, properties[prop].placeholder);
            cont.appendChild(iField);
        }
        cont.appendChild(this.saveButton());
        document.getElementById('settings').appendChild(cont);
    }

    saveButton() {
        const b = document.createElement('button');
        b.id = "save-settings";
        b.innerHTML = '<i class="fa fa-link-cloud-upload"></i>Save Settings';
        b.className += "gjs-btn-prim left-menu-input";
        b.addEventListener('click', (e) => this.saveSettings(e));
        return b
    }

    saveSettings(e) {
        const clb = (res) => {
            console.info("Settings updated", res);
        }
        const clbErr = (err) => {
            console.warn("Failed to update settings", err);
        }
        const fs = editor.StorageManager.get('flow-storage');
        //todo modify request, and ensure it is called if there are changes
        fs.storeProject(this.settings, clb, clbErr);
    }

    checkUrl(e) {
        let regexQuery = "^(https?|ftp)://[^\s/$.?#.[^\s*$@iS]";
        let regUrl = new RegExp(regexQuery, "i");
        //!regex not working
        if (e.target.value !== "" && e.target.type !== "checkbox") {
            if (e.target.value.match(regUrl) !== null)
                this.settings[e.target.name] = e.target.value;
            else if (e.target.name != "preview" && e.target.name != "customDomainUrl")
                this.settings[e.target.name] = e.target.value;
            else {
                console.info("Invalid url");
                e.target.value = "";
            }
        } else
            this.settings[e.target.name] = e.target.checked;
    }
}

export default Settings;