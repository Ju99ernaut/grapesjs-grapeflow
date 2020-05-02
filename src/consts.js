export const
  cmdImport = 'gjs-open-import-webpage',
  cmdDeviceDesktop = 'set-device-desktop',
  cmdDeviceTablet = 'set-device-tablet',
  cmdDeviceMobile = 'set-device-mobile',
  cmdClear = 'canvas-clear',
  cmdInteractions = 'open-im',
  cmdEdit = 'code-editor',
  cmdSave = 'save-page',
  pfx = 'gjs-',
  $ = document.getElementById.bind(document),
  loader = `<style>
  body {
    background-color: #2f2a36;
  }

  .lds-grid {
    display: inline-block;
    position: absolute;
    top: 44%;
    left: 46%;
    width: 80px;
    height: 80px;
  }

  .lds-grid div {
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 1px;
    background: #fff;
    animation: lds-grid 1.2s linear infinite;
  }

  .lds-grid div:nth-child(1) {
    top: 8px;
    left: 8px;
    animation-delay: 0s;
  }

  .lds-grid div:nth-child(2) {
    top: 8px;
    left: 32px;
    animation-delay: -0.4s;
  }

  .lds-grid div:nth-child(3) {
    top: 8px;
    left: 56px;
    animation-delay: -0.8s;
  }

  .lds-grid div:nth-child(4) {
    top: 32px;
    left: 8px;
    animation-delay: -0.4s;
  }

  .lds-grid div:nth-child(5) {
    top: 32px;
    left: 32px;
    animation-delay: -0.8s;
  }

  .lds-grid div:nth-child(6) {
    top: 32px;
    left: 56px;
    animation-delay: -1.2s;
  }

  .lds-grid div:nth-child(7) {
    top: 56px;
    left: 8px;
    animation-delay: 0.8s;
  }

  .lds-grid div:nth-child(8) {
    top: 56px;
    left: 32px;
    animation-delay: -1.2s;
  }

  .lds-grid div:nth-child(9) {
    top: 56px;
    left: 56px;
    animation-delay: -1.6s;
  }

  @keyframes lds-grid {

    0%,
    100% {
      opacity: 1;
    }

    50% {
      opacity: 0.5;
    }
  }
</style>
<div class="lds-grid">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>`,
  cmdLaunch = 'launch-project',
  pageTab = {
    id: "workspace",
    name: "pages",
    labelText: "Workspace",
  },
  propertiesTab = {
    id: "properties",
    name: "pages",
    labelText: "Properties",
  },
  localTab = {
    id: "local",
    name: "assets",
    labelText: "Local",
  },
  libraryTab = {
    id: "pixabay",
    name: "assets",
    labelText: "Pixabay",
  },
  basicBlocksTab = {
    id: "basic",
    name: "blocks",
    labelText: "Basic",
  },
  bs4BlocksTab = {
    id: "bootstrap",
    name: "blocks",
    labelText: "Bootstrap",
  },
  extraBlocksTab = {
    id: "extra",
    name: "blocks",
    labelText: "Extra",
  },
  customBlocksTab = {
    id: "custom",
    name: "templates",
    labelText: "Custom",
  },
  marketBlocksTab = {
    id: "market",
    name: "templates",
    labelText: "Market",
  };