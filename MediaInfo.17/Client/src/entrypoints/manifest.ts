export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Media Info 17Entrypoint",
    alias: "MediaInfo._17.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint.js"),
  },
];
