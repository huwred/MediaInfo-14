import { UMB_MEDIA_ENTITY_TYPE, UMB_MEDIA_ROOT_ENTITY_TYPE  } from "@umbraco-cms/backoffice/media";
import { /*ManifestModal,*/ ManifestTypes } from "@umbraco-cms/backoffice/extension-registry";
import { ExifEntityAction } from "./exif.entity.action";

const entityActions: Array<ManifestTypes> = [
	{
		type: 'entityAction',
		kind: 'default',
		alias: 'Umb.EntityAction.Media.Info',
		name: 'Create Media Entity Action',
		weight: 10,
		api: ExifEntityAction,
		forEntityTypes: [UMB_MEDIA_ROOT_ENTITY_TYPE, UMB_MEDIA_ENTITY_TYPE],
		meta: {
			icon: 'icon-info',
			label: 'Media Info',
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

export const manifests: Array<ManifestTypes> = [...entityActions/*, ...modals*/];

