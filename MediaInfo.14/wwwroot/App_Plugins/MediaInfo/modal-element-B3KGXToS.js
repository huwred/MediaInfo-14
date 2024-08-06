import { html as P, state as F, customElement as G } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as K } from "@umbraco-cms/backoffice/modal";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x = globalThis, T = x.trustedTypes, R = T ? T.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, k = "$lit$", _ = `lit$${(Math.random() + "").slice(9)}$`, V = "?" + _, Q = `<${V}>`, m = document, C = () => m.createComment(""), b = (n) => n === null || typeof n != "object" && typeof n != "function", J = Array.isArray, X = (n) => J(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", S = `[ 	
\f\r]`, y = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, L = /-->/g, B = />/g, A = RegExp(`>|${S}(?:([^\\s"'>=/]+)(${S}*=${S}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), D = /'/g, j = /"/g, z = /^(?:script|style|textarea|title)$/i, g = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), W = /* @__PURE__ */ new WeakMap(), f = m.createTreeWalker(m, 129);
function Y(n, t) {
  if (!Array.isArray(n) || !n.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return R !== void 0 ? R.createHTML(t) : t;
}
const tt = (n, t) => {
  const e = n.length - 1, i = [];
  let s, h = t === 2 ? "<svg>" : "", r = y;
  for (let $ = 0; $ < e; $++) {
    const o = n[$];
    let a, d, l = -1, u = 0;
    for (; u < o.length && (r.lastIndex = u, d = r.exec(o), d !== null); )
      u = r.lastIndex, r === y ? d[1] === "!--" ? r = L : d[1] !== void 0 ? r = B : d[2] !== void 0 ? (z.test(d[2]) && (s = RegExp("</" + d[2], "g")), r = A) : d[3] !== void 0 && (r = A) : r === A ? d[0] === ">" ? (r = s ?? y, l = -1) : d[1] === void 0 ? l = -2 : (l = r.lastIndex - d[2].length, a = d[1], r = d[3] === void 0 ? A : d[3] === '"' ? j : D) : r === j || r === D ? r = A : r === L || r === B ? r = y : (r = A, s = void 0);
    const p = r === A && n[$ + 1].startsWith("/>") ? " " : "";
    h += r === y ? o + Q : l >= 0 ? (i.push(a), o.slice(0, l) + k + o.slice(l) + _ + p) : o + _ + (l === -2 ? $ : p);
  }
  return [Y(n, h + (n[e] || "<?>") + (t === 2 ? "</svg>" : "")), i];
};
class H {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let h = 0, r = 0;
    const $ = t.length - 1, o = this.parts, [a, d] = tt(t, e);
    if (this.el = H.createElement(a, i), f.currentNode = this.el.content, e === 2) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (s = f.nextNode()) !== null && o.length < $; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes())
          for (const l of s.getAttributeNames())
            if (l.endsWith(k)) {
              const u = d[r++], p = s.getAttribute(l).split(_), N = /([.?@])?(.*)/.exec(u);
              o.push({ type: 1, index: h, name: N[2], strings: p, ctor: N[1] === "." ? st : N[1] === "?" ? it : N[1] === "@" ? nt : w }), s.removeAttribute(l);
            } else
              l.startsWith(_) && (o.push({ type: 6, index: h }), s.removeAttribute(l));
        if (z.test(s.tagName)) {
          const l = s.textContent.split(_), u = l.length - 1;
          if (u > 0) {
            s.textContent = T ? T.emptyScript : "";
            for (let p = 0; p < u; p++)
              s.append(l[p], C()), f.nextNode(), o.push({ type: 2, index: ++h });
            s.append(l[u], C());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === V)
          o.push({ type: 2, index: h });
        else {
          let l = -1;
          for (; (l = s.data.indexOf(_, l + 1)) !== -1; )
            o.push({ type: 7, index: h }), l += _.length - 1;
        }
      h++;
    }
  }
  static createElement(t, e) {
    const i = m.createElement("template");
    return i.innerHTML = t, i;
  }
}
function v(n, t, e = n, i) {
  var r, $;
  if (t === g)
    return t;
  let s = i !== void 0 ? (r = e._$Co) == null ? void 0 : r[i] : e._$Cl;
  const h = b(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== h && (($ = s == null ? void 0 : s._$AO) == null || $.call(s, !1), h === void 0 ? s = void 0 : (s = new h(n), s._$AT(n, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = v(n, s._$AS(n, t.values), s, i)), t;
}
class et {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? m).importNode(e, !0);
    f.currentNode = s;
    let h = f.nextNode(), r = 0, $ = 0, o = i[0];
    for (; o !== void 0; ) {
      if (r === o.index) {
        let a;
        o.type === 2 ? a = new M(h, h.nextSibling, this, t) : o.type === 1 ? a = new o.ctor(h, o.name, o.strings, this, t) : o.type === 6 && (a = new rt(h, this, t)), this._$AV.push(a), o = i[++$];
      }
      r !== (o == null ? void 0 : o.index) && (h = f.nextNode(), r++);
    }
    return f.currentNode = m, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class M {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = v(this, t, e), b(t) ? t === c || t == null || t === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : t !== this._$AH && t !== g && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : X(t) ? this.k(t) : this._(t);
  }
  S(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
  }
  _(t) {
    this._$AH !== c && b(this._$AH) ? this._$AA.nextSibling.data = t : this.T(m.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var h;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = H.createElement(Y(i.h, i.h[0]), this.options)), i);
    if (((h = this._$AH) == null ? void 0 : h._$AD) === s)
      this._$AH.p(e);
    else {
      const r = new et(s, this), $ = r.u(this.options);
      r.p(e), this.T($), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = W.get(t.strings);
    return e === void 0 && W.set(t.strings, e = new H(t)), e;
  }
  k(t) {
    J(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const h of t)
      s === e.length ? e.push(i = new M(this.S(C()), this.S(C()), this, this.options)) : i = e[s], i._$AI(h), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class w {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, h) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = h, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = c;
  }
  _$AI(t, e = this, i, s) {
    const h = this.strings;
    let r = !1;
    if (h === void 0)
      t = v(this, t, e, 0), r = !b(t) || t !== this._$AH && t !== g, r && (this._$AH = t);
    else {
      const $ = t;
      let o, a;
      for (t = h[0], o = 0; o < h.length - 1; o++)
        a = v(this, $[i + o], e, o), a === g && (a = this._$AH[o]), r || (r = !b(a) || a !== this._$AH[o]), a === c ? t = c : t !== c && (t += (a ?? "") + h[o + 1]), this._$AH[o] = a;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class st extends w {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === c ? void 0 : t;
  }
}
class it extends w {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== c);
  }
}
class nt extends w {
  constructor(t, e, i, s, h) {
    super(t, e, i, s, h), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = v(this, t, e, 0) ?? c) === g)
      return;
    const i = this._$AH, s = t === c && i !== c || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, h = t !== c && (i === c || s);
    s && this.element.removeEventListener(this.name, this, i), h && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class rt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    v(this, t);
  }
}
const I = x.litHtmlPolyfillSupport;
I == null || I(H, M), (x.litHtmlVersions ?? (x.litHtmlVersions = [])).push("3.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, ht = (n) => (...t) => ({ _$litDirective$: n, values: t });
class lt {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, i) {
    this._$Ct = t, this._$AM = e, this._$Ci = i;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class O extends lt {
  constructor(t) {
    if (super(t), this.it = c, t.type !== ot.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === c || t == null)
      return this._t = void 0, this.it = t;
    if (t === g)
      return t;
    if (typeof t != "string")
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it)
      return this._t;
    this.it = t;
    const e = [t];
    return e.raw = e, this._t = { _$litType$: this.constructor.resultType, strings: e, values: [] };
  }
}
O.directiveName = "unsafeHTML", O.resultType = 1;
const at = ht(O);
var ct = Object.defineProperty, $t = Object.getOwnPropertyDescriptor, Z = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? $t(t, e) : t, h = n.length - 1, r; h >= 0; h--)
    (r = n[h]) && (s = (i ? r(t, e, s) : r(s)) || s);
  return i && s && ct(t, e, s), s;
}, dt = (n, t, e) => {
  if (!t.has(n))
    throw TypeError("Cannot " + e);
}, ut = (n, t, e) => {
  if (t.has(n))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(n) : t.set(n, e);
}, pt = (n, t, e) => (dt(n, t, "access private method"), e), U, q;
let E = class extends K {
  constructor() {
    super(), ut(this, U), this.content = "";
  }
  connectedCallback() {
    super.connectedCallback();
  }
  render() {
    var n, t;
    return P`
            <umb-body-layout headline=${((n = this.data) == null ? void 0 : n.headline) ?? "Custom dialog"}>
                <uui-box>
                    <uui-scroll-container> ${this.parseJson((t = this.data) == null ? void 0 : t.content)}</uui-scroll-container>
                </uui-box>
                <div slot="actions">
                    <uui-button id="cancel" label="Close" @click="${pt(this, U, q)}">Close</uui-button>
                </div>
            </umb-body-layout>`;
  }
  parseJson(n) {
    const e = JSON.parse(n).Metadata.Directory, i = [];
    e.forEach((r) => {
      Object.entries(r).forEach(([$, o]) => {
        $ === "Tag" ? Array.isArray(o) ? Object.entries(o).forEach(([a, d]) => {
          a !== null && i.push(`<li><span style="width:30%;display:inline-block;">${d["@Name"]}</span><span style="width:65%">${d["#text"]}</span></li>`);
        }) : i.push(`<li><span style="width:30%;display:inline-block;">${o["@Name"]}</span><span style="width:65%">${o["#text"]}</span></li>`) : $ === "@Name" && i.push(`<ul style="list-style-type: none;"><uui-label>${o}</uui-label>`);
      }), i.push("</ul>");
    });
    let s = /\,/gi, h = i.toString().replace(s, "");
    return P`${at(h)}`;
  }
};
U = /* @__PURE__ */ new WeakSet();
q = function() {
  var n;
  (n = this.modalContext) == null || n.reject();
};
Z([
  F()
], E.prototype, "content", 2);
E = Z([
  G("mediainfo-custom-modal")
], E);
const ft = E;
export {
  E as MediaInfoCustomModalElement,
  ft as default
};
//# sourceMappingURL=modal-element-B3KGXToS.js.map
