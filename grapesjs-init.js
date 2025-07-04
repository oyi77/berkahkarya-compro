const params = new URLSearchParams(window.location.search);
const isEditMode = params.get('edit') === 'true';

if (isEditMode) {
    // Hide the original body to avoid flash of unstyled content
    document.body.style.display = 'none';

    // Fetch CSS and initialize the editor
    fetch('styles.css')
        .then(response => response.text())
        .then(css => {
            initializeGrapesJS(document.body.innerHTML, css);
        })
        .catch(error => {
            console.error('Error fetching styles:', error);
            // Initialize even if styles fail to load
            initializeGrapesJS(document.body.innerHTML, '');
        });
}

function initializeGrapesJS(html, css) {
    // Make body visible again for GrapesJS
    document.body.style.display = 'block';
    // Empty the body to house the editor
    document.body.innerHTML = '<div id="gjs"></div>';

    const editor = grapesjs.init({
        container: '#gjs',
        fromElement: true,
        height: '100vh',
        width: 'auto',
        storageManager: {
            id: 'gjs-local-',
            type: 'local',
            autosave: true,
            storeComponents: true,
            storeStyles: true,
            storeHtml: true,
            storeCss: true,
        },
        assetManager: {
            assets: [
                 'images/logo.png',
                 'images/team/member1.jpg',
                 'images/team/member2.jpg',
                 'images/team/member3.jpg',
                 'images/gallery/work1.jpeg',
                 'images/gallery/work2.jpeg',
                 'images/gallery/work3.jpeg',
                 'images/gallery/work4.jpeg',
                 'images/gallery/work5.jpeg',
                 'images/gallery/work6.jpeg',
            ],
            upload: false, // Disable default upload
        },
        // We will load the initial content via components and styles
        components: html,
        style: css,
    });

    // Add a command to save the editor content
    editor.Commands.add('save-db', {
        run: function(editor, sender) {
            sender && sender.set('active', 0);
            editor.store();
            // Here you would typically post the data to a server
            const html = editor.getHtml();
            const css = editor.getCss();
            console.log('HTML:', html);
            console.log('CSS:', css);
            alert('Content saved! Check the console.');
        }
    });

    // Add a button to the top panel to trigger the save command
    editor.Panels.addButton('options',
        [{
            id: 'save-db',
            className: 'fa fa-floppy-o',
            command: 'save-db',
            attributes: {
                title: 'Save'
            }
        }]
    );
} 