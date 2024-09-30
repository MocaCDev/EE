const all_clasic_links = [
    'navbar_image',
    'classic_home',
    'classic_about',
    'classic_support',
    'classic_register_state_or_college',
    'classic_shop'
];

/* For `/account`. */
let unhide_horizontal_sections = () => {
    /* We will assume here that `window.innerWidth` is >= 780. */
    if(!document.getElementById('vertical_facing_general_section').hidden)
        document.getElementById('vertical_facing_general_section').hidden = true;

    if(!document.getElementById('vertical_facing_account_section').hidden)
        document.getElementById('vertical_facing_account_section').hidden = true;

    if(document.getElementById('horizontal_facing_general_section').hidden)
        document.getElementById('horizontal_facing_general_section').hidden = false;

    if(document.getElementById('horizontal_facing_account_section').hidden)
        document.getElementById('horizontal_facing_account_section').hidden = false;
}

let hide_horizontal_sections = () => {
    document.getElementById('horizontal_facing_general_section').hidden = true;
    document.getElementById('horizontal_facing_account_section').hidden = true;

    /* Make vertical-facing section visible (for mobile, presumably). */
    document.getElementById('vertical_facing_general_section').hidden = false;
    document.getElementById('vertical_facing_account_section').hidden = false;
}

window.addEventListener('load', () => {
    if(window.location.href.includes('account'))
        {
            /* Check to see if we are on one of the pages listed in the sections.
             * If we are, do not do anything with the horizontal sections.
             * */
            if(document.getElementById('pages').hidden)
            {
                if(window.innerWidth <= 780)
                    {
                        hide_horizontal_sections();

                        return;
                    }
            }

            /* Instead, see if we need large screen back buttons/titles or small screen back
             * buttons/titles.
             * */
            /*if(window.innerWidth <= 780)
            {
                document.getElementById('large_screen_back').hidden = true;
                document.getElementById('large_screen_title').hidden = true;

                document.getElementById('small_screen_back').hidden = false;
                document.getElementById('small_screen_title').hidden = false;
            }
            else
            {
                document.getElementById('small_screen_back').hidden = true;
                document.getElementById('small_screen_title').hidden = true;
                document.getElementById('large_screen_back').hidden = true;
                document.getElementById('large_screen_title').hidden = true;
            }*/
            
            /* When the window gets loaded we only have to check if the windows width is
             * <=780, else the horizontal facing general and account section will be visible.
             * */
        }
});

window.addEventListener('resize', () => {
    if(window.location.href.includes('account'))
        { 
            if(document.getElementById('pages').hidden)
            {
                if(window.innerWidth <= 780)
                    {
                        hide_horizontal_sections();

                        return;
                    }

                /* We will assume here that `window.innerWidth` is >= 780. */
                unhide_horizontal_sections();
                return;
            }

            if(window.innerWidth <= 992)
            {
                document.getElementById('large_screen_back').hidden = true;
                document.getElementById('large_screen_title').hidden = true;

                document.getElementById('small_screen_back').hidden = false;
                document.getElementById('small_screen_title').hidden = false;
                //document.getElementById('pages_back_button').classList.add('me-sm-0');
            }
            else
            {
                document.getElementById('large_screen_back').hidden = false;
                document.getElementById('large_screen_title').hidden = false;
                
                document.getElementById('small_screen_back').hidden = true;
                document.getElementById('small_screen_title').hidden = true;
            }
        }
});

/* For `/signup`. */
window.addEventListener('load', () => {
    if(window.location.href.includes('signup'))
        document.getElementById('loading_bar_gif').style = 'display: none';
})

function show_loading_bar()
{
    document.getElementById('sign_up_content').hidden = true;

    document.getElementById('loading_bar').hidden = false;
    document.getElementById('loading_bar_gif').style = 'display: absolute;width:120px;height:120px'
}

