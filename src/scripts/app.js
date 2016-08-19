// Immediately Invoked Function Expression
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
                                      (callback => setInterval(callback, 1000));

        /**
           * @description Rotate element to an especific value
           * @function rotateElement
           * @param {String} element
           * @param {Integer} value
         */
        function rotateElement(element, value) {
            let trans = `rotate(${value}deg)`;
            $(`.${element}`).css({ 'transform': trans, '-moz-transform': trans, '-o-transform': trans, '-webkit-transform': trans });
        }

        /**
           * @description Replace value for an specific element
           * @function replaceValue
           * @param {String} element
           * @param {String} value
         */
        function replaceValue(element, value) {
            $(`.${element}`).find('span').html(value);
        }

        /**
           * @description Prepend a Zero to integer if less than 10
           * @function prependZero
           * @param {Integer} value
           * @return {String} with a prepend zero
         */
        function prependZero(value) {
            return value < 10 ? '0' + value: value;
        }

        /**
           * @description Clock Class definition
           * @class Clock
         */
        class Clock {
            constructor() {
                this.date;
                this.seconds;
                this.minutes;
                this.hours;
                this.meridian;
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
                this.meridian = this.date.getHours() >= 12 ? 'PM': 'AM';

                rotateElement('hours', this.getHoursPosition());
                rotateElement('minutes', this.getMinutesPosition());
                rotateElement('seconds', this.getSecondsPosition());

                replaceValue('dig-hours', prependZero(this.hours));
                replaceValue('dig-minutes', prependZero(this.minutes));
                replaceValue('dig-seconds', prependZero(this.seconds));
                replaceValue('dig-meridiem', this.meridian);
            }
        }

    })
);
