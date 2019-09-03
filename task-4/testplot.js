const plotly = require('plotly')('timtatt', 'YgTqcFjrr4RB28HeCLBz');

var data = [{x:[0,1,2], y:[3,2,1], type: 'bar'}];
var layout = {fileopt : "overwrite", filename : "simple-nodeexample"};
plotly.plot(data, layout, function (err, msg) {
 if (err) return console.log(err);
 console.log(msg);
});