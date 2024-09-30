window.addEventListener('load', () => {
    document.getElementById('college_icon').hidden = true;
    document.getElementById('college_selection').hidden = true;
});

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
        fetch('/get_colleges_for_state?state=' + state)
            .then((result) => { return result.json(); })
            .then((data) => {
                let new_option;
                for(let i = 0; i < data.Message.length; i++)
                    {
                        new_option = document.createElement('option');
                        new_option.value = data.Message[i];
                        new_option.innerText = data.Message[i];
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