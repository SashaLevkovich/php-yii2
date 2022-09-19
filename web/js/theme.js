"use strict";
/*-----------------------------------------------
|   Utilities
-----------------------------------------------*/

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var utils = function ($) {
  var Utils = {
    $window: $(window),
    $document: $(document),
    $html: $("html"),
    $body: $("body"),
    $main: $("main"),
    location: window.location,
    nua: navigator.userAgent,
    navigate: function navigate(url) {
      for (var _len = arguments.length, urlArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        urlArgs[_key - 1] = arguments[_key];
      }

      this.location.href = formatStr.apply(void 0, [url].concat(urlArgs));
    },
    isIterableArray: function isIterableArray(array) {
      return Array.isArray(array) && !!array.length;
    },
    setCookie: function setCookie(name, value, expire) {
      var expires = new Date();
      expires.setTime(expires.getTime() + expire);
      document.cookie = name + "=" + value + ";expires=" + expires.toUTCString();
    },
    getCookie: function getCookie(name) {
      var keyValue = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
      return keyValue ? keyValue[2] : keyValue;
    },
    setSpinner: function setSpinner(value) {
      if (value) {
        $('#global-spinner').show();
      } else {
        $('#global-spinner').hide();
      }
    },
    openNameConfirmActionModal: function openNameConfirmActionModal(url, action, name) {
      var modal$ = $('#global-name-confirm-action-modal');
      var actionHint$ = modal$.find('.action-hint');
      var originalName$ = modal$.find('.original-name');
      var template = actionHint$.data().template;
      var actionHint = formatStr(template, action, name);
      actionHint$.text(actionHint);
      originalName$.val(name);
      modal$.find('form').attr('action', url);
      modal$.modal('show');
    },
    breakpoints: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1540
    },
    getBreakpoint: function getBreakpoint($element) {
      var classes = $element.attr("class");
      var breakpoint;

      if (classes) {
        breakpoint = this.breakpoints[classes.split(" ").filter(function (cls) {
          return cls.indexOf("navbar-expand-") === 0;
        }).pop().split("-").pop()];
      }

      return breakpoint;
    }
  };

  function formatStr(str) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return str.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  }

  ;
  return Utils;
}(jQuery);

'use strict';
/*-----------------------------------------------
|   Top navigation opacity on scroll
-----------------------------------------------*/


utils.$document.ready(function () {
  var $navbar = $('.navbar-theme');

  if ($navbar.length) {
    var windowHeight = utils.$window.height();
    utils.$window.scroll(function () {
      var scrollTop = utils.$window.scrollTop();
      var alpha = scrollTop / windowHeight * 2;
      alpha >= 1 && (alpha = 1);
      $navbar.css({
        'background-color': "rgba(11, 23, 39, ".concat(alpha, ")")
      });
    }); // Fix navbar background color [after and before expand]

    var classList = $navbar.attr('class').split(' ');
    var breakpoint = classList.filter(function (c) {
      return c.indexOf('navbar-expand-') >= 0;
    })[0].split('navbar-expand-')[1];
    utils.$window.resize(function () {
      if (utils.$window.width() > utils.breakpoints[breakpoint]) {
        return $navbar.removeClass('bg-dark');
      } else if (!$navbar.find('.navbar-toggler').hasClass('collapsed')) {
        return $navbar.addClass('bg-dark');
      }

      return null;
    }); // Top navigation background toggle on mobile

    $navbar.on('show.bs.collapse hide.bs.collapse', function (e) {
      $(e.currentTarget).toggleClass('bg-dark');
    });
  }
});
"use strict";
/*-----------------------------------------------
|   Detector
-----------------------------------------------*/


utils.$document.ready(function () {
  if (window.is.opera()) utils.$html.addClass("opera");
  if (window.is.mobile()) utils.$html.addClass("mobile");
  if (window.is.firefox()) utils.$html.addClass("firefox");
  if (window.is.safari()) utils.$html.addClass("safari");
  if (window.is.ios()) utils.$html.addClass("ios");
  if (window.is.iphone()) utils.$html.addClass("iphone");
  if (window.is.ipad()) utils.$html.addClass("ipad");
  if (window.is.ie()) utils.$html.addClass("ie");
  if (window.is.edge()) utils.$html.addClass("edge");
  if (window.is.chrome()) utils.$html.addClass("chrome");
  if (utils.nua.match(/puppeteer/i)) utils.$html.addClass("puppeteer");
  if (window.is.mac()) utils.$html.addClass("osx");
  if (window.is.windows()) utils.$html.addClass("windows");
  if (navigator.userAgent.match("CriOS")) utils.$html.addClass("chrome");
});
'use strict';
/*
  global Stickyfill
*/

