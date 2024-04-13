(function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload"))
        return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]'))
        r(i);
    new MutationObserver(i=>{
        for (const o of i)
            if (o.type === "childList")
                for (const s of o.addedNodes)
                    s.tagName === "LINK" && s.rel === "modulepreload" && r(s)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function n(i) {
        const o = {};
        return i.integrity && (o.integrity = i.integrity),
        i.referrerpolicy && (o.referrerPolicy = i.referrerpolicy),
        i.crossorigin === "use-credentials" ? o.credentials = "include" : i.crossorigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin",
        o
    }
    function r(i) {
        if (i.ep)
            return;
        i.ep = !0;
        const o = n(i);
        fetch(i.href, o)
    }
}
)();
function tn({onContinueClick: t}) {
    const e = document.createElement("div");
    return e.className = "welcome-page",
    e.innerHTML = `
        <h1 class="typewriter">Game Of Life</h1>
        <p class="press-to-continue">>> <span>Press to continue</span> &#60;&#60;</p>
    `,
    e.getElementsByClassName("press-to-continue")[0].addEventListener("click", t),
    e
}
function pt(t, e) {
    return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN
}
function en(t, e) {
    return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN
}
function be(t) {
    let e, n, r;
    t.length !== 2 ? (e = pt,
    n = (a,u)=>pt(t(a), u),
    r = (a,u)=>t(a) - u) : (e = t === pt || t === en ? t : nn,
    n = t,
    r = t);
    function i(a, u, l=0, c=a.length) {
        if (l < c) {
            if (e(u, u) !== 0)
                return c;
            do {
                const f = l + c >>> 1;
                n(a[f], u) < 0 ? l = f + 1 : c = f
            } while (l < c)
        }
        return l
    }
    function o(a, u, l=0, c=a.length) {
        if (l < c) {
            if (e(u, u) !== 0)
                return c;
            do {
                const f = l + c >>> 1;
                n(a[f], u) <= 0 ? l = f + 1 : c = f
            } while (l < c)
        }
        return l
    }
    function s(a, u, l=0, c=a.length) {
        const f = i(a, u, l, c - 1);
        return f > l && r(a[f - 1], u) > -r(a[f], u) ? f - 1 : f
    }
    return {
        left: i,
        center: s,
        right: o
    }
}
function nn() {
    return 0
}
function rn(t) {
    return t === null ? NaN : +t
}
const on = be(pt)
  , sn = on.right;
be(rn).center;
const an = sn;
var Lt = Math.sqrt(50)
  , qt = Math.sqrt(10)
  , It = Math.sqrt(2);
