//Class to get configuration data for Inventory manager
public with sharing class InventoryManagerController {
    //Get list of records in "Inventory Manager" custom metadata type
    @AuraEnabled(cacheable=true)
    public static Map<String, Boolean> getSettings() {
        Map<String, Boolean> inventoryManagerSettings = new Map<String, Boolean>();
        try{
            for(Inventory_Manager__mdt record: [SELECT QualifiedApiName, isEnabled__c FROM Inventory_Manager__mdt]) {
                inventoryManagerSettings.put(record.QualifiedApiName, record.isEnabled__c);
            }
        }catch(Exception e){Util.log('InventoryManagerController:getSettings():Exception' + e.getMessage()); }
        

        return inventoryManagerSettings;
    }

    //Get list of records in "Inventory Manager" custom metadata type
    @AuraEnabled(cacheable=true)
    public static Map<String, String> getUserSettings() {
        Map<String, String> userSettings = new Map<String, String>();

        try{
            Location__c location = [select id from Location__c where Assigned_User__c=:UserInfo.getUserId()];
            userSettings.put('Location', location.Id);
        }catch(Exception e){ userSettings.put('Location', null); }

        return userSettings;
    }

}