(function(callback) {

    callback(jQuery, window, document);

    }(function($, window, document) {

        /**
         * @description On Document ready
         */
        $(function() {
            new Clock;
        });

        class Clock {
            constructor() {
                setInterval(() => this.updateTime(), 1000);
            }

            getHoursPosition() {
                return Math.floor(0.5 * (60 * this.hours + this.minutes));
            }

            getMinutesPosition() {
                return Math.floor(6 * this.minutes);
            }

            getSecondsPosition() {
                return Math.floor(6 * this.seconds);
            }

            updateTime() {
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
