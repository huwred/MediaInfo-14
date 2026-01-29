import { customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement } from "@umbraco-cms/backoffice/modal";
import type { MediaInfoCustomModalData, MediaInfoCustomModalValue } from "./modal-token";
import {unsafeHTML} from 'lit/directives/unsafe-html.js';

@customElement('mediainfo-custom-modal')
export class MediaInfoCustomModalElement extends 
    UmbModalBaseElement<MediaInfoCustomModalData, MediaInfoCustomModalValue> 
{
    constructor() {
        super();
    }

    connectedCallback(): void {
        super.connectedCallback();    
    }

    @state()
    content: string = '';

	#handleCancel() {
		this.modalContext?.reject();
	}

    render() {
        return html`
            <umb-body-layout headline=${this.data?.headline ?? 'Custom dialog'}>
                <uui-box>
                    <uui-scroll-container> ${this.parseJson(this.data?.content ?? "")}</uui-scroll-container>
                </uui-box>
                <div slot="actions">
                    <uui-button id="cancel" label="Close" @click="${this.#handleCancel}">Close</uui-button>
                </div>
            </umb-body-layout>`;
    }

    parseJson(data: string | "") {
        const res = JSON.parse(data);
        const repos = res.Metadata.Directory;
        const exifvalues: string[] = [];
        //loop over the directories and create html elements to push to the string array.
        repos.forEach((repo: { [s: string]: unknown } | ArrayLike<unknown>) => {
            Object.entries(repo).forEach(([key, value]) => {
                if (key === "Tag") {
                    if (Array.isArray(value)) {
                        //we have an array of Tags, so iterate over those
                        (value as Array<any>).forEach((tag) => {
                            if (tag && typeof tag === "object") {
                                exifvalues.push(
                                    `<li><span style="width:30%;display:inline-block;">${(tag as any)["@Name"]}</span><span style="width:65%">${(tag as any)["#text"]}</span></li>`
                            );
                            }
                        });
                    } else if (value && typeof value === "object") {
                        //Only one Tag so just display it
                        exifvalues.push(
                            `<li><span style="width:30%;display:inline-block;">${(value as any)["@Name"]}</span><span style="width:65%">${(value as any)["#text"]}</span></li>`
                        );
                    }
                } else if (key === "@Name") {
                    //Title for the Tag collection
                    exifvalues.push(`<ul style="list-style-type: none;"><uui-label>${value}</uui-label>`);
                }
            });
            exifvalues.push(`</ul>`);
        });
        let re = /\,/gi;
        let result = exifvalues.toString().replace(re, '');

        return html`${unsafeHTML(result)}`;
    }
}

export default MediaInfoCustomModalElement;