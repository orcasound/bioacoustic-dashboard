<h1 style="text-align: center">🐋 → 🎤 → 📊<br />Bioacoustic Dashboard</h1>

Insights & visualizations for bioacoustians monitoring hydrophone networks.

## Overview

This project comprises of:

1. A back-end API for storing and retrieving pre-processed data for many hydrophone sites.
2. A front-end web application for viewing metrics for a selected hydrophone site.

## Architecture goals

The finished product will be made open source. In order to facilitate a low barrier to entry for future contributors, we will aim to select tools and frameworks that:

* are widely adopted and well-documented,
* are accessible to intermediate developers, and
* are available for free or at a low cost.

In potential future applications of this dashboard we don't know exactly what data will be stored, what metrics will be displayed, or where a version of this dashboard may be embedded, so we will aim to provide flexibility wherever possible to allow this product to be built upon and used in a variety of contexts.

## Front-end dashboard application

### UX overview

The dashboard's primary function is to facilitate the viewing of charts and metrics for a single hydrophone site. The layout will be fairly simple and include:

* A menu to allow the user to select which chart/metric to view
* A header indicating which hydrophone site is being viewed, and optionally including owner information or organizational logo
* The currently selected chart
* Any applicable controls to manipulate the chart (e.g. date range, event type)
* Text to describe the chart and how to interpret it (possibly revealed through a `(?)` button or tooltip)
* (possibly) A link to download the raw data for a chart

### Chart types

The initial batch of charts will include:

1. **Callrate histogram**
    * A bar chart displaying call detection rates for 24h periods.
    * User can select which signal type they want to display.
    * User can select to over-plot a rolling average.
2. **Bubble scatter plot**
    * A scatter chart displaying compiled acoustic activity events. 
    * Plot also visualizes sunrise/sunset times (or day/night boundaries) as well as lunar phases.
    * User can select the signal type they want to display as well as activating/removing additional info.
3. **SPL-timeline/exceedance**
    * A line chart displaying noise levels and noise exceedance percentiles resolved at least in 24h steps, or better depending on performance.
    * User can select whether to view noise levels or exceedance levels.
    * User can select the noise band to display.
    * For exceedance, user can select one of the hard-coded thresholds they want to see.
4. **Bi-weekly static graphics**
    * Pre-computed PNG plots are shown for a selected time period.
    * User can select date window for display from calendar-type selection.
    * Once image is loaded, user has option to view “previous/next” image” in historical order.

### Technical considerations

* Theme customisation
    * all components should use namespaced CSS classnames, so style rules can be overridden
    * it should be easy to change key theme colours (e.g. through CSS variables)
    * it should be easy to opt-out of all CSS styles
* Configuration layer
    * developers should be able to configure aspects of the application without editing source code or re-compiling it. For example, it should be possible to indicate which chart types are included, the API URI, and the hydrophone ID.
* Website integration
    * ideally the compiled dashboard code can be loaded via a script tag, then an instance of the dashboard can be spawned or removed by calling a simple javascript function

### Technical stack

* [**React.js**](https://reactjs.org/) for the front-end UI and rendering framework. This is a mature product that is widely used by developers. It is the leading 'reactive' framework.
* [**Plotly**](https://plotly.com/javascript/react/) for charting. This library is very capable and popular, and is offered in a number of different programming languages, including Python. This makes it a good choice for an open source project as contributors who aren't familiar with Javascript may nonetheless have experience with Plotly and be able to work on this layer as the APIs are very similar across different languages.

## Back-end metrics API

### Outline

The front-end Dashboard will need to fetch data from an API that can then be rendered in to charts and other visualisations. This project will provide an API specification outlining available endpoints, parameters, and return values. With this specification developers could produce their own API if they wish. Alternatively, relevant code and instructions will be provided to spin up an 'out of the box' API instance with minimal effort.

### Technical considerations

* The API will be REST based, and allow sending and receiving JSON data and images.
* It should be possible to store arbitrary data for a hydrophone, to support the development of new chart types without modifying API code
* The API will have 3 different user types:
    * Public: for example, an instance of the dashboard
    * User: a device or user that can upload data for a single organisation
    * Admin: a person who can manage all data in the API
* Some form of authentication will be required for non-public endpoints
* For the purpose of the front-end dashboard application, only the public GET endpoints need to be implemented.
* Available endpoints:
    * Public:
        * GET /hydrophones/{org_id}
            * Return a list of hydrophone sites for an organisation
        * GET /hydrophone/{org_id}/{site_id}
            * Provide metadata about a particular hydrophone site
        * GET /hydrophone/{org_id}/{site_id}/{key_name}
            * Get data of a certain type for a particular hydrophone site
            * May accept additional parameters to limit/filter/paginate the response as necessary
    * User:
        * PUT /hydrophone/{org_id}/{site_id}/
            * Store data for a particular hydrophone site
        * DELETE /hydrophone/{org_id}/{site_id}/
            * Delete all data about a particular hydrophone site
    * Admin:
        * PUT /user/{org_id}/{user_id}
            * Create a new user and get an API key back, or get a fresh API key for an existing user
        * DELETE /user/{org_id}/{user_id}
            * Delete the given user
        * DELETE /organization/{org_id}
            * Delete an organization and all hydrophone data and users associated with it

### Technical stack

To fulfill the architecture goals, the API will be built on a Cloudflare stack. Cloudflare services were chosen because:

* Cloudflare is a world class cloud infrastructure provider
* no server maintenance will be necessary when using these services
* Cloudflare is cheap in comparison to other prominent providers
* generous free tiers mean that it should be possible to operate the project at zero cost with low traffic levels
* getting up and running is relatively simple

Notable services:

* Cloudflare Workers to provide the API endpoints
* Cloudflare KV for key:value string storage
* Cloudflare Images for image storage
