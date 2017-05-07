"use strict";
function _toConsumableArray(arr) {
	if (Array.isArray(arr)) {
		for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
		return arr2
	}
	return Array.from(arr)
}
var ICA = ICA || {};
ICA.Services = ICA.Services || {}, function() {
	var services = [],
		components = [],
		serviceNamespace = ICA.Services;
	ICA.RegisterService = function(name, factory) {
		var isClass = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
		if ("" !== name && "function" == typeof factory) {
			if (components.indexOf(name) !== -1) return void console.error(name + " is already registred as a service");
			services.push({
				name: name,
				callback: factory,
				dependencies: getFunctionArgs(factory),
				arguments: [],
				isClass: isClass === !0
			})
		}
	}, ICA.RegisterComponent = function(componentName, factory) {
		if ("" !== componentName && "function" == typeof factory) {
			if (components.indexOf(componentName) !== -1) return void console.error(componentName + " is already registred as a component");
			components.push({
				componentName: componentName,
				component: factory
			})
		}
	};
	var initiateServices = function() {
			for (var _services = $.extend(!0, [], services); _services.length;) {
				var solvedDepCount = (_.sortBy(_services, function(s) {
					return -s.dependencies.length
				}), 0);
				if (_.forEachRight(_services, function(s, i) {
					0 !== s.dependencies.length && _.each(s.dependencies, function(d, i) {
						var depService = serviceNamespace[d];
						void 0 !== depService && (s.dependencies[i] = null, s.arguments[i] = depService)
					}), allDependenciesResolved(s.dependencies) && (s.isClass ? serviceNamespace[s.name] = new(Function.prototype.bind.apply(s.callback, [null].concat(_toConsumableArray(s.arguments)))) : serviceNamespace[s.name] = new function() {
						return s.callback.apply(this, s.arguments)
					}, _services.splice(i, 1), solvedDepCount++)
				}), 0 === solvedDepCount) return void console.error("Could not resolve all services. Service missing or circular dependency?", _services)
			}
			initiateComponents()
		},
		initiateComponents = function initiateComponents(e) {
			var $container = e ? $(e.target) : $(document);
			_.each(components, function(c) {
				var dependencies = getFunctionArgs(c.component);
				_.each(dependencies, function(d, i) {
					var serviceRegisterItem = findServiceRegisterItemByDependecy(d);
					dependencies[i] = serviceNamespace[serviceRegisterItem.name]
				});
				var Instance = c.component.apply(null, dependencies);
				$.fn[c.componentName] = function() {
					return this.each(function() {
						$.data(this, "component_" + c.componentName) || $.data(this, "component_" + c.componentName, new Instance(this))
					})
				};
				var capitalizedComponentName = _.upperFirst(c.componentName);
				$.fn["get" + capitalizedComponentName] = function() {
					return $(this).data("component_" + c.componentName)
				};
				var elementName = _.kebabCase(c.componentName),
					$elements = $(elementName + ",[" + elementName + "]", $container);
				$elements.length > 0 && $elements.each(function() {
					"function" == typeof $(this)[c.componentName] && "true" !== $(this).data(c.componentName + "registered") && ($(this)[c.componentName](), $(this).on("initiateComponents." + c.componentName, initiateComponents), $(this).data(c.componentName + "registered", "true"))
				})
			})
		},
		getFunctionArgs = function(func) {
			var args = func.toString().match(/function[^(]*\(([^)]*)\)/)[1];
			return args.split(",").map(function(arg) {
				return arg.replace(/\/\*.*\*\//, "").trim()
			}).filter(function(arg) {
				return arg
			})
		},
		allDependenciesResolved = function(deps) {
			return 0 === deps.length || _.every(deps, function(d) {
				return null === d
			})
		},
		findServiceRegisterItemByDependecy = function(dependency) {
			return _.find(services, function(s) {
				var serviceName = s.name;
				return serviceName === dependency
			})
		};
	$(function() {
		initiateServices()
	}), $(document).on("initiateComponents", initiateComponents)
}();
"use strict";
!
function() {
	var ComponentService = function(ServiceHelpers, SettingsService) {
			var _service = this;
			_service.FETCH_URL = "/DinnerPlanner/Services/LandingPageStructure/{id}", _service.components = null, _service.componentKey = "componentsCache", _service.filterGroupByPickedRecipes = function(groups) {
				return _.forEachRight(groups, function(g, i) {
					var hasGroups, hasComponents;
					g.groups && (groups[i].groups = _service.filterGroupByPickedRecipes(g.groups), hasGroups = groups[i].groups.length), g.components && (groups[i].components = _service.hasPickedRecipes(g.components), hasComponents = groups[i].components.length), hasComponents || hasGroups || groups.splice(i, 1)
				}), groups
			}, _service.hasPickedRecipes = function(components) {
				return _.filter(components, function(c) {
					return c.pickedRecipes && c.pickedRecipes.length > 0
				})
			}, _service.getPickedRecipes = function(groups, recipes) {
				return recipes = recipes || [], _.forEachRight(groups, function(g) {
					g.groups && (recipes = _service.getPickedRecipes(g.groups, recipes)), g.components && (recipes = recipes.concat(_service.pickedRecipes(g.components)))
				}), recipes
			}, _service.pickedRecipes = function(components) {
				var recipes = [];
				return _.each(components, function(c) {
					recipes = recipes.concat(c.pickedRecipes)
				}), recipes
			}, _service.findComponentById = function(groups, id) {
				var match = null;
				return _.each(groups, function(g) {
					var result;
					g.groups && g.groups.length > 0 && (result = _service.findComponentById(g.groups, id)), !result && g.components && g.components.length > 0 && (result = _.find(g.components, {
						id: id
					})), match = result ? result : match
				}), match
			}, _service.addCurrentPlannerIdToFetchUrl = function() {
				if (_service.FETCH_URL.indexOf("{id}") !== -1) {
					var settings = SettingsService.getSettings();
					_service.FETCH_URL = _service.FETCH_URL.replace("{id}", settings.plannerId)
				}
			};
			var service = {};
			return service.init = function() {
				return service
			}, service.fetchComponents = function() {
				_service.addCurrentPlannerIdToFetchUrl();
				var d = $.Deferred(),
					cache = ServiceHelpers.getCache(_service.componentKey);
				if (_service.components) d.resolve($.extend({}, _service.components));
				else if (cache) _service.components = cache, d.resolve($.extend({}, _service.components));
				else if (_service.isFetching) var x = 0,
					interval = setInterval(function() {
						_service.components && (d.resolve($.extend({}, _service.components)), clearInterval(interval)), x > 20 && (d.reject("Timeout. To many tries to fetch components"), clearInterval(interval)), x++
					}, 500);
				else _service.isFetching = !0, ServiceHelpers.fetchData(_service.FETCH_URL).done(function(data) {
					_service.isFetching = !1, _service.components = data, d.resolve($.extend({}, _service.components))
				}).fail(function(error) {
					_service.isFetching = !1, d.reject("Could not fetch components", error)
				});
				return d.promise()
			}, service.getComponentsFromCache = function() {
				return ServiceHelpers.getCache(_service.componentKey)
			}, service.getCacheLastModifiedDate = function() {
				return ServiceHelpers.getLastModified(_service.componentKey)
			}, service.getComponents = function() {
				return _service.components ? $.extend({}, _service.components) : (console.error("Components are not fetched yet"), !1)
			}, service.setComponents = function(components) {
				components ? _service.components = components : console.log("Cannot set empty components")
			}, service.getComponentsWithPickedRecipes = function(plannerId) {
				var d = $.Deferred();
				return $.when(service.fetchComponents(plannerId)).done(function(data) {
					var components = jQuery.extend(!0, [], data),
						filtered = _service.filterGroupByPickedRecipes(components);
					d.resolve(filtered)
				}).fail(function(message, error) {
					d.reject(message, error)
				}), d.promise()
			}, service.addPickedRecipe = function(componentId, recipe) {
				var component = _service.findComponentById(_service.components, componentId),
					settings = SettingsService.getSettings();
				if (component) {
					var recipeExists = _.find(component.pickedRecipes, {
						recipeId: recipe.recipeId
					});
					if (!recipeExists) return component.pickedRecipes.push(recipe), icadatalayer.add("dinnerPlannerEvent", {
						dinnerPlannerCategory: "Måltidsplanerare",
						dinnerPlannerName: settings.header,
						dinnerPlannerAction: "Lägg till recept",
						dinnerPlannerLabel: recipe.Title,
						dinnerPlannerRecipeType: component.name
					}), !0;
					console.warn("Recipe is already picked for this component")
				} else console.warn("Could not find component. Something is very wrong!");
				return !1
			}, service.removePickedRecipe = function(componentId, recipe) {
				var component = _service.findComponentById(_service.components, componentId),
					settings = SettingsService.getSettings();
				if (component) {
					var index = _.findIndex(component.pickedRecipes, {
						recipeId: recipe.recipeId
					});
					index !== -1 ? (component.pickedRecipes.splice(index, 1), icadatalayer.add("dinnerPlannerEvent", {
						dinnerPlannerCategory: "Måltidsplanerare",
						dinnerPlannerName: settings.header,
						dinnerPlannerAction: "Ta bort recept under dina val",
						dinnerPlannerLabel: recipe.Title,
						dinnerPlannerRecipeType: component.name
					})) : console.warn("Recipe could not be removed. Already removed?")
				} else console.warn("Could not find component. Something is very wrong!");
				return !1
			}, service.getComponentById = function(componentId) {
				var component = _service.findComponentById(_service.components, componentId);
				return component ? $.extend({}, component) : component
			}, service.clearComponentData = function() {
				_service.components = null
			}, service.saveToCache = function() {
				ServiceHelpers.setCache(_service.componentKey, _service.components)
			}, service.clearCache = function() {
				ServiceHelpers.clearCache(_service.componentKey)
			}, service.getPickedRecipesFromComponents = function(components) {
				return _service.getPickedRecipes(components || _service.components)
			}, service.init()
		};
	ICA.RegisterService("ComponentService", ComponentService)
}();
"use strict";
!
function() {
	var ServiceHelpers = function() {
			var _service = this;
			_service.storagePrefix = "DinnerPlanner", _service.storageId = null, _service.storageDisabled = !1, _service.cacheExists = !1, _service.setupCache = function() {
				var storage = localStorage.getItem(_service.storageId);
				storage = storage ? JSON.parse(storage) : {}, storage.cache = storage.cache || {}, storage.lastModified = storage.lastModified || {}, localStorage.setItem(_service.storageId, JSON.stringify(storage)), _service.cacheExists = !0, storage = localStorage.getItem(_service.storageId), null === storage && (_service.storageDisabled = !0)
			}, _service.checkIfCacheExists = function() {
				if (!_service.storageId) {
					var plannerId = ICA.Config.DinnerPlanner.plannerId || 0;
					_service.storageId = _service.storagePrefix + plannerId
				}
				var storage = localStorage.getItem(_service.storageId);
				return storage = storage ? JSON.parse(storage) : {}, void 0 !== storage.cache && void 0 !== storage.lastModified
			}, _service.setUpCacheIfNotExists = function() {
				_service.storageDisabled || _service.cacheExists || _service.storageDisabled || (_service.checkIfCacheExists() ? _service.cacheExists = !0 : _service.setupCache())
			}, _service.clearCache = function(key) {
				if (_service.storageDisabled || null === _service.storageId) return !1;
				if (void 0 !== key) {
					var storage = localStorage.getItem(_service.storageId);
					storage = JSON.parse(storage), delete storage.cache[key], localStorage.setItem(_service.storageId, JSON.stringify(storage))
				}
			}, _service.clearCacheAll = function() {
				return !_service.storageDisabled && null !== _service.storageId && void localStorage.removeItem(_service.storageId)
			}, _service.getCache = function(key) {
				if (_service.storageDisabled) return !1;
				_service.setUpCacheIfNotExists();
				var storage = localStorage.getItem(_service.storageId);
				return storage = JSON.parse(storage), storage.cache[key]
			}, _service.getLastModified = function(key) {
				if (_service.storageDisabled) return !1;
				_service.setUpCacheIfNotExists();
				var storage = localStorage.getItem(_service.storageId);
				return storage = JSON.parse(storage), storage.lastModified[key]
			}, _service.setCache = function(key, data) {
				if (_service.storageDisabled) return !1;
				_service.setUpCacheIfNotExists();
				var storage = localStorage.getItem(_service.storageId);
				storage = JSON.parse(storage), storage.lastModified[key] = (new Date).toString(), storage.cache[key] = data, localStorage.setItem(_service.storageId, JSON.stringify(storage))
			};
			var service = {};
			return service.init = function() {
				return void 0 !== window.localStorage && null !== window.localStorage || (_service.storageDisabled = !0), service
			}, service.fetchData = function(url, useCache, sync) {
				var cache = _service.getCache(url);
				if (cache && useCache) {
					var d = $.Deferred();
					return d.resolve(cache), d
				}
				return $.ajax({
					url: url,
					type: "GET",
					cache: !1,
					dataType: "json",
					async: !sync
				})
			}, service.postData = function(url, data) {
				return $.ajax({
					url: url,
					type: "POST",
					cache: !1,
					dataType: "json",
					data: data
				})
			}, service.getCache = function(key) {
				return _service.getCache(key)
			}, service.getLastModified = function(key) {
				return _service.getLastModified(key)
			}, service.setCache = function(key, data) {
				_service.setCache(key, data)
			}, service.clearCache = function(key) {
				_service.clearCache(key)
			}, service.clearCacheAll = function() {
				_service.clearCacheAll()
			}, service.init()
		};
	ICA.RegisterService("ServiceHelpers", ServiceHelpers)
}();
"use strict";
!
function() {
	var SettingsService = function(ServiceHelpers, Locale) {
			var _service = this;
			_service.FETCH_URL = "/DinnerPlanner/Services/LandingPageSetting/", _service.settings = null;
			var service = {};
			return service.init = function() {}, service.fetchSettings = function(plannerId) {
				var d = $.Deferred();
				return _service.settings ? d.resolve(_service.settings) : ServiceHelpers.fetchData(_service.FETCH_URL + plannerId).done(function(data) {
					_service.settings = data, _service.settings.plannerId = plannerId;
					var locale = {
						dinnerPlanner: data.locale
					};
					Locale.extendLocale(locale), d.resolve($.extend({}, _service.settings))
				}).fail(function(error) {
					d.reject("Could not fetch settings", error)
				}), d.promise()
			}, service.getSettings = function() {
				return _service.settings ? $.extend({}, _service.settings) : void console.error("Settings not fetched yet.")
			}, service
		};
	ICA.RegisterService("SettingsService", SettingsService)
}();
"use strict";
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
function(obj) {
	return typeof obj
} : function(obj) {
	return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
};
!
function() {
	var LocaleService = function(ServiceHelpers) {
			var _service = this;
			_service.locale = null, _service.extendLocale = function(locale) {
				"object" === ("undefined" == typeof locale ? "undefined" : _typeof(locale)) && ($.extend(!0, service.locale, locale), _service.addExtensionMethods())
			}, _service.extendLocaleByFile = function(file) {
				ServiceHelpers.fetchData(file, !0, !0).done(function(data) {
					_service.extendLocale(data)
				}).fail(function() {
					console.error("Could not fetch locale from " + file)
				})
			}, _service.addExtensionMethods = function() {
				service.locale.extendLocale = _service.extendLocale, service.locale.extendLocaleByFile = _service.extendLocaleByFile
			};
			var service = {};
			return service.locale = {}, service.init = function() {
				return _service.extendLocale(_service.locale), service.locale
			}, service.init()
		};
	ICA.RegisterService("Locale", LocaleService)
}();
"use strict";
!
function() {
	var GeolocationService = function() {
			var _service = this;
			_service.settings = null;
			var service = {};
			return service.init = function() {}, service.appendLocationAccessIfSet = function(info) {
				var hasAllowedLocationAccess = localStorage.getItem("hasAllowedLocationAccess");
				null !== hasAllowedLocationAccess && (info.allowedLocalization = hasAllowedLocationAccess)
			}, service.requestUserPosition = function(success, error, opts) {
				var options = $.extend({}, {
					enableHighAccuracy: !0,
					maximumAge: 3e5,
					timeout: 1e4
				}, opts);
				navigator.geolocation.getCurrentPosition(function(pos) {
					service.geoPosition = pos, success(pos)
				}, error, options)
			}, service.showGeoLocationErrorMessage = function(error) {
				var errorMessage = "";
				switch (error.code) {
				case error.PERMISSION_DENIED:
					break;
				case error.POSITION_UNAVAILABLE:
					errorMessage = "Vi kunde tyvärr inte hitta din position. Vänligen försök igen.";
					break;
				case error.TIMEOUT:
					errorMessage = "Vi kunde tyvärr inte hitta din position.. Vänligen försök igen."
				}
				if ("" !== errorMessage) {
					var modal = new ICA.Components.Modal;
					modal.removeOnClose = !0, modal.content.text(errorMessage), modal.open()
				}
			}, service
		};
	ICA.RegisterService("GeolocationService", GeolocationService)
}();