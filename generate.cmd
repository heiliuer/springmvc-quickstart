@echo off
mvn archetype:generate -DgroupId=x:y -DartifactId=testMaven -DinteractiveMode=false  -DarchetypeCatalog=local -DarchetypeGroupId=com.heiliuer.webapp -DarchetypeArtifactId=springmvc-quickstart -DarchetypeVersion=1.0
::
::
pause