/*-----------------------------------------------
|   Sticky fill
-----------------------------------------------*/


utils.$document.ready(function () {
  Stickyfill.add($('.sticky-top'));
  Stickyfill.add($('.sticky-bottom'));
});
"use strict";
/*-----------------------------------------------
|   Sticky Kit
-----------------------------------------------*/


utils.$document.ready(function () {
  if (window.is.ie()) {
    var stickyKits = $(".sticky-kit");

    if (stickyKits.length) {
      stickyKits.each(function (index, value) {
        var $this = $(value);

        var options = _objectSpread({}, $this.data("options"));

        $this.stick_in_parent(options);
      });
    }
  }
});
'use strict';
/*-----------------------------------------------
|   Navbar
-----------------------------------------------*/


utils.$document.ready(function () {
  var $window = utils.$window;
  var navDropShadowFlag = true;
  var ClassName = {
    SHOW: 'show',
    NAVBAR_GLASS_SHADOW: 'navbar-glass-shadow',
    NAVBAR_VERTICAL_COLLAPSED: 'navbar-vertical-collapsed',
    NAVBAR_VERTICAL_COLLAPSE_HOVER: 'navbar-vertical-collapsed-hover'
  };
  var Selector = {
    HTML: 'html',
    NAVBAR: '.navbar:not(.navbar-vertical)',
    NAVBAR_VERTICAL: '.navbar-vertical',
    NAVBAR_VERTICAL_TOGGLE: '.navbar-vertical-toggle',
    NAVBAR_VERTICAL_COLLAPSE: '#navbarVerticalCollapse',
    NAVBAR_VERTICAL_CONTENT: '.navbar-vertical-content',
    NAVBAR_VERTICAL_COLLAPSED: '.navbar-vertical-collapsed',
    NAVBAR_VERTICAL_DROPDOWN_NAV: '.navbar-vertical .navbar-collapse .nav',
    NAVBAR_VERTICAL_COLLAPSED_DROPDOWN_NAV: '.navbar-vertical-collapsed .navbar-vertical .navbar-collapse .nav',
    MAIN_CONTENT: '.main .content',
    NAVBAR_TOP: '.navbar-top'
  };
  var Events = {
    LOAD_SCROLL: 'load scroll',
    SCROLL: 'scroll',
    CLICK: 'click',
    RESIZE: 'resize',
    SHOW_BS_COLLAPSE: 'show.bs.collapse',
    HIDDEN_BS_COLLAPSE: 'hidden.bs.collapse'
  };
  var $html = $(Selector.HTML);
  var $navbar = $(Selector.NAVBAR);
  var $navbarVerticalCollapse = $(Selector.NAVBAR_VERTICAL_COLLAPSE);
  var $navbarVerticalContent = $(Selector.NAVBAR_VERTICAL_CONTENT);
  var navbarVertical = $(Selector.NAVBAR_VERTICAL);
  var breakPoint = utils.getBreakpoint(navbarVertical);

  var setDropShadow = function setDropShadow($elem) {
    if ($elem.scrollTop() > 0 && navDropShadowFlag) {
      $navbar.addClass(ClassName.NAVBAR_GLASS_SHADOW);
    } else {
      $navbar.removeClass(ClassName.NAVBAR_GLASS_SHADOW);
    }
  };

  $window.on(Events.LOAD_SCROLL, function () {
    return setDropShadow($window);
  });
  $navbarVerticalContent.on('scroll', function () {
    if ($window.width() < breakPoint) {
      navDropShadowFlag = true;
      setDropShadow($navbarVerticalContent);
    }
  });
  $navbarVerticalCollapse.on(Events.SHOW_BS_COLLAPSE, function () {
    if ($window.width() < breakPoint) {
      navDropShadowFlag = false;
      setDropShadow($window);
    }
  });
  $navbarVerticalCollapse.on(Events.HIDDEN_BS_COLLAPSE, function () {
    if ($navbarVerticalCollapse.hasClass(ClassName.SHOW) && $window.width() < breakPoint) {
      navDropShadowFlag = false;
    } else {
      navDropShadowFlag = true;
    }

    setDropShadow($window);
  }); // Expand or Collapse vertical navbar on mouse over and out

  $navbarVerticalCollapse.hover(function (e) {
    setTimeout(function () {
      if ($(e.currentTarget).is(':hover')) {
        $(Selector.NAVBAR_VERTICAL_COLLAPSED).addClass(ClassName.NAVBAR_VERTICAL_COLLAPSE_HOVER);
      }
    }, 100);
  }, function () {
    $(Selector.NAVBAR_VERTICAL_COLLAPSED).removeClass(ClassName.NAVBAR_VERTICAL_COLLAPSE_HOVER);
  }); // Set navbar top width from content

  var setNavbarWidth = function setNavbarWidth() {
    var contentWidth = $(Selector.MAIN_CONTENT).width() + 30;
    $(Selector.NAVBAR_TOP).outerWidth(contentWidth);
  }; // Toggle navbar vertical collapse on click


  $(document).on(Events.CLICK, Selector.NAVBAR_VERTICAL_TOGGLE, function (e) {
    // Set collapse state on localStorage
    var isNavbarVerticalCollapsed = JSON.parse(localStorage.getItem('isNavbarVerticalCollapsed'));
    localStorage.setItem('isNavbarVerticalCollapsed', !isNavbarVerticalCollapsed); // Toggle class

    $html.toggleClass(ClassName.NAVBAR_VERTICAL_COLLAPSED); // Set navbar top width

    setNavbarWidth();
    $(e.currentTarget).trigger('navbar.vertical.toggle');
  }); // Set navbar top width on window resize

  $window.on(Events.RESIZE, function () {
    setNavbarWidth();
  });
});
"use strict";

