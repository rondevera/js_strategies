TestHarness = {
  strategies: {},
  initialize: function(strategies){
    // Initialize results container
    $('h2').after([
      '<div id="results">',
        '<p class="loading">Running tests&hellip;</p>',
        '<table summary="Test results" cellspacing="0"><tbody></tbody></table>',
      '</div>'
    ].join(''))

    // Store strategies
    TestHarness.strategies = strategies;

    return TestHarness;
  },
  run: function(iterations){
    if(!iterations){ iterations = 1; }
    var runtimes = {},
        minRuntime = -1, maxRuntime = -1,
        resultsHTML = '';

    for(var strategyName in TestHarness.strategies){
      runtimes[strategyName] = (function(){
        var startAt = new Date(), i = iterations;
        while(i--){ TestHarness.strategies[strategyName](); }
        var endAt = new Date(),
            time = (endAt.valueOf() - startAt.valueOf());

        if(minRuntime == -1 || time < minRuntime){ minRuntime = time; }
        if(maxRuntime == -1 || time > maxRuntime){ maxRuntime = time; }
        return time;
      })();
    }

    for(var strategyName in runtimes){
      var runtime = runtimes[strategyName];
      resultsHTML +=
        '<tr>' +
          '<th>' + strategyName.replace('<', '&lt;') + '</th>' + 
          '<td>' + runtime + 'ms</td>' +
          '<td class="bar">' +
            '<em style="width:' + (runtime/maxRuntime * 100) + '%">' +
              (Math.round(runtime/minRuntime * 100) / 100) + 'x</em>' +
                // Rounded to two decimal places
          '</td>'
        '</tr>';
    }

    // Show results
    $(function(){
      var $resultsContainer = $('div#results'),
          $tbody = $resultsContainer.find('table tbody');
      $resultsContainer.find('.loading').hide();
      $tbody.append(resultsHTML);
      $tbody.find('td:contains(' + minRuntime + ')')
        .parents('tr').addClass('min');
    });

    return TestHarness;
  }
};
