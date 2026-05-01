import Swal from "sweetalert2";

export default function useConfirm() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "confirm-btn",
            cancelButton: "cancel-btn",
            popup: "my-popup",
        },
        buttonsStyling: false,
    });

    const confirmAction = async ({
        title = "Are you sure?",
        text = "You won't be able to revert this!",
        confirmText = "Yes, confirm!",
        cancelText = "Cancel",
    } = {}) => {
        const result = await swalWithBootstrapButtons.fire({
            title,
            text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: confirmText,
            cancelButtonText: cancelText,
            reverseButtons: true
        });

        if (result.isConfirmed) {
            await swalWithBootstrapButtons.fire({
                title: "Done!",
                text: "Action completed successfully.",
                icon: "success"
            });
            return true;
        }

        if (result.dismiss === Swal.DismissReason.cancel) {
            await swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your action has been cancelled.",
                icon: "error"
            });
            return false;
        }
    };

    return confirmAction;
}