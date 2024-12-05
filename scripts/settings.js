// This JavaScript file is created by Cision and holds settings for all our client modules.
// This file works as a config file for all the modules and here you will find general settings 
// and a specific sektion for each module with its access key that is used to fetch the data from our API. 

var cision = cision || {};
cision.websolution = cision.websolution || {};
cision.websolution.settings = cision.websolution.settings || {};

cision.websolution.settings = {
    general: {
        // Settings that apply to all modules
        recaptchaSiteKey: '6Lf7cL0aAAAAALGkVK81FzxmP6MU0vzc_m6p-GfH',
        serviceEndpoint: 'https://publish.ne.cision.com/papi/',
        uiLanguage: 'en',
        useProxyHandler: false,
        // proxyHandler: 'ProxyCallsHttpHandler.ashx',
        startDate: '',
        endDate: '',
        pageIndex: 0,
        pageSize: 50,
        numberFormatOptions: {
            thousandSeparator: ' ',
            decimalSeparator: ',',
            decimalPrecision: 2
        },
        dateFormatOptions: {
            dateTimeFormat: 'DD MMM YYYY HH:mm',
            dateFormat: 'DD MMM YYYY',
            timeFormat: 'HH:mm'
        },

        // Newsfeed specific settings
        separateFirstRelease: false,
        introMaxLength: 155,
        titleMaxLength: null,
        newsfeedYearsStartYear: 1980,

        // ownership specific settings
        LargestPieShowCount: 10,
        LargestListShowCount: 10,

        // Calendar specific settings
        separateFirstEvent: false,

        // Printed Material specific settings
        printedMaterialCategory: '',
        maxAmountOfItems: 10, // max amount of items a user can order in one request

        // Ticker specific settings
        tickerImageMinus: "https://raw.githubusercontent.com/billypaarts/beijerref/refs/heads/main/images/arrow-down-right.svg",
        tickerImagePlus: "https://raw.githubusercontent.com/billypaarts/beijerref/refs/heads/main/images/arrow-up-right.svg",
        tickerImageUnchanged: "https://raw.githubusercontent.com/billypaarts/beijerref/refs/heads/main/images/arrow-right.svg",

        //Share calculator specific settings
        startDateYear: 2007,

        // Sharegraph specific settings
        chartContainerId: 'sharegraph-container',
        chartTitle: '',
        backgroundImage: '',
        lineWidth: 2,
        gridLineWidth: 0,
        plotBackgroundColor: 'white',
        plotBorderWidth: 0,
        defaultSeriesType: 'spline', //area, areaspline, bar, column, line, pie, scatter, spline, candlestick or ohlc, arearange, areasplinerange and columnrange.
        chartComparison: 'none', /* Default comparison type */
        typeOfChart: 'EndOfDay',
        showHorisontalTicker: true,
        useHighchartsElements: false, // enabling highcharts own exports and range selectors, can be used if cisions custom ones are removed 
        enableLegend: false,
        enableScrollbar: false,
        enableNavigator: true,
        showVolume: true,
        showUnadjustedQuotes: false,
        dividendType: 'Annual', // Annual, Bonus, Monthly, Quarterly, HalfYear 
        dividendTypes: ['Annual', 'HalfYear', 'Quarterly'], // Annual, Bonus, Monthly, Quarterly, HalfYear
        effectiveYieldSuffix: 'EFFECTIVEYIELD',
        yAxisSize: { share: { top: 0, height: 250 }, volume: { top: 300, height:80 } }, // sizes for the share graph and the volume graph. only applies when volume is displayed
        mainInstruments: [ /* Array of instruments to consider primary while others become Peers and Indexes */
            { symbol: 'BEIJ B', marketPlace: 'XSTO', currency: 'SEK', name: 'Beijer Ref B', hasEffectiveYield: false }
        ],
        indexInstruments: [
            { symbol: 'OMXSPI', marketPlace: 'XSTO', currency: 'SEK', name: 'OMX Stockholm PI' }
        ],
        peersInstruments: [
            //{ symbol: 'TEL2 B', marketPlace: 'XSTO', currency: 'SEK', name: 'Tele 2' }
        ],
        instrumentColors: [
            { uniqueKey: 'BEIJ BXSTOSEK', preferredColor: '#66a6d1' }, /*f27b7b*/
            { uniqueKey: 'OMXSPIXSTOSEK', preferredColor: '#4286f4' }, /*4286f4*/
            { uniqueKey: 'BEIJ BXSTOSEKVOLUME', preferredColor: '#0069b4' } /*c46464*/
        ],
        // Displaying releases, reports, insiders and dividend in the graph.
		// Acivate INSIDERS if the Customer have the service INSIDER and activate DIVIDEND if the customer have Dividend
        // If the indicators should be attached to a line in the graph add correct symbol, marketplace and currency as seriesId otherwise it will stick to the bottom
        // shape = squarepin, flag or circlepin
        indicatorsOnSeries: [
            { uniqueKey: 'Regulatory RPT', translationKey: 'TextReport', seriesId: 'BEIJ BXSTOSEK', shape: 'circlepin', title: 'R', shapeColor: '#f27b7b', shapeOutlineColor: '#f27b7b', shapeTextColor: 'white' },  
            { uniqueKey: 'Regulatory PRM', translationKey: 'TextPress', seriesId: '', shape: 'circlepin', title: 'P', shapeColor: '#f27b7b', shapeOutlineColor: '#f27b7b', shapeTextColor: 'white' },
        //    { uniqueKey: 'INSIDERS', translationKey: 'TextInsider', shape: 'flag', title: 'INS', shapeColor: '#a4c5fc', shapeOutlineColor: '#4970af', shapeTextColor: 'black' },
        //    { uniqueKey: 'DIVIDEND', translationKey: 'TextDividend', shape: 'squarepin', title: 'U', shapeColor: '#ecefbf', shapeOutlineColor: '#bec18d', shapeTextColor: 'black' }  
        ],
        // Sharegraph releases specific settings
        showReleaseLink: true,
        enableReleasesOnIntraday: true,
        releaseLinkFormatter: 'https://publish.ne.cision.com/Release/ViewReleaseHtml/',

        // Estimates specific settings
        estimateCurrency: '', // should never be necessary, filters out data with specific currency in the same data set 
        field: 'SALES' /* default historical graph choose between SALES/EBIT/DPS/EPS */,
        valuePrefix: '',
        valueSuffix: ' SEK',
        tooltipHeaderEstimate: "Estimate - ",
        tooltipHeaderReal: "Actual - ",
        tooltipDateLabel: "",
        tooltipAmountLabel: "",
        suffixEstimate: ' FC',
        suffixActual: '',
        periodStart: '',
        periodEnd: '',
        dateString: "",
        amountString: "",
        hideEstimateIfActualExists: true,

        //stores data if ownership tab is rendered
        ownershipTabLoaded: [],
        //stores data if estimate tab is rendered
        estimateTabLoaded: [],
        cisionChartsColors: [
            { uniqueKey: 'gray', preferredColor: '#5C5C61' },
            { uniqueKey: 'blue', preferredColor: '#00607f' },
            { uniqueKey: 'orange', preferredColor: '#ff6c36' }
        ]
    },

   orderbook: {
        accessKey: '20C9DF9B714B4189968BE14E4081D784'
    },
    ownership: {
        accessKey: '01DEAD7E28974BDDA037B28842809CFC'
    },
    estimate: {
        accessKey: '',
        accessKeyTicker: ''
    },
    ticker: {
        accessKey: 'EBF50FADBA834423B0DEDFDAFEF13DC1'
    },
    sharegraph: {
        accessKey: '17A219A6FB2F44C7B159DC4977F4B603',
        shareHistoryKey: '32673400D0C041B08AF9033C36AC8D7C'
    },
    sharecalculator: {
        accessKey: ''
    },
    minisharegraph: {
        accessKey: '17A219A6FB2F44C7B159DC4977F4B603'
    },
    newsfeed: {
        accessKey: ''
    },
    mediafeed: {
        accessKey: ''
    },
    insider: {
        accessKey: ''
    },
    calendar: {
        accessKey: ''
    },
    printedMaterial: {
        accessKey: ''
    },
    totalreturn: {
        accessKey: ''
    }

};

// Switch moment language
try {
    moment.locale(cision.websolution.settings.general.uiLanguage);
} catch (e) {
    console.log(e);
}

try {
    Highcharts.setOptions({
        lang: {
            decimalPoint: cision.websolution.settings.general.numberFormatOptions.decimalSeparator,
            thousandsSep: cision.websolution.settings.general.numberFormatOptions.thousandSeparator
        }
    });
} catch (e) {
    console.log(e);
}
