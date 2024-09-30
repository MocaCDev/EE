listen_for_click = (s, plan_id, plan, confirm_message) =>
    {
        document.querySelector(plan_id).addEventListener("click", () => {
            if(!confirm(confirm_message)) return;

            /* First, make sure the user has an account. */
            fetch('/CHA')
                .then((result) => { return result.json(); })
                .then((data) => {
                    if(data.Message === 'no_account')
                        {
                            alert("Hey There!\nIf you are wanting to buy a plan you must first have an account!\n\n- EZNotes Team.");
                            return;
                        }
                    
                    /* We will assume if `data.Message` is not `no_account` that it will be `has_account`. */
                    fetch('/create-checkout-session?plan=' + plan)
                        .then((result) => { return result.json(); })
                        .then((data) => { return s.redirectToCheckout({sessionId: data.sessionId}); })
                        .then((res) => { console.log(res); }); /* TODO: Remove. This is here for debugging. */
                });
        });
    }

window.addEventListener('resize', () => {
    if(window.innerWidth <= 500)
    {
        document.getElementById('navbar-logo').classList.remove('navbar-logo-large');
        document.getElementById('navbar-logo').classList.add('navbar-logo-small');
        return;
    }

    document.getElementById('navbar-logo').classList.remove('navbar-logo-small');
    document.getElementById('navbar-logo').classList.add('navbar-logo-large');
});

/*fetch('/config_stripe')
    .then((result) => { return result.json(); })
    .then((data) => {
        if(data.Status === '404')
            {
                alert("Hi!\nIt seems that there is currently an error in regards to our payment system.\n\nPlease hang tight! Thanks - EZNotes Team.")
                return;
            }*/

        /* NO VPN users. No exception. */
        /*$.get("https://api.ipdata.co?api-key=" + data.Message[1],
            (response) => {
                if(response.threat.is_proxy || response.threat.is_proxy)
                    window.location.href = '/blocked';
            }
        );*/

/*        const stripe = Stripe('bob');*/

        /* All confirmations below are temporary. Once the software is ready for launch, they will be removed. */
        /*listen_for_click(stripe, "#basicPlan", 'basic_plan',
            'Hey there!\nYou are about to place an order for EZNotes Software - Basic Plan.\nThe software currently is still being developed. Are you sure you want to continue?');
        
        listen_for_click(stripe, "#proPlan", 'pro_plan',
            'Hey there!\nYou are about to place an order for EZNotes Software - Pro Plan.\nThe software currently is still being developed. Are you sure you want to continue?');
        
        listen_for_click(stripe, "#proPlusPlan", 'pro_plus_plan',
            'Hey there!\nYou are about to place an order for EZNotes Software - Pro+ Plan.\nThe software currently is still being developed. Are you sure you want to continue?');
    });*/

/* Depracated method, but oh well. */
if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    /* I think `ra` will only be used for the homepage (`/`).
     * The check for `/#` exists so the webpage doesn't get stuck on the loading screen.
     * */
    if(window.location.href.includes('cf') || window.location.href.includes('/#'))
        window.location.href = '/';
}

function alert_has_account(endpoint)
{
    if(!confirm("You already have an account! Are you sure you want to create another one?")) return;

    window.location.href = '/' + endpoint;
}

function ask_user_to_make_account()
{
    fetch('/CHA')
        .then((resp) => { return resp.json(); })
        .then((resp) => {
            console.log(resp);
            if(!(resp.Status === '200'))
            {
                if(!confirm("Do you want to create an account before downloading the software?"))
                    {
                        if(window.innerWidth <= 780)
                            {
                                alert("You are on mobile. Visit your app store to download the EZNotes App.");
                                return;
                            }
                        
                        /* The two divs are hidden by default. */
                        [].slice.call(document.querySelectorAll('[data-name*="os_picker"]')).map((div) => {
                            div.style = 'display: block;';
                            div.hidden = false;
                        });
                        return;
                    }

                window.location.href = '/signup';
            }

            /*document.getElementById('eznotesInstaller').setAttribute('href', "/EZNotesApp.zip");
            document.getElementById('eznotesInstaller').removeAttribute('onclick');

            document.getElementById('eznotesInstaller').click();

            document.getElementById('eznotesInstaller').removeAttribute('href');
            document.getElementById('eznotesInstaller').setAttribute('onclick', 'ask_user_to_make_account()');//onclick = 'ask_user_to_make_account()';
            return;*/
            if(window.innerWidth <= 780)
                {
                    alert("You are on mobile. Visit your app store to download the EZNotes App.");
                    return;
                }

            [].slice.call(document.querySelectorAll('[data-name*="os_picker"]')).map((div) => {
                div.style = 'display: block;';
                div.hidden = false;
            });
        })
}

