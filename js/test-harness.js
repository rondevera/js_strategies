TestHarness = {
  strategies: {},
  run: function(iterations){
    if(!iterations){ iterations = 1; }
    var resultsHTML = '';

    for(var strategyName in TestHarness.strategies){
      resultsHTML += '<tr><th>{{name}}</th><td>{{time}}</td></tr>'
        .replace('{{name}}', strategyName)
        .replace('{{time}}', (function(){
          var startAt = new Date(), i = iterations;
          while(i--){ TestHarness.strategies[strategyName](); }
          var endAt = new Date();

          return (endAt.valueOf() - startAt.valueOf());
        })());
    }

    // Show results
    $(function(){
      $('#results table tbody').append(resultsHTML);
    });
  }
};
