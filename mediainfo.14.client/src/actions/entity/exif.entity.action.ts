import { UmbEntityActionArgs, UmbEntityActionBase } from '@umbraco-cms/backoffice/entity-action';
import { UmbMediaDetailRepository  } from '@umbraco-cms/backoffice/media';
import { UmbControllerHostElement } from "@umbraco-cms/backoffice/controller-api";
import { UMB_MODAL_MANAGER_CONTEXT, UmbModalManagerContext } from "@umbraco-cms/backoffice/modal";
import { MEDIAINFO_CUSTOM_MODAL } from "../../modal/modal-token.ts";

export class ExifEntityAction extends UmbEntityActionBase<UmbMediaDetailRepository> {
     #modalManagerContext?: UmbModalManagerContext;
     public _citiesData: string[];
	constructor(host: UmbControllerHostElement, args: UmbEntityActionArgs<UmbMediaDetailRepository>)
    {
        super(host, args);
                this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, (instance) => {
            this.#modalManagerContext = instance;
        });        
	}

	async execute() {

            const headers: Headers = new Headers()
            headers.set('Content-Type', 'application/json')
            headers.set('Accept', 'application/json')
            const request: RequestInfo = new Request('/exiffiledata/' + this.args.unique?.toString(), {
                method: 'GET',
                headers: headers,
            })
            // Send the request and pass result to modal
            return fetch(request)
            .then(response => response.json())
            .then(data=>{ 
                
                this.#modalManagerContext?.open(this, MEDIAINFO_CUSTOM_MODAL, {
                    data: {
                        headline:'Exif Data',
                        content: data
                    }
                });
            });
	}
}