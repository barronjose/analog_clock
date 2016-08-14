(function(callback) {

    callback(jQuery, window, document);

    }(function($, window, document) {

        /**
         * @description On Document start
         */
        $(function() {
            getTime();
        });
        getTime();

        function getTime() {
            let date = new Date();
        }


    })
);
