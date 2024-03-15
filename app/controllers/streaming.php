<?php

    class streaming extends Controller {
        // contains the new Model() for the specific model

        public function __construct() {
            // Load correct Model, call Controller->model(), will results in new *Post()*

        }

        // Streaming Page
        public function index($streaming = null) {

            // Data to send to index
            $data = [
                'title' => 'Streaming',
                'scroll-color' => false,
                'description' => 'streaming page',
                'StreamingTitle' => "Streaming Results: " . $streaming,
            ];

            $this->view('pages/streaming', $data);

        }

    }
