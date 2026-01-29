import { UMB_MEDIA_ENTITY_TYPE, UMB_MEDIA_ROOT_ENTITY_TYPE  } from "@umbraco-cms/backoffice/media";
import type { /*ManifestModal,*/ ManifestEntityAction } from "@umbraco-cms/backoffice/entity-action";
import { ExifEntityAction } from "./exif.entity.action";

const entityActions: Array<ManifestEntityAction> = [
	{
		type: 'entityAction',
		kind: 'default',
		alias: 'Umb.EntityAction.Media.Exif',
		name: 'Media Exif Data',
		weight: 10,
		api: ExifEntityAction,
		forEntityTypes: [UMB_MEDIA_ROOT_ENTITY_TYPE, UMB_MEDIA_ENTITY_TYPE],
		meta: {
			icon: 'icon-info',
			label: 'Exif Info',
		},

	},
];

//const modals: Array<ManifestModal> = [
//	{
//		type: 'modal',
//		alias: 'Umb.Modal.Media.CreateOptions',
//		name: 'Media Create Options Modal',
//		element: () => import('./media-create-options-modal.element.js'),
//	},
//];

export const manifests: Array<ManifestEntityAction> = [...entityActions/*, ...modals*/];