utils.$document.ready(function () {
  var $typeFormControl = $(".analytics-filter-type-form-control");
  var $userFormControl = $(".analytics-filter-user-form-control");
  $typeFormControl.change(function () {
    var value = $(this).val();

    if (value == AnalyticsFilterType.ForUser) {
      $userFormControl.prop('disabled', false);
    } else {
      $userFormControl.prop('disabled', true);
    }
  }).change();
});
"use strict";

utils.$document.ready(function () {
  var $brandFormControl = $(".brand-form-control");
  var $dealerFormControl = $('.dealer-form-control');
  $brandFormControl.trigger('reset');
  $dealerFormControl.trigger('reset');
  $brandFormControl.ready(function () {
    $.ajax({
      url: '/brand/available.json',
      type: "GET",
      success: function success(brands) {
        var options = brands.map(function (_) {
          return "<option value=\"".concat(_.id, "\" data-deactivated=\"").concat(_.isDeactivated, "\">").concat(_.name, "</option>");
        });
        var brandId = $brandFormControl.val();
        clearOptions($brandFormControl);
        $brandFormControl.append(options.join(''));
        $brandFormControl.val(brandId);
        $brandFormControl.trigger('reset');
      }
    });
  }).change(function () {
    var brandId = $brandFormControl.val();

    if (!brandId) {
      clearOptions($dealerFormControl);
      $dealerFormControl.val(null);
      $dealerFormControl.trigger('reset');
      return;
    }

    $.ajax({
      url: "/brand/".concat(brandId, "/dealer/available.json"),
      type: "GET",
      success: function success(dealers) {
        var options = dealers.map(function (_) {
          return "<option value=\"".concat(_.id, "\" data-deactivated=\"").concat(_.isDeactivated, "\">").concat(_.name, "</option>");
        });
        var dealerId = $dealerFormControl.val();
        clearOptions($dealerFormControl);
        $dealerFormControl.append(options.join(''));
        $dealerFormControl.val(dealerId);
        $dealerFormControl.trigger('reset');
      }
    });
  }).change();

  function clearOptions($element) {
    $('option', $element).filter(function () {
      return !!this.value;
    }).remove();
  }
});
"use strict";

utils.$document.ready(function () {
  var $brandUserAccessFormControl = $(".brand-user-access-form-control");
  var $userFormControl = $('.user-form-control');
  $brandUserAccessFormControl.trigger('reset');
  $userFormControl.change(function () {
    var userId = $userFormControl.val();

    if (!userId) {
      $brandUserAccessFormControl.val(null);
      $brandUserAccessFormControl.trigger('change');
      return;
    }

    $.ajax({
      url: "/user-access/user/".concat(userId, "/brand/accesses.json"),
      type: "GET",
      success: function success(brandIds) {
        $brandUserAccessFormControl.val(brandIds);
        $brandUserAccessFormControl.trigger('change');
      }
    });
  }).change();
});
"use strict";

utils.$document.ready(function () {
  var $breakageImageTypeFormControl = $(".breakage-image-type-form-control");
  var $breakageImageMaskFormControl = $(".breakage-image-mask-form-control");
  $breakageImageTypeFormControl.change(function () {
    var value = $(this).val();
    var disabled = value == BreakageImageType.Default;
    $breakageImageMaskFormControl.prop('disabled', disabled);

    if (disabled) {
      $breakageImageMaskFormControl.valid();
    }
  }).change();
});
"use strict";

