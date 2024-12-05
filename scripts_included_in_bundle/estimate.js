// This JavaScript file is created by Cision for our estimate module.
// Built to be used in combination with estimateannual.html

var cision = cision || {};
cision.websolution = cision.websolution || {};
cision.websolution.texts = cision.websolution.texts || {};
cision.websolution.estimate = cision.websolution.estimate || {};
cision.websolution.settings = cision.websolution.settings || {};
cision.websolution.formatHelpers = cision.websolution.formatHelpers || {};

cision.websolution.estimate.common = !cision.websolution.settings.estimate ? {} : function ($) {
    var settings = cision.websolution.settings.general;

    function renderEstimateTab(name) {
        //prevent tab rendering if it is already rendered
        if (settings.estimateTabLoaded[name] != null) {
            return;
        }

        switch (name) {
            case "#target-estimate-annual": if (true) {
                cision.websolution.estimate.annual.render({
                    periodStart: (moment().year() - 2).toString(),
                    periodEnd: moment().year() + 1
                });
            }
                break;
            case "#target-estimate-quarterly": if (true) {
                cision.websolution.estimate.quarterly.render({
                    periodStart: (moment().year() - 1).toString() + '-Q1',
                    periodEnd: (moment().year() + 1) + '-Q1'// '2014-Q4'
                });
            }
                break;
            case "#target-estimate-historical": if (true) {
                cision.websolution.estimate.historical.render({
                    chartTitle: 'SALES, MSEK',
                    valuePrefix: '',
                    valueSuffix: ' MSEK',
                    dateFormatTooltip: "Do MMMM YYYY",
                    numberFormatOptions: {
                        decimalPrecision: 0
                    }
                });
            }
                break;
            case "#target-estimate-recommendations": if (true) {
                cision.websolution.estimate.recommendations.renderTicker({
                    dateFormat: settings.dateFormatOptions.dateFormat
                });
                cision.websolution.estimate.recommendations.renderCurrent({
                    dateFormat: settings.dateFormatOptions.dateFormat
                });
            }
                break;
            case "#target-estimate-historic-recommendations": if (true) {
                cision.websolution.estimate.recommendations.renderHistory({
                    startDate: moment().subtract(6, 'months').format('YYYY-MM-DD'),
                    endDate: moment().format('YYYY-MM-DD')
                });
            }
                break;
            default:
        }

        //save value that tab has been rendered
        settings.estimateTabLoaded[name] = true;
    }

    return {
        renderEstimateTab: renderEstimateTab
    };
}(jQuery);