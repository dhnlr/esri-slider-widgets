const request = require("request-promise");

module.exports = {
  label: "Esri Portal Gallery Slider",
  addFields: [
    {
      name: "portalURL",
      label: "URL of ArcGIS portal (include http://)",
      type: "url",
      required: true
    },
    {
      name: "groupTitle",
      label: "Gallery group title",
      type: "string",
      required: true
    },
    {
      name: "groupOwner",
      label: "Gallery group owner",
      type: "string",
      required: true
    }
  ],
  construct: function(self, options) {
    self.on(
      "apostrophe-pages:beforeSend",
      "addEsriPortalGallery",
      async function(req) {
        // Node 8+: we can "await" anything that returns a promise, like
        // the request-promise module does
        if (req.data.home.body) {
          for (
            let index = 0;
            index < req.data.home.body.items.length;
            index++
          ) {
            if (req.data.home.body.items[index].type == "esri-slider") {
              const groupResponse = await request(
                `${
                  req.data.home.body.items[index].portalURL
                }/sharing/rest/community/groups?num=10&start=0&sortField=title&sortOrder=asc&q=title%3A%20${
                  req.data.home.body.items[index].groupTitle
                }%20AND%20owner%3A${
                  req.data.home.body.items[index].groupOwner
                }&f=json`,
                { json: true }
              );
              const imageResponse = await request(
                `${
                  req.data.home.body.items[index].portalURL
                }/sharing/rest/search?num=999&start=0&sortField=title&sortOrder=asc&q=group%3A${
                  groupResponse.results[0].id
                }%20%20type%3A%20*&f=json`,
                { json: true }
              );
              req.data.arcgis = imageResponse.results;
              break;
            }
          }
        }
      }
    );
  }
};
