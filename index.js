const request = require('request-promise');

const getGalleryItem = config => {
  return new Promise(async (resolve, reject) => {
    try {
      const groupResponse = await request(
        `${
          config.portalURL
        }/sharing/rest/community/groups?num=10&start=0&sortField=title&sortOrder=asc&q=title%3A%20${encodeURIComponent(
          config.groupTitle
        )}%20AND%20owner%3A${encodeURIComponent(config.groupOwner)}&f=json`,
        { json: true }
      );
      const imageResponse = await request(
        `${
          config.portalURL
        }/sharing/rest/search?num=999&start=0&sortField=title&sortOrder=asc&q=group%3A${
          groupResponse.results[0].id
        }%20%20type%3A%20*&f=json`,
        { json: true }
      );
      await resolve(imageResponse.results);
    } catch (error) {
      await reject(error);
    }
  });
};

module.exports = {
  label: 'Esri Portal Gallery Slider',
  addFields: [
    {
      name: 'portalURL',
      label: 'URL of ArcGIS portal (include http://)',
      type: 'url',
      required: true
    },
    {
      name: 'groupTitle',
      label: 'Gallery group title',
      type: 'string',
      required: true
    },
    {
      name: 'groupOwner',
      label: 'Gallery group owner',
      type: 'string',
      required: true
    }
  ],
  construct: function (self, options) {
    self.on(
      'apostrophe-pages:beforeSend',
      'addEsriPortalGallery',
      async function (req) {
        if (req.data.page) {
          if (req.data.page.body) {
            for (
              let index = 0;
              index < req.data.page.body.items.length;
              index++
            ) {
              if (req.data.page.body.items[index].type == 'esri-slider') {
                try {
                  req.data.arcgis = await getGalleryItem(
                    req.data.page.body.items[index]
                  );
                } catch (error) {
                  console.error(error);
                }
              } else if (req.data.page.body.items[index].type == 'columns') {
                if (req.data.page.body.items[index].column1) {
                  for (
                    let itemsCol1 = 0;
                    itemsCol1 <
                    req.data.page.body.items[index].column1.items.length;
                    itemsCol1++
                  ) {
                    if (
                      req.data.page.body.items[index].column1.items[itemsCol1]
                        .type == 'esri-slider'
                    ) {
                      try {
                        req.data.arcgis = await getGalleryItem(
                          req.data.page.body.items[index].column1.items[
                            itemsCol1
                          ]
                        );
                      } catch (error) {
                        console.error(error);
                      }
                    }
                  }
                }
                if (req.data.page.body.items[index].column2) {
                  for (
                    let itemsCol2 = 0;
                    itemsCol2 <
                    req.data.page.body.items[index].column2.items.length;
                    itemsCol2++
                  ) {
                    if (
                      req.data.page.body.items[index].column2.items[itemsCol2]
                        .type == 'esri-slider'
                    ) {
                      try {
                        req.data.arcgis = await getGalleryItem(
                          req.data.page.body.items[index].column2.items[
                            itemsCol2
                          ]
                        );
                      } catch (error) {
                        console.error(error);
                      }
                    }
                  }
                }
                if (req.data.page.body.items[index].column3) {
                  for (
                    let itemsCol3 = 0;
                    itemsCol3 <
                    req.data.page.body.items[index].column3.items.length;
                    itemsCol3++
                  ) {
                    if (
                      req.data.page.body.items[index].column3.items[itemsCol3]
                        .type == 'esri-slider'
                    ) {
                      try {
                        req.data.arcgis = await getGalleryItem(
                          req.data.page.body.items[index].column3.items[
                            itemsCol3
                          ]
                        );
                      } catch (error) {
                        console.error(error);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    );
  }
};