function download_software(for_OS)
{
    switch(for_OS)
    {
        case 'Windows':
            {
                document.getElementById('eznotesInstaller').setAttribute('href', "/EZNotesApp.zip");
                document.getElementById('eznotesInstaller').removeAttribute('onclick');

                document.getElementById('eznotesInstaller').click();

                document.getElementById('eznotesInstaller').removeAttribute('href');
                document.getElementById('eznotesInstaller').setAttribute('onclick', 'ask_user_to_make_account()');//onclick = 'ask_user_to_make_account()';
                return;
            }
        case 'IOS':
            {
                alert("Apple support coming soon. Sign up to our newletter to get updates!");
                return;;
            }
    }
}

function close_OS_picker_window()
{
    [].slice.call(document.querySelectorAll('[data-name*="os_picker"]')).map((div) => {
        div.style = 'display: none;';
        div.hidden = true;
    });
}

/* Click detection for when `light` div is visible. */
window.addEventListener('click', (e) => {
    /* Checks implemented as such just in case the ID of the div changes. */
    [].slice.call(document.querySelectorAll('[data-name*="os_picker"]')).map((div) => {
        /* The first `div` will be the one we need to check for mouse clicks.
         * */
        if(div.style.display !== 'none')
            if(!document.getElementById('OS_options').contains(e.target))
                close_OS_picker_window();
        
        return;
    });
});

/* TODO: I do not believe the below functions are needed. Keeping just in case we reinstate the survey.
 *       Should we remove eventually?
 * */
function count_characters(val) {
    var len = val.value.length;
    if (len >= 500) {
        val.value = val.value.substring(0, 500);
        document.getElementById('characterCount').innerHTML = '<p>0 Characters Remaining</p>';
    } else {
        document.getElementById('characterCount').innerHTML = '<p>' + (500 - len).toString() + ' Characters Remaining</p>';
    }
};

function show_animation()
{
    /* Hide the overall section in regards to the survey. */
    document.getElementById('eznotesSurveySection').hidden = true;

    /* Make the animation play whilst the backend is loading the users input and saving it. */
    document.getElementById('animation').hidden = false;
}

function window_scroll_operation_on(id)
{
    window.onscroll = () => {
        if(document.documentElement.scrollTop === 1 || document.documentElement.scrollTop === 0)
            {
                /* Change the logo back to black. */
                document.getElementById('signup_logo').src = '/static/assets/img/EZNotes-Signup-Icon.svg';

                /* Set the style display to none. */
                document.getElementById(id).style = '';

                /* Add `transition-to-transparent` to animate color changing from `#121212` to the default background
                 * color of the page.
                 * */
                document.getElementById(id).classList.add('transition-to-transparent');
                return;
            }

        /* Remove `transition-to-transparent` - it is not needed. */
        document.getElementById(id).classList.remove('transition-to-transparent');

        /* Change logo to one that can be seen on top of the background color `#121212`. */
        document.getElementById('signup_logo').src = '/static/assets/img/EZNote-2.svg';
        document.getElementById(id).style = 'background-color: #121212';
    }
}

/* "scroll" to the next section of the current page.
 * A section is denoted by its tag ID.
 * All header sections take up the entire height/width of the screen, whereas
 * the rest of the webpage does not.
 * */
