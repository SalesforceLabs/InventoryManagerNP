public with sharing class ItemController {

    //Return all Active items which belong a location enabled for current logged in user
    //Use automatic session info rather than manually provided location
    //Make sure to only get items which are active
    @AuraEnabled(cacheable=true)
    public static List<Item__c> getItemList() {
        return [SELECT Id, Name, Category__c, Count__c, Item_Description__c, Location__c,
                    Display_Name__c, Sub_Category__c, SubType__c, Type__c
                FROM Item__c
                WHERE Active__c = true and Location__c in (select id from Location__c where Assigned_User__c=:UserInfo.getUserId())
                ];
    }
}
