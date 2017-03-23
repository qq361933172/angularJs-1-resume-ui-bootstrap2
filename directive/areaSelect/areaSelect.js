module.exports.areaSelect = function ($http, resumeConstant, resumeProvider, $cookies) {
    return {
        scope: {
            placement: "=",
            placement2: "=",
            placement3: "="
        },
        restrict: "E",
        templateUrl: "./directive/areaSelect/area-select.html",
        controller: function ($scope) {
            var gaodeApi = resumeConstant.gaodeApi;

            function getdata(province) {
                if (province == null) {
                    return $http.get(gaodeApi.url + "?key=" + gaodeApi.key);
                }
                return $http.get(gaodeApi.url + "?key=" + gaodeApi.key + "&keywords=" + province + "&subdistrict=2&subdistrict=1");
            }

            var cookieResume = $cookies.getObject("resume");
            var residenceArr = !!cookieResume.userInfo.residence ? cookieResume.userInfo.residence.split(",") : [];
            var defaultProviceSelect = residenceArr.length > 0 ? residenceArr[0] : "广东省";
            $scope.placement = {
                options: [],
                selected: defaultProviceSelect
            };
            //console.log('residenceArr.length : ', residenceArr.length);
            $scope.placement2 = {
                options: [],
                selected: residenceArr.length > 0 ? residenceArr[1] : ""
            };
            //console.log("residenceArr[1] : ", residenceArr[1]);
            $scope.placement3 = {
                options: [],
                selected: residenceArr.length > 0 ? residenceArr[2] : ""
            };
            //console.log("residenceArr[2] : ", residenceArr[2]);
            function getList(res) {
                return res.data.districts[0].districts.map(function (item, i) {
                    return item.name;
                });
            }

            function selectCity(value) {
                getdata(value).then(function (res) {
                    var resumeCookies = $cookies.getObject("resume");
                    var residenceArr = !!cookieResume.userInfo.residence ? cookieResume.userInfo.residence.split(",") : [];
                    $scope.placement2.options = getList(res);
                    $scope.placement2.selected = residenceArr.length > 0 ? residenceArr[1] : getList(res)[0];
                    selectArea(value, $scope.placement2.selected);
                });
            }

            selectCity(defaultProviceSelect);
            function selectArea(value1, value2) {
                getdata(value1).then(function (res) {
                    $scope.placement2.options = getList(res);
                    res.data.districts[0].districts.forEach(function (item, i) {
                        if (item.name == value2) {
                            var arr = item.districts.map(function (item, i) {
                                return item.name;
                            })
                            $scope.placement3.options = arr;
                            var resumeCookies = $cookies.getObject("resume");
                            var residenceArr = !!cookieResume.userInfo.residence ? cookieResume.userInfo.residence.split(",") : [];
                            $scope.placement3.selected = residenceArr.length > 0 ? residenceArr[2] : arr[0];
                        }
                    });
                });
            }

            getdata().then(function (res) {
                $scope.placement.options = getList(res);
            });
            $scope.proviceChange = function (value) {
                selectCity(value);
            }
            $scope.cityChange = function (value1, value2) {
                selectArea(value1, value2);
            }
            $scope.areaChange = function () {
            }
        }
    }
}