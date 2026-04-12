/*! For license information please see Grammarly.js.LICENSE.txt */
var e,
    t,
    n,
    r,
    i = {
        71654: (e, t, n) => {
            var r = n(33356),
                i = "chrome-extension://__MSG_@@extension_id__/",
                o = "moz-extension://__MSG_@@extension_id__/",
                s = "safari-web-extension://__MSG_@@extension_id__/",
                a = self.GR_RESOURCE_ROOT || i,
                c = self.GR_RESOURCE_ROOT || o,
                u = self.GR_RESOURCE_ROOT || s;
            e.exports = {
                __css: r.toString().replace(new RegExp(i, "g"), a).replace(new RegExp(o, "g"), c).replace(new RegExp(s, "g"), u),
                ...r.locals
            }
        },
        68983: (e, t, n) => {
            function r(e) {
                return i(e, e.length - 1, [])
            }
            function i(e, t, n) {
                return function(r) {
                    var o = n.concat([r]);
                    return 0 === t ? e.apply(this, o) : i(e, t - 1, o)
                }
            }
            n.d(t, {
                W: () => r
            })
        },
        22232: (e, t, n) => {
            n.d(t, {
                L0: () => u,
                ej: () => o,
                kG: () => a,
                sH: () => i,
                vE: () => c
            });
            var r = n(59312),
                i = function(e) {
                    void 0 === e && (e = "(nomessage)"),
                    Error.call(this, e),
                    "captureStackTrace" in Error ? Error.captureStackTrace(this, this.constructor) : this.stack = (new Error).stack,
                    this.message = e,
                    this.name = this.constructor.name
                };
            i.prototype = Object.create(Error.prototype);
            var o = function(e) {
                    function t(t, n) {
                        void 0 === n && (n = "empty");
                        var r = e.call(this, "Invariant condition failed: " + (Boolean(t) ? t : "(unnamed)")) || this;
                        return r.input = n, r
                    }
                    return (0, r.__extends)(t, e), t.prototype.toString = function() {
                        return "".concat(this.message, " on input[").concat(this.input, "]")
                    }, t
                }(i),
                s = (function(e) {
                    function t(t) {
                        return e.call(this, t) || this
                    }
                    (0, r.__extends)(t, e)
                }(i), function(e) {
                    function t(t) {
                        return e.call(this, "Matching not exhaustive".concat(Boolean(t) ? ": unexpected value ".concat(JSON.stringify(t)) : "")) || this
                    }
                    return (0, r.__extends)(t, e), t
                }(i));
            function a(e, t, n) {
                if (!e) {
                    var r = new o("string" == typeof t ? t : t && t(), void 0 !== n && "string" != typeof n ? n() : n);
                    throw r.stack = r.stack.split("\n").filter((function(e) {
                        return -1 === e.indexOf("errors.")
                    })).join("\n"), r
                }
            }
            function c(e) {
                throw new s(e)
            }
            function u(e) {
                return e
            }
        },
        55415: (e, t, n) => {
            n.d(t, {
                CE: () => _,
                Fx: () => p,
                H6: () => m,
                Ov: () => f,
                Qr: () => l,
                Vx: () => h,
                Xy: () => u,
                ei: () => g,
                qo: () => d,
                sq: () => y,
                v4: () => a,
                vZ: () => b
            });
            var r = n(59312),
                i = n(5114),
                o = n(40327),
                s = n(68983),
                a = function e(t) {
                    if ("object" != typeof t)
                        return t;
                    var n,
                        r,
                        i = Object.prototype.toString.call(t);
                    if ("[object Object]" === i) {
                        if (t.constructor !== Object && "function" == typeof t.constructor)
                            for (n in r = new t.constructor, t)
                                t.hasOwnProperty(n) && r[n] !== t[n] && (r[n] = e(t[n]));
                        else
                            for (n in r = {}, t)
                                "__proto__" === n ? Object.defineProperty(r, n, {
                                    value: e(t[n]),
                                    configurable: !0,
                                    enumerable: !0,
                                    writable: !0
                                }) : r[n] = e(t[n]);
                        return r
                    }
                    if ("[object Array]" === i) {
                        for (n = t.length, r = Array(n); n--;)
                            r[n] = e(t[n]);
                        return r
                    }
                    if ("[object Date]" === i)
                        return new Date(+t);
                    if ("[object RegExp]" === i)
                        return (r = new RegExp(t.source, t.flags)).lastIndex = t.lastIndex, r;
                    return t
                };
            var c = Object.prototype.hasOwnProperty;
            function u(e, t) {
                var n,
                    r;
                if (e === t)
                    return !0;
                if (e && t && (n = e.constructor) === t.constructor) {
                    if (n === Date)
                        return e.getTime() === t.getTime();
                    if (n === RegExp)
                        return e.toString() === t.toString();
                    if (n === Array) {
                        if ((r = e.length) === t.length)
                            for (; r-- && u(e[r], t[r]);)
                                ;
                        return -1 === r
                    }
                    if (!n || "object" == typeof e) {
                        for (n in r = 0, e) {
                            if (c.call(e, n) && ++r && !c.call(t, n))
                                return !1;
                            if (!(n in t) || !u(e[n], t[n]))
                                return !1
                        }
                        return Object.keys(t).length === r
                    }
                }
                return e != e && t != t
            }
            function l(e) {
                for (var t in e)
                    if (Object.prototype.hasOwnProperty.call(e, t))
                        return !1;
                return !0
            }
            function d(e) {
                return Object.keys(e).map((function(t) {
                    return e[t]
                }))
            }
            var f = (0, s.W)((function(e, t, n) {
                var o,
                    s = n,
                    a = e,
                    c = s[a],
                    u = (0, r.__rest)(s, ["symbol" == typeof a ? a : a + ""]);
                return (0, r.__assign)(((o = {})[e] = t(i.fromNullable(c)), o), u)
            }));
            (0, s.W)((function(e, t, n) {
                var s = n,
                    a = e,
                    c = s[a],
                    u = (0, r.__rest)(s, ["symbol" == typeof a ? a : a + ""]),
                    l = "function" == typeof t ? t(i.fromNullable(c)) : t;
                return (0, o.pipe)(l, i.fold((function() {
                    return u
                }), (function(t) {
                    var n;
                    return (0, r.__assign)(((n = {})[e] = t, n), u)
                })))
            }));
            function h(e, t) {
                return Object.assign({}, e, t)
            }
            function p(e, t) {
                var n = {};
                for (var r in e) {
                    var i = t[r];
                    void 0 !== i ? n[r] = "object" == typeof i ? p(e[r], i) : i : n[r] = e[r]
                }
                return n
            }
            function g(e) {
                return function(t) {
                    return t[e]
                }
            }
            function m() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                return function(t) {
                    return e.reduce((function(e, n) {
                        var i;
                        return (0, r.__assign)((0, r.__assign)({}, e), ((i = {})[n] = t[n], i))
                    }), {})
                }
            }
            function b(e, t) {
                if (e === t)
                    return !0;
                if (v(e) || v(t))
                    return e === t;
                if (Object.keys(e).length !== Object.keys(t).length)
                    return !1;
                for (var n in e) {
                    if (!(n in t))
                        return !1;
                    if (!b(e[n], t[n]))
                        return !1
                }
                return !0
            }
            function v(e) {
                return e !== Object(e)
            }
            function y(e) {
                return Array.from(e).reduce((function(e, t) {
                    var n,
                        i = t[0],
                        o = t[1];
                    return (0, r.__assign)((0, r.__assign)({}, e), ((n = {})[i] = o, n))
                }), {})
            }
            var _ = function(e) {
                for (var t = [], n = 1; n < arguments.length; n++)
                    t[n - 1] = arguments[n];
                var i = (0, r.__assign)({}, e);
                return t.forEach((function(e) {
                    return delete i[e]
                })), i
            }
        },
        3103: (e, t, n) => {
            function r(e) {
                const t = [];
                let n;
                for (; !(n = e.next()).done;)
                    t.push(n.value);
                return t
            }
            function i(e, t) {
                return Object.prototype.hasOwnProperty.call(t, e)
            }
            function o(e, t) {
                return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
            }
            n.d(t, {
                f: () => u
            });
            const s = function() {
                    const e = Object.prototype.toString;
                    return "[object Arguments]" === e.call(arguments) ? function(t) {
                        return "[object Arguments]" === e.call(t)
                    } : function(e) {
                        return i("callee", e)
                    }
                }(),
                a = function() {
                    const e = !{
                            toString: null
                        }.propertyIsEnumerable("toString"),
                        t = ["constructor", "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"],
                        n = function() {
                            return arguments.propertyIsEnumerable("length")
                        }(),
                        r = function(e, t) {
                            for (var n = 0; n < e.length;) {
                                if (e[n] === t)
                                    return !0;
                                n += 1
                            }
                            return !1
                        };
                    return "function" != typeof Object.keys || n ? function(o) {
                        if (Object(o) !== o)
                            return [];
                        let a,
                            c;
                        const u = [],
                            l = n && s(o);
                        for (a in o)
                            !i(a, o) || l && "length" === a || (u[u.length] = a);
                        if (e)
                            for (c = t.length - 1; c >= 0;)
                                a = t[c],
                                i(a, o) && !r(u, a) && (u[u.length] = a),
                                c -= 1;
                        return u
                    } : function(e) {
                        return Object(e) !== e ? [] : Object.keys(e)
                    }
                }();
            function c(e) {
                return null === e ? "Null" : void 0 === e ? "Undefined" : Object.prototype.toString.call(e).slice(8, -1)
            }
            function u(e, t, n=[], s=[]) {
                if (o(e, t))
                    return !0;
                if (c(e) !== c(t))
                    return !1;
                if (null == e || null == t)
                    return !1;
                if ("function" == typeof e.equals || "function" == typeof t.equals)
                    return "function" == typeof e.equals && e.equals(t) && "function" == typeof t.equals && t.equals(e);
                switch (c(e)) {
                case "Arguments":
                case "Array":
                case "Object":
                    if ("function" == typeof e.constructor && "Promise" === function(e) {
                        const t = String(e).match(/^function (\w*)/);
                        return null == t ? "" : t[1]
                    }(e.constructor))
                        return e === t;
                    break;
                case "Boolean":
                case "Number":
                case "String":
                    if (typeof e != typeof t || !o(e.valueOf(), t.valueOf()))
                        return !1;
                    break;
                case "Date":
                    if (!o(e.valueOf(), t.valueOf()))
                        return !1;
                    break;
                case "Error":
                    return e.name === t.name && e.message === t.message;
                case "RegExp":
                    if (e.source !== t.source || e.global !== t.global || e.ignoreCase !== t.ignoreCase || e.multiline !== t.multiline || e.sticky !== t.sticky || e.unicode !== t.unicode)
                        return !1;
                    break;
                case "Map":
                case "Set":
                    if (!u(r(e.entries()), r(t.entries()), n, s))
                        return !1;
                    break;
                case "Int8Array":
                case "Uint8Array":
                case "Uint8ClampedArray":
                case "Int16Array":
                case "Uint16Array":
                case "Int32Array":
                case "Uint32Array":
                case "Float32Array":
                case "Float64Array":
                case "ArrayBuffer":
                    break;
                default:
                    return !1
                }
                const l = a(e);
                if (l.length !== a(t).length)
                    return !1;
                let d = n.length - 1;
                for (; d >= 0;) {
                    if (n[d] === e)
                        return s[d] === t;
                    d -= 1
                }
                for (n.push(e), s.push(t), d = l.length - 1; d >= 0;) {
                    const r = l[d];
                    if (!i(r, t) || !u(t[r], e[r], n, s))
                        return !1;
                    d -= 1
                }
                return n.pop(), s.pop(), !0
            }
        },
        84837: (e, t, n) => {
            n.d(t, {
                cc: () => h,
                cn: () => m
            });
            var r,
                i = n(20817),
                o = n(87871),
                s = n(95300),
                a = n(14601),
                c = n(2844),
                u = (r = function(e, t) {
                    return r = Object.setPrototypeOf || {
                        __proto__: []
                    } instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t)
                            t.hasOwnProperty(n) && (e[n] = t[n])
                    }, r(e, t)
                }, function(e, t) {
                    function n() {
                        this.constructor = e
                    }
                    r(e, t),
                    e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                }),
                l = function() {
                    for (var e = 0, t = 0, n = arguments.length; t < n; t++)
                        e += arguments[t].length;
                    var r = Array(e),
                        i = 0;
                    for (t = 0; t < n; t++)
                        for (var o = arguments[t], s = 0, a = o.length; s < a; s++, i++)
                            r[i] = o[s];
                    return r
                },
                d = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return u(t, e), t.prototype.view = function() {
                        for (var e = [], t = 0; t < arguments.length; t++)
                            e[t] = arguments[t];
                        return void 0 !== e[0] ? "function" == typeof e[0] ? new g(this, e[0]) : "string" == typeof e[0] ? new g(this, i.Ri.compose.apply(i.Ri, e.map(i.Ri.key())).get) : new g(this, (function(t) {
                            return e[0].get(t)
                        })) : this
                    }, t
                }(s.X),
                f = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return u(t, e), t.prototype.set = function(e) {
                        this.modify((function() {
                            return e
                        }))
                    }, t.prototype.lens = function(e) {
                        for (var t = [], n = 1; n < arguments.length; n++)
                            t[n - 1] = arguments[n];
                        return new p(this, "function" == typeof e ? i.Ri.prop(e) : "string" == typeof e ? i.Ri.compose.apply(i.Ri, l([i.Ri.key(e)], t.map((function(e) {
                            return i.Ri.key(e)
                        })))) : e, o.f)
                    }, t
                }(d),
                h = function(e) {
                    function t(t) {
                        return e.call(this, t) || this
                    }
                    return u(t, e), t.prototype.get = function() {
                        return this.getValue()
                    }, t.prototype.modify = function(e) {
                        var t = this.getValue(),
                            n = e(t);
                        (0, o.f)(t, n) || this.next(n)
                    }, t.prototype.set = function(e) {
                        var t = this.getValue();
                        (0, o.f)(t, e) || this.next(e)
                    }, t
                }(f),
                p = function(e) {
                    function t(t, n, r) {
                        void 0 === r && (r = o.f);
                        var i = e.call(this, void 0) || this;
                        return i._source = t, i._lens = n, i._eq = r, i._subscription = null, i._refCount = 0, i
                    }
                    return u(t, e), t.prototype.get = function() {
                        return this._subscription ? this.getValue() : this._lens.get(this._source.get())
                    }, t.prototype.modify = function(e) {
                        var t = this;
                        this._source.modify((function(n) {
                            return t._lens.modify(e, n)
                        }))
                    }, t.prototype.set = function(e) {
                        var t = this;
                        this._source.modify((function(n) {
                            return t._lens.set(e, n)
                        }))
                    }, t.prototype._onSourceValue = function(e) {
                        var t = this.getValue(),
                            n = this._lens.get(e);
                        this._eq(t, n) || this.next(n)
                    }, t.prototype._subscribe = function(t) {
                        var n = this;
                        this._subscription || (this._subscription = this._source.subscribe((function(e) {
                            return n._onSourceValue(e)
                        }))),
                        this._refCount++;
                        var r = new a.w((function() {
                            --n._refCount <= 0 && n._subscription && (n._subscription.unsubscribe(), n._subscription = null)
                        }));
                        return r.add(e.prototype._subscribe.call(this, t)), r
                    }, t.prototype.unsubscribe = function() {
                        this._subscription && (this._subscription.unsubscribe(), this._subscription = null),
                        this._refCount = 0,
                        e.prototype.unsubscribe.call(this)
                    }, t
                }(f),
                g = function(e) {
                    function t(t, n, r) {
                        void 0 === r && (r = o.f);
                        var i = e.call(this, void 0) || this;
                        return i._source = t, i._getter = n, i._eq = r, i._subscription = null, i._refCount = 0, i
                    }
                    return u(t, e), t.prototype.get = function() {
                        return this._subscription ? this.getValue() : this._getter(this._source.get())
                    }, t.prototype._onSourceValue = function(e) {
                        var t = this.getValue(),
                            n = this._getter(e);
                        this._eq(t, n) || this.next(n)
                    }, t.prototype._subscribe = function(t) {
                        var n = this;
                        this._subscription || (this._subscription = this._source.subscribe((function(e) {
                            return n._onSourceValue(e)
                        }))),
                        this._refCount++;
                        var r = new a.w((function() {
                            --n._refCount <= 0 && n._subscription && (n._subscription.unsubscribe(), n._subscription = null)
                        }));
                        return r.add(e.prototype._subscribe.call(this, t)), r
                    }, t.prototype.unsubscribe = function() {
                        this._subscription && (this._subscription.unsubscribe(), this._subscription = null),
                        this._refCount = 0,
                        e.prototype.unsubscribe.call(this)
                    }, t
                }(d),
                m = function(e) {
                    function t(t, n, r) {
                        void 0 === r && (r = o.f);
                        var i = e.call(this, void 0) || this;
                        return i._sources = t, i._combineFn = n, i._eq = r, i._subscription = null, i._refCount = 0, i
                    }
                    return u(t, e), t.prototype.get = function() {
                        return this._subscription ? this.getValue() : this._combineFn(this._sources.map((function(e) {
                            return e.get()
                        })))
                    }, t.prototype._onSourceValues = function(e) {
                        var t = this.getValue(),
                            n = this._combineFn(e);
                        this._eq(t, n) || this.next(n)
                    }, t.prototype._subscribe = function(t) {
                        var n = this;
                        this._subscription || (this._subscription = (0, c.aj)(this._sources).subscribe((function(e) {
                            return n._onSourceValues(e)
                        }))),
                        this._refCount++;
                        var r = new a.w((function() {
                            --n._refCount <= 0 && n._subscription && (n._subscription.unsubscribe(), n._subscription = null)
                        }));
                        return r.add(e.prototype._subscribe.call(this, t)), r
                    }, t.prototype.unsubscribe = function() {
                        this._subscription && (this._subscription.unsubscribe(), this._subscription = null),
                        this._refCount = 0,
                        e.prototype.unsubscribe.call(this)
                    }, t
                }(d)
        },
        38983: (e, t, n) => {
            n.d(t, {
                h: () => r
            });
            var r,
                i = n(95300),
                o = n(44586),
                s = n(14601),
                a = n(2834),
                c = n(38194),
                u = n(85985),
                l = n(84837);
            !function(e) {
                e.create = function(e) {
                    return new l.cc(e)
                },
                e.log = function(e, t) {
                    var n = function(e, t, n) {
                            return console.log("%c" + e, "color: " + t + "; font-weight: bold", n)
                        },
                        r = e.get();
                    return e.subscribe((function(e) {
                        "function" == typeof t ? t(r, e) : (console.group("UPDATE " + (t ? "TYPE: " + t + " " : "") + "@ " + (new Date).toTimeString()), n("prev state", "#9E9E9E", r), n("next state", "#4CAF50", e), console.groupEnd()),
                        r = e
                    })), e
                },
                e.combine = function() {
                    for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                    return new l.cn(e.slice(void 0, -1), (function(t) {
                        return e[e.length - 1].apply(e, t)
                    }))
                },
                e.fromObservable = function(t) {
                    var n = new i.X(null),
                        r = t.pipe((0, a.b)((function(t) {
                            var r = n.value;
                            null === r ? n.next(e.create(t)) : r.set(t)
                        })), (0, c.B)());
                    return new o.y((function(e) {
                        var t = new s.w;
                        return t.add(n.pipe((0, u.h)((function(e) {
                            return !!e
                        }))).subscribe(e)), t.add(r.subscribe(void 0, (function(t) {
                            return e.error(t)
                        }), (function() {
                            return e.complete()
                        }))), t
                    }))
                }
            }(r || (r = {}))
        },
        87871: (e, t, n) => {
            function r(e) {
                for (var t, n = []; !(t = e.next()).done;)
                    n.push(t.value);
                return n
            }
            function i(e, t) {
                return Object.prototype.hasOwnProperty.call(t, e)
            }
            function o(e, t) {
                return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
            }
            n.d(t, {
                f: () => h
            });
            var s,
                a,
                c,
                u,
                l = function() {
                    var e = Object.prototype.toString;
                    return "[object Arguments]" === e.call(arguments) ? function(t) {
                        return "[object Arguments]" === e.call(t)
                    } : function(e) {
                        return i("callee", e)
                    }
                }(),
                d = (s = !{
                    toString: null
                }.propertyIsEnumerable("toString"), a = ["constructor", "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"], c = function() {
                    return arguments.propertyIsEnumerable("length")
                }(), u = function(e, t) {
                    for (var n = 0; n < e.length;) {
                        if (e[n] === t)
                            return !0;
                        n += 1
                    }
                    return !1
                }, "function" != typeof Object.keys || c ? function(e) {
                    if (Object(e) !== e)
                        return [];
                    var t,
                        n,
                        r = [],
                        o = c && l(e);
                    for (t in e)
                        !i(t, e) || o && "length" === t || (r[r.length] = t);
                    if (s)
                        for (n = a.length - 1; n >= 0;)
                            i(t = a[n], e) && !u(r, t) && (r[r.length] = t),
                            n -= 1;
                    return r
                } : function(e) {
                    return Object(e) !== e ? [] : Object.keys(e)
                });
            function f(e) {
                return null === e ? "Null" : void 0 === e ? "Undefined" : Object.prototype.toString.call(e).slice(8, -1)
            }
            function h(e, t, n, s) {
                if (void 0 === n && (n = []), void 0 === s && (s = []), o(e, t))
                    return !0;
                if (f(e) !== f(t))
                    return !1;
                if (null == e || null == t)
                    return !1;
                if ("function" == typeof e.equals || "function" == typeof t.equals)
                    return "function" == typeof e.equals && e.equals(t) && "function" == typeof t.equals && t.equals(e);
                switch (f(e)) {
                case "Arguments":
                case "Array":
                case "Object":
                    if ("function" == typeof e.constructor && "Promise" === (a = e.constructor, null == (c = String(a).match(/^function (\w*)/)) ? "" : c[1]))
                        return e === t;
                    break;
                case "Boolean":
                case "Number":
                case "String":
                    if (typeof e != typeof t || !o(e.valueOf(), t.valueOf()))
                        return !1;
                    break;
                case "Date":
                    if (!o(e.valueOf(), t.valueOf()))
                        return !1;
                    break;
                case "Error":
                    return e.name === t.name && e.message === t.message;
                case "RegExp":
                    if (e.source !== t.source || e.global !== t.global || e.ignoreCase !== t.ignoreCase || e.multiline !== t.multiline || e.sticky !== t.sticky || e.unicode !== t.unicode)
                        return !1;
                    break;
                case "Map":
                case "Set":
                    if (!h(r(e.entries()), r(t.entries()), n, s))
                        return !1;
                    break;
                case "Int8Array":
                case "Uint8Array":
                case "Uint8ClampedArray":
                case "Int16Array":
                case "Uint16Array":
                case "Int32Array":
                case "Uint32Array":
                case "Float32Array":
                case "Float64Array":
                case "ArrayBuffer":
                    break;
                default:
                    return !1
                }
                var a,
                    c,
                    u = d(e);
                if (u.length !== d(t).length)
                    return !1;
                for (var l = n.length - 1; l >= 0;) {
                    if (n[l] === e)
                        return s[l] === t;
                    l -= 1
                }
                for (n.push(e), s.push(t), l = u.length - 1; l >= 0;) {
                    var p = u[l];
                    if (!i(p, t) || !h(t[p], e[p], n, s))
                        return !1;
                    l -= 1
                }
                return n.pop(), s.pop(), !0
            }
        },
        26746: (e, t, n) => {
            function r(e, t) {
                return function(n, r) {
                    return t(n(e(r)), r)
                }
            }
            var i,
                o,
                s;
            n.d(t, {
                Ri: () => s,
                p1: () => o
            }),
            function(e) {
                e.optic = function(e, t) {
                    return {
                        get: e,
                        set: t,
                        modify: r(e, t)
                    }
                }
            }(i || (i = {})),
            function(e) {
                e.create = function e(t, n) {
                    return {
                        get: t,
                        set: n,
                        modify: r(t, n),
                        compose: function(r) {
                            return e((function(e) {
                                var n = t(e);
                                return void 0 !== n ? r.get(n) : void 0
                            }), (function(e, i) {
                                var o = t(i);
                                return void 0 !== o ? n(r.set(e, o), i) : i
                            }))
                        }
                    }
                }
            }(o || (o = {})),
            function(e) {
                function t(e, n) {
                    return {
                        get: e,
                        set: n,
                        modify: r(e, n),
                        compose: function(r) {
                            return t((function(t) {
                                return r.get(e(t))
                            }), (function(t, i) {
                                return n(r.set(t, e(i)), i)
                            }))
                        }
                    }
                }
                e.create = t,
                e.compose = function() {
                    for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                    if (0 === e.length)
                        throw new TypeError("Can not compose zero lenses. You probably want `Lens.identity`.");
                    if (1 === e.length)
                        return e[0];
                    var n = e[0];
                    return e.slice(1).forEach((function(e) {
                        n = n.compose(e)
                    })), n
                };
                var n = t((function(e) {
                    return e
                }), (function(e, t) {
                    return e
                }));
                e.identity = function() {
                    return n
                };
                var i = o.create((function(e) {}), (function(e, t) {
                    return t
                }));
                e.nothing = function() {
                    return i
                }
            }(s || (s = {}))
        },
        20817: (e, t, n) => {
            n.d(t, {
                Ri: () => r.Ri
            });
            var r = n(26746);
            n(20763)
        },
        20763: (e, t, n) => {
            var r = n(48540),
                i = n(87871),
                o = n(26746),
                s = new RegExp(["^", "function", "\\(", "[^), ]+", "\\)", "\\{", '("use strict";)?', "return\\s", "[^\\.]+\\.(\\S+?);?", "\\}", "$"].join("\\s*"));
            new RegExp(["^", "function", "\\(", "[^), ]+", "\\)", "\\{", '("use strict";)?', "(\\$_\\$wf\\(\\d+\\);)?", "return\\s", "(\\$_\\$w\\(\\d+, \\d+\\),\\s)?", "[^\\.]+\\.(\\S+?);?", "\\}", "$"].join("\\s*"));
            function a(e) {
                return function(e) {
                    var t = s,
                        n = e.match(t);
                    if (n && n[2])
                        return n[2].split(".");
                    throw new TypeError('Expected a property expression, got "' + e + '".\n\n      A property expression should be a referentially transparent (no side-effects),\n      single-expression "getter" function.\n\n      Correct example: "function (x) { return x.some }" or "x => x.some".\n      Incorrect example: "function (x) { var y = x.some; return y }" or "({some}) => some"')
                }(e.toString())
            }
            function c(e) {
                return void 0 === e ? function(e) {
                    return o.Ri.create((function(t) {
                        return t[e]
                    }), (function(t, n) {
                        return (0, r.Dt)(e, t, n)
                    }))
                } : o.Ri.create((function(t) {
                    return t[e]
                }), (function(t, n) {
                    return (0, r.Dt)(e, t, n)
                }))
            }
            var u = 0;
            o.Ri.key = c,
            o.Ri.prop = function(e) {
                var t = a(e);
                return r.z3 && function(e) {
                    if (u < 10) {
                        u++;
                        var t = "x." + e.join("."),
                            n = "'" + e.join("', '") + "'";
                        (0, r.Kp)("The property expression overload of Atom.lens and Lens.prop are deprecated and will be removed in next versions of Focal. Please use the key name overload for Atom.lens and Lens.key instead. You can convert your code by changing the calls:\n  a.lens(x => " + t + ") to a.lens(" + n + "),\n  Lens.prop((x: T) => " + t + ") to Lens.key<T>()(" + n + ").")
                    }
                }(t), o.Ri.compose.apply(o.Ri, t.map(c()))
            },
            o.Ri.index = function(e) {
                if (e < 0)
                    throw new TypeError(e + " is not a valid array index, expected >= 0");
                return o.p1.create((function(t) {
                    return t[e]
                }), (function(t, n) {
                    return n.length <= e ? n.concat(Array(e - n.length), [t]) : (0, i.f)(t, n[e]) ? n : n.slice(0, e).concat([t], n.slice(e + 1))
                }))
            },
            o.Ri.withDefault = function(e) {
                return o.Ri.replace(void 0, e)
            },
            o.Ri.replace = function(e, t) {
                return o.Ri.create((function(n) {
                    return (0, i.f)(n, e) ? t : n
                }), (0, r.t_)((function(n) {
                    return (0, i.f)(n, t) ? e : n
                })))
            },
            o.Ri.find = function(e) {
                return t = function(t) {
                    var n = (0, r.cx)(t, e);
                    return n < 0 ? o.Ri.nothing() : o.Ri.index(n)
                }, o.Ri.create((function(e) {
                    return t(e).get(e)
                }), (function(e, n) {
                    return t(n).set(e, n)
                }));
                var t
            }
        },
        48540: (e, t, n) => {
            n.d(t, {
                Dt: () => o,
                Kp: () => c,
                _o: () => u,
                cx: () => a,
                t_: () => s,
                z3: () => i
            });
            var r = n(87871),
                i = void 0 !== n(27061) && !1;
            function o(e, t, n) {
                if (e in n && (0, r.f)(t, n[e]))
                    return n;
                var i = {};
                for (var o in n)
                    i[o] = n[o];
                return i[e] = t, i
            }
            function s(e) {
                return function(t, n) {
                    return function(e, t) {
                        return (0, r.f)(e, t) ? t : e
                    }(e(t, n), n)
                }
            }
            function a(e, t) {
                for (var n = 0; n < e.length; n++)
                    if (t(e[n]))
                        return n;
                return -1
            }
            function c(e) {
                "undefined" != typeof console && "function" == typeof console.error && console.error("[Focal]: " + e);
                try {
                    throw new Error(e)
                } catch (e) {}
            }
            function u(e) {
                return "string" == typeof e ? e : void 0 !== e.displayName ? e.displayName : void 0 !== e.name ? e.name : e.constructor && void 0 !== e.constructor.name ? e.constructor.name : void 0
            }
        },
        9172: (e, t, n) => {
            n.d(t, {
                FU: () => g,
                OY: () => R,
                PM: () => h,
                Td: () => p,
                UI: () => b,
                XG: () => S,
                ab: () => _,
                eC: () => d,
                ex: () => x,
                fo: () => y,
                gO: () => c,
                r4: () => v,
                xq: () => f
            });
            var r = n(57050),
                i = n(7992),
                o = n(48015),
                s = n(5114),
                a = n(55415);
            function c(e, t) {
                var n,
                    r,
                    i;
                const o = null === (i = null === (r = null === (n = null == t ? void 0 : t.citationBuilder) || void 0 === n ? void 0 : n.domains) || void 0 === r ? void 0 : r[e]) || void 0 === i ? void 0 : i.disabled;
                return void 0 !== o ? !o : void 0
            }
            function u(e, t) {
                return _(t).some((t => new RegExp(t.domain).test(e)))
            }
            function l(e) {
                var t,
                    n;
                return !(null !== (n = null === (t = e.citationBuilder) || void 0 === t ? void 0 : t.disabled) && void 0 !== n && n)
            }
            function d(e, t) {
                return _(t).some((t => {
                    const n = new RegExp(t.domain),
                        r = new RegExp(t.pathname);
                    return n.test(e.hostname) && r.test(e.pathname)
                }))
            }
            function f(e) {
                return s.tryCatch((() => {
                    const t = new URL(e).hostname.split(".");
                    return t.slice(t.length - 2).join(".")
                }))
            }
            function h(e, t, n) {
                const r = c(e, n);
                return l(t) && (void 0 === r && u(e, t) || !0 === r)
            }
            function p(e, t, n, r) {
                return n ? h(e, t, r) : function(e, t, n) {
                    return l(t) && u(e, t) && !1 !== c(e, n)
                }(e, t, r)
            }
            function g(e, t) {
                return _(t).some((t => new RegExp(t.domain).test(e) && !0 === t.reparse))
            }
            const m = {
                verticalLocation: "bottom",
                horizontalLocation: "left",
                offsetX: 17,
                offsetY: 32
            };
            function b(e, t) {
                var n;
                return (null === (n = _(t).find((t => new RegExp(t.domain).test(e)))) || void 0 === n ? void 0 : n.buttonPosition) || m
            }
            function v(e, t, n) {
                return l(t) && (n ? !function(e, t) {
                        var n,
                            r;
                        return (null !== (r = null === (n = t.citationBuilder) || void 0 === n ? void 0 : n.blockedDomains) && void 0 !== r ? r : []).includes(e)
                    }(e, t) : u(e, t))
            }
            function y(e, t) {
                var n,
                    r,
                    i;
                const o = new Set(null !== (r = null === (n = e.citationBuilder) || void 0 === n ? void 0 : n.blockedDomains) && void 0 !== r ? r : []);
                return Object.entries((null === (i = t.citationBuilder) || void 0 === i ? void 0 : i.domains) || {}).filter((([, e]) => void 0 !== e && !e.disabled)).filter((([e]) => {
                    return t = e, !o.has(t);
                    var t
                })).map((([e]) => e))
            }
            function _(e) {
                var t,
                    n;
                return null !== (n = null === (t = e.citationBuilder) || void 0 === t ? void 0 : t.sources) && void 0 !== n ? n : []
            }
            const w = (0, o.hz)((() => {
                    const e = document.location.href;
                    return (0, i.KK)(e)
                })),
                x = (0, o.hz)((e => {
                    const t = document.location.href;
                    return {
                        url: t,
                        domain: (0, i.KK)(t),
                        isUrlAllowlisted: d(document.location, e)
                    }
                })),
                E = (0, o.hz)((() => o.iy.create()));
            function S(e) {
                const t = E(),
                    n = w();
                return (0, r.zG)(e, a.H6("citeCopyButtonClick", "citeCopyIntextClick", "citePopupButtonDisable", "citePopupButtonShow", "citePopupEditClick", "citePopupButtonClick", "citePopupEditSuccess", "citePopupMissingInfoShow", "citePopupMissingInfoFormShow", "feedbackSentButtonClick", "citePopupAddMissingClick"), (e => Object.assign(Object.assign({}, e), {
                    domain: n,
                    sessionId: t
                })))
            }
            function R(e, t) {
                return e.manualInvocation && !0 === c(t.domain, t)
            }
        },
        67656: (e, t, n) => {
            n.d(t, {
                CN: () => a,
                IG: () => c,
                NX: () => l,
                Sx: () => s,
                Yf: () => d,
                _e: () => u
            });
            var r = n(43124),
                i = n(47965),
                o = n(90883);
            function s(e) {
                o.Sx((t => {
                    if (t.name !== (0, i.$)())
                        return;
                    let n = t.message;
                    null != n.json && (n = JSON.parse(n.json)),
                    "message" === n.method && e({
                        event: n.event,
                        data: n.data
                    })
                }))
            }
            function a(e, t) {
                if (!self.safari || !self.safari.extension)
                    return;
                const n = document.URL,
                    s = {
                        page: {
                            id: o.Hr,
                            url: n,
                            isTop: self === self.top
                        },
                        url: n
                    },
                    a = JSON.stringify({
                        name: (0, i.$)(),
                        target: s,
                        message: {
                            callid: (0, r.M8)(),
                            method: "message",
                            params: {
                                event: e,
                                data: t
                            }
                        }
                    });
                o.dw("passToBgPage", {
                    json: a
                })
            }
            function c() {
                o.dw("beginOAuth", null)
            }
            function u(e) {
                o.dw("oauthExchange", {
                    redirectUrl: e
                })
            }
            function l(e) {
                o.dw("openSubscriptionDialog", {
                    placement: e
                })
            }
            function d() {
                o.dw("redirectClaimedUser", null)
            }
        },
        90883: (e, t, n) => {
            n.d(t, {
                Hr: () => r,
                Sx: () => a,
                dw: () => c
            });
            const r = (0, n(43124).M8)();
            const i = "exposedApi.",
                o = new class {
                    reportActive()
                    {
                        self === self.top && c("activePage", {
                            url: document.URL
                        })
                    }
                    reportTab(e)
                    {
                        c("reportTab", {
                            callId: e
                        })
                    }
                    reportNewFrame()
                    {
                        c("reportFrame", {})
                    }
                    reportFrame(e)
                    {
                        c("reportFrame", {
                            tabId: e
                        })
                    }
                    oauthError(e)
                    {
                        c(confirm("Oops! Looks like this login attempt failed.\nClick OK to try again.") ? "beginOAuth" : "closeLoginTab", null)
                    }
                }
                ;
            let s;
            function a(e) {
                if (null != s)
                    throw new Error("Duplicate registerAppMessageHandler() call");
                s = e
            }
            function c(e, t) {
                self.safari.extension.dispatchMessage(e, {
                    meta: {
                        srcPageId: r
                    },
                    data: t
                })
            }
            self.safari && self.safari.self && (self === self.top ? o.reportTab() : o.reportNewFrame(), self.safari.self.addEventListener("message", (e => {
                const t = e.name;
                if (t.startsWith(i)) {
                    const n = t.substring(i.length);
                    switch (n) {
                    case "reportActive":
                        o.reportActive();
                        break;
                    case "reportTab":
                        self === self.top && o.reportTab(e.message.callId);
                        break;
                    case "reportFrame":
                        o.reportFrame(e.message.tabId);
                        break;
                    case "oauthError":
                        o.oauthError(e.data && e.data.error || void 0);
                        break;
                    default:
                        throw new Error(`Unknown exposedApi method ${n}`)
                    }
                } else
                    null != s && s(e)
            })))
        },
        47965: (e, t, n) => {
            n.d(t, {
                $: () => o
            });
            var r = n(56913);
            let i;
            function o() {
                return i || (i = "forge-bridge" + (0, r.pB)()), i
            }
        },
        35349: (e, t, n) => {
            n.d(t, {
                ix: () => s,
                vG: () => o
            });
            const r = "grExtInstalled",
                i = "grExtDisabled";
            function o() {
                document.body.dataset[r] = ""
            }
            function s(e) {
                var t;
                null === e && "next" === (null === (t = null === document || void 0 === document ? void 0 : document.body) || void 0 === t ? void 0 : t.dataset[i]) || (null === e ? function() {
                    var e;
                    (null === (e = null === document || void 0 === document ? void 0 : document.body) || void 0 === e ? void 0 : e.dataset) && delete document.body.dataset[i]
                }() : document.body.dataset[i] = e)
            }
        },
        27148: (e, t, n) => {
            n.d(t, {
                B: () => p
            });
            var r = n(14601),
                i = n(85441),
                o = n(49708),
                s = n(85985),
                a = n(19374),
                c = n(5957),
                u = n(98805),
                l = n(55649),
                d = n(95626),
                f = n(82989);
            var h;
            !function(e) {
                const t = l.Y.create("Reports");
                function n(e) {
                    var t;
                    const n = null === (t = self.document) || void 0 === t ? void 0 : t.createElement("a");
                    n.href = "data:application/octet-stream," + encodeURIComponent(function(e) {
                        const t = e => {
                            try {
                                return JSON.stringify(e)
                            } catch (t) {
                                return String(e)
                            }
                        };
                        return [["Level", "Logger", "Timestamp", "Message"].join("\t"), ...e.map((e => {
                            const n = [e.level, e.loggerName, new Date(e.timestamp).toISOString(), e.message];
                            return e.data && n.push(t(e.data)), e.exception && n.push(t(e.exception)), n.join("\t")
                        }))].join("\n")
                    }(e)),
                    n.target = "_blank",
                    n.download = "grammarly-logs.tsv",
                    n.click()
                }
                async function r(e) {
                    if (t.debug("start download debug reports"), !(0, a.E)().historyLogsService.isHistoryEnabled())
                        return t.debug("debug reports feature is not enabled"), alert("Logging is not enabled");
                    if (!self.confirm(d.o1))
                        return;
                    t.debug("confirm download debug reports");
                    const r = [];
                    e.sort((e => e.envName === (0, a.E)().context ? 1 : -1));
                    try {
                        await (0, c.Fb)(u.E0, i())
                    } catch (e) {
                        t.warn("cannot get latest app state", e)
                    }
                    for (const t of e) {
                        const e = await t.getLogs();
                        r.push(...null != e ? e : [])
                    }
                    r.sort(((e, t) => e.timestamp - t.timestamp)),
                    n(r)
                }
                async function i() {
                    t.info("latest experiments state", await (0, a.E)().bgRpc.api.getExperimentTreatment()),
                    t.info("latest storage state", await (0, a.E)().browserApi.preferences.getAll()),
                    t.info("browser info", (() => {
                        const e = navigator.userAgent,
                            t = new f.UAParser(e).getResult();
                        return {
                            browserName: t.browser.name,
                            browserVersion: t.browser.version ? (n = t.browser.version, n.split(".")[0]) : void 0,
                            osName: t.os.name,
                            userAgent: e
                        };
                        var n
                    })())
                }
                e.download = r,
                e.initKeyboradShortcutHandler = function(e) {
                    return (0, o.R)(self, "keydown").pipe((0, s.h)((e => "KeyS" === e.code && e.altKey && e.shiftKey && (e.ctrlKey || e.metaKey)))).subscribe((() => {
                        r(e)
                    }))
                },
                e.logLatestState = i
            }(h || (h = {}));
            var p,
                g = n(56913),
                m = n(12764),
                b = n(53649),
                v = n(35875);
            !function(e) {
                function t(e) {
                    const t = () => {
                        e.bgRpc.api.sendToPopup({
                            kind: m.I.Kind.sendCsLogs,
                            option: {
                                logs: e.historyLogsService.getLogs(),
                                isIframeIntegration: (0, g.n_)()
                            }
                        })
                    };
                    return e.message.on(m.B.Kind.sendCsLogsToPopup, t), {
                        dispose() {
                            e.message.off(m.B.Kind.sendCsLogsToPopup, t)
                        }
                    }
                }
                function n(e) {
                    return [new b.r("bg", (() => e.bgRpc.api.getBGLogs()), b.r.getLogsFromSessionStorageFallbackGetter(v.v.bgHistoryLogs)), new b.r("cs", (() => Promise.resolve(e.historyLogsService.getLogs())), b.r.getLogsFromSessionStorageFallbackGetter(v.v.csHistoryLogs))]
                }
                function o(e) {
                    return e.message.on(m.B.Kind.donloadDebugReportsFromCS, a), {
                        dispose() {
                            e.message.off(m.B.Kind.sendCsLogsToPopup, a)
                        }
                    }
                }
                function s(e) {
                    const t = (0, g.n_)() ? new r.w : h.initKeyboradShortcutHandler(n(e));
                    return {
                        dispose() {
                            t.unsubscribe()
                        }
                    }
                }
                function a() {
                    const e = n((0, i.OB)());
                    h.download(e)
                }
                e.initSendLogsToPopupHandler = t,
                e.initDownloadDebugReportsListener = o,
                e.initKeyboradShortcutHandler = s,
                e.initListeners = function(e) {
                    const n = [t(e), s(e), o(e)];
                    return {
                        dispose() {
                            n.forEach((e => {
                                e.dispose()
                            }))
                        }
                    }
                },
                e.download = a
            }(p || (p = {}))
        },
        85441: (e, t, n) => {
            n.d(t, {
                OB: () => g,
                Xb: () => p,
                nD: () => m
            });
            var r = n(257),
                i = n(9460),
                o = n(45903),
                s = n(31639),
                a = n(19374),
                c = n(47612),
                u = n(27733),
                l = n(37328),
                d = n(71402),
                f = n(35875),
                h = n(56913);
            class p extends a.O {
                static get isInited()
                {
                    return void 0 !== this._instance
                }
                static getInstance()
                {
                    if (void 0 === this._instance)
                        throw new Error("cs Env not inited yet");
                    return this._instance
                }
                static init(e)
                {
                    if (void 0 !== this._instance)
                        throw new Error("cs Env already inited");
                    const t = new p(e);
                    return this._instance = t, a.O.initShared(t), t.browserApi.message.start && t.browserApi.message.start(), t
                }
                constructor(e)
                {
                    super({
                        browser: e.browser,
                        extensionType: e.extensionType,
                        deploymentType: e.deploymentType,
                        context: "cs",
                        historyLoggerExtraArgs: {
                            enableHistoryLoggerUntil: e => {
                                var t;
                                null === (t = this.bgRpc) || void 0 === t || t.api.enableHistoryLoggerUntil(e)
                            },
                            disableHistoryLogger: () => {
                                var e;
                                null === (e = this.bgRpc) || void 0 === e || e.api.disableHistoryLogger()
                            },
                            backupStorage: new l.f(e.browserApi.sessionStorage, f.v.csHistoryLogs, (async () => {
                                var t,
                                    n;
                                return e.skipWriteLogsToBackupStorage || document.hidden || (0, h.n_)() || !await (null === (t = this.bgRpc) || void 0 === t ? void 0 : t.api.isGateEnabled("SessionStorageLogsBackup")) || !await (null === (n = this.bgRpc) || void 0 === n ? void 0 : n.api.isCurrentTabFocused())
                            }))
                        }
                    }),
                    this.browserApi = e.browserApi,
                    this.message = new u.w(e.browserApi.message),
                    e.skipInitExtensionApi || (0, c.cg)(e.browserApi),
                    this.bgRpc = new i.c(this.message),
                    this.csShareStorage = new r.X,
                    this.capiBgRpc = new o.R(this.message),
                    this.staticCapiBgRpc = new s.s(this.message),
                    this.telemetryCallProvider = (0, d._)(this.bgRpc)
                }
            }
            function g() {
                return p.getInstance()
            }
            function m(e=g()) {
                return e.config.systemInfo.os.isMac
            }
        },
        257: (e, t, n) => {
            n.d(t, {
                X: () => r
            });
            class r {
                constructor()
                {
                    this._storage = this._storage || {}
                }
                get _storage()
                {
                    return self.__CS_SHARE_STORAGE__
                }
                set _storage(e)
                {
                    self.__CS_SHARE_STORAGE__ = e
                }
                clean()
                {
                    this._storage = {}
                }
                set(e, t)
                {
                    this._storage[e] = t
                }
                get(e)
                {
                    return this._storage[e]
                }
                getOnce(e)
                {
                    const t = this._storage[e];
                    return this.remove(e), t
                }
                remove(e)
                {
                    delete this._storage[e]
                }
            }
        },
        5397: (e, t, n) => {
            n.d(t, {
                BJ: () => s,
                Eq: () => u,
                U_: () => l,
                gk: () => d,
                lH: () => i,
                oJ: () => o,
                op: () => r,
                wJ: () => c,
                xA: () => a
            });
            const r = 2147483647,
                i = r - 1,
                o = r - 2,
                s = r - 3,
                a = r - 4,
                c = r - 5,
                u = r - 6,
                l = c,
                d = 1350
        },
        61882: (e, t, n) => {
            var r;
            n.d(t, {
                T: () => r
            }),
            function(e) {
                function t(e, t) {
                    try {
                        for (const n of Object.keys(t))
                            if (t[n] && t[n](e))
                                return n;
                        return null
                    } catch (e) {
                        return null
                    }
                }
                e.isSpecific = {
                    draftJs: e => !(!e.hasAttribute("contenteditable") || !e.querySelector('[data-contents="true"] > [data-editor], [data-block]')),
                    quill: e => e.classList.contains("ql-editor") || e.classList.contains("ql-container"),
                    redactor: e => e.className.indexOf("redactor") > -1,
                    prosemirror: e => e.hasAttribute("pm-container") || e.classList.contains("ProseMirror"),
                    scribe: e => e.className.indexOf("scribe") > -1,
                    trix: e => e.className.indexOf("trix") > -1,
                    "medium-editor": e => e.className.indexOf("medium-editor") > -1,
                    tinymce: e => {
                        if ("IFRAME" !== e.tagName)
                            return !1;
                        const t = e;
                        return t.id.indexOf("mce") > -1 || !!(t.contentDocument && t.contentDocument.querySelectorAll("#tinymce, .mce-content-body").length > 0)
                    },
                    ckeditor4: e => e.matches("iframe.cke_wysiwyg_frame") || e.classList.contains("cke_editable"),
                    ckeditor5: e => e.classList.contains("ck-editor__editable"),
                    slate: e => "true" === e.getAttribute("data-slate-editor"),
                    mobiledoc: e => e.classList.contains("__mobiledoc-editor")
                },
                e.isGeneric = {
                    contenteditable: e => {
                        const t = e.attributes.getNamedItem("contenteditable");
                        return !(!function(e) {
                            return !(e instanceof HTMLSelectElement)
                        }(e) || !t || "true" !== t.value && "" !== t.value && "plaintext-only" !== t.value)
                    },
                    textarea: e => "TEXTAREA" === e.tagName,
                    iframe: t => {
                        if ("IFRAME" === t.tagName) {
                            const n = t;
                            return !!(n.contentDocument && n.contentDocument.body && e.isGeneric.contenteditable(n.contentDocument.body))
                        }
                        return !1
                    },
                    iframeHost: t => {
                        if ("IFRAME" === t.tagName) {
                            const n = t;
                            return !(n.contentDocument && n.contentDocument.body && e.isGeneric.contenteditable(n.contentDocument.body))
                        }
                        return !1
                    }
                },
                e.get = function(n) {
                    return {
                        generic: t(n, e.isGeneric),
                        specific: t(n, e.isSpecific)
                    }
                }
            }(r || (r = {}))
        },
        65546: (e, t, n) => {
            n.d(t, {
                S: () => r
            });
            var r,
                i = n(49708),
                o = n(79692),
                s = n(12126),
                a = n(77843),
                c = n(40151),
                u = n(18625),
                l = n(76974),
                d = n(24209),
                f = n(95399),
                h = n(8175),
                p = n(85321),
                g = n(77176),
                m = n(28043),
                b = n(80544),
                v = n(85985),
                y = n(71032),
                _ = n(23063),
                w = n(93508),
                x = n(98805),
                E = n(55649),
                S = n(48015),
                R = n(57050);
            !function(e) {
                const t = E.Y.create("universal.cs.integration.observables"),
                    n = e => (0, i.R)(e, "focus", {
                        capture: !0
                    });
                function r(e) {
                    return e instanceof Element && e.shadowRoot && e.shadowRoot.activeElement ? r(e.shadowRoot.activeElement) : e
                }
                function O(e, t) {
                    return {
                        document: e,
                        frame: t
                    }
                }
                function k(e, n) {
                    const r = O(e),
                        i = (0, s.D)(e.getElementsByTagName("iframe")),
                        o = n.pipe((0, y.b)((e => Array.from(e.addedNodes))), (0, v.h)((e => "IFRAME" === e.nodeName)));
                    return (0, f.z)(i, o).pipe((0, v.h)((n => function(e, n) {
                        try {
                            const t = e.src;
                            if (t && "about:blank" !== t && !t.startsWith("javascript")) {
                                return new URL(t, n.baseURI).origin === n.location.origin
                            }
                            return !0
                        } catch (e) {
                            return t.warn("Error converting iframe's src to url", e), !0
                        }
                    }(n, e))), (0, p.zg)((e => {
                        try {
                            return function(e) {
                                const t = e.contentDocument;
                                return t && "complete" === t.readyState
                            }(e) ? (0, l.of)(e) : (0, h.R)((t => e.addEventListener("load", t, !0)), (t => e.removeEventListener("load", t))).pipe((0, g.U)((() => e)), (0, _.q)(1))
                        } catch (e) {
                            return t.warn("failed to receive iframes document", e), (0, l.of)(null)
                        }
                    })), (0, g.U)((e => {
                        try {
                            if (null !== e && null !== e.contentDocument)
                                return O(e.contentDocument, e)
                        } catch (e) {
                            t.warn("failed to receive iframes document", e)
                        }
                        return null
                    })), (0, v.h)((e => null !== e))).pipe((0, w.O)(r))
                }
                e.createFocusObservable = function(e, t, i=n) {
                    return k(e, t).pipe((0, p.zg)((e => function(e, t, n) {
                        const i = e.document,
                            o = (0, a.F)(x.E0),
                            s = e.frame ? c.E : (0, u.P)((() => (0, l.of)(i.activeElement).pipe((0, v.h)((e => e && i.defaultView && i.defaultView.HTMLElement && e instanceof i.defaultView.HTMLElement))))),
                            h = t(i).pipe((0, g.U)((e => e.target))),
                            p = e.frame ? c.E : (0, d.T)(o, n).pipe((0, v.h)((e => !!i.defaultView && "visible" === i.visibilityState && !!i.activeElement)), (0, g.U)((e => i.activeElement)), (0, m.x)()),
                            b = (0, d.T)(p, h).pipe((0, v.h)((e => i.defaultView && i.defaultView.HTMLElement && e instanceof i.defaultView.HTMLElement)), (0, g.U)((e => r(e))));
                        return (0, f.z)(s, b).pipe((0, m.x)())
                    }(e, i, t).pipe((0, g.U)((t => ({
                        element: t,
                        owner: e
                    })))))), (0, m.x)(), (0, b.QV)(o.E))
                },
                e.createReadonlyObservable = function(e, t, n) {
                    return k(e, t).pipe((0, p.zg)((e => function(e, t, n) {
                        const r = (e, t) => e.length === t.length && e.every(((e, n) => e === t[n]));
                        return t.pipe((0, g.U)((() => (0, R.zG)(n, e.querySelectorAll.bind(e), Array.from))), (0, m.x)(r), (0, g.U)((e => (0, R.zG)(e, Array.from, s.D))), (0, p.zg)((e => e)), (0, v.h)(S.Nf))
                    }(e.document, t, n).pipe((0, g.U)((t => ({
                        element: t,
                        owner: e
                    })))))), (0, m.x)(), (0, b.QV)(o.E))
                },
                e.docInfo = O
            }(r || (r = {}))
        },
        82050: (e, t, n) => {
            var r;
            n.d(t, {
                Z: () => r
            }),
            function(e) {
                const t = "grammarly-desktop-integration";
                e.inject = function(e=document.documentElement) {
                    var n,
                        r;
                    const i = `\n      div.${t} {\n        position: absolute;\n        width: 1px;\n        height: 1px;\n        padding: 0;\n        margin: -1px;\n        overflow: hidden;\n        clip: rect(0, 0, 0, 0);\n        white-space: nowrap;\n        border: 0;\n        -moz-user-select: none;\n        -webkit-user-select: none;\n        -ms-user-select:none;\n        user-select:none;\n      }\n\n      div.${t}:before {\n        content: attr(data-content);\n      }\n    `,
                        o = document.createElement("style");
                    o.textContent = i;
                    const s = document.createElement("div");
                    s.setAttribute("aria-label", "grammarly-integration"),
                    s.setAttribute("role", "group"),
                    s.setAttribute("tabindex", "-1"),
                    s.setAttribute("class", t);
                    const a = document.createElement(t);
                    return a.attachShadow({
                        mode: "open"
                    }), a.setAttribute("data-grammarly-shadow-root", "true"), null === (n = a.shadowRoot) || void 0 === n || n.appendChild(o), null === (r = a.shadowRoot) || void 0 === r || r.appendChild(s), e.appendChild(a), {
                        activate: ({isActive: e, isUserDisabled: t, mode: n}) => {
                            null == s || s.setAttribute("data-content", JSON.stringify(n ? {
                                mode: n,
                                isActive: e,
                                isUserDisabled: t
                            } : {
                                isActive: e
                            }))
                        },
                        remove: () => {
                            var e;
                            null === (e = null == a ? void 0 : a.parentNode) || void 0 === e || e.removeChild(a)
                        }
                    }
                },
                e.isInjected = function() {
                    return !!document.querySelector(t)
                }
            }(r || (r = {}))
        },
        15222: (e, t, n) => {
            n.d(t, {
                x: () => l
            });
            var r = n(38983),
                i = n(85985),
                o = n(82828),
                s = n(82050),
                a = n(20641),
                c = n(55649),
                u = n(77259);
            class l {
                constructor(e=c.Y.create("DesktopHiddenFieldIntegration"), t=a.Tb)
                {
                    this._log = e,
                    this._getFelog = t,
                    this._integration = null,
                    this._root = document.documentElement,
                    this._state = r.h.create(null),
                    this.getActiveElement = () => {
                        const e = document.activeElement,
                            t = null == e ? void 0 : e.shadowRoot,
                            n = null == e ? void 0 : e.contentDocument;
                        return t && t.activeElement ? t.activeElement : n && n.activeElement ? n.activeElement : e
                    },
                    this.updateState = (e, t, n, r) => {
                        var i;
                        const s = !o.q.isIntegrationEnabled(r, e, t),
                            a = o.q.isEnabled(t, r) ? u.M.limited : u.M.full,
                            c = !n;
                        this._state.set({
                            isActive: s,
                            mode: a,
                            isUserDisabled: c
                        }),
                        c ? this.dispose() : null === (i = this.integration) || void 0 === i || i.activate({
                            isActive: s,
                            mode: a,
                            isUserDisabled: c
                        })
                    },
                    this.updateForFocusedIntegration = () => {
                        const e = this.getActiveElement(),
                            t = null == e ? void 0 : e.closest("[role=dialog][aria-modal=true]"),
                            n = null != t ? t : document.documentElement;
                        return n !== this._root && (this._root = n, this.dispose()), this.integration
                    },
                    this.dispose = () => {
                        this._integration && (this._integration.remove(), this._integration = null)
                    },
                    this._state.pipe((0, i.h)(Boolean)).subscribe((e => {
                        this._log.debug("update DesktopHiddenField state", e)
                    }))
                }
                get integration()
                {
                    if (this._integration)
                        return this._integration;
                    if (s.Z.isInjected())
                        return this._log.debug("DesktopHiddenField is already injected"), null;
                    try {
                        this._integration = s.Z.inject(this._root)
                    } catch (e) {
                        return this._log.debug("DesktopHiddenField is not injected", e), this._getFelog().hiddenFieldInjectionFailed(), null
                    }
                    return this._log.debug("DesktopHiddenField is injected into " + (this._root === document.documentElement ? "root" : "dialog")), this._integration
                }
            }
        },
        82828: (e, t, n) => {
            n.d(t, {
                q: () => r
            });
            var r,
                i = n(7992);
            !function(e) {
                function t(e, t) {
                    if (!e || !t)
                        return !0;
                    return !t.includes(e)
                }
                function n(e, t) {
                    var n;
                    return Boolean((null == t ? void 0 : t.isDesktopIntegrationEnabled) && (null === (n = e.llamaIntegration) || void 0 === n ? void 0 : n.enabled))
                }
                function r(e, n, r, o) {
                    var s,
                        a;
                    const c = o ? (0, i.KK)(o) : void 0,
                        u = n.isLlamaInstalled && (null === (s = r.llamaIntegration) || void 0 === s ? void 0 : s.enabled);
                    return t(c, null === (a = r.llamaIntegration) || void 0 === a ? void 0 : a.disabledByDomain) && (u || "true" === e.showDesktopIntegrationExtensionToggle)
                }
                e.isEnabled = n,
                e.showSettingPopupToggle = r,
                e.showGrayGButton = function(e, t, i, o) {
                    return r(t, e, i, o) && n(i, e)
                },
                e.isIntegrationEnabled = function(e, r, i) {
                    var o;
                    return !(!e || !i) && (t(r, null === (o = i.llamaIntegration) || void 0 === o ? void 0 : o.disabledByDomain) && n(i, e))
                }
            }(r || (r = {}))
        },
        77259: (e, t, n) => {
            var r;
            n.d(t, {
                M: () => r
            }),
            function(e) {
                e.full = "full",
                e.limited = "limited"
            }(r || (r = {}))
        },
        45903: (e, t, n) => {
            n.d(t, {
                R: () => s
            });
            var r = n(51998),
                i = n(20625),
                o = n(62497);
            class s extends i.H {
                constructor(e)
                {
                    super(new o.rr(r.I.rpcLegacyMessageName, e), new o.rr(r.I.rpcLegacyObservableName, e))
                }
            }
        },
        9460: (e, t, n) => {
            n.d(t, {
                c: () => s
            });
            var r = n(41824),
                i = n(99966),
                o = n(62497);
            class s extends i.X {
                constructor(e)
                {
                    super(new o.rr(r.x, e))
                }
            }
        },
        31639: (e, t, n) => {
            n.d(t, {
                s: () => s
            });
            var r = n(25238),
                i = n(20625),
                o = n(62497);
            class s extends i.H {
                constructor(e)
                {
                    super(new o.rr(r.U.rpcLegacyMessageName, e), new o.rr(r.U.rpcLegacyObservableName, e))
                }
            }
        },
        62497: (e, t, n) => {
            n.d(t, {
                Lc: () => f,
                OB: () => p,
                lM: () => h,
                rr: () => c,
                vQ: () => g
            });
            var r = n(44586),
                i = n(85985),
                o = n(77176),
                s = n(48015),
                a = n(64373);
            class c {
                constructor(e, t, n=s.iy.create(), i=e)
                {
                    this._rpcMessageName = e,
                    this._message = t,
                    this._clientId = n,
                    this._inboundMessageName = i,
                    this.inbound = new r.y((e => {
                        const t = t => {
                            t.clientId === this._clientId && e.next(t.data)
                        };
                        return this._message.on(this._inboundMessageName, t), () => this._message.off(this._inboundMessageName, t)
                    })),
                    this.outbound = e => {
                        this._message.sendBackground(this._rpcMessageName, {
                            clientId: this._clientId,
                            data: e
                        })
                    }
                }
            }
            function u(e, t=s.iy.create()) {
                return {
                    inbound: (0, a.s8)(e.inbound).pipe((0, i.h)((e => e.clientId === t)), (0, o.U)((e => e.data))),
                    outbound(n) {
                        e.outbound({
                            clientId: t,
                            data: n
                        })
                    }
                }
            }
            function l(e, t) {
                return {
                    inbound: e.inbound,
                    outbound(n) {
                        e.outbound({
                            connectionId: t,
                            data: n
                        })
                    }
                }
            }
            function d(e, t, n) {
                return {
                    inbound: new r.y((n => {
                        function r(e) {
                            n.next(e)
                        }
                        return e.on(t, r), () => e.off(t, r)
                    })),
                    outbound(t) {
                        e.sendBackground(n, t)
                    }
                }
            }
            function f(e, t, n=t + "-response") {
                return d(e, t, n)
            }
            function h(e, t, n, r=t + "-response") {
                return l(d(e, t + "-" + n, r), n)
            }
            function p(e, t, n=t + "-response") {
                return u(d(e, n, t))
            }
            function g(e, t, n, r=t + "-response") {
                return u(l(d(e, r + "-" + n, t), n))
            }
        },
        36054: (e, t, n) => {
            n.d(t, {
                x: () => r
            });
            var r,
                i = n(79692),
                o = n(44586),
                s = n(38194),
                a = n(80544),
                c = n(71032),
                u = n(77176);
            !function(e) {
                function t(e, t) {
                    return n(e, t).pipe((0, s.B)(), (0, a.QV)(i.E))
                }
                function n(e, t) {
                    return new o.y((n => {
                        const r = new MutationObserver((e => n.next(e)));
                        return r.observe(e, t), () => r.disconnect()
                    }))
                }
                e.create = t,
                e.createUnsafe = n,
                e.createFlattenHot = function(e, t) {
                    return n(e, t).pipe((0, c.b)((e => e)), (0, s.B)())
                },
                e.observeAttribute = function(e, n) {
                    return t(e, {
                        attributes: !0,
                        attributeFilter: [n],
                        subtree: !1,
                        childList: !1
                    }).pipe((0, u.U)((t => e.getAttribute(n))))
                },
                e.observeStyle = function(e) {
                    return t(e, {
                        attributes: !0,
                        attributeFilter: ["style"],
                        subtree: !1,
                        childList: !1
                    }).pipe((0, u.U)((t => e.style)))
                },
                e.observeChildList = function(e) {
                    return t(e, {
                        attributes: !1,
                        subtree: !1,
                        childList: !0
                    }).pipe((0, u.U)((t => e.childNodes)))
                }
            }(r || (r = {}))
        },
        61625: (e, t, n) => {
            n.d(t, {
                X: () => r
            });
            var r,
                i = n(48015),
                o = n(44957),
                s = n(21677);
            !function(e) {
                const t = "grammarly.com",
                    n = "qagr.io",
                    r = "ppgr.io";
                e.create = function(e, a, c, u) {
                    const l = (e, t, n, r, o) => "prod" === u ? e : "qa" === u ? t : "dev-qa" === u ? n : "dev-preprod" === u ? r : "dev" === u ? o : void (0, i.vE)(u),
                        d = "https://127.0.0.1:8000",
                        f = l("https://f-log-extension.grammarly.io", d, d, d, d),
                        h = l("https://endpoint2.collection.us2.sumologic.com/receiver/v1/http/ZaVnC4dhaV1OF-4ic11yqpre0casnyvs_ZoaCHciEYdRyBkrfwP6DMlsWt8tSVU76RPqgGvAGjXGQk_UNuxPx-pYbToJapM_Fr0CUcgKaA8_IVl-lhSr5Q==", d, d, d, d),
                        p = l("https://extension.femetrics.grammarly.io/batch/import", "https://femetrics.qagr.io/batch/import", "https://femetrics.qagr.io/batch/import", "https://femetrics.ppgr.io/batch/import", "https://femetrics.qagr.io/batch/import"),
                        g = l(t, n, n, r, n),
                        m = l(t, n, n, r, t),
                        b = l("https://chipmunk.grammarly.com", "https://chipmunk.qagr.io", "https://chipmunk.qagr.io", "https://chipmunk.ppgr.io", "https://chipmunk.grammarly.com");
                    return {
                        url: s.F.create(e, m, f, h, p),
                        gnar: o.UA.create(e, a, c, g),
                        felog: o.Bo.create(e, a, c, u),
                        capi: o.JW.create(e, a, c),
                        chipmunk: o.fI.create("https://chipmunk.grammarly.com"),
                        iterable: o.Rl.create("https://api.iterable.com"),
                        mise: o.Z9.create(b),
                        auth: o.Tg.create(e, a),
                        extensionId: "87677a2c52b84ad3a151a4a72f5bd3c4"
                    }
                }
            }(r || (r = {}))
        },
        55401: (e, t, n) => {
            n.d(t, {
                S: () => r
            });
            var r,
                i = n(48015),
                o = n(51243);
            !function(e) {
                e.create = function(e, t, n, r, i, o, s, a) {
                    const c = void 0 !== o && void 0 !== s ? o : "UNVERSIONED",
                        u = `${e}.${t}.${n}`;
                    return {
                        version: u,
                        fullVersion: `${u}-${[r, ["prod" !== i ? i : null, c !== r ? c : null].filter((e => !!e)).join(".")].filter((e => "" !== e)).join("/")}`,
                        commitHash: s,
                        gitBranch: o,
                        manifestVersion: a
                    }
                },
                e.getManifestVersion = function(e, t, n) {
                    switch (e) {
                    case "safariAppExtension":
                        switch (t) {
                        case "bg":
                        case "popup":
                            return n.safari.extension.displayVersion;
                        default:
                            return
                        }
                    case "chromiumWebExtension":
                        return n.chrome.runtime.getManifest().version;
                    case "firefoxWebExtension":
                        return o.Ud.runtime.getManifest().version;
                    case "safariWebExtension":
                    case "safariIOSWebExtension":
                        return o.a1.runtime.getManifest().version;
                    default:
                        return (0, i.vE)(e)
                    }
                }
            }(r || (r = {}))
        },
        39318: (e, t, n) => {
            n.d(t, {
                Li: () => r,
                _K: () => i,
                x2: () => a
            });
            var r,
                i,
                o,
                s,
                a,
                c = n(48015);
            !function(e) {
                e.create = function(e) {
                    return (0, c.cq)(["chrome", "safari", "firefox", "edge"], e)
                },
                e.isValidTargetBrowser = function(e) {
                    return ["chrome", "safari", "firefox", "edge"].includes(e)
                },
                e.detect = function(e) {
                    return e.chrome && /google/i.test(e.navigator.vendor) ? e.navigator.userAgent.indexOf("Edg") > -1 ? "edge" : "chrome" : -1 !== e.navigator.userAgent.indexOf("Firefox") ? "firefox" : /^((?!chrome).)*safari/i.test(e.navigator.userAgent) ? "safari" : void 0
                }
            }(r || (r = {})),
            function(e) {
                e.create = function(e) {
                    return (0, c.cq)(["dev", "prod", "qa", "dev-qa", "dev-preprod"], e)
                }
            }(i || (i = {})),
            function(e) {
                e.create = function(e) {
                    return (0, c.cq)(["regular", "retail"], e)
                }
            }(o || (o = {})),
            function(e) {
                e.create = function(e) {
                    return (0, c.cq)(["chromiumWebExtension", "firefoxWebExtension", "safariAppExtension", "safariWebExtension", "safariIOSWebExtension"], e)
                }
            }(s || (s = {})),
            function(e) {
                e.create = function(e, t, n, r, i) {
                    return {
                        browser: e,
                        extensionType: t,
                        deploymentType: n,
                        env: r,
                        context: i
                    }
                }
            }(a || (a = {}))
        },
        6294: (e, t, n) => {
            n.d(t, {
                Rd: () => a,
                pM: () => c
            });
            var r = n(48015),
                i = n(46526);
            const o = new r.xB((() => {
                throw new Error("Global config not initialized")
            }));
            let s = () => o.get();
            function a() {
                return s()
            }
            function c(e, t, n, r, s, a) {
                const c = i.e.create(e, t, n, r, s, a);
                return o.init(c), self.GR_CFG = o.get(), c
            }
        },
        46526: (e, t, n) => {
            n.d(t, {
                e: () => i,
                y: () => r
            });
            var r,
                i,
                o = n(48015),
                s = n(61625),
                a = n(55401),
                c = n(39318),
                u = n(60923);
            !function(e) {
                function t(e, t, n, r, i, o, s) {
                    return {
                        env: e,
                        major_number: t,
                        build_number: n,
                        release_number: r,
                        git_branch: i,
                        git_commit: o,
                        manifest_version: s
                    }
                }
                e.create = t,
                e.fromBrowserify = function() {
                    return t("prod", "9", "70", "0", "UNVERSIONED", "UNVERSIONED", "2")
                }
            }(r || (r = {})),
            function(e) {
                e.getTargetEnv = function(e) {
                    if (!e.env)
                        throw new Error("processEnv.env is null or undefined");
                    const t = c._K.create(e.env);
                    if (!t)
                        throw new Error(`Invalid processEnv.env: ${e.env}`);
                    return t
                },
                e.create = function(e, t, n, r, i, l) {
                    const d = [i.major_number, i.build_number, i.release_number].map(o.wU);
                    let f;
                    if (3 === d.length && d.every((e => void 0 !== e)))
                        f = d;
                    else {
                        let e;
                        try {
                            e = a.S.getManifestVersion(t, r, self)
                        } catch (e) {}
                        const n = (e || "").split(".").map(o.wU);
                        f = 3 === n.length && n.every((e => void 0 !== e)) ? n : [0, 0, 0]
                    }
                    const [h, p, g] = f;
                    return {
                        buildInfo: a.S.create(h, p, g, e, l, i.git_branch, i.git_commit, i.manifest_version),
                        bundleInfo: c.x2.create(e, t, n, l, r),
                        appConfig: s.X.create(e, t, n, l),
                        systemInfo: u.mx.create(self)
                    }
                }
            }(i || (i = {}))
        },
        44957: (e, t, n) => {
            n.d(t, {
                Bo: () => i,
                JW: () => o,
                Rl: () => a,
                Tg: () => u,
                UA: () => r,
                Z9: () => c,
                fI: () => s
            });
            var r,
                i,
                o,
                s,
                a,
                c,
                u,
                l = n(5305);
            !function(e) {
                const t = {
                    chromiumWebExtension: "chromeExt",
                    firefoxWebExtension: "firefoxExt",
                    safariAppExtension: "safariExt",
                    safariWebExtension: "safariWebExt",
                    safariIOSWebExtension: "safariIOSExt"
                };
                function n(e, n, r) {
                    return "retail" === r && "safariIOSWebExtension" === n ? "safariIOSExt-retail" : "edge" === e ? "chromiumEdgeExt" : t[n]
                }
                e.getAppName = n,
                e.create = function(e, t, r, i) {
                    return {
                        appName: (0, l.Cq)(n(e, t, r), "gnar app name"),
                        url: `https://gnar.${i}`,
                        domain: `.${i}`,
                        sendEmailInfoTracking: !0,
                        sendFluidExperimentData: !1
                    }
                }
            }(r || (r = {})),
            function(e) {
                const t = {
                    chromiumWebExtension: "extensionChrome",
                    firefoxWebExtension: "extensionFirefox",
                    safariAppExtension: "extensionSafari",
                    safariWebExtension: "extensionSafariWeb",
                    safariIOSWebExtension: "extensionSafariIOS"
                };
                e.create = function(e, n, r, i) {
                    return {
                        appName: "retail" === r && "safariIOSWebExtension" === n ? "extensionSafariIOS-retail" : "edge" === e ? "extensionEdge" : (0, l.Cq)(t[n], "felog app name"),
                        sendUsageMetrics: !0,
                        sendPerfMetricsType: "dev" === i ? "local" : Math.random() <= .01 ? "send" : "off"
                    }
                }
            }(i || (i = {})),
            function(e) {
                const t = {
                        chromiumWebExtension: "extension_chrome",
                        firefoxWebExtension: "extension_firefox",
                        safariAppExtension: "extension_safari",
                        safariWebExtension: "extension_safari_web",
                        safariIOSWebExtension: "extension_safari_ios"
                    },
                    n = {
                        regular: "inline",
                        retail: "retail_demo"
                    };
                e.create = (e, r, i) => ({
                    clientType: "edge" === e ? "extension_chromium_edge" : (0, l.Cq)(t[r], "capi client type"),
                    clientSubType: (0, l.Cq)(n[i], "capi client subType")
                })
            }(o || (o = {})),
            function(e) {
                e.create = function(e) {
                    return {
                        urls: {
                            fetchMessages: `${e}/api/v1/messages`,
                            acknowledgeMessage: `${e}/api/v1/messages/acknowledge`,
                            dismissMessage: `${e}/api/v1/messages/dismiss`
                        }
                    }
                }
            }(s || (s = {})),
            function(e) {
                e.create = function(e) {
                    return {
                        urls: {
                            getInAppMessages: `${e}/api/inApp/getMessages`,
                            track: `${e}/api/events/track`,
                            trackInAppOpen: `${e}/api/events/trackInAppOpen`,
                            trackInAppClose: `${e}/api/events/trackInAppClose`,
                            trackInAppConsume: `${e}/api/events/inAppConsume`,
                            trackInAppClick: `${e}/api/events/trackInAppClick`,
                            userUpdate: `${e}/api/users/update`
                        }
                    }
                }
            }(a || (a = {})),
            function(e) {
                e.create = function(e) {
                    return {
                        urls: {
                            getJWTToken: `${e}/token`
                        }
                    }
                }
            }(c || (c = {})),
            function(e) {
                const t = {
                    chromiumWebExtension: "chromeExt",
                    firefoxWebExtension: "firefoxExt",
                    safariAppExtension: "safariExt",
                    safariWebExtension: "safariWebExt",
                    safariIOSWebExtension: "safariIOSExt"
                };
                e.create = function(e, n) {
                    return {
                        xClientType: "edge" === e ? "chromiumEdgeExt" : t[n]
                    }
                }
            }(u || (u = {}))
        },
        60923: (e, t, n) => {
            n.d(t, {
                mx: () => o
            });
            var r,
                i,
                o,
                s = n(39318);
            !function(e) {
                e.create = function(e) {
                    return {
                        type: s.Li.detect(e) || "other"
                    }
                }
            }(r || (r = {})),
            function(e) {
                e.create = function(e) {
                    return {
                        isWindows: -1 !== e.navigator.appVersion.indexOf("Win"),
                        isMac: -1 !== e.navigator.appVersion.indexOf("Mac"),
                        isChromeOS: -1 !== e.navigator.appVersion.indexOf("CrOS")
                    }
                }
            }(i || (i = {})),
            function(e) {
                e.create = function(e) {
                    return {
                        browser: r.create(e),
                        os: i.create(e)
                    }
                }
            }(o || (o = {}))
        },
        21677: (e, t, n) => {
            n.d(t, {
                F: () => r
            });
            var r,
                i = n(43895);
            !function(e) {
                let t;
                var n;
                n = t = e.GrStaticUrl || (e.GrStaticUrl = {}),
                n.toGrStaticUrl = e => "https://assets.extension.grammarly.com/" + e
            }(r || (r = {})),
            function(e) {
                e.create = function(t, n, r, o, s) {
                    const a = "safari" === t ? "disableAppsPromotion=true" : "";
                    function c(e) {
                        const t = `https://${e}.${n}`;
                        return (e="", n="") => {
                            const r = i.lM([a, n], "&");
                            return i.lM([t + e, r], "?")
                        }
                    }
                    const u = c("www"),
                        l = c("app"),
                        d = c("account"),
                        f = c("redirect"),
                        h = e.GrStaticUrl.toGrStaticUrl,
                        p = `https://data.${n}`,
                        g = `https://auth.${n}/v3`,
                        m = `https://auth.${n}/v4`,
                        b = `https://capi.${n}/api/configuration/cheetah/v1/settings`,
                        v = `https://capi.${n}`;
                    return {
                        accountSubscription: d("/subscription"),
                        accountSubscriptionAddBillingInfo: d("/admin/subscription", "popup=add_billing_info"),
                        adminAccountSubscription: d("/admin/subscription"),
                        accountAdminSubscriptionAddBillingInfoToUngatedTrial: d("/admin/subscription", "popup=ungated_trial"),
                        app: l(),
                        appPersonalDictionary: d("/customize"),
                        featuresSettings: d("/customize/features"),
                        capi: `wss://capi.${n}/freews`,
                        capiStatic: `wss://capi.${n}/freews`,
                        capiGDocs: `wss://capi.${n}/gdocs`,
                        dapi: p,
                        cheetahSettings: b,
                        editorDictionary: l("/profile/dictionary"),
                        desktop: u("/desktop"),
                        dictionary: `https://capi.${n}/api/defs`,
                        docs: l("/docs"),
                        docsApi: `https://dox.${n}/documents`,
                        newDoc: l("/docs/new"),
                        tokens: `${m}/api`,
                        auth: g,
                        userOrAnonymous: `${g}/user/oranonymous`,
                        signin: u("/signin"),
                        signup: u("/signup"),
                        dialect: `${v}/api/configuration/language/v1/settings`,
                        fbSignin: u("/signin", "fromExtensionFb=true"),
                        fbSignup: u("/signup", "fromExtensionFb=true"),
                        googleSignin: u("/signin", "fromExtensionGoogle=true"),
                        googleSignup: u("/signup", "fromExtensionGoogle=true"),
                        resetPassword: u("/resetpassword"),
                        newFelog: r,
                        sumoLogic: o,
                        vmetrics: s,
                        welcomeC: u("/extension-success"),
                        afterInstall: u("/after_install_page/"),
                        upgrade: u("/upgrade"),
                        planComparison: u("/plans"),
                        businessHomepage: u("/business"),
                        businessPricing: u("/business/pricing"),
                        businessStyleGuide: u("/business/styleguide"),
                        businessBrandTones: u("/business/brand-tones"),
                        uninstall: u("/extension-uninstall"),
                        terms: u("/terms"),
                        policy: u("/privacy-policy"),
                        californiaPolicy: u("/privacy-policy#for-california-users"),
                        extensionSuccess: u("/extension-success"),
                        firefoxPrivatePolicy: "https://addons.mozilla.org/en-US/firefox/addon/grammarly-1/privacy/",
                        dynamicConfigUrl: "https://config.extension.grammarly.com/dynamicConfig.json",
                        pageConfigUrl: "https://config.extension.grammarly.com/browserplugin/config.json",
                        grammarlyDomain: n,
                        grammarlyProtocol: "https:",
                        redirect: f("/redirect"),
                        snippetsApi: `https://goldengate.${n}/snippets/v1/snippets`,
                        snippetsNew: d("/admin/snippets", "action=create"),
                        snippetsAdmin: d("/admin/snippets"),
                        snippetsSettings: d("/customize/snippets"),
                        knowledgeHubApi: `https://goldengate.${n}/knowledge-hub/v1/institution`,
                        clientControlsApi: `https://goldengate.${n}/client-controls`,
                        suggestionsSettings: d("/customize/suggestions"),
                        allSettings: d(),
                        styleGuideSettings: d("/admin/style-guide"),
                        writingStyleSettings: d("/admin/style-guide-writing-style"),
                        brandTones: d("/admin/brand-tones"),
                        grammarlyIdeasSelf: l("/ideas/grow/self"),
                        grammarlyIdeasPeer: l("/ideas/grow/peer"),
                        grammarlyIdeasSales: l("/ideas/sales"),
                        iOSApp: "grammarly://home",
                        standWithUkraine: u("/stand-with-ukraine"),
                        standWithUkraineBlockedUserPing: "https://rwsgfy.grammarly.com/stand-with-ukraine",
                        tourGdocs: u("/tour-gdocs"),
                        assets: {
                            assistantOnboardingTourGif: h("assets/assistant/assistant-onboarding-tour"),
                            ownerActivationIPMHeader: h("assets/ipm/owner-activation-ipm-header"),
                            graduationIpmSvg: h("assets/ipm/graduation-campaign-ipm"),
                            writingProgressIpmGif: h("assets/ipm/writing-progress-ipm-header"),
                            onboardingTour: {
                                inlineSuggestionsPreviewImage: h("assets/onboarding/inline-suggestions-preview-image.jpg"),
                                inlineSuggestionsAnimation: h("assets/onboarding/inline-suggestions.mp4"),
                                clickToAcceptAnimation: h("assets/onboarding/click-to-accept.mp4"),
                                happyWritingAnimation: h("assets/onboarding/happy-writing.mp4")
                            },
                            knowledgeHubOnboardingTour: {
                                step1: h("assets/knowledgeHubOnboarding/kh-onboarding-step1.mp4"),
                                step2: h("assets/knowledgeHubOnboarding/kh-onboarding-step2.mp4"),
                                step3: h("assets/knowledgeHubOnboarding/kh-onboarding-step3.mp4")
                            }
                        },
                        support: `https://support.${n}/hc/en-us/requests/new#/`,
                        grammarlyEmployeesBugReportsUrl: "https://in-product.report.grammarly.io/v1/report"
                    }
                }
            }(r || (r = {}))
        },
        88133: (e, t, n) => {
            n.d(t, {
                O: () => f,
                P: () => d
            });
            var r = n(37642),
                i = n(6294),
                o = n(46526),
                s = n(54074),
                a = n(65963),
                c = n(11047),
                u = n(54329),
                l = n(38983);
            class d {
                static getInstance()
                {
                    if (void 0 === this._instanceShared)
                        throw new Error("shared Env not inited yet");
                    return this._instanceShared
                }
                static initShared(e)
                {
                    if (void 0 !== this._instanceShared)
                        throw new Error("shared Env already inited");
                    this._instanceShared = e
                }
                constructor(e, t=l.h.create(!1), n=l.h.create(!1))
                {
                    this._enableHistoryLoggerInProd = t,
                    this._enableAdvancedHistoryLoggerInProd = n,
                    this.enableHistoryLoggerInProd = (e=!0) => {
                        e && !this._enableHistoryLoggerInProd.get() ? (console.warn("Debug reports have been enabled"), this._enableHistoryLoggerInProd.set(!0)) : !e && this._enableHistoryLoggerInProd.get() && (console.warn("Debug reports have been disabled"), this._enableHistoryLoggerInProd.set(!1))
                    },
                    this.enableAdvancedHistoryLoggerInProd = (e=!0) => {
                        e && !this._enableAdvancedHistoryLoggerInProd.get() ? (console.warn("Advanced logging has been enabled"), this._enableAdvancedHistoryLoggerInProd.set(!0)) : !e && this._enableAdvancedHistoryLoggerInProd.get() && (console.warn("Advanced logging has been disabled"), this._enableAdvancedHistoryLoggerInProd.set(!1))
                    };
                    const r = e.testArgs,
                        s = r && r.processEnv ? r.processEnv : o.y.fromBrowserify(),
                        a = o.e.getTargetEnv(s);
                    this._initLogger(e, a);
                    const c = (0, i.pM)(e.browser, e.extensionType, e.deploymentType, e.context, s, a);
                    this.context = e.context,
                    this.config = c
                }
                _initLogger(e, t)
                {
                    this.historyLogsService = r.Lr.create(Object.assign(Object.assign({}, e.historyLoggerExtraArgs), {
                        enabledInProd: this._enableHistoryLoggerInProd,
                        enableAdvancedInProd: this._enableAdvancedHistoryLoggerInProd
                    }));
                    const n = "prod" !== t || "cs" !== e.context,
                        i = {
                            create: (e, t) => new a.x(e, {
                                writer: new u.n,
                                filterFn: n ? e => !0 : (0, c.x)(s.i.ERROR)
                            }, this.historyLogsService, t)
                        };
                    this.logger = i
                }
            }
            function f() {
                return d.getInstance()
            }
        },
        51243: (e, t, n) => {
            n.d(t, {
                Ud: () => i,
                a1: () => o
            });
            var r = n(48015);
            const i = (0, r.DV)((() => browser), (() => self.browser)),
                o = (0, r.DV)((() => browser), (() => self.browser));
            self.chrome = self.chrome
        },
        47612: (e, t, n) => {
            n.d(t, {
                P4: () => s,
                cg: () => o
            });
            var r = n(5305);
            const i = n(55649).Y.create("extension-api");
            function o(e) {
                self.extensionContentScriptApi && i.warn("Content Script Extension Api init called more than once"),
                self.extensionContentScriptApi = self.extensionContentScriptApi || e
            }
            function s() {
                return (0, r.Cq)(self.extensionContentScriptApi, "content script extension api was not initialized")
            }
        },
        21755: (e, t, n) => {
            n.d(t, {
                t: () => i
            });
            var r = n(82990);
            class i {
                constructor()
                {
                    this.kind = "memory",
                    this._data = {},
                    this._listeners = [],
                    this.get = e => r.O.sync((() => (Array.isArray(e) ? e : [e]).reduce(((e, t) => Object.assign(Object.assign({}, e), {
                        [t]: this._data[t]
                    })), {}))),
                    this.set = e => r.O.sync((() => {
                        this._data = Object.assign(Object.assign({}, this._data), e),
                        this._callListeners()
                    })),
                    this.getAll = () => r.O.sync((() => this._data)),
                    this.remove = e => r.O.sync((() => {
                        (Array.isArray(e) ? e : [e]).forEach((e => {
                            e in this._data && delete this._data[e]
                        })),
                        this._callListeners()
                    })),
                    this.removeAll = () => r.O.sync((() => {
                        this._data = {},
                        this._callListeners()
                    })),
                    this.onChange = e => (this._listeners.push(e), () => this._listeners.splice(this._listeners.indexOf(e), 1))
                }
                _callListeners()
                {
                    this._listeners.forEach((e => e(this._data)))
                }
            }
        },
        60504: (e, t, n) => {
            n.d(t, {
                HW: () => c,
                Qw: () => o,
                WD: () => s,
                Wy: () => a,
                bm: () => i
            });
            const r = "data-enable-grammarly",
                i = ["data-gramm_editor", "data-gramm", "data-gramm_id", "gramm_editor", "readonly", "disabled"],
                o = ["pm-container", {
                    name: "class",
                    value: "ProseMirror"
                }, "data-synchrony", {
                    name: "data-gramm",
                    value: "false"
                }, {
                    name: r,
                    value: "false"
                }, {
                    name: "aria-label",
                    value: "Search Facebook"
                }],
                s = [...i, ...o],
                a = {
                    name: r,
                    value: "true"
                },
                c = ["changed-user", "changed-plan", "changed-dialect", "cleanup", "editor-fix", "llama-action"]
        },
        42356: (e, t, n) => {
            n.d(t, {
                Jt: () => o,
                Ku: () => c,
                Ne: () => a,
                cs: () => d,
                k3: () => s,
                og: () => i,
                on: () => u,
                rR: () => f
            });
            var r = n(74444);
            function i(e, t, n) {
                t ? function(e, t) {
                    if (e) {
                        if (-1 === t.indexOf(" "))
                            return e.classList.add(t);
                        {
                            const n = t.split(" ");
                            for (let t = 0; t < n.length; t++)
                                e.classList.add(n[t])
                        }
                    }
                }(e, n) : function(e, t) {
                    if (e && e.classList)
                        e.classList.remove(t)
                }(e, n)
            }
            function o(e, t) {
                let n = e.parentNode;
                for (; null !== n;) {
                    if (c(n, t))
                        return n;
                    n = n.parentNode
                }
                return !1
            }
            function s(e) {
                let t = e.parentNode;
                for (; null !== t;) {
                    if (a(t))
                        return t;
                    t = t.parentNode
                }
                return !1
            }
            function a(e) {
                return "true" === e.contentEditable || "plaintext-only" === e.contentEditable
            }
            function c(e, t) {
                if (!e)
                    return !1;
                const n = e.matches || e.msMatchesSelector || e.matchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector;
                return !!n && n.apply(e, [t])
            }
            function u(e, t=null, n) {
                return this.addEventListener(e, t, n), {
                    off: () => l.apply(this, [e, t, n])
                }
            }
            function l(e, t, n) {
                this.removeEventListener(e, t || null, n)
            }
            function d(...e) {
                return e.reduce(((e, t) => e.concat((0, r.Kn)(t) ? Object.keys(t).filter((e => t[e])) : t)), []).filter((e => Boolean(e))).join(" ")
            }
            function f(e=document) {
                if (void 0 === e.body.style.transform) {
                    if (void 0 !== e.body.style.WebkitTransform)
                        return "WebkitTransform";
                    if (void 0 !== e.body.style.MozTransform)
                        return "MozTransform"
                }
                return "transform"
            }
        },
        60865: (e, t, n) => {
            n.d(t, {
                E: () => o,
                o: () => i
            });
            const r = (0, n(43124).M8)();
            function i(e, t, n, o, s=!1) {
                if (null == e)
                    return;
                const a = e;
                if ("string" != typeof t)
                    return Object.keys(t).forEach((e => {
                        t[e] && i(a, e, t[e], o)
                    }));
                {
                    if (!n)
                        return;
                    const e = a[r] || [];
                    return a[r] = e, o ? (a[r] = e.filter((e => !(e.event === t && e.cb === n))), a.removeEventListener(t, n, s)) : (e.push({
                        event: t,
                        cb: n
                    }), a.addEventListener(t, n, s)), {
                        el: a,
                        event: t,
                        cb: n,
                        bubble: s
                    }
                }
            }
            function o(e, t, n, s) {
                const a = e;
                t || null == a[r] ? i(a, t, n, !0, s) : a[r].forEach((e => o(a, e.event, e.cb, e.bubble)))
            }
        },
        7992: (e, t, n) => {
            n.d(t, {
                KK: () => a,
                Lu: () => u,
                Qr: () => c,
                ge: () => s,
                t_: () => l
            });
            var r = n(56913);
            const i = ["facebook.com", "messenger.com", "work.fb.com", "business.facebook.com"],
                o = e => e.replace("www.", "");
            function s(e) {
                const t = e && e.ownerDocument || document,
                    n = t.location || t.defaultView.location;
                return n ? o(n.hostname) : ""
            }
            function a(e) {
                return (0, r.pZ)() && /^about:/.test(e) ? e : "" === e ? "" : o(new URL(e).hostname)
            }
            const c = () => i.includes(s()),
                u = () => /\/document\//.test(d()) && "docs.google.com" === s(),
                l = () => /\/document\/d\/.*$/.test(d()) && "docs.google.com" === s();
            function d(e) {
                const t = e && e.ownerDocument || document,
                    n = t.location || t.defaultView.location;
                return n ? n.pathname + n.search : ""
            }
        },
        56913: (e, t, n) => {
            n.d(t, {
                $R: () => w,
                Am: () => u,
                CB: () => d,
                ED: () => f,
                G6: () => a,
                L6: () => _,
                U8: () => p,
                Um: () => v,
                bo: () => m,
                dU: () => b,
                i7: () => s,
                kD: () => l,
                n0: () => c,
                n_: () => y,
                oX: () => g,
                pB: () => i,
                pZ: () => o,
                qs: () => h
            });
            var r = n(6294);
            function i() {
                return r.Rd().appConfig.extensionId
            }
            function o() {
                return "firefox" === r.Rd().bundleInfo.browser
            }
            function s() {
                return "chrome" === r.Rd().bundleInfo.browser
            }
            function a() {
                return "safari" === r.Rd().bundleInfo.browser
            }
            function c() {
                return "safariAppExtension" === r.Rd().bundleInfo.extensionType
            }
            function u() {
                return "safariIOSWebExtension" === r.Rd().bundleInfo.extensionType
            }
            function l() {
                return "edge" === r.Rd().bundleInfo.browser
            }
            function d() {
                return s() || l()
            }
            function f() {
                return r.Rd().systemInfo.os.isWindows
            }
            function h() {
                return r.Rd().bundleInfo.browser
            }
            function p() {
                return r.Rd().bundleInfo.extensionType
            }
            function g() {
                return r.Rd().bundleInfo.deploymentType
            }
            function m() {
                return r.Rd().buildInfo.version
            }
            function b() {
                return r.Rd().bundleInfo.env
            }
            function v() {
                return r.Rd().appConfig.url
            }
            function y() {
                try {
                    return self.parent !== self
                } catch (e) {
                    return !0
                }
            }
            function _() {
                return "undefined" != typeof fetch
            }
            function w() {
                return `extension-${r.Rd().bundleInfo.browser}`
            }
        },
        57173: (e, t, n) => {
            n.d(t, {
                F: () => a,
                I: () => c
            });
            var r = n(60504),
                i = n(42356),
                o = n(60865);
            function s(e) {
                return e.getRangeAt(0).getBoundingClientRect()
            }
            function a(e, t) {
                const n = e.anchorNode;
                if (!n)
                    return !1;
                const o = r.bm.map((e => Array.isArray(e) ? `[${e[0]}="${e[1]}"]` : `[${e}]`)).join(","),
                    s = t.activeElement,
                    a = e.toString().trim(),
                    c = "TEXTAREA" !== n.tagName && "INPUT" !== n.tagName,
                    u = !s || "INPUT" !== s.tagName && "TEXTAREA" !== s.tagName,
                    l = !(0, i.Ne)(n),
                    d = !(0, i.Jt)(n, o) && !(0, i.Ku)(n, o),
                    f = !(0, i.Jt)(n, "[contenteditable=true],[contenteditable=plaintext-only]") && !(0, i.k3)(n);
                return !!(a && c && u && l && d && f)
            }
            class c {
                constructor(e, t, n)
                {
                    this._doc = e,
                    this._selectHandler = t,
                    this._deselectHandler = n,
                    this._select = !1,
                    this.release = () => (0, o.E)(this._doc, "click", this.check),
                    this.check = e => {
                        if (2 !== e.detail)
                            return void (this._select && (this._deselectHandler(), this._select = !1));
                        this._select = !0;
                        const t = this._doc.getSelection();
                        if (!a(t, this._doc))
                            return;
                        const n = t.anchorNode.textContent,
                            r = t.toString();
                        if (r.match(/[0-9_±!@#$%^&*:"|<>?~().,:}{’=']/))
                            return;
                        let i = {
                            v: r,
                            s: 0,
                            e: r.length
                        };
                        const o = t.getRangeAt(0);
                        if (o.ownerDocument = this._doc, t.anchorNode === t.focusNode) {
                            const e = t.anchorOffset;
                            i = function(e, t, n) {
                                if (!e)
                                    return null;
                                const r = e.split(/[.;!?]/g);
                                let i = 0,
                                    o = 0;
                                for (let e = 0; e < r.length; e++) {
                                    if (o = i + r[e].length, t >= i && n <= o)
                                        return {
                                            v: r[e],
                                            s: t - i,
                                            e: n - i
                                        };
                                    i = o + 1
                                }
                                return null
                            }(n, e, e + r.length)
                        }
                        null !== i && this._selectHandler({
                            data: {
                                v: i.v,
                                s: i.s,
                                e: i.e,
                                w: r
                            },
                            pos: s(t),
                            el: o,
                            event: e
                        })
                    },
                    (0, o.o)(e, "click", this.check)
                }
            }
        },
        90020: (e, t, n) => {
            n.d(t, {
                _x: () => a,
                in: () => c
            });
            var r,
                i = n(98805),
                o = function(e, t) {
                    var n = {};
                    for (var r in e)
                        Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
                    if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                        var i = 0;
                        for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
                            t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]])
                    }
                    return n
                };
            !function(e) {
                e.lessThan1Week = "lessThan1Week",
                e.weekTo4Weeks = "weekTo4Weeks",
                e.moreThan4weeks = "moreThan4weeks",
                e.moreThan3Months = "moreThan3Months"
            }(r || (r = {}));
            new Map([[Date.now(), r.lessThan1Week], [Date.now() - i.an(7), r.weekTo4Weeks], [Date.now() - i.an(28), r.moreThan4weeks], [Date.now() - i.an(90), r.moreThan3Months]]);
            const s = {
                stats: "ex_perfstats",
                csInit: "ex_csInitPerf",
                viewInjection: "viewInjectionPerf"
            };
            function a(e) {
                const {_tag: t} = e,
                    n = o(e, ["_tag"]);
                return {
                    [s[e._tag]]: n
                }
            }
            var c;
            !function(e) {
                e.INFO = "INFO",
                e.WARN = "WARN",
                e.ERROR = "ERROR"
            }(c || (c = {}))
        },
        20641: (e, t, n) => {
            n.d(t, {
                Tb: () => d
            });
            var r = n(6294),
                i = n(55649),
                o = n(88133),
                s = n(3766),
                a = n(82722),
                c = n(29445),
                u = n(88731);
            i.Y.create("lib.tracking.logger");
            let l;
            function d() {
                if (!l) {
                    const e = (0, o.O)().telemetryCallProvider;
                    l = new s.M0(e.sendFelog, e.sendFelogUsageEvent, e.setUserInfo, e.setContainerId, r.Rd().appConfig.felog.sendUsageMetrics, function() {
                        const e = r.Rd().appConfig.felog.sendPerfMetricsType;
                        return "local" === e ? (0, a.X)(c.f.create(self.performance)) : (0, u.U)("send" === e, c.f.create(self.performance))
                    }(), e.sendFelogEvent, e.sendFelogCrashLogs, void 0, (() => {
                        var t;
                        return null === (t = e.enableDataSharing) || void 0 === t ? void 0 : t.call(e)
                    }), void 0, e.sendFelogMetricEvent, e.sendFemetricsRate, e.startFemetricsTimer, e.endFemetricsTimer, e.sendFemetricsTimer)
                }
                return l
            }
        },
        33394: (e, t, n) => {
            n.d(t, {
                $V: () => p,
                QN: () => c,
                RD: () => y,
                Xc: () => b,
                Y0: () => k,
                Yu: () => O,
                Z4: () => E,
                bG: () => _,
                bO: () => u,
                c: () => R,
                jv: () => T,
                o2: () => S,
                rv: () => I,
                s7: () => v,
                sC: () => f,
                uh: () => x,
                vr: () => w
            });
            var r = n(44957),
                i = n(56913),
                o = n(43124);
            const s = "%appName%",
                a = {
                    extensionSettingsToolbar: "%appName%SettingsToolbar",
                    gdocsSidebarCardList: "%appName%AdvancedIssues",
                    assistantCardList: "%appName%AdvancedIssues",
                    extensionSettingsAssistant: "%appName%AssistantSettings",
                    gdocsGoals: "%appName%AssistantGoals",
                    extensionBusinessUphookPopup: "gb%appName%UphookPopup",
                    gbExtensionSettingsToolbar: "gb%appName%SettingsToolbar",
                    gbExtensionSettingsAssistant: "gb%appName%AssistantSettings",
                    extensionGButton: "%appName%GButton",
                    extPreviewsPopup: "%appName%PreviewsPopup",
                    toneSuggestion: "%appName%ToneDetector",
                    grammarlyGoPrompts: "%appName%GrammarlyGoPrompts"
                };
            function c(e, t) {
                return {
                    key: e,
                    value: t
                }
            }
            function u(e) {
                const t = a[e];
                return t ? t.replace(s, ((e, t) => {
                    const n = r.UA.getAppName((0, i.qs)(), (0, i.U8)(), (0, i.oX)());
                    return 0 === t ? n : (0, o.kC)(n)
                })) : e
            }
            function l(e, t) {
                return c(e, t)
            }
            function d(e) {
                return e.map((e => [e.key, e.value].map(encodeURIComponent).join("="))).join("&")
            }
            function f(e, t) {
                if (0 === t.length)
                    return e;
                const n = e.includes("?");
                return [e, d(t)].join(n ? "&" : "?")
            }
            function h(e) {
                const t = [];
                return void 0 !== e.medium && t.push(l("utm_medium", e.medium)), void 0 !== e.source && t.push(l("utm_source", e.source)), void 0 !== e.campaign && t.push(l("utm_campaign", u(e.campaign))), e.clickToRun && t.push(l("click_to_run", "true")), t
            }
            function p(e) {
                return h(e)
            }
            function g(e) {
                return h({
                    medium: "internal",
                    source: e
                })
            }
            const m = c("fromExtension", "true");
            function b(e, t) {
                return f((0, i.Um)().signup, [...p({
                    medium: "internal",
                    source: e,
                    campaign: t
                }), m])
            }
            function v(e) {
                return f((0, i.Um)().signin, [...g(e || "signinHook"), m])
            }
            function y(e) {
                return f((0, i.Um)().fbSignup, g(e))
            }
            function _(e) {
                return f((0, i.Um)().googleSignup, g(e))
            }
            h({
                medium: "internal"
            })[0];
            function w(e, t) {
                return f((0, i.Um)().planComparison, p({
                    medium: "internal",
                    source: e,
                    campaign: t
                }))
            }
            function x(e) {
                return f((0, i.Um)().planComparison, [c("app_type", "extension"), c("browser", (0, i.qs)()), ...p({
                    medium: "internal",
                    source: "upHook",
                    campaign: e
                })])
            }
            const E = (e, t, n) => f(e, [c("app_type", "extension"), c("browser", (0, i.qs)()), ...n ? [c("domainCategory", n)] : [], ...p({
                medium: "internal",
                source: "upHook",
                campaign: t
            })]);
            function S() {
                return (0, i.Um)().accountSubscription
            }
            function R() {
                return (0, i.Um)().accountSubscriptionAddBillingInfo
            }
            function O() {
                return (0, i.Um)().accountAdminSubscriptionAddBillingInfoToUngatedTrial
            }
            function k() {
                return (0, i.Um)().adminAccountSubscription
            }
            function I() {
                return (0, i.Um)().redirect
            }
            function T(e) {
                return !!e && /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(e)
            }
        },
        43124: (e, t, n) => {
            function r() {
                return self.chrome && self.chrome.runtime && self.chrome.runtime.lastError
            }
            function i() {
                return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
            }
            function o() {
                return i() + i() + "-" + i() + "-" + i() + "-" + i() + "-" + i() + i() + i()
            }
            function s() {}
            function a(e) {
                return new Promise((t => setTimeout(t, e)))
            }
            n.d(t, {
                DG: () => f,
                M8: () => o,
                _f: () => s,
                gw: () => a,
                kC: () => h,
                lQ: () => c,
                p6: () => u,
                qH: () => l,
                rw: () => d,
                s6: () => r
            });
            const c = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            function u(e) {
                if (!e)
                    return;
                const t = new Date(e);
                return "Invalid Date" !== t.toString() ? c[t.getMonth()] + " " + t.getDate() + ", " + t.getFullYear() : void 0
            }
            function l(e) {
                const t = function() {};
                return t.prototype = e(), t
            }
            function d(e) {
                return e.which || e.charCode || e.keyCode || 0
            }
            const f = 27;
            function h(e) {
                return e.charAt(0).toUpperCase() + e.slice(1)
            }
        },
        82250: (e, t, n) => {
            n.d(t, {
                M: () => i
            });
            var r = n(55649);
            class i {
                constructor(e)
                {
                    this._baseApi = e,
                    this._log = r.Y.create("BaseMessageService"),
                    this._initializedListenerEvents = new Set,
                    this._listeners = {},
                    this._logError = e => {
                        this._log.error(`${i.name} handle an error: ${e.message}`)
                    },
                    this.on = (e, t) => {
                        var n;
                        this._listeners[e] = null !== (n = this._listeners[e]) && void 0 !== n ? n : [],
                        this._listeners[e].push(t),
                        this._initializedListenerEvents.has(e) || (this._initializedListenerEvents.add(e), this._baseApi.listen(e, ((...t) => {
                            var n;
                            const r = null !== (n = this._listeners[e]) && void 0 !== n ? n : [];
                            for (const e of r)
                                try {
                                    e(...t)
                                } catch (e) {
                                    this._logError(e)
                                }
                        })))
                    },
                    this.once = (e, t) => {
                        const n = (...r) => {
                            this.off(e, n);
                            try {
                                t(...r)
                            } catch (e) {
                                this._logError(e)
                            }
                        };
                        this.on(e, n)
                    },
                    this.off = (e, t) => {
                        if (!this._listeners[e])
                            return;
                        const n = this._listeners[e].indexOf(t);
                        -1 !== n && this._listeners[e].splice(n, 1),
                        0 === this._listeners[e].length && delete this._listeners[e]
                    }
                }
            }
        },
        27733: (e, t, n) => {
            n.d(t, {
                w: () => i
            });
            var r = n(82250);
            class i extends r.M {
                constructor(e)
                {
                    super(e),
                    this._api = e,
                    this.sendBackground = (e, t) => {
                        try {
                            this._api.broadcastBackground(e, t)
                        } catch (e) {
                            this._logError(e)
                        }
                    }
                }
            }
        },
        12764: (e, t, n) => {
            var r,
                i;
            n.d(t, {
                B: () => r,
                I: () => i
            }),
            function(e) {
                let t;
                !function(e) {
                    e.disableOnTab = "disableOnTab",
                    e.reloadTab = "reloadTab",
                    e.showOnboardingDialog = "showOnboardingDialog",
                    e.hideGdocsSigninPopupMessage = "hideGdocsSigninPopupMessage",
                    e.sendCsLogsToPopup = "sendCsLogsToPopup",
                    e.donloadDebugReportsFromCS = "donloadDebugReportsFromCS"
                }(t = e.Kind || (e.Kind = {}))
            }(r || (r = {})),
            function(e) {
                let t;
                !function(e) {
                    e.sendCsLogs = "sendCsLogs"
                }(t = e.Kind || (e.Kind = {}))
            }(i || (i = {}))
        },
        51998: (e, t, n) => {
            var r;
            n.d(t, {
                I: () => r
            }),
            function(e) {
                e.rpcLegacyMessageName = "cs-to-bg-rpc-1587687052565",
                e.rpcLegacyObservableName = "cs-to-bg-observable-rpc-1587687052565"
            }(r || (r = {}))
        },
        41824: (e, t, n) => {
            n.d(t, {
                x: () => r
            });
            const r = "cs-to-bg-rpc-1557421403805";
            var i;
            !function(e) {
                e.syncDevtoolsInitialStateWithTab = "syncDevtoolsInitialStateWithTab"
            }(i || (i = {}))
        },
        25238: (e, t, n) => {
            var r;
            n.d(t, {
                U: () => r
            }),
            function(e) {
                e.rpcLegacyMessageName = "cs-to-bg-static-capi-rpc-1668544923207",
                e.rpcLegacyObservableName = "cs-to-bg-static-capi-observable-rpc-1668544923207"
            }(r || (r = {}))
        },
        20625: (e, t, n) => {
            n.d(t, {
                H: () => d
            });
            var r = n(44586),
                i = n(85985),
                o = n(48015),
                s = n(82990),
                a = n(55649),
                c = n(55231),
                u = n(26063),
                l = n(64373);
            class d {
                constructor(e, t, n=a.Y.create("GenericObservableRpcClient"), r)
                {
                    this._transport = e,
                    this._observableTransport = t,
                    this._log = n,
                    this._serverId = r,
                    this._calls = new Map,
                    this._subscribeRelatedCalls = new Map,
                    this._observables = new Map,
                    this._subscribers = new Map,
                    this._transportSubscription = (0, l.s8)(this._transport.inbound).pipe((0, i.h)(c.ZQ)).subscribe((e => {
                        this._processResponse(e)
                    })),
                    this._observableTransportSubscription = (0, l.s8)(this._observableTransport.inbound).pipe((0, i.h)(c.ZQ)).subscribe((e => {
                        this._processObservableMessage(e)
                    })),
                    this.api = new Proxy({}, {
                        get: (e, t) => "then" === t ? void 0 : (...e) => this._handleCall(t, e)
                    })
                }
                _processResponse(e)
                {
                    const t = this._calls.get(e.id);
                    if (t)
                        try {
                            if ("err" in e)
                                t.reject(e.err);
                            else if (c.JL.isObservableResult(e))
                                try {
                                    const n = new r.y((t => this._createSubscribeHandler(e.subscribableId, t)));
                                    this._observables.set(e.subscribableId, n),
                                    t.resolve(n)
                                } catch (t) {
                                    this._observables.delete(e.subscribableId)
                                }
                            else
                                t.resolve(this.transformResult(e.res))
                        } finally {
                            this._calls.delete(e.id)
                        }
                    else
                        this._log.warn(`received rpc call response for unregistered call ${e.id}`)
                }
                transformResult(e)
                {
                    return e
                }
                _processObservableMessage(e)
                {
                    if ("subscribed" in e) {
                        const t = this._subscribeRelatedCalls.get(e.id);
                        if (t)
                            try {
                                t.resolve()
                            } finally {
                                this._subscribeRelatedCalls.delete(e.id)
                            }
                        else
                            this._log.warn(`received rpc call subscribed response for unregistered subscribe call ${e.id}`)
                    } else if ("unsubscribed" in e) {
                        const t = this._subscribeRelatedCalls.get(e.id);
                        if (t)
                            try {
                                t.resolve()
                            } finally {
                                this._subscribeRelatedCalls.delete(e.id),
                                this._subscribers.delete(e.id)
                            }
                        else
                            this._log.warn(`received rpc call unsubscribed response for unregistered unsubscribe call ${e.id}`)
                    } else if ("next" in e)
                        try {
                            const t = this._subscribers.get(e.subscriptionId);
                            t ? t.subscriber.next(e.next) : this._log.warn(`received observable next message for unregistered subscription ${e.subscriptionId}`)
                        } catch (t) {
                            this._subscribers.delete(e.subscriptionId)
                        }
                    else if ("complete" in e)
                        try {
                            const t = this._subscribers.get(e.subscriptionId);
                            t ? (t.subscriber.complete(), this._subscribers.delete(e.subscriptionId)) : this._log.warn(`received observable complete for unregistered subscription ${e.subscriptionId}`)
                        } catch (t) {
                            this._subscribers.delete(e.subscriptionId)
                        }
                    else if ("err" in e)
                        try {
                            const t = this._subscribers.get(e.subscriptionId);
                            t ? t.subscriber.error(e.err) : this._log.warn(`received observable error for unregistered subscription  ${e.subscriptionId}`)
                        } finally {
                            this._subscribers.delete(e.subscriptionId)
                        }
                    else if ("subErr" in e) {
                        const t = this._subscribeRelatedCalls.get(e.id);
                        try {
                            const n = this._subscribers.get(e.id);
                            n ? n.subscriber.error(e.subErr) : this._log.warn(`received subscription error response for unregistered call ${e.id}`)
                        } finally {
                            t && (t.reject(e.subErr), this._subscribeRelatedCalls.delete(e.id)),
                            this._observables.delete(e.subscribableId),
                            this._subscribers.delete(e.id)
                        }
                    } else if ("ping" in e)
                        try {
                            this._observables.get(e.ping) ? this._observableTransport.outbound({
                                pong: e.ping
                            }) : this._log.warn(`received ping for unregistered observable ${e.ping}`)
                        } finally {
                            (0, o.EI)()
                        }
                }
                _handleCall(e, t)
                {
                    let n = o.iy.create();
                    for (; this._calls.has(n);)
                        n = o.iy.create();
                    const r = s.O.createCompletionSource();
                    this._calls.set(n, r);
                    const i = t.map((e => (0, u.R)(e) ? e.toJSON() : e));
                    return this._transport.outbound({
                        id: n,
                        method: e,
                        args: i,
                        serverId: this._serverId
                    }), r.promise
                }
                _createSubscribeHandler(e, t)
                {
                    let n = o.iy.create();
                    for (; this._subscribeRelatedCalls.has(n);)
                        n = o.iy.create();
                    const r = s.O.createCompletionSource();
                    return this._subscribeRelatedCalls.set(n, r), this._observableTransport.outbound({
                        id: n,
                        subscribableId: e,
                        action: "subscribe"
                    }), this._subscribers.set(n, {
                        subscribableId: e,
                        subscriber: t
                    }), () => {
                        this._handleUnsubscribe(n, e)
                    }
                }
                _handleUnsubscribe(e, t)
                {
                    let n = o.iy.create();
                    for (; this._subscribeRelatedCalls.has(n);)
                        n = o.iy.create();
                    const r = s.O.createCompletionSource();
                    return this._subscribeRelatedCalls.set(n, r), this._observableTransport.outbound({
                        id: n,
                        subscriptionId: e,
                        subscribableId: t,
                        action: "unsubscribe"
                    }), this._subscribers.delete(e), r.promise
                }
                dispose()
                {
                    for (const e of this._observables.keys())
                        this._observableTransport.outbound({
                            id: o.iy.create(),
                            subscribableId: e,
                            action: "dispose"
                        });
                    this._observables.clear(),
                    this._transportSubscription.unsubscribe(),
                    this._observableTransportSubscription.unsubscribe(),
                    this._calls.clear(),
                    this._subscribeRelatedCalls.clear()
                }
            }
        },
        99966: (e, t, n) => {
            n.d(t, {
                X: () => o
            });
            var r = n(48015),
                i = n(82990);
            class o {
                constructor(e, t)
                {
                    this._transport = e,
                    this._log = t,
                    this._calls = new Map,
                    this._sub = this._transport.inbound.subscribe((e => {
                        var t;
                        const n = this._calls.get(e.id);
                        if (n)
                            try {
                                "err" in e ? n.reject(e.err) : n.resolve(e.res)
                            } finally {
                                this._calls.delete(e.id)
                            }
                        else
                            null === (t = this._log) || void 0 === t || t.warn(`received rpc call response for unregistered call ${e.id}`)
                    })),
                    this.api = new Proxy({}, {
                        get: (e, t) => "then" === t ? void 0 : (...e) => this._handleCall(t, e)
                    })
                }
                _handleCall(e, t)
                {
                    let n = r.iy.create();
                    for (; this._calls.has(n);)
                        n = r.iy.create();
                    const o = i.O.createCompletionSource();
                    return this._calls.set(n, o), this._transport.outbound({
                        id: n,
                        method: e,
                        args: t
                    }), o.promise
                }
                dispose()
                {
                    this._sub.unsubscribe()
                }
            }
        },
        55231: (e, t, n) => {
            function r(e) {
                return "tunnel" === e.tag
            }
            function i(e) {
                return "tunnel" !== e.tag
            }
            function o(e) {
                return i(e.data)
            }
            function s(e) {
                return t => e(t.data)
            }
            var a;
            n.d(t, {
                JL: () => a,
                Mk: () => s,
                ZQ: () => i,
                hs: () => r,
                uN: () => o
            }),
            function(e) {
                e.isSubscribe = e => "action" in e.data && "subscribe" === e.data.action,
                e.isUnsubscribe = e => "action" in e.data && "unsubscribe" === e.data.action,
                e.isDispose = e => "action" in e.data && "dispose" === e.data.action,
                e.isPong = e => "pong" in e.data,
                e.isPing = e => "ping" in e.data,
                e.isObservableResult = e => "subscribableId" in e
            }(a || (a = {}))
        },
        26063: (e, t, n) => {
            n.d(t, {
                R: () => i,
                l: () => r
            });
            const r = Symbol();
            function i(e) {
                return Boolean(e) && e._tag === r
            }
        },
        83731: (e, t, n) => {
            n.d(t, {
                cS: () => i
            });
            var r = n(89190);
            const i = {
                source: r.c.local,
                version: "0",
                newRichTextFieldsEnabled: !0,
                fluidDisabledForFirefox: !1,
                fluidDisabledForSafari: !1,
                fullSentenceRewritesDisabled: !1,
                overrideKey: "dynamicConfigOverrideKey",
                ungatingRenewalNotificationEnabled: !1,
                quillJSCatchAllDisabled: !1
            }
        },
        89190: (e, t, n) => {
            var r;
            n.d(t, {
                c: () => r
            }),
            function(e) {
                e.empty = "empty",
                e.local = "local",
                e.server = "server",
                e.localOverride = "localOverride"
            }(r || (r = {}))
        },
        51129: (e, t, n) => {
            var r,
                i;
            n.d(t, {
                FW: () => r,
                n5: () => i
            }),
            function(e) {
                e.anonymous = "anonymous",
                e.registered = "registered",
                e.premium = "premium"
            }(r || (r = {})),
            function(e) {
                function t(e) {
                    return !e.anonymous && e.premium
                }
                function n(e) {
                    var t;
                    return ["BUSINESS", "NGO", "GOV"].includes((null === (t = e.institutionInfo) || void 0 === t ? void 0 : t.organizationType) || "")
                }
                function i(e) {
                    return !!e.institutionInfo
                }
                e.getType = function(e) {
                    return e.premium ? r.premium : e.anonymous ? r.anonymous : r.registered
                },
                e.isFree = function(e) {
                    return !e.anonymous && !e.premium
                },
                e.isPremium = t,
                e.isFreeTrial = function(e) {
                    return !!(t(e) && e.customFields && e.customFields.frontend_premiumTrialEndDate) && new Date < new Date(e.customFields.frontend_premiumTrialEndDate)
                },
                e.getUserRole = function(e, t) {
                    var n;
                    return null === (n = e.roles) || void 0 === n ? void 0 : n.find((e => e.type === t))
                },
                e.isEdcBlocked = function(e) {
                    return !!e.edc && !e.edc.compliant
                },
                e.isDocsDisabled = function(e) {
                    var t,
                        n;
                    return null !== (n = null === (t = e.editorFeatures) || void 0 === t ? void 0 : t.docsDisabled) && void 0 !== n && n
                },
                e.hasRole = function(e) {
                    return !!e.customFields && (void 0 !== e.customFields.frontend_role && "" !== e.customFields.frontend_role)
                },
                e.hasSoundFluentGoals = function(e) {
                    return !!e.customFields && (void 0 !== e.customFields.frontend_soundFluent && "" !== e.customFields.frontend_soundFluent)
                },
                e.hasPrimaryLanguage = function(e) {
                    return !!e.customFields && (void 0 !== e.customFields.frontend_primaryLanguage && "" !== e.customFields.frontend_primaryLanguage)
                },
                e.isBusinessAdmin = function(e) {
                    var t;
                    return Boolean(n(e) && (null === (t = null == e ? void 0 : e.institutionInfo) || void 0 === t ? void 0 : t.admin))
                },
                e.doesUserBelongToBusinessInstitution = n,
                e.doesUserBelongToInstitution = i,
                e.doesUserBelongToEDUInstitution = function(e) {
                    var t;
                    return "EDU" === (null === (t = e.institutionInfo) || void 0 === t ? void 0 : t.organizationType)
                },
                e.doesUserBelongToNGOInstitution = function(e) {
                    var t;
                    return "NGO" === (null === (t = e.institutionInfo) || void 0 === t ? void 0 : t.organizationType)
                },
                e.isClaimed = function(e) {
                    return e.groups.includes("claimed-invitation")
                };
                e.isGrammarlyEmployee = function(e) {
                    var t;
                    return e.email.endsWith("@grammarly.com") && 624392205 === (null === (t = e.institutionInfo) || void 0 === t ? void 0 : t.id)
                },
                e.isTestUser = function(e) {
                    return e.email.endsWith("@bh.exacttarget.com")
                },
                e.isConsumerUser = function(e) {
                    return !i(e)
                },
                e.defaultUser = {
                    anonymous: !0,
                    groups: [],
                    id: "",
                    premium: !1,
                    isTest: !1,
                    settings: {},
                    subscriptionFree: !1,
                    type: "anonymous",
                    email: "",
                    registrationDate: (new Date).toString(),
                    firstName: ""
                }
            }(i || (i = {}))
        },
        43895: (e, t, n) => {
            function r(e, t) {
                return [].concat(...e.map(t))
            }
            function i(e) {
                return [].concat(...e)
            }
            function o(e) {
                return [...new Set(e)]
            }
            function s(e, t) {
                return void 0 !== t ? Array.from(Array(t - e), ((t, n) => n + e)) : Array.from(Array(e), ((e, t) => t))
            }
            function a(e, t=((e, t) => e === t)) {
                if (0 === e.length)
                    return [];
                const n = [[e[0]]];
                for (let r = 1; r < e.length; r += 1) {
                    const i = n[n.length - 1][0],
                        o = e[r];
                    t(i, o) ? n[n.length - 1].push(o) : n.push([o])
                }
                return n
            }
            function c(e, t) {
                return e.filter((e => !!e)).join(t)
            }
            function u(e, t) {
                return e.sort(((e, n) => e[t] - n[t]))
            }
            n.d(t, {
                Bd: () => u,
                EB: () => o,
                VS: () => r,
                lM: () => c,
                m: () => a,
                w6: () => s,
                xH: () => i
            })
        },
        5305: (e, t, n) => {
            n.d(t, {
                Cq: () => o,
                hu: () => i
            });
            class r extends Error {
                constructor(e)
                {
                    super(`Assertion failed: ${e ? "string" == typeof e ? e : e() : "(unnamed)"}`)
                }
            }
            function i(e, t) {
                if (!e)
                    throw new r(t)
            }
            function o(e, t) {
                if (null == e)
                    throw new r((() => t ? `Expected ${t} to be non-null` : "Expected non-null"));
                return e
            }
        },
        52622: (e, t, n) => {
            function r(e) {
                return new Proxy({}, {
                    get(t, n) {
                        const r = e[n];
                        return r && "function" == typeof r ? r.bind(e) : void 0
                    }
                })
            }
            n.d(t, {
                a: () => r
            })
        },
        74211: (e, t, n) => {
            n.d(t, {
                P: () => r
            });
            class r {
                constructor(e)
                {
                    if (this.capacity = e, this._start = 0, this._end = 0, this._isFull = !1, e <= 0)
                        throw new Error("Invalid capacity " + e);
                    this._buffer = new Array(e)
                }
                get size()
                {
                    return this._isFull ? this._buffer.length : (this._end - this._start + this._buffer.length) % this._buffer.length
                }
                get isEmpty()
                {
                    return 0 === this.size
                }
                get isFull()
                {
                    return this._isFull
                }
                get head()
                {
                    return this.isEmpty ? null : this._buffer[this._start]
                }
                get tail()
                {
                    return this.isEmpty ? null : this._buffer[0 === this._end ? this.capacity - 1 : this._end - 1]
                }
                enqueue(e)
                {
                    let t = null;
                    return this.isFull && (t = this._buffer[this._start], this._startInc()), this._buffer[this._end] = e, this._endInc(), this._start === this._end && (this._isFull = !0), t
                }
                dequeue()
                {
                    if (this.isEmpty)
                        return null;
                    const e = this._buffer[this._start];
                    return this._buffer[this._start] = null, this._startInc(), this._isFull = !1, e
                }
                delete(e)
                {
                    const t = this._buffer.indexOf(e);
                    if (t >= 0) {
                        if (t < this._end) {
                            for (let e = t; e < this._end - 1; e++)
                                this._buffer[e] = this._buffer[e + 1];
                            this._buffer[--this._end] = null
                        } else {
                            for (let e = this._start; e < t; e++)
                                this._buffer[e + 1] = this._buffer[e];
                            this._buffer[this._start] = null,
                            this._startInc()
                        }
                        return this._isFull = !1, !0
                    }
                    return !1
                }
                _startInc()
                {
                    this._start++,
                    this._start === this.capacity && (this._start = 0)
                }
                _endInc()
                {
                    this._end++,
                    this._end === this.capacity && (this._end = 0)
                }
                clear()
                {
                    this._buffer = new Array(this.capacity),
                    this._start = this._end = 0,
                    this._isFull = !1
                }
                toArray()
                {
                    let e;
                    if (this.isEmpty)
                        e = [];
                    else if (this._start < this._end)
                        e = this._buffer.slice(this._start, this._end);
                    else {
                        e = new Array(this.size);
                        let t = 0;
                        for (let n = this._start; n < this.capacity; ++n, ++t)
                            e[t] = this._buffer[n];
                        for (let n = 0; n < this._end; ++n, ++t)
                            e[t] = this._buffer[n]
                    }
                    return e
                }
            }
        },
        63982: (e, t, n) => {
            function r(e) {
                return "object" == typeof e && null !== e && "message" in e && "string" == typeof e.message
            }
            n.d(t, {
                H: () => r
            })
        },
        48015: (e, t, n) => {
            n.d(t, {
                DV: () => d,
                EI: () => f,
                HO: () => b,
                Nf: () => g,
                P2: () => v,
                Vo: () => w,
                X0: () => p,
                XD: () => y,
                bc: () => E,
                cq: () => a,
                fQ: () => h,
                fS: () => o,
                hr: () => S,
                hz: () => m,
                iy: () => x,
                vE: () => u,
                wU: () => l,
                xB: () => s
            });
            var r = n(3103),
                i = n(5957);
            const o = r.f;
            class s {
                constructor(e)
                {
                    this._getFallbackValue = e
                }
                init(e)
                {
                    if (void 0 !== this._value)
                        throw new Error("Global value already initialized.");
                    this._value = e
                }
                get()
                {
                    if (void 0 === this._value) {
                        if (void 0 === this._getFallbackValue)
                            throw new Error("Global value not initialized and no fallback value provided.");
                        this._value = this._getFallbackValue()
                    }
                    return this._value
                }
            }
            function a(e, t) {
                return e.some((e => e === t)) ? t : void 0
            }
            class c extends Error {
                constructor(e)
                {
                    super(`Matching not exhaustive: unexpected value ${JSON.stringify(e)}`)
                }
            }
            function u(e) {
                throw new c(e)
            }
            function l(e) {
                if ("string" == typeof e) {
                    const t = parseInt(e, 10);
                    return isNaN(t) ? void 0 : t
                }
                return "number" == typeof e ? e : void 0
            }
            function d(e, t) {
                try {
                    return e()
                } catch (e) {
                    return t(e)
                }
            }
            function f() {}
            function h(e) {
                return !!e
            }
            function p(e) {
                return !e
            }
            function g(e) {
                return null != e
            }
            function m(e) {
                let t,
                    n = !1;
                return (...r) => (n || (n = !0, t = e(...r)), t)
            }
            function b(e, t, n) {
                const r = new Set;
                let i;
                return (...o) => {
                    const s = t(...o);
                    return r.has(s) || (r.add(s), i = e(...o)), null == n || n(...o), i
                }
            }
            function v(e, t) {
                let n,
                    r,
                    o = !0;
                function s(e, n) {
                    return o && (o = !1, r = (0, i.II)(), setTimeout((() => {
                        try {
                            r.resolve(t(...n))
                        } catch (e) {
                            r.reject(e)
                        } finally {
                            o = !0
                        }
                    }), e)), r.promise
                }
                return (...t) => {
                    const r = n;
                    return n = Date.now(), s(void 0 === r || n - r >= e ? 0 : e - (n - r), t)
                }
            }
            async function y(e, t, n) {
                const r = n();
                if (!(e > 0))
                    return r;
                try {
                    return await r
                } catch (r) {
                    return await (0, i.gw)(t), y(e - 1, t, n)
                }
            }
            class _ {
                constructor(e)
                {
                    this._factory = e,
                    this._hasValue = !1
                }
                get hasValue()
                {
                    return this._hasValue
                }
                get()
                {
                    return this._hasValue || (this._value = this._factory(), this._hasValue = !0), this._value
                }
                map(e)
                {
                    return new _((() => e(this.get())))
                }
            }
            function w(e) {
                return new _(e)
            }
            var x;
            !function(e) {
                function t() {
                    return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
                }
                e.create = function() {
                    return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
                }
            }(x || (x = {}));
            void 0 !== self.requestIdleCallback && self.requestIdleCallback;
            function E(...e) {
                return e
            }
            function S(e) {
                return e.replace(/[.*+?()[\]{}^$\\/|]/g, "\\$&")
            }
        },
        27270: (e, t, n) => {
            n.d(t, {
                x: () => r
            });
            var r,
                i = n(55649),
                o = n(74444),
                s = n(30857);
            !function(e) {
                function t(e) {
                    return {
                        message: e.message,
                        stack: e.stack
                    }
                }
                function n(e) {
                    try {
                        return !(0, s.HD)(JSON.stringify(e))
                    } catch (e) {
                        return e.message.includes("Converting circular structure to JSON")
                    }
                }
                e.normalizeExeption = t,
                e.isCircularObject = n,
                e.normalizeData = function e(r) {
                    try {
                        return self.HTMLElement && r instanceof self.HTMLElement ? {
                            type: (s = r).nodeName,
                            html: s.outerHTML,
                            attributes: Array.from(s.attributes).reduce(((e, t) => Object.assign(Object.assign({}, e), {
                                [t.nodeName]: t.nodeValue
                            })), {})
                        } : r instanceof Error ? t(r) : Array.isArray(r) ? r.map((t => e(t))) : "function" == typeof r ? `${r.name}()` : (0, o.Kn)(r) ? n(r) ? t(new Error("Couldn't normalize circular data!")) : Object.keys(r).reduce(((t, n) => Object.assign(Object.assign({}, t), {
                            [n]: e(r[n])
                        })), {}) : r
                    } catch (e) {
                        return i.Y.create("HistoryLogNormalizer").error("cannot normalize data", e, r), t(new Error("Data normalization fail!"))
                    }
                    var s
                }
            }(r || (r = {}))
        },
        37328: (e, t, n) => {
            n.d(t, {
                f: () => u
            });
            var r,
                i = n(98805),
                o = n(48015),
                s = n(55649),
                a = n(54074),
                c = n(53649);
            !function(e) {
                e.UPDATE_BACKUP_STORAGE_TIMEOUT = i.m9(5),
                e.BACKUP_STORAGE_LOGS_CAPACITY = 100
            }(r || (r = {}));
            class u {
                constructor(e, t, n, i=o.P2, a=s.Y.create(u.name, {
                    skipWriteToHistoryLogger: !0
                }))
                {
                    this._sessionStorage = e,
                    this._key = t,
                    this._skipSetLogs = n,
                    this._throttle = i,
                    this._log = a,
                    this.get = () => this._get(),
                    this._get = c.r.getLogsFromSessionStorageFallbackGetter(this._key, (() => this._sessionStorage)),
                    this.set = this._throttle(r.UPDATE_BACKUP_STORAGE_TIMEOUT, this._set.bind(this))
                }
                async _set(e)
                {
                    var t;
                    if (await (null === (t = this._skipSetLogs) || void 0 === t ? void 0 : t.call(this)))
                        return void this._log.trace("set logs is skipped");
                    const n = null == e ? void 0 : e.slice(-r.BACKUP_STORAGE_LOGS_CAPACITY).map((e => {
                        try {
                            return JSON.stringify(e)
                        } catch (t) {
                            return this._log.warn("cannot parse properly backup storage data", t, e), JSON.stringify({
                                level: a.i.WARN,
                                loggerName: e.loggerName,
                                message: e.message,
                                timestamp: e.timestamp,
                                exception: `cannot parse properly backup storage data: ${t.message}`
                            })
                        }
                    }));
                    return this._log.trace("set new logs to session storage"), this._sessionStorage.set({
                        [this._key]: n
                    }).then((() => this._log.trace("logs was successfully set"))).catch((e => {
                        this._log.warn(`error: on set ${this._key} logs to backup storage`, e),
                        this._sessionStorage.remove(this._key).catch((e => this._log.warn(`error: on remove ${this._key} logs from backup storage`, e)))
                    }))
                }
            }
        },
        54074: (e, t, n) => {
            var r;
            n.d(t, {
                i: () => r,
                s: () => o
            }),
            function(e) {
                e.TRACE = "TRACE",
                e.DEBUG = "DEBUG",
                e.INFO = "INFO",
                e.WARN = "WARN",
                e.ERROR = "ERROR",
                e.FATAL = "FATAL"
            }(r || (r = {}));
            const i = {
                [r.TRACE]: 1,
                [r.DEBUG]: 2,
                [r.INFO]: 3,
                [r.WARN]: 4,
                [r.ERROR]: 5,
                [r.FATAL]: 6
            };
            function o(e) {
                return i[e] || 0
            }
        },
        65963: (e, t, n) => {
            n.d(t, {
                x: () => i
            });
            var r = n(48024);
            class i extends r.rK {
                constructor(e, t, n, r)
                {
                    var i,
                        o;
                    super(e),
                    this._config = t,
                    this._historyLogsService = n,
                    this._loggerSettings = r,
                    this._buffer = (null === (i = this._loggerSettings) || void 0 === i ? void 0 : i.historyBufferSettings) ? {
                        name: this.name,
                        settings: null === (o = this._loggerSettings) || void 0 === o ? void 0 : o.historyBufferSettings
                    } : null
                }
                handleEvent(e)
                {
                    var t,
                        n;
                    this._config.filterFn(e) && !(null === (t = this._loggerSettings) || void 0 === t ? void 0 : t.skipWriteToConsole) && this._config.writer.write(e),
                    this._historyLogsService.isHistoryEnabled() && !(null === (n = this._loggerSettings) || void 0 === n ? void 0 : n.skipWriteToHistoryLogger) && this._historyLogsService.pushLog(this._buffer, e)
                }
                isHistoryEnabled()
                {
                    return this._historyLogsService.isHistoryEnabled()
                }
                isAdvancedHistoryEnabled()
                {
                    return this._historyLogsService.isAdvancedHistoryEnabled()
                }
            }
        },
        37642: (e, t, n) => {
            n.d(t, {
                Lr: () => c
            });
            var r = n(56913),
                i = n(74211),
                o = n(27270);
            const s = "common";
            function a(e) {
                return e === s ? "common." : ""
            }
            class c {
                constructor(e)
                {
                    var t;
                    this._historyArgs = e,
                    this._historyBuffers = {},
                    this.isHistoryEnabled = () => {
                        var e;
                        return Boolean("prod" !== (0, r.dU)() || (null === (e = this._historyArgs.enabledInProd) || void 0 === e ? void 0 : e.get()))
                    },
                    this.isAdvancedHistoryEnabled = () => {
                        var e,
                            t;
                        return Boolean("prod" !== (0, r.dU)() || (null === (e = this._historyArgs.enabledInProd) || void 0 === e ? void 0 : e.get()) && (null === (t = this._historyArgs.enableAdvancedInProd) || void 0 === t ? void 0 : t.get()))
                    },
                    this.getLogs = () => Object.entries(this._historyBuffers).map((([e, t]) => t.toArray().map((t => Object.assign(Object.assign({}, t), {
                        data: o.x.normalizeData(t.data),
                        loggerName: a(e) + t.loggerName,
                        exception: t.exception ? o.x.normalizeExeption(t.exception) : void 0
                    }))))).flat(),
                    this._updateBackupStorage = () => {
                        var e;
                        null === (e = this._historyArgs.backupStorage) || void 0 === e || e.set(this._getBuffer(null).toArray())
                    },
                    this._initCliCommands(),
                    this._historyBuffers.common = new i.P(null !== (t = this._historyArgs.maxEventsToStore) && void 0 !== t ? t : 1e3)
                }
                _getBuffer(e)
                {
                    return e ? (this._historyBuffers[e.name] || (this._historyBuffers[e.name] = new i.P(e.settings.limit)), this._historyBuffers[e.name]) : this._historyBuffers.common
                }
                pushLog(e, t)
                {
                    this._getBuffer(e).enqueue(t),
                    this._updateBackupStorage()
                }
                _initCliCommands()
                {
                    self.GRIsDebugEnabled = () => this.isHistoryEnabled(),
                    self.GREnableHistoryLogger = (e=60) => {
                        var t,
                            n;
                        null === (n = (t = this._historyArgs).enableHistoryLoggerUntil) || void 0 === n || n.call(t, Date.now() + 60 * e * 1e3)
                    },
                    self.GRDisableHistoryLogger = () => {
                        var e,
                            t;
                        null === (t = (e = this._historyArgs).disableHistoryLogger) || void 0 === t || t.call(e)
                    }
                }
                static create(e)
                {
                    return e.isBG ? new u(e) : new l(e)
                }
            }
            class u extends c {
                constructor(e)
                {
                    super(e),
                    this._historyArgs = e,
                    this._syncInitialStateWithStorage()
                }
                _syncInitialStateWithStorage()
                {
                    var e;
                    null === (e = this._historyArgs.backupStorage) || void 0 === e || e.get().then((e => {
                        if (!e)
                            return;
                        const t = this._getBuffer(null),
                            n = t.toArray();
                        t.clear(),
                        e.forEach((e => t.enqueue(e))),
                        n.forEach((e => t.enqueue(e))),
                        this._updateBackupStorage()
                    }))
                }
            }
            class l extends c {}
        },
        55649: (e, t, n) => {
            n.d(t, {
                Y: () => r
            });
            var r,
                i = n(88133),
                o = n(48024);
            !function(e) {
                e.create = function(e, t) {
                    return new o.rl(e, (() => (0, i.O)().logger.create(e, t)))
                }
            }(r || (r = {}))
        },
        11047: (e, t, n) => {
            n.d(t, {
                x: () => i
            });
            var r = n(54074);
            const i = e => t => (0, r.s)(t.level) >= (0, r.s)(e)
        },
        67140: (e, t, n) => {
            n.d(t, {
                g: () => r
            });
            var r,
                i = n(54074),
                o = n(51017);
            !function(e) {
                e.LEVEL = {
                    [i.i.TRACE]: "color: white; background: orange;",
                    [i.i.DEBUG]: "color: black; background: #ffdc00;",
                    [i.i.INFO]: "color: black; background: #abdcfb",
                    [i.i.WARN]: "color: white; background: darkorange;",
                    [i.i.ERROR]: "color: white; background: red;",
                    [i.i.FATAL]: "color: white; background: darkred;"
                },
                e.GRAMMARLY = "color: black; background: #bada55;";
                const t = new Map;
                function n(e, t) {
                    return e + Math.floor(Math.random() * (t - e + 1))
                }
                function r(e) {
                    return `color: ${e.isDark ? "white" : "black"}; background: rgb(${e.red}, ${e.green}, ${e.blue})`
                }
                e.getLoggerName = function(e) {
                    const i = t.get(e);
                    if (i)
                        return r(i);
                    const o = n(0, 255),
                        s = n(0, 255),
                        a = n(0, 255),
                        c = {
                            red: o,
                            green: s,
                            blue: a,
                            isDark: Math.sqrt(o * o * .299 + s * s * .587 + a * a * .114) < 127.5
                        };
                    return t.set(e, c), r(c)
                },
                e.RESET_DEFAULT = "color: reset;",
                e.RESET_DEBUG = `color: ${(0, o.Y)() ? "white" : "black"};`,
                e.getReset = function(t) {
                    return t !== i.i.TRACE && t !== i.i.DEBUG ? e.RESET_DEFAULT : t === i.i.TRACE || t === i.i.DEBUG ? e.RESET_DEBUG : e.RESET_DEFAULT
                },
                e.outputLog = function(e) {
                    return [`grm ${e.level} [${e.loggerName}] ░░ ${e.message}`]
                }
            }(r || (r = {}))
        },
        54329: (e, t, n) => {
            n.d(t, {
                n: () => s
            });
            var r = n(52622),
                i = n(54074),
                o = n(67140);
            class s {
                constructor()
                {
                    this._writeFunc = s._commonWriteFunc
                }
                write(e)
                {
                    try {
                        const t = o.g.outputLog(e);
                        e.data && t.push(e.data),
                        e.exception && t.push(e.exception),
                        this._writeFunc[e.level].apply(null, t)
                    } catch (e) {}
                }
            }
            s._commonWriteFunc = function() {
                const {debug: e, info: t, warn: n, error: o} = (0, r.a)(console);
                return {
                    [i.i.TRACE]: e,
                    [i.i.DEBUG]: e,
                    [i.i.INFO]: t,
                    [i.i.WARN]: n,
                    [i.i.ERROR]: o,
                    [i.i.FATAL]: o
                }
            }()
        },
        48024: (e, t, n) => {
            n.d(t, {
                rK: () => i,
                rl: () => o
            });
            var r = n(54074);
            class i {
                constructor(e)
                {
                    this.name = e,
                    this._isError = e => {
                        const t = e;
                        return t && (void 0 !== t.message && void 0 !== t.name || void 0 !== t.stack)
                    }
                }
                trace(e, t, n)
                {
                    this._logMessage(r.i.TRACE, e, t, n)
                }
                debug(e, t, n)
                {
                    this._logMessage(r.i.DEBUG, e, t, n)
                }
                info(e, t, n)
                {
                    this._logMessage(r.i.INFO, e, t, n)
                }
                warn(e, t, n)
                {
                    this._logMessage(r.i.WARN, e, t, n)
                }
                error(e, t, n)
                {
                    this._logMessage(r.i.ERROR, e, t, n)
                }
                fatal(e, t, n)
                {
                    this._logMessage(r.i.FATAL, e, t, n)
                }
                _logMessage(e, t, n, r)
                {
                    const i = {
                        level: e,
                        loggerName: this.name,
                        message: t,
                        timestamp: Date.now()
                    };
                    n && (this._isError(n) ? i.exception = n : i.data = n),
                    i.data = i.data || r,
                    this.handleEvent(i)
                }
            }
            class o {
                constructor(e, t)
                {
                    this.name = e,
                    this._createLogger = t
                }
                trace(e, t, n)
                {
                    void 0 === this._logger && (this._logger = this._createLogger(this.name)),
                    this._logger.trace(e, t, n)
                }
                debug(e, t, n)
                {
                    void 0 === this._logger && (this._logger = this._createLogger(this.name)),
                    this._logger.debug(e, t, n)
                }
                info(e, t, n)
                {
                    void 0 === this._logger && (this._logger = this._createLogger(this.name)),
                    this._logger.info(e, t, n)
                }
                warn(e, t, n)
                {
                    void 0 === this._logger && (this._logger = this._createLogger(this.name)),
                    this._logger.warn(e, t, n)
                }
                error(e, t, n)
                {
                    void 0 === this._logger && (this._logger = this._createLogger(this.name)),
                    this._logger.error(e, t, n)
                }
                fatal(e, t, n)
                {
                    void 0 === this._logger && (this._logger = this._createLogger(this.name)),
                    this._logger.fatal(e, t, n)
                }
                isHistoryEnabled()
                {
                    return !1
                }
                isAdvancedHistoryEnabled()
                {
                    return !1
                }
            }
        },
        84701: (e, t, n) => {
            n.d(t, {
                C2: () => r,
                J6: () => o,
                M$: () => a,
                Pe: () => i,
                m: () => s
            });
            const r = e => i(e, .5),
                i = (e, t) => {
                    if (0 === e.length)
                        return 0;
                    const n = [...e].sort(((e, t) => e - t));
                    if (t <= 0)
                        return n[0];
                    if (t >= 1)
                        return n[n.length - 1];
                    const r = (n.length - 1) * (100 * t) / 100,
                        i = Math.floor(r),
                        o = i + 1,
                        s = r % 1;
                    return n[i] * (1 - s) + n[o] * s
                },
                o = e => e.reduce(((e, t, n) => e + (t - e) / (n + 1)), 0),
                s = (e, t) => {
                    const n = void 0 === t ? o(e) : t;
                    return e.length > 1 ? Math.sqrt(e.reduce(((e, t) => e + (t - n) ** 2), 0) / (e.length - 1)) : 0
                };
            function a(e, t, n=.001) {
                return e === t || Math.abs(e - t) <= n
            }
        },
        74444: (e, t, n) => {
            function r(e, t) {
                const n = {};
                return Object.keys(t).forEach((r => n[r] = e(r, t[r]))), n
            }
            function i(e, t) {
                const n = {};
                return Object.keys(t).forEach((r => {
                    e(r, t[r]) && (n[r] = t[r])
                })), n
            }
            function o(e) {
                return Object.entries(e)
            }
            function s(e) {
                const t = {};
                for (const [n, r] of e)
                    t[n] = r;
                return t
            }
            function a(e, t) {
                return t.map((t => e[t]))
            }
            n.d(t, {
                Kn: () => c,
                RH: () => u,
                UI: () => r,
                Ue: () => s,
                X: () => o,
                hX: () => i,
                jg: () => a,
                vZ: () => l
            });
            const c = e => e === Object(e) && !Array.isArray(e);
            function u(e, ...t) {
                if (!t.length || !c(e))
                    return e;
                const n = e,
                    r = t.length;
                for (let i = 0; i < r; i += 1) {
                    const r = t[i];
                    if (c(r))
                        for (const t in r)
                            if (r.hasOwnProperty(t)) {
                                const i = r[t],
                                    o = e[t];
                                c(i) ? (o && c(o) || (n[t] = {}), u(n[t], i)) : Array.isArray(o) && Array.isArray(i) ? n[t] = Array.from(new Set(o.concat(i))) : n[t] = Array.isArray(i) ? Array.from(i) : i
                            }
                }
                return e
            }
            function l(e, t) {
                if (e === t)
                    return !0;
                if (d(e) || d(t))
                    return e === t;
                if (Object.keys(e).length !== Object.keys(t).length)
                    return !1;
                for (const n in e) {
                    if (!(n in t))
                        return !1;
                    if (!l(e[n], t[n]))
                        return !1
                }
                return !0
            }
            function d(e) {
                return e !== Object(e)
            }
        },
        5957: (e, t, n) => {
            function r(e) {
                return new Promise((t => setTimeout(t, e)))
            }
            function i() {
                let e,
                    t;
                return {
                    promise: new Promise(((n, r) => {
                        e = n,
                        t = r
                    })),
                    resolve: e,
                    reject: t
                }
            }
            function o(e) {
                return new Promise(((t, n) => {
                    e.then(n, t)
                }))
            }
            function s(e) {
                return o(Promise.all([...e].map(o)))
            }
            n.d(t, {
                Fb: () => u,
                II: () => i,
                Wp: () => s,
                gw: () => r
            });
            class a extends Error {}
            function c(e) {
                return new Promise(((t, n) => setTimeout((() => n(new a("Promise timed out."))), e)))
            }
            function u(e, t) {
                return Promise.race([c(e), t])
            }
        },
        64373: (e, t, n) => {
            n.d(t, {
                Gx: () => k,
                Vh: () => E,
                WV: () => R,
                d5: () => r,
                s8: () => x,
                yF: () => S
            });
            var r,
                i = n(44586),
                o = n(33665),
                s = n(81407),
                a = n(24209),
                c = n(91402),
                u = n(80900),
                l = n(95399),
                d = n(38194),
                f = n(89068),
                h = n(23063),
                p = n(62365),
                g = n(85321),
                m = n(36919),
                b = n(68425),
                v = n(41398),
                y = n(85985),
                _ = n(77176),
                w = n(22232);
            function x(e) {
                return e instanceof i.y ? e : new i.y((t => e.subscribe(t)))
            }
            function E(e) {
                return t => {
                    const n = t.pipe((0, d.B)()),
                        [r, i] = (0, s.u)(n, ((e, t) => 0 === t));
                    return (0, a.T)(r.pipe((0, f.V)(e), (0, h.q)(1)), i)
                }
            }
            function S(e, t, n=(e => (0, c._)(e))) {
                return O(e, {
                    type: "exponentialBackoff",
                    initialDelayMs: t
                }, n)
            }
            function R(e, t, n=(e => (0, c._)(e))) {
                return O(e, {
                    type: "linear",
                    initialDelayMs: t
                }, n)
            }
            function O(e, t, n=(e => (0, c._)(e))) {
                return (0, p.a)((r => r.pipe((0, g.zg)(((r, i) => {
                    const o = i + 1;
                    return o > e ? n(r) : (0, u.H)("exponentialBackoff" === t.type ? o * o * t.initialDelayMs : "linear" === t.type ? t.initialDelayMs : (0, w.vE)(t.type))
                })))))
            }
            function k(e) {
                return t => {
                    const n = t.pipe((0, d.B)()),
                        r = e.pipe((0, h.q)(1));
                    return (0, l.z)(n.pipe((0, m.f)(r), (0, b.J)()), n).pipe((0, v.M)(r), (0, y.h)((([e, t]) => !0 === t)), (0, _.U)((([e, t]) => e)))
                }
            }
            !function(e) {
                e.measure = e => t => new i.y((n => t.subscribe((t => e((() => n.next(t)))), (e => n.error(e)), (() => n.complete())))),
                e.using = (e, t) => (0, o.g)(e, t),
                e.doNothing = e => e
            }(r || (r = {}))
        },
        82990: (e, t, n) => {
            n.d(t, {
                O: () => r
            });
            var r,
                i = n(5957);
            !function(e) {
                class t extends Error {
                    constructor(e, t=1e3)
                    {
                        super(`SafePromiseError: ${e}`),
                        this.stack = (super.stack || "").slice(t)
                    }
                }
                function n(e) {
                    return e.catch((e => e instanceof Error && !e.stack ? Promise.reject(new t(e.message)) : Promise.reject(e)))
                }
                e.fromPromise = n,
                e.fromAsync = function(e) {
                    return (...t) => n(e(...t))
                },
                e.noop = e.fromPromise(Promise.resolve()),
                e.create = function(e) {
                    return n(new Promise(e))
                },
                e.sync = function(e) {
                    return n(new Promise(((t, n) => t(e()))))
                },
                e.createCompletionSource = i.II,
                e.delay = i.gw
            }(r || (r = {}))
        },
        98805: (e, t, n) => {
            n.d(t, {
                E0: () => r,
                LK: () => l,
                Xd: () => d,
                Z7: () => i,
                an: () => c,
                iL: () => a,
                m9: () => u,
                xO: () => o
            });
            const r = 1e3,
                i = 60 * r,
                o = 60 * i,
                s = 24 * o,
                a = 30 * s;
            function c(e) {
                return e * s
            }
            function u(e) {
                return e * r
            }
            function l(e) {
                return e * i
            }
            function d(e) {
                return r / e
            }
        },
        30857: (e, t, n) => {
            function r(e) {
                return Number.isFinite(e) || e === Number.NEGATIVE_INFINITY || e === Number.POSITIVE_INFINITY
            }
            function i(e) {
                return "string" == typeof e
            }
            n.d(t, {
                HD: () => i,
                hj: () => r
            })
        },
        3766: (e, t, n) => {
            n.d(t, {
                M0: () => w
            });
            var r = n(6294),
                i = n(90020),
                o = n(48015),
                s = n(55649),
                a = n(63982),
                c = n(93401),
                u = n(75463),
                l = n(56913),
                d = n(65782),
                f = n(68840),
                h = function(e, t) {
                    var n = {};
                    for (var r in e)
                        Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
                    if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                        var i = 0;
                        for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
                            t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]])
                    }
                    return n
                };
            const p = s.Y.create("lib.tracking.telemetry"),
                g = .1,
                m = .05,
                b = .01;
            var v;
            !function(e) {
                e.getMapPageCount = e => void 0 === e.mapPageCount ? void 0 : e.mapPageCount > 10 ? "10+" : e.mapPageCount
            }(v || (v = {}));
            const y = e => e.substring(0, 5),
                _ = (e, t) => {
                    let n;
                    try {
                        n = JSON.stringify(t)
                    } catch (t) {
                        n = `stringify fail: '${String(t)}', '${(0, a.H)(t) ? t.message : "undefined"}'`,
                        p.warn(n, e)
                    }
                    return n
                };
            class w {
                constructor(e=o.EI, t=o.EI, n=o.EI, s=o.EI, w=!1, x=c.Rv.dummyFactoryInitialization, E=o.EI, k=o.EI, I=(e => .01), T=o.EI, A=x(((e, t) => {
                    var {hideUserInfo: n} = t,
                        r = h(t, ["hideUserInfo"]);
                    this._sendEvent(Object.assign({
                        logger: e,
                        level: i.in.INFO,
                        hideUserInfo: n
                    }, (0, i._x)(r)))
                })), F=o.EI, N=o.EI, C=o.EI, P=o.EI, j=o.EI)
                {
                    this._sendFelog = e,
                    this._sendFelogUsage = t,
                    this._setUserInfo = n,
                    this._setContainerId = s,
                    this._sendUsageMetrics = w,
                    this._sendFelogEvent = E,
                    this._sendFelogCrashLogs = k,
                    this._getUsageMetricsRate = I,
                    this._enableDataSharing = T,
                    this._createPerfLogger = A,
                    this._sendFelogMetricEvent = F,
                    this._sendFemetricsRate = N,
                    this._startFemetricsTimer = C,
                    this._endFemetricsTimer = P,
                    this._sendFemetricsTimer = j,
                    this._sendEvent = e => {
                        try {
                            this._sendFelogEvent(e)
                        } catch (t) {
                            p.warn(`Failed to send felog for ${JSON.stringify(e)}`, t)
                        }
                    },
                    this._sendException = e => (t, n, r) => {
                        let i;
                        i = r || ((0, a.H)(t) ? t.message : String(t)),
                        this._sendEvent(Object.assign(Object.assign({
                            message: i
                        }, e), {
                            extra: Object.assign(Object.assign({}, e.extra), (0, f.nG)(n, t))
                        }))
                    },
                    this._sendUsageMetricsSamplingRatio = this._getUsageMetricsRate(r.Rd().bundleInfo.browser),
                    this.sendFemetricsRate = (e, t, n) => {
                        this._sendFemetricsRate(e, t, n)
                    },
                    this.startFemetricsTimer = (e, t, n) => {
                        this._startFemetricsTimer(e, t, performance.now(), n)
                    },
                    this.endFemetricsTimer = (e, t, n) => {
                        this._endFemetricsTimer(e, t, performance.now(), n)
                    },
                    this.restoredBgConnection = e => {
                        this._send("cs.connection.bg.restored", i.in.INFO, {
                            timeWithoutConnection: e
                        })
                    },
                    this.initWithoutBgConnection = () => {
                        this._send("cs.connection.bg.disconnected", i.in.INFO)
                    },
                    this.fetchDefinitionsFail = () => {
                        this._send("cs.connection.api.definition.failed", i.in.WARN)
                    },
                    this.tooLongPageConfigInit = e => {
                        this._send("cs.pageConfig.init.exceeded", i.in.WARN, {
                            initTime: e
                        })
                    },
                    this.tooLongUserUpdateTime = e => {
                        this._send("bg.state.user.update.exceeded", i.in.WARN, {
                            updateTime: e
                        })
                    },
                    this.lostBgPageConnection = () => {
                        this._send("cs.gbutton.bgСonnection.lost", i.in.INFO)
                    },
                    this.restoreBgPageConnection = e => {
                        this._send("cs.gbutton.bgСonnection.restored", i.in.INFO, {
                            time: e
                        })
                    },
                    this.dynamicConfigLoadFromPrefsError = e => {
                        this._sendSampled(b, "bg.dynamicConfig.prefs.load.error", i.in.ERROR, {
                            message: e
                        })
                    },
                    this.dynamicConfigSaveToPrefsError = e => {
                        this._sendSampled(b, "bg.dynamicConfig.prefs.save.error", i.in.ERROR, {
                            message: e
                        })
                    },
                    this.dynamicConfigLoadFromServerError = e => {
                        this._sendSampled(b, "bg.dynamicConfig.server.load.error", i.in.ERROR, {
                            message: e
                        })
                    },
                    this.pageConfigCDNError = e => {
                        this._send("cs.pageConfig.cdn.error", i.in.ERROR, {
                            message: e
                        })
                    },
                    this.pageConfigLocalStorageError = (e, t) => {
                        this._send("cs.pageConfig.localStorage.error", i.in.INFO, {
                            message: e,
                            name: t
                        })
                    },
                    this.pageConfigUpdated = (e, t) => {
                        this._send("cs.pageConfig.updated", i.in.INFO, {
                            oldVersion: e,
                            newVersion: t
                        })
                    },
                    this.settingsPopupTimeout = () => {
                        this._send("settings.popup.init.timeout", i.in.WARN)
                    },
                    this.settingsUsupportedShow = e => {
                        this._send("settings.popup.state.unsupported.show", i.in.INFO, {
                            popupType: e
                        })
                    },
                    this.gnarClientInitFail = e => {
                        this._send("gnar.bg.tracking.gnar.init.fail", i.in.WARN, {
                            message: e
                        })
                    },
                    this.bgTrackingInitFail = () => {
                        this._send("debug.tracking.init.fail", i.in.INFO)
                    },
                    this.userUpgradeClick = e => {
                        this._send("cs.ui.action.upgradeClick", i.in.INFO, {
                            placement: e
                        })
                    },
                    this.gGbUpHookClick = () => {
                        this._send("cs.ui.gb.uphook.click", i.in.INFO)
                    },
                    this.gButtonClick = () => {
                        this._send("cs.ui.gbutton.click", i.in.INFO)
                    },
                    this.unexpectedAnonymous = e => {
                        this._send("debug.bg.session.unexpectedAnonymous", i.in.INFO, e)
                    },
                    this.getDapiPropError = (e, t) => {
                        const n = "bg.connection.dapi.getProp.error",
                            r = _(n, {
                                statusCode: e,
                                message: t
                            });
                        this._sendEvent({
                            logger: n,
                            level: i.in.WARN,
                            extra: {
                                json: r
                            },
                            sendToFemetrics: !0
                        })
                    },
                    this.getCheetahStatusError = (e, t) => {
                        const n = "bg.connection.cheetahSettings.getStatus.error",
                            r = _(n, {
                                statusCode: e,
                                message: t
                            });
                        this._sendEvent({
                            logger: n,
                            level: i.in.WARN,
                            extra: {
                                json: r
                            },
                            sendToFemetrics: !0
                        })
                    },
                    this.bgApiServiceRequestSuccess = (e, t="GET", n) => {
                        this.sendFemetricsRate("info", {
                            domain: e,
                            context: n ? "accessToken enabled" : "accessToken not enabled",
                            logger: "bg.api.service.request.success",
                            message: `[${t.toUpperCase()}]`
                        })
                    },
                    this.bgApiServiceRequestFailed = (e, t="GET", n, r) => {
                        this.sendFemetricsRate("warn", {
                            domain: e,
                            context: r ? "accessToken enabled" : "accessToken not enabled",
                            message: `[${t.toUpperCase()}] ${n}`,
                            logger: "bg.api.service.request.failed"
                        })
                    },
                    this.setDapiPropError = (e, t) => {
                        const n = "bg.connection.dapi.setProp.error",
                            r = _(n, {
                                statusCode: e,
                                message: t
                            });
                        this._sendEvent({
                            logger: n,
                            level: i.in.WARN,
                            extra: {
                                json: r
                            },
                            sendToFemetrics: !0
                        })
                    },
                    this.toggleExtensionDefs = e => {
                        this._send("bg.settings.definitions.toggle", i.in.INFO, {
                            enabled: e
                        })
                    },
                    this.toggleExtension = (e, t, n) => {
                        const r = {
                            enabled: e,
                            placement: t,
                            domain: n
                        };
                        this._sendEvent({
                            logger: "bg.settings.extension.toggle",
                            level: i.in.INFO,
                            sendToFemetrics: !0,
                            extra: {
                                json: (0, f.jA)(r)
                            },
                            femetricsExtra: r
                        })
                    },
                    this.disableUntilNextVisit = () => {
                        this._send("cs.gbutton.disableUntilNextVisit", i.in.INFO)
                    },
                    this.disableButtonClick = () => {
                        this._send("cs.gbutton.disableButtonClick", i.in.INFO)
                    },
                    this.cookieOverflow = (e, t) => {
                        this._send("debug.bg.state.cookie.overflow", i.in.INFO, {
                            size: e,
                            biggestCookie: t
                        })
                    },
                    this.externalChangePlan = () => {
                        this._send("bg.api.external.changePlan", i.in.INFO)
                    },
                    this.externalChangeDialect = () => {
                        this._send("bg.api.external.changeDialect", i.in.INFO)
                    },
                    this.externalChangeUser = () => {
                        this._send("bg.api.external.changeUsed", i.in.INFO)
                    },
                    this.externalLogout = () => {
                        this._send("bg.api.external.logout", i.in.INFO)
                    },
                    this.safariLogoutFail = e => {
                        this._sendEvent({
                            logger: "bg.safari.logout.error",
                            level: i.in.INFO,
                            message: e,
                            sendToFemetrics: !0
                        })
                    },
                    this.csInitialized = e => {
                        if ("message" in e) {
                            const t = (0, u.FN)();
                            this._sendFemetricsRate("csInitialized", {
                                message: e.message,
                                isIframe: e.isIframe,
                                stage: e.stage,
                                domain: t,
                                context: e.context
                            });
                            const n = (0, l.bo)();
                            this._sendEvent({
                                level: i.in.INFO,
                                logger: "csFailInitializedVersion",
                                extra: {
                                    json: JSON.stringify({
                                        csVersion: n
                                    })
                                }
                            }),
                            this._sendFemetricsRate("csFailInitializedVersion", {
                                csVersion: n
                            }),
                            "facebook.com" === t && this._sendEvent({
                                level: i.in.INFO,
                                logger: "csInitializedFailed",
                                message: e.message,
                                extra: {
                                    json: JSON.stringify({
                                        isIframe: e.isIframe,
                                        stage: e.stage,
                                        url: self.location.href,
                                        context: e.context
                                    })
                                },
                                hideUserInfo: !0
                            })
                        } else
                            this._sendFemetricsRate("csInitialized", e, ["firstInstall", "registrationDate"])
                    },
                    this.bgPageStartFail = this._sendException({
                        logger: "bg.start.fail",
                        level: i.in.ERROR
                    }),
                    this.acceptDataControl = () => {
                        this._send("bg.dataControl.accepted", i.in.INFO)
                    },
                    this.bgPageInitTimeout = e => {
                        this._send("bg.state.start.timeout", i.in.WARN, {
                            initTime: e
                        })
                    },
                    this.bgPageInitFail = e => {
                        this._send("bg.state.init.fail", i.in.ERROR, {
                            initAttempts: e
                        })
                    },
                    this.bgPage = {
                        bgPageStarted: (e, t) => {
                            this._sendFemetricsRate("bgPageStarted", {
                                context: e,
                                time: t
                            })
                        }
                    },
                    this.popup = {
                        popupInitFail: (e, t) => {
                            this._sendEvent({
                                logger: "popup.init.fail",
                                level: i.in.ERROR,
                                message: e,
                                extra: t,
                                femetricsMessage: y(e)
                            })
                        },
                        fetchTreatmentsFail: e => {
                            this._sendFemetricsRate("popupFetchTreatmentsFails", {
                                message: y(e)
                            })
                        },
                        popupStateInitFail: e => {
                            this._sendEvent({
                                logger: "popup.state.init.fail",
                                level: i.in.ERROR,
                                message: e,
                                femetricsMessage: y(e)
                            })
                        },
                        initSuccess: () => {
                            this._sendEvent({
                                logger: "popup.init.success",
                                level: i.in.INFO,
                                sendToFemetrics: !0
                            })
                        }
                    },
                    this.extensionUpdated = (e, t) => {
                        this._send("bg.state.updated", i.in.INFO, {
                            currentVersion: e,
                            previousVersion: t
                        })
                    },
                    this.extensionUpdateFail = e => {
                        this._send("bg.state.update.fail", i.in.INFO, {
                            previousVersion: e
                        })
                    },
                    this.cannotGetInstallSource = () => {
                        this._send("bg.getSource.fail", i.in.WARN)
                    },
                    this.extensionInstall = e => {
                        this._sendEvent({
                            logger: "bg.state.install",
                            level: i.in.INFO,
                            extra: {
                                json: JSON.stringify({
                                    source: e
                                })
                            },
                            sendToFemetrics: !0
                        })
                    },
                    this.chromeContentScriptLoadError = (e, t) => {
                        this._send("bg.chrome.cs.load.error", i.in.WARN, {
                            message: e,
                            type: t
                        })
                    },
                    this.reloadNotificationShow = () => {
                        this._send("bg.ui.notification.tabsReload.show", i.in.WARN)
                    },
                    this.reloadNotificationClick = () => {
                        this._send("bg.ui.notification.tabsReload.click", i.in.INFO)
                    },
                    this.fetchUserFail = (e, t, n) => {
                        const r = "bg.user.fetch.fail",
                            o = _(r, {
                                body: t,
                                statusCode: n,
                                reason: e
                            });
                        this._sendEvent({
                            logger: r,
                            level: i.in.WARN,
                            extra: {
                                json: o
                            },
                            sendToFemetrics: !0
                        })
                    },
                    this.getAccessTokenError = (e, t) => this.sendFemetricsRate("warn", {
                        logger: "bg.api.service.accessToken.error",
                        level: i.in.WARN,
                        message: String(e),
                        context: t ? "ignoreCache" : "withCache"
                    }),
                    this.getAccessTokenSuccess = e => this.sendFemetricsRate("info", {
                        logger: "bg.api.service.accessToken.success",
                        level: i.in.INFO,
                        context: e ? "ignoreCache" : "withCache"
                    }),
                    this.frequentCookieChanges = e => {
                        this._send("debug.cookie.onChange.error", i.in.INFO, {
                            canceled: e
                        })
                    },
                    this.initializePropFromDapi = e => {
                        this._send("bg.state.dapi.prop.initialize", i.in.INFO, {
                            name: e
                        })
                    },
                    this.onboardingPopupShow = () => {
                        this._send("cs.onboarding.popup.show", i.in.INFO)
                    },
                    this.onboardingPopupCancel = () => {
                        this._send("cs.onboarding.popup.cancel", i.in.INFO)
                    },
                    this.onboardingTutorialShow = () => {
                        this._send("cs.onboarding.tutorial.show", i.in.INFO)
                    },
                    this.loginReminderPopupShow = () => {
                        this._send("cs.gbutton.popup.loginReminder.show", i.in.INFO)
                    },
                    this.loginReminderBadgeShow = () => {
                        this._send("bg.state.user.loginReminder.enable", i.in.INFO)
                    },
                    this.loginReminderCanceled = e => {
                        this._sendFelog("bg.state.user.loginReminder.canceled", e, i.in.ERROR)
                    },
                    this.unhandledExceptions = {
                        unhandledBgPageException: (e, t) => {
                            const n = "bg.unhandledException";
                            p.error(n, new Error(e), t),
                            this._sendSampledEvent(m, {
                                logger: n,
                                level: i.in.ERROR,
                                message: R(e),
                                extra: t
                            })
                        },
                        unhandledBgPageRejection: (e, t) => {
                            const n = "bg.unhandledRejection";
                            p.error(n, new Error(e), t),
                            this._sendSampledEvent(m, {
                                logger: n,
                                level: i.in.ERROR,
                                message: S(e),
                                extra: t
                            })
                        },
                        unhandledPopupException: (e, t) => {
                            const n = "popup.unhandledException";
                            p.error(n, new Error(e), t),
                            this._sendEvent({
                                logger: n,
                                level: i.in.ERROR,
                                message: e,
                                extra: t,
                                femetricsMessage: y(e)
                            })
                        },
                        unhandledPopupRejection: (e, t) => {
                            const n = "popup.unhandledRejection";
                            p.error(n, new Error(e), t),
                            this._sendEvent({
                                logger: n,
                                level: i.in.ERROR,
                                message: e,
                                extra: t,
                                femetricsMessage: y(e)
                            })
                        }
                    },
                    this.csUnhandled = ({message: e, femetricsExtra: t, error: n, printAsWarning: r}) => {
                        const o = "cs.unhandled";
                        r ? p.warn(o, new Error(e)) : p.error(o, new Error(e)),
                        this._sendEvent({
                            logger: o,
                            level: r ? i.in.WARN : i.in.ERROR,
                            message: e,
                            femetricsExtra: t,
                            sendToFemetrics: !0,
                            extra: n ? (0, f.nG)({}, n) : void 0
                        })
                    },
                    this.csCrash = (0, o.hz)(((e, t) => {
                        p.error("cs.crash", new Error(e)),
                        this._sendEvent({
                            logger: "cs.crash",
                            level: i.in.ERROR,
                            message: e,
                            femetricsExtra: t
                        })
                    })),
                    this.storageMigrationSucceeded = () => {
                        this._send("bg.storageMigration.success", i.in.INFO, {})
                    },
                    this.storageMigrationFailed = this._sendException({
                        logger: "bg.storageMigration.failure",
                        level: i.in.ERROR
                    }),
                    this.storageApplyChangesFailed = this._sendException({
                        logger: "bg.storage.applyChanges.failure",
                        level: i.in.ERROR
                    }),
                    this.cardShowAction = () => {
                        this._sendSampled(g, "cs.editor.card.show", i.in.INFO)
                    },
                    this.cardHideAction = () => {
                        this._sendSampled(g, "cs.editor.card.hide", i.in.INFO)
                    },
                    this.cardReplacementAction = () => {
                        this._sendSampled(g, "cs.editor.card.replacement", i.in.INFO)
                    },
                    this.cardAddToDictAction = () => {
                        this._sendSampled(g, "cs.editor.card.addToDict", i.in.INFO)
                    },
                    this.cardIgnoreAction = () => {
                        this._sendSampled(g, "cs.editor.card.ignore", i.in.INFO)
                    },
                    this.synonymCardShowAction = e => {
                        this._sendSampled(g, "cs.editor.synonym.show", i.in.INFO, {
                            notFoundCard: e
                        })
                    },
                    this.synonymCardHideAction = e => {
                        this._sendSampled(g, "cs.editor.synonym.hide", i.in.INFO, {
                            notFoundCard: e
                        })
                    },
                    this.synonymReplacementAction = () => {
                        this._sendSampled(g, "cs.editor.synonym.replacement", i.in.INFO)
                    },
                    this.dictCardShowAction = () => {
                        this._sendSampled(g, "cs.editor.dict.show", i.in.INFO)
                    },
                    this.dictCardHideAction = () => {
                        this._sendSampled(g, "cs.editor.dict.hide", i.in.INFO)
                    },
                    this.couldNotParseTransform = (e, t) => {
                        this._send("cs.cards.transforms.parse.error", i.in.WARN, {
                            transformHTML: e,
                            fallbackParseSuccessful: t
                        })
                    },
                    this.disabledTabLoad = e => {
                        this._sendUsage("usage.loadOnDisabledTab", i.in.INFO, {
                            accountType: e
                        })
                    },
                    this.disabledTabByUserLoad = e => {
                        this._sendUsage("usage.loadOnDisabledByUserTab", i.in.INFO, {
                            accountType: e
                        })
                    },
                    this.initSession = (e, t, n, r) => {
                        this._sendUsage("usage.session.init", i.in.INFO, {
                            isTopSite: (0, u.ZE)(e),
                            accountType: t,
                            fieldType: n,
                            fieldSupported: r
                        }),
                        this._sendMetric("usage.session.init", {
                            domain: e,
                            accountType: t,
                            fieldType: n,
                            fieldSupported: r
                        })
                    },
                    this.cardFirstInteraction = (e, t) => {
                        this._sendUsage("usage.card.interaction", i.in.INFO, {
                            accountType: e,
                            fieldType: t
                        })
                    },
                    this.gnar = {
                        nextPingDateWriteError: e => this._send("bg.gnarTracker.nextPingDateWriteError", i.in.ERROR, {
                            error: e
                        }),
                        sendError: this._sendException({
                            logger: "bg.gnarTracker.sendError",
                            level: i.in.ERROR
                        }),
                        trackBeforeSetUser: e => this._send("bg.gnarTracker.trackBeforeSetUser", i.in.INFO, {
                            millisSinceInit: e
                        }),
                        errorSetUser: this._sendException({
                            logger: "bg.gnarTracker.errorSetUser",
                            level: i.in.ERROR
                        })
                    },
                    this._sendGdocsPageExecutionException = this._sendException({
                        logger: "cs.gdocs.pageExecution.exception",
                        level: i.in.ERROR
                    }),
                    this.gdocs = {
                        nonDocumentPage: e => {
                            this._sendEvent({
                                logger: "cs.gdocs.canvas.nonDocumentPage",
                                level: i.in.WARN,
                                sendToFemetrics: !0,
                                femetricsMessage: `isViewMode: ${e.isViewMode}`,
                                femetricsExtra: {
                                    context: e.pageType
                                }
                            })
                        },
                        pageExecutionException: (e, t) => this._sendGdocsPageExecutionException(e, {
                            isGDocsCanvas: t
                        }),
                        disabledBeforeForceEnable: (0, o.hz)((e => this._send("cs.gdocs.disabledBeforeForceEnable", i.in.INFO, {
                            disabledDate: e
                        }))),
                        enabledBeforeForceEnable: (0, o.hz)((() => this._send("cs.gdocs.enabledBeforeForceEnable", i.in.INFO))),
                        replacementValidation: e => {
                            this._sendFemetricsRate("gdocsReplacementValidation", e)
                        },
                        eventTargetFail: (0, o.hz)(this._sendException({
                            logger: "cs.gdocs.eventTargetFail",
                            level: i.in.ERROR
                        })),
                        sidebarFail: (0, o.hz)(((e, t) => this._sendException({
                            logger: "cs.gdocs.getSidebarFail",
                            level: i.in.ERROR
                        })(e, {
                            type: t
                        }))),
                        layoutTreeAvailability: e => {
                            this.sendFemetricsRate("gdocsInternalsLayoutTreeAvailability", e)
                        }
                    },
                    this.canvasGdocs = {
                        injectedException: (0, o.hz)(this._sendException({
                            logger: "cs.gdocs.canvas.injected.exception",
                            level: i.in.ERROR
                        })),
                        injectedError: (0, o.HO)(((e, t, n, r) => this._sendEvent({
                            logger: "cs.gdocs.canvas.injected.error",
                            level: i.in.ERROR,
                            message: t,
                            extra: {
                                json: (0, f.jA)({
                                    context: e,
                                    data: n
                                })
                            },
                            gdocsExtra: r,
                            femetricsExtra: {
                                context: e
                            }
                        })), (e => e)),
                        injectedInfo: (0, o.HO)(((e, t, n) => this._sendEvent({
                            logger: "cs.gdocs.canvas.injected.info",
                            eventContext: e,
                            level: i.in.INFO,
                            sendToFemetrics: !0,
                            gdocsExtra: t,
                            extra: {
                                json: (0, f.jA)({
                                    context: e,
                                    data: n
                                })
                            },
                            femetricsExtra: {
                                context: e
                            }
                        })), (e => e)),
                        initializationException: (0, o.hz)(((e, t, n) => this._sendException({
                            logger: "cs.gdocs.canvas.init.exception",
                            level: i.in.ERROR,
                            gdocsExtra: n,
                            femetricsExtra: {
                                type: t
                            }
                        })(e, {
                            type: t
                        }))),
                        initializationTimeout: (0, o.hz)(((e, t, n) => this._sendEvent({
                            logger: "cs.gdocs.canvas.init.timeout",
                            level: i.in.ERROR,
                            message: `Initialization for ${t} timeout: ${e}ms`,
                            extra: {
                                json: (0, f.jA)({
                                    type: t
                                })
                            },
                            gdocsExtra: n,
                            femetricsExtra: {
                                type: t
                            }
                        }))),
                        creatingException: (0, o.hz)(((e, t) => this._sendEvent({
                            logger: "cs.gdocs.canvas.creating.exception",
                            level: i.in.ERROR,
                            message: e,
                            gdocsExtra: t
                        }))),
                        initInterrupted: (0, o.hz)((e => this._sendEvent({
                            logger: "cs.gdocs.canvas.interrupted",
                            level: i.in.ERROR,
                            message: "Interrupted",
                            gdocsExtra: e
                        }))),
                        dataSourceException: (0, o.hz)(((e, t) => this._sendException({
                            logger: "cs.gdocs.canvas.dataSource.exception",
                            level: i.in.ERROR,
                            femetricsExtra: {
                                type: t
                            }
                        })(e, {
                            type: t
                        }))),
                        error: (0, o.HO)(((e, t, n, r, o) => this._sendEvent({
                            logger: "cs.gdocs.canvas.error",
                            level: i.in.ERROR,
                            message: t,
                            extra: (0, f.nG)({
                                type: e,
                                message: t,
                                data: r
                            }, n),
                            femetricsExtra: {
                                type: e,
                                mappingName: null == o ? void 0 : o.mappingName
                            }
                        })), (e => e), ((e, t, n, r, i) => {
                            this._sendFemetricsRate("gdocsError", {
                                type: e,
                                message: t && t.substring(0, 20) || "other",
                                mappingName: null == i ? void 0 : i.mappingName
                            })
                        })),
                        warning: (0, o.HO)(((e, t, n) => this._sendEvent({
                            logger: "cs.gdocs.canvas.warning",
                            level: i.in.WARN,
                            message: t,
                            extra: (0, f.nG)({
                                type: e,
                                message: t,
                                data: n
                            })
                        })), (e => e)),
                        trackSessionFinalResult: (0, o.hz)(((e, t) => this._sendEvent({
                            logger: "cs.gdocs.canvas.start.result",
                            level: i.in.INFO,
                            gdocsExtra: t,
                            sendToFemetrics: !0,
                            femetricsExtra: {
                                type: e
                            }
                        }))),
                        started: e => this._sendEvent({
                            logger: "cs.gdocs.canvas.started",
                            level: i.in.INFO,
                            sendToFemetrics: !0,
                            gdocsExtra: e
                        }),
                        creating: e => this._sendEvent({
                            logger: "cs.gdocs.canvas.creating",
                            level: i.in.INFO,
                            sendToFemetrics: !0,
                            gdocsExtra: e
                        }),
                        showLongDocPopup: e => this._sendEvent({
                            logger: "cs.gdocs.canvas.longDocPopup",
                            level: i.in.INFO,
                            sendToFemetrics: !0,
                            gdocsExtra: e
                        }),
                        showSharedDocPopup: e => this._sendEvent({
                            logger: "cs.gdocs.canvas.sharedDocPopup",
                            level: i.in.INFO,
                            sendToFemetrics: !0,
                            gdocsExtra: e
                        }),
                        debugPageSearchFail: (0, o.hz)((e => this._sendEvent({
                            logger: "cs.gdocs.canvas.pageSearch.debug",
                            level: i.in.INFO,
                            extra: {
                                json: (0, f.jA)({
                                    data: e
                                })
                            }
                        }))),
                        debugMappingFail: (0, o.hz)((e => this._sendEvent({
                            logger: "cs.gdocs.canvas.mapping.debug",
                            level: i.in.INFO,
                            extra: {
                                json: (0, f.jA)({
                                    data: e
                                })
                            }
                        }))),
                        buildTextMapPerf: this._createPerfLogger("cs.gdocs.canvas.perf.textMap", 30),
                        findPage: this._createPerfLogger("cs.gdocs.canvas.perf.findPage", 100),
                        mappingPerf: e => new d.W((t => {
                            1e-4 > Math.random() && this._sendFemetricsTimer("gdocsMapping", t, Object.assign(Object.assign({}, e), {
                                mapPageCount: v.getMapPageCount(e)
                            }))
                        })),
                        fullTextNotFound: (0, o.hz)((() => this._send("cs.gdocs.canvas.fullTextNotFound", i.in.WARN))),
                        equationsRenderInfo: e => {
                            this._sendFemetricsRate("gdocsEquationsRenderInfo", e)
                        },
                        mapping: ({mapPageCount: e, attempts: t, mode: n, tableMode: r, partialRenderMode: i, renderRTL: o}) => {
                            this._sendFemetricsRate("gdocsMapping", Object.assign({
                                mappingMode: n,
                                tableMode: r,
                                mapPageCount: e > 5 ? "5+" : e,
                                mappingAttempts: t.length,
                                partialRenderMode: i,
                                renderRTL: o
                            }, t.reduce(((e, t, n) => Object.assign(Object.assign({}, e), {
                                [`mapping${n}_name`]: t.name,
                                [`mapping${n}_success`]: t.success,
                                [`mapping${n}_mappedPages`]: "number" == typeof t.mappedPageCount && t.mappedPageCount > 5 ? "5+" : t.mappedPageCount
                            })), {})))
                        },
                        mappingFailedInfo: e => {
                            this._sendFemetricsRate("gdocsMappingFailedInfo", e)
                        },
                        mappingStats: e => {
                            this._sendFemetricsRate("gdocsMappingStats", e, ["os"])
                        },
                        mappingPageStats: e => {
                            this._sendFemetricsRate("gdocsMappingPageStats", e, ["os"])
                        },
                        mappingStatsByTextLength: e => {
                            this._sendFemetricsRate("gdocsMappingStatsByTextLength", e, ["os"])
                        },
                        mappingPageStatsByTextLength: e => {
                            this._sendFemetricsRate("gdocsMappingPageStatsByTextLength", e, ["os"])
                        },
                        mappingStatsByTableMode: e => {
                            this._sendFemetricsRate("gdocsMappingStatsByTableMode", e, ["os"])
                        },
                        mappingPageStatsByTableMode: e => {
                            this._sendFemetricsRate("gdocsMappingPageStatsByTableMode", e, ["os"])
                        },
                        mappingMinPageGapsStats: e => {
                            this._sendFemetricsRate("gdocsMappingMinPageGapsStats", e, ["os"])
                        },
                        mappingMaxPageGapsStats: e => {
                            this._sendFemetricsRate("gdocsMappingMaxPageGapsStats", e, ["os"])
                        }
                    },
                    this.canvasGdocsSVG = {
                        error: (0, o.HO)(((e, t, n, r, o) => this._sendEvent({
                            logger: "cs.gdocs.svg.error",
                            level: i.in.ERROR,
                            message: t,
                            extra: (0, f.nG)({
                                type: e,
                                message: t,
                                data: r
                            }, n),
                            femetricsExtra: {
                                type: e,
                                mappingName: null == o ? void 0 : o.mappingName
                            }
                        })), (e => e)),
                        buildTextMapPerf: this._createPerfLogger("cs.gdocs.svg.perf.textMap", 30)
                    },
                    this.gmailThreadContext = {
                        warning: (0, o.HO)(((e, t, n) => this._sendEvent({
                            logger: "cs.threadContext.gmail.warning",
                            level: i.in.WARN,
                            message: t,
                            extra: {
                                json: (0, f.jA)({
                                    type: e,
                                    message: t,
                                    data: n
                                })
                            }
                        })), (e => e))
                    },
                    this.autoApply = {
                        featureToggleClick: (e, t) => {
                            this._sendFemetricsRate("autoApplyFeatureToggleClick", {
                                autoApplyFeatureState: e,
                                autoApplyFeatureTogglePlacement: t
                            })
                        },
                        triggered: () => {
                            this._sendFemetricsRate("autoApplyTriggered")
                        },
                        cardLooked: () => {
                            this._sendFemetricsRate("autoApplyCardLooked")
                        },
                        revertClick: () => {
                            this._sendFemetricsRate("autoApplyRevertClick")
                        },
                        reverted: () => {
                            this._sendFemetricsRate("autoApplyReverted")
                        },
                        acceptClick: () => {
                            this._sendFemetricsRate("autoApplyAcceptClick")
                        },
                        settingsClick: e => {
                            this._sendFemetricsRate("autoApplySettingsClick", {
                                autoApplySettingsMenuState: e
                            })
                        },
                        turnOffUntilNextView: () => {
                            this._sendFemetricsRate("autoApplyTurnOffUntilNextView")
                        },
                        integrationCreated: () => {
                            this._sendFemetricsRate("autoApplyIntegrationCreated")
                        }
                    },
                    this.knowledgeHub = {
                        error: (0, o.HO)(((e, t, n, r) => this._sendEvent({
                            logger: "cs.knowledgeHub.error",
                            level: i.in.ERROR,
                            message: t,
                            extra: {
                                json: (0, f.jA)({
                                    type: e,
                                    message: t,
                                    domain: n,
                                    data: r
                                })
                            }
                        })), (e => e)),
                        integrationCreated: (e, t) => {
                            this._sendFemetricsRate("knowledgeHubIntegrationCreated", {
                                site: e,
                                integrationMode: t
                            })
                        },
                        relatedMaterialsClick: e => {
                            this._sendFemetricsRate("knowledgeHubRelatedMaterialsClick", {
                                site: e
                            })
                        },
                        pointPeopleClick: (e, t) => {
                            this._sendFemetricsRate("knowledgeHubPointPeopleClick", {
                                site: e,
                                pointPeopleClickType: t
                            })
                        },
                        descriptionCopyClick: e => {
                            this._sendFemetricsRate("knowledgeHubDescriptionCopyClick", {
                                site: e
                            })
                        },
                        suggestEditButtonClick: e => {
                            this._sendFemetricsRate("knowledgeHubSuggestEditButtonClick", {
                                site: e
                            })
                        },
                        featureToggleClick: (e, t) => {
                            this._sendFemetricsRate("knowledgeHubFeatureToggleClick", {
                                site: e,
                                featureState: t
                            })
                        },
                        bgApiError: (e, t) => {
                            const n = "bg.knowledgeHub.error",
                                r = _(n, {
                                    statusCode: e,
                                    message: t
                                });
                            this._sendEvent({
                                logger: n,
                                level: i.in.ERROR,
                                extra: {
                                    json: r
                                },
                                sendToFemetrics: !0
                            })
                        },
                        onboardingPopupShow: (e, t) => {
                            this._sendFemetricsRate("knowledgeHubOnboardingPopupShow", {
                                onboardingType: e,
                                site: t
                            })
                        },
                        onboardingNextButtonClick: (e, t, n) => {
                            this._sendFemetricsRate("knowledgeHubOnboardingNextButtonClick", {
                                onboardingType: e,
                                site: t,
                                step: n
                            })
                        },
                        onboardingSkipButtonClick: (e, t, n) => {
                            this._sendFemetricsRate("knowledgeHubOnboardingSkipButtonClick", {
                                onboardingType: e,
                                site: t,
                                step: n
                            })
                        },
                        onboardingCloseButtonClick: (e, t, n) => {
                            this._sendFemetricsRate("knowledgeHubOnboardingCloseButtonClick", {
                                onboardingType: e,
                                site: t,
                                step: n
                            })
                        }
                    },
                    this.cheetah = {
                        info: (0, o.HO)(((e, t, n) => this._sendEvent({
                            logger: "cs.cheetah.info",
                            level: i.in.INFO,
                            message: e.name,
                            extra: {
                                json: (0, f.jA)(Object.assign(Object.assign({}, e), {
                                    sessionUuid: n,
                                    domain: t
                                }))
                            },
                            hideUserInfo: !0,
                            sendToFemetrics: !0
                        })), (e => e.name)),
                        warning: (0, o.HO)(((e, t, n) => this._sendEvent({
                            logger: "cs.cheetah.warning",
                            level: i.in.WARN,
                            message: e.name,
                            extra: {
                                json: (0, f.jA)(Object.assign(Object.assign({}, e), {
                                    sessionUuid: n,
                                    domain: t
                                }))
                            },
                            hideUserInfo: !0,
                            sendToFemetrics: !0
                        })), (e => e.name)),
                        error: (0, o.HO)(((e, t, n) => this._sendEvent({
                            logger: "cs.cheetah.error",
                            level: i.in.ERROR,
                            message: e.name,
                            extra: {
                                json: (0, f.jA)(Object.assign(Object.assign({}, e), {
                                    sessionUuid: n,
                                    domain: t
                                }))
                            },
                            hideUserInfo: !0,
                            sendToFemetrics: !0
                        })), (e => e.name)),
                        sessionRestartTimeout: (e, t, n) => this._sendEvent({
                            logger: "cs.cheetah.error",
                            level: i.in.ERROR,
                            message: "sessionRestartTimeout",
                            extra: {
                                json: (0, f.jA)({
                                    name: "sessionRestartTimeout",
                                    sessionUuid: n,
                                    domain: t,
                                    waitingFor: e
                                })
                            },
                            hideUserInfo: !0,
                            sendToFemetrics: !0
                        })
                    },
                    this._cbLog = e => (0, o.HO)(((t, n, r, i) => this._sendEvent({
                        logger: "cs.citationBuilder",
                        level: e,
                        citationBuilderExtra: r,
                        message: n,
                        extra: (0, f.nG)(void 0, i)
                    })), (e => e)),
                    this.citationBuilder = {
                        error: this._cbLog(i.in.ERROR),
                        warning: this._cbLog(i.in.WARN),
                        info: this._cbLog(i.in.INFO)
                    },
                    this.performance = {
                        processInput: this._createPerfLogger("cs.fluid.processInput", 100),
                        processAlerts: this._createPerfLogger("cs.fluid.processAlerts", 10),
                        processFilterChange: this._createPerfLogger("cs.fluid.processFilterChange", 10),
                        csInitialized: (e, t, n, r, i) => {
                            this._createPerfLogger("cs.initialized").custom({
                                _tag: c.mW.Data.Tagged.Types.csInit,
                                domain: self.location.host,
                                hideUserInfo: !0,
                                loadTime: e,
                                initTime: t,
                                pageLoadTime: n,
                                injectTime: r,
                                error: i ? {
                                    message: i.message,
                                    stack: i.stack
                                } : void 0
                            })
                        },
                        viewInjection: e => {
                            this._createPerfLogger("cs.viewInjection").custom(Object.assign({
                                _tag: c.mW.Data.Tagged.Types.viewInjection
                            }, e))
                        }
                    },
                    this.autocorrect = {
                        responseTime: this._createPerfLogger("cs.autocorrect.responseTime", 10),
                        predictTime: this._createPerfLogger("cs.autocorrect.predictTime", 10),
                        integrationCreated: () => {
                            this._sendFemetricsRate("autoCorrectIntegrationCreated")
                        }
                    },
                    this.assistant = {
                        initTime: this._createPerfLogger("cs.assistant.initTime", 1),
                        renderTime: this._createPerfLogger("cs.assistant.renderTime", 1),
                        openTime: this._createPerfLogger("cs.assistant.openTime", 1),
                        alertManagerError: this._sendException({
                            logger: "cs.assistant.alertManagerError",
                            level: i.in.ERROR
                        })
                    },
                    this.proofit = {
                        availabilityQuotaError: e => {
                            this._sendEvent({
                                logger: "cs.proofit.availability_quota_error",
                                level: i.in.ERROR,
                                extra: {
                                    json: JSON.stringify(e)
                                }
                            })
                        },
                        submitResponseError: e => {
                            this._sendEvent({
                                logger: "cs.proofit.submit_response_error",
                                level: i.in.ERROR,
                                extra: {
                                    json: JSON.stringify(e)
                                }
                            })
                        },
                        progressError: e => {
                            this._sendEvent({
                                logger: "cs.proofit.progress_error",
                                level: i.in.ERROR,
                                extra: {
                                    json: JSON.stringify(e)
                                }
                            })
                        },
                        progressRejected: e => {
                            this._sendEvent({
                                logger: "cs.proofit.progress_rejected",
                                level: i.in.WARN,
                                extra: {
                                    json: JSON.stringify(e)
                                }
                            })
                        }
                    },
                    this.oauthExchangeError = e => {
                        this._send("bg.oauth.exchange.error", i.in.ERROR, {
                            message: e
                        })
                    },
                    this.chipmunkAPIError = e => {
                        this._send("bg.chipmunk.api.error", i.in.ERROR, {
                            message: e
                        })
                    },
                    this.getIterableError = e => {
                        this._sendEvent({
                            logger: "bg.iterable.api.error",
                            level: i.in.WARN,
                            extra: {
                                json: e
                            },
                            sendToFemetrics: !0
                        })
                    },
                    this.getMiseError = e => {
                        this._sendEvent({
                            logger: "bg.mise.api.token.error",
                            level: i.in.WARN,
                            extra: {
                                json: e
                            },
                            sendToFemetrics: !0
                        })
                    },
                    this.alerts = {
                        inconsistentAlertWithText: (e, t) => {
                            this._sendFemetricsRate("inconsistentAlertWithText", {
                                context: e,
                                source: t
                            })
                        },
                        cannotShowInlineCard: e => {
                            this._sendFemetricsRate("cannotShowInlineCard", {
                                context: e
                            })
                        }
                    },
                    this.upgradeHooks = {
                        showUpgradeHook: (e, t) => {
                            this._sendFemetricsRate("showPremiumButton", {
                                upgradeHookName: e,
                                upgradeHookSlot: t
                            })
                        },
                        clickUpgradeHook: (e, t) => {
                            this._sendFemetricsRate("clickPremiumButton", {
                                upgradeHookName: e,
                                upgradeHookSlot: t
                            })
                        }
                    },
                    this.upgradeHooksExp = {
                        upgradeHookExperimentPeek: (e, t, n) => {
                            this._sendFemetricsRate("upgradeHookExperiment", {
                                experimentName: e,
                                experimentGroup: t,
                                domain: (0, u.FN)(n)
                            })
                        },
                        upgradeHookFirstHiddenPremiumAlertReceived: (e, t, n) => {
                            this._sendFemetricsRate("upgradeHookFirstHiddenPremiumAlertReceived", {
                                experimentName: e,
                                experimentGroup: t,
                                domain: (0, u.FN)(n)
                            })
                        },
                        upgradeHookFirstSDUIReceivedFromCAPI: (e, t, n) => {
                            this._sendFemetricsRate("upgradeHookFirstSDUIReceivedFromCAPI", {
                                experimentName: e,
                                experimentGroup: t,
                                domain: (0, u.FN)(n)
                            })
                        },
                        upgradeHookFeedRendered: (e, t, n) => {
                            this._sendFemetricsRate("upgradeHookFeedRenderedWithUpgradeCard", {
                                experimentName: e,
                                experimentGroup: t,
                                domain: (0, u.FN)(n)
                            })
                        },
                        upgradeHookCardShown: (e, t, n) => {
                            this._sendFemetricsRate("upgradeHookCardShown", {
                                experimentName: e,
                                experimentGroup: t,
                                domain: (0, u.FN)(n)
                            })
                        }
                    },
                    this.sendToTabFailed = (e, t) => {
                        this._sendSampledEvent(m, {
                            logger: "bg.connection.sendToTabFailed",
                            level: i.in.ERROR,
                            message: "send message to tab emit an error",
                            extra: (0, f.nG)(e, t)
                        })
                    },
                    this.debugReports = {
                        downloadSuccessfuly: (e, t) => {
                            const n = "debugReports.downloadSussessfyly",
                                r = _(n, {
                                    envContext: e,
                                    downloadEnvContext: t
                                });
                            this._sendEvent({
                                logger: n,
                                level: i.in.INFO,
                                extra: {
                                    json: r
                                },
                                sendToFemetrics: !0
                            })
                        },
                        downloadTimeout: (e, t) => {
                            const n = "debugReports.downloadTimeout",
                                r = _(n, {
                                    envContext: e,
                                    downloadEnvContext: t
                                });
                            this._sendEvent({
                                logger: n,
                                level: i.in.WARN,
                                extra: {
                                    json: r
                                },
                                sendToFemetrics: !0
                            })
                        },
                        downloadError: (e, t) => {
                            const n = "debugReports.downloadError",
                                r = _(n, {
                                    envContext: e,
                                    downloadEnvContext: t
                                });
                            this._sendEvent({
                                logger: n,
                                level: i.in.WARN,
                                extra: {
                                    json: r
                                },
                                sendToFemetrics: !0
                            })
                        }
                    },
                    this.dialectSettingsError = e => {
                        this._sendException({
                            logger: "bg.api.dialectService",
                            level: i.in.ERROR
                        })(e)
                    },
                    this.serializeTransportMsgFailed = () => {
                        this._sendFemetricsRate("error", {
                            logger: "bg.serialize.transport.message.failed",
                            level: i.in.ERROR,
                            message: "Failed to serialize rpc message"
                        })
                    },
                    this.hiddenFieldInjectionFailed = () => {
                        this._sendFemetricsRate("error", {
                            logger: "cs.hiddenField.injection.failed",
                            level: i.in.ERROR,
                            domain: (0, u.FN)()
                        })
                    },
                    this.skipIntegrationForNonHtmlPage = () => {
                        this._sendFemetricsRate("info", {
                            logger: "cs.skip.integration.for.non.html.page",
                            domain: O(self.location.hostname)
                        })
                    },
                    this.backendManagedStorage = {
                        error: (e, t) => {
                            this._sendException({
                                logger: "bg.backendManagedStorage",
                                level: i.in.ERROR
                            })(t, void 0, e)
                        },
                        warn: (e, t) => {
                            const n = _("backendManagedStorage.warn", t);
                            this._sendEvent({
                                logger: "bg.backendManagedStorage",
                                level: i.in.WARN,
                                message: e,
                                extra: {
                                    json: n
                                }
                            })
                        },
                        info: e => {
                            this._sendEvent({
                                logger: "bg.backendManagedStorage",
                                level: i.in.INFO,
                                message: e
                            })
                        }
                    },
                    this.replacement = {
                        info: e => {
                            this.sendFemetricsRate("replacementInfo", e, ["os"])
                        },
                        infoShort: e => {
                            this.sendFemetricsRate("replacementInfoShort", e)
                        },
                        gdocs: e => {
                            this.sendFemetricsRate("replacementInfo.gdocs", e)
                        },
                        contentEditable: e => {
                            this.sendFemetricsRate("replacementInfo.contentEditable", e)
                        },
                        sessionStats: e => {
                            this.sendFemetricsRate("replacementSessionStats", e)
                        },
                        sessionStatsBySource: e => {
                            this.sendFemetricsRate("replacementSessionStatsBySource", e)
                        },
                        sessionStatsByReplacementType: e => {
                            this.sendFemetricsRate("replacementSessionStatsByReplacementType", e)
                        },
                        alert: e => {
                            this.sendFemetricsRate("replacementInfo.alert", e)
                        }
                    }
                }
                _send(e, t, n)
                {
                    const r = _(e, n);
                    try {
                        this._sendFelog(e, String(null == n ? void 0 : n.message), t, n ? {
                            json: r
                        } : void 0)
                    } catch (t) {
                        p.warn(`Failed to send felog for ${e}: '${(0, a.H)(t) ? t.message : "undefined"}'`, t)
                    }
                }
                _sendUsage(e, t, n)
                {
                    if (this._sendUsageMetrics && this._sendUsageMetricsSamplingRatio > Math.random())
                        try {
                            this._sendFelogUsage(e, "", t, n)
                        } catch (t) {
                            p.warn(`Failed to send usage felog for ${e}: '${(0, a.H)(t) ? t.message : "undefined"}'`, t)
                        }
                }
                _sendSampled(e, t, n, r)
                {
                    e > Math.random() && this._send(t, n, r)
                }
                _sendSampledEvent(e, t)
                {
                    e > Math.random() && this._sendEvent(t)
                }
                _sendMetric(e, t)
                {
                    this._sendFelogMetricEvent({
                        metricName: e,
                        data: t
                    })
                }
                sendCrashLogs(e, t)
                {
                    try {
                        this._sendFelogCrashLogs(t)
                    } catch (t) {
                        p.warn(`Failed to send crash data data for ${e}: '${(0, a.H)(t) ? t.message : "undefined"}'`, t)
                    }
                }
                setUserInfo(e)
                {
                    this._setUserInfo(e)
                }
                setContainerId(e)
                {
                    this._setContainerId(e)
                }
                enableDataSharing()
                {
                    this._enableDataSharing()
                }
                notificationShown(e)
                {
                    this._send("cs.notification.show", i.in.INFO, {
                        type: e
                    })
                }
                notificationHide(e)
                {
                    this._send("cs.notification.hide", i.in.INFO, {
                        type: e
                    })
                }
            }
            var x,
                E;
            function S(e) {
                return e ? "Failed to fetch" === e ? x.FAILED_FETCH : "Could not establish connection. Receiving end does not exist." === e || e.includes("No frame with id") || e.includes("No tab with id") || e.startsWith("Frame with ID") && e.endsWith("was removed.") ? x.TAB_NOT_EXISTS : e.startsWith("IO error:") ? x.IO_ERROR : "The browser is shutting down." === e ? x.BROWSER_SHUTTING_DOWN : "No available storage method found." === e ? x.NO_STORAGE_METHOD_FOUND : "this._firefox is undefined" === e ? x.FIREFOX_UNDEFINED : "Load failed" === e ? x.LOAD_FAILED : "Unexpected user type for login reminder" === e ? x.UNEXPECTED_USER_TYPE : x.OTHER : x.EMPTY
            }
            function R(e) {
                return e ? "Error: executing a cancelled action" === e ? E.ACTION_CANCELED : "Script error." === e ? E.SCRIPT_ERROR : "object unsubscribed" === e ? E.OBJECT_UNSUBSCRIBED : e.includes("is not a function") ? E.INVALID_FUNCTION : E.OTHER : E.EMPTY
            }
            function O(e) {
                const t = t => e.endsWith(t),
                    n = (0, u.FN)(e);
                if ("other" === n) {
                    const e = ["pubmatic.com", "quantumdex.io", "gumgum.com", "aniview.com", "amazon-adsystem", "nextmillmedia.com", "doubleclick.net", "adsrvr.org", "adnxs.com", "msn.com"].find(t);
                    if (e)
                        return e
                }
                return n
            }
            !function(e) {
                let t;
                !function(e) {
                    e.fromPartial = e => e
                }(t = e.Mock || (e.Mock = {}))
            }(w || (w = {})),
            function(e) {
                e.FAILED_FETCH = "FailedToFetch",
                e.TAB_NOT_EXISTS = "TabNotExists",
                e.IO_ERROR = "IOError",
                e.BROWSER_SHUTTING_DOWN = "BrowserShuttingDown",
                e.FIREFOX_UNDEFINED = "FirefoxUndefined",
                e.LOAD_FAILED = "LoadFailed",
                e.UNEXPECTED_USER_TYPE = "UnexpectedUserType",
                e.NO_STORAGE_METHOD_FOUND = "NoStorageMethodFound",
                e.EMPTY = "Empty",
                e.OTHER = "Other"
            }(x || (x = {})),
            function(e) {
                e.ACTION_CANCELED = "ActionCanceled",
                e.SCRIPT_ERROR = "ScriptError",
                e.OBJECT_UNSUBSCRIBED = "ObjectUnsubscribed",
                e.INVALID_FUNCTION = "InValidFunction",
                e.EMPTY = "Empty",
                e.OTHER = "Other"
            }(E || (E = {}))
        },
        17627: (e, t, n) => {
            n.d(t, {
                r: () => r
            });
            const r = "tracking/RPC"
        },
        71402: (e, t, n) => {
            n.d(t, {
                _: () => s
            });
            var r = n(5957),
                i = n(55649),
                o = n(17627);
            function s(e, t=i.Y.create("lib.tracking.call.transport")) {
                return new Proxy({}, {
                    get: (n, i) => {
                        if ("enableDataSharing" !== i)
                            return (...n) => {
                                Promise.race([e.api.trackCall(o.r, [i, ...n]).then((() => null)), (0, r.gw)(1e4).then((() => new Error("timeout call through bg page")))]).then((e => e && t.warn("tracking call timeout", e))).catch((e => t.warn("tracking call failed, reason:", e)))
                            }
                    }
                })
            }
        },
        65782: (e, t, n) => {
            n.d(t, {
                W: () => r
            });
            class r {
                constructor(e)
                {
                    this._onMeasure = e
                }
                measure(e)
                {
                    const t = performance.now();
                    let n = !1;
                    try {
                        const r = e();
                        return n = !0, r
                    } finally {
                        this._onMeasure(performance.now() - t, n)
                    }
                }
                async measureAsync(e)
                {
                    const t = performance.now();
                    let n = !1;
                    try {
                        const r = await e();
                        return n = !0, r
                    } finally {
                        this._onMeasure(performance.now() - t, n)
                    }
                }
            }
        },
        93401: (e, t, n) => {
            n.d(t, {
                Rv: () => r,
                mW: () => o,
                y2: () => i
            });
            var r,
                i,
                o,
                s = n(48015),
                a = n(84701);
            !function(e) {
                function t() {
                    return {
                        dummy: !0,
                        startMeasure: () => ({
                            endMeasure: () => {},
                            cancelMeasure: s.EI
                        }),
                        measure: e => e(),
                        measureAsync: e => e(),
                        custom: s.EI
                    }
                }
                e.dummy = t,
                e.dummyFactoryInitialization = () => () => t()
            }(r || (r = {})),
            function(e) {
                e.dummy = {
                    flushMeasures: e => [],
                    measure: (e, t) => t(),
                    startMeasure: e => ({
                        endMeasure() {},
                        cancelMeasure() {}
                    })
                }
            }(i || (i = {})),
            function(e) {
                let t;
                !function(e) {
                    let t;
                    !function(e) {
                        let t;
                        !function(e) {
                            e.stats = "stats",
                            e.csInit = "csInit",
                            e.viewInjection = "viewInjection"
                        }(t = e.Types || (e.Types = {}))
                    }(t = e.Tagged || (e.Tagged = {}))
                }(t = e.Data || (e.Data = {})),
                e.getStats = function(e) {
                    if (0 === e.length)
                        return {
                            ct: 0
                        };
                    {
                        const t = e.reduce(((e, t) => Math.min(e, t)), Number.MAX_VALUE),
                            n = e.reduce(((e, t) => Math.max(e, t)), Number.MIN_VALUE),
                            r = e.length >= 6 ? (0, a.J6)(e) : void 0;
                        return {
                            ct: e.length,
                            min: t,
                            max: n,
                            range: n - t,
                            avg: r,
                            stddev: void 0 !== r && e.length > 1 ? (0, a.m)(e, r) : void 0
                        }
                    }
                }
            }(o || (o = {}))
        },
        82722: (e, t, n) => {
            n.d(t, {
                X: () => a
            });
            var r = n(48015),
                i = n(84701),
                o = n(93401);
            class s {
                constructor(e, t, n=r.EI)
                {
                    this.name = e,
                    this._source = t,
                    this._saveAction = n,
                    this.dummy = !1,
                    this.data = [],
                    this.customBuffer = [],
                    this._flush = () => {
                        this.data.push(...this._source.flushMeasures(this.name)),
                        this._saveAction(this.data)
                    },
                    this.custom = e => {
                        this.customBuffer.push(e)
                    },
                    this.startMeasure = () => {
                        const e = this._source.startMeasure(this.name),
                            t = () => this._flush();
                        return {
                            endMeasure() {
                                try {
                                    const n = e.endMeasure();
                                    return t(), n
                                } catch (e) {
                                    return
                                }
                            },
                            cancelMeasure: () => e.cancelMeasure()
                        }
                    },
                    this.measure = e => {
                        const t = this._source.measure(this.name, e);
                        try {
                            this._flush()
                        } catch (e) {}
                        return t
                    },
                    this.measureAsync = e => {
                        const t = this._source.startMeasure(this.name);
                        return e().then((e => {
                            try {
                                t.endMeasure(),
                                this._flush()
                            } catch (e) {}
                            return e
                        }))
                    }
                }
                getStats()
                {
                    return this.data.length > 0 ? Object.assign(Object.assign({}, o.mW.getStats(this.data)), {
                        median: i.C2(this.data),
                        p90: i.Pe(this.data, .9),
                        p99: i.Pe(this.data, .99)
                    }) : {}
                }
            }
            const a = e => t => t => {
                const n = self.__GR_PERFORMANCE_STORE__ || {};
                if (self.__GR_PERFORMANCE_STORE__ = n, t in n)
                    return n[t];
                {
                    const r = new s(t, e);
                    return n[t] = r, r
                }
            }
        },
        29445: (e, t, n) => {
            n.d(t, {
                f: () => s
            });
            var r = n(55649),
                i = n(48015),
                o = n(93401);
            class s {
                constructor(e)
                {
                    this._perf = e,
                    this._log = r.Y.create("cs.telemetry.PerformanceMetricsImpl")
                }
                flushMeasures(e)
                {
                    try {
                        const t = this._perf.getEntriesByName(e, "measure");
                        return this._perf.clearMeasures(e), t.map((e => e.duration))
                    } catch (e) {
                        return this._log.warn("failed to retrieve perf measurements", e), []
                    }
                }
                startMeasure(e)
                {
                    const t = Math.random(),
                        n = `__${e}_${t}-start`,
                        r = `__${e}_${t}-end`;
                    try {
                        this._perf.mark(n)
                    } catch (e) {
                        return this._log.warn("could not start measure – ignoring measurement", e), {
                            endMeasure: () => {},
                            cancelMeasure: i.EI
                        }
                    }
                    let o = !1;
                    return {
                        endMeasure: () => {
                            if (!o) {
                                o = !0;
                                try {
                                    return this._perf.mark(r), this._perf.measure(e, n, r), this._perf.getEntriesByName(e, "measure")[0]
                                } catch (e) {
                                    return void this._log.warn("could not complete measure", e)
                                }
                            }
                        },
                        cancelMeasure: () => {
                            this._perf.clearMarks(n),
                            this._perf.clearMarks(r)
                        }
                    }
                }
                measure(e, t)
                {
                    const n = `__${e}-start`,
                        r = `__${e}-end`;
                    try {
                        this._perf.mark(n)
                    } catch (e) {
                        return this._log.warn("could not start measure – ignoring measurement", e), t()
                    }
                    try {
                        return t()
                    } finally {
                        try {
                            this._perf.mark(r),
                            this._perf.measure(e, n, r)
                        } catch (e) {
                            this._log.warn("could not complete measure", e)
                        }
                    }
                }
            }
            !function(e) {
                e.create = function(t) {
                    return void 0 !== t ? new e(t) : o.y2.dummy
                }
            }(s || (s = {}))
        },
        88731: (e, t, n) => {
            n.d(t, {
                U: () => u
            });
            var r = n(98805),
                i = n(48015),
                o = n(55649),
                s = n(93401);
            const a = o.Y.create("tracking.telemetry.performance.felog");
            class c {
                constructor(e, t, n, o=0, c=r.Z7)
                {
                    this.name = e,
                    this._sendMetrics = t,
                    this._source = n,
                    this._minBufferSize = o,
                    this._throttleTimeMs = c,
                    this.dummy = !1,
                    this._buffer = [],
                    this._flush = (0, i.P2)(this._throttleTimeMs, (() => {
                        if (this._buffer.push(...this._source.flushMeasures(this.name)), this._buffer.length >= this._minBufferSize) {
                            const e = s.mW.getStats(this._buffer);
                            this._buffer = [],
                            a.info(`sending perf stats for ${this.name}`, e),
                            this._sendMetrics(this.name, Object.assign({
                                _tag: s.mW.Data.Tagged.Types.stats
                            }, e))
                        }
                    })),
                    this.custom = e => {
                        this._sendMetrics(this.name, e)
                    },
                    this.startMeasure = () => {
                        const e = this._source.startMeasure(this.name),
                            t = () => this._flush();
                        return {
                            endMeasure() {
                                try {
                                    const n = e.endMeasure();
                                    return t(), n
                                } catch (e) {
                                    return
                                }
                            },
                            cancelMeasure: () => e.cancelMeasure()
                        }
                    },
                    this.measure = e => {
                        const t = this._source.measure(this.name, e);
                        try {
                            this._flush()
                        } catch (e) {}
                        return t
                    },
                    this.measureAsync = e => {
                        const t = this._source.startMeasure(this.name);
                        return e().then((e => {
                            try {
                                t.endMeasure(),
                                this._flush()
                            } catch (e) {}
                            return e
                        }))
                    }
                }
            }
            const u = (e, t, n=r.Z7) => r => (i, o) => e ? new c(i, r, t, o, n) : s.Rv.dummy()
        },
        75463: (e, t, n) => {
            n.d(t, {
                FN: () => s,
                ZE: () => i,
                h: () => o
            });
            var r = n(7992);
            function i(e) {
                return a.includes(e)
            }
            function o(e) {
                return a.getTopSiteId(e)
            }
            function s(e=(0, r.ge)(), t="other") {
                var n;
                return i(e) ? null !== (n = o(e)) && void 0 !== n ? n : "null" : t
            }
            const a = new class {
                constructor(e)
                {
                    function t(e) {
                        return `Invalid pattern "${e}": "*" is allowed only at start and/or end position`
                    }
                    this._equal = new Set,
                    this._prefix = [],
                    this._suffix = [],
                    this._infix = [],
                    this._domain = [];
                    for (const n of e)
                        if (n.startsWith("**."))
                            this._domain.push(n.substring(3));
                        else {
                            const e = n.indexOf("*");
                            if (-1 === e)
                                this._equal.add(n);
                            else if (e === n.length - 1)
                                this._prefix.push(n.substring(0, e));
                            else {
                                if (0 !== e)
                                    throw new Error(t(n));
                                {
                                    const e = n.indexOf("*", 1);
                                    if (-1 === e)
                                        this._suffix.push(n.substring(1));
                                    else {
                                        if (e !== n.length - 1)
                                            throw new Error(t(n));
                                        this._infix.push(n.substring(1, e))
                                    }
                                }
                            }
                        }
                }
                getTopSiteId(e)
                {
                    var t,
                        n,
                        r,
                        i,
                        o,
                        s,
                        a;
                    return null !== (s = null !== (o = null !== (i = null !== (r = null !== (n = null !== (t = this._equal.has(e) ? e : void 0) && void 0 !== t ? t : this._domain.find((t => t === e))) && void 0 !== n ? n : (a = this._domain.find((t => e.endsWith("." + t)))) ? "**." + a : void 0) && void 0 !== r ? r : this._prefix.find((t => e.startsWith(t)))) && void 0 !== i ? i : this._suffix.find((t => e.endsWith(t)))) && void 0 !== o ? o : this._infix.find((t => e.includes(t)))) && void 0 !== s ? s : null
                }
                includes(e)
                {
                    return null !== this.getTopSiteId(e)
                }
            }
            (["mail.google.com", "translate.google.*", "docs.google.com", "web.whatsapp.com", "facebook.com", "outlook.*", "linkedin.com", "zendesk.*", "youtube.com", "twitter.com", "messenger.com", "*.slack.*", "*canvas*", "*instructure*", "trello.com", "editor.wix.com", "quizlet.com", "mail.yahoo.com", "*.force.*", "keep.google.com", "vk.com", "fanyi.baidu.com", "app.bullhornstaffing.com", "app.qa-world.com", "calendar.google.com", "papago.naver.com", "wordcounter.net", "blogger.*", "wattpad.com", "wordpress.com", "amazon.*", "smallseotools.com", "create.kahoot.it", "apps.rackspace.com", "basecamp.com", "varsitytutors.com", "canva.com", "fanyi.youdao.com", "reverso.net", "message.alibaba.com", "*schoology*", "*.blackboard.*", "classroom.google.com", "*upwork*", "business.facebook.com", "medium.com", "mail.aol.com", "workhub.transcribeme.com", "github.com", "overleaf.com", "chat.openai.com", "**.salesforce.com", "**.force.com", "**.zendesk.com", "**.microsoftonline.com", "**.outlook.com", "**.facebook.com", "**.messenger.com", "**.genesys.com", "**.cisco.com", "**.avaya.com", "**.oraclecloud.com", "**.five9.com", "**.tawk.to", "**.helpscout.com", "**.livechat.com", "**.intercom.com", "**.freshdesk.com", "**.liveagent.com", "**.hubspot.com", "google.com", "chat.google.com", "classroom.google.com", "quillbot.com", "notion.so", "**.peardeck.com", "discord.com", "**.officeapps.live.com", "student.desmos.com", "web.kamihq.com", "deepl.com", "upwork.com", "app.nearpod.com", "bard.google.com", "instagram.com", "teams.microsoft.com", "studio.youtube.com", "learning.amplify.com", "commonlit.org", "**.asana.com", "reddit.com", "forms.office.com", "sites.google.com", "*amazon.co*", "apps.studysync.com", "fiverr.com"])
        },
        68840: (e, t, n) => {
            n.d(t, {
                jA: () => s,
                nG: () => a
            });
            var r = n(88133),
                i = n(48015),
                o = n(74444);
            function s(e) {
                try {
                    return JSON.stringify(e)
                } catch (e) {
                    return JSON.stringify({
                        json_error: "Cannot json stringify"
                    })
                }
            }
            function a(e, t) {
                return {
                    json: s(e),
                    exception: t ? Object.assign({
                        name: t.name,
                        message: t.message,
                        stack: t.stack ? l(t.stack) : void 0
                    }, (0, o.Kn)(t.extra) ? t.extra : {}) : void 0
                }
            }
            function c() {
                return (0, r.O)().browserApi.baseUri
            }
            const u = {
                chromium: ["<anonymous>", "native", "unknown location"],
                firefox: [],
                safari: ["[native code]"]
            };
            function l(e, {browser: t=(0, r.O)().config.bundleInfo.browser, extensionBaseUri: n=c()}={}) {
                if (!e)
                    return e;
                const o = u["chrome" === t || "edge" === t ? "chromium" : t],
                    s = e => o.some((t => e.startsWith(t))) || n && e.startsWith(n),
                    a = e.split("\n");
                if ("chrome" === t || "edge" === t) {
                    const e = [];
                    let t = 0;
                    for (; t < a.length && !a[t].startsWith("    at ");)
                        e.push(a[t]),
                        t++;
                    for (; t < a.length;) {
                        const n = (l = a[t], m = void 0, b = void 0, v = void 0, null === (v = null !== (b = null !== (m = d.exec(l)) && void 0 !== m ? m : f.exec(l)) && void 0 !== b ? b : h.exec(l)) || void 0 === v ? void 0 : v[1]);
                        n ? s(n) ? e.push(a[t]) : e.push("    at <hidden>") : e.push("    <unparsed>"),
                        t++
                    }
                    return e.join("\n")
                }
                if ("firefox" === t || "safari" === t)
                    return a.map((e => [e, "firefox" === t ? p(e) : g(e)])).map((([e, t]) => void 0 === t ? "<unparsed>" : s(t) ? e : "<hidden>")).join("\n");
                var l,
                    m,
                    b,
                    v;
                (0, i.vE)(t)
            }
            const d = /^ {4}at ([^(]*)$/,
                f = /^ {4}at [^(]* \(([^()]*)\)$/,
                h = /^ {4}at eval \([^(]* \(([^()]*)\)\)$/;
            function p(e) {
                return e.split("@", 2)[1]
            }
            function g(e) {
                var t;
                return null !== (t = e.split("@", 2)[1]) && void 0 !== t ? t : e
            }
        },
        51017: (e, t, n) => {
            function r() {
                return self.matchMedia && self.matchMedia("(prefers-color-scheme: dark)").matches
            }
            n.d(t, {
                Y: () => r
            })
        },
        53649: (e, t, n) => {
            n.d(t, {
                r: () => l
            });
            var r = n(88133),
                i = n(20641),
                o = n(5957),
                s = n(55649),
                a = n(54074),
                c = n(95626),
                u = n(35875);
            class l {
                constructor(e, t, n, r=s.Y.create("DebugReportsGetterImpl"))
                {
                    this._envName = e,
                    this._getLogsDefault = t,
                    this._getLogsFallback = n,
                    this._log = r
                }
                _getLogMessage(e, t)
                {
                    return t === u.l.fallback ? `${e} from ${t}` : e
                }
                async _getLogs(e, t, n)
                {
                    const s = (0, r.O)().context;
                    this._log.debug(this._getLogMessage(`start get ${this._envName} logs`, t));
                    try {
                        const r = await Promise.race([e(), (0, o.gw)(n).then((() => {
                            (0, i.Tb)().debugReports.downloadTimeout(s, this._envName),
                            this._log.warn(this._getLogMessage(`get ${this._envName} logs timeout`, t))
                        }))]);
                        return r ? ((0, i.Tb)().debugReports.downloadSuccessfuly(s, this._envName), this._log.debug(this._getLogMessage(`successfully get ${this._envName}`, t)), r.map((e => Object.assign(Object.assign({}, e), {
                            loggerName: `${this._envName}.${e.loggerName}`
                        })))) : void this._log.warn(this._getLogMessage(`${this._envName} logs is not defined`, t))
                    } catch (e) {
                        return (0, i.Tb)().debugReports.downloadError(s, this._envName), void this._log.warn(this._getLogMessage(`fail to get ${this._envName} logs`, t), e)
                    }
                }
                get envName()
                {
                    return this._envName
                }
                async getLogs()
                {
                    return await this._getLogs(this._getLogsDefault, u.l.default, c.EU) || (this._getLogsFallback ? await this._getLogs(this._getLogsFallback, u.l.fallback, c.q7) : void 0)
                }
                static getLogsFromSessionStorageFallbackGetter(e, t=(() => (0, r.O)().browserApi.sessionStorage))
                {
                    return () => t().get(e).then((t => {
                        const n = t[e];
                        return Array.isArray(n) ? n.map((e => {
                            try {
                                return JSON.parse(e)
                            } catch (t) {
                                return {
                                    level: a.i.WARN,
                                    loggerName: l.name,
                                    message: "Cannot parsed backup data!",
                                    timestamp: e.timestamp,
                                    data: {
                                        json: e
                                    },
                                    exeption: t
                                }
                            }
                        })) : void 0
                    }))
                }
            }
        },
        95626: (e, t, n) => {
            n.d(t, {
                EU: () => i,
                o1: () => s,
                q7: () => o
            });
            var r = n(98805);
            const i = r.m9(3),
                o = r.E0,
                s = 'Click on "OK," will attempt to download a file with the information needed to investigate the issue you are experiencing. This archive may include domains you have recently visited and the text from the document you are typing in. To minimize the amount of sensitive information you share with us, we recommend that you (1) open a new browser window, (2) visit only the website where you can reproduce this issue, and (3) type in a document that includes only text you are comfortable sharing. For more details, see our Privacy Policy (https://www.grammarly.com/privacy-policy).'
        },
        35875: (e, t, n) => {
            var r,
                i;
            n.d(t, {
                l: () => r,
                v: () => i
            }),
            function(e) {
                e.default = "default",
                e.fallback = "fallback"
            }(r || (r = {})),
            function(e) {
                e.bgHistoryLogs = "bgHistoryLogs",
                e.popupHistoryLogs = "popupHistoryLogs",
                e.csHistoryLogs = "csHistoryLogs"
            }(i || (i = {}))
        },
        19374: (e, t, n) => {
            n.d(t, {
                E: () => o,
                O: () => i
            });
            var r = n(88133);
            class i extends r.P {
                static getInstance()
                {
                    if (void 0 === this._instanceCSShared)
                        throw new Error("nonBG Env not inited yet");
                    return this._instanceCSShared
                }
                static get isInited()
                {
                    return void 0 !== this._instanceCSShared
                }
                static initShared(e)
                {
                    if (void 0 !== this._instanceCSShared)
                        throw new Error("nonBG Env already inited");
                    this._instanceCSShared = e,
                    r.P.initShared(e)
                }
            }
            function o() {
                return i.getInstance()
            }
        },
        33356: (e, t, n) => {
            var r = n(54933),
                i = n(93476)(r);
            i.push([e.id, "._cWTM9-animatedUnderline{visibility:hidden;position:fixed;}._cWTM9-animatedUnderline:after{content:'';position:absolute;visibility:visible;height:3px;bottom:0;border-radius:10px;background:#488cc8;animation:_Axb1F-showUnderline 1.3s ease forwards}._cWTM9-animatedUnderline._qSuCO-completeAnimation:after{animation:_Axb1F-showUnderline .2s ease forwards}@keyframes _Axb1F-showUnderline{0%{width:0%}100%{width:100%}}._hoLGP-checkAnimatedUnderline{animation:_Axb1F-showUnderline 2s ease forwards;}._hoLGP-checkAnimatedUnderline._qSuCO-completeAnimation{animation:_Axb1F-showUnderline .2s ease forwards}", ""]),
            i.locals = {
                animatedUnderline: "_cWTM9-animatedUnderline",
                showUnderline: "_Axb1F-showUnderline",
                completeAnimation: "_qSuCO-completeAnimation",
                checkAnimatedUnderline: "_hoLGP-checkAnimatedUnderline"
            },
            e.exports = i
        },
        93476: e => {
            e.exports = function(e) {
                var t = [];
                return t.toString = function() {
                    return this.map((function(t) {
                        var n = "",
                            r = void 0 !== t[5];
                        return t[4] && (n += "@supports (".concat(t[4], ") {")), t[2] && (n += "@media ".concat(t[2], " {")), r && (n += "@layer".concat(t[5].length > 0 ? " ".concat(t[5]) : "", " {")), n += e(t), r && (n += "}"), t[2] && (n += "}"), t[4] && (n += "}"), n
                    })).join("")
                }, t.i = function(e, n, r, i, o) {
                    "string" == typeof e && (e = [[null, e, void 0]]);
                    var s = {};
                    if (r)
                        for (var a = 0; a < this.length; a++) {
                            var c = this[a][0];
                            null != c && (s[c] = !0)
                        }
                    for (var u = 0; u < e.length; u++) {
                        var l = [].concat(e[u]);
                        r && s[l[0]] || (void 0 !== o && (void 0 === l[5] || (l[1] = "@layer".concat(l[5].length > 0 ? " ".concat(l[5]) : "", " {").concat(l[1], "}")), l[5] = o), n && (l[2] ? (l[1] = "@media ".concat(l[2], " {").concat(l[1], "}"), l[2] = n) : l[2] = n), i && (l[4] ? (l[1] = "@supports (".concat(l[4], ") {").concat(l[1], "}"), l[4] = i) : l[4] = "".concat(i)), t.push(l))
                    }
                }, t
            }
        },
        54933: e => {
            e.exports = function(e) {
                return e[1]
            }
        },
        5114: (e, t, n) => {
            n.r(t),
            n.d(t, {
                Alt: () => Se,
                Alternative: () => Re,
                Applicative: () => we,
                Compactable: () => ke,
                Do: () => Me,
                Extend: () => Oe,
                Filterable: () => Ie,
                Foldable: () => Ee,
                Functor: () => _e,
                Monad: () => xe,
                MonadThrow: () => Fe,
                Traversable: () => Te,
                URI: () => de,
                Witherable: () => Ae,
                alt: () => V,
                altW: () => q,
                ap: () => U,
                apFirst: () => D,
                apS: () => De,
                apSecond: () => B,
                bind: () => Ue,
                bindTo: () => Le,
                chain: () => W,
                chainFirst: () => G,
                chainNullableK: () => w,
                compact: () => ee,
                duplicate: () => J,
                elem: () => Ce,
                exists: () => Pe,
                extend: () => Y,
                filter: () => re,
                filterMap: () => ie,
                flatten: () => z,
                fold: () => p,
                foldMap: () => Z,
                fromEither: () => h,
                fromNullable: () => c,
                fromNullableK: () => y,
                fromPredicate: () => u,
                getApplyMonoid: () => me,
                getApplySemigroup: () => ge,
                getEq: () => he,
                getFirstMonoid: () => be,
                getLastMonoid: () => ve,
                getLeft: () => d,
                getMonoid: () => ye,
                getOrElse: () => v,
                getOrElseW: () => b,
                getOrd: () => pe,
                getRefinement: () => je,
                getRight: () => f,
                getShow: () => fe,
                isNone: () => o,
                isSome: () => i,
                map: () => L,
                mapNullable: () => _,
                none: () => s,
                of: () => H,
                option: () => Ne,
                partition: () => oe,
                partitionMap: () => se,
                reduce: () => X,
                reduceRight: () => Q,
                separate: () => ne,
                sequence: () => ce,
                sequenceArray: () => We,
                some: () => a,
                throwError: () => K,
                toNullable: () => g,
                toUndefined: () => m,
                traverse: () => ae,
                traverseArray: () => He,
                traverseArrayWithIndex: () => Be,
                tryCatch: () => l,
                wilt: () => le,
                wither: () => ue,
                zero: () => $
            });
            var r = n(57050),
                i = function(e) {
                    return "Some" === e._tag
                },
                o = function(e) {
                    return "None" === e._tag
                },
                s = {
                    _tag: "None"
                },
                a = function(e) {
                    return {
                        _tag: "Some",
                        value: e
                    }
                };
            function c(e) {
                return null == e ? s : a(e)
            }
            function u(e) {
                return function(t) {
                    return e(t) ? a(t) : s
                }
            }
            function l(e) {
                try {
                    return a(e())
                } catch (e) {
                    return s
                }
            }
            function d(e) {
                return "Right" === e._tag ? s : a(e.left)
            }
            function f(e) {
                return "Left" === e._tag ? s : a(e.right)
            }
            var h = f;
            function p(e, t) {
                return function(n) {
                    return o(n) ? e() : t(n.value)
                }
            }
            function g(e) {
                return o(e) ? null : e.value
            }
            function m(e) {
                return o(e) ? void 0 : e.value
            }
            var b = function(e) {
                    return function(t) {
                        return o(t) ? e() : t.value
                    }
                },
                v = b;
            function y(e) {
                return function() {
                    for (var t = [], n = 0; n < arguments.length; n++)
                        t[n] = arguments[n];
                    return c(e.apply(void 0, t))
                }
            }
            var _ = w;
            function w(e) {
                return function(t) {
                    return o(t) ? s : c(e(t.value))
                }
            }
            var x = function(e, t) {
                    return (0, r.zG)(e, L(t))
                },
                E = function(e, t) {
                    return (0, r.zG)(e, U(t))
                },
                S = function(e, t) {
                    return (0, r.zG)(e, W(t))
                },
                R = function(e, t, n) {
                    return (0, r.zG)(e, X(t, n))
                },
                O = function(e) {
                    var t = Z(e);
                    return function(e, n) {
                        return (0, r.zG)(e, t(n))
                    }
                },
                k = function(e, t, n) {
                    return (0, r.zG)(e, Q(t, n))
                },
                I = function(e) {
                    var t = ae(e);
                    return function(e, n) {
                        return (0, r.zG)(e, t(n))
                    }
                },
                T = function(e, t) {
                    return (0, r.zG)(e, V(t))
                },
                A = function(e, t) {
                    return (0, r.zG)(e, re(t))
                },
                F = function(e, t) {
                    return (0, r.zG)(e, ie(t))
                },
                N = function(e, t) {
                    return (0, r.zG)(e, Y(t))
                },
                C = function(e, t) {
                    return (0, r.zG)(e, oe(t))
                },
                P = function(e, t) {
                    return (0, r.zG)(e, se(t))
                },
                j = function(e) {
                    var t = ue(e);
                    return function(e, n) {
                        return (0, r.zG)(e, t(n))
                    }
                },
                M = function(e) {
                    var t = le(e);
                    return function(e, n) {
                        return (0, r.zG)(e, t(n))
                    }
                },
                L = function(e) {
                    return function(t) {
                        return o(t) ? s : a(e(t.value))
                    }
                },
                U = function(e) {
                    return function(t) {
                        return o(t) || o(e) ? s : a(t.value(e.value))
                    }
                },
                D = function(e) {
                    return (0, r.ls)(L((function(e) {
                        return function() {
                            return e
                        }
                    })), U(e))
                },
                B = function(e) {
                    return (0, r.ls)(L((function() {
                        return function(e) {
                            return e
                        }
                    })), U(e))
                },
                H = a,
                W = function(e) {
                    return function(t) {
                        return o(t) ? s : e(t.value)
                    }
                },
                G = function(e) {
                    return W((function(t) {
                        return (0, r.zG)(e(t), L((function() {
                            return t
                        })))
                    }))
                },
                z = W(r.yR),
                q = function(e) {
                    return function(t) {
                        return o(t) ? e() : t
                    }
                },
                V = q,
                $ = function() {
                    return s
                },
                K = function() {
                    return s
                },
                Y = function(e) {
                    return function(t) {
                        return o(t) ? s : a(e(t))
                    }
                },
                J = Y(r.yR),
                X = function(e, t) {
                    return function(n) {
                        return o(n) ? e : t(e, n.value)
                    }
                },
                Z = function(e) {
                    return function(t) {
                        return function(n) {
                            return o(n) ? e.empty : t(n.value)
                        }
                    }
                },
                Q = function(e, t) {
                    return function(n) {
                        return o(n) ? e : t(n.value, e)
                    }
                },
                ee = z,
                te = {
                    left: s,
                    right: s
                },
                ne = function(e) {
                    var t = (0, r.zG)(e, L((function(e) {
                        return {
                            left: d(e),
                            right: f(e)
                        }
                    })));
                    return o(t) ? te : t.value
                },
                re = function(e) {
                    return function(t) {
                        return o(t) ? s : e(t.value) ? t : s
                    }
                },
                ie = function(e) {
                    return function(t) {
                        return o(t) ? s : e(t.value)
                    }
                },
                oe = function(e) {
                    return function(t) {
                        return {
                            left: A(t, (function(t) {
                                return !e(t)
                            })),
                            right: A(t, e)
                        }
                    }
                },
                se = function(e) {
                    return (0, r.ls)(L(e), ne)
                },
                ae = function(e) {
                    return function(t) {
                        return function(n) {
                            return o(n) ? e.of(s) : e.map(t(n.value), a)
                        }
                    }
                },
                ce = function(e) {
                    return function(t) {
                        return o(t) ? e.of(s) : e.map(t.value, a)
                    }
                },
                ue = function(e) {
                    return function(t) {
                        return function(n) {
                            return o(n) ? e.of(s) : t(n.value)
                        }
                    }
                },
                le = function(e) {
                    return function(t) {
                        return function(n) {
                            return o(n) ? e.of({
                                left: s,
                                right: s
                            }) : e.map(t(n.value), (function(e) {
                                return {
                                    left: d(e),
                                    right: f(e)
                                }
                            }))
                        }
                    }
                },
                de = "Option";
            function fe(e) {
                return {
                    show: function(t) {
                        return o(t) ? "none" : "some(" + e.show(t.value) + ")"
                    }
                }
            }
            function he(e) {
                return {
                    equals: function(t, n) {
                        return t === n || (o(t) ? o(n) : !o(n) && e.equals(t.value, n.value))
                    }
                }
            }
            function pe(e) {
                return {
                    equals: he(e).equals,
                    compare: function(t, n) {
                        return t === n ? 0 : i(t) ? i(n) ? e.compare(t.value, n.value) : 1 : -1
                    }
                }
            }
            function ge(e) {
                return {
                    concat: function(t, n) {
                        return i(t) && i(n) ? a(e.concat(t.value, n.value)) : s
                    }
                }
            }
            function me(e) {
                return {
                    concat: ge(e).concat,
                    empty: a(e.empty)
                }
            }
            function be() {
                return {
                    concat: function(e, t) {
                        return o(e) ? t : e
                    },
                    empty: s
                }
            }
            function ve() {
                return {
                    concat: function(e, t) {
                        return o(t) ? e : t
                    },
                    empty: s
                }
            }
            function ye(e) {
                return {
                    concat: function(t, n) {
                        return o(t) ? n : o(n) ? t : a(e.concat(t.value, n.value))
                    },
                    empty: s
                }
            }
            var _e = {
                    URI: de,
                    map: x
                },
                we = {
                    URI: de,
                    map: x,
                    ap: E,
                    of: H
                },
                xe = {
                    URI: de,
                    map: x,
                    ap: E,
                    of: H,
                    chain: S
                },
                Ee = {
                    URI: de,
                    reduce: R,
                    foldMap: O,
                    reduceRight: k
                },
                Se = {
                    URI: de,
                    map: x,
                    alt: T
                },
                Re = {
                    URI: de,
                    map: x,
                    ap: E,
                    of: H,
                    alt: T,
                    zero: $
                },
                Oe = {
                    URI: de,
                    map: x,
                    extend: N
                },
                ke = {
                    URI: de,
                    compact: ee,
                    separate: ne
                },
                Ie = {
                    URI: de,
                    map: x,
                    compact: ee,
                    separate: ne,
                    filter: A,
                    filterMap: F,
                    partition: C,
                    partitionMap: P
                },
                Te = {
                    URI: de,
                    map: x,
                    reduce: R,
                    foldMap: O,
                    reduceRight: k,
                    traverse: I,
                    sequence: ce
                },
                Ae = {
                    URI: de,
                    map: x,
                    reduce: R,
                    foldMap: O,
                    reduceRight: k,
                    traverse: I,
                    sequence: ce,
                    compact: ee,
                    separate: ne,
                    filter: A,
                    filterMap: F,
                    partition: C,
                    partitionMap: P,
                    wither: j,
                    wilt: M
                },
                Fe = {
                    URI: de,
                    map: x,
                    ap: E,
                    of: H,
                    chain: S,
                    throwError: K
                },
                Ne = {
                    URI: de,
                    map: x,
                    of: H,
                    ap: E,
                    chain: S,
                    reduce: R,
                    foldMap: O,
                    reduceRight: k,
                    traverse: I,
                    sequence: ce,
                    zero: $,
                    alt: T,
                    extend: N,
                    compact: ee,
                    separate: ne,
                    filter: A,
                    filterMap: F,
                    partition: C,
                    partitionMap: P,
                    wither: j,
                    wilt: M,
                    throwError: K
                };
            function Ce(e) {
                return function(t, n) {
                    return !o(n) && e.equals(t, n.value)
                }
            }
            function Pe(e) {
                return function(t) {
                    return !o(t) && e(t.value)
                }
            }
            function je(e) {
                return function(t) {
                    return i(e(t))
                }
            }
            var Me = H({}),
                Le = function(e) {
                    return L((0, r.HM)(e))
                },
                Ue = function(e, t) {
                    return W((function(n) {
                        return (0, r.zG)(t(n), L((function(t) {
                            return (0, r.mp)(n, e, t)
                        })))
                    }))
                },
                De = function(e, t) {
                    return (0, r.ls)(L((function(t) {
                        return function(n) {
                            return (0, r.mp)(t, e, n)
                        }
                    })), U(t))
                },
                Be = function(e) {
                    return function(t) {
                        for (var n = [], r = 0; r < t.length; r++) {
                            var i = e(r, t[r]);
                            if (o(i))
                                return s;
                            n.push(i.value)
                        }
                        return a(n)
                    }
                },
                He = function(e) {
                    return Be((function(t, n) {
                        return e(n)
                    }))
                },
                We = He(r.yR)
        },
        57050: (e, t, n) => {
            function r(e) {
                return e
            }
            n.d(t, {
                HM: () => v,
                MZ: () => i,
                Q1: () => d,
                Rz: () => p,
                W8: () => a,
                a9: () => s,
                bc: () => h,
                ff: () => o,
                gn: () => u,
                jv: () => c,
                ls: () => f,
                mp: () => b,
                og: () => g,
                r5: () => l,
                yR: () => r,
                zG: () => m
            });
            var i = r;
            function o(e) {
                return function(t) {
                    return !e(t)
                }
            }
            function s(e) {
                return function() {
                    return e
                }
            }
            var a = s(!0),
                c = s(!1),
                u = s(null),
                l = s(void 0),
                d = l;
            function f(e, t, n, r, i, o, s, a, c) {
                switch (arguments.length) {
                case 1:
                    return e;
                case 2:
                    return function() {
                        return t(e.apply(this, arguments))
                    };
                case 3:
                    return function() {
                        return n(t(e.apply(this, arguments)))
                    };
                case 4:
                    return function() {
                        return r(n(t(e.apply(this, arguments))))
                    };
                case 5:
                    return function() {
                        return i(r(n(t(e.apply(this, arguments)))))
                    };
                case 6:
                    return function() {
                        return o(i(r(n(t(e.apply(this, arguments))))))
                    };
                case 7:
                    return function() {
                        return s(o(i(r(n(t(e.apply(this, arguments)))))))
                    };
                case 8:
                    return function() {
                        return a(s(o(i(r(n(t(e.apply(this, arguments))))))))
                    };
                case 9:
                    return function() {
                        return c(a(s(o(i(r(n(t(e.apply(this, arguments)))))))))
                    }
                }
            }
            function h() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                return e
            }
            function p(e) {
                throw new Error("Called `absurd` function which should be uncallable")
            }
            function g(e) {
                return function(t) {
                    return e.apply(void 0, t)
                }
            }
            function m(e, t, n, r, i, o, s, a, c, u, l, d, f, h, p, g, m, b, v, y) {
                switch (arguments.length) {
                case 1:
                    return e;
                case 2:
                    return t(e);
                case 3:
                    return n(t(e));
                case 4:
                    return r(n(t(e)));
                case 5:
                    return i(r(n(t(e))));
                case 6:
                    return o(i(r(n(t(e)))));
                case 7:
                    return s(o(i(r(n(t(e))))));
                case 8:
                    return a(s(o(i(r(n(t(e)))))));
                case 9:
                    return c(a(s(o(i(r(n(t(e))))))));
                case 10:
                    return u(c(a(s(o(i(r(n(t(e)))))))));
                case 11:
                    return l(u(c(a(s(o(i(r(n(t(e))))))))));
                case 12:
                    return d(l(u(c(a(s(o(i(r(n(t(e)))))))))));
                case 13:
                    return f(d(l(u(c(a(s(o(i(r(n(t(e))))))))))));
                case 14:
                    return h(f(d(l(u(c(a(s(o(i(r(n(t(e)))))))))))));
                case 15:
                    return p(h(f(d(l(u(c(a(s(o(i(r(n(t(e))))))))))))));
                case 16:
                    return g(p(h(f(d(l(u(c(a(s(o(i(r(n(t(e)))))))))))))));
                case 17:
                    return m(g(p(h(f(d(l(u(c(a(s(o(i(r(n(t(e))))))))))))))));
                case 18:
                    return b(m(g(p(h(f(d(l(u(c(a(s(o(i(r(n(t(e)))))))))))))))));
                case 19:
                    return v(b(m(g(p(h(f(d(l(u(c(a(s(o(i(r(n(t(e))))))))))))))))));
                case 20:
                    return y(v(b(m(g(p(h(f(d(l(u(c(a(s(o(i(r(n(t(e)))))))))))))))))))
                }
            }
            var b = function(e, t, n) {
                    var r;
                    return Object.assign({}, e, ((r = {})[t] = n, r))
                },
                v = function(e) {
                    return function(t) {
                        var n;
                        return (n = {})[e] = t, n
                    }
                }
        },
        40327: (e, t, n) => {
            n.r(t),
            n.d(t, {
                pipe: () => i,
                pipeable: () => o
            });
            var r = n(57050),
                i = r.zG;
            function o(e) {
                var t = {};
                if (function(e) {
                    return "function" == typeof e.map
                }(e)) {
                    t.map = function(t) {
                        return function(n) {
                            return e.map(n, t)
                        }
                    }
                }
                if (function(e) {
                    return "function" == typeof e.contramap
                }(e)) {
                    t.contramap = function(t) {
                        return function(n) {
                            return e.contramap(n, t)
                        }
                    }
                }
                if (function(e) {
                    return "function" == typeof e.mapWithIndex
                }(e)) {
                    t.mapWithIndex = function(t) {
                        return function(n) {
                            return e.mapWithIndex(n, t)
                        }
                    }
                }
                if (function(e) {
                    return "function" == typeof e.ap
                }(e)) {
                    t.ap = function(t) {
                        return function(n) {
                            return e.ap(n, t)
                        }
                    },
                    t.apFirst = function(t) {
                        return function(n) {
                            return e.ap(e.map(n, (function(e) {
                                return function() {
                                    return e
                                }
                            })), t)
                        }
                    },
                    t.apSecond = function(t) {
                        return function(n) {
                            return e.ap(e.map(n, (function() {
                                return function(e) {
                                    return e
                                }
                            })), t)
                        }
                    }
                }
                if (function(e) {
                    return "function" == typeof e.chain
                }(e)) {
                    t.chain = function(t) {
                        return function(n) {
                            return e.chain(n, t)
                        }
                    },
                    t.chainFirst = function(t) {
                        return function(n) {
                            return e.chain(n, (function(n) {
                                return e.map(t(n), (function() {
                                    return n
                                }))
                            }))
                        }
                    },
                    t.flatten = function(t) {
                        return e.chain(t, r.yR)
                    }
                }
                if (function(e) {
                    return "function" == typeof e.bimap
                }(e)) {
                    t.bimap = function(t, n) {
                        return function(r) {
                            return e.bimap(r, t, n)
                        }
                    },
                    t.mapLeft = function(t) {
                        return function(n) {
                            return e.mapLeft(n, t)
                        }
                    }
                }
                if (function(e) {
                    return "function" == typeof e.extend
                }(e)) {
                    t.extend = function(t) {
                        return function(n) {
                            return e.extend(n, t)
                        }
                    },
                    t.duplicate = function(t) {
                        return e.extend(t, r.yR)
                    }
                }
                if (function(e) {
                    return "function" == typeof e.reduce
                }(e)) {
                    t.reduce = function(t, n) {
                        return function(r) {
                            return e.reduce(r, t, n)
                        }
                    },
                    t.foldMap = function(t) {
                        var n = e.foldMap(t);
                        return function(e) {
                            return function(t) {
                                return n(t, e)
                            }
                        }
                    },
                    t.reduceRight = function(t, n) {
                        return function(r) {
                            return e.reduceRight(r, t, n)
                        }
                    }
                }
                if (function(e) {
                    return "function" == typeof e.reduceWithIndex
                }(e)) {
                    t.reduceWithIndex = function(t, n) {
                        return function(r) {
                            return e.reduceWithIndex(r, t, n)
                        }
                    },
                    t.foldMapWithIndex = function(t) {
                        var n = e.foldMapWithIndex(t);
                        return function(e) {
                            return function(t) {
                                return n(t, e)
                            }
                        }
                    },
                    t.reduceRightWithIndex = function(t, n) {
                        return function(r) {
                            return e.reduceRightWithIndex(r, t, n)
                        }
                    }
                }
                if (function(e) {
                    return "function" == typeof e.alt
                }(e)) {
                    t.alt = function(t) {
                        return function(n) {
                            return e.alt(n, t)
                        }
                    }
                }
                if (function(e) {
                    return "function" == typeof e.compact
                }(e) && (t.compact = e.compact, t.separate = e.separate), function(e) {
                    return "function" == typeof e.filter
                }(e)) {
                    t.filter = function(t) {
                        return function(n) {
                            return e.filter(n, t)
                        }
                    },
                    t.filterMap = function(t) {
                        return function(n) {
                            return e.filterMap(n, t)
                        }
                    },
                    t.partition = function(t) {
                        return function(n) {
                            return e.partition(n, t)
                        }
                    },
                    t.partitionMap = function(t) {
                        return function(n) {
                            return e.partitionMap(n, t)
                        }
                    }
                }
                if (function(e) {
                    return "function" == typeof e.filterWithIndex
                }(e)) {
                    t.filterWithIndex = function(t) {
                        return function(n) {
                            return e.filterWithIndex(n, t)
                        }
                    },
                    t.filterMapWithIndex = function(t) {
                        return function(n) {
                            return e.filterMapWithIndex(n, t)
                        }
                    },
                    t.partitionWithIndex = function(t) {
                        return function(n) {
                            return e.partitionWithIndex(n, t)
                        }
                    },
                    t.partitionMapWithIndex = function(t) {
                        return function(n) {
                            return e.partitionMapWithIndex(n, t)
                        }
                    }
                }
                if (function(e) {
                    return "function" == typeof e.promap
                }(e)) {
                    t.promap = function(t, n) {
                        return function(r) {
                            return e.promap(r, t, n)
                        }
                    }
                }
                if (function(e) {
                    return "function" == typeof e.compose
                }(e)) {
                    t.compose = function(t) {
                        return function(n) {
                            return e.compose(n, t)
                        }
                    }
                }
                if (function(e) {
                    return "function" == typeof e.throwError
                }(e)) {
                    t.fromOption = function(t) {
                        return function(n) {
                            return "None" === n._tag ? e.throwError(t()) : e.of(n.value)
                        }
                    },
                    t.fromEither = function(t) {
                        return "Left" === t._tag ? e.throwError(t.left) : e.of(t.right)
                    },
                    t.fromPredicate = function(t, n) {
                        return function(r) {
                            return t(r) ? e.of(r) : e.throwError(n(r))
                        }
                    },
                    t.filterOrElse = function(t, n) {
                        return function(r) {
                            return e.chain(r, (function(r) {
                                return t(r) ? e.of(r) : e.throwError(n(r))
                            }))
                        }
                    }
                }
                return t
            }
        },
        70201: e => {
            e.exports = {
                animatedUnderline: "ymqHP",
                showUnderline: "JQguZ",
                completeAnimation: "ExcM8"
            }
        },
        27061: e => {
            var t,
                n,
                r = e.exports = {};
            function i() {
                throw new Error("setTimeout has not been defined")
            }
            function o() {
                throw new Error("clearTimeout has not been defined")
            }
            function s(e) {
                if (t === setTimeout)
                    return setTimeout(e, 0);
                if ((t === i || !t) && setTimeout)
                    return t = setTimeout, setTimeout(e, 0);
                try {
                    return t(e, 0)
                } catch (n) {
                    try {
                        return t.call(null, e, 0)
                    } catch (n) {
                        return t.call(this, e, 0)
                    }
                }
            }
            !function() {
                try {
                    t = "function" == typeof setTimeout ? setTimeout : i
                } catch (e) {
                    t = i
                }
                try {
                    n = "function" == typeof clearTimeout ? clearTimeout : o
                } catch (e) {
                    n = o
                }
            }();
            var a,
                c = [],
                u = !1,
                l = -1;
            function d() {
                u && a && (u = !1, a.length ? c = a.concat(c) : l = -1, c.length && f())
            }
            function f() {
                if (!u) {
                    var e = s(d);
                    u = !0;
                    for (var t = c.length; t;) {
                        for (a = c, c = []; ++l < t;)
                            a && a[l].run();
                        l = -1,
                        t = c.length
                    }
                    a = null,
                    u = !1,
                    function(e) {
                        if (n === clearTimeout)
                            return clearTimeout(e);
                        if ((n === o || !n) && clearTimeout)
                            return n = clearTimeout, clearTimeout(e);
                        try {
                            n(e)
                        } catch (t) {
                            try {
                                return n.call(null, e)
                            } catch (t) {
                                return n.call(this, e)
                            }
                        }
                    }(e)
                }
            }
            function h(e, t) {
                this.fun = e,
                this.array = t
            }
            function p() {}
            r.nextTick = function(e) {
                var t = new Array(arguments.length - 1);
                if (arguments.length > 1)
                    for (var n = 1; n < arguments.length; n++)
                        t[n - 1] = arguments[n];
                c.push(new h(e, t)),
                1 !== c.length || u || s(f)
            },
            h.prototype.run = function() {
                this.fun.apply(null, this.array)
            },
            r.title = "browser",
            r.browser = !0,
            r.env = {},
            r.argv = [],
            r.version = "",
            r.versions = {},
            r.on = p,
            r.addListener = p,
            r.once = p,
            r.off = p,
            r.removeListener = p,
            r.removeAllListeners = p,
            r.emit = p,
            r.prependListener = p,
            r.prependOnceListener = p,
            r.listeners = function(e) {
                return []
            },
            r.binding = function(e) {
                throw new Error("process.binding is not supported")
            },
            r.cwd = function() {
                return "/"
            },
            r.chdir = function(e) {
                throw new Error("process.chdir is not supported")
            },
            r.umask = function() {
                return 0
            }
        },
        95300: (e, t, n) => {
            n.d(t, {
                X: () => s
            });
            var r = n(59312),
                i = n(32952),
                o = n(82987),
                s = function(e) {
                    function t(t) {
                        var n = e.call(this) || this;
                        return n._value = t, n
                    }
                    return r.__extends(t, e), Object.defineProperty(t.prototype, "value", {
                        get: function() {
                            return this.getValue()
                        },
                        enumerable: !0,
                        configurable: !0
                    }), t.prototype._subscribe = function(t) {
                        var n = e.prototype._subscribe.call(this, t);
                        return n && !n.closed && t.next(this._value), n
                    }, t.prototype.getValue = function() {
                        if (this.hasError)
                            throw this.thrownError;
                        if (this.closed)
                            throw new o.N;
                        return this._value
                    }, t.prototype.next = function(t) {
                        e.prototype.next.call(this, this._value = t)
                    }, t
                }(i.xQ)
        },
        7882: (e, t, n) => {
            n.d(t, {
                d: () => i
            });
            var r = n(59312),
                i = function(e) {
                    function t(t, n, r) {
                        var i = e.call(this) || this;
                        return i.parent = t, i.outerValue = n, i.outerIndex = r, i.index = 0, i
                    }
                    return r.__extends(t, e), t.prototype._next = function(e) {
                        this.parent.notifyNext(this.outerValue, e, this.outerIndex, this.index++, this)
                    }, t.prototype._error = function(e) {
                        this.parent.notifyError(e, this),
                        this.unsubscribe()
                    }, t.prototype._complete = function() {
                        this.parent.notifyComplete(this),
                        this.unsubscribe()
                    }, t
                }(n(98036).L)
        },
        12834: (e, t, n) => {
            n.d(t, {
                P: () => a
            });
            var r,
                i = n(40151),
                o = n(76974),
                s = n(91402);
            r || (r = {});
            var a = function() {
                function e(e, t, n) {
                    this.kind = e,
                    this.value = t,
                    this.error = n,
                    this.hasValue = "N" === e
                }
                return e.prototype.observe = function(e) {
                    switch (this.kind) {
                    case "N":
                        return e.next && e.next(this.value);
                    case "E":
                        return e.error && e.error(this.error);
                    case "C":
                        return e.complete && e.complete()
                    }
                }, e.prototype.do = function(e, t, n) {
                    switch (this.kind) {
                    case "N":
                        return e && e(this.value);
                    case "E":
                        return t && t(this.error);
                    case "C":
                        return n && n()
                    }
                }, e.prototype.accept = function(e, t, n) {
                    return e && "function" == typeof e.next ? this.observe(e) : this.do(e, t, n)
                }, e.prototype.toObservable = function() {
                    switch (this.kind) {
                    case "N":
                        return (0, o.of)(this.value);
                    case "E":
                        return (0, s._)(this.error);
                    case "C":
                        return (0, i.c)()
                    }
                    throw new Error("unexpected notification kind value")
                }, e.createNext = function(t) {
                    return void 0 !== t ? new e("N", t) : e.undefinedValueNotification
                }, e.createError = function(t) {
                    return new e("E", void 0, t)
                }, e.createComplete = function() {
                    return e.completeNotification
                }, e.completeNotification = new e("C"), e.undefinedValueNotification = new e("N", void 0), e
            }()
        },
        44586: (e, t, n) => {
            n.d(t, {
                y: () => c
            });
            var r = n(51106),
                i = n(85063),
                o = n(58569),
                s = n(87072),
                a = n(79910),
                c = function() {
                    function e(e) {
                        this._isScalar = !1,
                        e && (this._subscribe = e)
                    }
                    return e.prototype.lift = function(t) {
                        var n = new e;
                        return n.source = this, n.operator = t, n
                    }, e.prototype.subscribe = function(e, t, n) {
                        var r = this.operator,
                            o = (0, i.Y)(e, t, n);
                        if (r ? o.add(r.call(o, this.source)) : o.add(this.source || a.v.useDeprecatedSynchronousErrorHandling && !o.syncErrorThrowable ? this._subscribe(o) : this._trySubscribe(o)), a.v.useDeprecatedSynchronousErrorHandling && o.syncErrorThrowable && (o.syncErrorThrowable = !1, o.syncErrorThrown))
                            throw o.syncErrorValue;
                        return o
                    }, e.prototype._trySubscribe = function(e) {
                        try {
                            return this._subscribe(e)
                        } catch (t) {
                            a.v.useDeprecatedSynchronousErrorHandling && (e.syncErrorThrown = !0, e.syncErrorValue = t),
                            (0, r._)(e) ? e.error(t) : console.warn(t)
                        }
                    }, e.prototype.forEach = function(e, t) {
                        var n = this;
                        return new (t = u(t))((function(t, r) {
                            var i;
                            i = n.subscribe((function(t) {
                                try {
                                    e(t)
                                } catch (e) {
                                    r(e),
                                    i && i.unsubscribe()
                                }
                            }), r, t)
                        }))
                    }, e.prototype._subscribe = function(e) {
                        var t = this.source;
                        return t && t.subscribe(e)
                    }, e.prototype[o.L] = function() {
                        return this
                    }, e.prototype.pipe = function() {
                        for (var e = [], t = 0; t < arguments.length; t++)
                            e[t] = arguments[t];
                        return 0 === e.length ? this : (0, s.U)(e)(this)
                    }, e.prototype.toPromise = function(e) {
                        var t = this;
                        return new (e = u(e))((function(e, n) {
                            var r;
                            t.subscribe((function(e) {
                                return r = e
                            }), (function(e) {
                                return n(e)
                            }), (function() {
                                return e(r)
                            }))
                        }))
                    }, e.create = function(t) {
                        return new e(t)
                    }, e
                }();
            function u(e) {
                if (e || (e = a.v.Promise || Promise), !e)
                    throw new Error("no Promise impl found");
                return e
            }
        },
        76535: (e, t, n) => {
            n.d(t, {
                c: () => o
            });
            var r = n(79910),
                i = n(94224),
                o = {
                    closed: !0,
                    next: function(e) {},
                    error: function(e) {
                        if (r.v.useDeprecatedSynchronousErrorHandling)
                            throw e;
                        (0, i.z)(e)
                    },
                    complete: function() {}
                }
        },
        57655: (e, t, n) => {
            n.d(t, {
                L: () => i
            });
            var r = n(59312),
                i = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r.__extends(t, e), t.prototype.notifyNext = function(e, t, n, r, i) {
                        this.destination.next(t)
                    }, t.prototype.notifyError = function(e, t) {
                        this.destination.error(e)
                    }, t.prototype.notifyComplete = function(e) {
                        this.destination.complete()
                    }, t
                }(n(98036).L)
        },
        75302: (e, t, n) => {
            n.d(t, {
                b: () => r
            });
            var r = function() {
                function e(t, n) {
                    void 0 === n && (n = e.now),
                    this.SchedulerAction = t,
                    this.now = n
                }
                return e.prototype.schedule = function(e, t, n) {
                    return void 0 === t && (t = 0), new this.SchedulerAction(this, e).schedule(n, t)
                }, e.now = function() {
                    return Date.now()
                }, e
            }()
        },
        32952: (e, t, n) => {
            n.d(t, {
                Yc: () => l,
                xQ: () => d
            });
            var r = n(59312),
                i = n(44586),
                o = n(98036),
                s = n(14601),
                a = n(82987),
                c = n(51715),
                u = n(42545),
                l = function(e) {
                    function t(t) {
                        var n = e.call(this, t) || this;
                        return n.destination = t, n
                    }
                    return r.__extends(t, e), t
                }(o.L),
                d = function(e) {
                    function t() {
                        var t = e.call(this) || this;
                        return t.observers = [], t.closed = !1, t.isStopped = !1, t.hasError = !1, t.thrownError = null, t
                    }
                    return r.__extends(t, e), t.prototype[u.b] = function() {
                        return new l(this)
                    }, t.prototype.lift = function(e) {
                        var t = new f(this, this);
                        return t.operator = e, t
                    }, t.prototype.next = function(e) {
                        if (this.closed)
                            throw new a.N;
                        if (!this.isStopped)
                            for (var t = this.observers, n = t.length, r = t.slice(), i = 0; i < n; i++)
                                r[i].next(e)
                    }, t.prototype.error = function(e) {
                        if (this.closed)
                            throw new a.N;
                        this.hasError = !0,
                        this.thrownError = e,
                        this.isStopped = !0;
                        for (var t = this.observers, n = t.length, r = t.slice(), i = 0; i < n; i++)
                            r[i].error(e);
                        this.observers.length = 0
                    }, t.prototype.complete = function() {
                        if (this.closed)
                            throw new a.N;
                        this.isStopped = !0;
                        for (var e = this.observers, t = e.length, n = e.slice(), r = 0; r < t; r++)
                            n[r].complete();
                        this.observers.length = 0
                    }, t.prototype.unsubscribe = function() {
                        this.isStopped = !0,
                        this.closed = !0,
                        this.observers = null
                    }, t.prototype._trySubscribe = function(t) {
                        if (this.closed)
                            throw new a.N;
                        return e.prototype._trySubscribe.call(this, t)
                    }, t.prototype._subscribe = function(e) {
                        if (this.closed)
                            throw new a.N;
                        return this.hasError ? (e.error(this.thrownError), s.w.EMPTY) : this.isStopped ? (e.complete(), s.w.EMPTY) : (this.observers.push(e), new c.W(this, e))
                    }, t.prototype.asObservable = function() {
                        var e = new i.y;
                        return e.source = this, e
                    }, t.create = function(e, t) {
                        return new f(e, t)
                    }, t
                }(i.y),
                f = function(e) {
                    function t(t, n) {
                        var r = e.call(this) || this;
                        return r.destination = t, r.source = n, r
                    }
                    return r.__extends(t, e), t.prototype.next = function(e) {
                        var t = this.destination;
                        t && t.next && t.next(e)
                    }, t.prototype.error = function(e) {
                        var t = this.destination;
                        t && t.error && this.destination.error(e)
                    }, t.prototype.complete = function() {
                        var e = this.destination;
                        e && e.complete && this.destination.complete()
                    }, t.prototype._subscribe = function(e) {
                        return this.source ? this.source.subscribe(e) : s.w.EMPTY
                    }, t
                }(d)
        },
        51715: (e, t, n) => {
            n.d(t, {
                W: () => i
            });
            var r = n(59312),
                i = function(e) {
                    function t(t, n) {
                        var r = e.call(this) || this;
                        return r.subject = t, r.subscriber = n, r.closed = !1, r
                    }
                    return r.__extends(t, e), t.prototype.unsubscribe = function() {
                        if (!this.closed) {
                            this.closed = !0;
                            var e = this.subject,
                                t = e.observers;
                            if (this.subject = null, t && 0 !== t.length && !e.isStopped && !e.closed) {
                                var n = t.indexOf(this.subscriber);
                                -1 !== n && t.splice(n, 1)
                            }
                        }
                    }, t
                }(n(14601).w)
        },
        98036: (e, t, n) => {
            n.d(t, {
                L: () => l
            });
            var r = n(59312),
                i = n(55427),
                o = n(76535),
                s = n(14601),
                a = n(42545),
                c = n(79910),
                u = n(94224),
                l = function(e) {
                    function t(n, r, i) {
                        var s = e.call(this) || this;
                        switch (s.syncErrorValue = null, s.syncErrorThrown = !1, s.syncErrorThrowable = !1, s.isStopped = !1, arguments.length) {
                        case 0:
                            s.destination = o.c;
                            break;
                        case 1:
                            if (!n) {
                                s.destination = o.c;
                                break
                            }
                            if ("object" == typeof n) {
                                n instanceof t ? (s.syncErrorThrowable = n.syncErrorThrowable, s.destination = n, n.add(s)) : (s.syncErrorThrowable = !0, s.destination = new d(s, n));
                                break
                            }
                        default:
                            s.syncErrorThrowable = !0,
                            s.destination = new d(s, n, r, i)
                        }
                        return s
                    }
                    return r.__extends(t, e), t.prototype[a.b] = function() {
                        return this
                    }, t.create = function(e, n, r) {
                        var i = new t(e, n, r);
                        return i.syncErrorThrowable = !1, i
                    }, t.prototype.next = function(e) {
                        this.isStopped || this._next(e)
                    }, t.prototype.error = function(e) {
                        this.isStopped || (this.isStopped = !0, this._error(e))
                    }, t.prototype.complete = function() {
                        this.isStopped || (this.isStopped = !0, this._complete())
                    }, t.prototype.unsubscribe = function() {
                        this.closed || (this.isStopped = !0, e.prototype.unsubscribe.call(this))
                    }, t.prototype._next = function(e) {
                        this.destination.next(e)
                    }, t.prototype._error = function(e) {
                        this.destination.error(e),
                        this.unsubscribe()
                    }, t.prototype._complete = function() {
                        this.destination.complete(),
                        this.unsubscribe()
                    }, t.prototype._unsubscribeAndRecycle = function() {
                        var e = this._parentOrParents;
                        return this._parentOrParents = null, this.unsubscribe(), this.closed = !1, this.isStopped = !1, this._parentOrParents = e, this
                    }, t
                }(s.w),
                d = function(e) {
                    function t(t, n, r, s) {
                        var a,
                            c = e.call(this) || this;
                        c._parentSubscriber = t;
                        var u = c;
                        return (0, i.m)(n) ? a = n : n && (a = n.next, r = n.error, s = n.complete, n !== o.c && (u = Object.create(n), (0, i.m)(u.unsubscribe) && c.add(u.unsubscribe.bind(u)), u.unsubscribe = c.unsubscribe.bind(c))), c._context = u, c._next = a, c._error = r, c._complete = s, c
                    }
                    return r.__extends(t, e), t.prototype.next = function(e) {
                        if (!this.isStopped && this._next) {
                            var t = this._parentSubscriber;
                            c.v.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable ? this.__tryOrSetError(t, this._next, e) && this.unsubscribe() : this.__tryOrUnsub(this._next, e)
                        }
                    }, t.prototype.error = function(e) {
                        if (!this.isStopped) {
                            var t = this._parentSubscriber,
                                n = c.v.useDeprecatedSynchronousErrorHandling;
                            if (this._error)
                                n && t.syncErrorThrowable ? (this.__tryOrSetError(t, this._error, e), this.unsubscribe()) : (this.__tryOrUnsub(this._error, e), this.unsubscribe());
                            else if (t.syncErrorThrowable)
                                n ? (t.syncErrorValue = e, t.syncErrorThrown = !0) : (0, u.z)(e),
                                this.unsubscribe();
                            else {
                                if (this.unsubscribe(), n)
                                    throw e;
                                (0, u.z)(e)
                            }
                        }
                    }, t.prototype.complete = function() {
                        var e = this;
                        if (!this.isStopped) {
                            var t = this._parentSubscriber;
                            if (this._complete) {
                                var n = function() {
                                    return e._complete.call(e._context)
                                };
                                c.v.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable ? (this.__tryOrSetError(t, n), this.unsubscribe()) : (this.__tryOrUnsub(n), this.unsubscribe())
                            } else
                                this.unsubscribe()
                        }
                    }, t.prototype.__tryOrUnsub = function(e, t) {
                        try {
                            e.call(this._context, t)
                        } catch (e) {
                            if (this.unsubscribe(), c.v.useDeprecatedSynchronousErrorHandling)
                                throw e;
                            (0, u.z)(e)
                        }
                    }, t.prototype.__tryOrSetError = function(e, t, n) {
                        if (!c.v.useDeprecatedSynchronousErrorHandling)
                            throw new Error("bad call");
                        try {
                            t.call(this._context, n)
                        } catch (t) {
                            return c.v.useDeprecatedSynchronousErrorHandling ? (e.syncErrorValue = t, e.syncErrorThrown = !0, !0) : ((0, u.z)(t), !0)
                        }
                        return !1
                    }, t.prototype._unsubscribe = function() {
                        var e = this._parentSubscriber;
                        this._context = null,
                        this._parentSubscriber = null,
                        e.unsubscribe()
                    }, t
                }(l)
        },
        14601: (e, t, n) => {
            n.d(t, {
                w: () => a
            });
            var r = n(17733),
                i = n(79582),
                o = n(55427),
                s = n(28558),
                a = function() {
                    function e(e) {
                        this.closed = !1,
                        this._parentOrParents = null,
                        this._subscriptions = null,
                        e && (this._ctorUnsubscribe = !0, this._unsubscribe = e)
                    }
                    var t;
                    return e.prototype.unsubscribe = function() {
                        var t;
                        if (!this.closed) {
                            var n = this,
                                a = n._parentOrParents,
                                u = n._ctorUnsubscribe,
                                l = n._unsubscribe,
                                d = n._subscriptions;
                            if (this.closed = !0, this._parentOrParents = null, this._subscriptions = null, a instanceof e)
                                a.remove(this);
                            else if (null !== a)
                                for (var f = 0; f < a.length; ++f) {
                                    a[f].remove(this)
                                }
                            if ((0, o.m)(l)) {
                                u && (this._unsubscribe = void 0);
                                try {
                                    l.call(this)
                                } catch (e) {
                                    t = e instanceof s.B ? c(e.errors) : [e]
                                }
                            }
                            if ((0, r.k)(d)) {
                                f = -1;
                                for (var h = d.length; ++f < h;) {
                                    var p = d[f];
                                    if ((0, i.K)(p))
                                        try {
                                            p.unsubscribe()
                                        } catch (e) {
                                            t = t || [],
                                            e instanceof s.B ? t = t.concat(c(e.errors)) : t.push(e)
                                        }
                                }
                            }
                            if (t)
                                throw new s.B(t)
                        }
                    }, e.prototype.add = function(t) {
                        var n = t;
                        if (!t)
                            return e.EMPTY;
                        switch (typeof t) {
                        case "function":
                            n = new e(t);
                        case "object":
                            if (n === this || n.closed || "function" != typeof n.unsubscribe)
                                return n;
                            if (this.closed)
                                return n.unsubscribe(), n;
                            if (!(n instanceof e)) {
                                var r = n;
                                (n = new e)._subscriptions = [r]
                            }
                            break;
                        default:
                            throw new Error("unrecognized teardown " + t + " added to Subscription.")
                        }
                        var i = n._parentOrParents;
                        if (null === i)
                            n._parentOrParents = this;
                        else if (i instanceof e) {
                            if (i === this)
                                return n;
                            n._parentOrParents = [i, this]
                        } else {
                            if (-1 !== i.indexOf(this))
                                return n;
                            i.push(this)
                        }
                        var o = this._subscriptions;
                        return null === o ? this._subscriptions = [n] : o.push(n), n
                    }, e.prototype.remove = function(e) {
                        var t = this._subscriptions;
                        if (t) {
                            var n = t.indexOf(e);
                            -1 !== n && t.splice(n, 1)
                        }
                    }, e.EMPTY = ((t = new e).closed = !0, t), e
                }();
            function c(e) {
                return e.reduce((function(e, t) {
                    return e.concat(t instanceof s.B ? t.errors : t)
                }), [])
            }
        },
        79910: (e, t, n) => {
            n.d(t, {
                v: () => i
            });
            var r = !1,
                i = {
                    Promise: void 0,
                    set useDeprecatedSynchronousErrorHandling(e) {
                        e && (new Error).stack;
                        r = e
                    },
                    get useDeprecatedSynchronousErrorHandling() {
                        return r
                    }
                }
        },
        46601: (e, t, n) => {
            n.d(t, {
                Ds: () => c,
                IY: () => a,
                ft: () => u
            });
            var r = n(59312),
                i = n(98036),
                o = n(44586),
                s = n(35316),
                a = function(e) {
                    function t(t) {
                        var n = e.call(this) || this;
                        return n.parent = t, n
                    }
                    return r.__extends(t, e), t.prototype._next = function(e) {
                        this.parent.notifyNext(e)
                    }, t.prototype._error = function(e) {
                        this.parent.notifyError(e),
                        this.unsubscribe()
                    }, t.prototype._complete = function() {
                        this.parent.notifyComplete(),
                        this.unsubscribe()
                    }, t
                }(i.L),
                c = (i.L, function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r.__extends(t, e), t.prototype.notifyNext = function(e) {
                        this.destination.next(e)
                    }, t.prototype.notifyError = function(e) {
                        this.destination.error(e)
                    }, t.prototype.notifyComplete = function() {
                        this.destination.complete()
                    }, t
                }(i.L));
            i.L;
            function u(e, t) {
                if (!t.closed)
                    return e instanceof o.y ? e.subscribe(t) : (0, s.s)(e)(t)
            }
        },
        68571: (e, t, n) => {
            n.d(t, {
                N: () => l,
                c: () => u
            });
            var r = n(59312),
                i = n(32952),
                o = n(44586),
                s = n(98036),
                a = n(14601),
                c = n(95343),
                u = function(e) {
                    function t(t, n) {
                        var r = e.call(this) || this;
                        return r.source = t, r.subjectFactory = n, r._refCount = 0, r._isComplete = !1, r
                    }
                    return r.__extends(t, e), t.prototype._subscribe = function(e) {
                        return this.getSubject().subscribe(e)
                    }, t.prototype.getSubject = function() {
                        var e = this._subject;
                        return e && !e.isStopped || (this._subject = this.subjectFactory()), this._subject
                    }, t.prototype.connect = function() {
                        var e = this._connection;
                        return e || (this._isComplete = !1, (e = this._connection = new a.w).add(this.source.subscribe(new d(this.getSubject(), this))), e.closed && (this._connection = null, e = a.w.EMPTY)), e
                    }, t.prototype.refCount = function() {
                        return (0, c.x)()(this)
                    }, t
                }(o.y),
                l = function() {
                    var e = u.prototype;
                    return {
                        operator: {
                            value: null
                        },
                        _refCount: {
                            value: 0,
                            writable: !0
                        },
                        _subject: {
                            value: null,
                            writable: !0
                        },
                        _connection: {
                            value: null,
                            writable: !0
                        },
                        _subscribe: {
                            value: e._subscribe
                        },
                        _isComplete: {
                            value: e._isComplete,
                            writable: !0
                        },
                        getSubject: {
                            value: e.getSubject
                        },
                        connect: {
                            value: e.connect
                        },
                        refCount: {
                            value: e.refCount
                        }
                    }
                }(),
                d = function(e) {
                    function t(t, n) {
                        var r = e.call(this, t) || this;
                        return r.connectable = n, r
                    }
                    return r.__extends(t, e), t.prototype._error = function(t) {
                        this._unsubscribe(),
                        e.prototype._error.call(this, t)
                    }, t.prototype._complete = function() {
                        this.connectable._isComplete = !0,
                        this._unsubscribe(),
                        e.prototype._complete.call(this)
                    }, t.prototype._unsubscribe = function() {
                        var e = this.connectable;
                        if (e) {
                            this.connectable = null;
                            var t = e._connection;
                            e._refCount = 0,
                            e._subject = null,
                            e._connection = null,
                            t && t.unsubscribe()
                        }
                    }, t
                }(i.Yc);
            s.L
        },
        2844: (e, t, n) => {
            n.d(t, {
                Ms: () => d,
                aj: () => l
            });
            var r = n(59312),
                i = n(67827),
                o = n(17733),
                s = n(57655),
                a = n(72500),
                c = n(81967),
                u = {};
            function l() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                var n = void 0,
                    r = void 0;
                return (0, i.K)(e[e.length - 1]) && (r = e.pop()), "function" == typeof e[e.length - 1] && (n = e.pop()), 1 === e.length && (0, o.k)(e[0]) && (e = e[0]), (0, c.n)(e, r).lift(new d(n))
            }
            var d = function() {
                    function e(e) {
                        this.resultSelector = e
                    }
                    return e.prototype.call = function(e, t) {
                        return t.subscribe(new f(e, this.resultSelector))
                    }, e
                }(),
                f = function(e) {
                    function t(t, n) {
                        var r = e.call(this, t) || this;
                        return r.resultSelector = n, r.active = 0, r.values = [], r.observables = [], r
                    }
                    return r.__extends(t, e), t.prototype._next = function(e) {
                        this.values.push(u),
                        this.observables.push(e)
                    }, t.prototype._complete = function() {
                        var e = this.observables,
                            t = e.length;
                        if (0 === t)
                            this.destination.complete();
                        else {
                            this.active = t,
                            this.toRespond = t;
                            for (var n = 0; n < t; n++) {
                                var r = e[n];
                                this.add((0, a.D)(this, r, void 0, n))
                            }
                        }
                    }, t.prototype.notifyComplete = function(e) {
                        0 == (this.active -= 1) && this.destination.complete()
                    }, t.prototype.notifyNext = function(e, t, n) {
                        var r = this.values,
                            i = r[n],
                            o = this.toRespond ? i === u ? --this.toRespond : this.toRespond : 0;
                        r[n] = t,
                        0 === o && (this.resultSelector ? this._tryResultSelector(r) : this.destination.next(r.slice()))
                    }, t.prototype._tryResultSelector = function(e) {
                        var t;
                        try {
                            t = this.resultSelector.apply(this, e)
                        } catch (e) {
                            return void this.destination.error(e)
                        }
                        this.destination.next(t)
                    }, t
                }(s.L)
        },
        95399: (e, t, n) => {
            n.d(t, {
                z: () => o
            });
            var r = n(76974),
                i = n(44212);
            function o() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                return (0, i.u)()(r.of.apply(void 0, e))
            }
        },
        18625: (e, t, n) => {
            n.d(t, {
                P: () => s
            });
            var r = n(44586),
                i = n(12126),
                o = n(40151);
            function s(e) {
                return new r.y((function(t) {
                    var n;
                    try {
                        n = e()
                    } catch (e) {
                        return void t.error(e)
                    }
                    return (n ? (0, i.D)(n) : (0, o.c)()).subscribe(t)
                }))
            }
        },
        40151: (e, t, n) => {
            n.d(t, {
                E: () => i,
                c: () => o
            });
            var r = n(44586),
                i = new r.y((function(e) {
                    return e.complete()
                }));
            function o(e) {
                return e ? function(e) {
                    return new r.y((function(t) {
                        return e.schedule((function() {
                            return t.complete()
                        }))
                    }))
                }(e) : i
            }
        },
        12126: (e, t, n) => {
            n.d(t, {
                D: () => s
            });
            var r = n(44586),
                i = n(35316),
                o = n(40663);
            function s(e, t) {
                return t ? (0, o.x)(e, t) : e instanceof r.y ? e : new r.y((0, i.s)(e))
            }
        },
        81967: (e, t, n) => {
            n.d(t, {
                n: () => s
            });
            var r = n(44586),
                i = n(84464),
                o = n(11315);
            function s(e, t) {
                return t ? (0, o.r)(e, t) : new r.y((0, i.V)(e))
            }
        },
        49708: (e, t, n) => {
            n.d(t, {
                R: () => a
            });
            var r = n(44586),
                i = n(17733),
                o = n(55427),
                s = n(77176);
            function a(e, t, n, u) {
                return (0, o.m)(n) && (u = n, n = void 0), u ? a(e, t, n).pipe((0, s.U)((function(e) {
                    return (0, i.k)(e) ? u.apply(void 0, e) : u(e)
                }))) : new r.y((function(r) {
                    c(e, t, (function(e) {
                        arguments.length > 1 ? r.next(Array.prototype.slice.call(arguments)) : r.next(e)
                    }), r, n)
                }))
            }
            function c(e, t, n, r, i) {
                var o;
                if (function(e) {
                    return e && "function" == typeof e.addEventListener && "function" == typeof e.removeEventListener
                }(e)) {
                    var s = e;
                    e.addEventListener(t, n, i),
                    o = function() {
                        return s.removeEventListener(t, n, i)
                    }
                } else if (function(e) {
                    return e && "function" == typeof e.on && "function" == typeof e.off
                }(e)) {
                    var a = e;
                    e.on(t, n),
                    o = function() {
                        return a.off(t, n)
                    }
                } else if (function(e) {
                    return e && "function" == typeof e.addListener && "function" == typeof e.removeListener
                }(e)) {
                    var u = e;
                    e.addListener(t, n),
                    o = function() {
                        return u.removeListener(t, n)
                    }
                } else {
                    if (!e || !e.length)
                        throw new TypeError("Invalid event target");
                    for (var l = 0, d = e.length; l < d; l++)
                        c(e[l], t, n, r, i)
                }
                r.add(o)
            }
        },
        8175: (e, t, n) => {
            n.d(t, {
                R: () => a
            });
            var r = n(44586),
                i = n(17733),
                o = n(55427),
                s = n(77176);
            function a(e, t, n) {
                return n ? a(e, t).pipe((0, s.U)((function(e) {
                    return (0, i.k)(e) ? n.apply(void 0, e) : n(e)
                }))) : new r.y((function(n) {
                    var r,
                        i = function() {
                            for (var e = [], t = 0; t < arguments.length; t++)
                                e[t] = arguments[t];
                            return n.next(1 === e.length ? e[0] : e)
                        };
                    try {
                        r = e(i)
                    } catch (e) {
                        return void n.error(e)
                    }
                    if ((0, o.m)(t))
                        return function() {
                            return t(i, r)
                        }
                }))
            }
        },
        77843: (e, t, n) => {
            n.d(t, {
                F: () => s
            });
            var r = n(44586),
                i = n(82506),
                o = n(44362);
            function s(e, t) {
                return void 0 === e && (e = 0), void 0 === t && (t = i.P), (!(0, o.k)(e) || e < 0) && (e = 0), t && "function" == typeof t.schedule || (t = i.P), new r.y((function(n) {
                    return n.add(t.schedule(a, e, {
                        subscriber: n,
                        counter: 0,
                        period: e
                    })), n
                }))
            }
            function a(e) {
                var t = e.subscriber,
                    n = e.counter,
                    r = e.period;
                t.next(n),
                this.schedule({
                    subscriber: t,
                    counter: n + 1,
                    period: r
                }, r)
            }
        },
        24209: (e, t, n) => {
            n.d(t, {
                T: () => a
            });
            var r = n(44586),
                i = n(67827),
                o = n(68425),
                s = n(81967);
            function a() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                var n = Number.POSITIVE_INFINITY,
                    a = null,
                    c = e[e.length - 1];
                return (0, i.K)(c) ? (a = e.pop(), e.length > 1 && "number" == typeof e[e.length - 1] && (n = e.pop())) : "number" == typeof c && (n = e.pop()), null === a && 1 === e.length && e[0] instanceof r.y ? e[0] : (0, o.J)(n)((0, s.n)(e, a))
            }
        },
        76974: (e, t, n) => {
            n.d(t, {
                of: () => s
            });
            var r = n(67827),
                i = n(81967),
                o = n(11315);
            function s() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                var n = e[e.length - 1];
                return (0, r.K)(n) ? (e.pop(), (0, o.r)(e, n)) : (0, i.n)(e)
            }
        },
        81407: (e, t, n) => {
            n.d(t, {
                u: () => a
            });
            var r = n(96451),
                i = n(35316),
                o = n(85985),
                s = n(44586);
            function a(e, t, n) {
                return [(0, o.h)(t, n)(new s.y((0, i.s)(e))), (0, o.h)((0, r.f)(t, n))(new s.y((0, i.s)(e)))]
            }
        },
        91402: (e, t, n) => {
            n.d(t, {
                _: () => i
            });
            var r = n(44586);
            function i(e, t) {
                return t ? new r.y((function(n) {
                    return t.schedule(o, 0, {
                        error: e,
                        subscriber: n
                    })
                })) : new r.y((function(t) {
                    return t.error(e)
                }))
            }
            function o(e) {
                var t = e.error;
                e.subscriber.error(t)
            }
        },
        80900: (e, t, n) => {
            n.d(t, {
                H: () => a
            });
            var r = n(44586),
                i = n(82506),
                o = n(44362),
                s = n(67827);
            function a(e, t, n) {
                void 0 === e && (e = 0);
                var a = -1;
                return (0, o.k)(t) ? a = Number(t) < 1 ? 1 : Number(t) : (0, s.K)(t) && (n = t), (0, s.K)(n) || (n = i.P), new r.y((function(t) {
                    var r = (0, o.k)(e) ? e : +e - n.now();
                    return n.schedule(c, r, {
                        index: 0,
                        period: a,
                        subscriber: t
                    })
                }))
            }
            function c(e) {
                var t = e.index,
                    n = e.period,
                    r = e.subscriber;
                if (r.next(t), !r.closed) {
                    if (-1 === n)
                        return r.complete();
                    e.index = t + 1,
                    this.schedule(e, n)
                }
            }
        },
        33665: (e, t, n) => {
            n.d(t, {
                g: () => s
            });
            var r = n(44586),
                i = n(12126),
                o = n(40151);
            function s(e, t) {
                return new r.y((function(n) {
                    var r,
                        s;
                    try {
                        r = e()
                    } catch (e) {
                        return void n.error(e)
                    }
                    try {
                        s = t(r)
                    } catch (e) {
                        return void n.error(e)
                    }
                    var a = (s ? (0, i.D)(s) : o.E).subscribe(n);
                    return function() {
                        a.unsubscribe(),
                        r && r.unsubscribe()
                    }
                }))
            }
        },
        36919: (e, t, n) => {
            n.d(t, {
                f: () => o
            });
            var r = n(59312),
                i = n(46601);
            function o(e) {
                return function(t) {
                    return t.lift(new s(e))
                }
            }
            var s = function() {
                    function e(e) {
                        this.closingNotifier = e
                    }
                    return e.prototype.call = function(e, t) {
                        return t.subscribe(new a(e, this.closingNotifier))
                    }, e
                }(),
                a = function(e) {
                    function t(t, n) {
                        var r = e.call(this, t) || this;
                        return r.buffer = [], r.add((0, i.ft)(n, new i.IY(r))), r
                    }
                    return r.__extends(t, e), t.prototype._next = function(e) {
                        this.buffer.push(e)
                    }, t.prototype.notifyNext = function() {
                        var e = this.buffer;
                        this.buffer = [],
                        this.destination.next(e)
                    }, t
                }(i.Ds)
        },
        44212: (e, t, n) => {
            n.d(t, {
                u: () => i
            });
            var r = n(68425);
            function i() {
                return (0, r.J)(1)
            }
        },
        71032: (e, t, n) => {
            n.d(t, {
                b: () => i
            });
            var r = n(85321);
            function i(e, t) {
                return (0, r.zg)(e, t, 1)
            }
        },
        78674: (e, t, n) => {
            n.d(t, {
                b: () => s
            });
            var r = n(59312),
                i = n(98036),
                o = n(82506);
            function s(e, t) {
                return void 0 === t && (t = o.P), function(n) {
                    return n.lift(new a(e, t))
                }
            }
            var a = function() {
                    function e(e, t) {
                        this.dueTime = e,
                        this.scheduler = t
                    }
                    return e.prototype.call = function(e, t) {
                        return t.subscribe(new c(e, this.dueTime, this.scheduler))
                    }, e
                }(),
                c = function(e) {
                    function t(t, n, r) {
                        var i = e.call(this, t) || this;
                        return i.dueTime = n, i.scheduler = r, i.debouncedSubscription = null, i.lastValue = null, i.hasValue = !1, i
                    }
                    return r.__extends(t, e), t.prototype._next = function(e) {
                        this.clearDebounce(),
                        this.lastValue = e,
                        this.hasValue = !0,
                        this.add(this.debouncedSubscription = this.scheduler.schedule(u, this.dueTime, this))
                    }, t.prototype._complete = function() {
                        this.debouncedNext(),
                        this.destination.complete()
                    }, t.prototype.debouncedNext = function() {
                        if (this.clearDebounce(), this.hasValue) {
                            var e = this.lastValue;
                            this.lastValue = null,
                            this.hasValue = !1,
                            this.destination.next(e)
                        }
                    }, t.prototype.clearDebounce = function() {
                        var e = this.debouncedSubscription;
                        null !== e && (this.remove(e), e.unsubscribe(), this.debouncedSubscription = null)
                    }, t
                }(i.L);
            function u(e) {
                e.debouncedNext()
            }
        },
        31524: (e, t, n) => {
            n.d(t, {
                d: () => o
            });
            var r = n(59312),
                i = n(98036);
            function o(e) {
                return void 0 === e && (e = null), function(t) {
                    return t.lift(new s(e))
                }
            }
            var s = function() {
                    function e(e) {
                        this.defaultValue = e
                    }
                    return e.prototype.call = function(e, t) {
                        return t.subscribe(new a(e, this.defaultValue))
                    }, e
                }(),
                a = function(e) {
                    function t(t, n) {
                        var r = e.call(this, t) || this;
                        return r.defaultValue = n, r.isEmpty = !0, r
                    }
                    return r.__extends(t, e), t.prototype._next = function(e) {
                        this.isEmpty = !1,
                        this.destination.next(e)
                    }, t.prototype._complete = function() {
                        this.isEmpty && this.destination.next(this.defaultValue),
                        this.destination.complete()
                    }, t
                }(i.L)
        },
        28043: (e, t, n) => {
            n.d(t, {
                x: () => o
            });
            var r = n(59312),
                i = n(98036);
            function o(e, t) {
                return function(n) {
                    return n.lift(new s(e, t))
                }
            }
            var s = function() {
                    function e(e, t) {
                        this.compare = e,
                        this.keySelector = t
                    }
                    return e.prototype.call = function(e, t) {
                        return t.subscribe(new a(e, this.compare, this.keySelector))
                    }, e
                }(),
                a = function(e) {
                    function t(t, n, r) {
                        var i = e.call(this, t) || this;
                        return i.keySelector = r, i.hasKey = !1, "function" == typeof n && (i.compare = n), i
                    }
                    return r.__extends(t, e), t.prototype.compare = function(e, t) {
                        return e === t
                    }, t.prototype._next = function(e) {
                        var t;
                        try {
                            var n = this.keySelector;
                            t = n ? n(e) : e
                        } catch (e) {
                            return this.destination.error(e)
                        }
                        var r = !1;
                        if (this.hasKey)
                            try {
                                r = (0, this.compare)(this.key, t)
                            } catch (e) {
                                return this.destination.error(e)
                            }
                        else
                            this.hasKey = !0;
                        r || (this.key = t, this.destination.next(e))
                    }, t
                }(i.L)
        },
        85985: (e, t, n) => {
            n.d(t, {
                h: () => o
            });
            var r = n(59312),
                i = n(98036);
            function o(e, t) {
                return function(n) {
                    return n.lift(new s(e, t))
                }
            }
            var s = function() {
                    function e(e, t) {
                        this.predicate = e,
                        this.thisArg = t
                    }
                    return e.prototype.call = function(e, t) {
                        return t.subscribe(new a(e, this.predicate, this.thisArg))
                    }, e
                }(),
                a = function(e) {
                    function t(t, n, r) {
                        var i = e.call(this, t) || this;
                        return i.predicate = n, i.thisArg = r, i.count = 0, i
                    }
                    return r.__extends(t, e), t.prototype._next = function(e) {
                        var t;
                        try {
                            t = this.predicate.call(this.thisArg, e, this.count++)
                        } catch (e) {
                            return void this.destination.error(e)
                        }
                        t && this.destination.next(e)
                    }, t
                }(i.L)
        },
        50628: (e, t, n) => {
            n.d(t, {
                P: () => u
            });
            var r = n(33346),
                i = n(85985),
                o = n(23063),
                s = n(31524),
                a = n(4750),
                c = n(49524);
            function u(e, t) {
                var n = arguments.length >= 2;
                return function(u) {
                    return u.pipe(e ? (0, i.h)((function(t, n) {
                        return e(t, n, u)
                    })) : c.y, (0, o.q)(1), n ? (0, s.d)(t) : (0, a.T)((function() {
                        return new r.K
                    })))
                }
            }
        },
        77176: (e, t, n) => {
            n.d(t, {
                U: () => o
            });
            var r = n(59312),
                i = n(98036);
            function o(e, t) {
                return function(n) {
                    if ("function" != typeof e)
                        throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");
                    return n.lift(new s(e, t))
                }
            }
            var s = function() {
                    function e(e, t) {
                        this.project = e,
                        this.thisArg = t
                    }
                    return e.prototype.call = function(e, t) {
                        return t.subscribe(new a(e, this.project, this.thisArg))
                    }, e
                }(),
                a = function(e) {
                    function t(t, n, r) {
                        var i = e.call(this, t) || this;
                        return i.project = n, i.count = 0, i.thisArg = r || i, i
                    }
                    return r.__extends(t, e), t.prototype._next = function(e) {
                        var t;
                        try {
                            t = this.project.call(this.thisArg, e, this.count++)
                        } catch (e) {
                            return void this.destination.error(e)
                        }
                        this.destination.next(t)
                    }, t
                }(i.L)
        },
        17343: (e, t, n) => {
            n.d(t, {
                h: () => o
            });
            var r = n(59312),
                i = n(98036);
            function o(e) {
                return function(t) {
                    return t.lift(new s(e))
                }
            }
            var s = function() {
                    function e(e) {
                        this.value = e
                    }
                    return e.prototype.call = function(e, t) {
                        return t.subscribe(new a(e, this.value))
                    }, e
                }(),
                a = function(e) {
                    function t(t, n) {
                        var r = e.call(this, t) || this;
                        return r.value = n, r
                    }
                    return r.__extends(t, e), t.prototype._next = function(e) {
                        this.destination.next(this.value)
                    }, t
                }(i.L)
        },
        68425: (e, t, n) => {
            n.d(t, {
                J: () => o
            });
            var r = n(85321),
                i = n(49524);
            function o(e) {
                return void 0 === e && (e = Number.POSITIVE_INFINITY), (0, r.zg)(i.y, e)
            }
        },
        85321: (e, t, n) => {
            n.d(t, {
                VS: () => l,
                zg: () => a
            });
            var r = n(59312),
                i = n(77176),
                o = n(12126),
                s = n(46601);
            function a(e, t, n) {
                return void 0 === n && (n = Number.POSITIVE_INFINITY), "function" == typeof t ? function(r) {
                    return r.pipe(a((function(n, r) {
                        return (0, o.D)(e(n, r)).pipe((0, i.U)((function(e, i) {
                            return t(n, e, r, i)
                        })))
                    }), n))
                } : ("number" == typeof t && (n = t), function(t) {
                    return t.lift(new c(e, n))
                })
            }
            var c = function() {
                    function e(e, t) {
                        void 0 === t && (t = Number.POSITIVE_INFINITY),
                        this.project = e,
                        this.concurrent = t
                    }
                    return e.prototype.call = function(e, t) {
                        return t.subscribe(new u(e, this.project, this.concurrent))
                    }, e
                }(),
                u = function(e) {
                    function t(t, n, r) {
                        void 0 === r && (r = Number.POSITIVE_INFINITY);
                        var i = e.call(this, t) || this;
                        return i.project = n, i.concurrent = r, i.hasCompleted = !1, i.buffer = [], i.active = 0, i.index = 0, i
                    }
                    return r.__extends(t, e), t.prototype._next = function(e) {
                        this.active < this.concurrent ? this._tryNext(e) : this.buffer.push(e)
                    }, t.prototype._tryNext = function(e) {
                        var t,
                            n = this.index++;
                        try {
                            t = this.project(e, n)
                        } catch (e) {
                            return void this.destination.error(e)
                        }
                        this.active++,
                        this._innerSub(t)
                    }, t.prototype._innerSub = function(e) {
                        var t = new s.IY(this),
                            n = this.destination;
                        n.add(t);
                        var r = (0, s.ft)(e, t);
                        r !== t && n.add(r)
                    }, t.prototype._complete = function() {
                        this.hasCompleted = !0,
                        0 === this.active && 0 === this.buffer.length && this.destination.complete(),
                        this.unsubscribe()
                    }, t.prototype.notifyNext = function(e) {
                        this.destination.next(e)
                    }, t.prototype.notifyComplete = function() {
                        var e = this.buffer;
                        this.active--,
                        e.length > 0 ? this._next(e.shift()) : 0 === this.active && this.hasCompleted && this.destination.complete()
                    }, t
                }(s.Ds),
                l = a
        },
        24755: (e, t, n) => {
            n.d(t, {
                O: () => i
            });
            var r = n(68571);
            function i(e, t) {
                return function(n) {
                    var i;
                    if (i = "function" == typeof e ? e : function() {
                        return e
                    }, "function" == typeof t)
                        return n.lift(new o(i, t));
                    var s = Object.create(n, r.N);
                    return s.source = n, s.subjectFactory = i, s
                }
            }
            var o = function() {
                function e(e, t) {
                    this.subjectFactory = e,
                    this.selector = t
                }
                return e.prototype.call = function(e, t) {
                    var n = this.selector,
                        r = this.subjectFactory(),
                        i = n(r).subscribe(e);
                    return i.add(t.subscribe(r)), i
                }, e
            }()
        },
        80544: (e, t, n) => {
            n.d(t, {
                QV: () => s,
                ht: () => c
            });
            var r = n(59312),
                i = n(98036),
                o = n(12834);
            function s(e, t) {
                return void 0 === t && (t = 0), function(n) {
                    return n.lift(new a(e, t))
                }
            }
            var a = function() {
                    function e(e, t) {
                        void 0 === t && (t = 0),
                        this.scheduler = e,
                        this.delay = t
                    }
                    return e.prototype.call = function(e, t) {
                        return t.subscribe(new c(e, this.scheduler, this.delay))
                    }, e
                }(),
                c = function(e) {
                    function t(t, n, r) {
                        void 0 === r && (r = 0);
                        var i = e.call(this, t) || this;
                        return i.scheduler = n, i.delay = r, i
                    }
                    return r.__extends(t, e), t.dispatch = function(e) {
                        var t = e.notification,
                            n = e.destination;
                        t.observe(n),
                        this.unsubscribe()
                    }, t.prototype.scheduleMessage = function(e) {
                        this.destination.add(this.scheduler.schedule(t.dispatch, this.delay, new u(e, this.destination)))
                    }, t.prototype._next = function(e) {
                        this.scheduleMessage(o.P.createNext(e))
                    }, t.prototype._error = function(e) {
                        this.scheduleMessage(o.P.createError(e)),
                        this.unsubscribe()
                    }, t.prototype._complete = function() {
                        this.scheduleMessage(o.P.createComplete()),
                        this.unsubscribe()
                    }, t
                }(i.L),
                u = function() {
                    return function(e, t) {
                        this.notification = e,
                        this.destination = t
                    }
                }()
        },
        95343: (e, t, n) => {
            n.d(t, {
                x: () => o
            });
            var r = n(59312),
                i = n(98036);
            function o() {
                return function(e) {
                    return e.lift(new s(e))
                }
            }
            var s = function() {
                    function e(e) {
                        this.connectable = e
                    }
                    return e.prototype.call = function(e, t) {
                        var n = this.connectable;
                        n._refCount++;
                        var r = new a(e, n),
                            i = t.subscribe(r);
                        return r.closed || (r.connection = n.connect()), i
                    }, e
                }(),
                a = function(e) {
                    function t(t, n) {
                        var r = e.call(this, t) || this;
                        return r.connectable = n, r
                    }
                    return r.__extends(t, e), t.prototype._unsubscribe = function() {
                        var e = this.connectable;
                        if (e) {
                            this.connectable = null;
                            var t = e._refCount;
                            if (t <= 0)
                                this.connection = null;
                            else if (e._refCount = t - 1, t > 1)
                                this.connection = null;
                            else {
                                var n = this.connection,
                                    r = e._connection;
                                this.connection = null,
                                !r || n && r !== n || r.unsubscribe()
                            }
                        } else
                            this.connection = null
                    }, t
                }(i.L)
        },
        62365: (e, t, n) => {
            n.d(t, {
                a: () => s
            });
            var r = n(59312),
                i = n(32952),
                o = n(46601);
            function s(e) {
                return function(t) {
                    return t.lift(new a(e, t))
                }
            }
            var a = function() {
                    function e(e, t) {
                        this.notifier = e,
                        this.source = t
                    }
                    return e.prototype.call = function(e, t) {
                        return t.subscribe(new c(e, this.notifier, this.source))
                    }, e
                }(),
                c = function(e) {
                    function t(t, n, r) {
                        var i = e.call(this, t) || this;
                        return i.notifier = n, i.source = r, i
                    }
                    return r.__extends(t, e), t.prototype.error = function(t) {
                        if (!this.isStopped) {
                            var n = this.errors,
                                r = this.retries,
                                s = this.retriesSubscription;
                            if (r)
                                this.errors = void 0,
                                this.retriesSubscription = void 0;
                            else {
                                n = new i.xQ;
                                try {
                                    r = (0, this.notifier)(n)
                                } catch (t) {
                                    return e.prototype.error.call(this, t)
                                }
                                s = (0, o.ft)(r, new o.IY(this))
                            }
                            this._unsubscribeAndRecycle(),
                            this.errors = n,
                            this.retries = r,
                            this.retriesSubscription = s,
                            n.next(t)
                        }
                    }, t.prototype._unsubscribe = function() {
                        var e = this.errors,
                            t = this.retriesSubscription;
                        e && (e.unsubscribe(), this.errors = void 0),
                        t && (t.unsubscribe(), this.retriesSubscription = void 0),
                        this.retries = void 0
                    }, t.prototype.notifyNext = function() {
                        var e = this._unsubscribe;
                        this._unsubscribe = null,
                        this._unsubscribeAndRecycle(),
                        this._unsubscribe = e,
                        this.source.subscribe(this)
                    }, t
                }(o.Ds)
        },
        38194: (e, t, n) => {
            n.d(t, {
                B: () => a
            });
            var r = n(24755),
                i = n(95343),
                o = n(32952);
            function s() {
                return new o.xQ
            }
            function a() {
                return function(e) {
                    return (0, i.x)()((0, r.O)(s)(e))
                }
            }
        },
        93508: (e, t, n) => {
            n.d(t, {
                O: () => o
            });
            var r = n(95399),
                i = n(67827);
            function o() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                var n = e[e.length - 1];
                return (0, i.K)(n) ? (e.pop(), function(t) {
                    return (0, r.z)(e, t, n)
                }) : function(t) {
                    return (0, r.z)(e, t)
                }
            }
        },
        66310: (e, t, n) => {
            n.d(t, {
                w: () => a
            });
            var r = n(59312),
                i = n(77176),
                o = n(12126),
                s = n(46601);
            function a(e, t) {
                return "function" == typeof t ? function(n) {
                    return n.pipe(a((function(n, r) {
                        return (0, o.D)(e(n, r)).pipe((0, i.U)((function(e, i) {
                            return t(n, e, r, i)
                        })))
                    })))
                } : function(t) {
                    return t.lift(new c(e))
                }
            }
            var c = function() {
                    function e(e) {
                        this.project = e
                    }
                    return e.prototype.call = function(e, t) {
                        return t.subscribe(new u(e, this.project))
                    }, e
                }(),
                u = function(e) {
                    function t(t, n) {
                        var r = e.call(this, t) || this;
                        return r.project = n, r.index = 0, r
                    }
                    return r.__extends(t, e), t.prototype._next = function(e) {
                        var t,
                            n = this.index++;
                        try {
                            t = this.project(e, n)
                        } catch (e) {
                            return void this.destination.error(e)
                        }
                        this._innerSub(t)
                    }, t.prototype._innerSub = function(e) {
                        var t = this.innerSubscription;
                        t && t.unsubscribe();
                        var n = new s.IY(this),
                            r = this.destination;
                        r.add(n),
                        this.innerSubscription = (0, s.ft)(e, n),
                        this.innerSubscription !== n && r.add(this.innerSubscription)
                    }, t.prototype._complete = function() {
                        var t = this.innerSubscription;
                        t && !t.closed || e.prototype._complete.call(this),
                        this.unsubscribe()
                    }, t.prototype._unsubscribe = function() {
                        this.innerSubscription = void 0
                    }, t.prototype.notifyComplete = function() {
                        this.innerSubscription = void 0,
                        this.isStopped && e.prototype._complete.call(this)
                    }, t.prototype.notifyNext = function(e) {
                        this.destination.next(e)
                    }, t
                }(s.Ds)
        },
        23063: (e, t, n) => {
            n.d(t, {
                q: () => a
            });
            var r = n(59312),
                i = n(98036),
                o = n(2270),
                s = n(40151);
            function a(e) {
                return function(t) {
                    return 0 === e ? (0, s.c)() : t.lift(new c(e))
                }
            }
            var c = function() {
                    function e(e) {
                        if (this.total = e, this.total < 0)
                            throw new o.W
                    }
                    return e.prototype.call = function(e, t) {
                        return t.subscribe(new u(e, this.total))
                    }, e
                }(),
                u = function(e) {
                    function t(t, n) {
                        var r = e.call(this, t) || this;
                        return r.total = n, r.count = 0, r
                    }
                    return r.__extends(t, e), t.prototype._next = function(e) {
                        var t = this.total,
                            n = ++this.count;
                        n <= t && (this.destination.next(e), n === t && (this.destination.complete(), this.unsubscribe()))
                    }, t
                }(i.L)
        },
        2834: (e, t, n) => {
            n.d(t, {
                b: () => a
            });
            var r = n(59312),
                i = n(98036),
                o = n(25656),
                s = n(55427);
            function a(e, t, n) {
                return function(r) {
                    return r.lift(new c(e, t, n))
                }
            }
            var c = function() {
                    function e(e, t, n) {
                        this.nextOrObserver = e,
                        this.error = t,
                        this.complete = n
                    }
                    return e.prototype.call = function(e, t) {
                        return t.subscribe(new u(e, this.nextOrObserver, this.error, this.complete))
                    }, e
                }(),
                u = function(e) {
                    function t(t, n, r, i) {
                        var a = e.call(this, t) || this;
                        return a._tapNext = o.Z, a._tapError = o.Z, a._tapComplete = o.Z, a._tapError = r || o.Z, a._tapComplete = i || o.Z, (0, s.m)(n) ? (a._context = a, a._tapNext = n) : n && (a._context = n, a._tapNext = n.next || o.Z, a._tapError = n.error || o.Z, a._tapComplete = n.complete || o.Z), a
                    }
                    return r.__extends(t, e), t.prototype._next = function(e) {
                        try {
                            this._tapNext.call(this._context, e)
                        } catch (e) {
                            return void this.destination.error(e)
                        }
                        this.destination.next(e)
                    }, t.prototype._error = function(e) {
                        try {
                            this._tapError.call(this._context, e)
                        } catch (e) {
                            return void this.destination.error(e)
                        }
                        this.destination.error(e)
                    }, t.prototype._complete = function() {
                        try {
                            this._tapComplete.call(this._context)
                        } catch (e) {
                            return void this.destination.error(e)
                        }
                        return this.destination.complete()
                    }, t
                }(i.L)
        },
        4750: (e, t, n) => {
            n.d(t, {
                T: () => s
            });
            var r = n(59312),
                i = n(33346),
                o = n(98036);
            function s(e) {
                return void 0 === e && (e = u), function(t) {
                    return t.lift(new a(e))
                }
            }
            var a = function() {
                    function e(e) {
                        this.errorFactory = e
                    }
                    return e.prototype.call = function(e, t) {
                        return t.subscribe(new c(e, this.errorFactory))
                    }, e
                }(),
                c = function(e) {
                    function t(t, n) {
                        var r = e.call(this, t) || this;
                        return r.errorFactory = n, r.hasValue = !1, r
                    }
                    return r.__extends(t, e), t.prototype._next = function(e) {
                        this.hasValue = !0,
                        this.destination.next(e)
                    }, t.prototype._complete = function() {
                        if (this.hasValue)
                            return this.destination.complete();
                        var e = void 0;
                        try {
                            e = this.errorFactory()
                        } catch (t) {
                            e = t
                        }
                        this.destination.error(e)
                    }, t
                }(o.L);
            function u() {
                return new i.K
            }
        },
        89068: (e, t, n) => {
            n.d(t, {
                V: () => a
            });
            var r = n(82506),
                i = n(49549),
                o = n(97425),
                s = n(91402);
            function a(e, t) {
                return void 0 === t && (t = r.P), (0, o.L)(e, (0, s._)(new i.W), t)
            }
        },
        97425: (e, t, n) => {
            n.d(t, {
                L: () => a
            });
            var r = n(59312),
                i = n(82506),
                o = n(88992),
                s = n(46601);
            function a(e, t, n) {
                return void 0 === n && (n = i.P), function(r) {
                    var i = (0, o.J)(e),
                        s = i ? +e - n.now() : Math.abs(e);
                    return r.lift(new c(s, i, t, n))
                }
            }
            var c = function() {
                    function e(e, t, n, r) {
                        this.waitFor = e,
                        this.absoluteTimeout = t,
                        this.withObservable = n,
                        this.scheduler = r
                    }
                    return e.prototype.call = function(e, t) {
                        return t.subscribe(new u(e, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler))
                    }, e
                }(),
                u = function(e) {
                    function t(t, n, r, i, o) {
                        var s = e.call(this, t) || this;
                        return s.absoluteTimeout = n, s.waitFor = r, s.withObservable = i, s.scheduler = o, s.scheduleTimeout(), s
                    }
                    return r.__extends(t, e), t.dispatchTimeout = function(e) {
                        var t = e.withObservable;
                        e._unsubscribeAndRecycle(),
                        e.add((0, s.ft)(t, new s.IY(e)))
                    }, t.prototype.scheduleTimeout = function() {
                        var e = this.action;
                        e ? this.action = e.schedule(this, this.waitFor) : this.add(this.action = this.scheduler.schedule(t.dispatchTimeout, this.waitFor, this))
                    }, t.prototype._next = function(t) {
                        this.absoluteTimeout || this.scheduleTimeout(),
                        e.prototype._next.call(this, t)
                    }, t.prototype._unsubscribe = function() {
                        this.action = void 0,
                        this.scheduler = null,
                        this.withObservable = null
                    }, t
                }(s.Ds)
        },
        41398: (e, t, n) => {
            n.d(t, {
                M: () => s
            });
            var r = n(59312),
                i = n(57655),
                o = n(72500);
            function s() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                return function(t) {
                    var n;
                    "function" == typeof e[e.length - 1] && (n = e.pop());
                    var r = e;
                    return t.lift(new a(r, n))
                }
            }
            var a = function() {
                    function e(e, t) {
                        this.observables = e,
                        this.project = t
                    }
                    return e.prototype.call = function(e, t) {
                        return t.subscribe(new c(e, this.observables, this.project))
                    }, e
                }(),
                c = function(e) {
                    function t(t, n, r) {
                        var i = e.call(this, t) || this;
                        i.observables = n,
                        i.project = r,
                        i.toRespond = [];
                        var s = n.length;
                        i.values = new Array(s);
                        for (var a = 0; a < s; a++)
                            i.toRespond.push(a);
                        for (a = 0; a < s; a++) {
                            var c = n[a];
                            i.add((0, o.D)(i, c, void 0, a))
                        }
                        return i
                    }
                    return r.__extends(t, e), t.prototype.notifyNext = function(e, t, n) {
                        this.values[n] = t;
                        var r = this.toRespond;
                        if (r.length > 0) {
                            var i = r.indexOf(n);
                            -1 !== i && r.splice(i, 1)
                        }
                    }, t.prototype.notifyComplete = function() {}, t.prototype._next = function(e) {
                        if (0 === this.toRespond.length) {
                            var t = [e].concat(this.values);
                            this.project ? this._tryProject(t) : this.destination.next(t)
                        }
                    }, t.prototype._tryProject = function(e) {
                        var t;
                        try {
                            t = this.project.apply(this, e)
                        } catch (e) {
                            return void this.destination.error(e)
                        }
                        this.destination.next(t)
                    }, t
                }(i.L)
        },
        11315: (e, t, n) => {
            n.d(t, {
                r: () => o
            });
            var r = n(44586),
                i = n(14601);
            function o(e, t) {
                return new r.y((function(n) {
                    var r = new i.w,
                        o = 0;
                    return r.add(t.schedule((function() {
                        o !== e.length ? (n.next(e[o++]), n.closed || r.add(this.schedule())) : n.complete()
                    }))), r
                }))
            }
        },
        37895: (e, t, n) => {
            n.d(t, {
                Q: () => s
            });
            var r = n(44586),
                i = n(14601),
                o = n(85451);
            function s(e, t) {
                if (!e)
                    throw new Error("Iterable cannot be null");
                return new r.y((function(n) {
                    var r,
                        s = new i.w;
                    return s.add((function() {
                        r && "function" == typeof r.return && r.return()
                    })), s.add(t.schedule((function() {
                        r = e[o.hZ](),
                        s.add(t.schedule((function() {
                            if (!n.closed) {
                                var e,
                                    t;
                                try {
                                    var i = r.next();
                                    e = i.value,
                                    t = i.done
                                } catch (e) {
                                    return void n.error(e)
                                }
                                t ? n.complete() : (n.next(e), this.schedule())
                            }
                        })))
                    }))), s
                }))
            }
        },
        36958: (e, t, n) => {
            n.d(t, {
                l: () => s
            });
            var r = n(44586),
                i = n(14601),
                o = n(58569);
            function s(e, t) {
                return new r.y((function(n) {
                    var r = new i.w;
                    return r.add(t.schedule((function() {
                        var i = e[o.L]();
                        r.add(i.subscribe({
                            next: function(e) {
                                r.add(t.schedule((function() {
                                    return n.next(e)
                                })))
                            },
                            error: function(e) {
                                r.add(t.schedule((function() {
                                    return n.error(e)
                                })))
                            },
                            complete: function() {
                                r.add(t.schedule((function() {
                                    return n.complete()
                                })))
                            }
                        }))
                    }))), r
                }))
            }
        },
        48318: (e, t, n) => {
            n.d(t, {
                c: () => o
            });
            var r = n(44586),
                i = n(14601);
            function o(e, t) {
                return new r.y((function(n) {
                    var r = new i.w;
                    return r.add(t.schedule((function() {
                        return e.then((function(e) {
                            r.add(t.schedule((function() {
                                n.next(e),
                                r.add(t.schedule((function() {
                                    return n.complete()
                                })))
                            })))
                        }), (function(e) {
                            r.add(t.schedule((function() {
                                return n.error(e)
                            })))
                        }))
                    }))), r
                }))
            }
        },
        40663: (e, t, n) => {
            n.d(t, {
                x: () => d
            });
            var r = n(36958),
                i = n(48318),
                o = n(11315),
                s = n(37895),
                a = n(21),
                c = n(93595),
                u = n(20542),
                l = n(64249);
            function d(e, t) {
                if (null != e) {
                    if ((0, a.c)(e))
                        return (0, r.l)(e, t);
                    if ((0, c.t)(e))
                        return (0, i.c)(e, t);
                    if ((0, u.z)(e))
                        return (0, o.r)(e, t);
                    if ((0, l.T)(e) || "string" == typeof e)
                        return (0, s.Q)(e, t)
                }
                throw new TypeError((null !== e && typeof e || e) + " is not observable")
            }
        },
        6482: (e, t, n) => {
            n.d(t, {
                a: () => i
            });
            var r = n(59312),
                i = function(e) {
                    function t(t, n) {
                        return e.call(this) || this
                    }
                    return r.__extends(t, e), t.prototype.schedule = function(e, t) {
                        return void 0 === t && (t = 0), this
                    }, t
                }(n(14601).w)
        },
        8379: (e, t, n) => {
            n.d(t, {
                t: () => o
            });
            var r = n(59312),
                i = n(17605),
                o = function(e) {
                    function t(t, n) {
                        var r = e.call(this, t, n) || this;
                        return r.scheduler = t, r.work = n, r
                    }
                    return r.__extends(t, e), t.prototype.requestAsyncId = function(t, n, r) {
                        return void 0 === r && (r = 0), null !== r && r > 0 ? e.prototype.requestAsyncId.call(this, t, n, r) : (t.actions.push(this), t.scheduled || (t.scheduled = i.H.setImmediate(t.flush.bind(t, null))))
                    }, t.prototype.recycleAsyncId = function(t, n, r) {
                        if (void 0 === r && (r = 0), null !== r && r > 0 || null === r && this.delay > 0)
                            return e.prototype.recycleAsyncId.call(this, t, n, r);
                        0 === t.actions.length && (i.H.clearImmediate(n), t.scheduled = void 0)
                    }, t
                }(n(49917).o)
        },
        14132: (e, t, n) => {
            n.d(t, {
                E: () => i
            });
            var r = n(59312),
                i = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r.__extends(t, e), t.prototype.flush = function(e) {
                        this.active = !0,
                        this.scheduled = void 0;
                        var t,
                            n = this.actions,
                            r = -1,
                            i = n.length;
                        e = e || n.shift();
                        do {
                            if (t = e.execute(e.state, e.delay))
                                break
                        } while (++r < i && (e = n.shift()));
                        if (this.active = !1, t) {
                            for (; ++r < i && (e = n.shift());)
                                e.unsubscribe();
                            throw t
                        }
                    }, t
                }(n(68258).v)
        },
        49917: (e, t, n) => {
            n.d(t, {
                o: () => i
            });
            var r = n(59312),
                i = function(e) {
                    function t(t, n) {
                        var r = e.call(this, t, n) || this;
                        return r.scheduler = t, r.work = n, r.pending = !1, r
                    }
                    return r.__extends(t, e), t.prototype.schedule = function(e, t) {
                        if (void 0 === t && (t = 0), this.closed)
                            return this;
                        this.state = e;
                        var n = this.id,
                            r = this.scheduler;
                        return null != n && (this.id = this.recycleAsyncId(r, n, t)), this.pending = !0, this.delay = t, this.id = this.id || this.requestAsyncId(r, this.id, t), this
                    }, t.prototype.requestAsyncId = function(e, t, n) {
                        return void 0 === n && (n = 0), setInterval(e.flush.bind(e, this), n)
                    }, t.prototype.recycleAsyncId = function(e, t, n) {
                        if (void 0 === n && (n = 0), null !== n && this.delay === n && !1 === this.pending)
                            return t;
                        clearInterval(t)
                    }, t.prototype.execute = function(e, t) {
                        if (this.closed)
                            return new Error("executing a cancelled action");
                        this.pending = !1;
                        var n = this._execute(e, t);
                        if (n)
                            return n;
                        !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
                    }, t.prototype._execute = function(e, t) {
                        var n = !1,
                            r = void 0;
                        try {
                            this.work(e)
                        } catch (e) {
                            n = !0,
                            r = !!e && e || new Error(e)
                        }
                        if (n)
                            return this.unsubscribe(), r
                    }, t.prototype._unsubscribe = function() {
                        var e = this.id,
                            t = this.scheduler,
                            n = t.actions,
                            r = n.indexOf(this);
                        this.work = null,
                        this.state = null,
                        this.pending = !1,
                        this.scheduler = null,
                        -1 !== r && n.splice(r, 1),
                        null != e && (this.id = this.recycleAsyncId(t, e, null)),
                        this.delay = null
                    }, t
                }(n(6482).a)
        },
        68258: (e, t, n) => {
            n.d(t, {
                v: () => o
            });
            var r = n(59312),
                i = n(75302),
                o = function(e) {
                    function t(n, r) {
                        void 0 === r && (r = i.b.now);
                        var o = e.call(this, n, (function() {
                            return t.delegate && t.delegate !== o ? t.delegate.now() : r()
                        })) || this;
                        return o.actions = [], o.active = !1, o.scheduled = void 0, o
                    }
                    return r.__extends(t, e), t.prototype.schedule = function(n, r, i) {
                        return void 0 === r && (r = 0), t.delegate && t.delegate !== this ? t.delegate.schedule(n, r, i) : e.prototype.schedule.call(this, n, r, i)
                    }, t.prototype.flush = function(e) {
                        var t = this.actions;
                        if (this.active)
                            t.push(e);
                        else {
                            var n;
                            this.active = !0;
                            do {
                                if (n = e.execute(e.state, e.delay))
                                    break
                            } while (e = t.shift());
                            if (this.active = !1, n) {
                                for (; e = t.shift();)
                                    e.unsubscribe();
                                throw n
                            }
                        }
                    }, t
                }(i.b)
        },
        79692: (e, t, n) => {
            n.d(t, {
                E: () => i,
                e: () => o
            });
            var r = n(8379),
                i = new (n(14132).E)(r.t),
                o = i
        },
        82506: (e, t, n) => {
            n.d(t, {
                P: () => o,
                z: () => i
            });
            var r = n(49917),
                i = new (n(68258).v)(r.o),
                o = i
        },
        85451: (e, t, n) => {
            function r() {
                return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
            }
            n.d(t, {
                hZ: () => i
            });
            var i = r()
        },
        58569: (e, t, n) => {
            n.d(t, {
                L: () => r
            });
            var r = function() {
                return "function" == typeof Symbol && Symbol.observable || "@@observable"
            }()
        },
        42545: (e, t, n) => {
            n.d(t, {
                b: () => r
            });
            var r = function() {
                return "function" == typeof Symbol ? Symbol("rxSubscriber") : "@@rxSubscriber_" + Math.random()
            }()
        },
        2270: (e, t, n) => {
            n.d(t, {
                W: () => r
            });
            var r = function() {
                function e() {
                    return Error.call(this), this.message = "argument out of range", this.name = "ArgumentOutOfRangeError", this
                }
                return e.prototype = Object.create(Error.prototype), e
            }()
        },
        33346: (e, t, n) => {
            n.d(t, {
                K: () => r
            });
            var r = function() {
                function e() {
                    return Error.call(this), this.message = "no elements in sequence", this.name = "EmptyError", this
                }
                return e.prototype = Object.create(Error.prototype), e
            }()
        },
        17605: (e, t, n) => {
            n.d(t, {
                H: () => a
            });
            var r = 1,
                i = function() {
                    return Promise.resolve()
                }(),
                o = {};
            function s(e) {
                return e in o && (delete o[e], !0)
            }
            var a = {
                setImmediate: function(e) {
                    var t = r++;
                    return o[t] = !0, i.then((function() {
                        return s(t) && e()
                    })), t
                },
                clearImmediate: function(e) {
                    s(e)
                }
            }
        },
        82987: (e, t, n) => {
            n.d(t, {
                N: () => r
            });
            var r = function() {
                function e() {
                    return Error.call(this), this.message = "object unsubscribed", this.name = "ObjectUnsubscribedError", this
                }
                return e.prototype = Object.create(Error.prototype), e
            }()
        },
        49549: (e, t, n) => {
            n.d(t, {
                W: () => r
            });
            var r = function() {
                function e() {
                    return Error.call(this), this.message = "Timeout has occurred", this.name = "TimeoutError", this
                }
                return e.prototype = Object.create(Error.prototype), e
            }()
        },
        28558: (e, t, n) => {
            n.d(t, {
                B: () => r
            });
            var r = function() {
                function e(e) {
                    return Error.call(this), this.message = e ? e.length + " errors occurred during unsubscription:\n" + e.map((function(e, t) {
                        return t + 1 + ") " + e.toString()
                    })).join("\n  ") : "", this.name = "UnsubscriptionError", this.errors = e, this
                }
                return e.prototype = Object.create(Error.prototype), e
            }()
        },
        51106: (e, t, n) => {
            n.d(t, {
                _: () => i
            });
            var r = n(98036);
            function i(e) {
                for (; e;) {
                    var t = e,
                        n = t.closed,
                        i = t.destination,
                        o = t.isStopped;
                    if (n || o)
                        return !1;
                    e = i && i instanceof r.L ? i : null
                }
                return !0
            }
        },
        94224: (e, t, n) => {
            function r(e) {
                setTimeout((function() {
                    throw e
                }), 0)
            }
            n.d(t, {
                z: () => r
            })
        },
        49524: (e, t, n) => {
            function r(e) {
                return e
            }
            n.d(t, {
                y: () => r
            })
        },
        17733: (e, t, n) => {
            n.d(t, {
                k: () => r
            });
            var r = function() {
                return Array.isArray || function(e) {
                        return e && "number" == typeof e.length
                    }
            }()
        },
        20542: (e, t, n) => {
            n.d(t, {
                z: () => r
            });
            var r = function(e) {
                return e && "number" == typeof e.length && "function" != typeof e
            }
        },
        88992: (e, t, n) => {
            function r(e) {
                return e instanceof Date && !isNaN(+e)
            }
            n.d(t, {
                J: () => r
            })
        },
        55427: (e, t, n) => {
            function r(e) {
                return "function" == typeof e
            }
            n.d(t, {
                m: () => r
            })
        },
        21: (e, t, n) => {
            n.d(t, {
                c: () => i
            });
            var r = n(58569);
            function i(e) {
                return e && "function" == typeof e[r.L]
            }
        },
        64249: (e, t, n) => {
            n.d(t, {
                T: () => i
            });
            var r = n(85451);
            function i(e) {
                return e && "function" == typeof e[r.hZ]
            }
        },
        44362: (e, t, n) => {
            n.d(t, {
                k: () => i
            });
            var r = n(17733);
            function i(e) {
                return !(0, r.k)(e) && e - parseFloat(e) + 1 >= 0
            }
        },
        79582: (e, t, n) => {
            function r(e) {
                return null !== e && "object" == typeof e
            }
            n.d(t, {
                K: () => r
            })
        },
        93595: (e, t, n) => {
            function r(e) {
                return !!e && "function" != typeof e.subscribe && "function" == typeof e.then
            }
            n.d(t, {
                t: () => r
            })
        },
        67827: (e, t, n) => {
            function r(e) {
                return e && "function" == typeof e.schedule
            }
            n.d(t, {
                K: () => r
            })
        },
        25656: (e, t, n) => {
            function r() {}
            n.d(t, {
                Z: () => r
            })
        },
        96451: (e, t, n) => {
            function r(e, t) {
                function n() {
                    return !n.pred.apply(n.thisArg, arguments)
                }
                return n.pred = e, n.thisArg = t, n
            }
            n.d(t, {
                f: () => r
            })
        },
        87072: (e, t, n) => {
            n.d(t, {
                U: () => o,
                z: () => i
            });
            var r = n(49524);
            function i() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                return o(e)
            }
            function o(e) {
                return 0 === e.length ? r.y : 1 === e.length ? e[0] : function(t) {
                    return e.reduce((function(e, t) {
                        return t(e)
                    }), t)
                }
            }
        },
        35316: (e, t, n) => {
            n.d(t, {
                s: () => f
            });
            var r = n(84464),
                i = n(6703),
                o = n(30001),
                s = n(9949),
                a = n(20542),
                c = n(93595),
                u = n(79582),
                l = n(85451),
                d = n(58569),
                f = function(e) {
                    if (e && "function" == typeof e[d.L])
                        return (0, s.h)(e);
                    if ((0, a.z)(e))
                        return (0, r.V)(e);
                    if ((0, c.t)(e))
                        return (0, i.A)(e);
                    if (e && "function" == typeof e[l.hZ])
                        return (0, o.u)(e);
                    var t = (0, u.K)(e) ? "an invalid object" : "'" + e + "'";
                    throw new TypeError("You provided " + t + " where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.")
                }
        },
        84464: (e, t, n) => {
            n.d(t, {
                V: () => r
            });
            var r = function(e) {
                return function(t) {
                    for (var n = 0, r = e.length; n < r && !t.closed; n++)
                        t.next(e[n]);
                    t.complete()
                }
            }
        },
        30001: (e, t, n) => {
            n.d(t, {
                u: () => i
            });
            var r = n(85451),
                i = function(e) {
                    return function(t) {
                        for (var n = e[r.hZ]();;) {
                            var i = void 0;
                            try {
                                i = n.next()
                            } catch (e) {
                                return t.error(e), t
                            }
                            if (i.done) {
                                t.complete();
                                break
                            }
                            if (t.next(i.value), t.closed)
                                break
                        }
                        return "function" == typeof n.return && t.add((function() {
                            n.return && n.return()
                        })), t
                    }
                }
        },
        9949: (e, t, n) => {
            n.d(t, {
                h: () => i
            });
            var r = n(58569),
                i = function(e) {
                    return function(t) {
                        var n = e[r.L]();
                        if ("function" != typeof n.subscribe)
                            throw new TypeError("Provided object does not correctly implement Symbol.observable");
                        return n.subscribe(t)
                    }
                }
        },
        6703: (e, t, n) => {
            n.d(t, {
                A: () => i
            });
            var r = n(94224),
                i = function(e) {
                    return function(t) {
                        return e.then((function(e) {
                            t.closed || (t.next(e), t.complete())
                        }), (function(e) {
                            return t.error(e)
                        })).then(null, r.z), t
                    }
                }
        },
        72500: (e, t, n) => {
            n.d(t, {
                D: () => s
            });
            var r = n(7882),
                i = n(35316),
                o = n(44586);
            function s(e, t, n, s, a) {
                if (void 0 === a && (a = new r.d(e, n, s)), !a.closed)
                    return t instanceof o.y ? t.subscribe(a) : (0, i.s)(t)(a)
            }
        },
        85063: (e, t, n) => {
            n.d(t, {
                Y: () => s
            });
            var r = n(98036),
                i = n(42545),
                o = n(76535);
            function s(e, t, n) {
                if (e) {
                    if (e instanceof r.L)
                        return e;
                    if (e[i.b])
                        return e[i.b]()
                }
                return e || t || n ? new r.L(e, t, n) : new r.L(o.c)
            }
        },
        59312: (e, t, n) => {
            n.r(t),
            n.d(t, {
                __assign: () => o,
                __asyncDelegator: () => w,
                __asyncGenerator: () => _,
                __asyncValues: () => x,
                __await: () => y,
                __awaiter: () => l,
                __classPrivateFieldGet: () => k,
                __classPrivateFieldSet: () => I,
                __createBinding: () => f,
                __decorate: () => a,
                __exportStar: () => h,
                __extends: () => i,
                __generator: () => d,
                __importDefault: () => O,
                __importStar: () => R,
                __makeTemplateObject: () => E,
                __metadata: () => u,
                __param: () => c,
                __read: () => g,
                __rest: () => s,
                __spread: () => m,
                __spreadArray: () => v,
                __spreadArrays: () => b,
                __values: () => p
            });
            var r = function(e, t) {
                return r = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }, r(e, t)
            };
            function i(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
                function n() {
                    this.constructor = e
                }
                r(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }
            var o = function() {
                return o = Object.assign || function(e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++)
                        for (var i in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                    return e
                }, o.apply(this, arguments)
            };
            function s(e, t) {
                var n = {};
                for (var r in e)
                    Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
                if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                    var i = 0;
                    for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
                        t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]])
                }
                return n
            }
            function a(e, t, n, r) {
                var i,
                    o = arguments.length,
                    s = o < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                    s = Reflect.decorate(e, t, n, r);
                else
                    for (var a = e.length - 1; a >= 0; a--)
                        (i = e[a]) && (s = (o < 3 ? i(s) : o > 3 ? i(t, n, s) : i(t, n)) || s);
                return o > 3 && s && Object.defineProperty(t, n, s), s
            }
            function c(e, t) {
                return function(n, r) {
                    t(n, r, e)
                }
            }
            function u(e, t) {
                if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                    return Reflect.metadata(e, t)
            }
            function l(e, t, n, r) {
                return new (n || (n = Promise))((function(i, o) {
                    function s(e) {
                        try {
                            c(r.next(e))
                        } catch (e) {
                            o(e)
                        }
                    }
                    function a(e) {
                        try {
                            c(r.throw(e))
                        } catch (e) {
                            o(e)
                        }
                    }
                    function c(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                            e(t)
                        }))).then(s, a)
                    }
                    c((r = r.apply(e, t || [])).next())
                }))
            }
            function d(e, t) {
                var n,
                    r,
                    i,
                    o,
                    s = {
                        label: 0,
                        sent: function() {
                            if (1 & i[0])
                                throw i[1];
                            return i[1]
                        },
                        trys: [],
                        ops: []
                    };
                return o = {
                    next: a(0),
                    throw: a(1),
                    return: a(2)
                }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                    return this
                }), o;
                function a(o) {
                    return function(a) {
                        return function(o) {
                            if (n)
                                throw new TypeError("Generator is already executing.");
                            for (; s;)
                                try {
                                    if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done)
                                        return i;
                                    switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                    case 0:
                                    case 1:
                                        i = o;
                                        break;
                                    case 4:
                                        return s.label++, {
                                            value: o[1],
                                            done: !1
                                        };
                                    case 5:
                                        s.label++,
                                        r = o[1],
                                        o = [0];
                                        continue;
                                    case 7:
                                        o = s.ops.pop(),
                                        s.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = s.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                            s = 0;
                                            continue
                                        }
                                        if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                            s.label = o[1];
                                            break
                                        }
                                        if (6 === o[0] && s.label < i[1]) {
                                            s.label = i[1],
                                            i = o;
                                            break
                                        }
                                        if (i && s.label < i[2]) {
                                            s.label = i[2],
                                            s.ops.push(o);
                                            break
                                        }
                                        i[2] && s.ops.pop(),
                                        s.trys.pop();
                                        continue
                                    }
                                    o = t.call(e, s)
                                } catch (e) {
                                    o = [6, e],
                                    r = 0
                                } finally {
                                    n = i = 0
                                }
                            if (5 & o[0])
                                throw o[1];
                            return {
                                value: o[0] ? o[1] : void 0,
                                done: !0
                            }
                        }([o, a])
                    }
                }
            }
            var f = Object.create ? function(e, t, n, r) {
                void 0 === r && (r = n),
                Object.defineProperty(e, r, {
                    enumerable: !0,
                    get: function() {
                        return t[n]
                    }
                })
            } : function(e, t, n, r) {
                void 0 === r && (r = n),
                e[r] = t[n]
            };
            function h(e, t) {
                for (var n in e)
                    "default" === n || Object.prototype.hasOwnProperty.call(t, n) || f(t, e, n)
            }
            function p(e) {
                var t = "function" == typeof Symbol && Symbol.iterator,
                    n = t && e[t],
                    r = 0;
                if (n)
                    return n.call(e);
                if (e && "number" == typeof e.length)
                    return {
                        next: function() {
                            return e && r >= e.length && (e = void 0), {
                                value: e && e[r++],
                                done: !e
                            }
                        }
                    };
                throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
            }
            function g(e, t) {
                var n = "function" == typeof Symbol && e[Symbol.iterator];
                if (!n)
                    return e;
                var r,
                    i,
                    o = n.call(e),
                    s = [];
                try {
                    for (; (void 0 === t || t-- > 0) && !(r = o.next()).done;)
                        s.push(r.value)
                } catch (e) {
                    i = {
                        error: e
                    }
                } finally {
                    try {
                        r && !r.done && (n = o.return) && n.call(o)
                    } finally {
                        if (i)
                            throw i.error
                    }
                }
                return s
            }
            function m() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e = e.concat(g(arguments[t]));
                return e
            }
            function b() {
                for (var e = 0, t = 0, n = arguments.length; t < n; t++)
                    e += arguments[t].length;
                var r = Array(e),
                    i = 0;
                for (t = 0; t < n; t++)
                    for (var o = arguments[t], s = 0, a = o.length; s < a; s++, i++)
                        r[i] = o[s];
                return r
            }
            function v(e, t) {
                for (var n = 0, r = t.length, i = e.length; n < r; n++, i++)
                    e[i] = t[n];
                return e
            }
            function y(e) {
                return this instanceof y ? (this.v = e, this) : new y(e)
            }
            function _(e, t, n) {
                if (!Symbol.asyncIterator)
                    throw new TypeError("Symbol.asyncIterator is not defined.");
                var r,
                    i = n.apply(e, t || []),
                    o = [];
                return r = {}, s("next"), s("throw"), s("return"), r[Symbol.asyncIterator] = function() {
                    return this
                }, r;
                function s(e) {
                    i[e] && (r[e] = function(t) {
                        return new Promise((function(n, r) {
                            o.push([e, t, n, r]) > 1 || a(e, t)
                        }))
                    })
                }
                function a(e, t) {
                    try {
                        (n = i[e](t)).value instanceof y ? Promise.resolve(n.value.v).then(c, u) : l(o[0][2], n)
                    } catch (e) {
                        l(o[0][3], e)
                    }
                    var n
                }
                function c(e) {
                    a("next", e)
                }
                function u(e) {
                    a("throw", e)
                }
                function l(e, t) {
                    e(t),
                    o.shift(),
                    o.length && a(o[0][0], o[0][1])
                }
            }
            function w(e) {
                var t,
                    n;
                return t = {}, r("next"), r("throw", (function(e) {
                    throw e
                })), r("return"), t[Symbol.iterator] = function() {
                    return this
                }, t;
                function r(r, i) {
                    t[r] = e[r] ? function(t) {
                        return (n = !n) ? {
                            value: y(e[r](t)),
                            done: "return" === r
                        } : i ? i(t) : t
                    } : i
                }
            }
            function x(e) {
                if (!Symbol.asyncIterator)
                    throw new TypeError("Symbol.asyncIterator is not defined.");
                var t,
                    n = e[Symbol.asyncIterator];
                return n ? n.call(e) : (e = p(e), t = {}, r("next"), r("throw"), r("return"), t[Symbol.asyncIterator] = function() {
                    return this
                }, t);
                function r(n) {
                    t[n] = e[n] && function(t) {
                        return new Promise((function(r, i) {
                            (function(e, t, n, r) {
                                Promise.resolve(r).then((function(t) {
                                    e({
                                        value: t,
                                        done: n
                                    })
                                }), t)
                            })(r, i, (t = e[n](t)).done, t.value)
                        }))
                    }
                }
            }
            function E(e, t) {
                return Object.defineProperty ? Object.defineProperty(e, "raw", {
                    value: t
                }) : e.raw = t, e
            }
            var S = Object.create ? function(e, t) {
                Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: t
                })
            } : function(e, t) {
                e.default = t
            };
            function R(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        "default" !== n && Object.prototype.hasOwnProperty.call(e, n) && f(t, e, n);
                return S(t, e), t
            }
            function O(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function k(e, t) {
                if (!t.has(e))
                    throw new TypeError("attempted to get private field on non-instance");
                return t.get(e)
            }
            function I(e, t, n) {
                if (!t.has(e))
                    throw new TypeError("attempted to set private field on non-instance");
                return t.set(e, n), n
            }
        },
        82989: function(e, t, n) {
            var r;
            !function(i, o) {
                var s = "function",
                    a = "undefined",
                    c = "object",
                    u = "string",
                    l = "model",
                    d = "name",
                    f = "type",
                    h = "vendor",
                    p = "version",
                    g = "architecture",
                    m = "console",
                    b = "mobile",
                    v = "tablet",
                    y = "smarttv",
                    _ = "wearable",
                    w = "embedded",
                    x = "Amazon",
                    E = "Apple",
                    S = "ASUS",
                    R = "BlackBerry",
                    O = "Firefox",
                    k = "Google",
                    I = "Huawei",
                    T = "LG",
                    A = "Microsoft",
                    F = "Motorola",
                    N = "Opera",
                    C = "Samsung",
                    P = "Sharp",
                    j = "Sony",
                    M = "Xiaomi",
                    L = "Zebra",
                    U = "Facebook",
                    D = function(e) {
                        for (var t = {}, n = 0; n < e.length; n++)
                            t[e[n].toUpperCase()] = e[n];
                        return t
                    },
                    B = function(e, t) {
                        return typeof e === u && -1 !== H(t).indexOf(H(e))
                    },
                    H = function(e) {
                        return e.toLowerCase()
                    },
                    W = function(e, t) {
                        if (typeof e === u)
                            return e = e.replace(/^\s\s*/, "").replace(/\s\s*$/, ""), typeof t === a ? e : e.substring(0, 350)
                    },
                    G = function(e, t) {
                        for (var n, r, i, a, u, l, d = 0; d < t.length && !u;) {
                            var f = t[d],
                                h = t[d + 1];
                            for (n = r = 0; n < f.length && !u;)
                                if (u = f[n++].exec(e))
                                    for (i = 0; i < h.length; i++)
                                        l = u[++r],
                                        typeof (a = h[i]) === c && a.length > 0 ? 2 === a.length ? typeof a[1] == s ? this[a[0]] = a[1].call(this, l) : this[a[0]] = a[1] : 3 === a.length ? typeof a[1] !== s || a[1].exec && a[1].test ? this[a[0]] = l ? l.replace(a[1], a[2]) : o : this[a[0]] = l ? a[1].call(this, l, a[2]) : o : 4 === a.length && (this[a[0]] = l ? a[3].call(this, l.replace(a[1], a[2])) : o) : this[a] = l || o;
                            d += 2
                        }
                    },
                    z = function(e, t) {
                        for (var n in t)
                            if (typeof t[n] === c && t[n].length > 0) {
                                for (var r = 0; r < t[n].length; r++)
                                    if (B(t[n][r], e))
                                        return "?" === n ? o : n
                            } else if (B(t[n], e))
                                return "?" === n ? o : n;
                        return e
                    },
                    q = {
                        ME: "4.90",
                        "NT 3.11": "NT3.51",
                        "NT 4.0": "NT4.0",
                        2e3: "NT 5.0",
                        XP: ["NT 5.1", "NT 5.2"],
                        Vista: "NT 6.0",
                        7: "NT 6.1",
                        8: "NT 6.2",
                        8.1: "NT 6.3",
                        10: ["NT 6.4", "NT 10.0"],
                        RT: "ARM"
                    },
                    V = {
                        browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [p, [d, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [p, [d, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [d, p], [/opios[\/ ]+([\w\.]+)/i], [p, [d, "Opera Mini"]], [/\bopr\/([\w\.]+)/i], [p, [d, N]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(weibo)__([\d\.]+)/i], [d, p], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [p, [d, "UCBrowser"]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [p, [d, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [p, [d, "WeChat"]], [/konqueror\/([\w\.]+)/i], [p, [d, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [p, [d, "IE"]], [/yabrowser\/([\w\.]+)/i], [p, [d, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[d, /(.+)/, "$1 Secure Browser"], p], [/\bfocus\/([\w\.]+)/i], [p, [d, "Firefox Focus"]], [/\bopt\/([\w\.]+)/i], [p, [d, "Opera Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [p, [d, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [p, [d, "Dolphin"]], [/coast\/([\w\.]+)/i], [p, [d, "Opera Coast"]], [/miuibrowser\/([\w\.]+)/i], [p, [d, "MIUI Browser"]], [/fxios\/([-\w\.]+)/i], [p, [d, O]], [/\bqihu|(qi?ho?o?|360)browser/i], [[d, "360 Browser"]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[d, /(.+)/, "$1 Browser"], p], [/(comodo_dragon)\/([\w\.]+)/i], [[d, /_/g, " "], p], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [d, p], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [d], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[d, U], p], [/safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [d, p], [/\bgsa\/([\w\.]+) .*safari\//i], [p, [d, "GSA"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [p, [d, "Chrome Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[d, "Chrome WebView"], p], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [p, [d, "Android Browser"]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [d, p], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [p, [d, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [p, d], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [d, [p, z, {
                            "1.0": "/8",
                            1.2: "/1",
                            1.3: "/3",
                            "2.0": "/412",
                            "2.0.2": "/416",
                            "2.0.3": "/417",
                            "2.0.4": "/419",
                            "?": "/"
                        }]], [/(webkit|khtml)\/([\w\.]+)/i], [d, p], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[d, "Netscape"], p], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [p, [d, "Firefox Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i], [d, p]],
                        cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[g, "amd64"]], [/(ia32(?=;))/i], [[g, H]], [/((?:i[346]|x)86)[;\)]/i], [[g, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[g, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[g, "armhf"]], [/windows (ce|mobile); ppc;/i], [[g, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[g, /ower/, "", H]], [/(sun4\w)[;\)]/i], [[g, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[g, H]]],
                        device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [l, [h, C], [f, v]], [/\b((?:s[cgp]h|gt|sm)-\w+|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [l, [h, C], [f, b]], [/\((ip(?:hone|od)[\w ]*);/i], [l, [h, E], [f, b]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [l, [h, E], [f, v]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [l, [h, I], [f, v]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [l, [h, I], [f, b]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[l, /_/g, " "], [h, M], [f, b]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[l, /_/g, " "], [h, M], [f, v]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [l, [h, "OPPO"], [f, b]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [l, [h, "Vivo"], [f, b]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [l, [h, "Realme"], [f, b]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [l, [h, F], [f, b]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [l, [h, F], [f, v]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [l, [h, T], [f, v]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [l, [h, T], [f, b]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [l, [h, "Lenovo"], [f, v]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[l, /_/g, " "], [h, "Nokia"], [f, b]], [/(pixel c)\b/i], [l, [h, k], [f, v]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [l, [h, k], [f, b]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [l, [h, j], [f, b]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[l, "Xperia Tablet"], [h, j], [f, v]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [l, [h, "OnePlus"], [f, b]], [/(alexa)webm/i, /(kf[a-z]{2}wi)( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [l, [h, x], [f, v]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[l, /(.+)/g, "Fire Phone $1"], [h, x], [f, b]], [/(playbook);[-\w\),; ]+(rim)/i], [l, h, [f, v]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [l, [h, R], [f, b]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [l, [h, S], [f, v]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [l, [h, S], [f, b]], [/(nexus 9)/i], [l, [h, "HTC"], [f, v]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic|sony(?!-bra))[-_ ]?([-\w]*)/i], [h, [l, /_/g, " "], [f, b]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [l, [h, "Acer"], [f, v]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [l, [h, "Meizu"], [f, b]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [l, [h, P], [f, b]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [h, l, [f, b]], [/(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [h, l, [f, v]], [/(surface duo)/i], [l, [h, A], [f, v]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [l, [h, "Fairphone"], [f, b]], [/(u304aa)/i], [l, [h, "AT&T"], [f, b]], [/\bsie-(\w*)/i], [l, [h, "Siemens"], [f, b]], [/\b(rct\w+) b/i], [l, [h, "RCA"], [f, v]], [/\b(venue[\d ]{2,7}) b/i], [l, [h, "Dell"], [f, v]], [/\b(q(?:mv|ta)\w+) b/i], [l, [h, "Verizon"], [f, v]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [l, [h, "Barnes & Noble"], [f, v]], [/\b(tm\d{3}\w+) b/i], [l, [h, "NuVision"], [f, v]], [/\b(k88) b/i], [l, [h, "ZTE"], [f, v]], [/\b(nx\d{3}j) b/i], [l, [h, "ZTE"], [f, b]], [/\b(gen\d{3}) b.+49h/i], [l, [h, "Swiss"], [f, b]], [/\b(zur\d{3}) b/i], [l, [h, "Swiss"], [f, v]], [/\b((zeki)?tb.*\b) b/i], [l, [h, "Zeki"], [f, v]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[h, "Dragon Touch"], l, [f, v]], [/\b(ns-?\w{0,9}) b/i], [l, [h, "Insignia"], [f, v]], [/\b((nxa|next)-?\w{0,9}) b/i], [l, [h, "NextBook"], [f, v]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[h, "Voice"], l, [f, b]], [/\b(lvtel\-)?(v1[12]) b/i], [[h, "LvTel"], l, [f, b]], [/\b(ph-1) /i], [l, [h, "Essential"], [f, b]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [l, [h, "Envizen"], [f, v]], [/\b(trio[-\w\. ]+) b/i], [l, [h, "MachSpeed"], [f, v]], [/\btu_(1491) b/i], [l, [h, "Rotor"], [f, v]], [/(shield[\w ]+) b/i], [l, [h, "Nvidia"], [f, v]], [/(sprint) (\w+)/i], [h, l, [f, b]], [/(kin\.[onetw]{3})/i], [[l, /\./g, " "], [h, A], [f, b]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [l, [h, L], [f, v]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [l, [h, L], [f, b]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [h, l, [f, m]], [/droid.+; (shield) bui/i], [l, [h, "Nvidia"], [f, m]], [/(playstation [345portablevi]+)/i], [l, [h, j], [f, m]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [l, [h, A], [f, m]], [/smart-tv.+(samsung)/i], [h, [f, y]], [/hbbtv.+maple;(\d+)/i], [[l, /^/, "SmartTV"], [h, C], [f, y]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[h, T], [f, y]], [/(apple) ?tv/i], [h, [l, "Apple TV"], [f, y]], [/crkey/i], [[l, "Chromecast"], [h, k], [f, y]], [/droid.+aft(\w)( bui|\))/i], [l, [h, x], [f, y]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [l, [h, P], [f, y]], [/(bravia[\w ]+)( bui|\))/i], [l, [h, j], [f, y]], [/(mitv-\w{5}) bui/i], [l, [h, M], [f, y]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w ]*; *(\w[^;]*);([^;]*)/i], [[h, W], [l, W], [f, y]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[f, y]], [/((pebble))app/i], [h, l, [f, _]], [/droid.+; (glass) \d/i], [l, [h, k], [f, _]], [/droid.+; (wt63?0{2,3})\)/i], [l, [h, L], [f, _]], [/(quest( 2)?)/i], [l, [h, U], [f, _]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [h, [f, w]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [l, [f, b]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [l, [f, v]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[f, v]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[f, b]], [/(android[-\w\. ]{0,9});.+buil/i], [l, [h, "Generic"]]],
                        engine: [[/windows.+ edge\/([\w\.]+)/i], [p, [d, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [p, [d, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i], [d, p], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [p, d]],
                        os: [[/microsoft (windows) (vista|xp)/i], [d, p], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [d, [p, z, q]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[d, "Windows"], [p, z, q]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /cfnetwork\/.+darwin/i], [[p, /_/g, "."], [d, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[d, "Mac OS"], [p, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [p, d], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [d, p], [/\(bb(10);/i], [p, [d, R]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [p, [d, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [p, [d, "Firefox OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [p, [d, "webOS"]], [/crkey\/([\d\.]+)/i], [p, [d, "Chromecast"]], [/(cros) [\w]+ ([\w\.]+\w)/i], [[d, "Chromium OS"], p], [/(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [d, p], [/(sunos) ?([\w\.\d]*)/i], [[d, "Solaris"], p], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i, /(unix) ?([\w\.]*)/i], [d, p]]
                    },
                    $ = function(e, t) {
                        if (typeof e === c && (t = e, e = o), !(this instanceof $))
                            return new $(e, t).getResult();
                        var n = e || (typeof i !== a && i.navigator && i.navigator.userAgent ? i.navigator.userAgent : ""),
                            r = t ? function(e, t) {
                                var n = {};
                                for (var r in e)
                                    t[r] && t[r].length % 2 == 0 ? n[r] = t[r].concat(e[r]) : n[r] = e[r];
                                return n
                            }(V, t) : V;
                        return this.getBrowser = function() {
                            var e,
                                t = {};
                            return t.name = o, t.version = o, G.call(t, n, r.browser), t.major = typeof (e = t.version) === u ? e.replace(/[^\d\.]/g, "").split(".")[0] : o, t
                        }, this.getCPU = function() {
                            var e = {};
                            return e.architecture = o, G.call(e, n, r.cpu), e
                        }, this.getDevice = function() {
                            var e = {};
                            return e.vendor = o, e.model = o, e.type = o, G.call(e, n, r.device), e
                        }, this.getEngine = function() {
                            var e = {};
                            return e.name = o, e.version = o, G.call(e, n, r.engine), e
                        }, this.getOS = function() {
                            var e = {};
                            return e.name = o, e.version = o, G.call(e, n, r.os), e
                        }, this.getResult = function() {
                            return {
                                ua: this.getUA(),
                                browser: this.getBrowser(),
                                engine: this.getEngine(),
                                os: this.getOS(),
                                device: this.getDevice(),
                                cpu: this.getCPU()
                            }
                        }, this.getUA = function() {
                            return n
                        }, this.setUA = function(e) {
                            return n = typeof e === u && e.length > 350 ? W(e, 350) : e, this
                        }, this.setUA(n), this
                    };
                $.VERSION = "1.0.32",
                $.BROWSER = D([d, p, "major"]),
                $.CPU = D([g]),
                $.DEVICE = D([l, h, f, m, b, y, v, _, w]),
                $.ENGINE = $.OS = D([d, p]),
                typeof t !== a ? (e.exports && (t = e.exports = $), t.UAParser = $) : n.amdO ? (r = function() {
                    return $
                }.call(t, n, t, e)) === o || (e.exports = r) : typeof i !== a && (i.UAParser = $);
                var K = typeof i !== a && (i.jQuery || i.Zepto);
                if (K && !K.ua) {
                    var Y = new $;
                    K.ua = Y.getResult(),
                    K.ua.get = function() {
                        return Y.getUA()
                    },
                    K.ua.set = function(e) {
                        Y.setUA(e);
                        var t = Y.getResult();
                        for (var n in t)
                            K.ua[n] = t[n]
                    }
                }
            }("object" == typeof self ? self : this)
        }
    },
    o = {};
function s(e) {
    var t = o[e];
    if (void 0 !== t)
        return t.exports;
    var n = o[e] = {
        id: e,
        exports: {}
    };
    return i[e].call(n.exports, n, n.exports, s), n.exports
}
s.m = i,
s.amdO = {},
s.n = e => {
    var t = e && e.__esModule ? () => e.default : () => e;
    return s.d(t, {
        a: t
    }), t
},
s.d = (e, t) => {
    for (var n in t)
        s.o(t, n) && !s.o(e, n) && Object.defineProperty(e, n, {
            enumerable: !0,
            get: t[n]
        })
},
s.f = {},
s.e = e => Promise.all(Object.keys(s.f).reduce(((t, n) => (s.f[n](e, t), t)), [])),
s.u = e => 1958 === e ? "1958.vendors.chunk.js" : 4650 === e ? "4650.vendors.chunk.js" : 2812 === e ? "2812.vendors.chunk.js" : 1960 === e ? "1960.vendors.chunk.js" : 911 === e ? "911.vendors.chunk.js" : 8292 === e ? "8292.vendors.chunk.js" : 9223 === e ? "9223.vendors.chunk.js" : 4815 === e ? "4815.vendors.chunk.js" : 1442 === e ? "1442.vendors.chunk.js" : 5797 === e ? "5797.vendors.chunk.js" : 2043 === e ? "2043.vendors.chunk.js" : 8813 === e ? "8813.vendors.chunk.js" : 4704 === e ? "4704.vendors.chunk.js" : 6209 === e ? "6209.vendors.chunk.js" : 1359 === e ? "1359.vendors.chunk.js" : 1294 === e ? "1294.vendors.chunk.js" : {
    47: "workplaceAppBusinessUphookPopup",
    609: "mainCS",
    637: "SduiBasicEngineIntegration",
    751: "standWithUkraineGrammarlySuspendedPopup",
    902: "knowledgeHubCard",
    1090: "iframeHost",
    1196: "setupSduiManagement",
    1530: "unifiedFunnelLoginReminderPopup",
    1599: "notification",
    2064: "dunningMessagePopup",
    2378: "simpleMessagePopup",
    2381: "recapPopup",
    2473: "emailOnboardingPopup",
    2826: "brandTonesActivationUphook",
    2905: "sduiNotification",
    3384: "sduiInlineCardRenderer",
    3429: "automaticallyAppliedAlertInlineCardView",
    3516: "oauthExchange",
    3587: "extensionConflictPopup",
    3896: "citationBuilderIntegration",
    4100: "proofit",
    4254: "dataControlPopup",
    4382: "cheetah",
    4449: "perceptionMetricsSurvey",
    4628: "gdocsFeedbackUI",
    5275: "SduiInlineEngineIntegration",
    5519: "loginSSOPopup",
    5835: "chipmunkPopup",
    6332: "accountMigrationNotificationPopup",
    6413: "autocomplete",
    7026: "onboardingPopup",
    7249: "gdocsExpandedViewUnavailable",
    7470: "PlagiarismButton",
    7485: "claimedUserPopup",
    7690: "onboardingWithReminderPopup",
    7717: "snippets",
    7725: "toneAI",
    7996: "gButtonPopover",
    8391: "onboardingDialog",
    8513: "knowledgeHubIntegration",
    8600: "loginReminderPopup",
    8661: "cheetahRevision",
    8721: "assistant",
    8839: "freePremiumUphookPopup",
    9209: "piiDetectionAlert",
    9366: "PlagiarismPage",
    9414: "automaticallyAppliedAlertView",
    9425: "tailoredBusinessUphookPopup",
    9545: "grammarlyBusinessSigninPopup",
    9704: "newToneDetectedPopup",
    9740: "gdocsOnboardingPopup",
    9822: "disablePopup",
    9910: "standWithUkraineBannerPopup"
}[e] + ".common.chunk.js",
s.miniCssF = e => "../css/" + {
    47: "workplaceAppBusinessUphookPopup",
    609: "mainCS",
    751: "standWithUkraineGrammarlySuspendedPopup",
    902: "knowledgeHubCard",
    1090: "iframeHost",
    1388: "Grammarly",
    1530: "unifiedFunnelLoginReminderPopup",
    1599: "notification",
    2064: "dunningMessagePopup",
    2378: "simpleMessagePopup",
    2381: "recapPopup",
    2473: "emailOnboardingPopup",
    2826: "brandTonesActivationUphook",
    2905: "sduiNotification",
    3429: "automaticallyAppliedAlertInlineCardView",
    3587: "extensionConflictPopup",
    3896: "citationBuilderIntegration",
    4100: "proofit",
    4254: "dataControlPopup",
    4382: "cheetah",
    4449: "perceptionMetricsSurvey",
    4628: "gdocsFeedbackUI",
    5519: "loginSSOPopup",
    5835: "chipmunkPopup",
    6332: "accountMigrationNotificationPopup",
    6413: "autocomplete",
    7026: "onboardingPopup",
    7249: "gdocsExpandedViewUnavailable",
    7470: "PlagiarismButton",
    7485: "claimedUserPopup",
    7690: "onboardingWithReminderPopup",
    7717: "snippets",
    7996: "gButtonPopover",
    8391: "onboardingDialog",
    8513: "knowledgeHubIntegration",
    8600: "loginReminderPopup",
    8721: "assistant",
    8839: "freePremiumUphookPopup",
    9209: "piiDetectionAlert",
    9414: "automaticallyAppliedAlertView",
    9425: "tailoredBusinessUphookPopup",
    9545: "grammarlyBusinessSigninPopup",
    9704: "newToneDetectedPopup",
    9740: "gdocsOnboardingPopup",
    9822: "disablePopup",
    9910: "standWithUkraineBannerPopup"
}[e] + ".styles.css",
s.g = function() {
    if ("object" == typeof globalThis)
        return globalThis;
    try {
        return this || new Function("return this")()
    } catch (e) {
        if ("object" == typeof window)
            return window
    }
}(),
s.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t),
e = {},
s.l = (t, n, r, i) => {
    if (e[t])
        e[t].push(n);
    else {
        var o,
            s;
        if (void 0 !== r)
            for (var a = document.getElementsByTagName("script"), c = 0; c < a.length; c++) {
                var u = a[c];
                if (u.getAttribute("src") == t) {
                    o = u;
                    break
                }
            }
        if (!o) {
            s = !0;
            var l = t,
                d = (i = r.replace("chunk-", ""), function(n) {
                    var r = {
                            type: n,
                            target: {
                                src: l
                            }
                        },
                        i = e[t];
                    delete e[t],
                    i && i.forEach((e => e(r)))
                });
            return e[t] = [n], import(l).then((() => d("load"))).catch((() => {
                var e = 0,
                    t = setInterval((() => {
                        var n = window.webpackChunk,
                            r = Array.isArray(n) && n.some((e => Array.isArray(e) && Array.isArray(e[0]) && e[0].includes(i)));
                        r || e > 12e4 ? (clearInterval(t), d(r ? "load" : "missing")) : e += 100
                    }), 100)
            }))
        }
        e[t] = [n];
        var f = (n, r) => {
                o.onerror = o.onload = null,
                clearTimeout(h);
                var i = e[t];
                if (delete e[t], o.parentNode && o.parentNode.removeChild(o), i && i.forEach((e => e(r))), n)
                    return n(r)
            },
            h = setTimeout(f.bind(null, void 0, {
                type: "timeout",
                target: o
            }), 12e4);
        o.onerror = f.bind(null, o.onerror),
        o.onload = f.bind(null, o.onload),
        s && document.head.appendChild(o)
    }
},
s.r = e => {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
    }),
    Object.defineProperty(e, "__esModule", {
        value: !0
    })
},
s.j = 1388,
s.p = "/src/js/",
s.p = (t = s.p, s.p && s.p.includes("://") ? t : (window.popupInitArgs ? window.popupInitArgs.baseURI : safari.extension.baseURI) + t.substring(t.lastIndexOf("/") + 1)),
n = e => new Promise(((t, n) => {
    var r = s.miniCssF(e),
        i = s.p + r;
    if (((e, t) => {
        for (var n = document.getElementsByTagName("link"), r = 0; r < n.length; r++) {
            var i = (s = n[r]).getAttribute("data-href") || s.getAttribute("href");
            if ("stylesheet" === s.rel && (i === e || i === t))
                return s
        }
        var o = document.getElementsByTagName("style");
        for (r = 0; r < o.length; r++) {
            var s;
            if ((i = (s = o[r]).getAttribute("data-href")) === e || i === t)
                return s
        }
    })(r, i))
        return t();
    ((e, t, n, r) => {
        var i = document.createElement("link");
        i.rel = "stylesheet",
        i.type = "text/css",
        i.onerror = i.onload = o => {
            if (i.onerror = i.onload = null, "load" === o.type)
                n();
            else {
                var s = o && ("load" === o.type ? "missing" : o.type),
                    a = o && o.target && o.target.href || t,
                    c = new Error("Loading CSS chunk " + e + " failed.\n(" + a + ")");
                c.code = "CSS_CHUNK_LOAD_FAILED",
                c.type = s,
                c.request = a,
                i.parentNode.removeChild(i),
                r(c)
            }
        },
        i.href = t,
        (e => {
            e.dispatchEvent(new Event("load"))
        })(i)
    })(e, i, t, n)
})),
r = {
    1388: 0
},
s.f.miniCss = (e, t) => {
    r[e] ? t.push(r[e]) : 0 !== r[e] && {
        47: 1,
        609: 1,
        751: 1,
        902: 1,
        1090: 1,
        1530: 1,
        1599: 1,
        2064: 1,
        2378: 1,
        2381: 1,
        2473: 1,
        2826: 1,
        2905: 1,
        3429: 1,
        3587: 1,
        3896: 1,
        4100: 1,
        4254: 1,
        4382: 1,
        4449: 1,
        4628: 1,
        5519: 1,
        5835: 1,
        6332: 1,
        6413: 1,
        7026: 1,
        7249: 1,
        7470: 1,
        7485: 1,
        7690: 1,
        7717: 1,
        7996: 1,
        8391: 1,
        8513: 1,
        8600: 1,
        8721: 1,
        8839: 1,
        9209: 1,
        9414: 1,
        9425: 1,
        9545: 1,
        9704: 1,
        9740: 1,
        9822: 1,
        9910: 1
    }[e] && t.push(r[e] = n(e).then((() => {
        r[e] = 0
    }), (t => {
        throw delete r[e], t
    })))
},
(() => {
    var e = {
        1388: 0
    };
    s.f.j = (t, n) => {
        var r = s.o(e, t) ? e[t] : void 0;
        if (0 !== r)
            if (r)
                n.push(r[2]);
            else {
                var i = new Promise(((n, i) => r = e[t] = [n, i]));
                n.push(r[2] = i);
                var o = s.p + s.u(t),
                    a = new Error;
                s.l(o, (n => {
                    if (s.o(e, t) && (0 !== (r = e[t]) && (e[t] = void 0), r)) {
                        var i = n && ("load" === n.type ? "missing" : n.type),
                            o = n && n.target && n.target.src;
                        a.message = "Loading chunk " + t + " failed.\n(" + i + ": " + o + ")",
                        a.name = "ChunkLoadError",
                        a.type = i,
                        a.request = o,
                        r[1](a)
                    }
                }), "chunk-" + t, t)
            }
    };
    var t = (t, n) => {
            var r,
                i,
                [o, a, c] = n,
                u = 0;
            if (o.some((t => 0 !== e[t]))) {
                for (r in a)
                    s.o(a, r) && (s.m[r] = a[r]);
                if (c)
                    c(s)
            }
            for (t && t(n); u < o.length; u++)
                i = o[u],
                s.o(e, i) && e[i] && e[i][0](),
                e[i] = 0
        },
        n = self.webpackChunk = self.webpackChunk || [];
    n.forEach(t.bind(null, 0)),
    n.push = t.bind(null, n.push.bind(n))
})(),
(() => {
    s(51243);
    var e = s(33394),
        t = s(67656),
        n = s(43124),
        r = s(55649);
    class i {
        constructor(e)
        {
            this._logger = e,
            this._listeners = {},
            this._queue = {}
        }
        fire(e, t, n)
        {
            const r = this._listeners[e] || [];
            r.length ? r.forEach((e => e(t, n))) : (this._queue[e] = this._queue[e] || [], this._queue[e].push({
                data: t,
                sender: n
            }))
        }
        unlisten(e, t)
        {
            const n = this._listeners[e] || [],
                r = n.indexOf(t);
            -1 !== r && (1 === n.length ? delete this._listeners[e] : n.splice(r, 1))
        }
        listenOnce(e, t)
        {
            const n = (r, i) => {
                this.unlisten(e, n),
                t(r, i)
            };
            this.listen(e, n)
        }
        listen(e, t)
        {
            this._listeners[e] = this._listeners[e] || [],
            -1 === this._listeners[e].indexOf(t) && this._listeners[e].push(t);
            const n = this._queue[e] || [];
            for (const e of n)
                try {
                    t(e.data, e.sender)
                } catch (e) {
                    this._logger.error("Exception during proccesing queued events", e)
                }
            delete this._queue[e]
        }
    }
    const o = r.Y.create("extension-api.message.safari-content");
    class a {
        constructor(e=!0)
        {
            this.kind = "content-script-message-api",
            this._messageHelper = new i(o),
            this._isStarted = !1,
            self.top !== self && e || (0, t.Sx)((e => {
                this._messageHelper.fire(e.event, e.data)
            }))
        }
        start()
        {
            if (this._isStarted)
                throw new Error("SafariContentScriptMessageImpl is already started");
            this._isStarted = !0;
            const e = () => {
                this.broadcastBackground("tab-connected")
            };
            document.hidden ? c(document, "visibilitychange", e) : "loading" === document.readyState ? c(document, "DOMContentLoaded", e) : e()
        }
        listen(e, n)
        {
            this._messageHelper.listen("broadcast", (r => {
                null !== e && e !== r.type || n(r.content, (e => {
                    r.id && (0, t.CN)(r.id, e)
                }))
            }))
        }
        broadcastBackground(e, t, n)
        {
            this._sendToBackground("broadcast-background", e, t, n)
        }
        _sendToBackground(e, r, i, o)
        {
            const s = (0, n.M8)();
            o && this._messageHelper.listenOnce(s, ((e, t) => o(e))),
            (0, t.CN)(e, {
                type: r,
                content: i,
                id: s
            })
        }
    }
    function c(e, t, n) {
        e.addEventListener(t, (function r() {
            e.removeEventListener(t, r),
            n()
        }))
    }
    var u = s(32952),
        l = s(82990);
    class d {
        constructor(e)
        {
            this._message = e,
            this.changes = new u.xQ,
            e.listen("pref-change", (e => {
                this.changes.next(e)
            }))
        }
        get(e)
        {
            return l.O.create((t => {
                this._message.broadcastBackground("pref-get", e, t)
            }))
        }
        set(e)
        {
            return l.O.create((t => {
                this._message.broadcastBackground("pref-set", e, t)
            }))
        }
        getAll()
        {
            return l.O.create((e => {
                this._message.broadcastBackground("pref-get-all", void 0, ((...t) => {
                    e(t[0])
                }))
            }))
        }
        remove(e)
        {
            return l.O.create((t => {
                this._message.broadcastBackground("pref-remove", e, t)
            }))
        }
        removeAll()
        {
            return l.O.create((e => {
                this._message.broadcastBackground("pref-remove-all", e)
            }))
        }
    }
    var f = s(21755);
    var h = s(48015);
    const p = "https://www.grammarly.com",
        g = "/signin",
        m = "/api/apple",
        b = "https://www.grammarly.com",
        v = "/social/redirect";
    function y() {
        return (document.location.origin === p && document.location.pathname === g || document.location.origin === p && document.location.pathname === m) && (s.e(3516).then(s.bind(s, 97281)).then((({initOAuthExchange: e}) => e())), !0)
    }
    var _ = s(56913),
        w = s(20641),
        x = s(49708),
        E = s(77843),
        S = s(2844),
        R = s(85985),
        O = s(50628),
        k = s(17343),
        I = s(93508),
        T = s(28043),
        A = s(77176),
        F = s(75463);
    var N,
        C = s(85441),
        P = s(5397),
        j = s(61882),
        M = s(65546),
        L = s(9172),
        U = s(82828),
        D = s(15222),
        B = s(36054),
        H = s(60504),
        W = s(42356);
    !function(e) {
        e.init = function(e, t) {
            const n = r.Y.create("lib.external");
            !function(e, t, n, r=document, i=!1, o=!1, s, a) {
                const c = e,
                    u = r.documentElement;
                if (i) {
                    const e = r.createElement("link");
                    e.href = c,
                    e.rel = "preload",
                    e.as = "script",
                    e.onload = () => {
                        e.remove()
                    },
                    u.prepend(e)
                }
                const l = r.createElement("script");
                l.async = !1,
                l.defer = !1,
                l.src = c,
                l.type = "text/javascript",
                t && l.setAttribute("data-ext-id", t),
                n && l.setAttribute("data-ext-version", n),
                o && l.setAttribute("data-ext-minimal", "true"),
                l.onload = () => {
                    null == s || s(),
                    l.remove()
                },
                l.onerror = () => {
                    null == a || a()
                },
                u.prepend(l)
            }(t("src/js/Grammarly-externalEventsInjectedCs.js"), (0, _.pB)());
            const i = H.HW.map((t => {
                const r = `external:${t}`;
                return W.on.call(document, r, (({detail: t}) => {
                    n.trace("external event", {
                        event: r,
                        detail: t
                    }),
                    e.sendBackground(r, t)
                }))
            }));
            return {
                dispose: () => {
                    i.forEach((e => e.off()))
                }
            }
        }
    }(N || (N = {}));
    var G = s(27148),
        z = s(70201),
        q = s(7992),
        V = s(57173),
        $ = s(12764),
        K = s(12126),
        Y = s(78674),
        J = s(66310),
        X = s(51129),
        Z = s(83731),
        Q = s(98805);
    const ee = (e, t) => {
        const n = {
            getAll: async () => await r.getAll(),
            get: async e => await r.get(e),
            view: () => {
                throw new Error("not_implemented")
            },
            patch: async e => await r.set(e),
            changes: (r = e.browserApi.preferences).changes
        };
        var r;
        const i = (0, S.aj)((0, K.D)(n.changes).pipe((0, I.O)(null), (0, Y.b)(200), (0, J.w)((() => n.getAll()))), (0, K.D)((0, h.XD)(5, Q.Xd(2), (() => e.bgRpc.api.getPageConfig(t, self.location.href))).catch((e => null))).pipe((0, I.O)(null)), ((e, n) => {
            var r,
                i,
                o,
                s,
                a,
                c;
            const u = null !== (i = null === (r = e.extensionSettings) || void 0 === r ? void 0 : r[t]) && void 0 !== i ? i : {},
                l = (null === (o = null == u ? void 0 : u.enabled) || void 0 === o || o) && (null === (s = null == n ? void 0 : n.enabled) || void 0 === s || s);
            return {
                user: null !== (a = e.user) && void 0 !== a ? a : X.n5.defaultUser,
                settings: e.extensionSettings,
                dynamicConfig: null !== (c = e.dynamicConfig) && void 0 !== c ? c : Z.cS,
                dapi: e.dapi,
                enabled: l
            }
        }));
        return {
            storeLite: n,
            viewStoreLite: i
        }
    };
    var te,
        ne,
        re,
        ie = s(17627),
        oe = s(71654),
        se = s(35349);
    class ae {
        constructor(e, t, n, i=r.Y.create("ExtensionIntegrationCheck"))
        {
            this._csShareStorage = e,
            this._loadContentScript = t,
            this._log = i,
            this._pageEnable = !0,
            this._citationBuilderEnable = !1,
            this._enabledDefs = !1,
            this._isAnonymous = !0,
            this._wasLoaded = !1,
            this._isDesktopIntegrationEnable = !1,
            this._mutations = B.x.createFlattenHot(self.document, {
                childList: !0,
                subtree: !0
            }),
            this._textFieldsObservable = M.S.createFocusObservable(self.document, this._mutations),
            this._subs = [this._textFieldsObservable.subscribe((e => {
                const t = e.owner.frame || e.element,
                    n = j.T.get(t);
                this._log.debug("detected click", {
                    field: t,
                    fieldType: n
                }),
                this._pageEnable && (n.generic || n.specific) && this.load()
            })), ae.clickObserver.subscribe((e => {
                2 === e.detail && this._enabledDefs && this._pageEnable && !this._isAnonymous && ne.isValid() && (this._log.debug("dictionary event executed", e), this._csShareStorage.set("extensionDictionaryEvent", e), this._subs.push(ne.animation()), this.load())
            }))],
            n && !(0, _.n_)() && this.load()
        }
        load()
        {
            this._wasLoaded && !this._isDesktopIntegrationEnable || (this._log.debug("load main content script"), this._wasLoaded = !0, re.callExecuteContentScript(), this.dispose(), this._loadContentScript())
        }
        dispose()
        {
            this._subs.forEach((e => e.unsubscribe()))
        }
        updateState(e, t, n, r, i)
        {
            this._isDesktopIntegrationEnable = r,
            (!this._pageEnable && t || !this._citationBuilderEnable && i) && this.load(),
            this._citationBuilderEnable = i,
            this._isAnonymous = e,
            this._pageEnable = t,
            this._enabledDefs = n,
            (0, se.ix)(this._pageEnable ? null : "forever")
        }
    }
    !function(e) {
        e.clickObserver = (0, x.R)(self.document, "click", {
            capture: !0
        }),
        e.start = async function(t, n=!0, i, o=!1) {
            re.checkScriptInitStart();
            const s = (0, q.ge)(),
                a = C.Xb.init(Object.assign(Object.assign({}, t), {
                    skipInitExtensionApi: n,
                    skipWriteLogsToBackupStorage: !0
                })),
                c = r.Y.create("universal.check");
            if ("text/html" !== document.contentType)
                return c.info("not a html page, skip integration check"), void (0, w.Tb)().skipIntegrationForNonHtmlPage();
            const u = [],
                l = new e(a.csShareStorage, (() => {
                    (null != i ? i : a.bgRpc.api.loadContentScript)(),
                    u.forEach((e => e && e.dispose()))
                }), o),
                d = new D.x,
                f = te.init(a.browserApi, a.message, a.config, s),
                {viewStoreLite: p} = ee(a, s),
                g = (0, h.hz)((e => {
                    (0, w.Tb)().sendFemetricsRate("checkScriptInitialized", {
                        domain: (0, F.FN)(),
                        isExtensionEnabled: e,
                        isIframe: (0, _.n_)()
                    }, ["firstInstall", "registrationDate"])
                })),
                m = p.subscribe((e => {
                    var t,
                        n,
                        r,
                        i;
                    c.debug("check script state is updated", e);
                    const o = null === (t = e.settings) || void 0 === t ? void 0 : t.common;
                    l.updateState(null === (r = null === (n = e.user) || void 0 === n ? void 0 : n.anonymous) || void 0 === r || r, e.enabled, null !== (i = null == o ? void 0 : o.enabledDefs) && void 0 !== i && i, U.q.isIntegrationEnabled(o, s, e.dynamicConfig), (0, L.PM)(s, e.dynamicConfig, o)),
                    d.updateState(s, e.dynamicConfig, e.enabled, o),
                    g(e.enabled)
                })),
                b = [l, f, d];
            a.message.once("contentScript-disconnected", (() => {
                m.unsubscribe(),
                a.csShareStorage.clean(),
                b.forEach((e => e && e.dispose()))
            })),
            a.message.once($.B.Kind.disableOnTab, (() => {
                d.dispose()
            })),
            G.B.initSendLogsToPopupHandler(a),
            u.push(G.B.initKeyboradShortcutHandler(a)),
            re.checkScriptInitEnd(a.bgRpc),
            (e => {
                if (self.location.href.includes("grammarly.com/extension-success")) {
                    const t = document.getElementById("click-to-run");
                    t && (t.onclick = () => {
                        var t,
                            n;
                        confirm("Always allow Grammarly to run on every website") ? (e.api.enableClickToRunOnAllWebsites(), null === (t = document.getElementById("click-to-run-success")) || void 0 === t || t.click()) : null === (n = document.getElementById("click-to-run-fail")) || void 0 === n || n.click()
                    })
                }
            })(a.bgRpc),
            c.debug("Check script initialized!")
        }
    }(ae || (ae = {})),
    function(e) {
        e.init = function(e, t, n, r) {
            const i = [];
            return function(e) {
                (0, E.F)(10).pipe((0, R.h)((() => !!document.body)), (0, O.P)()).subscribe((() => {
                    document.body.dataset.newGrCSCheckLoaded = e.buildInfo.version,
                    (0, se.vG)()
                }))
            }(n), self.location.protocol === n.appConfig.url.grammarlyProtocol && r.match(`^([a-z\\-0-9]+\\.)*${n.appConfig.url.grammarlyDomain}$`) && i.push(N.init(t, e.getUrl)), {
                dispose: () => {
                    i.forEach((e => e.dispose()))
                }
            }
        }
    }(te || (te = {})),
    function(e) {
        const t = "important";
        function n(e) {
            return String(e) + "px"
        }
        e.isValid = function() {
            const e = self.document.getSelection();
            return !(!e || e.toString().match(/[0-9_±!@#$%^&*:"|<>?~().,:}{’='-/ /]/)) && (0, V.F)(e, self.document)
        },
        e.animation = function() {
            const e = document.createElement("div"),
                r = e.attachShadow({
                    mode: "open"
                }),
                i = document.createElement("style");
            i.innerHTML = oe.__css,
            r.appendChild(i);
            const o = self.document.getSelection().getRangeAt(0).getBoundingClientRect(),
                s = document.createElement("div");
            s.style.setProperty("top", n(o.top), t),
            s.style.setProperty("left", n(o.left), t),
            s.style.setProperty("height", n(o.height), t),
            s.style.setProperty("max-width", n(o.width), t),
            s.style.setProperty("z-index", P.U_.toString(), t),
            s.classList.add(oe.animatedUnderline, oe.checkAnimatedUnderline),
            r.appendChild(s),
            document.body.appendChild(e);
            const a = (0, E.F)(10),
                c = (0, S.aj)(ae.clickObserver.pipe((0, O.P)(), (0, k.h)(!1), (0, I.O)(!0), (0, T.x)()), a.pipe((0, A.U)((() => {
                    const e = "." + z.completeAnimation;
                    if (document.querySelector(e))
                        return !0;
                    const t = Array.from(document.querySelectorAll("grammarly-extension"));
                    for (const n of t)
                        if (n.shadowRoot && n.shadowRoot.querySelector(e))
                            return !0;
                    return !1
                })), (0, I.O)(!1), (0, T.x)())).pipe((0, R.h)((([e, t]) => !e || t)), (0, T.x)()).subscribe(u);
            return {
                unsubscribe: u
            };
            function u() {
                c.unsubscribe(),
                e.remove()
            }
        }
    }(ne || (ne = {})),
    function(e) {
        const t = Date.now(),
            n = e => self.performance.mark("@grammarly-extension:" + e);
        e.callExecuteContentScript = () => n("callExecuteContentScript"),
        e.checkScriptInitEnd = e => {
            const r = Math.random() < .01;
            if (n("checkScriptInitEnd"), r) {
                const n = Date.now();
                e.api.trackCall(ie.r, ["sendFelogEvent", {
                    ex_csInitPerf: {
                        domain: self.location.host,
                        initTime: n - t,
                        pageLoadTime: n - self.performance.timing.responseEnd
                    },
                    hideUserInfo: !0,
                    level: "INFO",
                    logger: "checkScript.initialized"
                }])
            }
        },
        e.checkScriptInitStart = () => n("checkScriptInitStart")
    }(re || (re = {}));
    const ce = {
        browser: "safari",
        extensionType: "safariAppExtension",
        deploymentType: "regular",
        browserApi: new class {
            constructor(n=!0)
            {
                this._dontInitInIFrames = n,
                this.message = new a(this._dontInitInIFrames),
                this.baseUri = safari.extension.baseURI,
                this.getUrl = e => safari.extension.baseURI + e.substring(e.lastIndexOf("/") + 1),
                this.openSubscriptionDialog = n => {
                    n.isAnonymousUser ? (0, t.IG)() : (0, t.NX)(n.forceUtmCampaign ? (0, e.bO)(n.forceUtmCampaign) : "unknownPlacement")
                },
                this.preferences = new d(this.message),
                this.sessionStorage = new f.t,
                this.i18n = {
                    detectLanguage: e => l.O.fromPromise(new Promise((t => this.message.broadcastBackground("detect-language", {
                        text: e
                    }, (e => t({
                        isReliable: !!e,
                        languages: e ? [{
                            language: e.toLowerCase(),
                            percentage: 100
                        }] : []
                    })))))),
                    getUILanguage: () => navigator.language.toLowerCase(),
                    getAcceptLanguages: () => l.O.fromPromise(Promise.resolve([this.i18n.getUILanguage()]))
                }
            }
            beginOAuth()
            {
                (0, t.IG)()
            }
            redirectClaimedUser()
            {
                (0, t.Yf)()
            }
        }
        (!1)
    };
    ae.start(ce, !1, (async () => {
        const e = r.Y.create("safariApp.dynamicInit");
        try {
            const {defaultGetGeneralPurposePageIntegrationRules: t, defaultGetPageIntegrationRules: n, start: r} = await Promise.all([s.e(1958), s.e(609)]).then(s.bind(s, 16002));
            r(ce, n, t),
            e.info("load main cs success")
        } catch (t) {
            e.error("load main cs error", t)
        }
    }), ["mail.google.com"].includes(self.location.hostname)),
    document.location.origin === b && document.location.pathname === v ? (0, h.XD)(4, 600, (() => y() ? Promise.resolve() : Promise.reject())) : y()
})();
