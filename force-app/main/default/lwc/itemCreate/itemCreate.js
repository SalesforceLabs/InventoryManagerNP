import { LightningElement,api } from 'lwc';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import Item_OBJECT from '@salesforce/schema/Item__c';
import Type_FIELD from '@salesforce/schema/Item__c.Type__c';
import Location_FIELD from '@salesforce/schema/Item__c.Location__c';
import Subtype_FIELD from '@salesforce/schema/Item__c.SubType__c';
import Category_FIELD from '@salesforce/schema/Item__c.Category__c';
import Count_FIELD from '@salesforce/schema/Item__c.Count__c';
import Threshold_Count_FIELD from '@salesforce/schema/Item__c.Threshhold_Limit__c';
/* eslint-disable no-console */

/**
 * Creates Account records.
 */
export default class ItemCreate extends LightningElement {
    @api location;
    itemObject = Item_OBJECT;
    typeField = Type_FIELD;
    locationField = Location_FIELD;
    subtypeField = Subtype_FIELD;
    categoryField = Category_FIELD;
    countField = Count_FIELD;
    threshHoldCountField = Threshold_Count_FIELD;

    @api submitForm() {
        this.template.querySelector('lightning-record-edit-form').submit();
    }

    handleCreated(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'New item was successfully created',
                variant: 'success'
            })
        );
        this.dispatchEvent(
            new CustomEvent('itemcreated', { detail: event.detail.id })
        );

    }

    handleError(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Some error occured',
                message: event.detail.detail,
                variant: 'error'
            })
        );
    }
}