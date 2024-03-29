!(function (i, r, c) {
    "use strict";
    var d = c("html"),
        u = c("body"),
        p = c(".app-sidebar").data("image"),
        h = c(".sidebar-background");
    if (
        (c(i).scroll(function () {
            !(function () {
                var e = c(i).scrollTop();
                60 < e ? c("body").addClass("navbar-scrolled") : c("body").removeClass("navbar-scrolled"), 20 < e ? c("body").addClass("page-scrolled") : c("body").removeClass("page-scrolled");
            })();
        }),
        c(i).on("load", function () {
            var e = c(".layout-dark.layout-transparent").attr("data-bg-img");
            c("nav.header-navbar").addClass(e),
                setTimeout(function () {
                    c(".horizontal-layout div.header-navbar").addClass(e);
                }, 10),
                0 < c("body.horizontal-layout.vertical-overlay-menu.layout-dark:not(.layout-transparent)").length && c(".app-sidebar").data("background-color", "black");
            var a = !1;
            u.hasClass("nav-collapsed") && (a = !0),
                c("html").data("textdirection"),
                setTimeout(function () {
                    d.removeClass("loading").addClass("loaded");
                }, 1200),
                c.app.menu.init(a);
            !1 === c.app.nav.initialized && c.app.nav.init({ speed: 300 }),
                Unison.on("change", function (e) {
                    c.app.menu.change();
                }),
                0 !== h.length && void 0 !== p && h.css("background-image", 'url("' + p + '")'),
                c('[data-toggle="tooltip"]').tooltip({ container: "body" }),
                0 < c(".navbar-hide-on-scroll").length &&
                    (c(".navbar-hide-on-scroll.fixed-top").headroom({ offset: 205, tolerance: 5, classes: { initial: "headroom", pinned: "headroom--pinned-top", unpinned: "headroom--unpinned-top" } }),
                    c(".navbar-hide-on-scroll.fixed-bottom").headroom({ offset: 205, tolerance: 5, classes: { initial: "headroom", pinned: "headroom--pinned-bottom", unpinned: "headroom--unpinned-bottom" } })),
                c('a[data-action="collapse"]').on("click", function (e) {
                    e.preventDefault(), c(this).closest(".card").children(".card-content").collapse("toggle"), c(this).closest(".card").find('[data-action="collapse"] i').toggleClass("icon-plus icon-minus");
                }),
                c('a[data-action="expand"]').on("click", function (e) {
                    e.preventDefault(), c(this).closest(".card").find('[data-action="expand"] i').toggleClass("icon-maximize icon-minimize"), c(this).closest(".card").toggleClass("card-fullscreen");
                }),
                c(".scrollable-container").each(function () {
                    new PerfectScrollbar(c(this)[0], { wheelPropagation: !1 });
                }),
                c('a[data-action="reload"]').on("click", function () {
                    c(this)
                        .closest(".card")
                        .block({
                            message: '<div class="feather icon-refresh-cw icon-spin font-medium-2"></div>',
                            timeout: 2e3,
                            overlayCSS: { backgroundColor: "#FFF", cursor: "wait" },
                            css: { border: 0, padding: 0, backgroundColor: "none" },
                        });
                }),
                c('a[data-action="close"]').on("click", function () {
                    c(this).closest(".card").removeClass().slideUp("fast");
                }),
                setTimeout(function () {
                    c(".row.match-height").each(function () {
                        c(this).find(".card").not(".card .card").matchHeight();
                    });
                }, 500),
                c('.card .heading-elements a[data-action="collapse"]').on("click", function () {
                    var e,
                        a = c(this).closest(".card");
                    0 < parseInt(a[0].style.height, 10) ? ((e = a.css("height")), a.css("height", "").attr("data-height", e)) : a.data("height") && ((e = a.data("height")), a.css("height", e).attr("data-height", ""));
                });
            var n = u.data("menu");
            "horizontal-menu" != n && !1 === a && (c(".main-menu-content").find("li.active").parents("li").addClass("open"), c(".main-menu-content").find("li.active").parents("li.nav-item").addClass("sidebar-group-active")),
                "horizontal-menu" == n && c(".main-menu-content").find("li.active").parents("li:not(.nav-item)").addClass("open"),
                !0 === a && (c(".main-menu-content").find("li.active").parents("li.nav-item").addClass("sidebar-group-active"), c(".main-menu-content").find("li.active").parents("li").addClass("nav-collapsed-open")),
                c(".heading-elements-toggle").on("click", function () {
                    c(this).parent().children(".heading-elements").toggleClass("visible");
                });
            var t = c(".chartjs"),
                s = t.children("canvas").attr("height");
            if ((t.css("height", s), u.hasClass("boxed-layout") && u.hasClass("vertical-overlay-menu"))) {
                var i = c(".main-menu").width(),
                    o = c(".app-content").position().left - i;
                u.hasClass("menu-flipped") ? c(".main-menu").css("right", o + "px") : c(".main-menu").css("left", o + "px");
            }
            var l = c(".search-input input").data("search");
            c(".nav-link-search").on("click", function () {
                c(this);
                c(this).parent(".nav-search").find(".search-input").addClass("open"), c(".search-input input").focus(), c(".search-input .search-list li").remove(), c(".search-input .search-list").addClass("show");
            }),
                c(".search-input-close i").on("click", function () {
                    c(this);
                    var e = c(this).closest(".search-input");
                    e.hasClass("open") &&
                        (e.removeClass("open"),
                        c(".search-input input").val(""),
                        c(".search-input input").blur(),
                        c(".search-input .search-list").removeClass("show"),
                        c(".wrapper").hasClass("show-overlay") && c(".wrapper").removeClass("show-overlay"));
                }),
                c(".main-content").on("click", function () {
                    var e = c(".search-input-close"),
                        a = c(e).parent(".search-input"),
                        n = c(".search-list");
                    a.hasClass("open") && a.removeClass("open"), n.hasClass("show") && n.removeClass("show"), c(".wrapper").hasClass("show-overlay") && c(".wrapper").removeClass("show-overlay");
                }),
                c(".search-input .input").on("keyup", function (e) {
                    if (38 !== e.keyCode && 40 !== e.keyCode && 13 !== e.keyCode) {
                        27 == e.keyCode &&
                            (c(".search-input input").val(""),
                            c(".search-input input").blur(),
                            c(".search-input").removeClass("open"),
                            c(".search-list").hasClass("show") && (c(this).removeClass("show"), c(".search-input").removeClass("show")));
                        var n = c(this).val().toLowerCase();
                        if ((c("ul.search-list li").remove(), "" != n)) {
                            c(".wrapper").addClass("show-overlay");
                            var t = "",
                                s = "",
                                i = "",
                                o = 0;
                            c.getJSON("../app-assets/data/" + l + ".json", function (e) {
                                for (var a = 0; a < e.listItems.length; a++)
                                    ((0 == e.listItems[a].name.toLowerCase().indexOf(n) && o < 10) || (0 != e.listItems[a].name.toLowerCase().indexOf(n) && -1 < e.listItems[a].name.toLowerCase().indexOf(n) && o < 10)) &&
                                        ((t +=
                                            '<li class="auto-suggestion d-flex align-items-center justify-content-between cursor-pointer ' +
                                            (0 === o ? "current_item" : "") +
                                            '"><a class="d-flex align-items-center justify-content-between w-100" href=' +
                                            e.listItems[a].url +
                                            '><div class="d-flex align-items-center justify-content-start"><span class="mr-2 ' +
                                            e.listItems[a].icon +
                                            '"></span><span>' +
                                            e.listItems[a].name +
                                            "</span></div>"),
                                        o++);
                                "" == t &&
                                    "" == s &&
                                    (s =
                                        '<li class="auto-suggestion d-flex align-items-center cursor-pointer"><a class="d-flex align-items-center justify-content-between w-100"><div class="d-flex align-items-center justify-content-start"><span class="mr-2"></span><span>No results found.</span></div></a></li>'),
                                    (i = t.concat(s)),
                                    c("ul.search-list").html(i);
                            });
                        } else c(".wrapper").hasClass("show-overlay") && c(".wrapper").removeClass("show-overlay");
                    }
                }),
                c(r).on("mouseenter", ".search-list li", function (e) {
                    c(this).siblings().removeClass("current_item"), c(this).addClass("current_item");
                }),
                c(r).on("click", ".search-list li", function (e) {
                    e.stopPropagation();
                });
        }),
        c(i).on("keydown", function (e) {
            var a,
                n,
                t = c(".search-list li.current_item");
            if (
                (40 === e.keyCode ? ((a = t.next()), t.removeClass("current_item"), (t = a.addClass("current_item"))) : 38 === e.keyCode && ((n = t.prev()), t.removeClass("current_item"), (t = n.addClass("current_item"))),
                13 === e.keyCode && 0 < c(".search-list li.current_item").length)
            ) {
                var s = c(".search-list li.current_item a");
                (i.location = s.attr("href")), c(s).trigger("click");
            }
        }),
        c(r).on("click", ".sidenav-overlay", function (e) {
            return c.app.menu.hide(), !1;
        }),
        "undefined" != typeof Hammer)
    ) {
        var e;
        "rtl" == c("html").data("textdirection") && (e = !0);
        var a = r.querySelector(".drag-target"),
            n = "panright",
            t = "panleft";
        if ((!0 === e && ((n = "panleft"), (t = "panright")), 0 < c(a).length))
            new Hammer(a).on(n, function (e) {
                if (u.hasClass("vertical-overlay-menu")) return c.app.menu.open(), !1;
            });
        setTimeout(function () {
            var e,
                a = r.querySelector(".app-sidebar");
            0 < c(a).length &&
                ((e = new Hammer(a)).get("pan").set({ direction: Hammer.DIRECTION_ALL, threshold: 250 }),
                e.on(t, function (e) {
                    if (u.hasClass("vertical-overlay-menu")) return c.app.menu.hide(), !1;
                }));
        }, 300);
        var s = r.querySelector(".sidenav-overlay");
        if (0 < c(s).length)
            new Hammer(s).on(t, function (e) {
                if (u.hasClass("vertical-overlay-menu")) return c.app.menu.hide(), !1;
            });
    }
    c(r).on("click", ".nav-toggle, .menu-toggle, .nav-close", function (e) {
        e.preventDefault(),
            c.app.menu.toggle(),
            setTimeout(function () {
                c(i).trigger("resize");
            }, 200);
        var a = c(".cz-compact-menu");
        return (
            0 < a.length &&
                setTimeout(function () {
                    u.hasClass("menu-expanded") || u.hasClass("menu-open") ? a.prop("checked", !1) : a.prop("checked", !0);
                }, 100),
            c(".vertical-overlay-menu .navbar-with-menu .navbar-container .navbar-collapse").hasClass("show") && c(".vertical-overlay-menu .navbar-with-menu .navbar-container .navbar-collapse").removeClass("show"),
            !1
        );
    }),
        c(r).on("click", ".main-menu-footer .footer-toggle", function (e) {
            return e.preventDefault(), c(this).find("i").toggleClass("pe-is-i-angle-down pe-is-i-angle-up"), c(".main-menu-footer").toggleClass("footer-close footer-open"), !1;
        }),
        c(".navigation").find("li").has("ul").addClass("has-sub"),
        c(".carousel").carousel({ interval: 2e3 }),
        c(".apptogglefullscreen").on("click", function (e) {
            "undefined" != typeof screenfull && screenfull.isEnabled && screenfull.toggle();
        }),
        "undefined" != typeof screenfull &&
            screenfull.isEnabled &&
            c(r).on(screenfull.raw.fullscreenchange, function () {
                screenfull.isFullscreen ? c(".apptogglefullscreen").find("i").toggleClass("ft-minimize ft-maximize") : c(".apptogglefullscreen").find("i").toggleClass("ft-maximize ft-minimize");
            }),
        c(r).on("click", ".mega-dropdown-menu", function (e) {
            e.stopPropagation();
        }),
        c(r).ready(function () {
            c(".step-icon").each(function () {
                var e = c(this);
                0 < e.siblings("span.step").length && (e.siblings("span.step").empty(), c(this).appendTo(c(this).siblings("span.step")));
            });
        }),
        c(i).resize(function () {
            c.app.menu.manualScroller.updateHeight();
        }),
        c(".nav.nav-tabs a.dropdown-item").on("click", function () {
            var e = c(this),
                a = e.attr("href"),
                n = e.closest(".nav");
            n.find(".nav-link").removeClass("active"),
                e.closest(".nav-item").find(".nav-link").addClass("active"),
                e.closest(".dropdown-menu").find(".dropdown-item").removeClass("active"),
                e.addClass("active"),
                n.next().find(a).siblings(".tab-pane").removeClass("active in").attr("aria-expanded", !1),
                c(a).addClass("active in").attr("aria-expanded", "true");
        }),
        c("#sidebar-page-navigation").on("click", "a.nav-link", function (e) {
            e.preventDefault(), e.stopPropagation();
            var a = c(this),
                n = a.attr("href"),
                t = c(n).offset().top - 80;
            c("html, body").animate({ scrollTop: t }, 0),
                setTimeout(function () {
                    a.parent(".nav-item").siblings(".nav-item").children(".nav-link").removeClass("active"), a.addClass("active");
                }, 100);
        }),
        i18next.use(i.i18nextXHRBackend).init({ debug: !1, fallbackLng: "en", backend: { loadPath: "../app-assets/data/locales/{{lng}}.json" }, returnObjects: !0 }, function (e, a) {
            jqueryI18next.init(i18next, c);
        }),
        c(".dropdown-language + .dropdown-menu .dropdown-item").on("click", function () {
            var e = c(this);
            e.siblings(".selected").removeClass("selected"), e.addClass("selected");
            var a = e.text();
            c("#dropdown-flag .selected-language").text(a);
            var n = e.data("language"),
                t = e.find("img").attr("src");
            c("#dropdown-flag .selected-flag").attr("src", t),
                i18next.changeLanguage(n, function (e, a) {
                    c(".app-sidebar , .horizontal-menu").localize();
                });
        });
    var o = 0;
    if (Array.prototype.forEach) {
        var l = c(".switchery");
        c.each(l, function (e, a) {
            var n,
                t,
                s = "",
                i = "";
            n = c(this).data("size");
            s = void 0 !== c(this).data("size") ? "switchery switchery-" + { lg: "large", sm: "small", xs: "xsmall" }[n] : "switchery";
            i = void 0 !== (t = c(this).data("color")) ? { primary: "#975AFF", success: "#40C057", danger: "#F55252", warning: "#F77E17", info: "#2F8BE6" }[t] : "#975AFF";
            new Switchery(c(this)[0], { className: s, color: i });
        });
    } else {
        var m = r.querySelectorAll(".switchery");
        for (o = 0; o < m.length; o++) m[o].data("size"), m[o].data("color"), new Switchery(m[o], { color: "#975AFF" });
    }
    c(".navbar-container .scrollable-container .custom-switch span").on("click", function (e) {
        e.stopPropagation();
    });
})(window, document, jQuery);
