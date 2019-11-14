<template>
  <div class="panel-landing" id="section-1">
    <!--
    <h1 class="landing-heading">Hello, Blockstack!</h1>
    <p class="lead">
      <a href="#" class="btn btn-primary btn-lg" id="signin-button" @click.prevent="signIn">
        Sign In with Blockstack
      </a>
    </p>
    -->

    <div class="wrapper">
      <!-- Navbar Section -->
      <nav class="navbar navbar-expand-md navbar-light bg-light fixed-top effect-main">
        <div class="container container-s">
          <a class="navbar-brand" href="#">array.</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto navbar-right">
              <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#products">Product</a></li>
              <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#features">Features</a></li>
              <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#reviews">Reviews</a></li>
              <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#pricing">Pricing</a></li>
              <li class="nav-item"><a class="nav-link js-scroll-trigger btn btn-primary" href="#" @click.prevent="signIn" style='color:#fff;'>Sign In</a></li>
            </ul>
          </div>
        </div>
      </nav><!-- Navbar End -->

      <div id="main" class="main">
        <div class="container-m text-center">
          <div class="home hero-2"><!-- Hero Section-->
            <div class="hero-content wow fadeIn" style="visibility: visible; animation-name: fadeIn;">
              <h1>The Descentralized <strong>Invoicing Software</strong><br /> for Makers, Freelancers & SME</h1>
              <p>Keep your business and data <strong>secure & private</strong>.<br />Manage Invoices, Expenses, Customers, Files & more from everywhere.</p>
              <div class="form-alt">
                <div class="subscribe-form wow zoomIn animated" style="visibility: visible;">
                  <a href="#" class="btn btn-primary btn-lg" id="signin-button" @click.prevent="signIn">
                    Sign In Now
                  </a><br />
                  <span style='font-size:11px;'>Sign In with <strong>Blockstack</strong> to get access. It's free!</span>
                </div>
                <div id="response"></div>
              </div>
            </div>
            <div class="hero-img wow fadeIn" style="visibility: visible; animation-name: fadeIn;">
              <img class="img-fluid" src="@/assets/img/landing/hero.png" alt="Home">
            </div>
          </div>
        </div><!-- Hero End -->

        <div id="products" class="features wow fadeInDown" style="visibility: visible; animation-name: fadeInDown;">
          <div class="container-m">
            <div class="row text-center">
              <div class="col-md-12">
                <div class="features-intro">
                  <h2>Welcome to array, where data matters.</h2>
                  <p>We’ll Deliver the best stories and ideas on the topics you care about most straight to your
                  homepage, app, or inbox. </p>
                </div>
              </div>
              <div class="col-md-6 col-lg-4">
                <div class="feature-list">
                  <div class="card-icon">
                    <div class="card-img">
                      <img src="@/assets/img/landing/a1.png" alt="Feature" width="35">
                    </div>
                  </div>
                  <div class="card-text">
                    <h3>Responsive</h3>
                    <p>Deliver the best stories and ideas on the topics you care about most straight to you.</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-4">
                <div class="feature-list">
                  <div class="card-icon">
                    <div class="card-img">
                      <img src="@/assets/img/landing/a2.png" alt="Feature" width="35">
                    </div>
                  </div>
                  <div class="card-text">
                    <h3>Responsive</h3>
                    <p>Deliver the best stories and ideas on the topics you care about most straight to you.</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-4">
                <div class="feature-list">
                  <div class="card-icon">
                    <div class="card-img">
                      <img src="@/assets/img/landing/a3.png" alt="Feature" width="35">
                    </div>
                  </div>
                  <div class="card-text">
                    <h3>Responsive</h3>
                    <p>Deliver the best stories and ideas on the topics you care about most straight to you.</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-4">
                <div class="feature-list">
                  <div class="card-icon">
                    <div class="card-img">
                      <img src="@/assets/img/landing/a4.png" alt="Feature" width="35">
                    </div>
                  </div>
                  <div class="card-text">
                    <h3>User Friendly</h3>
                    <p>Deliver the best stories and ideas on the topics you care about most straight to you.</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-4">
                <div class="feature-list">
                  <div class="card-icon">
                    <div class="card-img">
                      <img src="@/assets/img/landing/a5.png" alt="Feature" width="35">
                    </div>
                  </div>
                  <div class="card-text">
                    <h3> AI Algorithms</h3>
                    <p>Deliver the best stories and ideas on the topics you care about most straight to you.</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-4">
                <div class="feature-list">
                  <div class="card-icon">
                    <div class="card-img">
                      <img src="@/assets/img/landing/a6.png" alt="Feature" width="35">
                    </div>
                  </div>
                  <div class="card-text">
                    <h3>Built-in Camera</h3>
                    <p>Deliver the best stories and ideas on the topics you care about most straight to you.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Features Section -->
        <div id="features" class="flex-split wow fadeIn" style="visibility: visible; animation-name: fadeIn;">
           <div class="container-s">
             <div class="flex-intro align-center">
               <h2>Build better landing pages</h2>
               <p> When you get staright to the point the presentation looks attractive on your web pages.
                   Keep it simple and clean always.</p>
             </div>
             <div class="flex-inner align-center">
                 <div class="f-image">
                   <img class="img-fluid" src="@/assets/img/landing/feature.png" alt="Feature">
                 </div>
                 <div class="f-text">
                   <div class="left-content">
                     <h2>Dynamic charts.</h2>
                     <p> When you get staright to the point the presentation looks attractive on your web pages.</p>
                     <a href="#">Know more</a>
                   </div>
                 </div>
             </div>

             <div class="flex-inner flex-inverted align-center">
               <div class="f-image f-image-inverted">
                 <img class="img-fluid" src="@/assets/img/landing/feature.png" alt="Feature">
               </div>
               <div class="f-text">
                 <div class="left-content">
                   <h2>Mobile Analytics.</h2>
                   <p> When you get staright to the point the presentation looks attractive on your web pages.</p>
                   <a href="#">Know more</a>
                 </div>
               </div>
             </div>
           </div>
         </div>

         <div class="yd-ft wow fadeIn" style="visibility: visible; animation-name: fadeIn;">
           <div class="yd-ft-inner">
             <div class="yd-ft-left">
               <h2>Welcome to array, where data matters.</h2>
                   <p>We’ll Deliver the best analytics and graphs you care about most straight to your
                   dashboard, app, or inbox. </p>
               <a href="#" class="btn-action btn-edge">Get Started</a>
             </div>
             <div class="yd-ft-right">
               <img src="@/assets/img/landing/test.png" alt="Feature">
             </div>
           </div>
         </div>

        <div class="ar-ft-single">
          <div class="container-m">
            <div class="ar-feature">
              <div class="ar-list">
                <ul>
                  <li>
                    <div class="ar-icon">
                      <img src="@/assets/img/landing/f1.png" alt="Icon" width="30">
                    </div>
                    <div class="ar-text">
                      <h3>Client Support</h3>
                      <p>Team hangouts and instant text messaging right from the dashboard.</p>
                    </div>
                  </li>
                  <li>
                    <div class="ar-icon">
                      <img src="@/assets/img/landing/f4.png" alt="Icon" width="30">
                    </div>
                    <div class="ar-text">
                      <h3>Secure Servers</h3>
                      <p>Team hangouts and instant text messaging right from the dashboard.</p>
                    </div>
                  </li>
                  <li>
                    <div class="ar-icon">
                      <img src="@/assets/img/landing/f11.png" alt="Icon" width="30">
                    </div>
                    <div class="ar-text">
                      <h3>Product Feedback</h3>
                      <p>Team hangouts and instant text messaging right from the dashboard.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="ar-image">
                <img class="ar-img img-fluid" src="@/assets/img/landing/feature-2.png" alt="Hero Image">
              </div>
            </div>
          </div>
        </div>

         <div id="reviews" class="yd-reviews wow fadeIn" style="visibility: visible; animation-name: fadeIn;"><!-- Array Reviews -->
           <div class="container">
             <div class="row text-center">
               <div class="col-sm-12 col-lg-8 offset-lg-2">
                 <div class="intro wow fadeIn" style="visibility: visible; animation-name: fadeIn;">
                   <h1>Customers say nice things</h1>
                   <p>We have  very fair pricing policy that would benefit you and us at the same time.
                      Get the free plan &amp; if you need more - pay.
                   </p>
                 </div>
               </div>

               <div class="col-sm-12 col-lg-8 offset-lg-2 text-center">
                 <div class="review-cards owl-carousel owl-theme owl-loaded owl-drag">                                      
                   
                 <div class="owl-stage-outer">
                  <div class="owl-stage" style="transform: translate3d(-1460px, 0px, 0px); transition: all 0.25s ease 0s; width: 2190px;">
                    <div class="owl-item" style="width: 730px;"><div class="card-single">
                     <div class="review-text">
                       <h1>"We have very fair pricing policy that would benefit you and us at the same time.
                         Choose what price you're willing to pay. Get the free plan &amp; if you need more - pay."
                       </h1>
                     </div>
                     <div class="review-attribution">
                       <div class="review-img">
                         <img class="img-fluid rounded-circle" src="@/assets/img/landing/review-1.png" alt="Review">
                       </div>
                       <i class="ion ion-star"></i>
                      <i class="ion ion-star"></i>
                      <i class="ion ion-star"></i>
                      <i class="ion ion-star"></i>
                      <i class="ion ion-ios-star-half"></i>
                       <h2> Albert Rossi</h2>
                       <h6>Stack Developer</h6>
                       <a href="#">Dropboxes Inc</a>
                     </div>
                   </div></div><div class="owl-item" style="width: 730px;"><div class="card-single">
                     <div class="review-text">
                       <h1>"We have very fair pricing policy that would benefit you and us at the same time.
                         Choose what price you're willing to pay. Get the free plan &amp; if you need more - pay."
                       </h1>
                     </div>
                     <div class="review-attribution">
                       <div class="review-img">
                         <img class="img-fluid rounded-circle" src="@/assets/img/landing/review-2.png" alt="Review">
                       </div>
                       <i class="ion ion-star"></i>
                      <i class="ion ion-star"></i>
                      <i class="ion ion-star"></i>
                      <i class="ion ion-star"></i>
                      <i class="ion ion-ios-star-half"></i>
                       <h2> Melissa Vanbergh</h2>
                       <h6>Vice President</h6>
                       <a href="#">Vestor Corp</a>
                     </div>
                   </div></div><div class="owl-item active" style="width: 730px;"><div class="card-single">
                     <div class="review-text">
                       <h1>"We have very fair pricing policy that would benefit you and us at the same time.
                         Choose what price you're willing to pay. Get the free plan &amp; if you need more - pay."
                       </h1>
                     </div>
                     <div class="review-attribution">
                       <div class="review-img">
                         <img class="img-fluid rounded-circle" src="@/assets/img/landing/review-3.png" alt="Review">
                       </div>
                       <i class="ion ion-star"></i>
                      <i class="ion ion-star"></i>
                      <i class="ion ion-star"></i>
                      <i class="ion ion-star"></i>
                      <i class="ion ion-star"></i>
                       <h2> Joshua Peterson</h2>
                       <h6>Product Developer</h6>
                       <a href="#">Betabet Inc</a>
                     </div>
                   </div></div></div></div><div class="owl-nav disabled"><button type="button" role="presentation" class="owl-prev"><span aria-label="Previous">‹</span></button><button type="button" role="presentation" class="owl-next"><span aria-label="Next">›</span></button></div><div class="owl-dots"><button role="button" class="owl-dot"><span></span></button><button role="button" class="owl-dot"><span></span></button><button role="button" class="owl-dot active"><span></span></button></div></div>
               </div>
             </div>
           </div>
         </div>
         <!-- Array Reviews Ends -->

        <!-- Array Pricing Section -->
        <div id="pricing" class="pricing-section text-center">
          <div class="container">
            <div class="row">
              <div class="col-sm-12">
                <div class="pricing-intro wow fadeInDown" style="visibility: visible; animation-name: fadeInDown;">
                  <h1>Pricing Plans.</h1>
                  <p>
                    Our plans are designed to meet the requirements of both beginners <br class="hidden-xs"> and players.
                    Get the right plan that suits you.
                  </p>
                </div>
                <div class="row">
                  <div class="col-lg-4 offset-lg-2 col-md-6">
                   <div class="table-left wow fadeInDown" style="visibility: visible; animation-name: fadeInDown;">
                     <div class="pricing-details">
                       <h2>Freemium</h2>
                       <img src="@/assets/img/landing/free.png" alt="Icon" width="60">

                       <span>$0.00</span>
                          <ul>
                           <li>First basic feature </li>
                           <li>Second feature goes here</li>
                           <li>Any other third feature</li>
                           </ul>
                         <button class="btn-action">Get Plan</button>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6">
                    <div class="table-right wow fadeInDown" style="visibility: visible; animation-name: fadeInDown;">
                      <div class="pricing-details">
                         <h2>Beginner</h2>
                         <img src="@/assets/img/landing/paid.png" alt="Icon" width="60">
                         <span>$24.99</span>
                         <ul>
                           <li>First premium feature </li>
                           <li>Second premium one goes here</li>
                           <li>Third premium feature here</li>
                         </ul>
                         <button class="btn-action">Buy Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Array Pricing Ends -->

        <!-- CTA Signup Section -->
        <div id="signup" class="cta-sm wow fadeIn" style="visibility: visible; animation-name: fadeIn;">
          <div class="container-m text-center">
            <div class="cta-content">
               <h4>GRAB ARRAY FOR BEST PRICE TODAY</h4>
               <h1>Start now and turn your online business into a profitable route.</h1>
               <a class="btn-action js-scroll-trigger btn btn-primary btn-lg" href="#" @click.prevent='signIn'>Sign In now</a>
              <div class="form-note">
                <p>Free forever. Sign in now with Blockstack to get access to your decentralized CRM.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Array Footer Section -->
        <div class="footer-sm">
          <div class="container">
            <div class="row">
              <div class="col-md-3">
                <a class="footer-logo" href="#">array.</a>
              </div>
              <div class="col-md-6 text-center">
                <h6>© J.P.Aulet 2019 Rights Reserved</h6>
              </div>
              <div class="col-md-3">
                <ul>
                  <li><a href="https://twitter.com/jpaulet">Twitter</a></li>
                  <li><a href="https://linkedin.com/jpaulet">Linkedin</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

       <!-- Scroll To Top -->
        <div id="back-top" class="bk-top" style="display: none;">
          <div class="bk-top-txt">
             <a class="back-to-top js-scroll-trigger" href="#main">top</a>
          </div>
        </div>
       <!-- Scroll To Top Ends-->

      </div> <!-- Main -->
    </div><!-- Wrapper -->   
  </div>
