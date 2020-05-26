///import grapesjs from 'grapesjs';
import pluginBlocks from 'grapesjs-blocks-basic';
import pluginNavbar from 'grapesjs-navbar';
import pluginCountdown from 'grapesjs-component-countdown';
import pluginForms from 'grapesjs-plugin-forms';
import pluginBs4 from 'grapesjs-blocks-bootstrap4';
import pluginExport from 'grapesjs-plugin-export';
//import pluginAviary from 'grapesjs-aviary';
import pluginFilestack from 'grapesjs-plugin-filestack';
import pluginTabs from 'grapesjs-tabs';
import pluginTooltip from 'grapesjs-tooltip';
import pluginBlocksFlexbox from 'grapesjs-blocks-flexbox';
import pluginTouch from 'grapesjs-touch';
import pluginStyleFilter from 'grapesjs-style-filter';
//import pluginStyleGradient from 'grapesjs-style-gradient';
import pluginBg from 'grapesjs-style-bg';
import pluginParserPostcss from 'grapesjs-parser-postcss';
import pluginCustomCode from 'grapesjs-custom-code';
import pluginTyped from 'grapesjs-typed';
import pluginImageEditor from 'grapesjs-tui-image-editor';
import pluginLorySlider from 'grapesjs-lory-slider';
//import pluginCke from 'grapesjs-plugin-ckeditor';

import commands from './commands';
import blocks from './blocks';
import components from './components';
import panels from './panels';
import styles from './styles';
import storage from './storage';
import en from './locale/en';
import CustomMenu from './custom/index';
import breadcrumbs from './tools/breadcrumbs';

