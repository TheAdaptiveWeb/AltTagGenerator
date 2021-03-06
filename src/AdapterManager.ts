import { describeImage } from "./ImageDescriptionAPI";
import { AdapterContext } from 'adaptiveweb';
import { Preferences } from './Preferences';


export class AdapterManager {

    aw: AdapterContext;
    preferences: Preferences;

    selected?: HTMLImageElement;
    generating: boolean = false;
    
    predescribeMessage: string = 'To generate a description of this image, press enter';
    generatingMessage: string = 'Generating description. Please wait';

    constructor(aw: AdapterContext, preferences: Preferences) {
        this.aw = aw;
        this.preferences = preferences;
        
        let imgs = document.getElementsByTagName('img');
        
        for (let i = 0; i < imgs.length; i++) {
            let img = imgs[i];
            if (img.alt === '' || img.alt === undefined) {
                img.alt = this.predescribeMessage;
                img.tabIndex = 0;
                img.addEventListener('focus', () => { 
                    this.selected = img;
                });
                img.addEventListener('blur', () => { if (this.selected === img) this.selected = undefined; });
            }
        }

        window.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                if (this.selected === undefined) return;
                if (this.selected.alt !== this.predescribeMessage) return;

                let img = this.selected;

                let canvas: HTMLCanvasElement = document.createElement('canvas');
                let ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
                if (ctx === null) return;

                let scaleFactor = Math.max(img.width, img.height) / 300;
                canvas.width = Math.floor(img.width / scaleFactor);
                canvas.height = Math.floor(img.height / scaleFactor);

                ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
                canvas.toBlob((blob: Blob | null) => {
                    if (blob === null) return;
                    describeImage(this.aw, blob).then(caption => {
                        caption = 'Image may contain ' + caption;
                        img.alt = caption;
                        img.setAttribute('aria-live', caption);
                        img.focus();
                    });
                });
            }
        })
    }
    
}