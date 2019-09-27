sfdx force:org:create -a invmgrscratchorgpkgtest -s -f config/project-scratch-def.json -d 7

sfdx force:package:install --package 04t4T000001dLm8 -w 20 -s AllUsers

sfdx force:user:permset:assign -n  Inventory_Management_full

sfdx force:data:tree:import -p data/Plan.json

sfdx force:org:open -p /lightning/o/invmgrnp__Location__c/list
