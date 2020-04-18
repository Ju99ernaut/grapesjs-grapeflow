export default (editor, config) => {
  const sm = editor.StyleManager;
  const csm = config.customStyleManager;

  sm.getSectors().reset(csm && csm.length ? csm : [{
      name: config.textLayout,
      open: false,
      buildProps: [ /*'alignment', */ 'display', 'float', 'order'],
      properties: [{
        //name: 'Alignment',
        property: 'float',
        type: 'radio',
        defaults: 'none',
        list: [{
            value: 'none',
            className: 'fa fa-times'
          },
          {
            value: 'left',
            className: 'fa fa-align-left'
          },
          {
            value: 'right',
            className: 'fa fa-align-right'
          }
        ],
      }, {
        property: 'display',
        type: 'radio',
        default: 'block', //block, inline, inline-block, flex, none
        list: [{
            value: 'none',
            title: 'none',
            className: 'fa fa-times'
          },
          {
            value: 'block',
            title: 'block',
            className: 'fa fa-square'
          },
          {
            value: 'inline',
            title: 'inline',
            className: 'fa fa-arrows-h'
          },
          {
            value: 'inline-block',
            title: 'inline-block',
            className: 'fa fa-th-large'
          },
          {
            value: 'flex',
            title: 'flex',
            className: 'fa fa-th'
          }
        ],
      }, ],
    },
    {
      name: config.textFlex,
      open: false,
      properties: [{
          name: 'Flex Container',
          property: 'display',
          type: 'select',
          defaults: 'block',
          list: [{
              value: 'block',
              name: 'Disable'
            },
            {
              value: 'flex',
              name: 'Enable'
            }
          ]
        },
        {
          name: 'Flex Parent',
          property: 'label-parent-flex',
          type: 'integer',
        },
        {
          name: 'Direction',
          property: 'flex-direction',
          type: 'radio',
          defaults: 'row',
          list: [{
            value: 'row',
            name: 'Row',
            className: 'icons-flex icon-dir-row',
            title: 'Row',
          }, {
            value: 'row-reverse',
            name: 'Row reverse',
            className: 'icons-flex icon-dir-row-rev',
            title: 'Row reverse',
          }, {
            value: 'column',
            name: 'Column',
            title: 'Column',
            className: 'icons-flex icon-dir-col',
          }, {
            value: 'column-reverse',
            name: 'Column reverse',
            title: 'Column reverse',
            className: 'icons-flex icon-dir-col-rev',
          }],
        }, {
          name: 'Justify',
          property: 'justify-content',
          type: 'radio',
          defaults: 'flex-start',
          list: [{
            value: 'flex-start',
            className: 'icons-flex icon-just-start',
            title: 'Start',
          }, {
            value: 'flex-end',
            title: 'End',
            className: 'icons-flex icon-just-end',
          }, {
            value: 'space-between',
            title: 'Space between',
            className: 'icons-flex icon-just-sp-bet',
          }, {
            value: 'space-around',
            title: 'Space around',
            className: 'icons-flex icon-just-sp-ar',
          }, {
            value: 'center',
            title: 'Center',
            className: 'icons-flex icon-just-sp-cent',
          }],
        }, {
          name: 'Align',
          property: 'align-items',
          type: 'radio',
          defaults: 'center',
          list: [{
            value: 'flex-start',
            title: 'Start',
            className: 'icons-flex icon-al-start',
          }, {
            value: 'flex-end',
            title: 'End',
            className: 'icons-flex icon-al-end',
          }, {
            value: 'stretch',
            title: 'Stretch',
            className: 'icons-flex icon-al-str',
          }, {
            value: 'center',
            title: 'Center',
            className: 'icons-flex icon-al-center',
          }],
        }, {
          name: 'Flex Children',
          property: 'label-parent-flex',
          type: 'integer',
        }, {
          name: 'Order',
          property: 'order',
          type: 'integer',
          defaults: 0,
          min: 0
        }, {
          name: 'Flex',
          property: 'flex',
          type: 'composite',
          properties: [{
            name: 'Grow',
            property: 'flex-grow',
            type: 'integer',
            defaults: 0,
            min: 0
          }, {
            name: 'Shrink',
            property: 'flex-shrink',
            type: 'integer',
            defaults: 0,
            min: 0
          }, {
            name: 'Basis',
            property: 'flex-basis',
            type: 'integer',
            units: ['px', '%', ''],
            unit: '',
            defaults: 'auto',
          }],
        }, {
          name: 'Align',
          property: 'align-self',
          type: 'radio',
          defaults: 'auto',
          list: [{
            value: 'auto',
            name: 'Auto',
          }, {
            value: 'flex-start',
            title: 'Start',
            className: 'icons-flex icon-al-start',
          }, {
            value: 'flex-end',
            title: 'End',
            className: 'icons-flex icon-al-end',
          }, {
            value: 'stretch',
            title: 'Stretch',
            className: 'icons-flex icon-al-str',
          }, {
            value: 'center',
            title: 'Center',
            className: 'icons-flex icon-al-center',
          }],
        }
      ]
    }, {
      name: config.textDimension,
      open: false,
      buildProps: ['width', 'height', 'min-width', 'max-width', 'min-height', 'max-height', 'overflow'],
      properties: [{
        //name: 'Alignment',
        property: 'overflow',
        type: 'radio',
        defaults: 'hidden',
        list: [{
            value: 'visible',
            title: 'visible',
            className: 'fa fa-eye'
          },
          {
            value: 'hidden',
            title: 'hidden',
            className: 'fa fa-eye-slash'
          },
          {
            value: 'scroll',
            title: 'scroll',
            className: 'fa fa-arrows-v'
          },
          {
            value: 'auto',
            name: 'Auto'
            //className: 'fa fa-align-justify'
          },
        ],
      }]
    }, {
      name: config.textPosition,
      open: false,
      buildProps: ['position', 'top', 'right', 'bottom', 'left']
    }, {
      name: config.textTypography,
      open: false,
      buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height',
        'text-align', 'vertical-align', 'text-decoration', 'font-style', 'text-shadow'
      ],
      properties: [{
        //name: 'Alignment',
        property: 'text-align',
        type: 'radio',
        defaults: 'left',
        list: [{
            value: 'left',
            className: 'fa fa-align-left'
          },
          {
            value: 'center',
            className: 'fa fa-align-center'
          },
          {
            value: 'right',
            className: 'fa fa-align-right'
          },
          {
            value: 'justify',
            className: 'fa fa-align-justify'
          },
        ],
      }, {
        property: 'text-decoration',
        type: 'radio',
        defaults: 'none',
        list: [{
            value: 'none',
            name: 'None',
            className: 'fa fa-times'
          },
          {
            value: 'underline',
            name: 'underline',
            className: 'fa fa-underline'
          },
          {
            value: 'line-through',
            name: 'Line-through',
            className: 'fa fa-strikethrough'
          },
          {
            value: 'overline',
            name: 'O'
          }
        ],
      }, {
        property: 'text-shadow',
        properties: [{
            name: 'X position',
            property: 'text-shadow-h'
          },
          {
            name: 'Y position',
            property: 'text-shadow-v'
          },
          {
            name: 'Blur',
            property: 'text-shadow-blur'
          },
          {
            name: 'Color',
            property: 'text-shadow-color'
          }
        ],
      }, {
        property: 'font-style',
        type: 'radio',
        defaults: 'normal',
        list: [{
            value: 'normal',
            name: 'Normal',
            className: 'fa fa-font'
          },
          {
            value: 'italic',
            name: 'Italic',
            className: 'fa fa-italic'
          }
        ],
      }, {
        property: 'vertical-align',
        type: 'select',
        defaults: 'baseline',
        list: [{
            value: 'baseline'
          },
          {
            value: 'length'
          },
          {
            value: 'sub'
          },
          {
            value: 'super'
          },
          {
            value: 'top'
          },
          {
            value: 'text-top'
          },
          {
            value: 'middle'
          },
          {
            value: 'bottom'
          },
          {
            value: 'text-bottom'
          },
        ],
      }, ]
    }, {
      name: config.textSpacing,
      open: false,
      buildProps: ['margin', 'padding'],
      properties: [{
        property: 'margin',
        properties: [{
            name: 'Top',
            property: 'margin-top'
          },
          {
            name: 'Left',
            property: 'margin-left'
          },
          {
            name: 'Right',
            property: 'margin-right'
          },
          {
            name: 'Bottom',
            property: 'margin-bottom'
          }
        ],
      }, {
        property: 'padding',
        properties: [{
            name: 'Top',
            property: 'padding-top'
          },
          {
            name: 'Left',
            property: 'padding-left'
          },
          {
            name: 'Right',
            property: 'padding-right'
          },
          {
            name: 'Bottom',
            property: 'padding-bottom'
          }
        ],
      }]
    }, {
      name: config.textBorders,
      open: false,
      buildProps: ['border-radius-c', 'border-radius', 'border'],
      properties: [{
        property: 'border-radius',
        properties: [{
            name: 'Top-left',
            property: 'border-top-left-radius'
          },
          {
            name: 'Top-right',
            property: 'border-top-right-radius'
          },
          {
            name: 'Bottom-left',
            property: 'border-bottom-left-radius'
          },
          {
            name: 'Bottom-right',
            property: 'border-bottom-right-radius'
          }
        ],
      }, ],
    }, {
      name: config.textDecorations,
      open: false,
      buildProps: ['cursor', 'background-color', 'opacity', 'box-shadow', 'background-bg'],
      properties: [{
        property: 'cursor',
        type: 'radio',
        defaults: 'auto',
        list: [{
            value: 'auto',
            className: 'fa fa-mouse-pointer'
            //name: 'Auto'
          },
          {
            value: 'pointer',
            className: 'fa fa-hand-pointer-o'
          },
          {
            value: 'copy',
            className: 'fa fa-files-o'
          },
          {
            value: 'crosshair',
            className: 'fa fa-plus'
          },
          {
            value: 'grab',
            className: 'fa fa-hand-paper-o'
          },
          {
            value: 'grabbing',
            className: 'fa fa-hand-grab-o'
          },
          {
            value: 'help',
            className: 'fa fa-question'
          },
          {
            value: 'move',
            className: 'fa fa-arrows'
          },
          {
            value: 'text',
            className: 'fa fa-i-cursor'
          },
        ],
      }, {
        type: 'slider',
        property: 'opacity',
        defaults: 1,
        step: 0.01,
        max: 1,
        min: 0,
      }, {
        property: 'box-shadow',
        properties: [{
            name: 'X position',
            property: 'box-shadow-h'
          },
          {
            name: 'Y position',
            property: 'box-shadow-v'
          },
          {
            name: 'Blur',
            property: 'box-shadow-blur'
          },
          {
            name: 'Spread',
            property: 'box-shadow-spread'
          },
          {
            name: 'Color',
            property: 'box-shadow-color'
          },
          {
            name: 'Shadow type',
            property: 'box-shadow-type'
          }
        ],
      }, {
        id: 'background-bg',
        property: 'background',
        type: 'bg',
      }, ]
    }, {
      name: config.textExtra,
      open: false,
      buildProps: ['transition', 'perspective', 'transform'],
      properties: [{
        property: 'transition',
        properties: [{
            name: 'Property',
            property: 'transition-property'
          },
          {
            name: 'Duration',
            property: 'transition-duration'
          },
          {
            name: 'Easing',
            property: 'transition-timing-function'
          }
        ],
      }, {
        property: 'transform',
        properties: [{
            name: 'Rotate X',
            property: 'transform-rotate-x'
          },
          {
            name: 'Rotate Y',
            property: 'transform-rotate-y'
          },
          {
            name: 'Rotate Z',
            property: 'transform-rotate-z'
          },
          {
            name: 'Scale X',
            property: 'transform-scale-x'
          },
          {
            name: 'Scale Y',
            property: 'transform-scale-y'
          },
          {
            name: 'Scale Z',
            property: 'transform-scale-z'
          }
        ],
      }]
    }
  ]);
}