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

let update_large_screen_divs = (is_hidden) => {
    /* Hide large screen back button and title divs. */
    document.getElementById('large_screen_back').hidden = is_hidden;
    document.getElementById('large_screen_title').hidden = is_hidden;

    /* Make small screen (presumably mobile-based) divs visible. */
    document.getElementById('small_screen_back').hidden = !is_hidden;
    document.getElementById('small_screen_title').hidden = !is_hidden;
}

let update_large_screen_divs_BOWW = () => { /* `BOWW` = Based On Window Width. */
    if(window.innerWidth <= 992) update_large_screen_divs(true); /* Make large screen divs invisible. */
    else update_large_screen_divs(false); /* Make large screen divs visible. */
}

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

            update_large_screen_divs_BOWW();
        }
});

let active_section;

let set_title_text = (set_to) => {
    document.getElementById('small_screen_title_text').innerText = set_to;
    document.getElementById('large_screen_title_text').innerText = set_to;
}

let hide_general_and_account_section = () => {
    if(!document.getElementById('horizontal_facing_general_section').hidden)
    {
        document.getElementById('horizontal_facing_general_section').hidden = true;
        document.getElementById('horizontal_facing_account_section').hidden = true;
    } else
    {
        document.getElementById('vertical_facing_general_section').hidden = true;
        document.getElementById('vertical_facing_account_section').hidden = true;
    }
}

let switch_to_section = (set_to) => {
    set_title_text(set_to);
    hide_general_and_account_section();

    document.getElementById(active_section).hidden = false;
    document.getElementById('welcome_message').hidden = true;
}

function make_something_show(button_clicked)
{
    document.getElementById('pages').hidden = false;

    update_large_screen_divs_BOWW();

    switch(button_clicked)
    {
        case 'switch_colleges':
            {
                active_section = 'switch_colleges_section';

                switch_to_section("Switch Colleges");

                break;
            }
        case 'account_details':
            {
                active_section = 'account_details_section';

                switch_to_section("Account Details");

                break;
            }
        default: break;
    }
}

function go_back()
{
    document.getElementById('pages').hidden = true;

    document.getElementById(active_section).hidden = true;

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