let index = 0;
$(() => {
    $('#show-page').on('click', (e) => {
        e.preventDefault();

        [].slice.call(document.querySelectorAll('[data-name*="overview"]')).map((sec) => {
            sec.style = 'display: block;'
        });

        AOS.init({duration: 1150});

        window.location.href = (!window.location.href.includes('#')
            ? window.location.href
            : window.location.href.split('#').reverse().pop())
            + '#'
            + document.querySelectorAll('[data-name*="overview"]')[0].id;
    });
});

window.onscroll = () => {
    if(document.documentElement.scrollTop === 0 && !window.mobileCheck())
    {
        [].slice.call(document.querySelectorAll('[data-name*="overview"]')).map((sec) => {
            sec.style = 'display:none;';
        });

        if(window.location.href.includes('/#'))
            window.location.href = window.location.href.split('/#').reverse().pop() + '/#intro';

        return;
    }
};

/*var firstsec = document.getElementById('intro');
var secondsec = document.getElementById('brief_about');
var lastScrollTop2 = 0;

window.onscroll = function(){
   var st = window.pageYOffset || document.documentElement.scrollTop; 
   if (st > lastScrollTop2){
        let secondsec_xy = secondsec.getBoundingClientRect();
        window.scrollTo({top: secondsec_xy.top, behavior: 'smooth'});
      //secondsec.scrollIntoView({block: 'end',  behavior: 'smooth'});
   } else {
      firstsec.scrollIntoView({block: 'end',  behavior: 'smooth'});
   }
   lastScrollTop2 = st <= 0 ? 0 : st; 
}*/

let initted = false;

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

//let intro_name = 'intro';

var ua = navigator.userAgent.toLowerCase(); 
var isSafari = false;
try {
  isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
}
catch(err) {}
isSafari = (isSafari || ((ua.indexOf('safari') != -1)&& (!(ua.indexOf('chrome')!= -1) && (ua.indexOf('version/')!= -1))));

window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

window.addEventListener('resize', () => {
    if(window.mobileCheck())
    {
        if(!document.getElementById('quick-overview').classList.contains('quick-overview-for-mobile'))
            document.getElementById('quick-overview').classList.add('quick-overview-for-mobile');
        return;
    }

    if(window.innerHeight < 1160) document.getElementById('intro-content').style = 'margin-top: 20px';
    else document.getElementById('intro-content').style = 'margin-top: 350px';

    if(isSafari)
    {
        document.getElementById('learn-more').hidden = true;
        document.getElementById('intro').classList.remove(intro_name);
        document.getElementById('intro').classList.add('intro-special-3');
        intro_name = 'intro-special-3';
        return;
    }

    if(window.innerWidth <= 950)
    {
        document.getElementById('quick-overview').classList.remove('quick-overview-normal');
        document.getElementById('quick-overview').classList.add('quick-overview-for-mobile');
        document.getElementById('intro').classList.remove(intro_name);

        if(window.innerWidth <= 770)
        {
            document.getElementById('intro').classList.add('intro-special-mobile');
            intro_name = 'intro-special-mobile';
            return;
        }

        document.getElementById('intro').classList.add('intro-special');
        intro_name = 'intro-special';
        return;
    } else {
        document.getElementById('quick-overview').classList.remove('quick-overview-for-mobile');
        document.getElementById('quick-overview').classList.add('quick-overview-normal');
        document.getElementById('intro').classList.remove(intro_name);
        document.getElementById('intro').classList.add('intro');
        intro_name = 'intro';
    }

    if(window.innerHeight <= 500)
    {
        document.getElementById('intro').hidden = true;
        document.getElementById('too-small-height').hidden = false;
        return;
    } else {
        document.getElementById('intro').hidden = false;
        document.getElementById('too-small-height').hidden = true;
    }

    if(window.innerHeight >= 915)
    {
        if(window.innerHeight <= 1013) document.getElementById('learn-more').hidden = true;
        else document.getElementById('learn-more').hidden = false;
        document.getElementById('intro').classList.remove(intro_name);
        document.getElementById('intro').classList.add('intro');
        
        intro_name = 'intro';
    } else if(window.innerHeight < 915)
    {
        document.getElementById('learn-more').hidden = true;

        if(window.innerHeight < 915 && window.innerHeight > 745)
        {
            document.getElementById('intro').classList.remove(intro_name);

            if(intro_name !== "intro")
            {
                document.getElementById('intro').classList.remove(intro_name);
                document.getElementById('intro').classList.add('intro');
                intro_name = 'intro';
            }
            /*document.getElementById('intro').classList.add('intro-special');
            intro_name = 'intro-special';*/
        } else {
            if(window.innerHeight <= 745 && window.innerHeight > 630)
            {
                document.getElementById('intro').classList.remove(intro_name);
                document.getElementById('intro').classList.add('intro-special-2');
                intro_name = 'intro-special-2';
            } else if(window.innerHeight <= 630 && window.innerHeight > 550)
            {
                document.getElementById('intro').classList.remove(intro_name);
                document.getElementById('intro').classList.add('intro-special-3');
                intro_name = 'intro-special-3';
            } else
            {
                document.getElementById('intro').classList.remove(intro_name);
                document.getElementById('intro').classList.add('intro-special-4');
                intro_name = 'intro-special-4'
            }
        }
    }
});