function ln(t, e, n) {
    var r, i = -1, o, s, a;
    if (e = +e,
    t = +t,
    n = +n,
    t === e && n > 0)
        return [t];
    if ((r = e < t) && (o = t,
    t = e,
    e = o),
    (a = Ne(t, e, n)) === 0 || !isFinite(a))
        return [];
    if (a > 0) {
        let u = Math.round(t / a)
          , l = Math.round(e / a);
        for (u * a < t && ++u,
        l * a > e && --l,
        s = new Array(o = l - u + 1); ++i < o; )
            s[i] = (u + i) * a
    } else {
        a = -a;
        let u = Math.round(t * a)
          , l = Math.round(e * a);
        for (u / a < t && ++u,
        l / a > e && --l,
        s = new Array(o = l - u + 1); ++i < o; )
            s[i] = (u + i) / a
    }
    return r && s.reverse(),
    s
}
function Ne(t, e, n) {
    var r = (e - t) / Math.max(0, n)
      , i = Math.floor(Math.log(r) / Math.LN10)
      , o = r / Math.pow(10, i);
    return i >= 0 ? (o >= Lt ? 10 : o >= qt ? 5 : o >= It ? 2 : 1) * Math.pow(10, i) : -Math.pow(10, -i) / (o >= Lt ? 10 : o >= qt ? 5 : o >= It ? 2 : 1)
}
function un(t, e, n) {
    var r = Math.abs(e - t) / Math.max(0, n)
      , i = Math.pow(10, Math.floor(Math.log(r) / Math.LN10))
      , o = r / i;
    return o >= Lt ? i *= 10 : o >= qt ? i *= 5 : o >= It && (i *= 2),
    e < t ? -i : i
}
var cn = {
    value: ()=>{}
};
function Ae() {
    for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
        if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r))
            throw new Error("illegal type: " + r);
        n[r] = []
    }
    return new gt(n)
}
function gt(t) {
    this._ = t
}
function fn(t, e) {
    return t.trim().split(/^|\s+/).map(function(n) {
        var r = ""
          , i = n.indexOf(".");
        if (i >= 0 && (r = n.slice(i + 1),
        n = n.slice(0, i)),
        n && !e.hasOwnProperty(n))
            throw new Error("unknown type: " + n);
        return {
            type: n,
            name: r
        }
    })
}
gt.prototype = Ae.prototype = {
    constructor: gt,
    on: function(t, e) {
        var n = this._, r = fn(t + "", n), i, o = -1, s = r.length;
        if (arguments.length < 2) {
            for (; ++o < s; )
                if ((i = (t = r[o]).type) && (i = hn(n[i], t.name)))
                    return i;
            return
        }
        if (e != null && typeof e != "function")
            throw new Error("invalid callback: " + e);
        for (; ++o < s; )
            if (i = (t = r[o]).type)
                n[i] = ee(n[i], t.name, e);
            else if (e == null)
                for (i in n)
                    n[i] = ee(n[i], t.name, null);
        return this
    },
    copy: function() {
        var t = {}
          , e = this._;
        for (var n in e)
            t[n] = e[n].slice();
        return new gt(t)
    },
    call: function(t, e) {
        if ((i = arguments.length - 2) > 0)
            for (var n = new Array(i), r = 0, i, o; r < i; ++r)
                n[r] = arguments[r + 2];
        if (!this._.hasOwnProperty(t))
            throw new Error("unknown type: " + t);
        for (o = this._[t],
        r = 0,
        i = o.length; r < i; ++r)
            o[r].value.apply(e, n)
    },
    apply: function(t, e, n) {
        if (!this._.hasOwnProperty(t))
            throw new Error("unknown type: " + t);
        for (var r = this._[t], i = 0, o = r.length; i < o; ++i)
            r[i].value.apply(e, n)
    }
};
function hn(t, e) {
    for (var n = 0, r = t.length, i; n < r; ++n)
        if ((i = t[n]).name === e)
            return i.value
}
function ee(t, e, n) {
    for (var r = 0, i = t.length; r < i; ++r)
        if (t[r].name === e) {
            t[r] = cn,
            t = t.slice(0, r).concat(t.slice(r + 1));
            break
        }
    return n != null && t.push({
        name: e,
        value: n
    }),
    t
}
var Rt = "http://www.w3.org/1999/xhtml";
const ne = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: Rt,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
};
function Et(t) {
    var e = t += ""
      , n = e.indexOf(":");
    return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)),
    ne.hasOwnProperty(e) ? {
        space: ne[e],
        local: t
    } : t
}
function dn(t) {
    return function() {
        var e = this.ownerDocument
          , n = this.namespaceURI;
        return n === Rt && e.documentElement.namespaceURI === Rt ? e.createElement(t) : e.createElementNS(n, t)
    }
}
function pn(t) {
    return function() {
        return this.ownerDocument.createElementNS(t.space, t.local)
    }
}
function ke(t) {
    var e = Et(t);
    return (e.local ? pn : dn)(e)
}
function gn() {}
function Bt(t) {
    return t == null ? gn : function() {
        return this.querySelector(t)
    }
}
function mn(t) {
    typeof t != "function" && (t = Bt(t));
    for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
        for (var o = e[i], s = o.length, a = r[i] = new Array(s), u, l, c = 0; c < s; ++c)
            (u = o[c]) && (l = t.call(u, u.__data__, c, o)) && ("__data__"in u && (l.__data__ = u.__data__),
            a[c] = l);
    return new _(r,this._parents)
}
function yn(t) {
    return t == null ? [] : Array.isArray(t) ? t : Array.from(t)
}
function vn() {
    return []
}
function Me(t) {
    return t == null ? vn : function() {
        return this.querySelectorAll(t)
    }
}
function wn(t) {
    return function() {
        return yn(t.apply(this, arguments))
    }
}
function xn(t) {
    typeof t == "function" ? t = wn(t) : t = Me(t);
    for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
        for (var s = e[o], a = s.length, u, l = 0; l < a; ++l)
            (u = s[l]) && (r.push(t.call(u, u.__data__, l, s)),
            i.push(u));
    return new _(r,i)
}
function Ee(t) {
    return function() {
        return this.matches(t)
    }
}
function Ce(t) {
    return function(e) {
        return e.matches(t)
    }
}
var _n = Array.prototype.find;
function bn(t) {
    return function() {
        return _n.call(this.children, t)
    }
}
function Nn() {
    return this.firstElementChild
}
function An(t) {
    return this.select(t == null ? Nn : bn(typeof t == "function" ? t : Ce(t)))
}
var kn = Array.prototype.filter;
function Mn() {
    return Array.from(this.children)
}
function En(t) {
    return function() {
        return kn.call(this.children, t)
    }
}
function Cn(t) {
    return this.selectAll(t == null ? Mn : En(typeof t == "function" ? t : Ce(t)))
}
function Sn(t) {
    typeof t != "function" && (t = Ee(t));
    for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
        for (var o = e[i], s = o.length, a = r[i] = [], u, l = 0; l < s; ++l)
            (u = o[l]) && t.call(u, u.__data__, l, o) && a.push(u);
    return new _(r,this._parents)
}
function Se(t) {
    return new Array(t.length)
}
function $n() {
    return new _(this._enter || this._groups.map(Se),this._parents)
}
function vt(t, e) {
    this.ownerDocument = t.ownerDocument,
    this.namespaceURI = t.namespaceURI,
    this._next = null,
    this._parent = t,
    this.__data__ = e
}
vt.prototype = {
    constructor: vt,
    appendChild: function(t) {
        return this._parent.insertBefore(t, this._next)
    },
    insertBefore: function(t, e) {
        return this._parent.insertBefore(t, e)
    },
    querySelector: function(t) {
        return this._parent.querySelector(t)
    },
    querySelectorAll: function(t) {
        return this._parent.querySelectorAll(t)
    }
};
function Tn(t) {
    return function() {
        return t
    }
}
function Ln(t, e, n, r, i, o) {
    for (var s = 0, a, u = e.length, l = o.length; s < l; ++s)
        (a = e[s]) ? (a.__data__ = o[s],
        r[s] = a) : n[s] = new vt(t,o[s]);
    for (; s < u; ++s)
        (a = e[s]) && (i[s] = a)
}
function qn(t, e, n, r, i, o, s) {
    var a, u, l = new Map, c = e.length, f = o.length, h = new Array(c), d;
    for (a = 0; a < c; ++a)
        (u = e[a]) && (h[a] = d = s.call(u, u.__data__, a, e) + "",
        l.has(d) ? i[a] = u : l.set(d, u));
    for (a = 0; a < f; ++a)
        d = s.call(t, o[a], a, o) + "",
        (u = l.get(d)) ? (r[a] = u,
        u.__data__ = o[a],
        l.delete(d)) : n[a] = new vt(t,o[a]);
    for (a = 0; a < c; ++a)
        (u = e[a]) && l.get(h[a]) === u && (i[a] = u)
}
function In(t) {
    return t.__data__
}
function Rn(t, e) {
    if (!arguments.length)
        return Array.from(this, In);
    var n = e ? qn : Ln
      , r = this._parents
      , i = this._groups;
    typeof t != "function" && (t = Tn(t));
    for (var o = i.length, s = new Array(o), a = new Array(o), u = new Array(o), l = 0; l < o; ++l) {
        var c = r[l]
          , f = i[l]
          , h = f.length
          , d = Hn(t.call(c, c && c.__data__, l, r))
          , p = d.length
          , y = a[l] = new Array(p)
          , v = s[l] = new Array(p)
          , T = u[l] = new Array(h);
        n(c, f, y, v, T, d, e);
        for (var b = 0, w = 0, R, g; b < p; ++b)
            if (R = y[b]) {
                for (b >= w && (w = b + 1); !(g = v[w]) && ++w < p; )
                    ;
                R._next = g || null
            }
    }
    return s = new _(s,r),
    s._enter = a,
    s._exit = u,
    s
}
function Hn(t) {
    return typeof t == "object" && "length"in t ? t : Array.from(t)
}
function Pn() {
    return new _(this._exit || this._groups.map(Se),this._parents)
}
function Fn(t, e, n) {
    var r = this.enter()
      , i = this
      , o = this.exit();
    return typeof t == "function" ? (r = t(r),
    r && (r = r.selection())) : r = r.append(t + ""),
    e != null && (i = e(i),
    i && (i = i.selection())),
    n == null ? o.remove() : n(o),
    r && i ? r.merge(i).order() : i
}
function On(t) {
    for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, o = r.length, s = Math.min(i, o), a = new Array(i), u = 0; u < s; ++u)
        for (var l = n[u], c = r[u], f = l.length, h = a[u] = new Array(f), d, p = 0; p < f; ++p)
            (d = l[p] || c[p]) && (h[p] = d);
    for (; u < i; ++u)
        a[u] = n[u];
    return new _(a,this._parents)
}
function Dn() {
    for (var t = this._groups, e = -1, n = t.length; ++e < n; )
        for (var r = t[e], i = r.length - 1, o = r[i], s; --i >= 0; )
            (s = r[i]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o),
            o = s);
    return this
}
function zn(t) {
    t || (t = Vn);
    function e(f, h) {
        return f && h ? t(f.__data__, h.__data__) : !f - !h
    }
    for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
        for (var s = n[o], a = s.length, u = i[o] = new Array(a), l, c = 0; c < a; ++c)
            (l = s[c]) && (u[c] = l);
        u.sort(e)
    }
    return new _(i,this._parents).order()
}
function Vn(t, e) {
    return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN
}
function Xn() {
    var t = arguments[0];
    return arguments[0] = this,
    t.apply(null, arguments),
    this
}
function Bn() {
    return Array.from(this)
}
function Yn() {
    for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
        for (var r = t[e], i = 0, o = r.length; i < o; ++i) {
            var s = r[i];
            if (s)
                return s
        }
    return null
}
function Gn() {
    let t = 0;
    for (const e of this)
        ++t;
    return t
}
function Zn() {
    return !this.node()
}
function Qn(t) {
    for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
        for (var i = e[n], o = 0, s = i.length, a; o < s; ++o)
            (a = i[o]) && t.call(a, a.__data__, o, i);
    return this
}
function Wn(t) {
    return function() {
        this.removeAttribute(t)
    }
}
function Kn(t) {
    return function() {
        this.removeAttributeNS(t.space, t.local)
    }
}
function Un(t, e) {
    return function() {
        this.setAttribute(t, e)
    }
}
function Jn(t, e) {
    return function() {
        this.setAttributeNS(t.space, t.local, e)
    }
}
function jn(t, e) {
    return function() {
        var n = e.apply(this, arguments);
        n == null ? this.removeAttribute(t) : this.setAttribute(t, n)
    }
}
function tr(t, e) {
    return function() {
        var n = e.apply(this, arguments);
        n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n)
    }
}
function er(t, e) {
    var n = Et(t);
    if (arguments.length < 2) {
        var r = this.node();
        return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n)
    }
    return this.each((e == null ? n.local ? Kn : Wn : typeof e == "function" ? n.local ? tr : jn : n.local ? Jn : Un)(n, e))
}
function $e(t) {
    return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView
}
function nr(t) {
    return function() {
        this.style.removeProperty(t)
    }
}
function rr(t, e, n) {
    return function() {
        this.style.setProperty(t, e, n)
    }
}
function ir(t, e, n) {
    return function() {
        var r = e.apply(this, arguments);
        r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n)
    }
}
function or(t, e, n) {
    return arguments.length > 1 ? this.each((e == null ? nr : typeof e == "function" ? ir : rr)(t, e, n ?? "")) : W(this.node(), t)
}
function W(t, e) {
    return t.style.getPropertyValue(e) || $e(t).getComputedStyle(t, null).getPropertyValue(e)
}
function sr(t) {
    return function() {
        delete this[t]
    }
}
function ar(t, e) {
    return function() {
        this[t] = e
    }
}
function lr(t, e) {
    return function() {
        var n = e.apply(this, arguments);
        n == null ? delete this[t] : this[t] = n
    }
}
function ur(t, e) {
    return arguments.length > 1 ? this.each((e == null ? sr : typeof e == "function" ? lr : ar)(t, e)) : this.node()[t]
}
function Te(t) {
    return t.trim().split(/^|\s+/)
}
function Yt(t) {
    return t.classList || new Le(t)
}
function Le(t) {
    this._node = t,
    this._names = Te(t.getAttribute("class") || "")
}
Le.prototype = {
    add: function(t) {
        var e = this._names.indexOf(t);
        e < 0 && (this._names.push(t),
        this._node.setAttribute("class", this._names.join(" ")))
    },
    remove: function(t) {
        var e = this._names.indexOf(t);
        e >= 0 && (this._names.splice(e, 1),
        this._node.setAttribute("class", this._names.join(" ")))
    },
    contains: function(t) {
        return this._names.indexOf(t) >= 0
    }
};
function qe(t, e) {
    for (var n = Yt(t), r = -1, i = e.length; ++r < i; )
        n.add(e[r])
}
function Ie(t, e) {
    for (var n = Yt(t), r = -1, i = e.length; ++r < i; )
        n.remove(e[r])
}
function cr(t) {
    return function() {
        qe(this, t)
    }
}
function fr(t) {
    return function() {
        Ie(this, t)
    }
}
function hr(t, e) {
    return function() {
        (e.apply(this, arguments) ? qe : Ie)(this, t)
    }
}
function dr(t, e) {
    var n = Te(t + "");
    if (arguments.length < 2) {
        for (var r = Yt(this.node()), i = -1, o = n.length; ++i < o; )
            if (!r.contains(n[i]))
                return !1;
        return !0
    }
    return this.each((typeof e == "function" ? hr : e ? cr : fr)(n, e))
}
function pr() {
    this.textContent = ""
}
function gr(t) {
    return function() {
        this.textContent = t
    }
}
function mr(t) {
    return function() {
        var e = t.apply(this, arguments);
        this.textContent = e ?? ""
    }
}
function yr(t) {
    return arguments.length ? this.each(t == null ? pr : (typeof t == "function" ? mr : gr)(t)) : this.node().textContent
}
function vr() {
    this.innerHTML = ""
}
function wr(t) {
    return function() {
        this.innerHTML = t
    }
}
function xr(t) {
    return function() {
        var e = t.apply(this, arguments);
        this.innerHTML = e ?? ""
    }
}
function _r(t) {
    return arguments.length ? this.each(t == null ? vr : (typeof t == "function" ? xr : wr)(t)) : this.node().innerHTML
}
function br() {
    this.nextSibling && this.parentNode.appendChild(this)
}
function Nr() {
    return this.each(br)
}
function Ar() {
    this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild)
}
function kr() {
    return this.each(Ar)
}
function Mr(t) {
    var e = typeof t == "function" ? t : ke(t);
    return this.select(function() {
        return this.appendChild(e.apply(this, arguments))
    })
}
function Er() {
    return null
}
function Cr(t, e) {
    var n = typeof t == "function" ? t : ke(t)
      , r = e == null ? Er : typeof e == "function" ? e : Bt(e);
    return this.select(function() {
        return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null)
    })
}
function Sr() {
    var t = this.parentNode;
    t && t.removeChild(this)
}
function $r() {
    return this.each(Sr)
}
function Tr() {
    var t = this.cloneNode(!1)
      , e = this.parentNode;
    return e ? e.insertBefore(t, this.nextSibling) : t
}
function Lr() {
    var t = this.cloneNode(!0)
      , e = this.parentNode;
    return e ? e.insertBefore(t, this.nextSibling) : t
}
function qr(t) {
    return this.select(t ? Lr : Tr)
}
function Ir(t) {
    return arguments.length ? this.property("__data__", t) : this.node().__data__
}
function Rr(t) {
    return function(e) {
        t.call(this, e, this.__data__)
    }
}
function Hr(t) {
    return t.trim().split(/^|\s+/).map(function(e) {
        var n = ""
          , r = e.indexOf(".");
        return r >= 0 && (n = e.slice(r + 1),
        e = e.slice(0, r)),
        {
            type: e,
            name: n
        }
    })
}
function Pr(t) {
    return function() {
        var e = this.__on;
        if (e) {
            for (var n = 0, r = -1, i = e.length, o; n < i; ++n)
                o = e[n],
                (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
            ++r ? e.length = r : delete this.__on
        }
    }
}
function Fr(t, e, n) {
    return function() {
        var r = this.__on, i, o = Rr(e);
        if (r) {
            for (var s = 0, a = r.length; s < a; ++s)
                if ((i = r[s]).type === t.type && i.name === t.name) {
                    this.removeEventListener(i.type, i.listener, i.options),
                    this.addEventListener(i.type, i.listener = o, i.options = n),
                    i.value = e;
                    return
                }
        }
        this.addEventListener(t.type, o, n),
        i = {
            type: t.type,
            name: t.name,
            value: e,
            listener: o,
            options: n
        },
        r ? r.push(i) : this.__on = [i]
    }
}
function Or(t, e, n) {
    var r = Hr(t + ""), i, o = r.length, s;
    if (arguments.length < 2) {
        var a = this.node().__on;
        if (a) {
            for (var u = 0, l = a.length, c; u < l; ++u)
                for (i = 0,
                c = a[u]; i < o; ++i)
                    if ((s = r[i]).type === c.type && s.name === c.name)
                        return c.value
        }
        return
    }
    for (a = e ? Fr : Pr,
    i = 0; i < o; ++i)
        this.each(a(r[i], e, n));
    return this
}
function Re(t, e, n) {
    var r = $e(t)
      , i = r.CustomEvent;
    typeof i == "function" ? i = new i(e,n) : (i = r.document.createEvent("Event"),
    n ? (i.initEvent(e, n.bubbles, n.cancelable),
    i.detail = n.detail) : i.initEvent(e, !1, !1)),
    t.dispatchEvent(i)
}
function Dr(t, e) {
    return function() {
        return Re(this, t, e)
    }
}
function zr(t, e) {
    return function() {
        return Re(this, t, e.apply(this, arguments))
    }
}
function Vr(t, e) {
    return this.each((typeof e == "function" ? zr : Dr)(t, e))
}
function *Xr() {
    for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
        for (var r = t[e], i = 0, o = r.length, s; i < o; ++i)
            (s = r[i]) && (yield s)
}
var He = [null];
function _(t, e) {
    this._groups = t,
    this._parents = e
}
function it() {
    return new _([[document.documentElement]],He)
}
function Br() {
    return this
}
_.prototype = it.prototype = {
    constructor: _,
    select: mn,
    selectAll: xn,
    selectChild: An,
    selectChildren: Cn,
    filter: Sn,
    data: Rn,
    enter: $n,
    exit: Pn,
    join: Fn,
    merge: On,
    selection: Br,
    order: Dn,
    sort: zn,
    call: Xn,
    nodes: Bn,
    node: Yn,
    size: Gn,
    empty: Zn,
    each: Qn,
    attr: er,
    style: or,
    property: ur,
    classed: dr,
    text: yr,
    html: _r,
    raise: Nr,
    lower: kr,
    append: Mr,
    insert: Cr,
    remove: $r,
    clone: qr,
    datum: Ir,
    on: Or,
    dispatch: Vr,
    [Symbol.iterator]: Xr
};
function Yr(t) {
    return typeof t == "string" ? new _([[document.querySelector(t)]],[document.documentElement]) : new _([[t]],He)
}
function Gr(t) {
    let e;
    for (; e = t.sourceEvent; )
        t = e;
    return t
}
function Zr(t, e) {
    if (t = Gr(t),
    e === void 0 && (e = t.currentTarget),
    e) {
        var n = e.ownerSVGElement || e;
        if (n.createSVGPoint) {
            var r = n.createSVGPoint();
            return r.x = t.clientX,
            r.y = t.clientY,
            r = r.matrixTransform(e.getScreenCTM().inverse()),
            [r.x, r.y]
        }
        if (e.getBoundingClientRect) {
            var i = e.getBoundingClientRect();
            return [t.clientX - i.left - e.clientLeft, t.clientY - i.top - e.clientTop]
        }
    }
    return [t.pageX, t.pageY]
}
function Gt(t, e, n) {
    t.prototype = e.prototype = n,
    n.constructor = t
}
function Pe(t, e) {
    var n = Object.create(t.prototype);
    for (var r in e)
        n[r] = e[r];
    return n
}
function ot() {}
var et = .7
  , wt = 1 / et
  , Q = "\\s*([+-]?\\d+)\\s*"
  , nt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*"
  , S = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*"
  , Qr = /^#([0-9a-f]{3,8})$/
  , Wr = new RegExp(`^rgb\\(${Q},${Q},${Q}\\)$`)
  , Kr = new RegExp(`^rgb\\(${S},${S},${S}\\)$`)
  , Ur = new RegExp(`^rgba\\(${Q},${Q},${Q},${nt}\\)$`)
  , Jr = new RegExp(`^rgba\\(${S},${S},${S},${nt}\\)$`)
  , jr = new RegExp(`^hsl\\(${nt},${S},${S}\\)$`)
  , ti = new RegExp(`^hsla\\(${nt},${S},${S},${nt}\\)$`)
  , re = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
};
Gt(ot, X, {
    copy(t) {
        return Object.assign(new this.constructor, this, t)
    },
    displayable() {
        return this.rgb().displayable()
    },
    hex: ie,
    formatHex: ie,
    formatHex8: ei,
    formatHsl: ni,
    formatRgb: oe,
    toString: oe
});
function ie() {
    return this.rgb().formatHex()
}
function ei() {
    return this.rgb().formatHex8()
}
function ni() {
    return Fe(this).formatHsl()
}
function oe() {
    return this.rgb().formatRgb()
}
function X(t) {
    var e, n;
    return t = (t + "").trim().toLowerCase(),
    (e = Qr.exec(t)) ? (n = e[1].length,
    e = parseInt(e[1], 16),
    n === 6 ? se(e) : n === 3 ? new x(e >> 8 & 15 | e >> 4 & 240,e >> 4 & 15 | e & 240,(e & 15) << 4 | e & 15,1) : n === 8 ? ut(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? ut(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Wr.exec(t)) ? new x(e[1],e[2],e[3],1) : (e = Kr.exec(t)) ? new x(e[1] * 255 / 100,e[2] * 255 / 100,e[3] * 255 / 100,1) : (e = Ur.exec(t)) ? ut(e[1], e[2], e[3], e[4]) : (e = Jr.exec(t)) ? ut(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = jr.exec(t)) ? ue(e[1], e[2] / 100, e[3] / 100, 1) : (e = ti.exec(t)) ? ue(e[1], e[2] / 100, e[3] / 100, e[4]) : re.hasOwnProperty(t) ? se(re[t]) : t === "transparent" ? new x(NaN,NaN,NaN,0) : null
}
function se(t) {
    return new x(t >> 16 & 255,t >> 8 & 255,t & 255,1)
}
function ut(t, e, n, r) {
    return r <= 0 && (t = e = n = NaN),
    new x(t,e,n,r)
}
function ri(t) {
    return t instanceof ot || (t = X(t)),
    t ? (t = t.rgb(),
    new x(t.r,t.g,t.b,t.opacity)) : new x
}
function Ht(t, e, n, r) {
    return arguments.length === 1 ? ri(t) : new x(t,e,n,r ?? 1)
}
function x(t, e, n, r) {
    this.r = +t,
    this.g = +e,
    this.b = +n,
    this.opacity = +r
}
Gt(x, Ht, Pe(ot, {
    brighter(t) {
        return t = t == null ? wt : Math.pow(wt, t),
        new x(this.r * t,this.g * t,this.b * t,this.opacity)
    },
    darker(t) {
        return t = t == null ? et : Math.pow(et, t),
        new x(this.r * t,this.g * t,this.b * t,this.opacity)
    },
    rgb() {
        return this
    },
    clamp() {
        return new x(V(this.r),V(this.g),V(this.b),xt(this.opacity))
    },
    displayable() {
        return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1
    },
    hex: ae,
    formatHex: ae,
    formatHex8: ii,
    formatRgb: le,
    toString: le
}));
function ae() {
    return `#${D(this.r)}${D(this.g)}${D(this.b)}`
}
function ii() {
    return `#${D(this.r)}${D(this.g)}${D(this.b)}${D((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`
}
function le() {
    const t = xt(this.opacity);
    return `${t === 1 ? "rgb(" : "rgba("}${V(this.r)}, ${V(this.g)}, ${V(this.b)}${t === 1 ? ")" : `, ${t})`}`
}
function xt(t) {
    return isNaN(t) ? 1 : Math.max(0, Math.min(1, t))
}
function V(t) {
    return Math.max(0, Math.min(255, Math.round(t) || 0))
}
function D(t) {
    return t = V(t),
    (t < 16 ? "0" : "") + t.toString(16)
}
function ue(t, e, n, r) {
    return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN),
    new M(t,e,n,r)
}
function Fe(t) {
    if (t instanceof M)
        return new M(t.h,t.s,t.l,t.opacity);
    if (t instanceof ot || (t = X(t)),
    !t)
        return new M;
    if (t instanceof M)
        return t;
    t = t.rgb();
    var e = t.r / 255
      , n = t.g / 255
      , r = t.b / 255
      , i = Math.min(e, n, r)
      , o = Math.max(e, n, r)
      , s = NaN
      , a = o - i
      , u = (o + i) / 2;
    return a ? (e === o ? s = (n - r) / a + (n < r) * 6 : n === o ? s = (r - e) / a + 2 : s = (e - n) / a + 4,
    a /= u < .5 ? o + i : 2 - o - i,
    s *= 60) : a = u > 0 && u < 1 ? 0 : s,
    new M(s,a,u,t.opacity)
}
function oi(t, e, n, r) {
    return arguments.length === 1 ? Fe(t) : new M(t,e,n,r ?? 1)
}
function M(t, e, n, r) {
    this.h = +t,
    this.s = +e,
    this.l = +n,
    this.opacity = +r
}
Gt(M, oi, Pe(ot, {
    brighter(t) {
        return t = t == null ? wt : Math.pow(wt, t),
        new M(this.h,this.s,this.l * t,this.opacity)
    },
    darker(t) {
        return t = t == null ? et : Math.pow(et, t),
        new M(this.h,this.s,this.l * t,this.opacity)
    },
    rgb() {
        var t = this.h % 360 + (this.h < 0) * 360
          , e = isNaN(t) || isNaN(this.s) ? 0 : this.s
          , n = this.l
          , r = n + (n < .5 ? n : 1 - n) * e
          , i = 2 * n - r;
        return new x($t(t >= 240 ? t - 240 : t + 120, i, r),$t(t, i, r),$t(t < 120 ? t + 240 : t - 120, i, r),this.opacity)
    },
    clamp() {
        return new M(ce(this.h),ct(this.s),ct(this.l),xt(this.opacity))
    },
    displayable() {
        return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1
    },
    formatHsl() {
        const t = xt(this.opacity);
        return `${t === 1 ? "hsl(" : "hsla("}${ce(this.h)}, ${ct(this.s) * 100}%, ${ct(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`
    }
}));
function ce(t) {
    return t = (t || 0) % 360,
    t < 0 ? t + 360 : t
}
function ct(t) {
    return Math.max(0, Math.min(1, t || 0))
}
function $t(t, e, n) {
    return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255
}
const Zt = t=>()=>t;
function si(t, e) {
    return function(n) {
        return t + n * e
    }
}
function ai(t, e, n) {
    return t = Math.pow(t, n),
    e = Math.pow(e, n) - t,
    n = 1 / n,
    function(r) {
        return Math.pow(t + r * e, n)
    }
}
function li(t) {
    return (t = +t) == 1 ? Oe : function(e, n) {
        return n - e ? ai(e, n, t) : Zt(isNaN(e) ? n : e)
    }
}
function Oe(t, e) {
    var n = e - t;
    return n ? si(t, n) : Zt(isNaN(t) ? e : t)
}
const _t = function t(e) {
    var n = li(e);
    function r(i, o) {
        var s = n((i = Ht(i)).r, (o = Ht(o)).r)
          , a = n(i.g, o.g)
          , u = n(i.b, o.b)
          , l = Oe(i.opacity, o.opacity);
        return function(c) {
            return i.r = s(c),
            i.g = a(c),
            i.b = u(c),
            i.opacity = l(c),
            i + ""
        }
    }
    return r.gamma = t,
    r
}(1);
function ui(t, e) {
    e || (e = []);
    var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
    return function(o) {
        for (i = 0; i < n; ++i)
            r[i] = t[i] * (1 - o) + e[i] * o;
        return r
    }
}
function ci(t) {
    return ArrayBuffer.isView(t) && !(t instanceof DataView)
}
function fi(t, e) {
    var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), o = new Array(n), s;
    for (s = 0; s < r; ++s)
        i[s] = Qt(t[s], e[s]);
    for (; s < n; ++s)
        o[s] = e[s];
    return function(a) {
        for (s = 0; s < r; ++s)
            o[s] = i[s](a);
        return o
    }
}
function hi(t, e) {
    var n = new Date;
    return t = +t,
    e = +e,
    function(r) {
        return n.setTime(t * (1 - r) + e * r),
        n
    }
}
function k(t, e) {
    return t = +t,
    e = +e,
    function(n) {
        return t * (1 - n) + e * n
    }
}
function di(t, e) {
    var n = {}, r = {}, i;
    (t === null || typeof t != "object") && (t = {}),
    (e === null || typeof e != "object") && (e = {});
    for (i in e)
        i in t ? n[i] = Qt(t[i], e[i]) : r[i] = e[i];
    return function(o) {
        for (i in n)
            r[i] = n[i](o);
        return r
    }
}
var Pt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g
  , Tt = new RegExp(Pt.source,"g");
