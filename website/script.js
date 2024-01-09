let pdf = '';
let uploadURL = '';

function onFileChange(event) {
  const files = event.target.files || event.dataTransfer.files;
  if (!files.length) return;
  createPDF(files[0]);
}

function createPDF(file) {
  const reader = new FileReader();

  reader.onload = (e) => {
    if (!e.target.result.includes('data:application/pdf')) {
      return alert('Wrong file type - PDF only.');
    }
    if (e.target.result.length > 1000000) {
      return alert('PDF is too large - 1Mb maximum');
    }

    pdf = e.target.result;
    document.getElementById('pdfContainer').style.display = 'block';
  };

  reader.readAsDataURL(file);
}

function removePDF() {
  pdf = '';
  document.getElementById('pdfContainer').style.display = 'none';
}

async function uploadPDF() {
  const response = await fetch('LAMBDA URL');
  const presignedURL = await response.json();

  let binary = atob(pdf.split(',')[1]);
  let array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  let blobData = new Blob([new Uint8Array(array)], { type: 'application/pdf' });

  const result = await fetch(presignedURL.uploadURL, {
    method: 'PUT',
    body: blobData
  });

  document.getElementById('successMessage').style.display = 'block';
  document.getElementById('uploadURL').style.display = 'block';
  document.getElementById('uploadURL').href = presignedURL.uploadURL.split('?')[0];
}