function show_basic_plan() {
    document.getElementById('basic-plan-details').style = 'display:block';
}

/* The animation will not go away until the window is completely loaded.
 * Once the window has loaded, get rid of the loading animatin and initialize the
 * AOS animations.
 * */
intro_name = 'intro';
window.onload = () => {
    /* See `header.js` for code on the below method. */
    //window.adjustOnLoad();

    if(window.mobileCheck())
    {
        document.getElementById('coming-soon-section').style = 'margin-top: 300px';
        document.getElementById('basic-plan-features').style = 'margin-top: 15px';
        document.getElementById('basic-plan-features-list').style = 'margin-top:15px;margin-bottom:15px;list-style:none;';
        document.getElementById('what-we-offer').style = 'margin-top: 25px';
        /* The "download" button will show in the menu. */
        document.getElementById('eznotesInstaller').hidden = true;

        document.getElementById('intro').classList.remove(intro_name);
        document.getElementById('intro').classList.add('intro-special-3');
        intro_name = 'intro-special-3';

        document.getElementById('quick-overview').classList.remove('quick-overview-normal');
        document.getElementById('quick-overview').classList.add('quick-overview-for-mobile');
        document.getElementById('intro-content').style = 'margin-top: 20px';

        document.getElementById('quick-overview').style = 'display:block';
    }
    else {
        document.getElementById('b2').hidden = false;
        document.getElementById('intro-content').style = 'margin-top: 220px';
    }

    /* We want to know if the user was redirected back to the homepage.
     * The code within the if statement is to run only upon the webpage reloading,
     * or the user just getting to the webpage.
     * If there are any sort of internal redirects made by the server itself, we don't
     * want the `setTimeout` inside the if statement to run.
     * */
    if(getCookie('RED') === "")
    {
        setTimeout(() =>
        {
            /* Hide everything pertaining to the animation (loading screen). */
            [].slice.call(document.querySelectorAll('[data-name*="anim"]')).map((tag) => { tag.hidden = true; });

            /* Initialize AOS animations. */
            AOS.init({duration: 1150});

            /* Wait 5 ms after animations are done to update the background image border radius. */
            setTimeout(() => {
                document.getElementById('intro').classList.remove('main-page-header-bg2-with-radius');
                document.getElementById('intro').classList.add('main-page-header-bg2');
            }, 1155);
        }, 3800);
        
        return;
    }

    /* If the user was redirected, just initialize `AOS`. */
    AOS.init({duration: 1150});

    setTimeout(() => {
        document.getElementById('intro').classList.remove('main-page-header-bg2-with-radius');
        document.getElementById('intro').classList.add('main-page-header-bg2');
    }, 1151);
}

/* We want the header to blend in with the rest of the header so long as the user is at the top of the page.
 * If the user is not at the top, we want the navigation bar to stand out.
 *
 * TODO: Are the below `if` statements needed anymore? I do not believe `signup_header` nor `login_header` even
 *       exist anymore.
 * */
//if(window.location.href.includes('/signup')) { window_scroll_operation_on('signup_header'); }
//if(window.location.href.includes('/login')) { window_scroll_operation_on('login_header'); }