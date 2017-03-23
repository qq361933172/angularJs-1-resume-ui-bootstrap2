require("../node_modules/angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js")
module.exports.translate = function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: '../i18n/',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en-us');
}