function pi(t) {
    return function() {
        return t
    }
}
function gi(t) {
    return function(e) {
        return t(e) + ""
    }
}
function De(t, e) {
    var n = Pt.lastIndex = Tt.lastIndex = 0, r, i, o, s = -1, a = [], u = [];
    for (t = t + "",
    e = e + ""; (r = Pt.exec(t)) && (i = Tt.exec(e)); )
        (o = i.index) > n && (o = e.slice(n, o),
        a[s] ? a[s] += o : a[++s] = o),
        (r = r[0]) === (i = i[0]) ? a[s] ? a[s] += i : a[++s] = i : (a[++s] = null,
        u.push({
            i: s,
            x: k(r, i)
        })),
        n = Tt.lastIndex;
    return n < e.length && (o = e.slice(n),
    a[s] ? a[s] += o : a[++s] = o),
    a.length < 2 ? u[0] ? gi(u[0].x) : pi(e) : (e = u.length,
    function(l) {
        for (var c = 0, f; c < e; ++c)
            a[(f = u[c]).i] = f.x(l);
        return a.join("")
    }
    )
}
function Qt(t, e) {
    var n = typeof e, r;
    return e == null || n === "boolean" ? Zt(e) : (n === "number" ? k : n === "string" ? (r = X(e)) ? (e = r,
    _t) : De : e instanceof X ? _t : e instanceof Date ? hi : ci(e) ? ui : Array.isArray(e) ? fi : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? di : k)(t, e)
}
function mi(t, e) {
    return t = +t,
    e = +e,
    function(n) {
        return Math.round(t * (1 - n) + e * n)
    }
}
var fe = 180 / Math.PI
  , Ft = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1
};
function ze(t, e, n, r, i, o) {
    var s, a, u;
    return (s = Math.sqrt(t * t + e * e)) && (t /= s,
    e /= s),
    (u = t * n + e * r) && (n -= t * u,
    r -= e * u),
    (a = Math.sqrt(n * n + r * r)) && (n /= a,
    r /= a,
    u /= a),
    t * r < e * n && (t = -t,
    e = -e,
    u = -u,
    s = -s),
    {
        translateX: i,
        translateY: o,
        rotate: Math.atan2(e, t) * fe,
        skewX: Math.atan(u) * fe,
        scaleX: s,
        scaleY: a
    }
}
var ft;
function yi(t) {
    const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
    return e.isIdentity ? Ft : ze(e.a, e.b, e.c, e.d, e.e, e.f)
}
function vi(t) {
    return t == null || (ft || (ft = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    ft.setAttribute("transform", t),
    !(t = ft.transform.baseVal.consolidate())) ? Ft : (t = t.matrix,
    ze(t.a, t.b, t.c, t.d, t.e, t.f))
}
function Ve(t, e, n, r) {
    function i(l) {
        return l.length ? l.pop() + " " : ""
    }
    function o(l, c, f, h, d, p) {
        if (l !== f || c !== h) {
            var y = d.push("translate(", null, e, null, n);
            p.push({
                i: y - 4,
                x: k(l, f)
            }, {
                i: y - 2,
                x: k(c, h)
            })
        } else
            (f || h) && d.push("translate(" + f + e + h + n)
    }
    function s(l, c, f, h) {
        l !== c ? (l - c > 180 ? c += 360 : c - l > 180 && (l += 360),
        h.push({
            i: f.push(i(f) + "rotate(", null, r) - 2,
            x: k(l, c)
        })) : c && f.push(i(f) + "rotate(" + c + r)
    }
    function a(l, c, f, h) {
        l !== c ? h.push({
            i: f.push(i(f) + "skewX(", null, r) - 2,
            x: k(l, c)
        }) : c && f.push(i(f) + "skewX(" + c + r)
    }
    function u(l, c, f, h, d, p) {
        if (l !== f || c !== h) {
            var y = d.push(i(d) + "scale(", null, ",", null, ")");
            p.push({
                i: y - 4,
                x: k(l, f)
            }, {
                i: y - 2,
                x: k(c, h)
            })
        } else
            (f !== 1 || h !== 1) && d.push(i(d) + "scale(" + f + "," + h + ")")
    }
    return function(l, c) {
        var f = []
          , h = [];
        return l = t(l),
        c = t(c),
        o(l.translateX, l.translateY, c.translateX, c.translateY, f, h),
        s(l.rotate, c.rotate, f, h),
        a(l.skewX, c.skewX, f, h),
        u(l.scaleX, l.scaleY, c.scaleX, c.scaleY, f, h),
        l = c = null,
        function(d) {
            for (var p = -1, y = h.length, v; ++p < y; )
                f[(v = h[p]).i] = v.x(d);
            return f.join("")
        }
    }
}
var wi = Ve(yi, "px, ", "px)", "deg)"), xi = Ve(vi, ", ", ")", ")"), K = 0, j = 0, J = 0, Xe = 1e3, bt, tt, Nt = 0, B = 0, Ct = 0, rt = typeof performance == "object" && performance.now ? performance : Date, Be = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
    setTimeout(t, 17)
}
;
function Wt() {
    return B || (Be(_i),
    B = rt.now() + Ct)
}
function _i() {
    B = 0
}
function At() {
    this._call = this._time = this._next = null
}
At.prototype = Ye.prototype = {
    constructor: At,
    restart: function(t, e, n) {
        if (typeof t != "function")
            throw new TypeError("callback is not a function");
        n = (n == null ? Wt() : +n) + (e == null ? 0 : +e),
        !this._next && tt !== this && (tt ? tt._next = this : bt = this,
        tt = this),
        this._call = t,
        this._time = n,
        Ot()
    },
    stop: function() {
        this._call && (this._call = null,
        this._time = 1 / 0,
        Ot())
    }
};
function Ye(t, e, n) {
    var r = new At;
    return r.restart(t, e, n),
    r
}
function bi() {
    Wt(),
    ++K;
    for (var t = bt, e; t; )
        (e = B - t._time) >= 0 && t._call.call(void 0, e),
        t = t._next;
    --K
}
function he() {
    B = (Nt = rt.now()) + Ct,
    K = j = 0;
    try {
        bi()
    } finally {
        K = 0,
        Ai(),
        B = 0
    }
}
function Ni() {
    var t = rt.now()
      , e = t - Nt;
    e > Xe && (Ct -= e,
    Nt = t)
}
function Ai() {
    for (var t, e = bt, n, r = 1 / 0; e; )
        e._call ? (r > e._time && (r = e._time),
        t = e,
        e = e._next) : (n = e._next,
        e._next = null,
        e = t ? t._next = n : bt = n);
    tt = t,
    Ot(r)
}
function Ot(t) {
    if (!K) {
        j && (j = clearTimeout(j));
        var e = t - B;
        e > 24 ? (t < 1 / 0 && (j = setTimeout(he, t - rt.now() - Ct)),
        J && (J = clearInterval(J))) : (J || (Nt = rt.now(),
        J = setInterval(Ni, Xe)),
        K = 1,
        Be(he))
    }
}
function de(t, e, n) {
    var r = new At;
    return e = e == null ? 0 : +e,
    r.restart(i=>{
        r.stop(),
        t(i + e)
    }
    , e, n),
    r
}
var ki = Ae("start", "end", "cancel", "interrupt")
  , Mi = []
  , Ge = 0
  , pe = 1
  , Dt = 2
  , mt = 3
  , ge = 4
  , zt = 5
  , yt = 6;
