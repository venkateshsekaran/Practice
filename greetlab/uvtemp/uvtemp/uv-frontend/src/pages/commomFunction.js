import jsPDF from 'jspdf'
import 'jspdf-autotable'

const handleDownload = (obj) => {
    console.log(obj, 'obj')
    const doc = new jsPDF()
    doc.autoTable(obj)
    doc.save("list.pdf");
}

export default handleDownload