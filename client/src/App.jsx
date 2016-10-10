import React from 'react';
import $ from '../node_modules/jquery';
 
//var invocation = new XHLHttpRequest();


/*
var App = React.createClass({
    
    createCORSRequest: function(method, url){
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr){
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined"){
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            xhr = null;
        }
        return xhr;
    }
})


var request = createCORSRequest("get", "http://graphql-swapi.parseapp.com/?query={%20allPeople{%20people{%20name%20}%20}%20}");
if (request){
    request.onload = function() {
    
    };
    request.onreadystatechange = handler;
    request.send();
                xhrFields: {
                withCredentials: true  
            },
}

*/

var App = React.createClass({
    
    getInitialState: function(){
        return {
            searchResults: []
        }
    },
    /*
    callotherDomain; function(URL){
         if(invocation){
            invocation.open('GET', URL, true);
            invocation.setRequestHeader('Content-Type', 'application/json')
            invocation.onreadystatechange = handler;
            invocation.send();
        }
    }
    */
    showResult: function(response){
        console.log(response);
        this.setState({
            searchResults: response.results.data.allPeople.people
        });
    },
    // AJAX get
    /*
    search: function(URL){

        $.ajax({
            type: "GET",
            contentType: "application/json",
            data: URL,
            //dataType: 'JSON',
            url: 'http://localhost:3000/getData',
            success: function(json){
                console.log(json);
                console.log('success');   
            }
        });
    },
    
    */
    //call local server
    
    search: function(URL){      
        var xhr = XMLHttpRequest();
        xhr.onload = function(){
            alert(xhr.responseText);
        };
        xhr.open('GET', 'http://localhost:3000/proxy?'+URL, true);
        xhr.send("f=json")
    },
                            
    
    
    
    /*
    search:function(URL){
        $.getJSON(URL, function(result){
           console.log(result);       
        });
    },
    */
    
    /* GRAPHQL get
    search: function(URL){
        return fetch(window.location.origin, {
            method: 'get',
            header: {'Content-Type': 'application/json'},
            body: JSON.stringify(URL),
        }).then(response => response.json();)
    },
        */
    render: function(){
        return (
            <div>
                <SearchBox search={this.search} />
                <Result searchResults={this.state.searchResults} />
            </div>
        );
    }


});

var SearchBox = React.createClass({    
    render: function(){
        return (
            <div>
                <input type="submit" onClick={this.createAjax} />
            </div>
        );
    },

    createAjax: function(){
        var query    = '{%20allPeople{%20people{%20name%20}%20}%20}';
        var URL      = 'http://graphql-swapi.parseapp.com/?query=' + query;
        this.props.search(URL);
    }
});



var Result = React.createClass({
    render: function(){
        var resultItems = this.props.searchResults.map(function(result){
            return <ResultItem name={result.allPeople.people} />
        });
        return (
            <ul>
                {resultItems}
            </ul>
        );
    }
});



var ResultItem = React.createClass({
    render: function(){
        return <li> {this.props.name} </li>;   
    }
});



export default App;