function St(t, e, n, r, i, o) {
    var s = t.__transition;
    if (!s)
        t.__transition = {};
    else if (n in s)
        return;
    Ei(t, n, {
        name: e,
        index: r,
        group: i,
        on: ki,
        tween: Mi,
        time: o.time,
        delay: o.delay,
        duration: o.duration,
        ease: o.ease,
        timer: null,
        state: Ge
    })
}
function Kt(t, e) {
    var n = E(t, e);
    if (n.state > Ge)
        throw new Error("too late; already scheduled");
    return n
}
function $(t, e) {
    var n = E(t, e);
    if (n.state > mt)
        throw new Error("too late; already running");
    return n
}
function E(t, e) {
    var n = t.__transition;
    if (!n || !(n = n[e]))
        throw new Error("transition not found");
    return n
}
function Ei(t, e, n) {
    var r = t.__transition, i;
    r[e] = n,
    n.timer = Ye(o, 0, n.time);
    function o(l) {
        n.state = pe,
        n.timer.restart(s, n.delay, n.time),
        n.delay <= l && s(l - n.delay)
    }
    function s(l) {
        var c, f, h, d;
        if (n.state !== pe)
            return u();
        for (c in r)
            if (d = r[c],
            d.name === n.name) {
                if (d.state === mt)
                    return de(s);
                d.state === ge ? (d.state = yt,
                d.timer.stop(),
                d.on.call("interrupt", t, t.__data__, d.index, d.group),
                delete r[c]) : +c < e && (d.state = yt,
                d.timer.stop(),
                d.on.call("cancel", t, t.__data__, d.index, d.group),
                delete r[c])
            }
        if (de(function() {
            n.state === mt && (n.state = ge,
            n.timer.restart(a, n.delay, n.time),
            a(l))
        }),
        n.state = Dt,
        n.on.call("start", t, t.__data__, n.index, n.group),
        n.state === Dt) {
            for (n.state = mt,
            i = new Array(h = n.tween.length),
            c = 0,
            f = -1; c < h; ++c)
                (d = n.tween[c].value.call(t, t.__data__, n.index, n.group)) && (i[++f] = d);
            i.length = f + 1
        }
    }
    function a(l) {
        for (var c = l < n.duration ? n.ease.call(null, l / n.duration) : (n.timer.restart(u),
        n.state = zt,
        1), f = -1, h = i.length; ++f < h; )
            i[f].call(t, c);
        n.state === zt && (n.on.call("end", t, t.__data__, n.index, n.group),
        u())
    }
    function u() {
        n.state = yt,
        n.timer.stop(),
        delete r[e];
        for (var l in r)
            return;
        delete t.__transition
    }
}
function Ci(t, e) {
    var n = t.__transition, r, i, o = !0, s;
    if (n) {
        e = e == null ? null : e + "";
        for (s in n) {
            if ((r = n[s]).name !== e) {
                o = !1;
                continue
            }
            i = r.state > Dt && r.state < zt,
            r.state = yt,
            r.timer.stop(),
            r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group),
            delete n[s]
        }
        o && delete t.__transition
    }
}
function Si(t) {
    return this.each(function() {
        Ci(this, t)
    })
}
function $i(t, e) {
    var n, r;
    return function() {
        var i = $(this, t)
          , o = i.tween;
        if (o !== n) {
            r = n = o;
            for (var s = 0, a = r.length; s < a; ++s)
                if (r[s].name === e) {
                    r = r.slice(),
                    r.splice(s, 1);
                    break
                }
        }
        i.tween = r
    }
}
function Ti(t, e, n) {
    var r, i;
    if (typeof n != "function")
        throw new Error;
    return function() {
        var o = $(this, t)
          , s = o.tween;
        if (s !== r) {
            i = (r = s).slice();
            for (var a = {
                name: e,
                value: n
            }, u = 0, l = i.length; u < l; ++u)
                if (i[u].name === e) {
                    i[u] = a;
                    break
                }
            u === l && i.push(a)
        }
        o.tween = i
    }
}
function Li(t, e) {
    var n = this._id;
    if (t += "",
    arguments.length < 2) {
        for (var r = E(this.node(), n).tween, i = 0, o = r.length, s; i < o; ++i)
            if ((s = r[i]).name === t)
                return s.value;
        return null
    }
    return this.each((e == null ? $i : Ti)(n, t, e))
}
function Ut(t, e, n) {
    var r = t._id;
    return t.each(function() {
        var i = $(this, r);
        (i.value || (i.value = {}))[e] = n.apply(this, arguments)
    }),
    function(i) {
        return E(i, r).value[e]
    }
}
function Ze(t, e) {
    var n;
    return (typeof e == "number" ? k : e instanceof X ? _t : (n = X(e)) ? (e = n,
    _t) : De)(t, e)
}
function qi(t) {
    return function() {
        this.removeAttribute(t)
    }
}
function Ii(t) {
    return function() {
        this.removeAttributeNS(t.space, t.local)
    }
}
function Ri(t, e, n) {
    var r, i = n + "", o;
    return function() {
        var s = this.getAttribute(t);
        return s === i ? null : s === r ? o : o = e(r = s, n)
    }
}
function Hi(t, e, n) {
    var r, i = n + "", o;
    return function() {
        var s = this.getAttributeNS(t.space, t.local);
        return s === i ? null : s === r ? o : o = e(r = s, n)
    }
}
function Pi(t, e, n) {
    var r, i, o;
    return function() {
        var s, a = n(this), u;
        return a == null ? void this.removeAttribute(t) : (s = this.getAttribute(t),
        u = a + "",
        s === u ? null : s === r && u === i ? o : (i = u,
        o = e(r = s, a)))
    }
}
function Fi(t, e, n) {
    var r, i, o;
    return function() {
        var s, a = n(this), u;
        return a == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local),
        u = a + "",
        s === u ? null : s === r && u === i ? o : (i = u,
        o = e(r = s, a)))
    }
}
function Oi(t, e) {
    var n = Et(t)
      , r = n === "transform" ? xi : Ze;
    return this.attrTween(t, typeof e == "function" ? (n.local ? Fi : Pi)(n, r, Ut(this, "attr." + t, e)) : e == null ? (n.local ? Ii : qi)(n) : (n.local ? Hi : Ri)(n, r, e))
}
function Di(t, e) {
    return function(n) {
        this.setAttribute(t, e.call(this, n))
    }
}
function zi(t, e) {
    return function(n) {
        this.setAttributeNS(t.space, t.local, e.call(this, n))
    }
}
function Vi(t, e) {
    var n, r;
    function i() {
        var o = e.apply(this, arguments);
        return o !== r && (n = (r = o) && zi(t, o)),
        n
    }
    return i._value = e,
    i
}
function Xi(t, e) {
    var n, r;
    function i() {
        var o = e.apply(this, arguments);
        return o !== r && (n = (r = o) && Di(t, o)),
        n
    }
    return i._value = e,
    i
}
function Bi(t, e) {
    var n = "attr." + t;
    if (arguments.length < 2)
        return (n = this.tween(n)) && n._value;
    if (e == null)
        return this.tween(n, null);
    if (typeof e != "function")
        throw new Error;
    var r = Et(t);
    return this.tween(n, (r.local ? Vi : Xi)(r, e))
}
function Yi(t, e) {
    return function() {
        Kt(this, t).delay = +e.apply(this, arguments)
    }
}
function Gi(t, e) {
    return e = +e,
    function() {
        Kt(this, t).delay = e
    }
}
function Zi(t) {
    var e = this._id;
    return arguments.length ? this.each((typeof t == "function" ? Yi : Gi)(e, t)) : E(this.node(), e).delay
}
function Qi(t, e) {
    return function() {
        $(this, t).duration = +e.apply(this, arguments)
    }
}
function Wi(t, e) {
    return e = +e,
    function() {
        $(this, t).duration = e
    }
}
function Ki(t) {
    var e = this._id;
    return arguments.length ? this.each((typeof t == "function" ? Qi : Wi)(e, t)) : E(this.node(), e).duration
}
function Ui(t, e) {
    if (typeof e != "function")
        throw new Error;
    return function() {
        $(this, t).ease = e
    }
}
function Ji(t) {
    var e = this._id;
    return arguments.length ? this.each(Ui(e, t)) : E(this.node(), e).ease
}
function ji(t, e) {
    return function() {
        var n = e.apply(this, arguments);
        if (typeof n != "function")
            throw new Error;
        $(this, t).ease = n
    }
}
function to(t) {
    if (typeof t != "function")
        throw new Error;
    return this.each(ji(this._id, t))
}
function eo(t) {
    typeof t != "function" && (t = Ee(t));
    for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
        for (var o = e[i], s = o.length, a = r[i] = [], u, l = 0; l < s; ++l)
            (u = o[l]) && t.call(u, u.__data__, l, o) && a.push(u);
    return new I(r,this._parents,this._name,this._id)
}
function no(t) {
    if (t._id !== this._id)
        throw new Error;
    for (var e = this._groups, n = t._groups, r = e.length, i = n.length, o = Math.min(r, i), s = new Array(r), a = 0; a < o; ++a)
        for (var u = e[a], l = n[a], c = u.length, f = s[a] = new Array(c), h, d = 0; d < c; ++d)
            (h = u[d] || l[d]) && (f[d] = h);
    for (; a < r; ++a)
        s[a] = e[a];
    return new I(s,this._parents,this._name,this._id)
}
function ro(t) {
    return (t + "").trim().split(/^|\s+/).every(function(e) {
        var n = e.indexOf(".");
        return n >= 0 && (e = e.slice(0, n)),
        !e || e === "start"
    })
}
function io(t, e, n) {
    var r, i, o = ro(e) ? Kt : $;
    return function() {
        var s = o(this, t)
          , a = s.on;
        a !== r && (i = (r = a).copy()).on(e, n),
        s.on = i
    }
}
function oo(t, e) {
    var n = this._id;
    return arguments.length < 2 ? E(this.node(), n).on.on(t) : this.each(io(n, t, e))
}
function so(t) {
    return function() {
        var e = this.parentNode;
        for (var n in this.__transition)
            if (+n !== t)
                return;
        e && e.removeChild(this)
    }
}
function ao() {
    return this.on("end.remove", so(this._id))
}
function lo(t) {
    var e = this._name
      , n = this._id;
    typeof t != "function" && (t = Bt(t));
    for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
        for (var a = r[s], u = a.length, l = o[s] = new Array(u), c, f, h = 0; h < u; ++h)
            (c = a[h]) && (f = t.call(c, c.__data__, h, a)) && ("__data__"in c && (f.__data__ = c.__data__),
            l[h] = f,
            St(l[h], e, n, h, l, E(c, n)));
    return new I(o,this._parents,e,n)
}
function uo(t) {
    var e = this._name
      , n = this._id;
    typeof t != "function" && (t = Me(t));
    for (var r = this._groups, i = r.length, o = [], s = [], a = 0; a < i; ++a)
        for (var u = r[a], l = u.length, c, f = 0; f < l; ++f)
            if (c = u[f]) {
                for (var h = t.call(c, c.__data__, f, u), d, p = E(c, n), y = 0, v = h.length; y < v; ++y)
                    (d = h[y]) && St(d, e, n, y, h, p);
                o.push(h),
                s.push(c)
            }
    return new I(o,s,e,n)
}
var co = it.prototype.constructor;
function fo() {
    return new co(this._groups,this._parents)
}
function ho(t, e) {
    var n, r, i;
    return function() {
        var o = W(this, t)
          , s = (this.style.removeProperty(t),
        W(this, t));
        return o === s ? null : o === n && s === r ? i : i = e(n = o, r = s)
    }
}
function Qe(t) {
    return function() {
        this.style.removeProperty(t)
    }
}
function po(t, e, n) {
    var r, i = n + "", o;
    return function() {
        var s = W(this, t);
        return s === i ? null : s === r ? o : o = e(r = s, n)
    }
}
function go(t, e, n) {
    var r, i, o;
    return function() {
        var s = W(this, t)
          , a = n(this)
          , u = a + "";
        return a == null && (u = a = (this.style.removeProperty(t),
        W(this, t))),
        s === u ? null : s === r && u === i ? o : (i = u,
        o = e(r = s, a))
    }
}
function mo(t, e) {
    var n, r, i, o = "style." + e, s = "end." + o, a;
    return function() {
        var u = $(this, t)
          , l = u.on
          , c = u.value[o] == null ? a || (a = Qe(e)) : void 0;
        (l !== n || i !== c) && (r = (n = l).copy()).on(s, i = c),
        u.on = r
    }
}
function yo(t, e, n) {
    var r = (t += "") == "transform" ? wi : Ze;
    return e == null ? this.styleTween(t, ho(t, r)).on("end.style." + t, Qe(t)) : typeof e == "function" ? this.styleTween(t, go(t, r, Ut(this, "style." + t, e))).each(mo(this._id, t)) : this.styleTween(t, po(t, r, e), n).on("end.style." + t, null)
}
function vo(t, e, n) {
    return function(r) {
        this.style.setProperty(t, e.call(this, r), n)
    }
}
function wo(t, e, n) {
    var r, i;
    function o() {
        var s = e.apply(this, arguments);
        return s !== i && (r = (i = s) && vo(t, s, n)),
        r
    }
    return o._value = e,
    o
}
function xo(t, e, n) {
    var r = "style." + (t += "");
    if (arguments.length < 2)
        return (r = this.tween(r)) && r._value;
    if (e == null)
        return this.tween(r, null);
    if (typeof e != "function")
        throw new Error;
    return this.tween(r, wo(t, e, n ?? ""))
}
function _o(t) {
    return function() {
        this.textContent = t
    }
}
function bo(t) {
    return function() {
        var e = t(this);
        this.textContent = e ?? ""
    }
}
function No(t) {
    return this.tween("text", typeof t == "function" ? bo(Ut(this, "text", t)) : _o(t == null ? "" : t + ""))
}
function Ao(t) {
    return function(e) {
        this.textContent = t.call(this, e)
    }
}
function ko(t) {
    var e, n;
    function r() {
        var i = t.apply(this, arguments);
        return i !== n && (e = (n = i) && Ao(i)),
        e
    }
    return r._value = t,
    r
}
function Mo(t) {
    var e = "text";
    if (arguments.length < 1)
        return (e = this.tween(e)) && e._value;
    if (t == null)
        return this.tween(e, null);
    if (typeof t != "function")
        throw new Error;
    return this.tween(e, ko(t))
}
function Eo() {
    for (var t = this._name, e = this._id, n = We(), r = this._groups, i = r.length, o = 0; o < i; ++o)
        for (var s = r[o], a = s.length, u, l = 0; l < a; ++l)
            if (u = s[l]) {
                var c = E(u, e);
                St(u, t, n, l, s, {
                    time: c.time + c.delay + c.duration,
                    delay: 0,
                    duration: c.duration,
                    ease: c.ease
                })
            }
    return new I(r,this._parents,t,n)
}
function Co() {
    var t, e, n = this, r = n._id, i = n.size();
    return new Promise(function(o, s) {
        var a = {
            value: s
        }
          , u = {
            value: function() {
                --i === 0 && o()
            }
        };
        n.each(function() {
            var l = $(this, r)
              , c = l.on;
            c !== t && (e = (t = c).copy(),
            e._.cancel.push(a),
            e._.interrupt.push(a),
            e._.end.push(u)),
            l.on = e
        }),
        i === 0 && o()
    }
    )
}
var So = 0;
function I(t, e, n, r) {
    this._groups = t,
    this._parents = e,
    this._name = n,
    this._id = r
}
function We() {
    return ++So
}
var q = it.prototype;
I.prototype = {
    constructor: I,
    select: lo,
    selectAll: uo,
    selectChild: q.selectChild,
    selectChildren: q.selectChildren,
    filter: eo,
    merge: no,
    selection: fo,
    transition: Eo,
    call: q.call,
    nodes: q.nodes,
    node: q.node,
    size: q.size,
    empty: q.empty,
    each: q.each,
    on: oo,
    attr: Oi,
    attrTween: Bi,
    style: yo,
    styleTween: xo,
    text: No,
    textTween: Mo,
    remove: ao,
    tween: Li,
    delay: Zi,
    duration: Ki,
    ease: Ji,
    easeVarying: to,
    end: Co,
    [Symbol.iterator]: q[Symbol.iterator]
};
function $o(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2
}
var To = {
    time: null,
    delay: 0,
    duration: 250,
    ease: $o
};
function Lo(t, e) {
    for (var n; !(n = t.__transition) || !(n = n[e]); )
        if (!(t = t.parentNode))
            throw new Error(`transition ${e} not found`);
    return n
}
function qo(t) {
    var e, n;
    t instanceof I ? (e = t._id,
    t = t._name) : (e = We(),
    (n = To).time = Wt(),
    t = t == null ? null : t + "");
    for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
        for (var s = r[o], a = s.length, u, l = 0; l < a; ++l)
            (u = s[l]) && St(u, t, e, l, s, n || Lo(u, e));
    return new I(r,this._parents,t,e)
}
it.prototype.interrupt = Si;
it.prototype.transition = qo;
function Io(t) {
    return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10)
}
function kt(t, e) {
    if ((n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0)
        return null;
    var n, r = t.slice(0, n);
    return [r.length > 1 ? r[0] + r.slice(2) : r, +t.slice(n + 1)]
}
function U(t) {
    return t = kt(Math.abs(t)),
    t ? t[1] : NaN
}
function Ro(t, e) {
    return function(n, r) {
        for (var i = n.length, o = [], s = 0, a = t[0], u = 0; i > 0 && a > 0 && (u + a + 1 > r && (a = Math.max(1, r - u)),
        o.push(n.substring(i -= a, i + a)),
        !((u += a + 1) > r)); )
            a = t[s = (s + 1) % t.length];
        return o.reverse().join(e)
    }
}
function Ho(t) {
    return function(e) {
        return e.replace(/[0-9]/g, function(n) {
            return t[+n]
        })
    }
}
var Po = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Mt(t) {
    if (!(e = Po.exec(t)))
        throw new Error("invalid format: " + t);
    var e;
    return new Jt({
        fill: e[1],
        align: e[2],
        sign: e[3],
        symbol: e[4],
        zero: e[5],
        width: e[6],
        comma: e[7],
        precision: e[8] && e[8].slice(1),
        trim: e[9],
        type: e[10]
    })
}
Mt.prototype = Jt.prototype;
function Jt(t) {
    this.fill = t.fill === void 0 ? " " : t.fill + "",
    this.align = t.align === void 0 ? ">" : t.align + "",
    this.sign = t.sign === void 0 ? "-" : t.sign + "",
    this.symbol = t.symbol === void 0 ? "" : t.symbol + "",
    this.zero = !!t.zero,
    this.width = t.width === void 0 ? void 0 : +t.width,
    this.comma = !!t.comma,
    this.precision = t.precision === void 0 ? void 0 : +t.precision,
    this.trim = !!t.trim,
    this.type = t.type === void 0 ? "" : t.type + ""
}
Jt.prototype.toString = function() {
    return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type
}
;
function Fo(t) {
    t: for (var e = t.length, n = 1, r = -1, i; n < e; ++n)
        switch (t[n]) {
        case ".":
            r = i = n;
            break;
        case "0":
            r === 0 && (r = n),
            i = n;
            break;
        default:
            if (!+t[n])
                break t;
            r > 0 && (r = 0);
            break
        }
    return r > 0 ? t.slice(0, r) + t.slice(i + 1) : t
}
var Ke;
function Oo(t, e) {
    var n = kt(t, e);
    if (!n)
        return t + "";
    var r = n[0]
      , i = n[1]
      , o = i - (Ke = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1
      , s = r.length;
    return o === s ? r : o > s ? r + new Array(o - s + 1).join("0") : o > 0 ? r.slice(0, o) + "." + r.slice(o) : "0." + new Array(1 - o).join("0") + kt(t, Math.max(0, e + o - 1))[0]
}
function me(t, e) {
    var n = kt(t, e);
    if (!n)
        return t + "";
    var r = n[0]
      , i = n[1];
    return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0")
}
const ye = {
    "%": (t,e)=>(t * 100).toFixed(e),
    b: t=>Math.round(t).toString(2),
    c: t=>t + "",
    d: Io,
    e: (t,e)=>t.toExponential(e),
    f: (t,e)=>t.toFixed(e),
    g: (t,e)=>t.toPrecision(e),
    o: t=>Math.round(t).toString(8),
    p: (t,e)=>me(t * 100, e),
    r: me,
    s: Oo,
    X: t=>Math.round(t).toString(16).toUpperCase(),
    x: t=>Math.round(t).toString(16)
};
function ve(t) {
    return t
}
var we = Array.prototype.map
  , xe = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function Do(t) {
    var e = t.grouping === void 0 || t.thousands === void 0 ? ve : Ro(we.call(t.grouping, Number), t.thousands + "")
      , n = t.currency === void 0 ? "" : t.currency[0] + ""
      , r = t.currency === void 0 ? "" : t.currency[1] + ""
      , i = t.decimal === void 0 ? "." : t.decimal + ""
      , o = t.numerals === void 0 ? ve : Ho(we.call(t.numerals, String))
      , s = t.percent === void 0 ? "%" : t.percent + ""
      , a = t.minus === void 0 ? "−" : t.minus + ""
      , u = t.nan === void 0 ? "NaN" : t.nan + "";
    function l(f) {
        f = Mt(f);
        var h = f.fill
          , d = f.align
          , p = f.sign
          , y = f.symbol
          , v = f.zero
          , T = f.width
          , b = f.comma
          , w = f.precision
          , R = f.trim
          , g = f.type;
        g === "n" ? (b = !0,
        g = "g") : ye[g] || (w === void 0 && (w = 12),
        R = !0,
        g = "g"),
        (v || h === "0" && d === "=") && (v = !0,
        h = "0",
        d = "=");
        var C = y === "$" ? n : y === "#" && /[boxX]/.test(g) ? "0" + g.toLowerCase() : ""
          , H = y === "$" ? r : /[%p]/.test(g) ? s : ""
          , A = ye[g]
          , F = /[defgprs%]/.test(g);
        w = w === void 0 ? 6 : /[gprs]/.test(g) ? Math.max(1, Math.min(21, w)) : Math.max(0, Math.min(20, w));
        function jt(m) {
            var O = C, N = H, Y, te, st;
            if (g === "c")
                N = A(m) + N,
                m = "";
            else {
                m = +m;
                var at = m < 0 || 1 / m < 0;
                if (m = isNaN(m) ? u : A(Math.abs(m), w),
                R && (m = Fo(m)),
                at && +m == 0 && p !== "+" && (at = !1),
                O = (at ? p === "(" ? p : a : p === "-" || p === "(" ? "" : p) + O,
                N = (g === "s" ? xe[8 + Ke / 3] : "") + N + (at && p === "(" ? ")" : ""),
                F) {
                    for (Y = -1,
                    te = m.length; ++Y < te; )
                        if (st = m.charCodeAt(Y),
                        48 > st || st > 57) {
                            N = (st === 46 ? i + m.slice(Y + 1) : m.slice(Y)) + N,
                            m = m.slice(0, Y);
                            break
                        }
                }
            }
            b && !v && (m = e(m, 1 / 0));
            var lt = O.length + m.length + N.length
              , L = lt < T ? new Array(T - lt + 1).join(h) : "";
            switch (b && v && (m = e(L + m, L.length ? T - N.length : 1 / 0),
            L = ""),
            d) {
            case "<":
                m = O + m + N + L;
                break;
            case "=":
                m = O + L + m + N;
                break;
            case "^":
                m = L.slice(0, lt = L.length >> 1) + O + m + N + L.slice(lt);
                break;
            default:
                m = L + O + m + N;
                break
            }
            return o(m)
        }
        return jt.toString = function() {
            return f + ""
        }
        ,
        jt
    }
    function c(f, h) {
        var d = l((f = Mt(f),
        f.type = "f",
        f))
          , p = Math.max(-8, Math.min(8, Math.floor(U(h) / 3))) * 3
          , y = Math.pow(10, -p)
          , v = xe[8 + p / 3];
        return function(T) {
            return d(y * T) + v
        }
    }
    return {
        format: l,
        formatPrefix: c
    }
}
var ht, Ue, Je;
zo({
    thousands: ",",
    grouping: [3],
    currency: ["$", ""]
});
function zo(t) {
    return ht = Do(t),
    Ue = ht.format,
    Je = ht.formatPrefix,
    ht
}
function Vo(t) {
    return Math.max(0, -U(Math.abs(t)))
}
function Xo(t, e) {
    return Math.max(0, Math.max(-8, Math.min(8, Math.floor(U(e) / 3))) * 3 - U(Math.abs(t)))
}
function Bo(t, e) {
    return t = Math.abs(t),
    e = Math.abs(e) - t,
    Math.max(0, U(e) - U(t)) + 1
}
function Yo(t, e) {
    switch (arguments.length) {
    case 0:
        break;
    case 1:
        this.range(t);
        break;
    default:
        this.range(e).domain(t);
        break
    }
    return this
}
function Go(t) {
    return function() {
        return t
    }
}
function Zo(t) {
    return +t
}
var _e = [0, 1];
function G(t) {
    return t
}
function Vt(t, e) {
    return (e -= t = +t) ? function(n) {
        return (n - t) / e
    }
    : Go(isNaN(e) ? NaN : .5)
}
function Qo(t, e) {
    var n;
    return t > e && (n = t,
    t = e,
    e = n),
    function(r) {
        return Math.max(t, Math.min(e, r))
    }
}
function Wo(t, e, n) {
    var r = t[0]
      , i = t[1]
      , o = e[0]
      , s = e[1];
    return i < r ? (r = Vt(i, r),
    o = n(s, o)) : (r = Vt(r, i),
    o = n(o, s)),
    function(a) {
        return o(r(a))
    }
}
function Ko(t, e, n) {
    var r = Math.min(t.length, e.length) - 1
      , i = new Array(r)
      , o = new Array(r)
      , s = -1;
    for (t[r] < t[0] && (t = t.slice().reverse(),
    e = e.slice().reverse()); ++s < r; )
        i[s] = Vt(t[s], t[s + 1]),
        o[s] = n(e[s], e[s + 1]);
    return function(a) {
        var u = an(t, a, 1, r) - 1;
        return o[u](i[u](a))
    }
}
function Uo(t, e) {
    return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown())
}
function Jo() {
    var t = _e, e = _e, n = Qt, r, i, o, s = G, a, u, l;
    function c() {
        var h = Math.min(t.length, e.length);
        return s !== G && (s = Qo(t[0], t[h - 1])),
        a = h > 2 ? Ko : Wo,
        u = l = null,
        f
    }
    function f(h) {
        return h == null || isNaN(h = +h) ? o : (u || (u = a(t.map(r), e, n)))(r(s(h)))
    }
    return f.invert = function(h) {
        return s(i((l || (l = a(e, t.map(r), k)))(h)))
    }
    ,
    f.domain = function(h) {
        return arguments.length ? (t = Array.from(h, Zo),
        c()) : t.slice()
    }
    ,
    f.range = function(h) {
        return arguments.length ? (e = Array.from(h),
        c()) : e.slice()
    }
    ,
    f.rangeRound = function(h) {
        return e = Array.from(h),
        n = mi,
        c()
    }
    ,
    f.clamp = function(h) {
        return arguments.length ? (s = h ? !0 : G,
        c()) : s !== G
    }
    ,
    f.interpolate = function(h) {
        return arguments.length ? (n = h,
        c()) : n
    }
    ,
    f.unknown = function(h) {
        return arguments.length ? (o = h,
        f) : o
    }
    ,
    function(h, d) {
        return r = h,
        i = d,
        c()
    }
}
function jo() {
    return Jo()(G, G)
}
function ts(t, e, n, r) {
    var i = un(t, e, n), o;
    switch (r = Mt(r ?? ",f"),
    r.type) {
    case "s":
        {
            var s = Math.max(Math.abs(t), Math.abs(e));
            return r.precision == null && !isNaN(o = Xo(i, s)) && (r.precision = o),
            Je(r, s)
        }
    case "":
    case "e":
    case "g":
    case "p":
    case "r":
        {
            r.precision == null && !isNaN(o = Bo(i, Math.max(Math.abs(t), Math.abs(e)))) && (r.precision = o - (r.type === "e"));
            break
        }
    case "f":
    case "%":
        {
            r.precision == null && !isNaN(o = Vo(i)) && (r.precision = o - (r.type === "%") * 2);
            break
        }
    }
    return Ue(r)
}
function es(t) {
    var e = t.domain;
    return t.ticks = function(n) {
        var r = e();
        return ln(r[0], r[r.length - 1], n ?? 10)
    }
    ,
    t.tickFormat = function(n, r) {
        var i = e();
        return ts(i[0], i[i.length - 1], n ?? 10, r)
    }
    ,
    t.nice = function(n) {
        n == null && (n = 10);
        var r = e(), i = 0, o = r.length - 1, s = r[i], a = r[o], u, l, c = 10;
        for (a < s && (l = s,
        s = a,
        a = l,
        l = i,
        i = o,
        o = l); c-- > 0; ) {
            if (l = Ne(s, a, n),
            l === u)
                return r[i] = s,
                r[o] = a,
                e(r);
            if (l > 0)
                s = Math.floor(s / l) * l,
                a = Math.ceil(a / l) * l;
            else if (l < 0)
                s = Math.ceil(s * l) / l,
                a = Math.floor(a * l) / l;
            else
                break;
            u = l
        }
        return t
    }
    ,
    t
}
function z() {
    var t = jo();
    return t.copy = function() {
        return Uo(t, z())
    }
    ,
    Yo.apply(t, arguments),
    es(t)
}
function Z(t, e, n) {
    this.k = t,
    this.x = e,
    this.y = n
}
Z.prototype = {
    constructor: Z,
    scale: function(t) {
        return t === 1 ? this : new Z(this.k * t,this.x,this.y)
    },
    translate: function(t, e) {
        return t === 0 & e === 0 ? this : new Z(this.k,this.x + this.k * t,this.y + this.k * e)
    },
    apply: function(t) {
        return [t[0] * this.k + this.x, t[1] * this.k + this.y]
    },
    applyX: function(t) {
        return t * this.k + this.x
    },
    applyY: function(t) {
        return t * this.k + this.y
    },
    invert: function(t) {
        return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k]
    },
    invertX: function(t) {
        return (t - this.x) / this.k
    },
    invertY: function(t) {
        return (t - this.y) / this.k
    },
    rescaleX: function(t) {
        return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t))
    },
    rescaleY: function(t) {
        return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t))
    },
    toString: function() {
        return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")"
    }
};
new Z(1,0,0);
Z.prototype;
class P {
    constructor() {
        this.aliveCells = new Set
    }
    makeCellAlive({x: e, y: n}) {
        this.aliveCells.add(P._serializeCell({
            x: e,
            y: n
        }))
    }
    makeCellDead({x: e, y: n}) {
        this.aliveCells.delete(P._serializeCell({
            x: e,
            y: n
        }))
    }
    _isCellAlive({x: e, y: n}) {
        return this.aliveCells.has(P._serializeCell({
            x: e,
            y: n
        }))
    }
    numberOfAliveNeighbours({x: e, y: n}) {
        let r = 0;
        for (let i = -1; i <= 1; i++)
            for (let o = -1; o <= 1; o++)
                r += this._isCellAlive({
                    x: e + i,
                    y: n + o
                });
        return this._isCellAlive({
            x: e,
            y: n
        }) && (r -= 1),
        r
    }
    forEachAlive(e) {
        this.aliveCells.forEach(n=>{
            const r = P._deserializeCell(n);
            e(r)
        }
        )
    }
    static _serializeCell({x: e, y: n}) {
        return `${e};${n}`
    }
    static _deserializeCell(e) {
        const [n,r] = e.split(";");
        return {
            x: Number(n),
            y: Number(r)
        }
    }
    static next(e) {
        const n = new P;
        return e.forEachAlive(({x: r, y: i})=>{
            const o = e.numberOfAliveNeighbours({
                x: r,
                y: i
            });
            o === 2 || o === 3 ? n.makeCellAlive({
                x: r,
                y: i
            }) : n.makeCellDead({
                x: r,
                y: i
            });
            for (let s = -1; s <= 1; s++)
                for (let a = -1; a <= 1; a++)
                    s === 0 && a === 0 || e.numberOfAliveNeighbours({
                        x: r + s,
                        y: i + a
                    }) === 3 && n.makeCellAlive({
                        x: r + s,
                        y: i + a
                    })
        }
        ),
        n
    }
}
class dt {
    constructor({x: e, y: n, height: r, aspectRatio: i}) {
        this.x = e,
        this.y = n,
        this.aspectRatio = i,
        this.height = r
    }
    get width() {
        return this.aspectRatio * this.height
    }
    get left() {
        return this.x - this.width / 2
    }
    get right() {
        return this.x + this.width / 2
    }
    get bottom() {
        return this.y - this.height / 2
    }
    get top() {
        return this.y + this.height / 2
    }
    isPointInside({x: e, y: n}) {
        return e >= this.left && e <= this.right && n >= this.bottom && n <= this.top
    }
}
class ns {
    constructor({svg: e}) {
        this.svg = e,
        this.grid_color = "gray"
    }
    render(e, n) {
        this.drawLines(n);
        const r = this.svg.node().clientWidth
          , i = this.svg.node().clientHeight
          , o = i / n.height
          , s = z().domain([n.left, n.right]).range([0, r])
          , a = z().domain([n.bottom, n.top]).range([i, 0])
          , u = [];
        e.forEachAlive(d=>u.push(d));
        const l = this.svg.selectAll(".alive-cell").data(u, d=>`${d.x}/${d.y}`).attr("width", o).attr("height", o)
          , c = l.enter()
          , f = l.exit();
        l.attr("x", d=>s(d.x)).attr("y", d=>-Number(o) + Number(a(d.y))),
        c.append("rect").attr("class", "alive-cell").attr("x", d=>s(d.x)).attr("y", d=>-Number(o) + Number(a(d.y))).attr("width", o).attr("height", o).attr("fill", "#198908").attr("stroke", "#198908"),
        this.svg.selectAll(".dead-cell").attr("x", d=>s(d.x)).attr("y", d=>-Number(o) + Number(a(d.y))).filter(function(d) {
            return u.some(({x: p, y})=>d.x === p && d.y === y)
        }).remove(),
        f.attr("class", "dead-cell").attr("fill", "#FA1E61").attr("opacity", .5).attr("x", d=>s(d.x)).attr("y", d=>-Number(o) + Number(a(d.y))).attr("width", o).attr("height", o).each(function() {
            this.bogusOpacity = .5
        }),
        this.svg.selectAll(".dead-cell").attr("width", o).attr("height", o),
        this.svg.selectAll(".dead-cell").each(function() {
            this.bogusOpacity *= .98
        }).attr("opacity", function() {
            return this.bogusOpacity
        }),
        this.svg.selectAll(".dead-cell").filter(function() {
            return this.bogusOpacity < .001
        }).remove()
    }
    drawLines(e) {
        let n = this.svg.node().clientHeight
          , r = this.svg.node().clientWidth;
        this.svg.selectAll("line").remove();
        const i = z().domain([e.left, e.right]).range([0, r])
          , o = z().domain([e.bottom, e.top]).range([n, 0]);
        this.svg.selectAll("line.horizontalGrid").data(o.ticks(e.height)).enter().append("line").attr("x1", 0).attr("y1", s=>o(s)).attr("x2", r).attr("y2", s=>o(s)).attr("fill", "none").attr("stroke", this.grid_color).attr("stroke-width", .6),
        this.svg.selectAll("line.horizontalGrid").data(i.ticks(e.width)).enter().append("line").attr("x1", s=>i(s)).attr("y1", 0).attr("x2", s=>i(s)).attr("y2", n).attr("fill", "none").attr("stroke", this.grid_color).attr("stroke-width", .6)
    }
}
function rs() {
    let t;
    const e = document.createElement("div");
    return e.innerHTML = `
		<div style="min-height: 100vh; display: flex; flex-direction: column;">
        	<div class="controls-container">
				<div class="world" style="padding-right: 1.5em;">
					<p>WORLD:</p>
					<p>TO 4 BLOCKS</p>
				</div>
				<div class="generation"style="padding-right: 1.5em;">
					<p>GENERATION:</p>
					<p id="number-of-generations"></p>
				</div>
				<div class="alive-cells">
					<p>ALIVE CELLS:</p>
					<p id="number-of-alive-cells">-//-</p>
				</div>

				<div class="speed">
					<p>SPEED:</p>
					<input class="slider" type="range" id="time-speed" min="0" max="100">
				</div>


                <div class="buttons-container">
				<div class="button" style="display: flex; gap: 0.35em; align-items: center; display: grid; grid-template-columns: 1fr 1fr 1fr; align-self: center; padding: 0.35em 0;">
					<div class="button" style="display: flex; align-items: center; justify-content: center; padding: 0.15rem; background: transaprent; border: 0.15rem solid white;" id="play-pause-button">
						<svg id="play" xmlns="http://www.w3.org/2000/svg" style="display: none;" fill="white" height="2.05rem" width="2.05rem" viewBox="0 0 48 48"><path d="M16 37.85v-28l22 14Z"/></svg>
						<svg id="pause" xmlns="http://www.w3.org/2000/svg"  fill="white" height="2.05rem" width="2.05rem" viewBox="0 0 48 48"><path d="M28.25 38V10H36v28ZM12 38V10h7.75v28Z"/></svg>
					</div>

					<div class="button" style="display: flex; align-items: center; justify-content: center; padding: 0.25rem; background: transaprent; border: 0.15rem solid white;" id="reset-button">
						<svg fill="white" stroke="white" stroke-width="17" height="1.95rem" width="1.95rem" viewBox="0 0 1024 1024">
                          <path d="M745.833653 947.106726 283.823184 947.106726c-9.139148 0-16.956184-6.558369-18.525935-15.559371L153.772222 294.284443c-0.963954-5.474688 0.551562-11.095709 4.123924-15.357779 3.573385-4.243651 8.845459-6.704702 14.402011-6.704702l685.061544 0c5.556553 0 10.829649 2.462075 14.402011 6.704702 3.573385 4.26207 5.088902 9.883091 4.123924 15.357779L764.360612 931.546332C762.789836 940.548356 754.9728 947.106726 745.833653 947.106726zM299.631218 909.48385l430.395424 0 104.940051-599.640036L194.691167 309.843814 299.631218 909.48385z"  />
                          <path d="M647.185912 222.200708c-7.302313 0-14.246469-4.28049-17.305131-11.407817l-37.46631-87.570451-135.829572-8.064676-47.569412 82.500992c-5.198395 8.982582-16.71673 12.087293-25.691125 6.907317-9.001001-5.179976-12.087293-16.679891-6.898107-25.681916l53.374628-92.585675c3.554966-6.191003 10.425444-9.6815 17.405415-9.386788l159.040203 9.442046c7.118118 0.422625 13.382798 4.831029 16.184611 11.370978l42.040489 98.261954c4.087085 9.552563-0.348947 20.611433-9.892301 24.689309C652.164297 221.722824 649.657196 222.200708 647.185912 222.200708z"  />
                          <path d="M917.558759 238.255359c-0.376577 0-0.753153-0.01842-1.12973-0.036839l-811.080679-48.185442c-10.379395-0.605797-18.278295-9.515724-17.663288-19.895119 0.605797-10.379395 9.718339-18.095124 19.885909-17.654079l811.080679 48.185442c10.379395 0.605797 18.278295 9.515724 17.663288 19.895119C935.726537 230.559073 927.432641 238.255359 917.558759 238.255359z"  />
						</svg>
					</div>

					<div class="button" style=" display: flex; align-items: center; justify-content: center; padding: 0.25rem; background: transaprent; border: 0.15rem solid white;" id="help-button">
						<svg fill="white" height="1.95rem" width="1.95rem" viewBox="0 0 48 48">
							<path d="M21.55 31.5q.05-3.6.825-5.25.775-1.65 2.925-3.6 2.1-1.9 3.225-3.525t1.125-3.475q0-2.25-1.5-3.75t-4.2-1.5q-2.6 0-4 1.475T17.9 14.95l-4.2-1.85q1.1-2.95 3.725-5.025T23.95 6q5 0 7.7 2.775t2.7 6.675q0 2.4-1.025 4.35-1.025 1.95-3.275 4.1-2.45 2.35-2.95 3.6t-.55 4Zm2.4 12.5q-1.45 0-2.475-1.025Q20.45 41.95 20.45 40.5q0-1.45 1.025-2.475Q22.5 37 23.95 37q1.45 0 2.475 1.025Q27.45 39.05 27.45 40.5q0 1.45-1.025 2.475Q25.4 44 23.95 44Z"/>
						</svg>
					</div>

				</div>
                </div>
			</div>
        	<svg id="svg-reder-target"  style="width:100vw; flex-grow: 1;"></svg>
		</div>
    `,
    setTimeout(()=>{
        const n = e.querySelector("#svg-reder-target")
          , r = Yr(n);
        n.style.touchAction = 'none';
        let i = r.node().clientHeight
          , o = r.node().clientWidth
          , s = !1
          , a = !1
          , u = !1
          , l = new P;
        l.makeCellAlive({
            x: 0,
            y: 0
        }),
        l.makeCellAlive({
            x: 0,
            y: 1
        }),
        l.makeCellAlive({
            x: 1,
            y: 1
        }),
        l.makeCellAlive({
            x: 1,
            y: 2
        }),
        l.makeCellAlive({
            x: 2,
            y: 2
        }),
        l.makeCellAlive({
            x: 2,
            y: 3
        });
        let c = 6
          , f = 1
          , h = new dt({
            x: 0,
            y: 0,
            height: 25,
            aspectRatio: o / i
        });
        const d = new ns({
            svg: r
        });
        r.on("pointerdown", ()=>{
            a = !0
        }
        ),
        r.on("pointerup", g=>{
            if (a = !1,
            u) {
                u = !1;
                return
            }
            let C = z().domain([h.left, h.right]).range([0, o])
              , H = z().domain([h.bottom, h.top]).range([i, 0])
              , [A,F] = Zr(g, r.node());
            A = Math.floor(Number(C.invert(A))),
            F = Math.floor(Number(H.invert(F))),
            l._isCellAlive({
                x: A,
                y: F
            }) ? l.makeCellDead({
                x: A,
                y: F
            }) : l.makeCellAlive({
                x: A,
                y: F
            })
        }
        ),
        r.on("pointermove", g=>{
            console.log('pointermove')
            if (!a)
                return;
            const C = .1
              , H = g.movementX * C
              , A = g.movementY * C;
            h.x -= H,
            h.y += A,
            u = !0
        }
        ),
        window.addEventListener("wheel", g=>{
            if (g.deltaY > 0)
                y();
            else if (g.deltaY < 0)
                p();
            }
        ),
        window.addEventListener("resize", ()=>{
            i = r.node().clientHeight,
            o = r.node().clientWidth,
            h = new dt({
                x: h.x,
                y: h.y,
                aspectRatio: o / i,
                height: h.height
            })
        }
        ),
        document.getElementById("reset-button").addEventListener("click", ()=>{
            l = new P;

            s = true;
            const g = document.getElementById("play");
            g.style.display = "initial";
            const C = document.getElementById("pause");
            C.style.display = "none";

            c = 0; // c -> number of alive cells
            f = 0; // f -> number of geneations
        }
        ),
        document.getElementById("help-button").addEventListener("click", ()=>{
            t = document.createElement("div"),
            t.innerHTML = `
				<div style="padding: 0.5rem 0.5rem; background: black; position: fixed; top: 50%; right: 20%; left: 20%; transform: translateY(-50%); border: 0.3rem solid white; color: white; font-size: 0.8rem;">
					<div style="text-align: end; margin: 0.2rem 0;">
						<span id="modal-close">X<span>
					</div>
					<div style="display: flex; flex-direction: column; justify-content: space-between; color: white; font-size: 0.8rem;">
						<div>
							<h3 style="margin-top: 0;">Supported operations:</h3>
							<ul>
								<li>Moving</li>
								<li>Zooming</li>
                                <li>Pausing</li>
                                <li>Toggling individual cells</li>
                                <li>Toggling individual cells</li>
							</ul>
						</div>

						<div style="text-align: center; margin-top: 7em; margin-bottom: 0.3em;">
							>> <a class="link" style="color: white; text-decoration: none;" target='_blank' href="https://youtu.be/yw-j-4xYAN4?t=12&cc_load_policy=1">Press for game explanation</a> &#60;&#60;
						</div>
					</div>
				</div>
			`,
            document.body.append(t),
            document.getElementById("modal-close").addEventListener("click", ()=>{
                t.remove(),
                t = null
            }
            )
        }
        );
        function p() {
            h = new dt({
                x: h.x,
                y: h.y,
                height: h.height + 2/5,
                aspectRatio: h.aspectRatio
            })
        }
        function y() {
            const newHeight = h.height - 2/5;
            if (newHeight < 0) return;

            h = new dt({
                x: h.x,
                y: h.y,
                height: newHeight,
                aspectRatio: h.aspectRatio
            })
        }
        function v() {
            const g = e.querySelector("#number-of-generations");
            g.innerHTML = f
        }
        function T() {
            const g = e.querySelector("#number-of-alive-cells");
            g.innerHTML = c
        }
        e.querySelector("#play-pause-button").addEventListener("click", function() {
            s = !s;
            const g = document.getElementById("play");
            g.style.display = s ? "initial" : "none";
            const C = document.getElementById("pause");
            C.style.display = s ? "none" : "initial"
        }),
        e.querySelector("#time-speed").addEventListener("change", g=>{
            const C = g.target.valueAsNumber / 100
              , H = 1;
            w = 1e3 / (H + C * (40 - H))
        }
        ),
        e.querySelector("#time-speed").valueAsNumber = 500 / (1e3 - 30);
        let b = 0
          , w = 500;
        function R(g) {
            d.render(l, h),
            v(),
            c = 0,
            l.forEachAlive(()=>{
                c += 1
            }
            ),
            T(),
            !s && g - b > w && (l = P.next(l),
            b = g,
            f += 1),
            window.requestAnimationFrame(R)
        }
        window.requestAnimationFrame(R)
    }
    , 0),
    e
}
function is() {
    const t = document.createElement("div");
    return t.className = "loading-page",
    t.innerHTML = "",
    t
}
const Xt = document.getElementById("app")
  , je = {
    welcome: tn({
        onContinueClick: os
    }),
    loading: is()
};
function os() {
    Xt.replaceChildren(je.loading),
    setTimeout(()=>{
        Xt.replaceChildren(rs())
    }
    , 1250)
}
Xt.replaceChildren(je.welcome);
