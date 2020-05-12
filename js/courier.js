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

function firstFunc(arr) {
  let buf, buf2;
  let res = 'new Value: ';
  for (i = 0; i < arr.length; i++) {
    buf = arr[i].slice(0, 1);
    buf2 = buf.toUpperCase();
    res += buf2 + arr[i].substr(1, arr[i].length);
    //console.log(i, res);
  }
  return res;
}

function handler1(el) {}

console.log(firstFunc(['my', 'name', 'is', 'Trinity']));

function handler2(el) {}

//console.log(firstFunc([10, 20, 30], handler2));

function handler3(el) {}

/*console.log(
  firstFunc(
    [
      { age: 45, name: 'Jhon' },
      { age: 20, name: 'Aaron' },
    ],
    handler3
  )
);*/

function handler4(el) {}

//console.log(firstFunc(['abs', '123'], handler4));
