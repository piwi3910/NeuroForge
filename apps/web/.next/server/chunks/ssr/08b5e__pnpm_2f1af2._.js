module.exports = {

"[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/util/schema.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
'use strict';
module.exports = Schema;
var proto = Schema.prototype;
proto.space = null;
proto.normal = {};
proto.property = {};
function Schema(property, normal, space) {
    this.property = property;
    this.normal = normal;
    if (space) {
        this.space = space;
    }
}
}}),
"[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/util/merge.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
'use strict';
var xtend = __turbopack_require__("[project]/node_modules/.pnpm/xtend@4.0.2/node_modules/xtend/immutable.js [app-ssr] (ecmascript)");
var Schema = __turbopack_require__("[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/util/schema.js [app-ssr] (ecmascript)");
module.exports = merge;
function merge(definitions) {
    var length = definitions.length;
    var property = [];
    var normal = [];
    var index = -1;
    var info;
    var space;
    while(++index < length){
        info = definitions[index];
        property.push(info.property);
        normal.push(info.normal);
        space = info.space;
    }
    return new Schema(xtend.apply(null, property), xtend.apply(null, normal), space);
}
}}),
"[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/normalize.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
'use strict';
module.exports = normalize;
function normalize(value) {
    return value.toLowerCase();
}
}}),
"[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/util/info.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
'use strict';
module.exports = Info;
var proto = Info.prototype;
proto.space = null;
proto.attribute = null;
proto.property = null;
proto.boolean = false;
proto.booleanish = false;
proto.overloadedBoolean = false;
proto.number = false;
proto.commaSeparated = false;
proto.spaceSeparated = false;
proto.commaOrSpaceSeparated = false;
proto.mustUseProperty = false;
proto.defined = false;
function Info(property, attribute) {
    this.property = property;
    this.attribute = attribute;
}
}}),
"[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/util/types.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
'use strict';
var powers = 0;
exports.boolean = increment();
exports.booleanish = increment();
exports.overloadedBoolean = increment();
exports.number = increment();
exports.spaceSeparated = increment();
exports.commaSeparated = increment();
exports.commaOrSpaceSeparated = increment();
function increment() {
    return Math.pow(2, ++powers);
}
}}),
"[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/util/defined-info.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
'use strict';
var Info = __turbopack_require__("[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/util/info.js [app-ssr] (ecmascript)");
var types = __turbopack_require__("[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/util/types.js [app-ssr] (ecmascript)");
module.exports = DefinedInfo;
DefinedInfo.prototype = new Info();
DefinedInfo.prototype.defined = true;
var checks = [
    'boolean',
    'booleanish',
    'overloadedBoolean',
    'number',
    'commaSeparated',
    'spaceSeparated',
    'commaOrSpaceSeparated'
];
var checksLength = checks.length;
function DefinedInfo(property, attribute, mask, space) {
    var index = -1;
    var check;
    mark(this, 'space', space);
    Info.call(this, property, attribute);
    while(++index < checksLength){
        check = checks[index];
        mark(this, check, (mask & types[check]) === types[check]);
    }
}
function mark(values, key, value) {
    if (value) {
        values[key] = value;
    }
}
}}),
"[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/util/create.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
'use strict';
var normalize = __turbopack_require__("[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/normalize.js [app-ssr] (ecmascript)");
var Schema = __turbopack_require__("[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/util/schema.js [app-ssr] (ecmascript)");
var DefinedInfo = __turbopack_require__("[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/util/defined-info.js [app-ssr] (ecmascript)");
module.exports = create;
function create(definition) {
    var space = definition.space;
    var mustUseProperty = definition.mustUseProperty || [];
    var attributes = definition.attributes || {};
    var props = definition.properties;
    var transform = definition.transform;
    var property = {};
    var normal = {};
    var prop;
    var info;
    for(prop in props){
        info = new DefinedInfo(prop, transform(attributes, prop), props[prop], space);
        if (mustUseProperty.indexOf(prop) !== -1) {
            info.mustUseProperty = true;
        }
        property[prop] = info;
        normal[normalize(prop)] = prop;
        normal[normalize(info.attribute)] = prop;
    }
    return new Schema(property, normal, space);
}
}}),
"[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/xlink.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
'use strict';
var create = __turbopack_require__("[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/util/create.js [app-ssr] (ecmascript)");
module.exports = create({
    space: 'xlink',
    transform: xlinkTransform,
    properties: {
        xLinkActuate: null,
        xLinkArcRole: null,
        xLinkHref: null,
        xLinkRole: null,
        xLinkShow: null,
        xLinkTitle: null,
        xLinkType: null
    }
});
function xlinkTransform(_, prop) {
    return 'xlink:' + prop.slice(5).toLowerCase();
}
}}),
"[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/xml.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
'use strict';
var create = __turbopack_require__("[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/util/create.js [app-ssr] (ecmascript)");
module.exports = create({
    space: 'xml',
    transform: xmlTransform,
    properties: {
        xmlLang: null,
        xmlBase: null,
        xmlSpace: null
    }
});
function xmlTransform(_, prop) {
    return 'xml:' + prop.slice(3).toLowerCase();
}
}}),
"[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/util/case-sensitive-transform.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
'use strict';
module.exports = caseSensitiveTransform;
function caseSensitiveTransform(attributes, attribute) {
    return attribute in attributes ? attributes[attribute] : attribute;
}
}}),
"[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/util/case-insensitive-transform.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
'use strict';
var caseSensitiveTransform = __turbopack_require__("[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/util/case-sensitive-transform.js [app-ssr] (ecmascript)");
module.exports = caseInsensitiveTransform;
function caseInsensitiveTransform(attributes, property) {
    return caseSensitiveTransform(attributes, property.toLowerCase());
}
}}),
"[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/xmlns.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
'use strict';
var create = __turbopack_require__("[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/util/create.js [app-ssr] (ecmascript)");
var caseInsensitiveTransform = __turbopack_require__("[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/util/case-insensitive-transform.js [app-ssr] (ecmascript)");
module.exports = create({
    space: 'xmlns',
    attributes: {
        xmlnsxlink: 'xmlns:xlink'
    },
    transform: caseInsensitiveTransform,
    properties: {
        xmlns: null,
        xmlnsXLink: null
    }
});
}}),
"[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/aria.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
'use strict';
var types = __turbopack_require__("[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/util/types.js [app-ssr] (ecmascript)");
var create = __turbopack_require__("[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/util/create.js [app-ssr] (ecmascript)");
var booleanish = types.booleanish;
var number = types.number;
var spaceSeparated = types.spaceSeparated;
module.exports = create({
    transform: ariaTransform,
    properties: {
        ariaActiveDescendant: null,
        ariaAtomic: booleanish,
        ariaAutoComplete: null,
        ariaBusy: booleanish,
        ariaChecked: booleanish,
        ariaColCount: number,
        ariaColIndex: number,
        ariaColSpan: number,
        ariaControls: spaceSeparated,
        ariaCurrent: null,
        ariaDescribedBy: spaceSeparated,
        ariaDetails: null,
        ariaDisabled: booleanish,
        ariaDropEffect: spaceSeparated,
        ariaErrorMessage: null,
        ariaExpanded: booleanish,
        ariaFlowTo: spaceSeparated,
        ariaGrabbed: booleanish,
        ariaHasPopup: null,
        ariaHidden: booleanish,
        ariaInvalid: null,
        ariaKeyShortcuts: null,
        ariaLabel: null,
        ariaLabelledBy: spaceSeparated,
        ariaLevel: number,
        ariaLive: null,
        ariaModal: booleanish,
        ariaMultiLine: booleanish,
        ariaMultiSelectable: booleanish,
        ariaOrientation: null,
        ariaOwns: spaceSeparated,
        ariaPlaceholder: null,
        ariaPosInSet: number,
        ariaPressed: booleanish,
        ariaReadOnly: booleanish,
        ariaRelevant: null,
        ariaRequired: booleanish,
        ariaRoleDescription: spaceSeparated,
        ariaRowCount: number,
        ariaRowIndex: number,
        ariaRowSpan: number,
        ariaSelected: booleanish,
        ariaSetSize: number,
        ariaSort: null,
        ariaValueMax: number,
        ariaValueMin: number,
        ariaValueNow: number,
        ariaValueText: null,
        role: null
    }
});
function ariaTransform(_, prop) {
    return prop === 'role' ? prop : 'aria-' + prop.slice(4).toLowerCase();
}
}}),
"[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/html.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
'use strict';
var types = __turbopack_require__("[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/util/types.js [app-ssr] (ecmascript)");
var create = __turbopack_require__("[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/util/create.js [app-ssr] (ecmascript)");
var caseInsensitiveTransform = __turbopack_require__("[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/util/case-insensitive-transform.js [app-ssr] (ecmascript)");
var boolean = types.boolean;
var overloadedBoolean = types.overloadedBoolean;
var booleanish = types.booleanish;
var number = types.number;
var spaceSeparated = types.spaceSeparated;
var commaSeparated = types.commaSeparated;
module.exports = create({
    space: 'html',
    attributes: {
        acceptcharset: 'accept-charset',
        classname: 'class',
        htmlfor: 'for',
        httpequiv: 'http-equiv'
    },
    transform: caseInsensitiveTransform,
    mustUseProperty: [
        'checked',
        'multiple',
        'muted',
        'selected'
    ],
    properties: {
        // Standard Properties.
        abbr: null,
        accept: commaSeparated,
        acceptCharset: spaceSeparated,
        accessKey: spaceSeparated,
        action: null,
        allow: null,
        allowFullScreen: boolean,
        allowPaymentRequest: boolean,
        allowUserMedia: boolean,
        alt: null,
        as: null,
        async: boolean,
        autoCapitalize: null,
        autoComplete: spaceSeparated,
        autoFocus: boolean,
        autoPlay: boolean,
        capture: boolean,
        charSet: null,
        checked: boolean,
        cite: null,
        className: spaceSeparated,
        cols: number,
        colSpan: null,
        content: null,
        contentEditable: booleanish,
        controls: boolean,
        controlsList: spaceSeparated,
        coords: number | commaSeparated,
        crossOrigin: null,
        data: null,
        dateTime: null,
        decoding: null,
        default: boolean,
        defer: boolean,
        dir: null,
        dirName: null,
        disabled: boolean,
        download: overloadedBoolean,
        draggable: booleanish,
        encType: null,
        enterKeyHint: null,
        form: null,
        formAction: null,
        formEncType: null,
        formMethod: null,
        formNoValidate: boolean,
        formTarget: null,
        headers: spaceSeparated,
        height: number,
        hidden: boolean,
        high: number,
        href: null,
        hrefLang: null,
        htmlFor: spaceSeparated,
        httpEquiv: spaceSeparated,
        id: null,
        imageSizes: null,
        imageSrcSet: commaSeparated,
        inputMode: null,
        integrity: null,
        is: null,
        isMap: boolean,
        itemId: null,
        itemProp: spaceSeparated,
        itemRef: spaceSeparated,
        itemScope: boolean,
        itemType: spaceSeparated,
        kind: null,
        label: null,
        lang: null,
        language: null,
        list: null,
        loading: null,
        loop: boolean,
        low: number,
        manifest: null,
        max: null,
        maxLength: number,
        media: null,
        method: null,
        min: null,
        minLength: number,
        multiple: boolean,
        muted: boolean,
        name: null,
        nonce: null,
        noModule: boolean,
        noValidate: boolean,
        onAbort: null,
        onAfterPrint: null,
        onAuxClick: null,
        onBeforePrint: null,
        onBeforeUnload: null,
        onBlur: null,
        onCancel: null,
        onCanPlay: null,
        onCanPlayThrough: null,
        onChange: null,
        onClick: null,
        onClose: null,
        onContextMenu: null,
        onCopy: null,
        onCueChange: null,
        onCut: null,
        onDblClick: null,
        onDrag: null,
        onDragEnd: null,
        onDragEnter: null,
        onDragExit: null,
        onDragLeave: null,
        onDragOver: null,
        onDragStart: null,
        onDrop: null,
        onDurationChange: null,
        onEmptied: null,
        onEnded: null,
        onError: null,
        onFocus: null,
        onFormData: null,
        onHashChange: null,
        onInput: null,
        onInvalid: null,
        onKeyDown: null,
        onKeyPress: null,
        onKeyUp: null,
        onLanguageChange: null,
        onLoad: null,
        onLoadedData: null,
        onLoadedMetadata: null,
        onLoadEnd: null,
        onLoadStart: null,
        onMessage: null,
        onMessageError: null,
        onMouseDown: null,
        onMouseEnter: null,
        onMouseLeave: null,
        onMouseMove: null,
        onMouseOut: null,
        onMouseOver: null,
        onMouseUp: null,
        onOffline: null,
        onOnline: null,
        onPageHide: null,
        onPageShow: null,
        onPaste: null,
        onPause: null,
        onPlay: null,
        onPlaying: null,
        onPopState: null,
        onProgress: null,
        onRateChange: null,
        onRejectionHandled: null,
        onReset: null,
        onResize: null,
        onScroll: null,
        onSecurityPolicyViolation: null,
        onSeeked: null,
        onSeeking: null,
        onSelect: null,
        onSlotChange: null,
        onStalled: null,
        onStorage: null,
        onSubmit: null,
        onSuspend: null,
        onTimeUpdate: null,
        onToggle: null,
        onUnhandledRejection: null,
        onUnload: null,
        onVolumeChange: null,
        onWaiting: null,
        onWheel: null,
        open: boolean,
        optimum: number,
        pattern: null,
        ping: spaceSeparated,
        placeholder: null,
        playsInline: boolean,
        poster: null,
        preload: null,
        readOnly: boolean,
        referrerPolicy: null,
        rel: spaceSeparated,
        required: boolean,
        reversed: boolean,
        rows: number,
        rowSpan: number,
        sandbox: spaceSeparated,
        scope: null,
        scoped: boolean,
        seamless: boolean,
        selected: boolean,
        shape: null,
        size: number,
        sizes: null,
        slot: null,
        span: number,
        spellCheck: booleanish,
        src: null,
        srcDoc: null,
        srcLang: null,
        srcSet: commaSeparated,
        start: number,
        step: null,
        style: null,
        tabIndex: number,
        target: null,
        title: null,
        translate: null,
        type: null,
        typeMustMatch: boolean,
        useMap: null,
        value: booleanish,
        width: number,
        wrap: null,
        // Legacy.
        // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
        align: null,
        aLink: null,
        archive: spaceSeparated,
        axis: null,
        background: null,
        bgColor: null,
        border: number,
        borderColor: null,
        bottomMargin: number,
        cellPadding: null,
        cellSpacing: null,
        char: null,
        charOff: null,
        classId: null,
        clear: null,
        code: null,
        codeBase: null,
        codeType: null,
        color: null,
        compact: boolean,
        declare: boolean,
        event: null,
        face: null,
        frame: null,
        frameBorder: null,
        hSpace: number,
        leftMargin: number,
        link: null,
        longDesc: null,
        lowSrc: null,
        marginHeight: number,
        marginWidth: number,
        noResize: boolean,
        noHref: boolean,
        noShade: boolean,
        noWrap: boolean,
        object: null,
        profile: null,
        prompt: null,
        rev: null,
        rightMargin: number,
        rules: null,
        scheme: null,
        scrolling: booleanish,
        standby: null,
        summary: null,
        text: null,
        topMargin: number,
        valueType: null,
        version: null,
        vAlign: null,
        vLink: null,
        vSpace: number,
        // Non-standard Properties.
        allowTransparency: null,
        autoCorrect: null,
        autoSave: null,
        disablePictureInPicture: boolean,
        disableRemotePlayback: boolean,
        prefix: null,
        property: null,
        results: number,
        security: null,
        unselectable: null
    }
});
}}),
"[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/html.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
'use strict';
var merge = __turbopack_require__("[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/util/merge.js [app-ssr] (ecmascript)");
var xlink = __turbopack_require__("[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/xlink.js [app-ssr] (ecmascript)");
var xml = __turbopack_require__("[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/xml.js [app-ssr] (ecmascript)");
var xmlns = __turbopack_require__("[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/xmlns.js [app-ssr] (ecmascript)");
var aria = __turbopack_require__("[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/aria.js [app-ssr] (ecmascript)");
var html = __turbopack_require__("[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/html.js [app-ssr] (ecmascript)");
module.exports = merge([
    xml,
    xlink,
    xmlns,
    aria,
    html
]);
}}),
"[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/find.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
'use strict';
var normalize = __turbopack_require__("[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/normalize.js [app-ssr] (ecmascript)");
var DefinedInfo = __turbopack_require__("[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/util/defined-info.js [app-ssr] (ecmascript)");
var Info = __turbopack_require__("[project]/node_modules/.pnpm/property-information@5.6.0/node_modules/property-information/lib/util/info.js [app-ssr] (ecmascript)");
var data = 'data';
module.exports = find;
var valid = /^data[-\w.:]+$/i;
var dash = /-[a-z]/g;
var cap = /[A-Z]/g;
function find(schema, value) {
    var normal = normalize(value);
    var prop = value;
    var Type = Info;
    if (normal in schema.normal) {
        return schema.property[schema.normal[normal]];
    }
    if (normal.length > 4 && normal.slice(0, 4) === data && valid.test(value)) {
        // Attribute or property.
        if (value.charAt(4) === '-') {
            prop = datasetToProperty(value);
        } else {
            value = datasetToAttribute(value);
        }
        Type = DefinedInfo;
    }
    return new Type(prop, value);
}
function datasetToProperty(attribute) {
    var value = attribute.slice(5).replace(dash, camelcase);
    return data + value.charAt(0).toUpperCase() + value.slice(1);
}
function datasetToAttribute(property) {
    var value = property.slice(4);
    if (dash.test(value)) {
        return property;
    }
    value = value.replace(cap, kebab);
    if (value.charAt(0) !== '-') {
        value = '-' + value;
    }
    return data + value;
}
function kebab($0) {
    return '-' + $0.toLowerCase();
}
function camelcase($0) {
    return $0.charAt(1).toUpperCase();
}
}}),
"[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/schema.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
/**
 * @typedef {import('./info.js').Info} Info
 * @typedef {Record<string, Info>} Properties
 * @typedef {Record<string, string>} Normal
 */ __turbopack_esm__({
    "Schema": (()=>Schema)
});
class Schema {
    /**
   * @constructor
   * @param {Properties} property
   * @param {Normal} normal
   * @param {string} [space]
   */ constructor(property, normal, space){
        this.property = property;
        this.normal = normal;
        if (space) {
            this.space = space;
        }
    }
}
/** @type {Properties} */ Schema.prototype.property = {};
/** @type {Normal} */ Schema.prototype.normal = {};
/** @type {string|null} */ Schema.prototype.space = null;
}}),
"[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/merge.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
/**
 * @typedef {import('./schema.js').Properties} Properties
 * @typedef {import('./schema.js').Normal} Normal
 */ __turbopack_esm__({
    "merge": (()=>merge)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/schema.js [app-ssr] (ecmascript)");
;
function merge(definitions, space) {
    /** @type {Properties} */ const property = {};
    /** @type {Normal} */ const normal = {};
    let index = -1;
    while(++index < definitions.length){
        Object.assign(property, definitions[index].property);
        Object.assign(normal, definitions[index].normal);
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Schema"](property, normal, space);
}
}}),
"[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/types.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "boolean": (()=>boolean),
    "booleanish": (()=>booleanish),
    "commaOrSpaceSeparated": (()=>commaOrSpaceSeparated),
    "commaSeparated": (()=>commaSeparated),
    "number": (()=>number),
    "overloadedBoolean": (()=>overloadedBoolean),
    "spaceSeparated": (()=>spaceSeparated)
});
let powers = 0;
const boolean = increment();
const booleanish = increment();
const overloadedBoolean = increment();
const number = increment();
const spaceSeparated = increment();
const commaSeparated = increment();
const commaOrSpaceSeparated = increment();
function increment() {
    return 2 ** ++powers;
}
}}),
"[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/info.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "Info": (()=>Info)
});
class Info {
    /**
   * @constructor
   * @param {string} property
   * @param {string} attribute
   */ constructor(property, attribute){
        /** @type {string} */ this.property = property;
        /** @type {string} */ this.attribute = attribute;
    }
}
/** @type {string|null} */ Info.prototype.space = null;
Info.prototype.boolean = false;
Info.prototype.booleanish = false;
Info.prototype.overloadedBoolean = false;
Info.prototype.number = false;
Info.prototype.commaSeparated = false;
Info.prototype.spaceSeparated = false;
Info.prototype.commaOrSpaceSeparated = false;
Info.prototype.mustUseProperty = false;
Info.prototype.defined = false;
}}),
"[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/defined-info.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "DefinedInfo": (()=>DefinedInfo)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/types.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/info.js [app-ssr] (ecmascript)");
;
;
/** @type {Array<keyof types>} */ // @ts-expect-error: hush.
const checks = Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__);
class DefinedInfo extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Info"] {
    /**
   * @constructor
   * @param {string} property
   * @param {string} attribute
   * @param {number|null} [mask]
   * @param {string} [space]
   */ constructor(property, attribute, mask, space){
        let index = -1;
        super(property, attribute);
        mark(this, 'space', space);
        if (typeof mask === 'number') {
            while(++index < checks.length){
                const check = checks[index];
                mark(this, checks[index], (mask & __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[check]) === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[check]);
            }
        }
    }
}
DefinedInfo.prototype.defined = true;
/**
 * @param {DefinedInfo} values
 * @param {string} key
 * @param {unknown} value
 */ function mark(values, key, value) {
    if (value) {
        // @ts-expect-error: assume `value` matches the expected value of `key`.
        values[key] = value;
    }
}
}}),
"[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/normalize.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
/**
 * @param {string} value
 * @returns {string}
 */ __turbopack_esm__({
    "normalize": (()=>normalize)
});
function normalize(value) {
    return value.toLowerCase();
}
}}),
"[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/create.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
/**
 * @typedef {import('./schema.js').Properties} Properties
 * @typedef {import('./schema.js').Normal} Normal
 *
 * @typedef {Record<string, string>} Attributes
 *
 * @typedef {Object} Definition
 * @property {Record<string, number|null>} properties
 * @property {(attributes: Attributes, property: string) => string} transform
 * @property {string} [space]
 * @property {Attributes} [attributes]
 * @property {Array<string>} [mustUseProperty]
 */ __turbopack_esm__({
    "create": (()=>create)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$defined$2d$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/defined-info.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$normalize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/normalize.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/schema.js [app-ssr] (ecmascript)");
;
;
;
const own = {}.hasOwnProperty;
function create(definition) {
    /** @type {Properties} */ const property = {};
    /** @type {Normal} */ const normal = {};
    /** @type {string} */ let prop;
    for(prop in definition.properties){
        if (own.call(definition.properties, prop)) {
            const value = definition.properties[prop];
            const info = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$defined$2d$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DefinedInfo"](prop, definition.transform(definition.attributes || {}, prop), value, definition.space);
            if (definition.mustUseProperty && definition.mustUseProperty.includes(prop)) {
                info.mustUseProperty = true;
            }
            property[prop] = info;
            normal[(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$normalize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalize"])(prop)] = prop;
            normal[(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$normalize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalize"])(info.attribute)] = prop;
        }
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Schema"](property, normal, definition.space);
}
}}),
"[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/xml.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "xml": (()=>xml)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$create$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/create.js [app-ssr] (ecmascript)");
;
const xml = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$create$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])({
    space: 'xml',
    transform (_, prop) {
        return 'xml:' + prop.slice(3).toLowerCase();
    },
    properties: {
        xmlLang: null,
        xmlBase: null,
        xmlSpace: null
    }
});
}}),
"[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/xlink.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "xlink": (()=>xlink)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$create$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/create.js [app-ssr] (ecmascript)");
;
const xlink = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$create$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])({
    space: 'xlink',
    transform (_, prop) {
        return 'xlink:' + prop.slice(5).toLowerCase();
    },
    properties: {
        xLinkActuate: null,
        xLinkArcRole: null,
        xLinkHref: null,
        xLinkRole: null,
        xLinkShow: null,
        xLinkTitle: null,
        xLinkType: null
    }
});
}}),
"[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/case-sensitive-transform.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
/**
 * @param {Record<string, string>} attributes
 * @param {string} attribute
 * @returns {string}
 */ __turbopack_esm__({
    "caseSensitiveTransform": (()=>caseSensitiveTransform)
});
function caseSensitiveTransform(attributes, attribute) {
    return attribute in attributes ? attributes[attribute] : attribute;
}
}}),
"[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/case-insensitive-transform.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "caseInsensitiveTransform": (()=>caseInsensitiveTransform)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$case$2d$sensitive$2d$transform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/case-sensitive-transform.js [app-ssr] (ecmascript)");
;
function caseInsensitiveTransform(attributes, property) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$case$2d$sensitive$2d$transform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["caseSensitiveTransform"])(attributes, property.toLowerCase());
}
}}),
"[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/xmlns.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "xmlns": (()=>xmlns)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$create$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/create.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$case$2d$insensitive$2d$transform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/case-insensitive-transform.js [app-ssr] (ecmascript)");
;
;
const xmlns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$create$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])({
    space: 'xmlns',
    attributes: {
        xmlnsxlink: 'xmlns:xlink'
    },
    transform: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$case$2d$insensitive$2d$transform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["caseInsensitiveTransform"],
    properties: {
        xmlns: null,
        xmlnsXLink: null
    }
});
}}),
"[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/aria.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "aria": (()=>aria)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$create$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/create.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/types.js [app-ssr] (ecmascript)");
;
;
const aria = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$create$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])({
    transform (_, prop) {
        return prop === 'role' ? prop : 'aria-' + prop.slice(4).toLowerCase();
    },
    properties: {
        ariaActiveDescendant: null,
        ariaAtomic: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["booleanish"],
        ariaAutoComplete: null,
        ariaBusy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["booleanish"],
        ariaChecked: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["booleanish"],
        ariaColCount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        ariaColIndex: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        ariaColSpan: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        ariaControls: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spaceSeparated"],
        ariaCurrent: null,
        ariaDescribedBy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spaceSeparated"],
        ariaDetails: null,
        ariaDisabled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["booleanish"],
        ariaDropEffect: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spaceSeparated"],
        ariaErrorMessage: null,
        ariaExpanded: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["booleanish"],
        ariaFlowTo: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spaceSeparated"],
        ariaGrabbed: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["booleanish"],
        ariaHasPopup: null,
        ariaHidden: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["booleanish"],
        ariaInvalid: null,
        ariaKeyShortcuts: null,
        ariaLabel: null,
        ariaLabelledBy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spaceSeparated"],
        ariaLevel: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        ariaLive: null,
        ariaModal: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["booleanish"],
        ariaMultiLine: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["booleanish"],
        ariaMultiSelectable: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["booleanish"],
        ariaOrientation: null,
        ariaOwns: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spaceSeparated"],
        ariaPlaceholder: null,
        ariaPosInSet: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        ariaPressed: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["booleanish"],
        ariaReadOnly: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["booleanish"],
        ariaRelevant: null,
        ariaRequired: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["booleanish"],
        ariaRoleDescription: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spaceSeparated"],
        ariaRowCount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        ariaRowIndex: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        ariaRowSpan: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        ariaSelected: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["booleanish"],
        ariaSetSize: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        ariaSort: null,
        ariaValueMax: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        ariaValueMin: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        ariaValueNow: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        ariaValueText: null,
        role: null
    }
});
}}),
"[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/html.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "html": (()=>html)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$create$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/create.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$case$2d$insensitive$2d$transform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/case-insensitive-transform.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/types.js [app-ssr] (ecmascript)");
;
;
;
const html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$create$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])({
    space: 'html',
    attributes: {
        acceptcharset: 'accept-charset',
        classname: 'class',
        htmlfor: 'for',
        httpequiv: 'http-equiv'
    },
    transform: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$case$2d$insensitive$2d$transform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["caseInsensitiveTransform"],
    mustUseProperty: [
        'checked',
        'multiple',
        'muted',
        'selected'
    ],
    properties: {
        // Standard Properties.
        abbr: null,
        accept: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commaSeparated"],
        acceptCharset: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spaceSeparated"],
        accessKey: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spaceSeparated"],
        action: null,
        allow: null,
        allowFullScreen: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        allowPaymentRequest: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        allowUserMedia: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        alt: null,
        as: null,
        async: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        autoCapitalize: null,
        autoComplete: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spaceSeparated"],
        autoFocus: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        autoPlay: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        blocking: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spaceSeparated"],
        capture: null,
        charSet: null,
        checked: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        cite: null,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spaceSeparated"],
        cols: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        colSpan: null,
        content: null,
        contentEditable: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["booleanish"],
        controls: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        controlsList: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spaceSeparated"],
        coords: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"] | __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commaSeparated"],
        crossOrigin: null,
        data: null,
        dateTime: null,
        decoding: null,
        default: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        defer: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        dir: null,
        dirName: null,
        disabled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        download: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["overloadedBoolean"],
        draggable: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["booleanish"],
        encType: null,
        enterKeyHint: null,
        fetchPriority: null,
        form: null,
        formAction: null,
        formEncType: null,
        formMethod: null,
        formNoValidate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        formTarget: null,
        headers: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spaceSeparated"],
        height: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        hidden: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        high: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        href: null,
        hrefLang: null,
        htmlFor: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spaceSeparated"],
        httpEquiv: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spaceSeparated"],
        id: null,
        imageSizes: null,
        imageSrcSet: null,
        inert: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        inputMode: null,
        integrity: null,
        is: null,
        isMap: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        itemId: null,
        itemProp: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spaceSeparated"],
        itemRef: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spaceSeparated"],
        itemScope: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        itemType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spaceSeparated"],
        kind: null,
        label: null,
        lang: null,
        language: null,
        list: null,
        loading: null,
        loop: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        low: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        manifest: null,
        max: null,
        maxLength: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        media: null,
        method: null,
        min: null,
        minLength: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        multiple: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        muted: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        name: null,
        nonce: null,
        noModule: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        noValidate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        onAbort: null,
        onAfterPrint: null,
        onAuxClick: null,
        onBeforeMatch: null,
        onBeforePrint: null,
        onBeforeToggle: null,
        onBeforeUnload: null,
        onBlur: null,
        onCancel: null,
        onCanPlay: null,
        onCanPlayThrough: null,
        onChange: null,
        onClick: null,
        onClose: null,
        onContextLost: null,
        onContextMenu: null,
        onContextRestored: null,
        onCopy: null,
        onCueChange: null,
        onCut: null,
        onDblClick: null,
        onDrag: null,
        onDragEnd: null,
        onDragEnter: null,
        onDragExit: null,
        onDragLeave: null,
        onDragOver: null,
        onDragStart: null,
        onDrop: null,
        onDurationChange: null,
        onEmptied: null,
        onEnded: null,
        onError: null,
        onFocus: null,
        onFormData: null,
        onHashChange: null,
        onInput: null,
        onInvalid: null,
        onKeyDown: null,
        onKeyPress: null,
        onKeyUp: null,
        onLanguageChange: null,
        onLoad: null,
        onLoadedData: null,
        onLoadedMetadata: null,
        onLoadEnd: null,
        onLoadStart: null,
        onMessage: null,
        onMessageError: null,
        onMouseDown: null,
        onMouseEnter: null,
        onMouseLeave: null,
        onMouseMove: null,
        onMouseOut: null,
        onMouseOver: null,
        onMouseUp: null,
        onOffline: null,
        onOnline: null,
        onPageHide: null,
        onPageShow: null,
        onPaste: null,
        onPause: null,
        onPlay: null,
        onPlaying: null,
        onPopState: null,
        onProgress: null,
        onRateChange: null,
        onRejectionHandled: null,
        onReset: null,
        onResize: null,
        onScroll: null,
        onScrollEnd: null,
        onSecurityPolicyViolation: null,
        onSeeked: null,
        onSeeking: null,
        onSelect: null,
        onSlotChange: null,
        onStalled: null,
        onStorage: null,
        onSubmit: null,
        onSuspend: null,
        onTimeUpdate: null,
        onToggle: null,
        onUnhandledRejection: null,
        onUnload: null,
        onVolumeChange: null,
        onWaiting: null,
        onWheel: null,
        open: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        optimum: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        pattern: null,
        ping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spaceSeparated"],
        placeholder: null,
        playsInline: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        popover: null,
        popoverTarget: null,
        popoverTargetAction: null,
        poster: null,
        preload: null,
        readOnly: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        referrerPolicy: null,
        rel: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spaceSeparated"],
        required: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        reversed: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        rows: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        rowSpan: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        sandbox: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spaceSeparated"],
        scope: null,
        scoped: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        seamless: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        selected: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        shadowRootClonable: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        shadowRootDelegatesFocus: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        shadowRootMode: null,
        shape: null,
        size: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        sizes: null,
        slot: null,
        span: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        spellCheck: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["booleanish"],
        src: null,
        srcDoc: null,
        srcLang: null,
        srcSet: null,
        start: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        step: null,
        style: null,
        tabIndex: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        target: null,
        title: null,
        translate: null,
        type: null,
        typeMustMatch: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        useMap: null,
        value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["booleanish"],
        width: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        wrap: null,
        writingSuggestions: null,
        // Legacy.
        // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
        align: null,
        aLink: null,
        archive: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spaceSeparated"],
        axis: null,
        background: null,
        bgColor: null,
        border: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        borderColor: null,
        bottomMargin: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        cellPadding: null,
        cellSpacing: null,
        char: null,
        charOff: null,
        classId: null,
        clear: null,
        code: null,
        codeBase: null,
        codeType: null,
        color: null,
        compact: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        declare: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        event: null,
        face: null,
        frame: null,
        frameBorder: null,
        hSpace: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        leftMargin: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        link: null,
        longDesc: null,
        lowSrc: null,
        marginHeight: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        marginWidth: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        noResize: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        noHref: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        noShade: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        noWrap: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        object: null,
        profile: null,
        prompt: null,
        rev: null,
        rightMargin: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        rules: null,
        scheme: null,
        scrolling: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["booleanish"],
        standby: null,
        summary: null,
        text: null,
        topMargin: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        valueType: null,
        version: null,
        vAlign: null,
        vLink: null,
        vSpace: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        // Non-standard Properties.
        allowTransparency: null,
        autoCorrect: null,
        autoSave: null,
        disablePictureInPicture: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        disableRemotePlayback: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        prefix: null,
        property: null,
        results: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        security: null,
        unselectable: null
    }
});
}}),
"[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/svg.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "svg": (()=>svg)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$create$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/create.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$case$2d$sensitive$2d$transform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/case-sensitive-transform.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/types.js [app-ssr] (ecmascript)");
;
;
;
const svg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$create$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])({
    space: 'svg',
    attributes: {
        accentHeight: 'accent-height',
        alignmentBaseline: 'alignment-baseline',
        arabicForm: 'arabic-form',
        baselineShift: 'baseline-shift',
        capHeight: 'cap-height',
        className: 'class',
        clipPath: 'clip-path',
        clipRule: 'clip-rule',
        colorInterpolation: 'color-interpolation',
        colorInterpolationFilters: 'color-interpolation-filters',
        colorProfile: 'color-profile',
        colorRendering: 'color-rendering',
        crossOrigin: 'crossorigin',
        dataType: 'datatype',
        dominantBaseline: 'dominant-baseline',
        enableBackground: 'enable-background',
        fillOpacity: 'fill-opacity',
        fillRule: 'fill-rule',
        floodColor: 'flood-color',
        floodOpacity: 'flood-opacity',
        fontFamily: 'font-family',
        fontSize: 'font-size',
        fontSizeAdjust: 'font-size-adjust',
        fontStretch: 'font-stretch',
        fontStyle: 'font-style',
        fontVariant: 'font-variant',
        fontWeight: 'font-weight',
        glyphName: 'glyph-name',
        glyphOrientationHorizontal: 'glyph-orientation-horizontal',
        glyphOrientationVertical: 'glyph-orientation-vertical',
        hrefLang: 'hreflang',
        horizAdvX: 'horiz-adv-x',
        horizOriginX: 'horiz-origin-x',
        horizOriginY: 'horiz-origin-y',
        imageRendering: 'image-rendering',
        letterSpacing: 'letter-spacing',
        lightingColor: 'lighting-color',
        markerEnd: 'marker-end',
        markerMid: 'marker-mid',
        markerStart: 'marker-start',
        navDown: 'nav-down',
        navDownLeft: 'nav-down-left',
        navDownRight: 'nav-down-right',
        navLeft: 'nav-left',
        navNext: 'nav-next',
        navPrev: 'nav-prev',
        navRight: 'nav-right',
        navUp: 'nav-up',
        navUpLeft: 'nav-up-left',
        navUpRight: 'nav-up-right',
        onAbort: 'onabort',
        onActivate: 'onactivate',
        onAfterPrint: 'onafterprint',
        onBeforePrint: 'onbeforeprint',
        onBegin: 'onbegin',
        onCancel: 'oncancel',
        onCanPlay: 'oncanplay',
        onCanPlayThrough: 'oncanplaythrough',
        onChange: 'onchange',
        onClick: 'onclick',
        onClose: 'onclose',
        onCopy: 'oncopy',
        onCueChange: 'oncuechange',
        onCut: 'oncut',
        onDblClick: 'ondblclick',
        onDrag: 'ondrag',
        onDragEnd: 'ondragend',
        onDragEnter: 'ondragenter',
        onDragExit: 'ondragexit',
        onDragLeave: 'ondragleave',
        onDragOver: 'ondragover',
        onDragStart: 'ondragstart',
        onDrop: 'ondrop',
        onDurationChange: 'ondurationchange',
        onEmptied: 'onemptied',
        onEnd: 'onend',
        onEnded: 'onended',
        onError: 'onerror',
        onFocus: 'onfocus',
        onFocusIn: 'onfocusin',
        onFocusOut: 'onfocusout',
        onHashChange: 'onhashchange',
        onInput: 'oninput',
        onInvalid: 'oninvalid',
        onKeyDown: 'onkeydown',
        onKeyPress: 'onkeypress',
        onKeyUp: 'onkeyup',
        onLoad: 'onload',
        onLoadedData: 'onloadeddata',
        onLoadedMetadata: 'onloadedmetadata',
        onLoadStart: 'onloadstart',
        onMessage: 'onmessage',
        onMouseDown: 'onmousedown',
        onMouseEnter: 'onmouseenter',
        onMouseLeave: 'onmouseleave',
        onMouseMove: 'onmousemove',
        onMouseOut: 'onmouseout',
        onMouseOver: 'onmouseover',
        onMouseUp: 'onmouseup',
        onMouseWheel: 'onmousewheel',
        onOffline: 'onoffline',
        onOnline: 'ononline',
        onPageHide: 'onpagehide',
        onPageShow: 'onpageshow',
        onPaste: 'onpaste',
        onPause: 'onpause',
        onPlay: 'onplay',
        onPlaying: 'onplaying',
        onPopState: 'onpopstate',
        onProgress: 'onprogress',
        onRateChange: 'onratechange',
        onRepeat: 'onrepeat',
        onReset: 'onreset',
        onResize: 'onresize',
        onScroll: 'onscroll',
        onSeeked: 'onseeked',
        onSeeking: 'onseeking',
        onSelect: 'onselect',
        onShow: 'onshow',
        onStalled: 'onstalled',
        onStorage: 'onstorage',
        onSubmit: 'onsubmit',
        onSuspend: 'onsuspend',
        onTimeUpdate: 'ontimeupdate',
        onToggle: 'ontoggle',
        onUnload: 'onunload',
        onVolumeChange: 'onvolumechange',
        onWaiting: 'onwaiting',
        onZoom: 'onzoom',
        overlinePosition: 'overline-position',
        overlineThickness: 'overline-thickness',
        paintOrder: 'paint-order',
        panose1: 'panose-1',
        pointerEvents: 'pointer-events',
        referrerPolicy: 'referrerpolicy',
        renderingIntent: 'rendering-intent',
        shapeRendering: 'shape-rendering',
        stopColor: 'stop-color',
        stopOpacity: 'stop-opacity',
        strikethroughPosition: 'strikethrough-position',
        strikethroughThickness: 'strikethrough-thickness',
        strokeDashArray: 'stroke-dasharray',
        strokeDashOffset: 'stroke-dashoffset',
        strokeLineCap: 'stroke-linecap',
        strokeLineJoin: 'stroke-linejoin',
        strokeMiterLimit: 'stroke-miterlimit',
        strokeOpacity: 'stroke-opacity',
        strokeWidth: 'stroke-width',
        tabIndex: 'tabindex',
        textAnchor: 'text-anchor',
        textDecoration: 'text-decoration',
        textRendering: 'text-rendering',
        transformOrigin: 'transform-origin',
        typeOf: 'typeof',
        underlinePosition: 'underline-position',
        underlineThickness: 'underline-thickness',
        unicodeBidi: 'unicode-bidi',
        unicodeRange: 'unicode-range',
        unitsPerEm: 'units-per-em',
        vAlphabetic: 'v-alphabetic',
        vHanging: 'v-hanging',
        vIdeographic: 'v-ideographic',
        vMathematical: 'v-mathematical',
        vectorEffect: 'vector-effect',
        vertAdvY: 'vert-adv-y',
        vertOriginX: 'vert-origin-x',
        vertOriginY: 'vert-origin-y',
        wordSpacing: 'word-spacing',
        writingMode: 'writing-mode',
        xHeight: 'x-height',
        // These were camelcased in Tiny. Now lowercased in SVG 2
        playbackOrder: 'playbackorder',
        timelineBegin: 'timelinebegin'
    },
    transform: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$case$2d$sensitive$2d$transform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["caseSensitiveTransform"],
    properties: {
        about: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commaOrSpaceSeparated"],
        accentHeight: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        accumulate: null,
        additive: null,
        alignmentBaseline: null,
        alphabetic: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        amplitude: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        arabicForm: null,
        ascent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        attributeName: null,
        attributeType: null,
        azimuth: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        bandwidth: null,
        baselineShift: null,
        baseFrequency: null,
        baseProfile: null,
        bbox: null,
        begin: null,
        bias: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        by: null,
        calcMode: null,
        capHeight: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spaceSeparated"],
        clip: null,
        clipPath: null,
        clipPathUnits: null,
        clipRule: null,
        color: null,
        colorInterpolation: null,
        colorInterpolationFilters: null,
        colorProfile: null,
        colorRendering: null,
        content: null,
        contentScriptType: null,
        contentStyleType: null,
        crossOrigin: null,
        cursor: null,
        cx: null,
        cy: null,
        d: null,
        dataType: null,
        defaultAction: null,
        descent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        diffuseConstant: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        direction: null,
        display: null,
        dur: null,
        divisor: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        dominantBaseline: null,
        download: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
        dx: null,
        dy: null,
        edgeMode: null,
        editable: null,
        elevation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        enableBackground: null,
        end: null,
        event: null,
        exponent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        externalResourcesRequired: null,
        fill: null,
        fillOpacity: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        fillRule: null,
        filter: null,
        filterRes: null,
        filterUnits: null,
        floodColor: null,
        floodOpacity: null,
        focusable: null,
        focusHighlight: null,
        fontFamily: null,
        fontSize: null,
        fontSizeAdjust: null,
        fontStretch: null,
        fontStyle: null,
        fontVariant: null,
        fontWeight: null,
        format: null,
        fr: null,
        from: null,
        fx: null,
        fy: null,
        g1: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commaSeparated"],
        g2: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commaSeparated"],
        glyphName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commaSeparated"],
        glyphOrientationHorizontal: null,
        glyphOrientationVertical: null,
        glyphRef: null,
        gradientTransform: null,
        gradientUnits: null,
        handler: null,
        hanging: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        hatchContentUnits: null,
        hatchUnits: null,
        height: null,
        href: null,
        hrefLang: null,
        horizAdvX: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        horizOriginX: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        horizOriginY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        id: null,
        ideographic: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        imageRendering: null,
        initialVisibility: null,
        in: null,
        in2: null,
        intercept: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        k: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        k1: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        k2: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        k3: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        k4: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        kernelMatrix: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commaOrSpaceSeparated"],
        kernelUnitLength: null,
        keyPoints: null,
        keySplines: null,
        keyTimes: null,
        kerning: null,
        lang: null,
        lengthAdjust: null,
        letterSpacing: null,
        lightingColor: null,
        limitingConeAngle: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        local: null,
        markerEnd: null,
        markerMid: null,
        markerStart: null,
        markerHeight: null,
        markerUnits: null,
        markerWidth: null,
        mask: null,
        maskContentUnits: null,
        maskUnits: null,
        mathematical: null,
        max: null,
        media: null,
        mediaCharacterEncoding: null,
        mediaContentEncodings: null,
        mediaSize: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        mediaTime: null,
        method: null,
        min: null,
        mode: null,
        name: null,
        navDown: null,
        navDownLeft: null,
        navDownRight: null,
        navLeft: null,
        navNext: null,
        navPrev: null,
        navRight: null,
        navUp: null,
        navUpLeft: null,
        navUpRight: null,
        numOctaves: null,
        observer: null,
        offset: null,
        onAbort: null,
        onActivate: null,
        onAfterPrint: null,
        onBeforePrint: null,
        onBegin: null,
        onCancel: null,
        onCanPlay: null,
        onCanPlayThrough: null,
        onChange: null,
        onClick: null,
        onClose: null,
        onCopy: null,
        onCueChange: null,
        onCut: null,
        onDblClick: null,
        onDrag: null,
        onDragEnd: null,
        onDragEnter: null,
        onDragExit: null,
        onDragLeave: null,
        onDragOver: null,
        onDragStart: null,
        onDrop: null,
        onDurationChange: null,
        onEmptied: null,
        onEnd: null,
        onEnded: null,
        onError: null,
        onFocus: null,
        onFocusIn: null,
        onFocusOut: null,
        onHashChange: null,
        onInput: null,
        onInvalid: null,
        onKeyDown: null,
        onKeyPress: null,
        onKeyUp: null,
        onLoad: null,
        onLoadedData: null,
        onLoadedMetadata: null,
        onLoadStart: null,
        onMessage: null,
        onMouseDown: null,
        onMouseEnter: null,
        onMouseLeave: null,
        onMouseMove: null,
        onMouseOut: null,
        onMouseOver: null,
        onMouseUp: null,
        onMouseWheel: null,
        onOffline: null,
        onOnline: null,
        onPageHide: null,
        onPageShow: null,
        onPaste: null,
        onPause: null,
        onPlay: null,
        onPlaying: null,
        onPopState: null,
        onProgress: null,
        onRateChange: null,
        onRepeat: null,
        onReset: null,
        onResize: null,
        onScroll: null,
        onSeeked: null,
        onSeeking: null,
        onSelect: null,
        onShow: null,
        onStalled: null,
        onStorage: null,
        onSubmit: null,
        onSuspend: null,
        onTimeUpdate: null,
        onToggle: null,
        onUnload: null,
        onVolumeChange: null,
        onWaiting: null,
        onZoom: null,
        opacity: null,
        operator: null,
        order: null,
        orient: null,
        orientation: null,
        origin: null,
        overflow: null,
        overlay: null,
        overlinePosition: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        overlineThickness: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        paintOrder: null,
        panose1: null,
        path: null,
        pathLength: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        patternContentUnits: null,
        patternTransform: null,
        patternUnits: null,
        phase: null,
        ping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spaceSeparated"],
        pitch: null,
        playbackOrder: null,
        pointerEvents: null,
        points: null,
        pointsAtX: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        pointsAtY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        pointsAtZ: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        preserveAlpha: null,
        preserveAspectRatio: null,
        primitiveUnits: null,
        propagate: null,
        property: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commaOrSpaceSeparated"],
        r: null,
        radius: null,
        referrerPolicy: null,
        refX: null,
        refY: null,
        rel: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commaOrSpaceSeparated"],
        rev: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commaOrSpaceSeparated"],
        renderingIntent: null,
        repeatCount: null,
        repeatDur: null,
        requiredExtensions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commaOrSpaceSeparated"],
        requiredFeatures: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commaOrSpaceSeparated"],
        requiredFonts: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commaOrSpaceSeparated"],
        requiredFormats: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commaOrSpaceSeparated"],
        resource: null,
        restart: null,
        result: null,
        rotate: null,
        rx: null,
        ry: null,
        scale: null,
        seed: null,
        shapeRendering: null,
        side: null,
        slope: null,
        snapshotTime: null,
        specularConstant: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        specularExponent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        spreadMethod: null,
        spacing: null,
        startOffset: null,
        stdDeviation: null,
        stemh: null,
        stemv: null,
        stitchTiles: null,
        stopColor: null,
        stopOpacity: null,
        strikethroughPosition: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        strikethroughThickness: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        string: null,
        stroke: null,
        strokeDashArray: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commaOrSpaceSeparated"],
        strokeDashOffset: null,
        strokeLineCap: null,
        strokeLineJoin: null,
        strokeMiterLimit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        strokeOpacity: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        strokeWidth: null,
        style: null,
        surfaceScale: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        syncBehavior: null,
        syncBehaviorDefault: null,
        syncMaster: null,
        syncTolerance: null,
        syncToleranceDefault: null,
        systemLanguage: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commaOrSpaceSeparated"],
        tabIndex: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        tableValues: null,
        target: null,
        targetX: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        targetY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        textAnchor: null,
        textDecoration: null,
        textRendering: null,
        textLength: null,
        timelineBegin: null,
        title: null,
        transformBehavior: null,
        type: null,
        typeOf: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commaOrSpaceSeparated"],
        to: null,
        transform: null,
        transformOrigin: null,
        u1: null,
        u2: null,
        underlinePosition: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        underlineThickness: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        unicode: null,
        unicodeBidi: null,
        unicodeRange: null,
        unitsPerEm: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        values: null,
        vAlphabetic: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        vMathematical: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        vectorEffect: null,
        vHanging: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        vIdeographic: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        version: null,
        vertAdvY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        vertOriginX: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        vertOriginY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        viewBox: null,
        viewTarget: null,
        visibility: null,
        width: null,
        widths: null,
        wordSpacing: null,
        writingMode: null,
        x: null,
        x1: null,
        x2: null,
        xChannelSelector: null,
        xHeight: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
        y: null,
        y1: null,
        y2: null,
        yChannelSelector: null,
        z: null,
        zoomAndPan: null
    }
});
}}),
"[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/index.js [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
/**
 * @typedef {import('./lib/util/info.js').Info} Info
 * @typedef {import('./lib/util/schema.js').Schema} Schema
 */ __turbopack_esm__({
    "html": (()=>html),
    "svg": (()=>svg)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$merge$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/merge.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$xml$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/xml.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$xlink$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/xlink.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$xmlns$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/xmlns.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$aria$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/aria.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$html$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/html.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/svg.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
const html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$merge$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["merge"])([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$xml$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["xml"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$xlink$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["xlink"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$xmlns$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["xmlns"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$aria$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["aria"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$html$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["html"]
], 'html');
const svg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$merge$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["merge"])([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$xml$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["xml"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$xlink$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["xlink"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$xmlns$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["xmlns"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$aria$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["aria"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["svg"]
], 'svg');
}}),
"[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/find.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
/**
 * @typedef {import('./util/schema.js').Schema} Schema
 */ __turbopack_esm__({
    "find": (()=>find)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$normalize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/normalize.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/info.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$defined$2d$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/util/defined-info.js [app-ssr] (ecmascript)");
;
;
;
const valid = /^data[-\w.:]+$/i;
const dash = /-[a-z]/g;
const cap = /[A-Z]/g;
function find(schema, value) {
    const normal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$normalize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalize"])(value);
    let prop = value;
    let Type = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Info"];
    if (normal in schema.normal) {
        return schema.property[schema.normal[normal]];
    }
    if (normal.length > 4 && normal.slice(0, 4) === 'data' && valid.test(value)) {
        // Attribute or property.
        if (value.charAt(4) === '-') {
            // Turn it into a property.
            const rest = value.slice(5).replace(dash, camelcase);
            prop = 'data' + rest.charAt(0).toUpperCase() + rest.slice(1);
        } else {
            // Turn it into an attribute.
            const rest = value.slice(4);
            if (!dash.test(rest)) {
                let dashes = rest.replace(cap, kebab);
                if (dashes.charAt(0) !== '-') {
                    dashes = '-' + dashes;
                }
                value = 'data' + dashes;
            }
        }
        Type = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$property$2d$information$40$6$2e$5$2e$0$2f$node_modules$2f$property$2d$information$2f$lib$2f$util$2f$defined$2d$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DefinedInfo"];
    }
    return new Type(prop, value);
}
/**
 * @param {string} $0
 * @returns {string}
 */ function kebab($0) {
    return '-' + $0.toLowerCase();
}
/**
 * @param {string} $0
 * @returns {string}
 */ function camelcase($0) {
    return $0.charAt(1).toUpperCase();
}
}}),
"[project]/node_modules/.pnpm/property-information@6.5.0/node_modules/property-information/lib/hast-to-react.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
/**
 * `hast` is close to `React`, but differs in a couple of cases.
 *
 * To get a React property from a hast property, check if it is in
 * `hastToReact`, if it is, then use the corresponding value,
 * otherwise, use the hast property.
 *
 * @type {Record<string, string>}
 */ __turbopack_esm__({
    "hastToReact": (()=>hastToReact)
});
const hastToReact = {
    classId: 'classID',
    dataType: 'datatype',
    itemId: 'itemID',
    strokeDashArray: 'strokeDasharray',
    strokeDashOffset: 'strokeDashoffset',
    strokeLineCap: 'strokeLinecap',
    strokeLineJoin: 'strokeLinejoin',
    strokeMiterLimit: 'strokeMiterlimit',
    typeOf: 'typeof',
    xLinkActuate: 'xlinkActuate',
    xLinkArcRole: 'xlinkArcrole',
    xLinkHref: 'xlinkHref',
    xLinkRole: 'xlinkRole',
    xLinkShow: 'xlinkShow',
    xLinkTitle: 'xlinkTitle',
    xLinkType: 'xlinkType',
    xmlnsXLink: 'xmlnsXlink'
};
}}),

};

//# sourceMappingURL=08b5e__pnpm_2f1af2._.js.map