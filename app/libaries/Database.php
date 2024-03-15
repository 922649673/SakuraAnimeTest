<?php

    /*
     * PDO Database Class
     * Connect to database
     * Create prepared statements
     * Bind Values 
     * Return rows and results
    */

    class Database {
        private $host = DB_HOST;
        private $dbUsername = DB_USERNAME;
        private $dbPassword = DB_PASSWORD;
        private $dbName = DB_NAME;

        private $dbHandler;
        private $stmt;
        private $error;

        public function __construct() {
            // Set DSN
            $dsn = 'mysql:host='.$this->host.';dbname='.$this->dbName;
            $options = array(
                // increase perfomence by checking if there is already a connection to db
                PDO::ATTR_PERSISTENT => true,

                // Change error mode to throw, catch
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            );

            // Create PDO instance
            try {
                // Try Connection
                $this->dbHandler = new PDO($dsn, $this->dbUsername, $this->dbPassword, $options);
            } catch (PDOException $e) {
                // Catch error if connection fails and put results in $error
                $this->error = $e->getMessage();
                echo $this->error;
            }

        }


        // Prepare statement with query
        public function query($sql) {
            $this->stmt = $this->dbHandler->prepare($sql);
        }

        // Bind values
        public function bind($param, $value, $type = null) {

            // Check if value type is null
            if(is_null($type)) {
                // if type is null
                switch(true){
                    // check if value is int and set type to int
                    case is_int($value):
                        $type = PDO::PARAM_INT;
                        break;
                    // check if value is boolean and set type to boolean
                    case is_bool($value):
                        $type = PDO::PARAM_BOOL;
                        break;
                    // check if value is null and set type to null
                    case is_null($value):
                        $type = PDO::PARAM_NULL;
                        break;
                    // else, set the default to string
                    default:
                        $type = PDO::PARAM_STR;
                }
            }
            $this->stmt->bindValue($param, $value, $type);
        }

        // Execute the prepared statemnt
        public function execute() {
            return $this->stmt->execute();
        }

        // Execute the prepared statemnt
        public function getInsertedId() {
            return $this->dbHandler->lastInsertId();
        }

        // Get multiple results as array of objects
        public function resultSet() {
            $this->execute();
            return $this->stmt->fetchAll(PDO::FETCH_OBJ);
        }

        // get single result as object
        public function single() {
            $this->execute();
            return $this->stmt->fetch(PDO::FETCH_OBJ);
        }

        // Get row count
        public function rowCount() {
            return $this->stmt->rowCount();
        }


    }