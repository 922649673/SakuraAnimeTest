
<?php

    /*
     * App Core Class
     * Creates URL and loads core controller
     * URL FORMAT - /controller/method/params
    */
    
    class Core {
        protected $currentController = "Home";
        private $notfound = "NotFound";
        protected $currentMethod = "index";
        protected $params = [];

        public function __construct(){
            // $this->getUrl();
            $url = $this->getUrl();
            // Look in controllers for first value, capital first url letter since controllers have upper case
            if(isset($url[0]) && file_exists('../app/controllers/' . ucwords($url[0]). '.php')){
                // if exists, set as controller
                $this->currentController = ucwords($url[0]);
                unset($url[0]);

            } else if(!empty($url) || !file_exists('../app/controllers/' . $this->currentController . '.php')) {
                // if not, set to not found
                $this->currentController = $this->notfound;
            }


            // Require the controller
            require_once "../app/controllers/".$this->currentController.".php";
            
            // Instantiate controller class
            $this->currentController = new $this->currentController;

            // Check for second part of url
            if(isset($url[1])) {
                // Check to see if method exists in controller
                if(method_exists($this->currentController, $url[1])) {
                    $this->currentMethod = $url[1];
                    // unset 1 index
                    unset($url[1]);
                }
            }

            // Get params
            $this->params = $url ? array_values($url) : [];

            // Call a callback with array of params
            call_user_func_array([$this->currentController, $this->currentMethod], $this->params);
            
        }

        public function getUrl() {
            if(isset($_GET["url"])) {
                // remove last '/' if exists
                $url = rtrim($_GET["url"], "/");

                // filter unwanted url characters
                $url = filter_var($url, FILTER_SANITIZE_URL);
                
                // get url results 'path/params/etc..'
                $url = explode("/", $url);

                return $url;
            }
        }
    }