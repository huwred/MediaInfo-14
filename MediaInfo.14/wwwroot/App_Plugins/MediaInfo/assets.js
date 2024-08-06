var m = (e, n, t) => {
  if (!n.has(e))
    throw TypeError("Cannot " + t);
};
var d = (e, n, t) => (m(e, n, "read from private field"), t ? t.call(e) : n.get(e)), r = (e, n, t) => {
  if (n.has(e))
    throw TypeError("Cannot add the same private member more than once");
  n instanceof WeakSet ? n.add(e) : n.set(e, t);
}, f = (e, n, t, o) => (m(e, n, "write to private field"), o ? o.call(e, t) : n.set(e, t), t);
import { UMB_MEDIA_ROOT_ENTITY_TYPE as l, UMB_MEDIA_ENTITY_TYPE as p } from "@umbraco-cms/backoffice/media";
import { UmbEntityActionBase as E } from "@umbraco-cms/backoffice/entity-action";
import { UmbModalToken as M, UMB_MODAL_MANAGER_CONTEXT as u } from "@umbraco-cms/backoffice/modal";
const y = new M(
  "mediainfo.custom.modal",
  {
    modal: {
      type: "sidebar",
      size: "medium"
    }
  }
);
var i;
class A extends E {
  constructor(t, o) {
    super(t, o);
    r(this, i, void 0);
    this.consumeContext(u, (s) => {
      f(this, i, s);
    });
  }
  async execute() {
    var s;
    const t = new Headers();
    t.set("Content-Type", "application/json"), t.set("Accept", "application/json");
    const o = new Request("/exiffiledata/" + ((s = this.args.unique) == null ? void 0 : s.toString()), {
      method: "GET",
      headers: t
    });
    return fetch(o).then((a) => a.json()).then((a) => {
      var c;
      (c = d(this, i)) == null || c.open(this, y, {
        data: {
          headline: "Exif Data",
          content: a
        }
      });
    });
  }
}
i = new WeakMap();
const T = [
  {
    type: "entityAction",
    kind: "default",
    alias: "Umb.EntityAction.Media.Info",
    name: "Create Media Entity Action",
    weight: 10,
    api: A,
    forEntityTypes: [l, p],
    meta: {
      icon: "icon-info",
      label: "Media Info"
    }
  }
], h = [
  ...T
  /*, ...modals*/
], _ = [
  {
    type: "modal",
    alias: "mediainfo.custom.modal",
    name: "MediaInfo custom modal",
    js: () => import("./modal-element-B3KGXToS.js")
  }
], I = [..._], x = [
  ...h,
  ...I
], b = (e, n) => {
  n.registerMany(x);
};
export {
  b as onInit
};
//# sourceMappingURL=assets.js.map
