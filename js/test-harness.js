TestHarness = {
  strategies: {},
  run: function(iterations){
    if(!iterations){ iterations = 1; }
    var resultsHTML = '', minRuntime = -1;

    for(var strategyName in TestHarness.strategies){
      resultsHTML += '<tr><th>{{name}}</th><td>{{time}}</td></tr>'
        .replace('{{name}}', strategyName)
        .replace('{{time}}', (function(){
          var startAt = new Date(), i = iterations;
          while(i--){ TestHarness.strategies[strategyName](); }
          var endAt = new Date();

          var runtime = (endAt.valueOf() - startAt.valueOf());
          if(minRuntime == -1 || runtime < minRuntime){
            minRuntime = runtime;
          }
          return runtime;
        })());
    }

    // Show results
    $(function(){
      var $tbody = $('#results table tbody')
      $tbody.append(resultsHTML);
      $tbody.find('td:contains(' + minRuntime + ')').addClass('min');
    });
  }
};
