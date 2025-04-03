document.addEventListener("DOMContentLoaded", function() {

    const page = Number(document.getElementById('curr_page').textContent)
    
    fetch(`/api/data/page-${page}`)
    .then(response => response.json())
    .then(data => {
        data.dtsrc.forEach((path,index)=> {
        const main = document.getElementById('foo')
        const itemdiv = document.createElement('div')
        itemdiv.classList = 'item'
        const img = document.createElement('img');
        id = path.match(/(\d*)\.jpg/)[0]
        img.src = path
        img.dataset.src = `static/images/${id}`
        img.classList = 'image'
        img.alt = 'Photo'
        img.dataset.index = index;
        itemdiv.appendChild(img)
        main.appendChild(itemdiv)
            
        });
        

    const imgsobserver = document.querySelectorAll('.item img')

    const options = {
        threshold: 0.7,
        root: null
    };

    const observer = new IntersectionObserver(entries =>{
        entries.forEach(entry =>{
            if (entry.isIntersecting){
                const img = entry.target;
                img.src = img.dataset.src; 
                observer.unobserve(entry.target) 
            }

        });

    },options);
    imgsobserver.forEach(im =>{
    observer.observe(im)
    })
    })

})

// modal
//*********************************************************/
document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.getElementById("foo");
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("img01");
    const body = document.body;
  
    // Function to open modal
    function openModal(src) {
        modal.style.display = "block";
        modalImg.src = src;
        body.classList.add('modal-open');
    }
  
    // Function to close modal
    function closeModal() {
        modal.style.display = "none";
        body.classList.remove('modal-open');
    }
  
  
    // Event listener for opening modal
    gallery.addEventListener('click', function(e) {
        if (e.target && e.target.nodeName === 'IMG') {
            openModal(e.target.src);
        }
    });
  
    // Event listener for closing modal
    modal.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('close')) {
            closeModal();
        }
    });
  });



// ******************************************************************

function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDarkScheme ? 'dark' : 'light');
    }
}


const themeToggleBtn = document.getElementById('theme-toggle');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

themeToggleBtn.addEventListener('click', toggleTheme);

// Apply the saved theme on initial load
applySavedTheme();
