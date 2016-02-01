(function (factory) {

  // CommonJS
  if (typeof exports == "object" && typeof require == "function") {
    module.exports = factory(require("underscore"), require("backbone"));
  }
  // AMD
  else if (typeof define == "function" && define.amd) {
    define(["underscore", "backbone"], factory);
  }
  // Browser
  else if (typeof _ !== "undefined" && typeof Backbone !== "undefined") {
    var oldPagerCollection = Backbone.PagerCollection;
    var PagerCollection = factory(_, Backbone);

    Backbone.PagerCollection.noConflict = function () {
      Backbone.PagerCollection = oldPagerCollection;
      return PagerCollection;
    };
  }

}(function (_, Backbone) {

  "use strict";
  
  var PagerCollection = Backbone.PagerCollection = Backbone.Collection.extend({
	

    // On parse, set the _count and call onParse if defined for more custom behavior.
    parse: function(response){
      this._count = response._count;
      
      if(this.onParse){
        var returnedRes = this.onParse(response);
      }
      response = returnedRes || response;
      
      this.state.totalCount = parseInt(this._count);
      // initialize totalPages ( if fetch end )
      this.state.totalPages = Math.ceil(this.state.totalCount / this.state.nbPerPage);
      
      // Let backbone handle the "real" collection
      return response.data;
    },

	// if want using pagination inside collection, we should inilialize pagination default object
	initPagination: function(options){
		this.state.totalCount = options.totalCount || pareInt(this._count);
		this.state.nbPerPage = options.nbPerPage || 5;
		this.state.totalPages = options.totalPages || Math.ceil(this.state.totalCount / this.state.nbPerPage);
		this.state.currentPage = options.currentPage || 0;
		this.state.startPage = options.startPage || 1;
		this.paginationEnabled = true;
	},

	// check possible pagination
	paginationEnabled : false,

	// default object for pagination
	state : {
		currentPage : null,
		totalCount : null,
		totalPages : null,
		nbPerPage : null,
		startPage : null	
	},

	// get next data for pagination
	getNextPage : function(options){
		if(this.paginationEnabled){
			if(!this.hasNextPage()){
				return false;	
			}
			var currentPage = this.state.currentPage;
			currentPage++;
			return this.getPage(currentPage, options);
		}else{
			throw 'Enabled patination getPage function';
		}
	},

	// get previous data for pagination
	getPrevPage : function(options){
		if(this.paginationEnabled){
			if(!this.hasPrevPage()){
				return false;	
			}
			var currentPage = this.state.currentPage;
			currentPage--;
			return this.getPage(currentPage,options);
		}else{
			throw 'Enabled patination getPage function';
		}
	},

	// if paginationEnabled === true,  we can using a fetch for get page
	getPage : function(pageNum, options){
		if(this.paginationEnabled){
			var limit = this.state.nbPerPage;
			if(this.checkInt(pageNum)){
				this.state.startPage = this.getStartCalc(pageNum);
				this.state.currentPage = pageNum;
			}
		
			options = options || {};
			options.data = options.data || {};
			options.data.start = this.state.startPage;
			options.data.limit = limit;

			return this.fetch(options);
		}else{
			throw 'Enabled patination getPage function';
		}
	},

	getStartCalc : function(pageNum){
		var limit = this.state.nbPerPage;
		var startPage = limit*(pageNum -1);
		return startPage; 
	},

	// check possible get next page
	hasNextPage : function(){
		var currentPage = this.state.currentPage;
		if( (currentPage + 1) > this.state.totalPages){
			return false;
		}
		return true;
	},

	// check possible get previous page
	hasPrevPage : function(){
		var currentPage = this.state.currentPage;
		if((currentPage - 1) <= 0){
			return false;
		}
		return true;
	},

	// Only using a Integer  value inside state object
	checkInt : function(val, name){
		val = parseInt(val);
		if(!_.isNumber(val) || _.isNaN(val) || !_.isFinite(val) || ~~val !== val){
			throw new TypeError('Invalid Type Error : '+ name);
		}
		return val;
	}
  });
  
  var PagerCollectionProto = PagerCollection.prototype;

  return PagerCollection;
})
);