utils.$document.ready(function () {
  var BreakageImageType = window.BreakageImageType;
  var $brandFormControl = $(".brand-form-control");
  var $dealerFormControl = $('.dealer-form-control');
  var $breakageImageTypeFormControl = $(".breakage-image-type-form-control");

  if ($dealerFormControl.length > 0) {
    $dealerFormControl.change(function () {
      var brandId = $brandFormControl.val();
      var dealerId = $dealerFormControl.val();

      if (!brandId || !dealerId) {
        setDefaultTypeVisibility($breakageImageTypeFormControl, false);
        return;
      }

      $.ajax({
        url: "/brand/".concat(brandId, "/dealer/").concat(dealerId, "/dealer-breakage-image/default-type-available.json"),
        type: "GET",
        success: function success(isAvailable) {
          setDefaultTypeVisibility($breakageImageTypeFormControl, isAvailable);
        }
      });
    }).change();
  } else {
    $brandFormControl.change(function () {
      var brandId = $brandFormControl.val();

      if (!brandId) {
        setDefaultTypeVisibility($breakageImageTypeFormControl, false);
        return;
      }

      $.ajax({
        url: "/brand/".concat(brandId, "/brand-breakage-image/default-type-available.json"),
        type: "GET",
        success: function success(isAvailable) {
          setDefaultTypeVisibility($breakageImageTypeFormControl, isAvailable);
        }
      });
    }).change();
  }

  function setDefaultTypeVisibility($element, visible) {
    var $defaultTypeOption = $('option', $element).filter(function () {
      return this.value == BreakageImageType.Default;
    }).first();

    if (visible) {
      $defaultTypeOption.show();
    } else {
      $defaultTypeOption.hide();
    }
  }
});
"use strict";

