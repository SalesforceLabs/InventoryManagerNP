Webruntime.define('lwc', ['exports'], function (exports) { 'use strict';

  /* proxy-compat-disable */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  function detect() {
    // Don't apply polyfill when ProxyCompat is enabled.
    if ('getKey' in Proxy) {
      return false;
    }

    const proxy = new Proxy([3, 4], {});
    const res = [1, 2].concat(proxy);
    return res.length !== 4;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const {
    isConcatSpreadable
  } = Symbol;
  const {
    isArray
  } = Array;
  const {
    slice: ArraySlice,
    unshift: ArrayUnshift,
    shift: ArrayShift
  } = Array.prototype;

  function isObject(O) {
    return typeof O === 'object' ? O !== null : typeof O === 'function';
  } // https://www.ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable


  function isSpreadable(O) {
    if (!isObject(O)) {
      return false;
    }

    const spreadable = O[isConcatSpreadable];
    return spreadable !== undefined ? Boolean(spreadable) : isArray(O);
  } // https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.concat


  function ArrayConcatPolyfill(..._args) {
    const O = Object(this);
    const A = [];
    let N = 0;
    const items = ArraySlice.call(arguments);
    ArrayUnshift.call(items, O);

    while (items.length) {
      const E = ArrayShift.call(items);

      if (isSpreadable(E)) {
        let k = 0;
        const length = E.length;

        for (k; k < length; k += 1, N += 1) {
          if (k in E) {
            const subElement = E[k];
            A[N] = subElement;
          }
        }
      } else {
        A[N] = E;
        N += 1;
      }
    }

    return A;
  }

  function apply() {
    Array.prototype.concat = ArrayConcatPolyfill;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  if (detect()) {
    apply();
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function detect$1(propName) {
    return Object.getOwnPropertyDescriptor(Element.prototype, propName) === undefined;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const {
    hasAttribute,
    getAttribute,
    setAttribute,
    setAttributeNS,
    removeAttribute,
    removeAttributeNS
  } = Element.prototype;
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // that doesn't follow the regular transformation process. e.g.: `aria-labeledby` <=> `ariaLabelBy`

  const ARIA_REGEX = /^aria/;
  const nodeToAriaPropertyValuesMap = new WeakMap();
  const {
    hasOwnProperty
  } = Object.prototype;
  const {
    replace: StringReplace,
    toLowerCase: StringToLowerCase
  } = String.prototype;

  function getAriaPropertyMap(elm) {
    let map = nodeToAriaPropertyValuesMap.get(elm);

    if (map === undefined) {
      map = {};
      nodeToAriaPropertyValuesMap.set(elm, map);
    }

    return map;
  }

  function getNormalizedAriaPropertyValue(value) {
    return value == null ? null : value + '';
  }

  function createAriaPropertyPropertyDescriptor(propName, attrName) {
    return {
      get() {
        const map = getAriaPropertyMap(this);

        if (hasOwnProperty.call(map, propName)) {
          return map[propName];
        } // otherwise just reflect what's in the attribute


        return hasAttribute.call(this, attrName) ? getAttribute.call(this, attrName) : null;
      },

      set(newValue) {
        const normalizedValue = getNormalizedAriaPropertyValue(newValue);
        const map = getAriaPropertyMap(this);
        map[propName] = normalizedValue; // reflect into the corresponding attribute

        if (newValue === null) {
          removeAttribute.call(this, attrName);
        } else {
          setAttribute.call(this, attrName, newValue);
        }
      },

      configurable: true,
      enumerable: true
    };
  }

  function patch(propName) {
    // Typescript is inferring the wrong function type for this particular
    // overloaded method: https://github.com/Microsoft/TypeScript/issues/27972
    // @ts-ignore type-mismatch
    const replaced = StringReplace.call(propName, ARIA_REGEX, 'aria-');
    const attrName = StringToLowerCase.call(replaced);
    const descriptor = createAriaPropertyPropertyDescriptor(propName, attrName);
    Object.defineProperty(Element.prototype, propName, descriptor);
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // https://wicg.github.io/aom/spec/aria-reflection.html


  const ElementPrototypeAriaPropertyNames = ['ariaAutoComplete', 'ariaChecked', 'ariaCurrent', 'ariaDisabled', 'ariaExpanded', 'ariaHasPopup', 'ariaHidden', 'ariaInvalid', 'ariaLabel', 'ariaLevel', 'ariaMultiLine', 'ariaMultiSelectable', 'ariaOrientation', 'ariaPressed', 'ariaReadOnly', 'ariaRequired', 'ariaSelected', 'ariaSort', 'ariaValueMax', 'ariaValueMin', 'ariaValueNow', 'ariaValueText', 'ariaLive', 'ariaRelevant', 'ariaAtomic', 'ariaBusy', 'ariaActiveDescendant', 'ariaControls', 'ariaDescribedBy', 'ariaFlowTo', 'ariaLabelledBy', 'ariaOwns', 'ariaPosInSet', 'ariaSetSize', 'ariaColCount', 'ariaColIndex', 'ariaDetails', 'ariaErrorMessage', 'ariaKeyShortcuts', 'ariaModal', 'ariaPlaceholder', 'ariaRoleDescription', 'ariaRowCount', 'ariaRowIndex', 'ariaRowSpan', 'ariaColSpan', 'role'];
  /**
   * Note: Attributes aria-dropeffect and aria-grabbed were deprecated in
   * ARIA 1.1 and do not have corresponding IDL attributes.
   */

  for (let i = 0, len = ElementPrototypeAriaPropertyNames.length; i < len; i += 1) {
    const propName = ElementPrototypeAriaPropertyNames[i];

    if (detect$1(propName)) {
      patch(propName);
    }
  }
  /**
   * Copyright (C) 2018 salesforce.com, inc.
   */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function invariant(value, msg) {
    if (!value) {
      throw new Error(`Invariant Violation: ${msg}`);
    }
  }

  function isTrue(value, msg) {
    if (!value) {
      throw new Error(`Assert Violation: ${msg}`);
    }
  }

  function isFalse(value, msg) {
    if (value) {
      throw new Error(`Assert Violation: ${msg}`);
    }
  }

  function fail(msg) {
    throw new Error(msg);
  }

  var assert = /*#__PURE__*/Object.freeze({
    __proto__: null,
    invariant: invariant,
    isTrue: isTrue,
    isFalse: isFalse,
    fail: fail
  });
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  const {
    assign,
    create,
    defineProperties,
    defineProperty,
    freeze,
    getOwnPropertyDescriptor,
    getOwnPropertyNames,
    getPrototypeOf,
    hasOwnProperty: hasOwnProperty$1,
    keys,
    seal,
    setPrototypeOf
  } = Object;
  const {
    isArray: isArray$1
  } = Array;
  const {
    filter: ArrayFilter,
    find: ArrayFind,
    forEach,
    indexOf: ArrayIndexOf,
    join: ArrayJoin,
    map: ArrayMap,
    push: ArrayPush,
    reduce: ArrayReduce,
    reverse: ArrayReverse,
    slice: ArraySlice$1,
    splice: ArraySplice,
    unshift: ArrayUnshift$1
  } = Array.prototype;
  const {
    charCodeAt: StringCharCodeAt,
    replace: StringReplace$1,
    slice: StringSlice,
    toLowerCase: StringToLowerCase$1
  } = String.prototype;

  function isUndefined(obj) {
    return obj === undefined;
  }

  function isNull(obj) {
    return obj === null;
  }

  function isTrue$1(obj) {
    return obj === true;
  }

  function isFalse$1(obj) {
    return obj === false;
  }

  function isFunction(obj) {
    return typeof obj === 'function';
  }

  function isObject$1(obj) {
    return typeof obj === 'object';
  }

  function isString(obj) {
    return typeof obj === 'string';
  }

  function isNumber(obj) {
    return typeof obj === 'number';
  }

  const OtS = {}.toString;

  function toString(obj) {
    if (obj && obj.toString) {
      // Arrays might hold objects with "null" prototype So using
      // Array.prototype.toString directly will cause an error Iterate through
      // all the items and handle individually.
      if (isArray$1(obj)) {
        return ArrayJoin.call(ArrayMap.call(obj, toString), ',');
      }

      return obj.toString();
    } else if (typeof obj === 'object') {
      return OtS.call(obj);
    } else {
      return obj + emptyString;
    }
  }

  function getPropertyDescriptor(o, p) {
    do {
      const d = getOwnPropertyDescriptor(o, p);

      if (!isUndefined(d)) {
        return d;
      }

      o = getPrototypeOf(o);
    } while (o !== null);
  }

  const emptyString = '';
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /*
   * In IE11, symbols are expensive.
   * Due to the nature of the symbol polyfill. This method abstract the
   * creation of symbols, so we can fallback to string when native symbols
   * are not supported. Note that we can't use typeof since it will fail when transpiling.
   */

  const hasNativeSymbolsSupport = Symbol('x').toString() === 'Symbol(x)';

  function createHiddenField(key, namespace) {
    return hasNativeSymbolsSupport ? Symbol(key) : `$$lwc-${namespace}-${key}$$`;
  }

  const hiddenFieldsMap = new WeakMap();

  function setHiddenField(o, field, value) {
    let valuesByField = hiddenFieldsMap.get(o);

    if (isUndefined(valuesByField)) {
      valuesByField = create(null);
      hiddenFieldsMap.set(o, valuesByField);
    }

    valuesByField[field] = value;
  }

  function getHiddenField(o, field) {
    const valuesByField = hiddenFieldsMap.get(o);

    if (!isUndefined(valuesByField)) {
      return valuesByField[field];
    }
  }
  /** version: 1.1.13-224.5 */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const defaultDefHTMLPropertyNames = ['accessKey', 'dir', 'draggable', 'hidden', 'id', 'lang', 'tabIndex', 'title']; // Few more exceptions that are using the attribute name to match the property in lowercase.
  // this list was compiled from https://msdn.microsoft.com/en-us/library/ms533062(v=vs.85).aspx
  // and https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
  // Note: this list most be in sync with the compiler as well.

  const HTMLPropertyNamesWithLowercasedReflectiveAttributes = ['accessKey', 'readOnly', 'tabIndex', 'bgColor', 'colSpan', 'rowSpan', 'contentEditable', 'dateTime', 'formAction', 'isMap', 'maxLength', 'useMap'];

  function offsetPropertyErrorMessage(name) {
    return `Using the \`${name}\` property is an anti-pattern because it rounds the value to an integer. Instead, use the \`getBoundingClientRect\` method to obtain fractional values for the size of an element and its position relative to the viewport.`;
  } // Global HTML Attributes & Properties
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement


  const globalHTMLProperties = assign(create(null), {
    accessKey: {
      attribute: 'accesskey'
    },
    accessKeyLabel: {
      readOnly: true
    },
    className: {
      attribute: 'class',
      error: 'Using the `className` property is an anti-pattern because of slow runtime behavior and potential conflicts with classes provided by the owner element. Use the `classList` API instead.'
    },
    contentEditable: {
      attribute: 'contenteditable'
    },
    dataset: {
      readOnly: true,
      error: "Using the `dataset` property is an anti-pattern because it can't be statically analyzed. Expose each property individually using the `@api` decorator instead."
    },
    dir: {
      attribute: 'dir'
    },
    draggable: {
      attribute: 'draggable'
    },
    dropzone: {
      attribute: 'dropzone',
      readOnly: true
    },
    hidden: {
      attribute: 'hidden'
    },
    id: {
      attribute: 'id'
    },
    inputMode: {
      attribute: 'inputmode'
    },
    lang: {
      attribute: 'lang'
    },
    slot: {
      attribute: 'slot',
      error: 'Using the `slot` property is an anti-pattern.'
    },
    spellcheck: {
      attribute: 'spellcheck'
    },
    style: {
      attribute: 'style'
    },
    tabIndex: {
      attribute: 'tabindex'
    },
    title: {
      attribute: 'title'
    },
    translate: {
      attribute: 'translate'
    },
    // additional "global attributes" that are not present in the link above.
    isContentEditable: {
      readOnly: true
    },
    offsetHeight: {
      readOnly: true,
      error: offsetPropertyErrorMessage('offsetHeight')
    },
    offsetLeft: {
      readOnly: true,
      error: offsetPropertyErrorMessage('offsetLeft')
    },
    offsetParent: {
      readOnly: true
    },
    offsetTop: {
      readOnly: true,
      error: offsetPropertyErrorMessage('offsetTop')
    },
    offsetWidth: {
      readOnly: true,
      error: offsetPropertyErrorMessage('offsetWidth')
    },
    role: {
      attribute: 'role'
    }
  });
  const AttrNameToPropNameMap = create(null);
  const PropNameToAttrNameMap = create(null); // Synthetic creation of all AOM property descriptors for Custom Elements

  forEach.call(ElementPrototypeAriaPropertyNames, propName => {
    // Typescript is inferring the wrong function type for this particular
    // overloaded method: https://github.com/Microsoft/TypeScript/issues/27972
    // @ts-ignore type-mismatch
    const attrName = StringToLowerCase$1.call(StringReplace$1.call(propName, /^aria/, 'aria-'));
    AttrNameToPropNameMap[attrName] = propName;
    PropNameToAttrNameMap[propName] = attrName;
  });
  forEach.call(defaultDefHTMLPropertyNames, propName => {
    const attrName = StringToLowerCase$1.call(propName);
    AttrNameToPropNameMap[attrName] = propName;
    PropNameToAttrNameMap[propName] = attrName;
  });
  forEach.call(HTMLPropertyNamesWithLowercasedReflectiveAttributes, propName => {
    const attrName = StringToLowerCase$1.call(propName);
    AttrNameToPropNameMap[attrName] = propName;
    PropNameToAttrNameMap[propName] = attrName;
  });
  const CAMEL_REGEX = /-([a-z])/g;
  /**
   * This method maps between attribute names
   * and the corresponding property name.
   */

  function getPropNameFromAttrName(attrName) {
    if (isUndefined(AttrNameToPropNameMap[attrName])) {
      AttrNameToPropNameMap[attrName] = StringReplace$1.call(attrName, CAMEL_REGEX, g => g[1].toUpperCase());
    }

    return AttrNameToPropNameMap[attrName];
  }

  const CAPS_REGEX = /[A-Z]/g;
  /**
   * This method maps between property names
   * and the corresponding attribute name.
   */

  function getAttrNameFromPropName(propName) {
    if (isUndefined(PropNameToAttrNameMap[propName])) {
      PropNameToAttrNameMap[propName] = StringReplace$1.call(propName, CAPS_REGEX, match => '-' + match.toLowerCase());
    }

    return PropNameToAttrNameMap[propName];
  }

  let controlledElement = null;
  let controlledAttributeName;

  function isAttributeLocked(elm, attrName) {
    return elm !== controlledElement || attrName !== controlledAttributeName;
  }

  function lockAttribute(_elm, _key) {
    controlledElement = null;
    controlledAttributeName = undefined;
  }

  function unlockAttribute(elm, key) {
    controlledElement = elm;
    controlledAttributeName = key;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  let nextTickCallbackQueue = [];
  const SPACE_CHAR = 32;
  const EmptyObject = seal(create(null));
  const EmptyArray = seal([]);

  function flushCallbackQueue() {
    {
      if (nextTickCallbackQueue.length === 0) {
        throw new Error(`Internal Error: If callbackQueue is scheduled, it is because there must be at least one callback on this pending queue.`);
      }
    }

    const callbacks = nextTickCallbackQueue;
    nextTickCallbackQueue = []; // reset to a new queue

    for (let i = 0, len = callbacks.length; i < len; i += 1) {
      callbacks[i]();
    }
  }

  function addCallbackToNextTick(callback) {
    {
      if (!isFunction(callback)) {
        throw new Error(`Internal Error: addCallbackToNextTick() can only accept a function callback`);
      }
    }

    if (nextTickCallbackQueue.length === 0) {
      Promise.resolve().then(flushCallbackQueue);
    }

    ArrayPush.call(nextTickCallbackQueue, callback);
  }

  function isCircularModuleDependency(value) {
    return hasOwnProperty$1.call(value, '__circular__');
  }
  /**
   * When LWC is used in the context of an Aura application, the compiler produces AMD
   * modules, that doesn't resolve properly circular dependencies between modules. In order
   * to circumvent this issue, the module loader returns a factory with a symbol attached
   * to it.
   *
   * This method returns the resolved value if it received a factory as argument. Otherwise
   * it returns the original value.
   */


  function resolveCircularModuleDependency(fn) {
    {
      if (!isFunction(fn)) {
        throw new TypeError(`Circular module dependency must be a function.`);
      }
    }

    return fn();
  }

  const useSyntheticShadow = hasOwnProperty$1.call(Element.prototype, '$shadowToken$');
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  function getComponentTag(vm) {
    // Element.prototype.tagName getter might be poisoned. We need to use a try/catch to protect the
    // engine internal when accessing the tagName property.
    try {
      return `<${StringToLowerCase$1.call(vm.elm.tagName)}>`;
    } catch (error) {
      return '<invalid-tag-name>';
    }
  } // TODO [#1695]: Unify getComponentStack and getErrorComponentStack


  function getComponentStack(vm) {
    const stack = [];
    let prefix = '';

    while (!isNull(vm.owner)) {
      ArrayPush.call(stack, prefix + getComponentTag(vm));
      vm = vm.owner;
      prefix += '\t';
    }

    return ArrayJoin.call(stack, '\n');
  }

  function getErrorComponentStack(vm) {
    const wcStack = [];
    let currentVm = vm;

    while (!isNull(currentVm)) {
      ArrayPush.call(wcStack, getComponentTag(currentVm));
      currentVm = currentVm.owner;
    }

    return wcStack.reverse().join('\n\t');
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function logError(message, vm) {
    let msg = `[LWC error]: ${message}`;

    if (!isUndefined(vm)) {
      msg = `${msg}\n${getComponentStack(vm)}`;
    }

    try {
      throw new Error(msg);
    } catch (e) {
      /* eslint-disable-next-line no-console */
      console.error(e);
    }
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function handleEvent(event, vnode) {
    const {
      type
    } = event;
    const {
      data: {
        on
      }
    } = vnode;
    const handler = on && on[type]; // call event handler if exists

    if (handler) {
      handler.call(undefined, event);
    }
  }

  function createListener() {
    return function handler(event) {
      handleEvent(event, handler.vnode);
    };
  }

  function updateAllEventListeners(oldVnode, vnode) {
    if (isUndefined(oldVnode.listener)) {
      createAllEventListeners(vnode);
    } else {
      vnode.listener = oldVnode.listener;
      vnode.listener.vnode = vnode;
    }
  }

  function createAllEventListeners(vnode) {
    const {
      data: {
        on
      }
    } = vnode;

    if (isUndefined(on)) {
      return;
    }

    const elm = vnode.elm;
    const listener = vnode.listener = createListener();
    listener.vnode = vnode;
    let name;

    for (name in on) {
      elm.addEventListener(name, listener);
    }
  }

  var modEvents = {
    update: updateAllEventListeners,
    create: createAllEventListeners
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  const xlinkNS = 'http://www.w3.org/1999/xlink';
  const xmlNS = 'http://www.w3.org/XML/1998/namespace';
  const ColonCharCode = 58;

  function updateAttrs(oldVnode, vnode) {
    const {
      data: {
        attrs
      }
    } = vnode;

    if (isUndefined(attrs)) {
      return;
    }

    let {
      data: {
        attrs: oldAttrs
      }
    } = oldVnode;

    if (oldAttrs === attrs) {
      return;
    }

    {
      assert.invariant(isUndefined(oldAttrs) || keys(oldAttrs).join(',') === keys(attrs).join(','), `vnode.data.attrs cannot change shape.`);
    }

    const elm = vnode.elm;
    let key;
    oldAttrs = isUndefined(oldAttrs) ? EmptyObject : oldAttrs; // update modified attributes, add new attributes
    // this routine is only useful for data-* attributes in all kind of elements
    // and aria-* in standard elements (custom elements will use props for these)

    for (key in attrs) {
      const cur = attrs[key];
      const old = oldAttrs[key];

      if (old !== cur) {
        unlockAttribute(elm, key);

        if (StringCharCodeAt.call(key, 3) === ColonCharCode) {
          // Assume xml namespace
          elm.setAttributeNS(xmlNS, key, cur);
        } else if (StringCharCodeAt.call(key, 5) === ColonCharCode) {
          // Assume xlink namespace
          elm.setAttributeNS(xlinkNS, key, cur);
        } else if (isNull(cur)) {
          elm.removeAttribute(key);
        } else {
          elm.setAttribute(key, cur);
        }

        lockAttribute();
      }
    }
  }

  const emptyVNode = {
    data: {}
  };
  var modAttrs = {
    create: vnode => updateAttrs(emptyVNode, vnode),
    update: updateAttrs
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  function isLiveBindingProp(sel, key) {
    // For properties with live bindings, we read values from the DOM element
    // instead of relying on internally tracked values.
    return sel === 'input' && (key === 'value' || key === 'checked');
  }

  function update(oldVnode, vnode) {
    const props = vnode.data.props;

    if (isUndefined(props)) {
      return;
    }

    const oldProps = oldVnode.data.props;

    if (oldProps === props) {
      return;
    }

    {
      assert.invariant(isUndefined(oldProps) || keys(oldProps).join(',') === keys(props).join(','), 'vnode.data.props cannot change shape.');
    }

    const elm = vnode.elm;
    const isFirstPatch = isUndefined(oldProps);
    const {
      sel
    } = vnode;

    for (const key in props) {
      const cur = props[key];

      {
        if (!(key in elm)) {
          // TODO [#1297]: Move this validation to the compiler
          assert.fail(`Unknown public property "${key}" of element <${sel}>. This is likely a typo on the corresponding attribute "${getAttrNameFromPropName(key)}".`);
        }
      } // if it is the first time this element is patched, or the current value is different to the previous value...


      if (isFirstPatch || cur !== (isLiveBindingProp(sel, key) ? elm[key] : oldProps[key])) {
        elm[key] = cur;
      }
    }
  }

  const emptyVNode$1 = {
    data: {}
  };
  var modProps = {
    create: vnode => update(emptyVNode$1, vnode),
    update
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  const classNameToClassMap = create(null);

  function getMapFromClassName(className) {
    // Intentionally using == to match undefined and null values from computed style attribute
    if (className == null) {
      return EmptyObject;
    } // computed class names must be string


    className = isString(className) ? className : className + '';
    let map = classNameToClassMap[className];

    if (map) {
      return map;
    }

    map = create(null);
    let start = 0;
    let o;
    const len = className.length;

    for (o = 0; o < len; o++) {
      if (StringCharCodeAt.call(className, o) === SPACE_CHAR) {
        if (o > start) {
          map[StringSlice.call(className, start, o)] = true;
        }

        start = o + 1;
      }
    }

    if (o > start) {
      map[StringSlice.call(className, start, o)] = true;
    }

    classNameToClassMap[className] = map;

    {
      // just to make sure that this object never changes as part of the diffing algo
      freeze(map);
    }

    return map;
  }

  function updateClassAttribute(oldVnode, vnode) {
    const {
      elm,
      data: {
        className: newClass
      }
    } = vnode;
    const {
      data: {
        className: oldClass
      }
    } = oldVnode;

    if (oldClass === newClass) {
      return;
    }

    const {
      classList
    } = elm;
    const newClassMap = getMapFromClassName(newClass);
    const oldClassMap = getMapFromClassName(oldClass);
    let name;

    for (name in oldClassMap) {
      // remove only if it is not in the new class collection and it is not set from within the instance
      if (isUndefined(newClassMap[name])) {
        classList.remove(name);
      }
    }

    for (name in newClassMap) {
      if (isUndefined(oldClassMap[name])) {
        classList.add(name);
      }
    }
  }

  const emptyVNode$2 = {
    data: {}
  };
  var modComputedClassName = {
    create: vnode => updateClassAttribute(emptyVNode$2, vnode),
    update: updateClassAttribute
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  function updateStyleAttribute(oldVnode, vnode) {
    const {
      style: newStyle
    } = vnode.data;

    if (oldVnode.data.style === newStyle) {
      return;
    }

    const elm = vnode.elm;
    const {
      style
    } = elm;

    if (!isString(newStyle) || newStyle === '') {
      removeAttribute.call(elm, 'style');
    } else {
      style.cssText = newStyle;
    }
  }

  const emptyVNode$3 = {
    data: {}
  };
  var modComputedStyle = {
    create: vnode => updateStyleAttribute(emptyVNode$3, vnode),
    update: updateStyleAttribute
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // The compiler takes care of transforming the inline classnames into an object. It's faster to set the
  // different classnames properties individually instead of via a string.

  function createClassAttribute(vnode) {
    const {
      elm,
      data: {
        classMap
      }
    } = vnode;

    if (isUndefined(classMap)) {
      return;
    }

    const {
      classList
    } = elm;

    for (const name in classMap) {
      classList.add(name);
    }
  }

  var modStaticClassName = {
    create: createClassAttribute
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // The compiler takes care of transforming the inline style into an object. It's faster to set the
  // different style properties individually instead of via a string.

  function createStyleAttribute(vnode) {
    const {
      elm,
      data: {
        styleMap
      }
    } = vnode;

    if (isUndefined(styleMap)) {
      return;
    }

    const {
      style
    } = elm;

    for (const name in styleMap) {
      style[name] = styleMap[name];
    }
  }

  var modStaticStyle = {
    create: createStyleAttribute
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  function createContext(vnode) {
    const {
      data: {
        context
      }
    } = vnode;

    if (isUndefined(context)) {
      return;
    }

    const elm = vnode.elm;
    const vm = getAssociatedVMIfPresent(elm);

    if (!isUndefined(vm)) {
      assign(vm.context, context);
    }
  }

  const contextModule = {
    create: createContext
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /**
  @license
  Copyright (c) 2015 Simon Friis Vindum.
  This code may only be used under the MIT License found at
  https://github.com/snabbdom/snabbdom/blob/master/LICENSE
  Code distributed by Snabbdom as part of the Snabbdom project at
  https://github.com/snabbdom/snabbdom/
  */

  function isUndef(s) {
    return s === undefined;
  }

  function sameVnode(vnode1, vnode2) {
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
  }

  function isVNode(vnode) {
    return vnode != null;
  }

  function createKeyToOldIdx(children, beginIdx, endIdx) {
    const map = {};
    let j, key, ch; // TODO [#1637]: simplify this by assuming that all vnodes has keys

    for (j = beginIdx; j <= endIdx; ++j) {
      ch = children[j];

      if (isVNode(ch)) {
        key = ch.key;

        if (key !== undefined) {
          map[key] = j;
        }
      }
    }

    return map;
  }

  function addVnodes(parentElm, before, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      const ch = vnodes[startIdx];

      if (isVNode(ch)) {
        ch.hook.create(ch);
        ch.hook.insert(ch, parentElm, before);
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      const ch = vnodes[startIdx]; // text nodes do not have logic associated to them

      if (isVNode(ch)) {
        ch.hook.remove(ch, parentElm);
      }
    }
  }

  function updateDynamicChildren(parentElm, oldCh, newCh) {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndIdx = newCh.length - 1;
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx];
    let oldKeyToIdx;
    let idxInOld;
    let elmToMove;
    let before;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (!isVNode(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
      } else if (!isVNode(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (!isVNode(newStartVnode)) {
        newStartVnode = newCh[++newStartIdx];
      } else if (!isVNode(newEndVnode)) {
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode);
        newEndVnode.hook.move(oldStartVnode, parentElm, oldEndVnode.elm.nextSibling);
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode);
        newStartVnode.hook.move(oldEndVnode, parentElm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (oldKeyToIdx === undefined) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }

        idxInOld = oldKeyToIdx[newStartVnode.key];

        if (isUndef(idxInOld)) {
          // New element
          newStartVnode.hook.create(newStartVnode);
          newStartVnode.hook.insert(newStartVnode, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];

          if (isVNode(elmToMove)) {
            if (elmToMove.sel !== newStartVnode.sel) {
              // New element
              newStartVnode.hook.create(newStartVnode);
              newStartVnode.hook.insert(newStartVnode, parentElm, oldStartVnode.elm);
            } else {
              patchVnode(elmToMove, newStartVnode);
              oldCh[idxInOld] = undefined;
              newStartVnode.hook.move(elmToMove, parentElm, oldStartVnode.elm);
            }
          }

          newStartVnode = newCh[++newStartIdx];
        }
      }
    }

    if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
      if (oldStartIdx > oldEndIdx) {
        const n = newCh[newEndIdx + 1];
        before = isVNode(n) ? n.elm : null;
        addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx);
      } else {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
      }
    }
  }

  function updateStaticChildren(parentElm, oldCh, newCh) {
    const {
      length
    } = newCh;

    if (oldCh.length === 0) {
      // the old list is empty, we can directly insert anything new
      addVnodes(parentElm, null, newCh, 0, length);
      return;
    } // if the old list is not empty, the new list MUST have the same
    // amount of nodes, that's why we call this static children


    let referenceElm = null;

    for (let i = length - 1; i >= 0; i -= 1) {
      const vnode = newCh[i];
      const oldVNode = oldCh[i];

      if (vnode !== oldVNode) {
        if (isVNode(oldVNode)) {
          if (isVNode(vnode)) {
            // both vnodes must be equivalent, and se just need to patch them
            patchVnode(oldVNode, vnode);
            referenceElm = vnode.elm;
          } else {
            // removing the old vnode since the new one is null
            oldVNode.hook.remove(oldVNode, parentElm);
          }
        } else if (isVNode(vnode)) {
          // this condition is unnecessary
          vnode.hook.create(vnode); // insert the new node one since the old one is null

          vnode.hook.insert(vnode, parentElm, referenceElm);
          referenceElm = vnode.elm;
        }
      }
    }
  }

  function patchVnode(oldVnode, vnode) {
    if (oldVnode !== vnode) {
      vnode.elm = oldVnode.elm;
      vnode.hook.update(oldVnode, vnode);
    }
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function generateDataDescriptor(options) {
    return assign({
      configurable: true,
      enumerable: true,
      writable: true
    }, options);
  }

  function generateAccessorDescriptor(options) {
    return assign({
      configurable: true,
      enumerable: true
    }, options);
  }

  let isDomMutationAllowed = false;

  function unlockDomMutation() {

    isDomMutationAllowed = true;
  }

  function lockDomMutation() {

    isDomMutationAllowed = false;
  }

  function portalRestrictionErrorMessage(name, type) {
    return `The \`${name}\` ${type} is available only on elements that use the \`lwc:dom="manual"\` directive.`;
  }

  function getNodeRestrictionsDescriptors(node, options) {
    // and returns the first descriptor for the property


    const originalTextContentDescriptor = getPropertyDescriptor(node, 'textContent');
    const originalNodeValueDescriptor = getPropertyDescriptor(node, 'nodeValue');
    const {
      appendChild,
      insertBefore,
      removeChild,
      replaceChild
    } = node;
    return {
      appendChild: generateDataDescriptor({
        value(aChild) {
          if (this instanceof Element && isFalse$1(options.isPortal)) {
            logError(portalRestrictionErrorMessage('appendChild', 'method'));
          }

          return appendChild.call(this, aChild);
        }

      }),
      insertBefore: generateDataDescriptor({
        value(newNode, referenceNode) {
          if (!isDomMutationAllowed && this instanceof Element && isFalse$1(options.isPortal)) {
            logError(portalRestrictionErrorMessage('insertBefore', 'method'));
          }

          return insertBefore.call(this, newNode, referenceNode);
        }

      }),
      removeChild: generateDataDescriptor({
        value(aChild) {
          if (!isDomMutationAllowed && this instanceof Element && isFalse$1(options.isPortal)) {
            logError(portalRestrictionErrorMessage('removeChild', 'method'));
          }

          return removeChild.call(this, aChild);
        }

      }),
      replaceChild: generateDataDescriptor({
        value(newChild, oldChild) {
          if (this instanceof Element && isFalse$1(options.isPortal)) {
            logError(portalRestrictionErrorMessage('replaceChild', 'method'));
          }

          return replaceChild.call(this, newChild, oldChild);
        }

      }),
      nodeValue: generateAccessorDescriptor({
        get() {
          return originalNodeValueDescriptor.get.call(this);
        },

        set(value) {
          if (!isDomMutationAllowed && this instanceof Element && isFalse$1(options.isPortal)) {
            logError(portalRestrictionErrorMessage('nodeValue', 'property'));
          }

          originalNodeValueDescriptor.set.call(this, value);
        }

      }),
      textContent: generateAccessorDescriptor({
        get() {
          return originalTextContentDescriptor.get.call(this);
        },

        set(value) {
          if (this instanceof Element && isFalse$1(options.isPortal)) {
            logError(portalRestrictionErrorMessage('textContent', 'property'));
          }

          originalTextContentDescriptor.set.call(this, value);
        }

      })
    };
  }

  function getElementRestrictionsDescriptors(elm, options) {

    const descriptors = getNodeRestrictionsDescriptors(elm, options);
    const originalInnerHTMLDescriptor = getPropertyDescriptor(elm, 'innerHTML');
    const originalOuterHTMLDescriptor = getPropertyDescriptor(elm, 'outerHTML');
    assign(descriptors, {
      innerHTML: generateAccessorDescriptor({
        get() {
          return originalInnerHTMLDescriptor.get.call(this);
        },

        set(value) {
          if (isFalse$1(options.isPortal)) {
            logError(portalRestrictionErrorMessage('innerHTML', 'property'), getAssociatedVMIfPresent(this));
          }

          return originalInnerHTMLDescriptor.set.call(this, value);
        }

      }),
      outerHTML: generateAccessorDescriptor({
        get() {
          return originalOuterHTMLDescriptor.get.call(this);
        },

        set(_value) {
          throw new TypeError(`Invalid attempt to set outerHTML on Element.`);
        }

      })
    });
    return descriptors;
  }

  function getShadowRootRestrictionsDescriptors(sr, options) {
    // thing when using the real shadow root, because if that's the case,
    // the component will not work when running with synthetic shadow.


    const originalQuerySelector = sr.querySelector;
    const originalQuerySelectorAll = sr.querySelectorAll;
    const originalAddEventListener = sr.addEventListener;
    const descriptors = getNodeRestrictionsDescriptors(sr, options);
    const originalInnerHTMLDescriptor = getPropertyDescriptor(sr, 'innerHTML');
    const originalTextContentDescriptor = getPropertyDescriptor(sr, 'textContent');
    assign(descriptors, {
      innerHTML: generateAccessorDescriptor({
        get() {
          return originalInnerHTMLDescriptor.get.call(this);
        },

        set(_value) {
          throw new TypeError(`Invalid attempt to set innerHTML on ShadowRoot.`);
        }

      }),
      textContent: generateAccessorDescriptor({
        get() {
          return originalTextContentDescriptor.get.call(this);
        },

        set(_value) {
          throw new TypeError(`Invalid attempt to set textContent on ShadowRoot.`);
        }

      }),
      addEventListener: generateDataDescriptor({
        value(type, listener, options) {
          const vmBeingRendered = getVMBeingRendered();
          assert.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${toString(sr)} by adding an event listener for "${type}".`);
          assert.invariant(!isUpdatingTemplate, `Updating the template of ${vmBeingRendered} has side effects on the state of ${toString(sr)} by adding an event listener for "${type}".`); // TODO [#420]: this is triggered when the component author attempts to add a listener
          // programmatically into its Component's shadow root

          if (!isUndefined(options)) {
            logError('The `addEventListener` method in `LightningElement` does not support any options.', getAssociatedVMIfPresent(this));
          } // Typescript does not like it when you treat the `arguments` object as an array
          // @ts-ignore type-mismatch


          return originalAddEventListener.apply(this, arguments);
        }

      }),
      querySelector: generateDataDescriptor({
        value() {
          const vm = getAssociatedVM(this);
          assert.isFalse(isBeingConstructed(vm), `this.template.querySelector() cannot be called during the construction of the custom element for ${vm} because no content has been rendered yet.`); // Typescript does not like it when you treat the `arguments` object as an array
          // @ts-ignore type-mismatch

          return originalQuerySelector.apply(this, arguments);
        }

      }),
      querySelectorAll: generateDataDescriptor({
        value() {
          const vm = getAssociatedVM(this);
          assert.isFalse(isBeingConstructed(vm), `this.template.querySelectorAll() cannot be called during the construction of the custom element for ${vm} because no content has been rendered yet.`); // Typescript does not like it when you treat the `arguments` object as an array
          // @ts-ignore type-mismatch

          return originalQuerySelectorAll.apply(this, arguments);
        }

      })
    });
    const BlockedShadowRootMethods = {
      cloneNode: 0,
      getElementById: 0,
      getSelection: 0,
      elementsFromPoint: 0,
      dispatchEvent: 0
    };
    forEach.call(getOwnPropertyNames(BlockedShadowRootMethods), methodName => {
      const descriptor = generateAccessorDescriptor({
        get() {
          throw new Error(`Disallowed method "${methodName}" in ShadowRoot.`);
        }

      });
      descriptors[methodName] = descriptor;
    });
    return descriptors;
  } // Custom Elements Restrictions:
  // -----------------------------


  function getCustomElementRestrictionsDescriptors(elm, options) {

    const descriptors = getNodeRestrictionsDescriptors(elm, options);
    const originalAddEventListener = elm.addEventListener;
    const originalInnerHTMLDescriptor = getPropertyDescriptor(elm, 'innerHTML');
    const originalOuterHTMLDescriptor = getPropertyDescriptor(elm, 'outerHTML');
    const originalTextContentDescriptor = getPropertyDescriptor(elm, 'textContent');
    return assign(descriptors, {
      innerHTML: generateAccessorDescriptor({
        get() {
          return originalInnerHTMLDescriptor.get.call(this);
        },

        set(_value) {
          throw new TypeError(`Invalid attempt to set innerHTML on HTMLElement.`);
        }

      }),
      outerHTML: generateAccessorDescriptor({
        get() {
          return originalOuterHTMLDescriptor.get.call(this);
        },

        set(_value) {
          throw new TypeError(`Invalid attempt to set outerHTML on HTMLElement.`);
        }

      }),
      textContent: generateAccessorDescriptor({
        get() {
          return originalTextContentDescriptor.get.call(this);
        },

        set(_value) {
          throw new TypeError(`Invalid attempt to set textContent on HTMLElement.`);
        }

      }),
      addEventListener: generateDataDescriptor({
        value(type, listener, options) {
          const vmBeingRendered = getVMBeingRendered();
          assert.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${toString(this)} by adding an event listener for "${type}".`);
          assert.invariant(!isUpdatingTemplate, `Updating the template of ${vmBeingRendered} has side effects on the state of ${toString(elm)} by adding an event listener for "${type}".`); // TODO [#420]: this is triggered when the component author attempts to add a listener
          // programmatically into a lighting element node

          if (!isUndefined(options)) {
            logError('The `addEventListener` method in `LightningElement` does not support any options.', getAssociatedVMIfPresent(this));
          } // Typescript does not like it when you treat the `arguments` object as an array
          // @ts-ignore type-mismatch


          return originalAddEventListener.apply(this, arguments);
        }

      })
    });
  }

  function getComponentRestrictionsDescriptors() {

    return {
      tagName: generateAccessorDescriptor({
        get() {
          throw new Error(`Usage of property \`tagName\` is disallowed because the component itself does not know which tagName will be used to create the element, therefore writing code that check for that value is error prone.`);
        },

        configurable: true,
        enumerable: false
      })
    };
  }

  function getLightningElementPrototypeRestrictionsDescriptors(proto) {

    const originalDispatchEvent = proto.dispatchEvent;
    const descriptors = {
      dispatchEvent: generateDataDescriptor({
        value(event) {
          const vm = getAssociatedVM(this);
          assert.isFalse(isBeingConstructed(vm), `this.dispatchEvent() should not be called during the construction of the custom element for ${getComponentTag(vm)} because no one is listening just yet.`);

          if (!isNull(event) && isObject$1(event)) {
            const {
              type
            } = event;

            if (!/^[a-z][a-z0-9_]*$/.test(type)) {
              logError(`Invalid event type "${type}" dispatched in element ${getComponentTag(vm)}. Event name must start with a lowercase letter and followed only lowercase letters, numbers, and underscores`, vm);
            }
          } // Typescript does not like it when you treat the `arguments` object as an array
          // @ts-ignore type-mismatch


          return originalDispatchEvent.apply(this, arguments);
        }

      })
    };
    forEach.call(getOwnPropertyNames(globalHTMLProperties), propName => {
      if (propName in proto) {
        return; // no need to redefine something that we are already exposing
      }

      descriptors[propName] = generateAccessorDescriptor({
        get() {
          const {
            error,
            attribute
          } = globalHTMLProperties[propName];
          const msg = [];
          msg.push(`Accessing the global HTML property "${propName}" is disabled.`);

          if (error) {
            msg.push(error);
          } else if (attribute) {
            msg.push(`Instead access it via \`this.getAttribute("${attribute}")\`.`);
          }

          logError(msg.join('\n'), getAssociatedVM(this));
        },

        set() {
          const {
            readOnly
          } = globalHTMLProperties[propName];

          if (readOnly) {
            logError(`The global HTML property \`${propName}\` is read-only.`, getAssociatedVM(this));
          }
        }

      });
    });
    return descriptors;
  }

  function markNodeFromVNode(node) {

    node.$fromTemplate$ = true;
  }

  function patchElementWithRestrictions(elm, options) {
    defineProperties(elm, getElementRestrictionsDescriptors(elm, options));
  } // This routine will prevent access to certain properties on a shadow root instance to guarantee
  // that all components will work fine in IE11 and other browsers without shadow dom support.


  function patchShadowRootWithRestrictions(sr, options) {
    defineProperties(sr, getShadowRootRestrictionsDescriptors(sr, options));
  }

  function patchCustomElementWithRestrictions(elm, options) {
    const restrictionsDescriptors = getCustomElementRestrictionsDescriptors(elm, options);
    const elmProto = getPrototypeOf(elm);
    setPrototypeOf(elm, create(elmProto, restrictionsDescriptors));
  }

  function patchComponentWithRestrictions(cmp) {
    defineProperties(cmp, getComponentRestrictionsDescriptors());
  }

  function patchLightningElementPrototypeWithRestrictions(proto) {
    defineProperties(proto, getLightningElementPrototypeRestrictionsDescriptors(proto));
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const noop = () => void 0;

  function observeElementChildNodes(elm) {
    elm.$domManual$ = true;
  }

  function setElementShadowToken(elm, token) {
    elm.$shadowToken$ = token;
  }

  function updateNodeHook(oldVnode, vnode) {
    const {
      text
    } = vnode;

    if (oldVnode.text !== text) {
      {
        unlockDomMutation();
      }
      /**
       * Compiler will never produce a text property that is not string
       */


      vnode.elm.nodeValue = text;

      {
        lockDomMutation();
      }
    }
  }

  function insertNodeHook(vnode, parentNode, referenceNode) {
    {
      unlockDomMutation();
    }

    parentNode.insertBefore(vnode.elm, referenceNode);

    {
      lockDomMutation();
    }
  }

  function removeNodeHook(vnode, parentNode) {
    {
      unlockDomMutation();
    }

    parentNode.removeChild(vnode.elm);

    {
      lockDomMutation();
    }
  }

  function createElmHook(vnode) {
    modEvents.create(vnode); // Attrs need to be applied to element before props
    // IE11 will wipe out value on radio inputs if value
    // is set before type=radio.

    modAttrs.create(vnode);
    modProps.create(vnode);
    modStaticClassName.create(vnode);
    modStaticStyle.create(vnode);
    modComputedClassName.create(vnode);
    modComputedStyle.create(vnode);
    contextModule.create(vnode);
  }

  var LWCDOMMode;

  (function (LWCDOMMode) {
    LWCDOMMode["manual"] = "manual";
  })(LWCDOMMode || (LWCDOMMode = {}));

  function fallbackElmHook(vnode) {
    const {
      owner
    } = vnode;
    const elm = vnode.elm;

    if (isTrue$1(useSyntheticShadow)) {
      const {
        data: {
          context
        }
      } = vnode;
      const {
        shadowAttribute
      } = owner.context;

      if (!isUndefined(context) && !isUndefined(context.lwc) && context.lwc.dom === LWCDOMMode.manual) {
        // this element will now accept any manual content inserted into it
        observeElementChildNodes(elm);
      } // when running in synthetic shadow mode, we need to set the shadowToken value
      // into each element from the template, so they can be styled accordingly.


      setElementShadowToken(elm, shadowAttribute);
    }

    {
      const {
        data: {
          context
        }
      } = vnode;
      const isPortal = !isUndefined(context) && !isUndefined(context.lwc) && context.lwc.dom === LWCDOMMode.manual;
      patchElementWithRestrictions(elm, {
        isPortal
      });
    }
  }

  function updateElmHook(oldVnode, vnode) {
    // Attrs need to be applied to element before props
    // IE11 will wipe out value on radio inputs if value
    // is set before type=radio.
    modAttrs.update(oldVnode, vnode);
    modProps.update(oldVnode, vnode);
    modComputedClassName.update(oldVnode, vnode);
    modComputedStyle.update(oldVnode, vnode);
  }

  function insertCustomElmHook(vnode) {
    const vm = getAssociatedVM(vnode.elm);
    appendVM(vm);
  }

  function updateChildrenHook(oldVnode, vnode) {
    const {
      children,
      owner
    } = vnode;
    const fn = hasDynamicChildren(children) ? updateDynamicChildren : updateStaticChildren;
    runWithBoundaryProtection(owner, owner.owner, noop, () => {
      fn(vnode.elm, oldVnode.children, children);
    }, noop);
  }

  function allocateChildrenHook(vnode) {
    const vm = getAssociatedVM(vnode.elm);
    const {
      children
    } = vnode;
    vm.aChildren = children;

    if (isTrue$1(useSyntheticShadow)) {
      // slow path
      allocateInSlot(vm, children); // every child vnode is now allocated, and the host should receive none directly, it receives them via the shadow!

      vnode.children = EmptyArray;
    }
  }

  function createViewModelHook(vnode) {
    const elm = vnode.elm;

    if (!isUndefined(getAssociatedVMIfPresent(elm))) {
      // There is a possibility that a custom element is registered under tagName,
      // in which case, the initialization is already carry on, and there is nothing else
      // to do here since this hook is called right after invoking `document.createElement`.
      return;
    }

    const {
      mode,
      ctor,
      owner
    } = vnode;
    const def = getComponentDef(ctor);
    setElementProto(elm, def);

    if (isTrue$1(useSyntheticShadow)) {
      const {
        shadowAttribute
      } = owner.context; // when running in synthetic shadow mode, we need to set the shadowToken value
      // into each element from the template, so they can be styled accordingly.

      setElementShadowToken(elm, shadowAttribute);
    }

    createVM(elm, ctor, {
      mode,
      owner
    });

    {
      assert.isTrue(isArray$1(vnode.children), `Invalid vnode for a custom element, it must have children defined.`);
    }

    {
      patchCustomElementWithRestrictions(elm, EmptyObject);
    }
  }

  function createCustomElmHook(vnode) {
    modEvents.create(vnode); // Attrs need to be applied to element before props
    // IE11 will wipe out value on radio inputs if value
    // is set before type=radio.

    modAttrs.create(vnode);
    modProps.create(vnode);
    modStaticClassName.create(vnode);
    modStaticStyle.create(vnode);
    modComputedClassName.create(vnode);
    modComputedStyle.create(vnode);
    contextModule.create(vnode);
  }

  function createChildrenHook(vnode) {
    const {
      elm,
      children
    } = vnode;

    for (let j = 0; j < children.length; ++j) {
      const ch = children[j];

      if (ch != null) {
        ch.hook.create(ch);
        ch.hook.insert(ch, elm, null);
      }
    }
  }

  function rerenderCustomElmHook(vnode) {
    const vm = getAssociatedVM(vnode.elm);

    {
      assert.isTrue(isArray$1(vnode.children), `Invalid vnode for a custom element, it must have children defined.`);
    }

    rerenderVM(vm);
  }

  function updateCustomElmHook(oldVnode, vnode) {
    // Attrs need to be applied to element before props
    // IE11 will wipe out value on radio inputs if value
    // is set before type=radio.
    modAttrs.update(oldVnode, vnode);
    modProps.update(oldVnode, vnode);
    modComputedClassName.update(oldVnode, vnode);
    modComputedStyle.update(oldVnode, vnode);
  }

  function removeElmHook(vnode) {
    // this method only needs to search on child vnodes from template
    // to trigger the remove hook just in case some of those children
    // are custom elements.
    const {
      children,
      elm
    } = vnode;

    for (let j = 0, len = children.length; j < len; ++j) {
      const ch = children[j];

      if (!isNull(ch)) {
        ch.hook.remove(ch, elm);
      }
    }
  }

  function removeCustomElmHook(vnode) {
    // for custom elements we don't have to go recursively because the removeVM routine
    // will take care of disconnecting any child VM attached to its shadow as well.
    removeVM(getAssociatedVM(vnode.elm));
  } // Using a WeakMap instead of a WeakSet because this one works in IE11 :(


  const FromIteration = new WeakMap(); // dynamic children means it was generated by an iteration
  // in a template, and will require a more complex diffing algo.

  function markAsDynamicChildren(children) {
    FromIteration.set(children, 1);
  }

  function hasDynamicChildren(children) {
    return FromIteration.has(children);
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const Services = create(null);
  const hooks = ['wiring', 'locator', 'rendered', 'connected', 'disconnected'];
  /**
   * EXPERIMENTAL: This function allows for the registration of "services"
   * in LWC by exposing hooks into the component life-cycle. This API is
   * subject to change or being removed.
   */

  function register(service) {
    {
      assert.isTrue(isObject$1(service), `Invalid service declaration, ${service}: service must be an object`);
    }

    for (let i = 0; i < hooks.length; ++i) {
      const hookName = hooks[i];

      if (hookName in service) {
        let l = Services[hookName];

        if (isUndefined(l)) {
          Services[hookName] = l = [];
        }

        ArrayPush.call(l, service[hookName]);
      }
    }
  }

  function invokeServiceHook(vm, cbs) {
    {
      assert.isTrue(isArray$1(cbs) && cbs.length > 0, `Optimize invokeServiceHook() to be invoked only when needed`);
    }

    const {
      component,
      data,
      def,
      context
    } = vm;

    for (let i = 0, len = cbs.length; i < len; ++i) {
      cbs[i].call(undefined, component, data, def, context);
    }
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const CHAR_S = 115;
  const CHAR_V = 118;
  const CHAR_G = 103;
  const NamespaceAttributeForSVG = 'http://www.w3.org/2000/svg';
  const SymbolIterator = Symbol.iterator;
  const TextHook = {
    create: vnode => {
      vnode.elm = document.createTextNode(vnode.text);
      linkNodeToShadow(vnode);

      {
        markNodeFromVNode(vnode.elm);
      }
    },
    update: updateNodeHook,
    insert: insertNodeHook,
    move: insertNodeHook,
    remove: removeNodeHook
  };
  const CommentHook = {
    create: vnode => {
      vnode.elm = document.createComment(vnode.text);
      linkNodeToShadow(vnode);

      {
        markNodeFromVNode(vnode.elm);
      }
    },
    update: updateNodeHook,
    insert: insertNodeHook,
    move: insertNodeHook,
    remove: removeNodeHook
  }; // insert is called after update, which is used somewhere else (via a module)
  // to mark the vm as inserted, that means we cannot use update as the main channel
  // to rehydrate when dirty, because sometimes the element is not inserted just yet,
  // which breaks some invariants. For that reason, we have the following for any
  // Custom Element that is inserted via a template.

  const ElementHook = {
    create: vnode => {
      const {
        data,
        sel,
        clonedElement
      } = vnode;
      const {
        ns
      } = data; // TODO [#1364]: supporting the ability to inject a cloned StyleElement via a vnode this is
      // used for style tags for native shadow

      if (isUndefined(clonedElement)) {
        vnode.elm = isUndefined(ns) ? document.createElement(sel) : document.createElementNS(ns, sel);
      } else {
        vnode.elm = clonedElement;
      }

      linkNodeToShadow(vnode);

      {
        markNodeFromVNode(vnode.elm);
      }

      fallbackElmHook(vnode);
      createElmHook(vnode);
    },
    update: (oldVnode, vnode) => {
      updateElmHook(oldVnode, vnode);
      updateChildrenHook(oldVnode, vnode);
    },
    insert: (vnode, parentNode, referenceNode) => {
      insertNodeHook(vnode, parentNode, referenceNode);
      createChildrenHook(vnode);
    },
    move: (vnode, parentNode, referenceNode) => {
      insertNodeHook(vnode, parentNode, referenceNode);
    },
    remove: (vnode, parentNode) => {
      removeNodeHook(vnode, parentNode);
      removeElmHook(vnode);
    }
  };
  const CustomElementHook = {
    create: vnode => {
      const {
        sel
      } = vnode;
      vnode.elm = document.createElement(sel);
      linkNodeToShadow(vnode);

      {
        markNodeFromVNode(vnode.elm);
      }

      createViewModelHook(vnode);
      allocateChildrenHook(vnode);
      createCustomElmHook(vnode);
    },
    update: (oldVnode, vnode) => {
      updateCustomElmHook(oldVnode, vnode); // in fallback mode, the allocation will always set children to
      // empty and delegate the real allocation to the slot elements

      allocateChildrenHook(vnode); // in fallback mode, the children will be always empty, so, nothing
      // will happen, but in native, it does allocate the light dom

      updateChildrenHook(oldVnode, vnode); // this will update the shadowRoot

      rerenderCustomElmHook(vnode);
    },
    insert: (vnode, parentNode, referenceNode) => {
      insertNodeHook(vnode, parentNode, referenceNode);
      const vm = getAssociatedVM(vnode.elm);

      {
        assert.isTrue(vm.state === VMState.created, `${vm} cannot be recycled.`);
      }

      runConnectedCallback(vm);
      createChildrenHook(vnode);
      insertCustomElmHook(vnode);
    },
    move: (vnode, parentNode, referenceNode) => {
      insertNodeHook(vnode, parentNode, referenceNode);
    },
    remove: (vnode, parentNode) => {
      removeNodeHook(vnode, parentNode);
      removeCustomElmHook(vnode);
    }
  };

  function linkNodeToShadow(vnode) {
    // TODO [#1164]: this should eventually be done by the polyfill directly
    vnode.elm.$shadowResolver$ = vnode.owner.cmpRoot.$shadowResolver$;
  } // TODO [#1136]: this should be done by the compiler, adding ns to every sub-element


  function addNS(vnode) {
    const {
      data,
      children,
      sel
    } = vnode;
    data.ns = NamespaceAttributeForSVG; // TODO [#1275]: review why `sel` equal `foreignObject` should get this `ns`

    if (isArray$1(children) && sel !== 'foreignObject') {
      for (let j = 0, n = children.length; j < n; ++j) {
        const childNode = children[j];

        if (childNode != null && childNode.hook === ElementHook) {
          addNS(childNode);
        }
      }
    }
  }

  function addVNodeToChildLWC(vnode) {
    ArrayPush.call(getVMBeingRendered().velements, vnode);
  } // [h]tml node


  function h(sel, data, children) {
    const vmBeingRendered = getVMBeingRendered();

    {
      assert.isTrue(isString(sel), `h() 1st argument sel must be a string.`);
      assert.isTrue(isObject$1(data), `h() 2nd argument data must be an object.`);
      assert.isTrue(isArray$1(children), `h() 3rd argument children must be an array.`);
      assert.isTrue('key' in data, ` <${sel}> "key" attribute is invalid or missing for ${vmBeingRendered}. Key inside iterator is either undefined or null.`); // checking reserved internal data properties

      assert.isFalse(data.className && data.classMap, `vnode.data.className and vnode.data.classMap ambiguous declaration.`);
      assert.isFalse(data.styleMap && data.style, `vnode.data.styleMap and vnode.data.style ambiguous declaration.`);

      if (data.style && !isString(data.style)) {
        logError(`Invalid 'style' attribute passed to <${sel}> is ignored. This attribute must be a string value.`, vmBeingRendered);
      }

      forEach.call(children, childVnode => {
        if (childVnode != null) {
          assert.isTrue(childVnode && 'sel' in childVnode && 'data' in childVnode && 'children' in childVnode && 'text' in childVnode && 'elm' in childVnode && 'key' in childVnode, `${childVnode} is not a vnode.`);
        }
      });
    }

    const {
      key
    } = data;
    let text, elm;
    const vnode = {
      sel,
      data,
      children,
      text,
      elm,
      key,
      hook: ElementHook,
      owner: vmBeingRendered
    };

    if (sel.length === 3 && StringCharCodeAt.call(sel, 0) === CHAR_S && StringCharCodeAt.call(sel, 1) === CHAR_V && StringCharCodeAt.call(sel, 2) === CHAR_G) {
      addNS(vnode);
    }

    return vnode;
  } // [t]ab[i]ndex function


  function ti(value) {
    // if value is greater than 0, we normalize to 0
    // If value is an invalid tabIndex value (null, undefined, string, etc), we let that value pass through
    // If value is less than -1, we don't care
    const shouldNormalize = value > 0 && !(isTrue$1(value) || isFalse$1(value));

    {
      const vmBeingRendered = getVMBeingRendered();

      if (shouldNormalize) {
        logError(`Invalid tabindex value \`${toString(value)}\` in template for ${vmBeingRendered}. This attribute must be set to 0 or -1.`, vmBeingRendered);
      }
    }

    return shouldNormalize ? 0 : value;
  } // [s]lot element node


  function s(slotName, data, children, slotset) {
    {
      assert.isTrue(isString(slotName), `s() 1st argument slotName must be a string.`);
      assert.isTrue(isObject$1(data), `s() 2nd argument data must be an object.`);
      assert.isTrue(isArray$1(children), `h() 3rd argument children must be an array.`);
    }

    if (!isUndefined(slotset) && !isUndefined(slotset[slotName]) && slotset[slotName].length !== 0) {
      children = slotset[slotName];
    }

    const vnode = h('slot', data, children);

    if (useSyntheticShadow) {
      // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic
      sc(children);
    }

    return vnode;
  } // [c]ustom element node


  function c(sel, Ctor, data, children = EmptyArray) {
    if (isCircularModuleDependency(Ctor)) {
      Ctor = resolveCircularModuleDependency(Ctor);
    }

    const vmBeingRendered = getVMBeingRendered();

    {
      assert.isTrue(isString(sel), `c() 1st argument sel must be a string.`);
      assert.isTrue(isFunction(Ctor), `c() 2nd argument Ctor must be a function.`);
      assert.isTrue(isObject$1(data), `c() 3nd argument data must be an object.`);
      assert.isTrue(arguments.length === 3 || isArray$1(children), `c() 4nd argument data must be an array.`); // checking reserved internal data properties

      assert.isFalse(data.className && data.classMap, `vnode.data.className and vnode.data.classMap ambiguous declaration.`);
      assert.isFalse(data.styleMap && data.style, `vnode.data.styleMap and vnode.data.style ambiguous declaration.`);

      if (data.style && !isString(data.style)) {
        logError(`Invalid 'style' attribute passed to <${sel}> is ignored. This attribute must be a string value.`, vmBeingRendered);
      }

      if (arguments.length === 4) {
        forEach.call(children, childVnode => {
          if (childVnode != null) {
            assert.isTrue(childVnode && 'sel' in childVnode && 'data' in childVnode && 'children' in childVnode && 'text' in childVnode && 'elm' in childVnode && 'key' in childVnode, `${childVnode} is not a vnode.`);
          }
        });
      }
    }

    const {
      key
    } = data;
    let text, elm;
    const vnode = {
      sel,
      data,
      children,
      text,
      elm,
      key,
      hook: CustomElementHook,
      ctor: Ctor,
      owner: vmBeingRendered,
      mode: 'open'
    };
    addVNodeToChildLWC(vnode);
    return vnode;
  } // [i]terable node


  function i(iterable, factory) {
    const list = []; // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic

    sc(list);
    const vmBeingRendered = getVMBeingRendered();

    if (isUndefined(iterable) || iterable === null) {
      {
        logError(`Invalid template iteration for value "${toString(iterable)}" in ${vmBeingRendered}. It must be an Array or an iterable Object.`, vmBeingRendered);
      }

      return list;
    }

    {
      assert.isFalse(isUndefined(iterable[SymbolIterator]), `Invalid template iteration for value \`${toString(iterable)}\` in ${vmBeingRendered}. It must be an array-like object and not \`null\` nor \`undefined\`.`);
    }

    const iterator = iterable[SymbolIterator]();

    {
      assert.isTrue(iterator && isFunction(iterator.next), `Invalid iterator function for "${toString(iterable)}" in ${vmBeingRendered}.`);
    }

    let next = iterator.next();
    let j = 0;
    let {
      value,
      done: last
    } = next;
    let keyMap;
    let iterationError;

    {
      keyMap = create(null);
    }

    while (last === false) {
      // implementing a look-back-approach because we need to know if the element is the last
      next = iterator.next();
      last = next.done; // template factory logic based on the previous collected value

      const vnode = factory(value, j, j === 0, last);

      if (isArray$1(vnode)) {
        ArrayPush.apply(list, vnode);
      } else {
        ArrayPush.call(list, vnode);
      }

      {
        const vnodes = isArray$1(vnode) ? vnode : [vnode];
        forEach.call(vnodes, childVnode => {
          if (!isNull(childVnode) && isObject$1(childVnode) && !isUndefined(childVnode.sel)) {
            const {
              key
            } = childVnode;

            if (isString(key) || isNumber(key)) {
              if (keyMap[key] === 1 && isUndefined(iterationError)) {
                iterationError = `Duplicated "key" attribute value for "<${childVnode.sel}>" in ${vmBeingRendered} for item number ${j}. A key with value "${childVnode.key}" appears more than once in the iteration. Key values must be unique numbers or strings.`;
              }

              keyMap[key] = 1;
            } else if (isUndefined(iterationError)) {
              iterationError = `Invalid "key" attribute value in "<${childVnode.sel}>" in ${vmBeingRendered} for item number ${j}. Set a unique "key" value on all iterated child elements.`;
            }
          }
        });
      } // preparing next value


      j += 1;
      value = next.value;
    }

    {
      if (!isUndefined(iterationError)) {
        logError(iterationError, vmBeingRendered);
      }
    }

    return list;
  }
  /**
   * [f]lattening
   */


  function f(items) {
    {
      assert.isTrue(isArray$1(items), 'flattening api can only work with arrays.');
    }

    const len = items.length;
    const flattened = []; // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic

    sc(flattened);

    for (let j = 0; j < len; j += 1) {
      const item = items[j];

      if (isArray$1(item)) {
        ArrayPush.apply(flattened, item);
      } else {
        ArrayPush.call(flattened, item);
      }
    }

    return flattened;
  } // [t]ext node


  function t(text) {
    const data = EmptyObject;
    let sel, children, key, elm;
    return {
      sel,
      data,
      children,
      text,
      elm,
      key,
      hook: TextHook,
      owner: getVMBeingRendered()
    };
  } // comment node


  function p(text) {
    const data = EmptyObject;
    const sel = '!';
    let children, key, elm;
    return {
      sel,
      data,
      children,
      text,
      elm,
      key,
      hook: CommentHook,
      owner: getVMBeingRendered()
    };
  } // [d]ynamic value to produce a text vnode


  function d(value) {
    if (value == null) {
      return null;
    }

    return t(value);
  } // [b]ind function


  function b(fn) {
    const vmBeingRendered = getVMBeingRendered();

    if (isNull(vmBeingRendered)) {
      throw new Error();
    }

    const vm = vmBeingRendered;
    return function (event) {
      invokeEventListener(vm, fn, vm.component, event);
    };
  } // [f]unction_[b]ind


  function fb(fn) {
    const vmBeingRendered = getVMBeingRendered();

    if (isNull(vmBeingRendered)) {
      throw new Error();
    }

    const vm = vmBeingRendered;
    return function () {
      return invokeComponentCallback(vm, fn, ArraySlice$1.call(arguments));
    };
  } // [l]ocator_[l]istener function


  function ll(originalHandler, id, context) {
    const vm = getVMBeingRendered();

    if (isNull(vm)) {
      throw new Error();
    } // bind the original handler with b() so we can call it
    // after resolving the locator


    const eventListener = b(originalHandler); // create a wrapping handler to resolve locator, and
    // then invoke the original handler.

    return function (event) {
      // located service for the locator metadata
      const {
        context: {
          locator
        }
      } = vm;

      if (!isUndefined(locator)) {
        const {
          locator: locatorService
        } = Services;

        if (locatorService) {
          locator.resolved = {
            target: id,
            host: locator.id,
            targetContext: isFunction(context) && context(),
            hostContext: isFunction(locator.context) && locator.context()
          }; // a registered `locator` service will be invoked with
          // access to the context.locator.resolved, which will contain:
          // outer id, outer context, inner id, and inner context

          invokeServiceHook(vm, locatorService);
        }
      } // invoke original event listener via b()


      eventListener(event);
    };
  } // [k]ey function


  function k(compilerKey, obj) {
    switch (typeof obj) {
      case 'number':
      case 'string':
        return compilerKey + ':' + obj;

      case 'object':
        {
          assert.fail(`Invalid key value "${obj}" in ${getVMBeingRendered()}. Key must be a string or number.`);
        }

    }
  } // [g]lobal [id] function


  function gid(id) {
    const vmBeingRendered = getVMBeingRendered();

    if (isUndefined(id) || id === '') {
      {
        logError(`Invalid id value "${id}". The id attribute must contain a non-empty string.`, vmBeingRendered);
      }

      return id;
    } // We remove attributes when they are assigned a value of null


    if (isNull(id)) {
      return null;
    }

    return `${id}-${vmBeingRendered.idx}`;
  } // [f]ragment [id] function


  function fid(url) {
    const vmBeingRendered = getVMBeingRendered();

    if (isUndefined(url) || url === '') {
      {
        if (isUndefined(url)) {
          logError(`Undefined url value for "href" or "xlink:href" attribute. Expected a non-empty string.`, vmBeingRendered);
        }
      }

      return url;
    } // We remove attributes when they are assigned a value of null


    if (isNull(url)) {
      return null;
    } // Apply transformation only for fragment-only-urls


    if (/^#/.test(url)) {
      return `${url}-${vmBeingRendered.idx}`;
    }

    return url;
  }
  /**
   * Map to store an index value assigned to any dynamic component reference ingested
   * by dc() api. This allows us to generate a unique unique per template per dynamic
   * component reference to avoid diffing algo mismatches.
   */


  const DynamicImportedComponentMap = new Map();
  let dynamicImportedComponentCounter = 0;
  /**
   * create a dynamic component via `<x-foo lwc:dynamic={Ctor}>`
   */

  function dc(sel, Ctor, data, children) {
    {
      assert.isTrue(isString(sel), `dc() 1st argument sel must be a string.`);
      assert.isTrue(isObject$1(data), `dc() 3nd argument data must be an object.`);
      assert.isTrue(arguments.length === 3 || isArray$1(children), `dc() 4nd argument data must be an array.`);
    } // null or undefined values should produce a null value in the VNodes


    if (Ctor == null) {
      return null;
    }

    if (!isComponentConstructor(Ctor)) {
      throw new Error(`Invalid LWC Constructor ${toString(Ctor)} for custom element <${sel}>.`);
    }

    let idx = DynamicImportedComponentMap.get(Ctor);

    if (isUndefined(idx)) {
      idx = dynamicImportedComponentCounter++;
      DynamicImportedComponentMap.set(Ctor, idx);
    } // the new vnode key is a mix of idx and compiler key, this is required by the diffing algo
    // to identify different constructors as vnodes with different keys to avoid reusing the
    // element used for previous constructors.


    data.key = `dc:${idx}:${data.key}`;
    return c(sel, Ctor, data, children);
  }
  /**
   * slow children collection marking mechanism. this API allows the compiler to signal
   * to the engine that a particular collection of children must be diffed using the slow
   * algo based on keys due to the nature of the list. E.g.:
   *
   *   - slot element's children: the content of the slot has to be dynamic when in synthetic
   *                              shadow mode because the `vnode.children` might be the slotted
   *                              content vs default content, in which case the size and the
   *                              keys are not matching.
   *   - children that contain dynamic components
   *   - children that are produced by iteration
   *
   */


  function sc(vnodes) {
    {
      assert.isTrue(isArray$1(vnodes), 'sc() api can only work with arrays.');
    } // We have to mark the vnodes collection as dynamic so we can later on
    // choose to use the snabbdom virtual dom diffing algo instead of our
    // static dummy algo.


    markAsDynamicChildren(vnodes);
    return vnodes;
  }

  var api = /*#__PURE__*/Object.freeze({
    __proto__: null,
    h: h,
    ti: ti,
    s: s,
    c: c,
    i: i,
    f: f,
    t: t,
    p: p,
    d: d,
    b: b,
    fb: fb,
    ll: ll,
    k: k,
    gid: gid,
    fid: fid,
    dc: dc,
    sc: sc
  });
  const signedTemplateSet = new Set();

  function defaultEmptyTemplate() {
    return [];
  }

  signedTemplateSet.add(defaultEmptyTemplate);

  function isTemplateRegistered(tpl) {
    return signedTemplateSet.has(tpl);
  }
  /**
   * INTERNAL: This function can only be invoked by compiled code. The compiler
   * will prevent this function from being imported by userland code.
   */


  function registerTemplate(tpl) {
    signedTemplateSet.add(tpl); // chaining this method as a way to wrap existing
    // assignment of templates easily, without too much transformation

    return tpl;
  }
  /**
   * EXPERIMENTAL: This function acts like a hook for Lightning Locker
   * Service and other similar libraries to sanitize vulnerable attributes.
   * This API is subject to change or being removed.
   */


  function sanitizeAttribute(tagName, namespaceUri, attrName, attrValue) {
    // locker-service patches this function during runtime to sanitize vulnerable attributes.
    // when ran off-core this function becomes a noop and returns the user authored value.
    return attrValue;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const CachedStyleFragments = create(null);

  function createStyleElement(styleContent) {
    const elm = document.createElement('style');
    elm.type = 'text/css';
    elm.textContent = styleContent;
    return elm;
  }

  function getCachedStyleElement(styleContent) {
    let fragment = CachedStyleFragments[styleContent];

    if (isUndefined(fragment)) {
      fragment = document.createDocumentFragment();
      const styleElm = createStyleElement(styleContent);
      fragment.appendChild(styleElm);
      CachedStyleFragments[styleContent] = fragment;
    }

    return fragment.cloneNode(true).firstChild;
  }

  const globalStyleParent = document.head || document.body || document;
  const InsertedGlobalStyleContent = create(null);

  function insertGlobalStyle(styleContent) {
    // inserts the global style when needed, otherwise does nothing
    if (isUndefined(InsertedGlobalStyleContent[styleContent])) {
      InsertedGlobalStyleContent[styleContent] = true;
      const elm = createStyleElement(styleContent);
      globalStyleParent.appendChild(elm);
    }
  }

  function createStyleVNode(elm) {
    const vnode = h('style', {
      key: 'style'
    }, EmptyArray); // TODO [#1364]: supporting the ability to inject a cloned StyleElement
    // forcing the diffing algo to use the cloned style for native shadow

    vnode.clonedElement = elm;
    return vnode;
  }
  /**
   * Reset the styling token applied to the host element.
   */


  function resetStyleAttributes(vm) {
    const {
      context,
      elm
    } = vm; // Remove the style attribute currently applied to the host element.

    const oldHostAttribute = context.hostAttribute;

    if (!isUndefined(oldHostAttribute)) {
      removeAttribute.call(elm, oldHostAttribute);
    } // Reset the scoping attributes associated to the context.


    context.hostAttribute = context.shadowAttribute = undefined;
  }
  /**
   * Apply/Update the styling token applied to the host element.
   */


  function applyStyleAttributes(vm, hostAttribute, shadowAttribute) {
    const {
      context,
      elm
    } = vm; // Remove the style attribute currently applied to the host element.

    setAttribute.call(elm, hostAttribute, '');
    context.hostAttribute = hostAttribute;
    context.shadowAttribute = shadowAttribute;
  }

  function collectStylesheets(stylesheets, hostSelector, shadowSelector, isNative, aggregatorFn) {
    forEach.call(stylesheets, sheet => {
      if (isArray$1(sheet)) {
        collectStylesheets(sheet, hostSelector, shadowSelector, isNative, aggregatorFn);
      } else {
        aggregatorFn(sheet(hostSelector, shadowSelector, isNative));
      }
    });
  }

  function evaluateCSS(stylesheets, hostAttribute, shadowAttribute) {
    {
      assert.isTrue(isArray$1(stylesheets), `Invalid stylesheets.`);
    }

    if (useSyntheticShadow) {
      const hostSelector = `[${hostAttribute}]`;
      const shadowSelector = `[${shadowAttribute}]`;
      collectStylesheets(stylesheets, hostSelector, shadowSelector, false, textContent => {
        insertGlobalStyle(textContent);
      });
      return null;
    } else {
      // Native shadow in place, we need to act accordingly by using the `:host` selector, and an
      // empty shadow selector since it is not really needed.
      let buffer = '';
      collectStylesheets(stylesheets, emptyString, emptyString, true, textContent => {
        buffer += textContent;
      });
      return createStyleVNode(getCachedStyleElement(buffer));
    }
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  var GlobalMeasurementPhase;

  (function (GlobalMeasurementPhase) {
    GlobalMeasurementPhase["REHYDRATE"] = "lwc-rehydrate";
    GlobalMeasurementPhase["HYDRATE"] = "lwc-hydrate";
  })(GlobalMeasurementPhase || (GlobalMeasurementPhase = {})); // Even if all the browser the engine supports implements the UserTiming API, we need to guard the measure APIs.
  // JSDom (used in Jest) for example doesn't implement the UserTiming APIs.


  const isUserTimingSupported = typeof performance !== 'undefined' && typeof performance.mark === 'function' && typeof performance.clearMarks === 'function' && typeof performance.measure === 'function' && typeof performance.clearMeasures === 'function';

  function getMarkName(phase, vm) {
    // Adding the VM idx to the mark name creates a unique mark name component instance. This is necessary to produce
    // the right measures for components that are recursive.
    return `${getComponentTag(vm)} - ${phase} - ${vm.idx}`;
  }

  function getMeasureName(phase, vm) {
    return `${getComponentTag(vm)} - ${phase}`;
  }

  function start(markName) {
    performance.mark(markName);
  }

  function end(measureName, markName) {
    performance.measure(measureName, markName); // Clear the created marks and measure to avoid filling the performance entries buffer.
    // Note: Even if the entries get deleted, existing PerformanceObservers preserve a copy of those entries.

    performance.clearMarks(markName);
    performance.clearMarks(measureName);
  }

  function noop$1() {
    /* do nothing */
  }

  const startMeasure = !isUserTimingSupported ? noop$1 : function (phase, vm) {
    const markName = getMarkName(phase, vm);
    start(markName);
  };
  const endMeasure = !isUserTimingSupported ? noop$1 : function (phase, vm) {
    const markName = getMarkName(phase, vm);
    const measureName = getMeasureName(phase, vm);
    end(measureName, markName);
  };
  const startGlobalMeasure = !isUserTimingSupported ? noop$1 : function (phase, vm) {
    const markName = isUndefined(vm) ? phase : getMarkName(phase, vm);
    start(markName);
  };
  const endGlobalMeasure = !isUserTimingSupported ? noop$1 : function (phase, vm) {
    const markName = isUndefined(vm) ? phase : getMarkName(phase, vm);
    end(phase, markName);
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  let isUpdatingTemplate = false;
  let vmBeingRendered = null;

  function getVMBeingRendered() {
    return vmBeingRendered;
  }

  function setVMBeingRendered(vm) {
    vmBeingRendered = vm;
  }

  const EmptySlots = create(null);

  function validateSlots(vm, html) {

    const {
      cmpSlots = EmptySlots
    } = vm;
    const {
      slots = EmptyArray
    } = html;

    for (const slotName in cmpSlots) {
      // eslint-disable-next-line lwc-internal/no-production-assert
      assert.isTrue(isArray$1(cmpSlots[slotName]), `Slots can only be set to an array, instead received ${toString(cmpSlots[slotName])} for slot "${slotName}" in ${vm}.`);

      if (slotName !== '' && ArrayIndexOf.call(slots, slotName) === -1) {
        // TODO [#1297]: this should never really happen because the compiler should always validate
        // eslint-disable-next-line lwc-internal/no-production-assert
        logError(`Ignoring unknown provided slot name "${slotName}" in ${vm}. Check for a typo on the slot attribute.`, vm);
      }
    }
  }

  function validateFields(vm, html) {

    const {
      component
    } = vm; // validating identifiers used by template that should be provided by the component

    const {
      ids = []
    } = html;
    forEach.call(ids, propName => {
      if (!(propName in component)) {
        // eslint-disable-next-line lwc-internal/no-production-assert
        logError(`The template rendered by ${vm} references \`this.${propName}\`, which is not declared. Check for a typo in the template.`, vm);
      }
    });
  }

  function evaluateTemplate(vm, html) {
    {
      assert.isTrue(isFunction(html), `evaluateTemplate() second argument must be an imported template instead of ${toString(html)}`);
    }

    const isUpdatingTemplateInception = isUpdatingTemplate;
    const vmOfTemplateBeingUpdatedInception = vmBeingRendered;
    let vnodes = [];
    runWithBoundaryProtection(vm, vm.owner, () => {
      // pre
      vmBeingRendered = vm;

      {
        startMeasure('render', vm);
      }
    }, () => {
      // job
      const {
        component,
        context,
        cmpSlots,
        cmpTemplate,
        tro
      } = vm;
      tro.observe(() => {
        // reset the cache memoizer for template when needed
        if (html !== cmpTemplate) {
          // perf opt: do not reset the shadow root during the first rendering (there is nothing to reset)
          if (!isUndefined(cmpTemplate)) {
            // It is important to reset the content to avoid reusing similar elements generated from a different
            // template, because they could have similar IDs, and snabbdom just rely on the IDs.
            resetShadowRoot(vm);
          } // Check that the template was built by the compiler


          if (isUndefined(html) || !isTemplateRegistered(html)) {
            throw new TypeError(`Invalid template returned by the render() method on ${vm}. It must return an imported template (e.g.: \`import html from "./${vm.def.name}.html"\`), instead, it has returned: ${toString(html)}.`);
          }

          vm.cmpTemplate = html; // Populate context with template information

          context.tplCache = create(null);
          resetStyleAttributes(vm);
          const {
            stylesheets,
            stylesheetTokens
          } = html;

          if (isUndefined(stylesheets) || stylesheets.length === 0) {
            context.styleVNode = null;
          } else if (!isUndefined(stylesheetTokens)) {
            const {
              hostAttribute,
              shadowAttribute
            } = stylesheetTokens;
            applyStyleAttributes(vm, hostAttribute, shadowAttribute); // Caching style vnode so it can be reused on every render

            context.styleVNode = evaluateCSS(stylesheets, hostAttribute, shadowAttribute);
          }

          if ("development" !== 'production') {
            // one time operation for any new template returned by render()
            // so we can warn if the template is attempting to use a binding
            // that is not provided by the component instance.
            validateFields(vm, html);
          }
        }

        if ("development" !== 'production') {
          assert.isTrue(isObject$1(context.tplCache), `vm.context.tplCache must be an object associated to ${cmpTemplate}.`); // validating slots in every rendering since the allocated content might change over time

          validateSlots(vm, html);
        } // right before producing the vnodes, we clear up all internal references
        // to custom elements from the template.


        vm.velements = []; // Set the global flag that template is being updated

        isUpdatingTemplate = true;
        vnodes = html.call(undefined, api, component, cmpSlots, context.tplCache);
        const {
          styleVNode
        } = context;

        if (!isNull(styleVNode)) {
          ArrayUnshift$1.call(vnodes, styleVNode);
        }
      });
    }, () => {
      // post
      isUpdatingTemplate = isUpdatingTemplateInception;
      vmBeingRendered = vmOfTemplateBeingUpdatedInception;

      {
        endMeasure('render', vm);
      }
    });

    {
      assert.invariant(isArray$1(vnodes), `Compiler should produce html functions that always return an array.`);
    }

    return vnodes;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  let isInvokingRender = false;
  let vmBeingConstructed = null;

  function isBeingConstructed(vm) {
    return vmBeingConstructed === vm;
  }

  function invokeComponentCallback(vm, fn, args) {
    const {
      component,
      callHook,
      context,
      owner
    } = vm;
    let result;
    runWithBoundaryProtection(vm, owner, () => {}, () => {
      // job
      result = callHook(component, fn, args);
    }, () => {});
    return result;
  }

  function invokeComponentConstructor(vm, Ctor) {
    const vmBeingConstructedInception = vmBeingConstructed;
    let error;

    {
      startMeasure('constructor', vm);
    }

    vmBeingConstructed = vm;
    /**
     * Constructors don't need to be wrapped with a boundary because for root elements
     * it should throw, while elements from template are already wrapped by a boundary
     * associated to the diffing algo.
     */

    try {
      // job
      const result = new Ctor(); // Check indirectly if the constructor result is an instance of LightningElement. Using
      // the "instanceof" operator would not work here since Locker Service provides its own
      // implementation of LightningElement, so we indirectly check if the base constructor is
      // invoked by accessing the component on the vm.

      if (vmBeingConstructed.component !== result) {
        throw new TypeError('Invalid component constructor, the class should extend LightningElement.');
      }
    } catch (e) {
      error = Object(e);
    } finally {
      {
        endMeasure('constructor', vm);
      }

      vmBeingConstructed = vmBeingConstructedInception;

      if (!isUndefined(error)) {
        error.wcStack = getErrorComponentStack(vm); // re-throwing the original error annotated after restoring the context

        throw error; // eslint-disable-line no-unsafe-finally
      }
    }
  }

  function invokeComponentRenderMethod(vm) {
    const {
      def: {
        render
      },
      callHook,
      component,
      context,
      owner
    } = vm;
    const isRenderBeingInvokedInception = isInvokingRender;
    const vmBeingRenderedInception = getVMBeingRendered();
    let html;
    let renderInvocationSuccessful = false;
    runWithBoundaryProtection(vm, owner, () => {
      isInvokingRender = true;
      setVMBeingRendered(vm);
    }, () => {
      // job
      vm.tro.observe(() => {
        html = callHook(component, render);
        renderInvocationSuccessful = true;
      });
    }, () => {
      isInvokingRender = isRenderBeingInvokedInception;
      setVMBeingRendered(vmBeingRenderedInception);
    }); // If render() invocation failed, process errorCallback in boundary and return an empty template

    return renderInvocationSuccessful ? evaluateTemplate(vm, html) : [];
  }

  function invokeEventListener(vm, fn, thisValue, event) {
    const {
      callHook,
      owner,
      context
    } = vm;
    runWithBoundaryProtection(vm, owner, () => {}, () => {
      // job
      if ("development" !== 'production') {
        assert.isTrue(isFunction(fn), `Invalid event handler for event '${event.type}' on ${vm}.`);
      }

      callHook(thisValue, fn, [event]);
    }, () => {});
  }
  /*
   * Copyright (c) 2019, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const {
    create: create$1
  } = Object;
  const {
    splice: ArraySplice$1,
    indexOf: ArrayIndexOf$1,
    push: ArrayPush$1
  } = Array.prototype;
  const TargetToReactiveRecordMap = new WeakMap();

  function isUndefined$1(obj) {
    return obj === undefined;
  }

  function getReactiveRecord(target) {
    let reactiveRecord = TargetToReactiveRecordMap.get(target);

    if (isUndefined$1(reactiveRecord)) {
      const newRecord = create$1(null);
      reactiveRecord = newRecord;
      TargetToReactiveRecordMap.set(target, newRecord);
    }

    return reactiveRecord;
  }

  let currentReactiveObserver = null;

  function valueMutated(target, key) {
    const reactiveRecord = TargetToReactiveRecordMap.get(target);

    if (!isUndefined$1(reactiveRecord)) {
      const reactiveObservers = reactiveRecord[key];

      if (!isUndefined$1(reactiveObservers)) {
        for (let i = 0, len = reactiveObservers.length; i < len; i += 1) {
          const ro = reactiveObservers[i];
          ro.notify();
        }
      }
    }
  }

  function valueObserved(target, key) {
    // We should determine if an active Observing Record is present to track mutations.
    if (currentReactiveObserver === null) {
      return;
    }

    const ro = currentReactiveObserver;
    const reactiveRecord = getReactiveRecord(target);
    let reactiveObservers = reactiveRecord[key];

    if (isUndefined$1(reactiveObservers)) {
      reactiveObservers = [];
      reactiveRecord[key] = reactiveObservers;
    } else if (reactiveObservers[0] === ro) {
      return; // perf optimization considering that most subscriptions will come from the same record
    }

    if (ArrayIndexOf$1.call(reactiveObservers, ro) === -1) {
      ro.link(reactiveObservers);
    }
  }

  class ReactiveObserver {
    constructor(callback) {
      this.listeners = [];
      this.callback = callback;
    }

    observe(job) {
      const inceptionReactiveRecord = currentReactiveObserver;
      currentReactiveObserver = this;
      let error;

      try {
        job();
      } catch (e) {
        error = Object(e);
      } finally {
        currentReactiveObserver = inceptionReactiveRecord;

        if (error !== undefined) {
          throw error; // eslint-disable-line no-unsafe-finally
        }
      }
    }
    /**
     * This method is responsible for disconnecting the Reactive Observer
     * from any Reactive Record that has a reference to it, to prevent future
     * notifications about previously recorded access.
     */


    reset() {
      const {
        listeners
      } = this;
      const len = listeners.length;

      if (len > 0) {
        for (let i = 0; i < len; i += 1) {
          const set = listeners[i];
          const pos = ArrayIndexOf$1.call(listeners[i], this);
          ArraySplice$1.call(set, pos, 1);
        }

        listeners.length = 0;
      }
    } // friend methods


    notify() {
      this.callback.call(undefined, this);
    }

    link(reactiveObservers) {
      ArrayPush$1.call(reactiveObservers, this); // we keep track of observing records where the observing record was added to so we can do some clean up later on

      ArrayPush$1.call(this.listeners, reactiveObservers);
    }

  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const signedComponentToMetaMap = new Map();
  /**
   * INTERNAL: This function can only be invoked by compiled code. The compiler
   * will prevent this function from being imported by userland code.
   */

  function registerComponent(Ctor, {
    name,
    tmpl: template
  }) {
    signedComponentToMetaMap.set(Ctor, {
      name,
      template
    }); // chaining this method as a way to wrap existing
    // assignment of component constructor easily, without too much transformation

    return Ctor;
  }

  function getComponentRegisteredMeta(Ctor) {
    return signedComponentToMetaMap.get(Ctor);
  }

  function createComponent(uninitializedVm, Ctor) {
    // create the component instance
    invokeComponentConstructor(uninitializedVm, Ctor);
    const initializedVm = uninitializedVm;

    if (isUndefined(initializedVm.component)) {
      throw new ReferenceError(`Invalid construction for ${Ctor}, you must extend LightningElement.`);
    }
  }

  function linkComponent(vm) {
    const {
      def: {
        wire
      }
    } = vm;

    if (!isUndefined(wire)) {
      const {
        wiring
      } = Services;

      if (wiring) {
        invokeServiceHook(vm, wiring);
      }
    }
  }

  function getTemplateReactiveObserver(vm) {
    return new ReactiveObserver(() => {
      {
        assert.invariant(!isInvokingRender, `Mutating property is not allowed during the rendering life-cycle of ${getVMBeingRendered()}.`);
        assert.invariant(!isUpdatingTemplate, `Mutating property is not allowed while updating template of ${getVMBeingRendered()}.`);
      }

      const {
        isDirty
      } = vm;

      if (isFalse$1(isDirty)) {
        markComponentAsDirty(vm);
        scheduleRehydration(vm);
      }
    });
  }

  function renderComponent(vm) {
    {
      assert.invariant(vm.isDirty, `${vm} is not dirty.`);
    }

    vm.tro.reset();
    const vnodes = invokeComponentRenderMethod(vm);
    vm.isDirty = false;
    vm.isScheduled = false;

    {
      assert.invariant(isArray$1(vnodes), `${vm}.render() should always return an array of vnodes instead of ${vnodes}`);
    }

    return vnodes;
  }

  function markComponentAsDirty(vm) {
    {
      const vmBeingRendered = getVMBeingRendered();
      assert.isFalse(vm.isDirty, `markComponentAsDirty() for ${vm} should not be called when the component is already dirty.`);
      assert.isFalse(isInvokingRender, `markComponentAsDirty() for ${vm} cannot be called during rendering of ${vmBeingRendered}.`);
      assert.isFalse(isUpdatingTemplate, `markComponentAsDirty() for ${vm} cannot be called while updating template of ${vmBeingRendered}.`);
    }

    vm.isDirty = true;
  }

  const cmpEventListenerMap = new WeakMap();

  function getWrappedComponentsListener(vm, listener) {
    if (!isFunction(listener)) {
      throw new TypeError(); // avoiding problems with non-valid listeners
    }

    let wrappedListener = cmpEventListenerMap.get(listener);

    if (isUndefined(wrappedListener)) {
      wrappedListener = function (event) {
        invokeEventListener(vm, listener, undefined, event);
      };

      cmpEventListenerMap.set(listener, wrappedListener);
    }

    return wrappedListener;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function createObservedFieldsDescriptorMap(fields) {
    return ArrayReduce.call(fields, (acc, field) => {
      acc[field] = createObservedFieldPropertyDescriptor(field);
      return acc;
    }, {});
  }

  function createObservedFieldPropertyDescriptor(key) {
    return {
      get() {
        const vm = getAssociatedVM(this);
        valueObserved(this, key);
        return vm.cmpTrack[key];
      },

      set(newValue) {
        const vm = getAssociatedVM(this);

        if (newValue !== vm.cmpTrack[key]) {
          vm.cmpTrack[key] = newValue;

          if (isFalse$1(vm.isDirty)) {
            valueMutated(this, key);
          }
        }
      },

      enumerable: true,
      configurable: true
    };
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /**
   * This is a descriptor map that contains
   * all standard properties that a Custom Element can support (including AOM properties), which
   * determines what kind of capabilities the Base HTML Element and
   * Base Lightning Element should support.
   */


  const HTMLElementOriginalDescriptors = create(null);
  forEach.call(ElementPrototypeAriaPropertyNames, propName => {
    // Note: intentionally using our in-house getPropertyDescriptor instead of getOwnPropertyDescriptor here because
    // in IE11, some properties are on Element.prototype instead of HTMLElement, just to be sure.
    const descriptor = getPropertyDescriptor(HTMLElement.prototype, propName);

    if (!isUndefined(descriptor)) {
      HTMLElementOriginalDescriptors[propName] = descriptor;
    }
  });
  forEach.call(defaultDefHTMLPropertyNames, propName => {
    // Note: intentionally using our in-house getPropertyDescriptor instead of getOwnPropertyDescriptor here because
    // in IE11, id property is on Element.prototype instead of HTMLElement, and we suspect that more will fall into
    // this category, so, better to be sure.
    const descriptor = getPropertyDescriptor(HTMLElement.prototype, propName);

    if (!isUndefined(descriptor)) {
      HTMLElementOriginalDescriptors[propName] = descriptor;
    }
  });
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  const ShadowRootInnerHTMLSetter = getOwnPropertyDescriptor(ShadowRoot.prototype, 'innerHTML').set;
  const dispatchEvent = 'EventTarget' in window ? EventTarget.prototype.dispatchEvent : Node.prototype.dispatchEvent; // IE11

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /**
   * This operation is called with a descriptor of an standard html property
   * that a Custom Element can support (including AOM properties), which
   * determines what kind of capabilities the Base Lightning Element should support. When producing the new descriptors
   * for the Base Lightning Element, it also include the reactivity bit, so the standard property is reactive.
   */

  function createBridgeToElementDescriptor(propName, descriptor) {
    const {
      get,
      set,
      enumerable,
      configurable
    } = descriptor;

    if (!isFunction(get)) {
      {
        assert.fail(`Detected invalid public property descriptor for HTMLElement.prototype.${propName} definition. Missing the standard getter.`);
      }

      throw new TypeError();
    }

    if (!isFunction(set)) {
      {
        assert.fail(`Detected invalid public property descriptor for HTMLElement.prototype.${propName} definition. Missing the standard setter.`);
      }

      throw new TypeError();
    }

    return {
      enumerable,
      configurable,

      get() {
        const vm = getAssociatedVM(this);

        if (isBeingConstructed(vm)) {
          {
            const name = vm.elm.constructor.name;
            logError(`\`${name}\` constructor can't read the value of property \`${propName}\` because the owner component hasn't set the value yet. Instead, use the \`${name}\` constructor to set a default value for the property.`, vm);
          }

          return;
        }

        valueObserved(this, propName);
        return get.call(vm.elm);
      },

      set(newValue) {
        const vm = getAssociatedVM(this);

        {
          const vmBeingRendered = getVMBeingRendered();
          assert.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${propName}`);
          assert.invariant(!isUpdatingTemplate, `When updating the template of ${vmBeingRendered}, one of the accessors used by the template has side effects on the state of ${vm}.${propName}`);
          assert.isFalse(isBeingConstructed(vm), `Failed to construct '${getComponentTag(vm)}': The result must not have attributes.`);
          assert.invariant(!isObject$1(newValue) || isNull(newValue), `Invalid value "${newValue}" for "${propName}" of ${vm}. Value cannot be an object, must be a primitive value.`);
        }

        if (newValue !== vm.cmpProps[propName]) {
          vm.cmpProps[propName] = newValue;

          if (isFalse$1(vm.isDirty)) {
            // perf optimization to skip this step if not in the DOM
            valueMutated(this, propName);
          }
        }

        return set.call(vm.elm, newValue);
      }

    };
  }

  function getLinkedElement(cmp) {
    return getAssociatedVM(cmp).elm;
  }
  /**
   * This class is the base class for any LWC element.
   * Some elements directly extends this class, others implement it via inheritance.
   **/


  function BaseLightningElementConstructor() {
    // This should be as performant as possible, while any initialization should be done lazily
    if (isNull(vmBeingConstructed)) {
      throw new ReferenceError('Illegal constructor');
    }

    {
      assert.invariant(vmBeingConstructed.elm instanceof HTMLElement, `Component creation requires a DOM element to be associated to ${vmBeingConstructed}.`);
    }

    const vm = vmBeingConstructed;
    const {
      elm,
      mode,
      def: {
        ctor
      }
    } = vm;
    const component = this;
    vm.component = component;
    vm.tro = getTemplateReactiveObserver(vm);
    vm.oar = create(null); // interaction hooks
    // We are intentionally hiding this argument from the formal API of LWCElement because
    // we don't want folks to know about it just yet.

    if (arguments.length === 1) {
      const {
        callHook,
        setHook,
        getHook
      } = arguments[0];
      vm.callHook = callHook;
      vm.setHook = setHook;
      vm.getHook = getHook;
    } // attaching the shadowRoot


    const shadowRootOptions = {
      mode,
      delegatesFocus: !!ctor.delegatesFocus,
      '$$lwc-synthetic-mode$$': true
    };
    const cmpRoot = elm.attachShadow(shadowRootOptions); // linking elm, shadow root and component with the VM

    associateVM(component, vm);
    associateVM(cmpRoot, vm);
    associateVM(elm, vm); // VM is now initialized

    vm.cmpRoot = cmpRoot;

    {
      patchComponentWithRestrictions(component);
      patchShadowRootWithRestrictions(cmpRoot, EmptyObject);
    }

    return this;
  } // HTML Element - The Good Parts


  BaseLightningElementConstructor.prototype = {
    constructor: BaseLightningElementConstructor,

    dispatchEvent(_event) {
      const elm = getLinkedElement(this); // Typescript does not like it when you treat the `arguments` object as an array
      // @ts-ignore type-mismatch;

      return dispatchEvent.apply(elm, arguments);
    },

    addEventListener(type, listener, options) {
      const vm = getAssociatedVM(this);

      {
        const vmBeingRendered = getVMBeingRendered();
        assert.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm} by adding an event listener for "${type}".`);
        assert.invariant(!isUpdatingTemplate, `Updating the template of ${vmBeingRendered} has side effects on the state of ${vm} by adding an event listener for "${type}".`);
        assert.invariant(isFunction(listener), `Invalid second argument for this.addEventListener() in ${vm} for event "${type}". Expected an EventListener but received ${listener}.`);
      }

      const wrappedListener = getWrappedComponentsListener(vm, listener);
      vm.elm.addEventListener(type, wrappedListener, options);
    },

    removeEventListener(type, listener, options) {
      const vm = getAssociatedVM(this);
      const wrappedListener = getWrappedComponentsListener(vm, listener);
      vm.elm.removeEventListener(type, wrappedListener, options);
    },

    setAttributeNS(ns, attrName, _value) {
      const elm = getLinkedElement(this);

      {
        const vm = getAssociatedVM(this);
        assert.isFalse(isBeingConstructed(vm), `Failed to construct '${getComponentTag(vm)}': The result must not have attributes.`);
      }

      unlockAttribute(elm, attrName); // Typescript does not like it when you treat the `arguments` object as an array
      // @ts-ignore type-mismatch

      elm.setAttributeNS.apply(elm, arguments);
      lockAttribute();
    },

    removeAttributeNS(ns, attrName) {
      const elm = getLinkedElement(this);
      unlockAttribute(elm, attrName); // Typescript does not like it when you treat the `arguments` object as an array
      // @ts-ignore type-mismatch

      elm.removeAttributeNS.apply(elm, arguments);
      lockAttribute();
    },

    removeAttribute(attrName) {
      const elm = getLinkedElement(this);
      unlockAttribute(elm, attrName); // Typescript does not like it when you treat the `arguments` object as an array
      // @ts-ignore type-mismatch

      elm.removeAttribute.apply(elm, arguments);
      lockAttribute();
    },

    setAttribute(attrName, _value) {
      const elm = getLinkedElement(this);

      {
        const vm = getAssociatedVM(this);
        assert.isFalse(isBeingConstructed(vm), `Failed to construct '${getComponentTag(vm)}': The result must not have attributes.`);
      }

      unlockAttribute(elm, attrName); // Typescript does not like it when you treat the `arguments` object as an array
      // @ts-ignore type-mismatch

      elm.setAttribute.apply(elm, arguments);
      lockAttribute();
    },

    getAttribute(attrName) {
      const elm = getLinkedElement(this);
      unlockAttribute(elm, attrName); // Typescript does not like it when you treat the `arguments` object as an array
      // @ts-ignore type-mismatch

      const value = elm.getAttribute.apply(elm, arguments);
      lockAttribute();
      return value;
    },

    getAttributeNS(ns, attrName) {
      const elm = getLinkedElement(this);
      unlockAttribute(elm, attrName); // Typescript does not like it when you treat the `arguments` object as an array
      // @ts-ignore type-mismatch

      const value = elm.getAttributeNS.apply(elm, arguments);
      lockAttribute();
      return value;
    },

    getBoundingClientRect() {
      const elm = getLinkedElement(this);

      {
        const vm = getAssociatedVM(this);
        assert.isFalse(isBeingConstructed(vm), `this.getBoundingClientRect() should not be called during the construction of the custom element for ${getComponentTag(vm)} because the element is not yet in the DOM, instead, you can use it in one of the available life-cycle hooks.`);
      }

      return elm.getBoundingClientRect();
    },

    /**
     * Returns the first element that is a descendant of node that
     * matches selectors.
     */
    // querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
    // querySelector<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
    querySelector(selectors) {
      const vm = getAssociatedVM(this);

      {
        assert.isFalse(isBeingConstructed(vm), `this.querySelector() cannot be called during the construction of the custom element for ${getComponentTag(vm)} because no children has been added to this element yet.`);
      }

      const {
        elm
      } = vm;
      return elm.querySelector(selectors);
    },

    /**
     * Returns all element descendants of node that
     * match selectors.
     */
    // querySelectorAll<K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>,
    // querySelectorAll<K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]>,
    querySelectorAll(selectors) {
      const vm = getAssociatedVM(this);

      {
        assert.isFalse(isBeingConstructed(vm), `this.querySelectorAll() cannot be called during the construction of the custom element for ${getComponentTag(vm)} because no children has been added to this element yet.`);
      }

      const {
        elm
      } = vm;
      return elm.querySelectorAll(selectors);
    },

    /**
     * Returns all element descendants of node that
     * match the provided tagName.
     */
    getElementsByTagName(tagNameOrWildCard) {
      const vm = getAssociatedVM(this);

      {
        assert.isFalse(isBeingConstructed(vm), `this.getElementsByTagName() cannot be called during the construction of the custom element for ${getComponentTag(vm)} because no children has been added to this element yet.`);
      }

      const {
        elm
      } = vm;
      return elm.getElementsByTagName(tagNameOrWildCard);
    },

    /**
     * Returns all element descendants of node that
     * match the provide classnames.
     */
    getElementsByClassName(names) {
      const vm = getAssociatedVM(this);

      {
        assert.isFalse(isBeingConstructed(vm), `this.getElementsByClassName() cannot be called during the construction of the custom element for ${getComponentTag(vm)} because no children has been added to this element yet.`);
      }

      const {
        elm
      } = vm;
      return elm.getElementsByClassName(names);
    },

    get classList() {
      {
        const vm = getAssociatedVM(this); // TODO [#1290]: this still fails in dev but works in production, eventually, we should just throw in all modes

        assert.isFalse(isBeingConstructed(vm), `Failed to construct ${vm}: The result must not have attributes. Adding or tampering with classname in constructor is not allowed in a web component, use connectedCallback() instead.`);
      }

      return getLinkedElement(this).classList;
    },

    get template() {
      const vm = getAssociatedVM(this);
      return vm.cmpRoot;
    },

    get shadowRoot() {
      // From within the component instance, the shadowRoot is always
      // reported as "closed". Authors should rely on this.template instead.
      return null;
    },

    render() {
      const vm = getAssociatedVM(this);
      return vm.def.template;
    },

    toString() {
      const vm = getAssociatedVM(this);
      return `[object ${vm.def.name}]`;
    }

  }; // Typescript is inferring the wrong function type for this particular
  // overloaded method: https://github.com/Microsoft/TypeScript/issues/27972
  // @ts-ignore type-mismatch

  const baseDescriptors = ArrayReduce.call(getOwnPropertyNames(HTMLElementOriginalDescriptors), (descriptors, propName) => {
    descriptors[propName] = createBridgeToElementDescriptor(propName, HTMLElementOriginalDescriptors[propName]);
    return descriptors;
  }, create(null));
  defineProperties(BaseLightningElementConstructor.prototype, baseDescriptors);

  {
    patchLightningElementPrototypeWithRestrictions(BaseLightningElementConstructor.prototype);
  }

  freeze(BaseLightningElementConstructor);
  seal(BaseLightningElementConstructor.prototype); // @ts-ignore

  const BaseLightningElement = BaseLightningElementConstructor;
  /**
   * Copyright (C) 2017 salesforce.com, inc.
   */

  const {
    isArray: isArray$2
  } = Array;
  const {
    getPrototypeOf: getPrototypeOf$1,
    create: ObjectCreate,
    defineProperty: ObjectDefineProperty,
    defineProperties: ObjectDefineProperties,
    isExtensible,
    getOwnPropertyDescriptor: getOwnPropertyDescriptor$1,
    getOwnPropertyNames: getOwnPropertyNames$1,
    getOwnPropertySymbols,
    preventExtensions,
    hasOwnProperty: hasOwnProperty$2
  } = Object;
  const {
    push: ArrayPush$2,
    concat: ArrayConcat,
    map: ArrayMap$1
  } = Array.prototype;
  const OtS$1 = {}.toString;

  function toString$1(obj) {
    if (obj && obj.toString) {
      return obj.toString();
    } else if (typeof obj === 'object') {
      return OtS$1.call(obj);
    } else {
      return obj + '';
    }
  }

  function isUndefined$2(obj) {
    return obj === undefined;
  }

  function isFunction$1(obj) {
    return typeof obj === 'function';
  }

  function isObject$2(obj) {
    return typeof obj === 'object';
  }

  const proxyToValueMap = new WeakMap();

  function registerProxy(proxy, value) {
    proxyToValueMap.set(proxy, value);
  }

  const unwrap = replicaOrAny => proxyToValueMap.get(replicaOrAny) || replicaOrAny;

  function wrapValue(membrane, value) {
    return membrane.valueIsObservable(value) ? membrane.getProxy(value) : value;
  }
  /**
   * Unwrap property descriptors will set value on original descriptor
   * We only need to unwrap if value is specified
   * @param descriptor external descrpitor provided to define new property on original value
   */


  function unwrapDescriptor(descriptor) {
    if (hasOwnProperty$2.call(descriptor, 'value')) {
      descriptor.value = unwrap(descriptor.value);
    }

    return descriptor;
  }

  function lockShadowTarget(membrane, shadowTarget, originalTarget) {
    const targetKeys = ArrayConcat.call(getOwnPropertyNames$1(originalTarget), getOwnPropertySymbols(originalTarget));
    targetKeys.forEach(key => {
      let descriptor = getOwnPropertyDescriptor$1(originalTarget, key); // We do not need to wrap the descriptor if configurable
      // Because we can deal with wrapping it when user goes through
      // Get own property descriptor. There is also a chance that this descriptor
      // could change sometime in the future, so we can defer wrapping
      // until we need to

      if (!descriptor.configurable) {
        descriptor = wrapDescriptor(membrane, descriptor, wrapValue);
      }

      ObjectDefineProperty(shadowTarget, key, descriptor);
    });
    preventExtensions(shadowTarget);
  }

  class ReactiveProxyHandler {
    constructor(membrane, value) {
      this.originalTarget = value;
      this.membrane = membrane;
    }

    get(shadowTarget, key) {
      const {
        originalTarget,
        membrane
      } = this;
      const value = originalTarget[key];
      const {
        valueObserved
      } = membrane;
      valueObserved(originalTarget, key);
      return membrane.getProxy(value);
    }

    set(shadowTarget, key, value) {
      const {
        originalTarget,
        membrane: {
          valueMutated
        }
      } = this;
      const oldValue = originalTarget[key];

      if (oldValue !== value) {
        originalTarget[key] = value;
        valueMutated(originalTarget, key);
      } else if (key === 'length' && isArray$2(originalTarget)) {
        // fix for issue #236: push will add the new index, and by the time length
        // is updated, the internal length is already equal to the new length value
        // therefore, the oldValue is equal to the value. This is the forking logic
        // to support this use case.
        valueMutated(originalTarget, key);
      }

      return true;
    }

    deleteProperty(shadowTarget, key) {
      const {
        originalTarget,
        membrane: {
          valueMutated
        }
      } = this;
      delete originalTarget[key];
      valueMutated(originalTarget, key);
      return true;
    }

    apply(shadowTarget, thisArg, argArray) {
      /* No op */
    }

    construct(target, argArray, newTarget) {
      /* No op */
    }

    has(shadowTarget, key) {
      const {
        originalTarget,
        membrane: {
          valueObserved
        }
      } = this;
      valueObserved(originalTarget, key);
      return key in originalTarget;
    }

    ownKeys(shadowTarget) {
      const {
        originalTarget
      } = this;
      return ArrayConcat.call(getOwnPropertyNames$1(originalTarget), getOwnPropertySymbols(originalTarget));
    }

    isExtensible(shadowTarget) {
      const shadowIsExtensible = isExtensible(shadowTarget);

      if (!shadowIsExtensible) {
        return shadowIsExtensible;
      }

      const {
        originalTarget,
        membrane
      } = this;
      const targetIsExtensible = isExtensible(originalTarget);

      if (!targetIsExtensible) {
        lockShadowTarget(membrane, shadowTarget, originalTarget);
      }

      return targetIsExtensible;
    }

    setPrototypeOf(shadowTarget, prototype) {
      {
        throw new Error(`Invalid setPrototypeOf invocation for reactive proxy ${toString$1(this.originalTarget)}. Prototype of reactive objects cannot be changed.`);
      }
    }

    getPrototypeOf(shadowTarget) {
      const {
        originalTarget
      } = this;
      return getPrototypeOf$1(originalTarget);
    }

    getOwnPropertyDescriptor(shadowTarget, key) {
      const {
        originalTarget,
        membrane
      } = this;
      const {
        valueObserved
      } = this.membrane; // keys looked up via hasOwnProperty need to be reactive

      valueObserved(originalTarget, key);
      let desc = getOwnPropertyDescriptor$1(originalTarget, key);

      if (isUndefined$2(desc)) {
        return desc;
      }

      const shadowDescriptor = getOwnPropertyDescriptor$1(shadowTarget, key);

      if (!isUndefined$2(shadowDescriptor)) {
        return shadowDescriptor;
      } // Note: by accessing the descriptor, the key is marked as observed
      // but access to the value, setter or getter (if available) cannot observe
      // mutations, just like regular methods, in which case we just do nothing.


      desc = wrapDescriptor(membrane, desc, wrapValue);

      if (!desc.configurable) {
        // If descriptor from original target is not configurable,
        // We must copy the wrapped descriptor over to the shadow target.
        // Otherwise, proxy will throw an invariant error.
        // This is our last chance to lock the value.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor#Invariants
        ObjectDefineProperty(shadowTarget, key, desc);
      }

      return desc;
    }

    preventExtensions(shadowTarget) {
      const {
        originalTarget,
        membrane
      } = this;
      lockShadowTarget(membrane, shadowTarget, originalTarget);
      preventExtensions(originalTarget);
      return true;
    }

    defineProperty(shadowTarget, key, descriptor) {
      const {
        originalTarget,
        membrane
      } = this;
      const {
        valueMutated
      } = membrane;
      const {
        configurable
      } = descriptor; // We have to check for value in descriptor
      // because Object.freeze(proxy) calls this method
      // with only { configurable: false, writeable: false }
      // Additionally, method will only be called with writeable:false
      // if the descriptor has a value, as opposed to getter/setter
      // So we can just check if writable is present and then see if
      // value is present. This eliminates getter and setter descriptors

      if (hasOwnProperty$2.call(descriptor, 'writable') && !hasOwnProperty$2.call(descriptor, 'value')) {
        const originalDescriptor = getOwnPropertyDescriptor$1(originalTarget, key);
        descriptor.value = originalDescriptor.value;
      }

      ObjectDefineProperty(originalTarget, key, unwrapDescriptor(descriptor));

      if (configurable === false) {
        ObjectDefineProperty(shadowTarget, key, wrapDescriptor(membrane, descriptor, wrapValue));
      }

      valueMutated(originalTarget, key);
      return true;
    }

  }

  function wrapReadOnlyValue(membrane, value) {
    return membrane.valueIsObservable(value) ? membrane.getReadOnlyProxy(value) : value;
  }

  class ReadOnlyHandler {
    constructor(membrane, value) {
      this.originalTarget = value;
      this.membrane = membrane;
    }

    get(shadowTarget, key) {
      const {
        membrane,
        originalTarget
      } = this;
      const value = originalTarget[key];
      const {
        valueObserved
      } = membrane;
      valueObserved(originalTarget, key);
      return membrane.getReadOnlyProxy(value);
    }

    set(shadowTarget, key, value) {
      {
        const {
          originalTarget
        } = this;
        throw new Error(`Invalid mutation: Cannot set "${key.toString()}" on "${originalTarget}". "${originalTarget}" is read-only.`);
      }
    }

    deleteProperty(shadowTarget, key) {
      {
        const {
          originalTarget
        } = this;
        throw new Error(`Invalid mutation: Cannot delete "${key.toString()}" on "${originalTarget}". "${originalTarget}" is read-only.`);
      }
    }

    apply(shadowTarget, thisArg, argArray) {
      /* No op */
    }

    construct(target, argArray, newTarget) {
      /* No op */
    }

    has(shadowTarget, key) {
      const {
        originalTarget,
        membrane: {
          valueObserved
        }
      } = this;
      valueObserved(originalTarget, key);
      return key in originalTarget;
    }

    ownKeys(shadowTarget) {
      const {
        originalTarget
      } = this;
      return ArrayConcat.call(getOwnPropertyNames$1(originalTarget), getOwnPropertySymbols(originalTarget));
    }

    setPrototypeOf(shadowTarget, prototype) {
      {
        const {
          originalTarget
        } = this;
        throw new Error(`Invalid prototype mutation: Cannot set prototype on "${originalTarget}". "${originalTarget}" prototype is read-only.`);
      }
    }

    getOwnPropertyDescriptor(shadowTarget, key) {
      const {
        originalTarget,
        membrane
      } = this;
      const {
        valueObserved
      } = membrane; // keys looked up via hasOwnProperty need to be reactive

      valueObserved(originalTarget, key);
      let desc = getOwnPropertyDescriptor$1(originalTarget, key);

      if (isUndefined$2(desc)) {
        return desc;
      }

      const shadowDescriptor = getOwnPropertyDescriptor$1(shadowTarget, key);

      if (!isUndefined$2(shadowDescriptor)) {
        return shadowDescriptor;
      } // Note: by accessing the descriptor, the key is marked as observed
      // but access to the value or getter (if available) cannot be observed,
      // just like regular methods, in which case we just do nothing.


      desc = wrapDescriptor(membrane, desc, wrapReadOnlyValue);

      if (hasOwnProperty$2.call(desc, 'set')) {
        desc.set = undefined; // readOnly membrane does not allow setters
      }

      if (!desc.configurable) {
        // If descriptor from original target is not configurable,
        // We must copy the wrapped descriptor over to the shadow target.
        // Otherwise, proxy will throw an invariant error.
        // This is our last chance to lock the value.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor#Invariants
        ObjectDefineProperty(shadowTarget, key, desc);
      }

      return desc;
    }

    preventExtensions(shadowTarget) {
      {
        const {
          originalTarget
        } = this;
        throw new Error(`Invalid mutation: Cannot preventExtensions on ${originalTarget}". "${originalTarget} is read-only.`);
      }
    }

    defineProperty(shadowTarget, key, descriptor) {
      {
        const {
          originalTarget
        } = this;
        throw new Error(`Invalid mutation: Cannot defineProperty "${key.toString()}" on "${originalTarget}". "${originalTarget}" is read-only.`);
      }
    }

  }

  function extract(objectOrArray) {
    if (isArray$2(objectOrArray)) {
      return objectOrArray.map(item => {
        const original = unwrap(item);

        if (original !== item) {
          return extract(original);
        }

        return item;
      });
    }

    const obj = ObjectCreate(getPrototypeOf$1(objectOrArray));
    const names = getOwnPropertyNames$1(objectOrArray);
    return ArrayConcat.call(names, getOwnPropertySymbols(objectOrArray)).reduce((seed, key) => {
      const item = objectOrArray[key];
      const original = unwrap(item);

      if (original !== item) {
        seed[key] = extract(original);
      } else {
        seed[key] = item;
      }

      return seed;
    }, obj);
  }

  const formatter = {
    header: plainOrProxy => {
      const originalTarget = unwrap(plainOrProxy); // if originalTarget is falsy or not unwrappable, exit

      if (!originalTarget || originalTarget === plainOrProxy) {
        return null;
      }

      const obj = extract(plainOrProxy);
      return ['object', {
        object: obj
      }];
    },
    hasBody: () => {
      return false;
    },
    body: () => {
      return null;
    }
  }; // Inspired from paulmillr/es6-shim
  // https://github.com/paulmillr/es6-shim/blob/master/es6-shim.js#L176-L185

  function getGlobal() {
    // the only reliable means to get the global object is `Function('return this')()`
    // However, this causes CSP violations in Chrome apps.
    if (typeof globalThis !== 'undefined') {
      return globalThis;
    }

    if (typeof self !== 'undefined') {
      return self;
    }

    if (typeof window !== 'undefined') {
      return window;
    }

    if (typeof global !== 'undefined') {
      return global;
    } // Gracefully degrade if not able to locate the global object


    return {};
  }

  function init() {

    const global = getGlobal(); // Custom Formatter for Dev Tools. To enable this, open Chrome Dev Tools
    //  - Go to Settings,
    //  - Under console, select "Enable custom formatters"
    // For more information, https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview

    const devtoolsFormatters = global.devtoolsFormatters || [];
    ArrayPush$2.call(devtoolsFormatters, formatter);
    global.devtoolsFormatters = devtoolsFormatters;
  }

  {
    init();
  }

  function createShadowTarget(value) {
    let shadowTarget = undefined;

    if (isArray$2(value)) {
      shadowTarget = [];
    } else if (isObject$2(value)) {
      shadowTarget = {};
    }

    return shadowTarget;
  }

  const ObjectDotPrototype = Object.prototype;

  function defaultValueIsObservable(value) {
    // intentionally checking for null
    if (value === null) {
      return false;
    } // treat all non-object types, including undefined, as non-observable values


    if (typeof value !== 'object') {
      return false;
    }

    if (isArray$2(value)) {
      return true;
    }

    const proto = getPrototypeOf$1(value);
    return proto === ObjectDotPrototype || proto === null || getPrototypeOf$1(proto) === null;
  }

  const defaultValueObserved = (obj, key) => {
    /* do nothing */
  };

  const defaultValueMutated = (obj, key) => {
    /* do nothing */
  };

  const defaultValueDistortion = value => value;

  function wrapDescriptor(membrane, descriptor, getValue) {
    const {
      set,
      get
    } = descriptor;

    if (hasOwnProperty$2.call(descriptor, 'value')) {
      descriptor.value = getValue(membrane, descriptor.value);
    } else {
      if (!isUndefined$2(get)) {
        descriptor.get = function () {
          // invoking the original getter with the original target
          return getValue(membrane, get.call(unwrap(this)));
        };
      }

      if (!isUndefined$2(set)) {
        descriptor.set = function (value) {
          // At this point we don't have a clear indication of whether
          // or not a valid mutation will occur, we don't have the key,
          // and we are not sure why and how they are invoking this setter.
          // Nevertheless we preserve the original semantics by invoking the
          // original setter with the original target and the unwrapped value
          set.call(unwrap(this), membrane.unwrapProxy(value));
        };
      }
    }

    return descriptor;
  }

  class ReactiveMembrane {
    constructor(options) {
      this.valueDistortion = defaultValueDistortion;
      this.valueMutated = defaultValueMutated;
      this.valueObserved = defaultValueObserved;
      this.valueIsObservable = defaultValueIsObservable;
      this.objectGraph = new WeakMap();

      if (!isUndefined$2(options)) {
        const {
          valueDistortion,
          valueMutated,
          valueObserved,
          valueIsObservable
        } = options;
        this.valueDistortion = isFunction$1(valueDistortion) ? valueDistortion : defaultValueDistortion;
        this.valueMutated = isFunction$1(valueMutated) ? valueMutated : defaultValueMutated;
        this.valueObserved = isFunction$1(valueObserved) ? valueObserved : defaultValueObserved;
        this.valueIsObservable = isFunction$1(valueIsObservable) ? valueIsObservable : defaultValueIsObservable;
      }
    }

    getProxy(value) {
      const unwrappedValue = unwrap(value);
      const distorted = this.valueDistortion(unwrappedValue);

      if (this.valueIsObservable(distorted)) {
        const o = this.getReactiveState(unwrappedValue, distorted); // when trying to extract the writable version of a readonly
        // we return the readonly.

        return o.readOnly === value ? value : o.reactive;
      }

      return distorted;
    }

    getReadOnlyProxy(value) {
      value = unwrap(value);
      const distorted = this.valueDistortion(value);

      if (this.valueIsObservable(distorted)) {
        return this.getReactiveState(value, distorted).readOnly;
      }

      return distorted;
    }

    unwrapProxy(p) {
      return unwrap(p);
    }

    getReactiveState(value, distortedValue) {
      const {
        objectGraph
      } = this;
      let reactiveState = objectGraph.get(distortedValue);

      if (reactiveState) {
        return reactiveState;
      }

      const membrane = this;
      reactiveState = {
        get reactive() {
          const reactiveHandler = new ReactiveProxyHandler(membrane, distortedValue); // caching the reactive proxy after the first time it is accessed

          const proxy = new Proxy(createShadowTarget(distortedValue), reactiveHandler);
          registerProxy(proxy, value);
          ObjectDefineProperty(this, 'reactive', {
            value: proxy
          });
          return proxy;
        },

        get readOnly() {
          const readOnlyHandler = new ReadOnlyHandler(membrane, distortedValue); // caching the readOnly proxy after the first time it is accessed

          const proxy = new Proxy(createShadowTarget(distortedValue), readOnlyHandler);
          registerProxy(proxy, value);
          ObjectDefineProperty(this, 'readOnly', {
            value: proxy
          });
          return proxy;
        }

      };
      objectGraph.set(distortedValue, reactiveState);
      return reactiveState;
    }

  }
  /** version: 0.26.0 */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function valueDistortion(value) {
    return value;
  }

  const reactiveMembrane = new ReactiveMembrane({
    valueObserved,
    valueMutated,
    valueDistortion
  });
  /**
   * EXPERIMENTAL: This function implements an unwrap mechanism that
   * works for observable membrane objects. This API is subject to
   * change or being removed.
   */

  const unwrap$1 = function (value) {
    const unwrapped = reactiveMembrane.unwrapProxy(value);

    if (unwrapped !== value) {
      // if value is a proxy, unwrap to access original value and apply distortion
      return valueDistortion(unwrapped);
    }

    return value;
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // from the element instance, and get the value or set a new value on the component.
  // This means that across different elements, similar names can get the exact same
  // descriptor, so we can cache them:


  const cachedGetterByKey = create(null);
  const cachedSetterByKey = create(null);

  function createGetter(key) {
    let fn = cachedGetterByKey[key];

    if (isUndefined(fn)) {
      fn = cachedGetterByKey[key] = function () {
        const vm = getAssociatedVM(this);
        const {
          getHook
        } = vm;
        return getHook(vm.component, key);
      };
    }

    return fn;
  }

  function createSetter(key) {
    let fn = cachedSetterByKey[key];

    if (isUndefined(fn)) {
      fn = cachedSetterByKey[key] = function (newValue) {
        const vm = getAssociatedVM(this);
        const {
          setHook
        } = vm;
        newValue = reactiveMembrane.getReadOnlyProxy(newValue);
        setHook(vm.component, key, newValue);
      };
    }

    return fn;
  }

  function createMethodCaller(methodName) {
    return function () {
      const vm = getAssociatedVM(this);
      const {
        callHook,
        component
      } = vm;
      const fn = component[methodName];
      return callHook(vm.component, fn, ArraySlice$1.call(arguments));
    };
  }

  function HTMLBridgeElementFactory(SuperClass, props, methods) {
    let HTMLBridgeElement;
    /**
     * Modern browsers will have all Native Constructors as regular Classes
     * and must be instantiated with the new keyword. In older browsers,
     * specifically IE11, those are objects with a prototype property defined,
     * since they are not supposed to be extended or instantiated with the
     * new keyword. This forking logic supports both cases, specifically because
     * wc.ts relies on the construction path of the bridges to create new
     * fully qualifying web components.
     */

    if (isFunction(SuperClass)) {
      HTMLBridgeElement = class extends SuperClass {};
    } else {
      HTMLBridgeElement = function () {
        // Bridge classes are not supposed to be instantiated directly in
        // browsers that do not support web components.
        throw new TypeError('Illegal constructor');
      }; // prototype inheritance dance


      setPrototypeOf(HTMLBridgeElement, SuperClass);
      setPrototypeOf(HTMLBridgeElement.prototype, SuperClass.prototype);
      defineProperty(HTMLBridgeElement.prototype, 'constructor', {
        writable: true,
        configurable: true,
        value: HTMLBridgeElement
      });
    }

    const descriptors = create(null); // expose getters and setters for each public props on the new Element Bridge

    for (let i = 0, len = props.length; i < len; i += 1) {
      const propName = props[i];
      descriptors[propName] = {
        get: createGetter(propName),
        set: createSetter(propName),
        enumerable: true,
        configurable: true
      };
    } // expose public methods as props on the new Element Bridge


    for (let i = 0, len = methods.length; i < len; i += 1) {
      const methodName = methods[i];
      descriptors[methodName] = {
        value: createMethodCaller(methodName),
        writable: true,
        configurable: true
      };
    }

    defineProperties(HTMLBridgeElement.prototype, descriptors);
    return HTMLBridgeElement;
  }

  const BaseBridgeElement = HTMLBridgeElementFactory(HTMLElement, getOwnPropertyNames(HTMLElementOriginalDescriptors), []);
  freeze(BaseBridgeElement);
  seal(BaseBridgeElement.prototype);
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  function track(target, prop, descriptor) {
    if (arguments.length === 1) {
      return reactiveMembrane.getProxy(target);
    }

    {
      if (arguments.length !== 3) {
        assert.fail(`@track decorator can only be used with one argument to return a trackable object, or as a decorator function.`);
      }

      if (!isUndefined(descriptor)) {
        const {
          get,
          set,
          configurable,
          writable
        } = descriptor;
        assert.isTrue(!get && !set, `Compiler Error: A @track decorator can only be applied to a public field.`);
        assert.isTrue(configurable !== false, `Compiler Error: A @track decorator can only be applied to a configurable property.`);
        assert.isTrue(writable !== false, `Compiler Error: A @track decorator can only be applied to a writable property.`);
      }
    }

    return createTrackedPropertyDescriptor(target, prop, isUndefined(descriptor) ? true : descriptor.enumerable === true);
  }

  function createTrackedPropertyDescriptor(Ctor, key, enumerable) {
    return {
      get() {
        const vm = getAssociatedVM(this);
        valueObserved(this, key);
        return vm.cmpTrack[key];
      },

      set(newValue) {
        const vm = getAssociatedVM(this);

        {
          const vmBeingRendered = getVMBeingRendered();
          assert.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${toString(key)}`);
          assert.invariant(!isUpdatingTemplate, `Updating the template of ${vmBeingRendered} has side effects on the state of ${vm}.${toString(key)}`);
        }

        const reactiveOrAnyValue = reactiveMembrane.getProxy(newValue);

        if (reactiveOrAnyValue !== vm.cmpTrack[key]) {
          vm.cmpTrack[key] = reactiveOrAnyValue;

          if (isFalse$1(vm.isDirty)) {
            // perf optimization to skip this step if the track property is on a component that is already dirty
            valueMutated(this, key);
          }
        }
      },

      enumerable,
      configurable: true
    };
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function wireDecorator(target, prop, descriptor) {
    {
      if (!isUndefined(descriptor)) {
        const {
          get,
          set,
          configurable,
          writable
        } = descriptor;
        assert.isTrue(!get && !set, `Compiler Error: A @wire decorator can only be applied to a public field.`);
        assert.isTrue(configurable !== false, `Compiler Error: A @wire decorator can only be applied to a configurable property.`);
        assert.isTrue(writable !== false, `Compiler Error: A @wire decorator can only be applied to a writable property.`);
      }
    }

    return createTrackedPropertyDescriptor(target, prop, isObject$1(descriptor) ? descriptor.enumerable === true : true);
  }
  /**
   * @wire decorator to wire fields and methods to a wire adapter in
   * LWC Components. This function implements the internals of this
   * decorator.
   */


  function wire(_adapter, _config) {
    const len = arguments.length;

    if (len > 0 && len < 3) {
      return wireDecorator;
    } else {
      {
        assert.fail('@wire(adapter, config?) may only be used as a decorator.');
      }

      throw new TypeError();
    }
  }
  /**
   * Copyright (C) 2018 salesforce.com, inc.
   */

  /**
   * Copyright (C) 2018 salesforce.com, inc.
   */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const {
    assign: assign$1,
    create: create$2,
    defineProperties: defineProperties$1,
    defineProperty: defineProperty$1,
    freeze: freeze$1,
    getOwnPropertyDescriptor: getOwnPropertyDescriptor$2,
    getOwnPropertyNames: getOwnPropertyNames$2,
    getPrototypeOf: getPrototypeOf$2,
    hasOwnProperty: hasOwnProperty$3,
    keys: keys$1,
    seal: seal$1,
    setPrototypeOf: setPrototypeOf$1
  } = Object;

  function isUndefined$3(obj) {
    return obj === undefined;
  }

  function isTrue$1$1(obj) {
    return obj === true;
  }

  function isFalse$1$1(obj) {
    return obj === false;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /*
   * In IE11, symbols are expensive.
   * Due to the nature of the symbol polyfill. This method abstract the
   * creation of symbols, so we can fallback to string when native symbols
   * are not supported. Note that we can't use typeof since it will fail when transpiling.
   */


  const hasNativeSymbolsSupport$1 = Symbol('x').toString() === 'Symbol(x)';
  /** version: 1.1.13-224.5 */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // Cached reference to globalThis

  let _globalThis;

  if (typeof globalThis === 'object') {
    _globalThis = globalThis;
  }

  function getGlobalThis() {
    if (typeof _globalThis === 'object') {
      return _globalThis;
    }

    try {
      // eslint-disable-next-line no-extend-native
      Object.defineProperty(Object.prototype, '__magic__', {
        get: function () {
          return this;
        },
        configurable: true
      }); // @ts-ignore
      // __magic__ is undefined in Safari 10 and IE10 and older.
      // eslint-disable-next-line no-undef

      _globalThis = __magic__; // @ts-ignore

      delete Object.prototype.__magic__;
    } catch (ex) {// In IE8, Object.defineProperty only works on DOM objects.
    } finally {
      // If the magic above fails for some reason we assume that we are in a
      // legacy browser. Assume `window` exists in this case.
      if (typeof _globalThis === 'undefined') {
        _globalThis = window;
      }
    }

    return _globalThis;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const _globalThis$1 = getGlobalThis();

  if (!_globalThis$1.lwcRuntimeFlags) {
    Object.defineProperty(_globalThis$1, 'lwcRuntimeFlags', {
      value: create$2(null)
    });
  }

  const runtimeFlags = _globalThis$1.lwcRuntimeFlags; // This function is not supported for use within components and is meant for
  // configuring runtime feature flags during app initialization.

  function setFeatureFlag(name, value) {
    const isBoolean = isTrue$1$1(value) || isFalse$1$1(value);

    if (!isBoolean) {
      const message = `Failed to set the value "${value}" for the runtime feature flag "${name}". Runtime feature flags can only be set to a boolean value.`;

      {
        throw new TypeError(message);
      }
    }

    if (isUndefined$3(featureFlagLookup[name])) {
      // eslint-disable-next-line no-console
      console.warn(`Failed to set the value "${value}" for the runtime feature flag "${name}" because it is undefined. Possible reasons are that 1) it was misspelled or 2) it was removed from the @lwc/features package.`);
      return;
    }

    {
      // Allow the same flag to be set more than once outside of production to enable testing
      runtimeFlags[name] = value;
    }
  } // This function is exposed to components to facilitate testing so we add a
  // check to make sure it is not invoked in production.


  function setFeatureFlagForTest(name, value) {
    {
      return setFeatureFlag(name, value);
    }
  }

  const featureFlagLookup = {
    ENABLE_REACTIVE_SETTER: null,
    // Flags to toggle on/off the enforcement of shadow dom semantic in element/node outside lwc boundary when using synthetic shadow.
    ENABLE_ELEMENT_PATCH: null,
    ENABLE_NODE_LIST_PATCH: null,
    ENABLE_HTML_COLLECTIONS_PATCH: null,
    ENABLE_NODE_PATCH: null
  };
  /** version: 1.1.13-224.5 */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /**
   * @api decorator to mark public fields and public methods in
   * LWC Components. This function implements the internals of this
   * decorator.
   */

  function api$1(target, propName, descriptor) {
    {
      if (arguments.length !== 3) {
        assert.fail(`@api decorator can only be used as a decorator function.`);
      }
    }

    {
      assert.invariant(!descriptor || isFunction(descriptor.get) || isFunction(descriptor.set), `Invalid property ${toString(propName)} definition in ${target}, it cannot be a prototype definition if it is a public property. Instead use the constructor to define it.`);

      if (isObject$1(descriptor) && isFunction(descriptor.set)) {
        assert.isTrue(isObject$1(descriptor) && isFunction(descriptor.get), `Missing getter for property ${toString(propName)} decorated with @api in ${target}. You cannot have a setter without the corresponding getter.`);
      }
    }

    const meta = getDecoratorsRegisteredMeta(target); // initializing getters and setters for each public prop on the target prototype

    if (isObject$1(descriptor) && (isFunction(descriptor.get) || isFunction(descriptor.set))) {
      // if it is configured as an accessor it must have a descriptor
      // @ts-ignore it must always be set before calling this method
      meta.props[propName].config = isFunction(descriptor.set) ? 3 : 1;
      return createPublicAccessorDescriptor(target, propName, descriptor);
    } else {
      // @ts-ignore it must always be set before calling this method
      meta.props[propName].config = 0;
      return createPublicPropertyDescriptor(target, propName, descriptor);
    }
  }

  function createPublicPropertyDescriptor(proto, key, descriptor) {
    return {
      get() {
        const vm = getAssociatedVM(this);

        if (isBeingConstructed(vm)) {
          {
            const name = vm.elm.constructor.name;
            logError(`\`${name}\` constructor can’t read the value of property \`${toString(key)}\` because the owner component hasn’t set the value yet. Instead, use the \`${name}\` constructor to set a default value for the property.`, vm);
          }

          return;
        }

        valueObserved(this, key);
        return vm.cmpProps[key];
      },

      set(newValue) {
        const vm = getAssociatedVM(this);

        {
          const vmBeingRendered = getVMBeingRendered();
          assert.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${toString(key)}`);
          assert.invariant(!isUpdatingTemplate, `Updating the template of ${vmBeingRendered} has side effects on the state of ${vm}.${toString(key)}`);
        }

        vm.cmpProps[key] = newValue; // avoid notification of observability if the instance is already dirty

        if (isFalse$1(vm.isDirty)) {
          // perf optimization to skip this step if the component is dirty already.
          valueMutated(this, key);
        }
      },

      enumerable: isUndefined(descriptor) ? true : descriptor.enumerable
    };
  }

  class AccessorReactiveObserver extends ReactiveObserver {
    constructor(vm, set) {
      super(() => {
        if (isFalse$1(this.debouncing)) {
          this.debouncing = true;
          addCallbackToNextTick(() => {
            if (isTrue$1(this.debouncing)) {
              const {
                value
              } = this;
              const {
                isDirty: dirtyStateBeforeSetterCall,
                component,
                idx
              } = vm;
              set.call(component, value); // de-bouncing after the call to the original setter to prevent
              // infinity loop if the setter itself is mutating things that
              // were accessed during the previous invocation.

              this.debouncing = false;

              if (isTrue$1(vm.isDirty) && isFalse$1(dirtyStateBeforeSetterCall) && idx > 0) {
                // immediate rehydration due to a setter driven mutation, otherwise
                // the component will get rendered on the second tick, which it is not
                // desirable.
                rerenderVM(vm);
              }
            }
          });
        }
      });
      this.debouncing = false;
    }

    reset(value) {
      super.reset();
      this.debouncing = false;

      if (arguments.length > 0) {
        this.value = value;
      }
    }

  }

  function createPublicAccessorDescriptor(Ctor, key, descriptor) {
    const {
      get,
      set,
      enumerable
    } = descriptor;

    if (!isFunction(get)) {
      {
        assert.fail(`Invalid attempt to create public property descriptor ${toString(key)} in ${Ctor}. It is missing the getter declaration with @api get ${toString(key)}() {} syntax.`);
      }

      throw new TypeError();
    }

    return {
      get() {
        {
          // Assert that the this value is an actual Component with an associated VM.
          getAssociatedVM(this);
        }

        return get.call(this);
      },

      set(newValue) {
        const vm = getAssociatedVM(this);

        {
          const vmBeingRendered = getVMBeingRendered();
          assert.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${toString(key)}`);
          assert.invariant(!isUpdatingTemplate, `Updating the template of ${vmBeingRendered} has side effects on the state of ${vm}.${toString(key)}`);
        }

        if (set) {
          if (runtimeFlags.ENABLE_REACTIVE_SETTER) {
            let ro = vm.oar[key];

            if (isUndefined(ro)) {
              ro = vm.oar[key] = new AccessorReactiveObserver(vm, set);
            } // every time we invoke this setter from outside (through this wrapper setter)
            // we should reset the value and then debounce just in case there is a pending
            // invocation the next tick that is not longer relevant since the value is changing
            // from outside.


            ro.reset(newValue);
            ro.observe(() => {
              set.call(this, newValue);
            });
          } else {
            set.call(this, newValue);
          }
        } else {
          assert.fail(`Invalid attempt to set a new value for property ${toString(key)} of ${vm} that does not has a setter decorated with @api.`);
        }
      },

      enumerable
    };
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /**
   * EXPERIMENTAL: This function allows for the registration of "services" in
   * LWC by exposing hooks into the component life-cycle. This API is subject
   * to change or being removed.
   */


  function decorate(Ctor, decorators) {
    // intentionally comparing decorators with null and undefined
    if (!isFunction(Ctor) || decorators == null) {
      throw new TypeError();
    }

    const props = getOwnPropertyNames(decorators); // intentionally allowing decoration of classes only for now

    const target = Ctor.prototype;

    for (let i = 0, len = props.length; i < len; i += 1) {
      const propName = props[i];
      const decorator = decorators[propName];

      if (!isFunction(decorator)) {
        throw new TypeError();
      }

      const originalDescriptor = getOwnPropertyDescriptor(target, propName);
      const descriptor = decorator(Ctor, propName, originalDescriptor);

      if (!isUndefined(descriptor)) {
        defineProperty(target, propName, descriptor);
      }
    }

    return Ctor; // chaining
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const signedDecoratorToMetaMap = new Map();
  /**
   * INTERNAL: This function can only be invoked by compiled code. The compiler
   * will prevent this function from being imported by userland code.
   */

  function registerDecorators(Ctor, meta) {
    const decoratorMap = create(null);
    const props = getPublicPropertiesHash(Ctor, meta.publicProps);
    const methods = getPublicMethodsHash(Ctor, meta.publicMethods);
    const wire$1 = getWireHash(Ctor, meta.wire);
    const track$1 = getTrackHash(Ctor, meta.track);
    const fields = meta.fields;
    signedDecoratorToMetaMap.set(Ctor, {
      props,
      methods,
      wire: wire$1,
      track: track$1,
      fields
    });

    for (const propName in props) {
      decoratorMap[propName] = api$1;
    }

    if (wire$1) {
      for (const propName in wire$1) {
        const wireDef = wire$1[propName];

        if (wireDef.method) {
          // for decorated methods we need to do nothing
          continue;
        }

        decoratorMap[propName] = wire(wireDef.adapter, wireDef.params);
      }
    }

    if (track$1) {
      for (const propName in track$1) {
        decoratorMap[propName] = track;
      }
    }

    decorate(Ctor, decoratorMap);
    return Ctor;
  }

  function getDecoratorsRegisteredMeta(Ctor) {
    return signedDecoratorToMetaMap.get(Ctor);
  }

  function getTrackHash(target, track) {
    if (isUndefined(track) || getOwnPropertyNames(track).length === 0) {
      return EmptyObject;
    } // TODO [#1302]: check that anything in `track` is correctly defined in the prototype


    return assign(create(null), track);
  }

  function getWireHash(target, wire) {
    if (isUndefined(wire) || getOwnPropertyNames(wire).length === 0) {
      return;
    } // TODO [#1302]: check that anything in `wire` is correctly defined in the prototype


    return assign(create(null), wire);
  }

  function getPublicPropertiesHash(target, props) {
    if (isUndefined(props) || getOwnPropertyNames(props).length === 0) {
      return EmptyObject;
    }

    return getOwnPropertyNames(props).reduce((propsHash, propName) => {
      const attr = getAttrNameFromPropName(propName);
      propsHash[propName] = assign({
        config: 0,
        type: 'any',
        attr
      }, props[propName]);
      return propsHash;
    }, create(null));
  }

  function getPublicMethodsHash(target, publicMethods) {
    if (isUndefined(publicMethods) || publicMethods.length === 0) {
      return EmptyObject;
    }

    return publicMethods.reduce((methodsHash, methodName) => {
      {
        assert.isTrue(isFunction(target.prototype[methodName]), `Component "${target.name}" should have a method \`${methodName}\` instead of ${target.prototype[methodName]}.`);
      }

      methodsHash[methodName] = target.prototype[methodName];
      return methodsHash;
    }, create(null));
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const CtorToDefMap = new WeakMap();

  function getCtorProto(Ctor, subclassComponentName) {
    let proto = getPrototypeOf(Ctor);

    if (isNull(proto)) {
      throw new ReferenceError(`Invalid prototype chain for ${subclassComponentName}, you must extend LightningElement.`);
    } // covering the cases where the ref is circular in AMD


    if (isCircularModuleDependency(proto)) {
      const p = resolveCircularModuleDependency(proto);

      {
        if (isNull(p)) {
          throw new ReferenceError(`Circular module dependency for ${subclassComponentName}, must resolve to a constructor that extends LightningElement.`);
        }
      } // escape hatch for Locker and other abstractions to provide their own base class instead
      // of our Base class without having to leak it to user-land. If the circular function returns
      // itself, that's the signal that we have hit the end of the proto chain, which must always
      // be base.


      proto = p === proto ? BaseLightningElement : p;
    }

    return proto;
  }

  function createComponentDef(Ctor, meta, subclassComponentName) {
    {
      // local to dev block
      const ctorName = Ctor.name; // Removing the following assert until https://bugs.webkit.org/show_bug.cgi?id=190140 is fixed.
      // assert.isTrue(ctorName && isString(ctorName), `${toString(Ctor)} should have a "name" property with string value, but found ${ctorName}.`);

      assert.isTrue(Ctor.constructor, `Missing ${ctorName}.constructor, ${ctorName} should have a "constructor" property.`);
    }

    const {
      name
    } = meta;
    let {
      template
    } = meta;
    const decoratorsMeta = getDecoratorsRegisteredMeta(Ctor);
    let props = {};
    let methods = {};
    let wire;
    let track = {};
    let fields;

    if (!isUndefined(decoratorsMeta)) {
      props = decoratorsMeta.props;
      methods = decoratorsMeta.methods;
      wire = decoratorsMeta.wire;
      track = decoratorsMeta.track;
      fields = decoratorsMeta.fields;
    }

    const proto = Ctor.prototype;
    let {
      connectedCallback,
      disconnectedCallback,
      renderedCallback,
      errorCallback,
      render
    } = proto;
    const superProto = getCtorProto(Ctor, subclassComponentName);
    const superDef = superProto !== BaseLightningElement ? getComponentDef(superProto, subclassComponentName) : null;
    const SuperBridge = isNull(superDef) ? BaseBridgeElement : superDef.bridge;
    const bridge = HTMLBridgeElementFactory(SuperBridge, getOwnPropertyNames(props), getOwnPropertyNames(methods));

    if (!isNull(superDef)) {
      props = assign(create(null), superDef.props, props);
      methods = assign(create(null), superDef.methods, methods);
      wire = superDef.wire || wire ? assign(create(null), superDef.wire, wire) : undefined;
      track = assign(create(null), superDef.track, track);
      connectedCallback = connectedCallback || superDef.connectedCallback;
      disconnectedCallback = disconnectedCallback || superDef.disconnectedCallback;
      renderedCallback = renderedCallback || superDef.renderedCallback;
      errorCallback = errorCallback || superDef.errorCallback;
      render = render || superDef.render;
      template = template || superDef.template;
    }

    props = assign(create(null), HTML_PROPS, props);

    if (!isUndefined(fields)) {
      defineProperties(proto, createObservedFieldsDescriptorMap(fields));
    }

    if (isUndefined(template)) {
      // default template
      template = defaultEmptyTemplate;
    }

    const def = {
      ctor: Ctor,
      name,
      wire,
      track,
      props,
      methods,
      bridge,
      template,
      connectedCallback,
      disconnectedCallback,
      renderedCallback,
      errorCallback,
      render
    };

    {
      freeze(Ctor.prototype);
    }

    return def;
  }
  /**
   * EXPERIMENTAL: This function allows for the identification of LWC
   * constructors. This API is subject to change or being removed.
   */


  function isComponentConstructor(ctor) {
    if (!isFunction(ctor)) {
      return false;
    } // Fast path: LightningElement is part of the prototype chain of the constructor.


    if (ctor.prototype instanceof BaseLightningElement) {
      return true;
    } // Slow path: LightningElement is not part of the prototype chain of the constructor, we need
    // climb up the constructor prototype chain to check in case there are circular dependencies
    // to resolve.


    let current = ctor;

    do {
      if (isCircularModuleDependency(current)) {
        const circularResolved = resolveCircularModuleDependency(current); // If the circular function returns itself, that's the signal that we have hit the end of the proto chain,
        // which must always be a valid base constructor.

        if (circularResolved === current) {
          return true;
        }

        current = circularResolved;
      }

      if (current === BaseLightningElement) {
        return true;
      }
    } while (!isNull(current) && (current = getPrototypeOf(current))); // Finally return false if the LightningElement is not part of the prototype chain.


    return false;
  }
  /**
   * EXPERIMENTAL: This function allows for the collection of internal
   * component metadata. This API is subject to change or being removed.
   */


  function getComponentDef(Ctor, subclassComponentName) {
    let def = CtorToDefMap.get(Ctor);

    if (isUndefined(def)) {
      if (!isComponentConstructor(Ctor)) {
        throw new TypeError(`${Ctor} is not a valid component, or does not extends LightningElement from "lwc". You probably forgot to add the extend clause on the class declaration.`);
      }

      let meta = getComponentRegisteredMeta(Ctor);

      if (isUndefined(meta)) {
        // TODO [#1295]: remove this workaround after refactoring tests
        meta = {
          template: undefined,
          name: Ctor.name
        };
      }

      def = createComponentDef(Ctor, meta, subclassComponentName || Ctor.name);
      CtorToDefMap.set(Ctor, def);
    }

    return def;
  }
  /**
   * EXPERIMENTAL: This function provides access to the component constructor,
   * given an HTMLElement. This API is subject to change or being removed.
   */


  function getComponentConstructor(elm) {
    let ctor = null;

    if (elm instanceof HTMLElement) {
      const vm = getAssociatedVMIfPresent(elm);

      if (!isUndefined(vm)) {
        ctor = vm.def.ctor;
      }
    }

    return ctor;
  } // Only set prototype for public methods and properties
  // No DOM Patching occurs here


  function setElementProto(elm, def) {
    setPrototypeOf(elm, def.bridge.prototype);
  } // Typescript is inferring the wrong function type for this particular
  // overloaded method: https://github.com/Microsoft/TypeScript/issues/27972
  // @ts-ignore type-mismatch


  const HTML_PROPS = ArrayReduce.call(getOwnPropertyNames(HTMLElementOriginalDescriptors), (props, propName) => {
    const attrName = getAttrNameFromPropName(propName);
    props[propName] = {
      config: 3,
      type: 'any',
      attr: attrName
    };
    return props;
  }, create(null));
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  var VMState;

  (function (VMState) {
    VMState[VMState["created"] = 0] = "created";
    VMState[VMState["connected"] = 1] = "connected";
    VMState[VMState["disconnected"] = 2] = "disconnected";
  })(VMState || (VMState = {}));

  let idx = 0;
  /** The internal slot used to associate different objects the engine manipulates with the VM */

  const ViewModelReflection = createHiddenField('ViewModel', 'engine');

  function callHook(cmp, fn, args = []) {
    return fn.apply(cmp, args);
  }

  function setHook(cmp, prop, newValue) {
    cmp[prop] = newValue;
  }

  function getHook(cmp, prop) {
    return cmp[prop];
  }

  function rerenderVM(vm) {
    rehydrate(vm);
  }

  function appendRootVM(vm) {
    runConnectedCallback(vm);
    rehydrate(vm);
  }

  function appendVM(vm) {
    rehydrate(vm);
  } // just in case the component comes back, with this we guarantee re-rendering it
  // while preventing any attempt to rehydration until after reinsertion.


  function resetComponentStateWhenRemoved(vm) {
    const {
      state
    } = vm;

    if (state !== VMState.disconnected) {
      const {
        oar,
        tro
      } = vm; // Making sure that any observing record will not trigger the rehydrated on this vm

      tro.reset(); // Making sure that any observing accessor record will not trigger the setter to be reinvoked

      for (const key in oar) {
        oar[key].reset();
      }

      runDisconnectedCallback(vm); // Spec: https://dom.spec.whatwg.org/#concept-node-remove (step 14-15)

      runShadowChildNodesDisconnectedCallback(vm);
      runLightChildNodesDisconnectedCallback(vm);
    }
  } // this method is triggered by the diffing algo only when a vnode from the
  // old vnode.children is removed from the DOM.


  function removeVM(vm) {
    {
      assert.isTrue(vm.state === VMState.connected || vm.state === VMState.disconnected, `${vm} must have been connected.`);
    }

    resetComponentStateWhenRemoved(vm);
  } // this method is triggered by the removal of a root element from the DOM.


  function removeRootVM(vm) {
    resetComponentStateWhenRemoved(vm);
  }

  function createVM(elm, Ctor, options) {
    {
      assert.invariant(elm instanceof HTMLElement, `VM creation requires a DOM element instead of ${elm}.`);
    }

    const def = getComponentDef(Ctor);
    const {
      isRoot,
      mode,
      owner
    } = options;
    idx += 1;
    const uninitializedVm = {
      // component creation index is defined once, and never reset, it can
      // be preserved from one insertion to another without any issue
      idx,
      state: VMState.created,
      isScheduled: false,
      isDirty: true,
      isRoot: isTrue$1(isRoot),
      mode,
      def,
      owner,
      elm,
      data: EmptyObject,
      context: create(null),
      cmpProps: create(null),
      cmpTrack: create(null),
      cmpSlots: useSyntheticShadow ? create(null) : undefined,
      callHook,
      setHook,
      getHook,
      children: EmptyArray,
      aChildren: EmptyArray,
      velements: EmptyArray,
      // Perf optimization to preserve the shape of this obj
      cmpTemplate: undefined,
      component: undefined,
      cmpRoot: undefined,
      tro: undefined,
      oar: undefined
    };

    {
      uninitializedVm.toString = () => {
        return `[object:vm ${def.name} (${uninitializedVm.idx})]`;
      };
    } // create component instance associated to the vm and the element


    createComponent(uninitializedVm, Ctor); // link component to the wire service

    const initializedVm = uninitializedVm;
    linkComponent(initializedVm);
  }

  function assertIsVM(obj) {
    if (isNull(obj) || !isObject$1(obj) || !('cmpRoot' in obj)) {
      throw new TypeError(`${obj} is not a VM.`);
    }
  }

  function associateVM(obj, vm) {
    setHiddenField(obj, ViewModelReflection, vm);
  }

  function getAssociatedVM(obj) {
    const vm = getHiddenField(obj, ViewModelReflection);

    {
      assertIsVM(vm);
    }

    return vm;
  }

  function getAssociatedVMIfPresent(obj) {
    const maybeVm = getHiddenField(obj, ViewModelReflection);

    {
      if (!isUndefined(maybeVm)) {
        assertIsVM(maybeVm);
      }
    }

    return maybeVm;
  }

  function rehydrate(vm) {
    {
      assert.isTrue(vm.elm instanceof HTMLElement, `rehydration can only happen after ${vm} was patched the first time.`);
    }

    if (isTrue$1(vm.isDirty)) {
      const children = renderComponent(vm);
      patchShadowRoot(vm, children);
    }
  }

  function patchShadowRoot(vm, newCh) {
    const {
      cmpRoot,
      children: oldCh
    } = vm;
    vm.children = newCh; // caching the new children collection

    if (newCh.length > 0 || oldCh.length > 0) {
      // patch function mutates vnodes by adding the element reference,
      // however, if patching fails it contains partial changes.
      if (oldCh !== newCh) {
        const fn = hasDynamicChildren(newCh) ? updateDynamicChildren : updateStaticChildren;
        runWithBoundaryProtection(vm, vm, () => {
          // pre
          {
            startMeasure('patch', vm);
          }
        }, () => {
          // job
          fn(cmpRoot, oldCh, newCh);
        }, () => {
          // post
          {
            endMeasure('patch', vm);
          }
        });
      }
    }

    if (vm.state === VMState.connected) {
      // If the element is connected, that means connectedCallback was already issued, and
      // any successive rendering should finish with the call to renderedCallback, otherwise
      // the connectedCallback will take care of calling it in the right order at the end of
      // the current rehydration process.
      runRenderedCallback(vm);
    }
  }

  function runRenderedCallback(vm) {
    const {
      rendered
    } = Services;

    if (rendered) {
      invokeServiceHook(vm, rendered);
    }

    const {
      renderedCallback
    } = vm.def;

    if (!isUndefined(renderedCallback)) {
      {
        startMeasure('renderedCallback', vm);
      }

      invokeComponentCallback(vm, renderedCallback);

      {
        endMeasure('renderedCallback', vm);
      }
    }
  }

  let rehydrateQueue = [];

  function flushRehydrationQueue() {
    startGlobalMeasure(GlobalMeasurementPhase.REHYDRATE);

    {
      assert.invariant(rehydrateQueue.length, `If rehydrateQueue was scheduled, it is because there must be at least one VM on this pending queue instead of ${rehydrateQueue}.`);
    }

    const vms = rehydrateQueue.sort((a, b) => a.idx - b.idx);
    rehydrateQueue = []; // reset to a new queue

    for (let i = 0, len = vms.length; i < len; i += 1) {
      const vm = vms[i];

      try {
        rehydrate(vm);
      } catch (error) {
        if (i + 1 < len) {
          // pieces of the queue are still pending to be rehydrated, those should have priority
          if (rehydrateQueue.length === 0) {
            addCallbackToNextTick(flushRehydrationQueue);
          }

          ArrayUnshift$1.apply(rehydrateQueue, ArraySlice$1.call(vms, i + 1));
        } // we need to end the measure before throwing.


        endGlobalMeasure(GlobalMeasurementPhase.REHYDRATE); // re-throwing the original error will break the current tick, but since the next tick is
        // already scheduled, it should continue patching the rest.

        throw error; // eslint-disable-line no-unsafe-finally
      }
    }

    endGlobalMeasure(GlobalMeasurementPhase.REHYDRATE);
  }

  function runConnectedCallback(vm) {
    const {
      state
    } = vm;

    if (state === VMState.connected) {
      return; // nothing to do since it was already connected
    }

    vm.state = VMState.connected; // reporting connection

    const {
      connected
    } = Services;

    if (connected) {
      invokeServiceHook(vm, connected);
    }

    const {
      connectedCallback
    } = vm.def;

    if (!isUndefined(connectedCallback)) {
      {
        startMeasure('connectedCallback', vm);
      }

      invokeComponentCallback(vm, connectedCallback);

      {
        endMeasure('connectedCallback', vm);
      }
    }
  }

  function runDisconnectedCallback(vm) {
    {
      assert.isTrue(vm.state !== VMState.disconnected, `${vm} must be inserted.`);
    }

    if (isFalse$1(vm.isDirty)) {
      // this guarantees that if the component is reused/reinserted,
      // it will be re-rendered because we are disconnecting the reactivity
      // linking, so mutations are not automatically reflected on the state
      // of disconnected components.
      vm.isDirty = true;
    }

    vm.state = VMState.disconnected; // reporting disconnection

    const {
      disconnected
    } = Services;

    if (disconnected) {
      invokeServiceHook(vm, disconnected);
    }

    const {
      disconnectedCallback
    } = vm.def;

    if (!isUndefined(disconnectedCallback)) {
      {
        startMeasure('disconnectedCallback', vm);
      }

      invokeComponentCallback(vm, disconnectedCallback);

      {
        endMeasure('disconnectedCallback', vm);
      }
    }
  }

  function runShadowChildNodesDisconnectedCallback(vm) {
    const {
      velements: vCustomElementCollection
    } = vm; // reporting disconnection for every child in inverse order since they are inserted in reserved order

    for (let i = vCustomElementCollection.length - 1; i >= 0; i -= 1) {
      const elm = vCustomElementCollection[i].elm; // There are two cases where the element could be undefined:
      // * when there is an error during the construction phase, and an
      //   error boundary picks it, there is a possibility that the VCustomElement
      //   is not properly initialized, and therefore is should be ignored.
      // * when slotted custom element is not used by the element where it is slotted
      //   into it, as a result, the custom element was never initialized.

      if (!isUndefined(elm)) {
        const childVM = getAssociatedVM(elm);
        resetComponentStateWhenRemoved(childVM);
      }
    }
  }

  function runLightChildNodesDisconnectedCallback(vm) {
    const {
      aChildren: adoptedChildren
    } = vm;
    recursivelyDisconnectChildren(adoptedChildren);
  }
  /**
   * The recursion doesn't need to be a complete traversal of the vnode graph,
   * instead it can be partial, when a custom element vnode is found, we don't
   * need to continue into its children because by attempting to disconnect the
   * custom element itself will trigger the removal of anything slotted or anything
   * defined on its shadow.
   */


  function recursivelyDisconnectChildren(vnodes) {
    for (let i = 0, len = vnodes.length; i < len; i += 1) {
      const vnode = vnodes[i];

      if (!isNull(vnode) && isArray$1(vnode.children) && !isUndefined(vnode.elm)) {
        // vnode is a VElement with children
        if (isUndefined(vnode.ctor)) {
          // it is a VElement, just keep looking (recursively)
          recursivelyDisconnectChildren(vnode.children);
        } else {
          // it is a VCustomElement, disconnect it and ignore its children
          resetComponentStateWhenRemoved(getAssociatedVM(vnode.elm));
        }
      }
    }
  } // This is a super optimized mechanism to remove the content of the shadowRoot
  // without having to go into snabbdom. Especially useful when the reset is a consequence
  // of an error, in which case the children VNodes might not be representing the current
  // state of the DOM


  function resetShadowRoot(vm) {
    vm.children = EmptyArray;
    ShadowRootInnerHTMLSetter.call(vm.cmpRoot, ''); // disconnecting any known custom element inside the shadow of the this vm

    runShadowChildNodesDisconnectedCallback(vm);
  }

  function scheduleRehydration(vm) {
    if (!vm.isScheduled) {
      vm.isScheduled = true;

      if (rehydrateQueue.length === 0) {
        addCallbackToNextTick(flushRehydrationQueue);
      }

      ArrayPush.call(rehydrateQueue, vm);
    }
  }

  function getErrorBoundaryVM(vm) {
    let currentVm = vm;

    while (!isNull(currentVm)) {
      if (!isUndefined(currentVm.def.errorCallback)) {
        return currentVm;
      }

      currentVm = currentVm.owner;
    }
  }
  /**
   * EXPERIMENTAL: This function detects whether or not a Node is
   * controlled by a LWC template. This API is subject to
   * change or being removed.
   */


  function isNodeFromTemplate(node) {
    if (isFalse$1(node instanceof Node)) {
      return false;
    } // TODO [#1250]: skipping the shadowRoot instances itself makes no sense, we need to revisit this with locker


    if (node instanceof ShadowRoot) {
      return false;
    }

    if (useSyntheticShadow) {
      // TODO [#1252]: old behavior that is still used by some pieces of the platform, specifically, nodes inserted
      // manually on places where `lwc:dom="manual"` directive is not used, will be considered global elements.
      if (isUndefined(node.$shadowResolver$)) {
        return false;
      }
    }

    const root = node.getRootNode();
    return root instanceof ShadowRoot;
  } // slow path routine
  // NOTE: we should probably more this routine to the synthetic shadow folder
  // and get the allocation to be cached by in the elm instead of in the VM


  function allocateInSlot(vm, children) {
    {
      assert.invariant(isObject$1(vm.cmpSlots), `When doing manual allocation, there must be a cmpSlots object available.`);
    }

    const {
      cmpSlots: oldSlots
    } = vm;
    const cmpSlots = vm.cmpSlots = create(null);

    for (let i = 0, len = children.length; i < len; i += 1) {
      const vnode = children[i];

      if (isNull(vnode)) {
        continue;
      }

      const {
        data
      } = vnode;
      const slotName = data.attrs && data.attrs.slot || '';
      const vnodes = cmpSlots[slotName] = cmpSlots[slotName] || []; // re-keying the vnodes is necessary to avoid conflicts with default content for the slot
      // which might have similar keys. Each vnode will always have a key that
      // starts with a numeric character from compiler. In this case, we add a unique
      // notation for slotted vnodes keys, e.g.: `@foo:1:1`

      vnode.key = `@${slotName}:${vnode.key}`;
      ArrayPush.call(vnodes, vnode);
    }

    if (isFalse$1(vm.isDirty)) {
      // We need to determine if the old allocation is really different from the new one
      // and mark the vm as dirty
      const oldKeys = keys(oldSlots);

      if (oldKeys.length !== keys(cmpSlots).length) {
        markComponentAsDirty(vm);
        return;
      }

      for (let i = 0, len = oldKeys.length; i < len; i += 1) {
        const key = oldKeys[i];

        if (isUndefined(cmpSlots[key]) || oldSlots[key].length !== cmpSlots[key].length) {
          markComponentAsDirty(vm);
          return;
        }

        const oldVNodes = oldSlots[key];
        const vnodes = cmpSlots[key];

        for (let j = 0, a = cmpSlots[key].length; j < a; j += 1) {
          if (oldVNodes[j] !== vnodes[j]) {
            markComponentAsDirty(vm);
            return;
          }
        }
      }
    }
  }

  function runWithBoundaryProtection(vm, owner, pre, job, post) {
    let error;
    pre();

    try {
      job();
    } catch (e) {
      error = Object(e);
    } finally {
      post();

      if (!isUndefined(error)) {
        error.wcStack = error.wcStack || getErrorComponentStack(vm);
        const errorBoundaryVm = isNull(owner) ? undefined : getErrorBoundaryVM(owner);

        if (isUndefined(errorBoundaryVm)) {
          throw error; // eslint-disable-line no-unsafe-finally
        }

        resetShadowRoot(vm); // remove offenders

        {
          startMeasure('errorCallback', errorBoundaryVm);
        } // error boundaries must have an ErrorCallback


        const errorCallback = errorBoundaryVm.def.errorCallback;
        invokeComponentCallback(errorBoundaryVm, errorCallback, [error, error.wcStack]);

        {
          endMeasure('errorCallback', errorBoundaryVm);
        }
      }
    }
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const {
    appendChild,
    insertBefore,
    removeChild,
    replaceChild
  } = Node.prototype;
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  const ConnectingSlot = createHiddenField('connecting', 'engine');
  const DisconnectingSlot = createHiddenField('disconnecting', 'engine');

  function callNodeSlot(node, slot) {
    {
      assert.isTrue(node, `callNodeSlot() should not be called for a non-object`);
    }

    const fn = getHiddenField(node, slot);

    if (!isUndefined(fn)) {
      fn();
    }

    return node; // for convenience
  } // monkey patching Node methods to be able to detect the insertions and removal of
  // root elements created via createElement.


  assign(Node.prototype, {
    appendChild(newChild) {
      const appendedNode = appendChild.call(this, newChild);
      return callNodeSlot(appendedNode, ConnectingSlot);
    },

    insertBefore(newChild, referenceNode) {
      const insertedNode = insertBefore.call(this, newChild, referenceNode);
      return callNodeSlot(insertedNode, ConnectingSlot);
    },

    removeChild(oldChild) {
      const removedNode = removeChild.call(this, oldChild);
      return callNodeSlot(removedNode, DisconnectingSlot);
    },

    replaceChild(newChild, oldChild) {
      const replacedNode = replaceChild.call(this, newChild, oldChild);
      callNodeSlot(replacedNode, DisconnectingSlot);
      callNodeSlot(newChild, ConnectingSlot);
      return replacedNode;
    }

  });
  /**
   * EXPERIMENTAL: This function is almost identical to document.createElement
   * (https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
   * with the slightly difference that in the options, you can pass the `is`
   * property set to a Constructor instead of just a string value. The intent
   * is to allow the creation of an element controlled by LWC without having
   * to register the element as a custom element. E.g.:
   *
   * const el = createElement('x-foo', { is: FooCtor });
   *
   * If the value of `is` attribute is not a constructor,
   * then it throws a TypeError.
   */

  function createElement(sel, options) {
    if (!isObject$1(options) || isNull(options)) {
      throw new TypeError(`"createElement" function expects an object as second parameter but received "${toString(options)}".`);
    }

    let Ctor = options.is;

    if (!isFunction(Ctor)) {
      throw new TypeError(`"createElement" function expects a "is" option with a valid component constructor.`);
    }

    const mode = options.mode !== 'closed' ? 'open' : 'closed'; // Create element with correct tagName

    const element = document.createElement(sel);

    if (!isUndefined(getAssociatedVMIfPresent(element))) {
      // There is a possibility that a custom element is registered under tagName,
      // in which case, the initialization is already carry on, and there is nothing else
      // to do here.
      return element;
    }

    if (isCircularModuleDependency(Ctor)) {
      Ctor = resolveCircularModuleDependency(Ctor);
    }

    const def = getComponentDef(Ctor);
    setElementProto(element, def);

    {
      patchCustomElementWithRestrictions(element, EmptyObject);
    } // In case the element is not initialized already, we need to carry on the manual creation


    createVM(element, Ctor, {
      mode,
      isRoot: true,
      owner: null
    }); // Handle insertion and removal from the DOM manually

    setHiddenField(element, ConnectingSlot, () => {
      const vm = getAssociatedVM(element);
      startGlobalMeasure(GlobalMeasurementPhase.HYDRATE, vm);

      if (vm.state === VMState.connected) {
        // usually means moving the element from one place to another, which is observable via life-cycle hooks
        removeRootVM(vm);
      }

      appendRootVM(vm);
      endGlobalMeasure(GlobalMeasurementPhase.HYDRATE, vm);
    });
    setHiddenField(element, DisconnectingSlot, () => {
      const vm = getAssociatedVM(element);
      removeRootVM(vm);
    });
    return element;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /**
   * EXPERIMENTAL: This function allows you to create a reactive readonly
   * membrane around any object value. This API is subject to change or
   * being removed.
   */


  function readonly(obj) {
    {
      // TODO [#1292]: Remove the readonly decorator
      if (arguments.length !== 1) {
        assert.fail('@readonly cannot be used as a decorator just yet, use it as a function with one argument to produce a readonly version of the provided value.');
      }
    }

    return reactiveMembrane.getReadOnlyProxy(obj);
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /**
   * This function builds a Web Component class from a LWC constructor
   * so it can be registered as a new element via customElements.define()
   * at any given time. E.g.:
   *
   *      import { buildCustomElementConstructor } from 'lwc';
   *      import Foo from 'ns/foo';
   *      const WC = buildCustomElementConstructor(Foo);
   *      customElements.define('x-foo', WC);
   *      const elm = document.createElement('x-foo');
   *
   */


  function buildCustomElementConstructor(Ctor, options) {
    var _a;

    const {
      props,
      bridge: BaseElement
    } = getComponentDef(Ctor);
    const normalizedOptions = {
      mode: 'open',
      isRoot: true,
      owner: null
    };

    if (isObject$1(options) && !isNull(options)) {
      const {
        mode
      } = options;

      if (mode === 'closed') {
        normalizedOptions.mode = mode;
      }
    }

    return _a = class extends BaseElement {
      constructor() {
        super();
        createVM(this, Ctor, normalizedOptions);

        {
          patchCustomElementWithRestrictions(this, EmptyObject);
        }
      }

      connectedCallback() {
        const vm = getAssociatedVM(this);
        appendRootVM(vm);
      }

      disconnectedCallback() {
        const vm = getAssociatedVM(this);
        removeRootVM(vm);
      }

      attributeChangedCallback(attrName, oldValue, newValue) {
        if (oldValue === newValue) {
          // ignoring similar values for better perf
          return;
        }

        const propName = getPropNameFromAttrName(attrName);

        if (isUndefined(props[propName])) {
          // ignoring unknown attributes
          return;
        }

        if (!isAttributeLocked(this, attrName)) {
          // ignoring changes triggered by the engine itself during:
          // * diffing when public props are attempting to reflect to the DOM
          // * component via `this.setAttribute()`, should never update the prop.
          // Both cases, the the setAttribute call is always wrap by the unlocking
          // of the attribute to be changed
          return;
        } // reflect attribute change to the corresponding props when changed
        // from outside.


        this[propName] = newValue;
      }

    }, // collecting all attribute names from all public props to apply
    // the reflection from attributes to props via attributeChangedCallback.
    _a.observedAttributes = ArrayMap.call(getOwnPropertyNames(props), propName => props[propName].attr), _a;
  }
  /** version: 1.1.13-224.5 */

  exports.LightningElement = BaseLightningElement;
  exports.api = api$1;
  exports.buildCustomElementConstructor = buildCustomElementConstructor;
  exports.createElement = createElement;
  exports.decorate = decorate;
  exports.getComponentConstructor = getComponentConstructor;
  exports.getComponentDef = getComponentDef;
  exports.isComponentConstructor = isComponentConstructor;
  exports.isNodeFromTemplate = isNodeFromTemplate;
  exports.readonly = readonly;
  exports.register = register;
  exports.registerComponent = registerComponent;
  exports.registerDecorators = registerDecorators;
  exports.registerTemplate = registerTemplate;
  exports.sanitizeAttribute = sanitizeAttribute;
  exports.setFeatureFlag = setFeatureFlag;
  exports.setFeatureFlagForTest = setFeatureFlagForTest;
  exports.track = track;
  exports.unwrap = unwrap$1;
  exports.wire = wire;

  Object.defineProperty(exports, '__esModule', { value: true });

});
Webruntime.define('lightning/configProvider', ['exports', 'lwc'], function (exports, lwc) { 'use strict';

    /*
     * Regex to test a string for an ISO8601 Date. The following formats are matched.
     * Note that if a time element is present (e.g. 'T'), the string should have a time zone designator (Z or +hh:mm or -hh:mm).
     *
     *  YYYY
     *  YYYY-MM
     *  YYYY-MM-DD
     *  YYYY-MM-DDThh:mmTZD
     *  YYYY-MM-DDThh:mm:ssTZD
     *  YYYY-MM-DDThh:mm:ss.STZD
     *
     *
     * @see: https://www.w3.org/TR/NOTE-datetime
     */
    const ISO8601_STRICT_PATTERN = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z){1})?)?)?$/i;
    /* Regex to test a string for an ISO8601 partial time or full time:
     * hh:mm
     * hh:mm:ss
     * hh:mm:ss.S
     * full time = partial time + TZD
     */

    const ISO8601_TIME_PATTERN = /^\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;
    const STANDARD_TIME_FORMAT = 'HH:mm:ss.SSS';
    const STANDARD_DATE_FORMAT = 'YYYY-MM-DD';
    const TIME_SEPARATOR = 'T';
    const TIMEZONE_INDICATOR = /(Z|([+-])(\d{2}):(\d{2}))$/;
    function isValidISODateTimeString(dateTimeString) {
      return isValidISO8601String(dateTimeString) && isValidDate(dateTimeString);
    }
    function isValidISOTimeString(timeString) {
      if (!isValidISO8601TimeString(timeString)) {
        return false;
      }

      const timeOnly = removeTimeZoneSuffix(timeString);
      return isValidDate(`2018-09-09T${timeOnly}Z`);
    }
    function removeTimeZoneSuffix(dateTimeString) {
      if (typeof dateTimeString === 'string') {
        return dateTimeString.split(TIMEZONE_INDICATOR)[0];
      }

      return dateTimeString;
    }

    function isValidISO8601String(dateTimeString) {
      if (typeof dateTimeString !== 'string') {
        return false;
      }

      return ISO8601_STRICT_PATTERN.test(dateTimeString);
    }

    function isValidISO8601TimeString(timeString) {
      if (typeof timeString !== 'string') {
        return false;
      }

      return ISO8601_TIME_PATTERN.test(timeString);
    }

    function isValidDate(value) {
      // Date.parse returns NaN if the argument doesn't represent a valid date
      const timeStamp = Date.parse(value);
      return isFinite(timeStamp);
    }

    var _tmpl = void 0;

    var labelSecondsLater = 'in a few seconds';

    var labelSecondsAgo = 'a few seconds ago';

    /**
     * Takes label strings with placeholder params (`{0}`) and updates the label with given `args`
     * @param {string} str - any label string requiring injections of other strings/params (e.g., 'foo {0}')
     * @param  {string|array} arguments - string(s) to be injected into the `string` param
     * @returns {string} fully replaced string, e.g., '{0} is a {1}' -> 'Hal Jordan is a Green Lantern'
     */
    function formatLabel(str) {
      const args = Array.prototype.slice.call(arguments, 1);
      let replacements = args;

      if (Array.isArray(args[0])) {
        [replacements] = args;
      }

      return str.replace(/{(\d+)}/g, (match, i) => {
        return replacements[i];
      });
    }

    const fallbackFutureLabel = 'in {0} {1}'; // e.g. in 1 minute

    const fallbackPastLabel = '{0} {1} ago'; // e.g. 1 minute ago

    const fallbackPluralSuffix = 's'; // plural suffix for the units, e.g. in 10 minutes
    // The threshold values come from moment.js

    const units = {
      SECONDS: {
        name: 'second',
        threshold: 45
      },
      // a few seconds to minute
      MINUTES: {
        name: 'minute',
        threshold: 45
      },
      // minutes to hour
      HOURS: {
        name: 'hour',
        threshold: 22
      },
      // hours to day
      DAYS: {
        name: 'day',
        threshold: 26
      },
      // days to month
      MONTHS: {
        name: 'month',
        threshold: 11
      },
      // months to year
      YEARS: {
        name: 'year'
      }
    };
    const SECOND_TO_MILLISECONDS = 1000;
    const MINUTE_TO_MILLISECONDS = 6e4; // 60 * SECOND_TO_MILLISECONDS;

    const HOUR_TO_MILLISECONDS = 36e5; // 60 * MINUTE_TO_MILLISECONDS

    const DAY_TO_MILLISECONDS = 864e5; // 24 * HOUR_TO_MILLISECONDS;

    class Duration {
      constructor(milliseconds) {
        this.milliseconds = 0;

        if (typeof milliseconds !== 'number') {
          this.isValid = false; // eslint-disable-next-line no-console

          console.warn(`The value of milliseconds passed into Duration must be of type number,
                but we are getting the ${typeof milliseconds} value "${milliseconds}" instead.
                `);
          return;
        }

        this.isValid = true;
        this.milliseconds = milliseconds;
      }

      humanize(locale) {
        if (!this.isValid) {
          return '';
        }

        const unit = findBestUnitMatch(this);

        if (unit === units.SECONDS) {
          const isLater = this.milliseconds > 0;
          return isLater ? labelSecondsLater : labelSecondsAgo;
        }

        return format(locale, this.asIn(unit), unit.name);
      }

      asIn(unit) {
        switch (unit) {
          case units.SECONDS:
            return Math.round(this.milliseconds / SECOND_TO_MILLISECONDS);

          case units.MINUTES:
            return Math.round(this.milliseconds / MINUTE_TO_MILLISECONDS);

          case units.HOURS:
            return Math.round(this.milliseconds / HOUR_TO_MILLISECONDS);

          case units.DAYS:
            return Math.round(this.milliseconds / DAY_TO_MILLISECONDS);

          case units.MONTHS:
            return Math.round(daysToMonth(this.milliseconds / DAY_TO_MILLISECONDS));

          case units.YEARS:
          default:
            return Math.round(daysToMonth(this.milliseconds / DAY_TO_MILLISECONDS) / 12);
        }
      }

    }

    lwc.registerDecorators(Duration, {
      fields: ["milliseconds"]
    });

    var Duration$1 = lwc.registerComponent(Duration, {
      tmpl: _tmpl
    });

    function daysToMonth(days) {
      // 400 years have 146097 days (taking into account leap year rules)
      // 400 years have 12 months === 4800
      const daysToMonthRatio = 4800 / 146097;
      return days * daysToMonthRatio;
    }

    function findBestUnitMatch(duration) {
      // Traversing the object keys in order from Seconds to Years
      // http://exploringjs.com/es6/ch_oop-besides-classes.html#_traversal-order-of-properties
      const match = Object.keys(units).find(key => {
        const unit = units[key]; // Year is the max and doesn't have a threshold

        return unit === units.YEARS || Math.abs(duration.asIn(unit)) < unit.threshold;
      });
      return units[match];
    }

    function format(locale, value, unit) {
      if ('Intl' in window && Intl.RelativeTimeFormat) {
        const formatter = new Intl.RelativeTimeFormat(locale, {
          style: 'long',
          numeric: 'always'
        });
        return formatter.format(value, unit);
      }

      return fallbackFormatter(value, unit);
    }

    function fallbackFormatter(value, unit) {
      // eslint-disable-next-line no-console
      console.warn(`The current environment does not support formatters for relative time.`);
      const absoluteValue = Math.abs(value);
      const unitString = absoluteValue !== 1 ? unit + fallbackPluralSuffix : unit;
      const label = value > 0 ? fallbackFutureLabel : fallbackPastLabel;
      return formatLabel(label, absoluteValue, unitString);
    }

    // default implementation of localization service for en-US locale. This covers the current usage of the localizationService in the code base.
    const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const DATE_FORMAT = {
      short: 'M/d/yyyy',
      medium: 'MMM d, yyyy',
      long: 'MMMM d, yyyy'
    };
    const TIME_FORMAT = {
      short: 'h:mm a',
      medium: 'h:mm:ss a',
      long: 'h:mm:ss a'
    }; // The parseTime method normalizes the time format so that minor deviations are accepted

    const TIME_FORMAT_SIMPLE = {
      short: 'h:m a',
      medium: 'h:m:s a',
      long: 'h:m:s a'
    }; // Only works with dates and iso strings
    // formats the date object by ignoring the timezone offset
    // e.g. assume date is Mar 11 2019 00:00:00 GMT+1100:
    // formatDate(date, 'YYYY-MM-DD') -> 2019-03-11

    function formatDate(value, format) {
      let isUTC = false;
      let dateString = value;

      if (typeof value === 'string') {
        dateString = value.split(TIME_SEPARATOR)[0];
        isUTC = true;
      }

      return formatDateInternal(dateString, format, isUTC);
    } // Only works with date objects.
    // formats the date object according to UTC.
    // e.g. assume date is Mar 11 2019 00:00:00 GMT+1100:
    // formatDateUTC(date, 'YYYY-MM-DD') -> 2019-03-10


    function formatDateUTC(value, format) {
      return formatDateInternal(value, format, true);
    } // Only works with a date object


    function formatTime(date, format) {
      if (!isDate(date)) {
        return new Date('');
      }

      const hours = (date.getHours() + 11) % 12 + 1;
      const suffix = date.getHours() >= 12 ? 'PM' : 'AM';

      switch (format) {
        case STANDARD_TIME_FORMAT:
          // 16:12:32.000
          return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${doublePad(date.getMilliseconds())}`;

        case TIME_FORMAT.short:
          // 4:12 PM;
          return `${hours}:${pad(date.getMinutes())} ${suffix}`;

        case TIME_FORMAT.medium:
        case TIME_FORMAT.long:
        default:
          // 4:12:32 PM;
          return `${hours}:${pad(date.getMinutes())}:${pad(date.getSeconds())} ${suffix}`;
      }
    } // Only works with a date object
    // formats the date object according to UTC.
    // e.g. assume date is Mar 11 2019 00:00:00 GMT+1100:
    // formatDateTimeUTC(date) -> 2019-03-10  1:00:00 PM


    function formatDateTimeUTC(value) {
      if (!isDate(value)) {
        return new Date('');
      }

      const date = new Date(value.getTime());
      return `${formatDateUTC(date)}, ${formatTime(addTimezoneOffset(date))}`;
    } // parses ISO8601 date/time strings. Currently only used to parse ISO time strings without a TZD. Some examples:
    // 20:00:00.000             -> Feb 26 2019 20:00:00 GMT-0500
    // 2019-03-11               -> Mar 11 2019 00:00:00 GMT-0400
    // 2019-03-11T00:00:00.000Z -> Mar 10 2019 20:00:00 GMT-0400


    function parseDateTimeISO8601(value) {
      let isoString = null;
      let shouldAddOffset = true;

      if (isValidISOTimeString(value)) {
        isoString = `${getTodayInISO()}T${addTimezoneSuffix(value)}`;
      } else if (isValidISODateTimeString(value)) {
        if (value.indexOf(TIME_SEPARATOR) > 0) {
          isoString = addTimezoneSuffix(value);
          shouldAddOffset = false;
        } else {
          isoString = `${value}T00:00:00.000Z`;
        }
      }

      if (isoString) {
        // Browsers differ on how they treat iso strings without a timezone offset (local vs utc time)
        const parsedDate = new Date(isoString);

        if (shouldAddOffset) {
          addTimezoneOffset(parsedDate);
        }

        return parsedDate;
      }

      return null;
    } // called by the datepicker and calendar for parsing iso and formatted date strings
    // called by the timepicker to parse the formatted time string


    function parseDateTime(value, format) {
      if (format === STANDARD_DATE_FORMAT && isValidISODateTimeString(value)) {
        return parseDateTimeISO8601(value);
      }

      if (Object.values(DATE_FORMAT).includes(format)) {
        return parseFormattedDate(value, format);
      }

      if (Object.values(TIME_FORMAT_SIMPLE).includes(format)) {
        return parseFormattedTime(value);
      }

      return null;
    } // The input to this method is always an ISO string with timezone offset.


    function parseDateTimeUTC(value) {
      return parseDateTimeISO8601(addTimezoneSuffix(value));
    }

    function isBefore(date1, date2, unit) {
      const normalizedDate1 = getDate(date1);
      const normalizedDate2 = getDate(date2);

      if (!normalizedDate1 || !normalizedDate2) {
        return false;
      }

      return startOf(normalizedDate1, unit).getTime() < startOf(normalizedDate2, unit).getTime();
    } // unit can be millisecond, minute, day


    function isAfter(date1, date2, unit) {
      const normalizedDate1 = getDate(date1);
      const normalizedDate2 = getDate(date2);

      if (!normalizedDate1 || !normalizedDate2) {
        return false;
      }

      return startOf(normalizedDate1, unit).getTime() > startOf(normalizedDate2, unit).getTime();
    } // We're not doing timezone conversion in the default config. Only converting from UTC to system timezone


    function UTCToWallTime(date, timezone, callback) {
      const utcDate = new Date(date.getTime());
      callback(subtractTimezoneOffset(utcDate));
    } // We're not doing timezone conversion in the default config. Only converting from system timezone to UTC


    function WallTimeToUTC(date, timezone, callback) {
      const localDate = new Date(date.getTime());
      callback(addTimezoneOffset(localDate));
    } // We're assuming en-US locale so we don't need translation between calendar systems


    function translateToOtherCalendar(date) {
      return date;
    } // We're assuming en-US locale so we don't need translation between calendar systems


    function translateFromOtherCalendar(date) {
      return date;
    } // We're assuming en-US locale so we don't need translation of digits


    function translateToLocalizedDigits(input) {
      return input;
    } // We're assuming en-US locale so we don't need translation of digits


    function translateFromLocalizedDigits(input) {
      return input;
    } // This is called from the numberFormat library when the value exceeds the safe length.
    // We currently rely on aura to format large numbers


    function getNumberFormat() {
      return {
        format: value => {
          // eslint-disable-next-line no-console
          console.warn(`The current environment does not support large numbers and the original value of ${value} will be returned.`);
          return value;
        }
      };
    } // relativeDateTime (currently the only user of duration) uses unit="minutes"
    // The default implementation here assumes the unit is always minutes.


    function duration(minutes) {
      return new Duration$1(minutes * 60 * 1000);
    }

    function displayDuration(value) {
      return value.humanize('en');
    } // parses a time string formatted in en-US locale i.e. h:mm:ss a


    function parseFormattedTime(value) {
      // for time strings it's easier to just split on :.\s
      const values = value.trim().split(/[:.\s*]/); // at least two parts i.e. 12 PM, and at most 5 parts i.e. 12:34:21.432 PM

      const length = values.length;

      if (!values || length < 2 || length > 5) {
        return null;
      }

      const ampm = values[length - 1];
      const isBeforeNoon = ampm.toLowerCase() === 'am';
      const isAfternoon = ampm.toLowerCase() === 'pm'; // remove ampm

      values.splice(-1, 1);
      const allNumbers = values.every(item => !isNaN(item));

      if (!isAfternoon && !isBeforeNoon || !allNumbers) {
        return null;
      }

      const hours = values[0];
      const hour24 = pad(isAfternoon ? hours % 12 + 12 : hours % 12);
      const minutes = length >= 3 && values[1] || '0';
      const seconds = length >= 4 && values[2] || '0';
      const milliseconds = length === 5 && values[3] || '0';
      const newDate = new Date(getTodayInISO());
      newDate.setHours(hour24, minutes, seconds, milliseconds);
      return isDate(newDate) ? newDate : null;
    } // parses a date string formatted in en-US locale, i.e. MMM d, yyyy


    function parseFormattedDate(value, format) {
      // default to medium style pattern
      let pattern = /^([a-zA-Z]{3})\s*(\d{1,2}),\s*(\d{4})$/;

      switch (format) {
        case DATE_FORMAT.short:
          pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
          break;

        case DATE_FORMAT.long:
          pattern = /^([a-zA-Z]+)\s*(\d{1,2}),\s*(\d{4})$/;
          break;
      } // matches[1]: month, matches[2]: day, matches[3]: year


      const match = pattern.exec(value.trim());

      if (!match) {
        return null;
      }

      let month = match[1];
      const day = match[2];
      const year = match[3]; // for long and medium style formats, we need to find the month index

      if (format !== DATE_FORMAT.short) {
        month = MONTH_NAMES.findIndex(item => item.toLowerCase().includes(month.toLowerCase())); // the actual month for the ISO string is 1 more than the index

        month += 1;
      }

      const isoValue = `${year}-${pad(month)}-${pad(day)}`;
      const newDate = new Date(`${isoValue}T00:00:00.000Z`);
      return isDate(newDate) ? addTimezoneOffset(newDate) : null;
    }

    function formatDateInternal(value, format, isUTC) {
      const date = getDate(value);

      if (!date) {
        // return Invalid Date
        return new Date('');
      }

      if (isUTC && isDate(value)) {
        // if value is an ISO string, we already add the timezone offset when parsing the date string.
        addTimezoneOffset(date);
      }

      switch (format) {
        case STANDARD_DATE_FORMAT:
          return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

        case DATE_FORMAT.short:
          return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

        case DATE_FORMAT.long:
          return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

        case DATE_FORMAT.medium:
        default:
          {
            const shortMonthName = MONTH_NAMES[date.getMonth()].substring(0, 3);
            return `${shortMonthName} ${date.getDate()}, ${date.getFullYear()}`;
          }
      }
    } // unit can be 'day' or 'minute', otherwise will default to milliseconds. These are the only units that are currently used in the codebase.


    function startOf(date, unit) {
      switch (unit) {
        case 'day':
          date.setHours(0);
          date.setMinutes(0);
        // falls through

        case 'minute':
          date.setSeconds(0);
          date.setMilliseconds(0);
          break;
      }

      return date;
    }

    function isDate(value) {
      return Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime());
    }

    function addTimezoneSuffix(value) {
      // first remove TZD if the string has one, and then add Z
      return removeTimeZoneSuffix(value) + 'Z';
    }

    function addTimezoneOffset(date) {
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
      return date;
    }

    function subtractTimezoneOffset(date) {
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      return date;
    }

    function getDate(value) {
      if (!value) {
        return null;
      }

      if (isDate(value)) {
        return new Date(value.getTime());
      }

      if (isFinite(value) && (typeof value === 'number' || typeof value === 'string')) {
        return new Date(parseInt(value, 10));
      }

      if (typeof value === 'string') {
        return parseDateTimeISO8601(value);
      }

      return null;
    }

    function getTodayInISO() {
      return new Date().toISOString().split('T')[0];
    }

    function pad(n) {
      return Number(n) < 10 ? '0' + n : n;
    }

    function doublePad(n) {
      return Number(n) < 10 ? '00' + n : Number(n) < 100 ? '0' + n : n;
    }

    var localizationService = {
      formatDate,
      formatDateUTC,
      formatTime,
      formatDateTimeUTC,
      parseDateTimeISO8601,
      parseDateTime,
      parseDateTimeUTC,
      isBefore,
      isAfter,
      UTCToWallTime,
      WallTimeToUTC,
      translateToOtherCalendar,
      translateFromOtherCalendar,
      translateToLocalizedDigits,
      translateFromLocalizedDigits,
      getNumberFormat,
      duration,
      displayDuration
    };

    function getConfigFromAura($A) {
      return {
        getLocalizationService() {
          return $A.localizationService;
        },

        getPathPrefix() {
          return $A.getContext().getPathPrefix();
        },

        getToken(name) {
          return $A.getToken(name);
        }

      };
    }

    function createStandAloneConfig() {
      return {
        getLocalizationService() {
          return localizationService;
        },

        getPathPrefix() {
          return ''; // @sfdc.playground path-prefix DO-NOT-REMOVE-COMMENT
        },

        getToken(name) {
          return name; // @sfdc.playground token DO-NOT-REMOVE-COMMENT
        },

        getOneConfig() {
          return {
            densitySetting: ''
          };
        }

      };
    }

    function getDefaultConfig() {
      return window.$A !== undefined && window.$A.localizationService ? getConfigFromAura(window.$A) : createStandAloneConfig();
    }

    let configProvided = false;
    const {
      assign,
      freeze
    } = Object;
    let PROVIDED_IMPL = getDefaultConfig();

    function resolveServiceApiProps(serviceAPI = {}) {
      const serviceApiMap = {
        getPathPrefix: serviceAPI.getPathPrefix,
        getToken: serviceAPI.getToken,
        getLocalizationService: serviceAPI.getLocalizationService,
        iconSvgTemplates: serviceAPI.iconSvgTemplates,
        getOneConfig: serviceAPI.getInitializer && serviceAPI.getInitializer('oneConfig')
      };
      return Object.keys(serviceApiMap).reduce((seed, prop) => {
        if (serviceApiMap[prop] !== undefined) {
          seed[prop] = serviceApiMap[prop];
        }

        return seed;
      }, {});
    }

    function configProviderService(serviceAPI) {
      if (!configProvided) {
        PROVIDED_IMPL = freeze(assign({}, PROVIDED_IMPL, resolveServiceApiProps(serviceAPI)));
        configProvided = true;
      } else {
        throw new Error('ConfigProvider can only be set once at initilization time');
      }

      return {
        name: 'lightning-config-provider'
      };
    }
    function getPathPrefix() {
      return PROVIDED_IMPL && PROVIDED_IMPL.getPathPrefix && PROVIDED_IMPL.getPathPrefix() || '';
    }
    function getToken(name) {
      return PROVIDED_IMPL && PROVIDED_IMPL.getToken && PROVIDED_IMPL.getToken(name);
    }
    function getLocalizationService() {
      return PROVIDED_IMPL && PROVIDED_IMPL.getLocalizationService && PROVIDED_IMPL.getLocalizationService();
    }
    function getIconSvgTemplates() {
      return PROVIDED_IMPL && PROVIDED_IMPL.iconSvgTemplates;
    }
    function getOneConfig() {
      return PROVIDED_IMPL && PROVIDED_IMPL.getOneConfig || {
        densitySetting: ''
      };
    }

    exports.default = configProviderService;
    exports.getIconSvgTemplates = getIconSvgTemplates;
    exports.getLocalizationService = getLocalizationService;
    exports.getOneConfig = getOneConfig;
    exports.getPathPrefix = getPathPrefix;
    exports.getToken = getToken;

    Object.defineProperty(exports, '__esModule', { value: true });

});
Webruntime.define('webruntime_navigation/utils', ['exports'], function (exports) { 'use strict';

    /**
     * Copyright (c) 2019, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    /**
     * Creates a filter chain as an array. Filters can return true, false or a Promise resulting in true or false.
     *
     * @returns {object}
     */
    function createFilterChain() {
      // The filter array.
      const filters = []; // Return true if this chain contains no filters.

      const empty = () => {
        return filters.length === 0;
      };

      const addSingle = filter => {
        if (typeof filter === 'function') {
          filters.push(filter);
        }
      }; // Add a filter or array of filters to the chain.


      const add = (f = []) => {
        if (Array.isArray(f)) {
          f.forEach(l => addSingle(l));
        } else {
          addSingle(f);
        }
      }; // Get the Promised results for all filters.


      const compile = (...args) => {
        // Call all the functions with the given arguments.
        // Return Promise<true> if there are no filters.
        return filters.length === 0 ? Promise.resolve(true) : // Reduce the listener array down to a single value:
        //      any false -> false
        //      all truthy -> true
        // Previous is a Promise and current is a function.
        filters.reduce((previous, current) => {
          // Chain the current to the previous listener function; reject false values.
          // Remember that previous is a Promise and current is a functions.
          return previous.then(val => {
            return val === false ? Promise.reject() : Promise.resolve(current(...args));
          }); // Start optimistically with TRUE.
        }, Promise.resolve(true)) // Handle any trailing false values
        // This happens when the last listener returns a Promise that resolves to false
        .then(val => {
          return val === false ? false : true;
        }) // If caught promise rejection contains an Error, throw instead of resolving to false
        .catch(error => {
          if (error instanceof Error) {
            throw error;
          } else {
            return false;
          }
        });
      }; // Return the API methods.


      return {
        add,
        compile,
        empty
      };
    }

    /**
     * Copyright (c) 2019, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    /*
     * Manipulates the browser history on the window.
     * Ths just uses the window.history functionality directly.
     */

    /**
     * Sets a history state.

     * @param {string} path - query to set
     * @param {object} route - history state object
     */
    function set(path, route = {}) {
      window.history.pushState(route, null, path);
    }
    /**
     * Replaces the current history state.
     * @param {string} path - query to use as a replacement
     * @param {object} route - history state object
     */

    function replace(path, route = {}) {
      window.history.replaceState(route, null, path);
    }

    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

    /** @hidden */

    /**
     * Copyright (c) 2019, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    const DiagnosticLevel = {
      Fatal: 0,
      Error: 1,
      Warning: 2,
      Log: 3
    };

    function replaceArgs(message, args) {
      return Array.isArray(args) ? message.replace(/\{([0-9]+)\}/g, (_, index) => {
        return args[index];
      }) : message;
    }

    function generateMessage(info, args) {
      return `LWR${info.code}: ${replaceArgs(info.message, args)}`;
    }
    function generateMessageObject(info, args) {
      return _objectSpread({}, info, {
        code: `LWR${info.code}`,
        message: replaceArgs(info.message, args)
      });
    }
    function invariant(condition, errorInfo, args) {
      if (!condition) {
        throw new Error(generateMessage(errorInfo, args));
      }
    }
    const messages = {
      INVALID_MIXIN_CMP: {
        code: 4001,
        message: '{0} must be an Element type',
        level: DiagnosticLevel.Error,
        url: ''
      },
      MISSING_CONTEXT: {
        code: 4002,
        message: 'Could not find context to perform navigation action.',
        level: DiagnosticLevel.Error,
        url: ''
      },
      INVALID_CONTEXT: {
        code: 4003,
        message: 'Cannot register navigation context; it must have this shape: { navigate, generateUrl, subscribe }',
        level: DiagnosticLevel.Error,
        url: ''
      },
      MULTIPLE_ROOTS: {
        code: 4004,
        message: 'Router connection failed. There can only be one root router.',
        level: DiagnosticLevel.Error,
        url: ''
      },
      MULTIPLE_CHILDREN: {
        code: 4005,
        message: 'Could not add to the navigation hierarchy. There can only be one child per navigation node.',
        level: DiagnosticLevel.Error,
        url: ''
      },
      MISSING_ROUTE: {
        code: 4006,
        message: 'A route cannot be created to navigate to URL "{0}"',
        level: DiagnosticLevel.Error,
        url: ''
      },
      MISSING_URL: {
        code: 4007,
        message: 'A URL cannot be created to navigate to route "{0}"',
        level: DiagnosticLevel.Error,
        url: ''
      },
      PRENAV_FAILED: {
        code: 4008,
        message: 'A preNavigate hook listener blocked routing to "{0}"',
        level: DiagnosticLevel.Warning,
        url: ''
      },
      MISSING_PATH: {
        code: 4009,
        message: 'A route definition must contain a "path" property.',
        level: DiagnosticLevel.Error,
        url: ''
      },
      MISSING_ROUTE_CMP: {
        code: 4016,
        message: 'Expected a route view component with a default export.',
        level: DiagnosticLevel.Error,
        url: ''
      },
      MISSING_DATA_CONTEXT: {
        code: 4018,
        message: 'Could not find context to retrieve navigation data.',
        level: DiagnosticLevel.Error,
        url: ''
      }
    };

    /**
     * Copyright (c) 2019, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    /**
     * Creates a simple observable object, which can have any number of observers.
     *
     * @returns {object}
     */
    function createObservable() {
      // Keep track of the current value and error.
      let currentValues = [];
      let currentError = null; // Observer list with functions to add and remove members safely.

      let observers = [];

      const addObserver = obs => observers.push(obs);

      const removeObserver = obsIndex => {
        observers[obsIndex] = null;
      }; // On next, broadcast the value to all observers.
      // Clear out current error.


      const next = (...value) => {
        observers.filter(obs => obs !== null).forEach(obs => obs.next && obs.next(...value));
        currentValues = value;
        currentError = null;
      }; // On error, broadcast the error to all observers.
      // Clear out current value.


      const error = err => {
        observers.filter(obs => obs !== null).forEach(obs => obs.error && obs.error(err));
        currentValues = [];
        currentError = err;
      }; // On complete, call complete on all observers.
      // Clear out all observers + current value and error.


      const complete = () => {
        observers.filter(obs => obs !== null).forEach(obs => obs.complete && obs.complete());
        observers = [];
        currentValues = [];
        currentError = null;
      }; // Observable can be subscribed and unsubscribed, by multiple observers.


      const subscribe = (obs, replay = true) => {
        addObserver(obs); // Push the current value and error, if they exist.

        if (obs.next && currentValues.length && replay) {
          obs.next(...currentValues);
        }

        if (currentError) {
          error(currentError);
        } // On unsubscribe, the observer is nulled out.


        const obsIndex = observers.length - 1;
        return {
          unsubscribe: () => removeObserver(obsIndex)
        };
      }; // Return the observation methods + the associated observable.


      return {
        next,
        error,
        complete,
        subscribe
      };
    }

    /**
     * Copyright (c) 2019, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    /*
     * Utilities for parsing URLs.
     * Definitions:
     *      - URL: absolute "http://www.somewhere.com/some/path?with=params&more=params" or relative "/some/path?with=params&more=params"
     *      - path: A URL's pathname: "/some/path"
     *      - query: A URL's search parameters: "?with=params&more=params"
     */

    /**
     * helper: f(url) -> new URL
     * Query parameter values are URI decoded.

     * @param {string} url - URL string to turn into a URL object

     * @returns {object} { href, pathname, searchParams }
     
     * @example 
     * {
     *      href: 'http://localhost:3001/products?lwr.mode=prod&lwr.locale=es#section',
     *      origin: 'http://localhost:3001',
     *      pathname: '/products',
     *      searchParams: {
     *          'lwr.mode': 'prod',
     *          'lwr.locale': 'es'
     *      }
     * }
     */
    function getUrlObject(url = '') {
      // Ensure this is a full URL.
      url = url || '';

      if (url.indexOf('://') < 0) {
        // get the current port string (or empty)
        const port = window.location.port ? `:${window.location.port}` : ''; // construct the new base url using the original protocol, hostname, and port

        const origin = `${window.location.protocol}//${window.location.hostname}${port}`; // does the path start with a slash? If so do nothing

        const prefix = url.charAt(0) === '/' ? '' : '/'; // construct the final URL

        url = origin + prefix + url;
      } // Parse the URL using an anchor.


      const searchParams = {};
      const link = document.createElement('a');
      link.href = url; // Pull the search params out of the search query string.

      const queryStr = link.search.substring(1);

      if (queryStr) {
        queryStr.split('&').forEach(pair => {
          const [key, value = ''] = pair.split('=');
          searchParams[decode(key)] = decode(value);
        });
      }

      return {
        href: link.href,
        origin: `${link.protocol}//${link.hostname}${link.port ? `:${link.port}` : ''}`,
        pathname: link.pathname.replace(/(\/)?/, '/'),
        // ensure there is a leading slash (IE11)
        searchParams
      };
    }
    /**
     * f(url) -> "/some/relative/path?param1=one&param2=two&param3"

     * @param {string} url - URL string to make relative, may be a no-op

     * @return {string}
     */

    function getRelativeUrl(url) {
      const urlObj = getUrlObject(url); // Remove port number from both href and origin before doing string replace.
      // The port number gets included on the origin in IE11 with https but not
      // href which breaks the string replace.

      const href = urlObj.href.replace(/:\d+/, '');
      const origin = urlObj.origin.replace(/:\d+/, '');
      return href.replace(origin, '');
    }
    /**
     * f(url) -> "/some/relative/path"
     *
     * @param   {string} url - URL string to parse for a path
     *
     * @returns {string}
     */

    function getPathFromUrl(url) {
      const path = getUrlObject(url).pathname; // Remove trailing slash.

      return path === '/' ? '/' : path.replace(/\/$/, '');
    }
    /**
     * f(url) -> { "param1": "one", "param2": "two", param3: "" }
     * Parameters without values get set to an empty string.
     *
     * @param {string} url - URL string to parse for a query object
     *
     * @returns {object}
     */

    function getQueryFromUrl(url) {
      return getUrlObject(url).searchParams;
    }
    /**
     * f({ "param1": "one", "param2": "two", param3: "" }) -> "?param1=one&param2=two&param3"
     * Query parameter values, but not keys, get URI encoded.
     *
     * @param {object} queryObject - Query object to turn into a string
     *
     * @returns {string}
     */

    function getQueryString(queryObj = {}) {
      const keys = Object.keys(queryObj);
      return keys.length // handle params without values here
      ? `?${keys.map(key => {
    return queryObj[key] ? `${key}=${encode(queryObj[key])}` : key;
  }).join('&')}` : '';
    }
    /**
     * f("one two &") -> "one+two+%26"
     *
     * @param   {string} str - String to URI encode, replace spaces with +
     *
     * @returns {string}
     */

    function encode(str = '') {
      str = str || '';
      return encodeURIComponent(str).replace(/%20/g, '+');
    }
    /**
     * f("one+two+%26") -> "one two &"
     *
     * @param {string} str - String to URI decode, + is a space
     *
     * @returns {string}
     */

    function decode(str = '') {
      str = str || '';
      return decodeURIComponent(str.replace(/\+/g, ' '));
    }

    /**
     * Copyright (c) 2019, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    /*
     * Utilities for checking type, including route types.
     */

    /**
     * f(any) -> true/false
     *
     * @param {*} o - Item to check if it's an object
     *
     * @returns {boolean}
     */
    function isObject(o) {
      return typeof o === 'object' && o !== null && !Array.isArray(o);
    }
    /**
     * f(any) -> void
     *
     * @param {*} o - Object to freeze 2 layers deep (e.g. { prop: 'p', o: { one: 1, two: 2 } })
     */

    function freeze(o) {
      if (isObject(o)) {
        try {
          Object.freeze(o);
          Object.keys(o).forEach(key => typeof o[key] === 'object' && Object.freeze(o[key]));
        } catch (e) {// Squash errors that occur when trying to freeze a Proxy.
          // This can happen when the Object has previously been sent over the wire-service.
        }
      }

      return o;
    }
    /**
     * Return a 4 character identifier.
     */

    function guid() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    /* A Simple Route is in this form:
     * {
     *     type: "standard_simpleRoute",
     *     attributes: {   // required
     *         path: "/some/relative/path"
     *     }
     *     state: {       // optional query params
     *         param1: "one"
     *     }
     * }
     * It matches this relative url: /some/relative/path?param1=one
     * The Simple Route is the default in the webruntime Router.
     */

    const simpleRouteType = 'standard__simpleRoute';
    /**
     * helper: f(any) -> true/false
     *
     * @param {*} route - Item to check if it's a Simple Route
     *
     * @returns {boolean}
     */

    function isSimpleRoute(route) {
      // A route is a Simple Route if it is valid and contains only 1 attribute: 'path'
      return isValidRoute(route) && isObject(route.attributes) && Object.keys(route.attributes).length === 1 && Object.prototype.hasOwnProperty.call(route.attributes, 'path');
    }
    /**
     * f(route) -> true/false
     *
     * @param {*} route - Item to check if it's a valid route
     *
     * @returns {boolean}
     */

    function isValidRoute(route) {
      // Ensure the type is Object with an id OR a type.
      return isObject(route) && (Object.prototype.hasOwnProperty.call(route, 'id') || Object.prototype.hasOwnProperty.call(route, 'type'));
    }

    /**
     * Copyright (c) 2019, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    /* A Route Definition is in this form:
        {
            // required data
            "path": "/case/:recordId",

            // Basic routing
            "id": "case-detail",

            // lightning/navigation
            "page": {
                "type": "standard__recordPage",
                "attributes": {
                    "objectApiName": "Case"
                }
            },

            // custom data
            "view": "caseDetail"
            "label": "Case Detail"
        }
    */

    /**
     * f(route, routes[]) -> RouteDef
     * Match a route's id to a Route Definition id from the given list.
     *
     * @param {object} route - Route to match to a Route Definition
     * @param {array[object]} routeDefs - List of Route Definitions to match to the url
     *
     * @returns {object | null}
     */

    function getRouteDefFromRoute(route = {}, routeDefs = []) {
      const {
        id: routeId,
        type: routeType,
        attributes: routeAttrs = {}
      } = route; // MATCH BY ID, FOR ROUTES:
      // Go through all route definitions to find a match for the given route:
      //      - a route def id = the route id
      //      - each parameter in the route def path must exist as a key in the route attributes

      if (routeId) {
        return routeDefs.find(({
          params = [],
          original: {
            id
          }
        }) => {
          return id === routeId && params.every(p => p.modifier === '?' || Object.prototype.hasOwnProperty.call(routeAttrs, p.name));
        }) || null;
      } // MATCH BY TYPE/ATTRIBUTES, to find a match:
      //      - a route def page type = the route type
      //      - each non-optional parameter in the route def path must exist as a key in the route attributes
      //      - each attribute in the route def page must match an attribute in the route
      //      - if more than 1 route def matches the route, choose the first match


      if (routeType) {
        // Locate all matches.
        const matches = routeDefs.filter(({
          params = [],
          original: {
            page: {
              type,
              attributes: pageAttrs = {}
            } = {}
          }
        }) => {
          return type === routeType && params.every(p => p.modifier === '?' || Object.prototype.hasOwnProperty.call(routeAttrs, p.name)) && Object.keys(pageAttrs).every(key => pageAttrs[key] === routeAttrs[key]);
        }); // Return the first match.

        return matches.length > 0 ? matches[0] : null;
      } // NO MATCH:


      return null;
    }
    /**
     * f(path, routeDef) -> { "attr1": "one", "attr2": "two" }
     * Parse a path into an object of attributes based on the Route Definition's parameterized path.
     * URI decode the path parts that are parsed as attributes.
     *
     * @param {string} path - A path (hopefully) matching the Route Definition
     * @param {object} routeDef - Route Definition containing the path to parameterize
     *
     * @returns {object}
     */

    function getAttributesFromPathAndRouteDef(path, routeDef) {
      const attrs = {};

      if (path && routeDef) {
        // Split the path and the Route Definition path into their parts.
        let pathParts = routeDef.regex.exec(path);

        if (pathParts) {
          pathParts = pathParts.slice(1); // Remove full match string at index 0.

          const routeParts = routeDef.params; // For each Route Definition parameter, add an entry to the return object:
          //      { [route def parameter]: path part at matching index }

          routeParts.forEach((part, index) => {
            if (pathParts[index]) {
              attrs[part.name] = decode(pathParts[index]);
            }
          });
        } // Add routeDef.page.attributes to the return object to create a complete page reference.


        if (routeDef.original.page && isObject(routeDef.original.page.attributes)) {
          Object.assign(attrs, routeDef.original.page.attributes);
        }
      }

      return attrs;
    }

    function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } return target; }

    function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    /*
     * Utilities for handling routes.
     * Includes translation from URL to route, and vice versa.
     */

    /**
     * f(route, routes[]?) -> "/some/relative/path?param1=one&param2=two"
     * Match a route to a Route Definition, use these to build a URL.
     *
     * @param {object} route - Route to parse for a URL (ie: path+query)
     * @param {array[object]} routeDefs - List of Route Definitions to match to the route
     *
     * @returns {string | null} Returns null if a URL cannot be built.
     */

    function getUrlFromRoute(route, routeDefs = []) {
      const routeDef = getRouteDefFromRoute(route, routeDefs);
      const path = getPathFromRoute(route, routeDef);
      return {
        url: path ? path + getQueryStringFromRoute(route) : null,
        data: routeDef ? routeDef.original : null
      };
    }
    /**
     * f(route, RouteDef?) -> "/some/relative/path"
     * De-parameterize the route attributes into a path, using the Route Definition path.
     *
     * @param {object} route - Route to parse for a path
     * @param {object} routeDef - Route definition which matches the route,
     *                   use its path to compile the parameterized path,
     *                   a missing Route Definition means the route is handled as a Simple Route
     *
     * @returns {string}
     */

    function getPathFromRoute(route, routeDef) {
      // Return the included URL for Simple Routes (no route match)
      if (isSimpleRoute(route)) {
        return route.attributes.path;
      } // Return null for invalid or non-matching routes.


      if (!routeDef || !isValidRoute(route)) {
        return null;
      } // De-parameterize the route's attributes according to the Route Definition path.
      // Ensure spaces are encoded with '+' not '%20'.


      return routeDef.original.path === '/' ? '/' : routeDef.toPath(route.attributes).replace(/%20/g, '+');
    }
    /**
     * helper: f(route) -> "?param1=one&param2=two"
     *
     * @param {object} route - Route to parse for a query (the state)
     *
     * @returns {string}
     */

    function getQueryStringFromRoute(route = {}) {
      // Transform the route into a query string, if it exists.
      return Object.prototype.hasOwnProperty.call(route, 'state') && isObject(route.state) ? getQueryString(route.state) : '';
    }
    /**
     * f(URL, routes[]?) -> route
     * Match a URL's path to a Route Definition, use these to build a route.
     *
     * @param {string} url - URL string to turn into a route
     * @param {array[object]} routeDefs - List of Route Definitions to match to the url
     *
     * @returns {object}
     */

    function getRouteFromUrl(url, routeDefs = []) {
      // Parse the URL.
      const path = getPathFromUrl(url);
      const queryObj = getQueryFromUrl(url); // Try to match the URL to a Route Definition.

      const routeDef = routeDefs.find(def => def.regex.test(path)) || null;
      let route; // If there is no Route Definition match, return a Simple Route.

      if (!routeDef) {
        route = {
          route: {
            // Ensure there is a type included.
            type: simpleRouteType,
            attributes: {
              path
            },
            state: _objectSpread$1({}, queryObj)
          },
          data: null
        };
      } else {
        // Pull the parameters defined in routeDef.path out of the URL into an attributes object.
        const attributes = getAttributesFromPathAndRouteDef(path, routeDef); // Return the route with the Route Definition as data.

        const originalRouteDef = routeDef.original;
        route = {
          route: {
            id: originalRouteDef.id,
            attributes: _objectSpread$1({}, attributes),
            state: _objectSpread$1({}, queryObj)
          },
          data: originalRouteDef
        }; // Include the route definition type, if it exists.
        // This is to support the Salesforce page reference shape.

        if (originalRouteDef.page && originalRouteDef.page.type) {
          route.route.type = originalRouteDef.page.type;
        }
      }

      return route;
    }

    exports.createFilterChain = createFilterChain;
    exports.createObservable = createObservable;
    exports.decode = decode;
    exports.encode = encode;
    exports.freeze = freeze;
    exports.generateMessage = generateMessage;
    exports.generateMessageObject = generateMessageObject;
    exports.getAttributesFromPathAndRouteDef = getAttributesFromPathAndRouteDef;
    exports.getPathFromRoute = getPathFromRoute;
    exports.getPathFromUrl = getPathFromUrl;
    exports.getQueryFromUrl = getQueryFromUrl;
    exports.getQueryString = getQueryString;
    exports.getQueryStringFromRoute = getQueryStringFromRoute;
    exports.getRelativeUrl = getRelativeUrl;
    exports.getRouteDefFromRoute = getRouteDefFromRoute;
    exports.getRouteFromUrl = getRouteFromUrl;
    exports.getUrlFromRoute = getUrlFromRoute;
    exports.guid = guid;
    exports.invariant = invariant;
    exports.isObject = isObject;
    exports.isSimpleRoute = isSimpleRoute;
    exports.isValidRoute = isValidRoute;
    exports.messages = messages;
    exports.replace = replace;
    exports.set = set;
    exports.simpleRouteType = simpleRouteType;

    Object.defineProperty(exports, '__esModule', { value: true });

});
Webruntime.define('webruntime_navigation/navNode', ['lwc', 'webruntime_navigation/utils'], function (lwc, utils) { 'use strict';

    var _tmpl = void 0;

    /*
     * Provide eventing support for navigation events and navigation tree building.
     * Extended by Router.
     */
    // Event fired when a component calls navigate().

    const NAV_EVENT = `universalcontainernavigationevent${utils.guid()}`; // Internal event fired to find nearest ancestor.

    const PARENT_EVENT = `universalcontainerparentevent${utils.guid()}`;

    class NavNode {
      // DOM node to which this is attached.
      // A reference to this node's parent and child.
      // Event name(s).

      /**
       * Merge properties and create NavNode.
       *
       * @param {HTMLElement} node - DOM node to attach to
       */
      constructor(node = window) {
        this.node = window;
        this.parent = null;
        this.child = null;
        // The node property is locked in during construction.
        Object.assign(this, {
          node
        });
      }
      /**
       * Return the properties and methods that define this node as a navigation context provider.
       * This function is expected to be overridden by extender classes.
       */


      get context() {
        return this;
      }
      /**
       * Create a function which calls the given fcn, with extra parameters (...rest).
       * If fcn does not exist, use a fallback.
       *
       * @param {function} fcn - Function to transform
       * @param {function} fallbackFcn - Function to use as a fallback
       * @param  {...any} rest - Additional arguments to pass to the new function
       */


      _fallback(fcn, fallbackFcn, ...rest) {
        return fcn ? (...args) => {
          return fcn(...args, ...rest);
        } : fallbackFcn;
      }
      /***** Set up and tear down event listeners *****/

      /**
       * Fire an event to find the nearest ancestor NavNode.
       * Add the NavNode as this one's parent.
       * Add this one as the NavNode's child.
       */


      connectToParent() {
        this.node.dispatchEvent(new CustomEvent(PARENT_EVENT, {
          bubbles: true,
          composed: true,
          detail: parent => {
            this.parent = parent;
            parent.addChild(this);
          }
        }));
      }
      /**
       * Add the given node as a child to this node, if it doesn't already have one.
       * The Error prevents sibling nodes from being added under this node.
       *
       * @param {NavNode} child
       */


      addChild(child) {
        // Temp fix for https://github.com/salesforce/lwc/issues/1894

        /* eslint-disable-next-line */
        setTimeout(() => {
          utils.invariant(!this.child, utils.messages.MULTIPLE_CHILDREN);
          this.child = child;
        }, 0);
      }
      /**
       * Connect this node to the tree hierarchy and eventing.
       */


      connect() {
        // Connect this node as a child to its closest ancestor.
        this.connectToParent(); // Add listeners for parent discovery and navigation events.

        this.handleParentEvent = this._handleParentEvent.bind(this);
        this.handleNavEvent = this._handleEvent.bind(this);
        this.node.addEventListener(PARENT_EVENT, this.handleParentEvent);
        this.node.addEventListener(NavNode.navigationEvent, this.handleNavEvent);
      }
      /**
       * Disconnect this node to the tree hierarchy and eventing.
       */


      disconnect() {
        // Remove event listeners.
        this.node.removeEventListener(PARENT_EVENT, this.handleParentEvent);
        this.node.removeEventListener(NavNode.navigationEvent, this.handleNavEvent); // Detach from parent.

        if (this.parent) {
          this.parent.child = null;
        }

        this.parent = null; // Detach from child.

        if (this.child) {
          this.child.parent = null;
        }

        this.child = null;
      }
      /***** Tree pointer info *****/

      /**
       * This node is the root if it does not have a parent.
       *
       * @returns {boolean}
       */


      get isRoot() {
        return !this.parent;
      }
      /**
       * Search up the node chain until the root node is hit.
       *
       * @returns {NavNode}
       */


      get root() {
        let maybe = this;

        while (!maybe.isRoot) {
          maybe = maybe.parent;
        }

        return maybe;
      }
      /***** Navigation and parent location event handlers *****/

      /**
       * Be discovered as a parent for descendent components.
       * Stop immediate propagation because we only want 1 parent to be found.
       *
       * @param {Event} event - With detail: callback
       */


      _handleParentEvent(event) {
        event.stopImmediatePropagation();

        if (event && event.detail) {
          event.detail(this);
        }
      }
      /**
       * Inspect a navigation event bubbling up from a descendent component.
       * This node can choose to stop the event by returning false.
       * If propagation is not stopped, and this node is the root (no parent),
       *      then begin the root -> leaf processing of this new route.
       *      This will update the navigation event subscribers in each NavNode, top down.
       *
       * @param {Event} event - With detail: { url, options }
       */


      _handleEvent(event) {
        const {
          url,
          options,
          input
        } = event.detail;

        if (!this.handleEvent(input, options)) {
          event.stopPropagation();
        } else if (this.isRoot) {
          this.process(url, options);
        }
      }
      /**
       * A hook for when an event is bubbling up through this node.
       * Return false if propagation of the event should be stopped.
       * This default implementation is a no-op.
       *
       * @returns {boolean}
       */


      handleEvent() {
        return true;
      }
      /**
       * The work a node needs to do during an "event".
       * This default implementation is a no-op.
       *
       * @returns {boolean}
       */


      process() {
        return true;
      }

    }

    NavNode.navigationEvent = NAV_EVENT;

    lwc.registerDecorators(NavNode, {
      fields: ["node", "parent", "child"]
    });

    var navNode = lwc.registerComponent(NavNode, {
      tmpl: _tmpl
    });

    return navNode;

});
Webruntime.define('webruntime_navigation/navigationContext', ['exports', 'wire-service', 'webruntime_navigation/utils'], function (exports, wireService, utils) { 'use strict';

    /**
     * Copyright (c) 2019, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    /**
     * Provides the ability for a given DOM node to find its closest ancestor to provide navigation services.
     *
     * This is based on the referral implementations from the LWC team.
     *
     * Providers share the same ID value with every consumer over the wire.
     */
    // Unique event fired to find the closest ancestor navigation context.

    const NAV_CONTEXT_EVENT = `universalcontainercontextevent${utils.guid()}`; // Keep a cache of context metadata, with their IDs as keys:
    //    id => {
    //              id,
    //              value: { navigate(), generateUrl(), subscribe() },
    //              update(value),
    //          }

    const CACHE = new WeakMap();
    /**
     * Return a navigation context ID by DOM node.
     * This is used by areas of code that cannot use the official NavigationContext wire adapter (eg: mixins, other wires)
     * Exported API.
     *
     * @param {HTMLElement} node - The node from which to search for a context
     * @param {boolean} isWired - True if the event is being dispatched from a wire target
     *
     * @return {object} - Navigation context ID
     */

    function getNavigationContextId(node = window, isWired) {
      let id;

      const callback = value => {
        id = value;
      }; // Fire the event from the given node, with a callback function as a payload.
      // A LinkContextEvent must be fired from wire adapters, otherwise it is blocked.
      // These events are fired synchronously.


      node.dispatchEvent(isWired ? new wireService.LinkContextEvent(NAV_CONTEXT_EVENT, callback) : new CustomEvent(NAV_CONTEXT_EVENT, {
        bubbles: true,
        composed: true,
        detail: callback
      }));
      return id;
    }
    /**
     * Return a navigation context by ID.
     * Exported API.
     *
     * @param {*} id - The ID of a navigation context.
     *
     * @return {object} - { navigate(), generateUrl(), subscribe() }
     */

    function getNavigationContext(id) {
      const metadata = CACHE.get(id);
      utils.invariant(metadata && metadata.value, utils.messages.MISSING_CONTEXT);
      return metadata.value;
    }
    /**
     * Return navigation data by ID.
     *
     * @param {*} id - The ID of a navigation context.
     *
     * @return {RouteDefinition[]}
     */

    function getNavigationData(id) {
      const metadata = CACHE.get(id);
      utils.invariant(metadata && metadata.data, utils.messages.MISSING_DATA_CONTEXT);
      return metadata.data;
    }
    /**
     * Ensure the context is undefined OR provides an API value in the correct shape:
     *                  {
     *                      navigate: Function,
     *                      generateUrl: Function,
     *                      subscribe: Function
     *                  }
     *
     * @param {*} context - Object to check
     *
     * @return {object} - A valid context
     */

    function validateContext(context) {
      utils.invariant(context === undefined || utils.isObject(context) && typeof context.navigate === 'function' && typeof context.generateUrl === 'function' && typeof context.subscribe === 'function' && Object.keys(context).length === 3, utils.messages.INVALID_CONTEXT);
      return context;
    }
    /**
     * Create and return the metadata for this context provider.
     * Cache the metadata by ID.
     *
     * @param {object} contextValue - Context API object
     * @param {RouteDefinition[]} data - Route data for this context
     *
     * @return {object} - The metadata object
     */


    function createContextData(contextValue, data) {
      const metadata = {
        // ID must be an object that can't be proxified otherwise we lose it when tracking the value.
        id: Object.freeze(() => {}),
        value: validateContext(contextValue),
        data: data || [],
        update: newValue => {
          metadata.value = validateContext(newValue);
        }
      }; // Cache and return.

      CACHE.set(metadata.id, metadata);
      return metadata;
    }
    /**
     *
     * @param {object} contextValue - Context API object
     * @param {HTMLElement} providerNode - Context DOM element
     * @param {RouteDefinition[]} data - Route data for this context
     */


    function provideContext(contextValue, providerNode, data) {
      // Set up this context provider in the cache.
      const contextData = createContextData(contextValue, data); // Add a listener to the node for context consumers to find it.

      const eventListener = event => {
        // This event must have a full stop when it is intercepted by a provider.
        event.stopImmediatePropagation(); // The new consumer provides a callback as a communication channel (see wire above).
        // Emit the context ID over the wire.

        event.detail(contextData.id);
      };

      providerNode.addEventListener(NAV_CONTEXT_EVENT, eventListener); // Return functions to:
      //      1. update the context API value
      //      2. disconnect from being a context provider for new consumers

      return {
        id: contextData.id,
        update: contextData.update,
        disconnect: () => providerNode.removeEventListener(NAV_CONTEXT_EVENT, eventListener)
      };
    }

    /**
     * Copyright (c) 2019, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    /**
     * Services @wire(NavigationContext) requests.
     * Hooks up to an Observable from the current navigation context.
     *
     * @param {*} NavigationContext - Wire name
     * @param {WireEventTarget} target - Component target to listen to the wire
     */

    const NavigationContext = () => {
      throw new Error('Imperative use is not supported. Use @wire(NavigationContext)');
    };

    wireService.register(NavigationContext, target => {
      // Invoked when a component is connected.
      // Dispatch an event to find the closest navigation context.
      target.addEventListener('connect', () => {
        // Return the context ID as the wire value.
        // Do not expose the actual navigation API.
        target.dispatchEvent(new wireService.ValueChangedEvent(getNavigationContextId(target, true)));
      }); // There is no 'disconnect' listener because the value of this wire never changes/updates.
    });

    exports.NavigationContext = NavigationContext;
    exports.getNavigationContext = getNavigationContext;
    exports.getNavigationContextId = getNavigationContextId;
    exports.getNavigationData = getNavigationData;
    exports.provideContext = provideContext;

    Object.defineProperty(exports, '__esModule', { value: true });

});
Webruntime.define('webruntime_navigation/router', ['exports', 'lwc', 'webruntime_navigation/navigationContext', 'webruntime_navigation/navNode', 'webruntime_navigation/utils'], function (exports, lwc, navigationContext, NavNode, utils) { 'use strict';

    NavNode = NavNode && Object.prototype.hasOwnProperty.call(NavNode, 'default') ? NavNode['default'] : NavNode;

    var _tmpl = void 0;

    /* eslint-disable */

    /**
     * Tokenize input string.
     */
    function lexer(str) {
      var tokens = [];
      var i = 0;

      while (i < str.length) {
        var char = str[i];

        if (char === "*" || char === "+" || char === "?") {
          tokens.push({
            type: "MODIFIER",
            index: i,
            value: str[i++]
          });
          continue;
        }

        if (char === "\\") {
          tokens.push({
            type: "ESCAPED_CHAR",
            index: i++,
            value: str[i++]
          });
          continue;
        }

        if (char === "{") {
          tokens.push({
            type: "OPEN",
            index: i,
            value: str[i++]
          });
          continue;
        }

        if (char === "}") {
          tokens.push({
            type: "CLOSE",
            index: i,
            value: str[i++]
          });
          continue;
        }

        if (char === ":") {
          var name = "";
          var j = i + 1;

          while (j < str.length) {
            var code = str.charCodeAt(j);

            if ( // `0-9`
            code >= 48 && code <= 57 || // `A-Z`
            code >= 65 && code <= 90 || // `a-z`
            code >= 97 && code <= 122 || // `_`
            code === 95) {
              name += str[j++];
              continue;
            }

            break;
          }

          if (!name) throw new TypeError("Missing parameter name at " + i);
          tokens.push({
            type: "NAME",
            index: i,
            value: name
          });
          i = j;
          continue;
        }

        if (char === "(") {
          var count = 1;
          var pattern = "";
          var j = i + 1;

          if (str[j] === "?") {
            throw new TypeError("Pattern cannot start with \"?\" at " + j);
          }

          while (j < str.length) {
            if (str[j] === "\\") {
              pattern += str[j++] + str[j++];
              continue;
            }

            if (str[j] === ")") {
              count--;

              if (count === 0) {
                j++;
                break;
              }
            } else if (str[j] === "(") {
              count++;

              if (str[j + 1] !== "?") {
                throw new TypeError("Capturing groups are not allowed at " + j);
              }
            }

            pattern += str[j++];
          }

          if (count) throw new TypeError("Unbalanced pattern at " + i);
          if (!pattern) throw new TypeError("Missing pattern at " + i);
          tokens.push({
            type: "PATTERN",
            index: i,
            value: pattern
          });
          i = j;
          continue;
        }

        tokens.push({
          type: "CHAR",
          index: i,
          value: str[i++]
        });
      }

      tokens.push({
        type: "END",
        index: i,
        value: ""
      });
      return tokens;
    }
    /**
     * Parse a string for the raw tokens.
     */


    function parse(str, options) {
      if (options === void 0) {
        options = {};
      }

      var tokens = lexer(str);
      var _a = options.prefixes,
          prefixes = _a === void 0 ? "./" : _a;
      var defaultPattern = "[^" + escapeString(options.delimiter || "/#?") + "]+?";
      var result = [];
      var key = 0;
      var i = 0;
      var path = "";

      var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type) return tokens[i++].value;
      };

      var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined) return value;
        var _a = tokens[i],
            nextType = _a.type,
            index = _a.index;
        throw new TypeError("Unexpected " + nextType + " at " + index + ", expected " + type);
      };

      var consumeText = function () {
        var result = "";
        var value; // tslint:disable-next-line

        while (value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
          result += value;
        }

        return result;
      };

      while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");

        if (name || pattern) {
          var prefix = char || "";

          if (prefixes.indexOf(prefix) === -1) {
            path += prefix;
            prefix = "";
          }

          if (path) {
            result.push(path);
            path = "";
          }

          result.push({
            name: name || key++,
            prefix: prefix,
            suffix: "",
            pattern: pattern || defaultPattern,
            modifier: tryConsume("MODIFIER") || ""
          });
          continue;
        }

        var value = char || tryConsume("ESCAPED_CHAR");

        if (value) {
          path += value;
          continue;
        }

        if (path) {
          result.push(path);
          path = "";
        }

        var open = tryConsume("OPEN");

        if (open) {
          var prefix = consumeText();
          var name_1 = tryConsume("NAME") || "";
          var pattern_1 = tryConsume("PATTERN") || "";
          var suffix = consumeText();
          mustConsume("CLOSE");
          result.push({
            name: name_1 || (pattern_1 ? key++ : ""),
            pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
            prefix: prefix,
            suffix: suffix,
            modifier: tryConsume("MODIFIER") || ""
          });
          continue;
        }

        mustConsume("END");
      }

      return result;
    }
    /**
     * Compile a string to a template function for the path.
     */


    function compile(str, options) {
      return tokensToFunction(parse(str, options), options);
    }
    /**
     * Expose a method for transforming tokens into the path function.
     */


    function tokensToFunction(tokens, options) {
      if (options === void 0) {
        options = {};
      }

      var reFlags = flags(options);
      var _a = options.encode,
          encode = _a === void 0 ? function (x) {
        return x;
      } : _a,
          _b = options.validate,
          validate = _b === void 0 ? true : _b; // Compile all the tokens into regexps.

      var matches = tokens.map(function (token) {
        if (typeof token === "object") {
          return new RegExp("^(?:" + token.pattern + ")$", reFlags);
        }
      });
      return function (data) {
        var path = "";

        for (var i = 0; i < tokens.length; i++) {
          var token = tokens[i];

          if (typeof token === "string") {
            path += token;
            continue;
          }

          var value = data ? data[token.name] : undefined;
          var optional = token.modifier === "?" || token.modifier === "*";
          var repeat = token.modifier === "*" || token.modifier === "+";

          if (Array.isArray(value)) {
            if (!repeat) {
              throw new TypeError("Expected \"" + token.name + "\" to not repeat, but got an array");
            }

            if (value.length === 0) {
              if (optional) continue;
              throw new TypeError("Expected \"" + token.name + "\" to not be empty");
            }

            for (var j = 0; j < value.length; j++) {
              var segment = encode(value[j], token);

              if (validate && !matches[i].test(segment)) {
                throw new TypeError("Expected all \"" + token.name + "\" to match \"" + token.pattern + "\", but got \"" + segment + "\"");
              }

              path += token.prefix + segment + token.suffix;
            }

            continue;
          }

          if (typeof value === "string" || typeof value === "number") {
            var segment = encode(String(value), token);

            if (validate && !matches[i].test(segment)) {
              throw new TypeError("Expected \"" + token.name + "\" to match \"" + token.pattern + "\", but got \"" + segment + "\"");
            }

            path += token.prefix + segment + token.suffix;
            continue;
          }

          if (optional) continue;
          var typeOfMessage = repeat ? "an array" : "a string";
          throw new TypeError("Expected \"" + token.name + "\" to be " + typeOfMessage);
        }

        return path;
      };
    }
    /**
     * Escape a regular expression string.
     */


    function escapeString(str) {
      return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
    }
    /**
     * Get the flags for a regexp from the options.
     */


    function flags(options) {
      return options && options.sensitive ? "" : "i";
    }
    /**
     * Pull out keys from a regexp.
     */


    function regexpToRegexp(path, keys) {
      if (!keys) return path; // Use a negative lookahead to match only capturing groups.

      var groups = path.source.match(/\((?!\?)/g);

      if (groups) {
        for (var i = 0; i < groups.length; i++) {
          keys.push({
            name: i,
            prefix: "",
            suffix: "",
            modifier: "",
            pattern: ""
          });
        }
      }

      return path;
    }
    /**
     * Transform an array into a regexp.
     */


    function arrayToRegexp(paths, keys, options) {
      var parts = paths.map(function (path) {
        return pathToRegexp(path, keys, options).source;
      });
      return new RegExp("(?:" + parts.join("|") + ")", flags(options));
    }
    /**
     * Create a path regexp from string input.
     */


    function stringToRegexp(path, keys, options) {
      return tokensToRegexp(parse(path, options), keys, options);
    }
    /**
     * Expose a function for taking tokens and returning a RegExp.
     */


    function tokensToRegexp(tokens, keys, options) {
      if (options === void 0) {
        options = {};
      }

      var _a = options.strict,
          strict = _a === void 0 ? false : _a,
          _b = options.start,
          start = _b === void 0 ? true : _b,
          _c = options.end,
          end = _c === void 0 ? true : _c,
          _d = options.encode,
          encode = _d === void 0 ? function (x) {
        return x;
      } : _d;
      var endsWith = "[" + escapeString(options.endsWith || "") + "]|$";
      var delimiter = "[" + escapeString(options.delimiter || "/#?") + "]";
      var route = start ? "^" : ""; // Iterate over the tokens and create our regexp string.

      for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];

        if (typeof token === "string") {
          route += escapeString(encode(token));
        } else {
          var prefix = escapeString(encode(token.prefix));
          var suffix = escapeString(encode(token.suffix));

          if (token.pattern) {
            if (keys) keys.push(token);

            if (prefix || suffix) {
              if (token.modifier === "+" || token.modifier === "*") {
                var mod = token.modifier === "*" ? "?" : "";
                route += "(?:" + prefix + "((?:" + token.pattern + ")(?:" + suffix + prefix + "(?:" + token.pattern + "))*)" + suffix + ")" + mod;
              } else {
                route += "(?:" + prefix + "(" + token.pattern + ")" + suffix + ")" + token.modifier;
              }
            } else {
              route += "(" + token.pattern + ")" + token.modifier;
            }
          } else {
            route += "(?:" + prefix + suffix + ")" + token.modifier;
          }
        }
      }

      if (end) {
        if (!strict) route += delimiter + "?";
        route += !options.endsWith ? "$" : "(?=" + endsWith + ")";
      } else {
        var endToken = tokens[tokens.length - 1];
        var isEndDelimited = typeof endToken === "string" ? delimiter.indexOf(endToken[endToken.length - 1]) > -1 : // tslint:disable-next-line
        endToken === undefined;

        if (!strict) {
          route += "(?:" + delimiter + "(?=" + endsWith + "))?";
        }

        if (!isEndDelimited) {
          route += "(?=" + delimiter + "|" + endsWith + ")";
        }
      }

      return new RegExp(route, flags(options));
    }
    /**
     * Normalize the given path string, returning a regular expression.
     *
     * An empty array can be passed in for the keys, which will hold the
     * placeholder key descriptions. For example, using `/user/:id`, `keys` will
     * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
     */


    function pathToRegexp(path, keys, options) {
      if (path instanceof RegExp) return regexpToRegexp(path, keys);
      if (Array.isArray(path)) return arrayToRegexp(path, keys, options);
      return stringToRegexp(path, keys, options);
    }
    /**
     * Copyright (c) 2019, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    var pathToRegexp$1 = {
      compile,
      pathToRegexp
    };
    var pathToRegexp$2 = lwc.registerComponent(pathToRegexp$1, {
      tmpl: _tmpl
    });

    /*
     * Provides a Router class. Extended by the HistoryRouter and composed by the child-router LWCs.
     * Pass in these properties to the constructor for customizing the router:
     *      - basePath
     *      - routes[]
     *      - node
     *      - caseSensitive
     * And optionally provide overrides for these methods:
     *      - handleNavigation(url | route, options)
     *      - getRouteFromUrl(url)
     *      - getUrlFromRoute(route)
     * And add hook listeners with:
     *      - addPreNavigate(function || [function, function, ...])
     *      - addPostNavigate(function || [function, function, ...])
     * The NavigationMixin and CurrentPageReference functionality is automatically handled/provided.
     */

    class Router extends NavNode {
      // Relative base path for this router.
      // An array to hold all registered Route Definitions.
      // When true the path matching will be case sensitive.

      /** START: Internal navigation state variables */
      // The current matching path for this router, used by child to create its full ancestor base path (parent path match + base path).
      // The current matching info object: { route, data }. Used to hydrate navigation hook listeners.
      // Keep track of the last URL that was successfully processed. It is used to initialize lazily attached children.

      /** END: Internal navigation state variables */
      // Create an Observer to hold the current route and data.
      // Create filter chains for the pre and post hooks.

      /**
       * Create and configure the Router.
       *
       * @param {object} c - The router config object, all properties are optional
       * @param {string} c.basePath - This router's base path
       * @param {object[]} c.routes - Array of route definitions
       * @param {boolean} c.caseSensitive - True if path matching should be case sensitive
       * @param {function} c.handleNavigation - handleNavigation event handler override
       * @param {function} c.getRouteFromUrl - route => URL translation override
       * @param {function} c.getUrlFromRoute - URL => route translation override
       * @param {HTMLElement} node - DOM node to attach to
       */
      constructor(c = {}, node = window) {
        super(node);
        this.basePath = '';
        this.routes = [];
        this.caseSensitive = false;
        this.pathMatch = '';
        this.infoMatch = null;
        this.currentUrl = null;
        this.routeObservable = utils.createObservable();
        this.preFilters = utils.createFilterChain();
        this.postFilters = utils.createFilterChain();
        this.errorFilters = utils.createFilterChain();
        this.basePath = c.basePath || '';
        this.caseSensitive = c.caseSensitive === true ? true : false;
        this.parseRouteDefinitions(c.routes || []); // The translation layer overrides get the default implementation passed in.
        // Pass getRouteFromUrl() into custom handleNavigation functions.

        this.getRouteFromUrl = this._fallback(c.getRouteFromUrl, this.defaultGetRouteFromUrl, this.defaultGetRouteFromUrl.bind(this));
        this.getUrlFromRoute = this._fallback(c.getUrlFromRoute, this.defaultGetUrlFromRoute, this.defaultGetUrlFromRoute.bind(this));
        this.handleEvent = this._fallback(c.handleNavigation, () => true, this.getRouteFromUrl.bind(this));
      }
      /**
       * Parse the route definitions with path-to-regex functionality.
       *
       * @param {object[]} routeDefs - Array of route definitions
       * @example
       * {
       *      original: the user-defined route definition
       *      regex: regular expression based on the route definition path
       *      toPath: function which takes an object of parameters and creates a path
       *      params: an array of objects with info on each path parameter
       * }
       */


      parseRouteDefinitions(routeDefs) {
        this.routes = routeDefs.map(def => {
          utils.invariant(def.path, utils.messages.MISSING_PATH);
          const params = [];
          const regex = pathToRegexp$2.pathToRegexp(def.path, params, {
            sensitive: this.caseSensitive,
            // True if this is a leaf route, and must match URLs exactly with no trailing segments.
            end: def.exact === false ? false : true
          });
          const toPath = pathToRegexp$2.compile(def.path, {
            encode: encodeURIComponent
          });
          return {
            original: def,
            regex,
            params,
            toPath
          };
        });
      }
      /***** Lifecycle *****/

      /**
       * Override to provide this router as a navigation context.
       */


      connect() {
        super.connect();
        this.contextConnection = navigationContext.provideContext({
          navigate: (input, options) => this.navigate(input, options),
          generateUrl: route => this.generateUrl(route),
          subscribe: (callback, replay) => this.subscribe(callback, replay)
        }, this.node, this.routes.map(r => r.original));
      }
      /**
       * Override to remove this router as a navigation context.
       */


      disconnect() {
        super.disconnect();

        if (this.contextConnection) {
          this.contextConnection.update(undefined);
          this.contextConnection.disconnect();
        }
      }
      /**
       * Add listeners to this router hook which run BEFORE a new URL is processed (root -> leaf).
       *
       * @param {object | object[]} filters
       */


      addPreNavigate(filters) {
        this.preFilters.add(filters);
      }
      /**
       * Add listeners to this router hook which run AFTER a new URL has been processed (root -> leaf).
       *
       * @param {object | object[]} filters
       */


      addPostNavigate(filters) {
        this.postFilters.add(filters);
      }
      /**
       * Add listeners to this router hook which run when there is an error navigating.
       *
       * @param {object | object[]} filters
       */


      addErrorNavigate(filters) {
        this.errorFilters.add(filters);
      }
      /***** URL <=> route translation default implementation *****/

      /**
       * This URL path prefix = parent path match + this base path.
       *
       * @returns {string}
       */


      get prefix() {
        return `${this.parent ? this.parent.pathMatch : ''}${this.basePath}`;
      }
      /**
       * Default implementation: f(URL) -> { route: route, data: routeDef }
       * Remove the base URL before conversion.
       *
       * @param {string} url
       *
       * @returns {object} - { object: route, object: data }
       */


      defaultGetRouteFromUrl(url) {
        // Process relative URLs (i.e.: remove any http*://*.*)
        url = utils.getRelativeUrl(url); // The URL must start with the prefix to be eligible to match to a route definition.
        // If the prefix is not found, pass in [] for the route definitions -> fall back to a Simple Route.

        const hasPrefix = url.indexOf(this.prefix) === 0; // Pass in the rest of the URL for matching, without the prefix.

        const info = utils.getRouteFromUrl(hasPrefix ? url.replace(this.prefix, '') : url, hasPrefix ? this.routes : []); // If the prefix was stripped off of a Simple Route, add it back on, so the path is absolute.

        const {
          route
        } = info;

        if (hasPrefix && utils.isSimpleRoute(route)) {
          route.attributes.path = `${this.prefix}${route.attributes.path}`;
        }

        return {
          route: route,
          data: info.data
        };
      }
      /**
       * Default implementation: f(route) -> { url: url || null, data: routeDef }
       * Prefix the result with the parent's match and this router's base path, to return a full URL.
       *
       * @param {object} route - Route to translate into a URL
       *
       * @returns {object} - { string: url, object: data }
       */


      defaultGetUrlFromRoute(route) {
        // If the route is Simple, the URL is absolute, so do not add the prefix.
        const prefix = utils.isSimpleRoute(route) ? '' : this.prefix;
        const info = utils.getUrlFromRoute(route, this.routes);
        return {
          url: info.url ? `${prefix}${info.url}` : null,
          data: info.data
        };
      }
      /***** State change processing *****/

      /**
       * Override parent implementation.
       * Pass the current state down to any new children.
       *
       * @param {child} child - Child router
       */


      async addChild(child) {
        super.addChild(child);

        if (this.currentUrl && (await child.preProcess(this.currentUrl))) {
          child.process(this.currentUrl);
        }
      }
      /**
       * Process the current URL passed down by the parent router.
       * Stop propagation of the navigation event if any preNavigate filter returns false.
       *
       * Update the current path and route matches.
       * Update the observable to hold the new route.
       *
       * After processing, delegate to a child router, if it exists.
       *
       * @param {string} url - Relative URL string to process
       * @param {*} options - Navigation options (e.g. shouldReplace)
       *
       * @returns {boolean} - True if the processing was NOT blocked by a preNavigate listener
       */


      async process(url, options) {
        const info = utils.freeze(this.getRouteFromUrl(url));
        const route = utils.freeze(info.route); // Run the root -> leaf chain of pre navigate filters, if this is the root.

        const canContinue = !this.isRoot || (await this.preProcess(url, info));

        if (canContinue.message) {
          // If the pre navigate filters failed, an error message object is returned.
          // Pass the errors, and return.
          this.processError(canContinue);
          return false;
        } // Wait for post navigation processing, then hydrate the observables.


        await this.postFilters.compile({
          previous: this.infoMatch,
          current: info
        });
        this.infoMatch = info;
        this.currentUrl = url;
        this.routeObservable.next(route, utils.freeze(info.data)); // Delegate to a child.

        if (this.child) {
          this.child.process(url, options);
        }

        return true;
      }
      /**
       * Run the preNavigate filters for this router.
       * After processing, delegate to a child router, if it exists.
       *
       * @param {string} url - Relative URL string to process,
       *                   cannot use a route since the processing is done in context
       * @param {object} info - { route, data }, where data is the route definition by default
       * @param {object} info.route - Route to process
       * @param {object} info.data - Additional data, route definition by default
       *
       * @returns {Promise<boolean>} - Resolves to true if successful
       */


      preProcess(url, info = utils.freeze(this.getRouteFromUrl(url))) {
        const route = utils.freeze(info.route); // Check that the URL has a matching route, otherwise it is an error.

        if (route === null) {
          return Promise.resolve(utils.generateMessageObject(utils.messages.MISSING_ROUTE, [url]));
        } // Set this router's current matching path, Simple Routes pass on the parent match.


        this.pathMatch = !utils.isSimpleRoute(route) ? utils.getPathFromUrl(this.getUrlFromRoute(route).url || '') : this.parent ? this.parent.pathMatch : ''; // Compile this router's filters; continue with TRUE if there are no filters.

        const canGo = this.preFilters.empty() ? Promise.resolve(true) : this.preFilters.compile({
          current: this.infoMatch,
          next: info
        }); // If the filters pass, run its child's filters.

        return canGo.then(canContinue => {
          return canContinue && this.child ? this.child.preProcess(url) : canContinue;
        }) // Craft an error message, if the filters have returned false.
        .then(canContinue => {
          return canContinue ? canContinue : utils.generateMessageObject(utils.messages.PRENAV_FAILED, [url]);
        });
      }
      /**
       * Run the errorNavigate filters for this router.
       * After processing, delegate to a child router, if it exists.
       *
       * @param {object} e - An error object to pass into the error hook listeners.
       */


      processError(e) {
        this.errorFilters.compile(e);

        if (this.child) {
          this.child.processError(e);
        }
      }
      /***** lightning/navigation APIs *****/

      /**
       * lightning/navigation
       * Fire an event to send the navigation event up the DOM.
       * The root router will be the last to catch the event if it is not stopped.
       *
       * @param {string | object} input - URL string or route to navigate to
       * @param {*} options - Usually a boolean; when true the previous browser history
       *                    entry should be replaced by this one
       */


      navigate(input, options) {
        // Ensure there is a string URL to pass to the navigation event.
        const url = typeof input === 'string' ? input : this.getUrlFromRoute(input).url; // Check that a given route has a matching URL, otherwise it is an error.
        // We check the route => url conversion in this receiving context.

        if (url === null) {
          this.root.processError(utils.generateMessageObject(utils.messages.MISSING_URL, [input.id || input.type]));
          return;
        } // Fire event up the DOM with the original caller input


        this.node.dispatchEvent(new CustomEvent(NavNode.navigationEvent, {
          bubbles: true,
          composed: true,
          detail: {
            url,
            options,
            input
          }
        }));
      }
      /**
       * lightning/navigation
       * Generate a URL based on the given route.
       * Return a Promise containing the URL string.
       *
       * @param   {object} route - Route to generate a url for
       *
       * @returns {Promise<string>}
       */


      generateUrl(route) {
        const info = this.getUrlFromRoute(route);
        return Promise.resolve(info.url || '');
      }
      /**
       * lightning/navigation
       * Subscribe a callback to the Observable on the current route of this router.
       *
       * @param {function} callback - A callback function invoked when the navigation state changes
       *                     callback(route, routeDef)
       * @param {boolean} replay - Flag to determine if callback should be called with current route and data immediately
       */


      subscribe(callback, replay) {
        return this.routeObservable.subscribe({
          next: (route, data) => callback(route, data)
        }, replay);
      }

    }

    lwc.registerDecorators(Router, {
      fields: ["basePath", "routes", "caseSensitive", "pathMatch", "infoMatch", "currentUrl", "routeObservable", "preFilters", "postFilters", "errorFilters"]
    });

    var router = lwc.registerComponent(Router, {
      tmpl: _tmpl
    });

    exports.default = router;
    exports.pathToRegexp = pathToRegexp$2;

    Object.defineProperty(exports, '__esModule', { value: true });

});
Webruntime.define('webruntime_navigation/historyRouter', ['lwc', 'webruntime_navigation/router', 'webruntime_navigation/utils'], function (lwc, Router, utils) { 'use strict';

    Router = Router && Object.prototype.hasOwnProperty.call(Router, 'default') ? Router['default'] : Router;

    var _tmpl = void 0;

    /*
     * Provides a Router rooted to the window, which controls the browser history by default.
     */

    class HistoryRouter extends Router {
      /**
       * Override.
       * Initialize with the current route and listen to the popstate event for future changes.
       */
      connect() {
        super.connect(); // Subscribe to the Window.popstate event to listen for URL changes.

        window.addEventListener('popstate', () => {
          this.catchBrowserUpdate(utils.getRelativeUrl(document.location.href));
        });
        this.catchBrowserUpdate(utils.getRelativeUrl(document.location.href));
      }
      /***** Route Update *****/

      /**
       * Override.
       * Update the browser history if the preNavigate hooks.
       *
       * @param {string} url - The URL to go to
       * @param {boolean} shouldReplace - True if the current history state should be replaced
       * @param {boolean} updateHistory - True if the browser history should be updated with the new URL
       *
       * @returns {boolean} - True if the processing was NOT blocked by a preNavigate listener
       */


      async process(url, shouldReplace, updateHistory = true) {
        // Run the preNavigate hooks to check if this event should be processed.
        const canContinue = await super.process(url, shouldReplace);

        if (canContinue && updateHistory) {
          // Ensure the URL is basePath + a relative path + the query string.
          const pathWithQuery = url.indexOf(this.basePath) === 0 ? url : `${this.basePath}${url}`; // Update the window history.

          if (shouldReplace) {
            utils.replace(pathWithQuery);
          } else {
            utils.set(pathWithQuery);
          }
        }

        return canContinue;
      }
      /**
       * Update the root route, and trickle down the router tree.
       * Redirect to use the base path, if it is missing.
       *
       * @param {string} url - The URL to go to
       */


      catchBrowserUpdate(url) {
        const baseMissing = this.basePath && url.indexOf(this.basePath) !== 0;
        this.process(`${baseMissing ? this.basePath : ''}${url}`, baseMissing, baseMissing);
      }

    }

    var historyRouter = lwc.registerComponent(HistoryRouter, {
      tmpl: _tmpl
    });

    return historyRouter;

});
Webruntime.define('wire-service', ['exports'], function (exports) { 'use strict';

    /**
     * Copyright (C) 2018 salesforce.com, inc.
     */

    /**
     * Copyright (C) 2018 salesforce.com, inc.
     */

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    function invariant(value, msg) {
      if (!value) {
        throw new Error(`Invariant Violation: ${msg}`);
      }
    }

    function isTrue(value, msg) {
      if (!value) {
        throw new Error(`Assert Violation: ${msg}`);
      }
    }

    function isFalse(value, msg) {
      if (value) {
        throw new Error(`Assert Violation: ${msg}`);
      }
    }

    function fail(msg) {
      throw new Error(msg);
    }

    var assert = /*#__PURE__*/Object.freeze({
      __proto__: null,
      invariant: invariant,
      isTrue: isTrue,
      isFalse: isFalse,
      fail: fail
    });
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    /*
     * In IE11, symbols are expensive.
     * Due to the nature of the symbol polyfill. This method abstract the
     * creation of symbols, so we can fallback to string when native symbols
     * are not supported. Note that we can't use typeof since it will fail when transpiling.
     */

    const hasNativeSymbolsSupport = Symbol('x').toString() === 'Symbol(x)';
    /** version: 1.1.13-224.5 */

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    // key in engine service context for wire service context

    const CONTEXT_ID = '@wire'; // key in wire service context for updated listener metadata

    const CONTEXT_UPDATED = 'updated'; // key in wire service context for connected listener metadata

    const CONTEXT_CONNECTED = 'connected'; // key in wire service context for disconnected listener metadata

    const CONTEXT_DISCONNECTED = 'disconnected'; // wire event target life cycle connectedCallback hook event type

    const CONNECT = 'connect'; // wire event target life cycle disconnectedCallback hook event type

    const DISCONNECT = 'disconnect'; // wire event target life cycle config changed hook event type

    const CONFIG = 'config';
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    /*
     * Detects property changes by installing setter/getter overrides on the component
     * instance.
     */

    /**
     * Invokes the provided change listeners with the resolved component properties.
     * @param configListenerMetadatas List of config listener metadata (config listeners and their context)
     * @param paramValues Values for all wire adapter config params
     */

    function invokeConfigListeners(configListenerMetadatas, paramValues) {
      configListenerMetadatas.forEach(metadata => {
        const {
          listener,
          statics,
          reactives
        } = metadata;
        const reactiveValues = Object.create(null);

        if (reactives) {
          const keys = Object.keys(reactives);

          for (let j = 0, jlen = keys.length; j < jlen; j++) {
            const key = keys[j];
            const value = paramValues[reactives[key]];
            reactiveValues[key] = value;
          }
        } // TODO [#1634]: consider read-only membrane to enforce invariant of immutable config


        const config = Object.assign({}, statics, reactiveValues);
        listener.call(undefined, config);
      });
    }
    /**
     * Marks a reactive parameter as having changed.
     * @param cmp The component
     * @param reactiveParameter Reactive parameter that has changed
     * @param configContext The service context
     */


    function updated(cmp, reactiveParameter, configContext) {
      if (!configContext.mutated) {
        configContext.mutated = new Set(); // collect all prop changes via a microtask

        Promise.resolve().then(updatedFuture.bind(undefined, cmp, configContext));
      }

      configContext.mutated.add(reactiveParameter);
    }

    function updatedFuture(cmp, configContext) {
      const uniqueListeners = new Set(); // configContext.mutated must be set prior to invoking this function

      const mutated = configContext.mutated;
      delete configContext.mutated;
      mutated.forEach(reactiveParameter => {
        const value = getReactiveParameterValue(cmp, reactiveParameter);

        if (configContext.values[reactiveParameter.reference] === value) {
          return;
        }

        configContext.values[reactiveParameter.reference] = value;
        const listeners = configContext.listeners[reactiveParameter.head];

        for (let i = 0, len = listeners.length; i < len; i++) {
          uniqueListeners.add(listeners[i]);
        }
      });
      invokeConfigListeners(uniqueListeners, configContext.values);
    }
    /**
     * Gets the value of an @wire reactive parameter.
     * @param cmp The component
     * @param reactiveParameter The parameter to get
     */


    function getReactiveParameterValue(cmp, reactiveParameter) {
      let value = cmp[reactiveParameter.head];

      if (!reactiveParameter.tail) {
        return value;
      }

      const segments = reactiveParameter.tail;

      for (let i = 0, len = segments.length; i < len && value != null; i++) {
        const segment = segments[i];

        if (typeof value !== 'object' || !(segment in value)) {
          return undefined;
        }

        value = value[segment];
      }

      return value;
    }
    /**
     * Installs setter override to trap changes to a property, triggering the config listeners.
     * @param cmp The component
     * @param reactiveParameter Reactive parameter that defines the property to monitor
     * @param configContext The service context
     */


    function installTrap(cmp, reactiveParameter, configContext) {
      const callback = updated.bind(undefined, cmp, reactiveParameter, configContext);
      const newDescriptor = getOverrideDescriptor(cmp, reactiveParameter.head, callback);
      Object.defineProperty(cmp, reactiveParameter.head, newDescriptor);
    }
    /**
     * Finds the descriptor of the named property on the prototype chain
     * @param target The target instance/constructor function
     * @param propName Name of property to find
     * @param protoSet Prototypes searched (to avoid circular prototype chains)
     */


    function findDescriptor(target, propName, protoSet) {
      protoSet = protoSet || [];

      if (!target || protoSet.indexOf(target) > -1) {
        return null; // null, undefined, or circular prototype definition
      }

      const descriptor = Object.getOwnPropertyDescriptor(target, propName);

      if (descriptor) {
        return descriptor;
      }

      const proto = Object.getPrototypeOf(target);

      if (!proto) {
        return null;
      }

      protoSet.push(target);
      return findDescriptor(proto, propName, protoSet);
    }
    /**
     * Gets a property descriptor that monitors the provided property for changes
     * @param cmp The component
     * @param prop The name of the property to be monitored
     * @param callback A function to invoke when the prop's value changes
     * @return A property descriptor
     */


    function getOverrideDescriptor(cmp, prop, callback) {
      const descriptor = findDescriptor(cmp, prop);
      let enumerable;
      let get;
      let set; // This does not cover the override of existing descriptors at the instance level
      // and that's ok because eventually we will not need to do any of these :)

      if (descriptor === null || descriptor.get === undefined && descriptor.set === undefined) {
        let value = cmp[prop];
        enumerable = true;

        get = function () {
          return value;
        };

        set = function (newValue) {
          value = newValue;
          callback();
        };
      } else {
        const {
          set: originalSet,
          get: originalGet
        } = descriptor;
        enumerable = descriptor.enumerable;

        set = function (newValue) {
          if (originalSet) {
            originalSet.call(cmp, newValue);
          }

          callback();
        };

        get = function () {
          return originalGet ? originalGet.call(cmp) : undefined;
        };
      }

      return {
        set,
        get,
        enumerable,
        configurable: true
      };
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    const ValueChangedEventType = 'ValueChangedEvent';
    /**
     * Event fired by wire adapters to emit a new value.
     */

    class ValueChangedEvent {
      constructor(value) {
        this.type = ValueChangedEventType;
        this.value = value;
      }

    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    const LinkContextEventType = 'LinkContextEvent';
    /**
     * Event fired by wire adapters to link to a context provider
     */

    class LinkContextEvent {
      constructor(uid, callback) {
        this.type = LinkContextEventType;
        this.uid = uid;
        this.callback = callback;
      }

    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    function removeListener(listeners, toRemove) {
      const idx = listeners.indexOf(toRemove);

      if (idx > -1) {
        listeners.splice(idx, 1);
      }
    }

    function removeConfigListener(configListenerMetadatas, toRemove) {
      for (let i = 0, len = configListenerMetadatas.length; i < len; i++) {
        if (configListenerMetadatas[i].listener === toRemove) {
          configListenerMetadatas.splice(i, 1);
          return;
        }
      }
    }

    function buildReactiveParameter(reference) {
      if (!reference.includes('.')) {
        return {
          reference,
          head: reference
        };
      }

      const segments = reference.split('.');
      return {
        reference,
        head: segments.shift(),
        tail: segments
      };
    }

    class WireEventTarget {
      constructor(cmp, def, context, wireDef, wireTarget) {
        this._cmp = cmp;
        this._def = def;
        this._context = context;
        this._wireDef = wireDef;
        this._wireTarget = wireTarget;
      }

      addEventListener(type, listener) {
        switch (type) {
          case CONNECT:
            {
              const connectedListeners = this._context[CONTEXT_ID][CONTEXT_CONNECTED];

              {
                assert.isFalse(connectedListeners.includes(listener), 'must not call addEventListener("connect") with the same listener');
              }

              connectedListeners.push(listener);
              break;
            }

          case DISCONNECT:
            {
              const disconnectedListeners = this._context[CONTEXT_ID][CONTEXT_DISCONNECTED];

              {
                assert.isFalse(disconnectedListeners.includes(listener), 'must not call addEventListener("disconnect") with the same listener');
              }

              disconnectedListeners.push(listener);
              break;
            }

          case CONFIG:
            {
              const reactives = this._wireDef.params;
              const statics = this._wireDef.static;
              let reactiveKeys; // no reactive parameters. fire config once with static parameters (if present).

              if (!reactives || (reactiveKeys = Object.keys(reactives)).length === 0) {
                const config = statics || Object.create(null);
                listener.call(undefined, config);
                return;
              }

              const configListenerMetadata = {
                listener,
                statics,
                reactives
              }; // setup listeners for all reactive parameters

              const configContext = this._context[CONTEXT_ID][CONTEXT_UPDATED];
              reactiveKeys.forEach(key => {
                const reactiveParameter = buildReactiveParameter(reactives[key]);
                let configListenerMetadatas = configContext.listeners[reactiveParameter.head];

                if (!configListenerMetadatas) {
                  configListenerMetadatas = [configListenerMetadata];
                  configContext.listeners[reactiveParameter.head] = configListenerMetadatas;
                  installTrap(this._cmp, reactiveParameter, configContext);
                } else {
                  configListenerMetadatas.push(configListenerMetadata);
                } // enqueue to pickup default values


                updated(this._cmp, reactiveParameter, configContext);
              });
              break;
            }

          default:
            throw new Error(`unsupported event type ${type}`);
        }
      }

      removeEventListener(type, listener) {
        switch (type) {
          case CONNECT:
            {
              const connectedListeners = this._context[CONTEXT_ID][CONTEXT_CONNECTED];
              removeListener(connectedListeners, listener);
              break;
            }

          case DISCONNECT:
            {
              const disconnectedListeners = this._context[CONTEXT_ID][CONTEXT_DISCONNECTED];
              removeListener(disconnectedListeners, listener);
              break;
            }

          case CONFIG:
            {
              const paramToConfigListenerMetadata = this._context[CONTEXT_ID][CONTEXT_UPDATED].listeners;
              const reactives = this._wireDef.params;

              if (reactives) {
                Object.keys(reactives).forEach(key => {
                  const reactiveParameter = buildReactiveParameter(reactives[key]);
                  const configListenerMetadatas = paramToConfigListenerMetadata[reactiveParameter.head];

                  if (configListenerMetadatas) {
                    removeConfigListener(configListenerMetadatas, listener);
                  }
                });
              }

              break;
            }

          default:
            throw new Error(`unsupported event type ${type}`);
        }
      }

      dispatchEvent(evt) {
        if (evt instanceof ValueChangedEvent) {
          const value = evt.value;

          if (this._wireDef.method) {
            this._cmp[this._wireTarget](value);
          } else {
            this._cmp[this._wireTarget] = value;
          }

          return false; // canceling signal since we don't want this to propagate
        } else if (evt instanceof LinkContextEvent) {
          const {
            uid,
            callback
          } = evt; // This event is responsible for connecting the host element with another
          // element in the composed path that is providing contextual data. The provider
          // must be listening for a special dom event with the name corresponding to `uid`,
          // which must remain secret, to guarantee that the linkage is only possible via
          // the corresponding wire adapter.

          const internalDomEvent = new CustomEvent(uid, {
            bubbles: true,
            composed: true,

            // avoid leaking the callback function directly to prevent a side channel
            // during the linking phase to the context provider.
            detail(...args) {
              callback(...args);
            }

          });

          this._cmp.dispatchEvent(internalDomEvent);

          return false; // canceling signal since we don't want this to propagate
        } else if (evt.type === 'WireContextEvent' || evt.type === 'wirecontextevent') {
          // TODO [#1357]: remove this branch
          return this._cmp.dispatchEvent(evt);
        } else {
          throw new Error(`Invalid event ${evt}.`);
        }
      }

    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    // wire adapters: wire adapter id => adapter ctor


    const adapterFactories = new Map();
    /**
     * Invokes the specified callbacks.
     * @param listeners functions to call
     */

    function invokeListener(listeners) {
      for (let i = 0, len = listeners.length; i < len; ++i) {
        listeners[i].call(undefined);
      }
    }
    /**
     * The wire service.
     *
     * This service is registered with the engine's service API. It connects service
     * callbacks to wire adapter lifecycle events.
     */


    const wireService = {
      wiring: (cmp, data, def, context) => {
        const wireContext = context[CONTEXT_ID] = Object.create(null);
        wireContext[CONTEXT_CONNECTED] = [];
        wireContext[CONTEXT_DISCONNECTED] = [];
        wireContext[CONTEXT_UPDATED] = {
          listeners: {},
          values: {}
        }; // engine guarantees invocation only if def.wire is defined

        const wireStaticDef = def.wire;
        const wireTargets = Object.keys(wireStaticDef);

        for (let i = 0, len = wireTargets.length; i < len; i++) {
          const wireTarget = wireTargets[i];
          const wireDef = wireStaticDef[wireTarget];
          const adapterFactory = adapterFactories.get(wireDef.adapter);

          {
            assert.isTrue(wireDef.adapter, `@wire on "${wireTarget}": adapter id must be truthy`);
            assert.isTrue(adapterFactory, `@wire on "${wireTarget}": unknown adapter id: ${String(wireDef.adapter)}`); // enforce restrictions of reactive parameters

            if (wireDef.params) {
              Object.keys(wireDef.params).forEach(param => {
                const prop = wireDef.params[param];
                const segments = prop.split('.');
                segments.forEach(segment => {
                  assert.isTrue(segment.length > 0, `@wire on "${wireTarget}": reactive parameters must not be empty`);
                });
                assert.isTrue(segments[0] !== wireTarget, `@wire on "${wireTarget}": reactive parameter "${segments[0]}" must not refer to self`); // restriction for dot-notation reactive parameters

                if (segments.length > 1) {
                  // @wire emits a stream of immutable values. an emit sets the target property; it does not mutate a previously emitted value.
                  // restricting dot-notation reactive parameters to reference other @wire targets makes trapping the 'head' of the parameter
                  // sufficient to observe the value change.
                  assert.isTrue(wireTargets.includes(segments[0]) && wireStaticDef[segments[0]].method !== 1, `@wire on "${wireTarget}": dot-notation reactive parameter "${prop}" must refer to a @wire property`);
                }
              });
            }
          }

          if (adapterFactory) {
            const wireEventTarget = new WireEventTarget(cmp, def, context, wireDef, wireTarget);
            adapterFactory({
              dispatchEvent: wireEventTarget.dispatchEvent.bind(wireEventTarget),
              addEventListener: wireEventTarget.addEventListener.bind(wireEventTarget),
              removeEventListener: wireEventTarget.removeEventListener.bind(wireEventTarget)
            });
          }
        }
      },
      connected: (cmp, data, def, context) => {
        let listeners;

        {
          assert.isTrue(!def.wire || context[CONTEXT_ID], 'wire service was not initialized prior to component creation:  "connected" service hook invoked without necessary context');
        }

        if (!def.wire || !(listeners = context[CONTEXT_ID][CONTEXT_CONNECTED])) {
          return;
        }

        invokeListener(listeners);
      },
      disconnected: (cmp, data, def, context) => {
        let listeners;

        {
          assert.isTrue(!def.wire || context[CONTEXT_ID], 'wire service was not initialized prior to component creation:  "disconnected" service hook invoked without necessary context');
        }

        if (!def.wire || !(listeners = context[CONTEXT_ID][CONTEXT_DISCONNECTED])) {
          return;
        }

        invokeListener(listeners);
      }
    };
    /**
     * Registers the wire service.
     */

    function registerWireService(registerService) {
      registerService(wireService);
    }
    /**
     * Registers a wire adapter.
     */


    function register(adapterId, adapterFactory) {
      {
        assert.isTrue(adapterId, 'adapter id must be truthy');
        assert.isTrue(typeof adapterFactory === 'function', 'adapter factory must be a callable');
      }

      adapterFactories.set(adapterId, adapterFactory);
    }
    /** version: 1.1.13-224.5 */

    exports.LinkContextEvent = LinkContextEvent;
    exports.ValueChangedEvent = ValueChangedEvent;
    exports.register = register;
    exports.registerWireService = registerWireService;

    Object.defineProperty(exports, '__esModule', { value: true });

});
Webruntime.define('webruntime_navigation/navigation', ['exports', 'webruntime_navigation/navigationContext', 'webruntime_navigation/navigationService'], function (exports, navigationContext, navigationService) { 'use strict';

    /**
     * Copyright (c) 2019, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    /**
     * Navigate programmatically.
     * The Promise used within is deliberately not returned.
     *
     * @param {HTMLElement} context - The navigation context
     * @param {object | string} loc - A route or URL for navigating
     * @param {*} options - Usually a boolean; when true the previous browser history
     *              entry should be replaced by this one
     */

    function navigate(context, loc, options) {
      const api = navigationContext.getNavigationContext(context);
      api.navigate(loc, options);
    }
    /**
     * Generate a URL for the given route.
     *
     * @param {HTMLElement} context - The navigation context
     * @param {object} route - A route
     *
     * @returns {Promise<string>}
     */

    function generateUrl(context, route) {
      const api = navigationContext.getNavigationContext(context);
      return api.generateUrl(route);
    }
    /**
     * Subscribe to navigation state changes.
     *
     * @param {HTMLElement} context - The navigation context
     * @param {function} callback - A callback function invoked when the navigation state changes
     *                     callback(route, routeDef)
     * @param {boolean} replay - Flag to determine if callback should be called with current route and data immediately
     */

    function subscribe(context, callback, replay = true) {
      const api = navigationContext.getNavigationContext(context);
      return api.subscribe(callback, replay);
    }

    Object.defineProperty(exports, 'NavigationContext', {
        enumerable: true,
        get: function () {
            return navigationContext.NavigationContext;
        }
    });
    Object.defineProperty(exports, 'provideContext', {
        enumerable: true,
        get: function () {
            return navigationContext.provideContext;
        }
    });
    Object.defineProperty(exports, 'createRouter', {
        enumerable: true,
        get: function () {
            return navigationService.createRouter;
        }
    });
    exports.generateUrl = generateUrl;
    exports.navigate = navigate;
    exports.subscribe = subscribe;

    Object.defineProperty(exports, '__esModule', { value: true });

});
Webruntime.define('webruntime_navigation/lightningNavigation', ['exports', 'webruntime_navigation/navigation', 'webruntime_navigation/navigationContext', 'wire-service', 'webruntime_navigation/utils'], function (exports, navigation, navigationContext, wireService, utils) { 'use strict';

    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    /**
     * Services @wire(CurrentPageReference) requests.
     * Hooks up to an Observable from the current navigation context.
     *
     * @param {*} CurrentPageReference - Wire name
     * @param {WireEventTarget} target - Component target to listen to the wire
     */

    const CurrentPageReference = () => {
      throw new Error('Imperative use is not supported. Use @wire(CurrentPageReference)');
    }; // Declarative access: register a wire adapter factory for @wire(CurrentPageReference)


    wireService.register(CurrentPageReference, target => {
      let subscription; // Invoked when a component is connected. Subscribe to the stream from the current navigation context.

      target.addEventListener('connect', () => {
        if (!subscription) {
          subscription = navigation.subscribe(navigationContext.getNavigationContextId(target, true), pageRef => {
            // Page References should have a 'type', but not an 'id'
            // Make a copy because the object from subscribe is frozen
            const pageRefCopy = _objectSpread({}, pageRef);

            delete pageRefCopy.id;
            target.dispatchEvent(new wireService.ValueChangedEvent(pageRefCopy));
          });
        }
      }); // Invoked when a component is disconnected. Unsubscribe from the Observable.

      target.addEventListener('disconnect', () => {
        if (subscription) {
          subscription.unsubscribe();
          subscription = undefined;
        }
      });
    });

    /**
     * Copyright (c) 2019, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    /*
     * Exports the NavigationMixin and CurrentPageReference wire adapter.
     * Uses the navContextService to retrieve the current navigation context/node.
     */

    /**
     * Provides navigate() and generateUrl() functionality.
     * Here, navigate() can take either a route OR a string URL.
     * Functionality pulled in from the current navigation context.
     * Used by components as a Mixin to extend their own functionality.
     *
     * @param {HTMLElement} Base - A class instance
     */

    const Navigate = Symbol('Navigate');
    const GenerateUrl = Symbol('GenerateUrl');

    const NavigationMixin = Base => {
      utils.invariant(typeof Base.prototype.dispatchEvent === 'function', utils.messages.INVALID_MIXIN_CMP, [Base]);
      return class extends Base {
        [Navigate](
        /*object|string*/
        pageRef, options) {
          navigation.navigate(navigationContext.getNavigationContextId(this), pageRef, options);
        }

        [GenerateUrl](
        /*object*/
        pageRef) {
          return navigation.generateUrl(navigationContext.getNavigationContextId(this), pageRef);
        }

      };
    };

    NavigationMixin.Navigate = Navigate;
    NavigationMixin.GenerateUrl = GenerateUrl;

    /**
     * Copyright (c) 2019, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    var lightningNavigation = {
      navigate: navigation.navigate,
      generateUrl: navigation.generateUrl,
      NavigationContext: navigation.NavigationContext,
      NavigationMixin,
      CurrentPageReference
    };

    Object.defineProperty(exports, 'NavigationContext', {
        enumerable: true,
        get: function () {
            return navigation.NavigationContext;
        }
    });
    Object.defineProperty(exports, 'generateUrl', {
        enumerable: true,
        get: function () {
            return navigation.generateUrl;
        }
    });
    Object.defineProperty(exports, 'navigate', {
        enumerable: true,
        get: function () {
            return navigation.navigate;
        }
    });
    exports.CurrentPageReference = CurrentPageReference;
    exports.NavigationMixin = NavigationMixin;
    exports.default = lightningNavigation;

    Object.defineProperty(exports, '__esModule', { value: true });

});
Webruntime.define('webruntime_navigation/navigationService', ['exports', 'webruntime_navigation/router', 'webruntime_navigation/historyRouter', 'webruntime_navigation/utils'], function (exports, Router, HistoryRouter, utils) { 'use strict';

    Router = Router && Object.prototype.hasOwnProperty.call(Router, 'default') ? Router['default'] : Router;
    HistoryRouter = HistoryRouter && Object.prototype.hasOwnProperty.call(HistoryRouter, 'default') ? HistoryRouter['default'] : HistoryRouter;

    /**
     * Copyright (c) 2019, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    /*
     * Provides programmatic routing capabilities.
     */
    // The application may create 1 root router at a time.

    let hasRoot = false;
    /**
     * Create a new navigation context, attach to the given node.
     * An application can only have ONE root router.
     *
     * @param {HTMLElement} - The DOM node where the navigation context should be established
     * @param {object} config - The router config object, all properties are optional
     * @param {string} config.basePath - This router's base path
     * @param {object[]} config.routes - Array of route definitions
     * @param {string} config.handleNavigation - handleNavigation event handler override
     * @param {string} config.getRouteFromUrl - route => URL translation override
     * @param {string} config.getUrlFromRoute - URL => route translation override
     * @param {boolean} config.noHistory - True if the Router should NOT manage the browser history
     * @param {boolean} config.caseSensitive - When true, the route definition path matching will be case sensitive.
     *
     *
     * @returns {object} - { addPreNavigate, addPostNavigate, addErrorNavigate, connect, disconnect }
     */

    function createNavigationContext(node, config = {}) {
      // Create a Router, or a HistoryRouter if noHistory is true.
      const newRouter = config.noHistory === true ? // Create a basic Router.
      new Router(config, node) : // HistoryRouters manage browser history.
      new HistoryRouter(config, node); // Return a subset of the new router's capabilities.

      const routerAPI = {
        /**
         * Surface the preNavigate hook register function.
         *
         * @param {function} listener - The preNavigate hook listener function
         * @returns {object} - This bag of Router functions, for chaining
         */
        addPreNavigate: listener => {
          newRouter.addPreNavigate(listener);
          return routerAPI;
        },

        /**
         * Surface the postNavigate hook register function.
         *
         * @param {function} listener - The postNavigate hook listener function
         * @returns {object} - This bag of Router functions, for chaining
         */
        addPostNavigate: listener => {
          newRouter.addPostNavigate(listener);
          return routerAPI;
        },

        /**
         * Surface the errorNavigate hook register function.
         *
         * @param {function} listener - The errorNavigate hook listener function
         * @returns {object} - This bag of Router functions, for chaining
         */
        addErrorNavigate: listener => {
          newRouter.addErrorNavigate(listener);
          return routerAPI;
        },

        /**
         * Connect the root router if there isn't already one connected.
         */
        connect: () => {
          // Connect and expose this router's navigation context.
          newRouter.connect(); // If there is already a root router, the new router must be a child (have a parent).

          utils.invariant(!hasRoot || !!newRouter.parent, utils.messages.MULTIPLE_ROOTS);
          hasRoot = hasRoot || !newRouter.parent;
          routerAPI.id = newRouter.contextConnection.id;
        },

        /**
         * Disconnect the router, and reset the root tracking variable.
         */
        disconnect: () => {
          newRouter.disconnect();
        }
      }; // Return the public Router functions.

      return routerAPI;
    }
    /**
     * Create a new root Router, attach to the Window.
     * This is the public, programmitic API for root router creation.
     * An application can only have ONE root router.
     *
     * @param {object} config - The router config object
     *
     * @returns {object} - { addPreNavigate, addPostNavigate, addErrorNavigate, connect, disconnect }
     */

    function createRouter(config = {}) {
      return createNavigationContext(window, config);
    }

    exports.createNavigationContext = createNavigationContext;
    exports.createRouter = createRouter;

    Object.defineProperty(exports, '__esModule', { value: true });

});
Webruntime.define('@webruntime/app', ['lwc', 'webruntime_loader/loader', 'webruntime_navigation/navigation', 'wire-service', 'webruntime_navigation/lightningNavigation', '@app/basePath', '@app/csrfToken', 'lightning/configProvider'], function (lwc, loader, navigation, wireService, lightningNavigation, basePath, csrfToken, configProviderService) { 'use strict';

    lightningNavigation = lightningNavigation && Object.prototype.hasOwnProperty.call(lightningNavigation, 'default') ? lightningNavigation['default'] : lightningNavigation;
    basePath = basePath && Object.prototype.hasOwnProperty.call(basePath, 'default') ? basePath['default'] : basePath;
    csrfToken = csrfToken && Object.prototype.hasOwnProperty.call(csrfToken, 'default') ? csrfToken['default'] : csrfToken;
    configProviderService = configProviderService && Object.prototype.hasOwnProperty.call(configProviderService, 'default') ? configProviderService['default'] : configProviderService;

    function stylesheet(hostSelector, shadowSelector, nativeShadow) {
      return "\n" + (nativeShadow ? (":host {display: block;min-height: 100vh;background: url('/assets/localdev/images/mountain.svg') bottom left\n            no-repeat,\n        radial-gradient(circle, #fbfbfb, #b0cdf3);}") : (hostSelector + " {display: block;min-height: 100vh;background: url('/assets/localdev/images/mountain.svg') bottom left\n            no-repeat,\n        radial-gradient(circle, #fbfbfb, #b0cdf3);}")) + "\n@media (min-width: 1920px) {\n" + (nativeShadow ? (":host {background-size: contain;}") : (hostSelector + " {background-size: contain;}")) + "\n}.skip-link" + shadowSelector + " {color: #fff;}\n";
    }
    var _implicitStylesheets = [stylesheet];

    function tmpl($api, $cmp, $slotset, $ctx) {
      const {
        s: api_slot
      } = $api;
      return [api_slot("header", {
        attrs: {
          "name": "header"
        },
        key: 0
      }, [], $slotset), api_slot("", {
        key: 1
      }, [], $slotset), api_slot("footer", {
        attrs: {
          "name": "footer"
        },
        key: 2
      }, [], $slotset)];
    }

    var _tmpl = lwc.registerTemplate(tmpl);
    tmpl.slots = ["header", "", "footer"];
    tmpl.stylesheets = [];

    if (_implicitStylesheets) {
      tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
    }
    tmpl.stylesheetTokens = {
      hostAttribute: "localdevserver-layout_layout-host",
      shadowAttribute: "localdevserver-layout_layout"
    };

    class Layout extends lwc.LightningElement {}

    var _localdevserverLayout = lwc.registerComponent(Layout, {
      tmpl: _tmpl
    });

    function stylesheet$1(hostSelector, shadowSelector, nativeShadow) {
      return "\n" + (nativeShadow ? (":host {display: block;background: #16325c;}") : (hostSelector + " {display: block;background: #16325c;}")) + "\n.container" + shadowSelector + " {height: 80px;}\n.logo" + shadowSelector + " {padding-right: 1rem;}\nh1" + shadowSelector + " {font-family: 'Neutraface Display';font-size: .75rem;text-transform: uppercase;color: #fff;text-align: center;}\n@media (min-width: 21em) {h1" + shadowSelector + " {font-size: 1rem;}\n}@media (min-width: 48em) {.logo" + shadowSelector + " {padding-right: 20px;margin-right: 20px;border-right: 1px solid #fff;box-sizing: content-box;}\nh1" + shadowSelector + " {font-size: 1.25rem;text-align: left;}\n}.slds-badge" + shadowSelector + " {margin-top: -3px;display: none;}\n@media (min-width: 30em) {.slds-badge" + shadowSelector + " {display: inline-block;}\n}";
    }
    var _implicitStylesheets$1 = [stylesheet$1];

    function stylesheet$2(hostSelector, shadowSelector, nativeShadow) {
      return "\n" + (nativeShadow ? (":host {display: block;margin-left: auto;margin-right: auto;padding-left: .5rem;padding-right: .5rem;max-width: 80rem;}") : (hostSelector + " {display: block;margin-left: auto;margin-right: auto;padding-left: .5rem;padding-right: .5rem;max-width: 80rem;}")) + "\n\n" + (nativeShadow ? (":host.main-content {margin-top: 1rem;padding-bottom: 3rem;}") : (hostSelector + ".main-content {margin-top: 1rem;padding-bottom: 3rem;}")) + "\n@media (min-width: 48em) {\n" + (nativeShadow ? (":host.main-content {margin-top: 3rem;}") : (hostSelector + ".main-content {margin-top: 3rem;}")) + "\n}";
    }
    var _implicitStylesheets$2 = [stylesheet$2];

    function tmpl$1($api, $cmp, $slotset, $ctx) {
      const {
        s: api_slot
      } = $api;
      return [api_slot("", {
        key: 0
      }, [], $slotset)];
    }

    var _tmpl$1 = lwc.registerTemplate(tmpl$1);
    tmpl$1.slots = [""];
    tmpl$1.stylesheets = [];

    if (_implicitStylesheets$2) {
      tmpl$1.stylesheets.push.apply(tmpl$1.stylesheets, _implicitStylesheets$2);
    }
    tmpl$1.stylesheetTokens = {
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
      tmpl: _tmpl$1
    });

    function tmpl$2($api, $cmp, $slotset, $ctx) {
      const {
        h: api_element,
        t: api_text,
        c: api_custom_element
      } = $api;
      return [api_custom_element("localdevserver-layout-section", _localdevserverLayoutSection, {
        key: 4
      }, [api_element("div", {
        classMap: {
          "container": true,
          "slds-grid": true,
          "slds-grid_vertical-align-center": true
        },
        key: 3
      }, [api_element("img", {
        classMap: {
          "logo": true
        },
        attrs: {
          "src": "/assets/localdev/images/logo.svg",
          "alt": "Salesforce Logo",
          "width": "142",
          "height": "44"
        },
        key: 0
      }, []), api_element("h1", {
        key: 1
      }, [api_text("Welcome to the Local Development Server")]), api_element("span", {
        classMap: {
          "slds-badge": true,
          "slds-theme_warning": true,
          "slds-m-left_small": true
        },
        key: 2
      }, [api_text("Beta")])])])];
    }

    var _tmpl$2 = lwc.registerTemplate(tmpl$2);
    tmpl$2.stylesheets = [];

    if (_implicitStylesheets$1) {
      tmpl$2.stylesheets.push.apply(tmpl$2.stylesheets, _implicitStylesheets$1);
    }
    tmpl$2.stylesheetTokens = {
      hostAttribute: "localdevserver-header_header-host",
      shadowAttribute: "localdevserver-header_header"
    };

    class Header extends lwc.LightningElement {}

    var _localdevserverHeader = lwc.registerComponent(Header, {
      tmpl: _tmpl$2
    });

    function tmpl$3($api, $cmp, $slotset, $ctx) {
      const {
        d: api_dynamic,
        h: api_element,
        dc: api_dynamic_component,
        f: api_flatten
      } = $api;
      return api_flatten([$cmp.message ? api_element("div", {
        classMap: {
          "slds-box": true,
          "slds-theme_error": true,
          "slds-theme_alert-texture": true,
          "slds-text-align_center": true
        },
        key: 1
      }, [api_element("h2", {
        classMap: {
          "slds-text-heading_large": true
        },
        key: 0
      }, [api_dynamic($cmp.message)])]) : null, api_dynamic_component("localdevserver-dynamic", $cmp.customCtor, {
        context: {
          lwc: {}
        },
        key: 2
      }, [])]);
    }

    var _tmpl$3 = lwc.registerTemplate(tmpl$3);
    tmpl$3.stylesheets = [];
    tmpl$3.stylesheetTokens = {
      hostAttribute: "localdevserver-view_view-host",
      shadowAttribute: "localdevserver-view_view"
    };

    /**
     * Copied from the LWR custom application. This should be removed once
     * this RFC is implemented: https://rfcs.lwc.dev/rfcs/lws/0000-router-views
     */

    class LocalDevServerView extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.message = void 0;
        this.customCtor = undefined;
        this.navContext = void 0;
      }

      connectedCallback() {
        // Subscribe to updates on the current state.
        this.subscription = navigation.subscribe(this.navContext, (_route, routeDef) => this.renderComponent(routeDef || {}));
      }

      async renderComponent({
        component: specifier
      } = {}) {
        // Show an error if the component was not resolved.
        if (!specifier) {
          this.message = '404: Not Found';
          return;
        }

        try {
          // Import the module from the given specifier, render the default export.
          const module = await loader.load(specifier);

          if (!module.default || typeof module.default !== 'function') {
            throw new Error('Expected a route component with a default export');
          }

          this.customCtor = module.default;
        } catch (e) {
          console.error(`Problem loading component "${specifier}": ${e.message || e}`);
          this.message = `An unexpected error occurred.`;
        }
      }

      disconnectedCallback() {
        // Unsubscribe from route changes.
        if (this.subscription) {
          this.subscription.unsubscribe();
        }
      }

    }

    lwc.registerDecorators(LocalDevServerView, {
      wire: {
        navContext: {
          adapter: navigation.NavigationContext
        }
      },
      track: {
        message: 1,
        customCtor: 1
      }
    });

    var _localdevserverView = lwc.registerComponent(LocalDevServerView, {
      tmpl: _tmpl$3
    });

    function tmpl$4($api, $cmp, $slotset, $ctx) {
      const {
        c: api_custom_element,
        s: api_slot,
        h: api_element
      } = $api;
      return [api_custom_element("localdevserver-layout", _localdevserverLayout, {
        key: 4
      }, [api_slot("header", {
        attrs: {
          "name": "header"
        },
        key: 1
      }, [api_custom_element("localdevserver-header", _localdevserverHeader, {
        key: 0
      }, [])], $slotset), api_element("main", {
        key: 3
      }, [api_custom_element("localdevserver-view", _localdevserverView, {
        key: 2
      }, [])])])];
    }

    var _tmpl$4 = lwc.registerTemplate(tmpl$4);
    tmpl$4.slots = ["header"];
    tmpl$4.stylesheets = [];
    tmpl$4.stylesheetTokens = {
      hostAttribute: "localdevserver-app_app-host",
      shadowAttribute: "localdevserver-app_app"
    };

    /**
     * Copyright (c) 2019, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    function assert(assertion, message) {
      if (!assertion) {
        throw new Error(message);
      }
    }

    /**
     * Copyright (c) 2019, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    /**
     * Prefix for log names
     */
    const WEBRUNTIME_PREFIX = 'webruntime';
    /**
     * Add a common prefix to the input URL*
     * @param { string } prefix
     * @param { string } urlString - url part to which the prefix need to be added
     */

    function getPrefixedURL(urlString) {
      return `/${WEBRUNTIME_PREFIX}${urlString}`;
    }
    /**
     * Path prefix of api calls
     */


    const API_PATH_PREFIX = getPrefixedURL('/api');

    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    const methodsWithCSRF = ['POST', 'PATCH', 'PUT', 'DELETE'];
    /**
     * Makes a request using the fetch API with the given path, method and body.
     *
     * This method takes care of setting the credentials to 'same-origin'
     * and adds the Content-Type header if a body is passed.
     *
     * @param {String} path - The request path, should be absolute but we prepend /<basePath>/api to it
     * @param {Object} init - An options object containing any custom settings that you want to apply to the request.
     * @param {String} init.credentials - The request credentials you want to use for the request, same-origin unless specified
     * @param {String} init.headers - Overrides the HTTP headers
     * @param {String} init.basePath - Overrides the default base path of @app/basePath + API_PATH_PREFIX
     */

    async function fetch(path, init = {}) {
      assert(path, 'Path not provided for API request');

      const initParams = _objectSpread({}, init, {
        headers: _objectSpread({}, init.headers),
        credentials: init.credentials || 'same-origin'
      });

      const url = initParams.basePath !== undefined ? initParams.basePath + path : basePath + API_PATH_PREFIX + path;
      initParams.headers['Content-Type'] = initParams.headers['Content-Type'] || init.body && 'application/json; charset=utf-8';
      addCSRFToken(initParams);
      return window.fetch(url, initParams);
    }

    function addCSRFToken(params) {
      if (params.method && methodsWithCSRF.includes(params.method)) {
        if (csrfToken) {
          params.headers['CSRF-Token'] = csrfToken;
        }
      }
    }

    const prefix = "/services/data/v49.0";
    const auraMethodToResourceReferenceMapping = {
      // Fetch standard field data, custom field data, and enrichment data for a single Product
      "CommerceCatalogController.getProductCategoryPath": {
        "urlPath": prefix + "/commerce/webstores/${webstoreId}/product-category-path/product-categories/${productCategoryId}",
        "urlPathParamNames": ["productCategoryId", "webstoreId"],
        "method": "GET"
      },
      // Fetch standard field data, custom field data, and enrichment data for a single Product
      "CommerceCatalogController.getProduct": {
        "urlPath": prefix + "/commerce/webstores/${webstoreId}/products/${productId}",
        "urlPathParamNames": ["productId", "webstoreId"],
        "method": "GET"
      },
      // Get the list price and buyer price for a product in the context of a Web Store for the given account and currency
      "CommerceStorePricingController.getProductPrice": {
        "urlPath": prefix + "/commerce/webstores/${webstoreId}/pricing/products/${productId}",
        "urlPathParamNames": ["productId", "webstoreId"],
        "method": "GET"
      },
      // Start a job to purge Missions activities for a user.
      "MissionsController.purgeUserMissionsActivities": {
        "urlPath": prefix + "/connect/communities/${communityId}/missions/activities/purge-job",
        "urlPathParamNames": ["communityId"],
        "method": "POST"
      },
      // Search for products in a webstore.
      "CommerceProductSearchController.productSearch": {
        "urlPath": prefix + "/commerce/webstores/${webstoreId}/search/product-search",
        "urlPathParamNames": ["webstoreId"],
        "inputRepresentation": "productSearchInput",
        "method": "POST"
      },
      // Get all the navigation menu items
      "NavigationMenuController.getCommunityNavigationMenu": {
        "urlPath": prefix + "/connect/communities/${communityId}/navigation-menu/navigation-menu-items",
        "urlPathParamNames": ["communityId"],
        "method": "GET"
      },
      // Retrieve a Quick Action layout.
      "ActionsController.getActionLayout": {
        "urlPath": prefix + "/ui-api/actions/layout/${actionApiName}",
        "urlPathParamNames": ["actionApiName"],
        "method": "GET"
      },
      // Retrieve presentation-ready action data about specific list-view listViewIds.
      "ActionsController.getListViewActions": {
        "urlPath": prefix + "/ui-api/actions/list-view/${listViewIds}",
        "urlPathParamNames": ["listViewIds"],
        "method": "GET"
      },
      // Retrieve presentation-ready action data about specific lookup objectApiNames.
      "ActionsController.getLookupActions": {
        "urlPath": prefix + "/ui-api/actions/lookup/${objectApiNames}",
        "urlPathParamNames": ["objectApiNames"],
        "method": "GET"
      },
      // Retrieve presentation-ready action data about specific mru-list objectApiNames.
      "ActionsController.getMRUListActions": {
        "urlPath": prefix + "/ui-api/actions/mru-list/${objectApiNames}",
        "urlPathParamNames": ["objectApiNames"],
        "method": "GET"
      },
      // Retrieve presentation-ready action data about specific recordId under the RecordEdit subcontext.
      "ActionsController.getRecordEditActions": {
        "urlPath": prefix + "/ui-api/actions/record/${recordIds}/record-edit",
        "urlPathParamNames": ["recordIds"],
        "method": "GET"
      },
      // Retrieve presentation-ready action data about specific recordIds.
      "ActionsController.getRecordActions": {
        "urlPath": prefix + "/ui-api/actions/record/${recordIds}",
        "urlPathParamNames": ["recordIds"],
        "method": "GET"
      },
      // Retrieve presentation-ready action data about specific recordId under the related-list-record relatedListRecordIds.
      "ActionsController.getRelatedListRecordActions": {
        "urlPath": prefix + "/ui-api/actions/record/${recordIds}/related-list-record/${relatedListRecordIds}",
        "urlPathParamNames": ["recordIds", "relatedListRecordIds"],
        "method": "GET"
      },
      // Retrieve presentation-ready action data about specific recordId for the RelatedList subcontexts relatedListIds.
      "ActionsController.getRelatedListActions": {
        "urlPath": prefix + "/ui-api/actions/record/${recordIds}/related-list/${relatedListIds}",
        "urlPathParamNames": ["recordIds", "relatedListIds"],
        "method": "GET"
      },
      // Retrieve lists for a given objectApiName.
      "ListUiController.getListsByObjectName": {
        "urlPath": prefix + "/ui-api/list-ui/${objectApiName}",
        "urlPathParamNames": ["objectApiName"],
        "method": "GET"
      },
      // Retrieve list info.
      "ListUiController.getListInfoById": {
        "urlPath": prefix + "/ui-api/list-info/${listViewId}",
        "urlPathParamNames": ["listViewId"],
        "method": "GET"
      },
      // Retrieve list info.
      "ListUiController.getListInfoByName": {
        "urlPath": prefix + "/ui-api/list-info/${objectApiName}/${listViewApiName}",
        "urlPathParamNames": ["listViewApiName", "objectApiName"],
        "method": "GET"
      },
      // Returns record data to populate a list.
      "ListUiController.getListRecordsById": {
        "urlPath": prefix + "/ui-api/list-records/${listViewId}",
        "urlPathParamNames": ["listViewId"],
        "method": "GET"
      },
      // Returns record data to populate a list.
      "ListUiController.getListRecordsByName": {
        "urlPath": prefix + "/ui-api/list-records/${objectApiName}/${listViewApiName}",
        "urlPathParamNames": ["listViewApiName", "objectApiName"],
        "method": "GET"
      },
      // Retrieve list data and info.
      "ListUiController.getListUiById": {
        "urlPath": prefix + "/ui-api/list-ui/${listViewId}",
        "urlPathParamNames": ["listViewId"],
        "method": "GET"
      },
      // Retrieve list data and info.
      "ListUiController.getListUiByName": {
        "urlPath": prefix + "/ui-api/list-ui/${objectApiName}/${listViewApiName}",
        "urlPathParamNames": ["listViewApiName", "objectApiName"],
        "method": "GET"
      },
      // Returns record search results for the given lookup field.
      "LookupController.getLookupRecords": {
        "urlPath": prefix + "/ui-api/lookups/${objectApiName}/${fieldApiName}/${targetApiName}",
        "urlPathParamNames": ["fieldApiName", "objectApiName", "targetApiName"],
        "method": "GET"
      },
      // Retrieve MRU list info.
      "MruListUiController.getMruListInfo": {
        "urlPath": prefix + "/ui-api/mru-list-info/${objectApiName}",
        "urlPathParamNames": ["objectApiName"],
        "method": "GET"
      },
      // Returns record data to populate an MRU list.
      "MruListUiController.getMruListRecords": {
        "urlPath": prefix + "/ui-api/mru-list-records/${objectApiName}",
        "urlPathParamNames": ["objectApiName"],
        "method": "GET"
      },
      // Retrieve MRU list data and info.
      "MruListUiController.getMruListUi": {
        "urlPath": prefix + "/ui-api/mru-list-ui/${objectApiName}",
        "urlPathParamNames": ["objectApiName"],
        "method": "GET"
      },
      // Retrieve presentation-ready metadata and data.
      "RecordUiController.getAggregateUi": {
        "urlPath": prefix + "/ui-api/aggregate-ui",
        "urlPathParamNames": [],
        "method": "GET"
      },
      // Executes multiple requests within a single request
      "RecordUiController.executeAggregateUi": {
        "urlPath": prefix + "/ui-api/aggregate-ui",
        "urlPathParamNames": [],
        "inputRepresentation": "input",
        "method": "POST"
      },
      // Retrieve record data for a list of recordIds.
      "RecordUiController.getRecordsWithFields": {
        "urlPath": prefix + "/ui-api/records/batch/${recordIds}",
        "urlPathParamNames": ["recordIds"],
        "method": "GET"
      },
      // Retrieve record data for a list of recordIds.
      "RecordUiController.getRecordsWithLayouts": {
        "urlPath": prefix + "/ui-api/records/batch/${recordIds}",
        "urlPathParamNames": ["recordIds"],
        "method": "GET"
      },
      // Get duplicate management configuration for a specific entity object
      "RecordUiController.getDedupeConfig": {
        "urlPath": prefix + "/ui-api/duplicates/${objectApiName}",
        "urlPathParamNames": ["objectApiName"],
        "method": "GET"
      },
      // Retrieve a specific form by name.
      "RecordUiController.getFormByName": {
        "urlPath": prefix + "/ui-api/forms/${apiName}",
        "urlPathParamNames": ["apiName"],
        "method": "GET"
      },
      // Retrieve a specific layout.
      "RecordUiController.getLayout": {
        "urlPath": prefix + "/ui-api/layout/${objectApiName}",
        "urlPathParamNames": ["objectApiName"],
        "method": "GET"
      },
      // Retrieve a specific layout's user state.
      "RecordUiController.getLayoutUserState": {
        "urlPath": prefix + "/ui-api/layout/${objectApiName}/user-state",
        "urlPathParamNames": ["objectApiName"],
        "method": "GET"
      },
      // Update a specific layout's user state.
      "RecordUiController.updateLayoutUserState": {
        "urlPath": prefix + "/ui-api/layout/${objectApiName}/user-state",
        "urlPathParamNames": ["objectApiName"],
        "inputRepresentation": "userState",
        "method": "PATCH"
      },
      // Retrieve metadata about a list of objects.
      "RecordUiController.getObjectInfos": {
        "urlPath": prefix + "/ui-api/object-info/batch/${objectApiNames}",
        "urlPathParamNames": ["objectApiNames"],
        "method": "GET"
      },
      // Retrieve metadata about a specific object.
      "RecordUiController.getObjectInfo": {
        "urlPath": prefix + "/ui-api/object-info/${objectApiName}",
        "urlPathParamNames": ["objectApiName"],
        "method": "GET"
      },
      // Returns the values for all picklist fields for a recordType
      "RecordUiController.getPicklistValuesByRecordType": {
        "urlPath": prefix + "/ui-api/object-info/${objectApiName}/picklist-values/${recordTypeId}",
        "urlPathParamNames": ["objectApiName", "recordTypeId"],
        "method": "GET"
      },
      // Returns the values for a specific picklist.
      "RecordUiController.getPicklistValues": {
        "urlPath": prefix + "/ui-api/object-info/${objectApiName}/picklist-values/${recordTypeId}/${fieldApiName}",
        "urlPathParamNames": ["fieldApiName", "objectApiName", "recordTypeId"],
        "method": "GET"
      },
      // Performs a predupe check on given a record.
      "RecordUiController.findDuplicates": {
        "urlPath": prefix + "/ui-api/predupe",
        "urlPathParamNames": [],
        "inputRepresentation": "recordInput",
        "method": "POST"
      },
      // Stores avatar association for specific records.
      "RecordUiController.postRecordAvatarAssociation": {
        "urlPath": prefix + "/ui-api/record-avatars/${recordId}/association",
        "urlPathParamNames": ["recordId"],
        "inputRepresentation": "input",
        "method": "POST"
      },
      // Retrieve avatar information about specific records.
      "RecordUiController.getRecordAvatars": {
        "urlPath": prefix + "/ui-api/record-avatars/batch/${recordIds}",
        "urlPathParamNames": ["recordIds"],
        "method": "GET"
      },
      // Retrieve default values for fields for cloning a record with optional record type.
      "RecordUiController.getRecordCloneDefaults": {
        "urlPath": prefix + "/ui-api/record-defaults/clone/${recordId}",
        "urlPathParamNames": ["recordId"],
        "method": "GET"
      },
      // Retrieve default values for fields for a new record of a particular object and optional record type.
      "RecordUiController.getRecordCreateDefaults": {
        "urlPath": prefix + "/ui-api/record-defaults/create/${objectApiName}",
        "urlPathParamNames": ["objectApiName"],
        "method": "GET"
      },
      // Create a new record.
      "RecordUiController.createRecord": {
        "urlPath": prefix + "/ui-api/records",
        "urlPathParamNames": [],
        "inputRepresentation": "recordInput",
        "method": "POST"
      },
      // Delete record.
      "RecordUiController.deleteRecord": {
        "urlPath": prefix + "/ui-api/records/${recordId}",
        "urlPathParamNames": ["recordId"],
        "method": "DELETE"
      },
      // Retrieve record data.
      "RecordUiController.getRecordWithFields": {
        "urlPath": prefix + "/ui-api/records/${recordId}",
        "urlPathParamNames": ["recordId"],
        "method": "GET"
      },
      // Retrieve record data.
      "RecordUiController.getRecordWithLayouts": {
        "urlPath": prefix + "/ui-api/records/${recordId}",
        "urlPathParamNames": ["recordId"],
        "method": "GET"
      },
      // Update an existing record.
      "RecordUiController.updateRecord": {
        "urlPath": prefix + "/ui-api/records/${recordId}",
        "urlPathParamNames": ["recordId"],
        "inputRepresentation": "recordInput",
        "method": "PATCH"
      },
      // Retrieve default values for fields for cloning a record with optional record type.
      "RecordUiController.getRecordDefaultsTemplateClone": {
        "urlPath": prefix + "/ui-api/record-defaults/template/clone/${recordId}",
        "urlPathParamNames": ["recordId"],
        "method": "GET"
      },
      // Retrieve default values for fields for a new record of a particular object and optional record type without layouts.
      "RecordUiController.getRecordDefaultsTemplateForCreate": {
        "urlPath": prefix + "/ui-api/record-defaults/template/create/${objectApiName}",
        "urlPathParamNames": ["objectApiName"],
        "method": "GET"
      },
      // Retrieve presentation-ready metadata and data about specific records.
      "RecordUiController.getRecordUis": {
        "urlPath": prefix + "/ui-api/record-ui/${recordIds}",
        "urlPathParamNames": ["recordIds"],
        "method": "GET"
      },
      // Retrieve metadata of validation rules for the given object
      "RecordUiController.getValidationRulesInfo": {
        "urlPath": prefix + "/ui-api/object-info/${objectApiName}/validation-rules-info",
        "urlPathParamNames": ["objectApiName"],
        "method": "GET"
      },
      // Retrieve a batch of related list info.
      "RelatedListUiController.getRelatedListInfoBatch": {
        "urlPath": prefix + "/ui-api/related-list-info/batch/${parentObjectApiName}/${relatedListNames}",
        "urlPathParamNames": ["parentObjectApiName", "relatedListNames"],
        "method": "GET"
      },
      // Retrieve collection of related list summaries.
      "RelatedListUiController.getRelatedListInfoCollection": {
        "urlPath": prefix + "/ui-api/related-list-info/${parentObjectApiName}",
        "urlPathParamNames": ["parentObjectApiName"],
        "method": "GET"
      },
      // Retrieve related info.
      "RelatedListUiController.getRelatedListInfo": {
        "urlPath": prefix + "/ui-api/related-list-info/${parentRecordId}/${relatedListId}",
        "urlPathParamNames": ["parentRecordId", "relatedListId"],
        "method": "GET"
      },
      // Retrieve related info.
      "RelatedListUiController.getRelatedListInfoByApiName": {
        "urlPath": prefix + "/ui-api/related-list-info/${parentObjectApiName}/${relatedListId}",
        "urlPathParamNames": ["parentObjectApiName", "relatedListId"],
        "method": "GET"
      },
      // Update user preferences on an existing related list.
      "RelatedListUiController.updateRelatedListInfoByApiName": {
        "urlPath": prefix + "/ui-api/related-list-info/${parentObjectApiName}/${relatedListId}",
        "urlPathParamNames": ["parentObjectApiName", "relatedListId"],
        "method": "PATCH"
      },
      // Retrieve a batch of record counts.
      "RelatedListUiController.getRelatedListsRecordCount": {
        "urlPath": prefix + "/ui-api/related-list-count/batch/${parentRecordId}/${relatedListNames}",
        "urlPathParamNames": ["parentRecordId", "relatedListNames"],
        "method": "GET"
      },
      // Retrieve record counts.
      "RelatedListUiController.getRelatedListRecordCount": {
        "urlPath": prefix + "/ui-api/related-list-count/${parentRecordId}/${relatedListName}",
        "urlPathParamNames": ["parentRecordId", "relatedListName"],
        "method": "GET"
      },
      // Returns a batch of record data to populate several related list.
      "RelatedListUiController.getRelatedListRecordsBatch": {
        "urlPath": prefix + "/ui-api/related-list-records/batch/${parentRecordId}/${relatedListIds}",
        "urlPathParamNames": ["parentRecordId", "relatedListIds"],
        "method": "GET"
      },
      // Returns record data to populate a related list.
      "RelatedListUiController.getRelatedListRecords": {
        "urlPath": prefix + "/ui-api/related-list-records/${parentRecordId}/${relatedListId}",
        "urlPathParamNames": ["parentRecordId", "relatedListId"],
        "method": "GET"
      }
    };
    function getResourceReferenceFromAuraMethod(auraMethod) {
      return auraMethodToResourceReferenceMapping[auraMethod];
    }

    function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } return target; }

    function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

    async function apiCall(endpoint, params) {
      const [controller, action] = endpoint.split('.'); // handle Apex calls

      if (controller === 'ApexActionController') {
        return handleApexAction(action, params);
      } // handle UI API calls
      // get the UI API reference using the Aura controller and method name


      const uiApiReference = getResourceReferenceFromAuraMethod(endpoint);

      if (uiApiReference) {
        return handleUiApiCall(uiApiReference, params);
      }

      throw new Error(`Unsupported controller action: ${controller}.${action}`);
    }

    async function handleUiApiCall({
      urlPath,
      urlPathParamNames,
      method,
      inputRepresentation
    }, params) {
      const remainingParams = params && _objectSpread$1({}, params) || {}; // replace the path params

      let path = urlPathParamNames.reduce((currentPath, paramName) => {
        const value = remainingParams[paramName];
        delete remainingParams[paramName];
        return currentPath.replace(`\${${paramName}}`, encodeURIComponent(value));
      }, urlPath); // get the POST/PATCH body

      let body;

      if ((method === 'POST' || method === 'PATCH') && remainingParams[inputRepresentation]) {
        body = JSON.stringify(remainingParams[inputRepresentation]);
        delete remainingParams[inputRepresentation];
      } // add the rest as query params


      if (Object.keys(remainingParams).length) {
        path += `?${Object.entries(remainingParams).filter(([, val]) => {
      return val !== undefined && val !== null && (!Array.isArray(val) || val.length);
    }).map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`).join('&')}`;
      } // fetch!


      const response = await fetch(path, {
        method,
        body
      });
      let data;

      if (response.status !== 204) {
        data = await response.json();
      }

      if (!response.ok) {
        const error = {
          status: response.status,
          data: _objectSpread$1({}, data[0], {
            statusCode: response.status
          })
        };
        throw error;
      }

      return data;
    }

    async function handleApexAction(action, params) {
      if (action === 'execute') {
        return fetch(`/apex/${action}`, {
          method: 'POST',
          body: JSON.stringify(params)
        }).then(response => {
          // we always resolve to a json... if there are errors, they
          // are exposed and thrown from the error property
          // see lds/transport-utils#createFetchResponse()
          return response.status !== 204 ? response.json() : undefined;
        }).then(response => {
          if (response && response.error && response.error.length > 0) {
            throw response.error[0]; // eslint-disable-line no-throw-literal
          }

          return response;
        });
      }

      throw new Error(`Unsupported Apex action: ${action}`);
    }

    /**
     * Copyright (c) 2019, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    var aura = /*#__PURE__*/Object.freeze({
        __proto__: null,
        executeGlobalController: apiCall
    });

    /**
     * Copyright (c) 2019, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    var auraStorage = {};

    /**
     * Copyright (c) 2019, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    // We're calling conosle.log and console.error directly instead of importing log and error from console because
    // it turned out that the transpiled compat mode code caused a problem in IE11.
    // see detailed explanation here https://git.soma.salesforce.com/communities/webruntime/pull/1284
    function log(...msg) {
      // eslint-disable-next-line no-console
      console.log(`[webruntime]`, ...msg);
    }
    function logError(...msg) {
      // eslint-disable-next-line no-console
      console.error(`[webruntime]`, ...msg);
    }

    var logger = /*#__PURE__*/Object.freeze({
        __proto__: null,
        log: log,
        logError: logError
    });

    // These are stub functions for aura-instrumentation used by LDS. We aren't
    // doing anything with these metrics currently so these are all no-op.
    // If core webruntime provides an implementation then we could try that.
    function perfStart(name, attributes, eventSource) {}

    function perfEnd(name, attributes, eventSource) {}

    function mark(ns, name, ctx) {}

    function markStart(ns, name, ctx) {}

    function markEnd(ns, name, ctx) {}

    function time() {
      return Date.now();
    }

    function interaction(target, scope, context, eventSource, eventType) {}

    function registerCacheStats(name) {
      return {
        logHits(count) {},

        logMisses(count) {},

        unRegister() {}

      };
    }

    function error(attributes, eventSource, eventType) {}

    function registerPeriodicLogger(name, callback) {}

    function removePeriodicLogger(id) {}

    function registerPlugin(pluginConfig) {}

    function enablePlugin(name) {}

    function disablePlugin(name) {}

    function counter(metricsKey) {
      return {
        increment(value) {},

        decrement(value) {},

        getValue() {
          return 0;
        },

        reset() {}

      };
    }

    function gauge(metricsKey) {
      return {
        setValue(value) {},

        getValue() {
          return 0;
        },

        reset() {}

      };
    }

    function percentileHistogram(metricsKey) {
      return {
        update(value) {},

        getValue() {
          return [];
        },

        reset() {}

      };
    }

    function timer(metricsKey) {
      return {
        addDuration() {},

        time() {},

        getValue() {
          return [];
        },

        reset() {},

        get() {}

      };
    } // exports must match https://sfdc.co/b837t5

    var auraInstrumentation = /*#__PURE__*/Object.freeze({
        __proto__: null,
        perfStart: perfStart,
        perfEnd: perfEnd,
        mark: mark,
        markStart: markStart,
        markEnd: markEnd,
        time: time,
        interaction: interaction,
        registerCacheStats: registerCacheStats,
        error: error,
        registerPeriodicLogger: registerPeriodicLogger,
        removePeriodicLogger: removePeriodicLogger,
        registerPlugin: registerPlugin,
        enablePlugin: enablePlugin,
        disablePlugin: disablePlugin,
        counter: counter,
        gauge: gauge,
        percentileHistogram: percentileHistogram,
        timer: timer
    });

    // See iconUtils.js in the lighting components package. The default paths are
    // under `/assets`, so override them here since we put them in a different
    // location.
    const assetsRoot = '/assets/localdev';
    const tokens = {
      'lightning.actionSprite': `${assetsRoot}/icons/action-sprite/svg/symbols.svg`,
      'lightning.actionSpriteRtl': `${assetsRoot}/icons/action-sprite/svg/symbols.svg`,
      'lightning.customSprite': `${assetsRoot}/icons/custom-sprite/svg/symbols.svg`,
      'lightning.customSpriteRtl': `${assetsRoot}/icons/custom-sprite/svg/symbols.svg`,
      'lightning.doctypeSprite': `${assetsRoot}/icons/doctype-sprite/svg/symbols.svg`,
      'lightning.doctypeSpriteRtl': `${assetsRoot}/icons/doctype-sprite/svg/symbols.svg`,
      'lightning.standardSprite': `${assetsRoot}/icons/standard-sprite/svg/symbols.svg`,
      'lightning.standardSpriteRtl': `${assetsRoot}/icons/standard-sprite/svg/symbols.svg`,
      'lightning.utilitySprite': `${assetsRoot}/icons/utility-sprite/svg/symbols.svg`,
      'lightning.utilitySpriteRtl': `${assetsRoot}/icons/utility-sprite/svg/symbols.svg`
    };
    function getToken(name) {
      return tokens[name];
    }

    var lightningConfigProvider = /*#__PURE__*/Object.freeze({
        __proto__: null,
        tokens: tokens,
        getToken: getToken
    });

    var routes = [{
      id: 'home',
      path: '/',
      component: 'localdevserver/home'
    }, {
      id: 'preview',
      path: '/preview/:namespace/:name',
      component: 'localdevserver/preview'
    }, {
      id: 'old-preview',
      path: '/lwc/preview/:namespace/:name',
      component: 'localdevserver/preview'
    }];

    wireService.registerWireService(lwc.register);
    configProviderService(lightningConfigProvider);
    navigation.createRouter({
      routes
    }).addErrorNavigate(e => {
      console.error(`There was a problem during navigation: ${e.code} :: ${e.message}`);
    }).connect();

    class LocalDevServerApp extends lwc.LightningElement {
      constructor() {
        super();
        this.defineModules({
          // Modules referenced by LDS from core. Some of these may be removable once we
          // switch to off-core LDS.
          aura,
          logger,
          'aura-instrumentation': auraInstrumentation,
          'aura-storage': auraStorage,
          'instrumentation/service': auraInstrumentation,
          'lightning/navigation': lightningNavigation,
          // Hardcoded values for salesforce-scoped imports. As these modules
          // become officially supported they can be removed from here. We
          // could also do this through stub implementations too.
          '@salesforce/user/isGuest': true,
          '@salesforce/user/Id': '',
          '@salesforce/client/formFactor': 'Large'
        });
      }
      /**
       * Define AMD modules using Webruntime's loader.
       *
       * @param {Object.<string, module>} modules - An object where the key is the
       * module id and the value is the module or return value.
       */


      defineModules(modules) {
        if (!window.Webruntime || !window.Webruntime.define) {
          throw new Error('Webruntime.define is not defined');
        }

        Object.entries(modules).forEach(([name, value]) => {
          window.Webruntime.define(name, [], () => value);
        });
      }

    }

    var App = lwc.registerComponent(LocalDevServerApp, {
      tmpl: _tmpl$4
    });

    const elementName = 'localdevserver/app'.replace(/\//, '-');
    customElements.define(elementName, lwc.buildCustomElementConstructor(App));

});