function make_something_show(button_clicked)
{

    if(window.innerWidth <= 992)
        {
            document.getElementById('large_screen_back').hidden = true;
            document.getElementById('large_screen_title').hidden = true;

            document.getElementById('small_screen_back').hidden = false;
            document.getElementById('small_screen_title').hidden = false;
            //document.getElementById('pages_back_button').classList.add('me-sm-0');
        }
    else
        {
            document.getElementById('large_screen_back').hidden = false;
            document.getElementById('large_screen_title').hidden = false;

            document.getElementById('small_screen_back').hidden = true;
            document.getElementById('small_screen_title').hidden = true;
        }

    switch(button_clicked)
    {
        case 'switch_colleges':
            {
                document.getElementById('pages').hidden = false;
                document.getElementById('large_screen_title_text').innerText = "Switch Colleges";
                document.getElementById('small_screen_title_text').innerText = "Switch Colleges";

                if(!document.getElementById('horizontal_facing_general_section').hidden)
                {
                    document.getElementById('horizontal_facing_general_section').hidden = true;
                    document.getElementById('horizontal_facing_account_section').hidden = true;
                } else
                {
                    document.getElementById('small_screen_title_text').innerText = "Switch Colleges";
                    document.getElementById('vertical_facing_general_section').hidden = true;
                    document.getElementById('vertical_facing_account_section').hidden = true;
                }

                document.getElementById('switch_colleges_section').hidden = false;
                document.getElementById('welcome_message').hidden = true;
            }
    }
}

function go_back(section)
{
    document.getElementById('pages').hidden = true;

    switch(section)
    {
        case 'switch_colleges_section':
            {
                document.getElementById(section).hidden = true;

                if(window.innerWidth <= 780)
                {
                    document.getElementById('small_screen_title_text').innerText = '';

                    document.getElementById('horizontal_facing_general_section').hidden = true;
                    document.getElementById('horizontal_facing_account_section').hidden = true;
                    document.getElementById('vertical_facing_general_section').hidden = false;
                    document.getElementById('vertical_facing_account_section').hidden = false;
                } else
                {
                    document.getElementById('large_screen_title_text').innerText = '';

                    document.getElementById('horizontal_facing_general_section').hidden = false;
                    document.getElementById('horizontal_facing_account_section').hidden = false;
                    document.getElementById('vertical_facing_general_section').hidden = true;
                    document.getElementById('vertical_facing_account_section').hidden = true;
                }
                document.getElementById('welcome_message').hidden = false;
            }
    }
}

let show_extra_in_popup_menu = () => {
    if(window.innerWidth <= 990)
    {
        for(let i = 0; i < all_clasic_links.length; i++)
            {
                if(document.getElementById(all_clasic_links[i]) === null)
                    continue;

                document.getElementById(all_clasic_links[i]).classList.add('d-none');
            }
        document.getElementById('IDEK').classList.remove('d-none');
    }
    else
    {
        for(let i = 0; i < all_clasic_links.length; i++)
            {
                if(document.getElementById(all_clasic_links[i]) === null)
                    continue;

                document.getElementById(all_clasic_links[i]).classList.remove('d-none');
            }
        document.getElementById('IDEK').classList.add('d-none');
    }
};

show_extra_in_popup_menu();

window.addEventListener('resize', () => {
    if(window.innerWidth <= 990)
        {
            for(let i = 0; i < all_clasic_links.length; i++)
                {
                    if(document.getElementById(all_clasic_links[i]) === null)
                        continue;
    
                    document.getElementById(all_clasic_links[i]).classList.add('d-none');
                }
            document.getElementById('IDEK').classList.remove('d-none');
        }
        else
        {
            for(let i = 0; i < all_clasic_links.length; i++)
                {
                    if(document.getElementById(all_clasic_links[i]) === null)
                        continue;
    
                    document.getElementById(all_clasic_links[i]).classList.remove('d-none');
                }
            document.getElementById('IDEK').classList.add('d-none');
        }
});

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
                        document.getElementById('light').style.display='block';
                        document.getElementById('fade').style.display='block';
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

            document.getElementById('light').hidden = false;
            document.getElementById('fade').hidden = false;
            
            document.getElementById('light').style.display='block';
            document.getElementById('fade').style.display='block';
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
    document.getElementById('light').style.display='none';
    document.getElementById('fade').style.display='none';

    document.getElementById('light').hidden = true;
    document.getElementById('fade').hidden = true;
}

/* Click detection for when `light` div is visible. */
window.addEventListener('click', (e) => {
    if(document.getElementById('light').style.display !== 'none')
        if(!document.getElementById('OS_options').contains(e.target))
            close_OS_picker_window();
})

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

/* We want the header to blend in with the rest of the header so long as the user is at the top of the page.
 * If the user is not at the top, we want the navigation bar to stand out.
 * */
if(window.location.href.includes('/signup')) { window_scroll_operation_on('signup_header'); }
if(window.location.href.includes('/login')) { window_scroll_operation_on('login_header'); }