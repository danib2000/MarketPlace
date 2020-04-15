import Swal from 'sweetalert2';

class AlertUtils {

    static async showGeneralSuccessPopUp(message, allowOutsideClick, cancelButtonText, icon){
        return Swal.fire({
            icon: icon,
            html: message,
            allowOutsideClick: allowOutsideClick ? true : false,
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            showCancelButton: cancelButtonText ? true : false,
            cancelButtonText: cancelButtonText
        });
    }
    static async showLogInpopUp(){
        return Swal.fire({
            icon: 'success',
            title: 'Signed in successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          });
          
    }

}
export default AlertUtils;