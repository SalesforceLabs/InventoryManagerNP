sfdx force:org:create -a invmgrscratchorgpkgtest -s -f config/project-scratch-def.json -d 7

#v1.8
sfdx force:package:install -p 04t4T000001dPrK -w 20

sfdx force:user:permset:assign -n  Inventory_Management_full

sfdx force:data:tree:import -p data/Plan.json

sfdx force:apex:execute -f config/create-demo-data-setup.apex

sfdx force:org:open -p /lightning/o/invmgrnp__Location__c/list


#Deploy to Dev Org: Use -c to check only first
#If in SFDX format
#sfdx force:source:deploy -u invmgrpkgorg -m LightningComponentBundle
