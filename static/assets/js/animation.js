/* Just a little hack to make the "loading" screen go away.
 * The "loading" screen is only displayed on the homepage.
 * */
if(window.location.href === 'https://www.eznotes.space/' || window.location.href === 'http://127.0.0.1:8088/')
    {
        setTimeout(() => {
            document.getElementById('animation').hidden = true;
        }, 3800);
    }