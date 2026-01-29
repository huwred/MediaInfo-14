import { html as D, state as K, customElement as Q } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as X } from "@umbraco-cms/backoffice/modal";
const O = globalThis, P = (n) => n, C = O.trustedTypes, j = C ? C.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, V = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, z = "?" + _, Y = `<${z}>`, m = document, N = () => m.createComment(""), x = (n) => n === null || typeof n != "object" && typeof n != "function", U = Array.isArray, tt = (n) => U(n) || typeof n?.[Symbol.iterator] == "function", E = `[ 	
\f\r]`, y = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, L = /-->/g, B = />/g, A = RegExp(`>|${E}(?:([^\\s"'>=/]+)(${E}*=${E}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), R = /'/g, W = /"/g, J = /^(?:script|style|textarea|title)$/i, v = /* @__PURE__ */ Symbol.for("lit-noChange"), c = /* @__PURE__ */ Symbol.for("lit-nothing"), k = /* @__PURE__ */ new WeakMap(), f = m.createTreeWalker(m, 129);
function Z(n, t) {
  if (!U(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return j !== void 0 ? j.createHTML(t) : t;
}
const et = (n, t) => {
  const e = n.length - 1, s = [];
  let i, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", h = y;
  for (let d = 0; d < e; d++) {
    const r = n[d];
    let a, $, l = -1, u = 0;
    for (; u < r.length && (h.lastIndex = u, $ = h.exec(r), $ !== null); ) u = h.lastIndex, h === y ? $[1] === "!--" ? h = L : $[1] !== void 0 ? h = B : $[2] !== void 0 ? (J.test($[2]) && (i = RegExp("</" + $[2], "g")), h = A) : $[3] !== void 0 && (h = A) : h === A ? $[0] === ">" ? (h = i ?? y, l = -1) : $[1] === void 0 ? l = -2 : (l = h.lastIndex - $[2].length, a = $[1], h = $[3] === void 0 ? A : $[3] === '"' ? W : R) : h === W || h === R ? h = A : h === L || h === B ? h = y : (h = A, i = void 0);
    const p = h === A && n[d + 1].startsWith("/>") ? " " : "";
    o += h === y ? r + Y : l >= 0 ? (s.push(a), r.slice(0, l) + V + r.slice(l) + _ + p) : r + _ + (l === -2 ? d : p);
  }
  return [Z(n, o + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class b {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let o = 0, h = 0;
    const d = t.length - 1, r = this.parts, [a, $] = et(t, e);
    if (this.el = b.createElement(a, s), f.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = f.nextNode()) !== null && r.length < d; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const l of i.getAttributeNames()) if (l.endsWith(V)) {
          const u = $[h++], p = i.getAttribute(l).split(_), H = /([.?@])?(.*)/.exec(u);
          r.push({ type: 1, index: o, name: H[2], strings: p, ctor: H[1] === "." ? it : H[1] === "?" ? nt : H[1] === "@" ? ot : w }), i.removeAttribute(l);
        } else l.startsWith(_) && (r.push({ type: 6, index: o }), i.removeAttribute(l));
        if (J.test(i.tagName)) {
          const l = i.textContent.split(_), u = l.length - 1;
          if (u > 0) {
            i.textContent = C ? C.emptyScript : "";
            for (let p = 0; p < u; p++) i.append(l[p], N()), f.nextNode(), r.push({ type: 2, index: ++o });
            i.append(l[u], N());
          }
        }
      } else if (i.nodeType === 8) if (i.data === z) r.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = i.data.indexOf(_, l + 1)) !== -1; ) r.push({ type: 7, index: o }), l += _.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = m.createElement("template");
    return s.innerHTML = t, s;
  }
}
function g(n, t, e = n, s) {
  if (t === v) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const o = x(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== o && (i?._$AO?.(!1), o === void 0 ? i = void 0 : (i = new o(n), i._$AT(n, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = g(n, i._$AS(n, t.values), i, s)), t;
}
class st {
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
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? m).importNode(e, !0);
    f.currentNode = i;
    let o = f.nextNode(), h = 0, d = 0, r = s[0];
    for (; r !== void 0; ) {
      if (h === r.index) {
        let a;
        r.type === 2 ? a = new T(o, o.nextSibling, this, t) : r.type === 1 ? a = new r.ctor(o, r.name, r.strings, this, t) : r.type === 6 && (a = new rt(o, this, t)), this._$AV.push(a), r = s[++d];
      }
      h !== r?.index && (o = f.nextNode(), h++);
    }
    return f.currentNode = m, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class T {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = g(this, t, e), x(t) ? t === c || t == null || t === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : t !== this._$AH && t !== v && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : tt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== c && x(this._$AH) ? this._$AA.nextSibling.data = t : this.T(m.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = b.createElement(Z(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const o = new st(i, this), h = o.u(this.options);
      o.p(e), this.T(h), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = k.get(t.strings);
    return e === void 0 && k.set(t.strings, e = new b(t)), e;
  }
  k(t) {
    U(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const o of t) i === e.length ? e.push(s = new T(this.O(N()), this.O(N()), this, this.options)) : s = e[i], s._$AI(o), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = P(t).nextSibling;
      P(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class w {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, o) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = c;
  }
  _$AI(t, e = this, s, i) {
    const o = this.strings;
    let h = !1;
    if (o === void 0) t = g(this, t, e, 0), h = !x(t) || t !== this._$AH && t !== v, h && (this._$AH = t);
    else {
      const d = t;
      let r, a;
      for (t = o[0], r = 0; r < o.length - 1; r++) a = g(this, d[s + r], e, r), a === v && (a = this._$AH[r]), h ||= !x(a) || a !== this._$AH[r], a === c ? t = c : t !== c && (t += (a ?? "") + o[r + 1]), this._$AH[r] = a;
    }
    h && !i && this.j(t);
  }
  j(t) {
    t === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class it extends w {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === c ? void 0 : t;
  }
}
class nt extends w {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== c);
  }
}
class ot extends w {
  constructor(t, e, s, i, o) {
    super(t, e, s, i, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = g(this, t, e, 0) ?? c) === v) return;
    const s = this._$AH, i = t === c && s !== c || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== c && (s === c || i);
    i && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class rt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    g(this, t);
  }
}
const ht = O.litHtmlPolyfillSupport;
ht?.(b, T), (O.litHtmlVersions ??= []).push("3.3.2");
const lt = { CHILD: 2 }, at = (n) => (...t) => ({ _$litDirective$: n, values: t });
class ct {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, s) {
    this._$Ct = t, this._$AM = e, this._$Ci = s;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}
class S extends ct {
  constructor(t) {
    if (super(t), this.it = c, t.type !== lt.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === c || t == null) return this._t = void 0, this.it = t;
    if (t === v) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const e = [t];
    return e.raw = e, this._t = { _$litType$: this.constructor.resultType, strings: e, values: [] };
  }
}
S.directiveName = "unsafeHTML", S.resultType = 1;
const $t = at(S);
var dt = Object.defineProperty, ut = Object.getOwnPropertyDescriptor, F = (n) => {
  throw TypeError(n);
}, q = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? ut(t, e) : t, o = n.length - 1, h; o >= 0; o--)
    (h = n[o]) && (i = (s ? h(t, e, i) : h(i)) || i);
  return s && i && dt(t, e, i), i;
}, pt = (n, t, e) => t.has(n) || F("Cannot " + e), _t = (n, t, e) => t.has(n) ? F("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(n) : t.set(n, e), At = (n, t, e) => (pt(n, t, "access private method"), e), I, G;
let M = class extends X {
  constructor() {
    super(), _t(this, I), this.content = "";
  }
  connectedCallback() {
    super.connectedCallback();
  }
  render() {
    return D`
            <umb-body-layout headline=${this.data?.headline ?? "Custom dialog"}>
                <uui-box>
                    <uui-scroll-container> ${this.parseJson(this.data?.content ?? "")}</uui-scroll-container>
                </uui-box>
                <div slot="actions">
                    <uui-button id="cancel" label="Close" @click="${At(this, I, G)}">Close</uui-button>
                </div>
            </umb-body-layout>`;
  }
  parseJson(n) {
    const e = JSON.parse(n).Metadata.Directory, s = [];
    e.forEach((h) => {
      Object.entries(h).forEach(([d, r]) => {
        d === "Tag" ? Array.isArray(r) ? r.forEach((a) => {
          a && typeof a == "object" && s.push(
            `<li><span style="width:30%;display:inline-block;">${a["@Name"]}</span><span style="width:65%">${a["#text"]}</span></li>`
          );
        }) : r && typeof r == "object" && s.push(
          `<li><span style="width:30%;display:inline-block;">${r["@Name"]}</span><span style="width:65%">${r["#text"]}</span></li>`
        ) : d === "@Name" && s.push(`<ul style="list-style-type: none;"><uui-label>${r}</uui-label>`);
      }), s.push("</ul>");
    });
    let i = /\,/gi, o = s.toString().replace(i, "");
    return D`${$t(o)}`;
  }
};
I = /* @__PURE__ */ new WeakSet();
G = function() {
  this.modalContext?.reject();
};
q([
  K()
], M.prototype, "content", 2);
M = q([
  Q("mediainfo-custom-modal")
], M);
const vt = M;
export {
  M as MediaInfoCustomModalElement,
  vt as default
};
//# sourceMappingURL=modal-element-WI_7qEfL.js.map