export default grapesjs.plugins.add('grapesjs-grapeflow', (editor, opts = {}) => {
  let config = opts;

  const options = {
    ...{
      i18n: {},
      // default options
    },
    ...opts
  };

  let defaults = {
    // Which blocks to add
    blocks: ['link-block', 'quote', 'text-basic'],

    // Modal import title
    modalImportTitle: 'Import',

    // Modal import button text
    modalImportButton: 'Import',

    // Import description inside import modal
    modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',

    // Default content to setup on import model open.
    // Could also be a function with a dynamic content return (must be a string)
    // eg. modalImportContent:editor => editor.getHtml() + '<style>' + editor.getCss() + '</style>,
    modalImportContent: `
    <style>
      .class1 {
        color: grey;
        margin: 5px 5px 5px 5px;
        padding: 5px 5px 5px 5px;
      }
    </style>
    <h1>
      Warning
    </h1>
    <div class="class1">
      This operation will overwrite the canvas. If you want to insert code use the custom code component.
    </div>
    `,

    // Code viewer (eg. CodeMirror) options
    importViewerOptions: {},

    // Confirm text before cleaning the canvas
    textCleanCanvas: 'Are you sure to clean the canvas?',

    // Show the Style Manager on component change
    showStylesOnChange: 1,

    // Text for Layout sector in Style Manager
    textLayout: 'Layout',

    // Text for Flex sector in Style Manager
    textFlex: 'Flex',

    // Text for Dimension sector in Style Manager
    textDimension: 'Dimensions',

    // Text for Position sector in Style Manager
    textPosition: 'Position',

    // Text for Typography sector in Style Manager
    textTypography: 'Typography',

    // Text for Spacing sector in Style Manager
    textSpacing: 'Spacing',

    // Text for Borders sector in Style Manager
    textBorders: 'Borders',

    // Text for Decorations sector in Style Manager
    textDecorations: 'Decorations',

    // Text for Extra sector in Style Manager
    textExtra: 'Extra',

    // Text for Assets menu
    textAssets: 'Assets',

    // Text for CMS menu
    textCMS: 'CMS',

    // Text for Manager menu
    textManager: 'Pages',

    // Text for Settings menu
    textSettings: 'Project Settings',

    // Text for Templates menu
    textTemplates: 'Templates',

    // Text for Blocks menu
    textBlocks: 'Add',

    // Text for Layers menu
    textLayers: 'Layout',

    // Use custom set of sectors for the Style Manager
    customStyleManager: [],

    // Flow Storage options
    urlStorePages: '',
    urlLoadPages: '',
    urlStoreProjects: '',
    urlLoadProjects: '',
    urlStoreTemplates: '',
    urlLoadTemplates: '',
    urlStoreAssets: '',
    urlLoadAssets: '',
    urlStoreLogic: '',
    urlLoadLogic: '',
    urlStoreSettings: '',
    urlLoadSettings: '',

    // `grapesjs-blocks-basic` plugin options
    // By setting this option to `false` will avoid loading the plugin
    blocksBasicOpts: {
      flexGrid: true
    },

    // `grapesjs-navbar` plugin options
    // By setting this option to `false` will avoid loading the plugin
    navbarOpts: {},

    // `grapesjs-component-countdown` plugin options
    // By setting this option to `false` will avoid loading the plugin
    countdownOpts: {},

    // `grapesjs-plugin-forms` plugin options
    // By setting this option to `false` will avoid loading the plugin
    formsOpts: {},

    // `grapesjs-blocks-bootsrap4` plugin options
    // By setting this option to `false` will avoid loading the plugin
    bs4Opts: {},

    // `grapesjs-plugin-export` plugin options
    // By setting this option to `false` will avoid loading the plugin
    // Set root: --- ie directory structure
    exportOpts: {
      btnLabel: '<i class="fa fa-link-cloud-upload"></i>Export to ZIP',
      filenamePfx: 'grapeflow_template',
      filename: null, //todo function for generating file names eg. editor => 'file.zip'
      root: {
        css: {
          'style.css': ed => ed.getCss(),
        },
        'index.html': ed =>
          `<!doctype html>
          <html lang="en">
            <head>
              <meta charset="utf-8">
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css">
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
              <link rel="stylesheet" href="./css/style.css">
            </head>
            <body>${ed.getHtml()}</body>
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
          </html>`,
      },
    },

    // `grapesjs-tabs` plugin options
    // By setting this option to `false` will avoid loading the plugin
    tabsOpts: {
      tabsBlock: {
        category: 'Extra',
      }
    },

    // `grapesjs-tooltip` plugin options
    // By setting this option to `false` will avoid loading the plugin
    tooltipOpts: {},

    // `grapesjs-blocks-flexbox` plugin options
    // By setting this option to `false` will avoid loading the plugin
    flexboxOpts: {},

    // `grapesjs-touch` plugin options
    // By setting this option to `false` will avoid loading the plugin
    touchOpts: {},

    // `grapesjs-style-filter` plugin options
    // By setting this option to `false` will avoid loading the plugin
    filterOpts: {},

    // `grapesjs-style-gradient` plugin options
    // By setting this option to `false` will avoid loading the plugin
    bgOpts: {
      styleGradientOpts: {
        colorPicker: 'default',
        grapickOpts: {
          min: 1,
          max: 99,
        }
      }
    },

    // `grapesjs-lory-slider` plugin options
    // By setting this option to `false` will avoid loading the plugin
    sliderOpts: {
      sliderBlock: {
        category: 'Extra',
      }
    },

    // `grapesjs-parser-postcss` plugin options
    // By setting this option to `false` will avoid loading the plugin
    postcssOpts: {},

    // `grapesjs-custom-code` plugin options
    // By setting this option to `false` will avoid loading the plugin
    codeOpts: {},

    // `grapesjs-typed` plugin options
    // By setting this option to `false` will avoid loading the plugin
    typedOpts: {
      block: {
        category: 'Extra',
        content: {
          type: 'typed',
          'type-speed': 40,
          strings: [
            'Text row one',
            'Text row two',
            'Text row three',
          ],
        }
      }
    },

    // `grapesjs-tui-image-editor` plugin options
    // By setting this option to `false` will avoid loading the plugin
    imgeditorOpts: {},

    // `grapesjs-aviary` plugin options, disabled by default
    // Aviary library should be included manually
    // By setting this option to `false` will avoid loading the plugin
    //aviaryOpts: 0,

    // `grapesjs-plugin-filestack` plugin options, disabled by default
    // Filestack library should be included manually
    // By setting this option to `false` will avoid loading the plugin
    // Reset to true if user provides API key
    //{ key: $key, btnEl: el, btnText: Filestack }
    filestackOpts: 0,

    // `grapesjs-plugin-ckeditor` plugin options, disabled by default
    // ckeditor library should be included manually
    // By setting this option to `false` will avoid loading the plugin
    //ckeOpts: {
    //  position: 'center',
    //  options: {
    //    startupFocus: true,
    //    extraAllowedContent: '*(*);*{*}', // Allows any class and any inline style
    //    allowedContent: true, // Disable auto-formatting, class removing, etc.
    //    enterMode: CKEDITOR.ENTER_BR,
    //    extraPlugins: 'sharedspace,justify,colorbutton,panelbutton,font',
    //    toolbar: [{
    //        name: 'styles',
    //        items: ['Font', 'FontSize']
    //      },
    //      ['Bold', 'Italic', 'Underline', 'Strike'],
    //      {
    //        name: 'paragraph',
    //        items: ['NumberedList', 'BulletedList']
    //      },
    //      {
    //        name: 'links',
    //        items: ['Link', 'Unlink']
    //      },
    //      {
    //        name: 'colors',
    //        items: ['TextColor', 'BGColor']
    //      },
    //    ],
    //  }
    //}
  };

  // Load defaults
  for (let name in defaults) {
    if (!(name in config))
      config[name] = defaults[name];
  }

  const {
    blocksBasicOpts,
    navbarOpts,
    countdownOpts,
    formsOpts,
    exportOpts,
    //aviaryOpts,
    filestackOpts,
    tabsOpts,
    tooltipOpts,
    flexboxOpts,
    touchOpts,
    filterOpts,
    bgOpts,
    postcssOpts,
    codeOpts,
    typedOpts,
    imgeditorOpts,
    sliderOpts,
    bs4Opts
    //ckeOpts
  } = config;

  // Load plugins
  blocksBasicOpts && pluginBlocks(editor, blocksBasicOpts);
  navbarOpts && pluginNavbar(editor, navbarOpts);
  countdownOpts && pluginCountdown(editor, countdownOpts);
  formsOpts && pluginForms(editor, formsOpts);
  tabsOpts && pluginTabs(editor, tabsOpts);
  tooltipOpts && pluginTooltip(editor, tooltipOpts);
  flexboxOpts && pluginBlocksFlexbox(editor, flexboxOpts);
  bs4Opts && pluginBs4(editor, bs4Opts);
  touchOpts && pluginTouch(editor, touchOpts);
  filterOpts && pluginStyleFilter(editor, filterOpts);
  bgOpts && pluginBg(editor, bgOpts);
  postcssOpts && pluginParserPostcss(editor, postcssOpts);
  codeOpts && pluginCustomCode(editor, codeOpts);
  typedOpts && pluginTyped(editor, typedOpts);
  exportOpts && pluginExport(editor, exportOpts);
  imgeditorOpts && pluginImageEditor(editor, imgeditorOpts);
  sliderOpts && pluginLorySlider(editor, sliderOpts);
  //aviaryOpts && pluginAviary(editor, aviaryOpts);
  filestackOpts && pluginFilestack(editor, filestackOpts);
  //ckeOpts && pluginCke(editor, ckeOpts);

  // Load components
  components(editor, config);

  // Load blocks
  blocks(editor, config);

  // Load commands
  commands(editor, config);

  // Load panels
  panels(editor, config);

  // Load styles
  styles(editor, config);

  // Load storage
  storage(editor, config);

  // Load i18n files
  editor.I18n && editor.I18n.addMessages({
    en,
    ...options.i18n,
  });

  //Load breadcrumbs
  breadcrumbs(editor, config);

  //Load Custom Menu
  editor.on('load', () => {
    let customMenu = null;
    if (!customMenu) customMenu = new CustomMenu();
    //Close Block Manager Panes
    editor.BlockManager.getCategories().each(function (ctg) {
      ctg.set('open', false);
    });
  })

  //Style manager extensions
  editor.StyleManager.addProperty('extra', {
    name: 'Filter',
    property: 'filter',
    type: 'filter',
    full: 1,
  });

  // Store and load events
  editor.on('storage:load', function (e) {
    console.log('Loaded ', e)
  });
  editor.on('storage:error:load', function (e) {
    console.log('Loading error ', e)
  });
  //editor.on('storage:store', function (e) {
  //  console.log(e)
  //});
  editor.on('storage:error:store', function (e) {
    console.error('Storage error ', e)
  });

});