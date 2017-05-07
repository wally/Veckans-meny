var ICA = ICA || {};
!
function() {
	"use strict";
	ICA.Config = ICA.Config || {}, ICA.Config.DinnerPlanner = {
		localeDirectory: "/Templates/DinnerPlanner/Views/Locale/",
		localeFileExt: ".json"
	}
}();
!
function(factory) {
	"function" == typeof define && define.amd ? define(["jquery"], factory) : factory(jQuery)
}(function($) {
	function focusable(element, isTabIndexNotNaN) {
		var map, mapName, img, nodeName = element.nodeName.toLowerCase();
		return "area" === nodeName ? (map = element.parentNode, mapName = map.name, !(!element.href || !mapName || "map" !== map.nodeName.toLowerCase()) && (img = $("img[usemap='#" + mapName + "']")[0], !! img && visible(img))) : (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled : "a" === nodeName ? element.href || isTabIndexNotNaN : isTabIndexNotNaN) && visible(element)
	}
	function visible(element) {
		return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function() {
			return "hidden" === $.css(this, "visibility")
		}).length
	}
	function datepicker_getZindex(elem) {
		for (var position, value; elem.length && elem[0] !== document;) {
			if (position = elem.css("position"), ("absolute" === position || "relative" === position || "fixed" === position) && (value = parseInt(elem.css("zIndex"), 10), !isNaN(value) && 0 !== value)) return value;
			elem = elem.parent()
		}
		return 0
	}
	function Datepicker() {
		this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
			closeText: "Done",
			prevText: "Prev",
			nextText: "Next",
			currentText: "Today",
			monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			weekHeader: "Wk",
			dateFormat: "mm/dd/yy",
			firstDay: 0,
			isRTL: !1,
			showMonthAfterYear: !1,
			yearSuffix: ""
		}, this._defaults = {
			showOn: "focus",
			showAnim: "fadeIn",
			showOptions: {},
			defaultDate: null,
			appendText: "",
			buttonText: "...",
			buttonImage: "",
			buttonImageOnly: !1,
			hideIfNoPrevNext: !1,
			navigationAsDateFormat: !1,
			gotoCurrent: !1,
			changeMonth: !1,
			changeYear: !1,
			yearRange: "c-10:c+10",
			showOtherMonths: !1,
			selectOtherMonths: !1,
			showWeek: !1,
			calculateWeek: this.iso8601Week,
			shortYearCutoff: "+10",
			minDate: null,
			maxDate: null,
			duration: "fast",
			beforeShowDay: null,
			beforeShow: null,
			onSelect: null,
			onChangeMonthYear: null,
			onClose: null,
			numberOfMonths: 1,
			showCurrentAtPos: 0,
			stepMonths: 1,
			stepBigMonths: 12,
			altField: "",
			altFormat: "",
			constrainInput: !0,
			showButtonPanel: !1,
			autoSize: !1,
			disabled: !1
		}, $.extend(this._defaults, this.regional[""]), this.regional.en = $.extend(!0, {}, this.regional[""]), this.regional["en-US"] = $.extend(!0, {}, this.regional.en), this.dpDiv = datepicker_bindHover($("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
	}
	function datepicker_bindHover(dpDiv) {
		var selector = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
		return dpDiv.delegate(selector, "mouseout", function() {
			$(this).removeClass("ui-state-hover"), this.className.indexOf("ui-datepicker-prev") !== -1 && $(this).removeClass("ui-datepicker-prev-hover"), this.className.indexOf("ui-datepicker-next") !== -1 && $(this).removeClass("ui-datepicker-next-hover")
		}).delegate(selector, "mouseover", datepicker_handleMouseover)
	}
	function datepicker_handleMouseover() {
		$.datepicker._isDisabledDatepicker(datepicker_instActive.inline ? datepicker_instActive.dpDiv.parent()[0] : datepicker_instActive.input[0]) || ($(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), $(this).addClass("ui-state-hover"), this.className.indexOf("ui-datepicker-prev") !== -1 && $(this).addClass("ui-datepicker-prev-hover"), this.className.indexOf("ui-datepicker-next") !== -1 && $(this).addClass("ui-datepicker-next-hover"))
	}
	function datepicker_extendRemove(target, props) {
		$.extend(target, props);
		for (var name in props) null == props[name] && (target[name] = props[name]);
		return target
	}
	function spinner_modifier(fn) {
		return function() {
			var previous = this.element.val();
			fn.apply(this, arguments), this._refresh(), previous !== this.element.val() && this._trigger("change")
		}
	}
	$.ui = $.ui || {}, $.extend($.ui, {
		version: "1.11.1",
		keyCode: {
			BACKSPACE: 8,
			COMMA: 188,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			LEFT: 37,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SPACE: 32,
			TAB: 9,
			UP: 38
		}
	}), $.fn.extend({
		scrollParent: function(includeHidden) {
			var position = this.css("position"),
				excludeStaticParent = "absolute" === position,
				overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
				scrollParent = this.parents().filter(function() {
					var parent = $(this);
					return (!excludeStaticParent || "static" !== parent.css("position")) && overflowRegex.test(parent.css("overflow") + parent.css("overflow-y") + parent.css("overflow-x"))
				}).eq(0);
			return "fixed" !== position && scrollParent.length ? scrollParent : $(this[0].ownerDocument || document)
		},
		uniqueId: function() {
			var uuid = 0;
			return function() {
				return this.each(function() {
					this.id || (this.id = "ui-id-" + ++uuid)
				})
			}
		}(),
		removeUniqueId: function() {
			return this.each(function() {
				/^ui-id-\d+$/.test(this.id) && $(this).removeAttr("id")
			})
		}
	}), $.extend($.expr[":"], {
		data: $.expr.createPseudo ? $.expr.createPseudo(function(dataName) {
			return function(elem) {
				return !!$.data(elem, dataName)
			}
		}) : function(elem, i, match) {
			return !!$.data(elem, match[3])
		},
		focusable: function(element) {
			return focusable(element, !isNaN($.attr(element, "tabindex")))
		},
		tabbable: function(element) {
			var tabIndex = $.attr(element, "tabindex"),
				isTabIndexNaN = isNaN(tabIndex);
			return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN)
		}
	}), $("<a>").outerWidth(1).jquery || $.each(["Width", "Height"], function(i, name) {
		function reduce(elem, size, border, margin) {
			return $.each(side, function() {
				size -= parseFloat($.css(elem, "padding" + this)) || 0, border && (size -= parseFloat($.css(elem, "border" + this + "Width")) || 0), margin && (size -= parseFloat($.css(elem, "margin" + this)) || 0)
			}), size
		}
		var side = "Width" === name ? ["Left", "Right"] : ["Top", "Bottom"],
			type = name.toLowerCase(),
			orig = {
				innerWidth: $.fn.innerWidth,
				innerHeight: $.fn.innerHeight,
				outerWidth: $.fn.outerWidth,
				outerHeight: $.fn.outerHeight
			};
		$.fn["inner" + name] = function(size) {
			return void 0 === size ? orig["inner" + name].call(this) : this.each(function() {
				$(this).css(type, reduce(this, size) + "px")
			})
		}, $.fn["outer" + name] = function(size, margin) {
			return "number" != typeof size ? orig["outer" + name].call(this, size) : this.each(function() {
				$(this).css(type, reduce(this, size, !0, margin) + "px")
			})
		}
	}), $.fn.addBack || ($.fn.addBack = function(selector) {
		return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector))
	}), $("<a>").data("a-b", "a").removeData("a-b").data("a-b") && ($.fn.removeData = function(removeData) {
		return function(key) {
			return arguments.length ? removeData.call(this, $.camelCase(key)) : removeData.call(this)
		}
	}($.fn.removeData)), $.ui.ie = !! /msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), $.fn.extend({
		focus: function(orig) {
			return function(delay, fn) {
				return "number" == typeof delay ? this.each(function() {
					var elem = this;
					setTimeout(function() {
						$(elem).focus(), fn && fn.call(elem)
					}, delay)
				}) : orig.apply(this, arguments)
			}
		}($.fn.focus),
		disableSelection: function() {
			var eventType = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
			return function() {
				return this.bind(eventType + ".ui-disableSelection", function(event) {
					event.preventDefault()
				})
			}
		}(),
		enableSelection: function() {
			return this.unbind(".ui-disableSelection")
		},
		zIndex: function(zIndex) {
			if (void 0 !== zIndex) return this.css("zIndex", zIndex);
			if (this.length) for (var position, value, elem = $(this[0]); elem.length && elem[0] !== document;) {
				if (position = elem.css("position"), ("absolute" === position || "relative" === position || "fixed" === position) && (value = parseInt(elem.css("zIndex"), 10), !isNaN(value) && 0 !== value)) return value;
				elem = elem.parent()
			}
			return 0
		}
	}), $.ui.plugin = {
		add: function(module, option, set) {
			var i, proto = $.ui[module].prototype;
			for (i in set) proto.plugins[i] = proto.plugins[i] || [], proto.plugins[i].push([option, set[i]])
		},
		call: function(instance, name, args, allowDisconnected) {
			var i, set = instance.plugins[name];
			if (set && (allowDisconnected || instance.element[0].parentNode && 11 !== instance.element[0].parentNode.nodeType)) for (i = 0; i < set.length; i++) instance.options[set[i][0]] && set[i][1].apply(instance.element, args)
		}
	};
	var widget_uuid = 0,
		widget_slice = Array.prototype.slice;
	$.cleanData = function(orig) {
		return function(elems) {
			var events, elem, i;
			for (i = 0; null != (elem = elems[i]); i++) try {
				events = $._data(elem, "events"), events && events.remove && $(elem).triggerHandler("remove")
			} catch (e) {}
			orig(elems)
		}
	}($.cleanData), $.widget = function(name, base, prototype) {
		var fullName, existingConstructor, constructor, basePrototype, proxiedPrototype = {},
			namespace = name.split(".")[0];
		return name = name.split(".")[1], fullName = namespace + "-" + name, prototype || (prototype = base, base = $.Widget), $.expr[":"][fullName.toLowerCase()] = function(elem) {
			return !!$.data(elem, fullName)
		}, $[namespace] = $[namespace] || {}, existingConstructor = $[namespace][name], constructor = $[namespace][name] = function(options, element) {
			return this._createWidget ? void(arguments.length && this._createWidget(options, element)) : new constructor(options, element)
		}, $.extend(constructor, existingConstructor, {
			version: prototype.version,
			_proto: $.extend({}, prototype),
			_childConstructors: []
		}), basePrototype = new base, basePrototype.options = $.widget.extend({}, basePrototype.options), $.each(prototype, function(prop, value) {
			return $.isFunction(value) ? void(proxiedPrototype[prop] = function() {
				var _super = function() {
						return base.prototype[prop].apply(this, arguments)
					},
					_superApply = function(args) {
						return base.prototype[prop].apply(this, args)
					};
				return function() {
					var returnValue, __super = this._super,
						__superApply = this._superApply;
					return this._super = _super, this._superApply = _superApply, returnValue = value.apply(this, arguments), this._super = __super, this._superApply = __superApply, returnValue
				}
			}()) : void(proxiedPrototype[prop] = value)
		}), constructor.prototype = $.widget.extend(basePrototype, {
			widgetEventPrefix: existingConstructor ? basePrototype.widgetEventPrefix || name : name
		}, proxiedPrototype, {
			constructor: constructor,
			namespace: namespace,
			widgetName: name,
			widgetFullName: fullName
		}), existingConstructor ? ($.each(existingConstructor._childConstructors, function(i, child) {
			var childPrototype = child.prototype;
			$.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto)
		}), delete existingConstructor._childConstructors) : base._childConstructors.push(constructor), $.widget.bridge(name, constructor), constructor
	}, $.widget.extend = function(target) {
		for (var key, value, input = widget_slice.call(arguments, 1), inputIndex = 0, inputLength = input.length; inputIndex < inputLength; inputIndex++) for (key in input[inputIndex]) value = input[inputIndex][key], input[inputIndex].hasOwnProperty(key) && void 0 !== value && ($.isPlainObject(value) ? target[key] = $.isPlainObject(target[key]) ? $.widget.extend({}, target[key], value) : $.widget.extend({}, value) : target[key] = value);
		return target
	}, $.widget.bridge = function(name, object) {
		var fullName = object.prototype.widgetFullName || name;
		$.fn[name] = function(options) {
			var isMethodCall = "string" == typeof options,
				args = widget_slice.call(arguments, 1),
				returnValue = this;
			return options = !isMethodCall && args.length ? $.widget.extend.apply(null, [options].concat(args)) : options, isMethodCall ? this.each(function() {
				var methodValue, instance = $.data(this, fullName);
				return "instance" === options ? (returnValue = instance, !1) : instance ? $.isFunction(instance[options]) && "_" !== options.charAt(0) ? (methodValue = instance[options].apply(instance, args), methodValue !== instance && void 0 !== methodValue ? (returnValue = methodValue && methodValue.jquery ? returnValue.pushStack(methodValue.get()) : methodValue, !1) : void 0) : $.error("no such method '" + options + "' for " + name + " widget instance") : $.error("cannot call methods on " + name + " prior to initialization; attempted to call method '" + options + "'")
			}) : this.each(function() {
				var instance = $.data(this, fullName);
				instance ? (instance.option(options || {}), instance._init && instance._init()) : $.data(this, fullName, new object(options, this))
			}), returnValue
		}
	}, $.Widget = function() {}, $.Widget._childConstructors = [], $.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		defaultElement: "<div>",
		options: {
			disabled: !1,
			create: null
		},
		_createWidget: function(options, element) {
			element = $(element || this.defaultElement || this)[0], this.element = $(element), this.uuid = widget_uuid++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = $.widget.extend({}, this.options, this._getCreateOptions(), options), this.bindings = $(), this.hoverable = $(), this.focusable = $(), element !== this && ($.data(element, this.widgetFullName, this), this._on(!0, this.element, {
				remove: function(event) {
					event.target === element && this.destroy()
				}
			}), this.document = $(element.style ? element.ownerDocument : element.document || element), this.window = $(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
		},
		_getCreateOptions: $.noop,
		_getCreateEventData: $.noop,
		_create: $.noop,
		_init: $.noop,
		destroy: function() {
			this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData($.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
		},
		_destroy: $.noop,
		widget: function() {
			return this.element
		},
		option: function(key, value) {
			var parts, curOption, i, options = key;
			if (0 === arguments.length) return $.widget.extend({}, this.options);
			if ("string" == typeof key) if (options = {}, parts = key.split("."), key = parts.shift(), parts.length) {
				for (curOption = options[key] = $.widget.extend({}, this.options[key]), i = 0; i < parts.length - 1; i++) curOption[parts[i]] = curOption[parts[i]] || {}, curOption = curOption[parts[i]];
				if (key = parts.pop(), 1 === arguments.length) return void 0 === curOption[key] ? null : curOption[key];
				curOption[key] = value
			} else {
				if (1 === arguments.length) return void 0 === this.options[key] ? null : this.options[key];
				options[key] = value
			}
			return this._setOptions(options), this
		},
		_setOptions: function(options) {
			var key;
			for (key in options) this._setOption(key, options[key]);
			return this
		},
		_setOption: function(key, value) {
			return this.options[key] = value, "disabled" === key && (this.widget().toggleClass(this.widgetFullName + "-disabled", !! value), value && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
		},
		enable: function() {
			return this._setOptions({
				disabled: !1
			})
		},
		disable: function() {
			return this._setOptions({
				disabled: !0
			})
		},
		_on: function(suppressDisabledCheck, element, handlers) {
			var delegateElement, instance = this;
			"boolean" != typeof suppressDisabledCheck && (handlers = element, element = suppressDisabledCheck, suppressDisabledCheck = !1), handlers ? (element = delegateElement = $(element), this.bindings = this.bindings.add(element)) : (handlers = element, element = this.element, delegateElement = this.widget()), $.each(handlers, function(event, handler) {
				function handlerProxy() {
					if (suppressDisabledCheck || instance.options.disabled !== !0 && !$(this).hasClass("ui-state-disabled")) return ("string" == typeof handler ? instance[handler] : handler).apply(instance, arguments)
				}
				"string" != typeof handler && (handlerProxy.guid = handler.guid = handler.guid || handlerProxy.guid || $.guid++);
				var match = event.match(/^([\w:-]*)\s*(.*)$/),
					eventName = match[1] + instance.eventNamespace,
					selector = match[2];
				selector ? delegateElement.delegate(selector, eventName, handlerProxy) : element.bind(eventName, handlerProxy)
			})
		},
		_off: function(element, eventName) {
			eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, element.unbind(eventName).undelegate(eventName)
		},
		_delay: function(handler, delay) {
			function handlerProxy() {
				return ("string" == typeof handler ? instance[handler] : handler).apply(instance, arguments)
			}
			var instance = this;
			return setTimeout(handlerProxy, delay || 0)
		},
		_hoverable: function(element) {
			this.hoverable = this.hoverable.add(element), this._on(element, {
				mouseenter: function(event) {
					$(event.currentTarget).addClass("ui-state-hover")
				},
				mouseleave: function(event) {
					$(event.currentTarget).removeClass("ui-state-hover")
				}
			})
		},
		_focusable: function(element) {
			this.focusable = this.focusable.add(element), this._on(element, {
				focusin: function(event) {
					$(event.currentTarget).addClass("ui-state-focus")
				},
				focusout: function(event) {
					$(event.currentTarget).removeClass("ui-state-focus")
				}
			})
		},
		_trigger: function(type, event, data) {
			var prop, orig, callback = this.options[type];
			if (data = data || {}, event = $.Event(event), event.type = (type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type).toLowerCase(), event.target = this.element[0], orig = event.originalEvent) for (prop in orig) prop in event || (event[prop] = orig[prop]);
			return this.element.trigger(event, data), !($.isFunction(callback) && callback.apply(this.element[0], [event].concat(data)) === !1 || event.isDefaultPrevented())
		}
	}, $.each({
		show: "fadeIn",
		hide: "fadeOut"
	}, function(method, defaultEffect) {
		$.Widget.prototype["_" + method] = function(element, options, callback) {
			"string" == typeof options && (options = {
				effect: options
			});
			var hasOptions, effectName = options ? options === !0 || "number" == typeof options ? defaultEffect : options.effect || defaultEffect : method;
			options = options || {}, "number" == typeof options && (options = {
				duration: options
			}), hasOptions = !$.isEmptyObject(options), options.complete = callback, options.delay && element.delay(options.delay), hasOptions && $.effects && $.effects.effect[effectName] ? element[method](options) : effectName !== method && element[effectName] ? element[effectName](options.duration, options.easing, callback) : element.queue(function(next) {
				$(this)[method](), callback && callback.call(element[0]), next()
			})
		}
	});
	var mouseHandled = ($.widget, !1);
	$(document).mouseup(function() {
		mouseHandled = !1
	});
	$.widget("ui.mouse", {
		version: "1.11.1",
		options: {
			cancel: "input,textarea,button,select,option",
			distance: 1,
			delay: 0
		},
		_mouseInit: function() {
			var that = this;
			this.element.bind("mousedown." + this.widgetName, function(event) {
				return that._mouseDown(event)
			}).bind("click." + this.widgetName, function(event) {
				if (!0 === $.data(event.target, that.widgetName + ".preventClickEvent")) return $.removeData(event.target, that.widgetName + ".preventClickEvent"), event.stopImmediatePropagation(), !1
			}), this.started = !1
		},
		_mouseDestroy: function() {
			this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
		},
		_mouseDown: function(event) {
			if (!mouseHandled) {
				this._mouseStarted && this._mouseUp(event), this._mouseDownEvent = event;
				var that = this,
					btnIsLeft = 1 === event.which,
					elIsCancel = !("string" != typeof this.options.cancel || !event.target.nodeName) && $(event.target).closest(this.options.cancel).length;
				return !(btnIsLeft && !elIsCancel && this._mouseCapture(event)) || (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
					that.mouseDelayMet = !0
				}, this.options.delay)), this._mouseDistanceMet(event) && this._mouseDelayMet(event) && (this._mouseStarted = this._mouseStart(event) !== !1, !this._mouseStarted) ? (event.preventDefault(), !0) : (!0 === $.data(event.target, this.widgetName + ".preventClickEvent") && $.removeData(event.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(event) {
					return that._mouseMove(event)
				}, this._mouseUpDelegate = function(event) {
					return that._mouseUp(event)
				}, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), event.preventDefault(), mouseHandled = !0, !0))
			}
		},
		_mouseMove: function(event) {
			return $.ui.ie && (!document.documentMode || document.documentMode < 9) && !event.button ? this._mouseUp(event) : event.which ? this._mouseStarted ? (this._mouseDrag(event), event.preventDefault()) : (this._mouseDistanceMet(event) && this._mouseDelayMet(event) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, event) !== !1, this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event)), !this._mouseStarted) : this._mouseUp(event)
		},
		_mouseUp: function(event) {
			return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, event.target === this._mouseDownEvent.target && $.data(event.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(event)), mouseHandled = !1, !1
		},
		_mouseDistanceMet: function(event) {
			return Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX), Math.abs(this._mouseDownEvent.pageY - event.pageY)) >= this.options.distance
		},
		_mouseDelayMet: function() {
			return this.mouseDelayMet
		},
		_mouseStart: function() {},
		_mouseDrag: function() {},
		_mouseStop: function() {},
		_mouseCapture: function() {
			return !0
		}
	});
	!
	function() {
		function getOffsets(offsets, width, height) {
			return [parseFloat(offsets[0]) * (rpercent.test(offsets[0]) ? width / 100 : 1), parseFloat(offsets[1]) * (rpercent.test(offsets[1]) ? height / 100 : 1)]
		}
		function parseCss(element, property) {
			return parseInt($.css(element, property), 10) || 0
		}
		function getDimensions(elem) {
			var raw = elem[0];
			return 9 === raw.nodeType ? {
				width: elem.width(),
				height: elem.height(),
				offset: {
					top: 0,
					left: 0
				}
			} : $.isWindow(raw) ? {
				width: elem.width(),
				height: elem.height(),
				offset: {
					top: elem.scrollTop(),
					left: elem.scrollLeft()
				}
			} : raw.preventDefault ? {
				width: 0,
				height: 0,
				offset: {
					top: raw.pageY,
					left: raw.pageX
				}
			} : {
				width: elem.outerWidth(),
				height: elem.outerHeight(),
				offset: elem.offset()
			}
		}
		$.ui = $.ui || {};
		var cachedScrollbarWidth, supportsOffsetFractions, max = Math.max,
			abs = Math.abs,
			round = Math.round,
			rhorizontal = /left|center|right/,
			rvertical = /top|center|bottom/,
			roffset = /[\+\-]\d+(\.[\d]+)?%?/,
			rposition = /^\w+/,
			rpercent = /%$/,
			_position = $.fn.position;
		$.position = {
			scrollbarWidth: function() {
				if (void 0 !== cachedScrollbarWidth) return cachedScrollbarWidth;
				var w1, w2, div = $("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
					innerDiv = div.children()[0];
				return $("body").append(div), w1 = innerDiv.offsetWidth, div.css("overflow", "scroll"), w2 = innerDiv.offsetWidth, w1 === w2 && (w2 = div[0].clientWidth), div.remove(), cachedScrollbarWidth = w1 - w2
			},
			getScrollInfo: function(within) {
				var overflowX = within.isWindow || within.isDocument ? "" : within.element.css("overflow-x"),
					overflowY = within.isWindow || within.isDocument ? "" : within.element.css("overflow-y"),
					hasOverflowX = "scroll" === overflowX || "auto" === overflowX && within.width < within.element[0].scrollWidth,
					hasOverflowY = "scroll" === overflowY || "auto" === overflowY && within.height < within.element[0].scrollHeight;
				return {
					width: hasOverflowY ? $.position.scrollbarWidth() : 0,
					height: hasOverflowX ? $.position.scrollbarWidth() : 0
				}
			},
			getWithinInfo: function(element) {
				var withinElement = $(element || window),
					isWindow = $.isWindow(withinElement[0]),
					isDocument = !! withinElement[0] && 9 === withinElement[0].nodeType;
				return {
					element: withinElement,
					isWindow: isWindow,
					isDocument: isDocument,
					offset: withinElement.offset() || {
						left: 0,
						top: 0
					},
					scrollLeft: withinElement.scrollLeft(),
					scrollTop: withinElement.scrollTop(),
					width: isWindow || isDocument ? withinElement.width() : withinElement.outerWidth(),
					height: isWindow || isDocument ? withinElement.height() : withinElement.outerHeight()
				}
			}
		}, $.fn.position = function(options) {
			if (!options || !options.of) return _position.apply(this, arguments);
			options = $.extend({}, options);
			var atOffset, targetWidth, targetHeight, targetOffset, basePosition, dimensions, target = $(options.of),
				within = $.position.getWithinInfo(options.within),
				scrollInfo = $.position.getScrollInfo(within),
				collision = (options.collision || "flip").split(" "),
				offsets = {};
			return dimensions = getDimensions(target), target[0].preventDefault && (options.at = "left top"), targetWidth = dimensions.width, targetHeight = dimensions.height, targetOffset = dimensions.offset, basePosition = $.extend({}, targetOffset), $.each(["my", "at"], function() {
				var horizontalOffset, verticalOffset, pos = (options[this] || "").split(" ");
				1 === pos.length && (pos = rhorizontal.test(pos[0]) ? pos.concat(["center"]) : rvertical.test(pos[0]) ? ["center"].concat(pos) : ["center", "center"]), pos[0] = rhorizontal.test(pos[0]) ? pos[0] : "center", pos[1] = rvertical.test(pos[1]) ? pos[1] : "center", horizontalOffset = roffset.exec(pos[0]), verticalOffset = roffset.exec(pos[1]), offsets[this] = [horizontalOffset ? horizontalOffset[0] : 0, verticalOffset ? verticalOffset[0] : 0], options[this] = [rposition.exec(pos[0])[0], rposition.exec(pos[1])[0]]
			}), 1 === collision.length && (collision[1] = collision[0]), "right" === options.at[0] ? basePosition.left += targetWidth : "center" === options.at[0] && (basePosition.left += targetWidth / 2), "bottom" === options.at[1] ? basePosition.top += targetHeight : "center" === options.at[1] && (basePosition.top += targetHeight / 2), atOffset = getOffsets(offsets.at, targetWidth, targetHeight), basePosition.left += atOffset[0], basePosition.top += atOffset[1], this.each(function() {
				var collisionPosition, using, elem = $(this),
					elemWidth = elem.outerWidth(),
					elemHeight = elem.outerHeight(),
					marginLeft = parseCss(this, "marginLeft"),
					marginTop = parseCss(this, "marginTop"),
					collisionWidth = elemWidth + marginLeft + parseCss(this, "marginRight") + scrollInfo.width,
					collisionHeight = elemHeight + marginTop + parseCss(this, "marginBottom") + scrollInfo.height,
					position = $.extend({}, basePosition),
					myOffset = getOffsets(offsets.my, elem.outerWidth(), elem.outerHeight());
				"right" === options.my[0] ? position.left -= elemWidth : "center" === options.my[0] && (position.left -= elemWidth / 2), "bottom" === options.my[1] ? position.top -= elemHeight : "center" === options.my[1] && (position.top -= elemHeight / 2), position.left += myOffset[0], position.top += myOffset[1], supportsOffsetFractions || (position.left = round(position.left), position.top = round(position.top)), collisionPosition = {
					marginLeft: marginLeft,
					marginTop: marginTop
				}, $.each(["left", "top"], function(i, dir) {
					$.ui.position[collision[i]] && $.ui.position[collision[i]][dir](position, {
						targetWidth: targetWidth,
						targetHeight: targetHeight,
						elemWidth: elemWidth,
						elemHeight: elemHeight,
						collisionPosition: collisionPosition,
						collisionWidth: collisionWidth,
						collisionHeight: collisionHeight,
						offset: [atOffset[0] + myOffset[0], atOffset[1] + myOffset[1]],
						my: options.my,
						at: options.at,
						within: within,
						elem: elem
					})
				}), options.using && (using = function(props) {
					var left = targetOffset.left - position.left,
						right = left + targetWidth - elemWidth,
						top = targetOffset.top - position.top,
						bottom = top + targetHeight - elemHeight,
						feedback = {
							target: {
								element: target,
								left: targetOffset.left,
								top: targetOffset.top,
								width: targetWidth,
								height: targetHeight
							},
							element: {
								element: elem,
								left: position.left,
								top: position.top,
								width: elemWidth,
								height: elemHeight
							},
							horizontal: right < 0 ? "left" : left > 0 ? "right" : "center",
							vertical: bottom < 0 ? "top" : top > 0 ? "bottom" : "middle"
						};
					targetWidth < elemWidth && abs(left + right) < targetWidth && (feedback.horizontal = "center"), targetHeight < elemHeight && abs(top + bottom) < targetHeight && (feedback.vertical = "middle"), max(abs(left), abs(right)) > max(abs(top), abs(bottom)) ? feedback.important = "horizontal" : feedback.important = "vertical", options.using.call(this, props, feedback)
				}), elem.offset($.extend(position, {
					using: using
				}))
			})
		}, $.ui.position = {
			fit: {
				left: function(position, data) {
					var newOverRight, within = data.within,
						withinOffset = within.isWindow ? within.scrollLeft : within.offset.left,
						outerWidth = within.width,
						collisionPosLeft = position.left - data.collisionPosition.marginLeft,
						overLeft = withinOffset - collisionPosLeft,
						overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset;
					data.collisionWidth > outerWidth ? overLeft > 0 && overRight <= 0 ? (newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset, position.left += overLeft - newOverRight) : overRight > 0 && overLeft <= 0 ? position.left = withinOffset : overLeft > overRight ? position.left = withinOffset + outerWidth - data.collisionWidth : position.left = withinOffset : overLeft > 0 ? position.left += overLeft : overRight > 0 ? position.left -= overRight : position.left = max(position.left - collisionPosLeft, position.left)
				},
				top: function(position, data) {
					var newOverBottom, within = data.within,
						withinOffset = within.isWindow ? within.scrollTop : within.offset.top,
						outerHeight = data.within.height,
						collisionPosTop = position.top - data.collisionPosition.marginTop,
						overTop = withinOffset - collisionPosTop,
						overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset;
					data.collisionHeight > outerHeight ? overTop > 0 && overBottom <= 0 ? (newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset, position.top += overTop - newOverBottom) : overBottom > 0 && overTop <= 0 ? position.top = withinOffset : overTop > overBottom ? position.top = withinOffset + outerHeight - data.collisionHeight : position.top = withinOffset : overTop > 0 ? position.top += overTop : overBottom > 0 ? position.top -= overBottom : position.top = max(position.top - collisionPosTop, position.top)
				}
			},
			flip: {
				left: function(position, data) {
					var newOverRight, newOverLeft, within = data.within,
						withinOffset = within.offset.left + within.scrollLeft,
						outerWidth = within.width,
						offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,
						collisionPosLeft = position.left - data.collisionPosition.marginLeft,
						overLeft = collisionPosLeft - offsetLeft,
						overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
						myOffset = "left" === data.my[0] ? -data.elemWidth : "right" === data.my[0] ? data.elemWidth : 0,
						atOffset = "left" === data.at[0] ? data.targetWidth : "right" === data.at[0] ? -data.targetWidth : 0,
						offset = -2 * data.offset[0];
					overLeft < 0 ? (newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset, (newOverRight < 0 || newOverRight < abs(overLeft)) && (position.left += myOffset + atOffset + offset)) : overRight > 0 && (newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft, (newOverLeft > 0 || abs(newOverLeft) < overRight) && (position.left += myOffset + atOffset + offset))
				},
				top: function(position, data) {
					var newOverTop, newOverBottom, within = data.within,
						withinOffset = within.offset.top + within.scrollTop,
						outerHeight = within.height,
						offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
						collisionPosTop = position.top - data.collisionPosition.marginTop,
						overTop = collisionPosTop - offsetTop,
						overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
						top = "top" === data.my[1],
						myOffset = top ? -data.elemHeight : "bottom" === data.my[1] ? data.elemHeight : 0,
						atOffset = "top" === data.at[1] ? data.targetHeight : "bottom" === data.at[1] ? -data.targetHeight : 0,
						offset = -2 * data.offset[1];
					overTop < 0 ? (newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset, position.top + myOffset + atOffset + offset > overTop && (newOverBottom < 0 || newOverBottom < abs(overTop)) && (position.top += myOffset + atOffset + offset)) : overBottom > 0 && (newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop, position.top + myOffset + atOffset + offset > overBottom && (newOverTop > 0 || abs(newOverTop) < overBottom) && (position.top += myOffset + atOffset + offset))
				}
			},
			flipfit: {
				left: function() {
					$.ui.position.flip.left.apply(this, arguments), $.ui.position.fit.left.apply(this, arguments)
				},
				top: function() {
					$.ui.position.flip.top.apply(this, arguments), $.ui.position.fit.top.apply(this, arguments)
				}
			}
		}, function() {
			var testElement, testElementParent, testElementStyle, offsetLeft, i, body = document.getElementsByTagName("body")[0],
				div = document.createElement("div");
			testElement = document.createElement(body ? "div" : "body"), testElementStyle = {
				visibility: "hidden",
				width: 0,
				height: 0,
				border: 0,
				margin: 0,
				background: "none"
			}, body && $.extend(testElementStyle, {
				position: "absolute",
				left: "-1000px",
				top: "-1000px"
			});
			for (i in testElementStyle) testElement.style[i] = testElementStyle[i];
			testElement.appendChild(div), testElementParent = body || document.documentElement, testElementParent.insertBefore(testElement, testElementParent.firstChild), div.style.cssText = "position: absolute; left: 10.7432222px;", offsetLeft = $(div).offset().left, supportsOffsetFractions = offsetLeft > 10 && offsetLeft < 11, testElement.innerHTML = "", testElementParent.removeChild(testElement)
		}()
	}();
	$.ui.position, $.widget("ui.accordion", {
		version: "1.11.1",
		options: {
			active: 0,
			animate: {},
			collapsible: !1,
			event: "click",
			header: "> li > :first-child,> :not(li):even",
			heightStyle: "auto",
			icons: {
				activeHeader: "ui-icon-triangle-1-s",
				header: "ui-icon-triangle-1-e"
			},
			activate: null,
			beforeActivate: null
		},
		hideProps: {
			borderTopWidth: "hide",
			borderBottomWidth: "hide",
			paddingTop: "hide",
			paddingBottom: "hide",
			height: "hide"
		},
		showProps: {
			borderTopWidth: "show",
			borderBottomWidth: "show",
			paddingTop: "show",
			paddingBottom: "show",
			height: "show"
		},
		_create: function() {
			var options = this.options;
			this.prevShow = this.prevHide = $(), this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"), options.collapsible || options.active !== !1 && null != options.active || (options.active = 0), this._processPanels(), options.active < 0 && (options.active += this.headers.length), this._refresh()
		},
		_getCreateEventData: function() {
			return {
				header: this.active,
				panel: this.active.length ? this.active.next() : $()
			}
		},
		_createIcons: function() {
			var icons = this.options.icons;
			icons && ($("<span>").addClass("ui-accordion-header-icon ui-icon " + icons.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(icons.header).addClass(icons.activeHeader), this.headers.addClass("ui-accordion-icons"))
		},
		_destroyIcons: function() {
			this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
		},
		_destroy: function() {
			var contents;
			this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").removeUniqueId(), this._destroyIcons(), contents = this.headers.next().removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").css("display", "").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeUniqueId(), "content" !== this.options.heightStyle && contents.css("height", "")
		},
		_setOption: function(key, value) {
			return "active" === key ? void this._activate(value) : ("event" === key && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(value)), this._super(key, value), "collapsible" !== key || value || this.options.active !== !1 || this._activate(0), "icons" === key && (this._destroyIcons(), value && this._createIcons()), void("disabled" === key && (this.element.toggleClass("ui-state-disabled", !! value).attr("aria-disabled", value), this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !! value))))
		},
		_keydown: function(event) {
			if (!event.altKey && !event.ctrlKey) {
				var keyCode = $.ui.keyCode,
					length = this.headers.length,
					currentIndex = this.headers.index(event.target),
					toFocus = !1;
				switch (event.keyCode) {
				case keyCode.RIGHT:
				case keyCode.DOWN:
					toFocus = this.headers[(currentIndex + 1) % length];
					break;
				case keyCode.LEFT:
				case keyCode.UP:
					toFocus = this.headers[(currentIndex - 1 + length) % length];
					break;
				case keyCode.SPACE:
				case keyCode.ENTER:
					this._eventHandler(event);
					break;
				case keyCode.HOME:
					toFocus = this.headers[0];
					break;
				case keyCode.END:
					toFocus = this.headers[length - 1]
				}
				toFocus && ($(event.target).attr("tabIndex", -1), $(toFocus).attr("tabIndex", 0), toFocus.focus(), event.preventDefault())
			}
		},
		_panelKeyDown: function(event) {
			event.keyCode === $.ui.keyCode.UP && event.ctrlKey && $(event.currentTarget).prev().focus()
		},
		refresh: function() {
			var options = this.options;
			this._processPanels(), options.active === !1 && options.collapsible === !0 || !this.headers.length ? (options.active = !1, this.active = $()) : options.active === !1 ? this._activate(0) : this.active.length && !$.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (options.active = !1, this.active = $()) : this._activate(Math.max(0, options.active - 1)) : options.active = this.headers.index(this.active), this._destroyIcons(), this._refresh()
		},
		_processPanels: function() {
			this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-state-default ui-corner-all"), this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide()
		},
		_refresh: function() {
			var maxHeight, options = this.options,
				heightStyle = options.heightStyle,
				parent = this.element.parent();
			this.active = this._findActive(options.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"), this.active.next().addClass("ui-accordion-content-active").show(), this.headers.attr("role", "tab").each(function() {
				var header = $(this),
					headerId = header.uniqueId().attr("id"),
					panel = header.next(),
					panelId = panel.uniqueId().attr("id");
				header.attr("aria-controls", panelId), panel.attr("aria-labelledby", headerId)
			}).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({
				"aria-selected": "false",
				"aria-expanded": "false",
				tabIndex: -1
			}).next().attr({
				"aria-hidden": "true"
			}).hide(), this.active.length ? this.active.attr({
				"aria-selected": "true",
				"aria-expanded": "true",
				tabIndex: 0
			}).next().attr({
				"aria-hidden": "false"
			}) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(options.event), "fill" === heightStyle ? (maxHeight = parent.height(), this.element.siblings(":visible").each(function() {
				var elem = $(this),
					position = elem.css("position");
				"absolute" !== position && "fixed" !== position && (maxHeight -= elem.outerHeight(!0))
			}), this.headers.each(function() {
				maxHeight -= $(this).outerHeight(!0)
			}), this.headers.next().each(function() {
				$(this).height(Math.max(0, maxHeight - $(this).innerHeight() + $(this).height()))
			}).css("overflow", "auto")) : "auto" === heightStyle && (maxHeight = 0, this.headers.next().each(function() {
				maxHeight = Math.max(maxHeight, $(this).css("height", "").height())
			}).height(maxHeight))
		},
		_activate: function(index) {
			var active = this._findActive(index)[0];
			active !== this.active[0] && (active = active || this.active[0], this._eventHandler({
				target: active,
				currentTarget: active,
				preventDefault: $.noop
			}))
		},
		_findActive: function(selector) {
			return "number" == typeof selector ? this.headers.eq(selector) : $()
		},
		_setupEvents: function(event) {
			var events = {
				keydown: "_keydown"
			};
			event && $.each(event.split(" "), function(index, eventName) {
				events[eventName] = "_eventHandler"
			}), this._off(this.headers.add(this.headers.next())), this._on(this.headers, events), this._on(this.headers.next(), {
				keydown: "_panelKeyDown"
			}), this._hoverable(this.headers), this._focusable(this.headers)
		},
		_eventHandler: function(event) {
			var options = this.options,
				active = this.active,
				clicked = $(event.currentTarget),
				clickedIsActive = clicked[0] === active[0],
				collapsing = clickedIsActive && options.collapsible,
				toShow = collapsing ? $() : clicked.next(),
				toHide = active.next(),
				eventData = {
					oldHeader: active,
					oldPanel: toHide,
					newHeader: collapsing ? $() : clicked,
					newPanel: toShow
				};
			event.preventDefault(), clickedIsActive && !options.collapsible || this._trigger("beforeActivate", event, eventData) === !1 || (options.active = !collapsing && this.headers.index(clicked), this.active = clickedIsActive ? $() : clicked, this._toggle(eventData), active.removeClass("ui-accordion-header-active ui-state-active"), options.icons && active.children(".ui-accordion-header-icon").removeClass(options.icons.activeHeader).addClass(options.icons.header), clickedIsActive || (clicked.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), options.icons && clicked.children(".ui-accordion-header-icon").removeClass(options.icons.header).addClass(options.icons.activeHeader), clicked.next().addClass("ui-accordion-content-active")))
		},
		_toggle: function(data) {
			var toShow = data.newPanel,
				toHide = this.prevShow.length ? this.prevShow : data.oldPanel;
			this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = toShow, this.prevHide = toHide, this.options.animate ? this._animate(toShow, toHide, data) : (toHide.hide(), toShow.show(), this._toggleComplete(data)), toHide.attr({
				"aria-hidden": "true"
			}), toHide.prev().attr("aria-selected", "false"), toShow.length && toHide.length ? toHide.prev().attr({
				tabIndex: -1,
				"aria-expanded": "false"
			}) : toShow.length && this.headers.filter(function() {
				return 0 === $(this).attr("tabIndex")
			}).attr("tabIndex", -1), toShow.attr("aria-hidden", "false").prev().attr({
				"aria-selected": "true",
				tabIndex: 0,
				"aria-expanded": "true"
			})
		},
		_animate: function(toShow, toHide, data) {
			var total, easing, duration, that = this,
				adjust = 0,
				down = toShow.length && (!toHide.length || toShow.index() < toHide.index()),
				animate = this.options.animate || {},
				options = down && animate.down || animate,
				complete = function() {
					that._toggleComplete(data)
				};
			return "number" == typeof options && (duration = options), "string" == typeof options && (easing = options), easing = easing || options.easing || animate.easing, duration = duration || options.duration || animate.duration, toHide.length ? toShow.length ? (total = toShow.show().outerHeight(), toHide.animate(this.hideProps, {
				duration: duration,
				easing: easing,
				step: function(now, fx) {
					fx.now = Math.round(now)
				}
			}), void toShow.hide().animate(this.showProps, {
				duration: duration,
				easing: easing,
				complete: complete,
				step: function(now, fx) {
					fx.now = Math.round(now), "height" !== fx.prop ? adjust += fx.now : "content" !== that.options.heightStyle && (fx.now = Math.round(total - toHide.outerHeight() - adjust), adjust = 0)
				}
			})) : toHide.animate(this.hideProps, duration, easing, complete) : toShow.animate(this.showProps, duration, easing, complete)
		},
		_toggleComplete: function(data) {
			var toHide = data.oldPanel;
			toHide.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"), toHide.length && (toHide.parent()[0].className = toHide.parent()[0].className), this._trigger("activate", null, data)
		}
	}), $.widget("ui.menu", {
		version: "1.11.1",
		defaultElement: "<ul>",
		delay: 300,
		options: {
			icons: {
				submenu: "ui-icon-carat-1-e"
			},
			items: "> *",
			menus: "ul",
			position: {
				my: "left-1 top",
				at: "right top"
			},
			role: "menu",
			blur: null,
			focus: null,
			select: null
		},
		_create: function() {
			this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons", !! this.element.find(".ui-icon").length).attr({
				role: this.options.role,
				tabIndex: 0
			}), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({
				"mousedown .ui-menu-item": function(event) {
					event.preventDefault()
				},
				"click .ui-menu-item": function(event) {
					var target = $(event.target);
					!this.mouseHandled && target.not(".ui-state-disabled").length && (this.select(event), event.isPropagationStopped() || (this.mouseHandled = !0), target.has(".ui-menu").length ? this.expand(event) : !this.element.is(":focus") && $(this.document[0].activeElement).closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
				},
				"mouseenter .ui-menu-item": function(event) {
					var target = $(event.currentTarget);
					target.siblings(".ui-state-active").removeClass("ui-state-active"), this.focus(event, target)
				},
				mouseleave: "collapseAll",
				"mouseleave .ui-menu": "collapseAll",
				focus: function(event, keepActiveItem) {
					var item = this.active || this.element.find(this.options.items).eq(0);
					keepActiveItem || this.focus(event, item)
				},
				blur: function(event) {
					this._delay(function() {
						$.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(event)
					})
				},
				keydown: "_keydown"
			}), this.refresh(), this._on(this.document, {
				click: function(event) {
					this._closeOnDocumentClick(event) && this.collapseAll(event), this.mouseHandled = !1
				}
			})
		},
		_destroy: function() {
			this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
				var elem = $(this);
				elem.data("ui-menu-submenu-carat") && elem.remove()
			}), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
		},
		_keydown: function(event) {
			function escape(value) {
				return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
			}
			var match, prev, character, skip, regex, preventDefault = !0;
			switch (event.keyCode) {
			case $.ui.keyCode.PAGE_UP:
				this.previousPage(event);
				break;
			case $.ui.keyCode.PAGE_DOWN:
				this.nextPage(event);
				break;
			case $.ui.keyCode.HOME:
				this._move("first", "first", event);
				break;
			case $.ui.keyCode.END:
				this._move("last", "last", event);
				break;
			case $.ui.keyCode.UP:
				this.previous(event);
				break;
			case $.ui.keyCode.DOWN:
				this.next(event);
				break;
			case $.ui.keyCode.LEFT:
				this.collapse(event);
				break;
			case $.ui.keyCode.RIGHT:
				this.active && !this.active.is(".ui-state-disabled") && this.expand(event);
				break;
			case $.ui.keyCode.ENTER:
			case $.ui.keyCode.SPACE:
				this._activate(event);
				break;
			case $.ui.keyCode.ESCAPE:
				this.collapse(event);
				break;
			default:
				preventDefault = !1, prev = this.previousFilter || "", character = String.fromCharCode(event.keyCode), skip = !1, clearTimeout(this.filterTimer), character === prev ? skip = !0 : character = prev + character, regex = new RegExp("^" + escape(character), "i"), match = this.activeMenu.find(this.options.items).filter(function() {
					return regex.test($(this).text())
				}), match = skip && match.index(this.active.next()) !== -1 ? this.active.nextAll(".ui-menu-item") : match, match.length || (character = String.fromCharCode(event.keyCode), regex = new RegExp("^" + escape(character), "i"), match = this.activeMenu.find(this.options.items).filter(function() {
					return regex.test($(this).text())
				})), match.length ? (this.focus(event, match), match.length > 1 ? (this.previousFilter = character, this.filterTimer = this._delay(function() {
					delete this.previousFilter
				}, 1e3)) : delete this.previousFilter) : delete this.previousFilter
			}
			preventDefault && event.preventDefault()
		},
		_activate: function(event) {
			this.active.is(".ui-state-disabled") || (this.active.is("[aria-haspopup='true']") ? this.expand(event) : this.select(event))
		},
		refresh: function() {
			var menus, items, that = this,
				icon = this.options.icons.submenu,
				submenus = this.element.find(this.options.menus);
			this.element.toggleClass("ui-menu-icons", !! this.element.find(".ui-icon").length), submenus.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({
				role: this.options.role,
				"aria-hidden": "true",
				"aria-expanded": "false"
			}).each(function() {
				var menu = $(this),
					item = menu.parent(),
					submenuCarat = $("<span>").addClass("ui-menu-icon ui-icon " + icon).data("ui-menu-submenu-carat", !0);
				item.attr("aria-haspopup", "true").prepend(submenuCarat), menu.attr("aria-labelledby", item.attr("id"))
			}), menus = submenus.add(this.element), items = menus.find(this.options.items), items.not(".ui-menu-item").each(function() {
				var item = $(this);
				that._isDivider(item) && item.addClass("ui-widget-content ui-menu-divider")
			}), items.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({
				tabIndex: -1,
				role: this._itemRole()
			}), items.filter(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !$.contains(this.element[0], this.active[0]) && this.blur()
		},
		_itemRole: function() {
			return {
				menu: "menuitem",
				listbox: "option"
			}[this.options.role]
		},
		_setOption: function(key, value) {
			"icons" === key && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(value.submenu), "disabled" === key && this.element.toggleClass("ui-state-disabled", !! value).attr("aria-disabled", value), this._super(key, value)
		},
		focus: function(event, item) {
			var nested, focused;
			this.blur(event, event && "focus" === event.type), this._scrollIntoView(item), this.active = item.first(), focused = this.active.addClass("ui-state-focus").removeClass("ui-state-active"), this.options.role && this.element.attr("aria-activedescendant", focused.attr("id")), this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"), event && "keydown" === event.type ? this._close() : this.timer = this._delay(function() {
				this._close()
			}, this.delay), nested = item.children(".ui-menu"), nested.length && event && /^mouse/.test(event.type) && this._startOpening(nested), this.activeMenu = item.parent(), this._trigger("focus", event, {
				item: item
			})
		},
		_scrollIntoView: function(item) {
			var borderTop, paddingTop, offset, scroll, elementHeight, itemHeight;
			this._hasScroll() && (borderTop = parseFloat($.css(this.activeMenu[0], "borderTopWidth")) || 0, paddingTop = parseFloat($.css(this.activeMenu[0], "paddingTop")) || 0, offset = item.offset().top - this.activeMenu.offset().top - borderTop - paddingTop, scroll = this.activeMenu.scrollTop(), elementHeight = this.activeMenu.height(), itemHeight = item.outerHeight(), offset < 0 ? this.activeMenu.scrollTop(scroll + offset) : offset + itemHeight > elementHeight && this.activeMenu.scrollTop(scroll + offset - elementHeight + itemHeight))
		},
		blur: function(event, fromFocus) {
			fromFocus || clearTimeout(this.timer), this.active && (this.active.removeClass("ui-state-focus"), this.active = null, this._trigger("blur", event, {
				item: this.active
			}))
		},
		_startOpening: function(submenu) {
			clearTimeout(this.timer), "true" === submenu.attr("aria-hidden") && (this.timer = this._delay(function() {
				this._close(), this._open(submenu)
			}, this.delay))
		},
		_open: function(submenu) {
			var position = $.extend({
				of: this.active
			}, this.options.position);
			clearTimeout(this.timer), this.element.find(".ui-menu").not(submenu.parents(".ui-menu")).hide().attr("aria-hidden", "true"), submenu.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(position)
		},
		collapseAll: function(event, all) {
			clearTimeout(this.timer), this.timer = this._delay(function() {
				var currentMenu = all ? this.element : $(event && event.target).closest(this.element.find(".ui-menu"));
				currentMenu.length || (currentMenu = this.element), this._close(currentMenu), this.blur(event), this.activeMenu = currentMenu
			}, this.delay)
		},
		_close: function(startMenu) {
			startMenu || (startMenu = this.active ? this.active.parent() : this.element), startMenu.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")
		},
		_closeOnDocumentClick: function(event) {
			return !$(event.target).closest(".ui-menu").length
		},
		_isDivider: function(item) {
			return !/[^\-\u2014\u2013\s]/.test(item.text())
		},
		collapse: function(event) {
			var newItem = this.active && this.active.parent().closest(".ui-menu-item", this.element);
			newItem && newItem.length && (this._close(), this.focus(event, newItem))
		},
		expand: function(event) {
			var newItem = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
			newItem && newItem.length && (this._open(newItem.parent()), this._delay(function() {
				this.focus(event, newItem)
			}))
		},
		next: function(event) {
			this._move("next", "first", event)
		},
		previous: function(event) {
			this._move("prev", "last", event)
		},
		isFirstItem: function() {
			return this.active && !this.active.prevAll(".ui-menu-item").length
		},
		isLastItem: function() {
			return this.active && !this.active.nextAll(".ui-menu-item").length
		},
		_move: function(direction, filter, event) {
			var next;
			this.active && (next = "first" === direction || "last" === direction ? this.active["first" === direction ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[direction + "All"](".ui-menu-item").eq(0)), next && next.length && this.active || (next = this.activeMenu.find(this.options.items)[filter]()), this.focus(event, next)
		},
		nextPage: function(event) {
			var item, base, height;
			return this.active ? void(this.isLastItem() || (this._hasScroll() ? (base = this.active.offset().top, height = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
				return item = $(this), item.offset().top - base - height < 0
			}), this.focus(event, item)) : this.focus(event, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]()))) : void this.next(event)
		},
		previousPage: function(event) {
			var item, base, height;
			return this.active ? void(this.isFirstItem() || (this._hasScroll() ? (base = this.active.offset().top, height = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
				return item = $(this), item.offset().top - base + height > 0
			}), this.focus(event, item)) : this.focus(event, this.activeMenu.find(this.options.items).first()))) : void this.next(event)
		},
		_hasScroll: function() {
			return this.element.outerHeight() < this.element.prop("scrollHeight")
		},
		select: function(event) {
			this.active = this.active || $(event.target).closest(".ui-menu-item");
			var ui = {
				item: this.active
			};
			this.active.has(".ui-menu").length || this.collapseAll(event, !0), this._trigger("select", event, ui)
		}
	});
	$.widget("ui.autocomplete", {
		version: "1.11.1",
		defaultElement: "<input>",
		options: {
			appendTo: null,
			autoFocus: !1,
			delay: 300,
			minLength: 1,
			position: {
				my: "left top",
				at: "left bottom",
				collision: "none"
			},
			source: null,
			change: null,
			close: null,
			focus: null,
			open: null,
			response: null,
			search: null,
			select: null
		},
		requestIndex: 0,
		pending: 0,
		_create: function() {
			var suppressKeyPress, suppressKeyPressRepeat, suppressInput, nodeName = this.element[0].nodeName.toLowerCase(),
				isTextarea = "textarea" === nodeName,
				isInput = "input" === nodeName;
			this.isMultiLine = !! isTextarea || !isInput && this.element.prop("isContentEditable"), this.valueMethod = this.element[isTextarea || isInput ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
				keydown: function(event) {
					if (this.element.prop("readOnly")) return suppressKeyPress = !0, suppressInput = !0, void(suppressKeyPressRepeat = !0);
					suppressKeyPress = !1, suppressInput = !1, suppressKeyPressRepeat = !1;
					var keyCode = $.ui.keyCode;
					switch (event.keyCode) {
					case keyCode.PAGE_UP:
						suppressKeyPress = !0, this._move("previousPage", event);
						break;
					case keyCode.PAGE_DOWN:
						suppressKeyPress = !0, this._move("nextPage", event);
						break;
					case keyCode.UP:
						suppressKeyPress = !0, this._keyEvent("previous", event);
						break;
					case keyCode.DOWN:
						suppressKeyPress = !0, this._keyEvent("next", event);
						break;
					case keyCode.ENTER:
						this.menu.active && (suppressKeyPress = !0, event.preventDefault(), this.menu.select(event));
						break;
					case keyCode.TAB:
						this.menu.active && this.menu.select(event);
						break;
					case keyCode.ESCAPE:
						this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(event), event.preventDefault());
						break;
					default:
						suppressKeyPressRepeat = !0, this._searchTimeout(event)
					}
				},
				keypress: function(event) {
					if (suppressKeyPress) return suppressKeyPress = !1, void(this.isMultiLine && !this.menu.element.is(":visible") || event.preventDefault());
					if (!suppressKeyPressRepeat) {
						var keyCode = $.ui.keyCode;
						switch (event.keyCode) {
						case keyCode.PAGE_UP:
							this._move("previousPage", event);
							break;
						case keyCode.PAGE_DOWN:
							this._move("nextPage", event);
							break;
						case keyCode.UP:
							this._keyEvent("previous", event);
							break;
						case keyCode.DOWN:
							this._keyEvent("next", event)
						}
					}
				},
				input: function(event) {
					return suppressInput ? (suppressInput = !1, void event.preventDefault()) : void this._searchTimeout(event)
				},
				focus: function() {
					this.selectedItem = null, this.previous = this._value()
				},
				blur: function(event) {
					return this.cancelBlur ? void delete this.cancelBlur : (clearTimeout(this.searching), this.close(event), void this._change(event))
				}
			}), this._initSource(), this.menu = $("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
				role: null
			}).hide().menu("instance"), this._on(this.menu.element, {
				mousedown: function(event) {
					event.preventDefault(), this.cancelBlur = !0, this._delay(function() {
						delete this.cancelBlur
					});
					var menuElement = this.menu.element[0];
					$(event.target).closest(".ui-menu-item").length || this._delay(function() {
						var that = this;
						this.document.one("mousedown", function(event) {
							event.target === that.element[0] || event.target === menuElement || $.contains(menuElement, event.target) || that.close()
						})
					})
				},
				menufocus: function(event, ui) {
					var label, item;
					return this.isNewMenu && (this.isNewMenu = !1, event.originalEvent && /^mouse/.test(event.originalEvent.type)) ? (this.menu.blur(), void this.document.one("mousemove", function() {
						$(event.target).trigger(event.originalEvent)
					})) : (item = ui.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", event, {
						item: item
					}) && event.originalEvent && /^key/.test(event.originalEvent.type) && this._value(item.value), label = ui.item.attr("aria-label") || item.value, void(label && $.trim(label).length && (this.liveRegion.children().hide(), $("<div>").text(label).appendTo(this.liveRegion))))
				},
				menuselect: function(event, ui) {
					var item = ui.item.data("ui-autocomplete-item"),
						previous = this.previous;
					this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = previous, this._delay(function() {
						this.previous = previous, this.selectedItem = item
					})), !1 !== this._trigger("select", event, {
						item: item
					}) && this._value(item.value), this.term = this._value(), this.close(event), this.selectedItem = item
				}
			}), this.liveRegion = $("<span>", {
				role: "status",
				"aria-live": "assertive",
				"aria-relevant": "additions"
			}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body), this._on(this.window, {
				beforeunload: function() {
					this.element.removeAttr("autocomplete")
				}
			})
		},
		_destroy: function() {
			clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
		},
		_setOption: function(key, value) {
			this._super(key, value), "source" === key && this._initSource(), "appendTo" === key && this.menu.element.appendTo(this._appendTo()), "disabled" === key && value && this.xhr && this.xhr.abort()
		},
		_appendTo: function() {
			var element = this.options.appendTo;
			return element && (element = element.jquery || element.nodeType ? $(element) : this.document.find(element).eq(0)), element && element[0] || (element = this.element.closest(".ui-front")), element.length || (element = this.document[0].body), element
		},
		_initSource: function() {
			var array, url, that = this;
			$.isArray(this.options.source) ? (array = this.options.source, this.source = function(request, response) {
				response($.ui.autocomplete.filter(array, request.term))
			}) : "string" == typeof this.options.source ? (url = this.options.source, this.source = function(request, response) {
				that.xhr && that.xhr.abort(), that.xhr = $.ajax({
					url: url,
					data: request,
					dataType: "json",
					success: function(data) {
						response(data)
					},
					error: function() {
						response([])
					}
				})
			}) : this.source = this.options.source
		},
		_searchTimeout: function(event) {
			clearTimeout(this.searching), this.searching = this._delay(function() {
				var equalValues = this.term === this._value(),
					menuVisible = this.menu.element.is(":visible"),
					modifierKey = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
				equalValues && (!equalValues || menuVisible || modifierKey) || (this.selectedItem = null, this.search(null, event))
			}, this.options.delay)
		},
		search: function(value, event) {
			return value = null != value ? value : this._value(), this.term = this._value(), value.length < this.options.minLength ? this.close(event) : this._trigger("search", event) !== !1 ? this._search(value) : void 0
		},
		_search: function(value) {
			this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
				term: value
			}, this._response())
		},
		_response: function() {
			var index = ++this.requestIndex;
			return $.proxy(function(content) {
				index === this.requestIndex && this.__response(content), this.pending--, this.pending || this.element.removeClass("ui-autocomplete-loading")
			}, this)
		},
		__response: function(content) {
			content && (content = this._normalize(content)), this._trigger("response", null, {
				content: content
			}), !this.options.disabled && content && content.length && !this.cancelSearch ? (this._suggest(content), this._trigger("open")) : this._close()
		},
		close: function(event) {
			this.cancelSearch = !0, this._close(event)
		},
		_close: function(event) {
			this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", event))
		},
		_change: function(event) {
			this.previous !== this._value() && this._trigger("change", event, {
				item: this.selectedItem
			})
		},
		_normalize: function(items) {
			return items.length && items[0].label && items[0].value ? items : $.map(items, function(item) {
				return "string" == typeof item ? {
					label: item,
					value: item
				} : $.extend({}, item, {
					label: item.label || item.value,
					value: item.value || item.label
				})
			})
		},
		_suggest: function(items) {
			var ul = this.menu.element.empty();
			this._renderMenu(ul, items), this.isNewMenu = !0, this.menu.refresh(), ul.show(), this._resizeMenu(), ul.position($.extend({
				of: this.element
			}, this.options.position)), this.options.autoFocus && this.menu.next()
		},
		_resizeMenu: function() {
			var ul = this.menu.element;
			ul.outerWidth(Math.max(ul.width("").outerWidth() + 1, this.element.outerWidth()))
		},
		_renderMenu: function(ul, items) {
			var that = this;
			$.each(items, function(index, item) {
				that._renderItemData(ul, item)
			})
		},
		_renderItemData: function(ul, item) {
			return this._renderItem(ul, item).data("ui-autocomplete-item", item)
		},
		_renderItem: function(ul, item) {
			return $("<li>").text(item.label).appendTo(ul)
		},
		_move: function(direction, event) {
			return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(direction) || this.menu.isLastItem() && /^next/.test(direction) ? (this.isMultiLine || this._value(this.term), void this.menu.blur()) : void this.menu[direction](event) : void this.search(null, event)
		},
		widget: function() {
			return this.menu.element
		},
		_value: function() {
			return this.valueMethod.apply(this.element, arguments)
		},
		_keyEvent: function(keyEvent, event) {
			this.isMultiLine && !this.menu.element.is(":visible") || (this._move(keyEvent, event), event.preventDefault())
		}
	}), $.extend($.ui.autocomplete, {
		escapeRegex: function(value) {
			return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
		},
		filter: function(array, term) {
			var matcher = new RegExp($.ui.autocomplete.escapeRegex(term), "i");
			return $.grep(array, function(value) {
				return matcher.test(value.label || value.value || value)
			})
		}
	}), $.widget("ui.autocomplete", $.ui.autocomplete, {
		options: {
			messages: {
				noResults: "No search results.",
				results: function(amount) {
					return amount + (amount > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
				}
			}
		},
		__response: function(content) {
			var message;
			this._superApply(arguments), this.options.disabled || this.cancelSearch || (message = content && content.length ? this.options.messages.results(content.length) : this.options.messages.noResults, this.liveRegion.children().hide(), $("<div>").text(message).appendTo(this.liveRegion))
		}
	});
	var lastActive, baseClasses = ($.ui.autocomplete, "ui-button ui-widget ui-state-default ui-corner-all"),
		typeClasses = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
		formResetHandler = function() {
			var form = $(this);
			setTimeout(function() {
				form.find(":ui-button").button("refresh")
			}, 1)
		},
		radioGroup = function(radio) {
			var name = radio.name,
				form = radio.form,
				radios = $([]);
			return name && (name = name.replace(/'/g, "\\'"), radios = form ? $(form).find("[name='" + name + "'][type=radio]") : $("[name='" + name + "'][type=radio]", radio.ownerDocument).filter(function() {
				return !this.form
			})), radios
		};
	$.widget("ui.button", {
		version: "1.11.1",
		defaultElement: "<button>",
		options: {
			disabled: null,
			text: !0,
			label: null,
			icons: {
				primary: null,
				secondary: null
			}
		},
		_create: function() {
			this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, formResetHandler), "boolean" != typeof this.options.disabled ? this.options.disabled = !! this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !! this.buttonElement.attr("title");
			var that = this,
				options = this.options,
				toggleButton = "checkbox" === this.type || "radio" === this.type,
				activeClass = toggleButton ? "" : "ui-state-active";
			null === options.label && (options.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()), this._hoverable(this.buttonElement), this.buttonElement.addClass(baseClasses).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() {
				options.disabled || this === lastActive && $(this).addClass("ui-state-active")
			}).bind("mouseleave" + this.eventNamespace, function() {
				options.disabled || $(this).removeClass(activeClass)
			}).bind("click" + this.eventNamespace, function(event) {
				options.disabled && (event.preventDefault(), event.stopImmediatePropagation())
			}), this._on({
				focus: function() {
					this.buttonElement.addClass("ui-state-focus")
				},
				blur: function() {
					this.buttonElement.removeClass("ui-state-focus")
				}
			}), toggleButton && this.element.bind("change" + this.eventNamespace, function() {
				that.refresh()
			}), "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
				if (options.disabled) return !1
			}) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
				if (options.disabled) return !1;
				$(this).addClass("ui-state-active"), that.buttonElement.attr("aria-pressed", "true");
				var radio = that.element[0];
				radioGroup(radio).not(radio).map(function() {
					return $(this).button("widget")[0]
				}).removeClass("ui-state-active").attr("aria-pressed", "false")
			}) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function() {
				return !options.disabled && ($(this).addClass("ui-state-active"), lastActive = this, void that.document.one("mouseup", function() {
					lastActive = null
				}))
			}).bind("mouseup" + this.eventNamespace, function() {
				return !options.disabled && void $(this).removeClass("ui-state-active")
			}).bind("keydown" + this.eventNamespace, function(event) {
				return !options.disabled && void(event.keyCode !== $.ui.keyCode.SPACE && event.keyCode !== $.ui.keyCode.ENTER || $(this).addClass("ui-state-active"))
			}).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
				$(this).removeClass("ui-state-active")
			}), this.buttonElement.is("a") && this.buttonElement.keyup(function(event) {
				event.keyCode === $.ui.keyCode.SPACE && $(this).click()
			})), this._setOption("disabled", options.disabled), this._resetButton()
		},
		_determineButtonType: function() {
			var ancestor, labelSelector, checked;
			this.element.is("[type=checkbox]") ? this.type = "checkbox" : this.element.is("[type=radio]") ? this.type = "radio" : this.element.is("input") ? this.type = "input" : this.type = "button", "checkbox" === this.type || "radio" === this.type ? (ancestor = this.element.parents().last(), labelSelector = "label[for='" + this.element.attr("id") + "']", this.buttonElement = ancestor.find(labelSelector), this.buttonElement.length || (ancestor = ancestor.length ? ancestor.siblings() : this.element.siblings(), this.buttonElement = ancestor.filter(labelSelector), this.buttonElement.length || (this.buttonElement = ancestor.find(labelSelector))), this.element.addClass("ui-helper-hidden-accessible"), checked = this.element.is(":checked"), checked && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", checked)) : this.buttonElement = this.element
		},
		widget: function() {
			return this.buttonElement
		},
		_destroy: function() {
			this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(baseClasses + " ui-state-active " + typeClasses).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title")
		},
		_setOption: function(key, value) {
			return this._super(key, value), "disabled" === key ? (this.widget().toggleClass("ui-state-disabled", !! value), this.element.prop("disabled", !! value), void(value && ("checkbox" === this.type || "radio" === this.type ? this.buttonElement.removeClass("ui-state-focus") : this.buttonElement.removeClass("ui-state-focus ui-state-active")))) : void this._resetButton()
		},
		refresh: function() {
			var isDisabled = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
			isDisabled !== this.options.disabled && this._setOption("disabled", isDisabled), "radio" === this.type ? radioGroup(this.element[0]).each(function() {
				$(this).is(":checked") ? $(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : $(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
			}) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
		},
		_resetButton: function() {
			if ("input" === this.type) return void(this.options.label && this.element.val(this.options.label));
			var buttonElement = this.buttonElement.removeClass(typeClasses),
				buttonText = $("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(buttonElement.empty()).text(),
				icons = this.options.icons,
				multipleIcons = icons.primary && icons.secondary,
				buttonClasses = [];
			icons.primary || icons.secondary ? (this.options.text && buttonClasses.push("ui-button-text-icon" + (multipleIcons ? "s" : icons.primary ? "-primary" : "-secondary")), icons.primary && buttonElement.prepend("<span class='ui-button-icon-primary ui-icon " + icons.primary + "'></span>"), icons.secondary && buttonElement.append("<span class='ui-button-icon-secondary ui-icon " + icons.secondary + "'></span>"), this.options.text || (buttonClasses.push(multipleIcons ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || buttonElement.attr("title", $.trim(buttonText)))) : buttonClasses.push("ui-button-text-only"), buttonElement.addClass(buttonClasses.join(" "))
		}
	}), $.widget("ui.buttonset", {
		version: "1.11.1",
		options: {
			items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
		},
		_create: function() {
			this.element.addClass("ui-buttonset")
		},
		_init: function() {
			this.refresh()
		},
		_setOption: function(key, value) {
			"disabled" === key && this.buttons.button("option", key, value), this._super(key, value)
		},
		refresh: function() {
			var rtl = "rtl" === this.element.css("direction"),
				allButtons = this.element.find(this.options.items),
				existingButtons = allButtons.filter(":ui-button");
			allButtons.not(":ui-button").button(), existingButtons.button("refresh"), this.buttons = allButtons.map(function() {
				return $(this).button("widget")[0]
			}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(rtl ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(rtl ? "ui-corner-left" : "ui-corner-right").end().end()
		},
		_destroy: function() {
			this.element.removeClass("ui-buttonset"), this.buttons.map(function() {
				return $(this).button("widget")[0]
			}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
		}
	});
	$.ui.button;
	$.extend($.ui, {
		datepicker: {
			version: "1.11.1"
		}
	});
	var datepicker_instActive;
	$.extend(Datepicker.prototype, {
		markerClassName: "hasDatepicker",
		maxRows: 4,
		_widgetDatepicker: function() {
			return this.dpDiv
		},
		setDefaults: function(settings) {
			return datepicker_extendRemove(this._defaults, settings || {}), this
		},
		_attachDatepicker: function(target, settings) {
			var nodeName, inline, inst;
			nodeName = target.nodeName.toLowerCase(), inline = "div" === nodeName || "span" === nodeName, target.id || (this.uuid += 1, target.id = "dp" + this.uuid), inst = this._newInst($(target), inline), inst.settings = $.extend({}, settings || {}), "input" === nodeName ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst)
		},
		_newInst: function(target, inline) {
			var id = target[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
			return {
				id: id,
				input: target,
				selectedDay: 0,
				selectedMonth: 0,
				selectedYear: 0,
				drawMonth: 0,
				drawYear: 0,
				inline: inline,
				dpDiv: inline ? datepicker_bindHover($("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
			}
		},
		_connectDatepicker: function(target, inst) {
			var input = $(target);
			inst.append = $([]), inst.trigger = $([]), input.hasClass(this.markerClassName) || (this._attachments(input, inst), input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(inst), $.data(target, "datepicker", inst), inst.settings.disabled && this._disableDatepicker(target))
		},
		_attachments: function(input, inst) {
			var showOn, buttonText, buttonImage, appendText = this._get(inst, "appendText"),
				isRTL = this._get(inst, "isRTL");
			inst.append && inst.append.remove(), appendText && (inst.append = $("<span class='" + this._appendClass + "'>" + appendText + "</span>"), input[isRTL ? "before" : "after"](inst.append)), input.unbind("focus", this._showDatepicker), inst.trigger && inst.trigger.remove(), showOn = this._get(inst, "showOn"), "focus" !== showOn && "both" !== showOn || input.focus(this._showDatepicker), "button" !== showOn && "both" !== showOn || (buttonText = this._get(inst, "buttonText"), buttonImage = this._get(inst, "buttonImage"), inst.trigger = $(this._get(inst, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
				src: buttonImage,
				alt: buttonText,
				title: buttonText
			}) : $("<button type='button'></button>").addClass(this._triggerClass).html(buttonImage ? $("<img/>").attr({
				src: buttonImage,
				alt: buttonText,
				title: buttonText
			}) : buttonText)), input[isRTL ? "before" : "after"](inst.trigger), inst.trigger.click(function() {
				return $.datepicker._datepickerShowing && $.datepicker._lastInput === input[0] ? $.datepicker._hideDatepicker() : $.datepicker._datepickerShowing && $.datepicker._lastInput !== input[0] ? ($.datepicker._hideDatepicker(), $.datepicker._showDatepicker(input[0])) : $.datepicker._showDatepicker(input[0]), !1
			}))
		},
		_autoSize: function(inst) {
			if (this._get(inst, "autoSize") && !inst.inline) {
				var findMax, max, maxI, i, date = new Date(2009, 11, 20),
					dateFormat = this._get(inst, "dateFormat");
				dateFormat.match(/[DM]/) && (findMax = function(names) {
					for (max = 0, maxI = 0, i = 0; i < names.length; i++) names[i].length > max && (max = names[i].length, maxI = i);
					return maxI
				}, date.setMonth(findMax(this._get(inst, dateFormat.match(/MM/) ? "monthNames" : "monthNamesShort"))), date.setDate(findMax(this._get(inst, dateFormat.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - date.getDay())), inst.input.attr("size", this._formatDate(inst, date).length)
			}
		},
		_inlineDatepicker: function(target, inst) {
			var divSpan = $(target);
			divSpan.hasClass(this.markerClassName) || (divSpan.addClass(this.markerClassName).append(inst.dpDiv), $.data(target, "datepicker", inst), this._setDate(inst, this._getDefaultDate(inst), !0), this._updateDatepicker(inst), this._updateAlternate(inst), inst.settings.disabled && this._disableDatepicker(target), inst.dpDiv.css("display", "block"))
		},
		_dialogDatepicker: function(input, date, onSelect, settings, pos) {
			var id, browserWidth, browserHeight, scrollX, scrollY, inst = this._dialogInst;
			return inst || (this.uuid += 1, id = "dp" + this.uuid, this._dialogInput = $("<input type='text' id='" + id + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), $("body").append(this._dialogInput), inst = this._dialogInst = this._newInst(this._dialogInput, !1), inst.settings = {}, $.data(this._dialogInput[0], "datepicker", inst)), datepicker_extendRemove(inst.settings, settings || {}), date = date && date.constructor === Date ? this._formatDate(inst, date) : date, this._dialogInput.val(date), this._pos = pos ? pos.length ? pos : [pos.pageX, pos.pageY] : null, this._pos || (browserWidth = document.documentElement.clientWidth, browserHeight = document.documentElement.clientHeight, scrollX = document.documentElement.scrollLeft || document.body.scrollLeft, scrollY = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [browserWidth / 2 - 100 + scrollX, browserHeight / 2 - 150 + scrollY]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), inst.settings.onSelect = onSelect, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), $.blockUI && $.blockUI(this.dpDiv), $.data(this._dialogInput[0], "datepicker", inst), this
		},
		_destroyDatepicker: function(target) {
			var nodeName, $target = $(target),
				inst = $.data(target, "datepicker");
			$target.hasClass(this.markerClassName) && (nodeName = target.nodeName.toLowerCase(), $.removeData(target, "datepicker"), "input" === nodeName ? (inst.append.remove(), inst.trigger.remove(), $target.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : "div" !== nodeName && "span" !== nodeName || $target.removeClass(this.markerClassName).empty())
		},
		_enableDatepicker: function(target) {
			var nodeName, inline, $target = $(target),
				inst = $.data(target, "datepicker");
			$target.hasClass(this.markerClassName) && (nodeName = target.nodeName.toLowerCase(), "input" === nodeName ? (target.disabled = !1, inst.trigger.filter("button").each(function() {
				this.disabled = !1
			}).end().filter("img").css({
				opacity: "1.0",
				cursor: ""
			})) : "div" !== nodeName && "span" !== nodeName || (inline = $target.children("." + this._inlineClass), inline.children().removeClass("ui-state-disabled"), inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = $.map(this._disabledInputs, function(value) {
				return value === target ? null : value
			}))
		},
		_disableDatepicker: function(target) {
			var nodeName, inline, $target = $(target),
				inst = $.data(target, "datepicker");
			$target.hasClass(this.markerClassName) && (nodeName = target.nodeName.toLowerCase(), "input" === nodeName ? (target.disabled = !0, inst.trigger.filter("button").each(function() {
				this.disabled = !0
			}).end().filter("img").css({
				opacity: "0.5",
				cursor: "default"
			})) : "div" !== nodeName && "span" !== nodeName || (inline = $target.children("." + this._inlineClass), inline.children().addClass("ui-state-disabled"), inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = $.map(this._disabledInputs, function(value) {
				return value === target ? null : value
			}), this._disabledInputs[this._disabledInputs.length] = target)
		},
		_isDisabledDatepicker: function(target) {
			if (!target) return !1;
			for (var i = 0; i < this._disabledInputs.length; i++) if (this._disabledInputs[i] === target) return !0;
			return !1
		},
		_getInst: function(target) {
			try {
				return $.data(target, "datepicker")
			} catch (err) {
				throw "Missing instance data for this datepicker"
			}
		},
		_optionDatepicker: function(target, name, value) {
			var settings, date, minDate, maxDate, inst = this._getInst(target);
			return 2 === arguments.length && "string" == typeof name ? "defaults" === name ? $.extend({}, $.datepicker._defaults) : inst ? "all" === name ? $.extend({}, inst.settings) : this._get(inst, name) : null : (settings = name || {}, "string" == typeof name && (settings = {}, settings[name] = value), void(inst && (this._curInst === inst && this._hideDatepicker(), date = this._getDateDatepicker(target, !0), minDate = this._getMinMaxDate(inst, "min"), maxDate = this._getMinMaxDate(inst, "max"), datepicker_extendRemove(inst.settings, settings), null !== minDate && void 0 !== settings.dateFormat && void 0 === settings.minDate && (inst.settings.minDate = this._formatDate(inst, minDate)), null !== maxDate && void 0 !== settings.dateFormat && void 0 === settings.maxDate && (inst.settings.maxDate = this._formatDate(inst, maxDate)), "disabled" in settings && (settings.disabled ? this._disableDatepicker(target) : this._enableDatepicker(target)), this._attachments($(target), inst), this._autoSize(inst), this._setDate(inst, date), this._updateAlternate(inst), this._updateDatepicker(inst))))
		},
		_changeDatepicker: function(target, name, value) {
			this._optionDatepicker(target, name, value)
		},
		_refreshDatepicker: function(target) {
			var inst = this._getInst(target);
			inst && this._updateDatepicker(inst)
		},
		_setDateDatepicker: function(target, date) {
			var inst = this._getInst(target);
			inst && (this._setDate(inst, date), this._updateDatepicker(inst), this._updateAlternate(inst))
		},
		_getDateDatepicker: function(target, noDefault) {
			var inst = this._getInst(target);
			return inst && !inst.inline && this._setDateFromField(inst, noDefault), inst ? this._getDate(inst) : null
		},
		_doKeyDown: function(event) {
			var onSelect, dateStr, sel, inst = $.datepicker._getInst(event.target),
				handled = !0,
				isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
			if (inst._keyEvent = !0, $.datepicker._datepickerShowing) switch (event.keyCode) {
			case 9:
				$.datepicker._hideDatepicker(), handled = !1;
				break;
			case 13:
				return sel = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", inst.dpDiv), sel[0] && $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]), onSelect = $.datepicker._get(inst, "onSelect"), onSelect ? (dateStr = $.datepicker._formatDate(inst), onSelect.apply(inst.input ? inst.input[0] : null, [dateStr, inst])) : $.datepicker._hideDatepicker(), !1;
			case 27:
				$.datepicker._hideDatepicker();
				break;
			case 33:
				$.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths"), "M");
				break;
			case 34:
				$.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths"), "M");
				break;
			case 35:
				(event.ctrlKey || event.metaKey) && $.datepicker._clearDate(event.target), handled = event.ctrlKey || event.metaKey;
				break;
			case 36:
				(event.ctrlKey || event.metaKey) && $.datepicker._gotoToday(event.target), handled = event.ctrlKey || event.metaKey;
				break;
			case 37:
				(event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, isRTL ? 1 : -1, "D"), handled = event.ctrlKey || event.metaKey, event.originalEvent.altKey && $.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths"), "M");
				break;
			case 38:
				(event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, -7, "D"), handled = event.ctrlKey || event.metaKey;
				break;
			case 39:
				(event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, isRTL ? -1 : 1, "D"), handled = event.ctrlKey || event.metaKey, event.originalEvent.altKey && $.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths"), "M");
				break;
			case 40:
				(event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, 7, "D"), handled = event.ctrlKey || event.metaKey;
				break;
			default:
				handled = !1
			} else 36 === event.keyCode && event.ctrlKey ? $.datepicker._showDatepicker(this) : handled = !1;
			handled && (event.preventDefault(), event.stopPropagation())
		},
		_doKeyPress: function(event) {
			var chars, chr, inst = $.datepicker._getInst(event.target);
			if ($.datepicker._get(inst, "constrainInput")) return chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat")), chr = String.fromCharCode(null == event.charCode ? event.keyCode : event.charCode), event.ctrlKey || event.metaKey || chr < " " || !chars || chars.indexOf(chr) > -1
		},
		_doKeyUp: function(event) {
			var date, inst = $.datepicker._getInst(event.target);
			if (inst.input.val() !== inst.lastVal) try {
				date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), inst.input ? inst.input.val() : null, $.datepicker._getFormatConfig(inst)), date && ($.datepicker._setDateFromField(inst), $.datepicker._updateAlternate(inst), $.datepicker._updateDatepicker(inst))
			} catch (err) {}
			return !0
		},
		_showDatepicker: function(input) {
			if (input = input.target || input, "input" !== input.nodeName.toLowerCase() && (input = $("input", input.parentNode)[0]), !$.datepicker._isDisabledDatepicker(input) && $.datepicker._lastInput !== input) {
				var inst, beforeShow, beforeShowSettings, isFixed, offset, showAnim, duration;
				inst = $.datepicker._getInst(input), $.datepicker._curInst && $.datepicker._curInst !== inst && ($.datepicker._curInst.dpDiv.stop(!0, !0), inst && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0])), beforeShow = $.datepicker._get(inst, "beforeShow"), beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {}, beforeShowSettings !== !1 && (datepicker_extendRemove(inst.settings, beforeShowSettings), inst.lastVal = null, $.datepicker._lastInput = input, $.datepicker._setDateFromField(inst), $.datepicker._inDialog && (input.value = ""), $.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(input), $.datepicker._pos[1] += input.offsetHeight), isFixed = !1, $(input).parents().each(function() {
					return isFixed |= "fixed" === $(this).css("position"), !isFixed
				}), offset = {
					left: $.datepicker._pos[0],
					top: $.datepicker._pos[1]
				}, $.datepicker._pos = null, inst.dpDiv.empty(), inst.dpDiv.css({
					position: "absolute",
					display: "block",
					top: "-1000px"
				}), $.datepicker._updateDatepicker(inst), offset = $.datepicker._checkOffset(inst, offset, isFixed), inst.dpDiv.css({
					position: $.datepicker._inDialog && $.blockUI ? "static" : isFixed ? "fixed" : "absolute",
					display: "none",
					left: offset.left + "px",
					top: offset.top + "px"
				}), inst.inline || (showAnim = $.datepicker._get(inst, "showAnim"), duration = $.datepicker._get(inst, "duration"), inst.dpDiv.css("z-index", datepicker_getZindex($(input)) + 1), $.datepicker._datepickerShowing = !0, $.effects && $.effects.effect[showAnim] ? inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration) : inst.dpDiv[showAnim || "show"](showAnim ? duration : null), $.datepicker._shouldFocusInput(inst) && inst.input.focus(), $.datepicker._curInst = inst))
			}
		},
		_updateDatepicker: function(inst) {
			this.maxRows = 4, datepicker_instActive = inst, inst.dpDiv.empty().append(this._generateHTML(inst)), this._attachHandlers(inst);
			var origyearshtml, numMonths = this._getNumberOfMonths(inst),
				cols = numMonths[1],
				width = 17,
				activeCell = inst.dpDiv.find("." + this._dayOverClass + " a");
			activeCell.length > 0 && datepicker_handleMouseover.apply(activeCell.get(0)), inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), cols > 1 && inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", width * cols + "em"), inst.dpDiv[(1 !== numMonths[0] || 1 !== numMonths[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), inst === $.datepicker._curInst && $.datepicker._datepickerShowing && $.datepicker._shouldFocusInput(inst) && inst.input.focus(), inst.yearshtml && (origyearshtml = inst.yearshtml, setTimeout(function() {
				origyearshtml === inst.yearshtml && inst.yearshtml && inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml), origyearshtml = inst.yearshtml = null
			}, 0))
		},
		_shouldFocusInput: function(inst) {
			return inst.input && inst.input.is(":visible") && !inst.input.is(":disabled") && !inst.input.is(":focus")
		},
		_checkOffset: function(inst, offset, isFixed) {
			var dpWidth = inst.dpDiv.outerWidth(),
				dpHeight = inst.dpDiv.outerHeight(),
				inputWidth = inst.input ? inst.input.outerWidth() : 0,
				inputHeight = inst.input ? inst.input.outerHeight() : 0,
				viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft()),
				viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());
			return offset.left -= this._get(inst, "isRTL") ? dpWidth - inputWidth : 0, offset.left -= isFixed && offset.left === inst.input.offset().left ? $(document).scrollLeft() : 0, offset.top -= isFixed && offset.top === inst.input.offset().top + inputHeight ? $(document).scrollTop() : 0, offset.left -= Math.min(offset.left, offset.left + dpWidth > viewWidth && viewWidth > dpWidth ? Math.abs(offset.left + dpWidth - viewWidth) : 0), offset.top -= Math.min(offset.top, offset.top + dpHeight > viewHeight && viewHeight > dpHeight ? Math.abs(dpHeight + inputHeight) : 0), offset
		},
		_findPos: function(obj) {
			for (var position, inst = this._getInst(obj), isRTL = this._get(inst, "isRTL"); obj && ("hidden" === obj.type || 1 !== obj.nodeType || $.expr.filters.hidden(obj));) obj = obj[isRTL ? "previousSibling" : "nextSibling"];
			return position = $(obj).offset(), [position.left, position.top]
		},
		_hideDatepicker: function(input) {
			var showAnim, duration, postProcess, onClose, inst = this._curInst;
			!inst || input && inst !== $.data(input, "datepicker") || this._datepickerShowing && (showAnim = this._get(inst, "showAnim"), duration = this._get(inst, "duration"), postProcess = function() {
				$.datepicker._tidyDialog(inst)
			}, $.effects && ($.effects.effect[showAnim] || $.effects[showAnim]) ? inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess) : inst.dpDiv["slideDown" === showAnim ? "slideUp" : "fadeIn" === showAnim ? "fadeOut" : "hide"](showAnim ? duration : null, postProcess), showAnim || postProcess(), this._datepickerShowing = !1, onClose = this._get(inst, "onClose"), onClose && onClose.apply(inst.input ? inst.input[0] : null, [inst.input ? inst.input.val() : "", inst]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
				position: "absolute",
				left: "0",
				top: "-100px"
			}), $.blockUI && ($.unblockUI(), $("body").append(this.dpDiv))), this._inDialog = !1)
		},
		_tidyDialog: function(inst) {
			inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
		},
		_checkExternalClick: function(event) {
			if ($.datepicker._curInst) {
				var $target = $(event.target),
					inst = $.datepicker._getInst($target[0]);
				($target[0].id === $.datepicker._mainDivId || 0 !== $target.parents("#" + $.datepicker._mainDivId).length || $target.hasClass($.datepicker.markerClassName) || $target.closest("." + $.datepicker._triggerClass).length || !$.datepicker._datepickerShowing || $.datepicker._inDialog && $.blockUI) && (!$target.hasClass($.datepicker.markerClassName) || $.datepicker._curInst === inst) || $.datepicker._hideDatepicker()
			}
		},
		_adjustDate: function(id, offset, period) {
			var target = $(id),
				inst = this._getInst(target[0]);
			this._isDisabledDatepicker(target[0]) || (this._adjustInstDate(inst, offset + ("M" === period ? this._get(inst, "showCurrentAtPos") : 0), period), this._updateDatepicker(inst))
		},
		_gotoToday: function(id) {
			var date, target = $(id),
				inst = this._getInst(target[0]);
			this._get(inst, "gotoCurrent") && inst.currentDay ? (inst.selectedDay = inst.currentDay, inst.drawMonth = inst.selectedMonth = inst.currentMonth, inst.drawYear = inst.selectedYear = inst.currentYear) : (date = new Date, inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(), inst.drawYear = inst.selectedYear = date.getFullYear()), this._notifyChange(inst), this._adjustDate(target)
		},
		_selectMonthYear: function(id, select, period) {
			var target = $(id),
				inst = this._getInst(target[0]);
			inst["selected" + ("M" === period ? "Month" : "Year")] = inst["draw" + ("M" === period ? "Month" : "Year")] = parseInt(select.options[select.selectedIndex].value, 10), this._notifyChange(inst), this._adjustDate(target)
		},
		_selectDay: function(id, month, year, td) {
			var inst, target = $(id);
			$(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0]) || (inst = this._getInst(target[0]), inst.selectedDay = inst.currentDay = $("a", td).html(), inst.selectedMonth = inst.currentMonth = month, inst.selectedYear = inst.currentYear = year, this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear)))
		},
		_clearDate: function(id) {
			var target = $(id);
			this._selectDate(target, "")
		},
		_selectDate: function(id, dateStr) {
			var onSelect, target = $(id),
				inst = this._getInst(target[0]);
			dateStr = null != dateStr ? dateStr : this._formatDate(inst), inst.input && inst.input.val(dateStr), this._updateAlternate(inst), onSelect = this._get(inst, "onSelect"), onSelect ? onSelect.apply(inst.input ? inst.input[0] : null, [dateStr, inst]) : inst.input && inst.input.trigger("change"), inst.inline ? this._updateDatepicker(inst) : (this._hideDatepicker(), this._lastInput = inst.input[0], "object" != typeof inst.input[0] && inst.input.focus(), this._lastInput = null)
		},
		_updateAlternate: function(inst) {
			var altFormat, date, dateStr, altField = this._get(inst, "altField");
			altField && (altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat"), date = this._getDate(inst), dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst)), $(altField).each(function() {
				$(this).val(dateStr)
			}))
		},
		noWeekends: function(date) {
			var day = date.getDay();
			return [day > 0 && day < 6, ""]
		},
		iso8601Week: function(date) {
			var time, checkDate = new Date(date.getTime());
			return checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7)), time = checkDate.getTime(), checkDate.setMonth(0), checkDate.setDate(1), Math.floor(Math.round((time - checkDate) / 864e5) / 7) + 1
		},
		parseDate: function(format, value, settings) {
			if (null == format || null == value) throw "Invalid arguments";
			if (value = "object" == typeof value ? value.toString() : value + "", "" === value) return null;
			var iFormat, dim, extra, date, iValue = 0,
				shortYearCutoffTemp = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff,
				shortYearCutoff = "string" != typeof shortYearCutoffTemp ? shortYearCutoffTemp : (new Date).getFullYear() % 100 + parseInt(shortYearCutoffTemp, 10),
				dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
				dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
				monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
				monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,
				year = -1,
				month = -1,
				day = -1,
				doy = -1,
				literal = !1,
				lookAhead = function(match) {
					var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
					return matches && iFormat++, matches
				},
				getNumber = function(match) {
					var isDoubled = lookAhead(match),
						size = "@" === match ? 14 : "!" === match ? 20 : "y" === match && isDoubled ? 4 : "o" === match ? 3 : 2,
						minSize = "y" === match ? size : 1,
						digits = new RegExp("^\\d{" + minSize + "," + size + "}"),
						num = value.substring(iValue).match(digits);
					if (!num) throw "Missing number at position " + iValue;
					return iValue += num[0].length, parseInt(num[0], 10)
				},
				getName = function(match, shortNames, longNames) {
					var index = -1,
						names = $.map(lookAhead(match) ? longNames : shortNames, function(v, k) {
							return [[k, v]]
						}).sort(function(a, b) {
							return -(a[1].length - b[1].length)
						});
					if ($.each(names, function(i, pair) {
						var name = pair[1];
						if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) return index = pair[0], iValue += name.length, !1
					}), index !== -1) return index + 1;
					throw "Unknown name at position " + iValue
				},
				checkLiteral = function() {
					if (value.charAt(iValue) !== format.charAt(iFormat)) throw "Unexpected literal at position " + iValue;
					iValue++
				};
			for (iFormat = 0; iFormat < format.length; iFormat++) if (literal)"'" !== format.charAt(iFormat) || lookAhead("'") ? checkLiteral() : literal = !1;
			else switch (format.charAt(iFormat)) {
			case "d":
				day = getNumber("d");
				break;
			case "D":
				getName("D", dayNamesShort, dayNames);
				break;
			case "o":
				doy = getNumber("o");
				break;
			case "m":
				month = getNumber("m");
				break;
			case "M":
				month = getName("M", monthNamesShort, monthNames);
				break;
			case "y":
				year = getNumber("y");
				break;
			case "@":
				date = new Date(getNumber("@")), year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
				break;
			case "!":
				date = new Date((getNumber("!") - this._ticksTo1970) / 1e4), year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
				break;
			case "'":
				lookAhead("'") ? checkLiteral() : literal = !0;
				break;
			default:
				checkLiteral()
			}
			if (iValue < value.length && (extra = value.substr(iValue), !/^\s+/.test(extra))) throw "Extra/unparsed characters found in date: " + extra;
			if (year === -1 ? year = (new Date).getFullYear() : year < 100 && (year += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100)), doy > -1) for (month = 1, day = doy;;) {
				if (dim = this._getDaysInMonth(year, month - 1), day <= dim) break;
				month++, day -= dim
			}
			if (date = this._daylightSavingAdjust(new Date(year, month - 1, day)), date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) throw "Invalid date";
			return date
		},
		ATOM: "yy-mm-dd",
		COOKIE: "D, dd M yy",
		ISO_8601: "yy-mm-dd",
		RFC_822: "D, d M y",
		RFC_850: "DD, dd-M-y",
		RFC_1036: "D, d M y",
		RFC_1123: "D, d M yy",
		RFC_2822: "D, d M yy",
		RSS: "D, d M y",
		TICKS: "!",
		TIMESTAMP: "@",
		W3C: "yy-mm-dd",
		_ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
		formatDate: function(format, date, settings) {
			if (!date) return "";
			var iFormat, dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
				dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
				monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
				monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,
				lookAhead = function(match) {
					var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
					return matches && iFormat++, matches
				},
				formatNumber = function(match, value, len) {
					var num = "" + value;
					if (lookAhead(match)) for (; num.length < len;) num = "0" + num;
					return num
				},
				formatName = function(match, value, shortNames, longNames) {
					return lookAhead(match) ? longNames[value] : shortNames[value]
				},
				output = "",
				literal = !1;
			if (date) for (iFormat = 0; iFormat < format.length; iFormat++) if (literal)"'" !== format.charAt(iFormat) || lookAhead("'") ? output += format.charAt(iFormat) : literal = !1;
			else switch (format.charAt(iFormat)) {
			case "d":
				output += formatNumber("d", date.getDate(), 2);
				break;
			case "D":
				output += formatName("D", date.getDay(), dayNamesShort, dayNames);
				break;
			case "o":
				output += formatNumber("o", Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 864e5), 3);
				break;
			case "m":
				output += formatNumber("m", date.getMonth() + 1, 2);
				break;
			case "M":
				output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
				break;
			case "y":
				output += lookAhead("y") ? date.getFullYear() : (date.getYear() % 100 < 10 ? "0" : "") + date.getYear() % 100;
				break;
			case "@":
				output += date.getTime();
				break;
			case "!":
				output += 1e4 * date.getTime() + this._ticksTo1970;
				break;
			case "'":
				lookAhead("'") ? output += "'" : literal = !0;
				break;
			default:
				output += format.charAt(iFormat)
			}
			return output
		},
		_possibleChars: function(format) {
			var iFormat, chars = "",
				literal = !1,
				lookAhead = function(match) {
					var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
					return matches && iFormat++, matches
				};
			for (iFormat = 0; iFormat < format.length; iFormat++) if (literal)"'" !== format.charAt(iFormat) || lookAhead("'") ? chars += format.charAt(iFormat) : literal = !1;
			else switch (format.charAt(iFormat)) {
			case "d":
			case "m":
			case "y":
			case "@":
				chars += "0123456789";
				break;
			case "D":
			case "M":
				return null;
			case "'":
				lookAhead("'") ? chars += "'" : literal = !0;
				break;
			default:
				chars += format.charAt(iFormat)
			}
			return chars
		},
		_get: function(inst, name) {
			return void 0 !== inst.settings[name] ? inst.settings[name] : this._defaults[name]
		},
		_setDateFromField: function(inst, noDefault) {
			if (inst.input.val() !== inst.lastVal) {
				var dateFormat = this._get(inst, "dateFormat"),
					dates = inst.lastVal = inst.input ? inst.input.val() : null,
					defaultDate = this._getDefaultDate(inst),
					date = defaultDate,
					settings = this._getFormatConfig(inst);
				try {
					date = this.parseDate(dateFormat, dates, settings) || defaultDate
				} catch (event) {
					dates = noDefault ? "" : dates
				}
				inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(), inst.drawYear = inst.selectedYear = date.getFullYear(), inst.currentDay = dates ? date.getDate() : 0, inst.currentMonth = dates ? date.getMonth() : 0, inst.currentYear = dates ? date.getFullYear() : 0, this._adjustInstDate(inst)
			}
		},
		_getDefaultDate: function(inst) {
			return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, "defaultDate"), new Date))
		},
		_determineDate: function(inst, date, defaultDate) {
			var offsetNumeric = function(offset) {
					var date = new Date;
					return date.setDate(date.getDate() + offset), date
				},
				offsetString = function(offset) {
					try {
						return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), offset, $.datepicker._getFormatConfig(inst));
					} catch (e) {}
					for (var date = (offset.toLowerCase().match(/^c/) ? $.datepicker._getDate(inst) : null) || new Date, year = date.getFullYear(), month = date.getMonth(), day = date.getDate(), pattern = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, matches = pattern.exec(offset); matches;) {
						switch (matches[2] || "d") {
						case "d":
						case "D":
							day += parseInt(matches[1], 10);
							break;
						case "w":
						case "W":
							day += 7 * parseInt(matches[1], 10);
							break;
						case "m":
						case "M":
							month += parseInt(matches[1], 10), day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
							break;
						case "y":
						case "Y":
							year += parseInt(matches[1], 10), day = Math.min(day, $.datepicker._getDaysInMonth(year, month))
						}
						matches = pattern.exec(offset)
					}
					return new Date(year, month, day)
				},
				newDate = null == date || "" === date ? defaultDate : "string" == typeof date ? offsetString(date) : "number" == typeof date ? isNaN(date) ? defaultDate : offsetNumeric(date) : new Date(date.getTime());
			return newDate = newDate && "Invalid Date" === newDate.toString() ? defaultDate : newDate, newDate && (newDate.setHours(0), newDate.setMinutes(0), newDate.setSeconds(0), newDate.setMilliseconds(0)), this._daylightSavingAdjust(newDate)
		},
		_daylightSavingAdjust: function(date) {
			return date ? (date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0), date) : null
		},
		_setDate: function(inst, date, noChange) {
			var clear = !date,
				origMonth = inst.selectedMonth,
				origYear = inst.selectedYear,
				newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date));
			inst.selectedDay = inst.currentDay = newDate.getDate(), inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth(), inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear(), origMonth === inst.selectedMonth && origYear === inst.selectedYear || noChange || this._notifyChange(inst), this._adjustInstDate(inst), inst.input && inst.input.val(clear ? "" : this._formatDate(inst))
		},
		_getDate: function(inst) {
			var startDate = !inst.currentYear || inst.input && "" === inst.input.val() ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
			return startDate
		},
		_attachHandlers: function(inst) {
			var stepMonths = this._get(inst, "stepMonths"),
				id = "#" + inst.id.replace(/\\\\/g, "\\");
			inst.dpDiv.find("[data-handler]").map(function() {
				var handler = {
					prev: function() {
						$.datepicker._adjustDate(id, -stepMonths, "M")
					},
					next: function() {
						$.datepicker._adjustDate(id, +stepMonths, "M")
					},
					hide: function() {
						$.datepicker._hideDatepicker()
					},
					today: function() {
						$.datepicker._gotoToday(id)
					},
					selectDay: function() {
						return $.datepicker._selectDay(id, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
					},
					selectMonth: function() {
						return $.datepicker._selectMonthYear(id, this, "M"), !1
					},
					selectYear: function() {
						return $.datepicker._selectMonthYear(id, this, "Y"), !1
					}
				};
				$(this).bind(this.getAttribute("data-event"), handler[this.getAttribute("data-handler")])
			})
		},
		_generateHTML: function(inst) {
			var maxDraw, prevText, prev, nextText, next, currentText, gotoDate, controls, buttonPanel, firstDay, showWeek, dayNames, dayNamesMin, monthNames, monthNamesShort, beforeShowDay, showOtherMonths, selectOtherMonths, defaultDate, html, dow, row, group, col, selectedDate, cornerClass, calender, thead, day, daysInMonth, leadDays, curRows, numRows, printDate, dRow, tbody, daySettings, otherMonth, unselectable, tempDate = new Date,
				today = this._daylightSavingAdjust(new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())),
				isRTL = this._get(inst, "isRTL"),
				showButtonPanel = this._get(inst, "showButtonPanel"),
				hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext"),
				navigationAsDateFormat = this._get(inst, "navigationAsDateFormat"),
				numMonths = this._getNumberOfMonths(inst),
				showCurrentAtPos = this._get(inst, "showCurrentAtPos"),
				stepMonths = this._get(inst, "stepMonths"),
				isMultiMonth = 1 !== numMonths[0] || 1 !== numMonths[1],
				currentDate = this._daylightSavingAdjust(inst.currentDay ? new Date(inst.currentYear, inst.currentMonth, inst.currentDay) : new Date(9999, 9, 9)),
				minDate = this._getMinMaxDate(inst, "min"),
				maxDate = this._getMinMaxDate(inst, "max"),
				drawMonth = inst.drawMonth - showCurrentAtPos,
				drawYear = inst.drawYear;
			if (drawMonth < 0 && (drawMonth += 12, drawYear--), maxDate) for (maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - numMonths[0] * numMonths[1] + 1, maxDate.getDate())), maxDraw = minDate && maxDraw < minDate ? minDate : maxDraw; this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw;) drawMonth--, drawMonth < 0 && (drawMonth = 11, drawYear--);
			for (inst.drawMonth = drawMonth, inst.drawYear = drawYear, prevText = this._get(inst, "prevText"), prevText = navigationAsDateFormat ? this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst)) : prevText, prev = this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "e" : "w") + "'>" + prevText + "</span></a>" : hideIfNoPrevNext ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "e" : "w") + "'>" + prevText + "</span></a>", nextText = this._get(inst, "nextText"), nextText = navigationAsDateFormat ? this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst)) : nextText, next = this._canAdjustMonth(inst, 1, drawYear, drawMonth) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "w" : "e") + "'>" + nextText + "</span></a>" : hideIfNoPrevNext ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "w" : "e") + "'>" + nextText + "</span></a>", currentText = this._get(inst, "currentText"), gotoDate = this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today, currentText = navigationAsDateFormat ? this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)) : currentText, controls = inst.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(inst, "closeText") + "</button>", buttonPanel = showButtonPanel ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (isRTL ? controls : "") + (this._isInRange(inst, gotoDate) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "", firstDay = parseInt(this._get(inst, "firstDay"), 10), firstDay = isNaN(firstDay) ? 0 : firstDay, showWeek = this._get(inst, "showWeek"), dayNames = this._get(inst, "dayNames"), dayNamesMin = this._get(inst, "dayNamesMin"), monthNames = this._get(inst, "monthNames"), monthNamesShort = this._get(inst, "monthNamesShort"), beforeShowDay = this._get(inst, "beforeShowDay"), showOtherMonths = this._get(inst, "showOtherMonths"), selectOtherMonths = this._get(inst, "selectOtherMonths"), defaultDate = this._getDefaultDate(inst), html = "", row = 0; row < numMonths[0]; row++) {
				for (group = "", this.maxRows = 4, col = 0; col < numMonths[1]; col++) {
					if (selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay)), cornerClass = " ui-corner-all", calender = "", isMultiMonth) {
						if (calender += "<div class='ui-datepicker-group", numMonths[1] > 1) switch (col) {
						case 0:
							calender += " ui-datepicker-group-first", cornerClass = " ui-corner-" + (isRTL ? "right" : "left");
							break;
						case numMonths[1] - 1:
							calender += " ui-datepicker-group-last", cornerClass = " ui-corner-" + (isRTL ? "left" : "right");
							break;
						default:
							calender += " ui-datepicker-group-middle", cornerClass = ""
						}
						calender += "'>"
					}
					for (calender += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + cornerClass + "'>" + (/all|left/.test(cornerClass) && 0 === row ? isRTL ? next : prev : "") + (/all|right/.test(cornerClass) && 0 === row ? isRTL ? prev : next : "") + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + "</div><table class='ui-datepicker-calendar'><thead><tr>", thead = showWeek ? "<th class='ui-datepicker-week-col'>" + this._get(inst, "weekHeader") + "</th>" : "", dow = 0; dow < 7; dow++) day = (dow + firstDay) % 7, thead += "<th scope='col'" + ((dow + firstDay + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + dayNames[day] + "'>" + dayNamesMin[day] + "</span></th>";
					for (calender += thead + "</tr></thead><tbody>", daysInMonth = this._getDaysInMonth(drawYear, drawMonth), drawYear === inst.selectedYear && drawMonth === inst.selectedMonth && (inst.selectedDay = Math.min(inst.selectedDay, daysInMonth)), leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7, curRows = Math.ceil((leadDays + daysInMonth) / 7), numRows = isMultiMonth && this.maxRows > curRows ? this.maxRows : curRows, this.maxRows = numRows, printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays)), dRow = 0; dRow < numRows; dRow++) {
						for (calender += "<tr>", tbody = showWeek ? "<td class='ui-datepicker-week-col'>" + this._get(inst, "calculateWeek")(printDate) + "</td>" : "", dow = 0; dow < 7; dow++) daySettings = beforeShowDay ? beforeShowDay.apply(inst.input ? inst.input[0] : null, [printDate]) : [!0, ""], otherMonth = printDate.getMonth() !== drawMonth, unselectable = otherMonth && !selectOtherMonths || !daySettings[0] || minDate && printDate < minDate || maxDate && printDate > maxDate, tbody += "<td class='" + ((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (otherMonth ? " ui-datepicker-other-month" : "") + (printDate.getTime() === selectedDate.getTime() && drawMonth === inst.selectedMonth && inst._keyEvent || defaultDate.getTime() === printDate.getTime() && defaultDate.getTime() === selectedDate.getTime() ? " " + this._dayOverClass : "") + (unselectable ? " " + this._unselectableClass + " ui-state-disabled" : "") + (otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + (printDate.getTime() === currentDate.getTime() ? " " + this._currentClass : "") + (printDate.getTime() === today.getTime() ? " ui-datepicker-today" : "")) + "'" + (otherMonth && !showOtherMonths || !daySettings[2] ? "" : " title='" + daySettings[2].replace(/'/g, "&#39;") + "'") + (unselectable ? "" : " data-handler='selectDay' data-event='click' data-month='" + printDate.getMonth() + "' data-year='" + printDate.getFullYear() + "'") + ">" + (otherMonth && !showOtherMonths ? "&#xa0;" : unselectable ? "<span class='ui-state-default'>" + printDate.getDate() + "</span>" : "<a class='ui-state-default" + (printDate.getTime() === today.getTime() ? " ui-state-highlight" : "") + (printDate.getTime() === currentDate.getTime() ? " ui-state-active" : "") + (otherMonth ? " ui-priority-secondary" : "") + "' href='#'>" + printDate.getDate() + "</a>") + "</td>", printDate.setDate(printDate.getDate() + 1), printDate = this._daylightSavingAdjust(printDate);
						calender += tbody + "</tr>"
					}
					drawMonth++, drawMonth > 11 && (drawMonth = 0, drawYear++), calender += "</tbody></table>" + (isMultiMonth ? "</div>" + (numMonths[0] > 0 && col === numMonths[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), group += calender
				}
				html += group
			}
			return html += buttonPanel, inst._keyEvent = !1, html
		},
		_generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {
			var inMinYear, inMaxYear, month, years, thisYear, determineYear, year, endYear, changeMonth = this._get(inst, "changeMonth"),
				changeYear = this._get(inst, "changeYear"),
				showMonthAfterYear = this._get(inst, "showMonthAfterYear"),
				html = "<div class='ui-datepicker-title'>",
				monthHtml = "";
			if (secondary || !changeMonth) monthHtml += "<span class='ui-datepicker-month'>" + monthNames[drawMonth] + "</span>";
			else {
				for (inMinYear = minDate && minDate.getFullYear() === drawYear, inMaxYear = maxDate && maxDate.getFullYear() === drawYear, monthHtml += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", month = 0; month < 12; month++)(!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth()) && (monthHtml += "<option value='" + month + "'" + (month === drawMonth ? " selected='selected'" : "") + ">" + monthNamesShort[month] + "</option>");
				monthHtml += "</select>"
			}
			if (showMonthAfterYear || (html += monthHtml + (!secondary && changeMonth && changeYear ? "" : "&#xa0;")), !inst.yearshtml) if (inst.yearshtml = "", secondary || !changeYear) html += "<span class='ui-datepicker-year'>" + drawYear + "</span>";
			else {
				for (years = this._get(inst, "yearRange").split(":"), thisYear = (new Date).getFullYear(), determineYear = function(value) {
					var year = value.match(/c[+\-].*/) ? drawYear + parseInt(value.substring(1), 10) : value.match(/[+\-].*/) ? thisYear + parseInt(value, 10) : parseInt(value, 10);
					return isNaN(year) ? thisYear : year
				}, year = determineYear(years[0]), endYear = Math.max(year, determineYear(years[1] || "")), year = minDate ? Math.max(year, minDate.getFullYear()) : year, endYear = maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear, inst.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; year <= endYear; year++) inst.yearshtml += "<option value='" + year + "'" + (year === drawYear ? " selected='selected'" : "") + ">" + year + "</option>";
				inst.yearshtml += "</select>", html += inst.yearshtml, inst.yearshtml = null
			}
			return html += this._get(inst, "yearSuffix"), showMonthAfterYear && (html += (!secondary && changeMonth && changeYear ? "" : "&#xa0;") + monthHtml), html += "</div>"
		},
		_adjustInstDate: function(inst, offset, period) {
			var year = inst.drawYear + ("Y" === period ? offset : 0),
				month = inst.drawMonth + ("M" === period ? offset : 0),
				day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + ("D" === period ? offset : 0),
				date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));
			inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(), inst.drawYear = inst.selectedYear = date.getFullYear(), "M" !== period && "Y" !== period || this._notifyChange(inst)
		},
		_restrictMinMax: function(inst, date) {
			var minDate = this._getMinMaxDate(inst, "min"),
				maxDate = this._getMinMaxDate(inst, "max"),
				newDate = minDate && date < minDate ? minDate : date;
			return maxDate && newDate > maxDate ? maxDate : newDate
		},
		_notifyChange: function(inst) {
			var onChange = this._get(inst, "onChangeMonthYear");
			onChange && onChange.apply(inst.input ? inst.input[0] : null, [inst.selectedYear, inst.selectedMonth + 1, inst])
		},
		_getNumberOfMonths: function(inst) {
			var numMonths = this._get(inst, "numberOfMonths");
			return null == numMonths ? [1, 1] : "number" == typeof numMonths ? [1, numMonths] : numMonths
		},
		_getMinMaxDate: function(inst, minMax) {
			return this._determineDate(inst, this._get(inst, minMax + "Date"), null)
		},
		_getDaysInMonth: function(year, month) {
			return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate()
		},
		_getFirstDayOfMonth: function(year, month) {
			return new Date(year, month, 1).getDay()
		},
		_canAdjustMonth: function(inst, offset, curYear, curMonth) {
			var numMonths = this._getNumberOfMonths(inst),
				date = this._daylightSavingAdjust(new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
			return offset < 0 && date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth())), this._isInRange(inst, date)
		},
		_isInRange: function(inst, date) {
			var yearSplit, currentYear, minDate = this._getMinMaxDate(inst, "min"),
				maxDate = this._getMinMaxDate(inst, "max"),
				minYear = null,
				maxYear = null,
				years = this._get(inst, "yearRange");
			return years && (yearSplit = years.split(":"), currentYear = (new Date).getFullYear(), minYear = parseInt(yearSplit[0], 10), maxYear = parseInt(yearSplit[1], 10), yearSplit[0].match(/[+\-].*/) && (minYear += currentYear), yearSplit[1].match(/[+\-].*/) && (maxYear += currentYear)), (!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime()) && (!minYear || date.getFullYear() >= minYear) && (!maxYear || date.getFullYear() <= maxYear)
		},
		_getFormatConfig: function(inst) {
			var shortYearCutoff = this._get(inst, "shortYearCutoff");
			return shortYearCutoff = "string" != typeof shortYearCutoff ? shortYearCutoff : (new Date).getFullYear() % 100 + parseInt(shortYearCutoff, 10), {
				shortYearCutoff: shortYearCutoff,
				dayNamesShort: this._get(inst, "dayNamesShort"),
				dayNames: this._get(inst, "dayNames"),
				monthNamesShort: this._get(inst, "monthNamesShort"),
				monthNames: this._get(inst, "monthNames")
			}
		},
		_formatDate: function(inst, day, month, year) {
			day || (inst.currentDay = inst.selectedDay, inst.currentMonth = inst.selectedMonth, inst.currentYear = inst.selectedYear);
			var date = day ? "object" == typeof day ? day : this._daylightSavingAdjust(new Date(year, month, day)) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
			return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst))
		}
	}), $.fn.datepicker = function(options) {
		if (!this.length) return this;
		$.datepicker.initialized || ($(document).mousedown($.datepicker._checkExternalClick), $.datepicker.initialized = !0), 0 === $("#" + $.datepicker._mainDivId).length && $("body").append($.datepicker.dpDiv);
		var otherArgs = Array.prototype.slice.call(arguments, 1);
		return "string" != typeof options || "isDisabled" !== options && "getDate" !== options && "widget" !== options ? "option" === options && 2 === arguments.length && "string" == typeof arguments[1] ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs)) : this.each(function() {
			"string" == typeof options ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options)
		}) : $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs))
	}, $.datepicker = new Datepicker, $.datepicker.initialized = !1, $.datepicker.uuid = (new Date).getTime(), $.datepicker.version = "1.11.1";
	$.datepicker;
	$.widget("ui.draggable", $.ui.mouse, {
		version: "1.11.1",
		widgetEventPrefix: "drag",
		options: {
			addClasses: !0,
			appendTo: "parent",
			axis: !1,
			connectToSortable: !1,
			containment: !1,
			cursor: "auto",
			cursorAt: !1,
			grid: !1,
			handle: !1,
			helper: "original",
			iframeFix: !1,
			opacity: !1,
			refreshPositions: !1,
			revert: !1,
			revertDuration: 500,
			scope: "default",
			scroll: !0,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			snap: !1,
			snapMode: "both",
			snapTolerance: 20,
			stack: !1,
			zIndex: !1,
			drag: null,
			start: null,
			stop: null
		},
		_create: function() {
			"original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._setHandleClassName(), this._mouseInit()
		},
		_setOption: function(key, value) {
			this._super(key, value), "handle" === key && (this._removeHandleClassName(), this._setHandleClassName())
		},
		_destroy: function() {
			return (this.helper || this.element).is(".ui-draggable-dragging") ? void(this.destroyOnClear = !0) : (this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._removeHandleClassName(), void this._mouseDestroy())
		},
		_mouseCapture: function(event) {
			var document = this.document[0],
				o = this.options;
			try {
				document.activeElement && "body" !== document.activeElement.nodeName.toLowerCase() && $(document.activeElement).blur()
			} catch (error) {}
			return !(this.helper || o.disabled || $(event.target).closest(".ui-resizable-handle").length > 0) && (this.handle = this._getHandle(event), !! this.handle && ($(o.iframeFix === !0 ? "iframe" : o.iframeFix).each(function() {
				$("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
					width: this.offsetWidth + "px",
					height: this.offsetHeight + "px",
					position: "absolute",
					opacity: "0.001",
					zIndex: 1e3
				}).css($(this).offset()).appendTo("body")
			}), !0))
		},
		_mouseStart: function(event) {
			var o = this.options;
			return this.helper = this._createHelper(event), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), $.ui.ddmanager && ($.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), this.offset = this.positionAbs = this.element.offset(), this.offset = {
				top: this.offset.top - this.margins.top,
				left: this.offset.left - this.margins.left
			}, this.offset.scroll = !1, $.extend(this.offset, {
				click: {
					left: event.pageX - this.offset.left,
					top: event.pageY - this.offset.top
				},
				parent: this._getParentOffset(),
				relative: this._getRelativeOffset()
			}), this.originalPosition = this.position = this._generatePosition(event, !1), this.originalPageX = event.pageX, this.originalPageY = event.pageY, o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt), this._setContainment(), this._trigger("start", event) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), $.ui.ddmanager && !o.dropBehaviour && $.ui.ddmanager.prepareOffsets(this, event), this._mouseDrag(event, !0), $.ui.ddmanager && $.ui.ddmanager.dragStart(this, event), !0)
		},
		_mouseDrag: function(event, noPropagation) {
			if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(event, !0), this.positionAbs = this._convertPositionTo("absolute"), !noPropagation) {
				var ui = this._uiHash();
				if (this._trigger("drag", event, ui) === !1) return this._mouseUp({}), !1;
				this.position = ui.position
			}
			return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", $.ui.ddmanager && $.ui.ddmanager.drag(this, event), !1
		},
		_mouseStop: function(event) {
			var that = this,
				dropped = !1;
			return $.ui.ddmanager && !this.options.dropBehaviour && (dropped = $.ui.ddmanager.drop(this, event)), this.dropped && (dropped = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !dropped || "valid" === this.options.revert && dropped || this.options.revert === !0 || $.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped) ? $(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
				that._trigger("stop", event) !== !1 && that._clear()
			}) : this._trigger("stop", event) !== !1 && this._clear(), !1
		},
		_mouseUp: function(event) {
			return $("div.ui-draggable-iframeFix").each(function() {
				this.parentNode.removeChild(this)
			}), $.ui.ddmanager && $.ui.ddmanager.dragStop(this, event), this.element.focus(), $.ui.mouse.prototype._mouseUp.call(this, event)
		},
		cancel: function() {
			return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
		},
		_getHandle: function(event) {
			return !this.options.handle || !! $(event.target).closest(this.element.find(this.options.handle)).length
		},
		_setHandleClassName: function() {
			this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this.handleElement.addClass("ui-draggable-handle")
		},
		_removeHandleClassName: function() {
			this.handleElement.removeClass("ui-draggable-handle")
		},
		_createHelper: function(event) {
			var o = this.options,
				helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event])) : "clone" === o.helper ? this.element.clone().removeAttr("id") : this.element;
			return helper.parents("body").length || helper.appendTo("parent" === o.appendTo ? this.element[0].parentNode : o.appendTo), helper[0] === this.element[0] || /(fixed|absolute)/.test(helper.css("position")) || helper.css("position", "absolute"), helper
		},
		_adjustOffsetFromHelper: function(obj) {
			"string" == typeof obj && (obj = obj.split(" ")), $.isArray(obj) && (obj = {
				left: +obj[0],
				top: +obj[1] || 0
			}), "left" in obj && (this.offset.click.left = obj.left + this.margins.left), "right" in obj && (this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left), "top" in obj && (this.offset.click.top = obj.top + this.margins.top), "bottom" in obj && (this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top)
		},
		_isRootNode: function(element) {
			return /(html|body)/i.test(element.tagName) || element === this.document[0]
		},
		_getParentOffset: function() {
			var po = this.offsetParent.offset(),
				document = this.document[0];
			return "absolute" === this.cssPosition && this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0]) && (po.left += this.scrollParent.scrollLeft(), po.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (po = {
				top: 0,
				left: 0
			}), {
				top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			}
		},
		_getRelativeOffset: function() {
			if ("relative" !== this.cssPosition) return {
				top: 0,
				left: 0
			};
			var p = this.element.position(),
				scrollIsRootNode = this._isRootNode(this.scrollParent[0]);
			return {
				top: p.top - (parseInt(this.helper.css("top"), 10) || 0) + (scrollIsRootNode ? 0 : this.scrollParent.scrollTop()),
				left: p.left - (parseInt(this.helper.css("left"), 10) || 0) + (scrollIsRootNode ? 0 : this.scrollParent.scrollLeft())
			}
		},
		_cacheMargins: function() {
			this.margins = {
				left: parseInt(this.element.css("marginLeft"), 10) || 0,
				top: parseInt(this.element.css("marginTop"), 10) || 0,
				right: parseInt(this.element.css("marginRight"), 10) || 0,
				bottom: parseInt(this.element.css("marginBottom"), 10) || 0
			}
		},
		_cacheHelperProportions: function() {
			this.helperProportions = {
				width: this.helper.outerWidth(),
				height: this.helper.outerHeight()
			}
		},
		_setContainment: function() {
			var over, c, ce, o = this.options,
				document = this.document[0];
			return this.relativeContainer = null, o.containment ? "window" === o.containment ? void(this.containment = [$(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, $(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, $(window).scrollLeft() + $(window).width() - this.helperProportions.width - this.margins.left, $(window).scrollTop() + ($(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : "document" === o.containment ? void(this.containment = [0, 0, $(document).width() - this.helperProportions.width - this.margins.left, ($(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : o.containment.constructor === Array ? void(this.containment = o.containment) : ("parent" === o.containment && (o.containment = this.helper[0].parentNode), c = $(o.containment), ce = c[0], void(ce && (over = "hidden" !== c.css("overflow"), this.containment = [(parseInt(c.css("borderLeftWidth"), 10) || 0) + (parseInt(c.css("paddingLeft"), 10) || 0), (parseInt(c.css("borderTopWidth"), 10) || 0) + (parseInt(c.css("paddingTop"), 10) || 0), (over ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt(c.css("borderRightWidth"), 10) || 0) - (parseInt(c.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (over ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt(c.css("borderBottomWidth"), 10) || 0) - (parseInt(c.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = c))) : void(this.containment = null)
		},
		_convertPositionTo: function(d, pos) {
			pos || (pos = this.position);
			var mod = "absolute" === d ? 1 : -1,
				scrollIsRootNode = this._isRootNode(this.scrollParent[0]);
			return {
				top: pos.top + this.offset.relative.top * mod + this.offset.parent.top * mod - ("fixed" === this.cssPosition ? -this.offset.scroll.top : scrollIsRootNode ? 0 : this.offset.scroll.top) * mod,
				left: pos.left + this.offset.relative.left * mod + this.offset.parent.left * mod - ("fixed" === this.cssPosition ? -this.offset.scroll.left : scrollIsRootNode ? 0 : this.offset.scroll.left) * mod
			}
		},
		_generatePosition: function(event, constrainPosition) {
			var containment, co, top, left, o = this.options,
				scrollIsRootNode = this._isRootNode(this.scrollParent[0]),
				pageX = event.pageX,
				pageY = event.pageY;
			return scrollIsRootNode && this.offset.scroll || (this.offset.scroll = {
				top: this.scrollParent.scrollTop(),
				left: this.scrollParent.scrollLeft()
			}), constrainPosition && (this.containment && (this.relativeContainer ? (co = this.relativeContainer.offset(), containment = [this.containment[0] + co.left, this.containment[1] + co.top, this.containment[2] + co.left, this.containment[3] + co.top]) : containment = this.containment, event.pageX - this.offset.click.left < containment[0] && (pageX = containment[0] + this.offset.click.left), event.pageY - this.offset.click.top < containment[1] && (pageY = containment[1] + this.offset.click.top), event.pageX - this.offset.click.left > containment[2] && (pageX = containment[2] + this.offset.click.left), event.pageY - this.offset.click.top > containment[3] && (pageY = containment[3] + this.offset.click.top)), o.grid && (top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY, pageY = containment ? top - this.offset.click.top >= containment[1] || top - this.offset.click.top > containment[3] ? top : top - this.offset.click.top >= containment[1] ? top - o.grid[1] : top + o.grid[1] : top, left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX, pageX = containment ? left - this.offset.click.left >= containment[0] || left - this.offset.click.left > containment[2] ? left : left - this.offset.click.left >= containment[0] ? left - o.grid[0] : left + o.grid[0] : left), "y" === o.axis && (pageX = this.originalPageX), "x" === o.axis && (pageY = this.originalPageY)), {
				top: pageY - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : scrollIsRootNode ? 0 : this.offset.scroll.top),
				left: pageX - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : scrollIsRootNode ? 0 : this.offset.scroll.left)
			}
		},
		_clear: function() {
			this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy()
		},
		_trigger: function(type, event, ui) {
			return ui = ui || this._uiHash(), $.ui.plugin.call(this, type, [event, ui, this], !0), "drag" === type && (this.positionAbs = this._convertPositionTo("absolute")), $.Widget.prototype._trigger.call(this, type, event, ui)
		},
		plugins: {},
		_uiHash: function() {
			return {
				helper: this.helper,
				position: this.position,
				originalPosition: this.originalPosition,
				offset: this.positionAbs
			}
		}
	}), $.ui.plugin.add("draggable", "connectToSortable", {
		start: function(event, ui, inst) {
			var o = inst.options,
				uiSortable = $.extend({}, ui, {
					item: inst.element
				});
			inst.sortables = [], $(o.connectToSortable).each(function() {
				var sortable = $(this).sortable("instance");
				sortable && !sortable.options.disabled && (inst.sortables.push({
					instance: sortable,
					shouldRevert: sortable.options.revert
				}), sortable.refreshPositions(), sortable._trigger("activate", event, uiSortable))
			})
		},
		stop: function(event, ui, inst) {
			var uiSortable = $.extend({}, ui, {
				item: inst.element
			});
			$.each(inst.sortables, function() {
				this.instance.isOver ? (this.instance.isOver = 0, inst.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(event), this.instance.options.helper = this.instance.options._helper, "original" === inst.options.helper && this.instance.currentItem.css({
					top: "auto",
					left: "auto"
				})) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", event, uiSortable))
			})
		},
		drag: function(event, ui, inst) {
			var that = this;
			$.each(inst.sortables, function() {
				var innermostIntersecting = !1,
					thisSortable = this;
				this.instance.positionAbs = inst.positionAbs, this.instance.helperProportions = inst.helperProportions, this.instance.offset.click = inst.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (innermostIntersecting = !0, $.each(inst.sortables, function() {
					return this.instance.positionAbs = inst.positionAbs, this.instance.helperProportions = inst.helperProportions, this.instance.offset.click = inst.offset.click, this !== thisSortable && this.instance._intersectsWith(this.instance.containerCache) && $.contains(thisSortable.instance.element[0], this.instance.element[0]) && (innermostIntersecting = !1), innermostIntersecting
				})), innermostIntersecting ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = $(that).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
					return ui.helper[0]
				}, event.target = this.instance.currentItem[0], this.instance._mouseCapture(event, !0), this.instance._mouseStart(event, !0, !0), this.instance.offset.click.top = inst.offset.click.top, this.instance.offset.click.left = inst.offset.click.left, this.instance.offset.parent.left -= inst.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= inst.offset.parent.top - this.instance.offset.parent.top, inst._trigger("toSortable", event), inst.dropped = this.instance.element, inst.currentItem = inst.element, this.instance.fromOutside = inst), this.instance.currentItem && this.instance._mouseDrag(event)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", event, this.instance._uiHash(this.instance)), this.instance._mouseStop(event, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), inst._trigger("fromSortable", event), inst.dropped = !1)
			})
		}
	}), $.ui.plugin.add("draggable", "cursor", {
		start: function(event, ui, instance) {
			var t = $("body"),
				o = instance.options;
			t.css("cursor") && (o._cursor = t.css("cursor")), t.css("cursor", o.cursor)
		},
		stop: function(event, ui, instance) {
			var o = instance.options;
			o._cursor && $("body").css("cursor", o._cursor)
		}
	}), $.ui.plugin.add("draggable", "opacity", {
		start: function(event, ui, instance) {
			var t = $(ui.helper),
				o = instance.options;
			t.css("opacity") && (o._opacity = t.css("opacity")), t.css("opacity", o.opacity)
		},
		stop: function(event, ui, instance) {
			var o = instance.options;
			o._opacity && $(ui.helper).css("opacity", o._opacity)
		}
	}), $.ui.plugin.add("draggable", "scroll", {
		start: function(event, ui, i) {
			i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)), i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset())
		},
		drag: function(event, ui, i) {
			var o = i.options,
				scrolled = !1,
				scrollParent = i.scrollParentNotHidden[0],
				document = i.document[0];
			scrollParent !== document && "HTML" !== scrollParent.tagName ? (o.axis && "x" === o.axis || (i.overflowOffset.top + scrollParent.offsetHeight - event.pageY < o.scrollSensitivity ? scrollParent.scrollTop = scrolled = scrollParent.scrollTop + o.scrollSpeed : event.pageY - i.overflowOffset.top < o.scrollSensitivity && (scrollParent.scrollTop = scrolled = scrollParent.scrollTop - o.scrollSpeed)), o.axis && "y" === o.axis || (i.overflowOffset.left + scrollParent.offsetWidth - event.pageX < o.scrollSensitivity ? scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft + o.scrollSpeed : event.pageX - i.overflowOffset.left < o.scrollSensitivity && (scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft - o.scrollSpeed))) : (o.axis && "x" === o.axis || (event.pageY - $(document).scrollTop() < o.scrollSensitivity ? scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed) : $(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity && (scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed))), o.axis && "y" === o.axis || (event.pageX - $(document).scrollLeft() < o.scrollSensitivity ? scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed) : $(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity && (scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed)))), scrolled !== !1 && $.ui.ddmanager && !o.dropBehaviour && $.ui.ddmanager.prepareOffsets(i, event)
		}
	}), $.ui.plugin.add("draggable", "snap", {
		start: function(event, ui, i) {
			var o = i.options;
			i.snapElements = [], $(o.snap.constructor !== String ? o.snap.items || ":data(ui-draggable)" : o.snap).each(function() {
				var $t = $(this),
					$o = $t.offset();
				this !== i.element[0] && i.snapElements.push({
					item: this,
					width: $t.outerWidth(),
					height: $t.outerHeight(),
					top: $o.top,
					left: $o.left
				})
			})
		},
		drag: function(event, ui, inst) {
			var ts, bs, ls, rs, l, r, t, b, i, first, o = inst.options,
				d = o.snapTolerance,
				x1 = ui.offset.left,
				x2 = x1 + inst.helperProportions.width,
				y1 = ui.offset.top,
				y2 = y1 + inst.helperProportions.height;
			for (i = inst.snapElements.length - 1; i >= 0; i--) l = inst.snapElements[i].left, r = l + inst.snapElements[i].width, t = inst.snapElements[i].top, b = t + inst.snapElements[i].height, x2 < l - d || x1 > r + d || y2 < t - d || y1 > b + d || !$.contains(inst.snapElements[i].item.ownerDocument, inst.snapElements[i].item) ? (inst.snapElements[i].snapping && inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), {
				snapItem: inst.snapElements[i].item
			})), inst.snapElements[i].snapping = !1) : ("inner" !== o.snapMode && (ts = Math.abs(t - y2) <= d, bs = Math.abs(b - y1) <= d, ls = Math.abs(l - x2) <= d, rs = Math.abs(r - x1) <= d, ts && (ui.position.top = inst._convertPositionTo("relative", {
				top: t - inst.helperProportions.height,
				left: 0
			}).top - inst.margins.top), bs && (ui.position.top = inst._convertPositionTo("relative", {
				top: b,
				left: 0
			}).top - inst.margins.top), ls && (ui.position.left = inst._convertPositionTo("relative", {
				top: 0,
				left: l - inst.helperProportions.width
			}).left - inst.margins.left), rs && (ui.position.left = inst._convertPositionTo("relative", {
				top: 0,
				left: r
			}).left - inst.margins.left)), first = ts || bs || ls || rs, "outer" !== o.snapMode && (ts = Math.abs(t - y1) <= d, bs = Math.abs(b - y2) <= d, ls = Math.abs(l - x1) <= d, rs = Math.abs(r - x2) <= d, ts && (ui.position.top = inst._convertPositionTo("relative", {
				top: t,
				left: 0
			}).top - inst.margins.top), bs && (ui.position.top = inst._convertPositionTo("relative", {
				top: b - inst.helperProportions.height,
				left: 0
			}).top - inst.margins.top), ls && (ui.position.left = inst._convertPositionTo("relative", {
				top: 0,
				left: l
			}).left - inst.margins.left), rs && (ui.position.left = inst._convertPositionTo("relative", {
				top: 0,
				left: r - inst.helperProportions.width
			}).left - inst.margins.left)), !inst.snapElements[i].snapping && (ts || bs || ls || rs || first) && inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), {
				snapItem: inst.snapElements[i].item
			})), inst.snapElements[i].snapping = ts || bs || ls || rs || first)
		}
	}), $.ui.plugin.add("draggable", "stack", {
		start: function(event, ui, instance) {
			var min, o = instance.options,
				group = $.makeArray($(o.stack)).sort(function(a, b) {
					return (parseInt($(a).css("zIndex"), 10) || 0) - (parseInt($(b).css("zIndex"), 10) || 0)
				});
			group.length && (min = parseInt($(group[0]).css("zIndex"), 10) || 0, $(group).each(function(i) {
				$(this).css("zIndex", min + i)
			}), this.css("zIndex", min + group.length))
		}
	}), $.ui.plugin.add("draggable", "zIndex", {
		start: function(event, ui, instance) {
			var t = $(ui.helper),
				o = instance.options;
			t.css("zIndex") && (o._zIndex = t.css("zIndex")), t.css("zIndex", o.zIndex)
		},
		stop: function(event, ui, instance) {
			var o = instance.options;
			o._zIndex && $(ui.helper).css("zIndex", o._zIndex)
		}
	});
	$.ui.draggable;
	$.widget("ui.resizable", $.ui.mouse, {
		version: "1.11.1",
		widgetEventPrefix: "resize",
		options: {
			alsoResize: !1,
			animate: !1,
			animateDuration: "slow",
			animateEasing: "swing",
			aspectRatio: !1,
			autoHide: !1,
			containment: !1,
			ghost: !1,
			grid: !1,
			handles: "e,s,se",
			helper: !1,
			maxHeight: null,
			maxWidth: null,
			minHeight: 10,
			minWidth: 10,
			zIndex: 90,
			resize: null,
			start: null,
			stop: null
		},
		_num: function(value) {
			return parseInt(value, 10) || 0
		},
		_isNumber: function(value) {
			return !isNaN(parseInt(value, 10))
		},
		_hasScroll: function(el, a) {
			if ("hidden" === $(el).css("overflow")) return !1;
			var scroll = a && "left" === a ? "scrollLeft" : "scrollTop",
				has = !1;
			return el[scroll] > 0 || (el[scroll] = 1, has = el[scroll] > 0, el[scroll] = 0, has)
		},
		_create: function() {
			var n, i, handle, axis, hname, that = this,
				o = this.options;
			if (this.element.addClass("ui-resizable"), $.extend(this, {
				_aspectRatio: !! o.aspectRatio,
				aspectRatio: o.aspectRatio,
				originalElement: this.element,
				_proportionallyResizeElements: [],
				_helper: o.helper || o.ghost || o.animate ? o.helper || "ui-resizable-helper" : null
			}), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap($("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
				position: this.element.css("position"),
				width: this.element.outerWidth(),
				height: this.element.outerHeight(),
				top: this.element.css("top"),
				left: this.element.css("left")
			})), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, this.element.css({
				marginLeft: this.originalElement.css("marginLeft"),
				marginTop: this.originalElement.css("marginTop"),
				marginRight: this.originalElement.css("marginRight"),
				marginBottom: this.originalElement.css("marginBottom")
			}), this.originalElement.css({
				marginLeft: 0,
				marginTop: 0,
				marginRight: 0,
				marginBottom: 0
			}), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
				position: "static",
				zoom: 1,
				display: "block"
			})), this.originalElement.css({
				margin: this.originalElement.css("margin")
			}), this._proportionallyResize()), this.handles = o.handles || ($(".ui-resizable-handle", this.element).length ? {
				n: ".ui-resizable-n",
				e: ".ui-resizable-e",
				s: ".ui-resizable-s",
				w: ".ui-resizable-w",
				se: ".ui-resizable-se",
				sw: ".ui-resizable-sw",
				ne: ".ui-resizable-ne",
				nw: ".ui-resizable-nw"
			} : "e,s,se"), this.handles.constructor === String) for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), n = this.handles.split(","), this.handles = {}, i = 0; i < n.length; i++) handle = $.trim(n[i]), hname = "ui-resizable-" + handle, axis = $("<div class='ui-resizable-handle " + hname + "'></div>"), axis.css({
				zIndex: o.zIndex
			}), "se" === handle && axis.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[handle] = ".ui-resizable-" + handle, this.element.append(axis);
			this._renderAxis = function(target) {
				var i, axis, padPos, padWrapper;
				target = target || this.element;
				for (i in this.handles) this.handles[i].constructor === String && (this.handles[i] = this.element.children(this.handles[i]).first().show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (axis = $(this.handles[i], this.element), padWrapper = /sw|ne|nw|se|n|s/.test(i) ? axis.outerHeight() : axis.outerWidth(), padPos = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), target.css(padPos, padWrapper), this._proportionallyResize()), $(this.handles[i]).length
			}, this._renderAxis(this.element), this._handles = $(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function() {
				that.resizing || (this.className && (axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), that.axis = axis && axis[1] ? axis[1] : "se")
			}), o.autoHide && (this._handles.hide(), $(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
				o.disabled || ($(this).removeClass("ui-resizable-autohide"), that._handles.show())
			}).mouseleave(function() {
				o.disabled || that.resizing || ($(this).addClass("ui-resizable-autohide"), that._handles.hide())
			})), this._mouseInit()
		},
		_destroy: function() {
			this._mouseDestroy();
			var wrapper, _destroy = function(exp) {
					$(exp).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
				};
			return this.elementIsWrapper && (_destroy(this.element), wrapper = this.element, this.originalElement.css({
				position: wrapper.css("position"),
				width: wrapper.outerWidth(),
				height: wrapper.outerHeight(),
				top: wrapper.css("top"),
				left: wrapper.css("left")
			}).insertAfter(wrapper), wrapper.remove()), this.originalElement.css("resize", this.originalResizeStyle), _destroy(this.originalElement), this
		},
		_mouseCapture: function(event) {
			var i, handle, capture = !1;
			for (i in this.handles) handle = $(this.handles[i])[0], (handle === event.target || $.contains(handle, event.target)) && (capture = !0);
			return !this.options.disabled && capture
		},
		_mouseStart: function(event) {
			var curleft, curtop, cursor, o = this.options,
				el = this.element;
			return this.resizing = !0, this._renderProxy(), curleft = this._num(this.helper.css("left")), curtop = this._num(this.helper.css("top")), o.containment && (curleft += $(o.containment).scrollLeft() || 0, curtop += $(o.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
				left: curleft,
				top: curtop
			}, this.size = this._helper ? {
				width: this.helper.width(),
				height: this.helper.height()
			} : {
				width: el.width(),
				height: el.height()
			}, this.originalSize = this._helper ? {
				width: el.outerWidth(),
				height: el.outerHeight()
			} : {
				width: el.width(),
				height: el.height()
			}, this.sizeDiff = {
				width: el.outerWidth() - el.width(),
				height: el.outerHeight() - el.height()
			}, this.originalPosition = {
				left: curleft,
				top: curtop
			}, this.originalMousePosition = {
				left: event.pageX,
				top: event.pageY
			}, this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1, cursor = $(".ui-resizable-" + this.axis).css("cursor"), $("body").css("cursor", "auto" === cursor ? this.axis + "-resize" : cursor), el.addClass("ui-resizable-resizing"), this._propagate("start", event), !0
		},
		_mouseDrag: function(event) {
			var data, props, smp = this.originalMousePosition,
				a = this.axis,
				dx = event.pageX - smp.left || 0,
				dy = event.pageY - smp.top || 0,
				trigger = this._change[a];
			return this._updatePrevProperties(), !! trigger && (data = trigger.apply(this, [event, dx, dy]), this._updateVirtualBoundaries(event.shiftKey), (this._aspectRatio || event.shiftKey) && (data = this._updateRatio(data, event)), data = this._respectSize(data, event), this._updateCache(data), this._propagate("resize", event), props = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), $.isEmptyObject(props) || (this._updatePrevProperties(), this._trigger("resize", event, this.ui()), this._applyChanges()), !1)
		},
		_mouseStop: function(event) {
			this.resizing = !1;
			var pr, ista, soffseth, soffsetw, s, left, top, o = this.options,
				that = this;
			return this._helper && (pr = this._proportionallyResizeElements, ista = pr.length && /textarea/i.test(pr[0].nodeName), soffseth = ista && this._hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height, soffsetw = ista ? 0 : that.sizeDiff.width, s = {
				width: that.helper.width() - soffsetw,
				height: that.helper.height() - soffseth
			}, left = parseInt(that.element.css("left"), 10) + (that.position.left - that.originalPosition.left) || null, top = parseInt(that.element.css("top"), 10) + (that.position.top - that.originalPosition.top) || null, o.animate || this.element.css($.extend(s, {
				top: top,
				left: left
			})), that.helper.height(that.size.height), that.helper.width(that.size.width), this._helper && !o.animate && this._proportionallyResize()), $("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", event), this._helper && this.helper.remove(), !1
		},
		_updatePrevProperties: function() {
			this.prevPosition = {
				top: this.position.top,
				left: this.position.left
			}, this.prevSize = {
				width: this.size.width,
				height: this.size.height
			}
		},
		_applyChanges: function() {
			var props = {};
			return this.position.top !== this.prevPosition.top && (props.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (props.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (props.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (props.height = this.size.height + "px"), this.helper.css(props), props
		},
		_updateVirtualBoundaries: function(forceAspectRatio) {
			var pMinWidth, pMaxWidth, pMinHeight, pMaxHeight, b, o = this.options;
			b = {
				minWidth: this._isNumber(o.minWidth) ? o.minWidth : 0,
				maxWidth: this._isNumber(o.maxWidth) ? o.maxWidth : 1 / 0,
				minHeight: this._isNumber(o.minHeight) ? o.minHeight : 0,
				maxHeight: this._isNumber(o.maxHeight) ? o.maxHeight : 1 / 0
			}, (this._aspectRatio || forceAspectRatio) && (pMinWidth = b.minHeight * this.aspectRatio, pMinHeight = b.minWidth / this.aspectRatio, pMaxWidth = b.maxHeight * this.aspectRatio, pMaxHeight = b.maxWidth / this.aspectRatio, pMinWidth > b.minWidth && (b.minWidth = pMinWidth), pMinHeight > b.minHeight && (b.minHeight = pMinHeight), pMaxWidth < b.maxWidth && (b.maxWidth = pMaxWidth), pMaxHeight < b.maxHeight && (b.maxHeight = pMaxHeight)), this._vBoundaries = b
		},
		_updateCache: function(data) {
			this.offset = this.helper.offset(), this._isNumber(data.left) && (this.position.left = data.left), this._isNumber(data.top) && (this.position.top = data.top), this._isNumber(data.height) && (this.size.height = data.height), this._isNumber(data.width) && (this.size.width = data.width)
		},
		_updateRatio: function(data) {
			var cpos = this.position,
				csize = this.size,
				a = this.axis;
			return this._isNumber(data.height) ? data.width = data.height * this.aspectRatio : this._isNumber(data.width) && (data.height = data.width / this.aspectRatio), "sw" === a && (data.left = cpos.left + (csize.width - data.width), data.top = null), "nw" === a && (data.top = cpos.top + (csize.height - data.height), data.left = cpos.left + (csize.width - data.width)), data
		},
		_respectSize: function(data) {
			var o = this._vBoundaries,
				a = this.axis,
				ismaxw = this._isNumber(data.width) && o.maxWidth && o.maxWidth < data.width,
				ismaxh = this._isNumber(data.height) && o.maxHeight && o.maxHeight < data.height,
				isminw = this._isNumber(data.width) && o.minWidth && o.minWidth > data.width,
				isminh = this._isNumber(data.height) && o.minHeight && o.minHeight > data.height,
				dw = this.originalPosition.left + this.originalSize.width,
				dh = this.position.top + this.size.height,
				cw = /sw|nw|w/.test(a),
				ch = /nw|ne|n/.test(a);
			return isminw && (data.width = o.minWidth), isminh && (data.height = o.minHeight), ismaxw && (data.width = o.maxWidth), ismaxh && (data.height = o.maxHeight), isminw && cw && (data.left = dw - o.minWidth), ismaxw && cw && (data.left = dw - o.maxWidth), isminh && ch && (data.top = dh - o.minHeight), ismaxh && ch && (data.top = dh - o.maxHeight), data.width || data.height || data.left || !data.top ? data.width || data.height || data.top || !data.left || (data.left = null) : data.top = null, data
		},
		_getPaddingPlusBorderDimensions: function(element) {
			for (var i = 0, widths = [], borders = [element.css("borderTopWidth"), element.css("borderRightWidth"), element.css("borderBottomWidth"), element.css("borderLeftWidth")], paddings = [element.css("paddingTop"), element.css("paddingRight"), element.css("paddingBottom"), element.css("paddingLeft")]; i < 4; i++) widths[i] = parseInt(borders[i], 10) || 0, widths[i] += parseInt(paddings[i], 10) || 0;
			return {
				height: widths[0] + widths[2],
				width: widths[1] + widths[3]
			}
		},
		_proportionallyResize: function() {
			if (this._proportionallyResizeElements.length) for (var prel, i = 0, element = this.helper || this.element; i < this._proportionallyResizeElements.length; i++) prel = this._proportionallyResizeElements[i], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(prel)), prel.css({
				height: element.height() - this.outerDimensions.height || 0,
				width: element.width() - this.outerDimensions.width || 0
			})
		},
		_renderProxy: function() {
			var el = this.element,
				o = this.options;
			this.elementOffset = el.offset(), this._helper ? (this.helper = this.helper || $("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({
				width: this.element.outerWidth() - 1,
				height: this.element.outerHeight() - 1,
				position: "absolute",
				left: this.elementOffset.left + "px",
				top: this.elementOffset.top + "px",
				zIndex: ++o.zIndex
			}), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
		},
		_change: {
			e: function(event, dx) {
				return {
					width: this.originalSize.width + dx
				}
			},
			w: function(event, dx) {
				var cs = this.originalSize,
					sp = this.originalPosition;
				return {
					left: sp.left + dx,
					width: cs.width - dx
				}
			},
			n: function(event, dx, dy) {
				var cs = this.originalSize,
					sp = this.originalPosition;
				return {
					top: sp.top + dy,
					height: cs.height - dy
				}
			},
			s: function(event, dx, dy) {
				return {
					height: this.originalSize.height + dy
				}
			},
			se: function(event, dx, dy) {
				return $.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]))
			},
			sw: function(event, dx, dy) {
				return $.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]))
			},
			ne: function(event, dx, dy) {
				return $.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]))
			},
			nw: function(event, dx, dy) {
				return $.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]))
			}
		},
		_propagate: function(n, event) {
			$.ui.plugin.call(this, n, [event, this.ui()]), "resize" !== n && this._trigger(n, event, this.ui())
		},
		plugins: {},
		ui: function() {
			return {
				originalElement: this.originalElement,
				element: this.element,
				helper: this.helper,
				position: this.position,
				size: this.size,
				originalSize: this.originalSize,
				originalPosition: this.originalPosition
			}
		}
	}), $.ui.plugin.add("resizable", "animate", {
		stop: function(event) {
			var that = $(this).resizable("instance"),
				o = that.options,
				pr = that._proportionallyResizeElements,
				ista = pr.length && /textarea/i.test(pr[0].nodeName),
				soffseth = ista && that._hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height,
				soffsetw = ista ? 0 : that.sizeDiff.width,
				style = {
					width: that.size.width - soffsetw,
					height: that.size.height - soffseth
				},
				left = parseInt(that.element.css("left"), 10) + (that.position.left - that.originalPosition.left) || null,
				top = parseInt(that.element.css("top"), 10) + (that.position.top - that.originalPosition.top) || null;
			that.element.animate($.extend(style, top && left ? {
				top: top,
				left: left
			} : {}), {
				duration: o.animateDuration,
				easing: o.animateEasing,
				step: function() {
					var data = {
						width: parseInt(that.element.css("width"), 10),
						height: parseInt(that.element.css("height"), 10),
						top: parseInt(that.element.css("top"), 10),
						left: parseInt(that.element.css("left"), 10)
					};
					pr && pr.length && $(pr[0]).css({
						width: data.width,
						height: data.height
					}), that._updateCache(data), that._propagate("resize", event)
				}
			})
		}
	}), $.ui.plugin.add("resizable", "containment", {
		start: function() {
			var element, p, co, ch, cw, width, height, that = $(this).resizable("instance"),
				o = that.options,
				el = that.element,
				oc = o.containment,
				ce = oc instanceof $ ? oc.get(0) : /parent/.test(oc) ? el.parent().get(0) : oc;
			ce && (that.containerElement = $(ce), /document/.test(oc) || oc === document ? (that.containerOffset = {
				left: 0,
				top: 0
			}, that.containerPosition = {
				left: 0,
				top: 0
			}, that.parentData = {
				element: $(document),
				left: 0,
				top: 0,
				width: $(document).width(),
				height: $(document).height() || document.body.parentNode.scrollHeight
			}) : (element = $(ce), p = [], $(["Top", "Right", "Left", "Bottom"]).each(function(i, name) {
				p[i] = that._num(element.css("padding" + name))
			}), that.containerOffset = element.offset(), that.containerPosition = element.position(), that.containerSize = {
				height: element.innerHeight() - p[3],
				width: element.innerWidth() - p[1]
			}, co = that.containerOffset, ch = that.containerSize.height, cw = that.containerSize.width, width = that._hasScroll(ce, "left") ? ce.scrollWidth : cw, height = that._hasScroll(ce) ? ce.scrollHeight : ch, that.parentData = {
				element: ce,
				left: co.left,
				top: co.top,
				width: width,
				height: height
			}))
		},
		resize: function(event) {
			var woset, hoset, isParent, isOffsetRelative, that = $(this).resizable("instance"),
				o = that.options,
				co = that.containerOffset,
				cp = that.position,
				pRatio = that._aspectRatio || event.shiftKey,
				cop = {
					top: 0,
					left: 0
				},
				ce = that.containerElement,
				continueResize = !0;
			ce[0] !== document && /static/.test(ce.css("position")) && (cop = co), cp.left < (that._helper ? co.left : 0) && (that.size.width = that.size.width + (that._helper ? that.position.left - co.left : that.position.left - cop.left), pRatio && (that.size.height = that.size.width / that.aspectRatio, continueResize = !1), that.position.left = o.helper ? co.left : 0), cp.top < (that._helper ? co.top : 0) && (that.size.height = that.size.height + (that._helper ? that.position.top - co.top : that.position.top), pRatio && (that.size.width = that.size.height * that.aspectRatio, continueResize = !1), that.position.top = that._helper ? co.top : 0), isParent = that.containerElement.get(0) === that.element.parent().get(0), isOffsetRelative = /relative|absolute/.test(that.containerElement.css("position")), isParent && isOffsetRelative ? (that.offset.left = that.parentData.left + that.position.left, that.offset.top = that.parentData.top + that.position.top) : (that.offset.left = that.element.offset().left, that.offset.top = that.element.offset().top), woset = Math.abs(that.sizeDiff.width + (that._helper ? that.offset.left - cop.left : that.offset.left - co.left)), hoset = Math.abs(that.sizeDiff.height + (that._helper ? that.offset.top - cop.top : that.offset.top - co.top)), woset + that.size.width >= that.parentData.width && (that.size.width = that.parentData.width - woset, pRatio && (that.size.height = that.size.width / that.aspectRatio, continueResize = !1)), hoset + that.size.height >= that.parentData.height && (that.size.height = that.parentData.height - hoset, pRatio && (that.size.width = that.size.height * that.aspectRatio, continueResize = !1)), continueResize || (that.position.left = that.prevPosition.left, that.position.top = that.prevPosition.top, that.size.width = that.prevSize.width, that.size.height = that.prevSize.height)
		},
		stop: function() {
			var that = $(this).resizable("instance"),
				o = that.options,
				co = that.containerOffset,
				cop = that.containerPosition,
				ce = that.containerElement,
				helper = $(that.helper),
				ho = helper.offset(),
				w = helper.outerWidth() - that.sizeDiff.width,
				h = helper.outerHeight() - that.sizeDiff.height;
			that._helper && !o.animate && /relative/.test(ce.css("position")) && $(this).css({
				left: ho.left - cop.left - co.left,
				width: w,
				height: h
			}), that._helper && !o.animate && /static/.test(ce.css("position")) && $(this).css({
				left: ho.left - cop.left - co.left,
				width: w,
				height: h
			})
		}
	}), $.ui.plugin.add("resizable", "alsoResize", {
		start: function() {
			var that = $(this).resizable("instance"),
				o = that.options,
				_store = function(exp) {
					$(exp).each(function() {
						var el = $(this);
						el.data("ui-resizable-alsoresize", {
							width: parseInt(el.width(), 10),
							height: parseInt(el.height(), 10),
							left: parseInt(el.css("left"), 10),
							top: parseInt(el.css("top"), 10)
						})
					})
				};
			"object" != typeof o.alsoResize || o.alsoResize.parentNode ? _store(o.alsoResize) : o.alsoResize.length ? (o.alsoResize = o.alsoResize[0], _store(o.alsoResize)) : $.each(o.alsoResize, function(exp) {
				_store(exp)
			})
		},
		resize: function(event, ui) {
			var that = $(this).resizable("instance"),
				o = that.options,
				os = that.originalSize,
				op = that.originalPosition,
				delta = {
					height: that.size.height - os.height || 0,
					width: that.size.width - os.width || 0,
					top: that.position.top - op.top || 0,
					left: that.position.left - op.left || 0
				},
				_alsoResize = function(exp, c) {
					$(exp).each(function() {
						var el = $(this),
							start = $(this).data("ui-resizable-alsoresize"),
							style = {},
							css = c && c.length ? c : el.parents(ui.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
						$.each(css, function(i, prop) {
							var sum = (start[prop] || 0) + (delta[prop] || 0);
							sum && sum >= 0 && (style[prop] = sum || null)
						}), el.css(style)
					})
				};
			"object" != typeof o.alsoResize || o.alsoResize.nodeType ? _alsoResize(o.alsoResize) : $.each(o.alsoResize, function(exp, c) {
				_alsoResize(exp, c)
			})
		},
		stop: function() {
			$(this).removeData("resizable-alsoresize")
		}
	}), $.ui.plugin.add("resizable", "ghost", {
		start: function() {
			var that = $(this).resizable("instance"),
				o = that.options,
				cs = that.size;
			that.ghost = that.originalElement.clone(), that.ghost.css({
				opacity: .25,
				display: "block",
				position: "relative",
				height: cs.height,
				width: cs.width,
				margin: 0,
				left: 0,
				top: 0
			}).addClass("ui-resizable-ghost").addClass("string" == typeof o.ghost ? o.ghost : ""), that.ghost.appendTo(that.helper)
		},
		resize: function() {
			var that = $(this).resizable("instance");
			that.ghost && that.ghost.css({
				position: "relative",
				height: that.size.height,
				width: that.size.width
			})
		},
		stop: function() {
			var that = $(this).resizable("instance");
			that.ghost && that.helper && that.helper.get(0).removeChild(that.ghost.get(0))
		}
	}), $.ui.plugin.add("resizable", "grid", {
		resize: function() {
			var outerDimensions, that = $(this).resizable("instance"),
				o = that.options,
				cs = that.size,
				os = that.originalSize,
				op = that.originalPosition,
				a = that.axis,
				grid = "number" == typeof o.grid ? [o.grid, o.grid] : o.grid,
				gridX = grid[0] || 1,
				gridY = grid[1] || 1,
				ox = Math.round((cs.width - os.width) / gridX) * gridX,
				oy = Math.round((cs.height - os.height) / gridY) * gridY,
				newWidth = os.width + ox,
				newHeight = os.height + oy,
				isMaxWidth = o.maxWidth && o.maxWidth < newWidth,
				isMaxHeight = o.maxHeight && o.maxHeight < newHeight,
				isMinWidth = o.minWidth && o.minWidth > newWidth,
				isMinHeight = o.minHeight && o.minHeight > newHeight;
			o.grid = grid, isMinWidth && (newWidth += gridX), isMinHeight && (newHeight += gridY), isMaxWidth && (newWidth -= gridX), isMaxHeight && (newHeight -= gridY), /^(se|s|e)$/.test(a) ? (that.size.width = newWidth, that.size.height = newHeight) : /^(ne)$/.test(a) ? (that.size.width = newWidth, that.size.height = newHeight, that.position.top = op.top - oy) : /^(sw)$/.test(a) ? (that.size.width = newWidth, that.size.height = newHeight, that.position.left = op.left - ox) : ((newHeight - gridY <= 0 || newWidth - gridX <= 0) && (outerDimensions = that._getPaddingPlusBorderDimensions(this)), newHeight - gridY > 0 ? (that.size.height = newHeight, that.position.top = op.top - oy) : (newHeight = gridY - outerDimensions.height, that.size.height = newHeight, that.position.top = op.top + os.height - newHeight), newWidth - gridX > 0 ? (that.size.width = newWidth, that.position.left = op.left - ox) : (newWidth = gridY - outerDimensions.height, that.size.width = newWidth, that.position.left = op.left + os.width - newWidth))
		}
	});
	$.ui.resizable, $.widget("ui.dialog", {
		version: "1.11.1",
		options: {
			appendTo: "body",
			autoOpen: !0,
			buttons: [],
			closeOnEscape: !0,
			closeText: "Close",
			dialogClass: "",
			draggable: !0,
			hide: null,
			height: "auto",
			maxHeight: null,
			maxWidth: null,
			minHeight: 150,
			minWidth: 150,
			modal: !1,
			position: {
				my: "center",
				at: "center",
				of: window,
				collision: "fit",
				using: function(pos) {
					var topOffset = $(this).css(pos).offset().top;
					topOffset < 0 && $(this).css("top", pos.top - topOffset)
				}
			},
			resizable: !0,
			show: null,
			title: null,
			width: 300,
			beforeClose: null,
			close: null,
			drag: null,
			dragStart: null,
			dragStop: null,
			focus: null,
			open: null,
			resize: null,
			resizeStart: null,
			resizeStop: null
		},
		sizeRelatedOptions: {
			buttons: !0,
			height: !0,
			maxHeight: !0,
			maxWidth: !0,
			minHeight: !0,
			minWidth: !0,
			width: !0
		},
		resizableRelatedOptions: {
			maxHeight: !0,
			maxWidth: !0,
			minHeight: !0,
			minWidth: !0
		},
		_create: function() {
			this.originalCss = {
				display: this.element[0].style.display,
				width: this.element[0].style.width,
				minHeight: this.element[0].style.minHeight,
				maxHeight: this.element[0].style.maxHeight,
				height: this.element[0].style.height
			}, this.originalPosition = {
				parent: this.element.parent(),
				index: this.element.parent().children().index(this.element)
			}, this.originalTitle = this.element.attr("title"), this.options.title = this.options.title || this.originalTitle, this._createWrapper(), this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog), this._createTitlebar(), this._createButtonPane(), this.options.draggable && $.fn.draggable && this._makeDraggable(), this.options.resizable && $.fn.resizable && this._makeResizable(), this._isOpen = !1, this._trackFocus()
		},
		_init: function() {
			this.options.autoOpen && this.open()
		},
		_appendTo: function() {
			var element = this.options.appendTo;
			return element && (element.jquery || element.nodeType) ? $(element) : this.document.find(element || "body").eq(0)
		},
		_destroy: function() {
			var next, originalPosition = this.originalPosition;
			this._destroyOverlay(), this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(), this.uiDialog.stop(!0, !0).remove(), this.originalTitle && this.element.attr("title", this.originalTitle), next = originalPosition.parent.children().eq(originalPosition.index), next.length && next[0] !== this.element[0] ? next.before(this.element) : originalPosition.parent.append(this.element)
		},
		widget: function() {
			return this.uiDialog
		},
		disable: $.noop,
		enable: $.noop,
		close: function(event) {
			var activeElement, that = this;
			if (this._isOpen && this._trigger("beforeClose", event) !== !1) {
				if (this._isOpen = !1, this._focusedElement = null, this._destroyOverlay(), this._untrackInstance(), !this.opener.filter(":focusable").focus().length) try {
					activeElement = this.document[0].activeElement, activeElement && "body" !== activeElement.nodeName.toLowerCase() && $(activeElement).blur()
				} catch (error) {}
				this._hide(this.uiDialog, this.options.hide, function() {
					that._trigger("close", event)
				})
			}
		},
		isOpen: function() {
			return this._isOpen
		},
		moveToTop: function() {
			this._moveToTop()
		},
		_moveToTop: function(event, silent) {
			var moved = !1,
				zIndicies = this.uiDialog.siblings(".ui-front:visible").map(function() {
					return +$(this).css("z-index")
				}).get(),
				zIndexMax = Math.max.apply(null, zIndicies);
			return zIndexMax >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", zIndexMax + 1), moved = !0), moved && !silent && this._trigger("focus", event), moved
		},
		open: function() {
			var that = this;
			return this._isOpen ? void(this._moveToTop() && this._focusTabbable()) : (this._isOpen = !0, this.opener = $(this.document[0].activeElement), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1), this._show(this.uiDialog, this.options.show, function() {
				that._focusTabbable(), that._trigger("focus")
			}), this._makeFocusTarget(), void this._trigger("open"))
		},
		_focusTabbable: function() {
			var hasFocus = this._focusedElement;
			hasFocus || (hasFocus = this.element.find("[autofocus]")), hasFocus.length || (hasFocus = this.element.find(":tabbable")), hasFocus.length || (hasFocus = this.uiDialogButtonPane.find(":tabbable")), hasFocus.length || (hasFocus = this.uiDialogTitlebarClose.filter(":tabbable")), hasFocus.length || (hasFocus = this.uiDialog), hasFocus.eq(0).focus()
		},
		_keepFocus: function(event) {
			function checkFocus() {
				var activeElement = this.document[0].activeElement,
					isActive = this.uiDialog[0] === activeElement || $.contains(this.uiDialog[0], activeElement);
				isActive || this._focusTabbable()
			}
			event.preventDefault(), checkFocus.call(this), this._delay(checkFocus)
		},
		_createWrapper: function() {
			this.uiDialog = $("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
				tabIndex: -1,
				role: "dialog"
			}).appendTo(this._appendTo()), this._on(this.uiDialog, {
				keydown: function(event) {
					if (this.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode && event.keyCode === $.ui.keyCode.ESCAPE) return event.preventDefault(), void this.close(event);
					if (event.keyCode === $.ui.keyCode.TAB && !event.isDefaultPrevented()) {
						var tabbables = this.uiDialog.find(":tabbable"),
							first = tabbables.filter(":first"),
							last = tabbables.filter(":last");
						event.target !== last[0] && event.target !== this.uiDialog[0] || event.shiftKey ? event.target !== first[0] && event.target !== this.uiDialog[0] || !event.shiftKey || (this._delay(function() {
							last.focus()
						}), event.preventDefault()) : (this._delay(function() {
							first.focus()
						}), event.preventDefault())
					}
				},
				mousedown: function(event) {
					this._moveToTop(event) && this._focusTabbable()
				}
			}), this.element.find("[aria-describedby]").length || this.uiDialog.attr({
				"aria-describedby": this.element.uniqueId().attr("id")
			})
		},
		_createTitlebar: function() {
			var uiDialogTitle;
			this.uiDialogTitlebar = $("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog), this._on(this.uiDialogTitlebar, {
				mousedown: function(event) {
					$(event.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus();
				}
			}), this.uiDialogTitlebarClose = $("<button type='button'></button>").button({
				label: this.options.closeText,
				icons: {
					primary: "ui-icon-closethick"
				},
				text: !1
			}).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar), this._on(this.uiDialogTitlebarClose, {
				click: function(event) {
					event.preventDefault(), this.close(event)
				}
			}), uiDialogTitle = $("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar), this._title(uiDialogTitle), this.uiDialog.attr({
				"aria-labelledby": uiDialogTitle.attr("id")
			})
		},
		_title: function(title) {
			this.options.title || title.html("&#160;"), title.text(this.options.title)
		},
		_createButtonPane: function() {
			this.uiDialogButtonPane = $("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), this.uiButtonSet = $("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane), this._createButtons()
		},
		_createButtons: function() {
			var that = this,
				buttons = this.options.buttons;
			return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), $.isEmptyObject(buttons) || $.isArray(buttons) && !buttons.length ? void this.uiDialog.removeClass("ui-dialog-buttons") : ($.each(buttons, function(name, props) {
				var click, buttonOptions;
				props = $.isFunction(props) ? {
					click: props,
					text: name
				} : props, props = $.extend({
					type: "button"
				}, props), click = props.click, props.click = function() {
					click.apply(that.element[0], arguments)
				}, buttonOptions = {
					icons: props.icons,
					text: props.showText
				}, delete props.icons, delete props.showText, $("<button></button>", props).button(buttonOptions).appendTo(that.uiButtonSet)
			}), this.uiDialog.addClass("ui-dialog-buttons"), void this.uiDialogButtonPane.appendTo(this.uiDialog))
		},
		_makeDraggable: function() {
			function filteredUi(ui) {
				return {
					position: ui.position,
					offset: ui.offset
				}
			}
			var that = this,
				options = this.options;
			this.uiDialog.draggable({
				cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
				handle: ".ui-dialog-titlebar",
				containment: "document",
				start: function(event, ui) {
					$(this).addClass("ui-dialog-dragging"), that._blockFrames(), that._trigger("dragStart", event, filteredUi(ui))
				},
				drag: function(event, ui) {
					that._trigger("drag", event, filteredUi(ui))
				},
				stop: function(event, ui) {
					var left = ui.offset.left - that.document.scrollLeft(),
						top = ui.offset.top - that.document.scrollTop();
					options.position = {
						my: "left top",
						at: "left" + (left >= 0 ? "+" : "") + left + " top" + (top >= 0 ? "+" : "") + top,
						of: that.window
					}, $(this).removeClass("ui-dialog-dragging"), that._unblockFrames(), that._trigger("dragStop", event, filteredUi(ui))
				}
			})
		},
		_makeResizable: function() {
			function filteredUi(ui) {
				return {
					originalPosition: ui.originalPosition,
					originalSize: ui.originalSize,
					position: ui.position,
					size: ui.size
				}
			}
			var that = this,
				options = this.options,
				handles = options.resizable,
				position = this.uiDialog.css("position"),
				resizeHandles = "string" == typeof handles ? handles : "n,e,s,w,se,sw,ne,nw";
			this.uiDialog.resizable({
				cancel: ".ui-dialog-content",
				containment: "document",
				alsoResize: this.element,
				maxWidth: options.maxWidth,
				maxHeight: options.maxHeight,
				minWidth: options.minWidth,
				minHeight: this._minHeight(),
				handles: resizeHandles,
				start: function(event, ui) {
					$(this).addClass("ui-dialog-resizing"), that._blockFrames(), that._trigger("resizeStart", event, filteredUi(ui))
				},
				resize: function(event, ui) {
					that._trigger("resize", event, filteredUi(ui))
				},
				stop: function(event, ui) {
					var offset = that.uiDialog.offset(),
						left = offset.left - that.document.scrollLeft(),
						top = offset.top - that.document.scrollTop();
					options.height = that.uiDialog.height(), options.width = that.uiDialog.width(), options.position = {
						my: "left top",
						at: "left" + (left >= 0 ? "+" : "") + left + " top" + (top >= 0 ? "+" : "") + top,
						of: that.window
					}, $(this).removeClass("ui-dialog-resizing"), that._unblockFrames(), that._trigger("resizeStop", event, filteredUi(ui))
				}
			}).css("position", position)
		},
		_trackFocus: function() {
			this._on(this.widget(), {
				focusin: function(event) {
					this._makeFocusTarget(), this._focusedElement = $(event.target)
				}
			})
		},
		_makeFocusTarget: function() {
			this._untrackInstance(), this._trackingInstances().unshift(this)
		},
		_untrackInstance: function() {
			var instances = this._trackingInstances(),
				exists = $.inArray(this, instances);
			exists !== -1 && instances.splice(exists, 1)
		},
		_trackingInstances: function() {
			var instances = this.document.data("ui-dialog-instances");
			return instances || (instances = [], this.document.data("ui-dialog-instances", instances)), instances
		},
		_minHeight: function() {
			var options = this.options;
			return "auto" === options.height ? options.minHeight : Math.min(options.minHeight, options.height)
		},
		_position: function() {
			var isVisible = this.uiDialog.is(":visible");
			isVisible || this.uiDialog.show(), this.uiDialog.position(this.options.position), isVisible || this.uiDialog.hide()
		},
		_setOptions: function(options) {
			var that = this,
				resize = !1,
				resizableOptions = {};
			$.each(options, function(key, value) {
				that._setOption(key, value), key in that.sizeRelatedOptions && (resize = !0), key in that.resizableRelatedOptions && (resizableOptions[key] = value)
			}), resize && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", resizableOptions)
		},
		_setOption: function(key, value) {
			var isDraggable, isResizable, uiDialog = this.uiDialog;
			"dialogClass" === key && uiDialog.removeClass(this.options.dialogClass).addClass(value), "disabled" !== key && (this._super(key, value), "appendTo" === key && this.uiDialog.appendTo(this._appendTo()), "buttons" === key && this._createButtons(), "closeText" === key && this.uiDialogTitlebarClose.button({
				label: "" + value
			}), "draggable" === key && (isDraggable = uiDialog.is(":data(ui-draggable)"), isDraggable && !value && uiDialog.draggable("destroy"), !isDraggable && value && this._makeDraggable()), "position" === key && this._position(), "resizable" === key && (isResizable = uiDialog.is(":data(ui-resizable)"), isResizable && !value && uiDialog.resizable("destroy"), isResizable && "string" == typeof value && uiDialog.resizable("option", "handles", value), isResizable || value === !1 || this._makeResizable()), "title" === key && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
		},
		_size: function() {
			var nonContentHeight, minContentHeight, maxContentHeight, options = this.options;
			this.element.show().css({
				width: "auto",
				minHeight: 0,
				maxHeight: "none",
				height: 0
			}), options.minWidth > options.width && (options.width = options.minWidth), nonContentHeight = this.uiDialog.css({
				height: "auto",
				width: options.width
			}).outerHeight(), minContentHeight = Math.max(0, options.minHeight - nonContentHeight), maxContentHeight = "number" == typeof options.maxHeight ? Math.max(0, options.maxHeight - nonContentHeight) : "none", "auto" === options.height ? this.element.css({
				minHeight: minContentHeight,
				maxHeight: maxContentHeight,
				height: "auto"
			}) : this.element.height(Math.max(0, options.height - nonContentHeight)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
		},
		_blockFrames: function() {
			this.iframeBlocks = this.document.find("iframe").map(function() {
				var iframe = $(this);
				return $("<div>").css({
					position: "absolute",
					width: iframe.outerWidth(),
					height: iframe.outerHeight()
				}).appendTo(iframe.parent()).offset(iframe.offset())[0]
			})
		},
		_unblockFrames: function() {
			this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
		},
		_allowInteraction: function(event) {
			return !!$(event.target).closest(".ui-dialog").length || !! $(event.target).closest(".ui-datepicker").length
		},
		_createOverlay: function() {
			if (this.options.modal) {
				var isOpening = !0;
				this._delay(function() {
					isOpening = !1
				}), this.document.data("ui-dialog-overlays") || this._on(this.document, {
					focusin: function(event) {
						isOpening || this._allowInteraction(event) || (event.preventDefault(), this._trackingInstances()[0]._focusTabbable())
					}
				}), this.overlay = $("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()), this._on(this.overlay, {
					mousedown: "_keepFocus"
				}), this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1)
			}
		},
		_destroyOverlay: function() {
			if (this.options.modal && this.overlay) {
				var overlays = this.document.data("ui-dialog-overlays") - 1;
				overlays ? this.document.data("ui-dialog-overlays", overlays) : this.document.unbind("focusin").removeData("ui-dialog-overlays"), this.overlay.remove(), this.overlay = null
			}
		}
	});
	$.widget("ui.droppable", {
		version: "1.11.1",
		widgetEventPrefix: "drop",
		options: {
			accept: "*",
			activeClass: !1,
			addClasses: !0,
			greedy: !1,
			hoverClass: !1,
			scope: "default",
			tolerance: "intersect",
			activate: null,
			deactivate: null,
			drop: null,
			out: null,
			over: null
		},
		_create: function() {
			var proportions, o = this.options,
				accept = o.accept;
			this.isover = !1, this.isout = !0, this.accept = $.isFunction(accept) ? accept : function(d) {
				return d.is(accept)
			}, this.proportions = function() {
				return arguments.length ? void(proportions = arguments[0]) : proportions ? proportions : proportions = {
					width: this.element[0].offsetWidth,
					height: this.element[0].offsetHeight
				}
			}, this._addToManager(o.scope), o.addClasses && this.element.addClass("ui-droppable")
		},
		_addToManager: function(scope) {
			$.ui.ddmanager.droppables[scope] = $.ui.ddmanager.droppables[scope] || [], $.ui.ddmanager.droppables[scope].push(this)
		},
		_splice: function(drop) {
			for (var i = 0; i < drop.length; i++) drop[i] === this && drop.splice(i, 1)
		},
		_destroy: function() {
			var drop = $.ui.ddmanager.droppables[this.options.scope];
			this._splice(drop), this.element.removeClass("ui-droppable ui-droppable-disabled")
		},
		_setOption: function(key, value) {
			if ("accept" === key) this.accept = $.isFunction(value) ? value : function(d) {
				return d.is(value)
			};
			else if ("scope" === key) {
				var drop = $.ui.ddmanager.droppables[this.options.scope];
				this._splice(drop), this._addToManager(value)
			}
			this._super(key, value)
		},
		_activate: function(event) {
			var draggable = $.ui.ddmanager.current;
			this.options.activeClass && this.element.addClass(this.options.activeClass), draggable && this._trigger("activate", event, this.ui(draggable))
		},
		_deactivate: function(event) {
			var draggable = $.ui.ddmanager.current;
			this.options.activeClass && this.element.removeClass(this.options.activeClass), draggable && this._trigger("deactivate", event, this.ui(draggable))
		},
		_over: function(event) {
			var draggable = $.ui.ddmanager.current;
			draggable && (draggable.currentItem || draggable.element)[0] !== this.element[0] && this.accept.call(this.element[0], draggable.currentItem || draggable.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", event, this.ui(draggable)))
		},
		_out: function(event) {
			var draggable = $.ui.ddmanager.current;
			draggable && (draggable.currentItem || draggable.element)[0] !== this.element[0] && this.accept.call(this.element[0], draggable.currentItem || draggable.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", event, this.ui(draggable)))
		},
		_drop: function(event, custom) {
			var draggable = custom || $.ui.ddmanager.current,
				childrenIntersection = !1;
			return !(!draggable || (draggable.currentItem || draggable.element)[0] === this.element[0]) && (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
				var inst = $(this).droppable("instance");
				if (inst.options.greedy && !inst.options.disabled && inst.options.scope === draggable.options.scope && inst.accept.call(inst.element[0], draggable.currentItem || draggable.element) && $.ui.intersect(draggable, $.extend(inst, {
					offset: inst.element.offset()
				}), inst.options.tolerance, event)) return childrenIntersection = !0, !1
			}), !childrenIntersection && ( !! this.accept.call(this.element[0], draggable.currentItem || draggable.element) && (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", event, this.ui(draggable)), this.element)))
		},
		ui: function(c) {
			return {
				draggable: c.currentItem || c.element,
				helper: c.helper,
				position: c.position,
				offset: c.positionAbs
			}
		}
	}), $.ui.intersect = function() {
		function isOverAxis(x, reference, size) {
			return x >= reference && x < reference + size
		}
		return function(draggable, droppable, toleranceMode, event) {
			if (!droppable.offset) return !1;
			var x1 = (draggable.positionAbs || draggable.position.absolute).left,
				y1 = (draggable.positionAbs || draggable.position.absolute).top,
				x2 = x1 + draggable.helperProportions.width,
				y2 = y1 + draggable.helperProportions.height,
				l = droppable.offset.left,
				t = droppable.offset.top,
				r = l + droppable.proportions().width,
				b = t + droppable.proportions().height;
			switch (toleranceMode) {
			case "fit":
				return l <= x1 && x2 <= r && t <= y1 && y2 <= b;
			case "intersect":
				return l < x1 + draggable.helperProportions.width / 2 && x2 - draggable.helperProportions.width / 2 < r && t < y1 + draggable.helperProportions.height / 2 && y2 - draggable.helperProportions.height / 2 < b;
			case "pointer":
				return isOverAxis(event.pageY, t, droppable.proportions().height) && isOverAxis(event.pageX, l, droppable.proportions().width);
			case "touch":
				return (y1 >= t && y1 <= b || y2 >= t && y2 <= b || y1 < t && y2 > b) && (x1 >= l && x1 <= r || x2 >= l && x2 <= r || x1 < l && x2 > r);
			default:
				return !1
			}
		}
	}(), $.ui.ddmanager = {
		current: null,
		droppables: {
		default:
			[]
		},
		prepareOffsets: function(t, event) {
			var i, j, m = $.ui.ddmanager.droppables[t.options.scope] || [],
				type = event ? event.type : null,
				list = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();
			droppablesLoop: for (i = 0; i < m.length; i++) if (!(m[i].options.disabled || t && !m[i].accept.call(m[i].element[0], t.currentItem || t.element))) {
				for (j = 0; j < list.length; j++) if (list[j] === m[i].element[0]) {
					m[i].proportions().height = 0;
					continue droppablesLoop
				}
				m[i].visible = "none" !== m[i].element.css("display"), m[i].visible && ("mousedown" === type && m[i]._activate.call(m[i], event), m[i].offset = m[i].element.offset(), m[i].proportions({
					width: m[i].element[0].offsetWidth,
					height: m[i].element[0].offsetHeight
				}))
			}
		},
		drop: function(draggable, event) {
			var dropped = !1;
			return $.each(($.ui.ddmanager.droppables[draggable.options.scope] || []).slice(), function() {
				this.options && (!this.options.disabled && this.visible && $.ui.intersect(draggable, this, this.options.tolerance, event) && (dropped = this._drop.call(this, event) || dropped), !this.options.disabled && this.visible && this.accept.call(this.element[0], draggable.currentItem || draggable.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, event)))
			}), dropped
		},
		dragStart: function(draggable, event) {
			draggable.element.parentsUntil("body").bind("scroll.droppable", function() {
				draggable.options.refreshPositions || $.ui.ddmanager.prepareOffsets(draggable, event)
			})
		},
		drag: function(draggable, event) {
			draggable.options.refreshPositions && $.ui.ddmanager.prepareOffsets(draggable, event), $.each($.ui.ddmanager.droppables[draggable.options.scope] || [], function() {
				if (!this.options.disabled && !this.greedyChild && this.visible) {
					var parentInstance, scope, parent, intersects = $.ui.intersect(draggable, this, this.options.tolerance, event),
						c = !intersects && this.isover ? "isout" : intersects && !this.isover ? "isover" : null;
					c && (this.options.greedy && (scope = this.options.scope, parent = this.element.parents(":data(ui-droppable)").filter(function() {
						return $(this).droppable("instance").options.scope === scope
					}), parent.length && (parentInstance = $(parent[0]).droppable("instance"), parentInstance.greedyChild = "isover" === c)), parentInstance && "isover" === c && (parentInstance.isover = !1, parentInstance.isout = !0, parentInstance._out.call(parentInstance, event)), this[c] = !0, this["isout" === c ? "isover" : "isout"] = !1, this["isover" === c ? "_over" : "_out"].call(this, event), parentInstance && "isout" === c && (parentInstance.isout = !1, parentInstance.isover = !0, parentInstance._over.call(parentInstance, event)))
				}
			})
		},
		dragStop: function(draggable, event) {
			draggable.element.parentsUntil("body").unbind("scroll.droppable"), draggable.options.refreshPositions || $.ui.ddmanager.prepareOffsets(draggable, event)
		}
	};
	var dataSpace = ($.ui.droppable, "ui-effects-"),
		jQuery = $;
	$.effects = {
		effect: {}
	}, function(jQuery, undefined) {
		function clamp(value, prop, allowEmpty) {
			var type = propTypes[prop.type] || {};
			return null == value ? allowEmpty || !prop.def ? null : prop.def : (value = type.floor ? ~~value : parseFloat(value), isNaN(value) ? prop.def : type.mod ? (value + type.mod) % type.mod : 0 > value ? 0 : type.max < value ? type.max : value)
		}
		function stringParse(string) {
			var inst = color(),
				rgba = inst._rgba = [];
			return string = string.toLowerCase(), each(stringParsers, function(i, parser) {
				var parsed, match = parser.re.exec(string),
					values = match && parser.parse(match),
					spaceName = parser.space || "rgba";
				if (values) return parsed = inst[spaceName](values), inst[spaces[spaceName].cache] = parsed[spaces[spaceName].cache], rgba = inst._rgba = parsed._rgba, !1
			}), rgba.length ? ("0,0,0,0" === rgba.join() && jQuery.extend(rgba, colors.transparent), inst) : colors[string]
		}
		function hue2rgb(p, q, h) {
			return h = (h + 1) % 1, 6 * h < 1 ? p + (q - p) * h * 6 : 2 * h < 1 ? q : 3 * h < 2 ? p + (q - p) * (2 / 3 - h) * 6 : p
		}
		var colors, stepHooks = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
			rplusequals = /^([\-+])=\s*(\d+\.?\d*)/,
			stringParsers = [{
				re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
				parse: function(execResult) {
					return [execResult[1], execResult[2], execResult[3], execResult[4]]
				}
			}, {
				re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
				parse: function(execResult) {
					return [2.55 * execResult[1], 2.55 * execResult[2], 2.55 * execResult[3], execResult[4]]
				}
			}, {
				re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
				parse: function(execResult) {
					return [parseInt(execResult[1], 16), parseInt(execResult[2], 16), parseInt(execResult[3], 16)]
				}
			}, {
				re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
				parse: function(execResult) {
					return [parseInt(execResult[1] + execResult[1], 16), parseInt(execResult[2] + execResult[2], 16), parseInt(execResult[3] + execResult[3], 16)]
				}
			}, {
				re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
				space: "hsla",
				parse: function(execResult) {
					return [execResult[1], execResult[2] / 100, execResult[3] / 100, execResult[4]]
				}
			}],
			color = jQuery.Color = function(color, green, blue, alpha) {
				return new jQuery.Color.fn.parse(color, green, blue, alpha)
			},
			spaces = {
				rgba: {
					props: {
						red: {
							idx: 0,
							type: "byte"
						},
						green: {
							idx: 1,
							type: "byte"
						},
						blue: {
							idx: 2,
							type: "byte"
						}
					}
				},
				hsla: {
					props: {
						hue: {
							idx: 0,
							type: "degrees"
						},
						saturation: {
							idx: 1,
							type: "percent"
						},
						lightness: {
							idx: 2,
							type: "percent"
						}
					}
				}
			},
			propTypes = {
				byte: {
					floor: !0,
					max: 255
				},
				percent: {
					max: 1
				},
				degrees: {
					mod: 360,
					floor: !0
				}
			},
			support = color.support = {},
			supportElem = jQuery("<p>")[0],
			each = jQuery.each;
		supportElem.style.cssText = "background-color:rgba(1,1,1,.5)", support.rgba = supportElem.style.backgroundColor.indexOf("rgba") > -1, each(spaces, function(spaceName, space) {
			space.cache = "_" + spaceName, space.props.alpha = {
				idx: 3,
				type: "percent",
				def: 1
			}
		}), color.fn = jQuery.extend(color.prototype, {
			parse: function(red, green, blue, alpha) {
				if (red === undefined) return this._rgba = [null, null, null, null], this;
				(red.jquery || red.nodeType) && (red = jQuery(red).css(green), green = undefined);
				var inst = this,
					type = jQuery.type(red),
					rgba = this._rgba = [];
				return green !== undefined && (red = [red, green, blue, alpha], type = "array"), "string" === type ? this.parse(stringParse(red) || colors._default) : "array" === type ? (each(spaces.rgba.props, function(key, prop) {
					rgba[prop.idx] = clamp(red[prop.idx], prop)
				}), this) : "object" === type ? (red instanceof color ? each(spaces, function(spaceName, space) {
					red[space.cache] && (inst[space.cache] = red[space.cache].slice())
				}) : each(spaces, function(spaceName, space) {
					var cache = space.cache;
					each(space.props, function(key, prop) {
						if (!inst[cache] && space.to) {
							if ("alpha" === key || null == red[key]) return;
							inst[cache] = space.to(inst._rgba)
						}
						inst[cache][prop.idx] = clamp(red[key], prop, !0)
					}), inst[cache] && jQuery.inArray(null, inst[cache].slice(0, 3)) < 0 && (inst[cache][3] = 1, space.from && (inst._rgba = space.from(inst[cache])))
				}), this) : void 0
			},
			is: function(compare) {
				var is = color(compare),
					same = !0,
					inst = this;
				return each(spaces, function(_, space) {
					var localCache, isCache = is[space.cache];
					return isCache && (localCache = inst[space.cache] || space.to && space.to(inst._rgba) || [], each(space.props, function(_, prop) {
						if (null != isCache[prop.idx]) return same = isCache[prop.idx] === localCache[prop.idx]
					})), same
				}), same
			},
			_space: function() {
				var used = [],
					inst = this;
				return each(spaces, function(spaceName, space) {
					inst[space.cache] && used.push(spaceName)
				}), used.pop()
			},
			transition: function(other, distance) {
				var end = color(other),
					spaceName = end._space(),
					space = spaces[spaceName],
					startColor = 0 === this.alpha() ? color("transparent") : this,
					start = startColor[space.cache] || space.to(startColor._rgba),
					result = start.slice();
				return end = end[space.cache], each(space.props, function(key, prop) {
					var index = prop.idx,
						startValue = start[index],
						endValue = end[index],
						type = propTypes[prop.type] || {};
					null !== endValue && (null === startValue ? result[index] = endValue : (type.mod && (endValue - startValue > type.mod / 2 ? startValue += type.mod : startValue - endValue > type.mod / 2 && (startValue -= type.mod)), result[index] = clamp((endValue - startValue) * distance + startValue, prop)))
				}), this[spaceName](result)
			},
			blend: function(opaque) {
				if (1 === this._rgba[3]) return this;
				var rgb = this._rgba.slice(),
					a = rgb.pop(),
					blend = color(opaque)._rgba;
				return color(jQuery.map(rgb, function(v, i) {
					return (1 - a) * blend[i] + a * v
				}))
			},
			toRgbaString: function() {
				var prefix = "rgba(",
					rgba = jQuery.map(this._rgba, function(v, i) {
						return null == v ? i > 2 ? 1 : 0 : v
					});
				return 1 === rgba[3] && (rgba.pop(), prefix = "rgb("), prefix + rgba.join() + ")"
			},
			toHslaString: function() {
				var prefix = "hsla(",
					hsla = jQuery.map(this.hsla(), function(v, i) {
						return null == v && (v = i > 2 ? 1 : 0), i && i < 3 && (v = Math.round(100 * v) + "%"), v
					});
				return 1 === hsla[3] && (hsla.pop(), prefix = "hsl("), prefix + hsla.join() + ")"
			},
			toHexString: function(includeAlpha) {
				var rgba = this._rgba.slice(),
					alpha = rgba.pop();
				return includeAlpha && rgba.push(~~ (255 * alpha)), "#" + jQuery.map(rgba, function(v) {
					return v = (v || 0).toString(16), 1 === v.length ? "0" + v : v
				}).join("")
			},
			toString: function() {
				return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
			}
		}), color.fn.parse.prototype = color.fn, spaces.hsla.to = function(rgba) {
			if (null == rgba[0] || null == rgba[1] || null == rgba[2]) return [null, null, null, rgba[3]];
			var h, s, r = rgba[0] / 255,
				g = rgba[1] / 255,
				b = rgba[2] / 255,
				a = rgba[3],
				max = Math.max(r, g, b),
				min = Math.min(r, g, b),
				diff = max - min,
				add = max + min,
				l = .5 * add;
			return h = min === max ? 0 : r === max ? 60 * (g - b) / diff + 360 : g === max ? 60 * (b - r) / diff + 120 : 60 * (r - g) / diff + 240, s = 0 === diff ? 0 : l <= .5 ? diff / add : diff / (2 - add), [Math.round(h) % 360, s, l, null == a ? 1 : a]
		}, spaces.hsla.from = function(hsla) {
			if (null == hsla[0] || null == hsla[1] || null == hsla[2]) return [null, null, null, hsla[3]];
			var h = hsla[0] / 360,
				s = hsla[1],
				l = hsla[2],
				a = hsla[3],
				q = l <= .5 ? l * (1 + s) : l + s - l * s,
				p = 2 * l - q;
			return [Math.round(255 * hue2rgb(p, q, h + 1 / 3)), Math.round(255 * hue2rgb(p, q, h)), Math.round(255 * hue2rgb(p, q, h - 1 / 3)), a]
		}, each(spaces, function(spaceName, space) {
			var props = space.props,
				cache = space.cache,
				to = space.to,
				from = space.from;
			color.fn[spaceName] = function(value) {
				if (to && !this[cache] && (this[cache] = to(this._rgba)), value === undefined) return this[cache].slice();
				var ret, type = jQuery.type(value),
					arr = "array" === type || "object" === type ? value : arguments,
					local = this[cache].slice();
				return each(props, function(key, prop) {
					var val = arr["object" === type ? key : prop.idx];
					null == val && (val = local[prop.idx]), local[prop.idx] = clamp(val, prop)
				}), from ? (ret = color(from(local)), ret[cache] = local, ret) : color(local)
			}, each(props, function(key, prop) {
				color.fn[key] || (color.fn[key] = function(value) {
					var match, vtype = jQuery.type(value),
						fn = "alpha" === key ? this._hsla ? "hsla" : "rgba" : spaceName,
						local = this[fn](),
						cur = local[prop.idx];
					return "undefined" === vtype ? cur : ("function" === vtype && (value = value.call(this, cur), vtype = jQuery.type(value)), null == value && prop.empty ? this : ("string" === vtype && (match = rplusequals.exec(value), match && (value = cur + parseFloat(match[2]) * ("+" === match[1] ? 1 : -1))), local[prop.idx] = value, this[fn](local)))
				})
			})
		}), color.hook = function(hook) {
			var hooks = hook.split(" ");
			each(hooks, function(i, hook) {
				jQuery.cssHooks[hook] = {
					set: function(elem, value) {
						var parsed, curElem, backgroundColor = "";
						if ("transparent" !== value && ("string" !== jQuery.type(value) || (parsed = stringParse(value)))) {
							if (value = color(parsed || value), !support.rgba && 1 !== value._rgba[3]) {
								for (curElem = "backgroundColor" === hook ? elem.parentNode : elem;
								("" === backgroundColor || "transparent" === backgroundColor) && curElem && curElem.style;) try {
									backgroundColor = jQuery.css(curElem, "backgroundColor"), curElem = curElem.parentNode
								} catch (e) {}
								value = value.blend(backgroundColor && "transparent" !== backgroundColor ? backgroundColor : "_default")
							}
							value = value.toRgbaString()
						}
						try {
							elem.style[hook] = value
						} catch (e) {}
					}
				}, jQuery.fx.step[hook] = function(fx) {
					fx.colorInit || (fx.start = color(fx.elem, hook), fx.end = color(fx.end), fx.colorInit = !0), jQuery.cssHooks[hook].set(fx.elem, fx.start.transition(fx.end, fx.pos))
				}
			})
		}, color.hook(stepHooks), jQuery.cssHooks.borderColor = {
			expand: function(value) {
				var expanded = {};
				return each(["Top", "Right", "Bottom", "Left"], function(i, part) {
					expanded["border" + part + "Color"] = value
				}), expanded
			}
		}, colors = jQuery.Color.names = {
			aqua: "#00ffff",
			black: "#000000",
			blue: "#0000ff",
			fuchsia: "#ff00ff",
			gray: "#808080",
			green: "#008000",
			lime: "#00ff00",
			maroon: "#800000",
			navy: "#000080",
			olive: "#808000",
			purple: "#800080",
			red: "#ff0000",
			silver: "#c0c0c0",
			teal: "#008080",
			white: "#ffffff",
			yellow: "#ffff00",
			transparent: [null, null, null, 0],
			_default: "#ffffff"
		}
	}(jQuery), function() {
		function getElementStyles(elem) {
			var key, len, style = elem.ownerDocument.defaultView ? elem.ownerDocument.defaultView.getComputedStyle(elem, null) : elem.currentStyle,
				styles = {};
			if (style && style.length && style[0] && style[style[0]]) for (len = style.length; len--;) key = style[len], "string" == typeof style[key] && (styles[$.camelCase(key)] = style[key]);
			else for (key in style)"string" == typeof style[key] && (styles[key] = style[key]);
			return styles
		}
		function styleDifference(oldStyle, newStyle) {
			var name, value, diff = {};
			for (name in newStyle) value = newStyle[name], oldStyle[name] !== value && (shorthandStyles[name] || !$.fx.step[name] && isNaN(parseFloat(value)) || (diff[name] = value));
			return diff
		}
		var classAnimationActions = ["add", "remove", "toggle"],
			shorthandStyles = {
				border: 1,
				borderBottom: 1,
				borderColor: 1,
				borderLeft: 1,
				borderRight: 1,
				borderTop: 1,
				borderWidth: 1,
				margin: 1,
				padding: 1
			};
		$.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(_, prop) {
			$.fx.step[prop] = function(fx) {
				("none" !== fx.end && !fx.setAttr || 1 === fx.pos && !fx.setAttr) && (jQuery.style(fx.elem, prop, fx.end), fx.setAttr = !0)
			}
		}), $.fn.addBack || ($.fn.addBack = function(selector) {
			return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector))
		}), $.effects.animateClass = function(value, duration, easing, callback) {
			var o = $.speed(duration, easing, callback);
			return this.queue(function() {
				var applyClassChange, animated = $(this),
					baseClass = animated.attr("class") || "",
					allAnimations = o.children ? animated.find("*").addBack() : animated;
				allAnimations = allAnimations.map(function() {
					var el = $(this);
					return {
						el: el,
						start: getElementStyles(this)
					}
				}), applyClassChange = function() {
					$.each(classAnimationActions, function(i, action) {
						value[action] && animated[action + "Class"](value[action])
					})
				}, applyClassChange(), allAnimations = allAnimations.map(function() {
					return this.end = getElementStyles(this.el[0]), this.diff = styleDifference(this.start, this.end), this
				}), animated.attr("class", baseClass), allAnimations = allAnimations.map(function() {
					var styleInfo = this,
						dfd = $.Deferred(),
						opts = $.extend({}, o, {
							queue: !1,
							complete: function() {
								dfd.resolve(styleInfo)
							}
						});
					return this.el.animate(this.diff, opts), dfd.promise()
				}), $.when.apply($, allAnimations.get()).done(function() {
					applyClassChange(), $.each(arguments, function() {
						var el = this.el;
						$.each(this.diff, function(key) {
							el.css(key, "")
						})
					}), o.complete.call(animated[0])
				})
			})
		}, $.fn.extend({
			addClass: function(orig) {
				return function(classNames, speed, easing, callback) {
					return speed ? $.effects.animateClass.call(this, {
						add: classNames
					}, speed, easing, callback) : orig.apply(this, arguments)
				}
			}($.fn.addClass),
			removeClass: function(orig) {
				return function(classNames, speed, easing, callback) {
					return arguments.length > 1 ? $.effects.animateClass.call(this, {
						remove: classNames
					}, speed, easing, callback) : orig.apply(this, arguments)
				}
			}($.fn.removeClass),
			toggleClass: function(orig) {
				return function(classNames, force, speed, easing, callback) {
					return "boolean" == typeof force || void 0 === force ? speed ? $.effects.animateClass.call(this, force ? {
						add: classNames
					} : {
						remove: classNames
					}, speed, easing, callback) : orig.apply(this, arguments) : $.effects.animateClass.call(this, {
						toggle: classNames
					}, force, speed, easing)
				}
			}($.fn.toggleClass),
			switchClass: function(remove, add, speed, easing, callback) {
				return $.effects.animateClass.call(this, {
					add: add,
					remove: remove
				}, speed, easing, callback)
			}
		})
	}(), function() {
		function _normalizeArguments(effect, options, speed, callback) {
			return $.isPlainObject(effect) && (options = effect, effect = effect.effect), effect = {
				effect: effect
			}, null == options && (options = {}), $.isFunction(options) && (callback = options, speed = null, options = {}), ("number" == typeof options || $.fx.speeds[options]) && (callback = speed, speed = options, options = {}), $.isFunction(speed) && (callback = speed, speed = null), options && $.extend(effect, options), speed = speed || options.duration, effect.duration = $.fx.off ? 0 : "number" == typeof speed ? speed : speed in $.fx.speeds ? $.fx.speeds[speed] : $.fx.speeds._default, effect.complete = callback || options.complete, effect
		}
		function standardAnimationOption(option) {
			return !(option && "number" != typeof option && !$.fx.speeds[option]) || ("string" == typeof option && !$.effects.effect[option] || ( !! $.isFunction(option) || "object" == typeof option && !option.effect))
		}
		$.extend($.effects, {
			version: "1.11.1",
			save: function(element, set) {
				for (var i = 0; i < set.length; i++) null !== set[i] && element.data(dataSpace + set[i], element[0].style[set[i]])
			},
			restore: function(element, set) {
				var val, i;
				for (i = 0; i < set.length; i++) null !== set[i] && (val = element.data(dataSpace + set[i]), void 0 === val && (val = ""), element.css(set[i], val))
			},
			setMode: function(el, mode) {
				return "toggle" === mode && (mode = el.is(":hidden") ? "show" : "hide"), mode
			},
			getBaseline: function(origin, original) {
				var y, x;
				switch (origin[0]) {
				case "top":
					y = 0;
					break;
				case "middle":
					y = .5;
					break;
				case "bottom":
					y = 1;
					break;
				default:
					y = origin[0] / original.height
				}
				switch (origin[1]) {
				case "left":
					x = 0;
					break;
				case "center":
					x = .5;
					break;
				case "right":
					x = 1;
					break;
				default:
					x = origin[1] / original.width
				}
				return {
					x: x,
					y: y
				}
			},
			createWrapper: function(element) {
				if (element.parent().is(".ui-effects-wrapper")) return element.parent();
				var props = {
					width: element.outerWidth(!0),
					height: element.outerHeight(!0),
					float: element.css("float")
				},
					wrapper = $("<div></div>").addClass("ui-effects-wrapper").css({
						fontSize: "100%",
						background: "transparent",
						border: "none",
						margin: 0,
						padding: 0
					}),
					size = {
						width: element.width(),
						height: element.height()
					},
					active = document.activeElement;
				try {
					active.id
				} catch (e) {
					active = document.body
				}
				return element.wrap(wrapper), (element[0] === active || $.contains(element[0], active)) && $(active).focus(), wrapper = element.parent(), "static" === element.css("position") ? (wrapper.css({
					position: "relative"
				}), element.css({
					position: "relative"
				})) : ($.extend(props, {
					position: element.css("position"),
					zIndex: element.css("z-index")
				}), $.each(["top", "left", "bottom", "right"], function(i, pos) {
					props[pos] = element.css(pos), isNaN(parseInt(props[pos], 10)) && (props[pos] = "auto")
				}), element.css({
					position: "relative",
					top: 0,
					left: 0,
					right: "auto",
					bottom: "auto"
				})), element.css(size), wrapper.css(props).show()
			},
			removeWrapper: function(element) {
				var active = document.activeElement;
				return element.parent().is(".ui-effects-wrapper") && (element.parent().replaceWith(element), (element[0] === active || $.contains(element[0], active)) && $(active).focus()), element
			},
			setTransition: function(element, list, factor, value) {
				return value = value || {}, $.each(list, function(i, x) {
					var unit = element.cssUnit(x);
					unit[0] > 0 && (value[x] = unit[0] * factor + unit[1])
				}), value
			}
		}), $.fn.extend({
			effect: function() {
				function run(next) {
					function done() {
						$.isFunction(complete) && complete.call(elem[0]), $.isFunction(next) && next()
					}
					var elem = $(this),
						complete = args.complete,
						mode = args.mode;
					(elem.is(":hidden") ? "hide" === mode : "show" === mode) ? (elem[mode](), done()) : effectMethod.call(elem[0], args, done)
				}
				var args = _normalizeArguments.apply(this, arguments),
					mode = args.mode,
					queue = args.queue,
					effectMethod = $.effects.effect[args.effect];
				return $.fx.off || !effectMethod ? mode ? this[mode](args.duration, args.complete) : this.each(function() {
					args.complete && args.complete.call(this)
				}) : queue === !1 ? this.each(run) : this.queue(queue || "fx", run)
			},
			show: function(orig) {
				return function(option) {
					if (standardAnimationOption(option)) return orig.apply(this, arguments);
					var args = _normalizeArguments.apply(this, arguments);
					return args.mode = "show", this.effect.call(this, args)
				}
			}($.fn.show),
			hide: function(orig) {
				return function(option) {
					if (standardAnimationOption(option)) return orig.apply(this, arguments);
					var args = _normalizeArguments.apply(this, arguments);
					return args.mode = "hide", this.effect.call(this, args)
				}
			}($.fn.hide),
			toggle: function(orig) {
				return function(option) {
					if (standardAnimationOption(option) || "boolean" == typeof option) return orig.apply(this, arguments);
					var args = _normalizeArguments.apply(this, arguments);
					return args.mode = "toggle", this.effect.call(this, args)
				}
			}($.fn.toggle),
			cssUnit: function(key) {
				var style = this.css(key),
					val = [];
				return $.each(["em", "px", "%", "pt"], function(i, unit) {
					style.indexOf(unit) > 0 && (val = [parseFloat(style), unit])
				}), val
			}
		})
	}(), function() {
		var baseEasings = {};
		$.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(i, name) {
			baseEasings[name] = function(p) {
				return Math.pow(p, i + 2)
			}
		}), $.extend(baseEasings, {
			Sine: function(p) {
				return 1 - Math.cos(p * Math.PI / 2)
			},
			Circ: function(p) {
				return 1 - Math.sqrt(1 - p * p)
			},
			Elastic: function(p) {
				return 0 === p || 1 === p ? p : -Math.pow(2, 8 * (p - 1)) * Math.sin((80 * (p - 1) - 7.5) * Math.PI / 15)
			},
			Back: function(p) {
				return p * p * (3 * p - 2)
			},
			Bounce: function(p) {
				for (var pow2, bounce = 4; p < ((pow2 = Math.pow(2, --bounce)) - 1) / 11;);
				return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow((3 * pow2 - 2) / 22 - p, 2)
			}
		}), $.each(baseEasings, function(name, easeIn) {
			$.easing["easeIn" + name] = easeIn, $.easing["easeOut" + name] = function(p) {
				return 1 - easeIn(1 - p)
			}, $.easing["easeInOut" + name] = function(p) {
				return p < .5 ? easeIn(2 * p) / 2 : 1 - easeIn(p * -2 + 2) / 2
			}
		})
	}();
	$.effects, $.effects.effect.blind = function(o, done) {
		var wrapper, distance, margin, el = $(this),
			rvertical = /up|down|vertical/,
			rpositivemotion = /up|left|vertical|horizontal/,
			props = ["position", "top", "bottom", "left", "right", "height", "width"],
			mode = $.effects.setMode(el, o.mode || "hide"),
			direction = o.direction || "up",
			vertical = rvertical.test(direction),
			ref = vertical ? "height" : "width",
			ref2 = vertical ? "top" : "left",
			motion = rpositivemotion.test(direction),
			animation = {},
			show = "show" === mode;
		el.parent().is(".ui-effects-wrapper") ? $.effects.save(el.parent(), props) : $.effects.save(el, props), el.show(), wrapper = $.effects.createWrapper(el).css({
			overflow: "hidden"
		}), distance = wrapper[ref](), margin = parseFloat(wrapper.css(ref2)) || 0, animation[ref] = show ? distance : 0, motion || (el.css(vertical ? "bottom" : "right", 0).css(vertical ? "top" : "left", "auto").css({
			position: "absolute"
		}), animation[ref2] = show ? margin : distance + margin), show && (wrapper.css(ref, 0), motion || wrapper.css(ref2, margin + distance)), wrapper.animate(animation, {
			duration: o.duration,
			easing: o.easing,
			queue: !1,
			complete: function() {
				"hide" === mode && el.hide(), $.effects.restore(el, props), $.effects.removeWrapper(el), done()
			}
		})
	}, $.effects.effect.bounce = function(o, done) {
		var i, upAnim, downAnim, el = $(this),
			props = ["position", "top", "bottom", "left", "right", "height", "width"],
			mode = $.effects.setMode(el, o.mode || "effect"),
			hide = "hide" === mode,
			show = "show" === mode,
			direction = o.direction || "up",
			distance = o.distance,
			times = o.times || 5,
			anims = 2 * times + (show || hide ? 1 : 0),
			speed = o.duration / anims,
			easing = o.easing,
			ref = "up" === direction || "down" === direction ? "top" : "left",
			motion = "up" === direction || "left" === direction,
			queue = el.queue(),
			queuelen = queue.length;
		for ((show || hide) && props.push("opacity"), $.effects.save(el, props), el.show(), $.effects.createWrapper(el), distance || (distance = el["top" === ref ? "outerHeight" : "outerWidth"]() / 3), show && (downAnim = {
			opacity: 1
		}, downAnim[ref] = 0, el.css("opacity", 0).css(ref, motion ? 2 * -distance : 2 * distance).animate(downAnim, speed, easing)), hide && (distance /= Math.pow(2, times - 1)), downAnim = {}, downAnim[ref] = 0, i = 0; i < times; i++) upAnim = {}, upAnim[ref] = (motion ? "-=" : "+=") + distance, el.animate(upAnim, speed, easing).animate(downAnim, speed, easing), distance = hide ? 2 * distance : distance / 2;
		hide && (upAnim = {
			opacity: 0
		}, upAnim[ref] = (motion ? "-=" : "+=") + distance, el.animate(upAnim, speed, easing)), el.queue(function() {
			hide && el.hide(), $.effects.restore(el, props), $.effects.removeWrapper(el), done()
		}), queuelen > 1 && queue.splice.apply(queue, [1, 0].concat(queue.splice(queuelen, anims + 1))), el.dequeue()
	}, $.effects.effect.clip = function(o, done) {
		var wrapper, animate, distance, el = $(this),
			props = ["position", "top", "bottom", "left", "right", "height", "width"],
			mode = $.effects.setMode(el, o.mode || "hide"),
			show = "show" === mode,
			direction = o.direction || "vertical",
			vert = "vertical" === direction,
			size = vert ? "height" : "width",
			position = vert ? "top" : "left",
			animation = {};
		$.effects.save(el, props), el.show(), wrapper = $.effects.createWrapper(el).css({
			overflow: "hidden"
		}), animate = "IMG" === el[0].tagName ? wrapper : el, distance = animate[size](), show && (animate.css(size, 0), animate.css(position, distance / 2)), animation[size] = show ? distance : 0, animation[position] = show ? 0 : distance / 2, animate.animate(animation, {
			queue: !1,
			duration: o.duration,
			easing: o.easing,
			complete: function() {
				show || el.hide(), $.effects.restore(el, props), $.effects.removeWrapper(el), done()
			}
		})
	}, $.effects.effect.drop = function(o, done) {
		var distance, el = $(this),
			props = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
			mode = $.effects.setMode(el, o.mode || "hide"),
			show = "show" === mode,
			direction = o.direction || "left",
			ref = "up" === direction || "down" === direction ? "top" : "left",
			motion = "up" === direction || "left" === direction ? "pos" : "neg",
			animation = {
				opacity: show ? 1 : 0
			};
		$.effects.save(el, props), el.show(), $.effects.createWrapper(el), distance = o.distance || el["top" === ref ? "outerHeight" : "outerWidth"](!0) / 2, show && el.css("opacity", 0).css(ref, "pos" === motion ? -distance : distance), animation[ref] = (show ? "pos" === motion ? "+=" : "-=" : "pos" === motion ? "-=" : "+=") + distance, el.animate(animation, {
			queue: !1,
			duration: o.duration,
			easing: o.easing,
			complete: function() {
				"hide" === mode && el.hide(), $.effects.restore(el, props), $.effects.removeWrapper(el), done()
			}
		})
	}, $.effects.effect.explode = function(o, done) {
		function childComplete() {
			pieces.push(this), pieces.length === rows * cells && animComplete()
		}
		function animComplete() {
			el.css({
				visibility: "visible"
			}), $(pieces).remove(), show || el.hide(), done()
		}
		var i, j, left, top, mx, my, rows = o.pieces ? Math.round(Math.sqrt(o.pieces)) : 3,
			cells = rows,
			el = $(this),
			mode = $.effects.setMode(el, o.mode || "hide"),
			show = "show" === mode,
			offset = el.show().css("visibility", "hidden").offset(),
			width = Math.ceil(el.outerWidth() / cells),
			height = Math.ceil(el.outerHeight() / rows),
			pieces = [];
		for (i = 0; i < rows; i++) for (top = offset.top + i * height, my = i - (rows - 1) / 2, j = 0; j < cells; j++) left = offset.left + j * width, mx = j - (cells - 1) / 2, el.clone().appendTo("body").wrap("<div></div>").css({
			position: "absolute",
			visibility: "visible",
			left: -j * width,
			top: -i * height
		}).parent().addClass("ui-effects-explode").css({
			position: "absolute",
			overflow: "hidden",
			width: width,
			height: height,
			left: left + (show ? mx * width : 0),
			top: top + (show ? my * height : 0),
			opacity: show ? 0 : 1
		}).animate({
			left: left + (show ? 0 : mx * width),
			top: top + (show ? 0 : my * height),
			opacity: show ? 1 : 0
		}, o.duration || 500, o.easing, childComplete)
	}, $.effects.effect.fade = function(o, done) {
		var el = $(this),
			mode = $.effects.setMode(el, o.mode || "toggle");
		el.animate({
			opacity: mode
		}, {
			queue: !1,
			duration: o.duration,
			easing: o.easing,
			complete: done
		})
	}, $.effects.effect.fold = function(o, done) {
		var wrapper, distance, el = $(this),
			props = ["position", "top", "bottom", "left", "right", "height", "width"],
			mode = $.effects.setMode(el, o.mode || "hide"),
			show = "show" === mode,
			hide = "hide" === mode,
			size = o.size || 15,
			percent = /([0-9]+)%/.exec(size),
			horizFirst = !! o.horizFirst,
			widthFirst = show !== horizFirst,
			ref = widthFirst ? ["width", "height"] : ["height", "width"],
			duration = o.duration / 2,
			animation1 = {},
			animation2 = {};
		$.effects.save(el, props), el.show(), wrapper = $.effects.createWrapper(el).css({
			overflow: "hidden"
		}), distance = widthFirst ? [wrapper.width(), wrapper.height()] : [wrapper.height(), wrapper.width()], percent && (size = parseInt(percent[1], 10) / 100 * distance[hide ? 0 : 1]), show && wrapper.css(horizFirst ? {
			height: 0,
			width: size
		} : {
			height: size,
			width: 0
		}), animation1[ref[0]] = show ? distance[0] : size, animation2[ref[1]] = show ? distance[1] : 0, wrapper.animate(animation1, duration, o.easing).animate(animation2, duration, o.easing, function() {
			hide && el.hide(), $.effects.restore(el, props), $.effects.removeWrapper(el), done()
		})
	}, $.effects.effect.highlight = function(o, done) {
		var elem = $(this),
			props = ["backgroundImage", "backgroundColor", "opacity"],
			mode = $.effects.setMode(elem, o.mode || "show"),
			animation = {
				backgroundColor: elem.css("backgroundColor")
			};
		"hide" === mode && (animation.opacity = 0), $.effects.save(elem, props), elem.show().css({
			backgroundImage: "none",
			backgroundColor: o.color || "#ffff99"
		}).animate(animation, {
			queue: !1,
			duration: o.duration,
			easing: o.easing,
			complete: function() {
				"hide" === mode && elem.hide(), $.effects.restore(elem, props), done()
			}
		})
	}, $.effects.effect.size = function(o, done) {
		var original, baseline, factor, el = $(this),
			props0 = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
			props1 = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
			props2 = ["width", "height", "overflow"],
			cProps = ["fontSize"],
			vProps = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
			hProps = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
			mode = $.effects.setMode(el, o.mode || "effect"),
			restore = o.restore || "effect" !== mode,
			scale = o.scale || "both",
			origin = o.origin || ["middle", "center"],
			position = el.css("position"),
			props = restore ? props0 : props1,
			zero = {
				height: 0,
				width: 0,
				outerHeight: 0,
				outerWidth: 0
			};
		"show" === mode && el.show(), original = {
			height: el.height(),
			width: el.width(),
			outerHeight: el.outerHeight(),
			outerWidth: el.outerWidth()
		}, "toggle" === o.mode && "show" === mode ? (el.from = o.to || zero, el.to = o.from || original) : (el.from = o.from || ("show" === mode ? zero : original), el.to = o.to || ("hide" === mode ? zero : original)), factor = {
			from: {
				y: el.from.height / original.height,
				x: el.from.width / original.width
			},
			to: {
				y: el.to.height / original.height,
				x: el.to.width / original.width
			}
		}, "box" !== scale && "both" !== scale || (factor.from.y !== factor.to.y && (props = props.concat(vProps), el.from = $.effects.setTransition(el, vProps, factor.from.y, el.from), el.to = $.effects.setTransition(el, vProps, factor.to.y, el.to)), factor.from.x !== factor.to.x && (props = props.concat(hProps), el.from = $.effects.setTransition(el, hProps, factor.from.x, el.from), el.to = $.effects.setTransition(el, hProps, factor.to.x, el.to))), "content" !== scale && "both" !== scale || factor.from.y !== factor.to.y && (props = props.concat(cProps).concat(props2), el.from = $.effects.setTransition(el, cProps, factor.from.y, el.from), el.to = $.effects.setTransition(el, cProps, factor.to.y, el.to)), $.effects.save(el, props), el.show(), $.effects.createWrapper(el), el.css("overflow", "hidden").css(el.from), origin && (baseline = $.effects.getBaseline(origin, original), el.from.top = (original.outerHeight - el.outerHeight()) * baseline.y, el.from.left = (original.outerWidth - el.outerWidth()) * baseline.x, el.to.top = (original.outerHeight - el.to.outerHeight) * baseline.y, el.to.left = (original.outerWidth - el.to.outerWidth) * baseline.x), el.css(el.from), "content" !== scale && "both" !== scale || (vProps = vProps.concat(["marginTop", "marginBottom"]).concat(cProps), hProps = hProps.concat(["marginLeft", "marginRight"]), props2 = props0.concat(vProps).concat(hProps), el.find("*[width]").each(function() {
			var child = $(this),
				c_original = {
					height: child.height(),
					width: child.width(),
					outerHeight: child.outerHeight(),
					outerWidth: child.outerWidth()
				};
			restore && $.effects.save(child, props2), child.from = {
				height: c_original.height * factor.from.y,
				width: c_original.width * factor.from.x,
				outerHeight: c_original.outerHeight * factor.from.y,
				outerWidth: c_original.outerWidth * factor.from.x
			}, child.to = {
				height: c_original.height * factor.to.y,
				width: c_original.width * factor.to.x,
				outerHeight: c_original.height * factor.to.y,
				outerWidth: c_original.width * factor.to.x
			}, factor.from.y !== factor.to.y && (child.from = $.effects.setTransition(child, vProps, factor.from.y, child.from), child.to = $.effects.setTransition(child, vProps, factor.to.y, child.to)), factor.from.x !== factor.to.x && (child.from = $.effects.setTransition(child, hProps, factor.from.x, child.from), child.to = $.effects.setTransition(child, hProps, factor.to.x, child.to)), child.css(child.from), child.animate(child.to, o.duration, o.easing, function() {
				restore && $.effects.restore(child, props2)
			})
		})), el.animate(el.to, {
			queue: !1,
			duration: o.duration,
			easing: o.easing,
			complete: function() {
				0 === el.to.opacity && el.css("opacity", el.from.opacity), "hide" === mode && el.hide(), $.effects.restore(el, props), restore || ("static" === position ? el.css({
					position: "relative",
					top: el.to.top,
					left: el.to.left
				}) : $.each(["top", "left"], function(idx, pos) {
					el.css(pos, function(_, str) {
						var val = parseInt(str, 10),
							toRef = idx ? el.to.left : el.to.top;
						return "auto" === str ? toRef + "px" : val + toRef + "px"
					})
				})), $.effects.removeWrapper(el), done()
			}
		})
	}, $.effects.effect.scale = function(o, done) {
		var el = $(this),
			options = $.extend(!0, {}, o),
			mode = $.effects.setMode(el, o.mode || "effect"),
			percent = parseInt(o.percent, 10) || (0 === parseInt(o.percent, 10) ? 0 : "hide" === mode ? 0 : 100),
			direction = o.direction || "both",
			origin = o.origin,
			original = {
				height: el.height(),
				width: el.width(),
				outerHeight: el.outerHeight(),
				outerWidth: el.outerWidth()
			},
			factor = {
				y: "horizontal" !== direction ? percent / 100 : 1,
				x: "vertical" !== direction ? percent / 100 : 1
			};
		options.effect = "size", options.queue = !1, options.complete = done, "effect" !== mode && (options.origin = origin || ["middle", "center"], options.restore = !0), options.from = o.from || ("show" === mode ? {
			height: 0,
			width: 0,
			outerHeight: 0,
			outerWidth: 0
		} : original), options.to = {
			height: original.height * factor.y,
			width: original.width * factor.x,
			outerHeight: original.outerHeight * factor.y,
			outerWidth: original.outerWidth * factor.x
		}, options.fade && ("show" === mode && (options.from.opacity = 0, options.to.opacity = 1), "hide" === mode && (options.from.opacity = 1, options.to.opacity = 0)), el.effect(options)
	}, $.effects.effect.puff = function(o, done) {
		var elem = $(this),
			mode = $.effects.setMode(elem, o.mode || "hide"),
			hide = "hide" === mode,
			percent = parseInt(o.percent, 10) || 150,
			factor = percent / 100,
			original = {
				height: elem.height(),
				width: elem.width(),
				outerHeight: elem.outerHeight(),
				outerWidth: elem.outerWidth()
			};
		$.extend(o, {
			effect: "scale",
			queue: !1,
			fade: !0,
			mode: mode,
			complete: done,
			percent: hide ? percent : 100,
			from: hide ? original : {
				height: original.height * factor,
				width: original.width * factor,
				outerHeight: original.outerHeight * factor,
				outerWidth: original.outerWidth * factor
			}
		}), elem.effect(o)
	}, $.effects.effect.pulsate = function(o, done) {
		var i, elem = $(this),
			mode = $.effects.setMode(elem, o.mode || "show"),
			show = "show" === mode,
			hide = "hide" === mode,
			showhide = show || "hide" === mode,
			anims = 2 * (o.times || 5) + (showhide ? 1 : 0),
			duration = o.duration / anims,
			animateTo = 0,
			queue = elem.queue(),
			queuelen = queue.length;
		for (!show && elem.is(":visible") || (elem.css("opacity", 0).show(), animateTo = 1), i = 1; i < anims; i++) elem.animate({
			opacity: animateTo
		}, duration, o.easing), animateTo = 1 - animateTo;
		elem.animate({
			opacity: animateTo
		}, duration, o.easing), elem.queue(function() {
			hide && elem.hide(), done()
		}), queuelen > 1 && queue.splice.apply(queue, [1, 0].concat(queue.splice(queuelen, anims + 1))), elem.dequeue()
	}, $.effects.effect.shake = function(o, done) {
		var i, el = $(this),
			props = ["position", "top", "bottom", "left", "right", "height", "width"],
			mode = $.effects.setMode(el, o.mode || "effect"),
			direction = o.direction || "left",
			distance = o.distance || 20,
			times = o.times || 3,
			anims = 2 * times + 1,
			speed = Math.round(o.duration / anims),
			ref = "up" === direction || "down" === direction ? "top" : "left",
			positiveMotion = "up" === direction || "left" === direction,
			animation = {},
			animation1 = {},
			animation2 = {},
			queue = el.queue(),
			queuelen = queue.length;
		for ($.effects.save(el, props), el.show(), $.effects.createWrapper(el), animation[ref] = (positiveMotion ? "-=" : "+=") + distance, animation1[ref] = (positiveMotion ? "+=" : "-=") + 2 * distance, animation2[ref] = (positiveMotion ? "-=" : "+=") + 2 * distance, el.animate(animation, speed, o.easing), i = 1; i < times; i++) el.animate(animation1, speed, o.easing).animate(animation2, speed, o.easing);
		el.animate(animation1, speed, o.easing).animate(animation, speed / 2, o.easing).queue(function() {
			"hide" === mode && el.hide(), $.effects.restore(el, props), $.effects.removeWrapper(el), done()
		}), queuelen > 1 && queue.splice.apply(queue, [1, 0].concat(queue.splice(queuelen, anims + 1))), el.dequeue()
	}, $.effects.effect.slide = function(o, done) {
		var distance, el = $(this),
			props = ["position", "top", "bottom", "left", "right", "width", "height"],
			mode = $.effects.setMode(el, o.mode || "show"),
			show = "show" === mode,
			direction = o.direction || "left",
			ref = "up" === direction || "down" === direction ? "top" : "left",
			positiveMotion = "up" === direction || "left" === direction,
			animation = {};
		$.effects.save(el, props), el.show(), distance = o.distance || el["top" === ref ? "outerHeight" : "outerWidth"](!0), $.effects.createWrapper(el).css({
			overflow: "hidden"
		}), show && el.css(ref, positiveMotion ? isNaN(distance) ? "-" + distance : -distance : distance), animation[ref] = (show ? positiveMotion ? "+=" : "-=" : positiveMotion ? "-=" : "+=") + distance, el.animate(animation, {
			queue: !1,
			duration: o.duration,
			easing: o.easing,
			complete: function() {
				"hide" === mode && el.hide(), $.effects.restore(el, props), $.effects.removeWrapper(el), done()
			}
		})
	}, $.effects.effect.transfer = function(o, done) {
		var elem = $(this),
			target = $(o.to),
			targetFixed = "fixed" === target.css("position"),
			body = $("body"),
			fixTop = targetFixed ? body.scrollTop() : 0,
			fixLeft = targetFixed ? body.scrollLeft() : 0,
			endPosition = target.offset(),
			animation = {
				top: endPosition.top - fixTop,
				left: endPosition.left - fixLeft,
				height: target.innerHeight(),
				width: target.innerWidth()
			},
			startPosition = elem.offset(),
			transfer = $("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(o.className).css({
				top: startPosition.top - fixTop,
				left: startPosition.left - fixLeft,
				height: elem.innerHeight(),
				width: elem.innerWidth(),
				position: targetFixed ? "fixed" : "absolute"
			}).animate(animation, o.duration, o.easing, function() {
				transfer.remove(), done()
			})
	}, $.widget("ui.progressbar", {
		version: "1.11.1",
		options: {
			max: 100,
			value: 0,
			change: null,
			complete: null
		},
		min: 0,
		_create: function() {
			this.oldValue = this.options.value = this._constrainedValue(), this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
				role: "progressbar",
				"aria-valuemin": this.min
			}), this.valueDiv = $("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this._refreshValue()
		},
		_destroy: function() {
			this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove()
		},
		value: function(newValue) {
			return void 0 === newValue ? this.options.value : (this.options.value = this._constrainedValue(newValue), void this._refreshValue())
		},
		_constrainedValue: function(newValue) {
			return void 0 === newValue && (newValue = this.options.value), this.indeterminate = newValue === !1, "number" != typeof newValue && (newValue = 0), !this.indeterminate && Math.min(this.options.max, Math.max(this.min, newValue))
		},
		_setOptions: function(options) {
			var value = options.value;
			delete options.value, this._super(options), this.options.value = this._constrainedValue(value), this._refreshValue()
		},
		_setOption: function(key, value) {
			"max" === key && (value = Math.max(this.min, value)), "disabled" === key && this.element.toggleClass("ui-state-disabled", !! value).attr("aria-disabled", value), this._super(key, value)
		},
		_percentage: function() {
			return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
		},
		_refreshValue: function() {
			var value = this.options.value,
				percentage = this._percentage();
			this.valueDiv.toggle(this.indeterminate || value > this.min).toggleClass("ui-corner-right", value === this.options.max).width(percentage.toFixed(0) + "%"), this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate), this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = $("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))) : (this.element.attr({
				"aria-valuemax": this.options.max,
				"aria-valuenow": value
			}), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== value && (this.oldValue = value, this._trigger("change")), value === this.options.max && this._trigger("complete")
		}
	}), $.widget("ui.selectable", $.ui.mouse, {
		version: "1.11.1",
		options: {
			appendTo: "body",
			autoRefresh: !0,
			distance: 0,
			filter: "*",
			tolerance: "touch",
			selected: null,
			selecting: null,
			start: null,
			stop: null,
			unselected: null,
			unselecting: null
		},
		_create: function() {
			var selectees, that = this;
			this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function() {
				selectees = $(that.options.filter, that.element[0]), selectees.addClass("ui-selectee"), selectees.each(function() {
					var $this = $(this),
						pos = $this.offset();
					$.data(this, "selectable-item", {
						element: this,
						$element: $this,
						left: pos.left,
						top: pos.top,
						right: pos.left + $this.outerWidth(),
						bottom: pos.top + $this.outerHeight(),
						startselected: !1,
						selected: $this.hasClass("ui-selected"),
						selecting: $this.hasClass("ui-selecting"),
						unselecting: $this.hasClass("ui-unselecting")
					})
				})
			}, this.refresh(), this.selectees = selectees.addClass("ui-selectee"), this._mouseInit(), this.helper = $("<div class='ui-selectable-helper'></div>")
		},
		_destroy: function() {
			this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy()
		},
		_mouseStart: function(event) {
			var that = this,
				options = this.options;
			this.opos = [event.pageX, event.pageY], this.options.disabled || (this.selectees = $(options.filter, this.element[0]), this._trigger("start", event), $(options.appendTo).append(this.helper), this.helper.css({
				left: event.pageX,
				top: event.pageY,
				width: 0,
				height: 0
			}), options.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
				var selectee = $.data(this, "selectable-item");
				selectee.startselected = !0, event.metaKey || event.ctrlKey || (selectee.$element.removeClass("ui-selected"), selectee.selected = !1, selectee.$element.addClass("ui-unselecting"), selectee.unselecting = !0, that._trigger("unselecting", event, {
					unselecting: selectee.element
				}))
			}), $(event.target).parents().addBack().each(function() {
				var doSelect, selectee = $.data(this, "selectable-item");
				if (selectee) return doSelect = !event.metaKey && !event.ctrlKey || !selectee.$element.hasClass("ui-selected"), selectee.$element.removeClass(doSelect ? "ui-unselecting" : "ui-selected").addClass(doSelect ? "ui-selecting" : "ui-unselecting"), selectee.unselecting = !doSelect, selectee.selecting = doSelect, selectee.selected = doSelect, doSelect ? that._trigger("selecting", event, {
					selecting: selectee.element
				}) : that._trigger("unselecting", event, {
					unselecting: selectee.element
				}), !1
			}))
		},
		_mouseDrag: function(event) {
			if (this.dragged = !0, !this.options.disabled) {
				var tmp, that = this,
					options = this.options,
					x1 = this.opos[0],
					y1 = this.opos[1],
					x2 = event.pageX,
					y2 = event.pageY;
				return x1 > x2 && (tmp = x2, x2 = x1, x1 = tmp), y1 > y2 && (tmp = y2, y2 = y1, y1 = tmp), this.helper.css({
					left: x1,
					top: y1,
					width: x2 - x1,
					height: y2 - y1
				}), this.selectees.each(function() {
					var selectee = $.data(this, "selectable-item"),
						hit = !1;
					selectee && selectee.element !== that.element[0] && ("touch" === options.tolerance ? hit = !(selectee.left > x2 || selectee.right < x1 || selectee.top > y2 || selectee.bottom < y1) : "fit" === options.tolerance && (hit = selectee.left > x1 && selectee.right < x2 && selectee.top > y1 && selectee.bottom < y2), hit ? (selectee.selected && (selectee.$element.removeClass("ui-selected"), selectee.selected = !1), selectee.unselecting && (selectee.$element.removeClass("ui-unselecting"), selectee.unselecting = !1), selectee.selecting || (selectee.$element.addClass("ui-selecting"), selectee.selecting = !0, that._trigger("selecting", event, {
						selecting: selectee.element
					}))) : (selectee.selecting && ((event.metaKey || event.ctrlKey) && selectee.startselected ? (selectee.$element.removeClass("ui-selecting"), selectee.selecting = !1, selectee.$element.addClass("ui-selected"), selectee.selected = !0) : (selectee.$element.removeClass("ui-selecting"), selectee.selecting = !1, selectee.startselected && (selectee.$element.addClass("ui-unselecting"), selectee.unselecting = !0), that._trigger("unselecting", event, {
						unselecting: selectee.element
					}))), selectee.selected && (event.metaKey || event.ctrlKey || selectee.startselected || (selectee.$element.removeClass("ui-selected"), selectee.selected = !1, selectee.$element.addClass("ui-unselecting"), selectee.unselecting = !0, that._trigger("unselecting", event, {
						unselecting: selectee.element
					})))))
				}), !1
			}
		},
		_mouseStop: function(event) {
			var that = this;
			return this.dragged = !1, $(".ui-unselecting", this.element[0]).each(function() {
				var selectee = $.data(this, "selectable-item");
				selectee.$element.removeClass("ui-unselecting"), selectee.unselecting = !1, selectee.startselected = !1, that._trigger("unselected", event, {
					unselected: selectee.element
				})
			}), $(".ui-selecting", this.element[0]).each(function() {
				var selectee = $.data(this, "selectable-item");
				selectee.$element.removeClass("ui-selecting").addClass("ui-selected"), selectee.selecting = !1, selectee.selected = !0, selectee.startselected = !0, that._trigger("selected", event, {
					selected: selectee.element
				})
			}), this._trigger("stop", event), this.helper.remove(), !1
		}
	}), $.widget("ui.selectmenu", {
		version: "1.11.1",
		defaultElement: "<select>",
		options: {
			appendTo: null,
			disabled: null,
			icons: {
				button: "ui-icon-triangle-1-s"
			},
			position: {
				my: "left top",
				at: "left bottom",
				collision: "none"
			},
			width: null,
			change: null,
			close: null,
			focus: null,
			open: null,
			select: null
		},
		_create: function() {
			var selectmenuId = this.element.uniqueId().attr("id");
			this.ids = {
				element: selectmenuId,
				button: selectmenuId + "-button",
				menu: selectmenuId + "-menu"
			}, this._drawButton(), this._drawMenu(), this.options.disabled && this.disable()
		},
		_drawButton: function() {
			var that = this,
				tabindex = this.element.attr("tabindex");
			this.label = $("label[for='" + this.ids.element + "']").attr("for", this.ids.button), this._on(this.label, {
				click: function(event) {
					this.button.focus(), event.preventDefault()
				}
			}), this.element.hide(), this.button = $("<span>", {
				class: "ui-selectmenu-button ui-widget ui-state-default ui-corner-all",
				tabindex: tabindex || this.options.disabled ? -1 : 0,
				id: this.ids.button,
				role: "combobox",
				"aria-expanded": "false",
				"aria-autocomplete": "list",
				"aria-owns": this.ids.menu,
				"aria-haspopup": "true"
			}).insertAfter(this.element), $("<span>", {
				class: "ui-icon " + this.options.icons.button
			}).prependTo(this.button), this.buttonText = $("<span>", {
				class: "ui-selectmenu-text"
			}).appendTo(this.button), this._setText(this.buttonText, this.element.find("option:selected").text()), this._resizeButton(), this._on(this.button, this._buttonEvents), this.button.one("focusin", function() {
				that.menuItems || that._refreshMenu()
			}), this._hoverable(this.button), this._focusable(this.button)
		},
		_drawMenu: function() {
			var that = this;
			this.menu = $("<ul>", {
				"aria-hidden": "true",
				"aria-labelledby": this.ids.button,
				id: this.ids.menu
			}), this.menuWrap = $("<div>", {
				class: "ui-selectmenu-menu ui-front"
			}).append(this.menu).appendTo(this._appendTo()), this.menuInstance = this.menu.menu({
				role: "listbox",
				select: function(event, ui) {
					event.preventDefault(), that._select(ui.item.data("ui-selectmenu-item"), event)
				},
				focus: function(event, ui) {
					var item = ui.item.data("ui-selectmenu-item");
					null != that.focusIndex && item.index !== that.focusIndex && (that._trigger("focus", event, {
						item: item
					}), that.isOpen || that._select(item, event)), that.focusIndex = item.index, that.button.attr("aria-activedescendant", that.menuItems.eq(item.index).attr("id"))
				}
			}).menu("instance"), this.menu.addClass("ui-corner-bottom").removeClass("ui-corner-all"), this.menuInstance._off(this.menu, "mouseleave"), this.menuInstance._closeOnDocumentClick = function() {
				return !1
			}, this.menuInstance._isDivider = function() {
				return !1
			}
		},
		refresh: function() {
			this._refreshMenu(), this._setText(this.buttonText, this._getSelectedItem().text()), this.options.width || this._resizeButton()
		},
		_refreshMenu: function() {
			this.menu.empty();
			var item, options = this.element.find("option");
			options.length && (this._parseOptions(options), this._renderMenu(this.menu, this.items), this.menuInstance.refresh(), this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup"), item = this._getSelectedItem(), this.menuInstance.focus(null, item), this._setAria(item.data("ui-selectmenu-item")), this._setOption("disabled", this.element.prop("disabled")))
		},
		open: function(event) {
			this.options.disabled || (this.menuItems ? (this.menu.find(".ui-state-focus").removeClass("ui-state-focus"), this.menuInstance.focus(null, this._getSelectedItem())) : this._refreshMenu(), this.isOpen = !0, this._toggleAttr(), this._resizeMenu(), this._position(), this._on(this.document, this._documentClick), this._trigger("open", event))
		},
		_position: function() {
			this.menuWrap.position($.extend({
				of: this.button
			}, this.options.position))
		},
		close: function(event) {
			this.isOpen && (this.isOpen = !1, this._toggleAttr(), this._off(this.document), this._trigger("close", event))
		},
		widget: function() {
			return this.button
		},
		menuWidget: function() {
			return this.menu
		},
		_renderMenu: function(ul, items) {
			var that = this,
				currentOptgroup = "";
			$.each(items, function(index, item) {
				item.optgroup !== currentOptgroup && ($("<li>", {
					class: "ui-selectmenu-optgroup ui-menu-divider" + (item.element.parent("optgroup").prop("disabled") ? " ui-state-disabled" : ""),
					text: item.optgroup
				}).appendTo(ul), currentOptgroup = item.optgroup), that._renderItemData(ul, item)
			})
		},
		_renderItemData: function(ul, item) {
			return this._renderItem(ul, item).data("ui-selectmenu-item", item)
		},
		_renderItem: function(ul, item) {
			var li = $("<li>");
			return item.disabled && li.addClass("ui-state-disabled"), this._setText(li, item.label), li.appendTo(ul)
		},
		_setText: function(element, value) {
			value ? element.text(value) : element.html("&#160;")
		},
		_move: function(direction, event) {
			var item, next, filter = ".ui-menu-item";
			this.isOpen ? item = this.menuItems.eq(this.focusIndex) : (item = this.menuItems.eq(this.element[0].selectedIndex), filter += ":not(.ui-state-disabled)"), next = "first" === direction || "last" === direction ? item["first" === direction ? "prevAll" : "nextAll"](filter).eq(-1) : item[direction + "All"](filter).eq(0), next.length && this.menuInstance.focus(event, next)
		},
		_getSelectedItem: function() {
			return this.menuItems.eq(this.element[0].selectedIndex)
		},
		_toggle: function(event) {
			this[this.isOpen ? "close" : "open"](event)
		},
		_documentClick: {
			mousedown: function(event) {
				this.isOpen && ($(event.target).closest(".ui-selectmenu-menu, #" + this.ids.button).length || this.close(event))
			}
		},
		_buttonEvents: {
			mousedown: function(event) {
				event.preventDefault()
			},
			click: "_toggle",
			keydown: function(event) {
				var preventDefault = !0;
				switch (event.keyCode) {
				case $.ui.keyCode.TAB:
				case $.ui.keyCode.ESCAPE:
					this.close(event), preventDefault = !1;
					break;
				case $.ui.keyCode.ENTER:
					this.isOpen && this._selectFocusedItem(event);
					break;
				case $.ui.keyCode.UP:
					event.altKey ? this._toggle(event) : this._move("prev", event);
					break;
				case $.ui.keyCode.DOWN:
					event.altKey ? this._toggle(event) : this._move("next", event);
					break;
				case $.ui.keyCode.SPACE:
					this.isOpen ? this._selectFocusedItem(event) : this._toggle(event);
					break;
				case $.ui.keyCode.LEFT:
					this._move("prev", event);
					break;
				case $.ui.keyCode.RIGHT:
					this._move("next", event);
					break;
				case $.ui.keyCode.HOME:
				case $.ui.keyCode.PAGE_UP:
					this._move("first", event);
					break;
				case $.ui.keyCode.END:
				case $.ui.keyCode.PAGE_DOWN:
					this._move("last", event);
					break;
				default:
					this.menu.trigger(event), preventDefault = !1
				}
				preventDefault && event.preventDefault()
			}
		},
		_selectFocusedItem: function(event) {
			var item = this.menuItems.eq(this.focusIndex);
			item.hasClass("ui-state-disabled") || this._select(item.data("ui-selectmenu-item"), event)
		},
		_select: function(item, event) {
			var oldIndex = this.element[0].selectedIndex;
			this.element[0].selectedIndex = item.index, this._setText(this.buttonText, item.label), this._setAria(item), this._trigger("select", event, {
				item: item
			}), item.index !== oldIndex && this._trigger("change", event, {
				item: item
			}), this.close(event)
		},
		_setAria: function(item) {
			var id = this.menuItems.eq(item.index).attr("id");
			this.button.attr({
				"aria-labelledby": id,
				"aria-activedescendant": id
			}), this.menu.attr("aria-activedescendant", id)
		},
		_setOption: function(key, value) {
			"icons" === key && this.button.find("span.ui-icon").removeClass(this.options.icons.button).addClass(value.button), this._super(key, value), "appendTo" === key && this.menuWrap.appendTo(this._appendTo()), "disabled" === key && (this.menuInstance.option("disabled", value), this.button.toggleClass("ui-state-disabled", value).attr("aria-disabled", value), this.element.prop("disabled", value), value ? (this.button.attr("tabindex", -1), this.close()) : this.button.attr("tabindex", 0)), "width" === key && this._resizeButton()
		},
		_appendTo: function() {
			var element = this.options.appendTo;
			return element && (element = element.jquery || element.nodeType ? $(element) : this.document.find(element).eq(0)), element && element[0] || (element = this.element.closest(".ui-front")), element.length || (element = this.document[0].body), element
		},
		_toggleAttr: function() {
			this.button.toggleClass("ui-corner-top", this.isOpen).toggleClass("ui-corner-all", !this.isOpen).attr("aria-expanded", this.isOpen), this.menuWrap.toggleClass("ui-selectmenu-open", this.isOpen), this.menu.attr("aria-hidden", !this.isOpen)
		},
		_resizeButton: function() {
			var width = this.options.width;
			width || (width = this.element.show().outerWidth(), this.element.hide()), this.button.outerWidth(width)
		},
		_resizeMenu: function() {
			this.menu.outerWidth(Math.max(this.button.outerWidth(), this.menu.width("").outerWidth() + 1))
		},
		_getCreateOptions: function() {
			return {
				disabled: this.element.prop("disabled")
			}
		},
		_parseOptions: function(options) {
			var data = [];
			options.each(function(index, item) {
				var option = $(item),
					optgroup = option.parent("optgroup");
				data.push({
					element: option,
					index: index,
					value: option.attr("value"),
					label: option.text(),
					optgroup: optgroup.attr("label") || "",
					disabled: optgroup.prop("disabled") || option.prop("disabled")
				})
			}), this.items = data
		},
		_destroy: function() {
			this.menuWrap.remove(), this.button.remove(), this.element.show(), this.element.removeUniqueId(), this.label.attr("for", this.ids.element)
		}
	}), $.widget("ui.slider", $.ui.mouse, {
		version: "1.11.1",
		widgetEventPrefix: "slide",
		options: {
			animate: !1,
			distance: 0,
			max: 100,
			min: 0,
			orientation: "horizontal",
			range: !1,
			step: 1,
			value: 0,
			values: null,
			change: null,
			slide: null,
			start: null,
			stop: null
		},
		numPages: 5,
		_create: function() {
			this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1
		},
		_refresh: function() {
			this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
		},
		_createHandles: function() {
			var i, handleCount, options = this.options,
				existingHandles = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
				handle = "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",
				handles = [];
			for (handleCount = options.values && options.values.length || 1, existingHandles.length > handleCount && (existingHandles.slice(handleCount).remove(), existingHandles = existingHandles.slice(0, handleCount)), i = existingHandles.length; i < handleCount; i++) handles.push(handle);
			this.handles = existingHandles.add($(handles.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function(i) {
				$(this).data("ui-slider-handle-index", i)
			})
		},
		_createRange: function() {
			var options = this.options,
				classes = "";
			options.range ? (options.range === !0 && (options.values ? options.values.length && 2 !== options.values.length ? options.values = [options.values[0], options.values[0]] : $.isArray(options.values) && (options.values = options.values.slice(0)) : options.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
				left: "",
				bottom: ""
			}) : (this.range = $("<div></div>").appendTo(this.element), classes = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(classes + ("min" === options.range || "max" === options.range ? " ui-slider-range-" + options.range : ""))) : (this.range && this.range.remove(), this.range = null)
		},
		_setupEvents: function() {
			this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles)
		},
		_destroy: function() {
			this.handles.remove(), this.range && this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
		},
		_mouseCapture: function(event) {
			var position, normValue, distance, closestHandle, index, allowed, offset, mouseOverHandle, that = this,
				o = this.options;
			return !o.disabled && (this.elementSize = {
				width: this.element.outerWidth(),
				height: this.element.outerHeight()
			}, this.elementOffset = this.element.offset(), position = {
				x: event.pageX,
				y: event.pageY
			}, normValue = this._normValueFromMouse(position), distance = this._valueMax() - this._valueMin() + 1, this.handles.each(function(i) {
				var thisDistance = Math.abs(normValue - that.values(i));
				(distance > thisDistance || distance === thisDistance && (i === that._lastChangedValue || that.values(i) === o.min)) && (distance = thisDistance, closestHandle = $(this), index = i)
			}), allowed = this._start(event, index), allowed !== !1 && (this._mouseSliding = !0, this._handleIndex = index, closestHandle.addClass("ui-state-active").focus(), offset = closestHandle.offset(), mouseOverHandle = !$(event.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = mouseOverHandle ? {
				left: 0,
				top: 0
			} : {
				left: event.pageX - offset.left - closestHandle.width() / 2,
				top: event.pageY - offset.top - closestHandle.height() / 2 - (parseInt(closestHandle.css("borderTopWidth"), 10) || 0) - (parseInt(closestHandle.css("borderBottomWidth"), 10) || 0) + (parseInt(closestHandle.css("marginTop"), 10) || 0)
			}, this.handles.hasClass("ui-state-hover") || this._slide(event, index, normValue), this._animateOff = !0, !0))
		},
		_mouseStart: function() {
			return !0
		},
		_mouseDrag: function(event) {
			var position = {
				x: event.pageX,
				y: event.pageY
			},
				normValue = this._normValueFromMouse(position);
			return this._slide(event, this._handleIndex, normValue), !1
		},
		_mouseStop: function(event) {
			return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(event, this._handleIndex), this._change(event, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
		},
		_detectOrientation: function() {
			this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
		},
		_normValueFromMouse: function(position) {
			var pixelTotal, pixelMouse, percentMouse, valueTotal, valueMouse;
			return "horizontal" === this.orientation ? (pixelTotal = this.elementSize.width, pixelMouse = position.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (pixelTotal = this.elementSize.height, pixelMouse = position.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), percentMouse = pixelMouse / pixelTotal, percentMouse > 1 && (percentMouse = 1), percentMouse < 0 && (percentMouse = 0), "vertical" === this.orientation && (percentMouse = 1 - percentMouse), valueTotal = this._valueMax() - this._valueMin(), valueMouse = this._valueMin() + percentMouse * valueTotal, this._trimAlignValue(valueMouse)
		},
		_start: function(event, index) {
			var uiHash = {
				handle: this.handles[index],
				value: this.value()
			};
			return this.options.values && this.options.values.length && (uiHash.value = this.values(index), uiHash.values = this.values()), this._trigger("start", event, uiHash)
		},
		_slide: function(event, index, newVal) {
			var otherVal, newValues, allowed;
			this.options.values && this.options.values.length ? (otherVal = this.values(index ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === index && newVal > otherVal || 1 === index && newVal < otherVal) && (newVal = otherVal), newVal !== this.values(index) && (newValues = this.values(), newValues[index] = newVal, allowed = this._trigger("slide", event, {
				handle: this.handles[index],
				value: newVal,
				values: newValues
			}), otherVal = this.values(index ? 0 : 1), allowed !== !1 && this.values(index, newVal))) : newVal !== this.value() && (allowed = this._trigger("slide", event, {
				handle: this.handles[index],
				value: newVal
			}), allowed !== !1 && this.value(newVal))
		},
		_stop: function(event, index) {
			var uiHash = {
				handle: this.handles[index],
				value: this.value()
			};
			this.options.values && this.options.values.length && (uiHash.value = this.values(index), uiHash.values = this.values()), this._trigger("stop", event, uiHash)
		},
		_change: function(event, index) {
			if (!this._keySliding && !this._mouseSliding) {
				var uiHash = {
					handle: this.handles[index],
					value: this.value()
				};
				this.options.values && this.options.values.length && (uiHash.value = this.values(index), uiHash.values = this.values()), this._lastChangedValue = index, this._trigger("change", event, uiHash)
			}
		},
		value: function(newValue) {
			return arguments.length ? (this.options.value = this._trimAlignValue(newValue), this._refreshValue(), void this._change(null, 0)) : this._value()
		},
		values: function(index, newValue) {
			var vals, newValues, i;
			if (arguments.length > 1) return this.options.values[index] = this._trimAlignValue(newValue), this._refreshValue(), void this._change(null, index);
			if (!arguments.length) return this._values();
			if (!$.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(index) : this.value();
			for (vals = this.options.values, newValues = arguments[0], i = 0; i < vals.length; i += 1) vals[i] = this._trimAlignValue(newValues[i]), this._change(null, i);
			this._refreshValue()
		},
		_setOption: function(key, value) {
			var i, valsLength = 0;
			switch ("range" === key && this.options.range === !0 && ("min" === value ? (this.options.value = this._values(0), this.options.values = null) : "max" === value && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), $.isArray(this.options.values) && (valsLength = this.options.values.length), "disabled" === key && this.element.toggleClass("ui-state-disabled", !! value), this._super(key, value), key) {
			case "orientation":
				this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue(), this.handles.css("horizontal" === value ? "bottom" : "left", "");
				break;
			case "value":
				this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
				break;
			case "values":
				for (this._animateOff = !0, this._refreshValue(), i = 0; i < valsLength; i += 1) this._change(null, i);
				this._animateOff = !1;
				break;
			case "min":
			case "max":
				this._animateOff = !0, this._refreshValue(), this._animateOff = !1;
				break;
			case "range":
				this._animateOff = !0, this._refresh(), this._animateOff = !1
			}
		},
		_value: function() {
			var val = this.options.value;
			return val = this._trimAlignValue(val)
		},
		_values: function(index) {
			var val, vals, i;
			if (arguments.length) return val = this.options.values[index], val = this._trimAlignValue(val);
			if (this.options.values && this.options.values.length) {
				for (vals = this.options.values.slice(), i = 0; i < vals.length; i += 1) vals[i] = this._trimAlignValue(vals[i]);
				return vals
			}
			return []
		},
		_trimAlignValue: function(val) {
			if (val <= this._valueMin()) return this._valueMin();
			if (val >= this._valueMax()) return this._valueMax();
			var step = this.options.step > 0 ? this.options.step : 1,
				valModStep = (val - this._valueMin()) % step,
				alignValue = val - valModStep;
			return 2 * Math.abs(valModStep) >= step && (alignValue += valModStep > 0 ? step : -step), parseFloat(alignValue.toFixed(5))
		},
		_valueMin: function() {
			return this.options.min
		},
		_valueMax: function() {
			return this.options.max
		},
		_refreshValue: function() {
			var lastValPercent, valPercent, value, valueMin, valueMax, oRange = this.options.range,
				o = this.options,
				that = this,
				animate = !this._animateOff && o.animate,
				_set = {};
			this.options.values && this.options.values.length ? this.handles.each(function(i) {
				valPercent = (that.values(i) - that._valueMin()) / (that._valueMax() - that._valueMin()) * 100, _set["horizontal" === that.orientation ? "left" : "bottom"] = valPercent + "%", $(this).stop(1, 1)[animate ? "animate" : "css"](_set, o.animate), that.options.range === !0 && ("horizontal" === that.orientation ? (0 === i && that.range.stop(1, 1)[animate ? "animate" : "css"]({
					left: valPercent + "%"
				}, o.animate), 1 === i && that.range[animate ? "animate" : "css"]({
					width: valPercent - lastValPercent + "%"
				}, {
					queue: !1,
					duration: o.animate
				})) : (0 === i && that.range.stop(1, 1)[animate ? "animate" : "css"]({
					bottom: valPercent + "%"
				}, o.animate), 1 === i && that.range[animate ? "animate" : "css"]({
					height: valPercent - lastValPercent + "%"
				}, {
					queue: !1,
					duration: o.animate
				}))), lastValPercent = valPercent
			}) : (value = this.value(), valueMin = this._valueMin(), valueMax = this._valueMax(), valPercent = valueMax !== valueMin ? (value - valueMin) / (valueMax - valueMin) * 100 : 0, _set["horizontal" === this.orientation ? "left" : "bottom"] = valPercent + "%", this.handle.stop(1, 1)[animate ? "animate" : "css"](_set, o.animate), "min" === oRange && "horizontal" === this.orientation && this.range.stop(1, 1)[animate ? "animate" : "css"]({
				width: valPercent + "%"
			}, o.animate), "max" === oRange && "horizontal" === this.orientation && this.range[animate ? "animate" : "css"]({
				width: 100 - valPercent + "%"
			}, {
				queue: !1,
				duration: o.animate
			}), "min" === oRange && "vertical" === this.orientation && this.range.stop(1, 1)[animate ? "animate" : "css"]({
				height: valPercent + "%"
			}, o.animate), "max" === oRange && "vertical" === this.orientation && this.range[animate ? "animate" : "css"]({
				height: 100 - valPercent + "%"
			}, {
				queue: !1,
				duration: o.animate
			}))
		},
		_handleEvents: {
			keydown: function(event) {
				var allowed, curVal, newVal, step, index = $(event.target).data("ui-slider-handle-index");
				switch (event.keyCode) {
				case $.ui.keyCode.HOME:
				case $.ui.keyCode.END:
				case $.ui.keyCode.PAGE_UP:
				case $.ui.keyCode.PAGE_DOWN:
				case $.ui.keyCode.UP:
				case $.ui.keyCode.RIGHT:
				case $.ui.keyCode.DOWN:
				case $.ui.keyCode.LEFT:
					if (event.preventDefault(), !this._keySliding && (this._keySliding = !0, $(event.target).addClass("ui-state-active"), allowed = this._start(event, index), allowed === !1)) return
				}
				switch (step = this.options.step, curVal = newVal = this.options.values && this.options.values.length ? this.values(index) : this.value(), event.keyCode) {
				case $.ui.keyCode.HOME:
					newVal = this._valueMin();
					break;
				case $.ui.keyCode.END:
					newVal = this._valueMax();
					break;
				case $.ui.keyCode.PAGE_UP:
					newVal = this._trimAlignValue(curVal + (this._valueMax() - this._valueMin()) / this.numPages);
					break;
				case $.ui.keyCode.PAGE_DOWN:
					newVal = this._trimAlignValue(curVal - (this._valueMax() - this._valueMin()) / this.numPages);
					break;
				case $.ui.keyCode.UP:
				case $.ui.keyCode.RIGHT:
					if (curVal === this._valueMax()) return;
					newVal = this._trimAlignValue(curVal + step);
					break;
				case $.ui.keyCode.DOWN:
				case $.ui.keyCode.LEFT:
					if (curVal === this._valueMin()) return;
					newVal = this._trimAlignValue(curVal - step)
				}
				this._slide(event, index, newVal)
			},
			keyup: function(event) {
				var index = $(event.target).data("ui-slider-handle-index");
				this._keySliding && (this._keySliding = !1, this._stop(event, index), this._change(event, index), $(event.target).removeClass("ui-state-active"))
			}
		}
	}), $.widget("ui.sortable", $.ui.mouse, {
		version: "1.11.1",
		widgetEventPrefix: "sort",
		ready: !1,
		options: {
			appendTo: "parent",
			axis: !1,
			connectWith: !1,
			containment: !1,
			cursor: "auto",
			cursorAt: !1,
			dropOnEmpty: !0,
			forcePlaceholderSize: !1,
			forceHelperSize: !1,
			grid: !1,
			handle: !1,
			helper: "original",
			items: "> *",
			opacity: !1,
			placeholder: !1,
			revert: !1,
			scroll: !0,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			scope: "default",
			tolerance: "intersect",
			zIndex: 1e3,
			activate: null,
			beforeStop: null,
			change: null,
			deactivate: null,
			out: null,
			over: null,
			receive: null,
			remove: null,
			sort: null,
			start: null,
			stop: null,
			update: null
		},
		_isOverAxis: function(x, reference, size) {
			return x >= reference && x < reference + size
		},
		_isFloating: function(item) {
			return /left|right/.test(item.css("float")) || /inline|table-cell/.test(item.css("display"))
		},
		_create: function() {
			var o = this.options;
			this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = !! this.items.length && ("x" === o.axis || this._isFloating(this.items[0].item)), this.offset = this.element.offset(), this._mouseInit(), this._setHandleClassName(), this.ready = !0
		},
		_setOption: function(key, value) {
			this._super(key, value), "handle" === key && this._setHandleClassName()
		},
		_setHandleClassName: function() {
			this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle"), $.each(this.items, function() {
				(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item).addClass("ui-sortable-handle")
			})
		},
		_destroy: function() {
			this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle"), this._mouseDestroy();
			for (var i = this.items.length - 1; i >= 0; i--) this.items[i].item.removeData(this.widgetName + "-item");
			return this
		},
		_mouseCapture: function(event, overrideHandle) {
			var currentItem = null,
				validHandle = !1,
				that = this;
			return !this.reverting && (!this.options.disabled && "static" !== this.options.type && (this._refreshItems(event), $(event.target).parents().each(function() {
				if ($.data(this, that.widgetName + "-item") === that) return currentItem = $(this), !1
			}), $.data(event.target, that.widgetName + "-item") === that && (currentItem = $(event.target)), !! currentItem && (!(this.options.handle && !overrideHandle && ($(this.options.handle, currentItem).find("*").addBack().each(function() {
				this === event.target && (validHandle = !0)
			}), !validHandle)) && (this.currentItem = currentItem, this._removeCurrentsFromItems(), !0))))
		},
		_mouseStart: function(event, overrideHandle, noActivation) {
			var i, body, o = this.options;
			if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(event), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
				top: this.offset.top - this.margins.top,
				left: this.offset.left - this.margins.left
			}, $.extend(this.offset, {
				click: {
					left: event.pageX - this.offset.left,
					top: event.pageY - this.offset.top
				},
				parent: this._getParentOffset(),
				relative: this._getRelativeOffset()
			}), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(event), this.originalPageX = event.pageX, this.originalPageY = event.pageY, o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt), this.domPosition = {
				prev: this.currentItem.prev()[0],
				parent: this.currentItem.parent()[0]
			}, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), o.containment && this._setContainment(), o.cursor && "auto" !== o.cursor && (body = this.document.find("body"), this.storedCursor = body.css("cursor"), body.css("cursor", o.cursor), this.storedStylesheet = $("<style>*{ cursor: " + o.cursor + " !important; }</style>").appendTo(body)), o.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", o.opacity)), o.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", o.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", event, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !noActivation) for (i = this.containers.length - 1; i >= 0; i--) this.containers[i]._trigger("activate", event, this._uiHash(this));
			return $.ui.ddmanager && ($.ui.ddmanager.current = this), $.ui.ddmanager && !o.dropBehaviour && $.ui.ddmanager.prepareOffsets(this, event), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(event), !0
		},
		_mouseDrag: function(event) {
			var i, item, itemElement, intersection, o = this.options,
				scrolled = !1;
			for (this.position = this._generatePosition(event), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - event.pageY < o.scrollSensitivity ? this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed : event.pageY - this.overflowOffset.top < o.scrollSensitivity && (this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - event.pageX < o.scrollSensitivity ? this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed : event.pageX - this.overflowOffset.left < o.scrollSensitivity && (this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed)) : (event.pageY - $(document).scrollTop() < o.scrollSensitivity ? scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed) : $(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity && (scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed)), event.pageX - $(document).scrollLeft() < o.scrollSensitivity ? scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed) : $(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity && (scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed))), scrolled !== !1 && $.ui.ddmanager && !o.dropBehaviour && $.ui.ddmanager.prepareOffsets(this, event)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--) if (item = this.items[i], itemElement = item.item[0], intersection = this._intersectsWithPointer(item), intersection && item.instance === this.currentContainer && !(itemElement === this.currentItem[0] || this.placeholder[1 === intersection ? "next" : "prev"]()[0] === itemElement || $.contains(this.placeholder[0], itemElement) || "semi-dynamic" === this.options.type && $.contains(this.element[0], itemElement))) {
				if (this.direction = 1 === intersection ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(item)) break;
				this._rearrange(event, item), this._trigger("change", event, this._uiHash());
				break
			}
			return this._contactContainers(event), $.ui.ddmanager && $.ui.ddmanager.drag(this, event), this._trigger("sort", event, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
		},
		_mouseStop: function(event, noPropagation) {
			if (event) {
				if ($.ui.ddmanager && !this.options.dropBehaviour && $.ui.ddmanager.drop(this, event), this.options.revert) {
					var that = this,
						cur = this.placeholder.offset(),
						axis = this.options.axis,
						animation = {};
					axis && "x" !== axis || (animation.left = cur.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)), axis && "y" !== axis || (animation.top = cur.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, $(this.helper).animate(animation, parseInt(this.options.revert, 10) || 500, function() {
						that._clear(event)
					})
				} else this._clear(event, noPropagation);
				return !1
			}
		},
		cancel: function() {
			if (this.dragging) {
				this._mouseUp({
					target: null
				}), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
				for (var i = this.containers.length - 1; i >= 0; i--) this.containers[i]._trigger("deactivate", null, this._uiHash(this)), this.containers[i].containerCache.over && (this.containers[i]._trigger("out", null, this._uiHash(this)), this.containers[i].containerCache.over = 0)
			}
			return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), $.extend(this, {
				helper: null,
				dragging: !1,
				reverting: !1,
				_noFinalSort: null
			}), this.domPosition.prev ? $(this.domPosition.prev).after(this.currentItem) : $(this.domPosition.parent).prepend(this.currentItem)), this
		},
		serialize: function(o) {
			var items = this._getItemsAsjQuery(o && o.connected),
				str = [];
			return o = o || {}, $(items).each(function() {
				var res = ($(o.item || this).attr(o.attribute || "id") || "").match(o.expression || /(.+)[\-=_](.+)/);
				res && str.push((o.key || res[1] + "[]") + "=" + (o.key && o.expression ? res[1] : res[2]))
			}), !str.length && o.key && str.push(o.key + "="), str.join("&")
		},
		toArray: function(o) {
			var items = this._getItemsAsjQuery(o && o.connected),
				ret = [];
			return o = o || {}, items.each(function() {
				ret.push($(o.item || this).attr(o.attribute || "id") || "")
			}), ret
		},
		_intersectsWith: function(item) {
			var x1 = this.positionAbs.left,
				x2 = x1 + this.helperProportions.width,
				y1 = this.positionAbs.top,
				y2 = y1 + this.helperProportions.height,
				l = item.left,
				r = l + item.width,
				t = item.top,
				b = t + item.height,
				dyClick = this.offset.click.top,
				dxClick = this.offset.click.left,
				isOverElementHeight = "x" === this.options.axis || y1 + dyClick > t && y1 + dyClick < b,
				isOverElementWidth = "y" === this.options.axis || x1 + dxClick > l && x1 + dxClick < r,
				isOverElement = isOverElementHeight && isOverElementWidth;
			return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > item[this.floating ? "width" : "height"] ? isOverElement : l < x1 + this.helperProportions.width / 2 && x2 - this.helperProportions.width / 2 < r && t < y1 + this.helperProportions.height / 2 && y2 - this.helperProportions.height / 2 < b
		},
		_intersectsWithPointer: function(item) {
			var isOverElementHeight = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height),
				isOverElementWidth = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width),
				isOverElement = isOverElementHeight && isOverElementWidth,
				verticalDirection = this._getDragVerticalDirection(),
				horizontalDirection = this._getDragHorizontalDirection();
			return !!isOverElement && (this.floating ? horizontalDirection && "right" === horizontalDirection || "down" === verticalDirection ? 2 : 1 : verticalDirection && ("down" === verticalDirection ? 2 : 1))
		},
		_intersectsWithSides: function(item) {
			var isOverBottomHalf = this._isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + item.height / 2, item.height),
				isOverRightHalf = this._isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + item.width / 2, item.width),
				verticalDirection = this._getDragVerticalDirection(),
				horizontalDirection = this._getDragHorizontalDirection();
			return this.floating && horizontalDirection ? "right" === horizontalDirection && isOverRightHalf || "left" === horizontalDirection && !isOverRightHalf : verticalDirection && ("down" === verticalDirection && isOverBottomHalf || "up" === verticalDirection && !isOverBottomHalf)
		},
		_getDragVerticalDirection: function() {
			var delta = this.positionAbs.top - this.lastPositionAbs.top;
			return 0 !== delta && (delta > 0 ? "down" : "up")
		},
		_getDragHorizontalDirection: function() {
			var delta = this.positionAbs.left - this.lastPositionAbs.left;
			return 0 !== delta && (delta > 0 ? "right" : "left")
		},
		refresh: function(event) {
			return this._refreshItems(event), this._setHandleClassName(), this.refreshPositions(), this
		},
		_connectWith: function() {
			var options = this.options;
			return options.connectWith.constructor === String ? [options.connectWith] : options.connectWith
		},
		_getItemsAsjQuery: function(connected) {
			function addItems() {
				items.push(this)
			}
			var i, j, cur, inst, items = [],
				queries = [],
				connectWith = this._connectWith();
			if (connectWith && connected) for (i = connectWith.length - 1; i >= 0; i--) for (cur = $(connectWith[i]), j = cur.length - 1; j >= 0; j--) inst = $.data(cur[j], this.widgetFullName), inst && inst !== this && !inst.options.disabled && queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element) : $(inst.options.items, inst.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), inst]);
			for (queries.push([$.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
				options: this.options,
				item: this.currentItem
			}) : $(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), i = queries.length - 1; i >= 0; i--) queries[i][0].each(addItems);
			return $(items)
		},
		_removeCurrentsFromItems: function() {
			var list = this.currentItem.find(":data(" + this.widgetName + "-item)");
			this.items = $.grep(this.items, function(item) {
				for (var j = 0; j < list.length; j++) if (list[j] === item.item[0]) return !1;
				return !0
			})
		},
		_refreshItems: function(event) {
			this.items = [], this.containers = [this];
			var i, j, cur, inst, targetData, _queries, item, queriesLength, items = this.items,
				queries = [
					[$.isFunction(this.options.items) ? this.options.items.call(this.element[0], event, {
						item: this.currentItem
					}) : $(this.options.items, this.element), this]
				],
				connectWith = this._connectWith();
			if (connectWith && this.ready) for (i = connectWith.length - 1; i >= 0; i--) for (cur = $(connectWith[i]), j = cur.length - 1; j >= 0; j--) inst = $.data(cur[j], this.widgetFullName), inst && inst !== this && !inst.options.disabled && (queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element[0], event, {
				item: this.currentItem
			}) : $(inst.options.items, inst.element), inst]), this.containers.push(inst));
			for (i = queries.length - 1; i >= 0; i--) for (targetData = queries[i][1], _queries = queries[i][0], j = 0, queriesLength = _queries.length; j < queriesLength; j++) item = $(_queries[j]), item.data(this.widgetName + "-item", targetData), items.push({
				item: item,
				instance: targetData,
				width: 0,
				height: 0,
				left: 0,
				top: 0
			})
		},
		refreshPositions: function(fast) {
			this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
			var i, item, t, p;
			for (i = this.items.length - 1; i >= 0; i--) item = this.items[i], item.instance !== this.currentContainer && this.currentContainer && item.item[0] !== this.currentItem[0] || (t = this.options.toleranceElement ? $(this.options.toleranceElement, item.item) : item.item, fast || (item.width = t.outerWidth(), item.height = t.outerHeight()), p = t.offset(), item.left = p.left, item.top = p.top);
			if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
			else for (i = this.containers.length - 1; i >= 0; i--) p = this.containers[i].element.offset(), this.containers[i].containerCache.left = p.left, this.containers[i].containerCache.top = p.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
			return this
		},
		_createPlaceholder: function(that) {
			that = that || this;
			var className, o = that.options;
			o.placeholder && o.placeholder.constructor !== String || (className = o.placeholder, o.placeholder = {
				element: function() {
					var nodeName = that.currentItem[0].nodeName.toLowerCase(),
						element = $("<" + nodeName + ">", that.document[0]).addClass(className || that.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
					return "tr" === nodeName ? that.currentItem.children().each(function() {
						$("<td>&#160;</td>", that.document[0]).attr("colspan", $(this).attr("colspan") || 1).appendTo(element)
					}) : "img" === nodeName && element.attr("src", that.currentItem.attr("src")), className || element.css("visibility", "hidden"), element
				},
				update: function(container, p) {
					className && !o.forcePlaceholderSize || (p.height() || p.height(that.currentItem.innerHeight() - parseInt(that.currentItem.css("paddingTop") || 0, 10) - parseInt(that.currentItem.css("paddingBottom") || 0, 10)), p.width() || p.width(that.currentItem.innerWidth() - parseInt(that.currentItem.css("paddingLeft") || 0, 10) - parseInt(that.currentItem.css("paddingRight") || 0, 10)))
				}
			}), that.placeholder = $(o.placeholder.element.call(that.element, that.currentItem)), that.currentItem.after(that.placeholder), o.placeholder.update(that, that.placeholder)
		},
		_contactContainers: function(event) {
			var i, j, dist, itemWithLeastDistance, posProperty, sizeProperty, cur, nearBottom, floating, axis, innermostContainer = null,
				innermostIndex = null;
			for (i = this.containers.length - 1; i >= 0; i--) if (!$.contains(this.currentItem[0], this.containers[i].element[0])) if (this._intersectsWith(this.containers[i].containerCache)) {
				if (innermostContainer && $.contains(this.containers[i].element[0], innermostContainer.element[0])) continue;
				innermostContainer = this.containers[i], innermostIndex = i
			} else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", event, this._uiHash(this)), this.containers[i].containerCache.over = 0);
			if (innermostContainer) if (1 === this.containers.length) this.containers[innermostIndex].containerCache.over || (this.containers[innermostIndex]._trigger("over", event, this._uiHash(this)), this.containers[innermostIndex].containerCache.over = 1);
			else {
				for (dist = 1e4, itemWithLeastDistance = null, floating = innermostContainer.floating || this._isFloating(this.currentItem), posProperty = floating ? "left" : "top", sizeProperty = floating ? "width" : "height", axis = floating ? "clientX" : "clientY", j = this.items.length - 1; j >= 0; j--) $.contains(this.containers[innermostIndex].element[0], this.items[j].item[0]) && this.items[j].item[0] !== this.currentItem[0] && (cur = this.items[j].item.offset()[posProperty], nearBottom = !1, event[axis] - cur > this.items[j][sizeProperty] / 2 && (nearBottom = !0), Math.abs(event[axis] - cur) < dist && (dist = Math.abs(event[axis] - cur), itemWithLeastDistance = this.items[j], this.direction = nearBottom ? "up" : "down"));
				if (!itemWithLeastDistance && !this.options.dropOnEmpty) return;
				if (this.currentContainer === this.containers[innermostIndex]) return;
				itemWithLeastDistance ? this._rearrange(event, itemWithLeastDistance, null, !0) : this._rearrange(event, null, this.containers[innermostIndex].element, !0), this._trigger("change", event, this._uiHash()), this.containers[innermostIndex]._trigger("change", event, this._uiHash(this)), this.currentContainer = this.containers[innermostIndex], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[innermostIndex]._trigger("over", event, this._uiHash(this)), this.containers[innermostIndex].containerCache.over = 1
			}
		},
		_createHelper: function(event) {
			var o = this.options,
				helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event, this.currentItem])) : "clone" === o.helper ? this.currentItem.clone() : this.currentItem;
			return helper.parents("body").length || $("parent" !== o.appendTo ? o.appendTo : this.currentItem[0].parentNode)[0].appendChild(helper[0]), helper[0] === this.currentItem[0] && (this._storedCSS = {
				width: this.currentItem[0].style.width,
				height: this.currentItem[0].style.height,
				position: this.currentItem.css("position"),
				top: this.currentItem.css("top"),
				left: this.currentItem.css("left")
			}), helper[0].style.width && !o.forceHelperSize || helper.width(this.currentItem.width()), helper[0].style.height && !o.forceHelperSize || helper.height(this.currentItem.height()), helper
		},
		_adjustOffsetFromHelper: function(obj) {
			"string" == typeof obj && (obj = obj.split(" ")), $.isArray(obj) && (obj = {
				left: +obj[0],
				top: +obj[1] || 0
			}), "left" in obj && (this.offset.click.left = obj.left + this.margins.left), "right" in obj && (this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left), "top" in obj && (this.offset.click.top = obj.top + this.margins.top), "bottom" in obj && (this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top)
		},
		_getParentOffset: function() {
			this.offsetParent = this.helper.offsetParent();
			var po = this.offsetParent.offset();
			return "absolute" === this.cssPosition && this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0]) && (po.left += this.scrollParent.scrollLeft(), po.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && $.ui.ie) && (po = {
				top: 0,
				left: 0
			}), {
				top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			}
		},
		_getRelativeOffset: function() {
			if ("relative" === this.cssPosition) {
				var p = this.currentItem.position();
				return {
					top: p.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
					left: p.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
				}
			}
			return {
				top: 0,
				left: 0
			}
		},
		_cacheMargins: function() {
			this.margins = {
				left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
				top: parseInt(this.currentItem.css("marginTop"), 10) || 0
			}
		},
		_cacheHelperProportions: function() {
			this.helperProportions = {
				width: this.helper.outerWidth(),
				height: this.helper.outerHeight()
			}
		},
		_setContainment: function() {
			var ce, co, over, o = this.options;
			"parent" === o.containment && (o.containment = this.helper[0].parentNode), "document" !== o.containment && "window" !== o.containment || (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, $("document" === o.containment ? document : window).width() - this.helperProportions.width - this.margins.left, ($("document" === o.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(o.containment) || (ce = $(o.containment)[0], co = $(o.containment).offset(), over = "hidden" !== $(ce).css("overflow"), this.containment = [co.left + (parseInt($(ce).css("borderLeftWidth"), 10) || 0) + (parseInt($(ce).css("paddingLeft"), 10) || 0) - this.margins.left, co.top + (parseInt($(ce).css("borderTopWidth"), 10) || 0) + (parseInt($(ce).css("paddingTop"), 10) || 0) - this.margins.top, co.left + (over ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"), 10) || 0) - (parseInt($(ce).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, co.top + (over ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"), 10) || 0) - (parseInt($(ce).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
		},
		_convertPositionTo: function(d, pos) {
			pos || (pos = this.position);
			var mod = "absolute" === d ? 1 : -1,
				scroll = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
				scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);
			return {
				top: pos.top + this.offset.relative.top * mod + this.offset.parent.top * mod - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : scrollIsRootNode ? 0 : scroll.scrollTop()) * mod,
				left: pos.left + this.offset.relative.left * mod + this.offset.parent.left * mod - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft()) * mod
			}
		},
		_generatePosition: function(event) {
			var top, left, o = this.options,
				pageX = event.pageX,
				pageY = event.pageY,
				scroll = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
				scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);
			return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (event.pageX - this.offset.click.left < this.containment[0] && (pageX = this.containment[0] + this.offset.click.left), event.pageY - this.offset.click.top < this.containment[1] && (pageY = this.containment[1] + this.offset.click.top), event.pageX - this.offset.click.left > this.containment[2] && (pageX = this.containment[2] + this.offset.click.left), event.pageY - this.offset.click.top > this.containment[3] && (pageY = this.containment[3] + this.offset.click.top)), o.grid && (top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1], pageY = this.containment ? top - this.offset.click.top >= this.containment[1] && top - this.offset.click.top <= this.containment[3] ? top : top - this.offset.click.top >= this.containment[1] ? top - o.grid[1] : top + o.grid[1] : top, left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0], pageX = this.containment ? left - this.offset.click.left >= this.containment[0] && left - this.offset.click.left <= this.containment[2] ? left : left - this.offset.click.left >= this.containment[0] ? left - o.grid[0] : left + o.grid[0] : left)), {
				top: pageY - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : scrollIsRootNode ? 0 : scroll.scrollTop()),
				left: pageX - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft())
			}
		},
		_rearrange: function(event, i, a, hardRefresh) {
			a ? a[0].appendChild(this.placeholder[0]) : i.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? i.item[0] : i.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
			var counter = this.counter;
			this._delay(function() {
				counter === this.counter && this.refreshPositions(!hardRefresh)
			})
		},
		_clear: function(event, noPropagation) {
			function delayEvent(type, instance, container) {
				return function(event) {
					container._trigger(type, event, instance._uiHash(instance))
				}
			}
			this.reverting = !1;
			var i, delayedTriggers = [];
			if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
				for (i in this._storedCSS)"auto" !== this._storedCSS[i] && "static" !== this._storedCSS[i] || (this._storedCSS[i] = "");
				this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
			} else this.currentItem.show();
			for (this.fromOutside && !noPropagation && delayedTriggers.push(function(event) {
				this._trigger("receive", event, this._uiHash(this.fromOutside))
			}), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || noPropagation || delayedTriggers.push(function(event) {
				this._trigger("update", event, this._uiHash())
			}), this !== this.currentContainer && (noPropagation || (delayedTriggers.push(function(event) {
				this._trigger("remove", event, this._uiHash())
			}), delayedTriggers.push(function(c) {
				return function(event) {
					c._trigger("receive", event, this._uiHash(this))
				}
			}.call(this, this.currentContainer)), delayedTriggers.push(function(c) {
				return function(event) {
					c._trigger("update", event, this._uiHash(this))
				}
			}.call(this, this.currentContainer)))), i = this.containers.length - 1; i >= 0; i--) noPropagation || delayedTriggers.push(delayEvent("deactivate", this, this.containers[i])), this.containers[i].containerCache.over && (delayedTriggers.push(delayEvent("out", this, this.containers[i])), this.containers[i].containerCache.over = 0);
			if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
				if (!noPropagation) {
					for (this._trigger("beforeStop", event, this._uiHash()), i = 0; i < delayedTriggers.length; i++) delayedTriggers[i].call(this, event);
					this._trigger("stop", event, this._uiHash())
				}
				return this.fromOutside = !1, !1
			}
			if (noPropagation || this._trigger("beforeStop", event, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, !noPropagation) {
				for (i = 0; i < delayedTriggers.length; i++) delayedTriggers[i].call(this, event);
				this._trigger("stop", event, this._uiHash())
			}
			return this.fromOutside = !1, !0
		},
		_trigger: function() {
			$.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
		},
		_uiHash: function(_inst) {
			var inst = _inst || this;
			return {
				helper: inst.helper,
				placeholder: inst.placeholder || $([]),
				position: inst.position,
				originalPosition: inst.originalPosition,
				offset: inst.positionAbs,
				item: inst.currentItem,
				sender: _inst ? _inst.element : null
			}
		}
	}), $.widget("ui.spinner", {
		version: "1.11.1",
		defaultElement: "<input>",
		widgetEventPrefix: "spin",
		options: {
			culture: null,
			icons: {
				down: "ui-icon-triangle-1-s",
				up: "ui-icon-triangle-1-n"
			},
			incremental: !0,
			max: null,
			min: null,
			numberFormat: null,
			page: 10,
			step: 1,
			change: null,
			spin: null,
			start: null,
			stop: null
		},
		_create: function() {
			this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), "" !== this.value() && this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, {
				beforeunload: function() {
					this.element.removeAttr("autocomplete")
				}
			})
		},
		_getCreateOptions: function() {
			var options = {},
				element = this.element;
			return $.each(["min", "max", "step"], function(i, option) {
				var value = element.attr(option);
				void 0 !== value && value.length && (options[option] = value)
			}), options
		},
		_events: {
			keydown: function(event) {
				this._start(event) && this._keydown(event) && event.preventDefault()
			},
			keyup: "_stop",
			focus: function() {
				this.previous = this.element.val()
			},
			blur: function(event) {
				return this.cancelBlur ? void delete this.cancelBlur : (this._stop(), this._refresh(), void(this.previous !== this.element.val() && this._trigger("change", event)))
			},
			mousewheel: function(event, delta) {
				if (delta) {
					if (!this.spinning && !this._start(event)) return !1;
					this._spin((delta > 0 ? 1 : -1) * this.options.step, event), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function() {
						this.spinning && this._stop(event)
					}, 100), event.preventDefault()
				}
			},
			"mousedown .ui-spinner-button": function(event) {
				function checkFocus() {
					var isActive = this.element[0] === this.document[0].activeElement;
					isActive || (this.element.focus(), this.previous = previous, this._delay(function() {
						this.previous = previous
					}))
				}
				var previous;
				previous = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val(), event.preventDefault(), checkFocus.call(this), this.cancelBlur = !0, this._delay(function() {
					delete this.cancelBlur, checkFocus.call(this)
				}), this._start(event) !== !1 && this._repeat(null, $(event.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, event)
			},
			"mouseup .ui-spinner-button": "_stop",
			"mouseenter .ui-spinner-button": function(event) {
				if ($(event.currentTarget).hasClass("ui-state-active")) return this._start(event) !== !1 && void this._repeat(null, $(event.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, event)
			},
			"mouseleave .ui-spinner-button": "_stop"
		},
		_draw: function() {
			var uiSpinner = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
			this.element.attr("role", "spinbutton"), this.buttons = uiSpinner.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all"), this.buttons.height() > Math.ceil(.5 * uiSpinner.height()) && uiSpinner.height() > 0 && uiSpinner.height(uiSpinner.height()), this.options.disabled && this.disable()
		},
		_keydown: function(event) {
			var options = this.options,
				keyCode = $.ui.keyCode;
			switch (event.keyCode) {
			case keyCode.UP:
				return this._repeat(null, 1, event), !0;
			case keyCode.DOWN:
				return this._repeat(null, -1, event), !0;
			case keyCode.PAGE_UP:
				return this._repeat(null, options.page, event), !0;
			case keyCode.PAGE_DOWN:
				return this._repeat(null, -options.page, event), !0
			}
			return !1
		},
		_uiSpinnerHtml: function() {
			return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"
		},
		_buttonHtml: function() {
			return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon " + this.options.icons.down + "'>&#9660;</span></a>"
		},
		_start: function(event) {
			return !(!this.spinning && this._trigger("start", event) === !1) && (this.counter || (this.counter = 1), this.spinning = !0, !0)
		},
		_repeat: function(i, steps, event) {
			i = i || 500, clearTimeout(this.timer), this.timer = this._delay(function() {
				this._repeat(40, steps, event)
			}, i), this._spin(steps * this.options.step, event)
		},
		_spin: function(step, event) {
			var value = this.value() || 0;
			this.counter || (this.counter = 1), value = this._adjustValue(value + step * this._increment(this.counter)), this.spinning && this._trigger("spin", event, {
				value: value
			}) === !1 || (this._value(value), this.counter++)
		},
		_increment: function(i) {
			var incremental = this.options.incremental;
			return incremental ? $.isFunction(incremental) ? incremental(i) : Math.floor(i * i * i / 5e4 - i * i / 500 + 17 * i / 200 + 1) : 1
		},
		_precision: function() {
			var precision = this._precisionOf(this.options.step);
			return null !== this.options.min && (precision = Math.max(precision, this._precisionOf(this.options.min))), precision
		},
		_precisionOf: function(num) {
			var str = num.toString(),
				decimal = str.indexOf(".");
			return decimal === -1 ? 0 : str.length - decimal - 1
		},
		_adjustValue: function(value) {
			var base, aboveMin, options = this.options;
			return base = null !== options.min ? options.min : 0, aboveMin = value - base, aboveMin = Math.round(aboveMin / options.step) * options.step, value = base + aboveMin, value = parseFloat(value.toFixed(this._precision())), null !== options.max && value > options.max ? options.max : null !== options.min && value < options.min ? options.min : value
		},
		_stop: function(event) {
			this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", event))
		},
		_setOption: function(key, value) {
			if ("culture" === key || "numberFormat" === key) {
				var prevValue = this._parse(this.element.val());
				return this.options[key] = value, void this.element.val(this._format(prevValue))
			}
			"max" !== key && "min" !== key && "step" !== key || "string" == typeof value && (value = this._parse(value)), "icons" === key && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(value.up), this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(value.down)), this._super(key, value), "disabled" === key && (this.widget().toggleClass("ui-state-disabled", !! value), this.element.prop("disabled", !! value), this.buttons.button(value ? "disable" : "enable"))
		},
		_setOptions: spinner_modifier(function(options) {
			this._super(options)
		}),
		_parse: function(val) {
			return "string" == typeof val && "" !== val && (val = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(val, 10, this.options.culture) : +val), "" === val || isNaN(val) ? null : val
		},
		_format: function(value) {
			return "" === value ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(value, this.options.numberFormat, this.options.culture) : value
		},
		_refresh: function() {
			this.element.attr({
				"aria-valuemin": this.options.min,
				"aria-valuemax": this.options.max,
				"aria-valuenow": this._parse(this.element.val())
			})
		},
		isValid: function() {
			var value = this.value();
			return null !== value && value === this._adjustValue(value)
		},
		_value: function(value, allowAny) {
			var parsed;
			"" !== value && (parsed = this._parse(value), null !== parsed && (allowAny || (parsed = this._adjustValue(parsed)), value = this._format(parsed))), this.element.val(value), this._refresh()
		},
		_destroy: function() {
			this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.uiSpinner.replaceWith(this.element)
		},
		stepUp: spinner_modifier(function(steps) {
			this._stepUp(steps)
		}),
		_stepUp: function(steps) {
			this._start() && (this._spin((steps || 1) * this.options.step), this._stop())
		},
		stepDown: spinner_modifier(function(steps) {
			this._stepDown(steps)
		}),
		_stepDown: function(steps) {
			this._start() && (this._spin((steps || 1) * -this.options.step), this._stop())
		},
		pageUp: spinner_modifier(function(pages) {
			this._stepUp((pages || 1) * this.options.page)
		}),
		pageDown: spinner_modifier(function(pages) {
			this._stepDown((pages || 1) * this.options.page)
		}),
		value: function(newVal) {
			return arguments.length ? void spinner_modifier(this._value).call(this, newVal) : this._parse(this.element.val())
		},
		widget: function() {
			return this.uiSpinner
		}
	}), $.widget("ui.tabs", {
		version: "1.11.1",
		delay: 300,
		options: {
			active: null,
			collapsible: !1,
			event: "click",
			heightStyle: "content",
			hide: null,
			show: null,
			activate: null,
			beforeActivate: null,
			beforeLoad: null,
			load: null
		},
		_isLocal: function() {
			var rhash = /#.*$/;
			return function(anchor) {
				var anchorUrl, locationUrl;
				anchor = anchor.cloneNode(!1), anchorUrl = anchor.href.replace(rhash, ""), locationUrl = location.href.replace(rhash, "");
				try {
					anchorUrl = decodeURIComponent(anchorUrl)
				} catch (error) {}
				try {
					locationUrl = decodeURIComponent(locationUrl)
				} catch (error) {}
				return anchor.hash.length > 1 && anchorUrl === locationUrl
			}
		}(),
		_create: function() {
			var that = this,
				options = this.options;
			this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", options.collapsible), this._processTabs(), options.active = this._initialActive(), $.isArray(options.disabled) && (options.disabled = $.unique(options.disabled.concat($.map(this.tabs.filter(".ui-state-disabled"), function(li) {
				return that.tabs.index(li)
			}))).sort()), this.options.active !== !1 && this.anchors.length ? this.active = this._findActive(options.active) : this.active = $(), this._refresh(), this.active.length && this.load(options.active)
		},
		_initialActive: function() {
			var active = this.options.active,
				collapsible = this.options.collapsible,
				locationHash = location.hash.substring(1);
			return null === active && (locationHash && this.tabs.each(function(i, tab) {
				if ($(tab).attr("aria-controls") === locationHash) return active = i, !1
			}), null === active && (active = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), null !== active && active !== -1 || (active = !! this.tabs.length && 0)), active !== !1 && (active = this.tabs.index(this.tabs.eq(active)), active === -1 && (active = !collapsible && 0)), !collapsible && active === !1 && this.anchors.length && (active = 0), active
		},
		_getCreateEventData: function() {
			return {
				tab: this.active,
				panel: this.active.length ? this._getPanelForTab(this.active) : $()
			}
		},
		_tabKeydown: function(event) {
			var focusedTab = $(this.document[0].activeElement).closest("li"),
				selectedIndex = this.tabs.index(focusedTab),
				goingForward = !0;
			if (!this._handlePageNav(event)) {
				switch (event.keyCode) {
				case $.ui.keyCode.RIGHT:
				case $.ui.keyCode.DOWN:
					selectedIndex++;
					break;
				case $.ui.keyCode.UP:
				case $.ui.keyCode.LEFT:
					goingForward = !1, selectedIndex--;
					break;
				case $.ui.keyCode.END:
					selectedIndex = this.anchors.length - 1;
					break;
				case $.ui.keyCode.HOME:
					selectedIndex = 0;
					break;
				case $.ui.keyCode.SPACE:
					return event.preventDefault(), clearTimeout(this.activating), void this._activate(selectedIndex);
				case $.ui.keyCode.ENTER:
					return event.preventDefault(), clearTimeout(this.activating), void this._activate(selectedIndex !== this.options.active && selectedIndex);
				default:
					return
				}
				event.preventDefault(), clearTimeout(this.activating), selectedIndex = this._focusNextTab(selectedIndex, goingForward), event.ctrlKey || (focusedTab.attr("aria-selected", "false"), this.tabs.eq(selectedIndex).attr("aria-selected", "true"), this.activating = this._delay(function() {
					this.option("active", selectedIndex)
				}, this.delay))
			}
		},
		_panelKeydown: function(event) {
			this._handlePageNav(event) || event.ctrlKey && event.keyCode === $.ui.keyCode.UP && (event.preventDefault(), this.active.focus())
		},
		_handlePageNav: function(event) {
			return event.altKey && event.keyCode === $.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : event.altKey && event.keyCode === $.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0
		},
		_findNextTab: function(index, goingForward) {
			function constrain() {
				return index > lastTabIndex && (index = 0), index < 0 && (index = lastTabIndex), index
			}
			for (var lastTabIndex = this.tabs.length - 1; $.inArray(constrain(), this.options.disabled) !== -1;) index = goingForward ? index + 1 : index - 1;
			return index
		},
		_focusNextTab: function(index, goingForward) {
			return index = this._findNextTab(index, goingForward), this.tabs.eq(index).focus(), index
		},
		_setOption: function(key, value) {
			return "active" === key ? void this._activate(value) : "disabled" === key ? void this._setupDisabled(value) : (this._super(key, value), "collapsible" === key && (this.element.toggleClass("ui-tabs-collapsible", value), value || this.options.active !== !1 || this._activate(0)), "event" === key && this._setupEvents(value), void("heightStyle" === key && this._setupHeightStyle(value)))
		},
		_sanitizeSelector: function(hash) {
			return hash ? hash.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
		},
		refresh: function() {
			var options = this.options,
				lis = this.tablist.children(":has(a[href])");
			options.disabled = $.map(lis.filter(".ui-state-disabled"), function(tab) {
				return lis.index(tab)
			}), this._processTabs(), options.active !== !1 && this.anchors.length ? this.active.length && !$.contains(this.tablist[0], this.active[0]) ? this.tabs.length === options.disabled.length ? (options.active = !1, this.active = $()) : this._activate(this._findNextTab(Math.max(0, options.active - 1), !1)) : options.active = this.tabs.index(this.active) : (options.active = !1, this.active = $()), this._refresh()
		},
		_refresh: function() {
			this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
				"aria-selected": "false",
				"aria-expanded": "false",
				tabIndex: -1
			}), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
				"aria-hidden": "true"
			}), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
				"aria-selected": "true",
				"aria-expanded": "true",
				tabIndex: 0
			}), this._getPanelForTab(this.active).show().attr({
				"aria-hidden": "false"
			})) : this.tabs.eq(0).attr("tabIndex", 0)
		},
		_processTabs: function() {
			var that = this;
			this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist").delegate("> li", "mousedown" + this.eventNamespace, function(event) {
				$(this).is(".ui-state-disabled") && event.preventDefault()
			}).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
				$(this).closest("li").is(".ui-state-disabled") && this.blur()
			}), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
				role: "tab",
				tabIndex: -1
			}), this.anchors = this.tabs.map(function() {
				return $("a", this)[0]
			}).addClass("ui-tabs-anchor").attr({
				role: "presentation",
				tabIndex: -1
			}), this.panels = $(), this.anchors.each(function(i, anchor) {
				var selector, panel, panelId, anchorId = $(anchor).uniqueId().attr("id"),
					tab = $(anchor).closest("li"),
					originalAriaControls = tab.attr("aria-controls");
				that._isLocal(anchor) ? (selector = anchor.hash, panelId = selector.substring(1), panel = that.element.find(that._sanitizeSelector(selector))) : (panelId = tab.attr("aria-controls") || $({}).uniqueId()[0].id, selector = "#" + panelId, panel = that.element.find(selector), panel.length || (panel = that._createPanel(panelId), panel.insertAfter(that.panels[i - 1] || that.tablist)), panel.attr("aria-live", "polite")), panel.length && (that.panels = that.panels.add(panel)), originalAriaControls && tab.data("ui-tabs-aria-controls", originalAriaControls), tab.attr({
					"aria-controls": panelId,
					"aria-labelledby": anchorId
				}), panel.attr("aria-labelledby", anchorId)
			}), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel")
		},
		_getList: function() {
			return this.tablist || this.element.find("ol,ul").eq(0)
		},
		_createPanel: function(id) {
			return $("<div>").attr("id", id).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
		},
		_setupDisabled: function(disabled) {
			$.isArray(disabled) && (disabled.length ? disabled.length === this.anchors.length && (disabled = !0) : disabled = !1);
			for (var li, i = 0; li = this.tabs[i]; i++) disabled === !0 || $.inArray(i, disabled) !== -1 ? $(li).addClass("ui-state-disabled").attr("aria-disabled", "true") : $(li).removeClass("ui-state-disabled").removeAttr("aria-disabled");
			this.options.disabled = disabled
		},
		_setupEvents: function(event) {
			var events = {};
			event && $.each(event.split(" "), function(index, eventName) {
				events[eventName] = "_eventHandler"
			}), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(!0, this.anchors, {
				click: function(event) {
					event.preventDefault()
				}
			}), this._on(this.anchors, events), this._on(this.tabs, {
				keydown: "_tabKeydown"
			}), this._on(this.panels, {
				keydown: "_panelKeydown"
			}), this._focusable(this.tabs), this._hoverable(this.tabs)
		},
		_setupHeightStyle: function(heightStyle) {
			var maxHeight, parent = this.element.parent();
			"fill" === heightStyle ? (maxHeight = parent.height(), maxHeight -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() {
				var elem = $(this),
					position = elem.css("position");
				"absolute" !== position && "fixed" !== position && (maxHeight -= elem.outerHeight(!0))
			}), this.element.children().not(this.panels).each(function() {
				maxHeight -= $(this).outerHeight(!0)
			}), this.panels.each(function() {
				$(this).height(Math.max(0, maxHeight - $(this).innerHeight() + $(this).height()))
			}).css("overflow", "auto")) : "auto" === heightStyle && (maxHeight = 0, this.panels.each(function() {
				maxHeight = Math.max(maxHeight, $(this).height("").height())
			}).height(maxHeight))
		},
		_eventHandler: function(event) {
			var options = this.options,
				active = this.active,
				anchor = $(event.currentTarget),
				tab = anchor.closest("li"),
				clickedIsActive = tab[0] === active[0],
				collapsing = clickedIsActive && options.collapsible,
				toShow = collapsing ? $() : this._getPanelForTab(tab),
				toHide = active.length ? this._getPanelForTab(active) : $(),
				eventData = {
					oldTab: active,
					oldPanel: toHide,
					newTab: collapsing ? $() : tab,
					newPanel: toShow
				};
			event.preventDefault(), tab.hasClass("ui-state-disabled") || tab.hasClass("ui-tabs-loading") || this.running || clickedIsActive && !options.collapsible || this._trigger("beforeActivate", event, eventData) === !1 || (options.active = !collapsing && this.tabs.index(tab), this.active = clickedIsActive ? $() : tab, this.xhr && this.xhr.abort(), toHide.length || toShow.length || $.error("jQuery UI Tabs: Mismatching fragment identifier."), toShow.length && this.load(this.tabs.index(tab), event), this._toggle(event, eventData))
		},
		_toggle: function(event, eventData) {
			function complete() {
				that.running = !1, that._trigger("activate", event, eventData)
			}
			function show() {
				eventData.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), toShow.length && that.options.show ? that._show(toShow, that.options.show, complete) : (toShow.show(), complete())
			}
			var that = this,
				toShow = eventData.newPanel,
				toHide = eventData.oldPanel;
			this.running = !0, toHide.length && this.options.hide ? this._hide(toHide, this.options.hide, function() {
				eventData.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), show()
			}) : (eventData.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), toHide.hide(), show()), toHide.attr("aria-hidden", "true"), eventData.oldTab.attr({
				"aria-selected": "false",
				"aria-expanded": "false"
			}), toShow.length && toHide.length ? eventData.oldTab.attr("tabIndex", -1) : toShow.length && this.tabs.filter(function() {
				return 0 === $(this).attr("tabIndex")
			}).attr("tabIndex", -1), toShow.attr("aria-hidden", "false"), eventData.newTab.attr({
				"aria-selected": "true",
				"aria-expanded": "true",
				tabIndex: 0
			})
		},
		_activate: function(index) {
			var anchor, active = this._findActive(index);
			active[0] !== this.active[0] && (active.length || (active = this.active), anchor = active.find(".ui-tabs-anchor")[0], this._eventHandler({
				target: anchor,
				currentTarget: anchor,
				preventDefault: $.noop
			}))
		},
		_findActive: function(index) {
			return index === !1 ? $() : this.tabs.eq(index)
		},
		_getIndex: function(index) {
			return "string" == typeof index && (index = this.anchors.index(this.anchors.filter("[href$='" + index + "']"))), index
		},
		_destroy: function() {
			this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), this.tablist.unbind(this.eventNamespace), this.tabs.add(this.panels).each(function() {
				$.data(this, "ui-tabs-destroy") ? $(this).remove() : $(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
			}), this.tabs.each(function() {
				var li = $(this),
					prev = li.data("ui-tabs-aria-controls");
				prev ? li.attr("aria-controls", prev).removeData("ui-tabs-aria-controls") : li.removeAttr("aria-controls")
			}), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
		},
		enable: function(index) {
			var disabled = this.options.disabled;
			disabled !== !1 && (void 0 === index ? disabled = !1 : (index = this._getIndex(index), disabled = $.isArray(disabled) ? $.map(disabled, function(num) {
				return num !== index ? num : null
			}) : $.map(this.tabs, function(li, num) {
				return num !== index ? num : null
			})), this._setupDisabled(disabled))
		},
		disable: function(index) {
			var disabled = this.options.disabled;
			if (disabled !== !0) {
				if (void 0 === index) disabled = !0;
				else {
					if (index = this._getIndex(index), $.inArray(index, disabled) !== -1) return;
					disabled = $.isArray(disabled) ? $.merge([index], disabled).sort() : [index]
				}
				this._setupDisabled(disabled)
			}
		},
		load: function(index, event) {
			index = this._getIndex(index);
			var that = this,
				tab = this.tabs.eq(index),
				anchor = tab.find(".ui-tabs-anchor"),
				panel = this._getPanelForTab(tab),
				eventData = {
					tab: tab,
					panel: panel
				};
			this._isLocal(anchor[0]) || (this.xhr = $.ajax(this._ajaxSettings(anchor, event, eventData)), this.xhr && "canceled" !== this.xhr.statusText && (tab.addClass("ui-tabs-loading"), panel.attr("aria-busy", "true"), this.xhr.success(function(response) {
				setTimeout(function() {
					panel.html(response), that._trigger("load", event, eventData)
				}, 1)
			}).complete(function(jqXHR, status) {
				setTimeout(function() {
					"abort" === status && that.panels.stop(!1, !0), tab.removeClass("ui-tabs-loading"), panel.removeAttr("aria-busy"), jqXHR === that.xhr && delete that.xhr
				}, 1)
			})))
		},
		_ajaxSettings: function(anchor, event, eventData) {
			var that = this;
			return {
				url: anchor.attr("href"),
				beforeSend: function(jqXHR, settings) {
					return that._trigger("beforeLoad", event, $.extend({
						jqXHR: jqXHR,
						ajaxSettings: settings
					}, eventData))
				}
			}
		},
		_getPanelForTab: function(tab) {
			var id = $(tab).attr("aria-controls");
			return this.element.find(this._sanitizeSelector("#" + id))
		}
	}), $.widget("ui.tooltip", {
		version: "1.11.1",
		options: {
			content: function() {
				var title = $(this).attr("title") || "";
				return $("<a>").text(title).html()
			},
			hide: !0,
			items: "[title]:not([disabled])",
			position: {
				my: "left top+15",
				at: "left bottom",
				collision: "flipfit flip"
			},
			show: !0,
			tooltipClass: null,
			track: !1,
			close: null,
			open: null
		},
		_addDescribedBy: function(elem, id) {
			var describedby = (elem.attr("aria-describedby") || "").split(/\s+/);
			describedby.push(id), elem.data("ui-tooltip-id", id).attr("aria-describedby", $.trim(describedby.join(" ")))
		},
		_removeDescribedBy: function(elem) {
			var id = elem.data("ui-tooltip-id"),
				describedby = (elem.attr("aria-describedby") || "").split(/\s+/),
				index = $.inArray(id, describedby);
			index !== -1 && describedby.splice(index, 1), elem.removeData("ui-tooltip-id"), describedby = $.trim(describedby.join(" ")), describedby ? elem.attr("aria-describedby", describedby) : elem.removeAttr("aria-describedby")
		},
		_create: function() {
			this._on({
				mouseover: "open",
				focusin: "open"
			}), this.tooltips = {}, this.parents = {}, this.options.disabled && this._disable(), this.liveRegion = $("<div>").attr({
				role: "log",
				"aria-live": "assertive",
				"aria-relevant": "additions"
			}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body)
		},
		_setOption: function(key, value) {
			var that = this;
			return "disabled" === key ? (this[value ? "_disable" : "_enable"](), void(this.options[key] = value)) : (this._super(key, value), void("content" === key && $.each(this.tooltips, function(id, element) {
				that._updateContent(element)
			})))
		},
		_disable: function() {
			var that = this;
			$.each(this.tooltips, function(id, element) {
				var event = $.Event("blur");
				event.target = event.currentTarget = element[0], that.close(event, !0)
			}), this.element.find(this.options.items).addBack().each(function() {
				var element = $(this);
				element.is("[title]") && element.data("ui-tooltip-title", element.attr("title")).removeAttr("title")
			})
		},
		_enable: function() {
			this.element.find(this.options.items).addBack().each(function() {
				var element = $(this);
				element.data("ui-tooltip-title") && element.attr("title", element.data("ui-tooltip-title"))
			})
		},
		open: function(event) {
			var that = this,
				target = $(event ? event.target : this.element).closest(this.options.items);
			target.length && !target.data("ui-tooltip-id") && (target.attr("title") && target.data("ui-tooltip-title", target.attr("title")), target.data("ui-tooltip-open", !0), event && "mouseover" === event.type && target.parents().each(function() {
				var blurEvent, parent = $(this);
				parent.data("ui-tooltip-open") && (blurEvent = $.Event("blur"), blurEvent.target = blurEvent.currentTarget = this, that.close(blurEvent, !0)), parent.attr("title") && (parent.uniqueId(), that.parents[this.id] = {
					element: this,
					title: parent.attr("title")
				}, parent.attr("title", ""))
			}), this._updateContent(target, event))
		},
		_updateContent: function(target, event) {
			var content, contentOption = this.options.content,
				that = this,
				eventType = event ? event.type : null;
			return "string" == typeof contentOption ? this._open(event, target, contentOption) : (content = contentOption.call(target[0], function(response) {
				target.data("ui-tooltip-open") && that._delay(function() {
					event && (event.type = eventType), this._open(event, target, response)
				})
			}), void(content && this._open(event, target, content)))
		},
		_open: function(event, target, content) {
			function position(event) {
				positionOption.of = event, tooltip.is(":hidden") || tooltip.position(positionOption)
			}
			var tooltip, events, delayedShow, a11yContent, positionOption = $.extend({}, this.options.position);
			if (content) {
				if (tooltip = this._find(target), tooltip.length) return void tooltip.find(".ui-tooltip-content").html(content);
				target.is("[title]") && (event && "mouseover" === event.type ? target.attr("title", "") : target.removeAttr("title")), tooltip = this._tooltip(target), this._addDescribedBy(target, tooltip.attr("id")), tooltip.find(".ui-tooltip-content").html(content), this.liveRegion.children().hide(), content.clone ? (a11yContent = content.clone(), a11yContent.removeAttr("id").find("[id]").removeAttr("id")) : a11yContent = content, $("<div>").html(a11yContent).appendTo(this.liveRegion), this.options.track && event && /^mouse/.test(event.type) ? (this._on(this.document, {
					mousemove: position
				}), position(event)) : tooltip.position($.extend({
					of: target
				}, this.options.position)), this.hiding = !1, this.closing = !1, tooltip.hide(), this._show(tooltip, this.options.show), this.options.show && this.options.show.delay && (delayedShow = this.delayedShow = setInterval(function() {
					tooltip.is(":visible") && (position(positionOption.of), clearInterval(delayedShow))
				}, $.fx.interval)), this._trigger("open", event, {
					tooltip: tooltip
				}), events = {
					keyup: function(event) {
						if (event.keyCode === $.ui.keyCode.ESCAPE) {
							var fakeEvent = $.Event(event);
							fakeEvent.currentTarget = target[0], this.close(fakeEvent, !0)
						}
					}
				}, target[0] !== this.element[0] && (events.remove = function() {
					this._removeTooltip(tooltip)
				}), event && "mouseover" !== event.type || (events.mouseleave = "close"), event && "focusin" !== event.type || (events.focusout = "close"), this._on(!0, target, events)
			}
		},
		close: function(event) {
			var that = this,
				target = $(event ? event.currentTarget : this.element),
				tooltip = this._find(target);
			this.closing || (clearInterval(this.delayedShow), target.data("ui-tooltip-title") && !target.attr("title") && target.attr("title", target.data("ui-tooltip-title")), this._removeDescribedBy(target), this.hiding = !0, tooltip.stop(!0), this._hide(tooltip, this.options.hide, function() {
				that._removeTooltip($(this)), this.hiding = !1, this.closing = !1
			}), target.removeData("ui-tooltip-open"), this._off(target, "mouseleave focusout keyup"), target[0] !== this.element[0] && this._off(target, "remove"), this._off(this.document, "mousemove"), event && "mouseleave" === event.type && $.each(this.parents, function(id, parent) {
				$(parent.element).attr("title", parent.title), delete that.parents[id]
			}), this.closing = !0, this._trigger("close", event, {
				tooltip: tooltip
			}), this.hiding || (this.closing = !1))
		},
		_tooltip: function(element) {
			var tooltip = $("<div>").attr("role", "tooltip").addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || "")),
				id = tooltip.uniqueId().attr("id");
			return $("<div>").addClass("ui-tooltip-content").appendTo(tooltip), tooltip.appendTo(this.document[0].body), this.tooltips[id] = element, tooltip
		},
		_find: function(target) {
			var id = target.data("ui-tooltip-id");
			return id ? $("#" + id) : $()
		},
		_removeTooltip: function(tooltip) {
			tooltip.remove(), delete this.tooltips[tooltip.attr("id")]
		},
		_destroy: function() {
			var that = this;
			$.each(this.tooltips, function(id, element) {
				var event = $.Event("blur");
				event.target = event.currentTarget = element[0], that.close(event, !0), $("#" + id).remove(), element.data("ui-tooltip-title") && (element.attr("title") || element.attr("title", element.data("ui-tooltip-title")), element.removeData("ui-tooltip-title"))
			}), this.liveRegion.remove()
		}
	})
});
!
function($) {
	function simulateMouseEvent(event, simulatedType) {
		if (!(event.originalEvent.touches.length > 1)) {
			event.preventDefault();
			var touch = event.originalEvent.changedTouches[0],
				simulatedEvent = document.createEvent("MouseEvents");
			simulatedEvent.initMouseEvent(simulatedType, !0, !0, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, !1, !1, !1, !1, 0, null), event.target.dispatchEvent(simulatedEvent)
		}
	}
	if ($.support.touch = "ontouchend" in document, $.support.touch) {
		var touchHandled, mouseProto = $.ui.mouse.prototype,
			_mouseInit = mouseProto._mouseInit,
			_mouseDestroy = mouseProto._mouseDestroy;
		mouseProto._touchStart = function(event) {
			var self = this;
			!touchHandled && self._mouseCapture(event.originalEvent.changedTouches[0]) && (touchHandled = !0, self._touchMoved = !1, simulateMouseEvent(event, "mouseover"), simulateMouseEvent(event, "mousemove"), simulateMouseEvent(event, "mousedown"))
		}, mouseProto._touchMove = function(event) {
			touchHandled && (this._touchMoved = !0, simulateMouseEvent(event, "mousemove"))
		}, mouseProto._touchEnd = function(event) {
			touchHandled && (simulateMouseEvent(event, "mouseup"), simulateMouseEvent(event, "mouseout"), this._touchMoved || simulateMouseEvent(event, "click"), touchHandled = !1)
		}, mouseProto._mouseInit = function() {
			var self = this;
			self.element.bind({
				touchstart: $.proxy(self, "_touchStart"),
				touchmove: $.proxy(self, "_touchMove"),
				touchend: $.proxy(self, "_touchEnd")
			}), _mouseInit.call(self)
		}, mouseProto._mouseDestroy = function() {
			var self = this;
			self.element.unbind({
				touchstart: $.proxy(self, "_touchStart"),
				touchmove: $.proxy(self, "_touchMove"),
				touchend: $.proxy(self, "_touchEnd")
			}), _mouseDestroy.call(self)
		}
	}
}(jQuery);
(function() {
	function addMapEntry(map, pair) {
		return map.set(pair[0], pair[1]), map
	}
	function addSetEntry(set, value) {
		return set.add(value), set
	}
	function apply(func, thisArg, args) {
		var length = args.length;
		switch (length) {
		case 0:
			return func.call(thisArg);
		case 1:
			return func.call(thisArg, args[0]);
		case 2:
			return func.call(thisArg, args[0], args[1]);
		case 3:
			return func.call(thisArg, args[0], args[1], args[2])
		}
		return func.apply(thisArg, args)
	}
	function arrayAggregator(array, setter, iteratee, accumulator) {
		for (var index = -1, length = array.length; ++index < length;) {
			var value = array[index];
			setter(accumulator, value, iteratee(value), array)
		}
		return accumulator
	}
	function arrayConcat(array, other) {
		for (var index = -1, length = array.length, othIndex = -1, othLength = other.length, result = Array(length + othLength); ++index < length;) result[index] = array[index];
		for (; ++othIndex < othLength;) result[index++] = other[othIndex];
		return result
	}
	function arrayEach(array, iteratee) {
		for (var index = -1, length = array.length; ++index < length && iteratee(array[index], index, array) !== !1;);
		return array
	}
	function arrayEachRight(array, iteratee) {
		for (var length = array.length; length-- && iteratee(array[length], length, array) !== !1;);
		return array
	}
	function arrayEvery(array, predicate) {
		for (var index = -1, length = array.length; ++index < length;) if (!predicate(array[index], index, array)) return !1;
		return !0
	}
	function arrayFilter(array, predicate) {
		for (var index = -1, length = array.length, resIndex = 0, result = []; ++index < length;) {
			var value = array[index];
			predicate(value, index, array) && (result[resIndex++] = value)
		}
		return result
	}
	function arrayIncludes(array, value) {
		return !!array.length && baseIndexOf(array, value, 0) > -1
	}
	function arrayIncludesWith(array, value, comparator) {
		for (var index = -1, length = array.length; ++index < length;) if (comparator(value, array[index])) return !0;
		return !1
	}
	function arrayMap(array, iteratee) {
		for (var index = -1, length = array.length, result = Array(length); ++index < length;) result[index] = iteratee(array[index], index, array);
		return result
	}
	function arrayPush(array, values) {
		for (var index = -1, length = values.length, offset = array.length; ++index < length;) array[offset + index] = values[index];
		return array
	}
	function arrayReduce(array, iteratee, accumulator, initAccum) {
		var index = -1,
			length = array.length;
		for (initAccum && length && (accumulator = array[++index]); ++index < length;) accumulator = iteratee(accumulator, array[index], index, array);
		return accumulator
	}
	function arrayReduceRight(array, iteratee, accumulator, initAccum) {
		var length = array.length;
		for (initAccum && length && (accumulator = array[--length]); length--;) accumulator = iteratee(accumulator, array[length], length, array);
		return accumulator
	}
	function arraySome(array, predicate) {
		for (var index = -1, length = array.length; ++index < length;) if (predicate(array[index], index, array)) return !0;
		return !1
	}
	function baseExtremum(array, iteratee, comparator) {
		for (var index = -1, length = array.length; ++index < length;) {
			var value = array[index],
				current = iteratee(value);
			if (null != current && (computed === undefined ? current === current : comparator(current, computed))) var computed = current,
				result = value
		}
		return result
	}
	function baseFind(collection, predicate, eachFunc, retKey) {
		var result;
		return eachFunc(collection, function(value, key, collection) {
			if (predicate(value, key, collection)) return result = retKey ? key : value, !1
		}), result
	}
	function baseFindIndex(array, predicate, fromRight) {
		for (var length = array.length, index = fromRight ? length : -1; fromRight ? index-- : ++index < length;) if (predicate(array[index], index, array)) return index;
		return -1
	}
	function baseIndexOf(array, value, fromIndex) {
		if (value !== value) return indexOfNaN(array, fromIndex);
		for (var index = fromIndex - 1, length = array.length; ++index < length;) if (array[index] === value) return index;
		return -1
	}
	function baseIndexOfWith(array, value, fromIndex, comparator) {
		for (var index = fromIndex - 1, length = array.length; ++index < length;) if (comparator(array[index], value)) return index;
		return -1
	}
	function baseMean(array, iteratee) {
		var length = array ? array.length : 0;
		return length ? baseSum(array, iteratee) / length : NAN
	}
	function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
		return eachFunc(collection, function(value, index, collection) {
			accumulator = initAccum ? (initAccum = !1, value) : iteratee(accumulator, value, index, collection)
		}), accumulator
	}
	function baseSortBy(array, comparer) {
		var length = array.length;
		for (array.sort(comparer); length--;) array[length] = array[length].value;
		return array
	}
	function baseSum(array, iteratee) {
		for (var result, index = -1, length = array.length; ++index < length;) {
			var current = iteratee(array[index]);
			current !== undefined && (result = result === undefined ? current : result + current)
		}
		return result
	}
	function baseTimes(n, iteratee) {
		for (var index = -1, result = Array(n); ++index < n;) result[index] = iteratee(index);
		return result
	}
	function baseToPairs(object, props) {
		return arrayMap(props, function(key) {
			return [key, object[key]]
		})
	}
	function baseUnary(func) {
		return function(value) {
			return func(value)
		}
	}
	function baseValues(object, props) {
		return arrayMap(props, function(key) {
			return object[key]
		})
	}
	function charsStartIndex(strSymbols, chrSymbols) {
		for (var index = -1, length = strSymbols.length; ++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1;);
		return index
	}
	function charsEndIndex(strSymbols, chrSymbols) {
		for (var index = strSymbols.length; index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1;);
		return index
	}
	function checkGlobal(value) {
		return value && value.Object === Object ? value : null
	}
	function compareAscending(value, other) {
		if (value !== other) {
			var valIsNull = null === value,
				valIsUndef = value === undefined,
				valIsReflexive = value === value,
				othIsNull = null === other,
				othIsUndef = other === undefined,
				othIsReflexive = other === other;
			if (value > other && !othIsNull || !valIsReflexive || valIsNull && !othIsUndef && othIsReflexive || valIsUndef && othIsReflexive) return 1;
			if (value < other && !valIsNull || !othIsReflexive || othIsNull && !valIsUndef && valIsReflexive || othIsUndef && valIsReflexive) return -1
		}
		return 0
	}
	function compareMultiple(object, other, orders) {
		for (var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length; ++index < length;) {
			var result = compareAscending(objCriteria[index], othCriteria[index]);
			if (result) {
				if (index >= ordersLength) return result;
				var order = orders[index];
				return result * ("desc" == order ? -1 : 1)
			}
		}
		return object.index - other.index
	}
	function countHolders(array, placeholder) {
		for (var length = array.length, result = 0; length--;) array[length] === placeholder && result++;
		return result
	}
	function createMathOperation(operator) {
		return function(value, other) {
			var result;
			return value === undefined && other === undefined ? 0 : (value !== undefined && (result = value), other !== undefined && (result = result === undefined ? other : operator(result, other)), result)
		}
	}
	function deburrLetter(letter) {
		return deburredLetters[letter]
	}
	function escapeHtmlChar(chr) {
		return htmlEscapes[chr]
	}
	function escapeStringChar(chr) {
		return "\\" + stringEscapes[chr]
	}
	function indexOfNaN(array, fromIndex, fromRight) {
		for (var length = array.length, index = fromIndex + (fromRight ? 0 : -1); fromRight ? index-- : ++index < length;) {
			var other = array[index];
			if (other !== other) return index
		}
		return -1
	}
	function isHostObject(value) {
		var result = !1;
		if (null != value && "function" != typeof value.toString) try {
			result = !! (value + "")
		} catch (e) {}
		return result
	}
	function isIndex(value, length) {
		return value = "number" == typeof value || reIsUint.test(value) ? +value : -1, length = null == length ? MAX_SAFE_INTEGER : length, value > -1 && value % 1 == 0 && value < length
	}
	function iteratorToArray(iterator) {
		for (var data, result = []; !(data = iterator.next()).done;) result.push(data.value);
		return result
	}
	function mapToArray(map) {
		var index = -1,
			result = Array(map.size);
		return map.forEach(function(value, key) {
			result[++index] = [key, value]
		}), result
	}
	function replaceHolders(array, placeholder) {
		for (var index = -1, length = array.length, resIndex = 0, result = []; ++index < length;) {
			var value = array[index];
			value !== placeholder && value !== PLACEHOLDER || (array[index] = PLACEHOLDER, result[resIndex++] = index)
		}
		return result
	}
	function setToArray(set) {
		var index = -1,
			result = Array(set.size);
		return set.forEach(function(value) {
			result[++index] = value
		}), result
	}
	function stringSize(string) {
		if (!string || !reHasComplexSymbol.test(string)) return string.length;
		for (var result = reComplexSymbol.lastIndex = 0; reComplexSymbol.test(string);) result++;
		return result
	}
	function stringToArray(string) {
		return string.match(reComplexSymbol)
	}
	function unescapeHtmlChar(chr) {
		return htmlUnescapes[chr]
	}
	function runInContext(context) {
		function lodash(value) {
			if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
				if (value instanceof LodashWrapper) return value;
				if (hasOwnProperty.call(value, "__wrapped__")) return wrapperClone(value)
			}
			return new LodashWrapper(value)
		}
		function baseLodash() {}
		function LodashWrapper(value, chainAll) {
			this.__wrapped__ = value, this.__actions__ = [], this.__chain__ = !! chainAll, this.__index__ = 0, this.__values__ = undefined
		}
		function LazyWrapper(value) {
			this.__wrapped__ = value, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = MAX_ARRAY_LENGTH, this.__views__ = []
		}
		function lazyClone() {
			var result = new LazyWrapper(this.__wrapped__);
			return result.__actions__ = copyArray(this.__actions__), result.__dir__ = this.__dir__, result.__filtered__ = this.__filtered__, result.__iteratees__ = copyArray(this.__iteratees__), result.__takeCount__ = this.__takeCount__, result.__views__ = copyArray(this.__views__), result
		}
		function lazyReverse() {
			if (this.__filtered__) {
				var result = new LazyWrapper(this);
				result.__dir__ = -1, result.__filtered__ = !0
			} else result = this.clone(), result.__dir__ *= -1;
			return result
		}
		function lazyValue() {
			var array = this.__wrapped__.value(),
				dir = this.__dir__,
				isArr = isArray(array),
				isRight = dir < 0,
				arrLength = isArr ? array.length : 0,
				view = getView(0, arrLength, this.__views__),
				start = view.start,
				end = view.end,
				length = end - start,
				index = isRight ? end : start - 1,
				iteratees = this.__iteratees__,
				iterLength = iteratees.length,
				resIndex = 0,
				takeCount = nativeMin(length, this.__takeCount__);
			if (!isArr || arrLength < LARGE_ARRAY_SIZE || arrLength == length && takeCount == length) return baseWrapperValue(array, this.__actions__);
			var result = [];
			outer: for (; length-- && resIndex < takeCount;) {
				index += dir;
				for (var iterIndex = -1, value = array[index]; ++iterIndex < iterLength;) {
					var data = iteratees[iterIndex],
						iteratee = data.iteratee,
						type = data.type,
						computed = iteratee(value);
					if (type == LAZY_MAP_FLAG) value = computed;
					else if (!computed) {
						if (type == LAZY_FILTER_FLAG) continue outer;
						break outer
					}
				}
				result[resIndex++] = value
			}
			return result
		}
		function Hash() {}
		function hashDelete(hash, key) {
			return hashHas(hash, key) && delete hash[key]
		}
		function hashGet(hash, key) {
			if (nativeCreate) {
				var result = hash[key];
				return result === HASH_UNDEFINED ? undefined : result
			}
			return hasOwnProperty.call(hash, key) ? hash[key] : undefined
		}
		function hashHas(hash, key) {
			return nativeCreate ? hash[key] !== undefined : hasOwnProperty.call(hash, key)
		}
		function hashSet(hash, key, value) {
			hash[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value
		}
		function MapCache(values) {
			var index = -1,
				length = values ? values.length : 0;
			for (this.clear(); ++index < length;) {
				var entry = values[index];
				this.set(entry[0], entry[1])
			}
		}
		function mapClear() {
			this.__data__ = {
				hash: new Hash,
				map: Map ? new Map : [],
				string: new Hash
			}
		}
		function mapDelete(key) {
			var data = this.__data__;
			return isKeyable(key) ? hashDelete("string" == typeof key ? data.string : data.hash, key) : Map ? data.map.delete(key) : assocDelete(data.map, key)
		}
		function mapGet(key) {
			var data = this.__data__;
			return isKeyable(key) ? hashGet("string" == typeof key ? data.string : data.hash, key) : Map ? data.map.get(key) : assocGet(data.map, key)
		}
		function mapHas(key) {
			var data = this.__data__;
			return isKeyable(key) ? hashHas("string" == typeof key ? data.string : data.hash, key) : Map ? data.map.has(key) : assocHas(data.map, key)
		}
		function mapSet(key, value) {
			var data = this.__data__;
			return isKeyable(key) ? hashSet("string" == typeof key ? data.string : data.hash, key, value) : Map ? data.map.set(key, value) : assocSet(data.map, key, value), this
		}
		function SetCache(values) {
			var index = -1,
				length = values ? values.length : 0;
			for (this.__data__ = new MapCache; ++index < length;) this.push(values[index])
		}
		function cacheHas(cache, value) {
			var map = cache.__data__;
			if (isKeyable(value)) {
				var data = map.__data__,
					hash = "string" == typeof value ? data.string : data.hash;
				return hash[value] === HASH_UNDEFINED
			}
			return map.has(value)
		}
		function cachePush(value) {
			var map = this.__data__;
			if (isKeyable(value)) {
				var data = map.__data__,
					hash = "string" == typeof value ? data.string : data.hash;
				hash[value] = HASH_UNDEFINED
			} else map.set(value, HASH_UNDEFINED)
		}
		function Stack(values) {
			var index = -1,
				length = values ? values.length : 0;
			for (this.clear(); ++index < length;) {
				var entry = values[index];
				this.set(entry[0], entry[1])
			}
		}
		function stackClear() {
			this.__data__ = {
				array: [],
				map: null
			}
		}
		function stackDelete(key) {
			var data = this.__data__,
				array = data.array;
			return array ? assocDelete(array, key) : data.map.delete(key)
		}
		function stackGet(key) {
			var data = this.__data__,
				array = data.array;
			return array ? assocGet(array, key) : data.map.get(key)
		}
		function stackHas(key) {
			var data = this.__data__,
				array = data.array;
			return array ? assocHas(array, key) : data.map.has(key)
		}
		function stackSet(key, value) {
			var data = this.__data__,
				array = data.array;
			array && (array.length < LARGE_ARRAY_SIZE - 1 ? assocSet(array, key, value) : (data.array = null, data.map = new MapCache(array)));
			var map = data.map;
			return map && map.set(key, value), this
		}
		function assocDelete(array, key) {
			var index = assocIndexOf(array, key);
			if (index < 0) return !1;
			var lastIndex = array.length - 1;
			return index == lastIndex ? array.pop() : splice.call(array, index, 1), !0
		}
		function assocGet(array, key) {
			var index = assocIndexOf(array, key);
			return index < 0 ? undefined : array[index][1]
		}
		function assocHas(array, key) {
			return assocIndexOf(array, key) > -1
		}
		function assocIndexOf(array, key) {
			for (var length = array.length; length--;) if (eq(array[length][0], key)) return length;
			return -1
		}
		function assocSet(array, key, value) {
			var index = assocIndexOf(array, key);
			index < 0 ? array.push([key, value]) : array[index][1] = value
		}
		function assignInDefaults(objValue, srcValue, key, object) {
			return objValue === undefined || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key) ? srcValue : objValue
		}
		function assignMergeValue(object, key, value) {
			(value === undefined || eq(object[key], value)) && ("number" != typeof key || value !== undefined || key in object) || (object[key] = value)
		}
		function assignValue(object, key, value) {
			var objValue = object[key];
			hasOwnProperty.call(object, key) && eq(objValue, value) && (value !== undefined || key in object) || (object[key] = value)
		}
		function baseAggregator(collection, setter, iteratee, accumulator) {
			return baseEach(collection, function(value, key, collection) {
				setter(accumulator, value, iteratee(value), collection)
			}), accumulator
		}
		function baseAssign(object, source) {
			return object && copyObject(source, keys(source), object)
		}
		function baseAt(object, paths) {
			for (var index = -1, isNil = null == object, length = paths.length, result = Array(length); ++index < length;) result[index] = isNil ? undefined : get(object, paths[index]);
			return result
		}
		function baseCastArrayLikeObject(value) {
			return isArrayLikeObject(value) ? value : []
		}
		function baseCastFunction(value) {
			return "function" == typeof value ? value : identity
		}
		function baseCastKey(key) {
			return "string" == typeof key || isSymbol(key) ? key : key + ""
		}
		function baseCastPath(value) {
			return isArray(value) ? value : stringToPath(value)
		}
		function baseClamp(number, lower, upper) {
			return number === number && (upper !== undefined && (number = number <= upper ? number : upper), lower !== undefined && (number = number >= lower ? number : lower)), number
		}
		function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
			var result;
			if (customizer && (result = object ? customizer(value, key, object, stack) : customizer(value)), result !== undefined) return result;
			if (!isObject(value)) return value;
			var isArr = isArray(value);
			if (isArr) {
				if (result = initCloneArray(value), !isDeep) return copyArray(value, result)
			} else {
				var tag = getTag(value),
					isFunc = tag == funcTag || tag == genTag;
				if (isBuffer(value)) return cloneBuffer(value, isDeep);
				if (tag == objectTag || tag == argsTag || isFunc && !object) {
					if (isHostObject(value)) return object ? value : {};
					if (result = initCloneObject(isFunc ? {} : value), !isDeep) return copySymbols(value, baseAssign(result, value))
				} else {
					if (!cloneableTags[tag]) return object ? value : {};
					result = initCloneByTag(value, tag, baseClone, isDeep)
				}
			}
			stack || (stack = new Stack);
			var stacked = stack.get(value);
			if (stacked) return stacked;
			if (stack.set(value, result), !isArr) var props = isFull ? getAllKeys(value) : keys(value);
			return arrayEach(props || value, function(subValue, key) {
				props && (key = subValue, subValue = value[key]), assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack))
			}), result
		}
		function baseConforms(source) {
			var props = keys(source),
				length = props.length;
			return function(object) {
				if (null == object) return !length;
				for (var index = length; index--;) {
					var key = props[index],
						predicate = source[key],
						value = object[key];
					if (value === undefined && !(key in Object(object)) || !predicate(value)) return !1
				}
				return !0
			}
		}
		function baseCreate(proto) {
			return isObject(proto) ? objectCreate(proto) : {}
		}
		function baseDelay(func, wait, args) {
			if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
			return setTimeout(function() {
				func.apply(undefined, args)
			}, wait)
		}
		function baseDifference(array, values, iteratee, comparator) {
			var index = -1,
				includes = arrayIncludes,
				isCommon = !0,
				length = array.length,
				result = [],
				valuesLength = values.length;
			if (!length) return result;
			iteratee && (values = arrayMap(values, baseUnary(iteratee))), comparator ? (includes = arrayIncludesWith, isCommon = !1) : values.length >= LARGE_ARRAY_SIZE && (includes = cacheHas, isCommon = !1, values = new SetCache(values));
			outer: for (; ++index < length;) {
				var value = array[index],
					computed = iteratee ? iteratee(value) : value;
				if (isCommon && computed === computed) {
					for (var valuesIndex = valuesLength; valuesIndex--;) if (values[valuesIndex] === computed) continue outer;
					result.push(value)
				} else includes(values, computed, comparator) || result.push(value)
			}
			return result
		}
		function baseEvery(collection, predicate) {
			var result = !0;
			return baseEach(collection, function(value, index, collection) {
				return result = !! predicate(value, index, collection)
			}), result
		}
		function baseFill(array, value, start, end) {
			var length = array.length;
			for (start = toInteger(start), start < 0 && (start = -start > length ? 0 : length + start), end = end === undefined || end > length ? length : toInteger(end), end < 0 && (end += length), end = start > end ? 0 : toLength(end); start < end;) array[start++] = value;
			return array
		}
		function baseFilter(collection, predicate) {
			var result = [];
			return baseEach(collection, function(value, index, collection) {
				predicate(value, index, collection) && result.push(value)
			}), result
		}
		function baseFlatten(array, depth, isStrict, result) {
			result || (result = []);
			for (var index = -1, length = array.length; ++index < length;) {
				var value = array[index];
				depth > 0 && isArrayLikeObject(value) && (isStrict || isArray(value) || isArguments(value)) ? depth > 1 ? baseFlatten(value, depth - 1, isStrict, result) : arrayPush(result, value) : isStrict || (result[result.length] = value)
			}
			return result
		}
		function baseForOwn(object, iteratee) {
			return object && baseFor(object, iteratee, keys)
		}
		function baseForOwnRight(object, iteratee) {
			return object && baseForRight(object, iteratee, keys)
		}
		function baseFunctions(object, props) {
			return arrayFilter(props, function(key) {
				return isFunction(object[key])
			})
		}
		function baseGet(object, path) {
			path = isKey(path, object) ? [path] : baseCastPath(path);
			for (var index = 0, length = path.length; null != object && index < length;) object = object[path[index++]];
			return index && index == length ? object : undefined
		}
		function baseGetAllKeys(object, keysFunc, symbolsFunc) {
			var result = keysFunc(object);
			return isArray(object) ? result : arrayPush(result, symbolsFunc(object))
		}
		function baseHas(object, key) {
			return hasOwnProperty.call(object, key) || "object" == typeof object && key in object && null === getPrototype(object)
		}
		function baseHasIn(object, key) {
			return key in Object(object)
		}
		function baseInRange(number, start, end) {
			return number >= nativeMin(start, end) && number < nativeMax(start, end)
		}
		function baseIntersection(arrays, iteratee, comparator) {
			for (var includes = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array(othLength), maxLength = 1 / 0, result = []; othIndex--;) {
				var array = arrays[othIndex];
				othIndex && iteratee && (array = arrayMap(array, baseUnary(iteratee))), maxLength = nativeMin(array.length, maxLength), caches[othIndex] = !comparator && (iteratee || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined
			}
			array = arrays[0];
			var index = -1,
				seen = caches[0];
			outer: for (; ++index < length && result.length < maxLength;) {
				var value = array[index],
					computed = iteratee ? iteratee(value) : value;
				if (!(seen ? cacheHas(seen, computed) : includes(result, computed, comparator))) {
					for (othIndex = othLength; --othIndex;) {
						var cache = caches[othIndex];
						if (!(cache ? cacheHas(cache, computed) : includes(arrays[othIndex], computed, comparator))) continue outer
					}
					seen && seen.push(computed), result.push(value)
				}
			}
			return result
		}
		function baseInverter(object, setter, iteratee, accumulator) {
			return baseForOwn(object, function(value, key, object) {
				setter(accumulator, iteratee(value), key, object)
			}), accumulator
		}
		function baseInvoke(object, path, args) {
			isKey(path, object) || (path = baseCastPath(path), object = parent(object, path), path = last(path));
			var func = null == object ? object : object[path];
			return null == func ? undefined : apply(func, object, args)
		}
		function baseIsEqual(value, other, customizer, bitmask, stack) {
			return value === other || (null == value || null == other || !isObject(value) && !isObjectLike(other) ? value !== value && other !== other : baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack))
		}
		function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
			var objIsArr = isArray(object),
				othIsArr = isArray(other),
				objTag = arrayTag,
				othTag = arrayTag;
			objIsArr || (objTag = getTag(object), objTag = objTag == argsTag ? objectTag : objTag), othIsArr || (othTag = getTag(other), othTag = othTag == argsTag ? objectTag : othTag);
			var objIsObj = objTag == objectTag && !isHostObject(object),
				othIsObj = othTag == objectTag && !isHostObject(other),
				isSameTag = objTag == othTag;
			if (isSameTag && !objIsObj) return stack || (stack = new Stack), objIsArr || isTypedArray(object) ? equalArrays(object, other, equalFunc, customizer, bitmask, stack) : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
			if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
				var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"),
					othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
				if (objIsWrapped || othIsWrapped) {
					var objUnwrapped = objIsWrapped ? object.value() : object,
						othUnwrapped = othIsWrapped ? other.value() : other;
					return stack || (stack = new Stack), equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack)
				}
			}
			return !!isSameTag && (stack || (stack = new Stack), equalObjects(object, other, equalFunc, customizer, bitmask, stack))
		}
		function baseIsMatch(object, source, matchData, customizer) {
			var index = matchData.length,
				length = index,
				noCustomizer = !customizer;
			if (null == object) return !length;
			for (object = Object(object); index--;) {
				var data = matchData[index];
				if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) return !1
			}
			for (; ++index < length;) {
				data = matchData[index];
				var key = data[0],
					objValue = object[key],
					srcValue = data[1];
				if (noCustomizer && data[2]) {
					if (objValue === undefined && !(key in object)) return !1
				} else {
					var stack = new Stack;
					if (customizer) var result = customizer(objValue, srcValue, key, object, source, stack);
					if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack) : result)) return !1
				}
			}
			return !0
		}
		function baseIteratee(value) {
			return "function" == typeof value ? value : null == value ? identity : "object" == typeof value ? isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value) : property(value)
		}
		function baseKeys(object) {
			return nativeKeys(Object(object))
		}
		function baseKeysIn(object) {
			object = null == object ? object : Object(object);
			var result = [];
			for (var key in object) result.push(key);
			return result
		}
		function baseMap(collection, iteratee) {
			var index = -1,
				result = isArrayLike(collection) ? Array(collection.length) : [];
			return baseEach(collection, function(value, key, collection) {
				result[++index] = iteratee(value, key, collection)
			}), result
		}
		function baseMatches(source) {
			var matchData = getMatchData(source);
			return 1 == matchData.length && matchData[0][2] ? matchesStrictComparable(matchData[0][0], matchData[0][1]) : function(object) {
				return object === source || baseIsMatch(object, source, matchData)
			}
		}
		function baseMatchesProperty(path, srcValue) {
			return isKey(path) && isStrictComparable(srcValue) ? matchesStrictComparable(path, srcValue) : function(object) {
				var objValue = get(object, path);
				return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG)
			}
		}
		function baseMerge(object, source, srcIndex, customizer, stack) {
			if (object !== source) {
				if (!isArray(source) && !isTypedArray(source)) var props = keysIn(source);
				arrayEach(props || source, function(srcValue, key) {
					if (props && (key = srcValue, srcValue = source[key]), isObject(srcValue)) stack || (stack = new Stack), baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
					else {
						var newValue = customizer ? customizer(object[key], srcValue, key + "", object, source, stack) : undefined;
						newValue === undefined && (newValue = srcValue), assignMergeValue(object, key, newValue)
					}
				})
			}
		}
		function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
			var objValue = object[key],
				srcValue = source[key],
				stacked = stack.get(srcValue);
			if (stacked) return void assignMergeValue(object, key, stacked);
			var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined,
				isCommon = newValue === undefined;
			isCommon && (newValue = srcValue, isArray(srcValue) || isTypedArray(srcValue) ? isArray(objValue) ? newValue = objValue : isArrayLikeObject(objValue) ? newValue = copyArray(objValue) : (isCommon = !1, newValue = baseClone(srcValue, !0)) : isPlainObject(srcValue) || isArguments(srcValue) ? isArguments(objValue) ? newValue = toPlainObject(objValue) : !isObject(objValue) || srcIndex && isFunction(objValue) ? (isCommon = !1, newValue = baseClone(srcValue, !0)) : newValue = objValue : isCommon = !1), stack.set(srcValue, newValue), isCommon && mergeFunc(newValue, srcValue, srcIndex, customizer, stack), stack.delete(srcValue), assignMergeValue(object, key, newValue)
		}
		function baseOrderBy(collection, iteratees, orders) {
			var index = -1;
			iteratees = arrayMap(iteratees.length ? iteratees : [identity], getIteratee());
			var result = baseMap(collection, function(value, key, collection) {
				var criteria = arrayMap(iteratees, function(iteratee) {
					return iteratee(value)
				});
				return {
					criteria: criteria,
					index: ++index,
					value: value
				}
			});
			return baseSortBy(result, function(object, other) {
				return compareMultiple(object, other, orders)
			})
		}
		function basePick(object, props) {
			return object = Object(object), arrayReduce(props, function(result, key) {
				return key in object && (result[key] = object[key]), result
			}, {})
		}
		function basePickBy(object, predicate) {
			for (var index = -1, props = getAllKeysIn(object), length = props.length, result = {}; ++index < length;) {
				var key = props[index],
					value = object[key];
				predicate(value, key) && (result[key] = value)
			}
			return result
		}
		function baseProperty(key) {
			return function(object) {
				return null == object ? undefined : object[key]
			}
		}
		function basePropertyDeep(path) {
			return function(object) {
				return baseGet(object, path)
			}
		}
		function basePullAll(array, values, iteratee, comparator) {
			var indexOf = comparator ? baseIndexOfWith : baseIndexOf,
				index = -1,
				length = values.length,
				seen = array;
			for (iteratee && (seen = arrayMap(array, baseUnary(iteratee))); ++index < length;) for (var fromIndex = 0, value = values[index], computed = iteratee ? iteratee(value) : value;
			(fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1;) seen !== array && splice.call(seen, fromIndex, 1), splice.call(array, fromIndex, 1);
			return array
		}
		function basePullAt(array, indexes) {
			for (var length = array ? indexes.length : 0, lastIndex = length - 1; length--;) {
				var index = indexes[length];
				if (lastIndex == length || index != previous) {
					var previous = index;
					if (isIndex(index)) splice.call(array, index, 1);
					else if (isKey(index, array)) delete array[index];
					else {
						var path = baseCastPath(index),
							object = parent(array, path);
						null != object && delete object[last(path)]
					}
				}
			}
			return array
		}
		function baseRandom(lower, upper) {
			return lower + nativeFloor(nativeRandom() * (upper - lower + 1))
		}
		function baseRange(start, end, step, fromRight) {
			for (var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result = Array(length); length--;) result[fromRight ? length : ++index] = start, start += step;
			return result
		}
		function baseRepeat(string, n) {
			var result = "";
			if (!string || n < 1 || n > MAX_SAFE_INTEGER) return result;
			do n % 2 && (result += string), n = nativeFloor(n / 2), n && (string += string);
			while (n);
			return result
		}
		function baseSet(object, path, value, customizer) {
			path = isKey(path, object) ? [path] : baseCastPath(path);
			for (var index = -1, length = path.length, lastIndex = length - 1, nested = object; null != nested && ++index < length;) {
				var key = path[index];
				if (isObject(nested)) {
					var newValue = value;
					if (index != lastIndex) {
						var objValue = nested[key];
						newValue = customizer ? customizer(objValue, key, nested) : undefined, newValue === undefined && (newValue = null == objValue ? isIndex(path[index + 1]) ? [] : {} : objValue)
					}
					assignValue(nested, key, newValue)
				}
				nested = nested[key]
			}
			return object
		}
		function baseSlice(array, start, end) {
			var index = -1,
				length = array.length;
			start < 0 && (start = -start > length ? 0 : length + start), end = end > length ? length : end, end < 0 && (end += length), length = start > end ? 0 : end - start >>> 0, start >>>= 0;
			for (var result = Array(length); ++index < length;) result[index] = array[index + start];
			return result
		}
		function baseSome(collection, predicate) {
			var result;
			return baseEach(collection, function(value, index, collection) {
				return result = predicate(value, index, collection), !result
			}), !! result
		}
		function baseSortedIndex(array, value, retHighest) {
			var low = 0,
				high = array ? array.length : low;
			if ("number" == typeof value && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
				for (; low < high;) {
					var mid = low + high >>> 1,
						computed = array[mid];
					(retHighest ? computed <= value : computed < value) && null !== computed ? low = mid + 1 : high = mid
				}
				return high
			}
			return baseSortedIndexBy(array, value, identity, retHighest)
		}
		function baseSortedIndexBy(array, value, iteratee, retHighest) {
			value = iteratee(value);
			for (var low = 0, high = array ? array.length : 0, valIsNaN = value !== value, valIsNull = null === value, valIsUndef = value === undefined; low < high;) {
				var mid = nativeFloor((low + high) / 2),
					computed = iteratee(array[mid]),
					isDef = computed !== undefined,
					isReflexive = computed === computed;
				if (valIsNaN) var setLow = isReflexive || retHighest;
				else setLow = valIsNull ? isReflexive && isDef && (retHighest || null != computed) : valIsUndef ? isReflexive && (retHighest || isDef) : null != computed && (retHighest ? computed <= value : computed < value);
				setLow ? low = mid + 1 : high = mid
			}
			return nativeMin(high, MAX_ARRAY_INDEX)
		}
		function baseSortedUniq(array) {
			return baseSortedUniqBy(array)
		}
		function baseSortedUniqBy(array, iteratee) {
			for (var index = 0, length = array.length, value = array[0], computed = iteratee ? iteratee(value) : value, seen = computed, resIndex = 1, result = [value]; ++index < length;) value = array[index], computed = iteratee ? iteratee(value) : value, eq(computed, seen) || (seen = computed, result[resIndex++] = value);
			return result
		}
		function baseUniq(array, iteratee, comparator) {
			var index = -1,
				includes = arrayIncludes,
				length = array.length,
				isCommon = !0,
				result = [],
				seen = result;
			if (comparator) isCommon = !1, includes = arrayIncludesWith;
			else if (length >= LARGE_ARRAY_SIZE) {
				var set = iteratee ? null : createSet(array);
				if (set) return setToArray(set);
				isCommon = !1, includes = cacheHas, seen = new SetCache
			} else seen = iteratee ? [] : result;
			outer: for (; ++index < length;) {
				var value = array[index],
					computed = iteratee ? iteratee(value) : value;
				if (isCommon && computed === computed) {
					for (var seenIndex = seen.length; seenIndex--;) if (seen[seenIndex] === computed) continue outer;
					iteratee && seen.push(computed), result.push(value)
				} else includes(seen, computed, comparator) || (seen !== result && seen.push(computed), result.push(value))
			}
			return result
		}
		function baseUnset(object, path) {
			path = isKey(path, object) ? [path] : baseCastPath(path), object = parent(object, path);
			var key = last(path);
			return null == object || !has(object, key) || delete object[key]
		}
		function baseUpdate(object, path, updater, customizer) {
			return baseSet(object, path, updater(baseGet(object, path)), customizer)
		}
		function baseWhile(array, predicate, isDrop, fromRight) {
			for (var length = array.length, index = fromRight ? length : -1;
			(fromRight ? index-- : ++index < length) && predicate(array[index], index, array););
			return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index)
		}
		function baseWrapperValue(value, actions) {
			var result = value;
			return result instanceof LazyWrapper && (result = result.value()), arrayReduce(actions, function(result, action) {
				return action.func.apply(action.thisArg, arrayPush([result], action.args))
			}, result)
		}
		function baseXor(arrays, iteratee, comparator) {
			for (var index = -1, length = arrays.length; ++index < length;) var result = result ? arrayPush(baseDifference(result, arrays[index], iteratee, comparator), baseDifference(arrays[index], result, iteratee, comparator)) : arrays[index];
			return result && result.length ? baseUniq(result, iteratee, comparator) : []
		}
		function baseZipObject(props, values, assignFunc) {
			for (var index = -1, length = props.length, valsLength = values.length, result = {}; ++index < length;) {
				var value = index < valsLength ? values[index] : undefined;
				assignFunc(result, props[index], value)
			}
			return result
		}
		function cloneBuffer(buffer, isDeep) {
			if (isDeep) return buffer.slice();
			var result = new buffer.constructor(buffer.length);
			return buffer.copy(result), result
		}
		function cloneArrayBuffer(arrayBuffer) {
			var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
			return new Uint8Array(result).set(new Uint8Array(arrayBuffer)), result
		}
		function cloneDataView(dataView, isDeep) {
			var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
			return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength)
		}
		function cloneMap(map, isDeep, cloneFunc) {
			var array = isDeep ? cloneFunc(mapToArray(map), !0) : mapToArray(map);
			return arrayReduce(array, addMapEntry, new map.constructor)
		}
		function cloneRegExp(regexp) {
			var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
			return result.lastIndex = regexp.lastIndex, result
		}
		function cloneSet(set, isDeep, cloneFunc) {
			var array = isDeep ? cloneFunc(setToArray(set), !0) : setToArray(set);
			return arrayReduce(array, addSetEntry, new set.constructor)
		}
		function cloneSymbol(symbol) {
			return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {}
		}
		function cloneTypedArray(typedArray, isDeep) {
			var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
			return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length)
		}
		function composeArgs(args, partials, holders, isCurried) {
			for (var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result = Array(leftLength + rangeLength), isUncurried = !isCurried; ++leftIndex < leftLength;) result[leftIndex] = partials[leftIndex];
			for (; ++argsIndex < holdersLength;)(isUncurried || argsIndex < argsLength) && (result[holders[argsIndex]] = args[argsIndex]);
			for (; rangeLength--;) result[leftIndex++] = args[argsIndex++];
			return result
		}
		function composeArgsRight(args, partials, holders, isCurried) {
			for (var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result = Array(rangeLength + rightLength), isUncurried = !isCurried; ++argsIndex < rangeLength;) result[argsIndex] = args[argsIndex];
			for (var offset = argsIndex; ++rightIndex < rightLength;) result[offset + rightIndex] = partials[rightIndex];
			for (; ++holdersIndex < holdersLength;)(isUncurried || argsIndex < argsLength) && (result[offset + holders[holdersIndex]] = args[argsIndex++]);
			return result
		}
		function copyArray(source, array) {
			var index = -1,
				length = source.length;
			for (array || (array = Array(length)); ++index < length;) array[index] = source[index];
			return array
		}
		function copyObject(source, props, object) {
			return copyObjectWith(source, props, object)
		}
		function copyObjectWith(source, props, object, customizer) {
			object || (object = {});
			for (var index = -1, length = props.length; ++index < length;) {
				var key = props[index],
					newValue = customizer ? customizer(object[key], source[key], key, object, source) : source[key];
				assignValue(object, key, newValue)
			}
			return object
		}
		function copySymbols(source, object) {
			return copyObject(source, getSymbols(source), object)
		}
		function createAggregator(setter, initializer) {
			return function(collection, iteratee) {
				var func = isArray(collection) ? arrayAggregator : baseAggregator,
					accumulator = initializer ? initializer() : {};
				return func(collection, setter, getIteratee(iteratee), accumulator)
			}
		}
		function createAssigner(assigner) {
			return rest(function(object, sources) {
				var index = -1,
					length = sources.length,
					customizer = length > 1 ? sources[length - 1] : undefined,
					guard = length > 2 ? sources[2] : undefined;
				for (customizer = "function" == typeof customizer ? (length--, customizer) : undefined, guard && isIterateeCall(sources[0], sources[1], guard) && (customizer = length < 3 ? undefined : customizer, length = 1), object = Object(object); ++index < length;) {
					var source = sources[index];
					source && assigner(object, source, index, customizer)
				}
				return object
			})
		}
		function createBaseEach(eachFunc, fromRight) {
			return function(collection, iteratee) {
				if (null == collection) return collection;
				if (!isArrayLike(collection)) return eachFunc(collection, iteratee);
				for (var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
				(fromRight ? index-- : ++index < length) && iteratee(iterable[index], index, iterable) !== !1;);
				return collection
			}
		}
		function createBaseFor(fromRight) {
			return function(object, iteratee, keysFunc) {
				for (var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length; length--;) {
					var key = props[fromRight ? length : ++index];
					if (iteratee(iterable[key], key, iterable) === !1) break
				}
				return object
			}
		}
		function createBaseWrapper(func, bitmask, thisArg) {
			function wrapper() {
				var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
				return fn.apply(isBind ? thisArg : this, arguments)
			}
			var isBind = bitmask & BIND_FLAG,
				Ctor = createCtorWrapper(func);
			return wrapper
		}
		function createCaseFirst(methodName) {
			return function(string) {
				string = toString(string);
				var strSymbols = reHasComplexSymbol.test(string) ? stringToArray(string) : undefined,
					chr = strSymbols ? strSymbols[0] : string.charAt(0),
					trailing = strSymbols ? strSymbols.slice(1).join("") : string.slice(1);
				return chr[methodName]() + trailing
			}
		}
		function createCompounder(callback) {
			return function(string) {
				return arrayReduce(words(deburr(string)), callback, "")
			}
		}
		function createCtorWrapper(Ctor) {
			return function() {
				var args = arguments;
				switch (args.length) {
				case 0:
					return new Ctor;
				case 1:
					return new Ctor(args[0]);
				case 2:
					return new Ctor(args[0], args[1]);
				case 3:
					return new Ctor(args[0], args[1], args[2]);
				case 4:
					return new Ctor(args[0], args[1], args[2], args[3]);
				case 5:
					return new Ctor(args[0], args[1], args[2], args[3], args[4]);
				case 6:
					return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
				case 7:
					return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6])
				}
				var thisBinding = baseCreate(Ctor.prototype),
					result = Ctor.apply(thisBinding, args);
				return isObject(result) ? result : thisBinding
			}
		}
		function createCurryWrapper(func, bitmask, arity) {
			function wrapper() {
				for (var length = arguments.length, args = Array(length), index = length, placeholder = getPlaceholder(wrapper); index--;) args[index] = arguments[index];
				var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
				if (length -= holders.length, length < arity) return createRecurryWrapper(func, bitmask, createHybridWrapper, wrapper.placeholder, undefined, args, holders, undefined, undefined, arity - length);
				var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
				return apply(fn, this, args)
			}
			var Ctor = createCtorWrapper(func);
			return wrapper
		}
		function createFlow(fromRight) {
			return rest(function(funcs) {
				funcs = baseFlatten(funcs, 1);
				var length = funcs.length,
					index = length,
					prereq = LodashWrapper.prototype.thru;
				for (fromRight && funcs.reverse(); index--;) {
					var func = funcs[index];
					if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
					if (prereq && !wrapper && "wrapper" == getFuncName(func)) var wrapper = new LodashWrapper([], (!0))
				}
				for (index = wrapper ? index : length; ++index < length;) {
					func = funcs[index];
					var funcName = getFuncName(func),
						data = "wrapper" == funcName ? getData(func) : undefined;
					wrapper = data && isLaziable(data[0]) && data[1] == (ARY_FLAG | CURRY_FLAG | PARTIAL_FLAG | REARG_FLAG) && !data[4].length && 1 == data[9] ? wrapper[getFuncName(data[0])].apply(wrapper, data[3]) : 1 == func.length && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func)
				}
				return function() {
					var args = arguments,
						value = args[0];
					if (wrapper && 1 == args.length && isArray(value) && value.length >= LARGE_ARRAY_SIZE) return wrapper.plant(value).value();
					for (var index = 0, result = length ? funcs[index].apply(this, args) : value; ++index < length;) result = funcs[index].call(this, result);
					return result
				}
			})
		}
		function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
			function wrapper() {
				for (var length = arguments.length, index = length, args = Array(length); index--;) args[index] = arguments[index];
				if (isCurried) var placeholder = getPlaceholder(wrapper),
					holdersCount = countHolders(args, placeholder);
				if (partials && (args = composeArgs(args, partials, holders, isCurried)), partialsRight && (args = composeArgsRight(args, partialsRight, holdersRight, isCurried)), length -= holdersCount, isCurried && length < arity) {
					var newHolders = replaceHolders(args, placeholder);
					return createRecurryWrapper(func, bitmask, createHybridWrapper, wrapper.placeholder, thisArg, args, newHolders, argPos, ary, arity - length)
				}
				var thisBinding = isBind ? thisArg : this,
					fn = isBindKey ? thisBinding[func] : func;
				return length = args.length, argPos ? args = reorder(args, argPos) : isFlip && length > 1 && args.reverse(), isAry && ary < length && (args.length = ary), this && this !== root && this instanceof wrapper && (fn = Ctor || createCtorWrapper(fn)), fn.apply(thisBinding, args)
			}
			var isAry = bitmask & ARY_FLAG,
				isBind = bitmask & BIND_FLAG,
				isBindKey = bitmask & BIND_KEY_FLAG,
				isCurried = bitmask & (CURRY_FLAG | CURRY_RIGHT_FLAG),
				isFlip = bitmask & FLIP_FLAG,
				Ctor = isBindKey ? undefined : createCtorWrapper(func);
			return wrapper
		}
		function createInverter(setter, toIteratee) {
			return function(object, iteratee) {
				return baseInverter(object, setter, toIteratee(iteratee), {})
			}
		}
		function createOver(arrayFunc) {
			return rest(function(iteratees) {
				return iteratees = arrayMap(baseFlatten(iteratees, 1), getIteratee()), rest(function(args) {
					var thisArg = this;
					return arrayFunc(iteratees, function(iteratee) {
						return apply(iteratee, thisArg, args)
					})
				})
			})
		}
		function createPadding(length, chars) {
			chars = chars === undefined ? " " : chars + "";
			var charsLength = chars.length;
			if (charsLength < 2) return charsLength ? baseRepeat(chars, length) : chars;
			var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
			return reHasComplexSymbol.test(chars) ? stringToArray(result).slice(0, length).join("") : result.slice(0, length)
		}
		function createPartialWrapper(func, bitmask, thisArg, partials) {
			function wrapper() {
				for (var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func; ++leftIndex < leftLength;) args[leftIndex] = partials[leftIndex];
				for (; argsLength--;) args[leftIndex++] = arguments[++argsIndex];
				return apply(fn, isBind ? thisArg : this, args)
			}
			var isBind = bitmask & BIND_FLAG,
				Ctor = createCtorWrapper(func);
			return wrapper
		}
		function createRange(fromRight) {
			return function(start, end, step) {
				return step && "number" != typeof step && isIterateeCall(start, end, step) && (end = step = undefined), start = toNumber(start), start = start === start ? start : 0, end === undefined ? (end = start, start = 0) : end = toNumber(end) || 0, step = step === undefined ? start < end ? 1 : -1 : toNumber(step) || 0, baseRange(start, end, step, fromRight)
			}
		}
		function createRecurryWrapper(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
			var isCurry = bitmask & CURRY_FLAG,
				newArgPos = argPos ? copyArray(argPos) : undefined,
				newHolders = isCurry ? holders : undefined,
				newHoldersRight = isCurry ? undefined : holders,
				newPartials = isCurry ? partials : undefined,
				newPartialsRight = isCurry ? undefined : partials;
			bitmask |= isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG, bitmask &= ~ (isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG), bitmask & CURRY_BOUND_FLAG || (bitmask &= ~ (BIND_FLAG | BIND_KEY_FLAG));
			var newData = [func, bitmask, thisArg, newPartials, newHolders, newPartialsRight, newHoldersRight, newArgPos, ary, arity],
				result = wrapFunc.apply(undefined, newData);
			return isLaziable(func) && setData(result, newData), result.placeholder = placeholder, result
		}
		function createRound(methodName) {
			var func = Math[methodName];
			return function(number, precision) {
				if (number = toNumber(number), precision = toInteger(precision)) {
					var pair = (toString(number) + "e").split("e"),
						value = func(pair[0] + "e" + (+pair[1] + precision));
					return pair = (toString(value) + "e").split("e"), +(pair[0] + "e" + (+pair[1] - precision))
				}
				return func(number)
			}
		}
		function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
			var isBindKey = bitmask & BIND_KEY_FLAG;
			if (!isBindKey && "function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
			var length = partials ? partials.length : 0;
			if (length || (bitmask &= ~ (PARTIAL_FLAG | PARTIAL_RIGHT_FLAG), partials = holders = undefined), ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0), arity = arity === undefined ? arity : toInteger(arity), length -= holders ? holders.length : 0, bitmask & PARTIAL_RIGHT_FLAG) {
				var partialsRight = partials,
					holdersRight = holders;
				partials = holders = undefined
			}
			var data = isBindKey ? undefined : getData(func),
				newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];
			if (data && mergeData(newData, data), func = newData[0], bitmask = newData[1], thisArg = newData[2], partials = newData[3], holders = newData[4], arity = newData[9] = null == newData[9] ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0), !arity && bitmask & (CURRY_FLAG | CURRY_RIGHT_FLAG) && (bitmask &= ~ (CURRY_FLAG | CURRY_RIGHT_FLAG)), bitmask && bitmask != BIND_FLAG) result = bitmask == CURRY_FLAG || bitmask == CURRY_RIGHT_FLAG ? createCurryWrapper(func, bitmask, arity) : bitmask != PARTIAL_FLAG && bitmask != (BIND_FLAG | PARTIAL_FLAG) || holders.length ? createHybridWrapper.apply(undefined, newData) : createPartialWrapper(func, bitmask, thisArg, partials);
			else var result = createBaseWrapper(func, bitmask, thisArg);
			var setter = data ? baseSetData : setData;
			return setter(result, newData)
		}
		function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
			var index = -1,
				isPartial = bitmask & PARTIAL_COMPARE_FLAG,
				isUnordered = bitmask & UNORDERED_COMPARE_FLAG,
				arrLength = array.length,
				othLength = other.length;
			if (arrLength != othLength && !(isPartial && othLength > arrLength)) return !1;
			var stacked = stack.get(array);
			if (stacked) return stacked == other;
			var result = !0;
			for (stack.set(array, other); ++index < arrLength;) {
				var arrValue = array[index],
					othValue = other[index];
				if (customizer) var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
				if (compared !== undefined) {
					if (compared) continue;
					result = !1;
					break
				}
				if (isUnordered) {
					if (!arraySome(other, function(othValue) {
						return arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack)
					})) {
						result = !1;
						break
					}
				} else if (arrValue !== othValue && !equalFunc(arrValue, othValue, customizer, bitmask, stack)) {
					result = !1;
					break
				}
			}
			return stack.delete(array), result
		}
		function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
			switch (tag) {
			case dataViewTag:
				if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) return !1;
				object = object.buffer, other = other.buffer;
			case arrayBufferTag:
				return !(object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other)));
			case boolTag:
			case dateTag:
				return +object == +other;
			case errorTag:
				return object.name == other.name && object.message == other.message;
			case numberTag:
				return object != +object ? other != +other : object == +other;
			case regexpTag:
			case stringTag:
				return object == other + "";
			case mapTag:
				var convert = mapToArray;
			case setTag:
				var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
				if (convert || (convert = setToArray), object.size != other.size && !isPartial) return !1;
				var stacked = stack.get(object);
				return stacked ? stacked == other : (bitmask |= UNORDERED_COMPARE_FLAG, stack.set(object, other), equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack));
			case symbolTag:
				if (symbolValueOf) return symbolValueOf.call(object) == symbolValueOf.call(other)
			}
			return !1
		}
		function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
			var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
				objProps = keys(object),
				objLength = objProps.length,
				othProps = keys(other),
				othLength = othProps.length;
			if (objLength != othLength && !isPartial) return !1;
			for (var index = objLength; index--;) {
				var key = objProps[index];
				if (!(isPartial ? key in other : baseHas(other, key))) return !1
			}
			var stacked = stack.get(object);
			if (stacked) return stacked == other;
			var result = !0;
			stack.set(object, other);
			for (var skipCtor = isPartial; ++index < objLength;) {
				key = objProps[index];
				var objValue = object[key],
					othValue = other[key];
				if (customizer) var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
				if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack) : compared)) {
					result = !1;
					break
				}
				skipCtor || (skipCtor = "constructor" == key)
			}
			if (result && !skipCtor) {
				var objCtor = object.constructor,
					othCtor = other.constructor;
				objCtor != othCtor && "constructor" in object && "constructor" in other && !("function" == typeof objCtor && objCtor instanceof objCtor && "function" == typeof othCtor && othCtor instanceof othCtor) && (result = !1)
			}
			return stack.delete(object), result
		}
		function getAllKeys(object) {
			return baseGetAllKeys(object, keys, getSymbols)
		}
		function getAllKeysIn(object) {
			return baseGetAllKeys(object, keysIn, getSymbolsIn)
		}
		function getFuncName(func) {
			for (var result = func.name + "", array = realNames[result], length = hasOwnProperty.call(realNames, result) ? array.length : 0; length--;) {
				var data = array[length],
					otherFunc = data.func;
				if (null == otherFunc || otherFunc == func) return data.name
			}
			return result
		}
		function getIteratee() {
			var result = lodash.iteratee || iteratee;
			return result = result === iteratee ? baseIteratee : result, arguments.length ? result(arguments[0], arguments[1]) : result
		}
		function getMatchData(object) {
			for (var result = toPairs(object), length = result.length; length--;) result[length][2] = isStrictComparable(result[length][1]);
			return result
		}
		function getNative(object, key) {
			var value = object[key];
			return isNative(value) ? value : undefined
		}
		function getPlaceholder(func) {
			var object = hasOwnProperty.call(lodash, "placeholder") ? lodash : func;
			return object.placeholder
		}
		function getPrototype(value) {
			return nativeGetPrototype(Object(value))
		}
		function getSymbols(object) {
			return getOwnPropertySymbols(Object(object))
		}
		function getTag(value) {
			return objectToString.call(value)
		}
		function getView(start, end, transforms) {
			for (var index = -1, length = transforms.length; ++index < length;) {
				var data = transforms[index],
					size = data.size;
				switch (data.type) {
				case "drop":
					start += size;
					break;
				case "dropRight":
					end -= size;
					break;
				case "take":
					end = nativeMin(end, start + size);
					break;
				case "takeRight":
					start = nativeMax(start, end - size)
				}
			}
			return {
				start: start,
				end: end
			}
		}
		function hasPath(object, path, hasFunc) {
			path = isKey(path, object) ? [path] : baseCastPath(path);
			for (var result, index = -1, length = path.length; ++index < length;) {
				var key = path[index];
				if (!(result = null != object && hasFunc(object, key))) break;
				object = object[key]
			}
			if (result) return result;
			var length = object ? object.length : 0;
			return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isString(object) || isArguments(object))
		}
		function initCloneArray(array) {
			var length = array.length,
				result = array.constructor(length);
			return length && "string" == typeof array[0] && hasOwnProperty.call(array, "index") && (result.index = array.index, result.input = array.input), result
		}
		function initCloneObject(object) {
			return "function" != typeof object.constructor || isPrototype(object) ? {} : baseCreate(getPrototype(object))
		}
		function initCloneByTag(object, tag, cloneFunc, isDeep) {
			var Ctor = object.constructor;
			switch (tag) {
			case arrayBufferTag:
				return cloneArrayBuffer(object);
			case boolTag:
			case dateTag:
				return new Ctor((+object));
			case dataViewTag:
				return cloneDataView(object, isDeep);
			case float32Tag:
			case float64Tag:
			case int8Tag:
			case int16Tag:
			case int32Tag:
			case uint8Tag:
			case uint8ClampedTag:
			case uint16Tag:
			case uint32Tag:
				return cloneTypedArray(object, isDeep);
			case mapTag:
				return cloneMap(object, isDeep, cloneFunc);
			case numberTag:
			case stringTag:
				return new Ctor(object);
			case regexpTag:
				return cloneRegExp(object);
			case setTag:
				return cloneSet(object, isDeep, cloneFunc);
			case symbolTag:
				return cloneSymbol(object)
			}
		}
		function indexKeys(object) {
			var length = object ? object.length : undefined;
			return isLength(length) && (isArray(object) || isString(object) || isArguments(object)) ? baseTimes(length, String) : null
		}
		function isIterateeCall(value, index, object) {
			if (!isObject(object)) return !1;
			var type = typeof index;
			return !!("number" == type ? isArrayLike(object) && isIndex(index, object.length) : "string" == type && index in object) && eq(object[index], value)
		}
		function isKey(value, object) {
			var type = typeof value;
			return "number" == type || "symbol" == type || !isArray(value) && (isSymbol(value) || reIsPlainProp.test(value) || !reIsDeepProp.test(value) || null != object && value in Object(object))
		}
		function isKeyable(value) {
			var type = typeof value;
			return "number" == type || "boolean" == type || "string" == type && "__proto__" != value || null == value
		}
		function isLaziable(func) {
			var funcName = getFuncName(func),
				other = lodash[funcName];
			if ("function" != typeof other || !(funcName in LazyWrapper.prototype)) return !1;
			if (func === other) return !0;
			var data = getData(other);
			return !!data && func === data[0]
		}
		function isPrototype(value) {
			var Ctor = value && value.constructor,
				proto = "function" == typeof Ctor && Ctor.prototype || objectProto;
			return value === proto
		}
		function isStrictComparable(value) {
			return value === value && !isObject(value)
		}
		function matchesStrictComparable(key, srcValue) {
			return function(object) {
				return null != object && (object[key] === srcValue && (srcValue !== undefined || key in Object(object)))
			}
		}
		function mergeData(data, source) {
			var bitmask = data[1],
				srcBitmask = source[1],
				newBitmask = bitmask | srcBitmask,
				isCommon = newBitmask < (BIND_FLAG | BIND_KEY_FLAG | ARY_FLAG),
				isCombo = srcBitmask == ARY_FLAG && bitmask == CURRY_FLAG || srcBitmask == ARY_FLAG && bitmask == REARG_FLAG && data[7].length <= source[8] || srcBitmask == (ARY_FLAG | REARG_FLAG) && source[7].length <= source[8] && bitmask == CURRY_FLAG;
			if (!isCommon && !isCombo) return data;
			srcBitmask & BIND_FLAG && (data[2] = source[2], newBitmask |= bitmask & BIND_FLAG ? 0 : CURRY_BOUND_FLAG);
			var value = source[3];
			if (value) {
				var partials = data[3];
				data[3] = partials ? composeArgs(partials, value, source[4]) : copyArray(value), data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : copyArray(source[4])
			}
			return value = source[5], value && (partials = data[5], data[5] = partials ? composeArgsRight(partials, value, source[6]) : copyArray(value), data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : copyArray(source[6])), value = source[7], value && (data[7] = copyArray(value)), srcBitmask & ARY_FLAG && (data[8] = null == data[8] ? source[8] : nativeMin(data[8], source[8])), null == data[9] && (data[9] = source[9]), data[0] = source[0], data[1] = newBitmask, data
		}
		function mergeDefaults(objValue, srcValue, key, object, source, stack) {
			return isObject(objValue) && isObject(srcValue) && baseMerge(objValue, srcValue, undefined, mergeDefaults, stack.set(srcValue, objValue)), objValue
		}
		function parent(object, path) {
			return 1 == path.length ? object : baseGet(object, baseSlice(path, 0, -1))
		}
		function reorder(array, indexes) {
			for (var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array); length--;) {
				var index = indexes[length];
				array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined
			}
			return array
		}
		function toSource(func) {
			if (isFunction(func)) try {
				return funcToString.call(func)
			} catch (e) {}
			return toString(func)
		}
		function wrapperClone(wrapper) {
			if (wrapper instanceof LazyWrapper) return wrapper.clone();
			var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
			return result.__actions__ = copyArray(wrapper.__actions__), result.__index__ = wrapper.__index__, result.__values__ = wrapper.__values__, result
		}
		function chunk(array, size, guard) {
			size = (guard ? isIterateeCall(array, size, guard) : size === undefined) ? 1 : nativeMax(toInteger(size), 0);
			var length = array ? array.length : 0;
			if (!length || size < 1) return [];
			for (var index = 0, resIndex = 0, result = Array(nativeCeil(length / size)); index < length;) result[resIndex++] = baseSlice(array, index, index += size);
			return result
		}
		function compact(array) {
			for (var index = -1, length = array ? array.length : 0, resIndex = 0, result = []; ++index < length;) {
				var value = array[index];
				value && (result[resIndex++] = value)
			}
			return result
		}
		function concat() {
			var length = arguments.length,
				array = castArray(arguments[0]);
			if (length < 2) return length ? copyArray(array) : [];
			for (var args = Array(length - 1); length--;) args[length - 1] = arguments[length];
			return arrayConcat(array, baseFlatten(args, 1))
		}
		function drop(array, n, guard) {
			var length = array ? array.length : 0;
			return length ? (n = guard || n === undefined ? 1 : toInteger(n), baseSlice(array, n < 0 ? 0 : n, length)) : []
		}
		function dropRight(array, n, guard) {
			var length = array ? array.length : 0;
			return length ? (n = guard || n === undefined ? 1 : toInteger(n), n = length - n, baseSlice(array, 0, n < 0 ? 0 : n)) : []
		}
		function dropRightWhile(array, predicate) {
			return array && array.length ? baseWhile(array, getIteratee(predicate, 3), !0, !0) : []
		}
		function dropWhile(array, predicate) {
			return array && array.length ? baseWhile(array, getIteratee(predicate, 3), !0) : []
		}
		function fill(array, value, start, end) {
			var length = array ? array.length : 0;
			return length ? (start && "number" != typeof start && isIterateeCall(array, value, start) && (start = 0, end = length), baseFill(array, value, start, end)) : []
		}
		function findIndex(array, predicate) {
			return array && array.length ? baseFindIndex(array, getIteratee(predicate, 3)) : -1
		}
		function findLastIndex(array, predicate) {
			return array && array.length ? baseFindIndex(array, getIteratee(predicate, 3), !0) : -1
		}
		function flatten(array) {
			var length = array ? array.length : 0;
			return length ? baseFlatten(array, 1) : []
		}
		function flattenDeep(array) {
			var length = array ? array.length : 0;
			return length ? baseFlatten(array, INFINITY) : []
		}
		function flattenDepth(array, depth) {
			var length = array ? array.length : 0;
			return length ? (depth = depth === undefined ? 1 : toInteger(depth), baseFlatten(array, depth)) : []
		}
		function fromPairs(pairs) {
			for (var index = -1, length = pairs ? pairs.length : 0, result = {}; ++index < length;) {
				var pair = pairs[index];
				result[pair[0]] = pair[1]
			}
			return result
		}
		function head(array) {
			return array ? array[0] : undefined
		}
		function indexOf(array, value, fromIndex) {
			var length = array ? array.length : 0;
			return length ? (fromIndex = toInteger(fromIndex), fromIndex < 0 && (fromIndex = nativeMax(length + fromIndex, 0)), baseIndexOf(array, value, fromIndex)) : -1
		}
		function initial(array) {
			return dropRight(array, 1)
		}
		function join(array, separator) {
			return array ? nativeJoin.call(array, separator) : ""
		}
		function last(array) {
			var length = array ? array.length : 0;
			return length ? array[length - 1] : undefined
		}
		function lastIndexOf(array, value, fromIndex) {
			var length = array ? array.length : 0;
			if (!length) return -1;
			var index = length;
			if (fromIndex !== undefined && (index = toInteger(fromIndex), index = (index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1)) + 1), value !== value) return indexOfNaN(array, index, !0);
			for (; index--;) if (array[index] === value) return index;
			return -1
		}
		function pullAll(array, values) {
			return array && array.length && values && values.length ? basePullAll(array, values) : array
		}
		function pullAllBy(array, values, iteratee) {
			return array && array.length && values && values.length ? basePullAll(array, values, getIteratee(iteratee)) : array
		}
		function pullAllWith(array, values, comparator) {
			return array && array.length && values && values.length ? basePullAll(array, values, undefined, comparator) : array
		}
		function remove(array, predicate) {
			var result = [];
			if (!array || !array.length) return result;
			var index = -1,
				indexes = [],
				length = array.length;
			for (predicate = getIteratee(predicate, 3); ++index < length;) {
				var value = array[index];
				predicate(value, index, array) && (result.push(value), indexes.push(index))
			}
			return basePullAt(array, indexes), result
		}
		function reverse(array) {
			return array ? nativeReverse.call(array) : array
		}
		function slice(array, start, end) {
			var length = array ? array.length : 0;
			return length ? (end && "number" != typeof end && isIterateeCall(array, start, end) ? (start = 0, end = length) : (start = null == start ? 0 : toInteger(start), end = end === undefined ? length : toInteger(end)), baseSlice(array, start, end)) : []
		}
		function sortedIndex(array, value) {
			return baseSortedIndex(array, value)
		}
		function sortedIndexBy(array, value, iteratee) {
			return baseSortedIndexBy(array, value, getIteratee(iteratee))
		}
		function sortedIndexOf(array, value) {
			var length = array ? array.length : 0;
			if (length) {
				var index = baseSortedIndex(array, value);
				if (index < length && eq(array[index], value)) return index
			}
			return -1
		}
		function sortedLastIndex(array, value) {
			return baseSortedIndex(array, value, !0)
		}
		function sortedLastIndexBy(array, value, iteratee) {
			return baseSortedIndexBy(array, value, getIteratee(iteratee), !0)
		}
		function sortedLastIndexOf(array, value) {
			var length = array ? array.length : 0;
			if (length) {
				var index = baseSortedIndex(array, value, !0) - 1;
				if (eq(array[index], value)) return index
			}
			return -1
		}
		function sortedUniq(array) {
			return array && array.length ? baseSortedUniq(array) : []
		}
		function sortedUniqBy(array, iteratee) {
			return array && array.length ? baseSortedUniqBy(array, getIteratee(iteratee)) : []
		}
		function tail(array) {
			return drop(array, 1)
		}
		function take(array, n, guard) {
			return array && array.length ? (n = guard || n === undefined ? 1 : toInteger(n), baseSlice(array, 0, n < 0 ? 0 : n)) : []
		}
		function takeRight(array, n, guard) {
			var length = array ? array.length : 0;
			return length ? (n = guard || n === undefined ? 1 : toInteger(n), n = length - n, baseSlice(array, n < 0 ? 0 : n, length)) : []
		}
		function takeRightWhile(array, predicate) {
			return array && array.length ? baseWhile(array, getIteratee(predicate, 3), !1, !0) : []
		}
		function takeWhile(array, predicate) {
			return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : []
		}
		function uniq(array) {
			return array && array.length ? baseUniq(array) : []
		}
		function uniqBy(array, iteratee) {
			return array && array.length ? baseUniq(array, getIteratee(iteratee)) : []
		}
		function uniqWith(array, comparator) {
			return array && array.length ? baseUniq(array, undefined, comparator) : []
		}
		function unzip(array) {
			if (!array || !array.length) return [];
			var length = 0;
			return array = arrayFilter(array, function(group) {
				if (isArrayLikeObject(group)) return length = nativeMax(group.length, length), !0
			}), baseTimes(length, function(index) {
				return arrayMap(array, baseProperty(index))
			})
		}
		function unzipWith(array, iteratee) {
			if (!array || !array.length) return [];
			var result = unzip(array);
			return null == iteratee ? result : arrayMap(result, function(group) {
				return apply(iteratee, undefined, group)
			})
		}
		function zipObject(props, values) {
			return baseZipObject(props || [], values || [], assignValue)
		}
		function zipObjectDeep(props, values) {
			return baseZipObject(props || [], values || [], baseSet)
		}
		function chain(value) {
			var result = lodash(value);
			return result.__chain__ = !0, result
		}
		function tap(value, interceptor) {
			return interceptor(value), value
		}
		function thru(value, interceptor) {
			return interceptor(value)
		}
		function wrapperChain() {
			return chain(this)
		}
		function wrapperCommit() {
			return new LodashWrapper(this.value(), this.__chain__)
		}
		function wrapperNext() {
			this.__values__ === undefined && (this.__values__ = toArray(this.value()));
			var done = this.__index__ >= this.__values__.length,
				value = done ? undefined : this.__values__[this.__index__++];
			return {
				done: done,
				value: value
			}
		}
		function wrapperToIterator() {
			return this
		}
		function wrapperPlant(value) {
			for (var result, parent = this; parent instanceof baseLodash;) {
				var clone = wrapperClone(parent);
				clone.__index__ = 0, clone.__values__ = undefined, result ? previous.__wrapped__ = clone : result = clone;
				var previous = clone;
				parent = parent.__wrapped__
			}
			return previous.__wrapped__ = value, result
		}
		function wrapperReverse() {
			var value = this.__wrapped__;
			if (value instanceof LazyWrapper) {
				var wrapped = value;
				return this.__actions__.length && (wrapped = new LazyWrapper(this)), wrapped = wrapped.reverse(), wrapped.__actions__.push({
					func: thru,
					args: [reverse],
					thisArg: undefined
				}), new LodashWrapper(wrapped, this.__chain__)
			}
			return this.thru(reverse)
		}
		function wrapperValue() {
			return baseWrapperValue(this.__wrapped__, this.__actions__)
		}
		function every(collection, predicate, guard) {
			var func = isArray(collection) ? arrayEvery : baseEvery;
			return guard && isIterateeCall(collection, predicate, guard) && (predicate = undefined), func(collection, getIteratee(predicate, 3))
		}
		function filter(collection, predicate) {
			var func = isArray(collection) ? arrayFilter : baseFilter;
			return func(collection, getIteratee(predicate, 3))
		}
		function find(collection, predicate) {
			if (predicate = getIteratee(predicate, 3), isArray(collection)) {
				var index = baseFindIndex(collection, predicate);
				return index > -1 ? collection[index] : undefined
			}
			return baseFind(collection, predicate, baseEach)
		}
		function findLast(collection, predicate) {
			if (predicate = getIteratee(predicate, 3), isArray(collection)) {
				var index = baseFindIndex(collection, predicate, !0);
				return index > -1 ? collection[index] : undefined
			}
			return baseFind(collection, predicate, baseEachRight)
		}
		function flatMap(collection, iteratee) {
			return baseFlatten(map(collection, iteratee), 1)
		}
		function flatMapDeep(collection, iteratee) {
			return baseFlatten(map(collection, iteratee), INFINITY)
		}
		function flatMapDepth(collection, iteratee, depth) {
			return depth = depth === undefined ? 1 : toInteger(depth), baseFlatten(map(collection, iteratee), depth)
		}
		function forEach(collection, iteratee) {
			return "function" == typeof iteratee && isArray(collection) ? arrayEach(collection, iteratee) : baseEach(collection, getIteratee(iteratee))
		}
		function forEachRight(collection, iteratee) {
			return "function" == typeof iteratee && isArray(collection) ? arrayEachRight(collection, iteratee) : baseEachRight(collection, getIteratee(iteratee))
		}
		function includes(collection, value, fromIndex, guard) {
			collection = isArrayLike(collection) ? collection : values(collection), fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
			var length = collection.length;
			return fromIndex < 0 && (fromIndex = nativeMax(length + fromIndex, 0)), isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !! length && baseIndexOf(collection, value, fromIndex) > -1
		}
		function map(collection, iteratee) {
			var func = isArray(collection) ? arrayMap : baseMap;
			return func(collection, getIteratee(iteratee, 3))
		}
		function orderBy(collection, iteratees, orders, guard) {
			return null == collection ? [] : (isArray(iteratees) || (iteratees = null == iteratees ? [] : [iteratees]), orders = guard ? undefined : orders, isArray(orders) || (orders = null == orders ? [] : [orders]), baseOrderBy(collection, iteratees, orders))
		}
		function reduce(collection, iteratee, accumulator) {
			var func = isArray(collection) ? arrayReduce : baseReduce,
				initAccum = arguments.length < 3;
			return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEach)
		}
		function reduceRight(collection, iteratee, accumulator) {
			var func = isArray(collection) ? arrayReduceRight : baseReduce,
				initAccum = arguments.length < 3;
			return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEachRight)
		}
		function reject(collection, predicate) {
			var func = isArray(collection) ? arrayFilter : baseFilter;
			return predicate = getIteratee(predicate, 3), func(collection, function(value, index, collection) {
				return !predicate(value, index, collection)
			})
		}
		function sample(collection) {
			var array = isArrayLike(collection) ? collection : values(collection),
				length = array.length;
			return length > 0 ? array[baseRandom(0, length - 1)] : undefined
		}
		function sampleSize(collection, n, guard) {
			var index = -1,
				result = toArray(collection),
				length = result.length,
				lastIndex = length - 1;
			for (n = (guard ? isIterateeCall(collection, n, guard) : n === undefined) ? 1 : baseClamp(toInteger(n), 0, length); ++index < n;) {
				var rand = baseRandom(index, lastIndex),
					value = result[rand];
				result[rand] = result[index], result[index] = value
			}
			return result.length = n, result
		}
		function shuffle(collection) {
			return sampleSize(collection, MAX_ARRAY_LENGTH)
		}
		function size(collection) {
			if (null == collection) return 0;
			if (isArrayLike(collection)) {
				var result = collection.length;
				return result && isString(collection) ? stringSize(collection) : result
			}
			if (isObjectLike(collection)) {
				var tag = getTag(collection);
				if (tag == mapTag || tag == setTag) return collection.size
			}
			return keys(collection).length
		}
		function some(collection, predicate, guard) {
			var func = isArray(collection) ? arraySome : baseSome;
			return guard && isIterateeCall(collection, predicate, guard) && (predicate = undefined), func(collection, getIteratee(predicate, 3))
		}
		function after(n, func) {
			if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
			return n = toInteger(n), function() {
				if (--n < 1) return func.apply(this, arguments)
			}
		}
		function ary(func, n, guard) {
			return n = guard ? undefined : n, n = func && null == n ? func.length : n, createWrapper(func, ARY_FLAG, undefined, undefined, undefined, undefined, n)
		}
		function before(n, func) {
			var result;
			if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
			return n = toInteger(n), function() {
				return --n > 0 && (result = func.apply(this, arguments)), n <= 1 && (func = undefined), result
			}
		}
		function curry(func, arity, guard) {
			arity = guard ? undefined : arity;
			var result = createWrapper(func, CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
			return result.placeholder = curry.placeholder, result
		}
		function curryRight(func, arity, guard) {
			arity = guard ? undefined : arity;
			var result = createWrapper(func, CURRY_RIGHT_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
			return result.placeholder = curryRight.placeholder, result
		}
		function debounce(func, wait, options) {
			function invokeFunc(time) {
				var args = lastArgs,
					thisArg = lastThis;
				return lastArgs = lastThis = undefined, lastInvokeTime = time, result = func.apply(thisArg, args)
			}
			function leadingEdge(time) {
				return lastInvokeTime = time, timerId = setTimeout(timerExpired, wait), leading ? invokeFunc(time) : result
			}
			function remainingWait(time) {
				var timeSinceLastCall = time - lastCallTime,
					timeSinceLastInvoke = time - lastInvokeTime,
					result = wait - timeSinceLastCall;
				return maxWait === !1 ? result : nativeMin(result, maxWait - timeSinceLastInvoke)
			}
			function shouldInvoke(time) {
				var timeSinceLastCall = time - lastCallTime,
					timeSinceLastInvoke = time - lastInvokeTime;
				return !lastCallTime || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxWait !== !1 && timeSinceLastInvoke >= maxWait
			}
			function timerExpired() {
				var time = now();
				return shouldInvoke(time) ? trailingEdge(time) : void(timerId = setTimeout(timerExpired, remainingWait(time)))
			}
			function trailingEdge(time) {
				return clearTimeout(timerId), timerId = undefined, trailing && lastArgs ? invokeFunc(time) : (lastArgs = lastThis = undefined, result)
			}
			function cancel() {
				timerId !== undefined && clearTimeout(timerId), lastCallTime = lastInvokeTime = 0, lastArgs = lastThis = timerId = undefined
			}
			function flush() {
				return timerId === undefined ? result : trailingEdge(now())
			}
			function debounced() {
				var time = now(),
					isInvoking = shouldInvoke(time);
				return lastArgs = arguments, lastThis = this, lastCallTime = time, isInvoking ? timerId === undefined ? leadingEdge(lastCallTime) : (clearTimeout(timerId), timerId = setTimeout(timerExpired, wait), invokeFunc(lastCallTime)) : result
			}
			var lastArgs, lastThis, result, timerId, lastCallTime = 0,
				lastInvokeTime = 0,
				leading = !1,
				maxWait = !1,
				trailing = !0;
			if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
			return wait = toNumber(wait) || 0, isObject(options) && (leading = !! options.leading, maxWait = "maxWait" in options && nativeMax(toNumber(options.maxWait) || 0, wait), trailing = "trailing" in options ? !! options.trailing : trailing), debounced.cancel = cancel, debounced.flush = flush, debounced
		}
		function flip(func) {
			return createWrapper(func, FLIP_FLAG)
		}
		function memoize(func, resolver) {
			if ("function" != typeof func || resolver && "function" != typeof resolver) throw new TypeError(FUNC_ERROR_TEXT);
			var memoized = function() {
					var args = arguments,
						key = resolver ? resolver.apply(this, args) : args[0],
						cache = memoized.cache;
					if (cache.has(key)) return cache.get(key);
					var result = func.apply(this, args);
					return memoized.cache = cache.set(key, result), result
				};
			return memoized.cache = new(memoize.Cache || MapCache), memoized
		}
		function negate(predicate) {
			if ("function" != typeof predicate) throw new TypeError(FUNC_ERROR_TEXT);
			return function() {
				return !predicate.apply(this, arguments)
			}
		}
		function once(func) {
			return before(2, func)
		}
		function rest(func, start) {
			if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
			return start = nativeMax(start === undefined ? func.length - 1 : toInteger(start), 0), function() {
				for (var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length); ++index < length;) array[index] = args[start + index];
				switch (start) {
				case 0:
					return func.call(this, array);
				case 1:
					return func.call(this, args[0], array);
				case 2:
					return func.call(this, args[0], args[1], array)
				}
				var otherArgs = Array(start + 1);
				for (index = -1; ++index < start;) otherArgs[index] = args[index];
				return otherArgs[start] = array, apply(func, this, otherArgs)
			}
		}
		function spread(func, start) {
			if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
			return start = start === undefined ? 0 : nativeMax(toInteger(start), 0), rest(function(args) {
				var array = args[start],
					otherArgs = args.slice(0, start);
				return array && arrayPush(otherArgs, array), apply(func, this, otherArgs)
			})
		}
		function throttle(func, wait, options) {
			var leading = !0,
				trailing = !0;
			if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
			return isObject(options) && (leading = "leading" in options ? !! options.leading : leading, trailing = "trailing" in options ? !! options.trailing : trailing), debounce(func, wait, {
				leading: leading,
				maxWait: wait,
				trailing: trailing
			})
		}
		function unary(func) {
			return ary(func, 1)
		}
		function wrap(value, wrapper) {
			return wrapper = null == wrapper ? identity : wrapper, partial(wrapper, value)
		}
		function castArray() {
			if (!arguments.length) return [];
			var value = arguments[0];
			return isArray(value) ? value : [value]
		}
		function clone(value) {
			return baseClone(value, !1, !0)
		}
		function cloneWith(value, customizer) {
			return baseClone(value, !1, !0, customizer)
		}
		function cloneDeep(value) {
			return baseClone(value, !0, !0)
		}
		function cloneDeepWith(value, customizer) {
			return baseClone(value, !0, !0, customizer)
		}
		function eq(value, other) {
			return value === other || value !== value && other !== other
		}
		function gt(value, other) {
			return value > other
		}
		function gte(value, other) {
			return value >= other
		}
		function isArguments(value) {
			return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag)
		}
		function isArrayBuffer(value) {
			return isObjectLike(value) && objectToString.call(value) == arrayBufferTag
		}
		function isArrayLike(value) {
			return null != value && isLength(getLength(value)) && !isFunction(value)
		}
		function isArrayLikeObject(value) {
			return isObjectLike(value) && isArrayLike(value)
		}
		function isBoolean(value) {
			return value === !0 || value === !1 || isObjectLike(value) && objectToString.call(value) == boolTag
		}
		function isDate(value) {
			return isObjectLike(value) && objectToString.call(value) == dateTag
		}
		function isElement(value) {
			return !!value && 1 === value.nodeType && isObjectLike(value) && !isPlainObject(value)
		}
		function isEmpty(value) {
			if (isArrayLike(value) && (isArray(value) || isString(value) || isFunction(value.splice) || isArguments(value) || isBuffer(value))) return !value.length;
			if (isObjectLike(value)) {
				var tag = getTag(value);
				if (tag == mapTag || tag == setTag) return !value.size
			}
			for (var key in value) if (hasOwnProperty.call(value, key)) return !1;
			return !(nonEnumShadows && keys(value).length)
		}
		function isEqual(value, other) {
			return baseIsEqual(value, other)
		}
		function isEqualWith(value, other, customizer) {
			customizer = "function" == typeof customizer ? customizer : undefined;
			var result = customizer ? customizer(value, other) : undefined;
			return result === undefined ? baseIsEqual(value, other, customizer) : !! result
		}
		function isError(value) {
			return !!isObjectLike(value) && (objectToString.call(value) == errorTag || "string" == typeof value.message && "string" == typeof value.name)
		}
		function isFinite(value) {
			return "number" == typeof value && nativeIsFinite(value)
		}
		function isFunction(value) {
			var tag = isObject(value) ? objectToString.call(value) : "";
			return tag == funcTag || tag == genTag
		}
		function isInteger(value) {
			return "number" == typeof value && value == toInteger(value)
		}
		function isLength(value) {
			return "number" == typeof value && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER
		}
		function isObject(value) {
			var type = typeof value;
			return !!value && ("object" == type || "function" == type)
		}
		function isObjectLike(value) {
			return !!value && "object" == typeof value
		}
		function isMap(value) {
			return isObjectLike(value) && getTag(value) == mapTag
		}
		function isMatch(object, source) {
			return object === source || baseIsMatch(object, source, getMatchData(source))
		}
		function isMatchWith(object, source, customizer) {
			return customizer = "function" == typeof customizer ? customizer : undefined, baseIsMatch(object, source, getMatchData(source), customizer)
		}
		function isNaN(value) {
			return isNumber(value) && value != +value
		}
		function isNative(value) {
			if (!isObject(value)) return !1;
			var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
			return pattern.test(toSource(value))
		}
		function isNull(value) {
			return null === value
		}
		function isNil(value) {
			return null == value
		}
		function isNumber(value) {
			return "number" == typeof value || isObjectLike(value) && objectToString.call(value) == numberTag
		}
		function isPlainObject(value) {
			if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) return !1;
			var proto = getPrototype(value);
			if (null === proto) return !0;
			var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
			return "function" == typeof Ctor && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString
		}
		function isRegExp(value) {
			return isObject(value) && objectToString.call(value) == regexpTag
		}
		function isSafeInteger(value) {
			return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER
		}
		function isSet(value) {
			return isObjectLike(value) && getTag(value) == setTag
		}
		function isString(value) {
			return "string" == typeof value || !isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag
		}
		function isSymbol(value) {
			return "symbol" == typeof value || isObjectLike(value) && objectToString.call(value) == symbolTag
		}
		function isTypedArray(value) {
			return isObjectLike(value) && isLength(value.length) && !! typedArrayTags[objectToString.call(value)]
		}
		function isUndefined(value) {
			return value === undefined
		}
		function isWeakMap(value) {
			return isObjectLike(value) && getTag(value) == weakMapTag
		}
		function isWeakSet(value) {
			return isObjectLike(value) && objectToString.call(value) == weakSetTag
		}
		function lt(value, other) {
			return value < other
		}
		function lte(value, other) {
			return value <= other
		}
		function toArray(value) {
			if (!value) return [];
			if (isArrayLike(value)) return isString(value) ? stringToArray(value) : copyArray(value);
			if (iteratorSymbol && value[iteratorSymbol]) return iteratorToArray(value[iteratorSymbol]());
			var tag = getTag(value),
				func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
			return func(value)
		}
		function toInteger(value) {
			if (!value) return 0 === value ? value : 0;
			if (value = toNumber(value), value === INFINITY || value === -INFINITY) {
				var sign = value < 0 ? -1 : 1;
				return sign * MAX_INTEGER
			}
			var remainder = value % 1;
			return value === value ? remainder ? value - remainder : value : 0
		}
		function toLength(value) {
			return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0
		}
		function toNumber(value) {
			if ("number" == typeof value) return value;
			if (isSymbol(value)) return NAN;
			if (isObject(value)) {
				var other = isFunction(value.valueOf) ? value.valueOf() : value;
				value = isObject(other) ? other + "" : other
			}
			if ("string" != typeof value) return 0 === value ? value : +value;
			value = value.replace(reTrim, "");
			var isBinary = reIsBinary.test(value);
			return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value
		}
		function toPlainObject(value) {
			return copyObject(value, keysIn(value))
		}
		function toSafeInteger(value) {
			return baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER)
		}
		function toString(value) {
			if ("string" == typeof value) return value;
			if (null == value) return "";
			if (isSymbol(value)) return symbolToString ? symbolToString.call(value) : "";
			var result = value + "";
			return "0" == result && 1 / value == -INFINITY ? "-0" : result
		}
		function create(prototype, properties) {
			var result = baseCreate(prototype);
			return properties ? baseAssign(result, properties) : result
		}
		function findKey(object, predicate) {
			return baseFind(object, getIteratee(predicate, 3), baseForOwn, !0)
		}
		function findLastKey(object, predicate) {
			return baseFind(object, getIteratee(predicate, 3), baseForOwnRight, !0)
		}
		function forIn(object, iteratee) {
			return null == object ? object : baseFor(object, getIteratee(iteratee), keysIn)
		}
		function forInRight(object, iteratee) {
			return null == object ? object : baseForRight(object, getIteratee(iteratee), keysIn)
		}
		function forOwn(object, iteratee) {
			return object && baseForOwn(object, getIteratee(iteratee))
		}
		function forOwnRight(object, iteratee) {
			return object && baseForOwnRight(object, getIteratee(iteratee))
		}
		function functions(object) {
			return null == object ? [] : baseFunctions(object, keys(object))
		}
		function functionsIn(object) {
			return null == object ? [] : baseFunctions(object, keysIn(object))
		}
		function get(object, path, defaultValue) {
			var result = null == object ? undefined : baseGet(object, path);
			return result === undefined ? defaultValue : result
		}
		function has(object, path) {
			return null != object && hasPath(object, path, baseHas)
		}
		function hasIn(object, path) {
			return null != object && hasPath(object, path, baseHasIn)
		}
		function keys(object) {
			var isProto = isPrototype(object);
			if (!isProto && !isArrayLike(object)) return baseKeys(object);
			var indexes = indexKeys(object),
				skipIndexes = !! indexes,
				result = indexes || [],
				length = result.length;
			for (var key in object)!baseHas(object, key) || skipIndexes && ("length" == key || isIndex(key, length)) || isProto && "constructor" == key || result.push(key);
			return result
		}
		function keysIn(object) {
			for (var index = -1, isProto = isPrototype(object), props = baseKeysIn(object), propsLength = props.length, indexes = indexKeys(object), skipIndexes = !! indexes, result = indexes || [], length = result.length; ++index < propsLength;) {
				var key = props[index];
				skipIndexes && ("length" == key || isIndex(key, length)) || "constructor" == key && (isProto || !hasOwnProperty.call(object, key)) || result.push(key)
			}
			return result
		}
		function mapKeys(object, iteratee) {
			var result = {};
			return iteratee = getIteratee(iteratee, 3), baseForOwn(object, function(value, key, object) {
				result[iteratee(value, key, object)] = value
			}), result
		}
		function mapValues(object, iteratee) {
			var result = {};
			return iteratee = getIteratee(iteratee, 3), baseForOwn(object, function(value, key, object) {
				result[key] = iteratee(value, key, object)
			}), result
		}
		function omitBy(object, predicate) {
			return predicate = getIteratee(predicate), basePickBy(object, function(value, key) {
				return !predicate(value, key)
			})
		}
		function pickBy(object, predicate) {
			return null == object ? {} : basePickBy(object, getIteratee(predicate))
		}
		function result(object, path, defaultValue) {
			path = isKey(path, object) ? [path] : baseCastPath(path);
			var index = -1,
				length = path.length;
			for (length || (object = undefined, length = 1); ++index < length;) {
				var value = null == object ? undefined : object[path[index]];
				value === undefined && (index = length, value = defaultValue), object = isFunction(value) ? value.call(object) : value
			}
			return object
		}
		function set(object, path, value) {
			return null == object ? object : baseSet(object, path, value)
		}
		function setWith(object, path, value, customizer) {
			return customizer = "function" == typeof customizer ? customizer : undefined, null == object ? object : baseSet(object, path, value, customizer)
		}
		function toPairs(object) {
			return baseToPairs(object, keys(object))
		}
		function toPairsIn(object) {
			return baseToPairs(object, keysIn(object))
		}
		function transform(object, iteratee, accumulator) {
			var isArr = isArray(object) || isTypedArray(object);
			if (iteratee = getIteratee(iteratee, 4), null == accumulator) if (isArr || isObject(object)) {
				var Ctor = object.constructor;
				accumulator = isArr ? isArray(object) ? new Ctor : [] : isFunction(Ctor) ? baseCreate(getPrototype(object)) : {}
			} else accumulator = {};
			return (isArr ? arrayEach : baseForOwn)(object, function(value, index, object) {
				return iteratee(accumulator, value, index, object)
			}), accumulator
		}
		function unset(object, path) {
			return null == object || baseUnset(object, path)
		}
		function update(object, path, updater) {
			return null == object ? object : baseUpdate(object, path, baseCastFunction(updater))
		}
		function updateWith(object, path, updater, customizer) {
			return customizer = "function" == typeof customizer ? customizer : undefined, null == object ? object : baseUpdate(object, path, baseCastFunction(updater), customizer)
		}
		function values(object) {
			return object ? baseValues(object, keys(object)) : []
		}
		function valuesIn(object) {
			return null == object ? [] : baseValues(object, keysIn(object))
		}
		function clamp(number, lower, upper) {
			return upper === undefined && (upper = lower, lower = undefined), upper !== undefined && (upper = toNumber(upper), upper = upper === upper ? upper : 0), lower !== undefined && (lower = toNumber(lower), lower = lower === lower ? lower : 0), baseClamp(toNumber(number), lower, upper)
		}
		function inRange(number, start, end) {
			return start = toNumber(start) || 0, end === undefined ? (end = start, start = 0) : end = toNumber(end) || 0, number = toNumber(number), baseInRange(number, start, end)
		}
		function random(lower, upper, floating) {
			if (floating && "boolean" != typeof floating && isIterateeCall(lower, upper, floating) && (upper = floating = undefined), floating === undefined && ("boolean" == typeof upper ? (floating = upper, upper = undefined) : "boolean" == typeof lower && (floating = lower, lower = undefined)), lower === undefined && upper === undefined ? (lower = 0, upper = 1) : (lower = toNumber(lower) || 0, upper === undefined ? (upper = lower, lower = 0) : upper = toNumber(upper) || 0), lower > upper) {
				var temp = lower;
				lower = upper, upper = temp
			}
			if (floating || lower % 1 || upper % 1) {
				var rand = nativeRandom();
				return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper)
			}
			return baseRandom(lower, upper)
		}
		function capitalize(string) {
			return upperFirst(toString(string).toLowerCase())
		}
		function deburr(string) {
			return string = toString(string), string && string.replace(reLatin1, deburrLetter).replace(reComboMark, "")
		}
		function endsWith(string, target, position) {
			string = toString(string), target = "string" == typeof target ? target : target + "";
			var length = string.length;
			return position = position === undefined ? length : baseClamp(toInteger(position), 0, length), position -= target.length, position >= 0 && string.indexOf(target, position) == position
		}
		function escape(string) {
			return string = toString(string), string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string
		}
		function escapeRegExp(string) {
			return string = toString(string), string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string
		}
		function pad(string, length, chars) {
			string = toString(string), length = toInteger(length);
			var strLength = length ? stringSize(string) : 0;
			if (!length || strLength >= length) return string;
			var mid = (length - strLength) / 2;
			return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars)
		}
		function padEnd(string, length, chars) {
			string = toString(string), length = toInteger(length);
			var strLength = length ? stringSize(string) : 0;
			return length && strLength < length ? string + createPadding(length - strLength, chars) : string
		}
		function padStart(string, length, chars) {
			string = toString(string), length = toInteger(length);
			var strLength = length ? stringSize(string) : 0;
			return length && strLength < length ? createPadding(length - strLength, chars) + string : string
		}
		function parseInt(string, radix, guard) {
			return guard || null == radix ? radix = 0 : radix && (radix = +radix), string = toString(string).replace(reTrim, ""), nativeParseInt(string, radix || (reHasHexPrefix.test(string) ? 16 : 10))
		}
		function repeat(string, n, guard) {
			return n = (guard ? isIterateeCall(string, n, guard) : n === undefined) ? 1 : toInteger(n), baseRepeat(toString(string), n)
		}
		function replace() {
			var args = arguments,
				string = toString(args[0]);
			return args.length < 3 ? string : string.replace(args[1], args[2])
		}
		function split(string, separator, limit) {
			return toString(string).split(separator, limit)
		}
		function startsWith(string, target, position) {
			return string = toString(string), position = baseClamp(toInteger(position), 0, string.length), string.lastIndexOf(target, position) == position
		}
		function template(string, options, guard) {
			var settings = lodash.templateSettings;
			guard && isIterateeCall(string, options, guard) && (options = undefined), string = toString(string), options = assignInWith({}, options, settings, assignInDefaults);
			var isEscaping, isEvaluating, imports = assignInWith({}, options.imports, settings.imports, assignInDefaults),
				importsKeys = keys(imports),
				importsValues = baseValues(imports, importsKeys),
				index = 0,
				interpolate = options.interpolate || reNoMatch,
				source = "__p += '",
				reDelimiters = RegExp((options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$", "g"),
				sourceURL = "//# sourceURL=" + ("sourceURL" in options ? options.sourceURL : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
			string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
				return interpolateValue || (interpolateValue = esTemplateValue), source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar), escapeValue && (isEscaping = !0, source += "' +\n__e(" + escapeValue + ") +\n'"), evaluateValue && (isEvaluating = !0, source += "';\n" + evaluateValue + ";\n__p += '"), interpolateValue && (source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'"), index = offset + match.length, match
			}), source += "';\n";
			var variable = options.variable;
			variable || (source = "with (obj) {\n" + source + "\n}\n"), source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;"), source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
			var result = attempt(function() {
				return Function(importsKeys, sourceURL + "return " + source).apply(undefined, importsValues)
			});
			if (result.source = source, isError(result)) throw result;
			return result
		}
		function toLower(value) {
			return toString(value).toLowerCase()
		}
		function toUpper(value) {
			return toString(value).toUpperCase()
		}
		function trim(string, chars, guard) {
			if (string = toString(string), !string) return string;
			if (guard || chars === undefined) return string.replace(reTrim, "");
			if (chars += "", !chars) return string;
			var strSymbols = stringToArray(string),
				chrSymbols = stringToArray(chars);
			return strSymbols.slice(charsStartIndex(strSymbols, chrSymbols), charsEndIndex(strSymbols, chrSymbols) + 1).join("")
		}
		function trimEnd(string, chars, guard) {
			if (string = toString(string), !string) return string;
			if (guard || chars === undefined) return string.replace(reTrimEnd, "");
			if (chars += "", !chars) return string;
			var strSymbols = stringToArray(string);
			return strSymbols.slice(0, charsEndIndex(strSymbols, stringToArray(chars)) + 1).join("")
		}
		function trimStart(string, chars, guard) {
			if (string = toString(string), !string) return string;
			if (guard || chars === undefined) return string.replace(reTrimStart, "");
			if (chars += "", !chars) return string;
			var strSymbols = stringToArray(string);
			return strSymbols.slice(charsStartIndex(strSymbols, stringToArray(chars))).join("")
		}
		function truncate(string, options) {
			var length = DEFAULT_TRUNC_LENGTH,
				omission = DEFAULT_TRUNC_OMISSION;
			if (isObject(options)) {
				var separator = "separator" in options ? options.separator : separator;
				length = "length" in options ? toInteger(options.length) : length, omission = "omission" in options ? toString(options.omission) : omission
			}
			string = toString(string);
			var strLength = string.length;
			if (reHasComplexSymbol.test(string)) {
				var strSymbols = stringToArray(string);
				strLength = strSymbols.length
			}
			if (length >= strLength) return string;
			var end = length - stringSize(omission);
			if (end < 1) return omission;
			var result = strSymbols ? strSymbols.slice(0, end).join("") : string.slice(0, end);
			if (separator === undefined) return result + omission;
			if (strSymbols && (end += result.length - end), isRegExp(separator)) {
				if (string.slice(end).search(separator)) {
					var match, substring = result;
					for (separator.global || (separator = RegExp(separator.source, toString(reFlags.exec(separator)) + "g")), separator.lastIndex = 0; match = separator.exec(substring);) var newEnd = match.index;
					result = result.slice(0, newEnd === undefined ? end : newEnd)
				}
			} else if (string.indexOf(separator, end) != end) {
				var index = result.lastIndexOf(separator);
				index > -1 && (result = result.slice(0, index))
			}
			return result + omission
		}
		function unescape(string) {
			return string = toString(string), string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string
		}
		function words(string, pattern, guard) {
			return string = toString(string), pattern = guard ? undefined : pattern, pattern === undefined && (pattern = reHasComplexWord.test(string) ? reComplexWord : reBasicWord), string.match(pattern) || []
		}
		function cond(pairs) {
			var length = pairs ? pairs.length : 0,
				toIteratee = getIteratee();
			return pairs = length ? arrayMap(pairs, function(pair) {
				if ("function" != typeof pair[1]) throw new TypeError(FUNC_ERROR_TEXT);
				return [toIteratee(pair[0]), pair[1]]
			}) : [], rest(function(args) {
				for (var index = -1; ++index < length;) {
					var pair = pairs[index];
					if (apply(pair[0], this, args)) return apply(pair[1], this, args)
				}
			})
		}
		function conforms(source) {
			return baseConforms(baseClone(source, !0))
		}
		function constant(value) {
			return function() {
				return value
			}
		}
		function identity(value) {
			return value
		}
		function iteratee(func) {
			return baseIteratee("function" == typeof func ? func : baseClone(func, !0))
		}
		function matches(source) {
			return baseMatches(baseClone(source, !0))
		}
		function matchesProperty(path, srcValue) {
			return baseMatchesProperty(path, baseClone(srcValue, !0))
		}
		function mixin(object, source, options) {
			var props = keys(source),
				methodNames = baseFunctions(source, props);
			null != options || isObject(source) && (methodNames.length || !props.length) || (options = source, source = object, object = this, methodNames = baseFunctions(source, keys(source)));
			var chain = !(isObject(options) && "chain" in options) || options.chain,
				isFunc = isFunction(object);
			return arrayEach(methodNames, function(methodName) {
				var func = source[methodName];
				object[methodName] = func, isFunc && (object.prototype[methodName] = function() {
					var chainAll = this.__chain__;
					if (chain || chainAll) {
						var result = object(this.__wrapped__),
							actions = result.__actions__ = copyArray(this.__actions__);
						return actions.push({
							func: func,
							args: arguments,
							thisArg: object
						}), result.__chain__ = chainAll, result
					}
					return func.apply(object, arrayPush([this.value()], arguments))
				})
			}), object
		}
		function noConflict() {
			return root._ === this && (root._ = oldDash), this
		}
		function noop() {}
		function nthArg(n) {
			return n = toInteger(n), function() {
				return arguments[n]
			}
		}
		function property(path) {
			return isKey(path) ? baseProperty(path) : basePropertyDeep(path)
		}
		function propertyOf(object) {
			return function(path) {
				return null == object ? undefined : baseGet(object, path)
			}
		}
		function times(n, iteratee) {
			if (n = toInteger(n), n < 1 || n > MAX_SAFE_INTEGER) return [];
			var index = MAX_ARRAY_LENGTH,
				length = nativeMin(n, MAX_ARRAY_LENGTH);
			iteratee = getIteratee(iteratee), n -= MAX_ARRAY_LENGTH;
			for (var result = baseTimes(length, iteratee); ++index < n;) iteratee(index);
			return result
		}
		function toPath(value) {
			return isArray(value) ? arrayMap(value, baseCastKey) : isSymbol(value) ? [value] : copyArray(stringToPath(value))
		}
		function uniqueId(prefix) {
			var id = ++idCounter;
			return toString(prefix) + id
		}
		function max(array) {
			return array && array.length ? baseExtremum(array, identity, gt) : undefined
		}
		function maxBy(array, iteratee) {
			return array && array.length ? baseExtremum(array, getIteratee(iteratee), gt) : undefined
		}
		function mean(array) {
			return baseMean(array, identity)
		}
		function meanBy(array, iteratee) {
			return baseMean(array, getIteratee(iteratee))
		}
		function min(array) {
			return array && array.length ? baseExtremum(array, identity, lt) : undefined
		}
		function minBy(array, iteratee) {
			return array && array.length ? baseExtremum(array, getIteratee(iteratee), lt) : undefined
		}
		function sum(array) {
			return array && array.length ? baseSum(array, identity) : 0
		}
		function sumBy(array, iteratee) {
			return array && array.length ? baseSum(array, getIteratee(iteratee)) : 0
		}
		context = context ? _.defaults({}, context, _.pick(root, contextProps)) : root;
		var Date = context.Date,
			Error = context.Error,
			Math = context.Math,
			RegExp = context.RegExp,
			TypeError = context.TypeError,
			arrayProto = context.Array.prototype,
			objectProto = context.Object.prototype,
			funcToString = context.Function.prototype.toString,
			hasOwnProperty = objectProto.hasOwnProperty,
			idCounter = 0,
			objectCtorString = funcToString.call(Object),
			objectToString = objectProto.toString,
			oldDash = root._,
			reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
			Buffer = moduleExports ? context.Buffer : undefined,
			Reflect = context.Reflect,
			Symbol = context.Symbol,
			Uint8Array = context.Uint8Array,
			clearTimeout = context.clearTimeout,
			enumerate = Reflect ? Reflect.enumerate : undefined,
			getOwnPropertySymbols = Object.getOwnPropertySymbols,
			iteratorSymbol = "symbol" == typeof(iteratorSymbol = Symbol && Symbol.iterator) ? iteratorSymbol : undefined,
			objectCreate = Object.create,
			propertyIsEnumerable = objectProto.propertyIsEnumerable,
			setTimeout = context.setTimeout,
			splice = arrayProto.splice,
			nativeCeil = Math.ceil,
			nativeFloor = Math.floor,
			nativeGetPrototype = Object.getPrototypeOf,
			nativeIsFinite = context.isFinite,
			nativeJoin = arrayProto.join,
			nativeKeys = Object.keys,
			nativeMax = Math.max,
			nativeMin = Math.min,
			nativeParseInt = context.parseInt,
			nativeRandom = Math.random,
			nativeReverse = arrayProto.reverse,
			DataView = getNative(context, "DataView"),
			Map = getNative(context, "Map"),
			Promise = getNative(context, "Promise"),
			Set = getNative(context, "Set"),
			WeakMap = getNative(context, "WeakMap"),
			nativeCreate = getNative(Object, "create"),
			metaMap = WeakMap && new WeakMap,
			nonEnumShadows = !propertyIsEnumerable.call({
				valueOf: 1
			}, "valueOf"),
			realNames = {},
			dataViewCtorString = toSource(DataView),
			mapCtorString = toSource(Map),
			promiseCtorString = toSource(Promise),
			setCtorString = toSource(Set),
			weakMapCtorString = toSource(WeakMap),
			symbolProto = Symbol ? Symbol.prototype : undefined,
			symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
			symbolToString = symbolProto ? symbolProto.toString : undefined;
		lodash.templateSettings = {
			escape: reEscape,
			evaluate: reEvaluate,
			interpolate: reInterpolate,
			variable: "",
			imports: {
				_: lodash
			}
		}, lodash.prototype = baseLodash.prototype, lodash.prototype.constructor = lodash, LodashWrapper.prototype = baseCreate(baseLodash.prototype), LodashWrapper.prototype.constructor = LodashWrapper, LazyWrapper.prototype = baseCreate(baseLodash.prototype), LazyWrapper.prototype.constructor = LazyWrapper, Hash.prototype = nativeCreate ? nativeCreate(null) : objectProto, MapCache.prototype.clear = mapClear, MapCache.prototype.delete = mapDelete, MapCache.prototype.get = mapGet, MapCache.prototype.has = mapHas, MapCache.prototype.set = mapSet, SetCache.prototype.push = cachePush, Stack.prototype.clear = stackClear, Stack.prototype.delete = stackDelete, Stack.prototype.get = stackGet, Stack.prototype.has = stackHas, Stack.prototype.set = stackSet;
		var baseEach = createBaseEach(baseForOwn),
			baseEachRight = createBaseEach(baseForOwnRight, !0),
			baseFor = createBaseFor(),
			baseForRight = createBaseFor(!0);
		enumerate && !propertyIsEnumerable.call({
			valueOf: 1
		}, "valueOf") && (baseKeysIn = function(object) {
			return iteratorToArray(enumerate(object))
		});
		var baseSetData = metaMap ?
		function(func, data) {
			return metaMap.set(func, data), func
		} : identity, createSet = Set && 2 === new Set([1, 2]).size ?
		function(values) {
			return new Set(values)
		} : noop, getData = metaMap ?
		function(func) {
			return metaMap.get(func)
		} : noop, getLength = baseProperty("length");
		getOwnPropertySymbols || (getSymbols = function() {
			return []
		});
		var getSymbolsIn = getOwnPropertySymbols ?
		function(object) {
			for (var result = []; object;) arrayPush(result, getSymbols(object)), object = getPrototype(object);
			return result
		} : getSymbols;
		(DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set) != setTag || WeakMap && getTag(new WeakMap) != weakMapTag) && (getTag = function(value) {
			var result = objectToString.call(value),
				Ctor = result == objectTag ? value.constructor : null,
				ctorString = toSource(Ctor);
			if (ctorString) switch (ctorString) {
			case dataViewCtorString:
				return dataViewTag;
			case mapCtorString:
				return mapTag;
			case promiseCtorString:
				return promiseTag;
			case setCtorString:
				return setTag;
			case weakMapCtorString:
				return weakMapTag
			}
			return result
		});
		var setData = function() {
				var count = 0,
					lastCalled = 0;
				return function(key, value) {
					var stamp = now(),
						remaining = HOT_SPAN - (stamp - lastCalled);
					if (lastCalled = stamp, remaining > 0) {
						if (++count >= HOT_COUNT) return key
					} else count = 0;
					return baseSetData(key, value)
				}
			}(),
			stringToPath = memoize(function(string) {
				var result = [];
				return toString(string).replace(rePropName, function(match, number, quote, string) {
					result.push(quote ? string.replace(reEscapeChar, "$1") : number || match)
				}), result
			}),
			difference = rest(function(array, values) {
				return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, !0)) : []
			}),
			differenceBy = rest(function(array, values) {
				var iteratee = last(values);
				return isArrayLikeObject(iteratee) && (iteratee = undefined), isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, !0), getIteratee(iteratee)) : []
			}),
			differenceWith = rest(function(array, values) {
				var comparator = last(values);
				return isArrayLikeObject(comparator) && (comparator = undefined), isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, !0), undefined, comparator) : []
			}),
			intersection = rest(function(arrays) {
				var mapped = arrayMap(arrays, baseCastArrayLikeObject);
				return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : []
			}),
			intersectionBy = rest(function(arrays) {
				var iteratee = last(arrays),
					mapped = arrayMap(arrays, baseCastArrayLikeObject);
				return iteratee === last(mapped) ? iteratee = undefined : mapped.pop(), mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee)) : []
			}),
			intersectionWith = rest(function(arrays) {
				var comparator = last(arrays),
					mapped = arrayMap(arrays, baseCastArrayLikeObject);
				return comparator === last(mapped) ? comparator = undefined : mapped.pop(), mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined, comparator) : []
			}),
			pull = rest(pullAll),
			pullAt = rest(function(array, indexes) {
				indexes = arrayMap(baseFlatten(indexes, 1), String);
				var result = baseAt(array, indexes);
				return basePullAt(array, indexes.sort(compareAscending)), result
			}),
			union = rest(function(arrays) {
				return baseUniq(baseFlatten(arrays, 1, !0))
			}),
			unionBy = rest(function(arrays) {
				var iteratee = last(arrays);
				return isArrayLikeObject(iteratee) && (iteratee = undefined), baseUniq(baseFlatten(arrays, 1, !0), getIteratee(iteratee))
			}),
			unionWith = rest(function(arrays) {
				var comparator = last(arrays);
				return isArrayLikeObject(comparator) && (comparator = undefined), baseUniq(baseFlatten(arrays, 1, !0), undefined, comparator)
			}),
			without = rest(function(array, values) {
				return isArrayLikeObject(array) ? baseDifference(array, values) : []
			}),
			xor = rest(function(arrays) {
				return baseXor(arrayFilter(arrays, isArrayLikeObject))
			}),
			xorBy = rest(function(arrays) {
				var iteratee = last(arrays);
				return isArrayLikeObject(iteratee) && (iteratee = undefined), baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee))
			}),
			xorWith = rest(function(arrays) {
				var comparator = last(arrays);
				return isArrayLikeObject(comparator) && (comparator = undefined), baseXor(arrayFilter(arrays, isArrayLikeObject), undefined, comparator)
			}),
			zip = rest(unzip),
			zipWith = rest(function(arrays) {
				var length = arrays.length,
					iteratee = length > 1 ? arrays[length - 1] : undefined;
				return iteratee = "function" == typeof iteratee ? (arrays.pop(), iteratee) : undefined, unzipWith(arrays, iteratee)
			}),
			wrapperAt = rest(function(paths) {
				paths = baseFlatten(paths, 1);
				var length = paths.length,
					start = length ? paths[0] : 0,
					value = this.__wrapped__,
					interceptor = function(object) {
						return baseAt(object, paths)
					};
				return !(length > 1 || this.__actions__.length) && value instanceof LazyWrapper && isIndex(start) ? (value = value.slice(start, +start + (length ? 1 : 0)), value.__actions__.push({
					func: thru,
					args: [interceptor],
					thisArg: undefined
				}), new LodashWrapper(value, this.__chain__).thru(function(array) {
					return length && !array.length && array.push(undefined), array
				})) : this.thru(interceptor)
			}),
			countBy = createAggregator(function(result, value, key) {
				hasOwnProperty.call(result, key) ? ++result[key] : result[key] = 1
			}),
			groupBy = createAggregator(function(result, value, key) {
				hasOwnProperty.call(result, key) ? result[key].push(value) : result[key] = [value]
			}),
			invokeMap = rest(function(collection, path, args) {
				var index = -1,
					isFunc = "function" == typeof path,
					isProp = isKey(path),
					result = isArrayLike(collection) ? Array(collection.length) : [];
				return baseEach(collection, function(value) {
					var func = isFunc ? path : isProp && null != value ? value[path] : undefined;
					result[++index] = func ? apply(func, value, args) : baseInvoke(value, path, args)
				}), result
			}),
			keyBy = createAggregator(function(result, value, key) {
				result[key] = value
			}),
			partition = createAggregator(function(result, value, key) {
				result[key ? 0 : 1].push(value)
			}, function() {
				return [[], []]
			}),
			sortBy = rest(function(collection, iteratees) {
				if (null == collection) return [];
				var length = iteratees.length;
				return length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1]) ? iteratees = [] : length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2]) && (iteratees.length = 1), baseOrderBy(collection, baseFlatten(iteratees, 1), [])
			}),
			now = Date.now,
			bind = rest(function(func, thisArg, partials) {
				var bitmask = BIND_FLAG;
				if (partials.length) {
					var holders = replaceHolders(partials, getPlaceholder(bind));
					bitmask |= PARTIAL_FLAG
				}
				return createWrapper(func, bitmask, thisArg, partials, holders)
			}),
			bindKey = rest(function(object, key, partials) {
				var bitmask = BIND_FLAG | BIND_KEY_FLAG;
				if (partials.length) {
					var holders = replaceHolders(partials, getPlaceholder(bindKey));
					bitmask |= PARTIAL_FLAG
				}
				return createWrapper(key, bitmask, object, partials, holders)
			}),
			defer = rest(function(func, args) {
				return baseDelay(func, 1, args)
			}),
			delay = rest(function(func, wait, args) {
				return baseDelay(func, toNumber(wait) || 0, args)
			});
		memoize.Cache = MapCache;
		var overArgs = rest(function(func, transforms) {
			transforms = arrayMap(baseFlatten(transforms, 1), getIteratee());
			var funcsLength = transforms.length;
			return rest(function(args) {
				for (var index = -1, length = nativeMin(args.length, funcsLength); ++index < length;) args[index] = transforms[index].call(this, args[index]);
				return apply(func, this, args)
			})
		}),
			partial = rest(function(func, partials) {
				var holders = replaceHolders(partials, getPlaceholder(partial));
				return createWrapper(func, PARTIAL_FLAG, undefined, partials, holders)
			}),
			partialRight = rest(function(func, partials) {
				var holders = replaceHolders(partials, getPlaceholder(partialRight));
				return createWrapper(func, PARTIAL_RIGHT_FLAG, undefined, partials, holders)
			}),
			rearg = rest(function(func, indexes) {
				return createWrapper(func, REARG_FLAG, undefined, undefined, undefined, baseFlatten(indexes, 1))
			}),
			isArray = Array.isArray,
			isBuffer = Buffer ?
		function(value) {
			return value instanceof Buffer
		} : constant(!1), assign = createAssigner(function(object, source) {
			if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) return void copyObject(source, keys(source), object);
			for (var key in source) hasOwnProperty.call(source, key) && assignValue(object, key, source[key])
		}), assignIn = createAssigner(function(object, source) {
			if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) return void copyObject(source, keysIn(source), object);
			for (var key in source) assignValue(object, key, source[key])
		}), assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
			copyObjectWith(source, keysIn(source), object, customizer)
		}), assignWith = createAssigner(function(object, source, srcIndex, customizer) {
			copyObjectWith(source, keys(source), object, customizer)
		}), at = rest(function(object, paths) {
			return baseAt(object, baseFlatten(paths, 1))
		}), defaults = rest(function(args) {
			return args.push(undefined, assignInDefaults), apply(assignInWith, undefined, args)
		}), defaultsDeep = rest(function(args) {
			return args.push(undefined, mergeDefaults), apply(mergeWith, undefined, args)
		}), invert = createInverter(function(result, value, key) {
			result[value] = key
		}, constant(identity)), invertBy = createInverter(function(result, value, key) {
			hasOwnProperty.call(result, value) ? result[value].push(key) : result[value] = [key]
		}, getIteratee), invoke = rest(baseInvoke), merge = createAssigner(function(object, source, srcIndex) {
			baseMerge(object, source, srcIndex)
		}), mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
			baseMerge(object, source, srcIndex, customizer)
		}), omit = rest(function(object, props) {
			return null == object ? {} : (props = arrayMap(baseFlatten(props, 1), baseCastKey), basePick(object, baseDifference(getAllKeysIn(object), props)))
		}), pick = rest(function(object, props) {
			return null == object ? {} : basePick(object, baseFlatten(props, 1))
		}), camelCase = createCompounder(function(result, word, index) {
			return word = word.toLowerCase(), result + (index ? capitalize(word) : word)
		}), kebabCase = createCompounder(function(result, word, index) {
			return result + (index ? "-" : "") + word.toLowerCase()
		}), lowerCase = createCompounder(function(result, word, index) {
			return result + (index ? " " : "") + word.toLowerCase()
		}), lowerFirst = createCaseFirst("toLowerCase"), snakeCase = createCompounder(function(result, word, index) {
			return result + (index ? "_" : "") + word.toLowerCase()
		}), startCase = createCompounder(function(result, word, index) {
			return result + (index ? " " : "") + upperFirst(word)
		}), upperCase = createCompounder(function(result, word, index) {
			return result + (index ? " " : "") + word.toUpperCase()
		}), upperFirst = createCaseFirst("toUpperCase"), attempt = rest(function(func, args) {
			try {
				return apply(func, undefined, args)
			} catch (e) {
				return isError(e) ? e : new Error(e)
			}
		}), bindAll = rest(function(object, methodNames) {
			return arrayEach(baseFlatten(methodNames, 1), function(key) {
				object[key] = bind(object[key], object)
			}), object
		}), flow = createFlow(), flowRight = createFlow(!0), method = rest(function(path, args) {
			return function(object) {
				return baseInvoke(object, path, args)
			}
		}), methodOf = rest(function(object, args) {
			return function(path) {
				return baseInvoke(object, path, args)
			}
		}), over = createOver(arrayMap), overEvery = createOver(arrayEvery), overSome = createOver(arraySome), range = createRange(), rangeRight = createRange(!0), add = createMathOperation(function(augend, addend) {
			return augend + addend
		}), ceil = createRound("ceil"), divide = createMathOperation(function(dividend, divisor) {
			return dividend / divisor
		}), floor = createRound("floor"), multiply = createMathOperation(function(multiplier, multiplicand) {
			return multiplier * multiplicand
		}), round = createRound("round"), subtract = createMathOperation(function(minuend, subtrahend) {
			return minuend - subtrahend
		});
		return lodash.after = after, lodash.ary = ary, lodash.assign = assign, lodash.assignIn = assignIn, lodash.assignInWith = assignInWith, lodash.assignWith = assignWith, lodash.at = at, lodash.before = before, lodash.bind = bind, lodash.bindAll = bindAll, lodash.bindKey = bindKey, lodash.castArray = castArray, lodash.chain = chain, lodash.chunk = chunk, lodash.compact = compact, lodash.concat = concat, lodash.cond = cond, lodash.conforms = conforms, lodash.constant = constant, lodash.countBy = countBy, lodash.create = create, lodash.curry = curry, lodash.curryRight = curryRight, lodash.debounce = debounce, lodash.defaults = defaults, lodash.defaultsDeep = defaultsDeep, lodash.defer = defer, lodash.delay = delay, lodash.difference = difference, lodash.differenceBy = differenceBy, lodash.differenceWith = differenceWith, lodash.drop = drop, lodash.dropRight = dropRight, lodash.dropRightWhile = dropRightWhile, lodash.dropWhile = dropWhile, lodash.fill = fill, lodash.filter = filter, lodash.flatMap = flatMap, lodash.flatMapDeep = flatMapDeep, lodash.flatMapDepth = flatMapDepth, lodash.flatten = flatten, lodash.flattenDeep = flattenDeep, lodash.flattenDepth = flattenDepth, lodash.flip = flip, lodash.flow = flow, lodash.flowRight = flowRight, lodash.fromPairs = fromPairs, lodash.functions = functions, lodash.functionsIn = functionsIn, lodash.groupBy = groupBy, lodash.initial = initial, lodash.intersection = intersection, lodash.intersectionBy = intersectionBy, lodash.intersectionWith = intersectionWith, lodash.invert = invert, lodash.invertBy = invertBy, lodash.invokeMap = invokeMap, lodash.iteratee = iteratee, lodash.keyBy = keyBy, lodash.keys = keys, lodash.keysIn = keysIn, lodash.map = map, lodash.mapKeys = mapKeys, lodash.mapValues = mapValues, lodash.matches = matches, lodash.matchesProperty = matchesProperty, lodash.memoize = memoize, lodash.merge = merge, lodash.mergeWith = mergeWith, lodash.method = method, lodash.methodOf = methodOf, lodash.mixin = mixin, lodash.negate = negate, lodash.nthArg = nthArg, lodash.omit = omit, lodash.omitBy = omitBy, lodash.once = once, lodash.orderBy = orderBy, lodash.over = over, lodash.overArgs = overArgs, lodash.overEvery = overEvery, lodash.overSome = overSome, lodash.partial = partial, lodash.partialRight = partialRight, lodash.partition = partition, lodash.pick = pick, lodash.pickBy = pickBy, lodash.property = property, lodash.propertyOf = propertyOf, lodash.pull = pull, lodash.pullAll = pullAll, lodash.pullAllBy = pullAllBy, lodash.pullAllWith = pullAllWith, lodash.pullAt = pullAt, lodash.range = range, lodash.rangeRight = rangeRight, lodash.rearg = rearg, lodash.reject = reject, lodash.remove = remove, lodash.rest = rest, lodash.reverse = reverse, lodash.sampleSize = sampleSize, lodash.set = set, lodash.setWith = setWith, lodash.shuffle = shuffle, lodash.slice = slice, lodash.sortBy = sortBy, lodash.sortedUniq = sortedUniq, lodash.sortedUniqBy = sortedUniqBy, lodash.split = split, lodash.spread = spread, lodash.tail = tail, lodash.take = take, lodash.takeRight = takeRight, lodash.takeRightWhile = takeRightWhile, lodash.takeWhile = takeWhile, lodash.tap = tap, lodash.throttle = throttle, lodash.thru = thru, lodash.toArray = toArray, lodash.toPairs = toPairs, lodash.toPairsIn = toPairsIn, lodash.toPath = toPath, lodash.toPlainObject = toPlainObject, lodash.transform = transform, lodash.unary = unary, lodash.union = union, lodash.unionBy = unionBy, lodash.unionWith = unionWith, lodash.uniq = uniq, lodash.uniqBy = uniqBy, lodash.uniqWith = uniqWith, lodash.unset = unset, lodash.unzip = unzip, lodash.unzipWith = unzipWith, lodash.update = update, lodash.updateWith = updateWith, lodash.values = values, lodash.valuesIn = valuesIn, lodash.without = without, lodash.words = words, lodash.wrap = wrap, lodash.xor = xor, lodash.xorBy = xorBy, lodash.xorWith = xorWith, lodash.zip = zip, lodash.zipObject = zipObject, lodash.zipObjectDeep = zipObjectDeep, lodash.zipWith = zipWith, lodash.entries = toPairs, lodash.entriesIn = toPairsIn, lodash.extend = assignIn, lodash.extendWith = assignInWith, mixin(lodash, lodash), lodash.add = add, lodash.attempt = attempt, lodash.camelCase = camelCase, lodash.capitalize = capitalize, lodash.ceil = ceil, lodash.clamp = clamp, lodash.clone = clone, lodash.cloneDeep = cloneDeep, lodash.cloneDeepWith = cloneDeepWith, lodash.cloneWith = cloneWith, lodash.deburr = deburr, lodash.divide = divide, lodash.endsWith = endsWith, lodash.eq = eq, lodash.escape = escape, lodash.escapeRegExp = escapeRegExp, lodash.every = every, lodash.find = find, lodash.findIndex = findIndex, lodash.findKey = findKey, lodash.findLast = findLast, lodash.findLastIndex = findLastIndex, lodash.findLastKey = findLastKey, lodash.floor = floor, lodash.forEach = forEach, lodash.forEachRight = forEachRight, lodash.forIn = forIn, lodash.forInRight = forInRight, lodash.forOwn = forOwn, lodash.forOwnRight = forOwnRight, lodash.get = get, lodash.gt = gt, lodash.gte = gte, lodash.has = has, lodash.hasIn = hasIn, lodash.head = head, lodash.identity = identity, lodash.includes = includes, lodash.indexOf = indexOf, lodash.inRange = inRange, lodash.invoke = invoke, lodash.isArguments = isArguments, lodash.isArray = isArray, lodash.isArrayBuffer = isArrayBuffer, lodash.isArrayLike = isArrayLike, lodash.isArrayLikeObject = isArrayLikeObject, lodash.isBoolean = isBoolean, lodash.isBuffer = isBuffer, lodash.isDate = isDate, lodash.isElement = isElement, lodash.isEmpty = isEmpty, lodash.isEqual = isEqual, lodash.isEqualWith = isEqualWith, lodash.isError = isError, lodash.isFinite = isFinite, lodash.isFunction = isFunction, lodash.isInteger = isInteger, lodash.isLength = isLength, lodash.isMap = isMap, lodash.isMatch = isMatch, lodash.isMatchWith = isMatchWith, lodash.isNaN = isNaN, lodash.isNative = isNative, lodash.isNil = isNil, lodash.isNull = isNull, lodash.isNumber = isNumber, lodash.isObject = isObject, lodash.isObjectLike = isObjectLike, lodash.isPlainObject = isPlainObject, lodash.isRegExp = isRegExp, lodash.isSafeInteger = isSafeInteger, lodash.isSet = isSet, lodash.isString = isString, lodash.isSymbol = isSymbol, lodash.isTypedArray = isTypedArray, lodash.isUndefined = isUndefined, lodash.isWeakMap = isWeakMap, lodash.isWeakSet = isWeakSet, lodash.join = join, lodash.kebabCase = kebabCase, lodash.last = last, lodash.lastIndexOf = lastIndexOf, lodash.lowerCase = lowerCase, lodash.lowerFirst = lowerFirst, lodash.lt = lt, lodash.lte = lte, lodash.max = max, lodash.maxBy = maxBy, lodash.mean = mean, lodash.meanBy = meanBy, lodash.min = min, lodash.minBy = minBy, lodash.multiply = multiply, lodash.noConflict = noConflict, lodash.noop = noop, lodash.now = now, lodash.pad = pad, lodash.padEnd = padEnd, lodash.padStart = padStart, lodash.parseInt = parseInt, lodash.random = random, lodash.reduce = reduce, lodash.reduceRight = reduceRight, lodash.repeat = repeat, lodash.replace = replace, lodash.result = result, lodash.round = round, lodash.runInContext = runInContext, lodash.sample = sample, lodash.size = size, lodash.snakeCase = snakeCase, lodash.some = some, lodash.sortedIndex = sortedIndex, lodash.sortedIndexBy = sortedIndexBy, lodash.sortedIndexOf = sortedIndexOf, lodash.sortedLastIndex = sortedLastIndex, lodash.sortedLastIndexBy = sortedLastIndexBy, lodash.sortedLastIndexOf = sortedLastIndexOf, lodash.startCase = startCase, lodash.startsWith = startsWith, lodash.subtract = subtract, lodash.sum = sum, lodash.sumBy = sumBy, lodash.template = template, lodash.times = times, lodash.toInteger = toInteger, lodash.toLength = toLength, lodash.toLower = toLower, lodash.toNumber = toNumber, lodash.toSafeInteger = toSafeInteger, lodash.toString = toString, lodash.toUpper = toUpper, lodash.trim = trim, lodash.trimEnd = trimEnd, lodash.trimStart = trimStart, lodash.truncate = truncate, lodash.unescape = unescape, lodash.uniqueId = uniqueId, lodash.upperCase = upperCase, lodash.upperFirst = upperFirst, lodash.each = forEach, lodash.eachRight = forEachRight, lodash.first = head, mixin(lodash, function() {
			var source = {};
			return baseForOwn(lodash, function(func, methodName) {
				hasOwnProperty.call(lodash.prototype, methodName) || (source[methodName] = func)
			}), source
		}(), {
			chain: !1
		}), lodash.VERSION = VERSION, arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
			lodash[methodName].placeholder = lodash
		}), arrayEach(["drop", "take"], function(methodName, index) {
			LazyWrapper.prototype[methodName] = function(n) {
				var filtered = this.__filtered__;
				if (filtered && !index) return new LazyWrapper(this);
				n = n === undefined ? 1 : nativeMax(toInteger(n), 0);
				var result = this.clone();
				return filtered ? result.__takeCount__ = nativeMin(n, result.__takeCount__) : result.__views__.push({
					size: nativeMin(n, MAX_ARRAY_LENGTH),
					type: methodName + (result.__dir__ < 0 ? "Right" : "")
				}), result
			}, LazyWrapper.prototype[methodName + "Right"] = function(n) {
				return this.reverse()[methodName](n).reverse()
			}
		}), arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
			var type = index + 1,
				isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
			LazyWrapper.prototype[methodName] = function(iteratee) {
				var result = this.clone();
				return result.__iteratees__.push({
					iteratee: getIteratee(iteratee, 3),
					type: type
				}), result.__filtered__ = result.__filtered__ || isFilter, result
			}
		}), arrayEach(["head", "last"], function(methodName, index) {
			var takeName = "take" + (index ? "Right" : "");
			LazyWrapper.prototype[methodName] = function() {
				return this[takeName](1).value()[0]
			}
		}), arrayEach(["initial", "tail"], function(methodName, index) {
			var dropName = "drop" + (index ? "" : "Right");
			LazyWrapper.prototype[methodName] = function() {
				return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1)
			}
		}), LazyWrapper.prototype.compact = function() {
			return this.filter(identity)
		}, LazyWrapper.prototype.find = function(predicate) {
			return this.filter(predicate).head()
		}, LazyWrapper.prototype.findLast = function(predicate) {
			return this.reverse().find(predicate)
		}, LazyWrapper.prototype.invokeMap = rest(function(path, args) {
			return "function" == typeof path ? new LazyWrapper(this) : this.map(function(value) {
				return baseInvoke(value, path, args)
			})
		}), LazyWrapper.prototype.reject = function(predicate) {
			return predicate = getIteratee(predicate, 3), this.filter(function(value) {
				return !predicate(value)
			})
		}, LazyWrapper.prototype.slice = function(start, end) {
			start = toInteger(start);
			var result = this;
			return result.__filtered__ && (start > 0 || end < 0) ? new LazyWrapper(result) : (start < 0 ? result = result.takeRight(-start) : start && (result = result.drop(start)), end !== undefined && (end = toInteger(end), result = end < 0 ? result.dropRight(-end) : result.take(end - start)), result)
		}, LazyWrapper.prototype.takeRightWhile = function(predicate) {
			return this.reverse().takeWhile(predicate).reverse()
		}, LazyWrapper.prototype.toArray = function() {
			return this.take(MAX_ARRAY_LENGTH)
		}, baseForOwn(LazyWrapper.prototype, function(func, methodName) {
			var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName),
				isTaker = /^(?:head|last)$/.test(methodName),
				lodashFunc = lodash[isTaker ? "take" + ("last" == methodName ? "Right" : "") : methodName],
				retUnwrapped = isTaker || /^find/.test(methodName);
			lodashFunc && (lodash.prototype[methodName] = function() {
				var value = this.__wrapped__,
					args = isTaker ? [1] : arguments,
					isLazy = value instanceof LazyWrapper,
					iteratee = args[0],
					useLazy = isLazy || isArray(value),
					interceptor = function(value) {
						var result = lodashFunc.apply(lodash, arrayPush([value], args));
						return isTaker && chainAll ? result[0] : result
					};
				useLazy && checkIteratee && "function" == typeof iteratee && 1 != iteratee.length && (isLazy = useLazy = !1);
				var chainAll = this.__chain__,
					isHybrid = !! this.__actions__.length,
					isUnwrapped = retUnwrapped && !chainAll,
					onlyLazy = isLazy && !isHybrid;
				if (!retUnwrapped && useLazy) {
					value = onlyLazy ? value : new LazyWrapper(this);
					var result = func.apply(value, args);
					return result.__actions__.push({
						func: thru,
						args: [interceptor],
						thisArg: undefined
					}), new LodashWrapper(result, chainAll)
				}
				return isUnwrapped && onlyLazy ? func.apply(this, args) : (result = this.thru(interceptor), isUnwrapped ? isTaker ? result.value()[0] : result.value() : result)
			})
		}), arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
			var func = arrayProto[methodName],
				chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru",
				retUnwrapped = /^(?:pop|shift)$/.test(methodName);
			lodash.prototype[methodName] = function() {
				var args = arguments;
				if (retUnwrapped && !this.__chain__) {
					var value = this.value();
					return func.apply(isArray(value) ? value : [], args)
				}
				return this[chainName](function(value) {
					return func.apply(isArray(value) ? value : [], args)
				})
			}
		}), baseForOwn(LazyWrapper.prototype, function(func, methodName) {
			var lodashFunc = lodash[methodName];
			if (lodashFunc) {
				var key = lodashFunc.name + "",
					names = realNames[key] || (realNames[key] = []);
				names.push({
					name: methodName,
					func: lodashFunc
				})
			}
		}), realNames[createHybridWrapper(undefined, BIND_KEY_FLAG).name] = [{
			name: "wrapper",
			func: undefined
		}], LazyWrapper.prototype.clone = lazyClone, LazyWrapper.prototype.reverse = lazyReverse, LazyWrapper.prototype.value = lazyValue, lodash.prototype.at = wrapperAt, lodash.prototype.chain = wrapperChain, lodash.prototype.commit = wrapperCommit, lodash.prototype.next = wrapperNext, lodash.prototype.plant = wrapperPlant, lodash.prototype.reverse = wrapperReverse, lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue, iteratorSymbol && (lodash.prototype[iteratorSymbol] = wrapperToIterator), lodash
	}
	var undefined, VERSION = "4.8.2",
		LARGE_ARRAY_SIZE = 200,
		FUNC_ERROR_TEXT = "Expected a function",
		HASH_UNDEFINED = "__lodash_hash_undefined__",
		PLACEHOLDER = "__lodash_placeholder__",
		BIND_FLAG = 1,
		BIND_KEY_FLAG = 2,
		CURRY_BOUND_FLAG = 4,
		CURRY_FLAG = 8,
		CURRY_RIGHT_FLAG = 16,
		PARTIAL_FLAG = 32,
		PARTIAL_RIGHT_FLAG = 64,
		ARY_FLAG = 128,
		REARG_FLAG = 256,
		FLIP_FLAG = 512,
		UNORDERED_COMPARE_FLAG = 1,
		PARTIAL_COMPARE_FLAG = 2,
		DEFAULT_TRUNC_LENGTH = 30,
		DEFAULT_TRUNC_OMISSION = "...",
		HOT_COUNT = 150,
		HOT_SPAN = 16,
		LAZY_FILTER_FLAG = 1,
		LAZY_MAP_FLAG = 2,
		LAZY_WHILE_FLAG = 3,
		INFINITY = 1 / 0,
		MAX_SAFE_INTEGER = 9007199254740991,
		MAX_INTEGER = 1.7976931348623157e308,
		NAN = NaN,
		MAX_ARRAY_LENGTH = 4294967295,
		MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
		HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1,
		argsTag = "[object Arguments]",
		arrayTag = "[object Array]",
		boolTag = "[object Boolean]",
		dateTag = "[object Date]",
		errorTag = "[object Error]",
		funcTag = "[object Function]",
		genTag = "[object GeneratorFunction]",
		mapTag = "[object Map]",
		numberTag = "[object Number]",
		objectTag = "[object Object]",
		promiseTag = "[object Promise]",
		regexpTag = "[object RegExp]",
		setTag = "[object Set]",
		stringTag = "[object String]",
		symbolTag = "[object Symbol]",
		weakMapTag = "[object WeakMap]",
		weakSetTag = "[object WeakSet]",
		arrayBufferTag = "[object ArrayBuffer]",
		dataViewTag = "[object DataView]",
		float32Tag = "[object Float32Array]",
		float64Tag = "[object Float64Array]",
		int8Tag = "[object Int8Array]",
		int16Tag = "[object Int16Array]",
		int32Tag = "[object Int32Array]",
		uint8Tag = "[object Uint8Array]",
		uint8ClampedTag = "[object Uint8ClampedArray]",
		uint16Tag = "[object Uint16Array]",
		uint32Tag = "[object Uint32Array]",
		reEmptyStringLeading = /\b__p \+= '';/g,
		reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
		reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
		reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#96);/g,
		reUnescapedHtml = /[&<>"'`]/g,
		reHasEscapedHtml = RegExp(reEscapedHtml.source),
		reHasUnescapedHtml = RegExp(reUnescapedHtml.source),
		reEscape = /<%-([\s\S]+?)%>/g,
		reEvaluate = /<%([\s\S]+?)%>/g,
		reInterpolate = /<%=([\s\S]+?)%>/g,
		reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
		reIsPlainProp = /^\w*$/,
		rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g,
		reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
		reHasRegExpChar = RegExp(reRegExpChar.source),
		reTrim = /^\s+|\s+$/g,
		reTrimStart = /^\s+/,
		reTrimEnd = /\s+$/,
		reEscapeChar = /\\(\\)?/g,
		reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
		reFlags = /\w*$/,
		reHasHexPrefix = /^0x/i,
		reIsBadHex = /^[-+]0x[0-9a-f]+$/i,
		reIsBinary = /^0b[01]+$/i,
		reIsHostCtor = /^\[object .+?Constructor\]$/,
		reIsOctal = /^0o[0-7]+$/i,
		reIsUint = /^(?:0|[1-9]\d*)$/,
		reLatin1 = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g,
		reNoMatch = /($^)/,
		reUnescapedString = /['\n\r\u2028\u2029\\]/g,
		rsAstralRange = "\\ud800-\\udfff",
		rsComboMarksRange = "\\u0300-\\u036f\\ufe20-\\ufe23",
		rsComboSymbolsRange = "\\u20d0-\\u20f0",
		rsDingbatRange = "\\u2700-\\u27bf",
		rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff",
		rsMathOpRange = "\\xac\\xb1\\xd7\\xf7",
		rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",
		rsQuoteRange = "\\u2018\\u2019\\u201c\\u201d",
		rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
		rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde",
		rsVarRange = "\\ufe0e\\ufe0f",
		rsBreakRange = rsMathOpRange + rsNonCharRange + rsQuoteRange + rsSpaceRange,
		rsAstral = "[" + rsAstralRange + "]",
		rsBreak = "[" + rsBreakRange + "]",
		rsCombo = "[" + rsComboMarksRange + rsComboSymbolsRange + "]",
		rsDigits = "\\d+",
		rsDingbat = "[" + rsDingbatRange + "]",
		rsLower = "[" + rsLowerRange + "]",
		rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]",
		rsFitz = "\\ud83c[\\udffb-\\udfff]",
		rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")",
		rsNonAstral = "[^" + rsAstralRange + "]",
		rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}",
		rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]",
		rsUpper = "[" + rsUpperRange + "]",
		rsZWJ = "\\u200d",
		rsLowerMisc = "(?:" + rsLower + "|" + rsMisc + ")",
		rsUpperMisc = "(?:" + rsUpper + "|" + rsMisc + ")",
		reOptMod = rsModifier + "?",
		rsOptVar = "[" + rsVarRange + "]?",
		rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*",
		rsSeq = rsOptVar + reOptMod + rsOptJoin,
		rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq,
		rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")",
		reComboMark = RegExp(rsCombo, "g"),
		reComplexSymbol = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g"),
		reHasComplexSymbol = RegExp("[" + rsZWJ + rsAstralRange + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + "]"),
		reBasicWord = /[a-zA-Z0-9]+/g,
		reComplexWord = RegExp([rsUpper + "?" + rsLower + "+(?=" + [rsBreak, rsUpper, "$"].join("|") + ")", rsUpperMisc + "+(?=" + [rsBreak, rsUpper + rsLowerMisc, "$"].join("|") + ")", rsUpper + "?" + rsLowerMisc + "+", rsUpper + "+", rsDigits, rsEmoji].join("|"), "g"),
		reHasComplexWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
		contextProps = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "Reflect", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"],
		templateCounter = -1,
		typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = !0, typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = !1;
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = !0, cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = !1;
	var deburredLetters = {
		"À": "A",
		"Á": "A",
		"Â": "A",
		"Ã": "A",
		"Ä": "A",
		"Å": "A",
		"à": "a",
		"á": "a",
		"â": "a",
		"ã": "a",
		"ä": "a",
		"å": "a",
		"Ç": "C",
		"ç": "c",
		"Ð": "D",
		"ð": "d",
		"È": "E",
		"É": "E",
		"Ê": "E",
		"Ë": "E",
		"è": "e",
		"é": "e",
		"ê": "e",
		"ë": "e",
		"Ì": "I",
		"Í": "I",
		"Î": "I",
		"Ï": "I",
		"ì": "i",
		"í": "i",
		"î": "i",
		"ï": "i",
		"Ñ": "N",
		"ñ": "n",
		"Ò": "O",
		"Ó": "O",
		"Ô": "O",
		"Õ": "O",
		"Ö": "O",
		"Ø": "O",
		"ò": "o",
		"ó": "o",
		"ô": "o",
		"õ": "o",
		"ö": "o",
		"ø": "o",
		"Ù": "U",
		"Ú": "U",
		"Û": "U",
		"Ü": "U",
		"ù": "u",
		"ú": "u",
		"û": "u",
		"ü": "u",
		"Ý": "Y",
		"ý": "y",
		"ÿ": "y",
		"Æ": "Ae",
		"æ": "ae",
		"Þ": "Th",
		"þ": "th",
		"ß": "ss"
	},
		htmlEscapes = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#39;",
			"`": "&#96;"
		},
		htmlUnescapes = {
			"&amp;": "&",
			"&lt;": "<",
			"&gt;": ">",
			"&quot;": '"',
			"&#39;": "'",
			"&#96;": "`"
		},
		objectTypes = {
			function :!0, object: !0
		},
		stringEscapes = {
			"\\": "\\",
			"'": "'",
			"\n": "n",
			"\r": "r",
			"\u2028": "u2028",
			"\u2029": "u2029"
		},
		freeParseFloat = parseFloat,
		freeParseInt = parseInt,
		freeExports = objectTypes[typeof exports] && exports && !exports.nodeType ? exports : undefined,
		freeModule = objectTypes[typeof module] && module && !module.nodeType ? module : undefined,
		moduleExports = freeModule && freeModule.exports === freeExports ? freeExports : undefined,
		freeGlobal = checkGlobal(freeExports && freeModule && "object" == typeof global && global),
		freeSelf = checkGlobal(objectTypes[typeof self] && self),
		freeWindow = checkGlobal(objectTypes[typeof window] && window),
		thisGlobal = checkGlobal(objectTypes[typeof this] && this),
		root = freeGlobal || freeWindow !== (thisGlobal && thisGlobal.window) && freeWindow || freeSelf || thisGlobal || Function("return this")(),
		_ = runInContext();
	(freeWindow || freeSelf || {})._ = _, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
		return _
	}) : freeExports && freeModule ? (moduleExports && ((freeModule.exports = _)._ = _), freeExports._ = _) : root._ = _
}).call(this);
!
function(global, factory) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define(factory) : global.moment = factory()
}(this, function() {
	"use strict";
	function utils_hooks__hooks() {
		return hookCallback.apply(null, arguments)
	}
	function setHookCallback(callback) {
		hookCallback = callback
	}
	function isArray(input) {
		return input instanceof Array || "[object Array]" === Object.prototype.toString.call(input)
	}
	function isDate(input) {
		return input instanceof Date || "[object Date]" === Object.prototype.toString.call(input)
	}
	function map(arr, fn) {
		var i, res = [];
		for (i = 0; i < arr.length; ++i) res.push(fn(arr[i], i));
		return res
	}
	function hasOwnProp(a, b) {
		return Object.prototype.hasOwnProperty.call(a, b)
	}
	function extend(a, b) {
		for (var i in b) hasOwnProp(b, i) && (a[i] = b[i]);
		return hasOwnProp(b, "toString") && (a.toString = b.toString), hasOwnProp(b, "valueOf") && (a.valueOf = b.valueOf), a
	}
	function create_utc__createUTC(input, format, locale, strict) {
		return createLocalOrUTC(input, format, locale, strict, !0).utc()
	}
	function defaultParsingFlags() {
		return {
			empty: !1,
			unusedTokens: [],
			unusedInput: [],
			overflow: -2,
			charsLeftOver: 0,
			nullInput: !1,
			invalidMonth: null,
			invalidFormat: !1,
			userInvalidated: !1,
			iso: !1,
			parsedDateParts: [],
			meridiem: null
		}
	}
	function getParsingFlags(m) {
		return null == m._pf && (m._pf = defaultParsingFlags()), m._pf
	}
	function valid__isValid(m) {
		if (null == m._isValid) {
			var flags = getParsingFlags(m),
				parsedParts = some.call(flags.parsedDateParts, function(i) {
					return null != i
				});
			m._isValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidMonth && !flags.invalidWeekday && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts), m._strict && (m._isValid = m._isValid && 0 === flags.charsLeftOver && 0 === flags.unusedTokens.length && void 0 === flags.bigHour)
		}
		return m._isValid
	}
	function valid__createInvalid(flags) {
		var m = create_utc__createUTC(NaN);
		return null != flags ? extend(getParsingFlags(m), flags) : getParsingFlags(m).userInvalidated = !0, m
	}
	function isUndefined(input) {
		return void 0 === input
	}
	function copyConfig(to, from) {
		var i, prop, val;
		if (isUndefined(from._isAMomentObject) || (to._isAMomentObject = from._isAMomentObject), isUndefined(from._i) || (to._i = from._i), isUndefined(from._f) || (to._f = from._f), isUndefined(from._l) || (to._l = from._l), isUndefined(from._strict) || (to._strict = from._strict), isUndefined(from._tzm) || (to._tzm = from._tzm), isUndefined(from._isUTC) || (to._isUTC = from._isUTC), isUndefined(from._offset) || (to._offset = from._offset), isUndefined(from._pf) || (to._pf = getParsingFlags(from)), isUndefined(from._locale) || (to._locale = from._locale), momentProperties.length > 0) for (i in momentProperties) prop = momentProperties[i], val = from[prop], isUndefined(val) || (to[prop] = val);
		return to
	}
	function Moment(config) {
		copyConfig(this, config), this._d = new Date(null != config._d ? config._d.getTime() : NaN), updateInProgress === !1 && (updateInProgress = !0, utils_hooks__hooks.updateOffset(this), updateInProgress = !1)
	}
	function isMoment(obj) {
		return obj instanceof Moment || null != obj && null != obj._isAMomentObject
	}
	function absFloor(number) {
		return number < 0 ? Math.ceil(number) : Math.floor(number)
	}
	function toInt(argumentForCoercion) {
		var coercedNumber = +argumentForCoercion,
			value = 0;
		return 0 !== coercedNumber && isFinite(coercedNumber) && (value = absFloor(coercedNumber)), value
	}
	function compareArrays(array1, array2, dontConvert) {
		var i, len = Math.min(array1.length, array2.length),
			lengthDiff = Math.abs(array1.length - array2.length),
			diffs = 0;
		for (i = 0; i < len; i++)(dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) && diffs++;
		return diffs + lengthDiff
	}
	function warn(msg) {
		utils_hooks__hooks.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + msg)
	}
	function deprecate(msg, fn) {
		var firstTime = !0;
		return extend(function() {
			return null != utils_hooks__hooks.deprecationHandler && utils_hooks__hooks.deprecationHandler(null, msg), firstTime && (warn(msg + "\nArguments: " + Array.prototype.slice.call(arguments).join(", ") + "\n" + (new Error).stack), firstTime = !1), fn.apply(this, arguments)
		}, fn)
	}
	function deprecateSimple(name, msg) {
		null != utils_hooks__hooks.deprecationHandler && utils_hooks__hooks.deprecationHandler(name, msg), deprecations[name] || (warn(msg), deprecations[name] = !0)
	}
	function isFunction(input) {
		return input instanceof Function || "[object Function]" === Object.prototype.toString.call(input)
	}
	function isObject(input) {
		return "[object Object]" === Object.prototype.toString.call(input)
	}
	function locale_set__set(config) {
		var prop, i;
		for (i in config) prop = config[i], isFunction(prop) ? this[i] = prop : this["_" + i] = prop;
		this._config = config, this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
	}
	function mergeConfigs(parentConfig, childConfig) {
		var prop, res = extend({}, parentConfig);
		for (prop in childConfig) hasOwnProp(childConfig, prop) && (isObject(parentConfig[prop]) && isObject(childConfig[prop]) ? (res[prop] = {}, extend(res[prop], parentConfig[prop]), extend(res[prop], childConfig[prop])) : null != childConfig[prop] ? res[prop] = childConfig[prop] : delete res[prop]);
		return res
	}
	function Locale(config) {
		null != config && this.set(config)
	}
	function normalizeLocale(key) {
		return key ? key.toLowerCase().replace("_", "-") : key
	}
	function chooseLocale(names) {
		for (var j, next, locale, split, i = 0; i < names.length;) {
			for (split = normalizeLocale(names[i]).split("-"), j = split.length, next = normalizeLocale(names[i + 1]), next = next ? next.split("-") : null; j > 0;) {
				if (locale = loadLocale(split.slice(0, j).join("-"))) return locale;
				if (next && next.length >= j && compareArrays(split, next, !0) >= j - 1) break;
				j--
			}
			i++
		}
		return null
	}
	function loadLocale(name) {
		var oldLocale = null;
		if (!locales[name] && "undefined" != typeof module && module && module.exports) try {
			oldLocale = globalLocale._abbr, require("./locale/" + name), locale_locales__getSetGlobalLocale(oldLocale)
		} catch (e) {}
		return locales[name]
	}
	function locale_locales__getSetGlobalLocale(key, values) {
		var data;
		return key && (data = isUndefined(values) ? locale_locales__getLocale(key) : defineLocale(key, values), data && (globalLocale = data)), globalLocale._abbr
	}
	function defineLocale(name, config) {
		return null !== config ? (config.abbr = name, null != locales[name] ? (deprecateSimple("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale"), config = mergeConfigs(locales[name]._config, config)) : null != config.parentLocale && (null != locales[config.parentLocale] ? config = mergeConfigs(locales[config.parentLocale]._config, config) : deprecateSimple("parentLocaleUndefined", "specified parentLocale is not defined yet")), locales[name] = new Locale(config), locale_locales__getSetGlobalLocale(name), locales[name]) : (delete locales[name], null)
	}
	function updateLocale(name, config) {
		if (null != config) {
			var locale;
			null != locales[name] && (config = mergeConfigs(locales[name]._config, config)), locale = new Locale(config), locale.parentLocale = locales[name], locales[name] = locale, locale_locales__getSetGlobalLocale(name)
		} else null != locales[name] && (null != locales[name].parentLocale ? locales[name] = locales[name].parentLocale : null != locales[name] && delete locales[name]);
		return locales[name]
	}
	function locale_locales__getLocale(key) {
		var locale;
		if (key && key._locale && key._locale._abbr && (key = key._locale._abbr), !key) return globalLocale;
		if (!isArray(key)) {
			if (locale = loadLocale(key)) return locale;
			key = [key]
		}
		return chooseLocale(key)
	}
	function locale_locales__listLocales() {
		return keys(locales)
	}
	function addUnitAlias(unit, shorthand) {
		var lowerCase = unit.toLowerCase();
		aliases[lowerCase] = aliases[lowerCase + "s"] = aliases[shorthand] = unit
	}
	function normalizeUnits(units) {
		return "string" == typeof units ? aliases[units] || aliases[units.toLowerCase()] : void 0
	}
	function normalizeObjectUnits(inputObject) {
		var normalizedProp, prop, normalizedInput = {};
		for (prop in inputObject) hasOwnProp(inputObject, prop) && (normalizedProp = normalizeUnits(prop), normalizedProp && (normalizedInput[normalizedProp] = inputObject[prop]));
		return normalizedInput
	}
	function makeGetSet(unit, keepTime) {
		return function(value) {
			return null != value ? (get_set__set(this, unit, value), utils_hooks__hooks.updateOffset(this, keepTime), this) : get_set__get(this, unit)
		}
	}
	function get_set__get(mom, unit) {
		return mom.isValid() ? mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]() : NaN
	}
	function get_set__set(mom, unit, value) {
		mom.isValid() && mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value)
	}
	function getSet(units, value) {
		var unit;
		if ("object" == typeof units) for (unit in units) this.set(unit, units[unit]);
		else if (units = normalizeUnits(units), isFunction(this[units])) return this[units](value);
		return this
	}
	function zeroFill(number, targetLength, forceSign) {
		var absNumber = "" + Math.abs(number),
			zerosToFill = targetLength - absNumber.length,
			sign = number >= 0;
		return (sign ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber
	}
	function addFormatToken(token, padded, ordinal, callback) {
		var func = callback;
		"string" == typeof callback && (func = function() {
			return this[callback]()
		}), token && (formatTokenFunctions[token] = func), padded && (formatTokenFunctions[padded[0]] = function() {
			return zeroFill(func.apply(this, arguments), padded[1], padded[2])
		}), ordinal && (formatTokenFunctions[ordinal] = function() {
			return this.localeData().ordinal(func.apply(this, arguments), token)
		})
	}
	function removeFormattingTokens(input) {
		return input.match(/\[[\s\S]/) ? input.replace(/^\[|\]$/g, "") : input.replace(/\\/g, "")
	}
	function makeFormatFunction(format) {
		var i, length, array = format.match(formattingTokens);
		for (i = 0, length = array.length; i < length; i++) formatTokenFunctions[array[i]] ? array[i] = formatTokenFunctions[array[i]] : array[i] = removeFormattingTokens(array[i]);
		return function(mom) {
			var i, output = "";
			for (i = 0; i < length; i++) output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
			return output
		}
	}
	function formatMoment(m, format) {
		return m.isValid() ? (format = expandFormat(format, m.localeData()), formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format), formatFunctions[format](m)) : m.localeData().invalidDate()
	}
	function expandFormat(format, locale) {
		function replaceLongDateFormatTokens(input) {
			return locale.longDateFormat(input) || input
		}
		var i = 5;
		for (localFormattingTokens.lastIndex = 0; i >= 0 && localFormattingTokens.test(format);) format = format.replace(localFormattingTokens, replaceLongDateFormatTokens), localFormattingTokens.lastIndex = 0, i -= 1;
		return format
	}
	function addRegexToken(token, regex, strictRegex) {
		regexes[token] = isFunction(regex) ? regex : function(isStrict, localeData) {
			return isStrict && strictRegex ? strictRegex : regex
		}
	}
	function getParseRegexForToken(token, config) {
		return hasOwnProp(regexes, token) ? regexes[token](config._strict, config._locale) : new RegExp(unescapeFormat(token))
	}
	function unescapeFormat(s) {
		return regexEscape(s.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(matched, p1, p2, p3, p4) {
			return p1 || p2 || p3 || p4
		}))
	}
	function regexEscape(s) {
		return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
	}
	function addParseToken(token, callback) {
		var i, func = callback;
		for ("string" == typeof token && (token = [token]), "number" == typeof callback && (func = function(input, array) {
			array[callback] = toInt(input)
		}), i = 0; i < token.length; i++) tokens[token[i]] = func
	}
	function addWeekParseToken(token, callback) {
		addParseToken(token, function(input, array, config, token) {
			config._w = config._w || {}, callback(input, config._w, config, token)
		})
	}
	function addTimeToArrayFromToken(token, input, config) {
		null != input && hasOwnProp(tokens, token) && tokens[token](input, config._a, config, token)
	}
	function daysInMonth(year, month) {
		return new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
	}
	function localeMonths(m, format) {
		return isArray(this._months) ? this._months[m.month()] : this._months[MONTHS_IN_FORMAT.test(format) ? "format" : "standalone"][m.month()]
	}
	function localeMonthsShort(m, format) {
		return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format) ? "format" : "standalone"][m.month()]
	}
	function units_month__handleStrictParse(monthName, format, strict) {
		var i, ii, mom, llc = monthName.toLocaleLowerCase();
		if (!this._monthsParse) for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], i = 0; i < 12; ++i) mom = create_utc__createUTC([2e3, i]), this._shortMonthsParse[i] = this.monthsShort(mom, "").toLocaleLowerCase(), this._longMonthsParse[i] = this.months(mom, "").toLocaleLowerCase();
		return strict ? "MMM" === format ? (ii = indexOf.call(this._shortMonthsParse, llc), ii !== -1 ? ii : null) : (ii = indexOf.call(this._longMonthsParse, llc), ii !== -1 ? ii : null) : "MMM" === format ? (ii = indexOf.call(this._shortMonthsParse, llc), ii !== -1 ? ii : (ii = indexOf.call(this._longMonthsParse, llc), ii !== -1 ? ii : null)) : (ii = indexOf.call(this._longMonthsParse, llc), ii !== -1 ? ii : (ii = indexOf.call(this._shortMonthsParse, llc), ii !== -1 ? ii : null))
	}
	function localeMonthsParse(monthName, format, strict) {
		var i, mom, regex;
		if (this._monthsParseExact) return units_month__handleStrictParse.call(this, monthName, format, strict);
		for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), i = 0; i < 12; i++) {
			if (mom = create_utc__createUTC([2e3, i]), strict && !this._longMonthsParse[i] && (this._longMonthsParse[i] = new RegExp("^" + this.months(mom, "").replace(".", "") + "$", "i"), this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(mom, "").replace(".", "") + "$", "i")), strict || this._monthsParse[i] || (regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, ""), this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i")), strict && "MMMM" === format && this._longMonthsParse[i].test(monthName)) return i;
			if (strict && "MMM" === format && this._shortMonthsParse[i].test(monthName)) return i;
			if (!strict && this._monthsParse[i].test(monthName)) return i
		}
	}
	function setMonth(mom, value) {
		var dayOfMonth;
		if (!mom.isValid()) return mom;
		if ("string" == typeof value) if (/^\d+$/.test(value)) value = toInt(value);
		else if (value = mom.localeData().monthsParse(value), "number" != typeof value) return mom;
		return dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value)), mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth), mom
	}
	function getSetMonth(value) {
		return null != value ? (setMonth(this, value), utils_hooks__hooks.updateOffset(this, !0), this) : get_set__get(this, "Month")
	}
	function getDaysInMonth() {
		return daysInMonth(this.year(), this.month())
	}
	function monthsShortRegex(isStrict) {
		return this._monthsParseExact ? (hasOwnProp(this, "_monthsRegex") || computeMonthsParse.call(this), isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex) : this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex
	}
	function monthsRegex(isStrict) {
		return this._monthsParseExact ? (hasOwnProp(this, "_monthsRegex") || computeMonthsParse.call(this), isStrict ? this._monthsStrictRegex : this._monthsRegex) : this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex
	}
	function computeMonthsParse() {
		function cmpLenRev(a, b) {
			return b.length - a.length
		}
		var i, mom, shortPieces = [],
			longPieces = [],
			mixedPieces = [];
		for (i = 0; i < 12; i++) mom = create_utc__createUTC([2e3, i]), shortPieces.push(this.monthsShort(mom, "")), longPieces.push(this.months(mom, "")), mixedPieces.push(this.months(mom, "")), mixedPieces.push(this.monthsShort(mom, ""));
		for (shortPieces.sort(cmpLenRev), longPieces.sort(cmpLenRev), mixedPieces.sort(cmpLenRev), i = 0; i < 12; i++) shortPieces[i] = regexEscape(shortPieces[i]), longPieces[i] = regexEscape(longPieces[i]), mixedPieces[i] = regexEscape(mixedPieces[i]);
		this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + longPieces.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + shortPieces.join("|") + ")", "i")
	}
	function checkOverflow(m) {
		var overflow, a = m._a;
		return a && getParsingFlags(m).overflow === -2 && (overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || 24 === a[HOUR] && (0 !== a[MINUTE] || 0 !== a[SECOND] || 0 !== a[MILLISECOND]) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1, getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE) && (overflow = DATE), getParsingFlags(m)._overflowWeeks && overflow === -1 && (overflow = WEEK), getParsingFlags(m)._overflowWeekday && overflow === -1 && (overflow = WEEKDAY), getParsingFlags(m).overflow = overflow), m
	}
	function configFromISO(config) {
		var i, l, allowTime, dateFormat, timeFormat, tzFormat, string = config._i,
			match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string);
		if (match) {
			for (getParsingFlags(config).iso = !0, i = 0, l = isoDates.length; i < l; i++) if (isoDates[i][1].exec(match[1])) {
				dateFormat = isoDates[i][0], allowTime = isoDates[i][2] !== !1;
				break
			}
			if (null == dateFormat) return void(config._isValid = !1);
			if (match[3]) {
				for (i = 0, l = isoTimes.length; i < l; i++) if (isoTimes[i][1].exec(match[3])) {
					timeFormat = (match[2] || " ") + isoTimes[i][0];
					break
				}
				if (null == timeFormat) return void(config._isValid = !1)
			}
			if (!allowTime && null != timeFormat) return void(config._isValid = !1);
			if (match[4]) {
				if (!tzRegex.exec(match[4])) return void(config._isValid = !1);
				tzFormat = "Z"
			}
			config._f = dateFormat + (timeFormat || "") + (tzFormat || ""), configFromStringAndFormat(config)
		} else config._isValid = !1
	}
	function configFromString(config) {
		var matched = aspNetJsonRegex.exec(config._i);
		return null !== matched ? void(config._d = new Date((+matched[1]))) : (configFromISO(config), void(config._isValid === !1 && (delete config._isValid, utils_hooks__hooks.createFromInputFallback(config))))
	}
	function createDate(y, m, d, h, M, s, ms) {
		var date = new Date(y, m, d, h, M, s, ms);
		return y < 100 && y >= 0 && isFinite(date.getFullYear()) && date.setFullYear(y), date
	}
	function createUTCDate(y) {
		var date = new Date(Date.UTC.apply(null, arguments));
		return y < 100 && y >= 0 && isFinite(date.getUTCFullYear()) && date.setUTCFullYear(y), date
	}
	function daysInYear(year) {
		return isLeapYear(year) ? 366 : 365
	}
	function isLeapYear(year) {
		return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0
	}
	function getIsLeapYear() {
		return isLeapYear(this.year())
	}
	function firstWeekOffset(year, dow, doy) {
		var fwd = 7 + dow - doy,
			fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
		return -fwdlw + fwd - 1
	}
	function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
		var resYear, resDayOfYear, localWeekday = (7 + weekday - dow) % 7,
			weekOffset = firstWeekOffset(year, dow, doy),
			dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset;
		return dayOfYear <= 0 ? (resYear = year - 1, resDayOfYear = daysInYear(resYear) + dayOfYear) : dayOfYear > daysInYear(year) ? (resYear = year + 1, resDayOfYear = dayOfYear - daysInYear(year)) : (resYear = year, resDayOfYear = dayOfYear), {
			year: resYear,
			dayOfYear: resDayOfYear
		}
	}
	function weekOfYear(mom, dow, doy) {
		var resWeek, resYear, weekOffset = firstWeekOffset(mom.year(), dow, doy),
			week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1;
		return week < 1 ? (resYear = mom.year() - 1, resWeek = week + weeksInYear(resYear, dow, doy)) : week > weeksInYear(mom.year(), dow, doy) ? (resWeek = week - weeksInYear(mom.year(), dow, doy), resYear = mom.year() + 1) : (resYear = mom.year(), resWeek = week), {
			week: resWeek,
			year: resYear
		}
	}
	function weeksInYear(year, dow, doy) {
		var weekOffset = firstWeekOffset(year, dow, doy),
			weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
		return (daysInYear(year) - weekOffset + weekOffsetNext) / 7
	}
	function defaults(a, b, c) {
		return null != a ? a : null != b ? b : c
	}
	function currentDateArray(config) {
		var nowValue = new Date(utils_hooks__hooks.now());
		return config._useUTC ? [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()] : [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()]
	}
	function configFromArray(config) {
		var i, date, currentDate, yearToUse, input = [];
		if (!config._d) {
			for (currentDate = currentDateArray(config), config._w && null == config._a[DATE] && null == config._a[MONTH] && dayOfYearFromWeekInfo(config), config._dayOfYear && (yearToUse = defaults(config._a[YEAR], currentDate[YEAR]), config._dayOfYear > daysInYear(yearToUse) && (getParsingFlags(config)._overflowDayOfYear = !0), date = createUTCDate(yearToUse, 0, config._dayOfYear), config._a[MONTH] = date.getUTCMonth(), config._a[DATE] = date.getUTCDate()), i = 0; i < 3 && null == config._a[i]; ++i) config._a[i] = input[i] = currentDate[i];
			for (; i < 7; i++) config._a[i] = input[i] = null == config._a[i] ? 2 === i ? 1 : 0 : config._a[i];
			24 === config._a[HOUR] && 0 === config._a[MINUTE] && 0 === config._a[SECOND] && 0 === config._a[MILLISECOND] && (config._nextDay = !0, config._a[HOUR] = 0), config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input), null != config._tzm && config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm), config._nextDay && (config._a[HOUR] = 24)
		}
	}
	function dayOfYearFromWeekInfo(config) {
		var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;
		w = config._w, null != w.GG || null != w.W || null != w.E ? (dow = 1, doy = 4, weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year), week = defaults(w.W, 1), weekday = defaults(w.E, 1), (weekday < 1 || weekday > 7) && (weekdayOverflow = !0)) : (dow = config._locale._week.dow, doy = config._locale._week.doy, weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year), week = defaults(w.w, 1), null != w.d ? (weekday = w.d, (weekday < 0 || weekday > 6) && (weekdayOverflow = !0)) : null != w.e ? (weekday = w.e + dow, (w.e < 0 || w.e > 6) && (weekdayOverflow = !0)) : weekday = dow), week < 1 || week > weeksInYear(weekYear, dow, doy) ? getParsingFlags(config)._overflowWeeks = !0 : null != weekdayOverflow ? getParsingFlags(config)._overflowWeekday = !0 : (temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy), config._a[YEAR] = temp.year, config._dayOfYear = temp.dayOfYear)
	}
	function configFromStringAndFormat(config) {
		if (config._f === utils_hooks__hooks.ISO_8601) return void configFromISO(config);
		config._a = [], getParsingFlags(config).empty = !0;
		var i, parsedInput, tokens, token, skipped, string = "" + config._i,
			stringLength = string.length,
			totalParsedInputLength = 0;
		for (tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [], i = 0; i < tokens.length; i++) token = tokens[i], parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0], parsedInput && (skipped = string.substr(0, string.indexOf(parsedInput)), skipped.length > 0 && getParsingFlags(config).unusedInput.push(skipped), string = string.slice(string.indexOf(parsedInput) + parsedInput.length), totalParsedInputLength += parsedInput.length), formatTokenFunctions[token] ? (parsedInput ? getParsingFlags(config).empty = !1 : getParsingFlags(config).unusedTokens.push(token), addTimeToArrayFromToken(token, parsedInput, config)) : config._strict && !parsedInput && getParsingFlags(config).unusedTokens.push(token);
		getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength, string.length > 0 && getParsingFlags(config).unusedInput.push(string), getParsingFlags(config).bigHour === !0 && config._a[HOUR] <= 12 && config._a[HOUR] > 0 && (getParsingFlags(config).bigHour = void 0), getParsingFlags(config).parsedDateParts = config._a.slice(0), getParsingFlags(config).meridiem = config._meridiem, config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem), configFromArray(config), checkOverflow(config)
	}
	function meridiemFixWrap(locale, hour, meridiem) {
		var isPm;
		return null == meridiem ? hour : null != locale.meridiemHour ? locale.meridiemHour(hour, meridiem) : null != locale.isPM ? (isPm = locale.isPM(meridiem), isPm && hour < 12 && (hour += 12), isPm || 12 !== hour || (hour = 0), hour) : hour
	}
	function configFromStringAndArray(config) {
		var tempConfig, bestMoment, scoreToBeat, i, currentScore;
		if (0 === config._f.length) return getParsingFlags(config).invalidFormat = !0, void(config._d = new Date(NaN));
		for (i = 0; i < config._f.length; i++) currentScore = 0, tempConfig = copyConfig({}, config), null != config._useUTC && (tempConfig._useUTC = config._useUTC), tempConfig._f = config._f[i], configFromStringAndFormat(tempConfig), valid__isValid(tempConfig) && (currentScore += getParsingFlags(tempConfig).charsLeftOver, currentScore += 10 * getParsingFlags(tempConfig).unusedTokens.length, getParsingFlags(tempConfig).score = currentScore, (null == scoreToBeat || currentScore < scoreToBeat) && (scoreToBeat = currentScore, bestMoment = tempConfig));
		extend(config, bestMoment || tempConfig)
	}
	function configFromObject(config) {
		if (!config._d) {
			var i = normalizeObjectUnits(config._i);
			config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function(obj) {
				return obj && parseInt(obj, 10)
			}), configFromArray(config)
		}
	}
	function createFromConfig(config) {
		var res = new Moment(checkOverflow(prepareConfig(config)));
		return res._nextDay && (res.add(1, "d"), res._nextDay = void 0), res
	}
	function prepareConfig(config) {
		var input = config._i,
			format = config._f;
		return config._locale = config._locale || locale_locales__getLocale(config._l), null === input || void 0 === format && "" === input ? valid__createInvalid({
			nullInput: !0
		}) : ("string" == typeof input && (config._i = input = config._locale.preparse(input)), isMoment(input) ? new Moment(checkOverflow(input)) : (isArray(format) ? configFromStringAndArray(config) : format ? configFromStringAndFormat(config) : isDate(input) ? config._d = input : configFromInput(config), valid__isValid(config) || (config._d = null), config))
	}
	function configFromInput(config) {
		var input = config._i;
		void 0 === input ? config._d = new Date(utils_hooks__hooks.now()) : isDate(input) ? config._d = new Date(input.valueOf()) : "string" == typeof input ? configFromString(config) : isArray(input) ? (config._a = map(input.slice(0), function(obj) {
			return parseInt(obj, 10)
		}), configFromArray(config)) : "object" == typeof input ? configFromObject(config) : "number" == typeof input ? config._d = new Date(input) : utils_hooks__hooks.createFromInputFallback(config)
	}
	function createLocalOrUTC(input, format, locale, strict, isUTC) {
		var c = {};
		return "boolean" == typeof locale && (strict = locale, locale = void 0), c._isAMomentObject = !0, c._useUTC = c._isUTC = isUTC, c._l = locale, c._i = input, c._f = format, c._strict = strict, createFromConfig(c)
	}
	function local__createLocal(input, format, locale, strict) {
		return createLocalOrUTC(input, format, locale, strict, !1)
	}
	function pickBy(fn, moments) {
		var res, i;
		if (1 === moments.length && isArray(moments[0]) && (moments = moments[0]), !moments.length) return local__createLocal();
		for (res = moments[0], i = 1; i < moments.length; ++i) moments[i].isValid() && !moments[i][fn](res) || (res = moments[i]);
		return res
	}
	function min() {
		var args = [].slice.call(arguments, 0);
		return pickBy("isBefore", args)
	}
	function max() {
		var args = [].slice.call(arguments, 0);
		return pickBy("isAfter", args)
	}
	function Duration(duration) {
		var normalizedInput = normalizeObjectUnits(duration),
			years = normalizedInput.year || 0,
			quarters = normalizedInput.quarter || 0,
			months = normalizedInput.month || 0,
			weeks = normalizedInput.week || 0,
			days = normalizedInput.day || 0,
			hours = normalizedInput.hour || 0,
			minutes = normalizedInput.minute || 0,
			seconds = normalizedInput.second || 0,
			milliseconds = normalizedInput.millisecond || 0;
		this._milliseconds = +milliseconds + 1e3 * seconds + 6e4 * minutes + 1e3 * hours * 60 * 60, this._days = +days + 7 * weeks, this._months = +months + 3 * quarters + 12 * years, this._data = {}, this._locale = locale_locales__getLocale(), this._bubble()
	}
	function isDuration(obj) {
		return obj instanceof Duration
	}
	function offset(token, separator) {
		addFormatToken(token, 0, 0, function() {
			var offset = this.utcOffset(),
				sign = "+";
			return offset < 0 && (offset = -offset, sign = "-"), sign + zeroFill(~~ (offset / 60), 2) + separator + zeroFill(~~offset % 60, 2)
		})
	}
	function offsetFromString(matcher, string) {
		var matches = (string || "").match(matcher) || [],
			chunk = matches[matches.length - 1] || [],
			parts = (chunk + "").match(chunkOffset) || ["-", 0, 0],
			minutes = +(60 * parts[1]) + toInt(parts[2]);
		return "+" === parts[0] ? minutes : -minutes
	}
	function cloneWithOffset(input, model) {
		var res, diff;
		return model._isUTC ? (res = model.clone(), diff = (isMoment(input) || isDate(input) ? input.valueOf() : local__createLocal(input).valueOf()) - res.valueOf(), res._d.setTime(res._d.valueOf() + diff), utils_hooks__hooks.updateOffset(res, !1), res) : local__createLocal(input).local()
	}
	function getDateOffset(m) {
		return 15 * -Math.round(m._d.getTimezoneOffset() / 15)
	}
	function getSetOffset(input, keepLocalTime) {
		var localAdjust, offset = this._offset || 0;
		return this.isValid() ? null != input ? ("string" == typeof input ? input = offsetFromString(matchShortOffset, input) : Math.abs(input) < 16 && (input = 60 * input), !this._isUTC && keepLocalTime && (localAdjust = getDateOffset(this)), this._offset = input, this._isUTC = !0, null != localAdjust && this.add(localAdjust, "m"), offset !== input && (!keepLocalTime || this._changeInProgress ? add_subtract__addSubtract(this, create__createDuration(input - offset, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, utils_hooks__hooks.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? offset : getDateOffset(this) : null != input ? this : NaN
	}
	function getSetZone(input, keepLocalTime) {
		return null != input ? ("string" != typeof input && (input = -input), this.utcOffset(input, keepLocalTime), this) : -this.utcOffset()
	}
	function setOffsetToUTC(keepLocalTime) {
		return this.utcOffset(0, keepLocalTime)
	}
	function setOffsetToLocal(keepLocalTime) {
		return this._isUTC && (this.utcOffset(0, keepLocalTime), this._isUTC = !1, keepLocalTime && this.subtract(getDateOffset(this), "m")), this
	}
	function setOffsetToParsedOffset() {
		return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(offsetFromString(matchOffset, this._i)), this
	}
	function hasAlignedHourOffset(input) {
		return !!this.isValid() && (input = input ? local__createLocal(input).utcOffset() : 0, (this.utcOffset() - input) % 60 === 0)
	}
	function isDaylightSavingTime() {
		return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
	}
	function isDaylightSavingTimeShifted() {
		if (!isUndefined(this._isDSTShifted)) return this._isDSTShifted;
		var c = {};
		if (copyConfig(c, this), c = prepareConfig(c), c._a) {
			var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
			this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0
		} else this._isDSTShifted = !1;
		return this._isDSTShifted
	}
	function isLocal() {
		return !!this.isValid() && !this._isUTC
	}
	function isUtcOffset() {
		return !!this.isValid() && this._isUTC
	}
	function isUtc() {
		return !!this.isValid() && (this._isUTC && 0 === this._offset)
	}
	function create__createDuration(input, key) {
		var sign, ret, diffRes, duration = input,
			match = null;
		return isDuration(input) ? duration = {
			ms: input._milliseconds,
			d: input._days,
			M: input._months
		} : "number" == typeof input ? (duration = {}, key ? duration[key] = input : duration.milliseconds = input) : (match = aspNetRegex.exec(input)) ? (sign = "-" === match[1] ? -1 : 1, duration = {
			y: 0,
			d: toInt(match[DATE]) * sign,
			h: toInt(match[HOUR]) * sign,
			m: toInt(match[MINUTE]) * sign,
			s: toInt(match[SECOND]) * sign,
			ms: toInt(match[MILLISECOND]) * sign
		}) : (match = isoRegex.exec(input)) ? (sign = "-" === match[1] ? -1 : 1, duration = {
			y: parseIso(match[2], sign),
			M: parseIso(match[3], sign),
			w: parseIso(match[4], sign),
			d: parseIso(match[5], sign),
			h: parseIso(match[6], sign),
			m: parseIso(match[7], sign),
			s: parseIso(match[8], sign)
		}) : null == duration ? duration = {} : "object" == typeof duration && ("from" in duration || "to" in duration) && (diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to)), duration = {}, duration.ms = diffRes.milliseconds, duration.M = diffRes.months), ret = new Duration(duration), isDuration(input) && hasOwnProp(input, "_locale") && (ret._locale = input._locale), ret
	}
	function parseIso(inp, sign) {
		var res = inp && parseFloat(inp.replace(",", "."));
		return (isNaN(res) ? 0 : res) * sign
	}
	function positiveMomentsDifference(base, other) {
		var res = {
			milliseconds: 0,
			months: 0
		};
		return res.months = other.month() - base.month() + 12 * (other.year() - base.year()), base.clone().add(res.months, "M").isAfter(other) && --res.months, res.milliseconds = +other - +base.clone().add(res.months, "M"), res
	}
	function momentsDifference(base, other) {
		var res;
		return base.isValid() && other.isValid() ? (other = cloneWithOffset(other, base), base.isBefore(other) ? res = positiveMomentsDifference(base, other) : (res = positiveMomentsDifference(other, base), res.milliseconds = -res.milliseconds, res.months = -res.months), res) : {
			milliseconds: 0,
			months: 0
		}
	}
	function absRound(number) {
		return number < 0 ? Math.round(-1 * number) * -1 : Math.round(number)
	}
	function createAdder(direction, name) {
		return function(val, period) {
			var dur, tmp;
			return null === period || isNaN(+period) || (deprecateSimple(name, "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period)."), tmp = val, val = period, period = tmp), val = "string" == typeof val ? +val : val, dur = create__createDuration(val, period), add_subtract__addSubtract(this, dur, direction), this
		}
	}
	function add_subtract__addSubtract(mom, duration, isAdding, updateOffset) {
		var milliseconds = duration._milliseconds,
			days = absRound(duration._days),
			months = absRound(duration._months);
		mom.isValid() && (updateOffset = null == updateOffset || updateOffset, milliseconds && mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding), days && get_set__set(mom, "Date", get_set__get(mom, "Date") + days * isAdding), months && setMonth(mom, get_set__get(mom, "Month") + months * isAdding), updateOffset && utils_hooks__hooks.updateOffset(mom, days || months))
	}
	function moment_calendar__calendar(time, formats) {
		var now = time || local__createLocal(),
			sod = cloneWithOffset(now, this).startOf("day"),
			diff = this.diff(sod, "days", !0),
			format = diff < -6 ? "sameElse" : diff < -1 ? "lastWeek" : diff < 0 ? "lastDay" : diff < 1 ? "sameDay" : diff < 2 ? "nextDay" : diff < 7 ? "nextWeek" : "sameElse",
			output = formats && (isFunction(formats[format]) ? formats[format]() : formats[format]);
		return this.format(output || this.localeData().calendar(format, this, local__createLocal(now)))
	}
	function clone() {
		return new Moment(this)
	}
	function isAfter(input, units) {
		var localInput = isMoment(input) ? input : local__createLocal(input);
		return !(!this.isValid() || !localInput.isValid()) && (units = normalizeUnits(isUndefined(units) ? "millisecond" : units), "millisecond" === units ? this.valueOf() > localInput.valueOf() : localInput.valueOf() < this.clone().startOf(units).valueOf())
	}
	function isBefore(input, units) {
		var localInput = isMoment(input) ? input : local__createLocal(input);
		return !(!this.isValid() || !localInput.isValid()) && (units = normalizeUnits(isUndefined(units) ? "millisecond" : units), "millisecond" === units ? this.valueOf() < localInput.valueOf() : this.clone().endOf(units).valueOf() < localInput.valueOf())
	}
	function isBetween(from, to, units, inclusivity) {
		return inclusivity = inclusivity || "()", ("(" === inclusivity[0] ? this.isAfter(from, units) : !this.isBefore(from, units)) && (")" === inclusivity[1] ? this.isBefore(to, units) : !this.isAfter(to, units))
	}
	function isSame(input, units) {
		var inputMs, localInput = isMoment(input) ? input : local__createLocal(input);
		return !(!this.isValid() || !localInput.isValid()) && (units = normalizeUnits(units || "millisecond"), "millisecond" === units ? this.valueOf() === localInput.valueOf() : (inputMs = localInput.valueOf(), this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf()))
	}
	function isSameOrAfter(input, units) {
		return this.isSame(input, units) || this.isAfter(input, units)
	}
	function isSameOrBefore(input, units) {
		return this.isSame(input, units) || this.isBefore(input, units)
	}
	function diff(input, units, asFloat) {
		var that, zoneDelta, delta, output;
		return this.isValid() ? (that = cloneWithOffset(input, this), that.isValid() ? (zoneDelta = 6e4 * (that.utcOffset() - this.utcOffset()), units = normalizeUnits(units), "year" === units || "month" === units || "quarter" === units ? (output = monthDiff(this, that), "quarter" === units ? output /= 3 : "year" === units && (output /= 12)) : (delta = this - that, output = "second" === units ? delta / 1e3 : "minute" === units ? delta / 6e4 : "hour" === units ? delta / 36e5 : "day" === units ? (delta - zoneDelta) / 864e5 : "week" === units ? (delta - zoneDelta) / 6048e5 : delta), asFloat ? output : absFloor(output)) : NaN) : NaN
	}
	function monthDiff(a, b) {
		var anchor2, adjust, wholeMonthDiff = 12 * (b.year() - a.year()) + (b.month() - a.month()),
			anchor = a.clone().add(wholeMonthDiff, "months");
		return b - anchor < 0 ? (anchor2 = a.clone().add(wholeMonthDiff - 1, "months"), adjust = (b - anchor) / (anchor - anchor2)) : (anchor2 = a.clone().add(wholeMonthDiff + 1, "months"), adjust = (b - anchor) / (anchor2 - anchor)), -(wholeMonthDiff + adjust) || 0
	}
	function toString() {
		return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
	}
	function moment_format__toISOString() {
		var m = this.clone().utc();
		return 0 < m.year() && m.year() <= 9999 ? isFunction(Date.prototype.toISOString) ? this.toDate().toISOString() : formatMoment(m, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : formatMoment(m, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
	}
	function format(inputString) {
		inputString || (inputString = this.isUtc() ? utils_hooks__hooks.defaultFormatUtc : utils_hooks__hooks.defaultFormat);
		var output = formatMoment(this, inputString);
		return this.localeData().postformat(output)
	}
	function from(time, withoutSuffix) {
		return this.isValid() && (isMoment(time) && time.isValid() || local__createLocal(time).isValid()) ? create__createDuration({
			to: this,
			from: time
		}).locale(this.locale()).humanize(!withoutSuffix) : this.localeData().invalidDate()
	}
	function fromNow(withoutSuffix) {
		return this.from(local__createLocal(), withoutSuffix)
	}
	function to(time, withoutSuffix) {
		return this.isValid() && (isMoment(time) && time.isValid() || local__createLocal(time).isValid()) ? create__createDuration({
			from: this,
			to: time
		}).locale(this.locale()).humanize(!withoutSuffix) : this.localeData().invalidDate()
	}
	function toNow(withoutSuffix) {
		return this.to(local__createLocal(), withoutSuffix)
	}
	function locale(key) {
		var newLocaleData;
		return void 0 === key ? this._locale._abbr : (newLocaleData = locale_locales__getLocale(key), null != newLocaleData && (this._locale = newLocaleData), this)
	}
	function localeData() {
		return this._locale
	}
	function startOf(units) {
		switch (units = normalizeUnits(units)) {
		case "year":
			this.month(0);
		case "quarter":
		case "month":
			this.date(1);
		case "week":
		case "isoWeek":
		case "day":
		case "date":
			this.hours(0);
		case "hour":
			this.minutes(0);
		case "minute":
			this.seconds(0);
		case "second":
			this.milliseconds(0)
		}
		return "week" === units && this.weekday(0), "isoWeek" === units && this.isoWeekday(1), "quarter" === units && this.month(3 * Math.floor(this.month() / 3)), this
	}
	function endOf(units) {
		return units = normalizeUnits(units), void 0 === units || "millisecond" === units ? this : ("date" === units && (units = "day"), this.startOf(units).add(1, "isoWeek" === units ? "week" : units).subtract(1, "ms"))
	}
	function to_type__valueOf() {
		return this._d.valueOf() - 6e4 * (this._offset || 0)
	}
	function unix() {
		return Math.floor(this.valueOf() / 1e3)
	}
	function toDate() {
		return this._offset ? new Date(this.valueOf()) : this._d
	}
	function toArray() {
		var m = this;
		return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()]
	}
	function toObject() {
		var m = this;
		return {
			years: m.year(),
			months: m.month(),
			date: m.date(),
			hours: m.hours(),
			minutes: m.minutes(),
			seconds: m.seconds(),
			milliseconds: m.milliseconds()
		}
	}
	function toJSON() {
		return this.isValid() ? this.toISOString() : null
	}
	function moment_valid__isValid() {
		return valid__isValid(this)
	}
	function parsingFlags() {
		return extend({}, getParsingFlags(this))
	}
	function invalidAt() {
		return getParsingFlags(this).overflow
	}
	function creationData() {
		return {
			input: this._i,
			format: this._f,
			locale: this._locale,
			isUTC: this._isUTC,
			strict: this._strict
		}
	}
	function addWeekYearFormatToken(token, getter) {
		addFormatToken(0, [token, token.length], 0, getter)
	}
	function getSetWeekYear(input) {
		return getSetWeekYearHelper.call(this, input, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
	}
	function getSetISOWeekYear(input) {
		return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4)
	}
	function getISOWeeksInYear() {
		return weeksInYear(this.year(), 1, 4)
	}
	function getWeeksInYear() {
		var weekInfo = this.localeData()._week;
		return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy)
	}
	function getSetWeekYearHelper(input, week, weekday, dow, doy) {
		var weeksTarget;
		return null == input ? weekOfYear(this, dow, doy).year : (weeksTarget = weeksInYear(input, dow, doy), week > weeksTarget && (week = weeksTarget), setWeekAll.call(this, input, week, weekday, dow, doy))
	}
	function setWeekAll(weekYear, week, weekday, dow, doy) {
		var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
			date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
		return this.year(date.getUTCFullYear()), this.month(date.getUTCMonth()), this.date(date.getUTCDate()), this
	}
	function getSetQuarter(input) {
		return null == input ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (input - 1) + this.month() % 3)
	}
	function localeWeek(mom) {
		return weekOfYear(mom, this._week.dow, this._week.doy).week
	}
	function localeFirstDayOfWeek() {
		return this._week.dow
	}
	function localeFirstDayOfYear() {
		return this._week.doy
	}
	function getSetWeek(input) {
		var week = this.localeData().week(this);
		return null == input ? week : this.add(7 * (input - week), "d")
	}
	function getSetISOWeek(input) {
		var week = weekOfYear(this, 1, 4).week;
		return null == input ? week : this.add(7 * (input - week), "d")
	}
	function parseWeekday(input, locale) {
		return "string" != typeof input ? input : isNaN(input) ? (input = locale.weekdaysParse(input), "number" == typeof input ? input : null) : parseInt(input, 10)
	}
	function localeWeekdays(m, format) {
		return isArray(this._weekdays) ? this._weekdays[m.day()] : this._weekdays[this._weekdays.isFormat.test(format) ? "format" : "standalone"][m.day()]
	}
	function localeWeekdaysShort(m) {
		return this._weekdaysShort[m.day()]
	}
	function localeWeekdaysMin(m) {
		return this._weekdaysMin[m.day()]
	}
	function day_of_week__handleStrictParse(weekdayName, format, strict) {
		var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
		if (!this._weekdaysParse) for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], i = 0; i < 7; ++i) mom = create_utc__createUTC([2e3, 1]).day(i), this._minWeekdaysParse[i] = this.weekdaysMin(mom, "").toLocaleLowerCase(), this._shortWeekdaysParse[i] = this.weekdaysShort(mom, "").toLocaleLowerCase(), this._weekdaysParse[i] = this.weekdays(mom, "").toLocaleLowerCase();
		return strict ? "dddd" === format ? (ii = indexOf.call(this._weekdaysParse, llc), ii !== -1 ? ii : null) : "ddd" === format ? (ii = indexOf.call(this._shortWeekdaysParse, llc), ii !== -1 ? ii : null) : (ii = indexOf.call(this._minWeekdaysParse, llc), ii !== -1 ? ii : null) : "dddd" === format ? (ii = indexOf.call(this._weekdaysParse, llc), ii !== -1 ? ii : (ii = indexOf.call(this._shortWeekdaysParse, llc), ii !== -1 ? ii : (ii = indexOf.call(this._minWeekdaysParse, llc), ii !== -1 ? ii : null))) : "ddd" === format ? (ii = indexOf.call(this._shortWeekdaysParse, llc), ii !== -1 ? ii : (ii = indexOf.call(this._weekdaysParse, llc), ii !== -1 ? ii : (ii = indexOf.call(this._minWeekdaysParse, llc), ii !== -1 ? ii : null))) : (ii = indexOf.call(this._minWeekdaysParse, llc), ii !== -1 ? ii : (ii = indexOf.call(this._weekdaysParse, llc), ii !== -1 ? ii : (ii = indexOf.call(this._shortWeekdaysParse, llc), ii !== -1 ? ii : null)))
	}
	function localeWeekdaysParse(weekdayName, format, strict) {
		var i, mom, regex;
		if (this._weekdaysParseExact) return day_of_week__handleStrictParse.call(this, weekdayName, format, strict);
		for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), i = 0; i < 7; i++) {
			if (mom = create_utc__createUTC([2e3, 1]).day(i), strict && !this._fullWeekdaysParse[i] && (this._fullWeekdaysParse[i] = new RegExp("^" + this.weekdays(mom, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[i] = new RegExp("^" + this.weekdaysShort(mom, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[i] = new RegExp("^" + this.weekdaysMin(mom, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[i] || (regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, ""), this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i")), strict && "dddd" === format && this._fullWeekdaysParse[i].test(weekdayName)) return i;
			if (strict && "ddd" === format && this._shortWeekdaysParse[i].test(weekdayName)) return i;
			if (strict && "dd" === format && this._minWeekdaysParse[i].test(weekdayName)) return i;
			if (!strict && this._weekdaysParse[i].test(weekdayName)) return i
		}
	}
	function getSetDayOfWeek(input) {
		if (!this.isValid()) return null != input ? this : NaN;
		var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
		return null != input ? (input = parseWeekday(input, this.localeData()), this.add(input - day, "d")) : day
	}
	function getSetLocaleDayOfWeek(input) {
		if (!this.isValid()) return null != input ? this : NaN;
		var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
		return null == input ? weekday : this.add(input - weekday, "d")
	}
	function getSetISODayOfWeek(input) {
		return this.isValid() ? null == input ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7) : null != input ? this : NaN
	}
	function weekdaysRegex(isStrict) {
		return this._weekdaysParseExact ? (hasOwnProp(this, "_weekdaysRegex") || computeWeekdaysParse.call(this), isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex) : this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex
	}
	function weekdaysShortRegex(isStrict) {
		return this._weekdaysParseExact ? (hasOwnProp(this, "_weekdaysRegex") || computeWeekdaysParse.call(this), isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex
	}
	function weekdaysMinRegex(isStrict) {
		return this._weekdaysParseExact ? (hasOwnProp(this, "_weekdaysRegex") || computeWeekdaysParse.call(this), isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex
	}
	function computeWeekdaysParse() {
		function cmpLenRev(a, b) {
			return b.length - a.length
		}
		var i, mom, minp, shortp, longp, minPieces = [],
			shortPieces = [],
			longPieces = [],
			mixedPieces = [];
		for (i = 0; i < 7; i++) mom = create_utc__createUTC([2e3, 1]).day(i), minp = this.weekdaysMin(mom, ""), shortp = this.weekdaysShort(mom, ""), longp = this.weekdays(mom, ""), minPieces.push(minp), shortPieces.push(shortp), longPieces.push(longp), mixedPieces.push(minp), mixedPieces.push(shortp), mixedPieces.push(longp);
		for (minPieces.sort(cmpLenRev), shortPieces.sort(cmpLenRev), longPieces.sort(cmpLenRev), mixedPieces.sort(cmpLenRev), i = 0; i < 7; i++) shortPieces[i] = regexEscape(shortPieces[i]), longPieces[i] = regexEscape(longPieces[i]), mixedPieces[i] = regexEscape(mixedPieces[i]);
		this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + longPieces.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + shortPieces.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + minPieces.join("|") + ")", "i")
	}
	function getSetDayOfYear(input) {
		var dayOfYear = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
		return null == input ? dayOfYear : this.add(input - dayOfYear, "d")
	}
	function hFormat() {
		return this.hours() % 12 || 12
	}
	function kFormat() {
		return this.hours() || 24
	}
	function meridiem(token, lowercase) {
		addFormatToken(token, 0, 0, function() {
			return this.localeData().meridiem(this.hours(), this.minutes(), lowercase)
		})
	}
	function matchMeridiem(isStrict, locale) {
		return locale._meridiemParse
	}
	function localeIsPM(input) {
		return "p" === (input + "").toLowerCase().charAt(0)
	}
	function localeMeridiem(hours, minutes, isLower) {
		return hours > 11 ? isLower ? "pm" : "PM" : isLower ? "am" : "AM"
	}
	function parseMs(input, array) {
		array[MILLISECOND] = toInt(1e3 * ("0." + input))
	}
	function getZoneAbbr() {
		return this._isUTC ? "UTC" : ""
	}
	function getZoneName() {
		return this._isUTC ? "Coordinated Universal Time" : ""
	}
	function moment__createUnix(input) {
		return local__createLocal(1e3 * input)
	}
	function moment__createInZone() {
		return local__createLocal.apply(null, arguments).parseZone()
	}
	function locale_calendar__calendar(key, mom, now) {
		var output = this._calendar[key];
		return isFunction(output) ? output.call(mom, now) : output
	}
	function longDateFormat(key) {
		var format = this._longDateFormat[key],
			formatUpper = this._longDateFormat[key.toUpperCase()];
		return format || !formatUpper ? format : (this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function(val) {
			return val.slice(1)
		}), this._longDateFormat[key])
	}
	function invalidDate() {
		return this._invalidDate
	}
	function ordinal(number) {
		return this._ordinal.replace("%d", number)
	}
	function preParsePostFormat(string) {
		return string
	}
	function relative__relativeTime(number, withoutSuffix, string, isFuture) {
		var output = this._relativeTime[string];
		return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number)
	}
	function pastFuture(diff, output) {
		var format = this._relativeTime[diff > 0 ? "future" : "past"];
		return isFunction(format) ? format(output) : format.replace(/%s/i, output)
	}
	function lists__get(format, index, field, setter) {
		var locale = locale_locales__getLocale(),
			utc = create_utc__createUTC().set(setter, index);
		return locale[field](utc, format)
	}
	function listMonthsImpl(format, index, field) {
		if ("number" == typeof format && (index = format, format = void 0), format = format || "", null != index) return lists__get(format, index, field, "month");
		var i, out = [];
		for (i = 0; i < 12; i++) out[i] = lists__get(format, i, field, "month");
		return out
	}
	function listWeekdaysImpl(localeSorted, format, index, field) {
		"boolean" == typeof localeSorted ? ("number" == typeof format && (index = format, format = void 0), format = format || "") : (format = localeSorted, index = format, localeSorted = !1, "number" == typeof format && (index = format, format = void 0), format = format || "");
		var locale = locale_locales__getLocale(),
			shift = localeSorted ? locale._week.dow : 0;
		if (null != index) return lists__get(format, (index + shift) % 7, field, "day");
		var i, out = [];
		for (i = 0; i < 7; i++) out[i] = lists__get(format, (i + shift) % 7, field, "day");
		return out
	}
	function lists__listMonths(format, index) {
		return listMonthsImpl(format, index, "months")
	}
	function lists__listMonthsShort(format, index) {
		return listMonthsImpl(format, index, "monthsShort")
	}
	function lists__listWeekdays(localeSorted, format, index) {
		return listWeekdaysImpl(localeSorted, format, index, "weekdays")
	}
	function lists__listWeekdaysShort(localeSorted, format, index) {
		return listWeekdaysImpl(localeSorted, format, index, "weekdaysShort")
	}
	function lists__listWeekdaysMin(localeSorted, format, index) {
		return listWeekdaysImpl(localeSorted, format, index, "weekdaysMin")
	}
	function duration_abs__abs() {
		var data = this._data;
		return this._milliseconds = mathAbs(this._milliseconds), this._days = mathAbs(this._days), this._months = mathAbs(this._months), data.milliseconds = mathAbs(data.milliseconds), data.seconds = mathAbs(data.seconds), data.minutes = mathAbs(data.minutes), data.hours = mathAbs(data.hours), data.months = mathAbs(data.months), data.years = mathAbs(data.years), this
	}
	function duration_add_subtract__addSubtract(duration, input, value, direction) {
		var other = create__createDuration(input, value);
		return duration._milliseconds += direction * other._milliseconds, duration._days += direction * other._days, duration._months += direction * other._months, duration._bubble()
	}
	function duration_add_subtract__add(input, value) {
		return duration_add_subtract__addSubtract(this, input, value, 1)
	}
	function duration_add_subtract__subtract(input, value) {
		return duration_add_subtract__addSubtract(this, input, value, -1)
	}
	function absCeil(number) {
		return number < 0 ? Math.floor(number) : Math.ceil(number)
	}
	function bubble() {
		var seconds, minutes, hours, years, monthsFromDays, milliseconds = this._milliseconds,
			days = this._days,
			months = this._months,
			data = this._data;
		return milliseconds >= 0 && days >= 0 && months >= 0 || milliseconds <= 0 && days <= 0 && months <= 0 || (milliseconds += 864e5 * absCeil(monthsToDays(months) + days), days = 0, months = 0), data.milliseconds = milliseconds % 1e3, seconds = absFloor(milliseconds / 1e3), data.seconds = seconds % 60, minutes = absFloor(seconds / 60), data.minutes = minutes % 60, hours = absFloor(minutes / 60), data.hours = hours % 24, days += absFloor(hours / 24), monthsFromDays = absFloor(daysToMonths(days)), months += monthsFromDays, days -= absCeil(monthsToDays(monthsFromDays)), years = absFloor(months / 12), months %= 12, data.days = days, data.months = months, data.years = years, this
	}
	function daysToMonths(days) {
		return 4800 * days / 146097
	}
	function monthsToDays(months) {
		return 146097 * months / 4800
	}
	function as(units) {
		var days, months, milliseconds = this._milliseconds;
		if (units = normalizeUnits(units), "month" === units || "year" === units) return days = this._days + milliseconds / 864e5, months = this._months + daysToMonths(days), "month" === units ? months : months / 12;
		switch (days = this._days + Math.round(monthsToDays(this._months)), units) {
		case "week":
			return days / 7 + milliseconds / 6048e5;
		case "day":
			return days + milliseconds / 864e5;
		case "hour":
			return 24 * days + milliseconds / 36e5;
		case "minute":
			return 1440 * days + milliseconds / 6e4;
		case "second":
			return 86400 * days + milliseconds / 1e3;
		case "millisecond":
			return Math.floor(864e5 * days) + milliseconds;
		default:
			throw new Error("Unknown unit " + units)
		}
	}
	function duration_as__valueOf() {
		return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * toInt(this._months / 12)
	}
	function makeAs(alias) {
		return function() {
			return this.as(alias)
		}
	}
	function duration_get__get(units) {
		return units = normalizeUnits(units), this[units + "s"]()
	}
	function makeGetter(name) {
		return function() {
			return this._data[name]
		}
	}
	function weeks() {
		return absFloor(this.days() / 7)
	}
	function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
		return locale.relativeTime(number || 1, !! withoutSuffix, string, isFuture)
	}
	function duration_humanize__relativeTime(posNegDuration, withoutSuffix, locale) {
		var duration = create__createDuration(posNegDuration).abs(),
			seconds = round(duration.as("s")),
			minutes = round(duration.as("m")),
			hours = round(duration.as("h")),
			days = round(duration.as("d")),
			months = round(duration.as("M")),
			years = round(duration.as("y")),
			a = seconds < thresholds.s && ["s", seconds] || minutes <= 1 && ["m"] || minutes < thresholds.m && ["mm", minutes] || hours <= 1 && ["h"] || hours < thresholds.h && ["hh", hours] || days <= 1 && ["d"] || days < thresholds.d && ["dd", days] || months <= 1 && ["M"] || months < thresholds.M && ["MM", months] || years <= 1 && ["y"] || ["yy", years];
		return a[2] = withoutSuffix, a[3] = +posNegDuration > 0, a[4] = locale, substituteTimeAgo.apply(null, a)
	}
	function duration_humanize__getSetRelativeTimeThreshold(threshold, limit) {
		return void 0 !== thresholds[threshold] && (void 0 === limit ? thresholds[threshold] : (thresholds[threshold] = limit, !0))
	}
	function humanize(withSuffix) {
		var locale = this.localeData(),
			output = duration_humanize__relativeTime(this, !withSuffix, locale);
		return withSuffix && (output = locale.pastFuture(+this, output)), locale.postformat(output)
	}
	function iso_string__toISOString() {
		var minutes, hours, years, seconds = iso_string__abs(this._milliseconds) / 1e3,
			days = iso_string__abs(this._days),
			months = iso_string__abs(this._months);
		minutes = absFloor(seconds / 60), hours = absFloor(minutes / 60), seconds %= 60, minutes %= 60, years = absFloor(months / 12), months %= 12;
		var Y = years,
			M = months,
			D = days,
			h = hours,
			m = minutes,
			s = seconds,
			total = this.asSeconds();
		return total ? (total < 0 ? "-" : "") + "P" + (Y ? Y + "Y" : "") + (M ? M + "M" : "") + (D ? D + "D" : "") + (h || m || s ? "T" : "") + (h ? h + "H" : "") + (m ? m + "M" : "") + (s ? s + "S" : "") : "P0D"
	}
	var hookCallback, some;
	some = Array.prototype.some ? Array.prototype.some : function(fun) {
		for (var t = Object(this), len = t.length >>> 0, i = 0; i < len; i++) if (i in t && fun.call(this, t[i], i, t)) return !0;
		return !1
	};
	var momentProperties = utils_hooks__hooks.momentProperties = [],
		updateInProgress = !1,
		deprecations = {};
	utils_hooks__hooks.suppressDeprecationWarnings = !1, utils_hooks__hooks.deprecationHandler = null;
	var keys;
	keys = Object.keys ? Object.keys : function(obj) {
		var i, res = [];
		for (i in obj) hasOwnProp(obj, i) && res.push(i);
		return res
	};
	var globalLocale, indexOf, locales = {},
		aliases = {},
		formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
		localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
		formatFunctions = {},
		formatTokenFunctions = {},
		match1 = /\d/,
		match2 = /\d\d/,
		match3 = /\d{3}/,
		match4 = /\d{4}/,
		match6 = /[+-]?\d{6}/,
		match1to2 = /\d\d?/,
		match3to4 = /\d\d\d\d?/,
		match5to6 = /\d\d\d\d\d\d?/,
		match1to3 = /\d{1,3}/,
		match1to4 = /\d{1,4}/,
		match1to6 = /[+-]?\d{1,6}/,
		matchUnsigned = /\d+/,
		matchSigned = /[+-]?\d+/,
		matchOffset = /Z|[+-]\d\d:?\d\d/gi,
		matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi,
		matchTimestamp = /[+-]?\d+(\.\d{1,3})?/,
		matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
		regexes = {},
		tokens = {},
		YEAR = 0,
		MONTH = 1,
		DATE = 2,
		HOUR = 3,
		MINUTE = 4,
		SECOND = 5,
		MILLISECOND = 6,
		WEEK = 7,
		WEEKDAY = 8;
	indexOf = Array.prototype.indexOf ? Array.prototype.indexOf : function(o) {
		var i;
		for (i = 0; i < this.length; ++i) if (this[i] === o) return i;
		return -1
	}, addFormatToken("M", ["MM", 2], "Mo", function() {
		return this.month() + 1
	}), addFormatToken("MMM", 0, 0, function(format) {
		return this.localeData().monthsShort(this, format)
	}), addFormatToken("MMMM", 0, 0, function(format) {
		return this.localeData().months(this, format)
	}), addUnitAlias("month", "M"), addRegexToken("M", match1to2), addRegexToken("MM", match1to2, match2), addRegexToken("MMM", function(isStrict, locale) {
		return locale.monthsShortRegex(isStrict)
	}), addRegexToken("MMMM", function(isStrict, locale) {
		return locale.monthsRegex(isStrict)
	}), addParseToken(["M", "MM"], function(input, array) {
		array[MONTH] = toInt(input) - 1
	}), addParseToken(["MMM", "MMMM"], function(input, array, config, token) {
		var month = config._locale.monthsParse(input, token, config._strict);
		null != month ? array[MONTH] = month : getParsingFlags(config).invalidMonth = input
	});
	var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,
		defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
		defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
		defaultMonthsShortRegex = matchWord,
		defaultMonthsRegex = matchWord,
		extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
		basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
		tzRegex = /Z|[+-]\d\d(?::?\d\d)?/,
		isoDates = [
			["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
			["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
			["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
			["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
			["YYYY-DDD", /\d{4}-\d{3}/],
			["YYYY-MM", /\d{4}-\d\d/, !1],
			["YYYYYYMMDD", /[+-]\d{10}/],
			["YYYYMMDD", /\d{8}/],
			["GGGG[W]WWE", /\d{4}W\d{3}/],
			["GGGG[W]WW", /\d{4}W\d{2}/, !1],
			["YYYYDDD", /\d{7}/]
		],
		isoTimes = [
			["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
			["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
			["HH:mm:ss", /\d\d:\d\d:\d\d/],
			["HH:mm", /\d\d:\d\d/],
			["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
			["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
			["HHmmss", /\d\d\d\d\d\d/],
			["HHmm", /\d\d\d\d/],
			["HH", /\d\d/]
		],
		aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;
	utils_hooks__hooks.createFromInputFallback = deprecate("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(config) {
		config._d = new Date(config._i + (config._useUTC ? " UTC" : ""))
	}), addFormatToken("Y", 0, 0, function() {
		var y = this.year();
		return y <= 9999 ? "" + y : "+" + y
	}), addFormatToken(0, ["YY", 2], 0, function() {
		return this.year() % 100
	}), addFormatToken(0, ["YYYY", 4], 0, "year"), addFormatToken(0, ["YYYYY", 5], 0, "year"), addFormatToken(0, ["YYYYYY", 6, !0], 0, "year"), addUnitAlias("year", "y"), addRegexToken("Y", matchSigned), addRegexToken("YY", match1to2, match2), addRegexToken("YYYY", match1to4, match4), addRegexToken("YYYYY", match1to6, match6), addRegexToken("YYYYYY", match1to6, match6), addParseToken(["YYYYY", "YYYYYY"], YEAR), addParseToken("YYYY", function(input, array) {
		array[YEAR] = 2 === input.length ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input)
	}), addParseToken("YY", function(input, array) {
		array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input)
	}), addParseToken("Y", function(input, array) {
		array[YEAR] = parseInt(input, 10)
	}), utils_hooks__hooks.parseTwoDigitYear = function(input) {
		return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3)
	};
	var getSetYear = makeGetSet("FullYear", !0);
	utils_hooks__hooks.ISO_8601 = function() {};
	var prototypeMin = deprecate("moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function() {
		var other = local__createLocal.apply(null, arguments);
		return this.isValid() && other.isValid() ? other < this ? this : other : valid__createInvalid()
	}),
		prototypeMax = deprecate("moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function() {
			var other = local__createLocal.apply(null, arguments);
			return this.isValid() && other.isValid() ? other > this ? this : other : valid__createInvalid()
		}),
		now = function() {
			return Date.now ? Date.now() : +new Date
		};
	offset("Z", ":"), offset("ZZ", ""), addRegexToken("Z", matchShortOffset), addRegexToken("ZZ", matchShortOffset), addParseToken(["Z", "ZZ"], function(input, array, config) {
		config._useUTC = !0, config._tzm = offsetFromString(matchShortOffset, input)
	});
	var chunkOffset = /([\+\-]|\d\d)/gi;
	utils_hooks__hooks.updateOffset = function() {};
	var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/,
		isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
	create__createDuration.fn = Duration.prototype;
	var add_subtract__add = createAdder(1, "add"),
		add_subtract__subtract = createAdder(-1, "subtract");
	utils_hooks__hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", utils_hooks__hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
	var lang = deprecate("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(key) {
		return void 0 === key ? this.localeData() : this.locale(key)
	});
	addFormatToken(0, ["gg", 2], 0, function() {
		return this.weekYear() % 100
	}), addFormatToken(0, ["GG", 2], 0, function() {
		return this.isoWeekYear() % 100
	}), addWeekYearFormatToken("gggg", "weekYear"), addWeekYearFormatToken("ggggg", "weekYear"), addWeekYearFormatToken("GGGG", "isoWeekYear"), addWeekYearFormatToken("GGGGG", "isoWeekYear"), addUnitAlias("weekYear", "gg"), addUnitAlias("isoWeekYear", "GG"), addRegexToken("G", matchSigned), addRegexToken("g", matchSigned), addRegexToken("GG", match1to2, match2), addRegexToken("gg", match1to2, match2), addRegexToken("GGGG", match1to4, match4), addRegexToken("gggg", match1to4, match4), addRegexToken("GGGGG", match1to6, match6), addRegexToken("ggggg", match1to6, match6), addWeekParseToken(["gggg", "ggggg", "GGGG", "GGGGG"], function(input, week, config, token) {
		week[token.substr(0, 2)] = toInt(input)
	}), addWeekParseToken(["gg", "GG"], function(input, week, config, token) {
		week[token] = utils_hooks__hooks.parseTwoDigitYear(input)
	}), addFormatToken("Q", 0, "Qo", "quarter"), addUnitAlias("quarter", "Q"), addRegexToken("Q", match1), addParseToken("Q", function(input, array) {
		array[MONTH] = 3 * (toInt(input) - 1)
	}), addFormatToken("w", ["ww", 2], "wo", "week"), addFormatToken("W", ["WW", 2], "Wo", "isoWeek"), addUnitAlias("week", "w"), addUnitAlias("isoWeek", "W"), addRegexToken("w", match1to2), addRegexToken("ww", match1to2, match2), addRegexToken("W", match1to2), addRegexToken("WW", match1to2, match2), addWeekParseToken(["w", "ww", "W", "WW"], function(input, week, config, token) {
		week[token.substr(0, 1)] = toInt(input)
	});
	var defaultLocaleWeek = {
		dow: 0,
		doy: 6
	};
	addFormatToken("D", ["DD", 2], "Do", "date"), addUnitAlias("date", "D"), addRegexToken("D", match1to2), addRegexToken("DD", match1to2, match2), addRegexToken("Do", function(isStrict, locale) {
		return isStrict ? locale._ordinalParse : locale._ordinalParseLenient
	}), addParseToken(["D", "DD"], DATE), addParseToken("Do", function(input, array) {
		array[DATE] = toInt(input.match(match1to2)[0], 10)
	});
	var getSetDayOfMonth = makeGetSet("Date", !0);
	addFormatToken("d", 0, "do", "day"), addFormatToken("dd", 0, 0, function(format) {
		return this.localeData().weekdaysMin(this, format)
	}), addFormatToken("ddd", 0, 0, function(format) {
		return this.localeData().weekdaysShort(this, format)
	}), addFormatToken("dddd", 0, 0, function(format) {
		return this.localeData().weekdays(this, format)
	}), addFormatToken("e", 0, 0, "weekday"), addFormatToken("E", 0, 0, "isoWeekday"), addUnitAlias("day", "d"), addUnitAlias("weekday", "e"), addUnitAlias("isoWeekday", "E"), addRegexToken("d", match1to2), addRegexToken("e", match1to2), addRegexToken("E", match1to2), addRegexToken("dd", function(isStrict, locale) {
		return locale.weekdaysMinRegex(isStrict)
	}), addRegexToken("ddd", function(isStrict, locale) {
		return locale.weekdaysShortRegex(isStrict)
	}), addRegexToken("dddd", function(isStrict, locale) {
		return locale.weekdaysRegex(isStrict)
	}), addWeekParseToken(["dd", "ddd", "dddd"], function(input, week, config, token) {
		var weekday = config._locale.weekdaysParse(input, token, config._strict);
		null != weekday ? week.d = weekday : getParsingFlags(config).invalidWeekday = input
	}), addWeekParseToken(["d", "e", "E"], function(input, week, config, token) {
		week[token] = toInt(input)
	});
	var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
		defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
		defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
		defaultWeekdaysRegex = matchWord,
		defaultWeekdaysShortRegex = matchWord,
		defaultWeekdaysMinRegex = matchWord;
	addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), addUnitAlias("dayOfYear", "DDD"), addRegexToken("DDD", match1to3), addRegexToken("DDDD", match3), addParseToken(["DDD", "DDDD"], function(input, array, config) {
		config._dayOfYear = toInt(input)
	}), addFormatToken("H", ["HH", 2], 0, "hour"), addFormatToken("h", ["hh", 2], 0, hFormat), addFormatToken("k", ["kk", 2], 0, kFormat), addFormatToken("hmm", 0, 0, function() {
		return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2)
	}), addFormatToken("hmmss", 0, 0, function() {
		return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2)
	}), addFormatToken("Hmm", 0, 0, function() {
		return "" + this.hours() + zeroFill(this.minutes(), 2)
	}), addFormatToken("Hmmss", 0, 0, function() {
		return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2)
	}), meridiem("a", !0), meridiem("A", !1), addUnitAlias("hour", "h"), addRegexToken("a", matchMeridiem), addRegexToken("A", matchMeridiem), addRegexToken("H", match1to2), addRegexToken("h", match1to2), addRegexToken("HH", match1to2, match2), addRegexToken("hh", match1to2, match2), addRegexToken("hmm", match3to4), addRegexToken("hmmss", match5to6), addRegexToken("Hmm", match3to4), addRegexToken("Hmmss", match5to6), addParseToken(["H", "HH"], HOUR), addParseToken(["a", "A"], function(input, array, config) {
		config._isPm = config._locale.isPM(input), config._meridiem = input
	}), addParseToken(["h", "hh"], function(input, array, config) {
		array[HOUR] = toInt(input), getParsingFlags(config).bigHour = !0;
	}), addParseToken("hmm", function(input, array, config) {
		var pos = input.length - 2;
		array[HOUR] = toInt(input.substr(0, pos)), array[MINUTE] = toInt(input.substr(pos)), getParsingFlags(config).bigHour = !0
	}), addParseToken("hmmss", function(input, array, config) {
		var pos1 = input.length - 4,
			pos2 = input.length - 2;
		array[HOUR] = toInt(input.substr(0, pos1)), array[MINUTE] = toInt(input.substr(pos1, 2)), array[SECOND] = toInt(input.substr(pos2)), getParsingFlags(config).bigHour = !0
	}), addParseToken("Hmm", function(input, array, config) {
		var pos = input.length - 2;
		array[HOUR] = toInt(input.substr(0, pos)), array[MINUTE] = toInt(input.substr(pos))
	}), addParseToken("Hmmss", function(input, array, config) {
		var pos1 = input.length - 4,
			pos2 = input.length - 2;
		array[HOUR] = toInt(input.substr(0, pos1)), array[MINUTE] = toInt(input.substr(pos1, 2)), array[SECOND] = toInt(input.substr(pos2))
	});
	var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i,
		getSetHour = makeGetSet("Hours", !0);
	addFormatToken("m", ["mm", 2], 0, "minute"), addUnitAlias("minute", "m"), addRegexToken("m", match1to2), addRegexToken("mm", match1to2, match2), addParseToken(["m", "mm"], MINUTE);
	var getSetMinute = makeGetSet("Minutes", !1);
	addFormatToken("s", ["ss", 2], 0, "second"), addUnitAlias("second", "s"), addRegexToken("s", match1to2), addRegexToken("ss", match1to2, match2), addParseToken(["s", "ss"], SECOND);
	var getSetSecond = makeGetSet("Seconds", !1);
	addFormatToken("S", 0, 0, function() {
		return ~~ (this.millisecond() / 100)
	}), addFormatToken(0, ["SS", 2], 0, function() {
		return ~~ (this.millisecond() / 10)
	}), addFormatToken(0, ["SSS", 3], 0, "millisecond"), addFormatToken(0, ["SSSS", 4], 0, function() {
		return 10 * this.millisecond()
	}), addFormatToken(0, ["SSSSS", 5], 0, function() {
		return 100 * this.millisecond()
	}), addFormatToken(0, ["SSSSSS", 6], 0, function() {
		return 1e3 * this.millisecond()
	}), addFormatToken(0, ["SSSSSSS", 7], 0, function() {
		return 1e4 * this.millisecond()
	}), addFormatToken(0, ["SSSSSSSS", 8], 0, function() {
		return 1e5 * this.millisecond()
	}), addFormatToken(0, ["SSSSSSSSS", 9], 0, function() {
		return 1e6 * this.millisecond()
	}), addUnitAlias("millisecond", "ms"), addRegexToken("S", match1to3, match1), addRegexToken("SS", match1to3, match2), addRegexToken("SSS", match1to3, match3);
	var token;
	for (token = "SSSS"; token.length <= 9; token += "S") addRegexToken(token, matchUnsigned);
	for (token = "S"; token.length <= 9; token += "S") addParseToken(token, parseMs);
	var getSetMillisecond = makeGetSet("Milliseconds", !1);
	addFormatToken("z", 0, 0, "zoneAbbr"), addFormatToken("zz", 0, 0, "zoneName");
	var momentPrototype__proto = Moment.prototype;
	momentPrototype__proto.add = add_subtract__add, momentPrototype__proto.calendar = moment_calendar__calendar, momentPrototype__proto.clone = clone, momentPrototype__proto.diff = diff, momentPrototype__proto.endOf = endOf, momentPrototype__proto.format = format, momentPrototype__proto.from = from, momentPrototype__proto.fromNow = fromNow, momentPrototype__proto.to = to, momentPrototype__proto.toNow = toNow, momentPrototype__proto.get = getSet, momentPrototype__proto.invalidAt = invalidAt, momentPrototype__proto.isAfter = isAfter, momentPrototype__proto.isBefore = isBefore, momentPrototype__proto.isBetween = isBetween, momentPrototype__proto.isSame = isSame, momentPrototype__proto.isSameOrAfter = isSameOrAfter, momentPrototype__proto.isSameOrBefore = isSameOrBefore, momentPrototype__proto.isValid = moment_valid__isValid, momentPrototype__proto.lang = lang, momentPrototype__proto.locale = locale, momentPrototype__proto.localeData = localeData, momentPrototype__proto.max = prototypeMax, momentPrototype__proto.min = prototypeMin, momentPrototype__proto.parsingFlags = parsingFlags, momentPrototype__proto.set = getSet, momentPrototype__proto.startOf = startOf, momentPrototype__proto.subtract = add_subtract__subtract, momentPrototype__proto.toArray = toArray, momentPrototype__proto.toObject = toObject, momentPrototype__proto.toDate = toDate, momentPrototype__proto.toISOString = moment_format__toISOString, momentPrototype__proto.toJSON = toJSON, momentPrototype__proto.toString = toString, momentPrototype__proto.unix = unix, momentPrototype__proto.valueOf = to_type__valueOf, momentPrototype__proto.creationData = creationData, momentPrototype__proto.year = getSetYear, momentPrototype__proto.isLeapYear = getIsLeapYear, momentPrototype__proto.weekYear = getSetWeekYear, momentPrototype__proto.isoWeekYear = getSetISOWeekYear, momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter, momentPrototype__proto.month = getSetMonth, momentPrototype__proto.daysInMonth = getDaysInMonth, momentPrototype__proto.week = momentPrototype__proto.weeks = getSetWeek, momentPrototype__proto.isoWeek = momentPrototype__proto.isoWeeks = getSetISOWeek, momentPrototype__proto.weeksInYear = getWeeksInYear, momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear, momentPrototype__proto.date = getSetDayOfMonth, momentPrototype__proto.day = momentPrototype__proto.days = getSetDayOfWeek, momentPrototype__proto.weekday = getSetLocaleDayOfWeek, momentPrototype__proto.isoWeekday = getSetISODayOfWeek, momentPrototype__proto.dayOfYear = getSetDayOfYear, momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour, momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute, momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond, momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond, momentPrototype__proto.utcOffset = getSetOffset, momentPrototype__proto.utc = setOffsetToUTC, momentPrototype__proto.local = setOffsetToLocal, momentPrototype__proto.parseZone = setOffsetToParsedOffset, momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset, momentPrototype__proto.isDST = isDaylightSavingTime, momentPrototype__proto.isDSTShifted = isDaylightSavingTimeShifted, momentPrototype__proto.isLocal = isLocal, momentPrototype__proto.isUtcOffset = isUtcOffset, momentPrototype__proto.isUtc = isUtc, momentPrototype__proto.isUTC = isUtc, momentPrototype__proto.zoneAbbr = getZoneAbbr, momentPrototype__proto.zoneName = getZoneName, momentPrototype__proto.dates = deprecate("dates accessor is deprecated. Use date instead.", getSetDayOfMonth), momentPrototype__proto.months = deprecate("months accessor is deprecated. Use month instead", getSetMonth), momentPrototype__proto.years = deprecate("years accessor is deprecated. Use year instead", getSetYear), momentPrototype__proto.zone = deprecate("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", getSetZone);
	var momentPrototype = momentPrototype__proto,
		defaultCalendar = {
			sameDay: "[Today at] LT",
			nextDay: "[Tomorrow at] LT",
			nextWeek: "dddd [at] LT",
			lastDay: "[Yesterday at] LT",
			lastWeek: "[Last] dddd [at] LT",
			sameElse: "L"
		},
		defaultLongDateFormat = {
			LTS: "h:mm:ss A",
			LT: "h:mm A",
			L: "MM/DD/YYYY",
			LL: "MMMM D, YYYY",
			LLL: "MMMM D, YYYY h:mm A",
			LLLL: "dddd, MMMM D, YYYY h:mm A"
		},
		defaultInvalidDate = "Invalid date",
		defaultOrdinal = "%d",
		defaultOrdinalParse = /\d{1,2}/,
		defaultRelativeTime = {
			future: "in %s",
			past: "%s ago",
			s: "a few seconds",
			m: "a minute",
			mm: "%d minutes",
			h: "an hour",
			hh: "%d hours",
			d: "a day",
			dd: "%d days",
			M: "a month",
			MM: "%d months",
			y: "a year",
			yy: "%d years"
		},
		prototype__proto = Locale.prototype;
	prototype__proto._calendar = defaultCalendar, prototype__proto.calendar = locale_calendar__calendar, prototype__proto._longDateFormat = defaultLongDateFormat, prototype__proto.longDateFormat = longDateFormat, prototype__proto._invalidDate = defaultInvalidDate, prototype__proto.invalidDate = invalidDate, prototype__proto._ordinal = defaultOrdinal, prototype__proto.ordinal = ordinal, prototype__proto._ordinalParse = defaultOrdinalParse, prototype__proto.preparse = preParsePostFormat, prototype__proto.postformat = preParsePostFormat, prototype__proto._relativeTime = defaultRelativeTime, prototype__proto.relativeTime = relative__relativeTime, prototype__proto.pastFuture = pastFuture, prototype__proto.set = locale_set__set, prototype__proto.months = localeMonths, prototype__proto._months = defaultLocaleMonths, prototype__proto.monthsShort = localeMonthsShort, prototype__proto._monthsShort = defaultLocaleMonthsShort, prototype__proto.monthsParse = localeMonthsParse, prototype__proto._monthsRegex = defaultMonthsRegex, prototype__proto.monthsRegex = monthsRegex, prototype__proto._monthsShortRegex = defaultMonthsShortRegex, prototype__proto.monthsShortRegex = monthsShortRegex, prototype__proto.week = localeWeek, prototype__proto._week = defaultLocaleWeek, prototype__proto.firstDayOfYear = localeFirstDayOfYear, prototype__proto.firstDayOfWeek = localeFirstDayOfWeek, prototype__proto.weekdays = localeWeekdays, prototype__proto._weekdays = defaultLocaleWeekdays, prototype__proto.weekdaysMin = localeWeekdaysMin, prototype__proto._weekdaysMin = defaultLocaleWeekdaysMin, prototype__proto.weekdaysShort = localeWeekdaysShort, prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort, prototype__proto.weekdaysParse = localeWeekdaysParse, prototype__proto._weekdaysRegex = defaultWeekdaysRegex, prototype__proto.weekdaysRegex = weekdaysRegex, prototype__proto._weekdaysShortRegex = defaultWeekdaysShortRegex, prototype__proto.weekdaysShortRegex = weekdaysShortRegex, prototype__proto._weekdaysMinRegex = defaultWeekdaysMinRegex, prototype__proto.weekdaysMinRegex = weekdaysMinRegex, prototype__proto.isPM = localeIsPM, prototype__proto._meridiemParse = defaultLocaleMeridiemParse, prototype__proto.meridiem = localeMeridiem, locale_locales__getSetGlobalLocale("en", {
		ordinalParse: /\d{1,2}(th|st|nd|rd)/,
		ordinal: function(number) {
			var b = number % 10,
				output = 1 === toInt(number % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
			return number + output
		}
	}), utils_hooks__hooks.lang = deprecate("moment.lang is deprecated. Use moment.locale instead.", locale_locales__getSetGlobalLocale), utils_hooks__hooks.langData = deprecate("moment.langData is deprecated. Use moment.localeData instead.", locale_locales__getLocale);
	var mathAbs = Math.abs,
		asMilliseconds = makeAs("ms"),
		asSeconds = makeAs("s"),
		asMinutes = makeAs("m"),
		asHours = makeAs("h"),
		asDays = makeAs("d"),
		asWeeks = makeAs("w"),
		asMonths = makeAs("M"),
		asYears = makeAs("y"),
		milliseconds = makeGetter("milliseconds"),
		seconds = makeGetter("seconds"),
		minutes = makeGetter("minutes"),
		hours = makeGetter("hours"),
		days = makeGetter("days"),
		months = makeGetter("months"),
		years = makeGetter("years"),
		round = Math.round,
		thresholds = {
			s: 45,
			m: 45,
			h: 22,
			d: 26,
			M: 11
		},
		iso_string__abs = Math.abs,
		duration_prototype__proto = Duration.prototype;
	duration_prototype__proto.abs = duration_abs__abs, duration_prototype__proto.add = duration_add_subtract__add, duration_prototype__proto.subtract = duration_add_subtract__subtract, duration_prototype__proto.as = as, duration_prototype__proto.asMilliseconds = asMilliseconds, duration_prototype__proto.asSeconds = asSeconds, duration_prototype__proto.asMinutes = asMinutes, duration_prototype__proto.asHours = asHours, duration_prototype__proto.asDays = asDays, duration_prototype__proto.asWeeks = asWeeks, duration_prototype__proto.asMonths = asMonths, duration_prototype__proto.asYears = asYears, duration_prototype__proto.valueOf = duration_as__valueOf, duration_prototype__proto._bubble = bubble, duration_prototype__proto.get = duration_get__get, duration_prototype__proto.milliseconds = milliseconds, duration_prototype__proto.seconds = seconds, duration_prototype__proto.minutes = minutes, duration_prototype__proto.hours = hours, duration_prototype__proto.days = days, duration_prototype__proto.weeks = weeks, duration_prototype__proto.months = months, duration_prototype__proto.years = years, duration_prototype__proto.humanize = humanize, duration_prototype__proto.toISOString = iso_string__toISOString, duration_prototype__proto.toString = iso_string__toISOString, duration_prototype__proto.toJSON = iso_string__toISOString, duration_prototype__proto.locale = locale, duration_prototype__proto.localeData = localeData, duration_prototype__proto.toIsoString = deprecate("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", iso_string__toISOString), duration_prototype__proto.lang = lang, addFormatToken("X", 0, 0, "unix"), addFormatToken("x", 0, 0, "valueOf"), addRegexToken("x", matchSigned), addRegexToken("X", matchTimestamp), addParseToken("X", function(input, array, config) {
		config._d = new Date(1e3 * parseFloat(input, 10))
	}), addParseToken("x", function(input, array, config) {
		config._d = new Date(toInt(input))
	}), utils_hooks__hooks.version = "2.13.0", setHookCallback(local__createLocal), utils_hooks__hooks.fn = momentPrototype, utils_hooks__hooks.min = min, utils_hooks__hooks.max = max, utils_hooks__hooks.now = now, utils_hooks__hooks.utc = create_utc__createUTC, utils_hooks__hooks.unix = moment__createUnix, utils_hooks__hooks.months = lists__listMonths, utils_hooks__hooks.isDate = isDate, utils_hooks__hooks.locale = locale_locales__getSetGlobalLocale, utils_hooks__hooks.invalid = valid__createInvalid, utils_hooks__hooks.duration = create__createDuration, utils_hooks__hooks.isMoment = isMoment, utils_hooks__hooks.weekdays = lists__listWeekdays, utils_hooks__hooks.parseZone = moment__createInZone, utils_hooks__hooks.localeData = locale_locales__getLocale, utils_hooks__hooks.isDuration = isDuration, utils_hooks__hooks.monthsShort = lists__listMonthsShort, utils_hooks__hooks.weekdaysMin = lists__listWeekdaysMin, utils_hooks__hooks.defineLocale = defineLocale, utils_hooks__hooks.updateLocale = updateLocale, utils_hooks__hooks.locales = locale_locales__listLocales, utils_hooks__hooks.weekdaysShort = lists__listWeekdaysShort, utils_hooks__hooks.normalizeUnits = normalizeUnits, utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold, utils_hooks__hooks.prototype = momentPrototype;
	var _moment = utils_hooks__hooks;
	return _moment
});
!
function(global, factory) {
	"object" == typeof exports && "undefined" != typeof module && "function" == typeof require ? factory(require("../moment")) : "function" == typeof define && define.amd ? define(["moment"], factory) : factory(global.moment)
}(this, function(moment) {
	"use strict";
	var sv = moment.defineLocale("sv", {
		months: "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),
		monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
		weekdays: "söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"),
		weekdaysShort: "sön_mån_tis_ons_tor_fre_lör".split("_"),
		weekdaysMin: "sö_må_ti_on_to_fr_lö".split("_"),
		longDateFormat: {
			LT: "HH:mm",
			LTS: "HH:mm:ss",
			L: "YYYY-MM-DD",
			LL: "D MMMM YYYY",
			LLL: "D MMMM YYYY [kl.] HH:mm",
			LLLL: "dddd D MMMM YYYY [kl.] HH:mm",
			lll: "D MMM YYYY HH:mm",
			llll: "ddd D MMM YYYY HH:mm"
		},
		calendar: {
			sameDay: "[Idag] LT",
			nextDay: "[Imorgon] LT",
			lastDay: "[Igår] LT",
			nextWeek: "[På] dddd LT",
			lastWeek: "[I] dddd[s] LT",
			sameElse: "L"
		},
		relativeTime: {
			future: "om %s",
			past: "för %s sedan",
			s: "några sekunder",
			m: "en minut",
			mm: "%d minuter",
			h: "en timme",
			hh: "%d timmar",
			d: "en dag",
			dd: "%d dagar",
			M: "en månad",
			MM: "%d månader",
			y: "ett år",
			yy: "%d år"
		},
		ordinalParse: /\d{1,2}(e|a)/,
		ordinal: function(number) {
			var b = number % 10,
				output = 1 === ~~ (number % 100 / 10) ? "e" : 1 === b ? "a" : 2 === b ? "a" : "e";
			return number + output
		},
		week: {
			dow: 1,
			doy: 4
		}
	});
	return sv
});
var ICA = ICA || {};
ICA.Components = ICA.Components || {}, ICA.Components.AjaxLink = function(args, callback) {
	var ajaxlink = {
		opt: $.extend({
			callbacktype: "replace"
		}, args),
		params: {},
		obj: $(this),
		command: !1,
		resultwrapper: void 0,
		makeAjax: function() {
			ICA.legacy.perform(ajaxlink.command, ajaxlink.params, ajaxlink.success, ajaxlink.error)
		},
		success: function(data) {
			if ("function" == typeof callback) callback(data);
			else if ("success" in data && data.success) switch (ajaxlink.opt.callbacktype) {
			case "replace":
				var obj = $(data.success);
				ajaxlink.obj.replaceWith(obj), obj.trigger("initComponent");
				break;
			case "modal":
				window.triggerAsModal(data.success);
				break;
			case "remove":
				ajaxlink.obj.remove()
			}
		},
		error: function(err) {},
		click: function(e) {
			var paramstring = ajaxlink.obj.attr("href").split("?");
			if (paramstring.length > 1) {
				for (var pairs = paramstring[1].split("&"), i = 0; i < pairs.length; i++) {
					var split = pairs[i].split("=");
					ajaxlink.params[decodeURIComponent(split[0])] = decodeURIComponent(split[1])
				}
				"command" in ajaxlink.params && (ajaxlink.command = ajaxlink.params.command, delete ajaxlink.params.command, ajaxlink.makeAjax())
			}
			return !1
		},
		init: function() {
			ajaxlink.obj.attr("data-callbacktype") && (ajaxlink.opt.callbacktype = ajaxlink.obj.attr("data-callbacktype")), ajaxlink.obj.on("click", ajaxlink.click)
		}
	};
	return ajaxlink.init()
};
var ICA = ICA || {};
ICA.Components = ICA.Components || {}, ICA.Components.Callout = function(args, attachTo) {
	var callout = {
		opt: $.extend({
			displayOnce: !0,
			position: "below",
			align: "right",
			duration: 0,
			stayonscreen: !1
		}, args),
		obj: $(this).addClass("callout"),
		contentwrapper: $('<div class="content"></div>'),
		arrow: $('<span class="callout-arrow"></span>'),
		attachTo: void 0,
		maxwidth: $(this).data("maxwidth") || 270,
		setPosition: function() {
			if (void 0 !== callout.attachTo) {
				var offset = callout.attachTo.offset(),
					width = callout.attachTo.outerWidth(),
					height = callout.attachTo.outerHeight(),
					myWidth = callout.obj.outerWidth(!0),
					myHeight = callout.obj.outerHeight(!0);
				callout.obj.removeClass("above below leftside rightside"), callout.opt.stayonscreen && offset.top < $(window).scrollTop() ? callout.obj.css({
					left: offset.left + width / 2 - myWidth / 2 + "px",
					top: $(window).scrollTop() + "px"
				}).addClass("below") : callout.opt.stayonscreen && offset.top > $(window).scrollTop() + $(window).height() ? callout.obj.css({
					left: offset.left + width / 2 - myWidth / 2 + "px",
					top: $(window).scrollTop() + $(window).height() - myHeight + "px"
				}).addClass("above") : (callout.opt.stayonscreen = !1, "below" == callout.opt.position && ("left" == callout.opt.alignment ? callout.obj.css({
					left: offset.left + "px",
					top: offset.top + height + "px"
				}) : "center" == callout.opt.alignment ? callout.obj.css({
					left: offset.left + width / 2 - myWidth / 2 + "px",
					top: offset.top + height + "px"
				}) : callout.obj.css({
					right: $(window).width() - offset.left - width + "px",
					top: offset.top + height + "px"
				})), "above" == callout.opt.position && ("left" == callout.opt.alignment || "center" == callout.opt.alignment || callout.obj.css({
					left: offset.left + width / 2 - myWidth / 2 + "px",
					top: offset.top - myHeight + "px"
				})), "leftside" == callout.opt.position && callout.obj.css({
					left: offset.left - myWidth + "px",
					top: offset.top + height / 2 - myHeight / 2 + "px"
				}), "rightside" == callout.opt.position && callout.obj.css({
					left: offset.left + width + "px",
					top: offset.top + height / 2 - myHeight / 2 + "px"
				}), callout.obj.addClass(callout.opt.position))
			}
		},
		resetPosition: function() {
			clearTimeout(callout.scrollto), callout.scrollto = setTimeout(callout.setPosition, 200)
		},
		show: function() {
			callout.obj.show(), $(document).on("touchstart mousedown", callout.hide), $(document).on("keyup", callout.hide), $(window).on("scroll resize", callout.resetPosition)
		},
		hide: function() {
			callout.obj.fadeOut(), $(document).off("touchstart mousedown", callout.hide), $(window).off("scroll resize", callout.resetPosition)
		},
		init: function() {
			"undefined" != typeof attachTo ? callout.attachTo = attachTo : callout.obj.data("attachto") && (callout.attachTo = $(callout.obj.data("attachto"))), callout.obj.hasClass("leftside") && (callout.opt.position = "leftside"), callout.obj.hasClass("rightside") && (callout.opt.position = "rightside"), callout.obj.hasClass("above") && (callout.opt.position = "above"), callout.obj.hasClass("below") && (callout.opt.position = "below"), callout.obj.hasClass("align-left") && (callout.opt.alignment = "left"), callout.obj.hasClass("align-center") && (callout.opt.alignment = "center"), callout.arrow.css({
				display: "block",
				position: "absolute",
				width: "0",
				height: "0",
				top: "-10px",
				right: "35px",
				border: "5px solid #fff",
				"border-color": "transparent transparent #fff transparent"
			}), callout.contentwrapper.append(callout.obj.children()), callout.obj.append(callout.contentwrapper), callout.obj.append(callout.arrow), $("form").append(callout.obj), callout.setPosition(), callout.show(), $(window).on("resize", callout.setPosition), callout.obj.addClass("callout-loaded")
		}
	};
	if (!$(this).hasClass("callout-loaded")) return callout.init()
};
var ICA = ICA || {};
ICA.Components = ICA.Components || {}, ICA.Components.Columned = function(args, callback) {
	var column = {
		opt: $.extend({
			cols: 1
		}, args),
		obj: $(this),
		list: $("> ul", this),
		listclass: $("> ul", this)[0].className,
		items: $("> ul > li", this),
		render: function() {
			$("> li.column", column.list).detach();
			var itemsperrow = Math.ceil(column.items.length / column.opt.cols);
			if (column.opt.cols > 1) {
				for (var i = 0; i < column.opt.cols; i++) if (column.items.length > i * itemsperrow) {
					var wrapper = $('<li class="column"></li>'),
						innerlist = $("<ul></ul>").addClass(column.listclass).appendTo(wrapper);
					column.items.slice(i * itemsperrow, (i + 1) * itemsperrow).appendTo(innerlist), wrapper.appendTo(column.list)
				}
				column.list[0].className = ""
			} else column.list.append(column.items).addClass(column.listclass)
		},
		resize: function() {
			clearTimeout(column.resizeto), column.resizeto = setTimeout(function() {
				var colcount = column.obj.attr("class").match(/cols-(.)/g);
				if (colcount) var cols = colcount[colcount.length - 1].split("-")[1];
				else var cols = 1;
				cols != column.opt.cols && (column.opt.cols = cols, column.render())
			}, 200)
		},
		init: function() {
			return $(window).on("resize", column.resize), column
		}
	};
	return column.init()
};
var ICA = ICA || {};
ICA.Components = ICA.Components || {}, ICA.Components.ErrorMessage = function() {
	var errormessage = {
		obj: $(this),
		container: $('<div class="errorMessage"><img src="/Templates/General/Views/Images/RWD/alert.png" alt="" /><div class="text">' + $(this).html() + "</div>"),
		init: function() {
			var classNames = errormessage.obj.removeClass("errormessage").attr("class");
			errormessage.obj.wrap(errormessage.container), errormessage.obj.closest(".errorMessage").addClass(classNames), errormessage.obj.remove()
		}
	};
	return errormessage.init()
};
var ICA = ICA || {};
ICA.Components = ICA.Components || {}, ICA.Components.LoadImage = function(args, callback) {
	var loadimage = {
		opt: $.extend({
			background: !1
		}, args),
		obj: $(this),
		largesrc: $(this).attr("data-desktopsrc") ? $(this).attr("data-desktopsrc") : $(this).attr("data-src"),
		mediumsrc: !! $(this).attr("data-tabletsrc") && $(this).attr("data-tabletsrc"),
		smallsrc: !! $(this).attr("data-mobilesrc") && $(this).attr("data-mobilesrc"),
		fullsrc: !! $(this).attr("data-fullwidthsrc") && $(this).attr("data-fullwidthsrc"),
		lazyLoading: !/iphone|ipad|webOS|iPod|Windows Phone|ZuneWP7/gi.test(navigator.appVersion),
		lazyPlaceholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAQSURBVHjaYvj//z8DQIABAAj8Av7bok0WAAAAAElFTkSuQmCC",
		isfull: !1,
		ismedium: !1,
		issmall: !1,
		finalsrc: "",
		image: new Image,
		parentobj: $(this).parent("figure").length ? $(this).parent("figure").parent() : $(this).parent(),
		load: function(e) {
			if (e && e.stopPropagation(), loadimage.parentobj.addClass("loading"), loadimage.smallsrc && $(window).width() < 568) loadimage.issmall || (loadimage.finalsrc = loadimage.smallsrc, loadimage.issmall = !0, loadimage.ismedium = !1, loadimage.isfull = !1);
			else if (loadimage.mediumsrc && $(window).width() < 786) loadimage.ismedium || (loadimage.finalsrc = loadimage.mediumsrc, loadimage.ismedium = !0, loadimage.issmall = !1, loadimage.isfull = !1);
			else if (loadimage.fullsrc && $(window).width() > 786) loadimage.finalsrc = loadimage.fullsrc, loadimage.ismedium = !1, loadimage.issmall = !1, loadimage.isfull = !0;
			else {
				if (loadimage.largesrc) loadimage.finalsrc = loadimage.largesrc;
				else {
					loadimage.image.src = "";
					var placeholder = $('<span class="imageplaceholder"></span>');
					loadimage.obj.replaceWith(placeholder), loadimage.obj = placeholder
				}
				loadimage.issmall = loadimage.ismedium = loadimage.isfull = !1
			}
			"" !== loadimage.finalsrc && (loadimage.lazyLoading ? ($(loadimage.image).attr("data-original", loadimage.finalsrc).addClass("lazy"), loadimage.image.src = loadimage.lazyPlaceholder) : loadimage.image.src = loadimage.finalsrc), loadimage.image.alt = loadimage.obj.attr("data-alt") ? loadimage.obj.attr("data-alt") : "", loadimage.obj.attr("data-title") && (loadimage.image.title = loadimage.obj.attr("data-title")), $(loadimage.image).off("load", loadimage.loaded), loadimage.image.src && $(loadimage.image).one("load", loadimage.loaded)
		},
		loaded: function() {
			loadimage.opt.background ? loadimage.obj.css("background-image", 'url("' + loadimage.image.src + '")').removeAttr("data-src") : loadimage.obj.replaceWith(loadimage.image), loadimage.obj.removeClass("loading").off("activate", loadimage.load), loadimage.obj = $(loadimage.image), loadimage.parentobj.removeClass("loading").addClass("image-loaded"), "function" == typeof callback && callback.call(loadimage.image), loadimage.lazyLoading && loadimage.obj.lazyload({
				skip_invisible: !1,
				threshold: 300
			})
		},
		init: function() {
			return loadimage.obj.on("activate", loadimage.load), loadimage.obj.hasClass("inactive") || loadimage.obj.addClass("loading").trigger("activate"), (loadimage.mediumsrc || loadimage.smallsrc || loadimage.fullsrc) && $(window).on("resize", function() {
				loadimage.obj.hasClass("inactive") || (clearTimeout(loadimage.resizeTO), loadimage.resizeTO = setTimeout(function() {
					(loadimage.smallsrc && !loadimage.issmall && $(window).width() < 568 || loadimage.mediumsrc && !loadimage.ismedium && $(window).width() < 786 || loadimage.fullsrc && !loadimage.isfull && $(window).width() > 786 || (loadimage.ismedium || loadimage.issmall || loadimage.isfull) && $(window).width() > 768) && loadimage.load()
				}, 500))
			}), this
		}
	};
	return loadimage.init()
};
var ICA = ICA || {};
ICA.Components = ICA.Components || {}, ICA.Components.PanicLayer = function(args, callback) {
	var paniclayer = {
		obj: $(this),
		history: [],
		init: function() {
			paniclayer.obj.on("LoadMoreUpdated", function(e, newContent) {
				paniclayer.history.push($(newContent[0]).html()), paniclayer.history.length > 1 && paniclayer.obj.addClass("has-history")
			}), paniclayer.obj.on("click", ".history-btn", function(e) {
				e.preventDefault();
				var $this = $(this);
				$this.data("handling_click") || ($this.data("handling_click", !0), icadatalayer.add("foodpanic", {
					foodpanic: {
						action: "modal-previous-recipe"
					}
				}), paniclayer.history.pop(), $(".random-recipe", paniclayer.obj).empty().html(paniclayer.history[paniclayer.history.length - 1]).trigger("initDom"), 1 == paniclayer.history.length && paniclayer.obj.removeClass("has-history"), $this.data("handling_click", !1))
			}), paniclayer.obj.find(".loadmore.panicbtn").on("click", function(e) {
				$(this).data("counter", $(this).data("counter") ? $(this).data("counter") + 1 : 1), $(this).data("counter") > 1 && icadatalayer.add("foodpanic", {
					foodpanic: {
						action: "modal-randomize"
					}
				})
			}), paniclayer.obj.find('.recipe-box [data-datalayer="recipe-category-link"]').on("mousedown touchstart", function(e) {
				var categoryName = $(this).attr("title"),
					categoryLink = $(this).attr("href");
				icadatalayer.add("foodpanic", {
					foodpanic: {
						action: "modal-category-mousedown",
						categoryName: categoryName,
						categoryLink: categoryLink
					}
				})
			}), paniclayer.obj.addClass("paniclayer-loaded")
		}
	};
	if (!paniclayer.obj.hasClass("paniclayer-loaded")) return paniclayer.init()
};
var ICA = ICA || {};
ICA.Components = ICA.Components || {}, ICA.Components.SelectAjaxUpdate = function() {
	var selectajaxupdate = {
		obj: $(this),
		ajaxfunction: $(this).attr("data-ajaxfunction") ? $(this).attr("data-ajaxfunction") : void 0,
		ajaxsuccessfunction: $(this).attr("data-ajaxsuccessfunction") ? $(this).attr("data-ajaxsuccessfunction") : void 0,
		ajaxtarget: $(this).attr("data-ajaxtarget") ? $($(this).attr("data-ajaxtarget")) : void 0,
		getajaxdata: function() {
			var fn = eval(selectajaxupdate.ajaxfunction);
			"function" == typeof fn && fn(selectajaxupdate.success)
		},
		success: function(data) {
			selectajaxupdate.ajaxtarget.html(data);
			var fn = eval(selectajaxupdate.ajaxsuccessfunction);
			"function" == typeof fn && fn()
		},
		change: function() {
			return selectajaxupdate.getajaxdata(), !1
		},
		init: function() {
			return selectajaxupdate.obj.on("change", selectajaxupdate.change), selectajaxupdate.getajaxdata(), this
		}
	};
	return selectajaxupdate.init()
};
var ICA = ICA || {};
ICA.Components = ICA.Components || {}, ICA.Components.ShowMoreItems = function(args, callback) {
	var showmore = {
		opt: $.extend({
			itemsToShow: 10
		}, args),
		obj: $(this),
		items: $($(this).data("target")) ? $($(this).data("target")).children() : $(this).children(),
		morelink: $(".morebtn", this),
		classList: void 0,
		timer: void 0,
		revealItems: function(e) {
			var itemsShown = 0;
			return showmore.items.each(function() {
				$(this).hasClass("hidden") && itemsShown < showmore.opt.itemsToShow && ($(this).removeClass("hidden"), $(this).trigger("activate"), itemsShown++)
			}), 0 === showmore.items.filter(".hidden").length && showmore.morelink.hide(), showmore.obj.trigger("updated"), !1
		},
		calculateItemsToShow: function() {
			clearTimeout(showmore.timer), showmore.timer = setTimeout(function() {
				showmore.classList = showmore.obj[0].className.split(/\s+/), $.each(showmore.classList, function(index, item) {
					if (0 === item.indexOf("numitems")) {
						var numitems = item.split("numitems")[1];
						numitems < showmore.opt.itemsToShow && (showmore.opt.itemsToShow = numitems)
					}
				})
			}, 200)
		},
		init: function() {
			showmore.morelink.on("click", showmore.revealItems), showmore.calculateItemsToShow(), $("img", showmore.obj).on("load", function() {
				loadmore.container.trigger("resize")
			}), $(window).on("resize", showmore.calculateItemsToShow), showmore.obj.addClass("showmoreitems-loaded")
		}
	};
	if (!$(this).hasClass("showmoreitems-loaded")) return showmore.init()
};
var ICA = ICA || {};
ICA.Components = ICA.Components || {}, ICA.Components.SimilarRecipesLayer = function(args, callback) {
	var similarrecipeslayer = {
		obj: $(this),
		init: function() {
			similarrecipeslayer.obj.find(".recipe-link").on("mousedown", function(e) {
				var recipeName = $(this).attr("title"),
					recipeLink = $(this).attr("href");
				icadatalayer.add("recipe-similar-recipes", {
					recipeSimilarRecipes: {
						action: "modal-recipe-mousedown",
						recipeName: recipeName,
						recipeLink: recipeLink
					}
				})
			}), similarrecipeslayer.obj.addClass("similarrecipeslayer-loaded")
		}
	};
	if (!similarrecipeslayer.obj.hasClass("similarrecipeslayer-loaded")) return similarrecipeslayer.init()
};
var ICA = ICA || {};
ICA.Components = ICA.Components || {}, ICA.Components.Table = function() {
	var table = {
		obj: $(this),
		parent: $(this).parent(),
		resize: function() {
			clearTimeout(table.resizeto), table.resizeto = setTimeout(function() {
				table.obj.removeClass("break"), table.obj.width() > table.parent.width() && table.obj.addClass("break")
			}, 200)
		},
		init: function() {
			table.obj.hasClass("unbreakable") || ($(window).on("resize", table.resize), table.resize())
		}
	};
	return table.init()
};
!
function($) {
	function trunk8(element) {
		this.$element = $(element), this.original_text = $.trim(this.$element.html()), this.settings = $.extend({}, $.fn.trunk8.defaults)
	}
	function stripHTML(html) {
		var tmp = document.createElement("DIV");
		return tmp.innerHTML = html, "undefined" != typeof tmp.textContent ? tmp.textContent : tmp.innerText
	}
	function getHtmlArr(str) {
		if (stripHTML(str) === str) return str.split(/\s/g);
		for (var lastI, ind, allResults = [], reg = /<([a-z]+)([^<]*)(?:>(.*?(?!<\1>))<\/\1>|\s+\/>)(['.?!,]*)|((?:[^<>\s])+['.?!,]*\w?|<br\s?\/?>)/gi, outArr = reg.exec(str); outArr && lastI !== reg.lastIndex;) lastI = reg.lastIndex, outArr[5] ? allResults.push(outArr[5]) : outArr[1] && allResults.push({
			tag: outArr[1],
			attribs: outArr[2],
			content: outArr[3],
			after: outArr[4]
		}), outArr = reg.exec(str);
		for (ind = 0; ind < allResults.length; ind++)"string" != typeof allResults[ind] && allResults[ind].content && (allResults[ind].content = getHtmlArr(allResults[ind].content));
		return allResults
	}
	function rebuildHtmlFromBite(bite, htmlObject, fill) {
		bite = bite.replace(fill, "");
		var biteHelper = function(contentArr, tagInfo) {
				var content, biteContent, biteLength, i, retStr = "";
				for (i = 0; i < contentArr.length; i++) content = contentArr[i], biteLength = $.trim(bite).split(" ").length, $.trim(bite).length && ("string" == typeof content ? (/<br\s*\/?>/i.test(content) || (1 === biteLength && $.trim(bite).length <= content.length ? (content = bite, "p" !== tagInfo && "div" !== tagInfo || (content += fill), bite = "") : bite = bite.replace(content, "")), retStr += $.trim(content) + (i === contentArr.length - 1 || biteLength <= 1 ? "" : " ")) : (biteContent = biteHelper(content.content, content.tag), content.after && (bite = bite.replace(content.after, "")), biteContent && (content.after || (content.after = " "), retStr += "<" + content.tag + content.attribs + ">" + biteContent + "</" + content.tag + ">" + content.after)));
				return retStr
			},
			htmlResults = biteHelper(htmlObject);
		return htmlResults.slice(htmlResults.length - fill.length) === fill && (htmlResults += fill), htmlResults
	}
	function truncate() {
		var lower, upper, bite_size, bite, text, htmlObject, data = this.data("trunk8"),
			settings = data.settings,
			width = settings.width,
			side = settings.side,
			fill = settings.fill,
			parseHTML = settings.parseHTML,
			line_height = utils.getLineHeight(this) * settings.lines,
			str = data.original_text,
			length = str.length,
			max_bite = "";
		if (this.html(str), text = this.text(), parseHTML && stripHTML(str) !== str && (htmlObject = getHtmlArr(str), str = stripHTML(str), length = str.length), width === WIDTH.auto) {
			if (this.height() <= line_height) return;
			for (lower = 0, upper = length - 1; lower <= upper;) bite_size = lower + (upper - lower >> 1), bite = utils.eatStr(str, side, length - bite_size, fill), parseHTML && htmlObject && (bite = rebuildHtmlFromBite(bite, htmlObject, fill)), this.html(bite), this.height() > line_height ? upper = bite_size - 1 : (lower = bite_size + 1, max_bite = max_bite.length > bite.length ? max_bite : bite);
			this.html(""), this.html(max_bite), settings.tooltip && this.attr("title", text)
		} else {
			if (isNaN(width)) return void $.error('Invalid width "' + width + '".');
			bite_size = length - width, bite = utils.eatStr(str, side, bite_size, fill), this.html(bite), settings.tooltip && this.attr("title", str)
		}
		settings.onTruncate()
	}
	var methods, utils, SIDES = {
		center: "center",
		left: "left",
		right: "right"
	},
		WIDTH = {
			auto: "auto"
		};
	trunk8.prototype.updateSettings = function(options) {
		this.settings = $.extend(this.settings, options)
	}, methods = {
		init: function(options) {
			return this.each(function() {
				var $this = $(this),
					data = $this.data("trunk8");
				data || $this.data("trunk8", data = new trunk8(this)), data.updateSettings(options), truncate.call($this)
			})
		},
		update: function(new_string) {
			return this.each(function() {
				var $this = $(this);
				new_string && ($this.data("trunk8").original_text = new_string), truncate.call($this)
			})
		},
		revert: function() {
			return this.each(function() {
				var text = $(this).data("trunk8").original_text;
				$(this).html(text)
			})
		},
		getSettings: function() {
			return $(this.get(0)).data("trunk8").settings
		}
	}, utils = {
		eatStr: function(str, side, bite_size, fill) {
			var half_length, half_bite_size, length = str.length,
				key = utils.eatStr.generateKey.apply(null, arguments);
			if (utils.eatStr.cache[key]) return utils.eatStr.cache[key];
			if ("string" == typeof str && 0 !== length || $.error('Invalid source string "' + str + '".'), bite_size < 0 || bite_size > length) $.error('Invalid bite size "' + bite_size + '".');
			else if (0 === bite_size) return str;
			switch ("string" != typeof(fill + "") && $.error("Fill unable to be converted to a string."), side) {
			case SIDES.right:
				return utils.eatStr.cache[key] = $.trim(str.substr(0, length - bite_size)) + fill;
			case SIDES.left:
				return utils.eatStr.cache[key] = fill + $.trim(str.substr(bite_size));
			case SIDES.center:
				return half_length = length >> 1, half_bite_size = bite_size >> 1, utils.eatStr.cache[key] = $.trim(utils.eatStr(str.substr(0, length - half_length), SIDES.right, bite_size - half_bite_size, "")) + fill + $.trim(utils.eatStr(str.substr(length - half_length), SIDES.left, half_bite_size, ""));
			default:
				$.error('Invalid side "' + side + '".')
			}
		},
		getLineHeight: function(elem) {
			var floats = $(elem).css("float");
			"none" !== floats && $(elem).css("float", "none");
			var pos = $(elem).css("position");
			"absolute" === pos && $(elem).css("position", "static");
			var line_height, html = $(elem).html(),
				wrapper_id = "line-height-test";
			return $(elem).html("i").wrap('<div id="' + wrapper_id + '" />'), line_height = $("#" + wrapper_id).innerHeight(), $(elem).html(html).css({
				float: floats,
				position: pos
			}).unwrap(), line_height
		}
	}, utils.eatStr.cache = {}, utils.eatStr.generateKey = function() {
		return Array.prototype.join.call(arguments, "")
	}, $.fn.trunk8 = function(method) {
		return methods[method] ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof method && method ? void $.error("Method " + method + " does not exist on jQuery.trunk8") : methods.init.apply(this, arguments)
	}, $.fn.trunk8.defaults = {
		fill: "&hellip;",
		lines: 1,
		side: SIDES.right,
		tooltip: !0,
		width: WIDTH.auto,
		parseHTML: !1,
		onTruncate: function() {}
	}
}(jQuery);
!
function(f) {
	if ("object" == typeof exports && "undefined" != typeof module) module.exports = f();
	else if ("function" == typeof define && define.amd) define([], f);
	else {
		var g;
		g = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, g.StickyState = f()
	}
}(function() {
	var define;
	return function e(t, n, r) {
		function s(o, u) {
			if (!n[o]) {
				if (!t[o]) {
					var a = "function" == typeof require && require;
					if (!u && a) return a(o, !0);
					if (i) return i(o, !0);
					var f = new Error("Cannot find module '" + o + "'");
					throw f.code = "MODULE_NOT_FOUND", f
				}
				var l = n[o] = {
					exports: {}
				};
				t[o][0].call(l.exports, function(e) {
					var n = t[o][1][e];
					return s(n ? n : e)
				}, l, l.exports, e, t, n, r)
			}
			return n[o].exports
		}
		for (var i = "function" == typeof require && require, o = 0; o < r.length; o++) s(r[o]);
		return s
	}({
		1: [function(require, module, exports) {
			function getScrollPosition() {
				return window.scrollY || window.pageYOffset || 0
			}
			function getDocumentHeight() {
				return Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)
			}
			function getAbsolutBoundingRect(el, fixedHeight) {
				var rect = el.getBoundingClientRect(),
					top = rect.top + getScrollPosition(),
					height = fixedHeight || rect.height;
				return {
					top: top,
					bottom: top + height,
					height: height,
					width: rect.width
				}
			}
			function addBounds(rect1, rect2) {
				var rect = assign({}, rect1);
				return rect.top -= rect2.top, rect.bottom = rect.top + rect1.height, rect
			}
			function getPositionStyle(el) {
				var obj = {
					top: null,
					bottom: null
				};
				for (var key in obj) {
					var value = parseInt(window.getComputedStyle(el)[key]);
					value = isNaN(value) ? null : value, obj[key] = value
				}
				return obj
			}
			function getPreviousElementSibling(el) {
				var prev = el.previousElementSibling;
				return prev && "script" === prev.tagName.toLocaleLowerCase() && (prev = getPreviousElementSibling(prev)), prev
			}
			var assign = require("object-assign"),
				FastScroll = require("fastscroll"),
				_globals = {
					featureTested: !1
				},
				defaults = {
					disabled: !1,
					className: "sticky",
					stateClassName: "is-sticky",
					fixedClass: "sticky-fixed",
					wrapperClass: "sticky-wrap",
					absoluteClass: "is-absolute"
				},
				StickyState = function(element, options) {
					if (!element) throw new Error("StickyState needs a DomElement");
					this.el = element, this.options = assign({}, defaults, options), this.setState({
						sticky: !1,
						absolute: !1,
						fixedOffset: "",
						offsetHeight: 0,
						bounds: {
							top: null,
							bottom: null,
							height: null,
							width: null
						},
						restrict: {
							top: null,
							bottom: null,
							height: null,
							width: null
						},
						style: {
							top: null,
							bottom: null
						},
						disabled: this.options.disabled
					}, !0), this.scrollTarget = "auto" !== window.getComputedStyle(this.el.parentNode).overflow ? window : this.el.parentNode, this.hasOwnScrollTarget = this.scrollTarget !== window, this.hasOwnScrollTarget && (this.updateFixedOffset = this.updateFixedOffset.bind(this)), this.firstRender = !0, this.resizeHandler = null, this.fastScroll = null, this.wrapper = null, this.render = this.render.bind(this), this.addSrollHandler(), this.addResizeHandler(), this.render()
				};
			StickyState.prototype.setState = function(newState, silent) {
				this.lastState = this.state || newState, this.state = assign({}, this.state, newState), silent !== !0 && this.render()
			}, StickyState.prototype.getBoundingClientRect = function() {
				return this.el.getBoundingClientRect()
			}, StickyState.prototype.getBounds = function(noCache) {
				var clientRect = this.getBoundingClientRect(),
					offsetHeight = getDocumentHeight();
				if (noCache !== !0 && null !== this.state.bounds.height && this.state.offsetHeight === offsetHeight && clientRect.height === this.state.bounds.height) return {
					offsetHeight: offsetHeight,
					style: this.state.style,
					bounds: this.state.bounds,
					restrict: this.state.restrict
				};
				var rect, restrict, style = getPositionStyle(this.el),
					child = this.wrapper || this.el,
					offset = 0;
				if (this.canSticky()) {
					var elem = getPreviousElementSibling(child);
					offset = 0, elem ? (offset = parseInt(window.getComputedStyle(elem)["margin-bottom"]), offset = offset || 0, rect = getAbsolutBoundingRect(elem), this.hasOwnScrollTarget && (rect = addBounds(rect, getAbsolutBoundingRect(this.scrollTarget)), offset += this.fastScroll.scrollY), rect.top = rect.bottom + offset) : (elem = child.parentNode, offset = parseInt(window.getComputedStyle(elem)["padding-top"]), offset = offset || 0, rect = getAbsolutBoundingRect(elem), this.hasOwnScrollTarget && (rect = addBounds(rect, getAbsolutBoundingRect(this.scrollTarget)), offset += this.fastScroll.scrollY), rect.top = rect.top + offset), this.hasOwnScrollTarget && (restrict = getAbsolutBoundingRect(this.scrollTarget), restrict.top = 0, restrict.height = this.scrollTarget.scrollHeight || restrict.height, restrict.bottom = restrict.height), rect.height = child.clientHeight, rect.width = child.clientWidth, rect.bottom = rect.top + rect.height
				} else if (rect = getAbsolutBoundingRect(child, clientRect.height), this.hasOwnScrollTarget) {
					var parentRect = getAbsolutBoundingRect(this.scrollTarget);
					offset = this.fastScroll.scrollY, rect = addBounds(rect, parentRect), restrict = parentRect, restrict.top = 0, restrict.height = this.scrollTarget.scrollHeight || restrict.height, restrict.bottom = restrict.height
				}
				return restrict = restrict || getAbsolutBoundingRect(child.parentNode), {
					offsetHeight: offsetHeight,
					style: style,
					bounds: rect,
					restrict: restrict
				}
			}, StickyState.prototype.updateBounds = function(silent) {
				silent = silent === !0, this.setState(this.getBounds(), silent)
			}, StickyState.prototype.updateFixedOffset = function() {
				this.lastState.fixedOffset = this.state.fixedOffset, this.state.sticky ? this.state.fixedOffset = this.scrollTarget.getBoundingClientRect().top + "px" : this.state.fixedOffset = "", this.lastState.fixedOffset !== this.state.fixedOffset && this.render()
			}, StickyState.prototype.canSticky = function() {
				return StickyState.native()
			}, StickyState.prototype.addSrollHandler = function() {
				if (!this.fastScroll) {
					var hasScrollTarget = FastScroll.hasScrollTarget(this.scrollTarget);
					this.fastScroll = FastScroll.getInstance(this.scrollTarget), this.onScroll = this.onScroll.bind(this), this.fastScroll.on("scroll:start", this.onScroll), this.fastScroll.on("scroll:progress", this.onScroll), this.fastScroll.on("scroll:stop", this.onScroll), hasScrollTarget && this.fastScroll.scrollY > 0 && this.fastScroll.trigger("scroll:progress")
				}
			}, StickyState.prototype.removeSrollHandler = function() {
				this.fastScroll && (this.fastScroll.off("scroll:start", this.onScroll), this.fastScroll.off("scroll:progress", this.onScroll), this.fastScroll.off("scroll:stop", this.onScroll), this.fastScroll.destroy(), this.fastScroll = null)
			}, StickyState.prototype.addResizeHandler = function() {
				this.resizeHandler || (this.resizeHandler = this.onResize.bind(this), window.addEventListener("resize", this.resizeHandler, !1), window.addEventListener("orientationchange", this.resizeHandler, !1))
			}, StickyState.prototype.removeResizeHandler = function() {
				this.resizeHandler && (window.removeEventListener("resize", this.resizeHandler), window.removeEventListener("orientationchange", this.resizeHandler), this.resizeHandler = null)
			}, StickyState.prototype.onScroll = function(e) {
				this.updateStickyState(!1), this.hasOwnScrollTarget && !this.canSticky() && (this.updateFixedOffset(), this.state.sticky && !this.hasWindowScrollListener ? (this.hasWindowScrollListener = !0, FastScroll.getInstance(window).on("scroll:progress", this.updateFixedOffset)) : !this.state.sticky && this.hasWindowScrollListener && (this.hasWindowScrollListener = !1, FastScroll.getInstance(window).off("scroll:progress", this.updateFixedOffset)))
			}, StickyState.prototype.onResize = function(e) {
				this.updateBounds(!0), this.updateStickyState(!1)
			}, StickyState.prototype.getStickyState = function() {
				if (this.state.disabled) return {
					sticky: !1,
					absolute: !1
				};
				var scrollY = this.fastScroll.scrollY,
					top = this.state.style.top,
					bottom = this.state.style.bottom,
					sticky = this.state.sticky,
					absolute = this.state.absolute;
				if (null !== top) {
					var offsetBottom = this.state.restrict.bottom - this.state.bounds.height - top;
					top = this.state.bounds.top - top, this.state.sticky === !1 && scrollY >= top && scrollY <= offsetBottom ? (sticky = !0, absolute = !1) : this.state.sticky && (scrollY < top || scrollY > offsetBottom) && (sticky = !1, absolute = scrollY > offsetBottom)
				} else if (null !== bottom) {
					scrollY += window.innerHeight;
					var offsetTop = this.state.restrict.top + this.state.bounds.height - bottom;
					bottom = this.state.bounds.bottom + bottom, this.state.sticky === !1 && scrollY <= bottom && scrollY >= offsetTop ? (sticky = !0, absolute = !1) : this.state.sticky && (scrollY > bottom || scrollY < offsetTop) && (sticky = !1, absolute = scrollY <= offsetTop)
				}
				return {
					sticky: sticky,
					absolute: absolute
				}
			}, StickyState.prototype.updateStickyState = function(silent) {
				var values = this.getStickyState();
				values.sticky === this.state.sticky && values.absolute === this.state.absolute || (silent = silent === !0, values = assign(values, this.getBounds()), this.setState(values, silent))
			}, StickyState.prototype.render = function() {
				var className = this.el.className;
				if (this.firstRender) {
					if (this.firstRender = !1, !this.canSticky()) {
						this.wrapper = document.createElement("div"), this.wrapper.className = this.options.wrapperClass;
						var parent = this.el.parentNode;
						parent && parent.insertBefore(this.wrapper, this.el), this.wrapper.appendChild(this.el), className += " " + this.options.fixedClass
					}
					this.updateBounds(!0), this.updateStickyState(!0)
				}
				if (!this.canSticky()) {
					var height = this.state.disabled || null === this.state.bounds.height || !this.state.sticky && !this.state.absolute ? "auto" : this.state.bounds.height + "px";
					this.wrapper.style.height = height, this.state.absolute !== this.lastState.absolute && (this.wrapper.style.position = this.state.absolute ? "relative" : "", className = className.indexOf(this.options.absoluteClass) === -1 && this.state.absolute ? className + (" " + this.options.absoluteClass) : className.split(" " + this.options.absoluteClass).join(""), this.el.style.marginTop = this.state.absolute && null !== this.state.style.top ? this.state.restrict.height - (this.state.bounds.height + this.state.style.top) + (this.state.restrict.top - this.state.bounds.top) + "px" : "", this.el.style.marginBottom = this.state.absolute && null !== this.state.style.bottom ? this.state.restrict.height - (this.state.bounds.height + this.state.style.bottom) + (this.state.restrict.bottom - this.state.bounds.bottom) + "px" : ""), this.hasOwnScrollTarget && !this.state.absolute && this.lastState.fixedOffset !== this.state.fixedOffset && (this.el.style.marginTop = this.state.fixedOffset)
				}
				var hasStateClass = className.indexOf(this.options.stateClassName) > -1;
				return this.state.sticky && !hasStateClass ? className += " " + this.options.stateClassName : !this.state.sticky && hasStateClass && (className = className.split(" " + this.options.stateClassName).join("")), this.el.className !== className && (this.el.className = className), this.el
			}, StickyState.native = function() {
				if (_globals.featureTested) return _globals.canSticky;
				if ("undefined" != typeof window) {
					if (_globals.featureTested = !0, window.Modernizr && window.Modernizr.hasOwnProperty("csspositionsticky")) return _globals.canSticky = window.Modernizr.csspositionsticky;
					var testEl = document.createElement("div");
					document.documentElement.appendChild(testEl);
					var prefixedSticky = ["sticky", "-webkit-sticky", "-moz-sticky", "-ms-sticky", "-o-sticky"];
					_globals.canSticky = !1;
					for (var i = 0; i < prefixedSticky.length && (testEl.style.position = prefixedSticky[i], _globals.canSticky = !! window.getComputedStyle(testEl).position.match("sticky"), !_globals.canSticky); i++);
					document.documentElement.removeChild(testEl)
				}
				return _globals.canSticky
			}, StickyState.apply = function(elements) {
				if (elements) if (elements.length) for (var i = 0; i < elements.length; i++) new StickyState(elements[i]);
				else new StickyState(elements)
			}, module.exports = StickyState
		}, {
			fastscroll: 4,
			"object-assign": 5
		}],
		2: [function(require, module, exports) {
			!
			function(exports) {
				"use strict";
				var delegate = function(target, handler) {
						var args = [].slice.call(arguments, 2),
							fn = function() {
								return handler.apply(target, args)
							};
						return fn
					};
				"undefined" != typeof module && module.exports ? module.exports = delegate : "undefined" != typeof define ? define(function() {
					return delegate
				}) : exports.delegate = delegate
			}(this)
		}, {}],
		3: [function(require, module, exports) {
			"use strict";
			function isEmpty(obj) {
				for (var prop in obj) if (obj.hasOwnProperty(prop)) return !1;
				return !0
			}
			var _instanceMap = {},
				EventDispatcher = function() {
					this._eventMap = {}, this._destroyed = !1
				};
			EventDispatcher.getInstance = function(key) {
				if (!key) throw new Error("key must be");
				return _instanceMap[key] || (_instanceMap[key] = new EventDispatcher)
			}, EventDispatcher.prototype.addListener = function(event, listener) {
				var listeners = this.getListener(event);
				return listeners ? listeners.indexOf(listener) === -1 && (listeners.push(listener), !0) : (this._eventMap[event] = [listener], !0)
			}, EventDispatcher.prototype.addListenerOnce = function(event, listener) {
				var s = this,
					f2 = function() {
						return s.removeListener(event, f2), listener.apply(this, arguments)
					};
				return this.addListener(event, f2)
			}, EventDispatcher.prototype.removeListener = function(event, listener) {
				if ("undefined" == typeof listener) return this.removeAllListener(event);
				var listeners = this.getListener(event);
				if (listeners) {
					var i = listeners.indexOf(listener);
					if (i > -1) return listeners = listeners.splice(i, 1), listeners.length || delete this._eventMap[event], !0
				}
				return !1
			}, EventDispatcher.prototype.removeAllListener = function(event) {
				var listeners = this.getListener(event);
				return !!listeners && (this._eventMap[event].length = 0, delete this._eventMap[event], !0)
			}, EventDispatcher.prototype.hasListener = function(event) {
				return null !== this.getListener(event)
			}, EventDispatcher.prototype.hasListeners = function() {
				return null !== this._eventMap && void 0 !== this._eventMap && !isEmpty(this._eventMap)
			}, EventDispatcher.prototype.dispatch = function(eventType, eventObject) {
				var listeners = this.getListener(eventType);
				if (listeners) {
					eventObject = eventObject || {}, eventObject.type = eventType, eventObject.target = eventObject.target || this;
					for (var i = -1; ++i < listeners.length;) listeners[i](eventObject);
					return !0
				}
				return !1
			}, EventDispatcher.prototype.getListener = function(event) {
				var result = this._eventMap ? this._eventMap[event] : null;
				return result || null
			}, EventDispatcher.prototype.destroy = function() {
				if (this._eventMap) {
					for (var i in this._eventMap) this.removeAllListener(i);
					this._eventMap = null
				}
				this._destroyed = !0
			}, EventDispatcher.prototype.on = EventDispatcher.prototype.bind = EventDispatcher.prototype.addEventListener = EventDispatcher.prototype.addListener, EventDispatcher.prototype.off = EventDispatcher.prototype.unbind = EventDispatcher.prototype.removeEventListener = EventDispatcher.prototype.removeListener, EventDispatcher.prototype.once = EventDispatcher.prototype.one = EventDispatcher.prototype.addListenerOnce, EventDispatcher.prototype.trigger = EventDispatcher.prototype.dispatchEvent = EventDispatcher.prototype.dispatch, module.exports = EventDispatcher
		}, {}],
		4: [function(require, module, exports) {
			"use strict";
			var delegate = require("delegatejs"),
				EventDispatcher = require("eventdispatcher"),
				_instanceMap = {},
				FastScroll = function(scrollTarget, options) {
					return scrollTarget = scrollTarget || window, FastScroll.hasScrollTarget(scrollTarget) ? FastScroll.getInstance(scrollTarget) : (_instanceMap[scrollTarget] = this, this.options = options || {}, this.options.hasOwnProperty("animationFrame") || (this.options.animationFrame = !0), "function" != typeof window.requestAnimationFrame && (this.options.animationFrame = !1), this.scrollTarget = scrollTarget, void this.init())
				};
			FastScroll.___instanceMap = _instanceMap, FastScroll.getInstance = function(scrollTarget, options) {
				return scrollTarget = scrollTarget || window, _instanceMap[scrollTarget] || new FastScroll(scrollTarget, options)
			}, FastScroll.hasInstance = function(scrollTarget) {
				return void 0 !== _instanceMap[scrollTarget]
			}, FastScroll.hasScrollTarget = FastScroll.hasInstance, FastScroll.clearInstance = function(scrollTarget) {
				scrollTarget = scrollTarget || window, FastScroll.hasInstance(scrollTarget) && (FastScroll.getInstance(scrollTarget).destroy(), delete _instanceMap[scrollTarget])
			}, FastScroll.UP = "up", FastScroll.DOWN = "down", FastScroll.NONE = "none", FastScroll.LEFT = "left", FastScroll.RIGHT = "right", FastScroll.prototype = {
				destroyed: !1,
				scrollY: 0,
				scrollX: 0,
				lastScrollY: 0,
				lastScrollX: 0,
				timeout: 0,
				speedY: 0,
				speedX: 0,
				stopFrames: 5,
				currentStopFrames: 0,
				firstRender: !0,
				animationFrame: !0,
				lastEvent: {
					type: null,
					scrollY: 0,
					scrollX: 0
				},
				scrolling: !1,
				init: function() {
					this.dispatcher = new EventDispatcher, this.updateScrollPosition = this.scrollTarget === window ? delegate(this, this.updateWindowScrollPosition) : delegate(this, this.updateElementScrollPosition), this.updateScrollPosition(), this.trigger = this.dispatchEvent, this.lastEvent.scrollY = this.scrollY, this.lastEvent.scrollX = this.scrollX, this.onScroll = delegate(this, this.onScroll), this.onNextFrame = delegate(this, this.onNextFrame), this.scrollTarget.addEventListener ? (this.scrollTarget.addEventListener("mousewheel", this.onScroll, !1), this.scrollTarget.addEventListener("scroll", this.onScroll, !1)) : this.scrollTarget.attachEvent && (this.scrollTarget.attachEvent("onmousewheel", this.onScroll), this.scrollTarget.attachEvent("scroll", this.onScroll))
				},
				destroy: function() {
					this.destroyed || (this.cancelNextFrame(), this.scrollTarget.addEventListener ? (this.scrollTarget.removeEventListener("mousewheel", this.onScroll), this.scrollTarget.removeEventListener("scroll", this.onScroll)) : this.scrollTarget.attachEvent && (this.scrollTarget.detachEvent("onmousewheel", this.onScroll), this.scrollTarget.detachEvent("scroll", this.onScroll)), this.dispatcher.off(), this.dispatcher = null, this.onScroll = null, this.updateScrollPosition = null, this.onNextFrame = null, this.scrollTarget = null, this.destroyed = !0)
				},
				getAttributes: function() {
					return {
						scrollY: this.scrollY,
						scrollX: this.scrollX,
						speedY: this.speedY,
						speedX: this.speedX,
						angle: 0,
						directionY: 0 === this.speedY ? FastScroll.NONE : this.speedY > 0 ? FastScroll.UP : FastScroll.DOWN,
						directionX: 0 === this.speedX ? FastScroll.NONE : this.speedX > 0 ? FastScroll.RIGHT : FastScroll.LEFT
					}
				},
				updateWindowScrollPosition: function() {
					this.scrollY = window.scrollY || window.pageYOffset || 0, this.scrollX = window.scrollX || window.pageXOffset || 0
				},
				updateElementScrollPosition: function() {
					this.scrollY = this.scrollTarget.scrollTop, this.scrollX = this.scrollTarget.scrollLeft
				},
				onScroll: function() {
					if (this.currentStopFrames = 0, this.firstRender && (this.firstRender = !1, this.scrollY > 1)) return this.updateScrollPosition(), void this.dispatchEvent("scroll:progress");
					if (this.scrolling || (this.scrolling = !0, this.dispatchEvent("scroll:start"), this.options.animationFrame && (this.nextFrameID = requestAnimationFrame(this.onNextFrame))), !this.options.animationFrame) {
						clearTimeout(this.timeout), this.onNextFrame();
						var self = this;
						this.timeout = setTimeout(function() {
							self.onScrollStop()
						}, 100)
					}
				},
				onNextFrame: function() {
					return this.updateScrollPosition(), this.speedY = this.lastScrollY - this.scrollY, this.speedX = this.lastScrollX - this.scrollX, this.lastScrollY = this.scrollY, this.lastScrollX = this.scrollX, this.options.animationFrame && this.scrolling && 0 === this.speedY && this.currentStopFrames++ > this.stopFrames ? void this.onScrollStop() : (this.dispatchEvent("scroll:progress"), void(this.options.animationFrame && (this.nextFrameID = requestAnimationFrame(this.onNextFrame))))
				},
				onScrollStop: function() {
					this.scrolling = !1, this.options.animationFrame && (this.cancelNextFrame(), this.currentStopFrames = 0), this.dispatchEvent("scroll:stop")
				},
				cancelNextFrame: function() {
					cancelAnimationFrame(this.nextFrameID)
				},
				dispatchEvent: function(type, eventObject) {
					eventObject = eventObject || this.getAttributes(), this.lastEvent.type === type && this.lastEvent.scrollY === eventObject.scrollY && this.lastEvent.scrollX === eventObject.scrollX || (this.lastEvent = {
						type: type,
						scrollY: eventObject.scrollY,
						scrollX: eventObject.scrollX
					}, eventObject.target = this.scrollTarget, this.dispatcher.dispatch(type, eventObject))
				},
				on: function(event, listener) {
					return this.dispatcher.addListener(event, listener)
				},
				off: function(event, listener) {
					return this.dispatcher.removeListener(event, listener)
				}
			}, module.exports = FastScroll
		}, {
			delegatejs: 2,
			eventdispatcher: 3
		}],
		5: [function(require, module, exports) {
			"use strict";
			function toObject(val) {
				if (null === val || void 0 === val) throw new TypeError("Object.assign cannot be called with null or undefined");
				return Object(val)
			}
			var hasOwnProperty = Object.prototype.hasOwnProperty,
				propIsEnumerable = Object.prototype.propertyIsEnumerable;
			module.exports = Object.assign ||
			function(target, source) {
				for (var from, symbols, to = toObject(target), s = 1; s < arguments.length; s++) {
					from = Object(arguments[s]);
					for (var key in from) hasOwnProperty.call(from, key) && (to[key] = from[key]);
					if (Object.getOwnPropertySymbols) {
						symbols = Object.getOwnPropertySymbols(from);
						for (var i = 0; i < symbols.length; i++) propIsEnumerable.call(from, symbols[i]) && (to[symbols[i]] = from[symbols[i]])
					}
				}
				return to
			}
		}, {}]
	}, {}, [1])(1)
});
var ICA = ICA || {};
ICA.Components = ICA.Components || {}, ICA.Components.Video = function() {
	var video = {
		opt: {
			autoplay: !0,
			autoclick: !1
		},
		link: $(this),
		shouldrenderasiframe: !0,
		iframe: $('<iframe frameborder="0" allowfullscreen class="video"></iframe>'),
		click: function() {
			return 0 == video.shouldrenderasiframe ? ICA.legacy.get(video.link.attr("href"), {}, function(data) {
				video.link.replaceWith(data)
			}) : (video.iframe.attr("src", video.link.attr("href") + (video.link.attr("href").split("?").length > 1 ? "&" : "?") + "autoplay=" + (video.opt.autoplay ? 1 : 0) + "&autohide=1&autoplay=1&showinfo=0&modestbranding=1&controls=1&wmode=transparent"), video.link.replaceWith(video.iframe)), !1
		},
		init: function() {
			video.link.attr("data-autoclick") && "false" != video.link.attr("data-autoclick") && (video.opt.autoclick = !0), "noiframe" == video.link.attr("data-contenttype") && (video.shouldrenderasiframe = !1), video.link.on("click", video.click), (video.opt.autoclick || "" == video.link.html()) && (video.opt.autoplay = !1, video.link.trigger("click"))
		}
	};
	return video.init()
};
!
function($, undef) {
	function isObject(m) {
		return "object" == typeof m
	}
	function isString(m) {
		return "string" == typeof m
	}
	function isNumber(m) {
		return "number" == typeof m
	}
	function isUndefined(m) {
		return m === undef
	}
	function initDefaults() {
		gm = google.maps, defaults || (defaults = {
			verbose: !1,
			queryLimit: {
				attempt: 5,
				delay: 250,
				random: 250
			},
			classes: function() {
				var r = {};
				return $.each("Map Marker InfoWindow Circle Rectangle OverlayView StreetViewPanorama KmlLayer TrafficLayer BicyclingLayer GroundOverlay StyledMapType ImageMapType".split(" "), function(_, k) {
					r[k] = gm[k]
				}), r
			}(),
			map: {
				mapTypeId: gm.MapTypeId.ROADMAP,
				center: [46.578498, 2.457275],
				zoom: 2
			},
			overlay: {
				pane: "floatPane",
				content: "",
				offset: {
					x: 0,
					y: 0
				}
			},
			geoloc: {
				getCurrentPosition: {
					maximumAge: 6e4,
					timeout: 5e3
				}
			}
		})
	}
	function globalId(id, simulate) {
		return isUndefined(id) ? "gmap3_" + (simulate ? gId + 1 : ++gId) : id
	}
	function googleVersionMin(version) {
		var i, gmVersion = gm.version.split(".");
		for (version = version.split("."), i = 0; i < gmVersion.length; i++) gmVersion[i] = parseInt(gmVersion[i], 10);
		for (i = 0; i < version.length; i++) {
			if (version[i] = parseInt(version[i], 10), !gmVersion.hasOwnProperty(i)) return !1;
			if (gmVersion[i] < version[i]) return !1
		}
		return !0
	}
	function attachEvents($container, args, sender, id, senders) {
		function bind(items, handler) {
			items && $.each(items, function(name, f) {
				var self = $container,
					fn = f;
				isArray(f) && (self = f[0], fn = f[1]), handler(sender, name, function(event) {
					fn.apply(self, [senders || sender, event, context])
				})
			})
		}
		var td = args.td || {},
			context = {
				id: id,
				data: td.data,
				tag: td.tag
			};
		bind(td.events, gm.event.addListener), bind(td.onces, gm.event.addListenerOnce)
	}
	function getKeys(obj) {
		var k, keys = [];
		for (k in obj) obj.hasOwnProperty(k) && keys.push(k);
		return keys
	}
	function copyKey(target, key) {
		var i, args = arguments;
		for (i = 2; i < args.length; i++) if (key in args[i] && args[i].hasOwnProperty(key)) return void(target[key] = args[i][key])
	}
	function tuple(args, value) {
		var k, i, keys = ["data", "tag", "id", "events", "onces"],
			td = {};
		if (args.td) for (k in args.td) args.td.hasOwnProperty(k) && "options" !== k && "values" !== k && (td[k] = args.td[k]);
		for (i = 0; i < keys.length; i++) copyKey(td, keys[i], value, args.td);
		return td.options = $.extend({}, args.opts || {}, value.options || {}), td
	}
	function error() {
		if (defaults.verbose) {
			var i, err = [];
			if (window.console && isFunction(console.error)) {
				for (i = 0; i < arguments.length; i++) err.push(arguments[i]);
				console.error.apply(console, err)
			} else {
				for (err = "", i = 0; i < arguments.length; i++) err += arguments[i].toString() + " ";
				alert(err)
			}
		}
	}
	function numeric(mixed) {
		return (isNumber(mixed) || isString(mixed)) && "" !== mixed && !isNaN(mixed)
	}
	function array(mixed) {
		var k, a = [];
		if (!isUndefined(mixed)) if (isObject(mixed)) if (isNumber(mixed.length)) a = mixed;
		else for (k in mixed) a.push(mixed[k]);
		else a.push(mixed);
		return a
	}
	function ftag(tag) {
		if (tag) return isFunction(tag) ? tag : (tag = array(tag), function(val) {
			var i;
			if (isUndefined(val)) return !1;
			if (isObject(val)) {
				for (i = 0; i < val.length; i++) if ($.inArray(val[i], tag) >= 0) return !0;
				return !1
			}
			return $.inArray(val, tag) >= 0
		})
	}
	function toLatLng(mixed, emptyReturnMixed, noFlat) {
		var empty = emptyReturnMixed ? mixed : null;
		return !mixed || isString(mixed) ? empty : mixed.latLng ? toLatLng(mixed.latLng) : mixed instanceof gm.LatLng ? mixed : numeric(mixed.lat) ? new gm.LatLng(mixed.lat, mixed.lng) : !noFlat && isArray(mixed) && numeric(mixed[0]) && numeric(mixed[1]) ? new gm.LatLng(mixed[0], mixed[1]) : empty
	}
	function toLatLngBounds(mixed) {
		var ne, sw;
		return !mixed || mixed instanceof gm.LatLngBounds ? mixed || null : (isArray(mixed) ? 2 === mixed.length ? (ne = toLatLng(mixed[0]), sw = toLatLng(mixed[1])) : 4 === mixed.length && (ne = toLatLng([mixed[0], mixed[1]]), sw = toLatLng([mixed[2], mixed[3]])) : "ne" in mixed && "sw" in mixed ? (ne = toLatLng(mixed.ne), sw = toLatLng(mixed.sw)) : "n" in mixed && "e" in mixed && "s" in mixed && "w" in mixed && (ne = toLatLng([mixed.n, mixed.e]), sw = toLatLng([mixed.s, mixed.w])), ne && sw ? new gm.LatLngBounds(sw, ne) : null)
	}
	function resolveLatLng(ctx, method, runLatLng, args, attempt) {
		var latLng = !! runLatLng && toLatLng(args.td, !1, !0),
			conf = latLng ? {
				latLng: latLng
			} : !! args.td.address && (isString(args.td.address) ? {
				address: args.td.address
			} : args.td.address),
			cache = !! conf && geocoderCache.get(conf),
			self = this;
		conf ? (attempt = attempt || 0, cache ? (args.latLng = cache.results[0].geometry.location, args.results = cache.results, args.status = cache.status, method.apply(ctx, [args])) : (conf.location && (conf.location = toLatLng(conf.location)), conf.bounds && (conf.bounds = toLatLngBounds(conf.bounds)), geocoder().geocode(conf, function(results, status) {
			status === gm.GeocoderStatus.OK ? (geocoderCache.store(conf, {
				results: results,
				status: status
			}), args.latLng = results[0].geometry.location, args.results = results, args.status = status, method.apply(ctx, [args])) : status === gm.GeocoderStatus.OVER_QUERY_LIMIT && attempt < defaults.queryLimit.attempt ? setTimeout(function() {
				resolveLatLng.apply(self, [ctx, method, runLatLng, args, attempt + 1])
			}, defaults.queryLimit.delay + Math.floor(Math.random() * defaults.queryLimit.random)) : (error("geocode failed", status, conf), args.latLng = args.results = !1, args.status = status, method.apply(ctx, [args]))
		}))) : (args.latLng = toLatLng(args.td, !1, !0), method.apply(ctx, [args]))
	}
	function resolveAllLatLng(list, ctx, method, args) {
		function resolve() {
			do i++;
			while (i < list.length && !("address" in list[i]));
			return i >= list.length ? void method.apply(ctx, [args]) : void resolveLatLng(self, function(args) {
				delete args.td, $.extend(list[i], args), resolve.apply(self, [])
			}, !0, {
				td: list[i]
			})
		}
		var self = this,
			i = -1;
		resolve()
	}
	function geoloc(ctx, method, args) {
		var is_echo = !1;
		navigator && navigator.geolocation ? navigator.geolocation.getCurrentPosition(function(pos) {
			is_echo || (is_echo = !0, args.latLng = new gm.LatLng(pos.coords.latitude, pos.coords.longitude), method.apply(ctx, [args]))
		}, function() {
			is_echo || (is_echo = !0, args.latLng = !1, method.apply(ctx, [args]))
		}, args.opts.getCurrentPosition) : (args.latLng = !1, method.apply(ctx, [args]))
	}
	function isDirectGet(obj) {
		var k, result = !1;
		if (isObject(obj) && obj.hasOwnProperty("get")) {
			for (k in obj) if ("get" !== k) return !1;
			result = !obj.get.hasOwnProperty("callback")
		}
		return result
	}
	function geocoder() {
		return services.geocoder || (services.geocoder = new gm.Geocoder), services.geocoder
	}
	function GeocoderCache() {
		var cache = [];
		this.get = function(request) {
			if (cache.length) {
				var i, j, k, item, eq, keys = getKeys(request);
				for (i = 0; i < cache.length; i++) {
					for (item = cache[i], eq = keys.length === item.keys.length, j = 0; j < keys.length && eq; j++) k = keys[j], eq = k in item.request, eq && (eq = isObject(request[k]) && "equals" in request[k] && isFunction(request[k]) ? request[k].equals(item.request[k]) : request[k] === item.request[k]);
					if (eq) return item.results
				}
			}
		}, this.store = function(request, results) {
			cache.push({
				request: request,
				keys: getKeys(request),
				results: results
			})
		}
	}
	function Stack() {
		var st = [],
			self = this;
		self.empty = function() {
			return !st.length
		}, self.add = function(v) {
			st.push(v)
		}, self.get = function() {
			return !!st.length && st[0]
		}, self.ack = function() {
			st.shift()
		}
	}
	function Store() {
		function normalize(res) {
			return {
				id: res.id,
				name: res.name,
				object: res.obj,
				tag: res.tag,
				data: res.data
			}
		}
		function rm(obj) {
			isFunction(obj.setMap) && obj.setMap(null), isFunction(obj.remove) && obj.remove(), isFunction(obj.free) && obj.free(), obj = null
		}
		var store = {},
			objects = {},
			self = this;
		self.add = function(args, name, obj, sub) {
			var td = args.td || {},
				id = globalId(td.id);
			return store[name] || (store[name] = []), id in objects && self.clearById(id), objects[id] = {
				obj: obj,
				sub: sub,
				name: name,
				id: id,
				tag: td.tag,
				data: td.data
			}, store[name].push(id), id
		}, self.getById = function(id, sub, full) {
			var result = !1;
			return id in objects && (result = sub ? objects[id].sub : full ? normalize(objects[id]) : objects[id].obj), result
		}, self.get = function(name, last, tag, full) {
			var n, id, check = ftag(tag);
			if (!store[name] || !store[name].length) return null;
			for (n = store[name].length; n;) if (n--, id = store[name][last ? n : store[name].length - n - 1], id && objects[id]) {
				if (check && !check(objects[id].tag)) continue;
				return full ? normalize(objects[id]) : objects[id].obj
			}
			return null
		}, self.all = function(name, tag, full) {
			var result = [],
				check = ftag(tag),
				find = function(n) {
					var i, id;
					for (i = 0; i < store[n].length; i++) if (id = store[n][i], id && objects[id]) {
						if (check && !check(objects[id].tag)) continue;
						result.push(full ? normalize(objects[id]) : objects[id].obj)
					}
				};
			if (name in store) find(name);
			else if (isUndefined(name)) for (name in store) find(name);
			return result
		}, self.rm = function(name, check, pop) {
			var idx, id;
			if (!store[name]) return !1;
			if (check) if (pop) for (idx = store[name].length - 1; idx >= 0 && (id = store[name][idx], !check(objects[id].tag)); idx--);
			else for (idx = 0; idx < store[name].length && (id = store[name][idx], !check(objects[id].tag)); idx++);
			else idx = pop ? store[name].length - 1 : 0;
			return idx in store[name] && self.clearById(store[name][idx], idx)
		}, self.clearById = function(id, idx) {
			if (id in objects) {
				var i, name = objects[id].name;
				for (i = 0; isUndefined(idx) && i < store[name].length; i++) id === store[name][i] && (idx = i);
				return rm(objects[id].obj), objects[id].sub && rm(objects[id].sub), delete objects[id], store[name].splice(idx, 1), !0
			}
			return !1
		}, self.objGetById = function(id) {
			var result, idx;
			if (store.clusterer) for (idx in store.clusterer) if ((result = objects[store.clusterer[idx]].obj.getById(id)) !== !1) return result;
			return !1
		}, self.objClearById = function(id) {
			var idx;
			if (store.clusterer) for (idx in store.clusterer) if (objects[store.clusterer[idx]].obj.clearById(id)) return !0;
			return null
		}, self.clear = function(list, last, first, tag) {
			var k, i, name, check = ftag(tag);
			if (list && list.length) list = array(list);
			else {
				list = [];
				for (k in store) list.push(k)
			}
			for (i = 0; i < list.length; i++) if (name = list[i], last) self.rm(name, check, !0);
			else if (first) self.rm(name, check, !1);
			else for (; self.rm(name, check, !1););
		}, self.objClear = function(list, last, first, tag) {
			var idx;
			if (store.clusterer && ($.inArray("marker", list) >= 0 || !list.length)) for (idx in store.clusterer) objects[store.clusterer[idx]].obj.clear(last, first, tag)
		}
	}
	function Task(ctx, onEnd, td) {
		function unify(td) {
			var result = {};
			return result[td] = {}, result
		}
		function next() {
			var k;
			for (k in td) if (td.hasOwnProperty(k) && !session.hasOwnProperty(k)) return k
		}
		var current, session = {},
			self = this,
			resolve = {
				latLng: {
					map: !1,
					marker: !1,
					infowindow: !1,
					circle: !1,
					overlay: !1,
					getlatlng: !1,
					getmaxzoom: !1,
					getelevation: !1,
					streetviewpanorama: !1,
					getaddress: !0
				},
				geoloc: {
					getgeoloc: !0
				}
			};
		isString(td) && (td = unify(td)), self.run = function() {
			for (var k, opts; k = next();) {
				if (isFunction(ctx[k])) return current = k, opts = $.extend(!0, {}, defaults[k] || {}, td[k].options || {}), void(k in resolve.latLng ? td[k].values ? resolveAllLatLng(td[k].values, ctx, ctx[k], {
					td: td[k],
					opts: opts,
					session: session
				}) : resolveLatLng(ctx, ctx[k], resolve.latLng[k], {
					td: td[k],
					opts: opts,
					session: session
				}) : k in resolve.geoloc ? geoloc(ctx, ctx[k], {
					td: td[k],
					opts: opts,
					session: session
				}) : ctx[k].apply(ctx, [{
					td: td[k],
					opts: opts,
					session: session
				}]));
				session[k] = null
			}
			onEnd.apply(ctx, [td, session])
		}, self.ack = function(result) {
			session[current] = result, self.run.apply(self, [])
		}
	}
	function directionsService() {
		return services.ds || (services.ds = new gm.DirectionsService), services.ds
	}
	function distanceMatrixService() {
		return services.dms || (services.dms = new gm.DistanceMatrixService), services.dms
	}
	function maxZoomService() {
		return services.mzs || (services.mzs = new gm.MaxZoomService), services.mzs
	}
	function elevationService() {
		return services.es || (services.es = new gm.ElevationService), services.es
	}
	function newEmptyOverlay(map, radius) {
		function Overlay() {
			var self = this;
			return self.onAdd = function() {}, self.onRemove = function() {}, self.draw = function() {}, defaults.classes.OverlayView.apply(self, [])
		}
		Overlay.prototype = defaults.classes.OverlayView.prototype;
		var obj = new Overlay;
		return obj.setMap(map), obj
	}
	function InternalClusterer($container, map, raw) {
		function prepareMarker(index) {
			markers[index] || (delete tds[index].options.map, markers[index] = new defaults.classes.Marker(tds[index].options), attachEvents($container, {
				td: tds[index]
			}, markers[index], tds[index].id))
		}
		function main() {
			return (projection = overlay.getProjection()) ? (ready = !0, events.push(gm.event.addListener(map, "zoom_changed", delayRedraw)), events.push(gm.event.addListener(map, "bounds_changed", delayRedraw)), void redraw()) : void setTimeout(function() {
				main.apply(self, [])
			}, 25)
		}
		function flush(key) {
			isObject(store[key]) ? (isFunction(store[key].obj.setMap) && store[key].obj.setMap(null), isFunction(store[key].obj.remove) && store[key].obj.remove(), isFunction(store[key].shadow.remove) && store[key].obj.remove(), isFunction(store[key].shadow.setMap) && store[key].shadow.setMap(null), delete store[key].obj, delete store[key].shadow) : markers[key] && markers[key].setMap(null), delete store[key]
		}
		function distanceInMeter() {
			var lat1, lat2, lng1, lng2, e, f, g, h, cos = Math.cos,
				sin = Math.sin,
				args = arguments;
			return args[0] instanceof gm.LatLng ? (lat1 = args[0].lat(), lng1 = args[0].lng(), args[1] instanceof gm.LatLng ? (lat2 = args[1].lat(), lng2 = args[1].lng()) : (lat2 = args[1], lng2 = args[2])) : (lat1 = args[0], lng1 = args[1], args[2] instanceof gm.LatLng ? (lat2 = args[2].lat(), lng2 = args[2].lng()) : (lat2 = args[2], lng2 = args[3])), e = Math.PI * lat1 / 180, f = Math.PI * lng1 / 180, g = Math.PI * lat2 / 180, h = Math.PI * lng2 / 180, 6371e3 * Math.acos(Math.min(cos(e) * cos(g) * cos(f) * cos(h) + cos(e) * sin(f) * cos(g) * sin(h) + sin(e) * sin(g), 1))
		}
		function extendsMapBounds() {
			var radius = distanceInMeter(map.getCenter(), map.getBounds().getNorthEast()),
				circle = new gm.Circle({
					center: map.getCenter(),
					radius: 1.25 * radius
				});
			return circle.getBounds()
		}
		function getStoreKeys() {
			var k, keys = {};
			for (k in store) keys[k] = !0;
			return keys
		}
		function delayRedraw() {
			clearTimeout(timer), timer = setTimeout(redraw, 25)
		}
		function extendsBounds(latLng) {
			var p = projection.fromLatLngToDivPixel(latLng),
				ne = projection.fromDivPixelToLatLng(new gm.Point(p.x + raw.radius, p.y - raw.radius)),
				sw = projection.fromDivPixelToLatLng(new gm.Point(p.x - raw.radius, p.y + raw.radius));
			return new gm.LatLngBounds(sw, ne)
		}
		function redraw() {
			if (!updating && !redrawing && ready) {
				var i, j, k, indexes, bounds, cluster, position, previous, lat, lng, loop, check = !1,
					keys = [],
					used = {},
					zoom = map.getZoom(),
					forceDisabled = "maxZoom" in raw && zoom > raw.maxZoom,
					previousKeys = getStoreKeys();
				for (updated = !1, zoom > 3 && (bounds = extendsMapBounds(), check = bounds.getSouthWest().lng() < bounds.getNorthEast().lng()), i = 0; i < tds.length; i++)!tds[i] || check && !bounds.contains(tds[i].options.position) || ffilter && !ffilter(values[i]) || keys.push(i);
				for (;;) {
					for (i = 0; used[i] && i < keys.length;) i++;
					if (i === keys.length) break;
					if (indexes = [], enabled && !forceDisabled) {
						loop = 10;
						do
						for (previous = indexes, indexes = [], loop--, position = previous.length ? bounds.getCenter() : tds[keys[i]].options.position, bounds = extendsBounds(position), j = i; j < keys.length; j++) used[j] || bounds.contains(tds[keys[j]].options.position) && indexes.push(j);
						while (previous.length < indexes.length && indexes.length > 1 && loop)
					} else for (j = i; j < keys.length; j++) if (!used[j]) {
						indexes.push(j);
						break
					}
					for (cluster = {
						indexes: [],
						ref: []
					}, lat = lng = 0, k = 0; k < indexes.length; k++) used[indexes[k]] = !0, cluster.indexes.push(keys[indexes[k]]), cluster.ref.push(keys[indexes[k]]), lat += tds[keys[indexes[k]]].options.position.lat(), lng += tds[keys[indexes[k]]].options.position.lng();
					lat /= indexes.length, lng /= indexes.length, cluster.latLng = new gm.LatLng(lat, lng), cluster.ref = cluster.ref.join("-"), cluster.ref in previousKeys ? delete previousKeys[cluster.ref] : (1 === indexes.length && (store[cluster.ref] = !0), fdisplay(cluster))
				}
				$.each(previousKeys, function(key) {
					flush(key)
				}), redrawing = !1
			}
		}
		var timer, projection, ffilter, fdisplay, ferror, updating = !1,
			updated = !1,
			redrawing = !1,
			ready = !1,
			enabled = !0,
			self = this,
			events = [],
			store = {},
			ids = {},
			idxs = {},
			markers = [],
			tds = [],
			values = [],
			overlay = newEmptyOverlay(map, raw.radius);
		main(), self.getMarkers = function() {
			return markers
		}, self.getPrivates = function() {
			return self
		}, self.getById = function(id) {
			return id in ids && (prepareMarker(ids[id]), markers[ids[id]])
		}, self.rm = function(id) {
			var index = ids[id];
			markers[index] && markers[index].setMap(null), delete markers[index], markers[index] = !1, delete tds[index], tds[index] = !1, delete values[index], values[index] = !1, delete ids[id], delete idxs[index], updated = !0
		}, self.clearById = function(id) {
			if (id in ids) return self.rm(id), !0
		}, self.clear = function(last, first, tag) {
			var start, stop, step, index, i, list = [],
				check = ftag(tag);
			for (last ? (start = tds.length - 1, stop = -1, step = -1) : (start = 0, stop = tds.length, step = 1), index = start; index !== stop && (!tds[index] || check && !check(tds[index].tag) || (list.push(idxs[index]), !first && !last)); index += step);
			for (i = 0; i < list.length; i++) self.rm(list[i])
		}, self.add = function(td, value) {
			td.id = globalId(td.id), self.clearById(td.id), ids[td.id] = markers.length, idxs[markers.length] = td.id, markers.push(null), tds.push(td), values.push(value), updated = !0
		}, self.addMarker = function(marker, td) {
			td = td || {}, td.id = globalId(td.id), self.clearById(td.id), td.options || (td.options = {}), td.options.position = marker.getPosition(), attachEvents($container, {
				td: td
			}, marker, td.id), ids[td.id] = markers.length, idxs[markers.length] = td.id, markers.push(marker), tds.push(td), values.push(td.data || {}), updated = !0
		}, self.td = function(index) {
			return tds[index]
		}, self.value = function(index) {
			return values[index]
		}, self.getValues = function() {
			return values
		}, self.marker = function(index) {
			return index in markers && (prepareMarker(index), markers[index])
		}, self.markerIsSet = function(index) {
			return Boolean(markers[index])
		}, self.setMarker = function(index, marker) {
			markers[index] = marker
		}, self.store = function(cluster, obj, shadow) {
			store[cluster.ref] = {
				obj: obj,
				shadow: shadow
			}
		}, self.free = function() {
			var i;
			for (i = 0; i < events.length; i++) gm.event.removeListener(events[i]);
			events = [], $.each(store, function(key) {
				flush(key)
			}), store = {}, $.each(tds, function(i) {
				tds[i] = null
			}), tds = [], $.each(markers, function(i) {
				markers[i] && (markers[i].setMap(null), delete markers[i])
			}), markers = [], $.each(values, function(i) {
				delete values[i]
			}), values = [], ids = {}, idxs = {}
		}, self.filter = function(f) {
			ffilter = f, redraw()
		}, self.enable = function(value) {
			enabled !== value && (enabled = value, redraw())
		}, self.display = function(f) {
			fdisplay = f
		}, self.error = function(f) {
			ferror = f
		}, self.beginUpdate = function() {
			updating = !0
		}, self.endUpdate = function() {
			updating = !1, updated && redraw()
		}, self.autofit = function(bounds) {
			var i;
			for (i = 0; i < tds.length; i++) tds[i] && bounds.extend(tds[i].options.position)
		}
	}
	function Clusterer(id, internalClusterer) {
		var self = this;
		self.id = function() {
			return id
		}, self.filter = function(f) {
			internalClusterer.filter(f)
		}, self.enable = function() {
			internalClusterer.enable(!0)
		}, self.disable = function() {
			internalClusterer.enable(!1)
		}, self.add = function(marker, td, lock) {
			lock || internalClusterer.beginUpdate(), internalClusterer.addMarker(marker, td), lock || internalClusterer.endUpdate()
		}, self.getById = function(id) {
			return internalClusterer.getById(id)
		}, self.clearById = function(id, lock) {
			var result;
			return lock || internalClusterer.beginUpdate(), result = internalClusterer.clearById(id), lock || internalClusterer.endUpdate(), result
		}, self.clear = function(last, first, tag, lock) {
			lock || internalClusterer.beginUpdate(), internalClusterer.clear(last, first, tag), lock || internalClusterer.endUpdate()
		}, self.getMarkers = function() {
			return internalClusterer.getMarkers()
		}, self.getPrivates = function() {
			return internalClusterer
		}
	}
	function OverlayView(map, opts, latLng, $div) {
		var self = this,
			listeners = [];
		defaults.classes.OverlayView.call(self), self.setMap(map), self.onAdd = function() {
			var panes = self.getPanes();
			opts.pane in panes && $(panes[opts.pane]).append($div), $.each("dblclick click mouseover mousemove mouseout mouseup mousedown".split(" "), function(i, name) {
				listeners.push(gm.event.addDomListener($div[0], name, function(e) {
					$.Event(e).stopPropagation(), gm.event.trigger(self, name, [e]), self.draw()
				}))
			}), listeners.push(gm.event.addDomListener($div[0], "contextmenu", function(e) {
				$.Event(e).stopPropagation(), gm.event.trigger(self, "rightclick", [e]), self.draw()
			}))
		}, self.getPosition = function() {
			return latLng
		}, self.setPosition = function(newLatLng) {
			latLng = newLatLng, self.draw()
		}, self.draw = function() {
			var ps = self.getProjection().fromLatLngToDivPixel(latLng);
			$div.css("left", ps.x + opts.offset.x + "px").css("top", ps.y + opts.offset.y + "px")
		}, self.onRemove = function() {
			var i;
			for (i = 0; i < listeners.length; i++) gm.event.removeListener(listeners[i]);
			$div.remove()
		}, self.hide = function() {
			$div.hide()
		}, self.show = function() {
			$div.show()
		}, self.toggle = function() {
			$div && ($div.is(":visible") ? self.show() : self.hide())
		}, self.toggleDOM = function() {
			self.setMap(self.getMap() ? null : map)
		}, self.getDOMElement = function() {
			return $div[0]
		}
	}
	function Gmap3($this) {
		function run() {
			!task && (task = stack.get()) && task.run()
		}
		function end() {
			task = null, stack.ack(), run.call(self)
		}
		function callback(args) {
			var params, cb = args.td.callback;
			cb && (params = Array.prototype.slice.call(arguments, 1), isFunction(cb) ? cb.apply($this, params) : isArray(cb) && isFunction(cb[1]) && cb[1].apply(cb[0], params))
		}
		function manageEnd(args, obj, id) {
			id && attachEvents($this, args, obj, id), callback(args, obj), task.ack(obj)
		}
		function newMap(latLng, args) {
			args = args || {};
			var opts = args.td && args.td.options ? args.td.options : 0;
			map ? opts && (opts.center && (opts.center = toLatLng(opts.center)), map.setOptions(opts)) : (opts = args.opts || $.extend(!0, {}, defaults.map, opts || {}), opts.center = latLng || toLatLng(opts.center), map = new defaults.classes.Map($this.get(0), opts))
		}
		function createClusterer(raw) {
			var calculator, k, internalClusterer = new InternalClusterer($this, map, raw),
				td = {},
				styles = {},
				thresholds = [],
				isInt = /^[0-9]+$/;
			for (k in raw) isInt.test(k) ? (thresholds.push(1 * k), styles[k] = raw[k], styles[k].width = styles[k].width || 0, styles[k].height = styles[k].height || 0) : td[k] = raw[k];
			return thresholds.sort(function(a, b) {
				return a > b
			}), calculator = td.calculator ?
			function(indexes) {
				var data = [];
				return $.each(indexes, function(i, index) {
					data.push(internalClusterer.value(index))
				}), td.calculator.apply($this, [data])
			} : function(indexes) {
				return indexes.length
			}, internalClusterer.error(function() {
				error.apply(self, arguments)
			}), internalClusterer.display(function(cluster) {
				var i, style, atd, obj, offset, shadow, cnt = calculator(cluster.indexes);
				if (raw.force || cnt > 1) for (i = 0; i < thresholds.length; i++) thresholds[i] <= cnt && (style = styles[thresholds[i]]);
				style ? (offset = style.offset || [-style.width / 2, -style.height / 2], atd = $.extend({}, td), atd.options = $.extend({
					pane: "overlayLayer",
					content: style.content ? style.content.replace("CLUSTER_COUNT", cnt) : "",
					offset: {
						x: ("x" in offset ? offset.x : offset[0]) || 0,
						y: ("y" in offset ? offset.y : offset[1]) || 0
					}
				}, td.options || {}), obj = self.overlay({
					td: atd,
					opts: atd.options,
					latLng: toLatLng(cluster)
				}, !0), atd.options.pane = "floatShadow", atd.options.content = $(document.createElement("div")).width(style.width + "px").height(style.height + "px").css({
					cursor: "pointer"
				}), shadow = self.overlay({
					td: atd,
					opts: atd.options,
					latLng: toLatLng(cluster)
				}, !0), td.data = {
					latLng: toLatLng(cluster),
					markers: []
				}, $.each(cluster.indexes, function(i, index) {
					td.data.markers.push(internalClusterer.value(index)), internalClusterer.markerIsSet(index) && internalClusterer.marker(index).setMap(null)
				}), attachEvents($this, {
					td: td
				}, shadow, undef, {
					main: obj,
					shadow: shadow
				}), internalClusterer.store(cluster, obj, shadow)) : $.each(cluster.indexes, function(i, index) {
					internalClusterer.marker(index).setMap(map)
				})
			}), internalClusterer
		}
		function poly(args, poly, path) {
			var objs = [],
				multiple = "values" in args.td;
			return multiple || (args.td.values = [{
				options: args.opts
			}]), args.td.values.length ? (newMap(), $.each(args.td.values, function(_, value) {
				var id, i, j, obj, td = tuple(args, value);
				if (td.options[path]) if (td.options[path][0][0] && isArray(td.options[path][0][0])) for (i = 0; i < td.options[path].length; i++) for (j = 0; j < td.options[path][i].length; j++) td.options[path][i][j] = toLatLng(td.options[path][i][j]);
				else for (i = 0; i < td.options[path].length; i++) td.options[path][i] = toLatLng(td.options[path][i]);
				td.options.map = map, obj = new gm[poly](td.options), objs.push(obj), id = store.add({
					td: td
				}, poly.toLowerCase(), obj), attachEvents($this, {
					td: td
				}, obj, id)
			}), void manageEnd(args, multiple ? objs : objs[0])) : void manageEnd(args, !1)
		}
		var task, self = this,
			stack = new Stack,
			store = new Store,
			map = null;
		self._plan = function(list) {
			var k;
			for (k = 0; k < list.length; k++) stack.add(new Task(self, end, list[k]));
			run()
		}, self.map = function(args) {
			newMap(args.latLng, args), attachEvents($this, args, map), manageEnd(args, map)
		}, self.destroy = function(args) {
			store.clear(), $this.empty(), map && (map = null), manageEnd(args, !0)
		}, self.overlay = function(args, internal) {
			var objs = [],
				multiple = "values" in args.td;
			return multiple || (args.td.values = [{
				latLng: args.latLng,
				options: args.opts
			}]), args.td.values.length ? (OverlayView.__initialised || (OverlayView.prototype = new defaults.classes.OverlayView, OverlayView.__initialised = !0), $.each(args.td.values, function(i, value) {
				var id, obj, td = tuple(args, value),
					$div = $(document.createElement("div")).css({
						border: "none",
						borderWidth: 0,
						position: "absolute"
					});
				$div.append(td.options.content), obj = new OverlayView(map, td.options, toLatLng(td) || toLatLng(value), $div), objs.push(obj), $div = null, internal || (id = store.add(args, "overlay", obj), attachEvents($this, {
					td: td
				}, obj, id))
			}), internal ? objs[0] : void manageEnd(args, multiple ? objs : objs[0])) : void manageEnd(args, !1)
		}, self.marker = function(args) {
			var objs, clusterer, internalClusterer, multiple = "values" in args.td,
				init = !map;
			return multiple || (args.opts.position = args.latLng || toLatLng(args.opts.position), args.td.values = [{
				options: args.opts
			}]), args.td.values.length ? (init && newMap(), args.td.cluster && !map.getBounds() ? void gm.event.addListenerOnce(map, "bounds_changed", function() {
				self.marker.apply(self, [args])
			}) : void(args.td.cluster ? (args.td.cluster instanceof Clusterer ? (clusterer = args.td.cluster, internalClusterer = store.getById(clusterer.id(), !0)) : (internalClusterer = createClusterer(args.td.cluster), clusterer = new Clusterer(globalId(args.td.id, !0), internalClusterer), store.add(args, "clusterer", clusterer, internalClusterer)), internalClusterer.beginUpdate(), $.each(args.td.values, function(i, value) {
				var td = tuple(args, value);
				td.options.position = toLatLng(td.options.position ? td.options.position : value), td.options.position && (td.options.map = map, init && (map.setCenter(td.options.position), init = !1), internalClusterer.add(td, value))
			}), internalClusterer.endUpdate(), manageEnd(args, clusterer)) : (objs = [], $.each(args.td.values, function(i, value) {
				var id, obj, td = tuple(args, value);
				td.options.position = toLatLng(td.options.position ? td.options.position : value), td.options.position && (td.options.map = map, init && (map.setCenter(td.options.position), init = !1), obj = new defaults.classes.Marker(td.options), objs.push(obj), id = store.add({
					td: td
				}, "marker", obj), attachEvents($this, {
					td: td
				}, obj, id))
			}), manageEnd(args, multiple ? objs : objs[0])))) : void manageEnd(args, !1)
		}, self.getroute = function(args) {
			args.opts.origin = toLatLng(args.opts.origin, !0), args.opts.destination = toLatLng(args.opts.destination, !0), directionsService().route(args.opts, function(results, status) {
				callback(args, status === gm.DirectionsStatus.OK && results, status), task.ack()
			})
		}, self.getdistance = function(args) {
			var i;
			for (args.opts.origins = array(args.opts.origins), i = 0; i < args.opts.origins.length; i++) args.opts.origins[i] = toLatLng(args.opts.origins[i], !0);
			for (args.opts.destinations = array(args.opts.destinations), i = 0; i < args.opts.destinations.length; i++) args.opts.destinations[i] = toLatLng(args.opts.destinations[i], !0);
			distanceMatrixService().getDistanceMatrix(args.opts, function(results, status) {
				callback(args, status === gm.DistanceMatrixStatus.OK && results, status), task.ack()
			})
		}, self.infowindow = function(args) {
			var objs = [],
				multiple = "values" in args.td;
			multiple || (args.latLng && (args.opts.position = args.latLng), args.td.values = [{
				options: args.opts
			}]), $.each(args.td.values, function(i, value) {
				var id, obj, td = tuple(args, value);
				td.options.position = toLatLng(td.options.position ? td.options.position : value.latLng), map || newMap(td.options.position), obj = new defaults.classes.InfoWindow(td.options), obj && (isUndefined(td.open) || td.open) && (multiple ? obj.open(map, td.anchor || undef) : obj.open(map, td.anchor || (args.latLng ? undef : args.session.marker ? args.session.marker : undef))), objs.push(obj), id = store.add({
					td: td
				}, "infowindow", obj), attachEvents($this, {
					td: td
				}, obj, id)
			}), manageEnd(args, multiple ? objs : objs[0])
		}, self.circle = function(args) {
			var objs = [],
				multiple = "values" in args.td;
			return multiple || (args.opts.center = args.latLng || toLatLng(args.opts.center), args.td.values = [{
				options: args.opts
			}]), args.td.values.length ? ($.each(args.td.values, function(i, value) {
				var id, obj, td = tuple(args, value);
				td.options.center = toLatLng(td.options.center ? td.options.center : value), map || newMap(td.options.center), td.options.map = map, obj = new defaults.classes.Circle(td.options), objs.push(obj), id = store.add({
					td: td
				}, "circle", obj), attachEvents($this, {
					td: td
				}, obj, id)
			}), void manageEnd(args, multiple ? objs : objs[0])) : void manageEnd(args, !1)
		}, self.getaddress = function(args) {
			callback(args, args.results, args.status), task.ack()
		}, self.getlatlng = function(args) {
			callback(args, args.results, args.status), task.ack()
		}, self.getmaxzoom = function(args) {
			maxZoomService().getMaxZoomAtLatLng(args.latLng, function(result) {
				callback(args, result.status === gm.MaxZoomStatus.OK && result.zoom, status), task.ack()
			})
		}, self.getelevation = function(args) {
			var i, locations = [],
				f = function(results, status) {
					callback(args, status === gm.ElevationStatus.OK && results, status), task.ack()
				};
			if (args.latLng) locations.push(args.latLng);
			else for (locations = array(args.td.locations || []), i = 0; i < locations.length; i++) locations[i] = toLatLng(locations[i]);
			if (locations.length) elevationService().getElevationForLocations({
				locations: locations
			}, f);
			else {
				if (args.td.path && args.td.path.length) for (i = 0; i < args.td.path.length; i++) locations.push(toLatLng(args.td.path[i]));
				locations.length ? elevationService().getElevationAlongPath({
					path: locations,
					samples: args.td.samples
				}, f) : task.ack()
			}
		}, self.defaults = function(args) {
			$.each(args.td, function(name, value) {
				isObject(defaults[name]) ? defaults[name] = $.extend({}, defaults[name], value) : defaults[name] = value
			}), task.ack(!0)
		}, self.rectangle = function(args) {
			var objs = [],
				multiple = "values" in args.td;
			return multiple || (args.td.values = [{
				options: args.opts
			}]), args.td.values.length ? ($.each(args.td.values, function(i, value) {
				var id, obj, td = tuple(args, value);
				td.options.bounds = toLatLngBounds(td.options.bounds ? td.options.bounds : value), map || newMap(td.options.bounds.getCenter()), td.options.map = map, obj = new defaults.classes.Rectangle(td.options), objs.push(obj), id = store.add({
					td: td
				}, "rectangle", obj), attachEvents($this, {
					td: td
				}, obj, id)
			}), void manageEnd(args, multiple ? objs : objs[0])) : void manageEnd(args, !1)
		}, self.polyline = function(args) {
			poly(args, "Polyline", "path")
		}, self.polygon = function(args) {
			poly(args, "Polygon", "paths")
		}, self.trafficlayer = function(args) {
			newMap();
			var obj = store.get("trafficlayer");
			obj || (obj = new defaults.classes.TrafficLayer, obj.setMap(map), store.add(args, "trafficlayer", obj)), manageEnd(args, obj)
		}, self.bicyclinglayer = function(args) {
			newMap();
			var obj = store.get("bicyclinglayer");
			obj || (obj = new defaults.classes.BicyclingLayer, obj.setMap(map), store.add(args, "bicyclinglayer", obj)), manageEnd(args, obj)
		}, self.groundoverlay = function(args) {
			args.opts.bounds = toLatLngBounds(args.opts.bounds), args.opts.bounds && newMap(args.opts.bounds.getCenter());
			var id, obj = new defaults.classes.GroundOverlay(args.opts.url, args.opts.bounds, args.opts.opts);
			obj.setMap(map), id = store.add(args, "groundoverlay", obj), manageEnd(args, obj, id)
		}, self.streetviewpanorama = function(args) {
			args.opts.opts || (args.opts.opts = {}), args.latLng ? args.opts.opts.position = args.latLng : args.opts.opts.position && (args.opts.opts.position = toLatLng(args.opts.opts.position)), args.td.divId ? args.opts.container = document.getElementById(args.td.divId) : args.opts.container && (args.opts.container = $(args.opts.container).get(0));
			var id, obj = new defaults.classes.StreetViewPanorama(args.opts.container, args.opts.opts);
			obj && map.setStreetView(obj), id = store.add(args, "streetviewpanorama", obj), manageEnd(args, obj, id)
		}, self.kmllayer = function(args) {
			var objs = [],
				multiple = "values" in args.td;
			return multiple || (args.td.values = [{
				options: args.opts
			}]), args.td.values.length ? ($.each(args.td.values, function(i, value) {
				var id, obj, options, td = tuple(args, value);
				map || newMap(), options = td.options, td.options.opts && (options = td.options.opts, td.options.url && (options.url = td.options.url)), options.map = map, obj = googleVersionMin("3.10") ? new defaults.classes.KmlLayer(options) : new defaults.classes.KmlLayer(options.url, options), objs.push(obj), id = store.add({
					td: td
				}, "kmllayer", obj), attachEvents($this, {
					td: td
				}, obj, id)
			}), void manageEnd(args, multiple ? objs : objs[0])) : void manageEnd(args, !1)
		}, self.panel = function(args) {
			newMap();
			var id, $content, x = 0,
				y = 0,
				$div = $(document.createElement("div"));
			$div.css({
				position: "absolute",
				zIndex: 1e3,
				visibility: "hidden"
			}), args.opts.content && ($content = $(args.opts.content), $div.append($content), $this.first().prepend($div), isUndefined(args.opts.left) ? isUndefined(args.opts.right) ? args.opts.center && (x = ($this.width() - $content.width()) / 2) : x = $this.width() - $content.width() - args.opts.right : x = args.opts.left, isUndefined(args.opts.top) ? isUndefined(args.opts.bottom) ? args.opts.middle && (y = ($this.height() - $content.height()) / 2) : y = $this.height() - $content.height() - args.opts.bottom : y = args.opts.top, $div.css({
				top: y,
				left: x,
				visibility: "visible"
			})), id = store.add(args, "panel", $div), manageEnd(args, $div, id), $div = null
		}, self.directionsrenderer = function(args) {
			args.opts.map = map;
			var id, obj = new gm.DirectionsRenderer(args.opts);
			args.td.divId ? obj.setPanel(document.getElementById(args.td.divId)) : args.td.container && obj.setPanel($(args.td.container).get(0)), id = store.add(args, "directionsrenderer", obj), manageEnd(args, obj, id)
		}, self.getgeoloc = function(args) {
			manageEnd(args, args.latLng)
		}, self.styledmaptype = function(args) {
			newMap();
			var obj = new defaults.classes.StyledMapType(args.td.styles, args.opts);
			map.mapTypes.set(args.td.id, obj), manageEnd(args, obj)
		}, self.imagemaptype = function(args) {
			newMap();
			var obj = new defaults.classes.ImageMapType(args.opts);
			map.mapTypes.set(args.td.id, obj), manageEnd(args, obj)
		}, self.autofit = function(args) {
			var bounds = new gm.LatLngBounds;
			$.each(store.all(), function(i, obj) {
				obj.getPosition ? bounds.extend(obj.getPosition()) : obj.getBounds ? (bounds.extend(obj.getBounds().getNorthEast()), bounds.extend(obj.getBounds().getSouthWest())) : obj.getPaths ? obj.getPaths().forEach(function(path) {
					path.forEach(function(latLng) {
						bounds.extend(latLng)
					})
				}) : obj.getPath ? obj.getPath().forEach(function(latLng) {
					bounds.extend(latLng)
				}) : obj.getCenter ? bounds.extend(obj.getCenter()) : "function" == typeof Clusterer && obj instanceof Clusterer && (obj = store.getById(obj.id(), !0), obj && obj.autofit(bounds))
			}), bounds.isEmpty() || map.getBounds() && map.getBounds().equals(bounds) || ("maxZoom" in args.td && gm.event.addListenerOnce(map, "bounds_changed", function() {
				this.getZoom() > args.td.maxZoom && this.setZoom(args.td.maxZoom)
			}), map.fitBounds(bounds)), manageEnd(args, !0)
		}, self.clear = function(args) {
			if (isString(args.td)) {
				if (store.clearById(args.td) || store.objClearById(args.td)) return void manageEnd(args, !0);
				args.td = {
					name: args.td
				}
			}
			args.td.id ? $.each(array(args.td.id), function(i, id) {
				store.clearById(id) || store.objClearById(id)
			}) : (store.clear(array(args.td.name), args.td.last, args.td.first, args.td.tag), store.objClear(array(args.td.name), args.td.last, args.td.first, args.td.tag)), manageEnd(args, !0)
		}, self.get = function(args, direct, full) {
			var name, res, td = direct ? args : args.td;
			return direct || (full = td.full), isString(td) ? (res = store.getById(td, !1, full) || store.objGetById(td), res === !1 && (name = td, td = {})) : name = td.name, "map" === name && (res = map), res || (res = [], td.id ? ($.each(array(td.id), function(i, id) {
				res.push(store.getById(id, !1, full) || store.objGetById(id))
			}), isArray(td.id) || (res = res[0])) : ($.each(name ? array(name) : [undef], function(i, aName) {
				var result;
				td.first ? (result = store.get(aName, !1, td.tag, full), result && res.push(result)) : td.all ? $.each(store.all(aName, td.tag, full), function(i, result) {
					res.push(result)
				}) : (result = store.get(aName, !0, td.tag, full), result && res.push(result))
			}), td.all || isArray(name) || (res = res[0]))), res = isArray(res) || !td.all ? res : [res], direct ? res : void manageEnd(args, res)
		}, self.exec = function(args) {
			$.each(array(args.td.func), function(i, func) {
				$.each(self.get(args.td, !0, !args.td.hasOwnProperty("full") || args.td.full), function(j, res) {
					func.call($this, res)
				})
			}), manageEnd(args, !0)
		}, self.trigger = function(args) {
			if (isString(args.td)) gm.event.trigger(map, args.td);
			else {
				var options = [map, args.td.eventName];
				args.td.var_args && $.each(args.td.var_args, function(i, v) {
					options.push(v)
				}), gm.event.trigger.apply(gm.event, options)
			}
			callback(args), task.ack()
		}
	}
	var defaults, gm, gId = 0,
		isFunction = $.isFunction,
		isArray = $.isArray,
		services = {},
		geocoderCache = new GeocoderCache;
	$.fn.gmap3 = function() {
		var i, list = [],
			empty = !0,
			results = [];
		for (initDefaults(), i = 0; i < arguments.length; i++) arguments[i] && list.push(arguments[i]);
		return list.length || list.push("map"), $.each(this, function() {
			var $this = $(this),
				gmap3 = $this.data("gmap3");
			empty = !1, gmap3 || (gmap3 = new Gmap3($this), $this.data("gmap3", gmap3)), 1 !== list.length || "get" !== list[0] && !isDirectGet(list[0]) ? gmap3._plan(list) : "get" === list[0] ? results.push(gmap3.get("map", !0)) : results.push(gmap3.get(list[0].get, !0, list[0].get.full))
		}), results.length ? 1 === results.length ? results[0] : results : this
	}
}(jQuery);
!
function($, window, document, undefined) {
	"use strict";
	var pluginName = "makeMap",
		opt = {
			datainput: {
				Stores: []
			},
			longitudeVariableName: "StoreCoordinateX",
			latitudeVariableName: "StoreCoordinateY",
			clusteredMap: !0,
			clusterRadius: 75,
			clusterMaxZoom: 12,
			clusterRadiusFactor: 0,
			initialZoom: 13,
			center: [59.4596, 17.8096],
			autofit: undefined,
			infoWindowTemplate: '<div class="infowindow">{{myParam}}</div>',
			showInfoWindowOnMarkerClick: !0
		},
		clusterer = "",
		Plugin = function(element, options, callback) {
			if (this.element = $(element), this.options = $.extend({}, opt, options), this.callback = callback, this._defaults = opt, this._name = pluginName, this.markers = {}, this.storeType = "store-type", this.IcaMarker = new google.maps.MarkerImage("/Templates/GlobalSearch/Views/Images/marker.png", null, null, null, new google.maps.Size(21, 28)), this.IcaSelectedMarker = new google.maps.MarkerImage("/Templates/GlobalSearch/Views/Images/marker-selected.png", null, null, null, new google.maps.Size(21, 28)), this.IcaMarker.optimized = !1, this.stores = [], !this.element.hasClass("map-loaded")) return this.init()
		};
	Plugin.prototype = {
		init: function() {
			return this.element.on("update-map", function(e) {
				$.extend(this.options, e.options), this.update()
			}.bind(this)), this.update(), this
		},
		update: function() {
			this.element.addClass("map-updating"), this.getData().then(this.makeMarkerObject.bind(this)).then(this.renderMap.bind(this)).fail(function() {
				console.log("Map could not be loaded", arguments)
			}.bind(this)).always(function() {
				this.element.removeClass("map-updating")
			}.bind(this))
		},
		getData: function() {
			var deferred = new $.Deferred;
			return "object" == typeof this.options.datainput ? (deferred.resolve(this.options.datainput), deferred.promise()) : ($.get(this.options.datainput, {}).done(function(data) {
				deferred.resolve(data)
			}.bind(this)).fail(function() {
				deferred.reject("Could not fetch map data")
			}.bind(this)), deferred.promise())
		},
		makeMarkerObject: function(data) {
			var deferred = new $.Deferred;
			if (this.markers = {}, this.markers.values = [], !data || !data.Stores || 0 === data.Stores.length) return deferred.resolve(this.markers), deferred.promise();
			this.stores = data.Stores;
			for (var i = 0; i < this.stores.length; i++) {
				var store = this.stores[i],
					selectedIcon = store.hasOwnProperty("selectedIconMarker") ? store.selectedIconMarker : this.IcaSelectedMarker,
					icon = store.hasOwnProperty("iconMarker") ? store.iconMarker : this.IcaMarker,
					mark = {
						options: {
							icon: icon,
							defaultIcon: icon,
							selectedIcon: selectedIcon,
							data: store
						}
					};
				store.x = this.getCoordFromInt(store[this.options.longitudeVariableName]), store.y = this.getCoordFromInt(store[this.options.latitudeVariableName]), store.x && store.y && (store.x > store.y ? mark.latLng = [store.x, store.y] : mark.latLng = [store.y, store.x], mark.data = store, this.markers.values.push(mark))
			}
			return this.markers.events = {
				click: this.options.infoWindowTemplate ?
				function(marker, event, context) {
					this.selectedMarker && this.selectedMarker.setIcon(this.selectedMarker.defaultIcon), this.selectedMarker = marker, marker.selectedIcon && marker.setIcon(marker.selectedIcon || marker.defaultIcon);
					var evt = jQuery.Event("marker-click");
					if (evt.marker = marker, evt.store = context.data, this.element.trigger(evt), this.options.showInfoWindowOnMarkerClick) {
						var map = this.element.gmap3("get"),
							infowindow = this.element.gmap3({
								get: {
									name: "infowindow"
								}
							});
						infowindow ? (infowindow.open(map, marker), infowindow.setContent(Handlebars.compile(this.options.infoWindowTemplate)(context.data))) : this.element.gmap3({
							infowindow: {
								anchor: marker,
								options: {
									content: Handlebars.compile(this.options.infoWindowTemplate)(context.data)
								},
								events: {
									closeclick: function() {
										this.selectedMarker && this.selectedMarker.setIcon(this.selectedMarker.defaultIcon || marker.defaultIcon), this.element.trigger("infowindow-close")
									}.bind(this),
									content_changed: function() {
										this.element.trigger("infowindow-content-changed")
									}.bind(this),
									domready: function() {
										this.element.trigger("infowindow-created", {
											iw: this.element.gmap3({
												get: {
													name: "infowindow"
												}
											}),
											marker: this.selectedMarker
										})
									}.bind(this)
								}
							}
						})
					}
				}.bind(this) : function() {}
			}, this.options.clusteredMap && this.options.clusterRadius && this.markers.values.length > 1 && this.addClusters(), deferred.resolve(this.markers), deferred.promise()
		},
		getCoordFromInt: function(coordInt) {
			var str = coordInt.toString();
			return str.length < 3 ? 0 : str.substr(0, 2) + "." + str.substr(2)
		},
		addClusters: function() {
			var cRatio = this.options.clusterRadius;
			"log" === this.options.clusterRadiusFactor && (cRatio = Math.ceil(Math.pow(Math.log(this.markers.values.length) / Math.log(2), 2))), this.markers.cluster = {
				radius: cRatio,
				maxZoom: this.options.clusterMaxZoom,
				events: {
					click: function(cluster, e, mapevent) {
						var m = cluster.main.map;
						m.panTo(mapevent.data.latLng), m.setZoom(m.getZoom() + 1)
					}
				},
				0: {
					content: '<div class="cluster cluster-sm">CLUSTER_COUNT</div>',
					width: 30,
					height: 30
				},
				20: {
					content: '<div class="cluster cluster-md">CLUSTER_COUNT</div>',
					width: 40,
					height: 40
				},
				50: {
					content: '<div class="cluster cluster-lg">CLUSTER_COUNT</div>',
					width: 50,
					height: 50
				}
			}, this.markers.callback = function(cl) {
				clusterer = cl
			}
		},
		getClusterer: function() {
			return clusterer
		},
		renderMap: function() {
			var deferred = new $.Deferred,
				markobject = this.markers,
				options = {
					center: this.options.center,
					zoom: this.options.initialZoom,
					mapTypeId: google.maps.MapTypeId[this.options.mapType] || google.maps.MapTypeId.STREET
				};
			if (this.element.is(".map-loaded") && this.options.forceFitMarkers !== !0) {
				var map = this.element.gmap3({
					get: "map"
				});
				options.center = map.center, options.zoom = map.getZoom()
			}
			var mapsSettings = {
				map: {
					options: options,
					events: {
						render: function() {}
					}
				},
				marker: markobject
			};
			1 === this.markers.values.length && (mapsSettings.map.options.maxZoom = 16, setTimeout(function() {
				this.element.gmap3({
					get: "map"
				}).maxZoom = null
			}.bind(this), 1e3)), this.options.autofit && (mapsSettings.autofit = {}), $.extend(mapsSettings.map.options, this.options.gmapOptions), this.element.gmap3(mapsSettings), this.element.addClass("map-loaded");
			var event = jQuery.Event("map-loaded");
			return event.stores = this.stores, event.getClusterer = this.getClusterer, this.element.trigger(event), deferred.resolve(this.element.gmap3({
				get: "map"
			})), deferred.promise()
		}
	}, $.fn[pluginName] = function(options, callback) {
		return this.each(function() {
			$.data(this, "plugin_" + pluginName) || $.data(this, "plugin_" + pluginName, new Plugin(this, options, callback))
		})
	}
}(jQuery, window, document);
var ICA = ICA || {};
!
function($, window, document, ICA, undefined) {
	"use strict";
	ICA.icaseStartPage = function() {
		function _icaseStartPage() {
			var context = ($(document), this),
				$header = $(".header"),
				$startPage = $(".page.start-page"),
				$startPageHeader = $(".start-page .header-content"),
				$quicklinkListItems = $(".quicklink-list li > a", $startPage),
				$recipeList = $(".recipe-category-list", $startPage),
				$recipeListItems = $(".item a", $recipeList),
				$searchField = $(".search-wrapper .has-placeholder"),
				$linkListItems = $(".link-list .item", $startPage),
				$pushListItemsButton = $(".push-list-items .item .content a ", $startPage),
				$pushListItemLinkImage = $(".push-list-items .item a.anchor-image-dataLayer"),
				$footerLinkListItems = $(".footer-link-list a"),
				$footerPushItems = $(".footer-puffar a.column"),
				$startPageRecipeSection = $(".recipe-category-listing"),
				$allRecipelink = $(".all-recipes a", $startPageRecipeSection),
				$recipeTredingListLinks = $(".recipe-trending-list li > a", $startPage),
				$recipeThumbNailLinks = $(".recipe-list-items a.recipe-item", $startPage),
				$countRecipe = $(".all-recipe-count"),
				$footerSubNav = $(".footer-sub-nav a");
			context.init = function() {
				$startPage[0] && $("#header").is(".full-size-image") && $startPageHeader.headerRedirect({
					safeHeaderTargets: ".quicklink-list, .recipe-category-list, .link-list"
				}, function() {
					var rubrik = $startPageHeader.find(".header-title").text().trim();
					icadatalayer.add("startsideelement", {
						kampanjyta: rubrik
					})
				}), initAttachEvents()
			};
			var initAttachEvents = function() {
					$header.on("mousedown", function() {
						icadatalayer.add("startsideelement", {
							element: "Kampanjyta",
							action: "Title: " + $(this).find(".header-content h1.header-title").text().trim() + ", Destination: " + $(this).find("li.active").data("url")
						})
					}), $searchField.on("mousedown", function() {
						icadatalayer.add("startsideelement", {
							element: "Recept",
							action: "Klick i receptsökfältet"
						})
					}), $quicklinkListItems.on("mousedown", function(e) {
						e.stopPropagation(), icadatalayer.add("startsideelement", {
							element: "Jag vill",
							action: "Title: " + $(this).text().trim() + ", Destination: " + $(this).attr("href")
						})
					}), $recipeListItems.on("mousedown", function() {
						icadatalayer.add("startsideelement", {
							element: "Recept",
							action: "Förslag"
						})
					}), $allRecipelink.on("mousedown", function() {
						icadatalayer.add("startsideelement", {
							element: "Recept",
							action: "Title: " + $(this).find("strong").text().trim() + ", Destination: " + $(this).attr("href")
						})
					}), $linkListItems.on("mousedown", function() {
						icadatalayer.add("startsideelement", {
							element: "Genvägar",
							action: "Title: " + $(this).find("h2").text().trim() + ", Destination: " + $(this).attr("href")
						})
					}), $pushListItemsButton.on("click", function() {
						clickAreaPuff("knapp-klick", $(this))
					}), $pushListItemLinkImage.on("click", function() {
						clickAreaPuff("bild-klick", $(this))
					}), $recipeTredingListLinks.on("mousedown", function() {
						icadatalayer.add("startsideelement", {
							element: "Recept",
							action: "Title: " + $(this).text().trim() + ", Destination: " + $(this).attr("href")
						})
					}), $recipeThumbNailLinks.on("mousedown", function() {
						icadatalayer.add("startsideelement", {
							element: "Recept",
							action: "Title: " + $(this).text().trim() + ", Destination: " + $(this).attr("href")
						})
					}), $countRecipe.on("mousedown", function() {
						icadatalayer.add("startsideelement", {
							element: "Recept",
							action: "Title: Se alla xxx recept, Destination: " + $(this).attr("href")
						})
					}), $footerLinkListItems.on("mousedown", function() {
						icadatalayer.add("startsideelement", {
							element: "Sidfot",
							action: "Title: " + $(this).text().trim() + ", Destination: " + $(this).attr("href")
						})
					}), $footerPushItems.on("mousedown", function() {
						icadatalayer.add("startsideelement", {
							element: "Sidfot",
							action: "Title: " + $(this).find("h3").text().trim() + ", Destination: " + $(this).attr("href")
						})
					}), $footerSubNav.on("mousedown", function() {
						icadatalayer.add("startsideelement", {
							element: "Sidfot",
							action: "Title: " + $(this).text().trim() + ", Destination: " + $(this).attr("href")
						})
					})
				},
				clickAreaPuff = function(label, element) {
					icadatalayer.add("startsideelement", {
						element: "Puffar",
						clickArea: label,
						action: "Title: " + $(element).closest(".item").find(".content h2").text().trim() + ", Destination: " + $(element).attr("href")
					})
				};
			return context
		}
		return new _icaseStartPage
	}()
}(jQuery, this, this.document, ICA), $(function() {
	$("#page").hasClass("start-page-icase") && ICA.icaseStartPage.init()
});
!
function($, window, document, undefined) {
	var pluginName = "headerRedirect",
		opt = {
			safeHeaderTargets: ".box, .unslider-arrow"
		},
		Plugin = function(element, options, callback) {
			this.element = $(element), this.options = $.extend({}, opt, options), this.callback = callback, this._defaults = opt, this._name = pluginName, this.init()
		};
	Plugin.prototype = {
		init: function() {
			return this.element.on("click", this.fetchClick.bind(this)), this
		},
		fetchClick: function(e) {
			var $target = $(e.target);
			if (!$target.is(this.options.safeHeaderTargets) && 0 == $target.closest(this.options.safeHeaderTargets).length) {
				var url = this.addVanillaQuery(this.element.closest("header").find(".image-slider li.active").data("url"));
				this.redirect(url)
			}
		},
		redirect: function(url) {
			"" != url && (window.location.href = url)
		},
		addVanillaQuery: function(url) {
			if (window.location.href.indexOf("i_showvanilla=1") != -1) {
				var prefix = url.indexOf("?") > -1 ? "&" : "?";
				return url + prefix + "i_showvanilla=1"
			}
			return url
		}
	}, $.fn[pluginName] = function(options, callback) {
		return this.each(function() {
			$.data(this, "plugin_" + pluginName) || $.data(this, "plugin_" + pluginName, new Plugin(this, options, callback))
		})
	}
}(jQuery, window, document);
!
function($) {
	var CoffeForm = function() {
			var coffe = {
				obj: $(this),
				typePicker: $("select#traceCoffeType", this),
				datePicker: $("select#traceCoffeDate", this),
				linkButton: $("#traceCoffeLink", this),
				typeChange: function() {
					0 == coffe.typePicker[0].selectedIndex ? coffe.resetForm(!0) : ICA.legacy.traceCoffe(coffe.typePicker.val(), coffe.success, coffe.error)
				},
				dateChange: function() {
					0 < coffe.datePicker[0].selectedIndex && coffe.activate(coffe.linkButton)
				},
				success: function(data) {
					data && data.length > 0 ? (coffe.datePicker.html(function() {
						for (var html = '<option value="default">Datum på förpackning</option>', i = 0, l = data.length; i < l; i++) html += '<option value="' + data[i].CoffeText + '">' + data[i].CoffeValue + "</option>";
						return html
					}).trigger("change"), coffe.activate(coffe.datePicker), coffe.inactivate(coffe.linkButton), coffe.datePicker.prop("title", "Datum på förpackning")) : (coffe.datePicker.closest(".select").prop("title", "Inga datum funna").find(".selecttitle").text("Inga datum funna"), coffe.datePicker.prop("title", "Inga datum funna"), coffe.datePicker.empty(), coffe.datePicker.append($("<option value='Inga datum funna'>Inga datum funna</option>")), coffe.resetForm(!1))
				},
				error: function(err) {},
				resetForm: function(clearTitle) {
					clearTitle && coffe.datePicker.prop("title", "").closest(".select").prop("title", "").find(".selecttitle").empty(), coffe.datePicker[0].length = 1, coffe.inactivate(coffe.datePicker), coffe.inactivate(coffe.linkButton)
				},
				inactivate: function(obj) {
					obj.prop("disabled", !0)
				},
				activate: function(obj) {
					obj.prop("disabled", !1)
				},
				init: function() {
					coffe.typePicker.val("default").trigger("change").on("change", coffe.typeChange), coffe.datePicker.on("change", coffe.dateChange), coffe.inactivate(coffe.linkButton), coffe.inactivate(coffe.datePicker), coffe.linkButton.click(function(e) {
						e.preventDefault(), "default" != coffe.datePicker.val() && "Datum på förpackning" != coffe.datePicker.val() && window.open(coffe.datePicker.val(), "", "")
					})
				}
			};
			return coffe.init()
		};
	$(function() {
		$(window).on("initDom", function(e) {
			$(e.target).is(document) && $("fieldset#traceCoffeField").create(CoffeForm)
		})
	})
}(jQuery);
!
function($) {
	"use strict";
	var grocerybagsearch = {
		SearchField: function(args) {
			var searchfield = {
				opt: $.extend({}, args),
				obj: $(this),
				searchfieldType: void 0,
				skipparamnames: ["i_showvanilla", "i_r_showvanilla"],
				input: $("input", this),
				searchurl: $(this).attr("data-url") ? $(this).attr("data-url") : window.location.pathname,
				error: $("<span>Postnumret måste vara 5 siffror</span>"),
				onsubmit: function(e) {
					e.stopPropagation(), searchfield.error.remove();
					var searchval = $.trim(icaUtilities.getValueNotPlaceholder(searchfield.input));
					if (searchval = searchval.replace(/ /g, "")) if (searchfield.validate(searchval)) {
						window.location.href.indexOf("grocerybagstorepostalcode") >= 0 ? icadatalayer.addAtNextPageLoad("search", {
							search: {
								phrase: searchval,
								type: searchfield.searchfieldType
							}
						}) : icadatalayer.addAtNextPageLoad(null, {
							search: {
								phrase: searchval,
								type: searchfield.searchfieldType
							}
						});
						var separator = "?";
						searchfield.searchurl.indexOf("?") > -1 && (separator = "&"), window.location.href = searchfield.searchurl + separator + "grocerybagstorepostalcode=" + searchval
					} else searchfield.input.after(searchfield.error)
				},
				validate: function(searchterm) {
					return searchterm.match(/^(\s*\d{3}\s?\d{2}\s*)$/)
				},
				onPageload: function() {
					var query = window.location.href.split("#")[0],
						queryParam = query.split("?");
					if (queryParam.length > 1) for (var queries = queryParam[1].split("&"), i = 0; i < queries.length; i++) {
						var parameters = queries[i].split("=");
						parameters.length > 1 && "grocerybagstorepostalcode" == parameters[0] && searchfield.input.val(parameters[1])
					}
				},
				init: function() {
					searchfield.obj.on("submit", searchfield.onsubmit), searchfield.obj.on("keypress", function(e) {
						if ("13" == e.keyCode || "13" == e.which) return searchfield.onsubmit(e), !1
					}), searchfield.searchfieldType = searchfield.obj.data("datalayer-searchtype"), searchfield.onPageload()
				}
			};
			return searchfield.init()
		},
		init: function() {
			$(".grocerybag-searchfieldset").create(grocerybagsearch.SearchField), $(document).on("tool-ready", function(e) {
				$(".grocerybag-searchfieldset").create(grocerybagsearch.SearchField)
			})
		}
	};
	$(document).ready(function() {
		$(window).on("initDom", function(e) {
			$(e.target).is(document) && grocerybagsearch.init(e)
		})
	})
}(jQuery);
!
function($, undefined) {
	"use strict";
	$(document).ready(function() {
		$(document).on("initDom", function(e) {
			if ($(e.target).is(document)) {
				var $datalayerInputs = $(".datalayer-hidden-input"),
					genericParams = {};
				 $("#resetpasswordform").on("validationcomplete", function(e, formIsValid) {
					
				}), $("#changepasswordform").on("validationcomplete", function(e, formIsValid) {
					
				}), $('[data-datalayer="foodpanic-modal-link"]').on("click", function() {
					
				}), $('.startPage .recipe-box [data-datalayer="recipe-category-link"]').on("mousedown touchstart", function(e) {
					var categoryName = $(this).attr("title"),
						categoryLink = $(this).attr("href");
					
				}), $('.recipepage [data-datalayer="similar-recipes-modal-link"]').on("click", function() {
				}), $('.recipepage [data-datalayer="recipe-change-portions"] span.range').on("click", function() {
					var portions = $(".handle", this).attr("aria-valuenow");
				}), $('.recipepage .recipe-box [data-datalayer="recipe-category-link"]').on("mousedown touchstart", function(e) {
					var categoryName = $(this).attr("title"),
						categoryLink = $(this).attr("href");
				}), $(".recipecategorypage .result-listing .icon-thumbs").on("mousedown touchstart", function() {
				}), $(".recipecategorypage .result-listing .icon-list").on("mousedown touchstart", function() {
				}), $(".recipecategorypage .recipe-listing .loadmore").on("click", function() {
				}), $(".recipecategorypage #recipe-filter li.checkbox").on("mousedown touchstart", function() {
					var action = $(this).is(".active") ? "remove" : "add",
						input = $('input[type="checkbox"]', this),
						type = input.data("ajaxname") ? input.data("ajaxname").split(";").length > 1 ? input.data("ajaxname").split(";")[1] : input.data("ajaxname") : "",
						name = input.data("ajaxvalue") ? input.data("ajaxvalue") : "";

				}), $('a[data-datalayer="banner-click"]').on("click", function(e) {
					var input = $(e.currentTarget).find("input.datalayer-hidden-input"),
						val = undefined;
					if (val = input.length > 0 ? input.val() : $(e.currentTarget).attr("data-datalayerargs")) {
						var json = $.parseJSON(val);
						json.banner.action = "mousedown"
					}
				}), "undefined" != typeof twttr && twttr.ready(function(twttr) {
					twttr.events.bind("tweet", function(intent_event) {
					})
				}), "undefined" != typeof FB && FB.Event.subscribe("edge.create", function(e) {
				}), $("#pinterest").on("click", function(e) {

				}), window.___gcfg = {
					lang: "sv"
				}
			} else {
				if ($(".recipecategorypage .recipe-listing .loadmore").on("click", function() {
					icadatalayer.add("recipe-category-show-more-recipes")
				}), $(e.target).is(".fetched")) {
					var $datalayerInputs = $(".datalayer-hidden-input", $(e.target)),
						genericParams = icadatalayer.addOnPageLoad($datalayerInputs);
					$.isEmptyObject(genericParams) || window.dataLayer.push(genericParams)
				}
				if ($(e.target).is(".tool.account-balance") || $(e.target).is(".tool.grocerybag") || $(e.target).is("section.modalbox.myfavorites")) {
					var $datalayerInputs = $(".datalayer-hidden-input", $(e.target)),
						genericParams = icadatalayer.addOnPageLoad($datalayerInputs);
					$.isEmptyObject(genericParams) || window.dataLayer.push(genericParams)
				}
			}
		})
	})
}(jQuery);
(function() {
	var $, win, rAF, touchendtimer;
	$ = this.jQuery, win = $(window), $.fn.stick_in_parent = function(opts) {
		var elm, inner_scrolling, offset_top, parent_selector, sticky_class, _fn, _i, _len;
		for (null == opts && (opts = {}), sticky_class = opts.sticky_class, inner_scrolling = opts.inner_scrolling, parent_selector = opts.parent, offset_top = opts.offset_top, null == offset_top && (offset_top = 0), null == parent_selector && (parent_selector = void 0), null == inner_scrolling && (inner_scrolling = !0), null == sticky_class && (sticky_class = "is_stuck"), _fn = function(elm, padding_bottom, parent_top, parent_height, top, height, el_float) {
			var bottomed, detach, fixed, last_pos, offset, parent, recalc, recalc_and_tick, tick;
			if (!elm.data("sticky_kit")) {
				if (elm.data("sticky_kit", !0), parent = elm.parent(), null != parent_selector && (parent = parent.closest(parent_selector)), !parent.length) throw "failed to find stick parent";
				if (fixed = !1, bottomed = !1, recalc = function() {
					var border_top, padding_top, restore;
					if (border_top = parseInt(parent.css("border-top-width"), 10), padding_top = parseInt(parent.css("padding-top"), 10), padding_bottom = parseInt(parent.css("padding-bottom"), 10), parent_top = parent.offset().top + border_top + padding_top, parent_height = parent.height(), restore = fixed ? (fixed = !1, bottomed = !1, elm.css({
						position: "",
						top: "",
						width: "",
						bottom: ""
					}).removeClass(sticky_class), !0) : void 0, top = elm.offset().top - parseInt(elm.css("margin-top"), 10) - offset_top, height = elm.outerHeight(!0), el_float = elm.css("float"), restore) return tick()
				}, recalc(), height !== parent_height) return last_pos = void 0, offset = offset_top, tick = function() {
					var css, delta, scroll, will_bottom, win_height;
					return scroll = win.scrollTop(), null != last_pos && (delta = scroll - last_pos), last_pos = scroll, fixed ? (will_bottom = scroll + height + offset > parent_height + parent_top, bottomed && !will_bottom && (bottomed = !1, elm.css({
						position: "fixed",
						bottom: "",
						top: offset
					}).trigger("sticky_kit:unbottom")), scroll < top && (fixed = !1, offset = offset_top, css = {
						position: "",
						width: "",
						top: ""
					}, elm.css(css).removeClass(sticky_class).trigger("sticky_kit:unstick")), inner_scrolling && (win_height = win.height(), height > win_height && (bottomed || (offset -= delta, offset = Math.max(win_height - height, offset), offset = Math.min(offset_top, offset), fixed && elm.css({
						top: offset + "px"
					}))))) : scroll > top && (fixed = !0, css = {
						position: "fixed",
						top: offset
					}, css.width = "border-box" === elm.css("box-sizing") ? elm.outerWidth() + "px" : elm.width() + "px", elm.css(css).addClass(sticky_class), elm.trigger("sticky_kit:stick")), fixed && (null == will_bottom && (will_bottom = scroll + height + offset > parent_height + parent_top), !bottomed && will_bottom) ? (bottomed = !0, "static" === parent.css("position") && parent.css({
						position: "relative"
					}), elm.css({
						position: "absolute",
						top: parent.height() - elm.height() - 10 + "px",
						bottom: "auto"
					})) : void(rAF && (rAF = requestAnimationFrame(tick)))
				}, recalc_and_tick = function() {
					return recalc(), tick()
				}, detach = function() {
					if (window.requestAnimationFrame ? (win.off("scroll", scrollRAF), win.off("touchstart", touchStartRAF), win.off("touchend", touchEndRAF)) : win.off("scroll", tick), win.off("resize", recalc_and_tick), $(document.body).off("sticky_kit:recalc", recalc_and_tick), elm.off("sticky_kit:detach", detach), elm.removeData("sticky_kit"), elm.css({
						position: "relative",
						bottom: "auto",
						top: "0",
						"padding-bottom": "",
						width: "auto"
					}), parent.position("position", ""), fixed) return void elm.removeClass(sticky_class)
				}, scrollRAF = function() {
					cancelAnimationFrame(rAF), rAF = requestAnimationFrame(tick), clearTimeout(touchendtimer), touchendtimer = setTimeout(function() {
						cancelAnimationFrame(rAF)
					}, 500)
				}, touchStartRAF = function() {
					clearTimeout(touchendtimer), win.off("scroll", scrollRAF), cancelAnimationFrame(rAF), rAF = requestAnimationFrame(tick)
				}, touchEndRAF = function() {
					touchendtimer = setTimeout(function() {
						cancelAnimationFrame(rAF)
					}, 1e3)
				}, window.requestAnimationFrame ? (win.on("scroll", scrollRAF), win.on("touchstart", touchStartRAF), win.on("touchend touchcancel", touchEndRAF)) : win.on("scroll", tick), win.on("resize", recalc_and_tick), $(document.body).on("sticky_kit:recalc", recalc_and_tick), elm.on("sticky_kit:detach", detach), setTimeout(tick, 0)
			}
		}, _i = 0, _len = this.length; _i < _len; _i++) elm = this[_i], _fn($(elm));
		return this
	}
}).call(this);
!
function($, window, document, undefined) {
	var $window = $(window);
	$.fn.lazyload = function(options) {
		function update() {
			var counter = 0;
			elements.each(function() {
				var $this = $(this);
				if (!settings.skip_invisible || $this.is(":visible")) if ($.abovethetop(this, settings) || $.leftofbegin(this, settings));
				else if ($.belowthefold(this, settings) || $.rightoffold(this, settings)) {
					if (++counter > settings.failure_limit) return !1
				} else $this.trigger("appear"), counter = 0
			})
		}
		var $container, elements = this,
			settings = {
				threshold: 0,
				failure_limit: 0,
				event: "scroll",
				effect: "show",
				container: window,
				data_attribute: "original",
				skip_invisible: !0,
				appear: null,
				load: null,
				placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
			};
		return options && (undefined !== options.failurelimit && (options.failure_limit = options.failurelimit, delete options.failurelimit), undefined !== options.effectspeed && (options.effect_speed = options.effectspeed, delete options.effectspeed), $.extend(settings, options)), $container = settings.container === undefined || settings.container === window ? $window : $(settings.container), 0 === settings.event.indexOf("scroll") && $container.bind(settings.event, function() {
			return update()
		}), this.each(function() {
			var self = this,
				$self = $(self);
			self.loaded = !1, $self.attr("src") !== undefined && $self.attr("src") !== !1 || $self.is("img") && $self.attr("src", settings.placeholder), $self.one("appear", function() {
				if (!this.loaded) {
					if (settings.appear) {
						var elements_left = elements.length;
						settings.appear.call(self, elements_left, settings)
					}
					$("<img />").bind("load", function() {
						var original = $self.attr("data-" + settings.data_attribute);
						$self.hide(), $self.is("img") ? $self.attr("src", original) : $self.css("background-image", "url('" + original + "')"), $self[settings.effect](settings.effect_speed), self.loaded = !0;
						var temp = $.grep(elements, function(element) {
							return !element.loaded
						});
						if (elements = $(temp), settings.load) {
							var elements_left = elements.length;
							settings.load.call(self, elements_left, settings)
						}
					}).attr("src", $self.attr("data-" + settings.data_attribute))
				}
			}), 0 !== settings.event.indexOf("scroll") && $self.bind(settings.event, function() {
				self.loaded || $self.trigger("appear")
			})
		}), $window.bind("resize", function() {
			update()
		}), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && $window.bind("pageshow", function(event) {
			event.originalEvent && event.originalEvent.persisted && elements.each(function() {
				$(this).trigger("appear")
			})
		}), $(document).ready(function() {
			update()
		}), this
	}, $.belowthefold = function(element, settings) {
		var fold;
		return fold = settings.container === undefined || settings.container === window ? (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop() : $(settings.container).offset().top + $(settings.container).height(), fold <= $(element).offset().top - settings.threshold
	}, $.rightoffold = function(element, settings) {
		var fold;
		return fold = settings.container === undefined || settings.container === window ? $window.width() + $window.scrollLeft() : $(settings.container).offset().left + $(settings.container).width(), fold <= $(element).offset().left - settings.threshold
	}, $.abovethetop = function(element, settings) {
		var fold;
		return fold = settings.container === undefined || settings.container === window ? $window.scrollTop() : $(settings.container).offset().top, fold >= $(element).offset().top + settings.threshold + $(element).height()
	}, $.leftofbegin = function(element, settings) {
		var fold;
		return fold = settings.container === undefined || settings.container === window ? $window.scrollLeft() : $(settings.container).offset().left, fold >= $(element).offset().left + settings.threshold + $(element).width()
	}, $.inviewport = function(element, settings) {
		return !($.rightoffold(element, settings) || $.leftofbegin(element, settings) || $.belowthefold(element, settings) || $.abovethetop(element, settings))
	}, $.extend($.expr[":"], {
		"below-the-fold": function(a) {
			return $.belowthefold(a, {
				threshold: 0
			})
		},
		"above-the-top": function(a) {
			return !$.belowthefold(a, {
				threshold: 0
			})
		},
		"right-of-screen": function(a) {
			return $.rightoffold(a, {
				threshold: 0
			})
		},
		"left-of-screen": function(a) {
			return !$.rightoffold(a, {
				threshold: 0
			})
		},
		"in-viewport": function(a) {
			return $.inviewport(a, {
				threshold: 0
			})
		},
		"above-the-fold": function(a) {
			return !$.belowthefold(a, {
				threshold: 0
			})
		},
		"right-of-fold": function(a) {
			return $.rightoffold(a, {
				threshold: 0
			})
		},
		"left-of-fold": function(a) {
			return !$.rightoffold(a, {
				threshold: 0
			})
		}
	})
}(jQuery, window, document);
!
function($) {
	"use strict";
	function getDateCookie(name) {
		var loggedInSinceCookie = ICA.legacy.getCookie(name);
		if (!loggedInSinceCookie) return -1;
		var match = /^(\d{4})[-:\.](\d{2})[-:\.](\d{2})$/.exec(loggedInSinceCookie);
		if (match) {
			var cookieDate = new Date(match[1], match[2] - 1, match[3]),
				diff = window.icaUtilities.dates.numOfDaysBetween(new Date, cookieDate) - 1;
			return diff < 0 && (diff = 0), diff
		}
		return -1
	}
	function getToday() {
		var today = new Date,
			dd = today.getDate(),
			mm = today.getMonth() + 1,
			yyyy = today.getFullYear();
		return dd < 10 && (dd = "0" + dd), mm < 10 && (mm = "0" + mm), today = yyyy + "-" + mm + "-" + dd
	}
	function showLoginReminder(alertLoginFormPageId) {
		ICA.legacy.get("/Templates/ajaxresponse.aspx?ajaxFunction=AlertPageCtrl&alertPageId=" + alertLoginFormPageId, null, function(data) {
			var $content = $(data),
				isValid = $content.find(".form-page-id").length > 0,
				loginTopBarActive = $("#loginTopBarIsValid").length > 0;
			isValid = isValid && !loginTopBarActive, isValid && ($content.find(".primary").prepend($content.find(".form-companion")), window.triggerAsModal($content, "login-reminder"), $(".modalbox.login-reminder").trigger("initDom"), ICA.legacy.setCookie("LastICALoginReminder", getToday(), 100))
		})
	}
	$(document).ready(function() {
		if (!ICA.legacy.loggedIn) {
			var alertLoginFormPageId = $("#alertLoginFormPageId").val(),
				numberOfDaysAllowedNotLoggedIn = $("#numberOfDaysAllowedNotLoggedIn").val(),
				numberOfDaysToNextLoginReminder = $("#numberOfDaysToNextLoginReminder").val(),
				numberOfDaysSinceLastLogin = getDateCookie("LastICALogin"),
				numberOfDaysSinceLastReminder = getDateCookie("LastICALoginReminder");
			numberOfDaysAllowedNotLoggedIn && (numberOfDaysSinceLastLogin >= numberOfDaysAllowedNotLoggedIn || numberOfDaysSinceLastLogin == -1) && (numberOfDaysToNextLoginReminder && numberOfDaysSinceLastReminder >= numberOfDaysToNextLoginReminder || numberOfDaysSinceLastReminder == -1) && showLoginReminder(alertLoginFormPageId)
		}
	})
}(jQuery);
!
function($) {
	var Sso = function() {
			var sso = {
				obj: $(this),
				notify: function(e) {
					0 < $("#iostate").length && 0 < $("#iourl").length && (e.stopPropagation(), ICA.legacy.ssoSendToOnline($("#iostate").val(), $("#iourl").val(), sso.success, sso.error))
				},
				success: function() {},
				error: function() {},
				init: function() {
					sso.obj.on("initDom", sso.notify), sso.obj.trigger("initDom")
				}
			};
			return sso.init()
		};
	$(function() {
		$(window).on("initDom", function(e) {
			$(e.target).is(document) && $("#ioholder").create(Sso)
		})
	})
}(jQuery);
var store = {
	WorkHereForm: function(args) {
		var workhereform = {
			obj: $(this),
			preview: function(e, params) {
				e.preventDefault(), workhereform.obj.trigger("done"), $.each($("#workhereform").find("input:radio:not(:checked)"), function(key, value) {
					var name = $(value).attr("name");
					void 0 != name && void 0 == params[name] && (params[name] = "")
				}), $.each($("#workhereform").find("input:checkbox:not(:checked)"), function(key, value) {
					void 0 == params[$(value).attr("id")] && (params[$(value).attr("id")] = "false")
				}), $.each($("#workhereform").find("input:file"), function(key, value) {
					var elemId = $(value).attr("id");
					if (void 0 == params[elemId]) {
						var value = $("#" + elemId).parent("label").attr("title");
						value && "välj fil" == value.toLowerCase() && (value = "-"), params[elemId] = value
					}
				}), $.each(params, function(key, value) {
					if ($("#preview-" + key).length > 0) {
						"" == value && (value = "-"), $("#" + key + '[type="checkbox"]').length > 0 && ("true" == value && (value = "Ja"), "false" == value && (value = "Nej"));
						var radio = $("input:radio[name=" + key + "]:checked");
						if (radio.length > 0) {
							var radioid = radio.attr("id");
							value = $('label[for="' + radioid + '"]').text()
						}
						if ($("input:radio[name=" + key + "]").length > 0) {
							var labelText = $("[name=" + key + "]").closest("ul").prev(".label").text(),
								labelElem = $("#preview-" + key).prev("dt");
							labelElem.length > 0 && "" == labelElem.html() && labelElem.html(labelText)
						} else {
							var labelText = $('label[for="' + key + '"]').text(),
								labelElem = $("#preview-" + key).prev("dt");
							labelElem.length > 0 && "" == labelElem.html() && labelElem.html(labelText)
						}
						"expyear" == key && (value > 0 ? (value > 10 && (value = "&gt;10"), value += "&nbsp;år") : value = ""), "expmonth" == key && (value > 0 ? (params.expyear > 0 && params.expyear < 11 && (value = "&nbsp;och&nbsp;" + value), "11" != params.expyear ? value += "1" == params.expmonth ? "&nbsp;månad" : "&nbsp;månader" : value = "") : value = ""), $("#preview-" + key).html(value)
					}
				}), workhereform.toggleformarea()
			},
			apply: function(e) {
				e.preventDefault(), $("form").addClass("allow").submit()
			},
			toggleformarea: function() {
				var elementToFadeOut = "#formarea",
					elementToFadeIn = "#previewarea";
				if ($("#previewarea").is(":visible")) {
					var tmp = elementToFadeIn;
					elementToFadeIn = elementToFadeOut, elementToFadeOut = tmp
				}
				var new_position = $("#workhereform").offset();
				window.scrollTo(new_position.left, new_position.top - 10), setTimeout(function() {
					$(elementToFadeOut).fadeOut(200, function() {
						$(elementToFadeIn).fadeIn(200)
					})
				}, 20)
			},
			init: function() {
				workhereform.obj.on("ajaxsubmit", workhereform.preview), $("#apply").on("click", workhereform.apply), $("#backtoform").on("click", function(e) {
					e.preventDefault(), workhereform.toggleformarea()
				})
			}
		};
		return workhereform.init(args)
	},
	Cart: function(args) {
		var cart = {
			obj: $(this),
			remove: function(e, params) {
				var tr = $(e.currentTarget).closest("tr"),
					jsonInput = {
						"DeleteFromCart.Id": tr.attr("data-productid"),
						"DeleteFromCart.Price": tr.attr("data-price"),
						"DeleteFromCart.StoreId": tr.attr("data-storeid"),
						"DeleteFromCart.Unit": tr.attr("data-unit"),
						"DeleteFromCart.ExtraInfo": tr.attr("data-extrainfo")
					};
				ICA.legacy.storeCart.remove(jsonInput, cart.update), icadatalayer.add("catering-cart", {
					cateringCart: {
						action: "remove-item",
						itemName: tr.attr("data-name"),
						itemQuantity: tr.attr("data-quantity")
					}
				})
			},
			update: function(data) {
				if (data.success) {
					var cartOpen = $("#catering-box.open").length > 0,
						formOpen = $("#cart-order.open").length > 0 && cartOpen;
					data.success = void 0, data.message = void 0;
					var jsonInput = $.extend({
						cartOpen: cartOpen.toString(),
						formOpen: formOpen.toString()
					}, data);
					ICA.legacy.storeCart.update(jsonInput, function(data) {
						$("#cartContents").html(data), $("#cartContents").parent().trigger("initDom")
					})
				}
			},
			submit: function(e, params) {
				e.stopPropagation(), params = $.extend({
					"SendCateringOrderEmail.StoreId": $("#current_store_id").val()
				}, params), ICA.legacy.storeCart.sendorder(params, function(data) {
					data.success && (cart.trackOrderForGA(), data = $.extend({
						formOpen: "false",
						cartOpen: "false"
					}, data), ICA.legacy.killCookie("CateringCookie"), ICA.legacy.killCookie("CateringDiscountCookie"), cart.obj.trigger("done").trigger("clearform"), cart.update(data), window.triggerAsModal("<h3>Tack för din beställning</h3><p>En bekräftelse på att vi har mottagit din    beställning har skickats till din e-post.<br />Sedan skickas en orderbekräftelse.</p>"))
				})
			},
			trackOrderForGA: function() {
				var productCollection = $(".catering-cart tbody tr", cart.obj),
					totalAmount = $(".price", cart.obj).text().replace("kr", ""),
					now = new Date,
					orderId = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + ":" + now.getMilliseconds(),
					cateringGAobject = {
						cateringTransactionData: {
							id: orderId,
							total: totalAmount
						}
					},
					productsArray = [];
				productCollection.each(function() {
					var product = {
						sku: $(this).data("productid"),
						name: $(this).data("name"),
						price: $(this).data("price"),
						quantity: $(this).data("quantity")
					};
					productsArray.push(product)
				}), cateringGAobject.cateringTransactionData.products = productsArray, icadatalayer.add("cateringTransaction", cateringGAobject)
			},
			datePicker: function() {
				var pickers = $("input.datepicker", cart.obj).datepicker({
					dateFormat: "yy-mm-dd"
				}).wrap('<div class="datepicker-wrapper"></div>');
				pickers.each(function() {
					var $input = $(this);
					$('<span class="datepicker"></span>').insertAfter($input).on("click", function() {
						$input.focus()
					})
				})
			},
			setup: function() {},
			addHomeDelivery: function(e, params) {
				var tr = $(e.currentTarget).closest("tr"),
					params = {
						"AddToCart.Amount": "1",
						"AddToCart.MinimumAmount": "0",
						"AddToCart.ProductId": "0",
						"AddToCart.Price": tr.attr("data-price"),
						"AddToCart.Name": tr.attr("data-name"),
						"AddToCart.StoreId": tr.attr("data-storeid")
					};
				ICA.legacy.storeCart.add(params, cart.update)
			},
			removeDiscount: function(e, params) {
				var storeId = $("#current_store_id").val();
				if (storeId) {
					var jsonInput = {
						"DeleteDiscountCode.StoreId": storeId
					};
					ICA.legacy.storeCart.removeDiscountCode(jsonInput, cart.update)
				}
			},
			init: function(args) {
				$("#cart-order-form", cart.obj).on("ajaxsubmit", cart.submit), $(".cart-remove", cart.obj).on("click", function(e) {
					e.preventDefault(), cart.remove(e)
				}), $(".cart-removeDiscount", cart.obj).on("click", function(e) {
					e.preventDefault(), cart.removeDiscount(e)
				}), $("#chkHomeDelivery", cart.obj).on("check", cart.addHomeDelivery), $("#chkHomeDelivery", cart.obj).on("uncheck", cart.remove), args.ispageload && $("body").on("updatecart", function(event, data) {
					cart.update(data)
				})
			}
		};
		return cart.init(args)
	},
	AddToCartForm: function() {
		var addform = {
			obj: $(this),
			submit: function(e, params) {
				e.stopPropagation();
				var message;
				minimunAmount = params["AddToCart.MinimumAmount"], parseInt(minimunAmount) > parseInt(params["AddToCart.Amount"]) ? ($(this).removeClass("loading").removeAttr("disabled"), message = "Vänligen kontrollera angivet antal. Minsta beställningsantal är " + minimunAmount + ".", window.triggerAsModal(message, "center")) : (ICA.legacy.storeCart.add(params, addform.success, addform.error), icadatalayer.add("catering-cart", {
					cateringCart: {
						action: "add-item",
						itemName: params["AddToCart.Name"],
						itemQuantity: params["AddToCart.Amount"]
					}
				}))
			},
			success: function(data) {
				addform.obj.trigger("done").trigger("clearform"), addform.obj.trigger("updatecart", data), setTimeout(function() {
					var orderByPhone = "true" == $("#hdnOrderByPhone").val(),
						addedTo = orderByPhone ? "inköpslistan" : "varukorgen";
					$(".catering-box .cart").triggerAsCallout("<p>Dina varor har lagts i " + addedTo + "</p>")
				}, 100)
			},
			error: function(err) {},
			init: function() {
				addform.obj.on("ajaxsubmit", addform.submit)
			}
		};
		return addform.init()
	},
	DiscountForm: function() {
		var discountform = {
			obj: $(this),
			submit: function(e, params) {
				e.stopPropagation();
				var pageId = $("#hdnCurrentPageId").val(),
					storeId = $("#current_store_id").val(),
					code = $("#discountcode").val();
				if (pageId && storeId && code) {
					var jsonInput = {
						"AddDiscountCode.PageId": pageId,
						"AddDiscountCode.StoreId": storeId,
						"AddDiscountCode.Code": code
					};
					ICA.legacy.storeCart.addDiscountCode(jsonInput, discountform.success, discountform.error)
				}
			},
			success: function(data) {
				discountform.obj.trigger("done"), data.success ? (discountform.obj.trigger("clearform"), discountform.obj.trigger("updatecart", data), setTimeout(function() {
					$(".catering-box .cart").triggerAsCallout("<p>Din rabattkod har lagts i varukorgen</p>")
				}, 100)) : window.triggerAsModal('<span class="red">' + data.message + "</span>", "dialog")
			},
			error: function(err) {},
			init: function() {
				discountform.obj.on("ajaxsubmit", discountform.submit)
			}
		};
		return discountform.init()
	}
};
$(function() {
	$(document).on("initDom", function(e) {
		var ispageload = !1;
		if ($(e.target).is(document)) {
			ispageload = !0;
			var cart = $("div.addtocart fieldset", e.target);
			cart[0] && cart.create(store.AddToCartForm), $("body").on("mousedown touchstart", "#catering-box header", function() {
				$("#catering-box").hasClass("open") || icadatalayer.add("catering-cart", {
					cateringCart: {
						action: "expand"
					}
				})
			})
		}
		$("#cartContents", e.target).create(store.Cart, {
			ispageload: ispageload
		}), $("#workhereform", e.target).create(store.WorkHereForm, {
			ispageload: ispageload
		}), $("#catering-discount-form", e.target).create(store.DiscountForm);
		var daysBeforeDelivery = $("#hdnDaysBeforeDelivery").val(),
			today = new Date,
			startDate = new Date;
		startDate.setDate(parseInt(today.getDate()) + parseInt(daysBeforeDelivery));
		var pickers = $("input.datepicker", e.target);
		if (pickers.length) {
			var dayMatch = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
				getWeekdayFromDate = function(d) {
					return d instanceof Date || (d = new Date(d)), dayMatch[d.getDay()]
				};
			pickers.datepicker({
				dateFormat: "yy-mm-dd",
				minDate: startDate,
				firstDay: 1,
				beforeShow: function() {
					setTimeout(function() {
						$(".ui-datepicker").css("z-index", 10)
					}, 0)
				},
				beforeShowDay: function(date) {
					date.setHours(12);
					var weekDay = getWeekdayFromDate(date);
					dateString = date.toJSON().substr(0, 10);
					var irregularDate = deliveryTimes.IrregularOpenDates.filter(function(date) {
						return date.Date === dateString
					});
					return irregularDate.length ? [!irregularDate[0].Closed] : "undefined" == typeof weekDay || !deliveryTimes[weekDay] || deliveryTimes[weekDay].Closed ? [!1] : [deliveryTimes.ClosedDates.indexOf(dateString) === -1]
				},
				onSelect: function(dateString, picker) {
					var daySettings, irregularDate = deliveryTimes.IrregularOpenDates.filter(function(date) {
						return date.Date === dateString
					});
					if (irregularDate.length) daySettings = irregularDate[0];
					else {
						var daySettings = deliveryTimes[getWeekdayFromDate(dateString)];
						if ("undefined" == typeof daySettings) return
					}
					daySettings.SelectableHours instanceof Array && ($select = $('select[id="SendCateringOrderEmail.DeliveryTime"]').empty(), $select.closest(".select").removeClass("disabled"), $option = $('<option name="SendCateringOrderEmail.DeliveryTime"></option>'), $select.prepend('<option value="">Välj en tid</option>'), console.log($option), daySettings.SelectableHours.forEach(function(time, i) {
						$select.append($option.clone().val(time).text("Klockan " + time))
					}))
				}
			}).wrap('<div class="datepicker-wrapper"></div>'), $('select[id="SendCateringOrderEmail.DeliveryTime"]').closest(".select").addClass("disabled "), $('<span class="datepicker"></span>').insertAfter(pickers).on("click", function() {
				pickers.focus()
			});
			var $datepickerstyle = $('<link href="/templates/general/views/styles/rwd/plugins/ui-lightness/jquery-ui-1.10.4.custom.css" type="text/css" rel="stylesheet"></link>');
			$("body").append($datepickerstyle)
		}
	})
});
!
function($) {
	"use strict";
	var publicofferview = {
		PublicOffers: function() {
			var publicoffers = {
				obj: $(this),
				container: void 0,
				targetElement: void 0,
				categoryclick: function(e) {
					e.preventDefault(), this.targetElement = $(e.target).parent(), ICA.legacy.publicoffers.getOffers($(e.currentTarget).attr("data-ajaxvalue"), "", publicoffers.categorysuccess, publicoffers.error)
				},
				typeclick: function(e) {
					e.preventDefault(), this.targetElement = $(e.target).parent(), ICA.legacy.publicoffers.getOffers("", $(e.currentTarget).attr("data-ajaxvalue"), publicoffers.typesuccess, publicoffers.error)
				},
				showallclick: function(e) {
					e.preventDefault(), this.targetElement = $(e.target).parent(), ICA.legacy.publicoffers.resetOffers(publicoffers.resetSuccess, publicoffers.error)
				},
				additionainfoclick: function(e) {
					e.preventDefault();
					var additionalText = $(e.target).siblings(".item-additional-text").val();
					window.triggerAsModal(additionalText)
				},
				resetOffers: function(e) {
					ICA.legacy.publicoffers.resetOffers(publicoffers.resetSuccess, publicoffers.error)
				},
				resetSuccess: function(data) {
					publicoffers.highlightOffer(), $("#offers").html(data).trigger("initDom"), $(".offers-total-count").text($(".number-of-offers").val())
				},
				categorysuccess: function(data) {
					publicoffers.highlightOffer(), $("#offers").html(data).trigger("initDom"), $(".offers-total-count").text($(".number-of-articlegroup-offers").val())
				},
				typesuccess: function(data) {
					publicoffers.highlightOffer(), $("#offers").html(data).trigger("initDom"), $(".offers-total-count").text($(".number-of-offers").val())
				},
				highlightOffer: function() {
					var $targetElement, $spinner, $element, elementID, targetElementID;
					$targetElement = $(publicoffers.targetElement), $("#offers-filter .columned .checkbox").each(function(index, element) {
						$element = $(element), elementID = $element.find("input").attr("id"), targetElementID = $targetElement.find("input").attr("id"), elementID !== targetElementID && $element.hasClass("active") && $element.removeClass("active")
					}), $targetElement.removeClass("loading"), setTimeout(function() {
						$spinner = $targetElement.find(".spinner"), $spinner.remove(), $targetElement.addClass("done")
					}, 300)
				},
				error: function(data) {
					window.log(data)
				},
				init: function() {
					$(document.body).on("click", ".item-additional .info", function(e) {
						publicoffers.additionainfoclick(e)
					}), $(".offers-total-count").text($(".number-of-offers").val()), $(".filter :checkbox[name='category']").click(function(e) {
						publicoffers.categoryclick(e)
					}), $(".filter :checkbox[name='offertype']").click(function(e) {
						publicoffers.typeclick(e)
					}), $(".filter :checkbox[name='showAll']").click(function(e) {
						publicoffers.showallclick(e)
					})
				}
			};
			return publicoffers.init()
		},
		init: function(e) {
			var container = $(e.target);
			$(".store-offers-content", container).create(publicofferview.PublicOffers)
		}
	};
	$(document).ready(function() {
		$(window).on("initDom", function(e) {
			$(e.target).is(document) && publicofferview.init(e)
		})
	})
}(jQuery);
!
function(window) {
	var ua = navigator.userAgent;
	window.HTMLPictureElement && /ecko/.test(ua) && ua.match(/rv\:(\d+)/) && RegExp.$1 < 41 && addEventListener("resize", function() {
		var timer, dummySrc = document.createElement("source"),
			fixRespimg = function(img) {
				var source, sizes, picture = img.parentNode;
				"PICTURE" === picture.nodeName.toUpperCase() ? (source = dummySrc.cloneNode(), picture.insertBefore(source, picture.firstElementChild), setTimeout(function() {
					picture.removeChild(source)
				})) : (!img._pfLastSize || img.offsetWidth > img._pfLastSize) && (img._pfLastSize = img.offsetWidth, sizes = img.sizes, img.sizes += ",100vw", setTimeout(function() {
					img.sizes = sizes
				}))
			},
			findPictureImgs = function() {
				var i, imgs = document.querySelectorAll("picture > img, img[srcset][sizes]");
				for (i = 0; i < imgs.length; i++) fixRespimg(imgs[i])
			},
			onResize = function() {
				clearTimeout(timer), timer = setTimeout(findPictureImgs, 99)
			},
			mq = window.matchMedia && matchMedia("(orientation: landscape)"),
			init = function() {
				onResize(), mq && mq.addListener && mq.addListener(onResize)
			};
		return dummySrc.srcset = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", /^[c|i]|d$/.test(document.readyState || "") ? init() : document.addEventListener("DOMContentLoaded", init), onResize
	}())
}(window), function(window, document, undefined) {
	"use strict";
	function isSpace(c) {
		return " " === c || "\t" === c || "\n" === c || "\f" === c || "\r" === c
	}
	function detectTypeSupport(type, typeUri) {
		var image = new window.Image;
		return image.onerror = function() {
			types[type] = !1, picturefill()
		}, image.onload = function() {
			types[type] = 1 === image.width, picturefill()
		}, image.src = typeUri, "pending"
	}
	function updateMetrics() {
		isVwDirty = !1, DPR = window.devicePixelRatio, cssCache = {}, sizeLengthCache = {}, pf.DPR = DPR || 1, units.width = Math.max(window.innerWidth || 0, docElem.clientWidth), units.height = Math.max(window.innerHeight || 0, docElem.clientHeight), units.vw = units.width / 100, units.vh = units.height / 100, evalId = [units.height, units.width, DPR].join("-"), units.em = pf.getEmValue(), units.rem = units.em
	}
	function chooseLowRes(lowerValue, higherValue, dprValue, isCached) {
		var bonusFactor, tooMuch, bonus, meanDensity;
		return "saveData" === cfg.algorithm ? lowerValue > 2.7 ? meanDensity = dprValue + 1 : (tooMuch = higherValue - dprValue, bonusFactor = Math.pow(lowerValue - .6, 1.5), bonus = tooMuch * bonusFactor, isCached && (bonus += .1 * bonusFactor), meanDensity = lowerValue + bonus) : meanDensity = dprValue > 1 ? Math.sqrt(lowerValue * higherValue) : lowerValue, meanDensity > dprValue
	}
	function applyBestCandidate(img) {
		var srcSetCandidates, matchingSet = pf.getSet(img),
			evaluated = !1;
		"pending" !== matchingSet && (evaluated = evalId, matchingSet && (srcSetCandidates = pf.setRes(matchingSet), pf.applySetCandidate(srcSetCandidates, img))), img[pf.ns].evaled = evaluated
	}
	function ascendingSort(a, b) {
		return a.res - b.res
	}
	function setSrcToCur(img, src, set) {
		var candidate;
		return !set && src && (set = img[pf.ns].sets, set = set && set[set.length - 1]), candidate = getCandidateForSrc(src, set), candidate && (src = pf.makeUrl(src), img[pf.ns].curSrc = src, img[pf.ns].curCan = candidate, candidate.res || setResolution(candidate, candidate.set.sizes)), candidate
	}
	function getCandidateForSrc(src, set) {
		var i, candidate, candidates;
		if (src && set) for (candidates = pf.parseSet(set), src = pf.makeUrl(src), i = 0; i < candidates.length; i++) if (src === pf.makeUrl(candidates[i].url)) {
			candidate = candidates[i];
			break
		}
		return candidate
	}
	function getAllSourceElements(picture, candidates) {
		var i, len, source, srcset, sources = picture.getElementsByTagName("source");
		for (i = 0, len = sources.length; i < len; i++) source = sources[i], source[pf.ns] = !0, srcset = source.getAttribute("srcset"), srcset && candidates.push({
			srcset: srcset,
			media: source.getAttribute("media"),
			type: source.getAttribute("type"),
			sizes: source.getAttribute("sizes")
		})
	}
	function parseSrcset(input, set) {
		function collectCharacters(regEx) {
			var chars, match = regEx.exec(input.substring(pos));
			if (match) return chars = match[0], pos += chars.length, chars
		}
		function parseDescriptors() {
			var w, d, h, i, desc, lastChar, value, intVal, floatVal, pError = !1,
				candidate = {};
			for (i = 0; i < descriptors.length; i++) desc = descriptors[i], lastChar = desc[desc.length - 1], value = desc.substring(0, desc.length - 1), intVal = parseInt(value, 10), floatVal = parseFloat(value), regexNonNegativeInteger.test(value) && "w" === lastChar ? ((w || d) && (pError = !0), 0 === intVal ? pError = !0 : w = intVal) : regexFloatingPoint.test(value) && "x" === lastChar ? ((w || d || h) && (pError = !0), floatVal < 0 ? pError = !0 : d = floatVal) : regexNonNegativeInteger.test(value) && "h" === lastChar ? ((h || d) && (pError = !0), 0 === intVal ? pError = !0 : h = intVal) : pError = !0;
			pError || (candidate.url = url, w && (candidate.w = w), d && (candidate.d = d), h && (candidate.h = h), h || d || w || (candidate.d = 1), 1 === candidate.d && (set.has1x = !0), candidate.set = set, candidates.push(candidate))
		}
		function tokenize() {
			for (collectCharacters(regexLeadingSpaces), currentDescriptor = "", state = "in descriptor";;) {
				if (c = input.charAt(pos), "in descriptor" === state) if (isSpace(c)) currentDescriptor && (descriptors.push(currentDescriptor), currentDescriptor = "", state = "after descriptor");
				else {
					if ("," === c) return pos += 1, currentDescriptor && descriptors.push(currentDescriptor), void parseDescriptors();
					if ("(" === c) currentDescriptor += c, state = "in parens";
					else {
						if ("" === c) return currentDescriptor && descriptors.push(currentDescriptor), void parseDescriptors();
						currentDescriptor += c
					}
				} else if ("in parens" === state) if (")" === c) currentDescriptor += c, state = "in descriptor";
				else {
					if ("" === c) return descriptors.push(currentDescriptor), void parseDescriptors();
					currentDescriptor += c
				} else if ("after descriptor" === state) if (isSpace(c));
				else {
					if ("" === c) return void parseDescriptors();
					state = "in descriptor", pos -= 1
				}
				pos += 1
			}
		}
		for (var url, descriptors, currentDescriptor, state, c, inputLength = input.length, pos = 0, candidates = [];;) {
			if (collectCharacters(regexLeadingCommasOrSpaces), pos >= inputLength) return candidates;
			url = collectCharacters(regexLeadingNotSpaces), descriptors = [], "," === url.slice(-1) ? (url = url.replace(regexTrailingCommas, ""), parseDescriptors()) : tokenize()
		}
	}
	function parseSizes(strValue) {
		function parseComponentValues(str) {
			function pushComponent() {
				component && (componentArray.push(component), component = "")
			}
			function pushComponentArray() {
				componentArray[0] && (listArray.push(componentArray), componentArray = [])
			}
			for (var chrctr, component = "", componentArray = [], listArray = [], parenDepth = 0, pos = 0, inComment = !1;;) {
				if (chrctr = str.charAt(pos), "" === chrctr) return pushComponent(), pushComponentArray(), listArray;
				if (inComment) {
					if ("*" === chrctr && "/" === str[pos + 1]) {
						inComment = !1, pos += 2, pushComponent();
						continue
					}
					pos += 1
				} else {
					if (isSpace(chrctr)) {
						if (str.charAt(pos - 1) && isSpace(str.charAt(pos - 1)) || !component) {
							pos += 1;
							continue
						}
						if (0 === parenDepth) {
							pushComponent(), pos += 1;
							continue
						}
						chrctr = " "
					} else if ("(" === chrctr) parenDepth += 1;
					else if (")" === chrctr) parenDepth -= 1;
					else {
						if ("," === chrctr) {
							pushComponent(), pushComponentArray(), pos += 1;
							continue
						}
						if ("/" === chrctr && "*" === str.charAt(pos + 1)) {
							inComment = !0, pos += 2;
							continue
						}
					}
					component += chrctr, pos += 1
				}
			}
		}
		function isValidNonNegativeSourceSizeValue(s) {
			return !!(regexCssLengthWithUnits.test(s) && parseFloat(s) >= 0) || ( !! regexCssCalc.test(s) || ("0" === s || "-0" === s || "+0" === s))
		}
		var i, unparsedSizesList, unparsedSizesListLength, unparsedSize, lastComponentValue, size, regexCssLengthWithUnits = /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,
			regexCssCalc = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;
		for (unparsedSizesList = parseComponentValues(strValue), unparsedSizesListLength = unparsedSizesList.length, i = 0; i < unparsedSizesListLength; i++) if (unparsedSize = unparsedSizesList[i], lastComponentValue = unparsedSize[unparsedSize.length - 1], isValidNonNegativeSourceSizeValue(lastComponentValue)) {
			if (size = lastComponentValue, unparsedSize.pop(), 0 === unparsedSize.length) return size;
			if (unparsedSize = unparsedSize.join(" "), pf.matchesMedia(unparsedSize)) return size
		}
		return "100vw"
	}
	document.createElement("picture");
	var warn, eminpx, alwaysCheckWDescriptor, evalId, pf = {},
		noop = function() {},
		image = document.createElement("img"),
		getImgAttr = image.getAttribute,
		setImgAttr = image.setAttribute,
		removeImgAttr = image.removeAttribute,
		docElem = document.documentElement,
		types = {},
		cfg = {
			algorithm: ""
		},
		srcAttr = "data-pfsrc",
		srcsetAttr = srcAttr + "set",
		ua = navigator.userAgent,
		supportAbort = /rident/.test(ua) || /ecko/.test(ua) && ua.match(/rv\:(\d+)/) && RegExp.$1 > 35,
		curSrcProp = "currentSrc",
		regWDesc = /\s+\+?\d+(e\d+)?w/,
		regSize = /(\([^)]+\))?\s*(.+)/,
		setOptions = window.picturefillCFG,
		baseStyle = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",
		fsCss = "font-size:100%!important;",
		isVwDirty = !0,
		cssCache = {},
		sizeLengthCache = {},
		DPR = window.devicePixelRatio,
		units = {
			px: 1,
			in : 96
		},
		anchor = document.createElement("a"),
		alreadyRun = !1,
		regexLeadingSpaces = /^[ \t\n\r\u000c]+/,
		regexLeadingCommasOrSpaces = /^[, \t\n\r\u000c]+/,
		regexLeadingNotSpaces = /^[^ \t\n\r\u000c]+/,
		regexTrailingCommas = /[,]+$/,
		regexNonNegativeInteger = /^\d+$/,
		regexFloatingPoint = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,
		on = function(obj, evt, fn, capture) {
			obj.addEventListener ? obj.addEventListener(evt, fn, capture || !1) : obj.attachEvent && obj.attachEvent("on" + evt, fn)
		},
		memoize = function(fn) {
			var cache = {};
			return function(input) {
				return input in cache || (cache[input] = fn(input)), cache[input]
			}
		},
		evalCSS = function() {
			var regLength = /^([\d\.]+)(em|vw|px)$/,
				replace = function() {
					for (var args = arguments, index = 0, string = args[0]; ++index in args;) string = string.replace(args[index], args[++index]);
					return string
				},
				buildStr = memoize(function(css) {
					return "return " + replace((css || "").toLowerCase(), /\band\b/g, "&&", /,/g, "||", /min-([a-z-\s]+):/g, "e.$1>=", /max-([a-z-\s]+):/g, "e.$1<=", /calc([^)]+)/g, "($1)", /(\d+[\.]*[\d]*)([a-z]+)/g, "($1 * e.$2)", /^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi, "") + ";"
				});
			return function(css, length) {
				var parsedLength;
				if (!(css in cssCache)) if (cssCache[css] = !1, length && (parsedLength = css.match(regLength))) cssCache[css] = parsedLength[1] * units[parsedLength[2]];
				else try {
					cssCache[css] = new Function("e", buildStr(css))(units)
				} catch (e) {}
				return cssCache[css]
			}
		}(),
		setResolution = function(candidate, sizesattr) {
			return candidate.w ? (candidate.cWidth = pf.calcListLength(sizesattr || "100vw"), candidate.res = candidate.w / candidate.cWidth) : candidate.res = candidate.d, candidate
		},
		picturefill = function(opt) {
			var elements, i, plen, options = opt || {};
			if (options.elements && 1 === options.elements.nodeType && ("IMG" === options.elements.nodeName.toUpperCase() ? options.elements = [options.elements] : (options.context = options.elements, options.elements = null)), elements = options.elements || pf.qsa(options.context || document, options.reevaluate || options.reselect ? pf.sel : pf.selShort), plen = elements.length) {
				for (pf.setupRun(options), alreadyRun = !0, i = 0; i < plen; i++) pf.fillImg(elements[i], options);
				pf.teardownRun(options)
			}
		};
	warn = window.console && console.warn ?
	function(message) {
		console.warn(message)
	} : noop, curSrcProp in image || (curSrcProp = "src"), types["image/jpeg"] = !0, types["image/gif"] = !0, types["image/png"] = !0, types["image/svg+xml"] = document.implementation.hasFeature("http://wwwindow.w3.org/TR/SVG11/feature#Image", "1.1"), pf.ns = ("pf" + (new Date).getTime()).substr(0, 9), pf.supSrcset = "srcset" in image, pf.supSizes = "sizes" in image, pf.supPicture = !! window.HTMLPictureElement, pf.supSrcset && pf.supPicture && !pf.supSizes && !
	function(image2) {
		image.srcset = "data:,a", image2.src = "data:,a", pf.supSrcset = image.complete === image2.complete, pf.supPicture = pf.supSrcset && pf.supPicture
	}(document.createElement("img")), pf.selShort = "picture>img,img[srcset]", pf.sel = pf.selShort, pf.cfg = cfg, pf.supSrcset && (pf.sel += ",img[" + srcsetAttr + "]"), pf.DPR = DPR || 1, pf.u = units, pf.types = types, alwaysCheckWDescriptor = pf.supSrcset && !pf.supSizes, pf.setSize = noop, pf.makeUrl = memoize(function(src) {
		return anchor.href = src, anchor.href
	}), pf.qsa = function(context, sel) {
		return context.querySelectorAll(sel)
	}, pf.matchesMedia = function() {
		return window.matchMedia && (matchMedia("(min-width: 0.1em)") || {}).matches ? pf.matchesMedia = function(media) {
			return !media || matchMedia(media).matches
		} : pf.matchesMedia = pf.mMQ, pf.matchesMedia.apply(this, arguments)
	}, pf.mMQ = function(media) {
		return !media || evalCSS(media)
	}, pf.calcLength = function(sourceSizeValue) {
		var value = evalCSS(sourceSizeValue, !0) || !1;
		return value < 0 && (value = !1), value
	}, pf.supportsType = function(type) {
		return !type || types[type]
	}, pf.parseSize = memoize(function(sourceSizeStr) {
		var match = (sourceSizeStr || "").match(regSize);
		return {
			media: match && match[1],
			length: match && match[2]
		}
	}), pf.parseSet = function(set) {
		return set.cands || (set.cands = parseSrcset(set.srcset, set)), set.cands
	}, pf.getEmValue = function() {
		var body;
		if (!eminpx && (body = document.body)) {
			var div = document.createElement("div"),
				originalHTMLCSS = docElem.style.cssText,
				originalBodyCSS = body.style.cssText;
			div.style.cssText = baseStyle, docElem.style.cssText = fsCss, body.style.cssText = fsCss, body.appendChild(div), eminpx = div.offsetWidth, body.removeChild(div), eminpx = parseFloat(eminpx, 10), docElem.style.cssText = originalHTMLCSS, body.style.cssText = originalBodyCSS
		}
		return eminpx || 16
	}, pf.calcListLength = function(sourceSizeListStr) {
		if (!(sourceSizeListStr in sizeLengthCache) || cfg.uT) {
			var winningLength = pf.calcLength(parseSizes(sourceSizeListStr));
			sizeLengthCache[sourceSizeListStr] = winningLength ? winningLength : units.width
		}
		return sizeLengthCache[sourceSizeListStr]
	}, pf.setRes = function(set) {
		var candidates;
		if (set) {
			candidates = pf.parseSet(set);
			for (var i = 0, len = candidates.length; i < len; i++) setResolution(candidates[i], set.sizes)
		}
		return candidates
	}, pf.setRes.res = setResolution, pf.applySetCandidate = function(candidates, img) {
		if (candidates.length) {
			var candidate, i, j, length, bestCandidate, curSrc, curCan, candidateSrc, abortCurSrc, imageData = img[pf.ns],
				dpr = pf.DPR;
			if (curSrc = imageData.curSrc || img[curSrcProp], curCan = imageData.curCan || setSrcToCur(img, curSrc, candidates[0].set), curCan && curCan.set === candidates[0].set && (abortCurSrc = supportAbort && !img.complete && curCan.res - .1 > dpr, abortCurSrc || (curCan.cached = !0, curCan.res >= dpr && (bestCandidate = curCan))), !bestCandidate) for (candidates.sort(ascendingSort), length = candidates.length, bestCandidate = candidates[length - 1], i = 0; i < length; i++) if (candidate = candidates[i], candidate.res >= dpr) {
				j = i - 1, bestCandidate = candidates[j] && (abortCurSrc || curSrc !== pf.makeUrl(candidate.url)) && chooseLowRes(candidates[j].res, candidate.res, dpr, candidates[j].cached) ? candidates[j] : candidate;
				break
			}
			bestCandidate && (candidateSrc = pf.makeUrl(bestCandidate.url), imageData.curSrc = candidateSrc, imageData.curCan = bestCandidate, candidateSrc !== curSrc && pf.setSrc(img, bestCandidate), pf.setSize(img))
		}
	}, pf.setSrc = function(img, bestCandidate) {
		var origWidth;
		img.src = bestCandidate.url, "image/svg+xml" === bestCandidate.set.type && (origWidth = img.style.width, img.style.width = img.offsetWidth + 1 + "px", img.offsetWidth + 1 && (img.style.width = origWidth))
	}, pf.getSet = function(img) {
		var i, set, supportsType, match = !1,
			sets = img[pf.ns].sets;
		for (i = 0; i < sets.length && !match; i++) if (set = sets[i], set.srcset && pf.matchesMedia(set.media) && (supportsType = pf.supportsType(set.type))) {
			"pending" === supportsType && (set = supportsType), match = set;
			break
		}
		return match
	}, pf.parseSets = function(element, parent, options) {
		var srcsetAttribute, imageSet, isWDescripor, srcsetParsed, hasPicture = parent && "PICTURE" === parent.nodeName.toUpperCase(),
			imageData = element[pf.ns];
		(imageData.src === undefined || options.src) && (imageData.src = getImgAttr.call(element, "src"), imageData.src ? setImgAttr.call(element, srcAttr, imageData.src) : removeImgAttr.call(element, srcAttr)), (imageData.srcset === undefined || options.srcset || !pf.supSrcset || element.srcset) && (srcsetAttribute = getImgAttr.call(element, "srcset"), imageData.srcset = srcsetAttribute, srcsetParsed = !0), imageData.sets = [], hasPicture && (imageData.pic = !0, getAllSourceElements(parent, imageData.sets)), imageData.srcset ? (imageSet = {
			srcset: imageData.srcset,
			sizes: getImgAttr.call(element, "sizes")
		}, imageData.sets.push(imageSet), isWDescripor = (alwaysCheckWDescriptor || imageData.src) && regWDesc.test(imageData.srcset || ""), isWDescripor || !imageData.src || getCandidateForSrc(imageData.src, imageSet) || imageSet.has1x || (imageSet.srcset += ", " + imageData.src, imageSet.cands.push({
			url: imageData.src,
			d: 1,
			set: imageSet
		}))) : imageData.src && imageData.sets.push({
			srcset: imageData.src,
			sizes: null
		}), imageData.curCan = null, imageData.curSrc = undefined, imageData.supported = !(hasPicture || imageSet && !pf.supSrcset || isWDescripor), srcsetParsed && pf.supSrcset && !imageData.supported && (srcsetAttribute ? (setImgAttr.call(element, srcsetAttr, srcsetAttribute), element.srcset = "") : removeImgAttr.call(element, srcsetAttr)), imageData.supported && !imageData.srcset && (!imageData.src && element.src || element.src !== pf.makeUrl(imageData.src)) && (null === imageData.src ? element.removeAttribute("src") : element.src = imageData.src), imageData.parsed = !0
	}, pf.fillImg = function(element, options) {
		var imageData, extreme = options.reselect || options.reevaluate;
		element[pf.ns] || (element[pf.ns] = {}), imageData = element[pf.ns], (extreme || imageData.evaled !== evalId) && (imageData.parsed && !options.reevaluate || pf.parseSets(element, element.parentNode, options), imageData.supported ? imageData.evaled = evalId : applyBestCandidate(element))
	}, pf.setupRun = function() {
		alreadyRun && !isVwDirty && DPR === window.devicePixelRatio || updateMetrics()
	}, pf.supPicture ? (picturefill = noop, pf.fillImg = noop) : !
	function() {
		var isDomReady, regReady = window.attachEvent ? /d$|^c/ : /d$|^c|^i/,
			run = function() {
				var readyState = document.readyState || "";
				timerId = setTimeout(run, "loading" === readyState ? 200 : 999), document.body && (pf.fillImgs(), isDomReady = isDomReady || regReady.test(readyState), isDomReady && clearTimeout(timerId))
			},
			timerId = setTimeout(run, document.body ? 9 : 99),
			debounce = function(func, wait) {
				var timeout, timestamp, later = function() {
						var last = new Date - timestamp;
						last < wait ? timeout = setTimeout(later, wait - last) : (timeout = null, func())
					};
				return function() {
					timestamp = new Date, timeout || (timeout = setTimeout(later, wait))
				}
			},
			lastClientWidth = docElem.clientHeight,
			onResize = function() {
				isVwDirty = Math.max(window.innerWidth || 0, docElem.clientWidth) !== units.width || docElem.clientHeight !== lastClientWidth, lastClientWidth = docElem.clientHeight, isVwDirty && pf.fillImgs()
			};
		on(window, "resize", debounce(onResize, 99)), on(document, "readystatechange", run)
	}(), pf.picturefill = picturefill, pf.fillImgs = picturefill, pf.teardownRun = noop, picturefill._ = pf, window.picturefillCFG = {
		pf: pf,
		push: function(args) {
			var name = args.shift();
			"function" == typeof pf[name] ? pf[name].apply(pf, args) : (cfg[name] = args[0], alreadyRun && pf.fillImgs({
				reselect: !0
			}))
		}
	};
	for (; setOptions && setOptions.length;) window.picturefillCFG.push(setOptions.shift());
	window.picturefill = picturefill, "object" == typeof module && "object" == typeof module.exports ? module.exports = picturefill : "function" == typeof define && define.amd && define("picturefill", function() {
		return picturefill
	}), pf.supPicture || (types["image/webp"] = detectTypeSupport("image/webp", "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))
}(window, document);
!
function($, f) {
	var Unslider = function() {
			function nav(name, html) {
				if ("dot" == name) {
					if (html = "", $.each(_.li, function(index) {
						html += '<li class="' + (index == _.i ? name + " active" : name) + '">' + ++index + "</li>"
					}), 0 === $(".unslider-dots .dot").length) {
						if (!($(".unslider-dots").length < 1)) return void $(".unslider-dots").append(html);
						html = '<ol class="unslider-dots">' + html + "</ol>"
					}
				} else html = '<div class="', html = html + name + 's">' + html + name + ' prev">' + _.o.prev + "</div>" + html + name + ' next">' + _.o.next + "</div></div>";
				_.el.addClass("has-" + name + "s").append(html).find("." + name).click(function() {
					var me = $(this);
					me.hasClass("dot") ? _.stop().to(me.index()) : me.hasClass("prev") ? _.prev() : _.next()
				})
			}
			var _ = this;
			_.o = {
				speed: 500,
				delay: 3e3,
				init: 0,
				pause: !f,
				loop: !f,
				keys: f,
				cover: f,
				enlarge: 1,
				dots: f,
				arrows: f,
				prev: "&larr;",
				next: "&rarr;",
				fluid: f,
				starting: f,
				complete: f,
				overlaycontent: f,
				items: ">ul",
				item: ">li",
				img: "img:not(.no-slider), video",
				easing: "swing",
				autoplay: !f,
				lazyload: !f,
				dotscontainer: f,
				onloadcallback: f
			}, _.init = function(el, _o, k, s) {
				if (_.o = $.extend(_.o, _o), _.el = el, _.ul = el.find(_.o.items), _.o.lazyload && !s) {
					var firstItem = _.ul.find(_.o.item).first(),
						firstImage = firstItem.find(_.o.img).filter("img");
					if (firstImage.hasClass("lazyload")) return void firstImage.one("load.unslider, error.unslider", function() {
						_.init(el, o, k, !0)
					})
				}
				_.max = [0 | el.outerWidth(), 0 | el.outerHeight()], _.li = _.ul.find(_.o.item).each(function(index) {
					var me = $(this),
						width = me.outerWidth() > $("body").innerWidth() ? $("body").innerWidth() : me.outerWidth(),
						height = me.outerHeight();
					width > _.max[0] && (_.max[0] = width), height > _.max[1] && (_.max[1] = height)
				}), _.li.eq(0).addClass("active");
				var o = _.o,
					ul = _.ul,
					li = _.li,
					len = li.length;
				_.i = 0;
				var h = _.o.cover ? el.parent().outerHeight() : li.first().outerHeight();
				if (el.css({
					width: _.max[0],
					height: h,
					overflow: "hidden"
				}), ul.css({
					position: "relative",
					left: 0,
					width: 100 * len + "%"
				}), o.fluid ? li.css({
					width: 100 / len + "%"
				}) : li.css({
					width: _.max[0] + "px"
				}), o.autoplay && setTimeout(function() {
					0 | o.delay && (_.play(), o.pause && el.on("mouseover mouseout", function(e) {
						_.stop(), "mouseout" == e.type && _.play()
					}))
				}, 0 | o.init), o.keys && $(document).keydown(function(e) {
					var key = e.which;
					37 == key ? _.prev() : 39 == key ? _.next() : 27 == key && _.stop()
				}), _.li.length >= 2 && (o.dots && nav("dot"), o.arrows && nav("arrow")), o.fluid && $(window).smartresize(function() {
					setTimeout(function() {
						_.resize()
					}, 0)
				}), $(window).on("orientationchange.unslider, unsliderresize.unslider", function() {
					setTimeout(function() {
						_.resize()
					}, 100)
				}), $.event.special.move || $.Event("move")) {
					var _elmts = [el];
					o.overlaycontent && _elmts.push(el.next()), $(_elmts).each(function() {
						$(this).on("movestart", function(e) {
							e.distX > e.distY && e.distX < -e.distY || e.distX < e.distY && e.distX > -e.distY ? e.preventDefault() : el.data("left", _.ul.offset().left / el.width() * 100)
						}).on("move", function(e) {
							var left = 100 * e.distX / el.width(),
								leftDelta = 100 * e.deltaX / el.width();
							_.ul[0].style.left = parseInt(_.ul[0].style.left.replace("%", "")) + leftDelta + "%", _.ul.data("left", left)
						}).on("moveend", function(e) {
							var left = _.ul.data("left");
							if (Math.abs(left) > 30) {
								var i = left > 0 ? _.i - 1 : _.i + 1;
								(i < 0 || i >= len) && (i = _.i), _.to(i)
							} else _.to(_.i)
						})
					})
				}
				_.resize(), _.el.data(k, _).data("key", k), "function" == typeof _.o.onloadcallback && _.o.onloadcallback.call()
			}, _.resize = function(prepareNext, index) {
				prepareNext = "undefined" != typeof prepareNext && prepareNext, _.o.cover && _.el.width() <= 1 && _.el.css("width", "100%");
				var styl = {},
					width = _.el.outerWidth();
				_.ul.css(styl), styl.width = Math.min(Math.round(width / _.el.parent().width() * 100), 100) + "%", _.el.css(styl), _.li.css({
					width: width + "px"
				});
				var slideIndex = prepareNext ? index : _.i;
				styl.height = _.o.cover ? _.el.parent().outerHeight() : _.li.eq(slideIndex).find(_.o.img).outerHeight(), _.ul.css({
					height: styl.height
				}), _.el.css(styl), _.o.cover && (_.cover(_.li.eq(slideIndex), styl, width), _.cover(_.li.eq(slideIndex + 1), styl, width))
			}, _.cover = function(li, style, width) {
				if (li) {
					var _l = li,
						_i = _l.find(_.o.img);
					_i.each(function() {
						$_i = $(this), $_i.css({
							width: "",
							height: "",
							marginLeft: "",
							marginRight: ""
						});
						var _iW = $_i.width(),
							_iH = $_i.height(),
							_cW = "none" == _.el.css("max-width") ? width : parseInt(_.el.css("max-width"));
						_cH = "none" == _.el.css("max-height") ? style.height : parseInt(_.el.css("max-height"));
						var _rw = _cW / _iW,
							_rh = _cH / _iH,
							_r = _rw > _rh ? _rw : _rh;
						_iW *= _r, _iH *= _r, _rw > _rh ? (_iMT = (_iH - _cH) / 2, _iMT > 0 && ($_i.css({
							marginTop: _iMT * -1,
							marginLeft: 0
						}), _.o.enlarge > 1 && (_mt = _iMT * -1 + (_iH * _.o.enlarge - _iH) / 2 * -1, _ml = (_iW * _.o.enlarge - _iW) / 2 * -1, $_i.css({
							marginTop: _mt,
							marginLeft: _ml
						})))) : (_iML = (_iW - _cW) / 2, _iML > 0 && ($_i.css({
							marginLeft: _iML * -1,
							marginTop: 0
						}), _.o.enlarge > 1 && (_mt = (_iH * _.o.enlarge - _iH) / 2 * -1, _ml = _iML * -1 + (_iW * _.o.enlarge - _iW) / 2 * -1, $_i.css({
							marginTop: _mt,
							marginLeft: _ml
						})))), $_i.css({
							width: _iW * _.o.enlarge,
							height: _iH * _.o.enlarge
						}), _i[0] && window.getComputedStyle(_i[0]).marginTop
					})
				}
			}, _.to = function(index, callback) {
				_.t && (_.stop(), _.play());
				var o = _.o,
					el = _.el,
					ul = _.ul,
					li = _.li,
					current = _.i,
					target = li.eq(index);
				if ($.isFunction(o.starting) && !callback && o.starting(el, li.eq(current)), target.length && !(index < 0) || o.loop != f) {
					target.length || (index = 0), index < 0 && (index = li.length - 1), li.removeClass("active"), target = li.eq(index).addClass("active");
					var speed = callback ? 5 : 0 | o.speed,
						easing = o.easing;
					({
						height: target.outerHeight()
					});
					ul.queue("fx").length || (el.find(".dot").eq(index).addClass("active").siblings().removeClass("active"), ul.animate({
						left: "-" + index + "00%"
					}, speed, easing, function(data) {
						_.i = index, $.isFunction(o.complete) && !callback && o.complete(el, target)
					})), _.resize(!0, index)
				}
			}, _.play = function() {
				_.t = setInterval(function() {
					_.to(_.i + 1)
				}, 0 | _.o.delay)
			}, _.stop = function() {
				return _.t = clearInterval(_.t), _
			}, _.next = function() {
				return _.stop().to(_.i + 1)
			}, _.prev = function() {
				return _.stop().to(_.i - 1)
			}
		};
	$.fn.unslider = function(_o) {
		var len = this.length;
		return this.each(function(index) {
			var me = $(this),
				key = "unslider" + (len > 1 ? "-" + ++index : "");
			(new Unslider).init(me, _o, key, !1)
		})
	}, Unslider.version = "1.0.0"
}(jQuery, !1);
$(document).ready(function() {
	function showHideBrowserMessage() {
		$("#update-browser-message-container").is(":hidden") ? ($("#update-browser-message-container").show(), $("#dashboard").addClass("with-update-browser-message"), ICA.legacy.setCookie("icase_old_browser_check", "1")) : ($("#dashboard").removeClass("with-update-browser-message"), $("#update-browser-message-container").hide())
	}
	function isOldBrowser() {
		var msVersion = navigator.userAgent.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/),
			msie = !! msVersion,
			oldIE = msie && parseFloat(msVersion[1]) < 11;
		return oldIE
	}
	function displayOldBrowserMessage() {
		return !(null != ICA.legacy.getCookie("icase_old_browser_check") && "" != ICA.legacy.getCookie("icase_old_browser_check") || $("#loginTopBarIsValid").length > 0)
	}
	function getUrlParams() {
		var params = {};
		return window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) {
			params[key] = value
		}), params
	}
	function manageBrowserMessage() {
		if (isOldBrowser() && displayOldBrowserMessage()) {
			var params = getUrlParams();
			void 0 != params.idkeep && "undefined" != params.idkeep && "True" == params.idkeep ? $("#update-browser-message-container").hide() : showHideBrowserMessage()
		} else $("#update-browser-message-container").hide()
	}
	$("#update-browser-message-icon").click(function(e) {
		showHideBrowserMessage()
	}), $("#update-browser-message-container").click(function(e) {
		e.stopPropagation()
	}), window.setTimeout(function() {
		$("#update-browser-message-container") && manageBrowserMessage()
	}, 0)
});
!
function($) {
	"use strict";
	var newsletter = {
		NewsLetterForm: function() {
			var newsletterform = {
				obj: $(this),
				submit: function() {
					var email, storeId = $("#news-letter-store-id", newsletterform.obj).val();
					email = $("#news_email").length ? $("#news_email").val() : $("#customer-email").text(), ICA.legacy.customer.storeSubscribe(storeId, email, newsletterform.success, newsletterform.error)
				},
				success: function(data) {
					if (data) {
						var message;
						data.ActivatePush && data.RequestSuccess ? window.location.href = $("#confirmationlink").attr("href") : (data.message ? message = data.message : data.ResponseMessage && data.ResponseMessageBody ? message = "<h2>" + data.ResponseMessage + "</h2>" + data.ResponseMessageBody : (data.ResponseMessage || data.ResponseMessageBody) && (message = data.ResponseMessage ? data.ResponseMessage : data.ResponseMessageBody), message && (data.success || data.RequestSuccess || (message = '<span class="red">' + message + "</span>"), window.triggerAsModal(message, "dialog")))
					}
					newsletterform.obj.trigger("done").trigger("clearform")
				},
				error: function(data) {
					window.triggerAsModal(data.ResponseMessage, "dialog"), newsletterform.obj.trigger("done").trigger("clearform")
				},
				init: function() {
					newsletterform.obj.on("ajaxsubmit", newsletterform.submit)
				}
			};
			return newsletterform.init()
		},
		init: function(e) {
			$(".store-news-letter", e.target).create(newsletter.NewsLetterForm)
		}
	};
	$(document).ready(function() {
		$(window).on("initDom", function(e) {
			$(e.target).is(document) && newsletter.init(e)
		})
	})
}(jQuery);
$(function() {
	$(this).trigger("initDom")
});
var ICA = ICA || {};
ICA.eventTarget = ICA.eventTarget || $("body"), $(function() {
	ICA.icaCallbacks.initUnslider({
		speed: 500,
		delay: 1e4,
		complete: function() {},
		keys: !0,
		dots: !0,
		fluid: !0
	}), ICA.icaCallbacks.attachLazyLoadEvent(), ICA.icaCallbacks.activateMovingContent(), $("input, textarea").placeholder(), $(window).smartresize(function() {
		ICA.icaCallbacks.truncate()
	}).resize(), $(window).on("load", function() {
		$("html").addClass("document-loaded")
	})
}), window.lazySizesConfig = window.lazySizesConfig || {}, window.lazySizesConfig.preloadAfterLoad = !0, window.lazySizesConfig.loadMode = 3, document.addEventListener("load", function() {
	var onLoad = function() {
			$(this).closest(".image-slider").length > 0 && $(window).trigger("unsliderresize"), ICA.icaCallbacks.removeLazyHide($(this)), $(this).closest(".parallax").length > 0 && (ICA.icaCallbacks.updateParallaxContainer(), ICA.icaCallbacks.parallaxInitalOffset())
		};
	return function(e) {
		$(e.target).filter(".lazyNoscriptActive").each(onLoad)
	}
}(), !0), $(function() {
	if ($.srSmoothscroll) {
		var platform = navigator.platform.toLowerCase();
		0 != platform.indexOf("win") && 0 != platform.indexOf("linux") || $.browser.webkit && $.srSmoothscroll({
			step: 40,
			speed: 100,
			ease: "linear"
		})
	}
});
Handlebars.getTemplate = function(path) {
	return void 0 !== Handlebars.templates && void 0 !== Handlebars.templates[path] || $.ajax({
		url: path,
		async: !1,
		cache: !1
	}).done(function(data) {
		void 0 === Handlebars.templates && (Handlebars.templates = {}), Handlebars.templates[path] = Handlebars.compile(data)
	}).fail(function() {
		console.error("Cannot load template:" + path)
	}), Handlebars.templates && Handlebars.templates[path] ? Handlebars.templates[path] : ""
};
!
function() {
	"use strict";
	function _render(element, html, replace, append) {
		var $html = $($.parseHTML(html));
		return element && (replace ? $(element).replaceWith($html) : append ? $(element).append($html) : $(element).html($html)), $html
	}
	function injectLocale(data) {
		return $.extend(!0, data, {
			Locale: ICA.Services.Locale
		}), data
	}
	var tplCache = [];
	Handlebars.compileTemplate = function(template, data) {
		var template = Handlebars.getTemplate(template);
		return template ? template(injectLocale(data)) : ""
	}, Handlebars.render = function(element, template, data, replace, append) {
		"undefined" != typeof tplCache[template] && "" !== tplCache[template] || (tplCache[template] = Handlebars.getTemplate(template));
		var html = tplCache[template] ? tplCache[template](injectLocale(data)) : "";
		return _render(element, html, replace, append)
	}, Handlebars.renderInline = function(element, template, data, replace) {
		var template = Handlebars.compile(template),
			html = template ? template(injectLocale(data)) : "";
		return _render(element, html, replace)
	}
}();
Handlebars.registerHelper("JSON2string", function(object) {
	"use strict";
	return JSON.stringify(object)
}), Handlebars.registerHelper("srcAttr", function(src) {
	"use strict";
	return src ? 'src="' + src + '"' : ""
}), Handlebars.registerHelper("hrefAttr", function(url) {
	"use strict";
	return url ? 'href="' + url + '"' : ""
}), Handlebars.registerHelper({
	eq: function(v1, v2) {
		"use strict";
		return v1 === v2
	},
	ne: function(v1, v2) {
		"use strict";
		return v1 !== v2
	},
	lt: function(v1, v2) {
		"use strict";
		return v1 < v2
	},
	gt: function(v1, v2) {
		"use strict";
		return v1 > v2
	},
	lte: function(v1, v2) {
		"use strict";
		return v1 <= v2
	},
	gte: function(v1, v2) {
		"use strict";
		return v1 >= v2
	},
	and: function(v1, v2) {
		"use strict";
		return v1 && v2
	},
	or: function(v1, v2) {
		"use strict";
		return v1 || v2
	}
});
!
function() {
	"use strict";
	function dec2Frac(num) {
		var whole = Math.floor(num),
			num = num - whole,
			top = num.toString().replace(/\d+[.]/, ""),
			bot = Math.pow(10, top.length);
		if (num > 0) {
			for (var closest, x = gcd(top, bot), base = bot / top, i = 1; i < 5; i++)(!closest || Math.abs(num - i / Math.round(base * i)) < closest) && (closest = Math.abs(num - i / Math.round(base * i)), top = i, bot = Math.round(base * i));
			x = gcd(top, bot)
		}
		var result = (whole > 0 ? whole : "") + (bot / x > 1 && whole > 0 ? " " : "") + (bot / x > 1 ? top / x + "/" + bot / x : "");
		return "" != result ? result : Math.round(10 * num) / 10
	}
	function gcd(a, b) {
		return b ? gcd(b, a % b) : a
	}
	Handlebars.registerHelper("Fractions", function(value) {
		return dec2Frac(value.toFixed(5))
	})
}();
!
function(root, factory) {
	"function" == typeof define && define.amd ? define("bloodhound", ["jquery"], function(a0) {
		return root.Bloodhound = factory(a0)
	}) : "object" == typeof exports ? module.exports = factory(require("jquery")) : root.Bloodhound = factory(jQuery)
}(this, function($) {
	var _ = function() {
			"use strict";
			return {
				isMsie: function() {
					return !!/(msie|trident)/i.test(navigator.userAgent) && navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]
				},
				isBlankString: function(str) {
					return !str || /^\s*$/.test(str)
				},
				escapeRegExChars: function(str) {
					return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
				},
				isString: function(obj) {
					return "string" == typeof obj
				},
				isNumber: function(obj) {
					return "number" == typeof obj
				},
				isArray: $.isArray,
				isFunction: $.isFunction,
				isObject: $.isPlainObject,
				isUndefined: function(obj) {
					return "undefined" == typeof obj
				},
				isElement: function(obj) {
					return !(!obj || 1 !== obj.nodeType)
				},
				isJQuery: function(obj) {
					return obj instanceof $
				},
				toStr: function(s) {
					return _.isUndefined(s) || null === s ? "" : s + ""
				},
				bind: $.proxy,
				each: function(collection, cb) {
					function reverseArgs(index, value) {
						return cb(value, index)
					}
					$.each(collection, reverseArgs)
				},
				map: $.map,
				filter: $.grep,
				every: function(obj, test) {
					var result = !0;
					return obj ? ($.each(obj, function(key, val) {
						if (!(result = test.call(null, val, key, obj))) return !1
					}), !! result) : result
				},
				some: function(obj, test) {
					var result = !1;
					return obj ? ($.each(obj, function(key, val) {
						if (result = test.call(null, val, key, obj)) return !1
					}), !! result) : result
				},
				mixin: $.extend,
				identity: function(x) {
					return x
				},
				clone: function(obj) {
					return $.extend(!0, {}, obj)
				},
				getIdGenerator: function() {
					var counter = 0;
					return function() {
						return counter++
					}
				},
				templatify: function(obj) {
					function template() {
						return String(obj)
					}
					return $.isFunction(obj) ? obj : template
				},
				defer: function(fn) {
					setTimeout(fn, 0)
				},
				debounce: function(func, wait, immediate) {
					var timeout, result;
					return function() {
						var later, callNow, context = this,
							args = arguments;
						return later = function() {
							timeout = null, immediate || (result = func.apply(context, args))
						}, callNow = immediate && !timeout, clearTimeout(timeout), timeout = setTimeout(later, wait), callNow && (result = func.apply(context, args)), result
					}
				},
				throttle: function(func, wait) {
					var context, args, timeout, result, previous, later;
					return previous = 0, later = function() {
						previous = new Date, timeout = null, result = func.apply(context, args)
					}, function() {
						var now = new Date,
							remaining = wait - (now - previous);
						return context = this, args = arguments, remaining <= 0 ? (clearTimeout(timeout), timeout = null, previous = now, result = func.apply(context, args)) : timeout || (timeout = setTimeout(later, remaining)), result
					}
				},
				stringify: function(val) {
					return _.isString(val) ? val : JSON.stringify(val)
				},
				noop: function() {}
			}
		}(),
		VERSION = "0.11.1",
		tokenizers = function() {
			"use strict";
			function whitespace(str) {
				return str = _.toStr(str), str ? str.split(/\s+/) : []
			}
			function nonword(str) {
				return str = _.toStr(str), str ? str.split(/\W+/) : []
			}
			function getObjTokenizer(tokenizer) {
				return function(keys) {
					return keys = _.isArray(keys) ? keys : [].slice.call(arguments, 0), function(o) {
						var tokens = [];
						return _.each(keys, function(k) {
							tokens = tokens.concat(tokenizer(_.toStr(o[k])))
						}), tokens
					}
				}
			}
			return {
				nonword: nonword,
				whitespace: whitespace,
				obj: {
					nonword: getObjTokenizer(nonword),
					whitespace: getObjTokenizer(whitespace)
				}
			}
		}(),
		LruCache = function() {
			"use strict";
			function LruCache(maxSize) {
				this.maxSize = _.isNumber(maxSize) ? maxSize : 100, this.reset(), this.maxSize <= 0 && (this.set = this.get = $.noop)
			}
			function List() {
				this.head = this.tail = null
			}
			function Node(key, val) {
				this.key = key, this.val = val, this.prev = this.next = null
			}
			return _.mixin(LruCache.prototype, {
				set: function(key, val) {
					var node, tailItem = this.list.tail;
					this.size >= this.maxSize && (this.list.remove(tailItem), delete this.hash[tailItem.key], this.size--), (node = this.hash[key]) ? (node.val = val, this.list.moveToFront(node)) : (node = new Node(key, val), this.list.add(node), this.hash[key] = node, this.size++)
				},
				get: function(key) {
					var node = this.hash[key];
					if (node) return this.list.moveToFront(node), node.val
				},
				reset: function() {
					this.size = 0, this.hash = {}, this.list = new List
				}
			}), _.mixin(List.prototype, {
				add: function(node) {
					this.head && (node.next = this.head, this.head.prev = node), this.head = node, this.tail = this.tail || node
				},
				remove: function(node) {
					node.prev ? node.prev.next = node.next : this.head = node.next, node.next ? node.next.prev = node.prev : this.tail = node.prev
				},
				moveToFront: function(node) {
					this.remove(node), this.add(node)
				}
			}), LruCache
		}(),
		PersistentStorage = function() {
			"use strict";
			function PersistentStorage(namespace, override) {
				this.prefix = ["__", namespace, "__"].join(""), this.ttlKey = "__ttl__", this.keyMatcher = new RegExp("^" + _.escapeRegExChars(this.prefix)), this.ls = override || LOCAL_STORAGE, !this.ls && this._noop()
			}
			function now() {
				return (new Date).getTime()
			}
			function encode(val) {
				return JSON.stringify(_.isUndefined(val) ? null : val)
			}
			function decode(val) {
				return $.parseJSON(val)
			}
			function gatherMatchingKeys(keyMatcher) {
				var i, key, keys = [],
					len = LOCAL_STORAGE.length;
				for (i = 0; i < len; i++)(key = LOCAL_STORAGE.key(i)).match(keyMatcher) && keys.push(key.replace(keyMatcher, ""));
				return keys
			}
			var LOCAL_STORAGE;
			try {
				LOCAL_STORAGE = window.localStorage, LOCAL_STORAGE.setItem("~~~", "!"), LOCAL_STORAGE.removeItem("~~~")
			} catch (err) {
				LOCAL_STORAGE = null
			}
			return _.mixin(PersistentStorage.prototype, {
				_prefix: function(key) {
					return this.prefix + key
				},
				_ttlKey: function(key) {
					return this._prefix(key) + this.ttlKey
				},
				_noop: function() {
					this.get = this.set = this.remove = this.clear = this.isExpired = _.noop
				},
				_safeSet: function(key, val) {
					try {
						this.ls.setItem(key, val)
					} catch (err) {
						"QuotaExceededError" === err.name && (this.clear(), this._noop())
					}
				},
				get: function(key) {
					return this.isExpired(key) && this.remove(key), decode(this.ls.getItem(this._prefix(key)))
				},
				set: function(key, val, ttl) {
					return _.isNumber(ttl) ? this._safeSet(this._ttlKey(key), encode(now() + ttl)) : this.ls.removeItem(this._ttlKey(key)), this._safeSet(this._prefix(key), encode(val))
				},
				remove: function(key) {
					return this.ls.removeItem(this._ttlKey(key)), this.ls.removeItem(this._prefix(key)), this
				},
				clear: function() {
					var i, keys = gatherMatchingKeys(this.keyMatcher);
					for (i = keys.length; i--;) this.remove(keys[i]);
					return this
				},
				isExpired: function(key) {
					var ttl = decode(this.ls.getItem(this._ttlKey(key)));
					return !!(_.isNumber(ttl) && now() > ttl)
				}
			}), PersistentStorage
		}(),
		Transport = function() {
			"use strict";
			function Transport(o) {
				o = o || {}, this.cancelled = !1, this.lastReq = null, this._send = o.transport, this._get = o.limiter ? o.limiter(this._get) : this._get, this._cache = o.cache === !1 ? new LruCache(0) : sharedCache
			}
			var pendingRequestsCount = 0,
				pendingRequests = {},
				maxPendingRequests = 6,
				sharedCache = new LruCache(10);
			return Transport.setMaxPendingRequests = function(num) {
				maxPendingRequests = num
			}, Transport.resetCache = function() {
				sharedCache.reset()
			}, _.mixin(Transport.prototype, {
				_fingerprint: function(o) {
					return o = o || {}, o.url + o.type + $.param(o.data || {})
				},
				_get: function(o, cb) {
					function done(resp) {
						cb(null, resp), that._cache.set(fingerprint, resp)
					}
					function fail() {
						cb(!0)
					}
					function always() {
						pendingRequestsCount--, delete pendingRequests[fingerprint], that.onDeckRequestArgs && (that._get.apply(that, that.onDeckRequestArgs), that.onDeckRequestArgs = null)
					}
					var fingerprint, jqXhr, that = this;
					fingerprint = this._fingerprint(o), this.cancelled || fingerprint !== this.lastReq || ((jqXhr = pendingRequests[fingerprint]) ? jqXhr.done(done).fail(fail) : pendingRequestsCount < maxPendingRequests ? (pendingRequestsCount++, pendingRequests[fingerprint] = this._send(o).done(done).fail(fail).always(always)) : this.onDeckRequestArgs = [].slice.call(arguments, 0))
				},
				get: function(o, cb) {
					var resp, fingerprint;
					cb = cb || $.noop, o = _.isString(o) ? {
						url: o
					} : o || {}, fingerprint = this._fingerprint(o), this.cancelled = !1, this.lastReq = fingerprint, (resp = this._cache.get(fingerprint)) ? cb(null, resp) : this._get(o, cb)
				},
				cancel: function() {
					this.cancelled = !0
				}
			}), Transport
		}(),
		SearchIndex = window.SearchIndex = function() {
			"use strict";
			function SearchIndex(o) {
				o = o || {}, o.datumTokenizer && o.queryTokenizer || $.error("datumTokenizer and queryTokenizer are both required"), this.identify = o.identify || _.stringify, this.datumTokenizer = o.datumTokenizer, this.queryTokenizer = o.queryTokenizer, this.weightFunction = o.weightFunction, this.tiebreakParam = o.tiebreakParam, this.reset()
			}
			function normalizeTokens(tokens) {
				return tokens = _.filter(tokens, function(token) {
					return !!token
				}), tokens = _.map(tokens, function(token) {
					return token.toLowerCase()
				})
			}
			function newNode() {
				var node = {};
				return node[IDS] = [], node[CHILDREN] = {}, node
			}
			function unique(array) {
				for (var seen = {}, uniques = [], i = 0, len = array.length; i < len; i++) seen[array[i]] || (seen[array[i]] = !0, uniques.push(array[i]));
				return uniques
			}
			function getIntersection(arrayA, arrayB) {
				return arrayA.filter(function(n) {
					return arrayB.indexOf(n) !== -1
				}).reverse()
			}
			var CHILDREN = "c",
				IDS = "i";
			return _.mixin(SearchIndex.prototype, {
				bootstrap: function(o) {
					this.datums = o.datums, this.trie = o.trie
				},
				add: function(data) {
					var that = this;
					data = _.isArray(data) ? data : [data], _.each(data, function(datum) {
						var id, tokens;
						that.datums[id = that.identify(datum)] = datum, tokens = normalizeTokens(that.datumTokenizer(datum)), _.each(tokens, function(token) {
							var node, chars, ch;
							for (node = that.trie, chars = token.split(""); ch = chars.shift();) node = node[CHILDREN][ch] || (node[CHILDREN][ch] = newNode()), node[IDS].push(id)
						})
					})
				},
				get: function(ids) {
					var that = this;
					return _.map(ids, function(id) {
						return that.datums[id]
					})
				},
				search: function(query) {
					var tokens, matches, that = this;
					tokens = normalizeTokens(this.queryTokenizer(query)), _.each(tokens, function(token) {
						var node, chars, ch, ids;
						if (matches && 0 === matches.length) return !1;
						for (node = that.trie, chars = token.split(""); node && (ch = chars.shift());) node = node[CHILDREN][ch];
						return node && 0 === chars.length ? (ids = node[IDS].slice(0), void(matches = matches ? getIntersection(matches, ids) : ids)) : (matches = [], !1)
					});
					var searchResult = matches ? _.map(unique(matches), function(id) {
						return that.datums[id]
					}) : [];
					return 0 === searchResult.length ? searchResult : (this.weightFunction && (searchResult.forEach(function(d) {
						"object" == typeof d && (d.__sortIndex = that.weightFunction(d, tokens))
					}), searchResult.sort(function(a, b) {
						var tiebreak = 0;
						return that.tiebreakParam && (tiebreak = b[that.tiebreakParam] > a[that.tiebreakParam] ? -1 : 1), b.__sortIndex - a.__sortIndex + tiebreak
					})), searchResult)
				},
				all: function() {
					var values = [];
					for (var key in this.datums) values.push(this.datums[key]);
					return values
				},
				reset: function() {
					this.datums = {}, this.trie = newNode()
				},
				serialize: function() {
					return {
						datums: this.datums,
						trie: this.trie
					}
				}
			}), SearchIndex
		}(),
		Prefetch = function() {
			"use strict";
			function Prefetch(o) {
				this.url = o.url, this.ttl = o.ttl, this.cache = o.cache, this.prepare = o.prepare, this.transform = o.transform, this.transport = o.transport, this.thumbprint = o.thumbprint, this.storage = new PersistentStorage(o.cacheKey)
			}
			var keys;
			return keys = {
				data: "data",
				protocol: "protocol",
				thumbprint: "thumbprint"
			}, _.mixin(Prefetch.prototype, {
				_settings: function() {
					return {
						url: this.url,
						type: "GET",
						dataType: "json"
					}
				},
				store: function(data) {
					this.cache && (this.storage.set(keys.data, data, this.ttl), this.storage.set(keys.protocol, location.protocol, this.ttl), this.storage.set(keys.thumbprint, this.thumbprint, this.ttl))
				},
				fromCache: function() {
					var isExpired, stored = {};
					return this.cache ? (stored.data = this.storage.get(keys.data), stored.protocol = this.storage.get(keys.protocol), stored.thumbprint = this.storage.get(keys.thumbprint), isExpired = stored.thumbprint !== this.thumbprint || stored.protocol !== location.protocol, stored.data && !isExpired ? stored.data : null) : null
				},
				fromNetwork: function(cb) {
					function onError() {
						cb(!0)
					}
					function onResponse(resp) {
						cb(null, that.transform(resp))
					}
					var settings, that = this;
					cb && (settings = this.prepare(this._settings()), this.transport(settings).fail(onError).done(onResponse))
				},
				clear: function() {
					return this.storage.clear(), this
				}
			}), Prefetch
		}(),
		Remote = function() {
			"use strict";
			function Remote(o) {
				this.url = o.url, this.prepare = o.prepare, this.transform = o.transform, this.transport = new Transport({
					cache: o.cache,
					limiter: o.limiter,
					transport: o.transport
				})
			}
			return _.mixin(Remote.prototype, {
				_settings: function() {
					return {
						url: this.url,
						type: "GET",
						dataType: "json"
					}
				},
				get: function(query, cb) {
					function onResponse(err, resp) {
						cb(err ? [] : that.transform(resp))
					}
					var settings, that = this;
					if (cb) return query = query || "", settings = this.prepare(query, this._settings()), this.transport.get(settings, onResponse)
				},
				cancelLastRequest: function() {
					this.transport.cancel()
				}
			}), Remote
		}(),
		oParser = function() {
			"use strict";
			function parsePrefetch(o) {
				var defaults;
				return o ? (defaults = {
					url: null,
					ttl: 864e5,
					cache: !0,
					cacheKey: null,
					thumbprint: "",
					prepare: _.identity,
					transform: _.identity,
					transport: null
				}, o = _.isString(o) ? {
					url: o
				} : o, o = _.mixin(defaults, o), !o.url && $.error("prefetch requires url to be set"), o.transform = o.filter || o.transform, o.cacheKey = o.cacheKey || o.url, o.thumbprint = VERSION + o.thumbprint, o.transport = o.transport ? callbackToDeferred(o.transport) : $.ajax, o) : null
			}
			function parseRemote(o) {
				var defaults;
				if (o) return defaults = {
					url: null,
					cache: !0,
					prepare: null,
					replace: null,
					wildcard: null,
					limiter: null,
					rateLimitBy: "debounce",
					rateLimitWait: 300,
					transform: _.identity,
					transport: null
				}, o = _.isString(o) ? {
					url: o
				} : o, o = _.mixin(defaults, o), !o.url && $.error("remote requires url to be set"), o.transform = o.filter || o.transform, o.prepare = toRemotePrepare(o), o.limiter = toLimiter(o), o.transport = o.transport ? callbackToDeferred(o.transport) : $.ajax, delete o.replace, delete o.wildcard, delete o.rateLimitBy, delete o.rateLimitWait, o
			}
			function toRemotePrepare(o) {
				function prepareByReplace(query, settings) {
					return settings.url = replace(settings.url, query), settings
				}
				function prepareByWildcard(query, settings) {
					return settings.url = settings.url.replace(wildcard, encodeURIComponent(query)), settings
				}
				function idenityPrepare(query, settings) {
					return settings
				}
				var prepare, replace, wildcard;
				return prepare = o.prepare, replace = o.replace, wildcard = o.wildcard, prepare ? prepare : prepare = replace ? prepareByReplace : o.wildcard ? prepareByWildcard : idenityPrepare
			}
			function toLimiter(o) {
				function debounce(wait) {
					return function(fn) {
						return _.debounce(fn, wait)
					}
				}
				function throttle(wait) {
					return function(fn) {
						return _.throttle(fn, wait)
					}
				}
				var limiter, method, wait;
				return limiter = o.limiter, method = o.rateLimitBy, wait = o.rateLimitWait, limiter || (limiter = /^throttle$/i.test(method) ? throttle(wait) : debounce(wait)), limiter
			}
			function callbackToDeferred(fn) {
				return function(o) {
					function onSuccess(resp) {
						_.defer(function() {
							deferred.resolve(resp)
						})
					}
					function onError(err) {
						_.defer(function() {
							deferred.reject(err)
						})
					}
					var deferred = $.Deferred();
					return fn(o, onSuccess, onError), deferred
				}
			}
			return function(o) {
				var defaults, sorter;
				return defaults = {
					initialize: !0,
					identify: _.stringify,
					datumTokenizer: null,
					queryTokenizer: null,
					sufficient: 5,
					sorter: null,
					local: [],
					prefetch: null,
					remote: null
				}, o = _.mixin(defaults, o || {}), !o.datumTokenizer && $.error("datumTokenizer is required"), !o.queryTokenizer && $.error("queryTokenizer is required"), sorter = o.sorter, o.sorter = sorter ?
				function(x) {
					return x.sort(sorter)
				} : _.identity, o.local = _.isFunction(o.local) ? o.local() : o.local, o.prefetch = parsePrefetch(o.prefetch), o.remote = parseRemote(o.remote), o
			}
		}(),
		Bloodhound = function() {
			"use strict";
			function Bloodhound(o) {
				o = oParser(o), this.sorter = o.sorter, this.identify = o.identify, this.sufficient = o.sufficient, this.local = o.local, this.remote = o.remote ? new Remote(o.remote) : null, this.prefetch = o.prefetch ? new Prefetch(o.prefetch) : null, this.index = new SearchIndex({
					identify: this.identify,
					datumTokenizer: o.datumTokenizer,
					queryTokenizer: o.queryTokenizer,
					weightFunction: o.weightFunction,
					tiebreakParam: o.tiebreakParam
				}), o.initialize !== !1 && this.initialize()
			}
			var old;
			return old = window && window.Bloodhound, Bloodhound.noConflict = function() {
				return window && (window.Bloodhound = old), Bloodhound
			}, Bloodhound.tokenizers = tokenizers, _.mixin(Bloodhound.prototype, {
				__ttAdapter: function() {
					function withAsync(query, sync, async) {
						return that.search(query, sync, async)
					}
					function withoutAsync(query, sync) {
						return that.search(query, sync)
					}
					var that = this;
					return this.remote ? withAsync : withoutAsync
				},
				_loadPrefetch: function() {
					function done(err, data) {
						return err ? deferred.reject() : (that.add(data), that.prefetch.store(that.index.serialize()), void deferred.resolve())
					}
					var deferred, serialized, that = this;
					return deferred = $.Deferred(), this.prefetch ? (serialized = this.prefetch.fromCache()) ? (this.index.bootstrap(serialized), deferred.resolve()) : this.prefetch.fromNetwork(done) : deferred.resolve(), deferred.promise()
				},
				_initialize: function() {
					function addLocalToIndex() {
						that.add(that.local)
					}
					var that = this;
					return this.clear(), (this.initPromise = this._loadPrefetch()).done(addLocalToIndex), this.initPromise
				},
				initialize: function(force) {
					return !this.initPromise || force ? this._initialize() : this.initPromise
				},
				add: function(data) {
					return this.index.add(data), this
				},
				get: function(ids) {
					return ids = _.isArray(ids) ? ids : [].slice.call(arguments), this.index.get(ids)
				},
				search: function(query, sync, async) {
					function processRemote(remote) {
						var nonDuplicates = [];
						_.each(remote, function(r) {
							!_.some(local, function(l) {
								return that.identify(r) === that.identify(l)
							}) && nonDuplicates.push(r)
						}), async && async(nonDuplicates)
					}
					var local, that = this;
					return local = this.sorter(this.index.search(query)), sync(this.remote ? local.slice() : local), this.remote && local.length < this.sufficient ? this.remote.get(query, processRemote) : this.remote && this.remote.cancelLastRequest(), this
				},
				all: function() {
					return this.index.all()
				},
				clear: function() {
					return this.index.reset(), this
				},
				clearPrefetchCache: function() {
					return this.prefetch && this.prefetch.clear(), this
				},
				clearRemoteCache: function() {
					return Transport.resetCache(), this
				},
				ttAdapter: function() {
					return this.__ttAdapter()
				}
			}), Bloodhound
		}();
	return Bloodhound
}), function(root, factory) {
	"function" == typeof define && define.amd ? define("typeahead.js", ["jquery"], function(a0) {
		return factory(a0)
	}) : "object" == typeof exports ? module.exports = factory(require("jquery")) : factory(jQuery)
}(this, function($) {
	var _ = function() {
			"use strict";
			return {
				isMsie: function() {
					return !!/(msie|trident)/i.test(navigator.userAgent) && navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]
				},
				isBlankString: function(str) {
					return !str || /^\s*$/.test(str)
				},
				escapeRegExChars: function(str) {
					return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
				},
				isString: function(obj) {
					return "string" == typeof obj
				},
				isNumber: function(obj) {
					return "number" == typeof obj
				},
				isArray: $.isArray,
				isFunction: $.isFunction,
				isObject: $.isPlainObject,
				isUndefined: function(obj) {
					return "undefined" == typeof obj
				},
				isElement: function(obj) {
					return !(!obj || 1 !== obj.nodeType)
				},
				isJQuery: function(obj) {
					return obj instanceof $
				},
				toStr: function(s) {
					return _.isUndefined(s) || null === s ? "" : s + ""
				},
				bind: $.proxy,
				each: function(collection, cb) {
					function reverseArgs(index, value) {
						return cb(value, index)
					}
					$.each(collection, reverseArgs)
				},
				map: $.map,
				filter: $.grep,
				every: function(obj, test) {
					var result = !0;
					return obj ? ($.each(obj, function(key, val) {
						if (!(result = test.call(null, val, key, obj))) return !1
					}), !! result) : result
				},
				some: function(obj, test) {
					var result = !1;
					return obj ? ($.each(obj, function(key, val) {
						if (result = test.call(null, val, key, obj)) return !1
					}), !! result) : result
				},
				mixin: $.extend,
				identity: function(x) {
					return x
				},
				clone: function(obj) {
					return $.extend(!0, {}, obj)
				},
				getIdGenerator: function() {
					var counter = 0;
					return function() {
						return counter++
					}
				},
				templatify: function(obj) {
					function template() {
						return String(obj)
					}
					return $.isFunction(obj) ? obj : template
				},
				defer: function(fn) {
					setTimeout(fn, 0)
				},
				debounce: function(func, wait, immediate) {
					var timeout, result;
					return function() {
						var later, callNow, context = this,
							args = arguments;
						return later = function() {
							timeout = null, immediate || (result = func.apply(context, args))
						}, callNow = immediate && !timeout, clearTimeout(timeout), timeout = setTimeout(later, wait), callNow && (result = func.apply(context, args)), result
					}
				},
				throttle: function(func, wait) {
					var context, args, timeout, result, previous, later;
					return previous = 0, later = function() {
						previous = new Date, timeout = null, result = func.apply(context, args)
					}, function() {
						var now = new Date,
							remaining = wait - (now - previous);
						return context = this, args = arguments, remaining <= 0 ? (clearTimeout(timeout), timeout = null, previous = now, result = func.apply(context, args)) : timeout || (timeout = setTimeout(later, remaining)), result
					}
				},
				stringify: function(val) {
					return _.isString(val) ? val : JSON.stringify(val)
				},
				noop: function() {}
			}
		}(),
		WWW = function() {
			"use strict";
			function build(o) {
				var www, classes;
				return classes = _.mixin({}, defaultClassNames, o), www = {
					css: buildCss(),
					classes: classes,
					html: buildHtml(classes),
					selectors: buildSelectors(classes)
				}, {
					css: www.css,
					html: www.html,
					classes: www.classes,
					selectors: www.selectors,
					mixin: function(o) {
						_.mixin(o, www)
					}
				}
			}
			function buildHtml(c) {
				return {
					wrapper: '<span class="' + c.wrapper + '"></span>',
					menu: '<div class="' + c.menu + '"></div>'
				}
			}
			function buildSelectors(classes) {
				var selectors = {};
				return _.each(classes, function(v, k) {
					selectors[k] = "." + v
				}), selectors
			}
			function buildCss() {
				var css = {
					wrapper: {
						position: "relative",
						display: "inline-block"
					},
					hint: {
						position: "absolute",
						top: "0",
						left: "0",
						borderColor: "transparent",
						boxShadow: "none",
						opacity: "1"
					},
					input: {
						position: "relative",
						verticalAlign: "top",
						backgroundColor: "transparent"
					},
					inputWithNoHint: {
						position: "relative",
						verticalAlign: "top"
					},
					menu: {
						position: "absolute",
						top: "100%",
						left: "0",
						zIndex: "100",
						display: "none"
					},
					ltr: {
						left: "0",
						right: "auto"
					},
					rtl: {
						left: "auto",
						right: " 0"
					}
				};
				return _.isMsie() && _.mixin(css.input, {
					backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
				}), css
			}
			var defaultClassNames = {
				wrapper: "twitter-typeahead",
				input: "tt-input",
				hint: "tt-hint",
				menu: "tt-menu",
				dataset: "tt-dataset",
				suggestion: "tt-suggestion",
				selectable: "tt-selectable",
				empty: "tt-empty",
				open: "tt-open",
				cursor: "tt-cursor",
				highlight: "tt-highlight"
			};
			return build
		}(),
		EventBus = function() {
			"use strict";
			function EventBus(o) {
				o && o.el || $.error("EventBus initialized without el"), this.$el = $(o.el)
			}
			var namespace, deprecationMap;
			return namespace = "typeahead:", deprecationMap = {
				render: "rendered",
				cursorchange: "cursorchanged",
				select: "selected",
				autocomplete: "autocompleted"
			}, _.mixin(EventBus.prototype, {
				_trigger: function(type, args) {
					var $e;
					return $e = $.Event(namespace + type), (args = args || []).unshift($e), this.$el.trigger.apply(this.$el, args), $e
				},
				before: function(type) {
					var args, $e;
					return args = [].slice.call(arguments, 1), $e = this._trigger("before" + type, args), $e.isDefaultPrevented()
				},
				trigger: function(type) {
					var deprecatedType;
					this._trigger(type, [].slice.call(arguments, 1)), (deprecatedType = deprecationMap[type]) && this._trigger(deprecatedType, [].slice.call(arguments, 1))
				}
			}), EventBus
		}(),
		EventEmitter = function() {
			"use strict";
			function on(method, types, cb, context) {
				var type;
				if (!cb) return this;
				for (types = types.split(splitter), cb = context ? bindContext(cb, context) : cb, this._callbacks = this._callbacks || {}; type = types.shift();) this._callbacks[type] = this._callbacks[type] || {
					sync: [],
					async: []
				}, this._callbacks[type][method].push(cb);
				return this
			}
			function onAsync(types, cb, context) {
				return on.call(this, "async", types, cb, context)
			}
			function onSync(types, cb, context) {
				return on.call(this, "sync", types, cb, context)
			}
			function off(types) {
				var type;
				if (!this._callbacks) return this;
				for (types = types.split(splitter); type = types.shift();) delete this._callbacks[type];
				return this
			}
			function trigger(types) {
				var type, callbacks, args, syncFlush, asyncFlush;
				if (!this._callbacks) return this;
				for (types = types.split(splitter), args = [].slice.call(arguments, 1);
				(type = types.shift()) && (callbacks = this._callbacks[type]);) syncFlush = getFlush(callbacks.sync, this, [type].concat(args)), asyncFlush = getFlush(callbacks.async, this, [type].concat(args)), syncFlush() && nextTick(asyncFlush);
				return this
			}
			function getFlush(callbacks, context, args) {
				function flush() {
					for (var cancelled, i = 0, len = callbacks.length; !cancelled && i < len; i += 1) cancelled = callbacks[i].apply(context, args) === !1;
					return !cancelled
				}
				return flush
			}
			function getNextTick() {
				var nextTickFn;
				return nextTickFn = window.setImmediate ?
				function(fn) {
					setImmediate(function() {
						fn()
					})
				} : function(fn) {
					setTimeout(function() {
						fn()
					}, 0)
				}
			}
			function bindContext(fn, context) {
				return fn.bind ? fn.bind(context) : function() {
					fn.apply(context, [].slice.call(arguments, 0))
				}
			}
			var splitter = /\s+/,
				nextTick = getNextTick();
			return {
				onSync: onSync,
				onAsync: onAsync,
				off: off,
				trigger: trigger
			}
		}(),
		highlight = function(doc) {
			"use strict";
			function getRegex(patterns, caseSensitive, wordsOnly) {
				for (var regexStr, escapedPatterns = [], i = 0, len = patterns.length; i < len; i++) escapedPatterns.push(_.escapeRegExChars(patterns[i]));
				return regexStr = wordsOnly ? "\\b(" + escapedPatterns.join("|") + ")\\b" : "(" + escapedPatterns.join("|") + ")", caseSensitive ? new RegExp(regexStr) : new RegExp(regexStr, "i")
			}
			var defaults = {
				node: null,
				pattern: null,
				tagName: "strong",
				className: null,
				wordsOnly: !1,
				caseSensitive: !1
			};
			return function(o) {
				function hightlightTextNode(textNode) {
					var match, patternNode, wrapperNode;
					return (match = regex.exec(textNode.data)) && (wrapperNode = doc.createElement(o.tagName), o.className && (wrapperNode.className = o.className), patternNode = textNode.splitText(match.index), patternNode.splitText(match[0].length), wrapperNode.appendChild(patternNode.cloneNode(!0)), textNode.parentNode.replaceChild(wrapperNode, patternNode)), !! match
				}
				function traverse(el, hightlightTextNode) {
					for (var childNode, TEXT_NODE_TYPE = 3, i = 0; i < el.childNodes.length; i++) childNode = el.childNodes[i], childNode.nodeType === TEXT_NODE_TYPE ? i += hightlightTextNode(childNode) ? 1 : 0 : traverse(childNode, hightlightTextNode)
				}
				var regex;
				o = _.mixin({}, defaults, o), o.node && o.pattern && (o.pattern = _.isArray(o.pattern) ? o.pattern : [o.pattern], regex = getRegex(o.pattern, o.caseSensitive, o.wordsOnly), traverse(o.node, hightlightTextNode))
			}
		}(window.document),
		Input = function() {
			"use strict";
			function Input(o, www) {
				o = o || {}, o.input || $.error("input is missing"), www.mixin(this), this.$hint = $(o.hint), this.$input = $(o.input), this.query = this.$input.val(), this.queryWhenFocused = this.hasFocus() ? this.query : null, this.$overflowHelper = buildOverflowHelper(this.$input), this._checkLanguageDirection(), 0 === this.$hint.length && (this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = _.noop)
			}
			function buildOverflowHelper($input) {
				return $('<pre aria-hidden="true"></pre>').css({
					position: "absolute",
					visibility: "hidden",
					whiteSpace: "pre",
					fontFamily: $input.css("font-family"),
					fontSize: $input.css("font-size"),
					fontStyle: $input.css("font-style"),
					fontVariant: $input.css("font-variant"),
					fontWeight: $input.css("font-weight"),
					wordSpacing: $input.css("word-spacing"),
					letterSpacing: $input.css("letter-spacing"),
					textIndent: $input.css("text-indent"),
					textRendering: $input.css("text-rendering"),
					textTransform: $input.css("text-transform")
				}).insertAfter($input)
			}
			function areQueriesEquivalent(a, b) {
				return Input.normalizeQuery(a) === Input.normalizeQuery(b)
			}
			function withModifier($e) {
				return $e.altKey || $e.ctrlKey || $e.metaKey || $e.shiftKey
			}
			var specialKeyCodeMap;
			return specialKeyCodeMap = {
				9: "tab",
				27: "esc",
				37: "left",
				39: "right",
				13: "enter",
				38: "up",
				40: "down"
			}, Input.normalizeQuery = function(str) {
				return _.toStr(str).replace(/^\s*/g, "").replace(/\s{2,}/g, " ")
			}, _.mixin(Input.prototype, EventEmitter, {
				_onBlur: function() {
					this.resetInputValue(), this.trigger("blurred")
				},
				_onFocus: function() {
					this.queryWhenFocused = this.query, this.trigger("focused")
				},
				_onKeydown: function($e) {
					var keyName = specialKeyCodeMap[$e.which || $e.keyCode];
					this._managePreventDefault(keyName, $e), keyName && this._shouldTrigger(keyName, $e) && this.trigger(keyName + "Keyed", $e)
				},
				_onInput: function() {
					this._setQuery(this.getInputValue()), this.clearHintIfInvalid(), this._checkLanguageDirection()
				},
				_managePreventDefault: function(keyName, $e) {
					var preventDefault;
					switch (keyName) {
					case "up":
					case "down":
						preventDefault = !withModifier($e);
						break;
					default:
						preventDefault = !1
					}
					preventDefault && $e.preventDefault()
				},
				_shouldTrigger: function(keyName, $e) {
					var trigger;
					switch (keyName) {
					case "tab":
						trigger = !withModifier($e);
						break;
					default:
						trigger = !0
					}
					return trigger
				},
				_checkLanguageDirection: function() {
					var dir = (this.$input.css("direction") || "ltr").toLowerCase();
					this.dir !== dir && (this.dir = dir, this.$hint.attr("dir", dir), this.trigger("langDirChanged", dir))
				},
				_setQuery: function(val, silent) {
					var areEquivalent, hasDifferentWhitespace;
					areEquivalent = areQueriesEquivalent(val, this.query), hasDifferentWhitespace = !! areEquivalent && this.query.length !== val.length, this.query = val, silent || areEquivalent ? !silent && hasDifferentWhitespace && this.trigger("whitespaceChanged", this.query) : this.trigger("queryChanged", this.query)
				},
				bind: function() {
					var onBlur, onFocus, onKeydown, onInput, that = this;
					return onBlur = _.bind(this._onBlur, this), onFocus = _.bind(this._onFocus, this), onKeydown = _.bind(this._onKeydown, this), onInput = _.bind(this._onInput, this), this.$input.on("blur.tt", onBlur).on("focus.tt", onFocus).on("keydown.tt", onKeydown), !_.isMsie() || _.isMsie() > 9 ? this.$input.on("input.tt", onInput) : this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function($e) {
						specialKeyCodeMap[$e.which || $e.keyCode] || _.defer(_.bind(that._onInput, that, $e))
					}), this
				},
				focus: function() {
					this.$input.focus()
				},
				blur: function() {
					this.$input.blur()
				},
				getLangDir: function() {
					return this.dir
				},
				getQuery: function() {
					return this.query || ""
				},
				setQuery: function(val, silent) {
					this.setInputValue(val), this._setQuery(val, silent)
				},
				hasQueryChangedSinceLastFocus: function() {
					return this.query !== this.queryWhenFocused
				},
				getInputValue: function() {
					return this.$input.val()
				},
				setInputValue: function(value) {
					this.$input.val(value), this.clearHintIfInvalid(), this._checkLanguageDirection()
				},
				resetInputValue: function() {
					this.setInputValue(this.query)
				},
				getHint: function() {
					return this.$hint.val()
				},
				setHint: function(value) {
					this.$hint.val(value)
				},
				clearHint: function() {
					this.setHint("")
				},
				clearHintIfInvalid: function() {
					var val, hint, valIsPrefixOfHint, isValid;
					val = this.getInputValue(), hint = this.getHint(), valIsPrefixOfHint = val !== hint && 0 === hint.indexOf(val), isValid = "" !== val && valIsPrefixOfHint && !this.hasOverflow(), !isValid && this.clearHint()
				},
				hasFocus: function() {
					return this.$input.is(":focus")
				},
				hasOverflow: function() {
					var constraint = this.$input.width() - 2;
					return this.$overflowHelper.text(this.getInputValue()), this.$overflowHelper.width() >= constraint
				},
				isCursorAtEnd: function() {
					var valueLength, selectionStart, range;
					return valueLength = this.$input.val().length, selectionStart = this.$input[0].selectionStart, _.isNumber(selectionStart) ? selectionStart === valueLength : !document.selection || (range = document.selection.createRange(), range.moveStart("character", -valueLength), valueLength === range.text.length)
				},
				destroy: function() {
					this.$hint.off(".tt"), this.$input.off(".tt"), this.$overflowHelper.remove(), this.$hint = this.$input = this.$overflowHelper = $("<div>")
				}
			}), Input
		}(),
		Dataset = function() {
			"use strict";
			function Dataset(o, www) {
				o = o || {}, o.templates = o.templates || {}, o.templates.notFound = o.templates.notFound || o.templates.empty, o.source || $.error("missing source"), o.node || $.error("missing node"), o.name && !isValidName(o.name) && $.error("invalid dataset name: " + o.name), www.mixin(this), this.highlight = !! o.highlight, this.name = o.name || nameGenerator(), this.limit = o.limit || 5, this.displayFn = getDisplayFn(o.display || o.displayKey), this.templates = getTemplates(o.templates, this.displayFn), this.source = o.source.__ttAdapter ? o.source.__ttAdapter() : o.source, this.async = _.isUndefined(o.async) ? this.source.length > 2 : !! o.async, this._resetLastSuggestion(), this.$el = $(o.node).addClass(this.classes.dataset).addClass(this.classes.dataset + "-" + this.name)
			}
			function getDisplayFn(display) {
				function displayFn(obj) {
					return obj[display]
				}
				return display = display || _.stringify, _.isFunction(display) ? display : displayFn
			}
			function getTemplates(templates, displayFn) {
				function suggestionTemplate(context) {
					return $("<div>").text(displayFn(context))
				}
				return {
					notFound: templates.notFound && _.templatify(templates.notFound),
					pending: templates.pending && _.templatify(templates.pending),
					header: templates.header && _.templatify(templates.header),
					footer: templates.footer && _.templatify(templates.footer),
					suggestion: templates.suggestion || suggestionTemplate
				}
			}
			function isValidName(str) {
				return /^[_a-zA-Z0-9-]+$/.test(str)
			}
			var keys, nameGenerator;
			return keys = {
				val: "tt-selectable-display",
				obj: "tt-selectable-object"
			}, nameGenerator = _.getIdGenerator(), Dataset.extractData = function(el) {
				var $el = $(el);
				return $el.data(keys.obj) ? {
					val: $el.data(keys.val) || "",
					obj: $el.data(keys.obj) || null
				} : null
			}, _.mixin(Dataset.prototype, EventEmitter, {
				_overwrite: function(query, suggestions) {
					suggestions = suggestions || [], suggestions.length ? this._renderSuggestions(query, suggestions) : this.async && this.templates.pending ? this._renderPending(query) : !this.async && this.templates.notFound ? this._renderNotFound(query) : this._empty(), this.trigger("rendered", this.name, suggestions, !1)
				},
				_append: function(query, suggestions) {
					suggestions = suggestions || [], suggestions.length && this.$lastSuggestion.length ? this._appendSuggestions(query, suggestions) : suggestions.length ? this._renderSuggestions(query, suggestions) : !this.$lastSuggestion.length && this.templates.notFound && this._renderNotFound(query), this.trigger("rendered", this.name, suggestions, !0)
				},
				_renderSuggestions: function(query, suggestions) {
					var $fragment;
					$fragment = this._getSuggestionsFragment(query, suggestions), this.$lastSuggestion = $fragment.children().last(), this.$el.html($fragment).prepend(this._getHeader(query, suggestions)).append(this._getFooter(query, suggestions))
				},
				_appendSuggestions: function(query, suggestions) {
					var $fragment, $lastSuggestion;
					$fragment = this._getSuggestionsFragment(query, suggestions), $lastSuggestion = $fragment.children().last(), this.$lastSuggestion.after($fragment), this.$lastSuggestion = $lastSuggestion
				},
				_renderPending: function(query) {
					var template = this.templates.pending;
					this._resetLastSuggestion(), template && this.$el.html(template({
						query: query,
						dataset: this.name
					}))
				},
				_renderNotFound: function(query) {
					var template = this.templates.notFound;
					this._resetLastSuggestion(), template && this.$el.html(template({
						query: query,
						dataset: this.name
					}))
				},
				_empty: function() {
					this.$el.empty(), this._resetLastSuggestion()
				},
				_getSuggestionsFragment: function(query, suggestions) {
					var fragment, that = this;
					return fragment = document.createDocumentFragment(), _.each(suggestions, function(suggestion) {
						var $el, context;
						context = that._injectQuery(query, suggestion), $el = $(that.templates.suggestion(context)).data(keys.obj, suggestion).data(keys.val, that.displayFn(suggestion)).addClass(that.classes.suggestion + " " + that.classes.selectable), fragment.appendChild($el[0])
					}), this.highlight && highlight({
						className: this.classes.highlight,
						node: fragment,
						pattern: query
					}), $(fragment)
				},
				_getFooter: function(query, suggestions) {
					return this.templates.footer ? this.templates.footer({
						query: query,
						suggestions: suggestions,
						dataset: this.name
					}) : null
				},
				_getHeader: function(query, suggestions) {
					return this.templates.header ? this.templates.header({
						query: query,
						suggestions: suggestions,
						dataset: this.name
					}) : null
				},
				_resetLastSuggestion: function() {
					this.$lastSuggestion = $()
				},
				_injectQuery: function(query, obj) {
					return _.isObject(obj) ? _.mixin({
						_query: query
					}, obj) : obj
				},
				update: function(query) {
					function sync(suggestions) {
						syncCalled || (syncCalled = !0, suggestions = (suggestions || []).slice(0, that.limit), rendered = suggestions.length, that._overwrite(query, suggestions), rendered < that.limit && that.async && that.trigger("asyncRequested", query))
					}
					function async(suggestions) {
						suggestions = suggestions || [], !canceled && rendered < that.limit && (that.cancel = $.noop, rendered += suggestions.length, that._append(query, suggestions.slice(0, that.limit - rendered)), that.async && that.trigger("asyncReceived", query))
					}
					var that = this,
						canceled = !1,
						syncCalled = !1,
						rendered = 0;
					this.cancel(), this.cancel = function() {
						canceled = !0, that.cancel = $.noop, that.async && that.trigger("asyncCanceled", query)
					}, this.source(query, sync, async), !syncCalled && sync([])
				},
				cancel: $.noop,
				clear: function() {
					this._empty(), this.cancel(), this.trigger("cleared")
				},
				isEmpty: function() {
					return this.$el.is(":empty")
				},
				destroy: function() {
					this.$el = $("<div>")
				}
			}), Dataset
		}(),
		Menu = function() {
			"use strict";
			function Menu(o, www) {
				function initializeDataset(oDataset) {
					var node = that.$node.find(oDataset.node).first();
					return oDataset.node = node.length ? node : $("<div>").appendTo(that.$node), new Dataset(oDataset, www)
				}
				var that = this;
				o = o || {}, o.node || $.error("node is required"), www.mixin(this), this.$node = $(o.node), this.query = null, this.datasets = _.map(o.datasets, initializeDataset)
			}
			return _.mixin(Menu.prototype, EventEmitter, {
				_onSelectableClick: function($e) {
					this.trigger("selectableClicked", $($e.currentTarget))
				},
				_onRendered: function(type, dataset, suggestions, async) {
					this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty()), this.trigger("datasetRendered", dataset, suggestions, async)
				},
				_onCleared: function() {
					this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty()), this.trigger("datasetCleared")
				},
				_propagate: function() {
					this.trigger.apply(this, arguments)
				},
				_allDatasetsEmpty: function() {
					function isDatasetEmpty(dataset) {
						return dataset.isEmpty()
					}
					return _.every(this.datasets, isDatasetEmpty)
				},
				_getSelectables: function() {
					return this.$node.find(this.selectors.selectable)
				},
				_removeCursor: function() {
					var $selectable = this.getActiveSelectable();
					$selectable && $selectable.removeClass(this.classes.cursor)
				},
				_ensureVisible: function($el) {
					var elTop, elBottom, nodeScrollTop, nodeHeight;
					elTop = $el.position().top, elBottom = elTop + $el.outerHeight(!0), nodeScrollTop = this.$node.scrollTop(), nodeHeight = this.$node.height() + parseInt(this.$node.css("paddingTop"), 10) + parseInt(this.$node.css("paddingBottom"), 10), elTop < 0 ? this.$node.scrollTop(nodeScrollTop + elTop) : nodeHeight < elBottom && this.$node.scrollTop(nodeScrollTop + (elBottom - nodeHeight))
				},
				bind: function() {
					var onSelectableClick, that = this;
					return onSelectableClick = _.bind(this._onSelectableClick, this), this.$node.on("click.tt", this.selectors.selectable, onSelectableClick), _.each(this.datasets, function(dataset) {
						dataset.onSync("asyncRequested", that._propagate, that).onSync("asyncCanceled", that._propagate, that).onSync("asyncReceived", that._propagate, that).onSync("rendered", that._onRendered, that).onSync("cleared", that._onCleared, that)
					}), this
				},
				isOpen: function() {
					return this.$node.hasClass(this.classes.open)
				},
				open: function() {
					this.$node.addClass(this.classes.open)
				},
				close: function() {
					this.$node.removeClass(this.classes.open), this._removeCursor()
				},
				setLanguageDirection: function(dir) {
					this.$node.attr("dir", dir)
				},
				selectableRelativeToCursor: function(delta) {
					var $selectables, $oldCursor, oldIndex, newIndex;
					return $oldCursor = this.getActiveSelectable(), $selectables = this._getSelectables(), oldIndex = $oldCursor ? $selectables.index($oldCursor) : -1, newIndex = oldIndex + delta, newIndex = (newIndex + 1) % ($selectables.length + 1) - 1, newIndex = newIndex < -1 ? $selectables.length - 1 : newIndex, newIndex === -1 ? null : $selectables.eq(newIndex)
				},
				setCursor: function($selectable) {
					this._removeCursor(), ($selectable = $selectable && $selectable.first()) && ($selectable.addClass(this.classes.cursor), this._ensureVisible($selectable))
				},
				getSelectableData: function($el) {
					return $el && $el.length ? Dataset.extractData($el) : null
				},
				getActiveSelectable: function() {
					var $selectable = this._getSelectables().filter(this.selectors.cursor).first();
					return $selectable.length ? $selectable : null
				},
				getTopSelectable: function() {
					var $selectable = this._getSelectables().first();
					return $selectable.length ? $selectable : null
				},
				update: function(query) {
					function updateDataset(dataset) {
						dataset.update(query)
					}
					var isValidUpdate = query !== this.query;
					return isValidUpdate && (this.query = query, _.each(this.datasets, updateDataset)), isValidUpdate
				},
				empty: function() {
					function clearDataset(dataset) {
						dataset.clear()
					}
					_.each(this.datasets, clearDataset), this.query = null, this.$node.addClass(this.classes.empty)
				},
				destroy: function() {
					function destroyDataset(dataset) {
						dataset.destroy()
					}
					this.$node.off(".tt"), this.$node = $("<div>"), _.each(this.datasets, destroyDataset)
				}
			}), Menu
		}(),
		DefaultMenu = function() {
			"use strict";
			function DefaultMenu() {
				Menu.apply(this, [].slice.call(arguments, 0))
			}
			var s = Menu.prototype;
			return _.mixin(DefaultMenu.prototype, Menu.prototype, {
				open: function() {
					return !this._allDatasetsEmpty() && this._show(), s.open.apply(this, [].slice.call(arguments, 0))
				},
				close: function() {
					return this._hide(), s.close.apply(this, [].slice.call(arguments, 0))
				},
				_onRendered: function() {
					return this._allDatasetsEmpty() ? this._hide() : this.isOpen() && this._show(), s._onRendered.apply(this, [].slice.call(arguments, 0))
				},
				_onCleared: function() {
					return this._allDatasetsEmpty() ? this._hide() : this.isOpen() && this._show(), s._onCleared.apply(this, [].slice.call(arguments, 0))
				},
				setLanguageDirection: function(dir) {
					return this.$node.css("ltr" === dir ? this.css.ltr : this.css.rtl), s.setLanguageDirection.apply(this, [].slice.call(arguments, 0))
				},
				_hide: function() {
					this.$node.hide()
				},
				_show: function() {
					this.$node.css("display", "block")
				}
			}), DefaultMenu
		}(),
		Typeahead = function() {
			"use strict";
			function Typeahead(o, www) {
				var onFocused, onBlurred, onEnterKeyed, onTabKeyed, onEscKeyed, onUpKeyed, onDownKeyed, onLeftKeyed, onRightKeyed, onQueryChanged, onWhitespaceChanged;
				o = o || {}, o.input || $.error("missing input"), o.menu || $.error("missing menu"), o.eventBus || $.error("missing event bus"), www.mixin(this), this.eventBus = o.eventBus, this.minLength = _.isNumber(o.minLength) ? o.minLength : 1, this.input = o.input, this.menu = o.menu, this.enabled = !0, this.active = !1, this.input.hasFocus() && this.activate(), this.dir = this.input.getLangDir(), this._hacks(), this.menu.bind().onSync("selectableClicked", this._onSelectableClicked, this).onSync("asyncRequested", this._onAsyncRequested, this).onSync("asyncCanceled", this._onAsyncCanceled, this).onSync("asyncReceived", this._onAsyncReceived, this).onSync("datasetRendered", this._onDatasetRendered, this).onSync("datasetCleared", this._onDatasetCleared, this), onFocused = c(this, "activate", "open", "_onFocused"), onBlurred = c(this, "deactivate", "_onBlurred"), onEnterKeyed = c(this, "isActive", "isOpen", "_onEnterKeyed"), onTabKeyed = c(this, "isActive", "isOpen", "_onTabKeyed"), onEscKeyed = c(this, "isActive", "_onEscKeyed"), onUpKeyed = c(this, "isActive", "open", "_onUpKeyed"), onDownKeyed = c(this, "isActive", "open", "_onDownKeyed"), onLeftKeyed = c(this, "isActive", "isOpen", "_onLeftKeyed"), onRightKeyed = c(this, "isActive", "isOpen", "_onRightKeyed"), onQueryChanged = c(this, "_openIfActive", "_onQueryChanged"), onWhitespaceChanged = c(this, "_openIfActive", "_onWhitespaceChanged"), this.input.bind().onSync("focused", onFocused, this).onSync("blurred", onBlurred, this).onSync("enterKeyed", onEnterKeyed, this).onSync("tabKeyed", onTabKeyed, this).onSync("escKeyed", onEscKeyed, this).onSync("upKeyed", onUpKeyed, this).onSync("downKeyed", onDownKeyed, this).onSync("leftKeyed", onLeftKeyed, this).onSync("rightKeyed", onRightKeyed, this).onSync("queryChanged", onQueryChanged, this).onSync("whitespaceChanged", onWhitespaceChanged, this).onSync("langDirChanged", this._onLangDirChanged, this)
			}
			function c(ctx) {
				var methods = [].slice.call(arguments, 1);
				return function() {
					var args = [].slice.call(arguments);
					_.each(methods, function(method) {
						return ctx[method].apply(ctx, args)
					})
				}
			}
			return _.mixin(Typeahead.prototype, {
				_hacks: function() {
					var $input, $menu;
					$input = this.input.$input || $("<div>"), $menu = this.menu.$node || $("<div>"), $input.on("blur.tt", function($e) {
						var active, isActive, hasActive;
						active = document.activeElement, isActive = $menu.is(active), hasActive = $menu.has(active).length > 0, _.isMsie() && (isActive || hasActive) && ($e.preventDefault(), $e.stopImmediatePropagation(), _.defer(function() {
							$input.focus()
						}))
					}), $menu.on("mousedown.tt", function($e) {
						$e.preventDefault()
					})
				},
				_onSelectableClicked: function(type, $el) {
					this.select($el)
				},
				_onDatasetCleared: function() {
					this._updateHint()
				},
				_onDatasetRendered: function(type, dataset, suggestions, async) {
					this._updateHint(), this.eventBus.trigger("render", suggestions, async, dataset)
				},
				_onAsyncRequested: function(type, dataset, query) {
					this.eventBus.trigger("asyncrequest", query, dataset)
				},
				_onAsyncCanceled: function(type, dataset, query) {
					this.eventBus.trigger("asynccancel", query, dataset)
				},
				_onAsyncReceived: function(type, dataset, query) {
					this.eventBus.trigger("asyncreceive", query, dataset)
				},
				_onFocused: function() {
					this._minLengthMet() && this.menu.update(this.input.getQuery())
				},
				_onBlurred: function() {
					this.input.hasQueryChangedSinceLastFocus() && this.eventBus.trigger("change", this.input.getQuery())
				},
				_onEnterKeyed: function(type, $e) {
					var $selectable;
					($selectable = this.menu.getActiveSelectable()) && this.select($selectable) && $e.preventDefault()
				},
				_onTabKeyed: function(type, $e) {
					var $selectable;
					($selectable = this.menu.getActiveSelectable()) ? this.select($selectable) && $e.preventDefault() : ($selectable = this.menu.getTopSelectable()) && this.autocomplete($selectable) && $e.preventDefault()
				},
				_onEscKeyed: function() {
					this.close()
				},
				_onUpKeyed: function() {
					this.moveCursor(-1)
				},
				_onDownKeyed: function() {
					this.moveCursor(1)
				},
				_onLeftKeyed: function() {
					"rtl" === this.dir && this.input.isCursorAtEnd() && this.autocomplete(this.menu.getTopSelectable())
				},
				_onRightKeyed: function() {
					"ltr" === this.dir && this.input.isCursorAtEnd() && this.autocomplete(this.menu.getTopSelectable())
				},
				_onQueryChanged: function(e, query) {
					this._minLengthMet(query) ? this.menu.update(query) : this.menu.empty()
				},
				_onWhitespaceChanged: function() {
					this._updateHint()
				},
				_onLangDirChanged: function(e, dir) {
					this.dir !== dir && (this.dir = dir, this.menu.setLanguageDirection(dir))
				},
				_openIfActive: function() {
					this.isActive() && this.open()
				},
				_minLengthMet: function(query) {
					return query = _.isString(query) ? query : this.input.getQuery() || "", query.length >= this.minLength
				},
				_updateHint: function() {
					var $selectable, data, val, query, escapedQuery, frontMatchRegEx, match;
					$selectable = this.menu.getTopSelectable(), data = this.menu.getSelectableData($selectable), val = this.input.getInputValue(), !data || _.isBlankString(val) || this.input.hasOverflow() ? this.input.clearHint() : (query = Input.normalizeQuery(val), escapedQuery = _.escapeRegExChars(query), frontMatchRegEx = new RegExp("^(?:" + escapedQuery + ")(.+$)", "i"), match = frontMatchRegEx.exec(data.val), match && this.input.setHint(val + match[1]))
				},
				isEnabled: function() {
					return this.enabled
				},
				enable: function() {
					this.enabled = !0
				},
				disable: function() {
					this.enabled = !1
				},
				isActive: function() {
					return this.active
				},
				activate: function() {
					return !!this.isActive() || !(!this.isEnabled() || this.eventBus.before("active")) && (this.active = !0, this.eventBus.trigger("active"), !0)
				},
				deactivate: function() {
					return !this.isActive() || !this.eventBus.before("idle") && (this.active = !1, this.close(), this.eventBus.trigger("idle"), !0)
				},
				isOpen: function() {
					return this.menu.isOpen()
				},
				open: function() {
					return this.isOpen() || this.eventBus.before("open") || (this.menu.open(), this._updateHint(), this.eventBus.trigger("open")), this.isOpen()
				},
				close: function() {
					return this.isOpen() && !this.eventBus.before("close") && (this.menu.close(), this.input.clearHint(), this.input.resetInputValue(), this.eventBus.trigger("close")), !this.isOpen()
				},
				setVal: function(val) {
					this.input.setQuery(_.toStr(val))
				},
				getVal: function() {
					return this.input.getQuery()
				},
				select: function($selectable) {
					var data = this.menu.getSelectableData($selectable);
					return !(!data || this.eventBus.before("select", data.obj)) && (this.input.setQuery(data.val, !0), this.eventBus.trigger("select", data.obj), this.close(), !0)
				},
				autocomplete: function($selectable) {
					var query, data, isValid;
					return query = this.input.getQuery(), data = this.menu.getSelectableData($selectable), isValid = data && query !== data.val, !(!isValid || this.eventBus.before("autocomplete", data.obj)) && (this.input.setQuery(data.val), this.eventBus.trigger("autocomplete", data.obj), !0)
				},
				moveCursor: function(delta) {
					var query, $candidate, data, payload, cancelMove;
					return query = this.input.getQuery(), $candidate = this.menu.selectableRelativeToCursor(delta), data = this.menu.getSelectableData($candidate), payload = data ? data.obj : null, cancelMove = this._minLengthMet() && this.menu.update(query), !cancelMove && !this.eventBus.before("cursorchange", payload) && (this.menu.setCursor($candidate), data ? this.input.setInputValue(data.val) : (this.input.resetInputValue(), this._updateHint()), this.eventBus.trigger("cursorchange", payload), !0)
				},
				destroy: function() {
					this.input.destroy(), this.menu.destroy()
				}
			}), Typeahead
		}();
	!
	function() {
		"use strict";
		function ttEach($els, fn) {
			$els.each(function() {
				var typeahead, $input = $(this);
				(typeahead = $input.data(keys.typeahead)) && fn(typeahead, $input)
			})
		}
		function buildHintFromInput($input, www) {
			return $input.clone().addClass(www.classes.hint).removeData().css(www.css.hint).css(getBackgroundStyles($input)).prop("readonly", !0).removeAttr("id name placeholder required").attr({
				autocomplete: "off",
				spellcheck: "false",
				tabindex: -1
			})
		}
		function prepInput($input, www) {
			$input.data(keys.attrs, {
				dir: $input.attr("dir"),
				autocomplete: $input.attr("autocomplete"),
				spellcheck: $input.attr("spellcheck"),
				style: $input.attr("style")
			}), $input.addClass(www.classes.input).attr({
				autocomplete: "off",
				spellcheck: !1
			});
			try {
				!$input.attr("dir") && $input.attr("dir", "auto")
			} catch (e) {}
			return $input
		}
		function getBackgroundStyles($el) {
			return {
				backgroundAttachment: $el.css("background-attachment"),
				backgroundClip: $el.css("background-clip"),
				backgroundColor: $el.css("background-color"),
				backgroundImage: $el.css("background-image"),
				backgroundOrigin: $el.css("background-origin"),
				backgroundPosition: $el.css("background-position"),
				backgroundRepeat: $el.css("background-repeat"),
				backgroundSize: $el.css("background-size")
			}
		}
		function revert($input) {
			var www, $wrapper;
			www = $input.data(keys.www), $wrapper = $input.parent().filter(www.selectors.wrapper), _.each($input.data(keys.attrs), function(val, key) {
				_.isUndefined(val) ? $input.removeAttr(key) : $input.attr(key, val)
			}), $input.removeData(keys.typeahead).removeData(keys.www).removeData(keys.attr).removeClass(www.classes.input), $wrapper.length && ($input.detach().insertAfter($wrapper), $wrapper.remove())
		}
		function $elOrNull(obj) {
			var isValid, $el;
			return isValid = _.isJQuery(obj) || _.isElement(obj), $el = isValid ? $(obj).first() : [], $el.length ? $el : null
		}
		var old, keys, methods;
		old = $.fn.typeahead, keys = {
			www: "tt-www",
			attrs: "tt-attrs",
			typeahead: "tt-typeahead"
		}, methods = {
			initialize: function(o, datasets) {
				function attach() {
					var $input, $wrapper, $hint, $menu, defaultHint, defaultMenu, eventBus, input, menu, typeahead, MenuConstructor;
					_.each(datasets, function(d) {
						d.highlight = !! o.highlight
					}), $input = $(this), $wrapper = $(www.html.wrapper), $hint = $elOrNull(o.hint), $menu = $elOrNull(o.menu), defaultHint = o.hint !== !1 && !$hint, defaultMenu = o.menu !== !1 && !$menu, defaultHint && ($hint = buildHintFromInput($input, www)), defaultMenu && ($menu = $(www.html.menu).css(www.css.menu)), $hint && $hint.val(""), $input = prepInput($input, www), (defaultHint || defaultMenu) && ($wrapper.css(www.css.wrapper), $input.css(defaultHint ? www.css.input : www.css.inputWithNoHint), $input.wrap($wrapper).parent().prepend(defaultHint ? $hint : null).append(defaultMenu ? $menu : null)), MenuConstructor = defaultMenu ? DefaultMenu : Menu, eventBus = new EventBus({
						el: $input
					}), input = new Input({
						hint: $hint,
						input: $input
					}, www), menu = new MenuConstructor({
						node: $menu,
						datasets: datasets
					}, www), typeahead = new Typeahead({
						input: input,
						menu: menu,
						eventBus: eventBus,
						minLength: o.minLength
					}, www), $input.data(keys.www, www), $input.data(keys.typeahead, typeahead)
				}
				var www;
				return datasets = _.isArray(datasets) ? datasets : [].slice.call(arguments, 1), o = o || {}, www = WWW(o.classNames), this.each(attach)
			},
			isEnabled: function() {
				var enabled;
				return ttEach(this.first(), function(t) {
					enabled = t.isEnabled()
				}), enabled
			},
			enable: function() {
				return ttEach(this, function(t) {
					t.enable()
				}), this
			},
			disable: function() {
				return ttEach(this, function(t) {
					t.disable()
				}), this
			},
			isActive: function() {
				var active;
				return ttEach(this.first(), function(t) {
					active = t.isActive()
				}), active
			},
			activate: function() {
				return ttEach(this, function(t) {
					t.activate()
				}), this
			},
			deactivate: function() {
				return ttEach(this, function(t) {
					t.deactivate()
				}), this
			},
			isOpen: function() {
				var open;
				return ttEach(this.first(), function(t) {
					open = t.isOpen()
				}), open
			},
			open: function() {
				return ttEach(this, function(t) {
					t.open()
				}), this
			},
			close: function() {
				return ttEach(this, function(t) {
					t.close()
				}), this
			},
			select: function(el) {
				var success = !1,
					$el = $(el);
				return ttEach(this.first(), function(t) {
					success = t.select($el)
				}), success
			},
			autocomplete: function(el) {
				var success = !1,
					$el = $(el);
				return ttEach(this.first(), function(t) {
					success = t.autocomplete($el)
				}), success
			},
			moveCursor: function(delta) {
				var success = !1;
				return ttEach(this.first(), function(t) {
					success = t.moveCursor(delta)
				}), success
			},
			val: function(newVal) {
				var query;
				return arguments.length ? (ttEach(this, function(t) {
					t.setVal(newVal)
				}), this) : (ttEach(this.first(), function(t) {
					query = t.getVal()
				}), query)
			},
			destroy: function() {
				return ttEach(this, function(typeahead, $input) {
					revert($input), typeahead.destroy()
				}), this
			}
		}, $.fn.typeahead = function(method) {
			return methods[method] ? methods[method].apply(this, [].slice.call(arguments, 1)) : methods.initialize.apply(this, arguments)
		}, $.fn.typeahead.noConflict = function() {
			return $.fn.typeahead = old, this
		}
	}()
});
var ICA = ICA || {};

!
function($, window, document, ICA, undefined) {
	ICA.storeSpecific = function() {
		function _storeSpecific() {
			function initAttachEvents() {
				$priceReductionFilterLink.on("click", function(e) {
					var $categoryItem = $(this);
					filterCategory($categoryItem)
				})
			}
			function filterCategory(categoryItem) {
				var numberOfCategories = categoryItem.data("count");
				if (categoryItem.is(".active")) categoryItem.is(".js-show-all-items") || (categoryItem.siblings(".js-show-all-items").addClass("active"), $offerListCount.html(" visar " + categoryItem.siblings(".js-show-all-items").data("count") + " st "), categoryItem.removeClass("active"), $offers.show());
				else {
					categoryItem.addClass("active"), categoryItem.siblings().removeClass("active");
					var currentCategoryId = categoryItem.data("categoryid");
					$offerListCount.html(" visar " + numberOfCategories + " st ");
					var $currentOfferList = $offers.filter("[data-categoryid=" + currentCategoryId + "]");
					$currentOfferList.length ? ($offers.hide(), $currentOfferList.show()) : $offers.show()
				}
			}
			var $priceReductionFilterLink = ($(".price-reduction-offers"), $(".price-reduction-filter .columned .checkbox")),
				$offers = $(".offers-hits-list"),
				$offerListCount = $(".offers-total-count"),
				context = ($(document), this);
			return context.init = function() {
				initAttachEvents()
			}, context
		}
		return new _storeSpecific
	}()
}(jQuery, this, this.document, ICA), $(function() {
	$("#aspnetForm").hasClass("store") && ICA.storeSpecific.init()
});
var ICA = ICA || {};
!
function($, window, document, ICA, undefined) {
	ICA.entertainmentOffer = function() {
		function _entertainmentOffer() {
			var context = this,
				$entertainmentOffersContainer = $(".entertainment-offers"),
				$changeCategoryButton = $(".change-category-button"),
				$closeButton = $(".close-button"),
				$truncatedPara = $(".truncated-para"),
				$entertainmentBookningTable = $(".entertainment-booking-table"),
				$articleName = $(".article-name h1"),
				$bookningModalLink = $(".bookning-container .booking-btn.modal");
			context.init = function() {
				initAttachEvents(), truncateParagraph($truncatedPara), $entertainmentBookningTable.find("a").on("mousedown", function(e) {
					e.preventDefault(), icadatalayer.add("nojeserbjudande", {
						nojesAction: "Klick till partner",
						nojesDestination: $(this).attr("href"),
						nojesPartner: $articleName.text().trim()
					})
				}), $bookningModalLink.on("mousedown", function() {
					$articleName.text().trim(), icadatalayer.add("nojeserbjudande", {
						nojesAction: "Öppna popupmodal",
						nojesPartner: $articleName.text().trim()
					})
				})
			};
			var initAttachEvents = function() {
					$changeCategoryButton.on("click", showCategoryMenu), $closeButton.on("click", hideCategoryMenu), $truncatedPara.on("click", function() {
						$(this).trunk8("revert"), $(this).toggleClass("expended"), $(this).hasClass("expended") || truncateParagraph(this)
					})
				},
				showCategoryMenu = function() {
					$entertainmentOffersContainer.addClass("mobile-menu-active")
				},
				hideCategoryMenu = function() {
					$entertainmentOffersContainer.removeClass("mobile-menu-active")
				},
				truncateParagraph = function(el, numberOfLines) {
					var $paragraphs = el ? $(el) : $truncatedPara;
					$paragraphs.each(function() {
						$(this).trunk8({
							lines: $(this).data("lines") || numberOfLines || DEFAULT_NUMBER_OF_LINES_TRUNCATED
						})
					})
				};
			return context
		}
		var DEFAULT_NUMBER_OF_LINES_TRUNCATED = 2;
		return new _entertainmentOffer
	}()
}(jQuery, this, this.document, ICA), $(function() {
	$("#page").hasClass("page-mod-fullwidth") && (ICA.entertainmentOffer.init(), ICA.youtube.init())
});
!
function(module) {
	"function" == typeof define && define.amd ? define(["jquery"], module) : module(jQuery)
}(function(jQuery, undefined) {
	function Timer(fn) {
		function trigger(time) {
			active ? (callback(), requestFrame(trigger), running = !0, active = !1) : running = !1
		}
		var callback = fn,
			active = !1,
			running = !1;
		this.kick = function(fn) {
			active = !0, running || trigger()
		}, this.end = function(fn) {
			var cb = callback;
			fn && (running ? (callback = active ?
			function() {
				cb(), fn()
			} : fn, active = !0) : fn())
		}
	}
	function returnTrue() {
		return !0
	}
	function returnFalse() {
		return !1
	}
	function preventDefault(e) {
		e.preventDefault()
	}
	function preventIgnoreTags(e) {
		ignoreTags[e.target.tagName.toLowerCase()] || e.preventDefault()
	}
	function isLeftButton(e) {
		return 1 === e.which && !e.ctrlKey && !e.altKey
	}
	function identifiedTouch(touchList, id) {
		var i, l;
		if (touchList.identifiedTouch) return touchList.identifiedTouch(id);
		for (i = -1, l = touchList.length; ++i < l;) if (touchList[i].identifier === id) return touchList[i]
	}
	function changedTouch(e, event) {
		var touch = identifiedTouch(e.changedTouches, event.identifier);
		if (touch && (touch.pageX !== event.pageX || touch.pageY !== event.pageY)) return touch
	}
	function mousedown(e) {
		var data;
		isLeftButton(e) && (data = {
			target: e.target,
			startX: e.pageX,
			startY: e.pageY,
			timeStamp: e.timeStamp
		}, add(document, mouseevents.move, mousemove, data), add(document, mouseevents.cancel, mouseend, data))
	}
	function mousemove(e) {
		var data = e.data;
		checkThreshold(e, data, e, removeMouse)
	}
	function mouseend(e) {
		removeMouse()
	}
	function removeMouse() {
		remove(document, mouseevents.move, mousemove), remove(document, mouseevents.cancel, mouseend)
	}
	function touchstart(e) {
		var touch, template;
		ignoreTags[e.target.tagName.toLowerCase()] || (touch = e.changedTouches[0], template = {
			target: touch.target,
			startX: touch.pageX,
			startY: touch.pageY,
			timeStamp: e.timeStamp,
			identifier: touch.identifier
		}, add(document, touchevents.move + "." + touch.identifier, touchmove, template), add(document, touchevents.cancel + "." + touch.identifier, touchend, template))
	}
	function touchmove(e) {
		var data = e.data,
			touch = changedTouch(e, data);
		touch && checkThreshold(e, data, touch, removeTouch)
	}
	function touchend(e) {
		var template = e.data,
			touch = identifiedTouch(e.changedTouches, template.identifier);
		touch && removeTouch(template.identifier)
	}
	function removeTouch(identifier) {
		remove(document, "." + identifier, touchmove), remove(document, "." + identifier, touchend)
	}
	function checkThreshold(e, template, touch, fn) {
		var distX = touch.pageX - template.startX,
			distY = touch.pageY - template.startY;
		distX * distX + distY * distY < threshold * threshold || triggerStart(e, template, touch, distX, distY, fn)
	}
	function handled() {
		return this._handled = returnTrue, !1
	}
	function flagAsHandled(e) {
		e._handled()
	}
	function triggerStart(e, template, touch, distX, distY, fn) {
		var touches, time;
		template.target;
		touches = e.targetTouches, time = e.timeStamp - template.timeStamp, template.type = "movestart", template.distX = distX, template.distY = distY, template.deltaX = distX, template.deltaY = distY, template.pageX = touch.pageX, template.pageY = touch.pageY, template.velocityX = distX / time, template.velocityY = distY / time, template.targetTouches = touches, template.finger = touches ? touches.length : 1, template._handled = handled, template._preventTouchmoveDefault = function() {
			e.preventDefault()
		}, trigger(template.target, template), fn(template.identifier)
	}
	function activeMousemove(e) {
		var timer = e.data.timer;
		e.data.touch = e, e.data.timeStamp = e.timeStamp, timer.kick()
	}
	function activeMouseend(e) {
		var event = e.data.event,
			timer = e.data.timer;
		removeActiveMouse(), endEvent(event, timer, function() {
			setTimeout(function() {
				remove(event.target, "click", returnFalse)
			}, 0)
		})
	}
	function removeActiveMouse(event) {
		remove(document, mouseevents.move, activeMousemove), remove(document, mouseevents.end, activeMouseend)
	}
	function activeTouchmove(e) {
		var event = e.data.event,
			timer = e.data.timer,
			touch = changedTouch(e, event);
		touch && (e.preventDefault(), event.targetTouches = e.targetTouches, e.data.touch = touch, e.data.timeStamp = e.timeStamp, timer.kick())
	}
	function activeTouchend(e) {
		var event = e.data.event,
			timer = e.data.timer,
			touch = identifiedTouch(e.changedTouches, event.identifier);
		touch && (removeActiveTouch(event), endEvent(event, timer))
	}
	function removeActiveTouch(event) {
		remove(document, "." + event.identifier, activeTouchmove), remove(document, "." + event.identifier, activeTouchend)
	}
	function updateEvent(event, touch, timeStamp, timer) {
		var time = timeStamp - event.timeStamp;
		event.type = "move", event.distX = touch.pageX - event.startX, event.distY = touch.pageY - event.startY, event.deltaX = touch.pageX - event.pageX, event.deltaY = touch.pageY - event.pageY, event.velocityX = .3 * event.velocityX + .7 * event.deltaX / time, event.velocityY = .3 * event.velocityY + .7 * event.deltaY / time, event.pageX = touch.pageX, event.pageY = touch.pageY
	}
	function endEvent(event, timer, fn) {
		timer.end(function() {
			return event.type = "moveend", trigger(event.target, event), fn && fn()
		})
	}
	function setup(data, namespaces, eventHandle) {
		return add(this, "movestart.move", flagAsHandled), !0
	}
	function teardown(namespaces) {
		return remove(this, "dragstart drag", preventDefault), remove(this, "mousedown touchstart", preventIgnoreTags), remove(this, "movestart", flagAsHandled), !0
	}
	function addMethod(handleObj) {
		"move" !== handleObj.namespace && "moveend" !== handleObj.namespace && (add(this, "dragstart." + handleObj.guid + " drag." + handleObj.guid, preventDefault, undefined, handleObj.selector), add(this, "mousedown." + handleObj.guid, preventIgnoreTags, undefined, handleObj.selector))
	}
	function removeMethod(handleObj) {
		"move" !== handleObj.namespace && "moveend" !== handleObj.namespace && (remove(this, "dragstart." + handleObj.guid + " drag." + handleObj.guid), remove(this, "mousedown." + handleObj.guid))
	}
	var threshold = 6,
		add = jQuery.event.add,
		remove = jQuery.event.remove,
		trigger = function(node, type, data) {
			jQuery.event.trigger(type, data, node)
		},
		requestFrame = function() {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
			function(fn, element) {
				return window.setTimeout(function() {
					fn()
				}, 25)
			}
		}(),
		ignoreTags = {
			textarea: !0,
			input: !0,
			select: !0,
			button: !0
		},
		mouseevents = {
			move: "mousemove",
			cancel: "mouseup dragstart",
			end: "mouseup"
		},
		touchevents = {
			move: "touchmove",
			cancel: "touchend",
			end: "touchend"
		};
	jQuery.event.special.movestart = {
		setup: setup,
		teardown: teardown,
		add: addMethod,
		remove: removeMethod,
		_default: function(e) {
			function update(time) {
				updateEvent(event, data.touch, data.timeStamp), trigger(e.target, event)
			}
			var event, data;
			e._handled() && (event = {
				target: e.target,
				startX: e.startX,
				startY: e.startY,
				pageX: e.pageX,
				pageY: e.pageY,
				distX: e.distX,
				distY: e.distY,
				deltaX: e.deltaX,
				deltaY: e.deltaY,
				velocityX: e.velocityX,
				velocityY: e.velocityY,
				timeStamp: e.timeStamp,
				identifier: e.identifier,
				targetTouches: e.targetTouches,
				finger: e.finger
			}, data = {
				event: event,
				timer: new Timer(update),
				touch: undefined,
				timeStamp: undefined
			}, e.identifier === undefined ? (add(e.target, "click", returnFalse), add(document, mouseevents.move, activeMousemove, data), add(document, mouseevents.end, activeMouseend, data)) : (e._preventTouchmoveDefault(), add(document, touchevents.move + "." + e.identifier, activeTouchmove, data), add(document, touchevents.end + "." + e.identifier, activeTouchend, data)))
		}
	}, jQuery.event.special.move = {
		setup: function() {
			add(this, "movestart.move", jQuery.noop)
		},
		teardown: function() {
			remove(this, "movestart.move", jQuery.noop)
		}
	}, jQuery.event.special.moveend = {
		setup: function() {
			add(this, "movestart.moveend", jQuery.noop)
		},
		teardown: function() {
			remove(this, "movestart.moveend", jQuery.noop)
		}
	}, add(document, "mousedown.move", mousedown), add(document, "touchstart.move", touchstart), "function" == typeof Array.prototype.indexOf && !
	function(jQuery, undefined) {
		for (var props = ["changedTouches", "targetTouches"], l = props.length; l--;) jQuery.event.props && jQuery.event.props.indexOf(props[l]) === -1 && jQuery.event.props.push(props[l])
	}(jQuery)
});
!
function(factory) {
	"use strict";
	"function" == typeof define && define.amd ? define(["jquery"], factory) : "undefined" != typeof exports ? module.exports = factory(require("jquery")) : factory(jQuery)
}(function($) {
	"use strict";
	var Slick = window.Slick || {};
	Slick = function() {
		function Slick(element, settings) {
			var dataSettings, _ = this;
			_.defaults = {
				accessibility: !0,
				adaptiveHeight: !1,
				appendArrows: $(element),
				appendDots: $(element),
				arrows: !0,
				asNavFor: null,
				prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
				nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
				autoplay: !1,
				autoplaySpeed: 3e3,
				centerMode: !1,
				centerPadding: "50px",
				cssEase: "ease",
				customPaging: function(slider, i) {
					return $('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1)
				},
				dots: !1,
				dotsClass: "slick-dots",
				draggable: !0,
				easing: "linear",
				edgeFriction: .35,
				fade: !1,
				focusOnSelect: !1,
				infinite: !0,
				initialSlide: 0,
				lazyLoad: "ondemand",
				mobileFirst: !1,
				pauseOnHover: !0,
				pauseOnFocus: !0,
				pauseOnDotsHover: !1,
				respondTo: "window",
				responsive: null,
				rows: 1,
				rtl: !1,
				slide: "",
				slidesPerRow: 1,
				slidesToShow: 1,
				slidesToScroll: 1,
				speed: 500,
				swipe: !0,
				swipeToSlide: !1,
				touchMove: !0,
				touchThreshold: 5,
				useCSS: !0,
				useTransform: !0,
				variableWidth: !1,
				vertical: !1,
				verticalSwiping: !1,
				waitForAnimate: !0,
				zIndex: 1e3
			}, _.initials = {
				animating: !1,
				dragging: !1,
				autoPlayTimer: null,
				currentDirection: 0,
				currentLeft: null,
				currentSlide: 0,
				direction: 1,
				$dots: null,
				listWidth: null,
				listHeight: null,
				loadIndex: 0,
				$nextArrow: null,
				$prevArrow: null,
				slideCount: null,
				slideWidth: null,
				$slideTrack: null,
				$slides: null,
				sliding: !1,
				slideOffset: 0,
				swipeLeft: null,
				$list: null,
				touchObject: {},
				transformsEnabled: !1,
				unslicked: !1
			}, $.extend(_, _.initials), _.activeBreakpoint = null, _.animType = null, _.animProp = null, _.breakpoints = [], _.breakpointSettings = [], _.cssTransitions = !1, _.focussed = !1, _.interrupted = !1, _.hidden = "hidden", _.paused = !0, _.positionProp = null, _.respondTo = null, _.rowCount = 1, _.shouldClick = !0, _.$slider = $(element), _.$slidesCache = null, _.transformType = null, _.transitionType = null, _.visibilityChange = "visibilitychange", _.windowWidth = 0, _.windowTimer = null, dataSettings = $(element).data("slick") || {}, _.options = $.extend({}, _.defaults, settings, dataSettings), _.currentSlide = _.options.initialSlide, _.originalSettings = _.options, "undefined" != typeof document.mozHidden ? (_.hidden = "mozHidden", _.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (_.hidden = "webkitHidden", _.visibilityChange = "webkitvisibilitychange"), _.autoPlay = $.proxy(_.autoPlay, _), _.autoPlayClear = $.proxy(_.autoPlayClear, _), _.autoPlayIterator = $.proxy(_.autoPlayIterator, _), _.changeSlide = $.proxy(_.changeSlide, _), _.clickHandler = $.proxy(_.clickHandler, _), _.selectHandler = $.proxy(_.selectHandler, _), _.setPosition = $.proxy(_.setPosition, _), _.swipeHandler = $.proxy(_.swipeHandler, _), _.dragHandler = $.proxy(_.dragHandler, _), _.keyHandler = $.proxy(_.keyHandler, _), _.instanceUid = instanceUid++, _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, _.registerBreakpoints(), _.init(!0)
		}
		var instanceUid = 0;
		return Slick
	}(), Slick.prototype.activateADA = function() {
		var _ = this;
		_.$slideTrack.find(".slick-active").attr({
			"aria-hidden": "false"
		}).find("a, input, button, select").attr({
			tabindex: "0"
		})
	}, Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {
		var _ = this;
		if ("boolean" == typeof index) addBefore = index, index = null;
		else if (index < 0 || index >= _.slideCount) return !1;
		_.unload(), "number" == typeof index ? 0 === index && 0 === _.$slides.length ? $(markup).appendTo(_.$slideTrack) : addBefore ? $(markup).insertBefore(_.$slides.eq(index)) : $(markup).insertAfter(_.$slides.eq(index)) : addBefore === !0 ? $(markup).prependTo(_.$slideTrack) : $(markup).appendTo(_.$slideTrack), _.$slides = _.$slideTrack.children(this.options.slide), _.$slideTrack.children(this.options.slide).detach(), _.$slideTrack.append(_.$slides), _.$slides.each(function(index, element) {
			$(element).attr("data-slick-index", index)
		}), _.$slidesCache = _.$slides, _.reinit()
	}, Slick.prototype.animateHeight = function() {
		var _ = this;
		if (1 === _.options.slidesToShow && _.options.adaptiveHeight === !0 && _.options.vertical === !1) {
			var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(!0);
			_.$list.animate({
				height: targetHeight
			}, _.options.speed)
		}
	}, Slick.prototype.animateSlide = function(targetLeft, callback) {
		var animProps = {},
			_ = this;
		_.animateHeight(), _.options.rtl === !0 && _.options.vertical === !1 && (targetLeft = -targetLeft), _.transformsEnabled === !1 ? _.options.vertical === !1 ? _.$slideTrack.animate({
			left: targetLeft
		}, _.options.speed, _.options.easing, callback) : _.$slideTrack.animate({
			top: targetLeft
		}, _.options.speed, _.options.easing, callback) : _.cssTransitions === !1 ? (_.options.rtl === !0 && (_.currentLeft = -_.currentLeft), $({
			animStart: _.currentLeft
		}).animate({
			animStart: targetLeft
		}, {
			duration: _.options.speed,
			easing: _.options.easing,
			step: function(now) {
				now = Math.ceil(now), _.options.vertical === !1 ? (animProps[_.animType] = "translate(" + now + "px, 0px)", _.$slideTrack.css(animProps)) : (animProps[_.animType] = "translate(0px," + now + "px)", _.$slideTrack.css(animProps))
			},
			complete: function() {
				callback && callback.call()
			}
		})) : (_.applyTransition(), targetLeft = Math.ceil(targetLeft), _.options.vertical === !1 ? animProps[_.animType] = "translate3d(" + targetLeft + "px, 0px, 0px)" : animProps[_.animType] = "translate3d(0px," + targetLeft + "px, 0px)", _.$slideTrack.css(animProps), callback && setTimeout(function() {
			_.disableTransition(), callback.call()
		}, _.options.speed))
	}, Slick.prototype.getNavTarget = function() {
		var _ = this,
			asNavFor = _.options.asNavFor;
		return asNavFor && null !== asNavFor && (asNavFor = $(asNavFor).not(_.$slider)), asNavFor
	}, Slick.prototype.asNavFor = function(index) {
		var _ = this,
			asNavFor = _.getNavTarget();
		null !== asNavFor && "object" == typeof asNavFor && asNavFor.each(function() {
			var target = $(this).slick("getSlick");
			target.unslicked || target.slideHandler(index, !0)
		})
	}, Slick.prototype.applyTransition = function(slide) {
		var _ = this,
			transition = {};
		_.options.fade === !1 ? transition[_.transitionType] = _.transformType + " " + _.options.speed + "ms " + _.options.cssEase : transition[_.transitionType] = "opacity " + _.options.speed + "ms " + _.options.cssEase, _.options.fade === !1 ? _.$slideTrack.css(transition) : _.$slides.eq(slide).css(transition)
	}, Slick.prototype.autoPlay = function() {
		var _ = this;
		_.autoPlayClear(), _.slideCount > _.options.slidesToShow && (_.autoPlayTimer = setInterval(_.autoPlayIterator, _.options.autoplaySpeed))
	}, Slick.prototype.autoPlayClear = function() {
		var _ = this;
		_.autoPlayTimer && clearInterval(_.autoPlayTimer)
	}, Slick.prototype.autoPlayIterator = function() {
		var _ = this,
			slideTo = _.currentSlide + _.options.slidesToScroll;
		_.paused || _.interrupted || _.focussed || (_.options.infinite === !1 && (1 === _.direction && _.currentSlide + 1 === _.slideCount - 1 ? _.direction = 0 : 0 === _.direction && (slideTo = _.currentSlide - _.options.slidesToScroll, _.currentSlide - 1 === 0 && (_.direction = 1))), _.slideHandler(slideTo))
	}, Slick.prototype.buildArrows = function() {
		var _ = this;
		_.options.arrows === !0 && (_.$prevArrow = $(_.options.prevArrow).addClass("slick-arrow"), _.$nextArrow = $(_.options.nextArrow).addClass("slick-arrow"), _.slideCount > _.options.slidesToShow ? (_.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), _.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), _.htmlExpr.test(_.options.prevArrow) && _.$prevArrow.prependTo(_.options.appendArrows), _.htmlExpr.test(_.options.nextArrow) && _.$nextArrow.appendTo(_.options.appendArrows), _.options.infinite !== !0 && _.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : _.$prevArrow.add(_.$nextArrow).addClass("slick-hidden").attr({
			"aria-disabled": "true",
			tabindex: "-1"
		}))
	}, Slick.prototype.buildDots = function() {
		var i, dot, _ = this;
		if (_.options.dots === !0 && _.slideCount > _.options.slidesToShow) {
			for (_.$slider.addClass("slick-dotted"), dot = $("<ul />").addClass(_.options.dotsClass), i = 0; i <= _.getDotCount(); i += 1) dot.append($("<li />").append(_.options.customPaging.call(this, _, i)));
			_.$dots = dot.appendTo(_.options.appendDots), _.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
		}
	}, Slick.prototype.buildOut = function() {
		var _ = this;
		_.$slides = _.$slider.children(_.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), _.slideCount = _.$slides.length, _.$slides.each(function(index, element) {
			$(element).attr("data-slick-index", index).data("originalStyling", $(element).attr("style") || "")
		}), _.$slider.addClass("slick-slider"), _.$slideTrack = 0 === _.slideCount ? $('<div class="slick-track"/>').appendTo(_.$slider) : _.$slides.wrapAll('<div class="slick-track"/>').parent(), _.$list = _.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), _.$slideTrack.css("opacity", 0), _.options.centerMode !== !0 && _.options.swipeToSlide !== !0 || (_.options.slidesToScroll = 1), $("img[data-lazy]", _.$slider).not("[src]").addClass("slick-loading"), _.setupInfinite(), _.buildArrows(), _.buildDots(), _.updateDots(), _.setSlideClasses("number" == typeof _.currentSlide ? _.currentSlide : 0), _.options.draggable === !0 && _.$list.addClass("draggable")
	}, Slick.prototype.buildRows = function() {
		var a, b, c, newSlides, numOfSlides, originalSlides, slidesPerSection, _ = this;
		if (newSlides = document.createDocumentFragment(), originalSlides = _.$slider.children(), _.options.rows > 1) {
			for (slidesPerSection = _.options.slidesPerRow * _.options.rows, numOfSlides = Math.ceil(originalSlides.length / slidesPerSection), a = 0; a < numOfSlides; a++) {
				var slide = document.createElement("div");
				for (b = 0; b < _.options.rows; b++) {
					var row = document.createElement("div");
					for (c = 0; c < _.options.slidesPerRow; c++) {
						var target = a * slidesPerSection + (b * _.options.slidesPerRow + c);
						originalSlides.get(target) && row.appendChild(originalSlides.get(target))
					}
					slide.appendChild(row)
				}
				newSlides.appendChild(slide)
			}
			_.$slider.empty().append(newSlides), _.$slider.children().children().children().css({
				width: 100 / _.options.slidesPerRow + "%",
				display: "inline-block"
			})
		}
	}, Slick.prototype.checkResponsive = function(initial, forceUpdate) {
		var breakpoint, targetBreakpoint, respondToWidth, _ = this,
			triggerBreakpoint = !1,
			sliderWidth = _.$slider.width(),
			windowWidth = window.innerWidth || $(window).width();
		if ("window" === _.respondTo ? respondToWidth = windowWidth : "slider" === _.respondTo ? respondToWidth = sliderWidth : "min" === _.respondTo && (respondToWidth = Math.min(windowWidth, sliderWidth)), _.options.responsive && _.options.responsive.length && null !== _.options.responsive) {
			targetBreakpoint = null;
			for (breakpoint in _.breakpoints) _.breakpoints.hasOwnProperty(breakpoint) && (_.originalSettings.mobileFirst === !1 ? respondToWidth < _.breakpoints[breakpoint] && (targetBreakpoint = _.breakpoints[breakpoint]) : respondToWidth > _.breakpoints[breakpoint] && (targetBreakpoint = _.breakpoints[breakpoint]));
			null !== targetBreakpoint ? null !== _.activeBreakpoint ? (targetBreakpoint !== _.activeBreakpoint || forceUpdate) && (_.activeBreakpoint = targetBreakpoint, "unslick" === _.breakpointSettings[targetBreakpoint] ? _.unslick(targetBreakpoint) : (_.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]), initial === !0 && (_.currentSlide = _.options.initialSlide), _.refresh(initial)), triggerBreakpoint = targetBreakpoint) : (_.activeBreakpoint = targetBreakpoint, "unslick" === _.breakpointSettings[targetBreakpoint] ? _.unslick(targetBreakpoint) : (_.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]), initial === !0 && (_.currentSlide = _.options.initialSlide), _.refresh(initial)), triggerBreakpoint = targetBreakpoint) : null !== _.activeBreakpoint && (_.activeBreakpoint = null, _.options = _.originalSettings, initial === !0 && (_.currentSlide = _.options.initialSlide), _.refresh(initial), triggerBreakpoint = targetBreakpoint), initial || triggerBreakpoint === !1 || _.$slider.trigger("breakpoint", [_, triggerBreakpoint])
		}
	}, Slick.prototype.changeSlide = function(event, dontAnimate) {
		var indexOffset, slideOffset, unevenOffset, _ = this,
			$target = $(event.currentTarget);
		switch ($target.is("a") && event.preventDefault(), $target.is("li") || ($target = $target.closest("li")), unevenOffset = _.slideCount % _.options.slidesToScroll !== 0, indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll, event.data.message) {
		case "previous":
			slideOffset = 0 === indexOffset ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset, _.slideCount > _.options.slidesToShow && _.slideHandler(_.currentSlide - slideOffset, !1, dontAnimate);
			break;
		case "next":
			slideOffset = 0 === indexOffset ? _.options.slidesToScroll : indexOffset, _.slideCount > _.options.slidesToShow && _.slideHandler(_.currentSlide + slideOffset, !1, dontAnimate);
			break;
		case "index":
			var index = 0 === event.data.index ? 0 : event.data.index || $target.index() * _.options.slidesToScroll;
			_.slideHandler(_.checkNavigable(index), !1, dontAnimate), $target.children().trigger("focus");
			break;
		default:
			return
		}
	}, Slick.prototype.checkNavigable = function(index) {
		var navigables, prevNavigable, _ = this;
		if (navigables = _.getNavigableIndexes(), prevNavigable = 0, index > navigables[navigables.length - 1]) index = navigables[navigables.length - 1];
		else for (var n in navigables) {
			if (index < navigables[n]) {
				index = prevNavigable;
				break
			}
			prevNavigable = navigables[n]
		}
		return index
	}, Slick.prototype.cleanUpEvents = function() {
		var _ = this;
		_.options.dots && null !== _.$dots && $("li", _.$dots).off("click.slick", _.changeSlide).off("mouseenter.slick", $.proxy(_.interrupt, _, !0)).off("mouseleave.slick", $.proxy(_.interrupt, _, !1)), _.$slider.off("focus.slick blur.slick"), _.options.arrows === !0 && _.slideCount > _.options.slidesToShow && (_.$prevArrow && _.$prevArrow.off("click.slick", _.changeSlide), _.$nextArrow && _.$nextArrow.off("click.slick", _.changeSlide)), _.$list.off("touchstart.slick mousedown.slick", _.swipeHandler), _.$list.off("touchmove.slick mousemove.slick", _.swipeHandler), _.$list.off("touchend.slick mouseup.slick", _.swipeHandler), _.$list.off("touchcancel.slick mouseleave.slick", _.swipeHandler), _.$list.off("click.slick", _.clickHandler), $(document).off(_.visibilityChange, _.visibility), _.cleanUpSlideEvents(), _.options.accessibility === !0 && _.$list.off("keydown.slick", _.keyHandler), _.options.focusOnSelect === !0 && $(_.$slideTrack).children().off("click.slick", _.selectHandler), $(window).off("orientationchange.slick.slick-" + _.instanceUid, _.orientationChange), $(window).off("resize.slick.slick-" + _.instanceUid, _.resize), $("[draggable!=true]", _.$slideTrack).off("dragstart", _.preventDefault), $(window).off("load.slick.slick-" + _.instanceUid, _.setPosition), $(document).off("ready.slick.slick-" + _.instanceUid, _.setPosition)
	}, Slick.prototype.cleanUpSlideEvents = function() {
		var _ = this;
		_.$list.off("mouseenter.slick", $.proxy(_.interrupt, _, !0)), _.$list.off("mouseleave.slick", $.proxy(_.interrupt, _, !1))
	}, Slick.prototype.cleanUpRows = function() {
		var originalSlides, _ = this;
		_.options.rows > 1 && (originalSlides = _.$slides.children().children(), originalSlides.removeAttr("style"), _.$slider.empty().append(originalSlides))
	}, Slick.prototype.clickHandler = function(event) {
		var _ = this;
		_.shouldClick === !1 && (event.stopImmediatePropagation(), event.stopPropagation(), event.preventDefault())
	}, Slick.prototype.destroy = function(refresh) {
		var _ = this;
		_.autoPlayClear(), _.touchObject = {}, _.cleanUpEvents(), $(".slick-cloned", _.$slider).detach(), _.$dots && _.$dots.remove(), _.$prevArrow && _.$prevArrow.length && (_.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), _.htmlExpr.test(_.options.prevArrow) && _.$prevArrow.remove()), _.$nextArrow && _.$nextArrow.length && (_.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), _.htmlExpr.test(_.options.nextArrow) && _.$nextArrow.remove()), _.$slides && (_.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
			$(this).attr("style", $(this).data("originalStyling"))
		}), _.$slideTrack.children(this.options.slide).detach(), _.$slideTrack.detach(), _.$list.detach(), _.$slider.append(_.$slides)), _.cleanUpRows(), _.$slider.removeClass("slick-slider"), _.$slider.removeClass("slick-initialized"), _.$slider.removeClass("slick-dotted"), _.unslicked = !0, refresh || _.$slider.trigger("destroy", [_])
	}, Slick.prototype.disableTransition = function(slide) {
		var _ = this,
			transition = {};
		transition[_.transitionType] = "", _.options.fade === !1 ? _.$slideTrack.css(transition) : _.$slides.eq(slide).css(transition)
	}, Slick.prototype.fadeSlide = function(slideIndex, callback) {
		var _ = this;
		_.cssTransitions === !1 ? (_.$slides.eq(slideIndex).css({
			zIndex: _.options.zIndex
		}), _.$slides.eq(slideIndex).animate({
			opacity: 1
		}, _.options.speed, _.options.easing, callback)) : (_.applyTransition(slideIndex), _.$slides.eq(slideIndex).css({
			opacity: 1,
			zIndex: _.options.zIndex
		}), callback && setTimeout(function() {
			_.disableTransition(slideIndex), callback.call()
		}, _.options.speed))
	}, Slick.prototype.fadeSlideOut = function(slideIndex) {
		var _ = this;
		_.cssTransitions === !1 ? _.$slides.eq(slideIndex).animate({
			opacity: 0,
			zIndex: _.options.zIndex - 2
		}, _.options.speed, _.options.easing) : (_.applyTransition(slideIndex), _.$slides.eq(slideIndex).css({
			opacity: 0,
			zIndex: _.options.zIndex - 2
		}))
	}, Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {
		var _ = this;
		null !== filter && (_.$slidesCache = _.$slides, _.unload(), _.$slideTrack.children(this.options.slide).detach(), _.$slidesCache.filter(filter).appendTo(_.$slideTrack), _.reinit())
	}, Slick.prototype.focusHandler = function() {
		var _ = this;
		_.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(event) {
			event.stopImmediatePropagation();
			var $sf = $(this);
			setTimeout(function() {
				_.options.pauseOnFocus && (_.focussed = $sf.is(":focus"), _.autoPlay())
			}, 0)
		})
	}, Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {
		var _ = this;
		return _.currentSlide
	}, Slick.prototype.getDotCount = function() {
		var _ = this,
			breakPoint = 0,
			counter = 0,
			pagerQty = 0;
		if (_.options.infinite === !0) for (; breakPoint < _.slideCount;)++pagerQty, breakPoint = counter + _.options.slidesToScroll, counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
		else if (_.options.centerMode === !0) pagerQty = _.slideCount;
		else if (_.options.asNavFor) for (; breakPoint < _.slideCount;)++pagerQty, breakPoint = counter + _.options.slidesToScroll, counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
		else pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
		return pagerQty - 1
	}, Slick.prototype.getLeft = function(slideIndex) {
		var targetLeft, verticalHeight, targetSlide, _ = this,
			verticalOffset = 0;
		return _.slideOffset = 0, verticalHeight = _.$slides.first().outerHeight(!0), _.options.infinite === !0 ? (_.slideCount > _.options.slidesToShow && (_.slideOffset = _.slideWidth * _.options.slidesToShow * -1, verticalOffset = verticalHeight * _.options.slidesToShow * -1), _.slideCount % _.options.slidesToScroll !== 0 && slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow && (slideIndex > _.slideCount ? (_.slideOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth * -1, verticalOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight * -1) : (_.slideOffset = _.slideCount % _.options.slidesToScroll * _.slideWidth * -1, verticalOffset = _.slideCount % _.options.slidesToScroll * verticalHeight * -1))) : slideIndex + _.options.slidesToShow > _.slideCount && (_.slideOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * _.slideWidth, verticalOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * verticalHeight), _.slideCount <= _.options.slidesToShow && (_.slideOffset = 0, verticalOffset = 0), _.options.centerMode === !0 && _.slideCount <= _.options.slidesToShow ? _.slideOffset = _.slideWidth * Math.floor(_.options.slidesToShow) / 2 - _.slideWidth * _.slideCount / 2 : _.options.centerMode === !0 && _.options.infinite === !0 && (_.slideOffset = 0, _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2)), targetLeft = _.options.vertical === !1 ? slideIndex * _.slideWidth * -1 + _.slideOffset : slideIndex * verticalHeight * -1 + verticalOffset, _.options.variableWidth === !0 && (targetSlide = _.slideCount <= _.options.slidesToShow || _.options.infinite === !1 ? _.$slideTrack.children(".slick-slide").eq(slideIndex) : _.$slideTrack.children(".slick-slide").eq(slideIndex + _.options.slidesToShow), targetLeft = _.options.rtl === !0 ? targetSlide[0] ? (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1 : 0 : targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0, _.options.centerMode === !0 && (targetSlide = _.slideCount <= _.options.slidesToShow || _.options.infinite === !1 ? _.$slideTrack.children(".slick-slide").eq(slideIndex) : _.$slideTrack.children(".slick-slide").eq(slideIndex + _.options.slidesToShow + 1), targetLeft = _.options.rtl === !0 ? targetSlide[0] ? (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1 : 0 : targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0, targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2)), targetLeft
	}, Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {
		var _ = this;
		return _.options[option]
	}, Slick.prototype.getNavigableIndexes = function() {
		var max, _ = this,
			breakPoint = 0,
			counter = 0,
			indexes = [];
		for (_.options.infinite === !1 ? max = _.slideCount : (breakPoint = _.options.slidesToScroll * -1, counter = _.options.slidesToScroll * -1, max = 2 * _.slideCount); breakPoint < max;) indexes.push(breakPoint), breakPoint = counter + _.options.slidesToScroll, counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
		return indexes
	}, Slick.prototype.getSlick = function() {
		return this
	}, Slick.prototype.getSlideCount = function() {
		var slidesTraversed, swipedSlide, centerOffset, _ = this;
		return centerOffset = _.options.centerMode === !0 ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0, _.options.swipeToSlide === !0 ? (_.$slideTrack.find(".slick-slide").each(function(index, slide) {
			if (slide.offsetLeft - centerOffset + $(slide).outerWidth() / 2 > _.swipeLeft * -1) return swipedSlide = slide, !1
		}), slidesTraversed = Math.abs($(swipedSlide).attr("data-slick-index") - _.currentSlide) || 1) : _.options.slidesToScroll
	}, Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {
		var _ = this;
		_.changeSlide({
			data: {
				message: "index",
				index: parseInt(slide)
			}
		}, dontAnimate)
	}, Slick.prototype.init = function(creation) {
		var _ = this;
		$(_.$slider).hasClass("slick-initialized") || ($(_.$slider).addClass("slick-initialized"), _.buildRows(), _.buildOut(), _.setProps(), _.startLoad(), _.loadSlider(), _.initializeEvents(), _.updateArrows(), _.updateDots(), _.checkResponsive(!0), _.focusHandler()), creation && _.$slider.trigger("init", [_]), _.options.accessibility === !0 && _.initADA(), _.options.autoplay && (_.paused = !1, _.autoPlay())
	}, Slick.prototype.initADA = function() {
		var _ = this;
		_.$slides.add(_.$slideTrack.find(".slick-cloned")).attr({
			"aria-hidden": "true",
			tabindex: "-1"
		}).find("a, input, button, select").attr({
			tabindex: "-1"
		}), _.$slideTrack.attr("role", "listbox"), _.$slides.not(_.$slideTrack.find(".slick-cloned")).each(function(i) {
			$(this).attr({
				role: "option",
				"aria-describedby": "slick-slide" + _.instanceUid + i
			})
		}), null !== _.$dots && _.$dots.attr("role", "tablist").find("li").each(function(i) {
			$(this).attr({
				role: "presentation",
				"aria-selected": "false",
				"aria-controls": "navigation" + _.instanceUid + i,
				id: "slick-slide" + _.instanceUid + i
			})
		}).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), _.activateADA()
	}, Slick.prototype.initArrowEvents = function() {
		var _ = this;
		_.options.arrows === !0 && _.slideCount > _.options.slidesToShow && (_.$prevArrow.off("click.slick").on("click.slick", {
			message: "previous"
		}, _.changeSlide), _.$nextArrow.off("click.slick").on("click.slick", {
			message: "next"
		}, _.changeSlide))
	}, Slick.prototype.initDotEvents = function() {
		var _ = this;
		_.options.dots === !0 && _.slideCount > _.options.slidesToShow && $("li", _.$dots).on("click.slick", {
			message: "index"
		}, _.changeSlide), _.options.dots === !0 && _.options.pauseOnDotsHover === !0 && $("li", _.$dots).on("mouseenter.slick", $.proxy(_.interrupt, _, !0)).on("mouseleave.slick", $.proxy(_.interrupt, _, !1))
	}, Slick.prototype.initSlideEvents = function() {
		var _ = this;
		_.options.pauseOnHover && (_.$list.on("mouseenter.slick", $.proxy(_.interrupt, _, !0)), _.$list.on("mouseleave.slick", $.proxy(_.interrupt, _, !1)))
	}, Slick.prototype.initializeEvents = function() {
		var _ = this;
		_.initArrowEvents(), _.initDotEvents(), _.initSlideEvents(), _.$list.on("touchstart.slick mousedown.slick", {
			action: "start"
		}, _.swipeHandler), _.$list.on("touchmove.slick mousemove.slick", {
			action: "move"
		}, _.swipeHandler), _.$list.on("touchend.slick mouseup.slick", {
			action: "end"
		}, _.swipeHandler), _.$list.on("touchcancel.slick mouseleave.slick", {
			action: "end"
		}, _.swipeHandler), _.$list.on("click.slick", _.clickHandler), $(document).on(_.visibilityChange, $.proxy(_.visibility, _)), _.options.accessibility === !0 && _.$list.on("keydown.slick", _.keyHandler), _.options.focusOnSelect === !0 && $(_.$slideTrack).children().on("click.slick", _.selectHandler), $(window).on("orientationchange.slick.slick-" + _.instanceUid, $.proxy(_.orientationChange, _)), $(window).on("resize.slick.slick-" + _.instanceUid, $.proxy(_.resize, _)), $("[draggable!=true]", _.$slideTrack).on("dragstart", _.preventDefault), $(window).on("load.slick.slick-" + _.instanceUid, _.setPosition), $(document).on("ready.slick.slick-" + _.instanceUid, _.setPosition)
	}, Slick.prototype.initUI = function() {
		var _ = this;
		_.options.arrows === !0 && _.slideCount > _.options.slidesToShow && (_.$prevArrow.show(), _.$nextArrow.show()), _.options.dots === !0 && _.slideCount > _.options.slidesToShow && _.$dots.show()
	}, Slick.prototype.keyHandler = function(event) {
		var _ = this;
		event.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === event.keyCode && _.options.accessibility === !0 ? _.changeSlide({
			data: {
				message: _.options.rtl === !0 ? "next" : "previous"
			}
		}) : 39 === event.keyCode && _.options.accessibility === !0 && _.changeSlide({
			data: {
				message: _.options.rtl === !0 ? "previous" : "next"
			}
		}))
	}, Slick.prototype.lazyLoad = function() {
		function loadImages(imagesScope) {
			$("img[data-lazy]", imagesScope).each(function() {
				var image = $(this),
					imageSource = $(this).attr("data-lazy"),
					imageToLoad = document.createElement("img");
				imageToLoad.onload = function() {
					image.animate({
						opacity: 0
					}, 100, function() {
						image.attr("src", imageSource).animate({
							opacity: 1
						}, 200, function() {
							image.removeAttr("data-lazy").removeClass("slick-loading")
						}), _.$slider.trigger("lazyLoaded", [_, image, imageSource])
					})
				}, imageToLoad.onerror = function() {
					image.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), _.$slider.trigger("lazyLoadError", [_, image, imageSource])
				}, imageToLoad.src = imageSource
			})
		}
		var loadRange, cloneRange, rangeStart, rangeEnd, _ = this;
		_.options.centerMode === !0 ? _.options.infinite === !0 ? (rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1), rangeEnd = rangeStart + _.options.slidesToShow + 2) : (rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1)), rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide) : (rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide, rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow), _.options.fade === !0 && (rangeStart > 0 && rangeStart--, rangeEnd <= _.slideCount && rangeEnd++)), loadRange = _.$slider.find(".slick-slide").slice(rangeStart, rangeEnd), loadImages(loadRange), _.slideCount <= _.options.slidesToShow ? (cloneRange = _.$slider.find(".slick-slide"), loadImages(cloneRange)) : _.currentSlide >= _.slideCount - _.options.slidesToShow ? (cloneRange = _.$slider.find(".slick-cloned").slice(0, _.options.slidesToShow), loadImages(cloneRange)) : 0 === _.currentSlide && (cloneRange = _.$slider.find(".slick-cloned").slice(_.options.slidesToShow * -1), loadImages(cloneRange))
	}, Slick.prototype.loadSlider = function() {
		var _ = this;
		_.setPosition(), _.$slideTrack.css({
			opacity: 1
		}), _.$slider.removeClass("slick-loading"), _.initUI(), "progressive" === _.options.lazyLoad && _.progressiveLazyLoad()
	}, Slick.prototype.next = Slick.prototype.slickNext = function() {
		var _ = this;
		_.changeSlide({
			data: {
				message: "next"
			}
		})
	}, Slick.prototype.orientationChange = function() {
		var _ = this;
		_.checkResponsive(), _.setPosition()
	}, Slick.prototype.pause = Slick.prototype.slickPause = function() {
		var _ = this;
		_.autoPlayClear(), _.paused = !0
	}, Slick.prototype.play = Slick.prototype.slickPlay = function() {
		var _ = this;
		_.autoPlay(), _.options.autoplay = !0, _.paused = !1, _.focussed = !1, _.interrupted = !1
	}, Slick.prototype.postSlide = function(index) {
		var _ = this;
		_.unslicked || (_.$slider.trigger("afterChange", [_, index]), _.animating = !1, _.setPosition(), _.swipeLeft = null, _.options.autoplay && _.autoPlay(), _.options.accessibility === !0 && _.initADA())
	}, Slick.prototype.prev = Slick.prototype.slickPrev = function() {
		var _ = this;
		_.changeSlide({
			data: {
				message: "previous"
			}
		})
	}, Slick.prototype.preventDefault = function(event) {
		event.preventDefault()
	}, Slick.prototype.progressiveLazyLoad = function(tryCount) {
		tryCount = tryCount || 1;
		var image, imageSource, imageToLoad, _ = this,
			$imgsToLoad = $("img[data-lazy]", _.$slider);
		$imgsToLoad.length ? (image = $imgsToLoad.first(), imageSource = image.attr("data-lazy"), imageToLoad = document.createElement("img"), imageToLoad.onload = function() {
			image.attr("src", imageSource).removeAttr("data-lazy").removeClass("slick-loading"), _.options.adaptiveHeight === !0 && _.setPosition(), _.$slider.trigger("lazyLoaded", [_, image, imageSource]), _.progressiveLazyLoad()
		}, imageToLoad.onerror = function() {
			tryCount < 3 ? setTimeout(function() {
				_.progressiveLazyLoad(tryCount + 1)
			}, 500) : (image.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), _.$slider.trigger("lazyLoadError", [_, image, imageSource]), _.progressiveLazyLoad())
		}, imageToLoad.src = imageSource) : _.$slider.trigger("allImagesLoaded", [_])
	}, Slick.prototype.refresh = function(initializing) {
		var currentSlide, lastVisibleIndex, _ = this;
		lastVisibleIndex = _.slideCount - _.options.slidesToShow, !_.options.infinite && _.currentSlide > lastVisibleIndex && (_.currentSlide = lastVisibleIndex), _.slideCount <= _.options.slidesToShow && (_.currentSlide = 0), currentSlide = _.currentSlide, _.destroy(!0), $.extend(_, _.initials, {
			currentSlide: currentSlide
		}), _.init(), initializing || _.changeSlide({
			data: {
				message: "index",
				index: currentSlide
			}
		}, !1)
	}, Slick.prototype.registerBreakpoints = function() {
		var breakpoint, currentBreakpoint, l, _ = this,
			responsiveSettings = _.options.responsive || null;
		if ("array" === $.type(responsiveSettings) && responsiveSettings.length) {
			_.respondTo = _.options.respondTo || "window";
			for (breakpoint in responsiveSettings) if (l = _.breakpoints.length - 1, currentBreakpoint = responsiveSettings[breakpoint].breakpoint, responsiveSettings.hasOwnProperty(breakpoint)) {
				for (; l >= 0;) _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint && _.breakpoints.splice(l, 1), l--;
				_.breakpoints.push(currentBreakpoint), _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings
			}
			_.breakpoints.sort(function(a, b) {
				return _.options.mobileFirst ? a - b : b - a
			})
		}
	}, Slick.prototype.reinit = function() {
		var _ = this;
		_.$slides = _.$slideTrack.children(_.options.slide).addClass("slick-slide"), _.slideCount = _.$slides.length, _.currentSlide >= _.slideCount && 0 !== _.currentSlide && (_.currentSlide = _.currentSlide - _.options.slidesToScroll), _.slideCount <= _.options.slidesToShow && (_.currentSlide = 0), _.registerBreakpoints(), _.setProps(), _.setupInfinite(), _.buildArrows(), _.updateArrows(), _.initArrowEvents(), _.buildDots(), _.updateDots(), _.initDotEvents(), _.cleanUpSlideEvents(), _.initSlideEvents(), _.checkResponsive(!1, !0), _.options.focusOnSelect === !0 && $(_.$slideTrack).children().on("click.slick", _.selectHandler), _.setSlideClasses("number" == typeof _.currentSlide ? _.currentSlide : 0), _.setPosition(), _.focusHandler(), _.paused = !_.options.autoplay, _.autoPlay(), _.$slider.trigger("reInit", [_])
	}, Slick.prototype.resize = function() {
		var _ = this;
		$(window).width() !== _.windowWidth && (clearTimeout(_.windowDelay), _.windowDelay = window.setTimeout(function() {
			_.windowWidth = $(window).width(), _.checkResponsive(), _.unslicked || _.setPosition()
		}, 50))
	}, Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {
		var _ = this;
		return "boolean" == typeof index ? (removeBefore = index, index = removeBefore === !0 ? 0 : _.slideCount - 1) : index = removeBefore === !0 ? --index : index, !(_.slideCount < 1 || index < 0 || index > _.slideCount - 1) && (_.unload(), removeAll === !0 ? _.$slideTrack.children().remove() : _.$slideTrack.children(this.options.slide).eq(index).remove(), _.$slides = _.$slideTrack.children(this.options.slide), _.$slideTrack.children(this.options.slide).detach(), _.$slideTrack.append(_.$slides), _.$slidesCache = _.$slides, void _.reinit())
	}, Slick.prototype.setCSS = function(position) {
		var x, y, _ = this,
			positionProps = {};
		_.options.rtl === !0 && (position = -position), x = "left" == _.positionProp ? Math.ceil(position) + "px" : "0px", y = "top" == _.positionProp ? Math.ceil(position) + "px" : "0px", positionProps[_.positionProp] = position, _.transformsEnabled === !1 ? _.$slideTrack.css(positionProps) : (positionProps = {}, _.cssTransitions === !1 ? (positionProps[_.animType] = "translate(" + x + ", " + y + ")", _.$slideTrack.css(positionProps)) : (positionProps[_.animType] = "translate3d(" + x + ", " + y + ", 0px)", _.$slideTrack.css(positionProps)))
	}, Slick.prototype.setDimensions = function() {
		var _ = this;
		_.options.vertical === !1 ? _.options.centerMode === !0 && _.$list.css({
			padding: "0px " + _.options.centerPadding
		}) : (_.$list.height(_.$slides.first().outerHeight(!0) * _.options.slidesToShow), _.options.centerMode === !0 && _.$list.css({
			padding: _.options.centerPadding + " 0px"
		})), _.listWidth = _.$list.width(), _.listHeight = _.$list.height(), _.options.vertical === !1 && _.options.variableWidth === !1 ? (_.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow), _.$slideTrack.width(Math.ceil(_.slideWidth * _.$slideTrack.children(".slick-slide").length))) : _.options.variableWidth === !0 ? _.$slideTrack.width(5e3 * _.slideCount) : (_.slideWidth = Math.ceil(_.listWidth), _.$slideTrack.height(Math.ceil(_.$slides.first().outerHeight(!0) * _.$slideTrack.children(".slick-slide").length)));
		var offset = _.$slides.first().outerWidth(!0) - _.$slides.first().width();
		_.options.variableWidth === !1 && _.$slideTrack.children(".slick-slide").width(_.slideWidth - offset)
	}, Slick.prototype.setFade = function() {
		var targetLeft, _ = this;
		_.$slides.each(function(index, element) {
			targetLeft = _.slideWidth * index * -1, _.options.rtl === !0 ? $(element).css({
				position: "relative",
				right: targetLeft,
				top: 0,
				zIndex: _.options.zIndex - 2,
				opacity: 0
			}) : $(element).css({
				position: "relative",
				left: targetLeft,
				top: 0,
				zIndex: _.options.zIndex - 2,
				opacity: 0
			})
		}), _.$slides.eq(_.currentSlide).css({
			zIndex: _.options.zIndex - 1,
			opacity: 1
		})
	}, Slick.prototype.setHeight = function() {
		var _ = this;
		if (1 === _.options.slidesToShow && _.options.adaptiveHeight === !0 && _.options.vertical === !1) {
			var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(!0);
			_.$list.css("height", targetHeight)
		}
	}, Slick.prototype.setOption = Slick.prototype.slickSetOption = function() {
		var l, item, option, value, type, _ = this,
			refresh = !1;
		if ("object" === $.type(arguments[0]) ? (option = arguments[0], refresh = arguments[1], type = "multiple") : "string" === $.type(arguments[0]) && (option = arguments[0], value = arguments[1], refresh = arguments[2], "responsive" === arguments[0] && "array" === $.type(arguments[1]) ? type = "responsive" : "undefined" != typeof arguments[1] && (type = "single")), "single" === type) _.options[option] = value;
		else if ("multiple" === type) $.each(option, function(opt, val) {
			_.options[opt] = val
		});
		else if ("responsive" === type) for (item in value) if ("array" !== $.type(_.options.responsive)) _.options.responsive = [value[item]];
		else {
			for (l = _.options.responsive.length - 1; l >= 0;) _.options.responsive[l].breakpoint === value[item].breakpoint && _.options.responsive.splice(l, 1), l--;
			_.options.responsive.push(value[item])
		}
		refresh && (_.unload(), _.reinit())
	}, Slick.prototype.setPosition = function() {
		var _ = this;
		_.setDimensions(), _.setHeight(), _.options.fade === !1 ? _.setCSS(_.getLeft(_.currentSlide)) : _.setFade(), _.$slider.trigger("setPosition", [_])
	}, Slick.prototype.setProps = function() {
		var _ = this,
			bodyStyle = document.body.style;
		_.positionProp = _.options.vertical === !0 ? "top" : "left", "top" === _.positionProp ? _.$slider.addClass("slick-vertical") : _.$slider.removeClass("slick-vertical"), void 0 === bodyStyle.WebkitTransition && void 0 === bodyStyle.MozTransition && void 0 === bodyStyle.msTransition || _.options.useCSS === !0 && (_.cssTransitions = !0), _.options.fade && ("number" == typeof _.options.zIndex ? _.options.zIndex < 3 && (_.options.zIndex = 3) : _.options.zIndex = _.defaults.zIndex), void 0 !== bodyStyle.OTransform && (_.animType = "OTransform", _.transformType = "-o-transform", _.transitionType = "OTransition", void 0 === bodyStyle.perspectiveProperty && void 0 === bodyStyle.webkitPerspective && (_.animType = !1)), void 0 !== bodyStyle.MozTransform && (_.animType = "MozTransform", _.transformType = "-moz-transform", _.transitionType = "MozTransition", void 0 === bodyStyle.perspectiveProperty && void 0 === bodyStyle.MozPerspective && (_.animType = !1)), void 0 !== bodyStyle.webkitTransform && (_.animType = "webkitTransform", _.transformType = "-webkit-transform", _.transitionType = "webkitTransition", void 0 === bodyStyle.perspectiveProperty && void 0 === bodyStyle.webkitPerspective && (_.animType = !1)), void 0 !== bodyStyle.msTransform && (_.animType = "msTransform", _.transformType = "-ms-transform", _.transitionType = "msTransition", void 0 === bodyStyle.msTransform && (_.animType = !1)), void 0 !== bodyStyle.transform && _.animType !== !1 && (_.animType = "transform", _.transformType = "transform", _.transitionType = "transition"), _.transformsEnabled = _.options.useTransform && null !== _.animType && _.animType !== !1
	}, Slick.prototype.setSlideClasses = function(index) {
		var centerOffset, allSlides, indexOffset, remainder, _ = this;
		allSlides = _.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), _.$slides.eq(index).addClass("slick-current"), _.options.centerMode === !0 ? (centerOffset = Math.floor(_.options.slidesToShow / 2), _.options.infinite === !0 && (index >= centerOffset && index <= _.slideCount - 1 - centerOffset ? _.$slides.slice(index - centerOffset, index + centerOffset + 1).addClass("slick-active").attr("aria-hidden", "false") : (indexOffset = _.options.slidesToShow + index, allSlides.slice(indexOffset - centerOffset + 1, indexOffset + centerOffset + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === index ? allSlides.eq(allSlides.length - 1 - _.options.slidesToShow).addClass("slick-center") : index === _.slideCount - 1 && allSlides.eq(_.options.slidesToShow).addClass("slick-center")), _.$slides.eq(index).addClass("slick-center")) : index >= 0 && index <= _.slideCount - _.options.slidesToShow ? _.$slides.slice(index, index + _.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : allSlides.length <= _.options.slidesToShow ? allSlides.addClass("slick-active").attr("aria-hidden", "false") : (remainder = _.slideCount % _.options.slidesToShow, indexOffset = _.options.infinite === !0 ? _.options.slidesToShow + index : index, _.options.slidesToShow == _.options.slidesToScroll && _.slideCount - index < _.options.slidesToShow ? allSlides.slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder).addClass("slick-active").attr("aria-hidden", "false") : allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === _.options.lazyLoad && _.lazyLoad()
	}, Slick.prototype.setupInfinite = function() {
		var i, slideIndex, infiniteCount, _ = this;
		if (_.options.fade === !0 && (_.options.centerMode = !1), _.options.infinite === !0 && _.options.fade === !1 && (slideIndex = null, _.slideCount > _.options.slidesToShow)) {
			for (infiniteCount = _.options.centerMode === !0 ? _.options.slidesToShow + 1 : _.options.slidesToShow, i = _.slideCount; i > _.slideCount - infiniteCount; i -= 1) slideIndex = i - 1, $(_.$slides[slideIndex]).clone(!0).attr("id", "").attr("data-slick-index", slideIndex - _.slideCount).prependTo(_.$slideTrack).addClass("slick-cloned");
			for (i = 0; i < infiniteCount; i += 1) slideIndex = i, $(_.$slides[slideIndex]).clone(!0).attr("id", "").attr("data-slick-index", slideIndex + _.slideCount).appendTo(_.$slideTrack).addClass("slick-cloned");
			_.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
				$(this).attr("id", "")
			})
		}
	}, Slick.prototype.interrupt = function(toggle) {
		var _ = this;
		toggle || _.autoPlay(), _.interrupted = toggle
	}, Slick.prototype.selectHandler = function(event) {
		var _ = this,
			targetElement = $(event.target).is(".slick-slide") ? $(event.target) : $(event.target).parents(".slick-slide"),
			index = parseInt(targetElement.attr("data-slick-index"));
		return index || (index = 0), _.slideCount <= _.options.slidesToShow ? (_.setSlideClasses(index), void _.asNavFor(index)) : void _.slideHandler(index)
	}, Slick.prototype.slideHandler = function(index, sync, dontAnimate) {
		var targetSlide, animSlide, oldSlide, slideLeft, navTarget, targetLeft = null,
			_ = this;
		if (sync = sync || !1, (_.animating !== !0 || _.options.waitForAnimate !== !0) && !(_.options.fade === !0 && _.currentSlide === index || _.slideCount <= _.options.slidesToShow)) return sync === !1 && _.asNavFor(index), targetSlide = index, targetLeft = _.getLeft(targetSlide), slideLeft = _.getLeft(_.currentSlide), _.currentLeft = null === _.swipeLeft ? slideLeft : _.swipeLeft, _.options.infinite === !1 && _.options.centerMode === !1 && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll) ? void(_.options.fade === !1 && (targetSlide = _.currentSlide, dontAnimate !== !0 ? _.animateSlide(slideLeft, function() {
			_.postSlide(targetSlide)
		}) : _.postSlide(targetSlide))) : _.options.infinite === !1 && _.options.centerMode === !0 && (index < 0 || index > _.slideCount - _.options.slidesToScroll) ? void(_.options.fade === !1 && (targetSlide = _.currentSlide, dontAnimate !== !0 ? _.animateSlide(slideLeft, function() {
			_.postSlide(targetSlide)
		}) : _.postSlide(targetSlide))) : (_.options.autoplay && clearInterval(_.autoPlayTimer), animSlide = targetSlide < 0 ? _.slideCount % _.options.slidesToScroll !== 0 ? _.slideCount - _.slideCount % _.options.slidesToScroll : _.slideCount + targetSlide : targetSlide >= _.slideCount ? _.slideCount % _.options.slidesToScroll !== 0 ? 0 : targetSlide - _.slideCount : targetSlide, _.animating = !0, _.$slider.trigger("beforeChange", [_, _.currentSlide, animSlide]), oldSlide = _.currentSlide, _.currentSlide = animSlide, _.setSlideClasses(_.currentSlide), _.options.asNavFor && (navTarget = _.getNavTarget(), navTarget = navTarget.slick("getSlick"), navTarget.slideCount <= navTarget.options.slidesToShow && navTarget.setSlideClasses(_.currentSlide)), _.updateDots(), _.updateArrows(), _.options.fade === !0 ? (dontAnimate !== !0 ? (_.fadeSlideOut(oldSlide), _.fadeSlide(animSlide, function() {
			_.postSlide(animSlide)
		})) : _.postSlide(animSlide), void _.animateHeight()) : void(dontAnimate !== !0 ? _.animateSlide(targetLeft, function() {
			_.postSlide(animSlide)
		}) : _.postSlide(animSlide)))
	}, Slick.prototype.startLoad = function() {
		var _ = this;
		_.options.arrows === !0 && _.slideCount > _.options.slidesToShow && (_.$prevArrow.hide(), _.$nextArrow.hide()), _.options.dots === !0 && _.slideCount > _.options.slidesToShow && _.$dots.hide(), _.$slider.addClass("slick-loading")
	}, Slick.prototype.swipeDirection = function() {
		var xDist, yDist, r, swipeAngle, _ = this;
		return xDist = _.touchObject.startX - _.touchObject.curX, yDist = _.touchObject.startY - _.touchObject.curY, r = Math.atan2(yDist, xDist), swipeAngle = Math.round(180 * r / Math.PI), swipeAngle < 0 && (swipeAngle = 360 - Math.abs(swipeAngle)), swipeAngle <= 45 && swipeAngle >= 0 ? _.options.rtl === !1 ? "left" : "right" : swipeAngle <= 360 && swipeAngle >= 315 ? _.options.rtl === !1 ? "left" : "right" : swipeAngle >= 135 && swipeAngle <= 225 ? _.options.rtl === !1 ? "right" : "left" : _.options.verticalSwiping === !0 ? swipeAngle >= 35 && swipeAngle <= 135 ? "down" : "up" : "vertical"
	}, Slick.prototype.swipeEnd = function(event) {
		var slideCount, direction, _ = this;
		if (_.dragging = !1, _.interrupted = !1, _.shouldClick = !(_.touchObject.swipeLength > 10), void 0 === _.touchObject.curX) return !1;
		if (_.touchObject.edgeHit === !0 && _.$slider.trigger("edge", [_, _.swipeDirection()]), _.touchObject.swipeLength >= _.touchObject.minSwipe) {
			switch (direction = _.swipeDirection()) {
			case "left":
			case "down":
				slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount(), _.currentDirection = 0;
				break;
			case "right":
			case "up":
				slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount(), _.currentDirection = 1
			}
			"vertical" != direction && (_.slideHandler(slideCount), _.touchObject = {}, _.$slider.trigger("swipe", [_, direction]))
		} else _.touchObject.startX !== _.touchObject.curX && (_.slideHandler(_.currentSlide), _.touchObject = {})
	}, Slick.prototype.swipeHandler = function(event) {
		var _ = this;
		if (!(_.options.swipe === !1 || "ontouchend" in document && _.options.swipe === !1 || _.options.draggable === !1 && event.type.indexOf("mouse") !== -1)) switch (_.touchObject.fingerCount = event.originalEvent && void 0 !== event.originalEvent.touches ? event.originalEvent.touches.length : 1, _.touchObject.minSwipe = _.listWidth / _.options.touchThreshold, _.options.verticalSwiping === !0 && (_.touchObject.minSwipe = _.listHeight / _.options.touchThreshold), event.data.action) {
		case "start":
			_.swipeStart(event);
			break;
		case "move":
			_.swipeMove(event);
			break;
		case "end":
			_.swipeEnd(event)
		}
	}, Slick.prototype.swipeMove = function(event) {
		var curLeft, swipeDirection, swipeLength, positionOffset, touches, _ = this;
		return touches = void 0 !== event.originalEvent ? event.originalEvent.touches : null, !(!_.dragging || touches && 1 !== touches.length) && (curLeft = _.getLeft(_.currentSlide), _.touchObject.curX = void 0 !== touches ? touches[0].pageX : event.clientX, _.touchObject.curY = void 0 !== touches ? touches[0].pageY : event.clientY, _.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2))), _.options.verticalSwiping === !0 && (_.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2)))), swipeDirection = _.swipeDirection(), "vertical" !== swipeDirection ? (void 0 !== event.originalEvent && _.touchObject.swipeLength > 4 && event.preventDefault(), positionOffset = (_.options.rtl === !1 ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1), _.options.verticalSwiping === !0 && (positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1), swipeLength = _.touchObject.swipeLength, _.touchObject.edgeHit = !1, _.options.infinite === !1 && (0 === _.currentSlide && "right" === swipeDirection || _.currentSlide >= _.getDotCount() && "left" === swipeDirection) && (swipeLength = _.touchObject.swipeLength * _.options.edgeFriction, _.touchObject.edgeHit = !0), _.options.vertical === !1 ? _.swipeLeft = curLeft + swipeLength * positionOffset : _.swipeLeft = curLeft + swipeLength * (_.$list.height() / _.listWidth) * positionOffset, _.options.verticalSwiping === !0 && (_.swipeLeft = curLeft + swipeLength * positionOffset), _.options.fade !== !0 && _.options.touchMove !== !1 && (_.animating === !0 ? (_.swipeLeft = null, !1) : void _.setCSS(_.swipeLeft))) : void 0)
	}, Slick.prototype.swipeStart = function(event) {
		var touches, _ = this;
		return _.interrupted = !0, 1 !== _.touchObject.fingerCount || _.slideCount <= _.options.slidesToShow ? (_.touchObject = {}, !1) : (void 0 !== event.originalEvent && void 0 !== event.originalEvent.touches && (touches = event.originalEvent.touches[0]), _.touchObject.startX = _.touchObject.curX = void 0 !== touches ? touches.pageX : event.clientX, _.touchObject.startY = _.touchObject.curY = void 0 !== touches ? touches.pageY : event.clientY, void(_.dragging = !0))
	}, Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {
		var _ = this;
		null !== _.$slidesCache && (_.unload(), _.$slideTrack.children(this.options.slide).detach(), _.$slidesCache.appendTo(_.$slideTrack), _.reinit())
	}, Slick.prototype.unload = function() {
		var _ = this;
		$(".slick-cloned", _.$slider).remove(), _.$dots && _.$dots.remove(), _.$prevArrow && _.htmlExpr.test(_.options.prevArrow) && _.$prevArrow.remove(), _.$nextArrow && _.htmlExpr.test(_.options.nextArrow) && _.$nextArrow.remove(), _.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
	}, Slick.prototype.unslick = function(fromBreakpoint) {
		var _ = this;
		_.$slider.trigger("unslick", [_, fromBreakpoint]), _.destroy()
	}, Slick.prototype.updateArrows = function() {
		var centerOffset, _ = this;
		centerOffset = Math.floor(_.options.slidesToShow / 2), _.options.arrows === !0 && _.slideCount > _.options.slidesToShow && !_.options.infinite && (_.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), _.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === _.currentSlide ? (_.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), _.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : _.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === !1 ? (_.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), _.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : _.currentSlide >= _.slideCount - 1 && _.options.centerMode === !0 && (_.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), _.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
	}, Slick.prototype.updateDots = function() {
		var _ = this;
		null !== _.$dots && (_.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), _.$dots.find("li").eq(Math.floor(_.currentSlide / _.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
	}, Slick.prototype.visibility = function() {
		var _ = this;
		_.options.autoplay && (document[_.hidden] ? _.interrupted = !0 : _.interrupted = !1)
	}, $.fn.slick = function() {
		var i, ret, _ = this,
			opt = arguments[0],
			args = Array.prototype.slice.call(arguments, 1),
			l = _.length;
		for (i = 0; i < l; i++) if ("object" == typeof opt || "undefined" == typeof opt ? _[i].slick = new Slick(_[i], opt) : ret = _[i].slick[opt].apply(_[i].slick, args), "undefined" != typeof ret) return ret;
		return _
	}
});
$(document).ready(function() {
	var slickConfig = {
		infinite: !0,
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 3,
		responsive: [{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}, {
			breakpoint: 699,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			}
		}]
	};
	$(".slick-class").slick(slickConfig), $(document).on("initDom", function(e) {
		$(e.target).find(".slick-class").slick(slickConfig)
	})
});
var ICA = ICA || {};
!
function($, window, document, ICA, undefisned) {
	ICA.youtube = function() {
		function _youtube() {
			var context = ($(document), this),
				youTubeVideoSelector = ".youtube-video .video-placeholder",
				youTubeButtonSelector = ".start-video";
			context.players = {}, context.init = function() {
				initAttachEvents()
			};
			var initAttachEvents = function() {
					addYouTubeAPI()
				},
				addYouTubeAPI = function() {
					var tag = document.createElement("script");
					tag.src = "https://www.youtube.com/iframe_api";
					var firstScriptTag = document.getElementsByTagName("script")[0];
					firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
				},
				getFrameID = function(obj) {
					return obj.attr("id")
				},
				getVideoID = function(obj) {
					return obj.data("id")
				},
				getPlayer = function(frameID) {
					return context.players[frameID]
				},
				addEvent = function(frameID) {
					var player = getPlayer(frameID);
					button = $("#" + frameID).prev(youTubeButtonSelector), button.on("click", function() {
						$(this).fadeOut(250), player.playVideo()
					})
				},
				onStateChange = function(event) {
					if (event.data == YT.PlayerState.ENDED || event.data == YT.PlayerState.PAUSED) {
						var parent = $(event.target.d).parent();
						parent.children(youTubeButtonSelector).fadeIn(250)
					} else if (event.data == YT.PlayerState.PLAYING) {
						var parent = $(event.target.d).parent();
						parent.children(youTubeButtonSelector).fadeOut(250)
					}
				};
			return window.onYouTubeIframeAPIReady = function() {
				$(youTubeVideoSelector).each(function() {
					var frameID = getFrameID($(this)),
						videoID = getVideoID($(this));
					frameID && videoID && (context.players[frameID] = new YT.Player(frameID, {
						height: "",
						width: "",
						videoId: videoID,
						events: {
							onReady: function(e) {
								addEvent(frameID)
							},
							onStateChange: onStateChange
						},
						playerVars: {
							autoplay: "0",
							showinfo: "0",
							autohide: "1",
							modestbranding: "1",
							controls: "1",
							rel: "0",
							wmode: "transparent"
						}
					}))
				})
			}, context
		}
		return new _youtube
	}()
}(jQuery, this, this.document, ICA);
!
function(f) {
	if ("object" == typeof exports && "undefined" != typeof module) module.exports = f();
	else if ("function" == typeof define && define.amd) define([], f);
	else {
		var g;
		g = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, g.Clipboard = f()
	}
}(function() {
	var define;
	return function e(t, n, r) {
		function s(o, u) {
			if (!n[o]) {
				if (!t[o]) {
					var a = "function" == typeof require && require;
					if (!u && a) return a(o, !0);
					if (i) return i(o, !0);
					var f = new Error("Cannot find module '" + o + "'");
					throw f.code = "MODULE_NOT_FOUND", f
				}
				var l = n[o] = {
					exports: {}
				};
				t[o][0].call(l.exports, function(e) {
					var n = t[o][1][e];
					return s(n ? n : e)
				}, l, l.exports, e, t, n, r)
			}
			return n[o].exports
		}
		for (var i = "function" == typeof require && require, o = 0; o < r.length; o++) s(r[o]);
		return s
	}({
		1: [function(require, module, exports) {
			var matches = require("matches-selector");
			module.exports = function(element, selector, checkYoSelf) {
				for (var parent = checkYoSelf ? element : element.parentNode; parent && parent !== document;) {
					if (matches(parent, selector)) return parent;
					parent = parent.parentNode
				}
			}
		}, {
			"matches-selector": 5
		}],
		2: [function(require, module, exports) {
			function delegate(element, selector, type, callback, useCapture) {
				var listenerFn = listener.apply(this, arguments);
				return element.addEventListener(type, listenerFn, useCapture), {
					destroy: function() {
						element.removeEventListener(type, listenerFn, useCapture)
					}
				}
			}
			function listener(element, selector, type, callback) {
				return function(e) {
					e.delegateTarget = closest(e.target, selector, !0), e.delegateTarget && callback.call(element, e)
				}
			}
			var closest = require("closest");
			module.exports = delegate
		}, {
			closest: 1
		}],
		3: [function(require, module, exports) {
			exports.node = function(value) {
				return void 0 !== value && value instanceof HTMLElement && 1 === value.nodeType
			}, exports.nodeList = function(value) {
				var type = Object.prototype.toString.call(value);
				return void 0 !== value && ("[object NodeList]" === type || "[object HTMLCollection]" === type) && "length" in value && (0 === value.length || exports.node(value[0]))
			}, exports.string = function(value) {
				return "string" == typeof value || value instanceof String
			}, exports.fn = function(value) {
				var type = Object.prototype.toString.call(value);
				return "[object Function]" === type
			}
		}, {}],
		4: [function(require, module, exports) {
			function listen(target, type, callback) {
				if (!target && !type && !callback) throw new Error("Missing required arguments");
				if (!is.string(type)) throw new TypeError("Second argument must be a String");
				if (!is.fn(callback)) throw new TypeError("Third argument must be a Function");
				if (is.node(target)) return listenNode(target, type, callback);
				if (is.nodeList(target)) return listenNodeList(target, type, callback);
				if (is.string(target)) return listenSelector(target, type, callback);
				throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")
			}
			function listenNode(node, type, callback) {
				return node.addEventListener(type, callback), {
					destroy: function() {
						node.removeEventListener(type, callback)
					}
				}
			}
			function listenNodeList(nodeList, type, callback) {
				return Array.prototype.forEach.call(nodeList, function(node) {
					node.addEventListener(type, callback)
				}), {
					destroy: function() {
						Array.prototype.forEach.call(nodeList, function(node) {
							node.removeEventListener(type, callback)
						})
					}
				}
			}
			function listenSelector(selector, type, callback) {
				return delegate(document.body, selector, type, callback)
			}
			var is = require("./is"),
				delegate = require("delegate");
			module.exports = listen
		}, {
			"./is": 3,
			delegate: 2
		}],
		5: [function(require, module, exports) {
			function match(el, selector) {
				if (vendor) return vendor.call(el, selector);
				for (var nodes = el.parentNode.querySelectorAll(selector), i = 0; i < nodes.length; ++i) if (nodes[i] == el) return !0;
				return !1
			}
			var proto = Element.prototype,
				vendor = proto.matchesSelector || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;
			module.exports = match
		}, {}],
		6: [function(require, module, exports) {
			function select(element) {
				var selectedText;
				if ("INPUT" === element.nodeName || "TEXTAREA" === element.nodeName) element.focus(), element.setSelectionRange(0, element.value.length), selectedText = element.value;
				else {
					element.hasAttribute("contenteditable") && element.focus();
					var selection = window.getSelection(),
						range = document.createRange();
					range.selectNodeContents(element), selection.removeAllRanges(), selection.addRange(range), selectedText = selection.toString()
				}
				return selectedText
			}
			module.exports = select
		}, {}],
		7: [function(require, module, exports) {
			function E() {}
			E.prototype = {
				on: function(name, callback, ctx) {
					var e = this.e || (this.e = {});
					return (e[name] || (e[name] = [])).push({
						fn: callback,
						ctx: ctx
					}), this
				},
				once: function(name, callback, ctx) {
					function listener() {
						self.off(name, listener), callback.apply(ctx, arguments)
					}
					var self = this;
					return listener._ = callback, this.on(name, listener, ctx)
				},
				emit: function(name) {
					var data = [].slice.call(arguments, 1),
						evtArr = ((this.e || (this.e = {}))[name] || []).slice(),
						i = 0,
						len = evtArr.length;
					for (i; i < len; i++) evtArr[i].fn.apply(evtArr[i].ctx, data);
					return this
				},
				off: function(name, callback) {
					var e = this.e || (this.e = {}),
						evts = e[name],
						liveEvents = [];
					if (evts && callback) for (var i = 0, len = evts.length; i < len; i++) evts[i].fn !== callback && evts[i].fn._ !== callback && liveEvents.push(evts[i]);
					return liveEvents.length ? e[name] = liveEvents : delete e[name], this
				}
			}, module.exports = E
		}, {}],
		8: [function(require, module, exports) {
			!
			function(global, factory) {
				if ("function" == typeof define && define.amd) define(["module", "select"], factory);
				else if ("undefined" != typeof exports) factory(module, require("select"));
				else {
					var mod = {
						exports: {}
					};
					factory(mod, global.select), global.clipboardAction = mod.exports
				}
			}(this, function(module, _select) {
				"use strict";
				function _interopRequireDefault(obj) {
					return obj && obj.__esModule ? obj : {
					default:
						obj
					}
				}
				function _classCallCheck(instance, Constructor) {
					if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
				}
				var _select2 = _interopRequireDefault(_select),
					_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
				function(obj) {
					return typeof obj
				} : function(obj) {
					return obj && "function" == typeof Symbol && obj.constructor === Symbol ? "symbol" : typeof obj
				}, _createClass = function() {
					function defineProperties(target, props) {
						for (var i = 0; i < props.length; i++) {
							var descriptor = props[i];
							descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor)
						}
					}
					return function(Constructor, protoProps, staticProps) {
						return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor
					}
				}(), ClipboardAction = function() {
					function ClipboardAction(options) {
						_classCallCheck(this, ClipboardAction), this.resolveOptions(options), this.initSelection()
					}
					return ClipboardAction.prototype.resolveOptions = function() {
						var options = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
						this.action = options.action, this.emitter = options.emitter, this.target = options.target, this.text = options.text, this.trigger = options.trigger, this.selectedText = ""
					}, ClipboardAction.prototype.initSelection = function() {
						this.text ? this.selectFake() : this.target && this.selectTarget()
					}, ClipboardAction.prototype.selectFake = function() {
						var _this = this,
							isRTL = "rtl" == document.documentElement.getAttribute("dir");
						this.removeFake(), this.fakeHandler = document.body.addEventListener("click", function() {
							return _this.removeFake()
						}), this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "fixed", this.fakeElem.style[isRTL ? "right" : "left"] = "-9999px", this.fakeElem.style.top = (window.pageYOffset || document.documentElement.scrollTop) + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, document.body.appendChild(this.fakeElem), this.selectedText = (0, _select2.
					default)(this.fakeElem), this.copyText()
					}, ClipboardAction.prototype.removeFake = function() {
						this.fakeHandler && (document.body.removeEventListener("click"), this.fakeHandler = null), this.fakeElem && (document.body.removeChild(this.fakeElem), this.fakeElem = null)
					}, ClipboardAction.prototype.selectTarget = function() {
						this.selectedText = (0, _select2.
					default)(this.target), this.copyText()
					}, ClipboardAction.prototype.copyText = function() {
						var succeeded = void 0;
						try {
							succeeded = document.execCommand(this.action)
						} catch (err) {
							succeeded = !1
						}
						this.handleResult(succeeded)
					}, ClipboardAction.prototype.handleResult = function(succeeded) {
						succeeded ? this.emitter.emit("success", {
							action: this.action,
							text: this.selectedText,
							trigger: this.trigger,
							clearSelection: this.clearSelection.bind(this)
						}) : this.emitter.emit("error", {
							action: this.action,
							trigger: this.trigger,
							clearSelection: this.clearSelection.bind(this)
						})
					}, ClipboardAction.prototype.clearSelection = function() {
						this.target && this.target.blur(), window.getSelection().removeAllRanges()
					}, ClipboardAction.prototype.destroy = function() {
						this.removeFake()
					}, _createClass(ClipboardAction, [{
						key: "action",
						set: function() {
							var action = arguments.length <= 0 || void 0 === arguments[0] ? "copy" : arguments[0];
							if (this._action = action, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"')
						},
						get: function() {
							return this._action
						}
					}, {
						key: "target",
						set: function(target) {
							if (void 0 !== target) {
								if (!target || "object" !== ("undefined" == typeof target ? "undefined" : _typeof(target)) || 1 !== target.nodeType) throw new Error('Invalid "target" value, use a valid Element');
								if ("copy" === this.action && target.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
								if ("cut" === this.action && (target.hasAttribute("readonly") || target.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
								this._target = target
							}
						},
						get: function() {
							return this._target
						}
					}]), ClipboardAction
				}();
				module.exports = ClipboardAction
			})
		}, {
			select: 6
		}],
		9: [function(require, module, exports) {
			!
			function(global, factory) {
				if ("function" == typeof define && define.amd) define(["module", "./clipboard-action", "tiny-emitter", "good-listener"], factory);
				else if ("undefined" != typeof exports) factory(module, require("./clipboard-action"), require("tiny-emitter"), require("good-listener"));
				else {
					var mod = {
						exports: {}
					};
					factory(mod, global.clipboardAction, global.tinyEmitter, global.goodListener), global.clipboard = mod.exports
				}
			}(this, function(module, _clipboardAction, _tinyEmitter, _goodListener) {
				"use strict";
				function _interopRequireDefault(obj) {
					return obj && obj.__esModule ? obj : {
					default:
						obj
					}
				}
				function _classCallCheck(instance, Constructor) {
					if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
				}
				function _possibleConstructorReturn(self, call) {
					if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
					return !call || "object" != typeof call && "function" != typeof call ? self : call
				}
				function _inherits(subClass, superClass) {
					if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
					subClass.prototype = Object.create(superClass && superClass.prototype, {
						constructor: {
							value: subClass,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
				}
				function getAttributeValue(suffix, element) {
					var attribute = "data-clipboard-" + suffix;
					if (element.hasAttribute(attribute)) return element.getAttribute(attribute)
				}
				var _clipboardAction2 = _interopRequireDefault(_clipboardAction),
					_tinyEmitter2 = _interopRequireDefault(_tinyEmitter),
					_goodListener2 = _interopRequireDefault(_goodListener),
					Clipboard = function(_Emitter) {
						function Clipboard(trigger, options) {
							_classCallCheck(this, Clipboard);
							var _this = _possibleConstructorReturn(this, _Emitter.call(this));
							return _this.resolveOptions(options), _this.listenClick(trigger), _this
						}
						return _inherits(Clipboard, _Emitter), Clipboard.prototype.resolveOptions = function() {
							var options = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
							this.action = "function" == typeof options.action ? options.action : this.defaultAction, this.target = "function" == typeof options.target ? options.target : this.defaultTarget, this.text = "function" == typeof options.text ? options.text : this.defaultText
						}, Clipboard.prototype.listenClick = function(trigger) {
							var _this2 = this;
							this.listener = (0, _goodListener2.
						default)(trigger, "click", function(e) {
								return _this2.onClick(e)
							})
						}, Clipboard.prototype.onClick = function(e) {
							var trigger = e.delegateTarget || e.currentTarget;
							this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new _clipboardAction2.
						default ({
								action: this.action(trigger),
								target: this.target(trigger),
								text: this.text(trigger),
								trigger: trigger,
								emitter: this
							})
						}, Clipboard.prototype.defaultAction = function(trigger) {
							return getAttributeValue("action", trigger)
						}, Clipboard.prototype.defaultTarget = function(trigger) {
							var selector = getAttributeValue("target", trigger);
							if (selector) return document.querySelector(selector)
						}, Clipboard.prototype.defaultText = function(trigger) {
							return getAttributeValue("text", trigger)
						}, Clipboard.prototype.destroy = function() {
							this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null)
						}, Clipboard
					}(_tinyEmitter2.
				default);
				module.exports = Clipboard
			})
		}, {
			"./clipboard-action": 8,
			"good-listener": 4,
			"tiny-emitter": 7
		}]
	}, {}, [9])(9)
});
"use strict";
var SVGObjectHelper = {
	replaceAll: function(parent, cb) {
		parent = parent || document;
		var svgObjs = parent.querySelectorAll("object.svgsprite"),
			ready = function() {
				ready.count || (ready.count = 0), ready.count += 1, "function" == typeof cb && ready.count === svgObjs.length && cb()
			};
		return svgObjs.length ? void[].forEach.call(svgObjs, function(svgObj) {
			SVGObjectHelper.replace(svgObj, ready)
		}) : void("function" == typeof cb && cb())
	},
	replace: function(svgObj, cb) {
		var svgDoc, svg;
		try {
			svgDoc = svgObj.getSVGDocument()
		} catch (e) {
			svgDoc = null
		}
		null != svgDoc ? (svg = svgDoc.childNodes[0], svg && (SVGObjectHelper.updateRefs(svg.querySelectorAll("image"), SVGObjectHelper.basePath(svgObj.getAttribute("data"))), svgObj.parentNode.replaceChild(svg, svgObj), cb && cb())) : svgObj.addEventListener("load", function(e) {
			var svgObj = e.currentTarget;
			SVGObjectHelper.replace(svgObj, cb)
		}, !1)
	},
	updateRefs: function(nodes, path) {
		[].forEach.call(nodes, function(node) {
			var href = path + "/" + node.getAttribute("xlink:href");
			node.setAttribute("xlink:href", href)
		})
	},
	basePath: function(path) {
		return path.split("/").slice(0, -1).join("/")
	}
};
"undefined" != typeof module && (module.exports = SVGObjectHelper);
!
function(f) {
	if ("object" == typeof exports && "undefined" != typeof module) module.exports = f();
	else if ("function" == typeof define && define.amd) define([], f);
	else {
		var g;
		g = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, g.StickyState = f()
	}
}(function() {
	var define;
	return function e(t, n, r) {
		function s(o, u) {
			if (!n[o]) {
				if (!t[o]) {
					var a = "function" == typeof require && require;
					if (!u && a) return a(o, !0);
					if (i) return i(o, !0);
					var f = new Error("Cannot find module '" + o + "'");
					throw f.code = "MODULE_NOT_FOUND", f
				}
				var l = n[o] = {
					exports: {}
				};
				t[o][0].call(l.exports, function(e) {
					var n = t[o][1][e];
					return s(n ? n : e)
				}, l, l.exports, e, t, n, r)
			}
			return n[o].exports
		}
		for (var i = "function" == typeof require && require, o = 0; o < r.length; o++) s(r[o]);
		return s
	}({
		1: [function(require, module, exports) {
			function getScrollPosition() {
				return window.scrollY || window.pageYOffset || 0
			}
			function getDocumentHeight() {
				return Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)
			}
			function getAbsolutBoundingRect(el, fixedHeight) {
				var rect = el.getBoundingClientRect(),
					top = rect.top + getScrollPosition(),
					height = fixedHeight || rect.height;
				return {
					top: top,
					bottom: top + height,
					height: height,
					width: rect.width
				}
			}
			function addBounds(rect1, rect2) {
				var rect = assign({}, rect1);
				return rect.top -= rect2.top, rect.bottom = rect.top + rect1.height, rect
			}
			function getPositionStyle(el) {
				var obj = {
					top: null,
					bottom: null
				};
				for (var key in obj) {
					var value = parseInt(window.getComputedStyle(el)[key]);
					value = isNaN(value) ? null : value, obj[key] = value
				}
				return obj
			}
			function getPreviousElementSibling(el) {
				var prev = el.previousElementSibling;
				return prev && "script" === prev.tagName.toLocaleLowerCase() && (prev = getPreviousElementSibling(prev)), prev
			}
			var assign = require("object-assign"),
				FastScroll = require("fastscroll"),
				_globals = {
					featureTested: !1
				},
				defaults = {
					disabled: !1,
					className: "sticky",
					stateClassName: "is-sticky",
					fixedClass: "sticky-fixed",
					wrapperClass: "sticky-wrap",
					absoluteClass: "is-absolute"
				},
				StickyState = function(element, options) {
					if (!element) throw new Error("StickyState needs a DomElement");
					this.el = element, this.options = assign({}, defaults, options), this.setState({
						sticky: !1,
						absolute: !1,
						fixedOffset: "",
						offsetHeight: 0,
						bounds: {
							top: null,
							bottom: null,
							height: null,
							width: null
						},
						restrict: {
							top: null,
							bottom: null,
							height: null,
							width: null
						},
						style: {
							top: null,
							bottom: null
						},
						disabled: this.options.disabled
					}, !0), this.scrollTarget = "auto" !== window.getComputedStyle(this.el.parentNode).overflow ? window : this.el.parentNode, this.hasOwnScrollTarget = this.scrollTarget !== window, this.hasOwnScrollTarget && (this.updateFixedOffset = this.updateFixedOffset.bind(this)), this.firstRender = !0, this.resizeHandler = null, this.fastScroll = null, this.wrapper = null, this.render = this.render.bind(this), this.addSrollHandler(), this.addResizeHandler(), this.render()
				};
			StickyState.prototype.setState = function(newState, silent) {
				this.lastState = this.state || newState, this.state = assign({}, this.state, newState), silent !== !0 && this.render()
			}, StickyState.prototype.getBoundingClientRect = function() {
				return this.el.getBoundingClientRect()
			}, StickyState.prototype.getBounds = function(noCache) {
				var clientRect = this.getBoundingClientRect(),
					offsetHeight = getDocumentHeight();
				if (noCache !== !0 && null !== this.state.bounds.height && this.state.offsetHeight === offsetHeight && clientRect.height === this.state.bounds.height) return {
					offsetHeight: offsetHeight,
					style: this.state.style,
					bounds: this.state.bounds,
					restrict: this.state.restrict
				};
				var rect, restrict, style = getPositionStyle(this.el),
					child = this.wrapper || this.el,
					offset = 0;
				if (this.canSticky()) {
					var elem = getPreviousElementSibling(child);
					offset = 0, elem ? (offset = parseInt(window.getComputedStyle(elem)["margin-bottom"]), offset = offset || 0, rect = getAbsolutBoundingRect(elem), this.hasOwnScrollTarget && (rect = addBounds(rect, getAbsolutBoundingRect(this.scrollTarget)), offset += this.fastScroll.scrollY), rect.top = rect.bottom + offset) : (elem = child.parentNode, offset = parseInt(window.getComputedStyle(elem)["padding-top"]), offset = offset || 0, rect = getAbsolutBoundingRect(elem), this.hasOwnScrollTarget && (rect = addBounds(rect, getAbsolutBoundingRect(this.scrollTarget)), offset += this.fastScroll.scrollY), rect.top = rect.top + offset), this.hasOwnScrollTarget && (restrict = getAbsolutBoundingRect(this.scrollTarget), restrict.top = 0, restrict.height = this.scrollTarget.scrollHeight || restrict.height, restrict.bottom = restrict.height), rect.height = child.clientHeight, rect.width = child.clientWidth, rect.bottom = rect.top + rect.height
				} else if (rect = getAbsolutBoundingRect(child, clientRect.height), this.hasOwnScrollTarget) {
					var parentRect = getAbsolutBoundingRect(this.scrollTarget);
					offset = this.fastScroll.scrollY, rect = addBounds(rect, parentRect), restrict = parentRect, restrict.top = 0, restrict.height = this.scrollTarget.scrollHeight || restrict.height, restrict.bottom = restrict.height
				}
				return restrict = restrict || getAbsolutBoundingRect(child.parentNode), {
					offsetHeight: offsetHeight,
					style: style,
					bounds: rect,
					restrict: restrict
				}
			}, StickyState.prototype.updateBounds = function(silent) {
				silent = silent === !0, this.setState(this.getBounds(), silent)
			}, StickyState.prototype.updateFixedOffset = function() {
				this.lastState.fixedOffset = this.state.fixedOffset, this.state.sticky ? this.state.fixedOffset = this.scrollTarget.getBoundingClientRect().top + "px" : this.state.fixedOffset = "", this.lastState.fixedOffset !== this.state.fixedOffset && this.render()
			}, StickyState.prototype.canSticky = function() {
				return StickyState.native()
			}, StickyState.prototype.addSrollHandler = function() {
				if (!this.fastScroll) {
					var hasScrollTarget = FastScroll.hasScrollTarget(this.scrollTarget);
					this.fastScroll = FastScroll.getInstance(this.scrollTarget), this.onScroll = this.onScroll.bind(this), this.fastScroll.on("scroll:start", this.onScroll), this.fastScroll.on("scroll:progress", this.onScroll), this.fastScroll.on("scroll:stop", this.onScroll), hasScrollTarget && this.fastScroll.scrollY > 0 && this.fastScroll.trigger("scroll:progress")
				}
			}, StickyState.prototype.removeSrollHandler = function() {
				this.fastScroll && (this.fastScroll.off("scroll:start", this.onScroll), this.fastScroll.off("scroll:progress", this.onScroll), this.fastScroll.off("scroll:stop", this.onScroll), this.fastScroll.destroy(), this.fastScroll = null)
			}, StickyState.prototype.addResizeHandler = function() {
				this.resizeHandler || (this.resizeHandler = this.onResize.bind(this), window.addEventListener("resize", this.resizeHandler, !1), window.addEventListener("orientationchange", this.resizeHandler, !1))
			}, StickyState.prototype.removeResizeHandler = function() {
				this.resizeHandler && (window.removeEventListener("resize", this.resizeHandler), window.removeEventListener("orientationchange", this.resizeHandler), this.resizeHandler = null)
			}, StickyState.prototype.onScroll = function(e) {
				this.updateStickyState(!1), this.hasOwnScrollTarget && !this.canSticky() && (this.updateFixedOffset(), this.state.sticky && !this.hasWindowScrollListener ? (this.hasWindowScrollListener = !0, FastScroll.getInstance(window).on("scroll:progress", this.updateFixedOffset)) : !this.state.sticky && this.hasWindowScrollListener && (this.hasWindowScrollListener = !1, FastScroll.getInstance(window).off("scroll:progress", this.updateFixedOffset)))
			}, StickyState.prototype.onResize = function(e) {
				this.updateBounds(!0), this.updateStickyState(!1)
			}, StickyState.prototype.getStickyState = function() {
				if (this.state.disabled) return {
					sticky: !1,
					absolute: !1
				};
				var scrollY = this.fastScroll.scrollY,
					top = this.state.style.top,
					bottom = this.state.style.bottom,
					sticky = this.state.sticky,
					absolute = this.state.absolute;
				if (null !== top) {
					var offsetBottom = this.state.restrict.bottom - this.state.bounds.height - top;
					top = this.state.bounds.top - top, this.state.sticky === !1 && scrollY >= top && scrollY <= offsetBottom ? (sticky = !0, absolute = !1) : this.state.sticky && (scrollY < top || scrollY > offsetBottom) && (sticky = !1, absolute = scrollY > offsetBottom)
				} else if (null !== bottom) {
					scrollY += window.innerHeight;
					var offsetTop = this.state.restrict.top + this.state.bounds.height - bottom;
					bottom = this.state.bounds.bottom + bottom, this.state.sticky === !1 && scrollY <= bottom && scrollY >= offsetTop ? (sticky = !0, absolute = !1) : this.state.sticky && (scrollY > bottom || scrollY < offsetTop) && (sticky = !1, absolute = scrollY <= offsetTop)
				}
				return {
					sticky: sticky,
					absolute: absolute
				}
			}, StickyState.prototype.updateStickyState = function(silent) {
				var values = this.getStickyState();
				values.sticky === this.state.sticky && values.absolute === this.state.absolute || (silent = silent === !0, values = assign(values, this.getBounds()), this.setState(values, silent))
			}, StickyState.prototype.render = function() {
				var className = this.el.className;
				if (this.firstRender) {
					if (this.firstRender = !1, !this.canSticky()) {
						this.wrapper = document.createElement("div"), this.wrapper.className = this.options.wrapperClass;
						var parent = this.el.parentNode;
						parent && parent.insertBefore(this.wrapper, this.el), this.wrapper.appendChild(this.el), className += " " + this.options.fixedClass
					}
					this.updateBounds(!0), this.updateStickyState(!0)
				}
				if (!this.canSticky()) {
					var height = this.state.disabled || null === this.state.bounds.height || !this.state.sticky && !this.state.absolute ? "auto" : this.state.bounds.height + "px";
					this.wrapper.style.height = height, this.state.absolute !== this.lastState.absolute && (this.wrapper.style.position = this.state.absolute ? "relative" : "", className = className.indexOf(this.options.absoluteClass) === -1 && this.state.absolute ? className + (" " + this.options.absoluteClass) : className.split(" " + this.options.absoluteClass).join(""), this.el.style.marginTop = this.state.absolute && null !== this.state.style.top ? this.state.restrict.height - (this.state.bounds.height + this.state.style.top) + (this.state.restrict.top - this.state.bounds.top) + "px" : "", this.el.style.marginBottom = this.state.absolute && null !== this.state.style.bottom ? this.state.restrict.height - (this.state.bounds.height + this.state.style.bottom) + (this.state.restrict.bottom - this.state.bounds.bottom) + "px" : ""), this.hasOwnScrollTarget && !this.state.absolute && this.lastState.fixedOffset !== this.state.fixedOffset && (this.el.style.marginTop = this.state.fixedOffset)
				}
				var hasStateClass = className.indexOf(this.options.stateClassName) > -1;
				return this.state.sticky && !hasStateClass ? className += " " + this.options.stateClassName : !this.state.sticky && hasStateClass && (className = className.split(" " + this.options.stateClassName).join("")), this.el.className !== className && (this.el.className = className), this.el
			}, StickyState.native = function() {
				if (_globals.featureTested) return _globals.canSticky;
				if ("undefined" != typeof window) {
					if (_globals.featureTested = !0, window.Modernizr && window.Modernizr.hasOwnProperty("csspositionsticky")) return _globals.canSticky = window.Modernizr.csspositionsticky;
					var testEl = document.createElement("div");
					document.documentElement.appendChild(testEl);
					var prefixedSticky = ["sticky", "-webkit-sticky", "-moz-sticky", "-ms-sticky", "-o-sticky"];
					_globals.canSticky = !1;
					for (var i = 0; i < prefixedSticky.length && (testEl.style.position = prefixedSticky[i], _globals.canSticky = !! window.getComputedStyle(testEl).position.match("sticky"), !_globals.canSticky); i++);
					document.documentElement.removeChild(testEl)
				}
				return _globals.canSticky
			}, StickyState.apply = function(elements) {
				if (elements) if (elements.length) for (var i = 0; i < elements.length; i++) new StickyState(elements[i]);
				else new StickyState(elements)
			}, module.exports = StickyState
		}, {
			fastscroll: 4,
			"object-assign": 5
		}],
		2: [function(require, module, exports) {
			!
			function(exports) {
				"use strict";
				var delegate = function(target, handler) {
						var args = [].slice.call(arguments, 2),
							fn = function() {
								return handler.apply(target, args)
							};
						return fn
					};
				"undefined" != typeof module && module.exports ? module.exports = delegate : "undefined" != typeof define ? define(function() {
					return delegate
				}) : exports.delegate = delegate
			}(this)
		}, {}],
		3: [function(require, module, exports) {
			"use strict";
			function isEmpty(obj) {
				for (var prop in obj) if (obj.hasOwnProperty(prop)) return !1;
				return !0
			}
			var _instanceMap = {},
				EventDispatcher = function() {
					this._eventMap = {}, this._destroyed = !1
				};
			EventDispatcher.getInstance = function(key) {
				if (!key) throw new Error("key must be");
				return _instanceMap[key] || (_instanceMap[key] = new EventDispatcher)
			}, EventDispatcher.prototype.addListener = function(event, listener) {
				var listeners = this.getListener(event);
				return listeners ? listeners.indexOf(listener) === -1 && (listeners.push(listener), !0) : (this._eventMap[event] = [listener], !0)
			}, EventDispatcher.prototype.addListenerOnce = function(event, listener) {
				var s = this,
					f2 = function() {
						return s.removeListener(event, f2), listener.apply(this, arguments)
					};
				return this.addListener(event, f2)
			}, EventDispatcher.prototype.removeListener = function(event, listener) {
				if ("undefined" == typeof listener) return this.removeAllListener(event);
				var listeners = this.getListener(event);
				if (listeners) {
					var i = listeners.indexOf(listener);
					if (i > -1) return listeners = listeners.splice(i, 1), listeners.length || delete this._eventMap[event], !0
				}
				return !1
			}, EventDispatcher.prototype.removeAllListener = function(event) {
				var listeners = this.getListener(event);
				return !!listeners && (this._eventMap[event].length = 0, delete this._eventMap[event], !0)
			}, EventDispatcher.prototype.hasListener = function(event) {
				return null !== this.getListener(event)
			}, EventDispatcher.prototype.hasListeners = function() {
				return null !== this._eventMap && void 0 !== this._eventMap && !isEmpty(this._eventMap)
			}, EventDispatcher.prototype.dispatch = function(eventType, eventObject) {
				var listeners = this.getListener(eventType);
				if (listeners) {
					eventObject = eventObject || {}, eventObject.type = eventType, eventObject.target = eventObject.target || this;
					for (var i = -1; ++i < listeners.length;) listeners[i](eventObject);
					return !0
				}
				return !1
			}, EventDispatcher.prototype.getListener = function(event) {
				var result = this._eventMap ? this._eventMap[event] : null;
				return result || null
			}, EventDispatcher.prototype.destroy = function() {
				if (this._eventMap) {
					for (var i in this._eventMap) this.removeAllListener(i);
					this._eventMap = null
				}
				this._destroyed = !0
			}, EventDispatcher.prototype.on = EventDispatcher.prototype.bind = EventDispatcher.prototype.addEventListener = EventDispatcher.prototype.addListener, EventDispatcher.prototype.off = EventDispatcher.prototype.unbind = EventDispatcher.prototype.removeEventListener = EventDispatcher.prototype.removeListener, EventDispatcher.prototype.once = EventDispatcher.prototype.one = EventDispatcher.prototype.addListenerOnce, EventDispatcher.prototype.trigger = EventDispatcher.prototype.dispatchEvent = EventDispatcher.prototype.dispatch, module.exports = EventDispatcher
		}, {}],
		4: [function(require, module, exports) {
			"use strict";
			var delegate = require("delegatejs"),
				EventDispatcher = require("eventdispatcher"),
				_instanceMap = {},
				FastScroll = function(scrollTarget, options) {
					return scrollTarget = scrollTarget || window, FastScroll.hasScrollTarget(scrollTarget) ? FastScroll.getInstance(scrollTarget) : (_instanceMap[scrollTarget] = this, this.options = options || {}, this.options.hasOwnProperty("animationFrame") || (this.options.animationFrame = !0), "function" != typeof window.requestAnimationFrame && (this.options.animationFrame = !1), this.scrollTarget = scrollTarget, void this.init())
				};
			FastScroll.___instanceMap = _instanceMap, FastScroll.getInstance = function(scrollTarget, options) {
				return scrollTarget = scrollTarget || window, _instanceMap[scrollTarget] || new FastScroll(scrollTarget, options)
			}, FastScroll.hasInstance = function(scrollTarget) {
				return void 0 !== _instanceMap[scrollTarget]
			}, FastScroll.hasScrollTarget = FastScroll.hasInstance, FastScroll.clearInstance = function(scrollTarget) {
				scrollTarget = scrollTarget || window, FastScroll.hasInstance(scrollTarget) && (FastScroll.getInstance(scrollTarget).destroy(), delete _instanceMap[scrollTarget])
			}, FastScroll.UP = "up", FastScroll.DOWN = "down", FastScroll.NONE = "none", FastScroll.LEFT = "left", FastScroll.RIGHT = "right", FastScroll.prototype = {
				destroyed: !1,
				scrollY: 0,
				scrollX: 0,
				lastScrollY: 0,
				lastScrollX: 0,
				timeout: 0,
				speedY: 0,
				speedX: 0,
				stopFrames: 5,
				currentStopFrames: 0,
				firstRender: !0,
				animationFrame: !0,
				lastEvent: {
					type: null,
					scrollY: 0,
					scrollX: 0
				},
				scrolling: !1,
				init: function() {
					this.dispatcher = new EventDispatcher, this.updateScrollPosition = this.scrollTarget === window ? delegate(this, this.updateWindowScrollPosition) : delegate(this, this.updateElementScrollPosition), this.updateScrollPosition(), this.trigger = this.dispatchEvent, this.lastEvent.scrollY = this.scrollY, this.lastEvent.scrollX = this.scrollX, this.onScroll = delegate(this, this.onScroll), this.onNextFrame = delegate(this, this.onNextFrame), this.scrollTarget.addEventListener ? (this.scrollTarget.addEventListener("mousewheel", this.onScroll, !1), this.scrollTarget.addEventListener("scroll", this.onScroll, !1)) : this.scrollTarget.attachEvent && (this.scrollTarget.attachEvent("onmousewheel", this.onScroll), this.scrollTarget.attachEvent("scroll", this.onScroll))
				},
				destroy: function() {
					this.destroyed || (this.cancelNextFrame(), this.scrollTarget.addEventListener ? (this.scrollTarget.removeEventListener("mousewheel", this.onScroll), this.scrollTarget.removeEventListener("scroll", this.onScroll)) : this.scrollTarget.attachEvent && (this.scrollTarget.detachEvent("onmousewheel", this.onScroll), this.scrollTarget.detachEvent("scroll", this.onScroll)), this.dispatcher.off(), this.dispatcher = null, this.onScroll = null, this.updateScrollPosition = null, this.onNextFrame = null, this.scrollTarget = null, this.destroyed = !0)
				},
				getAttributes: function() {
					return {
						scrollY: this.scrollY,
						scrollX: this.scrollX,
						speedY: this.speedY,
						speedX: this.speedX,
						angle: 0,
						directionY: 0 === this.speedY ? FastScroll.NONE : this.speedY > 0 ? FastScroll.UP : FastScroll.DOWN,
						directionX: 0 === this.speedX ? FastScroll.NONE : this.speedX > 0 ? FastScroll.RIGHT : FastScroll.LEFT
					}
				},
				updateWindowScrollPosition: function() {
					this.scrollY = window.scrollY || window.pageYOffset || 0, this.scrollX = window.scrollX || window.pageXOffset || 0
				},
				updateElementScrollPosition: function() {
					this.scrollY = this.scrollTarget.scrollTop, this.scrollX = this.scrollTarget.scrollLeft
				},
				onScroll: function() {
					if (this.currentStopFrames = 0, this.firstRender && (this.firstRender = !1, this.scrollY > 1)) return this.updateScrollPosition(), void this.dispatchEvent("scroll:progress");
					if (this.scrolling || (this.scrolling = !0, this.dispatchEvent("scroll:start"), this.options.animationFrame && (this.nextFrameID = requestAnimationFrame(this.onNextFrame))), !this.options.animationFrame) {
						clearTimeout(this.timeout), this.onNextFrame();
						var self = this;
						this.timeout = setTimeout(function() {
							self.onScrollStop()
						}, 100)
					}
				},
				onNextFrame: function() {
					return this.updateScrollPosition(), this.speedY = this.lastScrollY - this.scrollY, this.speedX = this.lastScrollX - this.scrollX, this.lastScrollY = this.scrollY, this.lastScrollX = this.scrollX, this.options.animationFrame && this.scrolling && 0 === this.speedY && this.currentStopFrames++ > this.stopFrames ? void this.onScrollStop() : (this.dispatchEvent("scroll:progress"), void(this.options.animationFrame && (this.nextFrameID = requestAnimationFrame(this.onNextFrame))))
				},
				onScrollStop: function() {
					this.scrolling = !1, this.options.animationFrame && (this.cancelNextFrame(), this.currentStopFrames = 0), this.dispatchEvent("scroll:stop")
				},
				cancelNextFrame: function() {
					cancelAnimationFrame(this.nextFrameID)
				},
				dispatchEvent: function(type, eventObject) {
					eventObject = eventObject || this.getAttributes(), this.lastEvent.type === type && this.lastEvent.scrollY === eventObject.scrollY && this.lastEvent.scrollX === eventObject.scrollX || (this.lastEvent = {
						type: type,
						scrollY: eventObject.scrollY,
						scrollX: eventObject.scrollX
					}, eventObject.target = this.scrollTarget, this.dispatcher.dispatch(type, eventObject))
				},
				on: function(event, listener) {
					return this.dispatcher.addListener(event, listener)
				},
				off: function(event, listener) {
					return this.dispatcher.removeListener(event, listener)
				}
			}, module.exports = FastScroll
		}, {
			delegatejs: 2,
			eventdispatcher: 3
		}],
		5: [function(require, module, exports) {
			"use strict";
			function toObject(val) {
				if (null === val || void 0 === val) throw new TypeError("Object.assign cannot be called with null or undefined");
				return Object(val)
			}
			var hasOwnProperty = Object.prototype.hasOwnProperty,
				propIsEnumerable = Object.prototype.propertyIsEnumerable;
			module.exports = Object.assign ||
			function(target, source) {
				for (var from, symbols, to = toObject(target), s = 1; s < arguments.length; s++) {
					from = Object(arguments[s]);
					for (var key in from) hasOwnProperty.call(from, key) && (to[key] = from[key]);
					if (Object.getOwnPropertySymbols) {
						symbols = Object.getOwnPropertySymbols(from);
						for (var i = 0; i < symbols.length; i++) propIsEnumerable.call(from, symbols[i]) && (to[symbols[i]] = from[symbols[i]])
					}
				}
				return to
			}
		}, {}]
	}, {}, [1])(1)
});
var ICA = ICA || {};
!
function($, window, document, ICA, undefined) {
	ICA.questionPage = function() {
		function _questionPage() {
			function removeErrors() {
				$("p.error").each(function() {
					var $this = $(this);
					$this.remove()
				}), $(".error").each(function() {
					var $this = $(this);
					$this.removeClass("error")
				})
			}
			function filterHiddenListItems() {
				$itemsLi.filter(function() {
					"none" == $(this).css("display") ? $(this).find("input, textarea").attr("disabled", !0) : $(this).find("input, textarea").attr("disabled", !1)
				})
			}
			function showFieldHideList() {
				$fieldSet.show(), $listItems.children().hide()
			}
			function reclaimTopicSelectChangedState() {
				$reclamationTopic.val(""), $("#reclaim-select-header fieldset .selecttitle").html($reclamationTopic.find("option:eq(0)").text())
			}
			function showHideTopicForm(select) {
				var area = $(select).val();
				switch (showFieldHideList(), $("#reclaim-select-header").hide(), area) {
				case "Matkassen":
				case "Varor":
				case "Övrigt":
					$(".contact-info").show(), $(".description").show();
					break;
				case "Handla":
					$(".contact-info").show(), $(".description").show(), $("#ordnr").closest("li").show();
					break;
				case "Hemma":
					$("#reclaim-select-header").show(), $("#myfieldset").hide(), $("#damagedGoods").hide();
					break;
				default:
					$("#myfieldset").hide()
				}
				removeErrors(), filterHiddenListItems()
			}
			function showHideReclamationForm(select) {
				var reclamationArea = $(select).val();
				switch (showFieldHideList(), reclamationArea) {
				case "Trasig":
					$(".product-faulty").show(), $(".contact-info-reclamation").show(), $("#ordnr").closest("li").show();
					break;
				case "Retur":
					$(".contact-info-reclamation").show(), $(".return-product").show(), $(".pointOfView").show(), $("#ordnr").closest("li").show();
					break;
				case "Bonus":
					$(".contact-info-small-reclamation").show(), $(".bonus").show(), $(".pointOfView").show(), $("#ordnr-required").closest("li").show(), $("#ordnr").hide().show();
					break;
				case "Orderstatus":
					$(".contact-info-small-reclamation").show(), $(".pointOfView").show(), $("#ordnr").closest("li").show();
					break;
				case "Rabatter":
					$(".discount").show(), $(".contact-info-small-reclamation").show(), $("#ordnr").closest("li").show()
				}
				removeErrors(), filterHiddenListItems()
			}
			var $fieldSet = ($(document), $(".error"), $("#myfieldset")),
				$listItems = $(".list-items"),
				$itemsLi = $(".list-items li"),
				$reclamationTopic = $(".reclamation-topic"),
				$dropDownTopic = $(".topic-dropdownList"),
				context = this;
			context.init = function() {
				initAttachEvents()
			};
			var initAttachEvents = function() {
					$dropDownTopic.on("change", function() {
						showHideTopicForm($(this))
					}), $dropDownTopic.on("focus", function() {
						reclaimTopicSelectChangedState()
					}), $reclamationTopic.on("change", function() {
						showHideReclamationForm($(this))
					})
				};
			return context
		}
		return new _questionPage
	}()
}(jQuery, this, this.document, ICA), $(function() {
	ICA.questionPage.init()
});
var ICA = ICA || {};
!
function($, window, document, ICA, undefined) {
	"use strict";
	ICA.mdsaCampaingPage = function() {
		function _mdsaCampaingPage() {
			var context = this,
				$recipeListing = $(".recipes-listing-section");
			context.init = function() {
				initAttachEvents()
			};
			var initAttachEvents = function() {
					$recipeListing.on("click", "a.save-recipe", function(e) {
						saveRecipe(e)
					})
				},
				saveRecipe = function(e) {
					e.preventDefault();
					var anchorLink = $(e.target),
						recipeID = anchorLink.data("recipeid");
					anchorLink.hasClass("active") ? ICA.legacy.savedRecipes.remove(recipeID, function(data) {
						"True" === data && anchorLink.removeClass("active icon-heart-filled").addClass("icon-heart")
					}) : ICA.legacy.savedRecipes.add(recipeID, function(data) {
						"True" === data && anchorLink.addClass("active icon-heart-filled").removeClass("icon-heart")
					})
				};
			return context
		}
		return new _mdsaCampaingPage
	}()
}(jQuery, this, this.document, ICA), $(function() {
	"use strict";
	$("#aspnetForm") && ICA.mdsaCampaingPage.init()
});
var ICA = ICA || {};
!
function($, window, document, ICA, undefined) {
	ICA.myHouseHold = function() {
		function _myHouseHoldAdmin() {
			var context = ($(document), this),
				$inviteMoreContainer = $(".invite-more-block"),
				$inviteMoreFormSendingContainer = $(".invite-more-form-sending"),
				$emailInput = ($(".invite-more-form-feedback"), $("#email")),
				$sendInviteButton = $("#send-invite"),
				$cancelSendingInviteButton = $("#cancel-sending-invite"),
				$cancelSentInviteButton = $(".cancel-sent-invite"),
				$acceptInviteButton = $(".accept-invite"),
				$denyInviteButton = $(".deny-invite"),
				$overlayInvitation = $(".overlay-for-modal-invitation"),
				$modalInvitation = $(".modalbox-invitation"),
				$disengageLink = $(".disengage"),
				$disengageSelfLink = $(".disengage-self"),
				$disengageOtherLink = $(".disengage-other"),
				$overlayDisengage = $(".overlay-for-modal-disengage"),
				$modalDisengage = $(".modalbox-disengage"),
				$acceptDisengageButton = $("#accept-disengage"),
				$cancelDisengageButton = $("#cancel-disengage"),
				$moreInfoLink = $(".more-info"),
				$lessInfoLink = $(".less-info"),
				$modalMoreInfoSection = $(".modal-section-3"),
				$overlayForModalHandleInvitationError = $(".overlay-for-modal-handle-invitation-error"),
				$modalHandleInvitationError = $(".modalbox-handle-invitation-error"),
				$invitationErrorMessage = $("#modal-handle-invitation-error-message"),
				$invitationErrorConfirm = $(".handle-invitation-error"),
				$loader = $(".loader-div"),
				$changeHkLink = $(".change-hk"),
				$overlayForModalChangeHK = $(".overlay-for-modal-change-hk"),
				$modalChangeHK = $(".modalbox-change-hk"),
				$modalChangeHkStep1 = $(".step-1"),
				$modalChangeHkStep2 = $(".step-2"),
				$modalChangeHkStep1Yes = $(".step-1-yes"),
				$modalChangeHkStep1No = $(".step-1-no"),
				$modalChangeHkStep2Yes = $(".step-2-yes"),
				$modalChangeHkStep2No = $(".step-2-no"),
				$modalChangeHKClose = $(".modalbox-change-hk .close"),
				$step2ChosenName = $(".step-2-chosen-name"),
				$overlayForModalInviteMoreInfo = $(".overlay-for-modal-invite-more-info"),
				$modalInviteMoreInfo = $(".modalbox-invite-more-info"),
				$modalInviteMoreInfoClose = $(".modalbox-invite-more-info .close"),
				$inviteMoreInfoIcon = $(".inviteMoreInfo");
			context.init = function() {
				initAttachEvents()
			};
			var initAttachEvents = function() {
					$inviteMoreContainer.on("click", handleClickOnInviteMoreComtainer), $cancelSendingInviteButton.on("click", handleClickOnCancelSendingInviteButton), $emailInput.on("keyup change blur paste", function(e) {
						if (setTimeout(function() {
							$emailInput.val().match(/^.+@.+\..+$/) ? $sendInviteButton.removeAttr("disabled") : $sendInviteButton.attr("disabled", "disabled")
						}, 100), 13 == e.keyCode && $emailInput.val().match(/^.+@.+\..+$/)) return e.preventDefault(), $sendInviteButton.attr("disabled", "disabled"), $loader.show(), handleSendInvite(), !1
					}), $("#page").hasClass("myHouseholdAdminPage") && $("#aspnetForm").submit(function() {
						return !1
					}), $(".change-hk-list input[name=selector]").is(":checked") && ($(".step-1-yes").removeAttr("disabled"), $(".modalbox-change-hk .step-1 .modal-texts p").removeClass("gray-text")), $(".change-hk-list input[name=selector]").change(function() {
						$(".step-1-yes").removeAttr("disabled"), $(".modalbox-change-hk .step-1 .modal-texts p").removeClass("gray-text")
					}), $(document).keyup(function(e) {
						27 == e.keyCode && ($overlayForModalChangeHK.hide(), $modalChangeHK.hide(), $overlayForModalHandleInvitationError.hide(), $modalHandleInvitationError.hide(), $overlayForModalInviteMoreInfo.hide(), $modalInviteMoreInfo.hide())
					}), $overlayForModalInviteMoreInfo.on("click", function() {
						$overlayForModalInviteMoreInfo.hide(), $modalInviteMoreInfo.hide()
					}), $sendInviteButton.on("click", function() {
						$sendInviteButton.attr("disabled", "disabled"), $loader.show(), handleSendInvite(), icadatalayer.add("bkEvent", {
							bkCategory: "Mitt ICA",
							bkAction: "Hantera Bonuskonto",
							bkLabel: "Skicka inbjudan"
						})
					}), $cancelSentInviteButton.on("click", handleClickOnCancelSentInviteButton), $acceptInviteButton.on("click", handleClickOnAcceptInviteButton), $denyInviteButton.on("click", handleClickOnDenyInviteButton), $disengageLink.on("click", handleClickDisengageLink), $disengageSelfLink.on("click", handleClickDisengageSelfLink), $disengageOtherLink.on("click", handleClickDisengageOtherLink), $acceptDisengageButton.on("click", handleClickOnAcceptDisengageButton), $cancelDisengageButton.on("click", handleClickOnCancelDisengageButton), $moreInfoLink.on("click", handleClickOnMoreInfoLink), $lessInfoLink.on("click", handleClickOnLessInfoLink), $invitationErrorConfirm.on("click", handleClickOnInvitationErrorConfirm), $changeHkLink.on("click", handleClickOnChangeHkLink), $modalChangeHKClose.on("click", handleClickOnChangeHKClose), $modalChangeHkStep1Yes.on("click", handleClickOnStep1Yes), $modalChangeHkStep1No.on("click", handleClickOnStep1No), $modalChangeHkStep2Yes.on("click", handleClickOnStep2Yes), $modalChangeHkStep2No.on("click", handleClickOnStep2No), $inviteMoreInfoIcon.on("click", handleClickOnInviteMoreInfoIcon), $modalInviteMoreInfoClose.on("click", handleClickOnModalInviteMoreInfoClose)
				},
				handleClickOnMoreInfoLink = function(e) {
					$modalMoreInfoSection.show(), $moreInfoLink.hide(), $lessInfoLink.show();
					var inviteID = $(e.currentTarget).attr("value");
					$("#modal-invitation-" + inviteID).animate({
						scrollTop: $(document).height()
					}, "slow")
				},
				handleClickOnLessInfoLink = function() {
					$modalMoreInfoSection.hide(), $moreInfoLink.show(), $lessInfoLink.hide()
				},
				handleClickOnInviteMoreComtainer = function() {
					$inviteMoreContainer.hide(), $inviteMoreFormSendingContainer.show(), icadatalayer.add("bkEvent", {
						bkCategory: "Mitt ICA",
						bkAction: "Hantera Bonuskonto",
						bkLabel: "Bjud in medkontohavare"
					})
				},
				handleClickOnCancelSendingInviteButton = function() {
					$inviteMoreContainer.show(), $inviteMoreFormSendingContainer.hide(), icadatalayer.add("bkEvent", {
						bkCategory: "Mitt ICA",
						bkAction: "Hantera Bonuskonto",
						bkLabel: "Avbryt"
					})
				},
				handleClickOnInviteMoreInfoIcon = function() {
					$overlayForModalInviteMoreInfo.show(), $modalInviteMoreInfo.show()
				},
				handleClickOnModalInviteMoreInfoClose = function() {
					$overlayForModalInviteMoreInfo.hide(), $modalInviteMoreInfo.hide()
				},
				handleSendInvite = function() {
					var email = $emailInput.val(),
						pageId = $("#hdnCurrentPageId").val(),
						param = {
							CommandName: "SendInvite",
							Email: email,
							PageId: pageId
						};
					$.ajax({
						url: "/Templates/General/Handlers/MyHouseholdAdminHandler.ashx",
						method: "GET",
						data: param
					}).fail(function(response) {}).done(function(response) {
						response.IsSuccess ? window.location.reload() : ($loader.hide(), 401 == response.Status ? window.location.reload() : response.Message ? window.triggerAsModal(response.Message, "bonuskonto-error-modal") : window.triggerAsModal("Hoppsan! Något gick fel. Kontakta Kundservice på telefon 033-47 47 90.", "hantera-bonuskonto"))
					})
				},
				handleClickOnCancelSentInviteButton = function() {
					var inviteId = this.value,
						pageId = $("#hdnCurrentPageId").val(),
						param = {
							CommandName: "CancelInvite",
							InviteId: inviteId,
							PageId: pageId
						};
					$.ajax({
						url: "/Templates/General/Handlers/MyHouseholdAdminHandler.ashx",
						method: "GET",
						data: param
					}).fail(function(response) {}).done(function(response) {
						response.IsSuccess ? $("#invitation-" + inviteId).hide() : 401 == response.Status ? window.location.reload() : response.Message ? window.triggerAsModal(response.Message, "bonuskonto-error-modal") : window.triggerAsModal("Hoppsan! Något gick fel. Kontakta Kundservice på telefon 033-47 47 90.", "hantera-bonuskonto")
					})
				},
				handleClickOnAcceptInviteButton = function() {
					var inviteId = this.value,
						pageId = $("#hdnCurrentPageId").val(),
						param = {
							CommandName: "AcceptInvite",
							InviteId: inviteId,
							PageId: pageId
						};
					$("#accept-invite-" + inviteId).attr("disabled", "disabled"), $loader.show(), icadatalayer.add("bkEvent", {
						bkCategory: "Mitt ICA",
						bkAction: "Hantera Bonuskonto",
						bkLabel: "Tackat ja"
					}), $.ajax({
						url: "/Templates/General/Handlers/MyHouseholdAdminHandler.ashx",
						method: "GET",
						data: param
					}).fail(function(response) {}).done(function(response) {
						response.IsSuccess ? window.location.reload() : ($overlayInvitation.hide(), $modalInvitation.hide(), $loader.hide(), $invitationErrorMessage.text(response.Message), $overlayForModalHandleInvitationError.show(), $modalHandleInvitationError.show())
					})
				},
				handleClickOnDenyInviteButton = function() {
					var inviteId = this.value,
						pageId = $("#hdnCurrentPageId").val(),
						param = {
							CommandName: "DenyInvite",
							InviteId: inviteId,
							PageId: pageId
						};
					$("#deny-invite-" + inviteId).attr("disabled", "disabled"), $loader.show(), icadatalayer.add("bkEvent", {
						bkCategory: "Mitt ICA",
						bkAction: "Hantera Bonuskonto",
						bkLabel: "Tackat nej"
					}), $.ajax({
						url: "/Templates/General/Handlers/MyHouseholdAdminHandler.ashx",
						method: "GET",
						data: param
					}).fail(function(response) {}).done(function(response) {
						response.IsSuccess ? ($("#overlay-invitation-" + inviteId).hide(), $("#modal-invitation-" + inviteId).hide(), $loader.hide()) : ($overlayInvitation.hide(), $modalInvitation.hide(), $loader.hide(), $invitationErrorMessage.text(response.Message), $overlayForModalHandleInvitationError.show(), $modalHandleInvitationError.show())
					})
				},
				handleClickOnInvitationErrorConfirm = function() {
					$overlayForModalHandleInvitationError.hide(), $modalHandleInvitationError.hide()
				},
				handleClickDisengageLink = function() {
					var customerId = this.id.substring(10);
					$("#accept-disengage").attr("value", customerId), $overlayDisengage.show(), $modalDisengage.show()
				},
				handleClickDisengageSelfLink = function() {
					icadatalayer.add("bkEvent", {
						bkCategory: "Mitt ICA",
						bkAction: "Hantera Bonuskonto",
						bkLabel: "Lämna hushåll"
					})
				},
				handleClickDisengageOtherLink = function() {
					icadatalayer.add("bkEvent", {
						bkCategory: "Mitt ICA",
						bkAction: "Hantera Bonuskonto",
						bkLabel: " Koppla bort"
					})
				},
				handleClickOnAcceptDisengageButton = function() {
					var leavingCustomerId = this.value,
						pageId = $("#hdnCurrentPageId").val(),
						params = {
							CommandName: "ExludeFromHousehold",
							LeavingCustomerId: leavingCustomerId,
							PageId: pageId
						};
					$acceptDisengageButton.attr("disabled", "disabled"), $loader.show(), $.ajax({
						url: "/Templates/General/Handlers/MyHouseholdAdminHandler.ashx",
						method: "GET",
						data: params
					}).fail(function(response) {}).done(function(response) {
						response.IsSuccess ? window.location.reload() : ($loader.hide(), $overlayDisengage.hide(), $modalDisengage.hide(), 401 == response.Status ? window.location.reload() : response.Message ? window.triggerAsModal(response.Message, "bonuskonto-error-modal") : window.triggerAsModal("Hoppsan! Något gick fel. Kontakta Kundservice på telefon 033-47 47 90.", "hantera-bonuskonto"))
					})
				},
				handleClickOnCancelDisengageButton = function() {
					$overlayDisengage.hide(), $modalDisengage.hide()
				},
				handleClickOnChangeHkLink = function() {
					$overlayForModalChangeHK.show(), $modalChangeHK.show(), icadatalayer.add("bkEvent", {
						bkCategory: "Mitt ICA",
						bkAction: "Hantera Bonuskonto",
						bkLabel: "Ändra kontoägare:Steg 1"
					})
				},
				handleClickOnChangeHKClose = function() {
					$overlayForModalChangeHK.hide(), $modalChangeHK.hide(), $modalChangeHkStep1.show(), $modalChangeHkStep2.hide()
				},
				handleClickOnStep1Yes = function() {
					var chosenName = $(".change-hk-list input[name=selector]:checked").val(),
						chosenId = $(".change-hk-list input[name=selector]:checked").attr("id");
					$step2ChosenName.text(chosenName), $step2ChosenName.attr("id", chosenId), $modalChangeHkStep1.hide(), $modalChangeHkStep2.show(), icadatalayer.add("bkEvent", {
						bkCategory: "Mitt ICA",
						bkAction: "Hantera Bonuskonto",
						bkLabel: "Ändra kontoägare:Steg 2"
					})
				},
				handleClickOnStep1No = function() {
					$overlayForModalChangeHK.hide(), $modalChangeHK.hide()
				},
				handleClickOnStep2Yes = function() {
					var theChosenID = $step2ChosenName.attr("id").substring(7),
						pageId = $("#hdnCurrentPageId").val(),
						params = {
							CommandName: "ChangeMainAccountHolder",
							CustomerId: theChosenID,
							PageId: pageId
						};
					$modalChangeHkStep2Yes.attr("disabled", "disabled"), $loader.show(), icadatalayer.add("bkEvent", {
						bkCategory: "Mitt ICA",
						bkAction: "Hantera Bonuskonto",
						bkLabel: "Ändra kontoägare:Slutfört"
					}), $.ajax({
						url: "/Templates/General/Handlers/MyHouseholdAdminHandler.ashx",
						method: "GET",
						data: params
					}).fail(function(response) {}).done(function(response) {
						response.IsSuccess ? window.location.reload() : ($loader.hide(), $overlayForModalChangeHK.hide(), $modalChangeHK.hide(), $modalChangeHkStep2Yes.removeAttr("disabled"), $modalChangeHkStep1.show(), $modalChangeHkStep2.hide(), 401 == response.Status ? window.location.reload() : response.Message ? window.triggerAsModal(response.Message, "bonuskonto-error-modal") : window.triggerAsModal("Hoppsan! Något gick fel. Kontakta Kundservice på telefon 033-47 47 90.", "hantera-bonuskonto"))
					})
				},
				handleClickOnStep2No = function() {
					$modalChangeHkStep1.show(), $modalChangeHkStep2.hide()
				};
			return context
		}
		return new _myHouseHoldAdmin
	}()
}(jQuery, this, this.document, ICA), $(function() {
	$(".myHouseholdAdminPage") && ICA.myHouseHold.init()
});