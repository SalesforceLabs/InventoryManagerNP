public with sharing class ItemController {
    //This will be used to check if we should show All items even if location is not assigned a user.
    //This will be used via Test class
	@TestVisible private static Boolean showAllItemsTestOverride = false;
    Private static Boolean showAllItems = false;
    
    //Return all Active items which belong a location enabled for current logged in user
    //Use automatic session info rather than manually provided location
    //Make sure to only get items which are active
    @AuraEnabled(cacheable=true)
    public static List<Item__c> getItemList() {
        List<Item__c> itemList = new List<Item__c>();
        try{
            Map<String, Boolean> inventoryManagerSettings = InventoryManagerController.getSettings();            
            
            itemList = [SELECT Id, Name, Category__c, Count__c, Item_Description__c, Location__c, Location__r.Name,
                        Display_Name__c, Sub_Category__c, SubType__c, Type__c
                    FROM Item__c
                    WHERE Active__c = true and Location__c in (select id from Location__c where Assigned_User__c=:UserInfo.getUserId())
                    WITH SECURITY_ENFORCED
                    ];

            showAllItems = (inventoryManagerSettings.containsKey('invmgrnp__Show_Items_in_Locations_without_User') && inventoryManagerSettings.get('invmgrnp__Show_Items_in_Locations_without_User') == true)?True:false;
            if(Test.isRunningTest() && (showAllItems != showAllItemsTestOverride)){
                showAllItems = showAllItemsTestOverride;
            }
            //If admin wants to also show items where location doesn't have assigned user then they can turn it on in "Inventory Manager" Custom metadata type
            if(showAllItems){
                itemList.addAll(
                    [SELECT Id, Name, Category__c, Count__c, Item_Description__c, Location__c, Location__r.Name,
                        Display_Name__c, Sub_Category__c, SubType__c, Type__c
                    FROM Item__c
                    WHERE Active__c = true and Location__c in (select id from Location__c where Assigned_User__c=null)
                    WITH SECURITY_ENFORCED
                    ]
                );
            }
        }catch(System.QueryException e){Util.log('ItemController:getItemList():System.QueryException' + e.getMessage());
        }catch(Exception e){Util.log('ItemController:getItemList():Exception' + e.getMessage());
        }
        return itemList;
    }
}