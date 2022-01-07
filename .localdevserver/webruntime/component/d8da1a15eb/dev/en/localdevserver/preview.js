Webruntime.define('localdevserver/preview', ['lwc', 'webruntime_loader/loader', 'webruntime_navigation/navigation'], function (lwc, loader, navigation) { 'use strict';

    function stylesheet(hostSelector, shadowSelector, nativeShadow) {
      return ".header" + shadowSelector + " {border-bottom: 1px solid #dddbda;flex-wrap: wrap;}\n.header-buttons" + shadowSelector + " {margin-top: .75rem;white-space: nowrap;}\n.header-buttons" + shadowSelector + " .slds-button" + shadowSelector + " + .slds-button" + shadowSelector + " {margin-left: .75rem;}\n.component-name" + shadowSelector + " {font-weight: bold;}\n@media (min-width: 48em) {.header" + shadowSelector + " {flex-wrap: nowrap;}\n.header-buttons" + shadowSelector + " {margin-top: 0;}\n}.preview-content" + shadowSelector + " {background-color: #f3f2f2;min-height: 50vh;position: relative;}\n";
    }
    var _implicitStylesheets = [stylesheet];

    function stylesheet$1(hostSelector, shadowSelector, nativeShadow) {
      return "\n" + (nativeShadow ? (":host {display: block;margin-left: auto;margin-right: auto;padding-left: .5rem;padding-right: .5rem;max-width: 80rem;}") : (hostSelector + " {display: block;margin-left: auto;margin-right: auto;padding-left: .5rem;padding-right: .5rem;max-width: 80rem;}")) + "\n\n" + (nativeShadow ? (":host.main-content {margin-top: 1rem;padding-bottom: 3rem;}") : (hostSelector + ".main-content {margin-top: 1rem;padding-bottom: 3rem;}")) + "\n@media (min-width: 48em) {\n" + (nativeShadow ? (":host.main-content {margin-top: 3rem;}") : (hostSelector + ".main-content {margin-top: 3rem;}")) + "\n}";
    }
    var _implicitStylesheets$1 = [stylesheet$1];

    function tmpl($api, $cmp, $slotset, $ctx) {
      const {
        s: api_slot
      } = $api;
      return [api_slot("", {
        key: 0
      }, [], $slotset)];
    }

    var _tmpl = lwc.registerTemplate(tmpl);
    tmpl.slots = [""];
    tmpl.stylesheets = [];

    if (_implicitStylesheets$1) {
      tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets$1);
    }
    tmpl.stylesheetTokens = {
      hostAttribute: "localdevserver-layoutSection_layoutSection-host",
      shadowAttribute: "localdevserver-layoutSection_layoutSection"
    };

    /**
     * Used to enforce a consistent max-width and auto margins for
     * top-level layout sections.
     */

    class LayoutSection extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.mainContent = void 0;
      }

      connectedCallback() {
        if (this.mainContent) {
          this.classList.add('main-content');
        }
      }

    }

    lwc.registerDecorators(LayoutSection, {
      publicProps: {
        mainContent: {
          config: 0
        }
      }
    });

    var _localdevserverLayoutSection = lwc.registerComponent(LayoutSection, {
      tmpl: _tmpl
    });

    function stylesheet$2(hostSelector, shadowSelector, nativeShadow) {
      return "\n" + (nativeShadow ? (":host {display: block;}") : (hostSelector + " {display: block;}")) + "\ndiv.slds-breadcrumb" + shadowSelector + " {list-style: none;}\n";
    }
    var _implicitStylesheets$2 = [stylesheet$2];

    function tmpl$1($api, $cmp, $slotset, $ctx) {
      const {
        s: api_slot,
        h: api_element
      } = $api;
      return [api_element("div", {
        classMap: {
          "slds-breadcrumb": true,
          "slds-list_horizontal": true,
          "slds-wrap": true
        },
        attrs: {
          "role": "list"
        },
        key: 1
      }, [api_slot("", {
        key: 0
      }, [], $slotset)])];
    }

    var _tmpl$1 = lwc.registerTemplate(tmpl$1);
    tmpl$1.slots = [""];
    tmpl$1.stylesheets = [];

    if (_implicitStylesheets$2) {
      tmpl$1.stylesheets.push.apply(tmpl$1.stylesheets, _implicitStylesheets$2);
    }
    tmpl$1.stylesheetTokens = {
      hostAttribute: "lightning-breadcrumbs_breadcrumbs-host",
      shadowAttribute: "lightning-breadcrumbs_breadcrumbs"
    };

    /**
     * A hierarchy path of the page you're currently visiting within the website or app.
     * @slot default Placeholder for lightning-breadcrumb
     */

    class LightningBreadcrumbs extends lwc.LightningElement {
      connectedCallback() {
        this.setAttribute('aria-label', 'Breadcrumbs');
        this.setAttribute('role', 'navigation');
      }

    }

    var _lightningBreadcrumbs = lwc.registerComponent(LightningBreadcrumbs, {
      tmpl: _tmpl$1
    });

    function stylesheet$3(hostSelector, shadowSelector, nativeShadow) {
      return "\n" + (nativeShadow ? (":host {display: list-item;}") : (hostSelector + " {display: list-item;}")) + "\n";
    }
    var _implicitStylesheets$3 = [stylesheet$3];

    function tmpl$2($api, $cmp, $slotset, $ctx) {
      const {
        d: api_dynamic,
        b: api_bind,
        h: api_element
      } = $api;
      const {
        _m0
      } = $ctx;
      return [api_element("a", {
        attrs: {
          "href": $cmp.computedHref
        },
        key: 0,
        on: {
          "click": _m0 || ($ctx._m0 = api_bind($cmp.handleClick))
        }
      }, [api_dynamic($cmp.label)])];
    }

    var _tmpl$2 = lwc.registerTemplate(tmpl$2);
    tmpl$2.stylesheets = [];

    if (_implicitStylesheets$3) {
      tmpl$2.stylesheets.push.apply(tmpl$2.stylesheets, _implicitStylesheets$3);
    }
    tmpl$2.stylesheetTokens = {
      hostAttribute: "lightning-breadcrumb_breadcrumb-host",
      shadowAttribute: "lightning-breadcrumb_breadcrumb"
    };

    const DEFAULT_HREF = '#';
    /**
     * An item in the hierarchy path of the page the user is on.
     */

    class LightningBreadcrumb extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.href = void 0;
        this.label = void 0;
        this.name = void 0;
      }

      get computedHref() {
        return this.href || DEFAULT_HREF;
      }
      /**
       * Sets focus on the link.
       */


      focus() {
        if (this.connected) {
          this.linkElement.focus();
        }
      }
      /**
       * Unset the focus on the link
       */


      blur() {
        if (this.connected) {
          this.linkElement.blur();
        }
      }

      get linkElement() {
        return this.template.querySelector('a');
      }
      /**
       * if href was empty, prevent default to avoid adding # to URL
       * @param e
       */


      handleClick(e) {
        if (!this.href) {
          e.preventDefault();
        }
      }

      connectedCallback() {
        this.connected = true; // add default CSS classes to custom element tag

        this.classList.add('slds-breadcrumb__item');
        this.setAttribute('role', 'listitem');
      }

      disconnectedCallback() {
        this.connected = false;
      }

    }

    lwc.registerDecorators(LightningBreadcrumb, {
      publicProps: {
        href: {
          config: 0
        },
        label: {
          config: 0
        },
        name: {
          config: 0
        }
      },
      publicMethods: ["focus", "blur"]
    });

    var _lightningBreadcrumb = lwc.registerComponent(LightningBreadcrumb, {
      tmpl: _tmpl$2
    });

    function tmpl$3($api, $cmp, $slotset, $ctx) {
      const {
        d: api_dynamic,
        h: api_element
      } = $api;
      return [api_element("div", {
        className: $cmp.computedClass,
        attrs: {
          "role": "status"
        },
        key: 3
      }, [$cmp.validAlternativeText ? api_element("span", {
        classMap: {
          "slds-assistive-text": true
        },
        key: 0
      }, [api_dynamic($cmp.alternativeText)]) : null, api_element("div", {
        classMap: {
          "slds-spinner__dot-a": true
        },
        key: 1
      }, []), api_element("div", {
        classMap: {
          "slds-spinner__dot-b": true
        },
        key: 2
      }, [])])];
    }

    var _tmpl$3 = lwc.registerTemplate(tmpl$3);
    tmpl$3.stylesheets = [];
    tmpl$3.stylesheetTokens = {
      hostAttribute: "lightning-spinner_spinner-host",
      shadowAttribute: "lightning-spinner_spinner"
    };

    const proto = {
      add(className) {
        if (typeof className === 'string') {
          this[className] = true;
        } else {
          Object.assign(this, className);
        }

        return this;
      },

      invert() {
        Object.keys(this).forEach(key => {
          this[key] = !this[key];
        });
        return this;
      },

      toString() {
        return Object.keys(this).filter(key => this[key]).join(' ');
      }

    };
    function classSet(config) {
      if (typeof config === 'string') {
        const key = config;
        config = {};
        config[key] = true;
      }

      return Object.assign(Object.create(proto), config);
    }

    /**
    A string normalization utility for attributes.
    @param {String} value - The value to normalize.
    @param {Object} config - The optional configuration object.
    @param {String} [config.fallbackValue] - The optional fallback value to use if the given value is not provided or invalid. Defaults to an empty string.
    @param {Array} [config.validValues] - An optional array of valid values. Assumes all input is valid if not provided.
    @return {String} - The normalized value.
    **/
    function normalizeString(value, config = {}) {
      const {
        fallbackValue = '',
        validValues,
        toLowerCase = true
      } = config;
      let normalized = typeof value === 'string' && value.trim() || '';
      normalized = toLowerCase ? normalized.toLowerCase() : normalized;

      if (validValues && validValues.indexOf(normalized) === -1) {
        normalized = fallbackValue;
      }

      return normalized;
    }

    const isIE11 = isIE11Test(navigator);
    const isChrome = isChromeTest(navigator);
    const isSafari = isSafariTest(navigator); // The following functions are for tests only

    function isIE11Test(navigator) {
      // https://stackoverflow.com/questions/17447373/how-can-i-target-only-internet-explorer-11-with-javascript
      return /Trident.*rv[ :]*11\./.test(navigator.userAgent);
    }
    function isChromeTest(navigator) {
      // https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome
      return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    }
    function isSafariTest(navigator) {
      // via https://stackoverflow.com/questions/49872111/detect-safari-and-stop-script
      return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    }

    /**
     * Displays an animated spinner.
     */

    class LightningSpinner extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.alternativeText = void 0;
        this.size = 'medium';
        this.variant = void 0;
      }

      connectedCallback() {
        this.classList.add('slds-spinner_container');
        this.template.addEventListener('mousewheel', this.stopScrolling);
        this.template.addEventListener('touchmove', this.stopScrolling);
      }

      get normalizedVariant() {
        return normalizeString(this.variant, {
          fallbackValue: 'base',
          validValues: ['base', 'brand', 'inverse']
        });
      }

      get normalizedSize() {
        return normalizeString(this.size, {
          fallbackValue: 'medium',
          validValues: ['small', 'medium', 'large']
        });
      }

      get computedClass() {
        const {
          normalizedVariant,
          normalizedSize
        } = this;
        const classes = classSet('slds-spinner'); // add variant-specific class

        if (normalizedVariant !== 'base') {
          classes.add(`slds-spinner_${normalizedVariant}`);
        } // add size-specific class


        classes.add(`slds-spinner_${normalizedSize}`);
        return classes.toString();
      } // alternativeText validation


      get validAlternativeText() {
        const hasAlternativeText = !!this.alternativeText; // if we have an empty value output a console warning

        if (!hasAlternativeText) {
          // eslint-disable-next-line no-console
          console.warn(`<lightning-spinner> The alternativeText attribute should not be empty. Please add a description of what is causing the wait.`);
        }

        return hasAlternativeText;
      } // prevent scrolling


      stopScrolling(event) {
        event.preventDefault();
      }

    }

    lwc.registerDecorators(LightningSpinner, {
      publicProps: {
        alternativeText: {
          config: 0
        },
        size: {
          config: 0
        },
        variant: {
          config: 0
        }
      }
    });

    var _lightningSpinner = lwc.registerComponent(LightningSpinner, {
      tmpl: _tmpl$3
    });

    function stylesheet$4(hostSelector, shadowSelector, nativeShadow) {
      return "h1" + shadowSelector + " {font-size: 24pt;color: #C23934;}\nh2" + shadowSelector + " {color: #16325C;}\n.error-image" + shadowSelector + " {padding-top: 32px;padding-bottom: 24px;}\n.error-message" + shadowSelector + " {padding-bottom: 28px}\n.error-location" + shadowSelector + " {padding-bottom: 24px;}\n.error-code" + shadowSelector + " {padding-bottom: 12px;}\n.view-compiled" + shadowSelector + " {padding-bottom: 32px;color: #16325C;}\n.info-note" + shadowSelector + " {margin-top: 82px;font-size: 13pt;background-color: #F4F6F9;padding: 16px 20px;border-radius: 8px;margin-bottom: 80px;color: #16325C;}\n";
    }
    var _implicitStylesheets$4 = [stylesheet$4];

    function stylesheet$5(hostSelector, shadowSelector, nativeShadow) {
      return "code[class*='language-']" + shadowSelector + ",pre[class*='language-']" + shadowSelector + " {color: black;background: none;text-shadow: 0 1px white;font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;font-size: 1em;text-align: left;white-space: pre;word-spacing: normal;word-break: normal;word-wrap: normal;line-height: 1.5;-moz-tab-size: 4;-o-tab-size: 4;tab-size: 4;-webkit-hyphens: none;-moz-hyphens: none;-ms-hyphens: none;hyphens: none;}\npre[class*='language-']" + shadowSelector + "::-moz-selection,pre[class*='language-']" + shadowSelector + " " + shadowSelector + "::-moz-selection,code[class*='language-']" + shadowSelector + "::-moz-selection,code[class*='language-']" + shadowSelector + " " + shadowSelector + "::-moz-selection {text-shadow: none;background: #b3d4fc;}\npre[class*='language-']" + shadowSelector + "::selection,pre[class*='language-']" + shadowSelector + " " + shadowSelector + "::selection,code[class*='language-']" + shadowSelector + "::selection,code[class*='language-']" + shadowSelector + " " + shadowSelector + "::selection {text-shadow: none;background: #b3d4fc;}\n@media print {code[class*='language-']" + shadowSelector + ", pre[class*='language-']" + shadowSelector + " {text-shadow: none;}\n}pre[class*='language-']" + shadowSelector + " {padding: 1em;margin: 0.5em 0;overflow: auto;}\n:not(pre)" + shadowSelector + " > code[class*='language-']" + shadowSelector + ",pre[class*='language-']" + shadowSelector + " {background: #f5f2f0;}\n:not(pre)" + shadowSelector + " > code[class*='language-']" + shadowSelector + " {padding: 0.1em;border-radius: 0.3em;white-space: normal;}\n.token.comment" + shadowSelector + ",.token.prolog" + shadowSelector + ",.token.doctype" + shadowSelector + ",.token.cdata" + shadowSelector + " {color: slategray;}\n.token.punctuation" + shadowSelector + " {color: #999;}\n.namespace" + shadowSelector + " {opacity: 0.7;}\n.token.property" + shadowSelector + ",.token.tag" + shadowSelector + ",.token.boolean" + shadowSelector + ",.token.number" + shadowSelector + ",.token.constant" + shadowSelector + ",.token.symbol" + shadowSelector + ",.token.deleted" + shadowSelector + " {color: #905;}\n.token.selector" + shadowSelector + ",.token.attr-name" + shadowSelector + ",.token.string" + shadowSelector + ",.token.char" + shadowSelector + ",.token.builtin" + shadowSelector + ",.token.inserted" + shadowSelector + " {color: #690;}\n.token.operator" + shadowSelector + ",.token.entity" + shadowSelector + ",.token.url" + shadowSelector + ",.language-css" + shadowSelector + " .token.string" + shadowSelector + ",.style" + shadowSelector + " .token.string" + shadowSelector + " {color: #9a6e3a;background: hsla(0, 0%, 100%, 0.5);}\n.token.atrule" + shadowSelector + ",.token.attr-value" + shadowSelector + ",.token.keyword" + shadowSelector + " {color: #07a;}\n.token.function" + shadowSelector + ",.token.class-name" + shadowSelector + " {color: #dd4a68;}\n.token.regex" + shadowSelector + ",.token.important" + shadowSelector + ",.token.variable" + shadowSelector + " {color: #e90;}\n.token.important" + shadowSelector + ",.token.bold" + shadowSelector + " {font-weight: bold;}\n.token.italic" + shadowSelector + " {font-style: italic;}\n.token.entity" + shadowSelector + " {cursor: help;}\npre[data-line]" + shadowSelector + " {position: relative;padding: 1em 0 1em 3em;}\n.line-highlight" + shadowSelector + " {position: absolute;left: 0;right: 0;padding: inherit 0;margin-top: 1em;background: hsla(24, 20%, 50%, 0.08);background: linear-gradient(\n        to right,\n        hsla(24, 20%, 50%, 0.1) 70%,\n        hsla(24, 20%, 50%, 0)\n    );pointer-events: none;line-height: inherit;white-space: pre;}\n.line-highlight" + shadowSelector + ":before,.line-highlight[data-end]" + shadowSelector + ":after {content: attr(data-start);position: absolute;top: 0.4em;left: 0.6em;min-width: 1em;padding: 0 0.5em;background-color: hsla(24, 20%, 50%, 0.4);color: hsl(24, 20%, 95%);font: bold 65%/1.5 sans-serif;text-align: center;vertical-align: 0.3em;border-radius: 999px;text-shadow: none;box-shadow: 0 1px white;}\n.line-highlight[data-end]" + shadowSelector + ":after {content: attr(data-end);top: auto;bottom: 0.4em;}\ncode[class*='language-']" + shadowSelector + ",pre[class*='language-']" + shadowSelector + " {color: #000814;font-family: 'Consolas', 'Bitstream Vera Sans Mono', Courier, monospace;direction: ltr;text-align: left;white-space: pre;word-spacing: normal;word-break: normal;line-height: 1.2em;-moz-tab-size: 4;-o-tab-size: 4;tab-size: 4;-webkit-hyphens: none;-moz-hyphens: none;-ms-hyphens: none;hyphens: none;}\npre[class*='language-']" + shadowSelector + "::-moz-selection,pre[class*='language-']" + shadowSelector + " " + shadowSelector + "::-moz-selection,code[class*='language-']" + shadowSelector + "::-moz-selection,code[class*='language-']" + shadowSelector + " " + shadowSelector + "::-moz-selection {background: #c1def1;}\npre[class*='language-']" + shadowSelector + "::selection,pre[class*='language-']" + shadowSelector + " " + shadowSelector + "::selection,code[class*='language-']" + shadowSelector + "::selection,code[class*='language-']" + shadowSelector + " " + shadowSelector + "::selection {background: #c1def1;}\npre[class*='language-']" + shadowSelector + " {padding: 1em;margin: 0.5em 0;overflow: auto;-ms-overflow-style: -ms-autohiding-scrollbar;border: 1px solid #dddddd;background-color: white;border-radius: 8px;}\n:not(pre)" + shadowSelector + " > code[class*='language-']" + shadowSelector + " {padding: 0.2em;padding-top: 1px;padding-bottom: 1px;background: #f8f8f8;border: 1px solid #dddddd;}\n.token.comment" + shadowSelector + ",.token.prolog" + shadowSelector + ",.token.doctype" + shadowSelector + ",.token.cdata" + shadowSelector + " {color: #667f3a;font-style: italic;}\n.token.namespace" + shadowSelector + " {opacity: 0.9;}\n.token.string" + shadowSelector + " {color: #a31515;}\n.token.punctuation" + shadowSelector + ",.token.operator" + shadowSelector + " {color: #000814;}\n.token.url" + shadowSelector + ",.token.symbol" + shadowSelector + ",.token.number" + shadowSelector + ",.token.boolean" + shadowSelector + ",.token.variable" + shadowSelector + ",.token.constant" + shadowSelector + ",.token.inserted" + shadowSelector + " {color: #36acaa;}\n.token.atrule" + shadowSelector + ",.token.keyword" + shadowSelector + ",.token.attr-value" + shadowSelector + ",.language-autohotkey" + shadowSelector + " .token.selector" + shadowSelector + ",.language-json" + shadowSelector + " .token.boolean" + shadowSelector + ",.language-json" + shadowSelector + " .token.number" + shadowSelector + ",code[class*='language-css']" + shadowSelector + " {color: #00674d;}\n.token.function" + shadowSelector + " {color: #be2f7e;}\n.token.deleted" + shadowSelector + ",.language-autohotkey" + shadowSelector + " .token.tag" + shadowSelector + " {color: #9a050f;}\n.token.selector" + shadowSelector + ",.language-autohotkey" + shadowSelector + " .token.keyword" + shadowSelector + " {color: #00009f;}\n.token.important" + shadowSelector + ",.token.bold" + shadowSelector + " {font-weight: bold;}\n.token.italic" + shadowSelector + " {font-style: italic;}\n.token.class-name" + shadowSelector + ",.language-json" + shadowSelector + " .token.property" + shadowSelector + " {color: #207db6;}\n.token.tag" + shadowSelector + ",.token.selector" + shadowSelector + " {color: #043b7e;}\n.token.attr-name" + shadowSelector + ",.token.property" + shadowSelector + ",.token.regex" + shadowSelector + ",.token.entity" + shadowSelector + " {color: #c42a00;}\n.token.directive.tag" + shadowSelector + " .tag" + shadowSelector + " {background: #ffff00;color: #000814;}\n";
    }
    var _implicitStylesheets$5 = [stylesheet$5];

    function tmpl$4($api, $cmp, $slotset, $ctx) {
      const {
        h: api_element
      } = $api;
      return [api_element("div", {
        context: {
          lwc: {
            dom: "manual"
          }
        },
        key: 0
      }, [])];
    }

    var _tmpl$4 = lwc.registerTemplate(tmpl$4);
    tmpl$4.stylesheets = [];

    if (_implicitStylesheets$5) {
      tmpl$4.stylesheets.push.apply(tmpl$4.stylesheets, _implicitStylesheets$5);
    }
    tmpl$4.stylesheetTokens = {
      hostAttribute: "localdevserver-codeHighlighter_codeHighlighter-host",
      shadowAttribute: "localdevserver-codeHighlighter_codeHighlighter"
    };

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var prismjs = createCommonjsModule(function (module) {
    /* PrismJS 1.16.0
    https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript&plugins=line-highlight+line-numbers */
    var _self = typeof window !== 'undefined' ? window // if in browser
    : typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self // if in worker
    : {}; // if in node js

    /**
     * Prism: Lightweight, robust, elegant syntax highlighting
     * MIT license http://www.opensource.org/licenses/mit-license.php/
     * @author Lea Verou http://lea.verou.me
     */


    var Prism = function (_self) {
      // Private helper vars
      var lang = /\blang(?:uage)?-([\w-]+)\b/i;
      var uniqueId = 0;
      var _ = {
        manual: _self.Prism && _self.Prism.manual,
        disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
        util: {
          encode: function (tokens) {
            if (tokens instanceof Token) {
              return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
            } else if (Array.isArray(tokens)) {
              return tokens.map(_.util.encode);
            } else {
              return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
            }
          },
          type: function (o) {
            return Object.prototype.toString.call(o).slice(8, -1);
          },
          objId: function (obj) {
            if (!obj['__id']) {
              Object.defineProperty(obj, '__id', {
                value: ++uniqueId
              });
            }

            return obj['__id'];
          },
          // Deep clone a language definition (e.g. to extend it)
          clone: function deepClone(o, visited) {
            var clone,
                id,
                type = _.util.type(o);

            visited = visited || {};

            switch (type) {
              case 'Object':
                id = _.util.objId(o);

                if (visited[id]) {
                  return visited[id];
                }

                clone = {};
                visited[id] = clone;

                for (var key in o) {
                  if (o.hasOwnProperty(key)) {
                    clone[key] = deepClone(o[key], visited);
                  }
                }

                return clone;

              case 'Array':
                id = _.util.objId(o);

                if (visited[id]) {
                  return visited[id];
                }

                clone = [];
                visited[id] = clone;
                o.forEach(function (v, i) {
                  clone[i] = deepClone(v, visited);
                });
                return clone;

              default:
                return o;
            }
          }
        },
        languages: {
          extend: function (id, redef) {
            var lang = _.util.clone(_.languages[id]);

            for (var key in redef) {
              lang[key] = redef[key];
            }

            return lang;
          },

          /**
           * Insert a token before another token in a language literal
           * As this needs to recreate the object (we cannot actually insert before keys in object literals),
           * we cannot just provide an object, we need an object and a key.
           * @param inside The key (or language id) of the parent
           * @param before The key to insert before.
           * @param insert Object with the key/value pairs to insert
           * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
           */
          insertBefore: function (inside, before, insert, root) {
            root = root || _.languages;
            var grammar = root[inside];
            var ret = {};

            for (var token in grammar) {
              if (grammar.hasOwnProperty(token)) {
                if (token == before) {
                  for (var newToken in insert) {
                    if (insert.hasOwnProperty(newToken)) {
                      ret[newToken] = insert[newToken];
                    }
                  }
                } // Do not insert token which also occur in insert. See #1525


                if (!insert.hasOwnProperty(token)) {
                  ret[token] = grammar[token];
                }
              }
            }

            var old = root[inside];
            root[inside] = ret; // Update references in other language definitions

            _.languages.DFS(_.languages, function (key, value) {
              if (value === old && key != inside) {
                this[key] = ret;
              }
            });

            return ret;
          },
          // Traverse a language definition with Depth First Search
          DFS: function DFS(o, callback, type, visited) {
            visited = visited || {};
            var objId = _.util.objId;

            for (var i in o) {
              if (o.hasOwnProperty(i)) {
                callback.call(o, i, o[i], type || i);

                var property = o[i],
                    propertyType = _.util.type(property);

                if (propertyType === 'Object' && !visited[objId(property)]) {
                  visited[objId(property)] = true;
                  DFS(property, callback, null, visited);
                } else if (propertyType === 'Array' && !visited[objId(property)]) {
                  visited[objId(property)] = true;
                  DFS(property, callback, i, visited);
                }
              }
            }
          }
        },
        plugins: {},
        highlightAll: function (async, callback) {
          _.highlightAllUnder(document, async, callback);
        },
        highlightAllUnder: function (container, async, callback) {
          var env = {
            callback: callback,
            selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
          };

          _.hooks.run('before-highlightall', env);

          var elements = env.elements || container.querySelectorAll(env.selector);

          for (var i = 0, element; element = elements[i++];) {
            _.highlightElement(element, async === true, env.callback);
          }
        },
        highlightElement: function (element, async, callback) {
          // Find language
          var language = 'none',
              grammar,
              parent = element;

          while (parent && !lang.test(parent.className)) {
            parent = parent.parentNode;
          }

          if (parent) {
            language = (parent.className.match(lang) || [, 'none'])[1].toLowerCase();
            grammar = _.languages[language];
          } // Set language on the element, if not present


          element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

          if (element.parentNode) {
            // Set language on the parent, for styling
            parent = element.parentNode;

            if (/pre/i.test(parent.nodeName)) {
              parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
            }
          }

          var code = element.textContent;
          var env = {
            element: element,
            language: language,
            grammar: grammar,
            code: code
          };

          var insertHighlightedCode = function (highlightedCode) {
            env.highlightedCode = highlightedCode;

            _.hooks.run('before-insert', env);

            env.element.innerHTML = env.highlightedCode;

            _.hooks.run('after-highlight', env);

            _.hooks.run('complete', env);

            callback && callback.call(env.element);
          };

          _.hooks.run('before-sanity-check', env);

          if (!env.code) {
            _.hooks.run('complete', env);

            return;
          }

          _.hooks.run('before-highlight', env);

          if (!env.grammar) {
            insertHighlightedCode(_.util.encode(env.code));
            return;
          }

          if (async && _self.Worker) {
            var worker = new Worker(_.filename);

            worker.onmessage = function (evt) {
              insertHighlightedCode(evt.data);
            };

            worker.postMessage(JSON.stringify({
              language: env.language,
              code: env.code,
              immediateClose: true
            }));
          } else {
            insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
          }
        },
        highlight: function (text, grammar, language) {
          var env = {
            code: text,
            grammar: grammar,
            language: language
          };

          _.hooks.run('before-tokenize', env);

          env.tokens = _.tokenize(env.code, env.grammar);

          _.hooks.run('after-tokenize', env);

          return Token.stringify(_.util.encode(env.tokens), env.language);
        },
        matchGrammar: function (text, strarr, grammar, index, startPos, oneshot, target) {
          for (var token in grammar) {
            if (!grammar.hasOwnProperty(token) || !grammar[token]) {
              continue;
            }

            if (token == target) {
              return;
            }

            var patterns = grammar[token];
            patterns = _.util.type(patterns) === 'Array' ? patterns : [patterns];

            for (var j = 0; j < patterns.length; ++j) {
              var pattern = patterns[j],
                  inside = pattern.inside,
                  lookbehind = !!pattern.lookbehind,
                  greedy = !!pattern.greedy,
                  lookbehindLength = 0,
                  alias = pattern.alias;

              if (greedy && !pattern.pattern.global) {
                // Without the global flag, lastIndex won't work
                var flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
                pattern.pattern = RegExp(pattern.pattern.source, flags + 'g');
              }

              pattern = pattern.pattern || pattern; // Don’t cache length as it changes during the loop

              for (var i = index, pos = startPos; i < strarr.length; pos += strarr[i].length, ++i) {
                var str = strarr[i];

                if (strarr.length > text.length) {
                  // Something went terribly wrong, ABORT, ABORT!
                  return;
                }

                if (str instanceof Token) {
                  continue;
                }

                if (greedy && i != strarr.length - 1) {
                  pattern.lastIndex = pos;
                  var match = pattern.exec(text);

                  if (!match) {
                    break;
                  }

                  var from = match.index + (lookbehind ? match[1].length : 0),
                      to = match.index + match[0].length,
                      k = i,
                      p = pos;

                  for (var len = strarr.length; k < len && (p < to || !strarr[k].type && !strarr[k - 1].greedy); ++k) {
                    p += strarr[k].length; // Move the index i to the element in strarr that is closest to from

                    if (from >= p) {
                      ++i;
                      pos = p;
                    }
                  } // If strarr[i] is a Token, then the match starts inside another Token, which is invalid


                  if (strarr[i] instanceof Token) {
                    continue;
                  } // Number of tokens to delete and replace with the new match


                  delNum = k - i;
                  str = text.slice(pos, p);
                  match.index -= pos;
                } else {
                  pattern.lastIndex = 0;
                  var match = pattern.exec(str),
                      delNum = 1;
                }

                if (!match) {
                  if (oneshot) {
                    break;
                  }

                  continue;
                }

                if (lookbehind) {
                  lookbehindLength = match[1] ? match[1].length : 0;
                }

                var from = match.index + lookbehindLength,
                    match = match[0].slice(lookbehindLength),
                    to = from + match.length,
                    before = str.slice(0, from),
                    after = str.slice(to);
                var args = [i, delNum];

                if (before) {
                  ++i;
                  pos += before.length;
                  args.push(before);
                }

                var wrapped = new Token(token, inside ? _.tokenize(match, inside) : match, alias, match, greedy);
                args.push(wrapped);

                if (after) {
                  args.push(after);
                }

                Array.prototype.splice.apply(strarr, args);
                if (delNum != 1) _.matchGrammar(text, strarr, grammar, i, pos, true, token);
                if (oneshot) break;
              }
            }
          }
        },
        tokenize: function (text, grammar) {
          var strarr = [text];
          var rest = grammar.rest;

          if (rest) {
            for (var token in rest) {
              grammar[token] = rest[token];
            }

            delete grammar.rest;
          }

          _.matchGrammar(text, strarr, grammar, 0, 0, false);

          return strarr;
        },
        hooks: {
          all: {},
          add: function (name, callback) {
            var hooks = _.hooks.all;
            hooks[name] = hooks[name] || [];
            hooks[name].push(callback);
          },
          run: function (name, env) {
            var callbacks = _.hooks.all[name];

            if (!callbacks || !callbacks.length) {
              return;
            }

            for (var i = 0, callback; callback = callbacks[i++];) {
              callback(env);
            }
          }
        },
        Token: Token
      };
      _self.Prism = _;

      function Token(type, content, alias, matchedStr, greedy) {
        this.type = type;
        this.content = content;
        this.alias = alias; // Copy of the full string this token was created from

        this.length = (matchedStr || '').length | 0;
        this.greedy = !!greedy;
      }

      Token.stringify = function (o, language) {
        if (typeof o == 'string') {
          return o;
        }

        if (Array.isArray(o)) {
          return o.map(function (element) {
            return Token.stringify(element, language);
          }).join('');
        }

        var env = {
          type: o.type,
          content: Token.stringify(o.content, language),
          tag: 'span',
          classes: ['token', o.type],
          attributes: {},
          language: language
        };

        if (o.alias) {
          var aliases = Array.isArray(o.alias) ? o.alias : [o.alias];
          Array.prototype.push.apply(env.classes, aliases);
        }

        _.hooks.run('wrap', env);

        var attributes = Object.keys(env.attributes).map(function (name) {
          return name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
        }).join(' ');
        return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + (attributes ? ' ' + attributes : '') + '>' + env.content + '</' + env.tag + '>';
      };

      if (!_self.document) {
        if (!_self.addEventListener) {
          // in Node.js
          return _;
        }

        if (!_.disableWorkerMessageHandler) {
          // In worker
          _self.addEventListener('message', function (evt) {
            var message = JSON.parse(evt.data),
                lang = message.language,
                code = message.code,
                immediateClose = message.immediateClose;

            _self.postMessage(_.highlight(code, _.languages[lang], lang));

            if (immediateClose) {
              _self.close();
            }
          }, false);
        }

        return _;
      } //Get current script and highlight


      var script = document.currentScript || [].slice.call(document.getElementsByTagName('script')).pop();

      if (script) {
        _.filename = script.src;

        if (!_.manual && !script.hasAttribute('data-manual')) {
          if (document.readyState !== 'loading') {
            if (window.requestAnimationFrame) {
              window.requestAnimationFrame(_.highlightAll);
            } else {
              window.setTimeout(_.highlightAll, 16);
            }
          } else {
            document.addEventListener('DOMContentLoaded', _.highlightAll);
          }
        }
      }

      return _;
    }(_self);

    if ( module.exports) {
      module.exports = Prism;
    } // hack for components to work correctly in node.js


    if (typeof commonjsGlobal !== 'undefined') {
      commonjsGlobal.Prism = Prism;
    }

    Prism.languages.markup = {
      comment: /<!--[\s\S]*?-->/,
      prolog: /<\?[\s\S]+?\?>/,
      doctype: /<!DOCTYPE[\s\S]+?>/i,
      cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
      tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,
        greedy: true,
        inside: {
          tag: {
            pattern: /^<\/?[^\s>\/]+/i,
            inside: {
              punctuation: /^<\/?/,
              namespace: /^[^\s>\/:]+:/
            }
          },
          'attr-value': {
            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
            inside: {
              punctuation: [/^=/, {
                pattern: /^(\s*)["']|["']$/,
                lookbehind: true
              }]
            }
          },
          punctuation: /\/?>/,
          'attr-name': {
            pattern: /[^\s>\/]+/,
            inside: {
              namespace: /^[^\s>\/:]+:/
            }
          }
        }
      },
      entity: /&#?[\da-z]{1,8};/i
    };
    Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] = Prism.languages.markup['entity']; // Plugin to make entity title show the real entity, idea by Roman Komarov

    Prism.hooks.add('wrap', function (env) {
      if (env.type === 'entity') {
        env.attributes['title'] = env.content.replace(/&amp;/, '&');
      }
    });
    Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
      /**
       * Adds an inlined language to markup.
       *
       * An example of an inlined language is CSS with `<style>` tags.
       *
       * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
       * case insensitive.
       * @param {string} lang The language key.
       * @example
       * addInlined('style', 'css');
       */
      value: function addInlined(tagName, lang) {
        var includedCdataInside = {};
        includedCdataInside['language-' + lang] = {
          pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
          lookbehind: true,
          inside: Prism.languages[lang]
        };
        includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;
        var inside = {
          'included-cdata': {
            pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
            inside: includedCdataInside
          }
        };
        inside['language-' + lang] = {
          pattern: /[\s\S]+/,
          inside: Prism.languages[lang]
        };
        var def = {};
        def[tagName] = {
          pattern: RegExp(/(<__[\s\S]*?>)(?:<!\[CDATA\[[\s\S]*?\]\]>\s*|[\s\S])*?(?=<\/__>)/.source.replace(/__/g, tagName), 'i'),
          lookbehind: true,
          greedy: true,
          inside: inside
        };
        Prism.languages.insertBefore('markup', 'cdata', def);
      }
    });
    Prism.languages.xml = Prism.languages.extend('markup', {});
    Prism.languages.html = Prism.languages.markup;
    Prism.languages.mathml = Prism.languages.markup;
    Prism.languages.svg = Prism.languages.markup;

    (function (Prism) {
      var string = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
      Prism.languages.css = {
        comment: /\/\*[\s\S]*?\*\//,
        atrule: {
          pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
          inside: {
            rule: /@[\w-]+/ // See rest below

          }
        },
        url: RegExp('url\\((?:' + string.source + '|.*?)\\)', 'i'),
        selector: RegExp('[^{}\\s](?:[^{};"\']|' + string.source + ')*?(?=\\s*\\{)'),
        string: {
          pattern: string,
          greedy: true
        },
        property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
        important: /!important\b/i,
        function: /[-a-z0-9]+(?=\()/i,
        punctuation: /[(){};:,]/
      };
      Prism.languages.css['atrule'].inside.rest = Prism.languages.css;
      var markup = Prism.languages.markup;

      if (markup) {
        markup.tag.addInlined('style', 'css');
        Prism.languages.insertBefore('inside', 'attr-value', {
          'style-attr': {
            pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
            inside: {
              'attr-name': {
                pattern: /^\s*style/i,
                inside: markup.tag.inside
              },
              punctuation: /^\s*=\s*['"]|['"]\s*$/,
              'attr-value': {
                pattern: /.+/i,
                inside: Prism.languages.css
              }
            },
            alias: 'language-css'
          }
        }, markup.tag);
      }
    })(Prism);

    Prism.languages.clike = {
      comment: [{
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: true
      }, {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: true,
        greedy: true
      }],
      string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: true
      },
      'class-name': {
        pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
        lookbehind: true,
        inside: {
          punctuation: /[.\\]/
        }
      },
      keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
      boolean: /\b(?:true|false)\b/,
      function: /\w+(?=\()/,
      number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
      operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
      punctuation: /[{}[\];(),.:]/
    };
    Prism.languages.javascript = Prism.languages.extend('clike', {
      'class-name': [Prism.languages.clike['class-name'], {
        pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
        lookbehind: true
      }],
      keyword: [{
        pattern: /((?:^|})\s*)(?:catch|finally)\b/,
        lookbehind: true
      }, {
        pattern: /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
        lookbehind: true
      }],
      number: /\b(?:(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+)n?|\d+n|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
      // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
      function: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
      operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
    });
    Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/;
    Prism.languages.insertBefore('javascript', 'keyword', {
      regex: {
        pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*($|[\r\n,.;})\]]))/,
        lookbehind: true,
        greedy: true
      },
      // This must be declared before keyword because we use "function" inside the look-forward
      'function-variable': {
        pattern: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
        alias: 'function'
      },
      parameter: [{
        pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
        lookbehind: true,
        inside: Prism.languages.javascript
      }, {
        pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
        inside: Prism.languages.javascript
      }, {
        pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
        lookbehind: true,
        inside: Prism.languages.javascript
      }, {
        pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
        lookbehind: true,
        inside: Prism.languages.javascript
      }],
      constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    });
    Prism.languages.insertBefore('javascript', 'string', {
      'template-string': {
        pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|[^\\`])*`/,
        greedy: true,
        inside: {
          interpolation: {
            pattern: /\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
            inside: {
              'interpolation-punctuation': {
                pattern: /^\${|}$/,
                alias: 'punctuation'
              },
              rest: Prism.languages.javascript
            }
          },
          string: /[\s\S]+/
        }
      }
    });

    if (Prism.languages.markup) {
      Prism.languages.markup.tag.addInlined('script', 'javascript');
    }

    Prism.languages.js = Prism.languages.javascript;

    (function () {
      if (typeof self === 'undefined' || !self.Prism || !self.document || !document.querySelector) {
        return;
      }

      function $$(expr, con) {
        return Array.prototype.slice.call((con || document).querySelectorAll(expr));
      }

      function hasClass(element, className) {
        className = ' ' + className + ' ';
        return (' ' + element.className + ' ').replace(/[\n\t]/g, ' ').indexOf(className) > -1;
      }

      function callFunction(func) {
        func();
      } // Some browsers round the line-height, others don't.
      // We need to test for it to position the elements properly.


      var isLineHeightRounded = function () {
        var res;
        return function () {
          if (typeof res === 'undefined') {
            var d = document.createElement('div');
            d.style.fontSize = '13px';
            d.style.lineHeight = '1.5';
            d.style.padding = 0;
            d.style.border = 0;
            d.innerHTML = '&nbsp;<br />&nbsp;';
            document.body.appendChild(d); // Browsers that round the line-height should have offsetHeight === 38
            // The others should have 39.

            res = d.offsetHeight === 38;
            document.body.removeChild(d);
          }

          return res;
        };
      }();
      /**
       * Highlights the lines of the given pre.
       *
       * This function is split into a DOM measuring and mutate phase to improve performance.
       * The returned function mutates the DOM when called.
       *
       * @param {HTMLElement} pre
       * @param {string} [lines]
       * @param {string} [classes='']
       * @returns {() => void}
       */


      function highlightLines(pre, lines, classes) {
        lines = typeof lines === 'string' ? lines : pre.getAttribute('data-line');
        var ranges = lines.replace(/\s+/g, '').split(',');
        var offset = +pre.getAttribute('data-line-offset') || 0;
        var parseMethod = isLineHeightRounded() ? parseInt : parseFloat;
        var lineHeight = parseMethod(getComputedStyle(pre).lineHeight);
        var hasLineNumbers = hasClass(pre, 'line-numbers');
        var parentElement = hasLineNumbers ? pre : pre.querySelector('code') || pre;
        var mutateActions =
        /** @type {(() => void)[]} */
        [];
        ranges.forEach(function (currentRange) {
          var range = currentRange.split('-');
          var start = +range[0];
          var end = +range[1] || start;
          var line = pre.querySelector('.line-highlight[data-range="' + currentRange + '"]') || document.createElement('div'); //TODO: Modified by salesforce

          if (Prism.createElementFn) {
            Prism.createElementFn(line);
          }

          mutateActions.push(function () {
            line.setAttribute('aria-hidden', 'true');
            line.setAttribute('data-range', currentRange); //TODO: Modified by salesforce
            // line.className = (classes || '') + ' line-highlight';

            var _classes = classes || [];

            line.classList.add(..._classes, 'line-highlight');
          }); // if the line-numbers plugin is enabled, then there is no reason for this plugin to display the line numbers

          if (hasLineNumbers && Prism.plugins.lineNumbers) {
            var startNode = Prism.plugins.lineNumbers.getLine(pre, start);
            var endNode = Prism.plugins.lineNumbers.getLine(pre, end);

            if (startNode) {
              var top = startNode.offsetTop + 'px';
              mutateActions.push(function () {
                line.style.top = top;
              });
            }

            if (endNode) {
              var height = endNode.offsetTop - startNode.offsetTop + endNode.offsetHeight + 'px';
              mutateActions.push(function () {
                line.style.height = height;
              });
            }
          } else {
            mutateActions.push(function () {
              line.setAttribute('data-start', start);

              if (end > start) {
                line.setAttribute('data-end', end);
              }

              line.style.top = (start - offset - 1) * lineHeight + 'px';
              line.textContent = new Array(end - start + 2).join(' \n');
            });
          }

          mutateActions.push(function () {
            // allow this to play nicely with the line-numbers plugin
            // need to attack to pre as when line-numbers is enabled, the code tag is relatively which screws up the positioning
            parentElement.appendChild(line);
          });
        });
        return function () {
          mutateActions.forEach(callFunction);
        };
      }

      function applyHash() {
        var hash = location.hash.slice(1); // Remove pre-existing temporary lines

        $$('.temporary.line-highlight').forEach(function (line) {
          line.parentNode.removeChild(line);
        });
        var range = (hash.match(/\.([\d,-]+)$/) || [, ''])[1];

        if (!range || document.getElementById(hash)) {
          return;
        }

        var id = hash.slice(0, hash.lastIndexOf('.')),
            pre = document.getElementById(id);

        if (!pre) {
          return;
        }

        if (!pre.hasAttribute('data-line')) {
          pre.setAttribute('data-line', '');
        }

        var mutateDom = highlightLines(pre, range, 'temporary ');
        mutateDom();
        document.querySelector('.temporary.line-highlight').scrollIntoView();
      }

      var fakeTimer = 0; // Hack to limit the number of times applyHash() runs

      Prism.hooks.add('before-sanity-check', function (env) {
        var pre = env.element.parentNode;
        var lines = pre && pre.getAttribute('data-line');

        if (!pre || !lines || !/pre/i.test(pre.nodeName)) {
          return;
        }
        /*
         * Cleanup for other plugins (e.g. autoloader).
         *
         * Sometimes <code> blocks are highlighted multiple times. It is necessary
         * to cleanup any left-over tags, because the whitespace inside of the <div>
         * tags change the content of the <code> tag.
         */


        var num = 0;
        $$('.line-highlight', pre).forEach(function (line) {
          num += line.textContent.length;
          line.parentNode.removeChild(line);
        }); // Remove extra whitespace

        if (num && /^( \n)+$/.test(env.code.slice(-num))) {
          env.code = env.code.slice(0, -num);
        }
      });
      Prism.hooks.add('complete', function completeHook(env) {
        var pre = env.element.parentNode;
        var lines = pre && pre.getAttribute('data-line');

        if (!pre || !lines || !/pre/i.test(pre.nodeName)) {
          return;
        }

        clearTimeout(fakeTimer);
        var hasLineNumbers = Prism.plugins.lineNumbers;
        var isLineNumbersLoaded = env.plugins && env.plugins.lineNumbers;

        if (hasClass(pre, 'line-numbers') && hasLineNumbers && !isLineNumbersLoaded) {
          Prism.hooks.add('line-numbers', completeHook);
        } else {
          var mutateDom = highlightLines(pre, lines);
          mutateDom();
          fakeTimer = setTimeout(applyHash, 1);
        }
      });
      window.addEventListener('hashchange', applyHash);
      window.addEventListener('resize', function () {
        var actions = [];
        $$('pre[data-line]').forEach(function (pre) {
          actions.push(highlightLines(pre));
        });
        actions.forEach(callFunction);
      });
    })();

    (function () {
      if (typeof self === 'undefined' || !self.Prism || !self.document) {
        return;
      }
      /**
       * Plugin name which is used as a class name for <pre> which is activating the plugin
       * @type {String}
       */


      var PLUGIN_NAME = 'line-numbers';
      /**
       * Regular expression used for determining line breaks
       * @type {RegExp}
       */

      var NEW_LINE_EXP = /\n(?!$)/g;
      /**
       * Resizes line numbers spans according to height of line of code
       * @param {Element} element <pre> element
       */

      var _resizeElement = function (element) {
        var codeStyles = getStyles(element);
        var whiteSpace = codeStyles['white-space'];

        if (whiteSpace === 'pre-wrap' || whiteSpace === 'pre-line') {
          var codeElement = element.querySelector('code');
          var lineNumbersWrapper = element.querySelector('.line-numbers-rows');
          var lineNumberSizer = element.querySelector('.line-numbers-sizer');
          var codeLines = codeElement.textContent.split(NEW_LINE_EXP);

          if (!lineNumberSizer) {
            lineNumberSizer = document.createElement('span');
            lineNumberSizer.className = 'line-numbers-sizer'; //TODO: Modified by salesforce

            if (Prism.createElementFn) {
              Prism.createElementFn(lineNumberSizer);
            }

            codeElement.appendChild(lineNumberSizer);
          }

          lineNumberSizer.style.display = 'block';
          codeLines.forEach(function (line, lineNumber) {
            lineNumberSizer.textContent = line || '\n';
            var lineSize = lineNumberSizer.getBoundingClientRect().height;
            lineNumbersWrapper.children[lineNumber].style.height = lineSize + 'px';
          });
          lineNumberSizer.textContent = '';
          lineNumberSizer.style.display = 'none';
        }
      };
      /**
       * Returns style declarations for the element
       * @param {Element} element
       */


      var getStyles = function (element) {
        if (!element) {
          return null;
        }

        return window.getComputedStyle ? getComputedStyle(element) : element.currentStyle || null;
      };

      window.addEventListener('resize', function () {
        Array.prototype.forEach.call(document.querySelectorAll('pre.' + PLUGIN_NAME), _resizeElement);
      });
      Prism.hooks.add('complete', function (env) {
        if (!env.code) {
          return;
        }

        var code = env.element;
        var pre = code.parentNode; // works only for <code> wrapped inside <pre> (not inline)

        if (!pre || !/pre/i.test(pre.nodeName)) {
          return;
        } // Abort if line numbers already exists


        if (code.querySelector('.line-numbers-rows')) {
          return;
        }

        var addLineNumbers = false;
        var lineNumbersRegex = /(?:^|\s)line-numbers(?:\s|$)/;

        for (var element = code; element; element = element.parentNode) {
          if (lineNumbersRegex.test(element.className)) {
            addLineNumbers = true;
            break;
          }
        } // only add line numbers if <code> or one of its ancestors has the `line-numbers` class


        if (!addLineNumbers) {
          return;
        } // Remove the class 'line-numbers' from the <code>


        code.className = code.className.replace(lineNumbersRegex, ' '); // Add the class 'line-numbers' to the <pre>

        if (!lineNumbersRegex.test(pre.className)) {
          pre.className += ' line-numbers';
        }

        var match = env.code.match(NEW_LINE_EXP);
        var linesNum = match ? match.length + 1 : 1;
        var lineNumbersWrapper;
        var lines = new Array(linesNum + 1).join('<span></span>');
        lineNumbersWrapper = document.createElement('span');
        lineNumbersWrapper.setAttribute('aria-hidden', 'true');
        lineNumbersWrapper.className = 'line-numbers-rows';
        lineNumbersWrapper.innerHTML = lines; //TODO: Modified by salesforce

        if (Prism.createElementFn) {
          Prism.createElementFn(lineNumbersWrapper);
        }

        if (pre.hasAttribute('data-start')) {
          pre.style.counterReset = 'linenumber ' + (parseInt(pre.getAttribute('data-start'), 10) - 1);
        }

        env.element.appendChild(lineNumbersWrapper);

        _resizeElement(pre);

        Prism.hooks.run('line-numbers', env);
      });
      Prism.hooks.add('line-numbers', function (env) {
        env.plugins = env.plugins || {};
        env.plugins.lineNumbers = true;
      });
      /**
       * Global exports
       */

      Prism.plugins.lineNumbers = {
        /**
         * Get node for provided line number
         * @param {Element} element pre element
         * @param {Number} number line number
         * @return {Element|undefined}
         */
        getLine: function (element, number) {
          if (element.tagName !== 'PRE' || !element.classList.contains(PLUGIN_NAME)) {
            return;
          }

          var lineNumberRows = element.querySelector('.line-numbers-rows');
          var lineNumberStart = parseInt(element.getAttribute('data-start'), 10) || 1;
          var lineNumberEnd = lineNumberStart + (lineNumberRows.children.length - 1);

          if (number < lineNumberStart) {
            number = lineNumberStart;
          }

          if (number > lineNumberEnd) {
            number = lineNumberEnd;
          }

          var lineIndex = number - lineNumberStart;
          return lineNumberRows.children[lineIndex];
        }
      };
    })();
    });

    class CodeHighlighter extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.line = void 0;
        this._lineOffset = 1;
        this._code = void 0;
      }

      set code(newCode) {
        this._code = newCode;
        this.doHighlight();
      }

      get code() {
        return this._code;
      }

      set lineOffset(newLineOffset) {
        this._lineOffset = newLineOffset;
        this.doHighlight();
      }

      get lineOffset() {
        return this._lineOffset;
      }

      doHighlight() {
        const div = this.template.querySelector('div');

        if (div && this.code) {
          while (div.hasChildNodes()) {
            div.removeChild(div.lastChild);
          }

          const pre = document.createElement('pre');
          const codeEL = document.createElement('code');
          pre.appendChild(codeEL);
          codeEL.setAttribute('class', 'language-javascript');
          codeEL.innerHTML = this.code;
          div.appendChild(pre); // the reason we have this timeout is because the changes
          // need to go through a rehydration cycle before they are
          // fully on the real DOM. The highlighter expects to run on
          // fully rendered DOM nodes. (I think!)

          setTimeout(() => {
            this.highlight();
          }, 0);
        }
      }

      get lineOffset() {
        return this._lineOffset;
      }

      highlight() {
        prismjs.highlightAllUnder(this.template, false);
      }

      connectedCallback() {
        const namespace = 'localdevserver';
        const modulename = 'codehighlighter';
        const scopeAttribute = `${namespace}-${modulename}_${modulename}`;

        prismjs.createElementFn = element => {
          element.setAttribute(scopeAttribute, '');
          const elems = element.querySelectorAll('*');

          for (const el of elems) {
            el.setAttribute(scopeAttribute, '');
          }
        };
      }

    }

    lwc.registerDecorators(CodeHighlighter, {
      publicProps: {
        line: {
          config: 0
        },
        code: {
          config: 3
        },
        lineOffset: {
          config: 3
        }
      },
      publicMethods: ["highlight"],
      track: {
        _lineOffset: 1,
        _code: 1
      }
    });

    var _localdevserverCodeHighlighter = lwc.registerComponent(CodeHighlighter, {
      tmpl: _tmpl$4
    });

    function stylesheet$6(hostSelector, shadowSelector, nativeShadow) {
      return ".stack-message" + shadowSelector + " {font-size: 14pt;}\n.button-container" + shadowSelector + " {position: relative;}\n.collapse-container" + shadowSelector + " {position: absolute;left: 0;right: 0;display: flex;align-items: center;align-content: center;width: 300px;height: 40px;border: 1px solid #E0E5EE;border-radius: 20px;margin: auto;background-color: white;}\n.collapse" + shadowSelector + " {flex: 1;text-align: center;color: #16325C;}\n.line" + shadowSelector + " {position: absolute;top: 20px;width: 100%;border: 1px solid #E0E5EE;}\npre" + shadowSelector + " {font-size: 10pt;padding-top: 60px;}\n";
    }
    var _implicitStylesheets$6 = [stylesheet$6];

    function tmpl$5($api, $cmp, $slotset, $ctx) {
      const {
        h: api_element,
        d: api_dynamic,
        b: api_bind
      } = $api;
      const {
        _m0
      } = $ctx;
      return [api_element("div", {
        classMap: {
          "stack-message": true,
          "slds-text-heading_small": true
        },
        key: 4
      }, [api_element("div", {
        classMap: {
          "button-container": true
        },
        key: 3,
        on: {
          "click": _m0 || ($ctx._m0 = api_bind($cmp.handleOnClick))
        }
      }, [api_element("div", {
        classMap: {
          "line": true
        },
        key: 0
      }, []), api_element("div", {
        classMap: {
          "collapse-container": true
        },
        key: 2
      }, [api_element("div", {
        classMap: {
          "collapse": true
        },
        key: 1
      }, [api_dynamic($cmp.collapseMessage)])])])]), !$cmp.collapsed ? api_element("pre", {
        key: 5
      }, [api_dynamic($cmp.stack)]) : null];
    }

    var _tmpl$5 = lwc.registerTemplate(tmpl$5);
    tmpl$5.stylesheets = [];

    if (_implicitStylesheets$6) {
      tmpl$5.stylesheets.push.apply(tmpl$5.stylesheets, _implicitStylesheets$6);
    }
    tmpl$5.stylesheetTokens = {
      hostAttribute: "localdevserver-errorStacks_errorStacks-host",
      shadowAttribute: "localdevserver-errorStacks_errorStacks"
    };

    class ErrorStacks extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.collapsed = true;
        this.error = void 0;
      }

      get collapseMessage() {
        if (this.collapsed) {
          return `${this.count} stack frames collapsed`;
        } else {
          return 'Collapse stack frames';
        }
      }

      get count() {
        if (this.error) {
          if (Array.isArray(this.error.stack)) {
            return this.error.stack.length;
          } else if (this.error.stack) {
            const split = this.error.stack.split('\n');
            return split.length;
          }
        }

        return 0;
      }

      get stack() {
        if (this.error) {
          if (Array.isArray(this.error.stack)) {
            return this.error.stack;
          } else {
            if (this.error.filename) {
              let [first, ...rest] = this.error.stack.split('\n');
              rest = rest.filter(s => /^\s*at.*/.test(s));
              return [first, ...rest].join('\n');
            }

            return this.error.stack;
          }
        }
      }

      handleOnClick() {
        this.collapsed = !this.collapsed;
      }

    }

    lwc.registerDecorators(ErrorStacks, {
      publicProps: {
        error: {
          config: 0
        }
      },
      track: {
        collapsed: 1
      }
    });

    var _localdevserverErrorStacks = lwc.registerComponent(ErrorStacks, {
      tmpl: _tmpl$5
    });

    function tmpl$6($api, $cmp, $slotset, $ctx) {
      const {
        h: api_element,
        gid: api_scoped_id,
        d: api_dynamic,
        c: api_custom_element,
        t: api_text,
        fid: api_scoped_frag_id
      } = $api;
      return [$cmp.visible ? api_element("section", {
        classMap: {
          "slds-modal": true,
          "slds-fade-in-open": true,
          "slds-modal_large": true
        },
        attrs: {
          "role": "dialog",
          "tabindex": "-1",
          "aria-modal": "true"
        },
        key: 12
      }, [api_element("div", {
        classMap: {
          "slds-modal__container": true
        },
        key: 11
      }, [api_element("header", {
        classMap: {
          "slds-modal__header": true
        },
        key: 2
      }, [api_element("h2", {
        attrs: {
          "id": api_scoped_id("modal-heading-01")
        },
        key: 1
      }, [api_element("img", {
        classMap: {
          "error-image": true
        },
        attrs: {
          "src": "/assets/localdev/images/buggy.svg"
        },
        key: 0
      }, [])])]), api_element("div", {
        classMap: {
          "slds-modal__content": true,
          "slds-p-around_medium": true
        },
        key: 10
      }, [api_element("h1", {
        classMap: {
          "error-message": true,
          "slds-text-heading_large": true
        },
        key: 3
      }, [api_dynamic($cmp.errorMessage)]), $cmp.href ? api_element("h2", {
        classMap: {
          "error-location": true,
          "slds-text-heading_small": true
        },
        key: 4
      }, [api_dynamic($cmp.errorLocation)]) : null, api_custom_element("localdevserver-code-highlighter", _localdevserverCodeHighlighter, {
        classMap: {
          "error-code": true
        },
        props: {
          "code": $cmp.code,
          "line": $cmp.errorLine,
          "lineOffset": $cmp.lineOffset
        },
        key: 5
      }, []), $cmp.href ? api_element("h3", {
        classMap: {
          "view-compiled": true,
          "slds-text-title": true
        },
        key: 7
      }, [api_element("a", {
        classMap: {
          "slds-text-link_reset": true
        },
        attrs: {
          "href": api_scoped_frag_id($cmp.href)
        },
        key: 6
      }, [api_text("Go to source (vscode)")])]) : null, api_custom_element("localdevserver-error-stacks", _localdevserverErrorStacks, {
        classMap: {
          "error-stacks": true
        },
        props: {
          "error": $cmp.error
        },
        key: 8
      }, []), api_element("div", {
        classMap: {
          "info-note": true,
          "slds-text-heading_small": true
        },
        key: 9
      }, [api_text("This screen is visible only in development. It will not appear if the app crashes in production. Open your browser's developer console to further inspect this error.")])])])]) : null, $cmp.visible ? api_element("div", {
        classMap: {
          "slds-backdrop": true,
          "slds-backdrop_open": true
        },
        key: 13
      }, []) : null];
    }

    var _tmpl$6 = lwc.registerTemplate(tmpl$6);
    tmpl$6.stylesheets = [];

    if (_implicitStylesheets$4) {
      tmpl$6.stylesheets.push.apply(tmpl$6.stylesheets, _implicitStylesheets$4);
    }
    tmpl$6.stylesheetTokens = {
      hostAttribute: "localdevserver-error_error-host",
      shadowAttribute: "localdevserver-error_error"
    };

    /**
     * Gets the session nonce for the page.
     */
    function getNonce() {
      const meta = document.head.querySelector('meta[name=sessionNonce][content]');
      return meta ? meta.content : '';
    }
    /**
     * Gets all of the project and component metadata.
     */

    async function getProjectMetadata() {
      if (window.LocalDev) {
        return window.LocalDev.project;
      }

      throw new Error('project metadata not set on the window');
    }
    /**
     * Gets the metadata for a single component.
     *
     * @param {string} specifier - The specifier, e.g., 'c/myButton'.
     * @param {string} [packageKey] - The sfdx package name containing this
     * specifier. If not specified then will look in the package marked as default.
     *
     * @throws Throws an error if the component is not found.
     */

    async function getComponentMetadata(specifier, packageKey) {
      const metadata = await getProjectMetadata();
      let pkg;

      if (packageKey) {
        pkg = metadata.packages.find(p => p.key === packageKey);
      } else {
        pkg = metadata.packages.find(p => !!p.isDefault);
      }

      if (pkg) {
        const component = pkg.components.find(cmp => cmp.jsName === specifier);

        if (component) {
          return component;
        } else {
          throw new Error(`Unable to find component '${specifier}' in the project metadata`);
        }
      } else {
        const packageName = packageKey ? `package '${packageKey}'` : "a package marked 'default'";
        throw new Error(`Unable to find ${packageName} in the project metadata`);
      }
    }

    class Error$1 extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this._error = void 0;
        this.errorMessage = void 0;
        this.errorLocation = void 0;
        this.errorLine = void 0;
        this.code = void 0;
        this.lineOffset = 1;
        this.visible = true;
        this.filename = void 0;
      }

      get href() {
        // this.filename has a reliable falsy value when we have no useful information to show
        if (this.filename) {
          return 'vscode://file' + this.errorLocation;
        }
      }

      set error(newError) {
        this._error = newError;

        if (this.error && this.error.specifier) {
          fetch(`/localdev/${getNonce()}/errorDetails?specifier=${this._error.specifier}`, {
            credentials: 'same-origin'
          }).then(response => {
            if (!response.ok) {
              return;
            }

            return response.json();
          }).then(data => {
            const err = data.errors[0];
            const locLine = err.location ? err.location.line : '0';
            const locColumn = err.location ? err.location.column : '0';
            this.errorLine = locLine;
            this.errorLocation = `${err.filename}:${locLine}:${locColumn}`;
            this.errorMessage = err.message;
            this.code = err.code;
            this.filename = err.filename;
          });
        } else {
          this.errorMessage = this.error.message;
          this.errorLine = 0;
          this.errorLocation = null;
        }
      }

      get error() {
        return this._error;
      }

      handleClose() {
        this.visible = false;
      }

    }

    lwc.registerDecorators(Error$1, {
      publicProps: {
        error: {
          config: 3
        }
      },
      track: {
        _error: 1,
        errorMessage: 1,
        errorLocation: 1,
        errorLine: 1,
        code: 1,
        lineOffset: 1,
        visible: 1,
        filename: 1
      }
    });

    var _localdevserverError = lwc.registerComponent(Error$1, {
      tmpl: _tmpl$6
    });

    function tmpl$7($api, $cmp, $slotset, $ctx) {
      const {
        c: api_custom_element,
        d: api_dynamic,
        h: api_element,
        t: api_text,
        dc: api_dynamic_component,
        f: api_flatten
      } = $api;
      return [api_custom_element("localdevserver-layout-section", _localdevserverLayoutSection, {
        props: {
          "mainContent": true
        },
        key: 15
      }, [api_element("article", {
        classMap: {
          "slds-card": true
        },
        key: 14
      }, [api_element("div", {
        classMap: {
          "header": true,
          "slds-grid": true,
          "slds-grid_vertical-align-center": true,
          "slds-grid_align-spread": true,
          "slds-p-vertical_medium": true,
          "slds-p-horizontal_large": true
        },
        key: 8
      }, [api_element("header", {
        key: 4
      }, [api_custom_element("lightning-breadcrumbs", _lightningBreadcrumbs, {
        key: 2
      }, [api_custom_element("lightning-breadcrumb", _lightningBreadcrumb, {
        props: {
          "label": "home",
          "href": "/"
        },
        key: 0
      }, []), api_custom_element("lightning-breadcrumb", _lightningBreadcrumb, {
        props: {
          "label": $cmp.componentLabel,
          "href": $cmp.href
        },
        key: 1
      }, [])]), api_element("h2", {
        classMap: {
          "component-name": true,
          "slds-card__header-title": true,
          "slds-truncate": true,
          "slds-text-heading_medium": true,
          "slds-m-top_small": true
        },
        attrs: {
          "title": $cmp.componentLabel
        },
        key: 3
      }, [api_dynamic($cmp.componentLabel)])]), api_element("div", {
        classMap: {
          "header-buttons": true
        },
        key: 7
      }, [api_element("a", {
        classMap: {
          "slds-button": true,
          "slds-button_outline-brand": true
        },
        attrs: {
          "href": "/"
        },
        key: 5
      }, [api_text("Go Back")]), api_element("a", {
        classMap: {
          "slds-button": true,
          "slds-button_brand": true
        },
        attrs: {
          "href": $cmp.vscodeHref
        },
        key: 6
      }, [api_text("View in VS Code")])])]), api_element("div", {
        classMap: {
          "preview-content": true,
          "slds-grid": true,
          "slds-grid_vertical-align-center": true,
          "slds-grid_align-center": true
        },
        key: 13
      }, [api_element("div", {
        classMap: {
          "container": true,
          "slds-scrollable": true,
          "slds-m-around_large": true
        },
        key: 10
      }, api_flatten([api_dynamic_component("localdevserver-dynamic", $cmp.dynamicCtor, {
        context: {
          lwc: {}
        },
        key: 9
      }, [])])), $cmp.isLoading ? api_custom_element("lightning-spinner", _lightningSpinner, {
        props: {
          "alternativeText": "Loading",
          "size": "large"
        },
        key: 11
      }, []) : null, $cmp.error ? api_custom_element("localdevserver-error", _localdevserverError, {
        props: {
          "error": $cmp.error
        },
        key: 12
      }, []) : null])])])];
    }

    var _tmpl$7 = lwc.registerTemplate(tmpl$7);
    tmpl$7.stylesheets = [];

    if (_implicitStylesheets) {
      tmpl$7.stylesheets.push.apply(tmpl$7.stylesheets, _implicitStylesheets);
    }
    tmpl$7.stylesheetTokens = {
      hostAttribute: "localdevserver-preview_preview-host",
      shadowAttribute: "localdevserver-preview_preview"
    };

    /**
     * Gets the url to preview a component.
     *
     * @param {NavigationContext} navContext - The webruntime NavigationContext.
     * @param {string} namespace - The component namespace.
     * @param {string} name - The component name.
     */

    async function getPreviewUrl(navContext, namespace, name) {
      const route = {
        id: 'preview',
        attributes: {
          namespace,
          name
        }
      };
      return await navigation.generateUrl(navContext, route);
    }

    class Preview extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.navContext = void 0;
        this.isLoading = true;
        this.dynamicCtor = void 0;
        this.subscription = void 0;
        this.error = void 0;
        this._href = void 0;
        this._vscodeHref = void 0;
        this._componentLabel = void 0;
      }

      connectedCallback() {
        this.subscription = navigation.subscribe(this.navContext, route => {
          if (!route.attributes) {
            const error = new Error('The component to preview was not specified - The attributes property was not found in the url route.');
            this.showError(error);
            this.isLoading = false;
            return;
          }

          const {
            namespace,
            name
          } = route.attributes;

          if (!namespace || !name) {
            const error = new Error('The component to preview was not specified - The component name and namespace were not found in the url route.');
            this.showError(error);
            this.isLoading = false;
            return;
          }

          const specifier = `${namespace}/${name}`;
          this.loadHostedComponent(specifier).catch(error => {
            this.showError(error, specifier);
          }).finally(() => {
            this.isLoading = false;
          });
        });
      }

      disconnectedCallback() {
        if (this.subscription) {
          this.subscription.unsubscribe();
        }
      }

      async loadHostedComponent(specifier) {
        // load custom component metadata
        let metadata;

        try {
          metadata = await getComponentMetadata(specifier);
        } catch (e) {
          // we only want allow previews for components found in the project metadata
          const error = new Error(`The component named '${specifier}' was not found. Only components within the project namespace can be previewed.`);
          error.cause = e;
          throw error;
        }

        this._componentLabel = metadata.htmlName;
        this._vscodeHref = `vscode://file/${metadata.path}`;
        this._href = await getPreviewUrl(this.navContext, metadata.namespace, metadata.name); // dynamically load the component

        try {
          const module = await loader.load(specifier);

          if (!module.default) {
            // This means there were some compilation errors
            // We throw a generic error and let the catch handle the messaging
            throw new Error();
          }

          this.dynamicCtor = module.default;
        } catch (error) {
          // We consume the error (which usally contains no useful information)
          // but reconstruct a new error with the compilation errors
          let err = new Error(`There were errors while compiling component ${specifier}`);
          err.specifier = specifier;
          throw err;
        }
      }

      showError(error, specifier = 'unknown') {
        this.error = error;
        console.group(`There was a problem loading the component preview for '${specifier}'`);
        console.error(error);

        if (error.cause) {
          console.error(error.cause);
        }

        console.groupEnd();
      }

      get componentLabel() {
        return this._componentLabel || 'unknown';
      }

      get href() {
        return this._href || 'javascript:void(0);';
      }

      get vscodeHref() {
        return this._vscodeHref || 'javascript:void(0);';
      }

    }

    lwc.registerDecorators(Preview, {
      wire: {
        navContext: {
          adapter: navigation.NavigationContext
        }
      },
      fields: ["isLoading", "dynamicCtor", "subscription", "error", "_href", "_vscodeHref", "_componentLabel"]
    });

    var preview = lwc.registerComponent(Preview, {
      tmpl: _tmpl$7
    });

    return preview;

});
