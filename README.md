*For those who just starting a trip on javascript but have no idea how to integrate popular libs like I was.*

## Prepare
Run your service with either Jetty or nodeJs to test, Or test it out here[http://sherryxueyingli.github.io/startup-template/www/startup/index.html#/main], check the script load information in your develop console.

###TabConfig
In _config.js_ file, 'tabs' defined the tab label, state name, and controller path, url will be set by default based on state name.
Literally, it could support infinity sub-tabs.

function _appendContext_ help append elements based on angularJs. 
It could support two level's tabs. So any tab defined but lower then level two will be ignored.

###Routing
By using 'resolve', it help load the controller module and use 'register' to inject the controller.
Note: app.controller() wouldn't work after app.bootstrap.
'Click' event must be triggered after successfully loaded.

If the controller have already loaded, resolve function will return directly, because we don't need to load file and register this controller each time.


## FYI
This project shows how to set up a requirejs+angularjs-based website, with a proper routing menu tab.


