<?php

    class NotFound extends Controller {
        // contains the new Model() for the specific model

        public function __construct() {
            // Load correct Model, call Controller->model(), will results in new *Post()*

        }

        // Index Page
        public function index() {
            // Data to send to index
            $data = [
                'title' => 'NotFound',
                'theme' => 'white',
                'scroll-color' => false,
                'description' => 'NotFound page'
            ];
            
            // Load index to client
            $this->view('pages/NotFound', $data);
        }

    }