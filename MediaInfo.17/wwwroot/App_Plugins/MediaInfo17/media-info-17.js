import "@umbraco-cms/backoffice/extension-api";
import { UMB_MEDIA_ROOT_ENTITY_TYPE as i, UMB_MEDIA_ENTITY_TYPE as s } from "@umbraco-cms/backoffice/media";
import { UmbEntityActionBase as a } from "@umbraco-cms/backoffice/entity-action";
import "@umbraco-cms/backoffice/controller-api";
import { UmbModalToken as c, UMB_MODAL_MANAGER_CONTEXT as m } from "@umbraco-cms/backoffice/modal";
const d = new c(
  "mediainfo.custom.modal",
  {
    modal: {
      type: "sidebar",
      size: "medium"
    }
  }
);
class r extends a {
  constructor(t, n) {
    super(t, n), this._citiesData = [], this.consumeContext(m, (e) => {
      this.#t = e;
    });
  }
  #t;
  async execute() {
    console.log("Fetch exif data");
    const t = new Headers();
    t.set("Content-Type", "application/json"), t.set("Accept", "application/json");
    const n = new Request("/exiffiledata/" + this.args.unique?.toString(), {
      method: "GET",
      headers: t
    });
    return fetch(n).then((e) => e.json()).then((e) => {
      this.#t?.open(this, d, {
        data: {
          headline: "Exif Data",
          content: e
        }
      });
    });
  }
}
const f = [
  {
    type: "entityAction",
    kind: "default",
    alias: "Umb.EntityAction.Media.Exif",
    name: "Media Exif Data",
    weight: 10,
    api: r,
    forEntityTypes: [i, s],
    meta: {
      icon: "icon-info",
      label: "Exif Info"
    }
  }
], l = [
  ...f
  /*, ...modals*/
], p = [
  {
    type: "modal",
    alias: "mediainfo.custom.modal",
    name: "MediaInfo custom modal",
    js: () => import("./modal-element-WI_7qEfL.js")
  }
], E = [...p], M = [
  ...l,
  ...E
], A = (o, t) => {
  t.registerMany(M);
};
export {
  A as onInit
};
//# sourceMappingURL=media-info-17.js.map
