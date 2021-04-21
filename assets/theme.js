'use strict';
vndTheme.currentTags = [];
vndTheme.events = {};
vndTheme.stk_el = {};
vndTheme.ctc_agreed = false;
Shopify.queryParams = {};

function floatToString(t,e){var o=t.toFixed(e).toString();return o.match(/^\.\d+/)?"0"+o:o}"undefined"==typeof window.Shopify&&(window.Shopify={}),Shopify.each=function(t,e){for(var o=0;o<t.length;o++)e(t[o],o)},Shopify.map=function(t,e){for(var o=[],i=0;i<t.length;i++)o.push(e(t[i],i));return o},Shopify.arrayIncludes=function(t,e){for(var o=0;o<t.length;o++)if(t[o]==e)return!0;return!1},Shopify.uniq=function(t){for(var e=[],o=0;o<t.length;o++)Shopify.arrayIncludes(e,t[o])||e.push(t[o]);return e},Shopify.isDefined=function(t){return void 0!==t},Shopify.getClass=function(t){return Object.prototype.toString.call(t).slice(8,-1)},Shopify.extend=function(t,e){function o(){}o.prototype=e.prototype,t.prototype=new o,(t.prototype.constructor=t).baseConstructor=e,t.superClass=e.prototype},Shopify.locationSearch=function(){return window.location.search},Shopify.locationHash=function(){return window.location.hash},Shopify.replaceState=function(t){window.history.replaceState({},document.title,t)},Shopify.urlParam=function(t){var e=RegExp("[?&]"+t+"=([^&#]*)").exec(Shopify.locationSearch());return e&&decodeURIComponent(e[1].replace(/\+/g," "))},Shopify.newState=function(t,e){return(Shopify.urlParam(t)?Shopify.locationSearch().replace(RegExp("("+t+"=)[^&#]+"),"$1"+e):""===Shopify.locationSearch()?"?"+t+"="+e:Shopify.locationSearch()+"&"+t+"="+e)+Shopify.locationHash()},Shopify.setParam=function(t,e){Shopify.replaceState(Shopify.newState(t,e))},Shopify.Product=function(t){Shopify.isDefined(t)&&this.update(t)},Shopify.Product.prototype.update=function(t){for(let property in t)this[property]=t[property]},Shopify.Product.prototype.optionNames=function(){return"Array"==Shopify.getClass(this.options)?this.options:[]},Shopify.Product.prototype.optionValues=function(o){if(!Shopify.isDefined(this.variants))return null;var t=Shopify.map(this.variants,function(t){var e="option"+(o+1);return t[e]==undefined?null:t[e]});return null==t[0]?null:Shopify.uniq(t)},Shopify.Product.prototype.getVariant=function(i){var r=null;return i.length!=this.options.length||Shopify.each(this.variants,function(t){for(var e=!0,o=0;o<i.length;o++){t["option"+(o+1)]!=i[o]&&(e=!1)}1!=e||(r=t)}),r},Shopify.Product.prototype.getVariantById=function(t){for(var e=0;e<this.variants.length;e++){var o=this.variants[e];if(t==o.id)return o}return null},Shopify.money_format="${{amount}}",Shopify.formatMoney=function(t,e){function n(t,e){return void 0===t?e:t}function o(t,e,o,i){if(e=n(e,2),o=n(o,","),i=n(i,"."),isNaN(t)||null==t)return 0;var r=(t=(t/100).toFixed(e)).split(".");return r[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1"+o)+(r[1]?i+r[1]:"")}"string"==typeof t&&(t=t.replace(".",""));var i="",r=/\{\{\s*(\w+)\s*\}\}/,a=e||this.money_format;switch(a.match(r)[1]){case"amount":i=o(t,2);break;case"amount_no_decimals":i=o(t,0);break;case"amount_with_comma_separator":i=o(t,2,".",",");break;case"amount_with_space_separator":i=o(t,2," ",",");break;case"amount_with_period_and_space_separator":i=o(t,2," ",".");break;case"amount_no_decimals_with_comma_separator":i=o(t,0,".",",");break;case"amount_no_decimals_with_space_separator":i=o(t,0," ");break;case"amount_with_apostrophe_separator":i=o(t,2,"'",".")}return a.replace(r,i)},Shopify.OptionSelectors=function(t,e){return this.selectorDivClass="selector-wrapper",this.selectorClass="single-option-selector",this.variantIdFieldIdSuffix="-variant-id",this.variantIdField=null,this.historyState=null,this.selectors=[],this.domIdPrefix=t,this.product=new Shopify.Product(e.product),this.onVariantSelected=Shopify.isDefined(e.onVariantSelected)?e.onVariantSelected:function(){},this.replaceSelector(t),this.initDropdown(),e.enableHistoryState&&(this.historyState=new Shopify.OptionSelectors.HistoryState(this)),!0},Shopify.OptionSelectors.prototype.initDropdown=function(){var t={initialLoad:!0};if(!this.selectVariantFromDropdown(t)){var e=this;setTimeout(function(){e.selectVariantFromParams(t)||e.fireOnChangeForFirstDropdown.call(e,t)})}},Shopify.OptionSelectors.prototype.fireOnChangeForFirstDropdown=function(t){this.selectors[0].element.onchange(t)},Shopify.OptionSelectors.prototype.selectVariantFromParamsOrDropdown=function(t){this.selectVariantFromParams(t)||this.selectVariantFromDropdown(t)},Shopify.OptionSelectors.prototype.replaceSelector=function(t){var e=document.getElementById(t),o=e.parentNode;Shopify.each(this.buildSelectors(),function(t){o.insertBefore(t,e)}),e.style.display="none",this.variantIdField=e},Shopify.OptionSelectors.prototype.selectVariantFromDropdown=function(t){var e=document.getElementById(this.domIdPrefix).querySelector("[selected]");if(e||(e=document.getElementById(this.domIdPrefix).querySelector('[selected="selected"]')),!e)return!1;var o=e.value;return this.selectVariant(o,t)},Shopify.OptionSelectors.prototype.selectVariantFromParams=function(t){var e=Shopify.urlParam("variant");return this.selectVariant(e,t)},Shopify.OptionSelectors.prototype.selectVariant=function(t,e){var o=this.product.getVariantById(t);if(null==o)return!1;for(var i=0;i<this.selectors.length;i++){var r=this.selectors[i].element,n=o[r.getAttribute("data-option")];null!=n&&this.optionExistInSelect(r,n)&&(r.value=n)}return"undefined"!=typeof jQuery?jQuery(this.selectors[0].element).trigger("change",e):this.selectors[0].element.onchange(e),!0},Shopify.OptionSelectors.prototype.optionExistInSelect=function(t,e){for(var o=0;o<t.options.length;o++)if(t.options[o].value==e)return!0},Shopify.OptionSelectors.prototype.insertSelectors=function(t,e){Shopify.isDefined(e)&&this.setMessageElement(e),this.domIdPrefix="product-"+this.product.id+"-variant-selector";var o=document.getElementById(t);Shopify.each(this.buildSelectors(),function(t){o.appendChild(t)})},Shopify.OptionSelectors.prototype.buildSelectors=function(){for(var t=0;t<this.product.optionNames().length;t++){var e=new Shopify.SingleOptionSelector(this,t,this.product.optionNames()[t],this.product.optionValues(t));e.element.disabled=!1,this.selectors.push(e)}var i=this.selectorDivClass,r=this.product.optionNames();return Shopify.map(this.selectors,function(t){var e=document.createElement("div");if(e.setAttribute("class",i),1<r.length){var o=document.createElement("label");o.htmlFor=t.element.id,o.innerHTML=t.name,e.appendChild(o)}return e.appendChild(t.element),e})},Shopify.OptionSelectors.prototype.selectedValues=function(){for(var t=[],e=0;e<this.selectors.length;e++){var o=this.selectors[e].element.value;t.push(o)}return t},Shopify.OptionSelectors.prototype.updateSelectors=function(t,e){var o=this.selectedValues(),i=this.product.getVariant(o);i?(this.variantIdField.disabled=!1,this.variantIdField.value=i.id):this.variantIdField.disabled=!0,this.onVariantSelected(i,this,e),null!=this.historyState&&this.historyState.onVariantChange(i,this,e)},Shopify.OptionSelectorsFromDOM=function(t,e){var o=e.optionNames||[],i=e.priceFieldExists||!0,r=e.delimiter||"/",n=this.createProductFromSelector(t,o,i,r);e.product=n,Shopify.OptionSelectorsFromDOM.baseConstructor.call(this,t,e)},Shopify.extend(Shopify.OptionSelectorsFromDOM,Shopify.OptionSelectors),Shopify.OptionSelectorsFromDOM.prototype.createProductFromSelector=function(t,n,a,s){if(!Shopify.isDefined(a))a=!0;if(!Shopify.isDefined(s))s="/";var e=document.getElementById(t),o=e.childNodes,p=(e.parentNode,n.length),l=[];Shopify.each(o,function(t){if(1==t.nodeType&&"option"==t.tagName.toLowerCase()){var e=t.innerHTML.split(new RegExp("\\s*\\"+s+"\\s*"));0==n.length&&(p=e.length-(a?1:0));var o=e.slice(0,p),i=a?e[p]:"",r=(t.getAttribute("value"),{available:!t.disabled,id:parseFloat(t.value),price:i,option1:o[0],option2:o[1],option3:o[2]});l.push(r)}});var i={variants:l};if(0==n.length){i.options=[];for(var r=0;r<p;r++)i.options[r]="option "+(r+1)}else i.options=n;return i},Shopify.SingleOptionSelector=function(o,i,t,e){this.multiSelector=o,this.values=e,this.index=i,this.name=t,this.element=document.createElement("select");for(var r=0;r<e.length;r++){var n=document.createElement("option");n.value=e[r],n.innerHTML=e[r],this.element.appendChild(n)}return this.element.setAttribute("class",this.multiSelector.selectorClass),this.element.setAttribute("data-option","option"+(i+1)),this.element.id=o.domIdPrefix+"-option-"+i,this.element.onchange=function(t,e){e=e||{},o.updateSelectors(i,e)},!0},Shopify.Image={preload:function(t,e){for(var o=0;o<t.length;o++){var i=t[o];this.loadImage(this.getSizedImageUrl(i,e))}},loadImage:function(t){(new Image).src=t},switchImage:function(t,e,o){if(t&&e){var i=this.imageSize(e.src),r=this.getSizedImageUrl(t.src,i);o?o(r,t,e):e.src=r}},imageSize:function(t){var e=t.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/);return null!==e?e[1]:null},getSizedImageUrl:function(t,e){if(null==e)return t;if("master"==e)return this.removeProtocol(t);var o=t.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);if(null==o)return null;var i=t.split(o[0]),r=o[0];return this.removeProtocol(i[0]+"_"+e+r)},removeProtocol:function(t){return t.replace(/http(s)?:/,"")}},Shopify.OptionSelectors.HistoryState=function(t){this.browserSupports()&&this.register(t)},Shopify.OptionSelectors.HistoryState.prototype.register=function(t){window.addEventListener("popstate",function(){t.selectVariantFromParamsOrDropdown({popStateCall:!0})})},Shopify.OptionSelectors.HistoryState.prototype.onVariantChange=function(t,e,o){this.browserSupports()&&(!t||o.initialLoad||o.popStateCall||Shopify.setParam("variant",t.id))},Shopify.OptionSelectors.HistoryState.prototype.browserSupports=function(){return window.history&&window.history.replaceState};

///////////////////////////////////
//        Define Sections        //
///////////////////////////////////

// Topbar and Header
var vndTopbar = {
  onLoad(container) {
    if ( container.classList.contains('initialized') ) {
      return;
    }

    container.classList.add('initialized');

    vndHeader.initCartTouch(container);
    setTimeout(() => {
      vndHeader.initLanguageSwitcher(container);
    }, 350);

    const popups = new vndTheme.Popups(container),
          dropdowns = new vndTheme.Dropdowns(container);
  },

  onSelect(evt) {
    vndHlp.updateCpWsCt(evt.target);
  }
}

var vndHeader = {
  stkHd: null, // Sticky Header
  container: null,

  initStickyHeader: function() {
    if ((typeof Waypoint == 'undefined') || (typeof Waypoint.Sticky == 'undefined')) {
      return;
    }

    const $header = document.querySelector("#shopify-section-header .header");
    const $mobile_header = document.querySelector('.header-mobile.sticky-mobile-enable');

    if (vndHlp.isPhone() && $mobile_header) {
      this.stkHd = new Waypoint.Sticky({
        element: $mobile_header,
        stuckClass: "sticky-active",
        offset: -380
      });
    } else if ( ($header.classList.contains('sticky-enable') && !vndHlp.isMobile()) ||
         ($header.classList.contains('sticky-mobile-enable') && vndHlp.isMobile()) ) {
      this.stkHd = new Waypoint.Sticky({
        element: $header,
        stuckClass: "sticky-active",
        offset: -160
      });
    }
  },

  // Adjust if child menu overflows window
  initMenuPosition: function(onresize) {
    if(vndHeader.container.id != "shopify-section-header") {
      return;
    }
    const nodelist = document.getElementById("shopify-section-header").querySelectorAll('.vnd-desk-menu .dropdown-classic, .vnd-desk-menu .dropdown-classic .menu-grandchild');
    const megalist = document.getElementById("shopify-section-header").querySelectorAll('.vnd-desk-menu .sub-menu.boxed');

    // if ( vndHlp.isMobile() ) {
    //   if ( onresize ) {
    //     for ( let i = 0; i < nodelist.length; i++ ) {
    //       const menu = nodelist.item(i);
    //       menu.classList.remove('pos-right');
    //     }

    //     for ( let i = 0; i < megalist.length; i++ ) {
    //       const menu = megalist.item(i);
    //       menu.classList.remove('pos-right');
    //     }
    //   } else {
    //     return;
    //   }
    // }

    const limit = window.innerWidth;
    for ( let i = 0; i < nodelist.length; i++ ) {
      const menu = nodelist.item(i),
            ln = menu.getBoundingClientRect().right + 50;

      if ( ln > limit ) {
        menu.closest('.header-menu-item').classList.add('position-relative');
        menu.classList.add('pos-right');
      }
    }

    for ( let i = 0; i < megalist.length; i++ ) {
      const menu = megalist.item(i),
            ln = menu.getBoundingClientRect().right + 50;

      if ( ln > limit ) {
        menu.style.right = (ln - limit) / 2 + 'px';
      }
    }
  },

  initLanguageSwitcher: function(container) {
    const $lang = $(container).find(".language-wrapper"),
          $mb_sch_btn = container.querySelector('.header-search__mobile-button'),
          $sch_btn = container.querySelector('button.search-button'),
          $sch_form = container.querySelector('.search-form'),
          $sch_ctn = container.querySelector('.search-input-container');

    if ($sch_ctn && window.getComputedStyle($sch_ctn).position == 'absolute') {
      var bounds = $sch_ctn.getBoundingClientRect();
      if (bounds.left < 0) {
        $sch_ctn.style.left = '0';
        $sch_ctn.style.right = 'auto';
      } else if (bounds.right > document.body.offsetWidth) {
        $sch_ctn.style.left = 'auto';
        $sch_ctn.style.right = '0';
      }
    }

    if ($mb_sch_btn) {
      $mb_sch_btn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        $sch_form.classList.add('js-hover');
      }
    }

    if ( $sch_btn && vndHlp.isTchDvc() ) {
      $sch_btn.ontouchstart = function(e) {
        if ( !$sch_form.classList.contains('js-hover') ) {
          if ( e.cancelable ) {
            e.preventDefault();
            e.stopPropagation();
          }
          $sch_form.classList.add('js-hover');
        }
      };
    }

    if ( ($(".weglot-container").length < 1) || ($lang.length < 1) ) {
      return;
    }

    var $weglot = $(".weglot-container").detach();
    $weglot.find('ul').addClass('dropdown-items__picker');
    $lang.append($weglot);
    $weglot.show();
  },

  initCartTouch: function(container) {
    const $cart_dropdown = document.body.querySelector('.cart-dropdown'),
          $cart_icon = container.querySelector('.icon-cart');

    if (!$cart_dropdown || !$cart_icon) {
      return;
    }

    if (!$cart_dropdown.classList.contains('moved') && vndTheme.stt.ajx_crt_eft == 'sidebar') {
      document.body.appendChild($cart_dropdown);
      $cart_dropdown.classList.add('moved');
    }

    document.body.querySelectorAll('.cart-dropdown').forEach(($cd, index) => {
      if (!$cd.classList.contains('moved') && $cd.classList.contains('sidebar')) {
        $cd.remove();
      }
    });

    if (vndTheme.stt.ajx_crt_eft == 'sidebar') {
      $cart_icon.onclick = function(e) {
        e.preventDefault();
        document.dispatchEvent(
          new CustomEvent('vnd_ajx:crt:success', {
            bubbles: true,
            cancelable: true
          })
        );
      }
    } else {

      if ( !vndHlp.isTchDvc() ) {
        return;
      }

      $cart_icon.ontouchstart = function(e) {
        if ( e.cancelable ) {
          e.preventDefault();
        }
        if (!e.currentTarget.nextElementSibling) {
          e.currentTarget.parentElement.appendChild($cart_dropdown);
        }
        $($cart_dropdown).toggleClass('active');
      };

      $(window).on('click touchstart', function(e) {
        if ( $('.cart-dropdown.active').length
          && !$(e.target).hasClass('cart-wrapper')
          && !$(e.target).parents('.cart-wrapper').length ) {
            $('.cart-dropdown.active').removeClass('active');
          }
      });
    }
  },

  onLoad: function(container) {
    if ( container.classList.contains('initialized') ) {
      return;
    }

    vndHeader.container = container;
    container.classList.add('initialized');

    vndHeader.initCartTouch(container);
    vndHeader.initStickyHeader();
    vndHeader.initMenuPosition(false);

    const popups = new vndTheme.Popups(container),
          dropdowns = new vndTheme.Dropdowns(container);

    setTimeout(() => {
      vndHeader.initLanguageSwitcher(container);
    }, 350);
  },

  onUnload: function(evt) {
    this.stkHd && this.stkHd.destroy();
  },

  onSelect(evt) {
    vndHlp.updateCpWsCt(evt.target);
    const popups = new vndTheme.Popups(evt.target),
          dropdowns = new vndTheme.Dropdowns(evt.target);
  },

  onBlkSelect(evt) {
    $(evt.target).parents('.header-menu-item').addClass('js-hover');
  },

  onBlkDeselect(evt) {
    $(evt.target).parents('.header-menu-item').removeClass('js-hover');
  }
}

// Mobile Header
var vndMbHd = {
  onLoad(container) {
    vndHeader.initCartTouch(container);
    vndHeader.initLanguageSwitcher(container);
    const popups = new vndTheme.Popups(container),
          dropdowns = new vndTheme.Dropdowns(container);
  }
}

// slideshow with flickity
var slideShow = {
  onLoad($container) {
    var $sliders = $container.getElementsByClassName('flickity-carousel');
    if ( $sliders.length == 0 ) {
      return;
    }

    initIframes($container);

    for (let i = 0; i < $sliders.length; i++) {
      const $slider = $sliders[i];

      let hasMultipleCells = $slider.querySelectorAll('.slide-item').length > 1,
          auto_play = $slider.dataset.auto > 0 ? $slider.dataset.auto*1000 : false,
          show_nav = $slider.dataset.nav == 'true',
          show_dots = $slider.dataset.dots == 'true',
          wrap_around = $slider.dataset.wraparound == 'true',
          pause_on_hover = $slider.dataset.pausehover == 'true';

      if ( !hasMultipleCells ) {
        show_nav = false;
        show_dots = false;
      }

      // check expansion option
      if ($slider.classList.contains('with-categories-menu')) {

        if (!vndHlp.isPhone()) {
          const $parent = $slider.parentElement,
                $acc_wr = $slider.nextElementSibling,
                scroll_width = vndTheme.scroll_width;

          let sw,
              prev_width;

          if ($parent.previousElementSibling) {
            prev_width = $parent.previousElementSibling.offsetWidth;
            sw = $parent.parentElement.offsetWidth - prev_width;
          } else {
            sw = $parent.parentElement.offsetWidth;
            prev_width = 0;
          }

          $acc_wr.style.width = sw + 'px';
          if ($parent.classList.contains('expand-te')) {
            $parent.style.width = (window.innerWidth - $parent.parentElement.offsetWidth - scroll_width ) / 2 + sw + 'px';
            $parent.style.minWidth = $parent.style.width;
            const $slides = $slider.getElementsByClassName('slide-item');
            Array.from($slides).forEach(($sl) => {
              $sl.style.width = sw + 'px';
            });
          } else {
            $parent.style.width = sw + 'px';
          }
        }
      }

      if ( !$slider.classList.contains('flickity-enabled') ) {

        $($slider).flickity({
          adaptiveHeight: true,
          wrapAround: wrap_around,
          autoPlay: auto_play,
          pauseAutoPlayOnHover: pause_on_hover,
          prevNextButtons: show_nav,
          cellAlign: 'left',
          pageDots: show_dots,
          imagesLoaded: true,
          lazyLoad: 2,
          on: {
            select: function (index) {
              const flkty = this;
              const v_e = flkty.selectedElement.querySelector('video');
              if (v_e) {
                const playWholeVideo = flkty.selectedElement.querySelector('.video-wrap').dataset.wholeplay;
                if ( playWholeVideo == 'true' && flkty.slides.length > 1 ) {
                  flkty.stopPlayer();
                  v_e.loop = false;
                  v_e.onended = function (e, i) {
                    flkty.next();
                  }
                }
              };
            },
            change: function (index) {
              const flkty = this;
              if ( flkty.slides.length > 1 ) {
                const previousIndex = index === 0 ? flkty.slides.length - 1 : index - 1,
                      previousElement = flkty.slides[previousIndex].getCellElements(),
                      nextElement = flkty.selectedElement,
                      v_e = nextElement.querySelector('video');

                if (v_e) {
                  const playWholeVideo = nextElement.querySelector('.video-wrap').dataset.wholeplay,
                        prev_video = previousElement[0].querySelector('video');
                  if (prev_video) {
                    prev_video.pause();
                  }

                  if ( playWholeVideo == 'true' ) {
                    flkty.stopPlayer();
                    v_e.loop = false;
                    v_e.onended = function () {
                      flkty.next();
                    }
                  }
                  v_e.muted = false;
                  v_e.play();
                };
              }
            },
            ready: function() {
              if ( this.element.classList.contains('with-categories-menu') ) {
                const $nc = this.element.nextElementSibling;
                if (this.prevButton) {
                  $nc.appendChild(this.prevButton.element);
                  $nc.appendChild(this.nextButton.element);
                }
                if (this.pageDots) {
                  $nc.appendChild(this.pageDots.holder);
                }
              }
            }
          }
        });
      }
    };
  },

  onBlkSelect(evt) {
    const crs = $(evt.target).closest('.flickity-carousel');
    let index = $(evt.target).index();

    if (!evt.target.classList.contains('slide-item')) {
      index = $(evt.target).closest('.slide-item').index();
    }

    crs.flickity( 'select', index );
    crs.flickity( 'pausePlayer' );
  },

  onBlkDeselect(evt) {
    const crs = $(evt.target).closest('.flickity-carousel');
    crs.flickity( 'unpausePlayer' );
  },

  onResize(container) {
    const sliders = $(container).find('.flickity-carousel');
    sliders.each( function() {
      const slider = $(this);
      slider.flickity('resize');
    });
  },

  onUnload(container) {
    const sliders = $(container).find('.flickity-carousel');
    sliders.each( function() {
      const slider = $(this);
      slider.flickity('destroy');
    });
  }
}

// Parallax Lookbook Section (with slideshow)
var parallaxLookbook = {
  calcLookbookSpots: (left, viewWidth, viewHeight, viewRatio, imgRatio) => {
    var viewRatio = viewHeight / viewWidth;
    var backImgWidth = viewWidth;

    if ( viewRatio > imgRatio ) {
      backImgWidth = viewHeight / imgRatio;
    }
    return `${ 50 + (left - 50) * backImgWidth / viewWidth }%`
  },

  calcTransformValue(pageTop, windowHeight, sectionTop, sectionHeight) {
    return 0 - sectionHeight * 0.3 / windowHeight * (sectionTop - pageTop);
  },

  isInView(container) {
    const bounding = container.getBoundingClientRect(),
          out = {};

    out.top = bounding.top < 0;
    out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
    out.any = out.top || out.bottom;
    out.all = out.top && out.bottom;
    const inview =
      ( bounding.top >= 0 && bounding.top <= (window.innerHeight || document.documentElement.clientHeight)) ||
      ( bounding.bottom >= 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight));

    return inview || out.all
  },

  calcBgPos(container) {
    var windowHeight = $(window).innerHeight();
    var pageTop = $(window).scrollTop();
    var sectionHeight = $(container).outerHeight();
    var sectionTop = $(container).offset().top;

    var transformHeight = parallaxLookbook.calcTransformValue(pageTop, windowHeight, sectionTop, sectionHeight);
    var parallaxHeight = sectionHeight * 1.3;

    $(container).find('.image-container').css({ 'height': parallaxHeight, 'transform': `translate3d(0px,${transformHeight}px, 0px`, "-webkit-backface-visibility": "hidden" });

    $(window).on('scroll', function() {
      pageTop = $(window).scrollTop();

      if (parallaxLookbook.isInView(container)) {
        transformHeight = parallaxLookbook.calcTransformValue(pageTop, windowHeight, sectionTop, sectionHeight);
        parallaxHeight = sectionHeight * 1.3;

        $(container).find('.image-container').css({ 'transform': `translate3d(0px,${transformHeight}px, 0px` });
        $(container).find('.lookbook-spot').css({ 'transform': `translate3d(0px,${transformHeight}px, 0px`, "-webkit-backface-visibility": "hidden" });
      }
    });
  },

  onLoad: (container) => {
    initLookbookSpots(container);
    var imgRatio = 1 / $(container).find('.parallax-container').data('image-ratio');
    var viewWidth = $(container).outerWidth();
    var viewHeight = $(container).outerWidth();

    // Set lookbook spot position to corresponding window size
    $(container).find('.lookbook-spot').css("left", function() {
      return parallaxLookbook.calcLookbookSpots(this.dataset.left, imgRatio, viewWidth, viewHeight);
    });
    parallaxLookbook.calcBgPos(container);

    $(window).resize(function() {
      $(container).find('.lookbook-spot').css("left", function() {
        return parallaxLookbook.calcLookbookSpots(this.dataset.left, imgRatio, viewWidth, viewHeight);
      });

      parallaxLookbook.calcBgPos(container);
    });
  }
}

// Lookbook section
var lookbookSection = {
  onLoad: (container) => {
    initLookbookSpots(container);
  }
}

// Lookbook section
var lookbookSection2 = {
  onLoad: (container) => {
    initLookbookSwitch(container);
  }
}

// Product showcase
var productShowCase = {
  onLoad: (container) => {
    var pageBottom = $(window).scrollTop() + $(window).innerHeight(),
        actionH,
        sectionTop = $(container).offset().top;
    if ( window.innerWidth > 767 ) {
      actionH = container.offsetHeight * 2 / 3; // animate text when 2/3 of the section enters in viewport
    } else {
      actionH = container.offsetHeight * 1 / 3; // animate text when 2/3 of the section enters in viewport
    }

    if ( pageBottom > sectionTop + actionH ) {
      container.querySelector('.fade-appear').classList.add('finished');
      container.querySelector('.transform-appear').classList.add('finished');
    } else if ( pageBottom < sectionTop + actionH / 2 ) {
      container.querySelector('.fade-appear').classList.remove('finished');
      container.querySelector('.transform-appear').classList.remove('finished');
    }

    $(window).on('scroll', function() {
      pageBottom = $(window).scrollTop() + $(window).innerHeight();

      if ( pageBottom > sectionTop + actionH ) {
        container.querySelector('.fade-appear').classList.add('finished');
        container.querySelector('.transform-appear').classList.add('finished');
      } else if ( pageBottom < sectionTop + actionH / 2 ) {
        container.querySelector('.fade-appear').classList.remove('finished');
        container.querySelector('.transform-appear').classList.remove('finished');
      }
    });
  }
}

// Section with sidebars
var groupContent = {
  onLoad(container) {
    productReview();
    initCountDown(container);
    container.querySelectorAll('.items-carousel').forEach(function(carousel) {
      initSlider(carousel);
    });
    container.querySelectorAll('.vs-grid-isotope').forEach(function(grid) {
      new vndTheme.Dropdowns(grid);
      initIstSection(grid);
    });

    // Initialize sliders inside group content section
    slideShow.onLoad(container);
    groupContent.initBrandSearch(container);
  },

  initBrandSearch(container) {
    container.querySelectorAll('.filter-list .nav-list__link').forEach( function(el) {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        vndHlp.setTagsFromString(this.dataset.brand);
        const $ticksign = this.querySelector('.ticksign');
        $ticksign.classList.contains('active') ? $ticksign.classList.remove('active') : $ticksign.classList.add('active');
      });
    });

    const $form = container.querySelector('.search-form__with-brand');
    if ($form) {
      $form.addEventListener('submit', function(e) {
        e.preventDefault();
        vndHlp.setQueryParams();
        let params = '?' + jQuery.param(Shopify.queryParams).replace(/\+/g, '%20'),
            type = 'type=product',
            query = '&q=' + $(this).parent().find('.sidebar-search__input').val() + '*',
            targetUrl;

        if ( params.length > 1 ) {
          targetUrl = location.origin + location.pathname + 'search' + params + '&' + type + query;
        } else {
          targetUrl = location.origin + location.pathname + 'search?' + type + query;
        }

        window.history && window.history.pushState && window.history.pushState('','', targetUrl);
        location = targetUrl;
      });
    }
  }
}

