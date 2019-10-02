import { LightningElement, api, track } from 'lwc';

import UserId from '@salesforce/user/Id';

import { createRecord } from 'lightning/uiRecordApi';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

//Information to update record in Item__c object
import ITEM_Count_FIELD from '@salesforce/schema/Item__c.Count__c';
import ITEM_ID_FIELD from '@salesforce/schema/Item__c.Id';

//Information to create record in ItemAction__c object
import ITEM_ACTION_OBJECT from '@salesforce/schema/Item_Action__c';
import Action_FIELD from '@salesforce/schema/Item_Action__c.Action__c';
import Count_FIELD from '@salesforce/schema/Item_Action__c.Count__c';
import Item_FIELD from '@salesforce/schema/Item_Action__c.Item__c';
import Location_FIELD from '@salesforce/schema/Item_Action__c.Location__c';
import User_FIELD from '@salesforce/schema/Item_Action__c.User__c';

/* eslint-disable no-console */

export default class Item extends LightningElement {
    @api item;
    @api settings;
    @api key;
    @api apexrefreshcalled;
    
    @track showActionButtons;
    @track count;
    @track countChange = 0;

    invmgrnp__Count__c_old =0;

    renderedCallback() {
        //Track DB Inv Count locally so we can refresh it when it changes
        //This will change when refreshApex is called on parent component
        if((typeof(this.item.invmgrnp__Count__c) === 'undefined') || (this.invmgrnp__Count__c_old !== this.item.invmgrnp__Count__c)){
            this.invmgrnp__Count__c_old = (typeof(this.item.invmgrnp__Count__c) === 'undefined')?0:this.item.invmgrnp__Count__c;
            this.count = (typeof(this.item.invmgrnp__Count__c) === 'undefined')?0:this.item.invmgrnp__Count__c;
        }        
    }

    //Add 1 item to inventory
    handleIncrement(){
        this.count = this.count +1;
        
        this.updateItem('Add', this.count, 1);
    }

