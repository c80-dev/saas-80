document.write(`
<script
      src="assets/plugins/pace/pace.min.js"
      type="text/javascript"
    ></script>
    <!--  A polyfill for browsers that don't support ligatures: remove liga.js if not needed-->
    <script src="assets/plugins/liga.js" type="text/javascript"></script>
    <script
      src="assets/plugins/jquery/jquery-3.2.1.min.js"
      type="text/javascript"
    ></script>
    <script
      src="assets/plugins/modernizr.custom.js"
      type="text/javascript"
    ></script>
    <script
      src="assets/plugins/jquery-ui/jquery-ui.min.js"
      type="text/javascript"
    ></script>
    <script
      src="assets/plugins/popper/umd/popper.min.js"
      type="text/javascript"
    ></script>
    <script
      src="assets/plugins/bootstrap/js/bootstrap.min.js"
      type="text/javascript"
    ></script>
    <script
      src="assets/plugins/jquery/jquery-easy.js"
      type="text/javascript"
    ></script>
    <script
      src="assets/plugins/jquery-unveil/jquery.unveil.min.js"
      type="text/javascript"
    ></script>
    <script
      src="assets/plugins/jquery-ios-list/jquery.ioslist.min.js"
      type="text/javascript"
    ></script>
    <script src="assets/plugins/jquery-actual/jquery.actual.min.js"></script>
    <script src="assets/plugins/jquery-scrollbar/jquery.scrollbar.min.js"></script>
    <script
      type="text/javascript"
      src="assets/plugins/select2/js/select2.full.min.js"
    ></script>
    <script
      type="text/javascript"
      src="assets/plugins/classie/classie.js"
    ></script>
    <script
      src="assets/plugins/jquery-datatable/media/js/jquery.dataTables.min.js"
      type="text/javascript"
    ></script>
    <script
      src="assets/plugins/jquery-datatable/extensions/TableTools/js/dataTables.tableTools.min.js"
      type="text/javascript"
    ></script>
    <script
      src="assets/plugins/jquery-datatable/media/js/dataTables.bootstrap.js"
      type="text/javascript"
    ></script>
    <script
      src="assets/plugins/jquery-datatable/extensions/Bootstrap/jquery-datatable-bootstrap.js"
      type="text/javascript"
    ></script>
    <script
      type="text/javascript"
      src="assets/plugins/datatables-responsive/js/datatables.responsive.js"
    ></script>
    <script
      type="text/javascript"
      src="assets/plugins/datatables-responsive/js/lodash.min.js"
    ></script>
    <!-- END VENDOR JS -->
    <!-- BEGIN CORE TEMPLATE JS -->
    <!-- BEGIN CORE TEMPLATE JS -->
    <script src="pages/js/pages.js"></script>
    <!-- END CORE TEMPLATE JS -->
    <!-- BEGIN PAGE LEVEL JS -->
    <script src="assets/js/scripts.js" type="text/javascript"></script>
    <!-- END PAGE LEVEL JS -->
    <!-- END CORE TEMPLATE JS -->
    <!-- BEGIN PAGE LEVEL JS -->
    <script src="assets/js/datatables.js" type="text/javascript"></script>
    <script src="assets/js/scripts.js" type="text/javascript"></script>
    <!-- END PAGE LEVEL JS -->

    <script>
    const getUserProfile2 = JSON.parse(
      sessionStorage.getItem("userProfile")
    );
    const image_path =getUserProfile2.image_path
    console.log(image_path, "yes");
  document.getElementById("header-dp").src=image_path
  </script>





`);
