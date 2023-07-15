import translations from '../../public/text/translations';
import Swal from 'sweetalert2'


export const GoBackAlert = (handleBack, time, lang) => {
    Swal.fire({
        title: translations?.brain_break_alert_title[lang],
        html: lang === 'en' ? `Back in ${time} seconds.` : `Volveremos en ${time} segundos.`,
        timer: time ? parseInt(time) * 1000: 10000,
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
        },

        }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            handleBack()
        }
        })
}