// Section with sidebars
var vndSectionSlider = {
  onLoad(container) {
    container.querySelectorAll('.items-carousel').forEach(function(carousel) {
      initSlider(carousel);
    });
    initCountDown(container);
  },

  onUnload($target) {
    var $slider = $target.querySelector('.items-carousel');
    $slider.destroy();
  },

  onBlkSelect(evt) {
    const $csd = $(evt.target);
    const $crs = $csd.closest('.items-carousel');
    const index = Math.floor($csd.index() / Math.floor($crs.width() / $csd.width()));
    $crs.flickity( 'select', index );
    $crs.flickity( 'pausePlayer' );
  },

  onBlkDeselect(evt) {
    const crs = $(evt.target).closest('.items-carousel');
    crs.flickity( 'unpausePlayer' );
  }
}

var productsMasonry = {
  onLoad(container) {
    initCountDown(container);
    productReview();
  }
}

// Packery Section
var vndPkrSt = {
  onLoad(container) {
    slideShow.onLoad(container);

    $(container).find('.packery-container').each(function() {
      var el = this;
      vndPkrSt.initPkr(el);

      $(window).on('resize', function() {
        slideShow.onResize(container);
        vndPkrSt.initPkr(el);
      });
    });
  },

  onBlkSelect(evt) {
    if ( $(evt.target).hasClass('slide-item') ) {
      var crs = $(evt.target).closest('.flickity-carousel');
      var index = $(evt.target).index();
      crs.flickity( 'select', index );
    }
  },

  initPkr(el) {
    $(el).isotope({
      itemSelector: '.packery-item',
      layoutMode : 'packery'
    });
  }
}

