<?php

    class searchresults extends Controller {
        // contains the new Model() for the specific model

        public function __construct() {
            // Load correct Model, call Controller->model(), will results in new *Post()*

        }

        // Genre Page
        public function index($searchresult = null) {

            // Data to send to index
            $data = [
                'title' => 'Genres',
                'scroll-color' => false,
                'description' => 'search page',
                'genreTitle' => "Search Results: " . $searchresult
            ];

            $this->view('pages/display', $data);

        }

    }