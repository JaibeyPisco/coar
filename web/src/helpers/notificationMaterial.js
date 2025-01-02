let eView;

export default function(message = null, type = 'info', {
    delay = 2000,
    description = ''
} = {}){

    if(message == null){
        return false;
    }

    let toasContainer = document.querySelector('toast');

    if(toasContainer == null){

        document.querySelector('body').insertAdjacentHTML('beforeend', `
            <toast>
                <div class="position-fixed bottom-0 right-0 p-3" style="z-index: 5; right: 0; bottom: 0;">
                    <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true" data-delay="${delay}">
                        
                    </div>
                </div>
            </toast>
        `);

        toasContainer = document.querySelector('toast');

    }

    let color = '';

    switch (type) {
        case 'info':
            color = '#007aff';
        break;
        
        case 'success':
            color = '#23C26E';
        break;

        case 'error':
            color = '#E9331D';
        break;

        case 'warning':
            color = '#E9B11D';
        break;
       
    }

    toasContainer.querySelector('.toast').innerHTML = `
        
        <div class="toast-header">
            <svg class="bd-placeholder-img rounded mr-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img"><rect width="100%" height="100%" fill="${color}"/></svg>
            <strong class="mr-auto">${message}</strong>           
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true" style="margin-top:7px;">&times;</span>
            </button>
        </div>     
        ${description != '' ? `

        <div class="toast-body">${description}</div>
        
        ` : ''}
    `;
    
    setTimeout(() => {
        $('.toast').toast('show'); 
    }, 100);

}