// Recently viewed products
var vndPrdRcnt = {
  onLoad(container) {
    let rv = vndHlp.readCookie('vnd_recent_products');
    if (!rv) {
      container.style.display = 'none';
      return;
    }

    const el = container.querySelector('.recently-view-wrapper'),
          limit = parseInt(el.dataset.numlimit),
          col = el.dataset.numcol,
          $cl = container.querySelector('.items-carousel');

    let flkt = false;

    rv = rv.split(",");

    if ($cl) {
      flkt = initSlider($cl);
    }

    $.each(rv, function(i, e) {
      if (i > limit) return;

      if (e) {
        $.ajax({
          url: '/products/' + e + '?view=recent',
          dataType: "html",
          type: "GET",
          success: function(html) {
            const item = document.createElement("div");
            item.className = "products-matrix col-padding grid-items__" + col;
            item.innerHTML = html;
            if ( flkt ) {
              flkt.append(item);
            } else {
              el.appendChild(item);
            }
          }
        });
      }
    });
  },

  addProduct() {
    if ( $('.product-main').find('[data-product-json]').html() ) {
      const product = JSON.parse($('[data-product-json]').html());
      let rv = vndHlp.readCookie('vnd_recent_products') || "";
      const handle = product.handle;
      rv = rv.split(",");
      if ( $.inArray(handle, rv) !== -1 ) {
        rv = $.grep(rv, function(value) {
          return value != handle;
        });
      }
      rv.unshift(handle);
      if (rv.length > 30) {
        rv.pop();
      }
      vndHlp.createCookie('vnd_recent_products', rv.join(), 1);
    }
  }
}

var vndMsrGrd = {
  onLoad(container) {
    const $ic = container.querySelector('.masonry-grid-wrapper');
    if ( !$ic ) return;
    const iso = new Isotope($ic, {
      itemSelector: '.image-block-item',
      masonry: {
        columnWidth: '.grid-sizer'
      }
    })
  }
}

// Tabs page
var vndPageTabs = {
  onLoad(container) {
    initTabs(container);
    initStickySidebar();
  }
}

// Image with text 2
vndTheme.SectionImage2 = (function() {
  function SectionImage2(container) {
    this.container = container;

    this.selectors = {
      parent: '.content-slideshow',
      slider: '.flickity-carousel',
    };

    this.$parent = this.container.querySelector(this.selectors.parent);
    this.$slider = this.container.querySelector(this.selectors.slider);

    this._setupSlider();
  }

  SectionImage2.prototype = Object.assign({}, SectionImage2.prototype, {
    _setupSlider: function() {
      if (!vndHlp.isMobile()) {
        const prev_width = this.$parent.previousElementSibling.offsetWidth, // Plus 30 means padding of the parent element
              scroll_width = vndTheme.scroll_width;

        this.$parent.style.width = (window.innerWidth - this.$parent.parentElement.offsetWidth - scroll_width) / 2 + (this.$parent.parentElement.offsetWidth - prev_width) - scroll_width + 'px';
        this.$parent.style.minWidth = this.$parent.style.width;
      }

      this._initSlider();
    },

    _initSlider() {
      initSlider(this.$slider);
    }
  });

  return SectionImage2;
})();

// Products masonry carousel
vndTheme.SectionMasonryCarousel = (function() {
  function SectionMasonryCarousel(container) {
    this.container = container;

    this.selectors = {
      parent: '.content-slideshow',
      slider: '.items-carousel',
      trigger: '.products-masonry-trigger',
      activeTrigger: '.products-masonry-trigger.active'
    };

    this.$parent = this.container.querySelector(this.selectors.parent);
    this.$slider = this.container.querySelector(this.selectors.slider);
    this.$triggers = this.container.querySelectorAll(this.selectors.trigger);
    this.$activeTrigger = this.container.querySelector(this.selectors.activeTrigger);

    this.eventHandlers = {};
    this.eventHandlers.triggerClick = this._onTriggerClick.bind(this);
    this.eventHandlers.switchSlide = this._onSwitchSlide.bind(this);

    this._setupSlider();
    this._setupSwitches();
  }

  SectionMasonryCarousel.prototype = Object.assign({}, SectionMasonryCarousel.prototype, {
    _setupSlider: function() {
      this.$flickity = initSlider(this.$slider);
      this.$flickity.on('change', this.eventHandlers.switchSlide)
    },

    _setupSwitches: function() {
      const _this = this;

      this.$triggers.forEach( function($t) {
        $t.addEventListener('click', _this.eventHandlers.triggerClick);
      });
    },

    _onTriggerClick: function(e) {
      const targetSlide = e.currentTarget.dataset.slide;
      this.$activeTrigger.classList.remove('active');
      this.$activeTrigger = e.currentTarget;
      this.$activeTrigger.classList.add('active');
      if (typeof targetSlide !== 'undefined' && this.$flickity) {
        this.$flickity.select(targetSlide);
      }
    },

    _onSwitchSlide: function(index) {
      const new_active = this.$parent.querySelector('[data-slide="' + index + '"]');
      if (new_active) {
        this.$activeTrigger.classList.remove('active');
        this.$activeTrigger = new_active;
        this.$activeTrigger.classList.add('active');
      }
    },

    onUnload() {
      this.$flickity.destroy();
    },

    onBlkSelect(evt) {
      const index = evt.target.dataset.index;
      this.$flickity.select(index);
      this.$flickity.pausePlayer();
    },

    onBlkDeselect(evt) {
      this.$flickity.unpausePlayer();
    }
  });

  return SectionMasonryCarousel;
})();

// Products masonry carousel
vndTheme.ServicePromotion = (function() {
  function ServicePromotion(container) {
    this.container = container;

    this.selectors = {
      block: '.c-e__fsa',
    };

    this._setupEffect();
  }

  ServicePromotion.prototype = Object.assign({}, ServicePromotion.prototype, {
    _setupEffect: function() {
      const _this = this;
      this.container.querySelectorAll(this.selectors.block).forEach( function($t) {
        new Waypoint({
          element: $t,
          offset: '84%',
          handler: _this._onAppear
        });
      });
    },

    _onAppear: function(direction) {
      this.element.classList.add('c-e__fsa-a');
      this.destroy();
    },

    onBlkSelect: function(evt) {
      evt.target.classList.add('js-hover');
    },

    onBlkDeselect: function(evt) {
      evt.target.classList.remove('js-hover');
    }
  });

  return ServicePromotion;
})();

/*** Product page sections ***/
// Product template section
var vndPrdTplSt = {
  _onReviewClick(e) {
    e.preventDefault();
    if ( vndTheme.rvw_app == 'none' ) {
      return;
    }

    vndPrdTplSt._scrToTabs();

    if ( !$('.tabs-nav__item.reviews').hasClass('active') ) {
      document.querySelector('.tabs-nav__item.reviews a').click();
    }
  },

  _onDescClick(e) {
    e.preventDefault();
    vndPrdTplSt._scrToTabs();
    if ( !$('.tabs-nav__item.description').hasClass('active') ) {
      document.querySelector('.tabs-nav__item.description a').click();
    }
  },

  _scrToTabs() {
    $('html, body').animate({
      scrollTop: $('.product-details-tabs').offset().top - 100
    }, 450);
  },

  onLoad(container) {
    initProductImageSlider(container);
    initThumbs(".product-layout");
    initProductImageGrid(container);
    productReview();
    initCountDown(container);
    zoomImage(container);
    initProductSwatch('.product-layout');
    initProductZoomPopup(container);
    const popups = new vndTheme.Popups(container);

    $('.product-main .product-review').on('click', vndPrdTplSt._onReviewClick);
    const $nav_desc = container.querySelector(".nav-to-tab-desc");
    if ($nav_desc) {
      $nav_desc.onclick = vndPrdTplSt._onDescClick;
    }
  }
}

// Product details tabs section
var vndPrdDtTabsSt = {
  onLoad(container) {
    initTabs(container);
  }
}

var vndPrdRecmd = {
  onLoad($con) {
    // Look for an element with class 'product-recommendations'
    var $ctn = $con.querySelector(".product-recommendations");
    if ($ctn === null) {
      return;
    }

    // Read product id from data attribute
    var productId = $ctn.dataset.productId;
    // Read limit from data attribute
    var limit = $ctn.dataset.limit;
    // Build request URL
    var requestUrl = "/recommendations/products?section_id=product-recommendations&limit="+limit+"&product_id="+productId;
    // Create request and submit it using Ajax
    var request = new XMLHttpRequest();
    request.open("GET", requestUrl);
    request.onload = function() {
      if (request.status >= 200 && request.status < 300) {
        const container = document.createElement("div");
        container.innerHTML = request.response;
        const prc = container.querySelector(".product-recommendations");

        if (!prc) {
          return false;
        }

        $ctn.parentElement.innerHTML = prc.innerHTML;

        const $slider = $con.querySelector('.items-carousel');
        initSlider($slider);

        quickViewInit();
        initSwatch($con);
      }
    }

    request.send();
  }
}

// Collections Tab section
var vndIstSection = {
  onLoad(container) {
    initIstSection(container);
    initCountDown(container);
    productReview();
    new vndTheme.Dropdowns(container);
  }
}

// Instagram section
var vndInstaSt = {
  onLoad(container) {
    if ( !container || $(container).hasClass('insta-loaded') ) {
      return;
    }
    const instagram = $(container).find('.instagram-images');

    var waypoint = new Waypoint({
      element: $(container),
      offset: '200%',
      handler: function(direction) {
        $(container).addClass('insta-loaded');
        vndInstaSt.getInstaImages(instagram);
        waypoint.destroy();
      }
    });
  },

  getInstaImages(instagram) {
    const hashtag = instagram.data('hashtag'),
          count = instagram.data('count'),
          grid = instagram.data('grid'),
          template = instagram.data('layout');

    var options = {
      hashtag: hashtag,
      max: count,
      layout: grid,
      template: template
    }

    instagram.spectragram(options);
  }
}

///////////////////////////////////
//        Theme Functions        //
///////////////////////////////////

function initMobileMenu() {
  $('.header-menu-item a').on('click', function(e) {
    if ( $(e.currentTarget).attr('href') == '#') {
      e.preventDefault();
    }
  });

  $('.vnd-link__move').on('click', function(e) {
    e.preventDefault();
    const $target = $(e.currentTarget.hash);
    if ($target.length < 1) {
      return;
    }

    $('.vnd-link__move').parent().removeClass('active');
    this.parentElement.classList.add('active');

    const $tab_parent = $target.parents('.tabs-content__item');
    if ($tab_parent.length > 0 && !$tab_parent.hasClass('active')) {
      $tab_parent.siblings().removeClass('active');
      $tab_parent.addClass('active');
    }

    $('html, body').animate({
      scrollTop: $target.offset().top - 100
    }, 450);
  });

  document.getElementById('mobile-menu-overlay').onclick = function(e) {
    if ( e.cancelable ) {
      e.preventDefault();
    }
    document.body.classList.remove('mobile-menu-open', 'mobile-sidebar-open');
    document.dispatchEvent(
      new CustomEvent('vnd_ajx:crt:close', {
        bubbles: true,
        cancelable: true
      })
    );
  };

  if (!vndHlp.didMblInit()) {
    if ( vndHlp.isMobile() ) {
      document.body.classList.add('mobile-menu-init');

      $('.mobile-btn').on('click', function(e) {
        if ( e.cancelable ) {
          e.preventDefault();
        }

        if (this.classList.contains('activator__drop-down')) {
          $('.mobile-menu__drop-down').toggleClass('active');
        } else {
          document.body.classList.add('mobile-menu-open');
        }
      });

      if ( vndHlp.isTchDvc ) {
        $('.header-menu-item .right-expander').on('click', function(e) {
          e.preventDefault();
          const $pp = this.parentElement.parentElement;
          const $dd = this.parentElement.nextElementSibling;
          if ($pp.classList.contains("expanded")) {
            $pp.classList.remove("expanded");
            $($dd).slideUp();
          } else {
            $($dd).slideDown();
            $pp.classList.add("expanded");
          }
        });
      }

      document.querySelectorAll('.vnd-mobile-menu').forEach(function(menu) {
        initTabs(menu);
      });
    } else {
      $('.dropdown-mega2 .menu-list-header').on('click', function(e) {
        e.preventDefault();
        this.nextElementSibling && this.nextElementSibling.classList.add('active');
        this.closest('.sub-menu').classList.add('sb-expanded');
      });

      $('.dropdown-mega2 .menu-back').on('click', function(e) {
        e.preventDefault();
        $(this.parentElement).find('.menu-grandchild').removeClass('active');
        this.closest('.sub-menu').classList.remove('sb-expanded');
      });

      $('.child-menu-activators .menu-list-header').on('click', function(e) {
        e.preventDefault();
        $(this.closest('.align-start')).find('.child-menu.active').removeClass('active');
        $(this.dataset.target).addClass('active');
      });
    }
  }
}

function initMobileSidebarMenu() {
  if ( vndHlp.isMobile() && !vndHlp.didMblSdbInit() ) {
    $('body').addClass('mobile-sidebar-init');
    const $btn = document.body.querySelector('.mobile-sidebar-toggler');

    if (!$btn) return;

    $btn.onclick = function(e) {
      if ( e.cancelable ) {
        e.preventDefault();
      }
      $('body').toggleClass('mobile-sidebar-open');
    };
  }
}

