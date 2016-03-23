define(function(){
    var config = {};
    
    config.appName = "Startup Template";
    config.version = "0.1";
    var tabs = [{name: "main", label: "Main"}, 
                   {name: "download", label:"Download"},
                   {name: "document", label:"Documents", 
                    sub:[{name: "start", label:"Quick Start"},
                         {name: "api", label:"APIs"}]}
               ];
    var tabObject = function(name, title, parent, controller){
	var  children = [];
	Object.defineProperty(this, 'name', {
	    get: function() {
		return name;
	    }
	});
	Object.defineProperty(this, 'title', {
	    get: function() {
		return title;
	    }
	});
	Object.defineProperty(this, 'parent', {
	    get: function() {
    		return parent;
	    }
	});
	Object.defineProperty(this, 'controller', {
	    get: function() {
		return controller;
	    }
	});
	Object.defineProperty(this, 'children', {
	    get: function() {
		return children;
	    }
	});
	var addChild = function(child){
	    if(child instanceof tabObject){
		children.push(child);
	    }else if(Array.isArray(child)){
		child.forEach(function(value){
		    addChild(value);
		});
	    }
	};
	this.addChild = addChild;
    };
    
    var processTab = function(tabArray, parent){
	var tabs = [];
	for(var i in tabArray){
	    var tab = new tabObject(tabArray[i].name, tabArray[i].label, parent, tabArray[i].controller||tabArray[i].name);
	    tabs.push(tab);
	    if(tabArray[i].sub && tabArray[i].sub.length>0){
		var subs = processTab(tabArray[i].sub, tab);
		tab.addChild(subs);
	    }
	}
	return tabs;
    }
    config.tabs = processTab(tabs, null);
    return config;
});