sfdx org:create:scratch -a invmgrscratchorg1 -d -f config/project-scratch-def.json -y 30

#sfdx force:source:push
sfdx project deploy start

sfdx force:user:permset:assign -n  Inventory_Management_full

sfdx data tree import -p data_invmgrnp/Plan.json

sfdx apex run -f config/create-demo-data-setup.apex

sfdx org open -p /lightning/o/invmgrnp__Location__c/list


#Deploy to Dev Org: Use -c to check only first
#If in SFDX format
#sfdx force:source:deploy -u invmgrpkgorg -m LightningComponentBundle
