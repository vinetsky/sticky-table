(function (scrollLayer, mapLayer) {
  setScrollSize = function () {
    let documentHeight = document.documentElement.clientHeight;
    let documentWidth = document.documentElement.clientWidth;

    let mapHeight = mapLayer.getBoundingClientRect().height;
    let mapTop = mapLayer.getBoundingClientRect().top;

    let scrollTop = scrollLayer.getBoundingClientRect().top;
    scrollLayer.style.height =
      documentWidth < 1200
        ? documentHeight - scrollTop - 20 + 'px'
        : mapHeight + mapTop - scrollTop - 36 + 'px';
  };

  handleResize = function () {
    let resizeTimeout;
    return function () {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
          resizeTimeout = null;
          setScrollSize();
        }, 100);
      }
    };
  };

  window.onload = function () {
    setScrollSize();
    window.addEventListener('resize', handleResize());
  };
})(
  document.querySelector('.order-scroll'),
  document.querySelector('.map-embed')
);
