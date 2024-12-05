﻿var cision = cision || {};
cision.websolution = cision.websolution || {};
cision.websolution.formatHelpers = cision.websolution.formatHelpers || {};

cision.websolution.formatHelpers.formatNumber = function (inputNumber, decimalPrecision, decimalSeparator, thousandSeparator) {
    // Uses https://github.com/customd/jquery-number
    //      function( number, decimals, dec_point, thousands_sep )

    if (typeof inputNumber === 'undefined' || inputNumber === null) {
        return inputNumber;
    }

    var defaultOptions = cision.websolution.settings.general.numberFormatOptions || {};

    // Remark: following is to make sure that ZERO is treated as such for decimalPrecision
    if (typeof decimalPrecision === 'undefined' || decimalPrecision === null) {
        if (typeof defaultOptions.decimalPrecision === 'undefined' || defaultOptions.decimalPrecision === null) {
            decimalPrecision = 2;
        } else {
            decimalPrecision = defaultOptions.decimalPrecision;
        }
    }

    // Empty strings should treated as such for thousandSeparator
    if (typeof decimalSeparator === 'undefined' || decimalSeparator === null) {
        if (typeof defaultOptions.decimalSeparator === 'undefined' || defaultOptions.decimalSeparator === null) {
            decimalSeparator = '.';
        } else {
            decimalSeparator = defaultOptions.decimalSeparator;
        }
    }

    // Empty strings should treated as such for thousandSeparator
    if (typeof thousandSeparator === 'undefined' || thousandSeparator === null) {
        if (typeof defaultOptions.thousandSeparator === 'undefined' || defaultOptions.thousandSeparator === null) {
            thousandSeparator = '';
        } else {
            thousandSeparator = defaultOptions.thousandSeparator;
        }
    }

    var formattedNumber = jQuery.number(inputNumber,
        decimalPrecision,
        decimalSeparator || '.',
        thousandSeparator
    );

    return formattedNumber;
};

cision.websolution.formatHelpers.formatCurrency = function (inputNumber, prefix, suffix) {
    if (typeof inputNumber === 'undefined' || inputNumber === null) {
        return inputNumber;
    }

    var formattedNumber = cision.websolution.formatHelpers.formatNumber(inputNumber);

    if (typeof formattedNumber === 'undefined' || formattedNumber === null) {
        return formattedNumber;
    }

    return (prefix || '') + formattedNumber + (suffix || '');
};

cision.websolution.formatHelpers.formatDate = function (input, dateFormat) {

    var defaultOptions = cision.websolution.settings.general.dateFormatOptions || {};

    return moment(input).format(dateFormat || defaultOptions.dateFormat || 'DD MMM YYYY');
};

cision.websolution.formatHelpers.formatTime = function (input, timeFormat) {

    var defaultOptions = cision.websolution.settings.general.dateFormatOptions || {};

    return moment(input).format(timeFormat || defaultOptions.timeFormat || 'HH:mm');
};

cision.websolution.formatHelpers.formatDateTime = function (input, dateTimeFormat) {

    var defaultOptions = cision.websolution.settings.general.dateFormatOptions || {};

    return moment(input).format(dateTimeFormat || defaultOptions.dateTimeFormat || 'DD MMM YYYY HH:mm');
};