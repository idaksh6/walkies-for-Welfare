function o(t, e, r, s, a, d, c, _) {
    var i = typeof t == "function" ? t.options : t;
    e && (i.render = e, i.staticRenderFns = r, i._compiled = !0), s && (i.functional = !0), d && (i._scopeId = "data-v-" + d);
    var n;
    if (c ? (n = function (l) {
            l = l || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !l && typeof __VUE_SSR_CONTEXT__ < "u" && (l = __VUE_SSR_CONTEXT__), a && a.call(this, l), l && l._registeredComponents && l._registeredComponents.add(c)
        }, i._ssrRegister = n) : a && (n = _ ? function () {
            a.call(this, (i.functional ? this.parent : this).$root.$options.shadowRoot)
        } : a), n)
        if (i.functional) {
            i._injectStyles = n;
            var h = i.render;
            i.render = function (m, u) {
                return n.call(u), h(m, u)
            }
        } else {
            var f = i.beforeCreate;
            i.beforeCreate = f ? [].concat(f, n) : [n]
        } return {
        exports: t,
        options: i
    }
}
const p = {
    mixins: [Fieldtype],
    inject: ["storeName"],
    data() {
        return {
            selected: null,
            showFieldtype: !0,
            fields: []
        }
    },
    watch: {
        form(t) {
            this.showFieldtype = !1, this.refreshFields(), this.$nextTick(() => this.showFieldtype = !0)
        }
    },
    computed: {
        form() {
            let t = "forms." + this.row + ".form.0";
            return data_get(this.$store.state.publish[this.storeName].values, t)
        },
        row() {
            return this.namePrefix.match(/\[(.*?)\]/)[1]
        }
    },
    mounted() {
        this.selected = this.value, this.refreshFields()
    },
    methods: {
        refreshFields() {
            this.$axios.get(cp_url(`/campaign-monitor/form-fields/${this.form}`)).then(t => {
                this.fields = t.data
            })
        }
    }
};
var v = function () {
        var e = this,
            r = e._self._c;
        return r("div", {
            staticClass: "form-field-fieldtype-wrapper"
        }, [e.form ? e._e() : r("small", {
            staticClass: "help-block text-grey-60"
        }, [e._v(e._s(e.__("Select form")))]), e.showFieldtype && e.form ? r("v-select", {
            attrs: {
                "append-to-body": "",
                clearable: !0,
                options: e.fields,
                reduce: s => s.id,
                searchable: !0
            },
            on: {
                input: function (s) {
                    return e.$emit("input", s)
                }
            },
            model: {
                value: e.selected,
                callback: function (s) {
                    e.selected = s
                },
                expression: "selected"
            }
        }) : e._e()], 1)
    },
    F = [],
    $ = o(p, v, F, !1, null, null, null, null);
const y = $.exports,
    g = {
        mixins: [Fieldtype],
        inject: ["storeName"],
        data() {
            return {
                fields: [],
                selected: null,
                showFieldtype: !0
            }
        },
        watch: {
            list(t) {
                this.showFieldtype = !1, this.refreshFields(), this.$nextTick(() => this.showFieldtype = !0)
            }
        },
        computed: {
            key() {
                return this.namePrefix.match(/([a-z]*?)\[(.*?)\]/)[0].replace("[", ".").replace("]", ".") + "list_id.0"
            },
            list() {
                return data_get(this.$store.state.publish[this.storeName].values, this.key)
            }
        },
        mounted() {
            this.selected = this.value, this.refreshFields()
        },
        methods: {
            refreshFields() {
                this.$axios.get(cp_url(`/campaign-monitor/custom-fields/${this.list}`)).then(t => {
                    this.fields = t.data
                })
            }
        }
    };
var b = function () {
        var e = this,
            r = e._self._c;
        return r("div", {
            staticClass: "mailchimp-merge-fields-fieldtype-wrapper"
        }, [e.list ? e._e() : r("small", {
            staticClass: "help-block text-grey-60"
        }, [e._v(e._s(e.__("Select list")))]), e.showFieldtype && e.list ? r("v-select", {
            attrs: {
                "append-to-body": "",
                clearable: !0,
                options: e.fields,
                reduce: s => s.id,
                searchable: !0
            },
            on: {
                input: function (s) {
                    return e.$emit("input", s)
                }
            },
            model: {
                value: e.selected,
                callback: function (s) {
                    e.selected = s
                },
                expression: "selected"
            }
        }) : e._e()], 1)
    },
    w = [],
    C = o(g, b, w, !1, null, null, null, null);
const k = C.exports,
    x = {
        mixins: [Fieldtype],
        inject: ["storeName"],
        data() {
            return {
                selected: null,
                fields: []
            }
        },
        mounted() {
            this.selected = this.value, this.refreshFields()
        },
        methods: {
            refreshFields() {
                this.$axios.get(cp_url("/campaign-monitor/user-fields")).then(t => {
                    this.fields = t.data
                })
            }
        }
    };
var R = function () {
        var e = this,
            r = e._self._c;
        return r("div", {
            staticClass: "user-field-fieldtype-wrapper"
        }, [r("v-select", {
            attrs: {
                "append-to-body": "",
                clearable: !0,
                options: e.fields,
                reduce: s => s.id,
                searchable: !0
            },
            on: {
                input: function (s) {
                    return e.$emit("input", s)
                }
            },
            model: {
                value: e.selected,
                callback: function (s) {
                    e.selected = s
                },
                expression: "selected"
            }
        })], 1)
    },
    S = [],
    N = o(x, R, S, !1, null, null, null, null);
const T = N.exports;
Statamic.booting(() => {
    Statamic.$components.register("campaign_monitor_form_fields-fieldtype", y), Statamic.$components.register("campaign_monitor_custom_fields-fieldtype", k), Statamic.$components.register("campaign_monitor_user_fields-fieldtype", T)
});