function initStickySidebar() {
  const $sidebar = document.body.querySelector('.mobile-sidebar');
  if ( vndHlp.isMobile() || !$sidebar) {
    return;
  }

  const $grid = $sidebar.parentElement.querySelector('.large-9');
  const $target = $grid.offsetHeight > $sidebar.offsetHeight ? $sidebar : $grid;

  if ($target.classList.contains('sticky-dir-up') || $target.classList.contains('sticky-dir-down')) {
  } else {
    $target.classList.add('sticky-dir-up');
  }

  $target.lastKnownY = window.scrollY;
  if (!vndTheme.stk_el.currentTop) {
    vndTheme.stk_el.currentTop = 0;
  } else {
    return;
  }

  vndTheme.stk_el.initialTopOffset = parseInt(window.getComputedStyle($target).top);

  window.onscroll = function() {
    var bounds = $target.getBoundingClientRect(),
        maxTop = bounds.top + window.scrollY - $target.offsetTop + vndTheme.stk_el.initialTopOffset,
        minTop = $target.clientHeight - window.innerHeight + 30;

    if (window.scrollY < $target.lastKnownY) {
      vndTheme.stk_el.currentTop -= window.scrollY - $target.lastKnownY;
    } else {
      vndTheme.stk_el.currentTop += $target.lastKnownY - window.scrollY;
    }

    vndTheme.stk_el.currentTop = Math.min(Math.max(vndTheme.stk_el.currentTop, -minTop), maxTop, vndTheme.stk_el.initialTopOffset);
    $target.lastKnownY = window.scrollY;

    $target.style.top = vndTheme.stk_el.currentTop + 'px';
  }
}

function initSlider(container) {
  if ( !container ) {
    return;
  }

  const auto_speed = parseInt(container.dataset.auto);

  let autoPlay     = auto_speed > 0 ? auto_speed * 1000 : false,
      showNav      = container.dataset.nav == 'true',
      showDots     = container.dataset.dots == 'true',
      pauseOnHover = container.dataset.pausehover == 'true',
      cellAlign    = container.dataset.cellalign || 'left',
      wrapAround   = container.dataset.wraparound == 'true',
      groupCells   = container.dataset.groupcells || '100%';

  if ( container.dataset.groupcells == 'false' ) {
    groupCells = false;
  }

  showNav = container.childElementCount > 1 && showNav;
  showDots = container.childElementCount > 1 && showDots;

  if ( !container.classList.contains('flickity-enabled') ) {
    return new Flickity(container, {
      wrapAround: wrapAround,
      autoPlay: autoPlay,
      pauseAutoPlayOnHover: pauseOnHover,
      prevNextButtons: showNav,
      pageDots: showDots,
      cellAlign: cellAlign,
      imagesLoaded: true,
      groupCells: groupCells,
      lazyLoad: 2,
      contain: true
    });
  } else {
    return false;
  }
}

function initProductImageSlider(container) {
  var slider = $(container).find('.items-carousel');
  if ( slider.length == 0 ) {
    return;
  }

  slider.each(function() {
    if ( $(this).hasClass('flickity-enabled') ) {
      return;
    }
    var initIndex = '0';
    var hasMultipleCells = slider.find('.product-img').length > 1;
    var $crs = $(this).flickity({
      wrapAround: true,
      autoPlay: false,
      prevNextButtons: hasMultipleCells,
      pageDots: false,
      imagesLoaded: true,
      lazyLoad: 2,
      draggable: true,
      initialIndex: initIndex,
      adaptiveHeight: true
    });

    var $carouselNav = $(container).find('.thumbs-container');
    if ( $carouselNav.length && !$carouselNav.hasClass('flickity-enabled') ) {
      var $carouselNavCells = $carouselNav.find('.product-thumb');

      $carouselNav.on( 'click', '.product-thumb', function( event ) {
        event.preventDefault();
        var index = $( event.currentTarget ).index();
        $crs.flickity( 'select', index );
      });
      var flkty = $crs.data('flickity');
      var navCellHeight = $carouselNavCells.height();
      var navHeight = $carouselNav.height();

      $crs.on( 'select.flickity', function() {
        // set selected nav cell
        $carouselNav.find('.is-selected').removeClass('is-selected');
        var $selected = $carouselNavCells.eq( flkty.selectedIndex )
          .addClass('is-selected');
        // scroll nav
        var scrollY = $selected.position().top +
          $carouselNav.scrollTop() - ( navHeight + navCellHeight ) / 2;
          $carouselNav.animate({
          scrollTop: scrollY
        });
      });

      $crs.on( 'change.flickity', function( event, index ) {
        $crs.find('.media-container video').each(function() {
          this.pause();
        });
        var $vid = $crs.find('.media-container.is-selected video').get(0);
        $vid && $vid.play();
      });
    }
  });
}

function initProductImageGrid(container) {
  var $details = container.querySelector('.product-details-area');
  var $imgs = container.querySelector('.product-img-area');
  var $summary = container.querySelector('.product-details-summary');
  if ( !$details || !$imgs ) {
    return;
  }

  let $target = $details.offsetHeight > $imgs.offsetHeight ? $imgs : $details;
  const m_h = Math.max($details.outerHeight, $imgs.outerHeight);

  if ( window.innerHeight < $target.offsetHeight + 90 ) {
    const waypoint = new Waypoint.Inview({
      element: $target,
      entered: function(direction) {
        if (direction == 'up') {
          this.element.classList.remove('sticky-dir-up');
          this.element.classList.add('sticky-dir-down' );
        }
      },
      exited: function(direction) {
        if (direction == 'down') {
          this.element.classList.remove('sticky-dir-down' );
          this.element.classList.add('sticky-dir-up');
        }
      },
      offset: {
        top: 90,
        bottom: 40
      }
    });
  } else {
    $target.classList.remove('sticky-dir-down');
    $target.classList.add('sticky-dir-up');
  }

  if ( $summary ) {
    if ( window.innerHeight < $summary.offsetHeight + 90 && $summary.offsetHeight < m_h ) {
      const waypoint = new Waypoint.Inview({
        element: $summary,
        entered: function(direction) {
          if (direction == 'up') {
            this.element.classList.remove('sticky-dir-up');
            this.element.classList.add( 'sticky-dir-down' );
          }
        },
        exited: function(direction) {
          if (direction == 'down') {
            this.element.classList.remove('sticky-dir-down');
            this.element.classList.add('sticky-dir-up');
          }
        },
        offset: {
          top: 90,
          bottom: 40
        }
      });
    } else {
      $summary.classList.remove('sticky-dir-down');
      $summary.classList.add('sticky-dir-up');
    }
  }
}

function initProductZoomPopup(container) {
  // If product gallery is disabled, return
  if ( !vndTheme.ebl_prd_g ) {
    return;
  }

  const img_arr = container.querySelectorAll('.product-layout .product-img');
  for (let i = 0; i < img_arr.length; i++) {
    const img = img_arr[i];
    img.onclick = function(event) {
      const $ct = event.currentTarget;
      if ( $ct.classList.contains('media-container') ) {
        return;
      }

      var $c = $('.product-layout .product-img-area').clone();
      var $p = $c.find('.product-img');
      if ( !$p ) {
        return;
      }

      vndHlp.showLoading();

      var index = 0;
      var $p_a = [];
      $p.each(function(i, e) {
        // Media inner height
        var wh = $(window).innerHeight() - 10;
        // Media inner width
        var ww = $(window).innerWidth() - 10;

        $(e).removeAttr('style');
        $(e).children('img, model-viewer, video').css('max-height', wh);

        // Set model viewer size square
        if ( $(e).find('model-viewer').length ) {
          $(e).css( { height: wh, width: ww });
        }

        $(e).find('.product-images').removeAttr('srcset').removeAttr('data-srcset');
        $(e).find('.zoomImg').remove();

        if ( e.dataset.media == $ct.dataset.media ) {
          index = i;
        }

        $p_a.push({
          galleryContainer: e.outerHTML
        });
      });

      $.magnificPopup.open({
        type: 'inline',
        items: $p_a,
        inline: {
          markup: '<div class="vnd-pp-content position-relative ds-flex align-center justify-center"><div class="mfp-close"></div><div class="mfp-expander"></div>'+
                    '<div class="mfp-galleryContainer"></div><div class="full-screen"></div>'+
                  '</div>'
        },
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          tCounter: '<span class="mfp-counter">%curr% of %total%</span>'
        },
        removalDelay: 350,
        mainClass: 'mfp-appear-anm mfp-product-gallery',
        fixedContentPos: true,
        fixedBgPos: true,
        callbacks: {
          beforeOpen: () => {
            vndHlp.hideLoading();
          },
          open: function() {
            $('.mfp-expander').click( function() {
                $('body').on('click', vndHlp.entFScr('.mfp-product-gallery.mfp-wrap'));
                $('.mfp-expander').hide();
              }
            );
          },

          beforeClose: function() {
            $('body').off('click', vndHlp.entFScr);
          },

          close: function() {
            /* Close fullscreen */
            vndHlp.extFScr();
            return;
          },

          markupParse: function(template, values, item) {}
        }
      }, index);
    };
  }
}

function initLookbookSpots(container) {
  const $ep_list = container.getElementsByClassName('lookbook-expander');

  function hideOther(e) {
    if ( $('.lookbook-spot.active').length
      && !$(e.target).hasClass('lookbook-spot')
      && !$(e.target).parents('.lookbook-spot.active').length ) {
      const $active_spot = document.querySelector('.lookbook-spot.active');
      $active_spot.classList.remove('active');
      $active_spot.lastElementChild.style.top = '';
    }
  }

  for ( let j = 0; j < $ep_list.length; j++ ) {
    const $expander = $ep_list[j];

    $expander.onclick = function(e) {
      e.preventDefault();
      const $parent = this.parentElement,
            $card = this.nextElementSibling;

      hideOther(e);

      if ( $parent.classList.contains('active') ){
        $parent.classList.remove('active');
      } else {
        $parent.classList.add('active');
      }

      if (!$card) return;

      if ( $parent.offsetLeft > $card.offsetWidth ) {
        $card.style.right = '30px';
      } else {
        $card.style.left = '30px';
      }

      // If card overflows parent's territory, then show at the bottom of it
      // 54 is for flickity-dots height
      if ( $parent.offsetTop + $parent.offsetHeight + $card.offsetHeight > $parent.parentElement.offsetHeight - 54 ) {
        $card.style.top = $parent.parentElement.offsetHeight - 54 - $parent.offsetTop - $card.offsetHeight + 'px';
      } else {
        $card.style.top = '';
      }
    };
  }

  $(window).on('click', function(e) {
    // When user clicks outside of lookbook card, hide it
    hideOther(e);
  });
}

function initLookbookSwitch(c) {
  var $ctn = $(c); // Container
  if ( $ctn.length < 1 ) {
    return;
  }
  $ctn.find('.lookbook-switcher').on('click', function(e) {
    e.preventDefault();
    $ctn.find('.lookbook-spot').removeClass('active'); // Initiate all other lookbook spots

    var $parent = $(this).parent(); // Lookbook spot
    $parent.addClass('active');

    var p_h = $(this).data('product'); // Switch target product handle
    var $tgt = $ctn.find('.slide-lookbook-' + p_h); // Target carousel item

    const $p_c = $ctn.find('.lookbook-product .flickity-carousel'); // Products carousel
    $p_c.flickity( 'select', $tgt.index() );
  });
}

function initCountDown(container) {
  if ( !container ) {
    return;
  }

  const dates_arr = container.querySelectorAll('.product-date');
  for (let i = 0; i < dates_arr.length; i++) {
    const item = dates_arr[i],
          date = item.dataset.datetime;
    let html;

    if ( new Date(date) > new Date($.now()) ) {
      $(item).countdown(date, function(e) {
        html = '';
        html += '<div class="dealtime-wrapper"><span class="countdown-number">' + e.offset.totalDays + '</span><span class="countdown-text">' + vndTheme.t_d + '</span></div>';
        html += '<div class="dealtime-wrapper"><span class="countdown-number">' + e.offset.hours + '</span><span class="countdown-text">' + vndTheme.t_h + '</span></div>';
        html += '<div class="dealtime-wrapper"><span class="countdown-number">' + e.offset.minutes + '</span><span class="countdown-text">' + vndTheme.t_m + '</span></div>';
        html += '<div class="dealtime-wrapper"><span class="countdown-number">' + e.offset.seconds + '</span><span class="countdown-text">' + vndTheme.t_s + '</span></div>';

        $(item).html(html);
      });
    } else {
      $(item).parent().hide();
      $(item).parents('.product-card').removeClass('has-deal');
    }
  }
}

function initSwatch(container) {
  // Get all color swatch links in the container
  const cws = container.getElementsByClassName('color-swatch');
  for (let i = 0; i < cws.length; i++) {
    const $cw = cws[i];
    $cw.onclick = function (e) {
      e.preventDefault();
      // Get current active swatch
      const $ca = this.closest('.swatch-group').querySelector('.color-swatch.active');
      $ca && $ca.classList.remove('active');
      this.classList.add('active');

      var $card = this.closest('.product-card');
      var $productImage = $card.querySelector('.product-first-image');
      if ( this.dataset.image ) {
        if ( $productImage.tagName.toLowerCase() == 'div' ) {
          $productImage.dataset.bg = this.dataset.image;
        }
        else {
          $productImage.dataset.src = this.dataset.image;
        }
        $productImage.classList.remove('lazyloaded');
        $productImage.classList.add('lazyload');
        $productImage.parentElement.classList.add('image-loading');
      }

      var $variantPrice = $card.querySelector('.current-price');
      if ( this.dataset.price ) {
        $variantPrice.innerHTML = this.dataset.price;
      }
    }
  }
}

// Collection Tab Section
function initIstSection(container) {
  const $scs = container.getElementsByClassName('isotope-container');
  for (let i = 0; i < $scs.length; i++) {
    const $sc = $scs[i],
          $tablist = container.querySelector('.tab-list'),
          init_data = $tablist.querySelector('.isotope-selector.active').dataset.target,
          $tab_btns = container.getElementsByClassName('isotope-selector'),
          $mb_tab_list = container.querySelector('.isotope-mobile-selector'),
          $mb_ab = $mb_tab_list.querySelector('.isotope-mobile-selector .dd-pp__atv');

    const iso = new Isotope($sc, {
      filter: init_data,
      layoutMode: 'fitRows'
    });

    const $hd_list = $sc.getElementsByClassName('ds-none');
    Array.from($hd_list).forEach(($hd) => {
      $hd.classList.remove('ds-none');
    });

    Array.from($tab_btns).forEach(($btn) => {
      $btn.onclick = function (e) {
        e.preventDefault();
        if (vndHlp.isPhone()) {
          $mb_tab_list.querySelector('.isotope-selector.active').classList.remove('active');
        } else {
          $tablist.querySelector('.isotope-selector.active').classList.remove('active');
        }

        $mb_ab.innerHTML = this.innerHTML + $mb_ab.querySelector('.icon-dir-down').outerHTML;
        this.classList.add('active');
        const data = this.dataset.target;
        iso.arrange({ filter: data });
      };
    });
  }
}

