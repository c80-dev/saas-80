document.write(
  `
    <link rel="apple-touch-icon" href="pages/ico/60.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="pages/ico/76.png" />
    <link rel="apple-touch-icon" sizes="120x120" href="pages/ico/120.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="pages/ico/152.png" />
    <link rel="icon" type="image/x-icon" href="../assets/img/favicon.ico" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-touch-fullscreen" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta
      content="Meet pages - The simplest and fastest way to build web UI for your dashboard or app."
      name="description"
    />
    <meta content="Ace" name="author" />
    <link rel="stylesheet" href="./assets/custom/tickets.css" />
    <link
      href="assets/plugins/pace/pace-theme-flash.css"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="assets/plugins/bootstrap/css/bootstrap.min.css"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <link
      href="assets/plugins/jquery-scrollbar/jquery.scrollbar.css"
      rel="stylesheet"
      type="text/css"
      media="screen"
    />
    <link
      href="assets/plugins/select2/css/select2.min.css"
      rel="stylesheet"
      type="text/css"
      media="screen"
    />
    <link
      href="assets/plugins/bootstrap-tag/bootstrap-tagsinput.css"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="assets/plugins/dropzone/css/dropzone.css"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="assets/plugins/bootstrap-datepicker/css/datepicker3.css"
      rel="stylesheet"
      type="text/css"
      media="screen"
    />
    <link
      href="assets/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css"
      rel="stylesheet"
      type="text/css"
      media="screen"
    />
    <link
      href="assets/plugins/bootstrap-timepicker/bootstrap-timepicker.min.css"
      rel="stylesheet"
      type="text/css"
      media="screen"
    />
    <link
      class="main-stylesheet"
      href="pages/css/themes/corporate.css"
      rel="stylesheet"
      type="text/css"
    />
    <!-- Please remove the file below for production: Contains demo classes -->
    <link
      class="main-stylesheet"
      href="assets/css/style.css"
      rel="stylesheet"
      type="text/css"
    />
    <script>
      const token = sessionStorage.getItem("token");
      !token && window.location.replace("/login.html");
    </script>
    `
);
