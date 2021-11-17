import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getItemList from '@salesforce/apex/ItemController.getItemList';
import getInventoryManagerSettings from '@salesforce/apex/InventoryManagerController.getSettings';
import getInventoryManagerUserSettings from '@salesforce/apex/InventoryManagerController.getUserSettings';

/* eslint-disable no-console */

export default class Items extends LightningElement {
    items;
    settings;
    location;//Track user location for when creating new item
    error;

    openmodal() {
        this.template.querySelector('c-modal').show();
    }
    handleCreateItem() {
        const modal = this.template.querySelector('c-item-create');
        modal.submitForm();
    } 
    handleCancelModal() {
        const modal = this.template.querySelector('c-modal');
        modal.hide();
    }
    //new item created, refresh data so it shows up
    onItemCreated(){
        refreshApex(this.wiredItemsResult);
        refreshApex(this.wiredGetInventoryManagerSettingsResult);
        const modal = this.template.querySelector('c-modal');
        modal.hide();
    }
    connectedCallback() {
        //When tab changes, data is reloaded but item.js doesn't show correct data because of if condition
        //So we refreshData() when component is reloaded on tab change
        this.refreshData();
    }

    //Get List of items for this particular location
    @wire(getItemList) 
    wiredGetItemList(result){
        //Keep track of the result so we can use this in refreshApex()
        this.wiredItemsResult = result;
        console.log('result:', result);
        //Check if there is an error while retriving the list
        if (result.error) {
            this.error = 'Unknown error';
            if (Array.isArray(result.error.body)) {
                this.error = result.error.body.map(e => e.message).join(', ');
            } else if (typeof result.error.body.message === 'string') {
                this.error = result.error.body.message;
            }
            this.items = undefined;
        } else if (result.data) {
            //If no error then get list of items to iterate over.
            this.items = result.data;
        }
    }

    //On-demand refresh of apex data
    refreshData(){
        if(typeof(this.wiredItemsResult.data) !== 'undefined'){
            refreshApex(this.wiredItemsResult);
        }
        if(typeof(this.wiredGetInventoryManagerSettingsResult.data) !== 'undefined'){
            refreshApex(this.wiredGetInventoryManagerSettingsResult);
        }
        if(typeof(this.wiredGetInventoryManagerUserSettingsResult.data) !== 'undefined'){
            refreshApex(this.wiredGetInventoryManagerUserSettingsResult);
        }
    }
    //New item event happened so refreshApex
    updateItemEventHandler(){
        
        //this.apexRefreshCalled = true;
        //refreshApex(this.wiredItemsResult);
        //refreshApex(this.wiredGetInventoryManagerSettingsResult);
    } 

    //Get List of Custom Metadata Type "Inventory Manager"
    @wire(getInventoryManagerSettings) 
    wiredGetInventoryManagerSettings(result){
        //Keep track of custom metadata type settings result so we can refresh it with refreshApex()
        this.wiredGetInventoryManagerSettingsResult = result;
        //Check if there is an error while retriving the list
        if (result.error) {
            this.error = 'Unknown error';
            if (Array.isArray(result.error.body)) {
                this.error = result.error.body.map(e => e.message).join(', ');
            } else if (typeof result.error.body.message === 'string') {
                this.error = result.error.body.message;
            }
            this.items = undefined;
        } else if (result.data) {
            //If no error then get list of items to iterate over.
            this.settings = result.data;
        }
    }
    //Get List of Custom Metadata Type "Inventory Manager"
    @wire(getInventoryManagerUserSettings) 
    wiredGetInventoryManagerUserSettings(result){
        //Keep track of custom metadata type settings result so we can refresh it with refreshApex()
        this.wiredGetInventoryManagerUserSettingsResult = result;
        //Check if there is an error while retriving the list
        if (result.error) {
            this.error = 'Unknown error';
            if (Array.isArray(result.error.body)) {
                this.error = result.error.body.map(e => e.message).join(', ');
            } else if (typeof result.error.body.message === 'string') {
                this.error = result.error.body.message;
            }
            this.items = undefined;
        } else if (result.data) {
            //If no error then get list of items to iterate over.
            //this.settings = result.data;
            this.location = result.data.Location;
        }
    }

    /**/
    
}