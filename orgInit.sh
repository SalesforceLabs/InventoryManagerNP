sfdx force:org:create -a invmgrscratchorgpkgtest -s -f config/project-scratch-def.json -d 7

sfdx force:package:install --package 04t4T000001dHuU -w 20 

sfdx force:user:permset:assign -n  Inventory_Management_full

sfdx force:org:open p /lightning/n/invmgrnp__Inventory_Manager