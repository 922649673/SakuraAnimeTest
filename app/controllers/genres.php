<?php

    class Genres extends Controller {
        // contains the new Model() for the specific model

        public function __construct() {
            // Load correct Model, call Controller->model(), will results in new *Post()*

        }

        // Genre Page
        public function index($genre = null) {

            // Data to send to index
            $data = [
                'title' => 'Genres',
                'scroll-color' => false,
                'description' => 'Genres page',
                'genreTitle' => str_replace("-", " ", ucfirst($genre))
            ];

            if ($genre != null) {
                $this->view('pages/display', $data);
            } else {
                $this->view('pages/genres', $data);
            }

        }

    }
