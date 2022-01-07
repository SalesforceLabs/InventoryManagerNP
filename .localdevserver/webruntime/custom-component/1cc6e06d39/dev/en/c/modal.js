Webruntime.define('lwc/modal', ['lwc', 'lightning/configProvider'], function (lwc, configProvider) { 'use strict';

    function stylesheet(hostSelector, shadowSelector, nativeShadow) {
      return ".modal-hidden" + shadowSelector + " {display: none;}\n";
    }
    var _implicitStylesheets = [stylesheet];

    function stylesheet$1(hostSelector, shadowSelector, nativeShadow) {
      return "_:-ms-lang(x)" + shadowSelector + ", svg" + shadowSelector + " {pointer-events: none;}\n";
    }
    var _implicitStylesheets$1 = [stylesheet$1];

    function tmpl($api, $cmp, $slotset, $ctx) {
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

    var _tmpl = lwc.registerTemplate(tmpl);
    tmpl.stylesheets = [];

    if (_implicitStylesheets$1) {
      tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets$1);
    }
    tmpl.stylesheetTokens = {
      hostAttribute: "lightning-primitiveIcon_primitiveIcon-host",
      shadowAttribute: "lightning-primitiveIcon_primitiveIcon"
    };

    var dir = 'ltr';

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
    /**
    A aria attribute normalization utility.
    @param {Any} value - A single aria value or an array of aria values
    @return {String} - A space separated list of aria values
    **/

    function normalizeAriaAttribute(value) {
      let arias = Array.isArray(value) ? value : [value];
      arias = arias.map(ariaValue => {
        if (typeof ariaValue === 'string') {
          return ariaValue.replace(/\s+/g, ' ').trim();
        }

        return '';
      }).filter(ariaValue => !!ariaValue);
      return arias.length > 0 ? arias.join(' ') : null;
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
     * Set an attribute on an element, if it's a normal element
     * it will use setAttribute, if it's an LWC component
     * it will use the public property
     *
     * @param {HTMLElement} element The element to act on
     * @param {String} attribute the attribute to set
     * @param {Any} value the value to set
     */
    function smartSetAttribute(element, attribute, value) {
      if (element.tagName.match(/^LIGHTNING/i)) {
        attribute = attribute.replace(/-\w/g, m => m[1].toUpperCase());
        element[attribute] = value ? value : null;
      } else if (value) {
        element.setAttribute(attribute, value);
      } else {
        element.removeAttribute(attribute);
      }
    }

    /**
     * @param {HTMLElement} element Element to act on
     * @param {Object} values values and attributes to set, if the value is
     *                        falsy it the attribute will be removed
     */

    function synchronizeAttrs(element, values) {
      if (!element) {
        return;
      }

      const attributes = Object.keys(values);
      attributes.forEach(attribute => {
        smartSetAttribute(element, attribute, values[attribute]);
      });
    }
    const DEFAULT_ZINDEX_BASELINE = 9000;
    /**
     * Returns the zIndex baseline from slds zIndex variable --lwc-zIndexModal.
     * @returns {Number} zIndex baseline
     */

    function getZIndexBaseline() {
      const value = (window.getComputedStyle(document.documentElement) || document.documentElement.style).getPropertyValue('--lwc-zIndexModal');
      const base = parseInt(value, 10);
      return isNaN(base) ? DEFAULT_ZINDEX_BASELINE : base;
    }

    var _tmpl$1 = void 0;

    // Taken from https://github.com/jonathantneal/svg4everybody/pull/139
    // Remove this iframe-in-edge check once the following is resolved https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8323875/
    const isEdgeUA = /\bEdge\/.(\d+)\b/.test(navigator.userAgent);
    const inIframe = window.top !== window.self;
    const isIframeInEdge = isEdgeUA && inIframe;
    var isIframeInEdge$1 = lwc.registerComponent(isIframeInEdge, {
      tmpl: _tmpl$1
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
      tmpl: _tmpl$1
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

        return _tmpl;
      }

      render() {
        if (this.inlineSvgProvided) {
          return this.resolveTemplate();
        }

        return _tmpl;
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
      tmpl: _tmpl
    });

    function tmpl$1($api, $cmp, $slotset, $ctx) {
      const {
        c: api_custom_element,
        d: api_dynamic,
        h: api_element,
        b: api_bind
      } = $api;
      const {
        _m0,
        _m1
      } = $ctx;
      return [api_element("button", {
        className: $cmp.computedButtonClass,
        attrs: {
          "name": $cmp.name,
          "title": $cmp.computedTitle,
          "accesskey": $cmp.computedAccessKey,
          "type": $cmp.normalizedType,
          "value": $cmp.value,
          "aria-label": $cmp.computedAriaLabel,
          "aria-expanded": $cmp.computedAriaExpanded,
          "aria-live": $cmp.computedAriaLive,
          "aria-atomic": $cmp.computedAriaAtomic
        },
        props: {
          "disabled": $cmp.disabled
        },
        key: 2,
        on: {
          "focus": _m0 || ($ctx._m0 = api_bind($cmp.handleFocus)),
          "blur": _m1 || ($ctx._m1 = api_bind($cmp.handleBlur))
        }
      }, [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
        props: {
          "iconName": $cmp.iconName,
          "svgClass": $cmp.computedIconClass,
          "variant": "bare"
        },
        key: 0
      }, []), $cmp.alternativeText ? api_element("span", {
        classMap: {
          "slds-assistive-text": true
        },
        key: 1
      }, [api_dynamic($cmp.alternativeText)]) : null])];
    }

    var _tmpl$2 = lwc.registerTemplate(tmpl$1);
    tmpl$1.stylesheets = [];
    tmpl$1.stylesheetTokens = {
      hostAttribute: "lightning-buttonIcon_buttonIcon-host",
      shadowAttribute: "lightning-buttonIcon_buttonIcon"
    };

    const POSITION_ATTR_NAME = 'data-position-id';

    class BrowserWindow {
      get window() {
        if (!this._window) {
          this._window = window; // JTEST/Ingtegration: getComputedStyle may be null

          if (!this.window.getComputedStyle) {
            this.window.getComputedStyle = node => {
              return node.style;
            };
          }
        }

        return this._window;
      }

      mockWindow(value) {
        // For test, allow mock window.
        this._window = value;
      }

      get documentElement() {
        assert(this.window.document, 'Missing window.document');
        return this.window.document.documentElement;
      }

      get MutationObserver() {
        return this.window.MutationObserver;
      }

      isWindow(element) {
        return element && element.toString() === '[object Window]';
      }

    }

    const WindowManager = new BrowserWindow();

    function isShadowRoot(node) {
      return node && node.nodeType === 11;
    }

    function enumerateParent(elem, stopEl, checker) {
      // document.body is not necessarily a body tag, because of the (very rare)
      // case of a frameset.
      if (!elem || elem === stopEl || elem === document.body) {
        return null;
      } // if overflow is auto and overflow-y is also auto,
      // however in firefox the opposite is not true


      try {
        // getComputedStyle throws an exception
        // if elem is not an element
        // (can happen during unrender)
        const computedStyle = WindowManager.window.getComputedStyle(elem);

        if (!computedStyle) {
          return null;
        }

        if (checker(computedStyle)) {
          return elem;
        }

        return enumerateParent(isShadowRoot(elem.parentNode) ? elem.parentNode.host : elem.parentNode, stopEl, checker);
      } catch (e) {
        return null;
      }
    }

    function getScrollableParent(elem, stopEl) {
      return enumerateParent(elem, stopEl, computedStyle => {
        const overflow = computedStyle['overflow-y'];
        return overflow === 'auto' || overflow === 'scroll';
      });
    }

    function queryOverflowHiddenParent(elem, stopEl) {
      return enumerateParent(elem, stopEl, computedStyle => {
        return computedStyle['overflow-x'] === 'hidden' || computedStyle['overflow-y'] === 'hidden';
      });
    }

    function isInDom(el) {
      if (el === WindowManager.window) {
        return true;
      }

      if (!isShadowRoot(el.parentNode) && el.parentNode && el.parentNode.tagName && el.parentNode.tagName.toUpperCase() === 'BODY') {
        return true;
      }

      if (isShadowRoot(el.parentNode) && el.parentNode.host) {
        return isInDom(el.parentNode.host);
      }

      if (el.parentNode) {
        return isInDom(el.parentNode);
      }

      return false;
    }
    function isDomNode(obj) {
      return obj.nodeType && (obj.nodeType === 1 || obj.nodeType === 11);
    }
    function timeout(time) {
      return new Promise(resolve => {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setTimeout(() => {
          resolve();
        }, time);
      });
    }
    function getPositionTarget(element) {
      return element.tagName === 'TEXTAREA' ? isShadowRoot(element.parentNode) ? element.parentNode.host : element.parentNode : element;
    }
    let lastId = 1000000;
    function generateUniqueSelector() {
      return `lgcp-${lastId++}`;
    }
    function normalizeElement(element) {
      const selector = generateUniqueSelector();
      element.setAttribute(POSITION_ATTR_NAME, selector);
      element = // eslint-disable-next-line @lwc/lwc/no-document-query
      document.querySelector(`[${POSITION_ATTR_NAME}="${selector}"]`) || element;
      return element;
    }

    function isInsideOverlay(element, modalOnly) {
      if (!element) {
        return {
          isInside: false,
          overlay: null
        };
      }

      if (element.classList && (element.classList.contains('uiModal') || element.localName === 'lightning-dialog' || !modalOnly && element.classList.contains('uiPanel'))) {
        return {
          isInside: true,
          overlay: element
        };
      }

      if (!element.parentNode) {
        return {
          isInside: false,
          overlay: null
        };
      }

      return isInsideOverlay(isShadowRoot(element.parentNode) ? element.parentNode.host : element.parentNode, modalOnly);
    }

    function isInsideModal(element) {
      return isInsideOverlay(element, true);
    }
    function normalizePosition(element, nextIndex, target, alignWidth) {
      // Set element position to fixed
      // 1. element is inside overlay
      // or 2. When element isn't align with target's width, and target's parent has overflow-x:hidden setting.
      const isFixed = isInsideOverlay(element).isInside || !alignWidth && queryOverflowHiddenParent(target, WindowManager.window);
      element.style.position = isFixed ? 'fixed' : 'absolute';
      element.style.zIndex = nextIndex || 0;
      element.style.left = '-9999px'; // Avoid flicker
      // we always position from the left, but in RTL mode Omakase swaps left and right properties.
      // To always allow positioning from the left we set right to auto so position library can do its work.

      element.style.right = 'auto';
      element.style.top = '0px'; // Avoid flicker

      return element;
    }
    function requestAnimationFrameAsPromise() {
      return new Promise(resolve => {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        requestAnimationFrame(() => resolve());
      });
    }

    const Direction = {
      Center: 'center',
      Middle: 'middle',
      Right: 'right',
      Left: 'left',
      Bottom: 'bottom',
      Top: 'top',
      Default: 'default'
    };
    const VerticalMap = {
      top: Direction.Top,
      bottom: Direction.Bottom,
      center: Direction.Middle
    };
    const HorizontalMap = {
      left: Direction.Left,
      right: Direction.Right,
      center: Direction.Center
    };
    const FlipMap = {
      left: Direction.Right,
      right: Direction.Left,
      top: Direction.Bottom,
      bottom: Direction.Top,
      center: Direction.Center,
      default: Direction.Right
    };

    function getWindowSize() {
      return {
        width: WindowManager.window.innerWidth || document.body.clientWidth || 0,
        height: WindowManager.window.innerHeight || document.body.clientHeight || 0
      };
    }

    function normalizeDirection(direction, defaultValue) {
      return normalizeString(direction, {
        fallbackValue: defaultValue || Direction.Default,
        validValues: [Direction.Center, Direction.Right, Direction.Left, Direction.Bottom, Direction.Top, Direction.Middle, Direction.Default]
      });
    }
    function mapToHorizontal(value) {
      value = normalizeDirection(value, Direction.Left);
      return HorizontalMap[value];
    }
    function mapToVertical(value) {
      value = normalizeDirection(value, Direction.Left);
      return VerticalMap[value];
    }
    function flipDirection(value) {
      value = normalizeDirection(value, Direction.Left);
      return FlipMap[value];
    } // TODO: Remove, not currently in use.
    function checkFlipPossibility(element, target, leftAsBoundary) {
      const viewPort = getWindowSize();
      const elemRect = element.getBoundingClientRect();
      const referenceElemRect = target.getBoundingClientRect();
      const height = typeof elemRect.height !== 'undefined' ? elemRect.height : elemRect.bottom - elemRect.top;
      const width = typeof elemRect.width !== 'undefined' ? elemRect.width : elemRect.right - elemRect.left; // TODO: We'll need to revisit the leftAsBoundary config property. Either we'll need a better
      // name to cover the RTL language cases and maybe open up the possibility of bounding the
      // element to the target in both the horizontal and vertical directions.
      // The boundary shrinks the available area to the edge of the target rather than the viewport.

      let rightAsBoundary = false;

      if (document.dir === 'rtl') {
        rightAsBoundary = leftAsBoundary;
        leftAsBoundary = false;
      }

      const hasSpaceAbove = referenceElemRect.top >= height;
      const hasSpaceBelow = viewPort.height - referenceElemRect.bottom >= height; // Assuming left alignment is specified this tests if:
      // - there's room to accommodate the element with right alignment
      // - there's not enough room to accommodate the element with left alignment

      const shouldAlignToRight = referenceElemRect.right >= width && referenceElemRect.left + width > (rightAsBoundary ? referenceElemRect.right : viewPort.width); // Assuming right alignment is specified this tests if:
      // - there's room to accommodate the element with left alignment
      // - there's not enough room to accommodate the element with right alignment

      const shouldAlignToLeft = referenceElemRect.left + width <= viewPort.width && referenceElemRect.right - width < (leftAsBoundary ? referenceElemRect.left : 0); // Assuming center alignment, does the viewport have space to fit half of the element around
      // the target?

      const centerOverflow = {
        left: referenceElemRect.left - width * 0.5 < 0,
        right: referenceElemRect.right + width * 0.5 > viewPort.width,
        top: referenceElemRect.top - height * 0.5 < 0,
        bottom: referenceElemRect.bottom + height * 0.5 > viewPort.height
      };
      return {
        shouldAlignToLeft,
        shouldAlignToRight,
        hasSpaceAbove,
        hasSpaceBelow,
        centerOverflow
      };
    }

    class Transformer {
      constructor(pad, boxDirections, transformX, transformY) {
        this.pad = pad || 0;
        this.boxDirections = boxDirections || {
          left: true,
          right: true
        };

        this.transformX = transformX || function () {};

        this.transformY = transformY || function () {};
      }

      transform() {// no-op
      }

    }

    class TopTransformer extends Transformer {
      transform(targetBox, elementBox) {
        return {
          top: this.transformY(targetBox.top, targetBox, elementBox) + this.pad
        };
      }

    }

    class BottomTransFormer extends Transformer {
      transform(targetBox, elementBox) {
        return {
          top: this.transformY(targetBox.top, targetBox, elementBox) - elementBox.height - this.pad
        };
      }

    }

    class CenterTransformer extends Transformer {
      transform(targetBox, elementBox) {
        return {
          left: Math.floor(this.transformX(targetBox.left, targetBox, elementBox) - 0.5 * elementBox.width)
        };
      }

    }

    class MiddleTransformer extends Transformer {
      transform(targetBox, elementBox) {
        return {
          top: Math.floor(0.5 * (2 * targetBox.top + targetBox.height - elementBox.height))
        };
      }

    }

    class LeftTransformer extends Transformer {
      transform(targetBox, elementBox) {
        return {
          left: this.transformX(targetBox.left, targetBox, elementBox) + this.pad
        };
      }

    }

    class RightTransformer extends Transformer {
      transform(targetBox, elementBox) {
        return {
          left: this.transformX(targetBox.left, targetBox, elementBox) - elementBox.width - this.pad
        };
      }

    }

    class BelowTransformer extends Transformer {
      transform(targetBox, elementBox) {
        const top = targetBox.top + targetBox.height + this.pad;
        return elementBox.top < top ? {
          top
        } : {};
      }

    }

    const MIN_HEIGHT = 36; // Minimum Line Height

    const MIN_WIDTH = 36;

    class ShrinkingBoxTransformer extends Transformer {
      transform(targetBox, elementBox) {
        const retBox = {};

        if (this.boxDirections.top && elementBox.top < targetBox.top + this.pad) {
          retBox.top = targetBox.top + this.pad;
          retBox.height = Math.max(elementBox.height - (retBox.top - elementBox.top), MIN_HEIGHT);
        }

        if (this.boxDirections.left && elementBox.left < targetBox.left + this.pad) {
          retBox.left = targetBox.left + this.pad;
          retBox.width = Math.max(elementBox.width - (retBox.left - elementBox.left), MIN_WIDTH);
        }

        if (this.boxDirections.right && elementBox.left + elementBox.width > targetBox.left + targetBox.width - this.pad) {
          retBox.right = targetBox.left + targetBox.width - this.pad;
          retBox.width = Math.max(retBox.right - (retBox.left || elementBox.left), MIN_WIDTH);
        }

        if (this.boxDirections.bottom && elementBox.top + elementBox.height > targetBox.top + targetBox.height - this.pad) {
          retBox.bottom = targetBox.top + targetBox.height - this.pad;
          retBox.height = Math.max(retBox.bottom - (retBox.top || elementBox.top), MIN_HEIGHT);
        }

        return retBox;
      }

    }

    class BoundingBoxTransformer extends Transformer {
      transform(targetBox, elementBox) {
        const retBox = {};

        if (this.boxDirections.top && elementBox.top < targetBox.top + this.pad) {
          retBox.top = targetBox.top + this.pad;
        }

        if (this.boxDirections.left && elementBox.left < targetBox.left + this.pad) {
          retBox.left = targetBox.left + this.pad;
        }

        if (this.boxDirections.right && elementBox.left + elementBox.width > targetBox.left + targetBox.width - this.pad) {
          retBox.left = targetBox.left + targetBox.width - elementBox.width - this.pad;
        }

        if (this.boxDirections.bottom && elementBox.top + elementBox.height > targetBox.top + targetBox.height - this.pad) {
          retBox.top = targetBox.top + targetBox.height - elementBox.height - this.pad;
        }

        return retBox;
      }

    }

    class InverseBoundingBoxTransformer extends Transformer {
      transform(targetBox, elementBox) {
        const retBox = {};

        if (this.boxDirections.left && targetBox.left - this.pad < elementBox.left) {
          retBox.left = targetBox.left - this.pad;
        }

        if (this.boxDirections.right && elementBox.left + elementBox.width < targetBox.left + targetBox.width + this.pad) {
          retBox.left = targetBox.width + this.pad - elementBox.width + targetBox.left;
        }

        if (this.boxDirections.top && targetBox.top < elementBox.top + this.pad) {
          retBox.top = targetBox.top - this.pad;
        }

        if (this.boxDirections.bottom && elementBox.top + elementBox.height < targetBox.top + targetBox.height + this.pad) {
          retBox.top = targetBox.height + this.pad - elementBox.height + targetBox.top;
        }

        return retBox;
      }

    }

    const TransformFunctions = {
      center(input, targetBox) {
        return Math.floor(input + 0.5 * targetBox.width);
      },

      right(input, targetBox) {
        return input + targetBox.width;
      },

      left(input) {
        return input;
      },

      bottom(input, targetBox) {
        return input + targetBox.height;
      }

    };
    const Transformers = {
      top: TopTransformer,
      bottom: BottomTransFormer,
      center: CenterTransformer,
      middle: MiddleTransformer,
      left: LeftTransformer,
      right: RightTransformer,
      below: BelowTransformer,
      'bounding box': BoundingBoxTransformer,
      'shrinking box': ShrinkingBoxTransformer,
      'inverse bounding box': InverseBoundingBoxTransformer,
      default: Transformer
    };
    function toTransformFunctions(value) {
      return TransformFunctions[value] || TransformFunctions.left;
    }

    class TransformBuilder {
      type(value) {
        this._type = value;
        return this;
      }

      align(horizontal, vertical) {
        this._transformX = toTransformFunctions(horizontal);
        this._transformY = toTransformFunctions(vertical);
        return this;
      }

      pad(value) {
        this._pad = parseInt(value, 10);
        return this;
      }

      boxDirections(value) {
        this._boxDirections = value;
        return this;
      }

      build() {
        const AConstructor = Transformers[this._type] ? Transformers[this._type] : Transformers[Direction.Default];
        return new AConstructor(this._pad || 0, this._boxDirections || {}, this._transformX || toTransformFunctions(Direction.left), this._transformY || toTransformFunctions(Direction.left));
      }

    }

    class Constraint {
      constructor(type, config) {
        const {
          target,
          element,
          pad,
          boxDirections
        } = config;
        const {
          horizontal,
          vertical
        } = config.targetAlign;
        this._element = element;
        this._targetElement = target;
        this.destroyed = false;
        this._transformer = new TransformBuilder().type(type).align(horizontal, vertical).pad(pad).boxDirections(boxDirections).build();
      }

      detach() {
        this._disabled = true;
      }

      attach() {
        this._disabled = false;
      }

      computeDisplacement() {
        if (!this._disabled) {
          this._targetElement.refresh();

          this._element.refresh();

          this._pendingBox = this._transformer.transform(this._targetElement, this._element);
        }

        return this;
      }

      computePosition() {
        const el = this._element;

        if (!this._disabled) {
          Object.keys(this._pendingBox).forEach(key => {
            el.setDirection(key, this._pendingBox[key]);
          });
        }

        return this;
      }

      destroy() {
        this._element.release();

        this._targetElement.release();

        this._disabled = true;
        this.destroyed = true;
      }

    }

    class ElementProxy {
      constructor(el, id) {
        this.id = id;
        this.width = 0;
        this.height = 0;
        this.left = 0;
        this.top = 0;
        this.right = 0;
        this.bottom = 0;
        this._dirty = false;
        this._node = null;
        this._releaseCb = null;

        if (!el) {
          throw new Error('Element missing');
        } // W-3262919
        // for some reason I cannot figure out sometimes the
        // window, which clearly a window object, is not the window object
        // this will correct that. It might be related to locker


        if (WindowManager.isWindow(el)) {
          el = WindowManager.window;
        }

        this._node = el;
        this.setupObserver();
        this.refresh();
      }

      setupObserver() {
        // this check is because phantomjs does not support
        // mutation observers. The consqeuence here
        // is that any browser without mutation observers will
        // fail to update dimensions if they changwe after the proxy
        // is created and the proxy is not not refreshed
        if (WindowManager.MutationObserver && !this._node.isObserved) {
          // Use mutation observers to invalidate cache. It's magic!
          this._observer = new WindowManager.MutationObserver(this.refresh.bind(this)); // do not observe the window

          if (!WindowManager.isWindow(this._node)) {
            this._observer.observe(this._node, {
              attributes: true,
              childList: true,
              characterData: true,
              subtree: true
            });

            this._node.isObserved = true;
          }
        }
      }

      setReleaseCallback(cb, scope) {
        const scopeObj = scope || this;
        this._releaseCb = cb.bind(scopeObj);
      }

      checkNodeIsInDom() {
        // if underlying DOM node is gone,
        // this proxy should be released
        if (!isInDom(this._node)) {
          return false;
        }

        return true;
      }

      refresh() {
        const w = WindowManager.window;

        if (!this.isDirty()) {
          if (!this.checkNodeIsInDom()) {
            return this.release();
          }

          let box, x, scrollTop, scrollLeft;

          if (typeof w.pageYOffset !== 'undefined') {
            scrollTop = w.pageYOffset;
            scrollLeft = w.pageXOffset;
          } else {
            scrollTop = w.scrollY;
            scrollLeft = w.scrollX;
          }

          if (!WindowManager.isWindow(this._node)) {
            // force paint
            // eslint-disable-next-line no-unused-vars
            const offsetHeight = this._node.offsetHeight;
            box = this._node.getBoundingClientRect(); // not using integers causes weird rounding errors
            // eslint-disable-next-line guard-for-in

            for (x in box) {
              this[x] = Math.floor(box[x]);
            }

            this.top = Math.floor(this.top + scrollTop);
            this.bottom = Math.floor(this.top + box.height);
            this.left = Math.floor(this.left + scrollLeft);
            this.right = Math.floor(this.left + box.width);
          } else {
            box = {};
            this.width = WindowManager.documentElement.clientWidth;
            this.height = WindowManager.documentElement.clientHeight;
            this.left = scrollLeft;
            this.top = scrollTop;
            this.right = WindowManager.documentElement.clientWidth + scrollLeft;
            this.bottom = WindowManager.documentElement.clientHeight;
          }

          this._dirty = false;
        }

        return this._dirty;
      }

      getNode() {
        return this._node;
      }

      isDirty() {
        return this._dirty;
      }

      bake() {
        const w = WindowManager.window;

        const absPos = this._node.getBoundingClientRect();

        const style = w.getComputedStyle(this._node) || this._node.style;

        const hasPageOffset = typeof w.pageYOffset !== 'undefined';
        const scrollTop = hasPageOffset ? w.pageYOffset : w.scrollY;
        const scrollLeft = hasPageOffset ? w.pageXOffset : w.scrollX;
        const originalLeft = style.left.match(/auto|fixed/) ? '0' : parseInt(style.left.replace('px', ''), 10);
        const originalTop = style.top.match(/auto|fixed/) ? '0' : parseInt(style.top.replace('px', ''), 10);
        const leftDif = Math.round(this.left - (absPos.left + scrollLeft));
        const topDif = this.top - (absPos.top + scrollTop);
        this._node.style.left = `${originalLeft + leftDif}px`;
        this._node.style.top = `${originalTop + topDif}px`;

        if (this._restoreSize) {
          // Only store the first height/width which is the original height/width.
          if (this.originalHeight === undefined) {
            this.originalHeight = this._node.style.height;
          }

          if (this.originalWidth === undefined) {
            this.originalWidth = this._node.style.width;
          }

          this._node.style.width = `${this.width}px`;
          this._node.style.height = `${this.height}px`;
        }

        this._dirty = false;
      }

      setDirection(direction, val) {
        this[direction] = val;
        this._dirty = true; // if size is changed, should restore the original size.

        if (direction === 'height' || direction === 'width') {
          this._restoreSize = true;
        }
      }

      release() {
        if (this._restoreSize) {
          this._node.style.width = this.originalWidth;
          this._node.style.height = this.originalHeight;

          if (this._removeMinHeight) {
            this._node.style.minHeight = '';
          }
        }

        if (this._releaseCb) {
          this._releaseCb(this);
        } // Due to https://github.com/salesforce/lwc/pull/1423
        // require to call disconnect explicitly.


        if (this._observer) {
          this._observer.disconnect();

          this._observer = null;
        }
      }

      querySelectorAll(selector) {
        return this._node.querySelectorAll(selector);
      }

    }

    class ProxyCache {
      constructor() {
        this.proxyCache = {};
      }

      get count() {
        return Object.keys(this.proxyCache).length;
      }

      releaseOrphanProxies() {
        for (const proxy in this.proxyCache) {
          if (!this.proxyCache[proxy].el.checkNodeIsInDom()) {
            this.proxyCache[proxy].el.release();
          }
        }
      }

      bakeOff() {
        for (const proxy in this.proxyCache) {
          if (this.proxyCache[proxy].el.isDirty()) {
            this.proxyCache[proxy].el.bake();
          }
        }
      }

      getReferenceCount(proxy) {
        const id = proxy.id;

        if (!id || !this.proxyCache[id]) {
          return 0;
        }

        return this.proxyCache[id].refCount;
      }

      release(proxy) {
        const proxyInstance = this.proxyCache[proxy.id];

        if (proxyInstance) {
          --proxyInstance.refCount;
        }

        if (proxyInstance && proxyInstance.refCount <= 0) {
          delete this.proxyCache[proxy.id];
        }
      }

      reset() {
        this.proxyCache = {};
      }

      create(element) {
        let key = 'window';

        if (!WindowManager.isWindow(element)) {
          key = element ? element.getAttribute(POSITION_ATTR_NAME) : null; // 1 - Node.ELEMENT_NODE, 11 - Node.DOCUMENT_FRAGMENT_NODE

          assert(key && element.nodeType && (element.nodeType !== 1 || element.nodeType !== 11), `Element Proxy requires an element and has property ${POSITION_ATTR_NAME}`);
        }

        if (this.proxyCache[key]) {
          this.proxyCache[key].refCount++;
          return this.proxyCache[key].el;
        }

        const newProxy = new ElementProxy(element, key);
        newProxy.setReleaseCallback(release, newProxy);
        this.proxyCache[key] = {
          el: newProxy,
          refCount: 1
        }; // run GC

        timeout(0).then(() => {
          this.releaseOrphanProxies();
        });
        return this.proxyCache[key].el;
      }

    }

    lwc.registerDecorators(ProxyCache, {
      fields: ["proxyCache"]
    });

    const elementProxyCache = new ProxyCache();
    function bakeOff() {
      elementProxyCache.bakeOff();
    }
    function release(proxy) {
      return elementProxyCache.release(proxy);
    }
    function createProxy(element) {
      return elementProxyCache.create(element);
    }

    class RepositionQueue {
      constructor() {
        this.callbacks = [];
        this.repositionScheduled = false;
        this._constraints = [];
        this.timeoutId = 0;
        this.lastIndex = getZIndexBaseline();
        this.eventsBound = false;
      }

      get nextIndex() {
        return this.lastIndex++;
      }

      get constraints() {
        return this._constraints;
      }

      set constraints(value) {
        this._constraints = this._constraints.concat(value);
      }

      dispatchRepositionCallbacks() {
        while (this.callbacks.length > 0) {
          this.callbacks.shift()();
        }
      }

      add(callback) {
        if (typeof callback === 'function') {
          this.callbacks.push(callback);
          return true;
        }

        return false;
      }

      scheduleReposition(callback) {
        if (this.timeoutId === 0) {
          // eslint-disable-next-line @lwc/lwc/no-async-operation
          this.timeoutId = setTimeout(() => {
            this.reposition(callback);
          }, 10);
        }
      }

      reposition(callback) {
        // all the callbacks will be called
        if (typeof callback === 'function') {
          this.callbacks.push(callback);
        } // this is for throttling


        clearTimeout(this.timeoutId);
        this.timeoutId = 0; // this semaphore is to make sure
        // if reposition is called twice within one frame
        // we only run this once

        if (!this.repositionScheduled) {
          // eslint-disable-next-line @lwc/lwc/no-async-operation
          requestAnimationFrame(() => {
            this.repositionScheduled = false; // this must be executed in order or constraints
            // will behave oddly

            this._constraints = this._constraints.filter(constraint => {
              if (!constraint.destroyed) {
                constraint.computeDisplacement().computePosition();
                return true;
              }

              return false;
            });
            bakeOff();
            this.dispatchRepositionCallbacks();
          });
          this.repositionScheduled = true;
        }
      }

      get repositioning() {
        if (!this._reposition) {
          this._reposition = this.scheduleReposition.bind(this);
        }

        return this._reposition;
      }

      bindEvents() {
        if (!this.eventsBound) {
          window.addEventListener('resize', this.repositioning);
          window.addEventListener('scroll', this.repositioning);
          this.eventsBound = true;
        }
      }

      detachEvents() {
        window.removeEventListener('resize', this.repositioning);
        window.removeEventListener('scroll', this.repositioning);
        this.eventsBound = false;
      }

      rebase(index) {
        if (this.lastIndex <= index) {
          this.lastIndex = index + 1;
        }
      }

    }

    lwc.registerDecorators(RepositionQueue, {
      fields: ["callbacks", "repositionScheduled", "_constraints", "timeoutId", "lastIndex", "eventsBound"]
    });

    const positionQueue = new RepositionQueue();
    function scheduleReposition(callback) {
      positionQueue.scheduleReposition(callback);
    }
    function bindEvents() {
      positionQueue.bindEvents();
    }
    function addConstraints(list) {
      positionQueue.constraints = list;
    }
    function reposition(callback) {
      positionQueue.reposition(callback);
    }
    function nextIndex() {
      return positionQueue.nextIndex;
    }
    function rebaseIndex(index) {
      return positionQueue.rebase(index);
    }

    class Relationship {
      constructor(config, constraintList, scrollableParent, observer) {
        this.config = config;
        this.constraintList = constraintList;
        this.scrollableParent = scrollableParent;
        this.observer = observer;
      }

      disable() {
        this.constraintList.forEach(constraintToDisable => {
          constraintToDisable.detach();
        });
      }

      enable() {
        this.constraintList.forEach(constraintToEnable => {
          constraintToEnable.attach();
        });
      }

      destroy() {
        if (this.config.removeListeners) {
          this.config.removeListeners();
          this.config.removeListeners = undefined;
        }

        while (this.constraintList.length > 0) {
          this.constraintList.pop().destroy();
        } // Clean up node appended to body of dom


        if (this.config.appendToBody && this.config.element) {
          // eslint-disable-next-line @lwc/lwc/no-document-query
          const nodeToRemove = document.querySelector(`[${POSITION_ATTR_NAME}="${this.config.element.getAttribute(POSITION_ATTR_NAME)}"]`);

          if (nodeToRemove) {
            nodeToRemove.parentNode.removeChild(nodeToRemove);
          }
        } // Due to https://github.com/salesforce/lwc/pull/1423
        // require to call disconnect explicitly.


        if (this.observer) {
          this.observer.disconnect();
          this.observer = null;
        }
      }

      reposition() {
        return new Promise(resolve => {
          reposition(() => {
            resolve();
          });
        });
      }

    }

    const DEFAULT_MIN_HEIGHT = '1.875rem';

    function setupObserver(config, scrollableParent) {
      const observedElement = config.element;
      let observer = null;

      if (WindowManager.MutationObserver && !observedElement.isObserved) {
        observer = new WindowManager.MutationObserver(() => {});
        observer.observe(observedElement, {
          attributes: true,
          subtree: true,
          childList: true
        });
        observedElement.isObserved = true;
      }

      if (scrollableParent) {
        scrollableParent.addEventListener('scroll', scheduleReposition);

        config.removeListeners = () => {
          scrollableParent.removeEventListener('scroll', scheduleReposition);
        };
      }

      return observer;
    }

    function validateConfig(config) {
      assert(config.element && isDomNode(config.element), 'Element is undefined or missing, or not a Dom Node');
      assert(config.target && (WindowManager.isWindow(config.target) || isDomNode(config.target)), 'Target is undefined or missing');
    }

    function createRelationship(config) {
      bindEvents();

      if (config.alignWidth && config.element.style.position === 'fixed') {
        config.element.style.width = config.target.getBoundingClientRect().width + 'px';
      }

      const constraintList = [];
      const scrollableParent = getScrollableParent(getPositionTarget(config.target), WindowManager.window); // This observer and the test for scrolling children
      // is so that if a panel contains a scroll we do not
      // proxy the events to the "parent"  (actually the target's parent)

      const observer = setupObserver(config, scrollableParent);

      if (config.appendToBody) {
        document.body.appendChild(config.element);
      }

      config.element = createProxy(config.element);
      config.target = createProxy(config.target); // Add horizontal constraint.

      const horizontalConfig = Object.assign({}, config);

      if (horizontalConfig.padLeft !== undefined) {
        horizontalConfig.pad = horizontalConfig.padLeft;
      } // Add vertical constraint.


      const verticalConfig = Object.assign({}, config);

      if (verticalConfig.padTop !== undefined) {
        verticalConfig.pad = verticalConfig.padTop;
      }

      constraintList.push(new Constraint(mapToHorizontal(config.align.horizontal), horizontalConfig));
      constraintList.push(new Constraint(mapToVertical(config.align.vertical), verticalConfig));
      const autoShrink = config.autoShrink.height || config.autoShrink.width;

      if (config.scrollableParentBound && scrollableParent) {
        const parent = normalizeElement(scrollableParent);
        const boxConfig = {
          element: config.element,
          enabled: config.enabled,
          target: createProxy(parent),
          align: {},
          targetAlign: {},
          pad: 3,
          boxDirections: {
            top: true,
            bottom: true,
            left: true,
            right: true
          }
        };

        if (autoShrink) {
          const style = boxConfig.element.getNode().style;

          if (!style.minHeight) {
            style.minHeight = config.minHeight;
            boxConfig.element._removeMinHeight = true;
          }

          boxConfig.boxDirections = {
            top: !!config.autoShrink.height,
            bottom: !!config.autoShrink.height,
            left: !!config.autoShrink.width,
            right: !!config.autoShrink.width
          };
          constraintList.push(new Constraint('shrinking box', boxConfig));
        } else {
          constraintList.push(new Constraint('bounding box', boxConfig));
        }
      }

      if (config.keepInViewport) {
        constraintList.push(new Constraint('bounding box', {
          element: config.element,
          enabled: config.enabled,
          target: createProxy(window),
          align: {},
          targetAlign: {},
          pad: 3,
          boxDirections: {
            top: true,
            bottom: true,
            left: true,
            right: true
          }
        }));
      }

      addConstraints(constraintList);
      reposition();
      return new Relationship(config, constraintList, scrollableParent, observer);
    }

    function isAutoFlipHorizontal(config) {
      return config.autoFlip || config.autoFlipHorizontal;
    }

    function isAutoFlipVertical(config) {
      return config.autoFlip || config.autoFlipVertical;
    }

    function normalizeAlignments(config, flipConfig) {
      const align = {
        horizontal: config.align.horizontal,
        vertical: config.align.vertical
      };
      const targetAlign = {
        horizontal: config.targetAlign.horizontal,
        vertical: config.targetAlign.vertical
      }; // Horizontal alignments flip for RTL languages.

      if (document.dir === 'rtl') {
        align.horizontal = flipDirection(align.horizontal);
        targetAlign.horizontal = flipDirection(targetAlign.horizontal);
      } // When using the autoFlip flags with center alignment, we change the element alignment to fit
      // within the viewport when it's detected that it overflows the edge of the viewport.


      let vFlip = false;

      if (isAutoFlipVertical(config)) {
        if (align.vertical === Direction.Bottom) {
          vFlip = !flipConfig.hasSpaceAbove && flipConfig.hasSpaceBelow;
        } else if (align.vertical === Direction.Top) {
          vFlip = flipConfig.hasSpaceAbove && !flipConfig.hasSpaceBelow;
        } else if (align.vertical === Direction.Center) {
          if (flipConfig.centerOverflow.top && !flipConfig.centerOverflow.bottom) {
            align.vertical = targetAlign.vertical = Direction.Top;
          } else if (flipConfig.centerOverflow.bottom && !flipConfig.centerOverflow.top) {
            align.vertical = targetAlign.vertical = Direction.Bottom;
          }
        }
      }

      let hFlip = false;

      if (isAutoFlipHorizontal(config)) {
        if (align.horizontal === Direction.Left) {
          hFlip = flipConfig.shouldAlignToRight;
        } else if (align.horizontal === Direction.Right) {
          hFlip = flipConfig.shouldAlignToLeft;
        } else if (align.horizontal === Direction.Center) {
          if (flipConfig.centerOverflow.left && !flipConfig.centerOverflow.right) {
            align.horizontal = targetAlign.horizontal = Direction.Left;
          } else if (flipConfig.centerOverflow.right && !flipConfig.centerOverflow.left) {
            align.horizontal = targetAlign.horizontal = Direction.Right;
          }
        }
      }

      return {
        align: {
          horizontal: hFlip ? flipDirection(align.horizontal) : normalizeDirection(align.horizontal, Direction.Left),
          vertical: vFlip ? flipDirection(align.vertical) : normalizeDirection(align.vertical, Direction.Top)
        },
        targetAlign: {
          horizontal: hFlip ? flipDirection(targetAlign.horizontal) : normalizeDirection(targetAlign.horizontal, Direction.Left),
          vertical: vFlip ? flipDirection(targetAlign.vertical) : normalizeDirection(targetAlign.vertical, Direction.Bottom)
        }
      };
    }

    function normalizeConfig(config) {
      config.align = config.align || {};
      config.targetAlign = config.targetAlign || {};
      const flipConfig = checkFlipPossibility(config.element, config.target, config.leftAsBoundary);
      const {
        align,
        targetAlign
      } = normalizeAlignments(config, flipConfig); // When inside modal, element may expand out of the viewport and be cut off.
      // So if inside modal, and don't have enough space above or below, will add bounding box rule.

      if (config.isInsideModal && !flipConfig.hasSpaceAbove && !flipConfig.hasSpaceBelow) {
        config.scrollableParentBound = true;
      }

      return {
        target: config.target,
        element: config.element,
        align,
        targetAlign,
        alignWidth: config.alignWidth,
        scrollableParentBound: config.scrollableParentBound,
        keepInViewport: config.keepInViewport,
        pad: config.pad,
        padTop: config.padTop,
        padLeft: config.padLeft,
        autoShrink: {
          height: config.autoShrink || config.autoShrinkHeight,
          width: config.autoShrink || config.autoShrinkWidth
        },
        minHeight: config.minHeight || DEFAULT_MIN_HEIGHT
      };
    }

    function toElement(root, target) {
      if (target && typeof target === 'string') {
        return root.querySelector(target);
      } else if (target && typeof target === 'function') {
        return target();
      }

      return target;
    }

    function startPositioning(root, config) {
      assert(root, 'Root is undefined or missing');
      assert(config, 'Config is undefined or missing');
      const node = normalizeElement(root);
      const target = toElement(node, config.target);
      const element = toElement(node, config.element); // when target/element is selector, there is chance, dom isn't present anymore.

      if (!target || !element) {
        return null;
      }

      config.target = normalizeElement(target);
      config.element = normalizeElement(element);
      const result = isInsideModal(config.element);
      config.isInsideModal = result.isInside; // stackManager will increase the zIndex too.
      // if detect inside modal, read modal zindex and rebase to it.

      if (config.isInsideModal && result.overlay) {
        const index = parseInt(result.overlay.style.zIndex, 10);
        rebaseIndex(index);
      } // Also should check if target inside modal too.


      const targetResult = isInsideModal(config.target);
      config.isInsideModal = targetResult.isInside; // if detect inside modal, read modal zindex and rebase to it.

      if (config.isInsideModal && targetResult.overlay) {
        const index = parseInt(targetResult.overlay.style.zIndex, 10);
        rebaseIndex(index);
      } // Element absolute / fixed must be set prior to getBoundingClientRect call or
      // the scrollable parent (usually due to uiModal/uiPanel) will push the page down.


      config.element = normalizePosition(config.element, nextIndex(), config.target, config.alignWidth);
      validateConfig(config);
      return createRelationship(normalizeConfig(config));
    }
    function stopPositioning(relationship) {
      if (relationship) {
        relationship.destroy();
      }
    }
    class AutoPosition {
      constructor(root) {
        this._autoPositionUpdater = null;
        this._root = root;
      }

      start(config) {
        return requestAnimationFrameAsPromise().then(() => {
          let promise = Promise.resolve();

          if (!this._autoPositionUpdater) {
            this._autoPositionUpdater = startPositioning(this._root, config);
          } else {
            promise = promise.then(() => {
              return this._autoPositionUpdater.reposition();
            });
          }

          return promise.then(() => {
            return this._autoPositionUpdater;
          });
        });
      }

      stop() {
        if (this._autoPositionUpdater) {
          stopPositioning(this._autoPositionUpdater);
          this._autoPositionUpdater = null;
        }

        return Promise.resolve();
      }

    }

    lwc.registerDecorators(AutoPosition, {
      fields: ["_autoPositionUpdater"]
    });

    function tmpl$2($api, $cmp, $slotset, $ctx) {
      const {
        b: api_bind,
        h: api_element
      } = $api;
      const {
        _m0
      } = $ctx;
      return [api_element("div", {
        classMap: {
          "slds-popover__body": true
        },
        context: {
          lwc: {
            dom: "manual"
          }
        },
        key: 0,
        on: {
          "mouseleave": _m0 || ($ctx._m0 = api_bind($cmp.handleMouseLeave))
        }
      }, [])];
    }

    var _tmpl$3 = lwc.registerTemplate(tmpl$2);
    tmpl$2.stylesheets = [];
    tmpl$2.stylesheetTokens = {
      hostAttribute: "lightning-primitiveBubble_primitiveBubble-host",
      shadowAttribute: "lightning-primitiveBubble_primitiveBubble"
    };

    const DEFAULT_ALIGN = {
      horizontal: 'left',
      vertical: 'bottom'
    };

    class LightningPrimitiveBubble extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.state = {
          visible: false,
          contentId: ''
        };
        this.divElement = void 0;
      }

      get contentId() {
        return this.state.contentId;
      }

      set contentId(value) {
        this.state.contentId = value;

        if (this.state.inDOM) {
          this.divEl.setAttribute('id', this.state.contentId);
        }
      }

      connectedCallback() {
        this.updateClassList();
        this.state.inDOM = true;
      }

      disconnectedCallback() {
        this.state.inDOM = false;
      }

      renderedCallback() {
        // set content manually once rendered
        // - this is required to avoid the content update being in the wrong 'tick'
        this.setContentManually();
        this.setIdManually();
      }

      set content(value) {
        this.state.content = value;

        if (this.state.inDOM) {
          this.setContentManually();
        }
      }

      get content() {
        return this.state.content || '';
      }

      get align() {
        return this.state.align || DEFAULT_ALIGN;
      }

      set align(value) {
        this.state.align = value;
        this.updateClassList();
      }

      get visible() {
        return this.state.visible;
      }

      set visible(value) {
        this.state.visible = value;
        this.updateClassList();
      }

      setIdManually() {
        this.divElement = this.divElement ? this.divElement : this.template.querySelector('div');
        this.divElement.setAttribute('id', this.state.contentId);
      } // manually set the content value


      setContentManually() {
        /* manipulate DOM directly */
        this.template.querySelector('.slds-popover__body').textContent = this.state.content;
      } // compute class value for this bubble


      updateClassList() {
        const classes = classSet('slds-popover').add('slds-popover_tooltip'); // show or hide bubble

        classes.add({
          'slds-rise-from-ground': this.visible,
          'slds-fall-into-ground': !this.visible
        }); // apply the proper nubbin CSS class

        const {
          horizontal,
          vertical
        } = this.align;
        classes.add({
          'slds-nubbin_top-left': horizontal === 'left' && vertical === 'top',
          'slds-nubbin_top-right': horizontal === 'right' && vertical === 'top',
          'slds-nubbin_bottom-left': horizontal === 'left' && vertical === 'bottom',
          'slds-nubbin_bottom-right': horizontal === 'right' && vertical === 'bottom',
          'slds-nubbin_bottom': horizontal === 'center' && vertical === 'bottom',
          'slds-nubbin_top': horizontal === 'center' && vertical === 'top',
          'slds-nubbin_left': horizontal === 'left' && vertical === 'center',
          'slds-nubbin_right': horizontal === 'right' && vertical === 'center'
        });
        classListMutation(this.classList, classes);
      }

      handleMouseLeave() {
        this.visible = false;
      }

    }

    lwc.registerDecorators(LightningPrimitiveBubble, {
      publicProps: {
        contentId: {
          config: 3
        },
        content: {
          config: 3
        },
        align: {
          config: 3
        },
        visible: {
          config: 3
        }
      },
      track: {
        state: 1
      },
      fields: ["divElement"]
    });

    var LightningPrimitiveBubble$1 = lwc.registerComponent(LightningPrimitiveBubble, {
      tmpl: _tmpl$3
    });

    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    const BUBBLE_ID = `salesforce-lightning-tooltip-bubble_${guid()}`;

    function isResizeObserverSupported() {
      return window.ResizeObserver != null;
    }

    function buildResizeObserver(callback) {
      if (isResizeObserverSupported()) {
        return new ResizeObserver(callback);
      }

      return {
        observe() {},

        unobserve() {}

      };
    }
    /**
     * Shared instance of a primitive bubble used as a tooltip by most components. This was originally
     * defined in the helptext component which is where the minWidth style came from.
     * TODO: We may want to revisit the minWidth style with the PO and/or UX.
     */


    let CACHED_BUBBLE_ELEMENT;

    function getCachedBubbleElement() {
      if (!CACHED_BUBBLE_ELEMENT) {
        CACHED_BUBBLE_ELEMENT = lwc.createElement('lightning-primitive-bubble', {
          is: LightningPrimitiveBubble$1
        });
        CACHED_BUBBLE_ELEMENT.contentId = BUBBLE_ID;
        CACHED_BUBBLE_ELEMENT.style.position = 'absolute';
        CACHED_BUBBLE_ELEMENT.style.minWidth = '75px'; // hide bubble element on create

        CACHED_BUBBLE_ELEMENT.classList.add('slds-hide');
        CACHED_BUBBLE_ELEMENT.addEventListener('transitionend', () => {
          // W-7201022 https://gus.lightning.force.com/lightning/r/ADM_Work__c/a07B00000079kNjIAI/view
          // The tooltip uses absolute positioning and visibility gets set to hidden to
          // hide it from view which means it's still part of the document layout.
          // If we don't hide the bubble it could stay on the page and accidentally scroll pages
          // in the console app after a tab switch, especially when the tab content lengths differ.
          if (!CACHED_BUBBLE_ELEMENT.visible) {
            CACHED_BUBBLE_ELEMENT.classList.add('slds-hide');
          }
        });
      }

      return CACHED_BUBBLE_ELEMENT;
    }

    const ARIA_DESCRIBEDBY = 'aria-describedby';
    /**
     * Used as a position offset to compensate for the nubbin. The dimensions of the nubbin are not
     * included in the position library bounding box calculations. This is the size in pixels of the
     * nubbin.
     * TODO: We may want to measure this instead in cases it changes.
     */

    const NUBBIN_SIZE = 16;
    /**
     * Used in the calculation that moves the tooltip to a location that places the nubbin at the
     * center of the target element. This is the nubbin offset from the edge of the bubble in pixels
     * when using slds-nubbin_bottom-left or slds-nubbin_bottom-right.
     * TODO: We may want to measure this instead in case it changes.
     */

    const NUBBIN_OFFSET = 24;
    /**
     * Known tooltip types:
     * - info: used in cases where target already has click handlers such as button-icon
     * - toggle: used in cases where target only shows a tooltip such as helptext
     */

    const TooltipType = {
      Info: 'info',
      Toggle: 'toggle'
    };
    /**
     * Allows us to attach a tooltip to components. Typical usage is as follows:
     * - Create an instance of Tooltip
     * - Call Tooltip.initialize() to add the appropriate listeners to the element that needs a tooltip
     * See buttonIcon and buttonMenu for example usage.
     */

    class Tooltip {
      /**
       * A shared instance of primitiveBubble is used when an element is not specified in the config
       * object.
       * @param {string} value the content of the tooltip
       * @param {object} config specifies the root component, target element of the tooltip
       */
      constructor(value, config) {
        this._autoPosition = null;
        this._disabled = true;
        this._initialized = false;
        this._visible = false;
        this._config = {};
        assert(config.target, 'target for tooltip is undefined or missing');
        this.value = value;
        this._root = config.root;
        this._target = config.target;
        this._config = _objectSpread({}, config);
        this._config.align = config.align || {};
        this._config.targetAlign = config.targetAlign || {};
        this._type = normalizeString(config.type, {
          fallbackValue: TooltipType.Info,
          validValues: Object.values(TooltipType)
        }); // If a tooltip element is not given, fall back on the globally shared instance.

        this._element = config.element;

        if (!this._element) {
          this._element = getCachedBubbleElement;
          const bubbleElement = getCachedBubbleElement();

          if (bubbleElement.parentNode === null) {
            document.body.appendChild(bubbleElement);
          }
        }

        this.handleDocumentTouch = this.handleDocumentTouch.bind(this);
      }
      /**
       * Disables the tooltip.
       */


      detach() {
        this._disabled = true;
      }
      /**
       * Enables the tooltip.
       */


      attach() {
        this._disabled = false;
      }
      /**
       * Adds the appropriate event listeners to the target element to make the tooltip appear. Also
       * links the tooltip and target element via the aria-describedby attribute for screen readers.
       */


      initialize() {
        const target = this._target();

        if (!this._initialized && target) {
          switch (this._type) {
            case TooltipType.Toggle:
              this.addToggleListeners();
              break;

            case TooltipType.Info:
            default:
              this.addInfoListeners();
              break;
          }

          const ariaDescribedBy = normalizeAriaAttribute([target.getAttribute(ARIA_DESCRIBEDBY), this._element().contentId]);
          target.setAttribute(ARIA_DESCRIBEDBY, ariaDescribedBy);
          this._initialized = true;
        }
      }

      addInfoListeners() {
        const target = this._target();

        if (!this._initialized && target) {
          ['mouseenter', 'focus'].forEach(name => target.addEventListener(name, () => this.show())); // Unlike the tooltip in Aura, we want clicks and keys to dismiss the tooltip.

          ['mouseleave', 'blur', 'click', 'keydown'].forEach(name => target.addEventListener(name, event => this.hideIfNotSelfCover(event)));
        }
      }

      hideIfNotSelfCover(event) {
        if (event.type === 'mouseleave' && event.clientX && event.clientY) {
          // In any chance, if mouseleave is caused by tooltip itself, it would means
          // tooltip cover the target which mostly caused by dynamic resize of tooltip by CSS or JS.
          try {
            const elementMouseIsOver = document.elementFromPoint ? document.elementFromPoint(event.clientX, event.clientY) : null;

            if (elementMouseIsOver === this._element()) {
              if (!isResizeObserverSupported()) {
                this.startPositioning();
              }

              return;
            }
          } catch (ex) {// Jest Throw Exception
          }
        }

        this.hide();
      }

      handleDocumentTouch() {
        if (this._visible) {
          this.hide();
        }
      }

      addToggleListeners() {
        const target = this._target();

        if (!this._initialized && target) {
          target.addEventListener('touchstart', e => {
            e.stopPropagation();
            this.toggle();
          });
          ['mouseenter', 'focus'].forEach(name => target.addEventListener(name, () => this.show()));
          ['mouseleave', 'blur'].forEach(name => target.addEventListener(name, event => this.hideIfNotSelfCover(event)));
        }
      }

      get resizeObserver() {
        if (!this._resizeObserver) {
          this._resizeObserver = buildResizeObserver(() => {
            if (this._visible && this._autoPosition) {
              this.startPositioning();
            }
          });
        }

        return this._resizeObserver;
      }

      show() {
        if (this._disabled) {
          return;
        }

        this._visible = true;

        const tooltip = this._element();
        /* We only change the visibility of the cached bubble element here,
           for custom bubble elements, we expect them to react to `visible`
           property change */


        if (CACHED_BUBBLE_ELEMENT) {
          // Show cached bubble element
          CACHED_BUBBLE_ELEMENT.classList.remove('slds-hide');
        }

        tooltip.content = this._value;
        this.startPositioning();
        document.addEventListener('touchstart', this.handleDocumentTouch);
        this.resizeObserver.observe(tooltip);
      }

      hide() {
        this._visible = false;

        const tooltip = this._element();

        tooltip.visible = this._visible;
        this.stopPositioning();
        document.removeEventListener('touchstart', this.handleDocumentTouch);
        this.resizeObserver.unobserve(tooltip);
      }

      toggle() {
        if (this._visible) {
          this.hide();
        } else {
          this.show();
        }
      }

      get value() {
        return this._value;
      }

      set value(value) {
        this._value = value;
        this._disabled = !value;
      }

      get initialized() {
        return this._initialized;
      }

      get visible() {
        return this._visible;
      }

      startPositioning() {
        if (!this._autoPosition) {
          this._autoPosition = new AutoPosition(this._root);
        } // The lightning-helptext component was originally left aligned.


        const align = {
          horizontal: this._config.align.horizontal || Direction.Left,
          vertical: this._config.align.vertical || Direction.Bottom
        };
        const targetAlign = {
          horizontal: this._config.targetAlign.horizontal || Direction.Left,
          vertical: this._config.targetAlign.vertical || Direction.Top
        }; // Pads the tooltip so its nubbin is at the center of the target element.

        const targetBox = this._target().getBoundingClientRect();

        const padLeft = targetBox.width * 0.5 - NUBBIN_OFFSET;

        this._autoPosition.start({
          target: this._target,
          element: this._element,
          align,
          targetAlign,
          autoFlip: true,
          padTop: NUBBIN_SIZE,
          padLeft
        }).then(autoPositionUpdater => {
          // The calculation above may have flipped the alignment of the tooltip. When the
          // tooltip changes alignment we need to update the nubbin class to have it draw in
          // the appropriate place.
          if (autoPositionUpdater) {
            const tooltip = this._element();

            tooltip.align = autoPositionUpdater.config.align;
            tooltip.visible = this._visible;
          }
        });
      }

      stopPositioning() {
        if (this._autoPosition) {
          this._autoPosition.stop();
        }
      }

    }

    lwc.registerDecorators(Tooltip, {
      fields: ["_autoPosition", "_disabled", "_initialized", "_visible", "_config"]
    });

    function tmpl$3($api, $cmp, $slotset, $ctx) {
      return [];
    }

    var _tmpl$4 = lwc.registerTemplate(tmpl$3);
    tmpl$3.stylesheets = [];
    tmpl$3.stylesheetTokens = {
      hostAttribute: "lightning-primitiveButton_primitiveButton-host",
      shadowAttribute: "lightning-primitiveButton_primitiveButton"
    };

    const ARIA_DESCRIBEDBY$1 = 'aria-describedby';
    const ARIA_CONTROLS = 'aria-controls';
    /**
     * Primitive for button, buttonIcon and buttonIconStateful
     */

    class LightningPrimitiveButton extends lwc.LightningElement {
      /**
       * Specifies whether this button should be displayed in a disabled state.
       * Disabled buttons can't be clicked. This value defaults to false.
       *
       * @type {boolean}
       * @default false
       */
      get disabled() {
        return this.state.disabled;
      }

      set disabled(value) {
        this.state.disabled = normalizeBoolean(value);
      }

      set accessKey(value) {
        this.state.accesskey = value;
      }
      /**
       * Specifies a shortcut key to activate or focus an element.
       *
       * @type {string}
       */


      get accessKey() {
        return this.state.accesskey;
      }

      get computedAccessKey() {
        return this.state.accesskey;
      }
      /**
       * Displays tooltip text when the mouse cursor moves over the element.
       *
       * @type {string}
       */


      get title() {
        return this.state.title;
      }

      set title(value) {
        this.state.title = value;
      }
      /**
       * Label describing the button to assistive technologies.
       *
       * @type {string}
       */


      get ariaLabel() {
        return this.state.ariaLabel;
      }

      set ariaLabel(value) {
        this.state.ariaLabel = value;
      }

      get computedAriaLabel() {
        return this.state.ariaLabel;
      }
      /**
       * A space-separated list of element IDs that provide descriptive labels for the button.
       *
       * @type {string}
       */


      get ariaDescribedBy() {
        return this.state.ariaDescribedBy;
      }

      set ariaDescribedBy(value) {
        this.state.ariaDescribedBy = value;
        const button = this.template.querySelector('button');
        synchronizeAttrs(button, {
          [ARIA_DESCRIBEDBY$1]: value
        });
      }
      /**
       * A space-separated list of element IDs whose presence or content is controlled by this button.
       *
       * @type {string}
       */


      get ariaControls() {
        return this.state.ariaControls;
      }

      set ariaControls(value) {
        this.state.ariaControls = value;
        const button = this.template.querySelector('button');
        synchronizeAttrs(button, {
          [ARIA_CONTROLS]: value
        });
      }
      /**
       * Indicates whether an element that the button controls is expanded or collapsed.
       * Valid values are 'true' or 'false'. The default value is undefined.
       *
       * @type {string}
       * @default undefined
       */


      get ariaExpanded() {
        return this.state.ariaExpanded;
      }

      set ariaExpanded(value) {
        this.state.ariaExpanded = normalizeString(value, {
          fallbackValue: undefined,
          validValues: ['true', 'false']
        });
      }

      get computedAriaExpanded() {
        return this.state.ariaExpanded || null;
      }

      set ariaLive(value) {
        this.state.ariaLive = value;
      }
      /**
       * Indicates that the button can be updated when it doesn't have focus.
       * Valid values are 'polite', 'assertive', or 'off'. The polite value causes assistive
       * technologies to notify users of updates at a low priority, generally without interrupting.
       * The assertive value causes assistive technologies to notify users immediately,
       * potentially clearing queued speech updates.
       *
       * @type {string}
       */


      get ariaLive() {
        return this.state.ariaLive;
      }

      get computedAriaLive() {
        return this.state.ariaLive;
      }
      /**
       * Indicates whether assistive technologies present all, or only parts of,
       * the changed region. Valid values are 'true' or 'false'.
       *
       * @type {string}
       */


      get ariaAtomic() {
        return this.state.ariaAtomic || null;
      }

      set ariaAtomic(value) {
        this.state.ariaAtomic = normalizeString(value, {
          fallbackValue: undefined,
          validValues: ['true', 'false']
        });
      }

      get computedAriaAtomic() {
        return this.state.ariaAtomic || null;
      }
      /**
       * Sets focus on the element.
       */


      focus() {}

      constructor() {
        super(); // Workaround for an IE11 bug where click handlers on button ancestors
        // receive the click event even if the button element has the `disabled`
        // attribute set.

        this._initialized = false;
        this.state = {
          accesskey: null,
          ariaAtomic: null,
          ariaControls: null,
          ariaDescribedBy: null,
          ariaExpanded: null,
          ariaLabel: null,
          ariaLive: null,
          disabled: false
        };

        if (isIE11) {
          this.template.addEventListener('click', event => {
            if (this.disabled) {
              event.stopImmediatePropagation();
            }
          });
        }
      }

      renderedCallback() {
        if (!this._initialized) {
          const button = this.template.querySelector('button');
          synchronizeAttrs(button, {
            [ARIA_CONTROLS]: this.state.ariaControls,
            [ARIA_DESCRIBEDBY$1]: this.state.ariaDescribedBy
          });
          this._initialized = true;
        }
      }

    }

    lwc.registerDecorators(LightningPrimitiveButton, {
      publicProps: {
        disabled: {
          config: 3
        },
        accessKey: {
          config: 3
        },
        title: {
          config: 3
        },
        ariaLabel: {
          config: 3
        },
        ariaDescribedBy: {
          config: 3
        },
        ariaControls: {
          config: 3
        },
        ariaExpanded: {
          config: 3
        },
        ariaLive: {
          config: 3
        },
        ariaAtomic: {
          config: 3
        }
      },
      publicMethods: ["focus"],
      track: {
        state: 1
      },
      fields: ["_initialized"]
    });

    var LightningPrimitiveButton$1 = lwc.registerComponent(LightningPrimitiveButton, {
      tmpl: _tmpl$4
    });

    const DEFAULT_SIZE = 'medium';
    const DEFAULT_VARIANT = 'border';
    const DEFAULT_TYPE = 'button';
    /**
     * An icon-only HTML button.
     */

    class LightningButtonIcon extends LightningPrimitiveButton$1 {
      constructor(...args) {
        super(...args);
        this.name = void 0;
        this.value = void 0;
        this.variant = DEFAULT_VARIANT;
        this.iconName = void 0;
        this.iconClass = void 0;
        this.size = DEFAULT_SIZE;
        this.type = DEFAULT_TYPE;
        this.alternativeText = void 0;
        this._order = null;
        this._tooltip = null;
      }

      // remove-next-line-for-c-namespace

      /**
       * Text to display when the user mouses over or focuses on the button.
       * The tooltip is auto-positioned relative to the button and screen space.
       * @type {string}
       * @param {string} value - The plain text string for the tooltip
       */
      set tooltip(value) {
        if (this._tooltip) {
          this._tooltip.value = value;
        } else if (value) {
          // Note that because the tooltip target is a child element it may not be present in the
          // dom during initial rendering.
          this._tooltip = new Tooltip(value, {
            root: this,
            target: () => this.template.querySelector('button')
          });

          this._tooltip.initialize();
        }
      } // remove-next-line-for-c-namespace


      get tooltip() {
        return this._tooltip ? this._tooltip.value : undefined;
      }

      // this is there because raptor currently doesnt support inheritance
      render() {
        return _tmpl$2;
      }

      get computedTitle() {
        return this.state.title || this.alternativeText || '';
      }

      get normalizedVariant() {
        return normalizeString(this.variant, {
          fallbackValue: DEFAULT_VARIANT,
          validValues: ['bare', 'brand', 'container', 'border', 'border-filled', 'bare-inverse', 'border-inverse']
        });
      }

      get normalizedType() {
        return normalizeString(this.type, {
          fallbackValue: DEFAULT_TYPE,
          validValues: ['button', 'reset', 'submit']
        });
      }

      get normalizedSize() {
        return normalizeString(this.size, {
          fallbackValue: DEFAULT_SIZE,
          validValues: ['xx-small', 'x-small', 'small', 'medium', 'large']
        });
      }

      getVariantBase() {
        return this.normalizedVariant.split('-')[0];
      }

      getVariantModifier() {
        return this.normalizedVariant.split('-')[1] || '';
      }

      get computedButtonClass() {
        const {
          normalizedSize,
          normalizedVariant
        } = this;
        const isBare = this.getVariantBase(normalizedSize) === 'bare';
        const classes = classSet('slds-button');
        classes.add('slds-button_icon');

        if (!isBare) {
          // If the variant is not bare, then size the button instead of the icon
          switch (normalizedSize) {
            case 'small':
              classes.add('slds-button_icon-small');
              break;

            case 'x-small':
              classes.add('slds-button_icon-x-small');
              break;

            case 'xx-small':
              classes.add('slds-button_icon-xx-small');
              break;

            case 'large':
              // There is no `large` modifier for buttons so we should drop down one size to `medium`
              console.warn(`<lightning-button-icon> The non-bare variants of buttonIcon do not support a size value of "large". Supported values include "xx-small", "x-small", "small", and "medium". Falling back to size value "medium".`);
          }
        }

        return classes.add({
          'slds-button_icon-bare': isBare,
          'slds-button_icon-container': normalizedVariant === 'container',
          'slds-button_icon-border': normalizedVariant === 'border',
          'slds-button_icon-border-filled': normalizedVariant === 'border-filled',
          'slds-button_icon-border-inverse': normalizedVariant === 'border-inverse',
          'slds-button_icon-inverse': normalizedVariant === 'bare-inverse',
          'slds-button_icon-brand': normalizedVariant === 'brand',
          'slds-button_first': this._order === 'first',
          'slds-button_middle': this._order === 'middle',
          'slds-button_last': this._order === 'last'
        }).toString();
      }

      get computedIconClass() {
        const {
          normalizedSize,
          normalizedVariant
        } = this;
        const isBare = this.getVariantBase(normalizedVariant) === 'bare';
        const iconClass = this.iconClass || '';
        const classes = classSet('slds-button__icon');
        classes.add(iconClass);

        if (isBare) {
          // If the variant is bare, then size the icon instead of the button
          switch (normalizedSize) {
            case 'large':
              classes.add('slds-button__icon_large');
              break;

            case 'small':
              classes.add('slds-button__icon_small');
              break;

            case 'xx-small':
              // There is no `xx-small` modifier for bare so we should drop down one size to `x-small`
              console.warn(`<lightning-button-icon> The bare variant of buttonIcon does not support a size value of "xx-small". Supported values include "x-small", "small", "medium", and "large". The default is "medium".`);

            /* falls through */

            case 'x-small':
              classes.add('slds-button__icon_x-small');
              break;
          }
        }

        if (this.getVariantModifier(normalizedVariant) === 'inverse') {
          classes.add('slds-button_icon-inverse');
        }

        return classes.toString();
      }

      handleFocus() {
        this.dispatchEvent(new CustomEvent('focus'));
      }

      handleBlur() {
        this.dispatchEvent(new CustomEvent('blur'));
      }
      /**
       * Sets focus on the button.
       */


      focus() {
        if (this._connected) {
          this.template.querySelector('button').focus();
        }
      }
      /**
       * Clicks the button.
       */


      click() {
        if (this._connected) {
          this.template.querySelector('button').click();
        }
      }
      /**
       * {Function} setOrder - Sets the order value of the button when in the context of a button-group or other ordered component
       * @param {String} order -  The order string (first, middle, last)
       */


      setOrder(order) {
        this._order = order;
      }
      /**
       * Once we are connected, we fire a register event so the button-group (or other) component can register
       * the buttons.
       */


      connectedCallback() {
        this._connected = true;
        const privatebuttonregister = new CustomEvent('privatebuttonregister', {
          bubbles: true,
          detail: {
            callbacks: {
              setOrder: this.setOrder.bind(this),
              setDeRegistrationCallback: deRegistrationCallback => {
                this._deRegistrationCallback = deRegistrationCallback;
              }
            }
          }
        });
        this.dispatchEvent(privatebuttonregister);
      } // remove-next-line-for-c-namespace


      renderedCallback() {
        // initialize aria attributes in primitiveButton
        super.renderedCallback();

        if (this._tooltip && !this._tooltip.initialized) {
          this._tooltip.initialize();
        }
      }

      disconnectedCallback() {
        this._connected = false;

        if (this._deRegistrationCallback) {
          this._deRegistrationCallback();
        }
      }

    }

    LightningButtonIcon.delegatesFocus = true;

    lwc.registerDecorators(LightningButtonIcon, {
      publicProps: {
        name: {
          config: 0
        },
        value: {
          config: 0
        },
        variant: {
          config: 0
        },
        iconName: {
          config: 0
        },
        iconClass: {
          config: 0
        },
        size: {
          config: 0
        },
        type: {
          config: 0
        },
        alternativeText: {
          config: 0
        },
        tooltip: {
          config: 3
        }
      },
      publicMethods: ["focus", "click"],
      track: {
        _order: 1
      },
      fields: ["_tooltip"]
    });

    var _lightningButtonIcon = lwc.registerComponent(LightningButtonIcon, {
      tmpl: _tmpl$2
    });

    function tmpl$4($api, $cmp, $slotset, $ctx) {
      const {
        b: api_bind,
        c: api_custom_element,
        d: api_dynamic,
        h: api_element,
        s: api_slot,
        gid: api_scoped_id
      } = $api;
      const {
        _m0,
        _m1,
        _m2
      } = $ctx;
      return [$cmp.showModal ? api_element("section", {
        classMap: {
          "slds-modal": true,
          "slds-fade-in-open": true
        },
        attrs: {
          "role": "dialog",
          "tabindex": "-1",
          "aria-labelledby": `${api_scoped_id("modal-heading-01")}`,
          "aria-modal": "true",
          "aria-describedby": `${api_scoped_id("modal-content-id-1")}`
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
        key: 6
      }, [api_custom_element("lightning-button-icon", _lightningButtonIcon, {
        classMap: {
          "slds-modal__close": true
        },
        props: {
          "title": "Close",
          "iconName": "utility:close",
          "iconClass": "slds-button_icon-inverse"
        },
        key: 0,
        on: {
          "click": _m0 || ($ctx._m0 = api_bind($cmp.handleDialogClose))
        }
      }, []), $cmp.hasHeaderString ? api_element("h2", {
        classMap: {
          "slds-text-heading_medium": true,
          "slds-hyphenate": true,
          "header-string": true
        },
        key: 1
      }, [api_dynamic($cmp.header)]) : null, !$cmp.hasHeaderString ? api_element("h2", {
        classMap: {
          "slds-text-heading_medium": true,
          "slds-hyphenate": true,
          "header-slot": true
        },
        key: 3
      }, [api_slot("header", {
        attrs: {
          "name": "header"
        },
        key: 2
      }, [], $slotset)]) : null, api_element("p", {
        classMap: {
          "slds-m-top_x-small": true,
          "modal-hidden": true
        },
        key: 5
      }, [api_slot("tagline", {
        attrs: {
          "name": "tagline"
        },
        key: 4,
        on: {
          "slotchange": _m1 || ($ctx._m1 = api_bind($cmp.handeSlotTaglineChange))
        }
      }, [], $slotset)])]), api_element("div", {
        classMap: {
          "slds-modal__content": true,
          "slds-p-around_medium": true
        },
        attrs: {
          "id": api_scoped_id("modal-content-id-1")
        },
        key: 8
      }, [api_slot("", {
        key: 7
      }, [], $slotset)]), api_element("footer", {
        classMap: {
          "slds-modal__footer": true,
          "modal-hidden": true
        },
        key: 10
      }, [api_slot("footer", {
        attrs: {
          "name": "footer"
        },
        key: 9,
        on: {
          "slotchange": _m2 || ($ctx._m2 = api_bind($cmp.handleSlotFooterChange))
        }
      }, [], $slotset)])])]) : null, $cmp.showModal ? api_element("div", {
        classMap: {
          "slds-backdrop": true,
          "slds-backdrop_open": true
        },
        key: 13
      }, []) : null];
    }

    var _tmpl$5 = lwc.registerTemplate(tmpl$4);
    tmpl$4.slots = ["header", "tagline", "", "footer"];
    tmpl$4.stylesheets = [];

    if (_implicitStylesheets) {
      tmpl$4.stylesheets.push.apply(tmpl$4.stylesheets, _implicitStylesheets);
    }
    tmpl$4.stylesheetTokens = {
      hostAttribute: "lwc-modal_modal-host",
      shadowAttribute: "lwc-modal_modal"
    };

    const CSS_CLASS = 'modal-hidden';

    class Modal extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.showModal = false;
        this.hasHeaderString = false;
        this._headerPrivate = void 0;
      }

      set header(value) {
        this.hasHeaderString = value !== '';
        this._headerPrivate = value;
      }

      get header() {
        return this._headerPrivate;
      }

      show() {
        this.showModal = true;
      }

      hide() {
        this.showModal = false;
      }

      handleDialogClose() {
        //Let parent know that dialog is closed (mainly by that cross button) so it can set proper variables if needed
        const closedialog = new CustomEvent('closedialog');
        this.dispatchEvent(closedialog);
        this.hide();
      }

      handleSlotTaglineChange() {
        //No need to do anything as modal is not visible anymore
        //Otherwise querySelector may return null
        //https://github.com/SalesforceLabs/InventoryManagerNP/issues/4
        if (this.showModal === false) {
          return;
        }

        const taglineEl = this.template.querySelector('p');
        taglineEl.classList.remove(CSS_CLASS);
      }

      handleSlotFooterChange() {
        //No need to do anything as modal is not visible anymore
        //Otherwise querySelector may return null
        //https://github.com/SalesforceLabs/InventoryManagerNP/issues/4
        if (this.showModal === false) {
          return;
        }

        const footerEl = this.template.querySelector('footer');
        footerEl.classList.remove(CSS_CLASS);
      }

    }

    lwc.registerDecorators(Modal, {
      publicProps: {
        header: {
          config: 3
        }
      },
      publicMethods: ["show", "hide"],
      track: {
        showModal: 1,
        hasHeaderString: 1
      },
      fields: ["_headerPrivate"]
    });

    var modal = lwc.registerComponent(Modal, {
      tmpl: _tmpl$5
    });

    return modal;

});
