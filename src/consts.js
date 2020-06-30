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
    id: "unsplash",
    name: "assets",
    labelText: "Unsplash",
  },
  basicBlocksTab = {
    id: "basic",
    name: "blocks",
    labelText: "Starter",
  },
  bs4BlocksTab = {
    id: "bootstrap",
    name: "blocks",
    labelText: "Bootstrap4",
  },
  extraBlocksTab = {
    id: "extra",
    name: "blocks",
    labelText: "Blocks",
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
  },
  animations = [{
      label: 'Attention seekers',
      options: [{
          value: 'bounce'
        },
        {
          value: 'flash'
        },
        {
          value: 'pulse'
        },
        {
          value: 'rubberBand'
        },
        {
          value: 'shakeX'
        },
        {
          value: 'shakeY'
        },
        {
          value: 'headShake'
        },
        {
          value: 'swing'
        },
        {
          value: 'tada'
        },
        {
          value: 'wobble'
        },
        {
          value: 'jello'
        },
        {
          value: 'heartBeat'
        },
      ]
    },
    {
      label: 'Back entrances',
      options: [{
          value: 'backInDown'
        },
        {
          value: 'backInLeft'
        },
        {
          value: 'backInRight'
        },
        {
          value: 'backInUp'
        }
      ]
    },
    {
      label: 'Back exits',
      options: [{
          value: 'backOutDown'
        },
        {
          value: 'backOutLeft'
        },
        {
          value: 'backOutRight'
        },
        {
          value: 'backOutUp'
        }
      ]
    },
    {
      label: 'Bouncing entrances',
      options: [{
          value: 'bounceIn'
        },
        {
          value: 'bounceInDown'
        },
        {
          value: 'bounceInLeft'
        },
        {
          value: 'bounceInRight'
        },
        {
          value: 'bounceInUp'
        }
      ]
    },
    {
      label: 'Bouncing exits',
      options: [{
          value: 'bounceOut'
        },
        {
          value: 'bounceOutDown'
        },
        {
          value: 'bounceOutLeft'
        },
        {
          value: 'bounceOutRight'
        },
        {
          value: 'bounceOutUp'
        }
      ]
    },
    {
      label: 'Fading entrances',
      options: [{
          value: 'fadeIn'
        },
        {
          value: 'fadeInDown'
        },
        {
          value: 'fadeInDownBig'
        },
        {
          value: 'fadeInLeft'
        },
        {
          value: 'fadeInLeftBig'
        },
        {
          value: 'fadeInRight'
        },
        {
          value: 'fadeInRightBig'
        },
        {
          value: 'fadeInUp'
        },
        {
          value: 'fadeInUpBig'
        },
        {
          value: 'fadeInTopLeft'
        },
        {
          value: 'fadeInTopRight'
        },
        {
          value: 'fadeInBottomLeft'
        },
        {
          value: 'fadeInBottomRight'
        }
      ]
    },
    {
      label: 'Fading exits',
      options: [{
          value: 'fadeOut'
        },
        {
          value: 'fadeOutDown'
        },
        {
          value: 'fadeOutDownBig'
        },
        {
          value: 'fadeOutLeft'
        },
        {
          value: 'fadeOutLeftBig'
        },
        {
          value: 'fadeOutRight'
        },
        {
          value: 'fadeOutRightBig'
        },
        {
          value: 'fadeOutUp'
        },
        {
          value: 'fadeOutUpBig'
        },
        {
          value: 'fadeOutTopLeft'
        },
        {
          value: 'fadeOutTopRight'
        },
        {
          value: 'fadeOutBottomLeft'
        },
        {
          value: 'fadeOutBottomRight'
        }
      ]
    },
    {
      label: 'Flippers',
      options: [{
          value: 'flip'
        },
        {
          value: 'flipInX'
        },
        {
          value: 'flipInY'
        },
        {
          value: 'flipOutX'
        },
        {
          value: 'flipOutY'
        }
      ]
    },
    {
      label: 'Lightspeed',
      options: [{
          value: 'lightSpeedInRight'
        },
        {
          value: 'lightSpeedInLeft'
        },
        {
          value: 'lightSpeedOutRight'
        },
        {
          value: 'lightSpeedOutLeft'
        }
      ]
    },
    {
      label: 'Rotating entrances',
      options: [{
          value: 'rotateIn'
        },
        {
          value: 'rotateInDownLeft'
        },
        {
          value: 'rotateInDownRight'
        },
        {
          value: 'rotateInUpLeft'
        },
        {
          value: 'rotateInUpRight'
        }
      ]
    },
    {
      label: 'Rotating exits',
      options: [{
          value: 'rotateOut'
        },
        {
          value: 'rotateOutDownLeft'
        },
        {
          value: 'rotateOutDownRight'
        },
        {
          value: 'rotateOutUpLeft'
        },
        {
          value: 'rotateOutUpRight'
        }
      ]
    },
    {
      label: 'Specials',
      options: [{
          value: 'hinge'
        },
        {
          value: 'jacInTheBox'
        },
        {
          value: 'rollIn'
        },
        {
          value: 'rollOut'
        }
      ]
    },
    {
      label: 'Zooming entrances',
      options: [{
          value: 'zoomIn'
        },
        {
          value: 'zoomInDown'
        },
        {
          value: 'zoomInLeft'
        },
        {
          value: 'zoomInRight'
        },
        {
          value: 'zoomInUp'
        }
      ]
    },
    {
      label: 'Zooming exits',
      options: [{
          value: 'zoomOut'
        },
        {
          value: 'zoomOutDown'
        },
        {
          value: 'zoomOutLeft'
        },
        {
          value: 'zoomOutRight'
        },
        {
          value: 'zoomOutUp'
        }
      ]
    },
    {
      label: 'Sliding entrances',
      options: [{
          value: 'slideInDown'
        },
        {
          value: 'slideInLeft'
        },
        {
          value: 'slideInRight'
        },
        {
          value: 'slideInUp'
        },
      ]
    },
    {
      label: 'Sliding exits',
      options: [{
          value: 'slideOutDown'
        },
        {
          value: 'slideOutLeft'
        },
        {
          value: 'slideOutRight'
        },
        {
          value: 'slideOutUp'
        }
      ]
    }
  ],
  timingFunctions = ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out'];