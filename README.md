*For those who just starting a trip on javascript but have no idea how to integrate popular libs like I was.*

## Prepare
Run your service with either Jetty or nodeJs, to test routing

###TabConfig
In _config.js_ file, tabs defined the tab label, state name, and controller path, url is defaultly set.
Literally, it could support infinity sub-tabs.

function _appendContext_ help append elements based on angularJs. 
It could support two level's tabs. So any tab defined but lower then level two will be ignored.

###Routing
By using 'resolve', it help load the controller and trigger a click event after successfully loaded.
If the controller have already loaded, just return, because we don't need to register a controller each time.
`resolve: {
                tabController: ['$state',function($state){
                    if(cache[this.data.state]) return;
                    var data = this.data;
                    return load(data).then(function(state){
                	    $("#"+state).click();
                    });
                }]
            },`

## requirejs+angularjs/example
This project shows how to set up a requirejs+angularjs-based website, with a proper routing menu tab.

