var html = document.getElementsByTagName("html")[0],
	body = document.getElementsByTagName("body")[0],
	isIE = !1,
	input = document.createElement("input");
if (input.setAttribute("type", "date"), "text" === input.type && (html.className += "no-inputtype-date"), html.className = "js loading", navigator.userAgent.match(/Android [1-2]+/i)) html.className += " android2", html.className += " android", html.className += " no-list-columns";
else if (navigator.userAgent.match(/Android/i)) html.className += " android";
else if (navigator.userAgent.match(/Windows Phone OS [6-7]+/i)) html.className += " winphone7", html.className += " winphone", html.className += " no-list-columns";
else if (navigator.userAgent.match(/Windows Phone/i)) html.className += " winphone";
else if (navigator.userAgent.match(/MSIE [5-9]/i)) html.className += " ie no-list-columns", html.className += navigator.userAgent.match(/MSIE 8/i) ? " ie8 lte8 lte9 lte10 lte11 lte12" : "", html.className += navigator.userAgent.match(/MSIE 9/i) ? " ie9 lte9 lte10 lte11 lte12" : "", isIE = !0;
else {
	var docModeIE = document.documentMode;
	if ("undefined" != typeof docModeIE) switch (docModeIE) {
	case 10:
		isIE = !0, html.className += " ie ie-higher-than-9 ie10 lte10 lte11 lte12";
		break;
	case 11:
		isIE = !0, html.className += " ie ie-higher-than-9 ie11 lte11 lte12";
		break;
	case 12:
		isIE = !0, html.className += " ie ie-higher-than-9 ie12 lte12"
	}
}
isIE || (html.className += " not-ie"), "ontouchstart" in document.documentElement ? html.className += " has-touch" : "onmouseover" in document.documentElement && (html.className += " has-mouse"), window.parent == window && window.top == window || "PreviewFrame" === window.name || (html.className += " iframe"), "geolocation" in window.navigator ? html.className += " geoposition" : html.className += " no-geoposition", (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)) && (html.className += " ios"), navigator.userAgent.match(/Ica \w* iOS/i) && (html.className += " ios ica-app"), window.innerWidth > 700 ? html.className += " is-desktop" : window.innerWidth < 480 ? html.className += " is-mobile" : html.className += " is-tablet", window.devicePixelRatio > 1.5 && (html.className += " retina"), window.console && "undefined" != typeof console || (window.console = window.console || {
	log: function(logMsg) {}
}), !
function(e, t, n) {
	function r(e, t) {
		return typeof e === t
	}
	function o() {
		var e, t, n, o, i, s, a;
		for (var u in C) if (C.hasOwnProperty(u)) {
			if (e = [], t = C[u], t.name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length)) for (n = 0; n < t.options.aliases.length; n++) e.push(t.options.aliases[n].toLowerCase());
			for (o = r(t.fn, "function") ? t.fn() : t.fn, i = 0; i < e.length; i++) s = e[i], a = s.split("."), 1 === a.length ? Modernizr[a[0]] = o : (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = o), x.push((o ? "" : "no-") + a.join("-"))
		}
	}
	function i(e) {
		var t = S.className,
			n = Modernizr._config.classPrefix || "";
		if (b && (t = t.baseVal), Modernizr._config.enableJSClass) {
			var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
			t = t.replace(r, "$1" + n + "js$2")
		}
		Modernizr._config.enableClasses && (t += " " + n + e.join(" " + n), b ? S.className.baseVal = t : S.className = t)
	}
	function s(e, t) {
		if ("object" == typeof e) for (var n in e) z(e, n) && s(n, e[n]);
		else {
			e = e.toLowerCase();
			var r = e.split("."),
				o = Modernizr[r[0]];
			if (2 == r.length && (o = o[r[1]]), "undefined" != typeof o) return Modernizr;
			t = "function" == typeof t ? t() : t, 1 == r.length ? Modernizr[r[0]] = t : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), Modernizr[r[0]][r[1]] = t), i([(t && 0 != t ? "" : "no-") + r.join("-")]), Modernizr._trigger(e, t)
		}
		return Modernizr
	}
	function a() {
		return "function" != typeof t.createElement ? t.createElement(arguments[0]) : b ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) : t.createElement.apply(t, arguments)
	}
	function u(e) {
		return e.replace(/([a-z])-([a-z])/g, function(e, t, n) {
			return t + n.toUpperCase()
		}).replace(/^-/, "")
	}
	function f(e, t) {
		return !!~ ("" + e).indexOf(t)
	}
	function l() {
		var e = t.body;
		return e || (e = a(b ? "svg" : "body"), e.fake = !0), e
	}
	function d(e, n, r, o) {
		var i, s, u, f, d = "modernizr",
			c = a("div"),
			p = l();
		if (parseInt(r, 10)) for (; r--;) u = a("div"), u.id = o ? o[r] : d + (r + 1), c.appendChild(u);
		return i = a("style"), i.type = "text/css", i.id = "s" + d, (p.fake ? p : c).appendChild(i), p.appendChild(c), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(t.createTextNode(e)), c.id = d, p.fake && (p.style.background = "", p.style.overflow = "hidden", f = S.style.overflow, S.style.overflow = "hidden", S.appendChild(p)), s = n(c, e), p.fake ? (p.parentNode.removeChild(p), S.style.overflow = f, S.offsetHeight) : c.parentNode.removeChild(c), !! s
	}
	function c(e, t) {
		return function() {
			return e.apply(t, arguments)
		}
	}
	function p(e, t, n) {
		var o;
		for (var i in e) if (e[i] in t) return n === !1 ? e[i] : (o = t[e[i]], r(o, "function") ? c(o, n || t) : o);
		return !1
	}
	function h(e) {
		return e.replace(/([A-Z])/g, function(e, t) {
			return "-" + t.toLowerCase()
		}).replace(/^ms-/, "-ms-")
	}
	function m(t, r) {
		var o = t.length;
		if ("CSS" in e && "supports" in e.CSS) {
			for (; o--;) if (e.CSS.supports(h(t[o]), r)) return !0;
			return !1
		}
		if ("CSSSupportsRule" in e) {
			for (var i = []; o--;) i.push("(" + h(t[o]) + ":" + r + ")");
			return i = i.join(" or "), d("@supports (" + i + ") { #modernizr { position: absolute; } }", function(e) {
				return "absolute" == getComputedStyle(e, null).position
			})
		}
		return n
	}
	function v(e, t, o, i) {
		function s() {
			d && (delete q.style, delete q.modElem)
		}
		if (i = !r(i, "undefined") && i, !r(o, "undefined")) {
			var l = m(e, o);
			if (!r(l, "undefined")) return l
		}
		for (var d, c, p, h, v, g = ["modernizr", "tspan", "samp"]; !q.style && g.length;) d = !0, q.modElem = a(g.shift()), q.style = q.modElem.style;
		for (p = e.length, c = 0; p > c; c++) if (h = e[c], v = q.style[h], f(h, "-") && (h = u(h)), q.style[h] !== n) {
			if (i || r(o, "undefined")) return s(), "pfx" != t || h;
			try {
				q.style[h] = o
			} catch (y) {}
			if (q.style[h] != v) return s(), "pfx" != t || h
		}
		return s(), !1
	}
	function g(e, t, n, o, i) {
		var s = e.charAt(0).toUpperCase() + e.slice(1),
			a = (e + " " + k.join(s + " ") + s).split(" ");
		return r(t, "string") || r(t, "undefined") ? v(a, t, o, i) : (a = (e + " " + P.join(s + " ") + s).split(" "), p(a, t, n))
	}
	function y(e, t, r) {
		return g(e, n, n, t, r)
	}
	var x = [],
		C = [],
		_ = {
			_version: "3.3.1",
			_config: {
				classPrefix: "",
				enableClasses: !0,
				enableJSClass: !0,
				usePrefixes: !0
			},
			_q: [],
			on: function(e, t) {
				var n = this;
				setTimeout(function() {
					t(n[e])
				}, 0)
			},
			addTest: function(e, t, n) {
				C.push({
					name: e,
					fn: t,
					options: n
				})
			},
			addAsyncTest: function(e) {
				C.push({
					name: null,
					fn: e
				})
			}
		},
		Modernizr = function() {};
	Modernizr.prototype = _, Modernizr = new Modernizr, Modernizr.addTest("history", function() {
		var t = navigator.userAgent;
		return (-1 === t.indexOf("Android 2.") && -1 === t.indexOf("Android 4.0") || -1 === t.indexOf("Mobile Safari") || -1 !== t.indexOf("Chrome") || -1 !== t.indexOf("Windows Phone")) && (e.history && "pushState" in e.history)
	}), Modernizr.addTest("localstorage", function() {
		var e = "modernizr";
		try {
			return localStorage.setItem(e, e), localStorage.removeItem(e), !0
		} catch (t) {
			return !1
		}
	}), Modernizr.addTest("sessionstorage", function() {
		var e = "modernizr";
		try {
			return sessionStorage.setItem(e, e), sessionStorage.removeItem(e), !0
		} catch (t) {
			return !1
		}
	});
	var w = _._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
	_._prefixes = w;
	var S = t.documentElement,
		b = "svg" === S.nodeName.toLowerCase(),
		T = "Moz O ms Webkit",
		P = _._config.usePrefixes ? T.toLowerCase().split(" ") : [];
	_._domPrefixes = P;
	var z;
	!
	function() {
		var e = {}.hasOwnProperty;
		z = r(e, "undefined") || r(e.call, "undefined") ?
		function(e, t) {
			return t in e && r(e.constructor.prototype[t], "undefined")
		} : function(t, n) {
			return e.call(t, n)
		}
	}(), _._l = {}, _.on = function(e, t) {
		this._l[e] || (this._l[e] = []), this._l[e].push(t), Modernizr.hasOwnProperty(e) && setTimeout(function() {
			Modernizr._trigger(e, Modernizr[e])
		}, 0)
	}, _._trigger = function(e, t) {
		if (this._l[e]) {
			var n = this._l[e];
			setTimeout(function() {
				var e, r;
				for (e = 0; e < n.length; e++)(r = n[e])(t)
			}, 0), delete this._l[e]
		}
	}, Modernizr._q.push(function() {
		_.addTest = s
	});
	var E = function() {
			function e(e, t) {
				var o;
				return !!e && (t && "string" != typeof t || (t = a(t || "div")), e = "on" + e, o = e in t, !o && r && (t.setAttribute || (t = a("div")), t.setAttribute(e, ""), o = "function" == typeof t[e], t[e] !== n && (t[e] = n), t.removeAttribute(e)), o)
			}
			var r = !("onblur" in t.documentElement);
			return e
		}();
	_.hasEvent = E, Modernizr.addTest("hashchange", function() {
		return E("hashchange", e) !== !1 && (t.documentMode === n || t.documentMode > 7)
	}), Modernizr.addTest("canvas", function() {
		var e = a("canvas");
		return !(!e.getContext || !e.getContext("2d"))
	}), Modernizr.addTest("canvastext", function() {
		return Modernizr.canvas !== !1 && "function" == typeof a("canvas").getContext("2d").fillText
	}), Modernizr.addTest("multiplebgs", function() {
		var e = a("a").style;
		return e.cssText = "background:url(https://),url(https://),red url(https://)", /(url\s*\(.*?){3}/.test(e.background)
	});
	var O = "CSS" in e && "supports" in e.CSS,
		A = "supportsCSS" in e;
	Modernizr.addTest("supports", O || A);
	var k = _._config.usePrefixes ? T.split(" ") : [];
	_._cssomPrefixes = k;
	var N = function(t) {
			var r, o = w.length,
				i = e.CSSRule;
			if ("undefined" == typeof i) return n;
			if (!t) return !1;
			if (t = t.replace(/^@/, ""), r = t.replace(/-/g, "_").toUpperCase() + "_RULE", r in i) return "@" + t;
			for (var s = 0; o > s; s++) {
				var a = w[s],
					u = a.toUpperCase() + "_" + r;
				if (u in i) return "@-" + a.toLowerCase() + "-" + t
			}
			return !1
		};
	_.atRule = N;
	var j = _.testStyles = d,
		L = {
			elem: a("modernizr")
		};
	Modernizr._q.push(function() {
		delete L.elem
	});
	var q = {
		style: L.elem.style
	};
	Modernizr._q.unshift(function() {
		delete q.style
	});
	var I = _.testProp = function(e, t, r) {
			return v([e], n, t, r)
		};
	Modernizr.addTest("textshadow", I("textShadow", "1px 1px")), _.testAllProps = g, _.prefixed = function(e, t, n) {
		return 0 === e.indexOf("@") ? N(e) : (-1 != e.indexOf("-") && (e = u(e)), t ? g(e, t, n) : g(e, "pfx"))
	}, _.testAllProps = y, Modernizr.addTest("cssanimations", y("animationName", "a", !0)), Modernizr.addTest("csstransforms3d", function() {
		var e = !! y("perspective", "1px", !0),
			t = Modernizr._config.usePrefixes;
		if (e && (!t || "webkitPerspective" in S.style)) {
			var n, r = "#modernizr{width:0;height:0}";
			Modernizr.supports ? n = "@supports (perspective: 1px)" : (n = "@media (transform-3d)", t && (n += ",(-webkit-transform-3d)")), n += "{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}", j(r + n, function(t) {
				e = 7 === t.offsetWidth && 18 === t.offsetHeight
			})
		}
		return e
	}), Modernizr.addTest("csstransitions", y("transition", "all", !0)), o(), i(x), delete _.addTest, delete _.addAsyncTest;
	for (var R = 0; R < Modernizr._q.length; R++) Modernizr._q[R]();
	e.Modernizr = Modernizr
}(window, document), function() {
	if ("performance" in window == 0 && (window.performance = {}), Date.now = Date.now ||
	function() {
		return (new Date).getTime()
	}, "now" in window.performance == 0) {
		var nowOffset = Date.now();
		performance.timing && performance.timing.navigationStart && (nowOffset = performance.timing.navigationStart), window.performance.now = function() {
			return Date.now() - nowOffset
		}
	}
}(), $(document).ready(function() {
	ICA.fn && (ICA.fn.isRetina() && $("html").addClass("retinaDevice"), ICA.fn.isMobileDevice() ? $("html").addClass("mobile-device") : $("html").addClass("no-mobile-device"), $("html").addClass("no-touch-device has-hover"), $("body").on("touchstart.test", function() {
		ICA.fn.hasTouch = !0, $("body").off("touchstart.test"), $(html).removeClass("no-touch-device has-hover").addClass("touch-device no-hover")
	}))
}), String.prototype.startsWith || (String.prototype.startsWith = function(searchString, position) {
	return position = position || 0, this.substr(position, searchString.length) === searchString
}), String.prototype.endsWith || (String.prototype.endsWith = function(searchString, position) {
	var subjectString = this.toString();
	("number" != typeof position || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) && (position = subjectString.length), position -= searchString.length;
	var lastIndex = subjectString.lastIndexOf(searchString, position);
	return lastIndex !== -1 && lastIndex === position
}), String.prototype.trim || (String.prototype.trim = function() {
	return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
}), Number.isNaN = Number.isNaN ||
function(value) {
	return "number" == typeof value && isNaN(value)
}, Number.isInteger = Number.isInteger ||
function(value) {
	return "number" == typeof value && isFinite(value) && Math.floor(value) === value
}, Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
	value: function(predicate) {
		"use strict";
		if (null == this) throw new TypeError("Array.prototype.findIndex called on null or undefined");
		if ("function" != typeof predicate) throw new TypeError("predicate must be a function");
		for (var value, list = Object(this), length = list.length >>> 0, thisArg = arguments[1], i = 0; i < length; i++) if (value = list[i], predicate.call(thisArg, value, i, list)) return i;
		return -1
	},
	enumerable: !1,
	configurable: !1,
	writable: !1
});
!
function(root, factory) {
	"function" == typeof define && define.amd ? define([], function() {
		return root.svg4everybody = factory()
	}) : "object" == typeof module && module.exports ? module.exports = factory() : root.svg4everybody = factory()
}(this, function() {
	function embed(parent, svg, target) {
		if (target) {
			var fragment = document.createDocumentFragment(),
				viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
			viewBox && svg.setAttribute("viewBox", viewBox);
			for (var clone = target.cloneNode(!0); clone.childNodes.length;) fragment.appendChild(clone.firstChild);
			parent.appendChild(fragment)
		}
	}
	function loadreadystatechange(xhr) {
		xhr.onreadystatechange = function() {
			if (4 === xhr.readyState) {
				var cachedDocument = xhr._cachedDocument;
				cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""), cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}), xhr._embeds.splice(0).map(function(item) {
					var target = xhr._cachedTarget[item.id];
					target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)), embed(item.parent, item.svg, target)
				})
			}
		}, xhr.onreadystatechange()
	}
	function svg4everybody(rawopts) {
		function oninterval() {
			for (var index = 0; index < uses.length;) {
				var use = uses[index],
					parent = use.parentNode,
					svg = getSVGAncestor(parent);
				if (svg) {
					var src = use.getAttribute("xlink:href") || use.getAttribute("href");
					if (polyfill && (!opts.validate || opts.validate(src, svg, use))) {
						parent.removeChild(use);
						var srcSplit = src.split("#"),
							url = srcSplit.shift(),
							id = srcSplit.join("#");
						if (url.length) {
							var xhr = requests[url];
							xhr || (xhr = requests[url] = new XMLHttpRequest, xhr.open("GET", url), xhr.send(), xhr._embeds = []), xhr._embeds.push({
								parent: parent,
								svg: svg,
								id: id
							}), loadreadystatechange(xhr)
						} else embed(parent, document.getElementById(id))
					}
				} else++index
			}
			requestAnimationFrame(oninterval, 67)
		}
		var polyfill, opts = Object(rawopts),
			newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,
			webkitUA = /\bAppleWebKit\/(\d+)\b/,
			olderEdgeUA = /\bEdge\/12\.(\d+)\b/;
		polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537;
		var requests = {},
			requestAnimationFrame = window.requestAnimationFrame || setTimeout,
			uses = document.getElementsByTagName("use");
		polyfill && oninterval()
	}
	function getSVGAncestor(node) {
		for (var svg = node;
		"svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode););
		return svg
	}
	return svg4everybody
});
window.svg4everybody && svg4everybody();
if ("function" != typeof HTMLElement) {
	var _HTMLElement = function() {};
	_HTMLElement.prototype = HTMLElement.prototype, HTMLElement = _HTMLElement, console.log("SHIMMING HTMLElement")
}!
function(e, t, n) {
	function r(e, t) {
		return typeof e === t
	}
	function o() {
		var e, t, n, o, i, s, a;
		for (var u in C) if (C.hasOwnProperty(u)) {
			if (e = [], t = C[u], t.name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length)) for (n = 0; n < t.options.aliases.length; n++) e.push(t.options.aliases[n].toLowerCase());
			for (o = r(t.fn, "function") ? t.fn() : t.fn, i = 0; i < e.length; i++) s = e[i], a = s.split("."), 1 === a.length ? Modernizr[a[0]] = o : (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = o), x.push((o ? "" : "no-") + a.join("-"))
		}
	}
	function i(e) {
		var t = S.className,
			n = Modernizr._config.classPrefix || "";
		if (T && (t = t.baseVal), Modernizr._config.enableJSClass) {
			var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
			t = t.replace(r, "$1" + n + "js$2")
		}
		Modernizr._config.enableClasses && (t += " " + n + e.join(" " + n), T ? S.className.baseVal = t : S.className = t)
	}
	function s(e, t) {
		if ("object" == typeof e) for (var n in e) z(e, n) && s(n, e[n]);
		else {
			e = e.toLowerCase();
			var r = e.split("."),
				o = Modernizr[r[0]];
			if (2 == r.length && (o = o[r[1]]), "undefined" != typeof o) return Modernizr;
			t = "function" == typeof t ? t() : t, 1 == r.length ? Modernizr[r[0]] = t : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), Modernizr[r[0]][r[1]] = t), i([(t && 0 != t ? "" : "no-") + r.join("-")]), Modernizr._trigger(e, t)
		}
		return Modernizr
	}
	function a() {
		return "function" != typeof t.createElement ? t.createElement(arguments[0]) : T ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) : t.createElement.apply(t, arguments)
	}
	function u(e) {
		return e.replace(/([a-z])-([a-z])/g, function(e, t, n) {
			return t + n.toUpperCase()
		}).replace(/^-/, "")
	}
	function f(e, t) {
		return !!~ ("" + e).indexOf(t)
	}
	function l() {
		var e = t.body;
		return e || (e = a(T ? "svg" : "body"), e.fake = !0), e
	}
	function d(e, n, r, o) {
		var i, s, u, f, d = "modernizr",
			c = a("div"),
			p = l();
		if (parseInt(r, 10)) for (; r--;) u = a("div"), u.id = o ? o[r] : d + (r + 1), c.appendChild(u);
		return i = a("style"), i.type = "text/css", i.id = "s" + d, (p.fake ? p : c).appendChild(i), p.appendChild(c), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(t.createTextNode(e)), c.id = d, p.fake && (p.style.background = "", p.style.overflow = "hidden", f = S.style.overflow, S.style.overflow = "hidden", S.appendChild(p)), s = n(c, e), p.fake ? (p.parentNode.removeChild(p), S.style.overflow = f, S.offsetHeight) : c.parentNode.removeChild(c), !! s
	}
	function c(e, t) {
		return function() {
			return e.apply(t, arguments)
		}
	}
	function p(e, t, n) {
		var o;
		for (var i in e) if (e[i] in t) return n === !1 ? e[i] : (o = t[e[i]], r(o, "function") ? c(o, n || t) : o);
		return !1
	}
	function h(e) {
		return e.replace(/([A-Z])/g, function(e, t) {
			return "-" + t.toLowerCase()
		}).replace(/^ms-/, "-ms-")
	}
	function m(t, r) {
		var o = t.length;
		if ("CSS" in e && "supports" in e.CSS) {
			for (; o--;) if (e.CSS.supports(h(t[o]), r)) return !0;
			return !1
		}
		if ("CSSSupportsRule" in e) {
			for (var i = []; o--;) i.push("(" + h(t[o]) + ":" + r + ")");
			return i = i.join(" or "), d("@supports (" + i + ") { #modernizr { position: absolute; } }", function(e) {
				return "absolute" == getComputedStyle(e, null).position
			})
		}
		return n
	}
	function v(e, t, o, i) {
		function s() {
			d && (delete q.style, delete q.modElem)
		}
		if (i = !r(i, "undefined") && i, !r(o, "undefined")) {
			var l = m(e, o);
			if (!r(l, "undefined")) return l
		}
		for (var d, c, p, h, v, g = ["modernizr", "tspan", "samp"]; !q.style && g.length;) d = !0, q.modElem = a(g.shift()), q.style = q.modElem.style;
		for (p = e.length, c = 0; p > c; c++) if (h = e[c], v = q.style[h], f(h, "-") && (h = u(h)), q.style[h] !== n) {
			if (i || r(o, "undefined")) return s(), "pfx" != t || h;
			try {
				q.style[h] = o
			} catch (y) {}
			if (q.style[h] != v) return s(), "pfx" != t || h
		}
		return s(), !1
	}
	function g(e, t, n, o, i) {
		var s = e.charAt(0).toUpperCase() + e.slice(1),
			a = (e + " " + A.join(s + " ") + s).split(" ");
		return r(t, "string") || r(t, "undefined") ? v(a, t, o, i) : (a = (e + " " + P.join(s + " ") + s).split(" "), p(a, t, n))
	}
	function y(e, t, r) {
		return g(e, n, n, t, r)
	}
	var x = [],
		C = [],
		_ = {
			_version: "3.3.1",
			_config: {
				classPrefix: "",
				enableClasses: !0,
				enableJSClass: !0,
				usePrefixes: !0
			},
			_q: [],
			on: function(e, t) {
				var n = this;
				setTimeout(function() {
					t(n[e])
				}, 0)
			},
			addTest: function(e, t, n) {
				C.push({
					name: e,
					fn: t,
					options: n
				})
			},
			addAsyncTest: function(e) {
				C.push({
					name: null,
					fn: e
				})
			}
		},
		Modernizr = function() {};
	Modernizr.prototype = _, Modernizr = new Modernizr, Modernizr.addTest("history", function() {
		var t = navigator.userAgent;
		return (-1 === t.indexOf("Android 2.") && -1 === t.indexOf("Android 4.0") || -1 === t.indexOf("Mobile Safari") || -1 !== t.indexOf("Chrome") || -1 !== t.indexOf("Windows Phone")) && (e.history && "pushState" in e.history)
	}), Modernizr.addTest("localstorage", function() {
		var e = "modernizr";
		try {
			return localStorage.setItem(e, e), localStorage.removeItem(e), !0
		} catch (t) {
			return !1
		}
	}), Modernizr.addTest("sessionstorage", function() {
		var e = "modernizr";
		try {
			return sessionStorage.setItem(e, e), sessionStorage.removeItem(e), !0
		} catch (t) {
			return !1
		}
	});
	var w = _._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
	_._prefixes = w;
	var S = t.documentElement,
		T = "svg" === S.nodeName.toLowerCase(),
		b = "Moz O ms Webkit",
		P = _._config.usePrefixes ? b.toLowerCase().split(" ") : [];
	_._domPrefixes = P;
	var z;
	!
	function() {
		var e = {}.hasOwnProperty;
		z = r(e, "undefined") || r(e.call, "undefined") ?
		function(e, t) {
			return t in e && r(e.constructor.prototype[t], "undefined")
		} : function(t, n) {
			return e.call(t, n)
		}
	}(), _._l = {}, _.on = function(e, t) {
		this._l[e] || (this._l[e] = []), this._l[e].push(t), Modernizr.hasOwnProperty(e) && setTimeout(function() {
			Modernizr._trigger(e, Modernizr[e])
		}, 0)
	}, _._trigger = function(e, t) {
		if (this._l[e]) {
			var n = this._l[e];
			setTimeout(function() {
				var e, r;
				for (e = 0; e < n.length; e++)(r = n[e])(t)
			}, 0), delete this._l[e]
		}
	}, Modernizr._q.push(function() {
		_.addTest = s
	});
	var O = function() {
			function e(e, t) {
				var o;
				return !!e && (t && "string" != typeof t || (t = a(t || "div")), e = "on" + e, o = e in t, !o && r && (t.setAttribute || (t = a("div")), t.setAttribute(e, ""), o = "function" == typeof t[e], t[e] !== n && (t[e] = n), t.removeAttribute(e)), o)
			}
			var r = !("onblur" in t.documentElement);
			return e
		}();
	_.hasEvent = O, Modernizr.addTest("hashchange", function() {
		return O("hashchange", e) !== !1 && (t.documentMode === n || t.documentMode > 7)
	}), Modernizr.addTest("canvas", function() {
		var e = a("canvas");
		return !(!e.getContext || !e.getContext("2d"))
	}), Modernizr.addTest("canvastext", function() {
		return Modernizr.canvas !== !1 && "function" == typeof a("canvas").getContext("2d").fillText
	}), Modernizr.addTest("multiplebgs", function() {
		var e = a("a").style;
		return e.cssText = "background:url(https://),url(https://),red url(https://)", /(url\s*\(.*?){3}/.test(e.background)
	}), Modernizr.addTest("csspositionsticky", function() {
		var e = "position:",
			t = "sticky",
			n = a("a"),
			r = n.style;
		return r.cssText = e + w.join(t + ";" + e).slice(0, -e.length), -1 !== r.position.indexOf(t)
	});
	var k = "CSS" in e && "supports" in e.CSS,
		E = "supportsCSS" in e;
	Modernizr.addTest("supports", k || E);
	var A = _._config.usePrefixes ? b.split(" ") : [];
	_._cssomPrefixes = A;
	var j = function(t) {
			var r, o = w.length,
				i = e.CSSRule;
			if ("undefined" == typeof i) return n;
			if (!t) return !1;
			if (t = t.replace(/^@/, ""), r = t.replace(/-/g, "_").toUpperCase() + "_RULE", r in i) return "@" + t;
			for (var s = 0; o > s; s++) {
				var a = w[s],
					u = a.toUpperCase() + "_" + r;
				if (u in i) return "@-" + a.toLowerCase() + "-" + t
			}
			return !1
		};
	_.atRule = j;
	var N = _.testStyles = d,
		L = {
			elem: a("modernizr")
		};
	Modernizr._q.push(function() {
		delete L.elem
	});
	var q = {
		style: L.elem.style
	};
	Modernizr._q.unshift(function() {
		delete q.style
	});
	var I = _.testProp = function(e, t, r) {
			return v([e], n, t, r)
		};
	Modernizr.addTest("textshadow", I("textShadow", "1px 1px")), _.testAllProps = g, _.prefixed = function(e, t, n) {
		return 0 === e.indexOf("@") ? j(e) : (-1 != e.indexOf("-") && (e = u(e)), t ? g(e, t, n) : g(e, "pfx"))
	}, _.testAllProps = y, Modernizr.addTest("cssanimations", y("animationName", "a", !0)), Modernizr.addTest("csstransforms3d", function() {
		var e = !! y("perspective", "1px", !0),
			t = Modernizr._config.usePrefixes;
		if (e && (!t || "webkitPerspective" in S.style)) {
			var n, r = "#modernizr{width:0;height:0}";
			Modernizr.supports ? n = "@supports (perspective: 1px)" : (n = "@media (transform-3d)", t && (n += ",(-webkit-transform-3d)")), n += "{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}", N(r + n, function(t) {
				e = 7 === t.offsetWidth && 18 === t.offsetHeight
			})
		}
		return e
	}), Modernizr.addTest("csstransitions", y("transition", "all", !0)), o(), i(x), delete _.addTest, delete _.addAsyncTest;
	for (var R = 0; R < Modernizr._q.length; R++) Modernizr._q[R]();
	e.Modernizr = Modernizr
}(window, document);
var ICA = ICA || {};
!
function($, window, document, ICA, undefined) {
	ICA.ajax = function() {
		function _legacyAjax() {
			var context = ($(document), this);
			return context.init = function() {
				return context
			}, context.post = function(url, args, success, error, datatype, asyncPost) {
				if (!url) return "";
				var params = $.extend({
					callerPageIsActivated: ICA.legacy.currentPageRwdStatus
				}, args);
				return context.xhr = $.ajax({
					url: url,
					type: "post",
					cache: !1,
					dataType: datatype ? datatype : "json",
					data: params,
					success: success ? success : context.defaultSuccess,
					error: error ? error : context.defaultError,
					async: "boolean" != typeof asyncPost || asyncPost
				}), context.xhr
			}, context.getTraditional = function(url, args, success, error, datatype, asyncGet, useCache) {
				context.get(url, args, success, error, datatype, asyncGet, !0, useCache)
			}, context.get = function(url, args, success, error, datatype, asyncGet, traditional, useCache) {
				if (!url) return "No url";
				var params = $.extend({
					callerPageIsActivated: ICA.legacy.currentPageRwdStatus
				}, args);
				return context.xhr = $.ajax({
					url: url,
					type: "get",
					cache: useCache === !0,
					data: params,
					dataType: datatype ? datatype : "html",
					success: success ? success : context.defaultSuccess,
					error: error ? error : context.defaultError,
					async: "boolean" != typeof asyncGet || asyncGet,
					traditional: !! traditional && traditional
				}), context.xhr
			}, context.defaultSuccess = function(data) {}, context.defaultError = function(error) {}, context.init()
		}
		return new _legacyAjax
	}()
}(jQuery, this, this.document, ICA);
var ICA = ICA || {};
!
function($, window, document, ICA, undefined) {
	ICA.legacy = function() {
		function _legacy() {
			var context = ($(document), this);
			return context.init = function() {
				return context.currentpageId = $("#hdnCurrentPageId").val(), context.loggedIn = "vip" === $("#hdnIcaState").val(), context.currentPageRwdStatus = $("#hdnCurrentPageRwdStatus").val(), context
			}, context.trackevent = function(e, param, value) {}, context.abort = function() {
				return ICA.ajax.xhr && ICA.ajax.xhr.abort(), !1
			}, context.perform = function(command, params, success, error) {
				switch (command) {
				case "sendRecipe":
					context.email.sendRecipe(params, success, error);
					break;
				case "sendArticle":
					context.email.sendArticle(params, success, error);
					break;
				case "sendOffer":
					context.email.sendOffer(params, success, error);
					break;
				case "sendApplicationForm":
					context.email.sendApplicationPage(params, success, error);
					break;
				case "shoppinglist":
					context.shoppingList.add(params, success, error);
					break;
				case "reportComment":
					context.comment.report(params, success, error);
					break;
				case "UpdateOfferSettings":
					context.mypages.OfferSettingsSave(params, success, error);
					break;
				case "UpdateOfferSettingsRWD":
					context.mypages.OfferSettingsSaveRWD(params, success, error);
					break;
				case "traceCoffe":
					"traceCoffeUrl" in params && "default" != params.traceCoffeUrl ? (window.open(params.traceCoffeUrl, "_blank"), "function" == typeof success && success.call()) : "function" == typeof error && error.call();
					break;
				case "subscribe":
					"function" == typeof success && success({
						success: '<a href="url?command=unsubscribe&other=d" data-callbacktype="replace" class="ajaxlink button subscribe">Avsluta prenumeration</a>'
					});
					break;
				case "unsubscribe":
					"function" == typeof success && success({
						success: '<a href="url?command=subscribe&other=d" data-callbacktype="replace" class="ajaxlink button subscribe">Prenumerera</a>'
					});
					break;
				default:
					window.log("Unrecognized command name:" + command), "function" == typeof error && error()
				}
			}, context.setCookie = function(name, value, exp) {
				var expDate = new Date;
				expDate.setDate(expDate.getDate() + exp), document.cookie = name + "=" + escape(value) + (exp ? "; expires=" + expDate.toUTCString() + ";" : "") + "; path=/"
			}, context.getCookie = function(name) {
				for (var cookies = document.cookie.split("; "), i = 0, l = cookies.length; i < l; i++) {
					var pair = cookies[i].split("=");
					if (pair[0] == name) return unescape(pair[1])
				}
			}, context.killCookie = function(name) {
				context.setCookie(name, "", -1)
			}, context.setStorage = function(name, value) {
				$("html").hasClass("localstorage") && localStorage.setItem(name, value)
			}, context.getStorage = function(name) {
				if ($("html").hasClass("localstorage")) return localStorage.getItem(name)
			}, context.killStorage = function(name) {
				return !!$("html").hasClass("localstorage") && localStorage.removeItem(name)
			}, context.get = function(url, args, success, error, datatype) {
				var params = $.extend({
					callerPageId: context.currentpageId
				}, args);
				ICA.ajax.get(url, params, success, error, datatype)
			}, context.bgload = function(url, args, success, error, datatype) {
				ICA.ajax.get(url, args, success, error, datatype)
			}, context.search = function(hashstring, ajaxfunction, scope, success, error) {
				var url = "/templates/ajaxresponse.aspx?id=" + context.currentpageId + (scope ? "&scope=" + scope : "") + "&ajaxFunction=" + ajaxfunction + "&" + hashstring;
				ICA.ajax.get(url, {}, success, error)
			}, context.shoppingList = function() {
				var url = "/Templates/Recipes/Handlers/ShoppingListHandler.ashx ",
					alternateUrl = "/Templates/ShoppingListTemplate/Handlers/ShoppingListHandler.ashx";
				return {
					addRecipe: function(args, callback, error) {
						var params = $.extend({
							recipeIds: [],
							shoppingListId: 0,
							numberOfServings: 0,
							shoppingListName: ""
						}, args);
						ICA.ajax.post(url, params, callback, error)
					},
					removeRecipe: function(listId, secureId, recipeId, callback, error) {
						var params = {
							CommandName: "RemoveRecipe",
							recipeid: recipeId,
							shoppingListId: listId,
							shoppingListSecureId: secureId
						};
						ICA.ajax.post(alternateUrl, params, callback, error)
					},
					addOffer: function(args, callback, error) {
						var params = $.extend({
							productName: undefined,
							shoppingListId: 0,
							isOffer: "offer",
							offerId: 0,
							articleGroupId: 0,
							articleGroupIdExtended: 0,
							storeId: 0,
							recipeIds: [],
							shoppingListName: ""
						}, args);
						ICA.ajax.post(url, params, callback, error)
					},
					newShoppingList: function(name, callback, error) {
						var params = {
							CommandName: "CreateShoppingList",
							newShoppingListName: name
						};
						ICA.ajax.post(alternateUrl, params, callback, error)
					},
					renameShoppingList: function(listId, newName, callback, error) {
						var params = {
							CommandName: "RenameShoppingList",
							shoppingListId: listId,
							newShoppingListName: newName
						};
						ICA.ajax.post(alternateUrl, params, callback, error)
					},
					deleteShoppingList: function(listId, callback, error) {
						var params = {
							CommandName: "RemoveShoppingList",
							shoppingListId: listId
						};
						ICA.ajax.post(alternateUrl, params, callback, error)
					},
					getShoppinglistView: function(recipeId, callback, error) {
						var _url = "/templates/ajaxresponse.aspx?ajaxFunction=AddToShoppingListView&type=recipe&recipeId=" + recipeId;
						ICA.ajax.get(_url, {}, callback, error)
					},
					add: function(args, callback, error) {
						var params = $.extend({
							recipeIds: [],
							ShoppingListId: 0,
							productName: undefined,
							isOffer: !1,
							offerId: 0,
							storeId: 0,
							numberOfServings: 0
						}, args);
						ICA.ajax.post(url, params, callback, error)
					},
					get: function(listId, secureId, sortorderId, callback, error) {
						var params = {
							ajaxFunction: "ShoppingListRows",
							secureId: secureId,
							shoppinglistid: listId,
							sortingOrder: sortorderId
						};
						url = "/Templates/ajaxresponse.aspx", ICA.ajax.get(url, params, callback, error)
					},
					removeRow: function(args, callback, error) {
						var params = $.extend({
							CommandName: "RemoveGroup",
							shoppingListId: undefined,
							shoppingListRowIds: undefined,
							shoppingListSecureId: undefined
						}, args);
						ICA.ajax.post(alternateUrl, params, callback, error)
					},
					getAutocompleteItems: function(query, callback, error) {
						var params = {
							q: query,
							ingredient: query,
							limit: 10
						};
						url = "/Templates/ShoppingListTemplate/Handlers/IngredientSearchHandler.ashx", context.abort(), ICA.ajax.get(url, params, callback, error, "json")
					},
					addRow: function(args, callback, error) {
						var params = $.extend({
							CommandName: "AddRow",
							productName: undefined,
							quantity: undefined,
							shoppingListId: undefined,
							shoppingListSecureId: undefined,
							unit: undefined
						}, args);
						ICA.ajax.post(alternateUrl, params, callback, error)
					},
					updateRow: function(args, callback, error) {
						var params = $.extend({
							CommandName: "UpdateRow",
							productName: undefined,
							quantity: undefined,
							shoppingListId: undefined,
							shoppingListRowId: undefined,
							unit: undefined,
							shoppingListSecureId: undefined,
							isStrikedOver: !1
						}, args);
						ICA.ajax.post(alternateUrl, params, callback, error)
					},
					emailShoppingList: function(args, callback, error) {
						var params = $.extend({
							CommandName: "SendShoppingListByEmail"
						}, args);
						ICA.ajax.post(alternateUrl, params, callback, error)
					}
				}
			}(), context.customer = function() {
				return {
					updatePersonalData: function(cellPhone, email, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPages.ashx",
							params = {
								commandName: "UpdatePersonalData",
								CellPhone: cellPhone,
								Email: email
							};
						ICA.ajax.post(url, params, success, error)
					},
					icaUpdateSubscription: function(subscribe, pul, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPages.ashx",
							params = {
								commandName: "UpdateSubscription",
								Subscribe: subscribe,
								Pul: pul
							};
						ICA.ajax.post(url, params, success, error)
					},
					icaUpdateMyFavouritesSubscription: function(subscribe, url, success, error) {
						var params = {
							subscribe: subscribe,
							callerPageId: context.currentpageId
						};
						ICA.ajax.post(url, params, success, error, "json")
					},
					icaChangeEmail: function(email, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPages.ashx",
							params = {
								commandName: "ChangeEmail",
								Email: email
							};
						ICA.ajax.post(url, params, success, error)
					},
					icaUpdateBonusCheckSubscription: function(subscribe, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPages.ashx",
							params = {
								commandName: "UpdateBonusVoucherMailSubscription",
								Subscribe: subscribe
							};
						ICA.ajax.post(url, params, success, error)
					},
					storeSubscribe: function(storeId, email, success, error) {
						icadatalayer.add("newsletterSubscription", {
							newsletterSubscriptionStoreId: storeId
						});
						var url = "/Templates/Stores/Handlers/StoreStartPageHandler.ashx",
							params = {
								commandName: "OrderNewsLetter",
								StoreId: storeId,
								Email: email
							};
						ICA.ajax.post(url, params, success, error)
					},
					updateEmailSubscriptionData: function(activate, storeId, type, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPages.ashx",
							params = {
								commandName: "UpdateEmailSubscriptionData",
								StoreId: storeId,
								Type: type,
								Activate: activate
							};
						ICA.ajax.post(url, params, success, error)
					},
					annualStatement: function(documentId, success) {
						var url = "/Templates/General/Handlers/AnnualStatementsHandler.ashx",
							params = {
								commandName: "FetchAnnualStatement",
								DocumentId: documentId
							};
						ICA.ajax.get(url, params, success)
					},
					storeUnsubscribe: function(storeId, subscriptionKey, success, error) {
						var url = "/Templates/Stores/Handlers/StoreStartPageHandler.ashx",
							params = {
								commandName: "UnsubscribeNewsLetter",
								StoreId: storeId,
								SubscriptionKey: subscriptionKey
							};
						ICA.ajax.post(url, params, success, error)
					},
					studentUnsubscribe: function(subscriptionKey, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPages.ashx",
							params = {
								commandName: "UnsubscribeStudentSubscription",
								SubscriptionKey: subscriptionKey
							};
						ICA.ajax.post(url, params, success, error)
					},
					loadStoreMailSubscriptions: function(success, error) {
						var ajaxurl = "/Templates/ajaxresponse.aspx?ajaxFunction=MyStoreMailSubscriptions";
						context.get(ajaxurl, {}, success, error, "html")
					},
					loadStudentSubscription: function(success, error) {
						var ajaxurl = "/Templates/ajaxresponse.aspx?ajaxFunction=StudentMailSubscription";
						context.get(ajaxurl, {}, success, error, "html")
					}
				}
			}(), context.dashboard = function() {
				return {
					favoriteRecipes: function(folderId, start, search, pageSize, success, error) {
						var url = "/Templates/ajaxresponse.aspx?ajaxFunction=FavoriteRecipesRecipeContent";
						return folderId && (url += "&folderId=" + folderId), start && (url += "&start=" + start), search && (url += "&search=" + search), pageSize && (url += "&pageSize=" + pageSize), ICA.ajax.get(url, {}, success, error, "html")
					}
				}
			}(), context.savedRecipes = function() {
				var url = "/Templates/Recipes/Handlers/FavoriteRecipesHandler.ashx",
					alternateUrl = "/Templates/General/Handlers/FavoriteRecipes.ashx";
				return {
					createRecipeFolder: function(folderName, success, error) {
						var params = {
							CommandName: "CreateRecipeFolder",
							folderName: folderName
						};
						ICA.ajax.post(alternateUrl, params, success, error)
					},
					deleteRecipeFolder: function(folderId, success, error) {
						var params = {
							CommandName: "DeleteRecipeFolder",
							deleteFolderId: folderId
						};
						ICA.ajax.post(alternateUrl, params, success, error)
					},
					renameRecipeFolder: function(folderId, newName, success, error) {
						var params = {
							CommandName: "RenameRecipeFolder",
							destinationFolderId: folderId,
							folderName: newName
						};
						ICA.ajax.post(alternateUrl, params, success, error)
					},
					add: function(recipeId, success, error) {
						ICA.ajax.get(url, {
							recipeId: recipeId,
							method: "Add"
						}, success, error)
					},
					remove: function(recipeId, success, error) {
						ICA.ajax.get(url, {
							recipeId: recipeId,
							method: "Remove"
						}, success, error)
					},
					move: function(recipeId, destinationFolderId, success, error) {
						var _url = alternateUrl;
						ICA.ajax.post(_url, {
							moveRecipeId: recipeId,
							destinationFolderId: destinationFolderId,
							Commandname: "MoveRecipe"
						}, success, error)
					}
				}
			}(), context.weekPlan = function() {
				var url = "/Templates/WeekPlan/Handlers/WeekPlan.ashx";
				return {
					createWeekplan: function(name, success, error) {
						var params = {
							newWeekPlanName: name,
							weekPlanId: "0"
						};
						context.killCookie("weekPlanLoggedInUserCookie"), ICA.ajax.post(url, {
							Commandname: "CreateWeekPlan",
							"CreateWeekPlan.newWeekPlanName": params.newWeekPlanName
						}, success, error)
					},
					setActiveWeekplan: function(weekplanId, success, error) {
						ICA.ajax.post(url, {
							CommandName: "UpdateWeekPlanCookie",
							"UpdateWeekPlanCookie.weekPlanId": weekplanId
						}, success, error)
					},
					removeWeekplan: function(weekplanID, success, error) {
						var params = {
							Commandname: "DeleteWeekPlan",
							"DeleteWeekPlan.weekPlanId": weekplanID
						};
						ICA.ajax.post(url, params, success, error)
					},
					renameWeekplan: function(weekplanId, newName, success, error) {
						var params = {
							CommandName: "UpdateWeekPlanName",
							"SaveNameClick.weekPlanId": weekplanId,
							"SaveNameClick.weekPlanName": newName
						};
						ICA.ajax.post(url, params, success, error)
					},
					addRecipe: function(args, success, error) {
						var params = $.extend({
							recipeId: 0,
							weekplanId: 0,
							dayNum: undefined
						}, args);
						ICA.ajax.post(url, {
							Commandname: "AddRecipeToWeekPlan",
							"AddRecipeToWeekPlan.recipeId": params.recipeId,
							"AddRecipeToWeekPlan.weekplanId": params.weekplanId,
							"AddRecipeToWeekPlan.dayNum": params.dayNum
						}, success, error)
					},
					addRecipeToSelected: function(args, success, error) {
						var params = $.extend({
							recipeId: 0,
							dayNum: undefined
						}, args);
						ICA.ajax.post(url, {
							Commandname: "AddRecipeToSelectedWeekPlan",
							"AddRecipeToSelectedWeekPlan.recipeId": params.recipeId,
							"AddRecipeToSelectedWeekPlan.dayNum": params.dayNum
						}, success, error)
					},
					addMenu: function(args, success, error) {
						var params = $.extend({
							recipeIds: 0,
							weekPlanId: -1
						}, args);
						ICA.ajax.post(url, {
							CommandName: "AddMenuToWeekPlan",
							"AddMenuToWeekPlan.RecipeIds": params.recipeIds,
							"AddMenuToWeekPlan.WeekPlanId": params.weekPlanId
						}, success, error)
					},
					removeRecipe: function(args, success, error) {
						var params = $.extend({
							weekPlanItemId: 0
						}, args);
						ICA.ajax.post(url, {
							CommandName: "DeleteWeekPlanItem",
							"DeleteWeekPlanItem.WeekPlanItemId": params.weekPlanItemId
						}, success, error)
					}
				}
			}(), context.recipeRating = function() {
				var url = "/Templates/Recipes/Handlers/RecipeCommentHandler.ashx";
				return {
					vote: function(args, success, error) {
						var params = $.extend({
							RecipeId: 0,
							Rating: undefined
						}, args);
						ICA.ajax.post(url, {
							commandName: "SetRecipeRating",
							"SetRecipeRating.RecipeId": params.RecipeId,
							"SetRecipeRating.Rating": params.Rating
						}, success, error)
					}
				}
			}(), context.recipeServings = function() {
				var url = "";
				return {
					change: function(args, success, error) {
						var params = $.extend({
							RecipeId: 0,
							NumberOfServings: 1
						}, args);
						ICA.ajax.post(url, {
							Commandname: "ChangeRecipeServings",
							ChangeRecipeServings: params
						}, success, error)
					}
				}
			}(), context.comment = function() {
				var url = "/Templates/Recipes/Handlers/RecipeCommentHandler.ashx";
				return {
					add: function(args, success, error) {
						var params = $.extend({
							RecipeId: 0,
							RecipeCommentText: undefined,
							SendEmailToEditorialStaff: !1,
							CommentatorEmail: undefined,
							GuidlinesOk: !1
						}, args);
						ICA.ajax.post(url, {
							Commandname: "AddRecipeComment",
							"AddRecipeComment.recipeId": params.RecipeId,
							"AddRecipeComment.RecipeCommentText": params.RecipeCommentText,
							"AddRecipeComment.SendEmailToEditorialStaff": params.SendEmailToEditorialStaff,
							"AddRecipeComment.CommentatorEmail": params.CommentatorEmail,
							"AddRecipeComment.GuidlinesOk": params.GuidlinesOk,
							"AddRecipeComment.RecipeUrl": window.location.href
						}, success, error)
					},
					report: function(args, success, error) {
						var params = $.extend({
							RecipeId: 0,
							RecipeCommentText: undefined,
							ReportText: undefined,
							ReporterEmail: undefined
						}, args);
						ICA.ajax.post(url, {
							Commandname: "ReportRecipeComment",
							"ReportRecipeComment.RecipeId": params.RecipeId,
							"ReportRecipeComment.RecipeCommentText": params.RecipeCommentText,
							"ReportRecipeComment.Reporttext": params.ReportText,
							"ReportRecipeComment.ReporterEmail": params.ReporterEmail,
							"ReportRecipeComment.RecipeUrl": window.location.href
						}, success, error)
					},
					remove: function(recipeID, success, error) {},
					edit: function(args, success, error) {}
				}
			}(), context.email = function() {
				var url = "/Templates/General/Handlers/SendEmail.ashx";
				return {
					sendArticle: function(args, success, error) {
						var params = $.extend({
							articleSendFrom: undefined,
							articleSendEmail: undefined
						}, args);
						ICA.ajax.post(url, $.extend(params, {
							Commandname: "SendArticleByEmail",
							callerPageID: context.currentpageId
						}), success, error)
					},
					sendOffer: function(args, success, error) {
						var params = $.extend({
							offerSendFrom: undefined,
							offerSendEmail: undefined,
							name: undefined,
							price: undefined,
							enddate: undefined
						}, args);
						ICA.ajax.post(url, $.extend(params, {
							Commandname: "SendOfferByEmail",
							callerPageID: context.currentpageId
						}), success, error)
					},
					sendRecipe: function(args, success, error) {
						var params = $.extend({
							recipeSendFrom: undefined,
							recipeSendEmail: undefined
						}, args);
						ICA.ajax.post(url, $.extend(params, {
							Commandname: "SendRecipeByEmail",
							callerPageID: context.currentpageId
						}), success, error)
					},
					sendApplicationPage: function(args, success, error) {
						ICA.ajax.post(url, $.extend(args, {
							CommandName: "SendApplicationPageByEmail",
							callerPageId: context.currentpageId
						}), success, error)
					},
					sendApplicationThankYou: function(args, success, error) {}
				}
			}(), context.eventOffer = function() {
				var url = "/Templates/General/Handlers/HseService.ashx";
				return {
					claim: function(args, success, error) {
						var params = $.extend({
							OfferId: 0,
							CampaignId: 0,
							StoreId: 0,
							StoreGroupId: 0
						}, args);
						ICA.ajax.post(url, {
							Commandname: "ClaimOffer",
							"ClaimOffer.OfferId": params.OfferId,
							"ClaimOffer.CampaignId": params.CampaignId,
							"ClaimOffer.StoreId": params.StoreId,
							"ClaimOffer.StoreGroupId": params.StoreGroupId
						}, success, error)
					}
				}
			}(), context.user = function() {
				var url = "/Templates/General/Handlers/Authentication.ashx";
				return {
					logout: function(success, error) {
						ICA.ajax.post(url, {
							CommandName: "LogoutCustomer"
						}, success, error)
					}
				}
			}(), context.traceCoffe = function(coffeType, success, error) {
				var url = "/Templates/General/Handlers/TraceCoffeHandler.ashx";
				return ICA.ajax.get(url, {
					CoffeType: coffeType
				}, success, error, "json")
			}, context.ssoSendToOnline = function(stateType, urlFromPage, success, error) {
				var url = urlFromPage;
				return ICA.ajax.post(url, {
					state: stateType
				}, success, error, "json")
			}, context.recipeCategories = function(searchterm, success, error) {
				var url = "/Templates/General/Handlers/RecipeShowCategories.ashx";
				return ICA.ajax.get(url, {
					recipecategory: searchterm
				}, success, error, "json")
			}, context.recipeCategoriesMdsa = function(searchterm, success, error) {
				var url = "/Templates/General/Handlers/RecipeShowCategories.ashx";
				return ICA.ajax.get(url, {
					recipecategorymdsa: searchterm
				}, success, error, "json")
			}, context.recipepageViews = function(recipeId, success, error) {
				var url = "/Templates/Recipes/Handlers/RecipeHandler.ashx";
				return ICA.ajax.post(url, {
					CommandName: "UpdatePageViews",
					RecipeId: recipeId
				}, success, error, "json")
			}, context.groceryBagProducts = function(storeId, filterSize, deliveryMethod, discountCode, isStorePage, purchaseMethod, onebag, success, error) {
				var url = "/templates/ajaxresponse.aspx?ajaxFunction=GroceryBagProductsView&sid=" + storeId + "&filterSize=" + filterSize + "&dm=" + deliveryMethod + "&dc=" + encodeURIComponent(discountCode) + "&isp=" + isStorePage + "&pm=" + purchaseMethod + "&onebag=" + onebag;
				return ICA.ajax.get(url, {}, success, error, "html")
			}, context.groceryBag = function() {
				return {
					cheapweekrecipes: function(week, success, error) {
						var url = "/Templates/ajaxresponse.aspx?ajaxFunction=GroceryBagRecipeList&date=" + week + "&bagtype=BilligaVeckan&days=5&published=True&bagBreakWeek=False";
						return ICA.ajax.get(url, {}, success, error, "html")
					},
					inspirationrecipes: function(week, days, success, error) {
						var url = "/Templates/ajaxresponse.aspx?ajaxFunction=GroceryBagRecipeList&date=" + date + "&bagtype=Inspiration&days=" + days + "&published=True&bagBreakWeek=false";
						return ICA.ajax.get(url, {}, success, error, "html")
					},
					getRecipes: function(week, days, bagtype, success, error) {
						var url = "/Templates/ajaxresponse.aspx?ajaxFunction=GroceryBagRecipeList&date=" + week + "&bagtype=" + bagtype + "&days=" + days + "&published=True&callerPageId=" + context.currentpageId;
						return ICA.ajax.get(url, {}, success, error, "html")
					},
					getArchiveRecipes: function(week, days, bagtype, success, error) {
						var url = "/Templates/ajaxresponse.aspx?ajaxFunction=GroceryBagRecipeList&date=" + week + "&bagtype=" + bagtype + "&days=" + days + "&published=True&archive=true&callerPageId=" + context.currentpageId;
						return ICA.ajax.get(url, {}, success, error, "html")
					}
				}
			}(), context.newsletter = function() {
				return {
					signup: function(params, success, error) {
						success("Grattis du är nu tillagd till nyhetsbrev.")
					}
				}
			}(), context.storeCart = function() {
				var url = "/Templates/Stores/Handlers/CateringCartHandler.ashx";
				return {
					sendorder: function(args, success, error) {
						var params = $.extend({
							CommandName: "SendCateringOrderEmail",
							"SendCateringOrderEmail.FirstName": "",
							"SendCateringOrderEmail.LastName": "",
							"SendCateringOrderEmail.Address": "",
							"SendCateringOrderEmail.ZipCode": "",
							"SendCateringOrderEmail.City": "",
							"SendCateringOrderEmail.Email": "",
							"SendCateringOrderEmail.Phone": "",
							"SendCateringOrderEmail.DeliveryDate": "",
							"SendCateringOrderEmail.DeliveryTime": "",
							"SendCateringOrderEmail.Message": "",
							"SendCateringOrderEmail.PageId": context.currentpageId,
							"SendCateringOrderEmail.StoreId": ""
						}, args);
						ICA.ajax.post(url, params, success, error)
					},
					add: function(args, success, error) {
						var params = $.extend({
							CommandName: "AddToCart",
							"AddToCart.Amount": "",
							"AddToCart.MinimumAmount": "",
							"AddToCart.ProductId": "",
							"AddToCart.Price": "",
							"AddToCart.Name": "",
							"AddToCart.ExtraInfo": "",
							"AddToCart.StoreId": "",
							"AddToCart.Unit": ""
						}, args);
						ICA.ajax.post(url, params, success, error)
					},
					remove: function(args, success, error) {
						var params = $.extend({
							CommandName: "DeleteFromCart",
							"DeleteFromCart.Id": "",
							"DeleteFromCart.Price": "",
							"DeleteFromCart.StoreId": "",
							"DeleteFromCart.Unit": "",
							"DeleteFromCart.ExtraInfo": ""
						}, args);
						ICA.ajax.post(url, params, success, error)
					},
					update: function(args, success, error) {
						var url = "/Templates/ajaxresponse.aspx",
							params = $.extend({
								ajaxFunction: "CateringCart",
								callerPageId: context.currentpageId,
								cartOpen: "",
								formOpen: "",
								pageid: context.currentpageId
							}, args);
						return ICA.ajax.get(url, params, success, error, "html")
					},
					addDiscountCode: function(args, success, error) {
						var params = $.extend({
							CommandName: "AddDiscountCode",
							"AddDiscountCode.PageId": "",
							"AddDiscountCode.StoreId": "",
							"AddDiscountCode.Code": ""
						}, args);
						ICA.ajax.post(url, params, success, error)
					},
					removeDiscountCode: function(args, success, error) {
						var params = $.extend({
							CommandName: "DeleteDiscountCode",
							"DeleteDiscountCode.StoreId": ""
						}, args);
						ICA.ajax.post(url, params, success, error)
					}
				}
			}(), context.storeGroceryBag = function() {
				var url = "/Templates/Stores/Handlers/StoreGroceryBagHandler.ashx";
				return {
					testhomedeliveryzipcode: function(args, success, error) {
						var params = $.extend({
							CommandName: "TestHomeDeliveryZipCode",
							StoreId: "",
							ZipCode: ""
						}, args);
						ICA.ajax.post(url, params, success, error)
					}
				}
			}(), context.customValidation = function() {
				var url = "/Login/Handlers/LoginValidation.ashx";
				return {
					civicregistrationnumber: function(args, success, error) {
						var params = $.extend({
							CommandName: "ValidateCivicRegistrationNumber",
							"ValidateCivicRegistrationNumber.Value": ""
						}, args);
						ICA.ajax.post(url, params, success, error, "json", !1)
					},
					sixdigitpassword: function(args, success, error) {
						var params = $.extend({
							CommandName: "ValidateSixDigitPassword",
							"ValidateSixDigitPassword.Value": ""
						}, args);
						ICA.ajax.post(url, params, success, error, "json", !1)
					}
				}
			}(), context.publicoffers = function() {
				return {
					getOffers: function(articlegroupid, offertype, success, error) {
						var url = "/Templates/ajaxresponse.aspx?ajaxFunction=PublicOfferListingView&articlegroupid=" + articlegroupid + "&offertype=" + offertype + "&callerPageId=" + context.currentpageId;
						return ICA.ajax.get(url, {}, success, error, "html")
					},
					resetOffers: function(success, error) {
						var url = "/Templates/ajaxresponse.aspx?ajaxFunction=PublicOfferListingView&callerPageId=" + context.currentpageId + "&resetoffers=true";
						return ICA.ajax.get(url, {}, success, error, "html")
					}
				}
			}(), context.mypages = function() {
				return {
					OrderForm: function(form, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPages.ashx",
							params = {
								commandName: "OrderForms",
								Form: form
							};
						ICA.ajax.post(url, params, success, error)
					},
					BlockCardSend: function(blockreason, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPages.ashx",
							params = {
								commandName: "BlockCardSend",
								blockCardReason: blockreason
							};
						ICA.ajax.post(url, params, success, error)
					},
					BlockLoyaltyCardSend: function(blockreason, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPages.ashx",
							params = {
								commandName: "BlockLoyaltyCardSend",
								blockCardReason: blockreason
							};
						ICA.ajax.post(url, params, success, error)
					},
					BlockCardOnlySend: function(blockreason, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPages.ashx",
							params = {
								commandName: "BlockCardOnlySend",
								blockCardReason: blockreason
							};
						ICA.ajax.post(url, params, success, error)
					},
					OrderCardSend: function(success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPages.ashx",
							params = {
								commandName: "OrderCardSend"
							};
						ICA.ajax.post(url, params, success, error)
					},
					OrderCodeSend: function(success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPages.ashx",
							params = {
								commandName: "OrderCodeSend"
							};
						ICA.ajax.post(url, params, success, error)
					},
					OfferSettingsSave: function(args, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPages.ashx",
							params = $.extend({}, args);
						ICA.ajax.post(url, $.extend(params, {
							Commandname: "UpdateOfferSettings"
						}), success, error)
					},
					OfferSettingsSaveRWD: function(args, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPages.ashx",
							params = $.extend({}, args);
						ICA.ajax.post(url, $.extend(params, {
							Commandname: "UpdateOfferSettingsRWD"
						}), success, error)
					},
					updatePersonalData: function(homeNumber, cellPhone, email, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPages.ashx",
							params = {
								commandName: "UpdatePersonalData",
								HomeNumber: homeNumber,
								CellPhone: cellPhone,
								Email: email
							};
						ICA.ajax.post(url, params, success, error)
					},
					UpdateStudentData: function(studyFocusArea, studyEndDate, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPages.ashx",
							params = {
								commandName: "UpdateStudentData",
								StudyFocusArea: studyFocusArea,
								StudyEndDate: studyEndDate
							};
						ICA.ajax.post(url, params, success, error)
					},
					UpdateStudentSubscription: function(subscribe, subscriptionKey, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPages.ashx",
							params = {
								commandName: "UpdateStudentSubscription",
								subscribe: subscribe,
								subscriptionKey: subscriptionKey
							};
						ICA.ajax.post(url, params, success, error)
					},
					grocerybagPost: function(url, args, success, error) {
						var params = $.extend({
							callerPageIsActivated: context.currentPageRwdStatus
						}, args);
						ICA.ajax.xhr = $.ajax({
							url: url,
							type: "POST",
							cache: !1,
							contentType: "application/json; charset=utf-8",
							dataType: "json",
							data: JSON.stringify(params),
							success: success,
							error: error
						})
					},
					changeDeliveryStatus: function(args, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPagesGroceryBagService.asmx/ChangeDeliveryStatusForWeek";
						return context.mypages.grocerybagPost(url, args, success, error)
					},
					changeProductForFutureDelivery: function(args, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPagesGroceryBagService.asmx/ChangeProductForFutureDelivery";
						return context.mypages.grocerybagPost(url, args, success, error)
					},
					activateAvailableSelectionOffer: function(args, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPagesGroceryBagService.asmx/ActivateSelectionOffer";
						return context.mypages.grocerybagPost(url, args, success, error)
					},
					updategrocerybagDeliveryAddress: function(args, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPagesGroceryBagService.asmx/UpdateHomeDeliveryInformation";
						return context.mypages.grocerybagPost(url, args, success, error)
					},
					changeGroceryBagType: function(args, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPagesGroceryBagService.asmx/ChangeGroceryBag";
						return context.mypages.grocerybagPost(url, args, success, error)
					},
					changePreOrderBag: function(args, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPagesGroceryBagService.asmx/ChangePreOrderBag";
						return context.mypages.grocerybagPost(url, args, success, error)
					},
					removePreOrderBag: function(args, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPagesGroceryBagService.asmx/RemovePreOrderBag";
						return context.mypages.grocerybagPost(url, args, success, error)
					},
					setHomeDelivery: function(args, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPagesGroceryBagService.asmx/SetHomeDelivery";
						return context.mypages.grocerybagPost(url, args, success, error)
					},
					setPickup: function(args, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPagesGroceryBagService.asmx/SetPickup";
						return context.mypages.grocerybagPost(url, args, success, error)
					},
					changeAlternativePickupPerson: function(args, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPagesGroceryBagService.asmx/ChangeAlternativePickupPerson";
						return context.mypages.grocerybagPost(url, args, success, error)
					},
					changeDeliveryFrequency: function(args, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPagesGroceryBagService.asmx/ChangeDeliveryFrequency";
						return context.mypages.grocerybagPost(url, args, success, error)
					},
					cancelSubscription: function(args, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPagesGroceryBagService.asmx/CancelSubscription";
						return context.mypages.grocerybagPost(url, args, success, error)
					},
					freezeSubscription: function(args, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPagesGroceryBagService.asmx/FreezeSubscription";
						return context.mypages.grocerybagPost(url, args, success, error)
					},
					unFreezeSubscription: function(args, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPagesGroceryBagService.asmx/UnfreezeSubscription";
						return context.mypages.grocerybagPost(url, args, success, error)
					},
					updateContactInformation: function(args, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPagesGroceryBagService.asmx/UpdateContactInformation";
						return context.mypages.grocerybagPost(url, args, success, error)
					},
					getgrocerybagdeliveries: function(success, error) {
						var url = "/Templates/ajaxresponse.aspx?ajaxFunction=GroceryBagDeliveries";
						return ICA.ajax.get(url, {}, success, error, "html")
					},
					getgrocerybagdeliverieslist: function(success, error, isMobileView, to) {
						var url;
						return url = to ? "/Templates/ajaxresponse.aspx?ajaxFunction=GroceryBagDeliveriesList&to=" + to + "&isMobileView=" + isMobileView : "/Templates/ajaxresponse.aspx?ajaxFunction=GroceryBagDeliveriesList&isMobileView=" + isMobileView, ICA.ajax.get(url, {}, success, error, "html")
					},
					getgrocerybagsubscription: function(success, error) {
						var url = "/Templates/ajaxresponse.aspx?ajaxFunction=MySubscription";
						return ICA.ajax.get(url, {}, success, error, "html")
					},
					getgrocerybagsubscriptionclosed: function(success, error) {
						var url = "/Templates/ajaxresponse.aspx?ajaxFunction=MySubscriptionClosed";
						return ICA.ajax.get(url, {}, success, error, "html")
					},
					updategrocerybagsubcription: function(commandName, args, success, error) {
						var url = "/Templates/MyPagesTemplate/Handlers/MyPagesGroceryBagService.asmx/" + commandName;
						return context.mypages.grocerybagPost(url, args, success, error)
					}
				}
			}(), context.googleanalyticsmodule = function() {
				var url = "/Templates/Stores/Handlers/GoogleAnalyticsModuleHandler.ashx";
				return {
					fetch: function(args, success, error) {
						var params = $.extend({
							callerpageid: context.currentpageId,
							startdate: undefined,
							enddate: undefined
						}, args);
						ICA.ajax.post(url, {
							Commandname: "FetchStatistics",
							"FetchStatistics.CallerPageId": params.callerpageid,
							"FetchStatistics.StartDate": params.startdate,
							"FetchStatistics.EndDate": params.enddate
						}, success, error)
					}
				}
			}(), context.myfavorites = function() {
				var url = "/Templates/General/Handlers/myfavouriteofferhandler.ashx";
				return {
					nextOfferPage: function(args, callback, error) {
						var params = $.extend({
							commandname: "offersnext",
							type: "",
							page: 1,
							pageSize: 5,
							callerPageId: context.currentpageId
						}, args);
						ICA.ajax.get(url, params, callback, error, "json")
					},
					search: function(args, callback, error) {
						var params = $.extend({
							commandname: "offersearch",
							page: 1,
							query: "",
							callerPageId: context.currentpageId
						}, args);
						ICA.ajax.get(url, params, callback, error, "json")
					},
					addSelectedOffer: function(args, callback, error) {
						var params = $.extend({
							commandname: "addoffertomyfavourites",
							callerPageId: context.currentpageId,
							offerid: ""
						}, args);
						ICA.ajax.post(url, params, callback, error)
					},
					addCustomerEmail: function(email, callback, error) {
						var params = {
							commandname: "updatecustomeremail",
							callerPageId: context.currentpageId,
							email: email || ""
						};
						ICA.ajax.post(url, params, callback, error)
					}
				}
			}(), context.health = function() {
				var url = "/Templates/Health/Handlers/HealthListingHandler.ashx";
				return {
					gethealth: function(args, callback, error) {
						var params = $.extend({
							commandname: "gethealtharticles",
							offset: 0,
							count: 10,
							callerPageId: context.currentpageId
						}, args);
						ICA.ajax.get(url, params, callback, error, "json")
					}
				}
			}(), context.mdsa = function() {
				var url = "/Templates/ajaxresponse.aspx?ajaxFunction=RecipeListMdsa";
				return {
					fetchRecipeResult: function(args, callback, error, useCache) {
						var params = $.extend({}, args, {
							id: context.currentpageId,
							callerPageIsActivated: ICA.legacy.currentPageRwdStatus,
							_hour: (new Date).getHours()
						});
						context.xhr = $.ajax({
							url: url,
							type: "get",
							cache: !0,
							data: params,
							dataType: "html",
							success: callback,
							error: error,
							async: !0,
							traditional: !0
						})
					}
				}
			}(), context.init()
		}
		return new _legacy
	}()
}(jQuery, this, this.document, ICA), $(function() {
	ICA.legacy.init()
});
!
function(window, document, Math) {
	function IScroll(el, options) {
		this.wrapper = "string" == typeof el ? document.querySelector(el) : el, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller.style, this.options = {
			startX: 0,
			startY: 0,
			scrollY: !0,
			directionLockThreshold: 5,
			momentum: !0,
			bounce: !0,
			bounceTime: 600,
			bounceEasing: "",
			preventDefault: !0,
			preventDefaultException: {
				tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
			},
			HWCompositing: !0,
			useTransition: !0,
			useTransform: !0
		};
		for (var i in options) this.options[i] = options[i];
		this.translateZ = this.options.HWCompositing && utils.hasPerspective ? " translateZ(0)" : "", this.options.useTransition = utils.hasTransition && this.options.useTransition, this.options.useTransform = utils.hasTransform && this.options.useTransform, this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical" : this.options.eventPassthrough, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollY = "vertical" != this.options.eventPassthrough && this.options.scrollY, this.options.scrollX = "horizontal" != this.options.eventPassthrough && this.options.scrollX, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing, this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling, this.options.tap === !0 && (this.options.tap = "tap"), this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._events = {}, this._init(), this.refresh(), this.scrollTo(this.options.startX, this.options.startY), this.enable()
	}
	var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback) {
		window.setTimeout(callback, 1e3 / 60)
	}, utils = function() {
		function _prefixStyle(style) {
			return _vendor !== !1 && ("" === _vendor ? style : _vendor + style.charAt(0).toUpperCase() + style.substr(1))
		}
		var me = {},
			_elementStyle = document.createElement("div").style,
			_vendor = function() {
				for (var transform, vendors = ["t", "webkitT", "MozT", "msT", "OT"], i = 0, l = vendors.length; i < l; i++) if (transform = vendors[i] + "ransform", transform in _elementStyle) return vendors[i].substr(0, vendors[i].length - 1);
				return !1
			}();
		me.getTime = Date.now ||
		function() {
			return (new Date).getTime()
		}, me.extend = function(target, obj) {
			for (var i in obj) target[i] = obj[i]
		}, me.addEvent = function(el, type, fn, capture) {
			el.addEventListener(type, fn, !! capture)
		}, me.removeEvent = function(el, type, fn, capture) {
			el.removeEventListener(type, fn, !! capture)
		}, me.prefixPointerEvent = function(pointerEvent) {
			return window.MSPointerEvent ? "MSPointer" + pointerEvent.charAt(9).toUpperCase() + pointerEvent.substr(10) : pointerEvent
		}, me.momentum = function(current, start, time, lowerMargin, wrapperSize, deceleration) {
			var destination, duration, distance = current - start,
				speed = Math.abs(distance) / time;
			return deceleration = void 0 === deceleration ? 6e-4 : deceleration, destination = current + speed * speed / (2 * deceleration) * (distance < 0 ? -1 : 1), duration = speed / deceleration, destination < lowerMargin ? (destination = wrapperSize ? lowerMargin - wrapperSize / 2.5 * (speed / 8) : lowerMargin, distance = Math.abs(destination - current), duration = distance / speed) : destination > 0 && (destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0, distance = Math.abs(current) + destination, duration = distance / speed), {
				destination: Math.round(destination),
				duration: duration
			}
		};
		var _transform = _prefixStyle("transform");
		return me.extend(me, {
			hasTransform: _transform !== !1,
			hasPerspective: _prefixStyle("perspective") in _elementStyle,
			hasTouch: "ontouchstart" in window,
			hasPointer: window.PointerEvent || window.MSPointerEvent,
			hasTransition: _prefixStyle("transition") in _elementStyle
		}), me.isBadAndroid = /Android /.test(window.navigator.appVersion) && !/Chrome\/\d/.test(window.navigator.appVersion), me.extend(me.style = {}, {
			transform: _transform,
			transitionTimingFunction: _prefixStyle("transitionTimingFunction"),
			transitionDuration: _prefixStyle("transitionDuration"),
			transitionDelay: _prefixStyle("transitionDelay"),
			transformOrigin: _prefixStyle("transformOrigin")
		}), me.hasClass = function(e, c) {
			var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
			return re.test(e.className)
		}, me.addClass = function(e, c) {
			if (!me.hasClass(e, c)) {
				var newclass = e.className.split(" ");
				newclass.push(c), e.className = newclass.join(" ")
			}
		}, me.removeClass = function(e, c) {
			if (me.hasClass(e, c)) {
				var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
				e.className = e.className.replace(re, " ")
			}
		}, me.offset = function(el) {
			for (var left = -el.offsetLeft, top = -el.offsetTop; el = el.offsetParent;) left -= el.offsetLeft, top -= el.offsetTop;
			return {
				left: left,
				top: top
			}
		}, me.preventDefaultException = function(el, exceptions) {
			for (var i in exceptions) if (exceptions[i].test(el[i])) return !0;
			return !1
		}, me.extend(me.eventType = {}, {
			touchstart: 1,
			touchmove: 1,
			touchend: 1,
			mousedown: 2,
			mousemove: 2,
			mouseup: 2,
			pointerdown: 3,
			pointermove: 3,
			pointerup: 3,
			MSPointerDown: 3,
			MSPointerMove: 3,
			MSPointerUp: 3
		}), me.extend(me.ease = {}, {
			quadratic: {
				style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
				fn: function(k) {
					return k * (2 - k)
				}
			},
			circular: {
				style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
				fn: function(k) {
					return Math.sqrt(1 - --k * k)
				}
			},
			back: {
				style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
				fn: function(k) {
					var b = 4;
					return (k -= 1) * k * ((b + 1) * k + b) + 1
				}
			},
			bounce: {
				style: "",
				fn: function(k) {
					return (k /= 1) < 1 / 2.75 ? 7.5625 * k * k : k < 2 / 2.75 ? 7.5625 * (k -= 1.5 / 2.75) * k + .75 : k < 2.5 / 2.75 ? 7.5625 * (k -= 2.25 / 2.75) * k + .9375 : 7.5625 * (k -= 2.625 / 2.75) * k + .984375
				}
			},
			elastic: {
				style: "",
				fn: function(k) {
					var f = .22,
						e = .4;
					return 0 === k ? 0 : 1 == k ? 1 : e * Math.pow(2, -10 * k) * Math.sin((k - f / 4) * (2 * Math.PI) / f) + 1
				}
			}
		}), me.tap = function(e, eventName) {
			var ev = document.createEvent("Event");
			ev.initEvent(eventName, !0, !0), ev.pageX = e.pageX, ev.pageY = e.pageY, e.target.dispatchEvent(ev)
		}, me.click = function(e) {
			var ev, target = e.target;
			/(SELECT|INPUT|TEXTAREA)/i.test(target.tagName) || (ev = document.createEvent("MouseEvents"), ev.initMouseEvent("click", !0, !0, e.view, 1, target.screenX, target.screenY, target.clientX, target.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null), ev._constructed = !0, target.dispatchEvent(ev))
		}, me
	}();
	IScroll.prototype = {
		version: "5.1.3",
		_init: function() {
			this._initEvents()
		},
		destroy: function() {
			this._initEvents(!0), this._execEvent("destroy")
		},
		_transitionEnd: function(e) {
			e.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
		},
		_start: function(e) {
			if ((1 == utils.eventType[e.type] || 0 === e.button) && this.enabled && (!this.initiated || utils.eventType[e.type] === this.initiated)) {
				!this.options.preventDefault || utils.isBadAndroid || utils.preventDefaultException(e.target, this.options.preventDefaultException) || e.preventDefault();
				var pos, point = e.touches ? e.touches[0] : e;
				this.initiated = utils.eventType[e.type], this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.directionLocked = 0, this._transitionTime(), this.startTime = utils.getTime(), this.options.useTransition && this.isInTransition ? (this.isInTransition = !1, pos = this.getComputedPosition(), this._translate(Math.round(pos.x), Math.round(pos.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")), this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = point.pageX, this.pointY = point.pageY, this._execEvent("beforeScrollStart")
			}
		},
		_move: function(e) {
			if (this.enabled && utils.eventType[e.type] === this.initiated) {
				this.options.preventDefault && e.preventDefault();
				var newX, newY, absDistX, absDistY, point = e.touches ? e.touches[0] : e,
					deltaX = point.pageX - this.pointX,
					deltaY = point.pageY - this.pointY,
					timestamp = utils.getTime();
				if (this.pointX = point.pageX, this.pointY = point.pageY, this.distX += deltaX, this.distY += deltaY, absDistX = Math.abs(this.distX), absDistY = Math.abs(this.distY), !(timestamp - this.endTime > 300 && absDistX < 10 && absDistY < 10)) {
					if (this.directionLocked || this.options.freeScroll || (absDistX > absDistY + this.options.directionLockThreshold ? this.directionLocked = "h" : absDistY >= absDistX + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"), "h" == this.directionLocked) {
						if ("vertical" == this.options.eventPassthrough) e.preventDefault();
						else if ("horizontal" == this.options.eventPassthrough) return void(this.initiated = !1);
						deltaY = 0
					} else if ("v" == this.directionLocked) {
						if ("horizontal" == this.options.eventPassthrough) e.preventDefault();
						else if ("vertical" == this.options.eventPassthrough) return void(this.initiated = !1);
						deltaX = 0
					}
					deltaX = this.hasHorizontalScroll ? deltaX : 0, deltaY = this.hasVerticalScroll ? deltaY : 0, newX = this.x + deltaX, newY = this.y + deltaY, (newX > 0 || newX < this.maxScrollX) && (newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX), (newY > 0 || newY < this.maxScrollY) && (newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY), this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0, this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0, this.moved || this._execEvent("scrollStart"), this.moved = !0, this._translate(newX, newY), timestamp - this.startTime > 300 && (this.startTime = timestamp, this.startX = this.x, this.startY = this.y)
				}
			}
		},
		_end: function(e) {
			if (this.enabled && utils.eventType[e.type] === this.initiated) {
				this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException) && e.preventDefault();
				var momentumX, momentumY, duration = (e.changedTouches ? e.changedTouches[0] : e, utils.getTime() - this.startTime),
					newX = Math.round(this.x),
					newY = Math.round(this.y),
					distanceX = Math.abs(newX - this.startX),
					distanceY = Math.abs(newY - this.startY),
					time = 0,
					easing = "";
				if (this.isInTransition = 0, this.initiated = 0, this.endTime = utils.getTime(), !this.resetPosition(this.options.bounceTime)) return this.scrollTo(newX, newY), this.moved ? this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100 ? void this._execEvent("flick") : (this.options.momentum && duration < 300 && (momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
					destination: newX,
					duration: 0
				}, momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
					destination: newY,
					duration: 0
				}, newX = momentumX.destination, newY = momentumY.destination, time = Math.max(momentumX.duration, momentumY.duration), this.isInTransition = 1), newX != this.x || newY != this.y ? ((newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) && (easing = utils.ease.quadratic), void this.scrollTo(newX, newY, time, easing)) : void this._execEvent("scrollEnd")) : (this.options.tap && utils.tap(e, this.options.tap), this.options.click && utils.click(e), void this._execEvent("scrollCancel"))
			}
		},
		_resize: function() {
			var that = this;
			clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
				that.refresh()
			}, this.options.resizePolling)
		},
		resetPosition: function(time) {
			var x = this.x,
				y = this.y;
			return time = time || 0, !this.hasHorizontalScroll || this.x > 0 ? x = 0 : this.x < this.maxScrollX && (x = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? y = 0 : this.y < this.maxScrollY && (y = this.maxScrollY), (x != this.x || y != this.y) && (this.scrollTo(x, y, time, this.options.bounceEasing), !0)
		},
		disable: function() {
			this.enabled = !1
		},
		enable: function() {
			this.enabled = !0
		},
		refresh: function() {
			this.wrapper.offsetHeight;
			this.wrapperWidth = this.wrapper.clientWidth, this.wrapperHeight = this.wrapper.clientHeight, this.scrollerWidth = this.scroller.offsetWidth, this.scrollerHeight = this.scroller.offsetHeight, this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight, this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = utils.offset(this.wrapper), this._execEvent("refresh"), this.resetPosition()
		},
		on: function(type, fn) {
			this._events[type] || (this._events[type] = []), this._events[type].push(fn)
		},
		off: function(type, fn) {
			if (this._events[type]) {
				var index = this._events[type].indexOf(fn);
				index > -1 && this._events[type].splice(index, 1)
			}
		},
		_execEvent: function(type) {
			if (this._events[type]) {
				var i = 0,
					l = this._events[type].length;
				if (l) for (; i < l; i++) this._events[type][i].apply(this, [].slice.call(arguments, 1))
			}
		},
		scrollBy: function(x, y, time, easing) {
			x = this.x + x, y = this.y + y, time = time || 0, this.scrollTo(x, y, time, easing)
		},
		scrollTo: function(x, y, time, easing) {
			easing = easing || utils.ease.circular, this.isInTransition = this.options.useTransition && time > 0, !time || this.options.useTransition && easing.style ? (this._transitionTimingFunction(easing.style), this._transitionTime(time), this._translate(x, y)) : this._animate(x, y, time, easing.fn)
		},
		scrollToElement: function(el, time, offsetX, offsetY, easing) {
			if (el = el.nodeType ? el : this.scroller.querySelector(el)) {
				var pos = utils.offset(el);
				pos.left -= this.wrapperOffset.left, pos.top -= this.wrapperOffset.top, offsetX === !0 && (offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), offsetY === !0 && (offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), pos.left -= offsetX || 0, pos.top -= offsetY || 0, pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left, pos.top = pos.top > 0 ? 0 : pos.top < this.maxScrollY ? this.maxScrollY : pos.top, time = void 0 === time || null === time || "auto" === time ? Math.max(Math.abs(this.x - pos.left), Math.abs(this.y - pos.top)) : time, this.scrollTo(pos.left, pos.top, time, easing)
			}
		},
		_transitionTime: function(time) {
			time = time || 0, this.scrollerStyle[utils.style.transitionDuration] = time + "ms", !time && utils.isBadAndroid && (this.scrollerStyle[utils.style.transitionDuration] = "0.001s")
		},
		_transitionTimingFunction: function(easing) {
			this.scrollerStyle[utils.style.transitionTimingFunction] = easing
		},
		_translate: function(x, y) {
			this.options.useTransform ? this.scrollerStyle[utils.style.transform] = "translate(" + x + "px," + y + "px)" + this.translateZ : (x = Math.round(x), y = Math.round(y), this.scrollerStyle.left = x + "px", this.scrollerStyle.top = y + "px"), this.x = x, this.y = y
		},
		_initEvents: function(remove) {
			var eventType = remove ? utils.removeEvent : utils.addEvent,
				target = this.options.bindToWrapper ? this.wrapper : window;
			eventType(window, "orientationchange", this), eventType(window, "resize", this), this.options.click && eventType(this.wrapper, "click", this, !0), this.options.disableMouse || (eventType(this.wrapper, "mousedown", this), eventType(target, "mousemove", this), eventType(target, "mousecancel", this), eventType(target, "mouseup", this)), utils.hasPointer && !this.options.disablePointer && (eventType(this.wrapper, utils.prefixPointerEvent("pointerdown"), this), eventType(target, utils.prefixPointerEvent("pointermove"), this), eventType(target, utils.prefixPointerEvent("pointercancel"), this), eventType(target, utils.prefixPointerEvent("pointerup"), this)), utils.hasTouch && !this.options.disableTouch && (eventType(this.wrapper, "touchstart", this), eventType(target, "touchmove", this), eventType(target, "touchcancel", this), eventType(target, "touchend", this)), eventType(this.scroller, "transitionend", this), eventType(this.scroller, "webkitTransitionEnd", this), eventType(this.scroller, "oTransitionEnd", this), eventType(this.scroller, "MSTransitionEnd", this)
		},
		getComputedPosition: function() {
			var x, y, matrix = window.getComputedStyle(this.scroller, null);
			return this.options.useTransform ? (matrix = matrix[utils.style.transform].split(")")[0].split(", "), x = +(matrix[12] || matrix[4]), y = +(matrix[13] || matrix[5])) : (x = +matrix.left.replace(/[^-\d.]/g, ""), y = +matrix.top.replace(/[^-\d.]/g, "")), {
				x: x,
				y: y
			}
		},
		_animate: function(destX, destY, duration, easingFn) {
			function step() {
				var newX, newY, easing, now = utils.getTime();
				return now >= destTime ? (that.isAnimating = !1, that._translate(destX, destY), void(that.resetPosition(that.options.bounceTime) || that._execEvent("scrollEnd"))) : (now = (now - startTime) / duration, easing = easingFn(now), newX = (destX - startX) * easing + startX, newY = (destY - startY) * easing + startY, that._translate(newX, newY), void(that.isAnimating && rAF(step)))
			}
			var that = this,
				startX = this.x,
				startY = this.y,
				startTime = utils.getTime(),
				destTime = startTime + duration;
			this.isAnimating = !0, step()
		},
		handleEvent: function(e) {
			switch (e.type) {
			case "touchstart":
			case "pointerdown":
			case "MSPointerDown":
			case "mousedown":
				this._start(e);
				break;
			case "touchmove":
			case "pointermove":
			case "MSPointerMove":
			case "mousemove":
				this._move(e);
				break;
			case "touchend":
			case "pointerup":
			case "MSPointerUp":
			case "mouseup":
			case "touchcancel":
			case "pointercancel":
			case "MSPointerCancel":
			case "mousecancel":
				this._end(e);
				break;
			case "orientationchange":
			case "resize":
				this._resize();
				break;
			case "transitionend":
			case "webkitTransitionEnd":
			case "oTransitionEnd":
			case "MSTransitionEnd":
				this._transitionEnd(e);
				break;
			case "wheel":
			case "DOMMouseScroll":
			case "mousewheel":
				this._wheel(e);
				break;
			case "keydown":
				this._key(e);
				break;
			case "click":
				e._constructed || (e.preventDefault(), e.stopPropagation())
			}
		}
	}, IScroll.utils = utils, "undefined" != typeof module && module.exports ? module.exports = IScroll : window.IScroll = IScroll
}(window, document, Math);
!
function(w, undefined) {
	var doc = w.document,
		docElem = doc.documentElement,
		enabledClassName = "overthrow-enabled",
		canBeFilledWithPoly = "ontouchmove" in doc,
		nativeOverflow = "WebkitOverflowScrolling" in docElem.style || "msOverflowStyle" in docElem.style || !canBeFilledWithPoly && w.screen.width > 800 ||
	function() {
		var ua = w.navigator.userAgent,
			webkit = ua.match(/AppleWebKit\/([0-9]+)/),
			wkversion = webkit && webkit[1],
			wkLte534 = webkit && wkversion >= 534;
		return ua.match(/Android ([0-9]+)/) && RegExp.$1 >= 3 && wkLte534 || ua.match(/ Version\/([0-9]+)/) && RegExp.$1 >= 0 && w.blackberry && wkLte534 || ua.indexOf("PlayBook") > -1 && wkLte534 && !ua.indexOf("Android 2") === -1 || ua.match(/Firefox\/([0-9]+)/) && RegExp.$1 >= 4 || ua.match(/wOSBrowser\/([0-9]+)/) && RegExp.$1 >= 233 && wkLte534 || ua.match(/NokiaBrowser\/([0-9\.]+)/) && 7.3 === parseFloat(RegExp.$1) && webkit && wkversion >= 533
	}();
	w.overthrow = {}, w.overthrow.enabledClassName = enabledClassName, w.overthrow.addClass = function() {
		docElem.className.indexOf(w.overthrow.enabledClassName) === -1 && (docElem.className += " " + w.overthrow.enabledClassName)
	}, w.overthrow.removeClass = function() {
		docElem.className = docElem.className.replace(w.overthrow.enabledClassName, "")
	}, w.overthrow.set = function() {
		nativeOverflow && w.overthrow.addClass()
	}, w.overthrow.canBeFilledWithPoly = canBeFilledWithPoly, w.overthrow.forget = function() {
		w.overthrow.removeClass()
	}, w.overthrow.support = nativeOverflow ? "native" : "none"
}(this), function(w, undefined) {
	w.overthrow.set()
}(this), function(w, o, undefined) {
	if (o !== undefined) {
		o.scrollIndicatorClassName = "overthrow";
		var doc = w.document,
			docElem = doc.documentElement,
			nativeOverflow = "native" === o.support,
			canBeFilledWithPoly = o.canBeFilledWithPoly,
			set = (o.configure, o.set),
			forget = o.forget,
			scrollIndicatorClassName = o.scrollIndicatorClassName;
		o.closest = function(target, ascend) {
			return !ascend && target.className && target.className.indexOf(scrollIndicatorClassName) > -1 && target || o.closest(target.parentNode)
		};
		var enabled = !1;
		o.set = function() {
			if (set(), !enabled && !nativeOverflow && canBeFilledWithPoly) {
				w.overthrow.addClass(), enabled = !0, o.support = "polyfilled", o.forget = function() {
					forget(), enabled = !1, doc.removeEventListener && doc.removeEventListener("touchstart", start, !1)
				};
				var elem, lastDown, lastRight, inputs, lastTops = [],
					lastLefts = [],
					resetVertTracking = function() {
						lastTops = [], lastDown = null
					},
					resetHorTracking = function() {
						lastLefts = [], lastRight = null
					},
					setPointers = function(val) {
						inputs = elem.querySelectorAll("textarea, input");
						for (var i = 0, il = inputs.length; i < il; i++) inputs[i].style.pointerEvents = val
					},
					changeScrollTarget = function(startEvent, ascend) {
						if (doc.createEvent) {
							var tEnd, newTarget = (!ascend || ascend === undefined) && elem.parentNode || elem.touchchild || elem;
							newTarget !== elem && (tEnd = doc.createEvent("HTMLEvents"), tEnd.initEvent("touchend", !0, !0), elem.dispatchEvent(tEnd), newTarget.touchchild = elem, elem = newTarget, newTarget.dispatchEvent(startEvent))
						}
					},
					start = function(e) {
						if (o.intercept && o.intercept(), resetVertTracking(), resetHorTracking(), elem = o.closest(e.target), elem && elem !== docElem && !(e.touches.length > 1)) {
							setPointers("none");
							var touchStartE = e,
								scrollT = elem.scrollTop,
								scrollL = elem.scrollLeft,
								height = elem.offsetHeight,
								width = elem.offsetWidth,
								startY = e.touches[0].pageY,
								startX = e.touches[0].pageX,
								scrollHeight = elem.scrollHeight,
								scrollWidth = elem.scrollWidth,
								move = function(e) {
									var ty = scrollT + startY - e.touches[0].pageY,
										tx = scrollL + startX - e.touches[0].pageX,
										down = ty >= (lastTops.length ? lastTops[0] : 0),
										right = tx >= (lastLefts.length ? lastLefts[0] : 0);
									ty > 0 && ty < scrollHeight - height || tx > 0 && tx < scrollWidth - width ? e.preventDefault() : changeScrollTarget(touchStartE), lastDown && down !== lastDown && resetVertTracking(), lastRight && right !== lastRight && resetHorTracking(), lastDown = down, lastRight = right, elem.scrollTop = ty, elem.scrollLeft = tx, lastTops.unshift(ty), lastLefts.unshift(tx), lastTops.length > 3 && lastTops.pop(), lastLefts.length > 3 && lastLefts.pop()
								},
								end = function(e) {
									setPointers("auto"), setTimeout(function() {
										setPointers("none")
									}, 450), elem.removeEventListener("touchmove", move, !1), elem.removeEventListener("touchend", end, !1)
								};
							elem.addEventListener("touchmove", move, !1), elem.addEventListener("touchend", end, !1)
						}
					};
				doc.addEventListener("touchstart", start, !1)
			}
		}
	}
}(this, this.overthrow), function(w, o, undefined) {
	if (o !== undefined) {
		o.easing = function(t, b, c, d) {
			return c * ((t = t / d - 1) * t * t + 1) + b
		}, o.tossing = !1;
		var timeKeeper;
		o.toss = function(elem, options) {
			o.intercept();
			var endLeft, endTop, i = 0,
				sLeft = elem.scrollLeft,
				sTop = elem.scrollTop,
				op = {
					top: "+0",
					left: "+0",
					duration: 50,
					easing: o.easing,
					finished: function() {}
				},
				finished = !1;
			if (options) for (var j in op) options[j] !== undefined && (op[j] = options[j]);
			return "string" == typeof op.left ? (op.left = parseFloat(op.left), endLeft = op.left + sLeft) : (endLeft = op.left, op.left = op.left - sLeft), "string" == typeof op.top ? (op.top = parseFloat(op.top), endTop = op.top + sTop) : (endTop = op.top, op.top = op.top - sTop), o.tossing = !0, timeKeeper = setInterval(function() {
				i++ < op.duration ? (elem.scrollLeft = op.easing(i, sLeft, op.left, op.duration), elem.scrollTop = op.easing(i, sTop, op.top, op.duration)) : (endLeft !== elem.scrollLeft ? elem.scrollLeft = endLeft : (finished && op.finished(), finished = !0), endTop !== elem.scrollTop ? elem.scrollTop = endTop : (finished && op.finished(), finished = !0), o.intercept())
			}, 1), {
				top: endTop,
				left: endLeft,
				duration: o.duration,
				easing: o.easing
			}
		}, o.intercept = function() {
			clearInterval(timeKeeper), o.tossing = !1
		}
	}
}(this, this.overthrow);
!
function(factory) {
	"function" == typeof define && define.amd ? define(["jquery"], factory) : "object" == typeof exports ? module.exports = factory(require("jquery")) : factory(jQuery)
}(function($) {
	var dispatch = $.event.dispatch || $.event.handle,
		special = $.event.special,
		uid1 = "D" + +new Date,
		uid2 = "D" + (+new Date + 1);
	special.scrollstart = {
		setup: function(data) {
			var timer, _data = $.extend({
				latency: special.scrollstop.latency
			}, data),
				handler = function(evt) {
					var _self = this,
						_args = arguments;
					timer ? clearTimeout(timer) : (evt.type = "scrollstart", dispatch.apply(_self, _args)), timer = setTimeout(function() {
						timer = null
					}, _data.latency)
				};
			$(this).bind("scroll", handler).data(uid1, handler)
		},
		teardown: function() {
			$(this).unbind("scroll", $(this).data(uid1))
		}
	}, special.scrollstop = {
		latency: 250,
		setup: function(data) {
			var timer, _data = $.extend({
				latency: special.scrollstop.latency
			}, data),
				handler = function(evt) {
					var _self = this,
						_args = arguments;
					timer && clearTimeout(timer), timer = setTimeout(function() {
						timer = null, evt.type = "scrollstop", dispatch.apply(_self, _args)
					}, _data.latency)
				};
			$(this).bind("scroll", handler).data(uid2, handler)
		},
		teardown: function() {
			$(this).unbind("scroll", $(this).data(uid2))
		}
	}
});
!
function(root, factory) {
	"object" == typeof exports ? module.exports = factory() : "function" == typeof define && define.amd ? define(factory) : root.Spinner = factory()
}(this, function() {
	"use strict";
	function createEl(tag, prop) {
		var n, el = document.createElement(tag || "div");
		for (n in prop) el[n] = prop[n];
		return el
	}
	function ins(parent) {
		for (var i = 1, n = arguments.length; i < n; i++) parent.appendChild(arguments[i]);
		return parent
	}
	function addAnimation(alpha, trail, i, lines) {
		var name = ["opacity", trail, ~~ (100 * alpha), i, lines].join("-"),
			start = .01 + i / lines * 100,
			z = Math.max(1 - (1 - alpha) / trail * (100 - start), alpha),
			prefix = useCssAnimations.substring(0, useCssAnimations.indexOf("Animation")).toLowerCase(),
			pre = prefix && "-" + prefix + "-" || "";
		return animations[name] || (sheet.insertRule("@" + pre + "keyframes " + name + "{0%{opacity:" + z + "}" + start + "%{opacity:" + alpha + "}" + (start + .01) + "%{opacity:1}" + (start + trail) % 100 + "%{opacity:" + alpha + "}100%{opacity:" + z + "}}", sheet.cssRules.length), animations[name] = 1), name
	}
	function vendor(el, prop) {
		var pp, i, s = el.style;
		for (prop = prop.charAt(0).toUpperCase() + prop.slice(1), i = 0; i < prefixes.length; i++) if (pp = prefixes[i] + prop, void 0 !== s[pp]) return pp;
		if (void 0 !== s[prop]) return prop
	}
	function css(el, prop) {
		for (var n in prop) el.style[vendor(el, n) || n] = prop[n];
		return el
	}
	function merge(obj) {
		for (var i = 1; i < arguments.length; i++) {
			var def = arguments[i];
			for (var n in def) void 0 === obj[n] && (obj[n] = def[n])
		}
		return obj
	}
	function getColor(color, idx) {
		return "string" == typeof color ? color : color[idx % color.length]
	}
	function Spinner(o) {
		this.opts = merge(o || {}, Spinner.defaults, defaults)
	}
	function initVML() {
		function vml(tag, attr) {
			return createEl("<" + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
		}
		sheet.addRule(".spin-vml", "behavior:url(#default#VML)"), Spinner.prototype.lines = function(el, o) {
			function grp() {
				return css(vml("group", {
					coordsize: s + " " + s,
					coordorigin: -r + " " + -r
				}), {
					width: s,
					height: s
				})
			}
			function seg(i, dx, filter) {
				ins(g, ins(css(grp(), {
					rotation: 360 / o.lines * i + "deg",
					left: ~~dx
				}), ins(css(vml("roundrect", {
					arcsize: o.corners
				}), {
					width: r,
					height: o.width,
					left: o.radius,
					top: -o.width >> 1,
					filter: filter
				}), vml("fill", {
					color: getColor(o.color, i),
					opacity: o.opacity
				}), vml("stroke", {
					opacity: 0
				}))))
			}
			var i, r = o.length + o.width,
				s = 2 * r,
				margin = 2 * -(o.width + o.length) + "px",
				g = css(grp(), {
					position: "absolute",
					top: margin,
					left: margin
				});
			if (o.shadow) for (i = 1; i <= o.lines; i++) seg(i, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
			for (i = 1; i <= o.lines; i++) seg(i);
			return ins(el, g)
		}, Spinner.prototype.opacity = function(el, i, val, o) {
			var c = el.firstChild;
			o = o.shadow && o.lines || 0, c && i + o < c.childNodes.length && (c = c.childNodes[i + o], c = c && c.firstChild, c = c && c.firstChild, c && (c.opacity = val))
		}
	}
	var useCssAnimations, prefixes = ["webkit", "Moz", "ms", "O"],
		animations = {},
		sheet = function() {
			var el = createEl("style", {
				type: "text/css"
			});
			return ins(document.getElementsByTagName("head")[0], el), el.sheet || el.styleSheet
		}(),
		defaults = {
			lines: 12,
			length: 7,
			width: 5,
			radius: 10,
			rotate: 0,
			corners: 1,
			color: "#000",
			direction: 1,
			speed: 1,
			trail: 100,
			opacity: .25,
			fps: 20,
			zIndex: 2e9,
			className: "spinner",
			top: "50%",
			left: "50%",
			position: "absolute"
		};
	Spinner.defaults = {}, merge(Spinner.prototype, {
		spin: function(target) {
			this.stop();
			var self = this,
				o = self.opts,
				el = self.el = css(createEl(0, {
					className: o.className
				}), {
					position: o.position,
					width: 0,
					zIndex: o.zIndex
				});
			o.radius + o.length + o.width;
			if (css(el, {
				left: o.left,
				top: o.top
			}), target && target.insertBefore(el, target.firstChild || null), el.setAttribute("role", "progressbar"), self.lines(el, self.opts), !useCssAnimations) {
				var alpha, i = 0,
					start = (o.lines - 1) * (1 - o.direction) / 2,
					fps = o.fps,
					f = fps / o.speed,
					ostep = (1 - o.opacity) / (f * o.trail / 100),
					astep = f / o.lines;
				!
				function anim() {
					i++;
					for (var j = 0; j < o.lines; j++) alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity), self.opacity(el, j * o.direction + start, alpha, o);
					self.timeout = self.el && setTimeout(anim, ~~ (1e3 / fps))
				}()
			}
			return self
		},
		stop: function() {
			var el = this.el;
			return el && (clearTimeout(this.timeout), el.parentNode && el.parentNode.removeChild(el), this.el = void 0), this
		},
		lines: function(el, o) {
			function fill(color, shadow) {
				return css(createEl(), {
					position: "absolute",
					width: o.length + o.width + "px",
					height: o.width + "px",
					background: color,
					boxShadow: shadow,
					transformOrigin: "left",
					transform: "rotate(" + ~~ (360 / o.lines * i + o.rotate) + "deg) translate(" + o.radius + "px,0)",
					borderRadius: (o.corners * o.width >> 1) + "px"
				})
			}
			for (var seg, i = 0, start = (o.lines - 1) * (1 - o.direction) / 2; i < o.lines; i++) seg = css(createEl(), {
				position: "absolute",
				top: 1 + ~ (o.width / 2) + "px",
				transform: o.hwaccel ? "translate3d(0,0,0)" : "",
				opacity: o.opacity,
				animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + " " + 1 / o.speed + "s linear infinite"
			}), o.shadow && ins(seg, css(fill("#000", "0 0 4px #000"), {
				top: "2px"
			})), ins(el, ins(seg, fill(getColor(o.color, i), "0 0 1px rgba(0,0,0,.1)")));
			return el
		},
		opacity: function(el, i, val) {
			i < el.childNodes.length && (el.childNodes[i].style.opacity = val)
		}
	});
	var probe = css(createEl("group"), {
		behavior: "url(#default#VML)"
	});
	return !vendor(probe, "transform") && probe.adj ? initVML() : useCssAnimations = vendor(probe, "animation"), Spinner
});
var lazySizesConfig;
!
function(window, factory) {
	var lazySizes = factory(window, window.document);
	window.lazySizes = lazySizes, "object" == typeof module && module.exports ? module.exports = lazySizes : "function" == typeof define && define.amd && define(lazySizes)
}(window, function(window, document) {
	"use strict";
	if (document.getElementsByClassName) {
		var docElem = document.documentElement,
			addEventListener = window.addEventListener,
			setTimeout = window.setTimeout,
			rAF = window.requestAnimationFrame || setTimeout,
			regPicture = /^picture$/i,
			loadEvents = ["load", "error", "lazyincluded", "_lazyloaded"],
			hasClass = function(ele, cls) {
				var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
				return ele.className.match(reg) && reg
			},
			addClass = function(ele, cls) {
				hasClass(ele, cls) || (ele.className += " " + cls)
			},
			removeClass = function(ele, cls) {
				var reg;
				(reg = hasClass(ele, cls)) && (ele.className = ele.className.replace(reg, " "))
			},
			addRemoveLoadEvents = function(dom, fn, add) {
				var action = add ? "addEventListener" : "removeEventListener";
				add && addRemoveLoadEvents(dom, fn), loadEvents.forEach(function(evt) {
					dom[action](evt, fn)
				})
			},
			triggerEvent = function(elem, name, detail, noBubbles, noCancelable) {
				var event = document.createEvent("CustomEvent");
				return event.initCustomEvent(name, !noBubbles, !noCancelable, detail || {}), event.details = event.detail, elem.dispatchEvent(event), event
			},
			updatePolyfill = function(el, full) {
				var polyfill;
				window.HTMLPictureElement || ((polyfill = window.picturefill || window.respimage || lazySizesConfig.pf) ? polyfill({
					reevaluate: !0,
					elements: [el]
				}) : full && full.src && (el.src = full.src))
			},
			getCSS = function(elem, style) {
				return getComputedStyle(elem, null)[style]
			},
			getWidth = function(elem, parent, width) {
				for (width = width || elem.offsetWidth; width < lazySizesConfig.minSize && parent && !elem._lazysizesWidth;) width = parent.offsetWidth, parent = parent.parentNode;
				return width
			},
			throttle = function(fn) {
				var running, lastTime = 0,
					Date = window.Date,
					run = function() {
						running = !1, lastTime = Date.now(), fn()
					},
					afterAF = function() {
						setTimeout(run)
					},
					getAF = function() {
						rAF(afterAF)
					};
				return function() {
					if (!running) {
						var delay = lazySizesConfig.throttle - (Date.now() - lastTime);
						running = !0, delay < 9 && (delay = 9), setTimeout(getAF, delay)
					}
				}
			},
			loader = function() {
				var lazyloadElems, preloadElems, isCompleted, resetPreloadingTimer, loadMode, eLvW, elvH, eLtop, eLleft, eLright, eLbottom, defaultExpand, preloadExpand, regImg = /^img$/i,
					regIframe = /^iframe$/i,
					supportScroll = "onscroll" in window && !/glebot/.test(navigator.userAgent),
					shrinkExpand = 0,
					currentExpand = 0,
					isLoading = 0,
					lowRuns = 1,
					resetPreloading = function(e) {
						isLoading--, e && e.target && addRemoveLoadEvents(e.target, resetPreloading), (!e || isLoading < 0 || !e.target) && (isLoading = 0)
					},
					isNestedVisible = function(elem, elemExpand) {
						var outerRect, parent = elem,
							visible = "hidden" != getCSS(elem, "visibility");
						for (eLtop -= elemExpand, eLbottom += elemExpand, eLleft -= elemExpand, eLright += elemExpand; visible && (parent = parent.offsetParent);) visible = (getCSS(parent, "opacity") || 1) > 0, visible && "visible" != getCSS(parent, "overflow") && (outerRect = parent.getBoundingClientRect(), visible = eLright > outerRect.left && eLleft < outerRect.right && eLbottom > outerRect.top - 1 && eLtop < outerRect.bottom + 1);
						return visible
					},
					checkElements = function() {
						var eLlen, i, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal, beforeExpandVal;
						if ((loadMode = lazySizesConfig.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)) {
							for (i = 0, lowRuns++, currentExpand < preloadExpand && isLoading < 1 && lowRuns > 3 && loadMode > 2 ? (currentExpand = preloadExpand, lowRuns = 0) : currentExpand = currentExpand != defaultExpand && loadMode > 1 && lowRuns > 2 && isLoading < 6 ? defaultExpand : shrinkExpand; i < eLlen; i++) lazyloadElems[i] && !lazyloadElems[i]._lazyRace && (supportScroll ? ((elemExpandVal = lazyloadElems[i].getAttribute("data-expand")) && (elemExpand = 1 * elemExpandVal) || (elemExpand = currentExpand), beforeExpandVal !== elemExpand && (eLvW = innerWidth + elemExpand, elvH = innerHeight + elemExpand, elemNegativeExpand = elemExpand * -1, beforeExpandVal = elemExpand), rect = lazyloadElems[i].getBoundingClientRect(), (eLbottom = rect.bottom) >= elemNegativeExpand && (eLtop = rect.top) <= elvH && (eLright = rect.right) >= elemNegativeExpand && (eLleft = rect.left) <= eLvW && (eLbottom || eLright || eLleft || eLtop) && (isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4) || isNestedVisible(lazyloadElems[i], elemExpand)) ? (unveilElement(lazyloadElems[i], rect.width), loadedSomething = !0) : !loadedSomething && isCompleted && !autoLoadElem && isLoading < 3 && lowRuns < 4 && loadMode > 2 && (preloadElems[0] || lazySizesConfig.preloadAfterLoad) && (preloadElems[0] || !elemExpandVal && (eLbottom || eLright || eLleft || eLtop || "auto" != lazyloadElems[i].getAttribute(lazySizesConfig.sizesAttr))) && (autoLoadElem = preloadElems[0] || lazyloadElems[i])) : unveilElement(lazyloadElems[i]));
							autoLoadElem && !loadedSomething && unveilElement(autoLoadElem)
						}
					},
					throttledCheckElements = throttle(checkElements),
					switchLoadingClass = function(e) {
						addClass(e.target, lazySizesConfig.loadedClass), removeClass(e.target, lazySizesConfig.loadingClass), addRemoveLoadEvents(e.target, switchLoadingClass)
					},
					changeIframeSrc = function(elem, src) {
						try {
							elem.contentWindow.location.replace(src)
						} catch (e) {
							elem.setAttribute("src", src)
						}
					},
					rafBatch = function() {
						var isRunning, batch = [],
							runBatch = function() {
								for (; batch.length;) batch.shift()();
								isRunning = !1
							};
						return function(fn) {
							batch.push(fn), isRunning || (isRunning = !0, rAF(runBatch))
						}
					}(),
					unveilElement = function(elem, width) {
						var sources, i, len, sourceSrcset, src, srcset, parent, isPicture, event, firesLoad, customMedia, isImg = regImg.test(elem.nodeName),
							sizes = elem.getAttribute(lazySizesConfig.sizesAttr) || elem.getAttribute("sizes"),
							isAuto = "auto" == sizes;
						(!isAuto && isCompleted || !isImg || !elem.src && !elem.srcset || elem.complete || hasClass(elem, lazySizesConfig.errorClass)) && (elem._lazyRace = !0, isLoading++, rafBatch(function() {
							if (elem._lazyRace && delete elem._lazyRace, removeClass(elem, lazySizesConfig.lazyClass), !(event = triggerEvent(elem, "lazybeforeunveil")).defaultPrevented) {
								if (sizes && (isAuto ? (autoSizer.updateElem(elem, !0, width), addClass(elem, lazySizesConfig.autosizesClass)) : elem.setAttribute("sizes", sizes)), srcset = elem.getAttribute(lazySizesConfig.srcsetAttr), src = elem.getAttribute(lazySizesConfig.srcAttr), isImg && (parent = elem.parentNode, isPicture = parent && regPicture.test(parent.nodeName || "")), firesLoad = event.detail.firesLoad || "src" in elem && (srcset || src || isPicture), event = {
									target: elem
								}, firesLoad && (addRemoveLoadEvents(elem, resetPreloading, !0), clearTimeout(resetPreloadingTimer), resetPreloadingTimer = setTimeout(resetPreloading, 2500), addClass(elem, lazySizesConfig.loadingClass), addRemoveLoadEvents(elem, switchLoadingClass, !0)), isPicture) for (sources = parent.getElementsByTagName("source"), i = 0, len = sources.length; i < len; i++)(customMedia = lazySizesConfig.customMedia[sources[i].getAttribute("data-media") || sources[i].getAttribute("media")]) && sources[i].setAttribute("media", customMedia), sourceSrcset = sources[i].getAttribute(lazySizesConfig.srcsetAttr), sourceSrcset && sources[i].setAttribute("srcset", sourceSrcset);
								srcset ? elem.setAttribute("srcset", srcset) : src && (regIframe.test(elem.nodeName) ? changeIframeSrc(elem, src) : elem.setAttribute("src", src)), (srcset || isPicture) && updatePolyfill(elem, {
									src: src
								})
							}
							firesLoad && !elem.complete || (firesLoad ? resetPreloading(event) : isLoading--, switchLoadingClass(event))
						}))
					},
					onload = function() {
						var scrollTimer, afterScroll = function() {
								lazySizesConfig.loadMode = 3, throttledCheckElements()
							};
						isCompleted = !0, lowRuns += 8, lazySizesConfig.loadMode = 3, addEventListener("scroll", function() {
							3 == lazySizesConfig.loadMode && (lazySizesConfig.loadMode = 2), clearTimeout(scrollTimer), scrollTimer = setTimeout(afterScroll, 99)
						}, !0)
					};
				return {
					_: function() {
						lazyloadElems = document.getElementsByClassName(lazySizesConfig.lazyClass), preloadElems = document.getElementsByClassName(lazySizesConfig.lazyClass + " " + lazySizesConfig.preloadClass), defaultExpand = lazySizesConfig.expand, preloadExpand = Math.round(defaultExpand * lazySizesConfig.expFactor), addEventListener("scroll", throttledCheckElements, !0), addEventListener("resize", throttledCheckElements, !0), window.MutationObserver ? new MutationObserver(throttledCheckElements).observe(docElem, {
							childList: !0,
							subtree: !0,
							attributes: !0
						}) : (docElem.addEventListener("DOMNodeInserted", throttledCheckElements, !0), docElem.addEventListener("DOMAttrModified", throttledCheckElements, !0), setInterval(throttledCheckElements, 999)), addEventListener("hashchange", throttledCheckElements, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend", "webkitAnimationEnd"].forEach(function(name) {
							document.addEventListener(name, throttledCheckElements, !0)
						}), (isCompleted = /d$|^c/.test(document.readyState)) ? onload() : (addEventListener("load", onload), document.addEventListener("DOMContentLoaded", throttledCheckElements)), throttledCheckElements()
					},
					checkElems: throttledCheckElements,
					unveil: unveilElement
				}
			}(),
			autoSizer = function() {
				var autosizesElems, sizeElement = function(elem, dataAttr, width) {
						var sources, i, len, event, parent = elem.parentNode;
						if (parent && (width = getWidth(elem, parent, width), event = triggerEvent(elem, "lazybeforesizes", {
							width: width,
							dataAttr: !! dataAttr
						}), !event.defaultPrevented && (width = event.detail.width, width && width !== elem._lazysizesWidth))) {
							if (elem._lazysizesWidth = width, width += "px", elem.setAttribute("sizes", width), regPicture.test(parent.nodeName || "")) for (sources = parent.getElementsByTagName("source"), i = 0, len = sources.length; i < len; i++) sources[i].setAttribute("sizes", width);
							event.detail.dataAttr || updatePolyfill(elem, event.detail)
						}
					},
					updateElementsSizes = function() {
						var i, len = autosizesElems.length;
						if (len) for (i = 0; i < len; i++) sizeElement(autosizesElems[i])
					},
					throttledUpdateElementsSizes = throttle(updateElementsSizes);
				return {
					_: function() {
						autosizesElems = document.getElementsByClassName(lazySizesConfig.autosizesClass), addEventListener("resize", throttledUpdateElementsSizes)
					},
					checkElems: throttledUpdateElementsSizes,
					updateElem: sizeElement
				}
			}(),
			init = function() {
				init.i || (init.i = !0, autoSizer._(), loader._())
			};
		return function() {
			var prop, lazySizesDefaults = {
				lazyClass: "lazyload",
				loadedClass: "lazyloaded",
				loadingClass: "lazyloading",
				preloadClass: "lazypreload",
				errorClass: "lazyerror",
				autosizesClass: "lazyautosizes",
				srcAttr: "data-src",
				srcsetAttr: "data-srcset",
				sizesAttr: "data-sizes",
				minSize: 40,
				customMedia: {},
				init: !0,
				expFactor: 2,
				expand: 359,
				loadMode: 2,
				throttle: 125
			};
			lazySizesConfig = window.lazySizesConfig || window.lazysizesConfig || {};
			for (prop in lazySizesDefaults) prop in lazySizesConfig || (lazySizesConfig[prop] = lazySizesDefaults[prop]);
			window.lazySizesConfig = lazySizesConfig, setTimeout(function() {
				lazySizesConfig.init && init()
			})
		}(), {
			cfg: lazySizesConfig,
			autoSizer: autoSizer,
			loader: loader,
			init: init,
			uP: updatePolyfill,
			aC: addClass,
			rC: removeClass,
			hC: hasClass,
			fire: triggerEvent,
			gW: getWidth
		}
	}
});
!
function(window, document) {
	"use strict";
	function addStyleScript(src, style) {
		if (!uniqueUrls[src]) {
			var elem = document.createElement(style ? "link" : "script"),
				insertElem = document.getElementsByTagName("script")[0];
			style ? (elem.rel = "stylesheet", elem.href = src) : elem.src = src, uniqueUrls[src] = !0, uniqueUrls[elem.src || elem.href] = !0, insertElem.parentNode.insertBefore(elem, insertElem)
		}
	}
	var bgLoad, uniqueUrls = {};
	document.addEventListener && window.getComputedStyle && (bgLoad = function(url, cb) {
		var img = document.createElement("img");
		img.onload = function() {
			img.onload = null, img.onerror = null, img = null, cb()
		}, img.onerror = img.onload, img.src = url, img && img.complete && img.onload && img.onload()
	}, addEventListener("lazybeforeunveil", function(e) {
		var tmp, load, bg, poster;
		e.defaultPrevented || ("none" == e.target.preload && (e.target.preload = "auto"), tmp = e.target.getAttribute("data-link"), tmp && addStyleScript(tmp, !0), tmp = e.target.getAttribute("data-script"), tmp && addStyleScript(tmp), tmp = e.target.getAttribute("data-require"), tmp && window.require && require([tmp]), bg = e.target.getAttribute("data-bg"), bg && (e.details.firesLoad = !0, load = function() {
			e.target.style.backgroundImage = "url(" + bg + ")", e.details.firesLoad = !1, lazySizes.fire(e.target, "_lazyloaded", {}, !0, !0)
		}, bgLoad(bg, load)), poster = e.target.getAttribute("data-poster"), poster && (e.details.firesLoad = !0, load = function() {
			e.target.poster = poster, e.details.firesLoad = !1, lazySizes.fire(e.target, "_lazyloaded", {}, !0, !0)
		}, bgLoad(poster, load)))
	}, !1))
}(window, document);
!
function() {
	"use strict";
	if (window.addEventListener) {
		var dummyParent = {
			nodeName: ""
		},
			supportPicture = !! window.HTMLPictureElement,
			handleLoadingElements = function(e) {
				var i, isResponsive, hasTriggered, onload, loading, loadElements = e.target.querySelectorAll("img, iframe");
				for (i = 0; i < loadElements.length; i++) isResponsive = loadElements[i].getAttribute("srcset") || "picture" == (loadElements[i].parentNode || dummyParent).nodeName.toLowerCase(), !supportPicture && isResponsive && lazySizes.uP(loadElements[i]), loadElements[i].complete || !isResponsive && !loadElements[i].src || (e.detail.firesLoad = !0, onload && loading || (loading = 0, onload = function(evt) {
					loading--, evt && !(loading < 1) || hasTriggered || (hasTriggered = !0, e.detail.firesLoad = !1, lazySizes.fire(e.target, "_lazyloaded", {}, !1, !0)), evt && evt.target && (evt.target.removeEventListener("load", onload), evt.target.removeEventListener("error", onload))
				}, setTimeout(onload, 3500)), loading++, loadElements[i].addEventListener("load", onload), loadElements[i].addEventListener("error", onload))
			};
		addEventListener("lazybeforeunveil", function(e) {
			if (!e.defaultPrevented && null != e.target.getAttribute("data-noscript")) {
				var noScript = e.target.querySelector('noscript, script[type*="html"]') || {},
					content = noScript.textContent || noScript.innerText;
				content && (e.target.innerHTML = content, handleLoadingElements(e))
			}
		})
	}
}();
!
function(window) {
	"use strict";
	window.Fraction = function(numerator, denominator) {
		if ("undefined" != typeof numerator && denominator)"number" == typeof numerator && "number" == typeof denominator ? (this.numerator = numerator, this.denominator = denominator) : "string" == typeof numerator && "string" == typeof denominator && (this.numerator = parseInt(numerator), this.denominator = parseInt(denominator));
		else if ("undefined" == typeof denominator) {
			var num = numerator;
			if ("number" == typeof num) this.numerator = num, this.denominator = 1;
			else if ("string" == typeof num) {
				var a, b, arr = num.split(" ");
				if (arr[0] && (a = arr[0]), arr[1] && (b = arr[1]), a % 1 === 0 && b && b.match("/")) return new Fraction(a).add(new Fraction(b));
				if (!a || b) return;
				if ("string" == typeof a && a.match("/")) {
					var f = a.split("/");
					this.numerator = f[0], this.denominator = f[1]
				} else {
					if ("string" == typeof a && a.match(".")) return new Fraction(parseFloat(a));
					this.numerator = parseInt(a), this.denominator = 1
				}
			}
		}
		this.normalize()
	}, Fraction.prototype.clone = function() {
		return new Fraction(this.numerator, this.denominator)
	}, Fraction.prototype.toString = function() {
		if (isNaN(this.denominator)) return "NaN";
		var result = "";
		this.numerator < 0 != this.denominator < 0 && (result = "-");
		var numerator = Math.abs(this.numerator),
			denominator = Math.abs(this.denominator),
			wholepart = Math.floor(numerator / denominator);
		return numerator %= denominator, 0 !== wholepart && (result += wholepart), 0 !== numerator && (0 !== wholepart && (result += " "), result += numerator + "/" + denominator), result.length > 0 ? result : "0"
	}, Fraction.prototype.toTeX = function(mixed) {
		if (isNaN(this.denominator)) return "NaN";
		var result = "";
		this.numerator < 0 != this.denominator < 0 && (result = "-");
		var numerator = Math.abs(this.numerator),
			denominator = Math.abs(this.denominator);
		if (!mixed) return 1 === denominator ? result + numerator : result + "\\frac{" + numerator + "}{" + denominator + "}";
		var wholepart = Math.floor(numerator / denominator);
		return numerator %= denominator, 0 !== wholepart && (result += wholepart), 0 !== numerator && (result += "\\frac{" + numerator + "}{" + denominator + "}"), result.length > 0 ? result : "0"
	}, Fraction.prototype.rescale = function(factor) {
		return this.numerator *= factor, this.denominator *= factor, this
	}, Fraction.prototype.add = function(b) {
		var a = this.clone();
		b = b instanceof Fraction ? b.clone() : new Fraction(b);
		var td = a.denominator;
		return a.rescale(b.denominator), a.numerator += b.numerator * td, a.normalize()
	}, Fraction.prototype.subtract = function(b) {
		var a = this.clone();
		b = b instanceof Fraction ? b.clone() : new Fraction(b);
		var td = a.denominator;
		return a.rescale(b.denominator), a.numerator -= b.numerator * td, a.normalize()
	}, Fraction.prototype.multiply = function(b) {
		var a = this.clone();
		if (b instanceof Fraction) a.numerator *= b.numerator, a.denominator *= b.denominator;
		else {
			if ("number" != typeof b) return a.multiply(new Fraction(b));
			a.numerator *= b
		}
		return a.normalize()
	}, Fraction.prototype.divide = function(b) {
		var a = this.clone();
		if (b instanceof Fraction) a.numerator *= b.denominator, a.denominator *= b.numerator;
		else {
			if ("number" != typeof b) return a.divide(new Fraction(b));
			a.denominator *= b
		}
		return a.normalize()
	}, Fraction.prototype.equals = function(b) {
		b instanceof Fraction || (b = new Fraction(b));
		var a = this.clone().normalize();
		return b = b.clone().normalize(), a.numerator === b.numerator && a.denominator === b.denominator
	}, Fraction.prototype.normalize = function() {
		var isFloat = function(n) {
				return "number" == typeof n && (n > 0 && n % 1 > 0 && n % 1 < 1 || n < 0 && n % -1 < 0 && n % -1 > -1)
			},
			roundToPlaces = function(n, places) {
				if (places) {
					var scalar = Math.pow(10, places);
					return Math.round(n * scalar) / scalar
				}
				return Math.round(n)
			};
		return function() {
			var rounded, scaleup;
			isFloat(this.denominator) && (rounded = roundToPlaces(this.denominator, 9), scaleup = Math.pow(10, rounded.toString().split(".")[1].length), this.denominator = Math.round(this.denominator * scaleup), this.numerator *= scaleup), isFloat(this.numerator) && (rounded = roundToPlaces(this.numerator, 9), scaleup = Math.pow(10, rounded.toString().split(".")[1].length), this.numerator = Math.round(this.numerator * scaleup), this.denominator *= scaleup);
			var gcf = Fraction.gcf(this.numerator, this.denominator);
			return this.numerator /= gcf, this.denominator /= gcf, this.denominator < 0 && (this.numerator *= -1, this.denominator *= -1), this
		}
	}(), Fraction.gcf = function(a, b) {
		if (arguments.length < 2) return a;
		var c;
		for (a = Math.abs(a), b = Math.abs(b); b;) c = a % b, a = b, b = c;
		return a
	}, Fraction.primeFactors = function(n) {
		for (var num = Math.abs(n), factors = [], _factor = 2; _factor * _factor <= num;) num % _factor === 0 ? (factors.push(_factor), num /= _factor) : _factor++;
		return 1 != num && factors.push(num), factors
	}, Fraction.prototype.snap = function(max, threshold) {
		threshold || (threshold = 1e-4), max || (max = 100);
		for (var negative = this.numerator < 0, decimal = this.numerator / this.denominator, fraction = Math.abs(decimal % 1), remainder = negative ? Math.ceil(decimal) : Math.floor(decimal), denominator = 1; denominator <= max; ++denominator) for (var numerator = 0; numerator <= max; ++numerator) {
			var approximation = Math.abs(numerator / denominator);
			if (Math.abs(approximation - fraction) < threshold) return new Fraction(remainder * denominator + numerator * (negative ? -1 : 1), denominator)
		}
		return new Fraction(this.numerator, this.denominator)
	}
}(window);
var ICA = ICA || {};
ICA.config = {
	baseImgSrc: "/Templates/General/Views/Images/",
	isTouchDevice: !1,
	parallax: {
		enableForTouchDevices: !1,
		parallaxClass: "parallax",
		parallaxBlur: 0,
		parallaxOpacity: 0,
		parallaxRatio: .7
	},
	imageSlider: {
		imageSliderClass: ".image-slider",
		buttonClass: "unslider-arrow",
		prevButtonSrc: "slider_arrow_left.png",
		nextButtonSrc: "slider_arrow_right.png",
		unsliderSettings: {
			speed: 500,
			delay: 1e4,
			complete: function() {},
			keys: !0,
			dots: !0,
			fluid: !0
		}
	},
	pageBaseSizes: {
		sm: {
			min: 320,
			max: 479,
			type: "grid"
		},
		md: {
			min: 480,
			max: 699,
			type: "grid"
		},
		lg: {
			min: 700,
			max: 979,
			type: "grid"
		},
		xl: {
			min: 980,
			max: null,
			type: "grid"
		}
	}
}, ICA.config.pageBaseSizes.small = $.extend({}, ICA.config.pageBaseSizes.sm, {
	type: ""
}), ICA.config.pageBaseSizes.medium = $.extend({}, ICA.config.pageBaseSizes.md, {
	type: ""
}), ICA.config.pageBaseSizes.large = $.extend({}, ICA.config.pageBaseSizes.lg, {
	type: ""
}), ICA.config.pageBaseSizes.xlarge = $.extend({}, ICA.config.pageBaseSizes.xl, {
	type: ""
}), ICA.config.pageBaseSizes.mobile = {
	min: null,
	max: ICA.config.pageBaseSizes.md.max,
	type: "device"
}, ICA.config.pageBaseSizes.tablet = {
	min: ICA.config.pageBaseSizes.lg.min,
	max: ICA.config.pageBaseSizes.lg.max,
	type: "device"
}, ICA.config.pageBaseSizes.desktop = {
	min: ICA.config.pageBaseSizes.xl.min,
	max: null,
	type: "device"
};
var ICA = ICA || {};
!
function($, window, document, undefined) {
	ICA.history = {
		savePreviousPage: function() {
			if ("object" == typeof localStorage) try {
				var previousPage = sessionStorage.getItem("currentPage");
				sessionStorage.setItem("currentPage", location.href), sessionStorage.setItem("previousPage", previousPage)
			} catch (e) {
				Storage.prototype._setItem = Storage.prototype.setItem, Storage.prototype.setItem = function() {}, console.log('Your web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.')
			}
		},
		getPreviousPage: function() {
			if ("object" == typeof localStorage) try {
				return sessionStorage.getItem("previousPage")
			} catch (e) {
				Storage.prototype._setItem = Storage.prototype.setItem, Storage.prototype.setItem = function() {}, console.log('Your web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.')
			}
		}
	}, ICA.history.savePreviousPage()
}(jQuery, this, this.document);
window.requestAnimationFrame || (window.requestAnimationFrame = function() {
	return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback, element) {
		window.setTimeout(callback, 1e3 / 60)
	}
}());
var ICA = ICA || {};
!
function($, window, document, undefined) {
	ICA.fn = {
		lastDeviceType: null,
		hasTouch: !1,
		getViewportSize: function() {
			var size = [0, 0];
			return size = "undefined" != typeof window.innerWidth ? [window.innerWidth, window.innerHeight] : "undefined" != typeof document.documentElement && "undefined" != typeof document.documentElement.clientWidth && 0 != document.documentElement.clientWidth ? [document.documentElement.clientWidth, document.documentElement.clientHeight] : [document.getElementsByTagName("body")[0].clientWidth, document.getElementsByTagName("body")[0].clientHeight]
		},
		getPageSize: function() {
			var size = ICA.fn.getViewportSize(),
				width = size[0],
				pageSizes = ICA.config.pageBaseSizes;
			return width <= pageSizes.sm.max ? "sm" : width <= pageSizes.md.max ? "md" : width <= pageSizes.lg.max ? "lg" : "xl"
		},
		getWindowHeight: function() {
			return window.innerHeight > $(window).innerHeight() ? window.innerHeight : $(window).innerHeight()
		},
		getWindowRealHeight: function() {
			var landscape = 90 == window.orientation || window.orientation == -90;
			return landscape ? window.innerHeight < $(window).innerHeight() ? window.innerHeight : $(window).innerHeight() : window.innerHeight > $(window).innerHeight() ? window.innerHeight : $(window).innerHeight()
		},
		isTouchDevice: function() {
			return ICA.fn.hasTouch
		},
		isMobileDevice: function() {
			return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)
		},
		isRetina: function() {
			var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),            (min--moz-device-pixel-ratio: 1.5),            (-o-min-device-pixel-ratio: 3/2),            (min-resolution: 1.5dppx)";
			return window.devicePixelRatio > 1 || !(!window.matchMedia || !window.matchMedia(mediaQuery).matches)
		},
		loadRetinaImages: function(imgURL) {
			if ("undefined" != typeof imgURL) {
				var imgExtension = imgURL.substr(imgURL.lastIndexOf(".")),
					newImageName = ".2x" + imgExtension;
				return imgURL.replace(imgExtension, newImageName)
			}
			return imgURL
		},
		deviceType: function() {
			if (!ICA.config.resetDeviceType && "undefined" != typeof lastDeviceType) return lastDeviceType;
			$(window).off("resize.resetDeviceType").on("resize.resetDeviceType", function() {
				ICA.config.resetDeviceType = !0
			}), ICA.config.resetDeviceType = !1;
			var dType = "desktop",
				windowWidth = $(window).width();
			return windowWidth <= ICA.config.viewPort.mobile ? dType = "mobile" : windowWidth <= ICA.config.viewPort.tablet && (dType = "tablet"), lastDeviceType = dType, dType
		},
		getIOSVersion: function(t) {
			var match = navigator.userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/);
			return null === match || "undefined" === match ? 0 : (version = [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3] || 0, 10)], parseFloat(version.join(".")).toFixed(1))
		},
		getAndroidVersion: function(t) {
			var type = "undefined" == typeof t ? "major" : t,
				ua = navigator.userAgent,
				match = ua.match(/Android\s([0-9\.]*)/i);
			if (null === match || "undefined" === match) return 0;
			switch (type) {
			case "full":
				return match[1];
			case "major":
				return parseFloat(match[1]).toFixed(1)
			}
		},
		isAndroidStockBrowser: function() {
			var ua = navigator.userAgent,
				match = ua.match(/^(?=.*?\bMozilla\b)(?=.*?\bAndroid\b)(?=.*?\bAppleWebKit\b)(?=.*?\bKHTML, like Gecko\b)(?=.*?\bMobile Safari\b)((?!Chrome).)*$/i);
			return match !== undefined && null !== match
		},
		browserPrefix: function() {
			var styles = window.getComputedStyle(document.documentElement, ""),
				pre = (Array.prototype.slice.call(styles).join("").match(/-(moz|webkit|ms)-/) || "" === styles.OLink && ["", "o"])[1],
				dom = "WebKit|Moz|MS|O".match(new RegExp("(" + pre + ")", "i"))[1];
			return {
				dom: dom,
				lowercase: pre,
				css: "-" + pre + "-",
				js: pre[0].toUpperCase() + pre.substr(1)
			}
		},
		ieVersionDetector: function() {
			var docModeIE = document.documentMode;
			if ("undefined" != typeof docModeIE) switch (docModeIE) {
			case 10:
				$("html").addClass("ie ie10 lte10 lte11");
				break;
			case 11:
				$("html").addClass("ie ie11 lte11")
			}
		},
		escapeRegExpSplChar: function(str) {
			return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
		},
		checkSizeScrollToTop: function(q, $a, $b) {
			$(window).checkSize(q) ? this.scrollTo($a) : this.scrollTo($b)
		},
		getScrollPosition: function() {
			var body = document.compatMode && "BackCompat" != document.compatMode ? document.documentElement : document.body;
			return document.all ? body.scrollTop : pageYOffset
		},
		validateEmailAddressRegExpression: function() {
			var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
			return pattern
		},
		hasScrollBar: function(element) {
			return parseInt(element.get(0).scrollHeight) > parseInt(element.height())
		},
		getOriginalTranslateInPercent: function(el) {
			var $el = el;
			if ("undefined" != typeof $el.data("translateX") && "undefined" != typeof $el.data("translateY")) return {
				x: $el.data("translateX"),
				y: $el.data("translateY")
			};
			var transform = $el.css("transform") || $el.css("-o-transform") || $el.css("-ms-transform") || $el.css("-moz-transform") || $el.css("-webkit-transform"),
				transform = transform.split(","),
				originalTranslateX = "",
				originalTranslateY = "";
			if (transform.length > 5) {
				var width = $el.outerWidth(),
					transformX = transform[4],
					height = $el.outerHeight(),
					transformY = transform[5].slice(0, -1);
				if (0 != transformX) {
					var percentX = Math.round(transformX / width * 1e4) / 100;
					originalTranslateX = "translateX(" + percentX + "%)"
				}
				if (0 != transformY) {
					var percentY = Math.round(transformY / height * 1e4) / 100;
					originalTranslateY = "translateY(" + percentY + "%)"
				}
			}
			return $el.data("translateX", percentX || 0), $el.data("translateY", percentY || 0), {
				x: percentX || 0,
				y: percentY || 0
			}
		},
		getOriginalTranslateXInPercent: function(el) {
			return "translateX(" + this.getOriginalTranslateInPercent(el).x + "%)"
		},
		getOriginalTranslateYInPercent: function(el) {
			return "translateY(" + this.getOriginalTranslateInPercent(el).y + "%)"
		},
		createCookie: function(name, value, days, path, domain) {
			if (0 != name.length) {
				var expires;
				if (days) {
					var date = new Date;
					date.setTime(date.getTime() + 24 * days * 60 * 60 * 1e3), expires = "; expires=" + date.toGMTString()
				}
				document.cookie = name + "=" + value + (expires ? expires : "") + (path ? "; path=" + path : "") + (domain ? "; domain=" + domain : "")
			}
		},
		readCookie: function(name) {
			if (0 == name.length) return null;
			for (var cName = name + "=", cArray = document.cookie.split(";"), cACount = cArray.length; cACount;) {
				cACount--;
				for (var c = cArray[cACount];
				" " == c.charAt(0);) c = c.substring(1, c.length);
				if (0 == c.indexOf(cName)) return c.substring(cName.length, c.length)
			}
			return null
		},
		appendToCookie: function(name, value, days, path, domain) {
			ICA.fn.createCookie(name, ICA.fn.readCookie(name) + value, days, path, domain)
		},
		removeValueFromCookie: function(name, value, days, path, domain) {
			var oldCookieValue = ICA.fn.readCookie(name),
				newCookieValue = oldCookieValue.replace(value, "");
			ICA.fn.createCookie(name, newCookieValue, days, path, domain)
		},
		deleteCookie: function(name, domain) {
			0 != name.length && ICA.fn.createCookie(name, "", -1, "/", domain ? domain : "")
		},
		readLocalStorageInfo: function(key) {
			return Modernizr.localstorage ? window.localStorage.getItem(key) : undefined
		},
		writeLocalStorageInfo: function(key, value) {
			Modernizr.localstorage && window.localStorage.setItem(key, value)
		},
		readSessionStorageInfo: function(key) {
			return Modernizr.sessionstorage ? window.sessionStorage.getItem(key) : undefined
		},
		writeSessionStorageInfo: function(key, value) {
			Modernizr.sessionstorage && window.sessionStorage.setItem(key, value)
		},
		getUrl: function(key, wildcards) {
			var returnString;
			wildcards = wildcards || [];
			try {
				if (returnString = eval("ICA.config.url." + key + "['" + ICA.config.envir + "']"), wildcards.length > 0) {
					var re = new RegExp(/\[\$\]/g),
						i = 0;
					returnString = returnString.replace(re, function(m, key, value) {
						return m = wildcards[i] != undefined ? wildcards[i] : "", i++, m
					})
				}
			} catch (err) {
				returnString = eval("ICA.config.url.defaultPath['" + ICA.config.envir + "']")
			}
			return returnString
		},
		getQueryString: function(urlString) {
			return querystring = urlString.substr(urlString.indexOf("?")), querystring
		},
		parseLocationHash: function() {
			var hash = location.hash.substr(1),
				params = {};
			if (hash.length > 2 && (hash = ":" == hash.substr(0, 1) ? hash.substr(1) : hash), hash.length > 1) {
				for (var paramstrings = hash.split("&"), i = 0, l = paramstrings.length; i < l; i++) {
					var pairs = paramstrings[i].split("=");
					params[pairs[0]] ? ("string" == typeof params[pairs[0]] && (params[pairs[0]] = [params[pairs[0]]]), "undefined" != typeof pairs[1] && pairs[1].indexOf(",") !== -1 ? params[pairs[0]].push(decodeURIComponent(pairs[1]).split(",")) : params[pairs[0]].push(decodeURIComponent(pairs[1]))) : params[pairs[0]] = "undefined" != typeof pairs[1] && pairs[1].indexOf(",") !== -1 ? decodeURIComponent(pairs[1]).split(",") : decodeURIComponent(pairs[1])
				}
				return params
			}
			return {}
		},
		parseQuerystring: function(doNotDecode, sBaseStringParam) {
			var sBaseString = $.trim((sBaseStringParam || location.search).replace("?", "")),
				querystring = [];
			sBaseString.length > 0 && (querystring = sBaseString.split("&"));
			var i, iLen, name, value, queryObj = {};
			for (iLen = querystring.length, i = 0; i < iLen; i++) name = querystring[i].split("=")[0], value = doNotDecode ? querystring[i].split("=")[1] : decodeURIComponent(querystring[i].split("=")[1]), queryObj[name] ? "array" == ICA.fn.typeOf(queryObj[name]) ? queryObj[name].indexOf(value) == -1 && queryObj[name].push(value) : queryObj[name] = [queryObj[name]].concat([value]) : queryObj[name] = value;
			return queryObj
		},
		buildQueryString: function(obj) {
			var qs = "";
			for (key in obj) key && (qs += "array" == ICA.fn.typeOf(obj[key]) ? [""].concat(obj[key]).join("&" + key + "=") : ["&", key, "=", obj[key]].join(""));
			return qs.substr(1)
		},
		doUniform: function(obj, el) {
			var $container = $("body"),
				$elems = $("input[type=checkbox], input[type=radio]:not(.ui-helper-hidden-accessible), select.uniform, select, input[type=file]"),
				selectClass = "selector";
			"undefined" != typeof obj && $(obj)[0] && ($container = $(obj)), "undefined" != typeof el && $(el)[0] && ($elems = $(el), $elems.each(function() {
				"select" == this.tagName.toLowerCase() && ($elems.hasClass("selector_primary") ? selectClass = "selector_primary" : $elems.hasClass("selector_primaryAlt") ? selectClass = "selector_primaryAlt" : $elems.hasClass("selector_secondary") ? selectClass = "selector_secondary" : $elems.hasClass("selector_secondaryAlt") ? selectClass = "selector_secondaryAlt" : $elems.hasClass("selector_boxArrow") ? selectClass = "selector_boxArrow" : $elems.hasClass("selector_arrowOnly") && (selectClass = "selector_arrowOnly"))
			})), $container.find($elems).each(function() {
				!$(this).is("select") || 0 !== $(this).prop("selectedIndex") && $(this).prop("selectedIndex") !== -1 || $(this).prop("selectedIndex", 0)
			}), $container.find($elems).filter(function() {
				var status = !0;
				if (0 === parseInt($(this).css("opacity"), 10)) try {
					$.uniform.update($(this)), status = !1
				} catch (err) {
					status = !0
				}
				return status
			}).uniform({
				selectClass: selectClass,
				fileDefaultText: ICA.glblStringMsgs.noFileSelected,
				fileBtnText: ICA.glblStringMsgs.chooseFile
			})
		},
		gotoUrl: function(e) {
			var redirect, redir = !1,
				regex = /^\S+$/;
			e.preventDefault(), "checkbox" == this.type && regex.test(this.value) ? (ICA.modalDialog.openPreloader(), redirect = this.value, redir = !0) : "radio" == this.type || "select" == this.tagName.toLowerCase() && regex.test(this.value) ? (redirect = this.value, redir = !0) : "a" == this.tagName.toLowerCase() && this.href.length && (redirect = this.href, redir = !0), redir && (window.location.href = redirect)
		},
		hasProperty: function(obj, key) {
			return Object.prototype.hasOwnProperty.call(obj, key)
		},
		isValidURL: function(s, relativeURL) {
			if ("undefined" != typeof relativeURL && relativeURL === !0) var regexp = /\//;
			else var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
			return regexp.test(s)
		},
		getWidthOfLargestChild: function(children) {
			for (var width = 0, numChildren = children.length, i = 0; i < numChildren; i++) {
				var itemClientWidth = children[i].clientWidth;
				itemClientWidth > width && (width = itemClientWidth)
			}
			return width
		},
		buildUrl: function(baseUrl, params) {
			for (var baseParams = {}, pairs = baseUrl.split("?")[1].split("&"), x = pairs.length; x > 0; x--) {
				var pair = pairs[x - 1].split("=");
				baseParams[pair[0]] = pair[1]
			}
			$.extend(baseParams, params);
			var qs = [];
			for (var key in baseParams) qs.push(key + "=" + baseParams[key]);
			return qs = "?" + qs.join("&"), baseUrl.split("?")[0] + qs
		},
		CommaFormattedNumber: function(digit) {
			if (digit = digit.toString(), digit.length < 4) return digit;
			var delimiter = ",",
				a = [],
				d = "",
				i = 0,
				minus = "";
			if (digit.indexOf(".") !== -1 ? (a = digit.split(".", 2), d = a[1], i = parseInt(a[0])) : i = parseInt(digit), isNaN(i)) return "";
			i < 0 && (minus = "-"), i = Math.abs(i);
			for (var n = i.toString(), b = [], nn = ""; n.length > 3;) nn = n.substr(n.length - 3), b.unshift(nn), n = n.substr(0, n.length - 3);
			return n.length > 0 && b.unshift(n), n = b.join(delimiter), digit = "" === d && d.length < 1 ? n : n + "." + d, digit = minus + digit
		},
		getFormatedTime: function(t) {
			isNaN(t) && (t = parseInt(t));
			var h = parseInt(t / 3600),
				m = parseInt(t % 3600 / 60),
				s = t % 60;
			return h = h < 10 ? "0" + h : h, m = m < 10 ? "0" + m : m, s = s < 10 ? "0" + s : s, h + ":" + m + ":" + s
		},
		get12HourFormatTime: function(dateObj) {
			var hh = dateObj.getHours(),
				mm = dateObj.getMinutes(),
				dd = ICA.glblStringMsgs.amTxt,
				hr = hh;
			return hr >= 12 && (hr = hh - 12, dd = ICA.glblStringMsgs.pmTxt), 0 == hr && (hr = 12), mm = mm < 10 ? "0" + mm : mm, hr = hr < 10 ? "0" + hr : hr, hr + ":" + mm + " " + dd
		},
		getWeekdayFormatDate: function(dateObj) {
			var dateStr = ICA.config.weekdays[dateObj.getDay()] + ", " + ICA.config.months[dateObj.getMonth()] + " " + dateObj.getDate() + ", " + dateObj.getFullYear();
			return dateStr
		},
		insertAdaptiveImg: function(url, alt, title) {
			var ext = "";
			if (/^\s*$/.test(url) === !1) {
				ICA.pgLoadVPW < ICA.config.mobileSizes.upperLimit ? ext = ".mob" : ICA.pgLoadVPW < ICA.config.tabletSizes.upperLimit && (ext = ".tab");
				var newSrc = 0 === ext.length ? url : url.substring(0, url.lastIndexOf(".")) + ext + url.substring(url.lastIndexOf(".")),
					imgTag = '<img alt="' + alt + '" class="avoidRespImgOnLoad" data-resp-url="' + url + '" src="' + newSrc + '" title="' + title + '" />';
				document.write(imgTag)
			}
		},
		typeOf: function(global) {
			return function(obj) {
				return obj === global ? "global" : {}.toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
			}
		}(window),
		parseJsonHelper: function(dataParams) {
			try {
				return dataObj = $.parseJSON(dataParams)
			} catch (error) {
				return null
			}
		},
		isTextSelected: function(input) {
			return "number" == typeof input.selectionStart ? 0 == input.selectionStart && input.selectionEnd == input.value.length : "undefined" != typeof document.selection ? (input.focus(), document.selection.createRange().text == input.value) : void 0
		},
		decodeEntities: function() {
			function decodeHTMLEntities(str) {
				return str && "string" == typeof str && (str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, ""), str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, ""), element.innerHTML = str, str = element.textContent, element.textContent = ""), str
			}
			var element = document.createElement("div");
			return decodeHTMLEntities
		}(),
		scrollTo: function(el) {
			if (el.length) {
				var $target = el instanceof jQuery ? el : $(el),
					scrollAnimAbortTriggers = "scroll mousedown DOMMouseScroll mousewheel keyup touchstart",
					stopScrollAnim = function(e) {
						(e.which > 0 || "mousedown" === e.type || "mousewheel" === e.type || "touchstart" === e.type) && $(this).stop()
					};
				return $("html, body").animate({
					scrollTop: $target.offset().top
				}, 400).one(scrollAnimAbortTriggers, stopScrollAnim), !1
			}
		}
	}, ICA.pgLoadVPWH = ICA.fn.getViewportSize(), ICA.pgLoadVPW = ICA.pgLoadVPWH[0]
}(jQuery, this, this.document);
!
function($) {
	"use strict";
	window.triggerAsModal = function(content, modalClass, removeOnClose, modalSettings) {
		var $link = $("<div></div>");
		$link.triggerAsModal(content, modalClass, removeOnClose, modalSettings)
	}, $.fn.triggerAsModal = function(content, modalClass, removeOnClose, modalSettings) {
		return $(this).create(ICA.Components.Modal, modalSettings || {}, function() {
			var modal = this,
				$content = $("string" == typeof content ? "<div>" + content + "</div>" : content);
			$content.removeClass("hidden removed modalcontent"), modal.content = modal.content.empty().append($content), modal.modalbox.addClass(modalClass), modal.removeOnClose = "undefined" != typeof removeOnClose && removeOnClose, modal.openwhenready = !0, modal.success(), modal.content.trigger("initDom")
		})
	}, window.triggerAsConfirm = function(content, proceed, cancel, className, yesText, noText, modalSettings) {
		var container = $("<div></div>").append(content),
			footer = $('<div class="form-buttons"></div>').appendTo(container);
		$("<button>" + (yesText ? yesText : "Ok") + "</button>").on("click", function() {
			return container.trigger("close"), "function" == typeof proceed && proceed(), !1
		}).appendTo(footer), $('<a href="#">' + (noText ? noText : "Avbryt") + "</a>").on("click", function(e) {
			return e.preventDefault(), container.trigger("close"), "function" == typeof cancel && cancel(), !1
		}).appendTo(footer);
		window.triggerAsModal(container, "dialog" + (className ? " " + className : ""), "", modalSettings)
	}, $.fn.triggerAsCallout = function(content) {
		var attachTo = this;
		$('<div class="callout">' + content + "</div>").create(ICA.Components.Callout, {
			stayonscreen: !0
		}, attachTo)
	}, $.fn.initDom = function() {
		var container = $(this),
			isMobDevice = /iphone|ipad|Android|webOS|iPod|BlackBerry|Windows Phone|ZuneWP7/gi.test(navigator.appVersion);
		!isMobDevice && $.fn.lazyload ? $("img.lazy", container).lazyload({
			skip_invisible: !1,
			threshold: 100,
			failure_limit: 150
		}) : $("img.lazy", container).each(function() {
			$(this).attr("src", $(this).data("original"))
		}), $(".banner a.close", container).on("click", function() {
			return $(this).closest(".banner").hide(), ICA.legacy.setCookie("hidebanner", "yesplease", 86400), !1
		}), ICA.Components.init(container), $(".triggerasmodal", container).each(function() {
			var type, $this = $(this);
			$this.removeClass("triggerasmodal"), $this.is(".dialog") ? type = "dialog" : $this.is(".narrow") ? type = "narrow" : $this.is(".no-close") && (type = "no-close"), window.triggerAsModal(this, type)
		}), $(".xform", container).each(function() {
			var xform = $(this),
				form = $("form");
			xform.on("click change focus", function() {
				form.addClass("allow")
			})
		}), $("img", container).on("error", function() {
			$(this).addClass("load-error").closest(".indicate-on-load-error").addClass("load-error")
		}), $(".background img, .thumb img, .image img, .planked img, .teaser .teaser-text img", container).each(function() {
			$(this).parent(".thumb, .image, .background, .planked, figure").length || $(this).parent("a").parent(".thumb, .image, .background, .planked, figure").length || $(this).wrap('<span class="image"></span>'), $('<span class="image-overlay sprite1-pseudo"></span>').insertAfter(this)
		}), $("a[data-toggleclass]", container).on("click", function(e) {
			e.preventDefault(), $(this).toggleClass($(this).data("toggleclass"))
		}), $("a.print", container).on("click", function() {
			return window.print(), console.log("We are"), !1
		}), $("a.history.back", container).on("click", function() {
			return window.history.back(), !1
		}), container.on("click", "a.scrollto", function(e) {
			e.preventDefault();
			var target = $($(this).attr("href"));
			if (target.length) {
				var scrollAnimAbortTriggers = "scroll mousedown DOMMouseScroll mousewheel keyup touchstart",
					stopScrollAnim = function(e) {
						(e.which > 0 || "mousedown" === e.type || "mousewheel" === e.type || "touchstart" === e.type) && $(this).stop()
					};
				return $("html, body").animate({
					scrollTop: target.offset().top
				}, 400).one(scrollAnimAbortTriggers, stopScrollAnim), !1
			}
		}), $("[data-addClass][data-target]", container).each(function() {
			var link = $(this),
				target = $(link.attr("data-target")),
				className = link.attr("data-addClass");
			target.hasClass(className) && link.addClass("active"), link.on("click", function() {
				return target.addClass(className + " changeclass").trigger("addClass", className), setTimeout(function() {
					target.removeClass("changeclass")
				}, 100), !1
			}), target.on("addClass", function(e, classList) {
				classList.match(new RegExp(className)) && link.addClass("active")
			}).on("removeClass", function(e, classList) {
				classList.match(new RegExp(className)) && link.removeClass("active")
			})
		}), $("[data-removeClass][data-target]", container).each(function() {
			var link = $(this),
				target = $(link.attr("data-target")),
				className = link.attr("data-removeClass");
			target.hasClass(className) || link.addClass("active"), link.on("click", function() {
				return target.addClass("changeclass").removeClass(className).trigger("removeClass", className), setTimeout(function() {
					target.removeClass("changeclass")
				}, 100), !1
			}), target.on("addClass", function(e, classList) {
				classList.match(new RegExp(className)) && link.removeClass("active")
			}).on("removeClass", function(e, classList) {
				classList.match(new RegExp(className)) && link.addClass("active")
			})
		}), $(".retina [data-retinabg]", container).each(function() {
			$(this).css({
				"background-image": "url(" + $(this).attr("data-retinabg") + ")"
			})
		}), $(".quick-links", container).onBreak(function() {
			$(this).addClass("link-box")
		}, function() {
			$(this).removeClass("link-box")
		}, 45), $("[data-hoverstyle]", container).hover(function() {
			$(this).attr({
				"data-nonhoverstyle": $(this).attr("style"),
				style: $(this).attr("style") + $(this).attr("data-hoverstyle")
			})
		}, function() {
			$(this).attr({
				style: $(this).attr("data-nonhoverstyle")
			}).removeAttr("data-nonhoverstyle")
		}), $("[data-actionstyle]", container).on("mousedown touchstart", function() {
			$(this).attr({
				"data-nonactionstyle": $(this).attr("style"),
				style: $(this).attr("style") + $(this).attr("data-actionstyle")
			})
		}).on("mouseout mouseup touchend", function() {
			$(this).attr({
				style: $(this).attr("data-nonactionstyle")
			}).removeAttr("data-nonactionstyle")
		}), $("[data-mobileclass]", container).each(function() {
			var obj = $(this),
				classList = obj.attr("data-mobileclass");
			window.addViewportSubscription({
				maxwidth: 480
			}, classList, function() {
				obj.addClass(classList).trigger("addclass", classList)
			}, function() {
				obj.removeClass(classList).trigger("removeclass", classList)
			})
		}), $("[data-tabletclass]", container).each(function() {
			var obj = $(this),
				classList = obj.attr("data-tabletclass");
			window.addViewportSubscription({
				maxwidth: 700
			}, classList, function() {
				obj.addClass(classList).trigger("addclass", classList)
			}, function() {
				obj.removeClass(classList).trigger("removeclass", classList)
			})
		}), $("[data-tabletonlyclass]", container).each(function() {
			var obj = $(this),
				classList = obj.attr("data-tabletonlyclass");
			window.addViewportSubscription({
				maxwidth: 700,
				minwidth: 481
			}, classList, function() {
				obj.addClass(classList).trigger("addclass", classList)
			}, function() {
				obj.removeClass(classList).trigger("removeclass", classList)
			})
		}), $("[data-desktopclass]", container).each(function() {
			var obj = $(this),
				classList = obj.attr("data-desktopclass");
			window.addViewportSubscription({
				minwidth: 701
			}, classList, function() {
				obj.addClass(classList).trigger("addclass", classList)
			}, function() {
				obj.removeClass(classList).trigger("removeclass", classList)
			})
		}), $("[data-non-mobileclass]", container).each(function() {
			var obj = $(this),
				classList = obj.attr("data-non-mobileclass");
			window.addViewportSubscription({
				minwidth: 481
			}, classList, function() {
				obj.addClass(classList).trigger("addclass", classList)
			}, function() {
				obj.removeClass(classList).trigger("removeclass", classList)
			})
		}), $("[data-non-tabletclass]", container).each(function() {
			var obj = $(this),
				classList = obj.attr("data-non-tabletclass");
			window.addViewportSubscription({
				minwidth: 701
			}, classList, function() {
				obj.addClass(classList).trigger("addclass", classList)
			}, function() {
				obj.removeClass(classList).trigger("removeclass", classList)
			})
		}), $("[data-non-desktopclass]", container).each(function() {
			var obj = $(this),
				classList = obj.attr("data-non-desktopclass");
			window.addViewportSubscription({
				maxwidth: 700
			}, classList, function() {
				obj.addClass(classList).trigger("addclass", classList)
			}, function() {
				obj.removeClass(classList).trigger("removeclass", classList)
			})
		}), $("[data-maxwidth-class]", container).each(function() {
			for (var obj = $(this), classList = obj.attr("data-maxwidth-class"), params = classList.split(" "), classList = "", width = 0, i = 0, l = params.length; i < l; i++) isNaN(parseInt(params[i])) ? classList += ("" == classList ? "" : " ") + params[i] : ("" != classList && window.addViewportSubscription({
				maxwidth: width
			}, classList, function(classList) {
				obj.addClass(classList).trigger("addclass", classList)
			}, function(classList) {
				obj.removeClass(classList).trigger("removeclass", classList)
			}), width = parseInt(params[i]), classList = "");
			window.addViewportSubscription({
				maxwidth: width
			}, classList, function(classList) {
				obj.addClass(classList).trigger("addclass", classList)
			}, function(classList) {
				obj.removeClass(classList).trigger("removeclass", classList)
			})
		}), $("[data-minwidth-class]", container).each(function() {
			for (var obj = $(this), classList = obj.attr("data-minwidth-class"), params = classList.split(" "), classList = "", width = 0, i = 0, l = params.length; i < l; i++) isNaN(parseInt(params[i])) ? classList += ("" == classList ? "" : " ") + params[i] : ("" != classList && window.addViewportSubscription({
				minwidth: parseFloat(width) + 1
			}, classList, function() {
				obj.addClass(classList).trigger("addclass", classList)
			}, function() {
				obj.removeClass(classList).trigger("removeclass", classList)
			}), width = parseInt(params[i]), classList = "");
			window.addViewportSubscription({
				minwidth: parseFloat(width) + 1
			}, classList, function() {
				obj.addClass(classList).trigger("addclass", classList)
			}, function() {
				obj.removeClass(classList).trigger("removeclass", classList)
			})
		}), container[0] == document && $(window).trigger("resize"), container.addClass("loaded"), container.trigger("initdom-complete")
	}, window.closeModal = function(success) {
		success ? $(".modalbox").trigger("success") : $(".modalbox").trigger("close")
	}, window.refetch = function() {
		$("form").trigger("refetch")
	}, window.documentInit = function() {
		if ($(document).on("initDom", function(e) {
			$(e.target).initDom()
		}).on("initComponent", function(e) {
			ICA.Components.init($(e.target), !0)
		}), $(window).scrollTop(0), ICA.Form && (window.theform = $("form").create(ICA.Form)), setTimeout(function() {
			$("html").hasClass("ios") || $("[autofocus]").trigger("click")
		}, 0), $(window).on("addclass", function(e, classList) {
			ICA.Components.init($(e.target), !0)
		}).on("removeclass", function(e, classList) {}), !$("html").is(".iframe")) {
			try {
				"true" == ICA.legacy.getCookie("is_login_reload").toLowerCase() && (ICA.legacy.killCookie("is_login_reload"), ICA.legacy.getCookie("disable-alert-forms") && "true" == ICA.legacy.getCookie("disable-alert-forms").toLowerCase() ? ICA.legacy.killCookie("disable-alert-forms") : setTimeout(function() {
					ICA.legacy.get("/Templates/General/Views/AlertViewManager.aspx", null, function(data) {
						if (data.length) {
							for (var arr = [], i = 0; i < data.length; i++) arr.push(data[i].Html);
							window.triggerAsModal(arr.join(""), "request-personal-info")
						}
					}, null, "json")
				}, 0))
			} catch (err) {}
			$(".EPi.xForm #id_matrix").each(function() {
				var $xForm = $(this);
				$xForm.find("span.xformvalidator").each(function() {
					var $this = $(this);
					$this.is("[id$=requiredvalidator]") && ($this.siblings("input:text, textarea, select").addClass("required"), $this.siblings(".textarea").find("textarea").addClass("required"), $this.siblings("fieldset").find(":checkbox, :radio").first().addClass("required"))
				}), $xForm.find("td label + input:text, tr td input:submit").each(function() {
					$(this).closest("td").addClass("form-paired")
				}), $xForm.find("tr td input:submit").each(function() {
					$(this).closest("td").closest("tr").addClass("with-submit-button")
				}), $xForm.find('input[type="checkbox"].parse_conditions_link').each(function() {
					var $link, $this = $(this),
						$label = $('label[for="' + $this.attr("id") + '"]'),
						classes = $.grep($this.attr("class").split(" "), function(elem, index) {
							return 0 == elem.indexOf("target_class_")
						}),
						targetclass = classes[0].replace("target_class_", ""),
						$target = $xForm.find("span." + targetclass),
						$nodes = $label.children().detach(),
						words = $label.text().split(" "),
						text = "",
						linkhtml = "";
					if (words.length > 2 && $target.length > 0) {
						$target.wrap('<div style="display:none;"></div>'), $target.closest("td").hide(), text += words[0] + " " + words[1] + " ", linkhtml += '<a href="/">';
						for (var i = 2; i < words.length; i++) linkhtml += (i > 2 ? " " : "") + words[i];
						linkhtml += "</a>", $link = $(linkhtml), $link.on("click", function(e) {
							e.preventDefault(), triggerAsModal($target), console.log("The link is triggered")
						})
					} else text = words.join(" ");
					$label.text(text).append($link), $label.prepend($nodes)
				})
			})
		}
	}, $(function() {
		window.documentInit()
	}), setTimeout(function() {
		$("html").removeClass("loading")
	}, 20), window.imageLoadQueue = [], window.viewportSubscriptions = [], window.addViewportSubscription = function(args, classList, truecallback, falsecallback) {
		var obj = $.extend({
			status: "undefined",
			truecallback: truecallback,
			falsecallback: "function" == typeof falsecallback && falsecallback,
			classList: classList
		}, args);
		window.viewportSubscriptions.push(obj), window.windowHasBeenResized && window.windowresize()
	}, window.windowresize = function() {
		var width = $(document).width(),
			height = $(this).height(),
			truecallbacks = [],
			$html = $("html");
		window.windowHasBeenResized = !0, width > 700 ? $html.removeClass("is-tablet is-mobile").addClass("is-desktop") : width < 480 ? $html.removeClass("is-tablet is-desktop").addClass("is-mobile") : $html.removeClass("is-desktop is-mobile").addClass("is-tablet"), $.each(viewportSubscriptions, function(i) {
			var subscription = viewportSubscriptions[i];
			if ("minwidth" in subscription && subscription.minwidth > width || "maxwidth" in subscription && subscription.maxwidth < width || "minheight" in subscription && subscription.minheight > height || "maxheight" in subscription && subscription.maxheight < height) {
				if (subscription.status) return subscription.status = !1, subscription.falsecallback(subscription.classList)
			} else if (!subscription.status || "undefined" === subscription.status) return subscription.status = !0, void truecallbacks.push(function() {
				subscription.truecallback(subscription.classList)
			})
		}), $.each(truecallbacks, function(i) {
			truecallbacks[i].call()
		})
	};
	var windowresizeto;
	window.resizeBuffer = function() {
		clearTimeout(windowresizeto), windowresizeto = setTimeout(window.windowresize, 100)
	}, $(window).resize(window.resizeBuffer), window.resizeBuffer(), $(window).on("resize", function() {
		function setOfferHeights() {
			$(".offer-listing .offers ul").each(function() {
				function setRowHeight() {
					for (var i = 0; i < rowitems.length; i++) rowitems[i].css("min-height", rowHeight).find("> section > .wrapper").css("min-height", wrapperHeight)
				}
				var $items = $(this).children().css("min-height", "");
				if ($items.length) {
					var rowitems = [$($items[0])],
						offsetTop = rowitems[0].offset().top,
						rowHeight = rowitems[0].height(),
						wrapperHeight = rowitems[0].find("> section > .wrapper").height();
					$items.each(function(index) {
						var $this = $(this),
							$wrapper = $this.find("> section > .wrapper");
						0 != index && (index == $items.length - 1 ? ($this.offset().top > offsetTop && (setRowHeight(), rowitems.length = 0, rowHeight = $this.height()), rowitems.push($this), rowHeight = $this.height() > rowHeight ? $this.height() : rowHeight, wrapperHeight = $wrapper.height() > wrapperHeight ? $wrapper.height() : wrapperHeight, setRowHeight()) : $this.offset().top > offsetTop ? (setRowHeight(), rowitems.length = 0, rowitems.push($this), rowHeight = $this.height(), wrapperHeight = $wrapper.height(), offsetTop = $this.offset().top) : (rowHeight = $this.height() > rowHeight ? $this.height() : rowHeight, wrapperHeight = $wrapper.height() > wrapperHeight ? $wrapper.height() : wrapperHeight, rowitems.push($this)))
					})
				}
			})
		}
		window.offerListingResizeTimer && (clearTimeout(window.offerListingResizeTimer), window.offerListingResizeTimer = null), window.offerListingResizeTimer = setTimeout(function() {
			setOfferHeights()
		}, 200)
	})
}(jQuery);
var ICA = ICA || {};
ICA.legacy = ICA.legacy || {}, ICA.Form = function() {
	var form = {
		obj: $(this),
		page: $("#page", this),
		hashparams: {},
		hashstring: "",
		submit: function(e) {
			if (!form.obj.hasClass("allow")) return e.preventDefault(), e.returnValue = !1, !1
		},
		ajaxsubmit: function(e, params, success, error) {
			if (params && "command" in params) {
				var command = params.command;
				delete params.command, ICA.legacy.perform(command, params, success, error)
			}
		},
		hashchange: function(e) {
			var urlParams, hrefSplit = location.href.split("#");
			if (hrefSplit.length < 2 ? urlParams = "" : (urlParams = ":" == hrefSplit[1].substr(0, 1) ? hrefSplit[1].substr(1) : hrefSplit[1], urlParams = urlParams.replace(/\+/g, " ")), urlParams.length > 1 && urlParams != form.hashstring) {
				form.hashstring = urlParams, form.hashparams = {};
				for (var paramstrings = form.hashstring.split("&"), i = 0, l = paramstrings.length; i < l; i++) {
					var pairs = paramstrings[i].split("=");
					form.hashparams[pairs[0]] ? ("string" == typeof form.hashparams[pairs[0]] && (form.hashparams[pairs[0]] = [form.hashparams[pairs[0]]]), "undefined" != typeof pairs[1] && pairs[1].indexOf(",") !== -1 ? form.hashparams[pairs[0]].push(decodeURIComponent(pairs[1]).split(",")) : form.hashparams[pairs[0]].push(decodeURIComponent(pairs[1]))) : form.hashparams[pairs[0]] = "undefined" != typeof pairs[1] && pairs[1].indexOf(",") !== -1 ? decodeURIComponent(pairs[1]).split(",") : decodeURIComponent(pairs[1])
				}
			} else "" == urlParams && "" !== form.hashstring && (form.hashparams = {});
			$("body").trigger("hashupdated")
		},
		addtoHash: function(e, params) {
			var added = !1;
			for (var key in params)"string" == typeof form.hashparams[key] ? form.hashparams[key] != params[key] ? (form.hashparams[key] = [form.hashparams[key], params[key]], added = !0) : "" != form.hashparams[key] && (form.hashparams[key] = params[key], added = !0) : "undefined" != typeof form.hashparams[key] ? $.inArray(params[key], form.hashparams[key]) < 0 && (form.hashparams[key].push(params[key]), added = !0) : (form.hashparams[key] = params[key], added = !0);
			added && form.updateHash(e, {})
		},
		deleteKeyFromHash: function(e, key) {
			"string" == typeof key && "undefined" != typeof form.hashparams[key] && (delete form.hashparams[key], form.updateHash(e, {}))
		},
		removefromHash: function(e, params) {
			var removed = !1;
			for (var key in params) if ("undefined" != typeof form.hashparams[key]) if ("string" == typeof form.hashparams[key]) form.hashparams[key] == params[key] && (form.hashparams[key] = "", removed = !0);
			else {
				var index = $.inArray(params[key], form.hashparams[key]);
				index > -1 && (form.hashparams[key].splice(index, 1), removed = !0)
			}
			removed && form.updateHash(e, {})
		},
		updateHash: function(e, params) {
			$.extend(form.hashparams, params), form.hashstring = "";
			for (var key in form.hashparams) if ("" != form.hashparams[key]) if ("" !== form.hashstring && (form.hashstring += "&"), form.hashparams[key] instanceof Array) for (var i = 0; i < form.hashparams[key].length; i++) form.hashstring += i > 0 ? "&" : "", form.hashstring += key, form.hashstring += "=", form.hashstring += encodeURIComponent(form.hashparams[key][i]);
			else form.hashstring += key + "=" + encodeURIComponent(form.hashparams[key]);
			form.hashstring ? (window.location.href = window.location.href.split("#")[0] + "#:" + form.hashstring, "onhashchange" in window || $(window).trigger("hashchange")) : window.location.href.indexOf("#:") > 0 && (window.location.href = window.location.href.split("#")[0] + "#:")
		},
		fetch: function(e, url, callback, scope) {
			scope = "undefined" == typeof scope ? "#page" : scope, form.page.addClass("loading"), $.get(url, {}, function(data) {
				var temp = $("<html></html>").html(data);
				if ("object" == typeof scope) for (i = 0; i < scope.length; i++) form.page.parent().find(scope[i]).html($(scope[i], temp).html());
				else "string" == typeof scope && form.page.parent().find(scope).html($(scope, temp).html());
				form.page.trigger("initDom"), $(window).trigger("resize"), form.page.removeClass("loading"), "function" == typeof callback && callback.call()
			})
		},
		refetch: function(e, callback, scope) {
			if (e.target == form.obj[0]) {
				var url = window.location.href.split("#")[0] + "?refetch";
				form.fetch(e, url, callback, scope)
			}
		},
		logout: function(e) {
			ICA.legacy.user.logout(function(data) {
				if ("message" in data && data.message) return window.location.href == data.message.toString() ? (window.location.reload(!0), !1) : (window.location.href = data.message.toString(), !1)
			})
		},
		init: function() {
			return form.obj.on("submit", form.submit).on("ajaxsubmit", form.ajaxsubmit).on("refetch", form.refetch).on("logout", form.logout).on("tracking", ICA.legacy.trackevent).on("keydown", "input:not(:checkbox,:radio)", function(e) {
				13 != e.keyCode || form.obj.hasClass("login-form") || (e.preventDefault(), form.obj.trigger("submit"))
			}).on("updateHash", form.updateHash).on("addtoHash", form.addtoHash).on("removefromHash", form.removefromHash), $(window).on("hashchange", form.hashchange), form.hashchange(), form
		}
	};
	return form.init()
};

function initNavigation(container) {
	ICA.navigation.init(container)
}
var ICA = ICA || {};
ICA.navigation = {
	NavigationToggle: function(args, callback) {
		var nav = {
			opt: $.extend({
				dropdown: !0
			}, args),
			obj: $(this).addClass("overflow-toggle"),
			menu: $(">ul, >.wrapper>ul", this),
			items: $(">ul>li, >.wrapper>ul>li", this),
			isOpen: !1,
			collapseContainer: $('<div class="collapsibles" tabIndex="-1"></div>'),
			collapseItem: $('<li class="nav-toggle" tabIndex="-1"></li>'),
			collapseList: $("<ul></ul>"),
			togglebtn: $('<a href="#" role="button" title="Expand navigation" aria-haspopup="true" class="togglebtn">Fler alternativ</a>'),
			open: function() {
				nav.obj.addClass("opening open");
				$(window).scrollTop();
				nav.collapseItem.addClass("active"), nav.togglebtn.attr({
					"aria-pressed": !0
				}), nav.isOpen = !0, nav.togglebtn.text("Färre alternativ"), setTimeout(function() {
					nav.collapseContainer.on("mousedown touchstart", nav.mousedown), $(document).on("mousedown touchstart", nav.close).on("keydown", nav.keydown)
				}, 300)
			},
			close: function(focus) {
				nav.obj.removeClass("open"), setTimeout(function() {
					nav.obj.removeClass("opening")
				}, 300), $("#page").removeClass("has-dropdown").removeAttr("tabIndex").off("click", nav.close), nav.togglebtn.attr({
					"aria-pressed": !1
				}), nav.collapseItem.removeClass("active"), nav.isOpen = !1, nav.togglebtn.text("Fler alternativ"), nav.collapseContainer.off("mousedown touchstart", nav.mousedown), $(document).off("mousedown touchstart", nav.close).off("keydown", nav.keydown)
			},
			keydown: function(e) {
				27 == e.keyCode && nav.close()
			},
			mousedown: function(e) {
				e.stopPropagation()
			},
			toggle: function() {
				return nav.isOpen ? nav.close(!0) : nav.open(), !1
			},
			click: function(e) {
				e.stopPropagation(), $(e.target).is("input, textarea, select") || (nav.redraw(), nav.obj.trigger("resize"), nav.close())
			},
			Item: function() {
				var item = {
					obj: $(this),
					content: $(">*", this),
					clone: $("<li></li>").addClass(this.className),
					isactive: $(this).hasClass("active"),
					iscollapsed: !1,
					collapse: function() {
						item.iscollapsed || (item.update(), item.obj.css({
							width: item.obj.width(),
							height: item.obj.height()
						}).addClass("cloned"), item.clone.append(item.content).appendTo(nav.collapseList), item.iscollapsed = !0)
					},
					update: function(e) {
						e && e.stopPropagation(), item.iscollapsed && item.obj.hasClass("active") && (nav.obj.addClass("active-collapsed"), nav.togglebtn.addClass("active"))
					},
					restore: function() {
						item.iscollapsed && (item.obj.append(item.content).css({
							width: "auto",
							height: "auto"
						}).removeClass("cloned"), item.clone.remove(), item.iscollapsed = !1)
					},
					checkPosition: function() {
						item.isactive = item.obj.hasClass("active"), item.obj.position().top > 10 || item.obj.prev(".cloned").length ? item.collapse() : item.restore()
					},
					init: function() {
						item.obj.on("update", item.update).on("collapse", item.collapse).on("restore", item.restore).on("checkposition", item.checkPosition)
					}
				};
				return item.init()
			},
			redraw: function() {
				nav.obj.removeClass("collapsed active-collapsed"), nav.togglebtn.removeClass("active"), nav.items.trigger("restore"), nav.menu.height() > nav.items.first().height() ? (nav.obj.addClass("collapsed"), nav.items.trigger("checkposition"), nav.collapseContainer.append(nav.collapseList), nav.items.trigger("update")) : nav.isOpen && (nav.close(), nav.collapseList.detach())
			},
			resize: function() {
				clearTimeout(nav.resizeto), nav.resizeto = setTimeout(function() {
					nav.menu.width() > 10 && (!nav.lastwidth || nav.lastwidth != $(window).width()) && (nav.obj.addClass("resizing"), nav.redraw(), nav.obj.removeClass("resizing"), nav.lastwidth = $(window).width())
				}, 100)
			},
			init: function() {
				return nav.menu.parent(".wrapper").length || nav.menu.wrap('<div class="wrapper"></div>'), nav.items.create(nav.Item), nav.opt.dropdown ? (nav.collapseItem.append(nav.togglebtn).appendTo(nav.menu), nav.collapseContainer.insertAfter(nav.menu.parent()), nav.menu.addClass("dropdown")) : nav.togglebtn.prependTo(nav.obj), nav.menu.on("click", nav.click), nav.togglebtn.onTap(nav.toggle), nav.togglebtn.on("touchstart mousedown", function(e) {
					e.stopPropagation()
				}), nav.collapseContainer.on("click", nav.click), nav.obj.addClass("navtoggle-loaded"), $(window).on("resize", nav.resize), setTimeout(nav.resize, 300), "function" == typeof callback && callback.call(nav), nav
			}
		};
		if (!$(this).hasClass("navtoggle-loaded")) return nav.init()
	},
	overflowScroll: function(args, callback) {
		var nav = {
			opt: $.extend({
				controls: !0
			}, args),
			obj: $(this),
			list: $(">ul", this),
			items: $(">ul>li", this),
			left: 0,
			active: 0,
			controls: {
				nextbtn: $('<a href="#" class="nextbtn" role="button">Scroll right</a>'),
				prevbtn: $('<a href="#" class="prevbtn" role="button">Scroll left</a>'),
				init: function() {
					nav.controls.nextbtn.insertAfter(nav.obj).onTap(nav.scrollRight), nav.controls.prevbtn.insertAfter(nav.obj).onTap(nav.scrollLeft)
				}
			},
			getPrevPosition: function() {
				if (nav.left > 0) {
					var position;
					return nav.items.each(function(i) {
						$(this).position().left < 30 && (position = +nav.left + $(this).position().left)
					}), position
				}
				return 0
			},
			getNextPosition: function() {
				if (nav.left + 39 + nav.obj.width() <= nav.list.outerWidth()) {
					var position = -1;
					return nav.items.each(function(i) {
						position < 0 && $(this).position().left + $(this).width() + 30 > nav.obj.width() && (position = $(this).position().left + nav.left)
					}), position
				}
				return nav.left + 39
			},
			scrollLeft: function(e) {
				return e && e.stopPropagation(), nav.left = nav.getPrevPosition() - 39, nav.obj.animate({
					scrollLeft: nav.left + "px"
				}, 300), !1
			},
			scrollRight: function(e) {
				return e && e.stopPropagation(), nav.list.addClass("showprev"), nav.left = nav.getNextPosition() - 39, nav.obj.animate({
					scrollLeft: nav.left + "px"
				}, 500), nav.controls.prevbtn.removeClass("faded").addClass("show"), !1
			},
			click: function(e) {
				return !1
			},
			scroll: function(e) {
				nav.left = nav.obj.scrollLeft(), nav.list.outerWidth() - nav.left <= nav.obj.width() ? nav.controls.nextbtn.addClass("faded") : nav.controls.nextbtn.removeClass("faded"), nav.left <= 0 ? nav.controls.prevbtn.addClass("faded") : nav.controls.prevbtn.removeClass("faded"), nav.list.outerWidth() > nav.obj.width() ? (nav.obj.addClass("overflowed"), nav.controls.nextbtn.addClass("show")) : (nav.obj.removeClass("overflowed"), nav.controls.prevbtn.add(nav.controls.nextbtn).removeClass("show"))
			},
			init: function() {
				return nav.controls.init(), nav.obj.on("touchstart", function(e) {
					nav.obj.addClass("touching")
				}).on("touchend", function() {
					nav.obj.removeClass("touching")
				}).on("scroll", nav.scroll).addClass("overflowscroll-loaded"), $(window).on("resize", nav.scroll), setTimeout(nav.scroll, 100), "function" == typeof callback && callback.call(nav.scrollContainer), nav
			}
		};
		if (!$(this).hasClass("overflowscroll-loaded")) return nav.init()
	},
	SideNav: function() {
		var sidenav = {
			obj: $(this),
			collapsible: !1,
			items: $("li", this),
			hasactive: $("li.has-active", this),
			active: $("li.active", this),
			togglebtn: $('<a href="#left-nav" class="show-menu" data-removeClass="collapsed" data-target="#left-nav">Fler menyalternativ</a>'),
			collapse: function(e) {
				sidenav.items.length > 3 ? (e ? (sidenav.togglebtn.text("Fler menyalternativ"), sidenav.obj.addClass("animate").height("")) : sidenav.togglebtn.appendTo(sidenav.obj).show(), sidenav.obj.addClass("collapsed")) : sidenav.obj.removeClass("collapsed")
			},
			expand: function(e) {
				e.preventDefault();
				var offsetForBtn = 0;
				return sidenav.collapsible ? (sidenav.togglebtn.text("Färre menyalternativ"), offsetForBtn = sidenav.togglebtn.outerHeight()) : sidenav.togglebtn.hide(), sidenav.obj.height(sidenav.obj.height() + offsetForBtn).addClass("animate"), setTimeout(function() {
					sidenav.obj.height($(">ul", sidenav.obj).outerHeight() + offsetForBtn)
				}, 10), setTimeout(function() {
					sidenav.obj.removeClass("collapsed"), sidenav.obj.removeClass("animate")
				}, 500), !1
			},
			reorder: function() {
				sidenav.active.length && sidenav.active.parent("ul").css({
					"padding-top": sidenav.active.outerHeight() + "px"
				}), sidenav.hasactive.length && sidenav.hasactive.parent("ul").css({
					"padding-top": sidenav.hasactive.outerHeight() + "px"
				})
			},
			reset: function() {
				sidenav.active.length && sidenav.active.parent("ul").css({
					"padding-top": 0
				}), sidenav.hasactive.length && sidenav.hasactive.parent("ul").css({
					"padding-top": 0
				})
			},
			init: function() {
				sidenav.obj.data("collapsible") && (sidenav.collapsible = !0, sidenav.obj.addClass("collapsible")), sidenav.togglebtn.hide(), sidenav.togglebtn.on("click touchend", function(e) {
					sidenav.collapsible && !sidenav.obj.hasClass("collapsed") ? (e.preventDefault(), sidenav.collapse(e)) : sidenav.expand(e)
				}), sidenav.obj.on("addclass", function(e, classList) {
					classList.match(/collapse/g) && (sidenav.collapse(), sidenav.reorder())
				}), sidenav.obj.on("removeclass", function(e, classList) {
					classList.match(/collapse/g) && sidenav.reset()
				}), sidenav.obj.hasClass("collapse") && sidenav.collapse()
			}
		};
		return sidenav.init()
	},
	init: function(container) {
		$(".side-nav", container).create(ICA.navigation.SideNav)
	}
};
$.fn.reverse = function(copy) {
	return copy ? this.pushStack(this.get().reverse(), arguments) : Array.prototype.reverse.apply(this)
}, $.fn.create = function(Constructor, args, callback) {
	if ($(this)[0]) {
		if ("function" != typeof Constructor) {
			var errorTrace = new Error;
			return console.log(errorTrace), "undefined" != typeof errorTrace && "undefined" != typeof errorTrace.stack && (errorTrace = errorTrace.stack.split("\n"), console.log(Error().stack), console.log("Could not load component attached to '" + $(this).selector + "' @ ", errorTrace.length > 1 ? errorTrace[1].split("Templates")[1] : "unknown")), !1
		}
		if (1 == this.length) return Constructor.call(this, args, callback);
		var arr = [];
		return this.each(function() {
			arr.push(Constructor.call(this, args, callback))
		}), arr
	}
	return !1
}, $.fn.serializeObject = function() {
	var o = {},
		a = this.serializeArray();
	return $.each(a, function() {
		o[this.name] ? (o[this.name].push || (o[this.name] = [o[this.name]]), o[this.name].push(this.value || "")) : o[this.name] = this.value || ""
	}), o
}, $.fn.ajaxLoader = function(args) {
	return this.each(function() {
		var opts = $.extend({
			lines: 11,
			length: 3,
			width: 1,
			radius: 3,
			corners: 1,
			rotate: 0,
			color: "#666",
			speed: 1,
			trail: 60,
			shadow: !1,
			hwaccel: !1,
			className: "spinner",
			zIndex: 2,
			top: "auto",
			left: "auto"
		}, args),
			data = $(this).data();
		data.spinner && (data.spinner.stop(), delete data.spinner), data.spinner = new Spinner(opts).spin(this)
	})
};
var overflowScroll = function(args, callback) {
		var nav = {
			opt: $.extend({
				controls: !0
			}, args),
			obj: $(this),
			list: $(">ul", this),
			items: $(">ul>li", this),
			class: "overflowScroll",
			myScroll: null,
			left: 0,
			maxLeft: 0,
			controls: {
				nextbtn: $('<a class="nav-next nav-next-icon sprite1" href="javascript:;"></a>'),
				prevbtn: $('<a class="nav-pre disabled nav-pre-icon sprite1" href="javascript:;"></a>'),
				init: function() {
					nav.controls.nextbtn.insertAfter(nav.list).on("click", nav.scrollRight).addClass("needsclick"), nav.controls.prevbtn.insertAfter(nav.list).on("click", nav.scrollLeft).addClass("needsclick")
				}
			},
			getPrevPosition: function() {
				if (nav.left > 0) {
					var position;
					return nav.items.each(function(i) {
						var posLeft = Math.round($(this).position().left),
							paddingLeft = nav.controls.prevbtn.outerWidth(!0);
						posLeft < paddingLeft && (position = nav.left + posLeft)
					}), position
				}
				return 0
			},
			getNextPosition: function() {
				if (nav.left + nav.obj.width() < nav.list.outerWidth()) {
					var position = -1;
					return nav.items.each(function(i) {
						var posLeft = Math.round($(this).position().left),
							paddingLeft = nav.controls.nextbtn.outerWidth(!0);
						position < 0 && posLeft + $(this).width() + paddingLeft > nav.obj.width() && (position = posLeft + nav.left)
					}), position > nav.maxLeft ? nav.maxLeft + nav.items.last().width() : position
				}
				return nav.left + nav.controls.nextbtn.outerWidth(!0) > nav.maxLeft ? nav.maxLeft + nav.controls.nextbtn.outerWidth(!0) : nav.left + nav.controls.nextbtn.outerWidth(!0)
			},
			scrollLeft: function(e) {
				return e && e.stopPropagation(), nav.controls.prevbtn.hasClass("inactive") || (nav.left = nav.getPrevPosition() - nav.controls.prevbtn.outerWidth(!0), nav.controls.nextbtn.removeClass("inactive"), 0 == nav.left && nav.controls.prevbtn.addClass("inactive"), nav.myScroll.scrollTo(-1 * nav.left, 0, 500)), !1
			},
			scrollRight: function(e) {
				return e && e.stopPropagation(), nav.controls.nextbtn.hasClass("inactive") || (nav.controls.prevbtn.removeClass("disabled").removeClass("inactive"), 0 == parseInt(nav.list.css("paddingLeft")) && (nav.list.css({
					paddingLeft: nav.controls.prevbtn.outerWidth(),
					paddingRight: nav.controls.nextbtn.outerWidth()
				}), nav.items.first().css("padding", "0")), nav.myScroll && nav.myScroll.refresh(), nav.left = nav.getNextPosition() + nav.controls.nextbtn.outerWidth(!0), nav.left >= nav.maxLeft && nav.controls.nextbtn.addClass("inactive"), nav.left > 1 && nav.myScroll.scrollTo(-1 * nav.left, 0, 500)), !1
			},
			scrollStart: function(e) {
				nav.controls.nextbtn.addClass("disabled"), nav.controls.prevbtn.addClass("disabled"), nav.items.first().css("padding", ""), nav.list.css({
					paddingLeft: 0,
					paddingRight: nav.controls.nextbtn.outerWidth(!0)
				}), setTimeout(function() {
					nav.myScroll.refresh()
				}, 0)
			},
			scrollEnd: function(e) {
				nav.left = nav.myScroll.x * -1, nav.list.outerWidth() - nav.left - 10 <= nav.obj.width() ? nav.controls.nextbtn.addClass("inactive") : nav.controls.nextbtn.removeClass("inactive"), nav.left <= 0 ? nav.controls.prevbtn.addClass("inactive") : nav.controls.prevbtn.removeClass("inactive")
			},
			refreshTabs: function() {
				setTimeout(function() {
					nav.myScroll && nav.myScroll.refresh()
				}, 0), nav.maxLeft = nav.list.outerWidth() - nav.obj.width(), nav.left = nav.left > 0 ? parseInt(nav.list.css("transform").split(",")[4]) * -1 : 0, nav.list.outerWidth() <= nav.obj.width() ? (nav.controls.nextbtn.addClass("disabled"), nav.controls.prevbtn.addClass("disabled"), nav.list.css({
					paddingLeft: 0,
					paddingRight: 0
				}), nav.items.first().css("padding", "")) : nav.obj.hasClass("only-touch") || nav.controls.nextbtn.removeClass("disabled").removeClass("inactive")
			},
			touchmove: function() {
				nav.controls.nextbtn.addClass("disabled"), nav.controls.prevbtn.addClass("disabled"), nav.myScroll && (nav.myScroll.destroy(), nav.myScroll = null, nav.obj.off("touchmove.overflowscroll"), nav.list.attr("style", ""), nav.items.first().css("padding", ""), nav.obj.addClass("only-touch"))
			},
			init: function() {
				return nav.obj.hasClass(nav.class) || nav.obj.addClass(nav.class), $("html").hasClass("mobile-device") && nav.obj.addClass("overthrow"), nav.controls.init(), nav.items.find("a").addClass("needsclick"), nav.maxLeft = nav.list.outerWidth() - nav.obj.width(), nav.myScroll = new IScroll(nav.obj[0], {
					mouseWheel: !0,
					scrollX: !0,
					scrollY: !1,
					click: !0
				}), nav.myScroll.on("scrollStart", function(e) {
					nav.scrollStart(e)
				}), nav.myScroll.on("scrollEnd", function(e) {
					nav.scrollEnd(e)
				}), nav.obj.on("touchmove.overflowscroll", function(e) {
					nav.touchmove(e)
				}), "function" == typeof $(window).smartresize ? $(window).smartresize(nav.refreshTabs) : $(window).on("resize", nav.refreshTabs), nav.refreshTabs(), nav
			}
		};
		if (!nav.obj.hasClass("overflowscroll-loaded")) return nav.init()
	};
!
function($, sr) {
	var debounce = function(func, threshold, execAsap) {
			var timeout;
			return function() {
				function delayed() {
					execAsap || func.apply(obj, args), timeout = null
				}
				var obj = this,
					args = arguments;
				timeout ? clearTimeout(timeout) : execAsap && func.apply(obj, args), timeout = setTimeout(delayed, threshold || 10)
			}
		};
	jQuery.fn[sr] = function(fn, threshold) {
		return fn ? this.bind("resize", debounce(fn, threshold)) : this.trigger(sr)
	}
}(jQuery, "smartresize"), function() {
	var withinViewport = function(elem, options) {
			var settings, useHtmlElem, isWithin, scrollOffset, elemOffset, arr, i, side, result = !1,
				metadata = {},
				config = {};
			if ("undefined" != typeof jQuery && elem instanceof jQuery && (elem = elem.get(0)), "object" != typeof elem || 1 !== elem.nodeType) throw new Error("First argument must be an element");
			for (elem.getAttribute("data-withinviewport-settings") && window.JSON && (metadata = JSON.parse(elem.getAttribute("data-withinviewport-settings"))), settings = "string" == typeof options ? {
				sides: options
			} : options || {}, config.container = settings.container || metadata.container || withinViewport.defaults.container || document.body, config.sides = settings.sides || metadata.sides || withinViewport.defaults.sides || "all", config.top = settings.top || metadata.top || withinViewport.defaults.top || 0, config.right = settings.right || metadata.right || withinViewport.defaults.right || 0, config.bottom = settings.bottom || metadata.bottom || withinViewport.defaults.bottom || 0, config.left = settings.left || metadata.left || withinViewport.defaults.left || 0, useHtmlElem = !/Chrome/.test(navigator.userAgent), isWithin = {
				top: function() {
					return elemOffset[1] + elem.offsetHeight >= scrollOffset[1] + config.top
				},
				right: function() {
					var container = config.container === document.body ? window : config.container;
					return elemOffset[0] + elem.offsetWidth <= container.innerWidth + scrollOffset[0] - config.right
				},
				bottom: function() {
					var container = config.container === document.body ? window : config.container;
					return elemOffset[1] + elem.offsetHeight <= scrollOffset[1] + container.innerHeight - config.bottom
				},
				left: function() {
					return elemOffset[0] >= scrollOffset[0] + config.left
				},
				all: function() {
					return isWithin.top() && isWithin.right() && isWithin.bottom() && isWithin.left()
				}
			}, scrollOffset = function() {
				var x = config.container.scrollLeft,
					y = config.container.scrollTop;
				return 0 === y && (y = config.container.pageYOffset ? config.container.pageYOffset : window.pageYOffset ? window.pageYOffset : config.container === document.body && useHtmlElem ? config.container.parentElement ? config.container.parentElement.scrollTop : 0 : config.container.parentElement ? config.container.parentElement.scrollTop : 0), 0 === x && (x = config.container.pageXOffset ? config.container.pageXOffset : window.pageXOffset ? window.pageXOffset : config.container === document.body ? config.container.parentElement ? config.container.parentElement.scrollLeft : 0 : config.container.parentElement ? config.container.parentElement.scrollLeft : 0), [x, y]
			}(), elemOffset = function() {
				for (var el = elem, _x = 0, _y = 0; el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop);) _x += el.offsetLeft, _y += el.offsetTop, el = el.offsetParent;
				return [_x, _y]
			}(), arr = config.sides.split(" "), i = arr.length; i--;) if (side = arr[i].toLowerCase(), /top|right|bottom|left|all/.test(side)) {
				if (!isWithin[side]()) {
					result = !1;
					break
				}
				result = !0
			}
			return result
		};
	withinViewport.prototype.defaults = {
		container: document.body,
		sides: "all",
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	}, withinViewport.defaults = withinViewport.prototype.defaults, window.withinViewport = withinViewport, withinViewport.prototype.top = function(element) {
		return withinViewport(element, "top")
	}, withinViewport.prototype.right = function(element) {
		return withinViewport(element, "right")
	}, withinViewport.prototype.bottom = function(element) {
		return withinViewport(element, "bottom")
	}, withinViewport.prototype.left = function(element) {
		return withinViewport(element, "left")
	}
}(), function() {
	jQuery.fn.autoHeightTransition = function(fn, fnAfter, specifiedHeight, useSwitch) {
		if (this.length) {
			var browserTransitions = "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd MSTransitionEnd transitionend",
				oldTransition = window.getComputedStyle(this[0]).transition,
				oldHeight = oldTransition.split(", ").filter(function(prop) {
					return 0 === prop.indexOf("height")
				})[0],
				resetHeightCss = "height 0s ease 0s",
				noHeightTransition = oldHeight ? oldTransition.replace(oldHeight, resetHeightCss) : resetHeightCss + ", " + oldTransition;
			this[0].style.transition = noHeightTransition;
			var curHeight = "none" != $(this).css("display") || useSwitch ? this.outerHeight() : 0,
				newHeight = 0;
			"function" == typeof fn && fn.call(this), isNaN(specifiedHeight) || "" === specifiedHeight || null === specifiedHeight ? (this.css("height", "auto"), newHeight = this.outerHeight()) : newHeight = specifiedHeight, $(this).css("height", curHeight + "px");
			var t = window.getComputedStyle(this[0]).maxHeight;
			return Function.prototype(t), $("html").hasClass("ie9") || curHeight == newHeight ? "function" == typeof fnAfter && setTimeout(fnAfter.bind(this), 10) : this.off(browserTransitions).on(browserTransitions, function(e) {
				if (this === e.originalEvent.target && "height" === e.originalEvent.propertyName) {
					$(this).off(browserTransitions), this.style.transition = noHeightTransition, t = window.getComputedStyle(this).transition, Function.prototype(t);
					var newMaxHeight = "";
					$(this).outerHeight() > 0 && (newMaxHeight = ""), $(this).css("height", newMaxHeight), "function" == typeof fnAfter && fnAfter.call(this), t = window.getComputedStyle(this).maxHeight, Function.prototype(t), this.style.transition = ""
				}
			}).data("new-height", ""), this[0].style.transition = "", t = window.getComputedStyle(this[0]).transition || window.getComputedStyle(this[0]).webkitTransitionProperty, Function.prototype(t), setTimeout(function() {
				this.css("height", newHeight).data("new-height", newHeight)
			}.bind(this), 1), this
		}
	}
}(jQuery), function($, window, document, undefined) {
	var configSizes = ICA.config.pageBaseSizes;
	window.checkSize || (window.checkSize = function(expr) {
		if (this[0] == window || this == window) {
			expr = expr ? expr : "";
			var sizeQuery = validateExpression(expr);
			return sizeQuery ? matchSize(expr, sizeQuery) : expr ? void 0 : getSize("")
		}
	}, "undefined" != typeof $ && "function" != typeof $.fn.checkSize && ($.fn.checkSize = window.checkSize)), window.getGridSize || (window.getGridSize = function() {
		if (this[0] == window || this == window) return getSize("grid")
	}, "undefined" != typeof $ && "function" != typeof $.fn.getGridSize && ($.fn.getGridSize = window.getGridSize)), window.getDeviceSize || (window.getDeviceSize = function() {
		if (this[0] == window || this == window) return getSize("device")
	}, "undefined" != typeof $ && "function" != typeof $.fn.getDeviceSize && ($.fn.getDeviceSize = window.getDeviceSize));
	var validateExpression = function(expr) {
			if (expr !== undefined && "" !== expr) {
				var sizeQuery = expr.match(/^\s*(?!={2})([<>=][=]?)?\s*?\b([a-zA-Z]*){1}\s*?$/);
				return "undefined" != typeof sizeQuery && sizeQuery
			}
		},
		matchSize = function(expr, sQuery) {
			var width = getWidth(),
				operator = sQuery[1],
				size = sQuery[2],
				sizeMatch = "undefined" != typeof configSizes[size] ? configSizes[size] : null;
			return null !== sizeMatch && (operator = "undefined" == typeof operator ? "=" : operator, checkPageSize[operator](width, sizeMatch.min, sizeMatch.max))
		},
		getSize = function(type) {
			type = type === undefined ? "" : type;
			var width = getWidth(),
				matchedSizes = [];
			for (var key in configSizes) if (configSizes.hasOwnProperty(key)) {
				var size = configSizes[key];
				"undefined" != typeof size.min && "undefined" != typeof size.max && (!checkPageSize["="](width, size.min, size.max) || type != size.type && "" !== type || matchedSizes.push(key))
			}
			return matchedSizes.length > 0 ? matchedSizes : ""
		},
		checkPageSize = {
			"=": function(w, min, max) {
				return (null === min || w >= min) && (null === max || w <= max)
			},
			">": function(w, min, max) {
				return null !== max && w > max
			},
			">=": function(w, min, max) {
				return null === min || w >= min
			},
			"<": function(w, min, max) {
				return null !== min && w < min
			},
			"<=": function(w, min, max) {
				return null === max || w <= max
			}
		},
		getWidth = function() {
			return self.innerWidth ? self.innerWidth : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientWidth : document.body ? document.body.clientWidth : 0
		}
}(jQuery, this, this.document), function() {
	jQuery.fn.attachTo = function(stickyEl, args) {
		var opts = $.extend({
			trigger: "resize.attachto",
			triggerElement: window,
			followVisibility: !0,
			halign: "left",
			repositionOnResize: !0
		}, args),
			$el = $(this),
			$stickyEl = $(stickyEl),
			reposition = function() {
				if (0 != opts.repositionOnResize) {
					var halignOffsetCompensation = 0;
					"right" == opts.halign ? halignOffsetCompensation = $stickyEl.outerWidth() - $el.outerWidth() : "center" == opts.halign && (halignOffsetCompensation = ($stickyEl.outerWidth() - $el.outerWidth()) / 2);
					var wantedPos = {
						left: $stickyEl.offset().left + halignOffsetCompensation,
						top: $stickyEl.offset().top + $stickyEl.outerHeight()
					},
						zeroPos = getAbsoluteZeroPos($el);
					$el.css({
						position: "absolute",
						top: wantedPos.top - zeroPos.top + "px",
						left: wantedPos.left - zeroPos.left + "px"
					})
				}
			},
			getAbsoluteZeroPos = function($el) {
				if ("undefined" != typeof $el.data("zeroPos")) return $el.data("zeroPos");
				var originalSettings = {
					position: $el.css("position"),
					top: $el.css("top"),
					left: $el.css("left"),
					transition: $el.css("transition")
				};
				$el.css({
					position: "absolute",
					top: "0px",
					left: "0px",
					transition: "none"
				}), getComputedStyle($el[0]).top;
				var pos = $el.offset();
				return $el.css({
					position: originalSettings.position,
					top: originalSettings.top,
					left: originalSettings.left,
					transition: originalSettings.transition
				}), getComputedStyle($el[0]).top, $el.data("zeroPos", pos), pos
			};
		$(opts.triggerElement).off(opts.trigger).on(opts.trigger, reposition).trigger(opts.trigger), $el.on("detach", function() {
			$el.css({
				position: "",
				top: "",
				left: "",
				transition: ""
			}), opts.repositionOnResize = !1
		}), $el.on("reattach", function() {
			opts.repositionOnResize = !0, reposition()
		})
	}
}(jQuery), !
function(a, b) {
	"use strict";
	var c, d;
	if (a.uaMatch = function(a) {
		a = a.toLowerCase();
		var b = /(opr)[\/]([\w.]+)/.exec(a) || /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [],
			c = /(ipad)/.exec(a) || /(iphone)/.exec(a) || /(android)/.exec(a) || /(windows phone)/.exec(a) || /(win)/.exec(a) || /(mac)/.exec(a) || /(linux)/.exec(a) || /(cros)/.exec(a) || [];
		return {
			browser: b[3] || b[1] || "",
			version: b[4] || b[2],
			versionNumber: b[2] || "0",
			platform: c[0] || ""
		}
	}, c = a.uaMatch(b.navigator.userAgent), d = {}, c.browser && (d[c.browser] = !0, d.version = c.version, d.versionNumber = parseInt(c.versionNumber)), c.platform && (d[c.platform] = !0), (d.android || d.ipad || d.iphone || d["windows phone"]) && (d.mobile = !0), (d.cros || d.mac || d.linux || d.win) && (d.desktop = !0), (d.chrome || d.opr || d.safari) && (d.webkit = !0), d.rv) {
		var e = "msie";
		c.browser = e, d[e] = !0
	}
	if (d.opr) {
		var f = "opera";
		c.browser = f, d[f] = !0
	}
	if (d.safari && d.android) {
		var g = "android";
		c.browser = g, d[g] = !0
	}
	d.name = c.browser, d.platform = c.platform, a.browser = d
}(jQuery, window), !
function(a) {
	"function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
}(function(a) {
	function b(b) {
		var g = b || window.event,
			h = i.call(arguments, 1),
			j = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0;
		if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
			if (1 === g.deltaMode) {
				var q = a.data(this, "mousewheel-line-height");
				j *= q, m *= q, l *= q
			} else if (2 === g.deltaMode) {
				var r = a.data(this, "mousewheel-page-height");
				j *= r, m *= r, l *= r
			}
			if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
				var s = this.getBoundingClientRect();
				o = b.clientX - s.left, p = b.clientY - s.top
			}
			return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h)
		}
	}
	function c() {
		f = null
	}
	function d(a, b) {
		return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
	}
	var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
		h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
		i = Array.prototype.slice;
	if (a.event.fixHooks) for (var j = g.length; j;) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
	var k = a.event.special.mousewheel = {
		version: "3.1.12",
		setup: function() {
			if (this.addEventListener) for (var c = h.length; c;) this.addEventListener(h[--c], b, !1);
			else this.onmousewheel = b;
			a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this))
		},
		teardown: function() {
			if (this.removeEventListener) for (var c = h.length; c;) this.removeEventListener(h[--c], b, !1);
			else this.onmousewheel = null;
			a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height")
		},
		getLineHeight: function(b) {
			var c = a(b),
				d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
			return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
		},
		getPageHeight: function(b) {
			return a(b).height()
		},
		settings: {
			adjustOldDeltas: !0,
			normalizeOffset: !0
		}
	};
	a.fn.extend({
		mousewheel: function(a) {
			return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
		},
		unmousewheel: function(a) {
			return this.unbind("mousewheel", a)
		}
	})
}), !
function(a) {
	"function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof module && module.exports ? require("jquery") : jQuery)
}(function(a) {
	function b(b) {
		var c = {},
			d = /^jQuery\d+$/;
		return a.each(b.attributes, function(a, b) {
			b.specified && !d.test(b.name) && (c[b.name] = b.value)
		}), c
	}
	function c(b, c) {
		var d = this,
			f = a(d);
		if (d.value == f.attr("placeholder") && f.hasClass(m.customClass)) if (f.data("placeholder-password")) {
			if (f = f.hide().nextAll('input[type="password"]:first').show().attr("id", f.removeAttr("id").data("placeholder-id")), b === !0) return f[0].value = c;
			f.focus()
		} else d.value = "", f.removeClass(m.customClass), d == e() && d.select()
	}
	function d() {
		var d, e = this,
			f = a(e),
			g = this.id;
		if ("" === e.value) {
			if ("password" === e.type) {
				if (!f.data("placeholder-textinput")) {
					try {
						d = f.clone().attr({
							type: "text"
						})
					} catch (h) {
						d = a("<input>").attr(a.extend(b(this), {
							type: "text"
						}))
					}
					d.removeAttr("name").data({
						"placeholder-password": f,
						"placeholder-id": g
					}).bind("focus.placeholder", c), f.data({
						"placeholder-textinput": d,
						"placeholder-id": g
					}).before(d)
				}
				f = f.removeAttr("id").hide().prevAll('input[type="text"]:first').attr("id", g).show()
			}
			f.addClass(m.customClass), f[0].value = f.attr("placeholder")
		} else f.removeClass(m.customClass)
	}
	function e() {
		try {
			return document.activeElement
		} catch (a) {}
	}
	var f, g, h = "[object OperaMini]" == Object.prototype.toString.call(window.operamini),
		i = "placeholder" in document.createElement("input") && !h,
		j = "placeholder" in document.createElement("textarea") && !h,
		k = a.valHooks,
		l = a.propHooks;
	if (i && j) g = a.fn.placeholder = function() {
		return this
	}, g.input = g.textarea = !0;
	else {
		var m = {};
		g = a.fn.placeholder = function(b) {
			var e = {
				customClass: "placeholder"
			};
			m = a.extend({}, e, b);
			var f = this;
			return f.filter((i ? "textarea" : ":input") + "[placeholder]").not("." + m.customClass).bind({
				"focus.placeholder": c,
				"blur.placeholder": d
			}).data("placeholder-enabled", !0).trigger("blur.placeholder"), f
		}, g.input = i, g.textarea = j, f = {
			get: function(b) {
				var c = a(b),
					d = c.data("placeholder-password");
				return d ? d[0].value : c.data("placeholder-enabled") && c.hasClass(m.customClass) ? "" : b.value
			},
			set: function(b, f) {
				var g = a(b),
					h = g.data("placeholder-password");
				return h ? h[0].value = f : g.data("placeholder-enabled") ? ("" === f ? (b.value = f, b != e() && d.call(b)) : g.hasClass(m.customClass) ? c.call(b, !0, f) || (b.value = f) : b.value = f, g) : b.value = f
			}
		}, i || (k.input = f, l.value = f), j || (k.textarea = f, l.value = f), a(function() {
			a(document).delegate("form", "submit.placeholder", function() {
				var b = a("." + m.customClass, this).each(c);
				setTimeout(function() {
					b.each(d)
				}, 10)
			})
		}), a(window).bind("beforeunload.placeholder", function() {
			a("." + m.customClass).each(function() {
				this.value = ""
			})
		})
	}
});
var ICA = ICA || {};
!
function($, window, document, ICA, undefined) {
	ICA.globalNav = function() {
		function _globalNav() {
			var context = ($(document), this),
				mainNavWrapperSelector = ".nav-main",
				subNavWrapperSelector = ".nav-sub",
				thirdNavWrapperSelector = ".nav-third",
				searchBoxSelector = ".nav-search",
				navSelector = "> .nav",
				itemSelector = ".item",
				searchItemSelector = itemSelector + ".search",
				searchButtonSelector = searchItemSelector + "> .search-icon",
				cancelButtonSelector = searchItemSelector + "> .mobile-search-close-button",
				logoutItemSelector = itemSelector + ".logout",
				loginItemSelector = itemSelector + ".login",
				logoItemSelector = itemSelector + ".logo",
				$subMenuButton = $(".js-chosen-sub-item-click"),
				$myICAButton = null,
				globalNavSelector = "#globalnav",
				animationTime = 150,
				$subNavigationContainer = $(".nav-inner"),
				$mdsaLandingPageName = $("#mdsaLandingPageName"),
				storeNewBhsIsActivated = $("#storeNewBhsIsActivated") && "True" === $("#storeNewBhsIsActivated").val();
			overflowNav = {
				collapsedNav: "",
				collapsedNavSelector: ".nav-collapsed",
				skipSelector: ".no-collapse",
				activeSelector: ".active",
				showMoreSelector: ".show-collapsed"
			}, context.$globalNav = $(globalNavSelector), context.$mainNav = context.$globalNav.find(mainNavWrapperSelector), context.$subNav = context.$globalNav.find(subNavWrapperSelector), context.$thirdNav = context.$globalNav.find(thirdNavWrapperSelector), context.$searchBox = context.$globalNav.find(searchBoxSelector), context.$searchItem = context.$globalNav.find(searchItemSelector), $("#page-wrapper").addClass("clear"), context.init = function() {
				context.$globalNav[0] && (checkAndSelectSubMenuItem(), overflowNav.collapsedNav = $(overflowNav.collapsedNavSelector, context.$globalNav), $myICAButton = context.$globalNav.find(".item.myica"), context.$subNav[0] && context.$subNav.children().length > 0 && (context.$subNav.create(overflowScroll), ICA.fn.isMobileDevice() || context.$subNav.removeClass("overthrow")), context.$thirdNav[0] && (context.$thirdNav.children().length > 0 ? (context.$thirdNav.create(overflowScroll), ICA.fn.isMobileDevice() || context.$thirdNav.removeClass("overthrow")) : (context.$thirdNav.remove(), context.$thirdNav = "")), context.$thirdNav[0] && context.$thirdNav.children().length > 0 && !$("form").eq(0).hasClass("store") && context.$subNav[0] && context.$subNav.addClass("desktop-collapse"), $subNavigationContainer[0] && $subNavigationContainer.children.length > 0 && ($subNavigationContainer.create(overflowScroll), ICA.fn.isMobileDevice() || $subNavigationContainer.removeClass("overthrow")), storeNewBhsIsActivated && initLastVisitedStoreTab(), initAttachEvents(), collapseOverflowItems(), ICA.globalNav && ICA.globalNav.quickSearch && (!$("#aspnetForm").is(".store") || storeNewBhsIsActivated) && ICA.globalNav.quickSearch.init(), context.$mainNav.addClass("loaded"))
			}, context.hideMobileSearchBox = function() {
				hideSearchBox()
			}, context.isMobileSearchActive = function() {
				return context.$mainNav.find(searchItemSelector).hasClass("mobile-search-active")
			};
			var initLastVisitedStoreTab = function() {
					if (Modernizr.localstorage) {
						var isStorePage = $(".store-top-container")[0];
						isStorePage ? saveCurrentStore() : appendLastVisitedStoreTab()
					}
				},
				saveCurrentStore = function() {
					if (Modernizr.localstorage) {
						var store = {
							url: location.href,
							name: $(".store-page__real-store-name").val()
						};
						localStorage.setItem("lastVisitedStore", JSON.stringify(store))
					}
				},
				appendLastVisitedStoreTab = function() {
					if (Modernizr.localstorage) {
						var lastStore = localStorage.getItem("lastVisitedStore");
						if (null !== lastStore) {
							lastStore = JSON.parse(lastStore);
							var $mainNav = $(".globalnav > .nav-main > .nav"),
								$collapsedNav = $(".globalnav .nav-collapsed > .nav"),
								$link = $("<a>", {
									href: lastStore.url
								}).text(lastStore.name),
								$closeButton = $("<span>").addClass("close-button sprite2").appendTo($link),
								$lastStoreNavElement = $("<li>").addClass("item last-visited-store").append($link).appendTo($mainNav),
								$lastStoreCollapsedNavElement = $lastStoreNavElement.clone().addClass("hidden").appendTo($collapsedNav),
								findCollapsibleCloseButton = $collapsedNav.find(".close-button");
							$closeButton.add(findCollapsibleCloseButton).on("click", function(e) {
								e.preventDefault(), $lastStoreNavElement.remove(), $lastStoreCollapsedNavElement.remove(), Modernizr.localstorage && localStorage.removeItem("lastVisitedStore")
							})
						}
					}
				},
				initClickTracking = function() {
					$("#page").hasClass("start-page-icase") && (context.$mainNav.find(itemSelector).not(".no-collapse").not(".logo").on("mousedown", function() {
						icadatalayer.add("startsideelement", {
							element: "Flikar",
							action: "Title: " + $(this).find("a").text().trim() + ", Destination: " + $(this).find("a").attr("href")
						})
					}), context.$mainNav.find(".logo").on("mousedown", function() {
						icadatalayer.add("startsideelement", {
							element: "Flikar",
							action: " Title: Logo, Destination: " + $(this).find("a").attr("href")
						})
					}), context.$mainNav.find(".myica").on("mousedown", function() {
						icadatalayer.add("startsideelement", {
							action: "Klick",
							element: "Mitt ICA"
						})
					}), context.$mainNav.find(".login").on("mousedown", function() {
						icadatalayer.add("startsideelement", {
							element: "Flikar",
							action: "Title: " + $(this).find("a").text().trim() + ", Destination: " + $(this).find("a").attr("href")
						})
					}), context.$searchBox.on("click", function() {
						icadatalayer.add("startsideelement", {
							action: "Klick i globalsökfältet",
							element: "Globalsök"
						})
					}), context.$subNav.find(itemSelector).on("mousedown", function() {
						icadatalayer.add("startsideelement", {
							element: "Undermeny",
							action: "Title: " + $(this).find("a").text().trim() + ", Destination: " + $(this).find("a").attr("href")
						})
					}))
				},
				initAttachEvents = function() {
					$(window).smartresize(function() {
						collapseOverflowItems(), setSubMenuPosition()
					}).resize();
					var orientationchangeevent = $("html").is(".android") ? "resize.navigation" : "orientationchange.navigation";
					$(window).on(orientationchangeevent, function(e) {
						$(window).checkSize("desktop") && context.isMobileSearchActive() ? hideSearchBox(e) : $(window).checkSize("<=tablet") && context.$searchBox.is(":focus") && !context.isMobileSearchActive() ? showSearchBox(e) : context.isMobileSearchActive() && showSearchBox(e, !0)
					}), $(".nav-next, .nav-next", context.$thirdNav).on("click.close", closeSubMenu), $subMenuButton[0] && $subMenuButton.on("click.toggle", toggleSubMenu), $(overflowNav.showMoreSelector, context.$mainNav).on("click.toggle", toggleCollapsedMenu), $("body").on("mouseup.closeSubMenu touchend.closeSubMenu", function(e) {
						$(e.target) != context.$subNav && 0 === $(e.target).parents(context.$subNav.selector).length && $(e.target) != $subMenuButton && 0 === $(e.target).parents($subMenuButton.selector).length && closeSubMenu(e)
					}), context.$searchBox.on("focus keyup", function() {
						context.$searchBox.parent().toggleClass("clearable", !! context.$searchBox.val())
					}), context.$searchBox.siblings(".icon--clear-search").on("click", function() {
						context.$searchBox.val(""), setTimeout(function() {
							context.$searchBox.focus()
						}, 10)
					}), $myICAButton.on("click", ICA.dashboard.toggle), context.$searchBox.on("focus", function(e) {
						$(window).checkSize("<=tablet") && !context.isMobileSearchActive() && showSearchBox(e)
					}), $(searchButtonSelector + ", " + cancelButtonSelector, context.$mainNav).on("click", hideSearchBox), initClickTracking()
				},
				collapseOverflowItems = function() {
					if (!context.isMobileSearchActive()) {
						var $leftLimitItem = $(window).checkSize("small") ? $(searchItemSelector, context.$mainNav) : $(overflowNav.skipSelector, context.$mainNav).not(overflowNav.showMoreSelector).last(),
							index = 0,
							collection = $(navSelector + " " + itemSelector, context.$mainNav).not(overflowNav.skipSelector),
							overflowCollection = overflowNav.collapsedNav.find(itemSelector),
							showMoreItem = $(overflowNav.showMoreSelector, context.$mainNav),
							safeGuardMargin = 1,
							leftLimit = $leftLimitItem[0] ? $leftLimitItem.offset().left - showMoreItem.outerWidth() - safeGuardMargin : 0,
							itemDefaultTopOffset = ($(window).width(), $(logoItemSelector)[0] ? $(logoItemSelector).offset().top : 0);
						if (collection.removeClass("collapsed"), overflowCollection.addClass("hidden"), showMoreItem.addClass("hidden"), collection.reverse(!0).each(function(i) {
							var $item = $(this),
								itemRightBorder = $item.offset().left + $item.outerWidth(!0),
								itemTopOffset = $item.offset().top,
								_leftLimit = 0 == i ? leftLimit + showMoreItem.outerWidth() : leftLimit;
							if (itemRightBorder < _leftLimit && itemTopOffset == itemDefaultTopOffset) return index = collection.length - 1 - i, !1
						}), index < collection.length - 1) {
							showMoreItem.removeClass("hidden"), collection.filter(":gt(" + index + ")").addClass("collapsed"), overflowCollection.filter(":gt(" + index + ")").removeClass("hidden");
							var center = showMoreItem.offset().left + showMoreItem.outerWidth() / 2,
								left = center - overflowNav.collapsedNav.outerWidth() / 2,
								top = showMoreItem.position().top + showMoreItem.outerHeight() - showMoreItem.outerHeight() / 10;
							overflowNav.collapsedNav.css({
								left: left,
								top: top
							})
						} else closeCollapsedMenu()
					}
				},
				toggleCollapsedMenu = function(e) {
					overflowNav.collapsedNav.is(":visible") ? closeCollapsedMenu() : showCollapsedMenu()
				},
				closeCollapsedMenu = function() {
					$(overflowNav.showMoreSelector, context.$mainNav).removeClass("active"), overflowNav.collapsedNav.removeClass("open")
				},
				showCollapsedMenu = function() {
					$(overflowNav.showMoreSelector, context.$mainNav).addClass("active"), overflowNav.collapsedNav.addClass("open")
				},
				toggleSubMenu = function(e) {
					context.$subNav.is(":visible") ? closeSubMenu(e) : showSubMenu(e)
				},
				closeSubMenu = function(e) {
					context.$subNav.removeClass("open"), $subMenuButton.removeClass("open")
				},
				showSubMenu = function(e) {
					context.$subNav.addClass("open"), $subMenuButton.addClass("open"), setSubMenuPosition(e)
				},
				setSubMenuPosition = function() {
					if ($subMenuButton[0] && $subMenuButton.hasClass("open")) {
						var left = $subMenuButton.offset().left,
							top = $subMenuButton.position().top + context.$mainNav.height() + $subMenuButton.outerHeight() + $subMenuButton.outerHeight() / 10;
						context.$subNav.css({
							left: left,
							top: top
						})
					}
				},
				showSearchBox = function(e, transitionsDisabled) {
					closeCollapsedMenu();
					var wWidth = $(window).width(),
						$searchItem = context.$mainNav.find(searchItemSelector),
						$navUl = context.$mainNav.find(navSelector),
						_siWidth = $searchItem.width(),
						navHeight = $navUl.height(),
						dashboardActive = context.$globalNav.hasClass("dashboard-active"),
						allowSlideForGlobalMenu = !dashboardActive && $(window).checkSize("small") && context.$globalNav.hasClass("logged-in"),
						isStore = $("#aspnetForm").hasClass("store"),
						currentAnimationtime = transitionsDisabled ? 0 : animationTime;
					$navUl.css({
						transition: ""
					}), context.$subNav[0] && context.$subNav.is(":visible") && !isStore && context.$subNav.slideUp(animationTime), context.$thirdNav[0] && context.$thirdNav.is(":visible") && !isStore && context.$thirdNav.slideUp(animationTime), $(window).checkSize("> small") && ($myICAButton.fadeOut(), $(logoutItemSelector).fadeOut()), $(loginItemSelector).fadeOut(animationTime), $(searchButtonSelector).fadeOut(animationTime), setTimeout(function() {
						var _globalNavHeight = context.$globalNav.height();
						context.$globalNav.css({
							overflow: "hidden",
							height: _globalNavHeight
						}), window.getComputedStyle(context.$globalNav[0]).height, allowSlideForGlobalMenu && (context.$mainNav.css({
							position: "absolute",
							top: 0,
							width: "100%"
						}), window.getComputedStyle(context.$mainNav[0]).top, context.$mainNav.css({
							top: -1 * (navHeight / 2),
							height: navHeight
						}), context.$globalNav.height(navHeight / 2).data("original-height", _globalNavHeight));
						var customAnimationTime = allowSlideForGlobalMenu ? currentAnimationtime : 0;
						setTimeout(function() {
							$navUl.width($navUl.width()), window.getComputedStyle($navUl[0]).width, $navUl.css({
								"-webkit-transform": "translateX(-" + wWidth + "px)",
								"-moz-transform": "translateX(-" + wWidth + "px)",
								transform: "translateX(-" + wWidth + "px)",
								transition: transitionsDisabled ? "none" : "",
								width: 2 * wWidth
							}), $searchItem.width(_siWidth).data("original-width", _siWidth), $searchItem.width(wWidth), context.$mainNav.find(searchItemSelector).addClass("mobile-search-active"), context.$searchBox.is(":focus") || setTimeout(function() {
								context.$searchBox.focus()
							}, currentAnimationtime + animationTime), setTimeout(function() {
								context.$mainNav.find(searchItemSelector).addClass("mobile-search-animation-done"), ICA.globalNav.quickSearch.$quickSearchContainer[0] && ICA.globalNav.quickSearch.$quickSearchContainer.is(":visible") && ICA.globalNav.quickSearch.$quickSearchContainer.attachTo(context.$searchBox, {
									halign: "left"
								}), $("html").hasClass("touch-device") && (context.$searchBox.val(context.$searchBox.val()), context.$searchBox.focus()), transitionsDisabled && $(window).scrollTop(0)
							}, currentAnimationtime + animationTime), context.$searchBox.val(context.$searchBox.val())
						}, customAnimationTime)
					}, currentAnimationtime)
				},
				hideSearchBox = function() {
					context.$searchBox.blur();
					var wWidth = $(window).width(),
						$searchItem = context.$mainNav.find(searchItemSelector),
						$navUl = context.$mainNav.find(navSelector),
						dashboardActive = ($navUl.height(), context.$globalNav.hasClass("dashboard-active")),
						allowSlideForGlobalMenu = !dashboardActive && $(window).checkSize("small") && context.$globalNav.hasClass("logged-in"),
						isStore = $("#aspnetForm").hasClass("store");
					$navUl.css({
						"-webkit-transform": "",
						"-moz-transform": "",
						transform: ""
					}), setTimeout(function() {
						context.$mainNav.find(searchItemSelector).removeClass("mobile-search-active mobile-search-animation-done"), $searchItem.width($searchItem.data("original-width")), allowSlideForGlobalMenu ? (context.$mainNav.css({
							top: "0",
							height: ""
						}), context.$globalNav.height(context.$globalNav.data("original-height")), setTimeout(function() {
							context.$mainNav.css({
								top: "",
								position: "",
								width: ""
							}), context.$globalNav.css({
								height: "",
								overflow: ""
							})
						}, animationTime)) : setTimeout(function() {
							context.$globalNav.css({
								height: "",
								overflow: ""
							})
						}, animationTime), $navUl.css({
							width: wWidth
						}), window.getComputedStyle($navUl[0]), $navUl.css({
							width: ""
						});
						var customAnimationTime = allowSlideForGlobalMenu ? animationTime : 0;
						setTimeout(function() {
							$searchItem.width(""), !context.$subNav[0] || context.$subNav.is(":visible") || isStore || !$(window).checkSize(">= tablet") && context.$thirdNav[0] || context.$subNav.slideDown(animationTime), !context.$thirdNav[0] || context.$thirdNav.is(":visible") || isStore || context.$thirdNav.slideDown(animationTime), $(window).checkSize("> small") && ($myICAButton.fadeIn(animationTime, function() {
								$(this).css("display", "")
							}), $(logoutItemSelector).fadeIn(animationTime, function() {
								$(this).css("display", "")
							})), $(loginItemSelector).fadeIn(animationTime, function() {
								$(this).css("display", "")
							}), $(searchButtonSelector).fadeIn(animationTime, function() {
								$(this).css("display", "")
							}), context.$mainNav.find(searchItemSelector).removeClass("mobile-search-active mobile-search-animation-done")
						}, customAnimationTime)
					}, animationTime)
				},
				checkAndSelectSubMenuItem = function() {
					if ($mdsaLandingPageName.length && context.$subNav[0]) {
						var parentMdsaMenuItem = context.$subNav.find('li > a:contains("' + $mdsaLandingPageName.val() + '")');
						parentMdsaMenuItem.length ? parentMdsaMenuItem.parent().addClass("active") : context.$thirdNav[0] && (parentMdsaMenuItem = context.$thirdNav.find('li > a:contains("' + $mdsaLandingPageName.val() + '")'), parentMdsaMenuItem.length && parentMdsaMenuItem.parent().addClass("active"))
					}
				}
		}
		return new _globalNav
	}()
}(jQuery, this, this.document, ICA), $(function() {
	ICA.subModules || ICA.globalNav.init($("#globalnav"))
});
var ICA = ICA || {};
!
function($, window, document, ICA, undefined) {
	ICA.globalNav.quickSearch = function() {
		function _navQuickSearch() {
			var context = ($(document), this),
				searchBoxSelector = ".nav-search",
				itemSelector = ".item",
				searchItemSelector = itemSelector + ".search",
				animationTime = 150,
				quickSearchTimer = null,
				quickSearchWaitForInputTime = 750,
				quickSearchContainerSelector = ".quick-search-container",
				suggestionsSelector = ".quick-search-suggestions",
				resultsSelector = ".quick-search-results",
				activeClass = "active-qr",
				quickSearchResults = {
					$suggestions: $(),
					results: $()
				},
				quickresults_xhr = null,
				autocomplete_xhr = null,
				isGlobalSearchPage = $(".page.global-search-page").length > 0,
				keyCodes = {
					DOWN: 40,
					UP: 38,
					PAGE_DOWN: 34,
					PAGE_UP: 33,
					TAB: 9,
					ENTER: 13,
					ESCAPE: 27
				};
			context.$searchBox = ICA.globalNav.$globalNav.find(searchBoxSelector), context.$quickSearchContainer = $(quickSearchContainerSelector), context.previousSearches = [], context.init = function() {
				if (ICA.globalNav.$globalNav[0] && context.$searchBox[0]) {
					if (!context.$quickSearchContainer[0]) {
						var resultsTemplate = '<div class="quick-search-container"><div class="quick-search-suggestions" data-history-title="Tidigare sökningar"></div><div class="quick-search-results"></div></div>';
						context.$quickSearchContainer = $(resultsTemplate).appendTo($("body"))
					}
					if (context.$suggestions = context.$quickSearchContainer.find(suggestionsSelector), context.$results = context.$quickSearchContainer.find(resultsSelector), context.$quickSearchContainer.attachTo(context.$searchBox, {
						halign: "left"
					}), initAttachEvents(), Modernizr.localstorage) {
						var tempHistory = localStorage.getItem("searchHistory");
						tempHistory ? context.previousSearches = tempHistory.split(",") : context.previousSearches = []
					}
					return context
				}
			};
			var initAttachEvents = function() {
					$(window).on("orientationchange.quicksearch resize.quicksearch", function() {
						var wWidth = $(window).width();
						wWidth < 480 && !context.$quickSearchContainer.is(".fillscreen") ? context.$quickSearchContainer.addClass("fillscreen").trigger("detach") : wWidth >= 480 && context.$quickSearchContainer.is(".fillscreen") ? context.$quickSearchContainer.removeClass("fillscreen").trigger("reattach") : wWidth <= 980 && context.$searchBox.is(":hidden") && context.$quickSearchContainer.removeClass("active")
					}), context.$searchBox.on("keydown.quicksearch", queryChangeHandler.bind(this)), context.$searchBox.on("focus.quicksearch", execQuickSearch.bind(this, !0)), context.$searchBox.on("mouseup.quicksearch", function() {
						setTimeout(function() {
							"" === $(this).val().trim() && showSearchHistory()
						}.bind(this), 10)
					}), context.$searchBox.on("submit", function() {
						isGlobalSearchPage && (context.hideQuickSearchContainer(), ICA.globalNav.isMobileSearchActive() && ICA.globalNav.hideMobileSearchBox())
					}), context.$suggestions.on("click.suggestions", ".suggestion", function() {
						isGlobalSearchPage && context.hideQuickSearchContainer();
						var chosenSuggestion = $(this).text();
						context.$searchBox.val(chosenSuggestion), setTimeout(function() {
							context.$searchBox.trigger("submit"), isGlobalSearchPage && ICA.globalNav.isMobileSearchActive() && ICA.globalNav.hideMobileSearchBox()
						}.bind(this), 10)
					});
					var searchUrl = ICA.globalNav.$searchBox.closest("fieldset").data("url");
					searchUrl === window.location.pathname && context.$results.on("click", "> a", function() {
						context.hideQuickSearchContainer(), isGlobalSearchPage && ICA.globalNav.isMobileSearchActive() && ICA.globalNav.hideMobileSearchBox()
					}.bind(this))
				},
				showSearchHistory = function() {
					if (context.previousSearches.length > 0) {
						var tpl = '<div class="suggestion">##val##</div>',
							tmpSearches = context.previousSearches.slice(0),
							html = tmpSearches.reverse().map(function(obj, ind) {
								if (!(ind > 4) && "" !== obj) return obj = String(obj).replace(/(&amp;)/g, "&").replace(/(&lt;)/g, "<").replace(/(&gt;)/g, ">").replace(/(&quot;)/g, '"'), obj = String(obj).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), tpl.replace("##val##", obj)
							});
						"" !== html.join("") ? (context.$suggestions.html(html.join("")).addClass("historicalSearch"), renderQuickSearchResult("")) : (context.$suggestions.removeClass("historicalSearch"), context.hideQuickSearchContainer())
					} else context.$suggestions.removeClass("historicalSearch"), context.hideQuickSearchContainer()
				},
				queryChangeHandler = function(e) {
					switch (e.keyCode) {
					case keyCodes.DOWN:
					case keyCodes.PAGE_DOWN:
						return e.preventDefault(), void navDown();
					case keyCodes.UP:
					case keyCodes.PAGE_UP:
						return e.preventDefault(), void navUp();
					case keyCodes.ENTER:
						clearTimeout(quickSearchTimer);
						var combinedResults = quickSearchResults.$suggestions.add(quickSearchResults.$results),
							$activeResult = combinedResults.filter("." + activeClass);
						return void($activeResult.length ? $activeResult.closest(suggestionsSelector).length ? (context.hideQuickSearchContainer(), context.$searchBox.val($activeResult.text()).trigger("submit")) : $activeResult.is("a") && (window.location = $activeResult.attr("href")) : (context.hideQuickSearchContainer(), context.$searchBox.trigger("submit")))
					}
					return clearTimeout(quickSearchTimer), quickSearchTimer = setTimeout(execQuickSearch, quickSearchWaitForInputTime), !0
				},
				navDown = function() {
					var combinedResults = quickSearchResults.$suggestions.add(quickSearchResults.$results),
						nrOfResults = combinedResults.length,
						$activeResult = combinedResults.filter("." + activeClass),
						$nextResult = 1 === nrOfResults ? combinedResults.eq(0) : [];
					if (1 !== $nextResult.length) if ($activeResult[0]) {
						var activeIndex = combinedResults.index($activeResult);
						$activeResult.removeClass(activeClass), $nextResult = activeIndex >= nrOfResults - 1 ? combinedResults.eq(0) : combinedResults.eq(activeIndex + 1)
					} else $nextResult = combinedResults.eq(0);
					return $nextResult.addClass(activeClass), !1
				},
				navUp = function() {
					var combinedResults = quickSearchResults.$suggestions.add(quickSearchResults.$results),
						nrOfResults = combinedResults.length,
						$activeResult = combinedResults.filter("." + activeClass),
						$nextResult = 1 === nrOfResults ? combinedResults.eq(0) : [];
					if (1 !== $nextResult.length) if ($activeResult[0]) {
						var activeIndex = combinedResults.index($activeResult);
						$activeResult.removeClass(activeClass), $nextResult = 0 === activeIndex ? combinedResults.eq(nrOfResults - 1) : combinedResults.eq(activeIndex - 1)
					} else $nextResult = combinedResults.eq(nrOfResults - 1);
					return $nextResult.addClass(activeClass), !1
				},
				execQuickSearch = function(fromFocusEvent) {
					if ($(window).checkSize("<=tablet") && !$(searchItemSelector).hasClass("mobile-search-animation-done")) return void setTimeout(function() {
						execQuickSearch(fromFocusEvent)
					}, animationTime);
					setTimeout(function() {
						context.$quickSearchContainer.attachTo(context.$searchBox, {
							halign: "left"
						})
					}, 10);
					var query = context.$searchBox.val().trim(),
						lastQuery = context.$searchBox.data("lastquery");
					if (query !== lastQuery || !context.$quickSearchContainer.is(".active")) {
						if (query.length < 3 || fromFocusEvent && context.$searchBox.attr("placeholder") === query) return void showSearchHistory();
						context.$searchBox.data("lastquery", query);
						var autocache = Modernizr.sessionStorage ? sessionStorage.getItem("cachedQuickSearchAuto_" + query.toLowerCase()) : null;
						if (null !== autocache ? renderAutoCompleteSuggestions(autocache, query, !0) : fetchAutoCompleteSuggestions(query), query.length < 3) return void renderQuickSearchResult("", query, !0);
						var resultcache = Modernizr.sessionStorage ? sessionStorage.getItem("cachedQuickSearchResult_" + query.toLowerCase()) : null;
						null !== resultcache ? renderQuickSearchResult(resultcache, query, !0) : fetchQuickSearch(query)
					}
				},
				fetchAutoCompleteSuggestions = function(q) {
					var Url = "/Templates/GlobalSearch/Handlers/GlobalSearchHandler.ashx",
						GetStoresCommand = "Autocomplete";
					autocomplete_xhr && autocomplete_xhr.abort(), autocomplete_xhr = $.ajax({
						url: Url + "?CommandName=" + GetStoresCommand + "&Search=" + encodeURIComponent(q),
						async: !0
					}).done(function(d) {
						renderAutoCompleteSuggestions(d, q)
					})
				},
				renderAutoCompleteSuggestions = function(data, query, fromCache) {
					if (fromCache) return context.$suggestions.html(data).removeClass("historicalSearch"), void(quickSearchResults.$suggestions = context.$suggestions.children());
					if (0 === data.length) return void context.$suggestions.html("").removeClass("historicalSearch");
					var tpl = '<div class="suggestion">##val##</div>',
						regExString = "^(" + getEscapedRegExString(query) + ")";
					query = context.$searchBox.data("lastquery");
					var html = data.map(function(obj, ind) {
						if (!(ind > 2)) return tpl.replace("##val##", obj.replace(new RegExp(regExString), "<b>$1</b>"))
					}).join("");
					context.$suggestions.html(html).removeClass("historicalSearch"), quickSearchResults.$suggestions = context.$suggestions.children(), Modernizr.sessionStorage && sessionStorage.setItem("cachedQuickSearchAuto_" + query.toLowerCase(), html)
				},
				fetchQuickSearch = function(q) {
					var args = {};
					args.ajaxFunction = "GlobalSearchQuickResult", args.search = q, quickresults_xhr && quickresults_xhr.abort(), quickresults_xhr = $.ajax({
						url: "/templates/ajaxresponse.aspx?Id=" + ICA.legacy.currentpageId,
						data: args,
						dataType: "html"
					}).done(function(d) {
						renderQuickSearchResult(d, q)
					}).always()
				},
				renderQuickSearchResult = function(data, query, fromCache) {
					var html = data;
					context.$results.html(html), quickSearchResults.$results = context.$results.find(".content-grid > a"), checkCoverImageRatio(quickSearchResults.$results.find("img")), showQuickSearchContainer(), !fromCache && query && Modernizr.sessionStorage && sessionStorage.setItem("cachedQuickSearchResult_" + query.toLowerCase(), html)
				},
				getEscapedRegExString = function(str) {
					return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
				},
				showQuickSearchContainer = function() {
					return $(window).checkSize("<=tablet") && !$(searchItemSelector).hasClass("mobile-search-animation-done") ? void setTimeout(function() {
						showQuickSearchContainer()
					}, animationTime) : void(context.$quickSearchContainer.hasClass("active") || (context.$quickSearchContainer.addClass("active"), $(document).off("click.hidequicksearch").on("click.hidequicksearch", function(e) {
						var $e = $(e.target);
						$e[0] === context.$searchBox[0] || $e.closest(quickSearchContainerSelector).length || context.hideQuickSearchContainer()
					}), $(window).width() < 480 && $("html").addClass("no-scroll"), $(window).off("resize.noScrollCheck").on("resize.noScrollCheck", function() {
						$(window).width() >= 480 ? $("html").removeClass("no-scroll") : $("html").addClass("no-scroll")
					})))
				},
				checkCoverImageRatio = function($images) {
					$images.on("load.cover", function() {
						var $i = $(this),
							ih = $i.outerHeight(),
							ph = $i.parent().outerHeight();
						ph > ih && ($i.css("transition", "none"), getComputedStyle($i[0]).transition, $i.addClass("autoWidth"), setTimeout(function() {
							$i.css("transition", "")
						}, 250))
					})
				};
			context.hideQuickSearchContainer = function() {
				context.$quickSearchContainer.removeClass("active"), $(document).off("click.hidequicksearch"), $(window).off("resize.noScrollCheck"), $("html").removeClass("no-scroll")
			}
		}
		return new _navQuickSearch
	}()
}(jQuery, this, this.document, ICA);
var ICA = ICA || {};
!
function($, window, document, ICA, undefined) {
	ICA.dashboard = function() {
		function _dashboard() {
			var context = ($(document), this),
				$parent = null,
				resizeTimer = ($("#page-wrapper"), undefined),
				updateTimer = null,
				$callout = $(".dashboard-callout"),
				$shoppingListTool = null,
				$accountBalanceTool = null,
				$weekPlannerTool = null,
				$groceryBagTool = null,
				$myRecipesTool = null,
				$bonusTool = null,
				$myFavoriteOffersTool = null,
				$tools = null,
				$toolsWrapper = null,
				$mainmenu = null,
				$usermenu = null,
				toolHashPattern = ":mittica=";
			context.init = function(_$el) {
				if (context.$dashboard = _$el, $mainmenu = context.$dashboard.find(".main.menu"), $usermenu = context.$dashboard.find(".account.menu"), $toolsWrapper = context.$dashboard.find(".tools"), $tools = context.$dashboard.find(".tool"), $shoppingListTool = context.$dashboard.find(".tool.shoppinglist"), $accountBalanceTool = context.$dashboard.find(".tool.account-balance"), $weekPlannerTool = context.$dashboard.find(".tool.weekplanner"), $groceryBagTool = context.$dashboard.find(".tool.grocerybag"), $myRecipesTool = context.$dashboard.find(".tool.myrecipes"), $bonusTool = context.$dashboard.find(".tool.bonus"), $myFavoriteOffersTool = context.$dashboard.find(".tool.myfavoriteoffers"), $parent = context.$dashboard.parent(), $callout[0] && setTimeout(function() {
					ICA.dashboard.callout.init($callout)
				}, 500), $shoppingListTool[0] && ICA.dashboard.shoppingList.init($shoppingListTool), $weekPlannerTool[0] && ICA.dashboard.weekplanner.init($weekPlannerTool), $groceryBagTool[0] && ICA.dashboard.groceryBag.init($groceryBagTool), $myRecipesTool[0] && ICA.dashboard.myRecipes.init($myRecipesTool), $accountBalanceTool[0] && ICA.dashboard.accountBalance.init($accountBalanceTool), $bonusTool[0] && ICA.dashboard.bonus.init($bonusTool), $myFavoriteOffersTool[0] && ICA.dashboard.myFavoriteOffers.init($myFavoriteOffersTool), $tools[0] && ICA.dashboard.tool.init($tools), $.cookieBar && $.cookieBar(), window.location.href.match(/(?:#:|&)+showDigitalBonusEnabledBanner+/g)) {
					var banner = $("<div/>").addClass("enableDigitalBonusChecksSuccess slideDownBanner").text("Klart! Nu får du dina bonuscheckar digitalt.");
					$("body").prepend(banner), theform.deleteKeyFromHash(null, "showDigitalBonusEnabledBanner")
				}
				initAttachEvents(), window.location.hash.indexOf(toolHashPattern) !== -1 && $(window).trigger("hashchange")
			};
			var initAttachEvents = function() {
					$("#dashboard .open-dashboard").on("click", function(e) {
						context.toggle()
					}), $mainmenu.find(".toggler").on("click", toggleMenu), $mainmenu.on("toggle-open", openMenu), $mainmenu.on("toggle-close", closeMenu), $usermenu.on("toggle-open", function() {
						$parent.addClass("dashboard-menu-open"), closeMenu()
					}), $usermenu.on("toggle-close", function() {
						$parent.removeClass("dashboard-menu-open")
					}), $(".tool", context.$dashboard).on("click", function() {
						$parent.removeClass("dashboard-menu-open")
					}), $(window).on("hashchange", hashChange), $(window).on("resize", function() {
						clearTimeout(resizeTimer), resizeTimer = setTimeout(function() {
							context.update()
						}, 100)
					}), $(".menubtn .toolbtn", context.$dashboard).on("click.close", function() {
						$usermenu.trigger("toggle-close")
					}), context.$dashboard.on("initDom updated", context.update), $(window).on("initDom", function(e) {
						$(e.target).hasClass("listmanager") && ICA.dashboard.listManager.init($(e.target))
					}), context.$dashboard.on("toggle-open-bubble", function(e) {
						$(".loadAccountSummary", $(e.target)).trigger("click")
					}), context.$dashboard.find(".toolbar.user .close a").on("click", close), $(".logoutUser").off("click").on("click", function() {
						$("form").trigger("logout")
					}), $("a", $toolsWrapper).on("click.dashboardToolSelect", function(e) {
						var _$tool = $(this),
							toolSelection = undefined;
						e.preventDefault(), "undefined" != typeof(toolSelection = _$tool.attr("href").split(toolHashPattern)[1]) && theform.updateHash(null, {
							mittica: toolSelection
						})
					})
				},
				isActive = function() {
					return context.$dashboard.hasClass("active")
				},
				isClosing = function() {
					return context.$dashboard.hasClass("closing")
				},
				open = function() {
					context.$dashboard.addClass("opening"), isClosing() || (context.$dashboard.autoHeightTransition(function() {
						$(this).addClass("active")
					}, function() {
						$(this).css("height", "auto").removeClass("opening"), setTimeout(function() {
							ICA.icaCallbacks.parallaxInitalOffset(), ICA.eventTarget.trigger("updateRecipeHeaderParallaxRatio")
						}, 0)
					}, "", !0), ICA.globalNav && ICA.globalNav.$globalNav.addClass("dashboard-active")), closeMenu(!0), setTimeout(function() {
						$(window).trigger("resize")
					}, 250)
				},
				close = function() {
					isActive() && (ICA.dashboard.$dashboard.css("height", ICA.dashboard.$dashboard.height()), context.$dashboard.addClass("closing"), context.$dashboard.autoHeightTransition(null, function() {
						clearHash(), context.$dashboard.removeClass("active closing"), ICA.globalNav && ICA.globalNav.$globalNav.removeClass("dashboard-active"), ICA.dashboard.$dashboard.css("height", "0"), setTimeout(function() {
							ICA.icaCallbacks.parallaxInitalOffset(), ICA.eventTarget.trigger("updateRecipeHeaderParallaxRatio")
						}, 0)
					}, 0)), closeMenu(!0), setTimeout(function() {
						$(window).trigger("resize")
					}, 250)
				},
				setTool = function(view) {
					ICA.dashboard.$dashboard.css("height", ICA.dashboard.$dashboard.height());
					var $targetTool = $("#" + view, context.$dashboard),
						$allTools = $($targetTool).siblings(".tool");
					$targetTool.hasClass("active") || 1 != $targetTool.length || ($allTools.trigger("deactivate-tool"), $targetTool.trigger("activate-tool")), closeMenu(), open()
				},
				hashChange = function() {
					"undefined" != typeof theform.hashparams.mittica && setTool(theform.hashparams.mittica)
				},
				clearHash = function() {
					theform.deleteKeyFromHash(null, "mittica")
				},
				keyDown = function(e) {
					27 == e.keyCode && closeMenu()
				},
				openMenu = function() {
					$mainmenu.addClass("open"), $parent.addClass("dashboard-menu-open"), setTimeout(function() {
						context.$dashboard.on("click", closeMenu), $(document).on("keydown", keyDown)
					}, 100)
				},
				closeMenu = function(removeOverlay) {
					$mainmenu.removeClass("open"), removeOverlay && $parent.removeClass("dashboard-menu-open"), context.$dashboard.off("click", closeMenu), $(document).off("keydown", keyDown)
				},
				toggleMenu = function(e) {
					$mainmenu.hasClass("open") ? $mainmenu.trigger("toggle-close") : $mainmenu.trigger("toggle-open")
				};
			return context.toggle = function() {
				if (isActive()) 
					this.close();
				else {
					 this.open();
				}
			}, context.update = function() {
				clearTimeout(updateTimer), updateTimer = setTimeout(function() {}, 300)
			}, context
		}
		return new _dashboard
	}()
}(jQuery, this, this.document, ICA), $(function() {
	!ICA.subModules && $("#dashboard")[0] && ICA.dashboard.init($("#dashboard"))
});
var ICA = ICA || {};
ICA.dashboard = ICA.dashboard || {}, function($, window, document, ICA, undefined) {
	ICA.dashboard.accountBalance = function() {
		function _accountBalance() {
			var context = ($(document), this),
				$accountBalance = null,
				$prevbtn = undefined,
				$nextbtn = undefined,
				$annualstatementsFolder = undefined,
				$kontoutdrag = undefined,
				$accountList = undefined,
				$activeAccount = undefined,
				kontoUtdragsItemsshow = 2,
				monthList = ".month-list",
				itemExpanded = ".expandable",
				yearsItem = ".years-item",
				listItems = "li.item",
				timer = undefined;
			context.init = function(_$el) {
				$accountBalance = _$el, initAttachEvents()
			};
			var initAttachEvents = function() {
					$accountBalance.on("tool-ready", setup)
				},
				showInstructions = function(e) {
					var _$accountBalance = $(e.target).closest(".tool");
					$(".morebtn", _$accountBalance).hide(), $(".account-transactions", _$accountBalance).fadeIn(), ICA.dashboard.update()
				},
				loadAccount = function() {
					$accounts.hide(), revealAccount()
				},
				revealAccount = function() {
					$activeAccount.fadeIn(), $activeAccount.removeClass("hidden"), setupDetails(), ICA.dashboard.update()
				},
				changeAccount = function() {
					clearTimeout(timer), timer = setTimeout(function() {
						var accountId = $(".active", $accountList).data("accountid");
						$activeAccount = $("#account" + accountId), loadAccount()
					}, 300)
				},
				setupDetails = function() {
					$activeAccount.trigger("initDom")
				},
				loadAnnualStatements = function() {
					ICA.legacy.get("/Templates/ajaxresponse.aspx?ajaxFunction=AnnualStatementsControl", {}, function(data) {
						var temp = $("<html></html>");
						temp.append(data), $("#aresbesked").html(temp.html()).trigger("initDom")
					})
				},
				kontoutdragToggleItems = function() {
					$(monthList).hide(), $(itemExpanded).click(function() {
						$(this).next(monthList).slideToggle("slow");
						var monthListVisible = $(monthList);
						monthListVisible.is(":visible") && $(this).parent().siblings().find(monthList).slideUp("slow"), $(this).toggleClass("active"), $(this).parent().siblings().find(itemExpanded).removeClass("active")
					})
				},
				showMoreItems = function() {
					$(yearsItem).each(function() {
						var lengthListItems = $(this).find(listItems).length;
						if (lengthListItems > 2) {
							$(listItems, this).eq(kontoUtdragsItemsshow - 1).nextAll().hide().addClass("itemToggled");
							var $span = $("<span/>").addClass("show-more-button").text("Visa fler år"),
								$div = $("<div/>").addClass("show-more-wrapper").append($span);
							$(this).append($div)
						}
					}), $(yearsItem).on("click", ".show-more-button", function() {
						$(this).hasClass("less") ? $(this).text("Visa fler år").removeClass("less") : $(this).text("Visa färre år").addClass("less"), $(this).parent().siblings("li.itemToggled").slideToggle()
					})
				},
				loadKontoUtdrag = function() {
					ICA.legacy.get("/Templates/ajaxresponse.aspx?ajaxFunction=MonthlyStatementsControl", {}, function(data) {
						var temp = $("<html></html>");
						temp.append(data), $("#kontoutdrag").html(temp.html()).trigger("initDom"), kontoutdragToggleItems(), showMoreItems()
					})
				},
				setup = function(e) {
					$accountBalance = $(e.target), $(".loadmore", $accountBalance).off("click"), $(".loadmore").on("click", showInstructions), $accounts = $(".account-container", $accountBalance), $accountList = $(".accounts", $accountBalance), $annualstatementsFolder = $("#tab-aresbesked", $accountBalance), $annualstatementsFolder.on("click", loadAnnualStatements), $kontoutdrag = $("#tab-kontoutdrag", $accountBalance), $kontoutdrag.on("click", loadKontoUtdrag), $prevbtn = $("a.prevbtn", $accountBalance), $nextbtn = $("a.nextbtn", $accountBalance), $prevbtn.on("click", changeAccount), $nextbtn.on("click", changeAccount)
				};
			return context
		}
		return new _accountBalance
	}()
}(jQuery, this, this.document, ICA);
var ICA = ICA || {};
ICA.dashboard = ICA.dashboard || {}, function($, window, document, ICA, undefined) {
	ICA.dashboard.bonus = function() {
		function _bonus() {
			var context = ($(document), this),
				$bonus = null;
			$("mini-bonus");
			context.init = function(_$el) {
				$bonus = _$el, renderBonusDonut(), enableDigitalBonusChecks(), initAttachEvents()
			};
			var initAttachEvents = function() {
					$bonus.on("tool-ready", setup), $bonus.on("click", "#fullbtn", showDetails), $(".toolbtn").on("click", hideDetails), ICA.dashboard.$dashboard.on("initDom", showMoreItems), ICA.dashboard.$dashboard.on("initDom", enableDigitalBonusChecks), $(document).on("initDom", renderBonusDonut), $(window).smartresize(function(e) {
						"resize" == e.type && $("html").hasClass("ios") || renderBonusDonut()
					}, 300), $(window).on("orientationchange.bonusdonut", function(e) {
						renderBonusDonut()
					})
				},
				setup = function() {
					$("#mini-bonus").css("display", "inline"), $("#full-bonus").hide(), $("#link-current").click();
					var max_calculation = 2500,
						amount_to_nextCupon = parseInt($("#hidden-span").text()),
						current_bonus_val = max_calculation - amount_to_nextCupon,
						current_value = 100 * current_bonus_val / max_calculation;
					$("#progressbar").progressbar({
						value: current_value
					})
				},
				showDetails = function() {
					$("#mini-bonus").hide(), $("#full-bonus").css("display", "inline"), ICA.dashboard.$dashboard.trigger("initDom")
				},
				hideDetails = function() {
					$("#mini-bonus").css("display", "inline"), $("#full-bonus").hide()
				},
				renderBonusDonut = function() {
					if ($("html").hasClass("canvas")) {
						var $canvas = $("#bonusChart"),
							pointsLvlLimit = 2500;
						if ($canvas[0] && $canvas.is(":visible") && ($canvas.attr("width", $canvas.parent().width()), $canvas.attr("height", $canvas.parent().width()), $canvas.length)) {
							var progress = $("#pointsToNextCheck").val() ? pointsLvlLimit - parseInt($("#pointsToNextCheck").val()) : "0",
								left = pointsLvlLimit - progress,
								ctx = $canvas[0].getContext("2d"),
								data = [{
									value: progress,
									color: "rgba(220, 67, 140, 0.7)",
									highlight: "rgba(220, 67, 140, 1)",
									label: "Insamlat"
								}, {
									value: left,
									color: "rgba(234, 232, 229, 0.7)",
									highlight: "rgba(234, 232, 229, 1)",
									label: "Kvar"
								}],
								options = {
									segmentShowStroke: !1,
									percentageInnerCutout: 75,
									animationEasing: "easeOutExpo",
									tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %> p"
								};
							new Chart(ctx).Doughnut(data, options)
						}
					}
				},
				showMoreItems = function() {},
				enableDigitalBonusChecks = function() {
					$(".enableDigitalBonusFieldset").on("ajaxsubmit", function(e, params) {
						var email = params.bonusCheckEmail,
							errorContainer = $(this).find(".form-error"),
							input = $(this).find("input[type=text]"),
							fieldset = $(this);
						return email.match(/^[a-zA-Z0-9!#$%&*+\/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+(?:[a-zA-Z]{2,4})$/) ? (errorContainer.hide(), input.removeClass("error"), void $.ajax({
							url: "/Templates/General/Handlers/BonusVouchersHandler.ashx",
							method: "GET",
							data: {
								CommandName: "EnableDigitalBonusVouchers",
								Email: email
							}
						}).fail(function() {
							errorContainer.text("Någonting gick fel. Vänligen prova igen senare.").show(), fieldset.trigger("done")
						}).done(function(data) {
							var url = window.location.href.split("#")[0],
								hash = "#" + window.location.href.split("#")[1];
							hash.match(/^#:.+$/) ? hash.match(/[:&]+showDigitalBonusEnabledBanner/g) || (hash += "&showDigitalBonusEnabledBanner=true") : hash = ":showDigitalBonusEnabledBanner=true", window.location.href = url + hash, location.reload()
						})) : (errorContainer.text("Du har angivit en felaktig e-postadress").show(), input.addClass("error"), void $(this).trigger("done"))
					}), $("#bonusCheckEmail", $bonus).off("focus.bonus").on("focus.bonus", function() {
						$(".changeEmailJS").remove()
					})
				};
			return context
		}
		return new _bonus
	}()
}(jQuery, this, this.document, ICA);
var ICA = ICA || {};
ICA.dashboard = ICA.dashboard || {}, function($, window, document, ICA, undefined) {
	ICA.dashboard.callout = function() {
		function _callout() {
			var context = ($(document), this),
				$callout = null,
				attachTo = undefined,
				attachToNavigation = undefined,
				attachToDashboard = undefined;
			context.init = function(_$el) {
				$callout = _$el, $closeBtn = $(".close-dashboard-callout", $callout), arrow = $(".callout-arrow", $callout), $callout.data("attachto") && (attachToNavigation = $callout.data("attachto"), attachToNavigation = attachToNavigation instanceof jQuery ? attachToNavigation : $(attachToNavigation), attachTo = attachToNavigation), $callout.data("attachto-dashboard") && (attachToDashboard = $callout.data("attachto-dashboard"), attachToDashboard = attachToDashboard instanceof jQuery ? attachToDashboard : $(attachToDashboard)), arrow.css({
					display: "block",
					position: "absolute",
					width: "0",
					height: "0",
					top: "-10px",
					right: "35px",
					border: "5px solid #fff",
					"border-color": "transparent transparent #fff transparent"
				}), (attachToNavigation.is(":visible") || attachToDashboard.is(":visible")) && ($("form").append($callout), setPosition(), $callout.removeClass("removed"), $callout.addClass("callout-loaded")), initAttachEvents()
			};
			var initAttachEvents = function() {
					$closeBtn.on("click", close), $(window).on("resize", setPosition).resize()
				},
				setPosition = function() {
					if ((attachToNavigation.filter(":visible")[0] || attachToDashboard.filter(":visible")[0]) && (attachTo = attachToDashboard.filter(":visible")[0] ? attachToDashboard.filter(":visible").first() : attachToNavigation.filter(":visible").first()), "undefined" != typeof attachTo) {
						var offset = attachTo.offset(),
							width = attachTo.outerWidth(),
							height = attachTo.outerHeight();
						$callout.outerWidth(!0), $callout.outerHeight(!0);
						$callout.css({
							right: $(window).width() - offset.left - width + "px",
							top: offset.top + height + "px"
						})
					}
				},
				close = function(e) {
					e.preventDefault(), $callout.remove()
				};
			return context
		}
		return new _callout
	}()
}(jQuery, this, this.document, ICA);
var ICA = ICA || {};
ICA.dashboard = ICA.dashboard || {}, function($, window, document, ICA, undefined) {
	ICA.dashboard.groceryBag = function() {
		function _groceryBag() {
			var context = ($(document), this),
				$groceryBag = null,
				selectedWeek = undefined;
			context.init = function(_$el) {
				$groceryBag = _$el, initAttachEvents()
			};
			var initAttachEvents = function() {
					$groceryBag.on("tool-ready", setup), $(window).on("select-list", selectGrocerybagWeek)
				},
				setup = function() {
					selectedWeek = ICA.legacy.getCookie("GroceryBagSelectedDeliveryWeek")
				},
				selectGrocerybagWeek = function(e, selectedList) {
					$(e.target).is(".grocerybag-edit-modal") && (selectedWeek = selectedList, ICA.legacy.setCookie("GroceryBagSelectedDeliveryWeek", selectedWeek), setTimeout(function() {
						$groceryBag.trigger("reload")
					}, 100))
				};
			return context
		}
		return new _groceryBag
	}()
}(jQuery, this, this.document, ICA);
var ICA = ICA || {};
ICA.dashboard = ICA.dashboard || {}, function($, window, document, ICA, undefined) {
	ICA.dashboard.listManager = function() {
		function _listManager() {
			var context = ($(document), this),
				$listManager = null,
				newListBtnText = undefined,
				$editBtn = null,
				$btnCreateNewList = null,
				$additionalInfo = null,
				$fieldsetNewlist = null;
			context.init = function(_$el) {
				$listManager = _$el, $editBtn = $(".edit", $listManager), $btnCreateNewList = $(".new-list", $listManager), $additionalInfo = $(".additionalInfo", $listManager), $fieldsetNewlist = $("fieldset", $listManager), newListBtnText = $btnCreateNewList.text(), initAttachEvents()
			};
			var initAttachEvents = function() {
					$editBtn.on("click", edit), $listManager.on("check", "input[type=radio]", selectList), $listManager.on("click", ".editmode .done", doneEditing), $listManager.on("click", ".editmode .remove", removeEnabled), $listManager.on("click", ".editmode.remove-enabled .final-remove", remove), $listManager.on("click", ".editmode.remove-enabled .abort", abort), $fieldsetNewlist.on("submit", createNewList), $btnCreateNewList.on("click", function(e) {
						e.preventDefault(), $listManager.hasClass("new") ? ($btnCreateNewList.html(newListBtnText), $listManager.removeClass("new")) : ($listManager.addClass("new"), $listManager.find("input[name=newlist]").focus(), $btnCreateNewList.html("Avbryt"))
					})
				},
				createNewList = function(e) {
					e.stopPropagation();
					var createlistRow = $("li.new", $listManager),
						nameForNewList = createlistRow.find("input").val();
					if ("" != nameForNewList) {
						$listManager.trigger("create-list", nameForNewList), $(".selected-list", $listManager).removeClass("selected-list");
						var $temp = $('<label><div class="content"><strong class="list-name">' + nameForNewList + "</strong></div></label>");
						createlistRow.addClass("new-list-created selected-list").wrapInner('<div class="hide-for-editmode"></div>').find(".hide-for-editmode").append($temp), setTimeout(function() {
							$("input", createlistRow).trigger("close"), $listManager.remove()
						}, 800)
					}
				},
				edit = function(e) {
					$(e.target).closest("li").addClass("editmode"), $("input.change-name").focus()
				},
				doneEditing = function(e) {
					var editRow = $(e.target).closest("li.editmode"),
						$currentName = editRow.find(".list-name"),
						$newNameInput = editRow.find("input.change-name"),
						newName = $newNameInput.val();
					"" != newName && newName != $currentName.text() && ($currentName.html(newName), $listManager.trigger("rename-list", [editRow.data("listid"), newName])), $newNameInput.val($currentName.text()), editRow.removeClass("editmode")
				},
				removeEnabled = function(e) {
					var editRow = $(e.target).closest("li.editmode").addClass("remove-enabled"),
						currentTxt = $(".list-name", editRow).text();
					$("input.change-name", editRow).val(currentTxt).prop("disabled", !0).blur()
				},
				remove = function(e) {
					e.preventDefault();
					var editRow = $(e.target).closest("li.remove-enabled"),
						listid = editRow.data("listid"),
						nextRow = editRow.next("li:not(.removed,.new)");
					nextRow.length || (nextRow = editRow.prev("li:not(.removed,.new)"));
					var nextListId = nextRow.data("listid");
					$listManager.trigger("delete-list", [listid, nextListId]), editRow.hasClass("selected-list") && $(nextRow).addClass("selected-list"), editRow.addClass("removed").removeClass("editmode remove-enabled")
				},
				abort = function(e) {
					var editRow = $(e.target).closest("li.editmode");
					$("input.change-name", editRow).removeAttr("disabled"), editRow.removeClass("editmode remove-enabled")
				},
				selectList = function(e) {
					var $checkedInput = $(e.target);
					$listManager.trigger("select-list", $checkedInput.val()), $(".selected-list", $listManager).removeClass("selected-list"), $checkedInput.closest("li").addClass("selected-list"), $checkedInput.trigger("close", [!1, !0]), $listManager.remove()
				};
			return context
		}
		return new _listManager
	}()
}(jQuery, this, this.document, ICA);
var ICA = ICA || {};
ICA.dashboard = ICA.dashboard || {}, function($, window, document, ICA, undefined) {
	ICA.dashboard.myFavoriteOffers = function() {
		function _myFavoriteOffers() {
			var context = ($(document), this),
				$myFavoriteOffer = null;
			context.init = function(_$el) {
				$myFavoriteOffer = _$el
			};
			return context
		}
		return new _myFavoriteOffers
	}()
}(jQuery, this, this.document, ICA);
var ICA = ICA || {};
ICA.dashboard = ICA.dashboard || {}, function($, window, document, ICA, undefined) {
	ICA.dashboard.myRecipes = function() {
		function _myRecipes() {
			var context = ($(document), this),
				$myRecipes = null,
				$searchForm = undefined,
				$searchField = undefined,
				$recipes = undefined,
				selectedFolder = undefined,
				$morebtn = $('<div class="morebtn"><span>Fler recept&nbsp;<span class="icon sprite1 icon-chevron-down"></span></span></div>'),
				pageSize = undefined;
			context.init = function(_$el) {
				$myRecipes = _$el, selectedFolder = "0", initAttachEvents()
			};
			var initAttachEvents = function() {
					$myRecipes.on("tool-ready", setup), $myRecipes.on("remove-savedrecipe", removeRecipe), $(window).on("select-list", selectNewRecipeList).on("delete-list", deleteRecipeList).on("rename-list", renameRecipeList).on("create-list", createNewRecipeList), $myRecipes.on("click", ".morebtn", getMoreRecipes)
				},
				initRecipes = function() {
					$recipes = $myRecipes.find(".recipes > ul > li"), ICA.dashboard.recipe.init($myRecipes, {
						hasActionsMenu: !0
					})
				},
				selectNewRecipeList = function(e, listId) {
					$(e.target).is(".edit-myrecipeslist-modal") && (icadatalayer.add("dashboard-recipes", {
						dashboardRecipes: {
							action: "choose-list"
						}
					}), selectedFolder = listId, ICA.legacy.setCookie("myRecipesFolderId", selectedFolder), setTimeout(function() {
						$myRecipes.trigger("reload")
					}, 100))
				},
				createNewRecipeList = function(e, listName) {
					$(e.target).is(".edit-myrecipeslist-modal") && ICA.legacy.savedRecipes.createRecipeFolder(listName, function(data) {
						data.success && (icadatalayer.add("dashboard-recipes", {
							dashboardRecipes: {
								action: "new-list"
							}
						}), $myRecipes.trigger("reload"))
					})
				},
				renameRecipeList = function(e, listId, newName) {
					$(e.target).is(".edit-myrecipeslist-modal") && ICA.legacy.savedRecipes.renameRecipeFolder(listId, newName, function(data) {
						data.success && (icadatalayer.add("dashboard-recipes", {
							dashboardRecipes: {
								action: "rename-list"
							}
						}), listId == ICA.legacy.getCookie("myRecipesFolderId") && $(".active-recipeslist-name").text(newName))
					})
				},
				deleteRecipeList = function(e, listId, nextListId) {
					$(e.target).is(".edit-myrecipeslist-modal") && ICA.legacy.savedRecipes.deleteRecipeFolder(listId, function(data) {
						if (data.success && (icadatalayer.add("dashboard-recipes", {
							dashboardRecipes: {
								action: "remove-list"
							}
						}), listId == ICA.legacy.getCookie("myRecipesFolderId"))) {
							var nextOrDefaultListId = nextListId ? nextListId : 0;
							ICA.legacy.setCookie("myRecipesFolderId", nextOrDefaultListId), $myRecipes.trigger("reload")
						}
					})
				},
				doSearch = function() {
					var searchTerm = $searchField.val().toLowerCase();
					ICA.legacy.dashboard.favoriteRecipes(null, null, searchTerm, null, searchRecipesSuccess, searchRecipesFailure)
				},
				searchRecipesSuccess = function(data) {
					icadatalayer.add("dashboard-recipes", {
						dashboardRecipes: {
							action: "recipe-search"
						}
					}), $("#myrecipe-list").html(data), initRecipes(), $recipes.length ? $(".no-results-msg").hide() : $(".no-results-msg").show(), $("#recipe-list").find($morebtn).remove(), $("#myrecipe-list").trigger("initDom")
				},
				searchRecipesFailure = function() {
					$(".no-results-msg").show()
				},
				submit = function(e, params) {
					$searchForm.trigger("done"), doSearch()
				},
				getMoreRecipes = function() {
					var loadedRecipesCount = $recipes.length;
					ICA.legacy.dashboard.favoriteRecipes(selectedFolder, loadedRecipesCount, null, pageSize, loadRecipesSuccess, loadRecipesFailure)
				},
				removeRecipe = function(e, recipeId, recipeName) {
					recipeId && ICA.legacy.savedRecipes.remove(recipeId, function() {
						icadatalayer.add("dashboard-recipes", {
							dashboardRecipes: {
								action: "remove-recipe",
								recipe: recipeName
							}
						}), $myRecipes.trigger("reload")
					}, function() {})
				},
				updateMoreBtn = function() {
					var amount = $("._amount").text().replace("(", "").replace(")", "");
					amount && (amount > $recipes.length ? $morebtn.insertAfter($("#recipe-list .recipes")) : $("#recipe-list").find($morebtn).remove())
				},
				loadRecipesSuccess = function(data, reset) {
					reset && 1 == reset ? $("#myrecipe-list").html(data) : $("#myrecipe-list").append(data), initRecipes(), updateMoreBtn(), $myRecipes.trigger("initDom")
				},
				loadRecipesFailure = function(data) {},
				setup = function() {
					var selectedFolderId = ICA.legacy.getCookie("myRecipesFolderId");
					selectedFolderId && (selectedFolder = selectedFolderId), pageSize = $("html").hasClass("is-mobile") ? 3 : $("html").hasClass("is-tablet") ? 8 : 10, ICA.legacy.dashboard.favoriteRecipes(selectedFolder, null, null, pageSize, function(data) {
						loadRecipesSuccess(data, !0)
					}, loadRecipesFailure), $searchForm = $(".searchfield", $myRecipes), $searchField = $('.searchfield input[type="search"]', $myRecipes), $searchForm.on("submit", submit)
				};
			return context
		}
		return new _myRecipes
	}()
}(jQuery, this, this.document, ICA);
var ICA = ICA || {};
ICA.dashboard = ICA.dashboard || {}, function($, window, document, ICA, undefined) {
	ICA.dashboard.recipe = function() {
		function _recipe(args) {
			var context = ($(document), this),
				opt = null,
				$menu = null;
			context.init = function(_$myRecipes, args) {
				$myRecipes = _$myRecipes, opt = $.extend({
					hasActionsMenu: !1
				}, args), opt.hasActionsMenu && $myRecipes.find("li")[0] && ICA.dashboard.recipeActionMenu.init($myRecipes), $myRecipes.trigger("updated"), initAttachEvents()
			};
			var initAttachEvents = function() {
					var _$menu = $myRecipes.find(".details"),
						_$image = $myRecipes.find("img");
					_$menu.on("toggle-open", function() {
						$(this).siblings("li").trigger("toggle-close")
					}), $myRecipes.on("toggle-close", function() {
						_$menu = $(this).find(".details"), _$menu.trigger("toggle-close")
					}), _$menu.find("li").on("click", function() {
						_$menu = $(this).find(".details"), $menu.trigger("toggle-close")
					}), _$image.on("load", function() {
						$(this).trigger("updated")
					})
				};
			return context
		}
		return new _recipe
	}()
}(jQuery, this, this.document, ICA);
var ICA = ICA || {};
ICA.dashboard = ICA.dashboard || {}, function($, window, document, ICA, undefined) {
	ICA.dashboard.recipeActionMenu = function() {
		function _recipeActionMenu() {
			var context = ($(document), this);
			context.init = function(_$myRecipes) {
				$myRecipes = _$myRecipes, initAttachEvents()
			};
			var initAttachEvents = function() {
					$myRecipes.find("li a").on("click", itemClickHandler), $(window).on("initDom", setupCategoryModal)
				},
				itemClickHandler = function(e) {
					var _$a = $(this),
						_$listItem = $(this).closest("li");
					if (_$listItem.hasClass("category-item")) {
						e.preventDefault(), _$listItem.trigger("close");
						var ajaxurl = _$listItem.attr("data-actionsurl");
						ajaxurl && ICA.legacy.get(ajaxurl, {}, function(data) {
							console.log(data), setTimeout(function() {
								var classList = " dialog category";
								window.triggerAsModal(data, classList)
							}, 200)
						})
					} else _$listItem.hasClass("remove-recipe-item") && (e.preventDefault(), $myRecipes.trigger("remove-savedrecipe", [_$a.data("id"), _$a.data("name")]), _$listItem.trigger("close"))
				},
				setupCategoryModal = function() {
					var $modal = $(".modalbox.category").last();
					$modal.hasClass("recipecategory-modal-loaded") || $modal.length && ($modal.on("change", "input", function(e) {
						if (e.isTrigger) {
							var $input = $(this);
							if ($input.is(":checked")) {
								var currentRecipeId = $("#recipeId", $modal).val(),
									currentRecipeName = $("#recipeName", $modal).val();
								$input.closest("li").addClass("selected-list");
								var selectedGroup = $input.val();
								ICA.legacy.savedRecipes.move(currentRecipeId, selectedGroup, function(data) {
									icadatalayer.add("dashboard-recipes", {
										dashboardRecipes: {
											action: "add-recipe-to-recipe-list",
											recipe: currentRecipeName
										}
									}), setTimeout(function() {
										$input.trigger("close"), $modal.remove()
									}, 1e3), $("li[data-recipeid='" + currentRecipeId + "']").trigger("reload")
								}, function() {})
							}
						}
					}), $modal.addClass("recipecategory-modal-loaded"))
				};
			return context
		}
		return new _recipeActionMenu
	}()
}(jQuery, this, this.document, ICA);
var ICA = ICA || {};
ICA.dashboard = ICA.dashboard || {}, function($, window, document, ICA, undefined) {
	ICA.dashboard.shoppingList = function() {
		function _shoppingList() {
			var context = ($(document), this),
				$shoppingList = null,
				currentOrderId = undefined,
				$regularList = undefined,
				$regularItems = undefined,
				$modalRegularList = undefined,
				$modalRegularItems = undefined,
				autocompleteLimit = 8,
				hasItems = !1,
				$zerocaseMarkup = undefined,
				$sortBtn = undefined,
				$sortOrderContent = undefined,
				$printBtn = undefined;
			context.currentListId = undefined, context.currentListSecureId = undefined, context.units = [], context.init = function(_$el) {
				$shoppingList = _$el, initAttachEvents()
			};
			var initAttachEvents = function() {
					$shoppingList.on("tool-ready", setup), $shoppingList.on("shoppinglist-updated", updateTool), $(window).on("select-list", selectNewShoppinglist).on("delete-list", deleteShoppingList).on("rename-list", renameShoppingList).on("create-list", createNewShoppingList), $(window).on("initDom", function(e) {
						$(e.target).hasClass("email-shoppinglist-modal") && $("fieldset", $(e.target)).on("ajaxsubmit", emailShoppingList)
					})
				},
				setup = function() {
					$("#selectedShoppinglistId", $shoppingList).on("update", function() {
						context.currentListId = $(this).val(), $("input[name=shoppingListId]").val(context.currentListId)
					}).trigger("update"), $("#selectedShoppinglistSecureId", $shoppingList).on("update", function() {
						context.currentListSecureId = $(this).val(), $("input[name=shoppingListSecureId]").val(context.currentListSecureId)
					}).trigger("update"), $searchForm = $(".searchfield", $shoppingList), $searchField = $(".searchfield input", $shoppingList), autocompleteItems = undefined, $autocompleteList = $(".searchfield .autocomplete"), $items = $(".list .shopping-items", $shoppingList), hasItems = $("li.item", $items).length > 0, $zerocaseMarkup = $("section.zero-case", $shoppingList), $sortBtn = $("a.sort-shoppinglist-button", $shoppingList), $sortOrderContent = $(".sort-by-modal", $shoppingList), currentOrderId = $("#selectedShoppinglistOrderid", $shoppingList).val(), $printBtn = $("a.print", $shoppingList), context.units = function() {
						var unitArray = [],
							units = $("section.list", $shoppingList).attr("data-units");
						return units && (unitArray = units.split(";"), unitArray.unshift("")), unitArray
					}(), 0 != currentOrderId && $shoppingList.addClass("sorted"), ICA.dashboard.shoppingListItem.init($shoppingList), setupRegularItems(), showHideGoToTop(), $sortBtn.on("click", function(e) {
						e.preventDefault(), window.triggerAsModal($sortOrderContent, $(e.currentTarget).data("modalclass"))
					}), $searchField.on("focus", function() {
						$searchForm.addClass("has-focus"), $searchField.on("keydown", traverseAutocomplete)
					}), $searchField.on("blur", function() {
						$searchField.off("keydown", traverseAutocomplete), setTimeout(function() {
							$searchForm.removeClass("has-focus")
						}, 300)
					}), $searchField.on("input", searchInput), $searchForm.on("submit", function(e) {
						submit()
					}), $shoppingList.on("remove-item", removeItem), $(window).on("initDom", setupRegularItems), $(window).on("initDom", setupStoreList), $(window).on("initDom", setupRecipesInListModal), $(".showall", $shoppingList).on("click", showFullList), $(".gototop", $shoppingList).on("click", goToTop), $printBtn.on("click", printShoppingList);
					var $ul = $(".list ul.shopping-items");
					$ul.height() + $ul.offset().top > $ul.parents(".tool.shoppinglist").height() && $(".loadmore-wrapper", $shoppingList).removeClass("removed")
				},
				addItem = function(item, addType) {
					$zerocaseMarkup.length && ($zerocaseMarkup.remove(), $(".recipesinlist").removeClass("removed"), $("h2.title a").length > 0 && $("h2.title a").hasClass("removed") && ($("h2.title a", $shoppingList).removeClass("removed"), $("h2.title #zerocaseheader", $shoppingList).addClass("removed")));
					var $newItem, $insertionPoint, item = item.replace ? item.replace(/"/g, "") : item;
					if (item instanceof jQuery) {
						$newItem = item;
						var strongContent = $newItem.find(".name").children(".strong").text();
						$newItem.find(".name").children(".strong").replaceWith(strongContent)
					} else("string" == typeof item || item instanceof String) && ($newItem = $('<li class="item" data-categoryid="7"><span class="text"><span class="name">' + $.trim(item) + '</span> <span class="amount"></span> <span class="unit"></span></span></li>'));
					if (ICA.dashboard.shoppingListItem.update($newItem), $newItem.addClass("new"), $items.children().removeClass("editing"), $shoppingList.is(".sorted") && $shoppingList.is(".expanded") ? ($insertionPoint = $($items.children(".label[data-categoryid=" + $newItem.data("categoryid") + "]")[0]), $insertionPoint.after($newItem), $insertionPoint.is(".removed") && $insertionPoint.removeClass("removed")) : ($insertionPoint = $($items.children(".item")[0]), $insertionPoint.before($newItem)), ICA.legacy.shoppingList.addRow({
						productName: $newItem.find("input.name").val(),
						shoppingListId: context.currentListId,
						shoppingListSecureId: context.currentListSecureId
					}, function(data) {
						data.isNewList && ($("#selectedShoppinglistId", $shoppingList).val(data.shoppingListId).trigger("update"), $("#selectedShoppinglistSecureId", $shoppingList).val(data.shoppingListSecureId).trigger("update")), loadList()
					}), $shoppingList.trigger("shoppinglist-updated"), $shoppingList.hasClass("expanded") && $shoppingList.trigger("updated"), setTimeout(function() {
						$newItem.addClass("added")
					}, 100), setTimeout(function() {
						$newItem.removeClass("new")
					}, 1e3), addType && "" != addType) {
						var productName = $newItem.find(".name").text();
						icadatalayer.add("dashboard-grocery-lists", {
							dashboardGroceryLists: {
								action: "add-item",
								addType: addType,
								item: productName
							}
						})
					}
				},
				addItems = function(items, addType) {
					if (0 === items.length) return !1;
					var productNames = new Array;
					$.each(items, function(index, item) {
						addItem($(this)), productNames.push($(this).find(".name").text())
					}), addType && "" != addType && icadatalayer.add("dashboard-grocery-lists", {
						dashboardGroceryLists: {
							action: "add-item",
							addType: addType,
							items: productNames
						}
					})
				},
				removeItem = function(e, item) {
					item.prev().hasClass("label") && (item.next().hasClass("label") || item.is(":last-child")) && (hasItems = !1, item.prev().addClass("removed")), item.remove(), $shoppingList.trigger("shoppinglist-updated"), ICA.dashboard.$dashboard.trigger("updated"), ICA.legacy.shoppingList.removeRow({
						shoppingListId: context.currentListId,
						shoppingListRowIds: item.attr("data-rowid"),
						shoppingListSecureId: context.currentListSecureId
					}), icadatalayer.add("dashboard-grocery-lists", {
						dashboardGroceryLists: {
							action: "remove-item"
						}
					})
				},
				goToTop = function() {
					window.scrollTo(0, ICA.dashboard.$dashboard.offset().top)
				},
				showHideGoToTop = function() {
					var _$items = $items.children(".item"),
						$gototopbtn = $(".gototop-wrapper", $shoppingList);
					$shoppingList.hasClass("expanded") && _$items.length >= 15 ? $gototopbtn.removeClass("removed") : $gototopbtn.addClass("removed")
				},
				showFullList = function() {
					$shoppingList.addClass("expanded"), $shoppingList.trigger("updated"), showHideGoToTop()
				},
				loadList = function(listId, listSecureId, orderId) {
					$("section.zero-case").remove(), listId = listId || context.currentListId, listSecureId = listSecureId || context.currentListSecureId, orderId = orderId || currentOrderId, $items.addClass("loading-data"), ICA.legacy.shoppingList.get(listId, listSecureId, orderId, function(data) {
						loadSuccess(data)
					}, loadError)
				},
				loadSuccess = function(html) {
					var tempDom = $("<html></html>");
					tempDom.append(html), $items.html(tempDom.find("ul.shopping-items").html()), console.log("loadSuccess!"), ICA.dashboard.shoppingListItem.update($items.find(".item")), setTimeout(function() {
						$items.removeClass("loading-data")
					}, 600), $shoppingList.trigger("shoppinglist-updated"), ICA.dashboard.$dashboard.trigger("updated")
				},
				loadError = function(error) {},
				selectNewShoppinglist = function(e, selectedList) {
					$(e.target).is(".edit-shoppinglist-modal") && (icadatalayer.add("dashboard-grocery-lists", {
						dashboardGroceryLists: {
							action: "choose-list"
						}
					}), ICA.legacy.setCookie("shoppingListLoggedInUserCookie", selectedList), setTimeout(function() {
						$shoppingList.trigger("reload")
					}, 100))
				},
				createNewShoppingList = function(e, listName) {
					$(e.target).is(".edit-shoppinglist-modal") && ICA.legacy.shoppingList.newShoppingList(listName, function(data) {
						data.success && (icadatalayer.add("dashboard-grocery-lists", {
							dashboardGroceryLists: {
								action: "new-list"
							}
						}), $shoppingList.trigger("reload"))
					})
				},
				renameShoppingList = function(e, listId, newName) {
					$(e.target).is(".edit-shoppinglist-modal") && ICA.legacy.shoppingList.renameShoppingList(listId, newName, function(data) {
						data.success && listId == context.currentListId && (icadatalayer.add("dashboard-grocery-lists", {
							dashboardGroceryLists: {
								action: "rename-list"
							}
						}), $(".active-shoppinglist-name").text(newName))
					})
				},
				deleteShoppingList = function(e, listId, nextListId) {
					$(e.target).is(".edit-shoppinglist-modal") && ICA.legacy.shoppingList.deleteShoppingList(listId, function(data) {
						data.success && listId == context.currentListId && (icadatalayer.add("dashboard-grocery-lists", {
							dashboardGroceryLists: {
								action: "remove-list"
							}
						}), nextListId && ICA.legacy.setCookie("shoppingListLoggedInUserCookie", nextListId), setTimeout(function() {
							$shoppingList.trigger("reload")
						}, 100))
					})
				},
				setupRecipesInListModal = function() {
					var $modal = $(".recipesinlist-modal").last();
					$modal.hasClass("recipesinlist-modal-loaded") || ($modal.length && $modal.on("click", ".recipe-actions a", function(e) {
						e.preventDefault();
						var recipeId = $(this).attr("data-recipeid");
						ICA.legacy.shoppingList.removeRecipe(context.currentListId, context.currentListSecureId, recipeId), icadatalayer.add("dashboard-grocery-lists", {
							dashboardGroceryLists: {
								action: "remove-recipe"
							}
						}), $(this).closest(".listed-article").remove(), 0 == $(".listed-article", $modal).length && $(".empty-list-txt", $modal).removeClass("removed"), setTimeout(function() {
							$shoppingList.trigger("reload")
						}, 700)
					}), $modal.addClass("recipesinlist-modal-loaded"))
				},
				printShoppingList = function() {
					return icadatalayer.add("dashboard-grocery-lists", {
						dashboardGroceryLists: {
							action: "print-list"
						}
					}), !1
				},
				emailShoppingList = function(e, params) {
					e.stopPropagation(), ICA.legacy.shoppingList.emailShoppingList(params, emailShoppinglistSuccess)
				},
				emailShoppinglistSuccess = function(data) {
					var $emailmodal = $(".email-shoppinglist-modal");
					data.success && (icadatalayer.add("dashboard-grocery-lists", {
						dashboardGroceryLists: {
							action: "send-list-by-email"
						}
					}), $("fieldset", $emailmodal).trigger("done").trigger("clearform"), $emailmodal.addClass("send-email-success"), $emailmodal.on("close", function() {
						$emailmodal.removeClass("send-email-success")
					}))
				},
				searchInput = function() {
					var inputString = $searchField.val().toLowerCase().replace(/"/g, ""),
						words = [],
						wordcount = 0;
					if ("" === inputString) $searchForm.removeClass("has-input");
					else {
						$searchForm.addClass("has-input");
						for (var i in autocompleteItems) if (0 === autocompleteItems[i].indexOf(inputString) && (words.push(autocompleteItems[i]), wordcount++, wordcount > 3)) break;
						getAutocompleteItems(inputString)
					}
				},
				getAutocompleteItems = function(query) {
					ICA.legacy.shoppingList.getAutocompleteItems(query, updateAutocomplete)
				},
				updateAutocomplete = function(words) {
					var _$items = [];
					if (words && words.length > 0) for (var i in words) if (words.hasOwnProperty(i)) {
						var $word, $wrapper, $item, word = words[i],
							input = $searchField.val().replace(/"/g, ""),
							categoryId = (words[i].Name.substr(input.length, words[i].Name.length), words[i].categoryId),
							wordContent = word.Name.replace(RegExp(input, "gi"), '<span class="strong">$&</span>');
						if ($shoppingList.hasClass("smallscreen") && i > 3) break;
						if (i > autocompleteLimit - 1) break;
						$item = $('<li class="item" data-word="' + word.Name + '" data-categoryid="' + categoryId + '">'), $wrapper = $('<span class="text">'), $word = $('<span class="name">' + wordContent + "</span>"), $wrapper.append($word), $wrapper.append('<span class="amount"></span>'), $wrapper.append('<span class="unit"></span>'), $item.append($wrapper), $item.on("click", function() {
							addItem($(this).clone(), "auto-complete"), $searchField.val(""), $autocompleteList.children().remove()
						}), _$items.push($item)
					}
					$autocompleteList.children().remove(), $autocompleteList.append(_$items)
				},
				traverseAutocomplete = function(e) {
					var $selectedItem = $autocompleteList.children("li.selected"),
						$allItems = $autocompleteList.children("li");
					40 == e.which ? 0 === $selectedItem.length ? $allItems.first().addClass("selected") : ($selectedItem.removeClass("selected"), $selectedItem.next().addClass("selected")) : 38 == e.which && (0 === $selectedItem.length ? $allItems.last().addClass("selected") : ($selectedItem.removeClass("selected"), $selectedItem.prev().addClass("selected")))
				},
				submit = function(e, params) {
					var $selectedAutocompleteItem = $autocompleteList.children("li.selected");
					if ($searchForm.trigger("done"), "" === $searchField.val()) return !1;
					if (1 == $selectedAutocompleteItem.length) {
						var $clonedItem = $selectedAutocompleteItem.clone();
						addItem($clonedItem, "auto-complete")
					} else addItem($searchField.val(), "custom");
					$searchField.val(""), $searchForm.removeClass("has-input"), $searchField.trigger("blur"), setTimeout(function() {
						$("html").hasClass("has-hover") && $searchField.trigger("focus")
					}, 301), updateAutocomplete()
				},
				setupRegularItems = function() {
					var $addButton = $('<a class="button submit action block addtolist first disabled">Lägg till <span class="amount"></span> varor i inköpslistan</a>');
					$regularList = $("#regular-items"), $regularItems = $("#regular-items > .shopping-items"), $modalRegularList = $("#regular-items-list-modal"), $modalRegularItems = $("#regular-items-list-modal > .shopping-items"), $regularList.hasClass("loaded") || ($regularItems.children().each(function() {
						var $me = $(this),
							$twin = $(this).clone();
						$me.on("click", function() {
							$me.hasClass("added") || ($me.addClass("added"), addItem($me.clone(), "common-items-single"), setTimeout(function() {
								$me.remove(), $twin.remove()
							}, 300))
						}), $twin.on("click", function() {
							var numCheckedItems;
							$me.toggleClass("check"), $twin.toggleClass("check"), numCheckedItems = $modalRegularItems.children(".check").length, numCheckedItems > 0 ? ($(".addtolist", $modalRegularList).removeClass("disabled"), $(".addtolist .amount", $modalRegularList).text(numCheckedItems)) : ($(".addtolist", $modalRegularList).addClass("disabled"), $(".addtolist .amount", $modalRegularList).text(""))
						}), $modalRegularItems.append($twin)
					}), $modalRegularItems.children().removeClass("removed"), $modalRegularItems.children().length > 7 && ($modalRegularItems.before($addButton), $modalRegularItems.children("h2").addClass("divided")), $(".button.addtolist", $regularList).on("click", function() {
						var $me = $(this),
							$checkedItems = $modalRegularItems.children(".check"),
							$checkedSideItems = $regularItems.children(".check");
						setTimeout(function() {
							$me.trigger("close"), $checkedItems.remove(), $checkedSideItems.remove(), addItems($checkedItems.clone(), "common-items-multiple"), $(".addtolist", $modalRegularList).addClass("disabled"), $(".addtolist .amount", $modalRegularList).text(""), $modalRegularItems.children().length <= 7 && $(".addtolist.first", $modalRegularList).remove()
						}, 300)
					}), $regularList.addClass("loaded"))
				},
				setupStoreList = function() {
					var $modal = $(".modalbox.sort-order-modal").last();
					$modal.hasClass("sort-modal-loaded") || ($modal.length && $modal.on("change", "input", function(e) {
						if (e.isTrigger) {
							var $input = $(this);
							if ($input.is(":checked")) {
								var newsortorder = $input.val();
								ICA.legacy.setCookie("shoppingRound", newsortorder), $(".selected-list", $modal).removeClass("selected-list"), $input.closest("li").addClass("selected-list"), ICA.legacy.shoppingList.get(context.currentListId, context.currentListSecureId, newsortorder, function(data) {
									icadatalayer.add("dashboard-grocery-lists", {
										dashboardGroceryLists: {
											action: "sort-change"
										}
									}), currentOrderId = newsortorder, 0 == currentOrderId ? $shoppingList.removeClass("sorted") : $shoppingList.addClass("sorted");
									var storelistItems = $("div.sort ul li");
									storelistItems.removeClass("active"), storelistItems.each(function(index) {
										$(this).attr("data-orderid") == newsortorder && $(this).addClass("active")
									}), loadSuccess(data)
								}), setTimeout(function() {
									$input.trigger("close")
								}, 800)
							}
						}
					}), $modal.addClass("sort-modal-loaded"))
				},
				updateTool = function() {
					var _$items = $shoppingList.find("section.list .shopping-items .item"),
						$loadmorebtn = $(".loadmore-wrapper", $shoppingList);
					$shoppingList.find("section.list .shopping-items .item").length;
					$loadmorebtn.find(".amount").text(_$items.length);
					var itemlist = $(".list ul.shopping-items");
					itemlist.height() + itemlist.offset().top > itemlist.parents(".tool.shoppinglist").height() && $(".loadmore-wrapper", $shoppingList).removeClass("removed");
					var $ul = $(".list ul.shopping-items");
					$(".tool.shoppinglist.expanded")[0] && ($ul.height() + $ul.offset().top > $ul.parents(".tool.shoppinglist").height() ? $(".loadmore-wrapper", $shoppingList).removeClass("removed") : $(".loadmore-wrapper", $shoppingList).addClass("removed")), $modalRegularItems.children().length <= 7 && $(".button.addtolist.first", $modalRegularList).remove(), showHideGoToTop(), ICA.dashboard.update()
				};
			return context.updateItem = function(item) {
				ICA.legacy.shoppingList.updateRow({
					productName: item.productName,
					quantity: item.quantity,
					shoppingListId: context.currentListId,
					shoppingListRowId: item.rowId,
					shoppingListSecureId: context.currentListSecureId,
					unit: item.unitType
				}), icadatalayer.add("dashboard-grocery-lists", {
					dashboardGroceryLists: {
						action: "change-item"
					}
				})
			}, context
		}
		return new _shoppingList
	}()
}(jQuery, this, this.document, ICA);
var ICA = ICA || {};
ICA.dashboard = ICA.dashboard || {}, function($, window, document, ICA, undefined) {
	ICA.dashboard.shoppingListItem = function() {
		function _shoppingListItem() {
			var context = ($(document), this),
				$shoppingListItems = null,
				itemSelector = ".item";
			context.init = function(_$el) {
				$shoppingList = _$el, $shoppingListItems = $shoppingList.find("section.list .shopping-items .item"), setup($shoppingListItems), initAttachEvents()
			};
			var initAttachEvents = function() {
					$shoppingListItems.on("keyup", enterPress), $shoppingListItems.on("click", check), $shoppingListItems.on("done", done)
				},
				setup = function($items) {
					$items.each(function() {
						var _$item = $(this);
						if (!_$item.hasClass("item-loaded") || !_$item.hasClass("item-loaded")) {
							var editFields = $('<div class="edit-fields"/>');
							editFields.append($('<span class="remove icon icon-close sprite2"></span>').on("click", remove)), editFields.append($('<span class="done">OK</span>').on("click", done)), _$item.append($('<span class="edit sprite1">Ändra</span>').on("click", edit)), _$item.append(editFields), $.each(_$item.find(".text span.name, .text span.amount"), function() {
								var $me = $(this);
								if (!$me.hasClass("locked")) {
									var $input, placeholder = "";
									$me.hasClass("amount") && (placeholder = "Mängd"), $input = $('<input type="text" value="' + $me.text() + '" class="' + $me[0].className + '" placeholder="' + placeholder + '"/>'), $me.after($input)
								}
							});
							var _$unit = _$item.find("span.unit");
							if (!_$unit.hasClass("locked")) {
								for (var $fieldset = $('<fieldset class="novalidate inline">'), $selectbox = $('<select name="units-select">'), i = 0; i < ICA.dashboard.shoppingList.units.length; i++) {
									var $option = $("<option>" + ICA.dashboard.shoppingList.units[i].toString() + "</option>");
									_$unit.text() == ICA.dashboard.shoppingList.units[i].toString() && $option.attr("selected", "selected"), $selectbox.append($option)
								}
								$fieldset.append($selectbox), _$unit.after($fieldset)
							}
							_$item.addClass("item-loaded")
						}
					})
				},
				edit = function(e) {
					var _$item = $(this).closest(itemSelector);
					_$item.addClass("editing"), _$item.find("input").blur(), _$item.find("input.name").focus(), e.stopPropagation()
				},
				done = function(e) {
					var _$item = $(this).closest(itemSelector),
						_$name = _$item.find("span.name"),
						_$amount = _$item.find("span.amount"),
						_$unit = _$item.find("span.unit"),
						_rowId = _$item.attr("data-rowid");
					e && e.stopPropagation(), _$item.hasClass("editing") && (_$item.find("input.has-placeholder").val(""), _$name.text(_$item.find("input.name").val()), _$amount.text(_$item.find("input.amount").val()), _$unit.text($("select[name=units-select] option:selected", _$item).text()), _$item.removeClass("editing"), ICA.dashboard.shoppingList.updateItem({
						productName: _$name.text(),
						quantity: _$amount.text(),
						rowId: _rowId,
						unitType: _$unit.text()
					}))
				},
				check = function(e) {
					var _$item = $(this),
						_$name = _$item.find(".name"),
						_$amount = _$item.find(".amount"),
						_$unit = _$item.find(".unit");
					if (!_$item.hasClass("editing")) {
						var isStrikedOver = _$item.hasClass("checked");
						isStrikedOver ? (_$item.removeClass("checked"), isStrikedOver = !1) : (_$item.addClass("checked"), isStrikedOver = !0, icadatalayer.add("dashboard-grocery-lists", {
							dashboardGroceryLists: {
								action: "cross-out-item"
							}
						})), quantity = _$amount.text(), productName = _$name.text(), unitType = _$unit.text(), _rowId = _$item.attr("data-rowid"), ICA.legacy.shoppingList.updateRow({
							productName: productName,
							quantity: quantity,
							shoppingListId: ICA.dashboard.shoppingList.currentListId,
							shoppingListSecureId: ICA.dashboard.shoppingList.currentListSecureId,
							shoppingListRowId: _rowId,
							isStrikedOver: isStrikedOver
						})
					}
				},
				remove = function() {
					var _$item = $(this).closest("li");
					_$item.trigger("remove-item", [_$item])
				},
				enterPress = function(e) {
					13 == e.which && done()
				};
			return context.update = function($item) {
				$item.off("keyup.shoppinglist").on("keyup.shoppinglist", enterPress), $item.off("click.shoppinglist").on("click.shoppinglist", check), $item.off("done.shoppinglist").on("done.shoppinglist", done), setup($item)
			}, context
		}
		return new _shoppingListItem
	}()
}(jQuery, this, this.document, ICA);
var ICA = ICA || {};
ICA.dashboard = ICA.dashboard || {}, function($, window, document, ICA, undefined) {
	ICA.dashboard.tool = function() {
		function _tool() {
			var context = ($(document), this),
				toolButtonSelector = ".toolbar .toolbtn",
				toolNameDataAttr = "tool-name",
				loadedDataAttr = "loaded",
				$tools = "",
				$toolButtons = "";
			context.init = function(_$tools) {
				$tools = _$tools, $tools.data(loadedDataAttr, !1), $toolButtons = $(toolButtonSelector), $tools.each(function() {
					var $tool = $(this);
					("" !== $tool.html().trim() || $tool.hasClass("loaded")) && ($tool.data(loadedDataAttr, !0), $tool.trigger("tool-ready"))
				}), initAttachEvents()
			};
			var initAttachEvents = function() {
					$tools.on("activate-tool", activate), $tools.on("deactivate-tool", deactivate), $tools.on("reload", reloadTool), $toolButtons.on("click", function(e) {
						var section = $(e.target).text();
						icadatalayer.add("dashboard", {
							dashboard: {
								action: "menu-click",
								section: section
							}
						})
					})
				},
				activate = function(e) {
					var _$tool = $(this),
						_$button = $toolButtons.filter("." + _$tool.data(toolNameDataAttr));
					_$tool.addClass("active"), _$button.addClass("tool-active"), context.loaded || setTimeout(function() {
						loadTool(_$tool)
					}, 100)
				},
				deactivate = function() {
					var _$tool = $(this),
						_$button = $toolButtons.filter("." + _$tool.data(toolNameDataAttr));
					_$tool.removeClass("active"), _$button.removeClass("tool-active")
				},
				loadTool = function(_$tool) {
					var url = _$tool.data("url");
					if (!_$tool.hasClass("loaded")) {
						_$tool.addClass("loading-data"), _$tool.ajaxLoader({
							zindex: 100,
							length: 9,
							width: 3,
							radius: 9,
							left: "50%",
							top: "50%"
						});
						var params = {
							state: _$tool.data("state")
						},
							__$tool = _$tool;
						ICA.legacy.get(url, params, function(data) {
							loadSuccess(data, __$tool)
						})
					}
				},
				reloadTool = function() {
					_$tool = $(this), context.loaded = !1, _$tool.removeClass("loaded"), loadTool(_$tool)
				},
				loadSuccess = function(data, _$tool) {
					_$tool.html(data), _$tool.removeClass("loading-data"), _$tool.trigger("initDom"), _$tool.trigger("tool-ready"), ICA.dashboard.$dashboard.css("height", "")
				};
			return context
		}
		return new _tool
	}()
}(jQuery, this, this.document, ICA);
var ICA = ICA || {};
ICA.dashboard = ICA.dashboard || {}, function($, window, document, ICA, undefined) {
	ICA.dashboard.weekplanner = function() {
		function _weekplanner() {
			var context = ($(document), this),
				$weekplanner = null,
				recipes = null,
				selectedWeekPlan = undefined,
				selectedWeekPlanCookieName = "",
				selectedWeekPlanItemId = undefined,
				selectedWeekPlanItemName = undefined,
				itemsVeckoplans = ".recipes",
				$modal = undefined;
			context.init = function(_$el) {
				$weekplanner = _$el, recipes = $(".recipes > ul > li", $weekplanner), selectedWeekPlanCookieName = ICA.legacy.loggedIn ? "weekPlanLoggedInUserCookie" : "weekPlanAnonymousUserCookie", initAttachEvents()
			};
			var initAttachEvents = function() {
					$weekplanner.on("tool-ready", setup), $weekplanner.on("click", "a.confirmdeleteweekplan", function(e) {
						e.preventDefault(), selectedWeekPlanItemId = $(e.currentTarget).data("weekplanitemid"), selectedWeekPlanItemName = $(e.currentTarget).data("weekplanitemname"), window.triggerAsModal($("#deleteweekplan").html(), "remove-recipe dialog")
					}), $(window).on("select-list", selectNewWeekplan).on("delete-list", deleteWeekplan).on("rename-list", renameWeekplan).on("create-list", createNewWeekplan), $(window).on("initDom", function(e) {
						$(e.target).hasClass("weekplan-recipetip-modal") ? ICA.dashboard.weekplanner.randomRecipeModal.init($(e.target)) : $(e.target).parent().hasClass("remove-recipe") && setupRemoveModal($(e.target))
					})
				},
				selectNewWeekplan = function(e, selectedList) {
					$(e.target).is(".edit-weekplan-modal") && (icadatalayer.add("dashboard-weekplans", {
						dashboardWeekplans: {
							action: "choose-weekplan"
						}
					}), selectedWeekPlan = selectedList, ICA.legacy.setCookie(selectedWeekPlanCookieName, selectedWeekPlan), setTimeout(function() {
						$weekplanner.trigger("reload")
					}, 100))
				},
				deleteWeekplan = function(e, listId, nextListId) {
					$(e.target).is(".edit-weekplan-modal") && ICA.legacy.weekPlan.removeWeekplan(listId, function(data) {
						data.success && listId == selectedWeekPlan && (icadatalayer.add("dashboard-weekplans", {
							dashboardWeekplans: {
								action: "remove-weekplan"
							}
						}), nextListId && ICA.legacy.setCookie(selectedWeekPlanCookieName, nextListId), setTimeout(function() {
							$weekplanner.trigger("reload")
						}, 100))
					})
				},
				renameWeekplan = function(e, listId, newName) {
					$(e.target).is(".edit-weekplan-modal") && ICA.legacy.weekPlan.renameWeekplan(listId, newName, function(data) {
						data.success && selectedWeekPlan == listId && (icadatalayer.add("dashboard-weekplans", {
							dashboardWeekplans: {
								action: "rename-weekplan"
							}
						}), $(".active-weekplan-name").text(newName))
					})
				},
				createNewWeekplan = function(e, listName) {
					$(e.target).is(".edit-weekplan-modal") && ICA.legacy.weekPlan.createWeekplan(listName, function(data) {
						data.success && (icadatalayer.add("dashboard-weekplans", {
							dashboardWeekplans: {
								action: "new-weekplan"
							}
						}), $weekplanner.trigger("reload"))
					})
				},
				removeRecipe = function(e, recipe) {
					ICA.legacy.weekPlan.removeRecipe({
						weekPlanItemId: selectedWeekPlanItemId
					}, removeSuccess)
				},
				removeSuccess = function(data) {
					icadatalayer.add("dashboard-weekplans", {
						dashboardWeekplans: {
							action: "remove-recipe",
							recipe: selectedWeekPlanItemName
						}
					});
					var dayNumber = data.message;
					setTimeout(function() {
						ICA.legacy.get("/Templates/ajaxresponse.aspx?ajaxFunction=DashboardWeekplanWeek", {
							Weekdaynumber: dayNumber
						}, function(data) {
							var $newRecipe = $(data);
							$weekplanner.find(".dashboardweekplanrecipes li:eq(" + (dayNumber - 1) + ")").replaceWith($newRecipe), ICA.dashboard.recipe.init($newRecipe), $newRecipe.initDom()
						})
					}, 200)
				},
				setupRemoveModal = function($modalbox) {
					var $modal = $modalbox;
					$modal.hasClass("removerecipe-modal-loaded") || ($modal.length && $("button.remove", $modal).on("click", function(e) {
						removeRecipe(), $modal.trigger("close", [!1, !0]), $modal.remove()
					}), $modal.addClass("removerecipe-modal-loaded"))
				},
				setupAddWeekPlanModal = function() {
					$modal = $(".modalbox.add-weekplan-to-shopping-list").last(), $modal.hasClass("add-weekplan-to-shopping-list-loaded") || ($modal.length && $modal.find(".add.block").off("click").on("click", function(e) {
						for (var target = $(e.target), recipes = $(".recipes > ul > li", $weekplanner).not(".empty").find(".recipeId"), recipeIds = new Array, i = 0; i < recipes.length; i++) recipes[i] != undefined && "" != recipes[i] && recipeIds.push($(recipes[i]).val());
						ICA.legacy.shoppingList.addRecipe({
							recipeIds: recipeIds,
							shoppingListId: $(target).closest(".add.block").data("listid"),
							numberofServings: 4,
							shoppingListName: $(target).html()
						}, addWeekplanToShoppinglistSuccess)
					}), $modal.addClass("add-weekplan-to-shopping-list-loaded"))
				},
				setupModals = function() {
					setupAddWeekPlanModal()
				},
				setup = function() {
					var selectedWeekPlanId = ICA.legacy.getCookie(selectedWeekPlanCookieName);
					selectedWeekPlanId && (selectedWeekPlan = selectedWeekPlanId), recipes.each(function() {
						ICA.dashboard.recipe.init($(this))
					}), $weekplanner.on("remove-recipe", removeRecipe), setupModals(), $(window).on("initDom", setupModals);
					var weekSearchItem = $weekplanner.find(itemsVeckoplans);
					weekSearchItem[0] && weekSearchItem.children.length > 0 && ICA.fn.isMobileDevice() && weekSearchItem.create(overflowScroll)
				},
				addWeekplanToShoppinglistSuccess = function(data) {
					"success" in data && data.success && ("message" in data && data.message && ($modal.find("header").remove(), $modal.find(".add-recipe-to-shoppinglist").html("<strong>" + data.message + "</strong>")), $modal.trigger("close", [!1, !0])), $weekplanner.trigger("reload"), $("#dashboard .tool.shoppinglist").trigger("reload"), dataLayer.push({
						event: "recipe-add-to-weekplan"
					})
				};
			return context.addToWeekplanSuccess = function(data, dayNumber, recipeName) {
				icadatalayer.add("dashboard-weekplans", {
					dashboardWeekplans: {
						action: "add-recipe",
						recipe: recipeName
					}
				}), ICA.legacy.get("/Templates/ajaxresponse.aspx?ajaxFunction=DashboardWeekplanWeek", {
					Weekdaynumber: dayNumber
				}, function(data) {
					var $newRecipe = $(data);
					$weekplanner.find(".dashboardweekplanrecipes li:eq(" + (dayNumber - 1) + ")").replaceWith($newRecipe), ICA.dashboard.recipe.init($newRecipe), $newRecipe.initDom()
				})
			}, context
		}
		return new _weekplanner
	}()
}(jQuery, this, this.document, ICA);
var ICA = ICA || {};
ICA.dashboard = ICA.dashboard || {}, ICA.dashboard.weekplanner = ICA.dashboard.weekplanner || {}, function($, window, document, ICA, undefined) {
	ICA.dashboard.weekplanner.randomRecipeModal = function() {
		function _randomRecipeModal() {
			var context = ($(document), this);
			context.init = function($el) {
				context.$el = $el, context.$el.on("initDom", setupAddWeekPlan)
			};
			var setupAddWeekPlan = function(e) {
					if ($(e.target).hasClass("fetched") || $(e.target).hasClass("random-recipe")) {
						var fetchedContent = $(e.target);
						$(".addtoweekplanpost", fetchedContent).on("click", function(e) {
							e.preventDefault();
							var recipeId = $(e.currentTarget).data("recipeid"),
								recipeName = $(e.currentTarget).data("recipename"),
								dayNumber = $(e.currentTarget).data("day");
							ICA.legacy.weekPlan.addRecipeToSelected({
								recipeId: recipeId,
								dayNum: dayNumber
							}, function(data) {
								ICA.dashboard.weekplanner.addToWeekplanSuccess(data, dayNumber, recipeName)
							}), $(e.target).trigger("close", [!1, !0])
						})
					}
				};
			return context
		}
		return new _randomRecipeModal
	}()
}(jQuery, this, this.document, ICA);
var ICA = ICA || {};
ICA.Components = ICA.Components || {}, ICA.Components.BreadCrumbs = function(args, callback) {
	var breadcrumbs = {
		opt: $.extend({}, args),
		obj: $(this),
		list: $("> ol", this),
		items: $("> ol > li", this),
		tidyUp: function(count) {
			var removables = breadcrumbs.items.filter(":gt(0):lt(-2)"),
				lastitem = breadcrumbs.items.eq(-1),
				nextlastitem = breadcrumbs.items.eq(-2);
			if (breadcrumbs.list.width() > breadcrumbs.obj.width() && count < 30) if (lastitem.position().left < breadcrumbs.obj.width() - 30) breadcrumbs.items.last().addClass("truncate").find("a").css("width", breadcrumbs.obj.width() - lastitem.position().left + 5), breadcrumbs.tidyUp(count + 1);
			else if (removables.filter(":not(.hidden)").length) removables.filter(":not(.hidden)").first().addClass("hidden"), breadcrumbs.tidyUp(count + 1);
			else {
				if (nextlastitem.hasClass("truncated")) return !1;
				nextlastitem.addClass("truncated").find("a").css("width", breadcrumbs.list.width() - breadcrumbs.obj.width()), breadcrumbs.tidyUp(count + 1)
			}
		},
		resize: function() {
			clearTimeout(breadcrumbs.resizeto), breadcrumbs.resizeto = setTimeout(function() {
				breadcrumbs.items.removeClass("truncated hidden").find("a").removeAttr("style"), breadcrumbs.tidyUp(0)
			}, 100)
		},
		init: function() {
			breadcrumbs.resize(), $(window).on("resize", breadcrumbs.resize), "function" == typeof callback && callback.call(breadcrumbs.obj)
		}
	};
	return breadcrumbs.init()
};
var ICA = ICA || {};
ICA.Components = ICA.Components || {}, ICA.Components.Calculate = function() {
	var calc = {
		obj: $(this),
		target: $($(this).data("value")),
		math: $(this).data("math"),
		gcd: function(a, b) {
			return b ? calc.gcd(b, a % b) : a
		},
		dec2Frac: function(num) {
			num = parseFloat(num), num > 20 ? num = num.toFixed(0) : num > 10 ? (num = num.toFixed(1), num = Math.round(num)) : num = num > 1 ? num.toFixed(2) : num > .1 ? num.toFixed(3) : num.toFixed(4);
			var factors = num.toString().split("."),
				integer = factors[0];
			return factors.length > 1 && "33" === factors[1].substring(0, 2) ? ("0" !== integer ? integer + " " : "") + "1/3" : factors.length > 1 && ("66" === factors[1].substring(0, 2) || "67" === factors[1].substring(0, 2)) ? ("0" !== integer ? integer + " " : "") + "2/3" : (num < 10 && (num = Math.round(10 * num) / 10), new window.Fraction(num).toString())
		},
		init: function() {
			calc.target && calc.target.on("change", function() {
				if (calc.math && calc.math.split("$").length > 1) var value = eval(calc.obj.attr("data-math").replace("$", calc.target.val()));
				else var value = calc.target.val();
				calc.obj.text(calc.dec2Frac(value.toFixed(5)))
			})
		}
	};
	return calc.init()
};
var ICA = ICA || {};
ICA.Components = ICA.Components || {}, ICA.Components.Carousel = function(args, callback) {
	var carousel = {
		opt: $.extend({
			controls: !0,
			multiple: !1,
			snap: !0,
			interval: 0,
			loop: !1
		}, args),
		obj: $(this).addClass("carousel"),
		translate3d: "CSSMatrix" in window && "m11" in new CSSMatrix || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix || "MozCSSMatrix" in window && "m11" in new MozCSSMatrix || "MSCSSMatrix" in window && "m11" in new MSCSSMatrix,
		translate2d: "CSSMatrix" in window || "WebKitCSSMatrix" in window || "MozCSSMatrix" in window || "MSCSSMatrix" in window,
		transition: function(s) {
			return "transition" in s || "webkitTransition" in s || "MozTransition" in s || "msTransition" in s || "OTransition" in s
		}(document.createElement("div").style),
		list: $(">ul", this),
		items: $(">ul>li", this),
		left: 0,
		adjustLeft: !0,
		startPos: {
			x: 0,
			y: 0
		},
		movePos: {
			x: 0,
			y: 0
		},
		maxLeft: 0,
		minLeft: 0,
		index: 0,
		istouching: !1,
		ismoving: !1,
		touchstart: function(e) {
			e = e.originalEvent, carousel.istouching = !0, carousel.list.addClass("touching").removeClass("animate flicking"), clearInterval(carousel.slideshow), e && (carousel.startPos = {
				x: e.touches && 0 != e.touches[0].pageX ? e.touches[0].pageX : e.pageX,
				y: e.touches && 0 != e.touches[0].pageY ? e.touches[0].pageY : e.pageY,
				t: new Date
			}, carousel.obj.on("touchmove mousemove", carousel.touchmove).on("touchend mouseup mouseout", carousel.touchend))
		},
		touchmove: function(e) {
			if (e = e.originalEvent, carousel.istouching && e) {
				if (carousel.movePos = {
					x: carousel.startPos.x - (e.touches && 0 != e.touches[0].pageX ? e.touches[0].pageX : e.pageX),
					y: carousel.startPos.y - (e.touches && 0 != e.touches[0].pageY ? e.touches[0].pageY : e.pageY)
				}, !carousel.ismoving && Math.abs(carousel.movePos.y) > Math.abs(carousel.movePos.x) ? carousel.isscrolling = !0 : (carousel.ismoving = !0, carousel.list.addClass("moving")), !carousel.obj.hasClass("multiple") && carousel.ismoving && Math.abs(carousel.movePos.x) > 50) {
					var direction = carousel.movePos.x;
					carousel.touchend(), direction < 0 ? carousel.prev(!0) : carousel.next(!0)
				}
				carousel.ismoving && (e.preventDefault(), carousel.moveBy(carousel.movePos.x))
			}
		},
		touchend: function() {
			carousel.istouching && (carousel.istouching = carousel.isscrolling = !1, carousel.list.removeClass("touching moving")), carousel.ismoving = !1;
			var flicked = carousel.opt.flick && new Date - carousel.startPos.t < 200;
			flicked && carousel.obj.addClass("flicking"), carousel.opt.snap && (carousel.left -= carousel.movePos.x, carousel.snap()), carousel.movePos = {
				x: 0,
				y: 0
			}, carousel.obj.off("touchmove mousemove", carousel.touchmove).off("touchend mouseup mouseout", carousel.touchend)
		},
		click: function() {
			if (carousel.ismoving) return !1
		},
		snap: function() {
			var items = carousel.opt.loop ? $(">li", carousel.list) : carousel.items;
			items.eq(carousel.getClosestItem(carousel.left)).trigger("activate")
		},
		getClosestItem: function(left) {
			var closest = 0,
				diff = 9999,
				items = carousel.opt.loop ? $(">li", carousel.list) : carousel.items;
			return items.each(function(i) {
				var itemposition = this.offsetLeft,
					itemwidth = this.offsetWidth;
				carousel.adjustLeft ? Math.abs(itemposition + left) < diff && (closest = i, diff = Math.abs(itemposition + left)) : Math.abs(itemposition + itemwidth + left - carousel.obj.width()) < diff && (closest = i, diff = Math.abs(itemposition + itemwidth + left - carousel.obj.width()))
			}), closest
		},
		controls: {
			prevbtn: $('<a href="#" role="carousel-button" class="prevbtn sprite1" rel="prev">Prev</a>'),
			nextbtn: $('<a href="#" role="carousel-button" class="nextbtn sprite1" rel="next">Next</a>'),
			enable: function() {
				carousel.controls.setup(), carousel.controls.prevbtn.appendTo(carousel.obj), carousel.controls.nextbtn.appendTo(carousel.obj)
			},
			disable: function() {
				carousel.controls.prevbtn.detach(), carousel.controls.nextbtn.detach()
			},
			setup: function() {
				carousel.opt.loop || (carousel.left - carousel.obj.width() - 20 > -(carousel.items.last()[0].offsetLeft + carousel.items.last()[0].offsetWidth) ? carousel.controls.nextbtn.removeClass("hide") : carousel.controls.nextbtn.addClass("hide"), carousel.left < -20 ? carousel.controls.prevbtn.removeClass("hide") : carousel.controls.prevbtn.addClass("hide"))
			},
			init: function() {
				carousel.controls.setup(), carousel.controls.prevbtn.on("click", carousel.prev).appendTo(carousel.obj), carousel.controls.nextbtn.on("click", carousel.next).appendTo(carousel.obj)
			}
		},
		moveTo: function(index, animate) {
			if (animate || carousel.list.removeClass("animate"), carousel.opt.loop) {
				var items = $("> li", carousel.list);
				item = items.eq(index + items.index(carousel.items.first()))
			} else var item = carousel.items.eq(index);
			if (!carousel.opt.loop && carousel.opt.multiple) {
				var lastitem = carousel.items.last(),
					firstitem = carousel.items.first();
				carousel.adjustLeft && lastitem[0].offsetLeft + lastitem.width() < item[0].offsetLeft + carousel.obj.width() ? (index = carousel.items.length - 1, item = lastitem, carousel.adjustLeft = !1) : !carousel.adjustLeft && carousel.obj.width() - item[0].offsetLeft - item.width() > 0 && (index = 0, item = firstitem, carousel.adjustLeft = !0)
			}
			carousel.adjustLeft ? carousel.left = -item[0].offsetLeft : carousel.left = -(item[0].offsetLeft - (carousel.obj.width() - item.width())), carousel.index = index, carousel.move(carousel.left, animate), carousel.controls.setup(), carousel.opt.loop && (clearTimeout(carousel.resetloopto), carousel.resetloopto = setTimeout(carousel.resetLoop, 300))
		},
		moveBy: function(deltaX) {
			carousel.opt.loop || (deltaX /= carousel.index <= 0 || carousel.index >= carousel.items.length - 1 ? Math.abs(deltaX) / carousel.obj.width() * 2 + 1 : 1);
			var left = carousel.left - deltaX;
			left > 0 || carousel.opt.loop ? carousel.adjustLeft = !0 : left < -(carousel.list.width() - carousel.obj.width()) && (carousel.adjustLeft = !1), carousel.move(left)
		},
		move: function(left, animate) {
			var css;
			animate && carousel.list.addClass("animate"), css = carousel.translate3d ? {
				"-webkit-transform": "translate3d(" + left + "px, 0, 0 )",
				"-moz-transform": "translate3d(" + left + "px, 0, 0 )",
				transform: "translate3d(" + left + "px, 0, 0 )"
			} : carousel.translate2d ? {
				"-webkit-transform": "translate(" + left + "px, 0)",
				"-moz-transform": "translate(" + left + "px, 0)",
				transform: "translate(" + left + "px, 0)"
			} : {
				"margin-left": left + "px"
			}, animate && !carousel.transition ? carousel.list.animate(css, 500) : carousel.list.css(css)
		},
		activateItem: function(e, noanimate) {
			e.stopPropagation();
			var items = carousel.opt.loop ? $("> li", carousel.list) : carousel.items;
			items.trigger("inactivate");
			var index = items.index($(this).addClass("active")) - items.index(carousel.items.first());
			carousel.moveTo(index, !noanimate)
		},
		inactivateItem: function() {
			$(this).removeClass("active")
		},
		getPrevItem: function() {
			var items = carousel.opt.loop ? $("> li", carousel.list) : carousel.items,
				index = carousel.opt.loop ? carousel.index + items.index(carousel.items.first()) : carousel.index,
				activeitem = items.eq(index),
				item = items.eq(index);
			if (carousel.opt.multiple && activeitem.width() < carousel.obj.width()) for (; index >= 0;) {
				if (item = items.eq(index), carousel.adjustLeft) {
					if (item[0].offsetLeft < -carousel.left - carousel.obj.width()) return item
				} else if (item[0].offsetLeft < -carousel.left) return item;
				index--
			} else item = item.prev("li").length ? item.prev("li") : item;
			return item
		},
		getNextItem: function() {
			var items = carousel.opt.loop ? $("> li", carousel.list) : carousel.items,
				index = carousel.opt.loop ? carousel.index + items.index(carousel.items.first()) : carousel.index,
				activeitem = items.eq(index),
				item = items.eq(index);
			if (carousel.opt.multiple && activeitem.width() < carousel.obj.width()) for (; index < items.length;) {
				if (item = items.eq(index), carousel.adjustLeft) {
					if (item[0].offsetLeft + item.width() > -carousel.left + carousel.obj.width()) return item
				} else if (item[0].offsetLeft.left + item.width() - carousel.obj.width() > activeitem[0].offsetLeft.left + activeitem.width()) return item;
				index++
			} else item = activeitem.next("li").length ? activeitem.next("li") : activeitem;
			return item
		},
		prev: function() {
			return carousel.getPrevItem().trigger("move"), !1
		},
		next: function() {
			return carousel.getNextItem().trigger("move"), !1
		},
		prevent: function(e) {
			return e && (e.stopPropagation(), e.preventDefault()), !1
		},
		activate: function(namespace) {
			namespace = namespace ? namespace : "carousel", carousel.activated || (carousel.obj.on("touchstart." + namespace + " mousedown." + namespace, carousel.touchstart).on("move." + namespace, "li", carousel.activateItem).on("inactivate." + namespace, "li", carousel.inactivateItem).on("click." + namespace, carousel.click).on("dragstart." + namespace, carousel.prevent), carousel.left = 0, carousel.controls.enable(), carousel.activated = !0)
		},
		inactivate: function(namespace) {
			namespace = namespace ? namespace : "carousel", carousel.obj.off("touchstart." + namespace + " mousedown." + namespace).off("activate." + namespace).off("inactivate." + namespace).off("click." + namespace).off("dragstart." + namespace), carousel.moveTo(0), carousel.list.removeAttr("style"), carousel.items.removeClass("active"), carousel.left = 0, carousel.items.width(""), clearTimeout(carousel.timeout), carousel.controls.disable(), carousel.activated = !1
		},
		step: function() {
			return carousel.index ? carousel.index == carousel.items.length - 1 && (carousel.direction = -1) : (carousel.index = 0, carousel.direction = 1), carousel.items.eq(carousel.index + carousel.direction).trigger("activate"), !1
		},
		pause: function() {
			clearInterval(carousel.interval), carousel.running = !1, carousel.obj.off("mouseover", carousel.pause), carousel.obj.on("mouseout", carousel.run)
		},
		run: function() {
			carousel.opt.interval && carousel.opt.interval > 0 && (carousel.running = !0, clearInterval(carousel.interval), carousel.interval = setInterval(carousel.step, carousel.opt.interval), carousel.obj.off("mouseout", carousel.run), carousel.obj.on("mouseover", carousel.pause))
		},
		distributeItems: function() {
			var hasTable = carousel.list.is(".table");
			hasTable && carousel.list.removeClass("table");
			var beforeitems = carousel.items.clone(1).appendTo(carousel.list);
			carousel.items.clone(1).prependTo(carousel.list), hasTable && carousel.list.addClass("table"), carousel.index = beforeitems.length, carousel.moveTo(carousel.index, !1)
		},
		resetLoop: function() {
			var newindex;
			newindex = carousel.index < 0 ? carousel.items.length + carousel.index : carousel.index % carousel.items.length, newindex != carousel.index && carousel.moveTo(newindex, !1)
		},
		setup: function() {
			if (carousel.obj.is(".carousel")) {
				var items = carousel.opt.loop ? $(">li", carousel.list) : carousel.items;
				carousel.opt.multiple ? (items.width(""), items.eq(carousel.index).trigger("activate")) : (items.width(carousel.obj.width()), items.eq(carousel.index).trigger("activate", !0)), carousel.list.width() > carousel.obj.width() ? carousel.activated || carousel.activate() : carousel.activated && carousel.inactivate(), carousel.activate(), carousel.opt.multiple && !carousel.obj.is(".table"), carousel.opt.interval > 0 && !carousel.running && carousel.run()
			}
		},
		resize: function() {
			clearTimeout(carousel.timeout), carousel.timeout = setTimeout(carousel.setup, 200)
		},
		init: function() {
			return carousel.obj.hasClass("multiple") ? carousel.opt.multiple = !0 : carousel.opt.multiple && carousel.obj.addClass("multiple"), carousel.obj.attr("data-loop") && "false" != carousel.obj.attr("data-loop") && (carousel.opt.loop = !0), carousel.obj.attr("data-snap") && "true" != carousel.obj.attr("data-snap") && (carousel.opt.snap = !1), carousel.obj.attr("data-interval") && "false" != carousel.obj.attr("data-loop") && (carousel.opt.interval = carousel.obj.attr("data-interval")), carousel.obj.on("addclass", function(e, classList) {
				classList.match(/carousel/g) && carousel.activate(), classList.match(/multiple/g) && (carousel.opt.multiple = !0, carousel.setup())
			}).on("removeclass", function(e, classList) {
				classList.match(/carousel/g) && carousel.inactivate(), classList.match(/multiple/g) && (carousel.opt.multiple = !1, carousel.setup())
			}), carousel.items.length > 1 && (carousel.setup(), setTimeout(carousel.setup, 2e3), carousel.controls.init(), carousel.opt.loop && carousel.distributeItems(), carousel.obj.addClass("carousel-loaded"), carousel.opt.loop || carousel.moveTo(carousel.index, !1), "function" == typeof callback && callback.call(carousel), $(window).on("resize", carousel.resize)), carousel
		}
	};
	if (!$(this).hasClass("carousel-loaded")) return carousel.init()
};
var ICA = ICA || {};
ICA.Components = ICA.Components || {}, ICA.Components.Details = function(args, callback) {
	var details = {
		opt: $.extend({
			history: !0,
			openonload: !1,
			dropdown: !1,
			toggleble: !0,
			accordion: !1,
			multiple: !1,
			animate: !1,
			noopenonloadmobile: !1,
			scrollonopenmobile: !1,
			alwaysopen: !1,
			noalwaysopenmobile: !1,
			openonlyfirst: !1
		}, args),
		obj: $(this),
		toggleClass: $(this).attr("data-toggleclass"),
		isOpen: $(this).hasClass("open"),
		summary: $("> .summary", this).first().attr({
			role: "button",
			"aria-pressed": !1
		}),
		content: $("> .wrapper", this).length ? $("> .wrapper", this) : $(">*:not(.summary, summary)", this).wrapAll('<div class="wrapper"></div>').parent(),
		toggle: function(e) {
			return e.preventDefault(), details.isOpen && details.opt.toggleble ? details.obj.trigger("toggle-close", [details.opt.animate, !0]) : details.obj.trigger("toggle-open", details.opt.animate), !1
		},
		open: function(e, animate) {
			if (e && e.stopPropagation(), details.isOpen = !0, details.opt.scrollonopenmobile && $(window).checkSize("small")) {
				console.log($(window).checkSize("small"));
				var subtractHeight = 0;
				if (details.summary.parent().prev(".open").length > 0 && (subtractHeight = details.summary.parent().prev(".open").height(), subtractHeight -= details.summary.height()), details.summary[0]) {
					var scrollTop = details.summary.offset().top - 20 - subtractHeight;
					scrollTop > 0 && $("html, body").animate({
						scrollTop: scrollTop
					})
				}
			}
			animate && !details.opt.dropdown && details.obj.height(details.summary.outerHeight()), details.obj.addClass("open"), animate && !details.opt.dropdown && (setTimeout(function() {
				details.obj.addClass("animate"), details.obj.height(details.content.outerHeight(!0) + details.summary.outerHeight(!0))
			}, 100), setTimeout(function() {
				details.obj.removeClass("animate").height("")
			}, 500)), details.summary.attr({
				"aria-pressed": !0
			}).addClass("active"), details.content.attr({
				"aria-expanded": !0
			}), details.toggleClass && details.obj.addClass(details.toggleClass), details.opt.dropdown ? (details.content.css({
				right: 0,
				top: 0
			}), details.content.offset().left < 0 && details.content.css({
				right: "auto",
				left: "100%",
				"margin-left": "-20px"
			})) : details.content.css({
				right: "auto"
			}), details.opt.accordion && !details.opt.multiple && details.obj.siblings().trigger("toggle-close", !0), details.obj.trigger("toggle-open-bubble"), $(document).trigger("resize"), details.opt.dropdown && setTimeout(function() {
				details.summary.on("mousedown touchstart", details.mousedown), details.content.on("mousedown touchstart", details.mousedown).on("keydown", details.keydown), $(document).on("mousedown.details touchstart.details", details.close), $(document).on("keydown", details.keydown)
			}, 100), details.opt.history && details.obj.attr("id") && details.obj.trigger("addtoHash", {
				detaljer: details.obj.attr("id")
			})
		},
		close: function(e, animate, selfclose) {
			if (e && e.stopPropagation(), details.isOpen) {
				if (details.opt.alwaysopen && selfclose && (details.opt.alwaysopenmobile || !details.opt.alwaysopenmobile && ICA.config && $(window).width() > ICA.config.pageBaseSizes.md)) return;
				details.isOpen = !1, animate && !details.opt.dropdown ? (details.obj.height(details.obj.height()), setTimeout(function() {
					details.obj.addClass("animate").removeClass("open"), details.obj.height(details.summary.outerHeight())
				}, 100), setTimeout(function() {
					details.obj.removeClass("animate").height("")
				}, 500)) : details.obj.removeClass("open"), details.summary.attr({
					"aria-pressed": !1
				}).removeClass("active"), details.content.attr({
					"aria-expanded": !1
				}), details.toggleClass && details.obj.removeClass(details.toggleClass), details.obj.trigger("toggle-close-bubble")
			}
			details.opt.dropdown && (details.summary.off("mousedown touchstart", details.mousedown), details.content.off("mousedown touchstart", details.mousedown).off("keydown", details.keydown), $(document).off("mousedown.details touchstart.details", details.close).off("keydown", details.keydown)), details.opt.history && details.obj.attr("id") && details.obj.trigger("removefromHash", {
				detaljer: details.obj.attr("id")
			})
		},
		mousedown: function(e) {
			e.stopPropagation()
		},
		keydown: function(e) {
			27 == e.keyCode && details.close()
		},
		activate: function() {
			details.toggleicon.prependTo(details.summary), details.obj.hasClass("open") ? (details.isOpen = !0, details.content.attr({
				"aria-expanded": !0
			})) : details.content.attr({
				"aria-expanded": !1
			}), details.summary.on("click", details.toggle), details.obj.addClass("details-loaded").on("toggle-open", details.open).on("toggle-close", details.close)
		},
		inactivate: function() {
			details.toggleicon.remove(), details.summary.off("click", details.toggle), details.obj.off("toggle-open", details.open).off("toggle-close", details.close)
		},
		init: function() {
			function getAccordionToOpenFromQueryParameter() {
				var categoryFromQueryParam;
				if (categoryFromQueryParam = window.location.hash, (categoryFromQueryParam.match(/#/g) || []).length < 2) categoryFromQueryParam = categoryFromQueryParam.replace("#:detaljer=qid_", "");
				else {
					var regExp = /#:detaljer=qid_(.*?)#/,
						matches = regExp.exec(categoryFromQueryParam);
					categoryFromQueryParam = matches[1]
				}
				return categoryFromQueryParam
			}
			details.toggleicon = $('<a class="icon icon-toggle sprite1"></a>'), details.obj.parent().hasClass("accordions") && (details.opt.accordion = !0, details.obj.attr("data-animate") && "false" == details.obj.attr("data-animate") ? details.opt.animate = !1 : details.opt.animate = !0, details.obj.parent().hasClass("multiple") && (details.opt.multiple = !0)), details.obj.hasClass("dropdown") && (details.opt.dropdown = !0), details.obj.attr("data-animate") && "false" != details.obj.attr("data-animate") && (details.opt.animate = !0), details.obj.closest("[data-history=false]").length && (details.opt.history = !1);
			var openAccordionElId = getAccordionToOpenFromQueryParameter(),
				openOnLoadFromQueryParam = details.obj.attr("id") === "qid_" + openAccordionElId;
			(details.obj.closest("[data-openonload=true]").length || openOnLoadFromQueryParam) && (details.opt.openonload = !0), details.obj.closest("[data-noopenonloadmobile=true]").length && (details.opt.noopenonloadmobile = !0), details.obj.closest("[data-scrollonopenmobile=true]").length && (details.opt.scrollonopenmobile = !0), details.obj.closest("[data-alwaysopen=true]").length && (details.opt.alwaysopen = !0), details.obj.closest("[data-alwaysopenmobile=true]").length && (details.opt.alwaysopenmobile = !0), details.activate(), details.obj.on("addclass", function(e, classList) {
				classList.match(/details/g) && details.activate()
			}).on("removeclass", function(e, classList) {
				classList.match(/details/g) && details.inactivate()
			}), "function" == typeof callback && callback.call(details);
			var skip = !1;
			if (details.opt.history && details.obj.attr("id") && "detaljer" in window.theform.hashparams && ($.inArray(details.obj.attr("id"), window.theform.hashparams.detaljer) > -1 || window.theform.hashparams.detaljer == details.obj.attr("id")) && (details.open(), skip = !0), details.opt.openonload && !skip) {
				if (details.opt.noopenonloadmobile && $(window).checkSize("mobile")) return;
				details.open()
			}
			return details
		}
	};
	if (!$(this).hasClass("details-loaded")) return details.init()
};
var ICA = ICA || {};
ICA.Components = ICA.Components || {}, ICA.Components.FormHandler = function(args, callback) {
	var form = {
		opt: $.extend({
			submitonchange: !1,
			validate: !0,
			noSubmit: !1
		}, args),
		obj: $("form"),
		container: $(this),
		isvalid: !0,
		isactive: !1,
		fields: $("input, select, textarea", this),
		Field: function() {
			var field = {
				obj: $(this),
				isvalid: !0,
				validateOnlyCorrect: !1,
				label: void 0,
				epiXForm: $(this).closest(".EPi.xForm").length > 0,
				error: $(this).next(".error").length ? $(this).next(".error") : $('<p class="error">Error</p>'),
				required: $(this).is("[required], .required"),
				focus: function() {
					field.obj.is(":checkbox, :radio") && field.obj.prop("checked", !0).trigger("checked"), field.focus()
				},
				tooltipWrapperClass: "tooltip-wrapper",
				checkmarkWrapperClass: "checkmark-wrapper",
				triggerIconClass: "icon-tooltip",
				ajaxValidating: !1,
				ajaxValidated: !1,
				changeListeners: "click.validate keyup.validate focus.validate change.validate revalidate.validate paste.validate",
				lutnAlgorithm: function(n) {
					var t, l, r, e, h, i;
					for (n = "" + n, l = 0, i = n.split(""), t = e = 0, h = i.length; h > e; t = ++e) r = i[t], r *= 2 - t % 2, r > 9 && (r -= 9), l += r;
					return 10 * Math.ceil(l / 10) - l
				},
				toolTip: function() {
					var tooltip = {
						obj: $(this),
						$tooltipBox: $("<div class='form-tooltip'><div></div><span class='tooltip-arrow'></span></div>"),
						$triggerIcon: $('<span class="icon ' + field.triggerIconClass + ' sprite1" tabindex="0"></span>'),
						$wrapper: $('<div class="' + field.tooltipWrapperClass + '"></div>'),
						showTooltip: function(e) {
							e.stopPropagation(), tooltip.$tooltipBox.css("width", tooltip.obj.outerWidth()), tooltip.$tooltipBox.show(), tooltip.$triggerIcon.addClass("tooltip-active"), tooltip.$triggerIcon.off("click", tooltip.showTooltip), setTimeout(function() {
								$("form").one("click", tooltip.hideTooltip)
							}, 0)
						},
						hideTooltip: function() {
							$("form").off("click", tooltip.hideTooltip), tooltip.$triggerIcon.on("click", tooltip.showTooltip), tooltip.$triggerIcon.removeClass("tooltip-active"), tooltip.$tooltipBox.hide()
						},
						init: function() {
							var text = tooltip.obj.data("tooltip"),
								hasFocus = tooltip.obj.is(":focus");
							tooltip.$tooltipBox.find("div").append(text), tooltip.obj.wrap(tooltip.$wrapper), tooltip.obj.after(tooltip.$triggerIcon), tooltip.$triggerIcon = tooltip.obj.next(), $("." + field.tooltipWrapperClass).append(tooltip.$tooltipBox), tooltip.$triggerIcon.on("click", tooltip.showTooltip), hasFocus && tooltip.obj.focus()
						}
					};
					return tooltip.init()
				},
				checkmark: function() {
					var checkmark = {
						obj: $(this),
						$checkIcon: $('<span class="icon icon-checkmark sprite1"></span>'),
						$wrapper: $('<div class="' + field.checkmarkWrapperClass + '"></div>'),
						showcheckmark: function(e) {
							setTimeout(function() {
								var hasfocus = checkmark.$checkIcon.siblings("." + field.triggerIconClass).is(":focus");
								checkmark.$checkIcon.show(), checkmark.$checkIcon.siblings("." + field.triggerIconClass).hide(), hasfocus && checkmark.obj.closest("li").next().find("input:not([type=hidden])").focus()
							}, 0)
						},
						hidecheckmark: function() {
							checkmark.$checkIcon.hide(), checkmark.$checkIcon.siblings("." + field.triggerIconClass).show()
						},
						init: function() {
							var hasFocus = checkmark.obj.is(":focus");
							checkmark.obj.parent().hasClass(field.tooltipWrapperClass) ? (checkmark.obj.after(checkmark.$checkIcon), checkmark.$checkIcon = checkmark.obj.next()) : (checkmark.obj.wrap(checkmark.$wrapper), checkmark.obj.after(checkmark.$checkIcon)), checkmark.obj.on("showCheckmark", checkmark.showcheckmark), checkmark.obj.on("hideCheckmark", checkmark.hidecheckmark), hasFocus && checkmark.obj.focus()
						}
					};
					return checkmark.init()
				},
				validate: function(e, isChangeEvent, isBlurEvent) {
					function checkAgeLimit() {
						if (field.isvalid && field.obj.is("[data-agelimit]")) {
							var ageDataAttr = field.obj.data("agelimit"),
								limit = isNaN(parseFloat(ageDataAttr)) ? 0 : ageDataAttr,
								age = function(civicNumber) {
									var dateString = civicNumber.substring(0, 4) + "-" + civicNumber.substring(4, 6) + "-" + civicNumber.substring(6, 8),
										birthday = new Date(dateString),
										ageDifMs = Date.now() - birthday.getTime(),
										ageDate = new Date(ageDifMs);
									return Math.abs(ageDate.getFullYear() - 1970)
								}(field.obj.val());
							age < limit && (field.isvalid = !1, field.error.text("Du måste vara 18 år för att skapa ett konto."))
						}
					}
					function isValidDate(year, month, day) {
						year = parseInt(year), month = parseInt(month) - 1, day = parseInt(day);
						var date = new Date(year, month, day);
						return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day
					}
					var isChangeEvent = "undefined" != typeof isChangeEvent && isChangeEvent,
						isBlurEvent = "undefined" != typeof isBlurEvent && isBlurEvent;
					if (field.isvalid = !0, field.required && !field.obj.is(":checkbox") && "" === field.obj.val()) {
						if (isBlurEvent) return !1;
						if (field.obj.is(":hidden")) return !1;
						field.isvalid = !1;
						var labelText = field.label.data("label") ? field.label.data("label") : field.label.text().replace("*", "").replace(":", "");
						field.epiXForm && labelText.length > 25 && (labelText = ""), labelText || (labelText = "Fältet"), field.error.text(labelText + " är obligatoriskt")
					} else if (field.required && field.obj.is(":checkbox") && !$('input[name="' + field.obj.attr("name") + '"]').is(":checked")) field.isvalid = !1, $('input[name="' + field.obj.attr("name") + '"]').length > 1 ? field.error.text("Du måste kryssa i någon av rutorna") : field.error.text("Du måste kryssa i rutan");
					else if (field.required && field.obj.is(":radio") && !$('input[name="' + field.obj.attr("name") + '"]').is(":checked")) field.isvalid = !1, field.error.text("Du måste välja något av alternativen");
					else if (field.obj.is("[pattern]") && "" !== field.obj.val() && !field.obj.val().match(new RegExp("^" + field.obj.attr("pattern") + "$"))) field.isvalid = !1, field.error.text("Felaktigt värde");
					else if ((field.obj.is("[type=number]") || field.epiXForm && field.obj.hasClass("number")) && "" !== field.obj.val() && !field.obj.val().match(/^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i)) field.isvalid = !1, field.error.text("Värdet ska vara ett nummer");
					else if ((field.obj.is("[type=email]") || field.epiXForm && field.obj.hasClass("email")) && "" !== field.obj.val() && !field.obj.val().match(/^.+@.+\..+$/)) field.isvalid = !1, field.error.text("Felaktigt e-postformat");
					else if (field.obj.hasClass("dont-validate-as-tel") || !(field.obj.is("[type=tel]") || field.epiXForm && field.obj.hasClass("tel")) || "" === field.obj.val() || field.obj.val().match(/^\+?[0-9\- ]*$/)) {
						if (field.obj.is("[type=url]") && "" !== field.obj.val() && !field.obj.val().match(/^([A-Za-z]+:\/\/)?[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_%&\?\/.=]+$/)) field.isvalid = !1, field.error.text("Felaktigt format på webbaddress");
						else if ((field.obj.is("[type=date]") || field.epiXForm && field.obj.hasClass("date")) && "" !== field.obj.val() && !field.obj.val().match(/^[0-9]{2,4}\-[0-9]{2}\-[0-9]{2}$/i)) field.isvalid = !1, field.error.text("Felaktigt datumformat");
						else if (field.obj.is("[type=file]") && "" !== field.obj.val() && field.obj.data("validextensions")) {
							var validExtensions = field.obj.data("validextensions").split(","),
								extension = field.obj.val().substring(field.obj.val().lastIndexOf(".") + 1).toLowerCase();
							$.inArray(extension, validExtensions) == -1 && (field.isvalid = !1, field.error.text("Felaktigt filformat"))
						} else if (field.obj.is("[data-customvalidation]") && "" !== field.obj.val()) if (field.obj.is("[data-customvalidation=createpassword]")) field.obj.val().match(/[0-9]/) ? field.obj.val().match(/[a-zà-ü]/) ? field.obj.val().match(/[A-ZÀ-Ü]/) ? field.obj.val().match(/^\S{8,}$/) || (field.isvalid = !1, field.error.text("Lösenordet måste bestå av minst 8 tecken.")) : (field.isvalid = !1, field.error.text("Lösenordet måste innehålla minst 1 stor bokstav.")) : (field.isvalid = !1, field.error.text("Lösenordet måste innehålla minst 1 liten bokstav.")) : (field.isvalid = !1, field.error.text("Du måste ha minst en siffra"));
						else if (field.obj.is("[data-customvalidation=availablezipcodes]")) {
							if (field.obj.is("[data-availablezipcodes]")) {
								var zipCodes = field.obj.attr("data-availablezipcodes").split(",");
								$.inArray(field.obj.val(), zipCodes) === -1 && (field.isvalid = !1, field.error.text("Butiken kan inte leverera till angivet postnummer!"), field.obj.addClass("zipcodeerror"))
							}
						} else if (field.obj.is("[data-customvalidation=icaphonenumber]")) 10 == field.obj.val().length && 0 == !field.obj.val().indexOf("0") ? (field.isvalid = !1, field.error.text("Telefonnumret bör ha en nolla i början.")) : field.obj.val().match(/^\d{8,10}$|^\d{2,4}-\d{6,8}$/) || (field.isvalid = !1, field.error.text("Numret måste vara 8-10 siffror utan mellanslag"));
						else if (field.obj.is("[data-customvalidation=icaletters]")) field.obj.val().match(/^([a-zA-Zà-üÀ-Ü]{1}[a-zA-Zà-üÀ-Ü '-]*)$/) || (field.isvalid = !1, field.obj.is("[data-errortext]") ? field.error.text(field.obj.attr("data-errortext")) : field.error.text("Endast bokstäver!"));
						else if (field.obj.is("[data-customvalidation=icanumber]")) field.obj.val().match(/^[\d]+$/) || (field.isvalid = !1, field.obj.is("[data-errortext]") ? field.error.text(field.obj.attr("data-errortext")) : field.error.text("Endast siffror!"));
						else if (field.obj.is(["[data-customvalidation=postalcode]"])) field.obj.val().match(/^(\s*\d{3}\s?\d{2}\s*)$/) || (field.isvalid = !1, field.error.text("Postnumret måste ha 5 siffror"));
						else if (field.obj.is("[data-customvalidation='civicregistrationnumber']")) {
							var cd, control, day, divider, month, p, serial, year, _ref;
							value = "" + field.obj.val(), p = value.match(/^(18|19|20|21){0,1}(\d{2})(\d{2})(\d{2})([\-\+]{0,1})(\d{3})(\d{0,1})$/), p ? (_ref = p.slice(2), year = _ref[0], month = _ref[1], day = _ref[2], divider = _ref[3], serial = _ref[4], control = _ref[5], cd = field.lutnAlgorithm("" + year + month + day + serial), cd === +control && control || (field.isvalid = !1, field.error.text("Felaktigt personnummer. Ange ÅÅÅÅMMDDNNNN."))) : (field.isvalid = !1, field.error.text("Felaktigt personnummer. Ange ÅÅÅÅMMDDNNNN."))
						} else if (field.obj.is("[data-customvalidation='civicregistrationnumber12digits']")) {
							var cd, control, day, divider, month, p, serial, year, _ref;
							value = "" + field.obj.val(), p = value.match(/^(18|19|20|21)(\d{2})(\d{2})(\d{2})([\-\+]{0,1})(\d{3})(\d{0,1})$/), p ? (_ref = p.slice(2), year = _ref[0], month = _ref[1], day = _ref[2], divider = _ref[3], serial = _ref[4], control = _ref[5], cd = field.lutnAlgorithm("" + year + month + day + serial), cd === +control && control || (field.isvalid = !1, field.error.text("Felaktigt personnummer. Ange ÅÅÅÅMMDDNNNN."))) : (field.isvalid = !1, field.error.text("Felaktigt personnummer. Ange ÅÅÅÅMMDDNNNN.")), checkAgeLimit()
						} else if (field.obj.is("[data-customvalidation='dateofbirth']")) {
							var cd, control, day, divider, month, p, serial, year, _ref;
							value = "" + field.obj.val(), p = value.match(/^(\d{4})(\d{2})(\d{2})$/), p ? (year = p[1], month = p[2], day = p[3], isValidDate(year, month, day) || (field.isvalid = !1, field.error.text("Felaktigt födelsedatum"))) : (field.isvalid = !1, field.error.text("Felaktigt format")), checkAgeLimit()
						} else if (field.obj.is("[data-customvalidation='loyaltycode']")) field.obj.val().match(/^(\s*\d{3}\s?\d{2}\s*)$/) || (field.isvalid = !1, field.error.text("Engångskoden ska bestå av fem siffror"));
						else if (field.obj.is("[data-customvalidation='sixdigitpassword']")) {
							var checkAgainstCivicRegistrationNumber = !1;
							if (field.obj.is("[data-notexistsin]")) {
								checkAgainstCivicRegistrationNumber = !0;
								var fieldId = field.obj.attr("data-notexistsin").replace(".", "\\\\.").replace("#", ""),
									targetfield = form.fields.filter(function() {
										if ($(this).attr("id")) return $(this).attr("id").replace(".", "\\\\.") === fieldId
									});
								if (targetfield.length) var targetvalue = targetfield.val();
								targetvalue.indexOf(field.obj.val()) != -1 && (field.isvalid = !1, field.error.text("Lösenordet måste vara exakt 6 siffror, varav minst tre olika. Du får inte ange stegar som 123456 eller ditt personnummer som lösenord."))
							}(!checkAgainstCivicRegistrationNumber || checkAgainstCivicRegistrationNumber && field.isvalid) && (field.ajaxValidated || (field.isvalid = !1, ICA.legacy.customValidation.sixdigitpassword({
								"ValidateSixDigitPassword.Value": field.obj.val()
							}, function(data) {
								data.success ? (field.isvalid = !0, field.ajaxValidated = !0) : field.error.text("Lösenordet måste vara exakt 6 siffror, varav minst tre olika. Du får inte ange stegar som 123456 eller ditt personnummer som lösenord.")
							}, function() {
								field.error.text("Fel vid valideringsanrop")
							})))
						} else field.obj.is("[data-customvalidation='eightdigits']") ? field.obj.val().match(/^(\s*\d{8}\s*)$/) || (field.isvalid = !1, field.error.text("Du måste ange åtta siffror")) : field.obj.is("[data-customvalidation='icadiscountcode']") && (field.obj.val().match(/^[a-zA-Zà-üÀ-Ü0-9]*$/) || (field.isvalid = !1, field.error.text("Felaktig rabattkod")));
						else if (field.obj.is("[data-identicalto]") && field.isvalid) {
							var fieldId = field.obj.attr("data-identicalto").replace(".", "\\\\.").replace("#", ""),
								targetfield = form.fields.filter(function() {
									if ($(this).attr("id")) return $(this).attr("id").replace(".", "\\\\.") === fieldId
								});
							if (targetfield.length) var targetvalue = targetfield.val();
							field.obj.val() !== targetvalue && (field.isvalid = !1, field.obj.is("[data-errortext]") ? field.error.text(field.obj.attr("data-errortext")) : field.error.text("Värdena i fälten måste vara lika."))
						}
					} else field.isvalid = !1, field.error.text("Numret måste vara i formatet 0709999999");
					if (field.isvalid) field.isvalid && (field.obj.removeClass("error").parent(".error, .error-wrapper").removeClass("error error-wrapper"), field.error.detach().empty(), field.required || !field.required && "" !== field.obj.val() ? field.obj.hasClass("_useCheckmarkOnValidate") ? (field.obj.trigger("showCheckmark"), field.validateOnlyCorrect = !1, field.obj.off(field.changeListeners).on(field.changeListeners, field.change)) : field.obj.off(field.changeListeners) : "" == field.obj.val() && field.obj.hasClass("_useCheckmarkOnValidate") && field.obj.trigger("hideCheckmark"));
					else {
						if (field.validateOnlyCorrect && isChangeEvent) return !1;
						form.isvalid = !1, field.obj.addClass("error"), field.obj.is("[data-errorcontainerid]") && $("#" + field.obj.data("errorcontainerid")).length ? $("#" + field.obj.data("errorcontainerid")).append(field.error) : field.obj.parent().is(".select, .textarea, .file, .with-info, .radio, .checkbox, .datepicker-wrapper") ? field.obj.parent().parent(".with-info").length ? field.error.insertAfter(field.obj.parent().parent().addClass("error")) : field.error.insertAfter(field.obj.parent().addClass("error")) : field.obj.parent().is("fieldset") && field.obj.is(":checkbox, :radio") ? field.error.insertAfter(field.obj.parent().addClass("error")) : field.obj.parent().hasClass("tooltip-wrapper") ? "checkbox" == field.obj[0].type || "radio" == field.obj[0].type ? field.obj.parent().addClass("error-wrapper") : field.error.insertAfter(field.obj.parent()) : "checkbox" == field.obj[0].type || "radio" == field.obj[0].type ? field.obj.parent().addClass("error-wrapper") : field.error.insertAfter(field.obj), field.obj.off(field.changeListeners).on(field.changeListeners, field.change), field.obj.hasClass("_useCheckmarkOnValidate") && field.obj.trigger("hideCheckmark"), form.obj.trigger("validationerror", [field.obj, field.label, field.error.text()])
					}
				},
				change: function(e) {
					clearTimeout(field.validationTO), field.validationTO = setTimeout(function(e) {
						field.validate(e, !0)
					}, 200)
				},
				init: function() {
					field.label = $('label[for="' + field.obj.attr("id") + '"]').first(), field.obj.data("tooltip") && field.obj.create(field.toolTip), field.obj.hasClass("novalidate") || field.obj.on("validate", function(a, b, c) {
						field.validate(a, b, c)
					}), field.obj.hasClass("_useCheckmarkOnValidate") && (field.obj.create(field.checkmark), field.validateOnlyCorrect = !0, field.obj.off(field.changeListeners).on(field.changeListeners, field.change), "" !== field.obj.val() && field.obj.trigger("validate", [!0])), $(".signup-section input, ._validateOnBlur input, input._validateOnBlur").off("blur.validate").on("blur.validate", function(e) {
						$(this).trigger("validate", [!1, !0])
					})
				}
			};
			return field.init()
		},
		Clearable: function() {
			var clearable = {
				obj: $(this),
				wrapper: $(this).parent(".clear-wrapper").length ? $(this).parent(".clear-wrapper") : $(this).wrap('<div class="clear-wrapper"></div>').parent(),
				clearbtn: $('<span class="icon icon-clear sprite3">X</span>'),
				clear: function() {
					clearable.obj.val(""), clearable.wrapper.removeClass("has-value").trigger("clear")
				},
				change: function(e) {
					clearable.obj.val() && "placeholder" in clearable.obj[0] || !1 in clearable.obj[0] && (!clearable.obj.attr("placeholder") || clearable.obj.attr("placeholder") && clearable.obj.attr("placeholder") && clearable.obj.val() != clearable.obj.attr("placeholder")) ? clearable.wrapper.addClass("has-value") : clearable.wrapper.removeClass("has-value")
				},
				init: function() {
					clearable.obj.on("keyup change click", clearable.change).addClass("clearable-loaded"), clearable.clearbtn.on("click", clearable.clear).appendTo(clearable.wrapper)
				}
			};
			return clearable.init()
		},
		Radiobutton: function() {
			var radio = {
				opt: $.extend({
					uncheckable: !1
				}, args),
				obj: $(this),
				label: this.id && $('label[for="' + this.id + '"]').length ? $('label[for="' + this.id + '"]') : $(this).parent("label"),
				checked: $(this).is(":checked"),
				check: function(e, callback) {
					radio.checked && radio.opt.uncheckable ? setTimeout(function() {
						radio.obj.trigger("uncheck"), "function" == typeof callback && callback.call()
					}, 10) : (radio.obj.prop("checked", !0).trigger("change"), radio.label.addClass("checked"), radio.checked = !0)
				},
				uncheck: function() {
					radio.obj.prop("checked", !1).trigger("change"), radio.label.removeClass("checked"), radio.checked = !1
				},
				toggle: function(e) {
					radio.obj.is(":disabled") || (radio.checked ? radio.uncheck() : radio.check())
				},
				change: function() {
					radio.obj.not(":checked") && (radio.checked = !1)
				},
				enable: function() {
					radio.label.removeClass("disabled"), radio.obj.prop("disabled", !1)
				},
				disable: function() {
					radio.uncheck(), radio.label.addClass("disabled"), radio.obj.prop("disabled", !0)
				},
				styleRadio: function() {
					radio.obj.closest(".xform").length > 0 && 0 == radio.label.children("span.icon-radio").length && radio.label.prepend('<span class="icon icon-radio"></span>')
				},
				init: function() {
					radio.obj.parents(".filter").length && (radio.opt.uncheckable = !0), radio.obj.on("check", radio.check).on("uncheck", radio.uncheck).on("enable", radio.enable).on("disable", radio.disable).addClass("radio-loaded"), radio.checked && radio.obj.trigger("check"), radio.styleRadio()
				}
			};
			if (!$(this).hasClass("radio-loaded")) return radio.init()
		},
		Checkbox: function() {
			var check = {
				obj: $(this),
				label: $(this).attr("id") && $('label[for="' + $(this).attr("id") + '"]').length ? $('label[for="' + $(this).attr("id") + '"]') : $(this).parent("label"),
				checked: $(this).is(":checked"),
				check: function() {
					check.obj.prop("checked", !0).trigger("change"), check.label.addClass("checked"), check.checked = !0
				},
				uncheck: function() {
					check.obj.prop("checked", !1).trigger("change"), check.label.removeClass("checked"), check.checked = !1
				},
				toggle: function(e) {
					check.checked ? check.uncheck() : check.check()
				},
				change: function() {
					check.obj.not(":checked") && (check.checked = !1)
				},
				styleCheckBox: function() {
					check.obj.closest(".xform").length > 0 && 0 == check.label.children("span.icon-checkbox").length && check.label.prepend('<span class="sprite1 icon icon-checkbox"></span>')
				},
				init: function() {
					check.obj.on("check", check.check).on("uncheck", check.uncheck).addClass("checkbox-loaded"), check.checked && check.obj.trigger("check"), check.styleCheckBox()
				}
			};
			if (!$(this).hasClass("checkbox-loaded")) return check.init()
		},
		Placeholder: function() {},
		Textarea: function() {
			var textarea = {
				obj: $(this),
				wrapper: $(this).parent(".textarea").length ? $(this).parent(".textarea") : $(this).wrap('<div class="textarea"></div>').parent(),
				pre: $("<pre></pre>"),
				focus: function() {
					textarea.pre.css({
						"min-height": "55px"
					})
				},
				init: function() {
					textarea.obj.hasClass("toggle") && textarea.pre.css({
						"min-height": "0"
					}), textarea.obj.hasClass("small") && textarea.wrapper.addClass("small"), textarea.pre.insertBefore(textarea.obj), textarea.obj.on("keyup change click focus", function() {
						textarea.pre.html(textarea.obj.val())
					}).on("focus", textarea.focus).trigger("change"), textarea.wrapper.addClass("textarea-loaded")
				}
			};
			return textarea.init()
		},
		File: function() {
			var file = {
				obj: $(this),
				container: $(this).parent(),
				labelObj: $(this).parent(".file").length ? $(this).parent(".file") : $(this).wrap('<label class="file" for="' + $(this).prop("id") + '"></label>').parent(),
				text: $(this).attr("title"),
				clonedBtn: void 0,
				setup: function($fileInputField) {
					file.text = $fileInputField.prop("title") ? $fileInputField.prop("title") : "Välj fil", file.labelObj.attr("title", file.text);
					var $temp = $fileInputField.parent(".file").clone();
					$temp.removeAttr("for").find("input").removeAttr("id"), file.clonedBtn = $temp.wrap("<div/>").parent().html().toString()
				},
				onChange: function(e) {
					var files = $(e.target)[0].files;
					if (files || $(e.target).val()) {
						var $label = $(e.target).parent(".file"),
							$clonedFileComponent = $(file.clonedBtn);
						$clonedFileComponent.on("focus", file.focus), $clonedFileComponent.on("change", file.onChange);
						var filename, $selectedFile = $("<div class='remove-file'><span class='sprite2 icon icon-remove test'></span><div></div></div>");
						if (files) filename = files[0].name;
						else {
							var delim = "[DELIMITER]",
								path = $(e.target).val().replace(/\\/gi, delim).split(delim);
							filename = path[path.length - 1]
						}
						$selectedFile.find("div").prepend(filename), $label.addClass("removed"), $label.after($selectedFile), $selectedFile.after($clonedFileComponent), $("span", $selectedFile).on("click", file.removeFile)
					}
				},
				removeFile: function(e) {
					var $selectedfile = $(e.target).parent(".remove-file");
					$selectedfile.prev(".file").remove(), $selectedfile.remove()
				},
				focus: function(e) {
					$(e.target).parent(".file").addClass("focus"), $(e.target).on("blur", file.blur)
				},
				blur: function(e) {
					$(e.target).parent(".file").removeClass("focus"), $(e.target).off("blur", file.blur)
				},
				init: function() {
					file.obj.hasClass("small") && file.labelObj.addClass("small"), file.setup(file.obj), file.obj.on("focus", file.focus), file.obj.on("change", file.onChange)
				}
			};
			return file.init()
		},
		Select: function() {
			var select = {
				obj: $(this),
				wrapper: $(this).closest(".select").length ? $(this).closest(".select") : $(this).wrap('<div class="select"></div>').parent(),
				title: $('<span class="selecttitle"></span>'),
				change: function() {
					var selected = (select.obj.val(), $("option:selected", select.obj));
					select.settitle(selected.text())
				},
				settitle: function(title) {
					select.wrapper.find(".selecttitle").html(title)
				},
				focus: function() {
					select.wrapper.addClass("focus"), select.obj.on("blur", select.blur)
				},
				blur: function() {
					select.wrapper.removeClass("focus"), select.obj.off("blur", select.blur)
				},
				init: function() {
					select.obj.hasClass("small") && select.wrapper.addClass("small"), select.obj.on("focus", select.focus);
					var eventType = "change";
					$("html").is(".ios") && (eventType = "blur"), select.obj.on("click update " + eventType, select.change), select.obj.addClass("select-loaded"), select.wrapper.find(".selecttitle").length || select.wrapper.prepend(select.title), select.change()
				}
			};
			return select.init()
		},
		select2range: function(callback) {
			var range = {
				obj: $('<span class="range"></span>'),
				bar: $('<div class="bar"></div>'),
				select: $(this),
				options: $("option", this),
				counter: $('<span class="counter"></span>'),
				handle: $('<a role="slider" class="handle" tabindex="0">handle</a>'),
				change: function(e, index) {
					e.stopPropagation();
					var initval = range.select.val(),
						option = range.options.eq(index - 1),
						val = Math.round(range.options.eq(index - 1).attr("value"));
					range.handle.attr({
						"aria-valuenow": val
					}), range.select.val(val), range.select.val() != initval && range.select.trigger("change"), range.counter.text(option.text())
				},
				init: function() {
					var min = range.options.first().val(),
						max = range.options.last().val(),
						value = range.options.index($("option[value=" + range.select.val() + "]", range.select)) + 1;
					return range.handle.attr({
						"aria-value-min": min,
						"aria-value-max": max,
						"aria-valuenow": range.select.val(),
						"data-min": 1,
						"data-max": range.options.length,
						"data-value": value,
						"data-step": 1
					}), range.bar.appendTo(range.obj), range.handle.appendTo(range.obj), range.obj.insertAfter(range.select), range.obj.on("update", range.change), range.counter.insertBefore(range.select), range.obj.create(ICA.Components.RangeSlider, {
						counter: !1
					}), range.obj.addClass("range-loaded"), range.obj
				}
			};
			if (!$(this).hasClass("range-loaded")) return range.init()
		},
		validate: function(isSubmit) {
			form.isvalid = !0, isSubmit ? form.fields.trigger("validate", [!0]) : form.fields.trigger("validate")
		},
		ajaxdone: function() {
			form.container.removeClass("loading").prop("disabled", !1).off("done", form.ajaxdone).find(".spinner").remove()
		},
		toggleState: function(disable) {
			form.container.toggleClass("loading", disable).prop("disabled", disable), disable ? form.container.on("done", form.ajaxdone) : form.container.off("done", form.ajaxdone).find(".spinner").remove()
		},
		submit: function(e, params) {
			e && e.stopPropagation(), form.opt.validate && (form.validate(), form.isvalid && !form.container.hasClass("xform") && form.container.addClass("loading").on("done", form.ajaxdone), form.container.trigger("validationcomplete", [form.isvalid]), !form.obj.hasClass("allow") && form.isvalid ? ($(":focus", form.container).blur(), form.container.prop("disabled", !0), form.container.trigger("ajaxsubmit", [params, function(data) {
				if (form.obj.trigger("done"), "success" in data && data.success)"message" in data && data.message && (form.opt.confirmInModal ? (window.triggerAsModal(data.message), form.container.trigger("done")) : form.container.html("<p>" + data.message + "</p>")), setTimeout(function() {
					form.container.trigger("success")
				}, 1800);
				else if ("message" in data && data.message) {
					var error = $("p.error", form.container) ? $("p.error", form.container) : $('<p class="error"></p>');
					error.text(data.message).prependTo(form.container)
				}
			}, function(err) {
				toggleState(!0)
			}])) : setTimeout(function() {
				var firsterror = $("input.error, select.error, textarea.error", form.container).first();
				if (firsterror.length) {
					var firsterrorposition = firsterror.offset().top;
					firsterrorposition < $(window).scrollTop() && $("html, body").animate({
						scrollTop: firsterrorposition - 50
					}, 400)
				}
			}, 10))
		},
		init: function() {
			$("html").hasClass("ios") && $("[autofocus]").each(function() {
				$(this).is(":focus") && $(this).blur()
			}), form.container.hasClass("novalidate") && (form.opt.validate = !1), form.container.hasClass("submitonchange") && (form.opt.submitonchange = !0), form.container.hasClass("confirminmodal") && (form.opt.confirmInModal = !0), form.container.hasClass("only-event-on-validate") && (form.opt.noSubmit = !0), $("input.clearable", form.container).create(form.Clearable), form.fields.create(form.Field), form.container.addClass("form-loaded").on("submit", form.submit).on("change focus click", "input, select, textarea, button", function(e) {
				form.isactive || form.container.trigger("newactiveform")
			}).on("click keyup", ":radio", function(e) {
				var target = $(e.target);
				$('input[name="' + target.attr("name") + '"]').not(target).trigger("uncheck"), target.is(":checked") && target.trigger("check")
			}).on("click", ":checkbox", function(e) {
				var target = $(e.target);
				$('input[name="' + target.attr("name") + '"]').not(target).trigger("revalidate"), target.is(":checked") ? target.trigger("check") : target.trigger("uncheck")
			}).on("clearform", function() {
				form.fields.not('[type="hidden"]').val("")
			}), $(".server-button", form.container).length && form.fields.not(":checkbox,:radio").on("keydown", function(e) {
				13 == e.keyCode && (e.preventDefault(), e.stopPropagation(), $(".server-button", form.container).click())
			}), form.opt.submitonchange && form.container.on("change", function() {
				form.obj.trigger("submit")
			}), $(":radio", form.container).create(form.Radiobutton), $(":checkbox", form.container).create(form.Checkbox), $("textarea", form.container).create(form.Textarea), $("select:not(.range)", form.container).create(form.Select), $("select.range", form.container).create(form.select2range), $("[type=file]", form.container).create(form.File), form.obj.on("newactiveform", function(e) {
				e.target === form.container[0] ? (form.obj.removeClass("allow"), form.isactive = !0, form.container.hasClass("allow") && form.obj.addClass("allow")) : form.isactive = !1
			}).on("submit", function(e) {
				form.isactive && (form.container.trigger("submit", form.fields.serializeObject()), form.isvalid ? form.isvalid && form.opt.noSubmit && (e.preventDefault(), form.container.trigger("formvalidated")) : (e.preventDefault(), form.container.trigger("fieldsetnotvalid")))
			})
		}
	};
	if (!$(this).hasClass("form-loaded") && !$(this).parents("fieldset").length) return form.init()
};
var ICA = ICA || {};
ICA.Components = ICA.Components || {}, ICA.Components.LoadMore = function(args, callback) {
	var loadmore = {
		opt: $.extend({
			auto: !1,
			transition: !1
		}, args),
		link: $(this),
		targetarea: $(this).data("target") ? $($(this).data("target")) : $(this),
		appendto: $(this).data("appendto") ? $($(this).data("appendto")) : null,
		usecontainer: !$(this).is("[data-usecontainer]") || $(this).data("usecontainer"),
		url: $(this).data("ajaxurl") ? $(this).data("ajaxurl") : $(this).attr("href"),
		counter: !! $(".status-bar .counter").length && $(".status-bar .counter"),
		backBtn: void 0,
		fetchPage: function(e) {
			if (e && e.preventDefault(), loadmore.link.addClass("loading"), 1 == loadmore.opt.transition && loadmore.targetarea.children().css("opacity", 0), loadmore.targetarea !== loadmore.link) if (loadmore.opt.largespinner || loadmore.link.hasClass("large-spinner")) {
				loadmore.targetarea.ajaxLoader({
					lines: 9,
					length: 0,
					width: 4,
					radius: 9,
					corners: 1,
					rotate: 0,
					direction: 1,
					color: "#000",
					speed: 1,
					trail: 60,
					shadow: !1,
					hwaccel: !1,
					className: "circle-spinner",
					zIndex: 2e9,
					top: "50%",
					left: "50%"
				});
				var width = loadmore.targetarea.outerWidth(),
					height = loadmore.targetarea.outerHeight();
				loadmore.targetarea.css({
					width: width,
					height: height
				}).addClass("showOnlyLoader")
			} else loadmore.link.hasClass("dark-spinners") ? loadmore.targetarea.ajaxLoader({
				lines: 9,
				length: 5,
				width: 2,
				radius: 3,
				corners: .8,
				rotate: 0,
				direction: 1,
				color: "#fff",
				speed: 1.3,
				trail: 56,
				shadow: !1,
				hwaccel: !0,
				className: "spinner",
				zIndex: 2e9,
				top: "-2px",
				left: "0px"
			}) : loadmore.targetarea.ajaxLoader({
				length: 3,
				width: 1,
				radius: 3
			});
			else loadmore.link.ajaxLoader();
			var now = new Date;
			return ICA.legacy.get(loadmore.url + (loadmore.url.split("?").length > 1 ? "&" : "?") + "t=" + now.getTime(), {}, loadmore.ajaxsuccess), !1
		},
		ajaxsuccess: function(data) {
			loadmore.loadData(data)
		},
		loadData: function(ajaxData) {
			if (loadmore.container = $('<div class="fetched"></div>'), loadmore.link.removeClass("loading").find(".spinner").remove(), loadmore.targetarea.css({
				width: "",
				height: ""
			}).removeClass("showOnlyLoader"), loadmore.url.split("#").length > 1) {
				var dummy = $("<html></html>").html(ajaxData),
					target = $("#" + loadmore.url.split("#")[1], dummy);
				target.length && loadmore.container.html(target.html())
			} else loadmore.container.html($.parseHTML(ajaxData));
			if (1 == loadmore.opt.transition && loadmore.container.fadeIn(), null !== loadmore.appendto && loadmore.appendto.length > 0) {
				if (loadmore.usecontainer) loadmore.container.appendTo(loadmore.appendto).trigger("initDom");
				else {
					if (!$("html").hasClass("safari")) {
						var currentHeight = loadmore.appendto.height();
						loadmore.appendto.css({
							height: currentHeight,
							overflow: "hidden"
						}), setTimeout(function() {
							loadmore.appendto.autoHeightTransition(null, function() {
								loadmore.appendto.css({
									height: "",
									overflow: ""
								})
							})
						}, 100)
					}
					loadmore.container.children().appendTo(loadmore.appendto), loadmore.appendto.resize().trigger("initDom")
				}
				loadmore.link.is("[data-removeparent=true]") ? loadmore.link.parent().andSelf().remove() : loadmore.link.is("[data-animateremoval=true]") ? loadmore.link.slideUp("fast", function() {
					$(this).remove()
				}) : loadmore.link.remove()
			} else loadmore.targetarea.replaceWith(loadmore.container), loadmore.container.trigger("initDom");
			$("input.currentOffset", loadmore.container).length && loadmore.container.trigger("updateOffset", $("input.currentOffset", loadmore.container).val()), loadmore.link && (loadmore.targetarea = loadmore.link.data("target") ? $(loadmore.link.data("target")) : loadmore.link), $("img", loadmore.container).on("load", function() {
				loadmore.container.trigger("resize")
			}), loadmore.link.trigger("LoadMoreUpdated", [loadmore.container]), loadmore.container.trigger("LoadMoreContentUpdated"), ICA && ICA.icaCallbacks && (ICA.icaCallbacks.attachLazyLoadEvent(), ICA.icaCallbacks.truncate()), "function" == typeof picturefill && picturefill()
		},
		autoclick: function() {
			loadmore.link.trigger("click"), loadmore.link.closest(".details").length && loadmore.link.closest(".details").off("toggle-open", loadmore.autoclick)
		},
		init: function(args, callback) {
			return loadmore.link.on("click", loadmore.fetchPage).addClass("loadmore-loaded"), "function" == typeof callback && callback.call(loadmore.link), (loadmore.opt.auto || loadmore.link.data("autoclick") && "false" != loadmore.link.data("autoclick")) && (loadmore.opt.auto = !0, loadmore.link.closest(".details").length ? loadmore.link.closest(".details").on("toggle-open", loadmore.autoclick) : loadmore.autoclick()), loadmore.link.hasClass("transition") && (loadmore.opt.transition = !0), this
		}
	};
	if (!$(this).hasClass("loadmore-loaded")) return loadmore.init(args, callback)
};
var ICA = ICA || {};
ICA.Components = ICA.Components || {}, ICA.Components.Modal = function(args, callback) {
	var modal = {
		opt: $.extend({
			variant: "default",
			preload: !1,
			alwaysRefetch: !1,
			history: !1,
			openonhover: !1,
			savestate: !0,
			overlay: !0,
			openPrevModal: !0,
			keepExistingOverlay: !1,
			onload: function() {},
			iframe: !1,
			focusmodalonopen: !0
		}, args),
		link: $(this),
		overlay: $('<div class="overlay" tabIndex="-1"></div>'),
		modalbox: $('<section class="modalbox" role="dialog" tabIndex="-1"></section>'),
		header: $("<header></header>"),
		closebtn: $('<span role="button" class="closebtn sprite2" aria-pressed="false">Close</span>'),
		closebtnLarge: $('<span role="button" class="closebtn sprite1" aria-pressed="false">Close</span>'),
		content: $('<div class="modalcontent"></div>'),
		errorTemplate: $('<div class="modalErrorMessage clearfix"><h3>Ett fel har inträffat</h3><p>Tyvärr så har det uppstått ett fel, sidan kunde inte laddas. Försök gärna igen lite senare</p><a class="button close float-right">Ok</a></div>'),
		ajaxurl: $(this).data("ajaxurl") ? $(this).data("ajaxurl") : $(this).attr("href"),
		data: void 0,
		isloaded: !1,
		isopen: !1,
		tracking: {
			enabled: !1,
			type: "",
			noTrackOnClose: !1
		},
		useContent: !1,
		closecallback: void 0,
		prevModal: !1,
		liknadeRecipe: $(".liknade-recipe"),
		removeOnClose: 1 == $(this).data("removeonclose"),
		keepOpen: !1,
		linkclick: function(e) {
			return e.preventDefault(), modal.removeOnClose && (modal.opt.saveState = !1, modal.isloaded = !1), modal.isopen || (modal.isloaded && modal.opt.savestate ? (modal.open(), modal.success()) : ($("html").addClass("has-modal"), modal.link.is(".keep-existing-overlay") || modal.opt.keepExistingOverlay || $(".overlay").not(modal.overlay.show()).hide(), modal.ajaxurl = modal.link.data("ajaxurl") ? modal.link.data("ajaxurl") : modal.link.attr("href"), modal.opt.overlay && $("form").append(modal.overlay.ajaxLoader({
				length: 9,
				width: 3,
				radius: 9,
				color: "#fff"
			})), modal.openwhenready = !0, modal.loadData())), $(modal.link).trigger("modallinkclick"), !1
		},
		markAsOpen: function() {
			modal.isopen = !0
		},
		markAsNotOpen: function() {
			modal.isopen = !1
		},
		modalclick: function(e) {
			$(e.target).hasClass("allowPropagation") || $(e.target).hasClass("allowPropagationBubble") || $(e.target).parents(".allowPropagationBubble")[0] || e.stopPropagation()
		},
		open: function(empty) {
			modal.modalbox.find(".loadCouponModal").length && (window.currentOpenHSEModal = modal.link.attr("href"));
			var findLiknade = modal.modalbox.find(modal.liknadeRecipe);
			findLiknade[0] && findLiknade.children.length > 0 && (findLiknade.create(overflowScroll), ICA.fn.isMobileDevice() || findLiknade.removeClass("overthrow")), modal.opentime = new Date, empty && modal.content.empty();
			var currentbox = $(".modalbox.open:not(.dashboard)");
			currentbox.length && currentbox.hasClass("keepopen") ? (modal.prevModal = currentbox, modal.modalbox.css({
				top: currentbox.css("top"),
				height: currentbox.height() + "px",
				width: currentbox.width() + "px",
				"margin-left": currentbox.css("margin-left")
			}), setTimeout(function() {
				modal.modalbox.addClass("open"), modal.isloaded && modal.position()
			}, 10), currentbox.css("z-index", 9e3), $("form").append(modal.modalbox), modal.nojump = !0) : currentbox.length && currentbox[0] !== modal.modalbox[0] && modal.opt.openPrevModal ? (modal.prevModal = currentbox, modal.modalbox.css({
				top: currentbox.css("top"),
				height: currentbox.height() + "px",
				width: currentbox.width() + "px",
				"margin-left": currentbox.css("margin-left")
			}), setTimeout(function() {
				modal.modalbox.addClass("open"), modal.isloaded && modal.position()
			}, 10), currentbox.trigger("close", !0).trigger("restore"), $("form").append(modal.modalbox), modal.nojump = !0) : currentbox.length && currentbox[0] !== modal.modalbox[0] && !modal.opt.openPrevModal ? (modal.modalbox.css({
				top: currentbox.css("top")
			}), currentbox.trigger("close", !0), setTimeout(function() {
				modal.modalbox.addClass("open"), modal.isloaded && modal.position()
			}, 10), $("form").append(modal.modalbox), modal.nojump = !0) : (modal.opt.overlay && !modal.link.is(".keep-existing-overlay") && $(".overlay").not(modal.overlay.appendTo("form")).hide(), $("form").append(modal.modalbox), modal.modalbox.addClass("open opening").removeClass("closing"), modal.opening = !0, modal.position()), modal.markAsOpen(), modal.updateHash(modal.id), modal.activate(), setTimeout(function() {
				$("html").addClass("has-modal"), modal.link.is(".keep-existing-overlay") || modal.opt.keepExistingOverlay || $(".overlay").not(modal.overlay.show()).hide()
			}, 10), modal.modalbox.hasClass("transparent") && modal.overlay.addClass("thick"), setTimeout(function() {
				modal.openscrollTop = $(window).scrollTop(), modal.modalbox.removeClass("opening"), modal.opening = !1, modal.overlay.on("click", function() {
					$(".modalbox.open:not(.no-close)").trigger("close")
				})
			}, 1e3), modal.tracking.enabled && icadatalayer.add("modalRequest", {
				modalRequestInformation: {
					type: modal.tracking.type,
					action: "appear"
				}
			})
		},
		close: function(e, nofade, success) {
			if (nofade = !0, modal.opt.savestate || (modal.isloaded = !1), success && modal.isloginbox) return void $("form").trigger("refetch", function() {
				modal.prevModal.length ? modal.prevModal.trigger("open", !0).trigger("refetch") : modal.close()
			});
			if (modal.opt.alwaysRefetch && modal.modalbox.trigger("refetch"), !modal.closing) {
				nofade || (modal.modalbox.addClass("closing"), modal.closing = !0, modal.updateHash("")), modal.markAsNotOpen(), modal.prevModal.length && modal.prevModal.trigger("open-as-previous"), modal.nojump = !1;
				var html = $("html");
				modal.prevModal || setTimeout(function() {
					$(".modalbox.open").length || ($("form > .overlay").detach(), html.removeClass("has-modal removing-last-modal"), modal.overlay.hide())
				}, 200), setTimeout(function() {
					modal.modalbox.removeClass("opening open closing positioned"), modal.closing = !1, modal.overlay.off("click", modal.close), modal.link.removeClass("modal-open"), modal.prevModal.length && modal.prevModal.hasClass("keepopen") && modal.prevModal.css("z-index", 1e4)
				}, nofade ? 0 : 600), modal.scrollBackToTop(), modal.data && modal.data.trigger("closing"), $(".modalbox.open").length || (html.removeClass("has-modal"), modal.overlay.hide()), !modal.link || modal.opt.openonhover || modal.link.closest(".carousel").length || setTimeout(function() {
					modal.link.focus()
				}, 500)
			}
			return modal.closecallback && modal.closecallback(), !! modal.removeOnClose && ($(modal.modalbox).remove(), !0)
		},
		scrollBackToTop: function() {
			Math.abs($(window).scrollTop() - modal.openscrollTop) > 300 && $("html, body").animate({
				scrollTop: modal.openscrollTop
			}, 200)
		},
		position: function() {
			if (modal.link.data("nopos") === !0) return void modal.modalbox.addClass("modal-no-position");
			modal.modalbox.removeClass("positioned"), "tooltip" == modal.opt.variant && $(window).width() < 400 && (modal.opt.variant = "dialog");
			var modalheight = modal.content.height() + (modal.modalbox.hasClass("splitted"), 0),
				windowheight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
			if (modal.modalbox.css({
				width: "",
				"margin-left": ""
			}), "tooltip" == modal.opt.variant || "dropdown" == modal.opt.variant || "dashboard" == modal.opt.variant) {
				var leftoffset = modal.link.offset().left,
					modalwidth = "tooltip" == modal.opt.variant ? 250 : 300;
				"dashboard" == modal.opt.variant ? modalwidth = modal.modalbox.width() < $("#page").width() ? modal.modalbox.width() : $("#page").width() : "tooltip" == modal.opt.variant && (modalwidth = 250), modal.modalbox.css({
					width: modalwidth + "px",
					top: modal.link.offset().top + (modal.link.hasClass("icon") ? -4 : modal.link.height()) + "px",
					transform: "none",
					"-webkit-transform": "none"
				}), leftoffset - modalwidth > $("#page").offset().left ? modal.modalbox.css({
					left: leftoffset - modalwidth + modal.link.width() + 5 + "px"
				}) : modal.modalbox.css({
					left: $("#page").offset().left + 20 + "px"
				}), "dashboard" == modal.opt.variant && modal.modalbox.css({
					left: leftoffset + modalwidth > $("#page").width() ? $("#header").offset().left + $("#header").width() - modalwidth + parseInt(modal.modalbox.css("padding-left").replace("px", "")) : leftoffset + "px"
				})
			} else "arrow" == modal.opt.variant ? (modal.modalbox.height(""), modal.offset = {
				left: 0,
				top: -modal.modalbox.outerHeight() - 10,
				arrow: "50%"
			}, modal.modalbox.hasClass("top") ? (modal.offset.top = modal.link.outerHeight() + 10, modal.modalbox.append('<div class="small-arrow top"></div>')) : modal.modalbox.append('<div class="small-arrow"></div>'), modal.modalbox.hasClass("right") ? (modal.offset.left = modal.link.offset().left + modal.link.outerWidth() - modal.modalbox.outerWidth(), modal.modalbox.find(".small-arrow").css({
				right: modal.link.outerWidth() / 2 > modal.modalbox.outerWidth() - 20 ? "50%" : modal.link.outerWidth() / 2 + "px"
			})) : modal.modalbox.hasClass("left") ? (modal.offset.left = modal.link.offset().left, modal.modalbox.find(".small-arrow").css({
				left: modal.link.outerWidth() / 2 > modal.modalbox.outerWidth() - 20 ? "50%" : modal.link.outerWidth() / 2 + "px"
			})) : (modal.offset.left = modal.link.offset().left + (modal.link.outerWidth() - modal.modalbox.outerWidth()) / 2, modal.modalbox.find(".small-arrow").css({
				left: "50%"
			})), modal.modalbox.css({
				top: modalheight < windowheight ? modal.link.offset().top + modal.offset.top + "px" : $(window).scrollTop() + 50 + "px",
				left: modal.offset.left + "px",
				margin: 0
			})) : modal.nojump || modal.modalbox.css({
				top: modalheight < windowheight ? $(window).scrollTop() + (windowheight - modalheight) / 2 + "px" : $(window).scrollTop() + 50 + "px"
			});
			setTimeout(function() {
				modal.modalbox.addClass("positioned"), modal.modalbox.height(""), !modal.opt.openonhover && modal.opt.focusmodalonopen && modal.focus()
			}, 200)
		},
		focus: function() {
			modal.modalbox.focus()
		},
		success: function(callback) {
			modal.overlay.empty(), modal.modalbox.addClass("loaded"), modal.openwhenready && (modal.open(), modal.openwhenready = !1), "function" == typeof callback && callback.call(modal.modalbox), modal.isloaded || "function" != typeof modal.opt.onload || modal.opt.onload.call(modal.modalbox), modal.isloaded = !0, modal.link && modal.link.addClass("modal-open"), setTimeout(function() {
				modal.modalbox.removeClass("opening loading"), modal.link && modal.link.removeClass("opening loading")
			}, 300), "undefined" != typeof modal.data && "undefined" != typeof modal.data.data("use-tracking") && modal.data.data("use-tracking") && (modal.tracking.type = "undefined" != typeof modal.data.data("tracking-type") ? modal.data.data("tracking-type") : "modal", modal.tracking.noTrackOnClose = "undefined" != typeof modal.data.data("tracking-notrackclose"), modal.tracking.enabled || icadatalayer.add("modalRequest", {
				modalRequestInformation: {
					type: modal.tracking.type,
					action: "appear"
				}
			}), modal.modalbox.find("input[type=submit]").off("mousedown.submitmodal touchstart.submitmodal").on("mousedown.submitmodal touchstart.submitmodal", function() {
				icadatalayer.addAtNextPageLoad("modalRequest", {
					modalRequestInformation: {
						type: modal.tracking.type,
						action: "submit"
					}
				})
			}), modal.tracking.enabled = !0)
		},
		loadData: function(callback) {
			if (modal.modalbox.addClass("loading"), modal.link && modal.link.addClass("loading"), modal.content.ajaxLoader({
				length: 6,
				width: 2,
				radius: 6
			}), "#" != modal.ajaxurl.substr(0, 1) || modal.link.data("ajaxurl")) modal.opt.iframe ? (modal.data = $('<iframe id="modalframe" name="modalframe" src="' + modal.ajaxurl + '" frameBorder="0"></iframe>'), modal.content.empty().append(modal.data), modal.success(callback)) : ICA.legacy.get(modal.ajaxurl, {}, modal.ajaxsuccess, modal.ajaxerror);
			else {
				var $modalContent = $(modal.ajaxurl);
				modal.data = $modalContent.is(".clone-content") ? $modalContent.clone(!0) : $modalContent, modal.data.length && (modal.data.removeAttr("id").removeClass("hidden removed modal-content"), modal.content.empty().append(modal.data), modal.success(callback))
			}
		},
		ajaxerror: function(data) {
			modal.content.empty().append(modal.errorTemplate), modal.success(callback)
		},
		ajaxsuccess: function(data) {
			if (modal.ajaxurl.split("#").length > 1 && $("#" + modal.ajaxurl.split("#")[1], data).length) modal.data = $("#" + modal.link.attr("href").split("#")[1], data);
			else {
				var tempcontainer = $("<div></div>").html(data);
				modal.data = $("#content", tempcontainer).length ? $("#content", tempcontainer) : $(">*", tempcontainer)
			}
			modal.data.hasClass("splitted") && modal.modalbox.addClass("splitted"), modal.data.hasClass("details") && modal.modalbox.addClass("details"), modal.data.attr("data-modalclass") && modal.modalbox.addClass(modal.data.attr("data-modalclass")), modal.data.hasClass("login") && (modal.isloginbox = !0), modal.content.empty().append(modal.data);
			var images = $("img", modal.content),
				loadingimages = images.length;
			if (loadingimages > 0) {
				var imagesreadyto = setTimeout(function() {
					loadingimages > 0 && modal.success(callback)
				}, 2e3);
				images.on("load", function() {
					loadingimages--, 0 == loadingimages && (clearTimeout(imagesreadyto), setTimeout(function() {
						modal.success(callback)
					}, 500))
				})
			} else modal.success(callback)
		},
		refetch: function(e) {
			e.stopPropagation(), modal.isloaded = !1, modal.isopen && modal.loadData()
		},
		activate: function(namespace) {
			namespace = namespace ? namespace : "modal", modal.inactivate(namespace), modal.modalbox.on("click." + namespace, modal.modalclick).on("close." + namespace, function(e) {
				modal.close(e, !1, !0)
			}).on("open." + namespace, modal.open).on("mousedown." + namespace + ", touchstart." + namespace, ".closebtn, .close, ._close-modal", function() {
				modal.tracking.enabled && !modal.tracking.noTrackOnClose && icadatalayer.add("modalRequest", {
					modalRequestInformation: {
						type: modal.tracking.type,
						action: "cancel"
					}
				})
			}).on("click." + namespace, ".closebtn, .close, ._close-modal", function(e) {
				e.preventDefault(), modal.modalbox.trigger("close"), modal.removeOnClose && $(modal.modalbox).remove()
			}).on("restore." + namespace, modal.scrollBackToTop)
		},
		inactivate: function(namespace) {
			namespace = namespace ? namespace : "modal", modal.modalbox.off("click." + namespace).off("close." + namespace).off("open." + namespace).off("click." + namespace).off("restore." + namespace)
		},
		updateHash: function(hash) {
			modal.opt.history && (window.location.href = window.location.href.split("#")[0] + "#" + hash)
		},
		hashchange: function() {
			var hash = window.location.href.split("#");
			hash.length > 1 && hash[1] == modal.id ? modal.isopen || modal.linkclick() : modal.isopen
		},
		init: function() {
			return modal.link.hasClass("dialog") ? modal.opt.variant = "dialog" : modal.link.hasClass("dropdown") ? modal.opt.variant = "dropdown" : modal.link.hasClass("dashboard") ? (modal.opt.variant = "dashboard", modal.overlay.addClass("dashboard-overlay")) : modal.link.hasClass("tooltip") ? modal.opt.variant = "tooltip" : modal.link.hasClass("arrow") && (modal.opt.variant = "arrow"), modal.link.hasClass("dont-focus-modal") && (modal.opt.focusmodalonopen = !1), modal.link.hasClass("iframe") && (modal.opt.iframe = !0), modal.link.data("openonhover") && !("ontouchstart" in document.documentElement) && "onmouseover" in document.documentElement && (modal.opt.openonhover = !0, modal.modalbox.addClass("openonhover")), "false" == modal.link.data("savestate") && (modal.opt.savestate = !1), modal.link.data("alwaysrefetch") && (modal.opt.alwaysRefetch = !0), modal.link.data("stop-prevmodal-opening") && (modal.opt.openPrevModal = !1), modal.link.attr("data-modalclass") && modal.modalbox.addClass(modal.link.attr("data-modalclass")), modal.link.data("keepopen") && modal.modalbox.addClass("keepopen"), modal.opt.openonhover && (modal.link.on("mouseover", function() {
				clearTimeout(modal.openingTO), clearTimeout(modal.closingTO), modal.isopen || (modal.openingTO = setTimeout(modal.linkclick, 100))
			}).on("mouseout", function() {
				clearTimeout(modal.openingTO), modal.closingTO = setTimeout(modal.close, 500)
			}), modal.modalbox.on("mouseout", function(e) {
				modal.closingTO = setTimeout(modal.close, 250)
			}).on("mouseover", function() {
				clearTimeout(modal.closingTO), clearTimeout(modal.openingTO)
			}), modal.content.on("mouseout", function(e) {
				$(e.target).is("select") && e.stopPropagation()
			})), modal.opt.variant && (modal.modalbox.addClass(modal.opt.variant), "arrow" == modal.opt.variant && (modal.link.hasClass("left") ? modal.modalbox.addClass("left") : modal.link.hasClass("right") && modal.modalbox.addClass("right"), modal.link.hasClass("top") && modal.modalbox.addClass("top"))), window.modalcount = window.modalcount ? window.modalcount + 1 : 1, modal.id = "modal" + window.modalcount, modal.modalbox.on("keydown", function(e) {
				27 == e.keyCode && $.inArray("no-close", e.currentTarget.classList) < 0 && modal.close()
			}).on("toggle-open-bubble", ".secondary.toggle-area", function(e) {
				e.target == this && modal.modalbox.addClass("splitted")
			}).on("toggle-close-bubble", ".secondary.toggle-area", function(e) {
				e.target == this && modal.modalbox.removeClass("splitted")
			}).on("show-more-bubble show-less-bubble", function() {
				modal.modalbox.height("auto")
			}).on("refetch", modal.refetch).on("open", function(e, empty) {
				e.target === modal.modalbox[0] && modal.open(empty)
			}).on("success", function(e) {
				e.stopPropagation(), setTimeout(function() {
					modal.modalbox.trigger("close", [!1, !0])
				}, 1e3)
			}).on("open-as-previous", function() {
				modal.modalbox.addClass("open"), modal.markAsOpen()
			}), $(window).on("hashchange", modal.hashchange), modal.content.appendTo(modal.modalbox), modal.link.data("largeclosebtn") === !0 ? modal.closebtnLarge.appendTo(modal.modalbox) : modal.closebtn.appendTo(modal.modalbox), modal.link.on("click", modal.linkclick), (modal.opt.preload || modal.link.data("preload") && "false" != modal.link.data("preload")) && (modal.opt.preload = !0, modal.loadData(), modal.modalbox.appendTo("form")), modal.link.addClass("modal-loaded"), "function" == typeof callback && callback.call(modal), this
		}
	};
	if (!$(this).hasClass("modal-loaded")) return modal.init()
};
var ICA = ICA || {};
ICA.Components = ICA.Components || {}, ICA.Components.RangeSlider = function(args, callback) {
	var range = {
		opt: $.extend({
			counter: !1
		}, args),
		obj: $(this),
		min: 0,
		max: 10,
		value: 0,
		step: !1,
		handle: $(".handle", this),
		counter: $('<span class="counter">0</span>'),
		translate3d: "CSSMatrix" in window && "m11" in new CSSMatrix || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix || "MozCSSMatrix" in window && "m11" in new MozCSSMatrix || "MSCSSMatrix" in window && "m11" in new MSCSSMatrix,
		translate2d: "CSSMatrix" in window || "WebKitCSSMatrix" in window || "MozCSSMatrix" in window || "MSCSSMatrix" in window,
		transition: function(s) {
			return "transition" in s || "webkitTransition" in s || "MozTransition" in s || "msTransition" in s || "OTransition" in s
		}(document.createElement("div").style),
		pos: 0,
		moving: !1,
		touchstart: function(e) {
			e = e.originalEvent, range.moving = !1, range.startPos = range.movePos = {
				x: e.touches && 0 !== e.touches[0].pageX ? e.touches[0].pageX : e.pageX,
				y: e.touches && 0 !== e.touches[0].pageY ? e.touches[0].pageY : e.pageY
			}, range.obj.on("touchmove mousemove", range.touchmove).on("touchend mouseup mouseout", range.touchend)
		},
		touchmove: function(e) {
			e && (e = e.originalEvent, range.movePos = {
				x: range.startPos.x - (e.touches && 0 != e.touches[0].pageX ? e.touches[0].pageX : e.pageX),
				y: range.startPos.y - (e.touches && 0 != e.touches[0].pageY ? e.touches[0].pageY : e.pageY)
			}, range.movePos.x && (!range.moving && Math.abs(range.movePos.x) > 5 && (range.moving = !0), range.moving && e.preventDefault(), range.move(range.pos - range.movePos.x), range.update(range.pos - range.movePos.x)))
		},
		touchend: function(e) {
			range.moving && (range.pos = range.pos - range.movePos.x, range.value = range.getValue(range.pos), range.step && (range.value = Math.round(range.value / range.step) * range.step, range.moveTo(range.value, !0)), range.update(range.pos)), range.obj.off("touchmove mousemove", range.touchmove).off("touchend mouseup mouseout", range.touchend)
		},
		click: function(e) {
			if (!range.moving) {
				var offset = e.pageX - range.obj.offset().left;
				range.pos + range.handle.width() / 2 - offset > 0 ? range.stepLeft() : range.stepRight()
			}
		},
		getValue: function(pos) {
			return pos / range.obj.width() * (range.max - range.min) + parseInt(range.min)
		},
		stepRight: function() {
			range.moveTo(range.value + 1, !0)
		},
		stepLeft: function() {
			range.moveTo(range.value - 1, !0)
		},
		keydown: function(e) {
			switch (e.keyCode) {
			case 13:
				break;
			case 40:
			case 37:
				range.stepLeft();
				break;
			case 38:
			case 39:
				range.stepRight()
			}
		},
		update: function(pos) {
			range.value = range.getValue(pos), range.value < range.min ? range.value = range.min : range.value > range.max && (range.value = range.max), range.step && (range.value = Math.round(range.value / range.step) * range.step), range.counter.text(range.value), range.obj.trigger("update", range.value)
		},
		moveTo: function(value, animate) {
			value < range.min ? value = range.min : value > range.max && (value = range.max), range.pos = (value - range.min) / (range.max - range.min) * range.obj.width(), range.move(range.pos, animate), range.update(range.pos, !0)
		},
		move: function(left, animate) {
			left < 0 ? left = range.pos = 0 : left > range.obj.width() && (left = range.pos = range.obj.width());
			var css;
			animate ? range.obj.addClass("animate") : range.obj.removeClass("animate"), css = range.translate3d ? {
				"-webkit-transform": "translate3d(" + left + "px, 0, 0 )",
				"-moz-transform": "translate3d(" + left + "px, 0, 0 )",
				transform: "translate3d(" + left + "px, 0, 0 )"
			} : range.translate2d ? {
				"-webkit-transform": "translate(" + left + "px, 0)",
				"-moz-transform": "translate(" + left + "px, 0)",
				transform: "translate(" + left + "px, 0)"
			} : {
				"margin-left": left + "px"
			}, animate && !range.transition ? range.handle.animate(css, 500) : range.handle.css(css)
		},
		prevent: function(e) {
			return e && (e.stopPropagation(), e.preventDefault()), !1
		},
		resize: function() {},
		init: function() {
			return range.handle.attr("data-min") && (range.min = parseInt(range.handle.attr("data-min"))), range.handle.attr("data-max") && (range.max = parseInt(range.handle.attr("data-max"))), range.handle.attr("data-step") && (range.step = parseInt(range.handle.attr("data-step"))), range.handle.attr("data-value") ? range.moveTo(parseInt(range.handle.attr("data-value"))) : range.moveTo(range.min), range.opt.counter && range.counter.insertBefore(range.obj), range.obj.on("click", range.click).on("keydown", range.keydown).on("change", range.change).on("touchstart mousedown", range.touchstart).on("dragstart", range.prevent), range.obj.on("mouseout", ".bar, .handle", range.prevent), range.obj
		}
	};
	if (!$(this).hasClass("range-loaded")) return range.init()
};
var ICA = ICA || {};
ICA.Components = ICA.Components || {}, ICA.Components.ShowMore = function(args, callback) {
	var showmore = {
		opt: $.extend({
			moretext: "Visa mer",
			lesstext: "Visa mindre"
		}, args),
		obj: $(this),
		content: void 0,
		morebtn: $('<a href="#" class="togglebtn" role="button">Visa mer</a>'),
		scrollposition: void 0,
		isopen: !1,
		toggle: function() {
			return showmore.isopen ? showmore.obj.trigger("showless") : showmore.obj.trigger("showmore"), !1
		},
		open: function() {
			if (showmore.obj.parent(".plank")) {
				var background = showmore.obj.parent(".plank").prev(".background");
				background.css("height", background.height() + "px")
			}
			showmore.obj.addClass("open"), showmore.isopen = !0, showmore.morebtn.text(showmore.opt.lesstext), showmore.obj.trigger("show-more-bubble"), showmore.scrollposition = $(window).scrollTop()
		},
		close: function() {
			if (showmore.obj.parent(".plank")) {
				var background = showmore.obj.parent(".plank").prev(".background");
				background.css("height", "100%")
			}
			showmore.obj.removeClass("open"), showmore.isopen = !1, showmore.morebtn.text(showmore.opt.moretext), showmore.obj.trigger("show-less-bubble"), $("body, html").animate({
				scrollTop: showmore.scrollposition
			}, 300)
		},
		setup: function() {
			if (!showmore.isopen) {
				var height = showmore.obj.addClass("check").height(),
					tooManyLinksInList = height > showmore.obj.height();
				showmore.obj.removeClass("check"), tooManyLinksInList || showmore.obj.hasClass("always-show-more-button") ? (!showmore.obj.hasClass("always-show-more-button") || 0 != showmore.obj.find(".block-links").length && tooManyLinksInList || showmore.morebtn.addClass("non-mobile-removed"), showmore.obj.append(showmore.morebtn)) : showmore.morebtn.detach()
			}
		},
		resize: function() {
			clearTimeout(showmore.resizeto), showmore.resizeto = setTimeout(showmore.setup, 200)
		},
		init: function() {
			return showmore.morebtn.on("click", showmore.toggle), showmore.obj.on("showmore", showmore.open).on("showless", showmore.close), showmore.obj.addClass("showmore-loaded"), $(window).on("resize", showmore.resize), showmore.setup(), "function" == typeof callback && callback.call(), this
		}
	};
	if (!$(this).hasClass("showmore-loaded")) return showmore.init()
};
var ICA = ICA || {};
ICA.Components = ICA.Components || {}, ICA.Components.Slideshow = function(args, callback, slidecallback) {
	var slideshow = {
		opt: $.extend({
			effect: "fade",
			duration: 500,
			counter: !0,
			controls: !1,
			interval: 8e3,
			height: 0,
			setHeight: !1
		}, args),
		obj: $(this).addClass("slideshow"),
		list: $("ul", this),
		items: $("li", this),
		isactive: !1,
		activeItem: !1,
		running: !1,
		startItemIndex: $(this).attr("data-startitemindex") ? $(this).attr("data-startitemindex") : 0,
		controls: {
			container: $('<div class="controls"></div>'),
			prevbtn: $('<a href="#" role="slideshow-button" class="prevbtn sprite1" rel="prev">Prev</a>'),
			nextbtn: $('<a href="#" role="slideshow-button" class="nextbtn sprite1" rel="next">Next</a>'),
			list: $('<ol class="counter"></ol>'),
			enable: function() {
				slideshow.opt.controls && (slideshow.controls.prevbtn.on("click", slideshow.prev), slideshow.controls.nextbtn.on("click", slideshow.next)), slideshow.controls.container.insertAfter(slideshow.list)
			},
			disable: function() {
				slideshow.opt.controls && (slideshow.controls.prevbtn.off("click", slideshow.prev), slideshow.controls.nextbtn.off("click", slideshow.next)), slideshow.controls.container.detach()
			},
			init: function() {
				slideshow.opt.controls ? (slideshow.controls.prevbtn.appendTo(slideshow.controls.container), slideshow.controls.nextbtn.appendTo(slideshow.controls.container)) : slideshow.opt.counter && (slideshow.items.each(function(i) {
					var item = $(this),
						controlitem = $('<li class="sprite2">' + i + "</li>").appendTo(slideshow.controls.list).on("click", function() {
							if (!item.hasClass("active")) {
								var direction = item.siblings(".active").index() > item.index() ? "right" : "left";
								item.trigger("activate", direction)
							}
						});
					item.on("activate", function() {
						controlitem.addClass("active")
					}).on("inactivate", function() {
						controlitem.removeClass("active")
					})
				}), slideshow.controls.list.appendTo(slideshow.controls.container))
			}
		},
		mouseover: function() {
			slideshow.pause()
		},
		mouseout: function() {
			slideshow.run()
		},
		touchstart: function(e) {
			slideshow.isscrolling = slideshow.ismoving = !1, e && (e = e.originalEvent, slideshow.istouching = !0, slideshow.touchStartPos = {
				x: e.touches && 0 != e.touches[0].pageX ? e.touches[0].pageX : e.pageX,
				y: e.touches && 0 != e.touches[0].pageY ? e.touches[0].pageY : e.pageY,
				t: new Date
			}, slideshow.obj.on("touchmove", slideshow.touchmove).on("touchend", slideshow.touchend))
		},
		touchmove: function(e) {
			slideshow.istouching && e && (e = e.originalEvent, slideshow.touchMovePos = {
				x: slideshow.touchStartPos.x - (e.touches && 0 != e.touches[0].pageX ? e.touches[0].pageX : e.pageX),
				y: slideshow.touchStartPos.y - (e.touches && 0 != e.touches[0].pageY ? e.touches[0].pageY : e.pageY)
			}, !slideshow.ismoving && Math.abs(slideshow.touchMovePos.y) > Math.abs(slideshow.touchMovePos.x) ? slideshow.isscrolling = !0 : slideshow.ismoving = !0, slideshow.ismoving && (e.preventDefault(), slideshow.touchMovePos.x > 50 ? (slideshow.next(), slideshow.touchend()) : slideshow.touchMovePos.x < -50 && (slideshow.prev(), slideshow.touchend())))
		},
		touchend: function() {
			slideshow.istouching = slideshow.ismoving = !1, slideshow.touchMovePos = slideshow.touchStartPos = {
				x: 0,
				y: 0,
				t: 0
			}, slideshow.obj.off("touchmove", slideshow.touchmove).off("touchend", slideshow.touchend)
		},
		activateItem: function(e, direction) {
			direction && (slideshow.activeItem ? (slideshow.activeItem.trigger("inactivate", direction), slideshow.activeItem = $(this).addClass("active slidein-" + direction)) : slideshow.activeItem = $(this).addClass("active"), "function" == typeof slidecallback && slidecallback.call(slideshow.activeItem), setTimeout(slideshow.removeClasses, 500))
		},
		inactivateItem: function(e, direction) {
			direction = direction ? direction : "left", $(this).hasClass("active") && $(this).removeClass("active").addClass("slideout-" + direction)
		},
		removeClasses: function() {
			slideshow.items.removeClass("slideout-left slideout-right slidein-left slidein-right")
		},
		prev: function() {
			return !slideshow.activeItem || slideshow.activeItem.is(":first-child") ? slideshow.items.last().trigger("activate", "right") : slideshow.activeItem.prev().trigger("activate", "right"), !1
		},
		next: function() {
			return !slideshow.activeItem || slideshow.activeItem.is(":last-child") ? slideshow.items.first().trigger("activate", "left") : slideshow.activeItem.next().trigger("activate", "left"), !1
		},
		pause: function() {
			clearInterval(slideshow.interval), clearTimeout(slideshow.resizeto), slideshow.running = !1, slideshow.obj.off("mouseover", slideshow.pause), slideshow.obj.on("mouseout", slideshow.run)
		},
		run: function() {
			0 != slideshow.startItemIndex && (slideshow.activeItem = $(slideshow.items.get(slideshow.startItemIndex))), slideshow.activeItem ? slideshow.activeItem.addClass("active") : slideshow.next(), slideshow.obj.off("mouseout", slideshow.run), slideshow.opt.interval && slideshow.opt.interval > 0 && $(window).width() > 599 && (slideshow.running = !0, clearInterval(slideshow.interval), slideshow.interval = setInterval(slideshow.next, slideshow.opt.interval), slideshow.obj.on("mouseover", slideshow.pause))
		},
		inViewport: function() {
			var offset = slideshow.obj.offset().top,
				scrolltop = $(window).scrollTop();
			offset + slideshow.obj.height() / 2 - scrolltop > 0 && offset + slideshow.obj.height() / 2 - scrolltop < $(window).height() ? slideshow.running || slideshow.run() : slideshow.running && slideshow.pause()
		},
		activate: function() {
			slideshow.isactive || (slideshow.obj.on("stop", slideshow.pause).on("touchstart", slideshow.touchstart).on("activate", "li", slideshow.activateItem).on("inactivate", "li", slideshow.inactivateItem).on("toggle-open-bubble toggle-close-bubble", slideshow.setup), slideshow.run(), slideshow.controls.enable(), $(window).on("scroll", slideshow.inViewport).on("resize", slideshow.resize), slideshow.isactive = !0, slideshow.setup())
		},
		inactivate: function() {
			slideshow.isactive && (slideshow.obj.off("mouseover", slideshow.mouseover).off("mouseout", slideshow.mouseout).off("stop", slideshow.pause).off("touchstart", slideshow.touchstart).off("activate", "li", slideshow.activateItem).off("inactivate", "li", slideshow.inactivateItem).off("toggle-open-bubble toggle-close-bubble", slideshow.setup), slideshow.list.css({
				"min-height": ""
			}), slideshow.pause(), slideshow.controls.disable(), $(window).off("scroll", slideshow.inViewport).off("resize", slideshow.resize), slideshow.opt.setHeight && slideshow.list.css({
				"min-height": ""
			}), slideshow.isactive = !1)
		},
		setup: function() {
			if (slideshow.opt.setHeight) {
				slideshow.list.removeClass("setheight");
				var height = 0;
				slideshow.items.each(function() {
					var $this = $(this);
					$this.addClass("setup").height() > height && (height = $this.height()), $this.removeClass("setup")
				}), slideshow.list.css({
					"min-height": height + "px"
				}).addClass("setheight")
			}
		},
		resize: function(e) {
			clearTimeout(slideshow.resizeto), slideshow.resizeto = setTimeout(slideshow.setup, 200), slideshow.running && $(this).width() < 600 && slideshow.pause()
		},
		init: function() {
			return slideshow.items.length > 1 ? ((slideshow.obj.hasClass("controls") || slideshow.obj.data("controls")) && (slideshow.opt.controls = !0, slideshow.obj.addClass("controls")), slideshow.obj.data("counter") && (slideshow.opt.controls = slideshow.obj.data("counter")), slideshow.obj.attr("data-interval") && (slideshow.opt.interval = slideshow.obj.attr("data-interval")), slideshow.obj.attr("data-setheight") && (slideshow.opt.setHeight = !0), slideshow.controls.init(), slideshow.obj.on("addclass", function(e, classList) {
				classList.match(/slideshow/g) && slideshow.activate()
			}).on("removeclass", function(e, classList) {
				classList.match(/slideshow/g) && slideshow.inactivate()
			}), slideshow.activate(), slideshow.setup(), slideshow.obj.addClass("slideshow-loaded"), "function" == typeof callback && callback.call(slideshow)) : $("li", slideshow.obj).addClass("active"), slideshow
		}
	};
	if (!$(this).hasClass("slideshow-loaded")) return slideshow.init()
};
var ICA = ICA || {};
ICA.Components = ICA.Components || {}, ICA.Components.TabList = function(args, callback) {
	var tablist = {
		opt: $.extend({
			history: !1
		}, args),
		obj: $(this),
		isSelect: $(this).is("select"),
		container: $(this).parent(),
		tabs: $(">li", this),
		active: void 0,
		SelectTabs: function() {
			var select = {
				obj: $(this),
				options: $(">option", this),
				active: void 0,
				isactive: !1,
				Option: function() {
					var option = {
						obj: $(this),
						isactive: !1,
						value: $(this).attr("value"),
						tabpanel: void 0,
						activate: function() {
							select.active != option && (select.active ? select.active.trigger("inactivate") : select.options.trigger("inactivate"), select.active = option.obj, select.obj.val(option.value), option.isactive = !0, option.tabpanel.activate(), option.obj.data("selector") && $(option.obj.data("selector")).show())
						},
						inactivate: function() {
							option.obj.data("selector") && $(option.obj.data("selector")).hide(), option.isactive = !1, option.tabpanel.inactivate()
						},
						init: function() {
							option.obj.on("activate", option.activate).on("inactivate", option.inactivate), option.tabpanel = $("#" + option.obj.attr("value")).create(tablist.TabPanel, option)
						}
					};
					return option.init()
				},
				change: function() {
					select.obj.find(">option[value=" + select.obj.val() + "]").trigger("activate")
				},
				init: function() {
					select.options.create(select.Option), select.obj.on("change", select.change), select.change()
				}
			};
			return select.init()
		},
		TabPanel: function(tab, ajax) {
			if (!this) return !1;
			var tabpanel = {
				obj: $(this).attr({
					tabIndex: "-1"
				}),
				tab: tab,
				id: $(this).attr("id") ? $(this).attr("id") : "generatedid",
				activate: function(e) {
					e && e.stopPropagation(), tabpanel.tab.isactive ? tabpanel.obj.addClass("active").attr({
						"aria-hidden": "false"
					}).trigger("resize") : tabpanel.tab.activate()
				},
				inactivate: function(e) {
					e && e.stopPropagation(), tabpanel.tab.isactive ? tabpanel.tab.inactivate() : tabpanel.obj.removeClass("active").attr({
						"aria-hidden": "true"
					})
				},
				fetchContent: function(url, id) {
					tabpanel.obj.on("activate", function() {
						ICA.legacy.get(url, {}, tabpanel.ajaxsuccess)
					})
				},
				ajaxsuccess: function(data) {
					tabpanel.obj.html($("#" + id, data).html()), tabpanel.obj.trigger("initDom")
				},
				init: function() {
					return tabpanel.obj.addClass("tabpanel").attr({
						id: tabpanel.id,
						"aria-labelledby": "tab-" + tabpanel.id,
						role: "tabpanel"
					}), tabpanel.obj.on("activatetab", tabpanel.activate).on("inactivatetab", tabpanel.inactivate), tabpanel.inactivate(), tabpanel
				}
			};
			return tabpanel.init()
		},
		Tab: function() {
			var tab = {
				obj: $(this),
				link: $("a", this).attr({
					tabIndex: "-1"
				}),
				isactive: !1,
				tabpanel: void 0,
				activate: function(e) {
					return e && e.preventDefault(), !tab.isactive && (tablist.active && tablist.active.inactivate(), tablist.active = tab, tab.isactive = !0, tab.obj.addClass("active").attr({
						tabIndex: 0,
						"aria-pressed": "true"
					}), tab.link.addClass("active"), tab.obj.trigger("tab-activated"), tab.tabpanel && !tab.tabpanel.obj.hasClass("active") && tab.tabpanel.activate(), tab.link.data("selector") && $(tab.link.data("selector")).show(), tablist.opt.history && tablist.obj.trigger("addtoHash", {
						tab: tab.tabpanel.id
					}), !(e && !1 in e) && void 0)
				},
				inactivate: function() {
					(tab.isactive || "undefined" == typeof tablist.active) && (tab.obj.removeClass("active").attr({
						tabIndex: -1,
						"aria-pressed": "false"
					}), tab.link.removeClass("active"), tab.isactive = !1, tab.tabpanel && tab.tabpanel.inactivate(), tab.link.data("selector") && $(tab.link.data("selector")).hide(), tab.obj.trigger("tab-inactivated"), tab.tabpanel && tablist.opt.history && tablist.obj.trigger("removefromHash", {
						tab: tab.tabpanel.id
					}))
				},
				hashChange: function(e, hashparams) {
					e.stopPropagation(), hashparams = window.theform.hashparams.tab, tablist.active !== tab && tab.tabpanel && ($.inArray(tab.tabpanel.id, hashparams) > -1 || tab.tabpanel.id == hashparams) && (tab.activate(), tablist.hashmatch = !0)
				},
				updateCount: function(e, count) {
					tab.link.attr("data-count", count)
				},
				init: function() {
					if (tab.obj.addClass("tab").attr({
						role: "tab",
						tabIndex: -1
					}).on("activate focus", tab.activate).on("inactivate", tab.inactivate).on("hashchange", tab.hashChange), tab.inactivate(), tab.link.addClass("needsclick"), tab.link.on("mousedown touchstart", function(e) {
						icadatalayer.add("tab", {
							tabName: tab.link.text()
						})
					}), tab.link.on("click", tab.activate), tab.link && "#" == tab.link.attr("href").substr(0, 1) && $(tab.link.attr("href")).length) tab.tabpanel = $(tab.link.attr("href")).create(tablist.TabPanel, tab), tab.obj.attr({
						id: "tab-" + tab.tabpanel.id
					}), tab.obj.attr("aria-controls", tab.tabpanel.id);
					else if (tab.link.attr("href").length > 5) {
						tab.tabpanel = $("<section></section>").create(tablist.TabPanel, tab), tab.obj.attr({
							id: "tab-" + tab.tabpanel.id
						}), tab.tabpanel.obj.appendTo(tablist.container);
						var split = tab.link.attr("href").split("#");
						tab.tabpanel.fetchContent(split[0], split.length > 1 ? split[1] : "")
					}
					return tab.tabpanel && tab.tabpanel.obj.on("updateCount", tab.updateCount), tab
				}
			};
			return tab.init()
		},
		keydown: function(e) {
			switch (e.keyCode) {
			case 9:
				window.shiftKey && tablist.active.obj.prev("li.tab").length && (e.preventDefault(), tablist.active.obj.prev("li").trigger("activate")), !window.shiftKey && tablist.active.obj.next("li.tab").length && (e.preventDefault(), tablist.active.obj.next("li").trigger("activate"));
				break;
			case 39:
				tablist.active.obj.next("li").trigger("activate");
				break;
			case 37:
				tablist.active.obj.prev("li").trigger("activate");
				break;
			case 13:
			case 40:
				tablist.active.tabpanel.obj.focus()
			}
		},
		hashChange: function() {
			var temphistory = tablist.opt.history;
			tablist.hashmatch = !1, "tab" in window.theform.hashparams && tablist.tabs.trigger("hashchange", window.theform.hashparams.tab), tablist.hashmatch || (tablist.opt.history = !1, tablist.active ? tablist.active.activate() : tablist.tabs.first().trigger("activate"), tablist.opt.history = temphistory)
		},
		init: function() {
			return tablist.obj.attr("data-history") && (tablist.opt.history = !0), tablist.wrapper = tablist.obj.wrap('<div class="tab-list-wrapper"></div>').parent(), tablist.obj.hasClass("inline") && tablist.wrapper.addClass("no-border"), tablist.obj.addClass("tab-list"), tablist.isSelect ? (tablist.wrapper.addClass("select-tabs"), tablist.obj.create(tablist.SelectTabs)) : tablist.tabs.create(tablist.Tab), tablist.obj.on("keydown", tablist.keydown), $(window).on("keydown", function(e) {
				e.keyCode && 16 == e.keyCode && (window.shiftKey = !0)
			}).on("keyup", function(e) {
				e.keyCode && 16 == e.keyCode && (window.shiftKey = !1)
			}), tablist.obj.addClass("tablist-loaded"), "function" == typeof callback && callback.call(tablist.wrapper), $(window).on("hashchange", tablist.hashChange), tablist.hashChange(), tablist
		}
	};
	if (!$(this).hasClass("tablist-loaded")) return tablist.init()
};
var ICA = ICA || {};
ICA.Components = ICA.Components || {}, ICA.Components.Toggle = function(args, callback) {
	var toggle = {
		opt: $.extend({}, args),
		obj: $(this),
		target: !! $(this).data("togglearea") && $($(this).data("togglearea")),
		isopen: !1,
		open: function(e) {
			toggle.target.addClass("open opening"), toggle.isopen = !0, toggle.obj.attr("aria-pressed", !0).addClass("open"), toggle.target.trigger("toggle-open-bubble"), setTimeout(function() {
				toggle.target.removeClass("opening")
			}, 500)
		},
		close: function(e) {
			e && e.stopPropagation(), toggle.isopen = !1, toggle.target.removeClass("open"), toggle.obj.attr("aria-pressed", !1).removeClass("open"), toggle.target.trigger("toggle-close-bubble")
		},
		toggle: function() {
			return toggle.isopen ? toggle.target.trigger("toggle-close") : toggle.target.trigger("toggle-open"), !1
		},
		init: function() {
			return toggle.obj.is("input, select, textarea") ? toggle.obj.is(":checkbox, :radio") ? toggle.obj.on("check", function() {
				toggle.target.trigger("toggle-open")
			}).on("uncheck", function() {
				toggle.target.trigger("toggle-close")
			}) : toggle.obj.on("focus", function() {
				toggle.isopen || toggle.target.trigger("toggle-open"), toggle.obj.is("[data-scroll-to-target]") && toggle.target.length && ICA.fn.scrollTo(toggle.target)
			}) : toggle.obj.on("click", toggle.toggle), toggle.target && toggle.target.on("toggle-close", toggle.close).on("toggle-open", toggle.open), toggle.obj.closest(".expand-filter-on-page-load").length > 0 && toggle.obj.click(), "function" == typeof callback && callback.call(toggle), toggle.obj.addClass("toggle-loaded"), toggle
		}
	};
	if (!$(this).hasClass("toggle-loaded")) return toggle.init()
};
var ICA = ICA || {};
ICA.Components = ICA.Components || {}, ICA.Components.init = function(container, thisonly) {
	if (thisonly) {
		var $container = $(container);
		$container.hasClass("carousel") && ($("li", $container).length > 0 ? $container.create(ICA.Components.Carousel) : $container.addClass("hidden")), $container.hasClass("slideshow") && $container.create(ICA.Components.Slideshow), $container.hasClass("details") && $container.create(ICA.Components.Details), $container.hasClass("modal") && $container.create(ICA.Components.Modal, {
			onload: function() {
				$(this).trigger("initDom"), $("form").trigger("initSearchField")
			}
		}), $container.is("fieldset") && $container.create(ICA.Components.FormHandler), $container.hasClass("overflow-toggle") && $container.create(ICA.Components.Navigation), $container.hasClass("tab-list") && $container.create(ICA.Components.TabList), $container.hasClass("loadmore") && $container.create(ICA.Components.LoadMore), $container.hasClass("truncate") && $container.create(ICA.Components.Truncate), $container.hasClass("show-more") && $container.create(ICA.Components.ShowMore), $container.hasClass("ajaxlink") && $container.create(ICA.Components.AjaxLink)
	} else $(".details, details", container).create(ICA.Components.Details), $(".callout", container).create(ICA.Components.Callout), $(".carousel", container).each(function() {
		var $this = $(this);
		$("li", $this).length > 0 ? $this.create(ICA.Components.Carousel) : $this.addClass("hidden")
	}), $(".slideshow", container).create(ICA.Components.Slideshow), $(".toggle", container).create(ICA.Components.Toggle), $("a.modal, button.modal", container).create(ICA.Components.Modal, {
		onload: function() {
			$(this).trigger("initDom"), $("form").trigger("initSearchField")
		}
	}), $("fieldset", container).create(ICA.Components.FormHandler), $(".tab-list", container).create(ICA.Components.TabList, {}, function() {
		$(">.tab-list", this).hasClass("inline") || $(">.tab-list", this).hasClass("noEllipsis") || $(this).create(overflowScroll)
	}), $(".loadmore:not(.panicbtn):not(.large-spinner)", container).create(ICA.Components.LoadMore), $(".loadmore.large-spinner:not(.panicbtn)", container).create(ICA.Components.LoadMore, {
		largespinner: !0
	}, void 0), $(".loadmore.panicbtn", container).create(ICA.Components.LoadMore, void 0, function() {
		this.closest(".modal-content").create(ICA.Components.PanicLayer)
	}), $(".similar-recipes-modal", container).create(ICA.Components.SimilarRecipesLayer), $(".truncate", container).create(ICA.Components.Truncate), $(".show-more", container).create(ICA.Components.ShowMore), $(".showmoreitems", container).create(ICA.Components.ShowMoreItems), $("noscript[data-src],noscript[data-tabletsrc],noscript[data-mobilesrc]", container).create(ICA.Components.LoadImage), $(".bg-image[data-src]", container).create(ICA.Components.LoadImage, {
		background: !0
	}), $(".bread-crumbs", container).create(ICA.Components.BreadCrumbs), $("a.video", container).create(ICA.Components.Video), $(".columned", container).create(ICA.Components.Columned), $(".calculate[data-value][data-math]", container).create(ICA.Components.Calculate), $(".table", container).create(ICA.Components.Table), $(".select-ajaxupdate", container).create(ICA.Components.SelectAjaxUpdate), $(".loadmorelist", container).create(ICA.Components.LoadMoreList), $(".ajaxlink", container).create(ICA.Components.AjaxLink), $(".errormessage", container).create(ICA.Components.ErrorMessage)
};
var ICA = ICA || {};
ICA.Components = ICA.Components || {}, ICA.Components.Truncate = function(args, callback) {
	var trunc = {
		opt: $.extend({
			toggle: !1,
			maxHeight: 50,
			maxChars: !1,
			maxWidth: !1,
			minWidth: 0
		}, args),
		obj: $(this),
		children: $(">*", this),
		fullstring: $(this).text(),
		string: "",
		truncated: !0,
		togglebtn: $('<a href="#" class="togglebtn" role="button">Visa mer</a>'),
		toggle: function() {
			return trunc.truncated ? trunc.showmore() : trunc.truncate(), !1
		},
		truncate: function() {
			trunc.truncated = !0
		},
		showmore: function() {
			trunc.truncated = !0, trunc.obj.html(trunc.fullstring), trunc.obj.trigger("trunc-showmore")
		},
		resize: function() {
			clearTimeout(trunc.to), trunc.truncated && (!trunc.opt.maxWidth || $(window).width() < trunc.opt.maxWidth) && !trunc.opt.minWidth && $(window).width() > trunc.opt.minWidth ? trunc.to = setTimeout(function() {
				if (trunc.obj.hasClass("truncate")) if (trunc.string = trunc.fullstring, trunc.opt.maxChars) trunc.obj.html(trunc.string.substr(0, trunc.opt.maxChars) + "...").attr("title", trunc.fullstring);
				else {
					for (trunc.obj.html(trunc.string); trunc.obj.height() > trunc.opt.maxHeight;) {
						var words = trunc.string.split(" ");
						trunc.string = words.splice(0, words.length - 5).join(" ") + " ...", trunc.obj.html(trunc.string), trunc.opt.toggle && trunc.togglebtn.appendTo(trunc.obj).on("click", trunc.toggle)
					}
					trunc.string != trunc.fullstring && trunc.obj.trigger("trunc-truncated"), trunc.obj.attr("title", trunc.fullstring)
				}
			}, 100) : trunc.obj.html(trunc.fullstring)
		},
		init: function() {
			return trunc.obj.attr("data-maxheight") && (trunc.opt.maxHeight = trunc.obj.attr("data-maxheight")), trunc.obj.attr("data-maxchar") && (trunc.opt.maxChars = trunc.obj.attr("data-maxchar"), trunc.opt.maxHeight = !1), trunc.obj.attr("data-trunctoggletext") && trunc.togglebtn.text(trunc.obj.attr("data-trunctoggletext")), trunc.obj.attr("data-trunctoggle") && (trunc.opt.toggle = !! trunc.obj.attr("data-trunctoggle")), $(window).on("resize", trunc.resize), trunc.resize(), "function" == typeof callback && callback.call(trunc.obj), trunc.obj.addClass("truncate-loaded"), this
		}
	};
	if (!$(this).hasClass("truncate-loaded")) return trunc.init()
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
$.fn.onBreak = function(breakcallback, unbreakcallback, maxHeight) {
	function init() {
		var resizeto, obj = $(this),
			list = obj.is("ul") ? obj : $("ul", obj).first(),
			items = $("li", list);
		maxHeight || (maxHeight = items.first().height() + 5), obj.on("resize", function(e) {
			e.stopPropagation(), clearTimeout(resizeto), resizeto = setTimeout(function() {
				obj.trigger("unbroken"), "function" == typeof unbreakcallback && unbreakcallback.call(obj), list.height() > maxHeight && (obj.trigger("broken"), "function" == typeof breakcallback && breakcallback.call(obj))
			}, 1)
		})
	}
	var objs = $(this);
	return $(window).resize(function() {
		objs.trigger("resize")
	}), objs.each(init)
}, $.fn.onTap = function(callback) {
	function Tap() {
		var tap = {
			obj: $(this),
			tapped: !1,
			startPos: {
				x: 0,
				y: 0,
				t: void 0
			},
			movePos: {
				x: 0,
				y: 0
			},
			touchstart: function(e) {
				e = e.originalEvent, tap.target = $(e.target), tap.tapped = !1, tap.startPos = tap.movePos = {
					x: e.touches && 0 != e.touches[0].screenX ? e.touches[0].screenX : e.screenX,
					y: e.touches && 0 != e.touches[0].screenY ? e.touches[0].screenY : e.screenY,
					t: new Date
				}, tap.obj.on("touchmove", tap.touchmove)
			},
			touchmove: function(e) {
				e = e.originalEvent, tap.movePos = {
					x: e.touches && 0 != e.touches[0].screenX ? e.touches[0].screenX : e.screenX,
					y: e.touches && 0 != e.touches[0].screenY ? e.touches[0].screenY : e.screenY
				}
			},
			touchend: function(e) {
				var diff = {
					x: Math.abs(tap.movePos.x) - Math.abs(tap.startPos.x),
					y: Math.abs(tap.movePos.y) - Math.abs(tap.startPos.y),
					t: new Date - tap.startPos.t
				};
				diff.x < 10 && diff.y < 10 && (tap.tapped = !0, tap.target.trigger("tap", !0)), tap.obj.off("touchmove", tap.touchmove)
			},
			click: function(e, allow) {
				return tap.tapped || (e.preventDefault(), tap.obj.trigger("tap")), !1
			},
			abort: function(e) {},
			init: function() {
				tap.obj.on("touchstart", tap.touchstart).on("touchend", tap.touchend).on("click", tap.click), "function" == typeof callback && tap.obj.on("tap", callback)
			}
		};
		return tap.init()
	}
	return this.create(Tap)
}, $.fn.offTap = function(callback) {
	return this.each(function() {
		$(this).off("touchstart touchend click tap")
	})
}, $.fn.inViewport = function(truecallback, falsecallback, strict) {
	function test() {
		var status, offset = $(this).offset().top,
			scrolltop = $(window).scrollTop(),
			rounding = strict ? 1 : 2;
		offset + $(this).height() / rounding - scrolltop > 0 && offset + $(this).height() / rounding - scrolltop < $(window).height() ? status || ($(this).attr("data-inviewport", !0).addClass("in-viewport").removeClass("outside-viewport"), truecallback.call(this)) : (status || void 0 === status) && ($(this).attr("data-inviewport", !1).addClass("outside-viewport").removeClass("in-viewport"), falsecallback.call(this))
	}
	var theese = $(this).attr("data-inviewport", !1);
	return $(window).on("scroll resize", function() {
		theese.each(test)
	}), this.each(test)
}, function($) {
	"use strict";
	"function" != typeof String.prototype.trim && (String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, "")
	}), window.icaUtilities = {
		getValueNotPlaceholder: function($node) {
			return $node.val() == $node.attr("placeholder") ? "" : $node.val()
		},
		validate: {
			email: function(value) {
				return value.match(/^.+@.+\..+$/)
			}
		},
		dates: {
			numOfDaysBetween: function(date1, date2) {
				return date1 instanceof Date && date2 instanceof Date ? Math.round((date1 - date2) / 864e5) : -1
			}
		},
		scrollViewportToTop: function() {
			$("html, body").animate({
				scrollTop: 0
			}, 200)
		},
		truncateString: function(str, maxLen, overflowSign) {
			return overflowSign = overflowSign ? overflowSign : "...", str.length > maxLen ? str.substr(0, maxLen) + overflowSign : str
		}
	}
}(jQuery);
!
function($) {
	$.cookieBar = function(options, val) {
		if ("cookies" == options) var doReturn = "cookies";
		else if ("set" == options) var doReturn = "set";
		else var doReturn = !1;
		var defaults = {
			message: $("#cookiebarMessage").val(),
			acceptButton: !0,
			acceptText: $("#cookiebarAcceptText").val(),
			declineButton: !1,
			declineText: "Disable Cookies",
			policyButton: !0,
			policyText: $("#cookiebarPolicyText").val(),
			policyURL: $("#cookiebarPolicyLink").val(),
			autoEnable: !0,
			acceptOnContinue: !1,
			expireDays: 365,
			forceShow: !1,
			effect: "slide",
			element: "#bottom-bar",
			append: !1,
			fixed: !1,
			bottom: !1,
			zindex: "",
			redirect: String(window.location.href),
			domain: String(window.location.hostname),
			referrer: String(document.referrer)
		},
			options = $.extend(defaults, options),
			expireDate = new Date;
		expireDate.setTime(expireDate.getTime() + 24 * options.expireDays * 60 * 60 * 1e3), expireDate = expireDate.toGMTString();
		var i, aCookie, cookieEntry = "cb-enabled={value}; expires=" + expireDate + "; path=/",
			cookieValue = "",
			aCookies = document.cookie.split("; ");
		for (i = 0; i < aCookies.length; i++) aCookie = aCookies[i].split("="), "cb-enabled" == aCookie[0] && (cookieValue = aCookie[1]);
		if ("" == cookieValue && options.autoEnable && (cookieValue = "enabled", document.cookie = cookieEntry.replace("{value}", "enabled")), options.acceptOnContinue && options.referrer.indexOf(options.domain) >= 0 && String(window.location.href).indexOf(options.policyURL) == -1 && "cookies" != doReturn && "set" != doReturn && "accepted" != cookieValue && "declined" != cookieValue && (doReturn = "set", val = "accepted"), "cookies" == doReturn) return "enabled" == cookieValue || "accepted" == cookieValue;
		if ("set" == doReturn && ("accepted" == val || "declined" == val)) return document.cookie = cookieEntry.replace("{value}", val), "accepted" == val;
		var message = options.message ? options.message.replace("{policy_url}", options.policyURL) : "";
		if (options.acceptButton) var acceptButton = '<a href="" class="cb-enable sprite2" title="' + options.acceptText + '"></a>';
		else var acceptButton = "";
		if (options.declineButton) var declineButton = '<a href="" class="cb-disable">' + options.declineText + "</a>";
		else var declineButton = "";
		if (options.policyButton) var policyButton = '<a href="' + options.policyURL + '" class="cb-policy">' + options.policyText + "</a>";
		else var policyButton = "";
		if (options.fixed) if (options.bottom) var fixed = ' class="fixed bottom"';
		else var fixed = ' class="fixed"';
		else var fixed = "";
		if ("" != options.zindex) var zindex = ' style="z-index:' + options.zindex + ';"';
		else var zindex = "";
		!options.forceShow && "enabled" != cookieValue && "" != cookieValue || "" == message || (options.append ? $(options.element).append('<div id="cookie-bar" class="cookie-bar" ' + fixed + zindex + "><p>" + message + policyButton + declineButton + "</p>" + acceptButton + "</div>") : $(options.element).prepend('<div id="cookie-bar" class="cookie-bar"' + fixed + zindex + "><p>" + message + policyButton + declineButton + "</p>" + acceptButton + "</div>"), $("#aspnetForm").addClass("has-cookie"), $("#dashboard").css({
			position: "relative"
		}).css({
			top: "auto"
		}), $("#page-wrapper").css({
			"margin-top": "0px"
		})), $("#cookie-bar .cb-enable").click(function() {
			return document.cookie = cookieEntry.replace("{value}", "accepted"), "enabled" == cookieValue || "accepted" == cookieValue ? ("slide" == options.effect ? $("#cookie-bar").slideUp(300, function() {
				$("#cookie-bar").remove()
			}) : "fade" == options.effect ? $("#cookie-bar").fadeOut(300, function() {
				$("#cookie-bar").remove()
			}) : $("#cookie-bar").hide(0, function() {
				$("#cookie-bar").remove()
			}), setTimeout(function() {
				$("#aspnetForm").removeClass("has-cookie"), $(window).resize()
			}, 400), !1) : void(window.location = options.currentLocation)
		}), $("#cookie-bar .cb-disable").click(function() {
			var deleteDate = new Date;
			for (deleteDate.setTime(deleteDate.getTime() - 864e6), deleteDate = deleteDate.toGMTString(), aCookies = document.cookie.split("; "), i = 0; i < aCookies.length; i++) aCookie = aCookies[i].split("="), aCookie[0].indexOf("_") >= 0 ? document.cookie = aCookie[0] + "=0; expires=" + deleteDate + "; domain=" + options.domain.replace("www", "") + "; path=/" : document.cookie = aCookie[0] + "=0; expires=" + deleteDate + "; path=/";
			return document.cookie = cookieEntry.replace("{value}", "declined"), "enabled" != cookieValue || "accepted" == cookieValue ? ("slide" == options.effect ? $("#cookie-bar").slideUp(300, function() {
				$("#cookie-bar").remove()
			}) : "fade" == options.effect ? $("#cookie-bar").fadeOut(300, function() {
				$("#cookie-bar").remove()
			}) : $("#cookie-bar").hide(0, function() {
				$("#cookie-bar").remove()
			}), !1) : void(window.location = options.currentLocation)
		})
	}
}(jQuery);
!
function($, window, document, undefined) {
	function Plugin(element, options) {
		this.element = element, this.options = $.extend(!0, {}, defaults, options), this.options.share = options.share, this._defaults = defaults, this._name = pluginName, this.init()
	}
	var pluginName = "sharrre",
		defaults = {
			className: "sharrre",
			share: {
				googlePlus: !1,
				facebook: !1,
				twitter: !1,
				digg: !1,
				delicious: !1,
				stumbleupon: !1,
				linkedin: !1,
				pinterest: !1
			},
			shareTotal: 0,
			template: "",
			title: "",
			url: document.location.href,
			text: document.title,
			urlCurl: "",
			count: {},
			total: 0,
			shorterTotal: !0,
			enableHover: !0,
			enableCounter: !0,
			enableTracking: !1,
			hover: function() {},
			hide: function() {},
			click: function() {},
			render: function() {},
			buttons: {
				googlePlus: {
					url: "",
					urlCount: !1,
					size: "medium",
					lang: "en-US",
					annotation: ""
				},
				facebook: {
					url: "",
					urlCount: !1,
					action: "like",
					layout: "button_count",
					width: "",
					send: "false",
					faces: "false",
					colorscheme: "",
					font: "",
					lang: "en_US"
				},
				twitter: {
					url: "",
					urlCount: !1,
					count: "horizontal",
					hashtags: "",
					via: "",
					related: "",
					lang: "en"
				},
				digg: {
					url: "",
					urlCount: !1,
					type: "DiggCompact"
				},
				delicious: {
					url: "",
					urlCount: !1,
					size: "medium"
				},
				stumbleupon: {
					url: "",
					urlCount: !1,
					layout: "1"
				},
				linkedin: {
					url: "",
					urlCount: !1,
					counter: ""
				},
				pinterest: {
					url: "",
					media: "",
					description: "",
					layout: "horizontal"
				}
			}
		},
		urlJson = {
			googlePlus: "",
			facebook: "https://graph.facebook.com/fql?q=SELECT%20url,%20normalized_url,%20share_count,%20like_count,%20comment_count,%20total_count,commentsbox_count,%20comments_fbid,%20click_count%20FROM%20link_stat%20WHERE%20url=%27{url}%27&callback=?",
			twitter: "http://cdn.api.twitter.com/1/urls/count.json?url={url}&callback=?",
			digg: "http://services.digg.com/2.0/story.getInfo?links={url}&type=javascript&callback=?",
			delicious: "http://feeds.delicious.com/v2/json/urlinfo/data?url={url}&callback=?",
			stumbleupon: "",
			linkedin: "http://www.linkedin.com/countserv/count/share?format=jsonp&url={url}&callback=?",
			pinterest: "http://api.pinterest.com/v1/urls/count.json?url={url}&callback=?"
		},
		loadButton = {
			googlePlus: function(self) {
				var sett = self.options.buttons.googlePlus;
				$(self.element).find(".buttons").append('<div class="button googleplus"><div class="g-plusone" data-size="' + sett.size + '" data-href="' + ("" !== sett.url ? sett.url : self.options.url) + '" data-annotation="' + sett.annotation + '"></div></div>'), window.___gcfg = {
					lang: self.options.buttons.googlePlus.lang
				};
				var loading = 0;
				"undefined" == typeof gapi && 0 == loading ? (loading = 1, function() {
					var po = document.createElement("script");
					po.type = "text/javascript", po.async = !0, po.src = "//apis.google.com/js/plusone.js";
					var s = document.getElementsByTagName("script")[0];
					s.parentNode.insertBefore(po, s)
				}()) : gapi.plusone.go()
			},
			facebook: function(self) {
				var sett = self.options.buttons.facebook;
				$(self.element).find(".buttons").append('<div class="button facebook"><div id="fb-root"></div><div class="fb-like" data-href="' + ("" !== sett.url ? sett.url : self.options.url) + '" data-send="' + sett.send + '" data-layout="' + sett.layout + '" data-width="' + sett.width + '" data-show-faces="' + sett.faces + '" data-action="' + sett.action + '" data-colorscheme="' + sett.colorscheme + '" data-font="' + sett.font + '" data-via="' + sett.via + '"></div></div>');
				var loading = 0;
				"undefined" == typeof FB && 0 == loading ? (loading = 1, function(d, s, id) {
					var js, fjs = d.getElementsByTagName(s)[0];
					d.getElementById(id) || (js = d.createElement(s), js.id = id, js.src = "//connect.facebook.net/" + sett.lang + "/all.js#xfbml=1", fjs.parentNode.insertBefore(js, fjs))
				}(document, "script", "facebook-jssdk")) : FB.XFBML.parse()
			},
			twitter: function(self) {
				var sett = self.options.buttons.twitter;
				$(self.element).find(".buttons").append('<div class="button twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-url="' + ("" !== sett.url ? sett.url : self.options.url) + '" data-count="' + sett.count + '" data-text="' + self.options.text + '" data-via="' + sett.via + '" data-hashtags="' + sett.hashtags + '" data-related="' + sett.related + '" data-lang="' + sett.lang + '">Tweet</a></div>');
				var loading = 0;
				"undefined" == typeof twttr && 0 == loading ? (loading = 1, function() {
					var twitterScriptTag = document.createElement("script");
					twitterScriptTag.type = "text/javascript", twitterScriptTag.async = !0, twitterScriptTag.src = "//platform.twitter.com/widgets.js";
					var s = document.getElementsByTagName("script")[0];
					s.parentNode.insertBefore(twitterScriptTag, s)
				}()) : $.ajax({
					url: "//platform.twitter.com/widgets.js",
					dataType: "script",
					cache: !0
				})
			},
			digg: function(self) {
				var sett = self.options.buttons.digg;
				$(self.element).find(".buttons").append('<div class="button digg"><a class="DiggThisButton ' + sett.type + '" rel="nofollow external" href="http://digg.com/submit?url=' + encodeURIComponent("" !== sett.url ? sett.url : self.options.url) + '"></a></div>');
				var loading = 0;
				"undefined" == typeof __DBW && 0 == loading && (loading = 1, function() {
					var s = document.createElement("SCRIPT"),
						s1 = document.getElementsByTagName("SCRIPT")[0];
					s.type = "text/javascript", s.async = !0, s.src = "//widgets.digg.com/buttons.js", s1.parentNode.insertBefore(s, s1)
				}())
			},
			delicious: function(self) {
				if ("tall" == self.options.buttons.delicious.size) var css = "width:50px;",
					cssCount = "height:35px;width:50px;font-size:15px;line-height:35px;",
					cssShare = "height:18px;line-height:18px;margin-top:3px;";
				else var css = "width:93px;",
					cssCount = "float:right;padding:0 3px;height:20px;width:26px;line-height:20px;",
					cssShare = "float:left;height:20px;line-height:20px;";
				var count = self.shorterTotal(self.options.count.delicious);
				"undefined" == typeof count && (count = 0), $(self.element).find(".buttons").append('<div class="button delicious"><div style="' + css + 'font:12px Arial,Helvetica,sans-serif;cursor:pointer;color:#666666;display:inline-block;float:none;height:20px;line-height:normal;margin:0;padding:0;text-indent:0;vertical-align:baseline;"><div style="' + cssCount + 'background-color:#fff;margin-bottom:5px;overflow:hidden;text-align:center;border:1px solid #ccc;border-radius:3px;">' + count + '</div><div style="' + cssShare + 'display:block;padding:0;text-align:center;text-decoration:none;width:50px;background-color:#7EACEE;border:1px solid #40679C;border-radius:3px;color:#fff;"><img src="http://www.delicious.com/static/img/delicious.small.gif" height="10" width="10" alt="Delicious" /> Add</div></div></div>'), $(self.element).find(".delicious").on("click", function() {
					self.openPopup("delicious")
				})
			},
			stumbleupon: function(self) {
				var sett = self.options.buttons.stumbleupon;
				$(self.element).find(".buttons").append('<div class="button stumbleupon"><su:badge layout="' + sett.layout + '" location="' + ("" !== sett.url ? sett.url : self.options.url) + '"></su:badge></div>');
				var loading = 0;
				"undefined" == typeof STMBLPN && 0 == loading ? (loading = 1, function() {
					var li = document.createElement("script");
					li.type = "text/javascript", li.async = !0, li.src = "//platform.stumbleupon.com/1/widgets.js";
					var s = document.getElementsByTagName("script")[0];
					s.parentNode.insertBefore(li, s)
				}(), s = window.setTimeout(function() {
					"undefined" != typeof STMBLPN && (STMBLPN.processWidgets(), clearInterval(s))
				}, 500)) : STMBLPN.processWidgets()
			},
			linkedin: function(self) {
				var sett = self.options.buttons.linkedin;
				$(self.element).find(".buttons").append('<div class="button linkedin"><script type="in/share" data-url="' + ("" !== sett.url ? sett.url : self.options.url) + '" data-counter="' + sett.counter + '"></script></div>');
				var loading = 0;
				"undefined" == typeof window.IN && 0 == loading ? (loading = 1, function() {
					var li = document.createElement("script");
					li.type = "text/javascript", li.async = !0, li.src = "//platform.linkedin.com/in.js";
					var s = document.getElementsByTagName("script")[0];
					s.parentNode.insertBefore(li, s)
				}()) : window.IN.init()
			},
			pinterest: function(self) {
				var sett = self.options.buttons.pinterest;
				$(self.element).find(".buttons").append('<div class="button pinterest"><a href="http://pinterest.com/pin/create/button/?url=' + ("" !== sett.url ? sett.url : self.options.url) + "&media=" + sett.media + "&description=" + sett.description + '" class="pin-it-button" count-layout="' + sett.layout + '">Pin It</a></div>'), function() {
					var li = document.createElement("script");
					li.type = "text/javascript", li.async = !0, li.src = "//assets.pinterest.com/js/pinit.js";
					var s = document.getElementsByTagName("script")[0];
					s.parentNode.insertBefore(li, s)
				}()
			}
		},
		tracking = {
			googlePlus: function() {},
			facebook: function() {
				fb = window.setInterval(function() {
					"undefined" != typeof FB && (FB.Event.subscribe("edge.create", function(targetUrl) {
						_gaq.push(["_trackSocial", "facebook", "like", targetUrl])
					}), FB.Event.subscribe("edge.remove", function(targetUrl) {
						_gaq.push(["_trackSocial", "facebook", "unlike", targetUrl])
					}), FB.Event.subscribe("message.send", function(targetUrl) {
						_gaq.push(["_trackSocial", "facebook", "send", targetUrl])
					}), clearInterval(fb))
				}, 1e3)
			},
			twitter: function() {
				tw = window.setInterval(function() {
					"undefined" != typeof twttr && (twttr.events.bind("tweet", function(event) {
						event && _gaq.push(["_trackSocial", "twitter", "tweet"])
					}), clearInterval(tw))
				}, 1e3)
			},
			digg: function() {},
			delicious: function() {},
			stumbleupon: function() {},
			linkedin: function() {},
			pinterest: function() {}
		},
		popup = {
			googlePlus: function(opt) {
				window.open("https://plus.google.com/share?hl=" + opt.buttons.googlePlus.lang + "&url=" + encodeURIComponent("" !== opt.buttons.googlePlus.url ? opt.buttons.googlePlus.url : opt.url), "", "toolbar=0, status=0, width=900, height=500")
			},
			facebook: function(opt) {
				window.open("http://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent("" !== opt.buttons.facebook.url ? opt.buttons.facebook.url : opt.url) + "&t=" + opt.text, "", "toolbar=0, status=0, width=900, height=500")
			},
			twitter: function(opt) {
				window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(opt.text) + "&url=" + encodeURIComponent("" !== opt.buttons.twitter.url ? opt.buttons.twitter.url : opt.url) + ("" !== opt.buttons.twitter.via ? "&via=" + opt.buttons.twitter.via : ""), "", "toolbar=0, status=0, width=650, height=360")
			},
			digg: function(opt) {
				window.open("http://digg.com/tools/diggthis/submit?url=" + encodeURIComponent("" !== opt.buttons.digg.url ? opt.buttons.digg.url : opt.url) + "&title=" + opt.text + "&related=true&style=true", "", "toolbar=0, status=0, width=650, height=360")
			},
			delicious: function(opt) {
				window.open("http://www.delicious.com/save?v=5&noui&jump=close&url=" + encodeURIComponent("" !== opt.buttons.delicious.url ? opt.buttons.delicious.url : opt.url) + "&title=" + opt.text, "delicious", "toolbar=no,width=550,height=550")
			},
			stumbleupon: function(opt) {
				window.open("http://www.stumbleupon.com/badge/?url=" + encodeURIComponent("" !== opt.buttons.delicious.url ? opt.buttons.delicious.url : opt.url), "stumbleupon", "toolbar=no,width=550,height=550")
			},
			linkedin: function(opt) {
				window.open("https://www.linkedin.com/cws/share?url=" + encodeURIComponent("" !== opt.buttons.delicious.url ? opt.buttons.delicious.url : opt.url) + "&token=&isFramed=true", "linkedin", "toolbar=no,width=550,height=550")
			},
			pinterest: function(opt) {
				window.open("http://pinterest.com/pin/create/button/?url=" + encodeURIComponent("" !== opt.buttons.pinterest.url ? opt.buttons.pinterest.url : opt.url) + "&media=" + encodeURIComponent(opt.buttons.pinterest.media) + "&description=" + opt.buttons.pinterest.description, "pinterest", "toolbar=no,width=700,height=300")
			}
		};
	Plugin.prototype.init = function() {
		var self = this;
		"" !== this.options.urlCurl && (urlJson.googlePlus = this.options.urlCurl + "?url={url}&type=googlePlus", urlJson.stumbleupon = this.options.urlCurl + "?url={url}&type=stumbleupon"), $(this.element).addClass(this.options.className), "undefined" != typeof $(this.element).data("title") && (this.options.title = $(this.element).attr("data-title")), "undefined" != typeof $(this.element).data("url") && (this.options.url = $(this.element).data("url")), "undefined" != typeof $(this.element).data("text") && (this.options.text = $(this.element).data("text")), $.each(this.options.share, function(name, val) {
			val === !0 && self.options.shareTotal++
		}), self.options.enableCounter === !0 ? $.each(this.options.share, function(name, val) {
			if (val === !0) try {
				self.getSocialJson(name)
			} catch (e) {}
		}) : "" !== self.options.template ? this.options.render(this, this.options) : this.loadButtons(), $(this.element).hover(function() {
			0 === $(this).find(".buttons").length && self.options.enableHover === !0 && self.loadButtons(), self.options.hover(self, self.options)
		}, function() {
			self.options.hide(self, self.options)
		}), $(this.element).click(function() {
			return self.options.click(self, self.options), !1
		})
	}, Plugin.prototype.loadButtons = function() {
		var self = this;
		$(this.element).append('<div class="buttons"></div>'), $.each(self.options.share, function(name, val) {
			1 == val && (loadButton[name](self), self.options.enableTracking === !0 && tracking[name]())
		})
	}, Plugin.prototype.getSocialJson = function(name) {
		var self = this,
			count = 0,
			url = urlJson[name].replace("{url}", encodeURIComponent(this.options.url));
		this.options.buttons[name].urlCount === !0 && "" !== this.options.buttons[name].url && (url = urlJson[name].replace("{url}", this.options.buttons[name].url)), "" != url && "" !== self.options.urlCurl ? $.getJSON(url, function(json) {
			if ("undefined" != typeof json.count) {
				var temp = json.count + "";
				temp = temp.replace("Â ", ""), count += parseInt(temp, 10)
			} else json.data && json.data.length > 0 && "undefined" != typeof json.data[0].total_count ? count += parseInt(json.data[0].total_count, 10) : "undefined" != typeof json[0] ? count += parseInt(json[0].total_posts, 10) : "undefined" != typeof json[0];
			self.options.count[name] = count, self.options.total += count, self.renderer(), self.rendererPerso()
		}).error(function() {
			self.options.count[name] = 0, self.rendererPerso()
		}) : (self.renderer(), self.options.count[name] = 0, self.rendererPerso())
	}, Plugin.prototype.rendererPerso = function() {
		var shareCount = 0;
		for (e in this.options.count) shareCount++;
		shareCount === this.options.shareTotal && this.options.render(this, this.options)
	}, Plugin.prototype.renderer = function() {
		var total = this.options.total,
			template = this.options.template;
		this.options.shorterTotal === !0 && (total = this.shorterTotal(total)), "" !== template ? (template = template.replace("{total}", total), $(this.element).html(template)) : $(this.element).html('<div class="box"><a class="count" href="#">' + total + "</a>" + ("" !== this.options.title ? '<a class="share" href="#">' + this.options.title + "</a>" : "") + "</div>")
	}, Plugin.prototype.shorterTotal = function(num) {
		return num >= 1e6 ? num = (num / 1e6).toFixed(2) + "M" : num >= 1e3 && (num = (num / 1e3).toFixed(1) + "k"), num
	}, Plugin.prototype.openPopup = function(site) {
		if (popup[site](this.options), this.options.enableTracking === !0) {
			var tracking = {
				googlePlus: {
					site: "Google",
					action: "+1"
				},
				facebook: {
					site: "facebook",
					action: "like"
				},
				twitter: {
					site: "twitter",
					action: "tweet"
				},
				digg: {
					site: "digg",
					action: "add"
				},
				delicious: {
					site: "delicious",
					action: "add"
				},
				stumbleupon: {
					site: "stumbleupon",
					action: "add"
				},
				linkedin: {
					site: "linkedin",
					action: "share"
				},
				pinterest: {
					site: "pinterest",
					action: "pin"
				}
			};
			_gaq.push(["_trackSocial", tracking[site].site, tracking[site].action])
		}
	}, Plugin.prototype.simulateClick = function() {
		var html = $(this.element).html();
		$(this.element).html(html.replace(this.options.total, this.options.total + 1))
	}, Plugin.prototype.update = function(url, text) {
		"" !== url && (this.options.url = url), "" !== text && (this.options.text = text)
	}, $.fn[pluginName] = function(options) {
		var args = arguments;
		return options === undefined || "object" == typeof options ? this.each(function() {
			$.data(this, "plugin_" + pluginName) || $.data(this, "plugin_" + pluginName, new Plugin(this, options))
		}) : "string" == typeof options && "_" !== options[0] && "init" !== options ? this.each(function() {
			var instance = $.data(this, "plugin_" + pluginName);
			instance instanceof Plugin && "function" == typeof instance[options] && instance[options].apply(instance, Array.prototype.slice.call(args, 1))
		}) : void 0
	}
}(jQuery, window, document);
!
function($) {
	"use strict";
	var recipe = {
		RecipePage: function(args) {
			var recipepage = {
				obj: $(this),
				recipeId: $(this).data("recipeid"),
				ingredients: $(".ingredients", this),
				instructions: $(".instructions", this),
				saveRecipeLink: $("a.save-recipe", this),
				printBtn: $("a.print", this),
				portions: $("#portions", this),
				portionDisclaimer: $(".portion-disclaimer"),
				portionDisclaimerClosebtn: $(".portion-disclaimer .closebtn"),
				commentForm: $(".comment-form", this),
				hseBanner: $(".hse-banner"),
				searchInput: $("#search2"),
				isPotionschanged: !1,
				saveRecipe: function(e) {
					return e.preventDefault(), recipepage.saveRecipeLink.hasClass("active") ? ICA.legacy.savedRecipes.remove(recipepage.recipeId, function(data) {
						recipepage.saveRecipeLink.removeClass("active")
					}) : ICA.legacy.savedRecipes.add(recipepage.recipeId, function(data) {
						icadatalayer.add("recipe-save"), recipepage.saveRecipeLink.addClass("active")
					}), !1
				},
				printRecipe: function() {
					return icadatalayer.add("recipe-print"), !1
				},
				changePotions: function() {
					recipepage.portions.val() != recipepage.defaultportions ? (recipepage.isPotionschanged = !0, recipepage.portionDisclaimer.removeClass("hidden")) : recipepage.portionDisclaimer.addClass("hidden")
				},
				closePortionDisclaimer: function(e) {
					e.preventDefault(), recipepage.portionDisclaimer.hide()
				},
				addRecipePageView: function() {
					ICA.legacy.recipepageViews(recipepage.recipeId)
				},
				trackCommentOnButtonClick: function() {
					icadatalayer.add("recipe-comment")
				},
				trackOnClickSearchInput: function() {
					icadatalayer.add("recipe-search-click")
				},
				CommentForm: function() {
					var form = {
						obj: $(this),
						submit: function(e, params) {
							form.obj.ajaxLoader(), ICA.legacy.comment.add({
								RecipeId: recipepage.recipeId,
								RecipeCommentText: params.comment,
								SendEmailToEditorialStaff: !! params.sendica,
								CommentatorEmail: params.email,
								GuidlinesOk: !! params.agreement
							}, form.success, form.error), recipepage.trackCommentOnButtonClick()
						},
						success: function(data) {
							form.obj.find(".spinner").remove(), "success" in data && data.success && $("form").trigger("refetch", [null, ["#comments", "#recipe-info-row"]])
						},
						error: function(msg) {
							window.log(msg), form.obj.find(".spinner").remove()
						},
						init: function() {
							form.obj.on("ajaxsubmit", form.submit)
						}
					};
					return form.init()
				},
				init: function(args) {
					recipepage.commentForm.create(recipepage.CommentForm), recipepage.defaultportions = recipepage.portions.val(), recipepage.saveRecipeLink.on("click", recipepage.saveRecipe), recipepage.portions.on("change", recipepage.changePotions), recipepage.obj.on("addRecipePageView", recipepage.addRecipePageView), recipepage.portionDisclaimerClosebtn.on("click", recipepage.closePortionDisclaimer), recipepage.printBtn.on("click", recipepage.printRecipe), $(document).on("initDom", function(e) {
						$(e.target).hasClass("email-recipe-modal") && $("fieldset", $(e.target)).on("success", function(e) {
							icadatalayer.add("recipe-send-by-email")
						})
					}), recipepage.searchInput.on("click", recipepage.trackOnClickSearchInput)
				}
			};
			return recipepage.init(args)
		},
		Weekplan: function() {
			var weekplan = {
				obj: $(this),
				id: $(this).data("weekplanid"),
				recipeId: $(this).data("recipeid"),
				recipeName: $(this).data("recipename"),
				openedFrom: $(this).data("openedfrom"),
				title: $(".title", this).text(),
				list: $("ul", this),
				items: $("li.day", this),
				newbtn: $("footer a", this),
				disclaimer: $(".disclaimer", this).length ? $(".disclaimer", this) : $('<section class="bg disclaimer></section>'),
				isflipped: !1,
				Day: function() {
					var day = {
						obj: $(this),
						link: $("a.block", this),
						dayNum: weekplan.items.index(this) + 1,
						hasrecipe: $(this).hasClass("has-recipe"),
						backside: void 0,
						flip: function() {
							day.obj.addClass("flipping"), setTimeout(function() {
								day.flipcard.toggleClass("flipped"), setTimeout(function() {
									day.obj.removeClass("flipping")
								}, 500)
							}, 100 * day.dayNum)
						},
						pick: function() {
							return weekplan.addRecipe(day.dayNum), !1
						},
						init: function() {
							day.obj.on("click", day.pick).on("flip", day.flip), day.flipcard = day.link.addClass("front").wrap('<div class="flip-card"></div>').parent(), day.flipcard = day.link.parent(), day.backside = day.link.clone(1), day.obj.addClass("day-loaded")
						}
					};
					if (!$(this).hasClass("day-loaded")) return day.init()
				},
				success: function(data) {
					"success" in data && data.success ? weekplan.obj.trigger("refetch") : "message" in data && data.message && weekplan.disclaimer.text(data.message).insertAfter(weekplan.list)
				},
				error: function(err) {},
				newWeekplan: function(callback) {
					var titlefield = $("input.title", weekplan.obj),
						title = titlefield.val().length ? titlefield.val() : titlefield.attr("placeholder");
					ICA.legacy.weekPlan.createWeekplan(title, function(data) {
						"success" in data && data.success && "message" in data && "" != data.message && (weekplan.id = data.message, ICA.legacy.setCookie("weekPlanLoggedInUserCookie", parseInt(weekplan.id), 100), "function" == typeof callback && callback())
					})
				},
				activate: function() {
					ICA.ajax.weekplan.setActiveWeekplan(weekplan.id, function(data) {}, function(err) {})
				},
				addRecipe: function(dayNum) {
					weekplan.id ? (ICA.legacy.weekPlan.addRecipe({
						recipeId: weekplan.recipeId,
						weekplanId: weekplan.id,
						dayNum: dayNum
					}, weekplan.success, weekplan.error), "DashboardRecipes" == weekplan.openedFrom ? icadatalayer.add("dashboard-recipes", {
						dashboardRecipes: {
							action: "add-recipe-to-weekplan",
							recipe: weekplan.recipeName
						}
					}) : icadatalayer.add("recipe-add-to-weekplan")) : weekplan.newWeekplan(function() {
						weekplan.addRecipe(dayNum)
					})
				},
				flip: function() {
					return weekplan.isflipped ? (weekplan.id = weekplan.originalid, weekplan.obj.removeClass("new"), weekplan.newbtn.text("Ny veckoplan")) : (weekplan.id = void 0, weekplan.obj.addClass("new"), weekplan.newbtn.text("Avbryt")), weekplan.isflipped = !weekplan.isflipped, weekplan.items.trigger("flip"), !1
				},
				init: function() {
					weekplan.originalid = weekplan.id, weekplan.newbtn.on("click", weekplan.flip), weekplan.items.create(weekplan.Day), weekplan.obj.on("closing", function() {
						weekplan.isflipped && weekplan.flip()
					}), weekplan.obj.addClass("weekplan-loaded")
				}
			};
			if (!$(this).hasClass("weekplan-loaded")) return weekplan.init()
		},
		AddToShoppinglist: function() {
			var list = {
				obj: $(this),
				recipeId: $(".hdnRecipeId", this).val(),
				recipeName: $(".hdnRecipeName", this).val(),
				openedFrom: $(this).data("openedfrom"),
				newListField: $("fieldset.addlist", this),
				newListInput: $("fieldset.addlist input", this),
				newbtn: $("footer .new-shoppinglist", this),
				lists: $("li a.add", this),
				addToList: function(listId, name) {
					var portions = $("select#portions"),
						recipesIds = list.getRecipeIds(),
						recipes = [];
					if (recipesIds.indexOf("[allGrillNMixRecipes]") !== -1) {
						if (recipesIds = [], "object" == typeof ICA.Services.RecipeService) {
							var RecipeService = ICA.Services.RecipeService;
							recipes = RecipeService.getRecipesAsAddToShoppingCartStructure()
						}
					} else {
						var $recipeView = $('recipe-view[data-recipe-id="' + list.recipeId + '"]');
						$recipeView[0] && (portions = $recipeView.find(".portions-value"))
					}
					ICA.legacy.shoppingList.add({
						recipeIds: recipesIds,
						recipes: JSON.stringify(recipes),
						ShoppingListId: listId ? listId : 0,
						shoppingListName: name ? name : "",
						numberOfServings: portions.length ? portions.val() : 0
					}, list.success, list.error), "DashboardRecipes" == list.openedFrom ? icadatalayer.add("dashboard-recipes", {
						dashboardRecipes: {
							action: "add-recipe-to-grocery-list",
							recipe: list.recipeName
						}
					}) : icadatalayer.add("recipe-add-to-grocerylist")
				},
				getRecipeIds: function() {
					if ("" !== list.recipeId) return [list.recipeId];
					var ids = [];
					return $(".dashboardweekplanrecipes input.recipeId").each(function() {
						ids.push($(this).val())
					}), ids
				},
				newList: function() {
					return list.obj.is(".new") ? (list.newbtn.text("Skapa ny inköpslista"), list.obj.removeClass("new")) : (list.newListField.trigger("newactiveform"), list.newbtn.text("Avbryt"), list.obj.addClass("new"), $(window).scrollTop() > list.newbtn.offset().top && $("html,body").animate({
						scrollTop: list.obj.offset().top - 40 + "px"
					}, 300)), !1
				},
				success: function(data) {
					if ("success" in data && data.success) {
						"message" in data && data.message && list.obj.html("<strong>" + data.message + "</strong>"), list.obj.trigger("success");
						var tool = $("#inkopslistor");
						tool[0] && tool.hasClass("loaded") && $("#inkopslistor").trigger("reload")
					}
				},
				error: function(err) {},
				init: function() {
					list.newbtn.on("click", list.newList), list.newListField.on("submit", function(e, params) {
						var title = "newlist" in params && "" != params.newlist ? params.newlist : list.newListInput.attr("placeholder");
						list.addToList(0, title)
					}), list.lists.on("click", function() {
						return $(this).attr("data-listid") && list.addToList($(this).data("listid")), !1
					}), list.obj.addClass("shoppinglist-loaded")
				}
			};
			if (!$(this).hasClass("shoppinglist-loaded")) return list.init()
		},
		RateRecipe: function() {
			var rate = {
				obj: $(this),
				status: $(".rate-status", this),
				links: $("a.grade", this),
				recipeId: $("#hdnRecipeId", this).val(),
				vote: function(grade) {
					ICA.legacy.recipeRating.vote({
						RecipeId: rate.recipeId,
						Rating: grade
					}, rate.success, rate.error), icadatalayer.add("recipe-rate", {
						recipeRate: grade
					})
				},
				success: function(data) {
					var $recipeRating = $("#recipeRating" + rate.recipeId);
					if ("success" in data && data.success) if ($("#page-wrapper").is(".halsaMasterPage") || $("#page-wrapper").is(".buffeMasterPage")) {
						var $rateRecipe = $(".recipe-info-row .rating-stars");
						$rateRecipe.data("rating", data.avgRating).find(".count_review").text(data.numberOfVotes).end().find(".grade").removeClass(function(index, css) {
							return (css.match(/(^|\s)grade-\S+/g) || []).join(" ")
						}).addClass("grade-" + data.avgRating.toString().replace(".", "-")), $(".addto-recept .icon-rate").parent().addClass("active"), rate.obj.trigger("success")
					} else {
						var $rateRecipe = $recipeRating.find("[data-avg-rating]");
						1 == data.numberOfVotes ? $rateRecipe.addClass("votes-singular") : $rateRecipe.removeClass("votes-singular"), $rateRecipe.attr("data-avg-rating", data.avgRating).removeClass("no-votes").find('.votes [itemprop="reviewCount"]').text(data.numberOfVotes), 0 == data.isLoggedIn || "false" == data.isLoggedIn ? $(".addto li:last").empty().html('<div class="active" title="Betygsatt"><span class="recipe-icon sprite2 icon-rate active"></span>Betygsatt</div>') : $(".addto li:last").find("a:first").addClass("active"), rate.obj.trigger("success")
					}
					$recipeRating.find(".rate-recipe").addClass("disabled")
				},
				error: function(msg) {
					window.log(msg), setTimeout(function() {
						rate.obj.trigger("close")
					}, 800)
				},
				init: function() {
					var clickFn = function() {
							rate.links.removeClass("active");
							var rating = $(this).data("rating");
							return rating = rating ? rating : rate.links.index(this) + 1, rate.vote(rating), rate.status.text($(this).data("value")), !1
						};
					rate.links.off("click").on("click", clickFn)
				}
			};
			return rate.init()
		},
		initDom: function(e) {
			var ispageload = !1;
			$(e.target).is(document) && (ispageload = !0);
			var container = $(e.target);
			container.is(".recipepage, .recipe-page") ? container.create(recipe.RecipePage, {
				ispageload: ispageload
			}) : $(".recipepage, .recipe-page", container).create(recipe.RecipePage, {
				ispageload: ispageload
			}), $(".weekplan", container).create(recipe.Weekplan), $(".add-recipe-to-shoppinglist", container).create(recipe.AddToShoppinglist), $(".rate-recipe", container).create(recipe.RateRecipe), "thumb-view" == ICA.legacy.getCookie("recipeSearchListModePreference") && $(".icon-thumbs").click()
		}
	};
	$(function() {
		$(this).on("initDom", recipe.initDom)
	})
}(jQuery);
!
function($) {
	var RenderVanilla = function(args) {
			var vanilla = {
				obj: $(this),
				querystring: "i_showvanilla=1",
				queryStringKeysToTransfer: ["initiator"],
				cookieName: "i_c_showvanilla",
				pageloadEvent: args.event,
				addQueryToHref: function(e) {
					var queryStringsToTransfer = vanilla.getQueryStringsToTransfer();
					(window.location.href.indexOf(vanilla.querystring) > -1 || !$.isEmptyObject(queryStringsToTransfer)) && $("a", $(e.target)).each(function() {
						var href = $(this).attr("href");
						href && href.indexOf("#") < 0 && href.indexOf("javascript:") < 0 && (window.location.href.indexOf(vanilla.querystring) > -1 && (href += (href.match(/\?/) ? "&" : "?") + vanilla.querystring), $.each(queryStringsToTransfer, function(queryStringKey, queryStringValue) {
							vanilla.isExternalUrl(href) || !queryStringValue || "" == queryStringValue || vanilla.hasQueryString(queryStringKey, href) || (href = vanilla.addQueryString(queryStringKey, queryStringValue, href))
						}), $(this).attr("href", href))
					})
				},
				getQueryStringsToTransfer: function() {
					var queryStringsToTransfer = {};
					return $.each(vanilla.queryStringKeysToTransfer, function(index, queryStringKey) {
						vanilla.hasQueryString(queryStringKey) && (queryStringsToTransfer[queryStringKey] = vanilla.getQueryStringByKey(queryStringKey))
					}), queryStringsToTransfer
				},
				getQueryStringByKey: function(name) {
					name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
					var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
						results = regex.exec(location.search);
					return null == results ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
				},
				hasQueryString: function(key, url) {
					return url && "" != url ? url.indexOf("&" + key + "=") > -1 || url.indexOf("?" + key + "=") > -1 : window.location.href.indexOf("&" + key + "=") > -1 || window.location.href.indexOf("?" + key + "=") > -1
				},
				addQueryString: function(key, value, url) {
					url || (url = "");
					var prefix = url.indexOf("?") > -1 ? "&" : "?";
					return url = url + prefix + key + "=" + value
				},
				isExternalUrl: function(url) {
					return url.indexOf("http") > -1 && url.search(document.domain) == -1
				},
				init: function() {
					vanilla.obj.on("initDom", vanilla.addQueryToHref), vanilla.addQueryToHref(vanilla.pageloadEvent)
				}
			};
			return vanilla.init()
		};
	$(function() {
		$(window).on("initDom", function(e) {
			$(e.target).is(document) && $("body").create(RenderVanilla, {
				event: e
			})
		})
	})
}(jQuery);
!
function($) {
	"use strict";
	var SearchForm = function() {
			var form = {
				obj: $(this),
				pageId: $("#pageId").val(),
				params: {
					search: "",
					filter: "",
					municipally: "",
					start: "",
					num: "",
					lon: "",
					lat: ""
				},
				filterString: "",
				scope: !1,
				ajaxFunction: $("#hdnAjaxFunction").length ? $("#hdnAjaxFunction").val() : "RecipeFilteredTypedResult",
				setFilters: !1,
				resultTabs: void 0,
				ica: void 0,
				hashchange: function(e) {
					var urlParams, hrefSplit = location.href.split("#");
					if (1 == hrefSplit.length ? urlParams = "" : (urlParams = ":" == hrefSplit[1].substr(0, 1) ? hrefSplit[1].substr(1) : hrefSplit[1], urlParams = urlParams.replace(/\+/g, " ")), urlParams.length > 1) {
						form.filterString = urlParams;
						for (var paramstrings = form.filterString.split("&"), i = 0, l = paramstrings.length; i < l; i++) {
							var pairs = paramstrings[i].split("=");
							form.params[pairs[0]] = decodeURIComponent(pairs[1])
						}
					} else "" == urlParams && "" !== form.filterString && form.emptyParams()
				},
				emptyParams: function() {
					form.params = {
						search: "",
						filter: "",
						municipally: "",
						start: "",
						num: "",
						lon: "",
						lat: ""
					}
				},
				updateHash: function(params) {
					$.extend(form.params, params), form.obj.trigger("updateHash", form.params)
				},
				updateOffset: function(e, num) {
					form.updateHash({
						start: "0",
						num: num
					})
				},
				makePost: function(ajaxFunction, callback, error) {
					ajaxFunction = "undefined" != typeof ajaxFunction ? ajaxFunction : form.ajaxFunction;
					var ajaxstring = "";
					ICA.MDSA && form.params.num > ICA.MDSA.recipeList.MAX_NUMBER_OF_RECIPES_TO_FETCH && (form.params.num = ICA.MDSA.recipeList.MAX_NUMBER_OF_RECIPES_TO_FETCH.toString());
					for (var key in form.params) {
						var string = form.params[key] + "";
						if (string) {
							"" !== ajaxstring && (ajaxstring += "&");
							var pairs = string.split(";");
							if (pairs.length) for (var i = 0, l = pairs.length; i < l; i++) {
								var pair = pairs[i].split(":");
								if (pair[1]) {
									"" !== ajaxstring && (ajaxstring += "&");
									var input = $("[name=" + pair[0] + "][value=" + pair[1] + "]", form.obj),
										name = input.data("ajaxname") ? input.data("ajaxname") : pair[0],
										value = input.data("ajaxvalue") ? input.data("ajaxvalue") : pair[1];
									ajaxstring += key + "=" + encodeURIComponent(name + ":" + value)
								} else ajaxstring += key + "=" + encodeURIComponent(string)
							}
						}
					}
					if ("string" == typeof form.params.search) {
						var sortSetting = ICA.fn.readCookie("recipeSearchSortingPreference");
						if (sortSetting && 2 === sortSetting.split("::").length) {
							var sortParameters = sortSetting.split("::"),
								oldQuery = sortParameters[0];
							oldQuery === form.params.search && (ajaxstring += "&sortbymetadata=" + sortParameters[1])
						}
					}
					ICA.legacy.search(ajaxstring, ajaxFunction, form.scope, callback, error)
				},
				PositionButton: function(args) {
					var btn = {
						obj: $(this),
						position: void 0,
						searchurl: $(this).attr("data-url") ? $(this).attr("data-url") : "",
						redirect: $(this).attr("data-redirect") ? $(this).attr("data-redirect") : "false",
						supportGeo: "geolocation" in navigator,
						getPosition: function() {
							btn.supportGeo ? navigator.geolocation.getCurrentPosition(btn.success, btn.error, {
								timeout: 2e4
							}) : window.triggerAsModal("<p>Verkar som om din browser inte st�djer geo-location</p>", "dialog")
						},
						success: function(position) {
							form.params.municipally = "", form.params.search = "", btn.position = position.coords, btn.doSubmit()
						},
						error: function(err) {
							if ("code" in err) switch (err.code) {
							case 1:
								window.triggerAsModal("<p>Det verkar som om du har inaktiverat geo-location i din browser</p>", "dialog");
								break;
							case 2:
								window.triggerAsModal("<p>N&aring;got gick fel, v&auml;nligen f&ouml;rs&ouml;k igen</p>", "dialog");
								break;
							case 3:
								window.triggerAsModal("<p>Verkar vara problem med att lokalisera dig, v&auml;nligen f&oumlrs&ouml;k igen senare</p>", "dialog")
							}
						},
						doSubmit: function() {
							window.location.pathname == btn.searchurl ? (form.updateHash({
								lon: btn.position.longitude.toFixed(5),
								lat: btn.position.latitude.toFixed(5),
								search: ""
							}), form.obj.trigger("update", "position")) : (form.params.municipally = "", btn.redirect ? window.location.href = btn.searchurl + "?lon=" + btn.position.longitude + "&lat=" + btn.position.latitude : window.location.href = btn.searchurl + "#:lon=" + btn.position.longitude + "&lat=" + btn.position.latitude)
						},
						click: function() {
							return btn.position ? btn.doSubmit() : btn.getPosition(), !1
						},
						init: function() {
							if (btn.obj.on("click", btn.click), btn.obj.on("mousedown touchstart", function(e) {
								icadatalayer.add("find-a-store-close-to-you", {})
							}), !btn.supportGeo) return void btn.obj.hide().closest(".grid").removeClass("separated").addClass("tight")
						}
					};
					return btn.init()
				},
				MunicipallySearchResult: function() {
					var linkitems = {
						params: {
							municipally: "",
							search: "",
							lon: "",
							lat: ""
						},
						resultListing: void 0,
						searchState: function() {
							return $("#searchState").val()
						},
						hashchange: function() {
							linkitems.params.municipally !== form.params.municipally && "default" == linkitems.searchState() && form.obj.trigger("update", "municipally")
						},
						click: function(e) {
							e.preventDefault(), form.ajaxFunction = "StoreSearch";
							var segments = $(this).attr("href").split("/"),
								municipally = segments[segments.length - 2];
							return form.updateHash({
								municipally: municipally
							}), $("html, body").animate({
								scrollTop: $(".status-bar").offset().top
							}, 500), !1
						},
						init: function() {
							linkitems.resultListing = $(this).closest(".result-listing"), $(window).on("hashchange", linkitems.hashchange), form.obj.on("click", "a.municipallylink", linkitems.click)
						}
					};
					return linkitems.init()
				},
				SearchField: function(args) {
					var search = {
						opt: $.extend({
							type: "global",
							positionbtn: !1
						}, args),
						params: {
							search: ""
						},
						searchfieldType: void 0,
						obj: $(this),
						input: $("input", this),
						searchurl: $(this).attr("data-url") ? $(this).attr("data-url") : window.location.pathname,
						doSubmit: function() {
							var str = search.searchurl + "#:";
							for (var param in search.params) str += param + "=" + encodeURIComponent(search.params[param]) + "&";
							var thisurl = search.searchurl == window.location.pathname;
							form.params.municipally = "", "" != search.searchfieldType && ICA.legacy.setCookie("zerocase-cookie", JSON.stringify({
								search: {
									phrase: search.params.search.toString(),
									type: search.searchfieldType
								}
							})), thisurl ? ("" != search.searchfieldType && icadatalayer.add("search", {
								search: {
									phrase: search.params.search.toString(),
									type: search.searchfieldType
								}
							}), form.emptyParams(), form.hashchange(), form.updateHash(search.params), form.obj.trigger("update", "search").on("ready", search.doneLoading)) : ("" != search.searchfieldType && icadatalayer.addAtNextPageLoad(null, {
								search: {
									phrase: search.params.search.toString(),
									type: search.searchfieldType
								}
							}), window.location.href = str.substr(0, str.length - 1))
						},
						doneLoading: function() {
							search.obj.trigger("done"), form.obj.off("ready", search.doneLoading)
						},
						onsubmit: function(e) {
							search.params.search = $.trim(icaUtilities.getValueNotPlaceholder(search.input)), search.doSubmit()
						},
						hashchange: function() {
							window.location.pathname == search.searchurl && form.params.search != search.params.search && (search.input.val(form.params.search), search.params.search = icaUtilities.getValueNotPlaceholder(search.input), form.obj.trigger("update", "search"))
						},
						init: function() {
							(form.params.search && !search.searchurl || search.searchurl == window.location.pathname) && search.input.val(form.params.search), search.obj.on("submit", search.onsubmit), search.searchfieldType = search.obj.data("datalayer-searchtype"), $(window).on("hashchange", search.hashchange)
						}
					};
					return search.init()
				},
				DropdownFilter: function() {
					var dropdownfilter = {
						obj: $(this),
						yearParamName: $("#MetadataNameYear").val(),
						issueParamName: $("#MetadataNameIssues").val(),
						resultListing: $(".result-listing", this),
						yeardropdown: $(this).find(".year-dropdown", this),
						weekdropdown: $(this).find(".week-dropdown", this),
						lastYearMaxIssue: parseInt($("#LastYearMaxIssue").val()),
						numberOfIssues: parseInt($("#NumberOfIssues").val()),
						weekString: "",
						filterName: $(this).attr("data-filtername") ? $(this).attr("data-filtername") : "filter",
						filterstring: "",
						updateYear: function(e) {
							var i, selectedIndex = dropdownfilter.yeardropdown.prop("selectedIndex");
							if (dropdownfilter.weekdropdown[0].length = 1, $(dropdownfilter.weekdropdown).trigger("change"), 1 === selectedIndex) for (i = 1; i <= dropdownfilter.lastYearMaxIssue; i++) dropdownfilter.weekdropdown.append('<option value="' + i + '">' + dropdownfilter.weekString + " " + i + "</option>");
							else if (0 !== selectedIndex) for (i = 1; i <= dropdownfilter.numberOfIssues; i++) dropdownfilter.weekdropdown.append('<option value="' + i + '">' + dropdownfilter.weekString + " " + i + "</option>");
							clearTimeout(form.updateDrpdwnFilterStingTO), form.updateDrpdwnFilterStingTO = setTimeout(function() {
								var params = {};
								dropdownfilter.yeardropdown.val() ? dropdownfilter.filterstring = dropdownfilter.yearParamName + ":" + dropdownfilter.yeardropdown.val() : dropdownfilter.filterstring = "", params[dropdownfilter.filterName] = dropdownfilter.filterstring, form.updateHash(params), dropdownfilter.obj.trigger("update")
							}, 800)
						},
						updateWeek: function(e) {
							clearTimeout(form.updateDrpdwnFilterStingTO), form.updateDrpdwnFilterStingTO = setTimeout(function() {
								var params = {};
								return dropdownfilter.weekdropdown.val() ? (dropdownfilter.filterstring = dropdownfilter.issueParamName + ":" + dropdownfilter.yeardropdown.val() + "-" + dropdownfilter.weekdropdown.val(), params[dropdownfilter.filterName] = dropdownfilter.filterstring, form.updateHash(params), void dropdownfilter.obj.trigger("update")) : void dropdownfilter.yeardropdown.trigger("change")
							}, 800)
						},
						hashchange: function() {
							if (form.params[dropdownfilter.filterName]) {
								var paramValue = form.params[dropdownfilter.filterName].split(":")[1],
									splitParamValue = paramValue.split("-");
								dropdownfilter.yeardropdown.val(splitParamValue[0]).trigger("change"), 2 == splitParamValue.length && dropdownfilter.weekdropdown.val(splitParamValue[1]).trigger("change"), $(window).off("hashchange.specialFilter")
							}
						},
						init: function() {
							dropdownfilter.weekString = dropdownfilter.numberOfIssues > 12 ? "Vecka" : "Nummer", dropdownfilter.obj.on("change", function(e) {
								$(e.target).is(".year-dropdown") ? dropdownfilter.updateYear(e) : $(e.target).is(".week-dropdown") && dropdownfilter.updateWeek(e)
							}), $(window).on("hashchange.specialFilter", dropdownfilter.hashchange)
						}
					};
					return dropdownfilter.init()
				},
				Filter: function() {
					var filter = {
						obj: $(this),
						resultListing: $(this).closest(".result-listing"),
						filterstring: "",
						isFiltered: !1,
						filtername: $(this).attr("data-filtername") ? $(this).attr("data-filtername") : "filter",
						statusbar: void 0,
						status: void 0,
						togglebtn: $("a[data-togglearea=#" + $(this).attr("id") + "]"),
						items: $("li.radio, li.checkbox", this),
						doneLoading: function() {
							filter.items.trigger("loadingdone"), filter.obj.removeClass("loading"), form.obj.off("ready", filter.doneLoading), setTimeout(function() {
								$("input:checked", filter.obj).length ? (filter.isFiltered = !0, filter.resultListing.addClass("filtered")) : (filter.isFiltered = !1, filter.resultListing.removeClass("filtered"))
							}, 100)
						},
						Group: function() {
							var group = {
								obj: $(this),
								init: function() {
									group.obj.on("toggle-open", function(e) {
										e.stopPropagation()
									}).on("toggle-close", function() {
										$("input", group.obj).trigger("uncheck")
									})
								}
							};
							return group.init()
						},
						Item: function() {
							var item = {
								obj: $(this),
								input: $("input", this),
								isactive: $(this).hasClass("active"),
								label: $("label", this),
								isloading: !1,
								statusicon: $('<span class="icon spinner statusicon"></span>'),
								check: function() {
									item.obj.addClass("active"), item.isactive = !0, item.checkingto = setTimeout(function() {
										item.isactive && item.loading()
									}, 300), item.input.trigger("checked")
								},
								uncheck: function() {
									clearTimeout(item.checkingto), item.isactive && (item.obj.removeClass("active loading"), item.statusicon.remove(), item.isactive = item.isloading = !1, item.input.trigger("unchecked"))
								},
								reset: function() {
									var pair, pairs = [];
									try {
										pairs = form.params[filter.filtername].split(";")
									} catch (err) {}
									for (var i = 0, l = pairs.length; i < l; i++) if (pair = pairs[i].split(":"), pair[0] == item.input.attr("name") && pair[1] == item.input.attr("value")) return !item.isactive && setTimeout(function() {
										item.input.trigger("check")
									}, 100);
									item.isactive && item.input.trigger("uncheck")
								},
								loading: function() {
									item.isloading = !0, item.obj.addClass("loading"), item.statusicon.addClass("spinner").removeClass("icon-check"), item.statusicon.prependTo(item.label)
								},
								loadingdone: function() {
									item.isloading && (item.obj.removeClass("loading"), item.isloading = !1, item.statusicon.addClass("icon-check sprite1").removeClass("spinner"))
								},
								init: function() {
									item.obj.on("check", item.check).on("uncheck", item.uncheck).on("reset", item.reset).on("loading", item.loading).on("loadingdone", item.loadingdone), form.params[filter.filtername] = filter.filterstring
								}
							};
							return item.init()
						},
						change: function() {
							filter.obj.addClass("loading"), filter.filterstring = "", clearTimeout(form.updateFilterStingTO), form.updateFilterStingTO = setTimeout(function() {
								if ($(":checked", filter.obj).each(function() {
									"" !== filter.filterstring && (filter.filterstring += ";"), filter.filterstring += this.name + ":" + this.value
								}), form.setFilters) form.setFilters = !1;
								else {
									var params = {};
									params[filter.filtername] = filter.filterstring, form.updateHash(params)
								}
								filter.obj.trigger("update", "filter"), form.obj.on("ready", filter.doneLoading)
							}, 800)
						},
						hashchange: function() {
							form.params[filter.filtername] != filter.filterstring && (filter.items.trigger("reset"), form.setFilters = !1)
						},
						init: function() {
							if (!filter.obj.hasClass("vanilla")) return filter.resultListing = filter.obj.closest(".result-listing"), filter.statusbar = $(".status-bar", filter.resultListing), filter.status = $(".status", filter.statusbar), filter.obj.on("toggle-open", function(e) {
								e.target == filter.obj[0] ? filter.statusbar.addClass("show-status") : e.stopPropagation()
							}).on("toggle-close", function(e) {
								if (e.target == filter.obj[0]) {
									var togglebtnposition = filter.togglebtn.first().offset().top;
									$(window).scrollTop() > togglebtnposition && $("html, body").animate({
										scrollTop: togglebtnposition - 20
									}, 100), filter.statusbar.removeClass("show-status")
								}
							}).find(".toggle-area").on("toggle-close", filter.reset), filter.obj.inViewport(function() {
								$("a.scrollto-results", filter.statusbar).removeClass("hidden"), $("a.scrollto-filter", filter.statusbar).addClass("hidden")
							}, function() {
								$(window).scrollTop() > filter.obj.offset().top ? ($("a.scrollto-results", filter.statusbar).addClass("hidden"), $("a.scrollto-filter", filter.statusbar).removeClass("hidden")) : ($("a.scrollto-results", filter.statusbar).removeClass("hidden"), $("a.scrollto-filter", filter.statusbar).addClass("hidden"))
							}, !0), filter.items.create(filter.Item), $("fieldset", filter.obj).create(filter.Group), filter.obj.on("change", filter.change), $(window).on("hashchange", filter.hashchange), filter
						}
					};
					return filter.init()
				},
				SearchResults: function() {
					var results = {
						obj: $(this),
						isFirstLoad: !0,
						resultListing: $(this).closest(".result-listing"),
						ajaxFunction: void 0,
						municipally: $("#context", this),
						statusbar: void 0,
						status: void 0,
						titleobj: void 0,
						titleobjText: void 0,
						titleobjTextEmpty: void 0,
						numberofhits: void 0,
						allhits: void 0,
						classList: "",
						filteronly: $(this).is(".filter-only"),
						hideStatus: void 0,
						searchField: $("#search-field"),
						searchResultTextLink: $(".result-search"),
						searchToGlobalSearchLink: $("#pathToGlobalSearch"),
						filteredResultsClass: "filtered-results",
						hiddenForFilteredResultsClass: "hide-for-filtered-results",
						fetchResults: function(delay) {
							form.loading = !0, clearTimeout(results.updateto), results.updateto = setTimeout(function() {
								results.obj.addClass("loading"), form.makePost(results.ajaxFunction, function(data) {
									var allFilterTerms, oneFilterTerm, i, isFiltered = !1,
										$filters = $(".filter fieldset input"),
										manuallyChosenRecipes = results.obj.children("." + results.hiddenForFilteredResultsClass);
									for (var field in form.params) for (allFilterTerms = form.params[field].split(";"), i = 0; i < allFilterTerms.length; i++) oneFilterTerm = allFilterTerms[i].split(":"), 0 !== $filters.filter('[name="' + oneFilterTerm[0] + '"][value="' + oneFilterTerm[1] + '"]').length && (isFiltered = !0);
									results.obj.toggleClass(results.filteredResultsClass, isFiltered), results.obj.children(":not(." + results.hiddenForFilteredResultsClass + ")").remove(), results.obj.append(data), isFiltered || "" !== form.params.search ? manuallyChosenRecipes.addClass("hidden") : manuallyChosenRecipes.removeClass("hidden hidden-initial"), results.obj.removeClass("loading").trigger("initDom"), results.success()
								})
							}, delay ? 500 : 0)
						},
						success: function(initial) {
							var postcount = $(".TotalSearchItems", results.obj),
								count = postcount.length ? parseInt(postcount.val(), 10) : 0,
								newtitle = $(".hdnResultTitle", results.obj);
							results.isFirstLoad || results.obj.hasClass("mdsa") || (count += results.obj.hasClass(results.filteredResultsClass) || results.obj.hasClass("searched") ? 0 : results.obj.children(".hide-for-filtered-results").length), results.isFirstLoad = !1;
							var allHits = $(".AllHitsCount", results.obj),
								allCount = allHits.length ? allHits.val() : 0;
							if (0 === parseInt(count, 10) ? results.resultListing.addClass("no-results") : results.resultListing.removeClass("no-results"), postcount.length && (results.obj.trigger("updateCount", count), results.numberofhits.text(count + " st")), newtitle.length) if (results.titleobj.length) {
								var prefix = results.titleobj.data("prefix") || "";
								results.titleobj.text(prefix + newtitle.val()), results.titleobjText.length && results.titleobjTextEmpty.length && newtitle.val().length > 0 ? (results.titleobjText.show(), results.titleobjTextEmpty.hide()) : (results.titleobjText.hide(), results.titleobjTextEmpty.show())
							} else results.statusbar.length && (results.titleobj = $("<h2>" + newtitle.val() + "</h2>").prependTo(results.statusbar));
							else results.titleobjText.length && results.titleobjTextEmpty.length && (results.titleobjText.hide(), results.titleobjTextEmpty.show());
							if (results.allhits && allCount.length && (newtitle.val() && 0 == newtitle.val().trim().length || results.titleobj.hasClass("hidden") || !newtitle.val() ? results.allhits.text(" av " + allCount) : results.allhits.text("")), !initial) {
								if (!form.resultTabs && 0 == count && ICA.legacy.getCookie("zerocase-cookie")) {
									var zerocaseparams = $.parseJSON(ICA.legacy.getCookie("zerocase-cookie"));
									icadatalayer.add("search-zero", zerocaseparams), ICA.legacy.killCookie("zerocase-cookie")
								}
								results.status.trigger("clone")
							}
							form.params.search ? results.resultListing.addClass("searched") : results.resultListing.removeClass("searched"), form.obj.trigger("ready"), form.loading = !1, results.obj.trigger("togglestatus")
						},
						clone: function() {
							if (results.clone.length) {
								var oldclone = results.clone.addClass("fadeout");
								setTimeout(function() {
									oldclone.remove()
								}, 200)
							}
							results.clone = results.status.clone(!0).addClass("fixed clone").insertAfter(results.status).removeAttr("id"), form.obj.addClass("fixed-status"), results.status.attr("data-inviewport", !0), $(window).trigger("scroll")
						},
						filter: function() {
							results.obj.removeClass("filtered " + results.classList), results.classList = "";
							var itemsToFilter = $('[data-filtergroup="sectiontofilter"]', results.obj);
							if (itemsToFilter.removeClass("removed"), $('[data-filtergroup="itemtofilter"].removed', itemsToFilter).removeClass("removed"), "" !== form.params.filter && "all" != form.params.filter) {
								var pairs = form.params.filter.split(";");
								$.each(itemsToFilter, function(index, value) {
									var itemRemoved = 0,
										liItems = $(value).find("[data-filtergroup='itemtofilter']");
									$(liItems).each(function(number, item) {
										for (var i = 0, l = pairs.length; i < l; i++) {
											var pair = pairs[i].split(":");
											if (pair.length > 1 && !$(item).hasClass(pair[1])) {
												$(item).addClass("removed"), itemRemoved++;
												break
											}
										}
									}), liItems.length == itemRemoved && $(value).addClass("removed"), itemRemoved = 0
								}), results.classList && results.obj.addClass(results.classList + " filtered"), form.obj.trigger("ready"), setTimeout(function() {
									form.obj.trigger("ready")
								}, 500)
							}
							results.updatestatus()
						},
						updatestatus: function() {
							var nrChildren = results.obj.find("[data-filtergroup='itemtofilter']:visible").size();
							0 === parseInt(nrChildren, 10) ? form.obj.addClass("no-results") : form.obj.removeClass("no-results"), results.numberofhits.text(nrChildren + " st")
						},
						togglestatus: function() {
							results.status.removeClass("hide-status")
						},
						update: function(e, type) {
							e && e.stopPropagation(), "filter" == type ? results.filteronly ? results.filter() : results.fetchResults(!0) : ("position" == type && results.obj.addClass("showdistance"), results.hideStatus && results.obj.on("togglestatus", results.togglestatus), results.fetchResults())
						},
						listingUpdate: function(e, type) {
							e.stopPropagation(), results.update(e, type)
						},
						onKeyUpSearchText: function() {
							results.searchField.on("keyup", function() {
								var inputValue = $(this).val();
								inputValue.length > 0 ? results.searchResultTextLink.html('<span> Eller sök "' + inputValue + '" på hela ica.se') : results.searchResultTextLink.html(""), results.searchResultTextLink.attr("href", results.searchToGlobalSearchLink.val() + inputValue)
							})
						},
						init: function() {
							return results.tab = results.obj.closest(".tab-panel"), results.tab.length && (form.resultTabs ? form.resultTabs = form.resultTabs.add(results.tab) : form.resultTabs = results.tab), results.statusbar = $(".status-bar", results.resultListing), results.status = $(".status", results.statusbar), results.titleobj = $(".term", results.status), results.titleobjText = $("#searchArticles", results.status), results.titleobjTextEmpty = $("#searchArticlesEmptyText", results.status), results.numberofhits = $(".count", results.status), results.allhits = $(".allhits", results.status), results.count = results.status.find("strong"), results.title = results.statusbar.find(".title"), results.hideStatus = results.status.hasClass("hide-status"), form.preSelectedTab && ICA.legacy.killCookie("searchtab"), results.ajaxFunction = $(".hdnAjaxFunction", results.resultListing).length ? $(".hdnAjaxFunction", results.resultListing).val() : void 0, results.municipally.length && (form.params.municipally = results.municipally.val()), results.status.on("clone", results.clone), results.status.inViewport(function() {
								results.clone.length && (results.clone.remove(), results.status.removeAttr("data-inviewport"), form.obj.removeClass("fixed-status"))
							}, function() {}), results.onKeyUpSearchText(), results.obj.on("updateOffset", form.updateOffset).on("addClass", function(e, classList) {
								classList.match(/thumb-view/g) && ICA.legacy.setCookie("recipeSearchListModePreference", "thumb-view")
							}).on("removeClass", function(e, classList) {
								classList.match(/thumb-view/g) && ICA.legacy.setCookie("recipeSearchListModePreference", "list")
							}), results.success(!0), results.resultListing.on("update", results.listingUpdate), form.obj.on("update", results.update), results
						}
					};
					return results.init()
				},
				activateMostHitsTab: function(e, count) {
					if (form.tabcount--, (!form.mostResults || parseInt(count) > form.mostResults) && (form.mostResults = parseInt(count), form.mostTab = $(e.target)), 0 == form.tabcount) {
						if (form.mostTab.trigger("activatetab"), 0 === form.mostResults) {
							var zerocaseparams = $.parseJSON(ICA.legacy.getCookie("zerocase-cookie"));
							icadatalayer.add("search-zero", zerocaseparams), ICA.legacy.killCookie("zerocase-cookie")
						}
						form.resultTabs.off("updateCount", form.activateMostHitsTab)
					}
				},
				pickMostTab: function(force) {
					!form.resultTabs || form.params.tab && !force || (form.tabcount = form.resultTabs.length, form.mostTab = form.resultTabs.first(), form.mostResults = !1, "articles" == form.preSelectedTab ? $("#article-tab").trigger("activatetab") : form.params.lon && form.params.lat && $("#store-tab").length ? $("#store-tab").trigger("activatetab") : form.resultTabs.on("updateCount", form.activateMostHitsTab))
				},
				init: function(e) {
					$(window).on("hashchange", form.hashchange), form.obj.on("initSearchfield", ".search-fieldset", function(e) {
						var $this = $(this);
						$this.create(form.SearchField), $this.off("initSearchfield")
					}).find(".search-fieldset").trigger("initSearchfield");
					var scopeObj = $("#hdnCategorySearchTerm", form.obj);
					scopeObj.length && (form.scope = scopeObj.val()), form.preSelectedTab = ICA.legacy.getCookie("searchtab"), $(".positionbtn", form.obj).create(form.PositionButton), $(".filter", form.obj).create(form.Filter), $(".specialfilterSelections", form.obj).create(form.DropdownFilter), $(".results", form.obj).create(form.SearchResults), $("#stores", form.obj).create(form.MunicipallySearchResult), $(window).trigger("hashchange"), form.obj.on("update", function(e, type) {
						"search" == type && form.pickMostTab(!0)
					}), form.pickMostTab(), form.obj.trigger("initSearchField")
				}
			};
			return form.init()
		};
	$(function() {
		$(window).on("initDom", function(e) {
			$(e.target).is(document) ? $("form").create(SearchForm) : $(".search-fieldset", e.target).trigger("initSearchfield")
		}), $(window).on("hashchange", function(event) {
			"" == window.location.hash && $("#stores").hasClass("loaded") && !$("#stores").hasClass("filtered-results") && location.reload()
		})
	})
}(jQuery);

function socialShareTracking(trackingName) {
	icadatalayer.add("recipe-share-social", {
		socialMediaChannel: trackingName
	})
}!
function($) {
	$(document).ready(function() {
		$(".mobile-sharing:empty").each(function() {
			$(".social").first().clone().appendTo(this)
		}), $(".sharrre-twitter").length && $.each($(".sharrre-twitter"), function() {
			$(this).sharrre({
				share: {
					twitter: !0
				},
				enableCounter: !1,
				enableHover: !1,
				enableTracking: !0,
				buttons: {
					twitter: {
						count: "none",
						lang: "sv"
					}
				},
				click: function(api, options) {
					socialShareTracking($(api.element).data("title")), api.openPopup("twitter")
				}
			})
		}), $(".sharrre-facebook").length && $.each($(".sharrre-facebook"), function() {
			$(this).sharrre({
				share: {
					facebook: !0
				},
				enableCounter: !1,
				enableHover: !1,
				enableTracking: !0,
				click: function(api, options) {
					socialShareTracking($(api.element).data("title")), api.openPopup("facebook")
				}
			})
		}), $(".sharrre-pinterest").length && $.each($(".sharrre-pinterest"), function() {
			$(this).sharrre({
				share: {
					pinterest: !0
				},
				enableCounter: !1,
				enableHover: !1,
				enableTracking: !0,
				click: function(api, options) {
					socialShareTracking($(api.element).data("title")), api.openPopup("pinterest")
				},
				buttons: {
					pinterest: {
						media: $('meta[property="og:image"]').attr("content"),
						description: $('meta[property="og:description"]').attr("content") || ""
					}
				}
			})
		}), $(".sharrre-googleplus").length && $.each($(".sharrre-googleplus"), function() {
			$(this).sharrre({
				share: {
					googlePlus: !0
				},
				enableCounter: !1,
				enableHover: !1,
				enableTracking: !0,
				click: function(api, options) {
					socialShareTracking($(api.element).data("title")), api.openPopup("googlePlus")
				}
			})
		})
	})
}(jQuery);
!
function($, window, document, undefined) {
	var pluginName = "tagify",
		opt = {
			inputId: "tagifyInput",
			buttonId: "tagifyActionButton",
			tagContainerClass: "tagify-tags-container",
			tagTpl: '<span class="search-tag" data-endindex="#index#">#keyword#<span class="sprite1-p close-tag-icon remove"></span></span> ',
			callbacks: {
				tagsGenerated: function(query, keywords) {},
				tagSelected: function(selectedTag) {},
				tagRemoved: function(removedTag, newQuery) {}
			}
		},
		Plugin = function(element, options, callback) {
			return this.element = $(element), this.options = $.extend({}, opt, options), this.callback = callback, this._defaults = opt, this._name = pluginName, this.$input = $("#" + this.options.inputId), this.$button = $("#" + this.options.buttonId), this.$tagContainer = $("." + this.options.tagContainerClass), this.$input[0] && this.$tagContainer[0] ? this.element.hasClass("tagify-loaded") ? void 0 : this.init() : (console.log("Could not load %ctagify %con element due to lacking HTML structure. This is the minimal structure needed (IDs and classes are configurable):", "font-weight: bold;", "font-weight: normal"), void console.log('%c<div class="search-bar"> \n    <input type="search" id="tagifyInput" placeholder="do da search"/> \n    <div class="tagify-tags-container"></div> \n </div>', "font-weight: 700"))
		};
	Plugin.prototype = {
		init: function() {
			return this.attachEvents(), this.element.data("tagifyInstance", this), this
		},
		attachEvents: function() {
			this.$button.on("click", function() {
				$searchInput.blur(), console.log("buttonclick!")
			}.bind(this)), this.$input.keyup(function(e) {
				13 == e.keyCode && $(this).blur()
			}).on("focus", function() {
				var $this = this.$input;
				this.$tagContainer.empty();
				var query = $this.data("query");
				if (query) {
					query += " " == query.slice(-1) ? "" : " ";
					var queryDecoded = String(query).replace(/(&amp;)/g, "&").replace(/(&lt;)/g, "<").replace(/(&gt;)/g, ">").replace(/(&quot;)/g, '"');
					$this.val(queryDecoded), $this[0].setSelectionRange($this.val().length, $this.val().length)
				}
				$this.trigger("change")
			}.bind(this)).on("blur", function() {
				this.generateTags.call(this.$input, this)
			}.bind(this)), this.$tagContainer.on("click", "> *", function(e) {
				$(e.target).is(".remove") ? this.removeTag.call(this, $(e.target)) : this.selectTag.call(this, $(e.target))
			}.bind(this))
		},
		generateTags: function(pluginScope, queryFromHash) {
			var $this = $(this),
				query = "";
			if (query = "undefined" != typeof queryFromHash ? queryFromHash : $this.val().trim(), query = String(query).replace(/(&amp;)/g, "&").replace(/(&lt;)/g, "<").replace(/(&gt;)/g, ">").replace(/(&quot;)/g, '"'), $this.data("query", query), $this.val(" "), query = query.trim(), query.length > 0) {
				var keywords = query.trim().split(" "),
					tagsHTML = "",
					index = query.length;
				tagsHTML = keywords.reverse().map(function(word) {
					var curIndex = index;
					if (index -= 1 + word.length, "" == word) return "";
					var wordEncoded = String(word).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
					return pluginScope.options.tagTpl.replace("#keyword#", wordEncoded).replace("#index#", curIndex)
				}), pluginScope.$tagContainer.html(tagsHTML.join(""))
			} else $this.val(""), pluginScope.$tagContainer.html("");
			query = String(query).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), pluginScope.options.callbacks.tagsGenerated.call(this, query, keywords || [])
		},
		removeTag: function($el) {
			var $this = $el.is(".remove") ? $el.parent() : $el,
				index = ($this.data("startindex"), $this.data("endindex")),
				wordLen = $this.text().length,
				removedTag = $this.text(),
				oldQuery = $(".search-bar input").data("query"),
				oldQueryDecoded = String(oldQuery).replace(/(&amp;)/g, "&").replace(/(&lt;)/g, "<").replace(/(&gt;)/g, ">").replace(/(&quot;)/g, '"'),
				newQuery = [oldQueryDecoded.slice(0, index - wordLen), oldQueryDecoded.slice(index + 1)].join("").trim(),
				newQueryDecoded = String(newQuery).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
			$this.remove(), 0 == newQueryDecoded.length && this.$input[0].select(), this.options.callbacks.tagRemoved.call(this, removedTag, newQueryDecoded)
		},
		selectTag: function($el) {
			var $this = $el,
				pointerIndex = $this.data("endindex"),
				selectedTag = $this.text();
			$(".search-bar input").one("change", function() {
				this.setSelectionRange(pointerIndex, pointerIndex)
			}).focus(), this.options.callbacks.tagSelected.call(this, selectedTag)
		}
	}, $.fn[pluginName] = function(options, callback) {
		return this.each(function() {
			$.data(this, "plugin_" + pluginName) || $.data(this, "plugin_" + pluginName, new Plugin(this, options, callback))
		})
	}
}(jQuery, window, document);
var DEFAULT_HSE_BASEURL = "/kampanj/hse/";
!
function($) {
	$(function() {
		$(this).on("initDom", function(e) {
			var currentUrl = window.location.href.split("?")[0];
			if (!(currentUrl.toLowerCase().indexOf("logga-in.aspx") > 0)) {
				if (ICA.legacy.getStorage("lastActiveHSEModal")) {
					var lastActiveHSEModal = ICA.legacy.getStorage("lastActiveHSEModal").split(";"),
						lastActiveHSELink = "";
					lastActiveHSEModal.length > 1 && window.location.href == lastActiveHSEModal[1] && (lastActiveHSELink = lastActiveHSEModal[0]), ICA.legacy.killStorage("lastActiveHSEModal")
				}
				var container = $(e.target);
				$('a[href*="' + DEFAULT_HSE_BASEURL + '"]', container).each(function() {
					var originalUrl = $(this).attr("href"),
						hrefTokens = originalUrl.split("/"),
						campaignPageId = hrefTokens[hrefTokens.length - 1];
					icadatalayer.add("HSE", {
						HSE: {
							action: "display",
							hseurl: originalUrl
						}
					}), $(this).addClass("modal"), $(this).attr("data-ajaxurl", "/Templates/ajaxresponse.aspx?ajaxFunction=HseLoadCouponPopup&campaignPageId=" + campaignPageId + "&originalPopupUrl=" + encodeURI(originalUrl)), $(this).trigger("initComponent"), $(this).attr("href") == lastActiveHSELink && ICA.legacy.loggedIn && $(this).click()
				}), $("a.hse-loginbtn").on("click", function(e) {
					e.preventDefault(), ICA.legacy.setStorage("lastActiveHSEModal", window.currentOpenHSEModal + ";" + window.location.href)
				})
			}
		})
	})
}(jQuery);

function setCookie(name, value, expires) {
	document.cookie = name + "=" + value + "; expires=" + expires + "; path=/"
}
function deleteCookie(name) {
	var date = new Date;
	date.setTime(date.getTime() + -864e5), document.cookie = name + "=; expires=" + date.toGMTString() + "; path=/"
}
function getCookie(name) {
	for (var nameEQ = name + "=", ca = document.cookie.split(";"), i = 0; i < ca.length; i++) {
		for (var c = ca[i];
		" " == c.charAt(0);) c = c.substring(1, c.length);
		if (0 == c.indexOf(nameEQ)) return c.substring(nameEQ.length, c.length)
	}
	return null
}
var GetCookieAsJson = function(cookieName) {
		if (0 == cookieName.length) return {};
		var cookie = getCookie(cookieName);
		return null == cookie ? {} : JSON.parse(cookie)
	},
	SetCookieFromJson = function(json, cookieName) {
		var strCookie = JSON.stringify(json);
		document.cookie = cookieName + "=" + strCookie + "; path=/"
	};
!
function($) {
	var expireDate = new Date;
	expireDate.setTime(expireDate.getTime() + 31536e6), expireDate = expireDate.toGMTString(), $alarmBar = $("#bottom-bar .alarm"), $alarmClose = $("#bottom-bar .alarm .alarm-close"), $alarmClose && $alarmClose.on("click", function() {
		setCookie("alarmClosed", $alarmBar.data("version"), expireDate), $alarmBar.hide()
	}), $noticeBar = $("#bottom-bar .notice"), $noticeClose = $("#bottom-bar .notice .notice-close"), $noticeClose && $noticeClose.on("click", function() {
		setCookie("noticeClosed", $noticeBar.data("version"), expireDate), $noticeBar.hide()
	})
}(jQuery), $(document).ready(function() {
	$alarmBar && getCookie("alarmClosed") != $alarmBar.data("version") && $alarmBar.show(), $noticeBar && getCookie("noticeClosed") != $noticeBar.data("version") && $noticeBar.show()
});
!
function() {
	function j(w) {
		throw w
	}
	function u(w) {
		return function() {
			return w
		}
	}
	function L(w) {
		function ha(a, d, c, e, f) {
			var g = [];
			return a = b.j(function() {
				var a = d(c, f) || [];
				0 < g.length && (b.a.Ya(M(g), a), e && b.r.K(e, p, [c, a, f])), g.splice(0, g.length), b.a.P(g, a)
			}, p, {
				W: a,
				Ka: function() {
					return 0 == g.length || !b.a.X(g[0])
				}
			}), {
				M: g,
				j: a.pa() ? a : I
			}
		}
		function M(a) {
			for (; a.length && !b.a.X(a[0]);) a.splice(0, 1);
			if (1 < a.length) {
				for (var d = a[0], c = a[a.length - 1], e = [d]; d !== c;) {
					if (d = d.nextSibling, !d) return;
					e.push(d)
				}
				Array.prototype.splice.apply(a, [0, a.length].concat(e))
			}
			return a
		}
		function S(a, b, c, e, f) {
			var l, q, J, A, z, g = Math.min,
				h = Math.max,
				k = [],
				n = a.length,
				s = b.length,
				v = s - n || 1,
				G = n + s + 1;
			for (l = 0; l <= n; l++) for (A = J, k.push(J = []), z = g(s, l + v), q = h(0, l - 1); q <= z; q++) J[q] = q ? l ? a[l - 1] === b[q - 1] ? A[q - 1] : g(A[q] || G, J[q - 1] || G) + 1 : q + 1 : l + 1;
			for (g = [], h = [], v = [], l = n, q = s; l || q;) s = k[l][q] - 1, q && s === k[l][q - 1] ? h.push(g[g.length] = {
				status: c,
				value: b[--q],
				index: q
			}) : l && s === k[l - 1][q] ? v.push(g[g.length] = {
				status: e,
				value: a[--l],
				index: l
			}) : (g.push({
				status: "retained",
				value: b[--q]
			}), --l);
			if (h.length && v.length) {
				a = 10 * n;
				var t;
				for (b = c = 0;
				(f || b < a) && (t = h[c]); c++) {
					for (e = 0; k = v[e]; e++) if (t.value === k.value) {
						t.moved = k.index, k.moved = t.index, v.splice(e, 1), b = e = 0;
						break
					}
					b += e
				}
			}
			return g.reverse()
		}
		function T(a, d, c, e, f) {
			f = f || {};
			var g = a && N(a),
				g = g && g.ownerDocument,
				h = f.templateEngine || O;
			switch (b.za.vb(c, h, g), c = h.renderTemplate(c, e, f, g), ("number" != typeof c.length || 0 < c.length && "number" != typeof c[0].nodeType) && j(Error("Template engine must return an array of DOM nodes")), g = r, d) {
			case "replaceChildren":
				b.e.N(a, c), g = m;
				break;
			case "replaceNode":
				b.a.Ya(a, c), g = m;
				break;
			case "ignoreTargetNode":
				break;
			default:
				j(Error("Unknown renderMode: " + d))
			}
			return g && (U(c, e), f.afterRender && b.r.K(f.afterRender, p, [c, e.$data])), c
		}
		function N(a) {
			return a.nodeType ? a : 0 < a.length ? a[0] : p
		}
		function U(a, d) {
			if (a.length) {
				var c = a[0],
					e = a[a.length - 1];
				V(c, e, function(a) {
					b.Da(d, a)
				}), V(c, e, function(a) {
					b.s.ib(a, [d])
				})
			}
		}
		function V(a, d, c) {
			var e;
			for (d = b.e.nextSibling(d); a && (e = a) !== d;) a = b.e.nextSibling(e), (1 === e.nodeType || 8 === e.nodeType) && c(e)
		}
		function W(a, d, c) {
			a = b.g.aa(a);
			for (var e = b.g.Q, f = 0; f < a.length; f++) {
				var g = a[f].key;
				if (e.hasOwnProperty(g)) {
					var h = e[g];
					"function" == typeof h ? (g = h(a[f].value)) && j(Error(g)) : h || j(Error("This template engine does not support the '" + g + "' binding within its templates"))
				}
			}
			return a = "ko.__tr_ambtns(function($context,$element){return(function(){return{ " + b.g.ba(a) + " } })()})", c.createJavaScriptEvaluatorBlock(a) + d
		}
		function X(a, d, c, e) {
			function f(a) {
				return function() {
					return k[a]
				}
			}
			function g() {
				return k
			}
			var k, l, h = 0;
			return b.j(function() {
				var n = c && c instanceof b.z ? c : new b.z(b.a.d(c)),
					q = n.$data;
				if (e && b.eb(a, n), k = ("function" == typeof d ? d(n, a) : d) || b.J.instance.getBindings(a, n)) {
					if (0 === h) {
						h = 1;
						for (var s in k) {
							var v = b.c[s];
							v && 8 === a.nodeType && !b.e.I[s] && j(Error("The binding '" + s + "' cannot be used with virtual elements")), v && "function" == typeof v.init && (v = (0, v.init)(a, f(s), g, q, n)) && v.controlsDescendantBindings && (l !== I && j(Error("Multiple bindings (" + l + " and " + s + ") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.")), l = s)
						}
						h = 2
					}
					if (2 === h) for (s in k)(v = b.c[s]) && "function" == typeof v.update && (0, v.update)(a, f(s), g, q, n)
				}
			}, p, {
				W: a
			}), {
				Nb: l === I
			}
		}
		function Y(a, d, c) {
			var e = m,
				f = 1 === d.nodeType;
			f && b.e.Ta(d), (f && c || b.J.instance.nodeHasBindings(d)) && (e = X(d, p, a, c).Nb), e && Z(a, d, !f)
		}
		function Z(a, d, c) {
			for (var e = b.e.firstChild(d); d = e;) e = b.e.nextSibling(d), Y(a, d, c)
		}
		function $(a, b) {
			var c = aa(a, b);
			return c ? 0 < c.length ? c[c.length - 1].nextSibling : a.nextSibling : p
		}
		function aa(a, b) {
			for (var c = a, e = 1, f = []; c = c.nextSibling;) {
				if (H(c) && (e--, 0 === e)) return f;
				f.push(c), B(c) && e++
			}
			return b || j(Error("Cannot find closing comment tag to match: " + a.nodeValue)), p
		}
		function H(a) {
			return 8 == a.nodeType && (K ? a.text : a.nodeValue).match(ia)
		}
		function B(a) {
			return 8 == a.nodeType && (K ? a.text : a.nodeValue).match(ja)
		}
		function P(a, b) {
			for (var c = p; a != c;) c = a, a = a.replace(ka, function(a, c) {
				return b[c]
			});
			return a
		}
		function la() {
			var a = [],
				d = [];
			this.save = function(c, e) {
				var f = b.a.i(a, c);
				0 <= f ? d[f] = e : (a.push(c), d.push(e))
			}, this.get = function(c) {
				return c = b.a.i(a, c), 0 <= c ? d[c] : I
			}
		}
		function ba(a, b, c) {
			function e(e) {
				var g = b(a[e]);
				switch (typeof g) {
				case "boolean":
				case "number":
				case "string":
				case "function":
					f[e] = g;
					break;
				case "object":
				case "undefined":
					var h = c.get(g);
					f[e] = h !== I ? h : ba(g, b, c)
				}
			}
			if (c = c || new la, a = b(a), "object" != typeof a || a === p || a === I || a instanceof Date) return a;
			var f = a instanceof Array ? [] : {};
			c.save(a, f);
			var g = a;
			if (g instanceof Array) {
				for (var h = 0; h < g.length; h++) e(h);
				"function" == typeof g.toJSON && e("toJSON")
			} else for (h in g) e(h);
			return f
		}
		function ca(a, d) {
			if (a) if (8 == a.nodeType) {
				var c = b.s.Ua(a.nodeValue);
				c != p && d.push({
					sb: a,
					Fb: c
				})
			} else if (1 == a.nodeType) for (var c = 0, e = a.childNodes, f = e.length; c < f; c++) ca(e[c], d)
		}
		function Q(a, d, c, e) {
			b.c[a] = {
				init: function(a) {
					return b.a.f.set(a, da, {}), {
						controlsDescendantBindings: m
					}
				},
				update: function(a, g, h, k, l) {
					h = b.a.f.get(a, da), g = b.a.d(g()), k = !c != !g;
					var n = !h.Za;
					(n || d || k !== h.qb) && (n && (h.Za = b.a.Ia(b.e.childNodes(a), m)), k ? (n || b.e.N(a, b.a.Ia(h.Za)), b.Ea(e ? e(l, g) : l, a)) : b.e.Y(a), h.qb = k)
				}
			}, b.g.Q[a] = r, b.e.I[a] = m
		}
		function ea(a, d, c) {
			c && d !== b.k.q(a) && b.k.T(a, d), d !== b.k.q(a) && b.r.K(b.a.Ba, p, [a, "change"])
		}
		var b = "undefined" != typeof w ? w : {};
		b.b = function(a, d) {
			for (var c = a.split("."), e = b, f = 0; f < c.length - 1; f++) e = e[c[f]];
			e[c[c.length - 1]] = d
		}, b.p = function(a, b, c) {
			a[b] = c
		}, b.version = "2.2.1", b.b("version", b.version), b.a = new function() {
			function a(a, d) {
				if ("input" !== b.a.u(a) || !a.type || "click" != d.toLowerCase()) return r;
				var c = a.type;
				return "checkbox" == c || "radio" == c
			}
			var d = /^(\s|\u00A0)+|(\s|\u00A0)+$/g,
				c = {},
				e = {};
			c[/Firefox\/2/i.test(ga.userAgent) ? "KeyboardEvent" : "UIEvents"] = ["keyup", "keydown", "keypress"], c.MouseEvents = "click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(" ");
			for (var f in c) {
				var g = c[f];
				if (g.length) for (var h = 0, k = g.length; h < k; h++) e[g[h]] = f
			}
			var n, l = {
				propertychange: m
			},
				c = 3;
			for (f = y.createElement("div"), g = f.getElementsByTagName("i"); f.innerHTML = "<!--[if gt IE " + ++c + "]><i></i><![endif]-->", g[0];);
			return n = 4 < c ? c : I, {
				Na: ["authenticity_token", /^__RequestVerificationToken(_.*)?$/],
				o: function(a, b) {
					for (var d = 0, c = a.length; d < c; d++) b(a[d])
				},
				i: function(a, b) {
					if ("function" == typeof Array.prototype.indexOf) return Array.prototype.indexOf.call(a, b);
					for (var d = 0, c = a.length; d < c; d++) if (a[d] === b) return d;
					return -1
				},
				lb: function(a, b, d) {
					for (var c = 0, e = a.length; c < e; c++) if (b.call(d, a[c])) return a[c];
					return p
				},
				ga: function(a, d) {
					var c = b.a.i(a, d);
					0 <= c && a.splice(c, 1)
				},
				Ga: function(a) {
					a = a || [];
					for (var d = [], c = 0, e = a.length; c < e; c++) 0 > b.a.i(d, a[c]) && d.push(a[c]);
					return d
				},
				V: function(a, b) {
					a = a || [];
					for (var d = [], c = 0, e = a.length; c < e; c++) d.push(b(a[c]));
					return d
				},
				fa: function(a, b) {
					a = a || [];
					for (var d = [], c = 0, e = a.length; c < e; c++) b(a[c]) && d.push(a[c]);
					return d
				},
				P: function(a, b) {
					if (b instanceof Array) a.push.apply(a, b);
					else for (var d = 0, c = b.length; d < c; d++) a.push(b[d]);
					return a
				},
				extend: function(a, b) {
					if (b) for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
					return a
				},
				ka: function(a) {
					for (; a.firstChild;) b.removeNode(a.firstChild)
				},
				Hb: function(a) {
					a = b.a.L(a);
					for (var d = y.createElement("div"), c = 0, e = a.length; c < e; c++) d.appendChild(b.A(a[c]));
					return d
				},
				Ia: function(a, d) {
					for (var c = 0, e = a.length, g = []; c < e; c++) {
						var f = a[c].cloneNode(m);
						g.push(d ? b.A(f) : f)
					}
					return g
				},
				N: function(a, d) {
					if (b.a.ka(a), d) for (var c = 0, e = d.length; c < e; c++) a.appendChild(d[c])
				},
				Ya: function(a, d) {
					var c = a.nodeType ? [a] : a;
					if (0 < c.length) {
						for (var e = c[0], g = e.parentNode, f = 0, h = d.length; f < h; f++) g.insertBefore(d[f], e);
						for (f = 0, h = c.length; f < h; f++) b.removeNode(c[f])
					}
				},
				bb: function(a, b) {
					7 > n ? a.setAttribute("selected", b) : a.selected = b
				},
				D: function(a) {
					return (a || "").replace(d, "")
				},
				Rb: function(a, d) {
					for (var c = [], e = (a || "").split(d), f = 0, g = e.length; f < g; f++) {
						var h = b.a.D(e[f]);
						"" !== h && c.push(h)
					}
					return c
				},
				Ob: function(a, b) {
					return a = a || "", b.length > a.length ? r : a.substring(0, b.length) === b
				},
				tb: function(a, b) {
					if (b.compareDocumentPosition) return 16 == (16 & b.compareDocumentPosition(a));
					for (; a != p;) {
						if (a == b) return m;
						a = a.parentNode
					}
					return r
				},
				X: function(a) {
					return b.a.tb(a, a.ownerDocument)
				},
				u: function(a) {
					return a && a.tagName && a.tagName.toLowerCase()
				},
				n: function(b, d, c) {
					var e = n && l[d];
					if (e || "undefined" == typeof F) e || "function" != typeof b.addEventListener ? "undefined" != typeof b.attachEvent ? b.attachEvent("on" + d, function(a) {
						c.call(b, a)
					}) : j(Error("Browser doesn't support addEventListener or attachEvent")) : b.addEventListener(d, c, r);
					else {
						if (a(b, d)) {
							var f = c;
							c = function(a, b) {
								var d = this.checked;
								b && (this.checked = b.nb !== m), f.call(this, a), this.checked = d
							}
						}
						F(b).bind(d, c)
					}
				},
				Ba: function(b, d) {
					if ((!b || !b.nodeType) && j(Error("element must be a DOM node when calling triggerEvent")), "undefined" != typeof F) {
						var c = [];
						a(b, d) && c.push({
							nb: b.checked
						}), F(b).trigger(d, c)
					} else "function" == typeof y.createEvent ? "function" == typeof b.dispatchEvent ? (c = y.createEvent(e[d] || "HTMLEvents"), c.initEvent(d, m, m, x, 0, 0, 0, 0, 0, r, r, r, r, 0, b), b.dispatchEvent(c)) : j(Error("The supplied element doesn't support dispatchEvent")) : "undefined" != typeof b.fireEvent ? (a(b, d) && (b.checked = b.checked !== m), b.fireEvent("on" + d)) : j(Error("Browser doesn't support triggering events"))
				},
				d: function(a) {
					return b.$(a) ? a() : a
				},
				ua: function(a) {
					return b.$(a) ? a.t() : a
				},
				da: function(a, d, c) {
					if (d) {
						var e = /[\w-]+/g,
							f = a.className.match(e) || [];
						b.a.o(d.match(e), function(a) {
							var d = b.a.i(f, a);
							0 <= d ? c || f.splice(d, 1) : c && f.push(a)
						}), a.className = f.join(" ")
					}
				},
				cb: function(a, d) {
					var c = b.a.d(d);
					if (c !== p && c !== I || (c = ""), 3 === a.nodeType) a.data = c;
					else {
						var e = b.e.firstChild(a);
						!e || 3 != e.nodeType || b.e.nextSibling(e) ? b.e.N(a, [y.createTextNode(c)]) : e.data = c, b.a.wb(a)
					}
				},
				ab: function(a, b) {
					if (a.name = b, 7 >= n) try {
						a.mergeAttributes(y.createElement("<input name='" + a.name + "'/>"), r)
					} catch (d) {}
				},
				wb: function(a) {
					9 <= n && (a = 1 == a.nodeType ? a : a.parentNode, a.style && (a.style.zoom = a.style.zoom))
				},
				ub: function(a) {
					if (9 <= n) {
						var b = a.style.width;
						a.style.width = 0, a.style.width = b
					}
				},
				Lb: function(a, d) {
					a = b.a.d(a), d = b.a.d(d);
					for (var c = [], e = a; e <= d; e++) c.push(e);
					return c
				},
				L: function(a) {
					for (var b = [], d = 0, c = a.length; d < c; d++) b.push(a[d]);
					return b
				},
				Pb: 6 === n,
				Qb: 7 === n,
				Z: n,
				Oa: function(a, d) {
					for (var c = b.a.L(a.getElementsByTagName("input")).concat(b.a.L(a.getElementsByTagName("textarea"))), e = "string" == typeof d ?
					function(a) {
						return a.name === d
					} : function(a) {
						return d.test(a.name)
					}, f = [], g = c.length - 1; 0 <= g; g--) e(c[g]) && f.push(c[g]);
					return f
				},
				Ib: function(a) {
					return "string" == typeof a && (a = b.a.D(a)) ? x.JSON && x.JSON.parse ? x.JSON.parse(a) : new Function("return " + a)() : p
				},
				xa: function(a, d, c) {
					return ("undefined" == typeof JSON || "undefined" == typeof JSON.stringify) && j(Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js")), JSON.stringify(b.a.d(a), d, c)
				},
				Jb: function(a, d, c) {
					c = c || {};
					var e = c.params || {},
						f = c.includeFields || this.Na,
						g = a;
					if ("object" == typeof a && "form" === b.a.u(a)) for (var g = a.action, h = f.length - 1; 0 <= h; h--) for (var k = b.a.Oa(a, f[h]), l = k.length - 1; 0 <= l; l--) e[k[l].name] = k[l].value;
					d = b.a.d(d);
					var n = y.createElement("form");
					n.style.display = "none", n.action = g, n.method = "post";
					for (var w in d) a = y.createElement("input"), a.name = w, a.value = b.a.xa(b.a.d(d[w])), n.appendChild(a);
					for (w in e) a = y.createElement("input"), a.name = w, a.value = e[w], n.appendChild(a);
					y.body.appendChild(n), c.submitter ? c.submitter(n) : n.submit(), setTimeout(function() {
						n.parentNode.removeChild(n)
					}, 0)
				}
			}
		}, b.b("utils", b.a), b.b("utils.arrayForEach", b.a.o), b.b("utils.arrayFirst", b.a.lb), b.b("utils.arrayFilter", b.a.fa), b.b("utils.arrayGetDistinctValues", b.a.Ga), b.b("utils.arrayIndexOf", b.a.i), b.b("utils.arrayMap", b.a.V), b.b("utils.arrayPushAll", b.a.P), b.b("utils.arrayRemoveItem", b.a.ga), b.b("utils.extend", b.a.extend), b.b("utils.fieldsIncludedWithJsonPost", b.a.Na), b.b("utils.getFormFields", b.a.Oa), b.b("utils.peekObservable", b.a.ua), b.b("utils.postJson", b.a.Jb), b.b("utils.parseJson", b.a.Ib), b.b("utils.registerEventHandler", b.a.n), b.b("utils.stringifyJson", b.a.xa), b.b("utils.range", b.a.Lb), b.b("utils.toggleDomNodeCssClass", b.a.da), b.b("utils.triggerEvent", b.a.Ba), b.b("utils.unwrapObservable", b.a.d), Function.prototype.bind || (Function.prototype.bind = function(a) {
			var b = this,
				c = Array.prototype.slice.call(arguments);
			return a = c.shift(), function() {
				return b.apply(a, c.concat(Array.prototype.slice.call(arguments)))
			}
		}), b.a.f = new function() {
			var a = 0,
				d = "__ko__" + (new Date).getTime(),
				c = {};
			return {
				get: function(a, d) {
					var c = b.a.f.la(a, r);
					return c === I ? I : c[d]
				},
				set: function(a, d, c) {
					c === I && b.a.f.la(a, r) === I || (b.a.f.la(a, m)[d] = c)
				},
				la: function(b, f) {
					var g = b[d];
					if (!g || "null" === g || !c[g]) {
						if (!f) return I;
						g = b[d] = "ko" + a++, c[g] = {}
					}
					return c[g]
				},
				clear: function(a) {
					var b = a[d];
					return b ? (delete c[b], a[d] = p, m) : r
				}
			}
		}, b.b("utils.domData", b.a.f), b.b("utils.domData.clear", b.a.f.clear), b.a.F = new function() {
			function a(a, d) {
				var e = b.a.f.get(a, c);
				return e === I && d && (e = [], b.a.f.set(a, c, e)), e
			}
			function d(c) {
				var e = a(c, r);
				if (e) for (var e = e.slice(0), k = 0; k < e.length; k++) e[k](c);
				if (b.a.f.clear(c), "function" == typeof F && "function" == typeof F.cleanData && F.cleanData([c]), f[c.nodeType]) for (e = c.firstChild; c = e;) e = c.nextSibling, 8 === c.nodeType && d(c)
			}
			var c = "__ko_domNodeDisposal__" + (new Date).getTime(),
				e = {
					1: m,
					8: m,
					9: m
				},
				f = {
					1: m,
					9: m
				};
			return {
				Ca: function(b, d) {
					"function" != typeof d && j(Error("Callback must be a function")), a(b, m).push(d)
				},
				Xa: function(d, e) {
					var f = a(d, r);
					f && (b.a.ga(f, e), 0 == f.length && b.a.f.set(d, c, I))
				},
				A: function(a) {
					if (e[a.nodeType] && (d(a), f[a.nodeType])) {
						var c = [];
						b.a.P(c, a.getElementsByTagName("*"));
						for (var k = 0, l = c.length; k < l; k++) d(c[k])
					}
					return a
				},
				removeNode: function(a) {
					b.A(a), a.parentNode && a.parentNode.removeChild(a)
				}
			}
		}, b.A = b.a.F.A, b.removeNode = b.a.F.removeNode, b.b("cleanNode", b.A), b.b("removeNode", b.removeNode), b.b("utils.domNodeDisposal", b.a.F), b.b("utils.domNodeDisposal.addDisposeCallback", b.a.F.Ca), b.b("utils.domNodeDisposal.removeDisposeCallback", b.a.F.Xa), b.a.ta = function(a) {
			var d;
			if ("undefined" != typeof F) {
				if (F.parseHTML) d = F.parseHTML(a);
				else if ((d = F.clean([a])) && d[0]) {
					for (a = d[0]; a.parentNode && 11 !== a.parentNode.nodeType;) a = a.parentNode;
					a.parentNode && a.parentNode.removeChild(a)
				}
			} else {
				var c = b.a.D(a).toLowerCase();
				for (d = y.createElement("div"), c = c.match(/^<(thead|tbody|tfoot)/) && [1, "<table>", "</table>"] || !c.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"] || (!c.indexOf("<td") || !c.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"] || [0, "", ""], a = "ignored<div>" + c[1] + a + c[2] + "</div>", "function" == typeof x.innerShiv ? d.appendChild(x.innerShiv(a)) : d.innerHTML = a; c[0]--;) d = d.lastChild;
				d = b.a.L(d.lastChild.childNodes)
			}
			return d
		}, b.a.ca = function(a, d) {
			if (b.a.ka(a), d = b.a.d(d), d !== p && d !== I) if ("string" != typeof d && (d = d.toString()), "undefined" != typeof F) F(a).html(d);
			else for (var c = b.a.ta(d), e = 0; e < c.length; e++) a.appendChild(c[e])
		}, b.b("utils.parseHtmlFragment", b.a.ta), b.b("utils.setHtml", b.a.ca);
		var R = {};
		b.s = {
			ra: function(a) {
				"function" != typeof a && j(Error("You can only pass a function to ko.memoization.memoize()"));
				var b = (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1) + (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1);
				return R[b] = a, "<!--[ko_memo:" + b + "]-->"
			},
			hb: function(a, b) {
				var c = R[a];
				c === I && j(Error("Couldn't find any memo with ID " + a + ". Perhaps it's already been unmemoized."));
				try {
					return c.apply(p, b || []), m
				} finally {
					delete R[a]
				}
			},
			ib: function(a, d) {
				var c = [];
				ca(a, c);
				for (var e = 0, f = c.length; e < f; e++) {
					var g = c[e].sb,
						h = [g];
					d && b.a.P(h, d), b.s.hb(c[e].Fb, h), g.nodeValue = "", g.parentNode && g.parentNode.removeChild(g)
				}
			},
			Ua: function(a) {
				return (a = a.match(/^\[ko_memo\:(.*?)\]$/)) ? a[1] : p
			}
		}, b.b("memoization", b.s), b.b("memoization.memoize", b.s.ra), b.b("memoization.unmemoize", b.s.hb), b.b("memoization.parseMemoText", b.s.Ua), b.b("memoization.unmemoizeDomNodeAndDescendants", b.s.ib), b.Ma = {
			throttle: function(a, d) {
				a.throttleEvaluation = d;
				var c = p;
				return b.j({
					read: a,
					write: function(b) {
						clearTimeout(c), c = setTimeout(function() {
							a(b)
						}, d)
					}
				})
			},
			notify: function(a, d) {
				return a.equalityComparer = "always" == d ? u(r) : b.m.fn.equalityComparer, a
			}
		}, b.b("extenders", b.Ma), b.fb = function(a, d, c) {
			this.target = a, this.ha = d, this.rb = c, b.p(this, "dispose", this.B)
		}, b.fb.prototype.B = function() {
			this.Cb = m, this.rb()
		}, b.S = function() {
			this.w = {}, b.a.extend(this, b.S.fn), b.p(this, "subscribe", this.ya), b.p(this, "extend", this.extend), b.p(this, "getSubscriptionsCount", this.yb)
		}, b.S.fn = {
			ya: function(a, d, c) {
				c = c || "change";
				var e = new b.fb(this, d ? a.bind(d) : a, function() {
					b.a.ga(this.w[c], e)
				}.bind(this));
				return this.w[c] || (this.w[c] = []), this.w[c].push(e), e
			},
			notifySubscribers: function(a, d) {
				d = d || "change", this.w[d] && b.r.K(function() {
					b.a.o(this.w[d].slice(0), function(b) {
						b && b.Cb !== m && b.ha(a)
					})
				}, this)
			},
			yb: function() {
				var b, a = 0;
				for (b in this.w) this.w.hasOwnProperty(b) && (a += this.w[b].length);
				return a
			},
			extend: function(a) {
				var d = this;
				if (a) for (var c in a) {
					var e = b.Ma[c];
					"function" == typeof e && (d = e(d, a[c]))
				}
				return d
			}
		}, b.Qa = function(a) {
			return "function" == typeof a.ya && "function" == typeof a.notifySubscribers
		}, b.b("subscribable", b.S), b.b("isSubscribable", b.Qa);
		var C = [];
		b.r = {
			mb: function(a) {
				C.push({
					ha: a,
					La: []
				})
			},
			end: function() {
				C.pop()
			},
			Wa: function(a) {
				if (b.Qa(a) || j(Error("Only subscribable things can act as dependencies")), 0 < C.length) {
					var d = C[C.length - 1];
					d && !(0 <= b.a.i(d.La, a)) && (d.La.push(a), d.ha(a))
				}
			},
			K: function(a, b, c) {
				try {
					return C.push(p), a.apply(b, c || [])
				} finally {
					C.pop()
				}
			}
		};
		var ma = {
			undefined: m,
			boolean: m,
			number: m,
			string: m
		};
		b.m = function(a) {
			function d() {
				return 0 < arguments.length ? (d.equalityComparer && d.equalityComparer(c, arguments[0]) || (d.H(), c = arguments[0], d.G()), this) : (b.r.Wa(d), c)
			}
			var c = a;
			return b.S.call(d), d.t = function() {
				return c
			}, d.G = function() {
				d.notifySubscribers(c)
			}, d.H = function() {
				d.notifySubscribers(c, "beforeChange")
			}, b.a.extend(d, b.m.fn), b.p(d, "peek", d.t), b.p(d, "valueHasMutated", d.G), b.p(d, "valueWillMutate", d.H), d
		}, b.m.fn = {
			equalityComparer: function(a, b) {
				return a === p || typeof a in ma ? a === b : r
			}
		};
		var E = b.m.Kb = "__ko_proto__";
		b.m.fn[E] = b.m, b.ma = function(a, d) {
			return a === p || a === I || a[E] === I ? r : a[E] === d ? m : b.ma(a[E], d)
		}, b.$ = function(a) {
			return b.ma(a, b.m)
		}, b.Ra = function(a) {
			return "function" == typeof a && a[E] === b.m || "function" == typeof a && a[E] === b.j && a.zb ? m : r
		}, b.b("observable", b.m), b.b("isObservable", b.$), b.b("isWriteableObservable", b.Ra), b.R = function(a) {
			0 == arguments.length && (a = []), a !== p && a !== I && !("length" in a) && j(Error("The argument passed when initializing an observable array must be an array, or null, or undefined."));
			var d = b.m(a);
			return b.a.extend(d, b.R.fn), d
		}, b.R.fn = {
			remove: function(a) {
				for (var b = this.t(), c = [], e = "function" == typeof a ? a : function(b) {
						return b === a
					}, f = 0; f < b.length; f++) {
					var g = b[f];
					e(g) && (0 === c.length && this.H(), c.push(g), b.splice(f, 1), f--)
				}
				return c.length && this.G(), c
			},
			removeAll: function(a) {
				if (a === I) {
					var d = this.t(),
						c = d.slice(0);
					return this.H(), d.splice(0, d.length), this.G(), c
				}
				return a ? this.remove(function(d) {
					return 0 <= b.a.i(a, d)
				}) : []
			},
			destroy: function(a) {
				var b = this.t(),
					c = "function" == typeof a ? a : function(b) {
						return b === a
					};
				this.H();
				for (var e = b.length - 1; 0 <= e; e--) c(b[e]) && (b[e]._destroy = m);
				this.G()
			},
			destroyAll: function(a) {
				return a === I ? this.destroy(u(m)) : a ? this.destroy(function(d) {
					return 0 <= b.a.i(a, d)
				}) : []
			},
			indexOf: function(a) {
				var d = this();
				return b.a.i(d, a)
			},
			replace: function(a, b) {
				var c = this.indexOf(a);
				0 <= c && (this.H(), this.t()[c] = b, this.G())
			}
		}, b.a.o("pop push reverse shift sort splice unshift".split(" "), function(a) {
			b.R.fn[a] = function() {
				var b = this.t();
				return this.H(), b = b[a].apply(b, arguments), this.G(), b
			}
		}), b.a.o(["slice"], function(a) {
			b.R.fn[a] = function() {
				var b = this();
				return b[a].apply(b, arguments)
			}
		}), b.b("observableArray", b.R), b.j = function(a, d, c) {
			function e() {
				b.a.o(z, function(a) {
					a.B()
				}), z = []
			}
			function f() {
				var a = h.throttleEvaluation;
				a && 0 <= a ? (clearTimeout(t), t = setTimeout(g, a)) : g()
			}
			function g() {
				if (!q) if (n && w()) A();
				else {
					q = m;
					try {
						var a = b.a.V(z, function(a) {
							return a.target
						});
						b.r.mb(function(c) {
							var d;
							0 <= (d = b.a.i(a, c)) ? a[d] = I : z.push(c.ya(f))
						});
						for (var c = s.call(d), e = a.length - 1; 0 <= e; e--) a[e] && z.splice(e, 1)[0].B();
						n = m, h.notifySubscribers(l, "beforeChange"), l = c
					} finally {
						b.r.end()
					}
					h.notifySubscribers(l), q = r, z.length || A()
				}
			}
			function h() {
				return 0 < arguments.length ? ("function" == typeof v ? v.apply(d, arguments) : j(Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.")), this) : (n || g(), b.r.Wa(h), l)
			}
			function k() {
				return !n || 0 < z.length
			}
			var l, n = r,
				q = r,
				s = a;
			s && "object" == typeof s ? (c = s, s = c.read) : (c = c || {}, s || (s = c.read)), "function" != typeof s && j(Error("Pass a function that returns the value of the ko.computed"));
			var v = c.write,
				G = c.disposeWhenNodeIsRemoved || c.W || p,
				w = c.disposeWhen || c.Ka || u(r),
				A = e,
				z = [],
				t = p;
			if (d || (d = c.owner), h.t = function() {
				return n || g(), l
			}, h.xb = function() {
				return z.length
			}, h.zb = "function" == typeof c.write, h.B = function() {
				A()
			}, h.pa = k, b.S.call(h), b.a.extend(h, b.j.fn), b.p(h, "peek", h.t), b.p(h, "dispose", h.B), b.p(h, "isActive", h.pa), b.p(h, "getDependenciesCount", h.xb), c.deferEvaluation !== m && g(), G && k()) {
				A = function() {
					b.a.F.Xa(G, arguments.callee), e()
				}, b.a.F.Ca(G, A);
				var D = w,
					w = function() {
						return !b.a.X(G) || D()
					}
			}
			return h
		}, b.Bb = function(a) {
			return b.ma(a, b.j)
		}, w = b.m.Kb, b.j[w] = b.m, b.j.fn = {}, b.j.fn[w] = b.j, b.b("dependentObservable", b.j), b.b("computed", b.j), b.b("isComputed", b.Bb), b.gb = function(a) {
			return 0 == arguments.length && j(Error("When calling ko.toJS, pass the object you want to convert.")), ba(a, function(a) {
				for (var c = 0; b.$(a) && 10 > c; c++) a = a();
				return a
			})
		}, b.toJSON = function(a, d, c) {
			return a = b.gb(a), b.a.xa(a, d, c)
		}, b.b("toJS", b.gb), b.b("toJSON", b.toJSON), b.k = {
			q: function(a) {
				switch (b.a.u(a)) {
				case "option":
					return a.__ko__hasDomDataOptionValue__ === m ? b.a.f.get(a, b.c.options.sa) : 7 >= b.a.Z ? a.getAttributeNode("value").specified ? a.value : a.text : a.value;
				case "select":
					return 0 <= a.selectedIndex ? b.k.q(a.options[a.selectedIndex]) : I;
				default:
					return a.value
				}
			},
			T: function(a, d) {
				switch (b.a.u(a)) {
				case "option":
					switch (typeof d) {
					case "string":
						b.a.f.set(a, b.c.options.sa, I), "__ko__hasDomDataOptionValue__" in a && delete a.__ko__hasDomDataOptionValue__, a.value = d;
						break;
					default:
						b.a.f.set(a, b.c.options.sa, d), a.__ko__hasDomDataOptionValue__ = m, a.value = "number" == typeof d ? d : ""
					}
					break;
				case "select":
					for (var c = a.options.length - 1; 0 <= c; c--) if (b.k.q(a.options[c]) == d) {
						a.selectedIndex = c;
						break
					}
					break;
				default:
					d !== p && d !== I || (d = ""), a.value = d
				}
			}
		}, b.b("selectExtensions", b.k), b.b("selectExtensions.readValue", b.k.q), b.b("selectExtensions.writeValue", b.k.T);
		var ka = /\@ko_token_(\d+)\@/g,
			na = ["true", "false"],
			oa = /^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i;
		b.g = {
			Q: [],
			aa: function(a) {
				var d = b.a.D(a);
				if (3 > d.length) return [];
				"{" === d.charAt(0) && (d = d.substring(1, d.length - 1)), a = [];
				for (var e, c = p, f = 0; f < d.length; f++) {
					var g = d.charAt(f);
					if (c === p) switch (g) {
					case '"':
					case "'":
					case "/":
						c = f, e = g
					} else if (g == e && "\\" !== d.charAt(f - 1)) {
						g = d.substring(c, f + 1), a.push(g);
						var h = "@ko_token_" + (a.length - 1) + "@",
							d = d.substring(0, c) + h + d.substring(f + 1),
							f = f - (g.length - h.length),
							c = p
					}
				}
				e = c = p;
				for (var k = 0, l = p, f = 0; f < d.length; f++) {
					if (g = d.charAt(f), c === p) switch (g) {
					case "{":
						c = f, l = g, e = "}";
						break;
					case "(":
						c = f, l = g, e = ")";
						break;
					case "[":
						c = f, l = g, e = "]"
					}
					g === l ? k++ : g === e && (k--, 0 === k && (g = d.substring(c, f + 1), a.push(g), h = "@ko_token_" + (a.length - 1) + "@", d = d.substring(0, c) + h + d.substring(f + 1), f -= g.length - h.length, c = p))
				}
				for (e = [], d = d.split(","), c = 0, f = d.length; c < f; c++) k = d[c], l = k.indexOf(":"), 0 < l && l < k.length - 1 ? (g = k.substring(l + 1), e.push({
					key: P(k.substring(0, l), a),
					value: P(g, a)
				})) : e.push({
					unknown: P(k, a)
				});
				return e
			},
			ba: function(a) {
				var d = "string" == typeof a ? b.g.aa(a) : a,
					c = [];
				a = [];
				for (var e, f = 0; e = d[f]; f++) if (0 < c.length && c.push(","), e.key) {
					var g;
					a: {
						g = e.key;
						var h = b.a.D(g);
						switch (h.length && h.charAt(0)) {
						case "'":
						case '"':
							break a;
						default:
							g = "'" + h + "'"
						}
					}
					e = e.value,
					c.push(g),
					c.push(":"),
					c.push(e),
					e = b.a.D(e),
					0 <= b.a.i(na, b.a.D(e).toLowerCase()) ? e = r : (h = e.match(oa), e = h === p ? r : h[1] ? "Object(" + h[1] + ")" + h[2] : e),
					e && (0 < a.length && a.push(", "), a.push(g + " : function(__ko_value) { " + e + " = __ko_value; }"))
				} else e.unknown && c.push(e.unknown);
				return d = c.join(""), 0 < a.length && (d = d + ", '_ko_property_writers' : { " + a.join("") + " } "), d
			},
			Eb: function(a, d) {
				for (var c = 0; c < a.length; c++) if (b.a.D(a[c].key) == d) return m;
				return r
			},
			ea: function(a, d, c, e, f) {
				a && b.Ra(a) ? (!f || a.t() !== e) && a(e) : (a = d()._ko_property_writers) && a[c] && a[c](e)
			}
		}, b.b("expressionRewriting", b.g), b.b("expressionRewriting.bindingRewriteValidators", b.g.Q), b.b("expressionRewriting.parseObjectLiteral", b.g.aa), b.b("expressionRewriting.preProcessBindings", b.g.ba), b.b("jsonExpressionRewriting", b.g), b.b("jsonExpressionRewriting.insertPropertyAccessorsIntoJson", b.g.ba);
		var K = "<!--test-->" === y.createComment("test").text,
			ja = K ? /^\x3c!--\s*ko(?:\s+(.+\s*\:[\s\S]*))?\s*--\x3e$/ : /^\s*ko(?:\s+(.+\s*\:[\s\S]*))?\s*$/,
			ia = K ? /^\x3c!--\s*\/ko\s*--\x3e$/ : /^\s*\/ko\s*$/,
			pa = {
				ul: m,
				ol: m
			};
		b.e = {
			I: {},
			childNodes: function(a) {
				return B(a) ? aa(a) : a.childNodes
			},
			Y: function(a) {
				if (B(a)) {
					a = b.e.childNodes(a);
					for (var d = 0, c = a.length; d < c; d++) b.removeNode(a[d])
				} else b.a.ka(a)
			},
			N: function(a, d) {
				if (B(a)) {
					b.e.Y(a);
					for (var c = a.nextSibling, e = 0, f = d.length; e < f; e++) c.parentNode.insertBefore(d[e], c)
				} else b.a.N(a, d)
			},
			Va: function(a, b) {
				B(a) ? a.parentNode.insertBefore(b, a.nextSibling) : a.firstChild ? a.insertBefore(b, a.firstChild) : a.appendChild(b)
			},
			Pa: function(a, d, c) {
				c ? B(a) ? a.parentNode.insertBefore(d, c.nextSibling) : c.nextSibling ? a.insertBefore(d, c.nextSibling) : a.appendChild(d) : b.e.Va(a, d)
			},
			firstChild: function(a) {
				return B(a) ? !a.nextSibling || H(a.nextSibling) ? p : a.nextSibling : a.firstChild
			},
			nextSibling: function(a) {
				return B(a) && (a = $(a)), a.nextSibling && H(a.nextSibling) ? p : a.nextSibling
			},
			jb: function(a) {
				return (a = B(a)) ? a[1] : p
			},
			Ta: function(a) {
				if (pa[b.a.u(a)]) {
					var d = a.firstChild;
					if (d) do
					if (1 === d.nodeType) {
						var c;
						c = d.firstChild;
						var e = p;
						if (c) do
						if (e) e.push(c);
						else if (B(c)) {
							var f = $(c, m);
							f ? c = f : e = [c]
						} else H(c) && (e = [c]);
						while (c = c.nextSibling);
						if (c = e) for (e = d.nextSibling, f = 0; f < c.length; f++) e ? a.insertBefore(c[f], e) : a.appendChild(c[f])
					}
					while (d = d.nextSibling)
				}
			}
		}, b.b("virtualElements", b.e), b.b("virtualElements.allowedBindings", b.e.I), b.b("virtualElements.emptyNode", b.e.Y), b.b("virtualElements.insertAfter", b.e.Pa), b.b("virtualElements.prepend", b.e.Va), b.b("virtualElements.setDomNodeChildren", b.e.N), b.J = function() {
			this.Ha = {}
		}, b.a.extend(b.J.prototype, {
			nodeHasBindings: function(a) {
				switch (a.nodeType) {
				case 1:
					return a.getAttribute("data-bind") != p;
				case 8:
					return b.e.jb(a) != p;
				default:
					return r
				}
			},
			getBindings: function(a, b) {
				var c = this.getBindingsString(a, b);
				return c ? this.parseBindingsString(c, b, a) : p
			},
			getBindingsString: function(a) {
				switch (a.nodeType) {
				case 1:
					return a.getAttribute("data-bind");
				case 8:
					return b.e.jb(a);
				default:
					return p
				}
			},
			parseBindingsString: function(a, d, c) {
				try {
					var e;
					if (!(e = this.Ha[a])) {
						var g, f = this.Ha,
							h = "with($context){with($data||{}){return{" + b.g.ba(a) + "}}}";
						g = new Function("$context", "$element", h), e = f[a] = g
					}
					return e(d, c)
				} catch (k) {
					j(Error("Unable to parse bindings.\nMessage: " + k + ";\nBindings value: " + a))
				}
			}
		}), b.J.instance = new b.J, b.b("bindingProvider", b.J), b.c = {}, b.z = function(a, d, c) {
			d ? (b.a.extend(this, d), this.$parentContext = d, this.$parent = d.$data, this.$parents = (d.$parents || []).slice(0), this.$parents.unshift(this.$parent)) : (this.$parents = [], this.$root = a, this.ko = b), this.$data = a, c && (this[c] = a)
		}, b.z.prototype.createChildContext = function(a, d) {
			return new b.z(a, this, d)
		}, b.z.prototype.extend = function(a) {
			var d = b.a.extend(new b.z, this);
			return b.a.extend(d, a)
		}, b.eb = function(a, d) {
			return 2 != arguments.length ? b.a.f.get(a, "__ko_bindingContext__") : void b.a.f.set(a, "__ko_bindingContext__", d)
		}, b.Fa = function(a, d, c) {
			return 1 === a.nodeType && b.e.Ta(a), X(a, d, c, m)
		}, b.Ea = function(a, b) {
			(1 === b.nodeType || 8 === b.nodeType) && Z(a, b, m)
		}, b.Da = function(a, b) {
			b && 1 !== b.nodeType && 8 !== b.nodeType && j(Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node")), b = b || x.document.body, Y(a, b, m)
		}, b.ja = function(a) {
			switch (a.nodeType) {
			case 1:
			case 8:
				var d = b.eb(a);
				if (d) return d;
				if (a.parentNode) return b.ja(a.parentNode)
			}
			return I
		}, b.pb = function(a) {
			return (a = b.ja(a)) ? a.$data : I
		}, b.b("bindingHandlers", b.c), b.b("applyBindings", b.Da), b.b("applyBindingsToDescendants", b.Ea), b.b("applyBindingsToNode", b.Fa), b.b("contextFor", b.ja), b.b("dataFor", b.pb);
		var fa = {
			class: "className",
			for :"htmlFor"
		};
		b.c.attr = {
			update: function(a, d) {
				var e, c = b.a.d(d()) || {};
				for (e in c) if ("string" == typeof e) {
					var f = b.a.d(c[e]),
						g = f === r || f === p || f === I;
					g && a.removeAttribute(e), 8 >= b.a.Z && e in fa ? (e = fa[e], g ? a.removeAttribute(e) : a[e] = f) : g || a.setAttribute(e, f.toString()), "name" === e && b.a.ab(a, g ? "" : f.toString())
				}
			}
		}, b.c.checked = {
			init: function(a, d, c) {
				b.a.n(a, "click", function() {
					var e;
					if ("checkbox" == a.type) e = a.checked;
					else {
						if ("radio" != a.type || !a.checked) return;
						e = a.value
					}
					var f = d(),
						g = b.a.d(f);
					"checkbox" == a.type && g instanceof Array ? (e = b.a.i(g, a.value), a.checked && 0 > e ? f.push(a.value) : !a.checked && 0 <= e && f.splice(e, 1)) : b.g.ea(f, c, "checked", e, m)
				}), "radio" == a.type && !a.name && b.c.uniqueName.init(a, u(m))
			},
			update: function(a, d) {
				var c = b.a.d(d());
				"checkbox" == a.type ? a.checked = c instanceof Array ? 0 <= b.a.i(c, a.value) : c : "radio" == a.type && (a.checked = a.value == c)
			}
		}, b.c.css = {
			update: function(a, d) {
				var c = b.a.d(d());
				if ("object" == typeof c) for (var e in c) {
					var f = b.a.d(c[e]);
					b.a.da(a, e, f)
				} else c = String(c || ""), b.a.da(a, a.__ko__cssValue, r), a.__ko__cssValue = c, b.a.da(a, c, m)
			}
		}, b.c.enable = {
			update: function(a, d) {
				var c = b.a.d(d());
				c && a.disabled ? a.removeAttribute("disabled") : !c && !a.disabled && (a.disabled = m)
			}
		}, b.c.disable = {
			update: function(a, d) {
				b.c.enable.update(a, function() {
					return !b.a.d(d())
				})
			}
		}, b.c.event = {
			init: function(a, d, c, e) {
				var g, f = d() || {};
				for (g in f)(function() {
					var f = g;
					"string" == typeof f && b.a.n(a, f, function(a) {
						var g, n = d()[f];
						if (n) {
							var q = c();
							try {
								var s = b.a.L(arguments);
								s.unshift(e), g = n.apply(e, s)
							} finally {
								g !== m && (a.preventDefault ? a.preventDefault() : a.returnValue = r)
							}
							q[f + "Bubble"] === r && (a.cancelBubble = m, a.stopPropagation && a.stopPropagation())
						}
					})
				})()
			}
		}, b.c.foreach = {
			Sa: function(a) {
				return function() {
					var d = a(),
						c = b.a.ua(d);
					return c && "number" != typeof c.length ? (b.a.d(d), {
						foreach: c.data,
						as: c.as,
						includeDestroyed: c.includeDestroyed,
						afterAdd: c.afterAdd,
						beforeRemove: c.beforeRemove,
						afterRender: c.afterRender,
						beforeMove: c.beforeMove,
						afterMove: c.afterMove,
						templateEngine: b.C.oa
					}) : {
						foreach: d,
						templateEngine: b.C.oa
					}
				}
			},
			init: function(a, d) {
				return b.c.template.init(a, b.c.foreach.Sa(d))
			},
			update: function(a, d, c, e, f) {
				return b.c.template.update(a, b.c.foreach.Sa(d), c, e, f)
			}
		}, b.g.Q.foreach = r, b.e.I.foreach = m, b.c.hasfocus = {
			init: function(a, d, c) {
				function e(e) {
					a.__ko_hasfocusUpdating = m;
					var f = a.ownerDocument;
					"activeElement" in f && (e = f.activeElement === a), f = d(), b.g.ea(f, c, "hasfocus", e, m), a.__ko_hasfocusUpdating = r
				}
				var f = e.bind(p, m),
					g = e.bind(p, r);
				b.a.n(a, "focus", f), b.a.n(a, "focusin", f), b.a.n(a, "blur", g), b.a.n(a, "focusout", g)
			},
			update: function(a, d) {
				var c = b.a.d(d());
				a.__ko_hasfocusUpdating || (c ? a.focus() : a.blur(), b.r.K(b.a.Ba, p, [a, c ? "focusin" : "focusout"]))
			}
		}, b.c.html = {
			init: function() {
				return {
					controlsDescendantBindings: m
				}
			},
			update: function(a, d) {
				b.a.ca(a, d())
			}
		};
		var da = "__ko_withIfBindingData";
		Q("if"), Q("ifnot", r, m), Q("with", m, r, function(a, b) {
			return a.createChildContext(b)
		}), b.c.options = {
			update: function(a, d, c) {
				"select" !== b.a.u(a) && j(Error("options binding applies only to SELECT elements"));
				for (var e = 0 == a.length, f = b.a.V(b.a.fa(a.childNodes, function(a) {
					return a.tagName && "option" === b.a.u(a) && a.selected
				}), function(a) {
					return b.k.q(a) || a.innerText || a.textContent
				}), g = a.scrollTop, h = b.a.d(d()); 0 < a.length;) b.A(a.options[0]), a.remove(0);
				if (h) {
					c = c();
					var k = c.optionsIncludeDestroyed;
					if ("number" != typeof h.length && (h = [h]), c.optionsCaption) {
						var l = y.createElement("option");
						b.a.ca(l, c.optionsCaption), b.k.T(l, I), a.appendChild(l)
					}
					d = 0;
					for (var n = h.length; d < n; d++) {
						var q = h[d];
						if (!q || !q._destroy || k) {
							var l = y.createElement("option"),
								s = function(a, b, c) {
									var d = typeof b;
									return "function" == d ? b(a) : "string" == d ? a[b] : c
								},
								v = s(q, c.optionsValue, q);
							b.k.T(l, b.a.d(v)), q = s(q, c.optionsText, v), b.a.cb(l, q), a.appendChild(l)
						}
					}
					for (h = a.getElementsByTagName("option"), d = k = 0, n = h.length; d < n; d++) 0 <= b.a.i(f, b.k.q(h[d])) && (b.a.bb(h[d], m), k++);
					a.scrollTop = g, e && "value" in c && ea(a, b.a.ua(c.value), m), b.a.ub(a)
				}
			}
		}, b.c.options.sa = "__ko.optionValueDomData__", b.c.selectedOptions = {
			init: function(a, d, c) {
				b.a.n(a, "change", function() {
					var e = d(),
						f = [];
					b.a.o(a.getElementsByTagName("option"), function(a) {
						a.selected && f.push(b.k.q(a))
					}), b.g.ea(e, c, "value", f)
				})
			},
			update: function(a, d) {
				"select" != b.a.u(a) && j(Error("values binding applies only to SELECT elements"));
				var c = b.a.d(d());
				c && "number" == typeof c.length && b.a.o(a.getElementsByTagName("option"), function(a) {
					var d = 0 <= b.a.i(c, b.k.q(a));
					b.a.bb(a, d)
				})
			}
		}, b.c.style = {
			update: function(a, d) {
				var e, c = b.a.d(d() || {});
				for (e in c) if ("string" == typeof e) {
					var f = b.a.d(c[e]);
					a.style[e] = f || ""
				}
			}
		}, b.c.submit = {
			init: function(a, d, c, e) {
				"function" != typeof d() && j(Error("The value for a submit binding must be a function")), b.a.n(a, "submit", function(b) {
					var c, h = d();
					try {
						c = h.call(e, a)
					} finally {
						c !== m && (b.preventDefault ? b.preventDefault() : b.returnValue = r)
					}
				})
			}
		}, b.c.text = {
			update: function(a, d) {
				b.a.cb(a, d())
			}
		}, b.e.I.text = m, b.c.uniqueName = {
			init: function(a, d) {
				if (d()) {
					var c = "ko_unique_" + ++b.c.uniqueName.ob;
					b.a.ab(a, c)
				}
			}
		}, b.c.uniqueName.ob = 0, b.c.value = {
			init: function(a, d, c) {
				function e() {
					h = r;
					var e = d(),
						f = b.k.q(a);
					b.g.ea(e, c, "value", f)
				}
				var f = ["change"],
					g = c().valueUpdate,
					h = r;
				g && ("string" == typeof g && (g = [g]), b.a.P(f, g), f = b.a.Ga(f)), !b.a.Z || "input" != a.tagName.toLowerCase() || "text" != a.type || "off" == a.autocomplete || a.form && "off" == a.form.autocomplete || -1 != b.a.i(f, "propertychange") || (b.a.n(a, "propertychange", function() {
					h = m
				}), b.a.n(a, "blur", function() {
					h && e()
				})), b.a.o(f, function(c) {
					var d = e;
					b.a.Ob(c, "after") && (d = function() {
						setTimeout(e, 0)
					}, c = c.substring(5)), b.a.n(a, c, d)
				})
			},
			update: function(a, d) {
				var c = "select" === b.a.u(a),
					e = b.a.d(d()),
					f = b.k.q(a),
					g = e != f;
				0 === e && 0 !== f && "0" !== f && (g = m), g && (f = function() {
					b.k.T(a, e)
				}, f(), c && setTimeout(f, 0)), c && 0 < a.length && ea(a, e, r)
			}
		}, b.c.visible = {
			update: function(a, d) {
				var c = b.a.d(d()),
					e = "none" != a.style.display;
				c && !e ? a.style.display = "" : !c && e && (a.style.display = "none")
			}
		}, b.c.click = {
			init: function(a, d, c, e) {
				return b.c.event.init.call(this, a, function() {
					var a = {};
					return a.click = d(), a
				}, c, e)
			}
		}, b.v = function() {}, b.v.prototype.renderTemplateSource = function() {
			j(Error("Override renderTemplateSource"))
		}, b.v.prototype.createJavaScriptEvaluatorBlock = function() {
			j(Error("Override createJavaScriptEvaluatorBlock"))
		}, b.v.prototype.makeTemplateSource = function(a, d) {
			if ("string" == typeof a) {
				d = d || y;
				var c = d.getElementById(a);
				return c || j(Error("Cannot find template with ID " + a)), new b.l.h(c)
			}
			return 1 == a.nodeType || 8 == a.nodeType ? new b.l.O(a) : void j(Error("Unknown template type: " + a))
		}, b.v.prototype.renderTemplate = function(a, b, c, e) {
			return a = this.makeTemplateSource(a, e), this.renderTemplateSource(a, b, c)
		}, b.v.prototype.isTemplateRewritten = function(a, b) {
			return this.allowTemplateRewriting === r ? m : this.makeTemplateSource(a, b).data("isRewritten")
		}, b.v.prototype.rewriteTemplate = function(a, b, c) {
			a = this.makeTemplateSource(a, c), b = b(a.text()), a.text(b), a.data("isRewritten", m)
		}, b.b("templateEngine", b.v);
		var qa = /(<[a-z]+\d*(\s+(?!data-bind=)[a-z0-9\-]+(=(\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind=(["'])([\s\S]*?)\5/gi,
			ra = /\x3c!--\s*ko\b\s*([\s\S]*?)\s*--\x3e/g;
		b.za = {
			vb: function(a, d, c) {
				d.isTemplateRewritten(a, c) || d.rewriteTemplate(a, function(a) {
					return b.za.Gb(a, d)
				}, c)
			},
			Gb: function(a, b) {
				return a.replace(qa, function(a, e, f, g, h, k, l) {
					return W(l, e, b)
				}).replace(ra, function(a, e) {
					return W(e, "<!-- ko -->", b)
				})
			},
			kb: function(a) {
				return b.s.ra(function(d, c) {
					d.nextSibling && b.Fa(d.nextSibling, a, c)
				})
			}
		}, b.b("__tr_ambtns", b.za.kb), b.l = {}, b.l.h = function(a) {
			this.h = a
		}, b.l.h.prototype.text = function() {
			var a = b.a.u(this.h),
				a = "script" === a ? "text" : "textarea" === a ? "value" : "innerHTML";
			if (0 == arguments.length) return this.h[a];
			var d = arguments[0];
			"innerHTML" === a ? b.a.ca(this.h, d) : this.h[a] = d
		}, b.l.h.prototype.data = function(a) {
			return 1 === arguments.length ? b.a.f.get(this.h, "templateSourceData_" + a) : void b.a.f.set(this.h, "templateSourceData_" + a, arguments[1])
		}, b.l.O = function(a) {
			this.h = a
		}, b.l.O.prototype = new b.l.h, b.l.O.prototype.text = function() {
			if (0 == arguments.length) {
				var a = b.a.f.get(this.h, "__ko_anon_template__") || {};
				return a.Aa === I && a.ia && (a.Aa = a.ia.innerHTML), a.Aa
			}
			b.a.f.set(this.h, "__ko_anon_template__", {
				Aa: arguments[0]
			})
		}, b.l.h.prototype.nodes = function() {
			return 0 == arguments.length ? (b.a.f.get(this.h, "__ko_anon_template__") || {}).ia : void b.a.f.set(this.h, "__ko_anon_template__", {
				ia: arguments[0]
			})
		}, b.b("templateSources", b.l), b.b("templateSources.domElement", b.l.h), b.b("templateSources.anonymousTemplate", b.l.O);
		var O;
		b.wa = function(a) {
			a != I && !(a instanceof b.v) && j(Error("templateEngine must inherit from ko.templateEngine")), O = a
		}, b.va = function(a, d, c, e, f) {
			if (c = c || {}, (c.templateEngine || O) == I && j(Error("Set a template engine before calling renderTemplate")), f = f || "replaceChildren", e) {
				var g = N(e);
				return b.j(function() {
					var h = d && d instanceof b.z ? d : new b.z(b.a.d(d)),
						k = "function" == typeof a ? a(h.$data, h) : a,
						h = T(e, f, k, h, c);
					"replaceNode" == f && (e = h, g = N(e))
				}, p, {
					Ka: function() {
						return !g || !b.a.X(g)
					},
					W: g && "replaceNode" == f ? g.parentNode : g
				})
			}
			return b.s.ra(function(e) {
				b.va(a, d, c, e, "replaceNode")
			})
		}, b.Mb = function(a, d, c, e, f) {
			function g(a, b) {
				U(b, k), c.afterRender && c.afterRender(b, a)
			}
			function h(d, e) {
				k = f.createChildContext(b.a.d(d), c.as), k.$index = e;
				var g = "function" == typeof a ? a(d, k) : a;
				return T(p, "ignoreTargetNode", g, k, c)
			}
			var k;
			return b.j(function() {
				var a = b.a.d(d) || [];
				"undefined" == typeof a.length && (a = [a]), a = b.a.fa(a, function(a) {
					return c.includeDestroyed || a === I || a === p || !b.a.d(a._destroy)
				}), b.r.K(b.a.$a, p, [e, a, h, c, g])
			}, p, {
				W: e
			})
		}, b.c.template = {
			init: function(a, d) {
				var c = b.a.d(d());
				return "string" == typeof c || c.name || 1 != a.nodeType && 8 != a.nodeType || (c = 1 == a.nodeType ? a.childNodes : b.e.childNodes(a), c = b.a.Hb(c), new b.l.O(a).nodes(c)), {
					controlsDescendantBindings: m
				}
			},
			update: function(a, d, c, e, f) {
				d = b.a.d(d()), c = {}, e = m;
				var g, h = p;
				"string" != typeof d && (c = d, d = c.name, "if" in c && (e = b.a.d(c.
				if)), e && "ifnot" in c && (e = !b.a.d(c.ifnot)), g = b.a.d(c.data)), "foreach" in c ? h = b.Mb(d || a, e && c.foreach || [], c, a, f) : e ? (f = "data" in c ? f.createChildContext(g, c.as) : f, h = b.va(d || a, f, c, a)) : b.e.Y(a), f = h, (g = b.a.f.get(a, "__ko__templateComputedDomDataKey__")) && "function" == typeof g.B && g.B(), b.a.f.set(a, "__ko__templateComputedDomDataKey__", f && f.pa() ? f : I)
			}
		}, b.g.Q.template = function(a) {
			return a = b.g.aa(a), 1 == a.length && a[0].unknown || b.g.Eb(a, "name") ? p : "This template engine does not support anonymous templates nested within its templates"
		}, b.e.I.template = m, b.b("setTemplateEngine", b.wa), b.b("renderTemplate", b.va), b.a.Ja = function(a, b, c) {
			return a = a || [], b = b || [], a.length <= b.length ? S(a, b, "added", "deleted", c) : S(b, a, "deleted", "added", c)
		}, b.b("utils.compareArrays", b.a.Ja), b.a.$a = function(a, d, c, e, f) {
			function g(a, b) {
				t = l[b], w !== b && (z[a] = t), t.na(w++), M(t.M), s.push(t), A.push(t)
			}
			function h(a, c) {
				if (a) for (var d = 0, e = c.length; d < e; d++) c[d] && b.a.o(c[d].M, function(b) {
					a(b, d, c[d].U)
				})
			}
			d = d || [], e = e || {};
			var k = b.a.f.get(a, "setDomNodeChildrenFromArrayMapping_lastMappingResult") === I,
				l = b.a.f.get(a, "setDomNodeChildrenFromArrayMapping_lastMappingResult") || [],
				n = b.a.V(l, function(a) {
					return a.U
				}),
				q = b.a.Ja(n, d),
				s = [],
				v = 0,
				w = 0,
				B = [],
				A = [];
			d = [];
			for (var t, C, E, z = [], n = [], D = 0; C = q[D]; D++) switch (E = C.moved, C.status) {
			case "deleted":
				E === I && (t = l[v], t.j && t.j.B(), B.push.apply(B, M(t.M)), e.beforeRemove && (d[D] = t, A.push(t))), v++;
				break;
			case "retained":
				g(D, v++);
				break;
			case "added":
				E !== I ? g(D, E) : (t = {
					U: C.value,
					na: b.m(w++)
				}, s.push(t), A.push(t), k || (n[D] = t))
			}
			h(e.beforeMove, z), b.a.o(B, e.beforeRemove ? b.A : b.removeNode);
			for (var H, D = 0, k = b.e.firstChild(a); t = A[D]; D++) {
				for (t.M || b.a.extend(t, ha(a, c, t.U, f, t.na)), v = 0; q = t.M[v]; k = q.nextSibling, H = q, v++) q !== k && b.e.Pa(a, q, H);
				!t.Ab && f && (f(t.U, t.M, t.na), t.Ab = m)
			}
			h(e.beforeRemove, d), h(e.afterMove, z), h(e.afterAdd, n), b.a.f.set(a, "setDomNodeChildrenFromArrayMapping_lastMappingResult", s)
		}, b.b("utils.setDomNodeChildrenFromArrayMapping", b.a.$a), b.C = function() {
			this.allowTemplateRewriting = r
		}, b.C.prototype = new b.v, b.C.prototype.renderTemplateSource = function(a) {
			var d = 9 > b.a.Z || !a.nodes ? p : a.nodes();
			return d ? b.a.L(d.cloneNode(m).childNodes) : (a = a.text(), b.a.ta(a))
		}, b.C.oa = new b.C, b.wa(b.C.oa), b.b("nativeTemplateEngine", b.C), b.qa = function() {
			var a = this.Db = function() {
					if ("undefined" == typeof F || !F.tmpl) return 0;
					try {
						if (0 <= F.tmpl.tag.tmpl.open.toString().indexOf("__")) return 2
					} catch (a) {}
					return 1
				}();
			this.renderTemplateSource = function(b, c, e) {
				e = e || {}, 2 > a && j(Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later."));
				var f = b.data("precompiled");
				return f || (f = b.text() || "", f = F.template(p, "{{ko_with $item.koBindingContext}}" + f + "{{/ko_with}}"), b.data("precompiled", f)), b = [c.$data], c = F.extend({
					koBindingContext: c
				}, e.templateOptions), c = F.tmpl(f, b, c), c.appendTo(y.createElement("div")), F.fragments = {}, c
			}, this.createJavaScriptEvaluatorBlock = function(a) {
				return "{{ko_code ((function() { return " + a + " })()) }}"
			}, this.addTemplate = function(a, b) {
				y.write("<script type='text/html' id='" + a + "'>" + b + "</script>")
			}, 0 < a && (F.tmpl.tag.ko_code = {
				open: "__.push($1 || '');"
			}, F.tmpl.tag.ko_with = {
				open: "with($1) {",
				close: "} "
			})
		}, b.qa.prototype = new b.v, w = new b.qa, 0 < w.Db && b.wa(w), b.b("jqueryTmplTemplateEngine", b.qa)
	}
	var m = !0,
		p = null,
		r = !1,
		x = window,
		y = document,
		ga = navigator,
		F = window.jQuery,
		I = void 0;
	"function" == typeof require && "object" == typeof exports && "object" == typeof module ? L(module.exports || exports) : "function" == typeof define && define.amd ? define(["exports"], L) : L(x.ko = {})
}();
!
function($) {
	"use strict";
	var offer = {
		HseOffer: function() {
			var hse = {
				obj: $(this),
				offerId: $(".hdnOfferId", this),
				campaignId: $(".hdnCampaignId", this),
				storeId: $(".hdnStoreId", this),
				storeGroupId: $(".hdnStoreGroupId", this),
				claimbtn: $("a.claim-offer", this),
				slideshow: $(".slideshow", this),
				footer: $("footer", this),
				pagename: $(".hdnPageName", this),
				productname: $(".hdnProductName", this),
				disclaimer: $("footer .disclaimer", this).length ? $("footer .disclaimer", this) : $('<section class="disclaimer bg"></section>'),
				claim: function(e) {
					e.preventDefault(), hse.claimbtn.ajaxLoader();
					var lastActiveOfferIndex = hse.obj.closest("ul").find("section.hse-offer").index(hse.obj);
					return setCookie("lastActiveHSEOfferIndex", lastActiveOfferIndex), ICA.legacy.eventOffer.claim({
						OfferId: hse.offerId ? hse.offerId.val() : 0,
						CampaignId: hse.campaignId ? hse.campaignId.val() : 0,
						StoreId: hse.storeId ? hse.storeId.val() : 0,
						StoreGroupId: hse.storeGroupId ? hse.storeGroupId.val() : 0
					}, hse.success, hse.error), !1
				},
				success: function(data) {
					"success" in data && (data.success ? hse.obj.trigger("refetch") : "message" in data && data.message && (hse.footer.remove(".disclaimer").prepend(hse.disclaimer.html("<p>" + data.message + "</p>")), deleteCookie("lastActiveHSEOfferIndex")))
				},
				error: function() {
					deleteCookie("lastActiveHSEOfferIndex")
				},
				generateFooter: function(controls) {
					hse.slideshow.addClass("footer-generated");
					var controlcontainer = $('<div class="secondary slideshow"></div>').append(controls);
					$('<footer class="split-container"><div class="primary"></div><hr class="splitter dotted" /></footer>').append(controlcontainer).appendTo(hse.obj)
				},
				init: function() {
					if (hse.slideshow && !hse.slideshow.hasClass("footer-generated")) {
						var controls = $(".controls", hse.slideshow);
						controls.length ? hse.generateFooter(controls) : hse.slideshow.on("slideshow-loaded", function() {
							hse.generateFooter($(".controls", this))
						})
					}
					hse.claimbtn && hse.claimbtn.on("click", hse.claim)
				}
			};
			return hse.init()
		},
		AddToShoppinglist: function() {
			var $clickedOffer = $("#offer_" + $(".hdnOfferId", this).val()),
				list = {
					obj: $(this),
					offerId: $(".hdnOfferId", this).val(),
					articleGroupId: $(".hdnArticleGroupId", this).val(),
					articleGroupIdExtended: $(".hdnArticleGroupIdExtended", this).val(),
					productName: $(".hdnProductName", this).val(),
					storeId: $(".hdnStoreId", this).val(),
					newListField: $("fieldset.addlist", this),
					newListInput: $("fieldset.addlist input", this),
					newbtn: $("footer .new-shoppinglist", this),
					lists: $("li a.add", this),
					isPersonalOffer: !! $clickedOffer.closest("#personalOffers").length,
					offerValue: $clickedOffer.find(".price, .item-price").first().text().trim(),
					addToList: function(listId, title) {
						ICA.legacy.shoppingList.addOffer({
							productName: list.productName,
							offerId: list.offerId,
							articleGroupId: list.articleGroupId,
							articleGroupIdExtended: list.articleGroupIdExtended,
							storeId: list.storeId,
							shoppingListId: listId,
							shoppingListName: title ? title : ""
						}, list.success, list.error), dataLayer.push({
							event: "offer-add-to-grocerylist",
							addOffer: {
								product: list.productName,
								offerType: list.offerValue,
								offerLevel: list.isPersonalOffer ? "Personligt" : "Centralt"
							}
						})
					},
					newList: function() {
						return list.obj.addClass("new"), list.newListField.on("submit", function(e, params) {
							var title = "newlist" in params && params.newlist ? params.newlist : list.newListInput.attr("placeholder");
							list.addToList(0, title)
						}), !1
					},
					success: function(data) {
						"success" in data && data.success && ("message" in data && data.message && list.obj.html("<strong>" + data.message + "</strong>"), list.obj.trigger("success"))
					},
					error: function(msg) {
						window.log(msg), list.obj.trigger("refetch"), setTimeout(function() {
							list.obj.trigger("close")
						}, 800)
					},
					init: function() {
						list.newbtn.on("click", list.newList), list.lists.on("click", function() {
							var listid = $(this).data("listid") ? $(this).data("listid") : 0;
							return list.addToList(listid), !1
						})
					}
				};
			return list.init()
		},
		initDom: function(container) {
			$(".hse-offer-wrapper.knocked-out .hse-offer", container).create(offer.HseOffer), $(".add-offer-to-shoppinglist", container).create(offer.AddToShoppinglist)
		}
	};
	$(function() {
		$(window).on("initDom", function(e) {
			offer.initDom(e.target)
		})
	})
}(jQuery);
var ICA = ICA || {};
ICA.Components = ICA.Components || {}, ICA.Components.LoadMoreList = function() {
	var loadmorelist = {
		obj: $(this),
		list: $(">ul, >.list", this),
		items: $(">ul>li, >.list>dl", this),
		pagesize: $(this).data("pagesize") ? $(this).data("pagesize") : 8,
		morebtn: $('<a href="javascript:;" class="loadmorelist-button">' + ($(this).data("linktext") ? $(this).data("linktext") : "Visa fler") + "</a>"),
		showall: !! $(this).data("showall"),
		showmore: function() {
			var lastVisible = loadmorelist.items.filter(":visible").last(),
				lastVisibleIndex = loadmorelist.items.index(lastVisible);
			loadmorelist.items.slice(lastVisibleIndex, lastVisibleIndex + (+loadmorelist.showall ? loadmorelist.items.length - lastVisibleIndex : loadmorelist.pagesize) + 1).show();
			var visibleItemCount = loadmorelist.items.filter(":visible").length,
				totalItemCount = loadmorelist.items.length;
			visibleItemCount === totalItemCount && loadmorelist.morebtn.hide(), loadmorelist.list.find("li:visible").find("img").trigger("appear")
		},
		click: function(e) {
			e.preventDefault(), loadmorelist.showmore()
		},
		init: function() {
			return loadmorelist.obj.addClass("loadmorelist-loaded"), loadmorelist.items.slice(loadmorelist.pagesize).hide(), loadmorelist.items.length > loadmorelist.pagesize && loadmorelist.morebtn.insertAfter(loadmorelist.list), loadmorelist.morebtn.on("click", loadmorelist.click), this
		}
	};
	if (!$(this).hasClass("loadmorelist-loaded")) return loadmorelist.init()
};
var ICA = ICA || {};
!
function($, window, document, ICA, undefined) {
	ICA.icaCallbacks = function() {
		function _icaCallbacks() {
			var context = ($(document), this),
				paralaxTopDataAttr = "parallax-top-value",
				notAllowedParallaxElements = "source, .noParallax";
			context.$parallaxContainers = $(".parallax"), context.initOffsetOverride = "initalOffsetCorrection";
			return context.publicCallback = function() {}, context.isElementInViewport = function(el) {
				var r, html;
				return !(!el || 1 !== el.nodeType) && (html = document.documentElement, r = el.getBoundingClientRect(), !! r && r.bottom >= 0 && r.right >= 0 && r.top <= html.clientHeight && r.left <= html.clientWidth)
			}, context.inViewportActions = function() {
				$(".overthrow").each(function() {
					var $this = $(this);
					withinViewport($this.get(0), "bottom") ? $this.addClass("inViewport") : $this.removeClass("inViewport")
				}), $("video.header-video").each(function() {
					var $this = $(this);
					withinViewport($this.closest("header").get(0), "top") ? $this.get(0).play() : $this.get(0).pause()
				})
			}, $(window).on("scrollstop.isElementInViewport", context.inViewportActions), context.placeHolder = function() {
				function supports_input_placeholder() {
					var i = document.createElement("input");
					return "placeholder" in i
				}
				if (!supports_input_placeholder()) for (var fields = document.querySelectorAll("INPUT, TEXTAREA"), i = 0; i < fields.length; i++) fields[i].hasAttribute("placeholder") && (fields[i].defaultValue = fields[i].getAttribute("placeholder"), "" == fields[i].value && (fields[i].value = fields[i].defaultValue), fields[i].onfocus = function() {
					this.value == this.defaultValue && (this.value = "")
				}, fields[i].onblur = function() {
					"" == this.value && (this.value = this.defaultValue)
				})
			}, context.getHashStringFromUrl = function(url) {
				var hashValue = null,
					location = url ? url : window.location.href;
				return location.indexOf("#s=") !== -1 && (location = location.split("#s=")[1], /^\s*$/.test(location) === !1 && (hashValue = location)), hashValue
			}, context.parallaxScrolling = function() {
				if (ICA.config.isScrollingParallax) {
					if (scrollTop = window.scrollY || window.pageYOffset, ICA.recipePage && ICA.recipePage.releaseHeaderOnContentEnd && ICA.recipePage.releaseHeaderOnContentEnd(), !ICA.config.parallax.enableForTouchDevices && (ICA.fn.isTouchDevice() || ICA.fn.isMobileDevice()) || $("html").hasClass("ie9") || $("html").hasClass("safari")) return void(ICA.config.isScrollingParallax = !1);
					if (!ICA.config.isScrollingParallax) return void requestAnimationFrame(context.parallaxScrolling);
					context.$parallaxContainers.each(function() {
						var parallaxRatio = "undefined" != typeof $(this).data("parallax-ratio") ? $(this).data("parallax-ratio") : ICA.config.parallax.parallaxRatio,
							parallaxBlur = "undefined" != typeof $(this).data("parallax-blur") ? $(this).data("parallax-blur") : ICA.config.parallax.parallaxBlur,
							parallaxOpacity = "undefined" != typeof $(this).data("parallax-opacity") ? $(this).data("parallax-opacity") : ICA.config.parallax.parallaxOpacity,
							parallaxParent = $(this).data("parallax-parent") ? $(this).data("parallax-parent") : "",
							parallaxStandalone = !! $(this).data("parallax-standalone"),
							$srcParent = $(this),
							$srcElement = parallaxStandalone ? $(this) : $(this).find(">*:not(" + notAllowedParallaxElements + ")"),
							$parent = "" != parallaxParent ? $(parallaxParent) : $srcParent;
						if ($element = "" != parallaxParent ? $(parallaxParent).find(">*:not(" + notAllowedParallaxElements + ")") : $srcElement, !$parent.length || !$element.length || !$srcElement.length) return void console.log("Method: context.parallaxScrolling. Error: Check you selectors and data attributes. Found no elements.");
						var initTop = $parent.data("initOffset") && $parent.data("initOffset") >= 0 ? $parent.data("initOffset") : 0;
						if (parallaxBlur > 0 && (blur = scrollTop > initTop ? (scrollTop - initTop) / $parent.outerHeight() * parallaxBlur : 0), parallaxRatio > 0 && (parallaxTop = scrollTop > initTop ? Math.ceil((scrollTop - initTop) * parallaxRatio) : 0, $element.hasClass("continuous") && (parallaxTop = Math.ceil(parallaxTop + (scrollTop - $element.data("thresholdScrollTop"))))), parallaxOpacity > 0 && (opacity = scrollTop > initTop ? (scrollTop - initTop) / $parent.outerHeight() * parallaxOpacity : 0), parallaxRatio > 0 && $parent.offset().top + $parent.outerHeight() < scrollTop) return ICA.config.isScrollingParallax = !1, void requestAnimationFrame(context.parallaxScrolling);
						if (parallaxRatio > 0 && $srcElement.data(paralaxTopDataAttr) != parallaxTop) {
							var translatePercents = ICA.fn.getOriginalTranslateInPercent($srcElement);
							parallaxTopPercent = Math.round(parallaxTop / $srcElement.outerHeight() * 1e4) / 100, $srcElement.css({
								"-webkit-transform": "translateX(" + translatePercents.x + "%) translateY(" + (translatePercents.y + parallaxTopPercent) + "%) translateZ(0)",
								"-ms-transform": "translateX(" + translatePercents.x + "%) translateY(" + (translatePercents.y + parallaxTopPercent) + "%)",
								transform: "translateX(" + translatePercents.x + "%) translateY(" + (translatePercents.y + parallaxTopPercent) + "%) translateZ(0)"
							}).data(paralaxTopDataAttr, parallaxTop)
						}
						parallaxOpacity > 0 && opacity <= 1 && $srcElement.css({
							opacity: 1 - opacity
						})
					}), ICA.config.isScrollingParallax = !1
				}
				requestAnimationFrame(context.parallaxScrolling)
			}, context.initiateParallax = function() {
				context.$parallaxContainers.length > 0 && ($(window).off("scroll.parallax, touchmove.parallax").on("scroll.parallax, touchmove.parallax", function() {
					ICA.config.isScrollingParallax = !0
				}), requestAnimationFrame(context.parallaxScrolling))
			}, context.updateParallaxContainer = function() {
				context.$parallaxContainers = $(".parallax"), context.$parallaxContainers.length > 0 && context.initiateParallax()
			}, context.parallaxInitalOffset = function() {
				context.$parallaxContainers.each(function() {
					var $element = $(this).find(">*:not(" + notAllowedParallaxElements + ")").first(),
						$parent = $(this),
						_c = $element.data(context.initOffsetOverride) ? $element.data(context.initOffsetOverride) : -1,
						offsetTop = _c >= 0 ? _c + parseInt($parent.css("marginTop")) + parseInt($element.css("marginTop")) : $parent.offset().top,
						parallaxTop = $(this).data(paralaxTopDataAttr) ? $(this).data(paralaxTopDataAttr) : 0;
					$(this).data("initOffset", offsetTop - parallaxTop)
				})
			}, context.getHoverDirection = function(args, callback) {
				var hoverDirection = {
					$nodes: $(".hover-direction"),
					init: function() {
						hoverDirection.attachEvents()
					},
					attachEvents: function() {
						hoverDirection.$nodes.each(function() {
							$(this).data("originalClass", $(this).attr("class")), $(this).on("mouseenter.hoverDirection", function(e) {
								hoverDirection.addClass(e, $(this), "in")
							}), $(this).on("mouseleave.hoverDirection", function(e) {
								hoverDirection.addClass(e, $(this), "out")
							})
						})
					},
					getDirection: function(ev, obj) {
						var w = obj.outerWidth(),
							h = obj.outerHeight(),
							x = ev.pageX - obj.offset().left - w / 2 * (w > h ? h / w : 1),
							y = ev.pageY - obj.offset().top - h / 2 * (h > w ? w / h : 1),
							d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
						return d
					},
					addClass: function(e, obj, state) {
						var direction = hoverDirection.getDirection(e, obj),
							class_suffix = "";
						switch (obj.attr("class", ""), direction) {
						case 0:
							class_suffix = "-top";
							break;
						case 1:
							class_suffix = "-right";
							break;
						case 2:
							class_suffix = "-bottom";
							break;
						case 3:
							class_suffix = "-left"
						}
						obj.addClass(obj.data("originalClass") + " " + state + class_suffix)
					}
				};
				if (hoverDirection.$nodes.length > 0) return hoverDirection.init()
			}, context.initUnslider = function(config) {
				$(ICA.config.imageSlider.imageSliderClass).each(function() {
					var _$this = $(this),
						settings = "undefined" != typeof config ? config : ICA.config.imageSlider.unsliderSettings,
						userSettings = $(this).data(),
						slides = $(this).find(">ul>li");
					if (_$this.hasClass("parallax") && (userSettings.onloadcallback = context.parallaxInitalOffset()), settings = $.extend(settings, userSettings), $(this).unslider(settings), slides.length > 1) if (ICA.fn.isTouchDevice()) $(this).removeClass("parallax");
					else {
						var $spanPrev = $("<span/>").attr("class", "sprite1"),
							$spanNext = $("<span/>").attr("class", "sprite1"),
							$container = $("<div/>").addClass("unslider-controls"),
							$arrPrev = $("<div/>").addClass(ICA.config.imageSlider.buttonClass + " prev").html($spanPrev).data("slider", $(this)),
							$arrNext = $("<div/>").addClass(ICA.config.imageSlider.buttonClass + " next").html($spanNext).data("slider", $(this));
						ICA.eventTarget.off("click.imageSliderPrev").on("click.imageSliderPrev", "." + ICA.config.imageSlider.buttonClass, function(e) {
							var unslider = $(this).data("slider"),
								fn = this.className.split(" ")[1];
							unslider.data("unslider")[fn]()
						}), $("." + ICA.config.imageSlider.buttonClass + "-prev-wrapper")[0] ? $("." + ICA.config.imageSlider.buttonClass + "-prev-wrapper").replaceWith($arrPrev) : $container.append($arrPrev), $("." + ICA.config.imageSlider.buttonClass + "-next-wrapper")[0] ? $("." + ICA.config.imageSlider.buttonClass + "-next-wrapper").replaceWith($arrNext) : $container.append($arrNext), $container.children().length > 0 && (slides.first().find("picture").hasClass("parallax") && !$("#page").hasClass("large-recipe-page") && $container.addClass("parallax").data({
							"parallax-ratio": "0.5",
							"parallax-opacity": "1"
						}), $(this).append($container))
					}
					context.updateParallaxContainer(), setTimeout(function() {
						ICA.eventTarget.trigger("unsliderLoaded"), _$this.find("." + ICA.config.parallax.parallaxClass)[0] && (context.parallaxInitalOffset(), ICA.eventTarget.trigger("updateRecipeHeaderParallaxRatio"))
					}, 0)
				})
			}, context.attachLazyLoadEvent = function() {
				$(".lazyhide").not(".lazyhide-active").css("visibility", "visible").addClass("lazyhide-active"), $(".lazyloading img, .lazyloaded img, .lazyloading video, .lazyloaded video").each(function() {
					context.removeLazyHide($(this))
				})
			}, context.removeLazyHide = function(obj) {
				if ($(this).closest(".image-slider").length > 0 && !$(this).closest("li").is(":first-child")) return void console.log("return");
				if ($(this).is("img") && $(this).parent().prev().is("video") || $(this).is("video")) return void console.log("return");
				var $lazyHide = obj.closest(".lazyhide");
				$lazyHide.addClass("lazyhideFadeOut"), setTimeout(function() {
					$lazyHide.removeClass("lazyhide lazyhideFadeOut lazyhide-active").css("visibility", "").find(".lazy-spinner").remove()
				}, 500)
			}, context.truncate = function() {
				$(".trunk8").length > 0 && $(".trunk8").each(function() {
					var getTrunk8Property = function(prop) {
							return $(this).data("trunk-" + prop)
						}.bind(this);
					$(this).trunk8({
						lines: getTrunk8Property("lines"),
						fill: getTrunk8Property("fill"),
						tooltip: getTrunk8Property("tooltip")
					})
				})
			}, context.activateMovingContent = function() {
				$("video.header-video").each(function() {
					var $videoEl = $(this);
					$videoEl.hasClass("not-muted") || ($videoEl.muted && ($videoEl.muted = !0), $videoEl.muted && ($videoEl.volume = 0)), $(window).checkSize("desktop") ? $(this).find("source").each(function() {
						var videoUrl = $(this).data("src");
						$(this).attr("src", videoUrl)
					}).promise().done(function() {
						$videoEl.addClass("video-loaded"), setTimeout(function() {
							$videoEl.attr("style", "").load()
						}, 0)
					}) : $videoEl.parent().is(".moving-content") ? $videoEl.parent().remove() : $(this).remove()
				}).on("loadedmetadata", function(e) {
					$(window).resize()
				}).on("canplaythrough", function(e) {
					context.removeLazyHide($(e.target))
				})
			}, context.initSliderTracking = function($slider) {
				ICA.eventTarget.on("unsliderLoaded", function() {
					ICA.eventTarget.one("unsliderSlideLoaded", function() {
						var $unslider = $slider.data("unslider"),
							info = getCarouselInfo($slider),
							startIndex = info.carouselIndex,
							hasLooped = !1,
							oldComplete = $unslider.o.complete;
						icadatalayer.add("carouselRun", info), $unslider.o.complete = function(el) {
							var info = getCarouselInfo($slider);
							return hasLooped = hasLooped || info.carouselIndex === startIndex, hasLooped && "Klick" !== info.carouselTrigger || icadatalayer.add("carouselRun", info), oldComplete.apply(this, arguments)
						}
					})
				});
				var getCarouselInfo = function($slider) {
						var $activeSlide = $slider.find(".active"),
							$unslider = $slider.data("unslider");
						return {
							carouselIndex: $unslider.i,
							carouselTrigger: void 0 === $unslider.t ? "Klick" : "Visning",
							carouselHeadline: $activeSlide.find("h1").text().replace(/\s+/g, " ").trim(),
							carouselSection: $("#page-wrapper").data("masterpage-type")
						}
					}
			}, context.initPuffTracking = function() {
				$(".top-puff").on("click", function(evt) {
					var info = getPuffInfo($(this));
					icadatalayer.add("puffClick", info)
				});
				var getPuffInfo = function($puff) {
						return {
							puffUrl: $puff.find("a").attr("href"),
							puffHeadline: $puff.find("h3").text()
						}
					}
			}, context.throttle = function(type, name, obj) {
				obj = obj || window;
				var running = !1,
					func = function() {
						running || (running = !0, requestAnimationFrame(function() {
							obj.dispatchEvent(new CustomEvent(name)), running = !1
						}))
					};
				obj.addEventListener(type, func)
			}, context
		}
		return new _icaCallbacks
	}()
}(jQuery, this, this.document, ICA);
!
function($) {
	$(window).on("initDom", function(e) {
		$(".login-v2", e.target).off("click.loginv2").on("click.loginv2", function(e) {
			function gotoLoginPage() {
				var anchor = $($(e.target).attr("data-loginurl") ? e.target : e.currentTarget),
					currentHref = anchor.attr("data-loginurl"),
					islocal = anchor.attr("data-islocal"),
					returnUrl = currentHref.indexOf("?") != -1 ? "&" : "?",
					currentLocation = location.href;
				void 0 != islocal && "False" == islocal && (currentLocation = currentLocation.replace("http:", "https:")), returnUrl = returnUrl + "returnurl=" + encodeURIComponent(currentLocation);
				var newHref = currentHref + returnUrl;
				setTimeout(function() {
					window.location.href = newHref
				}, 100)
			}
			function showErrorMessage(data) {
				if (data.message || data.Text) {
					window.triggerAsModal("<div>" + (data.message ? "<h2>" + data.message + "</h2>" : "") + data.Text + '<div class="button action">Ok</div></div>', "login-message");
					var $loginModal = $(".modalbox.login-message");
					$(".button.action", $loginModal).off("click").on("click", function() {
						$(".closebtn", $loginModal).click()
					})
				}
			}
			e.preventDefault();
			var executeMe = $(this).data("execute-before-login-redirect");
			"function" == typeof executeMe && executeMe(), $.ajax({
				url: "/Login/Handlers/LoginAuthentication.ashx",
				type: "POST",
				cache: !1,
				dataType: "json",
				data: {
					CommandName: "IsLoginActive"
				},
				success: function(data) {
					data.success ? gotoLoginPage() : showErrorMessage(data)
				},
				error: function() {
					gotoLoginPage()
				}
			})
		})
	}), $(document).ready(function() {
		function focusInput(el) {
			/iPad|iPhone|iPod/g.test(navigator.userAgent) || setTimeout(function() {
				el.focus()
			}, 0)
		}
		var $passwordTab = $(".password-tab"),
			$createAccountLink = $(".create-account-link"),
			$getMobileBankIdLink = $(".get-mobile-bank-id-link"),
			$loginSupportBankIdLink = $(".login-support-bank-id-link"),
			$loginSupportPasswordLink = $(".login-support-password-link"),
			$mobileBankIdTab = $(".mobile-bank-id-tab"),
			$personalNumberPassword = $(".personalNumberPassword"),
			$personalNumberBankId = $(".personalNumberBankId");
		$passwordTab.on("tab-activated", function() {
			focusInput($personalNumberPassword), $createAccountLink.removeClass("hidden"), $getMobileBankIdLink.addClass("hidden"), $loginSupportPasswordLink.removeClass("hidden"), $loginSupportBankIdLink.addClass("hidden")
		}), $mobileBankIdTab.on("tab-activated", function() {
			focusInput($personalNumberBankId), $createAccountLink.addClass("hidden"), $getMobileBankIdLink.removeClass("hidden"), $loginSupportPasswordLink.addClass("hidden"), $loginSupportBankIdLink.removeClass("hidden")
		})
	})
}(jQuery);
$(document).ready(function() {
	"use strict";
	function authenticateUser(personalNumber) {
		return $.ajax({
			url: "/Templates/General/Handlers/Authentication.ashx",
			type: "POST",
			cache: !1,
			dataType: "json",
			data: {
				CommandName: "BankIdAuthenticate",
				Arg0: JSON.stringify({
					PersonalNumber: personalNumber
				})
			}
		})
	}
	function checkBankIdStatus(requestId) {
		return $.ajax({
			url: "/Templates/General/Handlers/Authentication.ashx",
			type: "POST",
			cache: !1,
			dataType: "json",
			data: {
				CommandName: "BankIdCollect",
				Arg0: JSON.stringify({
					RequestId: requestId,
					RememberMe: "false"
				})
			}
		})
	}
	function handleBankIdStatus(requestId) {
		return function(data) {
			if ("COMPLETE" === data.Status) {
				var returnUrl = getReturnUrl() || "/";
				return void(location.href = returnUrl)
			}
			return "ERROR" !== data.Status ? ("USER_SIGN" === data.Status ? showLoading() : "NO_CLIENT" === data.Status && showNoClient(), void setTimeout(function() {
				poll(requestId)
			}, 1e3)) : void handleBankIdError(data)
		}
	}
	function poll(requestId) {
		checkBankIdStatus(requestId).then(handleBankIdStatus(requestId))
	}
	function handleBankIdError(data) {
		return "NOT_VALID_FOR_LOGIN" === data.FaultCode ? (showStepOne(), void showNotBankCustomerBankIdError()) : "NOT_A_CUSTOMER" === data.FaultCode ? void showSignUpPanel() : "USER_CANCEL" === data.FaultCode ? void showStepCancel() : void handleGeneralBankIdError(data)
	}
	function showGeneralBankIdError(data) {
		$generalBankIdError.text(data.Message), $generalBankIdError.removeClass("hidden")
	}
	function showNotBankCustomerBankIdError() {
		$notBankCustomerBankIdError.removeClass("hidden")
	}
	function handleGeneralBankIdError(data) {
		showStepOne(), showGeneralBankIdError(data)
	}
	function showStepOne() {
		$showuserCanceled.addClass("hidden"), $showLogginInView.addClass("hidden"), $loginMobileBankIdStepTwo.addClass("hidden"), $loginMobileBankIdStepOne.removeClass("hidden").trigger("done"), $showNoClientView.addClass("hidden")
	}
	function showStepCancel() {
		$showuserCanceled.removeClass("hidden"), $showLogginInView.addClass("hidden"), $loginMobileBankIdStepTwo.addClass("hidden"), $loginMobileBankIdStepOne.addClass("hidden"), $showNoClientView.addClass("hidden")
	}
	function showLoading() {
		$showuserCanceled.addClass("hidden"), $showLogginInView.removeClass("hidden"), $loginMobileBankIdStepOne.addClass("hidden"), $showNoClientView.addClass("hidden"), $loginMobileBankIdStepTwo.addClass("hidden")
	}
	function showNoClient() {
		$showuserCanceled.addClass("hidden"), $showLogginInView.addClass("hidden"), $loginMobileBankIdStepOne.addClass("hidden"), $loginMobileBankIdStepTwo.addClass("hidden"), $showNoClientView.removeClass("hidden")
	}
	function showStepTwo() {
		$allBankIdErrors.addClass("hidden"), $loginMobileBankIdStepOne.addClass("hidden"), $loginMobileBankIdStepTwo.removeClass("hidden")
	}
	function showSignUpPanel() {
		$main.addClass("hidden"), $noAccount.removeClass("hidden")
	}
	function resetToInitialState() {
		$loginInputs.val(""), showStepOne(), $noAccount.addClass("hidden"), $main.removeClass("hidden")
	}
	function getReturnUrl() {
		var result, regex = new RegExp("[\\?&]returnurl=([^&#]*)"),
			results = regex.exec(location.search);
		return result = null === results ? "" : results[1].replace(/\+/g, " "), isHex(result) ? result = hexDecode(result) : (result = decodeURIComponent(result), result.match(/^https?%/) && (result = decodeURIComponent(result))), result
	}
	function isHex(value) {
		return value.length > 0 && value.match(/^[0-9A-F]*$/gim)
	}
	function hexDecode(hex) {
		for (var str = "", i = 0; i < hex.length; i += 2) str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
		return str
	}
	var $personalNumberBankId = $(".personalNumberBankId"),
		$loginMobileBankIdCancelButton = $(".login__mobile-bank-id__cancel-button"),
		$loginMobileBankIdStepTwo = $(".login__mobile-bank-id__step-2"),
		$loginMobileBankIdStepOne = $(".login__mobile-bank-id__step-1"),
		$allBankIdErrors = $(".login__mobile-bank-id__error"),
		$launchAppButton = $(".login__mobile-bank-id__launch-app-button"),
		$generalBankIdError = $(".login__mobile-bank-id__general-error"),
		$notBankCustomerBankIdError = $(".login__mobile-bank-id__not-bank-customer-error"),
		$main = $("#content"),
		$noAccount = $("#no-account"),
		$noAccountChangeUserLink = $(".no-account__change-user"),
		$loginInputs = $(".personalNumberBankId, .personalNumberPassword, .passwordPassword"),
		$showLogginInView = $(".login__mobile-bank-id__logging-in"),
		$showuserCanceled = $(".login__mobile-bank-id__user-canceled"),
		$reloadButton = $(".login__mobile-bank-id__user-canceled-reload"),
		$showNoClientView = $(".login__mobile-bank-id__no-client");
	$loginMobileBankIdCancelButton.on("click", function() {
		window.location.reload()
	}), $noAccountChangeUserLink.on("click", resetToInitialState), $launchAppButton.on("click", function() {
		showLoading()
	}), $loginMobileBankIdStepOne.on("ajaxsubmit", function(e) {
		showStepTwo(), authenticateUser($personalNumberBankId.val()).then(function(data) {
			if ("ERROR" === data.Status) return $.Deferred().reject(data).promise();
			var link = $launchAppButton[0];
			if (link) {
				var location = window.location.href,
					urlBuildingBlocks = location.match(/^([^#]*)(#.*)?$/);
				link.href = "bankid:///", $("html").hasClass("android") ? link.href += "?redirect=null" : link.href += "?redirect=" + encodeURIComponent(urlBuildingBlocks[1] + "#")
			}
			return data.RequestId
		}).then(poll).then(null, handleBankIdError)
	}), $reloadButton.on("click", function() {
		window.location.reload()
	})
});
!
function($) {
	"use strict";
	function getValueFromCookie() {
		var informationData = ICA.legacy.getCookie("InformationModal"),
			value = "";
		return "undefined" != typeof informationData && null != informationData && (value = JSON.parse(informationData)), value
	}
	function getValueFromId() {
		return $("#informationid").val()
	}
	function isUrlPatternValid() {
		return $("#informationid").data("valid-url")
	}
	function setIdToCookie(valueFromId, valuesFromCookie) {
		if (!("" == valueFromId || jQuery.inArray(valueFromId, valuesFromCookie) >= 0)) {
			var valuesToSave = [];
			0 != valuesFromCookie.length && valuesToSave.push.apply(valuesToSave, valuesFromCookie), valuesToSave.push(valueFromId), ICA.legacy.setCookie("InformationModal", JSON.stringify(valuesToSave), 100)
		}
	}
	function imageIsPresent(daModal) {
		daModal.find("#store-show-information-image").height();
		return daModal.find("#store-show-information-image").height() > 50
	}
	function setNewPaddingForLargeImage(daModal) {
		var isLarge = daModal.find(".large-image-container").length > 0;
		isLarge && daModal.find(".modalcontent").css({
			padding: "10px",
			paddingBottom: "2px"
		})
	}
	function calculateModalTop(daModal) {
		imageIsPresent(daModal) && (daModal.find(".keepSizeAtLoad").removeClass("keepSizeAtLoad"), daModal.find(".keepSizeAtLoadSmall").removeClass("keepSizeAtLoadSmall"));
		var modalheight = daModal.height(),
			vph = $(window).height(),
			calculatedHeight = (vph - modalheight) / 2;
		daModal.css({
			top: calculatedHeight.toString() + "px"
		}), daModal.find(".keepSizeAtLoad").removeClass("keepSizeAtLoad"), daModal.find(".keepSizeAtLoadSmall").removeClass("keepSizeAtLoadSmall")
	}
	function showInformation(valueFromID, valuesFromCookie) {
		ICA.legacy.get("/Templates/ajaxresponse.aspx?ajaxFunction=InformationModalView", null, function(data) {
			var $content = $(data),
				isNotValid = $content.find("#DontShowInformationModal").length > 0;
			if (!isNotValid && 0 != $content.length) {
				$content.find(".primary").prepend($content.find(".form-companion")), window.triggerAsModal($content, "store-show-information");
				var daModal = $(".modalbox.store-show-information");
				daModal.trigger("initDom"), calculateModalTop(daModal), setNewPaddingForLargeImage(daModal), setIdToCookie(valueFromID, valuesFromCookie)
			}
		})
	}
	$(document).ready(function() {
		var valuesFromCookie = getValueFromCookie(),
			valueFromID = getValueFromId(),
			urlPatternValid = isUrlPatternValid();
		urlPatternValid && jQuery.inArray(valueFromID, valuesFromCookie) < 0 && showInformation(valueFromID, valuesFromCookie)
	})
}(jQuery);
var ICA = ICA || {};
!
function($, window, document, ICA, undefined) {
	ICA.subscribeNewsLetter = function() {
		function _newsletter() {
			var context = ($(document), this),
				$subscribeButton = $(".subscribe-btn"),
				$newsletterWrapper = $(".newsletterSubscribe-wrapper"),
				$form = $newsletterWrapper.find(".xform"),
				$inputFieldSubscribe = $(".newsletterSubscribe-wrapper input"),
				$subscribeNewsLetterContainer = $(".subscribe-newsletter-container"),
				$successSubscribeNewsletter = $(".success-subscribe-newsletter"),
				$duplicatedEmailValue = $("#dublicatedEmail"),
				$genericFailMessage = $("#genericFailMessage");
			context.init = function() {
				initAttachEvents(), disableEnableButtonSubscribe()
			};
			var initAttachEvents = function() {
					$form.on("formvalidated", function() {
						subcribeNewsLetter()
					}), $inputFieldSubscribe.on("keyup", disableEnableButtonSubscribe)
				},
				subcribeNewsLetter = function() {
					var subscribeDataObj = {
						Email: $inputFieldSubscribe.val()
					};
					$.ajax({
						type: "POST",
						url: "/SubscribeNewsLetter/Services/AddToSubscribeNewsLetterList/",
						data: JSON.stringify(subscribeDataObj),
						dataType: "json",
						cache: !1,
						contentType: "application/json",
						success: onSuccess,
						error: onError
					})
				},
				disableEnableButtonSubscribe = function() {
					$inputFieldSubscribe.length > 0 && $inputFieldSubscribe.val().length > 0 ? $subscribeButton.prop("disabled", !1) : $subscribeButton.prop("disabled", !0)
				},
				onSuccess = function(data) {
					var duplicateEmailMessage = $duplicatedEmailValue.val(),
						genericFailMessage = $genericFailMessage.val();
					data.success ? ($subscribeNewsLetterContainer.hide(), $successSubscribeNewsletter.show()) : triggerModal("duplicated" == data.type ? duplicateEmailMessage : genericFailMessage)
				},
				onError = function(jqXHR, textStatus, errorThrown) {
					console.log(textStatus + " " + errorThrown)
				},
				triggerModal = function(message) {
					var modal = new ICA.Components.Modal;
					modal.removeOnClose = !0, modal.content.html(message), modal.open()
				};
			return context
		}
		return new _newsletter
	}()
}(jQuery, this, this.document, ICA), $(function() {
	$("#aspnetForm") && ICA.subscribeNewsLetter.init()
});
!
function(root, factory) {
	"object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define([], factory) : "object" == typeof exports ? exports.Handlebars = factory() : root.Handlebars = factory()
}(this, function() {
	return function(modules) {
		function __webpack_require__(moduleId) {
			if (installedModules[moduleId]) return installedModules[moduleId].exports;
			var module = installedModules[moduleId] = {
				exports: {},
				id: moduleId,
				loaded: !1
			};
			return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), module.loaded = !0, module.exports
		}
		var installedModules = {};
		return __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.p = "", __webpack_require__(0)
	}([function(module, exports, __webpack_require__) {
		"use strict";
		function create() {
			var hb = _create();
			return hb.compile = function(input, options) {
				return _handlebarsCompilerCompiler.compile(input, options, hb)
			}, hb.precompile = function(input, options) {
				return _handlebarsCompilerCompiler.precompile(input, options, hb)
			}, hb.AST = _handlebarsCompilerAst2.
		default, hb.Compiler = _handlebarsCompilerCompiler.Compiler, hb.JavaScriptCompiler = _handlebarsCompilerJavascriptCompiler2.
		default, hb.Parser = _handlebarsCompilerBase.parser, hb.parse = _handlebarsCompilerBase.parse, hb
		}
		var _interopRequireDefault = __webpack_require__(1).
	default;
		exports.__esModule = !0;
		var _handlebarsRuntime = __webpack_require__(2),
			_handlebarsRuntime2 = _interopRequireDefault(_handlebarsRuntime),
			_handlebarsCompilerAst = __webpack_require__(21),
			_handlebarsCompilerAst2 = _interopRequireDefault(_handlebarsCompilerAst),
			_handlebarsCompilerBase = __webpack_require__(22),
			_handlebarsCompilerCompiler = __webpack_require__(27),
			_handlebarsCompilerJavascriptCompiler = __webpack_require__(28),
			_handlebarsCompilerJavascriptCompiler2 = _interopRequireDefault(_handlebarsCompilerJavascriptCompiler),
			_handlebarsCompilerVisitor = __webpack_require__(25),
			_handlebarsCompilerVisitor2 = _interopRequireDefault(_handlebarsCompilerVisitor),
			_handlebarsNoConflict = __webpack_require__(20),
			_handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict),
			_create = _handlebarsRuntime2.
		default.create,
			inst = create();
		inst.create = create, _handlebarsNoConflict2.
	default (inst), inst.Visitor = _handlebarsCompilerVisitor2.
	default, inst.
	default = inst, exports.
	default = inst, module.exports = exports.
	default
	}, function(module, exports) {
		"use strict";
		exports.
	default = function(obj) {
			return obj && obj.__esModule ? obj : {
			default:
				obj
			}
		}, exports.__esModule = !0
	}, function(module, exports, __webpack_require__) {
		"use strict";
		function create() {
			var hb = new base.HandlebarsEnvironment;
			return Utils.extend(hb, base), hb.SafeString = _handlebarsSafeString2.
		default, hb.Exception = _handlebarsException2.
		default, hb.Utils = Utils, hb.escapeExpression = Utils.escapeExpression, hb.VM = runtime, hb.template = function(spec) {
				return runtime.template(spec, hb)
			}, hb
		}
		var _interopRequireWildcard = __webpack_require__(3).
	default,
			_interopRequireDefault = __webpack_require__(1).
		default;
		exports.__esModule = !0;
		var _handlebarsBase = __webpack_require__(4),
			base = _interopRequireWildcard(_handlebarsBase),
			_handlebarsSafeString = __webpack_require__(18),
			_handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString),
			_handlebarsException = __webpack_require__(6),
			_handlebarsException2 = _interopRequireDefault(_handlebarsException),
			_handlebarsUtils = __webpack_require__(5),
			Utils = _interopRequireWildcard(_handlebarsUtils),
			_handlebarsRuntime = __webpack_require__(19),
			runtime = _interopRequireWildcard(_handlebarsRuntime),
			_handlebarsNoConflict = __webpack_require__(20),
			_handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict),
			inst = create();
		inst.create = create, _handlebarsNoConflict2.
	default (inst), inst.
	default = inst, exports.
	default = inst, module.exports = exports.
	default
	}, function(module, exports) {
		"use strict";
		exports.
	default = function(obj) {
			if (obj && obj.__esModule) return obj;
			var newObj = {};
			if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
			return newObj.
		default = obj, newObj
		}, exports.__esModule = !0
	}, function(module, exports, __webpack_require__) {
		"use strict";
		function HandlebarsEnvironment(helpers, partials, decorators) {
			this.helpers = helpers || {}, this.partials = partials || {}, this.decorators = decorators || {}, _helpers.registerDefaultHelpers(this), _decorators.registerDefaultDecorators(this)
		}
		var _interopRequireDefault = __webpack_require__(1).
	default;
		exports.__esModule = !0, exports.HandlebarsEnvironment = HandlebarsEnvironment;
		var _utils = __webpack_require__(5),
			_exception = __webpack_require__(6),
			_exception2 = _interopRequireDefault(_exception),
			_helpers = __webpack_require__(7),
			_decorators = __webpack_require__(15),
			_logger = __webpack_require__(17),
			_logger2 = _interopRequireDefault(_logger),
			VERSION = "4.0.5";
		exports.VERSION = VERSION;
		var COMPILER_REVISION = 7;
		exports.COMPILER_REVISION = COMPILER_REVISION;
		var REVISION_CHANGES = {
			1: "<= 1.0.rc.2",
			2: "== 1.0.0-rc.3",
			3: "== 1.0.0-rc.4",
			4: "== 1.x.x",
			5: "== 2.0.0-alpha.x",
			6: ">= 2.0.0-beta.1",
			7: ">= 4.0.0"
		};
		exports.REVISION_CHANGES = REVISION_CHANGES;
		var objectType = "[object Object]";
		HandlebarsEnvironment.prototype = {
			constructor: HandlebarsEnvironment,
			logger: _logger2.
		default,
			log:
			_logger2.
		default.log,
			registerHelper:

			function(name, fn) {
				if (_utils.toString.call(name) === objectType) {
					if (fn) throw new _exception2.
				default ("Arg not supported with multiple helpers");
					_utils.extend(this.helpers, name)
				} else this.helpers[name] = fn
			},
			unregisterHelper: function(name) {
				delete this.helpers[name]
			},
			registerPartial: function(name, partial) {
				if (_utils.toString.call(name) === objectType) _utils.extend(this.partials, name);
				else {
					if ("undefined" == typeof partial) throw new _exception2.
				default ('Attempting to register a partial called "' + name + '" as undefined');
					this.partials[name] = partial
				}
			},
			unregisterPartial: function(name) {
				delete this.partials[name]
			},
			registerDecorator: function(name, fn) {
				if (_utils.toString.call(name) === objectType) {
					if (fn) throw new _exception2.
				default ("Arg not supported with multiple decorators");
					_utils.extend(this.decorators, name)
				} else this.decorators[name] = fn
			},
			unregisterDecorator: function(name) {
				delete this.decorators[name]
			}
		};
		var log = _logger2.
	default.log;
		exports.log = log, exports.createFrame = _utils.createFrame, exports.logger = _logger2.
	default
	}, function(module, exports) {
		"use strict";
		function escapeChar(chr) {
			return escape[chr]
		}
		function extend(obj) {
			for (var i = 1; i < arguments.length; i++) for (var key in arguments[i]) Object.prototype.hasOwnProperty.call(arguments[i], key) && (obj[key] = arguments[i][key]);
			return obj
		}
		function indexOf(array, value) {
			for (var i = 0, len = array.length; i < len; i++) if (array[i] === value) return i;
			return -1
		}
		function escapeExpression(string) {
			if ("string" != typeof string) {
				if (string && string.toHTML) return string.toHTML();
				if (null == string) return "";
				if (!string) return string + "";
				string = "" + string
			}
			return possible.test(string) ? string.replace(badChars, escapeChar) : string
		}
		function isEmpty(value) {
			return !value && 0 !== value || !(!isArray(value) || 0 !== value.length)
		}
		function createFrame(object) {
			var frame = extend({}, object);
			return frame._parent = object, frame
		}
		function blockParams(params, ids) {
			return params.path = ids, params
		}
		function appendContextPath(contextPath, id) {
			return (contextPath ? contextPath + "." : "") + id
		}
		exports.__esModule = !0, exports.extend = extend, exports.indexOf = indexOf, exports.escapeExpression = escapeExpression, exports.isEmpty = isEmpty, exports.createFrame = createFrame, exports.blockParams = blockParams, exports.appendContextPath = appendContextPath;
		var escape = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#x27;",
			"`": "&#x60;",
			"=": "&#x3D;"
		},
			badChars = /[&<>"'`=]/g,
			possible = /[&<>"'`=]/,
			toString = Object.prototype.toString;
		exports.toString = toString;
		var isFunction = function(value) {
				return "function" == typeof value
			};
		isFunction(/x/) && (exports.isFunction = isFunction = function(value) {
			return "function" == typeof value && "[object Function]" === toString.call(value)
		}), exports.isFunction = isFunction;
		var isArray = Array.isArray ||
		function(value) {
			return !(!value || "object" != typeof value) && "[object Array]" === toString.call(value)
		};
		exports.isArray = isArray
	}, function(module, exports) {
		"use strict";
		function Exception(message, node) {
			var loc = node && node.loc,
				line = void 0,
				column = void 0;
			loc && (line = loc.start.line, column = loc.start.column, message += " - " + line + ":" + column);
			for (var tmp = Error.prototype.constructor.call(this, message), idx = 0; idx < errorProps.length; idx++) this[errorProps[idx]] = tmp[errorProps[idx]];
			Error.captureStackTrace && Error.captureStackTrace(this, Exception), loc && (this.lineNumber = line, this.column = column)
		}
		exports.__esModule = !0;
		var errorProps = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
		Exception.prototype = new Error, exports.
	default = Exception, module.exports = exports.
	default
	}, function(module, exports, __webpack_require__) {
		"use strict";
		function registerDefaultHelpers(instance) {
			_helpersBlockHelperMissing2.
		default (instance), _helpersEach2.
		default (instance), _helpersHelperMissing2.
		default (instance), _helpersIf2.
		default (instance), _helpersLog2.
		default (instance), _helpersLookup2.
		default (instance), _helpersWith2.
		default (instance)
		}
		var _interopRequireDefault = __webpack_require__(1).
	default;
		exports.__esModule = !0, exports.registerDefaultHelpers = registerDefaultHelpers;
		var _helpersBlockHelperMissing = __webpack_require__(8),
			_helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing),
			_helpersEach = __webpack_require__(9),
			_helpersEach2 = _interopRequireDefault(_helpersEach),
			_helpersHelperMissing = __webpack_require__(10),
			_helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing),
			_helpersIf = __webpack_require__(11),
			_helpersIf2 = _interopRequireDefault(_helpersIf),
			_helpersLog = __webpack_require__(12),
			_helpersLog2 = _interopRequireDefault(_helpersLog),
			_helpersLookup = __webpack_require__(13),
			_helpersLookup2 = _interopRequireDefault(_helpersLookup),
			_helpersWith = __webpack_require__(14),
			_helpersWith2 = _interopRequireDefault(_helpersWith)
	}, function(module, exports, __webpack_require__) {
		"use strict";
		exports.__esModule = !0;
		var _utils = __webpack_require__(5);
		exports.
	default = function(instance) {
			instance.registerHelper("blockHelperMissing", function(context, options) {
				var inverse = options.inverse,
					fn = options.fn;
				if (context === !0) return fn(this);
				if (context === !1 || null == context) return inverse(this);
				if (_utils.isArray(context)) return context.length > 0 ? (options.ids && (options.ids = [options.name]), instance.helpers.each(context, options)) : inverse(this);
				if (options.data && options.ids) {
					var data = _utils.createFrame(options.data);
					data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name), options = {
						data: data
					}
				}
				return fn(context, options)
			})
		}, module.exports = exports.
	default
	}, function(module, exports, __webpack_require__) {
		"use strict";
		var _interopRequireDefault = __webpack_require__(1).
	default;
		exports.__esModule = !0;
		var _utils = __webpack_require__(5),
			_exception = __webpack_require__(6),
			_exception2 = _interopRequireDefault(_exception);
		exports.
	default = function(instance) {
			instance.registerHelper("each", function(context, options) {
				function execIteration(field, index, last) {
					data && (data.key = field, data.index = index, data.first = 0 === index, data.last = !! last, contextPath && (data.contextPath = contextPath + field)), ret += fn(context[field], {
						data: data,
						blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
					})
				}
				if (!options) throw new _exception2.
			default ("Must pass iterator to #each");
				var fn = options.fn,
					inverse = options.inverse,
					i = 0,
					ret = "",
					data = void 0,
					contextPath = void 0;
				if (options.data && options.ids && (contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + "."), _utils.isFunction(context) && (context = context.call(this)), options.data && (data = _utils.createFrame(options.data)), context && "object" == typeof context) if (_utils.isArray(context)) for (var j = context.length; i < j; i++) i in context && execIteration(i, i, i === context.length - 1);
				else {
					var priorKey = void 0;
					for (var key in context) context.hasOwnProperty(key) && (void 0 !== priorKey && execIteration(priorKey, i - 1), priorKey = key, i++);
					void 0 !== priorKey && execIteration(priorKey, i - 1, !0)
				}
				return 0 === i && (ret = inverse(this)), ret
			})
		}, module.exports = exports.
	default
	}, function(module, exports, __webpack_require__) {
		"use strict";
		var _interopRequireDefault = __webpack_require__(1).
	default;
		exports.__esModule = !0;
		var _exception = __webpack_require__(6),
			_exception2 = _interopRequireDefault(_exception);
		exports.
	default = function(instance) {
			instance.registerHelper("helperMissing", function() {
				if (1 !== arguments.length) throw new _exception2.
			default ('Missing helper: "' + arguments[arguments.length - 1].name + '"')
			})
		}, module.exports = exports.
	default
	}, function(module, exports, __webpack_require__) {
		"use strict";
		exports.__esModule = !0;
		var _utils = __webpack_require__(5);
		exports.
	default = function(instance) {
			instance.registerHelper("if", function(conditional, options) {
				return _utils.isFunction(conditional) && (conditional = conditional.call(this)), !options.hash.includeZero && !conditional || _utils.isEmpty(conditional) ? options.inverse(this) : options.fn(this)
			}), instance.registerHelper("unless", function(conditional, options) {
				return instance.helpers.
				if.call(this, conditional, {
					fn: options.inverse,
					inverse: options.fn,
					hash: options.hash
				})
			})
		}, module.exports = exports.
	default
	}, function(module, exports) {
		"use strict";
		exports.__esModule = !0, exports.
	default = function(instance) {
			instance.registerHelper("log", function() {
				for (var args = [void 0], options = arguments[arguments.length - 1], i = 0; i < arguments.length - 1; i++) args.push(arguments[i]);
				var level = 1;
				null != options.hash.level ? level = options.hash.level : options.data && null != options.data.level && (level = options.data.level), args[0] = level, instance.log.apply(instance, args)
			})
		}, module.exports = exports.
	default
	}, function(module, exports) {
		"use strict";
		exports.__esModule = !0, exports.
	default = function(instance) {
			instance.registerHelper("lookup", function(obj, field) {
				return obj && obj[field]
			})
		}, module.exports = exports.
	default
	}, function(module, exports, __webpack_require__) {
		"use strict";
		exports.__esModule = !0;
		var _utils = __webpack_require__(5);
		exports.
	default = function(instance) {
			instance.registerHelper("with", function(context, options) {
				_utils.isFunction(context) && (context = context.call(this));
				var fn = options.fn;
				if (_utils.isEmpty(context)) return options.inverse(this);
				var data = options.data;
				return options.data && options.ids && (data = _utils.createFrame(options.data), data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0])), fn(context, {
					data: data,
					blockParams: _utils.blockParams([context], [data && data.contextPath])
				})
			})
		}, module.exports = exports.
	default
	}, function(module, exports, __webpack_require__) {
		"use strict";
		function registerDefaultDecorators(instance) {
			_decoratorsInline2.
		default (instance)
		}
		var _interopRequireDefault = __webpack_require__(1).
	default;
		exports.__esModule = !0, exports.registerDefaultDecorators = registerDefaultDecorators;
		var _decoratorsInline = __webpack_require__(16),
			_decoratorsInline2 = _interopRequireDefault(_decoratorsInline)
	}, function(module, exports, __webpack_require__) {
		"use strict";
		exports.__esModule = !0;
		var _utils = __webpack_require__(5);
		exports.
	default = function(instance) {
			instance.registerDecorator("inline", function(fn, props, container, options) {
				var ret = fn;
				return props.partials || (props.partials = {}, ret = function(context, options) {
					var original = container.partials;
					container.partials = _utils.extend({}, original, props.partials);
					var ret = fn(context, options);
					return container.partials = original, ret
				}), props.partials[options.args[0]] = options.fn, ret
			})
		}, module.exports = exports.
	default
	}, function(module, exports, __webpack_require__) {
		"use strict";
		exports.__esModule = !0;
		var _utils = __webpack_require__(5),
			logger = {
				methodMap: ["debug", "info", "warn", "error"],
				level: "info",
				lookupLevel: function(level) {
					if ("string" == typeof level) {
						var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
						level = levelMap >= 0 ? levelMap : parseInt(level, 10)
					}
					return level
				},
				log: function(level) {
					if (level = logger.lookupLevel(level), "undefined" != typeof console && logger.lookupLevel(logger.level) <= level) {
						var method = logger.methodMap[level];
						console[method] || (method = "log");
						for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) message[_key - 1] = arguments[_key];
						console[method].apply(console, message)
					}
				}
			};
		exports.
	default = logger, module.exports = exports.
	default
	}, function(module, exports) {
		"use strict";
		function SafeString(string) {
			this.string = string
		}
		exports.__esModule = !0, SafeString.prototype.toString = SafeString.prototype.toHTML = function() {
			return "" + this.string
		}, exports.
	default = SafeString, module.exports = exports.
	default
	}, function(module, exports, __webpack_require__) {
		"use strict";
		function checkRevision(compilerInfo) {
			var compilerRevision = compilerInfo && compilerInfo[0] || 1,
				currentRevision = _base.COMPILER_REVISION;
			if (compilerRevision !== currentRevision) {
				if (compilerRevision < currentRevision) {
					var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
						compilerVersions = _base.REVISION_CHANGES[compilerRevision];
					throw new _exception2.
				default ("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + runtimeVersions + ") or downgrade your runtime to an older version (" + compilerVersions + ").")
				}
				throw new _exception2.
			default ("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + compilerInfo[1] + ").")
			}
		}
		function template(templateSpec, env) {
			function invokePartialWrapper(partial, context, options) {
				options.hash && (context = Utils.extend({}, context, options.hash), options.ids && (options.ids[0] = !0)), partial = env.VM.resolvePartial.call(this, partial, context, options);
				var result = env.VM.invokePartial.call(this, partial, context, options);
				if (null == result && env.compile && (options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env), result = options.partials[options.name](context, options)), null != result) {
					if (options.indent) {
						for (var lines = result.split("\n"), i = 0, l = lines.length; i < l && (lines[i] || i + 1 !== l); i++) lines[i] = options.indent + lines[i];
						result = lines.join("\n")
					}
					return result
				}
				throw new _exception2.
			default ("The partial " + options.name + " could not be compiled when running in runtime-only mode")
			}
			function ret(context) {
				function main(context) {
					return "" + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths)
				}
				var options = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
					data = options.data;
				ret._setup(options), !options.partial && templateSpec.useData && (data = initData(context, data));
				var depths = void 0,
					blockParams = templateSpec.useBlockParams ? [] : void 0;
				return templateSpec.useDepths && (depths = options.depths ? context !== options.depths[0] ? [context].concat(options.depths) : options.depths : [context]), (main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams))(context, options)
			}
			if (!env) throw new _exception2.
		default ("No environment passed to template");
			if (!templateSpec || !templateSpec.main) throw new _exception2.
		default ("Unknown template object: " + typeof templateSpec);
			templateSpec.main.decorator = templateSpec.main_d, env.VM.checkRevision(templateSpec.compiler);
			var container = {
				strict: function(obj, name) {
					if (!(name in obj)) throw new _exception2.
				default ('"' + name + '" not defined in ' + obj);
					return obj[name]
				},
				lookup: function(depths, name) {
					for (var len = depths.length, i = 0; i < len; i++) if (depths[i] && null != depths[i][name]) return depths[i][name]
				},
				lambda: function(current, context) {
					return "function" == typeof current ? current.call(context) : current
				},
				escapeExpression: Utils.escapeExpression,
				invokePartial: invokePartialWrapper,
				fn: function(i) {
					var ret = templateSpec[i];
					return ret.decorator = templateSpec[i + "_d"], ret
				},
				programs: [],
				program: function(i, data, declaredBlockParams, blockParams, depths) {
					var programWrapper = this.programs[i],
						fn = this.fn(i);
					return data || depths || blockParams || declaredBlockParams ? programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths) : programWrapper || (programWrapper = this.programs[i] = wrapProgram(this, i, fn)), programWrapper
				},
				data: function(value, depth) {
					for (; value && depth--;) value = value._parent;
					return value
				},
				merge: function(param, common) {
					var obj = param || common;
					return param && common && param !== common && (obj = Utils.extend({}, common, param)), obj
				},
				noop: env.VM.noop,
				compilerInfo: templateSpec.compiler
			};
			return ret.isTop = !0, ret._setup = function(options) {
				options.partial ? (container.helpers = options.helpers, container.partials = options.partials, container.decorators = options.decorators) : (container.helpers = container.merge(options.helpers, env.helpers), templateSpec.usePartial && (container.partials = container.merge(options.partials, env.partials)), (templateSpec.usePartial || templateSpec.useDecorators) && (container.decorators = container.merge(options.decorators, env.decorators)))
			}, ret._child = function(i, data, blockParams, depths) {
				if (templateSpec.useBlockParams && !blockParams) throw new _exception2.
			default ("must pass block params");
				if (templateSpec.useDepths && !depths) throw new _exception2.
			default ("must pass parent depths");
				return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths)
			}, ret
		}
		function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
			function prog(context) {
				var options = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
					currentDepths = depths;
				return depths && context !== depths[0] && (currentDepths = [context].concat(depths)), fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths)
			}
			return prog = executeDecorators(fn, prog, container, depths, data, blockParams), prog.program = i, prog.depth = depths ? depths.length : 0, prog.blockParams = declaredBlockParams || 0, prog
		}
		function resolvePartial(partial, context, options) {
			return partial ? partial.call || options.name || (options.name = partial, partial = options.partials[partial]) : partial = "@partial-block" === options.name ? options.data["partial-block"] : options.partials[options.name], partial
		}
		function invokePartial(partial, context, options) {
			options.partial = !0, options.ids && (options.data.contextPath = options.ids[0] || options.data.contextPath);
			var partialBlock = void 0;
			if (options.fn && options.fn !== noop && (options.data = _base.createFrame(options.data), partialBlock = options.data["partial-block"] = options.fn, partialBlock.partials && (options.partials = Utils.extend({}, options.partials, partialBlock.partials))), void 0 === partial && partialBlock && (partial = partialBlock), void 0 === partial) throw new _exception2.
		default ("The partial " + options.name + " could not be found");
			if (partial instanceof Function) return partial(context, options)
		}
		function noop() {
			return ""
		}
		function initData(context, data) {
			return data && "root" in data || (data = data ? _base.createFrame(data) : {}, data.root = context), data
		}
		function executeDecorators(fn, prog, container, depths, data, blockParams) {
			if (fn.decorator) {
				var props = {};
				prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths), Utils.extend(prog, props)
			}
			return prog
		}
		var _interopRequireWildcard = __webpack_require__(3).
	default,
			_interopRequireDefault = __webpack_require__(1).
		default;
		exports.__esModule = !0, exports.checkRevision = checkRevision, exports.template = template, exports.wrapProgram = wrapProgram, exports.resolvePartial = resolvePartial, exports.invokePartial = invokePartial, exports.noop = noop;
		var _utils = __webpack_require__(5),
			Utils = _interopRequireWildcard(_utils),
			_exception = __webpack_require__(6),
			_exception2 = _interopRequireDefault(_exception),
			_base = __webpack_require__(4)
	}, function(module, exports) {
		(function(global) {
			"use strict";
			exports.__esModule = !0, exports.
		default = function(Handlebars) {
				var root = "undefined" != typeof global ? global : window,
					$Handlebars = root.Handlebars;
				Handlebars.noConflict = function() {
					return root.Handlebars === Handlebars && (root.Handlebars = $Handlebars), Handlebars
				}
			}, module.exports = exports.
		default
		}).call(exports, function() {
			return this
		}())
	}, function(module, exports) {
		"use strict";
		exports.__esModule = !0;
		var AST = {
			helpers: {
				helperExpression: function(node) {
					return "SubExpression" === node.type || ("MustacheStatement" === node.type || "BlockStatement" === node.type) && !! (node.params && node.params.length || node.hash)
				},
				scopedId: function(path) {
					return /^\.|this\b/.test(path.original)
				},
				simpleId: function(path) {
					return 1 === path.parts.length && !AST.helpers.scopedId(path) && !path.depth
				}
			}
		};
		exports.
	default = AST, module.exports = exports.
	default
	}, function(module, exports, __webpack_require__) {
		"use strict";
		function parse(input, options) {
			if ("Program" === input.type) return input;
			_parser2.
		default.yy = yy, yy.locInfo = function(locInfo) {
				return new yy.SourceLocation(options && options.srcName, locInfo)
			};
			var strip = new _whitespaceControl2.
		default (options);
			return strip.accept(_parser2.
		default.parse(input))
		}
		var _interopRequireDefault = __webpack_require__(1).
	default,
			_interopRequireWildcard = __webpack_require__(3).
		default;
		exports.__esModule = !0, exports.parse = parse;
		var _parser = __webpack_require__(23),
			_parser2 = _interopRequireDefault(_parser),
			_whitespaceControl = __webpack_require__(24),
			_whitespaceControl2 = _interopRequireDefault(_whitespaceControl),
			_helpers = __webpack_require__(26),
			Helpers = _interopRequireWildcard(_helpers),
			_utils = __webpack_require__(5);
		exports.parser = _parser2.
	default;
		var yy = {};
		_utils.extend(yy, Helpers)
	}, function(module, exports) {
		"use strict";
		var handlebars = function() {
				function Parser() {
					this.yy = {}
				}
				var parser = {
					trace: function() {},
					yy: {},
					symbols_: {
						error: 2,
						root: 3,
						program: 4,
						EOF: 5,
						program_repetition0: 6,
						statement: 7,
						mustache: 8,
						block: 9,
						rawBlock: 10,
						partial: 11,
						partialBlock: 12,
						content: 13,
						COMMENT: 14,
						CONTENT: 15,
						openRawBlock: 16,
						rawBlock_repetition_plus0: 17,
						END_RAW_BLOCK: 18,
						OPEN_RAW_BLOCK: 19,
						helperName: 20,
						openRawBlock_repetition0: 21,
						openRawBlock_option0: 22,
						CLOSE_RAW_BLOCK: 23,
						openBlock: 24,
						block_option0: 25,
						closeBlock: 26,
						openInverse: 27,
						block_option1: 28,
						OPEN_BLOCK: 29,
						openBlock_repetition0: 30,
						openBlock_option0: 31,
						openBlock_option1: 32,
						CLOSE: 33,
						OPEN_INVERSE: 34,
						openInverse_repetition0: 35,
						openInverse_option0: 36,
						openInverse_option1: 37,
						openInverseChain: 38,
						OPEN_INVERSE_CHAIN: 39,
						openInverseChain_repetition0: 40,
						openInverseChain_option0: 41,
						openInverseChain_option1: 42,
						inverseAndProgram: 43,
						INVERSE: 44,
						inverseChain: 45,
						inverseChain_option0: 46,
						OPEN_ENDBLOCK: 47,
						OPEN: 48,
						mustache_repetition0: 49,
						mustache_option0: 50,
						OPEN_UNESCAPED: 51,
						mustache_repetition1: 52,
						mustache_option1: 53,
						CLOSE_UNESCAPED: 54,
						OPEN_PARTIAL: 55,
						partialName: 56,
						partial_repetition0: 57,
						partial_option0: 58,
						openPartialBlock: 59,
						OPEN_PARTIAL_BLOCK: 60,
						openPartialBlock_repetition0: 61,
						openPartialBlock_option0: 62,
						param: 63,
						sexpr: 64,
						OPEN_SEXPR: 65,
						sexpr_repetition0: 66,
						sexpr_option0: 67,
						CLOSE_SEXPR: 68,
						hash: 69,
						hash_repetition_plus0: 70,
						hashSegment: 71,
						ID: 72,
						EQUALS: 73,
						blockParams: 74,
						OPEN_BLOCK_PARAMS: 75,
						blockParams_repetition_plus0: 76,
						CLOSE_BLOCK_PARAMS: 77,
						path: 78,
						dataName: 79,
						STRING: 80,
						NUMBER: 81,
						BOOLEAN: 82,
						UNDEFINED: 83,
						NULL: 84,
						DATA: 85,
						pathSegments: 86,
						SEP: 87,
						$accept: 0,
						$end: 1
					},
					terminals_: {
						2: "error",
						5: "EOF",
						14: "COMMENT",
						15: "CONTENT",
						18: "END_RAW_BLOCK",
						19: "OPEN_RAW_BLOCK",
						23: "CLOSE_RAW_BLOCK",
						29: "OPEN_BLOCK",
						33: "CLOSE",
						34: "OPEN_INVERSE",
						39: "OPEN_INVERSE_CHAIN",
						44: "INVERSE",
						47: "OPEN_ENDBLOCK",
						48: "OPEN",
						51: "OPEN_UNESCAPED",
						54: "CLOSE_UNESCAPED",
						55: "OPEN_PARTIAL",
						60: "OPEN_PARTIAL_BLOCK",
						65: "OPEN_SEXPR",
						68: "CLOSE_SEXPR",
						72: "ID",
						73: "EQUALS",
						75: "OPEN_BLOCK_PARAMS",
						77: "CLOSE_BLOCK_PARAMS",
						80: "STRING",
						81: "NUMBER",
						82: "BOOLEAN",
						83: "UNDEFINED",
						84: "NULL",
						85: "DATA",
						87: "SEP"
					},
					productions_: [0, [3, 2],
						[4, 1],
						[7, 1],
						[7, 1],
						[7, 1],
						[7, 1],
						[7, 1],
						[7, 1],
						[7, 1],
						[13, 1],
						[10, 3],
						[16, 5],
						[9, 4],
						[9, 4],
						[24, 6],
						[27, 6],
						[38, 6],
						[43, 2],
						[45, 3],
						[45, 1],
						[26, 3],
						[8, 5],
						[8, 5],
						[11, 5],
						[12, 3],
						[59, 5],
						[63, 1],
						[63, 1],
						[64, 5],
						[69, 1],
						[71, 3],
						[74, 3],
						[20, 1],
						[20, 1],
						[20, 1],
						[20, 1],
						[20, 1],
						[20, 1],
						[20, 1],
						[56, 1],
						[56, 1],
						[79, 2],
						[78, 1],
						[86, 3],
						[86, 1],
						[6, 0],
						[6, 2],
						[17, 1],
						[17, 2],
						[21, 0],
						[21, 2],
						[22, 0],
						[22, 1],
						[25, 0],
						[25, 1],
						[28, 0],
						[28, 1],
						[30, 0],
						[30, 2],
						[31, 0],
						[31, 1],
						[32, 0],
						[32, 1],
						[35, 0],
						[35, 2],
						[36, 0],
						[36, 1],
						[37, 0],
						[37, 1],
						[40, 0],
						[40, 2],
						[41, 0],
						[41, 1],
						[42, 0],
						[42, 1],
						[46, 0],
						[46, 1],
						[49, 0],
						[49, 2],
						[50, 0],
						[50, 1],
						[52, 0],
						[52, 2],
						[53, 0],
						[53, 1],
						[57, 0],
						[57, 2],
						[58, 0],
						[58, 1],
						[61, 0],
						[61, 2],
						[62, 0],
						[62, 1],
						[66, 0],
						[66, 2],
						[67, 0],
						[67, 1],
						[70, 1],
						[70, 2],
						[76, 1],
						[76, 2]
					],
					performAction: function(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
						var $0 = $$.length - 1;
						switch (yystate) {
						case 1:
							return $$[$0 - 1];
						case 2:
							this.$ = yy.prepareProgram($$[$0]);
							break;
						case 3:
							this.$ = $$[$0];
							break;
						case 4:
							this.$ = $$[$0];
							break;
						case 5:
							this.$ = $$[$0];
							break;
						case 6:
							this.$ = $$[$0];
							break;
						case 7:
							this.$ = $$[$0];
							break;
						case 8:
							this.$ = $$[$0];
							break;
						case 9:
							this.$ = {
								type: "CommentStatement",
								value: yy.stripComment($$[$0]),
								strip: yy.stripFlags($$[$0], $$[$0]),
								loc: yy.locInfo(this._$)
							};
							break;
						case 10:
							this.$ = {
								type: "ContentStatement",
								original: $$[$0],
								value: $$[$0],
								loc: yy.locInfo(this._$)
							};
							break;
						case 11:
							this.$ = yy.prepareRawBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
							break;
						case 12:
							this.$ = {
								path: $$[$0 - 3],
								params: $$[$0 - 2],
								hash: $$[$0 - 1]
							};
							break;
						case 13:
							this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], !1, this._$);
							break;
						case 14:
							this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], !0, this._$);
							break;
						case 15:
							this.$ = {
								open: $$[$0 - 5],
								path: $$[$0 - 4],
								params: $$[$0 - 3],
								hash: $$[$0 - 2],
								blockParams: $$[$0 - 1],
								strip: yy.stripFlags($$[$0 - 5], $$[$0])
							};
							break;
						case 16:
							this.$ = {
								path: $$[$0 - 4],
								params: $$[$0 - 3],
								hash: $$[$0 - 2],
								blockParams: $$[$0 - 1],
								strip: yy.stripFlags($$[$0 - 5], $$[$0])
							};
							break;
						case 17:
							this.$ = {
								path: $$[$0 - 4],
								params: $$[$0 - 3],
								hash: $$[$0 - 2],
								blockParams: $$[$0 - 1],
								strip: yy.stripFlags($$[$0 - 5], $$[$0])
							};
							break;
						case 18:
							this.$ = {
								strip: yy.stripFlags($$[$0 - 1], $$[$0 - 1]),
								program: $$[$0]
							};
							break;
						case 19:
							var inverse = yy.prepareBlock($$[$0 - 2], $$[$0 - 1], $$[$0], $$[$0], !1, this._$),
								program = yy.prepareProgram([inverse], $$[$0 - 1].loc);
							program.chained = !0, this.$ = {
								strip: $$[$0 - 2].strip,
								program: program,
								chain: !0
							};
							break;
						case 20:
							this.$ = $$[$0];
							break;
						case 21:
							this.$ = {
								path: $$[$0 - 1],
								strip: yy.stripFlags($$[$0 - 2], $$[$0])
							};
							break;
						case 22:
							this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
							break;
						case 23:
							this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
							break;
						case 24:
							this.$ = {
								type: "PartialStatement",
								name: $$[$0 - 3],
								params: $$[$0 - 2],
								hash: $$[$0 - 1],
								indent: "",
								strip: yy.stripFlags($$[$0 - 4], $$[$0]),
								loc: yy.locInfo(this._$)
							};
							break;
						case 25:
							this.$ = yy.preparePartialBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
							break;
						case 26:
							this.$ = {
								path: $$[$0 - 3],
								params: $$[$0 - 2],
								hash: $$[$0 - 1],
								strip: yy.stripFlags($$[$0 - 4], $$[$0])
							};
							break;
						case 27:
							this.$ = $$[$0];
							break;
						case 28:
							this.$ = $$[$0];
							break;
						case 29:
							this.$ = {
								type: "SubExpression",
								path: $$[$0 - 3],
								params: $$[$0 - 2],
								hash: $$[$0 - 1],
								loc: yy.locInfo(this._$)
							};
							break;
						case 30:
							this.$ = {
								type: "Hash",
								pairs: $$[$0],
								loc: yy.locInfo(this._$)
							};
							break;
						case 31:
							this.$ = {
								type: "HashPair",
								key: yy.id($$[$0 - 2]),
								value: $$[$0],
								loc: yy.locInfo(this._$)
							};
							break;
						case 32:
							this.$ = yy.id($$[$0 - 1]);
							break;
						case 33:
							this.$ = $$[$0];
							break;
						case 34:
							this.$ = $$[$0];
							break;
						case 35:
							this.$ = {
								type: "StringLiteral",
								value: $$[$0],
								original: $$[$0],
								loc: yy.locInfo(this._$)
							};
							break;
						case 36:
							this.$ = {
								type: "NumberLiteral",
								value: Number($$[$0]),
								original: Number($$[$0]),
								loc: yy.locInfo(this._$)
							};
							break;
						case 37:
							this.$ = {
								type: "BooleanLiteral",
								value: "true" === $$[$0],
								original: "true" === $$[$0],
								loc: yy.locInfo(this._$)
							};
							break;
						case 38:
							this.$ = {
								type: "UndefinedLiteral",
								original: void 0,
								value: void 0,
								loc: yy.locInfo(this._$)
							};
							break;
						case 39:
							this.$ = {
								type: "NullLiteral",
								original: null,
								value: null,
								loc: yy.locInfo(this._$)
							};
							break;
						case 40:
							this.$ = $$[$0];
							break;
						case 41:
							this.$ = $$[$0];
							break;
						case 42:
							this.$ = yy.preparePath(!0, $$[$0], this._$);
							break;
						case 43:
							this.$ = yy.preparePath(!1, $$[$0], this._$);
							break;
						case 44:
							$$[$0 - 2].push({
								part: yy.id($$[$0]),
								original: $$[$0],
								separator: $$[$0 - 1]
							}), this.$ = $$[$0 - 2];
							break;
						case 45:
							this.$ = [{
								part: yy.id($$[$0]),
								original: $$[$0]
							}];
							break;
						case 46:
							this.$ = [];
							break;
						case 47:
							$$[$0 - 1].push($$[$0]);
							break;
						case 48:
							this.$ = [$$[$0]];
							break;
						case 49:
							$$[$0 - 1].push($$[$0]);
							break;
						case 50:
							this.$ = [];
							break;
						case 51:
							$$[$0 - 1].push($$[$0]);
							break;
						case 58:
							this.$ = [];
							break;
						case 59:
							$$[$0 - 1].push($$[$0]);
							break;
						case 64:
							this.$ = [];
							break;
						case 65:
							$$[$0 - 1].push($$[$0]);
							break;
						case 70:
							this.$ = [];
							break;
						case 71:
							$$[$0 - 1].push($$[$0]);
							break;
						case 78:
							this.$ = [];
							break;
						case 79:
							$$[$0 - 1].push($$[$0]);
							break;
						case 82:
							this.$ = [];
							break;
						case 83:
							$$[$0 - 1].push($$[$0]);
							break;
						case 86:
							this.$ = [];
							break;
						case 87:
							$$[$0 - 1].push($$[$0]);
							break;
						case 90:
							this.$ = [];
							break;
						case 91:
							$$[$0 - 1].push($$[$0]);
							break;
						case 94:
							this.$ = [];
							break;
						case 95:
							$$[$0 - 1].push($$[$0]);
							break;
						case 98:
							this.$ = [$$[$0]];
							break;
						case 99:
							$$[$0 - 1].push($$[$0]);
							break;
						case 100:
							this.$ = [$$[$0]];
							break;
						case 101:
							$$[$0 - 1].push($$[$0])
						}
					},
					table: [{
						3: 1,
						4: 2,
						5: [2, 46],
						6: 3,
						14: [2, 46],
						15: [2, 46],
						19: [2, 46],
						29: [2, 46],
						34: [2, 46],
						48: [2, 46],
						51: [2, 46],
						55: [2, 46],
						60: [2, 46]
					}, {
						1: [3]
					}, {
						5: [1, 4]
					}, {
						5: [2, 2],
						7: 5,
						8: 6,
						9: 7,
						10: 8,
						11: 9,
						12: 10,
						13: 11,
						14: [1, 12],
						15: [1, 20],
						16: 17,
						19: [1, 23],
						24: 15,
						27: 16,
						29: [1, 21],
						34: [1, 22],
						39: [2, 2],
						44: [2, 2],
						47: [2, 2],
						48: [1, 13],
						51: [1, 14],
						55: [1, 18],
						59: 19,
						60: [1, 24]
					}, {
						1: [2, 1]
					}, {
						5: [2, 47],
						14: [2, 47],
						15: [2, 47],
						19: [2, 47],
						29: [2, 47],
						34: [2, 47],
						39: [2, 47],
						44: [2, 47],
						47: [2, 47],
						48: [2, 47],
						51: [2, 47],
						55: [2, 47],
						60: [2, 47]
					}, {
						5: [2, 3],
						14: [2, 3],
						15: [2, 3],
						19: [2, 3],
						29: [2, 3],
						34: [2, 3],
						39: [2, 3],
						44: [2, 3],
						47: [2, 3],
						48: [2, 3],
						51: [2, 3],
						55: [2, 3],
						60: [2, 3]
					}, {
						5: [2, 4],
						14: [2, 4],
						15: [2, 4],
						19: [2, 4],
						29: [2, 4],
						34: [2, 4],
						39: [2, 4],
						44: [2, 4],
						47: [2, 4],
						48: [2, 4],
						51: [2, 4],
						55: [2, 4],
						60: [2, 4]
					}, {
						5: [2, 5],
						14: [2, 5],
						15: [2, 5],
						19: [2, 5],
						29: [2, 5],
						34: [2, 5],
						39: [2, 5],
						44: [2, 5],
						47: [2, 5],
						48: [2, 5],
						51: [2, 5],
						55: [2, 5],
						60: [2, 5]
					}, {
						5: [2, 6],
						14: [2, 6],
						15: [2, 6],
						19: [2, 6],
						29: [2, 6],
						34: [2, 6],
						39: [2, 6],
						44: [2, 6],
						47: [2, 6],
						48: [2, 6],
						51: [2, 6],
						55: [2, 6],
						60: [2, 6]
					}, {
						5: [2, 7],
						14: [2, 7],
						15: [2, 7],
						19: [2, 7],
						29: [2, 7],
						34: [2, 7],
						39: [2, 7],
						44: [2, 7],
						47: [2, 7],
						48: [2, 7],
						51: [2, 7],
						55: [2, 7],
						60: [2, 7]
					}, {
						5: [2, 8],
						14: [2, 8],
						15: [2, 8],
						19: [2, 8],
						29: [2, 8],
						34: [2, 8],
						39: [2, 8],
						44: [2, 8],
						47: [2, 8],
						48: [2, 8],
						51: [2, 8],
						55: [2, 8],
						60: [2, 8]
					}, {
						5: [2, 9],
						14: [2, 9],
						15: [2, 9],
						19: [2, 9],
						29: [2, 9],
						34: [2, 9],
						39: [2, 9],
						44: [2, 9],
						47: [2, 9],
						48: [2, 9],
						51: [2, 9],
						55: [2, 9],
						60: [2, 9]
					}, {
						20: 25,
						72: [1, 35],
						78: 26,
						79: 27,
						80: [1, 28],
						81: [1, 29],
						82: [1, 30],
						83: [1, 31],
						84: [1, 32],
						85: [1, 34],
						86: 33
					}, {
						20: 36,
						72: [1, 35],
						78: 26,
						79: 27,
						80: [1, 28],
						81: [1, 29],
						82: [1, 30],
						83: [1, 31],
						84: [1, 32],
						85: [1, 34],
						86: 33
					}, {
						4: 37,
						6: 3,
						14: [2, 46],
						15: [2, 46],
						19: [2, 46],
						29: [2, 46],
						34: [2, 46],
						39: [2, 46],
						44: [2, 46],
						47: [2, 46],
						48: [2, 46],
						51: [2, 46],
						55: [2, 46],
						60: [2, 46]
					}, {
						4: 38,
						6: 3,
						14: [2, 46],
						15: [2, 46],
						19: [2, 46],
						29: [2, 46],
						34: [2, 46],
						44: [2, 46],
						47: [2, 46],
						48: [2, 46],
						51: [2, 46],
						55: [2, 46],
						60: [2, 46]
					}, {
						13: 40,
						15: [1, 20],
						17: 39
					}, {
						20: 42,
						56: 41,
						64: 43,
						65: [1, 44],
						72: [1, 35],
						78: 26,
						79: 27,
						80: [1, 28],
						81: [1, 29],
						82: [1, 30],
						83: [1, 31],
						84: [1, 32],
						85: [1, 34],
						86: 33
					}, {
						4: 45,
						6: 3,
						14: [2, 46],
						15: [2, 46],
						19: [2, 46],
						29: [2, 46],
						34: [2, 46],
						47: [2, 46],
						48: [2, 46],
						51: [2, 46],
						55: [2, 46],
						60: [2, 46]
					}, {
						5: [2, 10],
						14: [2, 10],
						15: [2, 10],
						18: [2, 10],
						19: [2, 10],
						29: [2, 10],
						34: [2, 10],
						39: [2, 10],
						44: [2, 10],
						47: [2, 10],
						48: [2, 10],
						51: [2, 10],
						55: [2, 10],
						60: [2, 10]
					}, {
						20: 46,
						72: [1, 35],
						78: 26,
						79: 27,
						80: [1, 28],
						81: [1, 29],
						82: [1, 30],
						83: [1, 31],
						84: [1, 32],
						85: [1, 34],
						86: 33
					}, {
						20: 47,
						72: [1, 35],
						78: 26,
						79: 27,
						80: [1, 28],
						81: [1, 29],
						82: [1, 30],
						83: [1, 31],
						84: [1, 32],
						85: [1, 34],
						86: 33
					}, {
						20: 48,
						72: [1, 35],
						78: 26,
						79: 27,
						80: [1, 28],
						81: [1, 29],
						82: [1, 30],
						83: [1, 31],
						84: [1, 32],
						85: [1, 34],
						86: 33
					}, {
						20: 42,
						56: 49,
						64: 43,
						65: [1, 44],
						72: [1, 35],
						78: 26,
						79: 27,
						80: [1, 28],
						81: [1, 29],
						82: [1, 30],
						83: [1, 31],
						84: [1, 32],
						85: [1, 34],
						86: 33
					}, {
						33: [2, 78],
						49: 50,
						65: [2, 78],
						72: [2, 78],
						80: [2, 78],
						81: [2, 78],
						82: [2, 78],
						83: [2, 78],
						84: [2, 78],
						85: [2, 78]
					}, {
						23: [2, 33],
						33: [2, 33],
						54: [2, 33],
						65: [2, 33],
						68: [2, 33],
						72: [2, 33],
						75: [2, 33],
						80: [2, 33],
						81: [2, 33],
						82: [2, 33],
						83: [2, 33],
						84: [2, 33],
						85: [2, 33]
					}, {
						23: [2, 34],
						33: [2, 34],
						54: [2, 34],
						65: [2, 34],
						68: [2, 34],
						72: [2, 34],
						75: [2, 34],
						80: [2, 34],
						81: [2, 34],
						82: [2, 34],
						83: [2, 34],
						84: [2, 34],
						85: [2, 34]
					}, {
						23: [2, 35],
						33: [2, 35],
						54: [2, 35],
						65: [2, 35],
						68: [2, 35],
						72: [2, 35],
						75: [2, 35],
						80: [2, 35],
						81: [2, 35],
						82: [2, 35],
						83: [2, 35],
						84: [2, 35],
						85: [2, 35]
					}, {
						23: [2, 36],
						33: [2, 36],
						54: [2, 36],
						65: [2, 36],
						68: [2, 36],
						72: [2, 36],
						75: [2, 36],
						80: [2, 36],
						81: [2, 36],
						82: [2, 36],
						83: [2, 36],
						84: [2, 36],
						85: [2, 36]
					}, {
						23: [2, 37],
						33: [2, 37],
						54: [2, 37],
						65: [2, 37],
						68: [2, 37],
						72: [2, 37],
						75: [2, 37],
						80: [2, 37],
						81: [2, 37],
						82: [2, 37],
						83: [2, 37],
						84: [2, 37],
						85: [2, 37]
					}, {
						23: [2, 38],
						33: [2, 38],
						54: [2, 38],
						65: [2, 38],
						68: [2, 38],
						72: [2, 38],
						75: [2, 38],
						80: [2, 38],
						81: [2, 38],
						82: [2, 38],
						83: [2, 38],
						84: [2, 38],
						85: [2, 38]
					}, {
						23: [2, 39],
						33: [2, 39],
						54: [2, 39],
						65: [2, 39],
						68: [2, 39],
						72: [2, 39],
						75: [2, 39],
						80: [2, 39],
						81: [2, 39],
						82: [2, 39],
						83: [2, 39],
						84: [2, 39],
						85: [2, 39]
					}, {
						23: [2, 43],
						33: [2, 43],
						54: [2, 43],
						65: [2, 43],
						68: [2, 43],
						72: [2, 43],
						75: [2, 43],
						80: [2, 43],
						81: [2, 43],
						82: [2, 43],
						83: [2, 43],
						84: [2, 43],
						85: [2, 43],
						87: [1, 51]
					}, {
						72: [1, 35],
						86: 52
					}, {
						23: [2, 45],
						33: [2, 45],
						54: [2, 45],
						65: [2, 45],
						68: [2, 45],
						72: [2, 45],
						75: [2, 45],
						80: [2, 45],
						81: [2, 45],
						82: [2, 45],
						83: [2, 45],
						84: [2, 45],
						85: [2, 45],
						87: [2, 45]
					}, {
						52: 53,
						54: [2, 82],
						65: [2, 82],
						72: [2, 82],
						80: [2, 82],
						81: [2, 82],
						82: [2, 82],
						83: [2, 82],
						84: [2, 82],
						85: [2, 82]
					}, {
						25: 54,
						38: 56,
						39: [1, 58],
						43: 57,
						44: [1, 59],
						45: 55,
						47: [2, 54]
					}, {
						28: 60,
						43: 61,
						44: [1, 59],
						47: [2, 56]
					}, {
						13: 63,
						15: [1, 20],
						18: [1, 62]
					}, {
						15: [2, 48],
						18: [2, 48]
					}, {
						33: [2, 86],
						57: 64,
						65: [2, 86],
						72: [2, 86],
						80: [2, 86],
						81: [2, 86],
						82: [2, 86],
						83: [2, 86],
						84: [2, 86],
						85: [2, 86]
					}, {
						33: [2, 40],
						65: [2, 40],
						72: [2, 40],
						80: [2, 40],
						81: [2, 40],
						82: [2, 40],
						83: [2, 40],
						84: [2, 40],
						85: [2, 40]
					}, {
						33: [2, 41],
						65: [2, 41],
						72: [2, 41],
						80: [2, 41],
						81: [2, 41],
						82: [2, 41],
						83: [2, 41],
						84: [2, 41],
						85: [2, 41]
					}, {
						20: 65,
						72: [1, 35],
						78: 26,
						79: 27,
						80: [1, 28],
						81: [1, 29],
						82: [1, 30],
						83: [1, 31],
						84: [1, 32],
						85: [1, 34],
						86: 33
					}, {
						26: 66,
						47: [1, 67]
					}, {
						30: 68,
						33: [2, 58],
						65: [2, 58],
						72: [2, 58],
						75: [2, 58],
						80: [2, 58],
						81: [2, 58],
						82: [2, 58],
						83: [2, 58],
						84: [2, 58],
						85: [2, 58]
					}, {
						33: [2, 64],
						35: 69,
						65: [2, 64],
						72: [2, 64],
						75: [2, 64],
						80: [2, 64],
						81: [2, 64],
						82: [2, 64],
						83: [2, 64],
						84: [2, 64],
						85: [2, 64]
					}, {
						21: 70,
						23: [2, 50],
						65: [2, 50],
						72: [2, 50],
						80: [2, 50],
						81: [2, 50],
						82: [2, 50],
						83: [2, 50],
						84: [2, 50],
						85: [2, 50]
					}, {
						33: [2, 90],
						61: 71,
						65: [2, 90],
						72: [2, 90],
						80: [2, 90],
						81: [2, 90],
						82: [2, 90],
						83: [2, 90],
						84: [2, 90],
						85: [2, 90]
					}, {
						20: 75,
						33: [2, 80],
						50: 72,
						63: 73,
						64: 76,
						65: [1, 44],
						69: 74,
						70: 77,
						71: 78,
						72: [1, 79],
						78: 26,
						79: 27,
						80: [1, 28],
						81: [1, 29],
						82: [1, 30],
						83: [1, 31],
						84: [1, 32],
						85: [1, 34],
						86: 33
					}, {
						72: [1, 80]
					}, {
						23: [2, 42],
						33: [2, 42],
						54: [2, 42],
						65: [2, 42],
						68: [2, 42],
						72: [2, 42],
						75: [2, 42],
						80: [2, 42],
						81: [2, 42],
						82: [2, 42],
						83: [2, 42],
						84: [2, 42],
						85: [2, 42],
						87: [1, 51]
					}, {
						20: 75,
						53: 81,
						54: [2, 84],
						63: 82,
						64: 76,
						65: [1, 44],
						69: 83,
						70: 77,
						71: 78,
						72: [1, 79],
						78: 26,
						79: 27,
						80: [1, 28],
						81: [1, 29],
						82: [1, 30],
						83: [1, 31],
						84: [1, 32],
						85: [1, 34],
						86: 33
					}, {
						26: 84,
						47: [1, 67]
					}, {
						47: [2, 55]
					}, {
						4: 85,
						6: 3,
						14: [2, 46],
						15: [2, 46],
						19: [2, 46],
						29: [2, 46],
						34: [2, 46],
						39: [2, 46],
						44: [2, 46],
						47: [2, 46],
						48: [2, 46],
						51: [2, 46],
						55: [2, 46],
						60: [2, 46]
					}, {
						47: [2, 20]
					}, {
						20: 86,
						72: [1, 35],
						78: 26,
						79: 27,
						80: [1, 28],
						81: [1, 29],
						82: [1, 30],
						83: [1, 31],
						84: [1, 32],
						85: [1, 34],
						86: 33
					}, {
						4: 87,
						6: 3,
						14: [2, 46],
						15: [2, 46],
						19: [2, 46],
						29: [2, 46],
						34: [2, 46],
						47: [2, 46],
						48: [2, 46],
						51: [2, 46],
						55: [2, 46],
						60: [2, 46]
					}, {
						26: 88,
						47: [1, 67]
					}, {
						47: [2, 57]
					}, {
						5: [2, 11],
						14: [2, 11],
						15: [2, 11],
						19: [2, 11],
						29: [2, 11],
						34: [2, 11],
						39: [2, 11],
						44: [2, 11],
						47: [2, 11],
						48: [2, 11],
						51: [2, 11],
						55: [2, 11],
						60: [2, 11]
					}, {
						15: [2, 49],
						18: [2, 49]
					}, {
						20: 75,
						33: [2, 88],
						58: 89,
						63: 90,
						64: 76,
						65: [1, 44],
						69: 91,
						70: 77,
						71: 78,
						72: [1, 79],
						78: 26,
						79: 27,
						80: [1, 28],
						81: [1, 29],
						82: [1, 30],
						83: [1, 31],
						84: [1, 32],
						85: [1, 34],
						86: 33
					}, {
						65: [2, 94],
						66: 92,
						68: [2, 94],
						72: [2, 94],
						80: [2, 94],
						81: [2, 94],
						82: [2, 94],
						83: [2, 94],
						84: [2, 94],
						85: [2, 94]
					}, {
						5: [2, 25],
						14: [2, 25],
						15: [2, 25],
						19: [2, 25],
						29: [2, 25],
						34: [2, 25],
						39: [2, 25],
						44: [2, 25],
						47: [2, 25],
						48: [2, 25],
						51: [2, 25],
						55: [2, 25],
						60: [2, 25]
					}, {
						20: 93,
						72: [1, 35],
						78: 26,
						79: 27,
						80: [1, 28],
						81: [1, 29],
						82: [1, 30],
						83: [1, 31],
						84: [1, 32],
						85: [1, 34],
						86: 33
					}, {
						20: 75,
						31: 94,
						33: [2, 60],
						63: 95,
						64: 76,
						65: [1, 44],
						69: 96,
						70: 77,
						71: 78,
						72: [1, 79],
						75: [2, 60],
						78: 26,
						79: 27,
						80: [1, 28],
						81: [1, 29],
						82: [1, 30],
						83: [1, 31],
						84: [1, 32],
						85: [1, 34],
						86: 33
					}, {
						20: 75,
						33: [2, 66],
						36: 97,
						63: 98,
						64: 76,
						65: [1, 44],
						69: 99,
						70: 77,
						71: 78,
						72: [1, 79],
						75: [2, 66],
						78: 26,
						79: 27,
						80: [1, 28],
						81: [1, 29],
						82: [1, 30],
						83: [1, 31],
						84: [1, 32],
						85: [1, 34],
						86: 33
					}, {
						20: 75,
						22: 100,
						23: [2, 52],
						63: 101,
						64: 76,
						65: [1, 44],
						69: 102,
						70: 77,
						71: 78,
						72: [1, 79],
						78: 26,
						79: 27,
						80: [1, 28],
						81: [1, 29],
						82: [1, 30],
						83: [1, 31],
						84: [1, 32],
						85: [1, 34],
						86: 33
					}, {
						20: 75,
						33: [2, 92],
						62: 103,
						63: 104,
						64: 76,
						65: [1, 44],
						69: 105,
						70: 77,
						71: 78,
						72: [1, 79],
						78: 26,
						79: 27,
						80: [1, 28],
						81: [1, 29],
						82: [1, 30],
						83: [1, 31],
						84: [1, 32],
						85: [1, 34],
						86: 33
					}, {
						33: [1, 106]
					}, {
						33: [2, 79],
						65: [2, 79],
						72: [2, 79],
						80: [2, 79],
						81: [2, 79],
						82: [2, 79],
						83: [2, 79],
						84: [2, 79],
						85: [2, 79]
					}, {
						33: [2, 81]
					}, {
						23: [2, 27],
						33: [2, 27],
						54: [2, 27],
						65: [2, 27],
						68: [2, 27],
						72: [2, 27],
						75: [2, 27],
						80: [2, 27],
						81: [2, 27],
						82: [2, 27],
						83: [2, 27],
						84: [2, 27],
						85: [2, 27]
					}, {
						23: [2, 28],
						33: [2, 28],
						54: [2, 28],
						65: [2, 28],
						68: [2, 28],
						72: [2, 28],
						75: [2, 28],
						80: [2, 28],
						81: [2, 28],
						82: [2, 28],
						83: [2, 28],
						84: [2, 28],
						85: [2, 28]
					}, {
						23: [2, 30],
						33: [2, 30],
						54: [2, 30],
						68: [2, 30],
						71: 107,
						72: [1, 108],
						75: [2, 30]
					}, {
						23: [2, 98],
						33: [2, 98],
						54: [2, 98],
						68: [2, 98],
						72: [2, 98],
						75: [2, 98]
					}, {
						23: [2, 45],
						33: [2, 45],
						54: [2, 45],
						65: [2, 45],
						68: [2, 45],
						72: [2, 45],
						73: [1, 109],
						75: [2, 45],
						80: [2, 45],
						81: [2, 45],
						82: [2, 45],
						83: [2, 45],
						84: [2, 45],
						85: [2, 45],
						87: [2, 45]
					}, {
						23: [2, 44],
						33: [2, 44],
						54: [2, 44],
						65: [2, 44],
						68: [2, 44],
						72: [2, 44],
						75: [2, 44],
						80: [2, 44],
						81: [2, 44],
						82: [2, 44],
						83: [2, 44],
						84: [2, 44],
						85: [2, 44],
						87: [2, 44]
					}, {
						54: [1, 110]
					}, {
						54: [2, 83],
						65: [2, 83],
						72: [2, 83],
						80: [2, 83],
						81: [2, 83],
						82: [2, 83],
						83: [2, 83],
						84: [2, 83],
						85: [2, 83]
					}, {
						54: [2, 85]
					}, {
						5: [2, 13],
						14: [2, 13],
						15: [2, 13],
						19: [2, 13],
						29: [2, 13],
						34: [2, 13],
						39: [2, 13],
						44: [2, 13],
						47: [2, 13],
						48: [2, 13],
						51: [2, 13],
						55: [2, 13],
						60: [2, 13]
					}, {
						38: 56,
						39: [1, 58],
						43: 57,
						44: [1, 59],
						45: 112,
						46: 111,
						47: [2, 76]
					}, {
						33: [2, 70],
						40: 113,
						65: [2, 70],
						72: [2, 70],
						75: [2, 70],
						80: [2, 70],
						81: [2, 70],
						82: [2, 70],
						83: [2, 70],
						84: [2, 70],
						85: [2, 70]
					}, {
						47: [2, 18]
					}, {
						5: [2, 14],
						14: [2, 14],
						15: [2, 14],
						19: [2, 14],
						29: [2, 14],
						34: [2, 14],
						39: [2, 14],
						44: [2, 14],
						47: [2, 14],
						48: [2, 14],
						51: [2, 14],
						55: [2, 14],
						60: [2, 14]
					}, {
						33: [1, 114]
					}, {
						33: [2, 87],
						65: [2, 87],
						72: [2, 87],
						80: [2, 87],
						81: [2, 87],
						82: [2, 87],
						83: [2, 87],
						84: [2, 87],
						85: [2, 87]
					}, {
						33: [2, 89]
					}, {
						20: 75,
						63: 116,
						64: 76,
						65: [1, 44],
						67: 115,
						68: [2, 96],
						69: 117,
						70: 77,
						71: 78,
						72: [1, 79],
						78: 26,
						79: 27,
						80: [1, 28],
						81: [1, 29],
						82: [1, 30],
						83: [1, 31],
						84: [1, 32],
						85: [1, 34],
						86: 33
					}, {
						33: [1, 118]
					}, {
						32: 119,
						33: [2, 62],
						74: 120,
						75: [1, 121]
					}, {
						33: [2, 59],
						65: [2, 59],
						72: [2, 59],
						75: [2, 59],
						80: [2, 59],
						81: [2, 59],
						82: [2, 59],
						83: [2, 59],
						84: [2, 59],
						85: [2, 59]
					}, {
						33: [2, 61],
						75: [2, 61]
					}, {
						33: [2, 68],
						37: 122,
						74: 123,
						75: [1, 121]
					}, {
						33: [2, 65],
						65: [2, 65],
						72: [2, 65],
						75: [2, 65],
						80: [2, 65],
						81: [2, 65],
						82: [2, 65],
						83: [2, 65],
						84: [2, 65],
						85: [2, 65]
					}, {
						33: [2, 67],
						75: [2, 67]
					}, {
						23: [1, 124]
					}, {
						23: [2, 51],
						65: [2, 51],
						72: [2, 51],
						80: [2, 51],
						81: [2, 51],
						82: [2, 51],
						83: [2, 51],
						84: [2, 51],
						85: [2, 51]
					}, {
						23: [2, 53]
					}, {
						33: [1, 125]
					}, {
						33: [2, 91],
						65: [2, 91],
						72: [2, 91],
						80: [2, 91],
						81: [2, 91],
						82: [2, 91],
						83: [2, 91],
						84: [2, 91],
						85: [2, 91]
					}, {
						33: [2, 93]
					}, {
						5: [2, 22],
						14: [2, 22],
						15: [2, 22],
						19: [2, 22],
						29: [2, 22],
						34: [2, 22],
						39: [2, 22],
						44: [2, 22],
						47: [2, 22],
						48: [2, 22],
						51: [2, 22],
						55: [2, 22],
						60: [2, 22]
					}, {
						23: [2, 99],
						33: [2, 99],
						54: [2, 99],
						68: [2, 99],
						72: [2, 99],
						75: [2, 99]
					}, {
						73: [1, 109]
					}, {
						20: 75,
						63: 126,
						64: 76,
						65: [1, 44],
						72: [1, 35],
						78: 26,
						79: 27,
						80: [1, 28],
						81: [1, 29],
						82: [1, 30],
						83: [1, 31],
						84: [1, 32],
						85: [1, 34],
						86: 33
					}, {
						5: [2, 23],
						14: [2, 23],
						15: [2, 23],
						19: [2, 23],
						29: [2, 23],
						34: [2, 23],
						39: [2, 23],
						44: [2, 23],
						47: [2, 23],
						48: [2, 23],
						51: [2, 23],
						55: [2, 23],
						60: [2, 23]
					}, {
						47: [2, 19]
					}, {
						47: [2, 77]
					}, {
						20: 75,
						33: [2, 72],
						41: 127,
						63: 128,
						64: 76,
						65: [1, 44],
						69: 129,
						70: 77,
						71: 78,
						72: [1, 79],
						75: [2, 72],
						78: 26,
						79: 27,
						80: [1, 28],
						81: [1, 29],
						82: [1, 30],
						83: [1, 31],
						84: [1, 32],
						85: [1, 34],
						86: 33
					}, {
						5: [2, 24],
						14: [2, 24],
						15: [2, 24],
						19: [2, 24],
						29: [2, 24],
						34: [2, 24],
						39: [2, 24],
						44: [2, 24],
						47: [2, 24],
						48: [2, 24],
						51: [2, 24],
						55: [2, 24],
						60: [2, 24]
					}, {
						68: [1, 130]
					}, {
						65: [2, 95],
						68: [2, 95],
						72: [2, 95],
						80: [2, 95],
						81: [2, 95],
						82: [2, 95],
						83: [2, 95],
						84: [2, 95],
						85: [2, 95]
					}, {
						68: [2, 97]
					}, {
						5: [2, 21],
						14: [2, 21],
						15: [2, 21],
						19: [2, 21],
						29: [2, 21],
						34: [2, 21],
						39: [2, 21],
						44: [2, 21],
						47: [2, 21],
						48: [2, 21],
						51: [2, 21],
						55: [2, 21],
						60: [2, 21]
					}, {
						33: [1, 131]
					}, {
						33: [2, 63]
					}, {
						72: [1, 133],
						76: 132
					}, {
						33: [1, 134]
					}, {
						33: [2, 69]
					}, {
						15: [2, 12]
					}, {
						14: [2, 26],
						15: [2, 26],
						19: [2, 26],
						29: [2, 26],
						34: [2, 26],
						47: [2, 26],
						48: [2, 26],
						51: [2, 26],
						55: [2, 26],
						60: [2, 26]
					}, {
						23: [2, 31],
						33: [2, 31],
						54: [2, 31],
						68: [2, 31],
						72: [2, 31],
						75: [2, 31]
					}, {
						33: [2, 74],
						42: 135,
						74: 136,
						75: [1, 121]
					}, {
						33: [2, 71],
						65: [2, 71],
						72: [2, 71],
						75: [2, 71],
						80: [2, 71],
						81: [2, 71],
						82: [2, 71],
						83: [2, 71],
						84: [2, 71],
						85: [2, 71]
					}, {
						33: [2, 73],
						75: [2, 73]
					}, {
						23: [2, 29],
						33: [2, 29],
						54: [2, 29],
						65: [2, 29],
						68: [2, 29],
						72: [2, 29],
						75: [2, 29],
						80: [2, 29],
						81: [2, 29],
						82: [2, 29],
						83: [2, 29],
						84: [2, 29],
						85: [2, 29]
					}, {
						14: [2, 15],
						15: [2, 15],
						19: [2, 15],
						29: [2, 15],
						34: [2, 15],
						39: [2, 15],
						44: [2, 15],
						47: [2, 15],
						48: [2, 15],
						51: [2, 15],
						55: [2, 15],
						60: [2, 15]
					}, {
						72: [1, 138],
						77: [1, 137]
					}, {
						72: [2, 100],
						77: [2, 100]
					}, {
						14: [2, 16],
						15: [2, 16],
						19: [2, 16],
						29: [2, 16],
						34: [2, 16],
						44: [2, 16],
						47: [2, 16],
						48: [2, 16],
						51: [2, 16],
						55: [2, 16],
						60: [2, 16]
					}, {
						33: [1, 139]
					}, {
						33: [2, 75]
					}, {
						33: [2, 32]
					}, {
						72: [2, 101],
						77: [2, 101]
					}, {
						14: [2, 17],
						15: [2, 17],
						19: [2, 17],
						29: [2, 17],
						34: [2, 17],
						39: [2, 17],
						44: [2, 17],
						47: [2, 17],
						48: [2, 17],
						51: [2, 17],
						55: [2, 17],
						60: [2, 17]
					}],
					defaultActions: {
						4: [2, 1],
						55: [2, 55],
						57: [2, 20],
						61: [2, 57],
						74: [2, 81],
						83: [2, 85],
						87: [2, 18],
						91: [2, 89],
						102: [2, 53],
						105: [2, 93],
						111: [2, 19],
						112: [2, 77],
						117: [2, 97],
						120: [2, 63],
						123: [2, 69],
						124: [2, 12],
						136: [2, 75],
						137: [2, 32]
					},
					parseError: function(str, hash) {
						throw new Error(str)
					},
					parse: function(input) {
						function lex() {
							var token;
							return token = self.lexer.lex() || 1, "number" != typeof token && (token = self.symbols_[token] || token), token
						}
						var self = this,
							stack = [0],
							vstack = [null],
							lstack = [],
							table = this.table,
							yytext = "",
							yylineno = 0,
							yyleng = 0,
							recovering = 0;
						this.lexer.setInput(input), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, this.yy.parser = this, "undefined" == typeof this.lexer.yylloc && (this.lexer.yylloc = {});
						var yyloc = this.lexer.yylloc;
						lstack.push(yyloc);
						var ranges = this.lexer.options && this.lexer.options.ranges;
						"function" == typeof this.yy.parseError && (this.parseError = this.yy.parseError);
						for (var symbol, preErrorSymbol, state, action, r, p, len, newState, expected, yyval = {};;) {
							if (state = stack[stack.length - 1], this.defaultActions[state] ? action = this.defaultActions[state] : (null !== symbol && "undefined" != typeof symbol || (symbol = lex()), action = table[state] && table[state][symbol]), "undefined" == typeof action || !action.length || !action[0]) {
								var errStr = "";
								if (!recovering) {
									expected = [];
									for (p in table[state]) this.terminals_[p] && p > 2 && expected.push("'" + this.terminals_[p] + "'");
									errStr = this.lexer.showPosition ? "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'" : "Parse error on line " + (yylineno + 1) + ": Unexpected " + (1 == symbol ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'"), this.parseError(errStr, {
										text: this.lexer.match,
										token: this.terminals_[symbol] || symbol,
										line: this.lexer.yylineno,
										loc: yyloc,
										expected: expected
									})
								}
							}
							if (action[0] instanceof Array && action.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
							switch (action[0]) {
							case 1:
								stack.push(symbol), vstack.push(this.lexer.yytext), lstack.push(this.lexer.yylloc), stack.push(action[1]), symbol = null, preErrorSymbol ? (symbol = preErrorSymbol, preErrorSymbol = null) : (yyleng = this.lexer.yyleng, yytext = this.lexer.yytext, yylineno = this.lexer.yylineno, yyloc = this.lexer.yylloc, recovering > 0 && recovering--);
								break;
							case 2:
								if (len = this.productions_[action[1]][1], yyval.$ = vstack[vstack.length - len], yyval._$ = {
									first_line: lstack[lstack.length - (len || 1)].first_line,
									last_line: lstack[lstack.length - 1].last_line,
									first_column: lstack[lstack.length - (len || 1)].first_column,
									last_column: lstack[lstack.length - 1].last_column
								}, ranges && (yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]]), r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack), "undefined" != typeof r) return r;
								len && (stack = stack.slice(0, -1 * len * 2), vstack = vstack.slice(0, -1 * len), lstack = lstack.slice(0, -1 * len)), stack.push(this.productions_[action[1]][0]), vstack.push(yyval.$), lstack.push(yyval._$), newState = table[stack[stack.length - 2]][stack[stack.length - 1]], stack.push(newState);
								break;
							case 3:
								return !0
							}
						}
						return !0
					}
				},
					lexer = function() {
						var lexer = {
							EOF: 1,
							parseError: function(str, hash) {
								if (!this.yy.parser) throw new Error(str);
								this.yy.parser.parseError(str, hash)
							},
							setInput: function(input) {
								return this._input = input, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
									first_line: 1,
									first_column: 0,
									last_line: 1,
									last_column: 0
								}, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this
							},
							input: function() {
								var ch = this._input[0];
								this.yytext += ch, this.yyleng++, this.offset++, this.match += ch, this.matched += ch;
								var lines = ch.match(/(?:\r\n?|\n).*/g);
								return lines ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), ch
							},
							unput: function(ch) {
								var len = ch.length,
									lines = ch.split(/(?:\r\n?|\n)/g);
								this._input = ch + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - len - 1), this.offset -= len;
								var oldLines = this.match.split(/(?:\r\n?|\n)/g);
								this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), lines.length - 1 && (this.yylineno -= lines.length - 1);
								var r = this.yylloc.range;
								return this.yylloc = {
									first_line: this.yylloc.first_line,
									last_line: this.yylineno + 1,
									first_column: this.yylloc.first_column,
									last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
								}, this.options.ranges && (this.yylloc.range = [r[0], r[0] + this.yyleng - len]), this
							},
							more: function() {
								return this._more = !0, this
							},
							less: function(n) {
								this.unput(this.match.slice(n))
							},
							pastInput: function() {
								var past = this.matched.substr(0, this.matched.length - this.match.length);
								return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "")
							},
							upcomingInput: function() {
								var next = this.match;
								return next.length < 20 && (next += this._input.substr(0, 20 - next.length)), (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "")
							},
							showPosition: function() {
								var pre = this.pastInput(),
									c = new Array(pre.length + 1).join("-");
								return pre + this.upcomingInput() + "\n" + c + "^"
							},
							next: function() {
								if (this.done) return this.EOF;
								this._input || (this.done = !0);
								var token, match, tempMatch, index, lines;
								this._more || (this.yytext = "", this.match = "");
								for (var rules = this._currentRules(), i = 0; i < rules.length && (tempMatch = this._input.match(this.rules[rules[i]]), !tempMatch || match && !(tempMatch[0].length > match[0].length) || (match = tempMatch, index = i, this.options.flex)); i++);
								return match ? (lines = match[0].match(/(?:\r\n?|\n).*/g), lines && (this.yylineno += lines.length), this.yylloc = {
									first_line: this.yylloc.last_line,
									last_line: this.yylineno + 1,
									first_column: this.yylloc.last_column,
									last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
								}, this.yytext += match[0], this.match += match[0], this.matches = match, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._input = this._input.slice(match[0].length), this.matched += match[0], token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), token ? token : void 0) : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
									text: "",
									token: null,
									line: this.yylineno
								})
							},
							lex: function() {
								var r = this.next();
								return "undefined" != typeof r ? r : this.lex()
							},
							begin: function(condition) {
								this.conditionStack.push(condition)
							},
							popState: function() {
								return this.conditionStack.pop()
							},
							_currentRules: function() {
								return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules
							},
							topState: function() {
								return this.conditionStack[this.conditionStack.length - 2]
							},
							pushState: function(condition) {
								this.begin(condition)
							}
						};
						return lexer.options = {}, lexer.performAction = function(yy, yy_, $avoiding_name_collisions, YY_START) {
							function strip(start, end) {
								return yy_.yytext = yy_.yytext.substr(start, yy_.yyleng - end)
							}
							switch ($avoiding_name_collisions) {
							case 0:
								if ("\\\\" === yy_.yytext.slice(-2) ? (strip(0, 1), this.begin("mu")) : "\\" === yy_.yytext.slice(-1) ? (strip(0, 1), this.begin("emu")) : this.begin("mu"), yy_.yytext) return 15;
								break;
							case 1:
								return 15;
							case 2:
								return this.popState(), 15;
							case 3:
								return this.begin("raw"), 15;
							case 4:
								return this.popState(), "raw" === this.conditionStack[this.conditionStack.length - 1] ? 15 : (yy_.yytext = yy_.yytext.substr(5, yy_.yyleng - 9), "END_RAW_BLOCK");
							case 5:
								return 15;
							case 6:
								return this.popState(), 14;
							case 7:
								return 65;
							case 8:
								return 68;
							case 9:
								return 19;
							case 10:
								return this.popState(), this.begin("raw"), 23;
							case 11:
								return 55;
							case 12:
								return 60;
							case 13:
								return 29;
							case 14:
								return 47;
							case 15:
								return this.popState(), 44;
							case 16:
								return this.popState(), 44;
							case 17:
								return 34;
							case 18:
								return 39;
							case 19:
								return 51;
							case 20:
								return 48;
							case 21:
								this.unput(yy_.yytext), this.popState(), this.begin("com");
								break;
							case 22:
								return this.popState(), 14;
							case 23:
								return 48;
							case 24:
								return 73;
							case 25:
								return 72;
							case 26:
								return 72;
							case 27:
								return 87;
							case 28:
								break;
							case 29:
								return this.popState(), 54;
							case 30:
								return this.popState(), 33;
							case 31:
								return yy_.yytext = strip(1, 2).replace(/\\"/g, '"'), 80;
							case 32:
								return yy_.yytext = strip(1, 2).replace(/\\'/g, "'"), 80;
							case 33:
								return 85;
							case 34:
								return 82;
							case 35:
								return 82;
							case 36:
								return 83;
							case 37:
								return 84;
							case 38:
								return 81;
							case 39:
								return 75;
							case 40:
								return 77;
							case 41:
								return 72;
							case 42:
								return yy_.yytext = yy_.yytext.replace(/\\([\\\]])/g, "$1"), 72;
							case 43:
								return "INVALID";
							case 44:
								return 5
							}
						}, lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^\/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]*?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/], lexer.conditions = {
							mu: {
								rules: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
								inclusive: !1
							},
							emu: {
								rules: [2],
								inclusive: !1
							},
							com: {
								rules: [6],
								inclusive: !1
							},
							raw: {
								rules: [3, 4, 5],
								inclusive: !1
							},
							INITIAL: {
								rules: [0, 1, 44],
								inclusive: !0
							}
						}, lexer
					}();
				return parser.lexer = lexer, Parser.prototype = parser, parser.Parser = Parser, new Parser
			}();
		exports.__esModule = !0, exports.
	default = handlebars
	}, function(module, exports, __webpack_require__) {
		"use strict";
		function WhitespaceControl() {
			var options = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
			this.options = options
		}
		function isPrevWhitespace(body, i, isRoot) {
			void 0 === i && (i = body.length);
			var prev = body[i - 1],
				sibling = body[i - 2];
			return prev ? "ContentStatement" === prev.type ? (sibling || !isRoot ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(prev.original) : void 0 : isRoot
		}
		function isNextWhitespace(body, i, isRoot) {
			void 0 === i && (i = -1);
			var next = body[i + 1],
				sibling = body[i + 2];
			return next ? "ContentStatement" === next.type ? (sibling || !isRoot ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(next.original) : void 0 : isRoot
		}
		function omitRight(body, i, multiple) {
			var current = body[null == i ? 0 : i + 1];
			if (current && "ContentStatement" === current.type && (multiple || !current.rightStripped)) {
				var original = current.value;
				current.value = current.value.replace(multiple ? /^\s+/ : /^[ \t]*\r?\n?/, ""), current.rightStripped = current.value !== original
			}
		}
		function omitLeft(body, i, multiple) {
			var current = body[null == i ? body.length - 1 : i - 1];
			if (current && "ContentStatement" === current.type && (multiple || !current.leftStripped)) {
				var original = current.value;
				return current.value = current.value.replace(multiple ? /\s+$/ : /[ \t]+$/, ""), current.leftStripped = current.value !== original, current.leftStripped
			}
		}
		var _interopRequireDefault = __webpack_require__(1).
	default;
		exports.__esModule = !0;
		var _visitor = __webpack_require__(25),
			_visitor2 = _interopRequireDefault(_visitor);
		WhitespaceControl.prototype = new _visitor2.
	default, WhitespaceControl.prototype.Program = function(program) {
			var doStandalone = !this.options.ignoreStandalone,
				isRoot = !this.isRootSeen;
			this.isRootSeen = !0;
			for (var body = program.body, i = 0, l = body.length; i < l; i++) {
				var current = body[i],
					strip = this.accept(current);
				if (strip) {
					var _isPrevWhitespace = isPrevWhitespace(body, i, isRoot),
						_isNextWhitespace = isNextWhitespace(body, i, isRoot),
						openStandalone = strip.openStandalone && _isPrevWhitespace,
						closeStandalone = strip.closeStandalone && _isNextWhitespace,
						inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;
					strip.close && omitRight(body, i, !0), strip.open && omitLeft(body, i, !0), doStandalone && inlineStandalone && (omitRight(body, i), omitLeft(body, i) && "PartialStatement" === current.type && (current.indent = /([ \t]+$)/.exec(body[i - 1].original)[1])), doStandalone && openStandalone && (omitRight((current.program || current.inverse).body), omitLeft(body, i)), doStandalone && closeStandalone && (omitRight(body, i), omitLeft((current.inverse || current.program).body))
				}
			}
			return program
		}, WhitespaceControl.prototype.BlockStatement = WhitespaceControl.prototype.DecoratorBlock = WhitespaceControl.prototype.PartialBlockStatement = function(block) {
			this.accept(block.program), this.accept(block.inverse);
			var program = block.program || block.inverse,
				inverse = block.program && block.inverse,
				firstInverse = inverse,
				lastInverse = inverse;
			if (inverse && inverse.chained) for (firstInverse = inverse.body[0].program; lastInverse.chained;) lastInverse = lastInverse.body[lastInverse.body.length - 1].program;
			var strip = {
				open: block.openStrip.open,
				close: block.closeStrip.close,
				openStandalone: isNextWhitespace(program.body),
				closeStandalone: isPrevWhitespace((firstInverse || program).body)
			};
			if (block.openStrip.close && omitRight(program.body, null, !0), inverse) {
				var inverseStrip = block.inverseStrip;
				inverseStrip.open && omitLeft(program.body, null, !0), inverseStrip.close && omitRight(firstInverse.body, null, !0), block.closeStrip.open && omitLeft(lastInverse.body, null, !0), !this.options.ignoreStandalone && isPrevWhitespace(program.body) && isNextWhitespace(firstInverse.body) && (omitLeft(program.body), omitRight(firstInverse.body))
			} else block.closeStrip.open && omitLeft(program.body, null, !0);
			return strip
		}, WhitespaceControl.prototype.Decorator = WhitespaceControl.prototype.MustacheStatement = function(mustache) {
			return mustache.strip
		}, WhitespaceControl.prototype.PartialStatement = WhitespaceControl.prototype.CommentStatement = function(node) {
			var strip = node.strip || {};
			return {
				inlineStandalone: !0,
				open: strip.open,
				close: strip.close
			}
		}, exports.
	default = WhitespaceControl, module.exports = exports.
	default
	}, function(module, exports, __webpack_require__) {
		"use strict";
		function Visitor() {
			this.parents = []
		}
		function visitSubExpression(mustache) {
			this.acceptRequired(mustache, "path"), this.acceptArray(mustache.params), this.acceptKey(mustache, "hash")
		}
		function visitBlock(block) {
			visitSubExpression.call(this, block), this.acceptKey(block, "program"), this.acceptKey(block, "inverse")
		}
		function visitPartial(partial) {
			this.acceptRequired(partial, "name"), this.acceptArray(partial.params), this.acceptKey(partial, "hash")
		}
		var _interopRequireDefault = __webpack_require__(1).
	default;
		exports.__esModule = !0;
		var _exception = __webpack_require__(6),
			_exception2 = _interopRequireDefault(_exception);
		Visitor.prototype = {
			constructor: Visitor,
			mutating: !1,
			acceptKey: function(node, name) {
				var value = this.accept(node[name]);
				if (this.mutating) {
					if (value && !Visitor.prototype[value.type]) throw new _exception2.
				default ('Unexpected node type "' + value.type + '" found when accepting ' + name + " on " + node.type);
					node[name] = value
				}
			},
			acceptRequired: function(node, name) {
				if (this.acceptKey(node, name), !node[name]) throw new _exception2.
			default (node.type + " requires " + name)
			},
			acceptArray: function(array) {
				for (var i = 0, l = array.length; i < l; i++) this.acceptKey(array, i), array[i] || (array.splice(i, 1), i--, l--)
			},
			accept: function(object) {
				if (object) {
					if (!this[object.type]) throw new _exception2.
				default ("Unknown type: " + object.type, object);
					this.current && this.parents.unshift(this.current), this.current = object;
					var ret = this[object.type](object);
					return this.current = this.parents.shift(), !this.mutating || ret ? ret:
					ret !== !1 ? object : void 0
				}
			},
			Program: function(program) {
				this.acceptArray(program.body)
			},
			MustacheStatement: visitSubExpression,
			Decorator: visitSubExpression,
			BlockStatement: visitBlock,
			DecoratorBlock: visitBlock,
			PartialStatement: visitPartial,
			PartialBlockStatement: function(partial) {
				visitPartial.call(this, partial), this.acceptKey(partial, "program")
			},
			ContentStatement: function() {},
			CommentStatement: function() {},
			SubExpression: visitSubExpression,
			PathExpression: function() {},
			StringLiteral: function() {},
			NumberLiteral: function() {},
			BooleanLiteral: function() {},
			UndefinedLiteral: function() {},
			NullLiteral: function() {},
			Hash: function(hash) {
				this.acceptArray(hash.pairs)
			},
			HashPair: function(pair) {
				this.acceptRequired(pair, "value")
			}
		}, exports.
	default = Visitor, module.exports = exports.
	default
	}, function(module, exports, __webpack_require__) {
		"use strict";
		function validateClose(open, close) {
			if (close = close.path ? close.path.original : close, open.path.original !== close) {
				var errorNode = {
					loc: open.path.loc
				};
				throw new _exception2.
			default (open.path.original + " doesn't match " + close, errorNode)
			}
		}
		function SourceLocation(source, locInfo) {
			this.source = source, this.start = {
				line: locInfo.first_line,
				column: locInfo.first_column
			}, this.end = {
				line: locInfo.last_line,
				column: locInfo.last_column
			}
		}
		function id(token) {
			return /^\[.*\]$/.test(token) ? token.substr(1, token.length - 2) : token
		}
		function stripFlags(open, close) {
			return {
				open: "~" === open.charAt(2),
				close: "~" === close.charAt(close.length - 3)
			}
		}
		function stripComment(comment) {
			return comment.replace(/^\{\{~?\!-?-?/, "").replace(/-?-?~?\}\}$/, "")
		}
		function preparePath(data, parts, loc) {
			loc = this.locInfo(loc);
			for (var original = data ? "@" : "", dig = [], depth = 0, depthString = "", i = 0, l = parts.length; i < l; i++) {
				var part = parts[i].part,
					isLiteral = parts[i].original !== part;
				if (original += (parts[i].separator || "") + part, isLiteral || ".." !== part && "." !== part && "this" !== part) dig.push(part);
				else {
					if (dig.length > 0) throw new _exception2.
				default ("Invalid path: " + original, {
						loc: loc
					});
					".." === part && (depth++, depthString += "../")
				}
			}
			return {
				type: "PathExpression",
				data: data,
				depth: depth,
				parts: dig,
				original: original,
				loc: loc
			}
		}
		function prepareMustache(path, params, hash, open, strip, locInfo) {
			var escapeFlag = open.charAt(3) || open.charAt(2),
				escaped = "{" !== escapeFlag && "&" !== escapeFlag,
				decorator = /\*/.test(open);
			return {
				type: decorator ? "Decorator" : "MustacheStatement",
				path: path,
				params: params,
				hash: hash,
				escaped: escaped,
				strip: strip,
				loc: this.locInfo(locInfo)
			}
		}
		function prepareRawBlock(openRawBlock, contents, close, locInfo) {
			validateClose(openRawBlock, close), locInfo = this.locInfo(locInfo);
			var program = {
				type: "Program",
				body: contents,
				strip: {},
				loc: locInfo
			};
			return {
				type: "BlockStatement",
				path: openRawBlock.path,
				params: openRawBlock.params,
				hash: openRawBlock.hash,
				program: program,
				openStrip: {},
				inverseStrip: {},
				closeStrip: {},
				loc: locInfo
			}
		}
		function prepareBlock(openBlock, program, inverseAndProgram, close, inverted, locInfo) {
			close && close.path && validateClose(openBlock, close);
			var decorator = /\*/.test(openBlock.open);
			program.blockParams = openBlock.blockParams;
			var inverse = void 0,
				inverseStrip = void 0;
			if (inverseAndProgram) {
				if (decorator) throw new _exception2.
			default ("Unexpected inverse block on decorator", inverseAndProgram);
				inverseAndProgram.chain && (inverseAndProgram.program.body[0].closeStrip = close.strip), inverseStrip = inverseAndProgram.strip, inverse = inverseAndProgram.program
			}
			return inverted && (inverted = inverse, inverse = program, program = inverted), {
				type: decorator ? "DecoratorBlock" : "BlockStatement",
				path: openBlock.path,
				params: openBlock.params,
				hash: openBlock.hash,
				program: program,
				inverse: inverse,
				openStrip: openBlock.strip,
				inverseStrip: inverseStrip,
				closeStrip: close && close.strip,
				loc: this.locInfo(locInfo)
			}
		}
		function prepareProgram(statements, loc) {
			if (!loc && statements.length) {
				var firstLoc = statements[0].loc,
					lastLoc = statements[statements.length - 1].loc;
				firstLoc && lastLoc && (loc = {
					source: firstLoc.source,
					start: {
						line: firstLoc.start.line,
						column: firstLoc.start.column
					},
					end: {
						line: lastLoc.end.line,
						column: lastLoc.end.column
					}
				})
			}
			return {
				type: "Program",
				body: statements,
				strip: {},
				loc: loc
			}
		}
		function preparePartialBlock(open, program, close, locInfo) {
			return validateClose(open, close), {
				type: "PartialBlockStatement",
				name: open.path,
				params: open.params,
				hash: open.hash,
				program: program,
				openStrip: open.strip,
				closeStrip: close && close.strip,
				loc: this.locInfo(locInfo)
			}
		}
		var _interopRequireDefault = __webpack_require__(1).
	default;
		exports.__esModule = !0, exports.SourceLocation = SourceLocation, exports.id = id, exports.stripFlags = stripFlags, exports.stripComment = stripComment, exports.preparePath = preparePath, exports.prepareMustache = prepareMustache, exports.prepareRawBlock = prepareRawBlock, exports.prepareBlock = prepareBlock, exports.prepareProgram = prepareProgram, exports.preparePartialBlock = preparePartialBlock;
		var _exception = __webpack_require__(6),
			_exception2 = _interopRequireDefault(_exception)
	}, function(module, exports, __webpack_require__) {
		"use strict";
		function Compiler() {}
		function precompile(input, options, env) {
			if (null == input || "string" != typeof input && "Program" !== input.type) throw new _exception2.
		default ("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + input);
			options = options || {}, "data" in options || (options.data = !0), options.compat && (options.useDepths = !0);
			var ast = env.parse(input, options),
				environment = (new env.Compiler).compile(ast, options);
			return (new env.JavaScriptCompiler).compile(environment, options)
		}
		function compile(input, options, env) {
			function compileInput() {
				var ast = env.parse(input, options),
					environment = (new env.Compiler).compile(ast, options),
					templateSpec = (new env.JavaScriptCompiler).compile(environment, options, void 0, !0);
				return env.template(templateSpec)
			}
			function ret(context, execOptions) {
				return compiled || (compiled = compileInput()), compiled.call(this, context, execOptions)
			}
			if (void 0 === options && (options = {}), null == input || "string" != typeof input && "Program" !== input.type) throw new _exception2.
		default ("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + input);
			"data" in options || (options.data = !0), options.compat && (options.useDepths = !0);
			var compiled = void 0;
			return ret._setup = function(setupOptions) {
				return compiled || (compiled = compileInput()), compiled._setup(setupOptions)
			}, ret._child = function(i, data, blockParams, depths) {
				return compiled || (compiled = compileInput()), compiled._child(i, data, blockParams, depths)
			}, ret
		}
		function argEquals(a, b) {
			if (a === b) return !0;
			if (_utils.isArray(a) && _utils.isArray(b) && a.length === b.length) {
				for (var i = 0; i < a.length; i++) if (!argEquals(a[i], b[i])) return !1;
				return !0
			}
		}
		function transformLiteralToPath(sexpr) {
			if (!sexpr.path.parts) {
				var literal = sexpr.path;
				sexpr.path = {
					type: "PathExpression",
					data: !1,
					depth: 0,
					parts: [literal.original + ""],
					original: literal.original + "",
					loc: literal.loc
				}
			}
		}
		var _interopRequireDefault = __webpack_require__(1).
	default;
		exports.__esModule = !0, exports.Compiler = Compiler, exports.precompile = precompile, exports.compile = compile;
		var _exception = __webpack_require__(6),
			_exception2 = _interopRequireDefault(_exception),
			_utils = __webpack_require__(5),
			_ast = __webpack_require__(21),
			_ast2 = _interopRequireDefault(_ast),
			slice = [].slice;
		Compiler.prototype = {
			compiler: Compiler,
			equals: function(other) {
				var len = this.opcodes.length;
				if (other.opcodes.length !== len) return !1;
				for (var i = 0; i < len; i++) {
					var opcode = this.opcodes[i],
						otherOpcode = other.opcodes[i];
					if (opcode.opcode !== otherOpcode.opcode || !argEquals(opcode.args, otherOpcode.args)) return !1
				}
				len = this.children.length;
				for (var i = 0; i < len; i++) if (!this.children[i].equals(other.children[i])) return !1;
				return !0
			},
			guid: 0,
			compile: function(program, options) {
				this.sourceNode = [], this.opcodes = [], this.children = [], this.options = options, this.stringParams = options.stringParams, this.trackIds = options.trackIds, options.blockParams = options.blockParams || [];
				var knownHelpers = options.knownHelpers;
				if (options.knownHelpers = {
					helperMissing: !0,
					blockHelperMissing: !0,
					each: !0,
					if :!0,
					unless: !0,
					with: !0,
					log: !0,
					lookup: !0
				}, knownHelpers) for (var _name in knownHelpers) _name in knownHelpers && (options.knownHelpers[_name] = knownHelpers[_name]);
				return this.accept(program)
			},
			compileProgram: function(program) {
				var childCompiler = new this.compiler,
					result = childCompiler.compile(program, this.options),
					guid = this.guid++;
				return this.usePartial = this.usePartial || result.usePartial, this.children[guid] = result, this.useDepths = this.useDepths || result.useDepths, guid
			},
			accept: function(node) {
				if (!this[node.type]) throw new _exception2.
			default ("Unknown type: " + node.type, node);
				this.sourceNode.unshift(node);
				var ret = this[node.type](node);
				return this.sourceNode.shift(), ret
			},
			Program: function(program) {
				this.options.blockParams.unshift(program.blockParams);
				for (var body = program.body, bodyLength = body.length, i = 0; i < bodyLength; i++) this.accept(body[i]);
				return this.options.blockParams.shift(), this.isSimple = 1 === bodyLength, this.blockParams = program.blockParams ? program.blockParams.length : 0, this
			},
			BlockStatement: function(block) {
				transformLiteralToPath(block);
				var program = block.program,
					inverse = block.inverse;
				program = program && this.compileProgram(program), inverse = inverse && this.compileProgram(inverse);
				var type = this.classifySexpr(block);
				"helper" === type ? this.helperSexpr(block, program, inverse) : "simple" === type ? (this.simpleSexpr(block), this.opcode("pushProgram", program), this.opcode("pushProgram", inverse), this.opcode("emptyHash"), this.opcode("blockValue", block.path.original)) : (this.ambiguousSexpr(block, program, inverse), this.opcode("pushProgram", program), this.opcode("pushProgram", inverse), this.opcode("emptyHash"), this.opcode("ambiguousBlockValue")), this.opcode("append")
			},
			DecoratorBlock: function(decorator) {
				var program = decorator.program && this.compileProgram(decorator.program),
					params = this.setupFullMustacheParams(decorator, program, void 0),
					path = decorator.path;
				this.useDecorators = !0, this.opcode("registerDecorator", params.length, path.original)
			},
			PartialStatement: function(partial) {
				this.usePartial = !0;
				var program = partial.program;
				program && (program = this.compileProgram(partial.program));
				var params = partial.params;
				if (params.length > 1) throw new _exception2.
			default ("Unsupported number of partial arguments: " + params.length, partial);
				params.length || (this.options.explicitPartialContext ? this.opcode("pushLiteral", "undefined") : params.push({
					type: "PathExpression",
					parts: [],
					depth: 0
				}));
				var partialName = partial.name.original,
					isDynamic = "SubExpression" === partial.name.type;
				isDynamic && this.accept(partial.name), this.setupFullMustacheParams(partial, program, void 0, !0);
				var indent = partial.indent || "";
				this.options.preventIndent && indent && (this.opcode("appendContent", indent), indent = ""), this.opcode("invokePartial", isDynamic, partialName, indent), this.opcode("append")
			},
			PartialBlockStatement: function(partialBlock) {
				this.PartialStatement(partialBlock)
			},
			MustacheStatement: function(mustache) {
				this.SubExpression(mustache), mustache.escaped && !this.options.noEscape ? this.opcode("appendEscaped") : this.opcode("append")
			},
			Decorator: function(decorator) {
				this.DecoratorBlock(decorator)
			},
			ContentStatement: function(content) {
				content.value && this.opcode("appendContent", content.value)
			},
			CommentStatement: function() {},
			SubExpression: function(sexpr) {
				transformLiteralToPath(sexpr);
				var type = this.classifySexpr(sexpr);
				"simple" === type ? this.simpleSexpr(sexpr) : "helper" === type ? this.helperSexpr(sexpr) : this.ambiguousSexpr(sexpr)
			},
			ambiguousSexpr: function(sexpr, program, inverse) {
				var path = sexpr.path,
					name = path.parts[0],
					isBlock = null != program || null != inverse;
				this.opcode("getContext", path.depth), this.opcode("pushProgram", program), this.opcode("pushProgram", inverse), path.strict = !0, this.accept(path), this.opcode("invokeAmbiguous", name, isBlock)
			},
			simpleSexpr: function(sexpr) {
				var path = sexpr.path;
				path.strict = !0, this.accept(path), this.opcode("resolvePossibleLambda")
			},
			helperSexpr: function(sexpr, program, inverse) {
				var params = this.setupFullMustacheParams(sexpr, program, inverse),
					path = sexpr.path,
					name = path.parts[0];
				if (this.options.knownHelpers[name]) this.opcode("invokeKnownHelper", params.length, name);
				else {
					if (this.options.knownHelpersOnly) throw new _exception2.
				default ("You specified knownHelpersOnly, but used the unknown helper " + name, sexpr);
					path.strict = !0, path.falsy = !0, this.accept(path), this.opcode("invokeHelper", params.length, path.original, _ast2.
				default.helpers.simpleId(path))
				}
			},
			PathExpression: function(path) {
				this.addDepth(path.depth), this.opcode("getContext", path.depth);
				var name = path.parts[0],
					scoped = _ast2.
				default.helpers.scopedId(path),
					blockParamId = !path.depth && !scoped && this.blockParamIndex(name);
				blockParamId ? this.opcode("lookupBlockParam", blockParamId, path.parts):
				name ? path.data ? (this.options.data = !0, this.opcode("lookupData", path.depth, path.parts, path.strict)) : this.opcode("lookupOnContext", path.parts, path.falsy, path.strict, scoped) : this.opcode("pushContext")
			},
			StringLiteral: function(string) {
				this.opcode("pushString", string.value)
			},
			NumberLiteral: function(number) {
				this.opcode("pushLiteral", number.value)
			},
			BooleanLiteral: function(bool) {
				this.opcode("pushLiteral", bool.value)
			},
			UndefinedLiteral: function() {
				this.opcode("pushLiteral", "undefined")
			},
			NullLiteral: function() {
				this.opcode("pushLiteral", "null")
			},
			Hash: function(hash) {
				var pairs = hash.pairs,
					i = 0,
					l = pairs.length;
				for (this.opcode("pushHash"); i < l; i++) this.pushParam(pairs[i].value);
				for (; i--;) this.opcode("assignToHash", pairs[i].key);
				this.opcode("popHash")
			},
			opcode: function(name) {
				this.opcodes.push({
					opcode: name,
					args: slice.call(arguments, 1),
					loc: this.sourceNode[0].loc
				})
			},
			addDepth: function(depth) {
				depth && (this.useDepths = !0)
			},
			classifySexpr: function(sexpr) {
				var isSimple = _ast2.
			default.helpers.simpleId(sexpr.path),
					isBlockParam = isSimple && !! this.blockParamIndex(sexpr.path.parts[0]),
					isHelper = !isBlockParam && _ast2.
				default.helpers.helperExpression(sexpr),
					isEligible = !isBlockParam && (isHelper || isSimple);
				if (isEligible && !isHelper) {
					var _name2 = sexpr.path.parts[0],
						options = this.options;
					options.knownHelpers[_name2] ? isHelper = !0 : options.knownHelpersOnly && (isEligible = !1)
				}
				return isHelper ? "helper":
				isEligible ? "ambiguous" : "simple"
			},
			pushParams: function(params) {
				for (var i = 0, l = params.length; i < l; i++) this.pushParam(params[i])
			},
			pushParam: function(val) {
				var value = null != val.value ? val.value : val.original || "";
				if (this.stringParams) value.replace && (value = value.replace(/^(\.?\.\/)*/g, "").replace(/\//g, ".")), val.depth && this.addDepth(val.depth), this.opcode("getContext", val.depth || 0), this.opcode("pushStringParam", value, val.type), "SubExpression" === val.type && this.accept(val);
				else {
					if (this.trackIds) {
						var blockParamIndex = void 0;
						if (!val.parts || _ast2.
					default.helpers.scopedId(val) || val.depth || (blockParamIndex = this.blockParamIndex(val.parts[0])), blockParamIndex) {
							var blockParamChild = val.parts.slice(1).join(".");
							this.opcode("pushId", "BlockParam", blockParamIndex, blockParamChild)
						} else value = val.original || value, value.replace && (value = value.replace(/^this(?:\.|$)/, "").replace(/^\.\//, "").replace(/^\.$/, "")), this.opcode("pushId", val.type, value)
					}
					this.accept(val)
				}
			},
			setupFullMustacheParams: function(sexpr, program, inverse, omitEmpty) {
				var params = sexpr.params;
				return this.pushParams(params), this.opcode("pushProgram", program), this.opcode("pushProgram", inverse), sexpr.hash ? this.accept(sexpr.hash) : this.opcode("emptyHash", omitEmpty), params
			},
			blockParamIndex: function(name) {
				for (var depth = 0, len = this.options.blockParams.length; depth < len; depth++) {
					var blockParams = this.options.blockParams[depth],
						param = blockParams && _utils.indexOf(blockParams, name);
					if (blockParams && param >= 0) return [depth, param]
				}
			}
		}
	}, function(module, exports, __webpack_require__) {
		"use strict";
		function Literal(value) {
			this.value = value
		}
		function JavaScriptCompiler() {}
		function strictLookup(requireTerminal, compiler, parts, type) {
			var stack = compiler.popStack(),
				i = 0,
				len = parts.length;
			for (requireTerminal && len--; i < len; i++) stack = compiler.nameLookup(stack, parts[i], type);
			return requireTerminal ? [compiler.aliasable("container.strict"), "(", stack, ", ", compiler.quotedString(parts[i]), ")"] : stack
		}
		var _interopRequireDefault = __webpack_require__(1).
	default;
		exports.__esModule = !0;
		var _base = __webpack_require__(4),
			_exception = __webpack_require__(6),
			_exception2 = _interopRequireDefault(_exception),
			_utils = __webpack_require__(5),
			_codeGen = __webpack_require__(29),
			_codeGen2 = _interopRequireDefault(_codeGen);
		JavaScriptCompiler.prototype = {
			nameLookup: function(parent, name) {
				return JavaScriptCompiler.isValidJavaScriptVariableName(name) ? [parent, ".", name] : [parent, "[", JSON.stringify(name), "]"]
			},
			depthedLookup: function(name) {
				return [this.aliasable("container.lookup"), '(depths, "', name, '")']
			},
			compilerInfo: function() {
				var revision = _base.COMPILER_REVISION,
					versions = _base.REVISION_CHANGES[revision];
				return [revision, versions]
			},
			appendToBuffer: function(source, location, explicit) {
				return _utils.isArray(source) || (source = [source]), source = this.source.wrap(source, location), this.environment.isSimple ? ["return ", source, ";"] : explicit ? ["buffer += ", source, ";"] : (source.appendToBuffer = !0, source)
			},
			initializeBuffer: function() {
				return this.quotedString("")
			},
			compile: function(environment, options, context, asObject) {
				this.environment = environment, this.options = options, this.stringParams = this.options.stringParams, this.trackIds = this.options.trackIds, this.precompile = !asObject, this.name = this.environment.name, this.isChild = !! context, this.context = context || {
					decorators: [],
					programs: [],
					environments: []
				}, this.preamble(), this.stackSlot = 0, this.stackVars = [], this.aliases = {}, this.registers = {
					list: []
				}, this.hashes = [], this.compileStack = [], this.inlineStack = [], this.blockParams = [], this.compileChildren(environment, options), this.useDepths = this.useDepths || environment.useDepths || environment.useDecorators || this.options.compat, this.useBlockParams = this.useBlockParams || environment.useBlockParams;
				var opcodes = environment.opcodes,
					opcode = void 0,
					firstLoc = void 0,
					i = void 0,
					l = void 0;
				for (i = 0, l = opcodes.length; i < l; i++) opcode = opcodes[i], this.source.currentLocation = opcode.loc, firstLoc = firstLoc || opcode.loc, this[opcode.opcode].apply(this, opcode.args);
				if (this.source.currentLocation = firstLoc, this.pushSource(""), this.stackSlot || this.inlineStack.length || this.compileStack.length) throw new _exception2.
			default ("Compile completed with content left on stack");
				this.decorators.isEmpty() ? this.decorators = void 0:
				(this.useDecorators = !0, this.decorators.prepend("var decorators = container.decorators;\n"), this.decorators.push("return fn;"), asObject ? this.decorators = Function.apply(this, ["fn", "props", "container", "depth0", "data", "blockParams", "depths", this.decorators.merge()]) : (this.decorators.prepend("function(fn, props, container, depth0, data, blockParams, depths) {\n"), this.decorators.push("}\n"), this.decorators = this.decorators.merge()));
				var fn = this.createFunctionContext(asObject);
				if (this.isChild) return fn;
				var ret = {
					compiler: this.compilerInfo(),
					main: fn
				};
				this.decorators && (ret.main_d = this.decorators, ret.useDecorators = !0);
				var _context = this.context,
					programs = _context.programs,
					decorators = _context.decorators;
				for (i = 0, l = programs.length; i < l; i++) programs[i] && (ret[i] = programs[i], decorators[i] && (ret[i + "_d"] = decorators[i], ret.useDecorators = !0));
				return this.environment.usePartial && (ret.usePartial = !0), this.options.data && (ret.useData = !0), this.useDepths && (ret.useDepths = !0), this.useBlockParams && (ret.useBlockParams = !0), this.options.compat && (ret.compat = !0), asObject ? ret.compilerOptions = this.options : (ret.compiler = JSON.stringify(ret.compiler), this.source.currentLocation = {
					start: {
						line: 1,
						column: 0
					}
				}, ret = this.objectLiteral(ret), options.srcName ? (ret = ret.toStringWithSourceMap({
					file: options.destName
				}), ret.map = ret.map && ret.map.toString()) : ret = ret.toString()), ret
			},
			preamble: function() {
				this.lastContext = 0, this.source = new _codeGen2.
			default (this.options.srcName), this.decorators = new _codeGen2.
			default (this.options.srcName)
			},
			createFunctionContext: function(asObject) {
				var varDeclarations = "",
					locals = this.stackVars.concat(this.registers.list);
				locals.length > 0 && (varDeclarations += ", " + locals.join(", "));
				var aliasCount = 0;
				for (var alias in this.aliases) {
					var node = this.aliases[alias];
					this.aliases.hasOwnProperty(alias) && node.children && node.referenceCount > 1 && (varDeclarations += ", alias" + ++aliasCount + "=" + alias, node.children[0] = "alias" + aliasCount)
				}
				var params = ["container", "depth0", "helpers", "partials", "data"];
				(this.useBlockParams || this.useDepths) && params.push("blockParams"), this.useDepths && params.push("depths");
				var source = this.mergeSource(varDeclarations);
				return asObject ? (params.push(source), Function.apply(this, params)) : this.source.wrap(["function(", params.join(","), ") {\n  ", source, "}"])
			},
			mergeSource: function(varDeclarations) {
				var isSimple = this.environment.isSimple,
					appendOnly = !this.forceBuffer,
					appendFirst = void 0,
					sourceSeen = void 0,
					bufferStart = void 0,
					bufferEnd = void 0;
				return this.source.each(function(line) {
					line.appendToBuffer ? (bufferStart ? line.prepend("  + ") : bufferStart = line, bufferEnd = line) : (bufferStart && (sourceSeen ? bufferStart.prepend("buffer += ") : appendFirst = !0, bufferEnd.add(";"), bufferStart = bufferEnd = void 0), sourceSeen = !0, isSimple || (appendOnly = !1))
				}), appendOnly ? bufferStart ? (bufferStart.prepend("return "), bufferEnd.add(";")) : sourceSeen || this.source.push('return "";') : (varDeclarations += ", buffer = " + (appendFirst ? "" : this.initializeBuffer()), bufferStart ? (bufferStart.prepend("return buffer + "), bufferEnd.add(";")) : this.source.push("return buffer;")), varDeclarations && this.source.prepend("var " + varDeclarations.substring(2) + (appendFirst ? "" : ";\n")), this.source.merge()
			},
			blockValue: function(name) {
				var blockHelperMissing = this.aliasable("helpers.blockHelperMissing"),
					params = [this.contextName(0)];
				this.setupHelperArgs(name, 0, params);
				var blockName = this.popStack();
				params.splice(1, 0, blockName), this.push(this.source.functionCall(blockHelperMissing, "call", params))
			},
			ambiguousBlockValue: function() {
				var blockHelperMissing = this.aliasable("helpers.blockHelperMissing"),
					params = [this.contextName(0)];
				this.setupHelperArgs("", 0, params, !0), this.flushInline();
				var current = this.topStack();
				params.splice(1, 0, current), this.pushSource(["if (!", this.lastHelper, ") { ", current, " = ", this.source.functionCall(blockHelperMissing, "call", params), "}"])
			},
			appendContent: function(content) {
				this.pendingContent ? content = this.pendingContent + content : this.pendingLocation = this.source.currentLocation, this.pendingContent = content
			},
			append: function() {
				if (this.isInline()) this.replaceStack(function(current) {
					return [" != null ? ", current, ' : ""']
				}), this.pushSource(this.appendToBuffer(this.popStack()));
				else {
					var local = this.popStack();
					this.pushSource(["if (", local, " != null) { ", this.appendToBuffer(local, void 0, !0), " }"]), this.environment.isSimple && this.pushSource(["else { ", this.appendToBuffer("''", void 0, !0), " }"])
				}
			},
			appendEscaped: function() {
				this.pushSource(this.appendToBuffer([this.aliasable("container.escapeExpression"), "(", this.popStack(), ")"]))
			},
			getContext: function(depth) {
				this.lastContext = depth
			},
			pushContext: function() {
				this.pushStackLiteral(this.contextName(this.lastContext))
			},
			lookupOnContext: function(parts, falsy, strict, scoped) {
				var i = 0;
				scoped || !this.options.compat || this.lastContext ? this.pushContext() : this.push(this.depthedLookup(parts[i++])), this.resolvePath("context", parts, i, falsy, strict)
			},
			lookupBlockParam: function(blockParamId, parts) {
				this.useBlockParams = !0, this.push(["blockParams[", blockParamId[0], "][", blockParamId[1], "]"]), this.resolvePath("context", parts, 1)
			},
			lookupData: function(depth, parts, strict) {
				depth ? this.pushStackLiteral("container.data(data, " + depth + ")") : this.pushStackLiteral("data"), this.resolvePath("data", parts, 0, !0, strict)
			},
			resolvePath: function(type, parts, i, falsy, strict) {
				var _this = this;
				if (this.options.strict || this.options.assumeObjects) return void this.push(strictLookup(this.options.strict && strict, this, parts, type));
				for (var len = parts.length; i < len; i++) this.replaceStack(function(current) {
					var lookup = _this.nameLookup(current, parts[i], type);
					return falsy ? [" && ", lookup] : [" != null ? ", lookup, " : ", current]
				})
			},
			resolvePossibleLambda: function() {
				this.push([this.aliasable("container.lambda"), "(", this.popStack(), ", ", this.contextName(0), ")"])
			},
			pushStringParam: function(string, type) {
				this.pushContext(), this.pushString(type), "SubExpression" !== type && ("string" == typeof string ? this.pushString(string) : this.pushStackLiteral(string))
			},
			emptyHash: function(omitEmpty) {
				this.trackIds && this.push("{}"), this.stringParams && (this.push("{}"), this.push("{}")), this.pushStackLiteral(omitEmpty ? "undefined" : "{}")
			},
			pushHash: function() {
				this.hash && this.hashes.push(this.hash), this.hash = {
					values: [],
					types: [],
					contexts: [],
					ids: []
				}
			},
			popHash: function() {
				var hash = this.hash;
				this.hash = this.hashes.pop(), this.trackIds && this.push(this.objectLiteral(hash.ids)), this.stringParams && (this.push(this.objectLiteral(hash.contexts)), this.push(this.objectLiteral(hash.types))), this.push(this.objectLiteral(hash.values))
			},
			pushString: function(string) {
				this.pushStackLiteral(this.quotedString(string))
			},
			pushLiteral: function(value) {
				this.pushStackLiteral(value)
			},
			pushProgram: function(guid) {
				null != guid ? this.pushStackLiteral(this.programExpression(guid)) : this.pushStackLiteral(null)
			},
			registerDecorator: function(paramSize, name) {
				var foundDecorator = this.nameLookup("decorators", name, "decorator"),
					options = this.setupHelperArgs(name, paramSize);
				this.decorators.push(["fn = ", this.decorators.functionCall(foundDecorator, "", ["fn", "props", "container", options]), " || fn;"])
			},
			invokeHelper: function(paramSize, name, isSimple) {
				var nonHelper = this.popStack(),
					helper = this.setupHelper(paramSize, name),
					simple = isSimple ? [helper.name, " || "] : "",
					lookup = ["("].concat(simple, nonHelper);
				this.options.strict || lookup.push(" || ", this.aliasable("helpers.helperMissing")), lookup.push(")"), this.push(this.source.functionCall(lookup, "call", helper.callParams))
			},
			invokeKnownHelper: function(paramSize, name) {
				var helper = this.setupHelper(paramSize, name);
				this.push(this.source.functionCall(helper.name, "call", helper.callParams))
			},
			invokeAmbiguous: function(name, helperCall) {
				this.useRegister("helper");
				var nonHelper = this.popStack();
				this.emptyHash();
				var helper = this.setupHelper(0, name, helperCall),
					helperName = this.lastHelper = this.nameLookup("helpers", name, "helper"),
					lookup = ["(", "(helper = ", helperName, " || ", nonHelper, ")"];
				this.options.strict || (lookup[0] = "(helper = ", lookup.push(" != null ? helper : ", this.aliasable("helpers.helperMissing"))), this.push(["(", lookup, helper.paramsInit ? ["),(", helper.paramsInit] : [], "),", "(typeof helper === ", this.aliasable('"function"'), " ? ", this.source.functionCall("helper", "call", helper.callParams), " : helper))"])
			},
			invokePartial: function(isDynamic, name, indent) {
				var params = [],
					options = this.setupParams(name, 1, params);
				isDynamic && (name = this.popStack(), delete options.name), indent && (options.indent = JSON.stringify(indent)), options.helpers = "helpers", options.partials = "partials", options.decorators = "container.decorators", isDynamic ? params.unshift(name) : params.unshift(this.nameLookup("partials", name, "partial")), this.options.compat && (options.depths = "depths"), options = this.objectLiteral(options), params.push(options), this.push(this.source.functionCall("container.invokePartial", "", params))
			},
			assignToHash: function(key) {
				var value = this.popStack(),
					context = void 0,
					type = void 0,
					id = void 0;
				this.trackIds && (id = this.popStack()), this.stringParams && (type = this.popStack(), context = this.popStack());
				var hash = this.hash;
				context && (hash.contexts[key] = context), type && (hash.types[key] = type), id && (hash.ids[key] = id), hash.values[key] = value
			},
			pushId: function(type, name, child) {
				"BlockParam" === type ? this.pushStackLiteral("blockParams[" + name[0] + "].path[" + name[1] + "]" + (child ? " + " + JSON.stringify("." + child) : "")) : "PathExpression" === type ? this.pushString(name) : "SubExpression" === type ? this.pushStackLiteral("true") : this.pushStackLiteral("null")
			},
			compiler: JavaScriptCompiler,
			compileChildren: function(environment, options) {
				for (var children = environment.children, child = void 0, compiler = void 0, i = 0, l = children.length; i < l; i++) {
					child = children[i], compiler = new this.compiler;
					var index = this.matchExistingProgram(child);
					null == index ? (this.context.programs.push(""), index = this.context.programs.length, child.index = index, child.name = "program" + index, this.context.programs[index] = compiler.compile(child, options, this.context, !this.precompile), this.context.decorators[index] = compiler.decorators, this.context.environments[index] = child, this.useDepths = this.useDepths || compiler.useDepths, this.useBlockParams = this.useBlockParams || compiler.useBlockParams) : (child.index = index, child.name = "program" + index, this.useDepths = this.useDepths || child.useDepths, this.useBlockParams = this.useBlockParams || child.useBlockParams)
				}
			},
			matchExistingProgram: function(child) {
				for (var i = 0, len = this.context.environments.length; i < len; i++) {
					var environment = this.context.environments[i];
					if (environment && environment.equals(child)) return i
				}
			},
			programExpression: function(guid) {
				var child = this.environment.children[guid],
					programParams = [child.index, "data", child.blockParams];
				return (this.useBlockParams || this.useDepths) && programParams.push("blockParams"), this.useDepths && programParams.push("depths"), "container.program(" + programParams.join(", ") + ")"
			},
			useRegister: function(name) {
				this.registers[name] || (this.registers[name] = !0, this.registers.list.push(name))
			},
			push: function(expr) {
				return expr instanceof Literal || (expr = this.source.wrap(expr)), this.inlineStack.push(expr), expr
			},
			pushStackLiteral: function(item) {
				this.push(new Literal(item))
			},
			pushSource: function(source) {
				this.pendingContent && (this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation)), this.pendingContent = void 0), source && this.source.push(source)
			},
			replaceStack: function(callback) {
				var prefix = ["("],
					stack = void 0,
					createdStack = void 0,
					usedLiteral = void 0;
				if (!this.isInline()) throw new _exception2.
			default ("replaceStack on non-inline");
				var top = this.popStack(!0);
				if (top instanceof Literal) stack = [top.value], prefix = ["(", stack], usedLiteral = !0;
				else {
					createdStack = !0;
					var _name = this.incrStack();
					prefix = ["((", this.push(_name), " = ", top, ")"], stack = this.topStack()
				}
				var item = callback.call(this, stack);
				usedLiteral || this.popStack(), createdStack && this.stackSlot--, this.push(prefix.concat(item, ")"))
			},
			incrStack: function() {
				return this.stackSlot++, this.stackSlot > this.stackVars.length && this.stackVars.push("stack" + this.stackSlot), this.topStackName()
			},
			topStackName: function() {
				return "stack" + this.stackSlot
			},
			flushInline: function() {
				var inlineStack = this.inlineStack;
				this.inlineStack = [];
				for (var i = 0, len = inlineStack.length; i < len; i++) {
					var entry = inlineStack[i];
					if (entry instanceof Literal) this.compileStack.push(entry);
					else {
						var stack = this.incrStack();
						this.pushSource([stack, " = ", entry, ";"]), this.compileStack.push(stack)
					}
				}
			},
			isInline: function() {
				return this.inlineStack.length
			},
			popStack: function(wrapped) {
				var inline = this.isInline(),
					item = (inline ? this.inlineStack : this.compileStack).pop();
				if (!wrapped && item instanceof Literal) return item.value;
				if (!inline) {
					if (!this.stackSlot) throw new _exception2.
				default ("Invalid stack pop");
					this.stackSlot--
				}
				return item
			},
			topStack: function() {
				var stack = this.isInline() ? this.inlineStack : this.compileStack,
					item = stack[stack.length - 1];
				return item instanceof Literal ? item.value : item
			},
			contextName: function(context) {
				return this.useDepths && context ? "depths[" + context + "]" : "depth" + context
			},
			quotedString: function(str) {
				return this.source.quotedString(str)
			},
			objectLiteral: function(obj) {
				return this.source.objectLiteral(obj)
			},
			aliasable: function(name) {
				var ret = this.aliases[name];
				return ret ? (ret.referenceCount++, ret) : (ret = this.aliases[name] = this.source.wrap(name), ret.aliasable = !0, ret.referenceCount = 1, ret)
			},
			setupHelper: function(paramSize, name, blockHelper) {
				var params = [],
					paramsInit = this.setupHelperArgs(name, paramSize, params, blockHelper),
					foundHelper = this.nameLookup("helpers", name, "helper"),
					callContext = this.aliasable(this.contextName(0) + " != null ? " + this.contextName(0) + " : {}");
				return {
					params: params,
					paramsInit: paramsInit,
					name: foundHelper,
					callParams: [callContext].concat(params)
				}
			},
			setupParams: function(helper, paramSize, params) {
				var options = {},
					contexts = [],
					types = [],
					ids = [],
					objectArgs = !params,
					param = void 0;
				objectArgs && (params = []), options.name = this.quotedString(helper), options.hash = this.popStack(), this.trackIds && (options.hashIds = this.popStack()), this.stringParams && (options.hashTypes = this.popStack(), options.hashContexts = this.popStack());
				var inverse = this.popStack(),
					program = this.popStack();
				(program || inverse) && (options.fn = program || "container.noop", options.inverse = inverse || "container.noop");
				for (var i = paramSize; i--;) param = this.popStack(), params[i] = param, this.trackIds && (ids[i] = this.popStack()), this.stringParams && (types[i] = this.popStack(), contexts[i] = this.popStack());
				return objectArgs && (options.args = this.source.generateArray(params)), this.trackIds && (options.ids = this.source.generateArray(ids)), this.stringParams && (options.types = this.source.generateArray(types), options.contexts = this.source.generateArray(contexts)), this.options.data && (options.data = "data"), this.useBlockParams && (options.blockParams = "blockParams"), options
			},
			setupHelperArgs: function(helper, paramSize, params, useRegister) {
				var options = this.setupParams(helper, paramSize, params);
				return options = this.objectLiteral(options), useRegister ? (this.useRegister("options"), params.push("options"), ["options=", options]) : params ? (params.push(options), "") : options
			}
		}, function() {
			for (var reservedWords = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false".split(" "), compilerWords = JavaScriptCompiler.RESERVED_WORDS = {}, i = 0, l = reservedWords.length; i < l; i++) compilerWords[reservedWords[i]] = !0
		}(), JavaScriptCompiler.isValidJavaScriptVariableName = function(name) {
			return !JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name)
		}, exports.
	default = JavaScriptCompiler, module.exports = exports.
	default
	}, function(module, exports, __webpack_require__) {
		"use strict";
		function castChunk(chunk, codeGen, loc) {
			if (_utils.isArray(chunk)) {
				for (var ret = [], i = 0, len = chunk.length; i < len; i++) ret.push(codeGen.wrap(chunk[i], loc));
				return ret
			}
			return "boolean" == typeof chunk || "number" == typeof chunk ? chunk + "" : chunk
		}
		function CodeGen(srcFile) {
			this.srcFile = srcFile, this.source = []
		}
		exports.__esModule = !0;
		var _utils = __webpack_require__(5),
			SourceNode = void 0;
		try {} catch (err) {}
		SourceNode || (SourceNode = function(line, column, srcFile, chunks) {
			this.src = "", chunks && this.add(chunks)
		}, SourceNode.prototype = {
			add: function(chunks) {
				_utils.isArray(chunks) && (chunks = chunks.join("")), this.src += chunks
			},
			prepend: function(chunks) {
				_utils.isArray(chunks) && (chunks = chunks.join("")), this.src = chunks + this.src
			},
			toStringWithSourceMap: function() {
				return {
					code: this.toString()
				}
			},
			toString: function() {
				return this.src
			}
		}), CodeGen.prototype = {
			isEmpty: function() {
				return !this.source.length
			},
			prepend: function(source, loc) {
				this.source.unshift(this.wrap(source, loc))
			},
			push: function(source, loc) {
				this.source.push(this.wrap(source, loc))
			},
			merge: function() {
				var source = this.empty();
				return this.each(function(line) {
					source.add(["  ", line, "\n"])
				}), source
			},
			each: function(iter) {
				for (var i = 0, len = this.source.length; i < len; i++) iter(this.source[i])
			},
			empty: function() {
				var loc = this.currentLocation || {
					start: {}
				};
				return new SourceNode(loc.start.line, loc.start.column, this.srcFile)
			},
			wrap: function(chunk) {
				var loc = arguments.length <= 1 || void 0 === arguments[1] ? this.currentLocation || {
					start: {}
				} : arguments[1];
				return chunk instanceof SourceNode ? chunk : (chunk = castChunk(chunk, this, loc), new SourceNode(loc.start.line, loc.start.column, this.srcFile, chunk))
			},
			functionCall: function(fn, type, params) {
				return params = this.generateList(params), this.wrap([fn, type ? "." + type + "(" : "(", params, ")"])
			},
			quotedString: function(str) {
				return '"' + (str + "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"'
			},
			objectLiteral: function(obj) {
				var pairs = [];
				for (var key in obj) if (obj.hasOwnProperty(key)) {
					var value = castChunk(obj[key], this);
					"undefined" !== value && pairs.push([this.quotedString(key), ":", value])
				}
				var ret = this.generateList(pairs);
				return ret.prepend("{"), ret.add("}"), ret
			},
			generateList: function(entries) {
				for (var ret = this.empty(), i = 0, len = entries.length; i < len; i++) i && ret.add(","), ret.add(castChunk(entries[i], this));
				return ret
			},
			generateArray: function(entries) {
				var ret = this.generateList(entries);
				return ret.prepend("["), ret.add("]"), ret
			}
		}, exports.
	default = CodeGen, module.exports = exports.
	default
	}])
});