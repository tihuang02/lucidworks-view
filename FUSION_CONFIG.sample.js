appConfig = {
  // If you don't know what you want for some configuration items,
  // leave them as-is and see what happens in UI.
  // You may need to clear browser history/cache before your changes take affect.

  // localhost is used here for same computer use only.
  // You will need to put a hostname or ip address here if you want to go to
  // view this app from another machine.
  host: 'http://localhost',
  port:'8764',

  // Allow anyone to use this search app without logging in.
  // AllowAnonymousAccess: true,
  // If allow AllowAnonymousAccess is set to true these fields must also be set.

  authorizationHeader: {
    'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM='
  },
  // WARNING: using this in a production app is not recommended.
  // The text after 'Basic' is a base64 encoded username and password
  // in the format of admin:password123.
  //
  // To use this you will have to base64 encode your default password.
  //
  // user: 'admin',
  // password: 'password123',

  // Which realm do you want to connect with defaults to native.
  //connectionRealm: 'native',

  // The name of your collection
  collection: 'Coll',

  //Please specify a list of the pipeline(s)/profile(s) that you want to leverage with this UI.
  // 1st pipeline will be default,
  // 2nd pipeline could be signal-enabled.
  queryPipelineIdList: ['default','not-default'],
  queryProfilesIdList: ['default'],
  use_query_profile: true,
  // Force use of query-profile

  // Specify any additional query params you want to include as part of doSearch(),
  // addl_params: '',

  //Search UI Title
  // remove put in html
  searchAppTitle: "Points of Interest Search",
  //In search results, for each doc, display this field as the head field
  head_field: 'title',
  subhead_field: 'id',
  //In search results, for each doc, use this field to generate link value when a user clicks on head field
  head_url_field: 'coord',
  //In search results, display a thumbnail with each doc
  thumbnail_enabled: true,
  //In search results, for each doc, use this field to get thumbnail URL.
  thumbnail_field: 'coord',
  //In search results, display a image in each doc page
  image_field: '',
  //In doc page, display a image with each doc
  image_enabled: true,

  // Image that appears on the left when you initially load searchUI.
  facet_panel_image: "extras/killer-app.png",
  //Put image file in extras subfolder.  Suggest image 300px wide or greater.

  // IMPORTANT: Make sure this fl list contains id and any fields you set for head_field/head_url_field/thumb_field
  // List of fields to retrieve when querying Fusion. No spaces please.
  fl: ['title','amenity','cuisine','city','street','description','id','coord','likes','last_modified_date'],
  //List of fields to display in UI, in the order listed.
  fl2display:['title','id','name'],

  //This needs to be a subset of fl.  No spaces please.
  always_display_field: false, //Set this to true if you want to always display field in the results list even when it has empty value

  signalNum: 100, //# of signals for demo signal submit
  signalType: 'click', //Default signal type
  signals_pipeline: '_signals_ingest', //This specifies the index pipeline that submitSignals() uses to submit signals (simulated clicks)

  geofield: 'coord', // Specify a location field here if you want to enable geospatial search.  Specify EMPTY value if your collection DOES NOT have geospatial data
  distance: '10', // Default distance value in km for geospatial search

  //***Each '_enabled' value below can be changed on the UI***
  query_info_enabled: false, //Set to true if you want to display query info
  search_within_results_enabled: false, //Set to true if you want search with results enabled by default
  stats_enabled: false, //Set to true if you want stats enabled by default

  spellcheck_enabled: false, //Set to true if you want spellcheck enabled by default
  spellcheck_requesthandler: 'spell', //Please make sure this requestHandler is configured in solrconfig.xml if you plan to use spellcheck
  spellcheck_dictionary: 'default_text', //Please make sure this dictionary is configured in solrconfig.xml if you plan to use spellcheck

  //typeahead is auto complete feature in UI
  typeahead_retrieve_num: 5, //Number of suggestions to retrieve from any typeahead mechanisms below

  typeahead_terms_enabled: true, //Enable terms mechanism to do typeahead
  field_fq_enabled: false, //When using terms mechanism, set this to true if you want to include field name when doing auto complete
  typeahead_terms_requesthandler: 'terms',
  typeahead_terms_fl: 'suggestions',

  typeahead_suggester1_enabled: false, //Set to true if you want to enable this by default.  You can always change it in the UI.
  typeahead_suggester1_dictionary: 'Suggester_name', //Please make sure this dictionary is configured in solrconfig.xml if you plan to use this suggester
  typeahead_suggester_requesthandler: 'suggest', //Please make sure this requestHandler is configured in solrconfig.xml if you plan to use suggester

  typeahead_suggester2_enabled: false, //Set to true if you want to enable this by default.  You can always change it in the UI.
  typeahead_suggester2_dictionary: 'Suggester_city', //Please make sure this dictionary is configured in solrconfig.xml if you plan to use this suggester

  typeahead_logs_collection_enabled: false, //Set to true if you want to enable this by default.  You can always change it in the UI.

  typeahead_signals_collection_enabled: false, //Set to true if you want to enable this by default.  You can always change it in the UI.

  //If you want to display friendly labels for any field name, then add a line for each field name below.
  //For example, for 'cuisine' field name, replace it with 'Cuisine' in the UI
  labels: {
    'title': 'Title of the page'
   },
};