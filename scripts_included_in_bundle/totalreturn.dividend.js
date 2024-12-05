// This JavaScript file is created by Cision for our totalReturn module.
// Built to be used in combination with totalReturn.dividend.html

var cision = cision || {};
cision.websolution = cision.websolution || {};
cision.websolution.texts = cision.websolution.texts || {};
cision.websolution.totalReturn = cision.websolution.totalReturn || {};
cision.websolution.settings = cision.websolution.settings || {};
cision.websolution.formatHelpers = cision.websolution.formatHelpers || {};

cision.websolution.totalReturn.dividend = !cision.websolution.settings.totalreturn ? {} : function ($) {
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
        var postData = {};
        if (settings.dividendType) { postData.dividendType = settings.dividendType; }

        if (!(settings.dividendTypes && settings.dividendTypes.length)) {
            settings.dividendTypes = [settings.dividendType || ''];
        }

        var promises = {};

        (settings.dividendTypes || []).forEach(function(dividendTypeKey) {
            promises[dividendTypeKey] = cision.websolution.common.getModuleData({
                'accessKey': accessKey, 'module': "TotalReturn Dividend",
                'path': 'TotalReturn/' + accessKey + '/Dividend',
                'postData': { 'dividendType': dividendTypeKey }
            });
        });

        return Promise.all(Object.values(promises)).then(function (values) {
            var seriesData = { categories: [], series: [], rows: [] };

            values.forEach(function (dataObj, idx) {
                var dividendType = '';
                if (dataObj.Instruments[0].AnnualDividends) {
                    dividendType = 'Annual';
                } else if (dataObj.Instruments[0].HalfYearDividends) {
                    dividendType = 'HalfYear';
                } else if (dataObj.Instruments[0].QuarterlyDividends) {
                    dividendType = 'Quarterly';
                } else if (dataObj.Instruments[0].MonthlyDividends) {
                    dividendType = 'Monthly';
                } else {
                    dividendType = 'Bonus';
                }

                if (idx > 0) {
                    dataObj.Instruments[0].BonusDividends = null;
                }

                var objTranformed = transformData(dataObj.Instruments[0], dividendType);

                if (idx == 0) {
                    objTranformed.categories.forEach(function (c_) { seriesData.categories.push(c_); });
                }

                // Append
                objTranformed.series.forEach(function (s_) { seriesData.series.push(s_); });
                objTranformed.rows.forEach(function (r_) { seriesData.rows.push(r_); });
            });

            seriesData.rows = seriesData.rows.sort(function (a, b) { return a.EventDate > b.EventDate ? -1 : 1; });

            createChart(seriesData);

            renderListing(seriesData);

        }).catch(function (err) { console.log('Could not retrieve total return data. ' + err.message); });
    };

    function transformData(objData, dividendType) {
        dividendType = dividendType || settings.dividendType;

        var
            objSeriesMain = {
                name: texts.totalReturnDescriptions.titles["DividendType_" + dividendType] || dividendType || "Annual",
                data: [],
                uniqueKey: dividendType // 'gray'
            },
            objSeriesBonus = {
                name: texts.totalReturnDescriptions.titles["DividendType_Bonus"] || "Bonus",
                data: [],
                uniqueKey: 'blue'
            },
            categories = [];
        objSeriesMain.color = getPreferredColor("dividend_" + dividendType) || getPreferredColor(dividendType);
        objSeriesBonus.color = getPreferredColor("dividend_Bonus") || getPreferredColor(objSeriesBonus.uniqueKey);

        switch (dividendType) {
            case 'Bonus':
                objData.MainDividends = []; // objData.BonusDividends;
                break;
            case 'Monthly':
                objData.MainDividends = objData.MonthlyDividends;
                break;
            case 'Quarterly':
                objData.MainDividends = objData.QuarterlyDividends;
                break;
            case 'HalfYear':
                objData.MainDividends = objData.HalfYearDividends;
                break;
            default:
                objData.MainDividends = objData.AnnualDividends;
                break;
        }

        $.each(objData.MainDividends || [], function (_ix, objItem) {
            var objDate = moment(objItem.EventDate);
            var year = objDate.year() - 1;

            objItem["Year"] = year;

            objItem["Type"] = objSeriesMain.name;

            var objPoint = objSeriesMain.data.find(function(o) { return o.x === year; });
            if (objPoint) {
                objPoint.y = objPoint.y + objItem.AmountAdjusted;
            } else {
                objSeriesMain.data.push({ x: year, y: objItem.AmountAdjusted });
            }
        });

        $.each(objData.BonusDividends, function (_ix, objItem) {
            var objDate = moment(objItem.EventDate);

            var year = objDate.year() - 1;
            objItem["Year"] = year;
            objItem["Type"] = objSeriesBonus.name;

            objSeriesBonus.data.push({ x: year, y: objItem.AmountAdjusted });
        });

        var rows = (objData.MainDividends || []).concat(objData.BonusDividends || []);
        rows = rows.sort(function (a, b) { return a.EventDate > b.EventDate ? -1 : 1; });
        var series = [objSeriesMain];

        if (objSeriesBonus.data && objSeriesBonus.data.length) {
            series.push(objSeriesBonus);
        }

        return { categories: categories, series: series, rows: rows };
    }

    var renderListing = function (objData) {
        var model = { rows: objData.rows };

        //model.rows = Object.values(rows);

        var compositeModel = $.extend({}, model, texts, settings);
        var tplElement = '#' + (settings.templateElementListing || 'tplTotalReturnDividendListing');

        var renderedHtml = $(tplElement).render(compositeModel, cision.websolution.formatHelpers);
        var tplTarget = '#' + (settings.outputTargetElement || 'target-total-return-dividend-listing');

        $(tplTarget).html(renderedHtml);
    };

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
                //valueSuffix: ' Kr',
                shared: true,
                useHTML: true
            },

            objPlotOptions = {
                column: {
                    stacking: 'normal'
                }/*,
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}'
                    }
                }*/
            };

        chart = new Highcharts.Chart({
            chart: {
                type: 'column',
                renderTo: 'container-total-return-dividend-chart',
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
