// This JavaScript file is created by Cision for our ticker trades module.
// Built to be used in combination with trades.html

var cision = cision || {};
cision.websolution = cision.websolution || {};
cision.websolution.texts = cision.websolution.texts || {};
cision.websolution.settings = cision.websolution.settings || {};
cision.websolution.formatHelpers = cision.websolution.formatHelpers || {};

cision.websolution.trades = !cision.websolution.settings.ticker ? {} : function ($) {

    var render = function (options) {

        var settings = $.extend({}, cision.websolution.settings.general),
            accessKey = cision.websolution.settings.ticker.accessKey;

        if (options) {
            $.extend(settings, options);
        }
        if (!accessKey) {
            console.log("You must provide your ticker access key.");
            return;
        }
        var promiseTickerTrades = cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Ticker Trades", 'path': 'Ticker/' + accessKey + '/Trades' });

        Promise.resolve(promiseTickerTrades).then(function (rawData) {
            /*
            // Retrieve the Instrument
            var objInstrument = rawData.Instruments[0]; // TODO: find the correct instrument, in case we have many in the Module
            */

            var sortedInstruments = rawData.Instruments.sort(function (a, b) {
                return a.TickerSymbol - b.TickerSymbol;
            });

            for (var instrumentIx = 0; instrumentIx < sortedInstruments.length; instrumentIx++) {
                var objInstrument = sortedInstruments[instrumentIx];

                $.each(objInstrument.Trades, function (idx, objTrade) {
                    objTrade.TradeTimeFormatted = moment(objTrade.TradeTime).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateFormat);
                });
            }

            var tplElement = '#' + (settings.templateElement || 'tplTickerTrades');
            var tplTarget = '#' + (settings.outputTargetElement || 'target-trades');
            cision.websolution.common.modelToHtml(sortedInstruments, tplElement, tplTarget);

        }).catch(function (err) { console.log('Could not retrieve trades data. ' + err.message) });
    };

    return {
        render: render
    };
}(jQuery);