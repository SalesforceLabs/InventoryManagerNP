Webruntime.define('localdevserver/home', ['lwc', 'lightning/configProvider'], function (lwc, configProvider) { 'use strict';

    function stylesheet(hostSelector, shadowSelector, nativeShadow) {
      return ".slds-col" + shadowSelector + " + .slds-col" + shadowSelector + " {margin-top: 1rem;}\n@media (min-width: 48em) {.slds-col" + shadowSelector + " + .slds-col" + shadowSelector + " {margin-top: 0;}\n}";
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
      return ".components-panel" + shadowSelector + " {height: 100%;}\n.header" + shadowSelector + " {padding: 1.25rem 1.5rem;border-bottom: 1px solid #dddbda;flex-wrap: wrap;}\n.project-name" + shadowSelector + " {width: 100%;}\n.project-name-text" + shadowSelector + " {font-weight: bold;}\n@media (min-width: 48em) {.header" + shadowSelector + " {flex-wrap: nowrap;}\n.project-name" + shadowSelector + " {flex: 1;width: auto;max-width: 40%;}\n}.search" + shadowSelector + " {flex: 3.5;margin-top: 1rem;}\n@media (min-width: 48em) {.search" + shadowSelector + " {margin-top: 0;}\n}.search-input" + shadowSelector + " {height: 40px;font-size: 1rem;padding-left: 3.5rem;}\n.search-input" + shadowSelector + "::-ms-input-placeholder {font-size: 1rem;}\n.search-input" + shadowSelector + "::placeholder {font-size: 1rem;color: #706e6b;}\n.search-icon" + shadowSelector + " {width: 1.5rem;height: 1.5rem;margin-top: 0;top: 9px;left: 1rem;}\n.components-body" + shadowSelector + " {flex-wrap: wrap;}\n@media (min-width: 48em) {.components-body" + shadowSelector + " {flex-wrap: nowrap;}\n}.packages-list" + shadowSelector + " {background-color: #fafafb;padding-bottom: 1rem;}\n@media (min-width: 48em) {.packages-list" + shadowSelector + " {max-width: 300px;min-height: 300px;padding-bottom: 0;}\n.components-list" + shadowSelector + " {min-height: 100%;max-height: 60vh;}\n}.components-list" + shadowSelector + " .list-item" + shadowSelector + " + .list-item" + shadowSelector + " {margin-top: .75rem;}\n.components-list-label" + shadowSelector + " {color: #3e3e3c;}\n";
    }
    var _implicitStylesheets$2 = [stylesheet$2];

    function tmpl$1($api, $cmp, $slotset, $ctx) {
      const {
        s: api_slot,
        b: api_bind,
        h: api_element
      } = $api;
      const {
        _m0,
        _m1
      } = $ctx;
      return [api_element("nav", {
        className: $cmp.computedClass,
        attrs: {
          "aria-label": $cmp.ariaLabel
        },
        key: 1,
        on: {
          "privateitemselect": _m0 || ($ctx._m0 = api_bind($cmp.handleItemSelect)),
          "privateitemregister": _m1 || ($ctx._m1 = api_bind($cmp.handleItemRegister))
        }
      }, [api_slot("", {
        key: 0
      }, [], $slotset)])];
    }

    var _tmpl$1 = lwc.registerTemplate(tmpl$1);
    tmpl$1.slots = [""];
    tmpl$1.stylesheets = [];
    tmpl$1.stylesheetTokens = {
      hostAttribute: "lightning-verticalNavigation_verticalNavigation-host",
      shadowAttribute: "lightning-verticalNavigation_verticalNavigation"
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

    function assert(condition, message) {
      {
        if (!condition) {
          throw new Error(message);
        }
      }
    }

    /**
     * Utility function to generate an unique guid.
     * used on state objects to provide a performance aid when iterating
     * through the items and marking them for render
     * @returns {String} an unique string ID
     */
    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }

      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    function classListMutation(classList, config) {
      Object.keys(config).forEach(key => {
        if (typeof key === 'string' && key.length) {
          if (config[key]) {
            classList.add(key);
          } else {
            classList.remove(key);
          }
        }
      });
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
    /**
    A boolean normalization utility for attributes.
    @param {Any} value - The value to normalize.
    @return {Boolean} - The normalized value.
    **/

    function normalizeBoolean(value) {
      return typeof value === 'string' || !!value;
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

    var subPage = 'Sub page';

    const ALLOWED_CHILDREN = ['LIGHTNING-VERTICAL-NAVIGATION-ITEM', 'LIGHTNING-VERTICAL-NAVIGATION-ITEM-BADGE', 'LIGHTNING-VERTICAL-NAVIGATION-ITEM-ICON'];
    /**
     * A vertical list of links that either take the user to another page or parts of the page the user is in.
     * @slot default Placeholder for lightning-vertical-navigation-section and lightning-vertical-navigation-overflow.
     */

    class LightningVerticalNavigation extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this._compact = void 0;
        this._shaded = void 0;
        this._selectedItem = void 0;
        this.verticalNavigationItems = [];
      }

      /**
       * Specify true to reduce spacing between navigation items. This value defaults to false.
       * @param {Boolean} compact - Specify true to reduce spacing between navigation items.
       */
      set compact(compact) {
        this._compact = normalizeBoolean(compact);
      }
      /**
       * If present, spacing between navigation items is reduced.
       * @type {boolean}
       * @default false
       */


      get compact() {
        return this._compact || false;
      }
      /**
       * Specify true when the vertical navigation is sitting on top of a shaded background. This value defaults to false.
       * @param {Boolean} shaded - Specify true when the vertical navigation is sitting on top of a shaded background.
       */


      set shaded(shaded) {
        this._shaded = normalizeBoolean(shaded);
      }
      /**
       * If present, the vertical navigation is displayed on top of a shaded background.
       * @type {boolean}
       * @default false
       */


      get shaded() {
        return this._shaded || false;
      }
      /**
       * Name of the navigation item to make active.
       * @param {String} selectedItem - Name of the navigation item to make active.
       */


      set selectedItem(selectedItem) {
        this.selectNavigationItem(normalizeString(selectedItem, {
          toLowerCase: false
        }));
      }
      /**
       * Name of the navigation item to make active.
       * An active item is highlighted in blue.
       * @type {string}
       */


      get selectedItem() {
        return this._selectedItem || '';
      }

      get ariaLabel() {
        return this.privateAriaLabel || subPage;
      }

      set ariaLabel(ariaLabel) {
        this.privateAriaLabel = ariaLabel;
      }

      get computedClass() {
        const classes = classSet('slds-nav-vertical');

        if (this.shaded) {
          classes.add('slds-nav-vertical_shade');
        }

        if (this.compact) {
          classes.add('slds-nav-vertical_compact');
        }

        return classes.toString();
      }
      /**
       * @name verticalNavigationItems
       * @type {Array}
       * @private
       * Array that holds all the child vertical-navigation-item, vertical-navigation-item-badge & vertical-navigation-item-icon items.
       */


      handleItemRegister(event) {
        event.stopPropagation(); // suppressing event since its not part of vertical-navigation public API

        const target = event.target,
              callbacks = event.detail.callbacks,
              itemName = event.detail.name,
              isItemSelected = this._selectedItem === itemName;
        assert(target.nodeType in ALLOWED_CHILDREN, 'Attempt was made to register unsupported type.');

        if (target.nodeType in ALLOWED_CHILDREN) {
          const navigationItem = {
            name: itemName,
            callbacks
          };
          this.verticalNavigationItems.push(navigationItem);
        }

        if (isItemSelected) {
          callbacks.select();
        }
      }

      handleItemSelect(event) {
        event.stopPropagation(); // suppressing event since its not part of vertical-navigation public API

        this.selectNavigationItem(event.detail.name);
      }
      /**
       * Selects the child navigation item with the specified name.
       * @param {String} itemName - label of the selected child navigation item.
       */


      selectNavigationItem(itemName) {
        // dispatch before events
        const beforeselectevent = new CustomEvent('beforeselect', {
          cancelable: true,
          detail: {
            name: itemName
          }
        });
        this.dispatchEvent(beforeselectevent);

        if (!beforeselectevent.defaultPrevented) {
          // select navigation item
          this.verticalNavigationItems.forEach(navigationItem => {
            if (navigationItem.name === itemName) {
              navigationItem.callbacks.select();
            } else {
              navigationItem.callbacks.deselect();
            }
          }); // update state

          this._selectedItem = itemName; // fire after events

          this.dispatchEvent(new CustomEvent('select', {
            detail: {
              name: itemName
            }
          }));
        }
      }

    }

    lwc.registerDecorators(LightningVerticalNavigation, {
      publicProps: {
        compact: {
          config: 3
        },
        shaded: {
          config: 3
        },
        selectedItem: {
          config: 3
        }
      },
      track: {
        _compact: 1,
        _shaded: 1,
        _selectedItem: 1
      },
      fields: ["verticalNavigationItems"]
    });

    var _lightningVerticalNavigation = lwc.registerComponent(LightningVerticalNavigation, {
      tmpl: _tmpl$1
    });

    function stylesheet$3(hostSelector, shadowSelector, nativeShadow) {
      return "div[role=\"list\"]" + shadowSelector + " {list-style: none;}\n";
    }
    var _implicitStylesheets$3 = [stylesheet$3];

    function tmpl$2($api, $cmp, $slotset, $ctx) {
      const {
        d: api_dynamic,
        gid: api_scoped_id,
        h: api_element,
        s: api_slot,
        b: api_bind
      } = $api;
      const {
        _m0
      } = $ctx;
      return [api_element("div", {
        classMap: {
          "slds-nav-vertical__section": true
        },
        key: 3,
        on: {
          "privateoverflowregister": _m0 || ($ctx._m0 = api_bind($cmp.handleOverflowRegister))
        }
      }, [api_element("h2", {
        classMap: {
          "slds-nav-vertical__title": true
        },
        attrs: {
          "id": api_scoped_id("vertical-navigation-section-heading")
        },
        key: 0
      }, [api_dynamic($cmp.label)]), api_element("div", {
        attrs: {
          "role": "list",
          "aria-describedby": `${api_scoped_id("vertical-navigation-section-heading")}`
        },
        key: 2
      }, [api_slot("", {
        key: 1
      }, [], $slotset)])])];
    }

    var _tmpl$2 = lwc.registerTemplate(tmpl$2);
    tmpl$2.slots = [""];
    tmpl$2.stylesheets = [];

    if (_implicitStylesheets$3) {
      tmpl$2.stylesheets.push.apply(tmpl$2.stylesheets, _implicitStylesheets$3);
    }
    tmpl$2.stylesheetTokens = {
      hostAttribute: "lightning-verticalNavigationSection_verticalNavigationSection-host",
      shadowAttribute: "lightning-verticalNavigationSection_verticalNavigationSection"
    };

    class LightningVerticalNavigationSection extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.headingId = guid();
        this._label = void 0;
      }

      /**
       * The heading text for this section.
       * @param {String} label - The heading text for this section.
       */
      set label(label) {
        this._label = label;
      }
      /**
       * The heading text for this section.
       * @returns {String} The heading text for this section.
       */


      get label() {
        return this._label || '';
      }

      handleOverflowRegister(event) {
        event.stopPropagation(); // suppressing event since it's a private event and not part of public API

        const item = event.detail;
        item.callbacks.updateAssistiveText(this.label);
      }

    }

    lwc.registerDecorators(LightningVerticalNavigationSection, {
      publicProps: {
        label: {
          config: 3
        }
      },
      track: {
        _label: 1
      },
      fields: ["headingId"]
    });

    var _lightningVerticalNavigationSection = lwc.registerComponent(LightningVerticalNavigationSection, {
      tmpl: _tmpl$2
    });

    function stylesheet$4(hostSelector, shadowSelector, nativeShadow) {
      return "\n" + (nativeShadow ? (":host {display: list-item;}") : (hostSelector + " {display: list-item;}")) + "\n";
    }
    var _implicitStylesheets$4 = [stylesheet$4];

    function stylesheet$5(hostSelector, shadowSelector, nativeShadow) {
      return "_:-ms-lang(x)" + shadowSelector + ", svg" + shadowSelector + " {pointer-events: none;}\n";
    }
    var _implicitStylesheets$5 = [stylesheet$5];

    function tmpl$3($api, $cmp, $slotset, $ctx) {
      const {
        fid: api_scoped_frag_id,
        h: api_element
      } = $api;
      return [api_element("svg", {
        className: $cmp.computedClass,
        attrs: {
          "focusable": "false",
          "data-key": $cmp.name,
          "aria-hidden": "true"
        },
        key: 1
      }, [api_element("use", {
        attrs: {
          "xlink:href": lwc.sanitizeAttribute("use", "http://www.w3.org/2000/svg", "xlink:href", api_scoped_frag_id($cmp.href))
        },
        key: 0
      }, [])])];
    }

    var _tmpl$3 = lwc.registerTemplate(tmpl$3);
    tmpl$3.stylesheets = [];

    if (_implicitStylesheets$5) {
      tmpl$3.stylesheets.push.apply(tmpl$3.stylesheets, _implicitStylesheets$5);
    }
    tmpl$3.stylesheetTokens = {
      hostAttribute: "lightning-primitiveIcon_primitiveIcon-host",
      shadowAttribute: "lightning-primitiveIcon_primitiveIcon"
    };

    var dir = 'ltr';

    var _tmpl$4 = void 0;

    // Taken from https://github.com/jonathantneal/svg4everybody/pull/139
    // Remove this iframe-in-edge check once the following is resolved https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8323875/
    const isEdgeUA = /\bEdge\/.(\d+)\b/.test(navigator.userAgent);
    const inIframe = window.top !== window.self;
    const isIframeInEdge = isEdgeUA && inIframe;
    var isIframeInEdge$1 = lwc.registerComponent(isIframeInEdge, {
      tmpl: _tmpl$4
    });

    // Taken from https://git.soma.salesforce.com/aura/lightning-global/blob/999dc35f948246181510df6e56f45ad4955032c2/src/main/components/lightning/SVGLibrary/stamper.js#L38-L60
    function fetchSvg(url) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            } else {
              reject(xhr);
            }
          }
        };
      });
    }

    // Which looks like it was inspired by https://github.com/jonathantneal/svg4everybody/blob/377d27208fcad3671ed466e9511556cb9c8b5bd8/lib/svg4everybody.js#L92-L107
    // Modify at your own risk!

    const newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/;
    const webkitUA = /\bAppleWebKit\/(\d+)\b/;
    const olderEdgeUA = /\bEdge\/12\.(\d+)\b/;
    const isIE = newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537;
    const supportsSvg = !isIE && !isIframeInEdge$1;
    var supportsSvg$1 = lwc.registerComponent(supportsSvg, {
      tmpl: _tmpl$4
    });

    /**
    This polyfill injects SVG sprites into the document for clients that don't
    fully support SVG. We do this globally at the document level for performance
    reasons. This causes us to lose namespacing of IDs across sprites. For example,
    if both #image from utility sprite and #image from doctype sprite need to be
    rendered on the page, both end up as #image from the doctype sprite (last one
    wins). SLDS cannot change their image IDs due to backwards-compatibility
    reasons so we take care of this issue at runtime by adding namespacing as we
    polyfill SVG elements.

    For example, given "/assets/icons/action-sprite/svg/symbols.svg#approval", we
    replace the "#approval" id with "#${namespace}-approval" and a similar
    operation is done on the corresponding symbol element.
    **/
    const svgTagName = /svg/i;

    const isSvgElement = el => el && svgTagName.test(el.nodeName);

    const requestCache = {};
    const symbolEls = {};
    const svgFragments = {};
    const spritesContainerId = 'slds-svg-sprites';
    let spritesEl;
    function polyfill(el) {
      if (!supportsSvg$1 && isSvgElement(el)) {
        if (!spritesEl) {
          spritesEl = document.createElement('svg');
          spritesEl.xmlns = 'http://www.w3.org/2000/svg';
          spritesEl['xmlns:xlink'] = 'http://www.w3.org/1999/xlink';
          spritesEl.style.display = 'none';
          spritesEl.id = spritesContainerId;
          document.body.insertBefore(spritesEl, document.body.childNodes[0]);
        }

        Array.from(el.getElementsByTagName('use')).forEach(use => {
          // We access the href differently in raptor and in aura, probably
          // due to difference in the way the svg is constructed.
          const src = use.getAttribute('xlink:href') || use.getAttribute('href');

          if (src) {
            // "/assets/icons/action-sprite/svg/symbols.svg#approval" =>
            // ["/assets/icons/action-sprite/svg/symbols.svg", "approval"]
            const parts = src.split('#');
            const url = parts[0];
            const id = parts[1];
            const namespace = url.replace(/[^\w]/g, '-');
            const href = `#${namespace}-${id}`;

            if (url.length) {
              // set the HREF value to no longer be an external reference
              if (use.getAttribute('xlink:href')) {
                use.setAttribute('xlink:href', href);
              } else {
                use.setAttribute('href', href);
              } // only insert SVG content if it hasn't already been retrieved


              if (!requestCache[url]) {
                requestCache[url] = fetchSvg(url);
              }

              requestCache[url].then(svgContent => {
                // create a document fragment from the svgContent returned (is parsed by HTML parser)
                if (!svgFragments[url]) {
                  const svgFragment = document.createRange().createContextualFragment(svgContent);
                  svgFragments[url] = svgFragment;
                }

                if (!symbolEls[href]) {
                  const svgFragment = svgFragments[url];
                  const symbolEl = svgFragment.querySelector(`#${id}`);
                  symbolEls[href] = true;
                  symbolEl.id = `${namespace}-${id}`;
                  spritesEl.appendChild(symbolEl);
                }
              });
            }
          }
        });
      }
    }

    const validNameRe = /^([a-zA-Z]+):([a-zA-Z]\w*)$/;
    const underscoreRe = /_/g;
    let pathPrefix;
    const tokenNameMap = Object.assign(Object.create(null), {
      action: 'lightning.actionSprite',
      custom: 'lightning.customSprite',
      doctype: 'lightning.doctypeSprite',
      standard: 'lightning.standardSprite',
      utility: 'lightning.utilitySprite'
    });
    const tokenNameMapRtl = Object.assign(Object.create(null), {
      action: 'lightning.actionSpriteRtl',
      custom: 'lightning.customSpriteRtl',
      doctype: 'lightning.doctypeSpriteRtl',
      standard: 'lightning.standardSpriteRtl',
      utility: 'lightning.utilitySpriteRtl'
    });
    const defaultTokenValueMap = Object.assign(Object.create(null), {
      'lightning.actionSprite': '/assets/icons/action-sprite/svg/symbols.svg',
      'lightning.actionSpriteRtl': '/assets/icons/action-sprite/svg/symbols.svg',
      'lightning.customSprite': '/assets/icons/custom-sprite/svg/symbols.svg',
      'lightning.customSpriteRtl': '/assets/icons/custom-sprite/svg/symbols.svg',
      'lightning.doctypeSprite': '/assets/icons/doctype-sprite/svg/symbols.svg',
      'lightning.doctypeSpriteRtl': '/assets/icons/doctype-sprite/svg/symbols.svg',
      'lightning.standardSprite': '/assets/icons/standard-sprite/svg/symbols.svg',
      'lightning.standardSpriteRtl': '/assets/icons/standard-sprite/svg/symbols.svg',
      'lightning.utilitySprite': '/assets/icons/utility-sprite/svg/symbols.svg',
      'lightning.utilitySpriteRtl': '/assets/icons/utility-sprite/svg/symbols.svg'
    });

    const getDefaultBaseIconPath = (category, nameMap) => defaultTokenValueMap[nameMap[category]];

    const getBaseIconPath = (category, direction) => {
      const nameMap = direction === 'rtl' ? tokenNameMapRtl : tokenNameMap;
      return configProvider.getToken(nameMap[category]) || getDefaultBaseIconPath(category, nameMap);
    };

    const getMatchAtIndex = index => iconName => {
      const result = validNameRe.exec(iconName);
      return result ? result[index] : '';
    };

    const getCategory = getMatchAtIndex(1);
    const getName = getMatchAtIndex(2);
    const isValidName = iconName => validNameRe.test(iconName);
    const getIconPath = (iconName, direction = 'ltr') => {
      pathPrefix = pathPrefix !== undefined ? pathPrefix : configProvider.getPathPrefix();

      if (isValidName(iconName)) {
        const baseIconPath = getBaseIconPath(getCategory(iconName), direction);

        if (baseIconPath) {
          // This check was introduced the following MS-Edge issue:
          // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/9655192/
          // If and when this get fixed, we can safely remove this block of code.
          if (isIframeInEdge$1) {
            // protocol => 'https:' or 'http:'
            // host => hostname + port
            const origin = `${window.location.protocol}//${window.location.host}`;
            return `${origin}${pathPrefix}${baseIconPath}#${getName(iconName)}`;
          }

          return `${pathPrefix}${baseIconPath}#${getName(iconName)}`;
        }
      }

      return '';
    };
    const computeSldsClass = iconName => {
      if (isValidName(iconName)) {
        const category = getCategory(iconName);
        const name = getName(iconName).replace(underscoreRe, '-');
        return `slds-icon-${category}-${name}`;
      }

      return '';
    };

    class LightningPrimitiveIcon extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.iconName = void 0;
        this.src = void 0;
        this.svgClass = void 0;
        this.size = 'medium';
        this.variant = void 0;
        this.privateIconSvgTemplates = configProvider.getIconSvgTemplates();
      }

      get inlineSvgProvided() {
        return !!this.privateIconSvgTemplates;
      }

      renderedCallback() {
        if (this.iconName !== this.prevIconName && !this.inlineSvgProvided) {
          this.prevIconName = this.iconName;
          const svgElement = this.template.querySelector('svg');
          polyfill(svgElement);
        }
      }

      get href() {
        return this.src || getIconPath(this.iconName, dir);
      }

      get name() {
        return getName(this.iconName);
      }

      get normalizedSize() {
        return normalizeString(this.size, {
          fallbackValue: 'medium',
          validValues: ['xx-small', 'x-small', 'small', 'medium', 'large']
        });
      }

      get normalizedVariant() {
        // NOTE: Leaving a note here because I just wasted a bunch of time
        // investigating why both 'bare' and 'inverse' are supported in
        // lightning-primitive-icon. lightning-icon also has a deprecated
        // 'bare', but that one is synonymous to 'inverse'. This 'bare' means
        // that no classes should be applied. So this component needs to
        // support both 'bare' and 'inverse' while lightning-icon only needs to
        // support 'inverse'.
        return normalizeString(this.variant, {
          fallbackValue: '',
          validValues: ['bare', 'error', 'inverse', 'warning', 'success']
        });
      }

      get computedClass() {
        const {
          normalizedSize,
          normalizedVariant
        } = this;
        const classes = classSet(this.svgClass);

        if (normalizedVariant !== 'bare') {
          classes.add('slds-icon');
        }

        switch (normalizedVariant) {
          case 'error':
            classes.add('slds-icon-text-error');
            break;

          case 'warning':
            classes.add('slds-icon-text-warning');
            break;

          case 'success':
            classes.add('slds-icon-text-success');
            break;

          case 'inverse':
          case 'bare':
            break;

          default:
            // if custom icon is set, we don't want to set
            // the text-default class
            if (!this.src) {
              classes.add('slds-icon-text-default');
            }

        }

        if (normalizedSize !== 'medium') {
          classes.add(`slds-icon_${normalizedSize}`);
        }

        return classes.toString();
      }

      resolveTemplate() {
        const name = this.iconName;

        if (isValidName(name)) {
          const [spriteName, iconName] = name.split(':');
          const template = this.privateIconSvgTemplates[`${spriteName}_${iconName}`];

          if (template) {
            return template;
          }
        }

        return _tmpl$3;
      }

      render() {
        if (this.inlineSvgProvided) {
          return this.resolveTemplate();
        }

        return _tmpl$3;
      }

    }

    lwc.registerDecorators(LightningPrimitiveIcon, {
      publicProps: {
        iconName: {
          config: 0
        },
        src: {
          config: 0
        },
        svgClass: {
          config: 0
        },
        size: {
          config: 0
        },
        variant: {
          config: 0
        }
      },
      fields: ["privateIconSvgTemplates"]
    });

    var _lightningPrimitiveIcon = lwc.registerComponent(LightningPrimitiveIcon, {
      tmpl: _tmpl$3
    });

    function tmpl$4($api, $cmp, $slotset, $ctx) {
      const {
        c: api_custom_element,
        d: api_dynamic,
        h: api_element
      } = $api;
      return [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
        props: {
          "iconName": $cmp.state.iconName,
          "size": $cmp.size,
          "variant": $cmp.variant,
          "src": $cmp.state.src
        },
        key: 0
      }, []), $cmp.alternativeText ? api_element("span", {
        classMap: {
          "slds-assistive-text": true
        },
        key: 1
      }, [api_dynamic($cmp.alternativeText)]) : null];
    }

    var _tmpl$5 = lwc.registerTemplate(tmpl$4);
    tmpl$4.stylesheets = [];
    tmpl$4.stylesheetTokens = {
      hostAttribute: "lightning-icon_icon-host",
      shadowAttribute: "lightning-icon_icon"
    };

    /**
     * Represents a visual element that provides context and enhances usability.
     */

    class LightningIcon extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.state = {};
        this.alternativeText = void 0;
      }

      /**
       * A uri path to a custom svg sprite, including the name of the resouce,
       * for example: /assets/icons/standard-sprite/svg/test.svg#icon-heart
       * @type {string}
       */
      get src() {
        return this.privateSrc;
      }

      set src(value) {
        this.privateSrc = value; // if value is not present, then we set the state back
        // to the original iconName that was passed
        // this might happen if the user sets a custom icon, then
        // decides to revert back to SLDS by removing the src attribute

        if (!value) {
          this.state.iconName = this.iconName;
          this.classList.remove('slds-icon-standard-default');
        } // if isIE11 and the src is set
        // we'd like to show the 'standard:default' icon instead
        // for performance reasons.


        if (value && isIE11) {
          this.setDefault();
          return;
        }

        this.state.src = value;
      }
      /**
       * The Lightning Design System name of the icon.
       * Names are written in the format 'utility:down' where 'utility' is the category,
       * and 'down' is the specific icon to be displayed.
       * @type {string}
       * @required
       */


      get iconName() {
        return this.privateIconName;
      }

      set iconName(value) {
        this.privateIconName = value; // if src is set, we don't need to validate
        // iconName

        if (this.src) {
          return;
        }

        if (isValidName(value)) {
          const isAction = getCategory(value) === 'action'; // update classlist only if new iconName is different than state.iconName
          // otherwise classListMutation receives class:true and class: false and removes slds class

          if (value !== this.state.iconName) {
            classListMutation(this.classList, {
              'slds-icon_container_circle': isAction,
              [computeSldsClass(value)]: true,
              [computeSldsClass(this.state.iconName)]: false
            });
          }

          this.state.iconName = value;
        } else {
          console.warn(`<lightning-icon> Invalid icon name ${value}`); // eslint-disable-line no-console
          // Invalid icon names should render a blank icon. Remove any
          // classes that might have been previously added.

          classListMutation(this.classList, {
            'slds-icon_container_circle': false,
            [computeSldsClass(this.state.iconName)]: false
          });
          this.state.iconName = undefined;
        }
      }
      /**
       * The size of the icon. Options include xx-small, x-small, small, medium, or large.
       * The default is medium.
       * @type {string}
       * @default medium
       */


      get size() {
        return normalizeString(this.state.size, {
          fallbackValue: 'medium',
          validValues: ['xx-small', 'x-small', 'small', 'medium', 'large']
        });
      }

      set size(value) {
        this.state.size = value;
      }
      /**
       * The variant changes the appearance of a utility icon.
       * Accepted variants include inverse, success, warning, and error.
       * Use the inverse variant to implement a white fill in utility icons on dark backgrounds.
       * @type {string}
       */


      get variant() {
        return normalizeVariant(this.state.variant, this.state.iconName);
      }

      set variant(value) {
        this.state.variant = value;
      }

      connectedCallback() {
        this.classList.add('slds-icon_container');
      }

      setDefault() {
        this.state.src = undefined;
        this.state.iconName = 'standard:default';
        this.classList.add('slds-icon-standard-default');
      }

    }

    lwc.registerDecorators(LightningIcon, {
      publicProps: {
        alternativeText: {
          config: 0
        },
        src: {
          config: 3
        },
        iconName: {
          config: 3
        },
        size: {
          config: 3
        },
        variant: {
          config: 3
        }
      },
      track: {
        state: 1
      }
    });

    var _lightningIcon = lwc.registerComponent(LightningIcon, {
      tmpl: _tmpl$5
    });

    function normalizeVariant(variant, iconName) {
      // Unfortunately, the `bare` variant was implemented to do what the
      // `inverse` variant should have done. Keep this logic for as long as
      // we support the `bare` variant.
      if (variant === 'bare') {
        // TODO: Deprecation warning using strippable assertion
        variant = 'inverse';
      }

      if (getCategory(iconName) === 'utility') {
        return normalizeString(variant, {
          fallbackValue: '',
          validValues: ['error', 'inverse', 'warning', 'success']
        });
      }

      return 'inverse';
    }

    function tmpl$5($api, $cmp, $slotset, $ctx) {
      const {
        c: api_custom_element,
        d: api_dynamic,
        b: api_bind,
        h: api_element
      } = $api;
      const {
        _m0
      } = $ctx;
      return [api_element("a", {
        classMap: {
          "slds-nav-vertical__action": true
        },
        attrs: {
          "href": $cmp.href,
          "aria-current": $cmp.ariaCurrent
        },
        key: 1,
        on: {
          "click": _m0 || ($ctx._m0 = api_bind($cmp.handleClick))
        }
      }, [api_custom_element("lightning-icon", _lightningIcon, {
        classMap: {
          "slds-m-right_x-small": true,
          "slds-line-height_reset": true
        },
        props: {
          "iconName": $cmp.iconName,
          "size": "x-small"
        },
        key: 0
      }, []), api_dynamic($cmp.label)])];
    }

    var _tmpl$6 = lwc.registerTemplate(tmpl$5);
    tmpl$5.stylesheets = [];

    if (_implicitStylesheets$4) {
      tmpl$5.stylesheets.push.apply(tmpl$5.stylesheets, _implicitStylesheets$4);
    }
    tmpl$5.stylesheetTokens = {
      hostAttribute: "lightning-verticalNavigationItemIcon_verticalNavigationItemIcon-host",
      shadowAttribute: "lightning-verticalNavigationItemIcon_verticalNavigationItemIcon"
    };

    const DEFAULT_HREF = 'javascript:void(0);'; // eslint-disable-line no-script-url

    /**
     * A link and icon within lightning-vertical-navigation-section or lightning-vertical-navigation-overflow.
     */

    class LightningVerticalNavigationItemIcon extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.label = void 0;
        this.name = void 0;
        this.iconName = void 0;
        this.href = DEFAULT_HREF;
        this._selected = false;
      }

      connectedCallback() {
        this.setAttribute('role', 'listitem');
        this.classList.add('slds-nav-vertical__item');
        this.dispatchEvent(new CustomEvent('privateitemregister', {
          bubbles: true,
          cancelable: true,
          detail: {
            callbacks: {
              select: this.select.bind(this),
              deselect: this.deselect.bind(this)
            },
            name: this.name
          }
        }));
      }

      select() {
        this._selected = true;
        this.classList.add('slds-is-active');
      }

      deselect() {
        this._selected = false;
        this.classList.remove('slds-is-active');
      }

      get ariaCurrent() {
        return this._selected ? 'page' : null;
      }

      handleClick(event) {
        this.dispatchEvent(new CustomEvent('privateitemselect', {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: {
            name: this.name
          }
        }));

        if (this.href === DEFAULT_HREF) {
          event.preventDefault();
        }
      }

    }

    lwc.registerDecorators(LightningVerticalNavigationItemIcon, {
      publicProps: {
        label: {
          config: 0
        },
        name: {
          config: 0
        },
        iconName: {
          config: 0
        },
        href: {
          config: 0
        }
      },
      fields: ["_selected"]
    });

    var _lightningVerticalNavigationItemIcon = lwc.registerComponent(LightningVerticalNavigationItemIcon, {
      tmpl: _tmpl$6
    });

    function tmpl$6($api, $cmp, $slotset, $ctx) {
      const {
        d: api_dynamic,
        h: api_element,
        t: api_text,
        gid: api_scoped_id,
        b: api_bind,
        k: api_key,
        c: api_custom_element,
        i: api_iterator,
        fid: api_scoped_frag_id
      } = $api;
      const {
        _m0,
        _m1,
        _m2
      } = $ctx;
      return [api_element("section", {
        classMap: {
          "components-panel": true,
          "slds-card": true,
          "slds-grid": true,
          "slds-grid_vertical": true
        },
        key: 36
      }, [api_element("div", {
        classMap: {
          "header": true,
          "slds-grid": true,
          "slds-grid_align-spread": true,
          "slds-grid_vertical-align-center": true
        },
        key: 13
      }, [api_element("header", {
        classMap: {
          "project-name": true
        },
        key: 1
      }, [api_element("h2", {
        classMap: {
          "project-name-text": true,
          "slds-card__header-title": true,
          "slds-truncate": true,
          "slds-text-heading_medium": true,
          "slds-m-right_x-small": true
        },
        attrs: {
          "title": $cmp.projectName
        },
        key: 0
      }, [api_dynamic($cmp.projectName)])]), api_element("div", {
        classMap: {
          "search": true
        },
        key: 12
      }, [api_element("div", {
        classMap: {
          "slds-form-element": true
        },
        key: 11
      }, [api_element("label", {
        classMap: {
          "slds-form-element__label": true,
          "slds-no-flex": true,
          "slds-assistive-text": true
        },
        attrs: {
          "for": `${api_scoped_id("input")}`
        },
        key: 2
      }, [api_text("Search for a component")]), api_element("div", {
        classMap: {
          "slds-form-element__control": true,
          "slds-input-has-icon": true,
          "slds-input-has-icon_left-right": true
        },
        key: 10
      }, [api_element("svg", {
        classMap: {
          "search-icon": true,
          "slds-icon": true,
          "slds-input__icon": true,
          "slds-input__icon_left": true,
          "slds-icon-text-default": true,
          "slds-icon_medium": true
        },
        attrs: {
          "aria-hidden": "true"
        },
        key: 4
      }, [api_element("use", {
        attrs: {
          "xlink:href": lwc.sanitizeAttribute("use", "http://www.w3.org/2000/svg", "xlink:href", "/assets/localdev/icons/utility-sprite/svg/symbols.svg#search")
        },
        key: 3
      }, [])]), api_element("input", {
        classMap: {
          "slds-input": true,
          "search-input": true
        },
        attrs: {
          "id": api_scoped_id("input"),
          "type": "search",
          "placeholder": "Search for a component..."
        },
        props: {
          "disabled": $cmp.searchDisabled
        },
        key: 5,
        on: {
          "change": _m0 || ($ctx._m0 = api_bind($cmp.onSearchChange)),
          "keyup": _m1 || ($ctx._m1 = api_bind($cmp.onSearchChange))
        }
      }, []), $cmp.searchInProgress ? api_element("button", {
        classMap: {
          "slds-button": true,
          "slds-button_icon": true,
          "slds-input__icon": true,
          "slds-input__icon_right": true
        },
        attrs: {
          "title": "Clear"
        },
        key: 9,
        on: {
          "click": _m2 || ($ctx._m2 = api_bind($cmp.clearInput))
        }
      }, [api_element("svg", {
        classMap: {
          "slds-button__icon": true,
          "slds-icon-text-light": true
        },
        attrs: {
          "aria-hidden": "true"
        },
        key: 7
      }, [api_element("use", {
        attrs: {
          "xlink:href": lwc.sanitizeAttribute("use", "http://www.w3.org/2000/svg", "xlink:href", "/assets/localdev/icons/utility-sprite/svg/symbols.svg#clear")
        },
        key: 6
      }, [])]), api_element("span", {
        classMap: {
          "slds-assistive-text": true
        },
        key: 8
      }, [api_text("Clear")])]) : null])])])]), api_element("div", {
        classMap: {
          "components-body": true,
          "slds-grid": true,
          "slds-grow": true
        },
        key: 35
      }, [api_element("div", {
        classMap: {
          "packages-list": true,
          "slds-grow": true
        },
        key: 17
      }, [api_custom_element("lightning-vertical-navigation", _lightningVerticalNavigation, {
        props: {
          "shaded": "true",
          "selectedItem": $cmp.selectedPackage
        },
        key: 16
      }, [api_custom_element("lightning-vertical-navigation-section", _lightningVerticalNavigationSection, {
        props: {
          "label": "Packages"
        },
        key: 15
      }, api_iterator($cmp.packages, function (item) {
        return api_custom_element("lightning-vertical-navigation-item-icon", _lightningVerticalNavigationItemIcon, {
          props: {
            "label": item.packageName,
            "name": item.key,
            "iconName": "utility:open_folder"
          },
          key: api_key(14, item.key)
        }, []);
      }))])]), $cmp.hasVisibleComponents ? api_element("div", {
        classMap: {
          "components-list": true,
          "slds-scrollable_y": true,
          "slds-grow": true,
          "slds-p-left_x-large": true,
          "slds-p-right_small": true
        },
        key: 22
      }, [api_element("h3", {
        classMap: {
          "components-list-label": true,
          "slds-text-body_small": true,
          "slds-m-vertical_small": true
        },
        key: 18
      }, [api_dynamic($cmp.componentsListLabel)]), api_element("ul", {
        classMap: {
          "slds-m-vertical_small": true
        },
        key: 21
      }, api_iterator($cmp.components, function (item) {
        return api_element("li", {
          classMap: {
            "list-item": true,
            "slds-truncate": true
          },
          key: api_key(20, item.url)
        }, [api_element("a", {
          attrs: {
            "href": api_scoped_frag_id(item.url),
            "title": item.htmlName
          },
          key: 19
        }, [api_dynamic(item.htmlName)])]);
      }))]) : null, !$cmp.hasVisibleComponents ? api_element("div", {
        classMap: {
          "slds-grid": true,
          "slds-grid_vertical-align-center": true,
          "slds-grid_align-center": true,
          "slds-grow": true
        },
        key: 34
      }, [api_element("div", {
        classMap: {
          "slds-illustration": true,
          "slds-illustration_large": true
        },
        key: 33
      }, [api_element("img", {
        classMap: {
          "slds-illustration__svg": true
        },
        attrs: {
          "src": "/assets/localdev/images/empty-state.svg",
          "alt": ""
        },
        key: 23
      }, []), api_element("div", {
        classMap: {
          "slds-text-longform": true
        },
        key: 32
      }, [$cmp.searchInProgress ? api_element("h3", {
        classMap: {
          "slds-text-heading_medium": true
        },
        key: 24
      }, [api_text("Component not found")]) : null, $cmp.searchInProgress ? api_element("p", {
        classMap: {
          "slds-text-body_regular": true
        },
        key: 26
      }, [api_text("No results for \""), api_dynamic($cmp.searchValue), api_text("\""), api_element("br", {
        key: 25
      }, []), api_text("Check your spelling and try again.")]) : null, !$cmp.searchInProgress ? api_element("h3", {
        classMap: {
          "slds-text-heading_medium": true
        },
        key: 27
      }, [api_text("No components")]) : null, !$cmp.searchInProgress ? api_element("p", {
        classMap: {
          "slds-text-body_regular": true
        },
        key: 31
      }, [api_text("After you start creating components,"), api_element("br", {
        key: 28
      }, []), api_text("you'll find them here."), api_element("br", {
        key: 29
      }, []), api_element("a", {
        attrs: {
          "href": "https://developer.salesforce.com/docs/component-library/documentation/lwc"
        },
        key: 30
      }, [api_text("Get to Know Lightning Web Components")])]) : null])])]) : null])])];
    }

    var _tmpl$7 = lwc.registerTemplate(tmpl$6);
    tmpl$6.stylesheets = [];

    if (_implicitStylesheets$2) {
      tmpl$6.stylesheets.push.apply(tmpl$6.stylesheets, _implicitStylesheets$2);
    }
    tmpl$6.stylesheetTokens = {
      hostAttribute: "localdevserver-componentsPanel_componentsPanel-host",
      shadowAttribute: "localdevserver-componentsPanel_componentsPanel"
    };

    /**
     * Gets the session nonce for the page.
     */
    /**
     * Gets all of the project and component metadata.
     */

    async function getProjectMetadata() {
      if (window.LocalDev) {
        return window.LocalDev.project;
      }

      throw new Error('project metadata not set on the window');
    }

    class ComponentsPanel extends lwc.LightningElement {
      get components() {
        if (this.componentsFilter) {
          // TODO: highlight part of search that matches
          const normalizedFilter = this.componentsFilter.replace(/-/g, '').toLowerCase();
          return this._components.filter(item => {
            const normalizedName = item.htmlName.replace(/-/g, '').toLowerCase();
            return normalizedName.includes(normalizedFilter);
          });
        }

        return this._components;
      }

      get hasComponents() {
        return this._components && this._components.length > 0;
      }

      get hasVisibleComponents() {
        return this.components.length > 0;
      }

      get componentsListLabel() {
        return this.searchInProgress ? 'Search Results' : 'All Components';
      }

      get searchDisabled() {
        return !this.hasComponents;
      }

      get packages() {
        return this._packages;
      }

      set packages(packages) {
        this._packages = packages;
      }

      get selectedPackage() {
        return this._selectedPackage;
      }

      set selectedPackage(packageId) {
        this._selectedPackage = packageId;
        this._components = this.packages.find(pkg => pkg.key === this._selectedPackage).components;
      }

      constructor() {
        super();
        this.projectName = void 0;
        this._packages = [];
        this._components = [];
        this._selectedPackage = void 0;
        this.componentsFilter = void 0;
        this.searchInProgress = void 0;
        this.searchValue = void 0;
        getProjectMetadata().then(data => {
          this.projectName = data.projectName;
          this.packages = data.packages;

          if (this.packages.length) {
            this.selectedPackage = this.packages[0].key;
          }
        });
      }

      onSearchChange(e) {
        this.componentsFilter = e.srcElement.value.toLowerCase();
        this.searchInProgress = !!e.srcElement.value;
        this.searchValue = e.srcElement.value;
      }

      clearInput(event) {
        event.preventDefault();
        event.stopPropagation();
        const input = this.template.querySelector('.search-input');

        if (input) {
          input.value = '';
          input.focus();
          input.dispatchEvent(new CustomEvent('change', {
            composed: true,
            bubbles: true,
            detail: {
              value: ''
            }
          }));
        }
      }

    }

    lwc.registerDecorators(ComponentsPanel, {
      track: {
        projectName: 1,
        _packages: 1,
        _components: 1,
        _selectedPackage: 1,
        componentsFilter: 1,
        searchInProgress: 1,
        searchValue: 1
      }
    });

    var _localdevserverComponentsPanel = lwc.registerComponent(ComponentsPanel, {
      tmpl: _tmpl$7
    });

    function stylesheet$6(hostSelector, shadowSelector, nativeShadow) {
      return ".resources-panel" + shadowSelector + " {height: 100%;}\n.header" + shadowSelector + " {border-bottom: 1px solid #dddbda;}\n.heading-text" + shadowSelector + " {line-height: 1rem;}\n.heading-text" + shadowSelector + ",.resource-heading" + shadowSelector + " {font-weight: bold;}\n.resource-heading" + shadowSelector + "::before {content: '';display: block;height: 0;width: 0;margin-top: calc((1 - 1.5) * 0.5em);}\n";
    }
    var _implicitStylesheets$6 = [stylesheet$6];

    function tmpl$7($api, $cmp, $slotset, $ctx) {
      const {
        t: api_text,
        h: api_element,
        c: api_custom_element
      } = $api;
      return [api_element("section", {
        classMap: {
          "resources-panel": true,
          "slds-card": true
        },
        key: 25
      }, [api_element("div", {
        classMap: {
          "header": true,
          "slds-grid": true,
          "slds-p-vertical_x-large": true,
          "slds-p-horizontal_large": true
        },
        key: 2
      }, [api_element("header", {
        key: 1
      }, [api_element("h2", {
        classMap: {
          "heading-text": true,
          "slds-card__header-title": true,
          "slds-truncate": true,
          "slds-text-heading_medium": true
        },
        key: 0
      }, [api_text("Resources")])])]), api_element("div", {
        classMap: {
          "slds-p-horizontal_large": true
        },
        key: 24
      }, [api_element("div", {
        classMap: {
          "resource": true,
          "slds-grid": true,
          "slds-m-vertical_x-large": true
        },
        key: 9
      }, [api_element("div", {
        classMap: {
          "slds-m-right_large": true
        },
        key: 4
      }, [api_custom_element("lightning-icon", _lightningIcon, {
        props: {
          "src": "/assets/localdev/icons/component_customization.svg#icon"
        },
        key: 3
      }, [])]), api_element("div", {
        key: 8
      }, [api_element("h3", {
        classMap: {
          "resource-heading": true,
          "slds-text-body_regular": true,
          "slds-m-bottom_xx-small": true
        },
        key: 5
      }, [api_text("Component Library")]), api_element("p", {
        classMap: {
          "slds-p-right_large": true
        },
        key: 6
      }, [api_text("The Component Library is the Lightning Components developer reference. Rapidly develop apps with our building blocks.")]), api_element("a", {
        classMap: {
          "resource-button": true,
          "slds-button": true,
          "slds-button_neutral": true,
          "slds-m-top_medium": true
        },
        attrs: {
          "href": "https://developer.salesforce.com/docs/component-library"
        },
        key: 7
      }, [api_text("More Info")])])]), api_element("div", {
        classMap: {
          "resource": true,
          "slds-grid": true,
          "slds-m-vertical_x-large": true
        },
        key: 16
      }, [api_element("div", {
        classMap: {
          "slds-m-right_large": true
        },
        key: 11
      }, [api_custom_element("lightning-icon", _lightningIcon, {
        props: {
          "src": "/assets/localdev/icons/code_playground.svg#icon"
        },
        key: 10
      }, [])]), api_element("div", {
        key: 15
      }, [api_element("h3", {
        classMap: {
          "resource-heading": true,
          "slds-text-body_regular": true,
          "slds-m-bottom_xx-small": true
        },
        key: 12
      }, [api_text("VS Code Extensions")]), api_element("p", {
        classMap: {
          "slds-p-right_large": true
        },
        key: 13
      }, [api_text("This extension pack includes tools for development on the Salesforce platform in the lightweight, extensible VS Code editor.")]), api_element("a", {
        classMap: {
          "resource-button": true,
          "slds-button": true,
          "slds-button_neutral": true,
          "slds-m-top_medium": true
        },
        attrs: {
          "href": "https://forcedotcom.github.io/salesforcedx-vscode"
        },
        key: 14
      }, [api_text("More Info")])])]), api_element("div", {
        classMap: {
          "resource": true,
          "slds-grid": true,
          "slds-m-vertical_x-large": true
        },
        key: 23
      }, [api_element("div", {
        classMap: {
          "slds-m-right_large": true
        },
        key: 18
      }, [api_custom_element("lightning-icon", _lightningIcon, {
        props: {
          "src": "/assets/localdev/icons/report_issue.svg#icon"
        },
        key: 17
      }, [])]), api_element("div", {
        key: 22
      }, [api_element("h3", {
        classMap: {
          "resource-heading": true,
          "slds-text-body_regular": true,
          "slds-m-bottom_xx-small": true
        },
        key: 19
      }, [api_text("Issues and Feedback")]), api_element("p", {
        classMap: {
          "slds-p-right_medium": true
        },
        key: 20
      }, [api_text("Visit the Github Repository to submit issues and feedback.")]), api_element("a", {
        classMap: {
          "resource-button": true,
          "slds-button": true,
          "slds-button_neutral": true,
          "slds-m-top_medium": true
        },
        attrs: {
          "href": "https://github.com/forcedotcom/lwc-dev-server-feedback/issues"
        },
        key: 21
      }, [api_text("Go to GitHub")])])])])])];
    }

    var _tmpl$8 = lwc.registerTemplate(tmpl$7);
    tmpl$7.stylesheets = [];

    if (_implicitStylesheets$6) {
      tmpl$7.stylesheets.push.apply(tmpl$7.stylesheets, _implicitStylesheets$6);
    }
    tmpl$7.stylesheetTokens = {
      hostAttribute: "localdevserver-resourcesPanel_resourcesPanel-host",
      shadowAttribute: "localdevserver-resourcesPanel_resourcesPanel"
    };

    class ResourcesPanel extends lwc.LightningElement {}

    var _localdevserverResourcesPanel = lwc.registerComponent(ResourcesPanel, {
      tmpl: _tmpl$8
    });

    function tmpl$8($api, $cmp, $slotset, $ctx) {
      const {
        c: api_custom_element,
        h: api_element
      } = $api;
      return [api_custom_element("localdevserver-layout-section", _localdevserverLayoutSection, {
        props: {
          "mainContent": true
        },
        key: 5
      }, [api_element("div", {
        classMap: {
          "slds-grid": true,
          "slds-gutters": true,
          "slds-gutters_x-small": true,
          "slds-wrap": true,
          "slds-grid_vertical-stretch": true
        },
        key: 4
      }, [api_element("div", {
        classMap: {
          "slds-col": true,
          "slds-size_1-of-1": true,
          "slds-medium-size_2-of-3": true,
          "slds-large-size_9-of-12": true
        },
        key: 1
      }, [api_custom_element("localdevserver-components-panel", _localdevserverComponentsPanel, {
        key: 0
      }, [])]), api_element("div", {
        classMap: {
          "slds-col": true,
          "slds-size_1-of-1": true,
          "slds-medium-size_1-of-3": true,
          "slds-large-size_3-of-12": true
        },
        key: 3
      }, [api_custom_element("localdevserver-resources-panel", _localdevserverResourcesPanel, {
        key: 2
      }, [])])])])];
    }

    var _tmpl$9 = lwc.registerTemplate(tmpl$8);
    tmpl$8.stylesheets = [];

    if (_implicitStylesheets) {
      tmpl$8.stylesheets.push.apply(tmpl$8.stylesheets, _implicitStylesheets);
    }
    tmpl$8.stylesheetTokens = {
      hostAttribute: "localdevserver-home_home-host",
      shadowAttribute: "localdevserver-home_home"
    };

    class Home extends lwc.LightningElement {}

    var home = lwc.registerComponent(Home, {
      tmpl: _tmpl$9
    });

    return home;

});
