# Backbone.PagerCollection
- Bakcbone pagination 
- We can using colleciton for pagination


i can't write english

----------------------------------------------

# Required
- API 내에 요청한 collection 에 대한 total count가 필요 하다. parse 메서드에서 API에서 주는 DATA Propertie에 맞게 수정 하면 된다.
````
parse : function(response){
  this._count = response._count; // _count 를 각자에 맞게 수정
  ............
  return response.data; // 이것 또한 자신의 API가 주는 json 구조에 맞게 바꾸어 return 해준다.
}
````

# How to way
- 최초 collection.initPagination({...}) 을 수행한다.
- initPagination 파라미터는 Obecjt type으로써 다음과 같은 propertie가 있다.
  * nbPerPaage : 각 페이지당 showing할 아이템 갯수
  * totalPages : 총 페이지 갯수
  * totalCount : collection의 총 model 갯수
  * currentPage : 현재 페이지
  * startPage : 시작 페이지
  * paginationEnabled : 페이지네이션 가능 여부 

- 그 후에 3가지 방법으로 페이지 네이션을 진행한다.
````
collection.getNextPage(options){};
collection.getPrevPage(options){};
collection.getPage(pageNum, options){};

// options 는 기본적인 backbone fetch save delete에서 사용했던 options들이다, ( callback 형식 )
// getNextPage, getPrevPage로 이전,다음 페이지로 이동이 가능하며, 
// getPage로는 원하는 페이지번호로 이동할 수 있다.
````

- 또한 이전,다음 페이지로 이동이 가능한지 에 대한 체크가 된다.

````
  collection.hasNextPage();
  collection.hasPrevPage();
````
- initPagination 을 통해 설정한 현재 collection의 페이지네이션 config확인 가능
````
  colleciton.state // object로 설정한 config 확인 가능
````
