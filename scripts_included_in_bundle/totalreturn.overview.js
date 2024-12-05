// This JavaScript file is created by Cision for our totalReturn module.
// Built to be used in combination with totalReturn.overview.html

var cision = cision || {};
cision.websolution = cision.websolution || {};
cision.websolution.texts = cision.websolution.texts || {};
cision.websolution.totalReturn = cision.websolution.totalReturn || {};
cision.websolution.settings = cision.websolution.settings || {};
cision.websolution.formatHelpers = cision.websolution.formatHelpers || {};

cision.websolution.totalReturn.overview = !cision.websolution.settings.totalreturn ? {} : function ($) {
    var settings = $.extend({ excludeKeys: [], preferredColors: {} }, cision.websolution.settings.general),
        accessKey = cision.websolution.settings.totalreturn.accessKey,
        chart;

    var texts = cision.websolution.texts[settings.uiLanguage] ||
        cision.websolution.texts["en"] ||
        {
            totalReturnDescriptions: {
                intervalKeys: {}
            }
        };

    var render = function (options) {
        if (options) {
            $.extend(settings, options);
        }

        accessKey = settings.accessKey || cision.websolution.settings.totalreturn.accessKey;

        if (!accessKey) {
            console.log("You must provide your access key.");
            return;
        }

        var promiseOverview = cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "TotalReturn", 'path': 'TotalReturn/' + accessKey + '/Summary' });

        return Promise.resolve(promiseOverview).then(function (dataObj) {
            var seriesData = transformData(dataObj.Instruments[0]);

            createChart(seriesData);

        }).catch(function (err) { console.log('Could not retrieve total return data. ' + err.message); });
    };

    function transformData(objData) {
        var objSeriesPrice = { name: texts.totalReturnDescriptions.titles.Price || 'Listed Price', data: [], uniqueKey: 'gray' };
        objSeriesPrice.color = getPreferredColor(objSeriesPrice.uniqueKey);
        var objSeriesDividend = { name: texts.totalReturnDescriptions.titles.Dividend || 'Dividend', data: [], uniqueKey: 'blue' };
        objSeriesDividend.color = getPreferredColor(objSeriesDividend.uniqueKey);
        var objSeriesReturn = { name: texts.totalReturnDescriptions.titles.TotalReturn || 'Total Return', data: [], uniqueKey: 'orange' };
        objSeriesReturn.color = getPreferredColor(objSeriesReturn.uniqueKey);

        var categories = [];

        $.each(objData.Summaries, function (_ix, objItem) {
            if (settings.excludeKeys.indexOf(objItem.Key) !== -1) {
                return true;
            }
            categories.push(texts.totalReturnDescriptions.intervalKeys[objItem.Key] || objItem.Key);

            objSeriesPrice.data.push(objItem.PricePercentage * 100);
            objSeriesReturn.data.push(objItem.EYieldPercentage * 100);
            objSeriesDividend.data.push(objItem.DividendPercentage * 100);
        });

        return { categories: categories, series: [objSeriesDividend, objSeriesPrice, objSeriesReturn] };
    }

    // Create a graph and set standard settings like colours, tooltips
    function createChart(seriesData) {
        var
            objXAxis = {
                categories: seriesData.categories
            },

            objYAxis = {
                min: 0,
                title: {
                    text: '',
                    margin: 0
                }
            },

            objTooltip = {
                valueDecimals: 2,
                valueSuffix: ' %',
                shared: true,
                useHTML: true
            },

            objPlotOptions = {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.0f}%'
                    }
                }
            };

        chart = new Highcharts.Chart({
            chart: {
                type: 'column',
                renderTo: 'container-total-return-overview-chart',
                defaultSeriesType: 'column'
            },

            series: seriesData.series,

            xAxis: objXAxis,
            yAxis: objYAxis,

            //Set the format on the tooltip
            tooltip: objTooltip,

            //Defines and set the line settings
            plotOptions: objPlotOptions,

            //legend: objLegend,

            credits: {
                enabled: false
            },

            title: {
                text: settings.chartTitle
            }
        });

        return chart;
    }

    var getPreferredColor = function (uniqueKey) {
        var color = null;
        try {
            $.each(settings.cisionChartsColors, function (idx, obj) {
                if (obj.uniqueKey == uniqueKey) {
                    color = obj.preferredColor;
                }
            });
        } catch (e) {
            console.log(e);
        }
        return color;
    };

    return {
        render: render
    };
}(jQuery);
