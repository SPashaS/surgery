(() => {
  var e = {
      24: function (e) {
        e.exports = (function () {
          "use strict";
          function e() {
            return (
              (e =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s)
                      Object.prototype.hasOwnProperty.call(s, i) &&
                        (e[i] = s[i]);
                  }
                  return e;
                }),
              e.apply(this, arguments)
            );
          }
          var t = "undefined" != typeof window,
            s =
              (t && !("onscroll" in window)) ||
              ("undefined" != typeof navigator &&
                /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
            i = t && "IntersectionObserver" in window,
            r = t && "classList" in document.createElement("p"),
            n = t && window.devicePixelRatio > 1,
            a = {
              elements_selector: ".lazy",
              container: s || t ? document : null,
              threshold: 300,
              thresholds: null,
              data_src: "src",
              data_srcset: "srcset",
              data_sizes: "sizes",
              data_bg: "bg",
              data_bg_hidpi: "bg-hidpi",
              data_bg_multi: "bg-multi",
              data_bg_multi_hidpi: "bg-multi-hidpi",
              data_bg_set: "bg-set",
              data_poster: "poster",
              class_applied: "applied",
              class_loading: "loading",
              class_loaded: "loaded",
              class_error: "error",
              class_entered: "entered",
              class_exited: "exited",
              unobserve_completed: !0,
              unobserve_entered: !1,
              cancel_on_exit: !0,
              callback_enter: null,
              callback_exit: null,
              callback_applied: null,
              callback_loading: null,
              callback_loaded: null,
              callback_error: null,
              callback_finish: null,
              callback_cancel: null,
              use_native: !1,
              restore_on_error: !1,
            },
            l = function (t) {
              return e({}, a, t);
            },
            o = function (e, t) {
              var s,
                i = "LazyLoad::Initialized",
                r = new e(t);
              try {
                s = new CustomEvent(i, { detail: { instance: r } });
              } catch (e) {
                (s = document.createEvent("CustomEvent")).initCustomEvent(
                  i,
                  !1,
                  !1,
                  { instance: r },
                );
              }
              window.dispatchEvent(s);
            },
            d = "src",
            c = "srcset",
            u = "sizes",
            p = "poster",
            f = "llOriginalAttrs",
            m = "data",
            h = "loading",
            g = "loaded",
            v = "applied",
            b = "error",
            w = "native",
            y = "data-",
            S = "ll-status",
            E = function (e, t) {
              return e.getAttribute(y + t);
            },
            T = function (e) {
              return E(e, S);
            },
            x = function (e, t) {
              return (function (e, t, s) {
                var i = "data-ll-status";
                null !== s ? e.setAttribute(i, s) : e.removeAttribute(i);
              })(e, 0, t);
            },
            C = function (e) {
              return x(e, null);
            },
            _ = function (e) {
              return null === T(e);
            },
            L = function (e) {
              return T(e) === w;
            },
            M = [h, g, v, b],
            A = function (e, t, s, i) {
              e &&
                "function" == typeof e &&
                (void 0 === i ? (void 0 === s ? e(t) : e(t, s)) : e(t, s, i));
            },
            P = function (e, t) {
              r
                ? e.classList.add(t)
                : (e.className += (e.className ? " " : "") + t);
            },
            k = function (e, t) {
              r
                ? e.classList.remove(t)
                : (e.className = e.className
                    .replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ")
                    .replace(/^\s+/, "")
                    .replace(/\s+$/, ""));
            },
            I = function (e) {
              return e.llTempImage;
            },
            O = function (e, t) {
              if (t) {
                var s = t._observer;
                s && s.unobserve(e);
              }
            },
            z = function (e, t) {
              e && (e.loadingCount += t);
            },
            D = function (e, t) {
              e && (e.toLoadCount = t);
            },
            G = function (e) {
              for (var t, s = [], i = 0; (t = e.children[i]); i += 1)
                "SOURCE" === t.tagName && s.push(t);
              return s;
            },
            $ = function (e, t) {
              var s = e.parentNode;
              s && "PICTURE" === s.tagName && G(s).forEach(t);
            },
            B = function (e, t) {
              G(e).forEach(t);
            },
            N = [d],
            V = [d, p],
            q = [d, c, u],
            F = [m],
            H = function (e) {
              return !!e[f];
            },
            R = function (e) {
              return e[f];
            },
            j = function (e) {
              return delete e[f];
            },
            W = function (e, t) {
              if (!H(e)) {
                var s = {};
                t.forEach(function (t) {
                  s[t] = e.getAttribute(t);
                }),
                  (e[f] = s);
              }
            },
            Y = function (e, t) {
              if (H(e)) {
                var s = R(e);
                t.forEach(function (t) {
                  !(function (e, t, s) {
                    s ? e.setAttribute(t, s) : e.removeAttribute(t);
                  })(e, t, s[t]);
                });
              }
            },
            X = function (e, t, s) {
              P(e, t.class_applied),
                x(e, v),
                s &&
                  (t.unobserve_completed && O(e, t),
                  A(t.callback_applied, e, s));
            },
            U = function (e, t, s) {
              P(e, t.class_loading),
                x(e, h),
                s && (z(s, 1), A(t.callback_loading, e, s));
            },
            K = function (e, t, s) {
              s && e.setAttribute(t, s);
            },
            J = function (e, t) {
              K(e, u, E(e, t.data_sizes)),
                K(e, c, E(e, t.data_srcset)),
                K(e, d, E(e, t.data_src));
            },
            Q = {
              IMG: function (e, t) {
                $(e, function (e) {
                  W(e, q), J(e, t);
                }),
                  W(e, q),
                  J(e, t);
              },
              IFRAME: function (e, t) {
                W(e, N), K(e, d, E(e, t.data_src));
              },
              VIDEO: function (e, t) {
                B(e, function (e) {
                  W(e, N), K(e, d, E(e, t.data_src));
                }),
                  W(e, V),
                  K(e, p, E(e, t.data_poster)),
                  K(e, d, E(e, t.data_src)),
                  e.load();
              },
              OBJECT: function (e, t) {
                W(e, F), K(e, m, E(e, t.data_src));
              },
            },
            Z = ["IMG", "IFRAME", "VIDEO", "OBJECT"],
            ee = function (e, t) {
              !t ||
                (function (e) {
                  return e.loadingCount > 0;
                })(t) ||
                (function (e) {
                  return e.toLoadCount > 0;
                })(t) ||
                A(e.callback_finish, t);
            },
            te = function (e, t, s) {
              e.addEventListener(t, s), (e.llEvLisnrs[t] = s);
            },
            se = function (e, t, s) {
              e.removeEventListener(t, s);
            },
            ie = function (e) {
              return !!e.llEvLisnrs;
            },
            re = function (e) {
              if (ie(e)) {
                var t = e.llEvLisnrs;
                for (var s in t) {
                  var i = t[s];
                  se(e, s, i);
                }
                delete e.llEvLisnrs;
              }
            },
            ne = function (e, t, s) {
              !(function (e) {
                delete e.llTempImage;
              })(e),
                z(s, -1),
                (function (e) {
                  e && (e.toLoadCount -= 1);
                })(s),
                k(e, t.class_loading),
                t.unobserve_completed && O(e, s);
            },
            ae = function (e, t, s) {
              var i = I(e) || e;
              ie(i) ||
                (function (e, t, s) {
                  ie(e) || (e.llEvLisnrs = {});
                  var i = "VIDEO" === e.tagName ? "loadeddata" : "load";
                  te(e, i, t), te(e, "error", s);
                })(
                  i,
                  function (r) {
                    !(function (e, t, s, i) {
                      var r = L(t);
                      ne(t, s, i),
                        P(t, s.class_loaded),
                        x(t, g),
                        A(s.callback_loaded, t, i),
                        r || ee(s, i);
                    })(0, e, t, s),
                      re(i);
                  },
                  function (r) {
                    !(function (e, t, s, i) {
                      var r = L(t);
                      ne(t, s, i),
                        P(t, s.class_error),
                        x(t, b),
                        A(s.callback_error, t, i),
                        s.restore_on_error && Y(t, q),
                        r || ee(s, i);
                    })(0, e, t, s),
                      re(i);
                  },
                );
            },
            le = function (e, t, s) {
              !(function (e) {
                return Z.indexOf(e.tagName) > -1;
              })(e)
                ? (function (e, t, s) {
                    !(function (e) {
                      e.llTempImage = document.createElement("IMG");
                    })(e),
                      ae(e, t, s),
                      (function (e) {
                        H(e) ||
                          (e[f] = { backgroundImage: e.style.backgroundImage });
                      })(e),
                      (function (e, t, s) {
                        var i = E(e, t.data_bg),
                          r = E(e, t.data_bg_hidpi),
                          a = n && r ? r : i;
                        a &&
                          ((e.style.backgroundImage = 'url("'.concat(a, '")')),
                          I(e).setAttribute(d, a),
                          U(e, t, s));
                      })(e, t, s),
                      (function (e, t, s) {
                        var i = E(e, t.data_bg_multi),
                          r = E(e, t.data_bg_multi_hidpi),
                          a = n && r ? r : i;
                        a && ((e.style.backgroundImage = a), X(e, t, s));
                      })(e, t, s),
                      (function (e, t, s) {
                        var i = E(e, t.data_bg_set);
                        if (i) {
                          var r = i.split("|"),
                            n = r.map(function (e) {
                              return "image-set(".concat(e, ")");
                            });
                          (e.style.backgroundImage = n.join()),
                            "" === e.style.backgroundImage &&
                              ((n = r.map(function (e) {
                                return "-webkit-image-set(".concat(e, ")");
                              })),
                              (e.style.backgroundImage = n.join())),
                            X(e, t, s);
                        }
                      })(e, t, s);
                  })(e, t, s)
                : (function (e, t, s) {
                    ae(e, t, s),
                      (function (e, t, s) {
                        var i = Q[e.tagName];
                        i && (i(e, t), U(e, t, s));
                      })(e, t, s);
                  })(e, t, s);
            },
            oe = function (e) {
              e.removeAttribute(d), e.removeAttribute(c), e.removeAttribute(u);
            },
            de = function (e) {
              $(e, function (e) {
                Y(e, q);
              }),
                Y(e, q);
            },
            ce = {
              IMG: de,
              IFRAME: function (e) {
                Y(e, N);
              },
              VIDEO: function (e) {
                B(e, function (e) {
                  Y(e, N);
                }),
                  Y(e, V),
                  e.load();
              },
              OBJECT: function (e) {
                Y(e, F);
              },
            },
            ue = function (e, t) {
              (function (e) {
                var t = ce[e.tagName];
                t
                  ? t(e)
                  : (function (e) {
                      if (H(e)) {
                        var t = R(e);
                        e.style.backgroundImage = t.backgroundImage;
                      }
                    })(e);
              })(e),
                (function (e, t) {
                  _(e) ||
                    L(e) ||
                    (k(e, t.class_entered),
                    k(e, t.class_exited),
                    k(e, t.class_applied),
                    k(e, t.class_loading),
                    k(e, t.class_loaded),
                    k(e, t.class_error));
                })(e, t),
                C(e),
                j(e);
            },
            pe = ["IMG", "IFRAME", "VIDEO"],
            fe = function (e) {
              return e.use_native && "loading" in HTMLImageElement.prototype;
            },
            me = function (e, t, s) {
              e.forEach(function (e) {
                return (function (e) {
                  return e.isIntersecting || e.intersectionRatio > 0;
                })(e)
                  ? (function (e, t, s, i) {
                      var r = (function (e) {
                        return M.indexOf(T(e)) >= 0;
                      })(e);
                      x(e, "entered"),
                        P(e, s.class_entered),
                        k(e, s.class_exited),
                        (function (e, t, s) {
                          t.unobserve_entered && O(e, s);
                        })(e, s, i),
                        A(s.callback_enter, e, t, i),
                        r || le(e, s, i);
                    })(e.target, e, t, s)
                  : (function (e, t, s, i) {
                      _(e) ||
                        (P(e, s.class_exited),
                        (function (e, t, s, i) {
                          s.cancel_on_exit &&
                            (function (e) {
                              return T(e) === h;
                            })(e) &&
                            "IMG" === e.tagName &&
                            (re(e),
                            (function (e) {
                              $(e, function (e) {
                                oe(e);
                              }),
                                oe(e);
                            })(e),
                            de(e),
                            k(e, s.class_loading),
                            z(i, -1),
                            C(e),
                            A(s.callback_cancel, e, t, i));
                        })(e, t, s, i),
                        A(s.callback_exit, e, t, i));
                    })(e.target, e, t, s);
              });
            },
            he = function (e) {
              return Array.prototype.slice.call(e);
            },
            ge = function (e) {
              return e.container.querySelectorAll(e.elements_selector);
            },
            ve = function (e) {
              return (function (e) {
                return T(e) === b;
              })(e);
            },
            be = function (e, t) {
              return (function (e) {
                return he(e).filter(_);
              })(e || ge(t));
            },
            we = function (e, s) {
              var r = l(e);
              (this._settings = r),
                (this.loadingCount = 0),
                (function (e, t) {
                  i &&
                    !fe(e) &&
                    (t._observer = new IntersectionObserver(
                      function (s) {
                        me(s, e, t);
                      },
                      (function (e) {
                        return {
                          root: e.container === document ? null : e.container,
                          rootMargin: e.thresholds || e.threshold + "px",
                        };
                      })(e),
                    ));
                })(r, this),
                (function (e, s) {
                  t &&
                    ((s._onlineHandler = function () {
                      !(function (e, t) {
                        var s;
                        ((s = ge(e)), he(s).filter(ve)).forEach(function (t) {
                          k(t, e.class_error), C(t);
                        }),
                          t.update();
                      })(e, s);
                    }),
                    window.addEventListener("online", s._onlineHandler));
                })(r, this),
                this.update(s);
            };
          return (
            (we.prototype = {
              update: function (e) {
                var t,
                  r,
                  n = this._settings,
                  a = be(e, n);
                D(this, a.length),
                  !s && i
                    ? fe(n)
                      ? (function (e, t, s) {
                          e.forEach(function (e) {
                            -1 !== pe.indexOf(e.tagName) &&
                              (function (e, t, s) {
                                e.setAttribute("loading", "lazy"),
                                  ae(e, t, s),
                                  (function (e, t) {
                                    var s = Q[e.tagName];
                                    s && s(e, t);
                                  })(e, t),
                                  x(e, w);
                              })(e, t, s);
                          }),
                            D(s, 0);
                        })(a, n, this)
                      : ((r = a),
                        (function (e) {
                          e.disconnect();
                        })((t = this._observer)),
                        (function (e, t) {
                          t.forEach(function (t) {
                            e.observe(t);
                          });
                        })(t, r))
                    : this.loadAll(a);
              },
              destroy: function () {
                this._observer && this._observer.disconnect(),
                  t &&
                    window.removeEventListener("online", this._onlineHandler),
                  ge(this._settings).forEach(function (e) {
                    j(e);
                  }),
                  delete this._observer,
                  delete this._settings,
                  delete this._onlineHandler,
                  delete this.loadingCount,
                  delete this.toLoadCount;
              },
              loadAll: function (e) {
                var t = this,
                  s = this._settings;
                be(e, s).forEach(function (e) {
                  O(e, t), le(e, s, t);
                });
              },
              restoreAll: function () {
                var e = this._settings;
                ge(e).forEach(function (t) {
                  ue(t, e);
                });
              },
            }),
            (we.load = function (e, t) {
              var s = l(t);
              le(e, s);
            }),
            (we.resetStatus = function (e) {
              C(e);
            }),
            t &&
              (function (e, t) {
                if (t)
                  if (t.length) for (var s, i = 0; (s = t[i]); i += 1) o(e, s);
                  else o(e, t);
              })(we, window.lazyLoadOptions),
            we
          );
        })();
      },
    },
    t = {};
  function s(i) {
    var r = t[i];
    if (void 0 !== r) return r.exports;
    var n = (t[i] = { exports: {} });
    return e[i].call(n.exports, n, n.exports, s), n.exports;
  }
  (() => {
    "use strict";
    const e = {};
    function t() {
      let e = document.querySelector(".submenu-open");
      e && e.classList.remove("submenu-open");
    }
    document.querySelector(".header").addEventListener("click", function (e) {
      let s = e.target,
        i = s.classList.contains("menu-item__item-title"),
        r = s.closest(".submenu-open");
      i && !r
        ? (t(), s.closest(".menu-item").classList.add("submenu-open"))
        : i && r && s.closest(".menu-item").classList.remove("submenu-open");
    });
    const i = document.querySelector(".kinds__body"),
      r = document.querySelector("#kinds-more");
    if (r) {
      let e = document.querySelector(".kinds__list");
      r.addEventListener("click", (t) => {
        i.classList.toggle("_show"), e.classList.toggle("_hidden");
      });
    }
    const n = document.querySelector(".wrapper");
    let a = document.createElement("div");
    (a.className = "preload"),
      (a.innerHTML =
        '<div class="preload__inner">\n                        <span class="preload__image"></span>\n                        <span class="preload__title preload__title_1">Okonskaya</span>\n                        <span class="preload__title preload__title_2">Yuliya</span>\n                        <span class="preload__title preload__title_3">Igorevna</span>\n                      </div>'),
      document.addEventListener("DOMContentLoaded", () => {
        n.after(a),
          setTimeout(() => {
            a.remove();
          }, 6e3);
      });
    function l(e) {
      (e = e ? `#${e}` : window.location.href.split("#")[0]),
        history.pushState("", "", e);
    }
    let o = (e, t = 500, s = 0) => {
        e.classList.contains("_slide") ||
          (e.classList.add("_slide"),
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = `${e.offsetHeight}px`),
          e.offsetHeight,
          (e.style.overflow = "hidden"),
          (e.style.height = s ? `${s}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          window.setTimeout(() => {
            (e.hidden = !s),
              !s && e.style.removeProperty("height"),
              e.style.removeProperty("padding-top"),
              e.style.removeProperty("padding-bottom"),
              e.style.removeProperty("margin-top"),
              e.style.removeProperty("margin-bottom"),
              !s && e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide"),
              document.dispatchEvent(
                new CustomEvent("slideUpDone", { detail: { target: e } }),
              );
          }, t));
      },
      d = (e, t = 500, s = 0) => {
        if (!e.classList.contains("_slide")) {
          e.classList.add("_slide"),
            (e.hidden = !e.hidden && null),
            s && e.style.removeProperty("height");
          let i = e.offsetHeight;
          (e.style.overflow = "hidden"),
            (e.style.height = s ? `${s}px` : "0px"),
            (e.style.paddingTop = 0),
            (e.style.paddingBottom = 0),
            (e.style.marginTop = 0),
            (e.style.marginBottom = 0),
            e.offsetHeight,
            (e.style.transitionProperty = "height, margin, padding"),
            (e.style.transitionDuration = t + "ms"),
            (e.style.height = i + "px"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            window.setTimeout(() => {
              e.style.removeProperty("height"),
                e.style.removeProperty("overflow"),
                e.style.removeProperty("transition-duration"),
                e.style.removeProperty("transition-property"),
                e.classList.remove("_slide"),
                document.dispatchEvent(
                  new CustomEvent("slideDownDone", { detail: { target: e } }),
                );
            }, t);
        }
      },
      c = !0,
      u = (e = 500) => {
        let t = document.querySelector("body");
        if (c) {
          let s = document.querySelectorAll("[data-lp]");
          setTimeout(() => {
            for (let e = 0; e < s.length; e++) {
              s[e].style.paddingRight = "0px";
            }
            (t.style.paddingRight = "0px"),
              document.documentElement.classList.remove("lock");
          }, e),
            (c = !1),
            setTimeout(function () {
              c = !0;
            }, e);
        }
      };
    function p(e) {
      setTimeout(() => {
        window.FLS && console.log(e);
      }, 0);
    }
    function f(e, t) {
      const s = Array.from(e).filter(function (e, s, i) {
        if (e.dataset[t]) return e.dataset[t].split(",")[0];
      });
      if (s.length) {
        const e = [];
        s.forEach((s) => {
          const i = {},
            r = s.dataset[t].split(",");
          (i.value = r[0]),
            (i.type = r[1] ? r[1].trim() : "max"),
            (i.item = s),
            e.push(i);
        });
        let i = e.map(function (e) {
          return (
            "(" +
            e.type +
            "-width: " +
            e.value +
            "px)," +
            e.value +
            "," +
            e.type
          );
        });
        i = (function (e) {
          return e.filter(function (e, t, s) {
            return s.indexOf(e) === t;
          });
        })(i);
        const r = [];
        if (i.length)
          return (
            i.forEach((t) => {
              const s = t.split(","),
                i = s[1],
                n = s[2],
                a = window.matchMedia(s[0]),
                l = e.filter(function (e) {
                  if (e.value === i && e.type === n) return !0;
                });
              r.push({ itemsArray: l, matchMedia: a });
            }),
            r
          );
      }
    }
    let m = (e, t = !1, s = 500, i = 0) => {
      const r = "string" == typeof e ? document.querySelector(e) : e;
      if (r) {
        let n = "",
          a = 0;
        t &&
          ((n = "header.header"), (a = document.querySelector(n).offsetHeight));
        let l = {
          speedAsDuration: !0,
          speed: s,
          header: n,
          offset: i,
          easing: "easeOutQuad",
        };
        if (
          (document.documentElement.classList.contains("menu-open") &&
            (u(), document.documentElement.classList.remove("menu-open")),
          "undefined" != typeof SmoothScroll)
        )
          new SmoothScroll().animateScroll(r, "", l);
        else {
          let e = r.getBoundingClientRect().top + scrollY;
          window.scrollTo({ top: a ? e - a : e, behavior: "smooth" });
        }
        p(`[gotoBlock]: Юхуу...едем к ${e}`);
      } else p(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
    };
    let h = {
      getErrors(e) {
        let t = 0,
          s = e.querySelectorAll("*[data-required]");
        return (
          s.length &&
            s.forEach((e) => {
              (null === e.offsetParent && "SELECT" !== e.tagName) ||
                e.disabled ||
                (t += this.validateInput(e));
            }),
          t
        );
      },
      validateInput(e) {
        let t = 0;
        return (
          "email" === e.dataset.required
            ? ((e.value = e.value.replace(" ", "")),
              this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
            : ("checkbox" !== e.type || e.checked) && e.value
              ? this.removeError(e)
              : (this.addError(e), t++),
          t
        );
      },
      addError(e) {
        e.classList.add("_form-error"),
          e.closest(".form__row").classList.add("_form-error");
        let t = e.parentElement.querySelector(".form__error");
        t && e.parentElement.removeChild(t),
          e.dataset.error &&
            e.parentElement.insertAdjacentHTML(
              "beforeend",
              `<div class="form__error">${e.dataset.error}</div>`,
            );
      },
      removeError(e) {
        e.classList.remove("_form-error"),
          e.parentElement.classList.remove("_form-error"),
          e.parentElement.querySelector(".form__error") &&
            e.parentElement.removeChild(
              e.parentElement.querySelector(".form__error"),
            );
      },
      formClean(t) {
        t.reset(),
          setTimeout(() => {
            let s = t.querySelectorAll("input,textarea");
            for (let e = 0; e < s.length; e++) {
              const t = s[e];
              t.parentElement.classList.remove("_form-focus"),
                t.classList.remove("_form-focus"),
                h.removeError(t);
            }
            let i = t.querySelectorAll(".checkbox__input");
            if (i.length > 0)
              for (let e = 0; e < i.length; e++) {
                i[e].checked = !1;
              }
            if (e.select) {
              let s = t.querySelectorAll(".select");
              if (s.length)
                for (let t = 0; t < s.length; t++) {
                  const i = s[t].querySelector("select");
                  e.select.selectBuild(i);
                }
            }
          }, 0);
      },
      emailTest: (e) =>
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
    };
    function g(e) {
      return (
        null !== e &&
        "object" == typeof e &&
        "constructor" in e &&
        e.constructor === Object
      );
    }
    function v(e, t) {
      void 0 === e && (e = {}),
        void 0 === t && (t = {}),
        Object.keys(t).forEach((s) => {
          void 0 === e[s]
            ? (e[s] = t[s])
            : g(t[s]) &&
              g(e[s]) &&
              Object.keys(t[s]).length > 0 &&
              v(e[s], t[s]);
        });
    }
    const b = {
      body: {},
      addEventListener() {},
      removeEventListener() {},
      activeElement: { blur() {}, nodeName: "" },
      querySelector: () => null,
      querySelectorAll: () => [],
      getElementById: () => null,
      createEvent: () => ({ initEvent() {} }),
      createElement: () => ({
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {},
        getElementsByTagName: () => [],
      }),
      createElementNS: () => ({}),
      importNode: () => null,
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: "",
      },
    };
    function w() {
      const e = "undefined" != typeof document ? document : {};
      return v(e, b), e;
    }
    const y = {
      document: b,
      navigator: { userAgent: "" },
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: "",
      },
      history: { replaceState() {}, pushState() {}, go() {}, back() {} },
      CustomEvent: function () {
        return this;
      },
      addEventListener() {},
      removeEventListener() {},
      getComputedStyle: () => ({ getPropertyValue: () => "" }),
      Image() {},
      Date() {},
      screen: {},
      setTimeout() {},
      clearTimeout() {},
      matchMedia: () => ({}),
      requestAnimationFrame: (e) =>
        "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
      cancelAnimationFrame(e) {
        "undefined" != typeof setTimeout && clearTimeout(e);
      },
    };
    function S() {
      const e = "undefined" != typeof window ? window : {};
      return v(e, y), e;
    }
    function E(e, t) {
      return void 0 === t && (t = 0), setTimeout(e, t);
    }
    function T() {
      return Date.now();
    }
    function x(e, t) {
      void 0 === t && (t = "x");
      const s = S();
      let i, r, n;
      const a = (function (e) {
        const t = S();
        let s;
        return (
          t.getComputedStyle && (s = t.getComputedStyle(e, null)),
          !s && e.currentStyle && (s = e.currentStyle),
          s || (s = e.style),
          s
        );
      })(e);
      return (
        s.WebKitCSSMatrix
          ? ((r = a.transform || a.webkitTransform),
            r.split(",").length > 6 &&
              (r = r
                .split(", ")
                .map((e) => e.replace(",", "."))
                .join(", ")),
            (n = new s.WebKitCSSMatrix("none" === r ? "" : r)))
          : ((n =
              a.MozTransform ||
              a.OTransform ||
              a.MsTransform ||
              a.msTransform ||
              a.transform ||
              a
                .getPropertyValue("transform")
                .replace("translate(", "matrix(1, 0, 0, 1,")),
            (i = n.toString().split(","))),
        "x" === t &&
          (r = s.WebKitCSSMatrix
            ? n.m41
            : 16 === i.length
              ? parseFloat(i[12])
              : parseFloat(i[4])),
        "y" === t &&
          (r = s.WebKitCSSMatrix
            ? n.m42
            : 16 === i.length
              ? parseFloat(i[13])
              : parseFloat(i[5])),
        r || 0
      );
    }
    function C(e) {
      return (
        "object" == typeof e &&
        null !== e &&
        e.constructor &&
        "Object" === Object.prototype.toString.call(e).slice(8, -1)
      );
    }
    function _() {
      const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
        t = ["__proto__", "constructor", "prototype"];
      for (let i = 1; i < arguments.length; i += 1) {
        const r = i < 0 || arguments.length <= i ? void 0 : arguments[i];
        if (
          null != r &&
          ((s = r),
          !("undefined" != typeof window && void 0 !== window.HTMLElement
            ? s instanceof HTMLElement
            : s && (1 === s.nodeType || 11 === s.nodeType)))
        ) {
          const s = Object.keys(Object(r)).filter((e) => t.indexOf(e) < 0);
          for (let t = 0, i = s.length; t < i; t += 1) {
            const i = s[t],
              n = Object.getOwnPropertyDescriptor(r, i);
            void 0 !== n &&
              n.enumerable &&
              (C(e[i]) && C(r[i])
                ? r[i].__swiper__
                  ? (e[i] = r[i])
                  : _(e[i], r[i])
                : !C(e[i]) && C(r[i])
                  ? ((e[i] = {}),
                    r[i].__swiper__ ? (e[i] = r[i]) : _(e[i], r[i]))
                  : (e[i] = r[i]));
          }
        }
      }
      var s;
      return e;
    }
    function L(e, t, s) {
      e.style.setProperty(t, s);
    }
    function M(e) {
      let { swiper: t, targetPosition: s, side: i } = e;
      const r = S(),
        n = -t.translate;
      let a,
        l = null;
      const o = t.params.speed;
      (t.wrapperEl.style.scrollSnapType = "none"),
        r.cancelAnimationFrame(t.cssModeFrameID);
      const d = s > n ? "next" : "prev",
        c = (e, t) => ("next" === d && e >= t) || ("prev" === d && e <= t),
        u = () => {
          (a = new Date().getTime()), null === l && (l = a);
          const e = Math.max(Math.min((a - l) / o, 1), 0),
            d = 0.5 - Math.cos(e * Math.PI) / 2;
          let p = n + d * (s - n);
          if ((c(p, s) && (p = s), t.wrapperEl.scrollTo({ [i]: p }), c(p, s)))
            return (
              (t.wrapperEl.style.overflow = "hidden"),
              (t.wrapperEl.style.scrollSnapType = ""),
              setTimeout(() => {
                (t.wrapperEl.style.overflow = ""),
                  t.wrapperEl.scrollTo({ [i]: p });
              }),
              void r.cancelAnimationFrame(t.cssModeFrameID)
            );
          t.cssModeFrameID = r.requestAnimationFrame(u);
        };
      u();
    }
    function A(e, t) {
      return (
        void 0 === t && (t = ""), [...e.children].filter((e) => e.matches(t))
      );
    }
    function P(e) {
      try {
        return void console.warn(e);
      } catch (e) {}
    }
    function k(e, t) {
      void 0 === t && (t = []);
      const s = document.createElement(e);
      return (
        s.classList.add(
          ...(Array.isArray(t)
            ? t
            : (function (e) {
                return (
                  void 0 === e && (e = ""),
                  e
                    .trim()
                    .split(" ")
                    .filter((e) => !!e.trim())
                );
              })(t)),
        ),
        s
      );
    }
    function I(e, t) {
      return S().getComputedStyle(e, null).getPropertyValue(t);
    }
    function O(e) {
      let t,
        s = e;
      if (s) {
        for (t = 0; null !== (s = s.previousSibling); )
          1 === s.nodeType && (t += 1);
        return t;
      }
    }
    function z(e, t) {
      const s = [];
      let i = e.parentElement;
      for (; i; )
        t ? i.matches(t) && s.push(i) : s.push(i), (i = i.parentElement);
      return s;
    }
    function D(e, t, s) {
      const i = S();
      return s
        ? e["width" === t ? "offsetWidth" : "offsetHeight"] +
            parseFloat(
              i
                .getComputedStyle(e, null)
                .getPropertyValue(
                  "width" === t ? "margin-right" : "margin-top",
                ),
            ) +
            parseFloat(
              i
                .getComputedStyle(e, null)
                .getPropertyValue(
                  "width" === t ? "margin-left" : "margin-bottom",
                ),
            )
        : e.offsetWidth;
    }
    function G(e) {
      return (Array.isArray(e) ? e : [e]).filter((e) => !!e);
    }
    let $, B, N;
    function V() {
      return (
        $ ||
          ($ = (function () {
            const e = S(),
              t = w();
            return {
              smoothScroll:
                t.documentElement &&
                t.documentElement.style &&
                "scrollBehavior" in t.documentElement.style,
              touch: !!(
                "ontouchstart" in e ||
                (e.DocumentTouch && t instanceof e.DocumentTouch)
              ),
            };
          })()),
        $
      );
    }
    function q(e) {
      return (
        void 0 === e && (e = {}),
        B ||
          (B = (function (e) {
            let { userAgent: t } = void 0 === e ? {} : e;
            const s = V(),
              i = S(),
              r = i.navigator.platform,
              n = t || i.navigator.userAgent,
              a = { ios: !1, android: !1 },
              l = i.screen.width,
              o = i.screen.height,
              d = n.match(/(Android);?[\s\/]+([\d.]+)?/);
            let c = n.match(/(iPad).*OS\s([\d_]+)/);
            const u = n.match(/(iPod)(.*OS\s([\d_]+))?/),
              p = !c && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
              f = "Win32" === r;
            let m = "MacIntel" === r;
            return (
              !c &&
                m &&
                s.touch &&
                [
                  "1024x1366",
                  "1366x1024",
                  "834x1194",
                  "1194x834",
                  "834x1112",
                  "1112x834",
                  "768x1024",
                  "1024x768",
                  "820x1180",
                  "1180x820",
                  "810x1080",
                  "1080x810",
                ].indexOf(`${l}x${o}`) >= 0 &&
                ((c = n.match(/(Version)\/([\d.]+)/)),
                c || (c = [0, 1, "13_0_0"]),
                (m = !1)),
              d && !f && ((a.os = "android"), (a.android = !0)),
              (c || p || u) && ((a.os = "ios"), (a.ios = !0)),
              a
            );
          })(e)),
        B
      );
    }
    function F() {
      return (
        N ||
          (N = (function () {
            const e = S(),
              t = q();
            let s = !1;
            function i() {
              const t = e.navigator.userAgent.toLowerCase();
              return (
                t.indexOf("safari") >= 0 &&
                t.indexOf("chrome") < 0 &&
                t.indexOf("android") < 0
              );
            }
            if (i()) {
              const t = String(e.navigator.userAgent);
              if (t.includes("Version/")) {
                const [e, i] = t
                  .split("Version/")[1]
                  .split(" ")[0]
                  .split(".")
                  .map((e) => Number(e));
                s = e < 16 || (16 === e && i < 2);
              }
            }
            const r = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
                e.navigator.userAgent,
              ),
              n = i();
            return {
              isSafari: s || n,
              needPerspectiveFix: s,
              need3dFix: n || (r && t.ios),
              isWebView: r,
            };
          })()),
        N
      );
    }
    var H = {
      on(e, t, s) {
        const i = this;
        if (!i.eventsListeners || i.destroyed) return i;
        if ("function" != typeof t) return i;
        const r = s ? "unshift" : "push";
        return (
          e.split(" ").forEach((e) => {
            i.eventsListeners[e] || (i.eventsListeners[e] = []),
              i.eventsListeners[e][r](t);
          }),
          i
        );
      },
      once(e, t, s) {
        const i = this;
        if (!i.eventsListeners || i.destroyed) return i;
        if ("function" != typeof t) return i;
        function r() {
          i.off(e, r), r.__emitterProxy && delete r.__emitterProxy;
          for (var s = arguments.length, n = new Array(s), a = 0; a < s; a++)
            n[a] = arguments[a];
          t.apply(i, n);
        }
        return (r.__emitterProxy = t), i.on(e, r, s);
      },
      onAny(e, t) {
        const s = this;
        if (!s.eventsListeners || s.destroyed) return s;
        if ("function" != typeof e) return s;
        const i = t ? "unshift" : "push";
        return (
          s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s
        );
      },
      offAny(e) {
        const t = this;
        if (!t.eventsListeners || t.destroyed) return t;
        if (!t.eventsAnyListeners) return t;
        const s = t.eventsAnyListeners.indexOf(e);
        return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
      },
      off(e, t) {
        const s = this;
        return !s.eventsListeners || s.destroyed
          ? s
          : s.eventsListeners
            ? (e.split(" ").forEach((e) => {
                void 0 === t
                  ? (s.eventsListeners[e] = [])
                  : s.eventsListeners[e] &&
                    s.eventsListeners[e].forEach((i, r) => {
                      (i === t ||
                        (i.__emitterProxy && i.__emitterProxy === t)) &&
                        s.eventsListeners[e].splice(r, 1);
                    });
              }),
              s)
            : s;
      },
      emit() {
        const e = this;
        if (!e.eventsListeners || e.destroyed) return e;
        if (!e.eventsListeners) return e;
        let t, s, i;
        for (var r = arguments.length, n = new Array(r), a = 0; a < r; a++)
          n[a] = arguments[a];
        "string" == typeof n[0] || Array.isArray(n[0])
          ? ((t = n[0]), (s = n.slice(1, n.length)), (i = e))
          : ((t = n[0].events), (s = n[0].data), (i = n[0].context || e)),
          s.unshift(i);
        return (
          (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
            e.eventsAnyListeners &&
              e.eventsAnyListeners.length &&
              e.eventsAnyListeners.forEach((e) => {
                e.apply(i, [t, ...s]);
              }),
              e.eventsListeners &&
                e.eventsListeners[t] &&
                e.eventsListeners[t].forEach((e) => {
                  e.apply(i, s);
                });
          }),
          e
        );
      },
    };
    const R = (e, t) => {
        if (!e || e.destroyed || !e.params) return;
        const s = t.closest(
          e.isElement ? "swiper-slide" : `.${e.params.slideClass}`,
        );
        if (s) {
          let t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
          !t &&
            e.isElement &&
            (s.shadowRoot
              ? (t = s.shadowRoot.querySelector(
                  `.${e.params.lazyPreloaderClass}`,
                ))
              : requestAnimationFrame(() => {
                  s.shadowRoot &&
                    ((t = s.shadowRoot.querySelector(
                      `.${e.params.lazyPreloaderClass}`,
                    )),
                    t && t.remove());
                })),
            t && t.remove();
        }
      },
      j = (e, t) => {
        if (!e.slides[t]) return;
        const s = e.slides[t].querySelector('[loading="lazy"]');
        s && s.removeAttribute("loading");
      },
      W = (e) => {
        if (!e || e.destroyed || !e.params) return;
        let t = e.params.lazyPreloadPrevNext;
        const s = e.slides.length;
        if (!s || !t || t < 0) return;
        t = Math.min(t, s);
        const i =
            "auto" === e.params.slidesPerView
              ? e.slidesPerViewDynamic()
              : Math.ceil(e.params.slidesPerView),
          r = e.activeIndex;
        if (e.params.grid && e.params.grid.rows > 1) {
          const s = r,
            n = [s - t];
          return (
            n.push(...Array.from({ length: t }).map((e, t) => s + i + t)),
            void e.slides.forEach((t, s) => {
              n.includes(t.column) && j(e, s);
            })
          );
        }
        const n = r + i - 1;
        if (e.params.rewind || e.params.loop)
          for (let i = r - t; i <= n + t; i += 1) {
            const t = ((i % s) + s) % s;
            (t < r || t > n) && j(e, t);
          }
        else
          for (let i = Math.max(r - t, 0); i <= Math.min(n + t, s - 1); i += 1)
            i !== r && (i > n || i < r) && j(e, i);
      };
    var Y = {
      updateSize: function () {
        const e = this;
        let t, s;
        const i = e.el;
        (t =
          void 0 !== e.params.width && null !== e.params.width
            ? e.params.width
            : i.clientWidth),
          (s =
            void 0 !== e.params.height && null !== e.params.height
              ? e.params.height
              : i.clientHeight),
          (0 === t && e.isHorizontal()) ||
            (0 === s && e.isVertical()) ||
            ((t =
              t -
              parseInt(I(i, "padding-left") || 0, 10) -
              parseInt(I(i, "padding-right") || 0, 10)),
            (s =
              s -
              parseInt(I(i, "padding-top") || 0, 10) -
              parseInt(I(i, "padding-bottom") || 0, 10)),
            Number.isNaN(t) && (t = 0),
            Number.isNaN(s) && (s = 0),
            Object.assign(e, {
              width: t,
              height: s,
              size: e.isHorizontal() ? t : s,
            }));
      },
      updateSlides: function () {
        const e = this;
        function t(t, s) {
          return parseFloat(t.getPropertyValue(e.getDirectionLabel(s)) || 0);
        }
        const s = e.params,
          {
            wrapperEl: i,
            slidesEl: r,
            size: n,
            rtlTranslate: a,
            wrongRTL: l,
          } = e,
          o = e.virtual && s.virtual.enabled,
          d = o ? e.virtual.slides.length : e.slides.length,
          c = A(r, `.${e.params.slideClass}, swiper-slide`),
          u = o ? e.virtual.slides.length : c.length;
        let p = [];
        const f = [],
          m = [];
        let h = s.slidesOffsetBefore;
        "function" == typeof h && (h = s.slidesOffsetBefore.call(e));
        let g = s.slidesOffsetAfter;
        "function" == typeof g && (g = s.slidesOffsetAfter.call(e));
        const v = e.snapGrid.length,
          b = e.slidesGrid.length;
        let w = s.spaceBetween,
          y = -h,
          S = 0,
          E = 0;
        if (void 0 === n) return;
        "string" == typeof w && w.indexOf("%") >= 0
          ? (w = (parseFloat(w.replace("%", "")) / 100) * n)
          : "string" == typeof w && (w = parseFloat(w)),
          (e.virtualSize = -w),
          c.forEach((e) => {
            a ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
              (e.style.marginBottom = ""),
              (e.style.marginTop = "");
          }),
          s.centeredSlides &&
            s.cssMode &&
            (L(i, "--swiper-centered-offset-before", ""),
            L(i, "--swiper-centered-offset-after", ""));
        const T = s.grid && s.grid.rows > 1 && e.grid;
        let x;
        T ? e.grid.initSlides(c) : e.grid && e.grid.unsetSlides();
        const C =
          "auto" === s.slidesPerView &&
          s.breakpoints &&
          Object.keys(s.breakpoints).filter(
            (e) => void 0 !== s.breakpoints[e].slidesPerView,
          ).length > 0;
        for (let i = 0; i < u; i += 1) {
          let r;
          if (
            ((x = 0),
            c[i] && (r = c[i]),
            T && e.grid.updateSlide(i, r, c),
            !c[i] || "none" !== I(r, "display"))
          ) {
            if ("auto" === s.slidesPerView) {
              C && (c[i].style[e.getDirectionLabel("width")] = "");
              const n = getComputedStyle(r),
                a = r.style.transform,
                l = r.style.webkitTransform;
              if (
                (a && (r.style.transform = "none"),
                l && (r.style.webkitTransform = "none"),
                s.roundLengths)
              )
                x = e.isHorizontal() ? D(r, "width", !0) : D(r, "height", !0);
              else {
                const e = t(n, "width"),
                  s = t(n, "padding-left"),
                  i = t(n, "padding-right"),
                  a = t(n, "margin-left"),
                  l = t(n, "margin-right"),
                  o = n.getPropertyValue("box-sizing");
                if (o && "border-box" === o) x = e + a + l;
                else {
                  const { clientWidth: t, offsetWidth: n } = r;
                  x = e + s + i + a + l + (n - t);
                }
              }
              a && (r.style.transform = a),
                l && (r.style.webkitTransform = l),
                s.roundLengths && (x = Math.floor(x));
            } else
              (x = (n - (s.slidesPerView - 1) * w) / s.slidesPerView),
                s.roundLengths && (x = Math.floor(x)),
                c[i] && (c[i].style[e.getDirectionLabel("width")] = `${x}px`);
            c[i] && (c[i].swiperSlideSize = x),
              m.push(x),
              s.centeredSlides
                ? ((y = y + x / 2 + S / 2 + w),
                  0 === S && 0 !== i && (y = y - n / 2 - w),
                  0 === i && (y = y - n / 2 - w),
                  Math.abs(y) < 0.001 && (y = 0),
                  s.roundLengths && (y = Math.floor(y)),
                  E % s.slidesPerGroup == 0 && p.push(y),
                  f.push(y))
                : (s.roundLengths && (y = Math.floor(y)),
                  (E - Math.min(e.params.slidesPerGroupSkip, E)) %
                    e.params.slidesPerGroup ==
                    0 && p.push(y),
                  f.push(y),
                  (y = y + x + w)),
              (e.virtualSize += x + w),
              (S = x),
              (E += 1);
          }
        }
        if (
          ((e.virtualSize = Math.max(e.virtualSize, n) + g),
          a &&
            l &&
            ("slide" === s.effect || "coverflow" === s.effect) &&
            (i.style.width = `${e.virtualSize + w}px`),
          s.setWrapperSize &&
            (i.style[e.getDirectionLabel("width")] = `${e.virtualSize + w}px`),
          T && e.grid.updateWrapperSize(x, p),
          !s.centeredSlides)
        ) {
          const t = [];
          for (let i = 0; i < p.length; i += 1) {
            let r = p[i];
            s.roundLengths && (r = Math.floor(r)),
              p[i] <= e.virtualSize - n && t.push(r);
          }
          (p = t),
            Math.floor(e.virtualSize - n) - Math.floor(p[p.length - 1]) > 1 &&
              p.push(e.virtualSize - n);
        }
        if (o && s.loop) {
          const t = m[0] + w;
          if (s.slidesPerGroup > 1) {
            const i = Math.ceil(
                (e.virtual.slidesBefore + e.virtual.slidesAfter) /
                  s.slidesPerGroup,
              ),
              r = t * s.slidesPerGroup;
            for (let e = 0; e < i; e += 1) p.push(p[p.length - 1] + r);
          }
          for (
            let i = 0;
            i < e.virtual.slidesBefore + e.virtual.slidesAfter;
            i += 1
          )
            1 === s.slidesPerGroup && p.push(p[p.length - 1] + t),
              f.push(f[f.length - 1] + t),
              (e.virtualSize += t);
        }
        if ((0 === p.length && (p = [0]), 0 !== w)) {
          const t =
            e.isHorizontal() && a
              ? "marginLeft"
              : e.getDirectionLabel("marginRight");
          c.filter(
            (e, t) => !(s.cssMode && !s.loop) || t !== c.length - 1,
          ).forEach((e) => {
            e.style[t] = `${w}px`;
          });
        }
        if (s.centeredSlides && s.centeredSlidesBounds) {
          let e = 0;
          m.forEach((t) => {
            e += t + (w || 0);
          }),
            (e -= w);
          const t = e - n;
          p = p.map((e) => (e <= 0 ? -h : e > t ? t + g : e));
        }
        if (s.centerInsufficientSlides) {
          let e = 0;
          if (
            (m.forEach((t) => {
              e += t + (w || 0);
            }),
            (e -= w),
            e < n)
          ) {
            const t = (n - e) / 2;
            p.forEach((e, s) => {
              p[s] = e - t;
            }),
              f.forEach((e, s) => {
                f[s] = e + t;
              });
          }
        }
        if (
          (Object.assign(e, {
            slides: c,
            snapGrid: p,
            slidesGrid: f,
            slidesSizesGrid: m,
          }),
          s.centeredSlides && s.cssMode && !s.centeredSlidesBounds)
        ) {
          L(i, "--swiper-centered-offset-before", -p[0] + "px"),
            L(
              i,
              "--swiper-centered-offset-after",
              e.size / 2 - m[m.length - 1] / 2 + "px",
            );
          const t = -e.snapGrid[0],
            s = -e.slidesGrid[0];
          (e.snapGrid = e.snapGrid.map((e) => e + t)),
            (e.slidesGrid = e.slidesGrid.map((e) => e + s));
        }
        if (
          (u !== d && e.emit("slidesLengthChange"),
          p.length !== v &&
            (e.params.watchOverflow && e.checkOverflow(),
            e.emit("snapGridLengthChange")),
          f.length !== b && e.emit("slidesGridLengthChange"),
          s.watchSlidesProgress && e.updateSlidesOffset(),
          e.emit("slidesUpdated"),
          !(o || s.cssMode || ("slide" !== s.effect && "fade" !== s.effect)))
        ) {
          const t = `${s.containerModifierClass}backface-hidden`,
            i = e.el.classList.contains(t);
          u <= s.maxBackfaceHiddenSlides
            ? i || e.el.classList.add(t)
            : i && e.el.classList.remove(t);
        }
      },
      updateAutoHeight: function (e) {
        const t = this,
          s = [],
          i = t.virtual && t.params.virtual.enabled;
        let r,
          n = 0;
        "number" == typeof e
          ? t.setTransition(e)
          : !0 === e && t.setTransition(t.params.speed);
        const a = (e) => (i ? t.slides[t.getSlideIndexByData(e)] : t.slides[e]);
        if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
          if (t.params.centeredSlides)
            (t.visibleSlides || []).forEach((e) => {
              s.push(e);
            });
          else
            for (r = 0; r < Math.ceil(t.params.slidesPerView); r += 1) {
              const e = t.activeIndex + r;
              if (e > t.slides.length && !i) break;
              s.push(a(e));
            }
        else s.push(a(t.activeIndex));
        for (r = 0; r < s.length; r += 1)
          if (void 0 !== s[r]) {
            const e = s[r].offsetHeight;
            n = e > n ? e : n;
          }
        (n || 0 === n) && (t.wrapperEl.style.height = `${n}px`);
      },
      updateSlidesOffset: function () {
        const e = this,
          t = e.slides,
          s = e.isElement
            ? e.isHorizontal()
              ? e.wrapperEl.offsetLeft
              : e.wrapperEl.offsetTop
            : 0;
        for (let i = 0; i < t.length; i += 1)
          t[i].swiperSlideOffset =
            (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) -
            s -
            e.cssOverflowAdjustment();
      },
      updateSlidesProgress: function (e) {
        void 0 === e && (e = (this && this.translate) || 0);
        const t = this,
          s = t.params,
          { slides: i, rtlTranslate: r, snapGrid: n } = t;
        if (0 === i.length) return;
        void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
        let a = -e;
        r && (a = e),
          i.forEach((e) => {
            e.classList.remove(s.slideVisibleClass, s.slideFullyVisibleClass);
          }),
          (t.visibleSlidesIndexes = []),
          (t.visibleSlides = []);
        let l = s.spaceBetween;
        "string" == typeof l && l.indexOf("%") >= 0
          ? (l = (parseFloat(l.replace("%", "")) / 100) * t.size)
          : "string" == typeof l && (l = parseFloat(l));
        for (let e = 0; e < i.length; e += 1) {
          const o = i[e];
          let d = o.swiperSlideOffset;
          s.cssMode && s.centeredSlides && (d -= i[0].swiperSlideOffset);
          const c =
              (a + (s.centeredSlides ? t.minTranslate() : 0) - d) /
              (o.swiperSlideSize + l),
            u =
              (a - n[0] + (s.centeredSlides ? t.minTranslate() : 0) - d) /
              (o.swiperSlideSize + l),
            p = -(a - d),
            f = p + t.slidesSizesGrid[e],
            m = p >= 0 && p <= t.size - t.slidesSizesGrid[e];
          ((p >= 0 && p < t.size - 1) ||
            (f > 1 && f <= t.size) ||
            (p <= 0 && f >= t.size)) &&
            (t.visibleSlides.push(o),
            t.visibleSlidesIndexes.push(e),
            i[e].classList.add(s.slideVisibleClass)),
            m && i[e].classList.add(s.slideFullyVisibleClass),
            (o.progress = r ? -c : c),
            (o.originalProgress = r ? -u : u);
        }
      },
      updateProgress: function (e) {
        const t = this;
        if (void 0 === e) {
          const s = t.rtlTranslate ? -1 : 1;
          e = (t && t.translate && t.translate * s) || 0;
        }
        const s = t.params,
          i = t.maxTranslate() - t.minTranslate();
        let { progress: r, isBeginning: n, isEnd: a, progressLoop: l } = t;
        const o = n,
          d = a;
        if (0 === i) (r = 0), (n = !0), (a = !0);
        else {
          r = (e - t.minTranslate()) / i;
          const s = Math.abs(e - t.minTranslate()) < 1,
            l = Math.abs(e - t.maxTranslate()) < 1;
          (n = s || r <= 0), (a = l || r >= 1), s && (r = 0), l && (r = 1);
        }
        if (s.loop) {
          const s = t.getSlideIndexByData(0),
            i = t.getSlideIndexByData(t.slides.length - 1),
            r = t.slidesGrid[s],
            n = t.slidesGrid[i],
            a = t.slidesGrid[t.slidesGrid.length - 1],
            o = Math.abs(e);
          (l = o >= r ? (o - r) / a : (o + a - n) / a), l > 1 && (l -= 1);
        }
        Object.assign(t, {
          progress: r,
          progressLoop: l,
          isBeginning: n,
          isEnd: a,
        }),
          (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
            t.updateSlidesProgress(e),
          n && !o && t.emit("reachBeginning toEdge"),
          a && !d && t.emit("reachEnd toEdge"),
          ((o && !n) || (d && !a)) && t.emit("fromEdge"),
          t.emit("progress", r);
      },
      updateSlidesClasses: function () {
        const e = this,
          { slides: t, params: s, slidesEl: i, activeIndex: r } = e,
          n = e.virtual && s.virtual.enabled,
          a = e.grid && s.grid && s.grid.rows > 1,
          l = (e) => A(i, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
        let o, d, c;
        if (
          (t.forEach((e) => {
            e.classList.remove(
              s.slideActiveClass,
              s.slideNextClass,
              s.slidePrevClass,
            );
          }),
          n)
        )
          if (s.loop) {
            let t = r - e.virtual.slidesBefore;
            t < 0 && (t = e.virtual.slides.length + t),
              t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
              (o = l(`[data-swiper-slide-index="${t}"]`));
          } else o = l(`[data-swiper-slide-index="${r}"]`);
        else
          a
            ? ((o = t.filter((e) => e.column === r)[0]),
              (c = t.filter((e) => e.column === r + 1)[0]),
              (d = t.filter((e) => e.column === r - 1)[0]))
            : (o = t[r]);
        o &&
          (o.classList.add(s.slideActiveClass),
          a
            ? (c && c.classList.add(s.slideNextClass),
              d && d.classList.add(s.slidePrevClass))
            : ((c = (function (e, t) {
                const s = [];
                for (; e.nextElementSibling; ) {
                  const i = e.nextElementSibling;
                  t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
                }
                return s;
              })(o, `.${s.slideClass}, swiper-slide`)[0]),
              s.loop && !c && (c = t[0]),
              c && c.classList.add(s.slideNextClass),
              (d = (function (e, t) {
                const s = [];
                for (; e.previousElementSibling; ) {
                  const i = e.previousElementSibling;
                  t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
                }
                return s;
              })(o, `.${s.slideClass}, swiper-slide`)[0]),
              s.loop && 0 === !d && (d = t[t.length - 1]),
              d && d.classList.add(s.slidePrevClass))),
          e.emitSlidesClasses();
      },
      updateActiveIndex: function (e) {
        const t = this,
          s = t.rtlTranslate ? t.translate : -t.translate,
          {
            snapGrid: i,
            params: r,
            activeIndex: n,
            realIndex: a,
            snapIndex: l,
          } = t;
        let o,
          d = e;
        const c = (e) => {
          let s = e - t.virtual.slidesBefore;
          return (
            s < 0 && (s = t.virtual.slides.length + s),
            s >= t.virtual.slides.length && (s -= t.virtual.slides.length),
            s
          );
        };
        if (
          (void 0 === d &&
            (d = (function (e) {
              const { slidesGrid: t, params: s } = e,
                i = e.rtlTranslate ? e.translate : -e.translate;
              let r;
              for (let e = 0; e < t.length; e += 1)
                void 0 !== t[e + 1]
                  ? i >= t[e] && i < t[e + 1] - (t[e + 1] - t[e]) / 2
                    ? (r = e)
                    : i >= t[e] && i < t[e + 1] && (r = e + 1)
                  : i >= t[e] && (r = e);
              return (
                s.normalizeSlideIndex && (r < 0 || void 0 === r) && (r = 0), r
              );
            })(t)),
          i.indexOf(s) >= 0)
        )
          o = i.indexOf(s);
        else {
          const e = Math.min(r.slidesPerGroupSkip, d);
          o = e + Math.floor((d - e) / r.slidesPerGroup);
        }
        if ((o >= i.length && (o = i.length - 1), d === n && !t.params.loop))
          return void (
            o !== l && ((t.snapIndex = o), t.emit("snapIndexChange"))
          );
        if (d === n && t.params.loop && t.virtual && t.params.virtual.enabled)
          return void (t.realIndex = c(d));
        const u = t.grid && r.grid && r.grid.rows > 1;
        let p;
        if (t.virtual && r.virtual.enabled && r.loop) p = c(d);
        else if (u) {
          const e = t.slides.filter((e) => e.column === d)[0];
          let s = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
          Number.isNaN(s) && (s = Math.max(t.slides.indexOf(e), 0)),
            (p = Math.floor(s / r.grid.rows));
        } else if (t.slides[d]) {
          const e = t.slides[d].getAttribute("data-swiper-slide-index");
          p = e ? parseInt(e, 10) : d;
        } else p = d;
        Object.assign(t, {
          previousSnapIndex: l,
          snapIndex: o,
          previousRealIndex: a,
          realIndex: p,
          previousIndex: n,
          activeIndex: d,
        }),
          t.initialized && W(t),
          t.emit("activeIndexChange"),
          t.emit("snapIndexChange"),
          (t.initialized || t.params.runCallbacksOnInit) &&
            (a !== p && t.emit("realIndexChange"), t.emit("slideChange"));
      },
      updateClickedSlide: function (e, t) {
        const s = this,
          i = s.params;
        let r = e.closest(`.${i.slideClass}, swiper-slide`);
        !r &&
          s.isElement &&
          t &&
          t.length > 1 &&
          t.includes(e) &&
          [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e) => {
            !r &&
              e.matches &&
              e.matches(`.${i.slideClass}, swiper-slide`) &&
              (r = e);
          });
        let n,
          a = !1;
        if (r)
          for (let e = 0; e < s.slides.length; e += 1)
            if (s.slides[e] === r) {
              (a = !0), (n = e);
              break;
            }
        if (!r || !a)
          return (s.clickedSlide = void 0), void (s.clickedIndex = void 0);
        (s.clickedSlide = r),
          s.virtual && s.params.virtual.enabled
            ? (s.clickedIndex = parseInt(
                r.getAttribute("data-swiper-slide-index"),
                10,
              ))
            : (s.clickedIndex = n),
          i.slideToClickedSlide &&
            void 0 !== s.clickedIndex &&
            s.clickedIndex !== s.activeIndex &&
            s.slideToClickedSlide();
      },
    };
    var X = {
      getTranslate: function (e) {
        void 0 === e && (e = this.isHorizontal() ? "x" : "y");
        const { params: t, rtlTranslate: s, translate: i, wrapperEl: r } = this;
        if (t.virtualTranslate) return s ? -i : i;
        if (t.cssMode) return i;
        let n = x(r, e);
        return (n += this.cssOverflowAdjustment()), s && (n = -n), n || 0;
      },
      setTranslate: function (e, t) {
        const s = this,
          { rtlTranslate: i, params: r, wrapperEl: n, progress: a } = s;
        let l,
          o = 0,
          d = 0;
        s.isHorizontal() ? (o = i ? -e : e) : (d = e),
          r.roundLengths && ((o = Math.floor(o)), (d = Math.floor(d))),
          (s.previousTranslate = s.translate),
          (s.translate = s.isHorizontal() ? o : d),
          r.cssMode
            ? (n[s.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                s.isHorizontal() ? -o : -d)
            : r.virtualTranslate ||
              (s.isHorizontal()
                ? (o -= s.cssOverflowAdjustment())
                : (d -= s.cssOverflowAdjustment()),
              (n.style.transform = `translate3d(${o}px, ${d}px, 0px)`));
        const c = s.maxTranslate() - s.minTranslate();
        (l = 0 === c ? 0 : (e - s.minTranslate()) / c),
          l !== a && s.updateProgress(e),
          s.emit("setTranslate", s.translate, t);
      },
      minTranslate: function () {
        return -this.snapGrid[0];
      },
      maxTranslate: function () {
        return -this.snapGrid[this.snapGrid.length - 1];
      },
      translateTo: function (e, t, s, i, r) {
        void 0 === e && (e = 0),
          void 0 === t && (t = this.params.speed),
          void 0 === s && (s = !0),
          void 0 === i && (i = !0);
        const n = this,
          { params: a, wrapperEl: l } = n;
        if (n.animating && a.preventInteractionOnTransition) return !1;
        const o = n.minTranslate(),
          d = n.maxTranslate();
        let c;
        if (
          ((c = i && e > o ? o : i && e < d ? d : e),
          n.updateProgress(c),
          a.cssMode)
        ) {
          const e = n.isHorizontal();
          if (0 === t) l[e ? "scrollLeft" : "scrollTop"] = -c;
          else {
            if (!n.support.smoothScroll)
              return (
                M({ swiper: n, targetPosition: -c, side: e ? "left" : "top" }),
                !0
              );
            l.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
          }
          return !0;
        }
        return (
          0 === t
            ? (n.setTransition(0),
              n.setTranslate(c),
              s &&
                (n.emit("beforeTransitionStart", t, r),
                n.emit("transitionEnd")))
            : (n.setTransition(t),
              n.setTranslate(c),
              s &&
                (n.emit("beforeTransitionStart", t, r),
                n.emit("transitionStart")),
              n.animating ||
                ((n.animating = !0),
                n.onTranslateToWrapperTransitionEnd ||
                  (n.onTranslateToWrapperTransitionEnd = function (e) {
                    n &&
                      !n.destroyed &&
                      e.target === this &&
                      (n.wrapperEl.removeEventListener(
                        "transitionend",
                        n.onTranslateToWrapperTransitionEnd,
                      ),
                      (n.onTranslateToWrapperTransitionEnd = null),
                      delete n.onTranslateToWrapperTransitionEnd,
                      s && n.emit("transitionEnd"));
                  }),
                n.wrapperEl.addEventListener(
                  "transitionend",
                  n.onTranslateToWrapperTransitionEnd,
                ))),
          !0
        );
      },
    };
    function U(e) {
      let { swiper: t, runCallbacks: s, direction: i, step: r } = e;
      const { activeIndex: n, previousIndex: a } = t;
      let l = i;
      if (
        (l || (l = n > a ? "next" : n < a ? "prev" : "reset"),
        t.emit(`transition${r}`),
        s && n !== a)
      ) {
        if ("reset" === l) return void t.emit(`slideResetTransition${r}`);
        t.emit(`slideChangeTransition${r}`),
          "next" === l
            ? t.emit(`slideNextTransition${r}`)
            : t.emit(`slidePrevTransition${r}`);
      }
    }
    var K = {
      slideTo: function (e, t, s, i, r) {
        void 0 === e && (e = 0),
          void 0 === t && (t = this.params.speed),
          void 0 === s && (s = !0),
          "string" == typeof e && (e = parseInt(e, 10));
        const n = this;
        let a = e;
        a < 0 && (a = 0);
        const {
          params: l,
          snapGrid: o,
          slidesGrid: d,
          previousIndex: c,
          activeIndex: u,
          rtlTranslate: p,
          wrapperEl: f,
          enabled: m,
        } = n;
        if (
          (n.animating && l.preventInteractionOnTransition) ||
          (!m && !i && !r) ||
          n.destroyed
        )
          return !1;
        const h = Math.min(n.params.slidesPerGroupSkip, a);
        let g = h + Math.floor((a - h) / n.params.slidesPerGroup);
        g >= o.length && (g = o.length - 1);
        const v = -o[g];
        if (l.normalizeSlideIndex)
          for (let e = 0; e < d.length; e += 1) {
            const t = -Math.floor(100 * v),
              s = Math.floor(100 * d[e]),
              i = Math.floor(100 * d[e + 1]);
            void 0 !== d[e + 1]
              ? t >= s && t < i - (i - s) / 2
                ? (a = e)
                : t >= s && t < i && (a = e + 1)
              : t >= s && (a = e);
          }
        if (n.initialized && a !== u) {
          if (
            !n.allowSlideNext &&
            (p
              ? v > n.translate && v > n.minTranslate()
              : v < n.translate && v < n.minTranslate())
          )
            return !1;
          if (
            !n.allowSlidePrev &&
            v > n.translate &&
            v > n.maxTranslate() &&
            (u || 0) !== a
          )
            return !1;
        }
        let b;
        if (
          (a !== (c || 0) && s && n.emit("beforeSlideChangeStart"),
          n.updateProgress(v),
          (b = a > u ? "next" : a < u ? "prev" : "reset"),
          (p && -v === n.translate) || (!p && v === n.translate))
        )
          return (
            n.updateActiveIndex(a),
            l.autoHeight && n.updateAutoHeight(),
            n.updateSlidesClasses(),
            "slide" !== l.effect && n.setTranslate(v),
            "reset" !== b && (n.transitionStart(s, b), n.transitionEnd(s, b)),
            !1
          );
        if (l.cssMode) {
          const e = n.isHorizontal(),
            s = p ? v : -v;
          if (0 === t) {
            const t = n.virtual && n.params.virtual.enabled;
            t &&
              ((n.wrapperEl.style.scrollSnapType = "none"),
              (n._immediateVirtual = !0)),
              t && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0
                ? ((n._cssModeVirtualInitialSet = !0),
                  requestAnimationFrame(() => {
                    f[e ? "scrollLeft" : "scrollTop"] = s;
                  }))
                : (f[e ? "scrollLeft" : "scrollTop"] = s),
              t &&
                requestAnimationFrame(() => {
                  (n.wrapperEl.style.scrollSnapType = ""),
                    (n._immediateVirtual = !1);
                });
          } else {
            if (!n.support.smoothScroll)
              return (
                M({ swiper: n, targetPosition: s, side: e ? "left" : "top" }),
                !0
              );
            f.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
          }
          return !0;
        }
        return (
          n.setTransition(t),
          n.setTranslate(v),
          n.updateActiveIndex(a),
          n.updateSlidesClasses(),
          n.emit("beforeTransitionStart", t, i),
          n.transitionStart(s, b),
          0 === t
            ? n.transitionEnd(s, b)
            : n.animating ||
              ((n.animating = !0),
              n.onSlideToWrapperTransitionEnd ||
                (n.onSlideToWrapperTransitionEnd = function (e) {
                  n &&
                    !n.destroyed &&
                    e.target === this &&
                    (n.wrapperEl.removeEventListener(
                      "transitionend",
                      n.onSlideToWrapperTransitionEnd,
                    ),
                    (n.onSlideToWrapperTransitionEnd = null),
                    delete n.onSlideToWrapperTransitionEnd,
                    n.transitionEnd(s, b));
                }),
              n.wrapperEl.addEventListener(
                "transitionend",
                n.onSlideToWrapperTransitionEnd,
              )),
          !0
        );
      },
      slideToLoop: function (e, t, s, i) {
        if (
          (void 0 === e && (e = 0),
          void 0 === t && (t = this.params.speed),
          void 0 === s && (s = !0),
          "string" == typeof e)
        ) {
          e = parseInt(e, 10);
        }
        const r = this;
        if (r.destroyed) return;
        const n = r.grid && r.params.grid && r.params.grid.rows > 1;
        let a = e;
        if (r.params.loop)
          if (r.virtual && r.params.virtual.enabled)
            a += r.virtual.slidesBefore;
          else {
            let e;
            if (n) {
              const t = a * r.params.grid.rows;
              e = r.slides.filter(
                (e) => 1 * e.getAttribute("data-swiper-slide-index") === t,
              )[0].column;
            } else e = r.getSlideIndexByData(a);
            const t = n
                ? Math.ceil(r.slides.length / r.params.grid.rows)
                : r.slides.length,
              { centeredSlides: s } = r.params;
            let i = r.params.slidesPerView;
            "auto" === i
              ? (i = r.slidesPerViewDynamic())
              : ((i = Math.ceil(parseFloat(r.params.slidesPerView, 10))),
                s && i % 2 == 0 && (i += 1));
            let l = t - e < i;
            if ((s && (l = l || e < Math.ceil(i / 2)), l)) {
              const i = s
                ? e < r.activeIndex
                  ? "prev"
                  : "next"
                : e - r.activeIndex - 1 < r.params.slidesPerView
                  ? "next"
                  : "prev";
              r.loopFix({
                direction: i,
                slideTo: !0,
                activeSlideIndex: "next" === i ? e + 1 : e - t + 1,
                slideRealIndex: "next" === i ? r.realIndex : void 0,
              });
            }
            if (n) {
              const e = a * r.params.grid.rows;
              a = r.slides.filter(
                (t) => 1 * t.getAttribute("data-swiper-slide-index") === e,
              )[0].column;
            } else a = r.getSlideIndexByData(a);
          }
        return (
          requestAnimationFrame(() => {
            r.slideTo(a, t, s, i);
          }),
          r
        );
      },
      slideNext: function (e, t, s) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        const i = this,
          { enabled: r, params: n, animating: a } = i;
        if (!r || i.destroyed) return i;
        let l = n.slidesPerGroup;
        "auto" === n.slidesPerView &&
          1 === n.slidesPerGroup &&
          n.slidesPerGroupAuto &&
          (l = Math.max(i.slidesPerViewDynamic("current", !0), 1));
        const o = i.activeIndex < n.slidesPerGroupSkip ? 1 : l,
          d = i.virtual && n.virtual.enabled;
        if (n.loop) {
          if (a && !d && n.loopPreventsSliding) return !1;
          if (
            (i.loopFix({ direction: "next" }),
            (i._clientLeft = i.wrapperEl.clientLeft),
            i.activeIndex === i.slides.length - 1 && n.cssMode)
          )
            return (
              requestAnimationFrame(() => {
                i.slideTo(i.activeIndex + o, e, t, s);
              }),
              !0
            );
        }
        return n.rewind && i.isEnd
          ? i.slideTo(0, e, t, s)
          : i.slideTo(i.activeIndex + o, e, t, s);
      },
      slidePrev: function (e, t, s) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        const i = this,
          {
            params: r,
            snapGrid: n,
            slidesGrid: a,
            rtlTranslate: l,
            enabled: o,
            animating: d,
          } = i;
        if (!o || i.destroyed) return i;
        const c = i.virtual && r.virtual.enabled;
        if (r.loop) {
          if (d && !c && r.loopPreventsSliding) return !1;
          i.loopFix({ direction: "prev" }),
            (i._clientLeft = i.wrapperEl.clientLeft);
        }
        function u(e) {
          return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
        }
        const p = u(l ? i.translate : -i.translate),
          f = n.map((e) => u(e));
        let m = n[f.indexOf(p) - 1];
        if (void 0 === m && r.cssMode) {
          let e;
          n.forEach((t, s) => {
            p >= t && (e = s);
          }),
            void 0 !== e && (m = n[e > 0 ? e - 1 : e]);
        }
        let h = 0;
        if (
          (void 0 !== m &&
            ((h = a.indexOf(m)),
            h < 0 && (h = i.activeIndex - 1),
            "auto" === r.slidesPerView &&
              1 === r.slidesPerGroup &&
              r.slidesPerGroupAuto &&
              ((h = h - i.slidesPerViewDynamic("previous", !0) + 1),
              (h = Math.max(h, 0)))),
          r.rewind && i.isBeginning)
        ) {
          const r =
            i.params.virtual && i.params.virtual.enabled && i.virtual
              ? i.virtual.slides.length - 1
              : i.slides.length - 1;
          return i.slideTo(r, e, t, s);
        }
        return r.loop && 0 === i.activeIndex && r.cssMode
          ? (requestAnimationFrame(() => {
              i.slideTo(h, e, t, s);
            }),
            !0)
          : i.slideTo(h, e, t, s);
      },
      slideReset: function (e, t, s) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        const i = this;
        if (!i.destroyed) return i.slideTo(i.activeIndex, e, t, s);
      },
      slideToClosest: function (e, t, s, i) {
        void 0 === e && (e = this.params.speed),
          void 0 === t && (t = !0),
          void 0 === i && (i = 0.5);
        const r = this;
        if (r.destroyed) return;
        let n = r.activeIndex;
        const a = Math.min(r.params.slidesPerGroupSkip, n),
          l = a + Math.floor((n - a) / r.params.slidesPerGroup),
          o = r.rtlTranslate ? r.translate : -r.translate;
        if (o >= r.snapGrid[l]) {
          const e = r.snapGrid[l];
          o - e > (r.snapGrid[l + 1] - e) * i && (n += r.params.slidesPerGroup);
        } else {
          const e = r.snapGrid[l - 1];
          o - e <= (r.snapGrid[l] - e) * i && (n -= r.params.slidesPerGroup);
        }
        return (
          (n = Math.max(n, 0)),
          (n = Math.min(n, r.slidesGrid.length - 1)),
          r.slideTo(n, e, t, s)
        );
      },
      slideToClickedSlide: function () {
        const e = this;
        if (e.destroyed) return;
        const { params: t, slidesEl: s } = e,
          i =
            "auto" === t.slidesPerView
              ? e.slidesPerViewDynamic()
              : t.slidesPerView;
        let r,
          n = e.clickedIndex;
        const a = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
        if (t.loop) {
          if (e.animating) return;
          (r = parseInt(
            e.clickedSlide.getAttribute("data-swiper-slide-index"),
            10,
          )),
            t.centeredSlides
              ? n < e.loopedSlides - i / 2 ||
                n > e.slides.length - e.loopedSlides + i / 2
                ? (e.loopFix(),
                  (n = e.getSlideIndex(
                    A(s, `${a}[data-swiper-slide-index="${r}"]`)[0],
                  )),
                  E(() => {
                    e.slideTo(n);
                  }))
                : e.slideTo(n)
              : n > e.slides.length - i
                ? (e.loopFix(),
                  (n = e.getSlideIndex(
                    A(s, `${a}[data-swiper-slide-index="${r}"]`)[0],
                  )),
                  E(() => {
                    e.slideTo(n);
                  }))
                : e.slideTo(n);
        } else e.slideTo(n);
      },
    };
    var J = {
      loopCreate: function (e) {
        const t = this,
          { params: s, slidesEl: i } = t;
        if (!s.loop || (t.virtual && t.params.virtual.enabled)) return;
        const r = () => {
            A(i, `.${s.slideClass}, swiper-slide`).forEach((e, t) => {
              e.setAttribute("data-swiper-slide-index", t);
            });
          },
          n = t.grid && s.grid && s.grid.rows > 1,
          a = s.slidesPerGroup * (n ? s.grid.rows : 1),
          l = t.slides.length % a != 0,
          o = n && t.slides.length % s.grid.rows != 0,
          d = (e) => {
            for (let i = 0; i < e; i += 1) {
              const e = t.isElement
                ? k("swiper-slide", [s.slideBlankClass])
                : k("div", [s.slideClass, s.slideBlankClass]);
              t.slidesEl.append(e);
            }
          };
        if (l) {
          if (s.loopAddBlankSlides) {
            d(a - (t.slides.length % a)), t.recalcSlides(), t.updateSlides();
          } else
            P(
              "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
            );
          r();
        } else if (o) {
          if (s.loopAddBlankSlides) {
            d(s.grid.rows - (t.slides.length % s.grid.rows)),
              t.recalcSlides(),
              t.updateSlides();
          } else
            P(
              "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
            );
          r();
        } else r();
        t.loopFix({
          slideRealIndex: e,
          direction: s.centeredSlides ? void 0 : "next",
        });
      },
      loopFix: function (e) {
        let {
          slideRealIndex: t,
          slideTo: s = !0,
          direction: i,
          setTranslate: r,
          activeSlideIndex: n,
          byController: a,
          byMousewheel: l,
        } = void 0 === e ? {} : e;
        const o = this;
        if (!o.params.loop) return;
        o.emit("beforeLoopFix");
        const {
            slides: d,
            allowSlidePrev: c,
            allowSlideNext: u,
            slidesEl: p,
            params: f,
          } = o,
          { centeredSlides: m } = f;
        if (
          ((o.allowSlidePrev = !0),
          (o.allowSlideNext = !0),
          o.virtual && f.virtual.enabled)
        )
          return (
            s &&
              (f.centeredSlides || 0 !== o.snapIndex
                ? f.centeredSlides && o.snapIndex < f.slidesPerView
                  ? o.slideTo(o.virtual.slides.length + o.snapIndex, 0, !1, !0)
                  : o.snapIndex === o.snapGrid.length - 1 &&
                    o.slideTo(o.virtual.slidesBefore, 0, !1, !0)
                : o.slideTo(o.virtual.slides.length, 0, !1, !0)),
            (o.allowSlidePrev = c),
            (o.allowSlideNext = u),
            void o.emit("loopFix")
          );
        let h = f.slidesPerView;
        "auto" === h
          ? (h = o.slidesPerViewDynamic())
          : ((h = Math.ceil(parseFloat(f.slidesPerView, 10))),
            m && h % 2 == 0 && (h += 1));
        const g = f.slidesPerGroupAuto ? h : f.slidesPerGroup;
        let v = g;
        v % g != 0 && (v += g - (v % g)),
          (v += f.loopAdditionalSlides),
          (o.loopedSlides = v);
        const b = o.grid && f.grid && f.grid.rows > 1;
        d.length < h + v
          ? P(
              "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters",
            )
          : b &&
            "row" === f.grid.fill &&
            P(
              "Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`",
            );
        const w = [],
          y = [];
        let S = o.activeIndex;
        void 0 === n
          ? (n = o.getSlideIndex(
              d.filter((e) => e.classList.contains(f.slideActiveClass))[0],
            ))
          : (S = n);
        const E = "next" === i || !i,
          T = "prev" === i || !i;
        let x = 0,
          C = 0;
        const _ = b ? Math.ceil(d.length / f.grid.rows) : d.length,
          L = (b ? d[n].column : n) + (m && void 0 === r ? -h / 2 + 0.5 : 0);
        if (L < v) {
          x = Math.max(v - L, g);
          for (let e = 0; e < v - L; e += 1) {
            const t = e - Math.floor(e / _) * _;
            if (b) {
              const e = _ - t - 1;
              for (let t = d.length - 1; t >= 0; t -= 1)
                d[t].column === e && w.push(t);
            } else w.push(_ - t - 1);
          }
        } else if (L + h > _ - v) {
          C = Math.max(L - (_ - 2 * v), g);
          for (let e = 0; e < C; e += 1) {
            const t = e - Math.floor(e / _) * _;
            b
              ? d.forEach((e, s) => {
                  e.column === t && y.push(s);
                })
              : y.push(t);
          }
        }
        if (
          ((o.__preventObserver__ = !0),
          requestAnimationFrame(() => {
            o.__preventObserver__ = !1;
          }),
          T &&
            w.forEach((e) => {
              (d[e].swiperLoopMoveDOM = !0),
                p.prepend(d[e]),
                (d[e].swiperLoopMoveDOM = !1);
            }),
          E &&
            y.forEach((e) => {
              (d[e].swiperLoopMoveDOM = !0),
                p.append(d[e]),
                (d[e].swiperLoopMoveDOM = !1);
            }),
          o.recalcSlides(),
          "auto" === f.slidesPerView
            ? o.updateSlides()
            : b &&
              ((w.length > 0 && T) || (y.length > 0 && E)) &&
              o.slides.forEach((e, t) => {
                o.grid.updateSlide(t, e, o.slides);
              }),
          f.watchSlidesProgress && o.updateSlidesOffset(),
          s)
        )
          if (w.length > 0 && T) {
            if (void 0 === t) {
              const e = o.slidesGrid[S],
                t = o.slidesGrid[S + x] - e;
              l
                ? o.setTranslate(o.translate - t)
                : (o.slideTo(S + x, 0, !1, !0),
                  r &&
                    ((o.touchEventsData.startTranslate =
                      o.touchEventsData.startTranslate - t),
                    (o.touchEventsData.currentTranslate =
                      o.touchEventsData.currentTranslate - t)));
            } else if (r) {
              const e = b ? w.length / f.grid.rows : w.length;
              o.slideTo(o.activeIndex + e, 0, !1, !0),
                (o.touchEventsData.currentTranslate = o.translate);
            }
          } else if (y.length > 0 && E)
            if (void 0 === t) {
              const e = o.slidesGrid[S],
                t = o.slidesGrid[S - C] - e;
              l
                ? o.setTranslate(o.translate - t)
                : (o.slideTo(S - C, 0, !1, !0),
                  r &&
                    ((o.touchEventsData.startTranslate =
                      o.touchEventsData.startTranslate - t),
                    (o.touchEventsData.currentTranslate =
                      o.touchEventsData.currentTranslate - t)));
            } else {
              const e = b ? y.length / f.grid.rows : y.length;
              o.slideTo(o.activeIndex - e, 0, !1, !0);
            }
        if (
          ((o.allowSlidePrev = c),
          (o.allowSlideNext = u),
          o.controller && o.controller.control && !a)
        ) {
          const e = {
            slideRealIndex: t,
            direction: i,
            setTranslate: r,
            activeSlideIndex: n,
            byController: !0,
          };
          Array.isArray(o.controller.control)
            ? o.controller.control.forEach((t) => {
                !t.destroyed &&
                  t.params.loop &&
                  t.loopFix({
                    ...e,
                    slideTo: t.params.slidesPerView === f.slidesPerView && s,
                  });
              })
            : o.controller.control instanceof o.constructor &&
              o.controller.control.params.loop &&
              o.controller.control.loopFix({
                ...e,
                slideTo:
                  o.controller.control.params.slidesPerView ===
                    f.slidesPerView && s,
              });
        }
        o.emit("loopFix");
      },
      loopDestroy: function () {
        const e = this,
          { params: t, slidesEl: s } = e;
        if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
        e.recalcSlides();
        const i = [];
        e.slides.forEach((e) => {
          const t =
            void 0 === e.swiperSlideIndex
              ? 1 * e.getAttribute("data-swiper-slide-index")
              : e.swiperSlideIndex;
          i[t] = e;
        }),
          e.slides.forEach((e) => {
            e.removeAttribute("data-swiper-slide-index");
          }),
          i.forEach((e) => {
            s.append(e);
          }),
          e.recalcSlides(),
          e.slideTo(e.realIndex, 0);
      },
    };
    function Q(e, t, s) {
      const i = S(),
        { params: r } = e,
        n = r.edgeSwipeDetection,
        a = r.edgeSwipeThreshold;
      return (
        !n ||
        !(s <= a || s >= i.innerWidth - a) ||
        ("prevent" === n && (t.preventDefault(), !0))
      );
    }
    function Z(e) {
      const t = this,
        s = w();
      let i = e;
      i.originalEvent && (i = i.originalEvent);
      const r = t.touchEventsData;
      if ("pointerdown" === i.type) {
        if (null !== r.pointerId && r.pointerId !== i.pointerId) return;
        r.pointerId = i.pointerId;
      } else
        "touchstart" === i.type &&
          1 === i.targetTouches.length &&
          (r.touchId = i.targetTouches[0].identifier);
      if ("touchstart" === i.type)
        return void Q(t, i, i.targetTouches[0].pageX);
      const { params: n, touches: a, enabled: l } = t;
      if (!l) return;
      if (!n.simulateTouch && "mouse" === i.pointerType) return;
      if (t.animating && n.preventInteractionOnTransition) return;
      !t.animating && n.cssMode && n.loop && t.loopFix();
      let o = i.target;
      if ("wrapper" === n.touchEventsTarget && !t.wrapperEl.contains(o)) return;
      if ("which" in i && 3 === i.which) return;
      if ("button" in i && i.button > 0) return;
      if (r.isTouched && r.isMoved) return;
      const d = !!n.noSwipingClass && "" !== n.noSwipingClass,
        c = i.composedPath ? i.composedPath() : i.path;
      d && i.target && i.target.shadowRoot && c && (o = c[0]);
      const u = n.noSwipingSelector
          ? n.noSwipingSelector
          : `.${n.noSwipingClass}`,
        p = !(!i.target || !i.target.shadowRoot);
      if (
        n.noSwiping &&
        (p
          ? (function (e, t) {
              return (
                void 0 === t && (t = this),
                (function t(s) {
                  if (!s || s === w() || s === S()) return null;
                  s.assignedSlot && (s = s.assignedSlot);
                  const i = s.closest(e);
                  return i || s.getRootNode
                    ? i || t(s.getRootNode().host)
                    : null;
                })(t)
              );
            })(u, o)
          : o.closest(u))
      )
        return void (t.allowClick = !0);
      if (n.swipeHandler && !o.closest(n.swipeHandler)) return;
      (a.currentX = i.pageX), (a.currentY = i.pageY);
      const f = a.currentX,
        m = a.currentY;
      if (!Q(t, i, f)) return;
      Object.assign(r, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0,
      }),
        (a.startX = f),
        (a.startY = m),
        (r.touchStartTime = T()),
        (t.allowClick = !0),
        t.updateSize(),
        (t.swipeDirection = void 0),
        n.threshold > 0 && (r.allowThresholdMove = !1);
      let h = !0;
      o.matches(r.focusableElements) &&
        ((h = !1), "SELECT" === o.nodeName && (r.isTouched = !1)),
        s.activeElement &&
          s.activeElement.matches(r.focusableElements) &&
          s.activeElement !== o &&
          s.activeElement.blur();
      const g = h && t.allowTouchMove && n.touchStartPreventDefault;
      (!n.touchStartForcePreventDefault && !g) ||
        o.isContentEditable ||
        i.preventDefault(),
        n.freeMode &&
          n.freeMode.enabled &&
          t.freeMode &&
          t.animating &&
          !n.cssMode &&
          t.freeMode.onTouchStart(),
        t.emit("touchStart", i);
    }
    function ee(e) {
      const t = w(),
        s = this,
        i = s.touchEventsData,
        { params: r, touches: n, rtlTranslate: a, enabled: l } = s;
      if (!l) return;
      if (!r.simulateTouch && "mouse" === e.pointerType) return;
      let o,
        d = e;
      if (
        (d.originalEvent && (d = d.originalEvent), "pointermove" === d.type)
      ) {
        if (null !== i.touchId) return;
        if (d.pointerId !== i.pointerId) return;
      }
      if ("touchmove" === d.type) {
        if (
          ((o = [...d.changedTouches].filter(
            (e) => e.identifier === i.touchId,
          )[0]),
          !o || o.identifier !== i.touchId)
        )
          return;
      } else o = d;
      if (!i.isTouched)
        return void (
          i.startMoving &&
          i.isScrolling &&
          s.emit("touchMoveOpposite", d)
        );
      const c = o.pageX,
        u = o.pageY;
      if (d.preventedByNestedSwiper) return (n.startX = c), void (n.startY = u);
      if (!s.allowTouchMove)
        return (
          d.target.matches(i.focusableElements) || (s.allowClick = !1),
          void (
            i.isTouched &&
            (Object.assign(n, {
              startX: c,
              startY: u,
              currentX: c,
              currentY: u,
            }),
            (i.touchStartTime = T()))
          )
        );
      if (r.touchReleaseOnEdges && !r.loop)
        if (s.isVertical()) {
          if (
            (u < n.startY && s.translate <= s.maxTranslate()) ||
            (u > n.startY && s.translate >= s.minTranslate())
          )
            return (i.isTouched = !1), void (i.isMoved = !1);
        } else if (
          (c < n.startX && s.translate <= s.maxTranslate()) ||
          (c > n.startX && s.translate >= s.minTranslate())
        )
          return;
      if (
        t.activeElement &&
        d.target === t.activeElement &&
        d.target.matches(i.focusableElements)
      )
        return (i.isMoved = !0), void (s.allowClick = !1);
      i.allowTouchCallbacks && s.emit("touchMove", d),
        (n.previousX = n.currentX),
        (n.previousY = n.currentY),
        (n.currentX = c),
        (n.currentY = u);
      const p = n.currentX - n.startX,
        f = n.currentY - n.startY;
      if (s.params.threshold && Math.sqrt(p ** 2 + f ** 2) < s.params.threshold)
        return;
      if (void 0 === i.isScrolling) {
        let e;
        (s.isHorizontal() && n.currentY === n.startY) ||
        (s.isVertical() && n.currentX === n.startX)
          ? (i.isScrolling = !1)
          : p * p + f * f >= 25 &&
            ((e = (180 * Math.atan2(Math.abs(f), Math.abs(p))) / Math.PI),
            (i.isScrolling = s.isHorizontal()
              ? e > r.touchAngle
              : 90 - e > r.touchAngle));
      }
      if (
        (i.isScrolling && s.emit("touchMoveOpposite", d),
        void 0 === i.startMoving &&
          ((n.currentX === n.startX && n.currentY === n.startY) ||
            (i.startMoving = !0)),
        i.isScrolling)
      )
        return void (i.isTouched = !1);
      if (!i.startMoving) return;
      (s.allowClick = !1),
        !r.cssMode && d.cancelable && d.preventDefault(),
        r.touchMoveStopPropagation && !r.nested && d.stopPropagation();
      let m = s.isHorizontal() ? p : f,
        h = s.isHorizontal()
          ? n.currentX - n.previousX
          : n.currentY - n.previousY;
      r.oneWayMovement &&
        ((m = Math.abs(m) * (a ? 1 : -1)), (h = Math.abs(h) * (a ? 1 : -1))),
        (n.diff = m),
        (m *= r.touchRatio),
        a && ((m = -m), (h = -h));
      const g = s.touchesDirection;
      (s.swipeDirection = m > 0 ? "prev" : "next"),
        (s.touchesDirection = h > 0 ? "prev" : "next");
      const v = s.params.loop && !r.cssMode,
        b =
          ("next" === s.touchesDirection && s.allowSlideNext) ||
          ("prev" === s.touchesDirection && s.allowSlidePrev);
      if (!i.isMoved) {
        if (
          (v && b && s.loopFix({ direction: s.swipeDirection }),
          (i.startTranslate = s.getTranslate()),
          s.setTransition(0),
          s.animating)
        ) {
          const e = new window.CustomEvent("transitionend", {
            bubbles: !0,
            cancelable: !0,
          });
          s.wrapperEl.dispatchEvent(e);
        }
        (i.allowMomentumBounce = !1),
          !r.grabCursor ||
            (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
            s.setGrabCursor(!0),
          s.emit("sliderFirstMove", d);
      }
      if (
        (new Date().getTime(),
        i.isMoved &&
          i.allowThresholdMove &&
          g !== s.touchesDirection &&
          v &&
          b &&
          Math.abs(m) >= 1)
      )
        return (
          Object.assign(n, {
            startX: c,
            startY: u,
            currentX: c,
            currentY: u,
            startTranslate: i.currentTranslate,
          }),
          (i.loopSwapReset = !0),
          void (i.startTranslate = i.currentTranslate)
        );
      s.emit("sliderMove", d),
        (i.isMoved = !0),
        (i.currentTranslate = m + i.startTranslate);
      let y = !0,
        S = r.resistanceRatio;
      if (
        (r.touchReleaseOnEdges && (S = 0),
        m > 0
          ? (v &&
              b &&
              i.allowThresholdMove &&
              i.currentTranslate >
                (r.centeredSlides
                  ? s.minTranslate() - s.slidesSizesGrid[s.activeIndex + 1]
                  : s.minTranslate()) &&
              s.loopFix({
                direction: "prev",
                setTranslate: !0,
                activeSlideIndex: 0,
              }),
            i.currentTranslate > s.minTranslate() &&
              ((y = !1),
              r.resistance &&
                (i.currentTranslate =
                  s.minTranslate() -
                  1 +
                  (-s.minTranslate() + i.startTranslate + m) ** S)))
          : m < 0 &&
            (v &&
              b &&
              i.allowThresholdMove &&
              i.currentTranslate <
                (r.centeredSlides
                  ? s.maxTranslate() +
                    s.slidesSizesGrid[s.slidesSizesGrid.length - 1]
                  : s.maxTranslate()) &&
              s.loopFix({
                direction: "next",
                setTranslate: !0,
                activeSlideIndex:
                  s.slides.length -
                  ("auto" === r.slidesPerView
                    ? s.slidesPerViewDynamic()
                    : Math.ceil(parseFloat(r.slidesPerView, 10))),
              }),
            i.currentTranslate < s.maxTranslate() &&
              ((y = !1),
              r.resistance &&
                (i.currentTranslate =
                  s.maxTranslate() +
                  1 -
                  (s.maxTranslate() - i.startTranslate - m) ** S))),
        y && (d.preventedByNestedSwiper = !0),
        !s.allowSlideNext &&
          "next" === s.swipeDirection &&
          i.currentTranslate < i.startTranslate &&
          (i.currentTranslate = i.startTranslate),
        !s.allowSlidePrev &&
          "prev" === s.swipeDirection &&
          i.currentTranslate > i.startTranslate &&
          (i.currentTranslate = i.startTranslate),
        s.allowSlidePrev ||
          s.allowSlideNext ||
          (i.currentTranslate = i.startTranslate),
        r.threshold > 0)
      ) {
        if (!(Math.abs(m) > r.threshold || i.allowThresholdMove))
          return void (i.currentTranslate = i.startTranslate);
        if (!i.allowThresholdMove)
          return (
            (i.allowThresholdMove = !0),
            (n.startX = n.currentX),
            (n.startY = n.currentY),
            (i.currentTranslate = i.startTranslate),
            void (n.diff = s.isHorizontal()
              ? n.currentX - n.startX
              : n.currentY - n.startY)
          );
      }
      r.followFinger &&
        !r.cssMode &&
        (((r.freeMode && r.freeMode.enabled && s.freeMode) ||
          r.watchSlidesProgress) &&
          (s.updateActiveIndex(), s.updateSlidesClasses()),
        r.freeMode &&
          r.freeMode.enabled &&
          s.freeMode &&
          s.freeMode.onTouchMove(),
        s.updateProgress(i.currentTranslate),
        s.setTranslate(i.currentTranslate));
    }
    function te(e) {
      const t = this,
        s = t.touchEventsData;
      let i,
        r = e;
      r.originalEvent && (r = r.originalEvent);
      if ("touchend" === r.type || "touchcancel" === r.type) {
        if (
          ((i = [...r.changedTouches].filter(
            (e) => e.identifier === s.touchId,
          )[0]),
          !i || i.identifier !== s.touchId)
        )
          return;
      } else {
        if (null !== s.touchId) return;
        if (r.pointerId !== s.pointerId) return;
        i = r;
      }
      if (
        ["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(
          r.type,
        )
      ) {
        if (
          !(
            ["pointercancel", "contextmenu"].includes(r.type) &&
            (t.browser.isSafari || t.browser.isWebView)
          )
        )
          return;
      }
      (s.pointerId = null), (s.touchId = null);
      const {
        params: n,
        touches: a,
        rtlTranslate: l,
        slidesGrid: o,
        enabled: d,
      } = t;
      if (!d) return;
      if (!n.simulateTouch && "mouse" === r.pointerType) return;
      if (
        (s.allowTouchCallbacks && t.emit("touchEnd", r),
        (s.allowTouchCallbacks = !1),
        !s.isTouched)
      )
        return (
          s.isMoved && n.grabCursor && t.setGrabCursor(!1),
          (s.isMoved = !1),
          void (s.startMoving = !1)
        );
      n.grabCursor &&
        s.isMoved &&
        s.isTouched &&
        (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
        t.setGrabCursor(!1);
      const c = T(),
        u = c - s.touchStartTime;
      if (t.allowClick) {
        const e = r.path || (r.composedPath && r.composedPath());
        t.updateClickedSlide((e && e[0]) || r.target, e),
          t.emit("tap click", r),
          u < 300 &&
            c - s.lastClickTime < 300 &&
            t.emit("doubleTap doubleClick", r);
      }
      if (
        ((s.lastClickTime = T()),
        E(() => {
          t.destroyed || (t.allowClick = !0);
        }),
        !s.isTouched ||
          !s.isMoved ||
          !t.swipeDirection ||
          (0 === a.diff && !s.loopSwapReset) ||
          (s.currentTranslate === s.startTranslate && !s.loopSwapReset))
      )
        return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
      let p;
      if (
        ((s.isTouched = !1),
        (s.isMoved = !1),
        (s.startMoving = !1),
        (p = n.followFinger
          ? l
            ? t.translate
            : -t.translate
          : -s.currentTranslate),
        n.cssMode)
      )
        return;
      if (n.freeMode && n.freeMode.enabled)
        return void t.freeMode.onTouchEnd({ currentPos: p });
      const f = p >= -t.maxTranslate() && !t.params.loop;
      let m = 0,
        h = t.slidesSizesGrid[0];
      for (
        let e = 0;
        e < o.length;
        e += e < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup
      ) {
        const t = e < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
        void 0 !== o[e + t]
          ? (f || (p >= o[e] && p < o[e + t])) &&
            ((m = e), (h = o[e + t] - o[e]))
          : (f || p >= o[e]) &&
            ((m = e), (h = o[o.length - 1] - o[o.length - 2]));
      }
      let g = null,
        v = null;
      n.rewind &&
        (t.isBeginning
          ? (v =
              n.virtual && n.virtual.enabled && t.virtual
                ? t.virtual.slides.length - 1
                : t.slides.length - 1)
          : t.isEnd && (g = 0));
      const b = (p - o[m]) / h,
        w = m < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
      if (u > n.longSwipesMs) {
        if (!n.longSwipes) return void t.slideTo(t.activeIndex);
        "next" === t.swipeDirection &&
          (b >= n.longSwipesRatio
            ? t.slideTo(n.rewind && t.isEnd ? g : m + w)
            : t.slideTo(m)),
          "prev" === t.swipeDirection &&
            (b > 1 - n.longSwipesRatio
              ? t.slideTo(m + w)
              : null !== v && b < 0 && Math.abs(b) > n.longSwipesRatio
                ? t.slideTo(v)
                : t.slideTo(m));
      } else {
        if (!n.shortSwipes) return void t.slideTo(t.activeIndex);
        t.navigation &&
        (r.target === t.navigation.nextEl || r.target === t.navigation.prevEl)
          ? r.target === t.navigation.nextEl
            ? t.slideTo(m + w)
            : t.slideTo(m)
          : ("next" === t.swipeDirection && t.slideTo(null !== g ? g : m + w),
            "prev" === t.swipeDirection && t.slideTo(null !== v ? v : m));
      }
    }
    function se() {
      const e = this,
        { params: t, el: s } = e;
      if (s && 0 === s.offsetWidth) return;
      t.breakpoints && e.setBreakpoint();
      const { allowSlideNext: i, allowSlidePrev: r, snapGrid: n } = e,
        a = e.virtual && e.params.virtual.enabled;
      (e.allowSlideNext = !0),
        (e.allowSlidePrev = !0),
        e.updateSize(),
        e.updateSlides(),
        e.updateSlidesClasses();
      const l = a && t.loop;
      !("auto" === t.slidesPerView || t.slidesPerView > 1) ||
      !e.isEnd ||
      e.isBeginning ||
      e.params.centeredSlides ||
      l
        ? e.params.loop && !a
          ? e.slideToLoop(e.realIndex, 0, !1, !0)
          : e.slideTo(e.activeIndex, 0, !1, !0)
        : e.slideTo(e.slides.length - 1, 0, !1, !0),
        e.autoplay &&
          e.autoplay.running &&
          e.autoplay.paused &&
          (clearTimeout(e.autoplay.resizeTimeout),
          (e.autoplay.resizeTimeout = setTimeout(() => {
            e.autoplay &&
              e.autoplay.running &&
              e.autoplay.paused &&
              e.autoplay.resume();
          }, 500))),
        (e.allowSlidePrev = r),
        (e.allowSlideNext = i),
        e.params.watchOverflow && n !== e.snapGrid && e.checkOverflow();
    }
    function ie(e) {
      const t = this;
      t.enabled &&
        (t.allowClick ||
          (t.params.preventClicks && e.preventDefault(),
          t.params.preventClicksPropagation &&
            t.animating &&
            (e.stopPropagation(), e.stopImmediatePropagation())));
    }
    function re() {
      const e = this,
        { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
      if (!i) return;
      let r;
      (e.previousTranslate = e.translate),
        e.isHorizontal()
          ? (e.translate = -t.scrollLeft)
          : (e.translate = -t.scrollTop),
        0 === e.translate && (e.translate = 0),
        e.updateActiveIndex(),
        e.updateSlidesClasses();
      const n = e.maxTranslate() - e.minTranslate();
      (r = 0 === n ? 0 : (e.translate - e.minTranslate()) / n),
        r !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
        e.emit("setTranslate", e.translate, !1);
    }
    function ne(e) {
      const t = this;
      R(t, e.target),
        t.params.cssMode ||
          ("auto" !== t.params.slidesPerView && !t.params.autoHeight) ||
          t.update();
    }
    function ae() {
      const e = this;
      e.documentTouchHandlerProceeded ||
        ((e.documentTouchHandlerProceeded = !0),
        e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
    }
    const le = (e, t) => {
      const s = w(),
        { params: i, el: r, wrapperEl: n, device: a } = e,
        l = !!i.nested,
        o = "on" === t ? "addEventListener" : "removeEventListener",
        d = t;
      s[o]("touchstart", e.onDocumentTouchStart, { passive: !1, capture: l }),
        r[o]("touchstart", e.onTouchStart, { passive: !1 }),
        r[o]("pointerdown", e.onTouchStart, { passive: !1 }),
        s[o]("touchmove", e.onTouchMove, { passive: !1, capture: l }),
        s[o]("pointermove", e.onTouchMove, { passive: !1, capture: l }),
        s[o]("touchend", e.onTouchEnd, { passive: !0 }),
        s[o]("pointerup", e.onTouchEnd, { passive: !0 }),
        s[o]("pointercancel", e.onTouchEnd, { passive: !0 }),
        s[o]("touchcancel", e.onTouchEnd, { passive: !0 }),
        s[o]("pointerout", e.onTouchEnd, { passive: !0 }),
        s[o]("pointerleave", e.onTouchEnd, { passive: !0 }),
        s[o]("contextmenu", e.onTouchEnd, { passive: !0 }),
        (i.preventClicks || i.preventClicksPropagation) &&
          r[o]("click", e.onClick, !0),
        i.cssMode && n[o]("scroll", e.onScroll),
        i.updateOnWindowResize
          ? e[d](
              a.ios || a.android
                ? "resize orientationchange observerUpdate"
                : "resize observerUpdate",
              se,
              !0,
            )
          : e[d]("observerUpdate", se, !0),
        r[o]("load", e.onLoad, { capture: !0 });
    };
    const oe = (e, t) => e.grid && t.grid && t.grid.rows > 1;
    var de = {
      init: !0,
      direction: "horizontal",
      oneWayMovement: !1,
      swiperElementNodeName: "SWIPER-CONTAINER",
      touchEventsTarget: "wrapper",
      initialSlide: 0,
      speed: 300,
      cssMode: !1,
      updateOnWindowResize: !0,
      resizeObserver: !0,
      nested: !1,
      createElements: !1,
      eventsPrefix: "swiper",
      enabled: !0,
      focusableElements:
        "input, select, option, textarea, button, video, label",
      width: null,
      height: null,
      preventInteractionOnTransition: !1,
      userAgent: null,
      url: null,
      edgeSwipeDetection: !1,
      edgeSwipeThreshold: 20,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: "slide",
      breakpoints: void 0,
      breakpointsBase: "window",
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      slidesPerGroupAuto: !1,
      centeredSlides: !1,
      centeredSlidesBounds: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      centerInsufficientSlides: !1,
      watchOverflow: !0,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 5,
      touchMoveStopPropagation: !1,
      touchStartPreventDefault: !0,
      touchStartForcePreventDefault: !1,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: 0.85,
      watchSlidesProgress: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      loop: !1,
      loopAddBlankSlides: !0,
      loopAdditionalSlides: 0,
      loopPreventsSliding: !0,
      rewind: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: "swiper-no-swiping",
      noSwipingSelector: null,
      passiveListeners: !0,
      maxBackfaceHiddenSlides: 10,
      containerModifierClass: "swiper-",
      slideClass: "swiper-slide",
      slideBlankClass: "swiper-slide-blank",
      slideActiveClass: "swiper-slide-active",
      slideVisibleClass: "swiper-slide-visible",
      slideFullyVisibleClass: "swiper-slide-fully-visible",
      slideNextClass: "swiper-slide-next",
      slidePrevClass: "swiper-slide-prev",
      wrapperClass: "swiper-wrapper",
      lazyPreloaderClass: "swiper-lazy-preloader",
      lazyPreloadPrevNext: 0,
      runCallbacksOnInit: !0,
      _emitClasses: !1,
    };
    function ce(e, t) {
      return function (s) {
        void 0 === s && (s = {});
        const i = Object.keys(s)[0],
          r = s[i];
        "object" == typeof r && null !== r
          ? (!0 === e[i] && (e[i] = { enabled: !0 }),
            "navigation" === i &&
              e[i] &&
              e[i].enabled &&
              !e[i].prevEl &&
              !e[i].nextEl &&
              (e[i].auto = !0),
            ["pagination", "scrollbar"].indexOf(i) >= 0 &&
              e[i] &&
              e[i].enabled &&
              !e[i].el &&
              (e[i].auto = !0),
            i in e && "enabled" in r
              ? ("object" != typeof e[i] ||
                  "enabled" in e[i] ||
                  (e[i].enabled = !0),
                e[i] || (e[i] = { enabled: !1 }),
                _(t, s))
              : _(t, s))
          : _(t, s);
      };
    }
    const ue = {
        eventsEmitter: H,
        update: Y,
        translate: X,
        transition: {
          setTransition: function (e, t) {
            const s = this;
            s.params.cssMode ||
              ((s.wrapperEl.style.transitionDuration = `${e}ms`),
              (s.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : "")),
              s.emit("setTransition", e, t);
          },
          transitionStart: function (e, t) {
            void 0 === e && (e = !0);
            const s = this,
              { params: i } = s;
            i.cssMode ||
              (i.autoHeight && s.updateAutoHeight(),
              U({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
          },
          transitionEnd: function (e, t) {
            void 0 === e && (e = !0);
            const s = this,
              { params: i } = s;
            (s.animating = !1),
              i.cssMode ||
                (s.setTransition(0),
                U({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
          },
        },
        slide: K,
        loop: J,
        grabCursor: {
          setGrabCursor: function (e) {
            const t = this;
            if (
              !t.params.simulateTouch ||
              (t.params.watchOverflow && t.isLocked) ||
              t.params.cssMode
            )
              return;
            const s =
              "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
            t.isElement && (t.__preventObserver__ = !0),
              (s.style.cursor = "move"),
              (s.style.cursor = e ? "grabbing" : "grab"),
              t.isElement &&
                requestAnimationFrame(() => {
                  t.__preventObserver__ = !1;
                });
          },
          unsetGrabCursor: function () {
            const e = this;
            (e.params.watchOverflow && e.isLocked) ||
              e.params.cssMode ||
              (e.isElement && (e.__preventObserver__ = !0),
              (e[
                "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
              ].style.cursor = ""),
              e.isElement &&
                requestAnimationFrame(() => {
                  e.__preventObserver__ = !1;
                }));
          },
        },
        events: {
          attachEvents: function () {
            const e = this,
              { params: t } = e;
            (e.onTouchStart = Z.bind(e)),
              (e.onTouchMove = ee.bind(e)),
              (e.onTouchEnd = te.bind(e)),
              (e.onDocumentTouchStart = ae.bind(e)),
              t.cssMode && (e.onScroll = re.bind(e)),
              (e.onClick = ie.bind(e)),
              (e.onLoad = ne.bind(e)),
              le(e, "on");
          },
          detachEvents: function () {
            le(this, "off");
          },
        },
        breakpoints: {
          setBreakpoint: function () {
            const e = this,
              { realIndex: t, initialized: s, params: i, el: r } = e,
              n = i.breakpoints;
            if (!n || (n && 0 === Object.keys(n).length)) return;
            const a = e.getBreakpoint(n, e.params.breakpointsBase, e.el);
            if (!a || e.currentBreakpoint === a) return;
            const l = (a in n ? n[a] : void 0) || e.originalParams,
              o = oe(e, i),
              d = oe(e, l),
              c = i.enabled;
            o && !d
              ? (r.classList.remove(
                  `${i.containerModifierClass}grid`,
                  `${i.containerModifierClass}grid-column`,
                ),
                e.emitContainerClasses())
              : !o &&
                d &&
                (r.classList.add(`${i.containerModifierClass}grid`),
                ((l.grid.fill && "column" === l.grid.fill) ||
                  (!l.grid.fill && "column" === i.grid.fill)) &&
                  r.classList.add(`${i.containerModifierClass}grid-column`),
                e.emitContainerClasses()),
              ["navigation", "pagination", "scrollbar"].forEach((t) => {
                if (void 0 === l[t]) return;
                const s = i[t] && i[t].enabled,
                  r = l[t] && l[t].enabled;
                s && !r && e[t].disable(), !s && r && e[t].enable();
              });
            const u = l.direction && l.direction !== i.direction,
              p = i.loop && (l.slidesPerView !== i.slidesPerView || u),
              f = i.loop;
            u && s && e.changeDirection(), _(e.params, l);
            const m = e.params.enabled,
              h = e.params.loop;
            Object.assign(e, {
              allowTouchMove: e.params.allowTouchMove,
              allowSlideNext: e.params.allowSlideNext,
              allowSlidePrev: e.params.allowSlidePrev,
            }),
              c && !m ? e.disable() : !c && m && e.enable(),
              (e.currentBreakpoint = a),
              e.emit("_beforeBreakpoint", l),
              s &&
                (p
                  ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides())
                  : !f && h
                    ? (e.loopCreate(t), e.updateSlides())
                    : f && !h && e.loopDestroy()),
              e.emit("breakpoint", l);
          },
          getBreakpoint: function (e, t, s) {
            if (
              (void 0 === t && (t = "window"), !e || ("container" === t && !s))
            )
              return;
            let i = !1;
            const r = S(),
              n = "window" === t ? r.innerHeight : s.clientHeight,
              a = Object.keys(e).map((e) => {
                if ("string" == typeof e && 0 === e.indexOf("@")) {
                  const t = parseFloat(e.substr(1));
                  return { value: n * t, point: e };
                }
                return { value: e, point: e };
              });
            a.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
            for (let e = 0; e < a.length; e += 1) {
              const { point: n, value: l } = a[e];
              "window" === t
                ? r.matchMedia(`(min-width: ${l}px)`).matches && (i = n)
                : l <= s.clientWidth && (i = n);
            }
            return i || "max";
          },
        },
        checkOverflow: {
          checkOverflow: function () {
            const e = this,
              { isLocked: t, params: s } = e,
              { slidesOffsetBefore: i } = s;
            if (i) {
              const t = e.slides.length - 1,
                s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
              e.isLocked = e.size > s;
            } else e.isLocked = 1 === e.snapGrid.length;
            !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
              !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
              t && t !== e.isLocked && (e.isEnd = !1),
              t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
          },
        },
        classes: {
          addClasses: function () {
            const e = this,
              { classNames: t, params: s, rtl: i, el: r, device: n } = e,
              a = (function (e, t) {
                const s = [];
                return (
                  e.forEach((e) => {
                    "object" == typeof e
                      ? Object.keys(e).forEach((i) => {
                          e[i] && s.push(t + i);
                        })
                      : "string" == typeof e && s.push(t + e);
                  }),
                  s
                );
              })(
                [
                  "initialized",
                  s.direction,
                  { "free-mode": e.params.freeMode && s.freeMode.enabled },
                  { autoheight: s.autoHeight },
                  { rtl: i },
                  { grid: s.grid && s.grid.rows > 1 },
                  {
                    "grid-column":
                      s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
                  },
                  { android: n.android },
                  { ios: n.ios },
                  { "css-mode": s.cssMode },
                  { centered: s.cssMode && s.centeredSlides },
                  { "watch-progress": s.watchSlidesProgress },
                ],
                s.containerModifierClass,
              );
            t.push(...a), r.classList.add(...t), e.emitContainerClasses();
          },
          removeClasses: function () {
            const { el: e, classNames: t } = this;
            e.classList.remove(...t), this.emitContainerClasses();
          },
        },
      },
      pe = {};
    class fe {
      constructor() {
        let e, t;
        for (var s = arguments.length, i = new Array(s), r = 0; r < s; r++)
          i[r] = arguments[r];
        1 === i.length &&
        i[0].constructor &&
        "Object" === Object.prototype.toString.call(i[0]).slice(8, -1)
          ? (t = i[0])
          : ([e, t] = i),
          t || (t = {}),
          (t = _({}, t)),
          e && !t.el && (t.el = e);
        const n = w();
        if (
          t.el &&
          "string" == typeof t.el &&
          n.querySelectorAll(t.el).length > 1
        ) {
          const e = [];
          return (
            n.querySelectorAll(t.el).forEach((s) => {
              const i = _({}, t, { el: s });
              e.push(new fe(i));
            }),
            e
          );
        }
        const a = this;
        (a.__swiper__ = !0),
          (a.support = V()),
          (a.device = q({ userAgent: t.userAgent })),
          (a.browser = F()),
          (a.eventsListeners = {}),
          (a.eventsAnyListeners = []),
          (a.modules = [...a.__modules__]),
          t.modules && Array.isArray(t.modules) && a.modules.push(...t.modules);
        const l = {};
        a.modules.forEach((e) => {
          e({
            params: t,
            swiper: a,
            extendParams: ce(t, l),
            on: a.on.bind(a),
            once: a.once.bind(a),
            off: a.off.bind(a),
            emit: a.emit.bind(a),
          });
        });
        const o = _({}, de, l);
        return (
          (a.params = _({}, o, pe, t)),
          (a.originalParams = _({}, a.params)),
          (a.passedParams = _({}, t)),
          a.params &&
            a.params.on &&
            Object.keys(a.params.on).forEach((e) => {
              a.on(e, a.params.on[e]);
            }),
          a.params && a.params.onAny && a.onAny(a.params.onAny),
          Object.assign(a, {
            enabled: a.params.enabled,
            el: e,
            classNames: [],
            slides: [],
            slidesGrid: [],
            snapGrid: [],
            slidesSizesGrid: [],
            isHorizontal: () => "horizontal" === a.params.direction,
            isVertical: () => "vertical" === a.params.direction,
            activeIndex: 0,
            realIndex: 0,
            isBeginning: !0,
            isEnd: !1,
            translate: 0,
            previousTranslate: 0,
            progress: 0,
            velocity: 0,
            animating: !1,
            cssOverflowAdjustment() {
              return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
            },
            allowSlideNext: a.params.allowSlideNext,
            allowSlidePrev: a.params.allowSlidePrev,
            touchEventsData: {
              isTouched: void 0,
              isMoved: void 0,
              allowTouchCallbacks: void 0,
              touchStartTime: void 0,
              isScrolling: void 0,
              currentTranslate: void 0,
              startTranslate: void 0,
              allowThresholdMove: void 0,
              focusableElements: a.params.focusableElements,
              lastClickTime: 0,
              clickTimeout: void 0,
              velocities: [],
              allowMomentumBounce: void 0,
              startMoving: void 0,
              pointerId: null,
              touchId: null,
            },
            allowClick: !0,
            allowTouchMove: a.params.allowTouchMove,
            touches: {
              startX: 0,
              startY: 0,
              currentX: 0,
              currentY: 0,
              diff: 0,
            },
            imagesToLoad: [],
            imagesLoaded: 0,
          }),
          a.emit("_swiper"),
          a.params.init && a.init(),
          a
        );
      }
      getDirectionLabel(e) {
        return this.isHorizontal()
          ? e
          : {
              width: "height",
              "margin-top": "margin-left",
              "margin-bottom ": "margin-right",
              "margin-left": "margin-top",
              "margin-right": "margin-bottom",
              "padding-left": "padding-top",
              "padding-right": "padding-bottom",
              marginRight: "marginBottom",
            }[e];
      }
      getSlideIndex(e) {
        const { slidesEl: t, params: s } = this,
          i = O(A(t, `.${s.slideClass}, swiper-slide`)[0]);
        return O(e) - i;
      }
      getSlideIndexByData(e) {
        return this.getSlideIndex(
          this.slides.filter(
            (t) => 1 * t.getAttribute("data-swiper-slide-index") === e,
          )[0],
        );
      }
      recalcSlides() {
        const { slidesEl: e, params: t } = this;
        this.slides = A(e, `.${t.slideClass}, swiper-slide`);
      }
      enable() {
        const e = this;
        e.enabled ||
          ((e.enabled = !0),
          e.params.grabCursor && e.setGrabCursor(),
          e.emit("enable"));
      }
      disable() {
        const e = this;
        e.enabled &&
          ((e.enabled = !1),
          e.params.grabCursor && e.unsetGrabCursor(),
          e.emit("disable"));
      }
      setProgress(e, t) {
        const s = this;
        e = Math.min(Math.max(e, 0), 1);
        const i = s.minTranslate(),
          r = (s.maxTranslate() - i) * e + i;
        s.translateTo(r, void 0 === t ? 0 : t),
          s.updateActiveIndex(),
          s.updateSlidesClasses();
      }
      emitContainerClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const t = e.el.className
          .split(" ")
          .filter(
            (t) =>
              0 === t.indexOf("swiper") ||
              0 === t.indexOf(e.params.containerModifierClass),
          );
        e.emit("_containerClasses", t.join(" "));
      }
      getSlideClasses(e) {
        const t = this;
        return t.destroyed
          ? ""
          : e.className
              .split(" ")
              .filter(
                (e) =>
                  0 === e.indexOf("swiper-slide") ||
                  0 === e.indexOf(t.params.slideClass),
              )
              .join(" ");
      }
      emitSlidesClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const t = [];
        e.slides.forEach((s) => {
          const i = e.getSlideClasses(s);
          t.push({ slideEl: s, classNames: i }), e.emit("_slideClass", s, i);
        }),
          e.emit("_slideClasses", t);
      }
      slidesPerViewDynamic(e, t) {
        void 0 === e && (e = "current"), void 0 === t && (t = !1);
        const {
          params: s,
          slides: i,
          slidesGrid: r,
          slidesSizesGrid: n,
          size: a,
          activeIndex: l,
        } = this;
        let o = 1;
        if ("number" == typeof s.slidesPerView) return s.slidesPerView;
        if (s.centeredSlides) {
          let e,
            t = i[l] ? Math.ceil(i[l].swiperSlideSize) : 0;
          for (let s = l + 1; s < i.length; s += 1)
            i[s] &&
              !e &&
              ((t += Math.ceil(i[s].swiperSlideSize)),
              (o += 1),
              t > a && (e = !0));
          for (let s = l - 1; s >= 0; s -= 1)
            i[s] &&
              !e &&
              ((t += i[s].swiperSlideSize), (o += 1), t > a && (e = !0));
        } else if ("current" === e)
          for (let e = l + 1; e < i.length; e += 1) {
            (t ? r[e] + n[e] - r[l] < a : r[e] - r[l] < a) && (o += 1);
          }
        else
          for (let e = l - 1; e >= 0; e -= 1) {
            r[l] - r[e] < a && (o += 1);
          }
        return o;
      }
      update() {
        const e = this;
        if (!e || e.destroyed) return;
        const { snapGrid: t, params: s } = e;
        function i() {
          const t = e.rtlTranslate ? -1 * e.translate : e.translate,
            s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
          e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
        }
        let r;
        if (
          (s.breakpoints && e.setBreakpoint(),
          [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t) => {
            t.complete && R(e, t);
          }),
          e.updateSize(),
          e.updateSlides(),
          e.updateProgress(),
          e.updateSlidesClasses(),
          s.freeMode && s.freeMode.enabled && !s.cssMode)
        )
          i(), s.autoHeight && e.updateAutoHeight();
        else {
          if (
            ("auto" === s.slidesPerView || s.slidesPerView > 1) &&
            e.isEnd &&
            !s.centeredSlides
          ) {
            const t =
              e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
            r = e.slideTo(t.length - 1, 0, !1, !0);
          } else r = e.slideTo(e.activeIndex, 0, !1, !0);
          r || i();
        }
        s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
          e.emit("update");
      }
      changeDirection(e, t) {
        void 0 === t && (t = !0);
        const s = this,
          i = s.params.direction;
        return (
          e || (e = "horizontal" === i ? "vertical" : "horizontal"),
          e === i ||
            ("horizontal" !== e && "vertical" !== e) ||
            (s.el.classList.remove(`${s.params.containerModifierClass}${i}`),
            s.el.classList.add(`${s.params.containerModifierClass}${e}`),
            s.emitContainerClasses(),
            (s.params.direction = e),
            s.slides.forEach((t) => {
              "vertical" === e ? (t.style.width = "") : (t.style.height = "");
            }),
            s.emit("changeDirection"),
            t && s.update()),
          s
        );
      }
      changeLanguageDirection(e) {
        const t = this;
        (t.rtl && "rtl" === e) ||
          (!t.rtl && "ltr" === e) ||
          ((t.rtl = "rtl" === e),
          (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
          t.rtl
            ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
              (t.el.dir = "rtl"))
            : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
              (t.el.dir = "ltr")),
          t.update());
      }
      mount(e) {
        const t = this;
        if (t.mounted) return !0;
        let s = e || t.params.el;
        if (("string" == typeof s && (s = document.querySelector(s)), !s))
          return !1;
        (s.swiper = t),
          s.parentNode &&
            s.parentNode.host &&
            s.parentNode.host.nodeName ===
              t.params.swiperElementNodeName.toUpperCase() &&
            (t.isElement = !0);
        const i = () =>
          `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
        let r = (() => {
          if (s && s.shadowRoot && s.shadowRoot.querySelector) {
            return s.shadowRoot.querySelector(i());
          }
          return A(s, i())[0];
        })();
        return (
          !r &&
            t.params.createElements &&
            ((r = k("div", t.params.wrapperClass)),
            s.append(r),
            A(s, `.${t.params.slideClass}`).forEach((e) => {
              r.append(e);
            })),
          Object.assign(t, {
            el: s,
            wrapperEl: r,
            slidesEl:
              t.isElement && !s.parentNode.host.slideSlots
                ? s.parentNode.host
                : r,
            hostEl: t.isElement ? s.parentNode.host : s,
            mounted: !0,
            rtl: "rtl" === s.dir.toLowerCase() || "rtl" === I(s, "direction"),
            rtlTranslate:
              "horizontal" === t.params.direction &&
              ("rtl" === s.dir.toLowerCase() || "rtl" === I(s, "direction")),
            wrongRTL: "-webkit-box" === I(r, "display"),
          }),
          !0
        );
      }
      init(e) {
        const t = this;
        if (t.initialized) return t;
        if (!1 === t.mount(e)) return t;
        t.emit("beforeInit"),
          t.params.breakpoints && t.setBreakpoint(),
          t.addClasses(),
          t.updateSize(),
          t.updateSlides(),
          t.params.watchOverflow && t.checkOverflow(),
          t.params.grabCursor && t.enabled && t.setGrabCursor(),
          t.params.loop && t.virtual && t.params.virtual.enabled
            ? t.slideTo(
                t.params.initialSlide + t.virtual.slidesBefore,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0,
              )
            : t.slideTo(
                t.params.initialSlide,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0,
              ),
          t.params.loop && t.loopCreate(),
          t.attachEvents();
        const s = [...t.el.querySelectorAll('[loading="lazy"]')];
        return (
          t.isElement &&
            s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
          s.forEach((e) => {
            e.complete
              ? R(t, e)
              : e.addEventListener("load", (e) => {
                  R(t, e.target);
                });
          }),
          W(t),
          (t.initialized = !0),
          W(t),
          t.emit("init"),
          t.emit("afterInit"),
          t
        );
      }
      destroy(e, t) {
        void 0 === e && (e = !0), void 0 === t && (t = !0);
        const s = this,
          { params: i, el: r, wrapperEl: n, slides: a } = s;
        return (
          void 0 === s.params ||
            s.destroyed ||
            (s.emit("beforeDestroy"),
            (s.initialized = !1),
            s.detachEvents(),
            i.loop && s.loopDestroy(),
            t &&
              (s.removeClasses(),
              r.removeAttribute("style"),
              n.removeAttribute("style"),
              a &&
                a.length &&
                a.forEach((e) => {
                  e.classList.remove(
                    i.slideVisibleClass,
                    i.slideFullyVisibleClass,
                    i.slideActiveClass,
                    i.slideNextClass,
                    i.slidePrevClass,
                  ),
                    e.removeAttribute("style"),
                    e.removeAttribute("data-swiper-slide-index");
                })),
            s.emit("destroy"),
            Object.keys(s.eventsListeners).forEach((e) => {
              s.off(e);
            }),
            !1 !== e &&
              ((s.el.swiper = null),
              (function (e) {
                const t = e;
                Object.keys(t).forEach((e) => {
                  try {
                    t[e] = null;
                  } catch (e) {}
                  try {
                    delete t[e];
                  } catch (e) {}
                });
              })(s)),
            (s.destroyed = !0)),
          null
        );
      }
      static extendDefaults(e) {
        _(pe, e);
      }
      static get extendedDefaults() {
        return pe;
      }
      static get defaults() {
        return de;
      }
      static installModule(e) {
        fe.prototype.__modules__ || (fe.prototype.__modules__ = []);
        const t = fe.prototype.__modules__;
        "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
      }
      static use(e) {
        return Array.isArray(e)
          ? (e.forEach((e) => fe.installModule(e)), fe)
          : (fe.installModule(e), fe);
      }
    }
    function me(e, t, s, i) {
      return (
        e.params.createElements &&
          Object.keys(i).forEach((r) => {
            if (!s[r] && !0 === s.auto) {
              let n = A(e.el, `.${i[r]}`)[0];
              n || ((n = k("div", i[r])), (n.className = i[r]), e.el.append(n)),
                (s[r] = n),
                (t[r] = n);
            }
          }),
        s
      );
    }
    function he(e) {
      let { swiper: t, extendParams: s, on: i, emit: r } = e;
      function n(e) {
        let s;
        return e &&
          "string" == typeof e &&
          t.isElement &&
          ((s = t.el.querySelector(e)), s)
          ? s
          : (e &&
              ("string" == typeof e && (s = [...document.querySelectorAll(e)]),
              t.params.uniqueNavElements &&
                "string" == typeof e &&
                s.length > 1 &&
                1 === t.el.querySelectorAll(e).length &&
                (s = t.el.querySelector(e))),
            e && !s ? e : s);
      }
      function a(e, s) {
        const i = t.params.navigation;
        (e = G(e)).forEach((e) => {
          e &&
            (e.classList[s ? "add" : "remove"](...i.disabledClass.split(" ")),
            "BUTTON" === e.tagName && (e.disabled = s),
            t.params.watchOverflow &&
              t.enabled &&
              e.classList[t.isLocked ? "add" : "remove"](i.lockClass));
        });
      }
      function l() {
        const { nextEl: e, prevEl: s } = t.navigation;
        if (t.params.loop) return a(s, !1), void a(e, !1);
        a(s, t.isBeginning && !t.params.rewind),
          a(e, t.isEnd && !t.params.rewind);
      }
      function o(e) {
        e.preventDefault(),
          (!t.isBeginning || t.params.loop || t.params.rewind) &&
            (t.slidePrev(), r("navigationPrev"));
      }
      function d(e) {
        e.preventDefault(),
          (!t.isEnd || t.params.loop || t.params.rewind) &&
            (t.slideNext(), r("navigationNext"));
      }
      function c() {
        const e = t.params.navigation;
        if (
          ((t.params.navigation = me(
            t,
            t.originalParams.navigation,
            t.params.navigation,
            { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" },
          )),
          !e.nextEl && !e.prevEl)
        )
          return;
        let s = n(e.nextEl),
          i = n(e.prevEl);
        Object.assign(t.navigation, { nextEl: s, prevEl: i }),
          (s = G(s)),
          (i = G(i));
        const r = (s, i) => {
          s && s.addEventListener("click", "next" === i ? d : o),
            !t.enabled && s && s.classList.add(...e.lockClass.split(" "));
        };
        s.forEach((e) => r(e, "next")), i.forEach((e) => r(e, "prev"));
      }
      function u() {
        let { nextEl: e, prevEl: s } = t.navigation;
        (e = G(e)), (s = G(s));
        const i = (e, s) => {
          e.removeEventListener("click", "next" === s ? d : o),
            e.classList.remove(...t.params.navigation.disabledClass.split(" "));
        };
        e.forEach((e) => i(e, "next")), s.forEach((e) => i(e, "prev"));
      }
      s({
        navigation: {
          nextEl: null,
          prevEl: null,
          hideOnClick: !1,
          disabledClass: "swiper-button-disabled",
          hiddenClass: "swiper-button-hidden",
          lockClass: "swiper-button-lock",
          navigationDisabledClass: "swiper-navigation-disabled",
        },
      }),
        (t.navigation = { nextEl: null, prevEl: null }),
        i("init", () => {
          !1 === t.params.navigation.enabled ? p() : (c(), l());
        }),
        i("toEdge fromEdge lock unlock", () => {
          l();
        }),
        i("destroy", () => {
          u();
        }),
        i("enable disable", () => {
          let { nextEl: e, prevEl: s } = t.navigation;
          (e = G(e)),
            (s = G(s)),
            t.enabled
              ? l()
              : [...e, ...s]
                  .filter((e) => !!e)
                  .forEach((e) =>
                    e.classList.add(t.params.navigation.lockClass),
                  );
        }),
        i("click", (e, s) => {
          let { nextEl: i, prevEl: n } = t.navigation;
          (i = G(i)), (n = G(n));
          const a = s.target;
          if (
            t.params.navigation.hideOnClick &&
            !n.includes(a) &&
            !i.includes(a)
          ) {
            if (
              t.pagination &&
              t.params.pagination &&
              t.params.pagination.clickable &&
              (t.pagination.el === a || t.pagination.el.contains(a))
            )
              return;
            let e;
            i.length
              ? (e = i[0].classList.contains(t.params.navigation.hiddenClass))
              : n.length &&
                (e = n[0].classList.contains(t.params.navigation.hiddenClass)),
              r(!0 === e ? "navigationShow" : "navigationHide"),
              [...i, ...n]
                .filter((e) => !!e)
                .forEach((e) =>
                  e.classList.toggle(t.params.navigation.hiddenClass),
                );
          }
        });
      const p = () => {
        t.el.classList.add(
          ...t.params.navigation.navigationDisabledClass.split(" "),
        ),
          u();
      };
      Object.assign(t.navigation, {
        enable: () => {
          t.el.classList.remove(
            ...t.params.navigation.navigationDisabledClass.split(" "),
          ),
            c(),
            l();
        },
        disable: p,
        update: l,
        init: c,
        destroy: u,
      });
    }
    function ge(e) {
      return (
        void 0 === e && (e = ""),
        `.${e
          .trim()
          .replace(/([\.:!+\/])/g, "\\$1")
          .replace(/ /g, ".")}`
      );
    }
    function ve(e) {
      let { swiper: t, extendParams: s, on: i, emit: r } = e;
      const n = "swiper-pagination";
      let a;
      s({
        pagination: {
          el: null,
          bulletElement: "span",
          clickable: !1,
          hideOnClick: !1,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: !1,
          type: "bullets",
          dynamicBullets: !1,
          dynamicMainBullets: 1,
          formatFractionCurrent: (e) => e,
          formatFractionTotal: (e) => e,
          bulletClass: `${n}-bullet`,
          bulletActiveClass: `${n}-bullet-active`,
          modifierClass: `${n}-`,
          currentClass: `${n}-current`,
          totalClass: `${n}-total`,
          hiddenClass: `${n}-hidden`,
          progressbarFillClass: `${n}-progressbar-fill`,
          progressbarOppositeClass: `${n}-progressbar-opposite`,
          clickableClass: `${n}-clickable`,
          lockClass: `${n}-lock`,
          horizontalClass: `${n}-horizontal`,
          verticalClass: `${n}-vertical`,
          paginationDisabledClass: `${n}-disabled`,
        },
      }),
        (t.pagination = { el: null, bullets: [] });
      let l = 0;
      function o() {
        return (
          !t.params.pagination.el ||
          !t.pagination.el ||
          (Array.isArray(t.pagination.el) && 0 === t.pagination.el.length)
        );
      }
      function d(e, s) {
        const { bulletActiveClass: i } = t.params.pagination;
        e &&
          (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) &&
          (e.classList.add(`${i}-${s}`),
          (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) &&
            e.classList.add(`${i}-${s}-${s}`));
      }
      function c(e) {
        const s = e.target.closest(ge(t.params.pagination.bulletClass));
        if (!s) return;
        e.preventDefault();
        const i = O(s) * t.params.slidesPerGroup;
        if (t.params.loop) {
          if (t.realIndex === i) return;
          t.slideToLoop(i);
        } else t.slideTo(i);
      }
      function u() {
        const e = t.rtl,
          s = t.params.pagination;
        if (o()) return;
        let i,
          n,
          c = t.pagination.el;
        c = G(c);
        const u =
            t.virtual && t.params.virtual.enabled
              ? t.virtual.slides.length
              : t.slides.length,
          p = t.params.loop
            ? Math.ceil(u / t.params.slidesPerGroup)
            : t.snapGrid.length;
        if (
          (t.params.loop
            ? ((n = t.previousRealIndex || 0),
              (i =
                t.params.slidesPerGroup > 1
                  ? Math.floor(t.realIndex / t.params.slidesPerGroup)
                  : t.realIndex))
            : void 0 !== t.snapIndex
              ? ((i = t.snapIndex), (n = t.previousSnapIndex))
              : ((n = t.previousIndex || 0), (i = t.activeIndex || 0)),
          "bullets" === s.type &&
            t.pagination.bullets &&
            t.pagination.bullets.length > 0)
        ) {
          const r = t.pagination.bullets;
          let o, u, p;
          if (
            (s.dynamicBullets &&
              ((a = D(r[0], t.isHorizontal() ? "width" : "height", !0)),
              c.forEach((e) => {
                e.style[t.isHorizontal() ? "width" : "height"] =
                  a * (s.dynamicMainBullets + 4) + "px";
              }),
              s.dynamicMainBullets > 1 &&
                void 0 !== n &&
                ((l += i - (n || 0)),
                l > s.dynamicMainBullets - 1
                  ? (l = s.dynamicMainBullets - 1)
                  : l < 0 && (l = 0)),
              (o = Math.max(i - l, 0)),
              (u = o + (Math.min(r.length, s.dynamicMainBullets) - 1)),
              (p = (u + o) / 2)),
            r.forEach((e) => {
              const t = [
                ...[
                  "",
                  "-next",
                  "-next-next",
                  "-prev",
                  "-prev-prev",
                  "-main",
                ].map((e) => `${s.bulletActiveClass}${e}`),
              ]
                .map((e) =>
                  "string" == typeof e && e.includes(" ") ? e.split(" ") : e,
                )
                .flat();
              e.classList.remove(...t);
            }),
            c.length > 1)
          )
            r.forEach((e) => {
              const r = O(e);
              r === i
                ? e.classList.add(...s.bulletActiveClass.split(" "))
                : t.isElement && e.setAttribute("part", "bullet"),
                s.dynamicBullets &&
                  (r >= o &&
                    r <= u &&
                    e.classList.add(
                      ...`${s.bulletActiveClass}-main`.split(" "),
                    ),
                  r === o && d(e, "prev"),
                  r === u && d(e, "next"));
            });
          else {
            const e = r[i];
            if (
              (e && e.classList.add(...s.bulletActiveClass.split(" ")),
              t.isElement &&
                r.forEach((e, t) => {
                  e.setAttribute("part", t === i ? "bullet-active" : "bullet");
                }),
              s.dynamicBullets)
            ) {
              const e = r[o],
                t = r[u];
              for (let e = o; e <= u; e += 1)
                r[e] &&
                  r[e].classList.add(
                    ...`${s.bulletActiveClass}-main`.split(" "),
                  );
              d(e, "prev"), d(t, "next");
            }
          }
          if (s.dynamicBullets) {
            const i = Math.min(r.length, s.dynamicMainBullets + 4),
              n = (a * i - a) / 2 - p * a,
              l = e ? "right" : "left";
            r.forEach((e) => {
              e.style[t.isHorizontal() ? l : "top"] = `${n}px`;
            });
          }
        }
        c.forEach((e, n) => {
          if (
            ("fraction" === s.type &&
              (e.querySelectorAll(ge(s.currentClass)).forEach((e) => {
                e.textContent = s.formatFractionCurrent(i + 1);
              }),
              e.querySelectorAll(ge(s.totalClass)).forEach((e) => {
                e.textContent = s.formatFractionTotal(p);
              })),
            "progressbar" === s.type)
          ) {
            let r;
            r = s.progressbarOpposite
              ? t.isHorizontal()
                ? "vertical"
                : "horizontal"
              : t.isHorizontal()
                ? "horizontal"
                : "vertical";
            const n = (i + 1) / p;
            let a = 1,
              l = 1;
            "horizontal" === r ? (a = n) : (l = n),
              e.querySelectorAll(ge(s.progressbarFillClass)).forEach((e) => {
                (e.style.transform = `translate3d(0,0,0) scaleX(${a}) scaleY(${l})`),
                  (e.style.transitionDuration = `${t.params.speed}ms`);
              });
          }
          "custom" === s.type && s.renderCustom
            ? ((e.innerHTML = s.renderCustom(t, i + 1, p)),
              0 === n && r("paginationRender", e))
            : (0 === n && r("paginationRender", e), r("paginationUpdate", e)),
            t.params.watchOverflow &&
              t.enabled &&
              e.classList[t.isLocked ? "add" : "remove"](s.lockClass);
        });
      }
      function p() {
        const e = t.params.pagination;
        if (o()) return;
        const s =
          t.virtual && t.params.virtual.enabled
            ? t.virtual.slides.length
            : t.grid && t.params.grid.rows > 1
              ? t.slides.length / Math.ceil(t.params.grid.rows)
              : t.slides.length;
        let i = t.pagination.el;
        i = G(i);
        let n = "";
        if ("bullets" === e.type) {
          let i = t.params.loop
            ? Math.ceil(s / t.params.slidesPerGroup)
            : t.snapGrid.length;
          t.params.freeMode && t.params.freeMode.enabled && i > s && (i = s);
          for (let s = 0; s < i; s += 1)
            e.renderBullet
              ? (n += e.renderBullet.call(t, s, e.bulletClass))
              : (n += `<${e.bulletElement} ${t.isElement ? 'part="bullet"' : ""} class="${e.bulletClass}"></${e.bulletElement}>`);
        }
        "fraction" === e.type &&
          (n = e.renderFraction
            ? e.renderFraction.call(t, e.currentClass, e.totalClass)
            : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
          "progressbar" === e.type &&
            (n = e.renderProgressbar
              ? e.renderProgressbar.call(t, e.progressbarFillClass)
              : `<span class="${e.progressbarFillClass}"></span>`),
          (t.pagination.bullets = []),
          i.forEach((s) => {
            "custom" !== e.type && (s.innerHTML = n || ""),
              "bullets" === e.type &&
                t.pagination.bullets.push(
                  ...s.querySelectorAll(ge(e.bulletClass)),
                );
          }),
          "custom" !== e.type && r("paginationRender", i[0]);
      }
      function f() {
        t.params.pagination = me(
          t,
          t.originalParams.pagination,
          t.params.pagination,
          { el: "swiper-pagination" },
        );
        const e = t.params.pagination;
        if (!e.el) return;
        let s;
        "string" == typeof e.el &&
          t.isElement &&
          (s = t.el.querySelector(e.el)),
          s ||
            "string" != typeof e.el ||
            (s = [...document.querySelectorAll(e.el)]),
          s || (s = e.el),
          s &&
            0 !== s.length &&
            (t.params.uniqueNavElements &&
              "string" == typeof e.el &&
              Array.isArray(s) &&
              s.length > 1 &&
              ((s = [...t.el.querySelectorAll(e.el)]),
              s.length > 1 &&
                (s = s.filter((e) => z(e, ".swiper")[0] === t.el)[0])),
            Array.isArray(s) && 1 === s.length && (s = s[0]),
            Object.assign(t.pagination, { el: s }),
            (s = G(s)),
            s.forEach((s) => {
              "bullets" === e.type &&
                e.clickable &&
                s.classList.add(...(e.clickableClass || "").split(" ")),
                s.classList.add(e.modifierClass + e.type),
                s.classList.add(
                  t.isHorizontal() ? e.horizontalClass : e.verticalClass,
                ),
                "bullets" === e.type &&
                  e.dynamicBullets &&
                  (s.classList.add(`${e.modifierClass}${e.type}-dynamic`),
                  (l = 0),
                  e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
                "progressbar" === e.type &&
                  e.progressbarOpposite &&
                  s.classList.add(e.progressbarOppositeClass),
                e.clickable && s.addEventListener("click", c),
                t.enabled || s.classList.add(e.lockClass);
            }));
      }
      function m() {
        const e = t.params.pagination;
        if (o()) return;
        let s = t.pagination.el;
        s &&
          ((s = G(s)),
          s.forEach((s) => {
            s.classList.remove(e.hiddenClass),
              s.classList.remove(e.modifierClass + e.type),
              s.classList.remove(
                t.isHorizontal() ? e.horizontalClass : e.verticalClass,
              ),
              e.clickable &&
                (s.classList.remove(...(e.clickableClass || "").split(" ")),
                s.removeEventListener("click", c));
          })),
          t.pagination.bullets &&
            t.pagination.bullets.forEach((t) =>
              t.classList.remove(...e.bulletActiveClass.split(" ")),
            );
      }
      i("changeDirection", () => {
        if (!t.pagination || !t.pagination.el) return;
        const e = t.params.pagination;
        let { el: s } = t.pagination;
        (s = G(s)),
          s.forEach((s) => {
            s.classList.remove(e.horizontalClass, e.verticalClass),
              s.classList.add(
                t.isHorizontal() ? e.horizontalClass : e.verticalClass,
              );
          });
      }),
        i("init", () => {
          !1 === t.params.pagination.enabled ? h() : (f(), p(), u());
        }),
        i("activeIndexChange", () => {
          void 0 === t.snapIndex && u();
        }),
        i("snapIndexChange", () => {
          u();
        }),
        i("snapGridLengthChange", () => {
          p(), u();
        }),
        i("destroy", () => {
          m();
        }),
        i("enable disable", () => {
          let { el: e } = t.pagination;
          e &&
            ((e = G(e)),
            e.forEach((e) =>
              e.classList[t.enabled ? "remove" : "add"](
                t.params.pagination.lockClass,
              ),
            ));
        }),
        i("lock unlock", () => {
          u();
        }),
        i("click", (e, s) => {
          const i = s.target,
            n = G(t.pagination.el);
          if (
            t.params.pagination.el &&
            t.params.pagination.hideOnClick &&
            n &&
            n.length > 0 &&
            !i.classList.contains(t.params.pagination.bulletClass)
          ) {
            if (
              t.navigation &&
              ((t.navigation.nextEl && i === t.navigation.nextEl) ||
                (t.navigation.prevEl && i === t.navigation.prevEl))
            )
              return;
            const e = n[0].classList.contains(t.params.pagination.hiddenClass);
            r(!0 === e ? "paginationShow" : "paginationHide"),
              n.forEach((e) =>
                e.classList.toggle(t.params.pagination.hiddenClass),
              );
          }
        });
      const h = () => {
        t.el.classList.add(t.params.pagination.paginationDisabledClass);
        let { el: e } = t.pagination;
        e &&
          ((e = G(e)),
          e.forEach((e) =>
            e.classList.add(t.params.pagination.paginationDisabledClass),
          )),
          m();
      };
      Object.assign(t.pagination, {
        enable: () => {
          t.el.classList.remove(t.params.pagination.paginationDisabledClass);
          let { el: e } = t.pagination;
          e &&
            ((e = G(e)),
            e.forEach((e) =>
              e.classList.remove(t.params.pagination.paginationDisabledClass),
            )),
            f(),
            p(),
            u();
        },
        disable: h,
        render: p,
        update: u,
        init: f,
        destroy: m,
      });
    }
    function be() {
      let e = document.querySelectorAll(
        '[class*="__swiper"]:not(.swiper-wrapper)',
      );
      e &&
        e.forEach((e) => {
          e.parentElement.classList.add("swiper"),
            e.classList.add("swiper-wrapper");
          for (const t of e.children) t.classList.add("swiper-slide");
        });
    }
    Object.keys(ue).forEach((e) => {
      Object.keys(ue[e]).forEach((t) => {
        fe.prototype[t] = ue[e][t];
      });
    }),
      fe.use([
        function (e) {
          let { swiper: t, on: s, emit: i } = e;
          const r = S();
          let n = null,
            a = null;
          const l = () => {
              t &&
                !t.destroyed &&
                t.initialized &&
                (i("beforeResize"), i("resize"));
            },
            o = () => {
              t && !t.destroyed && t.initialized && i("orientationchange");
            };
          s("init", () => {
            t.params.resizeObserver && void 0 !== r.ResizeObserver
              ? t &&
                !t.destroyed &&
                t.initialized &&
                ((n = new ResizeObserver((e) => {
                  a = r.requestAnimationFrame(() => {
                    const { width: s, height: i } = t;
                    let r = s,
                      n = i;
                    e.forEach((e) => {
                      let { contentBoxSize: s, contentRect: i, target: a } = e;
                      (a && a !== t.el) ||
                        ((r = i ? i.width : (s[0] || s).inlineSize),
                        (n = i ? i.height : (s[0] || s).blockSize));
                    }),
                      (r === s && n === i) || l();
                  });
                })),
                n.observe(t.el))
              : (r.addEventListener("resize", l),
                r.addEventListener("orientationchange", o));
          }),
            s("destroy", () => {
              a && r.cancelAnimationFrame(a),
                n && n.unobserve && t.el && (n.unobserve(t.el), (n = null)),
                r.removeEventListener("resize", l),
                r.removeEventListener("orientationchange", o);
            });
        },
        function (e) {
          let { swiper: t, extendParams: s, on: i, emit: r } = e;
          const n = [],
            a = S(),
            l = function (e, s) {
              void 0 === s && (s = {});
              const i = new (a.MutationObserver || a.WebkitMutationObserver)(
                (e) => {
                  if (t.__preventObserver__) return;
                  if (1 === e.length) return void r("observerUpdate", e[0]);
                  const s = function () {
                    r("observerUpdate", e[0]);
                  };
                  a.requestAnimationFrame
                    ? a.requestAnimationFrame(s)
                    : a.setTimeout(s, 0);
                },
              );
              i.observe(e, {
                attributes: void 0 === s.attributes || s.attributes,
                childList: void 0 === s.childList || s.childList,
                characterData: void 0 === s.characterData || s.characterData,
              }),
                n.push(i);
            };
          s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
            i("init", () => {
              if (t.params.observer) {
                if (t.params.observeParents) {
                  const e = z(t.hostEl);
                  for (let t = 0; t < e.length; t += 1) l(e[t]);
                }
                l(t.hostEl, { childList: t.params.observeSlideChildren }),
                  l(t.wrapperEl, { attributes: !1 });
              }
            }),
            i("destroy", () => {
              n.forEach((e) => {
                e.disconnect();
              }),
                n.splice(0, n.length);
            });
        },
      ]);
    const we = (e, t, s, i) => {
      let r;
      e = window.matchMedia(e);
      const n = function () {
        return e.matches
          ? ((r = new fe(t, s)), void (i && i(r)))
          : void (void 0 !== r && r.destroy(!0, !0));
      };
      e.addEventListener("change", n), n();
    };
    window.addEventListener("load", function (e) {
      be(),
        we("(max-width: 1280px)", ".service__slider", {
          modules: [ve],
          slidesPerView: 1,
          speed: 800,
          pagination: { el: ".service__pagination", clickable: !0 },
          breakpoints: {
            0: { slidesPerView: 1, spaceBetween: 30 },
            768: { slidesPerView: 2, spaceBetween: 30 },
          },
          on: {},
        }),
        document.querySelector(".gallery__swiper") &&
          new fe(".gallery__slider", {
            modules: [he],
            spaceBetween: 20,
            speed: 800,
            navigation: {
              nextEl: ".gallery__nav .gallery__nav-item_next",
              prevEl: ".gallery__nav .gallery__nav-item_prev",
            },
            breakpoints: {
              0: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              992: { slidesPerView: "auto", spaceBetween: 20 },
            },
            on: {},
          }),
        document.querySelector(".reviews__swiper") &&
          new fe(".reviews__slider", {
            modules: [ve],
            spaceBetween: 20,
            speed: 800,
            pagination: { el: ".reviews__pagination", clickable: !0 },
            breakpoints: {
              0: { slidesPerView: 1, spaceBetween: 30 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1280: { slidesPerView: 3, spaceBetween: 30 },
            },
            on: {},
          });
    });
    new (s(24))({
      elements_selector: "[data-src],[data-srcset]",
      class_loaded: "_lazy-loaded",
      use_native: !0,
    });
    (window.FLS = !0),
      (function (e) {
        let t = new Image();
        (t.onload = t.onerror =
          function () {
            e(2 == t.height);
          }),
          (t.src =
            "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
      })(function (e) {
        let t = !0 === e ? "webp" : "no-webp";
        document.documentElement.classList.add(t);
      }),
      window.addEventListener("load", function () {
        setTimeout(function () {
          document.documentElement.classList.add("loaded");
        }, 0);
      }),
      (function () {
        let e = document.querySelector(".burger");
        e &&
          e.addEventListener("click", function (e) {
            c && (t(), document.documentElement.classList.toggle("menu-open"));
          });
      })(),
      (function () {
        const e = document.querySelectorAll("[data-tabs]");
        let t = [];
        if (e.length > 0) {
          const r = (function () {
            if (location.hash) return location.hash.replace("#", "");
          })();
          r && r.startsWith("tab-") && (t = r.replace("tab-", "").split("-")),
            e.forEach((e, s) => {
              e.classList.add("_tab-init"),
                e.setAttribute("data-tabs-index", s),
                e.addEventListener("click", i),
                (function (e) {
                  let s = e.querySelectorAll("[data-tabs-titles]>*"),
                    i = e.querySelectorAll("[data-tabs-body]>*"),
                    r = e.querySelectorAll("[data-tabs-images]>*");
                  const n = e.dataset.tabsIndex,
                    a = t[0] == n;
                  if (a) {
                    const t = e.querySelector(
                      "[data-tabs-titles]>._tab-active",
                    );
                    t && t.classList.remove("_tab-active");
                  }
                  i.length &&
                    ((r = Array.from(r).filter(
                      (t) => t.closest("[data-tabs]") === e,
                    )),
                    (i = Array.from(i).filter(
                      (t) => t.closest("[data-tabs]") === e,
                    )),
                    (s = Array.from(s).filter(
                      (t) => t.closest("[data-tabs]") === e,
                    )),
                    i.forEach((e, i) => {
                      s[i].setAttribute("data-tabs-title", ""),
                        e.setAttribute("data-tabs-item", ""),
                        a && i == t[1] && s[i].classList.add("_tab-active"),
                        (e.hidden = !s[i].classList.contains("_tab-active"));
                    }),
                    r.forEach((e, i) => {
                      s[i].setAttribute("data-tabs-title", ""),
                        e.setAttribute("data-tabs-image", ""),
                        a && i == t[1] && s[i].classList.add("_tab-active"),
                        (e.hidden = !s[i].classList.contains("_tab-active"));
                    }));
                })(e);
            });
          let n = f(e, "tabs");
          n &&
            n.length &&
            n.forEach((e) => {
              e.matchMedia.addEventListener("change", function () {
                s(e.itemsArray, e.matchMedia);
              }),
                s(e.itemsArray, e.matchMedia);
            });
        }
        function s(e, t) {
          e.forEach((e) => {
            let s = (e = e.item).querySelector("[data-tabs-titles]"),
              i = e.querySelectorAll("[data-tabs-title]"),
              r = e.querySelector("[data-tabs-body]"),
              n = e.querySelectorAll("[data-tabs-item]");
            (i = Array.from(i).filter((t) => t.closest("[data-tabs]") === e)),
              (n = Array.from(n).filter((t) => t.closest("[data-tabs]") === e)),
              n.forEach((n, a) => {
                t.matches
                  ? (r.append(i[a]),
                    r.append(n),
                    e.classList.add("_tab-spoller"))
                  : (s.append(i[a]), e.classList.remove("_tab-spoller"));
              });
          });
        }
        function i(e) {
          const t = e.target;
          if (t.closest("[data-tabs-title]")) {
            const s = t.closest("[data-tabs-title]"),
              i = s.closest("[data-tabs]");
            if (
              !s.classList.contains("_tab-active") &&
              !i.querySelector("._slide")
            ) {
              let e = i.querySelectorAll("[data-tabs-title]._tab-active");
              e.length &&
                (e = Array.from(e).filter(
                  (e) => e.closest("[data-tabs]") === i,
                )),
                e.length && e[0].classList.remove("_tab-active"),
                s.classList.add("_tab-active"),
                (function (e) {
                  let t = e.querySelectorAll("[data-tabs-title]"),
                    s = e.querySelectorAll("[data-tabs-item]"),
                    i = e.querySelectorAll("[data-tabs-image]");
                  const r = e.dataset.tabsIndex,
                    n = (function (e) {
                      if (e.hasAttribute("data-tabs-animate"))
                        return e.dataset.tabsAnimate > 0
                          ? Number(e.dataset.tabsAnimate)
                          : 500;
                    })(e);
                  if (s.length > 0) {
                    const a = e.hasAttribute("data-tabs-hash");
                    (s = Array.from(s).filter(
                      (t) => t.closest("[data-tabs]") === e,
                    )),
                      (t = Array.from(t).filter(
                        (t) => t.closest("[data-tabs]") === e,
                      )),
                      (i = Array.from(i).filter(
                        (t) => t.closest("[data-tabs]") === e,
                      )),
                      s.forEach((e, s) => {
                        t[s].classList.contains("_tab-active")
                          ? (n ? d(e, n) : (e.hidden = !1),
                            a && !e.closest(".popup") && l(`tab-${r}-${s}`))
                          : n
                            ? o(e, n)
                            : (e.hidden = !0);
                      }),
                      i.forEach((e, s) => {
                        t[s].classList.contains("_tab-active")
                          ? (n ? d(e, n) : (e.hidden = !1),
                            a && !e.closest(".popup") && l(`tab-${r}-${s}`))
                          : n
                            ? o(e, n)
                            : (e.hidden = !0);
                      });
                  }
                })(i);
            }
            e.preventDefault();
          }
        }
      })(),
      (function () {
        const e = document.querySelectorAll(
          "input[placeholder],textarea[placeholder]",
        );
        e.length &&
          e.forEach((e) => {
            e.dataset.placeholder = e.placeholder;
          }),
          document.body.addEventListener("focusin", function (e) {
            const t = e.target;
            ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
              (t.dataset.placeholder && (t.placeholder = ""),
              t.classList.add("_form-focus"),
              t.parentElement.classList.add("_form-focus"),
              h.removeError(t));
          }),
          document.body.addEventListener("focusout", function (e) {
            const t = e.target;
            ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
              (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
              t.classList.remove("_form-focus"),
              t.parentElement.classList.remove("_form-focus"),
              t.hasAttribute("data-validate") && h.validateInput(t));
          });
      })(),
      (function (t) {
        e.popup && e.popup.open("some");
        const s = document.forms;
        if (s.length)
          for (const e of s)
            e.addEventListener("submit", function (e) {
              i(e.target, e);
            }),
              e.addEventListener("reset", function (e) {
                const t = e.target;
                h.formClean(t);
              });
        async function i(e, s) {
          if (0 === (t ? h.getErrors(e) : 0)) {
            if (e.hasAttribute("data-ajax")) {
              s.preventDefault();
              const t = e.getAttribute("action")
                  ? e.getAttribute("action").trim()
                  : "#",
                i = e.getAttribute("method")
                  ? e.getAttribute("method").trim()
                  : "GET",
                n = new FormData(e);
              e.classList.add("_sending");
              const a = await fetch(t, { method: i, body: n });
              if (a.ok) {
                await a.json();
                e.classList.remove("_sending"), r(e);
              } else alert("Ошибка"), e.classList.remove("_sending");
            } else e.hasAttribute("data-dev") && (s.preventDefault(), r(e));
          } else {
            s.preventDefault();
            const t = e.querySelector("._form-error");
            t && e.hasAttribute("data-goto-error") && m(t, !0, 1e3);
          }
        }
        function r(t) {
          document.dispatchEvent(
            new CustomEvent("formSent", { detail: { form: t } }),
          ),
            setTimeout(() => {
              if (e.popup) {
                const s = t.dataset.popupMessage;
                s && e.popup.open(s);
              }
            }, 0),
            h.formClean(t),
            p(`[Формы]: ${"Форма отправлена!"}`);
        }
      })(!0);
  })();
})();
