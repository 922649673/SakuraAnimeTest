<?php

    class Home extends Controller {
        // contains the new Model() for the specific model

        public function __construct() {
            // Load correct Model, call Controller->model(), will results in new *Post()*

        }

        // Index Page
        public function index() {
            // Data to send to index
            $data = [
                'title' => 'Home',
                'scroll-color' => false,
                'description' => 'Home page'
            ];
            
            // Load index to client
            $this->view('pages/home', $data);
        }

    }
