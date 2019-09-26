@istest
public  class ItemControllerTest {
    @TestSetup
    static void makeData(){
        
        Location__c loc = new Location__c();
        loc.Name = 'Location 1';
        loc.Assigned_User__c = UserInfo.getUserId();
        insert loc;
        
        List<Item__c> items = new List<Item__c>();
        for(Integer i=0; i<10; i++){
            Item__c item = new Item__c();
            item.Type__c = 'Item Name ' + i;
            item.Location__c = loc.Id;
            item.Count__c = 1;
            item.Active__c = true;
            items.add(item);
        }
        insert items;
    }
    @isTest
    private static void getItemList_positive(){
        List<Item__c> items = ItemController.getItemList();
        System.assertEquals(10, items.size());
    }
}