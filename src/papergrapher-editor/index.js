export default (editor, options = {}) => {
  const opts = {
    ...{
      // Papergrapher Version
      appVersion: "0.42",

      // Toolbar icons location(url).
      toolbarIcons: 'dist/img/assets/tools/',

      // Icon switch color location
      switchColor: 0,

      // Select icon
      selectIcon: 0,

      // Editor Theme
      theme: 0,

      // UI extensions
      UI: {},

      // Papergrapher configurations
      config: {},

      // Pass the editor constructor. By default, the `pg.init` will be called
      constructor: '',

      // Label for the SVG editor (used in the modal)
      labelSvgEditor: 'SVG Editor',

      // Label used on the apply button
      labelApply: 'Apply',

      // Default editor height
      height: '600px',

      // Default editor width
      width: '100%',

      // Id to use to create the svg editor command
      commandId: 'papergrapher-svg-editor',

      // Icon used in the component toolbar
      toolbarIcon: `<svg viewBox="0 0 24 24">
                      <path d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83 3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25z">
                      </path>
                    </svg>`,

      // Hide the default editor header
      hideHeader: 1,

      // Hide papergrapher's about information
      hideAbout: 0,

      // By default, GrapesJS takes the modified image, adds it to the Asset Manager and update the target.
      // If you need some custom logic you can use this custom 'onApply' function
      // eg.
      // onApply: (imageEditor, imageModel) => {
      //   const dataUrl = imageEditor.toDataURL();
      //   editor.AssetManager.add({ src: dataUrl }); // Add it to Assets
      //   imageModel.set('src', dataUrl); // Update the image component
      // }
      onApply: 0,

      // If no custom `onApply` is passed and this option is `true`, the result image will be added to assets
      addToAssets: 0,

      // If no custom `onApply` is passed, on confirm, the edited image, will be passed to the AssetManager's
      // uploader and the result (eg. instead of having the dataURL you'll have the URL) will be
      // passed to the default `onApply` process (update target, etc.)
      upload: 0,

      // The apply button (HTMLElement) will be passed as an argument to this function, once created.
      // This will allow you a higher customization.
      onApplyButton: () => {},

      // Scripts to load dynamically in case no papergrapher editor instance was found
      script: [
        //todo use cdn versions
        'dist/vendors/js/paper-full.min.js',
        //'dist/vendors/js/canvas-toBlob.js',
        'dist/vendors/js/jquery-ui.min.js',
        'dist/vendors/js/spectrum.js',
        'dist/vendors/js/opentype.min.js',
        //todo use minified version of file
        'dist/vendors/js/application.js'
      ],

      // Path to paper.js
      paper: 'dist/vendors/js/paper-full.min.js',

      // Papergrapher tools scripts to also load dynamically as above
      tool: [
        //todo use minified version of file
        'dist/vendors/js/papergrapherTools.js'
      ],

      // In case the script is loaded this style will be loaded too if any
      style: [],
    },
    ...options
  };

  const {
    script,
    paper,
    tool,
    style,
    height,
    width,
    hideHeader,
    hideAbout,
    toolbarIcons,
    onApply,
    appVersion,
    upload,
    addToAssets,
    commandId
  } = opts;
  const getConstructor = () => opts.constructor || (window.pg && window.pg.init);
  let constr = getConstructor();
  let init = false;

  // Dynamic loading of the image editor scripts and styles
  if (!constr && script) {
    const {
      head
    } = document;
    const scripts = Array.isArray(script) ? [...script] : [script];
    const tools = Array.isArray(tool) ? [...tool] : [tool];
    const styles = Array.isArray(style) ? [...style] : [style];
    const appendStyle = styles => {
      if (styles.length) {
        const link = document.createElement('link');
        link.href = styles.shift();
        link.rel = 'stylesheet';
        head.appendChild(link);
        appendStyle(styles);
      }
    }
    const appendScript = scripts => {
      if (scripts.length) {
        const scr = document.createElement('script');
        scr.src = scripts.shift();
        scr.onerror = scr.onload = appendScript.bind(null, scripts);
        head.appendChild(scr);
      } else {
        constr = getConstructor();
      }
    }
    const appendTool = tools => {
      if (tools.length) {
        const scr = document.createElement('script');
        scr.src = tools.shift();
        scr.type = "text/paperscript";
        scr.dataset.paperCanvas = "paperCanvas";
        scr.onerror = scr.onload = appendScript.bind(null, scripts);
        head.appendChild(scr);
      } else {
        constr = getConstructor();
      }
    }
    appendStyle(styles);
    appendScript(scripts);
    appendTool(tools);
  }

  // Update image component toolbar
  const domc = editor.DomComponents;
  const typeSvg = domc.getType('svg').model;
  domc.addType('svg', {
    model: {
      initToolbar() {
        typeSvg.prototype.initToolbar.apply(this, arguments);
        const tb = this.get('toolbar');
        const tbExists = tb.some(item => item.command === commandId);

        if (!tbExists) {
          tb.unshift({
            command: commandId,
            label: opts.toolbarIcon,
          });
          this.set('toolbar', tb);
        }
      }
    }
  })

  // Add the image editor command
  editor.Commands.add(commandId, {
    run(ed, s, options = {}) {
      const {
        id
      } = this;

      if (!constr) {
        ed.log('Papergrapher SVG editor not found', {
          level: 'error',
          ns: commandId,
        });
        return ed.stopCommand(id);
      }

      this.editor = ed;
      this.target = options.target || ed.getSelected();
      const content = this.createContent();
      const title = opts.labelSvgEditor;
      const btn = content.children[1];
      ed.Modal.open({
          title,
          content
        })
        .getModel().once('change:open', () => ed.stopCommand(id));
      if (!init) {
        this.svgEditor = new constr(content.children[0], this.getEditorConfig());
        init = true;
      } else {
        const markup = document.getElementById('svg-panel');
        markup.style.display = "block";
        content.children[0].appendChild(markup);
        pg.import.importAndAddSVG(this.writeSvg());
      }
      ed.getModel().setEditing(1);
      btn.onclick = () => this.applyChanges();
      opts.onApplyButton(btn);
    },

    stop(ed) {
      //const {
      //  svgEditor
      //} = this;
      //svgEditor && svgEditor.destroy();
      document.getElementById('svg-panel').style.display = "none";
      pg.document.clear();
      ed.getModel().setEditing(0);
    },

    getEditorConfig() {
      const config = {
        ...opts.config
      };
      const path = this.writeSvg(); //?load target svg
      //console.error(path);
      if (!config.UI) config.UI = {};
      config.appVersion = appVersion;
      config.UI = {
        theme: {},
        ...config.UI,
        loadSvg: {
          path,
          name: 1
        },
        uiSize: {
          height,
          width
        },
      };
      if (hideHeader) config.UI.theme['header.display'] = 'none';
      if (hideAbout) config.UI.theme['about.display'] = 'none';
      if (toolbarIcons) config.UI.theme = {
        ...config.UI.theme,
        toolbarIcons: toolbarIcons,
      }

      return config;
    },

    writeSvg() {
      const style = '<style>' +
        this.editor.CodeManager.getCode(this.target, 'css', {
          cssc: this.editor.CssComposer
        }) + '</style>';
      const splitSvg = this.target.toHTML().split('>');
      let svgStream = '';
      for (let i = 0; i < splitSvg.length; i++) {
        if (i == 0)
          svgStream += splitSvg[i] + ">" + style;
        else if (i == splitSvg.length - 1)
          svgStream += splitSvg[i];
        else
          svgStream += splitSvg[i] + ">";
      }
      return svgStream
    },

    createContent() {
      const content = document.createElement('div');
      content.style = 'position: relative';
      content.innerHTML = `
          <div style="width: ${width}; height: ${height}"></div>
          <button class="paper-editor__apply-btn" style="
            position: absolute;
            bottom: 0; left: 0;
            margin: 10px;
            background-color: #622a6d;
            color: white;
            font-size: 1rem;
            border-radius: 3px;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            z-index: 100;
          ">
            ${opts.labelApply}
          </botton>
        `;

      return content;
    },

    applyChanges() {
      const {
        svgEditor,
        target
        //editor
      } = this;
      //const {
      //AssetManager
      //} = editor;

      if (onApply) {
        onApply(svgEditor, target);
      } else {
        //todo get result from papergrapher then apply
        let result = pg.export.exportAndPromptSVG() //svgEditor.export.exportSvg();
        this.applyToTarget(result);
      }
    },

    applyToTarget(result) {
      const coll = this.target.collection;
      const at = coll.indexOf(this.target);
      coll.remove(this.target);
      coll.add(result, {
        at
      });
      this.editor.Modal.close();
    },
  });
};