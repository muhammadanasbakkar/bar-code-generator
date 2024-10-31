

// import { useState } from 'react';
// import jsBarcode from 'jsbarcode';
// import Papa from 'papaparse';

// export default function Home() {
//   const [barcodes, setBarcodes] = useState<string[]>([]);
//   const [width, setWidth] = useState<number>(1);
//   const [height, setHeight] = useState<number>(70);
//   const [color, setColor] = useState<string>('#000000');
//   const [background, setBackground] = useState<string>('#ffffff');
//   const [margin, setMargin] = useState<number>(4);

//   const generateBarcode = (text: string): string => {
//     try {
//       const canvas = document.createElement('canvas');
//       jsBarcode(canvas, text, {
//         width: width,
//         height: height,
//         displayValue: true,
//         background: background,
//         lineColor: color,
//         margin: margin,
//       });
//       return canvas.toDataURL('image/png');
//     } catch (error) {
//       console.error('Error generating barcode', error);
//       return '';
//     }
//   };

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     Papa.parse(file, {
//       header: true,
//       complete: (results) => {
//         const data = results.data as Record<string, string>[];
//         const generatedBarcodes = data.map((row) => {
//           const concatenatedRow = Object.values(row).join(' ');
//           return generateBarcode(concatenatedRow);
//         });
//         setBarcodes(generatedBarcodes);
//       },
//     });
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
//       <h1>Barcode Generator</h1>

//       {/* Form Section */}
//       <div style={{
//         backgroundColor: '#fff',
//         padding: '20px',
//         borderRadius: '8px',
//         boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//         width: '100%',
//         maxWidth: '800px',
//         marginBottom: '20px',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center'
//       }}>
//         <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '10px', width: '100%' }}>
//           <label style={{ flexGrow: 1 }}>
//             Width:
//             <input
//               type="number"
//               value={width}
//               onChange={(e) => setWidth(parseInt(e.target.value))}
//               style={{ marginLeft: '10px', width: '100%' }}
//             />
//           </label>
//           <label style={{ flexGrow: 1 }}>
//             Height:
//             <input
//               type="number"
//               value={height}
//               onChange={(e) => setHeight(parseInt(e.target.value))}
//               style={{ marginLeft: '10px', width: '100%' }}
//             />
//           </label>
//           <label style={{ flexGrow: 1 }}>
//             Foreground Color:
//             <input
//               type="color"
//               value={color}
//               onChange={(e) => setColor(e.target.value)}
//               style={{ marginLeft: '10px', width: '100%' }}
//             />
//           </label>
//           <label style={{ flexGrow: 1 }}>
//             Background Color:
//             <input
//               type="color"
//               value={background}
//               onChange={(e) => setBackground(e.target.value)}
//               style={{ marginLeft: '10px', width: '100%' }}
//             />
//           </label>
//           <label style={{ flexGrow: 1 }}>
//             Margin:
//             <input
//               type="number"
//               value={margin}
//               onChange={(e) => setMargin(parseInt(e.target.value))}
//               style={{ marginLeft: '10px', width: '100%' }}
//             />
//           </label>
//         </div>
//         <input type="file" accept=".csv" onChange={handleFileUpload} style={{ marginTop: '20px', width: '100%' }} />
//       </div>

//       {/* Barcodes Display Section */}
//       <div style={{
//         backgroundColor: '#fff',
//         padding: '20px',
//         borderRadius: '8px',
//         boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//         width: '100%',
//         maxWidth: '800px',
//         display: 'grid',
//         gridTemplateColumns: "repeat(2, 1fr)",
//         // flexDirection: 'column',
//         gap: '10px',
//         alignItems: 'center'
//       }}>
//         {barcodes.map((code, index) => (
//           <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
//             <div style={{ textAlign: 'left', width: '100%', marginBottom: '10px' }}>
//               <p>STYLE: ExampleStyle</p>
//               <p>COLOR: ExampleColor</p>
//               <p>SIZE: ExampleSize</p>
//               <p>PO: ExamplePO</p>
//             </div>
//             <img src={code} alt={`Barcode ${index + 1}`} style={{ maxWidth: '100%' }} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

'use client'

// import { useState } from 'react';
// import jsBarcode from 'jsbarcode';
// import * as XLSX from 'xlsx'

// export default function Home() {
//     const [barcodes, setBarcodes] = useState<string[]>([]);
//     const [width, setWidth] = useState<number>(1); // Reduced width for narrower barcodes
//     const [height, setHeight] = useState<number>(200); // Adjusted height to maintain proportions
//     const [color, setColor] = useState<string>('#000000');
//     const [background, setBackground] = useState<string>('#ffffff');
//     const [margin, setMargin] = useState<number>(0); // Remove margin for tighter layout
//     const [data, setData] = useState([])
//     const [format, setFormat] = useState<string>('')

//     const handleSelectChange = (event: any) => {
//         const selectedFormat = event.target.value;
//         if (selectedFormat === 'UPC') {
//             setFormat('UPC');
//         } else if (selectedFormat === 'EAN-13') {
//             setFormat('EAN-13');
//         }
//     };

//     const generateBarcode = (text: string): string => {
//         try {
//             const canvas = document.createElement('canvas');
//             jsBarcode(canvas, text, {
//                 width: width,
//                 height: height,
//                 displayValue: false,
//                 background: background,
//                 lineColor: color,
//                 margin: margin,
//                 format: format
//             });
//             return canvas.toDataURL('image/png');
//         } catch (error) {
//             console.error('Error generating barcode', error);
//             return '';
//         }
//     };

//     // data?.map((item:any, ind:any)=>{
//     //     console.log(data[ind],'111')
//     // })

//     const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (!file) return;

//         const reader = new FileReader();
//         reader.onload = (e) => {
//             const arrayBuffer = e.target?.result as ArrayBuffer;
//             if (!arrayBuffer) {
//                 console.error('Failed to read file.');
//                 return;
//             }

//             const data = new Uint8Array(arrayBuffer);
//             const workbook = XLSX.read(data, { type: 'array' });

//             // Assume the first sheet
//             const firstSheetName = workbook.SheetNames[0];
//             console.log(firstSheetName, 'firstSheetName')
//             const worksheet = workbook.Sheets[firstSheetName];
//             console.log(worksheet, 'worksheet')
//             const jsonData: any = XLSX.utils.sheet_to_json<Record<string, string>>(worksheet, { header: 1 });
//             setData(jsonData)
//             // Process the data
//             const generatedBarcodes = jsonData.map((row) => {
//                 const concatenatedRow = row.join(' ');
//                 return generateBarcode(concatenatedRow);
//             });
//             setBarcodes(generatedBarcodes);
//         };

//         reader.onerror = (error) => {
//             console.error('Error reading file:', error);
//         };

//         reader.readAsArrayBuffer(file);
//     };

//     const handlePrint = () => {
//         localStorage.setItem(
//             'BarCode',
//             JSON.stringify(data)
//         );
//         window.open('/print/BarCode', '_blank');

//         //         const printContent = document.getElementById('printable-area');
//         //         if (printContent) {
//         //             const printWindow = window.open('', '_blank');
//         //             if (printWindow) {
//         //                 printWindow.document.write('<html><head><title>Print Barcode</title>');
//         //                 printWindow.document.write('<style>');
//         //                 printWindow.document.write(`
//         //                     @media print {
//         //                       body * {
//         //                         background-color: white;

//         //                         //   min-height: 10in;
//         //   width: 10px;
//         // //   margin: 0;
//         // //   font-size: 9px;
//         //                         // visibility: hidden;
//         //                       }
//         //                       #printable-area, #printable-area * {
//         //                         visibility: visible;
//         //                                   display:grid;
//         //                                           grid-template-columns: repeat(2, 1fr);
//         //                       }
//         //                       #printable-area {
//         //                         position: absolute;
//         //                         left: 0;
//         //                         top: 0;
//         //                         width: 100%;
//         //                         padding: 20px;
//         //                         display: grid;
//         //                         flex-wrap: wrap;
//         //                                   display:grid;
//         //                                           grid-template-columns: repeat(2, 1fr);
//         //                         // justify-content: space-between;
//         //                       }
//         //                       .barcode-container {

//         //                         width: 48%; /* Adjust this for 2 barcodes per row */
//         //                         box-sizing: border-box;
//         //                         padding: 10px;
//         //                         margin-bottom: 20px;
//         //                         border: 1px solid #ddd;
//         //                       }
//         //                     }
//         //                   `);
//         //                 printWindow.document.write('</style></head><body>');
//         //                 printWindow.document.write(printContent.innerHTML);
//         //                 printWindow.document.write('</body></html>');
//         //                 printWindow.document.close();
//         //                 printWindow.focus();
//         //                 printWindow.print();
//         //                 printWindow.close();
//         //             }
//         //         }
//     };

//     console.log(data, '5555')

//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
//             <h1>Barcode Generator</h1>

//             {/* Form Section */}
//             <div style={{
//                 backgroundColor: '#fff',
//                 padding: '20px',
//                 borderRadius: '8px',
//                 boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//                 width: '100%',
//                 maxWidth: '600px', // Adjusted max-width to fit narrower barcodes
//                 marginBottom: '20px',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center'
//             }}>
//                 <label>Select Style</label>
//                 <select onChange={handleSelectChange}>
//                     <option>UPC</option>
//                     <option>EAN-13</option>
//                 </select><br />
//                 <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '10px', width: '100%' }}>

//                     <label style={{ flexGrow: 1 }}>
//                         Width:
//                         <input
//                             type="number"
//                             value={width}
//                             onChange={(e) => setWidth(parseInt(e.target.value))}
//                             style={{ marginLeft: '10px', width: '100%' }}
//                         />
//                     </label>
//                     <label style={{ flexGrow: 1 }}>
//                         Height:
//                         <input
//                             type="number"
//                             value={height}
//                             onChange={(e) => setHeight(parseInt(e.target.value))}
//                             style={{ marginLeft: '10px', width: '100%' }}
//                         />
//                     </label>
//                     <label style={{ flexGrow: 1 }}>
//                         Foreground Color:
//                         <input
//                             type="color"
//                             value={color}
//                             onChange={(e) => setColor(e.target.value)}
//                             style={{ marginLeft: '10px', width: '100%' }}
//                         />
//                     </label>
//                     <label style={{ flexGrow: 1 }}>
//                         Background Color:
//                         <input
//                             type="color"
//                             value={background}
//                             onChange={(e) => setBackground(e.target.value)}
//                             style={{ marginLeft: '10px', width: '100%' }}
//                         />
//                     </label>
//                     <label style={{ flexGrow: 1 }}>
//                         Margin:
//                         <input
//                             type="number"
//                             value={margin}
//                             onChange={(e) => setMargin(parseInt(e.target.value))}
//                             style={{ marginLeft: '10px', width: '100%' }}
//                         />
//                     </label>
//                 </div>
//                 <input type="file" accept=".xlsx" onChange={handleFileUpload} style={{ marginTop: '20px', width: '100%' }} />
//             </div>

//             {/* Print Button */}
//             <button onClick={handlePrint} style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer' }}>Print Barcodes</button>

//             {/* Barcodes Display Section */}
//             <div id="printable-area" style={{
//                 backgroundColor: '#fff',
//                 padding: '10px',
//                 borderRadius: '8px',
//                 boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//                 width: '100%',
//                 maxWidth: '600px', // Adjusted max-width to fit narrower barcodes
//                 display: 'grid',
//                 gridTemplateColumns: "repeat(2, 1fr)",
//                 flexDirection: 'column',
//                 gap: '10px',
//                 alignItems: 'center'
//             }}>
//                 {barcodes.map((code, index) => (
//                     <div key={index} className="barcode-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', border: '1px solid #ddd', padding: '10px', width: '100%', height: "230px" }}>
//                         <div style={{ textAlign: 'left', width: '100%', marginBottom: '10px' }}>
//                             {/* {data?.map((item: any, index: any) => (
//                                 <> */}
//                             {/* <p>Style : {index[0]}</p>
//                                     <p></p>
//                                     <p>SIZE: {item[2]}</p>
//                                     <p>PO: {item[1]}</p> */}
//                             {/* </>
//                             ))} */}
//                             <p>A</p>
//                             <p>B</p>
//                             <p>C</p>
//                             <p>D</p>

//                         </div>
//                         <img src={code} alt={`Barcode ${index + 1}`} style={{ maxWidth: '100%' }} />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// import { useState, useEffect } from 'react';
// import jsBarcode from 'jsbarcode';
// import * as XLSX from 'xlsx';

// export default function Home() {
//     const [barcodes, setBarcodes] = useState<string[]>([]);
//     const [width, setWidth] = useState<number>(2); // Reduced width for narrower barcodes
//     const [height, setHeight] = useState<number>(100); // Adjusted height to maintain proportions
//     const [color, setColor] = useState<string>('#000000');
//     const [background, setBackground] = useState<string>('#ffffff');
//     const [margin, setMargin] = useState<number>(0); // Remove margin for tighter layout
//     const [data, setData] = useState<string[][]>([]);
//     const [format, setFormat] = useState<string>('UPC'); // Default to UPC format


//     const handleSelectChange = (event: any) => {
//         setFormat(event.target.value);
//     };

//     const generateBarcode = (text: string): string => {
//         try {
//             const canvas = document.createElement('canvas');
//             canvas.width = 300; // Increase the width
//             canvas.height = 150; // Increase the height
//             jsBarcode(canvas, text, {
//                 width: width,
//                 height: height,
//                 displayValue: true,
//                 background: background,
//                 fontOptions: 'bold', // Optional: Make the text bold
//                 font: 'Arial', // Set font type
//                 fontSize: 20,  // Set font size
//                 textMargin: 5, // Margin between text and barcode
//                 lineColor: color,
//                 margin: margin,
//                 format: format
//             });
//             return canvas.toDataURL('image/png');
//         } catch (error) {
//             console.error('Error generating barcode', error);
//             return '';
//         }
//     };

//     const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (!file) return;

//         const reader = new FileReader();
//         reader.onload = (e) => {
//             const arrayBuffer = e.target?.result as ArrayBuffer;
//             if (!arrayBuffer) {
//                 console.error('Failed to read file.');
//                 return;
//             }

//             const data = new Uint8Array(arrayBuffer);
//             const workbook = XLSX.read(data, { type: 'array' });

//             // Assume the first sheet
//             const firstSheetName = workbook.SheetNames[0];
//             const worksheet = workbook.Sheets[firstSheetName];
//             const jsonData: string[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//             setData(jsonData);

//             // Generate barcodes dynamically based on file content
//             // const generatedBarcodes = jsonData.map((row) => {
//             //     const concatenatedRow = row.join(' ');
//             //     return generateBarcode(concatenatedRow);
//             // });
//             // setBarcodes(generatedBarcodes);

//             const generatedBarcodes = jsonData.map((item: any) => {

//                 const upc = item[5];
//                 if (upc) {
//                     return generateBarcode(upc);
//                 } else {
//                     console.warn('UPC code missing in data:', item);  // Debug log
//                     return '';
//                 }
//             });
//             console.log(generatedBarcodes, 'generatedBarcodes')

//             setBarcodes(generatedBarcodes.filter(Boolean));  // Filter out any empty barcodes
//         };

//         reader.onerror = (error) => {
//             console.error('Error reading file:', error);
//         };

//         reader.readAsArrayBuffer(file);
//     };

//     const handlePrint = () => {
//         localStorage.setItem('BarCode', JSON.stringify(data));
//         window.open('/print/BarCode', '_blank');
//     };

//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
//             <h1>Barcode Generator</h1>

//             {/* Form Section */}
//             <div style={{
//                 backgroundColor: '#fff',
//                 padding: '20px',
//                 borderRadius: '8px',
//                 boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//                 width: '100%',
//                 maxWidth: '600px',
//                 marginBottom: '20px',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 // alignItems: 'center'
//             }}>
//                 <div>
//                     <input type='text' />
//                     <select onChange={handleSelectChange} value={format}>
//                         <option value="UPC">UPC</option>
//                         <option value="EAN-13">EAN-13</option>
//                     </select>
//                 </div>
//                 <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '10px', width: '100%' }}>
//                     <label style={{ flexGrow: 1 }}>
//                         Bar Width:
//                         <input
//                             type="range"
//                             value={width}
//                             onChange={(e) => setWidth(parseInt(e.target.value))}
//                             style={{ marginLeft: '10px', width: '100%' }}
//                         />
//                     </label>
//                 </div>
//                 <div>

//                     <label style={{ flexGrow: 1 }}>
//                         Bar Height:
//                         <input
//                             type="range"
//                             value={height}
//                             onChange={(e) => setHeight(parseInt(e.target.value))}
//                             style={{ marginLeft: '10px', width: '100%' }}
//                         />
//                     </label>
//                     <label style={{ flexGrow: 1 }}>
//                         Margin:
//                         <input
//                             type="range"
//                             value={margin}
//                             onChange={(e) => setMargin(parseInt(e.target.value))}
//                             style={{ marginLeft: '10px', width: '100%' }}
//                         />
//                     </label>
//                     <label style={{ flexGrow: 1 }}>
//                         Line Color:
//                         <input
//                             type="color"
//                             value={color}
//                             onChange={(e) => setColor(e.target.value)}
//                             style={{ marginLeft: '10px', width: '100%' }}
//                         />
//                     </label>
//                     <label style={{ flexGrow: 1 }}>
//                         Background Color:
//                         <input
//                             type="color"
//                             value={background}
//                             onChange={(e) => setBackground(e.target.value)}
//                             style={{ marginLeft: '10px', width: '100%' }}
//                         />
//                     </label>

//                 </div>
//                 <input type="file" accept=".xlsx" onChange={handleFileUpload} style={{ marginTop: '20px', width: '100%' }} />
//             </div>

//             {/* Print Button */}
//             <button onClick={handlePrint} style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer' }}>Print Barcodes</button>

//             {/* Barcodes Display Section */}
//             <div id="printable-area" style={{
//                 backgroundColor: '#fff',
//                 padding: '10px',
//                 borderRadius: '8px',
//                 boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//                 width: '100%',
//                 maxWidth: '600px',
//                 display: 'grid',
//                 gridTemplateColumns: "repeat(2, 1fr)",
//                 gap: '10px',
//                 alignItems: 'center'
//             }}>
//                 {data.slice(1).map((row, index) => {
//                     const barcode = barcodes[index] || ''; // Ensure there's a barcode or use an empty string
//                     console.log('Generating barcode for:', barcode);
//                     console.log(barcodes[4], '555')
//                     return (
//                         <div key={index} className="barcode-container" style={{
//                             display: 'flex', flexDirection: 'column', alignItems: 'center',
//                             marginBottom: '20px', border: '1px solid #ddd', padding: '10px',
//                             width: '100%', height: "230px"
//                         }}>
//                             <div style={{ textAlign: 'left', width: '100%', marginBottom: '10px' }}>
//                                 <p>STYLE  : {row[0]}</p>
//                                 <p>COLOR  : {row[4]}</p>
//                                 <p>SIZE   : {row[2]}</p>
//                                 <p>PO     : {row[3]}</p>
//                             </div>
//                             {barcode ? (
//                                 <img src={barcodes[index]} alt={`Barcode ${index + 1}`} style={{ maxWidth: '100%' }} />
//                             ) : (
//                                 <p style={{ color: 'red' }}>Error generating barcode</p>
//                             )}
//                         </div>
//                     );
//                 })}
//                 {/* {data.map((row, index) => (
//                     <div key={index} className="barcode-container" style={{
//                         display: 'flex', flexDirection: 'column', alignItems: 'center',
//                         marginBottom: '20px', border: '1px solid #ddd', padding: '10px',
//                         width: '100%', height: "230px"
//                     }}>
//                         <div style={{ textAlign: 'left', width: '100%', marginBottom: '10px' }}>
//                             <p>STYLE  : {row[0]}</p>
//                             <p>COLOR  : {row[1]}</p>
//                             <p>SIZE   : {row[2]}</p>
//                             <p>PO     : {row[3]}</p>
//                         </div>
//                         <img src={barcodes[index]} alt={`Barcode ${index + 1}`} style={{ maxWidth: '100%' }} />
//                     </div>
//                 ))} */}
//                 {/* {barcodes.map((code, index) => (
//                     <div key={index} className="barcode-container" style={{
//                         display: 'flex', flexDirection: 'column', alignItems: 'center',
//                         marginBottom: '20px', border: '1px solid #ddd', padding: '10px',
//                         width: '100%', height: "230px"
//                     }}>
//                         <div style={{ textAlign: 'left', width: '100%', marginBottom: '10px' }}>
//                         </div>
//                         <img src={code} alt={`Barcode ${index + 1}`} style={{ maxWidth: '100%' }} />
//                     </div>
//                 ))} */}
//                 {/* Replace with dynamic content based on your data structure */}
//                 {/* {data[index]?.map((item, itemIndex) => (
//                     <p key={itemIndex}>{item}</p>
//                 ))} */}
//             </div>
//         </div>
//     );
// }

'use client'


// import { useState, useEffect } from 'react';
// import jsBarcode from 'jsbarcode';
// import * as XLSX from 'xlsx';

// export default function Home() {
//     const [barcodes, setBarcodes] = useState<string[]>([]);
//     const [width, setWidth] = useState<number>(2); // Reduced width for narrower barcodes
//     const [height, setHeight] = useState<number>(100); // Adjusted height to maintain proportions
//     const [color, setColor] = useState<string>('#000000');
//     const [background, setBackground] = useState<string>('#ffffff');
//     const [margin, setMargin] = useState<number>(0); // Remove margin for tighter layout
//     const [data, setData] = useState<string[][]>([]);
//     const [format, setFormat] = useState<string>('UPC'); // Default to UPC format
//     const [inputValue, setInputValue] = useState<string>(''); // State to hold user input
//     const [inputBarcode, setInputBarcode] = useState<string>('');

//     const handleSelectChange = (event: any) => {
//         setFormat(event.target.value);
//     };

//     const inchToPixel = (inches: number) => {
//         return inches * 96; 
//     };

//     const generateBarcode = (text: string): string => {
//         try {
//             const canvas = document.createElement('canvas');
//             canvas.width = 300; // Increase the width
//             canvas.height = 150; // Increase the height
//             jsBarcode(canvas, text, {
//                 width: inchToPixel(width),
//                 height: inchToPixel(height),
//                 displayValue: true,
//                 background: background,
//                 fontOptions: 'bold', // Optional: Make the text bold
//                 font: 'Arial', // Set font type
//                 fontSize: 20,  // Set font size
//                 textMargin: 5, // Margin between text and barcode
//                 lineColor: color,
//                 margin: margin,
//                 format: format
//             });
//             return canvas.toDataURL('image/png');
//         } catch (error) {
//             console.error('Error generating barcode', error);
//             return '';
//         }
//     };

//     useEffect(() => {
//         // Regenerate barcodes when any parameter or data changes
//         const generatedBarcodes = data.slice(1).map((item: any) => {
//             const upc = item[5];
//             if (upc) {
//                 return generateBarcode(upc);
//             } else {
//                 console.warn('UPC code missing in data:', item);  // Debug log
//                 return '';
//             }
//         });
//         setBarcodes(generatedBarcodes.filter(Boolean));  // Filter out any empty barcodes
//     }, [width, height, color, background, margin, format, data]); // Dependencies array

//     useEffect(() => {
//         if (inputValue) {
//             setInputBarcode(generateBarcode(inputValue));
//         } else {
//             setInputBarcode('');
//         }
//     }, [inputValue, width, height, color, background, margin, format]);



//     const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (!file) return;

//         const reader = new FileReader();
//         reader.onload = (e) => {
//             const arrayBuffer = e.target?.result as ArrayBuffer;
//             if (!arrayBuffer) {
//                 console.error('Failed to read file.');
//                 return;
//             }

//             const data = new Uint8Array(arrayBuffer);
//             const workbook = XLSX.read(data, { type: 'array' });

//             const firstSheetName = workbook.SheetNames[0];
//             const worksheet = workbook.Sheets[firstSheetName];
//             const jsonData: string[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//             setData(jsonData);
//         };

//         reader.onerror = (error) => {
//             console.error('Error reading file:', error);
//         };

//         reader.readAsArrayBuffer(file);
//     };

//     const handlePrint = () => {
//         let dataFormat = { inputValue, width, height, color, background, margin, format }
//         localStorage.setItem('BarCode', JSON.stringify({data, dataFormat}));
//         window.open('/print/BarCode', '_blank');
//     };

//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
//             <h1>Barcode Generator</h1>

//             {/* Form Section */}
//             <div style={{
//                 backgroundColor: '#fff',
//                 padding: '20px',
//                 borderRadius: '8px',
//                 boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//                 width: '100%',
//                 maxWidth: '600px',
//                 marginBottom: '20px',
//                 display: 'flex',
//                 flexDirection: 'column',
//             }}>
//                 <div>
//                     <input
//                         type='text'
//                         value={inputValue}
//                         onChange={(e) => setInputValue(e.target.value)}
//                         placeholder="Enter value to generate barcode"
//                         style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
//                     />
//                     <select onChange={handleSelectChange} value={format}>
//                         <option value="UPC">UPC</option>
//                         <option value="EAN-13">EAN-13</option>
//                     </select>
//                 </div>
//                 <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '10px', width: '100%' }}>
//                     <label style={{ flexGrow: 1 }}>
//                         Bar Width:
//                         <input
//                             type="text"
//                             value={width}
//                             min={1}
//                             max={10}
//                             onChange={(e) => setWidth(parseInt(e.target.value))}
//                             style={{ marginLeft: '10px', width: '100%' }}
//                         />
//                     </label>
//                 </div>
//                 <div>

//                     <label style={{ flexGrow: 1 }}>
//                         Bar Height:
//                         <input
//                             type="text"
//                             value={height}
//                             min={50}
//                             max={200}
//                             onChange={(e) => setHeight(parseInt(e.target.value))}
//                             style={{ marginLeft: '10px', width: '100%' }}
//                         />
//                     </label>
//                     <label style={{ flexGrow: 1 }}>
//                         Margin:
//                         <input
//                             type="text"
//                             value={margin}
//                             min={0}
//                             max={20}
//                             onChange={(e) => setMargin(parseInt(e.target.value))}
//                             style={{ marginLeft: '10px', width: '100%' }}
//                         />
//                     </label>
//                     <label style={{ flexGrow: 1 }}>
//                         Line Color:
//                         <input
//                             type="color"
//                             value={color}
//                             onChange={(e) => setColor(e.target.value)}
//                             style={{ marginLeft: '10px', width: '100%' }}
//                         />
//                     </label>
//                     <label style={{ flexGrow: 1 }}>
//                         Background Color:
//                         <input
//                             type="color"
//                             value={background}
//                             onChange={(e) => setBackground(e.target.value)}
//                             style={{ marginLeft: '10px', width: '100%' }}
//                         />
//                     </label>

//                 </div>
//                 <input type="file" accept=".xlsx" onChange={handleFileUpload} style={{ marginTop: '20px', width: '100%' }} />
//             </div>

//             {/* Print Button */}
//             <button onClick={handlePrint} style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer' }}>Print Barcodes</button>

//             {/* Barcodes Display Section */}
//             <div id="printable-area" style={{
//                 backgroundColor: '#fff',
//                 padding: '10px',
//                 borderRadius: '8px',
//                 boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//                 width: '100%',
//                 maxWidth: '600px',
//                 display: 'grid',
//                 gridTemplateColumns: "repeat(2, 1fr)",
//                 gap: '10px',
//                 alignItems: 'center'
//             }}>
//                 {inputBarcode && (
//                     <div className="barcode-container" style={{
//                         display: 'flex', flexDirection: 'column', alignItems: 'center',
//                         marginBottom: '20px', border: '1px solid #ddd', padding: '10px',
//                         width: '100%', height: "230px"
//                     }}>
//                         <img src={inputBarcode} alt="Generated Barcode" style={{ maxWidth: '100%' }} />
//                     </div>
//                 )}
//                 {data.slice(1).map((row, index) => {
//                     const barcode = barcodes[index] || ''; // Ensure there's a barcode or use an empty string
//                     return (
//                         <div key={index} className="barcode-container" style={{
//                             display: 'flex', flexDirection: 'column', alignItems: 'center',
//                             marginBottom: '20px', border: '1px solid #ddd', padding: '10px',
//                             width: '100%', height: "230px"
//                         }}>
//                             <div style={{ textAlign: 'left', width: '100%', marginBottom: '10px' }}>
//                                 <p>STYLE  : {row[0]}</p>
//                                 <p>COLOR  : {row[4]}</p>
//                                 <p>SIZE   : {row[2]}</p>
//                                 <p>PO     : {row[3]}</p>
//                             </div>
//                             {barcode ? (
//                                 <img src={barcode} alt={`Barcode ${index + 1}`} style={{ maxWidth: '100%' }} />
//                             ) : (
//                                 <p style={{ color: 'red' }}>Error generating barcode</p>
//                             )}
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// }



'use client'

import { useState, useEffect } from 'react';
import jsBarcode from 'jsbarcode';
import * as XLSX from 'xlsx';
import Image from 'next/image';

export default function Home() {
    const [barcodes, setBarcodes] = useState<string[]>([]);
    const [widthInches, setWidthInches] = useState<number>(0.02); // Width in inches
    const [heightInches, setHeightInches] = useState<number>(1); // Height in inches
    const [color, setColor] = useState<string>('#000000');
    const [background, setBackground] = useState<string>('#ffffff');
    const [margin, setMargin] = useState<number>(0); // Remove margin for tighter layout
    const [data, setData] = useState<string[][]>([]);
    const [format, setFormat] = useState<string>('UPC'); // Default to UPC format
    const [inputValue, setInputValue] = useState<string>(''); // State to hold user input
    const [inputBarcode, setInputBarcode] = useState<string>('');

    const handleSelectChange = (event: any) => {
        setFormat(event.target.value);
    };

    const inchToPixel = (inches: number) => {
        return inches * 96; // Convert inches to pixels
    };

    const generateBarcode = (text: string): string => {
        try {
            const canvas = document.createElement('canvas');
            canvas.width = inchToPixel(widthInches); // Adjusted to use dynamic width
            canvas.height = inchToPixel(heightInches); // Adjusted to use dynamic height
            jsBarcode(canvas, text, {
                width: inchToPixel(widthInches),
                height: inchToPixel(heightInches),
                displayValue: true,
                background: background,
                fontOptions: 'bold', // Optional: Make the text bold
                font: 'Arial', // Set font type
                fontSize: 20,  // Set font size
                textMargin: 5, // Margin between text and barcode
                lineColor: color,
                margin: margin,
                format: format
            });
            return canvas.toDataURL('image/png');
        } catch (error) {
            console.error('Error generating barcode', error);
            return '';
        }
    };

    useEffect(() => {
        // Regenerate barcodes when any parameter or data changes
        const generatedBarcodes = data.slice(1).map((item: any) => {
            const upc = item[5];
            if (upc) {
                return generateBarcode(upc);
            } else {
                console.warn('UPC code missing in data:', item);  // Debug log
                return '';
            }
        });
        setBarcodes(generatedBarcodes.filter(Boolean));  // Filter out any empty barcodes
    }, [widthInches, heightInches, color, background, margin, format, data]); // Dependencies array

    useEffect(() => {
        if (inputValue) {
            setInputBarcode(generateBarcode(inputValue));
        } else {
            setInputBarcode('');
        }
    }, [inputValue, widthInches, heightInches, color, background, margin, format]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const arrayBuffer = e.target?.result as ArrayBuffer;
            if (!arrayBuffer) {
                console.error('Failed to read file.');
                return;
            }

            const data = new Uint8Array(arrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });

            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData: string[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            setData(jsonData);
        };

        reader.onerror = (error) => {
            console.error('Error reading file:', error);
        };

        reader.readAsArrayBuffer(file);
    };


    const handlePrint = () => {
        let dataFormat = { inputValue, widthInches, heightInches, color, background, margin, format }
        localStorage.setItem('BarCode', JSON.stringify({ data, dataFormat }));
        window.open('/print/BarCode', '_blank');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
            <h1>Barcode Generator</h1>

            {/* Form Section */}
            <div style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                maxWidth: '600px',
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <div>
                    <input
                        type='text'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Enter value to generate barcode"
                        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
                    />
                    <select onChange={handleSelectChange} value={format}>
                        <option value="UPC">UPC</option>
                        <option value="EAN-13">EAN-13</option>
                    </select>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '10px', width: '100%' }}>
                    <label style={{ flexGrow: 1 }}>
                        Bar Width (inches):
                        <input
                            type="range"
                            step="0.01"
                            min="0.02"
                            max="2"
                            value={widthInches}
                            onChange={(e) => setWidthInches(parseFloat(e.target.value))}
                            style={{ marginLeft: '10px', width: '100%' }}
                        />
                        {widthInches} inches
                    </label>
                </div>
                <div>
                    <label style={{ flexGrow: 1 }}>
                        Bar Height (inches):
                        <input
                            type="range"
                            step="0.01"
                            min="0.5"
                            max="3"
                            value={heightInches}
                            onChange={(e) => setHeightInches(parseFloat(e.target.value))}
                            style={{ marginLeft: '10px', width: '100%' }}
                        />
                        {heightInches} inches
                    </label>
                    <label style={{ flexGrow: 1 }}>
                        Margin (pixels):
                        <input
                            type="number"
                            value={margin}
                            min={0}
                            max={20}
                            onChange={(e) => setMargin(parseInt(e.target.value))}
                            style={{ marginLeft: '10px', width: '100%' }}
                        />
                    </label>
                    <label style={{ flexGrow: 1 }}>
                        Line Color:
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            style={{ marginLeft: '10px', width: '100%' }}
                        />
                    </label>
                    <label style={{ flexGrow: 1 }}>
                        Background Color:
                        <input
                            type="color"
                            value={background}
                            onChange={(e) => setBackground(e.target.value)}
                            style={{ marginLeft: '10px', width: '100%' }}
                        />
                    </label>

                </div>
                <input type="file" accept=".xlsx" onChange={handleFileUpload} style={{ marginTop: '20px', width: '100%' }} />
            </div>

            {/* Print Button */}
            <button onClick={handlePrint} style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer' }}>Print Barcodes</button>

            {/* Barcodes Display Section */}
            <div id="print-qr-code" style={{
                backgroundColor: '#fff',
                padding: '10px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                width: '100%',
                maxWidth: '600px',
                display: 'grid',
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: '10px',
                alignItems: 'center'
            }}>
                {inputBarcode && (
                    <div className="barcode-container" style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        marginBottom: '20px', border: '1px solid #ddd', padding: '10px',
                        width: '100%', height: "230px"
                    }}>
                        <img src={inputBarcode} alt="Generated Barcode" style={{ maxWidth: '100%' }} />
                    </div>
                )}
                {data.slice(1).map((row, index) => {
                    const barcode = barcodes[index] || ''; // Ensure there's a barcode or use an empty string
                    return (
                        <div key={index}
                        //  className="barcode-container"
                         style={{
                            // transform: "rotate(90deg)",
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            marginBottom: '20px', border: '1px solid #ddd', padding: '10px',
                            width: '100%', height: "230px"
                        }}>
                            <div style={{ textAlign: 'left', width: '100%', marginBottom: '10px', }}
                            //  className='rotate-90'
                             >
                                <p >STYLE  : {row[0]}</p>
                                <p>COLOR  : {row[4]}</p>
                                <p>SIZE   : {row[2]}</p>
                                <p>PO     : {row[3]}</p>
                            </div>
                            {barcode ? (
                                <img src={barcode} alt={`Barcode ${index + 1}`}
                                    // className='rotate-90'
                                />
                            ) : (
                                <p style={{ color: 'red' }}>Error generating barcode</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


// import { useState, useEffect } from 'react';
// import jsBarcode from 'jsbarcode';
// import * as XLSX from 'xlsx';
// import Image from 'next/image';

// export default function Home() {
//     const [barcodes, setBarcodes] = useState<string[]>([]);
//     const [widthInches, setWidthInches] = useState<number>(0.02); // Width in inches
//     const [heightInches, setHeightInches] = useState<number>(1); // Height in inches
//     const [color, setColor] = useState<string>('#000000');
//     const [background, setBackground] = useState<string>('#ffffff');
//     const [margin, setMargin] = useState<number>(0); // Remove margin for tighter layout
//     const [data, setData] = useState<string[][]>([]);
//     const [format, setFormat] = useState<string>('UPC'); // Default to UPC format
//     const [inputValue, setInputValue] = useState<string>(''); // State to hold user input
//     const [inputBarcode, setInputBarcode] = useState<string>('');

//     const handleSelectChange = (event: any) => {
//         setFormat(event.target.value);
//     };

//     const inchToPixel = (inches: number) => {
//         return inches * 96; // Convert inches to pixels
//     };

//     const generateBarcode = (text: string): string => {
//         try {
//             const canvas = document.createElement('canvas');
//             canvas.width = 300; // Increase the width
//             canvas.height = 150; // Increase the height
//             jsBarcode(canvas, text, {
//                 // width: inchToPixel(widthInches),
//                 width: 365,
//                 // height: inchToPixel(heightInches),
//                 height: 240,
//                 displayValue: true,
//                 background: background,
//                 fontOptions: 'bold', // Optional: Make the text bold
//                 font: 'Arial', // Set font type
//                 fontSize: 20,  // Set font size
//                 textMargin: 5, // Margin between text and barcode
//                 lineColor: color,
//                 margin: margin,
//                 format: format
//             });
//             return canvas.toDataURL('image/png');
//         } catch (error) {
//             console.error('Error generating barcode', error);
//             return '';
//         }
//     };

//     useEffect(() => {
//         // Regenerate barcodes when any parameter or data changes
//         const generatedBarcodes = data.slice(1).map((item: any) => {
//             const upc = item[5];
//             if (upc) {
//                 return generateBarcode(upc);
//             } else {
//                 console.warn('UPC code missing in data:', item);  // Debug log
//                 return '';
//             }
//         });
//         setBarcodes(generatedBarcodes.filter(Boolean));  // Filter out any empty barcodes
//     }, [widthInches, heightInches, color, background, margin, format, data]); // Dependencies array

//     useEffect(() => {
//         if (inputValue) {
//             setInputBarcode(generateBarcode(inputValue));
//         } else {
//             setInputBarcode('');
//         }
//     }, [inputValue, widthInches, heightInches, color, background, margin, format]);

//     const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (!file) return;

//         const reader = new FileReader();
//         reader.onload = (e) => {
//             const arrayBuffer = e.target?.result as ArrayBuffer;
//             if (!arrayBuffer) {
//                 console.error('Failed to read file.');
//                 return;
//             }

//             const data = new Uint8Array(arrayBuffer);
//             const workbook = XLSX.read(data, { type: 'array' });

//             const firstSheetName = workbook.SheetNames[0];
//             const worksheet = workbook.Sheets[firstSheetName];
//             const jsonData: string[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//             setData(jsonData);
//         };

//         reader.onerror = (error) => {
//             console.error('Error reading file:', error);
//         };

//         reader.readAsArrayBuffer(file);
//     };

//     const handlePrint = () => {
//         let dataFormat = { inputValue, widthInches, heightInches, color, background, margin, format }
//         localStorage.setItem('BarCode', JSON.stringify({ data, dataFormat }));
//         window.open('/print/BarCode', '_blank');
//     };
// 	function printArea() {
// 		var printContents = document.getElementById("print-qr-code").innerHTML;
// 		var originalContents = document.body.innerHTML;
// 		document.body.innerHTML = printContents;
// 		window.print();
// 		document.body.innerHTML = originalContents;
// 	}
//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
//             <h1>Barcode Generator</h1>

//             {/* Form Section */}
//             <div style={{
//                 backgroundColor: '#fff',
//                 padding: '20px',
//                 borderRadius: '8px',
//                 boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//                 // width: '100%',
//                 maxWidth: '600px',
//                 marginBottom: '20px',
//                 display: 'flex',
//                 flexDirection: 'column',
//             }}>
//                 <div>
//                     <input
//                         type='text'
//                         value={inputValue}
//                         onChange={(e) => setInputValue(e.target.value)}
//                         placeholder="Enter value to generate barcode"
//                         style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
//                     />
//                     <select onChange={handleSelectChange} value={format}>
//                         <option value="UPC">UPC</option>
//                         <option value="EAN-13">EAN-13</option>
//                     </select>
//                 </div>
//                 <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '10px', width: '100%' }}>
//                     <label style={{ flexGrow: 1 }}>
//                         Bar Width (inches):
//                         <input
//                             type="number"
//                             step="0.01"
//                             value={widthInches}
//                             min={0.01}
//                             onChange={(e) => setWidthInches(parseFloat(e.target.value))}
//                             style={{ marginLeft: '10px', width: '100%' }}
//                         />
//                     </label>
//                 </div>
//                 <div>

//                     <label style={{ flexGrow: 1 }}>
//                         Bar Height (inches):
//                         <input
//                             type="number"
//                             step="0.01"
//                             value={heightInches}
//                             min={0.5}
//                             onChange={(e) => setHeightInches(parseFloat(e.target.value))}
//                             style={{ marginLeft: '10px', width: '100%' }}
//                         />
//                     </label>
//                     <label style={{ flexGrow: 1 }}>
//                         Margin (pixels):
//                         <input
//                             type="number"
//                             value={margin}
//                             min={0}
//                             max={20}
//                             onChange={(e) => setMargin(parseInt(e.target.value))}
//                             style={{ marginLeft: '10px', width: '100%' }}
//                         />
//                     </label>
//                     <label style={{ flexGrow: 1 }}>
//                         Line Color:
//                         <input
//                             type="color"
//                             value={color}
//                             onChange={(e) => setColor(e.target.value)}
//                             style={{ marginLeft: '10px', width: '100%' }}
//                         />
//                     </label>
//                     <label style={{ flexGrow: 1 }}>
//                         Background Color:
//                         <input
//                             type="color"
//                             value={background}
//                             onChange={(e) => setBackground(e.target.value)}
//                             style={{ marginLeft: '10px', width: '100%' }}
//                         />
//                     </label>

//                 </div>
//                 <input type="file" accept=".xlsx" onChange={handleFileUpload} style={{ marginTop: '20px', width: '100%' }} />
//             </div>

//             {/* Print Button */}
//             <button onClick={printArea} style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer' }}>Print Barcodes</button>

//             {/* Barcodes Display Section */}
//             <div id="print-qr-code" style={{
//                 backgroundColor: '#fff',
//                 padding: '10px',
//                 borderRadius: '8px',
//                 boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//                 width: '100%',
//                 maxWidth: '600px',
//                 display: 'grid',
//                 gridTemplateColumns: "repeat(2, 1fr)",
//                 gap: '10px',
//                 alignItems: 'center'
//             }}>
//                 {inputBarcode && (
//                     <div className="barcode-container" style={{
//                         display: 'flex', flexDirection: 'column', alignItems: 'center',
//                         marginBottom: '20px', border: '1px solid #ddd', padding: '10px',
//                         width: '100%', height: "230px"
//                     }}>
//                         <img src={inputBarcode} alt="Generated Barcode" style={{ maxWidth: '100%' }} />
//                     </div>
//                 )}
//                 {data.slice(1).map((row, index) => {
//                     const barcode = barcodes[index] || ''; // Ensure there's a barcode or use an empty string
//                     return (
//                         <div key={index} className="barcode-container" style={{
//                             transform: "rotate(90deg)",
//                             display: 'flex', flexDirection: 'column', alignItems: 'center',
//                             marginBottom: '20px', border: '1px solid #ddd', padding: '10px',
//                             width: '100%', height: "230px"
//                         }}>
//                             <div style={{ textAlign: 'left', width: '100%', marginBottom: '10px', }} className='rotate-90'>
//                                 <p >STYLE  : {row[0]}</p>
//                                 <p>COLOR  : {row[4]}</p>
//                                 <p>SIZE   : {row[2]}</p>
//                                 <p>PO     : {row[3]}</p>
//                             </div>
//                             {barcode ? (
//                                 <img src={barcode} alt={`Barcode ${index + 1}`}
//                                     className='rotate-90'
//                                 />
//                             ) : (
//                                 <p style={{ color: 'red' }}>Error generating barcode</p>
//                             )}
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// }
































































// import { useState } from 'react';
// import jsBarcode from 'jsbarcode';
// import * as XLSX from 'xlsx'

// // import { useState } from 'react';
// // import jsBarcode from 'jsbarcode';
// // import XLSX from 'xlsx';

// export default function Home() {
//   const [barcodes, setBarcodes] = useState<string[]>([]);
//   const [width, setWidth] = useState<number>(1); // Reduced width for narrower barcodes
//   const [height, setHeight] = useState<number>(70); // Adjusted height to maintain proportions
//   const [color, setColor] = useState<string>('#000000');
//   const [background, setBackground] = useState<string>('#ffffff');
//   const [margin, setMargin] = useState<number>(0); // Remove margin for tighter layout

//   const generateBarcode = (text: string): string => {
//     try {
//       const canvas = document.createElement('canvas');
//       jsBarcode(canvas, text, {
//         width: width,
//         height: height,
//         displayValue: true,
//         background: background,
//         lineColor: color,
//         margin: margin,
//       });
//       return canvas.toDataURL('image/png');
//     } catch (error) {
//       console.error('Error generating barcode', error);
//       return '';
//     }
//   };

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const arrayBuffer = e.target?.result as ArrayBuffer;
//       if (!arrayBuffer) {
//         console.error('Failed to read file.');
//         return;
//       }

//       const data = new Uint8Array(arrayBuffer);
//       const workbook = XLSX.read(data, { type: 'array' });

//       // Assume the first sheet
//       const firstSheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[firstSheetName];
//       const jsonData = XLSX.utils.sheet_to_json<Record<string, string>>(worksheet, { header: 1 });

//       // Process the data
//       const generatedBarcodes = jsonData.map((row) => {
//         const concatenatedRow = row.join(' ');
//         return generateBarcode(concatenatedRow);
//       });
//       setBarcodes(generatedBarcodes);
//     };

//     reader.onerror = (error) => {
//       console.error('Error reading file:', error);
//     };

//     reader.readAsArrayBuffer(file);
//   };

//   const handlePrint = () => {
//     const printContent = document.getElementById('printable-area');
//     if (printContent) {
//       const printWindow = window.open('', '_blank');
//       if (printWindow) {
//         printWindow.document.write('<html><head><title>Print Barcode</title></head><body>');
//         printWindow.document.write(printContent.innerHTML);
//         printWindow.document.write('</body></html>');
//         printWindow.document.close();
//         printWindow.focus();
//         printWindow.print();
//         printWindow.close();
//       }
//     }
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
//       <h1>Barcode Generator</h1>

//       {/* Form Section */}
//       <div style={{
//         backgroundColor: '#fff',
//         padding: '20px',
//         borderRadius: '8px',
//         boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//         width: '100%',
//         maxWidth: '600px', // Adjusted max-width to fit narrower barcodes
//         marginBottom: '20px',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center'
//       }}>
//         <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '10px', width: '100%' }}>
//           <label style={{ flexGrow: 1 }}>
//             Width:
//             <input
//               type="number"
//               value={width}
//               onChange={(e) => setWidth(parseInt(e.target.value))}
//               style={{ marginLeft: '10px', width: '100%' }}
//             />
//           </label>
//           <label style={{ flexGrow: 1 }}>
//             Height:
//             <input
//               type="number"
//               value={height}
//               onChange={(e) => setHeight(parseInt(e.target.value))}
//               style={{ marginLeft: '10px', width: '100%' }}
//             />
//           </label>
//           <label style={{ flexGrow: 1 }}>
//             Foreground Color:
//             <input
//               type="color"
//               value={color}
//               onChange={(e) => setColor(e.target.value)}
//               style={{ marginLeft: '10px', width: '100%' }}
//             />
//           </label>
//           <label style={{ flexGrow: 1 }}>
//             Background Color:
//             <input
//               type="color"
//               value={background}
//               onChange={(e) => setBackground(e.target.value)}
//               style={{ marginLeft: '10px', width: '100%' }}
//             />
//           </label>
//           <label style={{ flexGrow: 1 }}>
//             Margin:
//             <input
//               type="number"
//               value={margin}
//               onChange={(e) => setMargin(parseInt(e.target.value))}
//               style={{ marginLeft: '10px', width: '100%' }}
//             />
//           </label>
//         </div>
//         <input type="file" accept=".xlsx" onChange={handleFileUpload} style={{ marginTop: '20px', width: '100%' }} />
//       </div>

//       {/* Print Button */}
//       <button onClick={handlePrint} style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer' }}>Print Barcodes</button>

//       {/* Barcodes Display Section */}
//       <div id="printable-area" style={{
//         backgroundColor: '#fff',
//         padding: '10px',
//         borderRadius: '8px',
//         boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//         width: '100%',
//         maxWidth: '600px', // Adjusted max-width to fit narrower barcodes
//         display: 'grid',
//         gridTemplateColumns: "repeat(2, 1fr)",
//         // height: "230px",
//         gap: '10px',
//         alignItems: 'center'
//       }}>
//         {barcodes.map((code, index) => (
//           <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', border: '1px solid #ddd', padding: '10px', width: '100%',height: "230px" }}>
//             <div style={{ textAlign: 'left', width: '100%', marginBottom: '10px' }}>
//               <p>STYLE: ExampleStyle</p>
//               <p>COLOR: ExampleColor</p>
//               <p>SIZE: ExampleSize</p>
//               <p>PO: ExamplePO</p>
//             </div>
//             <img src={code} alt={`Barcode ${index + 1}`} style={{ maxWidth: '100%' }} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
