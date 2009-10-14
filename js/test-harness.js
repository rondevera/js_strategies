TestHarness = {
  strategies: {},
  run: function(iterations){
    if(!iterations){ iterations = 1; }
    var resultsHTML = '', minRuntime = -1;

    for(var strategyName in TestHarness.strategies){
      var runtime = (function(){
        var startAt = new Date(), i = iterations;
        while(i--){ TestHarness.strategies[strategyName](); }
        var endAt = new Date(),
            time = (endAt.valueOf() - startAt.valueOf());

        /*
        Alternatively:
        var time = 0 - (new Date().valueOf() - (function(i){
          while(i--){ TestHarness.strategies[strategyName](); }
          return new Date().valueOf();
        })(iterations));
        */

        if(minRuntime == -1 || time < minRuntime){
          minRuntime = time;
        }
        return time;
      })();
      resultsHTML += '<tr><th>{{name}}</th><td>{{time}}</td></tr>'
        .replace('{{name}}', strategyName.replace('<', '&lt;'))
        .replace('{{time}}', runtime + 'ms');
    }

    // Show results
    $(function(){
      var $tbody = $('#results table tbody')
      $tbody.append(resultsHTML);
      $tbody.find('td:contains(' + minRuntime + ')')
        .parents('tr').addClass('min');
    });
  }
};
