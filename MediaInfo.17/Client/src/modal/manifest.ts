
const modals: Array<UmbExtensionManifest> = [
    {
        type: 'modal',
        alias: 'mediainfo.custom.modal',
        name: 'MediaInfo custom modal',
        js: () => import('./modal-element.js')
    }
];

export const manifests = [...modals];