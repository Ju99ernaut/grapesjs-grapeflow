import animSelect from './animationsSelect';

export default (editor, config) => {
  const sm = editor.StyleManager;
  const csm = config.customStyleManager;

  //Load opt select
  animSelect(editor, sm);

  sm.getSectors().reset(csm && csm.length ? csm : [{
      name: config.textLayout,
      open: false,
      buildProps: [ /*'alignment', */ 'display', 'float'],
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
            className: 'icons-flex icon-disp-block'
          },
          {
            value: 'inline',
            title: 'inline',
            className: 'icons-flex icon-disp-inline'
          },
          {
            value: 'inline-block',
            title: 'inline-block',
            className: 'icons-flex icon-disp-inline-block'
          },
          {
            value: 'flex',
            title: 'flex',
            className: 'icons-flex icon-disp-flex'
          }
        ],
      }, {
        property: 'visibility',
        type: 'radio',
        defaults: 'visible',
        list: [{
            value: 'visible',
            className: 'fa fa-eye'
          },
          {
            value: 'hidden',
            className: 'fa fa-eye-slash'
          }
        ],
      }],
    },
    {
      name: config.textFlex,
      open: false,
      buildProps: ['justify-content', 'align-items', 'align-content',
        'order', 'align-self'
      ],
      properties: [{
          name: 'Flex flow',
          property: 'flex-flow',
          type: 'composite',
          requires: {
            display: ['flex']
          },
          properties: [{
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
            name: 'Wrap',
            property: 'flex-wrap',
            type: 'radio',
            defaults: 'nowrap',
            list: [{
              value: 'nowrap',
              name: 'none',
              title: 'nowrap'
            }, {
              value: 'wrap',
              name: 'wrap'
            }, {
              value: 'wrap-reverse',
              name: 'reverse',
              title: 'wrap-reverse'
            }]
          }]
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
          name: 'Align items',
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
          name: 'Align content',
          property: 'align-content',
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
        }, // {
        //name: 'Flex Parent',
        //property: 'label-parent-flex',
        //type: 'integer',
        //},
        {
          name: 'Order',
          property: 'order',
          type: 'integer',
          defaults: 0,
          min: 0
        }, {
          name: 'Flex',
          property: 'flex',
          type: 'composite',
          requiresParent: {
            display: ['flex']
          },
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
          name: 'Align self',
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
      buildProps: ['width', 'height', 'min-width', 'max-width', 'min-height', 'max-height', 'overflow-x', 'overflow-y'],
      properties: [{
        //name: 'Alignment',
        property: 'overflow-x',
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
            className: 'fa fa-arrows-h'
          },
          {
            value: 'auto',
            name: 'Auto'
          },
        ],
      }, {
        property: 'overflow-y',
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
          },
        ],
      }]
    }, {
      name: config.textPosition,
      open: false,
      buildProps: ['position', 'top', 'left', 'right', 'bottom'],
      properties: [{
          name: ' ',
          property: 'top'
        },
        {
          name: ' ',
          property: 'left'
        },
        {
          name: ' ',
          property: 'right'
        },
        {
          name: ' ',
          property: 'bottom'
        }
      ],
    }, {
      name: config.textTypography,
      open: false,
      buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height',
        'text-align', 'vertical-align', 'text-decoration', 'font-style', 'text-shadow'
      ],
      properties: [{
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
            property: 'text-shadow-blur',
            type: 'slider',
            step: 1,
            max: 100,
            min: 0
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
        property: 'direction',
        type: 'radio',
        defaults: 'ltr',
        list: [{
            value: 'ltr',
            title: 'left-to-right',
            className: 'fa fa-long-arrow-right'
          },
          {
            value: 'rtl',
            name: 'right-to-left',
            className: 'fa fa-long-arrow-left'
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
            name: ' ',
            property: 'margin-top'
          },
          {
            name: ' ',
            property: 'margin-left'
          },
          {
            name: ' ',
            property: 'margin-right'
          },
          {
            name: ' ',
            property: 'margin-bottom'
          }
        ],
      }, {
        property: 'padding',
        properties: [{
            name: ' ',
            property: 'padding-top'
          },
          {
            name: ' ',
            property: 'padding-left'
          },
          {
            name: ' ',
            property: 'padding-right'
          },
          {
            name: ' ',
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
      }, {
        property: 'border-collapse',
        type: 'radio',
        defaults: 'collapse',
        list: [{
            name: 'Yes',
            value: 'collapse'
          },
          {
            name: 'No',
            value: 'separate'
          }
        ],
      }],
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
            property: 'box-shadow-blur',
            type: 'slider',
            step: 1,
            max: 100,
            min: 0
          },
          {
            name: 'Spread',
            property: 'box-shadow-spread',
            type: 'slider',
            step: 1,
            max: 100,
            min: 0
          },
          {
            name: 'Color',
            property: 'box-shadow-color'
          },
          {
            name: 'Shadow type',
            property: 'box-shadow-type',
            type: 'radio'
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
      buildProps: ['perspective', 'transform', 'transition'],
      properties: [{
        property: 'transition',
        properties: [{
            name: 'Property',
            property: 'transition-property'
          },
          {
            name: 'Easing',
            type: 'radio',
            property: 'transition-timing-function',
            list: [{
                value: 'linear',
                title: 'linear',
                className: 'icons-flex icon-linear'
              },
              {
                value: 'ease',
                title: 'ease',
                className: 'icons-flex icon-ease'
              },
              {
                value: 'ease-in',
                title: 'ease-in',
                className: 'icons-flex icon-ease-in'
              },
              {
                value: 'ease-out',
                title: 'ease-out',
                className: 'icons-flex icon-ease-out'
              },
              {
                value: 'ease-in-out',
                title: 'ease-in-out',
                className: 'icons-flex icon-ease-in-out'
              }
            ]
          },
          {
            name: 'Duration',
            type: 'slider',
            property: 'transition-duration',
            step: 1,
            min: 0,
            max: 100,
          },
          {
            name: 'Delay',
            units: ['s'],
            type: 'slider',
            defaults: 0,
            property: 'transition-delay',
            step: 1,
            min: 0,
            max: 100,
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
      }, {
        name: 'Animation',
        property: 'animation',
        type: 'stack',
        properties: [{
            name: 'Name',
            property: 'animation-name',
            type: 'animations-select',
            defaults: 'bounce',
          },
          {
            name: 'Duration',
            type: 'slider',
            property: 'animation-duration',
            defaults: 2,
            units: ['s'],
            step: 1,
            min: 0,
            max: 100,
          },
          {
            name: 'Easing',
            type: 'radio',
            property: 'animation-timing-function',
            list: [{
                value: 'linear',
                title: 'linear',
                className: 'icons-flex icon-linear'
              },
              {
                value: 'ease',
                title: 'ease',
                className: 'icons-flex icon-ease'
              },
              {
                value: 'ease-in',
                title: 'ease-in',
                className: 'icons-flex icon-ease-in'
              },
              {
                value: 'ease-out',
                title: 'ease-out',
                className: 'icons-flex icon-ease-out'
              },
              {
                value: 'ease-in-out',
                title: 'ease-in-out',
                className: 'icons-flex icon-ease-in-out'
              }
            ]
          },
          {
            name: 'Delay',
            units: ['s'],
            type: 'slider',
            defaults: 2,
            property: 'animation-delay',
            step: 1,
            min: 0,
            max: 100,
          },
          {
            name: 'Iteration',
            type: 'integer',
            defaults: 'infinite',
            fixedValues: ['infinite'],
            list: {
              value: 'infinite'
            },
            property: 'animation-iteration-count',
          },
          {
            name: 'Direction',
            type: 'select',
            defaults: 'normal',
            property: 'animation-direction',
            list: [{
                value: 'normal'
              },
              {
                value: 'reverse'
              },
              {
                value: 'alternate'
              },
              {
                value: 'alternate-reverse',
              }
            ]
          },
          {
            name: 'Fill',
            type: 'select',
            defaults: 'none',
            property: 'animation-fill-mode',
            list: [{
                value: 'none'
              },
              {
                value: 'forwards'
              },
              {
                value: 'backwards'
              },
              {
                value: 'both'
              }
            ]
          },
          {
            name: 'State',
            type: 'radio',
            defaults: 'running',
            property: 'animation-play-state',
            list: [{
                value: 'running',
                className: 'fa fa-play'
              },
              {
                value: 'paused',
                className: 'fa fa-pause'
              }
            ]
          }
        ],
      }]
    }
  ]);
}