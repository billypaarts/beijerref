// This JavaScript file is created by Cision for our ownership module.
// Built to be used in combination with ownership.html

var cision = cision || {};
cision.websolution = cision.websolution || {};
cision.websolution.texts = cision.websolution.texts || {};
cision.websolution.settings = cision.websolution.settings || {};
cision.websolution.formatHelpers = cision.websolution.formatHelpers || {};

cision.websolution.ownership = !cision.websolution.settings.ownership ? {} : function ($) {
    var settings = $.extend({}, cision.websolution.settings.general),
        accessKey = cision.websolution.settings.ownership.accessKey,
        texts = cision.websolution.texts[settings.uiLanguage];

    var renderLargestShareholders = function (options) {
        if (options) {
            $.extend(settings, options);
        }
        if (!accessKey) {
            console.log("You must provide your ownership access key.");
            return;
        }

        var promiseOwnershipGroups = cision.websolution.common.getModuleData({
            'accessKey': accessKey,
            'module': "Ownership size groups",
            'path': 'Ownership/' + accessKey + '/ShareSizeGroups'
        });

        var promiseOwnership = cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Ownership Largest shareholders", 'path': 'Ownership/' + accessKey });

        return Promise.all([promiseOwnership, promiseOwnershipGroups]).then(function (values) {
            rawData = values[0];
            rawDataSizeGroups = values[1];

            rawData.TotalAmount = rawData.ShareHolders.length;
            rawData.DateFormatted = moment(rawData.Date).format(settings.dateFormatOptions.dateFormat);
            rawData.AmountInList = settings.LargestListShowCount;

            calculateSummaries(rawData, rawDataSizeGroups);

            renderLargestShareholdersChart(rawData);

            var tplElement = '#' + (settings.templateElement || 'tplLargestShareholdersListing');
            var tplTarget = '#' + (settings.outputTargetElement || 'target-largestshareholders');
            cision.websolution.common.modelToHtml(rawData, tplElement, tplTarget);

        }).catch(function (err) { console.log('Could not retrieve ownership data for largest shareholders. ' + err.message) });
    };

    /**
     *
     * @param {any} rawData
     * @param {any} rawDataSizeGroups
     */
    function calculateSummaries(rawData, rawDataSizeGroups) {
        if (!rawData) {
            return;
        }

        rawData.SubTotal_TotalShares = 0;
        rawData.SubTotal_TotalSharesA = 0;
        rawData.SubTotal_TotalSharesB = 0;
        rawData.SubTotal_TotalSharesC = 0;
        rawData.SubTotal_TotalSharesPR = 0;
        rawData.SubTotal_OwnershipPercent = 0;
        rawData.SubTotal_VotingRightsPercent = 0;
        rawData.SubTotal_MarketValueInSEK = 0;

        rawData.SubTotal_Nominee_TotalShares = 0;
        rawData.SubTotal_Nominee_TotalSharesA = 0;
        rawData.SubTotal_Nominee_TotalSharesB = 0;
        rawData.SubTotal_Nominee_TotalSharesC = 0;
        rawData.SubTotal_Nominee_TotalSharesPR = 0;
        rawData.SubTotal_Nominee_OwnershipPercent = 0;
        rawData.SubTotal_Nominee_VotingRightsPercent = 0;
        rawData.SubTotal_Nominee_MarketValueInSEK = 0;

        rawData.SubTotal_Others_TotalShares = 0;
        rawData.SubTotal_Others_TotalSharesA = 0;
        rawData.SubTotal_Others_TotalSharesB = 0;
        rawData.SubTotal_Others_TotalSharesC = 0;
        rawData.SubTotal_Others_TotalSharesPR = 0;
        rawData.SubTotal_Others_OwnershipPercent = 0;
        rawData.SubTotal_Others_VotingRightsPercent = 0;
        rawData.SubTotal_Others_MarketValueInSEK = 0;

        rawData.Total_TotalShares = 0;
        rawData.Total_TotalSharesA = 0;
        rawData.Total_TotalSharesB = 0;
        rawData.Total_TotalSharesC = 0;
        rawData.Total_TotalSharesPR = 0;
        rawData.Total_OwnershipPercent = 100;
        rawData.Total_VotingRightsPercent = 100;
        rawData.Total_MarketValueInSEK = 0;

        // Summaries
        $.each(rawData.ShareHolders, function (ix, objShareHolder) {

            // Nominee registered
            if (objShareHolder.RegistrationCode === 'F') {

                rawData.SubTotal_Nominee_TotalShares += objShareHolder.TotalShares;
                rawData.SubTotal_Nominee_TotalSharesA += objShareHolder.TotalSharesA;
                rawData.SubTotal_Nominee_TotalSharesB += objShareHolder.TotalSharesB;
                rawData.SubTotal_Nominee_TotalSharesC += objShareHolder.TotalSharesC;
                rawData.SubTotal_Nominee_TotalSharesPR += objShareHolder.TotalSharesPR;
                rawData.SubTotal_Nominee_OwnershipPercent += objShareHolder.OwnershipPercent;
                rawData.SubTotal_Nominee_VotingRightsPercent += objShareHolder.VotingRightsPercent;
                rawData.SubTotal_Nominee_MarketValueInSEK += objShareHolder.MarketValueInSEK;

            } else if (objShareHolder.Number <= settings.LargestListShowCount) {

                rawData.SubTotal_TotalShares += objShareHolder.TotalShares;
                rawData.SubTotal_TotalSharesA += objShareHolder.TotalSharesA;
                rawData.SubTotal_TotalSharesB += objShareHolder.TotalSharesB;
                rawData.SubTotal_TotalSharesC += objShareHolder.TotalSharesC;
                rawData.SubTotal_TotalSharesPR += objShareHolder.TotalSharesPR;
                rawData.SubTotal_OwnershipPercent += objShareHolder.OwnershipPercent;
                rawData.SubTotal_VotingRightsPercent += objShareHolder.VotingRightsPercent;
                rawData.SubTotal_MarketValueInSEK += objShareHolder.MarketValueInSEK;

            } else {

                rawData.SubTotal_Others_TotalShares += objShareHolder.TotalShares;
                rawData.SubTotal_Others_TotalSharesA += objShareHolder.TotalSharesA;
                rawData.SubTotal_Others_TotalSharesB += objShareHolder.TotalSharesB;
                rawData.SubTotal_Others_TotalSharesC += objShareHolder.TotalSharesC;
                rawData.SubTotal_Others_TotalSharesPR += objShareHolder.TotalSharesPR;
                rawData.SubTotal_Others_OwnershipPercent += objShareHolder.OwnershipPercent;
                rawData.SubTotal_Others_VotingRightsPercent += objShareHolder.VotingRightsPercent;
                rawData.SubTotal_Others_MarketValueInSEK += objShareHolder.MarketValueInSEK;
            }
        });

        rawDataSizeGroups = rawDataSizeGroups || { Groups: [] };
        rawDataSizeGroups.Groups = rawDataSizeGroups.Groups || [];

        // Groups
        $.each(rawDataSizeGroups.Groups, function (ix, objSizeGroup) {

            rawData.Total_TotalShares += objSizeGroup.TotalShares;
            rawData.Total_TotalSharesA += objSizeGroup.TotalSharesA;
            rawData.Total_TotalSharesB += objSizeGroup.TotalSharesB;
            rawData.Total_TotalSharesC += objSizeGroup.TotalSharesC;
            rawData.Total_TotalSharesPR += objSizeGroup.TotalSharesPR;

            rawData.Total_MarketValueInSEK += objSizeGroup.MarketValueInSEK;
        });
    }

    function renderOwnershipTab(name) {
        //prevent tab rendering if it is already rendered
        if (settings.ownershipTabLoaded[name] != null) {
            return;
        }

        switch (name) {
            case "#target-largest": if (true) {
                renderLargestShareholders();
            }
            else { }
                break;
            case "#target-sharesizegroups": if (true) {
                renderShareSizeGroups();
            }
            else { }
                break;
            case "#target-area": if (true) {
                renderShareHolderAreas();
            }
            else { }
                break;
            case "#target-grouped": if (true) {
                renderLargestGroupedShareholders();
            }
            else { }
                break;
            default:
        }

        //save value that tab has been rendered
        settings.ownershipTabLoaded[name] = true;
    }

    function getChartOptions(rawData, dataArray) {
        return { // make into setting
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            credits: {
                text: 'Source Cision/Euroclear'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: rawData.Name,
                data: dataArray
            }]
        };
    }

    var renderLargestShareholdersChart = function (rawData) {
        // Build Data Series
        var dataArray = [],
            othersPercent = 100;
        $.each(rawData.ShareHolders, function (ix, objShareHolder) {
            if (objShareHolder.Number <= settings.LargestPieShowCount) {
                othersPercent -= objShareHolder.OwnershipPercent;

                dataArray.push({
                    name: objShareHolder.Name,
                    y: objShareHolder.OwnershipPercent
                });
            }
        });

        if (othersPercent > 0) {
            dataArray.push({
                name: 'Others',
                y: othersPercent,
                sliced: true
            });
        }
        var chartOptions = getChartOptions(rawData, dataArray);
        $('#container-largest-shareholders-chart').highcharts(chartOptions);
    };

    var renderNewShareholders = function (options) {
        if (options) {
            $.extend(settings, options);
        }
        if (!accessKey) {
            console.log("You must provide your ownership access key.");
            return;
        }

        var promiseOwnership = cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Ownership new shareholders", 'path': 'Ownership/' + accessKey + '/NewShareHolders' });

        return Promise.resolve(promiseOwnership).then(function (rawData) {
            rawData.DateFormatted = moment(rawData.Date).format('ll');

            var tplElement = '#' + (settings.templateElement || 'tplNewShareholdersListing');
            var tplTarget = '#' + (settings.outputTargetElement || 'target-newshareholders');
            cision.websolution.common.modelToHtml(rawData, tplElement, tplTarget);

        }).catch(function (err) { console.log('Could not retrieve ownership data for new shareholders. ' + err.message) });
    };

    var renderShareSizeGroups = function (options) {
        if (options) {
            $.extend(settings, options);
        }
        if (!accessKey) {
            console.log("You must provide your ownership access key.");
            return;
        }

        var promiseOwnership = cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Ownership size groups", 'path': 'Ownership/' + accessKey + '/ShareSizeGroups'});

        return Promise.resolve(promiseOwnership).then(function (rawData) {
            rawData.DateFormatted = moment(rawData.Date).format('ll');

            var tplElement = '#' + (settings.templateElement || 'tplShareSizeGroupsListing');
            var tplTarget = '#' + (settings.outputTargetElement || 'target-sharesizegroups');
            cision.websolution.common.modelToHtml(rawData, tplElement, tplTarget);

        }).catch(function (err) { console.log('Could not retrieve ownership data for share size groups. ' + err.message) });
    };

    var renderShareHolderAreas = function (options) {
        if (options) {
            $.extend(settings, options);
        }
        if (!accessKey) {
            console.log("You must provide your ownership access key.");
            return;
        }

        var promiseOwnership = cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Ownership shareholder areas", 'path': 'Ownership/' + accessKey + '/ShareHolderAreas' });

        return Promise.resolve(promiseOwnership).then(function (rawData) {
            // Trying to reorder Areas so that they are translatable
            // The available areas are: Sweden, USA, Nordic, Europe, World
            var reorderedAreas = [];
            settings.ownershipAreasNames = settings.ownershipAreasNames || {};
            var textsAreaNames = texts.TextOwnershipAreaNames || {};

            var objAreaSweden = rawData.Areas.filter(function (el) {
                return el.AreaName == 'SVERIGEBOENDE';
            });
            if (objAreaSweden) {
                objAreaSweden[0].AreaName = textsAreaNames.Sweden || objAreaSweden.AreaName;
                reorderedAreas.push(objAreaSweden[0]);
            }

            var objAreaUsa = rawData.Areas.filter(function (el) {
                return el.AreaName == 'USA';
            });
            if (objAreaUsa) {
                objAreaUsa[0].AreaName = textsAreaNames.Usa || objAreaUsa.AreaName;
                reorderedAreas.push(objAreaUsa[0]);
            }

            var objAreaNordic = rawData.Areas.filter(function (el) {
                return el.AreaName == 'ÖVRIGA NORDEN';
            });
            if (objAreaNordic) {
                objAreaNordic[0].AreaName = textsAreaNames.Nordic || objAreaNordic.AreaName;
                reorderedAreas.push(objAreaNordic[0]);
            }

            var objAreaEurope = rawData.Areas.filter(function (el) {
                return el.AreaName == 'ÖVRIGA EUROPA (EXKL SVERIGE OCH NORDEN)';
            });
            if (objAreaEurope) {
                objAreaEurope[0].AreaName = textsAreaNames.Europe || 'ÖVRIGA EUROPA';
                reorderedAreas.push(objAreaEurope[0]);
            }

            var objAreaWorld = rawData.Areas.filter(function (el) {
                return el.AreaName == 'ÖVRIGA VÄRLDEN';
            });
            if (objAreaWorld) {
                objAreaWorld[0].AreaName = textsAreaNames.World || objAreaWorld.AreaName;
                reorderedAreas.push(objAreaWorld[0]);
            }

            var objAreaTotal = rawData.Areas.filter(function (el) {
                return el.OwnershipPercent == 100;
            });
            if (objAreaTotal) {
                objAreaTotal[0].AreaName = textsAreaNames.Total || objAreaTotal.AreaName;
            }

            rawData.Areas = reorderedAreas;
            rawData.Total = objAreaTotal[0];

            rawData.DateFormatted = moment(rawData.Date).format('ll');

            renderShareHolderAreasChart(rawData);

            var tplElement = '#' + (settings.templateElement || 'tplShareShareHolderAreasListing');
            var tplTarget = '#' + (settings.outputTargetElement || 'target-shareholderareas');
            cision.websolution.common.modelToHtml(rawData, tplElement, tplTarget);

        }).catch(function (err) { console.log('Could not retrieve ownership data for shareholder areas. ' + err.message) });
     
    };

    var renderShareHolderAreasChart = function (rawData) {
        // Build Data Series
        var dataArray = [];

        $.each(rawData.Areas, function (ix, objArea) {
            if (objArea.OwnershipPercent < 100) {
                dataArray.push({
                    name: objArea.AreaName,
                    y: objArea.OwnershipPercent
                });
            }
        });
        var chartOptions = getChartOptions(rawData, dataArray);
        $('#target-shareholderareas-chart').highcharts(chartOptions);
    };

    var renderLargestGroupedShareholders = function (options) {
        if (options) {
            $.extend(settings, options);
        }
        if (!accessKey) {
            console.log("You must provide your ownership access key.");
            return;
        }

        var promiseOwnershipGroups = cision.websolution.common.getModuleData({
            'accessKey': accessKey,
            'module': "Ownership size groups",
            'path': 'Ownership/' + accessKey + '/ShareSizeGroups'
        });

        var promiseOwnership = cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Ownership largest grouped shareholders", 'path': 'Ownership/' + accessKey + '/LargestGroupedShareHolders' });

        return Promise.all([promiseOwnership, promiseOwnershipGroups]).then(function (values) {
            rawData = values[0];
            rawDataGroups = values[1];

            rawData.TotalAmount = rawData.ShareHolders.length;
            rawData.DateFormatted = moment(rawData.Date).format('ll');

            rawData.AmountInList = settings.LargestListShowCount;
            renderLargestGroupedShareholdersChart(rawData);

            calculateSummaries(rawData, rawDataGroups);

            var tplElement = '#' + (settings.templateElement || 'tplLargestShareholdersListing');
            var tplTarget = '#' + (settings.outputTargetElement || 'target-largestgroupedshareholders');
            cision.websolution.common.modelToHtml(rawData, tplElement, tplTarget);

        }).catch(function (err) { console.log('Could not retrieve ownership data for largest grouped shareholders. ' + err.message) });
    };

    var renderLargestGroupedShareholdersChart = function (rawData) {
        // Build Data Series
        var dataArray = [],
            othersPercent = 100;
        //        options.LargestPieShowCount = 10;
        $.each(rawData.ShareHolders, function (ix, objShareHolder) {
            if (objShareHolder.Number <= settings.LargestPieShowCount) {
                othersPercent -= objShareHolder.OwnershipPercent;

                dataArray.push({
                    name: objShareHolder.Name,
                    y: objShareHolder.OwnershipPercent
                });
            }
        });

        if (othersPercent > 0) {
            dataArray.push({
                name: 'Others',
                y: othersPercent,
                sliced: true
            });
        }

        var chartOptions = getChartOptions(rawData, dataArray);
        $('#container-largest-grouped-shareholders-chart').highcharts(chartOptions);
    };

    return {
        renderLargestShareholders: renderLargestShareholders,
        renderNewShareholders: renderNewShareholders,
        renderShareSizeGroups: renderShareSizeGroups,
        renderShareHolderAreas: renderShareHolderAreas,
        renderShareHolderAreasChart: renderShareHolderAreasChart,
        renderLargestGroupedShareholders: renderLargestGroupedShareholders,
        renderOwnershipTab: renderOwnershipTab
    };

}(jQuery);