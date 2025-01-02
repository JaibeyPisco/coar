

export default ({
    size = '48',
    color = '#1976d2',
    width = 4,
    alignCenter = false
} = {}) => {

    let preloader = `
        <div role="progressbar" aria-valuemin="0" aria-valuemax="1"
            class="mdc-circular-progress  mdc-circular-progress--indeterminate " style="width:${size}px;height:${size}px;">
            <!--?lit$517624215$-->
            <div class="mdc-circular-progress__determinate-container">
                <svg class="mdc-circular-progress__determinate-circle-graphic" viewBox="0 0 48 48">
                    <circle class="mdc-circular-progress__determinate-track" cx="24" cy="24" r="18" stroke-width="${width}"></circle>
                    <circle class="mdc-circular-progress__determinate-circle" cx="24" cy="24" r="18"
                        stroke-dasharray="113.0973336" stroke-dashoffset="113.0973336" stroke-width="${width}"></circle>
                </svg>
            </div>
            <!--?lit$517624215$-->
            <div class="mdc-circular-progress__indeterminate-container">
                <div class="mdc-circular-progress__spinner-layer">
                    <!--?lit$517624215$-->
                    <div class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left">
                        <svg class="mdc-circular-progress__indeterminate-circle-graphic" viewBox="0 0 48 48">
                            <circle cx="24" cy="24" r="18" stroke-dasharray="113.0973336" stroke-dashoffset="56.5486668"
                                stroke-width="${width}" stroke="${color}"></circle>
                        </svg>
                    </div>
                    <div class="mdc-circular-progress__gap-patch">
                        <svg class="mdc-circular-progress__indeterminate-circle-graphic" viewBox="0 0 48 48">
                            <circle cx="24" cy="24" r="18" stroke-dasharray="113.0973336" stroke-dashoffset="56.5486668"
                                stroke-width="3.2" stroke="${color}"></circle>
                        </svg>
                    </div>
                    <div class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right">
                        <svg class="mdc-circular-progress__indeterminate-circle-graphic" viewBox="0 0 48 48">
                            <circle cx="24" cy="24" r="18" stroke-dasharray="113.0973336" stroke-dashoffset="56.5486668"
                                stroke-width="${width}" stroke="${color}"></circle>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    `;

    if(alignCenter == true){

        preloader = `
            <div style="display:table; height:100%; width:100%;">
                <div style="display:table-cell; text-align:center; vertical-align:middle;">
                    ${preloader}
                </div>
            </div>
        `;

    }

    return preloader;

}