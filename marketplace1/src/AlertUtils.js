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
    static async showResetPassPopUp(){
 
        var steps = [
            {
                title: 'Reset Code',
                inputId: "reset_code",
                inputPlaceholder: "reset code",
                text: 'Chaining swal2 modals is easy',
                preConfirm: (value) =>
                {
                    return new Promise((resolve, reject)=>
                    {
                        
                        if (value) {
                            resolve();
                        } else {
                            reject('Please type something in the step 1!');
                        }
                    });
                }
            },
            {
                title: 'new password',
                text: 'please enter your new password here',
                inputId: "new_pass",
                inputPlaceholder: "new password",
                preConfirm: function(value)
                {
                    return new Promise(function(resolve, reject)
                    {
                        if (value) {
                            resolve();
                        } else {
                            reject('Please type something in the step 2!');
                        }
                    });
                }

            },

        ];
        Swal.mixin({
            input: 'text',
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            animation: true,
            progressSteps: ['1', '2']
          }).queue(steps).then(result =>{
            return Swal.fire({
                title: 'All done!',
                html:
                    'Your answers: <pre>' +
                    (result) +
                    '</pre>',
                confirmButtonText: 'Lovely!',
                showCancelButton: false
            });
          })
    
    }

}
export default AlertUtils;