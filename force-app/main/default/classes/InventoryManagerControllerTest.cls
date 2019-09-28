@isTest
private class InventoryManagerControllerTest {
    
	@istest
    private static void getSetttings_positive(){
        Map<String, Boolean> settings = InventoryManagerController.getSettings();
        System.debug(settings);
        System.assert(settings.containsKey('invmgrnp__Log_Item_Actions'));
    }
	@istest
    private static void getUserSetttings_positive(){
        Location__c location = new Location__c();
        location.Name = 'Door';
        location.Location_Type__c = 'iPad';
        location.Assigned_User__c = UserInfo.getUserId();
        insert location;

        Map<String, String> userSettings = InventoryManagerController.getUserSettings();
        
        System.assertEquals(true,userSettings.containsKey('Location'));
    }
    
	@istest
    private static void getUserSetttings_negative(){
        Location__c location = new Location__c();
        location.Name = 'Door';
        location.Location_Type__c = 'iPad';
        //location.Assigned_User__c = UserInfo.getUserId();
        insert location;

        
        Map<String, String> userSettings = InventoryManagerController.getUserSettings();
        
        
        System.assertEquals(true,userSettings.containsKey('Location'));
        System.assertEquals(null,userSettings.get('Location'));
    }
    @isTest
    public static void getUserSetttings_negative_runAs() {
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
            getUserSetttings_negative();
        }
    }
    

}