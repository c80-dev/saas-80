document.write(`
<nav class="page-sidebar" data-pages="sidebar">
      <!-- BEGIN SIDEBAR MENU TOP TRAY CONTENT-->
      <div class="sidebar-overlay-slide from-top" id="appMenu">
        <div class="row">
          <div class="col-xs-6 no-padding">
            <a href="#" class="p-l-40"
              ><img src="assets/img/demo/social_app.svg" alt="socail" />
            </a>
          </div>
          <div class="col-xs-6 no-padding">
            <a href="#" class="p-l-10"
              ><img src="assets/img/demo/email_app.svg" alt="socail" />
            </a>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-6 m-t-20 no-padding">
            <a href="#" class="p-l-40"
              ><img src="assets/img/demo/calendar_app.svg" alt="socail" />
            </a>
          </div>
          <div class="col-xs-6 m-t-20 no-padding">
            <a href="#" class="p-l-10"
              ><img src="assets/img/demo/add_more.svg" alt="socail" />
            </a>
          </div>
        </div>
      </div>
      <!-- END SIDEBAR MENU TOP TRAY CONTENT-->
      <!-- BEGIN SIDEBAR MENU HEADER-->
      <div class="sidebar-header">
        <img
          src="assets/img/logo_white.png"
          alt="logo"
          class="brand"
          data-src="assets/img/logo_white.png"
          data-src-retina="assets/img/logo_white_2x.png"
          width="78"
          height="22"
        />
        <div class="sidebar-header-controls">
          <button
            aria-label="Toggle Drawer"
            type="button"
            class="btn btn-icon-link invert sidebar-slide-toggle m-l-20 m-r-10"
            data-pages-toggle="#appMenu"
          >
            <i class="pg-icon">chevron_down</i>
          </button>
          <button
            aria-label="Pin Menu"
            type="button"
            class="
              btn btn-icon-link
              invert
              d-lg-inline-block
              d-xlg-inline-block
              d-md-inline-block
              d-sm-none
              d-none
            "
            data-toggle-pin="sidebar"
          >
            <i class="pg-icon"></i>
          </button>
        </div>
      </div>
      <!-- END SIDEBAR MENU HEADER-->
      <!-- START SIDEBAR MENU -->
      <div class="sidebar-menu">
        <!-- BEGIN SIDEBAR MENU ITEMS-->
        <ul class="menu-items">
          <li class="m-t-20">
            <a href="index.html" class="detailed">
              <span class="title">Dashboard</span>
              <span class="details">12 New Updates</span>
            </a>
            <span class="icon-thumbnail"><i class="pg-icon">home</i></span>
          </li>

          <!-- Admin starts here -->
          <li class="">
          <a href="javascript:;">
            <span class="package">Admins</span>
            <span class="arrow"></span>
          </a>
          <span class="icon-thumbnail"><i class="pg-icon">note</i></span>
          <ul class="sub-menu">
            <li class="open active">
              <a href="admins.html">View Admins</a>
              <span class="icon-thumbnail"><i class="pg-icon">AD</i></span>
            </li>
            <li class="open active">
              <a href="createAdmin.html">Create Admins</a>
              <span class="icon-thumbnail"><i class="pg-icon">CA</i></span>
            </li>
          </ul>
        </li>
        <!-- Admin ends here -->

          <!-- subscribers starts here -->
          <li class="">
            <a href="javascript:;">
              <span class="package">Users</span>
              <span class="arrow"></span>
            </a>
            <span class="icon-thumbnail"><i class="pg-icon">note</i></span>
            <ul class="sub-menu">
              <li class="open active">
                <a href="index.html">Subscribed Users</a>
                <span class="icon-thumbnail"><i class="pg-icon">SU</i></span>
              </li>
            </ul>
          </li>
          <!-- subscribers end here -->

          <!-- Packages start here -->
          <li class="">
            <a href="javascript:;">
              <span class="package">Packages</span>
              <span class="arrow"></span>
            </a>
            <span class="icon-thumbnail"><i class="pg-icon">note</i></span>
            <ul class="sub-menu">
              <li class="open active">
                <a href="packages.html">View Packages</a>
                <span class="icon-thumbnail"><i class="pg-icon">VP</i></span>
              </li>
              <li class="">
                <a href="/create_package.html">Create a Package</a>
                <span class="icon-thumbnail"><i class="pg-icon">CP</i></span>
              </li>
            </ul>
          </li>
          <!-- Packages end here -->

          <!-- faq starts here -->
          <li class="">
            <a href="javascript:;">
              <span class="faq">FAQ</span>
              <span class="arrow"></span>
            </a>
            <span class="icon-thumbnail"><i class="pg-icon">note</i></span>
            <ul class="sub-menu">
              <li class="open active">
                <a href="faq.html">View FAQ</a>
                <span class="icon-thumbnail"><i class="pg-icon">VF</i></span>
              </li>
              <li class="">
                <a href="/create_faq.html">Add FAQ</a>
                <span class="icon-thumbnail"><i class="pg-icon">AF</i></span>
              </li>
            </ul>
          </li>
          <!-- faq end here -->

          <!-- subscribers starts here -->
          <li class="">
            <a href="javascript:;">
              <span class="package">Tickets</span>
              <span class="arrow"></span>
            </a>
            <span class="icon-thumbnail"><i class="pg-icon">note</i></span>
            <ul class="sub-menu">
              <li class="open active">
                <a href="tickets.html">View Tickets</a>
                <span class="icon-thumbnail"><i class="pg-icon">VT</i></span>
              </li>
            </ul>
          </li>
          <!-- subscribers end here -->
        </ul>
        <div class="clearfix"></div>
      </div>
      <!-- END SIDEBAR MENU -->
    </nav>



`);
