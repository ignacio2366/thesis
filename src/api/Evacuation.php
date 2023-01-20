<?php
session_start();

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Panel</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <link rel="stylesheet" href="Evacuation.css">
</head>

<body>
    <div class="container-fluid">
        <div class="navbar-content">
            <img src="./../img/logo.svg" class="navbar-brand float-start" alt="">
            <h1 class="font-weight-bold">BDRRMO</h1>
        </div>
        <nav>

            </ul>
        </nav>
        <div class="container">

            <main>

        </div>
    </div>
    <div id="map" style="width: 100%; height: 400px;"></div>
    <h3>Evacuation Center List</h3>
    <div class="list-group" id="Account">
        <script src="https://maps.google.com/maps/api/js?key=AIzaSyBm6NbodPhmKrEHmDUYPH_MbPxHkEy1y_8&callback=initMap" style="cursor: pointer;"></script>

        <script>
            $(document).ready(function() {
                $('#map').ready(function(event) {
                    /*                     const evac = $.ajax({
                                            type: 'GET',
                                            url: "https://newsapi.org/v2/top-headlines?country=ph&apiKey=951143da4b524fd18ed15d8a78acda16",
                                            dataType: 'json',
                                            success: function(data) {
                                                console.log(data)

                                            },
                                            error: function(error) {
                                                console.log(error)
                                            }
                                        }); */
                    /*                     var apikey = '474ab5e5f0ef3f7c9f4265eaf57eaf72';
                                        var category = 'nation';
                                        var text = 'https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=business&x-api-key=brU8pGFT7PIaEApP38iC5MyW8Gdh3K20RNlMYXRbJYY';

                                        const evac = $.ajax({
                                            type: 'GET',
                                            url: text,
                                            dataType: 'json',
                                            success: function(data) {
                                                console.log(data)

                                            },
                                            error: function(error) {
                                                console.log(error)
                                            }
                                        }); */
                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://app.plaraphy.com/api/sentiment",
                        "method": "POST",
                        "headers": {
                            "accept": "application/json",
                            "content-type": "application/x-www-form-urlencoded",
                            "authorization": "Bearer 4154|kY9ZHnlVo6U494TPINYszI60x9u9SeEqnYshYS39",
                            "cache-control": "no-cache"
                        },
                        "data": {
                            //url must be urlencoded 
                            "text": `Salceda issued the remark after Senator Imee Marcos raised a concern that the proposed Philippine sovereign wealth fund might suffer the same fate as Malaysia's 1Malaysia Development Berhad (1MDB) which was hounded by graft issues.

                            “As Chair of the House TWG (technical working group) on the bill, I welcome continued discussion on the matter. I am sure Senator Marcos will also be very active in discussions once the Senate begins hearings on the bill,” Salceda said.

                            The Albay representative said that House Bill 6398 would still go through deliberations in both the House and the Senate, adding that a study group had been constituted on the matter.

                            “We can discuss the mix of assets that the fund will invest in, but some allocation for foreign securities is necessary. It diversifies the portfolio and allows the fund to take positions in potentially higher-return investments,” Salceda said.`,
                        }
                    }

                    $.ajax(settings).done(function(response) {
                        console.log(response);
                    });

                    var settings = {

                        "url": "https://api.newscatcherapi.com/v2/latest_headlines?countries=ph&topic=news",
                        "method": "GET",
                        "headers": {
                            'x-api-key': 'brU8pGFT7PIaEApP38iC5MyW8Gdh3K20RNlMYXRbJYY',

                        },

                    }

                    $.ajax(settings).done(function(response) {
                        console.log(response);
                    });

                })
            }, )
        </script>
    </div>


    </main>
    </div>


    </div>



    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>


    <script>
    </script>
</body>

</html>