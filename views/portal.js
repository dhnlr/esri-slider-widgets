// Load Portal Gallery

dojo.require('esri.arcgis.Portal');
dojo.require('esri.IdentityManager');
dojo.require('dojox.lang.aspect');

let displayOptions = {
  themeName: 'gray',
  numItemsPerPage: 999,
  group: {
    owner: 'gempa_lombok',
    title: 'gallery'
  },
  portalUrl: 'https://essclombok.maps.arcgis.com/'
};
let portal;
let group;
let nextQueryParams;
let queryParams;

function init () {
  portal = new esri.arcgis.Portal(displayOptions.portalUrl);
  dojo.connect(portal, 'onLoad', loadPortal);
  dojox.lang.aspect.advise(portal, 'queryItems', {
    afterReturning: function (queryItemsPromise) {
      queryItemsPromise.then(function (result) {
        nextQueryParams = result.nextQueryParams;
        queryParams = result.queryParams;
      });
    }
  });
}

function loadPortal () {
  let params = {
    q:
      'title: ' +
      displayOptions.group.title +
      ' AND owner:' +
      displayOptions.group.owner
  };
  portal.queryGroups(params).then(function (groups) {
    // get group title and thumbnail url
    if (groups.results.length > 0) {
      group = groups.results[0];

      // Retrieve the web maps and applications from the group and display
      let params = {
        q: ' type: *',
        num: displayOptions.numItemsPerPage
      };
      group.queryItems(params).then(updateGrid);
    }
  });
}

function updateGrid (queryResponse) {
  // update the gallery to get the next page of items

  let galleryList = dojo.byId('galleryList');
  dojo.empty(galleryList); // empty the gallery to remove existing items

  // navigation buttons

  // Build the thumbnails for each item the thumbnail when clicked will display the web map in a template or the web application
  let frag = document.createDocumentFragment();
  dojo.forEach(queryResponse.results, function (item) {
    console.log(item);

    if (item.id) {
      // var tilehref = dojo.create(
      //     "a", {
      //         href: item.url,
      //         target: "_blank",
      //         // class: "hoveredhref",
      //     }, frag
      // );
      let tile = dojo.create(
        'a',
        {
          class: 'tile',
          href: item.url,
          target: '_blank'
        },
        frag
      );
      // var tile = dojo.create("div", {
      //     class: 'tile',
      // }, tilehref);
      let tileMedia = dojo.create(
        'div',
        {
          class: 'tile__media',
          innerHTML:
            '<img class="tile__img" src="' +
            item.thumbnailUrl +
            '" alt="' +
            item.title +
            '"/>'
        },
        tile
      );
      let tileDetails = dojo.create(
        'div',
        {
          class: 'tile__details',
          innerHTML: '<div class="tile__title">' + item.title + '</div>'
        },
        tile
      );
    }
  });

  dojo.place(frag, galleryList);
}

dojo.ready(init);

// End Portal Gallery
