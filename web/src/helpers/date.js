import moment from 'moment';
import 'moment/dist/locale/es.js'

moment.updateLocale('es', {
    week: {
        dow: 0
    }
});

export default {

    convert: (value, format = 'DD/MM/YYYY', type = 'date') => {

        if(value == '' || value == null){
            return '';
        }

        moment.locale('es');

        if(value == 'current'){

            return moment().format(format);
            
        } else {

            if(type == 'date'){

                return moment(value, 'YYYY-MM-DD').format(format);

            } else if(type == 'dateHour'){

                return moment(value, 'YYYY-MM-DD HH:mm:ss').format(format);

            }  else {

                return moment(value, type).format(format);

            }            

        }

    },

    firstDayMonth: () => {

        return moment().startOf('month').format('YYYY-MM-DD');

    },

    endDayMonth: () => {

        return moment().endOf('month').format('YYYY-MM-DD');

    }

}