@echo off

set artifactId=demo
set groupId=com.heiliuer

IF NOT EXIST %artifactId% GOTO NOWINDIR
echo %artifactId% file exist!
GOTO END
:NOWINDIR
mvn archetype:generate ^
    -DarchetypeCatalog=local ^
    -DarchetypeGroupId=com.heiliuer.webapp ^
    -DarchetypeArtifactId=springmvc-quickstart ^
    -DarchetypeVersion=1.0 ^
    -DgroupId=%artifactId% ^
    -DartifactId=%artifactId% ^
    -DinteractiveMode=false
:END
pause