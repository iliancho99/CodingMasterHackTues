app.controller('testController', ['$scope', 'testService','notifyService', '$routeParams', 'storageService',
    function ($scope, testService, notifyService, $routeParams, storageService) {
        var testId = $routeParams.testId;

        testService.getTest(testId)
            .success(function (data) {
                $scope.test = data;
                testService.getQuestions(testId)
                    .success(function (data) {
                        questions = data.results;
                        $scope.test.questions = questions;
                        var countdown = 300;
                        var min = 5;
                        var sec = 0;

                        $("#wrapper").append('<p>');
                        var testName = "poll" + $scope.test.title;

                        var clock = setInterval(function(){
                            $('p').text("Time left:" + min + ":" + (sec < 10 ? '0' + sec : sec));
                            if(countdown == 0){
                                checkAnswers();
                            }

                            countdown--;
                            min = sec == 0 ? min - 1 : min;
                            sec = sec == 0 ? 59 : sec - 1;
                        }, 1000);

                        var orderList = $('<ol>');
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

                        var btn = $('<button>');
                        btn.text('Submit');
                        btn.on('click', function(){
                            $('span').css('background', 'white');
                            checkAnswers();
                        });

                        $('#wrapper').append(orderList);
                        $('#wrapper').append(btn);

                        if(!localStorage[testName]){
                            var poll = {};
                            for (var i = 0; i < questions.length; i++) {
                                poll[i] = " ";
                            }

                            storageService.setObjectToLocalStorage(testName, poll);
                        }else{
                            loadAnswers();
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