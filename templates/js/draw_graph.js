Highcharts.SparkLine = function (a, b, c) {
    var hasRenderToArg = typeof a === 'string' || a.nodeName,
        options = arguments[hasRenderToArg ? 1 : 0],
        defaultOptions = {
            chart: {
                renderTo: (options.chart && options.chart.renderTo) || this,
                backgroundColor: null,
                type: 'line',
                margin: [2, 0, 2, 0],
                width: 120,
                height: 20,
                style: {
                    overflow: 'visible'
                },
            },
            title: {
                text: ''
            },
            credits: {
                enabled: false
            },
            xAxis: {
                labels: {
                    enabled: false
                },
                title: {
                    text: null
                },
                startOnTick: false,
                endOnTick: false,
                tickPositions: []
            },
            yAxis: {
                endOnTick: false,
                startOnTick: false,
                labels: {
                    enabled: false
                },
                title: {
                    text: null
                },
                tickPositions: [0]
            },
            legend: {
                enabled: false
            },
            tooltip: {
                hideDelay: 0,
                outside: true,
                shared: true
            },
            plotOptions: {
                series: {
                    animation: false,
                    lineWidth: 1,
                    shadow: false,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    marker: {
                        radius: 1,
                        states: {
                            hover: {
                                radius: 2
                            }
                        }
                    },
                    fillOpacity: 0.25
                },
            }
        };

    options = Highcharts.merge(defaultOptions, options);

    return hasRenderToArg ?
        new Highcharts.Chart(a, options, c) :
        new Highcharts.Chart(options, b);
};

    var $tds = $('td[data-name]')

    function draw_graph(i, data, chart) {

        i.highcharts('SparkLine', {
                series: [{
                    data: data
                }],
                tooltip: {
                    headerFormat: '<span style="font-size: 10px">' + i.parent().find('th').html() + ':</span><br/>',
                    pointFormat: '<b>{point.y}</b>'
                },
                chart: chart
            });
    }

    function doChunk() {
        var len = $tds.length,
            $td,
            chart;

        for (var i = 0; i < len; i += 1) {
            $td = $($tds[i]);
            chart = {};

            $.ajax({
                url: $td.data('url'),
                dataType: 'json',
                ajaxTd: $td,
                success: function (data) {
                    draw_graph(this.ajaxTd, data, chart)
                }
            })
        }
    }
