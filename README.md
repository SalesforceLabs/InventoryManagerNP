# Installation

Install from https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3A00000G0wILUAZ

## Configuration

Assign InvMgr permission set "Inventory Management (full)" for a user to get all the permission. Or you can create a new permission set to give permissions as needed.

### Usage

* Open "Inventory Manager" app
* Click "Inventory Manager" tab to start using the app

### Administrator

Objects: 
* Location__c: To store locations, You must attach a location to a user for items in that location to show up in the app
* Item__c: Link an item to an location (Which is linked to a user) for it to show up in the app
* Subtype__c: To store subtype of an item
* invmgrnp__Inventory_Manager__mdt (Custom Metadata Type): Edit "Log_Item_Actions" and enable "invmgrnp__isEnabled__c" to log ALL Item actions (Add/Remove). This is disabled by default to not store all the data.

Custom Metadata Type:
- Go to Setup -> Custom Metadata Types
- Click on "Inventory Manager"
- Click "Edit" on "Inventory Manager Layout"
- Move "isEnabled" field to the page layout
- Click "Save"
- Click "Manage Inventory Manager"
-- Click "Edit" on "Log Item Actions"
-- Enable/Disable "isEnabled" 
-- This will decide whether to log inventory actions in itemActions objects
- Click "Edit" on "Show Items in Locations without User"
-- Enable/Disable "isEnabled" 
-- This will show items from locations assigned to current user as well as items from ALL location which has no assigned users
-- This can be used to show same items to multiple users as long as location has no assigned user