function productReview() {
  if ( $('.shopify-product-reviews-badge').length > 0 && (typeof SPR != 'undefined') ) {
    setTimeout(() => {
      SPR.registerCallbacks();
      SPR.initRatingHandler();
      SPR.initDomEls();
      SPR.loadProducts();
      SPR.loadBadges();
    }, 500);
  }
}

function initSizeChart() {
  $('.link-page-popup').on('click', function(e) {
    e.preventDefault();
    let url = this.href,
      delay = 0;
    const mpInstance = $.magnificPopup.instance;

    if ( mpInstance.isOpen ) {
      mpInstance.close();
      delay = 360;
    }

    setTimeout(function() {
      $.ajax({
        url: url,
        dataType: "html",
        type: "GET",
        beforeSend: function() {
          vndHlp.showLoading();
        },
        success: function(data) {
          vndHlp.hideLoading();
          $.magnificPopup.open({
            items: {
              src: data, // can be a HTML string, jQuery object, or CSS selector
              type: 'inline'
            },
            mainClass: 'mfp-appear-anm vnd-sizechart-pp',
            removalDelay: 350,
            fixedContentPos: true,
            fixedBgPos: true,
            callbacks: {
              open: function() {
                const slider = document.querySelector('.vnd-size-chart .items-carousel');
                initSlider(slider);
                initTabs('.vnd-size-chart');
              }
            },
          });
        },
        error: function() {
          vndHlp.hideLoading();
          console.log("Quick view error");
        }
      });
    }, delay);
  });
}

function quickViewInit() {
  $('.action-quickview').on("click", function(e) {
    e.preventDefault();
    let url = this.href;
    quickViewLoad(url);
  });
}

function zoomImage(container) {
  if ( !vndHlp.isTchDvc() && vndTheme.ebl_prd_z ) {
    const $zoom_targets = container.getElementsByClassName("product-images");
    let $zoom_container = container.querySelector('.zoom-container');

    if (!$zoom_container || window.innerWidth < 1200) {
      $zoom_container = false;
    }

    for (let i = 0; i < $zoom_targets.length; i++) {
      const $target = $zoom_targets[i];
      $($target.parentElement).zoom({
        url: $target.dataset.zoom,
        touch: false,
        target: $zoom_container,
        onZoomIn: function() {
          if ($zoom_container) {
            $zoom_container.classList.add('active');
          }
        },
        onZoomOut: function() {
          if ($zoom_container) {
            $zoom_container.classList.remove('active');
          }
        }
      });
    };
  }
}

function initThumbs(container) {
  const $ctn = document.querySelector(container);
  if ( !$ctn ) {
    return;
  }

  const $wrapper = $ctn.querySelector('.thumbs-wrapper');
  if ( !$wrapper ) {
    return;
  }

  const $viewport = $wrapper.querySelector('.thumbs-viewport'),
        $thumbs_container = $viewport.firstElementChild,
        $thumbs_up = $wrapper.querySelector('.thumb-arrow__up'),
        $thumbs_down = $wrapper.querySelector('.thumb-arrow__down');

  if ( $thumbs_up ) { // This means thumbs layout is vertical, not horizontal
    $thumbs_up.classList.add('disabled');
    $viewport.style.maxHeight = $('.product-images').height() - 2*parseInt(window.getComputedStyle($wrapper).paddingTop) + 'px';
    if ( $viewport.offsetHeight >= $thumbs_container.offsetHeight ) {
      $thumbs_down.classList.add('disabled');

      if ($viewport.parentElement.classList.contains('thumbs-circle') ) {
        $viewport.classList.add('ds-flex', 'align-center');
      }
    }

    var thumb_h = $viewport.querySelector('.product-thumb').offsetHeight;

    $thumbs_up.onclick = function(e) {
      e.preventDefault();
      if ( this.classList.contains('disabled') ) return;
      var $target = e.currentTarget;

      if ( $thumbs_container.offsetTop < thumb_h ) {
        $($thumbs_container).animate({
          "top": "+=" + thumb_h
        }, 200, function() {
          $thumbs_down.classList.remove('disabled');
          if ( $thumbs_container.offsetTop >= 0 ) {
            $target.classList.add('disabled');
          }
        });
      }
    };

    $thumbs_down.onclick = function(e) {
      e.preventDefault();
      if ( this.classList.contains('disabled') ) return;
      var $target = e.currentTarget;

      $($thumbs_container).animate({
        "top": "-=" + thumb_h
      }, 200, function() {
        $thumbs_up.classList.remove('disabled');

        if (($($viewport).offset().top + $viewport.offsetHeight) >= ($($thumbs_container).offset().top + $thumbs_container.offsetHeight) ) {
          $target.classList.add('disabled');
        }
      });
    };
  } else {
    const hasMultipleCells = $thumbs_container.querySelectorAll('.product-thumb').length > 1;
    $($thumbs_container).flickity({
      sync: $('.product-img-area .items-carousel')[0],
      contain: true,
      pageDots: false,
      prevNextButtons: hasMultipleCells
    });
  }
}

function quickViewLoad(url) {
  $.ajax({
    url: url,
    dataType: "html",
    type: "GET",
    beforeSend: () => {
      vndHlp.showLoading();
    },
    success: function(data) {
      vndHlp.hideLoading();
      $.magnificPopup.open({
        items: {
          src: '<div class="product-quick-view vnd-pp-content">' + data + '</div>', // can be a HTML string, jQuery object, or CSS selector
          type: 'inline'
        },
        mainClass: 'mfp-appear-anm vnd-qv-pp',
        removalDelay: 350,
        fixedContentPos: true,
        fixedBgPos: true,
        callbacks: {
          open: function() {
            initProductImageSlider('.mfp-content');
            initCountDown(this.content[0]);
            productReview();
            zoomImage(this.content[0]);
            initThumbs(".product-quick-view");
            initProductSwatch('.product-quick-view');
            vndHlp.wslst();
            vndHlp.cplst();
            initSizeChart();
            window.history && window.history.pushState && window.history.pushState({'page': 'quickview'}, 'quickviewed');
          },
          afterClose: function() {
            vndHlp.wslst();
            vndHlp.cplst();
          }
        },
      });
    },
    error: function() {
      vndHlp.hideLoading();
      console.log("Quick view error");
    }
  })
}

function initProductSwatch(container) {
  var $container = $(container);
  if ( $container.find('[data-product-json]').html() ) {
    var product = JSON.parse($('[data-product-json]').html());

    // Enable history state when quickview is closed
    let enb_hs = document.documentElement.classList.contains('vnd-popup-opened') ? false : true;

    if (Shopify.OptionSelectors) {
      new Shopify.OptionSelectors('product-actual-select', {
        product: product,
        onVariantSelected: selectSwatchCallback,
        enableHistoryState: enb_hs
      });
    }
  }

  $('.qty-control').each(function() {
    const $qty = $(this);
    if ( $qty.hasClass('qty-initialized') ) {
      return;
    }
    $qty.addClass('qty-initialized');

    $qty.on('click', '.reduce', function(e) {
      $qty.find('.quantity').val(function(i, ov) {
        if ( parseInt(ov) > 1 ) {
          return --ov;
        } else {
          return ov;
        }
      });
    });

    $qty.on('click', '.increase', function(e) {
      $qty.find('.quantity').val(function(i, ov) {
        return ++ov;
      });
    });
  });

  $container.on('click', '.product-single-option .option-label', function(e) {
    e.preventDefault();
    $(this).parent().find('.option-label').removeClass('active');
    $(this).addClass('active');

    const optionIndex = $(this).parent().attr('data-option-index') - 1,
          optionValue = $(this).attr('data-value');
    $(this)
    .closest('form')
    .find('.single-option-selector')
    .eq(optionIndex)
    .val(optionValue)
    .trigger('change');
  });

  $container.on('change', '.product-single-option .option-selector', function() {
    const optionIndex = $(this).attr('data-option-index') - 1,
          optionValue = $(this).val();
    $(this)
    .closest('form')
    .find('.single-option-selector')
    .eq(optionIndex)
    .val(optionValue)
    .trigger('change');
  });
}

function selectSwatchCallback(variant, selector) {
  var class_name = '.product-details-area';
  if (document.querySelector('.product-form-sticky')) {
    class_name = '.product-form-sticky';
  }

  var $container = typeof selector == 'undefined' ? $(class_name) : $(selector.variantIdField).closest(class_name);
  $container.addClass('product-disabled');
  $container.find('.notify').hide();

  if ( variant ) {
    let mf_p = variant.price,
        mf_c = variant.compare_at_price;

    mf_p = vndCurrency.formatMoney(variant.price, vndTheme.m_f);
    mf_c = vndCurrency.formatMoney(variant.compare_at_price, vndTheme.m_f);

    $container.find('.current-price').first().html(mf_p);
    const $old = $container.find('.old-price').first();
    $old.html(mf_c);

    if ( variant.compare_at_price > 0 ) {
      $old.show();
    } else {
      $old.hide();
    }

    vndHlp.formatCurrency();

    if ( variant.sku ) {
      $container.find('.product-sku .sku').first().html(variant.sku);
      $container.find('.product-sku').show();
    } else {
      $container.find('.product-sku').hide();
    }

    if ( variant.featured_image ) {
      var src = Shopify.Image.removeProtocol(variant.featured_image.src);
      $container.find(".thumbs-container img").filter('[src="' + src.replace('.jpg', '_100x.jpg') + '"]').trigger("click");
    }

    const $btn = $container.find('.btn-add-cart'),
          $btn_t = $container.find('.btn-add-cart .add-cart__text'),
          $stock = $container.find('.product-details__text .in-stock').first();
    if ( variant.available ) {
      const stock = parseInt(selector.variantIdField.selectedOptions[0].dataset.quantity),
            inv_mngmt = selector.variantIdField.selectedOptions[0].dataset.inventoryManagement;

      if (vndTheme.hd_prd_av && !inv_mngmt) {
        $stock.parent().remove();
      } else {
        $stock.html(vndTheme.lang.product.inStock);
      }
      $btn.addClass('btn-anm-cart');
      const str = ( (inv_mngmt && stock < 1) ? vndTheme.lang.product.preOrder : vndTheme.lang.product.addToCart );
      $btn_t.html(str);
      $container.removeClass('product-disabled');
    } else {
      $stock.html(vndTheme.lang.product.outStock);
      $btn_t.html(vndTheme.lang.product.soldOut);
      $btn.removeClass('btn-anm-cart');
      $container.find('.notify').show();
    }

    var variant_media = variant.featured_media ? variant.featured_media.id : false;
    var slider = $('.product-img-area .items-carousel.flickity-enabled');
    $(slider).find('.product-img').each(function(key, value) {
      var media_id = this.dataset.media;
      if ( variant_media && variant_media == media_id ) {
        slider.flickity( 'select', key );
        return false;
      }
    });

    $('.product-layout__grid .product-img-area .product-img').each(function(key, value) {
      var media_id = this.dataset.media;
      if ( variant_media && variant_media == media_id ) {
        $('html, body').animate({
          scrollTop: $(this).offset().top
        }, 450);
        return false;
      }
    });
  }
}

function initTabs(container) {
  container.querySelectorAll('.tabs-nav__item a').forEach( function (tab_atv) {
    tab_atv.addEventListener('click', function (e) {
      e.preventDefault();
      const active_tab_item = container.querySelector('.tabs-nav__item.active')
      if (active_tab_item) {
        active_tab_item.classList.remove('active');
      }
      this.parentElement.classList.add('active');
      container.querySelector('.tabs-content__item.active').classList.remove('active');
      container.querySelector(e.currentTarget.hash).classList.add('active');
      $('.vnd-link__move').parent().removeClass('active');
    });
  });
}

