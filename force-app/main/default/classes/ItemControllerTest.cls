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
    /**/
    @isTest
    public static void getItemList_runAs() {
        // Setup test data
        // Create a unique UserName
        String uniqueUserName = 'standarduser' + DateTime.now().getTime() + '@testorg.com';
        // This code runs as the system user
        Profile p = [SELECT Id FROM Profile WHERE Name='Standard User'];
        User u = new User(Alias = 'standt', Email='standarduser@testorg.invmgrnp',
        EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US',
        LocaleSidKey='en_US', ProfileId = p.Id,
        TimeZoneSidKey='America/Los_Angeles',
        UserName=uniqueUserName);

        System.runAs(u) {
            List<Item__c> items = ItemController.getItemList();
            System.assertEquals(0, items.size());
          }
    }
}