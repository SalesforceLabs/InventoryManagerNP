sfdx force:org:create -a invmgrscratchorg1 -s -f config/project-scratch-def.json 

sfdx force:source:push

sfdx force:user:permset:assign -n  Inventory_Management_full

sfdx force:data:tree:import -p data/Plan.json

sfdx force:org:open -p /lightning/o/invmgrnp__Location__c/list
