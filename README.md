# Esri Slider Widget

:earth_asia: Esri slider widgets is Apostrophe CMS module to show Esri ArcGIS Portal gallery as a widget  :earth_americas:

## What's inside the box?

* Beautiful gallery layout
* Lightweight
* Simple

## Installation

After you have Apostrophe project

```npm install --save esri-slider-widgets request-promise```

_or_ you can clone this project and move to your lib/modules folder.

```
git clone https://github.com/dhnlr/esri-slider-widgets.git
mv esri-slider-widget <apostrophe-project-folder>/lib/modules
```

## Configuration

In **app.js**, add the module to your configuration:

```
// Content Widgets
'esri-slider-widgets': { extend: 'apostrophe-widgets' },
```

After that add module to helper (*<apostrophe-project-folder>/lib/modules/helpers/lib/areas.js*) so module become options when add new widget to page
```
let narrowWidgets = {
  ...
  'esri-slider': {},
  ...
};
```

Voila!

## Usage

After login as admin, click :heavy_plus_sign: icon to add new widgets. On Portal URL field, add your portal URL. Make sure you fill full URL address (with https:// or http://). On Owner field, fill portal gallery owner. On Title field, fill portal gallery title.


## How about license?
All my work licensed with MIT. All other work (ArcGIS & Request) belongs to owner with their own license.

Ps. Sorry for using image and other work without permission. Please, don't sue me.

## Limitations

- Only apply on home page
- No prev/next button
- Show only max 10 items
- No support

