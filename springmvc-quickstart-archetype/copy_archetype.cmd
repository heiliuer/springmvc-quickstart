@echo off
::xcopy .\* ..\springmvc-quickstart\src\main\resources\archetype-resources /s /e /Y
rmdir /s/q ..\springmvc-quickstart\src\main\resources\archetype-resources
robocopy . ..\springmvc-quickstart\src\main\resources\archetype-resources /s /e /XD node node_modules target bower_components /XF copy_archetype.cmd *.iml
pause