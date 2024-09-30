let lastScrollTop = 0;

/* A little "hack" for the larger screen navbar.
 * Since the larger screen navbar is 40px from the top, we have to make sure we relocate
 * the navbar directly at the top when scrolling down.
 * Once the user begins scrolling up, we will reset the margin-top offset to 40px.
 * */
window.onscroll = () => {
    let st = document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    console.log(st);

    /*if (st > lastScrollTop)
    {
        lastScrollTop = st;
        return;
    } else if (st < lastScrollTop)
    {
        lastScrollTop = st;
        if(st !== 0)
        {
            document.getElementById('navbar-main').style = 'box-shadow: 0px 12px 6px -10px #121212;background-color: white;opacity:0.5;width:100%';
            return;
        }

        document.getElementById('navbar-main').style = 'box-shadow: 0px 12px 6px -10px #121212;background-color: white;width:100%';
        //document.getElementById('navbar-main2').classList.add('eznotes_navbar');
        //document.getElementById('navbar-main2').classList.remove('eznotes_navbar_invert');
        return;
    }*/
    /*if(!document.getElementById('navbar-main2').hidden)
    {
        let st = document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"

        if (st > lastScrollTop)
        {
        lastScrollTop = st;
        document.getElementById('navbar-main2').classList.remove('eznotes_navbar');
        document.getElementById('navbar-main2').classList.add('eznotes_navbar_invert');
        return;
    } else if (st < lastScrollTop)
        {
        lastScrollTop = st;
        document.getElementById('navbar-main2').classList.add('eznotes_navbar');
        document.getElementById('navbar-main2').classList.remove('eznotes_navbar_invert');
        return;
    }
}*/
}

const all_clasic_links = [
    'navbar_image',
    'classic_home',
    'classic_about',
    'classic_support',
    'classic_register_state_or_college',
    'classic_shop'
];

/* Hide all normal links and only show links inside the menu. (For mobile/smaller screens) */
let show_extra_in_popup_menu = () => {
    /* Check the inner width to see if it is <= 1067.
     * If it is, show the small screen navbar. Else, keep the large screen navbar.
     * */
    /*if(window.innerWidth <= 1067)
    {
        document.getElementById('navbar-main2').hidden = true;
        document.getElementById('navbar-main').hidden = false;
    } else {
        document.getElementById('navbar-main').hidden = true;
        document.getElementById('navbar-main2').hidden = false;
    }*/

    if(window.innerWidth <= 992)
    {
        /* Hide all normal links (for bigger screens) and make links in the popup menu visible (for smaller screens/mobile devices). */
        for(let i = 0; i < all_clasic_links.length; i++)
            {
                if(document.getElementById(all_clasic_links[i]) === null)
                    continue;

                document.getElementById(all_clasic_links[i]).classList.add('d-none');
            }
        document.getElementById('menu_links').classList.remove('d-none');
    }
    else
    {
        if(window.innerWidth < 1200) document.getElementById('action-buttons').classList.add('d-none');
        else document.getElementById('action-buttons').classList.remove('d-none');

        /* Make all popup menu links (for smaller screens/mobile devices) invisible and show the normal links (for bigger screens). */
        for(let i = 0; i < all_clasic_links.length; i++)
            {
                if(document.getElementById(all_clasic_links[i]) === null)
                    continue;

                document.getElementById(all_clasic_links[i]).classList.remove('d-none');
            }
        document.getElementById('menu_links').classList.add('d-none');
    }
};

window.addEventListener('load', () => { show_extra_in_popup_menu(); });

window.addEventListener('DOMContentLoaded', () => {
    if(window.mobileCheck())
    {
        document.getElementById('normal_links').hidden = true;
        return;
    }

    if(window.innerWidth > 992)
        document.getElementById('normal_links').hidden = false;
});

if(!window.mobileCheck())
{
    window.addEventListener('resize', () => {
        show_extra_in_popup_menu();
    });
}

let show_menu_links = () => { document.getElementById('menu_links').hidden = false; };