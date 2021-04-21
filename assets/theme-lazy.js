// Venedor Sections
vndTheme.vndSts = function vndSts() {
  this.constructors = {};
  this.instances = [];

  if (window.Shopify.designMode) {
    document.addEventListener(
      'shopify:section:load',
      this.onLoad.bind(this)
    );

    document.addEventListener(
      'shopify:section:unload',
      this.onUnload.bind(this)
    );

    document.addEventListener(
      'shopify:section:select',
      this.onSelect.bind(this)
    );

    document.addEventListener(
      'shopify:section:deselect',
      this.onDeselect.bind(this)
    );

    document.addEventListener(
      'shopify:block:select',
      this.onBlkSelect.bind(this)
    );

    document.addEventListener(
      'shopify:block:deselect',
      this.onBlkDeselect.bind(this)
    );
  }
}

vndTheme.vndSts.prototype = Object.assign({}, vndTheme.vndSts.prototype, {
  _createInstance: function (container, constructor) {
    let id = container.id;
    id = id.replace('shopify-section-', '');

    constructor = constructor || this.constructors[id];

    if (typeof constructor === 'undefined') {
      return;
    }

    const instance = Object.assign(new constructor(container), {
      id: id,
      container: container
    });

    this.instances.push(instance);
  },

  onLoad(evt) {
    const ts = evt.target; // Target Section

    // Header
    if ( ts.id == 'shopify-section-top-bar' ) {
      vndHlp.initSct(ts.id, null, vndTopbar.onLoad);
    }

    if ( ts.id == 'shopify-section-header' ) {
      vndHlp.initSct(ts.id, null, vndHeader.onLoad);
    }

    // Slideshow
    if ( ts.classList.contains('vs-homepage-slideshow') ) {
      vndHlp.initSct(ts.id, null, slideShow.onLoad);
    }

    // Parallax lookbook
    if ( ts.classList.contains('vs-parallax-lookbook') ) {
      vndHlp.initSct(ts.id, null, parallaxLookbook.onLoad);
    }

    // Lookbook spots
    if ( ts.classList.contains('vs-lookbook') ) {
      vndHlp.initSct(ts.id, null, lookbookSection.onLoad);
    }

    // Lookbook switcher
    if ( ts.classList.contains('vs-lookbook-2') ) {
      vndHlp.initSct(ts.id, null, lookbookSection2.onLoad);
    }

    // Product showcase
    if ( ts.classList.contains('vs-product-showcase') ) {
      vndHlp.initSct(ts.id, null, productShowCase.onLoad);
    }

    // Sections with sidebar
    if ( ts.classList.contains('vs-group-content') ) {
      vndHlp.initSct(ts.id, null, groupContent.onLoad);
    }

    //Items carousel section
    if ( ts.classList.contains('vs-initialize-slider') ) {
      vndHlp.initSct(ts.id, null, vndSectionSlider.onLoad);
    }

    // Collections tab section
    if ( ts.classList.contains('vs-collections-tab') ) {
      vndHlp.initSct(ts.id, null, vndIstSection.onLoad);
    }

    // Instagram section
    if ( ts.classList.contains('vs-instagram') ) {
      vndHlp.initSct(ts.id, null, vndInstaSt.onLoad);
    }

    // Map section
    if ( ts.classList.contains('vs-google-map') ) {
      vndHlp.initSct(ts.id, null, mapSection.onLoad);
    }

    // Products Masonry
    if ( ts.classList.contains('vs-products-masonry') ) {
      vndHlp.initSct(ts.id, null, productsMasonry.onLoad);
    }

    // Text with media packery
    if ( ts.classList.contains('vs-packery') ) {
      vndHlp.initSct(ts.id, null, vndPkrSt.onLoad);
    }

    // Masonry Grid Images
    if ( ts.classList.contains('vs-masonry-grid') ) {
      vndHlp.initSct(ts.id, null, vndMsrGrd.onLoad);
    }

    // Recently viewed products section
    if ( ts.classList.contains('vs-product-recent') ) {
      vndHlp.initSct(ts.id, null, vndPrdRcnt.onLoad);
    }

    // Product Page: template-product-layout section
    if ( ts.classList.contains('products-template') ) {
      vndHlp.initSct(ts.id, null, vndPrdTplSt.onLoad);
    }

    // Product Page: template-product-details-tabs section
    if ( ts.classList.contains('product-details-tabs') ) {
      vndHlp.initSct(ts.id, null, vndPrdDtTabsSt.onLoad);
    }

    // Product Page: data-driven products recommendation section
    if ( ts.classList.contains('vs-product-recommendations') ) {
      vndHlp.initSct(ts.id, null, vndPrdRecmd.onLoad);
    }

    // Collection Page
    if ( ts.classList.contains('collection-layout') ) {
      collectionPage.init();
    }

    // List collections Page
    if ( ts.classList.contains('list-collections') || ts.classList.contains('.sub-collection') ) {
      listCollectionsPage.init();
    }

    // Blog/Article Pages
    if ( ts.classList.contains('blog-section') ) {
      collectionPage.initSidebarMenu();
      vndHlp.initSct(ts.id, null, initSlider);
    }

    // Wishlist Page
    if ( ts.id == 'shopify-section-template-wishlist' ) {
      vndHlp.wslst();
    }

    // Compare Page
    if ( ts.id == 'shopify-section-template-compare' ) {
      vndHlp.cplst();
    }

    // Text with image layout 2
    if (  ts.classList.contains('vs-image-2') ||
          ts.classList.contains('vs-products-masonry-carousel') ||
          ts.classList.contains('vs-service-promotion' )) {
      this._createInstance(ts);
    }

    if ( typeof lazySizes !== 'undefined' ) {
      lazySizes.loader.checkElems();
    } else {
      imageLoad();
    }
  },

  onUnload(evt) {
    const ts = evt.target;
    if ( evt.detail.sectionId == 'header' ) {
      vndHeader.onUnload(evt);
    }

    if ( ts.classList.contains('vs-homepage-slideshow') ) {
      vndHlp.initSct(null, null, slideShow.onUnload);
    }

    this.instances = this.instances.filter(function(instance) {
      const isEventInstance = instance.id === evt.detail.sectionId;
      if (isEventInstance) {
        if (typeof instance.onUnload === 'function') {
          instance.onUnload(evt);
        }
      }

      return !isEventInstance;
    });

  },

  onSelect(evt) {
    const ts = evt.target;

    if ( ts.id == 'shopify-section-top-bar' ) {
      vndTopbar.onSelect(evt);
    }

    if ( ts.id == 'shopify-section-header' ) {
      vndHeader.onSelect(evt);
    }

    if ( ts.classList.contains('vs-group-content') ) {
      vndHlp.initSct(ts.id, null, groupContent.onLoad);
    }

    //Items carousel section
    if ( ts.classList.contains('vs-initialize-slider') ) {
      vndHlp.initSct(ts.id, null, vndSectionSlider.onLoad);
    }

    // Collection Page
    if ( ts.classList.contains('collection-layout') ) {
      collectionPage.init();
    }

    const instance = this.instances.find(function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if ( typeof instance !== 'undefined' && typeof instance.onSelect === 'function') {
      instance.onSelect(evt);
    }
  },

  onDeselect(evt) {
    const instance = this.instances.find(function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if ( typeof instance !== 'undefined' && typeof instance.onDeselect === 'function') {
      instance.onDeselect(evt);
    }
  },

  onBlkSelect(evt) {
    const $tb = document.getElementById('shopify-section-' + evt.detail.sectionId); // Target Block

    if (evt.detail.sectionId == 'header') {
      vndHeader.onBlkSelect(evt);
    }

    if ( $tb.classList.contains('vs-homepage-slideshow') ) {
      slideShow.onBlkSelect(evt);
    }

    if ( $tb.classList.contains('vs-packery') ) {
      vndPkrSt.onBlkSelect(evt);
    }

    //Items carousel section
    if ( $tb.classList.contains('vs-initialize-slider') ) {
      vndSectionSlider.onBlkSelect(evt);
    }

    const instance = this.instances.find(function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if ( typeof instance !== 'undefined' && typeof instance.onBlkSelect === 'function') {
      instance.onBlkSelect(evt);
    }
  },

  onBlkDeselect(evt) {
    if (evt.detail.sectionId == 'header') {
      vndHeader.onBlkDeselect(evt);
    }

    const $tb = document.getElementById('shopify-section-' + evt.detail.sectionId); // Target Block

    if ( $tb.classList.contains('vs-homepage-slideshow') ) {
      slideShow.onBlkDeselect(evt);
    }

    //Items carousel section
    if ( $tb.classList.contains('vs-initialize-slider') ) {
      vndSectionSlider.onBlkDeselect(evt);
    }

    const instance = this.instances.find(function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if ( typeof instance !== 'undefined' && typeof instance.onBlkDeselect === 'function') {
      instance.onBlkDeselect(evt);
    }
  },

  register: function( id, query, constructor ) {
    if ( id ) {
      const trim_id = id.replace('shopify-section-', '');
      this.constructors[trim_id] = constructor;
      const container = document.getElementById(id);
      container.childElementCount > 0 && this._createInstance(container, constructor);
    } else {
      const _this = this;
      document.querySelectorAll(query).forEach( function(container) {
        const trim_id = container.id.replace('shopify-section-', '');
        _this.constructors[trim_id] = constructor;
        container.childElementCount > 0 && _this._createInstance(container, constructor);
      });
    }
  }
});

// Map section
var mapSection = {
  onLoad(container) {
    if ( !container || container.classList.contains('map-loaded') ) return;
    const waypoint = new Waypoint({
      element: container,
      offset: '120%',
      handler: function(direction) {
        container.classList.add('map-loaded');
        const s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "https://maps.googleapis.com/maps/api/js?key=" + vndTheme.gg_api_k +"&callback=gmap_draw";
        s.setAttribute('async', '');
        s.setAttribute('defer', '');
        window.gmap_draw = function() {
          vndHlp.initMap('storeLocation');
        }
        $("head").append(s);
        waypoint.destroy();
      }
    });
  }
}

// Venedor helper
vndHlp.initMap = function (id) {
  // Basic options for a simple Google Map
  // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
  let custom_styles = [{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#7f2200"},{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#87ae79"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#495421"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"},{"visibility":"on"},{"weight":4.1}]},{"featureType":"administrative.country","elementType":"all","stylers":[{"saturation":"30"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"color":"#4e4e4e"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"on"},{"saturation":"30"},{"color":"#4e4e4e"},{"weight":"1.50"}]},{"featureType":"administrative.province","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#2b2b2b"}]},{"featureType":"administrative.locality","elementType":"labels.text.stroke","stylers":[{"weight":"2.50"},{"visibility":"on"},{"color":"#ffffff"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#a4cd89"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#769E72"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#7B8758"},{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"color":"#EBF4A4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"visibility":"off"},{"color":"#8dab68"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#5B5B3F"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ABCE83"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#EBF4A4"},{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#9BBF72"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#A4C67D"},{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c5eaff"},{"visibility":"on"},{"weight":"1.00"}]},{"featureType":"water","elementType":"geometry.stroke","stylers":[{"visibility":"off"},{"color":"#ff0000"}]}];
  if ( vndTheme.map_style == '2' ) {
    custom_styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#212121"},{"saturation":"0"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#ffffff"},{"saturation":"0"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"},{"lightness":"0"},{"gamma":"1"},{"weight":"0.80"},{"visibility":"simplified"},{"color":"#f1f1f1"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"lightness":"0"},{"visibility":"simplified"},{"color":"#3bb760"},{"gamma":"1"},{"weight":"1.90"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"lightness":"0"},{"saturation":"13"},{"visibility":"off"},{"hue":"#aaff00"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"0"},{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"},{"lightness":"-49"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"simplified"},{"lightness":"100"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"},{"saturation":"-24"},{"lightness":"-77"},{"weight":"2"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#f1f1f1"},{"visibility":"on"},{"lightness":"0"},{"gamma":"1"},{"weight":"1"}]}]
  } else if ( vndTheme.map_style == '3' ) {
    custom_styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#212121"},{"saturation":"0"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#ffffff"},{"saturation":"0"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"},{"lightness":"0"},{"gamma":"1"},{"weight":"0.80"},{"visibility":"simplified"},{"color":"#f1f1f1"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"lightness":"0"},{"visibility":"simplified"},{"color":"#f9ff50"},{"gamma":"1"},{"weight":"1.90"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"lightness":"0"},{"saturation":"13"},{"visibility":"off"},{"hue":"#aaff00"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"0"},{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"},{"lightness":"-49"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"simplified"},{"lightness":"100"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"},{"saturation":"-24"},{"lightness":"-77"},{"weight":"2"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#f1f1f1"},{"visibility":"on"},{"lightness":"0"},{"gamma":"1"},{"weight":"1"}]}]
  }

  const mapOptions = {
      // How zoomed in you want the map to start at (always required)
      zoom: 11,

      // The latitude and longitude to center the map (always required)
      // center: new google.maps.LatLng(40.6700, -73.9400), // New York
      center: new google.maps.LatLng(parseFloat(vndTheme.s_loc.lat), parseFloat(vndTheme.s_loc.lng)),

      // How you would like to style the map.
      // This is where you would paste any style found on Snazzy Maps.
      styles: custom_styles
  }

  // Get the HTML DOM element that will contain your map
  // We are using a div with id="map" seen below in the <body>
  const mapElement = document.getElementById(id);

  // Create the Google Map using our element and options defined above
  const map = new google.maps.Map(mapElement, mapOptions);

  let $form = $(`#${id}`).parent().find('.contact-on__map'),
      os_x;
  if ( $form.length > 0 ) {
    if ( $form.hasClass('form-center') ) {
      os_x = ($(`#${id}`).width() + $($form).find('.col-padding').width()) / 4;
    } else {
      os_x = ($(`#${id}`).width() * 0.1693 + $($form).find('.col-padding').width()) / 2;
    }

    map.panBy(os_x, 0);
  }

  // Let's also add a marker while we're at it
  const marker = new google.maps.Marker({
      position: new google.maps.LatLng(parseFloat(vndTheme.s_loc.lat), parseFloat(vndTheme.s_loc.lng)),
      map: map,
      title: 'Snazzy!'
  });
}

// Venedor Theme search functions
var vndSch = (function() {
  let search_tag = '';

  function init() {
    initCategories();
    initPartialSearch();
    if ( vndTheme.sch_pdtv ) {
      initPredictive();
    }

    $(window).on('click touchstart', function(e) {
      if ( $('.search-form.js-hover').length
      && !($(e.target).hasClass('search-form') && $(e.target).hasClass('js-hover'))
      && !$(e.target).parents('.search-form.js-hover').length ) {
        $('.search-form.js-hover').removeClass('js-hover');
      }
    });
  }

  function initCategories(container) {
    const $ctn = container ? container : document.body;
    const ct_a = $ctn.getElementsByClassName('search-by-cat');

    for (let i = 0; i < ct_a.length; i++) {
      const cat = ct_a[i];
      cat.onclick = function(e) {
        e.preventDefault();
        const atv = this.parentElement.previousElementSibling;
        atv.firstChild.innerText = this.innerText;

        if (this.dataset.category) {
          atv.dataset.cat = this.dataset.category;
          search_tag = this.dataset.category;
          search_type = atv.dataset.catType;
        } else {
          atv.dataset.cat = "";
          search_tag = "";
          search_type = "";
        }

        document.dispatchEvent(
          new CustomEvent('vnd_dd:close', {
            bubbles: true,
            cancelable: true
          })
        );
      }
    }
  }

  function initPartialSearch() {
    const $forms = document.getElementsByClassName('search-form');
    for (let i = 0; i < $forms.length; i++) {
      const $form = $forms[i];
      $form.addEventListener('submit', runSearch);
    }
  }

  function initPredictive() {
    const $inputs = document.querySelectorAll('.search-input-container input');

    for (let i = 0; i < $inputs.length; i++) {
      const $input = $inputs[i],
            $parent = $input.closest('.search-form'),
            $rs = $parent.querySelector('.result-container');

      if ( $rs ) {
        $input.addEventListener('input', function(e) {
          e.preventDefault();
          $parent.classList.add('js-hover');
          let term = this.value;
          if (search_tag) {
            term += '*+' + search_type + ':' + search_tag;
          }

          setSearchResult(term, $rs);
        });
      }

      $input.onblur = function(e) {
        $parent.classList.remove('js-hover');
      };

      $input.onfocus = function(e) {
        $parent.classList.add('js-hover');
      };
    }
  }

  function normalizeQuery(query) {
    if ( typeof query !== "string" ) {
      return null;
    }

    return query
      .trim()
      .replace(" ", "-")
      .toLowerCase();
  }

  function setRequestParams(query) {
    return {
      "q": query,
      "resources": {
        "type": vndTheme.pdtv_fd || "product",
        "limit": vndTheme.sch_lmt || 5,
        "options": {
          "unavailable_products": "last"
        }
      }
    }
  }

  function setSearchResult(query, $rs) {
    if ( query == '' ) {
      $('.result-container').empty();
      return;
    }

    query = normalizeQuery(query);
    if ( query ) {
      if (search_tag) {
        query = "/search?q=" + query + "&view=json";

        $.ajax({
          url: query,
          dataType: "html",
          type: "GET",
          success: function(html) {
            $rs.innerHTML = html;
          }
        });
      } else {
        const params = setRequestParams(query);
        jQuery.getJSON("/search/suggest.json", params)
          .done(function(response) {
            let products = response.resources.results.products,
                articles = response.resources.results.articles,
                pages = response.resources.results.pages,
                collections = response.resources.results.collections,
                $resultContainer = '',
                searchItem = '';

            if ( products.length > 0 ) {
              if ( vndTheme.pdtv_fd == 'product,page,article,collection' ) {
                $resultContainer += '<h2 class="search-category">' + vndTheme.lang.search.products + '</h2>';
              }

              $.each(products, function(index, product) {
                let productImg = '',
                    productPrice = '';
                if ( product.image ) {
                  productImg = '<img class="lazyload" src="' + product.image + '" alt="'+ product.title +'"/>'
                }
                const productTitle = '<div class="product-info"><h3 class="product-name">' + product.title + '</h3>';
                if ( product.compare_at_price_max > 0 ) {
                  productPrice = '<span class="old-price money">' + vndCurrency.formatMoney(product.compare_at_price_max, vndTheme.m_f) + '</span><span class="sale-price current-price money">' + vndCurrency.formatMoney(product.price, vndTheme.m_f) + '</span></div>';
                } else {
                  productPrice = '<span class="sale-price current-price money">' + vndCurrency.formatMoney(product.price, vndTheme.m_f) + '</span></div>';
                }

                searchItem = '<a class="result-item ds-flex" href="' + product.url + '">' + productImg + productTitle + productPrice + '</a>';
                $resultContainer += searchItem;
              });
            }

            if ( vndTheme.pdtv_fd == 'product,page,article,collection' ) {
              if ( articles.length > 0 ) {
                $resultContainer += '<h2 class="search-category">' + vndTheme.lang.search.articles + '</h2>';

                $.each(articles, function(index, article) {
                  let articleImg = '';
                  if ( article.image ) {
                    articleImg = '<img class="lazyload" src="' + article.image + '" alt="'+ article.title +'"/>'
                  }
                  const articleTitle = '<h3 class="product-name">' + article.title + '</h3>';
                  searchItem = '<a class="result-item ds-flex" href="' + article.url + '">' + articleImg + articleTitle + '</a>';
                  $resultContainer += searchItem;
                });
              }

              if ( collections.length > 0 ) {
                $resultContainer += '<h2 class="search-category">' + vndTheme.lang.search.collections + '</h2>';
                $.each(collections, function(index, collection) {
                  searchItem = '<a class="result-item ds-flex product-name" href="' + collection.url + '">' + collection.title + '</a>';
                  $resultContainer += searchItem;
                });
              }

              if ( pages.length > 0 ) {
                $resultContainer += '<h2 class="search-category">' + vndTheme.lang.search.pages + '</h2>';
                $.each(pages, function(index, page) {
                  searchItem = '<a class="result-item ds-flex product-name" href="' + page.url + '">' + page.title + '</a>';
                  $resultContainer += searchItem;
                });
              }
            }

            $rs.innerHTML = $resultContainer;
          })
      }
    }
  }

  function runSearch(e) {
    let term = encodeURI(e.target.querySelector('.search-input-container input').value),
    searchPath = '/search',
    type = vndTheme.pdtv_fd || "product",
    constraint = '?';

    if (term.length == 0) {
      e.target.removeEventListener('submit', runSearch);
      return true;
    } else {
      e.preventDefault();
      term += '*';
      const cat = e.currentTarget.querySelector('.search-category-name');

      if ( cat && cat.dataset.cat ) {
        if (cat.dataset.catType) {
          term += '+' + cat.dataset.catType + ':' + cat.dataset.cat;
        } else {
          constraint = '?constraint=' + cat.dataset.cat + '&';
        }
      }

      searchPath += constraint;
      searchPath += type == 'product' ? 'type=product&' : '';
      searchPath += 'q=' + term;
      e.target.removeEventListener('submit', runSearch);
      location = location.origin + searchPath;
    }
  }

  return init;
})();

$(document).ready(() => {
  vndSch();

  var vndSts = new vndTheme.vndSts();
  vndSts.register(null, 'section.vs-image-2', vndTheme.SectionImage2);
  vndSts.register(null, 'section.vs-products-masonry-carousel', vndTheme.SectionMasonryCarousel);
  vndSts.register(null, 'section.vs-service-promotion', vndTheme.ServicePromotion);

  vndHlp.initSct(null, 'section.vs-google-map', mapSection.onLoad);
});