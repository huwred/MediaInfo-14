import { UmbModalToken } from "@umbraco-cms/backoffice/modal";

export interface MediaInfoCustomModalData {
    headline: string;
    content: string;
}

export interface MediaInfoCustomModalValue {
    content: string 
}

export const MEDIAINFO_CUSTOM_MODAL = new UmbModalToken<MediaInfoCustomModalData, MediaInfoCustomModalValue>(
    "mediainfo.custom.modal",
    {
        modal: {
            type: 'sidebar',
            size: 'medium'
        }
    }
);