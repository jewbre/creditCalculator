(function ($) {


    locationsAutocomplete();
    function locationsAutocomplete() {
        var searchField = $('#locationsSearch');

        if ($(searchField).length) {
            $(searchField).autocomplete({
                minLength: 0,
                source: allLocations,
                focus: function (event, ui) {
                    $("#locationsSearch").val(ui.item.label);
                    return false;
                },
                select: function (event, ui) {
                    $("#locationsSearch").val(ui.item.label);

                    return false;
                }
            })
                .autocomplete("instance")._renderItem = function (ul, item) {
                return $("<li>")
                    .append("<span>" + item.label + "</span>" + item.desc)
                    .appendTo(ul);
            };
            jQuery.ui.autocomplete.prototype._resizeMenu = function () {
                var ul = this.menu.element;
                ul.outerWidth(this.element.outerWidth() + 30);
            }
        }
    }


    var geoInfo = $(".bottom-info--geo");
    getLocation();
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            // x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }


    var globalLat = 44.818619;
    var globalLng = 20.464068;
    setLocation();

    function showPosition(position) {
        var currentlLat = position.coords.latitude;
        var currentLng = position.coords.longitude;

        geoInfo.removeClass(' bottom-info--display-none');
        $('[data-js="map-check"]').click(function () {
            globalLat = currentlLat;
            globalLng = currentLng;
            geoInfo.addClass(' bottom-info--display-none');
            setLocation();
        });

        $('[data-js="map-un-check"]').click(function () {

            geoInfo.addClass(' bottom-info--display-none');
        });
        $('[data-js="map-close"]').click(function () {

            geoInfo.addClass(' bottom-info--display-none');
        });
    }



    function setLocation() {

        var styles = [
            {
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "gamma": 1
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.place_of_worship",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.place_of_worship",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "water",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "saturation": 50
                    },
                    {
                        "gamma": 0
                    },
                    {
                        "hue": "#50a5d1"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#333333"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "weight": 0.5
                    },
                    {
                        "color": "#333333"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "gamma": 1
                    },
                    {
                        "saturation": 50
                    }
                ]
            }
        ];

        gmarkers = [];
        var styledMap = new google.maps.StyledMapType(styles,
            { name: "Styled Map" });

        //zakucana je putanja pa je ucitavam u php
        //var image = './static/img/map-marker.png';


        var map = new google.maps.Map(document.getElementById('mapCanvas'), {
            zoom: 14,
            scrollwheel: false,
            draggable: true,
            streetViewControl: false,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_BOTTOM
            },
            center: new google.maps.LatLng(globalLat, globalLng),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var infowindow = new google.maps.InfoWindow();

        var infoBubble = new InfoBubble({
            maxWidth: 273,
            borderRadius: 0,
            padding: 0,
            borderWidth: 0,
            // closeSrc: './static/img/close.png',
            minHeight: 220,
            shadowStyle: 0
        });


        function createMarker(latlng, html) {
            var marker = new google.maps.Marker({
                position: latlng,
                map: map,
                icon: image
            });

            google.maps.event.addListener(marker, 'click', function () {
                infoBubble.setContent(html);
                infoBubble.open(map, marker);
            });
            return marker;
        }


        for (var i = 0; i < locations.length; i++) {
            gmarkers[locations[i].department] =
                createMarker(new google.maps.LatLng(locations[i].lat, locations[i].lng),

                    "<div class='marker-info'>"
                    +
                    "<span class='marker-info__title'>" + locations[i].department + "</span>"
                    +
                    "<span class='marker-info__address'>" + locations[i].address + "</span>"
                    +
                    "<span class='marker-info__title marker-info__title--small '>" + "Radno vreme" + "</span>"
                    +
                    "<div class='marker-info__column'>"
                    +
                    "<div class='marker-info__column-content'>"
                    +
                    "<span class='marker-info__day'>" + locations[i].work[0].day_srp + "</span>"
                    +
                    "<span class='marker-info__time'>" + locations[i].work[0].hour + "</span>"
                    +
                    "</div>"
                    +
                    "<div class='marker-info__column-content'>"
                    +
                    "<span class='marker-info__day'>" + locations[i].work[1].day_srp + "</span>"
                    +
                    "<span class='marker-info__time'>" + locations[i].work[1].hour + "</span>"
                    +
                    "</div>"
                    +
                    "<div class='marker-info__column-content'>"
                    +
                    "<span class='marker-info__day'>" + locations[i].work[2].day_srp + "</span>"
                    +
                    "<span class='marker-info__time'>" + locations[i].work[2].hour + "</span>"
                    +
                    "</div>"
                    +
                    "<div class='marker-info__column-content'>"
                    +
                    "<span class='marker-info__day'>" + locations[i].work[0].day_srp + "</span>"
                    +
                    "<span class='marker-info__time'>" + locations[i].work[0].hour + "</span>"
                    +
                    "</div>"
                    +
                    "<div class='marker-info__column-content'>"
                    +
                    "<span class='marker-info__day'>" + locations[i].work[0].day_srp + "</span>"
                    +
                    "<span class='marker-info__time'>" + locations[i].work[0].hour + "</span>"
                    +
                    "</div>"
                    +
                    "<div class='marker-info__column-content'>"
                    +
                    "<span class='marker-info__day'>" + locations[i].work[0].day_srp + "</span>"
                    +
                    "<span class='marker-info__time'>" + locations[i].work[0].hour + "</span>"
                    +
                    "</div>"
                    +
                    "</div>"
                    +
                    "<div class='marker-info__status'>" + "Otvoreno" + "</div>"

                    +
                    "</div>"
                );
        }

        //Associate the styled map with the MapTypeId and set it to display.
        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');
    }



})(jQuery);