    //Remove 1 item from inventory
    handleDecrement(){
        if((this.count -1) >=0){
            //Do calculation inside if statement so it only happens if still 0 or above
            //This is not needed for add as that should always be above 0
            this.count = this.count -1;

            this.updateItem('Remove', this.count, -1);
        }else{
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Enter Quantity',
                    message: 'Quantity should greater than 0 to remove',
                    variant: 'error'
                })
            );
        }
    }

    handleAdd(){
        //Convert any value to number otherwise it will be treated as string
        //That will cause issues with comparison
        //Using onChange send event on every number entry but we want it when the whole number has been entered
        //So we set it on blur and fire blur when enter is pressed (or when focus moves away from the text box)
        let count = parseInt(this.template.querySelector('.itemQty').value, 0);

        
        //Only do a change if count has changed
        if(count === '' || isNaN(count) || count<0){
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Enter Quantity',
                    message: 'Quantity should be a number greater than 0',
                    variant: 'error'
                })
            );

            return;
        }
        
        if(!isNaN(count) && count >=0 && count !== this.count) {

            //Update tracking count variable
            //Change count to new quantity
            this.count = this.count + count;
            
            this.updateItem('Add', this.count, count, true);

            //reset text field
            this.countChange = 0;
            this.template.querySelector('.itemQty').value = 0;

        }else{
            this.showActionButtons = false;
        }    
    }
    handleRemove(){
        //Convert any value to number otherwise it will be treated as string
        //That will cause issues with comparison
        //Using onChange send event on every number entry but we want it when the whole number has been entered
        //So we set it on blur and fire blur when enter is pressed (or when focus moves away from the text box)
        let count = parseInt(this.template.querySelector('.itemQty').value, 0);

        //Only do a change if count has changed
        if(count === '' || isNaN(count) || count<0){
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Enter Quantity',
                    message: 'Quantity should be a number greater than 0',
                    variant: 'error'
                })
            );

            return;
        }

        //Only remove if we have enough quantity to remove
        if((this.count - count) >=0){
            //Do calculation inside if statement so it only happens if still 0 or above
            //This is not needed for add as that should always be above 0
            this.count = this.count -count;

            this.updateItem('Remove', this.count, count, true);

            //reset text field
            this.countChange = 0;
            this.template.querySelector('.itemQty').value = 0;
        }else{
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Enter Quantity',
                    message: 'Not enough quantity to remove',
                    variant: 'error'
                })
            );
        }
    }
    
    handleKeyPress({code}) {
        //when pressed enter in Qty field, blur it
        if ('Enter' === code || 'NumpadEnter' === code) {
            this.template.querySelector('.itemQty').blur(); 
            this.countChange = this.template.querySelector('.itemQty').value;
            this.showActionButtons = true;
        }
    }
   
    //When text field for count changes, show Save/Canecl buttons
    handleChange(){
        this.countChange = this.template.querySelector('.itemQty').value;
        this.showActionButtons = true;
    }
    //Hide save/cancel buttons if cancel button is clicked and reset value of count variable as no change was made
    handleCancel(){
        //reset to old value
        this.template.querySelector('.itemQty').value = 0;
        this.countChange = 0;
        this.showActionButtons = false;
    }

    
    //Create itemAction record to account for this count change
    //Action=Add/Remove
    //Count= final count to be updated in Item__c.Count__c
    //actualChange= change to the count; If from 5->3 then -2, If 5->7 then +2
    updateItem(action,  count, actualChange, showConfirmationMessage){
        const fields = {};
        fields[ITEM_Count_FIELD.fieldApiName] = count;
        fields[ITEM_ID_FIELD.fieldApiName] = this.item.Id;
        //Use Lightning Data Service to update record as we are doing simple update
        const recordInput = { fields };        
        updateRecord(recordInput)
            .then(() => {
                //Sometimes Item__c.Count__c field maybe empty. that will show as undefined
                //In those cases, when we update the count, we want to refresh the data so the new data is filtered down
                //If we don't, then it will always show as undefined and cause issues in renderedCallback()
                if(typeof(this.item.invmgrnp__Count__c) === 'undefined'){
                    const refreshdata = new CustomEvent('refreshdata');
                    this.dispatchEvent(refreshdata);
                }
                //Hide Action buttons (if active)
                this.showActionButtons = false;

                //Dispatch event for parent component to do refreshApex (or any other action) when item is updated
                // Creates the event with the contact ID data.
                const updateItemEvent = new CustomEvent('updateitemevent');

                // Dispatches the event.
                this.dispatchEvent(updateItemEvent);

                this.updateItemAction(action, actualChange);

                if(typeof(showConfirmationMessage) !== 'undefined' && showConfirmationMessage === true){
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Quantity: ' + action + ': ' + actualChange,
                            variant: 'success'
                        })
                    );
                }
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error updating quantity',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }

    //Create itemAction record to account for this count change
    //Here we wills store the actual change made
    //WHen updating inventory, we maybe updating from 1 to 2 but the actual change is 1 and we have to record it
    updateItemAction(action, actualChange){
        //Let's not log action item
        //This is based on "Inventory Manager" custom metadata type.
        //value of this is passed from parent component to child component
        if(typeof(this.settings.invmgrnp__Log_Item_Actions) === 'undefined' || this.settings.invmgrnp__Log_Item_Actions === false){
            return true;
        }
        const fields = {};
        fields[Action_FIELD.fieldApiName] = action;
        fields[Count_FIELD.fieldApiName] = actualChange;
        fields[Item_FIELD.fieldApiName] = this.item.Id;
        fields[Location_FIELD.fieldApiName] = this.item.invmgrnp__Location__c;
        fields[User_FIELD.fieldApiName] = UserId;

        //Use Lightning Data Service to create record as we are doing simple insert
        const recordInput = { apiName: ITEM_ACTION_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(itemAction => {
                this.itemActionId = itemAction.id;

                return true;
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error updating quantity',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
            //No need to catch, it's good to have success but it won't impact inventory manager
        return false;    
    }
}