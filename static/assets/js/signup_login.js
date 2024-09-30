/* Hide the college icon and the college drop down. Once the user picks their state, then the
 * college icon and the dropdown menu to pick a college in that state will become visible.
 * */
window.addEventListener('load', () => {
    AOS.init({duration: 1150});

    document.getElementById('college_icon').hidden = true;
    document.getElementById('college_selection').hidden = true;

    /* Check to make sure that the state dropdown doesn't have an item picked.
     * This check is needed just in case a reload happens. Avaoid "glitching" stuff
     * out.
     * */
    if(window.location.href.includes('singup') && document.getElementById('state').value !== '')
    {
        document.getElementById('state').value = '';

        let options = document.getElementById('college').lastElementChild;
        while(options.innerHTML !== "Select")
        {
            document.getElementById('college').removeChild(options);
            options = document.getElementById('college').lastElementChild;
        }

        document.getElementById('college_icon').hidden = set_to;
        document.getElementById('college_selection').hidden = set_to;
    }
});

let check_window_height = () => {
    if(window.innerHeight <= 900)
    {
        document.getElementById('signup-content').style = 'margin: auto';
    } else
    {
        document.getElementById('signup-content').style = 'margin: auto;margin-top: -50px';
    }
};

if(window.location.href.includes('/signup'))
{
    window.addEventListener('resize', () => { check_window_height(); });
}

document.addEventListener('DOMContentLoaded', () => {
    check_window_height();
    
    document.getElementById('loading_bar_gif').hidden = false;

    /* We want to continue to hide the loading bar. */
    document.getElementById('loading_bar_gif').style = 'display: none';
});

if(window.location.href.includes('signup'))
{
    document.getElementById('state').addEventListener('change', () => {
        const value = document.getElementById('state').value;

        let edit_hidden = (set_to) => {
            document.getElementById('college_icon').hidden = set_to;
            document.getElementById('college_selection').hidden = set_to;
            return;
        }

        let remove_all_options = () => {
            let options = document.getElementById('college').lastElementChild;
            while(options.innerHTML !== "Select")
            {
                document.getElementById('college').removeChild(options);
                options = document.getElementById('college').lastElementChild;
            }
        }

        let add_new_options = (state) => {
            fetch('/get_colleges_for_state1?state=' + state)
                .then((result) => { return result.json(); })
                .then((data) => {
                    let new_option;
                    for(let i = 0; i < data.Message.length; i++)
                        {
                            new_option = document.createElement('option');
                            new_option.value = data.Message[i];
                            new_option.innerText = data.Message[i];
                            new_option.style = 'color: #121212';
                            document.getElementById('college').appendChild(new_option);
                        }
                })
        }

        switch(value)
        {
            case '': edit_hidden(true); break;
            case 'Iowa':
                {
                    /* Make sure the `college` selection is not hidden. */
                    edit_hidden(false);

                    remove_all_options();
                    add_new_options(value);
                    break;
                }
            case 'Nebraska':
                {
                    /* Make sure the `college` selection is not hidden. */
                    edit_hidden(false);

                    remove_all_options();
                    add_new_options(value);
                    break;
                }
        }
    }, false);
}

function show_loading_bar(id)
{
    let is_good = true;

    /* Make sure all the inputs are filled out. */
    [].slice.call(document.querySelectorAll('[data-name*="account_info"]')).map((input) => {
        if(input.value === "") is_good = false;
    });

    if(is_good)
    {
        if(!document.getElementById('agree').checked)
            return;

        document.getElementById(id).hidden = true;

        document.getElementById('loading_bar').hidden = false;
        document.getElementById('loading_bar_gif').style = 'display: absolute;width:120px;height:120px'

    }
}

/* The below code goes for both the sign up and login page.
 * It will toggle the password from being readable to not being readable.
 * */
const passwordField = document.getElementById("password");
const togglePassword = document.querySelector(".password-toggle-icon i");

togglePassword.addEventListener("click", function () {
  if (passwordField.type === "password") {
    passwordField.type = "text";
    togglePassword.classList.remove("fa-eye");
    togglePassword.classList.add("fa-eye-slash");
  } else {
    passwordField.type = "password";
    togglePassword.classList.remove("fa-eye-slash");
    togglePassword.classList.add("fa-eye");
  }
});