<?php
  session_start();

  // Check if user havent been on the site for more than 30mins
  if(isset($_SESSION['user']['timestamp'])) {
    if(time() - $_SESSION['user']['timestamp'] > 1800) {
      header('Location: ' . URLROOT . '/logout');
    } else {
      $_SESSION['user']['timestamp'] = time();
    }
  }

  // Flash message helper
  // EXAMPLE - flash('register_success', 'You are now registered');
  // DISPLAY IN VIEW - echo flash('register_success');
  function flash($name = '', $message = '', $class = 'alert alert-success'){
    if(!empty($name)){
      if(!empty($message) && empty($_SESSION[$name])){
        if(!empty($_SESSION[$name])){
          unset($_SESSION[$name]);
        }

        if(!empty($_SESSION[$name. '_class'])){
          unset($_SESSION[$name. '_class']);
        }

        $_SESSION[$name] = $message;
        $_SESSION[$name. '_class'] = $class;
      } elseif(empty($message) && !empty($_SESSION[$name])){
        $class = !empty($_SESSION[$name. '_class']) ? $_SESSION[$name. '_class'] : '';
        echo '<div class="'.$class.'" id="msg-flash">'.$_SESSION[$name].'</div>';
        unset($_SESSION[$name]);
        unset($_SESSION[$name. '_class']);
      }
    }
  }

  // is user logged in
  function isLoggedIn() {
    if(isset($_SESSION['user'])) {
        return true;
    }

    return false;
  }