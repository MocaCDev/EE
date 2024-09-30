
intro_name = 'about-intro';
window.onload = () => { window.adjustOnLoad(); };
/*
    if(window.innerHeight < 1160)
        document.getElementById('about-intro-header-content').style = 'margin-top: 80px';
    else
        document.getElementById('about-intro-header-content').style = 'margin-top: 250px';
}*/

AOS.init({duration: 1150});

setTimeout(() => {
    document.getElementById('about-intro').classList.remove('about-page-header-bg-with-radius');
    document.getElementById('about-intro').classList.add('about-page-header-bg');
}, 1155);

function going_to_next_section(section_name)
{
    let location = window.location.href;
    if(location.includes('#'))
        location = location.split('#')[0];

    document.getElementById(section_name).style = 'display: block;';
    document.getElementById('quick-explain').style = 'display: block;';

    window.location.href = location + '#' + section_name;
}

window.onscroll = () => {
    if(document.documentElement.scrollTop === 0)
    {
        /* Wait for AOS animation to end. */
        document.getElementById('quick-explain-begin').style = 'display: none;';
        document.getElementById('quick-explain').style = 'display: none;';
        return;
    }
};

window.addEventListener('resize', () => {
    if(window.mobileCheck()) return;

    if(window.innerHeight < 1160)
        document.getElementById('about-intro-header-content').style = 'margin-top: 20px';
    else
        document.getElementById('about-intro-header-content').style = 'margin-top: 250px';

    if(window.innerHeight >= 915)
    {
        document.getElementById('about-intro').classList.remove(intro_name);
        document.getElementById('about-intro').classList.add('intro');
        intro_name = 'intro';
    } else if(window.innerHeight < 915)
    {
        if(window.innerHeight < 915 && window.innerHeight > 745)
        {
            document.getElementById('about-intro').classList.remove(intro_name);

            if(intro_name !== "intro")
            {
                document.getElementById('about-intro').classList.remove(intro_name);
                document.getElementById('about-intro').classList.add('intro');
                intro_name = 'intro';
            }
            /*document.getElementById('intro').classList.add('intro-special');
            intro_name = 'intro-special';*/
        } else {
            if(window.innerHeight <= 745 && window.innerHeight > 630)
            {
                document.getElementById('about-intro').classList.remove(intro_name);
                document.getElementById('about-intro').classList.add('intro-special-2');
                intro_name = 'intro-special-2';
            } else if(window.innerHeight <= 630 && window.innerHeight > 550)
            {
                document.getElementById('about-intro').classList.remove(intro_name);
                document.getElementById('about-intro').classList.add('intro-special-3');
                intro_name = 'intro-special-3';
            } else
            {
                document.getElementById('about-intro').classList.remove(intro_name);
                document.getElementById('about-intro').classList.add('intro-special-4');
                intro_name = 'intro-special-4'
            }
        }
    }
});