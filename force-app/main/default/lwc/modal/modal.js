import { LightningElement, api, track } from 'lwc';

const CSS_CLASS = 'modal-hidden';

export default class Modal extends LightningElement {
    @track showModal = false;
    @api
    set header(value) {
        this.hasHeaderString = value !== '';
        this._headerPrivate = value;
    }
    get header() {
        return this._headerPrivate;
    }

    @track hasHeaderString = false;
    _headerPrivate;

    @api show() {
        this.showModal = true;
    }

    @api hide() {
        this.showModal = false;
    }

    handleDialogClose() {
        //Let parent know that dialog is closed (mainly by that cross button) so it can set proper variables if needed
        const closedialog = new CustomEvent('closedialog');
        this.dispatchEvent(closedialog);
        this.hide();
    }

    handleSlotTaglineChange() {
        //No need to do anything as modal is not visible anymore
        //Otherwise querySelector may return null
        //https://github.com/SalesforceLabs/InventoryManagerNP/issues/4
        if(this.showModal === false){
            return;
        }
        const taglineEl = this.template.querySelector('p');
        taglineEl.classList.remove(CSS_CLASS);
    }

    handleSlotFooterChange() {
        //No need to do anything as modal is not visible anymore
        //Otherwise querySelector may return null
        //https://github.com/SalesforceLabs/InventoryManagerNP/issues/4
        if(this.showModal === false){
            return;
        }
        const footerEl = this.template.querySelector('footer');
        footerEl.classList.remove(CSS_CLASS);
    }
}