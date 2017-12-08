/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url defined and not empty',function () {
          for (var i = 0; i < allFeeds.length; i++) {
            expect(allFeeds[i].url).toBeDefined();
            expect(allFeeds[i].url).not.toBe('');
          }
        });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('name defined and not empty',function () {
           for (var i = 0; i < allFeeds.length; i++) {
             expect(allFeeds[i].name).toBeDefined();
             expect(allFeeds[i].name).not.toBe('');
           }
         });

    });


    /* test suite named "The menu" */
    describe('The menu', function () {
      /* a test that ensures the menu element is
       * hidden by default.
       */
       var classList = document.body.classList;
       it('Menu is hidden',function () {
         expect(classList).toContain('menu-hidden');
       });


       /* a test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('is being Toggled correctly',function () {
          $('.menu-icon-link').click();
          expect(classList).not.toContain('menu-hidden');

          $('.menu-icon-link').click();
          expect(classList).toContain('menu-hidden');
        });
    });


    /* test suite named "Initial Entries" */
    describe('Initial Entries',function () {
        /* a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done){
           loadFeed(0,done);
         });

         it('has atleast one feed in container',function (done) {
           expect($('.feed .entry').length).toBeGreaterThan(0);
           done();
         });


    });
    /* test suite named "New Feed Selection" */
    describe('New Feed Selection',function(){

        /* a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         var intialFeedTitle;
         beforeEach(function(done) {
            loadFeed(0, function() {
                intialFeedTitle = document.getElementsByClassName('entry')[0].childNodes;
                //console.log(intialFeedTitle);
                done();
            });
        });

        it('new feed makes changes',function (done) {
          loadFeed(1, function(){
            var newFeedTitle = document.getElementsByClassName('entry')[0].childNodes;
            //console.log(newFeedTitle);
            expect(newFeedTitle[1]).not.toBe(intialFeedTitle[1]);
            done();
          });
        });
    });
}());
