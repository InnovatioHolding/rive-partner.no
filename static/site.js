! function(t) {
    function e(i) {
        if (n[i]) return n[i].exports;
        var o = n[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return t[i].call(o.exports, o, o.exports, e), o.l = !0, o.exports
    }
    var n = {};
    e.m = t, e.c = n, e.d = function(t, n, i) {
        e.o(t, n) || Object.defineProperty(t, n, {
            configurable: !1,
            enumerable: !0,
            get: i
        })
    }, e.n = function(t) {
        var n = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return e.d(n, "a", n), n
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, e.p = "", e(e.s = 6)
}([function(t, e, n) {
    t.exports = n(7)
}, function(t, e) {
    function n(t, e, n) {
        for (var i, o;
            (i = n) && (n = n.next);)(o = n.listener) && (n.path && o[n.path] ? e ? o[n.path].apply(o, e) : o[n.path]() : e ? o.apply(n, e) : o.call(n)), n.times && --n.times <= 0 && (i.next = n.next, n.listener = null)
    }
    var i = {
        VERSION: "1.3.3"
    };
    i.setTimeout = function(t, e) {
        return setTimeout(function() {
            return e(), i.commit()
        }, t)
    }, i.setInterval = function(t, e) {
        return setInterval(e, t)
    }, i.clearInterval = function(t) {
        return clearInterval(t)
    }, i.clearTimeout = function(t) {
        return clearTimeout(t)
    }, i.subclass = function(t, e) {
        for (var n in e) {
            var i;
            i = e[n], e.hasOwnProperty(n) && (t[n] = i)
        }
        return t.prototype = Object.create(e.prototype), t.__super__ = t.prototype.__super__ = e.prototype, t.prototype.initialize = t.prototype.constructor = t, t
    }, i.iterable = function(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }, i.await = function(t) {
        return t instanceof Array ? (console.warn("await (Array) is deprecated - use await Promise.all(Array)"), Promise.all(t)) : t && t.then ? t : Promise.resolve(t)
    };
    var o = /-./g,
        r = {};
    i.toCamelCase = function(t) {
        return t.indexOf("-") >= 0 ? t.replace(o, function(t) {
            return t.charAt(1).toUpperCase()
        }) : t
    }, i.toSetter = function(t) {
        return r[t] || (r[t] = i.toCamelCase("set-" + t))
    }, i.indexOf = function(t, e) {
        return e && e.indexOf ? e.indexOf(t) : [].indexOf.call(t, e)
    }, i.len = function(t) {
        return t && (t.len instanceof Function ? t.len.call(t) : t.length) || 0
    }, i.prop = function(t, e, n) {
        if (t.defineProperty) return t.defineProperty(e, n)
    }, i.attr = function(t, e, n) {
        if (void 0 === n && (n = {}), t.defineAttribute) return t.defineAttribute(e, n);
        var o = i.toCamelCase(e),
            r = i.toCamelCase("set-" + e),
            s = t.prototype;
        n.dom ? (s[o] = function() {
            return this.dom()[e]
        }, s[r] = function(t) {
            return t != this[e]() && (this.dom()[e] = t), this
        }) : (s[o] = function() {
            return this.getAttribute(e)
        }, s[r] = function(t) {
            return this.setAttribute(e, t), this
        })
    }, i.propDidSet = function(t, e, n, i) {
        var o = e.watch;
        o instanceof Function ? o.call(t, n, i, e) : ("string" == typeof o || o instanceof String) && t[o] && t[o](n, i, e)
    }, i.listen = function(t, e, n, i) {
        var o, r, s;
        return o = t.__listeners__ || (t.__listeners__ = {}), r = o[e] || (o[e] = {}), s = r.tail || (r.tail = r.next = {}), s.listener = n, s.path = i, r.tail = s.next = {}, s
    }, i.once = function(t, e, n) {
        var o = i.listen(t, e, n);
        return o.times = 1, o
    }, i.unlisten = function(t, e, n, i) {
        var o, r, s = t.__listeners__;
        if (s && (o = s[e]))
            for (;
                (r = o) && (o = o.next);)
                if (o == n || o.listener == n) {
                    r.next = o.next, o.listener = null;
                    break
                }
    }, i.emit = function(t, e, i) {
        var o;
        (o = t.__listeners__) && (o[e] && n(e, i, o[e]), o.all && n(e, [e, i], o.all))
    }, i.observeProperty = function(t, e, n, o, r) {
        return r && "object" == typeof r && i.unlisten(r, "all", t, n), o && "object" == typeof o && i.listen(o, "all", t, n), this
    }, t.exports = i
}, function(t, e, n) {
    function i(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }

    function o(t, e) {
        void 0 === e && (e = {}), this._node = t, this._node._layout = this, this.setup(e), t.flag("layout"), this._name && t.setFlag("layout", "l-" + this._name)
    }
    var r = n(0);
    e.Layout = o;
    var s = {};
    o.register = function(t) {
        return s[t] = this, this._name = t, this.prototype._name = t, this
    }, o.lookup = function(t) {
        return s[t]
    }, o.forNode = function(t) {
        return t._layout || (t._layout = new this(t))
    }, o.wakeAll = function() {
        for (var t = 0, e = i(document.querySelectorAll("[data-layout]")), n = e.length; t < n; t++) this.wake(r.getTagForDom(e[t]));
        return this
    }, o.wake = function(t) {
        var e = t.dataset("layout"),
            n = s[e];
        if (t._layout) {
            if (t._layout instanceof n) return t;
            t._layout.teardown(), t._layout = null
        }
        return n && n.forNode(t).mark(), this
    }, o.prototype.node = function(t) {
        return this._node
    }, o.prototype.setNode = function(t) {
        return this._node = t, this
    }, o.prototype.mark = function() {
        return this._marked = !0, this
    }, o.prototype.body = function() {
        return this._options.body || this.node()
    }, o.prototype.setup = function(t) {
        return this._options = t, this
    }, o.prototype.reflow = function() {
        return this
    }, o.prototype.enter = function() {
        return this
    }, o.prototype.leave = function() {
        return this
    }, o.prototype.log = function() {
        for (var t = arguments, e = t.length, n = new Array(e > 0 ? e : 0); e > 0;) n[e - 1] = t[--e];
        return console.log.apply(console, n), this
    }, o.prototype.teardown = function() {
        return this
    }
}, function(t, e, n) {
    var i = n(1);
    i.Pointer = function() {
        return this._button = -1, this._event = {
            x: 0,
            y: 0,
            type: "uninitialized"
        }, this
    }, i.Pointer.prototype.button = function() {
        return this._button
    }, i.Pointer.prototype.touch = function() {
        return this._touch
    }, i.Pointer.prototype.update = function(t) {
        return this._event = t, this._dirty = !0, this
    }, i.Pointer.prototype.process = function() {
        var t = this._event;
        if (this._dirty)
            if (this._prevEvent = t, this._dirty = !1, "mousedown" == t.type) {
                if (this._button = t.button, this._touch && 0 != this._button) return;
                this._touch && this._touch.cancel(), this._touch = new i.Touch(t, this), this._touch.mousedown(t, t)
            } else "mousemove" == t.type ? this._touch && this._touch.mousemove(t, t) : "mouseup" == t.type && (this._button = -1, this._touch && this._touch.button() == t.button && (this._touch.mouseup(t, t), this._touch = null));
        else this._touch && this._touch.idle();
        return this
    }, i.Pointer.prototype.x = function() {
        return this._event.x
    }, i.Pointer.prototype.y = function() {
        return this._event.y
    }
}, function(t, e, n) {
    function i(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }

    function o(t) {
        return t && (t.len instanceof Function ? t.len() : t.length) || 0
    }

    function r() {
        return a.apply(this, arguments)
    }
    var s = n(0),
        a = n(2).Layout;
    s.subclass(r, a), e.TilesLayout = r, r.register("tiles");
    var u = ["xs", "s", "m", "l", "xl"];
    r.prototype.__cols = {
        watch: "colsDidSet",
        name: "cols"
    }, r.prototype.cols = function(t) {
        return this._cols
    }, r.prototype.setCols = function(t) {
        var e = this.cols();
        return t != e && (this._cols = t), t != e && this.colsDidSet && this.colsDidSet(t, e, this.__cols), this
    }, r.prototype.__minWidth = {
        default: 240,
        name: "minWidth"
    }, r.prototype.minWidth = function(t) {
        return this._minWidth
    }, r.prototype.setMinWidth = function(t) {
        return this._minWidth = t, this
    }, r.prototype._minWidth = 240, r.prototype.__scale = {
        default: 0,
        name: "scale"
    }, r.prototype.scale = function(t) {
        return this._scale
    }, r.prototype.setScale = function(t) {
        return this._scale = t, this
    }, r.prototype._scale = 0, r.prototype.colsDidSet = function(t, e) {
        if (e && this.node().unflag("cw" + e), t) return this.node().flag("cw" + t)
    }, r.prototype.setup = function() {
        return r.__super__.setup.apply(this, arguments), this
    }, r.prototype.mark = function() {
        return this.reflow()
    }, r.prototype.reflow = function() {
        this.node().flag("reflowed");
        for (var t = this.minWidth(), e = this.node().dom().offsetWidth / (this._scale || Hue.Scale), n = this.node().children(), r = o(n), s = r, a = 0; s > 1 && (a = r % s, !(e / s > t && (0 == a || a > .5 * s)));) s--;
        for (var h, p = 0, l = i(n), c = l.length; p < c; p++) {
            h = l[p];
            var d = p < a ? a : s,
                f = e / d,
                y = 0;
            y = f < 300 ? 0 : f < 450 ? 1 : f < 550 ? 2 : f < 800 ? 3 : 4, h.setFlag("cols", "c" + d), h.setFlag("size", u[y])
        }
        return this
    }
}, function(t, e) {
    function n(t, e) {
        var n = this;
        n._target = t, n._path = e, n._time = 0, n._timeout = null, n._trigger = function() {
            return n.trigger()
        }
    }
    e.Delay = n, n.prototype.data = function(t) {
        return this._data
    }, n.prototype.setData = function(t) {
        return this._data = t, this
    }, n.prototype.delay = function(t) {
        var e = Date.now() + t;
        return this._timeout && e >= this._time ? this._time = e : (this._time = e, this._timeout && clearTimeout(this._timeout), this._timeout = setTimeout(this._trigger, t)), this
    }, n.prototype.cancel = function() {
        return clearTimeout(this._timeout), this._timeout = null, this
    }, n.prototype.trigger = function() {
        if (this._timeout = null, this._time) {
            var t = this._time - Date.now();
            if (t > 3) return this.delay(t)
        }
        return this._target[this._path](this), this
    }
}, function(t, e, n) {
    function i(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }
    var o, r = n(0);
    n(17), n(18), n(19), Hue.WS = window.WebSocket || window.MozWebSocket, Hue.Data = BUNDLE, (o = Hue.Data).cache || (o.cache = {}), Hue.Scale = 1, Hue.Host = "", Hue.IsWebKit = window.navigator.userAgent.match(/Blink|WebKit/), CSSPlugin.defaultForce3D = !0, n(61), r.extendTag("element", function(t) {
        t.prototype.site = function() {
            return PAGE.site
        }
    }), r.extendTag("a", function(t) {
        t.prototype.ontap = function(t) {
            var e = this.href(),
                n = e && e.match(/^#(.+)$/);
            if (!n) return t.setResponder(null), t.stop();
            t.stop().cancel();
            var i = n.slice(1),
                o = document.getElementById(i),
                s = o && r.getTagForDom(o.parentNode);
            return s ? s.scrollIntoView() : void 0
        }
    });
    try {
        Page = document.querySelector("._hue-page")
    } catch (t) {}
    Page && (Page = new r.TAGS["hue-page"](Page, null));
    var s = document.location;
    if (("#live" == s.hash || s.hostname.match(/(\d{9})\./)) && (Hue.Live = !0), Page) {
        Page.deserialize(Hue.getBlock(Hue.Data.root)), Page.reawaken(), Page.refresh();
        var a = window.innerWidth;
        if (window.addEventListener("resize", function(t) {
                var e = window.innerWidth;
                if (e != a) return a = e, Head.refresh(), Page.resized(t)
            }, !1), window.addEventListener("scroll", function(t) {
                return Page.scrolled(t)
            }, !1), Page.reflow(), document.addSelectorListener("[data-layout]", function(t) {
                return LAYOUTS.Layout.wake(r.getTagForDom(t.target))
            }), window.addEventListener("load", function(t) {
                return Page.loaded()
            }), LAYOUTS.Layout.wakeAll(), HueInitMap = function(t) {
                for (var e = [], n = 0, o = i(document.querySelectorAll("._hue-map")), r = o.length; n < r; n++) e.push(o[n]._tag.construct());
                return e
            }, window.HueMapInited && HueInitMap(), window.setTimeout(function() {
                return window.location.reload()
            }, 9e5), Hue.Live) {
            var u = Hue.Socket = new Hue.WS("ws://" + document.location.hostname + "/ws"),
                h = function(t) {
                    return Hue.Data = t, Page.deserialize(Hue.getBlock(t.root))
                };
            u.onopen = function(t) {
                console.log("socket open");
                var e = {
                    type: "visit",
                    data: {
                        siteId: Hue.Data.siteId,
                        ua: window.navigator.userAgent
                    }
                };
                return this.send(JSON.stringify(e)), this
            }, u.onmessage = function(t) {
                var e;
                try {
                    var n = JSON.parse(t.data);
                    if ("bundle" == n.type) return (e = n.bundle).cache || (e.cache = {}), h(n.bundle)
                } catch (t) {}
            }, setInterval(function() {
                var t = {
                    siteId: Hue.Data.siteId,
                    version: Hue.Data.VERSION
                };
                return Hue.Socket.send(JSON.stringify(t))
            }, 500)
        }
    }
}, function(t, e, n) {
    var i = n(1),
        o = !1;
    "undefined" != typeof window && (window.Imba ? (console.warn("Imba v" + window.Imba.VERSION + " is already loaded."), i = window.Imba) : (window.Imba = i, o = !0, window.define && window.define.amd && window.define("imba", [], function() {
        return i
    }))), t.exports = i, n(8), n(9), o && i.EventManager.activate()
}, function(t, e, n) {
    function i(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }

    function o() {
        var t = this;
        t._queue = [], t._stage = -1, t._scheduled = !1, t._ticker = function(e) {
            return t._scheduled = !1, t.tick(e)
        }
    }
    var r, s, a = n(1);
    s = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitRequestAnimationFrame, r = window.requestAnimationFrame, r || (r = window.webkitRequestAnimationFrame), r || (r = window.mozRequestAnimationFrame), r || (r = function(t) {
        return setTimeout(t, 1e3 / 60)
    }), o.prototype.stage = function(t) {
        return this._stage
    }, o.prototype.setStage = function(t) {
        return this._stage = t, this
    }, o.prototype.queue = function(t) {
        return this._queue
    }, o.prototype.setQueue = function(t) {
        return this._queue = t, this
    }, o.prototype.add = function(t, e) {
        if ((e || -1 == this._queue.indexOf(t)) && this._queue.push(t), !this._scheduled) return this.schedule()
    }, o.prototype.tick = function(t) {
        var e = this._queue;
        if (this._ts || (this._ts = t), this._dt = t - this._ts, this._ts = t, this._queue = [], this._stage = 1, this.before(), e.length)
            for (var n, o = 0, r = i(e), s = r.length; o < s; o++) n = r[o], n instanceof Function ? n(this._dt, this) : n.tick && n.tick(this._dt, this);
        return this._stage = 2, this.after(), this._stage = this._scheduled ? 0 : -1, this
    }, o.prototype.schedule = function() {
        return this._scheduled || (this._scheduled = !0, -1 == this._stage && (this._stage = 0), r(this._ticker)), this
    }, o.prototype.before = function() {
        return this
    }, o.prototype.after = function() {
        return a.TagManager && a.TagManager.refresh(), this
    }, a.TICKER = new o, a.SCHEDULERS = [], a.ticker = function() {
        return a.TICKER
    }, a.requestAnimationFrame = function(t) {
        return r(t)
    }, a.cancelAnimationFrame = function(t) {
        return s(t)
    };
    var u = 0;
    a.commit = function(t) {
        u++, a.emit(a, "commit", void 0 != t ? [t] : void 0), 0 == --u && a.TagManager && a.TagManager.refresh()
    }, a.Scheduler = function(t) {
        var e = this;
        e._id = h++, e._target = t, e._marked = !1, e._active = !1, e._marker = function() {
            return e.mark()
        }, e._ticker = function(t) {
            return e.tick(t)
        }, e._dt = 0, e._frame = {}, e._scheduled = !1, e._timestamp = 0, e._ticks = 0, e._flushes = 0, e.onevent = e.onevent.bind(e)
    };
    var h = 0;
    a.Scheduler.event = function(t) {
        return a.emit(a, "event", t)
    }, a.Scheduler.prototype.__raf = {
        watch: "rafDidSet",
        name: "raf"
    }, a.Scheduler.prototype.raf = function(t) {
        return this._raf
    }, a.Scheduler.prototype.setRaf = function(t) {
        var e = this.raf();
        return t != e && (this._raf = t), t != e && this.rafDidSet && this.rafDidSet(t, e, this.__raf), this
    }, a.Scheduler.prototype.__interval = {
        watch: "intervalDidSet",
        name: "interval"
    }, a.Scheduler.prototype.interval = function(t) {
        return this._interval
    }, a.Scheduler.prototype.setInterval = function(t) {
        var e = this.interval();
        return t != e && (this._interval = t), t != e && this.intervalDidSet && this.intervalDidSet(t, e, this.__interval), this
    }, a.Scheduler.prototype.__events = {
        watch: "eventsDidSet",
        name: "events"
    }, a.Scheduler.prototype.events = function(t) {
        return this._events
    }, a.Scheduler.prototype.setEvents = function(t) {
        var e = this.events();
        return t != e && (this._events = t), t != e && this.eventsDidSet && this.eventsDidSet(t, e, this.__events), this
    }, a.Scheduler.prototype.marked = function(t) {
        return this._marked
    }, a.Scheduler.prototype.setMarked = function(t) {
        return this._marked = t, this
    }, a.Scheduler.prototype.rafDidSet = function(t) {
        return t && this._active && this.requestTick(), this
    }, a.Scheduler.prototype.intervalDidSet = function(t) {
        return clearInterval(this._intervalId), this._intervalId = null, t && this._active && (this._intervalId = setInterval(this.oninterval.bind(this), t)), this
    }, a.Scheduler.prototype.eventsDidSet = function(t, e) {
        return this._active && t && !e ? a.listen(a, "commit", this, "onevent") : !t && e ? a.unlisten(a, "commit", this, "onevent") : void 0
    }, a.Scheduler.prototype.active = function() {
        return this._active
    }, a.Scheduler.prototype.dt = function() {
        return this._dt
    }, a.Scheduler.prototype.configure = function(t) {
        return void 0 === t && (t = {}), void 0 != t.raf && this.setRaf(t.raf), void 0 != t.interval && this.setInterval(t.interval), void 0 != t.events && this.setEvents(t.events), this
    }, a.Scheduler.prototype.mark = function() {
        return this._marked = !0, this._scheduled || this.requestTick(), this
    }, a.Scheduler.prototype.flush = function() {
        return this._flushes++, this._target.tick(this), this._marked = !1, this
    }, a.Scheduler.prototype.tick = function(t, e) {
        return this._ticks++, this._dt = t, e && (this._scheduled = !1), this.flush(), this._raf && this._active && this.requestTick(), this
    }, a.Scheduler.prototype.requestTick = function() {
        return this._scheduled || (this._scheduled = !0, a.TICKER.add(this)), this
    }, a.Scheduler.prototype.activate = function(t) {
        return void 0 === t && (t = !0), this._active || (this._active = !0, this._commit = this._target.commit, this._target.commit = function() {
            return this
        }, this._target && this._target.flag && this._target.flag("scheduled_"), a.SCHEDULERS.push(this), this._events && a.listen(a, "commit", this, "onevent"), this._interval && !this._intervalId && (this._intervalId = setInterval(this.oninterval.bind(this), this._interval)), t ? this.tick(0) : this._raf && this.requestTick()), this
    }, a.Scheduler.prototype.deactivate = function() {
        if (this._active) {
            this._active = !1, this._target.commit = this._commit;
            var t = a.SCHEDULERS.indexOf(this);
            t >= 0 && a.SCHEDULERS.splice(t, 1), this._events && a.unlisten(a, "commit", this, "onevent"), this._intervalId && (clearInterval(this._intervalId), this._intervalId = null), this._target && this._target.unflag && this._target.unflag("scheduled_")
        }
        return this
    }, a.Scheduler.prototype.track = function() {
        return this._marker
    }, a.Scheduler.prototype.oninterval = function() {
        return this.tick(), a.TagManager.refresh(), this
    }, a.Scheduler.prototype.onevent = function(t) {
        return !this._events || this._marked ? this : (this._events instanceof Function ? this._events(t, this) && this.mark() : this._events instanceof Array ? this._events.indexOf(t && t.type || t) >= 0 && this.mark() : this.mark(), this)
    }
}, function(t, e, n) {
    var i = n(1);
    n(10), n(11), i.TagManager = new i.TagManagerClass, n(12), n(13), n(3), n(14), n(15), n(16)
}, function(t, e, n) {
    function i(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }
    var o = n(1);
    o.TagManagerClass = function() {
        this._inserts = 0, this._removes = 0, this._mounted = [], this._mountables = 0, this._unmountables = 0
    }, o.TagManagerClass.prototype.mounted = function() {
        return this._mounted
    }, o.TagManagerClass.prototype.insert = function(t, e) {
        this._inserts++, t && t.mount && (t.FLAGS & o.TAG_MOUNTABLE || (t.FLAGS |= o.TAG_MOUNTABLE, this._mountables++))
    }, o.TagManagerClass.prototype.remove = function(t, e) {
        return this._removes++
    }, o.TagManagerClass.prototype.changes = function() {
        return this._inserts + this._removes
    }, o.TagManagerClass.prototype.mount = function(t) {}, o.TagManagerClass.prototype.refresh = function(t) {
        if (void 0 === t && (t = !1), t || 0 != this.changes()) return (this._inserts && this._mountables > this._mounted.length || t) && this.tryMount(), (this._removes || t) && this._mounted.length && this.tryUnmount(), this._inserts = 0, this._removes = 0, this
    }, o.TagManagerClass.prototype.unmount = function(t) {
        return this
    }, o.TagManagerClass.prototype.tryMount = function() {
        for (var t, e = document.body, n = e.querySelectorAll(".__mount"), o = 0, r = i(n), s = r.length; o < s; o++)(t = r[o]) && t._tag && -1 == this._mounted.indexOf(t._tag) && this.mountNode(t._tag);
        return this
    }, o.TagManagerClass.prototype.mountNode = function(t) {
        if (-1 == this._mounted.indexOf(t)) {
            this._mounted.push(t), t.FLAGS |= o.TAG_MOUNTED, t.mount && t.mount();
            for (var e = t.dom().parentNode; e && e._tag && !e._tag.mount && !(e._tag.FLAGS & o.TAG_MOUNTABLE);) e._tag.FLAGS |= o.TAG_MOUNTABLE, e = e.parentNode
        }
    }, o.TagManagerClass.prototype.tryUnmount = function() {
        for (var t, e = 0, n = (document.body, 0), r = i(this._mounted), s = r.length; n < s; n++) t = r[n], document.documentElement.contains(t._dom) || (t.FLAGS = t.FLAGS & ~o.TAG_MOUNTED, t.unmount && t._dom ? t.unmount() : t._scheduler && t.unschedule(), this._mounted[n] = null, e++);
        return e && (this._mounted = this._mounted.filter(function(t) {
            return t
        })), this
    }
}, function(t, e, n) {
    function i(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }
    var o = n(1);
    n(3);
    var r = ["keydown", "keyup", "keypress", "textInput", "input", "change", "submit", "focusin", "focusout", "focus", "blur", "contextmenu", "selectstart", "dblclick", "mousewheel", "wheel", "scroll", "beforecopy", "copy", "beforepaste", "paste", "beforecut", "cut", "dragstart", "drag", "dragend", "dragenter", "dragover", "dragleave", "dragexit", "drop", "mouseup", "mousedown", "mouseenter", "mouseleave", "mouseout", "mouseover", "mousemove"];
    o.EventManager = function(t, e) {
        var n = this;
        e && e.constructor === Object || (e = {});
        var o = void 0 !== e.events ? e.events : [];
        n._shimFocusEvents = window.netscape && void 0 === t.onfocusin, n.setRoot(t), n.setListeners([]), n.setDelegators({}), n.setDelegator(function(t) {
            return n.delegate(t), !0
        });
        for (var r = 0, s = i(o), a = s.length; r < a; r++) n.register(s[r]);
        return n
    }, o.EventManager.prototype.root = function(t) {
        return this._root
    }, o.EventManager.prototype.setRoot = function(t) {
        return this._root = t, this
    }, o.EventManager.prototype.count = function(t) {
        return this._count
    }, o.EventManager.prototype.setCount = function(t) {
        return this._count = t, this
    }, o.EventManager.prototype.__enabled = {
        default: !1,
        watch: "enabledDidSet",
        name: "enabled"
    }, o.EventManager.prototype.enabled = function(t) {
        return this._enabled
    }, o.EventManager.prototype.setEnabled = function(t) {
        var e = this.enabled();
        return t != e && (this._enabled = t), t != e && this.enabledDidSet && this.enabledDidSet(t, e, this.__enabled), this
    }, o.EventManager.prototype._enabled = !1, o.EventManager.prototype.listeners = function(t) {
        return this._listeners
    }, o.EventManager.prototype.setListeners = function(t) {
        return this._listeners = t, this
    }, o.EventManager.prototype.delegators = function(t) {
        return this._delegators
    }, o.EventManager.prototype.setDelegators = function(t) {
        return this._delegators = t, this
    }, o.EventManager.prototype.delegator = function(t) {
        return this._delegator
    }, o.EventManager.prototype.setDelegator = function(t) {
        return this._delegator = t, this
    };
    var s = [];
    o.EventManager.prototype.enabledDidSet = function(t) {
        return t ? this.onenable() : this.ondisable(), this
    }, o.EventManager.bind = function(t) {
        return o.Events ? o.Events.autoregister(t) : -1 == s.indexOf(t) && r.indexOf(t) >= 0 ? s.push(t) : void 0
    }, o.EventManager.activate = function() {
        return o.Events ? o.Events : (o.POINTER || (o.POINTER = new o.Pointer), o.Events = new o.EventManager(o.document(), {
            events: []
        }), window && void 0 !== window.ontouchstart && (o.Events.listen("touchstart", function(t) {
            return o.Touch.ontouchstart(t)
        }), o.Events.listen("touchmove", function(t) {
            return o.Touch.ontouchmove(t)
        }), o.Events.listen("touchend", function(t) {
            return o.Touch.ontouchend(t)
        }), o.Events.listen("touchcancel", function(t) {
            return o.Touch.ontouchcancel(t)
        })), o.Events.register("click", function(t) {
            if (t.timeStamp - o.Touch.LastTimestamp > o.Touch.TapTimeout) {
                t._imbaSimulatedTap = !0;
                var e = new o.Event(t);
                if (e.setType("tap"), e.process(), e._responder) return t.preventDefault()
            }
            return o.Events.delegate(t)
        }), o.Events.listen("mousedown", function(t) {
            if (t.timeStamp - o.Touch.LastTimestamp > o.Touch.TapTimeout && o.POINTER) return o.POINTER.update(t).process()
        }), o.Events.listen("mouseup", function(t) {
            if (t.timeStamp - o.Touch.LastTimestamp > o.Touch.TapTimeout && o.POINTER) return o.POINTER.update(t).process()
        }), o.Events.register(["mousedown", "mouseup"]), o.Events.register(s), o.Events.setEnabled(!0), o.Events)
    }, o.EventManager.prototype.register = function(t, e) {
        if (void 0 === e && (e = !0), t instanceof Array) {
            for (var n = 0, o = i(t), r = o.length; n < r; n++) this.register(o[n], e);
            return this
        }
        if (this.delegators()[t]) return this;
        var s = this.delegators()[t] = e instanceof Function ? e : this.delegator();
        return this.enabled() ? this.root().addEventListener(t, s, !0) : void 0
    }, o.EventManager.prototype.autoregister = function(t) {
        return -1 == r.indexOf(t) ? this : this.register(t)
    }, o.EventManager.prototype.listen = function(t, e, n) {
        return void 0 === n && (n = !0), this.listeners().push([t, e, n]), this.enabled() && this.root().addEventListener(t, e, n), this
    }, o.EventManager.prototype.delegate = function(t) {
        return o.Event.wrap(t).process(), this._shimFocusEvents && ("focus" == t.type ? o.Event.wrap(t).setType("focusin").process() : "blur" == t.type && o.Event.wrap(t).setType("focusout").process()), this
    }, o.EventManager.prototype.create = function(t, e, n) {
        n && n.constructor === Object || (n = {});
        var i = void 0 !== n.data ? n.data : null,
            r = void 0 !== n.source ? n.source : null,
            s = o.Event.wrap({
                type: t,
                target: e
            });
        return i && s.setData(i), r && s.setSource(r), s
    }, o.EventManager.prototype.trigger = function() {
        return this.create.apply(this, arguments).process()
    }, o.EventManager.prototype.onenable = function() {
        for (var t, e, n = this.delegators(), r = 0, s = Object.keys(n), a = s.length; r < a; r++) e = s[r], t = n[e], this.root().addEventListener(e, t, !0);
        for (var u, h = 0, p = i(this.listeners()), l = p.length; h < l; h++) u = p[h], this.root().addEventListener(u[0], u[1], u[2]);
        return window.addEventListener("hashchange", o.commit), window.addEventListener("popstate", o.commit), this
    }, o.EventManager.prototype.ondisable = function() {
        for (var t, e, n = this.delegators(), r = 0, s = Object.keys(n), a = s.length; r < a; r++) e = s[r], t = n[e], this.root().removeEventListener(e, t, !0);
        for (var u, h = 0, p = i(this.listeners()), l = p.length; h < l; h++) u = p[h], this.root().removeEventListener(u[0], u[1], u[2]);
        return window.removeEventListener("hashchange", o.commit), window.removeEventListener("popstate", o.commit), this
    }
}, function(t, e, n) {
    function i(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }

    function o(t, e) {
        for (var n, i, o = 0, r = Object.keys(e), s = r.length; o < s; o++) i = r[o], n = e[i], null == t[i] ? t[i] = n : t[i];
        return t.prototype = Object.create(e.prototype), t.__super__ = t.prototype.__super__ = e.prototype, t.prototype.constructor = t, e.inherit && e.inherit(t), t
    }

    function r() {
        return function(t, e) {
            return this.initialize(t, e), this
        }
    }

    function s(t) {
        this._tag = t
    }

    function a(t, e, n) {
        this.cache$ = t, this.key$ = e, this.par$ = n, this.i$ = 0
    }
    var u = n(1);
    u.CSSKeyMap = {}, u.TAG_BUILT = 1, u.TAG_SETUP = 2, u.TAG_MOUNTING = 4, u.TAG_MOUNTED = 8, u.TAG_SCHEDULED = 16, u.TAG_AWAKENED = 32, u.TAG_MOUNTABLE = 64, u.document = function() {
        return window.document
    }, u.root = function() {
        return u.getTagForDom(u.document().body)
    }, u.static = function(t, e, n) {
        return t._type = e, t.static = n, t
    }, u.mount = function(t, e) {
        return e || (e = u.document().body), e.appendChild(t.dom()), u.TagManager.insert(t, e), t.scheduler().configure({
            events: !0
        }).activate(!1), u.TagManager.refresh(), t
    }, u.createTextNode = function(t) {
        return t && 3 == t.nodeType ? t : u.document().createTextNode(t)
    }, u.Tag = function(t, e) {
        this.setDom(t), this.$ = s.build(this), this.$up = this._owner_ = e, this._tree_ = null, this.FLAGS = 0, this.build()
    }, u.Tag.buildNode = function() {
        var t = u.document().createElement(this._nodeType || "div");
        if (this._classes) {
            var e = this._classes.join(" ");
            e && (t.className = e)
        }
        return t
    }, u.Tag.createNode = function() {
        return (this._protoDom || (this._protoDom = this.buildNode())).cloneNode(!1)
    }, u.Tag.build = function(t) {
        return new this(this.createNode(), t)
    }, u.Tag.dom = function() {
        return this._protoDom || (this._protoDom = this.buildNode())
    }, u.Tag.end = function() {
        return this.commit(0)
    }, u.Tag.inherit = function(t) {
        return t._protoDom = null, this._nodeType ? (t._nodeType = this._nodeType, t._classes = this._classes.slice(), t._flagName ? t._classes.push(t._flagName) : void 0) : (t._nodeType = t._name, t._flagName = null, t._classes = [])
    }, u.Tag.prototype.optimizeTagStructure = function() {
        var t = this.constructor,
            e = Object.keys(this);
        e.indexOf("mount") >= 0 && (t._classes && -1 == t._classes.indexOf("__mount") && t._classes.push("__mount"), t._protoDom && t._protoDom.classList.add("__mount"));
        for (var n, o = 0, r = i(e), s = r.length; o < s; o++) n = r[o], /^on/.test(n) && u.EventManager.bind(n.slice(2));
        return this
    }, u.attr(u.Tag, "name"), u.attr(u.Tag, "role"), u.attr(u.Tag, "tabindex"), u.Tag.prototype.title = function(t) {
        return this.getAttribute("title")
    }, u.Tag.prototype.setTitle = function(t) {
        return this.setAttribute("title", t), this
    }, u.Tag.prototype.dom = function() {
        return this._dom
    }, u.Tag.prototype.setDom = function(t) {
        return t._tag = this, this._dom = this._slot_ = t, this
    }, u.Tag.prototype.ref = function() {
        return this._ref
    }, u.Tag.prototype.root = function() {
        return this._owner_ ? this._owner_.root() : this
    }, u.Tag.prototype.ref_ = function(t) {
        return this.flag(this._ref = t), this
    }, u.Tag.prototype.setData = function(t) {
        return this._data = t, this
    }, u.Tag.prototype.data = function() {
        return this._data
    }, u.Tag.prototype.bindData = function(t, e, n) {
        return this.setData(n ? t[e].apply(t, n) : t[e])
    }, u.Tag.prototype.setHtml = function(t) {
        return this.html() != t && (this._dom.innerHTML = t), this
    }, u.Tag.prototype.html = function() {
        return this._dom.innerHTML
    }, u.Tag.prototype.on$ = function(t, e, n) {
        var i = this._on_ || (this._on_ = []),
            o = i[t];
        return t < 0 && (t = void 0 == o ? i[t] = i.length : o, o = i[t]), i[t] = e, o ? e.state = o.state : (e.state = {
            context: n
        }, u.EventManager.bind(e[0])), this
    }, u.Tag.prototype.setId = function(t) {
        return null != t && (this.dom().id = t), this
    }, u.Tag.prototype.id = function() {
        return this.dom().id
    }, u.Tag.prototype.setAttribute = function(t, e) {
        return this.dom().getAttribute(t) == e || (null != e && !1 !== e ? this.dom().setAttribute(t, e) : this.dom().removeAttribute(t)), this
    }, u.Tag.prototype.setNestedAttr = function(t, e, n) {
        return this[t + "SetAttribute"] ? this[t + "SetAttribute"](e, n) : this.setAttributeNS(t, e, n), this
    }, u.Tag.prototype.setAttributeNS = function(t, e, n) {
        return this.getAttributeNS(t, e) != n && (null != n && !1 !== n ? this.dom().setAttributeNS(t, e, n) : this.dom().removeAttributeNS(t, e)), this
    }, u.Tag.prototype.removeAttribute = function(t) {
        return this.dom().removeAttribute(t)
    }, u.Tag.prototype.getAttribute = function(t) {
        return this.dom().getAttribute(t)
    }, u.Tag.prototype.getAttributeNS = function(t, e) {
        return this.dom().getAttributeNS(t, e)
    }, u.Tag.prototype.set = function(t, e, n) {
        var i = u.toSetter(t);
        return this[i] instanceof Function ? this[i](e, n) : this._dom.setAttribute(t, e), this
    }, u.Tag.prototype.get = function(t) {
        return this._dom.getAttribute(t)
    }, u.Tag.prototype.setContent = function(t, e) {
        return this.setChildren(t, e), this
    }, u.Tag.prototype.setChildren = function(t, e) {
        return this._tree_ = t, this
    }, u.Tag.prototype.setTemplate = function(t) {
        return this._template || this.render == u.Tag.prototype.render && (this.render = this.renderTemplate), this.template = this._template = t, this
    }, u.Tag.prototype.template = function() {
        return null
    }, u.Tag.prototype.renderTemplate = function() {
        var t = this.template();
        return t != this && this.setChildren(t), this
    }, u.Tag.prototype.removeChild = function(t) {
        var e = this.dom(),
            n = t._slot_ || t;
        return n && n.parentNode == e && (u.TagManager.remove(n._tag || n, this), e.removeChild(n)), this
    }, u.Tag.prototype.removeAllChildren = function() {
        if (this._dom.firstChild)
            for (var t; t = this._dom.firstChild;) u.TagManager.remove(t._tag || t, this), this._dom.removeChild(t);
        return this._tree_ = this._text_ = null, this
    }, u.Tag.prototype.appendChild = function(t) {
        return "string" == typeof t || t instanceof String ? this.dom().appendChild(u.document().createTextNode(t)) : t && (this.dom().appendChild(t._slot_ || t), u.TagManager.insert(t._tag || t, this)), this
    }, u.Tag.prototype.insertBefore = function(t, e) {
        return ("string" == typeof t || t instanceof String) && (t = u.document().createTextNode(t)), t && e && (this.dom().insertBefore(t._slot_ || t, e._slot_ || e), u.TagManager.insert(t._tag || t, this)), this
    }, u.Tag.prototype.detachFromParent = function() {
        return this._slot_ == this._dom && (this._slot_ = this._dom._placeholder_ || (this._dom._placeholder_ = u.document().createComment("node")), this._slot_._tag || (this._slot_._tag = this), this._dom.parentNode && (u.TagManager.remove(this, this._dom.parentNode), this._dom.parentNode.replaceChild(this._slot_, this._dom))), this
    }, u.Tag.prototype.attachToParent = function() {
        if (this._slot_ != this._dom) {
            var t = this._slot_;
            this._slot_ = this._dom, t && t.parentNode && (u.TagManager.insert(this), t.parentNode.replaceChild(this._dom, t))
        }
        return this
    }, u.Tag.prototype.orphanize = function() {
        var t;
        return (t = this.parent()) && t.removeChild(this), this
    }, u.Tag.prototype.text = function(t) {
        return this._dom.textContent
    }, u.Tag.prototype.setText = function(t) {
        return this._tree_ = t, this._dom.textContent = null == t || !1 === this.text() ? "" : t, this
    }, u.Tag.prototype.dataset = function(t, e) {
        if (t instanceof Object) {
            for (var n, o, r = 0, s = Object.keys(t), a = s.length; r < a; r++) o = s[r], n = t[o], this.dataset(o, n);
            return this
        }
        if (2 == arguments.length) return this.setAttribute("data-" + t, e), this;
        if (t) return this.getAttribute("data-" + t);
        var h = this.dom().dataset;
        if (!h) {
            h = {};
            for (var p, l = 0, c = i(this.dom().attributes), d = c.length; l < d; l++) p = c[l], "data-" == p.name.substr(0, 5) && (h[u.toCamelCase(p.name.slice(5))] = p.value)
        }
        return h
    }, u.Tag.prototype.render = function() {
        return this
    }, u.Tag.prototype.build = function() {
        return this
    }, u.Tag.prototype.setup = function() {
        return this
    }, u.Tag.prototype.commit = function() {
        return !1 !== this.beforeRender() && this.render(), this
    }, u.Tag.prototype.beforeRender = function() {
        return this
    }, u.Tag.prototype.tick = function() {
        return !1 !== this.beforeRender() && this.render(), this
    }, u.Tag.prototype.end = function() {
        return this.setup(), this.commit(0), this.end = u.Tag.end, this
    }, u.Tag.prototype.$open = function(t) {
        return t != this._context_ && (this._tree_ = null, this._context_ = t), this
    }, u.Tag.prototype.synced = function() {
        return this
    }, u.Tag.prototype.awaken = function() {
        return this
    }, u.Tag.prototype.flags = function() {
        return this._dom.classList
    }, u.Tag.prototype.flag = function(t, e) {
        return 2 == arguments.length ? this._dom.classList.contains(t) != !!e && this._dom.classList.toggle(t) : this._dom.classList.contains(t) || this._dom.classList.add(t), this
    }, u.Tag.prototype.unflag = function(t) {
        return this._dom.classList.remove(t), this
    }, u.Tag.prototype.toggleFlag = function(t) {
        return this._dom.classList.toggle(t), this
    }, u.Tag.prototype.hasFlag = function(t) {
        return this._dom.classList.contains(t)
    }, u.Tag.prototype.flagIf = function(t, e) {
        var n = this._flags_ || (this._flags_ = {}),
            i = n[t];
        return e && !i ? (this._dom.classList.add(t), n[t] = !0) : i && !e && (this._dom.classList.remove(t), n[t] = !1), this
    }, u.Tag.prototype.setFlag = function(t, e) {
        var n = this._namedFlags_ || (this._namedFlags_ = {}),
            i = n[t];
        return i != e && (i && this.unflag(i), e && this.flag(e), n[t] = e), this
    }, u.Tag.prototype.scheduler = function() {
        return null == this._scheduler ? this._scheduler = new u.Scheduler(this) : this._scheduler
    }, u.Tag.prototype.schedule = function(t) {
        return void 0 === t && (t = {
            events: !0
        }), this.scheduler().configure(t).activate(), this
    }, u.Tag.prototype.unschedule = function() {
        return this._scheduler && this.scheduler().deactivate(), this
    }, u.Tag.prototype.parent = function() {
        return u.getTagForDom(this.dom().parentNode)
    }, u.Tag.prototype.children = function(t) {
        for (var e, n = [], o = 0, r = i(this._dom.children), s = r.length; o < s; o++) e = r[o], n.push(e._tag || u.getTagForDom(e));
        return n
    }, u.Tag.prototype.querySelector = function(t) {
        return u.getTagForDom(this._dom.querySelector(t))
    }, u.Tag.prototype.querySelectorAll = function(t) {
        for (var e = [], n = 0, o = i(this._dom.querySelectorAll(t)), r = o.length; n < r; n++) e.push(u.getTagForDom(o[n]));
        return e
    }, u.Tag.prototype.matches = function(t) {
        var e;
        return t instanceof Function ? t(this) : (t.query instanceof Function && (t = t.query()), (e = this._dom.matches || this._dom.matchesSelector || this._dom.webkitMatchesSelector || this._dom.msMatchesSelector || this._dom.mozMatchesSelector) ? e.call(this._dom, t) : void 0)
    }, u.Tag.prototype.closest = function(t) {
        return u.getTagForDom(this._dom.closest(t))
    }, u.Tag.prototype.contains = function(t) {
        return this.dom().contains(t._dom || t)
    }, u.Tag.prototype.log = function() {
        for (var t = arguments, e = t.length, n = new Array(e > 0 ? e : 0); e > 0;) n[e - 1] = t[--e];
        return n.unshift(console), Function.prototype.call.apply(console.log, n), this
    }, u.Tag.prototype.css = function(t, e) {
        if (t instanceof Object) {
            for (var n, i, o = 0, r = Object.keys(t), s = r.length; o < s; o++) i = r[o], n = t[i], this.css(i, n);
            return this
        }
        var a = u.CSSKeyMap[t] || t;
        if (null == e) this.dom().style.removeProperty(a);
        else {
            if (void 0 == e && 1 == arguments.length) return this.dom().style[a];
            ("number" == typeof e || e instanceof Number) && a.match(/width|height|left|right|top|bottom/) ? this.dom().style[a] = e + "px" : this.dom().style[a] = e
        }
        return this
    }, u.Tag.prototype.setStyle = function(t) {
        return this.setAttribute("style", t)
    }, u.Tag.prototype.style = function() {
        return this.getAttribute("style")
    }, u.Tag.prototype.trigger = function(t, e) {
        return void 0 === e && (e = {}), u.Events.trigger(t, this, {
            data: e
        })
    }, u.Tag.prototype.focus = function() {
        return this.dom().focus(), this
    }, u.Tag.prototype.blur = function() {
        return this.dom().blur(), this
    }, u.Tag.prototype.toString = function() {
        return this.dom().outerHTML
    }, u.Tag.prototype.initialize = u.Tag, u.SVGTag = function() {
        return u.Tag.apply(this, arguments)
    }, u.subclass(u.SVGTag, u.Tag), u.SVGTag.namespaceURI = function() {
        return "http://www.w3.org/2000/svg"
    }, u.SVGTag.buildNode = function() {
        var t = u.document().createElementNS(this.namespaceURI(), this._nodeType);
        if (this._classes) {
            var e = this._classes.join(" ");
            e && (t.className.baseVal = e)
        }
        return t
    }, u.SVGTag.inherit = function(t) {
        if (t._protoDom = null, u.indexOf(t._name, u.SVG_TAGS) >= 0 || this == u.SVGTag) return t._nodeType = t._name, t._classes = [];
        t._nodeType = this._nodeType;
        var e = "_" + t._name.replace(/_/g, "-");
        return t._classes = (this._classes || []).concat(e)
    }, u.HTML_TAGS = "a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr".split(" "), u.HTML_TAGS_UNSAFE = "article aside header section".split(" "), u.SVG_TAGS = "circle defs ellipse g line linearGradient mask path pattern polygon polyline radialGradient rect stop svg text tspan image".split(" "), u.HTML_ATTRS = {
        a: "href target hreflang media download rel type",
        form: "method action enctype autocomplete target",
        button: "autofocus type",
        input: "accept disabled form list max maxlength min pattern required size step type",
        label: "accesskey for form",
        img: "src srcset",
        link: "rel type href media",
        iframe: "referrerpolicy src srcdoc sandbox",
        meta: "property content charset desc",
        optgroup: "label",
        option: "label",
        output: "for form",
        object: "type data width height",
        param: "name value",
        progress: "max",
        script: "src type async defer crossorigin integrity nonce language",
        select: "size form multiple",
        textarea: "rows cols"
    }, u.HTML_PROPS = {
        input: "autofocus autocomplete autocorrect value placeholder required disabled multiple checked readOnly",
        textarea: "autofocus autocomplete autocorrect value placeholder required disabled multiple checked readOnly",
        form: "novalidate",
        fieldset: "disabled",
        button: "disabled",
        select: "autofocus disabled required",
        option: "disabled selected value",
        optgroup: "disabled",
        progress: "value",
        fieldset: "disabled",
        canvas: "width height"
    }, u.Tags = function() {}, u.Tags.prototype.__clone = function(t) {
        var e = Object.create(this);
        return e._parent = this, e
    }, u.Tags.prototype.ns = function(t) {
        return this["_" + t.toUpperCase()] || this.defineNamespace(t)
    }, u.Tags.prototype.defineNamespace = function(t) {
        var e = Object.create(this);
        return e._parent = this, e._ns = t, this["_" + t.toUpperCase()] = e, e
    }, u.Tags.prototype.baseType = function(t, e) {
        return u.indexOf(t, u.HTML_TAGS) >= 0 ? "element" : "div"
    }, u.Tags.prototype.defineTag = function(t, e, n) {
        void 0 == n && "function" == typeof e && (n = e, e = ""), void 0 == e && (e = ""), n && n._nodeType && (e = n, n = null), this[t] && console.log("tag already exists?", t);
        var i, s = t,
            a = s.indexOf(":");
        a >= 0 && (i = t.substr(0, a), s = t.substr(a + 1), "svg" != i || e || (e = "svg:element")), e || (e = this.baseType(t));
        var h = "string" == typeof e || e instanceof String ? this.findTagType(e) : e,
            p = r();
        return p._name = s, p._flagName = null, "#" == s[0] ? (u.SINGLETONS[s.slice(1)] = p, this[s] = p) : s[0] == s[0].toUpperCase() ? p._flagName = s : (p._flagName = "_" + t.replace(/[_\:]/g, "-"), this[t] = p), o(p, h), n && (n.call(p, p, p.TAGS || this), p.defined && p.defined(), this.optimizeTag(p)), p
    }, u.Tags.prototype.defineSingleton = function(t, e, n) {
        return this.defineTag(t, e, n)
    }, u.Tags.prototype.extendTag = function(t, e, n) {
        void 0 == n && "function" == typeof e && (n = e, e = ""), void 0 == e && (e = "");
        var i = "string" == typeof t || t instanceof String ? this.findTagType(t) : t;
        return n && n && n.call(i, i, i.prototype), i.extended && i.extended(), this.optimizeTag(i), i
    }, u.Tags.prototype.optimizeTag = function(t) {
        var e;
        return (e = t.prototype) && e.optimizeTagStructure && e.optimizeTagStructure()
    }, u.Tags.prototype.findTagType = function(t) {
        var e, n, o = this[t];
        if (!o)
            if ("svg:" == t.substr(0, 4)) o = this.defineTag(t, "svg:element");
            else if (u.HTML_TAGS.indexOf(t) >= 0) {
            if (o = this.defineTag(t, "element"), e = u.HTML_ATTRS[t])
                for (var r = 0, s = i(e.split(" ")), a = s.length; r < a; r++) u.attr(o, s[r]);
            if (n = u.HTML_PROPS[t])
                for (var h = 0, p = i(n.split(" ")), l = p.length; h < l; h++) u.attr(o, p[h], {
                    dom: !0
                })
        }
        return o
    }, u.Tags.prototype.createElement = function(t, e) {
        var n;
        return n = t instanceof Function ? t : this.findTagType(t), n.build(e)
    }, u.createElement = function(t, e, n, i) {
        var o, r = t;
        r = t instanceof Function ? t : u.TAGS.findTagType(t), o = e instanceof a ? e.par$ : i instanceof u.Tag ? i : e && void 0 != i ? e[i] : e && e._tag || e;
        var s = r.build(o);
        return e instanceof a && (e.i$++, s.$key = n), e && void 0 != n && (e[n] = s), s
    }, u.createTagCache = function(t) {
        var e = [];
        return e._tag = t, e
    }, u.createTagMap = function(t, e, n) {
        var i = void 0 != n ? n : t._tag,
            o = new a(t, e, i);
        return t[e] = o, o
    }, u.createTagList = function(t, e, n) {
        var i = [];
        return i._type = 4, i._tag = void 0 != n ? n : t._tag, t[e] = i, i
    }, u.createTagLoopResult = function(t, e, n) {
        var i = [];
        return i._type = 5, i.cache = {
            i$: 0
        }, i
    }, s.build = function(t) {
        var e = [];
        return e._tag = t, e
    }, a.prototype.$iter = function() {
        var t = [];
        return t._type = 5, t.cache = this, t
    }, a.prototype.$prune = function(t) {
        for (var e, n = this.cache$, o = this.key$, r = new a(n, o, this.par$), s = 0, u = i(t), h = u.length; s < h; s++) e = u[s], r[e.key$] = e;
        return r.i$ = t.length, n[o] = r
    }, u.TagMap = a, u.TagCache = s, u.SINGLETONS = {}, u.TAGS = new u.Tags, u.TAGS.element = u.TAGS.htmlelement = u.Tag, u.TAGS["svg:element"] = u.SVGTag, u.defineTag = function(t, e, n) {
        return void 0 == n && "function" == typeof e && (n = e, e = ""), void 0 == e && (e = ""), u.TAGS.defineTag(t, e, n)
    }, u.defineSingletonTag = function(t, e, n) {
        return void 0 == n && "function" == typeof e && (n = e, e = "div"), void 0 == e && (e = "div"), u.TAGS.defineTag(this.name(), e, n)
    }, u.extendTag = function(t, e) {
        return u.TAGS.extendTag(t, e)
    }, u.getTagSingleton = function(t) {
        var e, n, i;
        return (e = u.SINGLETONS[t]) ? e && e.Instance ? e.Instance : (n = u.document().getElementById(t)) ? (i = e.Instance = new e(n), i.awaken(n), i) : (n = e.createNode(), n.id = t, i = e.Instance = new e(n), i.end().awaken(n), i) : (n = u.document().getElementById(t)) ? u.getTagForDom(n) : void 0
    };
    var h = "undefined" != typeof SVGElement;
    u.getTagForDom = function(t) {
        if (!t) return null;
        if (t._dom) return t;
        if (t._tag) return t._tag;
        if (!t.nodeName) return null;
        var e = t.nodeName.toLowerCase(),
            n = e,
            i = u.TAGS;
        return t.id && u.SINGLETONS[t.id] ? u.getTagSingleton(t.id) : (n = h && t instanceof SVGElement ? i.findTagType("svg:" + e) : u.HTML_TAGS.indexOf(e) >= 0 ? i.findTagType(e) : u.Tag, new n(t, null).awaken(t))
    }, u.generateCSSPrefixes = function() {
        for (var t, e = window.getComputedStyle(document.documentElement, ""), n = 0, o = i(e), r = o.length; n < r; n++) {
            t = o[n];
            var s = t.replace(/^-(webkit|ms|moz|o|blink)-/, ""),
                a = s.replace(/-(\w)/g, function(t, e) {
                    return e.toUpperCase()
                });
            t != s && e.hasOwnProperty(s) || (u.CSSKeyMap[s] = u.CSSKeyMap[a] = t)
        }
    }, document && u.generateCSSPrefixes(), document && !document.documentElement.classList && u.extendTag("element", function(t) {
        t.prototype.hasFlag = function(t) {
            return new RegExp("(^|\\s)" + t + "(\\s|$)").test(this._dom.className)
        }, t.prototype.addFlag = function(t) {
            return this.hasFlag(t) ? this : (this._dom.className += (this._dom.className ? " " : "") + t, this)
        }, t.prototype.unflag = function(t) {
            if (!this.hasFlag(t)) return this;
            var e = new RegExp("(^|\\s)*" + t + "(\\s|$)*", "g");
            return this._dom.className = this._dom.className.replace(e, ""), this
        }, t.prototype.toggleFlag = function(t) {
            return this.hasFlag(t) ? this.unflag(t) : this.flag(t)
        }, t.prototype.flag = function(t, e) {
            return 2 == arguments.length && !1 == !!e ? this.unflag(t) : this.addFlag(t)
        }
    }), u.Tag
}, function(t, e, n) {
    function i(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }

    function o(t, e, n) {
        this._node = t, this._path = e, this._args = n, this._args && (this._setter = r.toSetter(this._path))
    }
    var r = n(1);
    r.defineTag("fragment", "element", function(t) {
        t.createNode = function() {
            return r.document().createDocumentFragment()
        }
    }), r.extendTag("html", function(t) {
        t.prototype.parent = function() {
            return null
        }
    }), r.extendTag("canvas", function(t) {
        t.prototype.context = function(t) {
            return void 0 === t && (t = "2d"), this.dom().getContext(t)
        }
    }), o.bind = function(t, e, n, i) {
        return (t._data || (t._data = new this(t, n, i))).bind(e, n, i), t
    }, o.prototype.bind = function(t, e, n) {
        return t != this._data && (this._data = t), this
    }, o.prototype.getFormValue = function() {
        return this._setter ? this._data[this._path]() : this._data[this._path]
    }, o.prototype.setFormValue = function(t) {
        return this._setter ? this._data[this._setter](t) : this._data[this._path] = t
    };
    var s = function(t) {
            return t && t.splice && t.sort
        },
        a = function(t, e) {
            var n = t.length,
                i = 0;
            if (n != e.length) return !1;
            for (; i++ < n;)
                if (t[i] != e[i]) return !1;
            return !0
        };
    r.extendTag("input", function(t) {
        t.prototype.lazy = function(t) {
            return this._lazy
        }, t.prototype.setLazy = function(t) {
            return this._lazy = t, this
        }, t.prototype.bindData = function(t, e, n) {
            return o.bind(this, t, e, n), this
        }, t.prototype.checked = function() {
            return this._dom.checked
        }, t.prototype.setChecked = function(t) {
            return !!t != this._dom.checked && (this._dom.checked = !!t), this
        }, t.prototype.setValue = function(t) {
            return void 0 == this._localValue && (this.dom().value = this._value = t), this
        }, t.prototype.oninput = function(t) {
            var e = this._dom.value;
            if (this._localValue = e, this._data && !this.lazy()) return this._data.setFormValue(this.value(), this)
        }, t.prototype.onchange = function(t) {
            if (this._modelValue = this._localValue = void 0, this.data()) {
                if ("radio" != this.type() && "checkbox" != this.type()) return this._data.setFormValue(this.value());
                var e = this._dom.checked,
                    n = this._data.getFormValue(this),
                    i = void 0 != this._value ? this._value : this.value();
                if ("radio" == this.type()) return this._data.setFormValue(i, this);
                if ("on" == this.dom().value) return this._data.setFormValue(!!e, this);
                if (!s(n)) return this._data.setFormValue(i, this);
                var o = n.indexOf(i);
                return e && -1 == o ? n.push(i) : !e && o >= 0 ? n.splice(o, 1) : void 0
            }
        }, t.prototype.onblur = function(t) {
            return this._localValue = void 0
        }, t.prototype.end = function() {
            if (void 0 !== this._localValue || !this._data) return this;
            var t = this._data.getFormValue(this);
            if (t == this._modelValue) return this;
            if (s(t) || (this._modelValue = t), "radio" == this.type() || "checkbox" == this.type()) {
                var e = this._value,
                    n = s(t) ? t.indexOf(e) >= 0 : "on" == this.dom().value ? !!t : t == this._value;
                this._dom.checked = n
            } else this._dom.value = t;
            return this
        }
    }), r.extendTag("textarea", function(t) {
        t.prototype.lazy = function(t) {
            return this._lazy
        }, t.prototype.setLazy = function(t) {
            return this._lazy = t, this
        }, t.prototype.bindData = function(t, e, n) {
            return o.bind(this, t, e, n), this
        }, t.prototype.setValue = function(t) {
            return void 0 == this._localValue && (this.dom().value = t), this
        }, t.prototype.oninput = function(t) {
            var e = this._dom.value;
            if (this._localValue = e, this._data && !this.lazy()) return this._data.setFormValue(this.value(), this)
        }, t.prototype.onchange = function(t) {
            if (this._localValue = void 0, this._data) return this._data.setFormValue(this.value(), this)
        }, t.prototype.onblur = function(t) {
            return this._localValue = void 0
        }, t.prototype.render = function() {
            if (void 0 == this._localValue && this._data) {
                if (this._data) {
                    var t = this._data.getFormValue(this);
                    this._dom.value = void 0 != t ? t : ""
                }
                return this
            }
        }
    }), r.extendTag("option", function(t) {
        t.prototype.setValue = function(t) {
            return t != this._value && (this.dom().value = this._value = t), this
        }, t.prototype.value = function() {
            return this._value || this.dom().value
        }
    }), r.extendTag("select", function(t) {
        t.prototype.bindData = function(t, e, n) {
            return o.bind(this, t, e, n), this
        }, t.prototype.setValue = function(t, e) {
            this._value;
            return this._value = t, e || this.syncValue(t), this
        }, t.prototype.syncValue = function(t) {
            var e = this._syncValue;
            if (this.multiple() && t instanceof Array) {
                if (e instanceof Array && a(e, t)) return this;
                t = t.slice()
            }
            if (this._syncValue = t, "object" == typeof t)
                for (var n, o = this.multiple() && t instanceof Array, r = 0, s = i(this.dom().options), u = s.length; r < u; r++) {
                    n = s[r];
                    var h = n._tag ? n._tag.value() : n.value;
                    if (o) n.selected = t.indexOf(h) >= 0;
                    else if (t == h) {
                        this.dom().selectedIndex = r;
                        break
                    }
                } else this.dom().value = t;
            return this
        }, t.prototype.value = function() {
            if (this.multiple()) {
                for (var t, e = [], n = 0, o = i(this.dom().selectedOptions), r = o.length; n < r; n++) t = o[n], e.push(t._tag ? t._tag.value() : t.value);
                return e
            }
            var s = this.dom().selectedOptions[0];
            return s ? s._tag ? s._tag.value() : s.value : null
        }, t.prototype.onchange = function(t) {
            if (this._data) return this._data.setFormValue(this.value(), this)
        }, t.prototype.end = function() {
            return this._data && this.setValue(this._data.getFormValue(this), 1), this._value != this._syncValue && this.syncValue(this._value), this
        }
    })
}, function(t, e, n) {
    function i(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }
    var o = n(1);
    o.Touch = function(t, e) {
        return this.setEvent(t), this.setData({}), this.setActive(!0), this._button = t && t.button || 0, this._suppress = !1, this._captured = !1, this.setBubble(!1), e = e, this.setUpdates(0), this
    }, o.Touch.LastTimestamp = 0, o.Touch.TapTimeout = 50;
    var r = [],
        s = 0,
        a = {};
    o.Touch.count = function() {
        return s
    }, o.Touch.lookup = function(t) {
        return t && (t.__touch__ || a[t.identifier])
    }, o.Touch.release = function(t, e) {
        a[t.identifier], delete a[t.identifier], t.__touch__, delete t.__touch__
    }, o.Touch.ontouchstart = function(t) {
        for (var e, n = 0, o = i(t.changedTouches), u = o.length; n < u; n++)
            if (e = o[n], !this.lookup(e)) {
                var h = a[e.identifier] = new this(t);
                e.__touch__ = h, r.push(h), s++, h.touchstart(t, e)
            }
        return this
    }, o.Touch.ontouchmove = function(t) {
        for (var e, n, o = 0, r = i(t.changedTouches), s = r.length; o < s; o++) n = r[o], (e = this.lookup(n)) && e.touchmove(t, n);
        return this
    }, o.Touch.ontouchend = function(t) {
        for (var e, n, o = 0, r = i(t.changedTouches), a = r.length; o < a; o++) n = r[o], (e = this.lookup(n)) && (e.touchend(t, n), this.release(n, e), s--);
        return this
    }, o.Touch.ontouchcancel = function(t) {
        for (var e, n, o = 0, r = i(t.changedTouches), a = r.length; o < a; o++) n = r[o], (e = this.lookup(n)) && (e.touchcancel(t, n), this.release(n, e), s--);
        return this
    }, o.Touch.onmousedown = function(t) {
        return this
    }, o.Touch.onmousemove = function(t) {
        return this
    }, o.Touch.onmouseup = function(t) {
        return this
    }, o.Touch.prototype.phase = function(t) {
        return this._phase
    }, o.Touch.prototype.setPhase = function(t) {
        return this._phase = t, this
    }, o.Touch.prototype.active = function(t) {
        return this._active
    }, o.Touch.prototype.setActive = function(t) {
        return this._active = t, this
    }, o.Touch.prototype.event = function(t) {
        return this._event
    }, o.Touch.prototype.setEvent = function(t) {
        return this._event = t, this
    }, o.Touch.prototype.pointer = function(t) {
        return this._pointer
    }, o.Touch.prototype.setPointer = function(t) {
        return this._pointer = t, this
    }, o.Touch.prototype.target = function(t) {
        return this._target
    }, o.Touch.prototype.setTarget = function(t) {
        return this._target = t, this
    }, o.Touch.prototype.handler = function(t) {
        return this._handler
    }, o.Touch.prototype.setHandler = function(t) {
        return this._handler = t, this
    }, o.Touch.prototype.updates = function(t) {
        return this._updates
    }, o.Touch.prototype.setUpdates = function(t) {
        return this._updates = t, this
    }, o.Touch.prototype.suppress = function(t) {
        return this._suppress
    }, o.Touch.prototype.setSuppress = function(t) {
        return this._suppress = t, this
    }, o.Touch.prototype.data = function(t) {
        return this._data
    }, o.Touch.prototype.setData = function(t) {
        return this._data = t, this
    }, o.Touch.prototype.__bubble = {
        chainable: !0,
        name: "bubble"
    }, o.Touch.prototype.bubble = function(t) {
        return void 0 !== t ? (this.setBubble(t), this) : this._bubble
    }, o.Touch.prototype.setBubble = function(t) {
        return this._bubble = t, this
    }, o.Touch.prototype.timestamp = function(t) {
        return this._timestamp
    }, o.Touch.prototype.setTimestamp = function(t) {
        return this._timestamp = t, this
    }, o.Touch.prototype.gestures = function(t) {
        return this._gestures
    }, o.Touch.prototype.setGestures = function(t) {
        return this._gestures = t, this
    }, o.Touch.prototype.capture = function() {
        return this._captured = !0, this._event && this._event.stopPropagation(), this._selblocker || (this._selblocker = function(t) {
            return t.preventDefault()
        }, o.document().addEventListener("selectstart", this._selblocker, !0)), this
    }, o.Touch.prototype.isCaptured = function() {
        return !!this._captured
    }, o.Touch.prototype.extend = function(t) {
        return this._gestures || (this._gestures = []), this._gestures.push(t), this
    }, o.Touch.prototype.redirect = function(t) {
        return this._redirect = t, this
    }, o.Touch.prototype.suppress = function() {
        return this._active = !1, this
    }, o.Touch.prototype.setSuppress = function(t) {
        return console.warn("Imba.Touch#suppress= is deprecated"), this._supress = t, this
    }, o.Touch.prototype.touchstart = function(t, e) {
        return this._event = t, this._touch = e, this._button = 0, this._x = e.clientX, this._y = e.clientY, this.began(), this.update(), t && this.isCaptured() && t.preventDefault(), this
    }, o.Touch.prototype.touchmove = function(t, e) {
        return this._event = t, this._x = e.clientX, this._y = e.clientY, this.update(), t && this.isCaptured() && t.preventDefault(), this
    }, o.Touch.prototype.touchend = function(t, e) {
        if (this._event = t, this._x = e.clientX, this._y = e.clientY, this.ended(), o.Touch.LastTimestamp = t.timeStamp, this._maxdr < 20) {
            var n = new o.Event(t);
            n.setType("tap"), n.process(), n._responder && t.preventDefault()
        }
        return t && this.isCaptured() && t.preventDefault(), this
    }, o.Touch.prototype.touchcancel = function(t, e) {
        return this.cancel()
    }, o.Touch.prototype.mousedown = function(t, e) {
        var n = this;
        return n._event = t, n._button = t.button, n._x = e.clientX, n._y = e.clientY, n.began(), n.update(), n._mousemove = function(t) {
            return n.mousemove(t, t)
        }, o.document().addEventListener("mousemove", n._mousemove, !0), n
    }, o.Touch.prototype.mousemove = function(t, e) {
        return this._x = e.clientX, this._y = e.clientY, this._event = t, this.isCaptured() && t.preventDefault(), this.update(), this.move(), this
    }, o.Touch.prototype.mouseup = function(t, e) {
        return this._x = e.clientX, this._y = e.clientY, this.ended(), this
    }, o.Touch.prototype.idle = function() {
        return this.update()
    }, o.Touch.prototype.began = function() {
        this._timestamp = Date.now(), this._maxdr = this._dr = 0, this._x0 = this._x, this._y0 = this._y;
        var t = this.event().target,
            e = null;
        for (this._sourceTarget = t && o.getTagForDom(t); t && (!(e = o.getTagForDom(t)) || !e.ontouchstart || (this._bubble = !1, this.setTarget(e), this.target().ontouchstart(this), this._bubble));) t = t.parentNode;
        return this._updates++, this
    }, o.Touch.prototype.update = function() {
        var t;
        if (!this._active || this._cancelled) return this;
        var e = Math.sqrt(this.dx() * this.dx() + this.dy() * this.dy());
        if (e > this._dr && (this._maxdr = e), this._dr = e, this._redirect && (this._target && this._target.ontouchcancel && this._target.ontouchcancel(this), this.setTarget(this._redirect), this._redirect = null, this.target().ontouchstart && this.target().ontouchstart(this), this._redirect)) return this.update();
        if (this._updates++, this._gestures)
            for (var n = 0, o = i(this._gestures), r = o.length; n < r; n++) o[n].ontouchupdate(this);
        return (t = this.target()) && t.ontouchupdate && t.ontouchupdate(this), this._redirect && this.update(), this
    }, o.Touch.prototype.move = function() {
        var t;
        if (!this._active || this._cancelled) return this;
        if (this._gestures)
            for (var e, n = 0, o = i(this._gestures), r = o.length; n < r; n++) e = o[n], e.ontouchmove && e.ontouchmove(this, this._event);
        return (t = this.target()) && t.ontouchmove && t.ontouchmove(this, this._event), this
    }, o.Touch.prototype.ended = function() {
        var t;
        if (!this._active || this._cancelled) return this;
        if (this._updates++, this._gestures)
            for (var e = 0, n = i(this._gestures), o = n.length; e < o; e++) n[e].ontouchend(this);
        return (t = this.target()) && t.ontouchend && t.ontouchend(this), this.cleanup_(), this
    }, o.Touch.prototype.cancel = function() {
        return this._cancelled || (this._cancelled = !0, this.cancelled(), this.cleanup_()), this
    }, o.Touch.prototype.cancelled = function() {
        var t;
        if (!this._active) return this;
        if (this._cancelled = !0, this._updates++, this._gestures)
            for (var e, n = 0, o = i(this._gestures), r = o.length; n < r; n++) e = o[n], e.ontouchcancel && e.ontouchcancel(this);
        return (t = this.target()) && t.ontouchcancel && t.ontouchcancel(this), this
    }, o.Touch.prototype.cleanup_ = function() {
        return this._mousemove && (o.document().removeEventListener("mousemove", this._mousemove, !0), this._mousemove = null), this._selblocker && (o.document().removeEventListener("selectstart", this._selblocker, !0), this._selblocker = null), this
    }, o.Touch.prototype.dr = function() {
        return this._dr
    }, o.Touch.prototype.dx = function() {
        return this._x - this._x0
    }, o.Touch.prototype.dy = function() {
        return this._y - this._y0
    }, o.Touch.prototype.x0 = function() {
        return this._x0
    }, o.Touch.prototype.y0 = function() {
        return this._y0
    }, o.Touch.prototype.x = function() {
        return this._x
    }, o.Touch.prototype.y = function() {
        return this._y
    }, o.Touch.prototype.tx = function() {
        return this._targetBox || (this._targetBox = this._target.dom().getBoundingClientRect()), this._x - this._targetBox.left
    }, o.Touch.prototype.ty = function() {
        return this._targetBox || (this._targetBox = this._target.dom().getBoundingClientRect()), this._y - this._targetBox.top
    }, o.Touch.prototype.button = function() {
        return this._button
    }, o.Touch.prototype.sourceTarget = function() {
        return this._sourceTarget
    }, o.Touch.prototype.elapsed = function() {
        return Date.now() - this._timestamp
    }, o.TouchGesture = function() {}, o.TouchGesture.prototype.__active = {
        default: !1,
        name: "active"
    }, o.TouchGesture.prototype.active = function(t) {
        return this._active
    }, o.TouchGesture.prototype.setActive = function(t) {
        return this._active = t, this
    }, o.TouchGesture.prototype._active = !1, o.TouchGesture.prototype.ontouchstart = function(t) {
        return this
    }, o.TouchGesture.prototype.ontouchupdate = function(t) {
        return this
    }, o.TouchGesture.prototype.ontouchend = function(t) {
        return this
    }
}, function(t, e, n) {
    function i(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }
    var o = n(1),
        r = {
            esc: 27,
            tab: 9,
            enter: 13,
            space: 32,
            up: 38,
            down: 40
        },
        s = o.Tag.prototype;
    s.stopModifier = function(t) {
        return t.stop() || !0
    }, s.preventModifier = function(t) {
        return t.prevent() || !0
    }, s.silenceModifier = function(t) {
        return t.silence() || !0
    }, s.bubbleModifier = function(t) {
        return t.bubble(!0) || !0
    }, s.ctrlModifier = function(t) {
        return 1 == t.event().ctrlKey
    }, s.altModifier = function(t) {
        return 1 == t.event().altKey
    }, s.shiftModifier = function(t) {
        return 1 == t.event().shiftKey
    }, s.metaModifier = function(t) {
        return 1 == t.event().metaKey
    }, s.keyModifier = function(t, e) {
        return !e.keyCode() || e.keyCode() == t
    }, s.delModifier = function(t) {
        return !t.keyCode() || (8 == t.keyCode() || 46 == t.keyCode())
    }, s.selfModifier = function(t) {
        return t.event().target == this._dom
    }, s.leftModifier = function(t) {
        return void 0 != t.button() ? 0 === t.button() : s.keyModifier(37, t)
    }, s.rightModifier = function(t) {
        return void 0 != t.button() ? 2 === t.button() : s.keyModifier(39, t)
    }, s.middleModifier = function(t) {
        return void 0 == t.button() || 1 === t.button()
    }, s.getHandler = function(t, e) {
        if (this[t]) return this
    }, o.Event = function(t) {
        this.setEvent(t), this._bubble = !0
    }, o.Event.prototype.event = function(t) {
        return this._event
    }, o.Event.prototype.setEvent = function(t) {
        return this._event = t, this
    }, o.Event.prototype.prefix = function(t) {
        return this._prefix
    }, o.Event.prototype.setPrefix = function(t) {
        return this._prefix = t, this
    }, o.Event.prototype.source = function(t) {
        return this._source
    }, o.Event.prototype.setSource = function(t) {
        return this._source = t, this
    }, o.Event.prototype.data = function(t) {
        return this._data
    }, o.Event.prototype.setData = function(t) {
        return this._data = t, this
    }, o.Event.prototype.responder = function(t) {
        return this._responder
    }, o.Event.prototype.setResponder = function(t) {
        return this._responder = t, this
    }, o.Event.wrap = function(t) {
        return new this(t)
    }, o.Event.prototype.setType = function(t) {
        return this._type = t, this
    }, o.Event.prototype.type = function() {
        return this._type || this.event().type
    }, o.Event.prototype.native = function() {
        return this._event
    }, o.Event.prototype.name = function() {
        return this._name || (this._name = this.type().toLowerCase().replace(/\:/g, ""))
    }, o.Event.prototype.bubble = function(t) {
        return void 0 != t ? (this.setBubble(t), this) : this._bubble
    }, o.Event.prototype.setBubble = function(t) {
        return this._bubble = t, this
    }, o.Event.prototype.stop = function() {
        return this.setBubble(!1), this
    }, o.Event.prototype.stopPropagation = function() {
        return this.stop()
    }, o.Event.prototype.halt = function() {
        return this.stop()
    }, o.Event.prototype.prevent = function() {
        return this.event().preventDefault ? this.event().preventDefault() : this.event().defaultPrevented = !0, this.defaultPrevented = !0, this
    }, o.Event.prototype.preventDefault = function() {
        return console.warn("Event#preventDefault is deprecated - use Event#prevent"), this.prevent()
    }, o.Event.prototype.isPrevented = function() {
        return this.event() && this.event().defaultPrevented || this._cancel
    }, o.Event.prototype.cancel = function() {
        return console.warn("Event#cancel is deprecated - use Event#prevent"), this.prevent()
    }, o.Event.prototype.silence = function() {
        return this._silenced = !0, this
    }, o.Event.prototype.isSilenced = function() {
        return !!this._silenced
    }, o.Event.prototype.target = function() {
        return o.getTagForDom(this.event()._target || this.event().target)
    }, o.Event.prototype.responder = function() {
        return this._responder
    }, o.Event.prototype.redirect = function(t) {
        return this._redirect = t, this
    }, o.Event.prototype.processHandlers = function(t, e) {
        var n = 1,
            i = e.length,
            s = this._bubble,
            a = e.state || (e.state = {});
        for (s && (this._bubble = 1); n < i;) {
            var u = !1,
                h = e[n++],
                p = null,
                l = t;
            if (h instanceof Array && (p = h.slice(1), h = h[0]), "string" == typeof h) {
                r[h] && (p = [r[h]], h = "key");
                var c = h + "Modifier";
                t[c] && (u = !0, p = (p || []).concat([this, a]), h = t[c])
            }
            if ("string" == typeof h) {
                var d = null,
                    f = a.context;
                f && (f.getHandler instanceof Function && (f = f.getHandler(h, this)), f[h] instanceof Function && (h = d = f[h], l = f)), d || console.warn("event " + this.type() + ": could not find '" + h + "' in context", f)
            }
            if (h instanceof Function) {
                var y = h.apply(l, p || [this]);
                if (u || this._responder || (this._responder = t), 0 == y) break;
                y && !this._silenced && y.then instanceof Function && y.then(o.commit)
            }
        }
        return 1 === this._bubble && (this._bubble = s), null
    }, o.Event.prototype.process = function() {
        for (var t, e, n = this.name(), o = "on" + (this._prefix || "") + n, r = this.event()._target || this.event().target, s = r._responder || r; s;) {
            this._redirect = null;
            var a = s._dom ? s : s._tag;
            if (a) {
                if (e = a._on_) {
                    for (var u, h = 0, p = i(e), l = p.length; h < l; h++)
                        if (u = p[h]) {
                            u[0];
                            n == u[0] && this.bubble() && this.processHandlers(a, u)
                        }
                    if (!this.bubble()) break
                }
                this.bubble() && a[o] instanceof Function && (this._responder || (this._responder = a), this._silenced = !1, t = a[o](this, this.data())), a.onevent && a.onevent(this)
            }
            if (!this.bubble() || !(s = this._redirect || (a ? a.parent() : s.parentNode))) break
        }
        return this.processed(), t && t.then instanceof Function && t.then(this.processed.bind(this)), this
    }, o.Event.prototype.processed = function() {
        return !this._silenced && this._responder && (o.emit(o, "event", [this]), o.commit(this.event())), this
    }, o.Event.prototype.x = function() {
        return this.native().x
    }, o.Event.prototype.y = function() {
        return this.native().y
    }, o.Event.prototype.button = function() {
        return this.native().button
    }, o.Event.prototype.keyCode = function() {
        return this.native().keyCode
    }, o.Event.prototype.ctrl = function() {
        return this.native().ctrlKey
    }, o.Event.prototype.alt = function() {
        return this.native().altKey
    }, o.Event.prototype.shift = function() {
        return this.native().shiftKey
    }, o.Event.prototype.meta = function() {
        return this.native().metaKey
    }, o.Event.prototype.key = function() {
        return this.native().key
    }, o.Event.prototype.which = function() {
        return this.event().which
    }
}, function(t, e, n) {
    function i(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }

    function o(t, e, n) {
        if (e instanceof Array)
            for (var r = 0, s = i(e), a = s.length; r < a; r++) o(t, s[r], n);
        else if (e && e._slot_) t.removeChild(e);
        else if (null != e) {
            var u = n ? n.nextSibling : t._dom.firstChild;
            if (!(u instanceof Text && u.textContent == e)) throw "cannot remove string";
            t.removeChild(u)
        }
        return n
    }

    function r(t, e) {
        if (e instanceof Array)
            for (var n = 0, i = e.taglen, o = null != i ? e.domlen = i : e.length; n < o;) r(t, e[n++]);
        else e && e._dom ? t.appendChild(e) : null != e && !1 !== e && t.appendChild(d.createTextNode(e))
    }

    function s(t, e, n) {
        if (e instanceof Array)
            for (var i = 0, o = e.taglen, r = null != o ? e.domlen = o : e.length; i < r;) s(t, e[i++], n);
        else e && e._dom ? t.insertBefore(e, n) : null != e && !1 !== e && t.insertBefore(d.createTextNode(e), n);
        return n
    }

    function a(t, e, n) {
        var i = n ? n.nextSibling : t._dom.firstChild;
        return i ? (s(t, e, i), i.previousSibling) : (r(t, e), t._dom.lastChild)
    }

    function u(t, e, n, o) {
        for (var r, s, u = e.length, h = e[u - 1], p = [], l = [], c = [], f = 0, y = 0, g = 0, _ = i(n), m = _.length; g < m; g++)
            if (s = _[g], s && 3 == s.nodeType ? (r = e.indexOf(s.textContent), r >= 0 && (e[r] = s), !0) : r = e.indexOf(s), p.push(r), -1 != r) {
                for (var v = p.length - 2; v >= 0;)
                    if (-1 == p[v]) v--;
                    else {
                        if (r > p[v]) break;
                        v = l[v]
                    }
                l.push(v);
                var b = -1 == v ? 0 : c[v] + 1;
                b > f && (f = b, y = g), c.push(b)
            } else t.removeChild(s), l.push(-1), c.push(-1);
        for (var T = [], w = p.length - 1; w >= 0;) w == y && -1 != p[w] && (T[p[w]] = !0, y = l[y]), w -= 1;
        for (var $, x = 0, k = i(e), S = k.length; x < S; x++) {
            if ($ = k[x], !T[x]) {
                $ && $._dom || ($ = e[x] = d.createTextNode($));
                var A = e[x - 1];
                a(t, $, A && A._slot_ || A || o)
            }
            o = $._slot_ || o && o.nextSibling || t._dom.firstChild
        }
        return h && h._slot_ || o
    }

    function h(t, e, n, i) {
        var o = e.length,
            r = o,
            s = e[o - 1];
        if (o == n.length && e[0] === n[0])
            for (; r-- && e[r] === n[r];);
        return -1 == r ? s && s._slot_ || s || i : u(t, e, n, i)
    }

    function p(t, e, n, i) {
        for (var o = e.length, r = n.length, s = e.cache.i$, a = 0, h = o - r; a < r && a < o && e[a] === n[a];) a++;
        if (s > 1e3 && s - o > 500 && e.cache.$prune(e), !(h > 0 && a == r)) {
            if (h > 0) {
                for (var p = o; p > a && e[p - 1] === n[p - 1 - h];) p--;
                if (h == p - a) {
                    for (var l = n[a]._slot_; a < p;) t.insertBefore(e[a++], l);
                    return
                }
            } else {
                if (h < 0 && a == o) {
                    for (; a < r;) t.removeChild(n[a++]);
                    return
                }
                if (h < 0) {
                    for (var c = r; c > a && e[c - 1 + h] === n[c - 1];) c--;
                    if (h == a - c) {
                        for (; a < c;) t.removeChild(n[a++]);
                        return
                    }
                } else if (a == o) return
            }
            return u(t, e, n, i)
        }
        for (; a < o;) t.appendChild(e[a++])
    }

    function l(t, e, n, i) {
        var o = e.taglen,
            r = e.domlen || 0,
            s = o ? e[o - 1] : null;
        if (r > o)
            for (; r > o;) {
                var a = e[--r];
                t.removeChild(a._slot_)
            } else if (o > r)
                for (var u = r ? e[r - 1]._slot_ : i, h = u ? u.nextSibling : t._dom.firstChild; r < o;) {
                    var p = e[r++];
                    h ? t.insertBefore(p._slot_, h) : t.appendChild(p._slot_)
                }
        return e.domlen = o, s ? s._slot_ : i
    }

    function c(t, e, n, r) {
        var s = null == e || !1 === e,
            u = null == n || !1 === n;
        if (e === n) return s ? r : e._slot_ ? e._slot_ : e instanceof Array && null != e.taglen ? l(t, e, n, r) : r ? r.nextSibling : t._dom.firstChild;
        if (e instanceof Array) {
            if (n instanceof Array) {
                var p = e.static;
                if (!p && !n.static) return h(t, e, n, r);
                if (p == n.static) {
                    for (var d = 0, f = i(e), y = f.length; d < y; d++) r = c(t, f[d], n[d], r);
                    return r
                }
                o(t, n, r)
            } else u || (n._slot_ ? t.removeChild(n) : t.removeChild(r ? r.nextSibling : t._dom.firstChild));
            return a(t, e, r)
        }
        if (!s && e._slot_) return u || o(t, n, r), a(t, e, r);
        if (s) return u || o(t, n, r), r;
        var g;
        if (n instanceof Array) o(t, n, r);
        else if (n && n._slot_) t.removeChild(n);
        else if (!u && (g = r ? r.nextSibling : t._dom.firstChild) instanceof Text && g.textContent != e) return g.textContent = e, g;
        return a(t, e, r)
    }
    var d = n(1);
    d.extendTag("element", function(t) {
        t.prototype.setChildren = function(t, e) {
            var n = this._tree_;
            if (t === n && (!t || void 0 == t.taglen)) return this;
            if (n || 3 == e)
                if (1 == e)
                    for (var o = null, s = 0, a = i(t), u = a.length; s < u; s++) o = c(this, a[s], n[s], o);
                else {
                    if (2 == e) return this;
                    if (3 == e) {
                        var h = typeof t;
                        if ("object" != h) return this.setText(t);
                        if (t && t._dom) this.removeAllChildren(), this.appendChild(t);
                        else {
                            if (!(t instanceof Array)) return this.setText(t);
                            5 == t._type && n && 5 == n._type ? p(this, t, n, null) : n instanceof Array ? c(this, t, n, null) : (this.removeAllChildren(), r(this, t))
                        }
                    } else 4 == e ? l(this, t, n, null) : 5 == e ? p(this, t, n, null) : t instanceof Array && n instanceof Array ? c(this, t, n, null) : (this.removeAllChildren(), r(this, t))
                }
            else this.removeAllChildren(), r(this, t);
            return this._tree_ = t, this
        }, t.prototype.content = function() {
            return this._content || this.children().toArray()
        }, t.prototype.setText = function(t) {
            if (t != this._tree_) {
                var e = null === t || !1 === t ? "" : t;
                (this._text_ || this._dom).textContent = e, this._text_ || (this._text_ = this._dom.firstChild), this._tree_ = t
            }
            return this
        }
    });
    var f = d.Tag.prototype;
    f.setContent = f.setChildren, "undefined" != typeof navigator && 0 == (navigator.vendor || "").indexOf("Apple") && (f.setText = function(t) {
        return t != this._tree_ && (this._dom.textContent = null === t || !1 === t ? "" : t, this._tree_ = t), this
    })
}, function(t, e, n) {
    var i = n(0),
        o = {
            8: "backspace",
            9: "tab",
            13: "enter",
            16: "shift",
            17: "ctrl",
            18: "alt",
            19: "break",
            20: "caps",
            27: "esc",
            32: "space",
            35: "end",
            36: "home",
            37: "larr",
            38: "uarr",
            39: "rarr",
            40: "darr",
            45: "insert",
            46: "delete",
            107: "plus",
            106: "mult",
            91: "meta"
        },
        r = {
            "%": "modulo",
            "*": "multiply",
            "+": "add",
            "-": "sub",
            "/": "divide",
            ".": "dot"
        };
    i.Event.prototype.keychar = function() {
        if (this.event() instanceof KeyboardEvent) {
            var t = this.event().keyIdentifier || this.event().key,
                e = o[this.event().keyCode];
            return e || (e = "U+" == t.substr(0, 2) ? String.fromCharCode(parseInt(t.substr(2), 16)) : t), e
        }
        return this.event() instanceof(window.TextEvent || window.InputEvent) ? this.event().data : null
    }, i.Event.prototype.keycombo = function() {
        var t;
        if (t = this.keychar()) {
            t = r[t] || t;
            var e = [],
                n = this.event();
            return n.ctrlKey && e.push("ctrl"), n.shiftKey && e.push("shift"), n.altKey && e.push("alt"), n.metaKey && e.push("cmd"), e.push(t), e.join("_").toLowerCase()
        }
    }, i.extendTag("element", function(t) {
        t.prototype.width = function() {
            return this._dom.offsetWidth
        }, t.prototype.height = function() {
            return this._dom.offsetHeight
        }, t.prototype.setObject = function(t) {
            return console.warn("Tag#object= deprecated. Use Tag#data="), this.setData(t), this
        }, t.prototype.object = function() {
            return this.data()
        }, t.prototype.index = function() {
            for (var t = 0, e = this.dom(); e.previousSibling;) e = e.previousSibling, t++;
            return t
        }
    })
}, function(t, e, n) {
    function i(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }
    var o = n(0);
    Hue = {
        Data: {
            cache: {}
        }
    }, LAYOUTS = n(2), Hue.Aliases = {
        adresse: "org.address",
        telefon: "site.phone|org.phone|org.mobile",
        mobil: "site.mobile|org.mobile",
        epost: "site.email|org.email",
        logo: "site.logoId|org.logoId",
        facebook: "site.facebook|org.facebook",
        aapningstider: "org.facebook.hours"
    }, o.extendTag("element", function(t) {
        t.prototype.key = function(t) {
            return this._key
        }, t.prototype.setKey = function(t) {
            return this._key = t, this
        }
    }), Hue.deobfuscate = function(t) {
        return t.replace(/\@mail\.1\.(.+?)\.co\b/g, "@$1")
    }, Hue.email = function(t) {
        return void 0 === t && (t = ""), String(t).replace("@mail.1.", "@").replace(/\.co$/, "")
    }, Hue.get = function(t, e, n) {
        if (void 0 === n && (n = Hue.Data), t = Hue.Aliases[t] || t, n._data && (n = n._data), t.indexOf("|") >= 0) {
            for (var o = t.split("|"), r = 0, s = i(o), a = s.length; r < a; r++) {
                var u = Hue.get(s[r], null, n);
                if (null != u) return u
            }
            return e
        }
        return t.replace(/(\w+)(\.|$)/g, function(t, e, i) {
            return n && (n = n[e]), t
        }), null != n ? n : e
    }, Hue.fmt = function(t) {
        return Hue.get(t)
    }, Hue.getBlock = function(t) {
        return Hue.Data.blocks[t]
    }, Hue.getPost = function(t) {
        var e = "string" == typeof t ? Hue.Data.posts[t] : t;
        return e || (e = Hue.Data.posts[t] = {
            _id: t,
            state: "inaccesible",
            error: "Not found"
        }), e
    }, Hue.getMenu = function() {
        for (var t = Hue.getBlock(Hue.Data.root), e = {}, n = [], o = 0, r = i(t.blocks), s = r.length; o < s; o++) {
            var a = Hue.getBlock(r[o]),
                u = a.options.menuTitle;
            u && !e[u] && (e[u] = a, n.push({
                url: "#" + a._id,
                title: u
            }))
        }
        return Hue.Data.MENU = n, n
    }, Hue.findPostsWithSelector = function(t) {
        for (var e = [], n = Hue.Data.postArray || Object.keys(Hue.Data.posts), o = 0, r = i(n), s = r.length; o < s; o++) {
            var a = Hue.Data.posts[r[o]];
            a.siteId != Hue.Data.siteId || a.removedAt || (t.type && a.type != t.type || e.push(a))
        }
        return t.count && e.length > t.count && (e.length = t.count), e
    }, Hue.getPlaceholderContent = function(t) {
        for (var e, n = [], o = Hue.Data.postArray || Object.keys(Hue.Data.posts), r = 0, s = i(o), a = s.length; r < a; r++) {
            e = s[r];
            var u = Hue.Data.posts[e];
            u.siteId != Hue.Data.siteId || u.removedAt || (t.type && u.type != t.type || !t.dynamic && t.items && t.items.indexOf(e) >= 0 || n.push(u))
        }
        return !t.dynamic && t.count && n.length > t.count && (n.length = t.count), n
    }, Hue.getPostsForBlock = function(t) {
        var e, n = [],
            i = t.content || {},
            o = parseInt(i.count || 1),
            r = i.items || [],
            s = Math.max(i.limit || 0, o) || 6;
        if (i.count || i.limit || (s = 24), i.dynamic) return n = Hue.getPlaceholderContent(i), n.length > s && (n.length = s), n;
        for (var a = 0, u = o; a < u;) {
            var h = null,
                p = r[a];
            p && (h = Hue.getPost(p, a, i)), h || (e || (e = Hue.getPlaceholderContent(i)), h = e.shift()), h || (h = {
                _id: t._id + "item" + a,
                title: "Tittel",
                subtitle: "Undertittel",
                tagline: "Tekst",
                placeholder: !0
            }), n[a] = h, a++
        }
        return n
    }, Hue.getBlockPostOptions = function(t, e) {
        var n = t.content;
        return n && n["nr" + e] || {}
    }, Hue.getAsset = function(t) {
        return "string" == typeof t ? Hue.Data.assets[t] : t
    }, Hue.findPosts = function(t) {
        for (var e, n, i = [], o = Hue.Data.posts, r = 0, s = Object.keys(o), a = s.length; r < a; r++) n = s[r], e = o[n], t(e) && i.push(e);
        return i
    }, Hue.nodeForBlock = function(t, e) {
        var n;
        "string" == typeof e && (e = Hue.getBlock(e));
        var i = e.type + "-" + e._id;
        if (n = t[i]) return n;
        Hue.Data.blocks[e._id] || (Hue.Data.blocks[e._id] = e);
        var r = o.TAGS["hue-" + e.type];
        return r ? t[i] = new r(r.createNode()).bind(e, t) : void 0
    }, Hue.nodeForPost = function(t, e, n, i) {
        var r = o.TAGS;
        "string" == typeof e && (e = Hue.getPost(e));
        var s = e.type,
            a = s + "-" + e._id + "-" + i,
            u = t[a];
        if (!u) {
            var h = r["hue-" + n + "-" + s] || r["hue-" + n];
            h && (u = t[a] = new h(h.createNode()).bind(e, t))
        }
        return u
    }, Hue.parseColorToHex = function(t) {
        var e, n = 0,
            i = 0,
            o = 0;
        return t.match(/\#[A-F\d]{6}/) ? t : (t = t.replace(/\s/g, "").toLowerCase(), (e = t.match(/rgb\((\d+),(\d+),(\d+)\)/)) && (n = parseInt(e[1]), i = parseInt(e[2]), o = parseInt(e[3])), "#" + (16777216 + (o | i << 8 | n << 16)).toString(16).slice(1))
    }, Hue.hexToRgb = function(t) {
        var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
        return e ? [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)] : null
    }, Hue.pathForNode = function(t) {
        var e = [];
        for (t = t._dom || t; t;) {
            var n = t.getAttribute("data-path");
            if (n && e.unshift(n), t.className.indexOf("_hue-block") >= 0) break;
            t = t.parentNode
        }
        return e.join(".")
    }, Hue.assetUrl = function(t, e) {
        void 0 === e && (e = {});
        var n = t + "__",
            i = [],
            o = e.width,
            r = e.height,
            s = e.area;
        return e.width && (o = e.width * (e.dpi || 1) * Hue.Scale, i.push("w" + o)), e.height && (r = e.height * (e.dpi || 1) * Hue.Scale, i.push("h" + r)), e.area && (s = e.area * Hue.Scale, 2 == e.dpi && (s *= 4), i.push("area" + s)), e.blur && i.push("b" + Math.round(100 * e.blur)), e.tint && i.push("t" + Hue.parseColorToHex(e.tint).substr(1)), n += i.join("_"), e.ext && (n += "." + e.ext), n = Hue.Host + "/assets/" + n
    }, Hue.encodeURIComponent = function(t) {
        return encodeURIComponent(t)
    }, Hue.xhr = function(t, e, n) {
        var i, o = new XMLHttpRequest;
        return (i = document.location.pathname.match(/^\/(s|ide)\/([^\/]+)\/?/)) && (e = "/s/" + i[2] + e), o.onload = function() {
            console.log("xhr loaded", e, o.responseText.substr(0, 15));
            try {
                var t = JSON.parse(o.responseText)
            } catch (e) {
                t = {
                    error: e
                }
            }
            return n && n(t, o)
        }, o.open(t, e, !0), o.setRequestHeader("Content-Type", "application/json"), o.send()
    }
}, function(t, e, n) {
    n(20), n(21), n(24), n(25), n(26), n(27), n(29), n(30), n(31), n(32), n(36), n(37), n(40), n(41), n(42), n(43), n(44), n(45), n(46), n(47), n(48), n(50), n(51), n(52), n(53), n(54), n(55), n(57), n(58), n(59), n(60)
}, function(t, e, n) {
    n(0).extendTag("element", function(t) {
        t.prototype.__cssText = {
            watch: "cssTextDidSet",
            name: "cssText"
        }, t.prototype.cssText = function(t) {
            return this._cssText
        }, t.prototype.setCssText = function(t) {
            var e = this.cssText();
            return t != e && (this._cssText = t), t != e && this.cssTextDidSet && this.cssTextDidSet(t, e, this.__cssText), this
        }, t.prototype.cssTextDidSet = function(t, e) {
            return t = t.replace("undefined", "inherit"), this._dom.setAttribute("style", t), this
        }
    })
}, function(t, e, n) {
    function i(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }
    var o = n(0),
        r = o.createElement,
        s = (n(22).GridLayout, n(23).BarLayout),
        a = (n(4).TilesLayout, n(5).Delay);
    o.defineTag("hue-block", function(t) {
        t.prototype.did = function(t) {
            return this._did
        }, t.prototype.setDid = function(t) {
            return this._did = t, this
        }, t.prototype.pid = function(t) {
            return this._pid
        }, t.prototype.setPid = function(t) {
            return this._pid = t, this
        }, t.prototype.scope = function(t) {
            return this._scope
        }, t.prototype.setScope = function(t) {
            return this._scope = t, this
        }, t.prototype.__visibility = {
            watch: "visibilityDidSet",
            default: 0,
            name: "visibility"
        }, t.prototype.visibility = function(t) {
            return this._visibility
        }, t.prototype.setVisibility = function(t) {
            var e = this.visibility();
            return t != e && (this._visibility = t), t != e && this.visibilityDidSet && this.visibilityDidSet(t, e, this.__visibility), this
        }, t.prototype._visibility = 0, t.prototype.__align = {
            watch: "flagProp",
            name: "align"
        }, t.prototype.align = function(t) {
            return this._align
        }, t.prototype.setAlign = function(t) {
            var e = this.align();
            return t != e && (this._align = t), t != e && this.flagProp && this.flagProp(t, e, this.__align), this
        }, t.prototype.__tint = {
            watch: "flagProp",
            name: "tint"
        }, t.prototype.tint = function(t) {
            return this._tint
        }, t.prototype.setTint = function(t) {
            var e = this.tint();
            return t != e && (this._tint = t), t != e && this.flagProp && this.flagProp(t, e, this.__tint), this
        }, t.prototype.composition = function(t) {
            return this._composition
        }, t.prototype.setComposition = function(t) {
            return this._composition = t, this
        }, t.option = function(t, e) {
            return void 0 === e && (e = {}), e.type || (e.type = "string"), e.name = t, this["option_" + t] = e, this
        }, t.options = function() {
            if (this._options) return this._options;
            this._options = [];
            for (var t, e, n = this, i = 0, o = Object.keys(n), r = o.length; i < r; i++) e = o[i], t = n[e], e.match(/^option_/) && this._options.push(t);
            return this._options
        }, t.layouts = function(t) {
            return this.prototype._layouts = t, this
        }, t.prototype.visibilityDidSet = function(t, e) {
            return 1 == t ? this._entered ? this.reenter() : (this._entered = !0, this.enter()) : 0 == t && this.leave(), this
        }, t.prototype.flagProp = function(t, e, n) {
            if (e && this.unflag(n.name + "-" + e), t) return this.flag(n.name + "-" + t)
        }, t.prototype.delay = function(t, e) {
            return this._delays || (this._delays = {}), (this._delays[t] || (this._delays[t] = new a(this, t))).delay(e)
        }, t.prototype.inspector = function() {
            return null
        }, t.prototype.data = function() {
            return Hue.getBlock(this.did())
        }, t.prototype.sel = function() {
            return this.data().content
        }, t.prototype.bind = function(t, e) {
            if (this.setDid(t._id), this._scope = e, this._object = this._data = t, this.setComposition(t.composition), t.options) {
                this.setAlign(t.options.align), this.setTint(t.options.tint);
                var n = this.styleRules().replace(/\@([\w\.]+)/g, function(e, n) {
                    return t.options[n] || Hue.get(n, "inherit")
                });
                n != this.getAttribute("style") && this.setAttribute("style", n)
            }
            return this
        }, t.prototype.restyle = function() {
            if (!this.data()) return this;
            var t = this.styleRules(),
                e = this.data().options;
            return t = t.replace(/\@([\w\.]+)/g, function(t, n) {
                return e && e[n] || Hue.get(n, "inherit")
            }), t != this.getAttribute("style") && this.setAttribute("style", t), this
        }, t.prototype.styleRules = function() {
            return "border-color: @iconColor; color: @color;"
        }, t.prototype.o = function(t, e) {
            var n;
            return (n = this.data().options) && null != n[t] ? n[t] : e
        }, t.prototype.get = function(t, e) {
            return Hue.get(t, e, this.data())
        }, t.prototype.draw = function() {
            return this
        }, t.prototype.didmount = function() {
            return this
        }, t.prototype.layout = function() {
            return this._layout || this._body && this._body._layout
        }, t.prototype.enter = function() {
            for (var t, e = 0, n = i(this.querySelectorAll(".layout")), o = n.length; e < o; e++) t = n[e], t._layout && t._layout.enter();
            return this
        }, t.prototype.reenter = function() {
            for (var t, e = 0, n = i(this.querySelectorAll(".layout")), o = n.length; e < o; e++) t = n[e], t._layout && t._layout.enter();
            return this
        }, t.prototype.leave = function() {
            for (var t, e = 0, n = i(this.querySelectorAll(".layout")), o = n.length; e < o; e++) t = n[e], t._layout && t._layout.leave();
            return this
        }, t.prototype.body = function() {
            this.$$ || (this.$$ = {});
            return this._body = this._body || r("div", this).flag("body")
        }, t.prototype.header = function() {
            var t;
            this.$$ || (this.$$ = {});
            return (t = this._header = this._header || (t = r("div", this)).flag("header").flag("block-header").setContent(t.$.A || r("hue-content", t.$, "A", t).flag("article").flag("cte").setKey("header"), 2)).end((t.$.A.bindData(this, "data", []).setContent(this.get("header", "Heading")).end(), !0))
        }, t.prototype.anchor = function() {
            this.$$ || (this.$$ = {});
            if (this.o("menuTitle")) return (this._anchor = this._anchor || r("div", this).flag("anchor")).setId(this.did()).end()
        }, t.prototype.showHeader = function() {
            return this.o("showHeader")
        }, t.prototype.backdrop = function() {
            return null
        }, t.prototype.render = function() {
            return this.shouldRender() ? (this.$open(0).setFlag(-1, this.data().flag).setFlag(-2, this.data().composition).setChildren([this.hud(), this.anchor(), this.showHeader() ? this.header() : void 0, this.body()], 1).synced(), this.didRender()) : this
        }, t.prototype.hud = function() {}, t.prototype.relayout = function() {
            for (var t, e = 0, n = i(this.querySelectorAll(".layout")), o = n.length; e < o; e++) t = n[e], t._layout && t._layout.reflow();
            for (var r = 0, a = i(this.querySelectorAll(".bar")), u = a.length; r < u; r++) s.forNode(a[r]).reflow();
            return this
        }, t.prototype.candrop = function(t) {
            return !1
        }, t.prototype.ondblclick = function(t) {
            if (this._hud) return t.halt().cancel(), this._hud.edit()
        }, t.prototype.shouldRender = function() {
            return !0
        }, t.prototype.didRender = function() {
            var t = this.data();
            return t && t.options && (this.setTint(t.options.tint), this.setAlign(t.options.align)), this
        }, t.prototype.showNode = function() {
            return this
        }, t.prototype.scrollIntoView = function() {
            var t = this.dom().offsetTop - 47,
                e = document.scrollingElement || (Hue.IsWebKit ? document.body : document.documentElement),
                n = e.scrollTop;
            return t = Math.min(t, document.body.offsetHeight - window.innerHeight), TweenLite.fromTo(e, .7, {
                scrollTop: n
            }, {
                scrollTop: t,
                ease: Quad.easeOut
            }), this
        }
    })
}, function(t, e, n) {
    function i() {
        return r.apply(this, arguments)
    }
    var o = n(0),
        r = (n(2).Layout, n(4).TilesLayout);
    o.subclass(i, r), e.GridLayout = i, i.register("grid"), i.prototype.__minWidth = {
        default: 300,
        name: "minWidth"
    }, i.prototype.minWidth = function(t) {
        return this._minWidth
    }, i.prototype.setMinWidth = function(t) {
        return this._minWidth = t, this
    }, i.prototype._minWidth = 300
}, function(t, e, n) {
    function i(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }

    function o(t) {
        return t && (t.len instanceof Function ? t.len() : t.length) || 0
    }

    function r(t, e) {
        void 0 === e && (e = {}), this._node = t, this.setup(e)
    }
    var s = n(0),
        a = n(2).Layout;
    s.subclass(r, a), e.BarLayout = r, r.prototype.__collapsed = {
        watch: "reapply",
        name: "collapsed"
    }, r.prototype.collapsed = function(t) {
        return this._collapsed
    }, r.prototype.setCollapsed = function(t) {
        var e = this.collapsed();
        return t != e && (this._collapsed = t), t != e && this.reapply && this.reapply(t, e, this.__collapsed), this
    }, r.prototype.reapply = function() {
        return this.node().flag("vertical", this.collapsed())
    }, r.prototype.reflow = function() {
        this.node().flag("reflowed");
        for (var t, e = this.node().dom().offsetWidth / Hue.Scale, n = this.node().children(), r = (o(n), []), s = 0, a = 0, u = i(n), h = u.length; a < h; a++) {
            t = u[a];
            var p = t._barWidth || (t._barWidth = t.dom().offsetWidth);
            s += p, r.push(p)
        }
        return this.setCollapsed(e < s), this
    }
}, function(t, e, n) {
    n(0).defineTag("hue-paper", function(t) {
        t.prototype.show = function() {
            return this.flag("show"), clearTimeout(this._timeout), this.focus()
        }, t.prototype.hide = function() {
            return this.unflag("show"), clearTimeout(this._timeout), this.orphanize()
        }, t.prototype.ontap = function(t) {
            if (t.target() == this || "hide" == t.target().dataset("action")) return this.hide()
        }
    })
}, function(t, e, n) {
    function i(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }
    var o = n(0),
        r = o.createTagList,
        s = o.createElement;
    o.defineTag("hue-page-header", function(t) {
        t.prototype.visibility = function(t) {
            return this._visibility
        }, t.prototype.setVisibility = function(t) {
            return this._visibility = t, this
        }
    }), o.defineTag("hue-page-footer", function(t) {
        t.prototype.visibility = function(t) {
            return this._visibility
        }, t.prototype.setVisibility = function(t) {
            return this._visibility = t, this
        }
    }), o.defineTag("hue-page", "hue-block", function(t) {
        t.prototype.hover = function(t) {
            return this._hover
        }, t.prototype.setHover = function(t) {
            return this._hover = t, this
        }, t.prototype.blocks = function() {
            return this._body.children()
        }, t.prototype.body = function() {
            var t = (this.$$ || (this.$$ = {}), this);
            return (t._body = t._body || s("div", t).flag("body")).setContent([t.data().blocks.map(function(e) {
                return Hue.nodeForBlock(t, e).end().showNode()
            }).filter(function(t) {
                return t
            }), t.footer()], 1)
        }, t.prototype.header = function() {
            var t;
            this.$$ || (this.$$ = {});
            return (t = this._header = this._header || (t = s("div", this)).flag("header").flag("site-nav").on$(0, ["tap", "goToTop"], this)).setContent([t.$.A || s("div", t.$, "A", t).flag("site-title"), this.menu()], 1).end((t.$.A.setContent(Hue.get("site.title"), 3), !0))
        }, t.prototype.footer = function() {
            var t;
            this.$$ || (this.$$ = {});
            return (t = this._footer = this._footer || (t = s("hue-page-footer", this)).flag("footer").flag("site-footer").setContent(t.$.A || s("div", t.$, "A", t).flag("body").setContent([s("span", t.$, "B", "A").setText("Levert av "), s("a", t.$, "C", "A").setHref("http://hjemmesidehuset.no").setText("Hjemmesidehuset AS")], 2), 2)).end((t.$.C.end(), !0))
        }, t.prototype.render = function() {
            var t = this.$;
            return this.$open(0).setChildren([this.dialogMenu(), (t[0] || s("div", t, 0, this).flag("menu-toggler").on$(0, ["tap", "showMenu"], this)).setTabindex(-1).end(), this.header(), this.body(), Hue.get("site.useCookies") ? (t[1] || s("hue-cookies", t, 1, this)).end() : void 0], 1).synced(), this.restyle()
        }, t.prototype.menuItems = function() {
            return Hue.getMenu()
        }, t.prototype.menu = function() {
            var t, e = (this.$$ || (this.$$ = {}), this);
            return (t = e._menu = e._menu || (t = s("div", e)).flag("menu").setContent(t.$.A || s("div", t.$, "A", t).flag("items"), 2)).end((t.$.A.setContent(function(t) {
                for (var n, o = 0, r = i(e.menuItems()), a = t.taglen = r.length; o < a; o++) n = r[o], (t[o] || s("a", t, o).flag("menuitem")).setHref(n.url).setContent(n.title, 3).end();
                return t
            }(t.$.B || r(t.$, "B", t.$.A)), 4), !0))
        }, t.prototype.dialogMenu = function() {
            var t, e = (this.$$ || (this.$$ = {}), this);
            return (t = e._dialogMenu = e._dialogMenu || (t = s("hue-dialog", e)).flag("dialog-menu").flag("fixed").flag("large").flag("site-menu").setContent(t.$.A || s("div", t.$, "A", t).flag("items"), 2)).end((t.$.A.setContent(function(t) {
                for (var n, o = 0, r = i(e.menuItems()), a = t.taglen = r.length; o < a; o++) n = r[o], (t[o] || s("a", t, o).flag("item")).setHref(n.url).setContent(n.title, 3).end();
                return t
            }(t.$.B || r(t.$, "B", t.$.A)), 4), !0))
        }, t.prototype.navigateTo = function(t) {
            return document.location.href = t.url, this
        }, t.prototype.goToTop = function(t) {
            return t.target() == this._header ? (t.halt(), window.scrollTo(0, 0)) : t.setResponder(null), this
        }, t.prototype.showMenu = function() {
            return this.dialogMenu().hasFlag("show") ? this.dialogMenu().hide() : this.dialogMenu().show(), this
        }, t.prototype.onmenushow = function(t) {
            return this.log("onshowmenu", t), this.showMenu()
        }, t.prototype.deserialize = function(t) {
            return this.removeAllChildren(), this.setDid(t._id), this.setData(t), this.render(), this.restyle(), this.relayout(), this.delay("recalcVisibility", 1e3), this
        }, t.prototype.didmount = function() {
            return this
        }, t.prototype.didunmount = function() {
            return this
        }, t.prototype.resized = function(t) {
            var e = this;
            return e._resizing ? (clearTimeout(e._resizing), e._resizing = null) : e.flag("resizing"), e.delay("relayout", 200), e.delay("reflowText", 50), e._resizing = setTimeout(function() {
                return e.resizeend()
            }, 500), e
        }, t.prototype.resizeend = function() {
            return this._resizing = null, this.unflag("resizing"), this.reflow(), this
        }, t.prototype.reflowText = function() {
            for (var t, e = 0, n = i(this.querySelectorAll(".l-wordflow")), o = n.length; e < o; e++) t = n[e], t._layout && t._layout.reflow();
            return this
        }, t.prototype.scrolled = function(t) {
            this._scrollers || (this._scrollers = this.querySelectorAll(".onscroll"));
            var e = this.scrollY();
            this.flag("pin-nav", e > 300);
            for (var n = 0, o = i(this._scrollers), r = o.length; n < r; n++) o[n].scrolled(t, e);
            return this.delay("recalcVisibility", 200), this
        }, t.prototype.scrollNode = function() {
            return document.scrollingElement || document.documentElement
        }, t.prototype.scrollY = function() {
            return window.scrollY || this.scrollNode().scrollTop
        }, t.prototype.recalcVisibility = function() {
            this._scrollY = window.scrollY || this.scrollNode().scrollTop, this._height = window.innerHeight, this._width = window.innerWidth;
            for (var t, e = this._scrollY, n = this._scrollY + this._height, o = 0, r = i(this.blocks()), s = r.length; o < s; o++) {
                t = r[o];
                var a = t._bbox || (t._bbox = {});
                a.top || (a.top = t.dom().offsetTop), a.height || (a.height = t.dom().offsetHeight), a.bottom || (a.bottom = a.top + a.height);
                var u = a.visible || (a.visible = 0),
                    h = e - a.top,
                    p = a.bottom - n,
                    l = 1;
                h > 0 ? l = 1 - h / a.height : p > 0 && (l = 1 - p / a.height), l < 0 && (l = 0), a.visible = l, u != l && t.setVisibility(a.visible)
            }
            return this
        }, t.prototype.styleRules = function() {
            return "border-color: @site.color; color: @site.color;"
        }, t.prototype.loaded = function() {
            return this.reflow()
        }, t.prototype.restyle = function() {
            return t.__super__.restyle.apply(this, arguments), this
        }, t.prototype.reflow = function() {
            for (var t, e = 0, n = i(this.querySelectorAll(".layout")), o = n.length; e < o; e++) t = n[e], t._layout && t._layout.reflow();
            return this
        }, t.prototype.reawaken = function() {
            for (var t = 0, e = i(this.querySelectorAll(".awaken")), n = e.length; t < n; t++) e[t].unflag("awaken");
            return this
        }, t.prototype.refresh = function() {
            for (var t = 0, e = i(this.querySelectorAll(".dirty")), n = e.length; t < n; t++) e[t].unflag("dirty").refresh();
            return this
        }, t.prototype.rehover = function() {
            return this
        }
    })
}, function(t, e, n) {
    function i(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }
    var o = n(0),
        r = o.createTagList,
        s = o.createElement;
    o.defineTag("hue-posts", "hue-block", function(t) {
        t.prototype.index = function(t) {
            return this._index
        }, t.prototype.setIndex = function(t) {
            return this._index = t, this
        }, t.prototype.__hover = {
            watch: "hoverDidSet",
            name: "hover"
        }, t.prototype.hover = function(t) {
            return this._hover
        }, t.prototype.setHover = function(t) {
            var e = this.hover();
            return t != e && (this._hover = t), t != e && this.hoverDidSet && this.hoverDidSet(t, e, this.__hover), this
        }, t.prototype.type = function(t) {
            return this._type
        }, t.prototype.setType = function(t) {
            return this._type = t, this
        }, t.prototype.itemType = function() {
            return "post"
        }, t.prototype.posts = function() {
            return Hue.getPostsForBlock(this.data())
        }, t.prototype.backdrop = function() {
            this.$$ || (this.$$ = {});
            return this._backdrop = this._backdrop || s("div", this).flag("backdrop")
        }, t.prototype.body = function() {
            this.$$ || (this.$$ = {});
            return (this._body = this._body || s("div", this).flag("body").flag("wide")).setFlag(0, this.type())
        }, t.prototype.item = function(t, e) {
            var n, i = this.$$ || (this.$$ = {});
            return i[n = "index$" + e] || s("div", i, n, this).flag("item")
        }, t.prototype.synced = function() {
            return this.renderBody(), this
        }, t.prototype.renderBody = function() {
            var t = this;
            return t._body.setChildren(t.posts().map(function(e, n) {
                return t.item(e, n, Hue.getBlockPostOptions(t.data(), n))
            }))
        }, t.prototype.sel = function() {
            return this.data().content
        }, t.prototype.setup = function() {
            var e = this;
            return e.flag("dirty"), t.__super__.setup.apply(e, arguments), e.dom().addEventListener("mouseenter", function(t) {
                return e.ondommouseenter(t)
            }), e.dom().addEventListener("mouseover", function(t) {
                return e.ondommouseover(t)
            }), e.dom().addEventListener("mouseleave", function(t) {
                return e.ondommouseleave(t)
            }), e
        }, t.prototype.refresh = function() {
            return this
        }, t.prototype.ondommouseover = function(t) {
            for (var e = t.target; e && e.parentNode != this._body.dom();) e = e == this.dom() ? null : e.parentNode;
            return this.setHover(e ? o.getTagForDom(e) : null), this
        }, t.prototype.ondommouseenter = function(t) {
            return this
        }, t.prototype.ondommouseleave = function(t) {
            return this.setHover(null), null
        }, t.prototype.ontiletap = function(t) {
            var e;
            return t.halt(), this.setHover(e = t.target()), e
        }, t.prototype.hoverDidSet = function(t, e) {
            var n, i;
            if (e && (e.unflag("hover"), (n = e) && n.hoverout && n.hoverout()), t && (t.flag("hover"), (i = t) && i.hoverin && i.hoverin()), !t != !e) return this.flag("hoveritem", !!t)
        }
    }), o.defineTag("hue-post", function(t) {
        t.prototype.owner = function(t) {
            return this._owner
        }, t.prototype.setOwner = function(t) {
            return this._owner = t, this
        }, t.prototype.expand = function() {
            return this
        }, t.prototype.collapse = function() {
            return this
        }, t.prototype.hoverin = function() {
            return this.expand()
        }, t.prototype.hoverout = function() {
            return this.collapse()
        }, t.prototype.hud = function() {
            return null
        }, t.prototype.bind = function(t, e) {
            return this._owner = e, this
        }, t.prototype.o = function(t, e) {
            return this._owner.o(t, e)
        }, t.prototype.body = function() {
            this.$$ || (this.$$ = {});
            return this._body = this._body || s("div", this).flag("body")
        }, t.prototype.render = function() {
            return this.$open(0).setChildren(this.body(), 3).synced()
        }, t.prototype.showMore = function() {
            var t;
            return this.data().content && o.mount((t = (t = s("hue-paper")).setContent(t.$.A || s("div", t.$, "A", t).flag("popover").setContent([s("hue-article", t.$, "B", "A"), s("button", t.$, "C", "A").flag("close").dataset("action", "hide").setText("Lukk")], 2), 2)).end((t.$.B.bindData(this, "data", []).end(), t.$.C.end(), !0))), this
        }, t.prototype.follow = function(t) {
            if (this.data().link) {
                var e = this.data().link,
                    n = e.match(/^#(.+)$/);
                if (!n) return e.match(/^(\/|http)/) || (e = "http://" + e), t && t.halt(), window.open(e, "_blank");
                t && t.halt().cancel();
                var i = n.slice(1),
                    r = document.getElementById(i),
                    s = r && o.getTagForDom(r.parentNode);
                return s ? s.scrollIntoView() : void 0
            }
        }
    }), o.defineTag("hue-articles", "hue-posts", function(t) {
        t.prototype.candrop = function(t) {
            return t.data() instanceof Post && "blurb" == t.data().type()
        }, t.prototype.onidedrop = function(t) {
            if (this.log("hue-articles onidedrop", t, t.data()), t.data() instanceof Post) return this.model().setContentAtIndex(t.data(), 0), this
        }, t.prototype.item = function(t, e) {
            return Hue.nodeForPost(this, t, "article", e).setData(t).end()
        }
    }), o.defineTag("hue-article", "hue-post", function(t) {
        t.prototype.render = function() {
            var t, e = this.$;
            return this.$open(0).setChildren([t = this._body = this._body || (t = s("div", this)).flag("body").setContent([s("div", e, 0, this._body).flag("title"), this._article = this._article || s("hue-content", t).flag("article")], 2), this.hud()], 1).synced((e[0].setContent(this.data().title, 3), this._article.setContent(this.data().content).end(), !0)), this.rendered()
        }, t.prototype.rendered = function() {
            var t = this._article.dom().textContent.length;
            return this.setFlag("size", t > 800 ? "long" : null), this
        }
    }), o.defineTag("hue-tabs", "hue-posts", function(t) {
        t.prototype.__selectedIndex = {
            default: 0,
            name: "selectedIndex"
        }, t.prototype.selectedIndex = function(t) {
            return this._selectedIndex
        }, t.prototype.setSelectedIndex = function(t) {
            return this._selectedIndex = t, this
        }, t.prototype._selectedIndex = 0, o.defineTag("tab", function(t) {
            t.prototype.select = function() {
                return this.trigger("select", {
                    index: this.index()
                }), this
            }, t.prototype.render = function() {
                var t = this.$;
                return this.$open(0).setChildren(t[0] || s("a", t, 0, this).on$(0, ["tap", "select"], this), 2).synced((t[0].setContent(this.data().title, 3), !0))
            }
        }), t.prototype.tabs = function() {
            var t, e = (this.$$ || (this.$$ = {}), this);
            return (t = e._tabs = e._tabs || (t = s("div", e)).flag("tabs")).setContent(function(t) {
                for (var n = 0, o = i(e.posts()), r = t.taglen = o.length; n < r; n++)(t[n] || s("tab", t, n)).setData(o[n]).flagIf("selected", n == e.selectedIndex()).end();
                return t
            }(t.$.A || r(t.$, "A", e._tabs)), 4)
        }, o.defineTag("post", function(t) {
            t.prototype.index = function(t) {
                return this._index
            }, t.prototype.setIndex = function(t) {
                return this._index = t, this
            }
        }), t.prototype.onselect = function(t) {
            return t.halt(), this.setSelectedIndex(t.data().index), this.render(), this
        }, t.prototype.selectedItem = function() {
            return this.posts()[this.selectedIndex()]
        }, t.prototype.renderBody = function() {
            var t;
            this.$$ || (this.$$ = {});
            return this.body().setChildren((t = this._content = this._content || (t = s("li", this)).flag("content").setContent(t.$.A || s("hue-content", t.$, "A", t).flag("article"), 2)).end((t.$.A.setContent(this.selectedItem().content).end(), !0)))
        }, t.prototype.render = function() {
            var t = this.$;
            return this.$open(0).setChildren(t[0] || s("div", t, 0, this).flag("container"), 2).synced((t[0].setContent([this.tabs(), this.body()], 1), !0))
        }
    })
}, function(t, e, n) {
    function i(t) {
        return t && "http" != t.substr(0, 4) && (t = "http://" + t), t
    }
    var o = n(0),
        r = o.createTagMap,
        s = o.createElement;
    n(28);
    o.defineTag("microdata", function(t) {
        t.prototype.__value = {
            watch: "refresh",
            name: "value"
        }, t.prototype.value = function(t) {
            return this._value
        }, t.prototype.setValue = function(t) {
            var e = this.value();
            return t != e && (this._value = t), t != e && this.refresh && this.refresh(t, e, this.__value), this
        }, t.prototype.refresh = function() {
            var t = this.value();
            return ("string" == typeof t || t instanceof String) && t.trim().match(/^\d+$/) && this.setText("Tlf " + t), this
        }
    }), o.extendTag("a", function(t) {
        t.prototype.target = function(t) {
            return this.getAttribute("target")
        }, t.prototype.setTarget = function(t) {
            return this.setAttribute("target", t), this
        }
    }), o.defineTag("socialmedia", function(t) {
        var e = ["facebook", "googleplus", "twitter", "linkedin", "vimeo", "youtube", "instagram", "pinterest"];
        t.prototype.render = function() {
            var t = this,
                n = this.$;
            return t.object() ? t.$open(0).setChildren(t.object() ? function(n) {
                for (var o, r, a = n.$iter(), u = 0, h = e.length; u < h; u++) r = e[u], t.object()[r] && a.push((o = n[r] || (o = s("a", n, r)).flag("social").setTarget("_blank").setContent([s("i", o.$, "A", o), s("b", o.$, "B", o)], 2)).setFlag(0, r).setHref(i(t.object()[r])).end((o.$.A.setFlag(0, r), o.$.B.setContent(r, 3), !0)));
                return a
            }(n[0] || r(n, 0)) : void 0, 3).synced() : t
        }
    }), o.defineTag("em"), o.defineTag("hue-vcard", function(t) {
        t.prototype.__showSocial = {
            default: !0,
            name: "showSocial"
        }, t.prototype.showSocial = function(t) {
            return this._showSocial
        }, t.prototype.setShowSocial = function(t) {
            return this._showSocial = t, this
        }, t.prototype._showSocial = !0, t.prototype.__showAddress = {
            default: !0,
            name: "showAddress"
        }, t.prototype.showAddress = function(t) {
            return this._showAddress
        }, t.prototype.setShowAddress = function(t) {
            return this._showAddress = t, this
        }, t.prototype._showAddress = !0, t.prototype.hours = function() {
            return Hue.get("aapningstider")
        }, t.prototype.render = function() {
            var t = this.$,
                e = Hue.get("telefon"),
                n = Hue.get("mobil"),
                i = Hue.get("epost"),
                o = Hue.get("aapningstider"),
                r = Hue.get("adresse"),
                a = Hue.get("site.socialmedia|org.socialmedia"),
                u = Hue.get("org._id");
            return this.$open(0).setChildren([i ? (t[0] || s("div", t, 0, this).flag("email").flag("f").setTitle("epost").setContent([s("i", t, 1, 0), s("b", t, 2, 0)], 2)).end((t[2].setContent(Hue.email(i), 3), !0)) : void 0, e && e != n ? (t[3] || s("hue-phone", t, 3, this).flag("f").setTitle("tlf")).setData(e).end() : void 0, n ? (t[4] || s("hue-phone", t, 4, this).flag("mobile").flag("f").setTitle("mob")).setData(n).end() : void 0, this.showAddress() && r ? (t[5] || s("hue-address", t, 5, this).flag("address").flag("f")).setData(r).end() : void 0, o ? (t[6] || s("hue-hours", t, 6, this).flag("f")).setData(o).end() : void 0, this.showSocial() && a ? (t[7] || s("socialmedia", t, 7, this)).setData(a).end() : void 0, u ? (t[8] || s("div", t, 8, this).flag("f").flag("orgnr").setTitle("organisasjonsnummer").setContent([s("i", t, 9, 8), s("b", t, 10, 8)], 2)).end((t[10].setText("Orgnr " + String(u).match(/.{3}/g).join(" ")), !0)) : void 0], 1).synced()
        }
    }), o.defineTag("hue-address", function(t) {
        t.prototype.street = function() {
            return this.object().street
        }, t.prototype.commit = function() {
            if (this.object()) return this.render()
        }, t.prototype.render = function() {
            var t = this.$;
            return this.$open(0).setChildren(t.$ = t.$ || [s("i", t, 0, this), s("b", t, 1, this)], 2).synced((t[1].setContent([this.street() ? (t[2] || s("span", t, 2, 1).flag("street")).setText(this.street() + ", ") : void 0, (t[3] || s("span", t, 3, 1).flag("place")).setText(this.object().postcode + " " + this.object().postplace)], 1), !0))
        }
    }), o.defineTag("hue-email", "a", function(t) {
        t.prototype.render = function() {
            var t = this.$;
            return this.$open(0).flag("email").setHref("mailto:" + Hue.email(this.data())).setChildren(t.$ = t.$ || [s("i", t, 0, this), s("b", t, 1, this)], 2).synced((t[1].setContent(Hue.email(this.data()), 3), !0))
        }
    }), o.defineTag("hue-phone", "a", function(t) {
        t.prototype.href = function(t) {
            return this.getAttribute("href")
        }, t.prototype.setHref = function(t) {
            return this.setAttribute("href", t), this
        };
        var e = {
            mobile: /^([489]\d\d)(\d\d)(\d\d\d)$/,
            regular: /^(\d\d)(\d\d)(\d\d)(\d\d)$/
        };
        t.prototype.number = function() {
            for (var t, n, i, o = this.object(), r = 0, s = Object.keys(e), a = s.length; r < a; r++)
                if (i = s[r], n = e[i], t = o.match(n)) return t.slice(1).join(" ");
            return o
        }, t.prototype.render = function() {
            var t = this.$;
            return this.$open(0).setHref("tel:" + this.object()).setChildren(t.$ = t.$ || [s("i", t, 0, this), s("b", t, 1, this)], 2).synced((t[1].setContent(this.number(), 3), !0))
        }
    })
}, function(t, e) {
    var n = function(t, e, n) {
            var i = "0123456789",
                o = "abcdefghijklmnopqrstuvwxyz",
                r = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                s = /[0-9]/,
                a = /[a-z]/,
                u = /[A-Z]/;
            n = String(n), t < 0 && (t += 26), e < 0 && (e += 10);
            for (var h, p, l, c = n.length, d = -1, f = ""; ++d < c;) h = n.charAt(d), s.test(h) ? (p = i.indexOf(h), l = (p + e) % 10, f += i.charAt(l)) : a.test(h) ? (p = o.indexOf(h), l = (p + t) % 26, f += o.charAt(l)) : u.test(h) ? (p = r.indexOf(h), l = (p + t) % 26, f += r.charAt(l)) : f += h;
            return f
        },
        i = function(t) {
            return n(13, 5, t)
        };
    t.exports = {
        rot: n,
        encode: i,
        decode: i
    }
}, function(t, e, n) {
    var i = n(0),
        o = i.createElement,
        r = window.devicePixelRatio || 1;
    i.defineTag("hue-image", function(t) {
        t.prototype.size = function(t) {
            return this._size
        }, t.prototype.setSize = function(t) {
            return this._size = t, this
        }, t.prototype.content = function(t) {
            return this._content
        }, t.prototype.setContent = function(t) {
            return this._content = t, this
        }, t.prototype.__pos = {
            watch: "posDidSet",
            name: "pos"
        }, t.prototype.pos = function(t) {
            return this._pos
        }, t.prototype.setPos = function(t) {
            var e = this.pos();
            return t != e && (this._pos = t), t != e && this.posDidSet && this.posDidSet(t, e, this.__pos), this
        }, t.prototype.__did = {
            watch: "reload",
            name: "did"
        }, t.prototype.did = function(t) {
            return this.getAttribute("did")
        }, t.prototype.setDid = function(t) {
            var e = this.did();
            return t != e && this.setAttribute("did", t), t != e && this.reload && this.reload(t, e, this.__did), this
        }, t.prototype.url = function(t, e) {
            e && e.constructor === Object || (e = {});
            var n = void 0 !== e.blur ? e.blur : 0,
                i = (void 0 !== e.size && e.size, void 0 !== e.width ? e.width : null),
                o = void 0 !== e.height ? e.height : null,
                s = void 0 !== e.tint ? e.tint : null,
                n = void 0 !== e.blur ? e.blur : 0,
                a = (void 0 !== e.hq && e.hq, void 0 !== e.ext ? e.ext : "jpg"),
                u = t + "__",
                h = [];
            return r > 1 && h.push("hq"), i && h.push("w" + i), o && h.push("w" + o), n && h.push("b" + Math.round(100 * n)), s && (this.log("url with tint " + s), h.push("t" + Hue.parseColorToHex(s).substr(1))), u += h.join("_"), a && (u += "." + a), u = "/images/" + u
        }, t.prototype.reload = function() {
            if (!this.did() || "null" == this.did()) return this;
            var t = {},
                e = window.innerWidth;
            window.innerHeight;
            return e < 500 ? t.height = 568 : t.width = e < 800 ? 768 : e <= 1024 ? 1024 : e <= 1280 ? 1280 : 1440, 3 == this.size() && (t.width = 400, t.height, delete t.height), this.img().css({
                backgroundImage: "url(" + this.url(this.did(), t) + ")"
            }), t.blur = .3, this.glass().css({
                backgroundImage: "url(" + this.url(this.did(), t) + ")"
            }), this
        }, t.prototype.posDidSet = function(t) {
            return this.img().css({
                backgroundPosition: t || "center"
            }), this.glass().css({
                backgroundPosition: t || "center"
            })
        }, t.prototype.img = function() {
            this.$$ || (this.$$ = {});
            return this._img = this._img || o("div", this).flag("img")
        }, t.prototype.glass = function() {
            this.$$ || (this.$$ = {});
            return this._glass = this._glass || o("div", this).flag("glass")
        }, t.prototype.render = function() {
            var t = this.$;
            return this.$open(0).flagIf("empty", !this.did()).setChildren([this._cover = this._cover || o("div", this).flag("cover"), this.img(), this.glass(), t[0] || o("div", t, 0, this).flag("body")], 1).synced((t[0].setContent(this.content(), 3), !0))
        }, t.prototype.expand = function() {
            return TweenMax.to(this.glass().dom(), .4, {
                paddingTop: 0,
                opacity: 1
            }), TweenMax.to(this.img().dom(), .4, {
                scale: 1.2
            }), this
        }, t.prototype.collapse = function() {
            this.height();
            return TweenMax.to(this.glass().dom(), .4, {
                opacity: 0
            }), TweenMax.to(this.img().dom(), .4, {
                scale: 1
            }), this
        }, t.prototype.zoom = function(t, e, n) {
            return void 0 === n && (n = 1), TweenMax.fromTo(this.img().dom(), n, {
                scale: t
            }, {
                scale: e
            })
        }
    }), i.defineTag("hue-logo", function(t) {
        t.prototype.__did = {
            watch: "reload",
            name: "did"
        }, t.prototype.did = function(t) {
            return this.getAttribute("did")
        }, t.prototype.setDid = function(t) {
            var e = this.did();
            return t != e && this.setAttribute("did", t), t != e && this.reload && this.reload(t, e, this.__did), this
        }, t.prototype.url = function(t, e) {
            e && e.constructor === Object || (e = {});
            var n = void 0 !== e.dpi ? e.dpi : 1,
                i = ["logo", "w280"];
            return n > 1 && i.push("hq"), "/images/" + t + "__" + i.join("_") + ".png"
        }, t.prototype.img = function() {
            this.$$ || (this.$$ = {});
            return this._img = this._img || o("img", this).flag("img")
        }, t.prototype.reload = function() {
            var t = Hue.assetUrl(this.did(), {
                    dpi: 2,
                    width: 280,
                    height: 80,
                    ext: "png"
                }),
                e = Hue.assetUrl(this.did(), {
                    dpi: 1,
                    width: 280,
                    height: 80,
                    ext: "png"
                });
            return this.img().setSrc(e), this.img().setAttribute("srcset", t + " 2x")
        }, t.prototype.render = function() {
            return this.$open(0).setChildren(this.img(), 3).synced()
        }
    }), i.defineTag("hue-avatar", function(t) {
        t.prototype.__did = {
            watch: "reload",
            name: "did"
        }, t.prototype.did = function(t) {
            return this.getAttribute("did")
        }, t.prototype.setDid = function(t) {
            var e = this.did();
            return t != e && this.setAttribute("did", t), t != e && this.reload && this.reload(t, e, this.__did), this
        }, t.prototype.img = function() {
            this.$$ || (this.$$ = {});
            return this._img = this._img || o("div", this).flag("img")
        }, t.prototype.reload = function() {
            var t = Hue.assetUrl(this.did(), {
                dpi: 2,
                width: 120,
                height: 120,
                ext: "jpg"
            });
            return this.img().css({
                backgroundImage: "url(" + t + ")"
            })
        }, t.prototype.render = function() {
            return this.$open(0).setChildren(this.img(), 3).synced()
        }
    }), i.defineTag("hue-brand-logo", function(t) {
        t.prototype.__did = {
            watch: "reload",
            name: "did"
        }, t.prototype.did = function(t) {
            return this.getAttribute("did")
        }, t.prototype.setDid = function(t) {
            var e = this.did();
            return t != e && this.setAttribute("did", t), t != e && this.reload && this.reload(t, e, this.__did), this
        }, t.prototype.url = function(t, e) {
            e && e.constructor === Object || (e = {});
            var n = void 0 !== e.dpi ? e.dpi : 1,
                i = ["logo", "w280"];
            return n > 1 && i.push("hq"), "/images/" + t + "__" + i.join("_") + ".png"
        }, t.prototype.img = function() {
            this.$$ || (this.$$ = {});
            return this._img = this._img || o("img", this).flag("img")
        }, t.prototype.reload = function() {
            var t = Hue.assetUrl(this.did(), {
                    dpi: 2,
                    area: 6400,
                    ext: "png"
                }),
                e = Hue.assetUrl(this.did(), {
                    dpi: 1,
                    area: 6400,
                    ext: "png"
                });
            return this.img().setSrc(e), this.img().setAttribute("srcset", t + " 2x")
        }, t.prototype.render = function() {
            return this.$open(0).setChildren(this.img(), 3).synced()
        }
    })
}, function(t, e, n) {
    var i = n(0),
        o = i.createElement;
    i.defineTag("hue-icon", function(t) {
        t.prototype.__did = {
            watch: "refresh",
            name: "did"
        }, t.prototype.did = function(t) {
            return this.getAttribute("did")
        }, t.prototype.setDid = function(t) {
            var e = this.did();
            return t != e && this.setAttribute("did", t), t != e && this.refresh && this.refresh(t, e, this.__did), this
        }, t.prototype.__src = {
            watch: "reload",
            name: "src"
        }, t.prototype.src = function(t) {
            return this._src
        }, t.prototype.setSrc = function(t) {
            var e = this.src();
            return t != e && (this._src = t), t != e && this.reload && this.reload(t, e, this.__src), this
        }, t.prototype.color = function(t) {
            return this._color
        }, t.prototype.setColor = function(t) {
            return this._color = t, this
        }, t.prototype.commit = function() {
            return this.setSrc(this.url(this.did(), {
                color: this.color()
            })), this.render()
        }, t.prototype.refresh = function() {
            return this
        }, t.prototype.load = function() {
            return this.refresh(), this
        }, t.prototype.reload = function() {
            return this.color() && this.css("border-color", this.color()), this.img().css({
                backgroundImage: "url(" + this.src() + ")"
            })
        }, t.prototype.url = function(t, e) {
            e && e.constructor === Object || (e = {});
            var n = void 0 !== e.color ? e.color : "rgb(117, 185, 199)";
            return n ? (n = n.replace("#", ""), "/assets/" + this.did() + "__c" + escape(n) + ".svg") : "/assets/" + this.did() + "__c.svg"
        }, t.prototype.img = function() {
            this.$$ || (this.$$ = {});
            return this._img = this._img || o("div", this).flag("img")
        }, t.prototype.frame = function() {
            this.$$ || (this.$$ = {});
            return this._frame = this._frame || o("div", this).flag("frame")
        }, t.prototype.render = function() {
            var t = this.$;
            return this.$open(0).setChildren([t[0] || o("div", t, 0, this).flag("before"), this.did() ? this.img() : void 0, this.frame(), t[1] || o("div", t, 1, this).flag("after")], 1).synced()
        }
    })
}, function(t, e, n) {
    n(0).defineTag("hue-dialog", function(t) {
        t.prototype.content = function(t) {
            return this._content
        }, t.prototype.setContent = function(t) {
            return this._content = t, this
        }, t.prototype.render = function() {
            return this.$open(0).setTabindex(-1).setChildren(this.content(), 3).synced()
        }, t.prototype.show = function() {
            return this.flag("show"), clearTimeout(this._timeout), this.focus()
        }, t.prototype.hide = function() {
            return this.unflag("show"), clearTimeout(this._timeout), this
        }, t.prototype.onfocusout = function(t) {
            if (!this.dom().contains(t.event().relatedTarget)) return clearTimeout(this._timeout), t.event().relatedTarget == this.dom().nextSibling ? this : this.hide()
        }
    })
}, function(t, e, n) {
    function i(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }

    function o(t, e) {
        return void 0 === e && (e = "i"), t = t.replace(/(^| |\>)([^ \<\>]+)/g, function(t, n, i, o) {
            return n + "<" + e + ">" + i + "</" + e + ">"
        }), t = t.replace(/\$\*\$/g, " ")
    }

    function r(t) {
        return u.document().createTextNode(t)
    }

    function s(t, e, n) {
        void 0 === e && (e = 0), void 0 === n && (n = 4);
        var o = [],
            r = t.nodeName.toLowerCase(),
            a = {
                type: r
            };
        if ("#text" == r) return t.textContent;
        if ("#c" != r[0] && "br" != r) {
            "a" == r && (a.href = t.href);
            var u = (t.className || "").split(" ");
            if (u = u.filter(function(t) {
                    return !!t.match(/^ux\-/)
                }), u.length && (a.flags = u), e >= n) a.html = t.innerHTML;
            else {
                for (var h = 0, p = i(t.childNodes), l = p.length; h < l; h++) {
                    var c = s(p[h], e + 1, n);
                    c instanceof Array ? o.push.apply(o, c) : c && o.push(c)
                }
                a.children = o
            }
            return 0 == e ? a.text || a.children : "span" == r ? a.children || a.text || a.html : a
        }
    }

    function a(t, e, n) {
        void 0 === n && (n = {});
        var s = t._body || t;
        if (n.bare || t._body || u.indexOf(t.nodeName, ["UL", "SPAN", "TABLE", "TR", "TBODY"]) >= 0 || (s = t._body = u.document().createElement("span"), t.appendChild(s)), "string" == typeof e || e instanceof String) s.innerHTML = n.wordwrap ? o(Hue.deobfuscate(e)) : Hue.deobfuscate(e);
        else if (e instanceof Array) {
            var h = e[0];
            if (1 == e.length && h.type == t.nodeName.toLowerCase()) return a(t, h.children, n);
            t._types || (t._types = []);
            for (var p, l = 0, c = i(e), d = c.length; l < d; l++)
                if ("string" == typeof(p = c[l]) || p instanceof String) s.appendChild(r(Hue.deobfuscate(p)));
                else if (p.type) {
                if ("#" == p.type[0]) continue;
                if (0 == l && "div" == p.type && (p.type = "p"), n.only instanceof Array && -1 == n.only.indexOf(p.type)) continue;
                var f = u.document().createElement(p.type);
                if (p.children ? a(f, p.children, n) : p.html ? f.innerHTML = Hue.deobfuscate(p.html) : p.text && (f.textContent = Hue.deobfuscate(p.text)), p.href && (f.href = Hue.deobfuscate(p.href)), p.flags && (f.className = p.flags.join(" ")), n.wrap) {
                    var y = u.document().createElement(n.wrap);
                    y.className = "t-" + p.type, y.appendChild(f), f = y
                }
                f && (t._types.push(p.type), n.flow instanceof Array && u.indexOf(p.type, n.flow) >= 0 && f.setAttribute("data-layout", "textflow"), s.appendChild(f))
            }
        }
        return t
    }
    var u = n(0),
        h = u.createElement,
        p = n(33),
        l = (p.FlowLayout, p.TextFlowLayout),
        c = n(35).TextFitLayout;
    e.serialize = s, e.deserialize = a, u.defineTag("hue-span", "span", function(t) {
        t.prototype.__content = {
            watch: "rebuild",
            name: "content"
        }, t.prototype.content = function(t) {
            return this._content
        }, t.prototype.setContent = function(t) {
            var e = this.content();
            return t != e && (this._content = t), t != e && this.rebuild && this.rebuild(t, e, this.__content), this
        }, t.prototype.rebuild = function(t) {
            return this.removeAllChildren(), this._dom._body = null, a(this.dom(), t, {
                wrap: "span"
            })
        }
    }), u.defineTag("hue-h1", "h1"), u.defineTag("hue-h2", "h2", function(t) {
        t.prototype.__content = {
            watch: "rebuild",
            name: "content"
        }, t.prototype.content = function(t) {
            return this._content
        }, t.prototype.setContent = function(t) {
            var e = this.content();
            return t != e && (this._content = t), t != e && this.rebuild && this.rebuild(t, e, this.__content), this
        }, t.prototype.rebuild = function(t) {
            return this.removeAllChildren(), this._dom._body = null, a(this.dom(), t, {
                wrap: "span"
            })
        }
    }), u.defineTag("hue-h3", "h3"), u.defineTag("hue-p", "p", function(t) {
        t.prototype.__content = {
            watch: "rebuild",
            name: "content"
        }, t.prototype.content = function(t) {
            return this._content
        }, t.prototype.setContent = function(t) {
            var e = this.content();
            return t != e && (this._content = t), t != e && this.rebuild && this.rebuild(t, e, this.__content), this
        }, t.prototype.rebuild = function(t) {
            return this.removeAllChildren(), this._dom._body = null, a(this.dom(), t, {
                wrap: "span"
            })
        }
    }), u.defineTag("text", function(t) {
        t.prototype.type = function(t) {
            return this.getAttribute("type")
        }, t.prototype.setType = function(t) {
            return this.setAttribute("type", t), this
        }, t.prototype.__text = {
            watch: "rebuild",
            name: "text"
        }, t.prototype.text = function(t) {
            return this._text
        }, t.prototype.setText = function(t) {
            var e = this.text();
            return t != e && (this._text = t), t != e && this.rebuild && this.rebuild(t, e, this.__text), this
        }, t.prototype.rebuild = function(t) {
            return this.span().removeAllChildren(), this.span().dom()._body = this.span().dom(), a(this.span().dom(), t, {
                wordwrap: !0
            }), this.layout().reflow(), this
        }, t.prototype.span = function() {
            this.$$ || (this.$$ = {});
            return this._span = this._span || h("span", this).flag("span")
        }, t.prototype.render = function() {
            return this.$open(0).setChildren(this.span(), 3).synced()
        }, t.prototype.refresh = function() {
            return this
        }, t.prototype.layout = function() {
            return this._layout || (this._layout = "fit" == this.type() ? new c(this, {
                body: this.span()
            }) : new l(this, {
                body: this.span()
            }))
        }
    }), u.defineTag("hue-content", function(t) {
        t.prototype.type = function(t) {
            return this.getAttribute("type")
        }, t.prototype.setType = function(t) {
            return this.setAttribute("type", t), this
        }, t.prototype.flow = function(t) {
            return this._flow
        }, t.prototype.setFlow = function(t) {
            return this._flow = t, this
        }, t.prototype.wrap = function(t) {
            return this._wrap
        }, t.prototype.setWrap = function(t) {
            return this._wrap = t, this
        }, t.prototype.__content = {
            watch: "rebuild",
            name: "content"
        }, t.prototype.content = function(t) {
            return this._content
        }, t.prototype.setContent = function(t) {
            var e = this.content();
            return t != e && (this._content = t), t != e && this.rebuild && this.rebuild(t, e, this.__content), this
        }, t.prototype.rebuild = function(t, e) {
            return t && e && JSON.stringify(t) == JSON.stringify(e) ? this : (this.removeAllChildren(), this._dom._body = this.dom(), a(this.dom(), this.content(), {
                wrap: this.wrap() && "div",
                flow: this.flow() && ["h1", "h2", "h3", "p"]
            }), this.dom()._types && this.flag("f-" + this.dom()._types[0]), this)
        }, t.prototype.render = function() {
            return this
        }, t.prototype.refresh = function() {
            return this
        }, t.prototype.ondblclick = function(t) {}
    }), u.defineTag("md", function(t) {
        t.prototype.__items = {
            watch: "rebuild",
            name: "items"
        }, t.prototype.items = function(t) {
            return this._items
        }, t.prototype.setItems = function(t) {
            var e = this.items();
            return t != e && (this._items = t), t != e && this.rebuild && this.rebuild(t, e, this.__items), this
        }, t.prototype.body = function() {
            return this
        }, t.prototype.rebuild = function(t) {
            return this.body().removeAllChildren(), a(this.body().dom(), t), this
        }
    })
}, function(t, e, n) {
    function i(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }

    function o(t, e) {
        void 0 === e && (e = {}), this._breaks = [], this._chunks = null, this._cache = [], this._node = t, this._node._layout = this, this.setup(e), t.flag("layout").flag("flow"), this._name && t.setFlag("layout", "l-" + this._name)
    }

    function r(t, e) {
        this._ctx = t, this._string = e, this._items = e.split(" ").map(function(t, e) {
            return {
                value: t,
                index: e
            }
        }), this._widths = [], this._versions = [], this._stops = [], this._calculated = !1, this._calculations = 0, this._asks = []
    }

    function s(t) {
        this._fontFamily = t, this._cache = {}, this._loaded = !1, this._font = t, this._groups = {}, this._testSize = 0, this._canvas = h("canvas").flag("measure"), document.body.appendChild(this._canvas.dom()), this._ctx = this._canvas.dom().getContext("2d"), this._ctx.font = "20px " + this._font, this._loaded = !0, this.check()
    }

    function a() {
        return o.apply(this, arguments)
    }
    var u = n(0),
        h = u.createElement,
        p = n(2).Layout;
    n(34), u.subclass(o, p), e.FlowLayout = o, o.register("flow"), o.prototype.setup = function(t) {
        return this._options = t, this
    }, o.prototype.wake = function() {
        return this.reflow(), this
    }, o.prototype.apply = function() {
        return this._breaks = [], o.__super__.apply.apply(this, arguments), this
    }, o.prototype.template = function(t) {
        return t
    }, o.prototype.chunks = function() {
        if (this._chunks) return this._chunks;
        var t = Linebreaker,
            e = t.linebreak.infinity,
            n = [];
        n.boxes = [];
        var o = this.node().nodes().valueOf(),
            r = o[o.length - 1];
        n.push(t.box(0, "")), n.push(t.glue(0, 12, 0));
        for (var s, a = 0, u = i(o), h = u.length; a < h; a++) {
            s = u[a];
            var p = s.wrapbox && s.wrapbox(),
                l = p[1] + 12;
            n.boxes.push(s), n.push(t.box(l, s)), s == r ? (n.push(t.glue(1, 12, 0, s)), n.push(t.penalty(0, -e, 0, s))) : (n.push(t.glue(1, 12, 0, s)), n.push(t.penalty(0, 0, 0, s)), n.push(t.box(0, s)), n.push(t.penalty(0, e, 0, s)))
        }
        return this._chunks = n
    }, o.prototype.rewrap = function(t) {
        void 0 === t && (t = !1);
        var e = Linebreaker,
            n = (e.linebreak.infinity, this.node().dom().offsetWidth || -1);
        if (-1 != n) {
            var o = (this._bounds, {
                    width: n,
                    height: this.node().dom().offsetHeight
                }),
                r = t || !this._curr;
            if (this._curr && (o.width < this._curr.min || o.width > this._curr.max) && (r = !0), r) {
                var s = this.chunks(),
                    a = s.boxes || [],
                    u = [o.width],
                    h = {
                        line: 1e3,
                        flagged: 1,
                        fitness: 1
                    },
                    p = e.linebreak(s, u, {
                        tolerance: 2e3,
                        demerits: h
                    }),
                    l = 0 == p.length || 3 == a.length && p.length > 2;
                if (p = p.slice(1, -1), p.length == this._breaks.length) return this;
                for (; this._breaks.length > p.length;) this._breaks.pop().orphanize();
                this.node().flag("pack", l);
                for (var c, d = 0, f = [], y = 0, g = i(p), _ = g.length; y < _; y++) {
                    c = g[y];
                    for (var m = s[c.position], v = 0; d < c.position;) {
                        var b = s[d++];
                        b.width && (v += b.width)
                    }
                    if (f.push(v), b = m && m.value) {
                        var T = this._breaks[y] || (this._breaks[y] = this.br());
                        b.parent().insert(T, {
                            after: b
                        })
                    }
                }
                for (v = 0; d < s.length;) b = s[d++], b.width && (v += b.width);
                return f.push(v), this._lengths = f, this._bounds = {
                    width: this.node().dom().offsetWidth,
                    height: this.node().dom().offsetHeight
                }, this._curr = this._cache[f.length] = {
                    lines: f,
                    min: Math.max.apply(Math, f),
                    max: o.width
                }, this
            }
        }
    }, o.prototype.br = function() {
        return h("i").flag("break")
    }, o.prototype.reflow = function(t) {
        return void 0 === t && (t = !1), this.rewrap(t), this
    }, window.MeasureTextWords = r, r.prototype.items = function(t) {
        return this._items
    }, r.prototype.setItems = function(t) {
        return this._items = t, this
    }, r.prototype.nodes = function(t) {
        return this._nodes
    }, r.prototype.setNodes = function(t) {
        return this._nodes = t, this
    }, r.prototype.widths = function(t) {
        return this._widths
    }, r.prototype.setWidths = function(t) {
        return this._widths = t, this
    }, r.prototype.stops = function(t) {
        return this._stops
    }, r.prototype.setStops = function(t) {
        return this._stops = t, this
    }, r.prototype.ctx = function(t) {
        return this._ctx
    }, r.prototype.setCtx = function(t) {
        return this._ctx = t, this
    }, r.prototype.chunks = function() {
        if (this._chunks) return this._chunks;
        var t = Linebreaker,
            e = t.linebreak.infinity,
            n = this._chunks = [],
            o = this._items,
            r = o[o.length - 1],
            s = this.ctx().measure(" ");
        n.push(t.box(0, "")), n.push(t.glue(0, s, 0));
        for (var a, u = 0, h = i(o), p = h.length; u < p; u++) {
            a = h[u];
            var l = this._ctx.measure(a.value) + s;
            a.width = l, n.push(t.box(l, a)), a == r ? n.push(t.penalty(0, -e, 0, a)) : n.push(t.glue(1, s, 0, a))
        }
        return this._chunks
    }, r.prototype.calculate = function(t) {
        if (this._calculated = !0, this._calculations++, this._asks.push(t), this._calculations > 15) return CERR = this, console.log("calculation error", this._asks), this;
        for (var e = {
                line: 1e3,
                flagged: 1,
                fitness: 1
            }, n = Linebreaker, o = (n.linebreak.infinity, this.chunks()), r = n.linebreak(o, [t], {
                tolerance: 2e3,
                demerits: e
            }), s = r.length - 1, a = {
                width: 0,
                breaks: [],
                widths: []
            }, u = 0, h = i(r), p = h.length; u < p && u != s; u++) {
            var l = o[h[u].position],
                c = l && l.value;
            c && a.breaks.push(c.index)
        }
        for (var d = 0, f = [], y = 0, g = i(this.items()), _ = g.length; y < _; y++) f[d] || (f[d] = 0), f[d] += g[y].width, a.breaks.indexOf(y) >= 0 && d++;
        a.widths = f;
        var m = Math.ceil(Math.max.apply(Math, f) + 20);
        return this._widths[s - 1] = m, a.width = m, this._stops.push(a), s < 10 && t > 160 && m > 160 && this.calculate(Math.min(m - 30, t - 30)), this
    }, r.prototype.linesForWidth = function(t) {
        this._calculated || this.calculate(1200);
        for (var e, n = null, o = 0, r = i(this.stops()), s = r.length; o < s; o++)
            if (e = r[o], t > e.width) {
                n = e;
                break
            }
        if (!n) return null;
        if (n.lines) return n.lines;
        var a = [],
            u = [a];
        return this.items().map(function(t, e) {
            if (a.push(t.value), n.breaks.indexOf(e) >= 0) return u.push(a = [])
        }), n.lines = u.map(function(t) {
            return t.join(" ")
        })
    }, window.MeasureText = s;
    var l = {};
    s.getInstances = function() {
        return l
    }, s.get = function(t) {
        var e = t.split(",").shift();
        return l[e] ? l[e] : l[e] = new this(e)
    }, s.prototype.loaded = function(t) {
        return this._loaded
    }, s.prototype.setLoaded = function(t) {
        return this._loaded = t, this
    }, s.prototype.check = function() {
        this._ctx.font = "20px " + this._font;
        var t = this._ctx.measureText("abcd efgh");
        return this._testSize != t.width && (this._testSize = t.width, this._cache = {}, this._groups = {}), this
    }, s.prototype.then = function(t) {
        return this._loaded ? t() : u.once(this, "ready", t)
    }, s.prototype.measure = function(t) {
        return this._cache[t] || (this._cache[t] = this._ctx.measureText(t).width)
    }, s.prototype.group = function(t) {
        return this._groups[t] || (this._groups[t] = new r(this, t))
    }, u.subclass(a, o), e.TextFlowLayout = a, a.register("textflow"), a.register("wordflow"), a.prototype.lc = function(t) {
        return this._lc
    }, a.prototype.setLc = function(t) {
        return this._lc = t, this
    }, a.prototype.measurer = function() {
        return this._measurer || (this._measurer = s.get(this.style().fontFamily))
    }, a.prototype.group = function() {
        return this.measurer().group(this.string())
    }, a.prototype.setup = function() {
        return a.__super__.setup.apply(this, arguments), this.string(), this
    }, a.prototype.string = function() {
        return this._string ? this._string : (this._string = this.body().textContent, "uppercase" == this.style().textTransform && (this._string = this._string.toUpperCase()), this._string)
    }, a.prototype.style = function() {
        return this._style || (this._style = window.getComputedStyle(this.node().dom()))
    }, a.prototype.calcStyle = function() {
        return this.style(), this._font = this._style.font, this._fontFamily = this._style.fontFamily, this._fontSize = parseFloat(this._style.fontSize), this._factor = this._fontSize / 20, this
    }, a.prototype.body = function() {
        return this._body || (this._body = this._node.dom())
    }, a.prototype.rewrap = function() {
        return this
    }, a.prototype.mark = function() {
        return this.reflow(), this
    }, a.prototype.shouldWrap = function() {
        return "center" == this.style().textAlign || this._options.force
    }, a.prototype.reflow = function(t) {
        void 0 === t && (t = !1);
        var e = this.node().dom().offsetWidth;
        if (!e || !this.shouldWrap()) return this;
        if (this.node().dom().innerHTML.indexOf("<a") >= 0) return this;
        this.calcStyle(), this.measurer().check();
        var n = this.group(),
            i = parseInt(this._style.marginLeft),
            o = e / this._factor,
            r = n.linesForWidth(o - 2 * i);
        return r && r.length != this._lc && (this._lc = r.length, this.body().innerHTML = r.map(function(t) {
            return '<div class="fln"><span>' + t + "</span></div>"
        }).join(" "), this.node().trigger("reflow", this._lc)), this
    }
}, function(t, e) {
    Linebreaker = {}, Linebreaker.LinkedList = function(t) {
        function e() {
            this.head = null, this.tail = null, this.listSize = 0
        }
        return e.Node = function(t) {
            this.prev = null, this.next = null, this.data = t
        }, e.Node.prototype.toString = function() {
            return this.data.toString()
        }, e.prototype.isLinked = function(t) {
            return !(t && null === t.prev && null === t.next && this.tail !== t && this.head !== t || this.isEmpty())
        }, e.prototype.size = function() {
            return this.listSize
        }, e.prototype.isEmpty = function() {
            return 0 === this.listSize
        }, e.prototype.first = function() {
            return this.head
        }, e.prototype.last = function() {
            return this.last
        }, e.prototype.toString = function() {
            return this.toArray().toString()
        }, e.prototype.toArray = function() {
            for (var t = this.head, e = []; null !== t;) e.push(t), t = t.next;
            return e
        }, e.prototype.forEach = function(t) {
            for (var e = this.head; null !== e;) t(e), e = e.next
        }, e.prototype.contains = function(t) {
            var e = this.head;
            if (!this.isLinked(t)) return !1;
            for (; null !== e;) {
                if (e === t) return !0;
                e = e.next
            }
            return !1
        }, e.prototype.at = function(t) {
            var e = this.head,
                n = 0;
            if (t >= this.listLength || t < 0) return null;
            for (; null !== e;) {
                if (t === n) return e;
                e = e.next, n += 1
            }
            return null
        }, e.prototype.insertAfter = function(t, e) {
            return this.isLinked(t) ? (e.prev = t, e.next = t.next, null === t.next ? this.tail = e : t.next.prev = e, t.next = e, this.listSize += 1, this) : this
        }, e.prototype.insertBefore = function(t, e) {
            return this.isLinked(t) ? (e.prev = t.prev, e.next = t, null === t.prev ? this.head = e : t.prev.next = e, t.prev = e, this.listSize += 1, this) : this
        }, e.prototype.push = function(t) {
            return null === this.head ? this.unshift(t) : this.insertAfter(this.tail, t), this
        }, e.prototype.unshift = function(t) {
            return null === this.head ? (this.head = t, this.tail = t, t.prev = null, t.next = null, this.listSize += 1) : this.insertBefore(this.head, t), this
        }, e.prototype.remove = function(t) {
            return this.isLinked(t) ? (null === t.prev ? this.head = t.next : t.prev.next = t.next, null === t.next ? this.tail = t.prev : t.next.prev = t.prev, this.listSize -= 1, this) : this
        }, e.prototype.pop = function() {
            var t = this.tail;
            return this.tail.prev.next = null, this.tail = this.tail.prev, this.listSize -= 1, t.prev = null, t.next = null, t
        }, e.prototype.shift = function() {
            var t = this.head;
            return this.head.next.prev = null, this.head = this.head.next, this.listSize -= 1, t.prev = null, t.next = null, t
        }, e
    }(), Linebreaker.linebreak = function() {
        /**
         * @preserve Knuth and Plass line breaking algorithm in JavaScript
         *
         * Licensed under the new BSD License.
         * Copyright 2009-2010, Bram Stein
         * All rights reserved.
         */
        var t = function(e, n, i) {
            function o(t, e, n, i, o, r, s) {
                return {
                    position: t,
                    demerits: e,
                    ratio: n,
                    line: i,
                    fitnessClass: o,
                    totals: r || {
                        width: 0,
                        stretch: 0,
                        shrink: 0
                    },
                    previous: s
                }
            }

            function r(n, i, o, r) {
                var s = p.width - o.totals.width,
                    a = 0,
                    u = 0,
                    h = r < l.length ? l[r - 1] : l[l.length - 1];
                return "penalty" === e[i].type && (s += e[i].width), s < h ? (a = p.stretch - o.totals.stretch, a > 0 ? (h - s) / a : t.infinity) : s > h ? (u = p.shrink - o.totals.shrink, u > 0 ? (h - s) / u : t.infinity) : 0
            }

            function s(n) {
                var i = {
                        width: p.width,
                        stretch: p.stretch,
                        shrink: p.shrink
                    },
                    o = 0;
                for (o = n; o < e.length; o += 1)
                    if ("glue" === e[o].type) i.width += e[o].width, i.stretch += e[o].stretch, i.shrink += e[o].shrink;
                    else if ("box" === e[o].type || "penalty" === e[o].type && e[o].penalty === -t.infinity && o > n) break;
                return i
            }

            function a(e, n, i) {
                for (var a, p, l, c, d, f = h.first(), y = null, g = 0, _ = 0, m = [], v = 0, b = 0; null !== f;) {
                    for (m = [{
                            demerits: 1 / 0
                        }, {
                            demerits: 1 / 0
                        }, {
                            demerits: 1 / 0
                        }, {
                            demerits: 1 / 0
                        }]; null !== f && (y = f.next, v = f.data.line + 1, g = r(f.data.position, n, f.data, v), (g < -1 || "penalty" === e.type && e.penalty === -t.infinity) && h.remove(f), -1 <= g && g <= u.tolerance && (a = 100 * Math.pow(Math.abs(g), 3), _ = "penalty" === e.type && e.penalty >= 0 ? Math.pow(u.demerits.line + a, 2) + Math.pow(e.penalty, 2) : "penalty" === e.type && e.penalty !== -t.infinity ? Math.pow(u.demerits.line + a, 2) - Math.pow(e.penalty, 2) : Math.pow(u.demerits.line + a, 2), "penalty" === e.type && "penalty" === i[f.data.position].type && (_ += u.demerits.flagged * e.flagged * i[f.data.position].flagged), b = g < -.5 ? 0 : g <= .5 ? 1 : g <= 1 ? 2 : 3, Math.abs(b - f.data.fitnessClass) > 1 && (_ += u.demerits.fitness), (_ += f.data.demerits) < m[b].demerits && (m[b] = {
                            active: f,
                            demerits: _,
                            ratio: g
                        })), !(null !== (f = y) && f.data.line >= v)););
                    for (p = s(n), l = 0; l < m.length; l += 1) c = m[l], c.demerits < 1 / 0 && (d = new Linebreaker.LinkedList.Node(o(n, c.demerits, c.ratio, c.active.data.line + 1, l, p, c.active)), null !== f ? h.insertBefore(f, d) : h.push(d))
                }
            }
            var u = {
                    demerits: {
                        line: i && i.demerits && i.demerits.line || 10,
                        flagged: i && i.demerits && i.demerits.flagged || 100,
                        fitness: i && i.demerits && i.demerits.fitness || 3e3
                    },
                    tolerance: i && i.tolerance || 2
                },
                h = new Linebreaker.LinkedList,
                p = {
                    width: 0,
                    stretch: 0,
                    shrink: 0
                },
                l = n,
                c = [],
                d = {
                    data: {
                        demerits: 1 / 0
                    }
                };
            if (h.push(new Linebreaker.LinkedList.Node(o(0, 0, 0, 0, 0, void 0, null))), e.forEach(function(e, n, i) {
                    "box" === e.type ? p.width += e.width : "glue" === e.type ? (n > 0 && "box" === i[n - 1].type && a(e, n, i), p.width += e.width, p.stretch += e.stretch, p.shrink += e.shrink) : "penalty" === e.type && e.penalty !== t.infinity && a(e, n, i)
                }), 0 !== h.size()) {
                for (h.forEach(function(t) {
                        t.data.demerits < d.data.demerits && (d = t)
                    }); null !== d;) c.push({
                    position: d.data.position,
                    ratio: d.data.ratio
                }), d = d.data.previous;
                return c.reverse()
            }
            return []
        };
        return t.infinity = 1e4, t
    }(), Linebreaker.glue = function(t, e, n, i) {
        return {
            type: "glue",
            width: t,
            stretch: e,
            shrink: n,
            value: i
        }
    }, Linebreaker.box = function(t, e) {
        return {
            type: "box",
            width: t,
            value: e
        }
    }, Linebreaker.penalty = function(t, e, n, i) {
        return {
            type: "penalty",
            width: t,
            penalty: e,
            flagged: n,
            value: i
        }
    }
}, function(t, e, n) {
    function i() {
        return r.apply(this, arguments)
    }
    var o = n(0),
        r = n(2).Layout;
    o.subclass(i, r), e.TextFitLayout = i, i.prototype.reflow = function() {
        var t = this.node().parent(),
            e = this.node().dom().offsetParent;
        if (t && e) {
            var n = t.dom().offsetWidth,
                i = t.dom().offsetHeight,
                o = n / i,
                r = this.node().dom().offsetWidth,
                s = this.node().dom().offsetHeight,
                a = r / s,
                u = window.getComputedStyle(this.node().dom()),
                h = parseFloat(u.fontSize || "0"),
                p = h;
            if (!(h < 1)) return p = a < o ? h * (i / s) : h * (n / r), this.node().css({
                fontSize: p.toFixed(2) + "px"
            }), this
        }
    }
}, function(t, e, n) {
    function i(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }
    var o = n(0),
        r = (o.createTagList, o.createTagMap),
        s = o.createTagLoopResult,
        a = o.createElement;
    o.defineTag("hue-form", "form", function(t) {
        t.prototype.fields = function(t) {
            return this._fields
        }, t.prototype.setFields = function(t) {
            return this._fields = t, this
        }, t.prototype.state = function(t) {
            return this._state
        }, t.prototype.setState = function(t) {
            return this._state = t, this
        }, t.prototype.body = function() {
            var t, e, n = (this.$$ || (this.$$ = {}), this);
            return (t = n._body = n._body || (t = a("div", n)).flag("body").setContent([a("div", t.$, "A", t).flag("fields"), e = (e = a("div", t.$, "D", t)).flag("buttons").setContent(n._submitter = n._submitter || a("button", e).flag("submitter").setType("submit"), 2)], 2)).end((t.$.A.setContent(function(t, e, o) {
                for (var r, s = 0, u = i(n.fields()), h = u.length; s < h; s++) r = u[s], "textarea" == r.type ? o.push((t[s] || a("textarea", t, s)).setName(r.name).setPlaceholder(r.placeholder).setRequired(r.required).end()) : o.push((e[s] || a("input", e, s)).setName(r.name).setPlaceholder(r.placeholder).setRequired(r.required).setAutocomplete(r.autocomplete).end());
                return o
            }(t.$.B || r(t.$, "B", t.$.A), t.$.C || r(t.$, "C", t.$.A), s()), 5), n._submitter.setContent("busy" == n.state() ? "Sender..." : "done" == n.state() ? "✓ Takk for din henvendelse!" : "Send inn", 3).end(), !0))
        }, t.prototype.render = function() {
            return this.$open(0).setFlag(-1, this.state()).setChildren(this.body(), 3).synced()
        }, t.prototype.data = function() {
            for (var t, e = {}, n = 0, o = i(this.querySelectorAll("input,textarea")), r = o.length; n < r; n++) t = o[n], e[t.name()] = t.value();
            return e
        }, t.prototype.reset = function() {
            for (var t = 0, e = i(this.querySelectorAll("input,textarea")), n = e.length; t < n; t++) e[t].setValue(null);
            return this
        }, t.prototype.ondidsubmit = function(t) {
            var e = this;
            return e.unflag("xhr"), setTimeout(function() {
                return e.setState("done"), e.render()
            }, 1e3), e
        }, t.prototype.url = function() {
            var t = this.getAttribute("data-id");
            return "/s/" + Hue.Data.siteId + "/contact/" + t + ".json"
        }, t.prototype.onsubmit = function(t) {
            var e = this;
            if (t.cancel().halt(), "busy" != e.state() && "done" != e.state()) {
                var n = Math.round(8 * Math.random()),
                    o = Math.round(8 * Math.random()),
                    r = n + o,
                    s = window.prompt("Spamfilter: Hvor mye er " + n + " + " + o);
                if (!s || parseInt(s) != r) return console.log("Svaret var feil"), window.alert("Feil svar. Prøv igjen"), e;
                e.flag("xhr"), e.setState("busy"), e.render();
                for (var a = 0, u = i(e.querySelectorAll("input,textarea")), h = u.length; a < h; a++) u[a].setDisabled(!0);
                var p = new XMLHttpRequest;
                p.onload = function() {
                    return e.log("xhr loaded", e), e.trigger("didsubmit", e)
                };
                var l = e.data();
                return p.open("POST", e.url(), !0), p.setRequestHeader("Content-Type", "application/json"), p.send(JSON.stringify(l)), e
            }
        }
    }), o.defineTag("hue-button", function(t) {
        t.prototype.label = function(t) {
            return this._label
        }, t.prototype.setLabel = function(t) {
            return this._label = t, this
        }, t.prototype.render = function() {
            var t = this.$;
            return this.$open(0).setChildren(t[0] || a("span", t, 0, this).flag("label"), 2).synced((t[0].setContent(this.label(), 3), !0))
        }
    })
}, function(t, e, n) {
    function i(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }
    var o = n(0),
        r = o.createElement;
    MapDarkStyle = n(38), MapBaseStyle = n(39), o.defineTag("hue-map", function(t) {
        t.prototype.address = function(t) {
            return this._address
        }, t.prototype.setAddress = function(t) {
            return this._address = t, this
        }, t.prototype.size = function(t) {
            return this._size
        }, t.prototype.setSize = function(t) {
            return this._size = t, this
        }, t.prototype.__zoom = {
            default: 14,
            name: "zoom"
        }, t.prototype.zoom = function(t) {
            return this._zoom
        }, t.prototype.setZoom = function(t) {
            return this._zoom = t, this
        }, t.prototype._zoom = 14, t.prototype.loc = function() {
            var t, e = this.address();
            if (this.latlng()) {
                var t = i(this.latlng().replace("@", "").replace(/\s/g, "").split(",")),
                    n = t[0],
                    o = t[1];
                t[2];
                return Hue.encodeURIComponent(n + "," + o).replace()
            }
            if (e) {
                var r = e.street + ", " + e.postcode + " " + e.postplace;
                return Hue.encodeURIComponent(r.replace(/[\ ]+/g, "+"))
            }
            return ""
        }, t.prototype.latlng = function() {
            return Hue.Data.site.latlng
        }, t.prototype.url = function() {
            return "/assets/maps/" + Hue.Data.siteId + "/" + this.loc() + "__hq_s" + this.zoom() + ".jpg"
        }, t.prototype.img = function() {
            this.$$ || (this.$$ = {});
            return (this._img = this._img || r("div", this).flag("img")).css("background-image", "url('" + this.url() + "')").end()
        }, t.prototype.marker = function() {
            this.$$ || (this.$$ = {});
            return this._marker = this._marker || r("div", this).flag("marker")
        }, t.prototype.setup = function() {
            return this.render()
        }, t.prototype.render = function() {
            return this.$open(0).setChildren([this.loc() ? this.img() : void 0, this.marker()], 1).synced()
        }, t.prototype.ontap = function() {
            var t = "https://maps.google.no/?q=" + this.loc();
            return window.open(t)
        }, t.prototype.mapStyle = function() {
            return this.closest(".tint-dark") ? MapDarkStyle : MapBaseStyle
        }, t.prototype.construct = function() {
            var t = this;
            return t.dom().offsetParent, t
        }
    })
}, function(t, e) {
    t.exports = [{
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [{
            saturation: 36
        }, {
            color: "#000000"
        }, {
            lightness: 40
        }]
    }, {
        featureType: "all",
        elementType: "labels.text.stroke",
        stylers: [{
            visibility: "on"
        }, {
            color: "#000000"
        }, {
            lightness: 16
        }]
    }, {
        featureType: "all",
        elementType: "labels.icon",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [{
            lightness: "69"
        }]
    }, {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{
            color: "#000000"
        }, {
            lightness: 17
        }, {
            weight: 1.2
        }]
    }, {
        featureType: "administrative.country",
        elementType: "geometry",
        stylers: [{
            lightness: "35"
        }]
    }, {
        featureType: "administrative.country",
        elementType: "geometry.fill",
        stylers: [{
            lightness: "1"
        }]
    }, {
        featureType: "administrative.province",
        elementType: "geometry.fill",
        stylers: [{
            weight: "3.94"
        }, {
            lightness: "45"
        }]
    }, {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [{
            color: "#000000"
        }, {
            lightness: 20
        }]
    }, {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{
            color: "#000000"
        }, {
            lightness: 21
        }]
    }, {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [{
            color: "#000000"
        }, {
            lightness: 17
        }]
    }, {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{
            color: "#000000"
        }, {
            lightness: 29
        }, {
            weight: .2
        }]
    }, {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{
            color: "#000000"
        }, {
            lightness: 18
        }]
    }, {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [{
            color: "#000000"
        }, {
            lightness: 16
        }]
    }, {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{
            color: "#000000"
        }, {
            lightness: 19
        }]
    }, {
        featureType: "water",
        elementType: "geometry",
        stylers: [{
            color: "#000000"
        }, {
            lightness: 17
        }]
    }]
}, function(t, e) {
    t.exports = [{
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [{
            color: "#777777"
        }]
    }, {
        featureType: "landscape",
        elementType: "all",
        stylers: [{
            color: "#edecec"
        }]
    }, {
        featureType: "landscape.natural",
        elementType: "geometry.fill",
        stylers: [{
            color: "#f2f2f2"
        }]
    }, {
        featureType: "landscape.natural.terrain",
        elementType: "geometry.fill",
        stylers: [{
            color: "#dee3d8"
        }, {
            visibility: "on"
        }, {
            weight: "1"
        }]
    }, {
        featureType: "poi",
        elementType: "all",
        stylers: [{
            visibility: "on"
        }]
    }, {
        featureType: "poi",
        elementType: "geometry.fill",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{
            color: "#777777"
        }]
    }, {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [{
            visibility: "on"
        }, {
            color: "#e1e6da"
        }]
    }, {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{
            color: "#91af7b"
        }]
    }, {
        featureType: "road",
        elementType: "all",
        stylers: [{
            saturation: -100
        }, {
            lightness: 45
        }]
    }, {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{
            color: "#a7a7a7"
        }]
    }, {
        featureType: "road.highway",
        elementType: "all",
        stylers: [{
            visibility: "simplified"
        }]
    }, {
        featureType: "road.highway",
        elementType: "labels.icon",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "road.local",
        elementType: "labels.icon",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "transit",
        elementType: "all",
        stylers: [{
            visibility: "on"
        }]
    }, {
        featureType: "transit",
        elementType: "labels.text.fill",
        stylers: [{
            color: "#779ec0"
        }]
    }, {
        featureType: "water",
        elementType: "all",
        stylers: [{
            visibility: "on"
        }]
    }, {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [{
            color: "#3498db"
        }]
    }]
}, function(t, e, n) {
    function i(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }
    var o = n(0),
        r = o.createTagList,
        s = o.createElement;
    o.defineTag("hue-hours", function(t) {
        t.prototype.state = function(t) {
            return this._state
        }, t.prototype.setState = function(t) {
            return this._state = t, this
        }, t.prototype.today = function(t) {
            return this._today
        }, t.prototype.setToday = function(t) {
            return this._today = t, this
        }, t.prototype.opens = function(t) {
            return this._opens
        }, t.prototype.setOpens = function(t) {
            return this._opens = t, this
        }, t.prototype.closes = function(t) {
            return this._closes
        }, t.prototype.setCloses = function(t) {
            return this._closes = t, this
        }, t.prototype.day = function(t) {
            var e = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"][t],
                n = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"][t],
                i = {
                    ref: e,
                    name: n,
                    open: this.object()[e + "_1_open"],
                    close: this.object()[e + "_1_close"]
                };
            return i.close && (i.h1 = parseInt(i.close.substr(0, 2)), i.m1 = parseInt(i.close.substr(3))), i.open ? (i.str = i.open + " - " + i.close, i.h0 = parseInt(i.open.substr(0, 2)), i.m0 = parseInt(i.open.substr(3))) : i.str = "Stengt", i
        }, t.prototype.days = function() {
            if (this._days) return this._days;
            this._days = [];
            for (var t = 0, e = [0, 1, 2, 3, 4, 5, 6], n = e.length; t < n; t++) this._days.push(this.day(e[t]));
            return this._days
        }, t.prototype.more = function() {
            var t, e = (this.$$ || (this.$$ = {}), this);
            return (t = e._more = e._more || (t = s("div", e)).flag("more").setContent(t.$.A || s("div", t.$, "A", t).flag("body").setContent(t.$.B || s("ul", t.$, "B", "A"), 2), 2)).end((t.$.B.setContent(function(t) {
                for (var n, o, r = 0, a = i(e.days()), u = t.taglen = a.length; r < u; r++) o = a[r], (n = t[r] || (n = s("li", t, r)).setContent([s("span", n.$, "A", n).flag("day"), s("span", n.$, "B", n).flag("time")], 2)).end((n.$.A.setContent(o.name, 3), n.$.B.setContent(o.str, 3), !0));
                return t
            }(t.$.C || r(t.$, "C", t.$.B)), 4), !0))
        }, t.prototype.render = function() {
            var t = this.$;
            if (!this.object()) return this;
            var e = new Date,
                n = e.getDay() - 1,
                i = e.getHours(),
                o = e.getMinutes();
            n < 0 && (n = 6);
            var r = this.days(),
                a = r[n];
            if (a.open) {
                var u = a.h0,
                    h = a.h1;
                h < u && (h += 24, i < u && (i += 24)), (i > u || i == u && o >= a.m0) && (i < h || i == h && o < a.m1) ? this.setState("open") : this.setState("closed")
            } else this.setState("closed");
            return this.$open(0).setFlag(-1, this.state()).setChildren([t[0] || s("i", t, 0, this), t[1] || s("b", t, 1, this).flag("today"), this.more()], 1).synced((t[1].setContent(a.str, 3), !0))
        }
    })
}, function(t, e, n) {
    function i(t, e) {
        return "email" == e ? "mailto:" + t : (t && "http" != t.substr(0, 4) && (t = "http://" + t), t)
    }
    var o = n(0),
        r = o.createTagMap,
        s = o.createElement,
        a = o.defineTag("Buttons", function(t) {
            var e = ["linkedin", "facebook", "googleplus", "twitter", "instagram"];
            t.prototype.render = function() {
                var t = this.$;
                if (!this.data()) return this;
                var n = this.data().socialmedia || {};
                return this.$open(0).setChildren(function(t) {
                    for (var o, r, a = t.$iter(), u = 0, h = e.length; u < h; u++) r = e[u], a.push((o = t[r] || (o = s("a", t, r)).flag("social").setTarget("_blank").setContent([s("i", o.$, "A", o), s("b", o.$, "B", o)], 2)).setFlag(0, r).flagIf("off", !n[r]).setHref(i(n[r], r)).end((o.$.A.setFlag(0, r), o.$.B.setContent(r, 3), !0)));
                    return a
                }(t[0] || r(t, 0)), 5).synced()
            }
        });
    o.defineTag("hue-people", "hue-posts", function(t) {
        t.prototype.type = function() {
            return "people"
        }, t.prototype.itemType = function() {
            return "person"
        }, t.prototype.itemType = function() {
            return "person"
        }, t.prototype.layoutType = function() {
            return "tiles"
        }, t.prototype.body = function() {
            this.$$ || (this.$$ = {});
            return (this._body = this._body || s("div", this).flag("body").flag("people").flag("wide")).dataset("layout", this.layoutType()).end()
        }, t.prototype.item = function(t, e) {
            return Hue.nodeForPost(this, t, this.itemType(), e).setData(t).end()
        }
    }), o.defineTag("hue-person", "hue-post", function(t) {
        t.prototype.__expansion = {
            watch: "expansionDidSet",
            chainable: !0,
            default: 0,
            name: "expansion"
        }, t.prototype.expansion = function(t) {
            return void 0 !== t ? (this.setExpansion(t), this) : this._expansion
        }, t.prototype.setExpansion = function(t) {
            var e = this.expansion();
            return t != e && (this._expansion = t), t != e && this.expansionDidSet && this.expansionDidSet(t, e, this.__expansion), this
        }, t.prototype._expansion = 0, t.prototype.expand = function() {
            return this
        }, t.prototype.collapse = function() {
            return this
        }, t.prototype.render = function() {
            var t = this.$;
            return this.$open(0).setChildren([this.data().imageId ? (this._image = this._image || s("hue-avatar", this).flag("image")).setDid(this.data().imageId).end() : void 0, (this._name = this._name || s("hue-h2", this).flag("name").setKey("name")).setContent(this.data().name, 3).end(), (this._title = this._title || s("hue-h3", this).flag("title").setKey("title")).setContent(this.data().title, 3).end(), (t[0] || s("div", t, 0, this).flag("details")).setContent([this.data().phone ? (t[1] || s("hue-phone", t, 1, 0).flag("mobile").flag("f").setTitle("tlf")).bindData(this.data(), "phone").end() : void 0, this.data().email ? (t[2] || s("hue-email", t, 2, 0).flag("email").flag("f").setTitle("epost")).bindData(this.data(), "email").end() : void 0], 1), (t[3] || s(a, t, 3, this).flag("small")).bindData(this, "data", []).end(), this.hud()], 1).synced()
        }, t.prototype.animation = function() {
            return this._anim || (this._anim = !0)
        }, t.prototype.expansionDidSet = function(t) {
            return this
        }
    })
}, function(t, e, n) {
    var i = n(0),
        o = i.createElement;
    i.defineTag("hue-cookies-info", "hue-paper", function(t) {
        t.prototype.render = function() {
            var t = this.$;
            return this.$open(0).setChildren(t[0] || o("div", t, 0, this).flag("popover").setContent([o("div", t, 1, 0).flag("article").setContent([o("h2", t, 2, 1).setText("Informasjonskapsler"), o("p", t, 3, 1).setText('Vi benytter oss av noe som heter "informasjonskapsler" ("cookies" på engelsk).'), o("p", t, 4, 1).setText("Indirekte benytter vi informasjonskapsler gjennom vår bruk av Google Analytics . Det er et verktøy som registrerer hvilke sider du besøker på vårt nettsted, og den samlede statistikken fra våre brukere kan brukes av oss for å endre og tilpasse produktet vårt."), o("h3", t, 5, 1).setText("Hvordan skrur man av informasjonskapsler?"), o("p", t, 6, 1).setText("Det er nettleseren din som gir oss tillatelse til å benytte oss av informasjonskapsler, og det er derfor den som må stilles inn for å skru av denne oppførselen dersom du ønsker det. Hvordan nettleseren stilles inn avhenger av hvilken nettleser du benytter. Vi har samlet informasjon om de vanligste her:"), o("ul", t, 7, 1).setContent([o("li", t, 8, 7).setContent(t[9] || o("a", t, 9, 8).setHref("https://support.google.com/chrome/answer/95647?hl=no").setText("Chrome"), 2), o("li", t, 10, 7).setContent(t[11] || o("a", t, 11, 10).setHref("https://support.mozilla.org/nb-NO/kb/enable-and-disable-cookies-website-preferences").setText("Firefox"), 2), o("li", t, 12, 7).setContent(t[13] || o("a", t, 13, 12).setHref("http://support.microsoft.com/gp/cOOKies_ie/no").setText("Microsoft Internet Explorer"), 2), o("li", t, 14, 7).setContent(t[15] || o("a", t, 15, 14).setHref("http://www.opera.com/help/tutorials/security/privacy/").setText("Opera"), 2), o("li", t, 16, 7).setContent(t[17] || o("a", t, 17, 16).setHref("https://support.apple.com/kb/PH11913").setText("Safari"), 2)], 2)], 2), o("button", t, 18, 0).flag("close").dataset("action", "hide").setText("Lukk")], 2), 2).synced((t[9].end(), t[11].end(), t[13].end(), t[15].end(), t[17].end(), t[18].end(), !0))
        }
    }), i.defineTag("hue-cookies", function(t) {
        t.prototype.__state = {
            watch: "stateDidSet",
            name: "state"
        }, t.prototype.state = function(t) {
            return this._state
        }, t.prototype.setState = function(t) {
            var e = this.state();
            return t != e && (this._state = t), t != e && this.stateDidSet && this.stateDidSet(t, e, this.__state), this
        }, t.prototype.key = function() {
            return Hue.get("siteId") + "useCookies4"
        }, t.prototype.setup = function() {
            try {
                return this.setState(window.localStorage.getItem(this.key()) || "unseen"), this
            } catch (t) {}
        }, t.prototype.accept = function() {
            var t;
            try {
                return window.localStorage.setItem(this.key(), (this.setState(t = "accepted"), t))
            } catch (t) {}
        }, t.prototype.explain = function() {
            return i.mount(o("hue-cookies-info").end())
        }, t.prototype.stateDidSet = function(t) {
            return this.setFlag("state", t)
        }, t.prototype.render = function() {
            var t = this.$;
            return this.$open(0).setChildren(t.$ = t.$ || [o("div", t, 0, this).flag("info").setContent([o("div", t, 1, 0).setText("Vi bruker cookies for at nettstedet skal fungere bra."), o("div", t, 2, 0).setText("Når du bruker tjenestene våre, godtar du dette.")], 2), o("div", t, 3, this).flag("buttons").setContent([o("a", t, 4, 3).flag("explain").on$(0, ["tap", "explain"], this).setText("Vis mer"), o("a", t, 5, 3).flag("accept").on$(0, ["tap", "accept"], this).setText("Jeg forstår")], 2)], 2).synced()
        }
    })
}, function(t, e, n) {
    function i(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }
    var o = n(0),
        r = o.createTagList,
        s = o.createElement;
    o.defineTag("hue-header", "hue-block", function(t) {
        t.prototype.title = function() {
            return Hue.Data.site.title || "Velkommen"
        }, t.prototype.logo = function() {
            var t, e = (this.$$ || (this.$$ = {}), Hue.get("site.logoId", this.get("logoId")));
            return (t = this._logo = this._logo || (t = s("div", this)).flag("logo")).setContent([this.o("showLogo", !0) && e ? (t.$.A || s("hue-logo", t.$, "A", t)).setDid(e).end() : void 0, (t.$.B || s("text", t.$, "B", t).flag("title").setType("fit")).setText(this.title()).end()], 1)
        }, t.prototype.menu = function() {
            var t, e = (this.$$ || (this.$$ = {}), this);
            return (t = e._menu = e._menu || (t = s("div", e)).flag("menu")).setContent([(t.$.A || s("div", t.$, "A", t).flag("items")).setContent(function(t) {
                for (var n, o = 0, r = i(e.links()), a = t.taglen = r.length; o < a; o++) n = r[o], (t[o] || s("a", t, o).flag("menuitem")).setHref(n.url).setContent(n.title, 3).end();
                return t
            }(t.$.B || r(t.$, "B", t.$.A)), 4), e.o("showSocial", !0) ? (t.$.C || s("socialmedia", t.$, "C", t)).setData(Hue.get("site.socialmedia|org.socialmedia")).end() : void 0], 1)
        }, t.prototype.body = function() {
            this.$$ || (this.$$ = {});
            return (this._body = this._body || s("div", this).flag("body").flag("wide")).setContent([this.logo(), this.menu()], 1)
        }, t.prototype.toggler = function() {
            this.$$ || (this.$$ = {});
            return this._toggler = this._toggler || s("div", this).flag("toggler").on$(0, ["tap", "showMenu"], this)
        }, t.prototype.showMenu = function() {
            return this.trigger("menu:show")
        }, t.prototype.render = function() {
            return this.$open(0).setChildren([this.anchor(), this.body(), this.hud()], 1).synced(), this.didRender()
        }, t.prototype.links = function() {
            return Hue.getMenu()
        }, t.prototype.toggle = function() {
            return this.toggleFlag("expanded")
        }, t.prototype.candrop = function(t) {
            return !1
        }
    })
}, function(t, e, n) {
    function i(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }
    var o = n(0),
        r = o.createTagList,
        s = o.createElement;
    o.defineTag("hue-footer", "hue-block", function(t) {
        t.prototype.title = function() {
            return Hue.get("site.title", "Velkommen")
        }, t.prototype.copyright = function() {
            var t;
            this.$$ || (this.$$ = {});
            return (t = this._copyright = this._copyright || (t = s("div", this)).flag("copyright").setContent(t.$.A || s("text", t.$, "A", t).flag("title").setType("fit"), 2)).end((t.$.A.setText(this.title()).end(), !0))
        }, t.prototype.menu = function() {
            var t, e = (this.$$ || (this.$$ = {}), this);
            return (t = e._menu = e._menu || (t = s("div", e)).flag("menu").setContent(t.$.A || s("div", t.$, "A", t).flag("items"), 2)).end((t.$.A.setContent(function(t) {
                for (var n, o = 0, r = i(e.object().links), a = t.taglen = r.length; o < a; o++) n = r[o], (t[o] || s("a", t, o).flag("menuitem")).setHref(n.url).setContent(n.title, 3).end();
                return t
            }(t.$.B || r(t.$, "B", t.$.A)), 4), !0))
        }, t.prototype.body = function() {
            this.$$ || (this.$$ = {});
            return (this._body = this._body || s("hue-vcard", this).flag("body").flag("bar").flag("wide").flag("vcard")).setShowSocial(this.o("showSocial", !0)).setShowAddress(this.o("showAddress", !0)).end()
        }, t.prototype.render = function() {
            return this.$open(0).flag("pad").setChildren([this.anchor(), this.body(), this.hud()], 1).synced()
        }
    })
}, function(t, e, n) {
    var i = n(0),
        o = i.createElement;
    i.defineTag("hue-tiles", "hue-posts", function(t) {
        t.prototype.type = function() {
            return "tiles"
        }, t.prototype.body = function() {
            this.$$ || (this.$$ = {});
            return (this._body = this._body || o("div", this).flag("body").flag("tiles").dataset("layout", "tiles")).end()
        }, t.prototype.item = function(t, e, n) {
            var i, r = this.$$ || (this.$$ = {});
            return (r[i = "index$" + e] || o("hue-tile", r, i, this)).setData(t).setFlag(0, t.type).setFlag(1, n.flags).end()
        }
    }), i.defineTag("hue-tile", "hue-post", function(t) {
        t.prototype.__expansion = {
            watch: "expansionDidSet",
            chainable: !0,
            default: 0,
            name: "expansion"
        }, t.prototype.expansion = function(t) {
            return void 0 !== t ? (this.setExpansion(t), this) : this._expansion
        }, t.prototype.setExpansion = function(t) {
            var e = this.expansion();
            return t != e && (this._expansion = t), t != e && this.expansionDidSet && this.expansionDidSet(t, e, this.__expansion), this
        }, t.prototype._expansion = 0, t.prototype.expand = function() {
            return this.expandable() && TweenMax.to(this, .35, {
                expansion: 1
            }), this
        }, t.prototype.collapse = function() {
            return this.expandable() && TweenMax.to(this, .35, {
                expansion: 0
            }), this
        }, t.prototype.expandable = function() {
            return !this._sticky && this.object().tagline && !this.hasFlag("xs")
        }, t.prototype.ontouchstart = function(t) {
            if (!(t.event() instanceof MouseEvent)) return this.trigger("tiletap")
        }, t.prototype.ontap = function() {
            return this.showMore()
        }, t.prototype.render = function() {
            var t = this.$;
            return this.$open(0).flag("tile").flagIf("linked", this.object().link && !0).on$(-1, ["tap", "follow"], this).setChildren([this._image = this._image || o("hue-image", this).flag("image").setSize(3).setKey("imageId"), this._title = this._title || o("hue-h2", this).flag("title").setKey("title"), this._body = this._body || o("div", this).flag("body").setContent(t[0] || o("hue-p", t, 0, this._body).setKey("tagline"), 2), this.hud()], 1).synced((this._image.setDid(this.object().imageId).end(), this._title.setContent(this.object().title, 3).end(), t[0].setContent(this.object().tagline, 3).end(), !0))
        }, t.prototype.animation = function() {
            return this._anim || (this._anim = !0)
        }, t.prototype.expansionDidSet = function(t) {
            return TweenMax.set(this._body.dom(), {
                yPercent: 100 * (1 - t),
                y: 0
            }), TweenMax.set(this._title.dom(), {
                yPercent: -70 * t
            }), TweenMax.set(this._image._img.dom(), {
                scale: 1 + .15 * t
            }), this
        }
    }), i.defineTag("hue-tile-social", "hue-tile", function(t) {
        t.prototype.media = function(t) {
            return this.getAttribute("media")
        }, t.prototype.setMedia = function(t) {
            return this.setAttribute("media", t), this
        }, t.prototype.href = function() {
            return "http://facebook.com"
        }, t.prototype.render = function() {
            var t = this.$;
            return this.$open(0).flag("tile").setFlag(-1, this.media()).setChildren(t.$ = t.$ || [this._title = this._title || o("h2", this).flag("title").setText("Besøk oss på facebook"), this._body = this._body || o("div", this).flag("body").setContent(t[0] || o("a", t, 0, this._body).flag("button").setText("Send inn"), 2)], 2).synced((t[0].setHref(this.href()).end(), !0))
        }
    })
}, function(t, e, n) {
    var i = n(0),
        o = i.createElement;
    i.defineTag("hue-bullets", "hue-posts", function(t) {
        t.prototype.type = function() {
            return "bullets"
        }, t.prototype.itemType = function() {
            return "bullet"
        }, t.prototype.layoutType = function() {
            return "tiles"
        }, t.prototype.body = function() {
            this.$$ || (this.$$ = {});
            return (this._body = this._body || o("div", this).flag("body").flag("bullets").flag("wide")).dataset("layout", this.layoutType()).end()
        }, t.prototype.item = function(t, e) {
            return Hue.nodeForPost(this, t, this.itemType(), e).setData(t).end()
        }
    }), i.defineTag("hue-bullet", "hue-post", function(t) {
        t.prototype.icon = function() {
            this.$$ || (this.$$ = {});
            if (this.owner().o("showIcons", !0)) return (this._icon = this._icon || o("hue-icon", this).flag("icon").setKey("iconId").on$(0, ["tap", "follow"], this)).setDid(this.data().iconId).setColor(this.owner().o("iconColor", Hue.get("site.color", "#75B9C7"))).end()
        }, t.prototype.render = function() {
            return this.$open(0).flag("item").flagIf("linked", this.data().link && !0).setChildren([this.icon(), this.body(), this.hud()], 1).synced()
        }, t.prototype.body = function() {
            var t;
            this.$$ || (this.$$ = {});
            return (t = this._body = this._body || (t = o("div", this)).flag("body")).setContent([(t.$.A || o("hue-h2", t.$, "A", t).setKey("title").on$(0, ["tap", "follow"], this)).setContent(this.data().title, 3).end(), (t.$.B || o("hue-p", t.$, "B", t).setKey("tagline").dataset("layout", "textflow")).setContent(this.data().tagline, 3).end(), this.data().content ? (t.$.C || o("a", t.$, "C", t).flag("read-more").setHref("#").on$(0, ["tap", "prevent", "stop", "showMore"], this).setText("Les mer ...")).end() : void 0], 1)
        }
    }), i.defineTag("hue-bullet-person", "hue-bullet", function(t) {
        t.prototype.body = function() {
            var t;
            this.$$ || (this.$$ = {});
            return (t = this._body = this._body || (t = o("div", this)).flag("body").setContent([o("hue-h2", t.$, "A", t).setKey("name"), o("hue-h3", t.$, "B", t).setKey("title")], 2)).end((t.$.A.setContent(this.data().name, 3).end(), t.$.B.setContent(this.data().title, 3).end(), !0))
        }
    })
}, function(t, e, n) {
    var i = n(0),
        o = i.createElement;
    i.defineTag("hue-boxes", "hue-posts", function(t) {
        t.prototype.type = function() {
            return "boxes"
        }, t.prototype.itemType = function() {
            return "box"
        }, t.prototype.layoutType = function() {
            return "tiles"
        }, t.prototype.item = function(t, e) {
            return Hue.nodeForPost(this, t, this.itemType(), e).setData(t).end()
        }, t.prototype.body = function() {
            this.$$ || (this.$$ = {});
            return (this._body = this._body || o("div", this).flag("body").flag("boxes").flag("wide").setKey("posts")).dataset("layout", this.layoutType()).end()
        }
    }), i.defineTag("hue-box", "hue-post", function(t) {
        t.prototype.animation = function() {
            var t;
            return this._animation || (this._animation = (t = new TimelineLite, t.add([this._image.zoom(1, 1.18)]), t.pause(), t))
        }, t.prototype.body = function() {
            var t;
            this.$$ || (this.$$ = {});
            return (t = this._body = this._body || (t = o("div", this)).flag("body")).setContent([(t.$.A || o("hue-h2", t.$, "A", t).setKey("title").on$(0, ["tap", "follow"], this)).setContent(this.data().title, 3).end(), (t.$.B || o("hue-p", t.$, "B", t).setKey("tagline")).setContent(this.data().tagline, 3).end(), this.data().content ? (t.$.C || o("p", t.$, "C", t).setContent(t.$.D || o("a", t.$, "D", "C").flag("read-more").setHref("#").on$(0, ["tap", "prevent", "stop", "showMore"], this).setText("Les mer ..."), 2)).end((t.$.D.end(), !0)) : void 0], 1)
        }, t.prototype.render = function() {
            this.$;
            return this.$open(0).flag("item").flagIf("linked", this.data().link && !0).setChildren([this._image = this._image || o("hue-image", this).flag("image").setSize(3).setKey("imageId").on$(0, ["tap", "follow"], this), this.body(), this.hud()], 1).synced((this._image.setDid(this.data().imageId).end(), !0))
        }, t.prototype.hoverin = function() {
            return TweenLite.to(this.animation(), .3, {
                progress: 1
            })
        }, t.prototype.hoverout = function() {
            return TweenLite.to(this.animation(), .3, {
                progress: 0
            })
        }
    })
}, function(t, e, n) {
    var i = n(0),
        o = i.createElement;
    n(49), i.defineTag("hue-pills", "hue-posts", function(t) {
        t.prototype.type = function() {
            return "pills"
        }, t.prototype.itemType = function() {
            return "pill"
        }, t.prototype.layoutType = function() {
            return "pills"
        }, t.prototype.body = function() {
            this.$$ || (this.$$ = {});
            return (this._body = this._body || o("div", this).flag("body").flag("bullets").flag("wide")).dataset("layout", this.layoutType()).end()
        }, t.prototype.item = function(t, e) {
            return Hue.nodeForPost(this, t, this.itemType(), e).setData(t).end()
        }
    }), i.defineTag("hue-pill", "hue-post", function(t) {
        t.prototype.render = function() {
            return this.$open(0).setChildren([this.body(), this.card(), this.hud()], 1).synced()
        }, t.prototype.logo = function() {
            this.$$ || (this.$$ = {});
            return (this._logo = this._logo || o("hue-brand-logo", this).flag("logo")).setDid(this.data().logoId).end()
        }, t.prototype.body = function() {
            var t;
            this.$$ || (this.$$ = {});
            return (t = this._body = this._body || (t = o("div", this)).flag("body")).setContent([t.$.A || o("a", t.$, "A", t).flag("link").setTarget("_blank"), this.logo(), t.$.B || o("div", t.$, "B", t).flag("title"), this.card()], 1).end((t.$.A.setHref(this.data().link).end(), t.$.B.setContent(this.data().title, 3), !0))
        }, t.prototype.card = function() {
            var t;
            this.$$ || (this.$$ = {});
            return (t = this._card = this._card || (t = o("div", this)).flag("card").setContent([o("div", t.$, "A", t).flag("title"), o("hue-p", t.$, "B", t)], 2)).end((t.$.A.setContent(this.data().title, 3), t.$.B.setContent(this.data().tagline, 3).end(), !0))
        }, t.prototype.expand = function() {
            return this.card().flag("show"), this
        }, t.prototype.collapse = function() {
            return this.card().unflag("show"), this
        }
    })
}, function(t, e, n) {
    function i(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }

    function o(t) {
        return t && (t.len instanceof Function ? t.len() : t.length) || 0
    }

    function r() {
        return a.apply(this, arguments)
    }
    var s = n(0),
        a = n(2).Layout;
    s.subclass(r, a), e.PillsLayout = r, r.register("pills");
    var u = ["xs", "s", "m", "l", "xl"];
    r.prototype.__cols = {
        watch: "colsDidSet",
        name: "cols"
    }, r.prototype.cols = function(t) {
        return this._cols
    }, r.prototype.setCols = function(t) {
        var e = this.cols();
        return t != e && (this._cols = t), t != e && this.colsDidSet && this.colsDidSet(t, e, this.__cols), this
    }, r.prototype.__minWidth = {
        default: 240,
        name: "minWidth"
    }, r.prototype.minWidth = function(t) {
        return this._minWidth
    }, r.prototype.setMinWidth = function(t) {
        return this._minWidth = t, this
    }, r.prototype._minWidth = 240, r.prototype.__scale = {
        default: 0,
        name: "scale"
    }, r.prototype.scale = function(t) {
        return this._scale
    }, r.prototype.setScale = function(t) {
        return this._scale = t, this
    }, r.prototype._scale = 0, r.prototype.colsDidSet = function(t, e) {
        if (e && this.node().unflag("cw" + e), t) return this.node().flag("cw" + t)
    }, r.prototype.setup = function() {
        return r.__super__.setup.apply(this, arguments), this
    }, r.prototype.mark = function() {
        return this.reflow()
    }, r.prototype.reflow = function() {
        this.node().flag("reflowed");
        for (var t = this.minWidth(), e = this.node().dom().offsetWidth / (this._scale || Hue.Scale), n = this.node().children(), r = o(n), s = r, a = 0; s > 1 && (a = r % s, !(e / s > t && (0 == a || a > .5 * s)));) s--;
        for (var h, p = 0, l = i(n), c = l.length; p < c; p++) {
            h = l[p];
            var d = p < a ? a : s,
                f = e / d,
                y = 0;
            y = f < 300 ? 0 : f < 450 ? 1 : f < 550 ? 2 : f < 800 ? 3 : 4, h.setFlag("cols", "c" + d), h.setFlag("size", u[y])
        }
        return this
    }
}, function(t, e, n) {
    n(0).defineTag("hue-socialmedia", "hue-block", function(t) {
        t.prototype.render = function() {
            return this.$open(0).setText("Socialmedia block her!").synced()
        }
    })
}, function(t, e, n) {
    function i(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }
    var o = n(0),
        r = (o.createTagList, o.createTagMap),
        s = o.createElement;
    o.defineTag("hue-facebook-post", function(t) {
        t.prototype.page = function(t) {
            return this._page
        }, t.prototype.setPage = function(t) {
            return this._page = t, this
        }, t.prototype.__cap = {
            default: 300,
            name: "cap"
        }, t.prototype.cap = function(t) {
            return this._cap
        }, t.prototype.setCap = function(t) {
            return this._cap = t, this
        }, t.prototype._cap = 300, t.prototype.time = function() {
            return this._time || (this._time = this.object().created_time.replace(/^20(\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d)(.*)$/, function(t, e, n, i, o, r) {
                return i + "." + n + "." + e + " " + o + ":" + r
            }))
        }, t.prototype.href = function() {
            return "https://facebook.com/" + (this.page() && this.page().id)
        }, t.prototype.intro = function() {
            if (this._intro) return this._intro;
            var t = this._intro = this.object().message || "";
            if (t.length > this.cap()) {
                for (var e, n = this.cap();
                    (e = t[n]) && (n++, "!" != e && "?" != e && "." != e););
                this._intro = t.substr(0, n)
            }
            return this._intro
        }, t.prototype.ontap = function(t) {
            return t.halt()
        }, t.prototype.setup = function() {
            return this.intro().length < 150 && this.flag("short"), t.__super__.setup.apply(this, arguments)
        }, t.prototype.render = function() {
            var t = this.$;
            return this.$open(0).setChildren(this._body = this._body || s("div", this).flag("body").flag("blk").setContent([s("div", t, 0, this._body).flag("time"), s("div", t, 1, this._body).flag("story").setContent([s("div", t, 2, 1).flag("quote"), s("a", t, 3, 1).flag("more").setTarget("_blank").setText("Les på Facebook")], 2)], 2), 2).synced((t[0].setContent(this.time(), 3), t[2].setContent(this.intro(), 3), t[3].setHref(this.href()).end(), !0))
        }, t.prototype.drawAtOffset = function(t) {
            var e = 1 - .2 * Math.abs(t),
                n = 1 - Math.min(.7 * Math.abs(t), .7);
            return TweenMax.set(this._body.dom(), {
                scale: e,
                force3D: !0,
                opacity: n
            }), this
        }
    }), o.defineTag("hue-facebook-photo", "hue-facebook-post", function(t) {
        t.prototype.setup = function() {
            return this.render()
        }, t.prototype.img = function() {
            this.$$ || (this.$$ = {});
            return this._img = this._img || s("div", this).flag("img")
        }, t.prototype.render = function() {
            return this.$open(0).setChildren(this.img(), 3).synced()
        }, t.prototype.setup = function() {
            return t.__super__.setup.apply(this, arguments), this.img().css("background-image", "url(" + this.data().picture + ")")
        }, t.prototype.ontap = function(t) {
            return window.open(this.data().full_picture, "_blank")
        }
    }), o.defineTag("hue-facebook", "hue-block", function(t) {
        t.prototype.feed = function(t) {
            return this._feed
        }, t.prototype.setFeed = function(t) {
            return this._feed = t, this
        }, t.prototype.photos = function(t) {
            return this._photos
        }, t.prototype.setPhotos = function(t) {
            return this._photos = t, this
        }, t.prototype.__graph = {
            watch: "graphDidSet",
            name: "graph"
        }, t.prototype.graph = function(t) {
            return this._graph
        }, t.prototype.setGraph = function(t) {
            var e = this.graph();
            return t != e && (this._graph = t), t != e && this.graphDidSet && this.graphDidSet(t, e, this.__graph), this
        }, t.prototype.render = function() {
            return this.setGraph(Hue.get("facebook")), t.__super__.render.apply(this, arguments)
        }, t.prototype.graphDidSet = function(t) {
            var e;
            if (t) return this.setFeed(t.feed && t.feed.data), this.setPhotos(this.feed() && this.feed().filter(function(t) {
                return t.picture
            })), this.setFeed(e = this.feed() && this.feed().filter(function(t) {
                return t.message
            })), e
        }, t.prototype.fetch = function() {
            return this
        }, t.prototype.heading = function() {
            var t;
            this.$$ || (this.$$ = {});
            return (t = this._heading = this._heading || (t = s("h2", this)).flag("heading").flag("title").setContent(t.$.A || s("a", t.$, "A", t).setTarget("_blank").setText("Besøk oss på facebook"), 2)).end((t.$.A.setHref("http://facebook.com/" + this.graph().id).end(), !0))
        }, t.prototype.body = function() {
            var t, e = (this.$$ || (this.$$ = {}), this);
            return (t = e._body = e._body || (t = s("div", e)).flag("body")).setContent("cols" == e.composition() ? o.static([e.heading(), (t.$.A || s("div", t.$, "A", t).dataset("layout", "tiles")).setContent([e.photos() ? (t.$.B || s("div", t.$, "B", "A").flag("photos").flag("item")).setContent(function(t) {
                for (var n = t.$iter(), o = 0, r = i(e.photos()), a = r.length; o < a; o++) o < 12 && n.push((t[o] || s("hue-facebook-photo", t, o).flag("item")).setData(r[o]).setPage(e.graph()).end());
                return n
            }(t.$.C || r(t.$, "C", t.$.B)), 5) : void 0, (t.$.D || s("div", t.$, "D", "A").flag("feed").flag("l-list").flag("item")).setContent(function(t) {
                for (var n = t.$iter(), o = 0, r = i(e.feed()), a = r.length; o < a; o++) o < 6 && n.push((t[o] || s("hue-facebook-post", t, o).flag("item").setCap(40)).setData(r[o]).setPage(e.graph()).end());
                return n
            }(t.$.E || r(t.$, "E", t.$.D)), 5)], 1).end()], 1, 1) : o.static([e.heading(), e.feed() ? (t.$.F || s("div", t.$, "F", t).flag("feed").flag("carousel").dataset("layout", "carousel").dataset("cycle", "5000")).setContent(function(t) {
                for (var n = t.$iter(), o = 0, r = i(e.feed()), a = r.length; o < a; o++) o < 6 && n.push((t[o] || s("hue-facebook-post", t, o).flag("item")).setData(r[o]).setPage(e.graph()).end());
                return n
            }(t.$.G || r(t.$, "G", t.$.F)), 5).end() : void 0], 1, 2), 3)
        }, t.prototype.shouldRender = function() {
            return !!Hue.get("facebook")
        }, t.prototype.showNode = function() {
            return Hue.get("facebook") ? this : null
        }
    })
}, function(t, e) {}, function(t, e, n) {
    function i(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }
    var o = n(0),
        r = o.createTagList,
        s = o.createElement;
    o.defineTag("hue-rss-post", function(t) {
        t.prototype.page = function(t) {
            return this._page
        }, t.prototype.setPage = function(t) {
            return this._page = t, this
        }, t.prototype.ontap = function(t) {
            return t.halt()
        }, t.prototype.render = function() {
            var t = this.$;
            return this.$open(0).setChildren(t[0] || s("div", t, 0, this).flag("box").setContent([s("div", t, 1, 0).flag("h2"), s("div", t, 2, 0).flag("p").flag("content"), s("a", t, 3, 0).flag("more").setText("Les mer...")], 2), 2).synced((t[1].setContent(this.object().title, 3), t[2].setContent(this.object().content, 3), t[3].setHref(this.object().link).end(), !0))
        }
    }), o.defineTag("hue-rss", "hue-block", function(t) {
        t.prototype.items = function(t) {
            return this._items
        }, t.prototype.setItems = function(t) {
            return this._items = t, this
        }, t.option("url", {
            type: "url",
            desc: "Lenke til en gyldig rss-feed"
        }), t.prototype.render = function() {
            return t.__super__.render.apply(this, arguments)
        }, t.prototype.setup = function() {
            return t.__super__.setup.apply(this, arguments), this.loadFeed(), this
        }, t.prototype.loadFeed = function() {
            var t = this;
            return Hue.xhr("GET", "/" + t._did + ".rss", function(e) {
                return t.log("loadFeed", e), t.setItems(e), t.render()
            }), t
        }, t.prototype.body = function() {
            var t, e = (this.$$ || (this.$$ = {}), this);
            return (t = e._body = e._body || (t = s("div", e)).flag("body").flag("wide")).setContent([void 0, function(t) {
                for (var n = 0, o = i(e.items()), r = t.taglen = o.length; n < r; n++)(t[n] || s("hue-rss-post", t, n)).setData(o[n]).end();
                return t
            }(t.$.A || r(t.$, "A", e._body))], 1)
        }, t.prototype.shouldRender = function() {
            return !0
        }, t.prototype.showNode = function() {
            return this
        }
    })
}, function(t, e, n) {
    var i = n(0),
        o = i.createElement;
    i.defineTag("hue-iframe", "iframe", function(t) {
        t.prototype.__style = {
            watch: "styleDidSet",
            name: "style"
        }, t.prototype.style = function(t) {
            return this._style
        }, t.prototype.setStyle = function(t) {
            var e = this.style();
            return t != e && (this._style = t), t != e && this.styleDidSet && this.styleDidSet(t, e, this.__style), this
        }, t.prototype.styleDidSet = function(t) {
            if (t) return this.dom().setAttribute("style", t)
        }
    }), i.defineTag("hue-embed", "hue-block", function(t) {
        t.option("url", {
            type: "url",
            desc: "Lenke til den eksterne siden som vil vises i egen ramme"
        }), t.option("style", {
            type: "string",
            desc: "Stil for iframe"
        }), t.prototype.body = function() {
            var t;
            this.$$ || (this.$$ = {});
            return (t = this._body = this._body || (t = o("div", this)).flag("body")).setContent((t.$.A || o("hue-iframe", t.$, "A", t).flag("frame")).setSrc(this.o("url")).setStyle(this.o("style")).end(), 3)
        }
    })
}, function(t, e, n) {
    var i = n(0),
        o = i.createElement;
    n(56).CarouselLayout, n(2).Layout;
    i.defineTag("hue-hero-item", "hue-post", function(t) {
        t.prototype.__offset = {
            default: 0,
            watch: "draw",
            name: "offset"
        }, t.prototype.offset = function(t) {
            return this._offset
        }, t.prototype.setOffset = function(t) {
            var e = this.offset();
            return t != e && (this._offset = t), t != e && this.draw && this.draw(t, e, this.__offset), this
        }, t.prototype._offset = 0, t.prototype.layout = function(t) {
            return this._layout
        }, t.prototype.setLayout = function(t) {
            return this._layout = t, this
        };
        t.prototype.links = function() {
            return this.object().links
        }, t.prototype.param = function(t) {
            return this.object()[t]
        }, t.prototype.render = function() {
            var t = this.$;
            return this.$open(0).flag("item").setChildren([this._image = this._image || o("hue-image", this).flag("image").setSize(12), this._cover = this._cover || o("div", this).flag("cover"), this._body = this._body || o("div", this).flag("body").setContent([o("div", t, 0, this._body).flag("t").setContent(t[1] || o("hue-h2", t, 1, 0).setKey("title"), 2), o("div", t, 2, this._body).flag("tg").setContent(t[3] || o("hue-p", t, 3, 2).setKey("tagline"), 2)], 2), this.hud()], 1).synced((this._image.setPos(this.param("imagePosition")).setDid(this.param("imageId")).end(), t[1].setContent(this.object().title, 3).end(), t[3].setContent(this.object().subtitle || this.object().tagline, 3).end(), !0))
        }, t.prototype.draw = function(t, e) {
            var n = Math.abs(t);
            return TweenMax.set(this.dom(), {
                xPercent: 100 * t,
                x: 0,
                force3D: !0
            }), TweenMax.set(this._image.dom(), {
                xPercent: -70 * t
            }), n < .02 && !this._expandend ? this.expand() : n > .15 && this._expanded && this.collapse(), this
        }, t.prototype.setup = function() {
            return t.__super__.setup.apply(this, arguments), this.collapse(0, 0), this
        }, t.prototype.expand = function(t, e) {
            return void 0 === t && (t = 2), void 0 === e && (e = .1), this._expanded = !0, this._prerendered || (this.collapse(0, 0), this._prerendered = !0, this.flag("prerendered")), this._image, this.expandItems(t, e), this
        }, t.prototype.collapse = function(t, e) {
            return void 0 === t && (t = .5), void 0 === e && (e = .1), this._expanded && (this._expanded = !1, this.collapseItems(t, e), this._image), this
        }, t.prototype.lines = function() {
            return Array.prototype.slice.call(this.dom().querySelectorAll(".fln"))
        }, t.prototype.expandItems = function(t, e) {
            var n = this.lines();
            return TweenMax.killTweensOf(n), TweenMax.staggerTo(n, 1, {
                opacity: .99,
                scale: 1,
                y: 0,
                ease: Strong.easeOut
            }, .2), this
        }, t.prototype.collapseItems = function(t, e) {
            var n = this.lines().reverse();
            return TweenMax.killTweensOf(n), 0 == t ? TweenMax.set(n, {
                opacity: 0,
                scale: .8,
                y: 0
            }) : TweenMax.staggerTo(n, t, {
                opacity: 0,
                scale: .8,
                y: 0,
                ease: Strong.easeIn
            }, e), this
        }, t.prototype.hoverin = function() {
            return this
        }, t.prototype.hoverout = function() {
            return this
        }, t.prototype.candrop = function(t) {
            return 0 == this.offset()
        }
    }), i.defineTag("hue-hero-item-banner", "hue-hero-item", function(t) {
        t.prototype.__contents = {
            watch: "contentsDidSet",
            name: "contents"
        }, t.prototype.contents = function(t) {
            return this._contents
        }, t.prototype.setContents = function(t) {
            var e = this.contents();
            return t != e && (this._contents = t), t != e && this.contentsDidSet && this.contentsDidSet(t, e, this.__contents), this
        }, t.prototype.render = function() {
            var t = this.$;
            return this.$open(0).flag("item").setChildren([this._image = this._image || o("hue-image", this).flag("image").setSize(12), this._cover = this._cover || o("div", this).flag("cover"), this._body = this._body || o("div", this).flag("body").setContent(t[0] || o("hue-content", t, 0, this._body).setKey("content").setFlow(!0), 2), this.hud()], 1).synced((this._image.setPos(this.param("imagePosition")).setDid(this.param("imageId")).end(), this._cover.css("backgroundColor", this.o("tintColor")).css("opacity", this.o("tintAlpha") || 0).end(), t[0].bindData(this, "data", []).setContent(this.data().content).end(), !0)), this
        }, t.prototype.onreflow = function(t) {
            return t.halt()
        }
    }), i.defineTag("hue-hero", "hue-posts", function(t) {
        t.prototype.body = function() {
            this.$$ || (this.$$ = {});
            return (this._body = this._body || o("div", this).flag("body").setKey("posts").dataset("layout", "carousel").dataset("sizing", "auto")).dataset("cycle", this.o("cycleTime", 5e3)).end()
        }, t.prototype.render = function() {
            return this.$open(0).setChildren([this.anchor(), this.body(), this.hud()], 1).synced(), this.didRender()
        }, t.prototype.synced = function() {
            return this.renderBody(), this
        }, t.prototype.item = function(t, e) {
            return Hue.nodeForPost(this, t, "hero-item", e).setData(t).end()
        }
    })
}, function(t, e, n) {
    function i(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }

    function o(t) {
        this._owner = t, this._offset = t.offset(), this._width = t.body().dom().offsetWidth
    }

    function r() {
        return h.apply(this, arguments)
    }
    var s = n(0),
        a = s.createTagList,
        u = s.createElement,
        h = n(2).Layout,
        p = n(5).Delay;
    o.prototype.owner = function(t) {
        return this._owner
    }, o.prototype.setOwner = function(t) {
        return this._owner = t, this
    }, o.prototype.__active = {
        default: !1,
        name: "active"
    }, o.prototype.active = function(t) {
        return this._active
    }, o.prototype.setActive = function(t) {
        return this._active = t, this
    }, o.prototype._active = !1, o.prototype.cancel = function() {
        return this._cancelled = !0, this.setActive(!1), this
    }, o.prototype.ontouchstart = function(t) {
        return this._start = Date.now(), this
    }, o.prototype.ontouchupdate = function(t) {
        if (!this._cancelled) return this.active() ? this.update(t) : Math.abs(t.dy()) > 10 ? this.cancel() : Math.abs(t.dx()) > 10 && (this.setActive(!0), this._start = Date.now(), t.capture(), TweenMax.killTweensOf(this._owner), this.owner().rotater().cancel()), this
    }, o.prototype.ontouchend = function(t) {
        return this.active() && (this.update(t), this.finish(t)), this.owner().autorotate(), this
    }, o.prototype.update = function(t) {
        var e = t.dx() / this._width;
        return this.owner().setOffset(this._offset - e), this
    }, o.prototype.finish = function(t) {
        var e = Date.now() - this._start,
            n = t.dx() / e;
        Math.round(this.owner().offset());
        return n > 1 ? this.owner().step(-1) : n < -1 ? this.owner().step(1) : this.owner().step(0), this
    }, s.subclass(r, h), e.CarouselLayout = r, r.register("carousel"), r.prototype.rotater = function(t) {
        return this._rotater
    }, r.prototype.setRotater = function(t) {
        return this._rotater = t, this
    }, r.prototype.__offset = {
        default: 0,
        chainable: !0,
        watch: "draw",
        name: "offset"
    }, r.prototype.offset = function(t) {
        return void 0 !== t ? (this.setOffset(t), this) : this._offset
    }, r.prototype.setOffset = function(t) {
        var e = this.offset();
        return t != e && (this._offset = t), t != e && this.draw && this.draw(t, e, this.__offset), this
    }, r.prototype._offset = 0, r.prototype.__index = {
        default: 0,
        watch: "indexDidSet",
        name: "index"
    }, r.prototype.index = function(t) {
        return this._index
    }, r.prototype.setIndex = function(t) {
        var e = this.index();
        return t != e && (this._index = t), t != e && this.indexDidSet && this.indexDidSet(t, e, this.__index), this
    }, r.prototype._index = 0, r.prototype.setup = function() {
        var t = this;
        return t._sizing = t.node().dataset("sizing"), t._cycle = parseInt(t.node().dataset("cycle") || "0"), t._handler = function(e) {
            return t.ontouchstart(e)
        }, t.node().ontouchstart || (t.node().ontouchstart = t._handler), r.__super__.setup.apply(t, arguments), t._rotater = new p(t, "rotate"), t.items() && (t.dots(), t.indexDidSet(0, -1)), t._dots && !t._dots.parent() && t.node().dom().appendChild(t._dots.dom()), t.compose()
    }, r.prototype.items = function() {
        return this.body()._tree_
    }, r.prototype.indexDidSet = function(t, e) {
        return this.dot(e) && this.dot(e).unflag("selected"), this.dot(t) && this.dot(t).flag("selected"), this
    }, r.prototype.dot = function(t) {
        return this._dots._tree_[t % this.items().length]
    }, r.prototype.focusItem = function() {
        return this.items()[this.index()]
    }, r.prototype.dots = function() {
        var t, e = (this.$$ || (this.$$ = {}), this);
        return (t = e._dots = e._dots || (t = u("div", e)).flag("dots").on$(0, ["dblclick", "stopRotate"], e)).setContent(function(t) {
            for (var n = 0, o = i(e.items()), r = t.taglen = o.length; n < r; n++)(t[n] || u("div", t, n).flag("dot")).on$(0, ["tap", ["goto", n, .4]], e);
            return t
        }(t.$.A || a(t.$, "A", e._dots)), 4)
    }, r.prototype.stopRotate = function() {
        return console.log("stopRotate"), this._cycle = 0
    }, r.prototype.larr = function() {
        var t;
        this.$$ || (this.$$ = {});
        return (t = this._larr = this._larr || (t = u("div", this)).flag("larr").flag("arr").flag("left").setContent(t.$.A || u("i", t.$, "A", t), 2)).on$(0, ["tap", ["step", -1, .4]], this)
    }, r.prototype.rarr = function() {
        var t;
        this.$$ || (this.$$ = {});
        return t = this._rarr = this._rarr || (t = u("div", this)).flag("rarr").flag("arr").flag("right").on$(0, ["tap", ["step", 1, .4]], this).setContent(t.$.A || u("i", t.$, "A", t), 2)
    }, r.prototype.refresh = function() {
        return this.dots(), this
    }, r.prototype.ux = function() {
        return [this.dots(), this.larr(), this.rarr()]
    }, r.prototype.draw = function() {
        var t = this.offset(),
            e = this.items(),
            n = this._count = e.length;
        this._normOffset = (1e3 * n + t) % n, this.setIndex(Math.round(this._normOffset));
        for (var o, r = 0, s = i(e), a = s.length; r < a; r++) {
            o = s[r];
            var u = r - t,
                h = 1;
            n > 5 && (h = 2);
            var p = (h + u + 1e3 * n) % n - h;
            if (1 == n && (p = u), o.offset) o.setOffset(p);
            else {
                Math.abs(p);
                TweenMax.set(o.dom(), {
                    x: p * this._width
                }), o.drawAtOffset && o.drawAtOffset(p)
            }
        }
        return this
    }, r.prototype.step = function(t, e) {
        return void 0 === e && (e = .4), TweenMax.to(this, e, {
            offset: Math.round(this.offset() + t)
        }), this
    }, r.prototype.goto = function(t, e) {
        void 0 === e && (e = .4), this._offset = this._normOffset || this._offset;
        var n = t + this.items().length - 1;
        this._offset;
        return t < this._offset && n - this._offset < this._offset - t && (t = n + 1), TweenMax.to(this, e, {
            offset: Math.round(t)
        }), this
    }, r.prototype.isEnabled = function() {
        return this.items().length > 1
    }, r.prototype.rotate = function() {
        return this._entered ? this.step(1) : this.step(1, 0), this.autorotate()
    }, r.prototype.autorotate = function() {
        return this._cycle && this.items().length > 1 && this._rotater.delay(this._cycle), this
    }, r.prototype.ontouchstart = function(t) {
        if (this._rotater.cancel(), this.isEnabled()) return t.extend(new o(this))
    }, r.prototype.enter = function() {
        var t;
        return this._entered || (this.draw(), this.focusItem() && (t = this.focusItem()) && t.expand && t.expand(), this._entered = !0), this.autorotate(), this
    }, r.prototype.reenter = function() {
        return this.autorotate(), this._entered = !0, this
    }, r.prototype.leave = function() {
        return this._entered = !1, this
    }, r.prototype.compose = function() {
        for (var t = this.node().dom().offsetWidth, e = 0, n = 0, o = i(this.items()), r = o.length; n < r; n++) {
            var s = o[n].dom().offsetHeight;
            s > e && (e = s)
        }
        if (e && "auto" != this._sizing && e != this._height) {
            this._height = e, this.node().css("min-height", e + "px"), this.node().css("min-width", t + "px");
            for (var a = 0, u = i(this.items()), h = u.length; a < h; a++) u[a].css("min-height", this._height + "px")
        }
        return this._width = t, this.items() && this.draw(), this
    }, r.prototype.teardown = function() {
        return console.log("TEARDOWN CAROUSEL"), CS = this, this
    }
}, function(t, e, n) {
    var i = n(0),
        o = i.createElement;
    i.defineTag("hue-generic", "hue-block", function(t) {
        t.prototype.body = function() {
            var t;
            this.$$ || (this.$$ = {});
            return (t = this._body = this._body || (t = o("div", this)).flag("body").setContent(t.$.A || o("hue-content", t.$, "A", t).flag("article").setKey("content"), 2)).end((t.$.A.bindData(this, "object", []).setContent(this.get("content")).end(), !0))
        }
    })
}, function(t, e, n) {
    var i = n(0),
        o = i.createElement;
    i.defineTag("hue-testimonials", "hue-posts", function(t) {
        t.prototype.type = function() {
            return "testimonials"
        }, t.prototype.body = function() {
            this.$$ || (this.$$ = {});
            return (this._body = this._body || o("div", this).flag("body").flag("wide").dataset("layout", "carousel")).end()
        }, t.prototype.item = function(t, e) {
            return Hue.nodeForPost(this, t, "testimonial", e).setData(t).end()
        }
    }), i.defineTag("hue-testimonial", "hue-post", function(t) {
        t.prototype.render = function() {
            return this.$open(0).flag("item").setChildren([this.body(), this.hud()], 1).synced()
        }, t.prototype.body = function() {
            var t;
            this.$$ || (this.$$ = {});
            return (t = this._body = this._body || (t = o("div", this)).flag("body").setContent([o("hue-h2", t.$, "A", t).flag("title").setKey("title"), o("hue-p", t.$, "B", t).flag("quote").setKey("tagline")], 2)).end((t.$.A.setContent(this.data().title, 3).end(), t.$.B.setContent(this.data().tagline, 3).end(), !0))
        }
    })
}, function(t, e, n) {
    n(0).defineTag("hue-gallery", "hue-block")
}, function(t, e, n) {
    function i(t) {
        return t ? t.toArray ? t.toArray() : t : []
    }
    var o = n(0),
        r = o.createElement,
        s = function(t) {
            return t.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
        };
    o.defineTag("hue-contact", "hue-block", function(t) {
        var e = [{
            name: "name",
            type: "text",
            placeholder: "Ditt navn",
            required: !0,
            autocomplete: "name"
        }, {
            name: "email",
            type: "text",
            placeholder: "Din epost",
            required: !0,
            autocomplete: "email"
        }, {
            name: "phone",
            type: "text",
            placeholder: "Ditt telefonnummer",
            autocomplete: "tel-national",
            required: !1
        }, {
            name: "body",
            type: "textarea",
            placeholder: "Din forespørsel...",
            required: !0
        }];
        t.option("extrafields", {
            type: "text",
            desc: "Ekstra felter (komma-separert)"
        }), t.prototype.allFields = function() {
            if (this._fields) return this._fields;
            this._fields = e.slice(0);
            var t = this.o("extrafields");
            if (t)
                for (var n, o = 0, r = i(t.split(",").reverse()), a = r.length; o < a; o++) {
                    n = r[o];
                    var u = {
                        name: s(n),
                        type: "text",
                        placeholder: n,
                        required: !1
                    };
                    this._fields.splice(3, 0, u)
                }
            return this._fields
        }, t.prototype.body = function() {
            var t, e;
            this.$$ || (this.$$ = {});
            return (t = this._body = this._body || (t = r("div", this)).flag("body").flag("m2").flag("tiles").flag("wide").setContent([r("div", t.$, "A", t).flag("item").flag("vcard").setContent(t.$.B || r("hue-vcard", t.$, "B", "A").flag("vcard").flag("list"), 2), r("div", t.$, "C", t).flag("item").flag("map").setContent(t.$.D || r("hue-map", t.$, "D", "C"), 2), e = (e = r("div", t.$, "E", t)).flag("item").flag("form").setContent(this._form = this._form || r("hue-form", e).flag("form").flag("sub").setAction("/"), 2)], 2)).end((t.$.B.bindData(this, "object", []).setShowAddress(this.o("showAddress", !0)).end(), t.$.D.setAddress(Hue.get("adresse")).end(), this._form.setFields(this.allFields()).dataset("id", this.object()._id).end(), !0))
        }
    }), o.defineTag("hue-contact-map", "hue-contact", function(t) {
        t.prototype.body = function() {
            this.$$ || (this.$$ = {});
            return (this._body = this._body || r("hue-map", this).flag("body").setZoom(13)).setAddress(Hue.get("adresse")).end()
        }
    })
}, function(t, e) {
    ! function() {
        var t = {},
            e = {},
            n = 0,
            i = document.createElement("style"),
            o = document.createElement("style"),
            r = document.getElementsByTagName("head")[0],
            s = ["animationstart", "oAnimationStart", "MSAnimationStart", "webkitAnimationStart"],
            a = function(e) {
                e.selector = (t[e.animationName] || {}).selector, ((this.selectorListeners || {})[e.animationName] || []).forEach(function(t) {
                    t.call(this, e)
                }, this)
            },
            u = function() {
                var t = "animation-duration: 0.001s;",
                    e = "animation-name: SelectorListener !important;",
                    n = window.getComputedStyle(document.documentElement, ""),
                    i = (Array.prototype.slice.call(n).join("").match(/-(moz|webkit|ms)-/) || "" === n.OLink && ["", "o"])[1];
                return {
                    css: "-" + i + "-",
                    properties: "{" + t + e + "-" + i + "-" + t + "-" + i + "-" + e + "}",
                    keyframes: !(!window.CSSKeyframesRule && !window["WebKit|Moz|MS|O".match(new RegExp("(" + i + ")", "i"))[1] + "CSSKeyframesRule"])
                }
            }();
        i.type = o.type = "text/css", r.appendChild(i), r.appendChild(o), document.addSelectorListener = HTMLElement.prototype.addSelectorListener = function(r, h) {
            var p = e[r],
                l = this.selectorListeners = this.selectorListeners || {};
            if (p) t[p].count++;
            else {
                p = e[r] = "SelectorListener-" + n++;
                var c = document.createTextNode("@" + (u.keyframes ? u.css : "") + "keyframes " + p + " {from { outline-color: #fff; } to { outline-color: #000; }}");
                o.appendChild(c), i.sheet.insertRule(r + u.properties.replace(/SelectorListener/g, p), 0), t[p] = {
                    count: 1,
                    selector: r,
                    keyframe: c,
                    rule: i.sheet.cssRules[0]
                }
            }
            l.count ? l.count++ : (l.count = 1, s.forEach(function(t) {
                this.addEventListener(t, a, !1)
            }, this)), (l[p] = l[p] || []).push(h)
        }, document.removeSelectorListener = HTMLElement.prototype.removeSelectorListener = function(n, r) {
            var u = this.selectorListeners || {},
                h = e[n],
                p = u[h] || [],
                l = p.indexOf(r);
            if (l > -1) {
                var c = t[e[n]];
                c.count--, c.count || (i.sheet.deleteRule(i.sheet.cssRules.item(c.rule)), o.removeChild(c.keyframe), delete t[h], delete e[n]), u.count--, p.splice(l, 1), u.count || s.forEach(function(t) {
                    this.removeEventListener(t, a, !1)
                }, this)
            }
        }
    }()
}]);