// Venedor Theme Helper functions
var vndHlp = {
  // Initialize sections
  initSct( id, query, constructor ) {
    if ( id ) {
      const $c = document.getElementById(id);
      $c.childElementCount > 0 && constructor($c);
    } else {
      const $cs = document.querySelectorAll(query);
      if ($cs.length > 0) {
        for (let i = 0; i < $cs.length; i++) {
          const $c = $cs[i];
          $c.childElementCount > 0 && constructor($c);
        }
      }
    }
  },

  parseVideo (url) {
    url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

    if (RegExp.$3.indexOf('youtu') > -1 ) {
      var type = 'youtube';
    } else if (RegExp.$3.indexOf('vimeo') > -1 ) {
      var type = 'vimeo';
    }

    return {
      type: type,
      id: RegExp.$6
    }
  },

  // Initialize Video play/pause controls
  ctrVideo () {
    $('video').each(function(i, video) {
      video.onplay = function(e, i){
       this.parentElement.classList.add('playing');
       this.parentElement.classList.remove('paused');
      }

      video.onpause = function(e, i){
        this.parentElement.classList.remove('playing');
        this.parentElement.classList.add('paused');
      }
    });

    $('.play-video').on('click', function(e) {
      e.preventDefault();
      const $vd = this.parentElement.querySelector('video');
      $vd.muted = false;
      $vd.play();
      this.parentElement.classList.add('playing');
      this.parentElement.classList.remove('paused');
    });

    $('.pause-video').on('click', function(e) {
      e.preventDefault();
      const $vd = this.parentElement.querySelector('video');
      $vd.pause();
      this.parentElement.classList.remove('playing');
      this.parentElement.classList.add('paused');
    });
  },

  parseMoney (money, origin) {
    if ( money ) {
      if ( vndCurrency.moneyFormats[vndTheme.s_c].money_format.indexOf('comma_separator') < 0 ) {
        money = money.replace(/,/g, '');
      } else {
        money = money.replace('.', '').replace(/,/g, '.');
      }

      return money.match(/([0-9]*[.])?[0-9]+/g)[0];
    }
  },

  formatCurrency() {
    vndCurrency.currentCurrency = vndCurrency.cookie.read();

    jQuery('span.money span.money').each(function() {
      jQuery(this).parents('span.money').removeClass('money');
      jQuery(this).attr('data-currency-' + vndTheme.s_c, jQuery(this).html());
    });

    // If there's no cookie or it's the shop vndCurrency.
    if ( vndCurrency.currentCurrency == null || vndCurrency.currentCurrency === vndTheme.s_c ) {
      vndCurrency.currentCurrency = vndTheme.s_c;
      // vndCurrency.convertAll(vndTheme.s_c, vndTheme.s_c);
    } else {
      if ( vndTheme.p_f == 'without_zero' && vndCurrency.moneyFormats[vndCurrency.currentCurrency][vndCurrency.format].indexOf('no_decimals') < 0 ) {
        vndCurrency.moneyFormats[vndCurrency.currentCurrency][vndCurrency.format] = vndCurrency.moneyFormats[vndCurrency.currentCurrency][vndCurrency.format].replace('amount', 'amount_no_decimals');
      }
      vndCurrency.convertAll(vndTheme.s_c, vndCurrency.currentCurrency);

      // Set currency flag
      let newHtml = vndCurrency.currentCurrency;
      if ( $('.currency-flag').length > 0 ) {
        newHtml = '<span class="currency-flag currency-flag-' + vndCurrency.currentCurrency.toLowerCase() + '"></span>' + vndCurrency.currentCurrency;
      }
      jQuery('.selected-currency .flag-name').html(newHtml);
    }

    if ( vndTpl == 'collection' ) {
      collectionPage.initPriceRange(vndCurrency.currentCurrency);
    }

    if ( vndTpl == 'search' ) {
      searchPage.initPriceRange(vndCurrency.currentCurrency);
    }

    const $select_currency = $('select[name=currency]');

    // Change currency
    jQuery('.currency-item').click(function(e) {
      e.preventDefault();
      var newCurrency = jQuery(this).attr('data-currency');

      vndCurrency.cookie.write(newCurrency);

      $select_currency.val(newCurrency);
      $select_currency.parents('form').submit();
    });
  },

  initCookieNotify() {
    var $cookie_div = $('.cookie-notify-container');
    if ( $cookie_div.length > 0 && vndHlp.readCookie('vs_cookieAgree') == 'true' ) {
      $cookie_div.remove();
    } else {
      $cookie_div.addClass('active');
    }

    $('.btn-cookie-close').on('click', function(e) {
      e.preventDefault();
      $cookie_div.remove();
      vndHlp.createCookie('vs_cookieAgree', 'true', 1);
    });
  },

  createCookie (name, value, days ) {
    var expires;
    if (days ) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    }
    else {
      expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
  },

  readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for ( var i = 0; i < ca.length; i++ ) {
      var c = ca[i];
      while ( c.charAt(0) === ' ' ) c = c.substring(1, c.length);
      if ( c.indexOf(nameEQ) === 0 ) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    return null;
  },

  eraseCookie(name) {
    vndHlp.createCookie(name, "", -1);
  },

  refreshCart(cart) {
    var mpInstance = $.magnificPopup.instance;
    if ( mpInstance.isOpen ) {
      mpInstance.close();
    }

    $('.cart-total').text(cart.item_count);
    $('.icon-cart__total').text(cart.item_count);

    // Update cart list
    $.get("/cart?view=json", function(list) {
      $(".cart-dropdown").html(list);
      lazySizes.loader.checkElems();
      $('.icon-cart__count .money').html(vndCurrency.formatMoney(cart.total_price, vndTheme.m_f));

      vndHlp.formatCurrency();
      cartPage.initCartPp();

      document.dispatchEvent(
        new CustomEvent('vnd_ajx:crt:success', {
          bubbles: true,
          cancelable: true
        })
      );
    });
  },

  getTagsFromUrl() {
    if ( location.search.length ) {
      for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
        aKeyValue = aCouples[i].split('=');
        if ( aKeyValue.length > 1 ) {
          Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
        }
      }
    }

    if ( Shopify.queryParams.constraint ) {
      vndTheme.currentTags = Shopify.queryParams.constraint.split('+');
    }
  },

  setTagsFromString(string) {
    var newTag = string.replace(/\s+/g, '-');
    if ( newTag ) {
      var tagIndex = vndTheme.currentTags.indexOf(newTag);

      for (let i = 0; i < vndTheme.currentTags.length; i++) {
        if ( vndTheme.currentTags[i].indexOf('page::') > -1 ) {
          vndTheme.currentTags.splice(i, 1);
          break;
        }
      }

      if ( tagIndex >= 0 ) {
        vndTheme.currentTags.splice(tagIndex, 1);
      } else {

        for (let i = 0; i < vndTheme.currentTags.length; i++) {
          if ( vndTheme.currentTags[i].indexOf('price::') > -1 && newTag.indexOf('price::') > -1) {
            vndTheme.currentTags.splice(i, 1);
            break;
          }

          if ( vndTheme.currentTags[i].indexOf('show::') > -1 && newTag.indexOf('show::') > -1) {
            vndTheme.currentTags.splice(i, 1);
            break;
          }
        }

        vndTheme.currentTags.push(newTag);
      }
    }

    if ( vndTpl == 'collection' ) {
      $('.dd-pp__close').trigger('click');
      collectionPage.filterProducts();
    }
  },

  setQueryParams() {
    if ( vndTheme.currentTags.length ) {
      Shopify.queryParams.constraint = vndTheme.currentTags.join('+');
    } else {
      delete Shopify.queryParams.constraint;
    }
  },

  // Check if device size is mobile
  isMobile() {
    return document.body.clientWidth + vndTheme.scroll_width < 992;
  },

  isPhone() {
    return document.body.clientWidth + vndTheme.scroll_width < 768;
  },

  // Check if device type is touch
  isTchDvc() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  },

  // Check if mobile menu initialized
  didMblInit() {
    return $('body').hasClass('mobile-menu-init');
  },

  // Check if mobile sidebar initialized
  didMblSdbInit() {
    return $('body').hasClass('mobile-sidebar-init');
  },

  subscribeNsl($form) {
    let url = $form.attr('action'),
        type = 'get',
        dataType = 'json',
        contentType = 'application/json; charset=utf-8';
    if (url.indexOf('subscribe/post?u=') > -1) {
      url = url.replace('subscribe/post?u=', 'subscribe/post-json?u=') + '&c=?';
    }

    if (url.indexOf('subscribe?u=') > -1) {
      url = url.replace('subscribe?u=', 'subscribe/post-json?u=') + '&c=?';
    }

    $($form).parents('.newsletter-form').addClass('submitted');

    $.ajax({
      type: type,
      url: url,
      data: $form.serialize(),
      cache: false,
      dataType: dataType,
      contentType: contentType,
      beforeSend: function() {
        $($form).find('.btn').addClass('vnd-btn-busy').html('<span class="spinner" style="position:relative"></span>');
      },
      error: function(err) {
        let notice = vndTheme.lang.newsletter.error404;
        if ( err.status == 429 ) {
          notice = vndTheme.lang.newsletter.error429;
        }

        $form.replaceWith('<div class="msg-notice msg-notice__error">' + notice + '</div>');
        vndHlp.eraseCookie('vs_newsletterRead');
      },
      success: function(data, respond) {
        if ( data.result == 'success' ) {
          $form.replaceWith('<div class="msg-notice msg-notice__success">' + vndTheme.lang.newsletter.confirmation + '</div>');
          $('.subscribe-config').remove();
          vndHlp.createCookie('vs_newsletterRead', 'true', 1);
        } else {
          const notice = data.msg.replace('<a ', '<a class="em ds-block" ');
          $form.replaceWith('<div class="msg-notice msg-notice__' + data.result + '">' + notice + '</div>');
          vndHlp.eraseCookie('vs_newsletterRead');
        }
      }
    });
  },

  // Enter full screen with given class name element
  entFScr(class_name) {
    $(class_name).attr('id', 'fullscreen-element');
    var el = document.getElementById('fullscreen-element');
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.mozRequestFullScreen) { /* Firefox */
      el.mozRequestFullScreen();
    } else if (el.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      el.webkitRequestFullscreen();
    } else if (el.msRequestFullscreen) { /* IE/Edge */
      el.msRequestFullscreen();
    }
  },

  // Exit fullscreen
  extFScr() {
    if ( document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement ) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
    }
  },

  // Initialize wishlist
  wslst() {
    productsCookieList();
  },

  // Initialize comparelist
  cplst() {
    const setting = {
      type: "vnd_cplst",
      pageClass: '.page-compare',
      btnClass:   ".btn-compare",
      listItem:   '.compare-card',
      listCount:  '.compare-count',
      listGrid:   '.compare-grid',
      removeAll:  '.clear-cplst',
      ajaxTarget: '?view=compare_item_html'
    }

    productsCookieList(setting);
    var list = localStorage.getItem("vnd_cplst");
    if ( list != null ) {
      $('.compare-grid').show();
    }
  },

  updateCpWsCt(target) {
    let $listCount = target.querySelector('.wishlist-count');
    let list = localStorage.getItem('vndWslst') || [];
    if (list.length > 0) {
      list = JSON.parse(list);
    }
    $listCount && ($listCount.innerText = list.length);

    $listCount = target.querySelector('.compare-count');
    list = localStorage.getItem('vnd_cplst') || [];
    if (list.length > 0) {
      list = JSON.parse(list);
    }
    $listCount && ($listCount.innerText = list.length);
  },

  showLoading() {
    $('.vnd-loading-scr').fadeIn('fast');
  },

  hideLoading() {
    $('.vnd-loading-scr').fadeOut('fast');
  }
}

function initNewsletter() {
  if ( vndTheme.ebl_nsl_pp ) {
    $('.subscribe-config input').on('click', function() {
      if ( $(this).parent().find('input:checked').length ) {
        vndHlp.createCookie('vs_newsletterRead', 'true', 1);
      } else {
        vndHlp.eraseCookie('vs_newsletterRead');
      }
    });

    if ( vndHlp.readCookie('vs_newsletterRead') == null ) {
      setTimeout(function() {
        const mpInstance = $.magnificPopup.instance;
        let delay = 0;
        if ( mpInstance.isOpen ) {
          mpInstance.close();
          delay = 360;
        }

        setTimeout(function() {
          $.magnificPopup.open({
            items: {
              src: $('#newsletter-popup'),
              type: 'inline'
            },
            removalDelay: 350,
            mainClass: 'mfp-appear-anm vnd-nsl-pp',
            midClick: true,
            fixedBgPos: true,
            callbacks: {
              beforeOpen: function() {
                $('#newsletter-popup .image-bg').length && lazySizes.loader.unveil($('#newsletter-popup .image-bg')[0]);
              },
              beforeClose: function() {
                if (this.content.find('.msg-notice__success').length) {
                  vndHlp.createCookie('vs_newsletterRead', 'true', 1);
                }
              }
            },
          });
        }, delay);
      }, vndTheme.nsl_dl * 1000);
    }
  }

  $('.form-newsletter button').on('click', function (e) {
    if ( $(e.currentTarget).hasClass('vnd-btn-busy') ) {
      return;
    }
    const $form = $(e.target).parents('form');
    if ( $form[0].checkValidity() && vndTheme.nsl_svc == 'mailchimp' ) {
      e.preventDefault();
      vndHlp.subscribeNsl($form);
    } else {
      return;
    }
  });
}

vndTheme.UserNotice = (function() {
  let content = "",
      content_type = "";

  let selectors = {
    container: '#user-notice',
    heading: '.heading',
    message: '.message',
    close: '.us-nt__c'
  }

  const $container = document.querySelector(selectors.container),
        $heading = $container.querySelector(selectors.heading),
        $message = $container.querySelector(selectors.message),
        $close = $container.querySelector(selectors.close);

  function _setupNoticeBox(request, type) {
    content = request.responseJSON;
    content_type = type;
    _updateContent();
    _setupEventHandlers();
  }

  function _setupEventHandlers() {
    $close.addEventListener('click', closeNotice);
  }

  function _updateContent() {
    $container.firstElementChild.classList.add('msg-notice__' + content_type);

    $heading.innerHTML = content.message;
    $message.innerHTML = content.description;

    if (!content.message ) {
      $heading.style.display = 'none';
    } else {
      $heading.style.display = 'block';
    }

    $container.classList.add('loaded');
  }

  function closeNotice(e) {
    $container.classList.add('disappearing');
    setTimeout(() => {
      $container.classList.remove('disappearing', 'loaded');
      $container.firstElementChild.classList.remove('msg-notice__info', 'msg-notice__warn', 'msg-notice__error', 'msg-notice__success');
    }, 480);
  }

  return _setupNoticeBox
})();

// Initialize Popup messages
vndTheme.Popups = (function() {
  function Popups(container) {
    this.container = container

    this.selectors = {
      popup_activator: 'vpp-atv', // getElementsByClassName
      popup_box: 'vpp-bx',        // Compare class name
      popup_close: '.vpp-close'   // querySelector
    }

    this.eventHandlers = {};

    this._setupPopups();
    this._setupEventHandlers();
  }

  Popups.prototype = Object.assign({}, Popups.prototype, {
    _setupPopups: function() {
      this.pp_al = this.container.getElementsByClassName(this.selectors.popup_activator); // Popup activator list
    },

    _setupEventHandlers: function() {
      this.eventHandlers.open = this.onPopupOpen.bind(this);
      this.eventHandlers.bodyClick = this._bodyClick.bind(this);
      this.eventHandlers.close = this.closePopups.bind(this);

      Array.from(this.pp_al).forEach(($pp_a) => {
        $pp_a.addEventListener('click', this.eventHandlers.open);
      });
    },

    onPopupOpen: function(e) {
      e.preventDefault();
      const scroll_width = vndTheme.scroll_width + 'px';

      document.body.style.paddingRight = scroll_width;
      document.documentElement.classList.add('vnd-popup-opened');

      var target = e.currentTarget.hash.slice(1);
      this.pp_box = document.getElementById(target);
      this.pp_box.classList.add('active');

      const close_btn = this.pp_box.querySelector(this.selectors.popup_close);
      close_btn.addEventListener('click', this.eventHandlers.close);

      setTimeout(() => {
        document.body.addEventListener('click', this.eventHandlers.bodyClick);
      }, 250);
    },

    closePopups: function(e) {
      e.preventDefault();
      e.stopPropagation();

      this.pp_box.classList.remove('active');

      setTimeout(() => {
        document.dispatchEvent(
          new CustomEvent('vnd_popup:close', {
            bubbles: true,
            cancelable: true
          })
        );
        document.body.removeEventListener('click', this.eventHandlers.bodyClick);
      }, 350);
    },

    _bodyClick: function(e) {
      if (!e.target.classList.contains(this.selectors.popup_box) && !e.target.closest('.' + this.selectors.popup_box)) {
        this.closePopups(e)
      }
    }
  });

  return Popups;
})();

// Initialize Dropdown Elements
vndTheme.Dropdowns = (function() {
  function Dropdowns(container) {
    this.container = container;

    this.selectors = {
      activator: 'dd-pp__atv', // getElementsByClassName
      wrapper: 'dd-pp__wrp',        // Compare class name
      close: '.dd-pp__close'   // querySelector
    }

    this.eventHandlers = {};

    this._setupDropdowns();
    this._setupEventHandlers();
  }

  Dropdowns.prototype = Object.assign({}, Dropdowns.prototype, {
    _setupDropdowns: function() {
      // Dropdown activator list
      this.dd_al = this.container.getElementsByClassName(this.selectors.activator);
    },

    _setupEventHandlers: function() {
      this.eventHandlers.open = this.onDropdownOpen.bind(this);
      this.eventHandlers.bodyClick = this._bodyClick.bind(this);
      this.eventHandlers.close = this.closeDropdown.bind(this);

      Array.from(this.dd_al).forEach(($dd_a) => {
        $dd_a.addEventListener('click', this.eventHandlers.open);
      });
    },

    onDropdownOpen: function(e) {
      e.preventDefault();
      const $prev = document.querySelector('.dd-pp__wrp.active');
      if ($prev) {
        this._handleClose($prev);
      }

      this.$wrapper = e.currentTarget.parentElement;
      this.$wrapper.classList.add('active');

      const close_btn = this.$wrapper.querySelector(this.selectors.close);
      close_btn && close_btn.addEventListener('click', this.eventHandlers.close);

      setTimeout(() => {
        document.body.addEventListener('click', this.eventHandlers.bodyClick);
      }, 250);
    },

    closeDropdown: function(e) {
      e.preventDefault();
      this._handleClose(this.$wrapper);
      document.body.removeEventListener('click', this.eventHandlers.bodyClick);
    },

    _bodyClick: function(e) {
      if (!e.target.classList.contains(this.selectors.wrapper) &&
          !e.target.closest('.' + this.selectors.wrapper)) {
        this.closeDropdown(e)
      }
    },

    _handleClose: function($el) {
      $el.classList.add('disappearing');
      setTimeout(() => {
        $el.classList.remove('active', 'disappearing');
      }, 350);
    }
  });

  return Dropdowns;
})();

