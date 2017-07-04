/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe("RSS Feeds", function() {
      /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

      /**
       * Check if Feeds Variable is defined and not empty
       */
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /**
       * Check if all Feeds have an URL
       */
      it("has URL", function() {
        allFeeds.forEach(function(element) {
          notNullOrEmpty(element.url);
          expect(element.url).toMatch(/^(http|https):\/\//);
        });
      });

      /**
       * Check if all Feeds have a Name
       */
      it("has Name", function() {
        allFeeds.forEach(function(element) {
          notNullOrEmpty(element.name);
        });
      });

      /**
       * Checks if the given Item is Null or Empty
       * @param {string} item the Item to check
       */
      function notNullOrEmpty(item) {
        expect(item).toBeDefined();
        expect(item.length).not.toEqual(0);
      }
    });

    /**
     * All checks for The menu
     */
    describe("The menu", function() {
      // Initial load of DOM Variables used by the Tests
      var body = document.body;
      var menuButton = document.querySelector(".menu-icon-link");

      /**
       * Check if menu is hidden by default
       */
      it("menu hidden by default", function() {
        expect(body.classList).toContain("menu-hidden");
      });

      /**
       * Check if Menu is shown by click and after that hidden again by click
       */
      it("menu toggles on click", function() {
        menuButton.click();
        expect(body.classList).not.toContain("menu-hidden");

        menuButton.click();
        expect(body.classList).toContain("menu-hidden");
      });
    });

    /**
     * All checks of the initial Entries
     */
    describe("Initial Entries", function() {
      /**
       * Initial Function to Run before each Test
       * Will load the Feed
       */
      beforeEach(function(done) {
        loadFeed(0, done);
      });

      /**
       * Checks if after first Load of the Feed Data, there will be at least one Entry in the Feed
       */
      it("after initial load at least one Item in Feed", function() {
        var entriesLength = document
          .querySelector(".feed")
          .querySelectorAll(".entry").length;

        expect(entriesLength).toBeGreaterThan(0);
      });
    });

    /**
     * All Checks for the Selection of a new Feed
     */
    describe("New Feed Selection", function() {
      // Initial State of the Feed before loading anything
      var feedSelectionBeginning;

      /**
       * Initial Function to Run before each test
       * Loads a Feed, Saves the Feed State and than changes the Feed
       */
      beforeEach(function(done) {
        loadFeed(0, function() {
          feedSelectionBeginning = document.querySelector(".feed").innerHTML;

          loadFeed(1, function() {
            done();
          });
        });
      });

      /**
       * check if Feeds change after Selecting a new one
       */
      it("feed content changes after load", function(done) {
        var feedSelectionAfterLoad = document.querySelector(".feed").innerHTML;

        expect(feedSelectionAfterLoad).not.toBe(feedSelectionBeginning);
        done();
      });
    });
  })()
);
