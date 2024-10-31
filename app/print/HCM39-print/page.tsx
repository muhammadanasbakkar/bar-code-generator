'use client'

import JsBarcode from 'jsbarcode';
import React, { useEffect, useState } from 'react'

const page = () => {
    const [data, setData] = useState<any>([])
    const [barcodes, setBarcodes] = useState<string[]>(['094833724042']);

    const ISSERVER = typeof window === 'undefined';
    // let invoice: any;
    useEffect(() => {
        if (!ISSERVER) {
            const invoice = JSON.parse(localStorage.getItem('BarCode')!);
            console.log(invoice)
            setData(invoice)
        }
    }, [])

    useEffect(() => {
        // Generate a default barcode on load
        const defaultBarcode = generateBarcode('DEFAULT123');
        setBarcodes([defaultBarcode]);
    }, []);

    const generateBarcode = (text: string): string => {
        try {
            const canvas = document.createElement('canvas');
            // canvas.width = 300; // Increase the width
            // canvas.height = 150; // Increase the height
            JsBarcode(canvas, text,
                // data?.dataFormat
                {
                    width: 4,
                    fontSize: 20,  // Set font size
                    textMargin: 5, // Margin between text and barcode
                    height: 350,
                    fontOptions: 'bold', // Optional: Make the text bold
                    font: 'Arial', // Set font type
                    displayValue: true,
                    background: '#ffffff',
                    lineColor: '#000000',
                    margin: 0,
                    format: 'CODE39'
                }
            );
            return canvas.toDataURL('image/png');
        } catch (error) {
            console.error('Error generating barcode', error);
            return '';
        }
    };

    // const barCode = () => {
    //     const generatedBarcodes = data.map((row) => {
    //         const concatenatedRow = row.join(' ');
    //         return generateBarcode(concatenatedRow);
    //     });
    //     setBarcodes(generatedBarcodes);
    // }

    const barCode = () => {
        const generatedBarcodes = data?.data?.map((item: any) => {

            const upc = item[5];
            if (upc) {
                return generateBarcode(upc);
            } else {
                console.warn('UPC code missing in data:', item);  // Debug log
                return '';
            }
        });

        setBarcodes(generatedBarcodes?.filter(Boolean));  // Filter out any empty barcodes
    };


    useEffect(() => {
        // setTimeout(() => {
        barCode()
        // }, 500);
    }, [data.data])

    return (
        <>
            <div id="printable-area" style={{
                backgroundColor: '#fff',
                // padding: '10px',
                // borderRadius: '8px',
                // boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                // width: '100%',
                minWidth: '384px', // Adjusted max-width to fit narrower barcodes
                maxWidth: '384px', // Adjusted max-width to fit narrower barcodes
                // display: 'grid',
                // gridTemplateColumns: "repeat(2, 1fr)",
                gap: '10px',
                alignItems: 'center',
                padding:"15px"
            }}>
                {data?.data?.slice(1).map((row: any, index: any) => (
                    // <div 
                    //     // className="barcode-container"
                    //     style={{
                    //         display: 'flex', flexDirection: 'column', alignItems: 'center',
                    //         marginBottom: '0px',
                    //         //  border: '1px solid #ddd',
                    //         padding: '0px',
                    //         width: '100%',
                    //         transform: "rotate(90)"
                    //         // height: "230px"
                    //     }}>
                        <div key={index} className='containerhc data-box'>
                            {/* <span className='' >STYLE  : {row[0]}</span>
                            <span className=''>COLOR  : {row[1]}</span>
                            <span className=''>SIZE   : {row[2]}</span>
                            <span className=''>PO     : {row[3]}</span> */}
                            <div  style={{ maxWidth: '100%' }}>
                            <img className="hcm39" src={barcodes?.[index]} alt={`Barcode ${index + 1}`} style={{ maxWidth: '100%'}} />
                            </div>
                            
                        </div>
                     
                    // {/* </div> */}
                ))}
            </div>
        </>
    )
}

export default page