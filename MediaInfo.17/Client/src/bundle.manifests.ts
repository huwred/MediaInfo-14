import { type UmbEntryPointOnInit } from '@umbraco-cms/backoffice/extension-api';

// load up the manifests here.
import { manifests as entityActionManifests } from './actions/entity/manifest.ts';
import { manifests as modalManifests } from './modal/manifest.ts';

const manifests: Array<UmbExtensionManifest> = [
    ...entityActionManifests,
    ...modalManifests
];

export const onInit: UmbEntryPointOnInit = (_host, extensionRegistry) => {

    // register them here. 
    extensionRegistry.registerMany(manifests);
};