</template>

<script>
import { userSession } from '../userSession'
export default {
  name: 'signin',
  methods: {
    signIn () {
      userSession.redirectToSignIn()
    },
    loadRemoteScripts(){
      let popper = document.createElement('script')
      popper.setAttribute('src', "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js")
      document.head.appendChild(popper)
    }
  },
  data (){
    return {
      publicPath: 'http://localhost:8080' || process.env.BASE_URL
    }
  },
  created() {
    (async () => {
      await this.loadRemoteScripts()
    })()
  },
  mounted() {
    let plugins = document.createElement('script')
    plugins.setAttribute('src', this.publicPath+"/landing/plugins.js")
    document.head.appendChild(plugins)

    let custom = document.createElement('script')
    custom.setAttribute('src', this.publicPath+"/landing/custom.js")
    document.head.appendChild(custom)
  }
}
</script>

<style scoped>
  /* cyrillic-ext */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 300;
  src: local('Montserrat Light'), local('Montserrat-Light'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_cJD3gTD_u50.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 300;
  src: local('Montserrat Light'), local('Montserrat-Light'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_cJD3g3D_u50.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* vietnamese */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 300;
  src: local('Montserrat Light'), local('Montserrat-Light'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_cJD3gbD_u50.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 300;
  src: local('Montserrat Light'), local('Montserrat-Light'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_cJD3gfD_u50.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 300;
  src: local('Montserrat Light'), local('Montserrat-Light'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_cJD3gnD_g.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  src: local('Montserrat Regular'), local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459WRhyzbi.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  src: local('Montserrat Regular'), local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459W1hyzbi.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* vietnamese */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  src: local('Montserrat Regular'), local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459WZhyzbi.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  src: local('Montserrat Regular'), local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459Wdhyzbi.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  src: local('Montserrat Regular'), local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  src: local('Montserrat Medium'), local('Montserrat-Medium'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_ZpC3gTD_u50.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  src: local('Montserrat Medium'), local('Montserrat-Medium'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_ZpC3g3D_u50.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* vietnamese */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  src: local('Montserrat Medium'), local('Montserrat-Medium'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_ZpC3gbD_u50.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  src: local('Montserrat Medium'), local('Montserrat-Medium'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_ZpC3gfD_u50.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  src: local('Montserrat Medium'), local('Montserrat-Medium'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_ZpC3gnD_g.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  src: local('Montserrat SemiBold'), local('Montserrat-SemiBold'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_bZF3gTD_u50.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  src: local('Montserrat SemiBold'), local('Montserrat-SemiBold'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_bZF3g3D_u50.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* vietnamese */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  src: local('Montserrat SemiBold'), local('Montserrat-SemiBold'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_bZF3gbD_u50.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  src: local('Montserrat SemiBold'), local('Montserrat-SemiBold'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_bZF3gfD_u50.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  src: local('Montserrat SemiBold'), local('Montserrat-SemiBold'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_bZF3gnD_g.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  src: local('Montserrat Bold'), local('Montserrat-Bold'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_dJE3gTD_u50.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  src: local('Montserrat Bold'), local('Montserrat-Bold'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_dJE3g3D_u50.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* vietnamese */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  src: local('Montserrat Bold'), local('Montserrat-Bold'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_dJE3gbD_u50.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  src: local('Montserrat Bold'), local('Montserrat-Bold'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_dJE3gfD_u50.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  src: local('Montserrat Bold'), local('Montserrat-Bold'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_dJE3gnD_g.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

.owl-carousel,.owl-carousel .owl-item{-webkit-tap-highlight-color:transparent;position:relative}.owl-carousel{display:none;width:100%;z-index:1}.owl-carousel .owl-stage{position:relative;-ms-touch-action:pan-Y;touch-action:manipulation;-moz-backface-visibility:hidden}.owl-carousel .owl-stage:after{content:".";display:block;clear:both;visibility:hidden;line-height:0;height:0}.owl-carousel .owl-stage-outer{position:relative;overflow:hidden;-webkit-transform:translate3d(0,0,0)}.owl-carousel .owl-item,.owl-carousel .owl-wrapper{-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-ms-backface-visibility:hidden;-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);-ms-transform:translate3d(0,0,0)}.owl-carousel .owl-item{min-height:1px;float:left;-webkit-backface-visibility:hidden;-webkit-touch-callout:none}.owl-carousel .owl-item img{display:block;width:100%}.owl-carousel .owl-dots.disabled,.owl-carousel .owl-nav.disabled{display:none}.no-js .owl-carousel,.owl-carousel.owl-loaded{display:block}.owl-carousel .owl-dot,.owl-carousel .owl-nav .owl-next,.owl-carousel .owl-nav .owl-prev{cursor:pointer;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.owl-carousel .owl-nav button.owl-next,.owl-carousel .owl-nav button.owl-prev,.owl-carousel button.owl-dot{background:0 0;color:inherit;border:none;padding:0!important;font:inherit}.owl-carousel.owl-loading{opacity:0;display:block}.owl-carousel.owl-hidden{opacity:0}.owl-carousel.owl-refresh .owl-item{visibility:hidden}.owl-carousel.owl-drag .owl-item{-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.owl-carousel.owl-grab{cursor:move;cursor:grab}.owl-carousel.owl-rtl{direction:rtl}.owl-carousel.owl-rtl .owl-item{float:right}.owl-carousel .animated{animation-duration:1s;animation-fill-mode:both}.owl-carousel .owl-animated-in{z-index:0}.owl-carousel .owl-animated-out{z-index:1}.owl-carousel .fadeOut{animation-name:fadeOut}@keyframes fadeOut{0%{opacity:1}100%{opacity:0}}.owl-height{transition:height .5s ease-in-out}.owl-carousel .owl-item .owl-lazy{opacity:0;transition:opacity .4s ease}.owl-carousel .owl-item img.owl-lazy{transform-style:preserve-3d}.owl-carousel .owl-video-wrapper{position:relative;height:100%;background:#000}.owl-carousel .owl-video-play-icon{position:absolute;height:80px;width:80px;left:50%;top:50%;margin-left:-40px;margin-top:-40px;cursor:pointer;z-index:1;-webkit-backface-visibility:hidden;transition:transform .1s ease}.owl-carousel .owl-video-play-icon:hover{-ms-transform:scale(1.3,1.3);transform:scale(1.3,1.3)}.owl-carousel .owl-video-playing .owl-video-play-icon,.owl-carousel .owl-video-playing .owl-video-tn{display:none}.owl-carousel .owl-video-tn{opacity:0;height:100%;background-position:center center;background-repeat:no-repeat;background-size:contain;transition:opacity .4s ease}.owl-carousel .owl-video-frame{position:relative;z-index:1;height:100%;width:100%}

.owl-theme .owl-dots,.owl-theme .owl-nav{text-align:center;-webkit-tap-highlight-color:transparent}.owl-theme .owl-nav{margin-top:10px}.owl-theme .owl-nav [class*=owl-]{color:#FFF;font-size:14px;margin:5px;padding:4px 7px;background:#D6D6D6;display:inline-block;cursor:pointer;border-radius:3px}.owl-theme .owl-nav [class*=owl-]:hover{background:#869791;color:#FFF;text-decoration:none}.owl-theme .owl-nav .disabled{opacity:.5;cursor:default}.owl-theme .owl-nav.disabled+.owl-dots{margin-top:10px}.owl-theme .owl-dots .owl-dot{display:inline-block;zoom:1}.owl-theme .owl-dots .owl-dot span{width:10px;height:10px;margin:5px 7px;background:#D6D6D6;display:block;-webkit-backface-visibility:visible;transition:opacity .2s ease;border-radius:30px}.owl-theme .owl-dots .owl-dot.active span,.owl-theme .owl-dots .owl-dot:hover span{background:#869791}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  background-color: #fff !important;
  background: #fff !important;
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

/* --- Common Styles ---*/
h1, h2, h3, h4, h5, h6 {
  font-family: 'Montserrat';
  font-size: 16px;
}

p {
  font-family: 'Montserrat';
  font-size: 14px;
}

/*----- Helper Classes -----*/
html * {
  text-rendering: optimizeLegibility !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*, *:after, *:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

#loading {
   width: 100%;
   height: 100%;
   top: 0px;
   left: 0px;
   position: fixed;
   opacity: 1;
   background-color: #F2F2F2;
   z-index: 9999;
   text-align: center;
}

#loading-image {
  display: inline;
  top: 40%;
  position: relative;
  z-index: 9999;
}

.container-m {
  max-width: 1024px;
  margin: 0 auto !important;
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
}

.container-s {
  max-width: 920px;
  margin: 0 auto !important;
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
}

/*------ Navbar Styling ------*/
.navbar {
  font-family: "Montserrat";
  padding-top: 25px;
  padding-bottom: 25px;
  background-color: transparent !important;
  -webkit-transition: 0.5s all ease;
  transition: 0.5s all ease;
}

.navbar .navbar-brand {
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0;
  color: #344675 !important;
  vertical-align: middle;
}

.navbar .navbar-brand img {
  vertical-align: middle;
  margin-right: 0.3em;
}

.navbar .navbar-toggler {
  border: none;
}

.navbar span.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0,0,0, 0.9)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
}

.navbar span.navbar-toggler-icon::before {
  outline: none;
}

.navbar .navbar-toggler:focus {
  outline: none;
}

.navbar-nav {
  text-align: center;
  margin-top: 15px;
  background: #FFF;
  -webkit-transition: 0.5s all ease; /* For Safari 3.1 to 6.0 */
  transition: 0.5s all ease;
}

.navbar-nav .nav-item {
  margin-right: 0;
  margin-top: 1.5rem;
  font-size: 0.85rem;
  font-weight: 400;
  text-transform: capitalize;
  color: #563D7C;
}

.navbar-nav .nav-item .nav-link {
  color: #364655;
  font-weight: 500;
}

.nav-white .nav-item .nav-link {
  font-size: 0.92rem;
  text-transform: capitalize;
  color: #FFFFFF;
}

.nav-white .nav-item .nav-link:hover {
  color: #00eaff;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}

.nav-white .navbar-brand {
  color: #FFFFFF;
}

@media only screen and (max-width: 768px) {
  .navbar {
    /*background: rgba(255, 255, 255, 0.99) !important;*/
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .navbar .navbar-nav {
    padding-bottom: 25px;
  }

  .nav-white .nav-item .nav-link {
    color: #4957B8;
  }

  .navbar .btn-cta {
    padding: 0 30px;
  }
}

@media only screen and (min-width: 240px) {
  .navbar.past-main {
    padding-top: 15px;
    padding-bottom: 15px;
    background-color: rgba(255, 255, 255, 0.99) !important;
    -webkit-box-shadow: 0 2px 3px 0 rgba(96, 96, 96, 0.1);
    -moz-box-shadow: 0 2px 3px 0 rgba(96, 96, 96, 0.1);
    box-shadow: 0 2px 3px 0 rgba(96, 96, 96, 0.1);
  }

  .navbar.effect-main {
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  }

  .navbar.past-main .navbar-brand {
    color: #344675 !important;
  }

  .nav-white.past-main .nav-item .nav-link {
    color: #364655;
    font-weight:500;
  }

  .navbar.past-main .nav-item .nav-link {
    font-weight: 500;
  }

  .nav-white.past-main .navbar-brand {
    color: #364655;
  }

  .navbar.past-main span.navbar-toggler-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0,0,0, 0.8)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
  }

  .nav-white.effect-main {
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  }
}

/*------------- Hero Home Styling Starts ----------------*/
.home {
  padding: 100px 0 50px 0;
}

.home .intro-block {
  padding: 50px 0 50px 0;
  max-width: 800px;
  margin: 0 auto;
}

.centered {
  float: none !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.home .hero-img img {
  max-width: 720px !important;
  width: 100%;
  margin: 20px 0;
}

.home h1 {
  font-size: 28px;
  font-weight: 600;
  color: #FFFFFF;
  color: #364655;
  line-height: 1.2;
  letter-spacing: 0;
}

.home p {
  font-size: 16px;
  font-weight: 500;
  color: rgb(129, 129, 152);
  max-width: 630px;
  margin: 0 auto;
  letter-spacing: 0;
  line-height: 1.6;
  margin-top: 15px;
}

.btn-action {
  font-family: 'Montserrat';
  display: inline-block;
  height: 38px;
  padding: 0 30px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  line-height: 36px;
  letter-spacing: 2px;
  margin: 25px 0;
  text-transform: uppercase;
  text-decoration: none !important;
  white-space: nowrap;
  cursor: pointer;
  background-color: #387ed1;
  background: #344675;
  color: #FFFFFF;
  border: 1px solid transparent !important;
  border-radius: 4px;
  box-sizing: border-box;
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
  transition: 0.2s;
}

.btn-action:hover {
  color: #FFFFFF;
  box-shadow: 0 5px 25px 0 rgba(0, 0, 100,.2);
  border: 1px solid transparent !important;
  outline: none !important;
  text-decoration: none;
}

.btn-action:focus, .btn-action:active {
  background: #344675;
  color: #FFFFFF;
  border: 1px solid transparent !important;
  outline: none !important;
}

.home .client-list {
  margin-top: 25px;
}

.home .client-list ul {
  list-style-type: none;
}

.home .client-list ul li {
  display: inline;
  margin: 0 20px;
}

.home .client-list ul li img {
  width: 100px;
  opacity: 0.6;
  cursor: pointer;
}

.home .client-list ul li img:hover {
  opacity: 0.9;
}

.btn-cta {
  font-family: 'Montserrat';
  display: inline-block;
  height: 30px;
  padding: 0 30px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 1px;
  text-transform: capitalize;
  text-decoration: none !important;
  white-space: nowrap;
  cursor: pointer;
  background-color: #387ed1;
  background: #344675;
  color: #FFFFFF !important;
  border: 1px solid transparent !important;
  border-radius: 4px;
  box-sizing: border-box;
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
  transition: 0.2s;
}

.btn-cta:hover {
  color: #FFFFFF;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0,.1);
  border: 1px solid transparent !important;
  outline: none;
  text-decoration: none;
}

.btn-cta:focus, .btn-cta:active {
  background: #344675;
  color: #FFFFFF;
  border: 1px solid transparent !important;
  outline: none !important;
}

/*----------- Hero Version 2 Styling ------------*/
.hero-2 {
  text-align: center;
}

.hero-2 .hero-content {
    padding: 50px 0;
}

.hero-2 .hero-img {
  border-radius: 24px;
}


.hero-2 .hero-img img {
  border-radius: 10px;
  box-shadow: 0px 0px 60px 0px rgba(0,0,0,.1);
}

.hero-2 .form-alt {
  position: relative;
  margin-top: 25px;
}

.hero-2 .chimp-form .mail {
  position: relative;
  background-color: #F9F9F9;
  box-shadow: none;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  transition: all .3s;
}

.hero-2 .form-alt input {
  color: #222222;
  font-family: 'Montserrat';
  padding: 0;
  font-size: 13px;
  font-weight: 500;
  height: 45px;
  border: 0;
  border-radius: 4px;
  background-color: #F3F3F3;
  outline: none;
  padding: 0 100px 0 20px;
  box-shadow: 0 5px 30px rgba(255, 255, 255, 0.1);
}

.hero-2 .form-alt input:focus {
  outline: none !important;
  border-color: transparent;
}

.hero-2 .form-alt .submit-button {
  height: 45px;
  border: 0;
  border-radius: 0 4px 4px 0;
  margin-left: -25px;
  padding: 0 25px 0 25px;
  background: #344675;
  font-family: 'Montserrat';
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
  letter-spacing: 0;
  color: #FFFFFF;
  cursor: pointer;
  outline: none;
  box-shadow: 0 5px 30px rgba(255, 255, 255, 0.05);
  -webkit-transition: 500ms;
  -moz-transition: 500ms;
  transition: 500ms;
}

.hero-2 #email-error {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -50%;
  font-family: 'Montserrat';
  font-size: 13px;
  font-weight: 500;
  color: #FF3333;
}

.hero-2 #response {
  position: absolute;
  left: 0;
  bottom: -45%;
  vertical-align: middle;
  font-family: 'Montserrat';
  font-size: 13px !important;
  font-weight: 500;
  color: #15ccbe;
}

.hero-2 #chimp-email-error {
  position: absolute;
  left: 0;
  bottom: -45%;
  vertical-align: middle;
  font-family: 'Montserrat';
  font-size: 13px;
  font-weight: 500;
  color: red;
}

.hero-2 .success-message {
  color:#33cc33;
  margin-top: 5px;
}

.hero-2 .form-note p {
  font-size: 12px;
}

/*----------- Flex Features ------------*/
.flex-split {
  padding: 100px 0;
}

.flex-intro {
  margin-bottom: 50px;
  text-align: center;
}

.flex-intro h2 {
  font-size: 28px;
  font-weight: 600;
  color: #3a3a47;
  line-height: 1.3;
  margin-bottom: 10px;
}

.flex-intro p {
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: 0.01em;
  color: #818198;
  max-width: 630px;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 15px;
}

.flex-inner {
  margin: 50px 0;
}

.flex-inner .f-image {
  padding: 0 35px;
}

.flex-inner .f-text {
  padding: 0 35px;
}

 .flex-inner .f-text {
  -webkit-box-flex:1;
  -ms-flex:1;
  flex:1;
  text-align: center;
}

.flex-inner .f-text h2 {
  font-size: 24px;
  font-weight: 600;
  color: #3a3a47;
  line-height: 1.3;
  margin-top: 20px;
}

.flex-inner .f-text  p {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: 0.01em;
  color: #818198;
  margin-top: 15px;
  margin-bottom: 15px;
}

.flex-inner .f-text .left-content a {
  font-family: "Montserrat";
  font-size: 14px;
  font-weight: bold;
  color: #8798ab;
  position: relative;
  display: inline-block;
  text-decoration: none;
}

.flex-inner .f-text .left-content a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -20%;
  height: 1px;
  width: 50px;
  background: #8798ab;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}

.flex-inner .f-text .left-content a:hover::after {
  width: 75px;
}

.flex-inner .f-text .left-content a:hover {
  text-decoration: none;
}

.flex-inner.flex-inverted .f-image {
  -webkit-box-ordinal-group:2;
  -ms-flex-order:1;
  order:1
}

/*--------- Features Section Styles ----------*/
.features {
  background: #f6f6fd;
}

.features-intro {
  margin-bottom: 50px;
}

.features-intro h2 {
  font-size: 28px;
  font-weight: 600;
  color: #3a3a47;
  line-height: 1.3;
  margin-bottom: 10px;
}

.features-intro p {
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: 0.01em;
  color: #818198;
  max-width: 630px;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 15px;
}

.feature-list {
  margin: 30px 10px;
}

.card-icon {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  margin: 0 auto;
  background: rgba(30, 166, 154, 0.08);
  background: #ece7fe;
  display: table;
  text-align: center;
}

.card-img {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.card-img img {
  vertical-align: middle;
}

.card-text {
  margin-top: 25px;
}

.card-text h3 {
  font-size: 21px;
  font-weight: 500;
  color: #364655;
  margin-bottom: 15px;
}

.card-text p {
  font-size: 15px;
  font-weight: 500;
  color: rgb(129, 129, 152);
  line-height: 1.6;
  max-width: 320px;
  margin: 0 auto;
}

/*------- Stat Section Styling -------*/
.yd-stats {
  padding: 100px 0;
  background: #344675;
}

.yd-stats .intro {

}

.yd-stats .intro h2 {
  font-size: 28px;
  font-weight: 700;
  color: #3a3a47;
  color: #FFFFFF;
  line-height: 1.3;
  margin-bottom: 10px;
}

.yd-stats .intro p {
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: 0.01em;
  color: #818198;
  color: #FFFFFF;

  max-width: 630px;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 15px;
}

.yd-stats .counter-up {
  margin-top: 50px;
}

.counter-icon {
  padding: 15px;
}

.counter-icon img {
  width: 60px;
  height: 60px;
}

.counter-text {
  margin: 10px 0;
}

.counter-up h3 {
  font-size: 42px;
  font-weight: 700;
  color: #344675;
  color: #FFFFFF;
}

.counter-text h2 {
  font-size: 14px;
  font-weight: 500;
  padding: 0.5em;
  color: #364655;
  color: #FFFFFF;

}

.yd-link {
  text-align: center;
  margin: 25px 0;
}

.yd-link a {
  font-family: 'Montserrat';
  font-size: 15px;
  font-weight: 500;
  color: #344675;
  color: #FFFFFF;
  text-decoration: none;
  border-bottom: 1px solid #fff;
}


.yd-ft {
  padding: 75px 0;
  background: #E8F3EC;
  background: #344675;
}

.yd-ft .yd-ft-inner {
  display: block;
  background: #E8F3EC;
  background: #344675;
  max-width: 1024px;
  margin: 0 auto;
}

.yd-ft .yd-ft-inner .yd-ft-left {
  padding: 40px;
}

.yd-ft .yd-ft-inner .yd-ft-left h2 {
  font-size: 32px;
  font-weight: 400;
  color: #FFFFFF;
  /*color: #364655;*/
  line-height: 1.2;
  letter-spacing: 0;
  margin-bottom: 10px;
}

.yd-ft .yd-ft-inner .yd-ft-left p {
  font-size: 16px;
  font-weight: 500;
  color: #818198;
  color: #FFF;
  line-height: 1.6;
  margin-bottom: 0;
}

.yd-ft .yd-ft-inner .yd-ft-left .btn-action {
  background: #FFF;
  color: #344675;
  letter-spacing: 1px;
  text-transform: capitalize;
}

.yd-ft .yd-ft-inner .yd-ft-right {
  text-align: center;
}


.yd-ft .yd-ft-inner .yd-ft-right img {
  max-width: 90%;
  margin: 0 auto;
}

/*------------ Ar Feature Item Styling -----------*/
.ar-ft-single .container-m {
  margin: 100px 0;
}

.ar-feature {
  text-align: center;
  display: block;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  overflow: hidden;
}

.ar-feature .ar-list {
  -webkit-box-flex: 1;
  -ms-flex: 1 0 40%;
  flex: 1 0 40%;
  text-align: left;
}

.ar-feature .ar-image {
  -webkit-box-flex: 1;
  -ms-flex: 1 0 60%;
  flex: 1 0 60%;
  margin-left: 0;
}

.ar-list ul {
  list-style-type: none;
  overflow: hidden;
  margin-top: 0;
}

.ar-list ul li {
  margin-bottom: 30px;
  overflow: hidden;
}

.ar-feature .ar-icon {
  float: left;
  width: 15%;
}

.ar-feature .ar-icon img {
  margin-top: 0;
  vertical-align: middle;
}

.ar-feature .ar-text {
  float: right;
  width: 85%;
}

.ar-feature .ar-text h3 {
  font-size: 18px;
  color: #364655;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 10px;
}

.ar-feature .ar-text p {
  font-size: 15px;
  font-weight: 500;
  line-height: 1.6;
  color: #97a6b5;
}

/* ----- Pricing Tables Styling Starts ----- */
.pricing-section {
  width: 100%;
  height: 100%;
  padding-top: 100px;
  padding-bottom: 100px;
  background: #FFFFFF;
}

.pricing-intro {
  padding-bottom: 30px;
}

.pricing-intro h1 {
  font-size: 32px;
  color: #364655;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 20px;
}

.pricing-intro p {
  font-size: 16px;
  color: #97a6b5;
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: 0;
  margin-top: 10px;
  margin-bottom: 50px;
}

.pricing-details {
  padding: 50px 0 0 0;
}

.pricing-section .table-left, .pricing-section .table-right {
  padding: 20px 20px 50px 20px;
  margin: 0 auto;
  margin-bottom: 30px;
  background-color: #FFFFFF;
  box-shadow: 0px 0px 60px 0px rgba(0,0,0,.1);
  border: transparent;
  border-radius: 10px;
  max-width: 400px;
}

.table-left .icon, .table-right .icon {
  padding: 50px 50px 40px 50px;
}

.table-left .icon img, .table-right .icon img {
  width: 60px;
  height: 60px;
  margin: 0 auto;
}

.table-left .pricing-details span, .table-right .pricing-details span {
  display: block;
  font-family: 'Montserrat';
  font-size: 32px;
  font-weight: 600;
  color: #364655;
  opacity: 0.7;
  margin: 20px 0;
}


.table-left .pricing-details h2, .table-right .pricing-details h2 {
  font-size: 21px;
  font-weight: 600;
  color: #344675;
  margin-bottom: 30px;
}

.table-left .pricing-details p, .table-right .pricing-details p {
  font-size: 16px;
  font-weight: 500;
  color: #364655;
  line-height: 1.4;
}

.table-left .pricing-details ul, .table-right .pricing-details ul {
  margin-top: 30px;
  margin-bottom: 50px;
  padding: 0;
}

.table-left .pricing-details li, .table-right .pricing-details li {
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 500;
  color: #97a6b5;
  line-height: 1.4;
  letter-spacing: 0;
  margin-bottom: 10px;
}

.pricing-section .table-left:hover, .pricing-section .table-right:hover {
  box-shadow: 0 0 80px 0 rgba(0, 0, 0, 0.1);
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
}

.pricing-section .table-left, .pricing-section .table-right {
  margin-top: 20px;
}

.pricing-section .table-center {
  margin-top: 0;
}

/*------------------------------------------------
---------- Ar Review Section Styling -------------
------------------------------------------------*/
  .ar-reviews {
    padding: 5%;
    /* background: url(../images/bg.jpg) no-repeat center center;*/
    background: #f6f6fd;
  }

  .ar-reviews .ar-box {
    background: #344675;
    display: block;
    padding: 50px;
  }


  .ar-box .ar-right {
    margin-top: 50px;
  }

  .ar-box .ar-left h2 {
    font-size: 24px;
    font-weight: 600;
    color: #FFF;
    line-height: 1.6;
  }

  .ar-box .ar-right p {
    font-size: 14px;
    font-weight: 400;
    color: #FFF;
    line-height: 1.7rem;
    text-align: left;
    margin-bottom: 1.5rem;
  }

  .ar-box .ar-left .btn-action {
    background: #FFF;
    color: #344675;
    letter-spacing: 1px;
    text-transform: capitalize;
  }

/*----------------------------------------------
------------ Review Section Styling ------------
----------------------------------------------*/
.yd-reviews {
  padding: 100px 0 100px 0;
  background: #FFFFFF;
  background: rgba(30, 166, 154, 0.08);
  background: #f6f6fd;
  background-size: cover;
}

.yd-reviews .intro {
  padding: 0;
  max-width: 600px;
  margin: 0 auto;
  margin-bottom: 75px;
}

.yd-reviews .intro h1 {
  font-size: 28px;
  font-weight: 700;
  color: #364655;
  line-height: 1.2;
  margin-bottom: 20px;
}

.yd-reviews .intro p {
  font-size: 16px;
  font-weight: 500;
  color: rgb(129, 129, 152);
  line-height: 1.6;
  margin: 0px auto;
}

.yd-reviews .intro p:nth-child(4) {
  font-size: 13px;
}

.yd-reviews .intro a {
  color: #0000FF;
  text-decoration: none;
}


.yd-reviews .card-single {
    display: block;
}

.yd-reviews .card-single .review-text {
  -webkit-box-flex: 1;
  -ms-flex: 1 0 50%;
  flex: 1 0 50%;
  background: #344675;
  padding: 60px;
  text-align: left;
}

.yd-reviews .card-single .review-attribution {
  -webkit-box-flex: 1;
  -ms-flex: 1 0 50%;
  flex: 1 0 50%;
  padding: 60px;
  background: #FFFFFF;
}


.yd-reviews .card-single h1 {
  font-size: 18px;
  font-weight: 500;
  color: #FFF;
  line-height: 1.5;
  letter-spacing: 0;
  margin-bottom: 0;
}

.yd-reviews .card-single .review-attribution i {
  font-size: 13px;
  color: #ffd700;
}

.yd-reviews .card-single .review-attribution h2 {
  font-size: 15px;
  font-weight: 600;
  color: #556577;
  line-height: 1.4;
  margin-top: 5px;
}

.yd-reviews .card-single .review-attribution h6 {
  font-size: 12px;
  font-weight: 500;
  color: #97a6b5;
  line-height: 1.4;
}

.yd-reviews .card-single .review-attribution a {
  font-family: 'Montserrat';
  font-size: 12px;
  font-weight: 500;
  color: #344675;
  position: relative;
  display: inline-block;
  text-decoration: none;
}

.yd-reviews .card-single .review-attribution a:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: -3px;
  left: 0;
  background-color: #344675;
  visibility: hidden;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transition: all 0.2s ease-in-out 0s;
  transition: all 0.2s ease-in-out 0s;
}

.yd-reviews .card-single .review-attribution a:hover:before {
  visibility: visible;
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
}


.yd-reviews .card-single .review-attribution .review-img {
  text-align: center;
  margin-bottom: 20px;
}

.yd-reviews .card-single .review-attribution img {
  height: 80px;
  width: 80px;
  margin: 0 auto;
}

/*-------------------------------------------------------
-------------- Subscription Form Styling ----------------
-------------------------------------------------------*/
.cta-sm {
  background: rgba(30, 166, 154, 0.1);
  background: #f8faff;
  background: #f6f6fd;
}

.cta-sm .container-m{
  margin-top:100px;
  margin-bottom:100px;
}

.cta-sm .cta-content {
  max-width: 768px;
  margin: 0 auto;
}

.cta-sm h1 {
  font-size: 28px;
  font-weight: 600;
  color: #364655;
  line-height: 1.6;
}

.cta-sm h4 {
  font-size: 13px;
  font-weight: 400;
  color: #aeaeae;
  letter-spacing: 1px;
  margin-bottom: 0;
}

.form {
  position: relative;
  max-width: 420px;
  margin: 0 auto;
  margin-top: 30px;
}

.chimp-form .mail {
  position: relative;
  background-color: #FFFFFF;
  box-shadow: none;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  transition: all .3s;
}

.form input {
  display: block;
  width: 100%;
  margin: 0 auto;
  color: #344675;
  font-family: 'Montserrat';
  padding: 0;
  font-size: 13px;
  font-weight: 500;
  height: 50px;
  border: 1px solid #344675;
  border-radius: 4px;
  background-color: #FFFFFF;
  outline: none;
  padding: 0 100px 0 20px;
  box-shadow: 0 5px 30px rgba(255, 255, 255, 0.1);
}

.form input:focus {
  outline: none !important;
  background: #FFFFFF;
  border: 1px solid #344675;
}

.form .submit-button {
  height: 50px;
  width: 100%;
  border: 0;
  border-radius: 4px;
  margin: 0 auto;
  margin: 15px 0;
  padding: 0 25px 0 25px;
  background: #344675;
  font-family: 'Montserrat';
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
  letter-spacing: 0;
  color: #FFFFFF;
  cursor: pointer;
  outline: none;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 100,.2);
  -webkit-transition: 300ms;
  -moz-transition: 300ms;
  transition: 300ms;
}

.form .submit-button:hover {
  box-shadow: 0 5px 25px 0 rgba(0, 0, 100,.2);
}

.form .submit-button:focus, .form .submit-button:active {
  background: #344675;
}

#email-error {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -50%;
  font-family: 'Montserrat';
  font-size: 13px;
  font-weight: 500;
  color: #FF3333;
}

#response {
  position: absolute;
  left: 0;
  bottom: -45%;
  vertical-align: middle;
  font-family: 'Montserrat';
  font-size: 13px !important;
  font-weight: 500;
  color: #15ccbe;
}

#chimp-email-error {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -45%;
  vertical-align: middle;
  font-family: 'Montserrat';
  font-size: 13px;
  font-weight: 500;
  color: red;
}

.success-message {
  color:#33cc33;
  margin-top: 5px;
}

.form-note p {
  font-size: 12px;
  font-weight: 500;
  color: #97a6b5
}

/*------------------ Footer Small Styling Starts -------------*/
.footer-sm {
  padding: 30px 0;
  background: rgba(30, 166, 154, 0.1);
  background: #f6f6fd;
  text-align: center;
}

.footer-sm .col-md-4:nth-child(even) {
  text-align: center;
}

.footer-sm .footer-logo {
  font-family: 'Montserrat';
  font-size: 18px;
  font-weight: 600;
  color: #344675;
  letter-spacing: 0;
  display: block;
  margin-bottom: 15px;
  text-decoration: none;
}

.footer-sm h6 {
  font-size: 13px;
  font-weight: 500;
  color: #97a6b5;
  letter-spacing: 0;
  display: inline-block;
}

.footer-sm ul {
  list-style-type: none;
  text-align: center;
  margin-top: 10px;
}

.footer-sm ul li {
  font-family: "Montserrat";
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0;
  display: inline-block;
  margin-left: 6px;
  margin-right: 6px;
}

.footer-sm ul li a {
  font-size: 13px;
  font-weight: 500;
  position: relative;
  display: inline-block;
  color: #97a6b5;
  text-decoration: none;
}

.footer-sm ul li a:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: -3px;
  left: 0;
  background-color: #344675;
  visibility: hidden;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transition: all 0.2s ease-in-out 0s;
  transition: all 0.2s ease-in-out 0s;
}

.footer-sm ul li a:hover:before {
  visibility: visible;
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
}

.no-touch .footer-sm ul li a:hover {
  text-decoration: none;
  color: #000;
}

/* -------- Bact-to-Top Styling Starts Here -------------*/
.bk-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  border-radius: 3px;
  z-index: 90;
  display: none;
  width: 45px;
  height: 45px;
  background: #344675;
  color: #f2f2f0;
  border-radius: 50%;
  display: table;
  box-shadow:0 5px 15px rgba(0, 0, 0, .1);
}

.bk-top-txt {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.back-to-top {
  font-family: 'Montserrat';
  font-size: 12px;
  font-weight: 700;
  color: #FFFFFF;
  text-decoration: none;
  -webkit-transition: 200ms;
  -moz-transition: 200ms;
  -o-transition: 200ms;
  transition: 200ms;
}

.back-to-top:hover {
  color: #FFFFFF;
  text-decoration: none;
  font-size: 13px;
}

.back-to-top:focus {
  color: #FFFFFF;
}

/*------------ Media Queries -------------*/
@media only screen and (min-width: 767px) {
  .navbar-nav {
      margin-top: 0;
    }

  .navbar-nav .nav-item {
    margin-top: 0;
    margin-right: 15px;
    font-size: 0.85rem;
    font-weight: 400;
  }

  .container-s {
    padding-left: 20px;
    padding-right: 20px;
  }

  .flex-intro h2 {
    font-size: 32px;
  }

  .flex-inner {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin: 75px 0;
  }

  .flex-inner .f-image {
      -webkit-box-flex: 0;
      -ms-flex: 0 0 500px;
      flex: 0 0 500px;
  }

  .flex-inner .f-text h2 {
    font-size: 24px;
  }

  .flex-inner .f-text  p {
    font-size: 16px;
    font-weight: 500;
  }

  .counter-up h3 {
    font-size: 72px;
  }

  .ar-feature {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .ar-feature .ar-image {
    margin-left: 25px;
  }

  .ar-reviews .ar-box {
    padding: 100px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .ar-reviews .ar-box .ar-left {
    -webkit-box-flex: 1;
    -ms-flex: 1 0 50%;
    flex: 1 0 50%;
  }

  .ar-reviews .ar-box .ar-right {
    -webkit-box-flex: 1;
    -ms-flex: 1 0 50%;
    flex: 1 0 50%;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    text-align: center;
    margin-top: 0;
  }

  .ar-box .ar-left h2 {
    font-size: 28px;
  }

  .ar-box .ar-right p {
    font-size: 15px;
  }

  .yd-reviews .review-cards {
    margin-bottom: 0;
  }

  .yd-ft .yd-ft-inner {
    padding: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .yd-ft .yd-ft-inner .yd-ft-left {
    -webkit-box-flex: 1;
    -ms-flex: 1 0 50%;
    flex: 1 0 50%;
  }

  .yd-ft .yd-ft-inner .yd-ft-right {
    -webkit-box-flex: 1;
    -ms-flex: 1 0 50%;
    flex: 1 0 50%;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    text-align: center;
  }

  .yd-reviews .card-single {
   display: -webkit-box;
   display: -ms-flexbox;
   display: flex;
   -webkit-box-align: center;
   -ms-flex-align: center;
   align-items: center;
   background: #FFF;
  }

  .form input {
    padding: 0 50px 0 50px;
  }

  .footer-sm {
    text-align: left;
  }

  .footer-sm .footer-logo {
   margin-bottom: 0;
   font-size: 16px;
   display: block;
  }

  .footer-sm ul {
   list-style-type: none;
   text-align: right;
   margin-top: 0;
  }
}

@media only screen and (min-width: 480px) {
  .container-s {
    padding-left: 40px;
    padding-right: 40px;
  }

  .flex-inner .f-text {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    text-align: left;
 }
}

@media only screen and (min-width: 1024px) {
  .hero-2 .form-alt input {
    padding: 0 100px 0 50px;
  }
}

@media screen and (max-width: 420px) {
  .hero-2 .form-alt input {
      text-align: center;
      padding: 20px 20px;
  }

  .hero-2 .form-alt .submit-button {
    margin-left: 0;
  }
}

.navbar-nav{
  background: transparent !important;
}

#signup,#products,.ar-ft-single{
  padding: 100px 0px !important;
}

#reviews .container, #pricing .container {
    width: 100% !important;
    padding-right: 15px !important;
    padding-left: 15px !important;
    margin-right: auto !important;
    margin-left: auto !important;
}

body{
  background-color: #fff !important;
}

html,body{
  max-width:100% !important;
}

.btn-primary {
  background-image: linear-gradient(to bottom left, #344675, #344675, #344675) !important;
}
</style>