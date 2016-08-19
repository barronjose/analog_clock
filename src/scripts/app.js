(function(callback) {

    callback(jQuery, window, document);

    }(function($, window, document) {

        /**
         * @description On Document ready
         */
        $(function() {
            new Clock;
        });

        const requestAnimationFrame = window.requestAnimationFrame ||
                                    window.mozRequestAnimationFrame ||
                                    window.webkitRequestAnimationFrame ||
                                    window.msRequestAnimationFrame ||
                                    function(callback) { return setTimeout(callback, 1000/60) };

        class Clock {
            constructor() {
                this.updateTime();
            }

            getHoursPosition() {
                return Math.floor(0.5 * (60 * this.hours + this.minutes));
            }

            getMinutesPosition() {
                return Math.floor(6 * this.minutes);
            }

            getSecondsPosition() {
                return this.seconds === 0 ? 360: Math.floor(6 * this.seconds);
            }

            updateTime() {
                requestAnimationFrame(() => this.updateTime());

                this.date = new Date;
                this.seconds = this.date.getSeconds();
                this.minutes = this.date.getMinutes();
                this.hours = ((this.date.getHours() + 11) % 12 + 1);

                rotateElement('hours', this.getHoursPosition());
                rotateElement('minutes', this.getMinutesPosition());
                rotateElement('seconds', this.getSecondsPosition());
            }
        }

        function rotateElement(element, value) {
            let trans = `rotate(${value}deg)`;
            $(`.${element}`).css({ 'transform': trans, '-moz-transform': trans, '-o-transform': trans, '-webkit-transform': trans });
        }

    })
);
