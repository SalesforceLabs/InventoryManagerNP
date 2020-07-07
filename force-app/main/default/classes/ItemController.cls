public with sharing class ItemController {

    //Return all Active items which belong a location enabled for current logged in user
    //Use automatic session info rather than manually provided location
    //Make sure to only get items which are active
    @AuraEnabled(cacheable=true)
    public static List<Item__c> getItemList() {
        List<Item__c> itemList = new List<Item__c>();
        try{
            //Check read permission on Item__c & Location__c object and fields
            List<Schema.SobjectField> fields = new List<Schema.SobjectField>{Schema.Location__c.fields.Assigned_User__c};
            Util.AccessController.assertAuthorizedToView(Schema.Location__c.getSobjectType(), fields);


            fields = new List<Schema.SobjectField>{
                    Schema.Item__c.fields.Name, Schema.Item__c.fields.Category__c,Schema.Item__c.fields.Count__c,
                    Schema.Item__c.fields.Item_Description__c,Schema.Item__c.fields.Location__c,Schema.Item__c.fields.Display_Name__c,
                    Schema.Item__c.fields.Sub_Category__c,Schema.Item__c.fields.SubType__c,Schema.Item__c.fields.Type__c,
                    Schema.Item__c.fields.Active__c
                };
            Util.AccessController.assertAuthorizedToView(Schema.Item__c.getSobjectType(), fields);
            
            itemList = [SELECT Id, Name, Category__c, Count__c, Item_Description__c, Location__c,
                        Display_Name__c, Sub_Category__c, SubType__c, Type__c
                    FROM Item__c
                    WHERE Active__c = true and Location__c in (select id from Location__c where Assigned_User__c=:UserInfo.getUserId())
                    ];
        }catch(SFDCAccessControlException e){Util.log('ItemController:getItemList():SFDCAccessControlException' + e.getMessage());
        }
        return itemList;
    }
}