import { ManifestModal } from "@umbraco-cms/backoffice/extension-registry";

const modals: Array<ManifestModal> = [
    {
        type: 'modal',
        alias: 'mediainfo.custom.modal',
        name: 'MediaInfo custom modal',
        js: () => import('./modal-element.js')
    }
];

export const manifests = [...modals];