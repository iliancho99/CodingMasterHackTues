app.controller('testController', ['$scope', 'testService','notifyService', '$routeParams', 'storageService',
    function ($scope, testService, notifyService, $routeParams, storageService) {
        var testId = $routeParams.testId;

        testService.getTest(testId)
            .success(function (data) {
                $scope.test = data;
                var testName = "poll" + data.objectId;
                var min;
                var sec;
                var countdown;
                localStorage['currentTest'] = data.objectId;
                testService.getQuestions(testId)
                    .success(function (data) {
                        questions = data.results;
                        $scope.test.questions = questions;

                        $("#wrapperTest").append('<p id="'+ testName +'_timer">');


                        var clock = setInterval(function(){
                            if(localStorage['currentTest'] == $routeParams.testId) {

                                if (countdown <= 0) {
                                    checkAnswers();
                                    $('#' + testName + "_timer").text("Full Time");
                                }
                                localStorage[testName + "CountDown"] = "" + countdown;
                                countdown--;
                                var min = Math.floor(countdown / 60);
                                var sec = countdown % 60;
                                min = sec == 0 ? min - 1 : min;
                                sec = sec == 0 ? 59 : sec - 1;
                                $('#' + testName + "_timer").text("Time left:" + min + ":" + (sec < 10 ? '0' + sec : sec));
                                console.log(countdown);
                            }

                        }, 1000);

                        var orderList = $('<ol>');
                        document.getElementById("wrapperTest").classList.add('panel');
                        orderList.append($('<h1>').text("Quetions:"));
                        orderList.on("click", function(e){
                            var question = $(e.target).attr("name"),
                                answer = $(e.target).attr("value");
                            saveUserAnswers(question, answer);
                        });

                        for (var i = 0; i < questions.length; i++) {
                            var list = $('<li>');
                            var question = questions[i];
                            list.append($('<h2>').text(question.question));
                            for (var answer in questions[i].answers) {
                                var input = $("<input>");
                                input.attr("type", "radio")
                                    .attr("name", i)
                                    .attr('value', answer);
                                list.append(input);
                                list.append($('<span>').text(questions[i].answers[answer]));
                                list.append("<br />");
                            }
                            orderList.append(list);
                        }

                        var btn = $('<button class="btn btn-primary">');
                        btn.text('Submit');
                        btn.on('click', function(){
                            $('span').css('background', 'white');
                            checkAnswers();
                        });

                        $('#wrapperTest').append(orderList);
                        $('#wrapperTest').append(btn);

                        if(!localStorage[testName]){
                            var poll = {};
                            for (var i = 0; i < questions.length; i++) {
                                poll[i] = " ";
                            }
                            countdown = 300;
                            min = 5;
                            sec = 0;
                            localStorage[testName + "CountDown"] = countdown;
                            console.log("Initialize test " + testName);

                            storageService.setObjectToLocalStorage(testName, poll);
                        }else{
                            loadAnswers();
                            countdown = +localStorage[testName + "CountDown"];
                            min = Math.floor(countdown / 60);
                            sec = countdown % 60;
                            console.log(countdown, testName);
                        }

                        function saveUserAnswers(question, answer) {
                            var answers =  storageService.getObjectToLocalStorage(testName);
                            answers[question] = answer;
                            storageService.setObjectToLocalStorage(testName, answers);
                        }

                        function loadAnswers() {
                            var answers =  storageService.getObjectToLocalStorage(testName);
                            for(var q in answers) {
                                var name = q;
                                var value = answers[q];
                                if(parseInt(value) || parseInt(value) == 0){
                                    $("[name='" + name + "'][value='" + value + "']").attr('checked', 'checked');
                                }
                            }
                        }

                        function checkAnswers(){
                            clearInterval(clock);
                            var answers =  storageService.getObjectToLocalStorage(testName);
                            delete localStorage[testName + "CountDown"];
                            delete localStorage[testName];
                            for (var q in answers) {
                                var name = q;
                                var value = answers[q];
                                if(parseInt(value) || parseInt(value) == 0){
                                    if(value == questions[q]['rightAnswer']){
                                        $("[name='" + name + "'][value='" + value + "']").next().css('background', 'green');
                                    }
                                    else{
                                        $("[name='" + name + "'][value='" + value + "']").next().css('background', 'red');
                                        $("[name='" + name + "'][value='" + questions[q]['rightAnswer'] + "']").next().css('background', 'green');
                                    }

                                }
                            }
                        }
                    })
                    .error(function () {
                        notifyService.showError("Error!!!");
                    });
            })
            .error(function () {
                notifyService.showError("Error !!!");
            });
    }]);