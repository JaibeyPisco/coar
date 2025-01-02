
export default {

    file: function(path, fileName){

        return API({
            url: 'shared/download/file',
            method: 'POST',
            data:{
                path: path,
                fileName: fileName
            },
            responseType: 'blob',
        })
        .then(response => {
            const href = window.URL.createObjectURL(response.data);
    
            const anchorElement = document.createElement('a');
    
            anchorElement.href = href;
            anchorElement.download = fileName;
    
            document.body.appendChild(anchorElement);
            anchorElement.click();
    
            document.body.removeChild(anchorElement);
            window.URL.revokeObjectURL(href);
        })
        .catch(error => {
            console.log('error: ', error);
        });
    
    },

    url: (url) => {

        return API({
            url: url,
            method: 'GET',
            responseType: 'blob',
        })
        .then(response => {
            const href = window.URL.createObjectURL(response.data);
    
            const anchorElement = document.createElement('a');
    
            anchorElement.href = href;
            anchorElement.download = response.headers['filename'];
    
            document.body.appendChild(anchorElement);
            anchorElement.click();
    
            document.body.removeChild(anchorElement);
            window.URL.revokeObjectURL(href);
        })
        .catch(error => {
            console.log('error: ', error);
        });

    }

}
