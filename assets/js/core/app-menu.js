!(function (o, t, r) {
    "use strict";
    var e = 0.01 * o.innerHeight;
    t.documentElement.style.setProperty("--vh", e + "px"), (r.app = r.app || {});
    var l = r("body"),
        d = r(o),
        u = r('div[data-menu="menu-wrapper"]').html(),
        m = r('div[data-menu="menu-wrapper"]').attr("class");
    (r.app.menu = {
        expanded: null,
        collapsed: null,
        hidden: null,
        container: null,
        horizontalMenu: !1,
        is_touch_device: function () {
            var e = " -webkit- -moz- -o- -ms- ".split(" ");
            if ("ontouchstart" in o || (o.DocumentTouch && t instanceof DocumentTouch)) return !0;
            var a,
                n = ["(", e.join("touch-enabled),("), "heartz", ")"].join("");
            return (a = n), o.matchMedia(a).matches;
        },
        manualScroller: {
            obj: null,
            init: function () {
                r(".app-sidebar").hasClass("menu-dark");
                r.app.menu.is_touch_device() ? r(".app-sidebar").addClass("menu-native-scroll") : (this.obj = new PerfectScrollbar(".main-menu-content", { suppressScrollX: !0, wheelPropagation: !1 }));
            },
            update: function () {
                if (this.obj) {
                    if (!0 === r(".app-sidebar").data("scroll-to-active")) {
                        var e, a, n;
                        if (
                            ((e = t.querySelector(".main-menu-content li.active")),
                            (a = t.querySelector(".main-menu-content")),
                            l.hasClass("nav-collapsed") && r(".main-menu-content li.sidebar-group-active").length && (e = t.querySelector(".main-menu-content li.sidebar-group-active")),
                            e && (n = e.getBoundingClientRect().top + a.scrollTop),
                            n > parseInt((2 * a.clientHeight) / 3))
                        )
                            var s = n - a.scrollTop - parseInt(a.clientHeight / 2);
                        setTimeout(function () {
                            r.app.menu.container.stop().animate({ scrollTop: s }, 300), r(".app-sidebar").data("scroll-to-active", "false");
                        }, 300);
                    }
                    this.obj.update();
                }
            },
            enable: function () {
                r(".main-menu-content").hasClass("ps") || this.init();
            },
            disable: function () {
                this.obj && this.obj.destroy();
            },
            updateHeight: function () {
                ("vertical-menu" != l.data("menu") && "vertical-overlay-menu" != l.data("menu")) ||
                    !r(".app-sidebar").hasClass("menu-fixed") ||
                    (r(".main-menu-content").css("height", r(o).height() - r(".header-navbar").height() - r(".main-menu-header").outerHeight() - r(".main-menu-footer").outerHeight()), this.update());
            },
        },
        init: function (e) {
            if (0 < r(".main-menu-content").length) {
                this.container = r(".main-menu-content");
                var a = "";
                if ((!0 === e && (a = "collapsed"), "vertical-menu" == l.data("menu"))) {
                    this.change(a);
                } else this.change(a);
            }
        },
        drillDownMenu: function (e) {
            r(".drilldown-menu").length && ("sm" == e || "xs" == e ? "true" == r("#navbar-mobile").attr("aria-expanded") && r(".drilldown-menu").slidingMenu({ backLabel: !0 }) : r(".drilldown-menu").slidingMenu({ backLabel: !0 }));
        },
        change: function (e) {
            var a = Unison.fetch.now();
            this.reset();
            var n = l.data("menu");
            if (a)
                switch (a.name) {
                    case "xl":
                        "vertical-overlay-menu" === n ? this.hide() : "collapsed" === e ? this.collapse(e) : this.expand();
                        break;
                    case "lg":
                        "vertical-overlay-menu" === n ? this.hide() : "collapsed" === e ? this.collapse(e) : this.hide();
                        break;
                    case "md":
                    case "sm":
                    case "xs":
                        this.hide();
                }
            "vertical-menu" === n && this.toOverlayMenu(a.name, n),
                l.is(".horizontal-layout") && !l.hasClass(".horizontal-menu-demo") && (this.changeMenu(a.name), r(".nav-toggle").removeClass("is-active")),
                "horizontal-menu" != n && this.drillDownMenu(a.name),
                "xl" == a.name &&
                    (r('body[data-open="hover"] .dropdown')
                        .on("mouseenter", function () {
                            r(this).hasClass("show") ? r(this).removeClass("show") : r(this).addClass("show");
                        })
                        .on("mouseleave", function (e) {
                            r(this).removeClass("show");
                        }),
                    r('body[data-open="hover"] .dropdown a').on("click", function (e) {
                        if ("horizontal-menu" == n && r(this).hasClass("dropdown-toggle")) return !1;
                    })),
                r(".header-navbar").hasClass("navbar-brand-center") && r(".header-navbar").attr("data-nav", "brand-center"),
                "sm" == a.name || "xs" == a.name ? r(".header-navbar[data-nav=brand-center]").removeClass("navbar-brand-center") : r(".header-navbar[data-nav=brand-center]").addClass("navbar-brand-center"),
                "xl" !== a.name && "horizontal-menu" == n && r("#navbar-type").toggleClass("d-none d-xl-block"),
                r("ul.dropdown-menu [data-toggle=dropdown]").on("click", function (e) {
                    0 < r(this).siblings("ul.dropdown-menu").length && e.preventDefault(), e.stopPropagation(), r(this).parent().siblings().removeClass("show"), r(this).parent().toggleClass("show");
                }),
                "horizontal-menu" == n &&
                    r("li.dropdown-submenu").on("mouseenter", function () {
                        r(this).parent(".dropdown").hasClass("show") || r(this).removeClass("openLeft");
                        var e = r(this).find(".dropdown-menu");
                        if (e) {
                            var a = r(o).height(),
                                n = e.offset().top,
                                s = e.offset().left,
                                t = e.width();
                            if (a - n - e.height() - 28 < 1) {
                                var i = a - n - 25;
                                r(this)
                                    .find(".dropdown-menu")
                                    .css({ "max-height": i + "px", "overflow-y": "auto", "overflow-x": "hidden" });
                                new PerfectScrollbar("li.dropdown-submenu.show .dropdown-menu", { wheelPropagation: !1 });
                            }
                            0 <= s + t - (o.innerWidth - 16) && r(this).addClass("openLeft");
                        }
                    });
        },
        transit: function (e, a) {
            var n = this;
            l.addClass("changing-menu"),
                e.call(n),
                l.hasClass("vertical-layout") &&
                    (l.hasClass("menu-open") || l.hasClass("menu-expanded")
                        ? (r(".nav-toggle").addClass("is-active"), "vertical-menu" === l.data("menu") && r(".main-menu-header") && r(".main-menu-header").show())
                        : (r(".nav-toggle").removeClass("is-active"), "vertical-menu" === l.data("menu") && r(".main-menu-header") && r(".main-menu-header").hide())),
                setTimeout(function () {
                    a.call(n), l.removeClass("changing-menu"), n.update();
                }, 500);
        },
        open: function () {
            this.transit(
                function () {
                    l.removeClass("menu-hide nav-collapsed").addClass("menu-open"),
                        (this.hidden = !1),
                        (this.expanded = !0),
                        l.hasClass("vertical-overlay-menu") && (r(".sidenav-overlay").removeClass("d-none").addClass("d-block"), r("body").css("overflow", "hidden"));
                },
                function () {
                    !r(".app-sidebar").hasClass("menu-native-scroll") &&
                        r(".app-sidebar").hasClass("menu-fixed") &&
                        (this.manualScroller.enable(), r(".main-menu-content").css("height", r(o).height() - r(".header-navbar").height() - r(".main-menu-header").outerHeight() - r(".main-menu-footer").outerHeight())),
                        l.hasClass("vertical-overlay-menu") || (r(".sidenav-overlay").removeClass("d-block d-none"), r("body").css("overflow", "auto"));
                }
            );
        },
        hide: function () {
            this.transit(
                function () {
                    l.removeClass("menu-open menu-expanded").addClass("menu-hide"),
                        (this.hidden = !0),
                        (this.expanded = !1),
                        l.hasClass("vertical-overlay-menu") && (r(".sidenav-overlay").removeClass("d-block").addClass("d-none"), r("body").css("overflow", "auto"));
                },
                function () {
                    !r(".app-sidebar").hasClass("menu-native-scroll") && r(".app-sidebar").hasClass("menu-fixed") && this.manualScroller.enable(),
                        l.hasClass("vertical-overlay-menu") || (r(".sidenav-overlay").removeClass("d-block d-none"), r("body").css("overflow", "auto"));
                }
            );
        },
        expand: function () {
            !1 === this.expanded &&
                ("vertical-menu" == l.data("menu") && r(".nav-toggle").find(".toggle-icon").removeClass("ft-toggle-left").addClass("ft-toggle-right"),
                this.transit(
                    function () {
                        l.removeClass("nav-collapsed").addClass("menu-expanded"), (this.collapsed = !1), (this.expanded = !0), r(".sidenav-overlay").removeClass("d-block d-none");
                    },
                    function () {
                        r(".app-sidebar").hasClass("menu-native-scroll") || "horizontal-menu" == l.data("menu") ? this.manualScroller.disable() : r(".app-sidebar").hasClass("menu-fixed") && this.manualScroller.enable(),
                            "vertical-menu" == l.data("menu") &&
                                r(".app-sidebar").hasClass("menu-fixed") &&
                                r(".main-menu-content").css("height", r(o).height() - r(".header-navbar").height() - r(".main-menu-header").outerHeight() - r(".main-menu-footer").outerHeight());
                    }
                ));
        },
        collapse: function (e) {
            !1 === this.collapsed &&
                ("vertical-menu" == l.data("menu") && r(".nav-toggle").find(".toggle-icon").removeClass("ft-toggle-right").addClass("ft-toggle-left"),
                this.transit(
                    function () {
                        l.removeClass("menu-expanded").addClass("nav-collapsed"), (this.collapsed = !0), (this.expanded = !1), r(".content-overlay").removeClass("d-block d-none");
                    },
                    function () {
                        "horizontal-menu" == l.data("menu") && l.hasClass("vertical-overlay-menu") && r(".app-sidebar").hasClass("menu-fixed") && this.manualScroller.enable(),
                            "vertical-menu" == l.data("menu") && r(".app-sidebar").hasClass("menu-fixed") && r(".main-menu-content").css("height", r(o).height() - r(".header-navbar").height()),
                            "vertical-menu" == l.data("menu") && r(".app-sidebar").hasClass("menu-fixed") && this.manualScroller.enable();
                    }
                ));
        },
        toOverlayMenu: function (e, a) {
            var n = l.data("menu");
            "vertical-menu" == a
                ? "lg" == e || "md" == e || "sm" == e || "xs" == e
                    ? l.hasClass(n) && l.removeClass(n).addClass("vertical-overlay-menu")
                    : l.hasClass("vertical-overlay-menu") && l.removeClass("vertical-overlay-menu").addClass(n)
                : "sm" == e || "xs" == e
                ? l.hasClass(n) && l.removeClass(n).addClass("vertical-overlay-menu")
                : l.hasClass("vertical-overlay-menu") && l.removeClass("vertical-overlay-menu").addClass(n);
        },
        changeMenu: function (e) {
            r('div[data-menu="menu-wrapper"]').html(""), r('div[data-menu="menu-wrapper"]').html(u);
            var a = r('div[data-menu="menu-wrapper"]'),
                n = r('div[data-menu="menu-container"]'),
                s = r('ul[data-menu="menu-navigation"]'),
                t = r('li[data-menu="dropdown"]'),
                i = r('li[data-menu="dropdown-submenu"]');
            "xl" === e
                ? (l.removeClass("vertical-layout vertical-overlay-menu fixed-navbar").addClass(l.data("menu")),
                  r("nav.header-navbar").removeClass("fixed-top"),
                  a.removeClass().addClass(m),
                  r("a.dropdown-item.nav-has-children").on("click", function () {
                      event.preventDefault(), event.stopPropagation();
                  }),
                  r("a.dropdown-item.nav-has-parent").on("click", function () {
                      event.preventDefault(), event.stopPropagation();
                  }),
                  r(".main-menu-content").find("li.active").parents("li").addClass("sidebar-group-active active"))
                : (l.removeClass(l.data("menu")).addClass("vertical-layout vertical-overlay-menu fixed-navbar"),
                  r("nav.header-navbar").addClass("fixed-top"),
                  l.hasClass("layout-dark")
                      ? a.removeClass().addClass("main-menu menu-light menu-fixed menu-shadow app-sidebar").attr("data-background-color", "black")
                      : l.hasClass("layout-dark")
                      ? a.removeClass().addClass("main-menu menu-light menu-fixed menu-shadow app-sidebar").attr("data-background-color", "black")
                      : a.removeClass().addClass("main-menu menu-light menu-fixed menu-shadow app-sidebar").attr("data-background-color", "man-of-steel"),
                  n.addClass("sidebar-content"),
                  s.removeClass().addClass("navigation navigation-main"),
                  t.removeClass("dropdown").addClass("has-sub"),
                  t.find("a").removeClass("dropdown-toggle nav-link"),
                  t.children("ul").find("a").removeClass("dropdown-item"),
                  t.find("ul").removeClass("dropdown-menu"),
                  i.removeClass().addClass("has-sub"),
                  r.app.nav.init(),
                  r("ul.dropdown-menu [data-toggle=dropdown]").on("click", function (e) {
                      e.preventDefault(), e.stopPropagation(), r(this).parent().siblings().removeClass("open"), r(this).parent().toggleClass("open");
                  }),
                  r(".main-menu-content").find("li.active").parents("li").addClass("open"));
        },
        toggle: function () {
            var e = Unison.fetch.now(),
                a = (this.collapsed, this.expanded),
                n = this.hidden,
                s = l.data("menu");
            switch (e.name) {
                case "xl":
                    !0 === a ? ("vertical-overlay-menu" == s ? this.hide() : this.collapse()) : "vertical-overlay-menu" == s ? this.open() : this.expand();
                    break;
                case "lg":
                    !0 === a
                        ? "vertical-overlay-menu" == s || "vertical-menu" == s || "horizontal-menu" == s
                            ? this.hide()
                            : this.open()
                        : "vertical-overlay-menu" == s || "vertical-menu" == s || "horizontal-menu" == s
                        ? this.open()
                        : this.hide();
                    break;
                case "md":
                case "sm":
                case "xs":
                    !0 === n ? this.open() : this.hide();
            }
        },
        update: function () {
            this.manualScroller.update();
        },
        reset: function () {
            (this.expanded = !1), (this.collapsed = !1), (this.hidden = !1), l.removeClass("menu-hide menu-open nav-collapsed menu-expanded");
        },
    }),
        (r.app.nav = {
            container: r(".navigation-main"),
            initialized: !1,
            navItem: r(".navigation-main").find("li").not(".navigation-category"),
            config: { speed: 300 },
            init: function (e) {
                (this.initialized = !0), r.extend(this.config, e), this.bind_events();
            },
            bind_events: function () {
                var i = this;
                r(".navigation-main")
                    .on("mouseenter.app.menu", "li", function () {
                        var e = r(this);
                        if ((r(".hover", ".navigation-main").removeClass("hover"), l.hasClass("nav-collapsed") && "vertical-menu" != l.data("menu"))) {
                            r(".main-menu-content").children("span.menu-title").remove(), r(".main-menu-content").children("a.menu-title").remove(), r(".main-menu-content").children("ul.menu-content").remove();
                            var a,
                                n,
                                s,
                                t = e.find("span.menu-title").clone();
                            if (
                                (e.hasClass("has-sub") || ((a = e.find("span.menu-title").text()), (n = e.children("a").attr("href")), "" !== a && ((t = r("<a>")).attr("href", n), t.attr("title", a), t.text(a), t.addClass("menu-title"))),
                                (s = e.css("border-top") ? e.position().top + parseInt(e.css("border-top"), 10) : e.position().top),
                                "vertical-compact-menu" !== l.data("menu") && t.appendTo(".main-menu-content").css({ position: "fixed", top: s }),
                                e.hasClass("has-sub") && e.hasClass("nav-item"))
                            ) {
                                e.children("ul:first");
                                i.adjustSubmenu(e);
                            }
                        }
                        e.addClass("hover");
                    })
                    .on("mouseleave.app.menu", "li", function () {})
                    .on("active.app.menu", "li", function (e) {
                        e.stopPropagation();
                    })
                    .on("deactive.app.menu", "li.active", function (e) {
                        r(this).removeClass("active"), e.stopPropagation();
                    })
                    .on("open.app.menu", "li", function (e) {
                        var a = r(this);
                        if ((a.addClass("open"), i.expand(a), r(".app-sidebar").hasClass("menu-collapsible"))) return !1;
                        a.siblings(".open").find("li.open").trigger("close.app.menu"), a.siblings(".open").trigger("close.app.menu"), e.stopPropagation();
                    })
                    .on("close.app.menu", "li.open", function (e) {
                        var a = r(this);
                        a.removeClass("open"), i.collapse(a), e.stopPropagation();
                    })
                    .on("click.app.menu", "li", function (e) {
                        var a = r(this);
                        a.is(".disabled")
                            ? e.preventDefault()
                            : l.hasClass("nav-collapsed") && "vertical-menu" != l.data("menu")
                            ? e.preventDefault()
                            : a.has("ul").length
                            ? a.is(".open")
                                ? a.trigger("close.app.menu")
                                : a.trigger("open.app.menu")
                            : a.is(".active") || (a.siblings(".active").trigger("deactive.app.menu"), a.trigger("active.app.menu")),
                            e.stopPropagation();
                    }),
                    r(".app-sidebar")
                        .on("mouseenter", function () {
                            if ("vertical-menu" == l.data("menu") && (r(".app-sidebar, .navbar-header").addClass("expanded"), l.hasClass("nav-collapsed"))) {
                                r(".main-menu li.open").length;
                                var e = r(".app-sidebar li.nav-collapsed-open");
                                e
                                    .children("ul")
                                    .hide()
                                    .slideDown(200, function () {
                                        r(this).css("display", "");
                                    }),
                                    e.addClass("open").removeClass("nav-collapsed-open"),
                                    r(".main-menu-content").find("li.active").parents("li").addClass("open");
                            }
                        })
                        .on("mouseleave", function () {
                            l.hasClass("nav-collapsed") &&
                                "vertical-menu" == l.data("menu") &&
                                setTimeout(function () {
                                    if (0 === r(".app-sidebar:hover").length && 0 === r(".navbar-header:hover").length && (r(".app-sidebar, .navbar-header").removeClass("expanded"), l.hasClass("nav-collapsed"))) {
                                        var e = r(".app-sidebar li.open"),
                                            a = e.children("ul");
                                        e.addClass("nav-collapsed-open"),
                                            a.show().slideUp(200, function () {
                                                r(this).css("display", "");
                                            }),
                                            e.removeClass("open");
                                    }
                                }, 1);
                        }),
                    r(".main-menu-content").on("mouseleave", function () {
                        l.hasClass("nav-collapsed") && (r(".main-menu-content").children("span.menu-title").remove(), r(".main-menu-content").children("a.menu-title").remove(), r(".main-menu-content").children("ul.menu-content").remove()),
                            r(".hover", ".navigation-main").removeClass("hover");
                    }),
                    r(".navigation-main li.has-sub > a").on("click", function (e) {
                        e.preventDefault();
                    }),
                    r("ul.menu-content").on("click", "li", function (e) {
                        var a = r(this);
                        if (a.is(".disabled")) e.preventDefault();
                        else if (a.has("ul"))
                            if (a.is(".open")) a.removeClass("open"), i.collapse(a);
                            else {
                                if ((a.addClass("open"), i.expand(a), r(".app-sidebar").hasClass("menu-collapsible"))) return !1;
                                a.siblings(".open").find("li.open").trigger("close.app.menu"), a.siblings(".open").trigger("close.app.menu"), e.stopPropagation();
                            }
                        else a.is(".active") || (a.siblings(".active").trigger("deactive.app.menu"), a.trigger("active.app.menu"));
                        e.stopPropagation();
                    });
            },
            adjustSubmenu: function (e) {
                var a,
                    n,
                    s,
                    t,
                    i,
                    o = e.children("ul:first"),
                    l = o.clone(!0);
                r(".main-menu-header").height(),
                    (a = e.position().top),
                    (s = d.height() - r(".header-navbar").height()),
                    (i = 0),
                    o.height(),
                    0 < parseInt(e.css("border-top"), 10) && (i = parseInt(e.css("border-top"), 10)),
                    (t = s - a - e.height() - 30),
                    r(".app-sidebar").hasClass("menu-dark"),
                    (n = a + e.height() + i),
                    l.addClass("menu-popout").appendTo(".main-menu-content").css({ top: n, position: "fixed", "max-height": t });
            },
            collapse: function (e, a) {
                var n = e.children("ul");
                e.addClass("changing"),
                    n.show().slideUp(r.app.nav.config.speed, function () {
                        r(this).css("display", ""), r(this).find("> li").removeClass("is-shown"), a && a(), r.app.nav.container.trigger("collapsed.app.menu"), e.removeClass("changing");
                    });
            },
            expand: function (e, a) {
                var n = e.children("ul"),
                    s = n.children("li").addClass("is-hidden");
                n.hide().slideDown(r.app.nav.config.speed, function () {
                    r(this).css("display", ""), a && a(), r.app.nav.container.trigger("expanded.app.menu");
                }),
                    setTimeout(function () {
                        s.addClass("is-shown"), s.removeClass("is-hidden");
                    }, 0);
            },
            refresh: function () {
                r.app.nav.container.find(".open").removeClass("open");
            },
        });
})(window, document, jQuery),
    window.addEventListener("resize", function () {
        var e = 0.01 * window.innerHeight;
        document.documentElement.style.setProperty("--vh", e + "px");
    });
