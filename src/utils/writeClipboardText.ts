import Swal from 'sweetalert2';

export const writeClipboardText = async (url = '') => {
  try {
    await navigator.clipboard.writeText(url);
    Swal.fire({
      title: 'Link copied!',
      timer: 500,
    });
  } catch (error) {
    if (error instanceof Error) {
      return console.error(error.message);
    }
  }
};
