///import grapesjs from 'grapesjs';
import pluginBlocks from 'grapesjs-blocks-basic';
import pluginNavbar from 'grapesjs-navbar';
import pluginCountdown from 'grapesjs-component-countdown';
import pluginForms from 'grapesjs-plugin-forms';
import pluginExport from 'grapesjs-plugin-export';
import pluginAviary from 'grapesjs-aviary';
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

import commands from './commands';
import blocks from './blocks';
import components from './components';
import panels from './panels';
import styles from './styles';
import en from './locale/en';
import CustomMenu from './custom/index';

export default grapesjs.plugins.add('gjs-grapeflow', (editor, opts = {}) => {
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
    // eg. modalImportContent: editor => editor.getHtml(),
    modalImportContent: editor => editor.getHtml() + '<style>' + editor.getCss() + '</style>',

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

    // Use custom set of sectors for the Style Manager
    customStyleManager: [],

    // `grapesjs-blocks-basic` plugin options
    // By setting this option to `false` will avoid loading the plugin
    blocksBasicOpts: {},

    // `grapesjs-navbar` plugin options
    // By setting this option to `false` will avoid loading the plugin
    navbarOpts: {},

    // `grapesjs-component-countdown` plugin options
    // By setting this option to `false` will avoid loading the plugin
    countdownOpts: {},

    // `grapesjs-plugin-forms` plugin options
    // By setting this option to `false` will avoid loading the plugin
    formsOpts: {},

    // `grapesjs-plugin-export` plugin options
    // By setting this option to `false` will avoid loading the plugin
    exportOpts: {},

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
    aviaryOpts: 0,

    // `grapesjs-plugin-filestack` plugin options, disabled by default
    // Filestack library should be included manually
    // By setting this option to `false` will avoid loading the plugin
    filestackOpts: 0,
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
    aviaryOpts,
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
    sliderOpts
  } = config;

  // Load plugins
  blocksBasicOpts && pluginBlocks(editor, blocksBasicOpts);
  navbarOpts && pluginNavbar(editor, navbarOpts);
  countdownOpts && pluginCountdown(editor, countdownOpts);
  formsOpts && pluginForms(editor, formsOpts);
  tabsOpts && pluginTabs(editor, tabsOpts);
  tooltipOpts && pluginTooltip(editor, tooltipOpts);
  flexboxOpts && pluginBlocksFlexbox(editor, flexboxOpts);
  touchOpts && pluginTouch(editor, touchOpts);
  filterOpts && pluginStyleFilter(editor, filterOpts);
  bgOpts && pluginBg(editor, bgOpts);
  postcssOpts && pluginParserPostcss(editor, postcssOpts);
  codeOpts && pluginCustomCode(editor, codeOpts);
  typedOpts && pluginTyped(editor, typedOpts);
  exportOpts && pluginExport(editor, exportOpts);
  imgeditorOpts && pluginImageEditor(editor, imgeditorOpts);
  sliderOpts && pluginLorySlider(editor, sliderOpts);
  aviaryOpts && pluginAviary(editor, aviaryOpts);
  filestackOpts && pluginFilestack(editor, filestackOpts);

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

  // Load i18n files
  editor.I18n && editor.I18n.addMessages({
    en,
    ...options.i18n,
  });

  //Load Custom Menu
  editor.on('load', function () {
    let customMenu = null;
    if (!customMenu) customMenu = new CustomMenu();
  })

  //Style manager extensions
  editor.StyleManager.addProperty('extra', {
    name: 'Filter',
    property: 'filter',
    type: 'filter',
    full: 1,
  });

  //Close Block Manager Panes
  editor.BlockManager.getCategories().each(function (ctg) {
    ctg.set('open', false);
  });

  // Store and load events
  editor.on('storage:load', function (e) {
    console.log('Loaded ', e)
  });
  editor.on('storage:store', function (e) {
    console.log('Stored ', e)
  });

});