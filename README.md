# Backbone.PagerCollection
we using pagination inside backbone.collection extends

i can't write english

----------------------------------------------

# Required
- API 내에 요청한 collection 에 대한 total count가 필요 하다. parse 메서드에서 API에서 주는 DATA Propertie에 맞게 수정 하면 된다.
````
parse : function(response){
  this._count = response._count; // _count 를 각자에 맞게 수정
  ............
}
````

# How to way
- 최초 collection.initPagination({...}) 을 수행한다.
- initPagination 파라미터는 Obecjt type으로써 다음과 같은 propertie가 있다.
>
+ totalCount
+ currentPage
+ startPage
+ paginationEnabled
