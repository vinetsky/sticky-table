var table = document.querySelector('.table-sticky');

let srcHead = table.tHead;
let fakeHead;
let fakeTable;

function reformat(table) {
  console.log(table.tHead);
}

duplicateHead = function() {
  srcHead = table.tHead;
  console.log(table.rows.length);
  fakeHead = srcHead.cloneNode(true);
  fakeTable = document.createElement('table');

  fakeTable.classList = table.classList;
  fakeTable.classList.add('pin-to-table');
  fakeTable.classList.remove('table-sticky');
  table.parentNode.prepend(fakeTable);
  fakeTable.prepend(fakeHead);
  return fakeHead;
};

equalizeHeads = function() {
  srcCells = srcHead.rows[0].cells;
  dstCells = fakeHead.rows[0].cells;

  [].forEach.call(srcCells, (currentCell, i) => {
    console.log(currentCell.clientWidth);
    console.log(getComputedStyle(currentCell).width);
    console.log(dstCells[i]);
    dstCells[i].style.width = getComputedStyle(currentCell).width;
  });
};

ajustTop = function() {
  let headTopPosition = srcHead.getBoundingClientRect().top;
  let lastRowTopPosition = table.rows[
    table.rows.length - 1
  ].getBoundingClientRect().top;

  if (headTopPosition > 0 || lastRowTopPosition <= 0) {
    fakeTable.style.top = 0;
  } else if (table.rows.length > 2) {
    fakeTable.style.top = -headTopPosition + 'px';
  }
};

handleResize = function() {
  let resizeTimeout;
  return function() {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function() {
        resizeTimeout = null;
        equalizeHeads();
        ajustTop();
      }, 100);
    }
  };
};

handleScroll = function() {
  let scrollTimeout;
  return function() {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function() {
        scrollTimeout = null;
        ajustTop();
      }, 1);
    }
  };
};

handleTableScroll = function() {
  [].forEach.call(fakeHead.querySelectorAll('.sticky-col'), cell => {
    cell.style.left =
      document.querySelector('.container-scroll').scrollLeft + 'px';
  });
  [].forEach.call(table.querySelectorAll('.sticky-col'), cell => {
    cell.style.left =
      document.querySelector('.container-scroll').scrollLeft + 'px';
  });
};

window.onload = function() {
  duplicateHead();
  equalizeHeads();
  window.addEventListener('resize', handleResize());
  document
    .querySelector('.container-scroll')
    .addEventListener('scroll', handleTableScroll);
  window.addEventListener('scroll', handleScroll());
  //reformat(table);
};
