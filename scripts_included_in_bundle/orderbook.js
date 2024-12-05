// This JavaScript file is created by Cision for our orderbook module.
// Built to be used in combination with orderbook.html

var cision = cision || {};
cision.websolution = cision.websolution || {};
cision.websolution.texts = cision.websolution.texts || {};
cision.websolution.settings = cision.websolution.settings || {};
cision.websolution.formatHelpers = cision.websolution.formatHelpers || {};

cision.websolution.orderbook = !cision.websolution.settings.orderbook ? {} : function ($) {
    var settings = $.extend({}, cision.websolution.settings.general),
        accessKey = cision.websolution.settings.orderbook.accessKey;

    var render = function (options) {
        if (options) {
            $.extend(settings, options);
        }
        if (!accessKey) {
            console.log("You must provide your orderbook access key.");
            return;
        }

        var promiseTickerTrades = cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Orderbook", 'path': 'OrderBook/' + accessKey + '/Items' });

        return Promise.resolve(promiseTickerTrades).then(function (dataObj) {
            /*
            var objInstrument = dataObj.Instruments[0],
                max = 0;
            */

            var sortedInstruments = dataObj.Instruments.sort(function (a, b) {
                return a.TickerSymbol - b.TickerSymbol;
            });

            for (var instrumentIx = 0; instrumentIx < sortedInstruments.length; instrumentIx++) {
                var objInstrument = sortedInstruments[instrumentIx];
                var max = 0;

                objInstrument.LastUpdateFormatted = moment(objInstrument.LastUpdate).locale(settings.uiLanguage).calendar();

                $.each(objInstrument.OrderBookItems, function (idx, objItem) {
                    max = Math.max(max, objItem.BidPrice * objItem.BidQuantity, objItem.AskPrice * objItem.AskQuantity);
                });

                $.each(objInstrument.OrderBookItems, function (idx, objItem) {
                    // Calculate bar size
                    objItem.BidVisualComparison = 100 * objItem.BidPrice * objItem.BidQuantity / max;
                    objItem.AskVisualComparison = 100 * objItem.AskPrice * objItem.AskQuantity / max;
                });
            }

            var tplElement = '#' + (settings.templateElement || 'templateorderbook');
            var tplTarget = '#' + (settings.outputTargetElement || 'target-orderbook');
            cision.websolution.common.modelToHtml(sortedInstruments, tplElement, tplTarget);

        }).catch(function (err) { console.log('Could not retrieve orderbook data. ' + err.message) });
    };

    return {
        render: render
    };
} (jQuery);