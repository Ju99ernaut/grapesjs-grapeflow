import {
  cmdImport,
  cmdDeviceDesktop,
  cmdDeviceTablet,
  cmdDeviceMobile,
  cmdClear,
  cmdInteractions,
  cmdEdit,
  cmdSave,
  cmdLaunch
} from './../consts';

export default (editor, config) => {
  const pn = editor.Panels;
  const eConfig = editor.getConfig();
  const crc = 'create-comp';
  const mvc = 'move-comp';
  const swv = 'sw-visibility';
  const expt = 'export-template';
  const edt = 'code-editor';
  const osm = 'open-sm';
  const otm = 'open-tm';
  const olm = 'open-logic';
  const ola = 'open-layers';
  const obl = 'open-blocks';
  const ful = 'fullscreen';
  const prv = 'preview';

  eConfig.showDevices = 0;

  pn.getPanels().reset([{
    id: 'pipelines-logo',
  }, {
    id: 'options',
    buttons: [{
      id: swv,
      command: swv,
      context: swv,
      className: 'fa fa-square-o',
      active: true,
    }, {
      id: prv,
      context: prv,
      command: e => e.runCommand(prv),
      className: 'fa fa-eye',
    }, {
      id: ful,
      command: ful,
      context: ful,
      className: 'fa fa-arrows-alt',
    }, {
      id: expt,
      className: 'fa fa-code',
      command: e => e.runCommand(expt),
    }, {
      id: 'undo',
      className: 'fa fa-undo',
      attributes: {
        title: 'undo',
      },
      command: e => e.runCommand('core:undo'),
    }, {
      id: 'redo',
      className: 'fa fa-repeat',
      attributes: {
        title: 'redo',
      },
      command: e => e.runCommand('core:redo'),
    }, {
      id: cmdImport,
      className: 'fa fa-download',
      attributes: {
        title: 'import',
      },
      command: e => e.runCommand(cmdImport),
    }, {
      id: cmdClear,
      className: 'fa fa-trash',
      attributes: {
        title: 'clear',
      },
      command: e => e.runCommand(cmdClear),
    }, {
      id: cmdSave,
      className: 'fa fa-cloud-upload',
      attributes: {
        title: 'save',
      },
      command: e => e.runCommand(cmdSave),
    }, {
      id: cmdLaunch,
      className: 'fa fa-rocket',
      attributes: {
        title: 'launch',
      },
      command: e => e.runCommand(cmdLaunch),
    }],
  }, {
    id: 'views',
    buttons: [{
        id: osm,
        command: osm,
        active: true,
        className: 'fa fa-paint-brush',
      }, {
        id: otm,
        command: otm,
        className: 'fa fa-cog',
      },
      {
        id: 'open-im',
        command: cmdInteractions,
        className: 'fa fa-bolt',
        attributes: {
          title: 'interactions',
        },
      }, //{
      //id: olm,
      //command: olm,
      //className: 'fa fa-file-code-o',
      //attributes: {
      //  title: 'logic',
      //},
      //}, 
      {
        id: edt,
        className: 'fa fa-file-code-o',
        command: cmdEdit,
        attributes: {
          title: 'code editor',
        },
      },
    ], //Append to left menu{
    //id: ola,
    //command: ola,
    //className: 'fa fa-bars',
    //},{
    //id: obl,
    //command: obl,
    //className: 'fa fa-th-large',
    //}],
  }]);

  // Add devices buttons
  const panelDevices = pn.addPanel({
    id: 'devices'
  }); //previous id devices-c
  panelDevices.get('buttons').add([{
    id: cmdDeviceDesktop,
    command: cmdDeviceDesktop,
    className: 'fa fa-desktop',
    attributes: {
      title: 'desktop',
    },
    active: 1,
  }, {
    id: cmdDeviceTablet,
    command: cmdDeviceTablet,
    className: 'fa fa-tablet',
    attributes: {
      title: 'tablet',
    },
  }, {
    id: cmdDeviceMobile,
    command: cmdDeviceMobile,
    className: 'fa fa-mobile',
    attributes: {
      title: 'mobile',
    },
  }]);

  const openBl = pn.getButton('views', obl);
  editor.on('load', () => openBl && openBl.set('active', 1));

  // On component change show the Style Manager
  config.showStylesOnChange && editor.on('component:selected', () => {
    const openSmBtn = pn.getButton('views', osm);
    const openLayersBtn = pn.getButton('views', ola);

    // Don't switch when the Layer Manager is on or
    // there is no selected component
    if ((!openLayersBtn || !openLayersBtn.get('active')) && editor.getSelected()) {
      openSmBtn && openSmBtn.set('active', 1);
    }
  });
}