// Initialize functions on window resize
function rszRender() {
  window.onresize = function() {
    initMobileMenu();
    initMobileSidebarMenu();
    vndHeader.initMenuPosition(true);
  }
}

function initScrollTop() {
  var scrolled = false;
  $(window).scroll(function() {
    if ( 250 < $(window).scrollTop() && !scrolled ) {
      $('#toPageTop').addClass('visible');
      scrolled = true;
    }

    if ( 250 > $(window).scrollTop() && scrolled ) {
      $('#toPageTop').removeClass('visible');
      scrolled = false;
    }
  });

  $('#toPageTop').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 'fast');
  })
}

// Search Iframes and convert youtube and vimeos to player
function initIframes(container) {
  const $iframes = container.getElementsByTagName('iframe');
  for (let i = 0; i < $iframes.length; i++) {
    const $el = $iframes[i];
    var videoObj = vndHlp.parseVideo($el.dataset.src);

    if ( $el.dataset.autoplay == "autoplay" ) {
      videoObj.id += '?autoplay=1';
    }

    if ( videoObj.type == 'youtube' ) {
      $el.src = '//www.youtube.com/embed/' + videoObj.id;
    } else if ( videoObj.type == 'vimeo' ) {
      $el.src = '//player.vimeo.com/video/' + videoObj.id;
    }
  }
}

var vndPageProduct = {
  init() {
    // var vndSts = new vndTheme.vndSts();
    vndHlp.initSct(null, '.products-template', vndPrdTplSt.onLoad);
    vndHlp.initSct(null, '.product-details-tabs', vndPrdDtTabsSt.onLoad);
    vndPrdRcnt.addProduct();
    initSizeChart();

    // Sticky form layout
    const $sticky_layout = document.getElementById('shopify-section-template-product-sticky-form')
    if ( $sticky_layout ) {
      if ( window.innerWidth < 992 ) {
        document.querySelector('.product-form-init').innerHTML = $sticky_layout.innerHTML;
        initProductSwatch('.product-layout');
      } else {
        initStickySidebar();
        initProductSwatch('#shopify-section-template-product-sticky-form');
      }
    }
  }
}

var collectionPage = {
  // Collection Layout
  $container: document.querySelector('.collection-layout'),
  // Venedor Collection Main Container
  $vnd_main_ctn: document.getElementById("collectionsContent"),
  // Collection sort container
  $sort_ctn: document.querySelector('.collection-sort'),
  $sidebar: document.querySelector('.collection-layout .mobile-sidebar'),
  $loading_bg: document.querySelector(".result-loading"),
  $load_more_point: document.getElementById('infinite-more-link'),
  $load_more_btn: document.querySelector('.load-more'),
  waypoint: null,

  init() {
    const _this = this;

    vndHlp.getTagsFromUrl();

    if ( vndTheme.scr_tm ) {
      _this.scrollToMain(700);
    }

    _this.initSidebarMenu();
    _this.sortbyFilter();
    _this.showByGroup();
    _this.initGridSwitch();
    _this.initFilterByTag();
    _this.initFilterByColor();
    _this.initInfinitScroll();
    initCountDown(_this.$vnd_main_ctn);
    new vndTheme.Dropdowns(_this.$sort_ctn);
  },

  scrollToMain(sec) {
    let element = '.collection-sort';
    if ( vndTpl == 'search' ) {
      element = '#shopify-section-template-search';
    }

    if ( $(element).length ) {
      $('body,html').animate({
        scrollTop: $(element).offset().top - 65
      }, sec || 350);
    }
  },

  replaceContent(targetUrl, method='replace', w_url) {
    const _this = this;

    let pointer = null;
    if (_this.$load_more_btn) {
      pointer = '.load-more';
    } else if (_this.$load_more_point) {
      pointer = '#infinite-more-link';
    }

    $.ajax({
      type: 'GET',
      url: targetUrl,
      beforeSend: function() {
        _this.$vnd_main_ctn.classList.add('loading');
        _this.$loading_bg.classList.add('active');
        $(pointer).addClass('disabled');
      },
      success: function(result) {
        const breadcrumb = $(result).find('.breadcrumb').html();
        $('.breadcrumb').html(breadcrumb);

        var collectionSort = $(result).find('.collection-sort').html();
        _this.$sort_ctn.innerHTML = collectionSort;

        if (_this.$sidebar) {
          const sidebar = $(result).find('.mobile-sidebar').html();
          _this.$sidebar.innerHTML = sidebar;
        }

        let filteredResult = new DOMParser().parseFromString(result, 'text/html').querySelector('#collectionsContent .row');
        if (method == 'replace' ) {
          $('#collectionsContent .row').empty();
        } else {
          $(pointer).remove();
        }

        $('#collectionsContent .row').append(filteredResult.children);
        _this.$load_more_point = _this.$vnd_main_ctn.querySelector('#infinite-more-link');
        _this.$load_more_btn = _this.$vnd_main_ctn.querySelector('.load-more');

        if (method == 'replace' ) {
          _this.scrollToMain(360);
          if (w_url) {
            window.history && window.history.pushState && window.history.pushState('','', w_url);
          } else {
            const a_url = targetUrl.replace('view=ajax', '');
            window.history && window.history.pushState && window.history.pushState('','', a_url);
          }
        } else {
          _this.waypoint && _this.waypoint.destroy();
        }

        setTimeout(() => {
          _this.$vnd_main_ctn.classList.remove('loading');
          _this.$loading_bg.classList.remove('active');
          initStickySidebar();
        }, 750);


        productReview();
        _this.initInfinitScroll();
        initSwatch(_this.$vnd_main_ctn);
        vndHlp.wslst();
        vndHlp.cplst();
        quickViewInit();
        _this.initPriceRange();
        initCountDown(_this.$vnd_main_ctn);

        _this.initSidebarMenu();
        const dropdowns = new vndTheme.Dropdowns(_this.$sort_ctn);
        _this.sortbyFilter();
        _this.showByGroup();
        _this.initFilterByTag();
        _this.initFilterByColor();
        _this.initGridSwitch();
      },
      error: function(x, t, m) {
        console.log(x, t, m);
        location.replace(targetUrl);
      },
      dataType: "html"
    });
  },

  filterProducts() {
    vndHlp.setQueryParams();
    delete Shopify.queryParams.page;
    const a_param = '?view=ajax&' + jQuery.param(Shopify.queryParams).replace(/\+/g, '%20'), // Actual params
          w_param = '?' + jQuery.param(Shopify.queryParams).replace(/\+/g, '%20'), // Window params
          a_url = location.origin + location.pathname + a_param,
          w_url = location.origin + location.pathname + w_param;

    if ( vndTheme.stt.eb_ajx_flt ) {
      this.replaceContent(a_url, 'replace', w_url);
    } else {
      location = w_url;
    }
  },

  sortbyFilter() {
    if (this.$sort_ctn.classList.contains('cfd-classic')) {
      $('#sort-by').on('change', function() {
        Shopify.queryParams.sort_by = $(this).val();
        collectionPage.filterProducts();
      });
    } else {
      const $sorts = this.$sort_ctn.querySelectorAll('.sort-wrapper .dd-pp__item'),
            $sort_close = this.$sort_ctn.querySelector('.sort-wrapper .dd-pp__close'),
            $sort_by = document.getElementById('sort-by');

      for ( let i = 0; i < $sorts.length; i++ ) {
        const node = $sorts[i];

        node.onclick = function() {
          $sort_by.firstChild.innerText = this.innerText;
          $sort_close.click();
          if ( !this.classList.contains('active') ) {
            Shopify.queryParams.sort_by = this.dataset.value;
            collectionPage.filterProducts();
          }
        }
      }
    }
  },

  showByGroup() {
    let new_tag = 'show::';

    if (this.$sort_ctn.classList.contains('cfd-classic')) {
      $('#group-by').on('change', function() {
        new_tag += $(this).val();
        vndHlp.setTagsFromString(new_tag);
      });
    } else {
      const $sorts = this.$sort_ctn.querySelectorAll('.group-wrapper .dd-pp__item'),
            $sort_close = this.$sort_ctn.querySelector('.group-wrapper .dd-pp__close'),
            $sort_by = document.getElementById('group-by');

      for ( let i = 0; i < $sorts.length; i++ ) {
        const node = $sorts[i];

        node.onclick = function() {
          $sort_by.firstChild.innerText = this.innerText;
          $sort_close.click();
          if ( !this.classList.contains('active') ) {
            new_tag += this.dataset.value;
            vndHlp.setTagsFromString(new_tag);
          }
        }
      }
    }
  },

  initFilterByTag() {
    const filter_doms = this.$container.querySelectorAll('.filter-tag a');

    for (let i = 0; i < filter_doms.length; i++) {
      const fl = filter_doms[i];
      fl.onclick = function(e) {
        e.preventDefault();
        if ( Shopify.queryParams.constraint ) {
          vndTheme.currentTags = Shopify.queryParams.constraint.split('+');
        }

        $(this.firstElementChild).toggleClass('active');

        const filter_content = this.dataset.tag;

        vndHlp.setTagsFromString(filter_content);
      }
    }

    const $clear_tags = this.$sort_ctn.querySelector('.clear-tags');
    if ($clear_tags) {
      $clear_tags.onclick = function(e) {
        e.preventDefault();
        vndTheme.currentTags = [];
        collectionPage.filterProducts();
      }
    }
  },

  initFilterByColor() {
    $('.filter-color a').on('click', function(e) {
      e.preventDefault();

      if ( Shopify.queryParams.constraint ) {
        vndTheme.currentTags = Shopify.queryParams.constraint.split('+');
      }

      const newTag = this.dataset.color;
      vndHlp.setTagsFromString(newTag);
    });
  },

  initSidebarMenu() {
    document.body.querySelectorAll('.sidebar-carousel .items-carousel').forEach(function(carousel) {
      initSlider(carousel);
    });
    initStickySidebar();

    $('.sidebar-navigation .nav-child__wrapper').slideUp();
    $('.sidebar-navigation li').each(function(){
      if ( $(this).hasClass('active') ) {
        $(this).parents('li').addClass('active expanded');
      }
    });
    $('.sidebar-navigation .expanded > .nav-child__wrapper').slideDown();

    $('.expand').on('click', function(e) {
      e.preventDefault();
      const $this = $(e.currentTarget),
            $parent = $this.parent();

      $parent.toggleClass('expanded');
      $parent.find('>.nav-child__wrapper').slideToggle();
    });
  },

  initPriceRange(newCurrency) {
    const $this = document.getElementById('vnd-price-range');
    if ( !$this ) {
      return false;
    }

    let width = $($this.parentElement).width() - 18,
        price_max = parseFloat($this.dataset.max) || 100,
        price_min = parseFloat($this.dataset.min) || 1,
        range_start = parseFloat($this.dataset.rangeStart),
        range_end = parseFloat($this.dataset.rangeEnd),
        range = '',
        m_f = vndCurrency.moneyFormats[vndTheme.s_c]["money_format"].replace(/\{\{(.*?)\}\}/g, '%s');

    if (width < 100) {
      width = 270;
    }

    if ( newCurrency ) {
      m_f = vndCurrency.moneyFormats[newCurrency]["money_format"].replace(/\{\{(.*?)\}\}/g, '%s');
    }

    if ( price_min == price_max ) {
      price_min--;
    }

    price_min = Math.floor(price_min / 100);
    price_max = Math.ceil(price_max / 100);

    if (!range_start || !range_end) {
      range = price_min + ',' + price_max
    } else {
      range_start = Math.floor(range_start / 100);
      range_end = Math.ceil(range_end / 100);
      range = range_start + ',' + range_end
    }

    $($this).jRange({
      from: price_min,
      to: price_max,
      step: 1,
      format: m_f,
      showScale: false,
      isRange: range,
      width: width,
      ondragend: function(range) {collectionPage.initPriceElement(range)},
      onbarclicked: function(range) {collectionPage.initPriceElement(range)}
    }).jRange('setValue', range);
  },

  initPriceElement(range) {
    const _this = this;
    const r = range.split(','),
          price_min = parseFloat(r[0]) * 100,
          price_max = parseFloat(r[1]) * 100,
          new_tag = 'price::' + price_min + '-' + price_max;

    vndHlp.setTagsFromString(new_tag);

    setTimeout(() => {
      collectionPage.scrollToMain(360);
    }, 350);
  },

  initGridSwitch() {
    $('.collection-grid__switcher').on('click', function(e) {
      e.preventDefault();

      $('.collection-grid__switcher').removeClass('active');
      $(this).addClass('active');

      $('#collectionsContent .result-loading').addClass('active');

      if ( $(this).hasClass('grid') ) {
        $('#collectionsContent').removeClass('list').addClass('grid');
      } else {
        $('#collectionsContent').removeClass('grid').addClass('list');
      }

      setTimeout( function() {
        $('#collectionsContent .result-loading').removeClass('active');
        initStickySidebar();
      }, 250);
    });
  },

  initInfinitScroll() {
    const _this = this;
    if ( _this.$load_more_point ) {
      _this.waypoint = new Waypoint({
        element: _this.$load_more_point,
        offset: '85%',
        handler: function(direction) {
          let $targetElement = $(this.element);
          const targetUrl = $targetElement.data('target');
          if ( !targetUrl || $targetElement.hasClass('disabled') ) { return; }
          _this.replaceContent(targetUrl, 'append');
        }
      });
    }

    if ( vndTheme.stt.eb_ajx_flt ) {
      const paginates = _this.$container.querySelectorAll('.paginate-item a');
      for ( let i = 0; i < paginates.length; i++ ) {
        const pagenator = paginates[i];
        pagenator.onclick = function( e ) {
          e.preventDefault();
          let url = e.currentTarget.href;
          if (url.indexOf('view=ajax') < 0) {
            url += '&view=ajax';
          }
          _this.replaceContent(url);
        }
      }
    }

    if ( _this.$load_more_btn ) {
      $(_this.$load_more_btn).on('click', function(e) {
        e.preventDefault();
        var $targetElement = $(this);
        var targetUrl = $targetElement.data('target');
        if ( !targetUrl ) {
          return;
        }

        _this.replaceContent(targetUrl, 'append');
      });
    };
  }
}

var listCollectionsPage = {
  init() {
    collectionPage.initSidebarMenu();
  }
}