utils.$document.ready(function () {
  var $brandFormControl = $(".brand-form-control");
  var $dealerFormControl = $('.dealer-form-control');
  var $departmentFormControl = $('.department-type-form-control');
  var $checkListCategoryAliasFormControl = $(".check-list-category-alias-form-control");
  var $defaultCheckListCategoryAliases = $('option', $checkListCategoryAliasFormControl).map(function () {
    return +this.value;
  });

  var defaultCheckListCategoryAliases = _toConsumableArray($defaultCheckListCategoryAliases);

  if ($dealerFormControl.length > 0) {
    $dealerFormControl.change(function () {
      var brandId = $brandFormControl.val();
      var dealerId = $dealerFormControl.val();
      var departmentType = $departmentFormControl.val();

      if (!brandId || !dealerId) {
        setCheckListAliasesVisibility($checkListCategoryAliasFormControl, []);
        return;
      }

      $.ajax({
        url: "/brand/".concat(brandId, "/dealer/").concat(dealerId, "/check-list-category/dealer-alias-unavailable.json?departmentType=").concat(departmentType),
        type: "GET",
        success: function success(unavailableCheckListCategoryAliases) {
          var availableCheckListCategoryAliases = defaultCheckListCategoryAliases.filter(function (checkListCategoryAlias) {
            return !unavailableCheckListCategoryAliases.includes(checkListCategoryAlias);
          });
          setCheckListAliasesVisibility($checkListCategoryAliasFormControl, availableCheckListCategoryAliases);
        }
      });
    }).change();
  } else {
    $brandFormControl.change(function () {
      var brandId = $brandFormControl.val();
      var departmentType = $departmentFormControl.val();

      if (!brandId) {
        setCheckListAliasesVisibility($checkListCategoryAliasFormControl, []);
        return;
      }

      $.ajax({
        url: "/brand/".concat(brandId, "/check-list-category-preset/brand-alias-unavailable.json?departmentType=").concat(departmentType),
        type: "GET",
        success: function success(unavailableCheckListCategoryAliases) {
          var availableCheckListCategoryAliases = defaultCheckListCategoryAliases.filter(function (checkListCategoryAlias) {
            return !unavailableCheckListCategoryAliases.includes(checkListCategoryAlias);
          });
          setCheckListAliasesVisibility($checkListCategoryAliasFormControl, availableCheckListCategoryAliases);
        }
      });
    }).change();
  }

  function setCheckListAliasesVisibility($element, availableCheckListCategoryAliases) {
    $('option', $element).each(function () {
      if (availableCheckListCategoryAliases.includes(+this.value)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }
});
"use strict";

utils.$document.ready(function () {
  var $checkListCategoryIdFormControl = $(".check-list-category-form-control");
  var $checkListItemAliasFormControl = $(".check-list-item-alias-form-control");
  var $defaultCheckListItemCategoryAliases = $('option', $checkListItemAliasFormControl).map(function () {
    return +this.value;
  });

  var defaultCheckListCategoryAliases = _toConsumableArray($defaultCheckListItemCategoryAliases);

  $checkListCategoryIdFormControl.change(function () {
    var checkListCategoryId = $(this).val();

    if (!checkListCategoryId) {
      $checkListItemAliasFormControl.prop('disabled', true);
      $(this).val(0);
      return;
    }

    $.ajax({
      url: "/check-list-item/category/".concat(checkListCategoryId, "/alias-available.json"),
      type: "GET",
      success: function success(availableCheckListItemAliases) {
        $checkListItemAliasFormControl.prop('disabled', false);
        setCheckListItemAliasesVisibility($checkListItemAliasFormControl, availableCheckListItemAliases);
      }
    });
  }).change();

  function setCheckListItemAliasesVisibility($element, availableCheckListItemAliases) {
    $('option', $element).each(function () {
      if (availableCheckListItemAliases.includes(+this.value)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
    $element.val(availableCheckListItemAliases[0]);
  }
});
"use strict";

utils.$document.ready(function () {
  var $dealerManagementSystemFormControl = $(".dealer-management-system-form-control");
  $dealerManagementSystemFormControl.trigger('reset');
  $dealerManagementSystemFormControl.ready(function () {
    $.ajax({
      url: '/dms/available.json',
      type: "GET",
      success: function success(dealerManagementSystems) {
        var options = dealerManagementSystems.map(function (_) {
          return "<option value=\"".concat(_.id, "\">").concat(_.name, "</option>");
        });
        clearOptions($dealerManagementSystemFormControl);
        $dealerManagementSystemFormControl.append(options.join(''));
        $dealerManagementSystemFormControl.trigger('reset');
      }
    });
  }).change();

  function clearOptions($element) {
    $('option', $element).filter(function () {
      return !!this.value;
    }).remove();
  }
});
"use strict";

utils.$document.ready(function () {
  var $dealerUserAccessFormControl = $(".dealer-user-access-form-control");
  var $userFormControl = $('.user-form-control');
  $dealerUserAccessFormControl.trigger('reset');
  $userFormControl.change(function () {
    var userId = $userFormControl.val();

    if (!userId) {
      $dealerUserAccessFormControl.val(null);
      $dealerUserAccessFormControl.trigger('change');
      return;
    }

    $.ajax({
      url: "/user-access/user/".concat(userId, "/dealer/accesses.json"),
      type: "GET",
      success: function success(dealerIds) {
        $dealerUserAccessFormControl.val(dealerIds);
        $dealerUserAccessFormControl.trigger('change');
      }
    });
  }).change();
});
"use strict";
/*-----------------------------------------------
|   File Input
-----------------------------------------------*/


utils.$document.ready(function () {
  $(".custom-file-input").change(function (e) {
    var $this = $(e.currentTarget);
    var fileName = $this.val().split("\\").pop();
    $this.siblings(".custom-file-label").addClass("selected").html(fileName);
    $this.valid();
  });
  $(".custom-file-input").change(function (e) {
    var input = e.currentTarget;

    if (!input.files || !input.files[0]) {
      return;
    }

    var preview$ = $(input).closest('.form-group').find('.custom-file-preview');
    var img$ = preview$.find('img');
    var reader = new FileReader();

    reader.onload = function (e) {
      img$.attr('src', e.target.result);
      img$.show();
    };

    reader.readAsDataURL(input.files[0]);
  });
  $('.custom-file-preview').each(function () {
    var img$ = $(this).find('img');

    if (!img$.attr('src')) {
      img$.hide();
    }
  });
});
"use strict";

utils.$document.ready(function () {
  var $roleFormControl = $(".role-form-control");
  $roleFormControl.change(function () {
    var value = $(this).val();
    hideGroup('.SuperAdmin-group');
    hideGroup('.BrandAdmin-group');
    hideGroup('.DealerAdmin-group');
    hideGroup('.ServiceAdviser-group');
    hideGroup('.Observer-group');

    if (value == Roles.SuperAdmin) {
      showGroup('.SuperAdmin-group');
    } else if (value == Roles.BrandAdmin) {
      showGroup('.BrandAdmin-group');
    } else if (value == Roles.DealerAdmin) {
      showGroup('.DealerAdmin-group');
    } else if (value == Roles.ServiceAdviser) {
      showGroup('.ServiceAdviser-group');
    } else if (value == Roles.Observer) {
      showGroup('.Observer-group');
    }
  }).change();

  function hideGroup(selector) {
    $(selector).hide();
    $('input', selector).prop('disabled', true);
    $('select', selector).prop('disabled', true);
    $('textarea', selector).prop('disabled', true);
  }

  function showGroup(selector) {
    $(selector).show();
    $('input', selector).prop('disabled', false);
    $('select', selector).prop('disabled', false);
    $('textarea', selector).prop('disabled', false);
  }
});
"use strict";
/*-----------------------------------------------
|   Navbar Top
-----------------------------------------------*/


utils.$document.ready(function () {
  var Selectors = {
    COLLAPSE: ".collapse",
    NAVBAR_NAV: ".navbar-nav",
    NAVBAR_TOP_COMBO: ".navbar-top-combo",
    NAVBAR_VERTICAL: ".navbar-vertical",
    NAVBAR_VERTICAL_DIVIDER: ".navbar-vertical-divider",
    NAVBAR_TOP_COMBO_COLLAPSE: ".navbar-top-combo .collapse",
    MOVEABLE_CONTENT: "[data-move-container]"
  };
  var CLASS_NAME = {
    FLEX_COLUMN: "flex-column"
  };
  var DATA_KEYS = {
    MOVE_TARGET: "move-target"
  };
  var $navbarTop = $(Selectors.NAVBAR_TOP_COMBO);
  var $navbarVertical = $(Selectors.NAVBAR_VERTICAL);
  var navbarTopBreakpoint = utils.getBreakpoint($navbarTop);
  var navbarVertcicalBreakpoint = utils.getBreakpoint($navbarVertical);

  var moveNavContent = function moveNavContent(width) {
    if (width < navbarTopBreakpoint) {
      var $navbarTopCollapse = $navbarTop.find(Selectors.COLLAPSE);
      var navbarTopContent = $navbarTopCollapse.html();

      if (navbarTopContent) {
        $navbarTopCollapse.html("");
        var divider = "<div class='navbar-vertical-divider'><hr class='navbar-vertical-hr' /></div>";
        navbarTopContent = "<div data-move-container>".concat(divider).concat(navbarTopContent, "</div>");
        var targetID = $navbarTop.data(DATA_KEYS.MOVE_TARGET);
        $(navbarTopContent).insertAfter(targetID);
        navbarTopBreakpoint > navbarVertcicalBreakpoint && $(Selectors.MOVEABLE_CONTENT).find(Selectors.NAVBAR_NAV).addClass(CLASS_NAME.FLEX_COLUMN);
      }
    } else {
      var $container = $(Selectors.MOVEABLE_CONTENT);
      var $navbarNav = $container.find(Selectors.NAVBAR_NAV);
      $navbarNav.hasClass(CLASS_NAME.FLEX_COLUMN) && $navbarNav.removeClass(CLASS_NAME.FLEX_COLUMN);
      $container.find(Selectors.NAVBAR_VERTICAL_DIVIDER).remove();
      var content = $container.html();
      $container.remove();
      $(Selectors.NAVBAR_TOP_COMBO_COLLAPSE).html(content);
    }
  };

  moveNavContent(utils.$window.outerWidth());
  utils.$window.on("resize", function () {
    moveNavContent(utils.$window.outerWidth());
  });
});
"use strict";

var DataTable = $.fn.dataTable;
$.extend(true, DataTable.Buttons.defaults, {
  dom: {
    container: {
      className: 'dt-buttons'
    },
    button: {
      className: 'btn'
    }
  },
  buttonCreated: function buttonCreated(config, button) {
    return button;
  }
});
$.extend(true, $.fn.dataTable.defaults, {
  paging: false,
  searching: true,
  processing: true,
  dom: "rt",
  order: [[0, 'asc']],
  autoWidth: false,
  orderCellsTop: true,
  language: {
    processing: '<div class="table-processing-content"><div class="spinner-border text-primary" role="status"></div></div>'
  },
  classes: {
    sProcessing: 'table-processing'
  },
  createdRow: function createdRow(row, data, dataIndex, cells) {
    var table = this;
    var tableApi = table.api();
    var settings = table.fnSettings();
    var $row = $(row);
    var rowClasses = DataTable.parseClasses(settings.oClasses.cRow, row, data) || [];
    $row.addClass(rowClasses);
    var cCol = table.fnSettings().oClasses.cCol || {};
    var colsClasses = Object.keys(cCol).map(function (key) {
      return {
        name: key.endsWith('Col') ? key : "".concat(key, "Col"),
        classes: DataTable.parseClasses(cCol[key], row, data)
      };
    });
    colsClasses.forEach(function (_ref) {
      var name = _ref.name,
          classes = _ref.classes;
      var aoColumn = settings.aoColumns.find(function (_) {
        return _.data === name;
      });

      if (!aoColumn) {
        return;
      }

      $('td', row).eq(aoColumn.idx).addClass(classes);
    });
    $('[dt-if]', row).each(function () {
      var $elem = $(this);
      var isVisibleExpression = $elem.attr('dt-if');
      var isVisible = eval(isVisibleExpression);

      if (isVisible) {
        $elem.show();
      } else {
        $elem.hide();
      }
    });
  },
  initComplete: function initComplete() {
    var table = this;
    var tableApi = table.api();
    var columns = [];
    tableApi.columns().every(function (index) {
      columns[index] = this;
    });
    columns.filter(function (column, index) {
      return column.visible();
    }).forEach(function (column, index) {
      $("thead tr:eq(1) th:eq(".concat(index, ") input[type=text].searching"), table).on('keyup change', function () {
        if (column.search() !== this.value) {
          column.search(this.value);
          column.draw();
        }
      });
      $("thead tr:eq(1) th:eq(".concat(index, ") select.searching"), table).on('change', function () {
        if (column.search() !== this.value) {
          column.search(this.value);
          column.draw();
        }
      });
    });
    $('.delete-action', table).on('click', function () {
      var data = $(this).data();
      var modal$ = $('#global-delete-modal');
      modal$.find('form').attr('action', data.deleteUrl);
      modal$.modal('show');
    });
    $('.btn-details', table).on('click', function () {
      var button = $(this);
      var url = button.data().url;
      var tr = button.closest('tr');
      var row = tableApi.row(tr);

      if (row.child.isShown()) {
        row.child.hide();
        button.removeClass('active');
      } else {
        tableApi.processing(true);
        $.ajax({
          url: url,
          type: "GET",
          success: function success(result) {
            row.child(result, "details").show();
            button.addClass('active');
          },
          complete: function complete() {
            tableApi.processing(false);
          }
        });
      }
    });
  }
});

DataTable.onExportExcelActionTable = function (e, dt, button, config) {
  var self = this;

  var oldStart = dt.settings()[0]._iDisplayStart;

  dt.one('preXhr', function (e, s, data) {
    // Just this once, load all data from the server...
    data.start = 0;
    data.length = 2147483647;
    dt.one('preDraw', function (e, settings) {
      // Call the original action function
      if (button[0].className.indexOf('buttons-excel') >= 0) {
        $.fn.dataTable.ext.buttons.excelHtml5.available(dt, config) ? $.fn.dataTable.ext.buttons.excelHtml5.action.call(self, e, dt, button, config) : $.fn.dataTable.ext.buttons.excelFlash.action.call(self, e, dt, button, config);
      }

      dt.one('preXhr', function (e, s, data) {
        // DataTables thinks the first item displayed is index 0, but we're not drawing that.
        // Set the property to what it was before exporting.
        settings._iDisplayStart = oldStart;
        data.start = oldStart;
      }); // Reload the grid with the original page. Otherwise, API functions like table.cell(this) don't work properly.

      setTimeout(dt.ajax.reload, 0); // Prevent rendering of the full data to the DOM

      return false;
    });
  }); // Requery the server with the new one-time export settings

  dt.ajax.reload();
};

DataTable.onRenderIndexColumnTable = function (data, type, row, meta) {
  return meta.row + 1;
};

DataTable.onRenderImageColumnTable = function (data, type, row, meta) {
  return !!data && data !== '-' ? "<img style=\"width: 50px; max-height: 50px;\" src=\"/document/".concat(data, "\" />") : '-';
};

DataTable.parseClasses = function (input, row, data) {
  if (!input) {
    return null;
  }

  input = typeof input === 'function' ? input(row, data) : input;

  if (!input) {
    return null;
  }

  if (typeof input === 'string') {
    return [input];
  }

  if (input instanceof Array) {
    return input.filter(function (_) {
      return !!_ && typeof _ === 'string';
    });
  }

  var keys = Object.keys(input);
  return keys.filter(function (_) {
    return !!input[_];
  });
};

window.utils.$document.ready(function () {
  var datetimepicker = $('.date-picker');
  datetimepicker.each(function (index, element) {
    var $this = $(element);
    var options = $.extend({
      altInput: true,
      altFormat: "F j, Y",
      dateFormat: "Y-m-d",
      disableMobile: true
    }, $this.data('options'));
    $this.attr('placeholder', options.dateFormat);
    $this.flatpickr(options);
  });
});
"use strict";

$(document).on('submit', 'form', function () {
  utils.setSpinner(true);
});
$.validator.addMethod("extension", function (value, element, param) {
  param = typeof param === "string" ? param.replace(/\./g, "").replace(/,/g, "|") : "png|jpe?g|gif";
  return this.optional(element) || value.match(new RegExp("\\.(" + param + ")$", "i"));
}, $.validator.format("Please enter a value with a valid extension.")); // requiredIfMatch validator

$.validator.addMethod("requiredIfMatch", function (value, element, parameters) {
  var $element = $(element);
  var $formControl = $element.is('option') ? $element.parent() : $element;
  var disabled = $formControl.prop('disabled');
  return disabled || value !== "" && value != null && value.length > 0;
});
$.validator.unobtrusive.adapters.addBool('requiredIfMatch');
window.utils.$document.ready(function () {
  var $qrCode = $('[data-qr-code]');
  $qrCode.each(function (index, value) {
    var $this = $(value);
    var options = $this.data('qr-code');
    QRCode.toCanvas(value, options.qrCodeUri, {
      errorCorrectionLevel: options.errorCorrectionLevel
    });
  });
});

(function ($) {
  if ($.validator && $.validator.unobtrusive) {
    var _highlight = $.validator.defaults.highlight;
    var _unhighlight = $.validator.defaults.unhighlight;
    $.validator.setDefaults({
      highlight: function highlight(element, errorClass, validClass) {
        var $parent = $(element).parent();

        if ($parent.is('.select2')) {
          element = $parent.next().find('.select2-selection');
        }

        _highlight.call(this, element, errorClass, validClass);
      },
      unhighlight: function unhighlight(element, errorClass, validClass) {
        var $parent = $(element).parent();

        if ($parent.is('.select2')) {
          element = $parent.next().find('.select2-selection');
        }

        _unhighlight.call(this, element, errorClass, validClass);
      }
    });
    var _errorPlacement = $.validator.unobtrusive.options.errorPlacement;
    $.validator.unobtrusive.options = _objectSpread(_objectSpread({}, $.validator.unobtrusive.options), {}, {
      errorPlacement: function errorPlacement(error, element) {
        var $target = $(element).next();

        if ($target.is(".select2")) {
          element = $target;
        }

        _errorPlacement.call(this, error, element);
      }
    });
    $(document).on('change', '.select2', function () {
      $(this).valid();
    });
  } else {
    console.warn('$.validator is not defined. Please load this library **after** loading jquery.validate.js and jquery.validate.unobtrusive.js');
  }
})(jQuery);

window.utils.$document.ready(function () {
  var select2 = $('.select2');
  select2.each(function (index, value) {
    var $this = $(value);
    var options = $.extend({
      theme: 'bootstrap4',
      dropdownAutoWidth: true,
      width: '100%'
    }, $this.data('options'));

    if (options.preset == 'multi-input') {
      options = _objectSpread(_objectSpread({}, options), {}, {
        tags: true,
        multiple: true,
        matcher: exactMatcher,
        containerCssClass: 'multi-input',
        dropdownCssClass: 'multi-input',
        allowClear: false,
        selectOnClose: true,
        tokenSeparators: ['|']
      });
    }

    if (options.preset == 'multi-select') {
      options = _objectSpread(_objectSpread({}, options), {}, {
        multiple: true
      });
    }

    if (options.templateResult === 'deactivated-mark') {
      var formatState = function formatState(state, element) {
        if (!state.id) {
          return state.text;
        }

        var optionData = $(state.element).data();

        if (optionData.deactivated) {
          return $("<span>".concat(state.text, " <span class=\"text-warning\">(").concat(options.deactivatedLabel, ")</span></span>"));
        }

        return state.text;
      };

      options.templateResult = formatState;
      options.templateSelection = formatState;
    }

    if (options.data) {
      options.data = options.data.map(function (opt) {
        return {
          selected: true,
          id: opt,
          text: opt
        };
      });
    }

    var $select2 = $this.select2(options); // Placeholder

    if (options.preset == 'multi-input') {
      updatePlaceholder($this, options);
      $this.on('select2:open select2:close select2:select select2:unselect select2:clear change change.select2', function () {
        setTimeout(function () {
          updatePlaceholder($this, options);
        });
      });
    } // Items


    if (options.items) {
      var items = options.items.map(function (_) {
        return new Option(_.key, _.label, false, false);
      });
      $select2.append.apply($select2, _toConsumableArray(items)).trigger('change');
    }
  });

  function updatePlaceholder(elem, options) {
    var parent$ = $(elem).parent();
    var choices$ = $('.select2-selection__choice', parent$);
    var searchField$ = $('input.select2-search__field', parent$);
    var placeholder = options.placeholder.replace('[index]', choices$.length + 1);
    searchField$.prop('placeholder', placeholder);
  }

  function exactMatcher(params, data) {
    if ($.trim(params.term) === '') {
      return null;
    }

    if (typeof data.text === 'undefined') {
      return null;
    }

    if (data.text === params.term) {
      return $.extend({}, data, true);
    }

    return null;
  }
});
"use strict";

utils.$document.ready(function () {
  utils.setSpinner(false);
});
"use strict";

utils.$document.ready(function () {
  // https://getbootstrap.com/docs/4.0/components/tooltips/#example-enable-tooltips-everywhere
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();
});
//# sourceMappingURL=theme.js.map
