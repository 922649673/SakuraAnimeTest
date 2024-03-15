<?php

    class ListPg extends Controller {
        // contains the new Model() for the specific model

        public function __construct() {
            // Load correct Model, call Controller->model(), will results in new *Post()*

        }

        // List Page
        public function index() {
            // Data to send to index
            $data = [
                'title' => 'List',
                'scroll-color' => false,
                'description' => 'List page'
            ];
            
            // Load index to client
            $this->view('pages/listpg', $data);
        }

    }
