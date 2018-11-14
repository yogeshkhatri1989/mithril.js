"use strict"

var o = require("../../ospec/ospec")
var domMock = require("../../test-utils/domMock")
var vdom = require("../../render/render")
var m = require("../../render/hyperscript")

o.spec("event", function() {
	var $window, root, onevent, render
	o.beforeEach(function() {
		$window = domMock()
		root = $window.document.body
		onevent = o.spy()
		var renderer = vdom($window)
		renderer.setEventCallback(onevent)
		render = renderer.render
	})

	o("handles onclick", function() {
		var spy = o.spy()
		var div = m("div", {onclick: spy})
		var e = $window.document.createEvent("MouseEvents")
		e.initEvent("click", true, true)

		render(root, [div])
		div.dom.dispatchEvent(e)

		o(spy.callCount).equals(1)
		o(spy.this).equals(div.dom)
		o(spy.args[0].type).equals("click")
		o(spy.args[0].target).equals(div.dom)
		o(onevent.callCount).equals(1)
		o(onevent.this).equals(div.dom)
		o(onevent.args[0].type).equals("click")
		o(onevent.args[0].target).equals(div.dom)
		o(e.$defaultPrevented).equals(false)
		o(e.$propagationStopped).equals(false)
	})

	o("handles onclick returning false", function() {
		var spy = o.spy(function () { return false })
		var div = m("div", {onclick: spy})
		var e = $window.document.createEvent("MouseEvents")
		e.initEvent("click", true, true)

		render(root, [div])
		div.dom.dispatchEvent(e)

		o(spy.callCount).equals(1)
		o(spy.this).equals(div.dom)
		o(spy.args[0].type).equals("click")
		o(spy.args[0].target).equals(div.dom)
		o(onevent.callCount).equals(1)
		o(onevent.this).equals(div.dom)
		o(onevent.args[0].type).equals("click")
		o(onevent.args[0].target).equals(div.dom)
		o(e.$defaultPrevented).equals(true)
		o(e.$propagationStopped).equals(true)
	})

	o("handles click EventListener object", function() {
		var spy = o.spy()
		var listener = {handleEvent: spy}
		var div = m("div", {onclick: listener})
		var e = $window.document.createEvent("MouseEvents")
		e.initEvent("click", true, true)

		render(root, [div])
		div.dom.dispatchEvent(e)

		o(spy.callCount).equals(1)
		o(spy.this).equals(listener)
		o(spy.args[0].type).equals("click")
		o(spy.args[0].target).equals(div.dom)
		o(onevent.callCount).equals(1)
		o(onevent.this).equals(div.dom)
		o(onevent.args[0].type).equals("click")
		o(onevent.args[0].target).equals(div.dom)
		o(e.$defaultPrevented).equals(false)
		o(e.$propagationStopped).equals(false)
	})

	o("handles click EventListener object returning false", function() {
		var spy = o.spy(function () { return false })
		var listener = {handleEvent: spy}
		var div = m("div", {onclick: listener})
		var e = $window.document.createEvent("MouseEvents")
		e.initEvent("click", true, true)

		render(root, [div])
		div.dom.dispatchEvent(e)

		o(spy.callCount).equals(1)
		o(spy.this).equals(listener)
		o(spy.args[0].type).equals("click")
		o(spy.args[0].target).equals(div.dom)
		o(onevent.callCount).equals(1)
		o(onevent.this).equals(div.dom)
		o(onevent.args[0].type).equals("click")
		o(onevent.args[0].target).equals(div.dom)
		o(e.$defaultPrevented).equals(false)
		o(e.$propagationStopped).equals(false)
	})

	o("removes event", function() {
		var spy = o.spy()
		var vnode = m("a", {onclick: spy})
		var updated = m("a", {})

		render(root, [vnode])
		render(root, [updated])

		var e = $window.document.createEvent("MouseEvents")
		e.initEvent("click", true, true)
		vnode.dom.dispatchEvent(e)

		o(spy.callCount).equals(0)
	})

	o("removes event when null", function() {
		var spy = o.spy()
		var vnode = m("a", {onclick: spy})
		var updated = m("a", {onclick: null})

		render(root, [vnode])
		render(root, [updated])

		var e = $window.document.createEvent("MouseEvents")
		e.initEvent("click", true, true)
		vnode.dom.dispatchEvent(e)

		o(spy.callCount).equals(0)
	})

	o("removes event when undefined", function() {
		var spy = o.spy()
		var vnode = m("a", {onclick: spy})
		var updated = m("a", {onclick: undefined})

		render(root, [vnode])
		render(root, [updated])

		var e = $window.document.createEvent("MouseEvents")
		e.initEvent("click", true, true)
		vnode.dom.dispatchEvent(e)

		o(spy.callCount).equals(0)
	})

	o("removes event added via addEventListener when null", function() {
		var spy = o.spy()
		var vnode = m("a", {ontouchstart: spy})
		var updated = m("a", {ontouchstart: null})

		render(root, [vnode])
		render(root, [updated])

		var e = $window.document.createEvent("TouchEvents")
		e.initEvent("touchstart", true, true)
		vnode.dom.dispatchEvent(e)

		o(spy.callCount).equals(0)
	})

	o("removes event added via addEventListener", function() {
		var spy = o.spy()
		var vnode = m("a", {ontouchstart: spy})
		var updated = m("a", {})

		render(root, [vnode])
		render(root, [updated])

		var e = $window.document.createEvent("TouchEvents")
		e.initEvent("touchstart", true, true)
		vnode.dom.dispatchEvent(e)

		o(spy.callCount).equals(0)
	})

	o("removes event added via addEventListener when undefined", function() {
		var spy = o.spy()
		var vnode = m("a", {ontouchstart: spy})
		var updated = m("a", {ontouchstart: undefined})

		render(root, [vnode])
		render(root, [updated])

		var e = $window.document.createEvent("TouchEvents")
		e.initEvent("touchstart", true, true)
		vnode.dom.dispatchEvent(e)

		o(spy.callCount).equals(0)
	})

	o("removes EventListener object", function() {
		var spy = o.spy()
		var listener = {handleEvent: spy}
		var vnode = m("a", {onclick: listener})
		var updated = m("a", {})

		render(root, [vnode])
		render(root, [updated])

		var e = $window.document.createEvent("MouseEvents")
		e.initEvent("click", true, true)
		vnode.dom.dispatchEvent(e)

		o(spy.callCount).equals(0)
	})

	o("removes EventListener object when null", function() {
		var spy = o.spy()
		var listener = {handleEvent: spy}
		var vnode = m("a", {onclick: listener})
		var updated = m("a", {onclick: null})

		render(root, [vnode])
		render(root, [updated])

		var e = $window.document.createEvent("MouseEvents")
		e.initEvent("click", true, true)
		vnode.dom.dispatchEvent(e)

		o(spy.callCount).equals(0)
	})

	o("removes EventListener object when undefined", function() {
		var spy = o.spy()
		var listener = {handleEvent: spy}
		var vnode = m("a", {onclick: listener})
		var updated = m("a", {onclick: undefined})

		render(root, [vnode])
		render(root, [updated])

		var e = $window.document.createEvent("MouseEvents")
		e.initEvent("click", true, true)
		vnode.dom.dispatchEvent(e)

		o(spy.callCount).equals(0)
	})

	o("fires onclick only once after redraw", function() {
		var spy = o.spy()
		var div = m("div", {id: "a", onclick: spy})
		var updated = m("div", {id: "b", onclick: spy})
		var e = $window.document.createEvent("MouseEvents")
		e.initEvent("click", true, true)

		render(root, [div])
		render(root, [updated])
		div.dom.dispatchEvent(e)

		o(spy.callCount).equals(1)
		o(spy.this).equals(div.dom)
		o(spy.args[0].type).equals("click")
		o(spy.args[0].target).equals(div.dom)
		o(onevent.callCount).equals(1)
		o(onevent.this).equals(div.dom)
		o(onevent.args[0].type).equals("click")
		o(onevent.args[0].target).equals(div.dom)
		o(div.dom).equals(updated.dom)
		o(div.dom.attributes["id"].value).equals("b")
	})

	o("fires click EventListener object only once after redraw", function() {
		var spy = o.spy()
		var listener = {handleEvent: spy}
		var div = m("div", {id: "a", onclick: listener})
		var updated = m("div", {id: "b", onclick: listener})
		var e = $window.document.createEvent("MouseEvents")
		e.initEvent("click", true, true)

		render(root, [div])
		render(root, [updated])
		div.dom.dispatchEvent(e)

		o(spy.callCount).equals(1)
		o(spy.this).equals(listener)
		o(spy.args[0].type).equals("click")
		o(spy.args[0].target).equals(div.dom)
		o(onevent.callCount).equals(1)
		o(onevent.this).equals(div.dom)
		o(onevent.args[0].type).equals("click")
		o(onevent.args[0].target).equals(div.dom)
		o(div.dom).equals(updated.dom)
		o(div.dom.attributes["id"].value).equals("b")
	})

	o("handles ontransitionend", function() {
		var spy = o.spy()
		var div = m("div", {ontransitionend: spy})
		var e = $window.document.createEvent("HTMLEvents")
		e.initEvent("transitionend", true, true)

		render(root, [div])
		div.dom.dispatchEvent(e)

		o(spy.callCount).equals(1)
		o(spy.this).equals(div.dom)
		o(spy.args[0].type).equals("transitionend")
		o(spy.args[0].target).equals(div.dom)
		o(onevent.callCount).equals(1)
		o(onevent.this).equals(div.dom)
		o(onevent.args[0].type).equals("transitionend")
		o(onevent.args[0].target).equals(div.dom)
	})

	o("handles transitionend EventListener object", function() {
		var spy = o.spy()
		var listener = {handleEvent: spy}
		var div = m("div", {ontransitionend: listener})
		var e = $window.document.createEvent("HTMLEvents")
		e.initEvent("transitionend", true, true)

		render(root, [div])
		div.dom.dispatchEvent(e)

		o(spy.callCount).equals(1)
		o(spy.this).equals(listener)
		o(spy.args[0].type).equals("transitionend")
		o(spy.args[0].target).equals(div.dom)
		o(onevent.callCount).equals(1)
		o(onevent.this).equals(div.dom)
		o(onevent.args[0].type).equals("transitionend")
		o(onevent.args[0].target).equals(div.dom)
	})
})