var searchPage = {
  init() {
    vndHlp.getTagsFromUrl();
    if ( Shopify.queryParams.constraint ) {
      let hidden_items = 0;
      const tag = ',' + Shopify.queryParams.constraint + ',',
            total = parseInt($('.page-title span').text());

      $('.template-search .collection-card__wrapper').each(function() {
        const tags = this.dataset.tags;

        if ( !tags || tags.indexOf(tag) < 0 ) {
          this.style.display = 'none';
          hidden_items++;
        }
      });

      $('.page-title span').text(total - hidden_items);
    }

    collectionPage.initSidebarMenu();
  },

  initPriceRange(newCurrency) {
    const _this = this;
    let $this = $('.price-range');
    if ( $this.length < 1 ) {
      return false;
    }

    let width = $this.parent().width() - 18,
        price_max = vndHlp.parseMoney($this.attr('data-max'), 'init') || 100,
        price_min = vndHlp.parseMoney($this.attr('data-min'), 'init') || 1,
        m_f = vndCurrency.moneyFormats[vndTheme.s_c]["money_format"].replace(/\{\{(.*?)\}\}/g, '%s');

    if ( newCurrency ) {
      price_max = Currency.convert(price_max, vndTheme.s_c, newCurrency);
      price_min = Currency.convert(price_min, vndTheme.s_c, newCurrency);
      m_f = vndCurrency.moneyFormats[newCurrency]["money_format"].replace(/\{\{(.*?)\}\}/g, '%s');
      $('.price-range-container').remove();
      $this.parent().append($this.clone());
      $this.remove();
      $this = $('.price-range');
    }

    price_max = Math.ceil(price_max);
    price_min = Math.floor(price_min);

    if ( price_min == price_max ) {
      price_min--;
    }

    const range_str = price_min.toString() + ',' + price_max.toString();

    $this.jRange({
      from: price_min,
      to: price_max,
      step: 1,
      format: m_f,
      showScale: false,
      isRange: true,
      width: width,
      ondragend: function(range) {_this.initPriceElement(range)},
      onbarclicked: function(range) {_this.initPriceElement(range)}
    }).jRange('setValue', range_str);
  },

  initPriceElement(range) {
    var r = range.split(',');
    var price_min = parseFloat(r[0]);
    var price_max = parseFloat(r[1]);
    $('.product-price .current-price').each(function(index, item) {
      var current_price = parseFloat(vndHlp.parseMoney(item.innerHTML, 'change'));
      if ( current_price < price_min || current_price > price_max ) {
        $(item).closest('.collection-card__wrapper').hide();
      } else {
        $(item).closest('.collection-card__wrapper').show();
      }
    });
    setTimeout(() => {
      collectionPage.scrollToMain(360);
    }, 350);
  }
}

var cartPage = {
  initAjaxAddCart() {
    $(document).on('click', 'form .btn-add-cart', function(e) {
      const $addCartBtn = $(e.currentTarget);
      if ( vndTpl == 'cart' || $addCartBtn.hasClass('disabled') ) return;
      e.preventDefault();
      const $cartForm = $(this).closest('form'),
            $option = $cartForm.children('#product-actual-select')[0],
            actual_count = parseInt($cartForm.find('.quantity').val());
      let max = 0,
          policy = 'deny',
          inv_mngmt = '';

      if ( $option ) {
        max = parseInt($option.selectedOptions[0].dataset.quantity)
        policy = $option.selectedOptions[0].dataset.policy;
        inv_mngmt = $option.selectedOptions[0].dataset.inventoryManagement;

        if (inv_mngmt != '' && policy != 'continue' && actual_count > max) {
          $cartForm.find('.quantity').val(max);
        }
      }

      $.ajax({
        url: '/cart/add.js',
        dataType: 'json',
        cache: false,
        type: 'post',
        data: $cartForm.serialize(),
        beforeSend: function() {
          $addCartBtn.addClass('disabled vnd-btn-busy');
        },
        success: function(itemData) {
          window.setTimeout(function(){
            $addCartBtn.removeClass('disabled vnd-btn-busy');
          }, 1000);

          $.ajax({
            url: '/cart.js',
            dataType: "json",
            cache: false,
            success: function(cart) {
              vndHlp.refreshCart(cart);
              if (inv_mngmt != '' && policy != 'continue' && actual_count > max) {
                const desc = vndTheme.lang.cart.set_max_available_html.replace(/<span class=\'max-count\'><\/span>/g, "<span class='max-count'>" + max +" </span>");
                const request = {
                  responseJSON: {
                    message: vndTheme.lang.cart.title,
                    description: desc
                  }
                }
                vndTheme.UserNotice(request, 'info');
              }
            }
          });
        },
        error: function(request) {
          $addCartBtn.removeClass('disabled vnd-btn-busy');
          vndTheme.UserNotice(request, 'error');
        }
      });

      return false;
    });
  },

  initCartPp() {
    $('.cart-dropdown .increase').on('click', function(e) {
      const $data = this.previousElementSibling,
            id = $data.id.replace('cd_ud_', ''),
            qty = parseInt($data.dataset.currentValue) + 1;
      cartPage.changeItQty(id, qty);
    });

    $('.cart-dropdown .reduce').on('click', function(e) {
      const $data = this.nextElementSibling,
            id = $data.id.replace('cd_ud_', ''),
            qty = parseInt($data.dataset.currentValue) - 1;
      cartPage.changeItQty(id, qty);
    });

    const $close = document.querySelector('.cart-dropdown .side-cart__close');
    if ( $close ) {
      $close.addEventListener('click', function(e) {
        e.preventDefault();
        document.dispatchEvent(
          new CustomEvent('vnd_ajx:crt:close', {
            bubbles: true,
            cancelable: true
          })
        );
      });
    }

    const $ts = document.querySelector('.cart-tac .tick-rectangle');
    if ( $ts ) {
      $ts.onclick = function(e) {
        if (this.firstElementChild.classList.contains('active')) {
          vndTheme.ctc_agreed = false;
          this.firstElementChild.classList.remove('active');
        } else {
          vndTheme.ctc_agreed = true;
          this.firstElementChild.classList.add('active');
        }
      }
    }

    if (vndTheme.enable_ctc) {
      $(document).on('click', '[name="checkout"], [name="goto_pp"], [name="goto_gc"], .btn-checkout', function(e) {
        if (vndTheme.ctc_agreed) {
          return;
        }

        e.preventDefault();
        const res = {
          responseJSON: {
            message: '',
            description: vndTheme.lang.cart.terms_warn
          }
        }
        vndTheme.UserNotice(res, 'warn');
        if (vndTpl == 'cart') {
          $('html, body').animate({
            scrollTop: $('.cart-tac').offset().top - 120
          }, 450);
        }

        if (this.classList.contains('shopify-payment-button__button')) {
          document.dispatchEvent(
            new CustomEvent('vnd_ajx:crt:success', {
              bubbles: true,
              cancelable: true
            })
          );
        }

        return false;
      });
    }
  },

  initAjaxRemove() {
    $(document).on("click", ".btn-remove-cart", function(e) {
      e.preventDefault();
      var id = this.dataset.id;
      var $targetItem = $('.btn-remove-cart[data-id="'+ id + '"]').closest('.cart-item');

      $.ajax({
        type: 'POST',
        url: '/cart/change.js',
        data: 'quantity=0&id='+id,
        dataType: 'json',
        beforeSend: function() {
          vndHlp.showLoading();
        },
        success: function(t) {
          vndHlp.hideLoading();
          $targetItem.slideUp(350);
          if ( vndTpl == 'cart' && t.item_count == 0 ) {
            location.reload();
          }

          $.ajax({
            url: '/cart.js',
            dataType: "json",
            cache: false,
            success: function(cart) {
              vndHlp.refreshCart(cart);
            }
          });
        },
        error: function(request, textStatus ) {
          vndHlp.hideLoading();
          vndTheme.UserNotice(request, 'error');
        }
      });
    });
  },

  changeItQty(id, qty) {
    $.ajax({
      type: 'POST',
      url: '/cart/change.js',
      data: 'quantity=' + qty + '&id='+id,
      dataType: 'json',
      beforeSend: function() {
        vndHlp.showLoading();
      },
      success: function(t) {
        vndHlp.hideLoading();

        $.ajax({
          url: '/cart.js',
          dataType: "json",
          cache: false,
          success: function(cart) {
            vndHlp.refreshCart(cart);
          }
        });
      },
      error: function(request, textStatus ) {
        vndHlp.hideLoading();
        vndTheme.UserNotice(request, 'error');
      }
    });
  }
}

var blogPage = {
  init() {
    collectionPage.initSidebarMenu();
    document.querySelectorAll('.blog-section .items-carousel').forEach(function(carousel) {
      initSlider(carousel);
    })
  }
}

var customersPage = {
  customerAddressForm() {
    // Initialize observers on address selectors, defined in shopify_common.js
    if ( Shopify ) {
      new Shopify.CountryProvinceSelector(
        'AddressCountryNew',
        'AddressProvinceNew',
        {
          hideElement: 'AddressProvinceContainerNew'
        }
      );
    }

    // Initialize each edit form's country/province selector
    $('.address-country-option').each(function() {
      var formId = $(this).data('form-id');
      var countrySelector = 'AddressCountry_' + formId;
      var provinceSelector = 'AddressProvince_' + formId;
      var containerSelector = 'AddressProvinceContainer_' + formId;

      new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
        hideElement: containerSelector
      });
    });

    $('.address-edit-toggle').on('click', function() {
      var formId = $(this).data('form-id');
      var $editButton = $('#EditFormButton_' + formId);
      var $editAddress = $('#EditAddress_' + formId);
      var isExpanded = $editButton.attr('aria-expanded') === 'true';

      $editAddress.toggleClass('ds-none');
      $editButton.attr('aria-expanded', !isExpanded).focus();
    });

    $('.address-delete').on('click', function() {
      var $el = $(this);
      var target = $el.data('target');
      var confirmMessage = $el.data('confirm-message');

      if ( confirm(confirmMessage || 'Are you sure you wish to delete this address?') ) {
        Shopify.postLink(target, {
          parameters: { _method: 'delete' }
        });
      }
    });
  }
}

var PageRender = {
  init() {
    initMobileMenu();
    initMobileSidebarMenu();
    initSwatch(document.body);
    quickViewInit();
    rszRender();
    vndHlp.ctrVideo();

    if ( vndHlp.isTchDvc() ) {
      $('body').addClass('vnd-device-touch');
    }

    // Save current url for customers to be redirected after login
    var url = window.top.location.href;
    $("#login_redirect").val(url);

    if ( vndTpl ) {
      if ( vndTpl == 'index' ) {
        initNewsletter();
      }

      if ( vndTpl.indexOf('product') > -1 ) {
        vndPageProduct.init();
      }

      if ( vndTpl == 'collection' ) {
        collectionPage.init();
      }

      if ( vndTpl == 'list-collections' || vndTpl == 'collection.nested-collection' ) {
        listCollectionsPage.init();
      }

      if ( vndTpl == 'search' ) {
        searchPage.init();
      }

      if ( vndTpl == 'customers/addresses' ) {
        customersPage.customerAddressForm();
      }

      if ( vndTpl == 'article' || vndTpl == 'blog' ) {
        blogPage.init();
      }
    }

    if ( vndTheme.stt.eb_ajx_crt ) {
      cartPage.initAjaxAddCart();
      cartPage.initCartPp();
      cartPage.initAjaxRemove();
    }

    if ( vndTheme.stt.eb_scrt ) {
      initScrollTop();
    }

    vndHlp.formatCurrency();
    vndHlp.initCookieNotify();

    // Enable wishlist
    vndHlp.wslst();

    // Enable compare list
    vndHlp.cplst();
  }
}

// Register theme events
vndTheme.vndRgtEvts = function vndRgtEvts() {
  // Ajax Add Cart Success
  document.addEventListener('vnd_ajx:crt:success', this.onAjxCrtScs);
  document.addEventListener('vnd_ajx:crt:close', this.onSdCrtClose);

  // Close popups
  document.addEventListener('vnd_popup:close', this.onPopupClose);

  // Close popups when back button is clicked
  window.addEventListener('popstate', (event) => {
    var mpInstance = $.magnificPopup.instance;
    if ( mpInstance.isOpen ) {
      mpInstance.close();
    }
  });
}

vndTheme.vndRgtEvts.prototype = {
  onAjxCrtScs: function() {
    if ( vndTpl != 'cart' ) {
      if (vndTheme.stt.ajx_crt_eft == 'sidebar') {
        const scroll_width = vndTheme.scroll_width + 'px';
        $('html').addClass('side-cart-open');
        $('body').css('padding-right', scroll_width);
        $('.sticky-active').css('padding-right', scroll_width + '!important');
      } else {
        if ( $('.header.sticky-active').length ) {
          $('.header.sticky-active .cart-dropdown').addClass('active');
        } else {
          $('.cart-dropdown').addClass('active');
        }

        setTimeout(function() {
          $('.cart-dropdown').removeClass('active');
        }, 2500);
      }
    }
  },

  onSdCrtClose() {
    document.documentElement.classList.remove('side-cart-open');
    document.body.style.paddingRight = 0;
  },

  onPopupClose() {
    document.body.style.paddingRight = 0;
    document.documentElement.classList.remove('vnd-popup-opened');
  }
}

$(document).ready(() => {
  let vndEvts = new vndTheme.vndRgtEvts();
  vndTheme.scroll_width = window.innerWidth - document.body.clientWidth;

  vndHlp.initSct(null, '#shopify-section-top-bar', vndTopbar.onLoad);
  vndHlp.initSct(null, '#shopify-section-header', vndHeader.onLoad);
  vndHlp.initSct(null, '#shopify-section-header-mobile', vndMbHd.onLoad);
  vndHlp.initSct(null, 'section.vs-homepage-slideshow', slideShow.onLoad);
  vndHlp.initSct(null, 'section.vs-parallax-lookbook', parallaxLookbook.onLoad);
  vndHlp.initSct(null, 'section.vs-product-showcase', productShowCase.onLoad);
  vndHlp.initSct(null, 'section.vs-group-content', groupContent.onLoad);
  vndHlp.initSct(null, 'section.vs-initialize-slider', vndSectionSlider.onLoad);
  vndHlp.initSct(null, '.vs-instagram', vndInstaSt.onLoad);
  vndHlp.initSct(null, 'section.vs-collections-tab', vndIstSection.onLoad);
  vndHlp.initSct(null, 'section.vs-lookbook', lookbookSection.onLoad);
  vndHlp.initSct(null, 'section.vs-lookbook-2', lookbookSection2.onLoad);
  vndHlp.initSct(null, 'section.vs-packery', vndPkrSt.onLoad);
  vndHlp.initSct(null, 'section.vs-product-recommendations', vndPrdRecmd.onLoad);
  vndHlp.initSct(null, 'section.vs-product-recent', vndPrdRcnt.onLoad);
  vndHlp.initSct(null, 'section.vs-masonry-grid', vndMsrGrd.onLoad);
  vndHlp.initSct(null, 'section.vs-products-masonry', productsMasonry.onLoad);
  vndHlp.initSct(null, 'section.vs-page-tabs', vndPageTabs.onLoad);

  PageRender.init();
});
