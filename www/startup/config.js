define(function(){
    var config = {};
    
    config.appName = "Startup Template";
    config.version = "0.1";
    var tabs = [{name: "main", label: "Main", path: "main/controller"}, 
                   {name: "download", label:"Download"},
                   {name: "document", label:"Documents", 
                    sub:[{name: "start", label:"Quick Start"},
                         {name: "api", label:"APIs"}]}
               ];
    var tabObject = function(name, title, parent, path, view){
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
	Object.defineProperty(this, 'controllerPath', {
	    get: function() {
		return path || this.state.split("-").join("/")+"/controller";
	    }
	});
	Object.defineProperty(this, 'url', {
	    get: function() {
		return this.state.split("-").join("/");
	    }
	});
	Object.defineProperty(this, 'children', {
	    get: function() {
		return children;
	    }
	});
	
	Object.defineProperty(this, 'state', {
	    get: function() {
		var state = name;
		var up = parent;
		while(up){
		    state = up.name+'-'+state;
		    up = up.parent;
		}
		return state;
	    }
	});
	Object.defineProperty(this, 'view', {
	    get: function() {
		return view || this.state.split("-").join("/")+"/view.html";
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
	    var tab = new tabObject(tabArray[i].name, tabArray[i].label, parent, tabArray[i].path);
	    tabs.push(tab);
	    if(tabArray[i].sub && tabArray[i].sub.length>0){
		var subs = processTab(tabArray[i].sub, tab);
		tab.addChild(subs);
	    }
	}
	return tabs;
    };
    
    var appendContext = function(element, tabs){
	var _element = $(element);
	$('<li class="firstLevelLi navBar" ng-repeat="tab in tabs" id="{{tab.state}}" ng-click="tabClicked(tab)">\
		<span>{{tab.title}}</span>\
		<ul  class="secondLevel">\
		    <li class="secondLevelLi navBar" ng-repeat="child in tab.children" id="{{child.state}}" ng-click="tabClicked(child)"><span>{{child.title}}</span></li>\
		</ul>\
	   </li>').appendTo(_element);
	
    };
    
  
    config.tabs = processTab( tabs, null);
    appendContext($(".nav"), config.tabs);
    return config;
});