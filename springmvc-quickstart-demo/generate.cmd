@echo off
mvn archetype:generate -DarchetypeCatalog=local -DarchetypeGroupId=com.heiliuer.webapp -DarchetypeArtifactId=springmvc-quickstart -DarchetypeVersion=1.0
::-DgroupId=com.heliuer -DartifactId=testMaven -DinteractiveMode=false
::
pause